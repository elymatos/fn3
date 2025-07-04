# Frame Typology

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
