/**
 * Properties Browser Application Logic
 * Coordinates property-focused interface components
 */

class PropertiesBrowserApp {
    constructor() {
        this.parser = new DULParser();
        this.propertyCardBuilder = null;
        this.isLoading = false;
        this.currentFilter = 'all'; // 'all', 'ObjectProperty', 'DatatypeProperty'
        this.searchResults = [];
        this.searchQuery = '';
    }

    /**
     * Initialize the application
     */
    async initialize() {
        console.log('Initializing DUL Properties Browser...');

        this.showLoading();

        try {
            // Load the ontology data
            const result = await this.parser.loadFromFile('DUL.jsonld');

            if (!result.success) {
                throw new Error(result.error);
            }

            // Initialize property card builder
            this.propertyCardBuilder = new PropertyCardBuilder(this.parser);

            // Render the interface
            this.render();

            // Set up event listeners
            this.setupEventListeners();

            // Update statistics
            this.updateStatistics();

            // Populate property index
            this.populatePropertyIndex();

            this.hideLoading();

            console.log('Properties Browser initialized successfully');

        } catch (error) {
            console.error('Failed to initialize application:', error);
            this.showError('Failed to load ontology: ' + error.message);
        }
    }

    /**
     * Render all property cards
     */
    render() {
        const mainContent = document.getElementById('main-content');

        if (!mainContent) {
            console.error('Main content container not found');
            return;
        }

        // Clear existing content
        mainContent.innerHTML = '';

        // Get all properties
        const allProperties = Array.from(this.parser.properties.values());

        // Sort alphabetically by name
        allProperties.sort((a, b) => a.name.localeCompare(b.name));

        console.log(`Rendering ${allProperties.length} properties...`);

        // Render each property card
        allProperties.forEach(property => {
            const card = this.propertyCardBuilder.createPropertyCard(property.uri);
            if (card) {
                mainContent.appendChild(card);
            }
        });

        console.log('Rendering complete');
    }

    /**
     * Set up event listeners for UI controls
     */
    setupEventListeners() {
        // Filter buttons
        const filterButtons = document.querySelectorAll('.btn-filter');
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.dataset.filter;
                this.setFilter(filter);

                // Update active state
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });

        // Expand all button
        const expandAllBtn = document.getElementById('expand-all-btn');
        if (expandAllBtn) {
            expandAllBtn.addEventListener('click', () => {
                this.expandAll();
            });
        }

        // Collapse all button
        const collapseAllBtn = document.getElementById('collapse-all-btn');
        if (collapseAllBtn) {
            collapseAllBtn.addEventListener('click', () => {
                this.collapseAll();
            });
        }

        // Search functionality
        const searchInput = document.getElementById('search-input');
        const searchResults = document.getElementById('search-results');

        if (searchInput && searchResults) {
            let searchTimeout;

            searchInput.addEventListener('input', (e) => {
                clearTimeout(searchTimeout);
                const query = e.target.value.trim();

                if (query.length < 2) {
                    searchResults.classList.add('hidden');
                    this.searchQuery = '';
                    return;
                }

                // Debounce search
                searchTimeout = setTimeout(() => {
                    this.performSearch(query);
                }, 300);
            });

            // Handle keyboard navigation in search
            searchInput.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    searchResults.classList.add('hidden');
                    searchInput.blur();
                } else if (e.key === 'Enter') {
                    const selectedResult = searchResults.querySelector('.search-result-item.selected');
                    if (selectedResult) {
                        const propertyUri = selectedResult.dataset.propertyUri;
                        this.propertyCardBuilder.navigateToProperty(propertyUri);
                        searchResults.classList.add('hidden');
                        searchInput.value = '';
                    }
                }
            });

            // Click outside to close
            document.addEventListener('click', (e) => {
                if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
                    searchResults.classList.add('hidden');
                }
            });
        }

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            this.handleKeyboardShortcuts(e);
        });

        // Back to top button
        const backToTopBtn = document.getElementById('back-to-top-btn');
        if (backToTopBtn) {
            backToTopBtn.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });

            // Show/hide based on scroll position
            window.addEventListener('scroll', () => {
                if (window.scrollY > 500) {
                    backToTopBtn.classList.add('visible');
                } else {
                    backToTopBtn.classList.remove('visible');
                }
            });
        }

        // Property index toggle
        const toggleIndexBtn = document.getElementById('toggle-index-btn');
        if (toggleIndexBtn) {
            toggleIndexBtn.addEventListener('click', () => {
                this.togglePropertyIndex();
            });
        }

        // Export button
        const exportBtn = document.getElementById('export-btn');
        if (exportBtn) {
            exportBtn.addEventListener('click', () => {
                this.exportData();
            });
        }

        // Theme toggle
        const themeToggleBtn = document.getElementById('theme-toggle-btn');
        if (themeToggleBtn) {
            themeToggleBtn.addEventListener('click', () => {
                this.toggleTheme();
            });
        }
    }

    /**
     * Handle keyboard shortcuts
     */
    handleKeyboardShortcuts(e) {
        // Ignore if user is typing in input field
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
            return;
        }

        if (e.ctrlKey || e.metaKey) {
            switch (e.key.toLowerCase()) {
                case 'f':
                    e.preventDefault();
                    document.getElementById('search-input').focus();
                    break;

                case 'e':
                    e.preventDefault();
                    this.expandAll();
                    break;

                case 'q':
                    e.preventDefault();
                    this.collapseAll();
                    break;

                case 'i':
                    e.preventDefault();
                    this.togglePropertyIndex();
                    break;
            }
        }

        // Home key - scroll to top
        if (e.key === 'Home' && !e.ctrlKey) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    /**
     * Set filter for property types
     */
    setFilter(filter) {
        this.currentFilter = filter;

        const allCards = document.querySelectorAll('.property-card');

        allCards.forEach(card => {
            if (filter === 'all') {
                card.style.display = '';
            } else {
                const cardType = card.classList.contains(filter.toLowerCase()) ? filter.toLowerCase() : null;

                if (cardType === filter.toLowerCase()) {
                    card.style.display = '';
                } else {
                    card.style.display = 'none';
                }
            }
        });

        console.log(`Filter set to: ${filter}`);
    }

    /**
     * Expand all property cards
     */
    expandAll() {
        const allContents = document.querySelectorAll('.usage-content');
        const allToggleBtns = document.querySelectorAll('.property-card .toggle-btn');

        allContents.forEach(content => {
            content.classList.remove('collapsed');
        });

        allToggleBtns.forEach(btn => {
            btn.classList.add('expanded');
        });

        // Save all to expanded state
        const allPropertyUris = Array.from(this.parser.properties.keys());
        this.propertyCardBuilder.expandedCards = new Set(allPropertyUris);
        this.propertyCardBuilder.saveExpandedState();

        console.log('All properties expanded');
    }

    /**
     * Collapse all property cards
     */
    collapseAll() {
        const allContents = document.querySelectorAll('.usage-content');
        const allToggleBtns = document.querySelectorAll('.property-card .toggle-btn');

        allContents.forEach(content => {
            content.classList.add('collapsed');
        });

        allToggleBtns.forEach(btn => {
            btn.classList.remove('expanded');
        });

        // Clear expanded state
        this.propertyCardBuilder.expandedCards.clear();
        this.propertyCardBuilder.saveExpandedState();

        console.log('All properties collapsed');
    }

    /**
     * Perform search
     */
    performSearch(query) {
        this.searchQuery = query.toLowerCase();
        const results = this.parser.searchProperties(query);

        this.searchResults = results;
        this.displaySearchResults(results);
    }

    /**
     * Display search results
     */
    displaySearchResults(results) {
        const searchResultsDiv = document.getElementById('search-results');

        if (!searchResultsDiv) return;

        searchResultsDiv.innerHTML = '';

        if (results.length === 0) {
            searchResultsDiv.innerHTML = '<div class="search-no-results">No properties found</div>';
            searchResultsDiv.classList.remove('hidden');
            return;
        }

        // Header
        const header = document.createElement('div');
        header.className = 'search-results-header';
        header.innerHTML = `
            <span class="results-count">${results.length} result${results.length !== 1 ? 's' : ''}</span>
            <button class="clear-search-btn" title="Clear search">×</button>
        `;

        const clearBtn = header.querySelector('.clear-search-btn');
        clearBtn.addEventListener('click', () => {
            document.getElementById('search-input').value = '';
            searchResultsDiv.classList.add('hidden');
            this.searchQuery = '';
        });

        searchResultsDiv.appendChild(header);

        // Results list
        const list = document.createElement('ul');
        list.className = 'search-results-list';

        results.forEach((property, index) => {
            const item = document.createElement('li');
            item.className = 'search-result-item';
            if (index === 0) {
                item.classList.add('selected');
            }
            item.dataset.propertyUri = property.uri;

            const name = document.createElement('div');
            name.className = 'result-name';
            name.innerHTML = this.highlightText(property.name, this.searchQuery);

            const meta = document.createElement('div');
            meta.className = 'result-meta';
            meta.textContent = property.type;

            item.appendChild(name);
            item.appendChild(meta);

            item.addEventListener('click', () => {
                this.propertyCardBuilder.navigateToProperty(property.uri);
                searchResultsDiv.classList.add('hidden');
                document.getElementById('search-input').value = '';
            });

            list.appendChild(item);
        });

        searchResultsDiv.appendChild(list);
        searchResultsDiv.classList.remove('hidden');
    }

    /**
     * Highlight search term in text
     */
    highlightText(text, query) {
        const regex = new RegExp(`(${query})`, 'gi');
        return text.replace(regex, '<span class="search-highlight">$1</span>');
    }

    /**
     * Update statistics display
     */
    updateStatistics() {
        const allProperties = Array.from(this.parser.properties.values());

        const objectProperties = allProperties.filter(p => p.type === 'ObjectProperty').length;
        const datatypeProperties = allProperties.filter(p => p.type === 'DatatypeProperty').length;
        const withInverse = allProperties.filter(p => p.inverse).length;

        const updateStat = (id, value) => {
            const element = document.getElementById(id);
            if (element) {
                element.textContent = value;
            }
        };

        updateStat('stat-total-properties', allProperties.length);
        updateStat('stat-object-properties', objectProperties);
        updateStat('stat-datatype-properties', datatypeProperties);
        updateStat('stat-with-inverse', withInverse);
    }

    /**
     * Toggle property index visibility
     */
    togglePropertyIndex() {
        const propertyIndex = document.getElementById('property-index');
        const toggleBtn = document.getElementById('toggle-index-btn');

        if (propertyIndex) {
            const isVisible = !propertyIndex.classList.contains('collapsed');

            if (isVisible) {
                propertyIndex.classList.add('collapsed');
                toggleBtn.setAttribute('title', 'Show Property Index');
            } else {
                propertyIndex.classList.remove('collapsed');
                toggleBtn.setAttribute('title', 'Hide Property Index');
            }
        }
    }

    /**
     * Populate property index with clickable links
     */
    populatePropertyIndex() {
        const indexContainer = document.getElementById('property-index-grid');

        if (!indexContainer) return;

        // Get all properties sorted by name
        const allProperties = Array.from(this.parser.properties.values())
            .sort((a, b) => a.name.localeCompare(b.name));

        indexContainer.innerHTML = '';

        allProperties.forEach(property => {
            const link = document.createElement('a');
            link.href = '#' + this.propertyCardBuilder.generateCardId(property.uri);
            link.className = 'class-index-link';
            link.textContent = property.name;
            link.title = `${property.type}: ${property.name}`;

            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.propertyCardBuilder.navigateToProperty(property.uri);
            });

            indexContainer.appendChild(link);
        });

        console.log(`Property index populated with ${allProperties.length} properties`);
    }

    /**
     * Export properties data
     */
    exportData() {
        const properties = Array.from(this.parser.properties.values()).map(prop => ({
            uri: prop.uri,
            name: prop.name,
            type: prop.type,
            definition: prop.definition,
            domains: prop.domains,
            ranges: prop.ranges,
            characteristics: prop.characteristics,
            inverse: prop.inverse
        }));

        const json = JSON.stringify(properties, null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = 'dul-properties-export.json';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        URL.revokeObjectURL(url);

        console.log('Properties data exported');
    }

    /**
     * Toggle theme (dark/light)
     */
    toggleTheme() {
        const body = document.body;
        const currentTheme = body.dataset.theme || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';

        body.dataset.theme = newTheme;
        localStorage.setItem('dul-theme', newTheme);

        console.log(`Theme changed to: ${newTheme}`);
    }

    /**
     * Load saved theme
     */
    loadTheme() {
        const savedTheme = localStorage.getItem('dul-theme') || 'light';
        document.body.dataset.theme = savedTheme;
    }

    /**
     * Show loading indicator
     */
    showLoading() {
        const loader = document.getElementById('loading-overlay');
        if (loader) {
            loader.classList.remove('hidden');
        }
    }

    /**
     * Hide loading indicator
     */
    hideLoading() {
        const loader = document.getElementById('loading-overlay');
        if (loader) {
            loader.classList.add('hidden');
        }
    }

    /**
     * Show error message
     */
    showError(message) {
        const errorDiv = document.getElementById('error-message');

        if (errorDiv) {
            errorDiv.textContent = message;
            errorDiv.classList.remove('hidden');
        } else {
            alert('Error: ' + message);
        }

        this.hideLoading();
    }
}

// Initialize application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const app = new PropertiesBrowserApp();

    // Load theme
    app.loadTheme();

    // Initialize app
    app.initialize();

    // Make app globally available for debugging
    window.propertiesApp = app;

    console.log('DUL Properties Browser loaded');
});
