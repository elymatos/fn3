/**
 * DUL Ontology Parser
 * Parses OWL/JSON-LD ontology data and builds structured representation
 */

class DULParser {
    constructor() {
        this.classes = new Map();
        this.properties = new Map();
        this.rawData = null;
        this.statistics = {
            totalClasses: 0,
            totalProperties: 0,
            maxDepth: 0,
            topLevelClasses: 0
        };
    }

    /**
     * Load and parse the ontology from JSON-LD file
     */
    async loadFromFile(filePath) {
        try {
            const response = await fetch(filePath);
            if (!response.ok) {
                throw new Error(`Failed to load ontology: ${response.statusText}`);
            }

            this.rawData = await response.json();
            this.parse();
            return { success: true, data: this.getData() };
        } catch (error) {
            console.error('Error loading ontology:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Parse the JSON-LD data and build structured representation
     */
    parse() {
        if (!this.rawData) {
            throw new Error('No data to parse. Call loadFromFile first.');
        }

        // Handle different JSON-LD structures
        let items = [];
        if (Array.isArray(this.rawData)) {
            items = this.rawData;
        } else if (this.rawData['@graph']) {
            items = this.rawData['@graph'];
        } else {
            items = [this.rawData];
        }

        console.log(`Parsing ${items.length} items from ontology...`);

        // First pass: Extract all classes, properties, AND synthetic nodes
        items.forEach(item => {
            if (!item['@id'] || item['@id'].startsWith('_:')) {
                return; // Skip blank nodes
            }

            const uri = item['@id'];

            // Check if it's a DUL namespace item
            if (!uri.includes('ont/dul/DUL.owl#')) {
                return;
            }

            // Process synthetic nodes FIRST (they are also classes)
            if (this.isSyntheticNode(item)) {
                this.processSyntheticNode(item);
            }
            // Then process regular classes
            else if (this.isClass(item)) {
                this.processClass(item);
            }

            // Process properties
            const propType = this.getPropertyType(item);
            if (propType) {
                this.processProperty(item, propType);
            }
        });

        // Second pass: Build relationships (subclass, properties, etc.)
        items.forEach(item => {
            if (!item['@id'] || item['@id'].startsWith('_:')) {
                return;
            }

            const uri = item['@id'];
            if (this.classes.has(uri)) {
                this.buildClassRelationships(item);
            }
        });

        // Third pass: Categorize synthetic node references
        this.classes.forEach((classData, uri) => {
            if (classData.isSynthetic && classData.involvedRefs) {
                classData.involvedRefs.forEach(refUri => {
                    if (this.classes.has(refUri)) {
                        classData.involvedClasses.push(refUri);
                    } else if (this.properties.has(refUri)) {
                        classData.involvedProperties.push(refUri);
                    }
                });
            }
        });

        // Fourth pass: Calculate hierarchy and statistics
        this.calculateHierarchy();
        this.calculateStatistics();

        console.log('Parsing complete:', this.statistics);
    }

    /**
     * Check if an item is an OWL Class
     */
    isClass(item) {
        const types = Array.isArray(item['@type']) ? item['@type'] : [item['@type']];
        return types.some(t =>
            t === 'http://www.w3.org/2002/07/owl#Class' ||
            t === 'owl:Class'
        );
    }

    /**
     * Check if an item is a synthetic node
     */
    isSyntheticNode(item) {
        const types = Array.isArray(item['@type']) ? item['@type'] : [item['@type']];
        return types.some(t =>
            t === 'http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#SyntheticNode' ||
            t.includes('SyntheticNode')
        ) || item['http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#syntheticType'];
    }

    /**
     * Get property type (ObjectProperty or DatatypeProperty)
     */
    getPropertyType(item) {
        const types = Array.isArray(item['@type']) ? item['@type'] : [item['@type']];

        if (types.some(t => t.includes('ObjectProperty'))) {
            return 'ObjectProperty';
        }
        if (types.some(t => t.includes('DatatypeProperty'))) {
            return 'DatatypeProperty';
        }
        return null;
    }

    /**
     * Process a class item
     */
    processClass(item) {
        const uri = item['@id'];
        const name = this.extractName(item, uri);
        const definition = this.extractDefinition(item);
        const labels = this.extractLabels(item);

        this.classes.set(uri, {
            uri,
            name,
            definition,
            labels,
            superClasses: [],
            subClasses: [],
            properties: [],
            disjointWith: [],
            restrictions: [],
            isTopLevel: false,
            level: 0
        });

        this.statistics.totalClasses++;
    }

    /**
     * Process a property item
     */
    processProperty(item, type) {
        const uri = item['@id'];
        const name = this.extractName(item, uri);
        const definition = this.extractDefinition(item);
        const labels = this.extractLabels(item);

        // Extract domains and ranges
        const domains = this.extractURIArray(item, [
            'http://www.w3.org/2000/01/rdf-schema#domain',
            'rdfs:domain'
        ]);

        const ranges = this.extractURIArray(item, [
            'http://www.w3.org/2000/01/rdf-schema#range',
            'rdfs:range'
        ]);

        // Extract property characteristics
        const types = Array.isArray(item['@type']) ? item['@type'] : [item['@type']];
        const characteristics = {
            functional: types.some(t => t.includes('FunctionalProperty')),
            inverseFunctional: types.some(t => t.includes('InverseFunctionalProperty')),
            transitive: types.some(t => t.includes('TransitiveProperty')),
            symmetric: types.some(t => t.includes('SymmetricProperty')),
            asymmetric: types.some(t => t.includes('AsymmetricProperty')),
            reflexive: types.some(t => t.includes('ReflexiveProperty'))
        };

        // Extract inverse property
        const inverse = this.extractURIArray(item, [
            'http://www.w3.org/2002/07/owl#inverseOf',
            'owl:inverseOf'
        ]);

        this.properties.set(uri, {
            uri,
            name,
            type,
            definition,
            labels,
            domains,
            ranges,
            characteristics,
            inverse: inverse[0] || null
        });

        this.statistics.totalProperties++;
    }

    /**
     * Process a synthetic node
     */
    processSyntheticNode(item) {
        const uri = item['@id'];
        const DUL_NS = 'http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#';

        // Get synthetic type
        const syntheticType = item[`${DUL_NS}syntheticType`];

        // Extract label
        const name = this.extractName(item, uri);

        // Extract involved classes and properties
        const involvedRefs = this.extractURIArray(item, [`${DUL_NS}involves`]);
        const involvedClasses = [];
        const involvedProperties = [];

        // We'll categorize involves in the second pass once we know what's a class vs property

        // Extract appliesTo
        const appliesTo = this.extractURIArray(item, [`${DUL_NS}appliesTo`]);

        // Parse logical definition
        const logicalDefinition = this.parseLogicalDefinition(item, syntheticType);

        this.classes.set(uri, {
            uri,
            name,
            definition: `Synthetic node: ${name}`,
            labels: this.extractLabels(item),
            isSynthetic: true,
            syntheticType: syntheticType,
            logicalDefinition: logicalDefinition,
            involvedRefs: involvedRefs,  // Store raw references for now
            involvedClasses: involvedClasses,
            involvedProperties: involvedProperties,
            appliesTo: appliesTo[0] || null,
            superClasses: [],
            subClasses: [],
            properties: [],
            disjointWith: [],
            restrictions: [],
            isTopLevel: false,
            level: 0
        });

        this.statistics.totalClasses++;
    }

    /**
     * Parse logical definition from synthetic node
     */
    parseLogicalDefinition(item, syntheticType) {
        const DUL_NS = 'http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#';
        const OWL_NS = 'http://www.w3.org/2002/07/owl#';

        const getFirstURI = (prop) => {
            const arr = this.extractURIArray(item, [prop]);
            return arr[0] || null;
        };

        switch(syntheticType) {
            case 'existential_restriction':
                return {
                    type: 'restriction',
                    quantifier: '∃ (some)',
                    property: getFirstURI(`${DUL_NS}onProperty`),
                    filler: getFirstURI(`${DUL_NS}someValuesFrom`)
                };

            case 'universal_restriction':
                return {
                    type: 'restriction',
                    quantifier: '∀ (only)',
                    property: getFirstURI(`${DUL_NS}onProperty`),
                    filler: getFirstURI(`${DUL_NS}allValuesFrom`)
                };

            case 'value_restriction':
                return {
                    type: 'restriction',
                    quantifier: 'hasValue',
                    property: getFirstURI(`${DUL_NS}onProperty`),
                    value: getFirstURI(`${DUL_NS}hasValue`)
                };

            case 'intersection':
                return {
                    type: 'intersection',
                    operator: '⊓ (AND)',
                    operands: this.extractURIArray(item, [`${DUL_NS}intersectionOf`])
                };

            case 'union':
                return {
                    type: 'union',
                    operator: '⊔ (OR)',
                    operands: this.extractURIArray(item, [`${DUL_NS}unionOf`])
                };

            case 'complement':
                return {
                    type: 'complement',
                    operator: '¬ (NOT)',
                    operand: getFirstURI(`${DUL_NS}complementOf`)
                };

            default:
                return { type: 'unknown' };
        }
    }

    /**
     * Build class relationships (subclass, properties, etc.)
     */
    buildClassRelationships(item) {
        const uri = item['@id'];
        const classData = this.classes.get(uri);

        // Extract superclasses
        const superClasses = this.extractURIArray(item, [
            'http://www.w3.org/2000/01/rdf-schema#subClassOf',
            'rdfs:subClassOf'
        ]);

        superClasses.forEach(superUri => {
            if (this.classes.has(superUri)) {
                classData.superClasses.push(superUri);
                this.classes.get(superUri).subClasses.push(uri);
            }
        });

        // Extract disjoint classes
        const disjointClasses = this.extractURIArray(item, [
            'http://www.w3.org/2002/07/owl#disjointWith',
            'owl:disjointWith'
        ]);

        disjointClasses.forEach(disjointUri => {
            if (this.classes.has(disjointUri)) {
                classData.disjointWith.push(disjointUri);
            }
        });
    }

    /**
     * Calculate class hierarchy levels and identify top-level classes
     */
    calculateHierarchy() {
        // Identify top-level classes (no superclasses)
        this.classes.forEach((classData, uri) => {
            classData.isTopLevel = classData.superClasses.length === 0;
            if (classData.isTopLevel) {
                this.statistics.topLevelClasses++;
            }
        });

        // Calculate depth for each class
        this.classes.forEach((classData, uri) => {
            classData.level = this.calculateClassLevel(uri, new Set());
        });
    }

    /**
     * Calculate the level/depth of a class in the hierarchy
     */
    calculateClassLevel(uri, visited) {
        if (visited.has(uri)) {
            return 0; // Circular reference protection
        }

        const classData = this.classes.get(uri);
        if (!classData || classData.superClasses.length === 0) {
            return 0;
        }

        visited.add(uri);

        const maxParentLevel = Math.max(
            ...classData.superClasses.map(superUri =>
                this.calculateClassLevel(superUri, new Set(visited))
            )
        );

        return maxParentLevel + 1;
    }

    /**
     * Calculate statistics
     */
    calculateStatistics() {
        let maxDepth = 0;

        this.classes.forEach(classData => {
            if (classData.level > maxDepth) {
                maxDepth = classData.level;
            }
        });

        this.statistics.maxDepth = maxDepth;
    }

    /**
     * Extract name from URI or label
     */
    extractName(item, uri) {
        // Try to get label first
        const label = this.extractMultilingualText(item, [
            'http://www.w3.org/2000/01/rdf-schema#label',
            'rdfs:label'
        ]);

        if (label) {
            return label;
        }

        // Extract from URI
        if (uri.includes('#')) {
            return uri.split('#').pop();
        }
        if (uri.includes('/')) {
            return uri.split('/').pop();
        }

        return uri;
    }

    /**
     * Extract definition/comment
     */
    extractDefinition(item) {
        return this.extractMultilingualText(item, [
            'http://www.w3.org/2000/01/rdf-schema#comment',
            'rdfs:comment'
        ]);
    }

    /**
     * Extract all labels (multilingual)
     */
    extractLabels(item) {
        const labels = {};
        const labelFields = [
            'http://www.w3.org/2000/01/rdf-schema#label',
            'rdfs:label'
        ];

        labelFields.forEach(field => {
            if (item[field]) {
                const values = Array.isArray(item[field]) ? item[field] : [item[field]];
                values.forEach(value => {
                    if (typeof value === 'object' && value['@value']) {
                        const lang = value['@language'] || 'en';
                        labels[lang] = value['@value'];
                    } else if (typeof value === 'string') {
                        labels['en'] = value;
                    }
                });
            }
        });

        return labels;
    }

    /**
     * Extract multilingual text with language preference
     */
    extractMultilingualText(item, fields, preferredLangs = ['en', 'it']) {
        for (const field of fields) {
            if (!item[field]) continue;

            const values = Array.isArray(item[field]) ? item[field] : [item[field]];
            const textByLang = {};
            let fallback = '';

            values.forEach(value => {
                if (typeof value === 'string') {
                    fallback = fallback || value;
                } else if (value['@value']) {
                    const text = value['@value'];
                    const lang = value['@language'] || null;

                    if (lang) {
                        textByLang[lang] = text;
                    } else {
                        fallback = fallback || text;
                    }
                }
            });

            // Try preferred languages
            for (const lang of preferredLangs) {
                if (textByLang[lang]) {
                    return textByLang[lang];
                }
            }

            // Return any available language or fallback
            const anyLang = Object.values(textByLang)[0];
            return anyLang || fallback;
        }

        return '';
    }

    /**
     * Extract array of URIs from item fields
     */
    extractURIArray(item, fields) {
        const uris = [];

        for (const field of fields) {
            if (!item[field]) continue;

            const values = Array.isArray(item[field]) ? item[field] : [item[field]];

            values.forEach(value => {
                let uri = null;

                if (typeof value === 'string') {
                    uri = value;
                } else if (value['@id']) {
                    uri = value['@id'];
                }

                // Only add DUL namespace URIs and skip blank nodes
                if (uri && uri.includes('ont/dul/DUL.owl#') && !uri.startsWith('_:')) {
                    uris.push(uri);
                }
            });
        }

        return [...new Set(uris)]; // Remove duplicates
    }

    /**
     * Get all data (classes and properties)
     */
    getData() {
        return {
            classes: Object.fromEntries(this.classes),
            properties: Object.fromEntries(this.properties),
            statistics: this.statistics
        };
    }

    /**
     * Get class by URI
     */
    getClass(uri) {
        return this.classes.get(uri);
    }

    /**
     * Get property by URI
     */
    getProperty(uri) {
        return this.properties.get(uri);
    }

    /**
     * Get all top-level classes
     */
    getTopLevelClasses() {
        return Array.from(this.classes.values())
            .filter(c => c.isTopLevel)
            .sort((a, b) => a.name.localeCompare(b.name));
    }

    /**
     * Get properties for a specific class (domain)
     */
    getPropertiesForClass(classUri) {
        return Array.from(this.properties.values())
            .filter(p => p.domains.includes(classUri));
    }

    /**
     * Search classes by name or definition
     */
    searchClasses(query) {
        const lowerQuery = query.toLowerCase();

        return Array.from(this.classes.values())
            .filter(c =>
                c.name.toLowerCase().includes(lowerQuery) ||
                c.definition.toLowerCase().includes(lowerQuery)
            )
            .sort((a, b) => a.name.localeCompare(b.name));
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DULParser;
}
