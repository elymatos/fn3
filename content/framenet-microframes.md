# FrameNet Micro-Frames Library

**Version**: 1.0
**Date**: October 21, 2025
**Status**: Complete documentation of 28 FrameNet micro-frame relations

---

## Table of Contents

### 1. [Overview](#overview)
### 2. [FrameNet Micro-Frames Architecture](#framenet-micro-frames-architecture)
### 3. [Micro-Frame Categories](#micro-frame-categories)
### 4. [FrameNet Micro-Frames Library](#4-framenet-micro-frames-library)

#### 4.1 [Participant Relations (Intra-Frame)](#41-participant-relations-intra-frame) (5 micro-frames)
- [agent_relation](#agent_relation)
- [theme_relation](#theme_relation)
- [patient_relation](#patient_relation)
- [experiencer_relation](#experiencer_relation)
- [instrument_relation](#instrument_relation)

#### 4.2 [Transfer Relations (Intra-Frame)](#42-transfer-relations-intra-frame) (3 micro-frames)
- [source_relation](#source_relation)
- [goal_relation](#goal_relation)
- [recipient_relation](#recipient_relation)

#### 4.3 [Spatial Relations (Intra-Frame)](#43-spatial-relations-intra-frame) (2 micro-frames)
- [location_relation](#location_relation)
- [path_relation](#path_relation)

#### 4.4 [Temporal Relations (Intra-Frame)](#44-temporal-relations-intra-frame) (2 micro-frames)
- [temporal_relation](#temporal_relation)
- [duration_relation](#duration_relation)

#### 4.5 [Causal Relations (Intra-Frame)](#45-causal-relations-intra-frame) (3 micro-frames)
- [cause_relation](#cause_relation)
- [purpose_relation](#purpose_relation)
- [means_relation](#means_relation)

#### 4.6 [Quality Relations (Intra-Frame/Inter-Frame)](#46-quality-relations-intra-frameinter-frame) (2 micro-frames)
- [quality_relation](#quality_relation)
- [value_relation](#value_relation)

#### 4.7 [Frame-to-Frame Relations (Inter-Frame)](#47-frame-to-frame-relations-inter-frame) (6 micro-frames)
- [inherits_from_relation](#inherits_from_relation)
- [uses_relation](#uses_relation)
- [subframe_of_relation](#subframe_of_relation)
- [perspective_on_relation](#perspective_on_relation)
- [precedes_relation](#precedes_relation)
- [causative_of_relation](#causative_of_relation)

#### 4.8 [Ontological Relations (Inter-Frame, DUL)](#48-ontological-relations-inter-frame-dul) (2 micro-frames)
- [instance_of_relation](#instance_of_relation)
- [subclass_of_relation](#subclass_of_relation)

#### 4.9 [Lexical Relations (Inter-Frame)](#49-lexical-relations-inter-frame) (3 micro-frames)
- [evokes_relation](#evokes_relation)
- [has_lemma_relation](#has_lemma_relation)
- [translation_of_relation](#translation_of_relation)

### 5. [Summary Statistics](#5-summary-statistics)
### 6. [References](#6-references)

---

## 1. Overview

This document provides complete documentation of the **FrameNet Micro-Frame Library** - a comprehensive set of 28 binary relation frames that define the relational structure within and between frames in the FrameNet Brasil frame-native architecture.

### What Are Micro-Frames?

**Micro-frames** are special frames with exactly two Frame Elements (binary relations) that define relations between other FEs. They serve as the universal mechanism for representing all types of relations in the frame-native architecture.

**Key Properties:**
- **Arity = 2**: Exactly two FEs (FE1 and FE2)
- **is_micro_frame = TRUE**: Marked as micro-frame type
- **Binary relations**: Connect source FE to target FE
- **Universal mechanism**: Same structure for all relation types

### Two Patterns of Relations

#### Intra-Frame Relations
Relations between FEs within the same frame:
```
Commerce_buy.Target --agent_relation--> Commerce_buy.Buyer
Commerce_buy.Target --theme_relation--> Commerce_buy.Goods
```

#### Inter-Frame Relations
Relations between FEs in different frames (typically Target FEs):
```
Commerce_buy.Target --inherits_from--> Getting.Target
buy.v.Target --evokes--> Commerce_buy.Target
```

### Coverage

This library includes **28 micro-frames** organized into **9 categories**:

| Category | Micro-Frames | Scope |
|----------|--------------|-------|
| Participant Relations | 5 | Intra-frame |
| Transfer Relations | 3 | Intra-frame |
| Spatial Relations | 2 | Intra-frame |
| Temporal Relations | 2 | Intra-frame |
| Causal Relations | 3 | Intra-frame |
| Quality Relations | 2 | Intra/Inter-frame |
| Frame-to-Frame Relations | 6 | Inter-frame |
| Ontological Relations | 2 | Inter-frame (DUL) |
| Lexical Relations | 3 | Inter-frame |
| **TOTAL** | **28** | Both |

---

## 2. FrameNet Micro-Frames Architecture

### The Target FE Principle

Every frame has exactly one **Target FE** (`is_target_fe = TRUE`) that represents what the frame is fundamentally about:

- **Semantic frames**: Target = the event/state itself
- **Entity frames**: Target = the entity itself
- **LU frames**: Target = the lexical unit itself
- **Ontology frames**: Target = the category itself

### Unified Relation Mechanism

All relations use the same structure:
```
fe_relation = {
  micro_frame_id: which micro-frame defines this relation
  host_frame_id: NULL (inter-frame) or frame_id (intra-frame)
  source_fe_id: starting FE
  target_fe_id: ending FE
  source_maps_to: which FE in micro-frame for source
  target_maps_to: which FE in micro-frame for target
}
```

### Design Principles

1. **Frame-Specific FE Labels**: Use Buyer, Cook, Avenger (not generic Agent)
2. **Target FE in Every Frame**: Anchor point for all relations
3. **Relations via Micro-Frames Only**: No special-case relation tables
4. **Type Constraints via Frame References**: FEs refer to frames for typing
5. **No Fundamental Difference**: Intra-frame and inter-frame use same mechanism

---

## 3. Micro-Frame Categories

### Intra-Frame Micro-Frames (15)

Relations between FEs within the same frame:

**Participant Relations (5)**:
- agent_relation, theme_relation, patient_relation, experiencer_relation, instrument_relation

**Transfer Relations (3)**:
- source_relation, goal_relation, recipient_relation

**Spatial Relations (2)**:
- location_relation, path_relation

**Temporal Relations (2)**:
- temporal_relation, duration_relation

**Causal Relations (3)**:
- cause_relation, purpose_relation, means_relation

**Quality Relations (2)**:
- quality_relation, value_relation

### Inter-Frame Micro-Frames (13)

Relations between FEs in different frames:

**Frame-to-Frame Relations (6)**:
- inherits_from_relation, uses_relation, subframe_of_relation, perspective_on_relation, precedes_relation, causative_of_relation

**Ontological Relations (2)**:
- instance_of_relation, subclass_of_relation

**Lexical Relations (3)**:
- evokes_relation, has_lemma_relation, translation_of_relation

---

## 4. FrameNet Micro-Frames Library

### 4.1 Participant Relations (Intra-Frame)

These micro-frames define core participant roles within semantic frames.

---

#### agent_relation

**Type**: FrameNet Micro-Frame
**Background Frame**: *Participant_Relations*
**Scope**: Intra-frame

**Frame Elements**:
- **FE1**: Event (the event being controlled)
- **FE2**: Agent (intentional controller)

**Semantics**: Agent intentionally initiates and controls Event

**Constraints**:
- Agent must have intentionality
- Agent must have volition
- Agent typically animate

**Applied in**:
```
Commerce_buy: Buyer is agent
Apply_heat: Cook is agent
Revenge: Avenger is agent
```

**Examples**:
```
Commerce_buy.Target --agent_relation--> Commerce_buy.Buyer
Apply_heat.Target --agent_relation--> Apply_heat.Cook
```

**Status**: FrameNet core micro-frame

---

#### theme_relation

**Type**: FrameNet Micro-Frame
**Background Frame**: *Participant_Relations*
**Scope**: Intra-frame

**Frame Elements**:
- **FE1**: Event
- **FE2**: Theme (central participant)

**Semantics**: Theme is centrally involved in Event, may undergo change

**Constraints**:
- Theme is affected by Event
- Theme may change state or location

**Applied in**:
```
Commerce_buy: Goods is theme
Apply_heat: Food is theme
```

**Examples**:
```
Commerce_buy.Target --theme_relation--> Commerce_buy.Goods
Apply_heat.Target --theme_relation--> Apply_heat.Food
```

**Status**: FrameNet core micro-frame

---

#### patient_relation

**Type**: FrameNet Micro-Frame
**Background Frame**: *Participant_Relations*
**Scope**: Intra-frame

**Frame Elements**:
- **FE1**: Event
- **FE2**: Patient (entity undergoing change)

**Semantics**: Patient undergoes change of state

**Constraints**:
- Patient must change during Event
- Change is observable

**Applied in**:
```
Break: Broken_entity is patient
Heat: Heated_object is patient
```

**Examples**:
```
Break.Target --patient_relation--> Break.Broken_entity
```

**Status**: FrameNet core micro-frame

---

#### experiencer_relation

**Type**: FrameNet Micro-Frame
**Background Frame**: *Participant_Relations*
**Scope**: Intra-frame

**Frame Elements**:
- **FE1**: Event (psychological/perceptual)
- **FE2**: Experiencer (entity experiencing)

**Semantics**: Experiencer has mental or perceptual state

**Constraints**:
- Experiencer must be sentient
- Event is psychological/perceptual

**Applied in**:
```
Fear: Experiencer fears something
See: Perceiver sees something
```

**Examples**:
```
Fear.Target --experiencer_relation--> Fear.Experiencer
```

**Status**: FrameNet core micro-frame

---

#### instrument_relation

**Type**: FrameNet Micro-Frame
**Background Frame**: *Participant_Relations*
**Scope**: Intra-frame

**Frame Elements**:
- **FE1**: Event
- **FE2**: Instrument (tool used)

**Semantics**: Instrument enables Event but is not consumed

**Constraints**:
- Instrument is not consumed
- Instrument is controlled by Agent
- Instrument is inanimate (typically)

**Applied in**:
```
Apply_heat: Heating_instrument
Write: Writing_instrument
```

**Examples**:
```
Apply_heat.Target --instrument_relation--> Apply_heat.Heating_instrument
```

**Status**: FrameNet core micro-frame

---

### 4.2 Transfer Relations (Intra-Frame)

These micro-frames define transfer and motion relations.

---

#### source_relation

**Type**: FrameNet Micro-Frame
**Background Frame**: *Transfer_Relations*
**Scope**: Intra-frame

**Frame Elements**:
- **FE1**: Event (transfer/motion)
- **FE2**: Source (origin)

**Semantics**: Source is origin in transfer or motion

**Constraints**:
- Source has control/possession before Event
- Source loses control/possession during Event

**Applied in**:
```
Commerce_buy: Seller is source
Motion: Source_location
```

**Examples**:
```
Commerce_buy.Target --source_relation--> Commerce_buy.Seller
```

**Status**: FrameNet core micro-frame

---

#### goal_relation

**Type**: FrameNet Micro-Frame
**Background Frame**: *Transfer_Relations*
**Scope**: Intra-frame

**Frame Elements**:
- **FE1**: Event (transfer/motion)
- **FE2**: Goal (destination)

**Semantics**: Goal is destination in transfer or motion

**Constraints**:
- Goal gains control/possession after Event
- Goal did not have control/possession before Event

**Applied in**:
```
Give: Recipient is goal
Motion: Goal_location
```

**Examples**:
```
Give.Target --goal_relation--> Give.Recipient
```

**Status**: FrameNet core micro-frame

---

#### recipient_relation

**Type**: FrameNet Micro-Frame
**Background Frame**: *Transfer_Relations*
**Scope**: Intra-frame

**Frame Elements**:
- **FE1**: Event (transfer)
- **FE2**: Recipient (receiver)

**Semantics**: Recipient receives something in transfer

**Applied in**:
```
Give: Recipient
Send: Addressee
```

**Examples**:
```
Give.Target --recipient_relation--> Give.Recipient
```

**Status**: FrameNet core micro-frame

---

### 4.3 Spatial Relations (Intra-Frame)

These micro-frames define spatial location and path.

---

#### location_relation

**Type**: FrameNet Micro-Frame
**Background Frame**: *Spatial_Relations*
**Scope**: Intra-frame

**Frame Elements**:
- **FE1**: Event or Entity
- **FE2**: Location (spatial region)

**Semantics**: Event occurs at or Entity exists at Location

**Applied in**:
```
Commerce_buy: Place
Person: Lives_in
```

**Examples**:
```
Commerce_buy.Target --location_relation--> Commerce_buy.Place
Person.Target --location_relation--> Person.Lives_in
```

**Status**: FrameNet core micro-frame

---

#### path_relation

**Type**: FrameNet Micro-Frame
**Background Frame**: *Spatial_Relations*
**Scope**: Intra-frame

**Frame Elements**:
- **FE1**: Event (motion)
- **FE2**: Path (route)

**Semantics**: Motion follows Path

**Applied in**:
```
Travel: Path
Send: Path
```

**Examples**:
```
Travel.Target --path_relation--> Travel.Path
```

**Status**: FrameNet core micro-frame

---

### 4.4 Temporal Relations (Intra-Frame)

These micro-frames define temporal location and duration.

---

#### temporal_relation

**Type**: FrameNet Micro-Frame
**Background Frame**: *Temporal_Relations*
**Scope**: Intra-frame

**Frame Elements**:
- **FE1**: Event
- **FE2**: Time (time interval)

**Semantics**: Event occurs during Time

**Applied in**:
```
Commerce_buy: Time
Meeting: Scheduled_time
```

**Examples**:
```
Commerce_buy.Target --temporal_relation--> Commerce_buy.Time
```

**Status**: FrameNet core micro-frame

---

#### duration_relation

**Type**: FrameNet Micro-Frame
**Background Frame**: *Temporal_Relations*
**Scope**: Intra-frame

**Frame Elements**:
- **FE1**: Event
- **FE2**: Duration (time span)

**Semantics**: Event lasts for Duration

**Applied in**:
```
Apply_heat: Duration
Sleep: Duration
```

**Examples**:
```
Apply_heat.Target --duration_relation--> Apply_heat.Duration
```

**Status**: FrameNet core micro-frame

---

### 4.5 Causal Relations (Intra-Frame)

These micro-frames define causation, purpose, and means.

---

#### cause_relation

**Type**: FrameNet Micro-Frame
**Background Frame**: *Causal_Relations*
**Scope**: Intra-frame

**Frame Elements**:
- **FE1**: Event (result)
- **FE2**: Cause (causing event/entity)

**Semantics**: Cause brings about Event

**Applied in**:
```
Death: Cause_of_death
Emotion: Stimulus
```

**Examples**:
```
Death.Target --cause_relation--> Death.Cause_of_death
```

**Status**: FrameNet core micro-frame

---

#### purpose_relation

**Type**: FrameNet Micro-Frame
**Background Frame**: *Causal_Relations*
**Scope**: Intra-frame

**Frame Elements**:
- **FE1**: Event
- **FE2**: Purpose (intended outcome)

**Semantics**: Event is done for Purpose

**Applied in**:
```
Commerce_buy: Purpose
Travel: Purpose
```

**Examples**:
```
Commerce_buy.Target --purpose_relation--> Commerce_buy.Purpose
```

**Status**: FrameNet core micro-frame

---

#### means_relation

**Type**: FrameNet Micro-Frame
**Background Frame**: *Causal_Relations*
**Scope**: Intra-frame

**Frame Elements**:
- **FE1**: Event
- **FE2**: Means (method/resource)

**Semantics**: Event is accomplished via Means

**Applied in**:
```
Commerce_buy: Money is means
Achieve: Means_of_achievement
```

**Examples**:
```
Commerce_buy.Target --means_relation--> Commerce_buy.Money
```

**Status**: FrameNet core micro-frame

---

### 4.6 Quality Relations (Intra-Frame/Inter-Frame)

These micro-frames define quality and value attribution.

---

#### quality_relation

**Type**: FrameNet Micro-Frame
**Background Frame**: *Quality_Relations*
**Scope**: Intra-frame / Inter-frame

**Frame Elements**:
- **FE1**: Entity
- **FE2**: Quality (attribute)

**Semantics**: Entity possesses Quality

**Applied in**:
```
Person: Age, Height, Weight
Object: Color, Shape
```

**Examples**:
```
Person.Target --quality_relation--> Person.Age
Object.Target --quality_relation--> Object.Color
```

**Status**: FrameNet core micro-frame

---

#### value_relation

**Type**: FrameNet Micro-Frame
**Background Frame**: *Quality_Relations*
**Scope**: Intra-frame

**Frame Elements**:
- **FE1**: Quality
- **FE2**: Value (measurement)

**Semantics**: Quality has specific Value

**Applied in**:
```
Temperature: Degree
Age: Years
```

**Examples**:
```
Temperature.Target --value_relation--> Temperature.Degree
```

**Status**: FrameNet core micro-frame

---

### 4.7 Frame-to-Frame Relations (Inter-Frame)

These micro-frames define relations between semantic frames via their Target FEs.

---

#### inherits_from_relation

**Type**: FrameNet Micro-Frame
**Background Frame**: *Frame_Inheritance*
**Scope**: Inter-frame

**Frame Elements**:
- **FE1**: Child_frame (Target of child)
- **FE2**: Parent_frame (Target of parent)

**Semantics**: Child_frame specializes Parent_frame

**Constraints**:
- Child inherits FEs from Parent
- Child inherits constraints from Parent
- Child may override or add FEs
- No cycles allowed
- Transitive

**Applied in**:
```
Commerce_buy → Getting
Apply_heat → Intentionally_act
```

**Examples**:
```
Commerce_buy.Target --inherits_from--> Getting.Target
Apply_heat.Target --inherits_from--> Intentionally_act.Target
```

**Status**: FrameNet core micro-frame

---

#### uses_relation

**Type**: FrameNet Micro-Frame
**Background Frame**: *Frame_Composition*
**Scope**: Inter-frame

**Frame Elements**:
- **FE1**: Container_frame (Target)
- **FE2**: Component_frame (Target)

**Semantics**: Container_frame incorporates Component_frame as subpart

**Constraints**:
- Both must be semantic frames
- Component typically precedes or overlaps Container temporally

**Applied in**:
```
Commercial_transaction uses Commerce_buy
Commercial_transaction uses Transfer_money
```

**Examples**:
```
Commercial_transaction.Target --uses--> Commerce_buy.Target
```

**Status**: FrameNet core micro-frame

---

#### subframe_of_relation

**Type**: FrameNet Micro-Frame
**Background Frame**: *Frame_Composition*
**Scope**: Inter-frame

**Frame Elements**:
- **FE1**: Subframe (Target)
- **FE2**: Complex_frame (Target)

**Semantics**: Subframe is temporal part of Complex_frame

**Constraints**:
- Subframe is proper temporal part
- Complex_frame consists of ordered subframes

**Applied in**:
```
Paying subframe_of Commercial_transaction
Approach subframe_of Arrival
```

**Examples**:
```
Paying.Target --subframe_of--> Commercial_transaction.Target
```

**Status**: FrameNet core micro-frame

---

#### perspective_on_relation

**Type**: FrameNet Micro-Frame
**Background Frame**: *Frame_Perspective*
**Scope**: Inter-frame

**Frame Elements**:
- **FE1**: Perspective_1 (Target)
- **FE2**: Perspective_2 (Target)

**Semantics**: Same event viewed from different perspectives

**Constraints**:
- Symmetric relation
- FEs should be mappable between frames
- Both describe same underlying situation

**Applied in**:
```
Commerce_buy ↔ Commerce_sell
Teach ↔ Learn
```

**Examples**:
```
Commerce_buy.Target --perspective_on--> Commerce_sell.Target
Commerce_sell.Target --perspective_on--> Commerce_buy.Target
```

**Status**: FrameNet core micro-frame

---

#### precedes_relation

**Type**: FrameNet Micro-Frame
**Background Frame**: *Frame_Sequencing*
**Scope**: Inter-frame

**Frame Elements**:
- **FE1**: Earlier_event (Target)
- **FE2**: Later_event (Target)

**Semantics**: Earlier_event temporally precedes Later_event

**Constraints**:
- Temporal ordering
- Often causally related

**Applied in**:
```
Preparation precedes Cooking
Application precedes Acceptance
```

**Examples**:
```
Preparation.Target --precedes--> Cooking.Target
```

**Status**: FrameNet core micro-frame

---

#### causative_of_relation

**Type**: FrameNet Micro-Frame
**Background Frame**: *Frame_Causation*
**Scope**: Inter-frame

**Frame Elements**:
- **FE1**: Causative_event (Target)
- **FE2**: Result_event (Target)

**Semantics**: Causative_event causes Result_event

**Constraints**:
- Causal relation
- Causative typically involves agency

**Applied in**:
```
Killing causative_of Death
Breaking causative_of Broken_state
```

**Examples**:
```
Killing.Target --causative_of--> Death.Target
```

**Status**: FrameNet core micro-frame

---

### 4.8 Ontological Relations (Inter-Frame, DUL)

These micro-frames connect FrameNet frames to DUL ontology categories.

---

#### instance_of_relation

**Type**: FrameNet Micro-Frame
**Background Frame**: *Ontological_Classification*
**Scope**: Inter-frame (DUL integration)

**Frame Elements**:
- **FE1**: Instance (Target of any frame)
- **FE2**: Category (Target of ontology frame)

**Semantics**: Instance is classified under Category

**Constraints**:
- Category must be ontology frame
- Transitive through subclass_of

**Applied in**:
```
Commerce_buy → DUL_Event
Person → DUL_AgentivePhysicalObject
Money → DUL_SocialObject
```

**Examples**:
```
Commerce_buy.Target --instance_of--> DUL_Event.Target
Person.Target --instance_of--> DUL_AgentivePhysicalObject.Target
```

**Status**: FrameNet-DUL integration micro-frame

---

#### subclass_of_relation

**Type**: FrameNet Micro-Frame
**Background Frame**: *Ontological_Hierarchy*
**Scope**: Inter-frame (DUL hierarchy)

**Frame Elements**:
- **FE1**: Subclass (Target of ontology frame)
- **FE2**: Superclass (Target of ontology frame)

**Semantics**: Subclass is more specific than Superclass

**Constraints**:
- Both must be ontology frames
- Transitive
- No cycles

**Applied in**:
```
DUL_Event → DUL_Perdurant
DUL_Perdurant → DUL_Entity
DUL_PhysicalObject → DUL_PhysicalEndurant
```

**Examples**:
```
DUL_Event.Target --subclass_of--> DUL_Perdurant.Target
```

**Status**: DUL ontology micro-frame

---

### 4.9 Lexical Relations (Inter-Frame)

These micro-frames connect lexical units, lemmas, and semantic frames.

---

#### evokes_relation

**Type**: FrameNet Micro-Frame
**Background Frame**: *Lexical_Evocation*
**Scope**: Inter-frame

**Frame Elements**:
- **FE1**: Lexical_unit (Target of LU frame)
- **FE2**: Semantic_frame (Target of semantic frame)

**Semantics**: Using Lexical_unit triggers Semantic_frame

**Constraints**:
- Lexical_unit must be LU frame
- Semantic_frame must be semantic frame

**Applied in**:
```
buy.v → Commerce_buy
cook.v → Apply_heat
comprar.v → Commerce_buy
```

**Examples**:
```
buy.v.Target --evokes--> Commerce_buy.Target
cook.v.Target --evokes--> Apply_heat.Target
```

**Status**: FrameNet core micro-frame

---

#### has_lemma_relation

**Type**: FrameNet Micro-Frame
**Background Frame**: *Lexical_Realization*
**Scope**: Inter-frame

**Frame Elements**:
- **FE1**: Lexical_unit (Target)
- **FE2**: Lemma (Target)

**Semantics**: Lexical_unit realizes Lemma

**Constraints**:
- One-to-many: one lemma, many LUs

**Applied in**:
```
buy.v → buy_lemma
buy.n → buy_lemma
```

**Examples**:
```
buy.v.Target --has_lemma--> buy_lemma.Target
buy.n.Target --has_lemma--> buy_lemma.Target
```

**Status**: FrameNet core micro-frame

---

#### translation_of_relation

**Type**: FrameNet Micro-Frame
**Background Frame**: *Lexical_Translation*
**Scope**: Inter-frame

**Frame Elements**:
- **FE1**: LU_language1 (Target)
- **FE2**: LU_language2 (Target)

**Semantics**: Translation equivalents across languages

**Constraints**:
- Typically both evoke same or related frames
- May be symmetric or directional

**Applied in**:
```
buy.v ↔ comprar.v
buy.v ↔ acheter.v
```

**Examples**:
```
buy.v.Target --translation_of--> comprar.v.Target
```

**Status**: FrameNet multilingual micro-frame

---

## 5. Summary Statistics

### Overall Coverage

| Type | Count | Scope |
|------|-------|-------|
| **Participant Relations** | 5 | Intra-frame |
| **Transfer Relations** | 3 | Intra-frame |
| **Spatial Relations** | 2 | Intra-frame |
| **Temporal Relations** | 2 | Intra-frame |
| **Causal Relations** | 3 | Intra-frame |
| **Quality Relations** | 2 | Intra/Inter-frame |
| **Frame-to-Frame Relations** | 6 | Inter-frame |
| **Ontological Relations** | 2 | Inter-frame (DUL) |
| **Lexical Relations** | 3 | Inter-frame |
| **TOTAL** | **28** | Both |

### By Scope

| Scope | Micro-Frames | Percentage |
|-------|--------------|------------|
| Intra-frame only | 15 | 53.6% |
| Inter-frame only | 11 | 39.3% |
| Both | 2 | 7.1% |
| **TOTAL** | **28** | **100%** |

### By Function

**Semantic Role Relations (Intra-frame)**: 15
- Core participants (5)
- Transfer roles (3)
- Spatial/temporal (4)
- Causal (3)

**Frame Structure Relations (Inter-frame)**: 6
- Inheritance and composition
- Perspective and sequencing
- Causative frames

**Integration Relations (Inter-frame)**: 7
- Ontological classification (2)
- Lexical evocation (3)
- Quality attribution (2)

### Implementation Status

- **Production Ready**: All 28 micro-frames documented
- **Core Library**: Covers essential FrameNet relations
- **DUL Integration**: Ontological grounding included
- **Multilingual Support**: Translation relations defined

---

## 6. References

### Frame Semantics and FrameNet
1. **Fillmore, C. J. (1982)**. "Frame Semantics". *Linguistics in the Morning Calm* (pp. 111-137).
   - Foundational work on frame semantics

2. **Baker, C. F., Fillmore, C. J., & Lowe, J. B. (1998)**. "The Berkeley FrameNet Project". *Proceedings of COLING-ACL*, 86-90.
   - FrameNet project introduction

3. **Ruppenhofer, J., et al. (2016)**. *FrameNet II: Extended Theory and Practice*.
   - Current FrameNet methodology

### Frame-Native Architecture
4. **FrameNet Brasil Team (2025)**. "Frame-Native DUL Architecture Specification v2.0". FrameNet Brasil Documentation.
   - Theoretical foundation for micro-frame architecture
   - Target FE principle and unified relation system

5. **FrameNet Brasil Team (2025)**. "Frame-Native Architecture: Comprehensive Documentation". `/home/ematos/devel/fnbr/fn3/docs/dul/frame_native_dul_architecture.md`
   - Original comprehensive architectural specification

### DUL Ontology Integration
6. **Gangemi, A., & Mika, P. (2003)**. "Understanding the Semantic Web through Descriptions and Situations". *Proceedings of International Semantic Web Conference*, 689-706.
   - DnS pattern and DUL foundations

7. **Masolo, C., et al. (2003)**. "WonderWeb Deliverable D18: The WonderWeb Library of Foundational Ontologies". *ISTC-CNR Technical Report*.
   - Complete DOLCE/DUL specification

---

---

## Appendix: Quick Reference Tables

This appendix provides quick reference tables for all 28 FrameNet micro-frames organized by functional category.

---

### A.1 Participant Relations (Intra-Frame) - 5 micro-frames

| Micro-Frame Name | Semantics | FE1 | FE2 |
|------------------|-----------|-----|-----|
| agent_relation | Agent intentionally initiates and controls Event | Event | Agent |
| theme_relation | Theme is centrally involved in Event, may undergo change | Event | Theme |
| patient_relation | Patient undergoes change of state | Event | Patient |
| experiencer_relation | Experiencer has mental or perceptual state | Event | Experiencer |
| instrument_relation | Instrument enables Event but is not consumed | Event | Instrument |

---

### A.2 Transfer Relations (Intra-Frame) - 3 micro-frames

| Micro-Frame Name | Semantics | FE1 | FE2 |
|------------------|-----------|-----|-----|
| source_relation | Source is origin in transfer or motion | Event | Source |
| goal_relation | Goal is destination in transfer or motion | Event | Goal |
| recipient_relation | Recipient receives something in transfer | Event | Recipient |

---

### A.3 Spatial Relations (Intra-Frame) - 2 micro-frames

| Micro-Frame Name | Semantics | FE1 | FE2 |
|------------------|-----------|-----|-----|
| location_relation | Event occurs at or Entity exists at Location | Event/Entity | Location |
| path_relation | Motion follows Path | Event | Path |

---

### A.4 Temporal Relations (Intra-Frame) - 2 micro-frames

| Micro-Frame Name | Semantics | FE1 | FE2 |
|------------------|-----------|-----|-----|
| temporal_relation | Event occurs during Time | Event | Time |
| duration_relation | Event lasts for Duration | Event | Duration |

---

### A.5 Causal Relations (Intra-Frame) - 3 micro-frames

| Micro-Frame Name | Semantics | FE1 | FE2 |
|------------------|-----------|-----|-----|
| cause_relation | Cause brings about Event | Event | Cause |
| purpose_relation | Event is done for Purpose | Event | Purpose |
| means_relation | Event is accomplished via Means | Event | Means |

---

### A.6 Quality Relations (Intra-Frame/Inter-Frame) - 2 micro-frames

| Micro-Frame Name | Semantics | FE1 | FE2 |
|------------------|-----------|-----|-----|
| quality_relation | Entity possesses Quality | Entity | Quality |
| value_relation | Quality has specific Value | Quality | Value |

---

### A.7 Frame-to-Frame Relations (Inter-Frame) - 6 micro-frames

| Micro-Frame Name | Semantics | FE1 | FE2 |
|------------------|-----------|-----|-----|
| inherits_from_relation | Child_frame specializes Parent_frame | Child_frame | Parent_frame |
| uses_relation | Container_frame incorporates Component_frame as subpart | Container_frame | Component_frame |
| subframe_of_relation | Subframe is temporal part of Complex_frame | Subframe | Complex_frame |
| perspective_on_relation | Same event viewed from different perspectives (symmetric) | Perspective_1 | Perspective_2 |
| precedes_relation | Earlier_event temporally precedes Later_event | Earlier_event | Later_event |
| causative_of_relation | Causative_event causes Result_event | Causative_event | Result_event |

---

### A.8 Ontological Relations (Inter-Frame, DUL) - 2 micro-frames

| Micro-Frame Name | Semantics | FE1 | FE2 |
|------------------|-----------|-----|-----|
| instance_of_relation | Instance is classified under Category | Instance | Category |
| subclass_of_relation | Subclass is more specific than Superclass | Subclass | Superclass |

---

### A.9 Lexical Relations (Inter-Frame) - 3 micro-frames

| Micro-Frame Name | Semantics | FE1 | FE2 |
|------------------|-----------|-----|-----|
| evokes_relation | Using Lexical_unit triggers Semantic_frame | Lexical_unit | Semantic_frame |
| has_lemma_relation | Lexical_unit realizes Lemma | Lexical_unit | Lemma |
| translation_of_relation | Translation equivalents across languages | LU_language1 | LU_language2 |

---

### A.10 Summary Statistics

**Total FrameNet Micro-Frames**: 28

**By Category**:
- Participant Relations (Intra-frame): 5
- Transfer Relations (Intra-frame): 3
- Spatial Relations (Intra-frame): 2
- Temporal Relations (Intra-frame): 2
- Causal Relations (Intra-frame): 3
- Quality Relations (Intra/Inter-frame): 2
- Frame-to-Frame Relations (Inter-frame): 6
- Ontological Relations (Inter-frame, DUL): 2
- Lexical Relations (Inter-frame): 3

**By Scope**:
- Intra-frame relations: 15 (53.6%)
- Inter-frame relations: 11 (39.3%)
- Both intra/inter-frame: 2 (7.1%)

**Implementation Status**:
- All 28 micro-frames documented and ready for implementation
- Covers essential FrameNet semantic role and frame structure relations
- Includes DUL ontological integration (2 micro-frames)
- Supports multilingual lexical linking (3 micro-frames)
- Provides complete relational architecture for frame-native system

**Key Properties**:
- Binary relations (arity = 2)
- Uniform mechanism for all relation types
- Target FE serves as anchor for inter-frame relations
- Frame-specific FE labels preserved
- Constraints documented for each micro-frame

---

**END OF DOCUMENT**

**Version**: 1.1 (Complete with Appendix)
**Date**: October 21, 2025
**Total Micro-Frames**: 28
**Total Lines**: ~1,150
**Status**: Complete and ready for implementation
