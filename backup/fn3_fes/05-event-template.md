# FN3 Frame Template: `Event` (Revised)

This document defines the standard template for `Event` type frames within the FN3 DSL. The `Event` frame type represents happenings or occurrences that typically involve a change of state or location. This template outlines the expected structure, core and optional Frame Elements (FEs), and common sense rules that commonly apply to frames categorized as `Event`.

## 1. Template Structure

```
FRAME <FrameName>:
    DESCRIPTION "<natural language description of the specific Event frame>"
    TYPE Event
    [INHERITS_FROM <ParentFrameName>] // Optional, but common for specialization

    CORE_FEs:
        // Core FEs for Event frames, reflecting their primary participants
        // Combinations vary based on the event's nature (agentive, experiencer-focused, caused, etc.)
        agent: TYPE csp:CognitiveAgent, [CONSTRAINT INTENTIONAL true] // The volitional performer of the event
        cause: TYPE dul:Situation // A situation or entity that non-volitionally brings about the event
        theme: TYPE dul:Object // The object that moves or is affected
        patient: TYPE dul:Object // The entity that undergoes a change due to the event
        experiencer: TYPE csp:CognitiveAgent // The agent who has an internal experience (e.g., emotion, perception)
        result: TYPE dul:Situation // The state or event that is the direct outcome of the event

    OPTIONAL_FEs:
        // Common optional FEs for Event frames, using DUL/CSP types
        time: TYPE dul:TemporalInterval // The time interval during which the event occurs
        place: TYPE dul:Location // The location where the event occurs
        manner: TYPE dul:Quality // The way in which the event is performed or transpires
        purpose: TYPE dul:Purpose // The goal or aim for which an agent performs the event
        duration: TYPE dul:Duration // The temporal extent of the event
        frequency: TYPE dul:Frequency // How often the event occurs
        instrument: TYPE dul:Tool // An object used by an agent to perform the event
        means: TYPE dul:Event // A sub-event or process through which the event is accomplished
        source: TYPE dul:Location // The starting location for a motion event
        goal: TYPE dul:Location // The ending location for a motion event
        path: TYPE dul:Path // The trajectory for a motion event

    COMMON_SENSE_RULES:
        // Inherent properties of events
        IMPLIES: thisFrameInstance dul:occursAt thisFrameInstance dul:hasTime // An event occurs within a temporal context.
        IMPLIES: thisFrameInstance dul:hasQuality dul:Occurrence // An event is an occurrence.

        // Rules relating to common core FEs (using generic 'thisFrameInstance' to refer to the current frame instance)
        RULE 1: IF (agent EXISTS_AND_IS_A csp:CognitiveAgent) THEN (thisFrameInstance dul:hasAgent agent)
        RULE 2: IF (cause EXISTS_AND_IS_A dul:Situation) THEN (thisFrameInstance dul:isCausedBy cause)
        RULE 3: IF (theme EXISTS_AND_IS_A dul:Object) THEN (thisFrameInstance dul:hasTheme theme)
        RULE 4: IF (patient EXISTS_AND_IS_A dul:Object) THEN (thisFrameInstance dul:hasPatient patient)
        RULE 5: IF (experiencer EXISTS_AND_IS_A csp:CognitiveAgent) THEN (thisFrameInstance dul:hasExperiencer experiencer)
        RULE 6: IF (result EXISTS_AND_IS_A dul:Situation) THEN (thisFrameInstance dul:hasResult result)

        // Rules relating to common optional FEs
        RULE 7: IF (time EXISTS_AND_IS_A dul:TemporalInterval) THEN (thisFrameInstance dul:hasTime time)
        RULE 8: IF (place EXISTS_AND_IS_A dul:Location) THEN (thisFrameInstance dul:hasLocation place)
        RULE 9: IF (manner EXISTS_AND_IS_A dul:Quality) THEN (thisFrameInstance dul:hasQuality manner)
        RULE 10: IF (purpose EXISTS_AND_IS_A dul:Purpose) THEN (thisFrameInstance dul:hasPurpose purpose)
        RULE 11: IF (duration EXISTS_AND_IS_A dul:Duration) THEN (thisFrameInstance dul:hasDuration duration)
        RULE 12: IF (instrument EXISTS_AND_IS_A dul:Tool) THEN (thisFrameInstance dul:hasInstrument instrument)
        RULE 13: IF (source EXISTS_AND_IS_A dul:Location) THEN (thisFrameInstance dul:hasStartingPlace source)
        RULE 14: IF (goal EXISTS_AND_IS_A dul:Location) THEN (thisFrameInstance dul:hasDestination goal)

        // Example general common sense rule for agentive events
        RULE 15: IF (agent EXISTS_AND_IS_A csp:CognitiveAgent AND agent HAS_PROPERTY INTENTIONAL true) THEN (thisFrameInstance csp:isCausedByIntentionOf agent)
        // Note: 'csp:isCausedByIntentionOf' is a placeholder property for a more complex relation
        // linking the event to the agent's intention, possibly expressed using SWRL.

        // Example of a precondition (e.g., for 'Abandonment')
        // PRECONDITION: agent csp:hasControl theme BEFORE thisFrameInstance dul:hasStartingTime

        // Example of a postcondition (e.g., for 'Abandonment')
        // POSTCONDITION: NOT (agent csp:hasControl theme) AFTER thisFrameInstance dul:hasFinishingTime
```

## 2. Explanation of Fields

- **`<FrameName>`:** The specific name of the event frame being defined (e.g., `Abandonment`, `Arriving`, `Giving`).
    
- **`DESCRIPTION`:** A concise natural language explanation of the frame.
    
- **`TYPE Event`:** Explicitly declares this frame as an `Event` type, ensuring it aligns with `dul:Event` in the OWL ontology.
    
- **`INHERITS_FROM`:** (Optional) Indicates if this specific `Event` frame is a sub-type of another, more general frame (e.g., `Killing` might inherit from `Cause_harm`). This translates to `rdfs:subClassOf`.
    
- **`CORE_FEs:`:** Defines the essential Frame Elements. For `Event` frames, the core FEs often describe the participants central to the event's occurrence or the entity directly undergoing the change. The combinations listed (`agent`, `cause`, `theme`, `patient`, `experiencer`, `result`) are common, but specific frames will use a subset based on their semantic focus.
    
    - **Constraint `INTENTIONAL true`**: A common constraint for `agent` FEs, mapping to `dul:hasQuality dul:Intentional`.
        
- **`OPTIONAL_FEs:`:** Lists commonly associated, but not strictly required, FEs that provide additional context (when, where, how, why).
    
- **`COMMON_SENSE_RULES:`:** Contains logical statements defining the inherent properties of events and the typical relationships between the event and its FEs.
    
    - **`thisFrameInstance`**: This **special reference** is used universally across all frame types to refer to the _instance of the frame currently being defined_. For an `Event` frame, `thisFrameInstance` refers to the specific event occurrence. This maps directly to the instance of the frame class in the OWL ontology.
        
    - `dul:occursAt` / `dul:hasStartingTime` / `dul:hasFinishingTime` / `dul:isCausedBy` / `dul:hasResult` / `dul:hasAgent` / `dul:hasTheme` / `dul:hasPatient` / `dul:hasExperiencer` / `dul:hasPurpose` / `dul:hasDuration` / `dul:hasFrequency` / `dul:hasInstrument` / `dul:hasStartingPlace` / `dul:hasDestination`**: These are direct mappings to DUL and CSP properties used to express the logical connections.
        
    - **`EXISTS_AND_IS_A`**: A DSL helper construct to check if an optional FE is present and of a certain ontological type.
        

## 3. Example Frame Definition: `Abandonment`

Here's how the `Abandonment` frame (from `fnbr_frame.csv`), which is an `Event` type, might be defined using this template and the DSL.

```
FRAME Abandonment:
    DESCRIPTION "An Agent leaves behind a Theme effectively rendering it no longer within their control or of the normal security as one's property."
    TYPE Event
    INHERITS_FROM Relinquish // 'Relinquish' is assumed to be a more general Event frame

    CORE_FEs:
        agent: TYPE csp:CognitiveAgent, CONSTRAINT INTENTIONAL true
        theme: TYPE dul:Object

    OPTIONAL_FEs:
        place: TYPE dul:Location
        time: TYPE dul:TemporalInterval // The time interval of the abandonment event
        manner: TYPE dul:Quality // The way the abandonment occurred
        purpose: TYPE dul:Purpose // The reason for the abandonment

    COMMON_SENSE_RULES:
        // Inherent properties of this event
        IMPLIES: thisFrameInstance dul:occursAt time
        IMPLIES: thisFrameInstance dul:hasAgent agent
        IMPLIES: thisFrameInstance dul:hasTheme theme

        // Pre-condition: Agent must have control over the Theme before the abandonment event.
        PRECONDITION: agent csp:hasControl theme BEFORE thisFrameInstance dul:hasStartingTime

        // Post-condition: Agent no longer has control over the Theme after the abandonment event.
        POSTCONDITION: NOT (agent csp:hasControl theme) AFTER thisFrameInstance dul:hasFinishingTime

        // Implication: If the Theme was the Agent's property, it ceases to be property of the Agent after abandonment.
        RULE 1: IF (theme dul:isPropertyOf agent BEFORE thisFrameInstance dul:hasStartingTime)
                THEN (NOT (theme dul:isPropertyOf agent) AFTER thisFrameInstance dul:hasFinishingTime)

        // Default Implication: The security status of the Theme becomes compromised.
        DEFAULT_IMPLIES: theme dul:hasQuality csp:CompromisedSecurity AFTER thisFrameInstance dul:hasFinishingTime

        // Example rule using an optional FE
        RULE 2: IF (place EXISTS_AND_IS_A dul:Location) THEN (thisFrameInstance dul:hasLocation place)
```

## 4. Future Steps

Having defined the `Event` frame template, our next step will be to define the templates for the `Process` frame type.