# FN3 Frame Template: `Scenario` (Revised)

This document defines the standard template for `Scenario` type frames within the FN3 DSL. The `Scenario` frame type represents complex, dynamic, and often goal-oriented sequences of events, processes, and states, frequently involving multiple participants and interactions. Scenarios encapsulate higher-level commonsense knowledge about how situations typically unfold. This template outlines the expected structure, core and optional Frame Elements (FEs), and common sense rules that commonly apply to frames categorized as `Scenario`.

## 1. Template Structure

```
FRAME <FrameName>:
    DESCRIPTION "<natural language description of the specific Scenario frame>"
    TYPE Scenario
    [INHERITS_FROM <ParentScenarioFrameName>] // Optional, common for broader scenarios (e.g., 'Goal_Directed_Planning_Scenario' inherits from 'Goal_Directed_Action_Scenario')

    CORE_FEs:
        // Core FEs for Scenario frames, often representing the central participants or the overarching process/event
        mainAgent: TYPE csp:CognitiveAgent // The primary agent driving the scenario (if applicable)
        mainTheme: TYPE dul:Object // The primary object or entity central to the scenario
        scenarioProcess: TYPE dul:Process // The overarching process that constitutes the scenario
        scenarioEvent: TYPE dul:Event // The overarching event that defines the scenario

    OPTIONAL_FEs:
        // Common optional FEs for Scenario frames, using DUL/CSP types
        time: TYPE dul:TemporalInterval // The overall time interval during which the scenario unfolds
        place: TYPE dul:Location // The primary location where the scenario takes place
        purpose: TYPE dul:Purpose // The overarching goal or motivation driving the scenario
        outcome: TYPE dul:Situation // The final result or state of the scenario (e.g., 'success', 'failure')
        participants: TYPE dul:CollectionOfObjects // A collection of all entities involved in the scenario
        constituentEvents: TYPE dul:CollectionOfEvents // A collection of primary events that make up the scenario
        constituentProcesses: TYPE dul:CollectionOfProcesses // A collection of primary processes that make up the scenario
        constituentStates: TYPE dul:CollectionOfStates // A collection of primary states relevant to the scenario

    USES_FRAME: // Scenarios typically "use" or are composed of other specific frames
        // List specific frames (Entity, Event, Process, State, Relation, Attribute)
        // that are conceptual components or recurrent elements within this scenario.
        // Example: USES_FRAME PerceptionEvent
        // Example: USES_FRAME BeliefState
        // Example: USES_FRAME Action

    COMMON_SENSE_RULES:
        // Inherent properties of scenarios
        IMPLIES: thisFrameInstance dul:occursAt thisFrameInstance dul:hasTime // A scenario unfolds within a temporal context.
        IMPLIES: thisFrameInstance dul:hasPart dul:Event OR thisFrameInstance dul:hasPart dul:Process // Scenarios are composed of events or processes.

        // Rules relating to common core and optional FEs (using generic 'thisFrameInstance' to refer to the current frame instance)
        RULE 1: IF (mainAgent EXISTS_AND_IS_A csp:CognitiveAgent) THEN (thisFrameInstance dul:hasAgent mainAgent)
        RULE 2: IF (mainTheme EXISTS_AND_IS_A dul:Object) THEN (thisFrameInstance dul:hasTheme mainTheme)
        RULE 3: IF (scenarioProcess EXISTS_AND_IS_A dul:Process) THEN (thisFrameInstance dul:hasPart scenarioProcess)
        RULE 4: IF (scenarioEvent EXISTS_AND_IS_A dul:Event) THEN (thisFrameInstance dul:hasPart scenarioEvent)

        RULE 5: IF (time EXISTS_AND_IS_A dul:TemporalInterval) THEN (thisFrameInstance dul:hasTime time)
        RULE 6: IF (place EXISTS_AND_IS_A dul:Location) THEN (thisFrameInstance dul:hasLocation place)
        RULE 7: IF (purpose EXISTS_AND_IS_A dul:Purpose) THEN (thisFrameInstance dul:hasPurpose purpose)
        RULE 8: IF (outcome EXISTS_AND_IS_A dul:Situation) THEN (thisFrameInstance dul:hasResult outcome)
        RULE 9: IF (participants EXISTS_AND_IS_A dul:CollectionOfObjects) THEN (thisFrameInstance dul:hasParticipants participants)

        // Rules defining temporal and causal sequences between constituent frames (the "dynamics")
        // These often use instances of the USES_FRAME concepts.
        // Example: A PerceptionEvent (P1) typically precedes a BeliefState (B1) which may trigger a DesireState (D1)
        RULE 10: TYPICALLY: EXISTS ?pe WHERE (?pe IS_A csp:PerceptionEvent AND ?pe csp:hasPerceiver mainAgent) THEN (?pe BEFORE ?b WHERE (?b IS_A csp:BeliefState AND ?b csp:hasBeliever mainAgent))
        RULE 11: TYPICALLY: IF (mainAgent csp:hasDesire ?desire AND ?desire csp:wantsState ?goal) THEN (mainAgent csp:initiatesPlanningFor ?goal) // Assuming csp:initiatesPlanningFor is a property

        // Rules reflecting CSP's BDI model (often expressed as complex SWRL rules)
        // Example: If an agent intends an action and preconditions are met, they perform the action.
        RULE 12: IF (mainAgent csp:intendsAction ?action AND ?precond dul:holdsAt (thisFrameInstance dul:hasStartingTime)) THEN (mainAgent dul:performs ?action DURING thisFrameInstance)

        // Rules for typical initiation or termination of the scenario
        // PRECONDITION: <InitialConditionsForScenario>
        // POSTCONDITION: <FinalStateOfScenario>
```

## 2. Explanation of Fields

- **`<FrameName>`:** The specific name of the scenario frame being defined (e.g., `Belief_State_Management_Scenario`, `Goal_Directed_Action_Scenario`, `Tourism_scenario`).
    
- **`DESCRIPTION`:** A concise natural language explanation of the frame.
    
- **`TYPE Scenario`:** Explicitly declares this frame as a `Scenario` type. In the OWL ontology, `Scenario` can be modeled as a subclass of `dul:CollectionOfEvents` or `dul:CollectionOfProcesses`, or a custom `dul:Situation` subclass representing a complex situation type.
    
- **`INHERITS_FROM`:** (Optional) Indicates if this specific `Scenario` frame is a sub-type of another, broader scenario. This enables a hierarchy of scenarios. This translates to `rdfs:subClassOf`.
    
- **`CORE_FEs:`:** Defines the essential FEs that represent the central "actors" or "processes" around which the scenario revolves. For scenarios, these might be the primary agent, theme, or the conceptual representation of the overarching process or event itself.
    
- **`OPTIONAL_FEs:`:** Lists commonly associated, but not strictly required, FEs that provide additional context about the scenario (its overall temporal and spatial scope, its driving purpose, or its ultimate outcome).
    
- **`USES_FRAME:`:** This is a crucial section for `Scenario` frames. It explicitly declares other, more specific FN3 frames (of any type: `Entity`, `Event`, `Process`, `State`, `Relation`, `Attribute`) that are conceptual components or recurrent sub-elements within this larger scenario. This helps model the compositional nature of scenarios.
    
- **`COMMON_SENSE_RULES:`:** Contains logical statements defining the inherent properties of the scenario and, critically, the **typical sequences, causal dependencies, preconditions, and postconditions** among its constituent frames and their FEs.
    
    - **`thisFrameInstance`**: This **special reference** is used universally across all frame types to refer to the _instance of the frame currently being defined_. For a `Scenario` frame, `thisFrameInstance` refers to the specific scenario instance. This maps directly to the instance of the frame class in the OWL ontology.
        
- **`COMMON_SENSE_RULES:`:** Contains logical statements defining the inherent properties of the scenario and, critically, the **typical sequences, causal dependencies, preconditions, and postconditions** among its constituent frames and their FEs.
    
    - This is where the "dynamics" of the scenario are captured using logical, temporal, and relational operators.
        
    - The rules often involve quantified statements (`EXISTS`, `ALL`) to relate different parts of the scenario.
        
    - References to properties from DUL and CSP are central to these rules (e.g., `dul:hasAgent`, `csp:hasControl`, `dul:causes`, `csp:intendsAction`).
        

## 3. Example Frame Definition: `Goal_Directed_Action_Scenario`

Here's an example of how the `Goal_Directed_Action_Scenario` (from `03-common_sense_scenarios.md`), which is a comprehensive `Scenario` type integrating many CSP concepts, might be defined using this template and the DSL.

```
FRAME Goal_Directed_Action_Scenario:
    DESCRIPTION "This overarching scenario models the complete commonsense sequence of an Agent engaging in purposeful behavior, from the initial formation of a Desire and setting of a Goal, through the development of an Intention and Plan, to the Execution of Actions to achieve that Goal, and the subsequent Effects on the Environment. It represents the full cycle of volitional change."
    TYPE Scenario

    CORE_FEs:
        agent: TYPE csp:CognitiveAgent // The central agent performing the goal-directed action

    OPTIONAL_FEs:
        goal: TYPE dul:Situation // The desired outcome or target state
        environment: TYPE csp:Environment // The context in which the action occurs and has effects
        outcome: TYPE dul:Situation // The success or failure of achieving the goal
        time: TYPE dul:TemporalInterval // The overall duration of the scenario
        place: TYPE dul:Location // The primary location for the scenario

    USES_FRAME:
        Motivation_and_Goal_Setting_Scenario // Provides the Goal and initial Desire
        Goal_Directed_Planning_Scenario // Provides the Plan and Intention
        Agentive_Behavior_Scenario // For the actual execution of Actions
        Belief_State_Management_Scenario // Influences and is influenced by all stages
        Causal_Event_Chain_Scenario // Describes the mechanism of effects
        Perceptual_Information_Acquisition_Scenario // For agent's perception of environment
        csp:Action // Specific actions
        csp:BeliefState // Beliefs held by the agent
        csp:DesireState // Desires held by the agent
        csp:IntentionState // Intentions held by the agent

    COMMON_SENSE_RULES:
        // Overall Goal-Directedness
        IMPLIES: thisFrameInstance dul:hasPurpose goal
        IMPLIES: thisFrameInstance dul:hasAgent agent

        // Sequence of sub-scenarios and their causal/temporal links
        // Rule 1: Motivation leads to Planning
        RULE 1: EXISTS ?motivationScenario WHERE (?motivationScenario IS_A Motivation_and_Goal_Setting_Scenario AND ?motivationScenario dul:hasAgent agent AND ?motivationScenario dul:hasResult goal) THEN (EXISTS ?planningScenario WHERE (?planningScenario IS_A Goal_Directed_Planning_Scenario AND ?planningScenario dul:hasAgent agent AND ?planningScenario plansForGoal goal AND ?planningScenario dul:occursAfter ?motivationScenario))

        // Rule 2: Planning leads to Action Execution
        RULE 2: EXISTS ?planningScenario WHERE (?planningScenario IS_A Goal_Directed_Planning_Scenario AND ?planningScenario dul:hasAgent agent AND ?planningScenario plansForGoal goal) THEN (EXISTS ?actionScenario WHERE (?actionScenario IS_A Agentive_Behavior_Scenario AND ?actionScenario dul:hasAgent agent AND ?actionScenario dul:hasPurpose goal AND ?actionScenario dul:occursAfter ?planningScenario))

        // Rule 3: Actions cause Effects on the Environment
        RULE 3: ALL ?actionInstance WHERE (?actionInstance IS_A csp:Action AND ?actionInstance dul:hasAgent agent AND ?actionInstance dul:occursDuring thisFrameInstance) THEN (EXISTS ?causalLink WHERE (?causalLink IS_A csp:CausalChainEvent AND ?causalLink dul:causes ?effectEvent AND ?causalLink dul:isCausedBy ?actionInstance AND ?effectEvent dul:affects environment))

        // Rule 4: Perception updates Beliefs, which can influence desires/intentions
        RULE 4: EXISTS ?perceptionEvent WHERE (?perceptionEvent IS_A csp:PerceptionEvent AND ?perceptionEvent csp:hasPerceiver agent AND ?perceptionEvent dul:occursDuring thisFrameInstance) THEN (EXISTS ?beliefState WHERE (?beliefState IS_A csp:BeliefState AND ?beliefState csp:hasBeliever agent AND ?beliefState csp:isBasedOn ?perceptionEvent AND ?beliefState dul:occursAfter ?perceptionEvent))

        // Rule 5: Beliefs influence Planning and Action
        RULE 5: IF (agent csp:hasBeliefState ?belief AND ?belief csp:hasBelievedProposition ?prop) THEN (agent csp:influencesPlanning ?prop) // Simplified for illustration

        // Preconditions and Postconditions for the entire scenario
        PRECONDITION: agent csp:hasDesire ?desire AND ?desire csp:wantsState goal AT thisFrameInstance dul:hasStartingTime
        POSTCONDITION: outcome EXISTS_AND_IS_A dul:Situation AFTER thisFrameInstance dul:hasFinishingTime
        TYPICALLY: IF (outcome IS_A dul:Success) THEN (goal dul:holdsTrue)
```

## 4. Conclusion and Future Steps

With the `Scenario` frame template now defined, we have completed the initial set of templates for all fundamental frame types in FN3: `Entity`, `Event`, `Process`, `State`, `Relation`, `Attribute`, and `Scenario`.

This collection of templates, in conjunction with the `FN3 Frame Definition DSL Manual` and the `Common Sense Psychology OWL Module`, provides a robust framework for formalizing frame semantics in FN3.

The next steps will involve:

- Reviewing these templates for clarity, completeness, and consistency.
    
- Developing detailed guidelines for mapping existing FrameNet Brasil frames (and creating new ones) to these templates.
    
- Further refining the `COMMON_SENSE_RULES` section of the DSL to cover more complex logical and temporal patterns, explicitly outlining their translation into OWL/SWRL.
    
- Beginning the development of tooling (parser, compiler) to automate the translation from DSL definitions to OWL ontologies.