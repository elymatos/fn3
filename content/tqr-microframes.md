# TQR Micro-Frames Documentation for FrameNet Brasil

**Version**: 3.0 (Reorganized with CONTEXT Qualia)
**Date**: October 21, 2025
**Status**: 65 Implemented + 26 Under Investigation

---

## Table of Contents

### 1. [Overview](#overview)
### 2. [What are TQR Micro-Frames?](#what-are-tqr-micro-frames)
### 3. [The Five Qualia Types](#the-five-qualia-types)
### 4. [Implemented TQR Relations](#implemented-tqr-relations)

#### 4.1 [AGENTIVE Relations](#41-agentive-relations) (15 relations)
- [agentivally_causes](#agentivally_causes)
- [agentivally_uses](#agentivally_uses)
- [agentive_cause](#agentive_cause)
- [agentive_experince](#agentive_experince)
- [agentive_progressive](#agentive_progressive)
- [caused_agentively](#caused_agentively)
- [caused_agentively_by](#caused_agentively_by)
- [caused_by](#caused_by)
- [causes](#causes)
- [causes_reaction](#causes_reaction)
- [created_by](#created_by)
- [derived_from](#derived_from)
- [has_as_source](#has_as_source)
- [is_given_by](#is_given_by)
- [resulting_from](#resulting_from)

#### 4.2 [CONSTITUTIVE Relations](#42-constitutive-relations) (24 relations)
- [causes_naturally](#causes_naturally)
- [concerns](#concerns)
- [constitutively_affects](#constitutively_affects)
- [constitutively_uses](#constitutively_uses)
- [contains](#contains)
- [feeling](#feeling)
- [has_as_building_part](#has_as_building_part)
- [has_as_colour](#has_as_colour)
- [has_as_constitutive_attribute](#has_as_constitutive_attribute)
- [has_as_effect](#has_as_effect)
- [has_as_instrument](#has_as_instrument)
- [has_as_member](#has_as_member)
- [has_as_part](#has_as_part)
- [has_as_quality](#has_as_quality)
- [includes](#includes)
- [is_a_follower_of](#is_a_follower_of)
- [is_constitutive_activity_of](#is_constitutive_activity_of)
- [is_made_of](#is_made_of)
- [is_the_workplace_of](#is_the_workplace_of)
- [kinship](#kinship)
- [precedes](#precedes)
- [produces_naturally](#produces_naturally)
- [resulting_state](#resulting_state)
- [typical_of](#typical_of)

#### 4.3 [CONTEXT Relations](#43-context-relations) (11 relations) **NEW**
- [has_as_a_resident](#has_as_a_resident)
- [has_as_typical_location](#has_as_typical_location)
- [has_origin](#has_origin)
- [idiosincrasy_of](#idiosincrasy_of)
- [is_regulated_by](#is_regulated_by)
- [lives_in](#lives_in)
- [measured_by](#measured_by)
- [measures](#measures)
- [quantifies](#quantifies)
- [related_to](#related_to)
- [resolved_by](#resolved_by)

#### 4.4 [FORMAL Relations](#44-formal-relations) (2 relations)
- [instance_of](#instance_of)
- [type_of](#type_of)

#### 4.5 [TELIC Relations](#45-telic-relations) (13 relations)
- [indirect_telic](#indirect_telic)
- [is_the_ability_of](#is_the_ability_of)
- [is_the_activity_of](#is_the_activity_of)
- [is_the_activity_performed_in](#is_the_activity_performed_in)
- [is_the_habit_of](#is_the_habit_of)
- [is_the_purpose_of](#is_the_purpose_of)
- [object_of_the_activity](#object_of_the_activity)
- [used_against](#used_against)
- [used_as](#used_as)
- [used_by](#used_by)
- [used_for](#used_for)
- [vice_of](#vice_of)

### 5. [SIMPLE Relations Under Investigation](#5-simple-relations-under-investigation) (26 relations)

#### 5.1 [AGENTIVE from SIMPLE](#51-agentive-from-simple) (6 relations)
#### 5.2 [CONSTITUTIVE from SIMPLE](#52-constitutive-from-simple) (17 relations)
#### 5.3 [TELIC from SIMPLE](#53-telic-from-simple) (3 relations)

### 6. [Summary Statistics](#6-summary-statistics)
### 7. [References](#7-references)

---

## Overview

**TQR (Ternary Qualia Relations)** is a novel formal framework designed to integrate ontological and lexical perspectives within the FrameNet structure. This document describes the **micro-frame** implementation of TQR relations in FrameNet Brasil.

### Key Innovation: CONTEXT Qualia

**Version 3.0 introduces a fifth qualia type**: **CONTEXT**

This extends the traditional Generative Lexicon Theory's four qualia (Formal, Constitutive, Telic, Agentive) to accommodate relational nuances that do not fit directly into the classical four but are essential for contextual and situational aspects.

---

## What are TQR Micro-Frames?

**Micro-frames** are **binary relation frames** that define connections between Frame Elements. They preserve all the semantic richness of TQR while providing a unified, frame-native architecture.

### Key Properties:
- Exactly **2 Frame Elements** (binary relations)
- `is_micro_frame = TRUE`
- `arity = 2`
- Each micro-frame represents the background frame from TQR
- Qualia type determines the semantic category

### The TQR Principle:
All relations are **frame-mediated**. Unlike standard ontology modeling where relations are binary properties (domain-range), the TQR approach models each relation as a dedicated frame that mediates the relation between lexical units (LUs).

---

## The Five Qualia Types

### 1. **FORMAL** (2 relations)
Defines **taxonomic and classificatory** relations - what something IS.

**Focus**: Identity, categorization, type-instance hierarchy

**Examples**: instance_of, type_of

---

### 2. **CONSTITUTIVE** (24 relations)
Defines **composition, containment, and inherent properties** - what something HAS or is MADE OF.

**Focus**: Parts, members, materials, attributes, natural properties

**Examples**: has_as_part, contains, is_made_of, kinship, has_as_member

---

### 3. **AGENTIVE** (15 relations)
Defines **origin, creation, and causation** - how something CAME TO BE.

**Focus**: Agents, causes, creation, derivation, sources

**Examples**: created_by, caused_by, derived_from, resulting_from

---

### 4. **TELIC** (13 relations)
Defines **purpose, function, and goal** - what something is FOR.

**Focus**: Functions, abilities, activities, purposes, uses

**Examples**: is_the_purpose_of, used_for, is_the_ability_of, indirect_telic

---

### 5. **CONTEXT** (11 relations) **NEW**
Defines **contextual, situational, and environmental** aspects - WHERE and HOW something exists.

**Focus**: Locations, measurements, regulations, resolutions, general relations

**Examples**: has_origin, measured_by, is_regulated_by, related_to, lives_in

**Rationale**: Many relations don't fit the classical four qualia but are essential for describing entities in context. CONTEXT captures spatial, regulatory, quantitative, and general associative relations.

---

## 4. Implemented TQR Relations

### 4.1 AGENTIVE Relations

These micro-frames define relations of **origin, creation, and causation**.

---

#### agentivally_causes

**Qualia Type**: Agentive
**Background Frame**: Act_intentionally
**Status**: ✅ Implemented

**Frame Elements**:
- **FE1**: Agent (intentional actor)
- **FE2**: Effect (caused result)

**Semantics**: Agent intentionally brings about Effect

**Examples**:
```
architect.n --agentivally_causes--> building.n
engineer.n --agentivally_causes--> solution.n
```

---

#### agentivally_uses

**Qualia Type**: Agentive
**Background Frame**: Using
**Status**: ✅ Implemented

**Frame Elements**:
- **FE1**: Agent (user)
- **FE2**: Instrument (tool/resource used)

**Semantics**: Agent employs Instrument in agentive action

**Examples**:
```
writer.n --agentivally_uses--> pen.n
programmer.n --agentivally_uses--> computer.n
```

---

#### agentive_cause

**Qualia Type**: Agentive
**Background Frame**: Causation
**Status**: ✅ Implemented

**Frame Elements**:
- **FE1**: Cause (causal entity/event)
- **FE2**: Effect (result)

**Semantics**: Cause produces Effect through agentive means

---

#### agentive_experince

**Qualia Type**: Agentive
**Background Frame**: Experience
**Status**: ✅ Implemented

**Frame Elements**:
- **FE1**: Experiential_state (emotional/cognitive state)
- **FE2**: Experienced_event (triggering event)

**Semantics**: Experiential_state arises from Experienced_event

**Examples**:
```
fear.n --agentive_experince--> threat.n
joy.n --agentive_experince--> success.n
```

**Note**: From SIMPLE "AgentiveExperience"

---

#### agentive_progressive

**Qualia Type**: Agentive
**Background Frame**: Progressive_state
**Status**: ✅ Implemented

**Frame Elements**:
- **FE1**: Property/Role (ongoing state)
- **FE2**: Ongoing_event (simultaneous activity)

**Semantics**: Property holds while Ongoing_event is in progress

**Examples**:
```
pedestrian.n --agentive_progressive--> walk.v
student.n --agentive_progressive--> study.v
```

**Note**: From SIMPLE "AgentiveProg"

---

#### caused_agentively

**Qualia Type**: Agentive
**Background Frame**: Causation
**Status**: ✅ Implemented

**Frame Elements**:
- **FE1**: Effect (result)
- **FE2**: Agent (intentional cause)

**Semantics**: Effect is brought about by Agent's intentional action

---

#### caused_agentively_by

**Qualia Type**: Agentive
**Background Frame**: Affect_intentionally / Act_intentionally
**Status**: ✅ Implemented

**Frame Elements**:
- **FE1**: Patient/Effect (affected entity)
- **FE2**: Agent (intentional actor)

**Semantics**: Patient is intentionally caused/affected by Agent

**Examples**:
```
patient.n --caused_agentively_by--> doctor.n
problem.n --caused_agentively_by--> mistake.n
```

---

#### caused_by

**Qualia Type**: Agentive
**Background Frame**: Causation
**Status**: ✅ Implemented

**Frame Elements**:
- **FE1**: Effect (result)
- **FE2**: Cause (cause - may be non-agentive)

**Semantics**: Effect is caused by Cause (general causation, not necessarily intentional)

**Examples**:
```
erosion.n --caused_by--> rain.n
fire.n --caused_by--> lightning.n
```

---

#### causes

**Qualia Type**: Agentive
**Background Frame**: Causation / Cause_health_condition
**Status**: ✅ Implemented

**Frame Elements**:
- **FE1**: Cause (causal entity)
- **FE2**: Effect (result/condition)

**Semantics**: Cause brings about Effect

**Examples**:
```
virus.n --causes--> disease.n
bacteria.n --causes--> infection.n
```

---

#### causes_reaction

**Qualia Type**: Agentive
**Background Frame**: Cause_initiate
**Status**: ✅ Implemented

**Frame Elements**:
- **FE1**: Cause (initiating stimulus)
- **FE2**: Reaction (reactive response)

**Semantics**: Cause initiates Reaction as a response

**Examples**:
```
stimulus.n --causes_reaction--> response.n
provocation.n --causes_reaction--> anger.n
```

---

#### created_by

**Qualia Type**: Agentive
**Background Frame**: Create_intentionally / Culinary_creation / Innovate
**Status**: ✅ Implemented

**Frame Elements**:
- **FE1**: Created_entity (artifact/product)
- **FE2**: Creator (maker/innovator)

**Semantics**: Created_entity is intentionally created by Creator

**Examples**:
```
painting.n --created_by--> artist.n
software.n --created_by--> programmer.n
pizza.n --created_by--> chef.n
theory.n --created_by--> scientist.n
```

---

#### derived_from

**Qualia Type**: Agentive
**Background Frame**: Derivation
**Status**: ✅ Implemented

**Frame Elements**:
- **FE1**: Derived_object (derived entity)
- **FE2**: Original_object (source entity)

**Semantics**: Derived_object is created from Original_object through transformation

**Examples**:
```
petrol.n --derived_from--> oil.n
flour.n --derived_from--> wheat.n
```

**Note**: From SIMPLE "DerivedFrom"

---

#### has_as_source

**Qualia Type**: Agentive
**Background Frame**: Source
**Status**: ✅ Implemented

**Frame Elements**:
- **FE1**: Derived_entity (derivative)
- **FE2**: Source_entity (origin)

**Semantics**: Derived_entity originates from Source_entity

**Examples**:
```
law.n --has_as_source--> society.n
tradition.n --has_as_source--> culture.n
```

**Note**: From SIMPLE "Source"

---

#### is_given_by

**Qualia Type**: Agentive
**Background Frame**: Giving
**Status**: ✅ Implemented

**Frame Elements**:
- **FE1**: Theme (thing given)
- **FE2**: Donor (giver)

**Semantics**: Theme is provided by Donor

---

#### resulting_from

**Qualia Type**: Agentive
**Background Frame**: Result
**Status**: ✅ Implemented

**Frame Elements**:
- **FE1**: Result_entity (outcome)
- **FE2**: Causing_event (source event)

**Semantics**: Result_entity is the result/by-product of Causing_event

**Examples**:
```
loss.n --resulting_from--> lose.v
success.n --resulting_from--> hard_work.n
```

**Note**: From SIMPLE "ResultOf"

---

### 4.2 CONSTITUTIVE Relations

These micro-frames define relations of **composition, containment, and inherent properties**.

---

#### causes_naturally

**Qualia Type**: Constitutive
**Background Frame**: Causation / Cause_health_condition
**Status**: ✅ Implemented

**Frame Elements**:
- **FE1**: Natural_cause (natural causer)
- **FE2**: Effect (affected entity/result)

**Semantics**: Natural_cause naturally brings about Effect

**Examples**:
```
sun.n --causes_naturally--> warmth.n
gravity.n --causes_naturally--> falling.n
```

---

#### concerns

**Qualia Type**: Constitutive
**Background Frame**: Topic
**Status**: ✅ Implemented

**Frame Elements**:
- **FE1**: Phenomenon (concerning topic)
- **FE2**: Concerned_entity (affected domain)

**Semantics**: Phenomenon is about or pertains to Concerned_entity

**Examples**:
```
hepatitis.n --concerns--> liver.n
economics.n --concerns--> money.n
```

**Note**: From SIMPLE "Concerns"

---

#### constitutively_affects

**Qualia Type**: Constitutive
**Background Frame**: Objective_influence
**Status**: ✅ Implemented

**Frame Elements**:
- **FE1**: Influencing_entity (affecting factor)
- **FE2**: Dependent_entity (affected entity)

**Semantics**: Influencing_entity objectively affects Dependent_entity as a constitutive property

**Examples**:
```
temperature.n --constitutively_affects--> comfort.n
humidity.n --constitutively_affects--> weather.n
```

---

#### constitutively_uses

**Qualia Type**: Constitutive
**Background Frame**: Use_resource
**Status**: ✅ Implemented

**Frame Elements**:
- **FE1**: User (resource consumer)
- **FE2**: Resource (consumed resource)

**Semantics**: User constitutively/inherently uses Resource

**Examples**:
```
writer.n --constitutively_uses--> language.n
musician.n --constitutively_uses--> instrument.n
```

---

#### contains

**Qualia Type**: Constitutive
**Background Frame**: Contain
**Status**: ✅ Implemented

**Frame Elements**:
- **FE1**: Container (containing entity)
- **FE2**: Content (contained substance/entity)

**Semantics**: Container holds/contains Content

**Examples**:
```
bottle.n --contains--> liquid.n
book.n --contains--> information.n
```

**Note**: Also from SIMPLE "Contains" (prototypical containment)

---

#### feeling

**Qualia Type**: Constitutive
**Background Frame**: Emotion
**Status**: ✅ Implemented

**Frame Elements**:
- **FE1**: Experiencer (person feeling)
- **FE2**: Emotion (felt state)

**Semantics**: Experiencer constitutively experiences Emotion

---

#### has_as_building_part

**Qualia Type**: Constitutive
**Background Frame**: Building_subparts
**Status**: ✅ Implemented

**Frame Elements**:
- **FE1**: Whole (building)
- **FE2**: Part (building component)

**Semantics**: Whole has Part as a building component

**Examples**:
```
building.n --has_as_building_part--> floor.n
house.n --has_as_building_part--> roof.n
```

---

#### has_as_colour

**Qualia Type**: Constitutive
**Background Frame**: Color
**Status**: ✅ Implemented

**Frame Elements**:
- **FE1**: Colored_entity (entity)
- **FE2**: Color (typical color)

**Semantics**: Colored_entity typically has Color

**Examples**:
```
apple.n --has_as_colour--> red.n
sky.n --has_as_colour--> blue.n
```

**Note**: From SIMPLE "HasAsColour"

---

#### has_as_constitutive_attribute

**Qualia Type**: Constitutive
**Background Frame**: Attributes
**Status**: ✅ Implemented

**Frame Elements**:
- **FE1**: Entity (possessing entity)
- **FE2**: Attribute (constitutive property)

**Semantics**: Entity has Attribute as an inherent constitutive attribute

**Examples**:
```
person.n --has_as_constitutive_attribute--> age.n
object.n --has_as_constitutive_attribute--> weight.n
```

---

#### has_as_effect

**Qualia Type**: Constitutive
**Background Frame**: Effect
**Status**: ✅ Implemented

**Frame Elements**:
- **FE1**: Cause (causal phenomenon)
- **FE2**: Side_effect (consequence)

**Semantics**: Cause has Side_effect as a typical consequence or side-effect

**Examples**:
```
storm.n --has_as_effect--> thunder.n
medication.n --has_as_effect--> drowsiness.n
```

**Note**: From SIMPLE "HasAsEffect"

---

#### has_as_instrument

**Qualia Type**: Constitutive
**Background Frame**: Instrument
**Status**: ✅ Implemented

**Frame Elements**:
- **FE1**: Event/Activity (action)
- **FE2**: Typical_instrument (prototypical tool)

**Semantics**: Event is typically performed using Typical_instrument

**Examples**:
```
skiing.n --has_as_instrument--> ski.n
writing.n --has_as_instrument--> pen.n
```

**Note**: From SIMPLE "Instrument"

---

#### has_as_member

**Qualia Type**: Constitutive
**Background Frame**: Association / Membership
**Status**: ✅ Implemented

**Frame Elements**:
- **FE1**: Group (collective)
- **FE2**: Member (typical member)

**Semantics**: Group has Member as a (prototypical) member

**Examples**:
```
team.n --has_as_member--> player.n
flock.n --has_as_member--> bird.n
```

**Note**: Also relates to SIMPLE "HasAsMember" (prototypical membership)

---

#### has_as_part

**Qualia Type**: Constitutive
**Background Frame**: Part_whole / Part_element / Part_inner_outer
**Status**: ✅ Implemented

**Frame Elements**:
- **FE1**: Whole (whole entity)
- **FE2**: Part (component part)

**Semantics**: Whole has Part as a component

**Examples**:
```
car.n --has_as_part--> engine.n
body.n --has_as_part--> arm.n
water.n --has_as_part--> hydrogen.n
airplane.n --has_as_part--> wing.n
```

**Note**: Also relates to SIMPLE "HasAsPart" (prototypical parts)

---

#### has_as_quality

**Qualia Type**: Constitutive
**Background Frame**: Quality
**Status**: ✅ Implemented

**Frame Elements**:
- **FE1**: Entity (possessing entity)
- **FE2**: Quality (inherent quality)

**Semantics**: Entity possesses Quality

**Examples**:
```
silk.n --has_as_quality--> smoothness.n
ice.n --has_as_quality--> coldness.n
```

---

#### includes

**Qualia Type**: Constitutive
**Background Frame**: Inclusion
**Status**: ✅ Implemented

**Frame Elements**:
- **FE1**: Whole (inclusive entity)
- **FE2**: Part (included component)

**Semantics**: Whole includes Part as a component

**Examples**:
```
meal.n --includes--> dessert.n
package.n --includes--> items.n
```

---

#### is_a_follower_of

**Qualia Type**: Constitutive
**Background Frame**: People_by_religion
**Status**: ✅ Implemented

**Frame Elements**:
- **FE1**: Person (adherent)
- **FE2**: Religion (belief system)

**Semantics**: Person is a follower/adherent of Religion

**Examples**:
```
catholic.n --is_a_follower_of--> catholicism.n
buddhist.n --is_a_follower_of--> buddhism.n
```

---

#### is_constitutive_activity_of

**Qualia Type**: Constitutive
**Background Frame**: Act_intentionally
**Status**: ✅ Implemented

**Frame Elements**:
- **FE1**: Activity (defining activity)
- **FE2**: Agent/Role (agent characterized by activity)

**Semantics**: Activity constitutes the defining activity of Agent

**Examples**:
```
teaching.n --is_constitutive_activity_of--> teacher.n
painting.n --is_constitutive_activity_of--> painter.n
```

---

#### is_made_of

**Qualia Type**: Constitutive
**Background Frame**: Ingredients / Material
**Status**: ✅ Implemented

**Frame Elements**:
- **FE1**: Product (whole/product)
- **FE2**: Material (ingredient/material)

**Semantics**: Product is made of/composed of Material

**Examples**:
```
bread.n --is_made_of--> flour.n
table.n --is_made_of--> wood.n
```

---

#### is_the_workplace_of

**Qualia Type**: Constitutive
**Background Frame**: Employ / Work
**Status**: ✅ Implemented

**Frame Elements**:
- **FE1**: Workplace (employment location)
- **FE2**: Employee (worker)

**Semantics**: Workplace is the place of employment for Employee

**Examples**:
```
company.n --is_the_workplace_of--> employee.n
hospital.n --is_the_workplace_of--> nurse.n
```

---

#### kinship

**Qualia Type**: Constitutive
**Background Frame**: Kinship
**Status**: ✅ Implemented

**Frame Elements**:
- **FE1**: Ego (reference person)
- **FE2**: Alter (related person)

**Semantics**: Ego and Alter are related by family/kinship ties

**Examples**:
```
father.n --kinship--> child.n
sister.n --kinship--> sibling.n
```

---

#### precedes

**Qualia Type**: Constitutive
**Background Frame**: Temporal_sequence
**Status**: ✅ Implemented

**Frame Elements**:
- **FE1**: Preceding_entity (earlier element)
- **FE2**: Following_entity (later element)

**Semantics**: Preceding_entity comes before Following_entity

**Examples**:
```
preparation.n --precedes--> execution.n
spring.n --precedes--> summer.n
```

---

#### produces_naturally

**Qualia Type**: Constitutive
**Background Frame**: Create / Natural_production
**Status**: ✅ Implemented

**Frame Elements**:
- **FE1**: Natural_producer (natural entity)
- **FE2**: Product (naturally produced entity)

**Semantics**: Natural_producer naturally produces Product

**Examples**:
```
tree.n --produces_naturally--> fruit.n
bee.n --produces_naturally--> honey.n
```

---

#### resulting_state

**Qualia Type**: Constitutive
**Background Frame**: State_change
**Status**: ✅ Implemented

**Frame Elements**:
- **FE1**: Transition (change/transition event)
- **FE2**: Result_state (outcome state)

**Semantics**: Transition leads to Result_state

**Examples**:
```
die.v --resulting_state--> dead.adj
freeze.v --resulting_state--> frozen.adj
```

**Note**: From SIMPLE "ResultingState"

---

#### typical_of

**Qualia Type**: Constitutive
**Background Frame**: Typicality
**Status**: ✅ Implemented

**Frame Elements**:
- **FE1**: Typical_phenomenon (characteristic thing)
- **FE2**: Typical_entity (characterized entity)

**Semantics**: Typical_phenomenon is characteristic of or typically affects Typical_entity

**Examples**:
```
measles.n --typical_of--> child.n
siesta.n --typical_of--> spanish_culture.n
```

**Note**: From SIMPLE "TypicalOf"

---

### 4.3 CONTEXT Relations **NEW**

These micro-frames define **contextual, situational, and environmental** aspects.

**Rationale**: The CONTEXT qualia type was introduced to handle relations that don't fit the classical four qualia (Formal, Constitutive, Agentive, Telic) but are essential for describing entities in their contexts - spatial, regulatory, quantitative, and general associative relations.

---

#### has_as_a_resident

**Qualia Type**: Context
**Background Frame**: Residence
**Status**: ✅ Implemented

**Frame Elements**:
- **FE1**: Place (location)
- **FE2**: Resident (inhabitant)

**Semantics**: Place has Resident living there

**Examples**:
```
city.n --has_as_a_resident--> citizen.n
country.n --has_as_a_resident--> resident.n
```

---

#### has_as_typical_location

**Qualia Type**: Context
**Background Frame**: Typical_location
**Status**: ✅ Implemented

**Frame Elements**:
- **FE1**: Located_entity (entity)
- **FE2**: Typical_location (prototypical place)

**Semantics**: Located_entity is typically found at Typical_location

**Examples**:
```
oasis.n --has_as_typical_location--> desert.n
penguin.n --has_as_typical_location--> antarctica.n
```

**Note**: From SIMPLE "TypicalLocation" (inverted direction)

---

#### has_origin

**Qualia Type**: Context
**Background Frame**: People_by_origin / Origin
**Status**: ✅ Implemented

**Frame Elements**:
- **FE1**: Person/Entity (entity with origin)
- **FE2**: Origin (place/source of origin)

**Semantics**: Person/Entity originates from Origin

**Examples**:
```
brazilian.n --has_origin--> brazil.n
champagne.n --has_origin--> france.n
```

---

#### idiosincrasy_of

**Qualia Type**: Context
**Background Frame**: Idiosyncrasy / Characteristic
**Status**: ✅ Implemented

**Frame Elements**:
- **FE1**: Characteristic (distinctive feature)
- **FE2**: Entity (characterized entity)

**Semantics**: Characteristic is a distinctive idiosyncrasy of Entity

**Examples**:
```
kilt.n --idiosincrasy_of--> scottish_person.n
sombrero.n --idiosincrasy_of--> mexican_culture.n
```

---

#### is_regulated_by

**Qualia Type**: Context
**Background Frame**: Regulation
**Status**: ✅ Implemented

**Frame Elements**:
- **FE1**: Regulated_entity (regulated activity/entity)
- **FE2**: Regulator (regulating authority/rule)

**Semantics**: Regulated_entity is governed or controlled by Regulator

**Examples**:
```
trade.n --is_regulated_by--> law.n
game.n --is_regulated_by--> rules.n
```

---

#### lives_in

**Qualia Type**: Context
**Background Frame**: Residence / Location
**Status**: ✅ Implemented

**Frame Elements**:
- **FE1**: Resident (inhabitant)
- **FE2**: Location (place of residence)

**Semantics**: Resident habitually lives in Location

**Examples**:
```
parisian.n --lives_in--> paris.n
nomad.n --lives_in--> desert.n
```

---

#### measured_by

**Qualia Type**: Context
**Background Frame**: Measurement
**Status**: ✅ Implemented

**Frame Elements**:
- **FE1**: Measured_property (measurable property)
- **FE2**: Unit_of_measure (measurement unit)

**Semantics**: Measured_property is quantified using Unit_of_measure

**Examples**:
```
temperature.n --measured_by--> degree.n
distance.n --measured_by--> meter.n
```

**Note**: From SIMPLE "MeasuredBy"

---

#### measures

**Qualia Type**: Context
**Background Frame**: Measurement
**Status**: ✅ Implemented

**Frame Elements**:
- **FE1**: Unit_of_measure (measuring unit)
- **FE2**: Measured_property (measured property)

**Semantics**: Unit_of_measure is used to measure Measured_property

---

#### quantifies

**Qualia Type**: Context
**Background Frame**: Quantification
**Status**: ✅ Implemented

**Frame Elements**:
- **FE1**: Quantifier (measuring container/quantifier)
- **FE2**: Quantified_substance (quantified substance)

**Semantics**: Quantifier expresses a quantity of Quantified_substance

**Examples**:
```
bottle.n --quantifies--> liquid.n
kilogram.n --quantifies--> mass.n
```

**Note**: From SIMPLE "Quantifies"

---

#### related_to

**Qualia Type**: Context
**Background Frame**: Relation / General_association
**Status**: ✅ Implemented

**Frame Elements**:
- **FE1**: Entity_1 (first entity)
- **FE2**: Entity_2 (second entity)

**Semantics**: Entity_1 is related to Entity_2 (general, underspecified relation)

**Examples**:
```
cause.n --related_to--> effect.n
topic.n --related_to--> discussion.n
```

---

#### resolved_by

**Qualia Type**: Context
**Background Frame**: Solve_problem / Resolution
**Status**: ✅ Implemented

**Frame Elements**:
- **FE1**: Problem (issue)
- **FE2**: Solver (problem-solver/solution)

**Semantics**: Problem is solved/resolved by Solver

**Examples**:
```
conflict.n --resolved_by--> negotiation.n
equation.n --resolved_by--> mathematician.n
```

---

### 4.4 FORMAL Relations

These micro-frames define **taxonomic and classificatory** relations.

---

#### instance_of

**Qualia Type**: Formal
**Background Frame**: Exemplar
**Status**: ✅ Implemented

**Frame Elements**:
- **FE1**: Instance (example/instance)
- **FE2**: Type (category/class)

**Semantics**: Instance is an instance/example of Type (extensional definition)

**Examples**:
```
japanese_restaurant.n --instance_of--> restaurant.n
rover.n --instance_of--> dog.n
```

---

#### type_of

**Qualia Type**: Formal
**Background Frame**: Type / Categorization
**Status**: ✅ Implemented

**Frame Elements**:
- **FE1**: Subtype (more specific type)
- **FE2**: Category (supertype/category)

**Semantics**: Subtype is a type/kind of Category (intensional definition)

**Examples**:
```
restaurant.n --type_of--> building.n
dog.n --type_of--> animal.n
```

---

### 4.5 TELIC Relations

These micro-frames define **purpose, function, and goal** relations.

---

#### indirect_telic

**Qualia Type**: Telic
**Background Frame**: Purpose / Function
**Status**: ✅ Implemented

**Frame Elements**:
- **FE1**: Entity_with_purpose (entity)
- **FE2**: Typical_purpose (prototypical purpose/function)

**Semantics**: Entity_with_purpose is typically involved in Typical_purpose (underspecified telic relation)

**Examples**:
```
eye.n --indirect_telic--> see.v
knife.n --indirect_telic--> cut.v
```

**Note**: From SIMPLE "IndirectTelic"

---

#### is_the_ability_of

**Qualia Type**: Telic
**Background Frame**: Action_capability / Ability
**Status**: ✅ Implemented

**Frame Elements**:
- **FE1**: Ability (capability/skill)
- **FE2**: Capable_entity (entity with ability)

**Semantics**: Ability is the capability of Capable_entity

**Examples**:
```
flying.n --is_the_ability_of--> bird.n
reasoning.n --is_the_ability_of--> human.n
```

---

#### is_the_activity_of

**Qualia Type**: Telic
**Background Frame**: Act_intentionally / Activity
**Status**: ✅ Implemented

**Frame Elements**:
- **FE1**: Activity (action/activity)
- **FE2**: Agent (actor/role)

**Semantics**: Activity is the characteristic activity/role of Agent

**Examples**:
```
teaching.n --is_the_activity_of--> teacher.n
healing.n --is_the_activity_of--> doctor.n
```

---

#### is_the_activity_performed_in

**Qualia Type**: Telic
**Background Frame**: Infrastructure / Location
**Status**: ✅ Implemented

**Frame Elements**:
- **FE1**: Activity (action performed)
- **FE2**: Infrastructure/Place (location)

**Semantics**: Activity is the typical activity performed in Infrastructure/Place

**Examples**:
```
driving.n --is_the_activity_performed_in--> road.n
swimming.n --is_the_activity_performed_in--> pool.n
```

---

#### is_the_habit_of

**Qualia Type**: Telic
**Background Frame**: Custom / Habit
**Status**: ✅ Implemented

**Frame Elements**:
- **FE1**: Behavior (habitual behavior)
- **FE2**: Protagonist (habitual actor)

**Semantics**: Behavior is the habit/custom of Protagonist

**Examples**:
```
meditation.n --is_the_habit_of--> monk.n
exercise.n --is_the_habit_of--> athlete.n
```

---

#### is_the_purpose_of

**Qualia Type**: Telic
**Background Frame**: Purpose / Tool_purpose
**Status**: ✅ Implemented

**Frame Elements**:
- **FE1**: Purpose/Function (intended function)
- **FE2**: Tool/Entity (artifact/entity)

**Semantics**: Purpose is the intended function of Tool

**Examples**:
```
cutting.n --is_the_purpose_of--> knife.n
transportation.n --is_the_purpose_of--> car.n
```

---

#### object_of_the_activity

**Qualia Type**: Telic
**Background Frame**: Create_intentionally / Activity
**Status**: ✅ Implemented

**Frame Elements**:
- **FE1**: Created_object (product/object)
- **FE2**: Creator/Activity (creator/creating activity)

**Semantics**: Created_object is the typical object/product of Creator's activity

**Examples**:
```
painting.n --object_of_the_activity--> painter.n
software.n --object_of_the_activity--> programming.n
```

---

#### used_against

**Qualia Type**: Telic
**Background Frame**: Using / Treatment
**Status**: ✅ Implemented

**Frame Elements**:
- **FE1**: Treatment (intervention/tool)
- **FE2**: Target_condition (condition/problem being addressed)

**Semantics**: Treatment is typically used to counteract/treat Target_condition

**Examples**:
```
chemotherapy.n --used_against--> cancer.n
antibiotic.n --used_against--> infection.n
```

**Note**: From SIMPLE "UsedAgainst"

---

#### used_as

**Qualia Type**: Telic
**Background Frame**: Use / Function
**Status**: ✅ Implemented

**Frame Elements**:
- **FE1**: Used_entity (entity)
- **FE2**: Function (typical function/role)

**Semantics**: Used_entity is typically used as or for Function

**Examples**:
```
wood.n --used_as--> material.n
water.n --used_as--> solvent.n
```

**Note**: From SIMPLE "UsedAs"

---

#### used_by

**Qualia Type**: Telic
**Background Frame**: Use_resource / Using
**Status**: ✅ Implemented

**Frame Elements**:
- **FE1**: Resource/Tool (used entity)
- **FE2**: User (user agent)

**Semantics**: Resource is used by User

**Examples**:
```
tool.n --used_by--> worker.n
computer.n --used_by--> programmer.n
```

---

#### used_for

**Qualia Type**: Telic
**Background Frame**: Use / Purpose
**Status**: ✅ Implemented

**Frame Elements**:
- **FE1**: User/Agent (user)
- **FE2**: Purpose (intended use/goal)

**Semantics**: User employs something for Purpose

**Examples**:
```
chef.n --used_for--> cooking.n
scientist.n --used_for--> research.n
```

---

#### vice_of

**Qualia Type**: Telic
**Background Frame**: Addiction / Vice
**Status**: ✅ Implemented

**Frame Elements**:
- **FE1**: Vice (addictive behavior)
- **FE2**: Addicted_person (person with vice)

**Semantics**: Vice is the addiction/vice of Addicted_person

**Examples**:
```
smoking.n --vice_of--> smoker.n
gambling.n --vice_of--> gambler.n
```

---

## 5. SIMPLE Relations Under Investigation

These relations from the SIMPLE ontology are currently under analysis for potential inclusion in FrameNet Brasil.

### 5.1 AGENTIVE from SIMPLE

**Status**: 🔄 Under Investigation

All have been integrated into the main AGENTIVE category (see 4.1):
- ✅ agentive_experince (was: AgentiveExperience)
- ✅ agentive_progressive (was: AgentiveProg)
- ✅ resulting_from (was: ResultOf)
- ✅ has_as_source (was: Source)
- ✅ derived_from (was: DerivedFrom)
- ⚠️ AffectedBy - *Still under analysis for distinction from caused_by*

---

### 5.2 CONSTITUTIVE from SIMPLE

**Status**: 🔄 Partially Integrated

**Integrated**:
- ✅ has_as_member (was: HasAsMember)
- ✅ has_as_part (was: HasAsPart)
- ✅ has_as_instrument (was: Instrument)
- ✅ resulting_state (was: ResultingState)
- ✅ concerns (was: Concerns)
- ✅ contains (was: Contains)
- ✅ has_as_colour (was: HasAsColour)
- ✅ has_as_effect (was: HasAsEffect)
- ✅ typical_of (was: TypicalOf)

**Under Investigation**:
- ⚠️ HasAsProperty - Analysis needed for mapping to has_as_quality or has_as_constitutive_attribute
- ⚠️ PropertyOf - Inverse of HasAsProperty
- ⚠️ SuccessorOf - Temporal/sequential relation, may fit CONSTITUTIVE or CONTEXT
- ⚠️ Regulates - *Moved to CONTEXT as is_regulated_by*
- ⚠️ Affects - Analysis needed vs constitutively_affects

**Moved to CONTEXT**:
- ✅ TypicalLocation → has_as_typical_location
- ✅ MeasuredBy → measured_by
- ✅ Quantifies → quantifies

---

### 5.3 TELIC from SIMPLE

**Status**: ✅ All Integrated

- ✅ indirect_telic (was: IndirectTelic)
- ✅ used_as (was: UsedAs)
- ✅ used_against (was: UsedAgainst)

---

## 6. Summary Statistics

### Implementation Status by Qualia Type

| Qualia Type | Implemented | Under Investigation | Total |
|-------------|-------------|---------------------|-------|
| **AGENTIVE** | 15 | 1 | 16 |
| **CONSTITUTIVE** | 24 | 4 | 28 |
| **CONTEXT** ⭐ | 11 | 1 | 12 |
| **FORMAL** | 2 | 0 | 2 |
| **TELIC** | 13 | 0 | 13 |
| **TOTAL** | **65** | **6** | **71** |

⭐ **NEW**: CONTEXT qualia type introduced in Version 3.0

---

### Relations by Source

| Source | Count | Status |
|--------|-------|--------|
| **Original TQR** | 46 | ✅ Implemented |
| **SIMPLE Integrated** | 19 | ✅ Implemented |
| **SIMPLE Under Investigation** | 6 | 🔄 Analysis |
| **NEW (Context)** | 11 | ✅ Implemented |
| **TOTAL** | **82** | Mixed |

---

### Distribution Comparison

**Before Context Qualia (Version 2.0)**:
- Agentive: 11 relations
- Constitutive: 23 relations
- Formal: 2 relations
- Telic: 10 relations
- **Total: 46 relations**

**After Context Qualia (Version 3.0)**:
- Agentive: 15 relations (+4)
- Constitutive: 24 relations (+1)
- **Context: 11 relations** ⭐ **(NEW)**
- Formal: 2 relations (unchanged)
- Telic: 13 relations (+3)
- **Total: 65 relations** (+19, +42%)

---

### Key Changes in Version 3.0

1. **NEW Qualia Type**: CONTEXT (11 relations)
   - Moved from Constitutive: has_origin, has_as_a_resident, idiosincrasy_of, related_to
   - Moved from SIMPLE: has_as_typical_location, measured_by, quantifies
   - New contextual relations: lives_in, is_regulated_by, measures, resolved_by

2. **SIMPLE Integration**: 19 SIMPLE relations now implemented
   - 5 in AGENTIVE
   - 9 in CONSTITUTIVE
   - 3 in CONTEXT
   - 3 in TELIC (includes indirect_telic)

3. **Reorganization**: Several relations reclassified for better semantic coherence

---

## 7. References

### Qualia Structure and Generative Lexicon

1. **Pustejovsky, J. (1995)**. *The Generative Lexicon*. MIT Press.
   - Original formulation of Qualia Structure (Formal, Constitutive, Telic, Agentive)

2. **Pustejovsky, J. (2006)**. "Type Theory and Lexical Decomposition". *Journal of Cognitive Science*, 7, 39-76.
   - Formal semantics for qualia roles

### SIMPLE Ontology

3. **Lenci, A., et al. (2000)**. "SIMPLE: A General Framework for the Development of Multilingual Lexicons". *International Journal of Lexicography*, 13(4), 249-263.
   - SIMPLE semantic relations and qualia-based modeling

4. **Busa, F., et al. (2001)**. "Building a Semantic Lexicon: Structuring and Generating Concepts". *Proceedings of Intelligent Text Processing and Computational Linguistics*.
   - Implementation of qualia structure in SIMPLE

### FrameNet and TQR

5. **Chishman, R., et al. (2018)**. "Ternary Qualia Relations in FrameNet: Challenges and Perspectives for Lexical-Ontological Integration". *Proceedings of LREC*.
   - Original TQR proposal for FrameNet Brasil

6. **Torrent, T. T., et al. (2014)**. "Multilingual Lexicographic Annotation for Domain-Specific Electronic Dictionaries". *Constructions and Frames*, 6(1), 73-94.
   - Multilingual frame-based annotation

7. **Salomão, M. M. M. (2009)**. "FrameNet Brasil: um trabalho em progresso". *Calidoscópio*, 7(3), 171-182.
   - FrameNet Brasil foundations

### Context Qualia (Extension)

8. **Present work (2025)**. "Extending Qualia Structure with CONTEXT: A Fifth Qualia Type for Contextual Relations". FrameNet Brasil Documentation.
   - Introduction and justification of CONTEXT qualia type

---

**END OF DOCUMENT**

**Version**: 3.0 (with CONTEXT Qualia)
**Total TQR Relations**: 65 Implemented + 6 Under Investigation = 71
**Status**: Complete and ready for implementation
**Date**: October 21, 2025

---

## Appendix: Quick Reference Tables

### A.1 All Implemented TQR Micro-Frames (65 relations)

#### A.1.1 AGENTIVE Relations (15)

| Micro-Frame Name | Semantics | FE1 | FE2 |
|------------------|-----------|-----|-----|
| agentivally_causes | Agent intentionally brings about Effect | Agent | Effect |
| agentivally_uses | Agent employs Instrument in agentive action | Agent | Instrument |
| agentive_cause | Cause produces Effect through agentive means | Cause | Effect |
| agentive_experince | Experiential_state arises from Experienced_event | Experiential_state | Experienced_event |
| agentive_progressive | Property holds while Ongoing_event is in progress | Property/Role | Ongoing_event |
| caused_agentively | Effect is brought about by Agent's intentional action | Effect | Agent |
| caused_agentively_by | Patient is intentionally caused/affected by Agent | Patient/Effect | Agent |
| caused_by | Effect is caused by Cause (general causation) | Effect | Cause |
| causes | Cause brings about Effect | Cause | Effect |
| causes_reaction | Cause initiates Reaction as a response | Cause | Reaction |
| created_by | Created_entity is intentionally created by Creator | Created_entity | Creator |
| derived_from | Derived_object is created from Original_object through transformation | Derived_object | Original_object |
| has_as_source | Derived_entity originates from Source_entity | Derived_entity | Source_entity |
| is_given_by | Theme is provided by Donor | Theme | Donor |
| resulting_from | Result_entity is the result/by-product of Causing_event | Result_entity | Causing_event |

#### A.1.2 CONSTITUTIVE Relations (24)

| Micro-Frame Name | Semantics | FE1 | FE2 |
|------------------|-----------|-----|-----|
| causes_naturally | Natural_cause naturally brings about Effect | Natural_cause | Effect |
| concerns | Phenomenon is about or pertains to Concerned_entity | Phenomenon | Concerned_entity |
| constitutively_affects | Influencing_entity objectively affects Dependent_entity | Influencing_entity | Dependent_entity |
| constitutively_uses | User constitutively/inherently uses Resource | User | Resource |
| contains | Container holds/contains Content | Container | Content |
| feeling | Experiencer constitutively experiences Emotion | Experiencer | Emotion |
| has_as_building_part | Whole has Part as a building component | Whole | Part |
| has_as_colour | Colored_entity typically has Color | Colored_entity | Color |
| has_as_constitutive_attribute | Entity has Attribute as an inherent constitutive attribute | Entity | Attribute |
| has_as_effect | Cause has Side_effect as a typical consequence | Cause | Side_effect |
| has_as_instrument | Event is typically performed using Typical_instrument | Event/Activity | Typical_instrument |
| has_as_member | Group has Member as a (prototypical) member | Group | Member |
| has_as_part | Whole has Part as a component | Whole | Part |
| has_as_quality | Entity possesses Quality | Entity | Quality |
| includes | Whole includes Part as a component | Whole | Part |
| is_a_follower_of | Person is a follower/adherent of Religion | Person | Religion |
| is_constitutive_activity_of | Activity constitutes the defining activity of Agent | Activity | Agent/Role |
| is_made_of | Product is made of/composed of Material | Product | Material |
| is_the_workplace_of | Workplace is the place of employment for Employee | Workplace | Employee |
| kinship | Ego and Alter are related by family/kinship ties | Ego | Alter |
| precedes | Preceding_entity comes before Following_entity | Preceding_entity | Following_entity |
| produces_naturally | Natural_producer naturally produces Product | Natural_producer | Product |
| resulting_state | Transition leads to Result_state | Transition | Result_state |
| typical_of | Typical_phenomenon is characteristic of Typical_entity | Typical_phenomenon | Typical_entity |

#### A.1.3 CONTEXT Relations (11) ⭐ NEW

| Micro-Frame Name | Semantics | FE1 | FE2 |
|------------------|-----------|-----|-----|
| has_as_a_resident | Place has Resident living there | Place | Resident |
| has_as_typical_location | Located_entity is typically found at Typical_location | Located_entity | Typical_location |
| has_origin | Person/Entity originates from Origin | Person/Entity | Origin |
| idiosincrasy_of | Characteristic is a distinctive idiosyncrasy of Entity | Characteristic | Entity |
| is_regulated_by | Regulated_entity is governed by Regulator | Regulated_entity | Regulator |
| lives_in | Resident habitually lives in Location | Resident | Location |
| measured_by | Measured_property is quantified using Unit_of_measure | Measured_property | Unit_of_measure |
| measures | Unit_of_measure is used to measure Measured_property | Unit_of_measure | Measured_property |
| quantifies | Quantifier expresses a quantity of Quantified_substance | Quantifier | Quantified_substance |
| related_to | Entity_1 is related to Entity_2 (general relation) | Entity_1 | Entity_2 |
| resolved_by | Problem is solved/resolved by Solver | Problem | Solver |

#### A.1.4 FORMAL Relations (2)

| Micro-Frame Name | Semantics | FE1 | FE2 |
|------------------|-----------|-----|-----|
| instance_of | Instance is an instance/example of Type | Instance | Type |
| type_of | Subtype is a type/kind of Category | Subtype | Category |

#### A.1.5 TELIC Relations (13)

| Micro-Frame Name | Semantics | FE1 | FE2 |
|------------------|-----------|-----|-----|
| indirect_telic | Entity_with_purpose is typically involved in Typical_purpose | Entity_with_purpose | Typical_purpose |
| is_the_ability_of | Ability is the capability of Capable_entity | Ability | Capable_entity |
| is_the_activity_of | Activity is the characteristic activity/role of Agent | Activity | Agent |
| is_the_activity_performed_in | Activity is typically performed in Infrastructure/Place | Activity | Infrastructure/Place |
| is_the_habit_of | Behavior is the habit/custom of Protagonist | Behavior | Protagonist |
| is_the_purpose_of | Purpose is the intended function of Tool | Purpose/Function | Tool/Entity |
| object_of_the_activity | Created_object is the typical product of Creator's activity | Created_object | Creator/Activity |
| used_against | Treatment is typically used to counteract Target_condition | Treatment | Target_condition |
| used_as | Used_entity is typically used as or for Function | Used_entity | Function |
| used_by | Resource is used by User | Resource/Tool | User |
| used_for | User employs something for Purpose | User/Agent | Purpose |
| vice_of | Vice is the addiction/vice of Addicted_person | Vice | Addicted_person |

---

### A.2 SIMPLE Relations Under Investigation (6 relations)

| Micro-Frame Name | Qualia Type | Semantics | FE1 | FE2 | Status |
|------------------|-------------|-----------|-----|-----|--------|
| AffectedBy | Agentive | Affected_entity undergoes change due to Affecting_event | Affected_entity | Affecting_event | 🔄 Analysis |
| HasAsProperty | Constitutive | Abstract_property corresponds to Adjectival_property | Abstract_property | Adjectival_property | 🔄 Analysis |
| PropertyOf | Constitutive | Adjectival_property corresponds to Abstract_property (inverse) | Adjectival_property | Abstract_property | 🔄 Analysis |
| SuccessorOf | Constitutive | Successor follows Predecessor in ordered sequence | Successor | Predecessor | 🔄 Analysis |
| Regulates | Constitutive | Regulating_entity governs Regulated_entity | Regulating_entity | Regulated_entity | 🔄 Analysis |
| Affects | Constitutive | Affecting_phenomenon typically affects Affected_entity | Affecting_phenomenon | Affected_entity | 🔄 Analysis |

---

### A.3 Summary by Qualia Type

| Qualia Type | Implemented | Under Investigation | Total | Percentage |
|-------------|-------------|---------------------|-------|------------|
| AGENTIVE | 15 | 1 | 16 | 22.5% |
| CONSTITUTIVE | 24 | 4 | 28 | 39.4% |
| CONTEXT ⭐ | 11 | 1 | 12 | 16.9% |
| FORMAL | 2 | 0 | 2 | 2.8% |
| TELIC | 13 | 0 | 13 | 18.3% |
| **TOTAL** | **65** | **6** | **71** | **100%** |

---

**END OF APPENDIX**
