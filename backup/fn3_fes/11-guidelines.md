# Guidelines for Mapping FN3 Frames to DSL Templates

This document provides detailed guidelines for mapping existing FrameNet Brasil (FN3) frames (and defining new ones) to the standardized DSL templates for `Entity`, `Event`, `Process`, `State`, `Relation`, `Attribute`, and `Scenario`. The goal is to ensure consistency, maximize ontological alignment with DUL and CSP, and facilitate computational inference.

## 1. Overview of the Mapping Process

The mapping process is an iterative endeavor that involves carefully analyzing the natural language definition of a frame, its Lexical Units (LUs), and Frame Element (FE) definitions, and then translating this semantic content into the structured DSL syntax.

**General Steps:**

1. **Frame Analysis & Type Assignment:** Understand the frame's core meaning and assign it to the most appropriate DSL `TYPE`.
    
2. **FE Identification & Mapping:** Map existing FEs to Core/Optional FEs in the chosen template, assigning appropriate ontological types (DUL/CSP classes).
    
3. **Inheritance & Relations:** Identify `INHERITS_FROM` and `USES_FRAME` relationships.
    
4. **Common Sense Rule Formalization:** Translate implicit or explicit common sense knowledge from the frame's definition and FEs into formal `COMMON_SENSE_RULES` using the DSL operators and DUL/CSP properties.
    
5. **Review & Refinement:** Continuously review the DSL definition for accuracy, completeness, and consistency with the underlying ontologies.
    

## 2. Step-by-Step Mapping Guidelines

### Step 1: Frame Analysis and Type Assignment

- **Read the Frame Definition Carefully:** Pay close attention to the `description` field in the `fnbr_frame.csv` or existing FNBr documentation. Understand the core concept the frame aims to capture.
    
- **Analyze Lexical Units (LUs):** Consider the verbs, nouns, adjectives, or adverbs associated with the frame. What kind of phenomena do they primarily denote?
    
- **Primary Question:** Determine what the frame primarily describes:
    
    - **Thing/Object?** -> `TYPE Entity`
        
    - **Happening/Occurrence (often punctual, with clear beginning/end)?** -> `TYPE Event`
        
    - **Ongoing Activity/Development (durative, with phases)?** -> `TYPE Process`
        
    - **Static Condition/Quality (persists over time)?** -> `TYPE State`
        
    - **Connection/Relationship between entities?** -> `TYPE Relation`
        
    - **Characteristic/Property of an entity (often scalar)?** -> `TYPE Attribute`
        
    - **Complex sequence of events, processes, and states (often goal-oriented)?** -> `TYPE Scenario`
        
- **Consult Templates:** Refer to the DSL templates for each type (`Entity`, `Event`, `Process`, `State`, `Relation`, `Attribute`, `Scenario`) to see which structure best accommodates the frame's core meaning.
    
- **Initial `FRAME` Declaration:** Begin writing the DSL definition:
    
    ```
    FRAME <FrameName>:
        DESCRIPTION "<natural language description>"
        TYPE <AssignedType>
    ```
    

### Step 2: Frame Element (FE) Identification and Mapping

- **List All Existing FEs:** Extract all defined FEs from the current FrameNet Brasil documentation for the target frame.
    
- **Categorize as Core or Optional:**
    
    - **Core FEs:** Identify FEs that are absolutely essential for an instance of the frame to exist or be understood. If removing an FE makes the frame unintelligible, it's likely a Core FE. Map them to the `CORE_FEs:` section of the DSL template.
        
    - **Optional FEs:** FEs that provide additional, but not strictly necessary, contextual information. Map them to the `OPTIONAL_FEs:` section.
        
- **Assign Ontological Types (DUL/CSP Classes):** For each FE, determine the most appropriate `TYPE` from our DUL and CSP ontology modules.
    
    - **Prioritize Specificity:** Choose the most specific DUL/CSP class that accurately describes the FE.
        
        - e.g., `agent: TYPE csp:CognitiveAgent` (prefer `csp:CognitiveAgent` over `dul:Agent` if intentionality/mind is implied).
            
        - e.g., `location: TYPE dul:Location` (or `dul:GeographicalRegion`, `dul:PhysicalPlace` depending on context).
            
        - e.g., `time: TYPE dul:TemporalInterval`.
            
    - **Use `xsd` types for literals:** For values like numbers, boolean, or strings, use `xsd:integer`, `xsd:boolean`, `xsd:string`, etc.
        
    - **Add Constraints:** If an FE has specific implicit properties (e.g., an agent must be intentional, `CONSTRAINT INTENTIONAL true`), add these as constraints.
        
- **Example (for `Abandonment` - `Event` type):**
    
    ```
    CORE_FEs:
        agent: TYPE csp:CognitiveAgent, CONSTRAINT INTENTIONAL true
        theme: TYPE dul:Object
    
    OPTIONAL_FEs:
        place: TYPE dul:Location
        time: TYPE dul:TemporalInterval
        manner: TYPE dul:Quality
        purpose: TYPE dul:Purpose
    ```
    

### Step 3: Inheritance and Frame Relations

- **Identify `INHERITS_FROM` (or `SUBFRAME_OF`):**
    
    - Does this frame represent a more specific version of another existing FN3 frame? (e.g., `Killing` is a specific kind of `Cause_harm`).
        
    - If so, add the `INHERITS_FROM <ParentFrameName>` declaration. This creates a subclass relationship in OWL.
        
- **Identify `USES_FRAME` (Primarily for `Scenario` types):**
    
    - For `Scenario` frames, explicitly list the other frames (Entity, Event, Process, State, Relation, Attribute) that typically constitute or are central components of this scenario. This helps to define the scenario's composition.
        
    - Example for `Goal_Directed_Action_Scenario`:
        
        ```
        USES_FRAME:
            Motivation_and_Goal_Setting_Scenario
            Goal_Directed_Planning_Scenario
            Agentive_Behavior_Scenario
            // ... and specific types like csp:Action, csp:BeliefState, etc.
        ```
        

### Step 4: Common Sense Rule Formalization

This is the most critical and potentially complex step, requiring careful translation of implicit human understanding into explicit logical rules.

- **Analyze the Frame's Natural Language Description:** Look for implicit preconditions, postconditions, causal links, typical behaviors, and necessary properties.
    
    - **Keywords to watch for in descriptions:** "requires," "implies," "causes," "results in," "precedes," "follows," "typically," "usually," "must be," "can be," "is composed of," "is a part of," "is used for," "is intended to."
        
- **Identify Inherent Properties:** State fundamental truths about the frame instance itself.
    
    - e.g., For `Event` frames: `IMPLIES: thisFrameInstance dul:occursAt thisFrameInstance dul:hasTime`.
        
- **Formalize Preconditions and Postconditions:**
    
    - **Precondition:** A state or event that _must_ hold true _before_ the frame instance can occur or begin.
        
        - Syntax: `PRECONDITION: <Statement> [BEFORE thisFrameInstance dul:hasStartingTime]`
            
        - Example (`Abandonment`): `PRECONDITION: agent csp:hasControl theme BEFORE thisFrameInstance dul:hasStartingTime`
            
    - **Postcondition:** A state or event that _must_ hold true _after_ the frame instance has completed.
        
        - Syntax: `POSTCONDITION: <Statement> [AFTER thisFrameInstance dul:hasFinishingTime]`
            
        - Example (`Abandonment`): `POSTCONDITION: NOT (agent csp:hasControl theme) AFTER thisFrameInstance dul:hasFinishingTime`
            
- **Formalize Implications and Causal Links:**
    
    - Use `IMPLIES:` for general truths or consequences.
        
    - Use `RULE <Number>: IF <Condition> THEN <Consequence>` for conditional implications.
        
    - Leverage DUL/CSP properties as `SUBJECT PROPERTY OBJECT` triples.
        
        - Example (`Weapon`): `IMPLIES: thisFrameInstance dul:hasPurpose dul:CauseHarmEvent`
            
        - Example (`Abandonment`): `RULE 1: IF (theme dul:isPropertyOf agent BEFORE thisFrameInstance dul:hasStartingTime) THEN (NOT (theme dul:isPropertyOf agent) AFTER thisFrameInstance dul:hasFinishingTime)`
            
    - **Temporal Ordering within Scenarios:** For `Scenario` frames, explicitly model the sequence and causal relationships between `USES_FRAME` instances.
        
        - Example (`Goal_Directed_Action_Scenario`): `RULE 1: EXISTS ?motivationScenario WHERE (?motivationScenario IS_A Motivation_and_Goal_Setting_Scenario AND ...) THEN (EXISTS ?planningScenario WHERE (... AND ?planningScenario dul:occursAfter ?motivationScenario))`
            
- **Use `TYPICALLY` for Defaults:** When a rule is generally true but allows for exceptions, use `TYPICALLY:`. This signals default reasoning.
    
    - Example (`Weapon`): `TYPICALLY: thisFrameInstance dul:isUsedFor csp:Action, CONSTRAINT (csp:Action HAS_PROPERTY csp:INTENDS_HARM)`
        
- **Quantification:** Use `EXISTS ?variable WHERE (<Statement>)` and `ALL ?variable WHERE (<Statement>) THEN (<Consequence>)` for rules involving quantification.
    
- **Referencing the Frame Instance:** **Always use `thisFrameInstance`** to refer to the specific instance of the frame being defined within the `COMMON_SENSE_RULES` block.
    
- **Referencing FEs:** FEs are referred to by their defined names (e.g., `agent`, `theme`, `time`).
    
- **Referencing Other Frame Instances within Rules:** When a rule refers to an instance of another frame (e.g., `?motivationScenario IS_A Motivation_and_Goal_Setting_Scenario`), use a question mark `?` prefix for the variable.
    
- **Review DUL/CSP Properties:** Constantly refer back to the `csp_dul_module` and DUL documentation for appropriate properties (`dul:causes`, `dul:hasAgent`, `csp:hasBeliever`, `dul:holdsFor`, etc.).
    

### Step 5: Review and Refinement

- **Readability Check:** Is the DSL definition clear and easy for a human to understand?
    
- **Semantic Fidelity:** Does the DSL definition accurately capture the original natural language semantics of the frame, without adding or removing unintended meaning?
    
- **Consistency Check:**
    
    - Are all FEs correctly typed according to DUL/CSP?
        
    - Are all core FEs present as required by the template?
        
    - Are DSL keywords used correctly as per the manual?
        
    - Is `thisFrameInstance` used consistently?
        
- **Completeness:** Are all relevant common sense rules captured?
    
- **Test with Examples:** Mentally (or with a future parser) test the definition against positive and negative examples from the original FrameNet data.
    
- **Iterate:** Frame formalization is rarely perfect on the first try. Be prepared to revise and refine the definition as you encounter new examples or gain deeper insights into the frame's semantics and its interactions with the ontology.
    

## 3. Practical Considerations and Tips

- **Start Simple:** Begin by formalizing frames with relatively straightforward definitions and fewer FEs.
    
- **Collaborate:** Share your formalized definitions with other team members for peer review. Different perspectives can catch subtle errors or missed implications.
    
- **Document Assumptions:** If you make an assumption during mapping (e.g., about the implicit intentionality of an agent in a specific context), document it as a comment in the DSL definition or in a separate annotation guide.
    
- **Handle Ambiguity:** If a frame's natural language definition is ambiguous, consider whether the ambiguity is inherent to the language or if it can be resolved by formalizing specific senses. If a frame has genuinely distinct senses, it might need to be split into multiple frames.
    

By following these guidelines, you will systematically build a robust and computationally effective representation of FrameNet Brasil's semantic knowledge. Good luck with the mapping process!