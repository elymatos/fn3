/**
 * Property Card Component System for DUL Ontology Browser
 * Creates interactive card-based UI focused on properties
 */

class PropertyCardBuilder {
    constructor(parser) {
        this.parser = parser;
        this.expandedCards = new Set();
        this.loadExpandedState();
    }

    /**
     * Create a property card element
     */
    createPropertyCard(propertyUri) {
        const property = this.parser.getProperty(propertyUri);
        if (!property) {
            return null;
        }

        const card = document.createElement('div');
        card.className = `property-card ${property.type.toLowerCase()}`;
        card.dataset.propertyUri = propertyUri;
        card.dataset.propertyName = property.name.toLowerCase();
        card.id = this.generateCardId(propertyUri);

        // Build card header
        const header = this.createCardHeader(property);
        card.appendChild(header);

        // Build card body
        const body = this.createCardBody(property);
        card.appendChild(body);

        return card;
    }

    /**
     * Create card header
     */
    createCardHeader(property) {
        const header = document.createElement('div');
        header.className = 'card-header';

        // Title row
        const titleRow = document.createElement('div');
        titleRow.className = 'title-row';

        // Property name
        const title = document.createElement('h2');
        title.className = 'card-title';
        title.textContent = property.name;

        // Property type badge
        const typeBadge = document.createElement('span');
        typeBadge.className = `badge badge-${property.type.toLowerCase()}`;
        typeBadge.textContent = property.type;
        title.appendChild(typeBadge);

        titleRow.appendChild(title);

        // Expand/collapse button if has usage examples
        const domainClasses = property.domains.length;
        const rangeClasses = property.ranges.length;

        if (domainClasses > 0 || rangeClasses > 0) {
            const toggleBtn = document.createElement('button');
            toggleBtn.className = 'toggle-btn';
            toggleBtn.innerHTML = `
                <svg class="icon" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/>
                </svg>
            `;
            toggleBtn.title = 'Expand/collapse usage details';
            toggleBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleCardExpansion(property.uri);
            });

            // Set initial state
            if (this.expandedCards.has(property.uri)) {
                toggleBtn.classList.add('expanded');
            }

            titleRow.appendChild(toggleBtn);
        }

        header.appendChild(titleRow);

        // URI link
        const uriLink = document.createElement('a');
        uriLink.className = 'uri-link';
        uriLink.href = property.uri;
        uriLink.target = '_blank';
        uriLink.textContent = property.uri;
        uriLink.title = 'Open ontology URI';
        header.appendChild(uriLink);

        return header;
    }

    /**
     * Create card body
     */
    createCardBody(property) {
        const body = document.createElement('div');
        body.className = 'card-body';

        // Definition
        if (property.definition) {
            const definition = document.createElement('div');
            definition.className = 'definition';
            definition.textContent = property.definition;
            body.appendChild(definition);
        } else {
            const noDefinition = document.createElement('div');
            noDefinition.className = 'no-definition';
            noDefinition.textContent = 'No definition available.';
            body.appendChild(noDefinition);
        }

        // Property characteristics
        const activeChars = Object.entries(property.characteristics)
            .filter(([key, value]) => value)
            .map(([key]) => key);

        if (activeChars.length > 0) {
            const charsSection = this.createCharacteristicsSection(activeChars);
            body.appendChild(charsSection);
        }

        // Domain section
        if (property.domains.length > 0) {
            const domainSection = this.createDomainSection(property);
            body.appendChild(domainSection);
        }

        // Range section
        if (property.ranges.length > 0) {
            const rangeSection = this.createRangeSection(property);
            body.appendChild(rangeSection);
        }

        // Inverse property
        if (property.inverse) {
            const inverseSection = this.createInverseSection(property);
            body.appendChild(inverseSection);
        }

        // Subproperties section (if property is used as super property)
        const subProperties = this.findSubProperties(property.uri);
        if (subProperties.length > 0) {
            const subPropsSection = this.createSubPropertiesSection(property, subProperties);
            body.appendChild(subPropsSection);
        }

        // Super properties
        const superProperties = this.findSuperProperties(property.uri);
        if (superProperties.length > 0) {
            const superPropsSection = this.createSuperPropertiesSection(superProperties);
            body.appendChild(superPropsSection);
        }

        // Usage examples (expandable)
        if (property.domains.length > 0 || property.ranges.length > 0) {
            const usageSection = this.createUsageSection(property);
            body.appendChild(usageSection);
        }

        return body;
    }

    /**
     * Create characteristics section
     */
    createCharacteristicsSection(characteristics) {
        const section = document.createElement('div');
        section.className = 'section characteristics-section';

        const title = document.createElement('h3');
        title.className = 'section-title';
        title.textContent = 'Characteristics:';
        section.appendChild(title);

        const charList = document.createElement('div');
        charList.className = 'characteristics-list';

        characteristics.forEach(char => {
            const badge = document.createElement('span');
            badge.className = 'badge badge-characteristic';
            badge.textContent = this.formatCharacteristic(char);
            badge.title = this.getCharacteristicDescription(char);
            charList.appendChild(badge);
        });

        section.appendChild(charList);
        return section;
    }

    /**
     * Create domain section
     */
    createDomainSection(property) {
        const section = document.createElement('div');
        section.className = 'section domain-section';

        const title = document.createElement('h3');
        title.className = 'section-title';
        title.innerHTML = `Domain <span class="count">(${property.domains.length})</span>`;
        section.appendChild(title);

        const description = document.createElement('p');
        description.className = 'section-description';
        description.textContent = 'Classes that can have this property:';
        section.appendChild(description);

        const list = document.createElement('ul');
        list.className = 'class-list';

        property.domains.forEach(domainUri => {
            const domainClass = this.parser.getClass(domainUri);
            if (domainClass) {
                const item = document.createElement('li');

                const link = document.createElement('a');
                link.href = 'index.html#' + this.generateClassCardId(domainUri);
                link.className = 'class-link';
                link.textContent = domainClass.name;
                link.title = `View ${domainClass.name} class`;

                item.appendChild(link);
                list.appendChild(item);
            }
        });

        section.appendChild(list);
        return section;
    }

    /**
     * Create range section
     */
    createRangeSection(property) {
        const section = document.createElement('div');
        section.className = 'section range-section';

        const title = document.createElement('h3');
        title.className = 'section-title';
        title.innerHTML = `Range <span class="count">(${property.ranges.length})</span>`;
        section.appendChild(title);

        const description = document.createElement('p');
        description.className = 'section-description';
        description.textContent = 'Classes this property can point to:';
        section.appendChild(description);

        const list = document.createElement('ul');
        list.className = 'class-list';

        property.ranges.forEach(rangeUri => {
            const rangeClass = this.parser.getClass(rangeUri);
            if (rangeClass) {
                const item = document.createElement('li');

                const link = document.createElement('a');
                link.href = 'index.html#' + this.generateClassCardId(rangeUri);
                link.className = 'class-link';
                link.textContent = rangeClass.name;
                link.title = `View ${rangeClass.name} class`;

                item.appendChild(link);
                list.appendChild(item);
            } else {
                // For non-DUL classes (e.g., xsd types)
                const item = document.createElement('li');
                item.textContent = this.extractNameFromURI(rangeUri);
                list.appendChild(item);
            }
        });

        section.appendChild(list);
        return section;
    }

    /**
     * Create inverse property section
     */
    createInverseSection(property) {
        const inverseProp = this.parser.getProperty(property.inverse);
        if (!inverseProp) return null;

        const section = document.createElement('div');
        section.className = 'section inverse-section';

        const title = document.createElement('h3');
        title.className = 'section-title';
        title.textContent = 'Inverse Property:';
        section.appendChild(title);

        const link = document.createElement('a');
        link.href = '#' + this.generateCardId(property.inverse);
        link.className = 'property-link';
        link.textContent = inverseProp.name;
        link.addEventListener('click', (e) => {
            e.preventDefault();
            this.navigateToProperty(property.inverse);
        });

        section.appendChild(link);
        return section;
    }

    /**
     * Create subproperties section
     */
    createSubPropertiesSection(property, subProperties) {
        const section = document.createElement('div');
        section.className = 'section subproperties-section';

        const title = document.createElement('h3');
        title.className = 'section-title';
        title.innerHTML = `Sub-properties <span class="count">(${subProperties.length})</span>`;
        section.appendChild(title);

        const list = document.createElement('ul');
        list.className = 'property-list';

        subProperties.forEach(subProp => {
            const item = document.createElement('li');

            const link = document.createElement('a');
            link.href = '#' + this.generateCardId(subProp.uri);
            link.className = 'property-link';
            link.textContent = subProp.name;
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.navigateToProperty(subProp.uri);
            });

            item.appendChild(link);
            list.appendChild(item);
        });

        section.appendChild(list);
        return section;
    }

    /**
     * Create super properties section
     */
    createSuperPropertiesSection(superProperties) {
        const section = document.createElement('div');
        section.className = 'section superproperties-section';

        const title = document.createElement('h3');
        title.className = 'section-title';
        title.textContent = 'Super-property of:';
        section.appendChild(title);

        const list = document.createElement('ul');
        list.className = 'property-list';

        superProperties.forEach(superProp => {
            const item = document.createElement('li');

            const link = document.createElement('a');
            link.href = '#' + this.generateCardId(superProp.uri);
            link.className = 'property-link';
            link.textContent = superProp.name;
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.navigateToProperty(superProp.uri);
            });

            item.appendChild(link);
            list.appendChild(item);
        });

        section.appendChild(list);
        return section;
    }

    /**
     * Create usage examples section
     */
    createUsageSection(property) {
        const section = document.createElement('div');
        section.className = 'section usage-section collapsible';

        const header = document.createElement('div');
        header.className = 'section-header';

        const title = document.createElement('h3');
        title.className = 'section-title';
        title.textContent = 'Usage Examples';
        header.appendChild(title);

        section.appendChild(header);

        const content = document.createElement('div');
        content.className = 'usage-content';
        content.id = `usage-${this.generateCardId(property.uri)}`;

        // Initially collapsed
        if (!this.expandedCards.has(property.uri)) {
            content.classList.add('collapsed');
        }

        // Create example triples
        property.domains.forEach(domainUri => {
            const domainClass = this.parser.getClass(domainUri);
            if (domainClass) {
                property.ranges.forEach(rangeUri => {
                    const rangeClass = this.parser.getClass(rangeUri);
                    if (rangeClass) {
                        const example = document.createElement('div');
                        example.className = 'usage-example';

                        const triple = document.createElement('code');
                        triple.className = 'triple';
                        triple.innerHTML = `
                            <span class="triple-subject">${domainClass.name}</span>
                            <span class="triple-predicate">${property.name}</span>
                            <span class="triple-object">${rangeClass.name}</span>
                        `;

                        example.appendChild(triple);
                        content.appendChild(example);
                    }
                });
            }
        });

        section.appendChild(content);
        return section;
    }

    /**
     * Find subproperties of a given property
     */
    findSubProperties(propertyUri) {
        // In OWL, subproperties are defined via rdfs:subPropertyOf
        // We need to look through all properties to find those that have this as super
        const subProps = [];

        this.parser.properties.forEach((prop, uri) => {
            // Check if this property has the given property as a super property
            // This would be encoded in the raw data, but we don't have that relationship extracted
            // For now, we'll return empty array - this could be enhanced with more parsing
        });

        return subProps;
    }

    /**
     * Find super properties of a given property
     */
    findSuperProperties(propertyUri) {
        // Similar to above, would need additional parsing
        return [];
    }

    /**
     * Toggle card expansion
     */
    toggleCardExpansion(propertyUri) {
        const cardId = this.generateCardId(propertyUri);
        const content = document.getElementById(`usage-${cardId}`);
        const toggleBtn = document.querySelector(`[data-property-uri="${propertyUri}"] .toggle-btn`);

        if (content) {
            content.classList.toggle('collapsed');
            if (toggleBtn) {
                toggleBtn.classList.toggle('expanded');
            }

            // Update expanded state
            if (this.expandedCards.has(propertyUri)) {
                this.expandedCards.delete(propertyUri);
            } else {
                this.expandedCards.add(propertyUri);
            }

            this.saveExpandedState();
        }
    }

    /**
     * Navigate to a specific property
     */
    navigateToProperty(propertyUri) {
        const cardId = this.generateCardId(propertyUri);
        const card = document.getElementById(cardId);

        if (card) {
            card.scrollIntoView({ behavior: 'smooth', block: 'center' });

            // Highlight temporarily
            card.classList.add('highlight');
            setTimeout(() => {
                card.classList.remove('highlight');
            }, 2000);
        }
    }

    /**
     * Generate a safe ID for a property card
     */
    generateCardId(uri) {
        return 'property-' + uri.split('#').pop().toLowerCase().replace(/[^a-z0-9]/g, '-');
    }

    /**
     * Generate class card ID (for links to class browser)
     */
    generateClassCardId(uri) {
        return 'class-' + uri.split('#').pop().toLowerCase().replace(/[^a-z0-9]/g, '-');
    }

    /**
     * Extract name from URI
     */
    extractNameFromURI(uri) {
        if (uri.includes('#')) {
            return uri.split('#').pop();
        }
        if (uri.includes('/')) {
            return uri.split('/').pop();
        }
        return uri;
    }

    /**
     * Format characteristic name
     */
    formatCharacteristic(char) {
        return char.charAt(0).toUpperCase() + char.slice(1);
    }

    /**
     * Get characteristic description
     */
    getCharacteristicDescription(char) {
        const descriptions = {
            functional: 'Each subject can have at most one value',
            inverseFunctional: 'Each object can be the value of at most one subject',
            transitive: 'If A relates to B and B relates to C, then A relates to C',
            symmetric: 'If A relates to B, then B relates to A',
            asymmetric: 'If A relates to B, then B does not relate to A',
            reflexive: 'Every individual relates to itself'
        };
        return descriptions[char] || char;
    }

    /**
     * Save expanded state to localStorage
     */
    saveExpandedState() {
        try {
            localStorage.setItem('dul-properties-expanded', JSON.stringify([...this.expandedCards]));
        } catch (e) {
            console.warn('Could not save expanded state:', e);
        }
    }

    /**
     * Load expanded state from localStorage
     */
    loadExpandedState() {
        try {
            const saved = localStorage.getItem('dul-properties-expanded');
            if (saved) {
                this.expandedCards = new Set(JSON.parse(saved));
            }
        } catch (e) {
            console.warn('Could not load expanded state:', e);
        }
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PropertyCardBuilder;
}
