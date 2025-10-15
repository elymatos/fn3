/**
 * Search and Navigation Module for DUL Ontology Browser
 * Provides search, filter, and navigation capabilities
 */

class SearchManager {
    constructor(parser, cardBuilder) {
        this.parser = parser;
        this.cardBuilder = cardBuilder;
        this.searchInput = null;
        this.resultsContainer = null;
        this.activeFilters = new Set();
        this.searchTimeout = null;
    }

    /**
     * Initialize search functionality
     */
    initialize(searchInputId, resultsContainerId) {
        this.searchInput = document.getElementById(searchInputId);
        this.resultsContainer = document.getElementById(resultsContainerId);

        if (!this.searchInput) {
            console.error('Search input not found');
            return;
        }

        // Set up event listeners
        this.searchInput.addEventListener('input', (e) => {
            this.handleSearchInput(e.target.value);
        });

        this.searchInput.addEventListener('focus', () => {
            if (this.searchInput.value.length >= 2) {
                this.showResults();
            }
        });

        // Close results when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.searchInput.contains(e.target) && !this.resultsContainer.contains(e.target)) {
                this.hideResults();
            }
        });

        // Keyboard navigation
        this.searchInput.addEventListener('keydown', (e) => {
            this.handleKeyboardNavigation(e);
        });

        console.log('Search manager initialized');
    }

    /**
     * Handle search input with debouncing
     */
    handleSearchInput(query) {
        clearTimeout(this.searchTimeout);

        if (query.length < 2) {
            this.hideResults();
            return;
        }

        this.searchTimeout = setTimeout(() => {
            this.performSearch(query);
        }, 300);
    }

    /**
     * Perform search and display results
     */
    performSearch(query) {
        const results = this.parser.searchClasses(query);

        this.displaySearchResults(results, query);
        this.showResults();

        console.log(`Search for "${query}" found ${results.length} results`);
    }

    /**
     * Display search results
     */
    displaySearchResults(results, query) {
        if (!this.resultsContainer) return;

        this.resultsContainer.innerHTML = '';

        if (results.length === 0) {
            const noResults = document.createElement('div');
            noResults.className = 'search-no-results';
            noResults.textContent = `No classes found matching "${query}"`;
            this.resultsContainer.appendChild(noResults);
            return;
        }

        // Results header
        const header = document.createElement('div');
        header.className = 'search-results-header';
        header.innerHTML = `
            <span class="results-count">${results.length} class${results.length !== 1 ? 'es' : ''} found</span>
            <button class="clear-search-btn" title="Clear search">
                <svg class="icon" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
                </svg>
            </button>
        `;

        header.querySelector('.clear-search-btn').addEventListener('click', () => {
            this.clearSearch();
        });

        this.resultsContainer.appendChild(header);

        // Results list
        const list = document.createElement('ul');
        list.className = 'search-results-list';

        results.forEach((classData, index) => {
            const item = this.createSearchResultItem(classData, query, index);
            list.appendChild(item);
        });

        this.resultsContainer.appendChild(list);
    }

    /**
     * Create a search result item
     */
    createSearchResultItem(classData, query, index) {
        const item = document.createElement('li');
        item.className = 'search-result-item';
        item.dataset.index = index;

        // Class name with highlighting
        const nameSpan = document.createElement('span');
        nameSpan.className = 'result-name';
        nameSpan.innerHTML = this.highlightMatch(classData.name, query);

        // Parent class info
        const metaSpan = document.createElement('span');
        metaSpan.className = 'result-meta';

        if (classData.isTopLevel) {
            metaSpan.textContent = 'Top Level';
        } else if (classData.superClasses.length > 0) {
            const parentClass = this.parser.getClass(classData.superClasses[0]);
            if (parentClass) {
                metaSpan.textContent = `⊂ ${parentClass.name}`;
            }
        }

        item.appendChild(nameSpan);
        item.appendChild(metaSpan);

        // Click handler
        item.addEventListener('click', () => {
            this.cardBuilder.navigateToClass(classData.uri);
            this.hideResults();
            this.searchInput.value = '';
        });

        // Hover handler
        item.addEventListener('mouseenter', () => {
            this.selectResultItem(index);
        });

        return item;
    }

    /**
     * Highlight search query in text
     */
    highlightMatch(text, query) {
        const lowerText = text.toLowerCase();
        const lowerQuery = query.toLowerCase();
        const index = lowerText.indexOf(lowerQuery);

        if (index === -1) {
            return text;
        }

        const before = text.substring(0, index);
        const match = text.substring(index, index + query.length);
        const after = text.substring(index + query.length);

        return `${before}<mark class="search-highlight">${match}</mark>${after}`;
    }

    /**
     * Handle keyboard navigation in search results
     */
    handleKeyboardNavigation(e) {
        if (!this.resultsContainer || this.resultsContainer.classList.contains('hidden')) {
            return;
        }

        const items = this.resultsContainer.querySelectorAll('.search-result-item');
        if (items.length === 0) return;

        const currentIndex = this.getCurrentSelectedIndex();

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                this.selectResultItem(Math.min(currentIndex + 1, items.length - 1));
                break;

            case 'ArrowUp':
                e.preventDefault();
                this.selectResultItem(Math.max(currentIndex - 1, 0));
                break;

            case 'Enter':
                e.preventDefault();
                if (currentIndex >= 0 && currentIndex < items.length) {
                    items[currentIndex].click();
                }
                break;

            case 'Escape':
                e.preventDefault();
                this.hideResults();
                this.searchInput.blur();
                break;
        }
    }

    /**
     * Get currently selected result index
     */
    getCurrentSelectedIndex() {
        const selected = this.resultsContainer.querySelector('.search-result-item.selected');
        return selected ? parseInt(selected.dataset.index) : -1;
    }

    /**
     * Select a result item by index
     */
    selectResultItem(index) {
        const items = this.resultsContainer.querySelectorAll('.search-result-item');

        items.forEach((item, i) => {
            if (i === index) {
                item.classList.add('selected');
                item.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
            } else {
                item.classList.remove('selected');
            }
        });
    }

    /**
     * Show search results
     */
    showResults() {
        if (this.resultsContainer) {
            this.resultsContainer.classList.remove('hidden');
        }
    }

    /**
     * Hide search results
     */
    hideResults() {
        if (this.resultsContainer) {
            this.resultsContainer.classList.add('hidden');
        }
    }

    /**
     * Clear search
     */
    clearSearch() {
        this.searchInput.value = '';
        this.hideResults();
        this.searchInput.focus();
    }

    /**
     * Filter classes by top-level parent
     */
    filterByTopLevel(topLevelUri) {
        if (this.activeFilters.has(topLevelUri)) {
            this.activeFilters.delete(topLevelUri);
        } else {
            this.activeFilters.add(topLevelUri);
        }

        this.applyFilters();
    }

    /**
     * Apply active filters to visible cards
     */
    applyFilters() {
        if (this.activeFilters.size === 0) {
            // Show all cards
            document.querySelectorAll('.class-card').forEach(card => {
                card.style.display = '';
            });
            return;
        }

        // Hide all cards first
        document.querySelectorAll('.class-card').forEach(card => {
            card.style.display = 'none';
        });

        // Show filtered cards and their descendants
        this.activeFilters.forEach(topLevelUri => {
            const cardId = this.cardBuilder.generateCardId(topLevelUri);
            const card = document.getElementById(cardId);

            if (card) {
                this.showCardAndDescendants(card);
            }
        });
    }

    /**
     * Show a card and all its descendant cards
     */
    showCardAndDescendants(card) {
        card.style.display = '';

        // Show all descendant cards
        const subclassesContainer = card.querySelector('.subclasses-container');
        if (subclassesContainer) {
            subclassesContainer.querySelectorAll('.class-card').forEach(subCard => {
                subCard.style.display = '';
            });
        }
    }

    /**
     * Clear all filters
     */
    clearFilters() {
        this.activeFilters.clear();
        this.applyFilters();
    }

    /**
     * Get autocomplete suggestions
     */
    getAutocompleteSuggestions(query, limit = 10) {
        if (query.length < 2) {
            return [];
        }

        const lowerQuery = query.toLowerCase();
        const suggestions = [];

        this.parser.classes.forEach(classData => {
            if (classData.name.toLowerCase().startsWith(lowerQuery)) {
                suggestions.push({
                    text: classData.name,
                    uri: classData.uri,
                    score: 2 // Higher score for prefix matches
                });
            } else if (classData.name.toLowerCase().includes(lowerQuery)) {
                suggestions.push({
                    text: classData.name,
                    uri: classData.uri,
                    score: 1
                });
            }
        });

        // Sort by score and name
        suggestions.sort((a, b) => {
            if (a.score !== b.score) {
                return b.score - a.score;
            }
            return a.text.localeCompare(b.text);
        });

        return suggestions.slice(0, limit);
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SearchManager;
}
