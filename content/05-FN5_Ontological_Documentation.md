# FN5 Ontological Dimension: Conceptual Model and Design Principles

## 1. Introduction
This document presents the ontological model adopted for the Ontological Dimension of the FN5 project. 
The goal is to establish a rigorous, cognitively plausible, and formally grounded organization of domains 
and subdomains that serves as the backbone for frame creation, knowledge representation, and semantic modeling.

The proposed structure deliberately departs from traditional epistemological taxonomies (e.g., science-based 
or knowledge-based classifications) and instead embraces a functional ontological architecture, reflecting 
how entities, processes, events, states, and relations are organized in both the real world and human cognition.

The design draws directly from three pillars:
- Formal ontologies, specifically the DUL (Descriptive Ontology for Linguistic and Cognitive Engineering) 
  and the SIMPLE ontology.
- The theoretical framework of Frame Semantics.
- Cognitive models derived from Commonsense Psychology, particularly the work of Heider (1958), Malle (2004), 
  Gopnik (1992), and others.

## 2. Philosophical and Cognitive Foundations

### 2.1 From Epistemology to Ontology
The classification of knowledge into scientific domains (e.g., Natural Sciences, Social Sciences) reflects 
an epistemological bias, useful for organizing human knowledge but inadequate for modeling how reality itself is structured.

This ontological model shifts focus from how humans categorize knowledge to how entities, events, and relations 
manifest in the world and how they are experienced, perceived, and linguistically represented by humans.

This transition aligns with:
- The principles of ontological realism (Guarino, 1998; DUL framework).
- The cognitive organization of experience, as supported by Frame Semantics and research in commonsense psychology.

## 3. Formal Ontological Foundations

### 3.1 Alignment with DUL
DUL provides an ontological backbone based on the distinction between:
- **Endurants (Objects)** – Entities that persist over time (physical objects, agents, institutions).
- **Perdurants (Events and Processes)** – Entities that unfold over time (actions, events, procedures).
- **Social Objects** – Roles, norms, contracts, institutions.
- **Information Objects** – Linguistic expressions, symbols, digital entities.
- **Situations** – Configurations of entities and relations contextualized in time and space.

### 3.2 Alignment with SIMPLE
SIMPLE provides a semantically motivated taxonomy where entities are classified according to:
- **Entity types**: Physical, Biological, Artifact, Abstract, Social, Event, Process, State, Relation.
- **Qualia roles**: Formal (category identity), Constitutive (composition), Telic (purpose/function), Agentive (origin/creation).

This model is integrated by:
- Distinguishing between entities and the processes they participate in.
- Explicitly encoding functional and intentional roles, aligned with commonsense reasoning.

## 4. Ontological Design Principles

- ✔️ **P1 – Reality-Oriented Categorization**  
  Domains are defined according to ontological categories present in reality (physical, biological, cognitive, 
  social, representational) rather than epistemological disciplines.

- ✔️ **P2 – Process-Entity Separation**  
  Clear distinction between Entities (Objects) and Processes/Events, following the DUL model.

- ✔️ **P3 – Cognition-Informed Modeling**  
  The structure reflects how humans intuitively understand the world, including commonsense physics (space, time, causation), 
  commonsense psychology (intentions, goals, beliefs), and social structures.

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

This insight directly aligns with empirical findings from cognitive psychology and cognitive semantics. 
Studies in **Theory of Mind**, **intentional attribution**, **event modeling**, and the **structuring of social roles** all 
demonstrate that human reasoning is deeply grounded in intuitive, frame-based, and relational representations of reality.

Research by Heider (1958), Gopnik and Wellman (1992), and Malle (2004) shows that humans universally apply 
commonsense psychological models to interpret both the physical and social world. For instance:
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

## 6. Resulting Ontological Model: Domain Taxonomy

| Domain                          | Subdomains |
|----------------------------------|-------------|
| Space                            | Physical Space, Geographic Locations, Built Environments, Abstract Space, Virtual Space |
| Time and Calendar                | Time Intervals, Calendar Systems, Periodicity, Temporal Landmarks |
| Physical Entities                | Natural Objects, Man-made Artifacts, Materials, Living Spaces |
| Biological Entities              | Organisms, Body Parts, Biological Groups, Microorganisms |
| Cognitive Entities               | Mental States, Knowledge Structures, Concepts, Memory Traces, Mental Models |
| Social Entities                  | Individuals, Social Roles, Groups, Institutions, Communities |
| Representational Entities        | Linguistic Objects, Visual Symbols, Digital Artifacts, Semiotic Systems |
| Natural Processes                | Physical Processes, Geological, Meteorological, Astronomical |
| Biological Processes             | Physiological, Growth, Reproduction, Adaptation |
| Cognitive Processes              | Perception, Reasoning, Decision-Making, Memory, Learning, Problem-Solving |
| Commonsense Psychology Processes | Attribution, Theory of Mind, Emotional Inference, Action Explanation, Perspective-Taking |
| Communicational Processes        | Speech Acts, Text Production, Visual Communication, Digital Communication |
| Social Processes                 | Interpersonal Interaction, Group Dynamics, Social Influence, Rituals, Norm Enforcement |
| Institutional Processes          | Legal, Political, Educational, Healthcare, Bureaucratic Procedures |
| Economic Processes               | Production, Trade, Consumption, Financial Transactions, Investment |
| Cultural Processes               | Artistic Creation, Performance, Rituals, Heritage Preservation |
| Causal and Dynamic Relations     | Causation, Enablement, Inhibition, Contingency, Regulation |
| Spatial Relations                | Containment, Adjacency, Orientation, Proximity, Distance |
| Temporal Relations               | Sequence, Simultaneity, Duration, Temporal Overlap, Cyclic Patterns |
| Social Relations                 | Kinship, Friendship, Authority, Ownership, Legal Relations |
| States and Attributes            | Physical, Biological, Cognitive, Emotional, Social, Institutional States |
| Events                           | Simple Events, Complex Events, Planned Events, Emergent Events |

## 7. Conclusion
This ontological design for the FN5 project embodies:
- A shift from epistemological taxonomies to a reality-centered, cognitively informed ontology.
- A formal alignment with DUL and SIMPLE ontology structures.
- A deep integration of the cognitive models derived from Commonsense Psychology, ensuring that the ontology not 
only reflects the structure of the world but also how humans experience, interpret, and linguistically express that structure.
