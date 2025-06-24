# FN3 Frame Template: `Attribute` (Revised)

This document defines the standard template for `Attribute` type frames within the FN3 DSL. The `Attribute` frame type represents a characteristic or property possessed by an entity, often scalar or gradable. This template outlines the expected structure, core and optional Frame Elements (FEs), and common sense rules that commonly apply to frames categorized as `Attribute`.

## 1. Template Structure

```
FRAME <FrameName>:
    DESCRIPTION "<natural language description of the specific Attribute frame>"
    TYPE Attribute
    [INHERITS_FROM <ParentFrameName>] // Optional, common for specialization (e.g., 'Speed_description' inherits from 'Measurable_attributes')

    CORE_FEs:
        // Core FEs for Attribute frames: the entity that possesses the attribute, and the attribute itself.
        entity: TYPE dul:Object // The entity that possesses or exhibits the attribute
        attribute: TYPE dul:Quality // The specific property or characteristic being described (often incorporated into the frame's meaning)

    OPTIONAL_FEs:
        // Common optional FEs for Attribute frames, using DUL/CSP types
        value: TYPE xsd:anySimpleType // The specific value of the attribute (can be numerical, categorical, etc.)
        degree: TYPE dul:Quantity OR dul:Quality // The intensity or measure of the attribute (e.g., "very," "slightly," "high")
        parameter: TYPE dul:Situation // A specific aspect or dimension within which the attribute holds or is evaluated
        time: TYPE dul:TemporalInterval // The time interval during which the attribute is possessed
        context: TYPE dul:Situation // Broader circumstances affecting the attribute or its evaluation
        judge: TYPE csp:CognitiveAgent // The agent making the assessment of the attribute (often implicit)
        comparisonSet: TYPE dul:CollectionOfObjects // A set of entities used as a basis for comparison when evaluating the attribute

    COMMON_SENSE_RULES:
        // Inherent properties of attributes
        IMPLIES: thisFrameInstance dul:holdsFor entity // The attribute applies to the specified entity.
        IMPLIES: thisFrameInstance dul:occursAt thisFrameInstance dul:hasTime // An attribute holds within a temporal context.
        IMPLIES: thisFrameInstance dul:hasQuality attribute // The attribute instance expresses the specific quality.

        // Rules relating to common core and optional FEs (using generic 'thisFrameInstance' to refer to the current frame instance)
        RULE 1: IF (entity EXISTS_AND_IS_A dul:Object) THEN (thisFrameInstance dul:holdsFor entity)
        RULE 2: IF (attribute EXISTS_AND_IS_A dul:Quality) THEN (thisFrameInstance dul:expressesQuality attribute)
        RULE 3: IF (value EXISTS_AND_IS_A xsd:anySimpleType) THEN (thisFrameInstance dul:hasValue value)
        RULE 4: IF (degree EXISTS_AND_IS_A dul:Quantity OR degree EXISTS_AND_IS_A dul:Quality) THEN (thisFrameInstance dul:hasQuality degree)
        RULE 5: IF (parameter EXISTS_AND_IS_A dul:Situation) THEN (thisFrameInstance dul:hasContext parameter)
        RULE 6: IF (time EXISTS_AND_IS_A dul:TemporalInterval) THEN (thisFrameInstance dul:hasTime time)
        RULE 7: IF (context EXISTS_AND_IS_A dul:Situation) THEN (thisFrameInstance dul:hasContext context)
        RULE 8: IF (judge EXISTS_AND_IS_A csp:CognitiveAgent) THEN (thisFrameInstance dul:isEvaluatedBy judge)

        // Example: If an attribute is gradable, it has a degree.
        IMPLIES: IF (attribute HAS_PROPERTY IS_GRADABLE true) THEN (thisFrameInstance dul:hasQuality dul:DegreeQuality) // Assuming dul:DegreeQuality exists

        // Example: If a specific value is given, it's typically within a range for the attribute type.
        TYPICALLY: IF (value EXISTS_AND_IS_A xsd:anySimpleType) THEN (attribute dul:hasRange ?range AND value dul:isMemberOf ?range)

        // Example: An attribute can influence an agent's beliefs or actions.
        RULE 9: IF (judge EXISTS_AND_IS_A csp:CognitiveAgent AND thisFrameInstance dul:affects judge) THEN (judge csp:influencesBelief ?beliefState AND ?beliefState csp:hasBelievedProposition thisFrameInstance)
```

## 2. Explanation of Fields

- **`<FrameName>`:** The specific name of the attribute frame being defined (e.g., `Age`, `Expensiveness`, `Speed_description`, `Size`).
    
- **`DESCRIPTION`:** A concise natural language explanation of the frame.
    
- **`TYPE Attribute`:** Explicitly declares this frame as an `Attribute` type, ensuring it aligns with `dul:Quality` or other attribute-related DUL classes in the OWL ontology. DUL categorizes qualities/attributes as `dul:Quality`. This template refers to the attribute _instance_ as `thisFrameInstance`.
    
- **`INHERITS_FROM`:** (Optional) Indicates if this specific `Attribute` frame is a sub-type of another, more general frame (e.g., `Speed_description` might inherit from `Measurable_attributes`). This translates to `rdfs:subClassOf`.
    
- **`CORE_FEs:`:** Defines the essential Frame Elements. For `Attribute` frames, these are typically the `entity` that possesses the attribute and the `attribute` (or characteristic/property) itself. The `attribute` FE's type should be `dul:Quality` or a more specific subclass of `dul:Quality`.
    
- **`OPTIONAL_FEs:`:** Lists commonly associated, but not strictly required, FEs that provide additional context about the attribute (its specific value, intensity, relevant parameters, time, context, or who is judging it).
    
    - **`value`**: This FE is specified as `xsd:anySimpleType` to allow for various data types (numbers, strings, booleans, etc.), as attribute values can be diverse.
        
- **`COMMON_SENSE_RULES:`:** Contains logical statements defining the inherent properties of attributes and the typical relationships between the attribute and its FEs.
    
    - **`thisFrameInstance`**: This **special reference** is used universally across all frame types to refer to the _instance of the frame currently being defined_. For an `Attribute` frame, `thisFrameInstance` refers to the specific attribute instance. This maps directly to the instance of the frame class in the OWL ontology.
        
    - `dul:holdsFor` / `dul:occursAt` / `dul:hasTime` / `dul:hasQuality` / `dul:expressesQuality` / `dul:hasValue` / `dul:hasContext` / `dul:isEvaluatedBy`**: These are direct mappings to DUL and CSP properties used to express the logical connections.
        
    - **`EXISTS_AND_IS_A`**: A DSL helper construct to check if an optional FE is present and of a certain ontological type.
        
    - **`HAS_PROPERTY IS_GRADABLE true`**: An example constraint for the `attribute` FE, indicating it can take a range of values.
        

## 3. Example Frame Definition: `Age`

Here's how the `Age` frame (from `fnbr_frame.csv`), which is an `Attribute` type, might be defined using this template and the DSL.

```
FRAME Age:
    DESCRIPTION "An Entity has existed for a length of time, the Age. The Age can be characterized as a value of the age Attribute, or a Degree modifier may express the deviation of the Age from the norm. The Expressor exhibits qualities of the age of the Entity."
    TYPE Attribute

    CORE_FEs:
        entity: TYPE dul:Object // The entity whose age is being described
        attribute: TYPE dul:TemporalExtentQuality // The inherent quality of being old/young, or having a certain age.

    OPTIONAL_FEs:
        value: TYPE xsd:integer // The specific numerical age (e.g., "20 years")
        degree: TYPE dul:Quality // The extent of age (e.g., "really old," "very young")
        time: TYPE dul:TemporalInterval // The point or period in time when the age holds
        expressor: TYPE dul:PhysicalObject // A part or aspect of the entity that manifests its age (e.g., "wrinkles", "gray hair")
        judge: TYPE csp:CognitiveAgent // The agent assessing the age (often implicit)
        norm: TYPE xsd:integer // The typical age for the entity's type, used for comparison

    COMMON_SENSE_RULES:
        // Inherent properties of this attribute
        IMPLIES: thisFrameInstance dul:holdsFor entity
        IMPLIES: thisFrameInstance dul:expressesQuality attribute

        // Rule: If a specific 'value' is given, it's the duration of entity's existence.
        RULE 1: IF (value EXISTS_AND_IS_A xsd:integer) THEN (entity dul:hasDuration value)
        // Note: dul:hasDuration is typically for events/processes, may need a specific property like dul:hasAgeValue

        // Rule: Degree of age relates to the deviation from a norm.
        RULE 2: IF (degree EXISTS_AND_IS_A dul:Quality AND norm EXISTS_AND_IS_A xsd:integer)
                THEN (thisFrameInstance dul:hasQuality degree AND
                      (IF (degree IS_A dul:HighQuality) THEN (value GREATER_THAN norm))
                      OR (IF (degree IS_A dul:LowQuality) THEN (value LESS_THAN norm)))
        // Note: GREATER_THAN, LESS_THAN are placeholders for numerical comparison operators.

        // Rule: Expressor manifests the attribute.
        RULE 3: IF (expressor EXISTS_AND_IS_A dul:PhysicalObject) THEN (expressor dul:manifests thisFrameInstance)

        // Rule: Age of a living entity increases over time.
        RULE 4: IF (entity IS_A dul:LivingThing) THEN (thisFrameInstance CHANGES_OVER_TIME, INCREASING value)
        // Note: CHANGES_OVER_TIME, INCREASING are placeholders for temporal dynamic rules.

        // Rule: A judge typically assesses the age based on observable expressors.
        TYPICALLY: IF (judge EXISTS_AND_IS_A csp:CognitiveAgent) THEN (judge csp:isBasedOn (judge csp:perceivesPhenomenon expressor))
```

## 4. Future Steps

We have now defined the template for the `Attribute` frame type.