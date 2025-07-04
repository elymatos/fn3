# 🧭 Directive: Thematic Domains as Ontologically Grounded Scenarios in FN5

## 1. Distinguishing Ontological and Epistemic Classifications

- **FN5 Domains** are **ontological categories** that represent the fundamental dimensions of human experience and conceptualization (e.g., *Physical*, *Biological*, *Social*, *Cognitive*, *Space-Time*).
- **FrameNet Brasil Domains** (e.g., *Tourism*, *Violence*, *Health*) are **thematic or epistemic groupings** focused on practical application contexts.

> ✅ These two systems serve different purposes:
> - **FN5 Domains** model *how reality is structured*.
> - **FN-Br Domains** model *how we talk about reality* in contextualized usage.
> This distinction is critical for LLMs, as it provides a structured, predictable ontological backbone, reducing ambiguity and enabling more consistent and robust semantic processing compared to fluid, usage-based lexical frames alone.

---

## 2. Modeling Thematic Domains as FN5 Scenarios

- Each thematic domain from FrameNet Brasil should be treated as a **Scenario** in FN5.
- A **Scenario** is a structured, context-specific conceptual model built from:
  - **Ontological Elements (OEs)** drawn from FN5 domains and subdomains. These OEs are contextualized within the scenario, following the naming convention `<scenario_name>:<element_name>` (e.g., `Tourism:Location`, `Health:Patient`) to ensure semantic distinctness and avoid cross-scenario ambiguity.
  - **Relations** among these elements.
  - **Lexical Frames** (FrameNet-style), which map to the scenario through their Frame Elements.

> 💡 Use the **Descriptions and Situations (D&S)** pattern from DUL to formally structure these scenarios:
> - `Description`: The abstract schema of the thematic domain (e.g., *Tourism*).
> - `Situation`: An instantiation of that schema, representing a concrete, unique occurrence of the thematic domain's dynamics (e.g., *a specific hotel check-in event on June 1st, 2025, involving John Doe at Hilton Hotel*).

---

## 3. Decomposing Thematic Scenarios Across FN5 Domains

Thematic scenarios (e.g., *Tourism*, *Health*) are **cross-domain constructs** composed of elements from multiple FN5 domains.

### 🧳 Example: Tourism Scenario

| FN5 Domain        | Ontological Elements                                |
|-------------------|-----------------------------------------------------|
| Physical          | Location, Transportation, Accommodation             |
| Social            | Tourists, Guides, Travel Services, Institutions     |
| Cultural          | Heritage Sites, Local Traditions                    |
| Cognitive         | Travel Planning, Decision-Making                    |
| Representational  | Travel Documents, Maps, Signs                       |
| Space-Time        | Itineraries, Temporal Phases of Travel              |

---

### 🩺 Example: Health Scenario

| FN5 Domain        | Ontological Elements                                |
|-------------------|-----------------------------------------------------|
| Biological        | Illness, Recovery, Bodily Functions                 |
| Social            | Patients, Doctors, Hospitals                        |
| Cognitive         | Symptom Recognition, Mental States                  |
| Representational  | Medical Records, Prescriptions                      |

---

## 4. Integration and Mapping Strategy

-   **Lexical Frames** remain language-focused and usage-based.
-   **Frame Elements** from these frames are mapped to **Ontological Elements (OEs)** within the Scenario.
-   This mapping enables:
    -   Ontological formalization of thematic domains.
    -   Interoperability across scenarios.
    -   Reusability of frames in different contexts.

> 🔁 Existing FN-Br frames are **not replaced**, but **restructured and grounded** via FN5 scenarios.

---

## 5. Benefits of This Approach

| Benefit                   | Description                                                                 |
|---------------------------|-----------------------------------------------------------------------------|
| ✅ Conceptual Coherence    | Thematic domains are built from a common ontological foundation             |
| ✅ Cognitive Plausibility  | Reflects how humans experience complex domains as multidimensional contexts |
| ✅ Interoperability        | Enables cross-domain reasoning and integration (e.g., Health ↔ Social Care) |
| ✅ Extendability           | New thematic domains = new scenarios from reusable FN5 building blocks      |

---

## 6. Summary Table

| Aspect                 | FrameNet Brasil           | FN5 Framework                          |
|------------------------|---------------------------|----------------------------------------|
| Domain Type            | Thematic / Epistemic      | Ontological / Foundational             |
| Examples               | Tourism, Gastronomy, Health | Physical, Social, Cognitive, etc.      |
| Organizational Unit    | Domain                    | Scenario                               |
| Semantic Model         | Lexical (Usage-based)     | Ontological (DUL/D&S) anchored to Lexical |
| Mapping Strategy       | Manual grouping           | Scenarios with OE–FE mappings          |
| Integration Level      | Language-centric          | Ontology-centric with lexical anchoring|

---

## 7. LLM Task Directives

**For each given FrameNet Brasil thematic domain (e.g., Tourism, Health):**

1.  **Define the Scenario:** Provide a brief descriptive text for the thematic domain, explicitly labeling it as a 'Scenario'. This description should capture the core cognitive schema of the situation.
2.  **Identify Ontological Elements (OEs):** Brainstorm and list key entities, events, states, qualities, and relations that compose this scenario. For each OE, identify its primary classification as `@entity`, `@event`, `@state`, `@quality`, or `@relation`. Then, identify its most fitting FN5 Ontological Domain/Subdomain. Apply the `<scenario_name>:<element_name>` naming convention.
3.  **Propose Core Relations:** For the identified OEs, propose essential relations between them that define the scenario's structure and dynamics. These relations should be expressed in natural language first, indicating their type (e.g., `structural`, `causal`, `temporal`, `functional`, `social`, `cognitive`).
4.  **Illustrate D&S Application:** Briefly explain how this specific scenario aligns with the D&S framework, identifying its potential `Description` (abstract schema) and examples of `Situations` (concrete instances).
5.  **Suggest Lexical Frame Mappings:** For the scenario, provide examples of typical FrameNet lexical frames related to it and suggest how their Frame Elements (FEs) would map to the newly defined Ontological Elements (OEs).