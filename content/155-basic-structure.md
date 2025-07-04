# Structural Model of Lexical FN3

This proposal outlines the theoretical and operational architecture for FN3. The proposed structure is grounded in the core principles of Frame Semantics and intends to unify lexical, conceptual, and epistemic dimensions. It introduces a layered organization into **domains**, **scenarios**, **assemblies**, and **frames**, enabling scalable, modular representation of meaning across language, perception, and multimodal content.

## Hierarchical Structure of FN3

FN3 organizes its network into a multilevel hierarchy:

- **Domains** may contain **subdomains**.
- **Domains** are composed of **scenarios**.
- A **scenario** consists of multiple **frames**.
- **Frames** represents **entities**, **attributes** or **situation_types**.
- A **assembly** occurs in **scenario** as a container for **frames**.

This structure supports both **semantic abstraction** and **narrative contextualization**, enabling the encoding of language in relation to lived or imagined experiences.

## Domains

Domains in FN3 correspond to broad fields of human experience and discourse. Unlike the domains defined for Ontological dimension, in Lexical dimension domains are **epistemic regions**, meaning that they are historically and culturally constructed, and they aggregate a multiplicity of semantic phenomena. 

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

## Frames

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
## Scenarios

A scenario is a special type of frame, used to group situations/entities/attributes that are related to each other, forming a sub-context within a given domain.

Each frame is associated with a type. Thus, a **scenario** is composed of events, processes, states, relations, and entities.

The definition of the Frame Elements of scenarios may involve:
- Structured description of the scenario: explains the roles of the participants (Agent, Theme, Goal, etc.).
- Sequence or dynamics of the events occurring in the scenario: often indicates initial states, intermediate processes, and outcomes.
- Motivations and conditions: includes causes, motivations, intentions, or obstacles.
- Contextualization: often specifies whether it occurs in a certain place, time, or manner.
## Assemblies

A **scene** is a perceptually or narratively bounded experience. It is characterized by a configuration of one or more situations occurring in a defined space-time or cognitive scope. Unlike frames, scenes are not rigid: they can vary internally, evolve, or be reinterpreted according to context.

For example, a scene of "a person taking a bus to work" might include multiple frames: *Motion*, *Purpose*, *Means of Transport*, *Daily Routine*. These frames together constitute a **scene**, which is more than the sum of its parts. Scenes are the unit of human experience and perception—they are what we remember, imagine, narrate, or observe.

Scenes can also serve as templates for interpreting new experiences. Their structure may be schematic or prototypical, and they often include expectations, temporal sequencing, and typical participants. Thus, scenes are crucial to connect linguistic expressions with experiential reality.

Finally, complex events can be seen as decomposed into a series of more elementary scenes, each of which can be understood as a whole.

In the context of a multimodal FNBr, scenes are represented by sentences, images, and videos:
- Sentences represent scenes with one or more situations/entities. The situations (frames) are constructed from the concepts expressed by lexical units.
- An image is considered a scene, representing one or more situations/entities simultaneously.
- A video can be considered a succession of scenes, where multiple situations are represented through a sequence of video frames. Each frame of the video is an image (which can represent one or more situations simultaneously). In videos, a situation can extend over time.
