---
title: "Proposal for the Structural Model of FN3 (FrameNet Brasil)"
author: "Your Name"
date: "2024"
---

# Proposal for the Structural Model of FN3 (FrameNet Brasil)

## Abstract

This proposal outlines the theoretical and operational architecture for FN3, the current evolution of FrameNet Brasil. The proposed structure is grounded in the core principles of Frame Semantics and intends to unify lexical, conceptual, and epistemic dimensions. It introduces a layered organization into **domains**, **scenarios**, **scenes**, and **frames**, enabling scalable, modular representation of meaning across language, perception, and multimodal content.

---

## 1. Hierarchical Structure of FN3

FN3 organizes its network into a multilevel hierarchy:

- **Domains** may contain **subdomains**.
- **Domains** are composed of **scenarios**.
- A **scenario** consists of multiple **frames**.
- **Frames** represents **entities**, **attributes** or **situation_types**.
- A **scene** occurs in **scenario** as a container for **frames**.

This structure supports both **semantic abstraction** and **narrative contextualization**, enabling the encoding of language in relation to lived or imagined experiences.

---

## 2. Domains

Domains in FN3 correspond to broad fields of human experience and discourse. Unlike ontological categories, they are **epistemic regions**, meaning that they are historically and culturally constructed, and they aggregate a multiplicity of semantic phenomena. 

A domain is not defined by necessary and sufficient conditions but by the relevance of a set of experiences, knowledge, and practices organized historically. For example, the domain of *health* may include medical, psychological, biological, legal, and economic frames; the domain of *violence* may involve sociological, judicial, urban, and affective frames.

Therefore, domains in FN3 are neither ontological nor linguistic categories. They are **epistemic**, **discursive**, and **pragmatic** constructs, defined by the organization of knowledge and practice in a given culture. It is expected that a single domain integrate scenarios of different types.

Examples of domains in FN3:
- @Agriculture
- @Biology
- @Body
- @Business
- @Cloth
- @Communication
- @Emotion
- @Employment
- @Finance
- @Fire
- @Food
- @Health
- @Legal
- @Linguistics
- @Math
- @Military
- @Music
- @Physics
- @Psychology
- @Social
- @Sports
- @Time
- @Tourism
- @Transport
- @Violence
- @Visit
- @Weapon

---

## 3. Frames

**Frames** represents **entities**, **attributes** or **situations**.
 
A **situation** is a minimally coherent segment of reality, whether actual or possible. It is perceived and described from the perspective of a speaker or experiencer. Every situation is linguistically represented by a **frame**. In FN3, a "situational frame" is a formal model that defines a specific type of situation along with its participants and internal structure. A situational frame can represent Events, Process, States and Relations.

Situations are often reified or treated as "objects," which allows not only the identification of situations but also the consideration of their properties. For example, we may consider the spatial and temporal location of a specific situation.

An important characteristic of situations is that they can be conceived as having a complex mereological structure, with situations constituting other situations. This hierarchical form can be explored for reusing specifications of a situation.

Each situation has a well-defined internal structure, and once formalized as a frame, this structure becomes fixed. This means that a **situational frame represents a rigid embodiment of a type of situation**: while its instantiations may vary in terms of lexical units or context, the conceptual structure of the frame remains stable. This rigidity is necessary for coherence, comparison, and reuse of frames across different scenes and domains. For example, the frame *Giving* will always involve a Donor, a Recipient, and a Theme, regardless of whether the context is economic exchange, symbolic offering, or metaphorical transfer.

Like in many ontological and lexical frameworks, in FN3 a clear distinction is drawn between **entities**, **attributes** and **situations**. 

Entities—often equated with "endurants"—are things that persist through time while maintaining their identity. They have properties and parts, but they do not, in themselves, unfold or happen; rather, they provide the stable backdrop against which changes and events occur.

By contrast, situations correspond to "perdurants," unfolding across time as processes, events or states. A situation is not wholly present at any single moment but consists of temporal parts: it begins, evolves, and eventually ends. Situations capture how entities participate in change—such as a conversation, a chemical reaction, or a journey—by describing the dynamic patterns of involvement rather than the static bearers of properties.

Endurant-based entities serve as the anchors of classification (who or what), while perdurant-based situations describe the temporal "happenings" (when and how) in which those entities are involved.

On the other hand, attributes (sometimes classified as "qualities") describe _what an Entity or Situation is like_. They don't _unfold_ in time, nor do they persist as independent entities. They _inhere_ in something else.

### 3.1. Frame Typology

A key component of FN3 is the **typological classification of frames**, which enables the network to maintain conceptual coherence while supporting diverse applications. The classification is based on the semantic nature of the situation represented by the frame. FN3 adopts six primary semantic types of frames:

#### Entity Frames

These frames represent objects, people, places, and abstract referents. They are used to describe **things** rather than actions or processes. Examples include *Artifact*, *Body_Part*, *Institution*, *Person*, *Substance*. Entity frames often provide background participants in events.

#### Event Frames

Frames that capture dynamic situations: actions, operations, procedures, natural phenomena, or social events. They involve change over time, interaction between entities, or sequences of operations. For example, *Arrest*, *Explosion*, or *Journey*.

These frames usually involve a sequence of changes and may imply consequences. Their core elements often include an **Agent**, **Patient**, **Time**, and **Location**. They are typically evoked by verbs and nominalizations.

#### Process Frames

Process frames are a subclass of events, emphasizing **temporal unfolding** and internal **phases**. They describe a complex event which lasts some amount of time, consisting of a beginning stage, a stage where the process is ongoing, and a finish or end. In some cases the process may pause, and then possibly resume. They are dynamic but focus on transitions rather than endpoints. Examples include *Learning*, *Aging*, *Healing*.

Unlike punctual events, process frames describe continuity and evolution, often involving stages or feedback loops. They are central to scenes involving development or transformation.

#### State Frames

State frames represent static conditions that **hold over time** without internal change. Examples include *Ownership*, *Health_State*, *Emotional_State*. 

A State is a Situation that persists over some duration without internal transition or inherent unfolding from one phase to another. It describes a static condition, configuration, or status of an entity or set of entities. Unlike an Event or Process, a state does not inherently describe a change or an activity. However, a state can change, and the change from one state to another would be an Event or Process. Some criteria:
- Persistence over Duration: A State is characterized by its duration, during which its defining conditions remain constant. It is not instantaneous like some Events.
- Lack of Intrinsic Dynamics/Internal Transition: A state does not involve an inherent progression or internal activity. It is a stable condition, even if it is temporary. The beginning or end of a state, or the transition between states, would be an Event or Process.
- Cognitive Stability: Cognitively, states are understood as relatively stable configurations of entities and their relationships.
- Result of a Process/Event (often): Many states are the result or outcome of an Event or Process (e.g., Agreement resulting from Negotiation; ProblemResolution resulting from SolutionSteps).

They may function as background conditions or targets of change. Their core elements often include **Experiencer**, **Stimulus**, or **Possessor**.

#### Attribute Frames

These frames define **properties** or **qualitative aspects** of entities or situations, including measurable properties (size, weight), perceptual qualities (color, texture), and abstract attributes (importance, legality, validity). They are often evoked by adjectives or scalar expressions.

An attribute inheres in an Entity or Situation (Event/Process/State) at a specific point in time or over a duration, but does not inherently imply change or duration itself. Attributes describe what something is like or what characteristics it possesses. Attributes can be predicated of something. Some criteria:
- Inherence: An attribute must inhere in something else (an Entity, Event, Process, or State). It cannot exist independently. For instance, 'red' inheres in a 'ball'; 'intensity' inheres in an 'emotion'.
- Lack of Intrinsic Temporal Dynamics: While the value of an atributee can change over time (e.g., something can become 'redder'), the attribute itself (e.g., 'redness') does not unfold or progress through time in the way an event or process does. It is a snapshot-like descriptor.
- Measurability/Gradability (often, but not exclusively): Many attributes are gradable (e.g., 'very hard', 'slightly soft') or measurable (e.g., 'weight', 'temperature'). This is a strong indicator, but not a strict requirement (e.g., 'broken' as a quality might not be easily gradable in all contexts).
- Descriptive Function: Its primary role is to describe an inherent characteristic, property, or attribute of something.

Attribute frames play a descriptive role and are frequently linked to scenes of evaluation, judgment, or comparison.

#### Relation Frames

These frames establish structural or functional **links** between entities or events. They include spatial, temporal, causal, part-whole, and epistemic relations. Examples include *Cause*, *Sequence*, *Part_Whole*, *Similarity*, *Contrast*.

Relation frames are crucial for compositional semantics and for building scenarios that combine multiple frames coherently.

#### Cross-Typological Remarks

Although these six categories provide a working typology, frame types are not always mutually exclusive. Many frames exhibit **hybrid features**. For example, a frame such as *Marriage* may be seen simultaneously as an Event (ceremony), a State (legal status), and a Relation (between two people).

Thus, FN3 adopts a **plural and flexible strategy** for classification, allowing each frame to be associated with one or more semantic types. This reflects the richness of natural language and the need for nuanced semantic modeling.

This typology informs both the internal construction of frames (choice of core Frame Elements) and their relations (inheritance, subframing, etc.). It also facilitates automatic processing, as it enables generalization and inference across types.

## 4. Scenes

A **scene** is a perceptually or narratively bounded experience. It is characterized by a configuration of one or more situations occurring in a defined space-time or cognitive scope. Unlike frames, scenes are not rigid: they can vary internally, evolve, or be reinterpreted according to context.

For example, a scene of "a person taking a bus to work" might include multiple frames: *Motion*, *Purpose*, *Means of Transport*, *Daily Routine*. These frames together constitute a **scene**, which is more than the sum of its parts. Scenes are the unit of human experience and perception—they are what we remember, imagine, narrate, or observe.

Scenes can also serve as templates for interpreting new experiences. Their structure may be schematic or prototypical, and they often include expectations, temporal sequencing, and typical participants. Thus, scenes are crucial to connect linguistic expressions with experiential reality.

Finally, complex events can be seen as decomposed into a series of more elementary scenes, each of which can be understood as a whole.

In the context of a multimodal FNBr, scenes are represented by sentences, images, and videos:
- Sentences represent scenes with one or more situations/entities. The situations (frames) are constructed from the concepts expressed by lexical units.
- An image is considered a scene, representing one or more situations/entities simultaneously.
- A video can be considered a succession of scenes, where multiple situations are represented through a sequence of video frames. Each frame of the video is an image (which can represent one or more situations simultaneously). In videos, a situation can extend over time.

## 5. Scenarios

A scenario is a special type of frame, used to group situations/entities/attributes that are related to each other, forming a sub-context within a given domain.

Each frame is associated with a type. Thus, a **scenario** is composed of events, processes, states, relations, and entities.

The definition of the Frame Elements of scenarios may involve:
- Structured description of the scenario: explains the roles of the participants (Agent, Theme, Goal, etc.).
- Sequence or dynamics of the events occurring in the scenario: often indicates initial states, intermediate processes, and outcomes.
- Motivations and conditions: includes causes, motivations, intentions, or obstacles.
- Contextualization: often specifies whether it occurs in a certain place, time, or manner.

## 6. Core Principles for Formalizing Frame Creation in FNBr

Frame creation in FN3 is governed by a set of core principles that guarantee conceptual coherence, linguistic validity, and compatibility with computational methods. These principles serve both theoretical consistency and practical scalability:

1. **Frame-Centric Semantics**: A semantic frame is the _primary unit of meaning_, from which roles (frame elements) are derived, not vice versa. This principle distinguishes frame semantics from case grammar. Rather than starting with fixed semantic roles, FN3 treats frames as _situated conceptual wholes_, with roles defined _relative to that frame_. This supports cognitive realism and avoids overly rigid role inventories.

2. **Situation Grounding**: Every frame must be grounded in a **prototypical situation**, event, or cognitive script, either perceptual, social, or culturally embedded. As Fillmore emphasized, frames are schematic representations of experiences. Grounding in prototypical situations allows frames to reflect human conceptual structures and supports inferential completeness (expectations, roles, consequences).

3. **Minimality and Distinctiveness**: Frame Elements (FEs) must reflect **functionally and conceptually distinct participants or aspects**. Frames should define a **minimal necessary set of core FEs** for coherence. Frames overloaded with redundant roles blur their internal structure. Distinctiveness ensures clarity, and minimality aids generalization and inheritance. Peripheral or optional roles can be added with looser constraints.

4. **Valence evidence and Corpus-Based Validation**: Frame and FE definitions should be **anchored in actual linguistic behavior**, ideally supported by valence patterns and corpus examples. Usage-based grounding keeps frame creation empirical rather than speculative. This is core to the FrameNet model and ensures frames reflect how meaning is structured in language.

5. **Inheritance Structure**: New frames should **inherit structure from existing frames** wherever possible, unless there is strong evidence for disjunction. This reduces redundancy and supports a lattice or network structure in the Lexical Dimension. Inheritance ensures shared structure is not redefined arbitrarily and helps maintain internal coherence across the frame network..

6. **Perspective Sensitivity**: A frame can represent a **perspective** on a situation, even if it shares event structure with others. Verbs like _give_ vs _receive_ show that the same event can be framed from different participant focal points. FN3 should distinguish such frames to reflect perspectivization as a cognitive-linguistic phenomenon.

7. **Frame Typing**: Each frame should be typed to facilitate typological control and formal inference. Typing supports modular design, inheritance grouping, and automated reasoning. It aligns with ontological commitments (e.g. distinguishing processes from states) and with computational goals (e.g. clustering, inference).

8. **Cognitive Embeddability**: A valid frame should be **mentally imageable**, relatable to experience, and potentially learnable by humans without explicit definition. This ensures cognitive adequacy. If a frame cannot be imagined or mentally simulated as a whole situation, it likely violates the cognitive motivations of frame semantics.

9. **Computational Alignment**: Frame creation should follow a **structured enough process** that it can be guided or replicated (semi-)automatically by language models. A long-term goal of FN3 is automation. Aligning the method with LLM capabilities (e.g. pattern recognition, analogy, paraphrase alignment) enables assisted frame induction and scaling.

These principles establish FN3 as a cognitively grounded, linguistically precise, and computationally usable semantic network ready for advanced tasks in AI, education, translation, and cross-cultural representation.
