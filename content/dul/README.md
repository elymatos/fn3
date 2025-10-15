# DUL Ontology Browser - Card-Based Interface

A modern, interactive card-based web interface for exploring the **DOLCE+DnS Ultralite (DUL)** foundational ontology. This browser provides an intuitive way to navigate through classes, properties, and relationships in the DUL ontology.

## Features

### Core Functionality
- ✅ **Card-Based UI**: Each ontology class is represented as an expandable card
- ✅ **Hierarchical Navigation**: Visual hierarchy with proper parent-child relationships
- ✅ **Real-Time Search**: Fast search across class names and definitions with autocomplete
- ✅ **Interactive Exploration**: Click to navigate between related classes
- ✅ **Property Display**: View object and datatype properties for each class
- ✅ **Subclass Expansion**: Expand/collapse subclass hierarchies
- ✅ **Class Index**: Quick alphabetical index of all classes

### User Experience
- 🎨 **Modern Design**: Clean, responsive interface with smooth animations
- 🌓 **Dark Mode**: Toggle between light and dark themes
- 📱 **Fully Responsive**: Works on desktop, tablet, and mobile devices
- ⌨️ **Keyboard Shortcuts**: Power user features for faster navigation
- 💾 **State Persistence**: Remembers expanded cards across sessions
- 🔍 **Breadcrumb Navigation**: Always know where you are in the hierarchy

### Technical Features
- 🚀 **Client-Side Only**: No server required, runs entirely in the browser
- 📦 **Zero Dependencies**: Pure HTML, CSS, and JavaScript
- 🎯 **Fast Performance**: Efficient rendering and search algorithms
- 💾 **LocalStorage**: Saves user preferences and navigation state
- 📤 **Export Capability**: Download ontology data as JSON

## File Structure

```
/dul/
├── index.html              # Main HTML file
├── DUL.jsonld             # DUL ontology data (JSON-LD format)
├── css/
│   └── styles.css         # Complete stylesheet
├── js/
│   ├── dul-parser.js      # Ontology parser
│   ├── cards.js           # Card component system
│   ├── search.js          # Search functionality
│   └── app.js             # Main application logic
└── README.md              # This file
```

## Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- A local web server (optional, but recommended)

### Quick Start

1. **Clone or download** this repository

2. **Using a local web server** (recommended):
   ```bash
   # Using Python 3
   python3 -m http.server 8000

   # Using Python 2
   python -m SimpleHTTPServer 8000

   # Using Node.js
   npx http-server
   ```

3. **Open in browser**:
   ```
   http://localhost:8000/index.html
   ```

### Alternative: Direct File Access
You can open `index.html` directly in your browser, but some browsers may restrict loading the JSON-LD file due to CORS policies. Using a local server is recommended.

## Usage Guide

### Search
- Click the search box or press **Ctrl+F** to focus
- Type at least 2 characters to search
- Use arrow keys to navigate results
- Press **Enter** to jump to selected class
- Press **Esc** to close results

### Navigation
- **Click class names** to navigate to that class
- **Parent badges** show the superclass (click to navigate)
- **Breadcrumbs** appear for non-top-level classes
- **Class Index** provides alphabetical quick access

### Expanding/Collapsing
- **Toggle button** (arrow icon) expands/collapses subclasses
- **Expand All** button expands entire hierarchy
- **Collapse All** button collapses everything
- State is saved automatically

### Keyboard Shortcuts
- **Ctrl+F**: Focus search
- **Ctrl+E**: Expand all classes
- **Ctrl+Q**: Collapse all classes
- **Ctrl+I**: Toggle class index
- **Home**: Scroll to top
- **Esc**: Close search results

### Properties
- Each class card shows properties where it is the domain
- Click the "Properties" section to expand/collapse
- Property cards show:
  - Property name and type (ObjectProperty/DatatypeProperty)
  - Range (classes it points to)
  - Characteristics (functional, transitive, etc.)
  - Definition/documentation

## Architecture

### Component Overview

#### 1. DUL Parser (`dul-parser.js`)
- Loads and parses OWL/JSON-LD ontology data
- Builds internal class and property structures
- Handles multilingual labels
- Calculates hierarchy levels
- Provides search functionality

#### 2. Card Builder (`cards.js`)
- Creates card DOM elements for classes
- Handles subclass rendering
- Manages property subcards
- Controls expansion/collapse state
- Implements navigation

#### 3. Search Manager (`search.js`)
- Real-time search with debouncing
- Autocomplete suggestions
- Keyboard navigation
- Result highlighting
- Filter management

#### 4. Application Controller (`app.js`)
- Coordinates all components
- Initializes the interface
- Handles global events
- Manages themes and preferences
- Controls export functionality

### Data Flow

```
DUL.jsonld → DULParser → Classes & Properties
                ↓
         CardBuilder → DOM Elements
                ↓
       SearchManager → Filtered Results
                ↓
          App Controller → User Interface
```

## Customization

### Styling
All visual styling is in `css/styles.css`. Key CSS variables in `:root`:

```css
--color-primary: #3b82f6;      /* Primary brand color */
--color-bg: #f8fafc;           /* Background color */
--color-bg-card: #ffffff;      /* Card background */
--spacing-md: 1rem;            /* Base spacing unit */
```

### Dark Theme
Dark theme colors are defined in `body[data-theme="dark"]` selector.

### Adding Features
The modular architecture makes it easy to add features:

1. **New card sections**: Extend `CardBuilder.createCardBody()`
2. **Additional filters**: Add methods to `SearchManager`
3. **Extra controls**: Update `app.js` and add to HTML
4. **New visualizations**: Create new components following existing patterns

## Browser Support

- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Opera 76+

Features used:
- ES6+ JavaScript (async/await, classes, arrow functions)
- CSS Grid and Flexbox
- CSS Custom Properties
- Fetch API
- LocalStorage

## Performance

- **Initial Load**: ~1-2 seconds (depends on ontology size)
- **Search**: < 100ms for most queries
- **Card Rendering**: Lazy loading of subclass details
- **State Persistence**: LocalStorage for preferences

## Troubleshooting

### Ontology won't load
- Check that `DUL.jsonld` is in the same directory as `index.html`
- Use a local web server instead of opening the file directly
- Check browser console for error messages

### Search not working
- Ensure JavaScript is enabled
- Check that the ontology has loaded successfully
- Clear browser cache and reload

### Cards not expanding
- Check browser console for errors
- Verify LocalStorage is enabled
- Try clearing saved state (use browser dev tools)

### Styling issues
- Hard-reload the page (Ctrl+Shift+R or Cmd+Shift+R)
- Check that `css/styles.css` is loading
- Verify browser compatibility

## Future Enhancements

Potential features for future development:

- [ ] Graph visualization (D3.js or Cytoscape.js)
- [ ] Advanced filtering (by property, by characteristic)
- [ ] Multiple ontology comparison
- [ ] SPARQL endpoint integration
- [ ] RDF/XML export
- [ ] Annotation editing
- [ ] Collaborative features
- [ ] Progressive Web App (PWA)
- [ ] Internationalization (i18n)

## Technical Notes

### Why Client-Side?
- **Portability**: Works anywhere without server setup
- **Speed**: No server round-trips
- **Privacy**: All processing is local
- **Simplicity**: Easy to deploy and maintain

### Why No Framework?
- **Learning**: Demonstrates vanilla JavaScript patterns
- **Performance**: No framework overhead
- **Flexibility**: Easy to understand and modify
- **Size**: Minimal dependencies

### Ontology Format
The browser expects JSON-LD format. To convert from other formats:

```bash
# OWL/RDF to JSON-LD using rapper (part of raptor-utils)
rapper -i rdfxml -o jsonld DUL.owl > DUL.jsonld
```

## License

This interface code is provided as-is for use with the DUL ontology.

The DUL ontology itself is licensed separately. See:
http://www.ontologydesignpatterns.org/ont/dul/DUL.owl

## Credits

- **DUL Ontology**: Ontology Design Patterns community
- **Interface**: Card-based browser implementation

## Contributing

Suggestions and improvements are welcome! This is an educational project demonstrating modern web development techniques for ontology visualization.

## Resources

- [DUL Ontology Homepage](http://www.ontologydesignpatterns.org/ont/dul/DUL.owl)
- [Ontology Design Patterns](http://ontologydesignpatterns.org/)
- [OWL Web Ontology Language](https://www.w3.org/OWL/)
- [JSON-LD](https://json-ld.org/)

---

**Version**: 1.0.0
**Last Updated**: 2025
**Browser**: Modern web browsers with ES6+ support
