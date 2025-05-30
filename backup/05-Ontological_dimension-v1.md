# Ontological Dimension

## 1. Introduction
This document presents the ontological model adopted for the Ontological Dimension of the FN5 project. The goal is to establish a rigorous, cognitively plausible, and formally grounded organization of domains and subdomains that serves as the backbone for the integration to Lexical Domain
The proposed structure deliberately departs from traditional epistemological taxonomies (e.g., science-based or knowledge-based classifications) and instead embraces a functional ontological architecture, reflecting how entities, processes, events, states, and relations are organized in both the real world and human cognition.
The design draws directly from three pillars:
- Formal ontology, specifically the DUL (Descriptive Ontology for Linguistic and Cognitive Engineering).
- The theoretical framework of Frame Semantics.
- Cognitive models derived from Commonsense Psychology, discussed particularly in the work of Hobbs(2017).

## 2. From Epistemology to Ontology

The classification of knowledge into scientific domains (e.g., Natural Sciences, Social Sciences) primarily reflects an epistemological bias. While useful for organizing human knowledge, this approach is often inadequate for modeling the inherent structure of reality itself.

This ontological model, in contrast, shifts its focus from how humans categorize knowledge to how entities, events, and relations manifest in the world, and how they are experienced, perceived, and linguistically represented by humans. This transition aligns with:

- The principles of ontological realism.
- The cognitive organization of experience, as directly supported by Frame Semantics and research in commonsense psychology.

## 3. Alignment with DUL

The DOLCE+DnS Ultralite (DUL) ontology is a significant simplification and extension of the original DOLCE Lite-Plus library, designed to enhance usability and applicability, particularly within the Semantic Web community. DUL maintains a cognitively inspired, commonsense view of reality, aligning with how humans perceive and interact with the world in everyday life.

**Key Characteristics and Design Principles:**

- **Cognitive and Linguistic Grounding:** DUL, like its predecessor DOLCE, is fundamentally influenced by cognitive and linguistic considerations, aiming to model a commonsense understanding of reality. This approach prioritizes the explicit representation of existing conceptualizations, often reflecting the mesoscopic level of human cognition and natural language.
    
- **Dual-Level Architecture (D&S Framework):** A core innovation in DUL is the integration of the Descriptions and Situations (D&S) framework. This framework provides a principled approach to "context reification" by clearly separating "states-of-affairs" (unstructured reality or data) from their "descriptions" (interpretations or conceptualizations). When a description is applied to a state of affairs, a "situation" emerges, reflecting a cognitive structuring process. This allows for the representation of contextual knowledge and handles the context-dependency of information often encountered in distributed and partially implicit data environments like the Semantic Web.
    
- **Intuitive Terminology and Lighter Axiomatization:** DUL simplifies terminology (e.g., replacing 'Endurant' and 'Perdurant' with 'Object' and 'Event') and features a lighter axiomatization compared to DOLCE-Full. This design choice enhances its accessibility and computability, acknowledging the trade-off between formal expressiveness and computability in foundational ontologies.
    
- **Pattern-Based Architecture:** DUL is designed with a pattern-based architecture, offering modular components (content ontology design patterns) that can be independently applied in domain ontology design. This modularity promotes scalability and flexibility in modeling diverse domains.
    
- **Focus on Particulars:** DUL's domain of discourse is formed by particulars (instances), while properties and relations are considered universals. This approach influences how qualities and roles are handled, with qualities inhering in specific entities and roles being conceptualized as social concepts that can be temporarily acquired and lost.
    
- **Distinction between Endurants and Perdurants (Objects and Events):** DOLCE, and by extension DUL, fundamentally distinguishes between 'Endurants' (Objects) that are wholly present at any time they exist, and 'Perdurants' (Events) that unfold over time and are only partially present at any given moment. The `participation` relation connects these two categories.
    
- **Management of Qualities:** DUL handles qualities as particulars inhering in entities, which can be perceived and measured. It distinguishes between the individual quality itself and its "quale" (position within a quality space), enabling comparisons of similar qualities.
    
- **Modeling of Social Roles and Concepts:** Roles are formalized as a specialization of 'Concept' within the 'Non-Agentive Social Object' category. These are characterized as "anti-rigid" (dynamic properties) and "founded" (dependent on other roles or contexts). This allows for the representation of social entities and their dynamic nature within the ontology.
    

**Applications and Impact:**

DUL has been broadly applied across a wide range of domains, including e-learning, water quality systems, multimedia annotation, medicine, law, robotics, industry, cybersecurity, and disaster management. It has also been instrumental in improving existing semantic resources like DBpedia by identifying inconsistencies and enhancing the quality of lexical resources such as WordNet and Framester, a knowledge graph unifying linguistic databases under a frame semantics model. Its influence extends to various standards and de facto standards, including CIDOC CRM, SSN, and SAREF.

In essence, DUL provides a robust and flexible foundational ontology that effectively bridges the gap between cognitive models of reality and the demands of formal knowledge representation and semantic interoperability in computational systems.

## 4. Ontological Design Principles

- ✔️ **P1 – Reality-Oriented Categorization**  
  Domains are defined according to ontological categories present in reality (physical, biological, cognitive, social, representational) rather than epistemological disciplines.

- ✔️ **P2 – Process-Entity Separation**  
  Clear distinction between Entities (Objects) and Processes/Events, following the DUL model.

- ✔️ **P3 – Cognition-Informed Modeling**  
  The structure reflects how humans intuitively understand the world, including commonsense physics (space, time, causation), commonsense psychology (intentions, goals, beliefs), and social structures.

- ✔️ **P4 – Granularity and Modularity**  
  Each domain can be refined hierarchically into subdomains with increasing granularity without losing ontological coherence.

- ✔️ **P5 – Interoperability with Knowledge Graphs**  
  The design anticipates compatibility with semantic web standards (OWL, RDF) and knowledge graph technologies.

## 5. Commonsense Psychology as Ontological Foundation

### 5.1 Psychological Basis
The text on Commonsense Psychology (Heider, Gopnik, Malle, and others) introduces a crucial notion:  
**Humans do not organize their knowledge according to disciplines (such as 'natural sciences' or 'social sciences').**

Instead, humans cognitively organize the world in terms of:
- **Agents and Objects**
- **Intentions, Plans, Beliefs, Desires**
- **Actions, Events, and Consequences**
- **Space, Time, Causality, and Social Relations**

This insight directly aligns with empirical findings from cognitive psychology and cognitive semantics. Studies in **Theory of Mind**, **intentional attribution**, **event modeling**, and the **structuring of social roles** all demonstrate that human reasoning is deeply grounded in intuitive, frame-based, and relational representations of reality.

Research by Heider (1958), Gopnik and Wellman (1992), and Malle (2004) shows that humans universally apply commonsense psychological models to interpret both the physical and social world. For instance:
- Even minimal visual stimuli (such as geometric shapes moving in the Heider-Simmel experiment) are spontaneously 
  interpreted in terms of goals, intentions, emotions, and social interactions.
- Humans naturally infer causes, responsibilities, and mental states, without requiring formal knowledge or explicit learning.

### 5.2 Key Cognitive Structures Reflected in the Ontology
- **Agents vs. Objects:** A fundamental distinction in human cognition between entities that act intentionally and those that do not.
- **Intentional Actions vs. Natural Processes:** Humans distinguish between actions driven by goals, beliefs, and desires versus processes governed by physical laws.
- **Causal and Intentional Attribution:** Humans attribute causes not only in physical terms but also in social and mentalistic terms (e.g., blame, credit, motive).
- **Social Role Structuring:** Social cognition relies on understanding roles (e.g., parent, student, judge) that are context-dependent but universally modeled.
- **Mental State Encoding:** Beliefs, desires, emotions, perceptions, and intentions are cognitively real entities that guide social reasoning and communication.

These structures are not peripheral but are **core to human cognition and language**, and thus must be foundational to any ontology intended to model linguistic meaning or semantic cognition.

## 6.The Ontological Dimension: Core Structure

The Ontological Dimension is organized hierarchically into four levels:
1. **Domains** — High-level conceptual areas of knowledge. 
2. **Subdomains** — Thematic subdivisions within domains.
3. **Scenarios** — Conceptual models of situational contexts, processes, or events.
4. **Ontological Elements** — Context-specific ontological units within scenarios, including entities, events, states, qualities, and relations.
    
### 6.1. Domains

Domains are organized according to the major human experience, knowledge, and conceptualization. This implementation considers 9 fundamental domains that reflects a distinct dimension of reality, as perceived, conceptualized, and organized by human cognition and culture.

| **Fundamental Domain**      | **Definition**                                                                                                                                                                                                                                                                                 |
| --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Physical**                | The material world and its fundamental properties, including objects, matter, forces, energy, spatial configurations, and physical phenomena. Frames in this domain model physical entities, processes like motion or transformation, and physical states.                                     |
| **Biological**              | The domain of living organisms and biological systems, including anatomy, physiology, reproduction, growth, ecosystems, and evolutionary processes. Frames capture both micro-level (cells, organs) and macro-level (species, habitats) biological phenomena.                                  |
| **Social**                  | The realm of interpersonal relationships, institutions, social roles, norms, governance, economics, legal systems, and societal structures. This domain reflects how humans organize collective life and interactions.                                                                         |
| **Cultural**                | A specialized subdomain within Social, focusing on symbolic systems, traditions, rituals, arts, heritage, narratives, belief systems, and the transmission of cultural knowledge and identity.                                                                                                 |
| **Psychological**           | Pertains to perceptual, emotional, and affective experiences. Frames model sensations, perceptions (visual, auditory, tactile, etc.), emotions (fear, joy, anger), and subjective mental states related to the felt experience of individuals.                                                 |
| **Cognitive**               | Represents higher-order mental processes such as reasoning, memory, attention, decision-making, learning, problem-solving, planning, and belief formation. Frames here capture abstract thinking and intellectual activity.                                                                    |
| **Representational**        | The domain of abstract representations, including information, knowledge, data, symbolic systems, formal languages, computational processes, algorithms, digital communication, artificial intelligence, and models. It captures both technological and conceptual representations of reality. |
| **Space-Time** (Tranversal) | A cross-cutting domain capturing spatial and temporal structures: location, direction, movement, proximity, duration, sequence, periodicity, and temporal alignment. Space and time are inherent in many other domains but are treated as explicit semantic structures when needed.            |
| **Moral**                   | Concerned with values, norms, moral judgments, ethical principles, obligations, responsibilities, fairness, and justice. This domain intersects with social, cognitive, and legal domains but is defined distinctly when ethical reasoning or moral evaluation is central.                     |

Domains are implemented as the top-level nodes in the ontological hierarchy. Each domain contains a structured set of subdomains and scenarios that contextualize the domain's conceptual space.

### 6.2. Subdomains

Subdomains are thematic divisions within a domain that organize more specific areas of knowledge or activity. They refine the conceptual scope of a domain.
Subdomains inherit the ontological constraints of their parent domain but introduce more focused conceptual distinctions, preparing the structure for the definition of scenarios.

### 6.3. Scenarios

A Scenario is a conceptual model that represents a typical situation, event, practice, or script within a subdomain. It provides a structured cognitive schema that models the participants, processes, goals, and relationships involved in a specific context.
Each scenario has these key properties:
- Contextualized cognitive representations. 
- Serve as bridges between abstract ontology and usage-based semantics.
- Each scenario contains an internal micro-ontology that defines how the world is structured within that situational frame.
Scenarios are formalized as modular ontological units. They consist of:
- A set of **Ontological Elements**
- A network of **Relations** between those elements (structural, causal, temporal, spatial, functional, social, etc).

### 6.4. Ontological Elements (OE)

An **Ontological Element** is a context-dependent ontological unit that functions within the scope of a specific scenario. It may represent entities, events, processes, states, qualities or relations relevant to that scenario.
Elements are uniquely identified by the scenario context using the format:  
**`<scenario_name>:<element_name>`**  
This ensures clarity and avoids cross-scenario ambiguity while allowing reuse of common terms.
Ontological Elements are modeled as classes or subclasses from DUL ontology.
## 7. Advantages of this Model

- ✔️ **Cognitive alignment:** Mirrors how humans organize, perceive, and interpret events and interactions in the world.    
- ✔️ **Ontological clarity:** Provides formal definitions of conceptual structures while remaining adaptable to context.    
- ✔️ **Scalability:** Allows modular growth of the ontology as new scenarios are introduced.   
- ✔️ **Lexical independence with semantic linkage:** Decouples the world model (ontological) from the language model (lexical), but connects them robustly through the mapping of **Frame Elements to Ontological Elements**.    
- ✔️ **Flexibility:** Elements are local to scenarios, allowing for contextual differentiation without forcing artificial global consistency.
    
### 8. Conclusion

The **Ontological Dimension** of FN5 try to offer a powerful, formally structured, and cognitively grounded approach to knowledge representation. It resolves the long-standing tension between the fluid, usage-based nature of linguistic frames and the need for formal, interoperable ontologies. By organizing knowledge into Domains, Subdomains, Scenarios, and Ontological Elements, FN5 achieves a balance between conceptual rigor and semantic flexibility, paving the way for advanced applications in computational linguistics, knowledge engineering, and AI.
