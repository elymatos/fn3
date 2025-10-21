---
title: "Frame-Native DUL: A Frame-Based Architecture for Ontological Integration with FrameNet"
date: 2025-10-20
version: 1.0
status: Architectural Specification
authors: ["FrameNet Brasil Project"]
---

# Frame-Native DUL: A Frame-Based Architecture for Ontological Integration with FrameNet

## Executive Summary

### The Core Proposition

This document proposes a fundamental architectural shift: representing DOLCE Ultralite (DUL) directly as a **frame-based ontology** rather than through OWL (Web Ontology Language). This approach liberates DUL from OWL's expressivity constraints and enables direct, cohesive integration with FrameNet.

### The Central Insight

**DUL is inherently frame-based.** The Descriptions and Situations (DnS) pattern—DUL's core innovation—is essentially frame semantics formalized in OWL syntax. By removing the OWL layer and representing DUL natively as frames, we align the representation with the conceptual structure, eliminating the elaborate reification patterns currently necessary to work around OWL's limitations.

### Key Advantages

1. **Natural Representation**: Frames handle n-ary relations, contextual binding, and role-based participation natively—exactly what DUL's DnS pattern requires
2. **Direct FrameNet Integration**: No translation layer needed; frames ARE the shared representation
3. **Enhanced Formalization**: Provides FrameNet with rigorous logical foundations it currently lacks
4. **Modern Reasoning**: Enables Graph Neural Networks (GNNs) and spreading activation instead of traditional DL reasoners
5. **Cognitive Alignment**: Better matches human conceptualization and linguistic structure

### Strategic Context

FrameNet has long needed stronger ontological grounding and formal semantics. DUL has been constrained by OWL's inability to fully express its conceptual model. Frame-Native DUL solves both problems simultaneously:

- **FrameNet gains**: Formal semantics, systematic frame relations, compositional theory, instantiation model
- **DUL gains**: Natural representation, escape from OWL constraints, direct linguistic grounding

### Architectural Overview

```
┌─────────────────────────────────────────────────────────┐
│                Frame-Native DUL Core                    │
│                                                         │
│  • Native frame structures (no reification)             │
│  • Frame Elements as ontological roles                  │
│  • Situations as frame instances                        │
│  • Compositional frame algebra                          │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│              Reasoning Infrastructure                   │
│                                                         │
│  • Graph Neural Networks for embeddings                 │
│  • Spreading activation for inference                   │
│  • Constraint satisfaction (learned + specified)        │
│  • Frame composition and entailment                     │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│            FrameNet Integration Layer                   │
│                                                         │
│  • Direct frame import (no translation loss)            │
│  • Lexical Unit → Frame evocation                       │
│  • Corpus annotations as situation instances            │
│  • Enhanced with DUL ontological distinctions           │
└─────────────────────────────────────────────────────────┘
```

### Expected Outcomes

- **Simpler, cleaner ontology**: No complex reification patterns
- **Richer FrameNet**: Systematic formalization without losing usage-based nature
- **Better NLU applications**: Frame parsing, semantic role labeling, inference
- **Research platform**: For formal frame semantics and compositional theory
- **Neural-symbolic integration**: Combining structured knowledge with learned representations

---

## 1. Theoretical Foundation

### 1.1 OWL's Expressivity Limitations for DUL

The DUL documentation explicitly acknowledges a critical constraint:

> "A full representation of the transition ontology is outside the expressivity of OWL, because we would need qualified cardinality restrictions, coreference, property equivalence, and property composition."

This is not a minor technical limitation—it reveals a fundamental mismatch between what DUL wants to express and what OWL can represent.

#### The N-ary Relation Problem

In OWL-DL, representing that **coffee is prepared by an agent at a certain time using a certain tool** requires applying an n-ary relation pattern because preparing coffee now has four arguments:
- Agent (who prepares)
- Theme (the coffee)
- Time (when)
- Instrument (tool used)

OWL's binary property structure forces this into elaborate reification:

```
OWL Representation (Reified):
PreparationEvent_42 (individual)
  ├─ rdf:type → Preparation (class)
  ├─ hasAgent → Person_7
  ├─ hasTheme → Coffee_5
  ├─ hasTime → TimeInterval_9
  └─ hasInstrument → CoffeeMaker_3
```

This creates an artificial entity (`PreparationEvent_42`) solely to serve as a property hub. The conceptual structure is obscured by technical machinery.

#### The DnS Pattern as Workaround

The Descriptions and Situations (DnS) pattern is DUL's sophisticated response to OWL's limitations:

```
Description (defines roles and constraints)
  ↓ defines
Role (abstract participation type)
  ↓ classifies
Concept (types of role fillers)
  ↓
Situation (concrete occurrence)
  ↓ satisfies → Description
Entity (particular role filler)
  ↓ plays → Role in Situation
```

This pattern simulates what frames do naturally: binding entities to typed slots within a structured context.

#### Why DOLCE-Zero Was Created

DOLCE-Zero emerged as "a supplementary ontology used as a generalization of DOLCE+DnS Ultralite, in order to deal with the systematic polysemy of many lexical items, whose senses create problems when used as OWL classes."

Systematic polysemy—words with related but distinct senses—is naturally handled in frame semantics through:
- Frame inheritance
- Frame-to-frame relations
- Perspectival framing
- Context-dependent interpretation

The need for DOLCE-Zero is further evidence that OWL's class-property-individual structure doesn't match the cognitive and linguistic reality DUL aims to model.

### 1.2 DUL's Inherent Frame-Like Nature

Examining DUL's conceptual architecture reveals that it's fundamentally frame-based:

#### Roles ARE Frame Elements

DUL's `Role` class represents types of participation in events or situations. This is precisely what Frame Elements (FEs) do in FrameNet:

```
DUL Role:
  - Abstract participation type
  - Defined within a Description
  - Played by Entities in Situations
  - Subject to constraints

FrameNet Frame Element:
  - Typed slot in frame structure
  - Defined within a Frame
  - Filled by entities in annotations
  - Subject to selectional restrictions
```

The conceptual alignment is exact. The difference is representation: OWL forces roles into a class hierarchy, while frames treat them as structural components.

#### Descriptions ARE Frame Definitions

A DUL `Description` packages together:
- A set of Roles (what can participate)
- Concepts (types of role fillers)
- Relations among roles
- Constraints on co-occurrence

This is exactly a **frame definition**:
- Frame Elements (participation roles)
- Type constraints (selectional restrictions)
- FE-to-FE relations
- Co-occurrence constraints

#### Situations ARE Frame Instances

A DUL `Situation` is:
- A concrete occurrence
- That satisfies a Description
- Where Entities play specific Roles
- Within a particular context

This is precisely **frame instantiation**:
- A specific occurrence
- That realizes a Frame
- Where entities fill Frame Elements
- Within a particular textual/discourse context

### 1.3 FrameNet's Formalization Gap

FrameNet is a remarkable linguistic resource, but researchers have consistently identified formalization gaps:

> "The current limitation of FrameNet implementation is the insufficient level of formalization of frame descriptions, making it difficult for semantic parsing without human supervision."

> "There is a certain lack of systematicity in the definition of frames and frame relations, which may hinder the derivation of linking generalizations."

#### What FrameNet Currently Lacks

**1. Formal Semantics for Frames**
- Frames are described intuitively but not formally defined
- No compositional semantics for frame combinations
- Frame-to-frame relations lack rigorous logical foundations
- No clear model-theoretic interpretation

**2. Systematic Ontological Grounding**
- Core vs. non-core FE distinction is heuristic, not principled
- No formal theory of FE types
- Frame hierarchy is partially motivated but not systematic
- Limited guidance for creating new frames

**3. Instantiation Theory**
- FrameNet describes frames but not their occurrences
- Annotations are examples, not formalized instances
- No systematic representation of frame realizations in specific contexts
- Missing the Description-Situation distinction

**4. Constraint Formalization**
- Selectional restrictions are described in prose
- No formal constraint language
- Cannot express complex co-occurrence patterns
- Difficult to validate frame assignments automatically

### 1.4 The Conceptual Alignment

The alignment between DUL's ontological machinery and frame semantics is not coincidental. Both emerge from the same cognitive-linguistic insights:

#### Fillmore's Frame Semantics (1982)
"A frame is any system of concepts related in such a way that to understand any one concept it is necessary to understand the entire system; introducing any one concept or term that belongs to the frame automatically brings the whole frame with it."

#### DUL's DnS Philosophy
Schemata (which DnS formalizes) are "invariances that emerge from the co-evolution of organisms and environment, exemplified by neurobiological, cognitive, linguistic, and social constructs."

Both recognize that:
1. **Meaning is contextual** - concepts make sense within structured wholes
2. **Participation is typed** - entities fill specific roles in patterns
3. **Structure is cognitive** - reflects how humans conceptualize experience
4. **Context matters** - the same entity can play different roles in different frames

### 1.5 Why Frame-Native Representation is Superior

**Conceptual Clarity**
- Representation matches cognitive structure
- No artificial entities (like reified events)
- Direct expression of intended meaning

**Expressive Adequacy**
- N-ary relations are native
- Contextual binding is built-in
- Compositional semantics is natural

**Computational Tractability**
- Graph-structured for neural methods
- Amenable to embedding techniques
- Supports probabilistic reasoning

**Linguistic Grounding**
- Direct connection to language use
- Corpus-based instantiation
- Lexical triggering of frames

---

## 2. Frame-Native Architecture

### 2.1 Core Frame Structure

A frame in Frame-Native DUL is a structured object with the following components:

```python
Frame := {
    # Identity
    name: String,
    dul_category: DUL_TopLevel_Type,  # Endurant, Perdurant, Quality, etc.

    # Frame Elements (Roles)
    core_elements: {FE_name → FE_specification},
    peripheral_elements: {FE_name → FE_specification},

    # Constraints
    type_constraints: [Constraint],
    co_occurrence_constraints: [Constraint],

    # Relations to other frames
    frame_relations: {Relation_Type → [Frame]},

    # Lexical grounding
    lexical_units: [LexicalUnit],

    # Documentation
    definition: String,
    examples: [Example]
}
```

#### Frame Element Specification

Each Frame Element is defined with:

```python
FE_specification := {
    name: String,
    coreness: {Core, Peripheral, Extra-thematic},
    semantic_type: DUL_Class,  # Entity, Event, Quality, etc.
    selectional_restrictions: [Constraint],
    default_value: Optional[Value]
}
```

The `semantic_type` field links to DUL's ontological categories, providing formal grounding:
- `Agent` FE → must be an Animate Entity (from DUL)
- `Time` FE → must be a TimeInterval (from DUL)
- `Location` FE → must be a Place or Region (from DUL)

#### Frame Relations

Frames relate to each other through typed relations:

| Relation Type | Meaning | Example |
|---------------|---------|---------|
| **Inherits_from** | Specialization | `Commerce_buy` inherits from `Getting` |
| **Uses** | Incorporation | `Cooking` uses `Apply_heat` |
| **Subframe_of** | Temporal part | `Paying` is subframe of `Commercial_transaction` |
| **Precedes** | Temporal sequence | `Preparation` precedes `Cooking` |
| **Perspective_on** | Alternative view | `Commerce_buy` ↔ `Commerce_sell` |
| **Causative_of** | Causal relation | `Killing` is causative of `Death` |

These relations form a rich semantic network enabling inference and reasoning.

### 2.2 Situation Theory: Frame Instantiation

A **Situation** is a frame instance—a concrete occurrence where specific entities fill frame elements:

```python
Situation := {
    # Identity
    situation_id: Identifier,

    # Frame instantiated
    frame: Frame,

    # Entity bindings
    bindings: {FE_name → Entity},

    # Context
    temporal_context: TimeInterval,
    spatial_context: Location,
    discourse_context: DiscourseSegment,

    # Relations to other situations
    situation_relations: {Relation_Type → [Situation]},

    # Grounding
    linguistic_realization: TextSpan,
    annotated_by: Annotator,
    confidence: Float
}
```

#### Example Situation

```python
situation_cooking_pasta_42 = {
    situation_id: "sit_42",
    frame: Apply_heat,

    bindings: {
        Cook: person_maria,
        Food: pasta_batch_7,
        Heating_instrument: stove_3,
        Duration: interval_10_minutes,
        Container: pot_12,
        Temperature: scalar_100_celsius
    },

    temporal_context: [2025-10-20T18:30, 2025-10-20T18:40],
    spatial_context: kitchen_location_5,

    linguistic_realization: "Maria boiled the pasta for 10 minutes",
    annotated_by: annotator_1,
    confidence: 0.95
}
```

This instantiation connects:
- Abstract frame structure (`Apply_heat`)
- Concrete entities (Maria, pasta, stove)
- Real-world occurrence (specific time and place)
- Linguistic expression (the actual sentence)

### 2.3 Comparison: OWL-DUL vs Frame-Native DUL

#### Representing "Maria boiled pasta"

**OWL-DUL Representation:**

```turtle
# Classes
:CookingEvent rdf:type owl:Class ;
    rdfs:subClassOf dul:Event .

:CookingDescription rdf:type owl:Class ;
    rdfs:subClassOf dul:Description .

:CookRole rdf:type owl:Class ;
    rdfs:subClassOf dul:Role .

:FoodRole rdf:type owl:Class ;
    rdfs:subClassOf dul:Role .

# Description (abstract pattern)
:CookingDesc_1 rdf:type :CookingDescription ;
    dul:defines :CookRole_general ;
    dul:defines :FoodRole_general .

# Situation (concrete occurrence)
:CookingSituation_42 rdf:type dul:Situation ;
    dul:satisfies :CookingDesc_1 ;
    dul:includesEvent :BoilingEvent_42 .

:BoilingEvent_42 rdf:type :CookingEvent ;
    dul:hasParticipant :Maria ;
    dul:hasParticipant :Pasta_7 .

# Role playing
:Maria rdf:type dul:Agent ;
    dul:plays :CookRole_42 .

:Pasta_7 rdf:type dul:PhysicalObject ;
    dul:plays :FoodRole_42 .

:CookRole_42 rdf:type :CookRole ;
    dul:classifies :Maria ;
    dul:isRoleOf :CookingSituation_42 .

:FoodRole_42 rdf:type :FoodRole ;
    dul:classifies :Pasta_7 ;
    dul:isRoleOf :CookingSituation_42 .
```

**Frame-Native DUL Representation:**

```python
frame Apply_heat {
    dul_category: Perdurant.Event,

    core_elements: {
        Cook: {
            semantic_type: AgentivePhysicalObject,
            selectional_restrictions: [animate, intentional]
        },
        Food: {
            semantic_type: PhysicalObject,
            selectional_restrictions: [edible]
        },
        Heating_instrument: {
            semantic_type: Artifact,
            selectional_restrictions: [heat_producing]
        }
    },

    inherits_from: [Intentionally_act, Physical_change]
}

situation_42 {
    frame: Apply_heat,
    bindings: {
        Cook → maria,
        Food → pasta_7,
        Heating_instrument → stove_3
    },
    linguistic_realization: "Maria boiled pasta"
}
```

#### Analysis of Differences

| Aspect | OWL-DUL | Frame-Native DUL |
|--------|---------|------------------|
| **Entities created** | 10+ (classes, individuals, roles, descriptions) | 2 (frame definition, situation instance) |
| **Reification** | Extensive (roles, descriptions, situations) | None (native structure) |
| **Readability** | Complex interconnections | Direct and intuitive |
| **Type safety** | Through property restrictions | Through semantic types |
| **Extensibility** | Add new classes/properties | Add FEs or frames |
| **Query complexity** | Multiple property paths | Direct FE access |

### 2.4 Multi-Layer Architecture Diagram

```
╔══════════════════════════════════════════════════════════════╗
║                    APPLICATION LAYER                         ║
║  • Frame parsing        • Question answering                 ║
║  • Semantic role labeling • Information extraction           ║
╚══════════════════════════════════════════════════════════════╝
                            ↓
╔══════════════════════════════════════════════════════════════╗
║                   REASONING LAYER                            ║
║                                                              ║
║  ┌─────────────────┐  ┌──────────────────┐                  ║
║  │ Graph Neural    │  │ Spreading        │                  ║
║  │ Networks        │  │ Activation       │                  ║
║  │                 │  │                  │                  ║
║  │ • Frame         │  │ • Inference via  │                  ║
║  │   embeddings    │  │   activation     │                  ║
║  │ • Similarity    │  │   propagation    │                  ║
║  │   learning      │  │ • Context-based  │                  ║
║  │                 │  │   reasoning      │                  ║
║  └─────────────────┘  └──────────────────┘                  ║
║                                                              ║
║  ┌─────────────────────────────────────────────────┐        ║
║  │ Constraint Satisfaction Engine                  │        ║
║  │ • Type checking  • Co-occurrence validation     │        ║
║  └─────────────────────────────────────────────────┘        ║
╚══════════════════════════════════════════════════════════════╝
                            ↓
╔══════════════════════════════════════════════════════════════╗
║               FRAME-NATIVE DUL CORE                          ║
║                                                              ║
║  ┌──────────────────────────────────────────────┐            ║
║  │ FRAME DEFINITIONS                            │            ║
║  │                                              │            ║
║  │  Frame {                                     │            ║
║  │    dul_category: DUL_Type                    │            ║
║  │    core_elements: [FE]                       │            ║
║  │    peripheral_elements: [FE]                 │            ║
║  │    constraints: [Constraint]                 │            ║
║  │    frame_relations: {Type → [Frame]}         │            ║
║  │    lexical_units: [LU]                       │            ║
║  │  }                                           │            ║
║  └──────────────────────────────────────────────┘            ║
║                                                              ║
║  ┌──────────────────────────────────────────────┐            ║
║  │ SITUATION INSTANCES                          │            ║
║  │                                              │            ║
║  │  Situation {                                 │            ║
║  │    frame: Frame                              │            ║
║  │    bindings: {FE → Entity}                   │            ║
║  │    context: Context                          │            ║
║  │    linguistic_realization: Text              │            ║
║  │  }                                           │            ║
║  └──────────────────────────────────────────────┘            ║
║                                                              ║
║  ┌──────────────────────────────────────────────┐            ║
║  │ DUL ONTOLOGICAL CATEGORIES                   │            ║
║  │                                              │            ║
║  │  • Endurant / Perdurant                      │            ║
║  │  • Physical / Abstract / Social              │            ║
║  │  • Quality / Quale                           │            ║
║  │  • Role / Task / Parameter                   │            ║
║  └──────────────────────────────────────────────┘            ║
╚══════════════════════════════════════════════════════════════╝
                            ↓
╔══════════════════════════════════════════════════════════════╗
║              FRAMENET INTEGRATION LAYER                      ║
║                                                              ║
║  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      ║
║  │ Frame Import │  │ LU Mapping   │  │ Annotation   │      ║
║  │              │  │              │  │ as Situations│      ║
║  │ • Direct     │  │ • LU → Frame │  │              │      ║
║  │   ingestion  │  │   evocation  │  │ • Corpus data│      ║
║  │ • No trans-  │  │ • Lemma      │  │   as frame   │      ║
║  │   lation loss│  │   linking    │  │   instances  │      ║
║  └──────────────┘  └──────────────┘  └──────────────┘      ║
╚══════════════════════════════════════════════════════════════╝
```

### 2.5 Frame Relations Algebra

Frame relations support compositional semantics. Key operations:

#### Inheritance

```
Frame_Child inherits_from Frame_Parent
  ⇒ Frame_Child.FEs ⊇ Frame_Parent.FEs
  ⇒ Frame_Child.constraints ⊇ Frame_Parent.constraints
```

Example:
```python
Commerce_buy inherits_from Getting

Getting = {
    core_elements: {Recipient, Theme, Source},
    ...
}

Commerce_buy = {
    core_elements: {Buyer, Goods, Seller, Money},  # Specialized FEs
    inherits_from: Getting,
    # Buyer corresponds to Recipient
    # Goods corresponds to Theme
    # Seller corresponds to Source
}
```

#### Perspectival Relation

```
Frame_A perspective_on Frame_B
  ⇒ ∃ mapping: Frame_A.FEs → Frame_B.FEs
  ⇒ Situation can instantiate either frame
```

Example:
```python
Commerce_buy perspective_on Commerce_sell

Commerce_buy.Buyer ↔ Commerce_sell.Buyer
Commerce_buy.Goods ↔ Commerce_sell.Goods
Commerce_buy.Seller ↔ Commerce_sell.Seller

# Same transaction, different perspectives
```

#### Frame Composition

```
Frame_C uses Frame_A, Frame_B
  ⇒ Frame_C incorporates FEs from both
  ⇒ Situations of Frame_C include sub-situations
```

Example:
```python
Commercial_transaction uses Commerce_buy, Transfer_money

# A commercial transaction involves both:
# 1. Goods transfer (Commerce_buy)
# 2. Money transfer (Transfer_money)
```

#### Entailment

```
Situation_S instantiates Frame_A
Frame_A causative_of Frame_B
  ⇒ ∃ Situation_S' that instantiates Frame_B
```

Example:
```python
Killing causative_of Death

situation_kill_42 instantiates Killing
  ⇒ situation_death_43 instantiates Death
  ⇒ situation_death_43.Victim = situation_kill_42.Victim
```

---

## 3. Representation Format & Examples

### 3.1 Frame Definition Syntax

We propose a declarative syntax for defining frames that is both human-readable and machine-processable:

```python
frame Apply_heat {
    # DUL ontological grounding
    dul_category: Perdurant.Event,
    ontological_type: IntentionallyAct,

    # Core frame elements (required for frame coherence)
    core: {
        Cook: {
            semantic_type: AgentivePhysicalObject,
            selectional_restrictions: [
                animate,
                intentional_capability
            ],
            dul_role: Agent
        },
        Food: {
            semantic_type: PhysicalObject,
            selectional_restrictions: [
                edible,
                heat_transformable
            ],
            dul_role: Patient
        },
        Heating_instrument: {
            semantic_type: Artifact,
            selectional_restrictions: [
                heat_producing,
                controllable
            ],
            dul_role: Instrument
        }
    },

    # Peripheral frame elements (optional, add specificity)
    peripheral: {
        Temperature: {
            semantic_type: Quality.Temperature,
            selectional_restrictions: [scalar_value],
            dul_role: Parameter
        },
        Duration: {
            semantic_type: TimeInterval,
            selectional_restrictions: [positive_duration],
            dul_role: Parameter
        },
        Container: {
            semantic_type: Artifact.Vessel,
            selectional_restrictions: [heat_resistant],
            dul_role: Location
        },
        Purpose: {
            semantic_type: Description,
            selectional_restrictions: [intention],
            dul_role: Goal
        }
    },

    # Constraints (formal conditions)
    constraints: {
        # Type constraints
        type_check: [
            Cook must_be animate,
            Heating_instrument must_be controllable_by Cook
        ],

        # Co-occurrence constraints
        co_occurrence: [
            if Heating_instrument = oven then Temperature required,
            if Food.state = frozen then Duration > normal_duration
        ],

        # Temporal constraints
        temporal: [
            Duration.begin = Event.begin,
            Duration.end = Event.end
        ]
    },

    # Frame relations (structured semantic network)
    relations: {
        inherits_from: [Intentionally_act, Cause_change],
        uses: [Temperature_control, Phase_transition],
        subframe_of: [Cooking_procedure],
        precedes: [Serving_food],
        requires_preparation: [Food_preparation]
    },

    # Lexical grounding (from FrameNet)
    lexical_units: [
        {lemma: "fry", pos: V, language: en},
        {lemma: "bake", pos: V, language: en},
        {lemma: "boil", pos: V, language: en},
        {lemma: "grill", pos: V, language: en},
        {lemma: "fritar", pos: V, language: pt},
        {lemma: "assar", pos: V, language: pt},
        {lemma: "ferver", pos: V, language: pt}
    ],

    # Documentation
    definition: "An animate agent (Cook) applies heat to food using a heating instrument, causing a physical/chemical transformation",

    examples: [
        "John baked the cake in the oven at 180°C",
        "She fried the eggs in a pan",
        "They grilled the meat for 20 minutes"
    ]
}
```

### 3.2 Situation Instance Format

Situations represent concrete frame instantiations:

```python
situation cooking_pasta_instance {
    # Identification
    id: "situation_42",
    timestamp: "2025-10-20T18:30:00",

    # Frame instantiated
    frame: Apply_heat,

    # Entity bindings (FE → concrete entity)
    bindings: {
        Cook → {
            entity_id: "person_maria",
            entity_type: Person,
            properties: {
                name: "Maria",
                experience_level: "amateur_cook"
            }
        },
        Food → {
            entity_id: "pasta_batch_7",
            entity_type: Food,
            properties: {
                type: "spaghetti",
                quantity: "500g",
                initial_state: "dry"
            }
        },
        Heating_instrument → {
            entity_id: "stove_3",
            entity_type: KitchenAppliance,
            properties: {
                type: "gas_stove",
                burner_count: 4
            }
        },
        Container → {
            entity_id: "pot_12",
            entity_type: CookingVessel,
            properties: {
                material: "stainless_steel",
                capacity: "5L"
            }
        },
        Duration → {
            entity_id: "interval_10min",
            entity_type: TimeInterval,
            properties: {
                length: 10,
                unit: "minutes"
            }
        },
        Temperature → {
            entity_id: "temp_100c",
            entity_type: TemperatureValue,
            properties: {
                value: 100,
                unit: "celsius"
            }
        }
    },

    # Context
    context: {
        temporal: {
            begin: "2025-10-20T18:30:00",
            end: "2025-10-20T18:40:00"
        },
        spatial: {
            location_id: "kitchen_5",
            address: "Home kitchen"
        },
        discourse: {
            document_id: "recipe_blog_42",
            sentence_id: "sent_15"
        }
    },

    # Grounding in language/corpus
    linguistic_realization: {
        text: "Maria boiled the pasta for 10 minutes",
        language: "en",
        annotation_source: "manual",
        annotator: "annotator_1",
        confidence: 0.95
    },

    # Relations to other situations
    situation_relations: {
        precedes: ["situation_43"],  # Serving_food situation
        follows: ["situation_41"],    # Food_preparation situation
        part_of: ["situation_40"]     # Cooking_dinner situation
    },

    # Validation
    constraints_satisfied: true,
    validation_timestamp: "2025-10-20T18:45:00"
}
```

### 3.3 Frame Composition Example

Complex events involve multiple frames:

```python
frame Commercial_transaction {
    dul_category: Perdurant.Event,
    ontological_type: SocialObject,

    # This frame USES other frames
    frame_composition: {
        uses: [Commerce_buy, Transfer_money],
        temporal_ordering: [
            # Money transfer and goods transfer can overlap
            # but money transfer typically completes first
            Transfer_money overlaps Commerce_buy,
            Transfer_money.end ≤ Commerce_buy.end
        ]
    },

    core: {
        Buyer: {
            semantic_type: Agent,
            # Maps to both sub-frames
            frame_mapping: {
                Commerce_buy.Buyer,
                Transfer_money.Donor
            }
        },
        Seller: {
            semantic_type: Agent,
            frame_mapping: {
                Commerce_buy.Seller,
                Transfer_money.Recipient
            }
        },
        Goods: {
            semantic_type: PhysicalObject,
            frame_mapping: {
                Commerce_buy.Goods
            }
        },
        Money: {
            semantic_type: SocialObject.Currency,
            frame_mapping: {
                Transfer_money.Money
            }
        }
    },

    # Constraints across composed frames
    constraints: {
        cross_frame: [
            # Value equivalence
            Money.amount = Goods.agreed_price,

            # Agent co-reference
            Commerce_buy.Buyer = Transfer_money.Donor,
            Commerce_buy.Seller = Transfer_money.Recipient,

            # Temporal proximity
            temporal_distance(Commerce_buy, Transfer_money) < threshold
        ]
    }
}

# Instance of composed frame
situation car_purchase {
    frame: Commercial_transaction,

    # Bindings at top level
    bindings: {
        Buyer → john,
        Seller → dealership_5,
        Goods → car_2015_honda,
        Money → {amount: 15000, currency: USD}
    },

    # Sub-situations (automatically derived)
    sub_situations: [
        {
            frame: Commerce_buy,
            bindings: {
                Buyer → john,
                Seller → dealership_5,
                Goods → car_2015_honda
            }
        },
        {
            frame: Transfer_money,
            bindings: {
                Donor → john,
                Recipient → dealership_5,
                Money → {amount: 15000, currency: USD}
            }
        }
    ]
}
```

### 3.4 DUL Category Integration

DUL's top-level ontological distinctions become frame type constraints:

```python
# DUL Top-Level Categories as Frame Superclasses

frame_category Endurant {
    description: "Entities wholly present at any time they exist",

    dul_properties: {
        persistence: continuous,
        temporal_parts: false
    },

    subcategories: [
        PhysicalEndurant,
        NonPhysicalEndurant,
        SocialObject
    ]
}

frame_category Perdurant {
    description: "Entities that unfold over time",

    dul_properties: {
        persistence: perduring,
        temporal_parts: true,
        has_timespan: required
    },

    subcategories: [
        Event,
        Process,
        State
    ]
}

frame_category Quality {
    description: "Attributes that can be perceived or measured",

    dul_properties: {
        inherent_to: Endurant,
        has_quale: true
    },

    subcategories: [
        PhysicalQuality,
        AbstractQuality,
        SocialQuality
    ]
}

# Example: Frames inheriting DUL categories

frame Person_frame {
    dul_category: Endurant.PhysicalEndurant.AgentivePhysicalObject,

    # Inherits Endurant properties
    temporal_properties: {
        wholly_present: true,
        continuous_identity: true
    },

    core: {
        Name: {semantic_type: InformationObject},
        Age: {semantic_type: Quality.TemporalQuality},
        Role: {semantic_type: Role}
    }
}

frame Running_frame {
    dul_category: Perdurant.Event,

    # Inherits Perdurant properties
    temporal_properties: {
        has_timespan: required,
        temporal_parts: true,
        phases: [Beginning, Ongoing, Ending]
    },

    core: {
        Runner: {
            semantic_type: Endurant.AgentivePhysicalObject,
            dul_role: Agent
        },
        Path: {
            semantic_type: Endurant.Region,
            dul_role: Location
        }
    }
}

frame Weight_frame {
    dul_category: Quality.PhysicalQuality,

    # Inherits Quality properties
    quality_properties: {
        inherent_to: PhysicalEndurant,
        measurable: true,
        has_quale: WeightValue
    },

    core: {
        Bearer: {
            semantic_type: Endurant.PhysicalEndurant,
            dul_role: Host
        },
        Value: {
            semantic_type: Quale.WeightValue,
            dul_role: Parameter
        }
    }
}
```

### 3.5 Preserving DUL's Philosophical Sophistication

Frame-Native DUL must preserve critical ontological distinctions:

```python
# Endurant vs Perdurant
# (Things vs Events - fundamental metaphysical distinction)

constraint endurant_perdurant_distinction {
    rule: "Endurants cannot have temporal parts",

    validation: [
        frame.dul_category = Endurant
          ⇒ frame.temporal_parts = false,

        frame.dul_category = Perdurant
          ⇒ frame.temporal_parts = true
    ]
}

# Quality vs Quale
# (Property types vs property values)

constraint quality_quale_distinction {
    rule: "Qualities are types; Qualia are values",

    examples: {
        Quality: "Redness (the property of being red)",
        Quale: "This specific shade of red (#FF0000)"
    },

    validation: [
        Quality.frame must have Bearer FE,
        Quale.frame must have corresponding Quality
    ]
}

# Social Objects
# (Entities that exist through collective intentionality)

frame_category SocialObject extends Endurant {
    essential_properties: {
        collective_intentionality: required,
        institutional_facts: true,
        constituted_by: PhysicalObject (optional)
    },

    examples: [
        Money,
        Marriage,
        Corporation,
        Promise
    ]
}

# Example: Money as Social Object frame

frame Money_frame {
    dul_category: Endurant.SocialObject,

    core: {
        Physical_token: {
            semantic_type: PhysicalObject,
            dul_role: ConstitutedBy  # Bills/coins constitute money
        },
        Value: {
            semantic_type: SocialQuality,
            dul_role: HasQuality
        },
        Currency_system: {
            semantic_type: Description,
            dul_role: DefinedBy  # Money exists within currency system
        }
    },

    constraints: {
        social_construction: [
            # Money has value only through social agreement
            Value.existence depends_on Currency_system.collective_acceptance
        ]
    }
}
```

---

## 4. Reasoning Infrastructure

### 4.1 Graph Neural Networks for Frame Embeddings

Frame-Native DUL is naturally suited for GNN-based reasoning because frames form a rich graph structure:

```
Graph Structure:
  Nodes: {Frames, Frame Elements, Entities, DUL Categories}
  Edges: {Frame Relations, FE Relations, Type Relations, Instantiation}
```

#### GNN Architecture

```python
# Frame embedding model

class FrameGNN:
    def __init__(self):
        # Embed frame components
        self.frame_encoder = GraphConvNet(layers=3)
        self.fe_encoder = GraphConvNet(layers=2)
        self.relation_encoder = RelationGNN()

        # Combine into frame embedding
        self.frame_pooling = GlobalAttentionPool()

    def forward(self, frame):
        # Encode frame elements
        fe_embeddings = self.fe_encoder(
            nodes=frame.frame_elements,
            edges=frame.fe_relations
        )

        # Encode frame relations
        relation_context = self.relation_encoder(
            frame=frame,
            neighbors=frame.related_frames
        )

        # Pool to frame-level embedding
        frame_embedding = self.frame_pooling(
            fe_embeddings,
            relation_context
        )

        return frame_embedding
```

#### Applications of Frame Embeddings

**1. Frame Similarity**
```python
similarity(Apply_heat, Temperature_control) = cosine(
    embed(Apply_heat),
    embed(Temperature_control)
)
# High similarity → frames are related
# Use for frame suggestion, inheritance detection
```

**2. Frame Element Prediction**
```python
# Given partial frame, predict missing FEs
predict_FE(frame_partial, missing_FE_name) =
    decoder(
        embed(frame_partial),
        embed(missing_FE_name)
    )
# Use for annotation assistance
```

**3. Frame-to-Frame Relation Discovery**
```python
# Learn which frames should be related
predict_relation(frame_A, frame_B) =
    relation_classifier(
        concat(embed(frame_A), embed(frame_B))
    )
# Returns: {inherits_from, uses, precedes, ...}
```

**4. Situation Clustering**
```python
# Similar situations should cluster together
situation_embedding =
    combine(
        embed(situation.frame),
        embed(situation.bindings)
    )

clusters = kmeans(situation_embeddings)
# Discover situation types from data
```

### 4.2 Spreading Activation for Inference

Spreading activation is a natural inference mechanism for frame networks:

```python
class SpreadingActivation:
    def __init__(self, frame_network):
        self.network = frame_network
        self.activation = {}  # frame → activation_level

    def activate(self, initial_frames, initial_strength=1.0):
        # Initialize activation
        for frame in initial_frames:
            self.activation[frame] = initial_strength

        # Spread activation iteratively
        for iteration in range(max_iterations):
            new_activation = {}

            for frame in self.network.frames:
                # Collect activation from neighbors
                incoming = 0.0

                for relation_type, neighbors in frame.relations.items():
                    weight = self.relation_weights[relation_type]

                    for neighbor in neighbors:
                        if neighbor in self.activation:
                            incoming += weight * self.activation[neighbor]

                # Apply decay and update
                new_activation[frame] = (
                    self.decay * self.activation.get(frame, 0) +
                    incoming
                )

            self.activation = new_activation

            # Check convergence
            if self.has_converged():
                break

        return self.activation
```

#### Inference Examples

**1. Frame Evocation**
```python
# Sentence: "John bought a car from the dealership"
# LU: "bought" evokes Commerce_buy

activation = spreading_activation.activate(
    initial_frames=[Commerce_buy]
)

# Related frames get activated:
# Commerce_sell (0.8) - perspective relation
# Transfer_ownership (0.6) - uses relation
# Commercial_transaction (0.7) - parent relation
# Getting (0.5) - inheritance relation
```

**2. FE Filling via Activation**
```python
# Given: Commerce_buy frame activated
#        Entity: "dealership" mentioned

# Spread from Commerce_buy.Seller FE
activation = spreading_activation.activate(
    initial_frames=[Commerce_buy.Seller]
)

# Check entity type compatibility
if entity_type(dealership) matches activation.peak:
    bind(Commerce_buy.Seller, dealership)
```

**3. Situation Completion**
```python
# Partial situation: only some FEs filled
# Use spreading activation to find likely values for missing FEs

partial_situation = {
    frame: Apply_heat,
    bindings: {
        Cook: maria,
        Food: pasta
        # Missing: Heating_instrument, Duration
    }
}

# Activate from known entities
activation = spreading_activation.activate(
    initial_nodes=[maria, pasta]
)

# Find entities that:
# 1. Are highly activated
# 2. Match type constraints of missing FEs
# 3. Are contextually available

likely_instrument = max_activation(
    entities with type = Heating_instrument,
    context = kitchen
)
# → stove (high activation, type match, in kitchen)
```

### 4.3 Constraint Satisfaction

Constraints can be:
- **Specified** (explicitly defined in frame)
- **Learned** (discovered from corpus data)

```python
class ConstraintSatisfaction:
    def __init__(self):
        self.specified_constraints = {}
        self.learned_constraints = {}

    # Check if situation satisfies all constraints
    def validate(self, situation):
        violations = []

        # Check specified constraints
        for constraint in self.get_constraints(situation.frame):
            if not constraint.satisfied_by(situation):
                violations.append({
                    'type': 'specified',
                    'constraint': constraint,
                    'severity': 'error'
                })

        # Check learned constraints (soft)
        for constraint in self.learned_constraints[situation.frame]:
            if not constraint.satisfied_by(situation):
                violations.append({
                    'type': 'learned',
                    'constraint': constraint,
                    'severity': 'warning',
                    'confidence': constraint.confidence
                })

        return {
            'valid': len([v for v in violations if v['severity']=='error']) == 0,
            'violations': violations
        }

# Example constraints

# Specified (hard constraint)
constraint type_constraint {
    frame: Apply_heat,
    rule: "Cook must be animate",

    check(situation):
        entity = situation.bindings[Cook]
        return entity.has_property(animate)
}

# Learned (soft constraint)
constraint learned_co_occurrence {
    frame: Apply_heat,
    rule: "If Heating_instrument = oven, Temperature is usually specified",

    confidence: 0.87,  # learned from corpus

    check(situation):
        if situation.bindings[Heating_instrument].type == oven:
            return Temperature in situation.bindings
        return True
}
```

### 4.4 Frame Composition Algebra

Formal operations on frames:

```python
class FrameAlgebra:

    # Frame inheritance
    def inherit(self, child_frame, parent_frame):
        """
        Child frame inherits FEs and constraints from parent
        """
        inherited_frame = child_frame.copy()

        # Inherit FEs (child can override)
        for fe_name, fe_spec in parent_frame.core.items():
            if fe_name not in inherited_frame.core:
                inherited_frame.core[fe_name] = fe_spec

        # Inherit constraints (child can add more)
        inherited_frame.constraints.extend(
            parent_frame.constraints
        )

        return inherited_frame

    # Frame composition (uses relation)
    def compose(self, composite_frame, component_frames):
        """
        Composite frame incorporates multiple component frames
        """
        # FE mapping across components
        fe_mappings = composite_frame.frame_composition.mappings

        # Create composed frame
        composed = composite_frame.copy()

        for component in component_frames:
            # Map component FEs to composite FEs
            for comp_fe, composite_fe in fe_mappings[component].items():
                # Ensure type compatibility
                assert self.type_compatible(
                    component.core[comp_fe],
                    composed.core[composite_fe]
                )

        return composed

    # Perspectival transformation
    def transform_perspective(self, situation, source_frame, target_frame):
        """
        Transform situation from one perspectival frame to another
        """
        assert source_frame.perspective_on(target_frame)

        # Get FE mapping
        mapping = self.get_perspective_mapping(source_frame, target_frame)

        # Transform bindings
        new_bindings = {}
        for source_fe, target_fe in mapping.items():
            new_bindings[target_fe] = situation.bindings[source_fe]

        return Situation(
            frame=target_frame,
            bindings=new_bindings,
            context=situation.context
        )

# Example usage

algebra = FrameAlgebra()

# Inheritance
Commerce_buy = algebra.inherit(
    child_frame=Commerce_buy_definition,
    parent_frame=Getting
)

# Composition
Commercial_transaction = algebra.compose(
    composite_frame=Commercial_transaction_definition,
    component_frames=[Commerce_buy, Transfer_money]
)

# Perspective transformation
buy_situation = Situation(
    frame=Commerce_buy,
    bindings={Buyer: john, Seller: dealership, Goods: car}
)

sell_situation = algebra.transform_perspective(
    situation=buy_situation,
    source_frame=Commerce_buy,
    target_frame=Commerce_sell
)

# sell_situation now has:
#   frame=Commerce_sell
#   bindings={Buyer: john, Seller: dealership, Goods: car}
# (same entities, different perspective)
```

---

## 5. Integration with FrameNet

### 5.1 Native Frame Import

FrameNet frames can be imported directly without translation:

```python
class FrameNetImporter:
    def __init__(self):
        self.framenet_data = load_framenet()

    def import_frame(self, fn_frame_name):
        """
        Convert FrameNet frame to Frame-Native DUL format
        """
        fn_frame = self.framenet_data.frame(fn_frame_name)

        # Create Frame-Native DUL frame
        dul_frame = Frame(
            name=fn_frame.name,
            dul_category=self.infer_dul_category(fn_frame),

            core_elements={
                fe.name: self.convert_fe(fe)
                for fe in fn_frame.FE
                if fe.coreType == 'Core'
            },

            peripheral_elements={
                fe.name: self.convert_fe(fe)
                for fe in fn_frame.FE
                if fe.coreType in ['Peripheral', 'Extra-Thematic']
            },

            frame_relations=self.convert_relations(fn_frame.frameRelations),

            lexical_units=[
                LexicalUnit(
                    lemma=lu.name.split('.')[0],
                    pos=lu.name.split('.')[1],
                    language='en'
                )
                for lu in fn_frame.lexUnit
            ],

            definition=fn_frame.definition,
            examples=self.extract_examples(fn_frame)
        )

        # Enhance with DUL ontological grounding
        dul_frame = self.add_dul_semantics(dul_frame)

        return dul_frame

    def convert_fe(self, fn_fe):
        """
        Convert FrameNet FE to Frame-Native DUL FE specification
        """
        return FE_specification(
            name=fn_fe.name,
            coreness=fn_fe.coreType,
            semantic_type=self.map_to_dul_type(fn_fe.semType),
            selectional_restrictions=self.extract_restrictions(fn_fe.definition),
            definition=fn_fe.definition
        )

    def infer_dul_category(self, fn_frame):
        """
        Infer DUL ontological category from FrameNet frame
        """
        # Use frame name, definition, and FEs to infer type

        # Event indicators
        if any(fe.name in ['Agent', 'Time', 'Place'] for fe in fn_frame.FE):
            return Perdurant.Event

        # Entity indicators
        if any(fe.name in ['Entity', 'Name'] for fe in fn_frame.FE):
            return Endurant

        # Attribute indicators
        if any(fe.name in ['Entity', 'Attribute', 'Value'] for fe in fn_frame.FE):
            return Quality

        # Default to Event (most FrameNet frames are events)
        return Perdurant.Event

    def add_dul_semantics(self, frame):
        """
        Enhance frame with DUL ontological distinctions
        """
        # Add DUL roles to FEs
        for fe_name, fe_spec in frame.core_elements.items():
            fe_spec.dul_role = self.map_fe_to_dul_role(fe_name, fe_spec)

        # Add DUL-based constraints
        frame.constraints.extend(
            self.generate_dul_constraints(frame)
        )

        # Link to DUL upper ontology
        frame.dul_superclasses = self.find_dul_superclasses(frame)

        return frame
```

### 5.2 Enhanced Formalization for FrameNet

Frame-Native DUL adds systematic formalization:

| FrameNet Property | Current State | DUL Enhancement |
|-------------------|---------------|-----------------|
| **Core vs Peripheral FEs** | Heuristic distinction | Formal criterion: Core FEs essential for frame identification |
| **Frame Relations** | Intuitive labels | Formal semantics: inheritance, composition, perspective |
| **Selectional Restrictions** | Prose descriptions | DUL semantic types as formal constraints |
| **Frame Hierarchy** | Partial organization | Systematic via DUL category integration |
| **FE Types** | Informal semantic types | Grounded in DUL ontological categories |
| **Compositional Semantics** | Missing | Frame algebra for composition |
| **Instantiation** | Annotation examples | Formal situation theory |

#### Example: Formalizing Core/Peripheral Distinction

**Current FrameNet Approach:**
- Core FEs are "essential to the meaning of the frame"
- Decision is somewhat subjective
- Inconsistencies across frames

**Frame-Native DUL Approach:**
```python
def is_core_FE(fe, frame):
    """
    Formal criterion for core FE status
    """
    # An FE is core if:

    # 1. It's necessary for frame identification
    #    (removing it changes which frame applies)
    test_frame_without_fe = frame.copy()
    test_frame_without_fe.remove_FE(fe)

    if not frames_are_equivalent(frame, test_frame_without_fe):
        return True  # Core

    # 2. It participates in essential frame relations
    if fe in frame.essential_relations:
        return True  # Core

    # 3. It's required by DUL category constraints
    if frame.dul_category.requires(fe.dul_role):
        return True  # Core

    return False  # Peripheral
```

### 5.3 Bidirectional Benefits

**FrameNet → DUL:**
- Extensive lexical coverage (~1,200 frames, ~13,000 LUs)
- Rich corpus annotations (~200,000 annotated sentences)
- Cross-linguistic data (FrameNets for many languages)
- Usage-based insights from real text

**DUL → FrameNet:**
- Ontological grounding (systematic category system)
- Formal semantics (compositional frame theory)
- Situation theory (instantiation model)
- Constraint formalization (type systems, co-occurrence)
- Upper ontology integration (Endurant/Perdurant, etc.)

### 5.4 Preserving FrameNet's Usage-Based Nature

Critical: Frame-Native DUL must NOT force FrameNet into rigid ontological categories. Instead:

```python
# FrameNet frames remain usage-based
frame Relational_natural_feature {
    # From FrameNet: corpus-grounded, lexically triggered
    lexical_units: [
        "bay", "cove", "delta", "gulf", "inlet", ...
    ],

    # DUL provides formal grounding without rigidity
    dul_category: Endurant.PhysicalEndurant.Region,

    core: {
        Focal_feature: {
            semantic_type: PhysicalEndurant.NaturalPlace,
            # But: type learned from corpus, not imposed
            learned_from_corpus: True
        },
        Related_feature: {
            semantic_type: PhysicalEndurant.NaturalPlace
        }
    },

    # Constraints can be soft (learned) rather than hard (specified)
    constraints: {
        learned_preferences: [
            # Learned from annotations, not ontologically mandated
            {
                rule: "Focal_feature typically smaller than Related_feature",
                confidence: 0.73,
                evidence: corpus_statistics
            }
        ]
    }
}
```

**Key Principle:** DUL provides **scaffolding**, not **straitjacket**.

### 5.5 Corpus Annotations as Situation Instances

FrameNet's annotated corpus becomes a massive situation database:

```python
# FrameNet annotation
annotation = {
    sentence: "John bought a car from the dealership for $15,000",
    frame: Commerce_buy,
    FE_annotations: {
        Buyer: "John",
        Goods: "a car",
        Seller: "the dealership",
        Money: "for $15,000"
    }
}

# Converts to Frame-Native DUL situation
situation = Situation(
    frame=Commerce_buy,

    bindings={
        Buyer: Entity(text="John", type=Person),
        Goods: Entity(text="a car", type=Vehicle),
        Seller: Entity(text="the dealership", type=Organization.Commercial),
        Money: Entity(text="$15,000", type=SocialObject.Currency)
    },

    linguistic_realization={
        text: "John bought a car from the dealership for $15,000",
        language: "en",
        document: "FrameNet_corpus_doc_42",
        sentence: "sent_7"
    },

    annotation_metadata={
        source: "FrameNet_1.7",
        annotator: "fn_annotator_5",
        confidence: 1.0  # manual annotation
    }
)
```

This creates a **corpus of situations** that can be used for:
- Training GNNs to predict FE bindings
- Learning selectional restrictions
- Discovering frame co-occurrence patterns
- Validating constraint satisfaction
- Generating frame embeddings

---

## 6. Implementation Roadmap

### Phase 1: Core Frame Formalism (Months 1-3)

**Objectives:**
- Define formal frame structure
- Implement FE constraint language
- Specify frame relation algebra
- Create data model for frames and situations

**Deliverables:**
1. Frame definition schema (JSON/YAML format)
2. Situation instance schema
3. Constraint specification language
4. Frame algebra operations (inheritance, composition, perspective)
5. Validation engine for constraints
6. Initial frame repository (20-30 core frames)

**Technical Tasks:**
- Design database schema for frame storage
- Implement frame parser (text → frame object)
- Build constraint validator
- Create frame relation graph structure
- Develop API for frame access

**Success Criteria:**
- Can define new frames declaratively
- Can validate frame definitions
- Can compose and relate frames formally
- Frame operations are well-defined and tested

### Phase 2: FrameNet Import (Months 4-6)

**Objectives:**
- Import all FrameNet frames
- Convert annotations to situations
- Map FrameNet relations to Frame-Native DUL
- Enhance with DUL ontological grounding

**Deliverables:**
1. FrameNet importer tool
2. ~1,200 frames in Frame-Native DUL format
3. ~200,000 situation instances from FrameNet corpus
4. DUL semantic type mappings for all FEs
5. Frame relation network

**Technical Tasks:**
- Parse FrameNet XML data
- Map FE semantic types to DUL categories
- Convert frame-to-frame relations
- Extract and convert LU information
- Import and structure annotated sentences
- Validate imported frames

**Success Criteria:**
- All FrameNet frames successfully imported
- No semantic information lost in conversion
- Frame relations correctly mapped
- Situations can be queried and analyzed

### Phase 3: Reasoning Infrastructure (Months 7-12)

**Objectives:**
- Implement GNN for frame embeddings
- Build spreading activation engine
- Develop constraint learning from corpus
- Create frame composition tools

**Deliverables:**
1. GNN-based frame embedding model
2. Spreading activation inference engine
3. Learned constraint extractor
4. Frame similarity calculator
5. Situation clustering tool
6. Frame composition interface

**Technical Tasks:**
- Build graph representation of frame network
- Train GNN on frame structure
- Implement spreading activation algorithm
- Learn selectional restrictions from corpus
- Discover frame co-occurrence patterns
- Create embedding visualization
- Develop frame recommendation system

**Success Criteria:**
- Frame embeddings capture semantic similarity
- Spreading activation produces sensible inferences
- Learned constraints match linguistic intuitions
- System can suggest relevant frames for text
- Situation clustering reveals meaningful patterns

### Phase 4: Situation Theory & Applications (Months 13-18)

**Objectives:**
- Formalize situation composition
- Build multi-frame situation handling
- Develop applications (parsing, QA, IE)
- Create evaluation benchmarks

**Deliverables:**
1. Situation composition engine
2. Multi-frame situation manager
3. Frame-based semantic parser
4. Question answering system
5. Information extraction tool
6. Evaluation datasets and benchmarks

**Technical Tasks:**
- Implement situation algebra (merge, split, relate)
- Handle complex multi-frame scenarios
- Build semantic role labeling system
- Develop frame-based QA
- Create IE pipeline using frames
- Establish evaluation metrics
- Compare to baseline systems

**Success Criteria:**
- Can represent and reason about complex situations
- Semantic parsing achieves competitive accuracy
- QA system handles frame-based questions
- IE system extracts frame-structured information
- Performance meets or exceeds baselines

### Research Questions to Address

Throughout implementation, investigate:

1. **Formal Frame Semantics**
   - What is the minimal algebra for frame composition?
   - How to formalize frame entailment?
   - What is the model-theoretic interpretation of frames?

2. **Learned vs Specified Constraints**
   - Which constraints can be learned from corpus?
   - How to balance learned (soft) vs specified (hard) constraints?
   - Can neural models learn DUL-compatible type systems?

3. **Frame Embeddings**
   - Do frame embeddings capture ontological relations?
   - Can embeddings predict frame-to-frame relations?
   - Do similar frames cluster in embedding space?

4. **Situation Modeling**
   - How to represent temporal relations among situations?
   - What is the optimal granularity for situations?
   - Can situations be automatically extracted from text?

5. **Cross-Linguistic Frames**
   - Are frame structures universal (as DUL suggests)?
   - How do frames vary across languages?
   - Can multilingual frame embeddings be learned?

6. **Integration with NLU**
   - Does frame-based representation improve NLU tasks?
   - How to integrate with neural language models?
   - Can frames enhance few-shot learning?

---

## 7. Advantages Over Current Approaches

### 7.1 vs. OWL-DUL

| Aspect | OWL-DUL | Frame-Native DUL | Advantage |
|--------|---------|------------------|-----------|
| **Representation** | Class-property-individual | Frame-FE-binding | ✓ More intuitive |
| **N-ary relations** | Requires reification | Native support | ✓ Simpler, clearer |
| **Contextual binding** | Complex property chains | Built into situations | ✓ Natural expression |
| **Reasoning** | DL reasoners (HermiT, Pellet) | GNN, spreading activation | ✓ More flexible |
| **Scalability** | Limited by DL complexity | Graph-based, parallelizable | ✓ Better scaling |
| **Expressivity** | Constrained by OWL-DL | Full frame semantics | ✓ More expressive |
| **Reification** | Extensive (roles, descriptions) | None needed | ✓ Cleaner ontology |
| **Semantic Web integration** | Full support | Limited | ✗ Less standardized |
| **Tool ecosystem** | Mature (Protégé, etc.) | Must be built | ✗ Less tooling |

**Key Insight:** Frame-Native DUL trades Semantic Web standardization for representational naturalness and expressivity. For FrameNet integration and NLU applications, this is the right trade-off.

### 7.2 vs. Framester's Hub Approach

| Aspect | Framester | Frame-Native DUL | Advantage |
|--------|-----------|------------------|-----------|
| **Architecture** | Hub/bridge between resources | Unified representation | ✓ Single paradigm |
| **Integration** | Maps FrameNet ↔ ontologies | Direct frame-based ontology | ✓ No translation loss |
| **Formalization** | Keeps FrameNet informal | Adds formal semantics | ✓ Stronger foundations |
| **Ontology** | Uses existing (DOLCE, WordNet) | Frame-native DUL | ✓ Consistent design |
| **Complexity** | Multiple representation layers | One frame layer | ✓ Simpler conceptually |
| **Flexibility** | Can integrate many resources | Focused on DUL-FrameNet | ✗ Less general |
| **Established** | Operational system | Proposal stage | ✗ Must be built |

**Key Insight:** Frame-Native DUL is more opinionated (DUL + FrameNet only) but achieves deeper integration through unified representation.

### 7.3 vs. Pure FrameNet

| Aspect | FrameNet | Frame-Native DUL | Advantage |
|--------|----------|------------------|-----------|
| **Formalization** | Informal definitions | Formal semantics | ✓ Rigorous foundations |
| **Frame relations** | Intuitive labels | Algebraic operations | ✓ Compositional theory |
| **FE types** | Informal semantic types | DUL ontological grounding | ✓ Systematic types |
| **Instantiation** | Annotation examples | Situation theory | ✓ Formal instances |
| **Constraints** | Prose descriptions | Formal constraint language | ✓ Computable validation |
| **Ontology** | Implicit | Explicit DUL integration | ✓ Ontological clarity |
| **Lexical grounding** | Extensive corpus | Inherits from FrameNet | = Same coverage |
| **Usage-based** | Corpus-driven | Must preserve this | ⚠ Risk of over-formalization |

**Key Insight:** Frame-Native DUL enhances FrameNet with formalization while preserving its usage-based, corpus-grounded nature.

### 7.4 Summary of Unique Advantages

Frame-Native DUL uniquely offers:

1. **Conceptual Coherence**
   - Single representational paradigm (frames)
   - No impedance mismatch between ontology and lexicon
   - Natural expression of DUL's DnS pattern

2. **Formal + Usage-Based**
   - Rigorous formal semantics
   - Grounded in corpus usage
   - Balances theory and data

3. **Neural-Symbolic Integration**
   - Native graph structure for GNNs
   - Symbolic frame algebra
   - Learned + specified constraints

4. **Direct FrameNet Enhancement**
   - No translation layer
   - Systematic formalization
   - Preserves linguistic grounding

5. **Modern Reasoning**
   - GNN embeddings
   - Spreading activation
   - Probabilistic inference

---

## 8. Conclusion

### The Central Thesis

**DUL is inherently frame-based.** The elaborate reification machinery in OWL-DUL exists because OWL cannot naturally express what DUL conceptually is: a system of frames (Descriptions), frame elements (Roles), and frame instances (Situations).

Frame-Native DUL removes this representational mismatch, allowing DUL to be expressed directly in the formalism that best matches its conceptual structure.

### Strategic Value for FrameNet

FrameNet has long needed what DUL provides:
- Systematic ontological grounding
- Formal frame semantics
- Compositional theory
- Instantiation model

Frame-Native DUL delivers this formalization while preserving FrameNet's core strengths:
- Usage-based, corpus-grounded
- Lexically triggered
- Cross-linguistically applicable

### Technical Viability

The proposed architecture is technically feasible:
- Frame structures map cleanly to graph databases
- GNNs are mature and effective for graph reasoning
- Spreading activation is well-understood
- Constraint satisfaction is tractable
- FrameNet import is straightforward

### Research Contributions

This work would contribute to multiple fields:
- **Ontology**: Demonstrating frame-based foundational ontology
- **Computational Semantics**: Formal compositional frame theory
- **NLP**: Enhanced semantic representation for language understanding
- **Cognitive Science**: Linking formal ontology to cognitive frames
- **Knowledge Representation**: Neural-symbolic integration

### Next Steps

To move from proposal to implementation:

1. **Validate core concepts** - Prototype frame structure and situation model
2. **Import initial frames** - Convert small FrameNet subset
3. **Demonstrate feasibility** - Show reasoning works on sample data
4. **Build incrementally** - Follow phased roadmap
5. **Evaluate continuously** - Compare to baselines throughout

### Final Assessment

Frame-Native DUL is:
- **Conceptually sound** - Aligns representation with conceptual structure
- **Technically feasible** - Builds on established methods (GNNs, frames)
- **Strategically valuable** - Solves real problems for FrameNet and ontology
- **Research-worthy** - Opens new questions in formal semantics

**The fundamental insight stands:** DUL should "come out" as the frame-based ontology it conceptually is. Frame-Native DUL makes this real.

---

## References & Further Reading

### DUL & DOLCE
- Gangemi, A., & Mika, P. (2003). "Understanding the Semantic Web through Descriptions and Situations"
- Masolo, C., et al. (2003). "WonderWeb Deliverable D18: The WonderWeb Library of Foundational Ontologies"
- DUL documentation: http://www.ontologydesignpatterns.org/ont/dul/DUL.owl

### FrameNet
- Fillmore, C. J. (1982). "Frame Semantics"
- Ruppenhofer, J., et al. (2016). "FrameNet II: Extended Theory and Practice"
- FrameNet project: https://framenet.icsi.berkeley.edu/

### Frame Semantics & Formalization
- Barsalou, L. W. (1992). "Frames, Concepts, and Conceptual Fields"
- Löbner, S. (2014). "Evidence for Frames from Human Language"
- Petruck, M. R. L. (1996). "Frame Semantics"

### Framester & Integration
- Gangemi, A., et al. (2016). "Framester: A Wide Coverage Linguistic Linked Data Hub"
- Nuzzolese, A. G., et al. (2016). "The FrameNet-Semantic Web Connection"

### Neural-Symbolic Integration
- Battaglia, P. W., et al. (2018). "Relational Inductive Biases, Deep Learning, and Graph Networks"
- Garcez, A., et al. (2019). "Neural-Symbolic Computing: An Effective Methodology for Principled Integration"

---

**Document Status:** Architectural Specification v1.0
**Last Updated:** 2025-10-20
**Next Review:** After Phase 1 prototype implementation
