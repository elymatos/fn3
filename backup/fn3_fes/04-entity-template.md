# FN3 Frame Template: `Entity` (Revised)

This document defines the standard template for `Entity` type frames within the FN3 DSL. The `Entity` frame type represents concrete or abstract objects, individuals, or general "things" that exist. This template outlines the expected structure, core and optional Frame Elements (FEs), and common sense rules that typically apply to frames categorized as `Entity`.

## 1. Template Structure

```
FRAME <FrameName>:
    DESCRIPTION "<natural language description of the specific Entity frame>"
    TYPE Entity
    [INHERITS_FROM <ParentFrameName>] // Optional, but common for specialization

    CORE_FEs:
        <FE_Name_for_Entity_itself>: TYPE dul:Object // The core entity being described

    OPTIONAL_FEs:
        // Common optional FEs for Entity frames, using DUL/CSP types
        descriptor: TYPE dul:Quality // Adjectives or properties characterizing the entity
        entityType: TYPE dul:Type // A classification or kind of entity (e.g., 'dul:PhysicalObject', 'dul:SocialObject')
        material: TYPE dul:PhysicalObject // The substance the entity is made of
        creator: TYPE dul:Agent // The agent who created the entity
        timeOfCreation: TYPE dul:TemporalInterval // The time when the entity was created
        name: TYPE dul:Description // The proper or common name of the entity
        origin: TYPE dul:Place // The place where the entity originated
        use: TYPE dul:Event // The typical or intended activity for which the entity exists
        constituentParts: TYPE dul:Object // Components that make up the entity
        place: TYPE dul:Location // The current or typical location of the entity
        quantity: TYPE dul:Quantity // The amount or measure of the entity

    COMMON_SENSE_RULES:
        // Inherent properties of entities
        IMPLIES: thisFrameInstance dul:hasQuality dul:Existence // Entities exist

        // Rules relating to common optional FEs
        RULE 1: IF (descriptor EXISTS_AND_IS_A dul:Quality) THEN (thisFrameInstance dul:hasQuality descriptor)
        RULE 2: IF (creator EXISTS_AND_IS_A dul:Agent) THEN (thisFrameInstance dul:isCreatedBy creator)
        RULE 3: IF (timeOfCreation EXISTS_AND_IS_A dul:TemporalInterval) THEN (thisFrameInstance dul:hasCreationTime timeOfCreation)
        RULE 4: IF (use EXISTS_AND_IS_A dul:Event) THEN (thisFrameInstance dul:hasPurpose use)
        RULE 5: IF (place EXISTS_AND_IS_A dul:Location) THEN (thisFrameInstance dul:hasLocation place)

        // General common sense rules for entities
        RULE 6: IF (thisFrameInstance dul:hasPart ?part) THEN (?part IS_A dul:Object)
        RULE 7: IF (thisFrameInstance dul:isMadeOf material) THEN (material IS_A dul:Substance)

        // Add rules related to specific constraints like 'IS_ANIMATE' or 'IS_SENTIENT' if applicable
        // RULE X: IF (thisFrameInstance HAS_PROPERTY IS_ANIMATE true) THEN (thisFrameInstance IS_A dul:LivingThing)
```

## 2. Explanation of Fields

- **`<FrameName>`:** The specific name of the frame being defined (e.g., `Weapon`, `Building`).
    
- **`DESCRIPTION`:** A concise natural language explanation of the frame.
    
- **`TYPE Entity`:** Explicitly declares this frame as an `Entity` type, ensuring it aligns with the core `dul:Object` class in the OWL ontology.
    
- **`INHERITS_FROM`:** (Optional) Indicates if this specific `Entity` frame is a sub-type of another, more general frame (e.g., `Weapon` might inherit from `Artifact`). This translates to `rdfs:subClassOf`.
    
- **`CORE_FEs:`:** Defines the essential Frame Elements. For `Entity` frames, there's typically one primary FE representing the entity itself. Its `TYPE` should be a relevant DUL class (e.g., `dul:Object`, `dul:PhysicalObject`, `dul:SocialObject`, etc.).
    
    - **Constraint `INTENTIONAL true` / `IS_ANIMATE true`**: These are examples of common `CONSTRAINT`s that can be applied to FEs if the entity is an agent or living being, and would map to `dul:hasQuality` assertions or `rdfs:subClassOf` more specific DUL classes.
        
- **`OPTIONAL_FEs:`:** Lists commonly associated, but not strictly required, FEs. The `TYPE` for each should again align with DUL or CSP ontological classes.
    
- **`COMMON_SENSE_RULES:`:** Contains logical statements defining the inherent properties of entities and the typical relationships between the entity and its FEs.
    
    - **`thisFrameInstance`**: This **special reference** is now used universally across all frame types to refer to the _instance of the frame currently being defined_. For an `Entity` frame, `thisFrameInstance` refers to the specific entity being described. This maps directly to the instance of the frame class in the OWL ontology.
        
    - `EXISTS_AND_IS_A`: This is a helper construct from the DSL manual for checking if an optional FE is present and of a certain type.
        
    - Relational operators like `dul:hasQuality`, `dul:isCreatedBy`, `dul:hasPurpose`, `dul:hasLocation`, `dul:hasPart`, `dul:isMadeOf` are used to express the logical connections, directly mapping to DUL properties.
        

## 3. Example Frame Definition: `Weapon`

Here's an example of how the `Weapon` frame (from `fnbr_frame.csv`) might be defined using this template and the DSL.

```
FRAME Weapon:
    DESCRIPTION "A Weapon is an artifact created specifically to cause harm or damage. In some cases, a Use, Material of construction, Part or Type may be more narrowly specified."
    TYPE Entity
    INHERITS_FROM Artifact // Assuming 'Artifact' is another FN3 frame of type Entity

    CORE_FEs:
        weapon: TYPE dul:PhysicalObject

    OPTIONAL_FEs:
        weaponType: TYPE dul:Type // e.g., 'Gun', 'Sword', 'Bomb'
        use: TYPE dul:Event // Specifically, an event of 'causing harm' or 'damaging'
        material: TYPE dul:PhysicalObject // e.g., 'metal', 'wood'
        part: TYPE dul:Object // A sub-component of the weapon, e.g., 'trigger', 'barrel'
        creator: TYPE dul:Agent
        timeOfCreation: TYPE dul:TemporalInterval

    COMMON_SENSE_RULES:
        // Weapons are created artifacts
        IMPLIES: thisFrameInstance dul:isCreatedBy creator

        // Primary purpose of a weapon is to cause harm or damage
        IMPLIES: thisFrameInstance dul:hasPurpose dul:CauseHarmEvent

        // A weapon is typically designed to be used in an act of violence
        TYPICALLY: thisFrameInstance dul:isUsedFor csp:Action, CONSTRAINT (csp:Action HAS_PROPERTY csp:INTENDS_HARM)

        // If a weapon has a material, it is a physical substance.
        RULE 1: IF (material EXISTS_AND_IS_A dul:PhysicalObject) THEN (thisFrameInstance dul:isMadeOf material)

        // If a weapon has a specific part, that part is a physical object.
        RULE 2: IF (part EXISTS_AND_IS_A dul:Object) THEN (thisFrameInstance dul:hasPart part)

        // If a weapon is of a certain type, it is a sub-classification of weapon.
        RULE 3: IF (weaponType EXISTS_AND_IS_A dul:Type) THEN (thisFrameInstance IS_A weaponType)

        // Example: A firearm weapon type has a barrel part
        RULE 4: IF (thisFrameInstance IS_A dul:Firearm) THEN (EXISTS ?barrel WHERE (?barrel IS_A dul:Barrel AND thisFrameInstance dul:hasPart ?barrel))
```

## 4. Future Steps

With the `Entity` frame template defined, we can proceed to:

- Define the templates for the remaining core frame types: `Event`, `Process`, `State`, `Relation`, and `Attribute`.
    
- Refine the `COMMON_SENSE_RULES` section further, especially regarding the explicit `thisFrameInstance` reference, to ensure clear mapping for all frame types.