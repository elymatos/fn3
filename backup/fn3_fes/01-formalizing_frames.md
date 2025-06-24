# Proposal for FN3 Frame Formalization: A Hybrid Approach

## Abstract

This document outlines a proposed architecture for formalizing frame definitions within FrameNet Brasil (FN3). Building upon the existing FrameNet methodology and integrating principles from Cognitive Linguistics and Common Sense Psychology, this approach suggests a multi-layered representation. It leverages a structured "template" system for different frame types, enables mapping to logical formalisms like OWL for inference, and introduces the concept of a Domain-Specific Language (DSL) to facilitate human-readable yet computationally precise frame definitions.

## 1. The Rationale for a Mixed Formalism in FN3

The current FrameNet frame definitions are primarily expressed in natural language. While highly valuable for human comprehension and linguistic analysis, this linguistic representation presents inherent challenges for automated processing and computational inference. To unlock the full potential of FN3 in areas like Natural Language Understanding (NLU), knowledge representation, and AI applications, a more formalized approach is necessary.

A single existing formalism (e.g., pure first-order logic, strict object-oriented modeling) is unlikely to capture the full spectrum of semantic nuance inherent in frame semantics without becoming overly cumbersome or semantically impoverished. Therefore, a **mixed or hybrid formalism** is proposed as the most effective solution. This approach allows us to:

- **Preserve Richness:** Maintain the detailed and context-sensitive nature of frame meaning.
    
- **Enable Inference:** Translate definitions into a format capable of supporting logical reasoning and automated querying (e.g., "If Frame A is present, what FEs must be present? What are the typical consequences?").
    
- **Ensure Consistency:** Provide structured guidelines for frame creation, reducing ambiguity and improving annotation quality.
    
- **Enhance Readability:** Offer a human-friendly interface for defining frames, abstracting away complex logical syntax.
    

## 2. Frame Types as Conceptual Templates

A core component of this formalization is the establishment of **predefined "templates" or "sketches" for each fundamental frame type**. These templates will serve as a structured blueprint, guiding the definition of new frames and ensuring consistency across FN3. Each template specifies:

- **Inherent Properties:** Fundamental characteristics associated with the frame type.
    
- **Core Frame Elements (FEs):** The essential participants or attributes typically associated with this type.
    
- **Typical/Optional FEs:** Common, but not strictly required, FEs.
    
- **Common Sense Rules:** The kind of logical or relational statements expected for this frame type.
    

Here are conceptual templates for the primary frame types:

### 2.1. `Entity` Frame Template

Represents concrete or abstract objects, individuals, or things.

- **Inherent Properties:** Has existence, can be located in space and time, possesses attributes.
    
- **Core FEs:** `Entity` (the object itself).
    
- **Typical FEs:** `Descriptor`, `Type`, `Material`, `Creator`, `Time_of_creation`, `Name`, `Origin`, `Use`, `Constituent_parts`, `Place`, `Quantity`.
    
- **DSL Sketch:**
    
    ```
    Frame(TYPE: Entity):
        CORE_FE: Entity
        PROPERTIES:
            - HAS_EXISTENCE: BOOLEAN (DEFAULT: true)
            - CAN_BE_LOCATED: BOOLEAN (DEFAULT: true)
        OPTIONAL_FEs: [Descriptor, Type, Material, Creator, Time_of_creation, Name, Origin, Use, Constituent_parts, Place, Quantity]
        COMMON_SENSE_RULES: (Rules defining attributes, parts, or typical uses)
    ```
    
- **Illustrative Examples from FNBr_Frame.csv:** `Artifact`, `Weapon`, `Clothing`, `Animals`, `Plants`.
    

### 2.2. `Event` Frame Template

Represents happenings or occurrences that typically involve a change of state or location.

- **Inherent Properties:** Occurs at a specific point or period in time, typically involves participants that undergo or cause change, has a causal nature.
    
- **Core FEs:** Often `Agent`, `Theme`, `Patient`, `Experiencer`, `Cause`, `Result` (combinations vary by specific event).
    
- **Typical FEs:** `Time`, `Place`, `Manner`, `Purpose`, `Duration`, `Frequency`.
    
- **DSL Sketch:**
    
    ```
    Frame(TYPE: Event):
        CORE_FEs: [Agent/Cause, Patient/Theme/Experiencer] (select applicable combinations)
        PROPERTIES:
            - IS_PUNCTUAL: BOOLEAN (DEFAULT: false, allowing for duration)
            - CAUSES_CHANGE: BOOLEAN (DEFAULT: true)
        OPTIONAL_FEs: [Time, Place, Manner, Purpose, Duration, Frequency]
        COMMON_SENSE_RULES: (Rules defining pre-conditions, post-conditions, causal relations between sub-events or states)
    ```
    
- **Illustrative Examples from FNBr_Frame.csv:** `Abandonment`, `Arriving`, `Giving`, `Killing`, `Attack`, `Creating`.
    

### 2.3. `Process` Frame Template

Represents an ongoing activity or development that extends over a period of time.

- **Inherent Properties:** Is durative, involves continuous change, typically has distinguishable stages (beginning, ongoing, end).
    
- **Core FEs:** `Process` (the ongoing activity/development itself).
    
- **Typical FEs:** `Agent`, `Time`, `Place`, `Duration`, `Rate`, `Result_state`.
    
- **DSL Sketch:**
    
    ```
    Frame(TYPE: Process):
        CORE_FE: Process
        PROPERTIES:
            - IS_DURATIVE: BOOLEAN (ALWAYS: true)
            - HAS_STAGES: BOOLEAN (DEFAULT: true, e.g., start, ongoing, end)
        OPTIONAL_FEs: [Agent, Time, Place, Duration, Rate, Result_state]
        COMMON_SENSE_RULES: (Rules governing progression, termination conditions, intermediate states)
    ```
    
- **Illustrative Examples from FNBr_Frame.csv:** `Processing_materials`, `Cooking_creation`, `Breathing`, `Dough_rising`.
    

### 2.4. `State` Frame Template

Represents a static condition or quality that persists over a period.

- **Inherent Properties:** Is static, holds true over a duration, does not inherently involve an agent or cause (though agents/causes might initiate or terminate it).
    
- **Core FEs:** `Entity` (the one in the state), `State` (the characteristic or condition).
    
- **Typical FEs:** `Time`, `Place`, `Duration`, `Degree`.
    
- **DSL Sketch:**
    
    ```
    Frame(TYPE: State):
        CORE_FEs: [Entity, State]
        PROPERTIES:
            - IS_STATIC: BOOLEAN (ALWAYS: true)
            - CAN_CHANGE: BOOLEAN (DEFAULT: true, allowing for transitions to/from this state)
        OPTIONAL_FEs: [Time, Place, Duration, Degree]
        COMMON_SENSE_RULES: (Rules defining invariants, conditions for entry into or exit from the state)
    ```
    
- **Illustrative Examples from FNBr_Frame.csv:** `Fullness`, `Being_dry`, `Being_attached`, `Intoxication`, `Being_employed`.
    

### 2.5. `Relation` Frame Template

Describes a connection or relationship between two or more entities.

- **Inherent Properties:** Binds two or more entities, can be symmetric or asymmetric, can be temporal, spatial, or abstract.
    
- **Core FEs:** `Entity_1`, `Entity_2` (for asymmetric relations) or `Entities` (for symmetric).
    
- **Typical FEs:** `Time`, `Place`, `Domain`, `Degree`, `Basis`.
    
- **DSL Sketch:**
    
    ```
    Frame(TYPE: Relation):
        CORE_FEs: [Entity_1, Entity_2] OR [Entities] (select applicable)
        PROPERTIES:
            - IS_SYMMETRIC: BOOLEAN (DEFAULT: false)
        OPTIONAL_FEs: [Time, Place, Domain, Degree, Basis]
        COMMON_SENSE_RULES: (Rules defining the nature, properties, or implications of the relationship)
    ```
    
- **Illustrative Examples from FNBr_Frame.csv:** `Similarity`, `Kinship`, `Personal_relationship`, `Adjacency`.
    

### 2.6. `Attribute` Frame Template

Describes a characteristic or property possessed by an entity, often scalar.

- **Inherent Properties:** Describes a characteristic, often has a measurable value, can be gradable.
    
- **Core FEs:** `Entity` (that possesses the attribute), `Attribute` (the property itself, often incorporated into the frame's meaning).
    
- **Typical FEs:** `Value`, `Degree`, `Parameter`, `Time`, `Context`.
    
- **DSL Sketch:**
    
    ```
    Frame(TYPE: Attribute):
        CORE_FEs: [Entity, Attribute]
        PROPERTIES:
            - IS_GRADABLE: BOOLEAN (DEFAULT: true)
        OPTIONAL_FEs: [Value, Degree, Parameter, Time, Context]
        COMMON_SENSE_RULES: (Rules defining typical ranges, effects of the attribute, or how it's measured)
    ```
    
- **Illustrative Examples from FNBr_Frame.csv:** `Age`, `Expensiveness`, `Fairness_evaluation`, `Speed_description`, `Size`.
    

## 3. Mapping to OWL for Computational Inference

The goal of enabling inference requires a formal ontology language. OWL (Web Ontology Language) is a strong candidate, offering robust capabilities for defining classes, properties, and axioms that can be used by reasoning engines.

- **Frames as OWL Classes:** Each FN3 frame (e.g., `Abandonment`, `Commerce_scenario`) will be represented as an `owl:Class`. This allows for hierarchical organization (`Abandonment rdfs:subClassOf Event`).
    
- **Frame Elements (FEs) as OWL Properties:**
    
    - FEs that link a frame instance to another entity or instance will become `owl:ObjectProperty` (e.g., `hasAgent`, `hasTheme`). The `rdfs:domain` of these properties would be the frame class, and the `rdfs:range` would be the class of entities that can fill that FE (e.g., `Person`, `PhysicalObject`).
        
    - FEs that link a frame instance to a literal value (e.g., a number, a string) will become `owl:DatatypeProperty` (e.g., `hasDuration`, `hasManner`).
        
- **Frame-to-Frame Relations as OWL Axioms:**
    
    - **Inheritance (`inheritsFrom` / `subframe of`):** Directly mapped to `rdfs:subClassOf` axioms. For example, a frame `Abandonment` being a subframe of `Relinquish` would be `Abandonment rdfs:subClassOf Relinquish`.
        
    - **Using:** This is more complex and can be modeled in several ways, often involving `owl:ObjectProperty` relationships between instances of frames (e.g., an instance of `Commerce_scenario` `includesEvent` an instance of `Commerce_buy`). This captures that one frame provides conceptual background or components for another.
        
- **Common Sense Rules and Constraints:** This is where OWL's expressive power, augmented by rule languages like SWRL (Semantic Web Rule Language), becomes crucial.
    
    - **Cardinality Restrictions:** Specify how many fillers an FE can have (e.g., `Abandonment rdfs:subClassOf (hasAgent exactly 1 Person)`).
        
    - **Value Restrictions:** Define the types of values an FE can take (`Abandonment rdfs:subClassOf (hasTheme some PhysicalObject)`).
        
    - **Preconditions, Postconditions, and Causal Links:** These can be expressed as logical axioms or SWRL rules. For example:
        
        - "If an `Abandonment` event occurs involving an `Agent` and a `Theme`, then the `Agent` no longer `hasControl` of the `Theme` after the event." This could be a SWRL rule involving predicates like `hasControl`, `hasAgent`, `hasTheme`, and temporal relations.
            
    - **Disjointness:** Define that certain frames or FEs are mutually exclusive (e.g., `Event owl:disjointWith State`).
        

### 4. The Role of a Domain-Specific Language (DSL)

While OWL provides the formal backbone, its syntax can be verbose and less intuitive for linguists and domain experts. A **Domain-Specific Language (DSL)** would serve as a high-level, human-readable abstraction layer.

- **Key Purpose:** To allow frame and rule definitions to be written in a more natural, concise syntax, which can then be automatically translated ("compiled") into the underlying OWL/SWRL formalism. This means users don't need to be OWL experts to contribute.
    
- **DSL Components (Illustrative Syntax Ideas):**
    
    - **Frame Declaration:** Keywords like `FRAME`, `DESCRIPTION`, `TYPE`.
        
    - **FE Declaration:** Keywords like `CORE_FEs`, `OPTIONAL_FEs`, `TYPE`, `CONSTRAINTS`.
        
    - **Frame-to-Frame Relations:** Keywords like `INHERITS_FROM`, `USES_FRAME`.
        
    - **Common Sense Rule Operators:**
        
        - **Temporal:** `AT`, `BEFORE`, `AFTER`, `DURING`, `OVERLAPS`.
            
        - **Causal/Logical:** `CAUSES`, `ENABLES`, `PREVENTS`, `IMPLIES`, `IF ... THEN`.
            
        - **State Changes:** `BECOMES`, `CHANGES_FROM ... TO`, `REMAINS_IN`.
            
        - **Relational:** `HAS_CONTROL`, `OWNS`, `IS_A`, `NOT IS_A`, `HAS_PROPERTY`.
            
        - **Quantification:** Implicit from FE definition, or explicit using terms like `ALL`, `SOME`.
            
        - **Default/Typicality:** `TYPICALLY`, `DEFAULT_IMPLIES`.
            
- **DSL Examples for `CommonSenseRules`:**
    
    Let's revisit `Abandonment` and `Abounding_with` using this conceptual DSL:
    
    ```
    FRAME Abandonment:
        DESCRIPTION "An Agent leaves behind a Theme effectively rendering it no longer within their control or of the normal security as one's property."
        TYPE Event
        INHERITS_FROM Relinquish
    
        CORE_FEs:
            Agent: TYPE SentientEntity, INTENTIONAL true
            Theme: TYPE PhysicalObject
    
        COMMON_SENSE_RULES:
            // Pre-condition: Agent must have control over Theme before abandonment.
            RULE 1: Agent HAS_CONTROL Theme BEFORE EventTime
    
            // Post-condition: Agent does not have control over Theme after abandonment.
            RULE 2: NOT Agent HAS_CONTROL Theme AFTER EventTime
    
            // Implication: If Theme was Agent's property, it ceases to be after abandonment.
            RULE 3: IF (Theme IS_PROPERTY_OF Agent BEFORE EventTime) THEN (Theme IS_NOT_PROPERTY_OF Agent AFTER EventTime)
    
            // Implication: Theme's security status is compromised.
            RULE 4: IMPLIES (Theme SECURITY_STATUS IS "compromised")
    
    ---
    
    FRAME Abounding_with:
        DESCRIPTION "A Location is filled or covered with the Theme."
        TYPE State
    
        CORE_FEs:
            Location: TYPE Place
            Theme: TYPE Entity OR Substance
    
        COMMON_SENSE_RULES:
            // Definition: Theme occupies all or most of the Location.
            RULE 1: Theme OCCUPIES_REGION_OF Location, SCOPE "all_or_most"
    
            // Implication: Theme is present in a high quantity relative to Location's capacity.
            RULE 2: IMPLIES (Theme QUANTITY IS_HIGH_RELATIVE_TO Location_CAPACITY)
    
            // Implication: Location appears full or covered.
            RULE 3: IMPLIES (Location HAS_VISUAL_QUALITY "full" OR "covered")
    ```
    

This DSL allows us to specify precise semantic relations, preconditions, and postconditions directly within the frame definition, which can then be automatically translated into a formal ontology for reasoning.

## Conclusion

This proposal lays the groundwork for a robust and scalable formalization of FN3's frame semantics. By combining structured templates for frame types, leveraging the inferential power of OWL, and providing an accessible DSL, we can create a knowledge base that is both linguistically rich and computationally effective. This foundational work will be critical for enabling advanced NLU, automated knowledge discovery, and integration with broader AI systems, advancing the goals of FN3 and the field of cognitive linguistics.

I look forward to discussing the specifics of the DSL and frame templates in more detail as we move forward.