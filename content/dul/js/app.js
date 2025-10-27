/**
 * Main Application Logic for DUL Ontology Browser
 * Coordinates all components and handles user interactions
 */

class DULBrowserApp {
    constructor() {
        this.parser = new DULParser();
        this.cardBuilder = null;
        this.searchManager = null;
        this.isLoading = false;
        this.viewMode = 'hierarchical'; // 'hierarchical' or 'flat'
    }

    /**
     * Initialize the application
     */
    async initialize() {
        console.log('Initializing DUL Ontology Browser...');

        this.showLoading();

        try {
            // Load the ontology data (with synthetic nodes)
            const result = await this.parser.loadFromFile('DUL.jsonld');

            if (!result.success) {
                throw new Error(result.error);
            }

            // Initialize components
            this.cardBuilder = new CardBuilder(this.parser);
            this.searchManager = new SearchManager(this.parser, this.cardBuilder);

            // Render the interface
            this.render();

            // Set up event listeners
            this.setupEventListeners();

            // Initialize search
            this.searchManager.initialize('search-input', 'search-results');

            // Update statistics
            this.updateStatistics();

            this.hideLoading();

            console.log('Application initialized successfully');

        } catch (error) {
            console.error('Failed to initialize application:', error);
            this.showError('Failed to load ontology: ' + error.message);
        }
    }

    /**
     * Render the main interface
     */
    render() {
        const mainContent = document.getElementById('main-content');

        if (!mainContent) {
            console.error('Main content container not found');
            return;
        }

        // Clear existing content
        mainContent.innerHTML = '';

        // Get top-level classes
        const topLevelClasses = this.parser.getTopLevelClasses();

        console.log(`Rendering ${topLevelClasses.length} top-level classes...`);

        // Render each top-level class card
        topLevelClasses.forEach(classData => {
            const card = this.cardBuilder.createClassCard(classData.uri, 0);
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
        // Expand all button
        const expandAllBtn = document.getElementById('expand-all-btn');
        if (expandAllBtn) {
            expandAllBtn.addEventListener('click', () => {
                this.cardBuilder.expandAll();
            });
        }

        // Collapse all button
        const collapseAllBtn = document.getElementById('collapse-all-btn');
        if (collapseAllBtn) {
            collapseAllBtn.addEventListener('click', () => {
                this.cardBuilder.collapseAll();
            });
        }

        // View mode toggle
        const viewModeButtons = document.querySelectorAll('[data-view-mode]');
        viewModeButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const mode = btn.dataset.viewMode;
                this.setViewMode(mode);
            });
        });

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

        // Class index toggle
        const toggleIndexBtn = document.getElementById('toggle-index-btn');
        if (toggleIndexBtn) {
            toggleIndexBtn.addEventListener('click', () => {
                this.toggleClassIndex();
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
                    this.cardBuilder.expandAll();
                    break;

                case 'q':
                    e.preventDefault();
                    this.cardBuilder.collapseAll();
                    break;

                case 'i':
                    e.preventDefault();
                    this.toggleClassIndex();
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
     * Update statistics display
     */
    updateStatistics() {
        const stats = this.parser.statistics;

        const updateStat = (id, value) => {
            const element = document.getElementById(id);
            if (element) {
                element.textContent = value;
            }
        };

        updateStat('stat-total-classes', stats.totalClasses);
        updateStat('stat-total-properties', stats.totalProperties);
        updateStat('stat-max-depth', stats.maxDepth);
        updateStat('stat-top-level', stats.topLevelClasses);
    }

    /**
     * Toggle class index visibility
     */
    toggleClassIndex() {
        const classIndex = document.getElementById('class-index');
        const toggleBtn = document.getElementById('toggle-index-btn');
        const toggleIcon = toggleBtn.querySelector('.icon');

        if (classIndex) {
            const isVisible = !classIndex.classList.contains('collapsed');

            if (isVisible) {
                classIndex.classList.add('collapsed');
                toggleBtn.setAttribute('title', 'Show Class Index');
                if (toggleIcon) {
                    toggleIcon.style.transform = 'rotate(-90deg)';
                }
            } else {
                classIndex.classList.remove('collapsed');
                toggleBtn.setAttribute('title', 'Hide Class Index');
                if (toggleIcon) {
                    toggleIcon.style.transform = 'rotate(0deg)';
                }
            }
        }
    }

    /**
     * Populate class index with clickable links
     */
    populateClassIndex() {
        const indexContainer = document.getElementById('class-index-grid');

        if (!indexContainer) return;

        // Get all classes sorted by name
        const allClasses = Array.from(this.parser.classes.values())
            .sort((a, b) => a.name.localeCompare(b.name));

        indexContainer.innerHTML = '';

        allClasses.forEach(classData => {
            const link = document.createElement('a');
            link.href = '#' + this.cardBuilder.generateCardId(classData.uri);
            link.className = 'class-index-link';
            link.textContent = classData.name;

            // Tooltip with parent info
            if (classData.superClasses.length > 0) {
                const parentClass = this.parser.getClass(classData.superClasses[0]);
                if (parentClass) {
                    link.title = `Subclass of ${parentClass.name}`;
                }
            } else if (classData.isTopLevel) {
                link.title = 'Top-level class';
            }

            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.cardBuilder.navigateToClass(classData.uri);
            });

            indexContainer.appendChild(link);
        });

        console.log(`Class index populated with ${allClasses.length} classes`);
    }

    /**
     * Set view mode
     */
    setViewMode(mode) {
        this.viewMode = mode;

        // Update active button
        document.querySelectorAll('[data-view-mode]').forEach(btn => {
            if (btn.dataset.viewMode === mode) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        // Apply view mode
        const mainContent = document.getElementById('main-content');
        if (mainContent) {
            mainContent.className = `view-mode-${mode}`;
        }

        console.log(`View mode changed to: ${mode}`);
    }

    /**
     * Export ontology data
     */
    exportData() {
        const data = this.parser.getData();

        const json = JSON.stringify(data, null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = 'dul-ontology-export.json';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        URL.revokeObjectURL(url);

        console.log('Data exported');
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

    /**
     * Filter classes by search query
     */
    filterClasses(query) {
        const results = this.parser.searchClasses(query);
        const resultUris = new Set(results.map(c => c.uri));

        // Show/hide cards based on search
        document.querySelectorAll('.class-card').forEach(card => {
            const classUri = card.dataset.classUri;

            if (query.length < 2) {
                card.style.display = '';
            } else if (resultUris.has(classUri)) {
                card.style.display = '';
                this.cardBuilder.expandParentSections(card);
            } else {
                card.style.display = 'none';
            }
        });
    }
}

// Initialize application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const app = new DULBrowserApp();

    // Load theme
    app.loadTheme();

    // Initialize app
    app.initialize().then(() => {
        // Populate class index after rendering
        app.populateClassIndex();
    });

    // Make app globally available for debugging
    window.dulApp = app;

    console.log('DUL Ontology Browser loaded');
});
