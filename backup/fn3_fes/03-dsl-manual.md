# FN3 Frame Definition DSL Manual (Draft v0.1)

## 1. Introduction

This document describes the Domain-Specific Language (DSL) designed for defining frames within FrameNet Brasil (FN3). The primary goal of this DSL is to provide a human-readable, yet formally translatable, syntax for expressing the rich semantic and common-sense knowledge associated with each frame. This DSL will enable the automated "compilation" of frame definitions into an OWL ontology (integrating DUL and CSP) for computational inference and reasoning.

The design philosophy prioritizes clarity, consistency, and direct mapping to our underlying ontological commitments (DUL and CSP).

## 2. General Syntax Rules

- **Case Sensitivity:** Keywords are generally uppercase (e.g., `FRAME`, `TYPE`). User-defined names (frame names, FE names) are case-sensitive and typically use PascalCase for frames/classes and camelCase for properties.
    
- **Indentation:** Indentation is used for readability to denote nested structures (e.g., FEs within a Frame, rules within `COMMON_SENSE_RULES`).
    
- **Comments:** Single-line comments begin with `//`. Multi-line comments are enclosed in `/* ... */`.
    
- **Identifiers:** Frame names and Frame Element names should be valid identifiers (alphanumeric, no spaces, can use underscores for specific FE modifiers if necessary, but camelCase is preferred). They should correspond to the names used in the FrameNet schema and the generated OWL ontology.
    
- **Literal Values:** Strings are enclosed in double quotes (`" "`). Numbers are written as standard numerals. Boolean values are `true` or `false`.
    

## 3. Frame Declaration Keywords

These keywords are used to define the overall structure and metadata of a frame.

### 3.1. `FRAME`

- **Syntax:** `FRAME <FrameName>:`
    
- **Semantics:** Declares the beginning of a new frame definition. `<FrameName>` should be unique and follow the FrameNet naming conventions.
    
- **Example:**
    
    ```
    FRAME Abandonment:
        // ... frame definition ...
    ```
    

### 3.2. `DESCRIPTION`

- **Syntax:** `DESCRIPTION "<natural language description>"`
    
- **Semantics:** Provides a human-readable natural language description of the frame's semantics, similar to current FrameNet definitions. This string will be used as `rdfs:comment` in the OWL ontology.
    
- **Example:**
    
    ```
    FRAME Abandonment:
        DESCRIPTION "An Agent leaves behind a Theme effectively rendering it no longer within their control or of the normal security as one's property."
    ```
    

### 3.3. `TYPE`

- **Syntax:** `TYPE <FrameType>`
    
- **Semantics:** Assigns a fundamental ontological type to the frame, which corresponds to one of the six high-level FrameNet Brasil types. This implicitly links the frame to its corresponding conceptual template and DUL/CSP superclasses.
    
    - Valid types: `Entity`, `Event`, `Process`, `State`, `Relation`, `Attribute`.
        
- **Example:**
    
    ```
    FRAME Abandonment:
        TYPE Event
    ```
    

## 4. Frame Element Declaration Keywords

These keywords are used to define the Frame Elements (FEs) associated with a frame.

### 4.1. `CORE_FEs:`

- **Syntax:**
    
    ```
    CORE_FEs:
        <FE_Name>: TYPE <OntologicalType>, [CONSTRAINT <Constraint>]
        // ... more core FEs ...
    ```
    
- **Semantics:** Introduces the section for core Frame Elements. Each `<FE_Name>` is an essential participant or attribute for the frame.
    
    - `TYPE <OntologicalType>`: Specifies the general ontological category of the FE filler (e.g., `Person`, `PhysicalObject`, `Proposition`, `Event`). These types should correspond to classes defined in DUL or CSP. This will translate to `rdfs:range` or `owl:allValuesFrom` restrictions in OWL.
        
    - `CONSTRAINT <Constraint>`: Optional. Allows for additional restrictions on the FE's properties, such as `INTENTIONAL true` for an agent, or `IS_ANIMATE true`.
        
- **Example:**
    
    ```
    CORE_FEs:
        agent: TYPE csp:CognitiveAgent, INTENTIONAL true
        theme: TYPE dul:PhysicalObject
    ```
    

### 4.2. `OPTIONAL_FEs:`

- **Syntax:**
    
    ```
    OPTIONAL_FEs:
        <FE_Name>: TYPE <OntologicalType>, [CONSTRAINT <Constraint>]
        // ... more optional FEs ...
    ```
    
- **Semantics:** Introduces the section for optional Frame Elements. These FEs provide additional detail but are not strictly necessary for an instance of the frame to occur. Syntax and semantics are otherwise identical to `CORE_FEs`.
    
- **Example:**
    
    ```
    OPTIONAL_FEs:
        place: TYPE dul:Location
        time: TYPE dul:TemporalInterval
    ```
    

## 5. Frame-to-Frame Relation Keywords

These keywords express relationships between the current frame and other frames in the FN3 network.

### 5.1. `INHERITS_FROM`

- **Syntax:** `INHERITS_FROM <ParentFrameName>`
    
- **Semantics:** Indicates that the current frame is a specialization of another frame. This directly translates to an `rdfs:subClassOf` axiom in OWL.
    
- **Example:**
    
    ```
    FRAME Abandonment:
        // ...
        INHERITS_FROM Relinquish // Assuming 'Relinquish' is another defined frame
    ```
    

### 5.2. `USES_FRAME`

- **Syntax:** `USES_FRAME <UsedFrameName>`
    
- **Semantics:** Indicates that the current frame's definition or typical scenario involves or draws upon concepts from another frame. This often implies conceptual components or sub-events. In OWL, this might be modeled with `owl:ObjectProperty` relations between frame instances (e.g., `dul:hasConstituent` or a custom property like `usesConceptualBackground`) or through more complex axioms if it implies FE sharing. This will be further refined in the DSL for scenarios.
    
- **Example:**
    
    ```
    FRAME Commerce_scenario:
        // ...
        USES_FRAME Commerce_buy
        USES_FRAME Commerce_sell
    ```
    

### 5.3. `SUBFRAME_OF` (Alternative/Clarification of `INHERITS_FROM`)

- **Syntax:** `SUBFRAME_OF <ParentFrameName>`
    
- **Semantics:** This is semantically equivalent to `INHERITS_FROM` and can be used interchangeably to indicate a sub-type relationship. It will also translate to `rdfs:subClassOf`.
    
- **Example:**
    
    ```
    FRAME Activity_finish:
        // ...
        SUBFRAME_OF Activity // Activity_finish is a specific stage of an Activity
    ```
    

## 6. Common Sense Rule Keywords

This section outlines the operators and constructs used to define common sense rules, preconditions, postconditions, and implications within a frame. These rules leverage the properties defined in the DUL/CSP ontology for precise semantic representation.

### 6.1. `COMMON_SENSE_RULES:`

- **Syntax:**
    
    ```
    COMMON_SENSE_RULES:
        RULE <RuleNumber>: <ConditionalStatement> THEN <ConsequenceStatement>
        // OR
        IMPLIES <Statement>
        // OR
        PRECONDITION <Statement>
        // OR
        POSTCONDITION <Statement>
        // ... more rules ...
    ```
    
- **Semantics:** Introduces a block where common sense rules are defined. Each rule should be numbered for reference. Rules can be `IF-THEN` statements, simple `IMPLIES` statements, or explicitly marked `PRECONDITION` or `POSTCONDITION` statements. These statements will generally translate into SWRL rules or complex OWL axioms.
    

### 6.2. Logical Operators

These operators combine or modify statements within rules.

- `AND`: Logical conjunction.
    
    - **Syntax:** `<Statement1> AND <Statement2>`
        
    - **Semantics:** Both `<Statement1>` and `<Statement2>` must be true.
        
- `OR`: Logical disjunction.
    
    - **Syntax:** `<Statement1> OR <Statement2>`
        
    - **Semantics:** Either `<Statement1>` or `<Statement2>` (or both) must be true.
        
- `NOT`: Logical negation.
    
    - **Syntax:** `NOT <Statement>`
        
    - **Semantics:** `<Statement>` is false.
        
- `IF ... THEN ...`: Conditional implication.
    
    - **Syntax:** `IF <ConditionStatement> THEN <ConsequenceStatement>`
        
    - **Semantics:** If `<ConditionStatement>` is true, then `<ConsequenceStatement>` must also be true.
        

### 6.3. Temporal Operators

These operators express relationships between events or states in time. They often relate to a specific event instance of the current frame (referred to implicitly as "this Event").

- `BEFORE <TemporalPoint>`
    
    - **Syntax:** `<Statement> BEFORE <TemporalPoint>`
        
    - **Semantics:** `<Statement>` holds true at a time prior to `<TemporalPoint>`.
        
- `AFTER <TemporalPoint>`
    
    - **Syntax:** `<Statement> AFTER <TemporalPoint>`
        
    - **Semantics:** `<Statement>` holds true at a time subsequent to `<TemporalPoint>`.
        
- `AT <TemporalPoint>`
    
    - **Syntax:** `<Statement> AT <TemporalPoint>`
        
    - **Semantics:** `<Statement>` holds true at the specific `<TemporalPoint>`.
        
- `DURING <TemporalInterval>`
    
    - **Syntax:** `<Statement> DURING <TemporalInterval>`
        
    - **Semantics:** `<Statement>` holds true throughout the entirety of `<TemporalInterval>`.
        

### 6.4. Relational Operators (Mapping to DUL/CSP Object Properties)

These operators form the core of our rule language, directly leveraging the object properties defined in DUL and our CSP extension. The `<FE_Name>` refers to the Frame Elements defined for the current frame.

- `<FE_Name> HAS_PROPERTY <PropertyName>`
    
    - **Syntax:** `<FE_Name> HAS_PROPERTY <PropertyName>`
        
    - **Semantics:** The entity filling `<FE_Name>` has the specific `<PropertyName>`. This maps to a `dul:hasQuality` or similar property.
        
    - **Example:** `agent HAS_PROPERTY csp:INTENTIONAL` (meaning `agent` has the quality of intentionality).
        
- `<FE_Name> IS_A <ClassName>`
    
    - **Syntax:** `<FE_Name> IS_A <ClassName>`
        
    - **Semantics:** The entity filling `<FE_Name>` is an instance of `<ClassName>`. Maps to `rdf:type` or `owl:hasValue` restrictions.
        
    - **Example:** `agent IS_A csp:CognitiveAgent`
        
- `<FE_Name> <DUL/CSP_Property> <RelatedFE_Name/Value>`
    
    - **Syntax:** This is the most direct mapping. We use a syntax that mirrors the `subject property object` structure of OWL triples.
        
    - **Semantics:** Represents a direct assertion using an ontological property.
        
    - **Examples based on CSP/DUL properties:**
        
        - `agent csp:hasControl theme` (maps to `csp:hasControl` property)
            
        - `beliefState csp:hasBeliever agent` (maps to `csp:hasBeliever` property)
            
        - `perceptionEvent csp:perceivesPhenomenon phenomenon` (maps to `csp:perceivesPhenomenon` property)
            
        - `action dul:causes effect` (maps to `dul:causes` property)
            
        - `theme dul:hasQuality csp:CompromisedSecurity` (maps to `dul:hasQuality` for a defined quality)
            
        - `thisEvent dul:occursAt time` (refers to the implicit instance of the frame's event, maps to `dul:occursAt` property)
            

### 6.5. State Change Operators

These operators describe changes in the state of entities.

- `<FE_Name> BECOMES <NewState>`
    
    - **Syntax:** `<FE_Name> BECOMES <NewState>`
        
    - **Semantics:** The entity filling `<FE_Name>` transitions to `<NewState>`.
        
- `<FE_Name> CHANGES_FROM <InitialState> TO <FinalState>`
    
    - **Syntax:** `<FE_Name> CHANGES_FROM <InitialState> TO <FinalState>`
        
    - **Semantics:** The entity filling `<FE_Name>` transitions from `<InitialState>` to `<FinalState>`.
        
- `<FE_Name> REMAINS_IN <State>`
    
    - **Syntax:** `<FE_Name> REMAINS_IN <State>`
        
    - **Semantics:** The entity filling `<FE_Name>` continues to be in `<State>`.
        

### 6.6. Quantification and Modality Operators

These operators allow for expressing typicality, defaults, or existential/universal quantification.

- `TYPICALLY <Statement>`
    
    - **Syntax:** `TYPICALLY <Statement>`
        
    - **Semantics:** `<Statement>` is generally true, but exceptions may exist. This would translate to softer axioms or rules that can be overridden in non-monotonic reasoning systems, or explicit `dul:hasQuality` assertions about `typicality`.
        
- `DEFAULT_IMPLIES <Statement>`
    
    - **Syntax:** `DEFAULT_IMPLIES <Statement>`
        
    - **Semantics:** If no information contradicts `<Statement>`, then it is assumed true. Similar to `TYPICALLY`.
        
- `EXISTS <EntityVariable> WHERE <Statement>`
    
    - **Syntax:** `EXISTS <EntityVariable> WHERE <Statement>`
        
    - **Semantics:** There is at least one instance of `<EntityVariable>` for which `<Statement>` is true. Maps to `owl:someValuesFrom`.
        
- `ALL <EntityVariable> WHERE <Statement>`
    
    - **Syntax:** `ALL <EntityVariable> WHERE <Statement>`
        
    - **Semantics:** For every instance of `<EntityVariable>`, `<Statement>` is true. Maps to `owl:allValuesFrom`.
        

## 7. Example Frame Definition (Putting it all together)

Here’s how a frame definition might look using the proposed DSL.

```
FRAME Abandonment:
    DESCRIPTION "An Agent leaves behind a Theme effectively rendering it no longer within their control or of the normal security as one's property."
    TYPE Event
    INHERITS_FROM Relinquish

    CORE_FEs:
        agent: TYPE csp:CognitiveAgent, INTENTIONAL true
        theme: TYPE dul:PhysicalObject

    OPTIONAL_FEs:
        place: TYPE dul:Location
        time: TYPE dul:TemporalInterval
        manner: TYPE dul:Quality

    COMMON_SENSE_RULES:
        // Rule 1: Precondition - Agent must have control over the Theme before the abandonment event.
        PRECONDITION: agent csp:hasControl theme BEFORE thisEvent dul:hasStartingTime

        // Rule 2: Postcondition - Agent no longer has control over the Theme after the abandonment event.
        POSTCONDITION: NOT (agent csp:hasControl theme) AFTER thisEvent dul:hasFinishingTime

        // Rule 3: Implication - If the Theme was the Agent's property, it ceases to be after the abandonment.
        RULE 3: IF (theme dul:isPropertyOf agent) THEN (NOT (theme dul:isPropertyOf agent) AFTER thisEvent dul:hasFinishingTime)

        // Rule 4: Default Implication - The security status of the Theme becomes compromised.
        DEFAULT_IMPLIES: theme dul:hasQuality csp:CompromisedSecurity AFTER thisEvent dul:hasFinishingTime

        // Rule 5: Example of using optional FEs in a rule
        RULE 5: IF (place EXISTS_AND_IS_A dul:Location) THEN (thisEvent dul:occursAt place)

/* Example of how a rule might refer to broader scenario frames:
COMMON_SENSE_RULES:
    RULE 1: thisEvent csp:isConstituentOf Abandonment_Scenario
*/
```

## 8. Future Work

This draft manual provides the foundational syntax and semantics for the DSL. Future work will involve:

- **Detailed FE Typing:** Expanding the specific `TYPE` options for FEs, drawing comprehensively from DUL and CSP.
    
- **Scenario DSL Extensions:** Defining specific keywords and constructs for modeling the temporal and causal flow within complex scenario frames (e.g., sequences of events, states, and participant roles).
    
- **Full OWL/SWRL Mapping Specifications:** Documenting the precise translation rules from each DSL construct to corresponding OWL axioms and SWRL rules.
    
- **Tooling Development:** Building a parser and compiler for the DSL, along with validation and visualization tools.
    

This manual is a living document and will evolve as the FN3 project progresses and its requirements become more refined.