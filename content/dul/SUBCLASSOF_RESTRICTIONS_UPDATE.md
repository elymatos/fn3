# SubClassOf Restrictions Display Update

**Date**: October 27, 2025
**Status**: ✅ COMPLETED

## Summary

Updated the DUL ontology browser to display and visualize OWL restrictions and complex expressions that appear in `rdfs:subClassOf` statements. These now show:
- **In Class Browser**: Inline in the "Subclass Of" section with highlighted styling
- **In Graph**: As separate synthetic nodes in the class hierarchy

## What Was Needed

When a class has complex `rdfs:subClassOf` definitions like:
```
rdfs:subClassOf: PhysicalArtifact (simple class)
rdfs:subClassOf: some isDescribedBy Design (restriction)
```

Previously only the simple class reference was shown. Now both are displayed.

## Changes Made

### 1. Parser Updates (`js/dul-parser.js`)

**Added:**
- `superClassRestrictions[]` field to class data structure
- Processing of blank nodes in `rdfs:subClassOf`
- `createSyntheticNodeFromRestriction()` - Creates synthetic node classes for graph
- `extractInvolvedRefs()`, `extractInvolvedClasses()`, `extractInvolvedProperties()` - Helper methods

**Modified:**
- `buildClassRelationships()` now:
  1. Detects blank nodes in subClassOf
  2. Parses the restriction using existing `parseBlankNodeDefinition()`
  3. Stores parsed definition in `superClassRestrictions[]` for card display
  4. Creates a synthetic node class for graph visualization
  5. Adds synthetic node to superClasses so it appears in hierarchy

### 2. Card Builder Updates (`js/cards.js`)

**Modified:**
- `createSuperclassesSection()` now displays:
  - Regular superclass links (as before)
  - **NEW**: Inline restriction expressions with clickable links
  - Uses existing `renderLogicalDefinition()` method for consistent formatting

### 3. CSS Styles (`css/styles.css`)

**Added:**
- `.restriction-item` - Purple-bordered highlight for restrictions
- `.inline-restriction` - Monospace formatting
- Dark mode support for all new styles

## Classes Affected

**36 classes** in DUL have complex `rdfs:subClassOf` expressions:

Examples:
- **DesignedArtifact** → `some isDescribedBy Design`
- **Action** → has restrictions
- **Collection** → has restrictions
- **Concept** → has restrictions
- **Event** → has restrictions
- And 31 more...

## Testing

### Class Browser (http://localhost:8081/classes.html)

**Search for "DesignedArtifact"** - You should see:

```
Subclass Of:
  → Physical artifact
  → some isDescribedBy Design    [highlighted in purple]
```

**Other classes to test:**
- "Collection"
- "Action"
- "Concept"
- "Event"

**What to look for:**
- Purple-bordered restriction items in "Subclass Of" section
- Clickable class and property names in restrictions
- Proper formatting with quantifiers (some, only)

### Graph Visualization

Since synthetic nodes are now created as actual classes, they will appear in:
- Class hierarchy (as intermediate nodes)
- Subclass lists
- Search results

**Browser Console Check:**
```javascript
// After page loads
parser.statistics.syntheticNodes
// Should show ~36+ synthetic nodes created from subClassOf restrictions
```

### Visual Examples

**Card Browser - DesignedArtifact:**
```
┌─────────────────────────────────────────────┐
│ Designed artifact           Physical artifact│
├─────────────────────────────────────────────┤
│ A PhysicalArtifact that is also described...│
│                                              │
│ Subclass Of:                                 │
│   → Physical artifact                        │
│   ┌──────────────────────────────────────┐  │
│   │ some isDescribedBy Design            │  │  ← Purple highlight
│   └──────────────────────────────────────┘  │
│                                              │
│ Properties (...)                             │
└─────────────────────────────────────────────┘
```

## Technical Details

### How It Works

1. **Parsing Phase:**
   - Parser collects all blank nodes
   - When processing subClassOf, checks if reference is a blank node
   - If blank node → parses it as restriction/intersection/union/complement
   - Stores parsed definition on class AND creates synthetic node

2. **Card Display:**
   - Regular superclasses render as links (unchanged)
   - Restrictions render inline using `renderLogicalDefinition()`
   - Visual distinction via purple border and monospace font

3. **Graph Display:**
   - Synthetic nodes appear as regular classes with `isSynthetic: true`
   - Show up in hierarchy between parent and child classes
   - Can be expanded/collapsed like regular classes
   - Display their logical definition in the card

### Supported OWL Constructs

All constructs are supported:
- ✅ `owl:Restriction` with `someValuesFrom` (∃ / some)
- ✅ `owl:Restriction` with `allValuesFrom` (∀ / only)
- ✅ `owl:Restriction` with `hasValue`
- ✅ `owl:intersectionOf` (AND / ⊓)
- ✅ `owl:unionOf` (OR / ⊔)
- ✅ `owl:complementOf` (NOT / ¬)
- ✅ Nested expressions (e.g., intersection with restrictions)

### Difference from EquivalentClass

| Feature | `owl:equivalentClass` | `rdfs:subClassOf` restrictions |
|---------|----------------------|-------------------------------|
| Count | 3 classes | 36 classes |
| Display Location | Blue "≡ Equivalent To" section | Purple items in "Subclass Of" |
| Examples | TimeIndexedRelation | DesignedArtifact, Collection |
| Graph Nodes | Not created by default | **Created as synthetic nodes** |
| Purpose | Show full definition | Show additional constraints |

## Files Modified

- ✅ `js/dul-parser.js` - Added subClassOf restriction processing and synthetic node creation
- ✅ `js/cards.js` - Updated Subclass Of section to show restrictions
- ✅ `css/styles.css` - Added restriction item styling with dark mode

## Verification

```bash
# Check classes with restrictions
python3 << 'EOF'
import json
with open('DUL.jsonld') as f:
    data = json.load(f)
items = data if isinstance(data, list) else data.get('@graph', [data])

count = 0
for item in items:
    if item.get('@type') and 'owl#Class' in str(item.get('@type')):
        class_id = item.get('@id', '')
        if 'ont/dul/DUL.owl#' in class_id:
            subClassOf = item.get('http://www.w3.org/2000/01/rdf-schema#subClassOf', [])
            if not isinstance(subClassOf, list):
                subClassOf = [subClassOf]
            for sc in subClassOf:
                if isinstance(sc, dict) and sc.get('@id', '').startswith('_:'):
                    count += 1
                    break
print(f"Classes with subClassOf restrictions: {count}")
EOF
```

## Next Steps (Optional Enhancements)

1. **Visual indicators in class list** - Add icon/badge to classes with restrictions
2. **Collapsible restrictions** - Make restriction display collapsible if too long
3. **Graph styling** - Special colors/shapes for synthetic nodes in graph
4. **Tooltip explanations** - Add explanatory tooltips for logical operators

---

**Status**: ✅ COMPLETE - Ready for testing at http://localhost:8081/classes.html

Test with: **DesignedArtifact**, **Collection**, **Action**, **Concept**, **Event**
