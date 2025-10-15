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

        // Title row
        const titleRow = document.createElement('div');
        titleRow.className = 'title-row';

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

        // Definition
        if (classData.definition) {
            const definition = document.createElement('div');
            definition.className = 'definition';
            definition.textContent = classData.definition;
            body.appendChild(definition);
        } else {
            const noDefinition = document.createElement('div');
            noDefinition.className = 'no-definition';
            noDefinition.textContent = 'No definition available.';
            body.appendChild(noDefinition);
        }

        // Superclasses section
        if (classData.superClasses.length > 0) {
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

        section.appendChild(list);
        return section;
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
