# EquivalentClass Display Update

**Date**: October 27, 2025
**Status**: ✅ COMPLETED

## Summary

Updated the DUL ontology browser to display `owl:equivalentClass` definitions directly on class cards (similar to Protégé), instead of creating separate synthetic node cards.

## Changes Made

### 1. Parser Updates (`js/dul-parser.js`)

**Added:**
- `blankNodes` Map to store blank node definitions
- `processEquivalentClass()` - Processes equivalentClass definitions and stores them on classes
- `parseBlankNodeDefinition()` - Main dispatcher for parsing blank nodes
- `parseIntersectionDefinition()` - Parses `owl:intersectionOf`
- `parseUnionDefinition()` - Parses `owl:unionOf`
- `parseRestrictionDefinition()` - Parses `owl:Restriction` (someValuesFrom, allValuesFrom, hasValue)
- `parseComplementDefinition()` - Parses `owl:complementOf`

**Modified:**
- Added `equivalentClass` field to class data structure
- Added blank node collection pass before processing classes
- Added equivalentClass processing pass after class creation

**Data Structure Example:**
```javascript
classData.equivalentClass = {
    type: 'intersection',
    operator: '⊓',
    operatorLabel: 'AND',
    operands: [
        { type: 'class', uri: '...', name: 'Situation' },
        {
            type: 'restriction',
            restrictionType: 'someValuesFrom',
            quantifier: 'some',
            property: { uri: '...', name: 'isSettingFor' },
            filler: { type: 'class', uri: '...', name: 'TimeInterval' }
        }
    ]
}
```

### 2. Card Builder Updates (`js/cards.js`)

**Added:**
- `createEquivalentClassSection()` - Creates the "Equivalent To" section
- `renderLogicalDefinition()` - Recursively renders logical definitions with clickable links

**Features:**
- Displays equivalentClass definitions prominently at the top of class cards
- Supports nested expressions (e.g., intersection containing restrictions)
- Clickable class and property names for navigation
- Uses logical symbols: ⊓ (AND), ⊔ (OR), ¬ (NOT)
- Shows quantifiers: `some`, `only`, `value`

### 3. CSS Styles (`css/styles.css`)

**Added:**
- `.equivalent-class-section` - Blue-tinted section with left border
- `.equivalent-formula` - Formula display area
- `.logic-expression` - Inline flex layout for expressions
- `.logic-keyword`, `.logic-operator`, `.logic-restriction` - Styling for different parts
- `.logic-nested`, `.logic-complement` - Nested expressions and complements
- Dark mode support for all new styles

## Classes with EquivalentClass Definitions

Three classes in DUL have `owl:equivalentClass` definitions:

### 1. **TimeIndexedRelation**
```
≡ Equivalent To:
   Situation ⊓ (some isSettingFor TimeInterval)
```
- Type: Intersection with nested restriction
- Defines a situation that includes time indexing

### 2. **PlanExecution**
```
≡ Equivalent To:
   some satisfies Plan
```
- Type: Simple restriction
- Execution that satisfies a plan

### 3. **WorkflowExecution**
```
≡ Equivalent To:
   some satisfies Workflow
```
- Type: Simple restriction
- Execution that satisfies a workflow

## Testing

Open in your browser: **http://localhost:8081/classes.html**

**Search for and click on:**
1. "TimeIndexedRelation" - Should show intersection with restriction
2. "PlanExecution" - Should show simple restriction
3. "WorkflowExecution" - Should show simple restriction

**What to look for:**
- Blue "≡ Equivalent To:" section at top of card body
- Logical formula with clickable links
- Proper use of symbols (⊓, some, etc.)
- Nested parentheses for complex expressions
- Works in both light and dark themes

**Browser Console:**
- Look for: `"Found X blank nodes"`
- Look for: `"Created X synthetic nodes from equivalentClass definitions"` (should be 3)
- Check: `parser.statistics.syntheticNodes` (should be 3)

## Next Steps

### Graph Visualization (Optional)
The graph visualization (`dul_graph.html`) currently doesn't use the DULParser, so equivalentClass definitions don't appear there. To add:

1. Modify `dul_graph.html` to use DULParser
2. Add visual indicators (e.g., diamond nodes, dashed borders)
3. Show equivalentClass formula in tooltips or info panels

## Technical Notes

### Why This Approach?
- **User-friendly**: Definitions appear directly on the class (like Protégé)
- **No duplication**: No separate synthetic node cards cluttering the hierarchy
- **Maintainable**: Definitions regenerate automatically when OWL file is re-exported
- **Extensible**: Easy to add tooltips, explanations, or additional notation

### Blank Node Processing
The parser now:
1. Collects all blank nodes (`_:genid*`) in a Map
2. Processes classes with `owl:equivalentClass`
3. Recursively parses blank node structures
4. Stores parsed definitions on the class object

### Supported OWL Constructs
- ✅ `owl:intersectionOf` (AND)
- ✅ `owl:unionOf` (OR)
- ✅ `owl:complementOf` (NOT)
- ✅ `owl:Restriction` with `owl:someValuesFrom` (existential ∃)
- ✅ `owl:Restriction` with `owl:allValuesFrom` (universal ∀)
- ✅ `owl:Restriction` with `owl:hasValue` (value restriction)
- ✅ Nested blank nodes (e.g., intersection containing restrictions)

## Files Modified

- ✅ `js/dul-parser.js` - Added blank node parsing and equivalentClass processing
- ✅ `js/cards.js` - Added equivalentClass section rendering
- ✅ `css/styles.css` - Added styling for equivalentClass sections
- ✅ `DUL.jsonld` - Already contains the fixed ontology with TimeIndexedRelation

## Verification

```bash
# Check for blank nodes in JSON-LD
grep -c "_:genid" DUL.jsonld
# Output: 184

# Check for intersection/union/restriction constructs
grep -c "intersectionOf\|unionOf\|Restriction" DUL.jsonld
# Output: should show multiple matches
```

---

**Status**: Ready for testing at http://localhost:8081/classes.html
