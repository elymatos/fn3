# FrameNet Brasil + DUL Integration
## Frame-Native Architecture Specification v2.0

**Document Status:** Conceptual Specification for Implementation  
**Date:** October 21, 2025  
**Authors:** FrameNet Brasil Team  
**Purpose:** Theoretical and conceptual foundation for frame-native architecture

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Core Architectural Principles](#core-architectural-principles)
3. [The Target FE: Universal Frame Reference](#the-target-fe-universal-frame-reference)
4. [Unified Relation System via Micro-Frames](#unified-relation-system-via-micro-frames)
5. [Frame Types and Their Target FEs](#frame-types-and-their-target-fes)
6. [Micro-Frame Library](#micro-frame-library)
7. [DUL Ontology Integration](#dul-ontology-integration)
8. [Dual Database Architecture](#dual-database-architecture)
9. [Query Patterns and Reasoning](#query-patterns-and-reasoning)
10. [Theoretical Foundations](#theoretical-foundations)

---

## Executive Summary

### The Vision

This specification proposes a **frame-native architecture** for FrameNet Brasil where:

1. **Everything is a frame** - semantic frames, entities, lexical units, lemmas, DUL ontology classes, and even relations
2. **All relations are micro-frames** - binary frames with exactly 2 FEs that connect other FEs
3. **Target FE is the universal reference** - every frame has a special Target FE representing its core concept
4. **Complete uniformity** - same structures, same query patterns, same reasoning mechanisms

### Key Innovation: Target FE + Micro-Frames

The **Target FE** is the breakthrough that makes everything work:

- In semantic frames: Target = the event/state itself (e.g., buying event)
- In entity frames: Target = the entity itself (e.g., the person)
- In LU frames: Target = the lexical unit itself
- In ontology frames: Target = the category itself

**Frame-to-frame relations** (inheritance, classification, evocation) are simply **FE-to-FE relations** connecting Target FEs via micro-frames.

```
Commerce_buy.Target --inherits_from_relation--> Getting.Target
Commerce_buy.Target --instance_of_relation--> DUL_Event.Target
Commerce_buy.Target --agent_relation--> Commerce_buy.Buyer
```

All three are the same type of structure: FE-to-FE relations via micro-frames.

### What Makes This Different

**Traditional Approach:**
- Frames, FEs, and frame relations are separate structures
- Frame-to-frame relations are different from FE-to-FE relations
- Generalization uses generic role labels (Agent, Theme, Patient)

**Frame-Native Approach:**
- Everything is frames with FEs
- All relations use the same micro-frame mechanism
- Frame-specific FE labels (Buyer, Cook, Avenger) + systematic comparison via micro-frames
- Target FE unifies intra-frame and inter-frame relations

---

## Core Architectural Principles

### 1. Frames All The Way Down

**Everything that can be described is a frame:**

| Concept | Traditional FrameNet | Frame-Native Architecture |
|---------|---------------------|---------------------------|
| Semantic frames | Frame structure | Frame (type: semantic) |
| Entities (Person, Car) | External or informal | Frame (type: entity) |
| Lexical units | Separate table/structure | Frame (type: lexical_unit) |
| Lemmas | Separate or external | Frame (type: lemma) |
| DUL ontology classes | External ontology | Frame (type: ontology) |
| Relations (inheritance, agent) | Properties or separate | Frame (type: micro_frame) |

### 2. Frame Elements Are Always Frame-Specific

**Critical Principle:** Never use generic role labels.

❌ **Wrong:**
```
Commerce_buy:
  - Agent
  - Theme
  - Source
```

✅ **Correct:**
```
Commerce_buy:
  - Target (the buying event)
  - Buyer (frame-specific, not "Agent")
  - Goods (frame-specific, not "Theme")
  - Seller (frame-specific, not "Source")
  - Money (frame-specific)
```

### 3. Micro-Frames Define All Relations

**Micro-frames** are special frames with:
- Exactly 2 FEs (binary relations)
- `is_micro_frame = TRUE`
- `arity = 2`

They define relations between FEs, whether those FEs are in the same frame (intra-frame) or different frames (inter-frame).

### 4. Target FE Unifies Everything

Every frame has **exactly one Target FE** (`is_target_fe = TRUE`) that:
- Represents what the frame is fundamentally about
- Serves as the anchor point for relations
- Enables frame-to-frame relations via FE-to-FE mechanism

### 5. No Special Cases

The beauty of this architecture:
- **One relation table** (`fe_relation`) handles all relations
- **Same query patterns** for all relation types
- **No distinction** between "frame relations" and "FE relations"
- **Uniform reasoning** mechanisms

---

## The Target FE: Universal Frame Reference

### Concept

The **Target FE** is a special Frame Element that represents the core concept of a frame - what the frame "is about."

**Key Properties:**
- Exactly one per frame (database constraint)
- Marked with `is_target_fe = TRUE`
- Usually not explicitly annotated in corpus (implicit)
- Serves as anchor for micro-frame relations

### Target FE by Frame Type

#### Semantic Frames (Events/States)

**Example: Commerce_buy**
```
Target FE: The buying event itself
- Not a text span in annotation
- Represents the entire event described
- What the LU "buy.v" directly evokes
```

**In annotation:**
```
Sentence: "Maria bought a car from the dealer"
LU: bought
Frame: Commerce_buy

Annotated FEs:
- Buyer: "Maria" [text span 0-5]
- Goods: "a car" [text span 13-18]  
- Seller: "the dealer" [text span 24-34]
- Target: [implicit - the buying event]
```

#### Entity Frames

**Example: Person**
```
Target FE: The person entity itself
- Represents the person being described
- What the lemma "person" denotes
```

**Example: Book**
```
Target FE: The book entity itself

Other FEs (qualia structure):
- Title (formal)
- Author (agentive)
- Pages (constitutive)
- Purpose (telic)
```

#### Lexical Unit Frames

**Example: buy.v**
```
Target FE: The lexical unit itself
- Represents this specific verb form
- Other FEs describe its properties:
  - Lemma (which lemma it realizes)
  - Evokes (which semantic frame)
  - Register (stylistic level)
  - POS (part of speech)
```

#### Ontology Frames (DUL)

**Example: DUL_Event**
```
Target FE: The Event category itself
- Represents the ontological class
- Other FEs describe category properties:
  - Has_temporal_parts (TRUE)
  - Subclass_of → DUL_Perdurant
```

### Why Target FE Solves Frame-to-Frame Relations

**The Problem:** How to represent "Commerce_buy inherits from Getting"?

**Traditional approach:** Separate frame_relation table/structure

**Frame-native approach:** It's just another FE-to-FE relation!
```
Commerce_buy.Target --inherits_from_relation--> Getting.Target
```

Both "Target" FEs are regular Frame Elements. The relation between them is expressed via a micro-frame, just like any other relation.

**This means:**
- No special relation mechanism needed
- Same query patterns work for all relations
- Natural graph structure in Neo4j
- Conceptually pure and uniform

---

## Unified Relation System via Micro-Frames

### Single Relation Mechanism

**All relations in the system use the same structure:**

```
Relation = {
  micro_frame: which micro-frame defines this relation
  source_fe: starting FE
  target_fe: ending FE
  source_maps_to: which FE in micro-frame does source correspond to
  target_maps_to: which FE in micro-frame does target correspond to
}
```

### Two Patterns of Relations

#### Pattern 1: Intra-Frame Relations

FEs within the same frame related to each other.

**Example: Agent Relation in Commerce_buy**
```
Micro-frame: agent_relation
  FE1: Event
  FE2: Agent

Applied:
  source_fe: Commerce_buy.Target
  target_fe: Commerce_buy.Buyer
  source_maps_to: Event
  target_maps_to: Agent
```

**Interpretation:** "In Commerce_buy, the Buyer is the agent of the Target (buying event)"

#### Pattern 2: Inter-Frame Relations

FEs in different frames related to each other (typically Target FEs).

**Example: Inheritance**
```
Micro-frame: inherits_from_relation
  FE1: Child_frame
  FE2: Parent_frame

Applied:
  source_fe: Commerce_buy.Target
  target_fe: Getting.Target
  source_maps_to: Child_frame
  target_maps_to: Parent_frame
```

**Interpretation:** "Commerce_buy inherits from Getting"

**Example: DUL Classification**
```
Micro-frame: instance_of_relation
  FE1: Instance
  FE2: Category

Applied:
  source_fe: Commerce_buy.Target
  target_fe: DUL_Event.Target
  source_maps_to: Instance
  target_maps_to: Category
```

**Interpretation:** "Commerce_buy is an instance of DUL Event category"

**Example: LU Evocation**
```
Micro-frame: evokes_relation
  FE1: Lexical_unit
  FE2: Semantic_frame

Applied:
  source_fe: buy.v.Target
  target_fe: Commerce_buy.Target
  source_maps_to: Lexical_unit
  target_maps_to: Semantic_frame
```

**Interpretation:** "The lexical unit buy.v evokes Commerce_buy frame"

### Key Insight: No Fundamental Difference

From the system's perspective, there is **no fundamental difference** between:
- Relations within a frame (Target → Buyer)
- Relations between frames (Commerce_buy.Target → Getting.Target)

Both are:
- Defined by micro-frames
- Stored in the same table
- Queried with the same patterns
- Reasoned about the same way

The only practical distinction: whether source_fe and target_fe belong to the same frame.

---

## Frame Types and Their Target FEs

### Semantic Frames

**Purpose:** Represent events, states, processes, scenarios

**Target FE:** The event/state/scenario itself

**Example: Apply_heat**
```
Frame: Apply_heat
  Target: The heat application event
  
  Core FEs:
    - Cook (agent of Target)
    - Food (theme of Target)
    - Heating_instrument (instrument of Target)
    
  Peripheral FEs:
    - Temperature (quality of Target)
    - Duration (temporal extent of Target)
    - Container (location of Target)
```

**Relations:**
```
Apply_heat.Target --inherits_from--> Intentionally_act.Target
Apply_heat.Target --inherits_from--> Cause_change.Target
Apply_heat.Target --agent--> Apply_heat.Cook
Apply_heat.Target --theme--> Apply_heat.Food
Apply_heat.Target --instrument--> Apply_heat.Heating_instrument
```

### Entity Frames

**Purpose:** Represent objects, people, abstract entities

**Target FE:** The entity itself

**Example: Person**
```
Frame: Person
  Target: The person entity
  
  Core FEs (Qualia structure):
    - Name (formal quality)
    - Age (formal quality)
    - Physical_quality (formal quality)
    - Social_role (telic quality)
    - Origin (agentive quality)
```

**Relations:**
```
Person.Target --instance_of--> DUL_AgentivePhysicalObject.Target
Person.Target --has_quality--> Person.Age
Person.Target --has_quality--> Person.Name
```

### Lexical Unit Frames

**Purpose:** Represent specific word forms that evoke frames

**Target FE:** The lexical unit itself

**Example: buy.v**
```
Frame: buy.v (LU frame)
  Target: This specific verb form
  
  Core FEs:
    - Lemma → buy_lemma
    - Evokes → Commerce_buy
    - POS: V
    - Language: en
    
  Peripheral FEs:
    - Register: neutral
    - Frequency: high
    - Etymology: Old English bycgan
```

**Relations:**
```
buy.v.Target --evokes--> Commerce_buy.Target
buy.v.Target --has_lemma--> buy_lemma.Target
buy.v.Target --translation_of--> comprar.v.Target
```

### Lemma Frames

**Purpose:** Represent abstract lexemes (word forms)

**Target FE:** The lemma itself

**Example: buy_lemma**
```
Frame: buy_lemma
  Target: The lexeme "buy"
  
  Core FEs:
    - Orthographic_form: "buy"
    - Phonological_form: /baɪ/
    - Part_of_speech: [V, N]
    - Inflectional_paradigm: {present: buy/buys, past: bought, ...}
    
  Relations:
    - Realizes_in: buy.v, buy.n
    - Derives: buyer_lemma, buyable_lemma
```

**Relations:**
```
buy_lemma.Target --realizes_in--> buy.v.Target
buy_lemma.Target --realizes_in--> buy.n.Target
buy_lemma.Target --derives--> buyer_lemma.Target
```

### Ontology Frames (DUL)

**Purpose:** Represent ontological categories from DUL

**Target FE:** The category itself

**Example: DUL_Event**
```
Frame: DUL_Event
  Target: The Event category in DUL ontology
  
  FEs (properties of the category):
    - Has_temporal_parts: TRUE
    - Perduring: TRUE
    - Subclass_of → DUL_Perdurant
```

**Relations:**
```
DUL_Event.Target --subclass_of--> DUL_Perdurant.Target
DUL_Event.Target --disjoint_with--> DUL_Process.Target
```

### Micro-Frames

**Purpose:** Define binary relations between FEs

**Target FE:** Question for discussion

**Example: agent_relation**
```
Frame: agent_relation
  Target: ??? (The agent relation concept itself?)
  
  FEs (the relation structure):
    - Event: the event being controlled
    - Agent: the entity that controls
    
  Constraints:
    - Agent must be intentional
    - Agent must be volitional
    - Agent has control over Event
```

**Open question:** Do micro-frames need Target FEs? Or are they special cases?

---

## Micro-Frame Library

### Participant Relations (Intra-Frame)

#### agent_relation
```
FE1: Event (the event being controlled)
FE2: Agent (intentional controller)

Semantics: Agent intentionally initiates and controls Event

Constraints:
  - Agent must have intentionality
  - Agent must have volition
  - Agent typically animate

Applied in:
  - Commerce_buy: Buyer is agent
  - Apply_heat: Cook is agent
  - Revenge: Avenger is agent
```

#### theme_relation
```
FE1: Event
FE2: Theme (central participant)

Semantics: Theme is centrally involved in Event, may undergo change

Constraints:
  - Theme is affected by Event
  - Theme may change state or location

Applied in:
  - Commerce_buy: Goods is theme
  - Apply_heat: Food is theme
```

#### patient_relation
```
FE1: Event
FE2: Patient (entity undergoing change)

Semantics: Patient undergoes change of state

Constraints:
  - Patient must change during Event
  - Change is observable

Applied in:
  - Break: Broken_entity is patient
  - Heat: Heated_object is patient
```

#### experiencer_relation
```
FE1: Event (psychological/perceptual)
FE2: Experiencer (entity experiencing)

Semantics: Experiencer has mental or perceptual state

Constraints:
  - Experiencer must be sentient
  - Event is psychological/perceptual

Applied in:
  - Fear: Experiencer fears something
  - See: Perceiver sees something
```

#### instrument_relation
```
FE1: Event
FE2: Instrument (tool used)

Semantics: Instrument enables Event but is not consumed

Constraints:
  - Instrument is not consumed
  - Instrument is controlled by Agent
  - Instrument is inanimate (typically)

Applied in:
  - Apply_heat: Heating_instrument
  - Write: Writing_instrument
```

### Transfer Relations (Intra-Frame)

#### source_relation
```
FE1: Event (transfer/motion)
FE2: Source (origin)

Semantics: Source is origin in transfer or motion

Constraints:
  - Source has control/possession before Event
  - Source loses control/possession during Event

Applied in:
  - Commerce_buy: Seller is source
  - Motion: Source_location
```

#### goal_relation
```
FE1: Event (transfer/motion)
FE2: Goal (destination)

Semantics: Goal is destination in transfer or motion

Constraints:
  - Goal gains control/possession after Event
  - Goal did not have control/possession before Event

Applied in:
  - Give: Recipient is goal
  - Motion: Goal_location
```

#### recipient_relation
```
FE1: Event (transfer)
FE2: Recipient (receiver)

Semantics: Recipient receives something in transfer

Applied in:
  - Give: Recipient
  - Send: Addressee
```

### Spatial Relations (Intra-Frame)

#### location_relation
```
FE1: Event or Entity
FE2: Location (spatial region)

Semantics: Event occurs at or Entity exists at Location

Applied in:
  - Commerce_buy: Place
  - Person: Lives_in
```

#### path_relation
```
FE1: Event (motion)
FE2: Path (route)

Semantics: Motion follows Path

Applied in:
  - Travel: Path
  - Send: Path
```

### Temporal Relations (Intra-Frame)

#### temporal_relation
```
FE1: Event
FE2: Time (time interval)

Semantics: Event occurs during Time

Applied in:
  - Commerce_buy: Time
  - Meeting: Scheduled_time
```

#### duration_relation
```
FE1: Event
FE2: Duration (time span)

Semantics: Event lasts for Duration

Applied in:
  - Apply_heat: Duration
  - Sleep: Duration
```

### Causal Relations (Intra-Frame)

#### cause_relation
```
FE1: Event (result)
FE2: Cause (causing event/entity)

Semantics: Cause brings about Event

Applied in:
  - Death: Cause_of_death
  - Emotion: Stimulus
```

#### purpose_relation
```
FE1: Event
FE2: Purpose (intended outcome)

Semantics: Event is done for Purpose

Applied in:
  - Commerce_buy: Purpose
  - Travel: Purpose
```

#### means_relation
```
FE1: Event
FE2: Means (method/resource)

Semantics: Event is accomplished via Means

Applied in:
  - Commerce_buy: Money is means
  - Achieve: Means_of_achievement
```

### Quality Relations (Intra-Frame/Inter-Frame)

#### quality_relation
```
FE1: Entity
FE2: Quality (attribute)

Semantics: Entity possesses Quality

Applied in:
  - Person: Age, Height, Weight
  - Object: Color, Shape
```

#### value_relation
```
FE1: Quality
FE2: Value (measurement)

Semantics: Quality has specific Value

Applied in:
  - Temperature: Degree
  - Age: Years
```

### Frame-to-Frame Relations (Inter-Frame)

#### inherits_from_relation
```
FE1: Child_frame (Target of child)
FE2: Parent_frame (Target of parent)

Semantics: Child_frame specializes Parent_frame

Constraints:
  - Child inherits FEs from Parent
  - Child inherits constraints from Parent
  - Child may override or add FEs
  - No cycles allowed
  - Transitive

Applied in:
  - Commerce_buy → Getting
  - Apply_heat → Intentionally_act
```

#### uses_relation
```
FE1: Container_frame (Target)
FE2: Component_frame (Target)

Semantics: Container_frame incorporates Component_frame as subpart

Constraints:
  - Both must be semantic frames
  - Component typically precedes or overlaps Container temporally

Applied in:
  - Commercial_transaction uses Commerce_buy
  - Commercial_transaction uses Transfer_money
```

#### subframe_of_relation
```
FE1: Subframe (Target)
FE2: Complex_frame (Target)

Semantics: Subframe is temporal part of Complex_frame

Constraints:
  - Subframe is proper temporal part
  - Complex_frame consists of ordered subframes

Applied in:
  - Paying subframe_of Commercial_transaction
  - Approach subframe_of Arrival
```

#### perspective_on_relation
```
FE1: Perspective_1 (Target)
FE2: Perspective_2 (Target)

Semantics: Same event viewed from different perspectives

Constraints:
  - Symmetric relation
  - FEs should be mappable between frames
  - Both describe same underlying situation

Applied in:
  - Commerce_buy ↔ Commerce_sell
  - Teach ↔ Learn
```

#### precedes_relation
```
FE1: Earlier_event (Target)
FE2: Later_event (Target)

Semantics: Earlier_event temporally precedes Later_event

Constraints:
  - Temporal ordering
  - Often causally related

Applied in:
  - Preparation precedes Cooking
  - Application precedes Acceptance
```

#### causative_of_relation
```
FE1: Causative_event (Target)
FE2: Result_event (Target)

Semantics: Causative_event causes Result_event

Constraints:
  - Causal relation
  - Causative typically involves agency

Applied in:
  - Killing causative_of Death
  - Breaking causative_of Broken_state
```

### Ontological Relations (Inter-Frame, DUL)

#### instance_of_relation
```
FE1: Instance (Target of any frame)
FE2: Category (Target of ontology frame)

Semantics: Instance is classified under Category

Constraints:
  - Category must be ontology frame
  - Transitive through subclass_of

Applied in:
  - Commerce_buy → DUL_Event
  - Person → DUL_AgentivePhysicalObject
  - Money → DUL_SocialObject
```

#### subclass_of_relation
```
FE1: Subclass (Target of ontology frame)
FE2: Superclass (Target of ontology frame)

Semantics: Subclass is more specific than Superclass

Constraints:
  - Both must be ontology frames
  - Transitive
  - No cycles

Applied in:
  - DUL_Event → DUL_Perdurant
  - DUL_Perdurant → DUL_Entity
  - DUL_PhysicalObject → DUL_PhysicalEndurant
```

### Lexical Relations (Inter-Frame)

#### evokes_relation
```
FE1: Lexical_unit (Target of LU frame)
FE2: Semantic_frame (Target of semantic frame)

Semantics: Using Lexical_unit triggers Semantic_frame

Constraints:
  - Lexical_unit must be LU frame
  - Semantic_frame must be semantic frame

Applied in:
  - buy.v → Commerce_buy
  - cook.v → Apply_heat
  - comprar.v → Commerce_buy
```

#### has_lemma_relation
```
FE1: Lexical_unit (Target)
FE2: Lemma (Target)

Semantics: Lexical_unit realizes Lemma

Constraints:
  - One-to-many: one lemma, many LUs

Applied in:
  - buy.v → buy_lemma
  - buy.n → buy_lemma
```

#### translation_of_relation
```
FE1: LU_language1 (Target)
FE2: LU_language2 (Target)

Semantics: Translation equivalents across languages

Constraints:
  - Typically both evoke same or related frames
  - May be symmetric or directional

Applied in:
  - buy.v ↔ comprar.v
  - buy.v ↔ acheter.v
```

---

## DUL Ontology Integration

### DUL as Frame Hierarchy

The DOLCE Ultralite ontology becomes a hierarchy of ontology frames connected via `subclass_of_relation`.

#### Top-Level DUL Categories

```
DUL_Entity (root)
├─ DUL_Endurant
│  ├─ DUL_PhysicalEndurant
│  │  ├─ DUL_PhysicalObject
│  │  │  └─ DUL_AgentivePhysicalObject
│  │  └─ DUL_Amount
│  └─ DUL_NonPhysicalEndurant
│     ├─ DUL_SocialObject
│     └─ DUL_Mental
│
├─ DUL_Perdurant
│  ├─ DUL_Event
│  ├─ DUL_Process
│  └─ DUL_State
│
├─ DUL_Quality
│  ├─ DUL_PhysicalQuality
│  ├─ DUL_TemporalQuality
│  └─ DUL_SocialQuality
│
├─ DUL_Abstract
│  ├─ DUL_Concept
│  ├─ DUL_Set
│  └─ DUL_Relation
│
└─ DUL_Role
```

Each node is a frame (type: ontology) with a Target FE.

#### Representation Example: DUL_Event

```
Frame: DUL_Event
  Type: ontology
  Target: The Event category
  
  FEs (properties of the category):
    Subclass_of → DUL_Perdurant
    Has_temporal_parts: TRUE
    Perduring: TRUE
    Disjoint_with: [DUL_Process, DUL_State]
  
  Definition: "Perdurants that are not processes or states; 
               events have temporal parts and unfold over time"
```

#### Relations in DUL Hierarchy

All DUL hierarchy relations use `subclass_of_relation` micro-frame:

```
DUL_Event.Target --subclass_of--> DUL_Perdurant.Target
DUL_Perdurant.Target --subclass_of--> DUL_Entity.Target

DUL_PhysicalObject.Target --subclass_of--> DUL_PhysicalEndurant.Target
DUL_PhysicalEndurant.Target --subclass_of--> DUL_Endurant.Target
DUL_Endurant.Target --subclass_of--> DUL_Entity.Target
```

### Classifying FrameNet Frames

FrameNet frames are classified under DUL categories using `instance_of_relation`:

```
Commerce_buy.Target --instance_of--> DUL_Event.Target
Apply_heat.Target --instance_of--> DUL_Event.Target
Revenge.Target --instance_of--> DUL_Event.Target

Person.Target --instance_of--> DUL_AgentivePhysicalObject.Target
Book.Target --instance_of--> DUL_PhysicalObject.Target
Money.Target --instance_of--> DUL_SocialObject.Target

Age.Target --instance_of--> DUL_TemporalQuality.Target
Color.Target --instance_of--> DUL_PhysicalQuality.Target
```

### Transitive Classification

Since `subclass_of` is transitive, classification propagates:

```
Commerce_buy --instance_of--> DUL_Event
DUL_Event --subclass_of--> DUL_Perdurant
DUL_Perdurant --subclass_of--> DUL_Entity

Therefore: Commerce_buy is (transitively) an instance of:
  - DUL_Event (direct)
  - DUL_Perdurant (via subclass)
  - DUL_Entity (via subclass)
```

### Benefits of DUL Integration

1. **Ontological grounding**: Frames get formal ontological types
2. **Systematic organization**: DUL provides principled upper ontology
3. **Cross-frame reasoning**: Shared DUL categories enable inference
4. **Type constraints**: DUL categories constrain FE fillers
5. **Interoperability**: Links to other ontologies using DUL

---

## Dual Database Architecture

### Architectural Overview

The system uses **two databases** for different purposes:

```
┌────────────────────────────────────────────────────┐
│              APPLICATION LAYER                     │
│                                                    │
│  ┌─────────────────┐      ┌──────────────────┐   │
│  │   Web App       │      │   Processing     │   │
│  │   (FrameNet     │      │   Services       │   │
│  │    Webtool)     │      │   (Analysis)     │   │
│  └────────┬────────┘      └────────┬─────────┘   │
└───────────┼─────────────────────────┼─────────────┘
            │                         │
            ▼                         ▼
  ┌──────────────────┐      ┌──────────────────────┐
  │   MariaDB        │◄────►│   Neo4j              │
  │   (Relational)   │ sync │   (Graph)            │
  │                  │      │                      │
  │ • CRUD ops       │      │ • Graph queries      │
  │ • UI rendering   │      │ • Path finding       │
  │ • Annotations    │      │ • Pattern matching   │
  │ • Storage        │      │ • Inference          │
  └──────────────────┘      └──────────────────────┘
       Normalized               Graph-optimized
```

### MariaDB: Web Application Database

**Purpose:** Store and manage data for web application

**Optimized for:**
- CRUD operations (Create, Read, Update, Delete)
- Web UI rendering
- Corpus annotation
- User management
- Data integrity

**Structure:**
- Normalized relational tables
- Foreign key constraints
- Indexes for common UI queries
- Supports existing FrameNet webtool

**Key Tables:**
- `frame` - all frame types
- `frame_element` - FEs with Target marking
- `fe_relation` - all relations via micro-frames
- `situation` - corpus annotations
- `situation_binding` - FE bindings in situations
- Plus: user management, corpora, documents, etc.

### Neo4j: Processing and Analysis Database

**Purpose:** Graph-based reasoning and complex queries

**Optimized for:**
- Graph traversal
- Path finding
- Pattern matching
- Transitive closure
- Frame similarity
- Inheritance hierarchies

**Structure:**
- Nodes: Frame, FrameElement
- Relationships: Named by micro-frame (AGENT_RELATION, INHERITS_FROM, etc.)
- Properties: Attached to nodes and relationships
- Natural graph representation

**Advantages:**
- Native graph algorithms
- Efficient traversal
- Visual exploration
- Cypher query language
- Schema-less flexibility

### Synchronization Strategy

**One-way sync: MariaDB → Neo4j**

- MariaDB is **source of truth** for data
- Neo4j is **materialized view** for processing
- Sync command rebuilds Neo4j from MariaDB
- Triggered: on-demand, scheduled, or after major updates

**Why one-way?**
- Web app writes to MariaDB (known, stable interface)
- Neo4j is for reading/analysis only
- Simpler consistency model
- No conflict resolution needed

**Sync frequency:**
- Full rebuild: when major structure changes
- Incremental: when annotations added
- On-demand: for research/analysis sessions

---

## Query Patterns and Reasoning

### Conceptual Query Patterns

#### Pattern 1: Find Frames by DUL Category

**Question:** "What frames are Events?"

**Conceptual approach:**
1. Find DUL_Event frame
2. Follow `instance_of_relation` backward to find frames classified as Event
3. Include transitive closure (frames classified as subclasses of Event)

**Result:** All semantic frames representing events

#### Pattern 2: Find Agent-Like FEs Across Frames

**Question:** "What FEs function as agents across different frames?"

**Conceptual approach:**
1. Find `agent_relation` micro-frame
2. Look for all fe_relations using this micro-frame
3. Filter for relations where source is Target FE
4. Extract target FEs (these are the agent-like FEs)

**Result:** 
- Commerce_buy.Buyer
- Apply_heat.Cook
- Revenge.Avenger
- etc.

#### Pattern 3: Frame Inheritance Hierarchy

**Question:** "What is the inheritance hierarchy for Commerce_buy?"

**Conceptual approach:**
1. Start with Commerce_buy.Target
2. Follow `inherits_from_relation` transitively
3. Collect all ancestor frames

**Result:**
```
Commerce_buy
  └─ Getting
      └─ Intentionally_act
          └─ Event
```

#### Pattern 4: Find Frames with Similar Relational Patterns

**Question:** "Which frames have similar structure to Commerce_buy?"

**Conceptual approach:**
1. Extract relational pattern for Commerce_buy:
   - agent_relation
   - theme_relation
   - source_relation
   - means_relation
2. Find other frames with overlapping pattern
3. Rank by pattern similarity

**Result:** Frames like Give, Trade, Exchange (transfer events with agents, themes, sources)

#### Pattern 5: Cross-Linguistic Comparison

**Question:** "How do English and Portuguese express buying events?"

**Conceptual approach:**
1. Find Commerce_buy frame
2. Find all LUs that evoke it
3. Group by language
4. Compare FE realization patterns across languages

**Result:**
```
English: buy.v, purchase.v, acquire.v
Portuguese: comprar.v, adquirir.v
Both evoke Commerce_buy with same core FE structure
```

#### Pattern 6: Semantic Role Generalization

**Question:** "What are the prototypical properties of agents across frames?"

**Conceptual approach:**
1. Find all FEs connected via `agent_relation`
2. Examine their `refers_to_frame` (typically Person, Organization)
3. Check constraints on agent_relation micro-frame
4. Analyze corpus patterns

**Result:**
- Agents typically animate
- Agents have intentionality
- Agents have control
- Agents are subjects syntactically
- But: frame-specific labels preserved (Buyer, Cook, etc.)

### Reasoning Mechanisms

#### Transitive Closure

**Relations that are transitive:**
- `inherits_from_relation` - if A inherits B and B inherits C, then A inherits C
- `subclass_of_relation` - DUL hierarchy
- `instance_of_relation` + `subclass_of_relation` combined

**Application:**
```
Commerce_buy instance_of DUL_Event
DUL_Event subclass_of DUL_Perdurant
DUL_Perdurant subclass_of DUL_Entity

Query: "Is Commerce_buy an Entity?"
Answer: Yes (via transitive closure)
```

#### Constraint Propagation

**Inheritance of constraints:**
```
Getting frame has constraint: Recipient is animate

Commerce_buy inherits_from Getting
Therefore: Commerce_buy.Buyer inherits "animate" constraint
```

**Type constraints from DUL:**
```
Commerce_buy instance_of DUL_Event
DUL_Event has property: has_temporal_parts = TRUE
Therefore: Commerce_buy has temporal parts
```

#### Frame Composition

**Uses relation enables composition:**
```
Commercial_transaction uses Commerce_buy
Commercial_transaction uses Transfer_money

Therefore: Commercial_transaction incorporates:
  - All FEs from Commerce_buy
  - All FEs from Transfer_money
  - Plus synchronization constraints between them
```

#### Pattern Matching

**Find frames matching relational signature:**
```
Pattern: [agent + theme + source + goal]

Matches:
  - Commerce_buy (agent=Buyer, theme=Goods, source=Seller)
  - Give (agent=Giver, theme=Theme, source=Giver, goal=Recipient)
  - Send (agent=Sender, theme=Theme, source=Source, goal=Goal)
  
Common structure: transfer events with agent control
```

---

## Theoretical Foundations

### Frame Semantics (Fillmore)

**Core principle:** Meaning is fundamentally contextual and structured

> "A frame is any system of concepts related in such a way that to understand any one concept it is necessary to understand the entire system; introducing any one concept or term that belongs to the frame automatically brings the whole frame with it."

**Frame-native architecture realizes this by:**
- Frames as primary representational unit
- FEs as slots within structured wholes
- Relations as structured connections (via micro-frames)
- Target FE as anchor for frame identity

### Qualia Structure (Pustejovsky)

**Core principle:** Word meaning includes four types of information

**Four qualia roles:**
1. **Constitutive:** What something is made of, parts
2. **Formal:** What distinguishes it, properties
3. **Telic:** Purpose, function
4. **Agentive:** Origin, how it came to be

**Integration in frame architecture:**
- Entity frames use qualia structure for FEs
- Person frame: Name (formal), Origin (agentive), Role (telic)
- Book frame: Pages (constitutive), Title (formal), Purpose (telic), Author (agentive)

### DUL Ontology (Gangemi et al.)

**Core principle:** Descriptions and Situations (DnS) pattern

**DUL's DnS pattern:**
```
Description (defines roles and constraints)
  ↓ defines
Role (abstract participation type)
  ↓ classifies
Concept (types of role fillers)
  ↓
Situation (concrete occurrence)
  ↓ satisfies
Description
```

**Frame-native realization:**
```
Frame Definition (= Description)
  ↓ contains
Frame Elements (= Roles)
  ↓ refers_to
Frames (= Concepts)
  ↓
Situation (= Situation)
  ↓ instantiates
Frame
```

The match is nearly perfect. **Frame-native DUL makes explicit what was implicit in DUL's original design:** DUL is fundamentally frame-based.

### The Linguistic-Ontological Bridge

**Traditional gap:**
- Linguistics: rich description, weak formalization
- Ontology: strong formalization, weak linguistic grounding

**Frame-native architecture bridges the gap:**
- **From linguistics:** Frame structure, lexical units, corpus grounding
- **From ontology:** DUL categories, constraints, formal relations
- **Unified:** Same representational substrate (frames)

**Result:** Linguistically grounded ontology and ontologically grounded linguistics

---

## Design Principles and Guidelines

### Principle 1: Frame-Specific FE Labels

**Always:** Use labels specific to the frame
**Never:** Use generic labels like Agent, Theme, Patient

**Rationale:** 
- Preserves semantic richness
- Reflects actual usage
- Captures frame-specific meaning
- Enables natural language description

**Comparison enabled by:** Micro-frames (agent_relation, theme_relation, etc.)

### Principle 2: Target FE in Every Frame

**Rule:** Every frame must have exactly one Target FE

**Purpose:**
- Represents core concept of frame
- Anchor point for relations
- Enables frame-to-frame connections
- Makes implicit explicit

**Exception:** Micro-frames (open question whether they need Target FE)

### Principle 3: Relations via Micro-Frames Only

**Rule:** All relations expressed through micro-frames
**No:** Special-case relation tables or properties

**Benefits:**
- Uniform representation
- Same query patterns
- Explicit relation semantics
- Extensible (add new micro-frames)

### Principle 4: Type Constraints via Frame References

**Rule:** FEs refer to frames (via `refers_to_frame_id`) for typing

**Example:**
```
Commerce_buy.Buyer refers_to Person frame
Commerce_buy.Money refers_to Money frame
```

**Not:** String-based semantic types

**Benefits:**
- Type is itself a frame (uniform)
- Enables querying type hierarchies
- Supports multiple classification

### Principle 5: Corpus-Grounded

**Rule:** Frame definitions informed by corpus usage

**FrameNet tradition:**
- Frames based on real language use
- Annotated corpus examples
- Statistics drive understanding

**Preservation:**
- Situations table stores annotations
- Frame definitions include examples
- Constraints can be learned from corpus

### Principle 6: Cross-Linguistic

**Rule:** Same frame structure across languages

**Implementation:**
- Language field on frames/LUs
- Translation relations between LUs
- Shared semantic frames across languages
- Language-specific frames when needed

---

## Open Questions and Design Decisions

### Question 1: Micro-Frames and Target FE

**Issue:** Do micro-frames themselves need Target FEs?

**Option A:** Yes, for uniformity
- Target represents the relation concept itself
- Enables meta-relations (relations between relations)
- Complete uniformity

**Option B:** No, micro-frames are special
- Micro-frames define structure, not concepts
- Their "identity" is their FE pair
- Simpler conceptually

**Current recommendation:** Discuss with team, document decision

### Question 2: Host Frame for Inter-Frame Relations

**Issue:** What should `host_frame_id` be for inter-frame relations?

**Option A:** NULL
- Signals "this relation crosses frames"
- Clear distinction from intra-frame

**Option B:** Source frame ID
- Always populated
- Consistent with "relations originate somewhere"

**Option C:** Eliminate field
- Compute dynamically (same frame or not)
- Simpler schema

**Current recommendation:** Option A (NULL for inter-frame) or Option C (eliminate)

### Question 3: Symmetric Relations

**Issue:** How to handle symmetric relations like `perspective_on`?

**Option A:** Store both directions
```
Commerce_buy.Target --perspective_on--> Commerce_sell.Target
Commerce_sell.Target --perspective_on--> Commerce_buy.Target
```

**Option B:** Store once, mark as symmetric
```
Commerce_buy.Target --perspective_on--> Commerce_sell.Target
(with symmetric property on relation)
```

**Option C:** Query-time inference
- Store once
- Queries automatically infer reverse

**Current recommendation:** Option B (mark as symmetric)

### Question 4: Relation Cardinality

**Issue:** Should micro-frames specify cardinality constraints?

**Example:**
```
inherits_from_relation: 
  - Child can have multiple parents? (multiple inheritance)
  - Child must have at least one parent?
```

**Options:**
- Add cardinality to micro-frame definition
- Add cardinality to specific fe_relation instances
- Enforce at application level only

**Current recommendation:** Specify in micro-frame definition, enforce at application level

### Question 5: Versioning and Evolution

**Issue:** How to handle frame/micro-frame evolution over time?

**Considerations:**
- Frames change as understanding improves
- Corpus annotations reference specific frame versions
- Need to track changes
- Need to migrate or maintain compatibility

**Options:**
- Version numbers on frames
- Immutable frames (create new version)
- Change log table
- Temporal database features

**Current recommendation:** Discuss based on project needs

---

## Implementation Considerations

### Database Schema

**Core tables needed:**
1. `frame` - all frame types
2. `frame_element` - FEs including Target
3. `fe_relation` - all relations via micro-frames
4. `situation` - corpus annotations
5. `situation_binding` - FE bindings

**Key constraints:**
- One Target FE per frame (unique constraint)
- Foreign keys for referential integrity
- Indexes for query performance

**Storage in:**
- MariaDB for web application
- Neo4j for graph processing (synced)

### Synchronization

**Sync command requirements:**
- Read from MariaDB
- Transform to graph representation
- Write to Neo4j
- Handle large datasets efficiently
- Incremental updates when possible

**Sync triggers:**
- Manual command
- Scheduled (e.g., nightly)
- After major data changes
- Before analysis sessions

### Performance Considerations

**MariaDB:**
- Index commonly queried fields
- Optimize for INSERT/UPDATE (annotations)
- Materialized views for complex queries
- Caching for frequently accessed frames

**Neo4j:**
- Natural graph traversal efficiency
- Indexes on node properties
- Cypher query optimization
- Limit result sets appropriately

### Tooling Needs

**Web application updates:**
- Frame browser (visualize structure)
- Annotation interface (situation creation)
- Relation editor (create fe_relations)
- Micro-frame manager

**Analysis tools:**
- Graph visualization
- Query builder
- Pattern matcher
- Statistics generator

---

## Benefits and Impact

### For Researchers

**Enables new research questions:**
- Compare relational patterns across frames
- Study systematic polysemy via micro-frames
- Cross-linguistic frame structure comparison
- Ontological analysis of frame inventory

**Provides formal foundation:**
- Precise semantics for frames
- Compositional theory via frame relations
- Testable hypotheses about frame structure

### For Annotators

**Clearer annotation:**
- Target FE makes frame identity explicit
- Type constraints guide annotation
- Validation through constraints
- Consistency checking

**Better tools:**
- Visual frame structure
- Relation-aware interface
- Automatic suggestion based on patterns

### For Applications

**Better NLU:**
- Semantic role labeling with micro-frame awareness
- Frame parsing with ontological constraints
- Inference via transitive relations
- Cross-lingual transfer via shared structure

**Structured knowledge:**
- Queryable semantic structures
- Graph-based reasoning
- Pattern-based extraction
- Type-safe processing

### For the FrameNet Community

**Maintains core values:**
- Frame-specific FE labels
- Corpus-grounded
- Usage-based
- Cross-linguistic

**Adds formalization:**
- Systematic relations
- Ontological grounding
- Compositional semantics
- Explicit structure

**Enables collaboration:**
- Shared representation
- Interoperable with DUL
- Common query language
- Cross-project compatibility

---

## Comparison with Alternative Approaches

### vs. OWL-Based Ontology

**OWL approach:**
- Class-property-individual structure
- Binary properties (requires reification)
- Description Logic reasoning
- Semantic Web standards

**Frame-native approach:**
- Frame-FE-situation structure
- N-ary relations (native via FEs)
- Graph-based reasoning
- Linguistic naturalness

**Trade-off:**
- Less standardized (no OWL/RDF)
- More natural representation
- Better for FrameNet use case

### vs. Traditional FrameNet

**Traditional FrameNet:**
- Frames, FEs, frame relations separate
- Informal frame relations
- No ontological grounding
- Implicit structure

**Frame-native:**
- Everything as frames
- Formal micro-frame relations
- DUL integration
- Explicit structure

**Advantage:**
- Maintains FrameNet principles
- Adds formalization
- Backward compatible (via views/APIs)

### vs. Framester Hub Approach

**Framester:**
- Hub architecture
- Maps FrameNet to multiple ontologies
- Translation layers
- Heterogeneous representations

**Frame-native:**
- Unified representation
- Direct DUL integration
- No translation needed
- Single paradigm

**Trade-off:**
- Less general (DUL focus)
- Deeper integration
- Simpler conceptually

---

## Glossary

**DUL (DOLCE Ultralite):** Upper-level ontology providing foundational categories

**Endurant:** Entities wholly present at any time they exist (objects, people)

**FE (Frame Element):** Typed slot in a frame representing a participant or circumstance

**Frame:** Structured representation of a concept with typed slots and relations

**Frame-native:** Representing concepts directly as frames rather than other formalisms

**Host frame:** The frame within which an FE relation exists (for intra-frame relations)

**Inter-frame relation:** Relation between FEs in different frames (typically Target FEs)

**Intra-frame relation:** Relation between FEs in the same frame

**Micro-frame:** Binary relation frame (exactly 2 FEs) defining relations between other FEs

**Perdurant:** Events, processes, states that unfold over time with temporal parts

**Qualia structure:** Four types of information about entities (constitutive, formal, telic, agentive)

**Situation:** Frame instance - concrete occurrence where entities fill FEs

**Target FE:** Special FE representing what the frame is fundamentally about

**Transitive closure:** Indirect relations computed through chains (e.g., A→B→C implies A→C)

---

## References

### Frame Semantics
1. Fillmore, C. J. (1982). Frame Semantics. In Linguistics Society of Korea (Ed.), Linguistics in the Morning Calm (pp. 111-137).
2. Fillmore, C. J., & Baker, C. F. (2010). A frames approach to semantic analysis. In B. Heine & H. Narrog (Eds.), The Oxford Handbook of Linguistic Analysis.

### FrameNet
3. Baker, C. F., Fillmore, C. J., & Lowe, J. B. (1998). The Berkeley FrameNet Project. In Proceedings of COLING-ACL.
4. Ruppenhofer, J., et al. (2016). FrameNet II: Extended Theory and Practice.
5. https://framenet.icsi.berkeley.edu/

### DOLCE/DUL Ontology
6. Gangemi, A., & Mika, P. (2003). Understanding the Semantic Web through Descriptions and Situations. In International Semantic Web Conference.
7. Masolo, C., et al. (2003). WonderWeb Deliverable D18: The WonderWeb Library of Foundational Ontologies.
8. http://www.ontologydesignpatterns.org/ont/dul/DUL.owl

### Generative Lexicon Theory
9. Pustejovsky, J. (1995). The Generative Lexicon. MIT Press.
10. Pustejovsky, J. (2006). Type Theory and Lexical Decomposition. Journal of Cognitive Science.

### Frame-Native DUL Architecture
11. Original proposal: https://elymatos.github.io/fn3/frame_native_dul_architecture

---

## Document Status and Next Steps

**Current Status:** Conceptual specification complete

**Next Steps:**
1. Team review and discussion of open questions
2. Finalize design decisions
3. Implementation with Claude Code
4. Schema creation in MariaDB
5. Micro-frame library creation
6. Sync infrastructure to Neo4j
7. Web tool adaptation
8. Testing and validation

**Contact:** [FrameNet Brasil Team]

---

## Appendix: Quick Reference

### Core Concepts

```
Frame = {
  frame_id: unique identifier
  frame_name: human-readable name
  frame_type: semantic | entity | lexical_unit | lemma | micro_frame | ontology
  is_micro_frame: boolean
  arity: 2 (for micro-frames)
  definition: text
}

FrameElement = {
  fe_id: unique identifier
  frame_id: which frame owns this FE
  fe_name: frame-specific label
  fe_type: core | peripheral | extra-thematic
  is_target_fe: boolean (exactly one TRUE per frame)
  refers_to_frame_id: type constraint (points to another frame)
  qualia_role: formal | constitutive | telic | agentive | participatory
  cardinality: 1 | 0..1 | 1..* | 0..*
  definition: text
}

FE_Relation = {
  micro_frame_id: which micro-frame defines this relation
  host_frame_id: NULL (inter-frame) or frame_id (intra-frame)
  source_fe_id: starting FE
  target_fe_id: ending FE
  source_maps_to_micro_fe_id: which FE in micro-frame for source
  target_maps_to_micro_fe_id: which FE in micro-frame for target
}
```

### Key Relations

**Intra-frame (FE to FE within same frame):**
- agent_relation: Event → Agent
- theme_relation: Event → Theme
- instrument_relation: Event → Instrument
- location_relation: Event/Entity → Location
- temporal_relation: Event → Time

**Inter-frame (Target to Target across frames):**
- inherits_from_relation: Child_frame → Parent_frame
- instance_of_relation: Instance → Category
- subclass_of_relation: Subclass → Superclass
- evokes_relation: Lexical_unit → Semantic_frame
- uses_relation: Container_frame → Component_frame
- perspective_on_relation: Perspective_1 ↔ Perspective_2

### Common Query Patterns

**Find frames classified under DUL category:**
```
Start: DUL_Event.Target
Follow: instance_of_relation (backward)
Include: Transitive via subclass_of_relation
```

**Find agent-like FEs:**
```
Find: agent_relation micro-frame
Look: All fe_relations using it
Filter: Source is Target FE
Extract: Target FEs
```

**Frame inheritance hierarchy:**
```
Start: Frame.Target
Follow: inherits_from_relation (forward)
Recursively: Until no more parents
```

**Frames with similar patterns:**
```
Extract: Pattern of micro-frames used in frame
Compare: Patterns across frames
Rank: By similarity (overlap)
```

---

**END OF DOCUMENT**

*Version: 2.0*  
*Date: October 21, 2025*  
*Pages: ~35 (conceptual focus)*  
*Ready for implementation with Claude Code*