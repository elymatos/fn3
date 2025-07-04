# Scenarios

## A Framework for scenarios development

A framework was developed to create **scenarios** for each subdomain of a cognitive ontology that models human knowledge and perception across 9 fundamental domains and 46 subdomains. Each scenario represents a group of related concepts (ontological elements - OE) that model specific aspects of reality within cognitive boundaries.

## Theoretical Motivation

### Cognitive Bias Approach

The ontology adopts a **cognitive bias** rather than epistemological approach, focusing on:

- How humans perceive, categorize, and understand concepts
- First-person human experience and folk knowledge
- Cultural sensitivity while identifying universal cognitive patterns
- Practical modeling of human behavior, decision-making, and social interaction

### Scenario Purpose

Each scenario serves as a **micro-ontology** that:

- Captures cognitive patterns within specific conceptual spaces
- Demonstrates how humans naturally categorize and reason about concepts
- Illustrates boundaries and relationships between subdomains
- Provides concrete examples for formal ontological development

## Framework Structure

### Core Components

#### 1. Dual-Level Analysis

- **Cognitive Narrative Level**: Realistic short stories showing natural human cognition to illustrate the scenario
- **Formal Ontological Level**: Ontological Elements must be mapped to DUL ontology. Each element must be classified informally using five types, and this types maps to DUL ontology:
    - **@entity**: Objects (physical, social, mental), agents, artifacts, concepts. Mainly related to DUL Object and Abstract classes and subclasses.
    - **@event**: Dynamic situations involving change over time.Mainly related to DUL Event class and subclasses.
    - **@state**: Static conditions or properties without inherent change. Main related to DUL Event and Situation classes and subclasses.
    - **@quality**: Attributes, properties or characteristics of entities/event/states. Mainly related to DUL Quality class.
    - **@relation**: Connections between entities/events/states. It includes relations of type: part-whole, causal, temporal, spatial, functional, social, cognitive, etc. Mainly related to DUL Relation class and subclasses.
##### 1.1. Distinguishing @state from @quality

A `Quality` is a property or attribute that inheres in an `Entity` or `Situation` (Event/Process/State) at a specific point in time or over a duration, but _does not inherently imply change or duration itself_. Qualities describe _what something is like_ or _what characteristics it possesses_. They are attributes that can be predicated of something.

1. **Inherence:** A `Quality` must inhere in something else (an `Entity`, `Event`, `Process`, or `State`). It cannot exist independently. For instance, 'red' inheres in a 'ball'; 'intensity' inheres in an 'emotion'.
2. **Lack of Intrinsic Temporal Dynamics:** While a quality can _change_ over time (e.g., something can become 'redder'), the quality itself (e.g., 'redness') does not _unfold_ or _progress_ through time in the way an event or process does. It is a snapshot-like descriptor.
3. **Measurability/Gradability (often, but not exclusively):** Many qualities are gradable (e.g., 'very hard', 'slightly soft') or measurable (e.g., 'weight', 'temperature'). This is a strong indicator, but not a strict requirement (e.g., 'broken' as a quality might not be easily gradable in all contexts).
4. **Descriptive Function:** Its primary role is to describe an inherent characteristic, property, or attribute of something.

A `State` is a `Situation` that _persists_ over some duration without internal transition or inherent unfolding from one phase to another. It describes a static condition, configuration, or status of an entity or set of entities. Unlike an `Event` or `Process`, a state does not inherently describe a _change_ or an _activity_. However, a state _can_ change, and the change from one state to another would be an `Event` or `Process`.

1. **Persistence over Duration:** A `State` is characterized by its duration, during which its defining conditions remain constant. It is not instantaneous like some `Events`.
2. **Lack of Intrinsic Dynamics/Internal Transition:** A state does not involve an inherent progression or internal activity. It is a stable condition, even if it is temporary. The _beginning_ or _end_ of a state, or the _transition_ between states, would be an `Event` or `Process`.
3. **Cognitive Stability:** Cognitively, states are understood as relatively stable configurations of entities and their relationships.
4. **Result of a Process/Event (often):** Many states are the result or outcome of an `Event` or `Process` (e.g., `Agreement` resulting from `Negotiation`; `ProblemResolution` resulting from `SolutionSteps`).

#### 2. Ontological Elements Classification

An **Ontological Element**  is a **contextual ontological unit**, representing an entity, event, state, quality or relation in the specific semantic context of a scenario. Each Ontological Element:
     - It exists only inside a scenario.
     - It is interpreted and defined by the network of relations and roles in that scenario,
    - It can have the same name of Ontological Elements from other scenarios but it is semantically distinct. To make this distinction explict, Ontological Elements follow the namimg convention:  
        **`<scenario_name>:<element_name>`**.
        
In the framework, Ontological Elements (OE) are identified as:
- **General concept types** (person, liquid, tool)
- **Classified by generic ontological type** (@entity, @event, @state, @quality, @relation)
- **Classified by specific DUL ontological type** when possible
- **Connected through explicit relations** formalized by DUL object properties.

#### 3. Multiple Scenarios per Subdomain

Each subdomain requires multiples scenarios covering different aspects to ensure comprehensive coverage and validation.

### Scenario Template Structure

```
Subdomain: [Name]
Domain: [Parent Domain]

Scenario X: [Aspect Focus]
Description: Generic definition using #ElementNames
Elements: [List with ontological type classification]
Relations: [Natural language relationship expressions]
Boundary Illustrations: [Distinctions from related subdomains]
```
As a general rule, the description for a scenario the following structure, being adapted, shortened or extended, to each specific subdomain:

> "In this scenario, a #Participant1 acts or undergoes a #Process or #Event, with the participation of #Participant2, in a #Background context, motivated by a  #Cause or intending a #Goal. In general, the process results in a #Result."
## Implementation Criteria

### 1. Cross-Boundary Integration

- Scenarios can reference elements from other scenarios
- Demonstrates subdomain interactions and dependencies
- Shows cognitive connections across domains

### 2. Natural Language Relations

- Relations expressed in human-readable format
- Will be mapped to semantic frames later
- No requirement for standardized relation vocabulary

### 3. Appropriate Abstraction Level

- Elements at general concept level (not specific instances)
- Maintains cognitive relevance without excessive detail
- Balances universality with specificity

### 4. Cultural Considerations

- Universal cognitive patterns identified
- Cultural variations acknowledged where relevant
- Focus on shared human cognitive architecture

## Key Advantages

### 1. **Cognitive Grounding**

- Ensures ontology reflects actual human understanding
- Captures folk theories and intuitive categorizations
- Validates formal categories against human experience

### 2. **Systematic Coverage**

- Multiple scenarios per subdomain ensure completeness
- Different aspects reveal subdomain complexity
- Comprehensive validation of conceptual boundaries

### 3. **Boundary Clarification**

- Explicit boundary illustrations distinguish related subdomains
- Cross-references show inter-domain connections
- Reduces ambiguity in ontological categories

### 4. **Practical Applicability**

- Scenarios demonstrate real-world usage patterns
- Support development of human-centered AI systems
- Enable validation through user testing and cultural comparison

### 5. **Formal Ontology Bridge**

- Dual-level structure connects cognitive insights to formal modeling
- Element classification enables systematic ontological development
- Relation mapping supports semantic frame construction

### 6. **Scalability and Flexibility**

- Framework applies consistently across all 46 subdomains
- Allows refinement based on validation results
- Supports iterative development and improvement

### 7. **Interdisciplinary Integration**

- Bridges cognitive science, philosophy, and computer science
- Incorporates insights from anthropology and psychology
- Supports cross-cultural ontology validation

## Validation Approach

### Internal Validation

- Consistency across scenarios within subdomains
- Coherent boundary definitions between related areas
- Logical element relationships and dependencies

### External Validation

- Testing scenarios with diverse cultural perspectives
- Validation against psychological and anthropological research
- User testing for practical applicability

### Iterative Refinement

- Scenario insights inform ontological category adjustments
- Cross-domain analysis reveals missing connections
- Continuous improvement based on validation results

## Expected Outcomes

This framework provides:

1. **Cognitively validated ontological categories** grounded in human experience
2. **Clear subdomain boundaries** with explicit relationship mappings
3. **Practical examples** for ontology implementation and testing
4. **Cultural universals and variations** for cross-cultural applications
5. **Foundation for semantic frames** supporting AI and NLP applications

The approach ensures that the resulting ontology accurately captures human cognitive patterns while maintaining the formal structure necessary for computational implementation and cross-cultural applicability.
