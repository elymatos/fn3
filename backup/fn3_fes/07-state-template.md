# FN3 Frame Template: `State` (Revised)

This document defines the standard template for `State` type frames within the FN3 DSL. The `State` frame type represents a static condition or quality that persists over a period of time. Unlike `Events` or `Processes`, `States` do not inherently involve continuous change or an initiating agent, although they can be entered into or exited from due to events or processes. This template outlines the expected structure, core and optional Frame Elements (FEs), and common sense rules that commonly apply to frames categorized as `State`.

## 1. Template Structure

```
FRAME <FrameName>:
    DESCRIPTION "<natural language description of the specific State frame>"
    TYPE State
    [INHERITS_FROM <ParentFrameName>] // Optional, common for specialization

    CORE_FEs:
        // Core FEs for State frames: the entity that is in the state, and the state itself.
        entity: TYPE dul:Object // The entity that possesses the state or is in the condition
        state: TYPE dul:Quality OR dul:Situation // The characteristic or condition itself (can be a dul:Quality or a more complex dul:Situation)

    OPTIONAL_FEs:
        // Common optional FEs for State frames, using DUL/CSP types
        time: TYPE dul:TemporalInterval // The time interval during which the state holds
        place: TYPE dul:Location // The location where the entity is in this state
        duration: TYPE dul:Duration // The temporal extent for which the state holds (inherent in State type, but can be specified)
        degree: TYPE dul:Quantity OR dul:Quality // The intensity or measure of the state (e.g., "very," "slightly," a specific value)
        cause: TYPE dul:Situation // A situation or entity that initiated or maintains the state
        experiencer: TYPE csp:CognitiveAgent // For mental or emotional states, the agent experiencing the state
        affectedParty: TYPE dul:Agent OR dul:Object // An entity affected by the state (often indirectly)

    COMMON_SENSE_RULES:
        // Inherent properties of states
        IMPLIES: thisFrameInstance dul:occursAt thisFrameInstance dul:hasTime // A state holds within a temporal context.
        IMPLIES: thisFrameInstance dul:hasQuality dul:StaticOccurrence // A state is a static occurrence.
        IMPLIES: thisFrameInstance dul:hasDuration ?duration // States inherently have duration.
        IMPLIES: thisFrameInstance dul:holdsFor entity // The state applies to the specified entity.

        // Rules relating to common core and optional FEs (using generic 'thisFrameInstance' to refer to the current frame instance)
        RULE 1: IF (entity EXISTS_AND_IS_A dul:Object) THEN (thisFrameInstance dul:holdsFor entity)
        RULE 2: IF (state EXISTS_AND_IS_A dul:Quality OR state EXISTS_AND_IS_A dul:Situation) THEN (thisFrameInstance dul:expressesQuality state) // Use dul:expressesQuality or similar
        RULE 3: IF (time EXISTS_AND_IS_A dul:TemporalInterval) THEN (thisFrameInstance dul:hasTime time)
        RULE 4: IF (place EXISTS_AND_IS_A dul:Location) THEN (thisFrameInstance dul:hasLocation place)
        RULE 5: IF (duration EXISTS_AND_IS_A dul:Duration) THEN (thisFrameInstance dul:hasDuration duration)
        RULE 6: IF (degree EXISTS_AND_IS_A dul:Quantity OR degree EXISTS_AND_IS_A dul:Quality) THEN (thisFrameInstance dul:hasQuality degree)
        RULE 7: IF (cause EXISTS_AND_IS_A dul:Situation) THEN (thisFrameInstance dul:isCausedBy cause)
        RULE 8: IF (experiencer EXISTS_AND_IS_A csp:CognitiveAgent) THEN (thisFrameInstance csp:hasExperiencer experiencer)
        RULE 9: IF (affectedParty EXISTS_AND_IS_A dul:Agent OR affectedParty EXISTS_AND_IS_A dul:Object) THEN (thisFrameInstance dul:affects affectedParty)

        // Example general common sense rule for states that can be exited (i.e., not permanent)
        TYPICALLY: thisFrameInstance CAN_CHANGE_TO NOT (thisFrameInstance) // A state can transition to its negation.

        // Example: A mental state is experienced by a cognitive agent
        RULE 10: IF (thisFrameInstance IS_A csp:MentalState) THEN (thisFrameInstance csp:hasExperiencer entity)

        // Example: A state is maintained by a cause
        PRECONDITION: cause EXISTS_AND_IS_A dul:Situation THEN (thisFrameInstance dul:isCausedBy cause AT thisFrameInstance dul:hasStartingTime)
```

## 2. Explanation of Fields

- **`<FrameName>`:** The specific name of the state frame being defined (e.g., `Fullness`, `Being_dry`, `Intoxication`, `Being_employed`).
    
- **`DESCRIPTION`:** A concise natural language explanation of the frame.
    
- **`TYPE State`:** Explicitly declares this frame as a `State` type, ensuring it aligns with `dul:State` in the OWL ontology.
    
- **`INHERITS_FROM`:** (Optional) Indicates if this specific `State` frame is a sub-type of another, more general frame (e.g., `Intoxication` might inherit from `MentalState`). This translates to `rdfs:subClassOf`.
    
- **`CORE_FEs:`:** Defines the essential Frame Elements. For `State` frames, the primary FEs are typically the `entity` that is in the state and the `state` (or characteristic/condition) itself.
    
- **`OPTIONAL_FEs:`:** Lists commonly associated, but not strictly required, FEs that provide additional context about the state (when, where, how intense, what caused it, who experiences/is affected).
    
- **`COMMON_SENSE_RULES:`:** Contains logical statements defining the inherent properties of states and the typical relationships between the state and its FEs.
    
    - **`thisFrameInstance`**: This **special reference** is used universally across all frame types to refer to the _instance of the frame currently being defined_. For a `State` frame, `thisFrameInstance` refers to the specific state occurrence. This maps directly to the instance of the frame class in the OWL ontology.
        
    - `dul:occursAt` / `dul:hasTime` / `dul:hasDuration` / `dul:hasQuality` / `dul:holdsFor` / `dul:expressesQuality` / `dul:isCausedBy` / `dul:affects` / `csp:hasExperiencer`**: These are direct mappings to DUL and CSP properties used to express the logical connections.
        
    - **`EXISTS_AND_IS_A`**: A DSL helper construct to check if an optional FE is present and of a certain ontological type.
        

## 3. Example Frame Definition: `Fullness`

Here's how the `Fullness` frame (from `fnbr_frame.csv`), which is a `State` type, might be defined using this template and the DSL.

```
FRAME Fullness:
    DESCRIPTION "A Container is in a state of fullness/emptiness with respect to some Contents."
    TYPE State
    // No specific inheritance beyond the base 'State' for this example

    CORE_FEs:
        container: TYPE dul:Container // The container that is full or empty
        contents: TYPE dul:Object OR dul:Substance // The items or substance filling the container

    OPTIONAL_FEs:
        degree: TYPE dul:Quantity // The extent of fullness (e.g., "completely," "partially")
        time: TYPE dul:TemporalInterval // When the container is in this state
        place: TYPE dul:Location // Where the container is located

    COMMON_SENSE_RULES:
        // Inherent properties of this state
        IMPLIES: thisFrameInstance dul:holdsFor container
        IMPLIES: thisFrameInstance dul:hasQuality (thisFrameInstance dul:expressesQuality dul:FullnessQuality) // Assuming dul:FullnessQuality exists or is defined.
        IMPLIES: container dul:contains contents

        // Rule: If the container is full, its contents occupy its interior.
        IMPLIES: contents dul:occupiesRegionOf container, SCOPE "interior"

        // Rule: A container can be empty if it has no contents.
        RULE 1: IF (NOT (contents EXISTS_AND_IS_A dul:Object OR contents EXISTS_AND_IS_A dul:Substance)) THEN (thisFrameInstance dul:expressesQuality dul:EmptyQuality)

        // Rule: The degree of fullness relates to the quantity of contents relative to capacity.
        RULE 2: IF (degree EXISTS_AND_IS_A dul:Quantity) THEN (thisFrameInstance dul:hasQuality degree)
        // More complex rule might relate 'degree' to 'quantity of contents' vs 'container capacity'
        // e.g., IF (contents dul:hasQuantity ?q AND container dul:hasCapacity ?c) THEN (degree EQUALS (?q / ?c))

        // Example rule related to temporal context
        RULE 3: IF (time EXISTS_AND_IS_A dul:TemporalInterval) THEN (thisFrameInstance dul:occursAt time)
```

## 4. Future Steps

Our next step will be to define the template for the `Relation` frame type.