# Proposal for the Structural Model of FN3 (FrameNet Brasil)

## Abstract

This proposal outlines the theoretical and operational architecture for FN3, the current evolution of FrameNet Brasil. The proposed structure is grounded in the core principles of Frame Semantics and intends to unify lexical, conceptual, and epistemic dimensions. It introduces a layered organization into **domains**, **scenarios**, **scenes**, and **situations**, enabling scalable, modular representation of meaning across language, perception, and multimodal content.

---

## 1. Hierarchical Structure of FN3

FN3 organizes its network into a multilevel hierarchy:

- **Domains** may contain **subdomains**.
- **Domains** are composed of **scenarios**.
- A **scenario** consists of multiple **scenes** or **situations**.
- A **scene** is a container for **situations** (each represented by a **frame**).
- A **frame** denotes a specific **type of situation** (e.g., Event, State, Relation).

This structure supports both **semantic abstraction** and **narrative contextualization**, enabling the encoding of language in relation to lived or imagined experiences.

---

## 2. Domains: Epistemic Macro-Structures

Domains in FN3 correspond to broad fields of human experience and discourse. Unlike ontological categories, they are **epistemic regions**, meaning that they are historically and culturally constructed, and they aggregate a multiplicity of semantic phenomena. A domain is not defined by necessary and sufficient conditions but by the relevance of a set of experiences, knowledge, and practices organized historically. For example, the domain of *health* may include medical, psychological, biological, legal, and economic frames; the domain of *violence* may involve sociological, judicial, urban, and affective frames.

Therefore, domains in FN3 are neither ontological nor linguistic categories. They are **epistemic**, **discursive**, and **pragmatic** constructs, defined by the organization of knowledge and practice in a given culture. A single domain may integrate scenes of different types: perceptual, institutional, narrative, metaphorical, etc. 

---

## 3. Situations: Frames as Rigid Conceptual Units

A **situation** is a minimally coherent segment of reality, whether actual or possible. It is perceived and described from the perspective of a speaker. Every situation, in this framework, is linguistically represented by a **frame**. In FN3, a frame is a formal model that defines a specific type of situation along with its participants and internal structure.

As situações são muitas vezes reificadas, ou consideradas como um “objeto”, o que permite não apenas identificar situações, mas também considerar suas propriedades. Por exemplo, podemos considerar a localização no espaço e no tempo de uma situação específica.
Uma característica importante das situações é que elas podem ser concebidas como tendo uma estrutura mereológica complexa, com situações constituindo outras situações. Essa forma hierárquica pode ser explorada na reutilização das especificações de uma situação.

Each situation has a well-defined internal structure, and once formalized as a frame, this structure becomes fixed. This means that a **frame represents a rigid embodiment of a type of situation**: while its instantiations may vary in terms of lexical units or context, the conceptual structure of the frame remains stable. This rigidity is necessary for coherence, comparison, and reuse of frames across different scenes and domains. For example, the frame *Giving* will always involve a Donor, a Recipient, and a Theme, regardless of whether the context is economic exchange, symbolic offering, or metaphorical transfer.

---

## 4. Scenes: Temporally and Perceptually Bounded Units

A **scene** is a perceptually or narratively bounded experience. It is characterized by a configuration of one or more situations occurring in a defined space-time or cognitive scope. Unlike frames, scenes are not rigid: they can vary internally, evolve, or be reinterpreted according to context.

For example, a scene of "a person taking a bus to work" might include multiple frames: *Motion*, *Purpose*, *Means of Transport*, *Daily Routine*. These frames together constitute a **scene**, which is more than the sum of its parts. Scenes are the unit of human experience and perception—they are what we remember, imagine, narrate, or observe.

Scenes can also serve as templates for interpreting new experiences. Their structure may be schematic or prototypical, and they often include expectations, temporal sequencing, and typical participants. Thus, scenes are crucial to connect linguistic expressions with experiential reality.

Finalmente, eventos complexos podem ser vistos como decompostos em uma série de cenas mais elementares, cada uma das quais pode ser compreendida como um todo.
No contexto de uma FNBr multimodal, as cenas são representadas por sentenças, imagens e videos: 
* As sentenças representam cenas com uma ou mais situações. As situações (frames) são construídas a partir dos conceitos expressos pelas unidades lexicais.
* Uma imagem será considerada uma cena, representando uma ou mais situações simultaneamente.
* Um video pode ser considerado como uma sucessão de cenas, sendo que várias situações são representadas pela ocorrência de uma sucessão de frames de vídeo. Cada frame do video é uma imagem (que, como visto, pode representar uma ou mais situações simultaneamente). Nos videos, uma situação pode se estender no tempo.


---
## 5. Cenários
Um cenário é um tipo de frame especial, usado para agrupar situações (frames) que estejam relacionados entre si, formando um subcontexto dentro de um dado domínio.
Cada frame está associado a um tipo (Event, Process, State, Relation, Attribute, Entity). Desta forma um "cenário" é constituído por eventos, processos, estados, relações e entidades.
A definição dos Elelentos de Frame dos cenários pode envolver:
- Descrição estruturada do cenário: Explica os papéis dos participantes (#Agente, #Tema, #Meta, etc.).
- Sequência ou dinâmica dos eventos que ocorrem no cenário: Indica frequentemente estados iniciais, processos intermediários e resultados.
- Motivações e condições:Inclui causas, motivações, intenções ou obstáculos.
- Contextualização:Muitas vezes especifica se ocorre em certo local, tempo, maneira.


--- 


## 6. Frame Typology: Toward a Semantic Classification

A key component of FN3 is the **typological classification of frames**, which enables the network to maintain conceptual coherence while supporting diverse applications. The classification is based on the semantic nature of the situation represented by the frame. FN3 adopts six primary semantic types of frames:

### 6.1 Entity Frames

These frames represent objects, people, places, and abstract referents. They are used to describe **things** rather than actions or processes. Examples include *Artifact*, *Body_Part*, *Institution*, *Person*, *Substance*. Entity frames often provide background participants in events.

### 6.2 Event Frames

Event frames describe occurrences located in time. They generally involve dynamic processes and can be associated with verb-centric predicates. For example, *Arrest*, *Explosion*, or *Journey*.

These frames usually involve a sequence of changes and may imply consequences. Their core elements often include an **Agent**, **Patient**, **Time**, and **Location**. They are typically evoked by verbs and nominalizations.

### 6.3 Process Frames

Process frames are a subclass of events, emphasizing **temporal unfolding** and internal **phases**. They are dynamic but focus on transitions rather than endpoints. Examples include *Learning*, *Aging*, *Healing*.

Unlike punctual events, process frames describe continuity and evolution, often involving stages or feedback loops. They are central to scenes involving development or transformation.

### 6.4 State Frames

State frames represent static conditions that **hold over time** without internal change. Examples include *Ownership*, *Health_State*, *Emotional_State*. These are typically evoked by stative verbs or adjectives.

A State is a Situation that persists over some duration without internal transition or inherent unfolding from one phase to another. It describes a static condition, configuration, or status of an entity or set of entities. Unlike an Event or Process, a state does not inherently describe a change or an activity. However, a state can change, and the change from one state to another would be an Event or Process. Some criteria:
- Persistence over Duration: A State is characterized by its duration, during which its defining conditions remain constant. It is not instantaneous like some Events.
- Lack of Intrinsic Dynamics/Internal Transition: A state does not involve an inherent progression or internal activity. It is a stable condition, even if it is temporary. The beginning or end of a state, or the transition between states, would be an Event or Process.
- Cognitive Stability: Cognitively, states are understood as relatively stable configurations of entities and their relationships.
- Result of a Process/Event (often): Many states are the result or outcome of an Event or Process (e.g., Agreement resulting from Negotiation; ProblemResolution resulting from SolutionSteps).

They may function as background conditions or targets of change. Their core elements often include **Experiencer**, **Stimulus**, or **Possessor**.

### 6.5 Attribute Frames

These frames define **properties** or **qualitative aspects** of entities or situations. For example: *Color*, *Size*, *Intensity*, *Value*. They are often evoked by adjectives or scalar expressions.

An attribute inheres in an Entity or Situation (Event/Process/State) at a specific point in time or over a duration, but does not inherently imply change or duration itself. Attributes describe what something is like or what characteristics it possesses. Attributes can be predicated of something. Some criteria:
- Inherence: An attribute must inhere in something else (an Entity, Event, Process, or State). It cannot exist independently. For instance, 'red' inheres in a 'ball'; 'intensity' inheres in an 'emotion'.
- Lack of Intrinsic Temporal Dynamics: While the value of an atributee can change over time (e.g., something can become 'redder'), the attribute itself (e.g., 'redness') does not unfold or progress through time in the way an event or process does. It is a snapshot-like descriptor.
- Measurability/Gradability (often, but not exclusively): Many attributes are gradable (e.g., 'very hard', 'slightly soft') or measurable (e.g., 'weight', 'temperature'). This is a strong indicator, but not a strict requirement (e.g., 'broken' as a quality might not be easily gradable in all contexts).
- Descriptive Function: Its primary role is to describe an inherent characteristic, property, or attribute of something.


Attribute frames play a descriptive role and are frequently linked to scenes of evaluation, judgment, or comparison.

### 6.6 Relation Frames

These frames establish structural or functional **links** between entities or events. They include spatial, temporal, causal, part-whole, and epistemic relations. Examples include *Cause*, *Sequence*, *Part_Whole*, *Similarity*, *Contrast*.

Relation frames are crucial for compositional semantics and for building scenarios that combine multiple frames coherently.

### 6.7 Cross-Typological Remarks

Although these six categories provide a working typology, frame types are not always mutually exclusive. Many frames exhibit **hybrid features**. For example, a frame such as *Marriage* may be seen simultaneously as an Event (ceremony), a State (legal status), and a Relation (between two people).

Thus, FN3 adopts a **plural and flexible strategy** for classification, allowing each frame to be associated with one or more semantic types. This reflects the richness of natural language and the need for nuanced semantic modeling.

This typology informs both the internal construction of frames (choice of core Frame Elements) and their relations (inheritance, subframing, etc.). It also facilitates automatic processing, as it enables generalization and inference across types.

---

## Core Principles for Formalizing Frame Creation in FNBr

Frame creation in FNBr is governed by a set of core principles that guarantee conceptual coherence, linguistic validity, and compatibility with computational methods. These principles serve both theoretical consistency and practical scalability:

1. **Frame-Centric Semantics**: A semantic frame is the _primary unit of meaning_, from which roles (frame elements) are derived, not vice versa. This principle distinguishes frame semantics from case grammar. Rather than starting with fixed semantic roles, FN5 treats frames as _situated conceptual wholes_, with roles defined _relative to that frame_. This supports cognitive realism and avoids overly rigid role inventories.

2. **Situation Grounding**: Every frame must be grounded in a **prototypical situation**, event, or cognitive script, either perceptual, social, or culturally embedded. As Fillmore emphasized, frames are schematic representations of experiences. Grounding in prototypical situations allows frames to reflect human conceptual structures and supports inferential completeness (expectations, roles, consequences).

3. **Minimality and Distinctiveness**: Frame Elements (FEs) must reflect **functionally and conceptually distinct participants or aspects**. Frames should define a **minimal necessary set of core FEs** for coherence. Frames overloaded with redundant roles blur their internal structure. Distinctiveness ensures clarity, and minimality aids generalization and inheritance. Peripheral or optional roles can be added with looser constraints.

4. **Valence evidence and Corpus-Based Validation**: Frame and FE definitions should be **anchored in actual linguistic behavior**, ideally supported by valence patterns and corpus examples. Usage-based grounding keeps frame creation empirical rather than speculative. This is core to the FrameNet model and ensures frames reflect how meaning is structured in language.

5. **Inheritance Structure**: New frames should **inherit structure from existing frames** wherever possible, unless there is strong evidence for disjunction. This reduces redundancy and supports a lattice or network structure in the Lexical Dimension. Inheritance ensures shared structure is not redefined arbitrarily and helps maintain internal coherence across the frame network..

6. **Perspective Sensitivity**: A frame can represent a **perspective** on a situation, even if it shares event structure with others. Verbs like _give_ vs _receive_ show that the same event can be framed from different participant focal points. FN5 should distinguish such frames to reflect perspectivization as a cognitive-linguistic phenomenon.

7. **Frame Typing**: Each frame should be typed to facilitate typological control and formal inference. Typing supports modular design, inheritance grouping, and automated reasoning. It aligns with ontological commitments (e.g. distinguishing processes from states) and with computational goals (e.g. clustering, inference).

8. **Cognitive Embeddability**: A valid frame should be **mentally imageable**, relatable to experience, and potentially learnable by humans without explicit definition. This ensures cognitive adequacy. If a frame cannot be imagined or mentally simulated as a whole situation, it likely violates the cognitive motivations of frame semantics.

9. **Computational Alignment**: Frame creation should follow a **structured enough process** that it can be guided or replicated (semi-)automatically by language models. A long-term goal of FNBr is automation. Aligning the method with LLM capabilities (e.g. pattern recognition, analogy, paraphrase alignment) enables assisted frame induction and scaling.
.
These principles establish FN3 as a cognitively grounded, linguistically precise, and computationally usable semantic network ready for advanced tasks in AI, education, translation, and cross-cultural representation.