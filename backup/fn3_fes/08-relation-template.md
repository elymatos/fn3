# FN3 Frame Template: `Relation` (Revised)

This document defines the standard template for `Relation` type frames within the FN3 DSL. The `Relation` frame type represents connections or relationships that hold between two or more entities. These relations can be static or dynamic, symmetric or asymmetric, and can manifest in various domains (spatial, temporal, social, abstract). This template outlines the expected structure, core and optional Frame Elements (FEs), and common sense rules that commonly apply to frames categorized as `Relation`.

## 1. Template Structure

```
FRAME <FrameName>:
    DESCRIPTION "<natural language description of the specific Relation frame>"
    TYPE Relation
    [INHERITS_FROM <ParentFrameName>] // Optional, common for specialization (e.g., 'Kinship' inherits from 'SocialRelation')

    CORE_FEs:
        // Core FEs for Relation frames: the entities involved in the relationship.
        // Can be two distinct entities (for asymmetric relations) or a collective for symmetric.
        entity1: TYPE dul:Object // The first entity in the relation (often the figure or primary participant)
        entity2: TYPE dul:Object // The second entity in the relation (often the ground or secondary participant)
        // OR
        // entities: TYPE dul:CollectionOfObjects // A collection of objects involved in a symmetric relation

    OPTIONAL_FEs:
        // Common optional FEs for Relation frames, using DUL/CSP types
        time: TYPE dul:TemporalInterval // The time interval during which the relation holds
        place: TYPE dul:Location // The location where the relation holds
        duration: TYPE dul:Duration // The temporal extent for which the relation holds
        degree: TYPE dul:Quantity OR dul:Quality // The intensity, closeness, or measure of the relation
        domain: TYPE dul:Situation // The specific area or context in which the relation holds (e.g., 'mathematics', 'social', 'family')
        basis: TYPE dul:Situation // The reason or foundation upon which the relation is established or holds
        context: TYPE dul:Situation // Broader circumstances affecting the relation

    COMMON_SENSE_RULES:
        // Inherent properties of relations
        IMPLIES: thisFrameInstance dul:occursAt thisFrameInstance dul:hasTime // A relation holds within a temporal context.
        IMPLIES: thisFrameInstance dul:hasQuality dul:RelationalOccurrence // A relation is an occurrence involving multiple entities.

        // Rules relating to common core FEs (using 'thisFrameInstance' to refer to the current frame instance)
        // Note: Specific rules will depend on whether 'entity1'/'entity2' or 'entities' are used as CORE_FEs
        RULE 1: IF (entity1 EXISTS_AND_IS_A dul:Object) THEN (thisFrameInstance dul:hasParticipant entity1)
        RULE 2: IF (entity2 EXISTS_AND_IS_A dul:Object) THEN (thisFrameInstance dul:hasParticipant entity2)
        // If 'entities' is used: IMPLIES: thisFrameInstance dul:hasParticipants entities

        // Rule for symmetric relations (example, specific frame would define if it is symmetric)
        // IF (thisFrameInstance HAS_PROPERTY IS_SYMMETRIC true) THEN (thisFrameInstance dul:relates entity1 AND thisFrameInstance dul:relates entity2) IMPLIES (entity1 dul:isRelatedTo entity2) // Corrected from dul:relates

        // Rules relating to common optional FEs
        RULE 3: IF (time EXISTS_AND_IS_A dul:TemporalInterval) THEN (thisFrameInstance dul:hasTime time)
        RULE 4: IF (place EXISTS_AND_IS_A dul:Location) THEN (thisFrameInstance dul:hasLocation place)
        RULE 5: IF (duration EXISTS_AND_IS_A dul:Duration) THEN (thisFrameInstance dul:hasDuration duration)
        RULE 6: IF (degree EXISTS_AND_IS_A dul:Quantity OR degree EXISTS_AND_IS_A dul:Quality) THEN (thisFrameInstance dul:hasQuality degree)
        RULE 7: IF (domain EXISTS_AND_IS_A dul:Situation) THEN (thisFrameInstance dul:hasContext domain)
        RULE 8: IF (basis EXISTS_AND_IS_A dul:Situation) THEN (thisFrameInstance dul:hasBasis basis)

        // Example: If it's a social relation, participants are typically cognitive agents
        RULE 9: IF (thisFrameInstance IS_A dul:SocialRelation) THEN (ALL ?p WHERE (thisFrameInstance dul:hasParticipant ?p) THEN (?p IS_A csp:CognitiveAgent))

        // Example: A social connection implies mutual awareness (typically)
        TYPICALLY: IF (thisFrameInstance IS_A dul:SocialRelation AND entity1 EXISTS_AND_IS_A csp:CognitiveAgent AND entity2 EXISTS_AND_IS_A csp:CognitiveAgent) THEN (entity1 csp:hasBeliefState ?b1 AND ?b1 csp:hasBelievedProposition (entity2 dul:hasQuality dul:Existence)) AND (entity2 csp:hasBeliefState ?b2 AND ?b2 csp:hasBelievedProposition (entity1 dul:hasQuality dul:Existence))
```

## 2. Explanation of Fields

- **`<FrameName>`:** The specific name of the relation frame being defined (e.g., `Similarity`, `Kinship`, `Personal_relationship`, `Adjacency`).
    
- **`DESCRIPTION`:** A concise natural language explanation of the frame.
    
- **`TYPE Relation`:** Explicitly declares this frame as a `Relation` type, ensuring it aligns with `dul:Relation` (or a more specific DUL relation subclass) in the OWL ontology. DUL classifies `Relations` as a fundamental `dul:Description` that applies to multiple `dul:Object`s.
    
- **`INHERITS_FROM`:** (Optional) Indicates if this specific `Relation` frame is a sub-type of another, more general frame (e.g., `Kinship` might inherit from `Personal_relationship`, which might ultimately inherit from `dul:SocialRelation`). This translates to `rdfs:subClassOf`.
    
- **`CORE_FEs:`** Defines the essential Frame Elements. For `Relation` frames, these are the entities that are related.
    
    - **`entity1` / `entity2`**: Used for asymmetric relations where one participant is primary or figures against another.
        
    - **`entities`**: Used for symmetric relations where participants are jointly involved without a primary/secondary distinction.
        
    - Their `TYPE` should be appropriate DUL classes (e.g., `dul:Object`, `csp:CognitiveAgent`, `dul:PhysicalObject`).
        
- **`OPTIONAL_FEs:`:** Lists commonly associated, but not strictly required, FEs that provide additional context about the relation (when, where, intensity, specific context, underlying reason).
    
- **`COMMON_SENSE_RULES:`:** Contains logical statements defining the inherent properties of relations and the typical relationships between the relation and its FEs.
    
    - **`thisFrameInstance`**: This **special reference** is used universally across all frame types to refer to the _instance of the frame currently being defined_. For a `Relation` frame, `thisFrameInstance` refers to the specific relation occurrence. This maps directly to the instance of the frame class in the OWL ontology.
        
    - `dul:holdsAt` / `dul:hasTime` / `dul:hasDuration` / `dul:hasQuality` / `dul:hasParticipant` / `dul:hasContext` / `dul:hasBasis`**: These are direct mappings to DUL and CSP properties used to express the logical connections.
        
    - **`EXISTS_AND_IS_A`**: A DSL helper construct to check if an optional FE is present and of a certain ontological type.
        
    - **`IS_SYMMETRIC true`**: An example of a constraint that could be applied if the relation is inherently symmetric (e.g., `Similarity`, `Co-association`).
        

## 3. Example Frame Definition: `Similarity`

Here's how the `Similarity` frame (from `fnbr_frame.csv`), which is a `Relation` type, might be defined using this template and the DSL.

```
FRAME Similarity:
    DESCRIPTION "Two or more distinct entities, which may be concrete or abstract objects or types, are characterized as being similar to each other."
    TYPE Relation
    // No specific inheritance beyond the base 'Relation' for this example

    CORE_FEs:
        entities: TYPE dul:CollectionOfObjects // The group of entities that are similar
        // OR
        // entity1: TYPE dul:Object
        // entity2: TYPE dul:Object

    OPTIONAL_FEs:
        degree: TYPE dul:Quantity // The extent of similarity (e.g., "very," "slightly")
        dimension: TYPE dul:Quality // The aspect or parameter along which similarity is judged (e.g., "shape", "color", "behavior")
        comparisonSet: TYPE dul:CollectionOfObjects // A set of entities used as a basis for comparison
        time: TYPE dul:TemporalInterval // When the similarity holds
        context: TYPE dul:Situation // The specific circumstances or domain of the comparison

    COMMON_SENSE_RULES:
        // Inherent properties of this relation
        IMPLIES: thisFrameInstance dul:hasParticipants entities
        IMPLIES: thisFrameInstance dul:hasQuality dul:ResemblanceQuality // Assuming dul:ResemblanceQuality exists or is defined

        // Rule: Similarity is typically a symmetric relation
        TYPICALLY: thisFrameInstance HAS_PROPERTY IS_SYMMETRIC true

        // Rule: If a dimension is specified, similarity holds along that dimension.
        RULE 1: IF (dimension EXISTS_AND_IS_A dul:Quality) THEN (thisFrameInstance dul:hasContext dimension)

        // Rule: The degree of similarity describes the intensity of the resemblance.
        RULE 2: IF (degree EXISTS_AND_IS_A dul:Quantity) THEN (thisFrameInstance dul:hasQuality degree)

        // Rule: All entities in the collection share some common features
        RULE 3: ALL ?e WHERE (entities dul:hasPart ?e) THEN (?e dul:sharesFeatureWith ?otherE WHERE (entities dul:hasPart ?otherE AND ?otherE != ?e))
        // This rule implies that if an entity 'e' is part of the 'entities' collection, it shares features with other entities in the same collection.

        // Rule: Similarity can be influenced by the perspective of a judge (often implicit)
        TYPICALLY: IF (entity1 EXISTS_AND_IS_A csp:CognitiveAgent AND entity2 EXISTS_AND_IS_A csp:CognitiveAgent) THEN (entity1 csp:hasBeliefState ?b1 AND ?b1 csp:hasBelievedProposition (entity2 dul:hasQuality dul:Existence)) AND (entity2 csp:hasBeliefState ?b2 AND ?b2 csp:hasBelievedProposition (entity1 dul:hasQuality dul:Existence))
```

## 4. Future Steps

Our next step will be to define the template for the `Attribute` frame type.