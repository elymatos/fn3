/**
 * Card Component System for DUL Ontology Browser
 * Creates interactive card-based UI for classes and properties
 */

class CardBuilder {
    constructor(parser) {
        this.parser = parser;
        this.expandedCards = new Set();
        this.loadExpandedState();
    }

    /**
     * Create a class card element
     */
    createClassCard(classUri, level = 0) {
        const classData = this.parser.getClass(classUri);
        if (!classData) {
            return null;
        }

        const card = document.createElement('div');
        card.className = `class-card level-${level}`;
        card.dataset.classUri = classUri;
        card.dataset.className = classData.name.toLowerCase();
        card.id = this.generateCardId(classUri);

        // Add synthetic node class
        if (classData.isSynthetic) {
            card.classList.add('synthetic-node');
        }

        // Add top-level badge
        if (classData.isTopLevel) {
            card.classList.add('top-level');
        }

        // Build card header
        const header = this.createCardHeader(classData, level);
        card.appendChild(header);

        // Build card body
        const body = this.createCardBody(classData);
        card.appendChild(body);

        // Add subclasses section if exists
        if (classData.subClasses.length > 0) {
            const subclassesSection = this.createSubclassesSection(classData, level);
            card.appendChild(subclassesSection);
        }

        return card;
    }

    /**
     * Create card header
     */
    createCardHeader(classData, level) {
        const header = document.createElement('div');
        header.className = 'card-header';

        // Add synthetic class to header if applicable
        if (classData.isSynthetic) {
            header.classList.add('synthetic');
        }

        // Title row
        const titleRow = document.createElement('div');
        titleRow.className = 'title-row';

        // Synthetic icon (diamond)
        if (classData.isSynthetic) {
            const syntheticIcon = document.createElement('span');
            syntheticIcon.className = 'synthetic-icon';
            syntheticIcon.textContent = '◆';
            syntheticIcon.title = 'Logical Definition';
            titleRow.appendChild(syntheticIcon);
        }

        // Class name
        const title = document.createElement('h' + Math.min(level + 2, 6));
        title.className = 'card-title';
        title.textContent = classData.name;

        // Parent class badge
        if (classData.superClasses.length > 0) {
            const parentUri = classData.superClasses[0];
            const parentClass = this.parser.getClass(parentUri);
            if (parentClass) {
                const parentBadge = document.createElement('span');
                parentBadge.className = 'parent-badge';
                parentBadge.textContent = parentClass.name;
                parentBadge.title = `Subclass of ${parentClass.name}`;
                parentBadge.dataset.targetUri = parentUri;
                parentBadge.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.navigateToClass(parentUri);
                });
                title.appendChild(parentBadge);
            }
        }

        // Synthetic node badge
        if (classData.isSynthetic && classData.syntheticType) {
            const syntheticBadge = document.createElement('span');
            syntheticBadge.className = 'badge synthetic-badge';
            syntheticBadge.textContent = this.formatSyntheticType(classData.syntheticType);
            syntheticBadge.title = 'Synthetic node type';
            title.appendChild(syntheticBadge);
        }

        // Top-level badge
        if (classData.isTopLevel) {
            const topBadge = document.createElement('span');
            topBadge.className = 'badge badge-top-level';
            topBadge.textContent = 'Top Level';
            title.appendChild(topBadge);
        }

        titleRow.appendChild(title);

        // Expand/collapse button for subclasses
        if (classData.subClasses.length > 0) {
            const toggleBtn = document.createElement('button');
            toggleBtn.className = 'toggle-btn';
            toggleBtn.innerHTML = `
                <svg class="icon" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/>
                </svg>
            `;
            toggleBtn.title = 'Expand/collapse subclasses';
            toggleBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleCardExpansion(classData.uri);
            });

            // Set initial state
            if (this.expandedCards.has(classData.uri)) {
                toggleBtn.classList.add('expanded');
            }

            titleRow.appendChild(toggleBtn);
        }

        header.appendChild(titleRow);

        // URI link
        const uriLink = document.createElement('a');
        uriLink.className = 'uri-link';
        uriLink.href = classData.uri;
        uriLink.target = '_blank';
        uriLink.textContent = classData.uri;
        uriLink.title = 'Open ontology URI';
        header.appendChild(uriLink);

        return header;
    }

    /**
     * Create card body with definition and properties
     */
    createCardBody(classData) {
        const body = document.createElement('div');
        body.className = 'card-body';

        // For synthetic nodes, show logical definition first
        if (classData.isSynthetic && classData.logicalDefinition) {
            const logicalDefSection = this.createLogicalDefinitionSection(classData);
            body.appendChild(logicalDefSection);
        }

        // Equivalent To section (for classes with logical definitions)
        if (classData.equivalentClass) {
            const equivalentSection = this.createEquivalentClassSection(classData);
            body.appendChild(equivalentSection);
        }

        // Definition
        if (classData.definition && !classData.isSynthetic) {
            const definition = document.createElement('div');
            definition.className = 'definition';
            definition.textContent = classData.definition;
            body.appendChild(definition);
        } else if (!classData.isSynthetic) {
            const noDefinition = document.createElement('div');
            noDefinition.className = 'no-definition';
            noDefinition.textContent = 'No definition available.';
            body.appendChild(noDefinition);
        }

        // Applies To section (for synthetic nodes)
        if (classData.isSynthetic && classData.appliesTo) {
            const appliesToSection = this.createAppliesToSection(classData);
            body.appendChild(appliesToSection);
        }

        // Referenced Classes section (for synthetic nodes)
        if (classData.isSynthetic && classData.involvedClasses && classData.involvedClasses.length > 0) {
            const referencedClassesSection = this.createReferencedClassesSection(classData);
            body.appendChild(referencedClassesSection);
        }

        // Referenced Properties section (for synthetic nodes)
        if (classData.isSynthetic && classData.involvedProperties && classData.involvedProperties.length > 0) {
            const referencedPropsSection = this.createReferencedPropertiesSection(classData);
            body.appendChild(referencedPropsSection);
        }

        // Superclasses section
        if (classData.superClasses.length > 0 && !classData.isSynthetic) {
            const superSection = this.createSuperclassesSection(classData);
            body.appendChild(superSection);
        }

        // Properties section
        const properties = this.parser.getPropertiesForClass(classData.uri);
        if (properties.length > 0) {
            const propsSection = this.createPropertiesSection(properties, classData);
            body.appendChild(propsSection);
        }

        // Disjoint with section
        if (classData.disjointWith.length > 0) {
            const disjointSection = this.createDisjointSection(classData);
            body.appendChild(disjointSection);
        }

        return body;
    }

    /**
     * Create superclasses section
     */
    createSuperclassesSection(classData) {
        const section = document.createElement('div');
        section.className = 'section superclasses-section';

        const title = document.createElement('h4');
        title.className = 'section-title';
        title.textContent = 'Subclass Of:';
        section.appendChild(title);

        const list = document.createElement('ul');
        list.className = 'class-list';

        // Add regular superclass links
        classData.superClasses.forEach(superUri => {
            const superClass = this.parser.getClass(superUri);
            if (superClass) {
                const item = document.createElement('li');

                const link = document.createElement('a');
                link.href = '#' + this.generateCardId(superUri);
                link.className = 'class-link';
                link.textContent = superClass.name;
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.navigateToClass(superUri);
                });

                item.appendChild(link);
                list.appendChild(item);
            }
        });

        // Add restrictions from subClassOf
        if (classData.superClassRestrictions && classData.superClassRestrictions.length > 0) {
            classData.superClassRestrictions.forEach(restriction => {
                const item = document.createElement('li');
                item.className = 'restriction-item';

                const restrictionDisplay = this.renderLogicalDefinition(restriction);
                restrictionDisplay.classList.add('inline-restriction');
                item.appendChild(restrictionDisplay);

                list.appendChild(item);
            });
        }

        section.appendChild(list);
        return section;
    }

    /**
     * Create equivalent class section
     */
    createEquivalentClassSection(classData) {
        const section = document.createElement('div');
        section.className = 'section equivalent-class-section';

        const title = document.createElement('h4');
        title.className = 'section-title';
        title.innerHTML = '≡ Equivalent To:';
        section.appendChild(title);

        const definition = classData.equivalentClass;
        const formula = document.createElement('div');
        formula.className = 'logic-formula equivalent-formula';

        // Render the logical definition
        const renderedDef = this.renderLogicalDefinition(definition);
        formula.appendChild(renderedDef);

        section.appendChild(formula);
        return section;
    }

    /**
     * Render a logical definition recursively
     */
    renderLogicalDefinition(def) {
        const container = document.createElement('div');
        container.className = 'logic-expression';

        if (def.type === 'restriction') {
            const restriction = document.createElement('span');
            restriction.className = 'logic-restriction';

            const propertyLink = document.createElement('a');
            propertyLink.className = 'property-link';
            propertyLink.textContent = def.property.name;
            propertyLink.href = '#';
            propertyLink.title = def.property.uri;

            const fillerLink = document.createElement('a');
            fillerLink.className = 'class-link';
            fillerLink.textContent = def.filler.name;
            fillerLink.href = '#';
            fillerLink.title = def.filler.uri;
            if (def.filler.uri && !def.filler.uri.startsWith('http')) {
                fillerLink.classList.add('literal-value');
            } else {
                fillerLink.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.navigateToClass(def.filler.uri);
                });
            }

            restriction.innerHTML = `<span class="logic-keyword">${def.quantifier}</span> `;
            restriction.appendChild(propertyLink);
            restriction.innerHTML += ' ';
            restriction.appendChild(fillerLink);

            container.appendChild(restriction);

        } else if (def.type === 'intersection' || def.type === 'union') {
            const operator = def.type === 'intersection' ? ' ⊓ ' : ' ⊔ ';

            def.operands.forEach((operand, index) => {
                if (index > 0) {
                    const opSpan = document.createElement('span');
                    opSpan.className = 'logic-operator';
                    opSpan.textContent = operator;
                    container.appendChild(opSpan);
                }

                if (operand.type === 'class') {
                    const classLink = document.createElement('a');
                    classLink.className = 'class-link';
                    classLink.textContent = operand.name;
                    classLink.href = '#';
                    classLink.title = operand.uri;
                    classLink.addEventListener('click', (e) => {
                        e.preventDefault();
                        this.navigateToClass(operand.uri);
                    });
                    container.appendChild(classLink);
                } else {
                    // Nested expression - wrap in parentheses
                    const nested = document.createElement('span');
                    nested.className = 'logic-nested';
                    nested.textContent = '(';
                    container.appendChild(nested);

                    const nestedDef = this.renderLogicalDefinition(operand);
                    container.appendChild(nestedDef);

                    const closeParen = document.createElement('span');
                    closeParen.className = 'logic-nested';
                    closeParen.textContent = ')';
                    container.appendChild(closeParen);
                }
            });

        } else if (def.type === 'complement') {
            const complement = document.createElement('span');
            complement.className = 'logic-complement';
            complement.textContent = '¬ ';
            container.appendChild(complement);

            const classLink = document.createElement('a');
            classLink.className = 'class-link';
            classLink.textContent = def.operand.name;
            classLink.href = '#';
            classLink.title = def.operand.uri;
            classLink.addEventListener('click', (e) => {
                e.preventDefault();
                this.navigateToClass(def.operand.uri);
            });
            container.appendChild(classLink);
        }

        return container;
    }

    /**
     * Create properties section
     */
    createPropertiesSection(properties, classData) {
        const section = document.createElement('div');
        section.className = 'section properties-section collapsible';

        const header = document.createElement('div');
        header.className = 'section-header';

        const title = document.createElement('h4');
        title.className = 'section-title';
        title.innerHTML = `Properties <span class="count">(${properties.length})</span>`;

        const toggleBtn = document.createElement('button');
        toggleBtn.className = 'section-toggle-btn';
        toggleBtn.innerHTML = '<svg class="icon" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/></svg>';

        header.appendChild(title);
        header.appendChild(toggleBtn);
        section.appendChild(header);

        const content = document.createElement('div');
        content.className = 'section-content collapsed';

        properties.forEach(property => {
            const propCard = this.createPropertyCard(property);
            content.appendChild(propCard);
        });

        section.appendChild(content);

        // Toggle functionality
        header.addEventListener('click', () => {
            content.classList.toggle('collapsed');
            toggleBtn.classList.toggle('expanded');
        });

        return section;
    }

    /**
     * Create property card (subcard)
     */
    createPropertyCard(property) {
        const card = document.createElement('div');
        card.className = `property-card ${property.type.toLowerCase()}`;

        // Property name and type
        const header = document.createElement('div');
        header.className = 'property-header';

        const name = document.createElement('span');
        name.className = 'property-name';
        name.textContent = property.name;

        const type = document.createElement('span');
        type.className = 'property-type';
        type.textContent = property.type;

        header.appendChild(name);
        header.appendChild(type);
        card.appendChild(header);

        // Property details
        const details = document.createElement('div');
        details.className = 'property-details';

        // Range
        if (property.ranges.length > 0) {
            const rangeDiv = document.createElement('div');
            rangeDiv.className = 'property-range';

            const rangeLabel = document.createElement('strong');
            rangeLabel.textContent = 'Range: ';
            rangeDiv.appendChild(rangeLabel);

            property.ranges.forEach((rangeUri, index) => {
                if (index > 0) {
                    rangeDiv.appendChild(document.createTextNode(', '));
                }

                const rangeClass = this.parser.getClass(rangeUri);
                const rangeName = rangeClass ? rangeClass.name : this.extractNameFromURI(rangeUri);

                if (rangeClass) {
                    const link = document.createElement('a');
                    link.href = '#' + this.generateCardId(rangeUri);
                    link.className = 'class-link';
                    link.textContent = rangeName;
                    link.addEventListener('click', (e) => {
                        e.preventDefault();
                        this.navigateToClass(rangeUri);
                    });
                    rangeDiv.appendChild(link);
                } else {
                    rangeDiv.appendChild(document.createTextNode(rangeName));
                }
            });

            details.appendChild(rangeDiv);
        }

        // Characteristics
        const activeCharacteristics = Object.entries(property.characteristics)
            .filter(([key, value]) => value)
            .map(([key]) => key);

        if (activeCharacteristics.length > 0) {
            const charDiv = document.createElement('div');
            charDiv.className = 'property-characteristics';

            const charLabel = document.createElement('strong');
            charLabel.textContent = 'Characteristics: ';
            charDiv.appendChild(charLabel);

            activeCharacteristics.forEach((char, index) => {
                if (index > 0) {
                    charDiv.appendChild(document.createTextNode(', '));
                }

                const badge = document.createElement('span');
                badge.className = 'badge badge-characteristic';
                badge.textContent = char;
                charDiv.appendChild(badge);
            });

            details.appendChild(charDiv);
        }

        // Inverse property
        if (property.inverse) {
            const inverseProp = this.parser.getProperty(property.inverse);
            if (inverseProp) {
                const inverseDiv = document.createElement('div');
                inverseDiv.className = 'property-inverse';

                const inverseLabel = document.createElement('strong');
                inverseLabel.textContent = 'Inverse of: ';
                inverseDiv.appendChild(inverseLabel);

                inverseDiv.appendChild(document.createTextNode(inverseProp.name));

                details.appendChild(inverseDiv);
            }
        }

        // Definition
        if (property.definition) {
            const defDiv = document.createElement('div');
            defDiv.className = 'property-definition';
            defDiv.textContent = property.definition;
            details.appendChild(defDiv);
        }

        card.appendChild(details);
        return card;
    }

    /**
     * Create disjoint with section
     */
    createDisjointSection(classData) {
        const section = document.createElement('div');
        section.className = 'section disjoint-section';

        const title = document.createElement('h4');
        title.className = 'section-title';
        title.textContent = 'Disjoint With:';
        section.appendChild(title);

        const list = document.createElement('ul');
        list.className = 'class-list';

        classData.disjointWith.forEach(disjointUri => {
            const disjointClass = this.parser.getClass(disjointUri);
            if (disjointClass) {
                const item = document.createElement('li');

                const link = document.createElement('a');
                link.href = '#' + this.generateCardId(disjointUri);
                link.className = 'class-link';
                link.textContent = disjointClass.name;
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.navigateToClass(disjointUri);
                });

                item.appendChild(link);
                list.appendChild(item);
            }
        });

        section.appendChild(list);
        return section;
    }

    /**
     * Create subclasses section
     */
    createSubclassesSection(classData, level) {
        const section = document.createElement('div');
        section.className = 'subclasses-section';
        section.dataset.parentUri = classData.uri;

        // Header with subclass links
        const header = document.createElement('div');
        header.className = 'subclasses-header';

        const title = document.createElement('h4');
        title.className = 'section-title';
        title.innerHTML = `Subclasses <span class="count">(${classData.subClasses.length})</span>`;
        header.appendChild(title);

        section.appendChild(header);

        // Subclass links list
        const linksList = document.createElement('ul');
        linksList.className = 'subclass-links';

        classData.subClasses
            .sort((a, b) => {
                const classA = this.parser.getClass(a);
                const classB = this.parser.getClass(b);
                return classA.name.localeCompare(classB.name);
            })
            .forEach(subUri => {
                const subClass = this.parser.getClass(subUri);
                if (subClass) {
                    const item = document.createElement('li');

                    const link = document.createElement('a');
                    link.href = '#' + this.generateCardId(subUri);
                    link.className = 'class-link';
                    link.textContent = subClass.name;
                    link.addEventListener('click', (e) => {
                        e.preventDefault();
                        this.navigateToClass(subUri);
                    });

                    item.appendChild(link);
                    linksList.appendChild(item);
                }
            });

        section.appendChild(linksList);

        // Expandable container for detailed subclass cards
        const container = document.createElement('div');
        container.className = 'subclasses-container';
        container.id = `subclasses-${this.generateCardId(classData.uri)}`;

        // Initially collapsed
        if (!this.expandedCards.has(classData.uri)) {
            container.classList.add('collapsed');
        }

        classData.subClasses.forEach(subUri => {
            const subCard = this.createClassCard(subUri, level + 1);
            if (subCard) {
                container.appendChild(subCard);
            }
        });

        section.appendChild(container);

        return section;
    }

    /**
     * Toggle card expansion state
     */
    toggleCardExpansion(classUri) {
        const cardId = this.generateCardId(classUri);
        const container = document.getElementById(`subclasses-${cardId}`);
        const toggleBtn = document.querySelector(`[data-class-uri="${classUri}"] .toggle-btn`);

        if (container) {
            container.classList.toggle('collapsed');
            if (toggleBtn) {
                toggleBtn.classList.toggle('expanded');
            }

            // Update expanded state
            if (this.expandedCards.has(classUri)) {
                this.expandedCards.delete(classUri);
            } else {
                this.expandedCards.add(classUri);
            }

            this.saveExpandedState();
        }
    }

    /**
     * Expand all cards
     */
    expandAll() {
        document.querySelectorAll('.subclasses-container').forEach(container => {
            container.classList.remove('collapsed');
        });

        document.querySelectorAll('.toggle-btn').forEach(btn => {
            btn.classList.add('expanded');
        });

        // Save all class URIs as expanded
        this.parser.classes.forEach((classData, uri) => {
            if (classData.subClasses.length > 0) {
                this.expandedCards.add(uri);
            }
        });

        this.saveExpandedState();
    }

    /**
     * Collapse all cards
     */
    collapseAll() {
        document.querySelectorAll('.subclasses-container').forEach(container => {
            container.classList.add('collapsed');
        });

        document.querySelectorAll('.toggle-btn').forEach(btn => {
            btn.classList.remove('expanded');
        });

        this.expandedCards.clear();
        this.saveExpandedState();
    }

    /**
     * Navigate to a specific class
     */
    navigateToClass(classUri) {
        const cardId = this.generateCardId(classUri);
        const card = document.getElementById(cardId);

        if (card) {
            // Expand all parent sections to make the card visible
            this.expandParentSections(card);

            // Scroll to card
            card.scrollIntoView({ behavior: 'smooth', block: 'center' });

            // Highlight temporarily
            card.classList.add('highlight');
            setTimeout(() => {
                card.classList.remove('highlight');
            }, 2000);
        }
    }

    /**
     * Expand all parent sections of a card
     */
    expandParentSections(element) {
        let parent = element.parentElement;

        while (parent) {
            if (parent.classList.contains('subclasses-container')) {
                parent.classList.remove('collapsed');

                // Find and update toggle button
                const parentCard = parent.closest('.class-card');
                if (parentCard) {
                    const toggleBtn = parentCard.querySelector('.toggle-btn');
                    if (toggleBtn) {
                        toggleBtn.classList.add('expanded');
                    }

                    const classUri = parentCard.dataset.classUri;
                    if (classUri) {
                        this.expandedCards.add(classUri);
                    }
                }
            }

            parent = parent.parentElement;
        }

        this.saveExpandedState();
    }

    /**
     * Generate a safe ID for a class card
     */
    generateCardId(uri) {
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
     * Save expanded state to localStorage
     */
    saveExpandedState() {
        try {
            localStorage.setItem('dul-expanded-cards', JSON.stringify([...this.expandedCards]));
        } catch (e) {
            console.warn('Could not save expanded state:', e);
        }
    }

    /**
     * Format synthetic type for display
     */
    formatSyntheticType(type) {
        const typeMap = {
            'existential_restriction': '∃ Restriction',
            'universal_restriction': '∀ Restriction',
            'value_restriction': 'Value Restriction',
            'cardinality_restriction': 'Cardinality',
            'intersection': '⊓ Intersection',
            'union': '⊔ Union',
            'complement': '¬ Complement',
            'equivalent_class': '≡ Equivalent'
        };
        return typeMap[type] || type;
    }

    /**
     * Create logical definition section
     */
    createLogicalDefinitionSection(classData) {
        const section = document.createElement('div');
        section.className = 'section logical-definition';

        const title = document.createElement('h4');
        title.className = 'section-title';
        title.textContent = 'Logical Definition:';
        section.appendChild(title);

        const def = classData.logicalDefinition;
        const formula = document.createElement('div');
        formula.className = 'logic-formula';

        if (def.type === 'restriction') {
            formula.innerHTML = `
                <code>
                    <span class="logic-quantifier">${def.quantifier}</span>
                    <span class="logic-property">${this.getClassName(def.property)}</span>
                    <span class="logic-filler">${this.getClassName(def.filler || def.value)}</span>
                </code>
            `;

            const explanation = document.createElement('div');
            explanation.className = 'logic-explanation';
            explanation.textContent = `Any instance must ${def.quantifier.includes('∃') ? 'have at least one' : 'only have'} ${this.getClassName(def.property)} relationship to instances of ${this.getClassName(def.filler || def.value)}.`;
            section.appendChild(explanation);

        } else if (def.type === 'intersection') {
            const operandNames = (def.operands || []).map(uri => this.getClassName(uri));
            formula.innerHTML = `<code>${operandNames.join(' ⊓ ')}</code>`;

            const explanation = document.createElement('div');
            explanation.className = 'logic-explanation';
            explanation.textContent = 'Must satisfy ALL of these classes simultaneously.';
            section.appendChild(explanation);

        } else if (def.type === 'union') {
            const operandNames = (def.operands || []).map(uri => this.getClassName(uri));
            formula.innerHTML = `<code>${operandNames.join(' ⊔ ')}</code>`;

            const explanation = document.createElement('div');
            explanation.className = 'logic-explanation';
            explanation.textContent = 'Must satisfy AT LEAST ONE of these classes.';
            section.appendChild(explanation);

        } else if (def.type === 'complement') {
            formula.innerHTML = `<code>¬ ${this.getClassName(def.operand)}</code>`;

            const explanation = document.createElement('div');
            explanation.className = 'logic-explanation';
            explanation.textContent = `Must NOT be an instance of ${this.getClassName(def.operand)}.`;
            section.appendChild(explanation);
        }

        section.insertBefore(formula, section.children[1] || null);
        return section;
    }

    /**
     * Create applies to section
     */
    createAppliesToSection(classData) {
        const section = document.createElement('div');
        section.className = 'section applies-to-section';

        const title = document.createElement('h4');
        title.className = 'section-title';
        title.textContent = 'Applies To:';
        section.appendChild(title);

        const list = document.createElement('ul');
        list.className = 'class-list';

        const parentClass = this.parser.getClass(classData.appliesTo);
        if (parentClass) {
            const item = document.createElement('li');
            const link = document.createElement('a');
            link.href = '#' + this.generateCardId(classData.appliesTo);
            link.className = 'class-link';
            link.textContent = parentClass.name;
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.navigateToClass(classData.appliesTo);
            });
            item.appendChild(link);
            list.appendChild(item);
        }

        section.appendChild(list);
        return section;
    }

    /**
     * Create referenced classes section
     */
    createReferencedClassesSection(classData) {
        const section = document.createElement('div');
        section.className = 'section referenced-classes-section';

        const title = document.createElement('h4');
        title.className = 'section-title';
        title.textContent = 'Referenced Classes:';
        section.appendChild(title);

        const list = document.createElement('ul');
        list.className = 'class-list';

        classData.involvedClasses.forEach(refUri => {
            const refClass = this.parser.getClass(refUri);
            if (refClass) {
                const item = document.createElement('li');
                const link = document.createElement('a');
                link.href = '#' + this.generateCardId(refUri);
                link.className = 'class-link';
                link.textContent = refClass.name;
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.navigateToClass(refUri);
                });
                item.appendChild(link);
                list.appendChild(item);
            }
        });

        section.appendChild(list);
        return section;
    }

    /**
     * Create referenced properties section
     */
    createReferencedPropertiesSection(classData) {
        const section = document.createElement('div');
        section.className = 'section referenced-properties-section';

        const title = document.createElement('h4');
        title.className = 'section-title';
        title.textContent = 'Referenced Properties:';
        section.appendChild(title);

        const list = document.createElement('ul');
        list.className = 'property-list';

        classData.involvedProperties.forEach(propUri => {
            const prop = this.parser.getProperty(propUri);
            if (prop) {
                const item = document.createElement('li');
                const link = document.createElement('span');
                link.className = 'property-name';
                link.textContent = prop.name;
                link.title = prop.definition || 'Property';
                item.appendChild(link);
                list.appendChild(item);
            }
        });

        section.appendChild(list);
        return section;
    }

    /**
     * Get class name from URI
     */
    getClassName(uri) {
        if (!uri) return 'Unknown';

        // Handle object format (new parser format)
        if (typeof uri === 'object') {
            if (uri.name) return uri.name;
            if (uri.uri) uri = uri.uri; // Extract URI from object
            else return 'Unknown';
        }

        // Handle string format
        if (typeof uri !== 'string') return 'Unknown';

        const classData = this.parser.getClass(uri);
        if (classData) return classData.name;

        // Extract from URI if not found
        if (uri.includes('#')) return uri.split('#').pop();
        if (uri.includes('/')) return uri.split('/').pop();
        return uri;
    }

    /**
     * Load expanded state from localStorage
     */
    loadExpandedState() {
        try {
            const saved = localStorage.getItem('dul-expanded-cards');
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
    module.exports = CardBuilder;
}
