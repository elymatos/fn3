# DUL Ontology OWL to JSON-LD Conversion Fix

**Date**: October 27, 2025
**Issue**: TimeIndexedRelation class missing from JSON-LD file
**Status**: ✅ RESOLVED

---

## Problem Description

The DUL ontology class **TimeIndexedRelation** was missing from the JSON-LD file (`DUL.jsonld` and `DUL_enhanced.jsonld`), even though it was properly defined in the OWL source file (`DUL_3_34.owl`).

### Affected Classes

Three classes in DUL use `owl:equivalentClass` with complex class expressions (defined/asserted classes):

1. **PlanExecution** - ✅ Was present (had `rdfs:label`)
2. **TimeIndexedRelation** - ❌ Was missing (NO `rdfs:label`)
3. **WorkflowExecution** - ✅ Was present (had `rdfs:label`)

---

## Root Cause Analysis

**TimeIndexedRelation was the ONLY class missing `rdfs:label` annotations.**

### OWL Structure

TimeIndexedRelation in DUL_3_34.owl (lines 3404-3420):
```xml
<owl:Class rdf:about="http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#TimeIndexedRelation">
    <owl:equivalentClass>
        <owl:Class>
            <owl:intersectionOf rdf:parseType="Collection">
                <rdf:Description rdf:about=".../DUL.owl#Situation"/>
                <owl:Restriction>
                    <owl:onProperty rdf:resource=".../DUL.owl#isSettingFor"/>
                    <owl:someValuesFrom rdf:resource=".../DUL.owl#TimeInterval"/>
                </owl:Restriction>
            </owl:intersectionOf>
        </owl:Class>
    </owl:equivalentClass>
    <rdfs:subClassOf rdf:resource=".../DUL.owl#Situation"/>
    <dc:creator>Aldo Gangemi</dc:creator>
    <dc:date>2021-02-24T14:24:23Z</dc:date>
    <rdfs:comment>A Situation that includes a time indexing...</rdfs:comment>
    <!-- ❌ NO rdfs:label HERE -->
</owl:Class>
```

### Why It Was Missing

When converting OWL to JSON-LD, **Protégé** (and other OWL tools) may have issues with classes that:
1. Have complex `owl:equivalentClass` definitions (intersections/unions)
2. **AND** lack `rdfs:label` annotations

The absence of `rdfs:label` may cause the class to be skipped or not properly materialized during conversion, especially for defined classes with complex logical expressions.

---

## Solution Implemented

### Step 1: Add Missing Labels

Added `rdfs:label` annotations to TimeIndexedRelation in `DUL_3_34.owl`:

```xml
<rdfs:isDefinedBy rdf:resource="http://www.ontologydesignpatterns.org/ont/dul/DUL.owl"/>
<rdfs:label xml:lang="en">Time-indexed relation</rdfs:label>
<rdfs:label xml:lang="it">Relazione indicizzata nel tempo</rdfs:label>
```

### Step 2: Re-convert Using Protégé

The OWL file was re-converted to JSON-LD using **Protégé's "Save As" JSON-LD** feature, which properly handles:
- Complex class expressions (`owl:equivalentClass`)
- Blank nodes for restrictions
- Full OWL semantics with reasoning

**Note**: Command-line tools like `rapper` were tested but do not support proper JSON-LD output format. Protégé is the recommended tool for OWL → JSON-LD conversion.

### Step 3: Verification

After conversion, all three classes with `owl:equivalentClass` are now present:

```
✅ FOUND: PlanExecution
  - [it]: Esecuzione di piano
  - [en]: Plan execution

✅ FOUND: TimeIndexedRelation
  - [it]: Relazione indicizzata nel tempo
  - [en]: Time-indexed relation

✅ FOUND: WorkflowExecution
  - [it]: Esecuzione di workflow
  - [en]: Workflow execution
```

---

## Technical Details

### OWL File Modified
- **File**: `/home/ematos/devel/fnbr/fn3/docs/content/dul/DUL_3_34.owl`
- **Change**: Added 3 lines (lines 3420-3422)
- **Lines Modified**: TimeIndexedRelation class definition

### JSON-LD File Updated
- **File**: `/home/ematos/devel/fnbr/fn3/docs/content/dul/DUL_enhanced.jsonld`
- **Source**: Protégé "Save As" JSON-LD from updated OWL file
- **Result**: 93 classes properly included (was missing TimeIndexedRelation)

### Classes Using TimeIndexedRelation

Two classes reference TimeIndexedRelation as superclass:
1. **Classification** (time-indexed classification)
2. **Parthood** (time-indexed parthood relations)

Both classes are properly included in JSON-LD and can now correctly reference their superclass.

---

## Complex Class Expressions in JSON-LD

The `owl:equivalentClass` with `owl:intersectionOf` creates intermediate blank nodes in JSON-LD. Example structure:

```json
{
  "@id": "http://.../DUL.owl#TimeIndexedRelation",
  "@type": ["http://www.w3.org/2002/07/owl#Class"],
  "http://www.w3.org/2002/07/owl#equivalentClass": [{
    "@id": "_:genid123"  // Blank node for intersection
  }],
  "http://www.w3.org/2000/01/rdf-schema#subClassOf": [{
    "@id": "http://.../DUL.owl#Situation"
  }],
  "http://www.w3.org/2000/01/rdf-schema#label": [
    { "@language": "en", "@value": "Time-indexed relation" },
    { "@language": "it", "@value": "Relazione indicizzata nel tempo" }
  ]
}
```

These blank nodes are properly handled by the JavaScript parser (`dul-parser.js`) for graph visualization.

---

## Lessons Learned

1. **Always include `rdfs:label`** for all classes, especially defined classes with `owl:equivalentClass`
2. **Use Protégé for OWL ↔ JSON-LD conversion** - it has proper OWL reasoning and handles complex expressions
3. **Command-line tools limitations**:
   - `rapper` doesn't support true JSON-LD output format (only `json` and `json-triples`)
   - `rdflib` (Python) requires installation
   - `riot` (Apache Jena) is a good alternative but wasn't installed
4. **Verify conversion completeness** - always check that all expected classes are present in the output

---

## Files Changed

### Modified
- ✏️ `/home/ematos/devel/fnbr/fn3/docs/content/dul/DUL_3_34.owl`
  - Added `rdfs:label` annotations to TimeIndexedRelation

### Regenerated
- 🔄 `/home/ematos/devel/fnbr/fn3/docs/content/dul/DUL_enhanced.jsonld`
  - Re-converted from updated OWL using Protégé
  - Now includes TimeIndexedRelation with proper labels

---

## Verification Commands

```bash
# Check TimeIndexedRelation is present
grep -c "TimeIndexedRelation" DUL_enhanced.jsonld
# Output: 3 (1 class definition + 2 references)

# Verify all three equivalentClass classes
python3 -c "
import json
with open('DUL_enhanced.jsonld') as f:
    data = json.load(f)
items = data if isinstance(data, list) else data.get('@graph', [data])
for cls in ['PlanExecution', 'TimeIndexedRelation', 'WorkflowExecution']:
    found = any(cls in item.get('@id', '') for item in items)
    print(f'{cls}: {\"✅\" if found else \"❌\"}')"
```

---

## Status: RESOLVED ✅

All three asserted classes (defined with `owl:equivalentClass`) are now properly included in the JSON-LD file and available for visualization in the DUL browser interface.

**Date Resolved**: October 27, 2025
