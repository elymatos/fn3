# DSL Relational Operators: DUL/CSP Object Properties Documentation

This section details the relational operators available in the FN3 DSL, which directly map to `owl:ObjectProperty` definitions in the DOLCE+DnS UltraLite (DUL) and Common Sense Psychology (CSP) OWL modules. These operators form the core of common sense rules, allowing precise assertions about relationships between Frame Elements and other entities.

The general syntax for using these operators in DSL rules is: `<Subject_FE_or_Instance> <DUL/CSP_Property_Name> <Object_FE_or_Instance/Value>`

## 1. DUL Foundational Properties (Examples relevant for DSL)

These are general-purpose properties from the DUL ontology, fundamental for describing various kinds of relations.

### 1.1. `dul:hasAgent`

- **Syntax:** `<Event_Instance> dul:hasAgent <CognitiveAgent_FE>`
    
- **Semantics:** Links a `dul:Event` (or subclass like `csp:Action`) to the `dul:Agent` who performs it.
    
- **Example:** `thisFrameInstance dul:hasAgent agent` (within an Event frame)
    

### 1.2. `dul:hasTheme`

- **Syntax:** `<Event_Instance> dul:hasTheme <Object_FE>`
    
- **Semantics:** Links a `dul:Event` to the `dul:Object` that is affected by or is central to the event.
    
- **Example:** `thisFrameInstance dul:hasTheme theme` (within an Event frame)
    

### 1.3. `dul:hasPatient`

- **Syntax:** `<Event_Instance> dul:hasPatient <Object_FE>`
    
- **Semantics:** Links a `dul:Event` to the `dul:Object` that undergoes a change due to the event.
    
- **Example:** `thisFrameInstance dul:hasPatient patient` (within an Event or Process frame)
    

### 1.4. `dul:hasExperiencer`

- **Syntax:** `<Event_Instance> dul:hasExperiencer <CognitiveAgent_FE>`
    
- **Semantics:** Links a `dul:Event` to the `dul:Agent` who has an internal experience (e.g., emotion, perception) as a result of or during the event.
    
- **Example:** `thisFrameInstance dul:hasExperiencer experiencer` (within an Event frame like `Stimulate_emotion`)
    

### 1.5. `dul:hasResult`

- **Syntax:** `<Event/Process_Instance> dul:hasResult <Situation_FE>`
    
- **Semantics:** Links a `dul:Event` or `dul:Process` to the `dul:Situation` (event or state) that is the direct outcome or consequence.
    
- **Example:** `thisFrameInstance dul:hasResult result` (within an Event or Process frame)
    

### 1.6. `dul:isCausedBy`

- **Syntax:** `<Situation_Instance> dul:isCausedBy <Cause_FE>`
    
- **Semantics:** Indicates that a `dul:Situation` (event, process, or state) is brought about by another `dul:Situation` (the cause). This is the inverse of `dul:causes`.
    
- **Example:** `thisFrameInstance dul:isCausedBy cause` (within an Event or Process frame)
    

### 1.7. `dul:causes`

- **Syntax:** `<Cause_FE> dul:causes <Effect_Situation_Instance>`
    
- **Semantics:** Indicates that a `dul:Situation` (the cause) brings about another `dul:Situation` (the effect). This is the inverse of `dul:isCausedBy`.
    
- **Example:** `cause dul:causes thisFrameInstance` (less common as direct statement, usually implied by `dul:isCausedBy` on the effect). More directly: `action dul:causes effectEvent` (within a Causal_Event_Chain_Scenario rule).
    

### 1.8. `dul:holdsFor`

- **Syntax:** `<State_Instance> dul:holdsFor <Entity_FE>`
    
- **Semantics:** Links a `dul:State` to the `dul:Object` that possesses the state or is in the condition.
    
- **Example:** `thisFrameInstance dul:holdsFor entity` (within a State or Attribute frame)
    

### 1.9. `dul:expressesQuality`

- **Syntax:** `<Entity_or_Situation_Instance> dul:expressesQuality <Quality_FE>`
    
- **Semantics:** Links an `dul:Object` or `dul:Situation` to a `dul:Quality` that it manifests or represents.
    
- **Example:** `thisFrameInstance dul:expressesQuality attribute` (within an Attribute frame)
    
- **Example (for a state quality):** `thisFrameInstance dul:expressesQuality dul:FullnessQuality` (within a State frame)
    

### 1.10. `dul:hasQuality`

- **Syntax:** `<Entity_or_Situation_Instance> dul:hasQuality <Quality_FE/Class>`
    
- **Semantics:** Links an `dul:Object` or `dul:Situation` to a `dul:Quality` it possesses. This is a very general property used for many attributes or characteristics.
    
- **Example:** `thisFrameInstance dul:hasQuality dul:Existence` (within an Entity frame for its inherent property)
    
- **Example (for agent constraint):** `agent HAS_PROPERTY INTENTIONAL true` (maps to `agent dul:hasQuality dul:Intentional`)
    

### 1.11. `dul:occursAt`

- **Syntax:** `<Situation_Instance> dul:occursAt <TemporalInterval_FE/Location_FE>`
    
- **Semantics:** Links a `dul:Situation` (event, process, state, relation, scenario) to the `dul:TemporalInterval` or `dul:Location` where it takes place.
    
- **Example:** `thisFrameInstance dul:occursAt time` (within any temporal frame type)
    
- **Example:** `thisFrameInstance dul:occursAt place` (within any spatial frame type)
    

### 1.12. `dul:hasStartingTime`

- **Syntax:** `<Situation_Instance> dul:hasStartingTime <TemporalPoint_FE>`
    
- **Semantics:** Links a `dul:Situation` to the `dul:TemporalPoint` at which it begins.
    
- **Example:** `thisFrameInstance dul:hasStartingTime startTime`
    

### 1.13. `dul:hasFinishingTime`

- **Syntax:** `<Situation_Instance> dul:hasFinishingTime <TemporalPoint_FE>`
    
- **Semantics:** Links a `dul:Situation` to the `dul:TemporalPoint` at which it ends.
    
- **Example:** `thisFrameInstance dul:hasFinishingTime endTime`
    

### 1.14. `dul:hasDuration`

- **Syntax:** `<Situation_Instance> dul:hasDuration <Duration_FE>`
    
- **Semantics:** Links a `dul:Situation` to its `dul:Duration` (temporal extent).
    
- **Example:** `thisFrameInstance dul:hasDuration duration` (within Process, State, Scenario frames)
    

### 1.15. `dul:hasLocation`

- **Syntax:** `<Object_or_Situation_Instance> dul:hasLocation <Location_FE>`
    
- **Semantics:** Links an `dul:Object` or `dul:Situation` to its `dul:Location`.
    
- **Example:** `thisFrameInstance dul:hasLocation place` (within Entity, Event, Process, State, Scenario frames)
    

### 1.16. `dul:hasPurpose`

- **Syntax:** `<Agent_or_Situation_Instance> dul:hasPurpose <Purpose_FE>`
    
- **Semantics:** Links an `dul:Agent` or a `dul:Situation` to its `dul:Purpose` or goal.
    
- **Example:** `thisFrameInstance dul:hasPurpose purpose` (within Event, Process, Scenario frames)
    

### 1.17. `dul:hasParticipant`

- **Syntax:** `<Situation_Instance> dul:hasParticipant <Object_FE>`
    
- **Semantics:** A general property linking a `dul:Situation` to any `dul:Object` that is involved in it.
    
- **Example:** `thisFrameInstance dul:hasParticipant entity1` (within Relation frame)
    
- **Example (for collection):** `thisFrameInstance dul:hasParticipants entities` (within Relation frame for symmetric relations)
    

### 1.18. `dul:isPropertyOf`

- **Syntax:** `<Object_FE> dul:isPropertyOf <Agent_FE>`
    
- **Semantics:** Indicates that a `dul:Object` is a property of a `dul:Agent` (e.g., possession). This is a general DUL property, not specific to ownership.
    
- **Example:** `theme dul:isPropertyOf agent` (within Abandonment frame common sense rules)
    

### 1.19. `dul:isCreatedBy`

- **Syntax:** `<Object_FE> dul:isCreatedBy <Agent_FE>`
    
- **Semantics:** Indicates that a `dul:Object` was created by a `dul:Agent`.
    
- **Example:** `thisFrameInstance dul:isCreatedBy creator` (within an Entity frame)
    

### 1.20. `dul:isUsedFor`

- **Syntax:** `<Object_FE> dul:isUsedFor <Event_FE>`
    
- **Semantics:** Indicates that a `dul:Object` is used for a particular `dul:Event` or `dul:Purpose`.
    
- **Example:** `thisFrameInstance dul:isUsedFor csp:Action` (within a Weapon frame)
    

## 2. CSP Specific Properties

These properties are defined in the `csp_dul_module` and specialize DUL's general relations for Common Sense Psychology concepts.

### 2.1. `csp:hasBeliever`

- **Syntax:** `<BeliefState_Instance> csp:hasBeliever <CognitiveAgent_FE>`
    
- **Semantics:** Links a `csp:BeliefState` to the `csp:CognitiveAgent` who holds the belief.
    
- **Example:** `beliefState csp:hasBeliever agent`
    

### 2.2. `csp:hasBelievedProposition`

- **Syntax:** `<BeliefState_Instance> csp:hasBelievedProposition <Proposition_FE>`
    
- **Semantics:** Links a `csp:BeliefState` to the `csp:Proposition` that is believed.
    
- **Example:** `beliefState csp:hasBelievedProposition proposition`
    

### 2.3. `csp:isBasedOn`

- **Syntax:** `<BeliefState_Instance> csp:isBasedOn <InformationEntity_FE>`
    
- **Semantics:** Links a `csp:BeliefState` to the `dul:InformationEntity` (e.g., evidence, perception) upon which it is based.
    
- **Example:** `beliefState csp:isBasedOn perceptionEvent`
    

### 2.4. `csp:hasDesirer`

- **Syntax:** `<DesireState_Instance> csp:hasDesirer <CognitiveAgent_FE>`
    
- **Semantics:** Links a `csp:DesireState` to the `csp:CognitiveAgent` who holds the desire.
    
- **Example:** `desireState csp:hasDesirer agent`
    

### 2.5. `csp:wantsState`

- **Syntax:** `<DesireState_Instance> csp:wantsState <DesiredStateOfAffairs_FE>`
    
- **Semantics:** Links a `csp:DesireState` to the `csp:DesiredStateOfAffairs` that is wanted.
    
- **Example:** `desireState csp:wantsState goal`
    

### 2.6. `csp:hasIntender`

- **Syntax:** `<IntentionState_Instance> csp:hasIntender <CognitiveAgent_FE>`
    
- **Semantics:** Links a `csp:IntentionState` to the `csp:CognitiveAgent` who holds the intention.
    
- **Example:** `intentionState csp:hasIntender agent`
    

### 2.7. `csp:intendsAction`

- **Syntax:** `<IntentionState_Instance> csp:intendsAction <IntendedEvent_FE>`
    
- **Semantics:** Links a `csp:IntentionState` to the `csp:IntendedEvent` (action or state of affairs) that the agent commits to bringing about.
    
- **Example:** `intentionState csp:intendsAction action`
    

### 2.8. `csp:triggeredBy`

- **Syntax:** `<EmotionalState_Instance> csp:triggeredBy <Situation_FE>`
    
- **Semantics:** Links an `csp:EmotionalState` to the `dul:Situation` or entity that causes or triggers it.
    
- **Example:** `emotionalState csp:triggeredBy stimulus`
    

### 2.9. `csp:hasEmotionalValence`

- **Syntax:** `<EmotionalState_Instance> csp:hasEmotionalValence <EmotionalValenceValue_FE>`
    
- **Semantics:** Links an `csp:EmotionalState` to its emotional valence (e.g., positive, negative, neutral).
    
- **Example:** `emotionalState csp:hasEmotionalValence csp:PositiveValence` (assuming `csp:PositiveValence` is an instance of `csp:EmotionalValenceValue`).
    

### 2.10. `csp:causesAction`

- **Syntax:** `<MentalState_Instance> csp:causesAction <Action_FE>`
    
- **Semantics:** Indicates that a `csp:MentalState` (desire, intention, emotion) can cause a `csp:Action` by a `csp:CognitiveAgent`. It is a sub-property of `dul:causes`.
    
- **Example:** `desireState csp:causesAction action`
    

### 2.11. `csp:perceivesPhenomenon`

- **Syntax:** `<PerceptionEvent_Instance> csp:perceivesPhenomenon <Situation_FE>`
    
- **Semantics:** Links a `csp:PerceptionEvent` to the `dul:Situation` or entity that is perceived.
    
- **Example:** `perceptionEvent csp:perceivesPhenomenon phenomenon`
    

### 2.12. `csp:leadsToBelief`

- **Syntax:** `<PerceptionEvent_Instance> csp:leadsToBelief <BeliefState_Instance>`
    
- **Semantics:** Indicates that a `csp:PerceptionEvent` can cause a `csp:BeliefState` in the perceiver. It is a sub-property of `dul:causes`.
    
- **Example:** `perceptionEvent csp:leadsToBelief newBelief`
    

### 2.13. `csp:hasCommunicator`

- **Syntax:** `<CommunicationEvent_Instance> csp:hasCommunicator <CognitiveAgent_FE>`
    
- **Semantics:** Links a `csp:CommunicationEvent` to the `csp:CognitiveAgent` who initiates the communication.
    
- **Example:** `thisFrameInstance csp:hasCommunicator speaker`
    

### 2.14. `csp:hasRecipient`

- **Syntax:** `<CommunicationEvent_Instance> csp:hasRecipient <CognitiveAgent_FE>`
    
- **Semantics:** Links a `csp:CommunicationEvent` to the `csp:CognitiveAgent` who is the intended recipient.
    
- **Example:** `thisFrameInstance csp:hasRecipient addressee`
    

### 2.15. `csp:hasMessage`

- **Syntax:** `<CommunicationEvent_Instance> csp:hasMessage <Proposition_FE>`
    
- **Semantics:** Links a `csp:CommunicationEvent` to the `csp:Proposition` that is conveyed.
    
- **Example:** `thisFrameInstance csp:hasMessage messageContent`
    

### 2.16. `csp:hasPlanner`

- **Syntax:** `<PlanningProcess_Instance> csp:hasPlanner <CognitiveAgent_FE>`
    
- **Semantics:** Links a `csp:PlanningProcess` to the `csp:CognitiveAgent` who is performing the planning.
    
- **Example:** `thisFrameInstance csp:hasPlanner planner`
    

### 2.17. `csp:plansForGoal`

- **Syntax:** `<PlanningProcess_Instance> csp:plansForGoal <Situation_FE>`
    
- **Semantics:** Links a `csp:PlanningProcess` to the ultimate `dul:Situation` that is the goal of the plan.
    
- **Example:** `thisFrameInstance csp:plansForGoal desiredOutcome`
    

### 2.18. `csp:hasPlanStep`

- **Syntax:** `<PlanningProcess_Instance> csp:hasPlanStep <Event_FE>`
    
- **Semantics:** Links a `csp:PlanningProcess` to an individual `dul:Event` that is a step in the plan.
    
- **Example:** `thisFrameInstance csp:hasPlanStep actionStep`
    

### 2.19. `csp:hasObligatedParty`

- **Syntax:** `<Situation_Instance> csp:hasObligatedParty <CognitiveAgent_FE>`
    
- **Semantics:** Links a situation of obligation to the `csp:CognitiveAgent` who is obligated.
    
- **Example:** `obligationState csp:hasObligatedParty obligatedAgent`
    

### 2.20. `csp:hasObligatedAction`

- **Syntax:** `<Situation_Instance> csp:hasObligatedAction <Action_FE>`
    
- **Semantics:** Links a situation of obligation to the `csp:Action` that the party is obligated to perform.
    
- **Example:** `obligationState csp:hasObligatedAction committedAction`
    

### 2.21. `csp:influencesBelief`

- **Syntax:** `<Situation_Instance> csp:influencesBelief <BeliefState_Instance>`
    
- **Semantics:** Indicates that a `dul:Situation` (e.g., communication, perception) can influence a `csp:BeliefState`. It is a sub-property of `dul:influences`.
    
- **Example:** `communicationEvent csp:influencesBelief recipientBelief`
    

### 2.22. `csp:influencesDesire`

- **Syntax:** `<Situation_Instance> csp:influencesDesire <DesireState_Instance>`
    
- **Semantics:** Indicates that a `dul:Situation` can influence a `csp:DesireState`. It is a sub-property of `dul:influences`.
    
- **Example:** `event dul:influencesDesire agentDesire`
    

### 2.23. `csp:influencesIntention`

- **Syntax:** `<Situation_Instance> csp:influencesIntention <IntentionState_Instance>`
    
- **Semantics:** Indicates that a `dul:Situation` can influence a `csp:IntentionState`. It is a sub-property of `dul:influences`.
    
- **Example:** `event dul:influencesIntention agentIntention`