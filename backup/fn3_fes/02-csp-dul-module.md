# Common Sense Psychology (CSP) OWL Module Documentation

This document provides a detailed overview of the Common Sense Psychology (CSP) OWL module. This module formalizes core concepts from Andrew S. Gordon and Jerry R. Hobbs' theory of Common Sense Psychology and integrates them with the DOLCE+DnS UltraLite (DUL) top-level ontology. This integration serves as a foundational layer for FrameNet Brasil (FN3), enabling robust semantic representation and inference.

**Namespace:** `csp: <http://www.fn3.org/ontologies/csp#>`

**Imports:** `dul: <http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#>`

## 1. Overview

The CSP module aims to computationally model the implicit understanding humans have about mental states and processes. By extending DUL, it provides a formal basis for representing cognitive agents, their internal states (beliefs, desires, intentions, emotions), and their interactions with the environment through actions, perception, and communication.

## 2. Classes

The following classes define the fundamental entities and concepts within the Common Sense Psychology domain, relating them hierarchically to DUL's upper-level categories.

### 2.1. Core CSP Agents and Mental States

- **`csp:CognitiveAgent`**
    
    - **SubClassOf:** `dul:Agent`
        
    - **Description:** Represents an agent that possesses cognitive capabilities, including the ability to hold beliefs, desires, and intentions, and to perceive and act. This specializes the general notion of an `dul:Agent` to those with mental faculties.
        
- **`csp:MentalState`**
    
    - **SubClassOf:** `dul:State`
        
    - **Description:** A general category for any internal condition or disposition of a `csp:CognitiveAgent`. It is a `dul:State` that exists within the mind or cognitive system of an agent.
        
- **`csp:BeliefState`**
    
    - **SubClassOf:** `csp:MentalState`
        
    - **Description:** A specific `csp:MentalState` where a `csp:CognitiveAgent` holds a `csp:Proposition` to be true as part of their internal model of the world.
        
- **`csp:DesireState`**
    
    - **SubClassOf:** `csp:MentalState`
        
    - **Description:** A `csp:MentalState` where a `csp:CognitiveAgent` wishes for a `csp:DesiredStateOfAffairs` to be true. This represents the agent's motivational drive for a particular outcome.
        
- **`csp:IntentionState`**
    
    - **SubClassOf:** `csp:MentalState`
        
    - **Description:** A `csp:MentalState` where a `csp:CognitiveAgent` commits to performing a `csp:IntendedEvent` to achieve a desired outcome. It signifies a stronger commitment than mere desire, bridging motivation with action.
        
- **`csp:EmotionalState`**
    
    - **SubClassOf:** `csp:MentalState`
        
    - **Description:** A `csp:MentalState` reflecting an agent's affective response to a situation, often triggered by beliefs or desires.
        
- **`csp:Proposition`**
    
    - **SubClassOf:** `dul:Proposition`
        
    - **Description:** A unit of information or a statement about a state of affairs that can be believed, known, or communicated. It serves as the content for various mental states.
        
- **`csp:KnownProposition`**
    
    - **SubClassOf:** `csp:Proposition`
        
    - **Description:** A `csp:Proposition` that is not only believed by an agent but is also objectively true (within the defined reality of the system). This distinguishes knowledge from mere belief.
        
- **`csp:DesiredStateOfAffairs`**
    
    - **SubClassOf:** `dul:Situation`
        
    - **Description:** A `dul:Situation` or state of the world that a `csp:CognitiveAgent` desires to be true. This is the target of a desire.
        
- **`csp:IntendedEvent`**
    
    - **SubClassOf:** `dul:Event`
        
    - **Description:** A `dul:Event` that a `csp:CognitiveAgent` commits to bringing about as part of their intention. This is the specific action or occurrence that is the object of an intention.
        

### 2.2. CSP Events and Processes

- **`csp:Action`**
    
    - **SubClassOf:** `dul:Action` (which is a `dul:Event` performed by a `dul:Agent`)
        
    - **Description:** A `dul:Event` caused by a `csp:CognitiveAgent`, typically performed with an intention to achieve a desired outcome. This represents volitional behavior in the world.
        
- **`csp:PerceptionEvent`**
    
    - **SubClassOf:** `dul:Event`
        
    - **Description:** A `dul:Event` in which a `csp:CognitiveAgent` directly acquires information about the state of the world through sensory input. It is the primary means of forming beliefs about the environment.
        
- **`csp:CommunicationEvent`**
    
    - **SubClassOf:** `dul:Event`
        
    - **Description:** A `dul:Event` where a `csp:CognitiveAgent` transmits a `csp:Proposition` (message) to another agent, usually with the intention of influencing their beliefs or actions.
        
- **`csp:PlanningProcess`**
    
    - **SubClassOf:** `dul:Process` (which is a `dul:Event` with phases/duration)
        
    - **Description:** A `csp:CognitiveAgent`'s mental `dul:Process` of constructing a sequence of `csp:Actions` believed to lead to a desired future state.
        
- **`csp:CausalChainEvent`**
    
    - **SubClassOf:** `dul:Event`
        
    - **Description:** A `dul:Event` that represents a link in a chain of causation, where one event or state brings about another. This is for modeling the flow of causality in the world.
        

### 2.3. Other CSP-Related Concepts

- **`csp:Environment`**
    
    - **SubClassOf:** `dul:Object`
        
    - **Description:** The external physical and social context in which a `csp:CognitiveAgent` operates and interacts.
        
- **`csp:SecurityStatus`**
    
    - **SubClassOf:** `dul:Quality`
        
    - **Description:** A `dul:Quality` representing the degree of protection or vulnerability of an object or situation.
        
- **`csp:CompromisedSecurity`**
    
    - **SubClassOf:** `csp:SecurityStatus`
        
    - **Description:** A `csp:SecurityStatus` indicating a state of reduced or lost security.
        
- **`csp:EmotionalValenceValue`**
    
    - **SubClassOf:** `dul:Quality`
        
    - **Description:** A `dul:Quality` representing the positive, negative, or neutral character of an emotion.
        

## 3. Object Properties

Object properties define the relationships between individuals (instances) of the classes. These properties capture the relational aspects of Common Sense Psychology.

### 3.1. Properties for Beliefs

- **`csp:hasBeliever`**
    
    - **Domain:** `csp:BeliefState`
        
    - **Range:** `csp:CognitiveAgent`
        
    - **Description:** Links a `csp:BeliefState` to the `csp:CognitiveAgent` who holds the belief.
        
- **`csp:hasBelievedProposition`**
    
    - **Domain:** `csp:BeliefState`
        
    - **Range:** `csp:Proposition`
        
    - **Description:** Links a `csp:BeliefState` to the `csp:Proposition` that is believed.
        
- **`csp:isBasedOn`**
    
    - **Domain:** `csp:BeliefState`
        
    - **Range:** `dul:InformationEntity` (or `dul:Event` for direct observation)
        
    - **Description:** Links a `csp:BeliefState` to the `dul:InformationEntity` (e.g., evidence, perception) upon which it is based.
        

### 3.2. Properties for Desires

- **`csp:hasDesirer`**
    
    - **Domain:** `csp:DesireState`
        
    - **Range:** `csp:CognitiveAgent`
        
    - **Description:** Links a `csp:DesireState` to the `csp:CognitiveAgent` who holds the desire.
        
- **`csp:wantsState`**
    
    - **Domain:** `csp:DesireState`
        
    - **Range:** `csp:DesiredStateOfAffairs`
        
    - **Description:** Links a `csp:DesireState` to the `csp:DesiredStateOfAffairs` that is wanted.
        

### 3.3. Properties for Intentions

- **`csp:hasIntender`**
    
    - **Domain:** `csp:IntentionState`
        
    - **Range:** `csp:CognitiveAgent`
        
    - **Description:** Links a `csp:IntentionState` to the `csp:CognitiveAgent` who holds the intention.
        
- **`csp:intendsAction`**
    
    - **Domain:** `csp:IntentionState`
        
    - **Range:** `csp:IntendedEvent`
        
    - **Description:** Links a `csp:IntentionState` to the `csp:IntendedEvent` (action or state of affairs) that the agent commits to bringing about.
        

### 3.4. Properties for Emotions

- **`csp:hasExperiencer`**
    
    - **Domain:** `csp:EmotionalState`
        
    - **Range:** `csp:CognitiveAgent`
        
    - **Description:** Links an `csp:EmotionalState` to the `csp:CognitiveAgent` experiencing it.
        
- **`csp:triggeredBy`**
    
    - **Domain:** `csp:EmotionalState`
        
    - **Range:** `dul:Situation` (can be an event, state, or object/proposition)
        
    - **Description:** Links an `csp:EmotionalState` to the `dul:Situation` or entity that causes or triggers it.
        
- **`csp:hasEmotionalValence`**
    
    - **Domain:** `csp:EmotionalState`
        
    - **Range:** `csp:EmotionalValenceValue`
        
    - **Description:** Links an `csp:EmotionalState` to its emotional valence (e.g., positive, negative, neutral).
        
- **`csp:causesAction`**
    
    - **SubPropertyOf:** `dul:causes`
        
    - **Domain:** `csp:MentalState` (more general, can be desire, intention, emotion)
        
    - **Range:** `csp:Action`
        
    - **Description:** Indicates that a `csp:MentalState` can cause a `csp:Action` by a `csp:CognitiveAgent`.
        

### 3.5. Properties for Perception

- **`csp:hasPerceiver`**
    
    - **Domain:** `csp:PerceptionEvent`
        
    - **Range:** `csp:CognitiveAgent`
        
    - **Description:** Links a `csp:PerceptionEvent` to the `csp:CognitiveAgent` who perceives.
        
- **`csp:perceivesPhenomenon`**
    
    - **Domain:** `csp:PerceptionEvent`
        
    - **Range:** `dul:Situation` (can be a `dul:Object`, `dul:Event`, or `dul:State`)
        
    - **Description:** Links a `csp:PerceptionEvent` to the `dul:Situation` or entity that is perceived.
        
- **`csp:leadsToBelief`**
    
    - **SubPropertyOf:** `dul:causes`
        
    - **Domain:** `csp:PerceptionEvent`
        
    - **Range:** `csp:BeliefState`
        
    - **Description:** Indicates that a `csp:PerceptionEvent` can cause a `csp:BeliefState` in the perceiver.
        

### 3.6. Properties for Communication

- **`csp:hasCommunicator`**
    
    - **Domain:** `csp:CommunicationEvent`
        
    - **Range:** `csp:CognitiveAgent`
        
    - **Description:** Links a `csp:CommunicationEvent` to the `csp:CognitiveAgent` who initiates the communication.
        
- **`csp:hasRecipient`**
    
    - **Domain:** `csp:CommunicationEvent`
        
    - **Range:** `csp:CognitiveAgent`
        
    - **Description:** Links a `csp:CommunicationEvent` to the `csp:CognitiveAgent` who is the intended recipient.
        
- **`csp:hasMessage`**
    
    - **Domain:** `csp:CommunicationEvent`
        
    - **Range:** `csp:Proposition`
        
    - **Description:** Links a `csp:CommunicationEvent` to the `csp:Proposition` that is conveyed.
        

### 3.7. Properties for Planning

- **`csp:hasPlanner`**
    
    - **Domain:** `csp:PlanningProcess`
        
    - **Range:** `csp:CognitiveAgent`
        
    - **Description:** Links a `csp:PlanningProcess` to the `csp:CognitiveAgent` who is performing the planning.
        
- **`csp:plansForGoal`**
    
    - **Domain:** `csp:PlanningProcess`
        
    - **Range:** `dul:Situation`
        
    - **Description:** Links a `csp:PlanningProcess` to the ultimate `dul:Situation` that is the goal of the plan.
        
- **`csp:hasPlanStep`**
    
    - **Domain:** `csp:PlanningProcess`
        
    - **Range:** `dul:Event`
        
    - **Description:** Links a `csp:PlanningProcess` to an individual `dul:Event` that is a step in the plan.
        

### 3.8. Properties for Social Interaction and Obligation

- **`csp:hasObligatedParty`**
    
    - **Domain:** `dul:Situation` (e.g., a `csp:ObligationState` or an event that creates obligation)
        
    - **Range:** `csp:CognitiveAgent`
        
    - **Description:** Links a situation of obligation to the `csp:CognitiveAgent` who is obligated.
        
- **`csp:hasObligatedAction`**
    
    - **Domain:** `dul:Situation` (e.g., a `csp:ObligationState` or an event that creates obligation)
        
    - **Range:** `csp:Action`
        
    - **Description:** Links a situation of obligation to the `csp:Action` that the party is obligated to perform.
        
- **`csp:influencesBelief`**
    
    - **SubPropertyOf:** `dul:influences`
        
    - **Domain:** `dul:Situation`
        
    - **Range:** `csp:BeliefState`
        
    - **Description:** Indicates that a `dul:Situation` (e.g., communication, perception) can influence a `csp:BeliefState`.
        
- **`csp:influencesDesire`**
    
    - **SubPropertyOf:** `dul:influences`
        
    - **Domain:** `dul:Situation`
        
    - **Range:** `csp:DesireState`
        
    - **Description:** Indicates that a `dul:Situation` can influence a `csp:DesireState`.
        
- **`csp:influencesIntention`**
    
    - **SubPropertyOf:** `dul:influences`
        
    - **Domain:** `dul:Situation`
        
    - **Range:** `csp:IntentionState`
        
    - **Description:** Indicates that a `dul:Situation` can influence a `csp:IntentionState`.
        

## 4. Axioms (Explanatory Comments)

The core logical relationships and inferences of Common Sense Psychology are expressed through OWL axioms. For complex rules involving conditional logic or property chains, SWRL (Semantic Web Rule Language) would be used in a complete implementation. The following are explanatory comments illustrating these intended axioms:

- **Knowledge implies Belief:**
    
    - If an entity is a `csp:KnownProposition` (i.e., known to be true), then any `csp:BeliefState` having that entity as its `csp:hasBelievedProposition` is also a `csp:BeliefState`. This means `knowledge` is a stronger form of `belief`.
        
- **Intention implies Desire:**
    
    - If a `csp:CognitiveAgent` holds an `csp:IntentionState` to perform an `csp:IntendedEvent`, it is inferred that the same `csp:CognitiveAgent` also holds a `csp:DesireState` for that `csp:IntendedEvent` to occur.
        
- **Perception leads to Belief:**
    
    - If a `csp:CognitiveAgent` participates in a `csp:PerceptionEvent` where they `perceivesPhenomenon`, then a `csp:BeliefState` is formed in that `csp:CognitiveAgent` regarding the perceived `dul:Situation` as a `csp:Proposition`.
        
- **Actions are caused by Intentions:**
    
    - An `csp:Action` performed by a `csp:CognitiveAgent` is often (though not exclusively) directly caused by an `csp:IntentionState` held by that agent.
        
- **Communication changes Beliefs:**
    
    - When a `csp:CommunicationEvent` occurs, and a `csp:CognitiveAgent` acts as the `csp:hasRecipient` of a `csp:hasMessage` (a `csp:Proposition`), then a `csp:BeliefState` is formed in the recipient agent regarding the content of that message.