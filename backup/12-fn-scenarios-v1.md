
### 🔁 **1. Recognize the Distinction: Ontology vs. Application**

- **FN5 Domains** (e.g., Physical, Social, Biological) are **ontological categories**: they aim to model **how reality is structured and conceptualized** by humans at a cognitive level. This is not about fields of knowledge but about **recurrent dimensions of human experience**, like “social interaction” or “biological function”.
    
- **FN-Br Domains** like “tourism” or “violence” are **epistemic or thematic domains**: they group frames according to **discursive contexts** or **real-world application areas**, often for pragmatic, pedagogical, or project-specific reasons.
    

Thus, they serve **different purposes**: ontology structures **how we think and experience**, while thematic domains structure **where and how we use language**.

---

### 🧩 **2. Use Thematic Domains as Cross-Cutting Application Layers**

Instead of discarding the FN-Br thematic domains, **reframe them as "application layers" or "usage scenarios"** that:

- **cut across multiple ontological subdomains**, and
    
- **activate or combine frames from different cognitive areas**.
    

Example:

- **Tourism** combines:
    
    - Physical Domain: _Location_, _Motion_, _Weather_
        
    - Social Domain: _Institutions_, _Services_, _Social Roles_
        
    - Representational Domain: _Media_, _Communication_
        

This way, “tourism” is not a domain itself, but a **complex scenario** or **macro-frame** built **on top of multiple ontological structures**.

---

### 🧠 **3. Leverage Scenarios as the Bridge**

In FN5, **scenarios** are the operational level that integrates:

- **Ontological elements** (entities, events, roles, etc.)
    
- **FrameNet-style lexical frames** (evoked by LUs)
    

You can map a traditional FN-Br domain like “health” into multiple **FN5 scenarios**, each belonging to different subdomains:

- _Health and Illness_ (Biological Domain)
    
- _Healthcare Institutions_ (Social Domain)
    
- _Diagnostic Processes_ (Cognitive and Representational Domains)
    

This **modular and granular scenario mapping** allows thematic coherence **without violating ontological rigor**.

---

### 🔄 **4. Proposed Integration Strategy**

|FN-Br Domain (Epistemic)|FN5 Scenarios|FN5 Domains/Subdomains|
|---|---|---|
|Tourism|Travel Booking, Hotel Stay, Sightseeing, Transport Use|Social: Services / Representational: Signs / Space-Time: Motion|
|Gastronomy|Meal Preparation, Eating, Ingredients Handling|Biological: Physiology / Social: Cultural Practices|
|Violence|Physical Assault, Armed Conflict, Legal Proceedings|Physical: Force / Social: Conflict and Law|
|Health|Diagnosis, Recovery, Symptom Observation|Biological: Health and Illness / Representational: Information Structures|

This is a crucial point in aligning practical FrameNet development with a rigorous ontological foundation. The perceived struggle arises from a common distinction between epistemological (knowledge-based, application-oriented) and ontological (reality-based, foundational) categorizations. The FN5 framework explicitly shifts "From Epistemology to Ontology", grounding its domains in how reality is fundamentally structured and cognitively experienced, rather than in disciplinary or application-specific silos like "tourism" or "health".

Here's how to reconcile the two views within the FN5 framework:

### 1. Understanding the Nature of Each Domain Type

- **FN5 Ontological Domains (e.g., Physical, Social, Cognitive):** These are foundational categories designed to model the inherent structure of the world as perceived and conceptualized by humans. They represent high-level conceptual areas of reality, such as "The material world and its fundamental properties" (Physical) or "The realm of interpersonal relationships, institutions, social roles" (Social). These are stable, cross-cutting dimensions of existence.
- **FrameNet Brasil Domains (e.g., Tourism, Sports, Gastronomy, Health):** These are best understood as **complex, application-specific Scenarios** or **macro-situations** rather than fundamental ontological domains. They are human-constructed contexts that integrate elements from multiple underlying ontological dimensions. For instance, "Health" involves biological processes, physical states, psychological experiences, social interactions, and cultural beliefs. "Tourism" involves physical travel, economic transactions, cultural experiences, and cognitive planning.

### 2. Leveraging FN5's Hierarchical Structure and D&S Framework

The FN5 framework is designed to manage this integration through its layered architecture and the Descriptive Ontology for Linguistic and Cognitive Engineering (DUL), particularly the Descriptions and Situations (D&S) framework.

Your "generic domains" (e.g., tourism, sports) can be formally modeled as follows:

1. **Scenarios as Complex Situations:** These "domains" should be treated as **Scenarios** within the FN5 Ontological Dimension. A Scenario is a "conceptual model that represents a typical situation, event, practice, or script". They function as "micro-ontologies" that define how the world is structured within that specific context.
    
    - For example, 'Tourism' can be a Scenario. Within this 'Tourism' scenario, you would define specific **Ontological Elements (OEs)** and **Relations** relevant to it.
2. **Drawing from Fundamental Domains:** The **Ontological Elements (OEs)** within these scenarios will draw from the **fundamental FN5 domains and subdomains**.
    
    - **Example: 'Tourism' Scenario**
        - **Physical Domain:** `Tourism:Transportation` (Motion and Location, Manipulation and Interaction with Objects), `Tourism:Accommodation` (Matter and Substances, Spatial Configuration).
        - **Social Domain:** `Tourism:Tourists` (Social Roles and Identities), `Tourism:Tour_Operators` (Institutions and Organizations), `Tourism:Travel_Costs` (Economic and Commercial Practices).
        - **Cultural Domain:** `Tourism:Cultural_Sites` (Heritage and Identity, Arts and Creative Practices), `Tourism:Local_Traditions` (Rituals and Traditions).
        - **Cognitive Domain:** `Tourism:Travel_Planning` (Decision-Making and Planning, Intention and Goal-Oriented Action).
        - **Space-Time Domain:** `Tourism:Itinerary` (Temporal Structure, Motion and Trajectory).
3. **D&S Framework for Contextualization:** The D&S framework, integrated into DUL, provides the formal mechanism to model these complex scenarios.
    
    - A 'Tourism' scenario could be formally represented as a **Situation** (a DUL class). This `Situation` "satisfies" a **Description** (also a DUL class) that explicitly outlines the conceptualization of 'Tourism'. This `Description` would define the roles, parameters, and typical events within the 'Tourism' context, drawing from the general categories of DUL (e.g., `Object`, `Event`, `Role`, `Parameter`).
    - This approach aligns with the FN5 principle of "decoupling the ontological structure from the linguistic frames while preserving a formalized connection". The linguistic frames in FrameNet Brasil would still capture the usage-based aspects of "tourism" vocabulary, but their underlying semantic structures would be mapped to these precisely defined, DUL-aligned scenarios.

### 3. Practical Implications

- **Mapping, not Replacement:** You are not replacing the FrameNet Brasil domains. Instead, you are providing a deeper, more granular ontological grounding for them.
- **Frame Elements to Ontological Elements:** The core of the integration lies in mapping **Frame Elements** from your existing frames to the **Ontological Elements** defined within your FN5 Scenarios.
- **Enhanced Interoperability:** By mapping these high-level, application-specific domains to a foundational ontology like DUL through structured scenarios, you enhance interoperability. Data modeled in a 'Health' scenario can be formally integrated with data from a 'Social Services' scenario if both draw from the same underlying 'Social' or 'Biological' domain OEs.
- **Cognitive Plausibility:** This approach maintains cognitive plausibility, as humans indeed understand broad domains like "health" as emergent from the interplay of more fundamental aspects of reality (e.g., biological functions, psychological states, social roles).

In summary, the FrameNet Brasil "domains" are valuable conceptual groupings that should be formalized as **Scenarios** within the FN5 Ontological Dimension. These scenarios then serve as the bridge, allowing the specific **Ontological Elements** within them to be classified and related according to the foundational FN5 domains and DUL categories. This maintains the utility of your existing domain focus while providing the rigorous, interoperable ontological backbone of FN5.