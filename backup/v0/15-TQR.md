# FN5 TQR

## Introduction

The FN5 TQR (Ternary Qualia Relation) is a novel formal framework designed to integrate ontological and lexical perspectives within the FrameNet structure. This approach extends the traditional Generative Lexicon Theory by Pustejovsky, particularly its Qualia Structure, which consists of four key relational types: Formal, Constitutive, Telic, and Agentive. The FN5 TQR introduces an additional type called "Context" to accommodate relational nuances that do not fit directly into the classical four.

Unlike standard ontology modeling where relations are represented as binary properties (domain-range), the TQR approach models each relation as a dedicated frame. Each frame functions as a semantic container that mediates the relation between lexical units (LUs), which are treated as classes within Description Logics. Every frame contains at least two Frame Elements (FEs) representing the participating entities in the relation. This structure enables the FrameNet FN5 to encode rich semantic information that supports both natural language understanding and formal ontological reasoning.

## Restructuring the Relations

### Analysis of Current Relations

The initial step involved a thorough analysis of all existing qualia-based relations present in the current FrameNet dataset. This included assessing whether each relation had an adequately defined background frame and corresponding Frame Elements (FEs). It was observed that numerous relations lacked a background frame, undermining the TQR principle that all relations must be mediated by a frame.

### Review of SIMPLE and DUL Ontologies

To enhance the conceptual robustness of FN5, an extensive review of the SIMPLE and DUL ontologies was conducted. SIMPLE provided insights into semantic relations in lexical databases, emphasizing roles such as "hasSubevent" and "specializes." The DUL ontology contributed a high-level conceptual structure, offering relations like "hasFunction," "playsRole," "participatesIn," and "hasProcess," which were instrumental in filling gaps in FN5's relational modeling.

### Proposal for New Relations

Based on this analysis, several new relations were proposed to expand the expressive power of FN5. These included:

- Functional relations like "hasFunction" and "playsRole"
    
- Processual and causative relations such as "hasProcess," "isConsequenceOf," and "counteracts"
    
- Spatial and compositional relations like "surroundedBy" and "hasSubevent"
    
- Contextual and analogical relations like "participatesIn," "analogousTo," and "hasLocation"
    

These new relations were integrated into the FN5 framework by creating new frames, ensuring they adhere to the TQR principle of being frame-mediated, with clearly defined FEs.

## Frame and Frame Element Table

This table includes both existing frames from FrameNet that serve as background for relations and the newly created frames based on the TQR methodology.

| Frame                                | Relation Name      | Description                                       | Frame Elements                       |
| ------------------------------------ | ------------------ | ------------------------------------------------- | ------------------------------------ |
| Type                                 | subtype_of         | Defines taxonomic hierarchy between classes       | Subtype, Category                    |
| Exemplar                             | instance_of        | Links an instance to its general type             | Instance, Type                       |
| Membership                           | has_as_member      | Group membership relation                         | Group, Member                        |
| Part_piece                           | has_as_part        | Mereological relation between whole and part      | Whole, Part                          |
| Ingredients                          | is_made_of         | Material composition relation                     | Product, Material                    |
| People_by_origin                     | has_as_origin      | Defines origin relation                           | Person, Origin                       |
| People_by_religion                   | is_a_follower_of   | Defines religion affiliation                      | Person, Religion                     |
| Kinship                              | kinship            | Defines family relations                          | Ego, Alter                           |
| Residence                            | has_as_a_resident  | Residence relation                                | Location, Resident                   |
| Containing                           | contains           | Spatial containment relation                      | Container, Contents                  |
| Inclusion                            | includes           | Inclusion relation                                | Total, Part                          |
| Activity                             | is_activity_of     | Links activity to its performer                   | Activity, Agent                      |
| Objective_influence                  | has_influence_on   | Influence relation                                | Influencing_entity, Dependent_entity |
| Creating                             | produces_naturally | Natural creation relation                         | Creator, Created_entity              |
| Attributes                           | has_as_attribute   | Attribute relation                                | Entity, Attribute                    |
| Causation:agentive                   | agentive           | Causation with intentional agent                  | Agent, Effect                        |
| Causation:produces_naturally         | produces_naturally | Natural causal relation                           | Cause, Effect                        |
| Causation:is_consequence_of          | is_consequence_of  | Expresses resultative causation                   | Consequence, Cause                   |
| Causation:counteracts                | counteracts        | Oppositional causal relation                      | Action, CounterAction                |
| Causation:precondition_of            | precondition_of    | Defines a precondition relation                   | Precondition, Effect                 |
| Causation:postcondition_of           | postcondition_of   | Defines a postcondition relation                  | Action, Result                       |
| Composition:surrounded_by            | surrounded_by      | Spatial enclosure relation                        | Core, Surrounding                    |
| Composition:has_subevent             | has_subevent       | Event decomposition relation                      | Event, SubEvent                      |
| Function:has_function                | has_function       | Indicates the intrinsic function of an entity     | Entity, Function                     |
| Function:plays_role                  | plays_role         | Assigns a social or institutional role            | Agent, Role                          |
| Function:used_for                    | used_for           | Describes the practical use of an object          | User, Purpose                        |
| Function:has_as_instrument           | has_as_instrument  | Describes an instrument used in a function        | Agent, Instrument                    |
| Classification:specializes           | specializes        | Refines an entity into a more specialized form    | Specialized, General                 |
| Classification:has_property          | has_property       | Assigns a property to an entity                   | Entity, Property                     |
| Classification:has_quality           | has_quality        | Links an entity to its intrinsic quality          | Entity, Quality                      |
| ContextualRelation:participates_in   | participates_in    | Participation in events or processes              | Participant, Event                   |
| ContextualRelation:has_location      | has_location       | Specifies typical or current location             | Entity, Location                     |
| ContextualRelation:analogous_to      | analogous_to       | Indicates analogy between entities                | Entity1, Entity2                     |
| ContextualRelation:precedes          | precedes           | Temporal precedence relation                      | Preceding, Following                 |
| ContextualRelation:follows           | follows            | Temporal succession relation                      | Following, Preceding                 |
| ContextualRelation:typical_of        | typical_of         | Indicates a typical association in context        | Entity, Context                      |
| ContextualRelation:resulting_state   | resulting_state    | Links an action or event to its resulting state   | Action, State                        |
| ContextualRelation:has_as_effect     | has_as_effect      | Links an action or process to its typical effect  | Action, Effect                       |
| ContextualRelation:is_regulated_by   | is_regulated_by    | Indicates regulatory relations                    | Entity, Regulator                    |
| ContextualRelation:used_against      | used_against       | Indicates opposition or target in functional use  | User, Target                         |
| ContextualRelation:lives_in          | lives_in           | Indicates a habitual living location              | Entity, Location                     |
| ContextualRelation:has_diagnostic_by | has_diagnostic_by  | Links an entity to its diagnostic process or tool | Entity, DiagnosticTool               |
| ContextualRelation:measured_by       | measured_by        | Links an entity to its measurement instrument     | Entity, Instrument                   |
| ContextualRelation:quantifies        | quantifies         | Indicates quantification relation                 | Quantifier, Entity                   |
| ContextualRelation:causes_emotion    | causes_emotion     | Indicates emotional causation                     | Cause, Emotion                       |

This updated table includes all frames, whether pre-existing or newly proposed, that serve as the semantic backbone for the FN5 TQR model, along with their corresponding relation names, descriptions, and Frame Elements.