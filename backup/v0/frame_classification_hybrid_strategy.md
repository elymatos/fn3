
# Narrower Frame Classification: Hybrid Strategy

This documentation describes a structured, hybrid strategy for achieving a narrower, more precise classification of FrameNet frames. Given that frames inherently encapsulate rich semantic complexity, a singular classification approach can lead to overly broad or ambiguous categorization. Therefore, a combination of linguistic, semantic, and relational criteria is proposed to enhance precision and consistency.

## 1. Motivation
FrameNet frames are semantically rich and resist rigid single-category assignments. Initial broad classification tends to assign multiple types per frame, reducing practical utility. To enhance usability and interpretability, a more constrained yet semantically justified classification is required.

## 2.Types descriptions
### Entity
Frames that represent objects, actors, artifacts, concepts, or any discrete unit that can be conceptualized as an entity. Entities may be concrete (person, city) or abstract (law, algorithm, contract). 

### Event
Frames that capture dynamic situations: actions, operations, procedures, natural phenomena, or social events. They involve change over time, interaction between entities, or sequences of operations.

### Process
Frames that describe a complex event which lasts some amount of time, consisting of a beginning stage, a stage where the process is ongoing, and a finish or end. In some cases the process may pause, and then possibly resume. Delineated as a subclass or a specific kind of event with temporal structure and possible interruption. 

### State
Frames that describe static situations, conditions, configurations, or properties that hold over time without inherent change. Examples include being hungry, ownership, or spatial positioning.
A State is a Situation that persists over some duration without internal transition or inherent unfolding from one phase to another. It describes a static condition, configuration, or status of an entity or set of entities. Unlike an Event or Process, a state does not inherently describe a change or an activity. However, a state can change, and the change from one state to another would be an Event or Process. Some criteria:
- Persistence over Duration: A State is characterized by its duration, during which its defining conditions remain constant. It is not instantaneous like some Events.
- Lack of Intrinsic Dynamics/Internal Transition: A state does not involve an inherent progression or internal activity. It is a stable condition, even if it is temporary. The beginning or end of a state, or the transition between states, would be an Event or Process.
- Cognitive Stability: Cognitively, states are understood as relatively stable configurations of entities and their relationships.
- Result of a Process/Event (often): Many states are the result or outcome of an Event or Process (e.g., Agreement resulting from Negotiation; ProblemResolution resulting from SolutionSteps).

### Attribute
Frames representing attributes or characteristics of entities or states. These include measurable properties (size, weight), perceptual qualities (color, texture), and abstract attributes (importance, legality, validity).  
An attribute inheres in an Entity or Situation (Event/Process/State) at a specific point in time or over a duration, but does not inherently imply change or duration itself. Attributes describe what something is like or what characteristics it possesses. Attributes can be predicated of something. Some criteria:
- Inherence: An attribute must inhere in something else (an Entity, Event, Process, or State). It cannot exist independently. For instance, 'red' inheres in a 'ball'; 'intensity' inheres in an 'emotion'.
- Lack of Intrinsic Temporal Dynamics: While the value of an atributee can change over time (e.g., something can become 'redder'), the attribute itself (e.g., 'redness') does not unfold or progress through time in the way an event or process does. It is a snapshot-like descriptor.
- Measurability/Gradability (often, but not exclusively): Many attributes are gradable (e.g., 'very hard', 'slightly soft') or measurable (e.g., 'weight', 'temperature'). This is a strong indicator, but not a strict requirement (e.g., 'broken' as a quality might not be easily gradable in all contexts).
- Descriptive Function: Its primary role is to describe an inherent characteristic, property, or attribute of something.

### Relation
Frames that explicitly represent the connection between entities, events, or states. Relations may be spatial (next to, inside), temporal (before, during), causal (cause-effect), hierarchical (part-of, type-of), or logical (equivalence, implication).                                            

## 3. Proposed Hybrid Strategy

This strategy combines multiple layers of semantic and linguistic evidence into a sequential process:

### Step 1: Frame Elements (FEs) Analysis
Frame Elements (particularly core elements) are primary semantic anchors for frames.
List of typical FE for each frame type (adding Lutma templates too):
#### **a. Event**
- Event
- Agent: Someone who performs an action.
- Theme: An entity involved in the event.
- Goal: The intended goal of the event.
- Instrument: An entity directed by the Agent that interacts with an Patient to accomplish the action indicated by the target.
- Patient: It is the entity acted on and that may, but need not, undergo a change.
- Cause: A force, process, or event that produces an effect.
- Effect: A positive or negative evaluation of the event.
- Circumstances: Some specification of the state of the world (at a particular time and place) which is specifically independent of the Event itself and any of its participants.
- Degree: Some gradable attribute that modifies the expected value for it
- Depictive: Describes the Entity at the time of the Event.
- Duration:The amount of time for which the Event is ongoing.
- Explanation: A proposition from which, in many cases, the motivations or causes of the emergence of the Event are shown.
- Frequency: The number of times the Event occurs per some unit of time.
- Manner: Any description of the Event which is not covered by more specific FEs.
- Means:An action through which the Entity or Cause accomplishes the Event indicated by the target.
- Place:The location where the Event takes place.
- Purpose: An action that the Entity intends to accomplish by performing the Event.
- Result:The ultimate effect of the Event.
- Time: The time when the Event occurs.

#### **b. Process**
- Process
- Stage
- Duration
- Development
- Intermediate state
- Material
- Agent
- Result
#### **c. State**
- State
- Condition
- Status
- Situation
- Holder
- Circumstances: The state of the world (at a particular time and place) which is specifically independent of the State itself and of any of its participants.
- Degree: The description of the degree to which the State holds.
- Duration: The length of time from the beginning of a State to its end.
- Explanation: Any object or event that brings about the State.
- Manner: Any description of the State which is not covered by more specific FEs.
- Place: The location where the State holds.
- Time

#### **d. Attribute**
- Attribute
- Value
- Entity
- Type
- Kind
- Extent
- Degree
- Measure
- Quality
- Circumstances: The state of the world (at a particular time and place) which is specifically independent of the Attribute itself.
- Degree:A modifier expressing degree.
- Explanation: A proposition from which the causes for the emergence of an Attribute are shown.
- Manner: Any description of how the Attribute takes place which is not covered by more specific FEs.
- Place: The location where the Entity has the Attribute.
- Time: The time when the Entity is in the state of having a particular Attribute.

#### **e. Relation**
- Entities
- Individuals
- Relation
- Relation_type
- Relative_Location
- Place
- Path
- Source
- Goal
- Direction
- Parts
- Constituent_parts
- Rate
- Accessibility: An indication of how accessible the profiled Entity, Event or State is to some participant in the speech context. It normally describes availability for manipulation and use, but may simply describe how easily seen or difficult to see it is.
- Degree: A modifier expressing the extent to which the Relation occurs.
- Deixis: An indication of how the locative phrase relates to the grounding of the speech situation.
- Direction: The Direction from a reference location (generally, the deictic center) of a path to the profiled Entity, Event or State.
- Directness: An indication of how closely the position of the profiled Entity, Event or State matches the prototype expected from the schema associated with the target.
- Temporal_profile: A description of how the access path to the non-profiled Entity, Event or State interacts with time.
- Time: The time when the Relation takes place.

#### **f. Entity**
- Entity
- Object
- Item
- Concept
- Constituent_parts: Salient parts or substances that make up the Entity.
- Container_possessor: Some location containing the Entity.
- Creator: The individual or individuals that bring the Entity into existence.
- Descriptor: The characterization of a temporary condition of the Entity.
- Formational_cause: The indication of the causer or action which makes the Entity what it is.
- Inherent_purpose: The activity in which the Entity is supposed to take part.
- Material: Any indication of what makes up the Entity.
- Name: The term used to specify the Entity.
- Relative_location: The place relative to which the Entity is located.
- Time_of_creation: The time when the Entity comes into existence.
- Type: The indication of the type of the Entity.
- Use: The use for which the Entity is intended.

### Step 2: Lexical Units (LUs) POS-based Refinement
Lexical Units offer linguistic evidence reflecting usage contexts:
- **Event/Process**: Predominantly verbs (e.g., *run.verb*, *attack.verb*).
- **Entity**: Predominantly concrete nouns (e.g., *book.noun*, *tree.noun*).
- **Attribute/State**: Predominantly adjectives or descriptive nouns (e.g., *happy.adj*, *height.noun*).
- **Relation**: Predominantly relational nouns or prepositions (e.g., *relationship.noun*, *connection.noun*).

### Step 3: Hierarchical Frame Relations (Inheritance)
FrameNet structure is hierarchical. Classification benefits from consistency within these hierarchical relations:
- If a parent frame is robustly classified as an **Event**, its child frame likely inherits the Event classification.
- Relational consistency propagates semantic coherence across frame hierarchies.

### Step 4: Type Hierarchy Resolution
Despite steps 1-3, ambiguities may persist. Resolve them via a strict priority hierarchy:
```
Event > Process > State > Relation > Attribute > Entity
```
This hierarchy ensures consistent and meaningful classification resolutions.

## 3. Workflow Example
A practical illustration of the hybrid classification strategy:
- **Initial Frame Analysis**: Frame "Attacking" identified as having an Agent, Theme, and Goal (core FEs), suggesting an Event.
- **Lexical Unit Check**: Dominated by verbs (attack.verb, assault.verb), reinforcing Event classification.
- **Hierarchical Check**: Parent frame "Hostile_encounter" classified as Event; hence, Attacking strongly confirmed as Event.
- **Hierarchy Resolution**: No ambiguity remains; confirmed classification as Event.

## 4. Advantages of Hybrid Approach
- Leverages multiple semantic dimensions for robust, linguistically grounded classification.
- Reduces classification ambiguity by systematically integrating linguistic, semantic, and hierarchical evidence.
- Enhances consistency across the entire frame network.

## 5. Next Steps
- Implement the strategy algorithmically to refine the frame dataset.
- Evaluate classification quality and adjust criteria based on empirical results and linguistic expert reviews.

---
