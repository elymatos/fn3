# Common Sense Psychology to FN3 Scenario Mapping Worksheet

This worksheet maps core common-sense psychological concepts identified in Hobbs's work to potential specific frames and broader scenario frames for FN3, adhering to the proposed hierarchical structure of domains, scenarios, scenes, and situations.

## Worksheet Column Definitions:

* **Hobbs's Core Concept/Axiom Group:** High-level summary of the concept and its primary source references in "commonsense_psychology_cleaned.pdf".
* **FN3 Relevance - Type of Common Sense "Situation":** Categorization according to FN3's frame typology (Entity, Event, Process, State, Attribute, Relation). "Broader/Scenario Potential" indicates it's suitable for a scenario frame.
* **Potential FN3 Frame (Specific):** Existing FrameNet Brasil frames that match, or proposed new specific frames.
* **Potential FN3 Scenario (Broader):** Proposed scenario frame name, its purpose, key constituent concepts/frames, and typical dynamics.
* **Key Participants/Elements (from Hobbs):** Essential roles or components involved as per Hobbs's formalizations.
* **Relation to Other Common Sense Concepts (from Hobbs):** How Hobbs connects this concept to others in his system.

---

## Refined FN3 Scenario Frame Entries

---

### **1. `Belief_State_Management_Scenario`**

* **Hobbs's Core Concept/Axiom Group:** **Belief**
    * **Description:** Hobbs formalizes belief as a core mental state where an agent holds certain propositions to be true. He discusses the nature of belief, how it relates to information acquisition, and its role in an agent's reasoning and action. Beliefs are central to an agent's model of the world.
    * **Source Reference:** "commonsense_psychology_cleaned.pdf" (primarily pages 1-3, but also implicitly throughout discussions of other mental states and actions).

* **FN3 Relevance - Type of Common Sense "Situation":** State, Broader/Scenario Potential

* **Potential FN3 Frame (Specific):**
    * **Existing FrameNet Brasil Frames:** `Belief` (Mental_object frame). `Cognition`.
    * **Proposed New Specific Frame Name:** N/A.

* **Potential FN3 Scenario (Broader):** `Belief_State_Management_Scenario`
    * **Purpose:** This scenario models the common-sense psychological processes by which an `Agent` acquires, holds, revises, and applies their `Beliefs` about `Propositions` or states of affairs. It focuses on the internal cognitive mechanisms of forming and maintaining a mental model of the world based on various `Sources` of information and reasoning.
    * **Key Constituent Concepts/Potential Frames:**
        * `Belief` (the core mental state, a `State` frame).
        * `Perception` (sensory input leading to belief, an `Event`/`Process` frame).
        * `Information_Exchange_Scenario` (as a source for beliefs, a `Scenario` frame).
        * `Inference` / `Reasoning` (cognitive process of deriving beliefs, a `Process` frame).
        * `Evidence` (the basis or justification for belief, an `Entity` or `Attribute` frame).
        * `Truth` (the objective state of affairs that beliefs aim to represent, an `Attribute` or `State` frame).
        * `Doubt` / `Uncertainty` (states related to the absence or weak conviction of belief, `State` frames).
    * **Typical Sequence/Dynamics:** `Source` (e.g., `Perception`, `Communication`) provides `Information` or `Evidence` -> `Agent` performs `Inference` / `Reasoning` -> `Agent` forms or revises a `Belief` about a `Proposition` -> This `Belief` influences subsequent `Intention`, `Planning`, and `Action`. Beliefs can persist or change over time.

* **Key Participants/Elements (from Hobbs):** `Agent`, `Proposition/Content`, `Source/Evidence`, `Time`.

* **Relation to Other Common Sense Concepts (from Hobbs):** Fundamental to `Knowledge`. Directly influences `Desire` and `Intention`. Central to `Planning`. Outcome of `Perception` and `Communication`.

---

### **2. `Knowledge_Acquisition_and_Application_Scenario`**

* **Hobbs's Core Concept/Axiom Group:** **Knowledge**
    * **Description:** Hobbs treats knowledge as a specific type of belief: a belief that is true and often justified or supported by sufficient evidence. He formalizes knowledge within the common-sense framework as a strong, reliable form of belief upon which agents can confidently act.
    * **Source Reference:** "commonsense_psychology_cleaned.pdf" (page 3, and generally implied whenever an agent reliably knows something).

* **FN3 Relevance - Type of Common Sense "Situation":** State, Relation (Implicit, between Agent, Proposition, and Truth).

* **Potential FN3 Frame (Specific):**
    * **Existing FrameNet Brasil Frames:** `Knowledge` (Mental_object frame). `Awareness`.
    * **Proposed New Specific Frame Name:** N/A.

* **Potential FN3 Scenario (Broader):** `Knowledge_Acquisition_and_Application_Scenario`
    * **Purpose:** This scenario models the common-sense processes by which an `Agent` acquires `Knowledge` – `Beliefs` that are understood to be `True` and `Justified` – and subsequently `Applies` this `Knowledge` to reason, make `Decisions`, solve `Problems`, or guide `Action`. It focuses on the validation and practical use of information.
    * **Key Constituent Concepts/Potential Frames:**
        * `Knowledge` (the core state, a `State` frame).
        * `Belief_State_Management_Scenario` (as a foundational or pre-requisite scenario).
        * `Truth` (the objective correlate of knowledge, an `Attribute`/`State` frame).
        * `Justification` / `Evidence` (the warrant for belief, an `Attribute`/`Entity` frame).
        * `Verification` / `Confirmation` (processes to establish truth/justification, `Process` frames).
        * `Learning` (the process of acquiring knowledge, a `Process` frame).
        * `Problem_Solving` / `Decision_Making` (contexts of application, `Process` frames).
        * `Action_Application` (using knowledge to perform an action, an `Event` frame).
    * **Typical Sequence/Dynamics:** Initial `Belief_Formation` (potentially from `Perception` or `Communication`) -> `Verification` or `Justification` process -> `Belief` elevates to `Knowledge` -> `Knowledge` is `Applied` in `Reasoning`, `Decision_Making`, or `Action`.

* **Key Participants/Elements (from Hobbs):** `Agent`, `Proposition/Fact`, `Evidence/Justification`, `Truth`.

* **Relation to Other Common Sense Concepts (from Hobbs):** Superclass of `Belief`. Essential for `Rational Action` and `Planning`. Acquired through `Perception`, `Communication`, and `Inference`. Crucial for `Problem_Solving` and `Goal_Achievement`.

---

### **3. `Motivation_and_Goal_Setting_Scenario`**

* **Hobbs's Core Concept/Axiom Group:** **Desire**
    * **Description:** Hobbs defines desire as a mental state where an agent wishes for a certain state of affairs or proposition to become true. Desires are primary motivators for an agent's actions and plans. He distinguishes desires from beliefs, noting that desires are not necessarily about what is true, but what the agent *wants* to be true.
    * **Source Reference:** "commonsense_psychology_cleaned.pdf" (primarily page 4, also implied in discussions of planning and action).

* **FN3 Relevance - Type of Common Sense "Situation":** State, Broader/Scenario Potential

* **Potential FN3 Frame (Specific):**
    * **Existing FrameNet Brasil Frames:** `Desire` (Mental_object frame). `Motivation`.
    * **Proposed New Specific Frame Name:** N/A.

* **Potential FN3 Scenario (Broader):** `Motivation_and_Goal_Setting_Scenario`
    * **Purpose:** This scenario models the common-sense psychological processes whereby an `Agent` identifies a `Need` or `Stimulus`, develops a `Desire` for a specific `Proposition` or state of affairs, and subsequently establishes a `Goal` (a desired end-state) to guide their behavior. It focuses on the internal drives and cognitive processes that initiate purposeful action.
    * **Key Constituent Concepts/Potential Frames:**
        * `Desire` (the core motivational state, a `State` frame).
        * `Need` (underlying deficiency or driver, an `Entity` or `State` frame).
        * `Stimulus` (external or internal trigger for a need/desire, an `Entity` frame).
        * `Goal` (the specific desired state, an `Entity` or `State` frame).
        * `Value_Judgment` (assessing the importance or worth of a goal, a `Process` frame).
        * `Preference` (choosing among desires, a `State` or `Process` frame).
        * `Satisfaction` / `Fulfillment` (achieving the desired state, an `Event` frame).
        * `Agent` (the one experiencing motivation).
    * **Typical Sequence/Dynamics:** `Need` / `Stimulus` arises -> `Agent` experiences `Desire` -> `Agent` performs `Value_Judgment` (implicitly or explicitly) -> `Agent` sets `Goal` -> `Goal` influences subsequent `Intention`, `Planning`, and `Action`. Can loop with `Satisfaction` leading to new `Desires`.

* **Key Participants/Elements (from Hobbs):** `Agent`, `Proposition/Content`, `Time`.

* **Relation to Other Common Sense Concepts (from Hobbs):** Directly influences `Intention`. Central to `Planning`. Can be influenced by `Beliefs`. The driver for `Action`.

---

### **4. `Goal_Directed_Action_Scenario`**

* **Hobbs's Core Concept/Axiom Group:** **Intention, Planning, Action** (as integrated sequence)
    * **Description:** This scenario integrates Hobbs's concepts of `Desire`, `Intention`, `Planning`, and `Action`. It describes the full common-sense sequence of an agent acting purposefully to change the world.
    * **Source Reference:** "commonsense_psychology_cleaned.pdf" (primarily pages 4-9).

* **FN3 Relevance - Type of Common Sense "Situation":** Broader/Scenario Potential

* **Potential FN3 Frame (Specific):**
    * **Existing FrameNet Brasil Frames:** N/A (this is a high-level composite scenario).
    * **Proposed New Specific Frame Name:** N/A.

* **Potential FN3 Scenario (Broader):** `Goal_Directed_Action_Scenario`
    * **Purpose:** This overarching scenario models the complete common-sense sequence of an `Agent` engaging in purposeful behavior, from the initial formation of a `Desire` and setting of a `Goal`, through the development of an `Intention` and `Plan`, to the `Execution` of `Actions` to achieve that `Goal`, and the subsequent `Effects` on the `Environment`. It represents the full cycle of volitional change.
    * **Key Constituent Concepts/Potential Frames (Primarily other Scenarios):**
        * `Motivation_and_Goal_Setting_Scenario` (providing the driving force and objective).
        * `Goal_Directed_Planning_Scenario` (providing the strategy).
        * `Agentive_Behavior_Scenario` (for the actual execution).
        * `Belief_State_Management_Scenario` (influences and is influenced by all stages).
        * `Causal_Event_Chain_Scenario` (describing the mechanism of effects).
        * `Agent` (the central participant, an `Entity` frame).
        * `Environment` (the context of action, an `Entity` frame).
    * **Typical Sequence/Dynamics:** `Agent` (via `Motivation_and_Goal_Setting_Scenario`) forms `Goal` -> `Agent` (via `Belief_State_Management_Scenario`) assesses `Current_State` -> `Agent` forms `Intention` -> `Agent` (via `Goal_Directed_Planning_Scenario`) devises `Plan` -> `Agent` (via `Agentive_Behavior_Scenario`) `Executes_Plan` through `Actions` -> `Actions` cause `Effects` (via `Causal_Event_Chain_Scenario`) leading to `Outcome` (success/failure) -> `Agent` (via `Belief_State_Management_Scenario`) updates `Beliefs` based on `Outcome`.

* **Key Participants/Elements (from Hobbs):** `Agent`, `Goal`, `Intention`, `Plan`, `Action`, `Effects`.

* **Relation to Other Common Sense Concepts (from Hobbs):** Integrates `Desire`, `Intention`, `Planning`, and `Action`. Relies on `Beliefs` and `Causation`.

---

### **5. `Goal_Directed_Planning_Scenario`**

* **Hobbs's Core Concept/Axiom Group:** **Planning**
    * **Description:** Hobbs defines planning as a process whereby an agent, driven by a desire or intention for a future state, constructs a sequence of actions believed to lead to that state. This involves reasoning about the current state of the world, the preconditions of actions, and their expected effects.
    * **Source Reference:** "commonsense_psychology_cleaned.pdf" (primarily pages 6-7, also alluded to in discussions of desire and intention).

* **FN3 Relevance - Type of Common Sense "Situation":** Process, Event (of plan formation), Broader/Scenario Potential

* **Potential FN3 Frame (Specific):**
    * **Existing FrameNet Brasil Frames:** `Planning` (Process frame). `Intention`, `Goal`.
    * **Proposed New Specific Frame Name:** N/A.

* **Potential FN3 Scenario (Broader):** `Goal_Directed_Planning_Scenario`
    * **Purpose:** This scenario models the cognitive processes involved in an `Agent`'s deliberation to achieve a desired `Outcome`, from identifying a `Goal` to formulating a concrete `Sequence` of `Steps` or `Actions`. It provides a structured view of rational agent behavior in pursuit of objectives.
    * **Key Constituent Concepts/Potential Frames:**
        * `Planning` (the core process of devising a method, a `Process` frame).
        * `Goal` / `Desired_State` (the target of the plan, an `Entity` or `State` frame).
        * `Intention` (the commitment to execute the plan, a `State` frame).
        * `Belief_State_Management_Scenario` (for the beliefs about the current state and action effects, used in planning).
        * `Preconditions` (states required before an action can occur, `State` or `Relation` frames).
        * `Effects` / `Outcomes` (states resulting from an action, `Event` or `State` frames).
        * `Action` (the constituent steps of the plan, an `Event` frame).
        * `Feasibility` / `Possibility` (evaluation of whether a plan can succeed, an `Attribute` frame).
        * `Strategy` / `Method` (the structure of the plan, an `Entity` frame).
    * **Typical Sequence/Dynamics:** `Desire`/`Intention` for a `Goal` -> `Agent` (using `Beliefs` from `Belief_State_Management_Scenario`) assesses `Current_State` -> `Agent` performs `Reasoning` about `Actions` and their `Effects` (the `Planning` process) -> `Agent` formulates a `Plan` (sequence of `Actions`) -> `Agent` commits to `Plan` (an `Intention`). This process can be iterative.

* **Key Participants/Elements (from Hobbs):** `Agent`, `Goal/State`, `Plan/Action Sequence`, `Beliefs`, `Preconditions`, `Effects`.

* **Relation to Other Common Sense Concepts (from Hobbs):** Triggered by `Desire` and `Intention`. Relies heavily on `Beliefs` and `Causation`. Directly leads to `Action` execution.

---

### **6. `Agentive_Behavior_Scenario`**

* **Hobbs's Core Concept/Axiom Group:** **Action**
    * **Description:** For Hobbs, an action is an event caused by an agent, typically performed with an intention to achieve a desired outcome. Actions are the means by which agents change the state of the world to fulfill their desires.
    * **Source Reference:** "commonsense_psychology_cleaned.pdf" (primarily pages 5, 6, 8-9, and throughout discussions of planning and intention).

* **FN3 Relevance - Type of Common Sense "Situation":** Event, Process (if prolonged/complex), Broader/Scenario Potential

* **Potential FN3 Frame (Specific):**
    * **Existing FrameNet Brasil Frames:** Many specific action frames (e.g., `Motion`, `Communication`). `Perform_act` (from FN English) is a good general candidate.
    * **Proposed New Specific Frame Name:** N/A.

* **Potential FN3 Scenario (Broader):** `Agentive_Behavior_Scenario`
    * **Purpose:** This scenario models the common-sense process of an `Agent` deliberately performing `Actions` or exhibiting `Behavior` within an `Environment` to bring about specific `Effects` or fulfill an `Intention`. It encompasses the execution phase of purposeful conduct, including the `Preconditions` for action, the action itself, and its immediate `Consequences`.
    * **Key Constituent Concepts/Potential Frames:**
        * `Agent` (the performer of the behavior, an `Entity` frame).
        * `Action` (a specific volitional event performed, an `Event` frame, or specific action frames like `Motion`, `Communication`, `Manipulation`).
        * `Intention` (the mental commitment driving the behavior, a `State` frame).
        * `Goal` (the desired outcome guiding the behavior, an `Entity` or `State` frame).
        * `Preconditions` (states necessary before the behavior can occur, `State` or `Relation` frames).
        * `Effects` / `Consequences` (the changes resulting from the behavior, `Event` or `State` frames).
        * `Causal_Event_Chain_Scenario` (to describe the mechanism of effects, a `Scenario` frame).
        * `Environment` (the spatial/physical context, an `Entity` frame).
    * **Typical Sequence/Dynamics:** `Agent` possesses `Intention` / `Goal` -> `Preconditions` are met -> `Agent` performs `Action` / `Behavior` -> `Action` causes `Effects` on `Environment` -> `Outcome` is achieved or not. Behavior occurs within a `Time` and `Location`.

* **Key Participants/Elements (from Hobbs):** `Agent`, `Action_Type`, `Intention`, `Result_State/Effects`, `Preconditions`, `Time`, `Location`.

* **Relation to Other Common Sense Concepts (from Hobbs):** The realization of `Intention` and `Desire`. Output of `Planning`. Generates `Effects` which change `Beliefs`. Often involves `Causation`. Can be observed via `Perception`.

---

### **7. `Perceptual_Information_Acquisition_Scenario`**

* **Hobbs's Core Concept/Axiom Group:** **Perception**
    * **Description:** Hobbs defines perception as the process by which an agent directly acquires information about the state of the world through sensory input. It's a fundamental mechanism for forming beliefs about the environment and is crucial for guiding actions and interactions.
    * **Source Reference:** "commonsense_psychology_cleaned.pdf" (primarily pages 1, 8-9, also implicitly whenever beliefs are formed from observation).

* **FN3 Relevance - Type of Common Sense "Situation":** Event, Process, Broader/Scenario Potential

* **Potential FN3 Frame (Specific):**
    * **Existing FrameNet Brasil Frames:** `Perception` (Event/Process frame). `Sensation`.
    * **Proposed New Specific Frame Name:** N/A.

* **Potential FN3 Scenario (Broader):** `Perceptual_Information_Acquisition_Scenario`
    * **Purpose:** This scenario models the common-sense process by which a `Perceiver` (an `Agent`) obtains `Information` or forms `Beliefs` about the `Environment` or specific `Phenomena` through `Sensory_Input`. It describes the entire chain from an external `Stimulus` to the internal representation and understanding by the agent.
    * **Key Constituent Concepts/Potential Frames:**
        * `Perception` (the core sensory and interpretive process, an `Event` or `Process` frame).
        * `Perceiver` / `Agent` (the entity perceiving, an `Entity` frame).
        * `Stimulus` (the external cause of perception, an `Entity` frame).
        * `Phenomenon` / `Percept` (what is perceived, an `Entity` or `State` frame).
        * `Sense_Modality` (e.g., `Sight`, `Sound`, `Touch`, `Taste`, `Smell`, `Attribute` frames).
        * `Information` (the content gained, an `Entity` frame).
        * `Belief_State_Management_Scenario` (as the subsequent scenario where the information leads to belief update).
        * `Focus_of_Perception` (the aspect attended to, an `Attribute` or `Relation` frame).
    * **Typical Sequence/Dynamics:** `Stimulus` in `Environment` -> `Perceiver` receives `Sensory_Input` -> `Perceiver` performs `Perception` (e.g., via a `Sense_Modality`) of a `Phenomenon` -> `Information` is acquired -> `Belief` is formed (part of `Belief_State_Management_Scenario`). Occurs over `Time` and in `Space`.

* **Key Participants/Elements (from Hobbs):** `Agent`, `Perceived_Item/Proposition`, `Time`, `Source`.

* **Relation to Other Common Sense Concepts (from Hobbs):** Direct cause for `Belief` formation. Provides critical input for `Planning` and `Action`. Can trigger `Emotion`. Involved in `Communication`.

---

### **8. `Emotional_Experience_Scenario`**

* **Hobbs's Core Concept/Axiom Group:** **Emotion**
    * **Description:** Hobbs briefly touches upon emotions, considering them as internal states of an agent that are often triggered by beliefs and desires, and which can influence an agent's reasoning and actions. He views them as potentially leading to "moods" and influencing preferences or evaluations.
    * **Source Reference:** "commonsense_psychology_cleaned.pdf" (page 9).

* **FN3 Relevance - Type of Common Sense "Situation":** State, Event (of emotional onset), Broader/Scenario Potential

* **Potential FN3 Frame (Specific):**
    * **Existing FrameNet Brasil Frames:** `Emotion` (State frame). Specific emotion frames (e.g., `Happiness`, `Fear`). `Experiencer_obj`.
    * **Proposed New Specific Frame Name:** N/A.

* **Potential FN3 Scenario (Broader):** `Emotional_Experience_Scenario`
    * **Purpose:** This scenario models the common-sense dynamics of an `Agent` undergoing an `Emotional_Experience`. It encompasses the `Stimulus` or `Beliefs` that `Trigger` the emotion, the internal `State` of the `Emotion` itself (including `Valence` and `Intensity`), its potential `Manifestations` (e.g., `Expression_of_Emotion`), and its `Influence` on the agent's `Reasoning`, `Behavior`, and long-term `Mood`.
    * **Key Constituent Concepts/Potential Frames:**
        * `Emotion` (the core internal state, a `State` frame).
        * `Experiencer` (the `Agent` undergoing the emotion, an `Entity` frame).
        * `Stimulus` (the event or entity causing the emotion, an `Entity` or `Event` frame).
        * `Belief` (the cognitive appraisal of the stimulus, a `State` frame).
        * `Desire` (frustration or fulfillment of which can trigger emotion, a `State` frame).
        * `Expression_of_Emotion` (observable manifestations, an `Event` or `Behavior` frame, potentially linking to frames like `Facial_expression`, `Vocalization`).
        * `Mood` (a longer-lasting emotional state, a `State` frame).
        * `Behavior` / `Action` (influenced by emotion, an `Event` or `Process` frame).
        * `Valence` (positive/negative quality, an `Attribute` frame).
        * `Intensity` (strength of emotion, an `Attribute` frame).
    * **Typical Sequence/Dynamics:** `Agent` has `Beliefs` or `Desires` -> `Stimulus` occurs or is perceived (via `Perceptual_Information_Acquisition_Scenario`) -> `Beliefs` / `Desires` interact with `Stimulus` to `Trigger` `Emotion` -> `Agent` experiences `Emotion` (with `Valence` and `Intensity`) -> `Emotion` may lead to `Expression_of_Emotion` or `Influence` on `Behavior` / `Reasoning`, and can contribute to a lasting `Mood`.

* **Key Participants/Elements (from Hobbs):** `Agent`, `Beliefs/Desires`, `Proposition/State of Affairs`, `Mood`.

* **Relation to Other Common Sense Concepts (from Hobbs):** Can be triggered by `Beliefs` and `Desires`. Can influence `Reasoning`, `Decision_Making`, and `Action`. Can be caused by `Perception` of events. Can motivate or inhibit `Communication`.

---

### **9. `Information_Exchange_Scenario`**

* **Hobbs's Core Concept/Axiom Group:** **Communication**
    * **Description:** Hobbs discusses communication as a process where one agent (the speaker) performs an action (utterance) with the intention of causing another agent (the hearer) to come to believe a certain proposition. This involves the speaker producing a perceivable signal and the hearer interpreting that signal to update their beliefs.
    * **Source Reference:** "commonsense_psychology_cleaned.pdf" (primarily page 3, also pages 11-12 on speech acts and obligation).

* **FN3 Relevance - Type of Common Sense "Situation":** Event, Process, Relation, Broader/Scenario Potential

* **Potential FN3 Frame (Specific):**
    * **Existing FrameNet Brasil Frames:** `Communication` (Event frame). `Giving_information`, `Receiving_information`, `Statement`.
    * **Proposed New Specific Frame Name:** N/A.

* **Potential FN3 Scenario (Broader):** `Information_Exchange_Scenario`
    * **Purpose:** This scenario models the common-sense process of `Agents` mutually engaged in `Communication`, wherein a `Speaker` transmits a `Message` (containing a `Proposition`) via an `Utterance` with the `Intention` of influencing a `Hearer`'s `Beliefs` or prompting a `Response`. It encompasses the full communicative act from encoding to decoding, leveraging a `Shared_Context`.
    * **Key Constituent Concepts/Potential Frames:**
        * `Communication` (the overarching act, an `Event` or `Process` frame).
        * `Speaker` / `Communicator` (the sending `Agent`, an `Entity` frame).
        * `Hearer` / `Recipient` (the receiving `Agent`, an `Entity` frame).
        * `Message` / `Proposition` (the content conveyed, an `Entity` or `State` frame).
        * `Utterance` / `Signal` (the physical act of conveying, an `Action` or `Event` frame, can link to `Agentive_Behavior_Scenario`).
        * `Intention` (the speaker's purpose, a `State` frame).
        * `Perceptual_Information_Acquisition_Scenario` (for the hearer's reception of the utterance).
        * `Interpretation` / `Understanding` (the hearer's cognitive process, a `Process` frame).
        * `Belief_State_Management_Scenario` (the hearer's updated beliefs as a result).
        * `Shared_Context` (common background knowledge, an `Entity` or `State` frame).
        * `Speech_Act` (specific types of communicative actions, `Event` frames, e.g., `Promise`, `Question`, `Statement`).
    * **Typical Sequence/Dynamics:** `Speaker` forms `Intention` to convey `Message` -> `Speaker` performs `Utterance` (an `Action`) -> `Hearer` (via `Perceptual_Information_Acquisition_Scenario`) `Perceives` `Utterance` -> `Hearer` `Interprets` `Message` within `Shared_Context` -> `Hearer`'s `Beliefs` are updated (via `Belief_State_Management_Scenario`) or `Hearer` takes `Action`.

* **Key Participants/Elements (from Hobbs):** `Speaker`, `Hearer`, `Proposition`, `Action`, `Belief`, `Time`.

* **Relation to Other Common Sense Concepts (from Hobbs):** Integrates `Action`. Depends on `Perception`. Aims to modify `Beliefs`. Driven by `Intention`. Can lead to `Obligation`.

---

### **10. `Causal_Event_Chain_Scenario`**

* **Hobbs's Core Concept/Axiom Group:** **Causation**
    * **Description:** Hobbs treats causation as a fundamental relationship where one event or state of affairs (the cause) brings about another (the effect). This is critical for understanding action and for planning.
    * **Source Reference:** "commonsense_psychology_cleaned.pdf" (primarily pages 8-9, also implicitly in discussions of action effects and planning preconditions).

* **FN3 Relevance - Type of Common Sense "Situation":** Relation, Event (the causal act itself).

* **Potential FN3 Frame (Specific):**
    * **Existing FrameNet Brasil Frames:** `Cause` (Relation frame). `Causation` (Process/Event frame in FN English).
    * **Proposed New Specific Frame Name:** N/A.

* **Potential FN3 Scenario (Broader):** `Causal_Event_Chain_Scenario`
    * **Purpose:** This scenario models the common-sense relationship where one `Event` or `State` (the `Cause`) brings about another `Event` or `State` (the `Effect`). It encompasses the conditions under which causation occurs, the `Agent` (if any) initiating the `Cause`, and the resulting `Consequences`, providing a framework for analyzing how situations unfold and interact in the world.
    * **Key Constituent Concepts/Potential Frames:**
        * `Cause` (the relational frame, a `Relation` frame).
        * `Causer` / `Agent` (the entity initiating the cause, an `Entity` frame).
        * `Effect` / `Result` (the outcome, an `Event` or `State` frame).
        * `Event` (the type of situation involved, an `Event` frame).
        * `State` (the type of situation involved, a `State` frame).
        * `Precondition` / `Enabling_Condition` (factors necessary for the cause to produce the effect, `State` or `Relation` frames).
        * `Process` (if the causation involves a series of steps, a `Process` frame).
        * `Mechanism` (the underlying way causation operates, an `Entity` or `Relation` frame).
    * **Typical Sequence/Dynamics:** `Preconditions` are met -> `Cause_Event`/`State` occurs (potentially initiated by a `Causer`/`Agent`) -> This directly leads to the `Effect_Event`/`State`. Causation implies `Temporal_Precedence` (the cause precedes the effect).

* **Key Participants/Elements (from Hobbs):** `Cause_Event/State`, `Effect_Event/State`, `Agent` (optional), `Enabling_Conditions`.

* **Relation to Other Common Sense Concepts (from Hobbs):** Fundamental to `Action`. Crucial for `Planning`. Involved in `Perception`. Implied in many `Problem_Solving` or `Troubleshooting` scenarios.

---

### **11. `Temporal_Structuring_Scenario`**

* **Hobbs's Core Concept/Axiom Group:** **Time**
    * **Description:** Hobbs incorporates temporal reasoning, acknowledging that events and states occur over time and in sequences. Time is a crucial dimension for all situations.
    * **Source Reference:** "commonsense_psychology_cleaned.pdf" (implicitly throughout, but specifically p. 8).

* **FN3 Relevance - Type of Common Sense "Situation":** Attribute, Relation, Broader/Scenario Potential

* **Potential FN3 Frame (Specific):**
    * **Existing FrameNet Brasil Frames:** `Time` (Entity), `Temporal_interval` (Attribute/Entity), `Temporal_relation` (Relation).
    * **Proposed New Specific Frame Name:** N/A.

* **Potential FN3 Scenario (Broader):** `Temporal_Structuring_Scenario`
    * **Purpose:** This scenario models the common-sense ways in which `Events`, `Processes`, and `States` are ordered, located, and extended in `Time`. It provides a framework for understanding `Temporal_Relations` like `Precedence`, `Overlap`, and `Duration`, which are essential for coherent descriptions of dynamic situations and for inferring sequences of occurrences.
    * **Key Constituent Concepts/Potential Frames:**
        * `Time_point` / `Time_interval` (specific moments or durations, `Entity` or `Attribute` frames).
        * `Temporal_relation` (the relationship between temporal entities or situations, a `Relation` frame).
        * `Event` (a situation happening at a point or short interval, an `Event` frame).
        * `Process` (a situation unfolding over time, a `Process` frame).
        * `State` (a static condition holding over time, a `State` frame).
        * `Beginning` / `Ending` / `Duration` (attributes of situations, `Attribute` frames).
        * `Clock_time` / `Calendar_time` (specific measurement systems, `Entity` frames).
        * `Sequence` (an ordered series of events, an `Entity` frame).
    * **Typical Sequence/Dynamics:** Situations (Events, Processes, States) occur and are ordered relative to `Time_points` or `Time_intervals`. `Temporal_Relations` (e.g., `before`, `after`, `during`) describe their interconnections. `Processes` and `States` have inherent `Duration`.

* **Key Participants/Elements (from Hobbs):** `Event/State`, `Time_point/Interval`, `Precedence/Succession`.

* **Relation to Other Common Sense Concepts (from Hobbs):** Crucial for `Planning`. Inherent to `Action`. Relevant for `Memory`. Influences `Causation`.

---

### **12. `Spatial_Configuration_Scenario`**

* **Hobbs's Core Concept/Axiom Group:** **Space**
    * **Description:** Hobbs implicitly references spatial concepts, noting that objects and agents exist in locations and that actions occur at specific places. Spatial relations are assumed for reasoning about the physical world and the effects of actions.
    * **Source Reference:** "commonsense_psychology_cleaned.pdf" (implicitly throughout, specifically p. 8).

* **FN3 Relevance - Type of Common Sense "Situation":** Attribute, Relation, Broader/Scenario Potential

* **Potential FN3 Frame (Specific):**
    * **Existing FrameNet Brasil Frames:** `Locale` (Entity), `Spatial_relation` (Relation), `Motion` (Event).
    * **Proposed New Specific Frame Name:** N/A.

* **Potential FN3 Scenario (Broader):** `Spatial_Configuration_Scenario`
    * **Purpose:** This scenario models the common-sense ways in which `Entities` are positioned and relate to each other within `Physical_Space`, and how `Events` or `Actions` can modify these `Spatial_Relations` or an `Entity`'s `Location`. It provides a framework for understanding spatial arrangement, movement, and the physical context of situations.
    * **Key Constituent Concepts/Potential Frames:**
        * `Location` / `Place` (where entities or events are situated, an `Entity` frame).
        * `Spatial_relation` (the relationship between spatial entities, a `Relation` frame).
        * `Entity` (the objects located in space, an `Entity` frame).
        * `Event` (a situation happening in space, an `Event` frame).
        * `Action` (an event involving change of location or spatial arrangement, an `Event` frame, potentially linking to `Agentive_Behavior_Scenario`).
        * `Dimension` / `Size` (attributes of spatial entities, `Attribute` frames).
        * `Path` / `Route` (for `Motion` events, an `Entity` frame).
    * **Typical Sequence/Dynamics:** `Entities` occupy `Locations` and have `Spatial_Relations` to other entities. `Actions` can cause `Entities` to `Move` to new `Locations` or change their `Spatial_Relations`. `Events` occur at specific `Locations`.

* **Key Participants/Elements (from Hobbs):** `Entity/Agent`, `Location`, `Spatial_Relationship_Type`.

* **Relation to Other Common Sense Concepts (from Hobbs):** Crucial context for `Action`. Informs `Perception`. A factor in `Planning`. Supports reasoning about `Causation`.

---

### **13. `Agent_Environment_Interaction_Scenario`**

* **Hobbs's Core Concept/Axiom Group:** **Mind-Body Interaction**
    * **Description:** Hobbs implicitly addresses mind-body interaction by formalizing how mental states lead to physical actions, and how physical perceptions lead to mental states. These connections are integrated throughout his system.
    * **Source Reference:** "commonsense_psychology_cleaned.pdf" (implicit throughout, but evident in discussions of Perception [p. 1, p. 8], Action [p. 5, p. 8], Intention [p. 5], and Belief formation [p. 1]).

* **FN3 Relevance - Type of Common Sense "Situation":** Relation (causal links between mental and physical), Broader/Scenario Potential

* **Potential FN3 Frame (Specific):**
    * **Existing FrameNet Brasil Frames:** No direct frame. Many frames imply this connection (e.g., `Perception`, `Perform_act`).
    * **Proposed New Specific Frame Name:** `Mental_Physical_Causation` or `Cognition_Action_Link`.

* **Potential FN3 Scenario (Broader):** `Agent_Environment_Interaction_Scenario`
    * **Purpose:** This overarching scenario models the fundamental common-sense cycle of an `Agent` dynamically interacting with and adapting to its `Environment`. It encompasses how the `Agent` perceives the `Environment`, how these perceptions influence its `Internal_States` (such as `Beliefs` and `Emotions`), how these `Internal_States` drive `Purposeful_Behavior` (`Actions`), and how these `Actions` in turn modify the `Environment`, creating a continuous feedback loop.
    * **Key Constituent Concepts/Potential Frames (Primarily other Scenarios):**
        * `Agent` (the central interacting entity, an `Entity` frame).
        * `Environment` (the physical and/or social context, an `Entity` frame).
        * `Perceptual_Information_Acquisition_Scenario` (how the agent takes in information from the environment).
        * `Belief_State_Management_Scenario` (how the agent's internal model of the environment is updated).
        * `Emotional_Experience_Scenario` (how the environment or events trigger emotions).
        * `Motivation_and_Goal_Setting_Scenario` (how desires arise in response to needs/environment).
        * `Goal_Directed_Action_Scenario` (the full cycle of purposeful behavior from desire to action and outcome).
        * `Causal_Event_Chain_Scenario` (describing how agent actions cause changes in the environment).
        * `Spatial_Configuration_Scenario` (the spatial context of interaction).
        * `Temporal_Structuring_Scenario` (the temporal context of interaction).
    * **Typical Sequence/Dynamics:** `Environment` (via `Spatial`/`Temporal` scenarios) presents `Phenomena` -> `Agent` (via `Perceptual_Information_Acquisition_Scenario`) `Perceives` `Phenomena` -> `Agent`'s `Beliefs` are updated (via `Belief_State_Management_Scenario`) and `Emotions` may be `Triggered` (via `Emotional_Experience_Scenario`) -> Based on `Beliefs` and `Desires` (via `Motivation_and_Goal_Setting_Scenario`), `Agent` forms `Intentions` and `Plans` -> `Agent` (via `Agentive_Behavior_Scenario`) performs `Actions` on the `Environment` -> `Actions` cause `Effects` (via `Causal_Event_Chain_Scenario`) in `Environment`, leading back to new `Phenomena` to perceive. This is a continuous, recursive cycle.

* **Key Participants/Elements (from Hobbs):** `Agent`, `Mental_State`, `Physical_Action`, `Perceptual_Input`, `State_of_Affairs`.

* **Relation to Other Common Sense Concepts (from Hobbs):** Central to all cognitive-behavioral links: `Perception` -> `Belief`, `Desire` / `Intention` -> `Action`. Underlies `Planning`. Involves `Causation`.

---

### **14. `Social_Commitment_and_Interaction_Scenario`**

* **Hobbs's Core Concept/Axiom Group:** **Social Interaction / Obligation**
    * **Description:** Hobbs introduces concepts related to social interaction, focusing on how communication can establish social commitments and obligations between agents. He discusses speech acts like promising, which create an expectation that the agent will perform a future action.
    * **Source Reference:** "commonsense_psychology_cleaned.pdf" (primarily pages 11-12, "Speech Acts and Obligation").

* **FN3 Relevance - Type of Common Sense "Situation":** Relation, Event, State, Broader/Scenario Potential

* **Potential FN3 Frame (Specific):**
    * **Existing FrameNet Brasil Frames:** `Committing_to_action`, `Promise`, `Compliance`, `Debt`, `Social_relation`.
    * **Proposed New Specific Frame Name:** `Obligation` (State frame), `Social_Contract`.

* **Potential FN3 Scenario (Broader):** `Social_Commitment_and_Interaction_Scenario`
    * **Purpose:** This scenario models the common-sense processes and `Relations` by which `Agents` engage in `Social_Interaction` to establish, manage, and respond to `Commitments` and `Obligations`. It encompasses `Communicative_Acts` (like `Promises`), the creation of mutual `Expectations`, the subsequent `Actions` (or inactions) related to these `Commitments`, and their `Consequences` for the `Agents`' `Social_Relationships`.
    * **Key Constituent Concepts/Potential Frames:**
        * `Agent_Committing` (the entity making the commitment, an `Entity` frame).
        * `Agent_Recipient` (the entity to whom the commitment is made, an `Entity` frame).
        * `Obligation` (the state of being bound to perform an action, a `State` frame).
        * `Commitment` (the act of binding oneself, an `Event` frame, or a `State` frame).
        * `Promise` (a specific `Speech_Act` creating an obligation, an `Event` frame).
        * `Agreement` / `Contract` (broader forms of mutual commitment, `Entity` or `State` frames).
        * `Action_Obligated` (the specific act committed to, an `Event` frame).
        * `Information_Exchange_Scenario` (for the communicative aspect of creating/discharging commitments).
        * `Agentive_Behavior_Scenario` (for the performance of the obligated action).
        * `Fulfillment` / `Compliance` (performing the obligated action, an `Event` frame).
        * `Violation` / `Breach` (failing to perform the obligated action, an `Event` frame).
        * `Expectation` (mental state of anticipated action, a `State` frame).
        * `Trust` / `Distrust` (social belief states, `State` frames).
        * `Social_Relationship` (the background context of interaction, a `Relation` frame).
    * **Typical Sequence/Dynamics:** `Agent_Committing` (via `Information_Exchange_Scenario`'s `Utterance`) performs a `Speech_Act` (e.g., `Promise`) to `Agent_Recipient` -> An `Obligation` / `Commitment` for an `Action_Obligated` is created -> `Agent_Committing` then (via `Agentive_Behavior_Scenario`) performs `Fulfillment` / `Compliance` or `Violation` / `Breach` of the `Action_Obligated` -> This impacts the `Expectations` and `Trust` between `Agents` and their `Social_Relationship`.

* **Key Participants/Elements (from Hobbs):** `Agent_Committing`, `Agent_Recipient`, `Action_Obligated`, `Speech_Act`, `Time`.

* **Relation to Other Common Sense Concepts (from Hobbs):** Build upon `Communication`. Involves `Beliefs`. Connects `Intention` to `Action`. Essential for understanding `Social` domains.

---

### **15. `Information_Retention_and_Recall_Scenario`**

* **Hobbs's Core Concept/Axiom Group:** **Memory**
    * **Description:** Hobbs implicitly integrates memory through his discussion of an agent's persistent `Beliefs` and the idea that agents retain information about past events and states. The continuous existence of beliefs and knowledge over time, which inform `Planning` and `Action`, presumes a mechanism of memory.
    * **Source Reference:** "commonsense_psychology_cleaned.pdf" (primarily implicit in discussions of belief persistence and knowledge utilization; e.g., p. 1, p. 3, p. 6).

* **FN3 Relevance - Type of Common Sense "Situation":** Process, State, Entity, Broader/Scenario Potential

* **Potential FN3 Frame (Specific):**
    * **Existing FrameNet Brasil Frames:** `Memory` (State/Entity frame). `Cognition`.
    * **Proposed New Specific Frame Name:** N/A.

* **Potential FN3 Scenario (Broader):** `Information_Retention_and_Recall_Scenario`
    * **Purpose:** This scenario models the common-sense cognitive processes by which an `Agent` acquires `Information` or `Experiences`, encodes them into `Memory`, retains them over `Time`, and subsequently `Recalls` or `Retrieves` them for use in ongoing `Cognition`, `Decision_Making`, `Problem_Solving`, or `Action`. It captures the dynamic interplay between current experience and stored knowledge.
    * **Key Constituent Concepts/Potential Frames:**
        * `Memory` (the faculty or stored information, a `State` or `Entity` frame).
        * `Agent` (the entity with memory, an `Entity` frame) [implicitly throughout `commonsense_psychology_cleaned.pdf`].
        * `Information` / `Content` (what is stored or retrieved, an `Entity` or `Proposition` frame).
        * `Past_Event` / `Past_State` (the referent of memories, `Event` or `State` frames).
        * `Encoding` / `Learning` (the process of committing to memory, a `Process` frame).
        * `Retention` (the state of being stored, a `State` frame).
        * `Recalling` / `Retrieval` (the act of accessing stored information, an `Event` or `Process` frame).
        * `Forgetting` (failure of retention or retrieval, an `Event` or `State` frame).
        * `Belief_State_Management_Scenario` (as source for information being encoded, and beneficiary of retrieved beliefs).
        * `Perceptual_Information_Acquisition_Scenario` (a primary source for new memories).
        * `Information_Exchange_Scenario` (another primary source for new memories).
        * `Cognition` / `Reasoning` (where retrieved information is used, `Process` frames).
    * **Typical Sequence/Dynamics:** `Agent` experiences `Past_Event` or acquires `Information` (via `Perception` or `Communication`) -> `Information` undergoes `Encoding` / `Learning` process -> `Information` is in `Retention` (in `Memory`) over `Time` -> `Agent` performs `Recalling` / `Retrieval` triggered by current need or cue -> `Retrieved_Information` is used in `Cognition`, `Planning`, or `Action`.

* **Key Participants/Elements (from Hobbs):** `Agent` [implicitly throughout `commonsense_psychology_cleaned.pdf`], `Information/Beliefs`, `Past_Events/States` [implicitly throughout `commonsense_psychology_cleaned.pdf`].

* **Relation to Other Common Sense Concepts (from Hobbs):** Underlies the persistence of `Beliefs` and `Knowledge`. Provides critical input for `Planning`. Influences `Decision_Making` and `Problem_Solving`. `Perception` and `Communication` are primary ways new information enters memory.

---
