---
title: 01.3 Core structure
---

# The Ontological Dimension: Core Structure

The Ontological Dimension is organized hierarchically into four levels:
1. **Domains** — High-level conceptual areas of knowledge. 
2. **Subdomains** — Thematic subdivisions within domains.
3. **Scenarios** — Conceptual models of situational contexts, processes, or events.
4. **Ontological Elements** — Context-specific ontological units within scenarios, including entities, events, states, qualities, and relations.
    
### Domains

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

### Subdomains

Subdomains are thematic divisions within a domain that organize more specific areas of knowledge or activity. They refine the conceptual scope of a domain.
Subdomains inherit the ontological constraints of their parent domain but introduce more focused conceptual distinctions, preparing the structure for the definition of scenarios.

### Scenarios

A Scenario is a conceptual model that represents a typical situation, event, practice, or script within a subdomain. It provides a structured cognitive schema that models the participants, processes, goals, and relationships involved in a specific context.
Each scenario has these key properties:
- Contextualized cognitive representations. 
- Serve as bridges between abstract ontology and usage-based semantics.
- Each scenario contains an internal micro-ontology that defines how the world is structured within that situational frame.
Scenarios are formalized as modular ontological units. They consist of:
- A set of **Ontological Elements**
- A network of **Relations** between those elements (structural, causal, temporal, spatial, functional, social, etc).

### Ontological Elements (OE)

An **Ontological Element** is a context-dependent ontological unit that functions within the scope of a specific scenario. It may represent entities, events, processes, states, qualities or relations relevant to that scenario.
Elements are uniquely identified by the scenario context using the format:  
**`<scenario_name>:<element_name>`**  
This ensures clarity and avoids cross-scenario ambiguity while allowing reuse of common terms.
Ontological Elements are modeled as classes or subclasses from DUL ontology.