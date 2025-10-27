# Graph Visualization - Synthetic Nodes Update

**Date**: October 27, 2025
**Status**: ✅ COMPLETED

## Summary

Updated the graph visualization (`dul_graph.html`) to:
1. Use the DULParser (same parser as class browser)
2. Display synthetic nodes with **diamond shapes** instead of circles
3. Apply purple styling to distinguish synthetic nodes

## Changes Made

### 1. Parser Integration

**Added:**
- `<script src="js/dul-parser.js"></script>` - Load the DULParser
- `dulParser` global variable to store parser instance
- `parseOntologyFromParser()` function to convert parser data to graph format

**Modified:**
- `loadOntology()` now uses DULParser instead of custom JSON-LD parsing
- Preserves `isSynthetic` and `syntheticType` properties on node data

### 2. Visual Differentiation

**Node Shapes:**
- **Regular classes** → Circles (⚫)
- **Synthetic nodes** → Diamonds (◆)

**Node Styling:**
- **Regular classes** → Original colors based on type
- **Synthetic nodes** → Purple fill (#ce93d8) with purple border (#9c27b0)
- **Hover effect** → Purple glow for synthetic nodes

### 3. Implementation Details

**Node Creation (lines 1027-1076):**
```javascript
// Create container groups for all nodes
const nodeContainers = nodeGroup.selectAll("g.node-container")
    .data(nodes)
    .enter().append("g")

// Filter and create circles for regular classes
nodeContainers.filter(d => !d.isSynthetic)
    .append("circle")
    .attr("r", 10)

// Filter and create diamonds for synthetic nodes
nodeContainers.filter(d => d.isSynthetic)
    .append("path")
    .attr("d", d3.symbol().type(d3.symbolDiamond).size(200))
```

**Position Updates (line 958-960):**
```javascript
// Use transform for container groups (works for both shapes)
nodeGroup.selectAll("g.node-container")
    .attr("transform", d => `translate(${d.x},${d.y})`)
```

**CSS Styling (lines 158-168):**
```css
.node-synthetic {
    stroke: #9c27b0 !important;
    stroke-width: 2.5px !important;
    fill: #ce93d8 !important;
}

.node-synthetic:hover {
    stroke-width: 4px !important;
    filter: drop-shadow(0 0 10px rgba(156, 39, 176, 0.8)) !important;
}
```

## Testing

### Open Graph Visualization
http://localhost:8081/dul_graph.html

### What to Look For

1. **Start with Entity node** - Should load automatically
2. **Double-click to expand** - Shows subclasses
3. **Look for purple diamond nodes** - These are synthetic nodes (restrictions)
4. **Click on a synthetic node** - Shows its logical definition in sidebar

### Classes with Synthetic Nodes

When you expand these classes, you'll see purple diamonds:
- **DesignedArtifact** → Diamond: "some isDescribedBy Design"
- **Collection** → Diamond: restriction node
- **Action** → Diamond: restriction node
- **Concept** → Diamond: restriction node
- **Event** → Diamond: restriction node
- And 31+ more classes

### Expected Behavior

**Regular Class Node:**
- Shape: Circle ⚫
- Color: Based on class type (blue, green, orange, etc.)
- Border: White
- Hover: Larger white border + glow

**Synthetic Node:**
- Shape: Diamond ◆
- Color: Purple (#ce93d8)
- Border: Purple (#9c27b0)
- Hover: Larger purple border + purple glow

**Statistics Panel:**
- Should show ~130+ classes (including ~36 synthetic nodes)
- Should show ~XX properties

## Technical Notes

### Why Diamonds?

- **Visual distinction** - Immediately recognizable
- **Semantic meaning** - Represents intermediate/derived concepts
- **Standard practice** - UML and OWL tools use diamonds for constraints
- **D3 support** - Built-in `d3.symbolDiamond` shape

### Data Flow

```
DUL.jsonld
    ↓
DULParser.loadFromFile()
    ↓
parseOntologyFromParser()
    ↓
classMap (includes isSynthetic: true for restrictions)
    ↓
allNodes array (preserves isSynthetic property)
    ↓
D3 node creation (filters by isSynthetic)
    ↓
Circles for regular / Diamonds for synthetic
```

### Compatibility

- **Works with existing features:**
  - ✅ Node expansion/collapse
  - ✅ Search functionality
  - ✅ Link filtering
  - ✅ Zoom and pan
  - ✅ Definition sidebar
  - ✅ Drag and drop

- **Consistent with class browser:**
  - ✅ Same parser (DULParser)
  - ✅ Same synthetic node detection
  - ✅ Same logical definitions

## Verification

### Browser Console Check

After loading the graph:
```javascript
// Check parser statistics
console.log(dulParser.statistics);
// Should show: {syntheticNodes: 36+, ...}

// Check nodes with synthetic flag
const syntheticNodes = allNodes.filter(n => n.isSynthetic);
console.log(`Synthetic nodes in graph: ${syntheticNodes.length}`);
// Should show: ~36

// List synthetic nodes
syntheticNodes.forEach(n => console.log(n.name));
```

### Visual Check

1. **Load graph** - Should see Entity node
2. **Expand Entity** - Double-click
3. **Look for diamonds** - Should see some purple diamond shapes among circles
4. **Expand DesignedArtifact** - Should show Physical artifact (circle) + restriction (diamond)
5. **Click diamond** - Sidebar shows logical definition

## Known Limitations

1. **Self-loop detection** - Synthetic nodes linking to themselves not yet handled
2. **Layout optimization** - Diamond nodes might overlap with circles in dense areas
3. **Legend** - No legend explaining circle vs diamond (could be added)
4. **Tooltip** - No special tooltip for synthetic nodes (uses same as regular)

## Future Enhancements (Optional)

1. **Add legend** - Visual guide showing circle = class, diamond = restriction
2. **Dashed links** - Use dashed lines for links to/from synthetic nodes
3. **Collapsible** - Option to hide/show synthetic nodes
4. **Filter by type** - Filter to show only restrictions, unions, etc.
5. **Color coding** - Different colors for restriction types (some vs only)

## Files Modified

- ✅ `dul_graph.html` - Updated to use DULParser and render diamond shapes

## Related Updates

- `SUBCLASSOF_RESTRICTIONS_UPDATE.md` - How restrictions are parsed
- `EQUIVALENTCLASS_UPDATE.md` - How equivalentClass is handled
- `js/dul-parser.js` - Parser that creates synthetic nodes

---

**Status**: ✅ COMPLETE - Ready for testing at http://localhost:8081/dul_graph.html

**Test**: Expand **Entity** → Expand **Endurant** → Expand **PhysicalObject** → Expand **PhysicalArtifact** → Expand **DesignedArtifact**

You should see purple diamond nodes for restrictions!
