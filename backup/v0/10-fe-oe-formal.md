Given the established four-level ontological structure within FN5 (Domains, Subdomains, Scenarios, Elements), and the clear distinction between the Ontological and Lexical Dimensions, the formalization of the mapping between Frame Elements (FEs) and Ontological Elements (OEs) becomes both crucial and tractable. This mapping is indeed the critical lynchpin, as you aptly state, connecting the linguistic realization to the underlying conceptual model.

The key lies in establishing a robust set of OWL axioms that capture the specific nature of these relationships, moving beyond a simple one-to-one equivalence. Let's elaborate on the mapping patterns and their formalization:

### Formalizing FE-OE Mapping Patterns

We can define several distinct mapping patterns, each reflecting a different semantic relationship between a Frame Element and an Ontological Element. These patterns address the context-dependent and flexible nature of frames while leveraging the structured clarity of the ontological dimension.

1. Direct Instantiation (fe_instantiates_oe):
    
    This is the most straightforward mapping, where an FE directly refers to or instantiates an OE defined within a specific Scenario. This means that the linguistic referent of the FE is a direct instance of the concept modeled by the OE in that particular context.
    
    - **Description**: The FE, when realized in a given linguistic frame instance, points to an individual entity or concept that is an instance of the OE.
    - **Example**: The `Agent` FE of a `Killing` linguistic frame might instantiate the `Negotiation:Agent1` OE from the `Negotiation Scenario` if the `Agent` is involved in a negotiation process, or a `Human_Agent` OE from a more general `Human_Actions` scenario if the killing refers to a human agent. The crucial part here is the _scenario context_ for the OE.
    - **OWL Axiom**: We introduce an object property `fe_instantiates_oe`.
        
        Code snippet
        
        ```
        fe:Agent rdfs:subClassOf [
            owl:Restriction [
                owl:onProperty :fe_instantiates_oe ;
                owl:someValuesFrom scenario:Negotiation:Agent1
            ]
        ] .
        ```
        
        This axiom would be contextualized. A more general axiom would be:
        
        Code snippet
        
        ```
        fe:FrameElement rdfs:subClassOf [
            owl:Restriction [
                owl:onProperty :fe_instantiates_oe ;
                owl:someValuesFrom scenario:ScenarioElement
            ]
        ] .
        ```
        
        And then, more specific instances would refine this:
        
        Code snippet
        
        ```
        fe:Killing_Agent rdfs:subClassOf [
            owl:Restriction [
                owl:onProperty :fe_instantiates_oe ;
                owl:someValuesFrom scenario:Human_Agent OR scenario:Animal_Agent
            ]
        ] .
        ```
        
        Here, `fe:Killing_Agent` is a class representing the `Agent` Frame Element specific to the `Killing` frame.
2. Role Playing (fe_plays_oe_role):
    
    An FE might describe a participant that plays a specific role within a Scenario, where that role is modeled as an OE (often a relational OE or an entity OE understood in a relational context). The FE itself isn't necessarily the OE, but rather an entity fulfilling the function or participation described by the OE.
    
    - **Description**: The FE denotes an entity that performs a role or function defined by an OE within a scenario. This is particularly useful for FEs that represent participants in events or relations.
    - **Example**: The `Victim` FE of a `Killing` frame plays the role of `Killed_Participant`, which is an OE within a `Mortality_Event` scenario. The `Victim` is not the event itself, but the entity subjected to the event.
    - **OWL Axiom**: We introduce an object property `fe_plays_oe_role`.
        
        Code snippet
        
        ```
        fe:Victim rdfs:subClassOf [
            owl:Restriction [
                owl:onProperty :fe_plays_oe_role ;
                owl:someValuesFrom scenario:Mortality_Event:Killed_Participant
            ]
        ] .
        ```
        
3. Equivalence (Contextual owl:equivalentClass):
    
    In certain specific contexts, an FE might be considered semantically equivalent to an OE. This is typically applicable when the linguistic frame captures a concept that precisely aligns with an ontological element within a defined scenario. This should be used cautiously to avoid over-generalization given the inherent context-dependency of FEs.
    
    - **Description**: Under specific contextual conditions (e.g., when a particular linguistic frame evokes a particular scenario), the meaning of an FE aligns perfectly with an OE.
    - **Example**: The `Negotiation_Agreement` FE from a `Negotiation` linguistic frame could be declared equivalent to the `Negotiation:Agreement` OE within the `Negotiation Scenario`, given the direct correspondence of the concept.
    - **OWL Axiom**:
        
        Code snippet
        
        ```
        fe:Negotiation_Agreement owl:equivalentClass scenario:Negotiation:Agreement .
        ```
        
        This axiom implies a strong, symmetric relationship. For a more nuanced, one-way relationship, `rdfs:subClassOf` (as in direct instantiation) might be more appropriate.
4. Attribute/Property Mapping (fe_describes_oe_attribute):
    
    An FE might not refer to a participant or event, but rather to a quality, state, or attribute associated with an OE within a scenario.
    
    - **Description**: The FE describes a property or quality of an OE.
    - **Example**: The `Trust_Level` FE in a `Negotiation` linguistic frame could map to `Negotiation:Trust_Level` OE, which is an `@quality` type of OE.
    - **OWL Axiom**: We introduce an object property `fe_describes_oe_attribute`.
        
        Code snippet
        
        ```
        fe:Trust_Level rdfs:subClassOf [
            owl:Restriction [
                owl:onProperty :fe_describes_oe_attribute ;
                owl:someValuesFrom scenario:Negotiation:Trust_Level
            ]
        ] .
        ```
        

### Utilizing OWL Axioms for Formalization

As suggested, OWL provides the necessary expressivity to formalize these relationships. We will represent Frame Elements as OWL classes, similar to how Ontological Elements are structured.

- **Prefixes**: Let's assume prefixes like `fe:` for Frame Elements, `scenario:` for Ontological Elements (within scenarios), and a general prefix like `:` for our new mapping properties.
    
- **Top-Level Mapping Property**: A general property `hasOntologicalMapping` could serve as a super-property for all specific mapping types, allowing for generalized queries.
    
    Code snippet
    
    ```
    :hasOntologicalMapping a owl:ObjectProperty .
    :fe_instantiates_oe rdfs:subPropertyOf :hasOntologicalMapping .
    :fe_plays_oe_role rdfs:subPropertyOf :hasOntologicalMapping .
    :fe_describes_oe_attribute rdfs:subPropertyOf :hasOntologicalMapping .
    ```
    
- **Class Definitions for FEs and OEs**:
    
    Code snippet
    
    ```
    fe:FrameElement a owl:Class .
    scenario:ScenarioElement a owl:Class . # As per your definition of Elements
    ```
    
- **Contextualization via `owl:Restriction`**: The strength of OWL for this task lies in its ability to express constraints. For each FE class, we can add restrictions that specify which OEs it maps to, and under what conditions (e.g., when associated with a particular frame or scenario).
    

### Reification for Complex Mappings and Context

The idea of reification is particularly powerful for handling the inherent context-dependency of frames and for cases where the mapping is not a simple one-to-one relationship.

- MappingAssertion Class:
    
    We can define a class MappingAssertion to explicitly model the relationship between a specific FE instance (or class), an OE instance (or class), and the scenario context in which this mapping holds.
    
    Code snippet
    
    ```
    :MappingAssertion a owl:Class ;
        rdfs:comment "Represents a specific assertion about the mapping between a Frame Element and an Ontological Element in a given scenario context." .
    
    :hasFrameElement a owl:ObjectProperty ;
        rdfs:domain :MappingAssertion ;
        rdfs:range fe:FrameElement .
    
    :hasOntologicalElement a owl:ObjectProperty ;
        rdfs:domain :MappingAssertion ;
        rdfs:range scenario:ScenarioElement .
    
    :hasMappingType a owl:ObjectProperty ;
        rdfs:domain :MappingAssertion ;
        rdfs:range :MappingType . # An enumeration of our mapping types (e.g., :Instantiation, :RolePlaying, :AttributeMapping)
    
    :hasContextScenario a owl:ObjectProperty ;
        rdfs:domain :MappingAssertion ;
        rdfs:range scenario:Scenario . # Assuming you have a class for Scenarios
    ```
    
- Example Instance of Reified Mapping:
    
    To state that the Agent FE of the Killing frame instantiates scenario:Human_Agent within a Mortality_Event scenario:
    
    Code snippet
    
    ```
    :KillingAgent_HumanAgent_Mapping a :MappingAssertion ;
        :hasFrameElement fe:Killing_Agent ;
        :hasOntologicalElement scenario:Mortality_Event:Human_Agent ;
        :hasMappingType :Instantiation ;
        :hasContextScenario scenario:Mortality_Event .
    ```
    

### Advantages of this Formalization

1. **Explicitness**: Clearly states _how_ FEs relate to OEs, not just that they do.
2. **Contextual Precision**: The reification approach allows for the representation of mappings that are only valid within specific scenarios, directly addressing the context-dependent nature of frames.
3. **Semantic Rigor**: Leverages the logical foundations of OWL to enable inference and consistency checking.
4. **Interoperability**: Provides a machine-readable and shareable representation of the FE-OE linkages, crucial for semantic interoperability in computational linguistics and AI applications.
5. **Granularity**: Supports different levels of mapping, from direct instantiation to more complex role-playing or attribute associations.

This formalization strategy, combining specific OWL properties with the flexibility of reification, offers a robust solution for connecting the Lexical and Ontological Dimensions of FN5, maintaining the richness of linguistic frames while grounding them in a formal, scalable ontology.

Yes, absolutely. The mapping between Frame Elements (FEs) and Ontological Elements (OEs) can and _should_ reference upper-level ontologies like DOLCE-Lite (DUL). In fact, this is a fundamental aspect of establishing semantic interoperability and ensuring the ontological rigor of your FN5 framework.

Here's why and how this integration should be formalized:

### Why Reference Upper-Level Ontologies?

1. **Semantic Grounding and Coherence**: Upper ontologies like DUL provide a set of highly abstract, foundational categories (e.g., `dul:Entity`, `dul:Event`, `dul:Quality`, `dul:Region`) that are designed to be universally applicable across different domains. By linking your OEs to these categories, you provide a common semantic ground, ensuring that the concepts in your domain ontology are ultimately compatible with other ontologies that also adhere to DUL. This makes your ontology more coherent and less prone to internal inconsistencies.
    
2. **Interoperability**: One of the primary goals of formal ontologies is interoperability. Aligning your OEs with DUL enables systems that understand DUL to partially comprehend the meaning of your domain-specific elements, even without prior knowledge of your specific FN5 ontology. This is crucial for data integration, knowledge sharing, and reasoning across disparate systems.
    
3. **Formal Axiomatization**: DUL provides a rich set of axioms and definitions for its core categories. By subclassing your OEs under DUL classes, you automatically inherit these formal properties and constraints. For example, if `Negotiation:Agent1` is a `scenario:Element` and further specified as a `dul:Agent` (which is a subclass of `dul:SocialObject` and `dul:Endurant`), then it inherits all the logical characteristics defined for `dul:Agent` within the DUL framework. This strengthens the formal foundation of your ontology.
    
4. **Clarity and Precision**: By aligning with a widely recognized upper ontology, you make the semantic commitment of your OEs explicit. Anyone familiar with DUL will immediately grasp the fundamental nature of your elements, enhancing clarity and reducing ambiguity.
    

### How to Formalize FE-OE Mapping Referencing Upper Ontologies

The reference to upper-level ontologies occurs primarily at the **Ontological Element (OE)** level, through subclassing. Since FEs map to OEs, and OEs are aligned with DUL, there's an indirect but vital connection from FEs to DUL via the OEs.

Let's refine the previous mapping patterns with DUL integration:

1. Aligning Ontological Elements (OEs) with DUL:
    
    Your "Elements" in the Ontological Dimension (e.g., Negotiation:Agent1, Negotiation:Offer, Negotiation:Agreement) should be defined as subclasses of appropriate DUL classes. This is the primary way to link your domain ontology to the upper level.
    
    - **Example (from your provided `10-domain-ontology.md` and `10-core-dul-alignment.md` files)**:
        - Your "Core Concepts" in `10-core-dul-alignment.md` already map `ConceptualObject` to `dul:Description` and `ConceptualRelation` to `dul:Relationship`.
        - In your `10-domain-ontology.md` file, you define `Action` as an `Event`. Given that `Event` is aligned with `dul:Event` in `10-core-dul-alignment.md`, this is a direct subclassing:
            
            Code snippet
            
            ```
            domain:Action rdfs:subClassOf core:Event .
            core:Event rdfs:subClassOf dul:Event . # from 10-core-dul-alignment.md
            ```
            
        - For `Negotiation:Agent1` (an `@entity` within the `Negotiation Scenario`):
            
            Code snippet
            
            ```
            scenario:Negotiation:Agent1 rdfs:subClassOf dul:Agent .
            # Assuming dul:Agent is a class in DUL representing entities that can act.
            # DUL typically models agents as dul:SocialObject or dul:ResponsibleAgent (which is a dul:SocialObject).
            ```
            
        - For `Negotiation:Agreement` (a `@state`):
            
            Code snippet
            
            ```
            scenario:Negotiation:Agreement rdfs:subClassOf dul:Situation .
            # dul:Situation is a class representing states of affairs or situations.
            ```
            
        - For `Negotiation:Offer` (an `@event`):
            
            Code snippet
            
            ```
            scenario:Negotiation:Offer rdfs:subClassOf dul:Event .
            ```
            
        - For `Negotiation:Trust_Level` (a `@quality`):
            
            Code snippet
            
            ```
            scenario:Negotiation:Trust_Level rdfs:subClassOf dul:Quality .
            ```
            
2. FE-OE Mapping leveraging DUL Alignment:
    
    The FE-OE mapping properties (fe_instantiates_oe, fe_plays_oe_role, fe_describes_oe_attribute) remain the same, but now the scenario:ScenarioElement classes that are the range of these properties are themselves subclasses of DUL concepts. This means that when an FE maps to an OE, it implicitly maps to the broader DUL category that the OE instantiates.
    
    - Example: Direct Instantiation:
        
        If fe:Killing_Agent instantiates scenario:Human_Agent, and scenario:Human_Agent is defined as rdfs:subClassOf dul:Agent, then any instance of fe:Killing_Agent is transitively an instance of dul:Agent.
        
        Code snippet
        
        ```
        fe:Killing_Agent rdfs:subClassOf [
            owl:Restriction [
                owl:onProperty :fe_instantiates_oe ;
                owl:someValuesFrom scenario:Human_Agent
            ]
        ] .
        scenario:Human_Agent rdfs:subClassOf dul:Agent . # OE aligned with DUL
        ```
        
        Reasoners will then infer that anything instantiating `fe:Killing_Agent` is a `dul:Agent`.
        
    - Example: Role Playing:
        
        If fe:Victim plays the role of scenario:Mortality_Event:Killed_Participant, and scenario:Mortality_Event:Killed_Participant is aligned with dul:Patient (or a similar DUL role concept, if DUL has a specific one for being affected by an event), the semantic link is maintained.
        
        Code snippet
        
        ```
        fe:Victim rdfs:subClassOf [
            owl:Restriction [
                owl:onProperty :fe_plays_oe_role ;
                owl:someValuesFrom scenario:Mortality_Event:Killed_Participant
            ]
        ] .
        scenario:Mortality_Event:Killed_Participant rdfs:subClassOf dul:Patient . # OE aligned with DUL
        ```
        

### Conclusion

By carefully defining your Ontological Elements (OEs) as subclasses of appropriate DUL concepts, and then using these DUL-aligned OEs as the targets for your FE-OE mappings, you achieve a highly robust and semantically grounded system. This approach preserves the cognitive and usage-based nature of linguistic frames while simultaneously integrating them into a formally rigorous, interoperable ontological framework. It ensures that the conceptual structure of the world, as modeled by FN5, can be meaningfully related to other knowledge bases aligned with DUL.