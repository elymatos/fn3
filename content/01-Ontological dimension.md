# **Ontological Dimension**

## **1. Introduction**

The FN5 framework is built upon a fundamental dual-structure architecture composed of two independent yet interdependent dimensions: the **Ontological Dimension** and the **Lexical Dimension**.

- The **Ontological Dimension** models the conceptual structure of the world — entities, events, states, processes, qualities, and relations — as it is experienced and represented cognitively. It organizes knowledge into a coherent and scalable ontology.
    
- The **Lexical Dimension** represents how this conceptual structure is encoded in language through words, lexical units, and frames, capturing the linguistic realizations of meanings.
    

This separation addresses a well-known limitation in traditional FrameNet models: the inherent resistance of linguistic frames to formal ontological structuring. FN5 proposes a solution that preserves the rich, usage-based nature of frames while enabling a robust ontological backbone.

---

## **2. The Challenge of Ontological Formalization in Frames**

Traditional FrameNet frames are grounded in cognitive semantics and are designed to capture how language encodes experiential knowledge. While frames are highly effective for representing linguistic meaning, they are inherently:

- **Context-dependent**
    
- **Culturally situated**
    
- **Multidimensional**
    

Attempts to directly map frames into formal ontologies often fail due to their flexible, usage-driven nature, where the same frame can simultaneously represent actions, mental states, social practices, and abstract relations depending on context.

FN5 overcomes this challenge by **decoupling the ontological structure from the linguistic frames** while preserving a formalized connection between the two. This is achieved by organizing the ontological structure into a system of **domains, subdomains, scenarios, and elements**, and linking it to the lexical structure via **frame elements**.

---

## **3. The Ontological Dimension: Core Structure**

The Ontological Dimension is organized hierarchically into four levels:

1. **Domains** — High-level conceptual areas of knowledge.
    
2. **Subdomains** — Thematic subdivisions within domains.
    
3. **Scenarios (Scenario Frames)** — Conceptual models of situational contexts, processes, or events.
    
4. **Elements** — Context-specific ontological units within scenarios, including entities, events, states, qualities, and relations.
    

---

## **4. Domains**

### **Definition:**

Domains represent the highest conceptual categories in the ontological dimension, grouping broad areas of human knowledge, experience, and interaction.

### **Examples of Domains:**

- Natural Sciences
    
- Environment
    
- Social and Political Systems
    
- Actions and Social Interaction (a key domain formalizing common-sense psychology and human practices)
    
- Cognition and Communication
    
- Ontological Abstractions
    

### **Formalization:**

Domains are implemented as the top-level nodes in the ontological hierarchy. Each domain contains a structured set of subdomains and scenarios that contextualize the domain's conceptual space.

---

## **5. Subdomains**

### **Definition:**

Subdomains are thematic divisions within a domain that organize more specific areas of knowledge or activity. They refine the conceptual scope of a domain.

### **Examples:**

Within the domain **“Actions and Social Interaction”**, subdomains include:

- Physical and Pragmatic Actions
    
- Social and Interpersonal Actions
    
- Cognitive and Decision-Making Actions
    
- Emotional and Expressive Actions
    

### **Formalization:**

Subdomains inherit the ontological constraints of their parent domain but introduce more focused conceptual distinctions, preparing the structure for the definition of scenarios.

---

## **6. Scenarios (Scenario Frames)**

### **Definition:**

A Scenario is a conceptual model that represents a typical situation, event, practice, or script within a subdomain. It provides a structured cognitive schema that models the participants, processes, goals, and relationships involved in a specific context.

### **Key Properties:**

- Contextualized cognitive representations.
    
- Serve as bridges between abstract ontology and usage-based semantics.
    
- Each scenario contains an internal micro-ontology that defines how the world is structured within that situational frame.
    

### **Examples:**

- **Negotiation Scenario** — Models participants (agents), offers, concessions, and agreements.
    
- **Interpersonal Conflict Scenario** — Models agents, causes of conflict, escalation, resolution, and outcomes.
    
- **Expression of Emotion Scenario** — Models emotional states, agents, expressions, and social consequences.
    

### **Formalization:**

Scenarios are formalized as modular ontological units. They consist of:

- A set of **Elements** (ontological components).
    
- A network of **Relations** between those elements (structural, causal, temporal, spatial, functional, or social).
    

---

## **7. Elements**

### **Definition:**

An **Element** is a context-dependent ontological unit that functions within the scope of a specific scenario. It may represent an entity, event, process, state, quality, or relation relevant to that scenario.

### **Naming Convention:**

Elements are uniquely identified by the scenario context using the format:  
**`<scenario_name>:<element_name>`**  
This ensures clarity and avoids cross-scenario ambiguity while allowing reuse of common terms.

### **Types of Elements:**

- **@entity** — Physical or abstract participants (Agent, Instrument, Location).
    
- **@event / @process** — Actions or processes (Negotiation, Emotional Expression).
    
- **@state** — Situational conditions or statuses (Agreement, Conflict State).
    
- **@quality** — Attributes or properties (Trust Level, Intensity).
    
- **@relation** — Structural or functional links between elements (Agent → Performs → Action).
    

### **Example (Negotiation Scenario):**

|Element|Type|Description|
|---|---|---|
|Negotiation:Agent1|@entity|One of the negotiating parties|
|Negotiation:Agent2|@entity|The other negotiating party|
|Negotiation:Offer|@event|A proposal made during negotiation|
|Negotiation:Concession|@event|A compromise adjustment|
|Negotiation:Agreement|@state|The achieved final agreement|
|Negotiation:Trust_Level|@quality|The trust level between the agents|

---

## **8. Advantages of this Model**

- ✔️ **Cognitive alignment:** Mirrors how humans organize, perceive, and interpret events and interactions in the world.
    
- ✔️ **Ontological clarity:** Provides formal definitions of conceptual structures while remaining adaptable to context.
    
- ✔️ **Scalability:** Allows modular growth of the ontology as new scenarios are introduced.
    
- ✔️ **Lexical independence with semantic linkage:** Decouples the world model (ontological) from the language model (lexical), but connects them robustly through the mapping of **Frame Elements to Ontological Elements**.
    
- ✔️ **Flexibility:** Elements are local to scenarios, allowing for contextual differentiation without forcing artificial global consistency.
    

---

## **9. Conclusion**

The **Ontological Dimension** of FN5 offers a powerful, formally structured, and cognitively grounded approach to knowledge representation. It resolves the long-standing tension between the fluid, usage-based nature of linguistic frames and the need for formal, interoperable ontologies. By organizing knowledge into Domains, Subdomains, Scenarios, and Elements, FN5 achieves a balance between conceptual rigor and semantic flexibility, paving the way for advanced applications in computational linguistics, knowledge engineering, and AI.

---

Se desejar, posso gerar este texto já formatado em Markdown, DOCX ou PDF para compor diretamente a documentação formal do projeto FN5. 🚀 **Avançamos?**