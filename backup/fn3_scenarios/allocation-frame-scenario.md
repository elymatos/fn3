# FN3 Frame and Scenario Allocation Methodology: An Interactive Approach

## 1. Introduction

This document outlines the proposed methodology for the allocation of new and existing frames within the FrameNet Brasil (FN3) network, with a particular focus on the integration and creation of "scenario frames." This methodology aims to streamline the frame creation and allocation process, ensuring conceptual coherence, enhancing network coverage, and leveraging automation through a user-friendly, question-driven interface.

The methodology is designed to address the three main goals for the use of scenario frames in FN3:
1.  **Grouping related frames:** To allow the grouping of related frames based on a common or general theme.
2.  **Positioning new frames:** To provide clues about where in the network a new frame must be positioned and which are its possible relations with other frames.
3.  **Increasing network coverage:** To make clear what areas of the network must be completed to increase the coverage of FrameNet as a lexical-computational resource.

This approach is grounded in the principles of Frame Semantics and draws significantly from the structured overview of Common Sense Psychology concepts by Hobbs, as detailed in the "Common Sense Psychology to FN3 Scenario Mapping Worksheet."

## 2. Theoretical Foundations

### 2.1. FN3 Hierarchical Structure

FN3 organizes its network into a multilevel hierarchy:
* **Domains** may contain **subdomains**.
* **Domains** are composed of **scenarios**.
* A **scenario** consists of multiple **situations** and **entities**.
* **Situations** and **entities** are represented by **frames**.
* A **scene** occurs in **scenario** as a container for **situations/entities**.
* A **frame** denotes an Entity or a specific **type of situation** (Event, Process, State, Relation, Attribute).

### 2.2. Frame Typology

FN3 adopts six primary semantic types for frames:
* **Entity Frames:** Represent objects, people, places, and abstract referents.
* **Event Frames:** Capture dynamic situations involving change over time, interaction, or sequences of operations.
* **Process Frames:** A subclass of events emphasizing temporal unfolding and internal phases.
* **State Frames:** Represent static conditions that hold over time without internal change.
* **Attribute Frames:** Define properties or qualitative aspects of entities or situations.
* **Relation Frames:** Establish structural or functional links between entities or events.

A key aspect is that scenario frames, unlike these six types, are designed to *group* different types of frames rather than fitting into a single type themselves.

### 2.3. Core Principles for Frame Creation (Adapted for Scenarios)

The methodology adheres to the core principles for frame creation in FN3, adapted to acknowledge the composite nature of scenarios:
* **Frame-Centric Semantics:** Scenarios are _situated conceptual wholes_, grouping related frames.
* **Situation Grounding:** Every scenario must be grounded in a prototypical situation, event, or cognitive script, making it mentally imageable and relatable to experience.
* **Minimality and Distinctiveness (of Constituents):** Scenarios should define a minimal necessary set of core constituent frames for coherence.
* **Valence Evidence and Corpus-Based Validation:** Definitions should be anchored in actual linguistic behavior.
* **Inheritance Structure:** New scenarios should inherit structure from existing general scenarios where applicable.
* **Perspective Sensitivity:** Scenarios can represent specific perspectives on a situation.
* **Cognitive Embeddability:** A valid scenario should be mentally imageable and learnable by humans.
* **Computational Alignment:** The process should be structured to allow for semi-automatic guidance by language models.

### **3. Methodology for Frame and Scenario Allocation: An Interactive Approach**

This methodology proposes a web-interface-driven approach where users answer a series of common-sense questions to guide the frame and scenario allocation process. A background inference engine will use these answers to suggest the most probable frame types and relevant scenarios, ensuring conceptual coherence, enhancing network coverage, and leveraging automation.

The approach is grounded in the principles of Frame Semantics and draws significantly from the structured overview of Common Sense Psychology concepts by Hobbs, as detailed in the "Common Sense Psychology to FN3 Scenario Mapping Worksheet."

### 3.1. Overview of the Interactive Flow

The process begins when a user wants to define a new frame or allocate an existing frame. The interface will present a series of questions, moving from broad conceptual distinctions to more specific situational characteristics.

**Entry Point:** User interacts with the FN3 system to define/allocate a frame for a Lexical Unit (LU) or conceptual phenomenon.

**Phase 1: Frame Type Identification** The system asks questions to infer the most probable FN3 Frame Type (Entity, Event, Process, State, Attribute, Relation).

**Phase 2: Generic Common-Sense Scenario Identification** Based on the characteristics described, the system asks questions to identify relevant generic common-sense scenario(s) that the frame participates in or helps define. This phase leverages the structured knowledge from the "Common Sense Psychology to FN3 Scenario Mapping Worksheet."

**Phase 3: Domain Scenario Allocation & Creation** This crucial phase determines if the frame and its generic scenario context belong to a specific domain, and whether an existing or new domain scenario is appropriate. This phase also formalizes the hierarchical relationship between generic and domain-specific conceptualizations.

**Phase 4: Network Integration and Refinement** The system suggests the frame type and relevant scenarios, prompting the user for confirmation or further refinement. If a new scenario is identified, the system guides its definition.

### 3.2. Detailed Question Sets and Inference Logic

The inference engine operates by assigning "weights" to different frame types and scenarios based on the user's selected answers. A higher cumulative score indicates a stronger probability.

#### 3.2.1. Frame Type Identification Questions

These questions are designed to discriminate between the six primary FN3 frame types based on their fundamental definitions.

* **Q1.0: Does the concept you are describing primarily refer to:**
    * **Option A:** A *thing*, a persistent object, person, place, or abstract concept that exists over time?
        * **Suggests:** `Entity` frame
        * **Weight if chosen:** `Entity`: +3
    * **Option B:** *Something that happens*, *unfolds*, or describes a *condition* or *relationship* over time?
        * **Suggests:** `Situation` (Event, Process, State, Attribute, Relation)
        * **Weight if chosen:** `Event`: +1, `Process`: +1, `State`: +1, `Attribute`: +1, `Relation`: +1

* **Q1.1: If Q1.0.B (Situation) was chosen: Does it primarily describe something that involves *change*, *action*, or *a sequence of operations*?**
    * **Option A:** Yes (It is dynamic)
        * **Suggests:** `Event`, `Process`
        * **Weight if chosen:** `Event`: +2, `Process`: +2, `State`: -1, `Attribute`: -1, `Relation`: -1
    * **Option B:** No (It is static, a condition, property, or relationship)
        * **Suggests:** `State`, `Attribute`, `Relation`
        * **Weight if chosen:** `Event`: -1, `Process`: -1, `State`: +2, `Attribute`: +2, `Relation`: +2

* **Q1.2: If Q1.1.A (Dynamic) was chosen: Does it emphasize a *transformation*, *transition*, or a *continuous unfolding* with stages?**
    * **Option A:** Yes (It's a process)
        * **Suggests:** `Process`
        * **Weight if chosen:** `Process`: +3, `Event`: +1
    * **Option B:** No (It's a more punctual action, an occurrence, or a sequence of distinct changes)
        * **Suggests:** `Event`
        * **Weight if chosen:** `Event`: +3, `Process`: +1

* **Q1.3: If Q1.1.B (Static) was chosen: Does it describe:**
    * **Option A:** A *quality*, *characteristic*, or *measurable property* of something (e.g., its size, color, importance, brokenness)?
        * **Suggests:** `Attribute`
        * **Weight if chosen:** `Attribute`: +3, `State`: +1, `Relation`: +1
    * **Option B:** A *link*, *connection*, or *interdependency* between two or more things (e.g., cause-effect, part-whole, similarity)?
        * **Suggests:** `Relation`
        * **Weight if chosen:** `Relation`: +3, `State`: +1, `Attribute`: +1
    * **Option C:** A *stable condition*, *status*, or *arrangement* that persists, without inherently changing or linking multiple things (e.g., ownership, health, emotional disposition)?
        * **Suggests:** `State`
        * **Weight if chosen:** `State`: +3, `Attribute`: +1, `Relation`: +1

#### 3.2.2. Scenario Identification Questions

These questions directly probe the characteristics that define the common-sense scenarios documented in the "Common Sense Psychology to FN3 Scenario Mapping Worksheet." Users can select multiple options, contributing to the score of relevant scenarios.

**Scenario Weighting Scale (for options in Q2.x questions):**
* **+3:** Strong indication for this scenario.
* **+2:** Moderate indication.
* **+1:** Weak/indirect indication or common across many.
* **-1:** Negative indication (less likely).

* **Q2.0: Does the concept involve someone's internal thoughts, understanding, desires, or feelings? (Select all that apply)**
    * **Option A:** Forming, changing, or updating an understanding of a fact or situation.
        * **Suggests:** `Belief_State_Management_Scenario`: +3, `Knowledge_Acquisition_and_Application_Scenario`: +2
    * **Option B:** Acquiring verified information, learning, or applying facts.
        * **Suggests:** `Knowledge_Acquisition_and_Application_Scenario`: +3, `Belief_State_Management_Scenario`: +1, `Information_Retention_and_Recall_Scenario`: +1
    * **Option C:** Wanting something, having a goal, or being motivated towards an outcome.
        * **Suggests:** `Motivation_and_Goal_Setting_Scenario`: +3, `Goal_Directed_Action_Scenario`: +2
    * **Option D:** Deciding to act, committing to a plan, or having a specific aim.
        * **Suggests:** `Goal_Directed_Planning_Scenario`: +2, `Goal_Directed_Action_Scenario`: +3
    * **Option E:** Experiencing emotions like joy, anger, fear, or sadness.
        * **Suggests:** `Emotional_Experience_Scenario`: +3
    * **Option F:** Storing, remembering, or recalling past information or experiences.
        * **Suggests:** `Information_Retention_and_Recall_Scenario`: +3, `Belief_State_Management_Scenario`: +1, `Knowledge_Acquisition_and_Application_Scenario`: +1

* **Q2.1: Does the concept involve someone *actively doing something* or making something happen in the world? (Select all that apply)**
    * **Option A:** Performing a deliberate physical or mental act to achieve a purpose.
        * **Suggests:** `Agentive_Behavior_Scenario`: +3, `Goal_Directed_Action_Scenario`: +2
    * **Option B:** Devising a plan, strategy, or sequence of steps to reach a goal.
        * **Suggests:** `Goal_Directed_Planning_Scenario`: +3, `Goal_Directed_Action_Scenario`: +2
    * **Option C:** One event, action, or state directly leading to another specific outcome.
        * **Suggests:** `Causal_Event_Chain_Scenario`: +3, `Agentive_Behavior_Scenario`: +1
    * **Option D:** The overall process of an agent acting purposefully from desire to outcome.
        * **Suggests:** `Goal_Directed_Action_Scenario`: +3, `Agentive_Behavior_Scenario`: +1, `Motivation_and_Goal_Setting_Scenario`: +1, `Goal_Directed_Planning_Scenario`: +1

* **Q2.2: Does the concept involve interaction with others or exchange of information? (Select all that apply)**
    * **Option A:** Someone sending or receiving a message, speaking, or communicating information.
        * **Suggests:** `Information_Exchange_Scenario`: +3, `Perceptual_Information_Acquisition_Scenario`: +1, `Social_Commitment_and_Interaction_Scenario`: +1
    * **Option B:** Someone acquiring information about the world through their senses (seeing, hearing, touching, etc.).
        * **Suggests:** `Perceptual_Information_Acquisition_Scenario`: +3, `Belief_State_Management_Scenario`: +2
    * **Option C:** Making promises, agreements, or dealing with social responsibilities/obligations.
        * **Suggests:** `Social_Commitment_and_Interaction_Scenario`: +3, `Information_Exchange_Scenario`: +2

* **Q2.3: Does the concept primarily describe the context, setting, or fundamental underlying relationships? (Select all that apply)**
    * **Option A:** The location, arrangement, or movement of objects/people in physical space.
        * **Suggests:** `Spatial_Configuration_Scenario`: +3, `Agentive_Behavior_Scenario`: +1
    * **Option B:** The timing, sequence, or duration of events or situations.
        * **Suggests:** `Temporal_Structuring_Scenario`: +3, `Goal_Directed_Planning_Scenario`: +1, `Agentive_Behavior_Scenario`: +1
    * **Option C:** How internal mental states (thoughts, feelings) lead to external actions, or how external events affect internal states.
        * **Suggests:** `Agent_Environment_Interaction_Scenario`: +3, `Belief_State_Management_Scenario`: +1, `Agentive_Behavior_Scenario`: +1, `Perceptual_Information_Acquisition_Scenario`: +1, `Emotional_Experience_Scenario`: +1

### **3.2.3. Proposed Integration Strategy: Generic Scenarios as Building Blocks for Domain Scenarios**

The FN3 framework supports a layered approach to scenarios:

1. **Generic Common-Sense Scenarios:** These represent fundamental cognitive and interactional patterns derived from Common Sense Psychology (e.g., `Belief_State_Management_Scenario`, `Goal_Directed_Action_Scenario`). Frames that compose these generic scenarios must themselves be generic, cross-domain frames.
2. **Domain-Specific Scenarios:** These represent patterns of activity or experience within a circumscribed field of human activity (e.g., `Crop_Harvest_scenario` in Agriculture, `Tourist_Arrival_scenario` in Tourism).

To maintain a coherent structure without excessive rigidity, the following policies apply to their integration:

- **Policy 1: Domain Scenario Specialization:** A domain scenario **must specialize** from one or more generic common-sense scenarios. This means a domain scenario is conceptually a "type of" or a specific instance of a broader common-sense pattern. This relationship will be captured via `Specializes_Scenario` links (e.g., `Medical_Treatment_Scenario` `Specializes_Scenario` `Goal_Directed_Action_Scenario`).
- **Policy 2: Frames within Domain Scenarios - Case-by-Case Analysis:** For frames that constitute a domain scenario, a flexible approach is adopted:
    - If a generic common-sense frame (e.g., `Communication`, `Motion`) is used within a specific domain scenario **without any change to its core meaning or valence patterns**, the generic frame can be directly included as a constituent of the domain scenario. This acknowledges that generic language often retains its original meaning even in specialized contexts.
    - If the generic frame's meaning, typical Frame Elements, or valence patterns **are significantly specialized or nuanced by the domain context**, then a new, domain-specific frame should be created (e.g., `Medical_Communication` inheriting from `Communication`). This domain-specific frame would then be a constituent of the domain scenario.
    - This case-by-case analysis avoids creating unnecessary specialized frames while ensuring that genuine semantic distinctions are captured.

This strategy ensures a clear hierarchical relationship between scenario types while providing practical flexibility for the frames that compose them.

---

#### **3.2.4. Phase 3: Domain Scenario Allocation & Creation Questions**

This phase activates after the initial Frame Type and Generic Scenario identifications (Phase 1 and 2).

**Question Set 3.0: Domain Context Identification**

- **Q3.0: Does the concept (or its identified generic scenario context) primarily operate within a specific, well-defined field of human experience or professional activity? (Select all that apply, or "No specific domain")**
    - **Option A:** @Agriculture
        - **Suggests:** `Domain_Specific_Context`: +2 (for Agriculture)
    - **Option B:** @Business
        - **Suggests:** `Domain_Specific_Context`: +2 (for Business)
    - **Option C:** @Employment
        - **Suggests:** `Domain_Specific_Context`: +2 (for Employment)
    - **Option D:** @Health
        - **Suggests:** `Domain_Specific_Context`: +2 (for Health)
    - **Option E:** @Legal
        - **Suggests:** `Domain_Specific_Context`: +2 (for Legal)
    - ... (Continue for all relevant FN3 Domains)
    - **Option Z:** No, it seems to be a very general concept, applicable across _many_ domains (already adequately covered by Generic Scenarios).
        - **Action:** If this is the only option selected, **skip the rest of Phase 3 and proceed to Phase 4.**

_(System Note: Based on selected domains, filter existing domain scenarios from `scenario_frame_groupings.csv` to present in Q3.1.)_

**Question Set 3.1: Existing Domain Scenario Fit**

- **Q3.1: Within the selected domain(s), does this frame (or the situation it evokes) align with an existing _domain-specific scenario_? (Select one, or "No existing scenario fits")**
    - _(System will dynamically list relevant existing domain scenarios based on Q3.0 selection, e.g., for Agriculture: `Crop_Harvest_scenario`, `Farm_scenario`, `Fertilize_scenario`, etc.)_
    - **If User Selects an Existing Domain Scenario (e.g., `Tourist_Arrival_scenario`):**
        - **Action:** Allocate the frame to this domain scenario (`Is_Constituent_of_Scenario`).
        - **Action:** Explicitly establish `Specializes_Scenario` links from the selected domain scenario to its relevant generic common-sense scenario(s) (e.g., `Tourist_Arrival_scenario` `Specializes_Scenario` `Agentive_Behavior_Scenario` and `Temporal_Structuring_Scenario`).
        - **Action:** Proceed to Phase 4.
    - **If User Selects "No existing scenario fits":** Proceed to Q3.2.

**Question Set 3.2: New Domain Scenario Warranted?**

- **Q3.2: Does this frame (or the situation it represents) suggest a new pattern of interaction or experience unique to this domain, broad enough to warrant a _new domain scenario_?**
    - **Option A:** Yes, a new domain scenario is needed.
        - **Suggests:** `New_Domain_Scenario_Creation`: +5
        - **Action:** Proceed to Phase 3.3 (New Domain Scenario Definition).
    - **Option B:** No, it's a specific frame within the domain but doesn't form a higher-level scenario itself.
        - **Action:** Record its domain membership. Proceed to Phase 4.

#### 3.2.5. Phase 3.3: New Domain Scenario Definition (If Q3.2.A was chosen)

This detailed set of questions guides the user through defining a new domain scenario, enforcing its relationship to generic scenarios and handling its constituent frames according to Policy 2.

- **Q3.3a: Proposed Name for the New Domain Scenario:** (Text input field, e.g., `Patient_Treatment_Scenario`)
- **Q3.3b: What is the primary `Purpose` of this new domain scenario?** (Explain what common theme or complex situation it groups within this domain.)
- **Q3.3c: Which `Generic Common-Sense Scenario(s)` does this new domain scenario primarily `Specialize_Scenario` from? (Select all that apply from our list of 14 generic scenarios)**
    - _(System lists the 14 generic common-sense scenarios)_
    - **Weight if chosen:** Adds a `Specializes_Scenario` relation. (This is a hard constraint for new domain scenarios).
- **Q3.3d: What are the `Key Constituent Concepts/Potential Frames` of this new domain scenario?** (List the frames that make up its core components. For each, indicate if it's an existing generic frame, or if it needs to be a new domain-specific specialization.)
    - _(User input: List frame names)_
    - _(For each listed frame, system prompts:)_ "Is this a generic frame (meaning unchanged in this domain) or a new domain-specific specialization (meaning nuanced by this domain)?"
        - **If Generic:** Link directly.
        - **If Domain-Specific:** Prompt for proposed parent generic frame and new specialized frame name (e.g., `Medical_Diagnosis` specializing `Diagnosis`).
- **Q3.3e: Describe the `Typical Sequence/Dynamics` of the situations within this scenario:** (Initial states, intermediate processes, outcomes).
- **Q3.3f: What are the `Key Participants/Elements` that recur across its constituent frames?** (Potential abstract Frame Elements for the scenario itself).
- **Q3.3g: Does this new domain scenario align with FN3's core principles (e.g., situation grounding, cognitive embeddability)?** (Internal check / user confirmation).

---

### **3.4. Phase 4: Network Integration and Refinement**

(As defined in the previous documentation. This phase follows the completion of Phase 3, formalizing the relationships and metadata based on the decisions made in the preceding steps.)