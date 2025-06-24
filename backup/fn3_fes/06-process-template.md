# FN3 Frame Template: `Process` (Revised)

This document defines the standard template for `Process` type frames within the FN3 DSL. The `Process` frame type represents an ongoing activity or development that extends over a period of time, typically involving continuous change. This template outlines the expected structure, core and optional Frame Elements (FEs), and common sense rules that commonly apply to frames categorized as `Process`.

## 1. Template Structure

```
FRAME <FrameName>:
    DESCRIPTION "<natural language description of the specific Process frame>"
    TYPE Process
    [INHERITS_FROM <ParentFrameName>] // Optional, common for specialization or stages of a process

    CORE_FEs:
        // Core FE representing the ongoing process itself
        process: TYPE dul:Process // The core process entity being described

    OPTIONAL_FEs:
        // Common optional FEs for Process frames, using DUL/CSP types
        agent: TYPE csp:CognitiveAgent, [CONSTRAINT INTENTIONAL true] // The volitional performer of the process
        cause: TYPE dul:Situation // A situation or entity that non-volitionally initiates or maintains the process
        theme: TYPE dul:Object // An object that undergoes the process or is involved in it
        patient: TYPE dul:Object // An entity that undergoes a change due to the process
        time: TYPE dul:TemporalInterval // The overall time interval during which the process occurs
        place: TYPE dul:Location // The location where the process occurs
        manner: TYPE dul:Quality // The way in which the process unfolds or is performed
        purpose: TYPE dul:Purpose // The goal or aim for which an agent performs or maintains the process
        duration: TYPE dul:Duration // The temporal extent of the process (inherent in Process type, but can be specified)
        rate: TYPE dul:Rate // The speed or frequency of change within the process
        resultState: TYPE dul:State // The final state achieved by the process
        initialState: TYPE dul:State // The state preceding the process
        stages: TYPE dul:Description // A description of the distinguishable phases of the process

    COMMON_SENSE_RULES:
        // Inherent properties of processes
        IMPLIES: thisFrameInstance dul:occursAt thisFrameInstance dul:hasTime // A process occurs within a temporal context.
        IMPLIES: thisFrameInstance dul:hasQuality dul:OngoingOccurrence // A process is an ongoing occurrence.
        IMPLIES: thisFrameInstance dul:hasDuration ?duration // Processes inherently have duration.

        // Rules relating to common core and optional FEs (using generic 'thisFrameInstance' to refer to the current frame instance)
        RULE 1: IF (agent EXISTS_AND_IS_A csp:CognitiveAgent) THEN (thisFrameInstance dul:hasAgent agent)
        RULE 2: IF (cause EXISTS_AND_IS_A dul:Situation) THEN (thisFrameInstance dul:isCausedBy cause)
        RULE 3: IF (theme EXISTS_AND_IS_A dul:Object) THEN (thisFrameInstance dul:hasTheme theme)
        RULE 4: IF (patient EXISTS_AND_IS_A dul:Object) THEN (thisFrameInstance dul:hasPatient patient)
        RULE 5: IF (time EXISTS_AND_IS_A dul:TemporalInterval) THEN (thisFrameInstance dul:hasTime time)
        RULE 6: IF (place EXISTS_AND_IS_A dul:Location) THEN (thisFrameInstance dul:hasLocation place)
        RULE 7: IF (manner EXISTS_AND_IS_A dul:Quality) THEN (thisFrameInstance dul:hasQuality manner)
        RULE 8: IF (purpose EXISTS_AND_IS_A dul:Purpose) THEN (thisFrameInstance dul:hasPurpose purpose)
        RULE 9: IF (duration EXISTS_AND_IS_A dul:Duration) THEN (thisFrameInstance dul:hasDuration duration)
        RULE 10: IF (rate EXISTS_AND_IS_A dul:Rate) THEN (thisFrameInstance dul:hasRate rate)
        RULE 11: IF (resultState EXISTS_AND_IS_A dul:State) THEN (thisFrameInstance dul:hasResult resultState)
        RULE 12: IF (initialState EXISTS_AND_IS_A dul:State) THEN (thisFrameInstance dul:hasStartingCondition initialState)

        // Example general common sense rule for processes that typically lead to a result state
        TYPICALLY: IF (thisFrameInstance dul:hasResult ?result) THEN (?result dul:isConsequentOf thisFrameInstance)

        // Example rule for a process initiated by an agent's intention
        RULE 13: IF (agent EXISTS_AND_IS_A csp:CognitiveAgent AND agent HAS_PROPERTY INTENTIONAL true) THEN (thisFrameInstance csp:isCausedByIntentionOf agent)
        // Note: 'csp:isCausedByIntentionOf' is a placeholder property for a more complex relation
        // linking the process to the agent's intention, possibly expressed using SWRL.

        // Example: A process begins from an initial state
        PRECONDITION: initialState dul:holdsFor theme AT thisFrameInstance dul:hasStartingTime
        // Example: A process leads to a final state
        POSTCONDITION: resultState dul:holdsFor theme AFTER thisFrameInstance dul:hasFinishingTime
```

## 2. Explanation of Fields

- **`<FrameName>`:** The specific name of the process frame being defined (e.g., `Processing_materials`, `Cooking_creation`, `Dough_rising`).
    
- **`DESCRIPTION`:** A concise natural language explanation of the frame.
    
- **`TYPE Process`:** Explicitly declares this frame as a `Process` type, ensuring it aligns with `dul:Process` in the OWL ontology.
    
- **`INHERITS_FROM`:** (Optional) Indicates if this specific `Process` frame is a sub-type of another, more general frame (e.g., `Activity_ongoing` might inherit from `Activity`). This translates to `rdfs:subClassOf`.
    
- **`CORE_FEs:`:** Defines the essential Frame Elements. For `Process` frames, there is typically one primary FE representing the ongoing process itself (`process`). Other participants (agent, theme, patient) might be central depending on the specific process.
    
- **`OPTIONAL_FEs:`:** Lists commonly associated, but not strictly required, FEs that provide additional context about the process (when, where, how, why, what changes).
    
- **`COMMON_SENSE_RULES:`:** Contains logical statements defining the inherent properties of processes and the typical relationships between the process and its FEs.
    
    - **`thisFrameInstance`**: This **special reference** is used universally across all frame types to refer to the _instance of the frame currently being defined_. For a `Process` frame, `thisFrameInstance` refers to the specific process occurrence. This maps directly to the instance of the frame class in the OWL ontology.
        
    - `dul:occursAt` / `dul:hasTime` / `dul:hasDuration` / `dul:hasQuality` / `dul:hasAgent` / `dul:isCausedBy` / `dul:hasTheme` / `dul:hasPatient` / `dul:hasPurpose` / `dul:hasRate` / `dul:hasResult` / `dul:hasStartingCondition`**: These are direct mappings to DUL and CSP properties used to express the logical connections.
        
    - **`EXISTS_AND_IS_A`**: A DSL helper construct to check if an optional FE is present and of a certain ontological type.
        

## 3. Example Frame Definition: `Dough_rising`

Here's how the `Dough_rising` frame (from `fnbr_frame.csv`), which is a `Process` type, might be defined using this template and the DSL.

```
FRAME Dough_rising:
    DESCRIPTION "The LUs of this frame describe a lump of #Dough expanding as gas develops inside it. This is part of a process where, in order to produce a lighter, more easily chewed bread, #Dough is leavened with yeast, baking soda or in another fashion to add gas to it before baking."
    TYPE Process
    INHERITS_FROM Expansion // Assuming 'Expansion' is a Process frame for physical size change

    CORE_FEs:
        dough: TYPE dul:PhysicalObject // The lump of dough that is rising

    OPTIONAL_FEs:
        agent: TYPE csp:CognitiveAgent // The cook who prepared the dough for rising
        cause: TYPE dul:Situation // The leavening agent or environmental conditions causing the rise (e.g., 'yeast', 'warmth')
        time: TYPE dul:TemporalInterval // The time interval during which the rising occurs
        place: TYPE dul:Location // The location where the dough is rising
        resultState: TYPE dul:State // The final state of the dough after rising (e.g., 'dul:ExpandedState')

    COMMON_SENSE_RULES:
        // Inherent properties of this process
        IMPLIES: thisFrameInstance dul:hasPatient dough
        IMPLIES: dough dul:isSubjectedTo thisFrameInstance // Dough is undergoing this process

        // Rule: Dough's volume increases
        IMPLIES: dough dul:hasQuality dul:IncreasedVolume AFTER thisFrameInstance dul:hasFinishingTime

        // Rule: The dough changes its physical state (consistency/size)
        IMPLIES: dough CHANGES_FROM dul:DenseState TO dul:AeratedState DURING thisFrameInstance

        // Rule: If an agent prepared it, they typically intended it to rise
        TYPICALLY: IF (agent EXISTS_AND_IS_A csp:CognitiveAgent) THEN (agent csp:intendsAction thisFrameInstance)

        // Precondition: Dough must be leavened and in a suitable environment for rising to begin
        PRECONDITION: dough dul:hasQuality dul:Leavened AND thisFrameInstance dul:hasLocation ?suitableEnv AND ?suitableEnv dul:hasQuality dul:Warm

        // Postcondition: Dough has expanded and is ready for the next stage (e.g., baking)
        POSTCONDITION: dough dul:hasQuality dul:ExpandedState AFTER thisFrameInstance dul:hasFinishingTime
        POSTCONDITION: dough dul:hasQuality dul:ReadyForBakingState AFTER thisFrameInstance dul:hasFinishingTime

        // Example rule relating cause
        RULE 1: IF (cause EXISTS_AND_IS_A dul:Situation) THEN (thisFrameInstance dul:isCausedBy cause)
```

## 4. Future Steps

Our next step will be to define the template for the `State` frame type.