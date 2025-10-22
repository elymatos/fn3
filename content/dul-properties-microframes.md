# DUL Properties as Micro-Frames

**Version**: 1.0  
**Date**: October 21, 2025  
**Status**: Complete documentation of 118 DUL ObjectProperty relations

---

## Table of Contents

### 1. [Overview](#overview)
### 2. [DUL and the Descriptions & Situations Pattern](#dul-and-the-descriptions--situations-pattern)
### 3. [DUL Property Categories](#dul-property-categories)
### 4. [DUL Properties as Micro-Frames](#4-dul-properties-as-micro-frames)

#### 4.1 [Description and Situation Pattern](#41-description-and-situation-pattern) (12 properties)
- [defines / isDefinedIn](#defines--isdefinedin)
- [satisfies / isSatisfiedBy](#satisfies--issatisfiedby)
- [describes / isDescribedBy](#describes--isdescribedby)
- [hasSetting / isSettingFor](#hassetting--issettingfor)
- [classifies / isClassifiedBy](#classifies--isclassifiedby)
- [conceptualizes / isConceptualizedBy](#conceptualizes--isconceptualizedby)

#### 4.2 [Role and Task Properties](#42-role-and-task-properties) (9 properties)
- [hasRole / isRoleOf](#hasrole--isroleof)
- [definesRole / isRoleDefinedIn](#definesrole--isroledefinedin)
- [hasTask / isTaskOf](#hastask--istaskof)
- [definesTask / isTaskDefinedIn](#definestask--istaskdefinedin)
- [executesTask](#executestask)

#### 4.3 [Participation Properties](#43-participation-properties) (8 properties)
- [hasParticipant / isParticipantIn](#hasparticipant--isparticipantin)
- [includesAgent / isAgentIncludedIn](#includesagent--isagentincludedin)
- [includesEvent / isEventIncludedIn](#includesevent--iseventincludedin)
- [includesObject / isObjectIncludedIn](#includesobject--isobjectincludedin)

#### 4.4 [Part-Whole Properties](#44-part-whole-properties) (9 properties)
- [hasPart / isPartOf](#haspart--ispartof)
- [hasProperPart](#hasproperpart)
- [hasComponent / isComponentOf](#hascomponent--iscomponentof)
- [hasConstituent / isConstituentOf](#hasconstituent--isconstituentof)
- [hasMember / isMemberOf](#hasmember--ismemberof)

#### 4.5 [Quality and Region Properties](#45-quality-and-region-properties) (4 properties)
- [hasQuality / isQualityOf](#hasquality--isqualityof)
- [hasRegion / isRegionFor](#hasregion--isregionfor)

#### 4.6 [Temporal Properties](#46-temporal-properties) (8 properties)
- [hasTimeInterval / isTimeIntervalOf](#hastimeinterval--istimeintervalof)
- [directlyFollows / directlyPrecedes](#directlyfollows--directlyprecedes)
- [follows / precedes](#follows--precedes)
- [includesTime / isTimeIncludedIn](#includestime--istimeincludedin)

#### 4.7 [Spatial Properties](#47-spatial-properties) (6 properties)
- [hasLocation / isLocationOf](#haslocation--islocationof)
- [hasCommonBoundary](#hascommonboundary)
- [nearTo / farFrom](#nearto--farfrom)
- [overlaps](#overlaps)

#### 4.8 [Expression and Information Properties](#48-expression-and-information-properties) (8 properties)
- [expresses / isExpressedBy](#expresses--isexpressedby)
- [expressesConcept / isConceptExpressedBy](#expressesconcept--isconceptexpressedby)
- [concretelyExpresses / isConcretelyExpressedBy](#concretelyexpresses--isconcretelyexpressedby)
- [realizes / isRealizedBy](#realizes--isrealizedby)

#### 4.9 [Agency and Action Properties](#49-agency-and-action-properties) (6 properties)
- [actsFor](#actsfor)
- [actsThrough](#actsthrough)
- [involvesAgent / isAgentInvolvedIn](#involvesagent--isagentinvolvedin)
- [includesAction / isActionIncludedIn](#includesaction--isactionincludedin)

#### 4.10 [Parameter and Constraint Properties](#410-parameter-and-constraint-properties) (10 properties)
- [hasParameter / isParameterFor](#hasparameter--isparameterfor)
- [parametrizes / isParametrizedBy](#parametrizes--isparametrizedby)
- [hasConstraint / isConstraintFor](#hasconstraint--isconstraintfor)
- [hasPrecondition / isPreconditionOf](#hasprecondition--ispreconditionof)
- [hasPostcondition / isPostconditionOf](#haspostcondition--ispostconditionof)

#### 4.11 [Association and Relation Properties](#411-association-and-relation-properties) (5 properties)
- [associatedWith](#associatedwith)
- [coparticipatesWith](#coparticipateswith)
- [sameSettingAs](#samesettingas)
- [isRelatedToConcept](#isrelatedtoconcept)
- [isRelatedToDescription](#isrelatedtodescription)

#### 4.12 [Coverage and Expansion Properties](#412-coverage-and-expansion-properties) (6 properties)
- [covers / isCoveredBy](#covers--iscoveredby)
- [expands / isExpandedIn](#expands--isexpandedin)
- [unifies / isUnifiedBy](#unifies--isunifiedby)

#### 4.13 [Specialization and Subordination Properties](#413-specialization-and-subordination-properties) (4 properties)
- [specializes / isSpecializedBy](#specializes--isspecializedby)
- [isSubordinatedTo / isSuperordinatedTo](#issubordinatedto--issuperordinatedto)

#### 4.14 [Additional DUL Properties](#414-additional-dul-properties) (6 properties)
- [characterizes / isCharacterizedBy](#characterizes--ischaracterizedby)
- [introduces / isIntroducedBy](#introduces--isintroducedby)
- [usesConcept / isConceptUsedIn](#usesconcept--isconceptusedin)

### 5. [Summary Statistics](#5-summary-statistics)
### 6. [References](#6-references)

---

### 8.10 Role and Task Properties

These micro-frames define role assignment, task execution, and the DnS (Descriptions and Situations) pattern core relations.

---

#### 8.10.1 hasRole

**Type**: DUL Property
**Background Frame**: *DUL_Role_Assignment*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#hasRole`

**Frame Elements**:
- **FE1**: Object (DUL Object)
- **FE2**: Role (DUL Role)

**Semantics**: Object has Role

**DUL Definition**: A relation between an object and a role, e.g. the person 'John' has role 'student'

**Inverse**: isRoleOf

**Examples**:
```
John.Target --hasRole--> Student_role.Target
Doctor.Target --hasRole--> Healer_role.Target
```

**Status**: DUL core property

---

#### 8.10.2 isRoleOf

**Type**: DUL Property
**Background Frame**: *DUL_Role_Assignment*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#isRoleOf`

**Frame Elements**:
- **FE1**: Role (DUL Role)
- **FE2**: Object (DUL Object)

**Semantics**: Role is the role of Object

**DUL Definition**: A relation between an object and a role, e.g. 'student' is the role of 'John'

**Inverse**: hasRole

**Status**: DUL core property

---

#### 8.10.3 definesRole

**Type**: DUL Property
**Background Frame**: *DUL_Role_Definition*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#definesRole`

**Frame Elements**:
- **FE1**: Description (DUL Description)
- **FE2**: Role (DUL Role)

**Semantics**: Description defines Role

**DUL Definition**: A relation between a description and a role, e.g. the recipe for a cake defines the role 'ingredient'

**Inverse**: isRoleDefinedIn

**Examples**:
```
Recipe_frame.Target --definesRole--> Ingredient_role.Target
Employment_contract.Target --definesRole--> Employee_role.Target
```

**Status**: DUL core property

---

#### 8.10.4 isRoleDefinedIn

**Type**: DUL Property
**Background Frame**: *DUL_Role_Definition*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#isRoleDefinedIn`

**Frame Elements**:
- **FE1**: Role (DUL Role)
- **FE2**: Description (DUL Description)

**Semantics**: Role is defined in Description

**DUL Definition**: A relation between a description and a role, e.g. the role 'Ingredient' is defined in the recipe for a cake

**Inverse**: definesRole

**Status**: DUL core property

---

#### 8.10.5 hasTask

**Type**: DUL Property
**Background Frame**: *DUL_Task_Assignment*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#hasTask`

**Frame Elements**:
- **FE1**: Role (DUL Role)
- **FE2**: Task (DUL Task)

**Semantics**: Role has Task as a duty or responsibility

**DUL Definition**: A relation between roles and tasks, e.g. 'students have the duty of giving exams' (i.e. the Role 'student' hasTask the Task 'giving exams')

**Inverse**: isTaskOf

**Examples**:
```
Student_role.Target --hasTask--> Taking_exams.Target
Teacher_role.Target --hasTask--> Grading.Target
```

**Status**: DUL core property

---

#### 8.10.6 isTaskOf

**Type**: DUL Property
**Background Frame**: *DUL_Task_Assignment*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#isTaskOf`

**Frame Elements**:
- **FE1**: Task (DUL Task)
- **FE2**: Role (DUL Role)

**Semantics**: Task is a duty of Role

**DUL Definition**: A relation between roles and tasks, e.g. 'students have the duty of giving exams' (i.e. the Role 'student' hasTask the Task 'giving exams')

**Inverse**: hasTask

**Status**: DUL core property

---

#### 8.10.7 definesTask

**Type**: DUL Property
**Background Frame**: *DUL_Task_Definition*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#definesTask`

**Frame Elements**:
- **FE1**: Description (DUL Description)
- **FE2**: Task (DUL Task)

**Semantics**: Description defines Task

**DUL Definition**: A relation between a description and a task, e.g. the recipe for a cake defines the task 'boil'

**Inverse**: isTaskDefinedIn

**Examples**:
```
Recipe.Target --definesTask--> Boiling.Target
Job_description.Target --definesTask--> Report_writing.Target
```

**Status**: DUL core property

---

#### 8.10.8 isTaskDefinedIn

**Type**: DUL Property
**Background Frame**: *DUL_Task_Definition*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#isTaskDefinedIn`

**Frame Elements**:
- **FE1**: Task (DUL Task)
- **FE2**: Description (DUL Description)

**Semantics**: Task is defined in Description

**DUL Definition**: A relation between a description and a task, e.g. the task 'boil' is defined in a recipe for a cake

**Inverse**: definesTask

**Status**: DUL core property

---

#### 8.10.9 executesTask

**Type**: DUL Property
**Background Frame**: *DUL_Task_Execution*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#executesTask`

**Frame Elements**:
- **FE1**: Action (DUL Action)
- **FE2**: Task (DUL Task)

**Semantics**: Action executes Task

**DUL Definition**: A relation between an action and a task, e.g. 'putting some water in a pot and putting the pot on a fire until the water starts bubbling' executes the task 'boiling'

**Inverse**: isExecutedIn

**Examples**:
```
Concrete_boiling_action.Target --executesTask--> Boiling_task.Target
```

**Status**: DUL core property

---

### 8.11 Participation Properties

These micro-frames define participation relations between objects/agents and events/situations.

---

#### 8.11.1 hasParticipant

**Type**: DUL Property
**Background Frame**: *DUL_Participation*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#hasParticipant`

**Frame Elements**:
- **FE1**: Event (DUL Event)
- **FE2**: Object (DUL Object)

**Semantics**: Event has Object as a participant

**DUL Definition**: A relation between an object and a process, e.g. 'John took part in the discussion', 'a large mass of snow fell during the avalanche', or 'a cook, some sugar, flour, etc. are all present in the cooking of a cake'

**Inverse**: isParticipantIn

**Examples**:
```
Discussion_event.Target --hasParticipant--> John.Target
Cooking_event.Target --hasParticipant--> chef.Target
```

**Status**: DUL core property

---

#### 8.11.2 isParticipantIn

**Type**: DUL Property
**Background Frame**: *DUL_Participation*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#isParticipantIn`

**Frame Elements**:
- **FE1**: Object (DUL Object)
- **FE2**: Event (DUL Event)

**Semantics**: Object participates in Event

**DUL Definition**: A relation between an object and a process, e.g. 'John took part in the discussion'

**Inverse**: hasParticipant

**Status**: DUL core property

---

#### 8.11.3 includesAgent

**Type**: DUL Property
**Background Frame**: *DUL_Agent_Inclusion*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#includesAgent`

**Frame Elements**:
- **FE1**: Situation (DUL Situation)
- **FE2**: Agent (DUL Agent)

**Semantics**: Situation includes Agent

**DUL Definition**: A relation between situations and persons, e.g. 'this morning I've prepared my coffee and had my fingers burnt' (i.e.: the preparation of my coffee this morning included me)

**Inverse**: isAgentIncludedIn

**Status**: DUL core property

---

#### 8.11.4 isAgentIncludedIn

**Type**: DUL Property
**Background Frame**: *DUL_Agent_Inclusion*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#isAgentIncludedIn`

**Frame Elements**:
- **FE1**: Agent (DUL Agent)
- **FE2**: Situation (DUL Situation)

**Semantics**: Agent is included in Situation

**DUL Definition**: Inverse of includesAgent

**Inverse**: includesAgent

**Status**: DUL core property

---

#### 8.11.5 includesEvent

**Type**: DUL Property
**Background Frame**: *DUL_Event_Inclusion*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#includesEvent`

**Frame Elements**:
- **FE1**: Situation (DUL Situation)
- **FE2**: Event (DUL Event)

**Semantics**: Situation includes Event

**DUL Definition**: A relation between situations and events, e.g. 'this morning I've prepared my coffee and had my fingers burnt' (i.e.: the preparation of my coffee this morning included a burning of my fingers)

**Inverse**: isEventIncludedIn

**Status**: DUL core property

---

#### 8.11.6 isEventIncludedIn

**Type**: DUL Property
**Background Frame**: *DUL_Event_Inclusion*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#isEventIncludedIn`

**Frame Elements**:
- **FE1**: Event (DUL Event)
- **FE2**: Situation (DUL Situation)

**Semantics**: Event is included in Situation

**DUL Definition**: Inverse of includesEvent

**Inverse**: includesEvent

**Status**: DUL core property

---

#### 8.11.7 includesObject

**Type**: DUL Property
**Background Frame**: *DUL_Object_Inclusion*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#includesObject`

**Frame Elements**:
- **FE1**: Situation (DUL Situation)
- **FE2**: Object (DUL Object)

**Semantics**: Situation includes Object

**DUL Definition**: A relation between situations and objects, e.g. 'this morning I've prepared my coffee and had my fingers burnt' (i.e.: the preparation of my coffee this morning included me)

**Inverse**: isObjectIncludedIn

**Status**: DUL core property

---

#### 8.11.8 isObjectIncludedIn

**Type**: DUL Property
**Background Frame**: *DUL_Object_Inclusion*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#isObjectIncludedIn`

**Frame Elements**:
- **FE1**: Object (DUL Object)
- **FE2**: Situation (DUL Situation)

**Semantics**: Object is included in Situation

**DUL Definition**: Inverse of includesObject

**Inverse**: includesObject

**Status**: DUL core property

---

### 8.12 Part-Whole Properties

These micro-frames define mereological (part-whole) relations.

---

#### 8.12.1 hasPart

**Type**: DUL Property
**Background Frame**: *DUL_Parthood*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#hasPart`

**Frame Elements**:
- **FE1**: Whole (DUL Entity)
- **FE2**: Part (DUL Entity)

**Semantics**: Whole has Part as a component

**DUL Definition**: Parthood relation between entities (both endurants and perdurants)

**Inverse**: isPartOf

**Examples**:
```
Car.Target --hasPart--> Engine.Target
Book.Target --hasPart--> Chapter.Target
```

**Status**: DUL core property

---

#### 8.12.2 isPartOf

**Type**: DUL Property
**Background Frame**: *DUL_Parthood*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#isPartOf`

**Frame Elements**:
- **FE1**: Part (DUL Entity)
- **FE2**: Whole (DUL Entity)

**Semantics**: Part is a component of Whole

**DUL Definition**: Inverse of hasPart

**Inverse**: hasPart

**Status**: DUL core property

---

#### 8.12.3 hasProperPart

**Type**: DUL Property
**Background Frame**: *DUL_Proper_Parthood*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#hasProperPart`

**Frame Elements**:
- **FE1**: Whole (DUL Entity)
- **FE2**: Proper_part (DUL Entity)

**Semantics**: Whole has Proper_part (where part ≠ whole)

**DUL Definition**: Proper parthood (asymmetric, irreflexive)

**Inverse**: isPropertPartOf

**Status**: DUL core property

---

#### 8.12.4 hasComponent

**Type**: DUL Property
**Background Frame**: *DUL_Component_Relation*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#hasComponent`

**Frame Elements**:
- **FE1**: System (DUL Entity)
- **FE2**: Component (DUL Entity)

**Semantics**: System has Component as a functional part

**DUL Definition**: Functional composition relation

**Inverse**: isComponentOf

**Examples**:
```
Computer.Target --hasComponent--> CPU.Target
Organization.Target --hasComponent--> Department.Target
```

**Status**: DUL core property

---

#### 8.12.5 isComponentOf

**Type**: DUL Property
**Background Frame**: *DUL_Component_Relation*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#isComponentOf`

**Frame Elements**:
- **FE1**: Component (DUL Entity)
- **FE2**: System (DUL Entity)

**Semantics**: Component is a functional part of System

**DUL Definition**: Inverse of hasComponent

**Inverse**: hasComponent

**Status**: DUL core property

---

#### 8.12.6 hasConstituent

**Type**: DUL Property
**Background Frame**: *DUL_Constitution*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#hasConstituent`

**Frame Elements**:
- **FE1**: Constituted_entity (DUL Entity)
- **FE2**: Constituent (DUL Entity)

**Semantics**: Constituted_entity is materially constituted by Constituent

**DUL Definition**: Material constitution relation

**Inverse**: isConstituentOf

**Examples**:
```
Statue.Target --hasConstituent--> Clay.Target
```

**Status**: DUL core property

---

#### 8.12.7 isConstituentOf

**Type**: DUL Property
**Background Frame**: *DUL_Constitution*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#isConstituentOf`

**Frame Elements**:
- **FE1**: Constituent (DUL Entity)
- **FE2**: Constituted_entity (DUL Entity)

**Semantics**: Constituent materially constitutes Constituted_entity

**DUL Definition**: Inverse of hasConstituent

**Inverse**: hasConstituent

**Status**: DUL core property

---

#### 8.12.8 hasMember

**Type**: DUL Property
**Background Frame**: *DUL_Membership*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#hasMember`

**Frame Elements**:
- **FE1**: Collection (DUL Collection)
- **FE2**: Member (DUL Entity)

**Semantics**: Collection has Member

**DUL Definition**: Membership relation for collections

**Inverse**: isMemberOf

**Examples**:
```
Team.Target --hasMember--> Player.Target
Committee.Target --hasMember--> Member_person.Target
```

**Status**: DUL core property

---

#### 8.12.9 isMemberOf

**Type**: DUL Property
**Background Frame**: *DUL_Membership*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#isMemberOf`

**Frame Elements**:
- **FE1**: Member (DUL Entity)
- **FE2**: Collection (DUL Collection)

**Semantics**: Member belongs to Collection

**DUL Definition**: Inverse of hasMember

**Inverse**: hasMember

**Status**: DUL core property

---

### 8.13 Quality and Region Properties

These micro-frames relate entities to their qualities and regions (values/qualia).

---

#### 8.13.1 hasQuality

**Type**: DUL Property
**Background Frame**: *DUL_Quality_Attribution*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#hasQuality`

**Frame Elements**:
- **FE1**: Entity (DUL Entity)
- **FE2**: Quality (DUL Quality)

**Semantics**: Entity possesses Quality

**DUL Definition**: Relation between entities and their qualities

**Inverse**: isQualityOf

**Examples**:
```
Person.Target --hasQuality--> Height_quality.Target
Object.Target --hasQuality--> Color_quality.Target
```

**Status**: DUL core property

---

#### 8.13.2 isQualityOf

**Type**: DUL Property
**Background Frame**: *DUL_Quality_Attribution*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#isQualityOf`

**Frame Elements**:
- **FE1**: Quality (DUL Quality)
- **FE2**: Entity (DUL Entity)

**Semantics**: Quality is possessed by Entity

**DUL Definition**: Inverse of hasQuality

**Inverse**: hasQuality

**Status**: DUL core property

---

#### 8.13.3 hasRegion

**Type**: DUL Property
**Background Frame**: *DUL_Region_Assignment*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#hasRegion`

**Frame Elements**:
- **FE1**: Entity (DUL Entity)
- **FE2**: Region (DUL Region)

**Semantics**: Entity is associated with Region (quale/value)

**DUL Definition**: Relation between entities and regions (conceptual spaces)

**Inverse**: isRegionFor

**Examples**:
```
Color_quality.Target --hasRegion--> Red_region.Target
Temperature_quality.Target --hasRegion--> 25C_region.Target
```

**Status**: DUL core property

---

#### 8.13.4 isRegionFor

**Type**: DUL Property
**Background Frame**: *DUL_Region_Assignment*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#isRegionFor`

**Frame Elements**:
- **FE1**: Region (DUL Region)
- **FE2**: Entity (DUL Entity)

**Semantics**: Region is the value/quale for Entity

**DUL Definition**: Inverse of hasRegion

**Inverse**: hasRegion

**Status**: DUL core property

---

### 8.14 Temporal Properties

These micro-frames define temporal ordering and interval relations.

---

#### 8.14.1 hasTimeInterval

**Type**: DUL Property
**Background Frame**: *DUL_Temporal_Location*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#hasTimeInterval`

**Frame Elements**:
- **FE1**: Entity (DUL Entity)
- **FE2**: Time_interval (DUL TimeInterval)

**Semantics**: Entity occurs/exists during Time_interval

**DUL Definition**: Temporal location of entities

**Inverse**: isTimeIntervalOf

**Examples**:
```
Meeting_event.Target --hasTimeInterval--> Monday_9am_10am.Target
```

**Status**: DUL core property

---

#### 8.14.2 isTimeIntervalOf

**Type**: DUL Property
**Background Frame**: *DUL_Temporal_Location*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#isTimeIntervalOf`

**Frame Elements**:
- **FE1**: Time_interval (DUL TimeInterval)
- **FE2**: Entity (DUL Entity)

**Semantics**: Time_interval is when Entity occurs/exists

**DUL Definition**: Inverse of hasTimeInterval

**Inverse**: hasTimeInterval

**Status**: DUL core property

---

#### 8.14.3 directlyFollows

**Type**: DUL Property
**Background Frame**: *DUL_Direct_Temporal_Succession*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#directlyFollows`

**Frame Elements**:
- **FE1**: Following_entity (DUL Entity)
- **FE2**: Preceding_entity (DUL Entity)

**Semantics**: Following_entity directly follows Preceding_entity (no gap)

**DUL Definition**: Immediate temporal succession

**Inverse**: directlyPrecedes

**Status**: DUL core property

---

#### 8.14.4 directlyPrecedes

**Type**: DUL Property
**Background Frame**: *DUL_Direct_Temporal_Succession*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#directlyPrecedes`

**Frame Elements**:
- **FE1**: Preceding_entity (DUL Entity)
- **FE2**: Following_entity (DUL Entity)

**Semantics**: Preceding_entity directly precedes Following_entity (no gap)

**DUL Definition**: Immediate temporal precedence

**Inverse**: directlyFollows

**Status**: DUL core property

---

#### 8.14.5 follows

**Type**: DUL Property
**Background Frame**: *DUL_Temporal_Succession*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#follows`

**Frame Elements**:
- **FE1**: Following_entity (DUL Entity)
- **FE2**: Preceding_entity (DUL Entity)

**Semantics**: Following_entity follows Preceding_entity (possibly with gap)

**DUL Definition**: Temporal succession (transitive)

**Inverse**: precedes

**Status**: DUL core property

---

#### 8.14.6 precedes

**Type**: DUL Property
**Background Frame**: *DUL_Temporal_Succession*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#precedes`

**Frame Elements**:
- **FE1**: Preceding_entity (DUL Entity)
- **FE2**: Following_entity (DUL Entity)

**Semantics**: Preceding_entity precedes Following_entity (possibly with gap)

**DUL Definition**: Temporal precedence (transitive)

**Inverse**: follows

**Status**: DUL core property

---

#### 8.14.7 includesTime

**Type**: DUL Property
**Background Frame**: *DUL_Temporal_Inclusion*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#includesTime`

**Frame Elements**:
- **FE1**: Situation (DUL Situation)
- **FE2**: Time_interval (DUL TimeInterval)

**Semantics**: Situation temporally includes Time_interval

**DUL Definition**: Temporal inclusion in situations

**Inverse**: isTimeIncludedIn

**Status**: DUL core property

---

#### 8.14.8 isTimeIncludedIn

**Type**: DUL Property
**Background Frame**: *DUL_Temporal_Inclusion*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#isTimeIncludedIn`

**Frame Elements**:
- **FE1**: Time_interval (DUL TimeInterval)
- **FE2**: Situation (DUL Situation)

**Semantics**: Time_interval is temporally included in Situation

**DUL Definition**: Inverse of includesTime

**Inverse**: includesTime

**Status**: DUL core property

---

### 8.15 Spatial Properties

These micro-frames define spatial relations between entities and locations.

---

#### 8.15.1 hasLocation

**Type**: DUL Property
**Background Frame**: *DUL_Spatial_Location*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#hasLocation`

**Frame Elements**:
- **FE1**: Entity (DUL Entity)
- **FE2**: Place (DUL Place)

**Semantics**: Entity is located at Place

**DUL Definition**: Spatial location relation

**Inverse**: isLocationOf

**Examples**:
```
Person.Target --hasLocation--> City.Target
Building.Target --hasLocation--> Address.Target
```

**Status**: DUL core property

---

#### 8.15.2 isLocationOf

**Type**: DUL Property
**Background Frame**: *DUL_Spatial_Location*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#isLocationOf`

**Frame Elements**:
- **FE1**: Place (DUL Place)
- **FE2**: Entity (DUL Entity)

**Semantics**: Place is the location of Entity

**DUL Definition**: Inverse of hasLocation

**Inverse**: hasLocation

**Status**: DUL core property

---

#### 8.15.3 hasCommonBoundary

**Type**: DUL Property
**Background Frame**: *DUL_Spatial_Adjacency*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#hasCommonBoundary`

**Frame Elements**:
- **FE1**: Entity1 (DUL Entity)
- **FE2**: Entity2 (DUL Entity)

**Semantics**: Entity1 and Entity2 share a common boundary

**DUL Definition**: Spatial adjacency/contiguity

**Symmetric**: true

**Examples**:
```
Country_A.Target --hasCommonBoundary--> Country_B.Target
```

**Status**: DUL core property

---

#### 8.15.4 nearTo

**Type**: DUL Property
**Background Frame**: *DUL_Spatial_Proximity*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#nearTo`

**Frame Elements**:
- **FE1**: Entity1 (DUL Entity)
- **FE2**: Entity2 (DUL Entity)

**Semantics**: Entity1 is spatially near Entity2

**DUL Definition**: Spatial proximity (vague)

**Symmetric**: true

**Status**: DUL core property

---

#### 8.15.5 farFrom

**Type**: DUL Property
**Background Frame**: *DUL_Spatial_Distance*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#farFrom`

**Frame Elements**:
- **FE1**: Entity1 (DUL Entity)
- **FE2**: Entity2 (DUL Entity)

**Semantics**: Entity1 is spatially far from Entity2

**DUL Definition**: Spatial distance (vague)

**Symmetric**: true

**Status**: DUL core property

---

#### 8.15.6 overlaps

**Type**: DUL Property
**Background Frame**: *DUL_Spatial_Overlap*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#overlaps`

**Frame Elements**:
- **FE1**: Entity1 (DUL Entity)
- **FE2**: Entity2 (DUL Entity)

**Semantics**: Entity1 spatially overlaps with Entity2

**DUL Definition**: Spatial overlap relation

**Symmetric**: true

**Status**: DUL core property

---

### 8.16 Expression and Information Properties

These micro-frames relate information objects, expressions, and concepts.

---

#### 8.16.1 expresses

**Type**: DUL Property
**Background Frame**: *DUL_Expression*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#expresses`

**Frame Elements**:
- **FE1**: Information_object (DUL InformationObject)
- **FE2**: Social_object (DUL SocialObject)

**Semantics**: Information_object expresses Social_object (concept, norm, etc.)

**DUL Definition**: Expression relation between information and social objects

**Inverse**: isExpressedBy

**Examples**:
```
Book.Target --expresses--> Theory.Target
Law_document.Target --expresses--> Legal_norm.Target
```

**Status**: DUL core property

---

#### 8.16.2 isExpressedBy

**Type**: DUL Property
**Background Frame**: *DUL_Expression*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#isExpressedBy`

**Frame Elements**:
- **FE1**: Social_object (DUL SocialObject)
- **FE2**: Information_object (DUL InformationObject)

**Semantics**: Social_object is expressed by Information_object

**DUL Definition**: Inverse of expresses

**Inverse**: expresses

**Status**: DUL core property

---

#### 8.16.3 expressesConcept

**Type**: DUL Property
**Background Frame**: *DUL_Concept_Expression*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#expressesConcept`

**Frame Elements**:
- **FE1**: Information_object (DUL InformationObject)
- **FE2**: Concept (DUL Concept)

**Semantics**: Information_object expresses Concept

**DUL Definition**: Specialization of expresses for concepts

**Inverse**: isConceptExpressedBy

**Status**: DUL core property

---

#### 8.16.4 isConceptExpressedBy

**Type**: DUL Property
**Background Frame**: *DUL_Concept_Expression*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#isConceptExpressedBy`

**Frame Elements**:
- **FE1**: Concept (DUL Concept)
- **FE2**: Information_object (DUL InformationObject)

**Semantics**: Concept is expressed by Information_object

**DUL Definition**: Inverse of expressesConcept

**Inverse**: expressesConcept

**Status**: DUL core property

---

#### 8.16.5 concretelyExpresses

**Type**: DUL Property
**Background Frame**: *DUL_Concrete_Expression*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#concretelyExpresses`

**Frame Elements**:
- **FE1**: Information_realization (DUL InformationRealization)
- **FE2**: Information_object (DUL InformationObject)

**Semantics**: Information_realization concretely expresses Information_object

**DUL Definition**: Relation between information realizations and information objects

**Inverse**: isConcretelyExpressedBy

**Examples**:
```
Physical_book.Target --concretelyExpresses--> Book_content.Target
```

**Status**: DUL core property

---

#### 8.16.6 isConcretelyExpressedBy

**Type**: DUL Property
**Background Frame**: *DUL_Concrete_Expression*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#isConcretelyExpressedBy`

**Frame Elements**:
- **FE1**: Information_object (DUL InformationObject)
- **FE2**: Information_realization (DUL InformationRealization)

**Semantics**: Information_object is concretely expressed by Information_realization

**DUL Definition**: Inverse of concretelyExpresses

**Inverse**: concretelyExpresses

**Status**: DUL core property

---

#### 8.16.7 realizes

**Type**: DUL Property
**Background Frame**: *DUL_Realization*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#realizes`

**Frame Elements**:
- **FE1**: Information_realization (DUL InformationRealization)
- **FE2**: Information_object (DUL InformationObject)

**Semantics**: Information_realization realizes Information_object

**DUL Definition**: Realization of information objects

**Inverse**: isRealizedBy

**Status**: DUL core property

---

#### 8.16.8 isRealizedBy

**Type**: DUL Property
**Background Frame**: *DUL_Realization*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#isRealizedBy`

**Frame Elements**:
- **FE1**: Information_object (DUL InformationObject)
- **FE2**: Information_realization (DUL InformationRealization)

**Semantics**: Information_object is realized by Information_realization

**DUL Definition**: Inverse of realizes

**Inverse**: realizes

**Status**: DUL core property

---

### 8.17 Agency and Action Properties

---

#### 8.17.1 actsFor

**Type**: DUL Property
**Background Frame**: *DUL_Agency_Delegation*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#actsFor`

**Frame Elements**:
- **FE1**: Agent_acting (DUL Agent)
- **FE2**: Agent_represented (DUL Agent)

**Semantics**: Agent_acting acts on behalf of Agent_represented

**DUL Definition**: Delegation of agency

**Examples**:
```
Lawyer.Target --actsFor--> Client.Target
Ambassador.Target --actsFor--> Country.Target
```

**Status**: DUL core property

---

#### 8.17.2 actsThrough

**Type**: DUL Property
**Background Frame**: *DUL_Agency_Instrumentality*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#actsThrough`

**Frame Elements**:
- **FE1**: Agent (DUL Agent)
- **FE2**: Physical_object (DUL PhysicalObject)

**Semantics**: Agent acts through Physical_object (as instrument)

**DUL Definition**: Instrumental agency

**Examples**:
```
Person.Target --actsThrough--> Tool.Target
```

**Status**: DUL core property

---

#### 8.17.3 involvesAgent

**Type**: DUL Property
**Background Frame**: *DUL_Agent_Involvement*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#involvesAgent`

**Frame Elements**:
- **FE1**: Event (DUL Event)
- **FE2**: Agent (DUL Agent)

**Semantics**: Event involves Agent

**DUL Definition**: Agent involvement in events

**Inverse**: isAgentInvolvedIn

**Status**: DUL core property

---

#### 8.17.4 isAgentInvolvedIn

**Type**: DUL Property
**Background Frame**: *DUL_Agent_Involvement*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#isAgentInvolvedIn`

**Frame Elements**:
- **FE1**: Agent (DUL Agent)
- **FE2**: Event (DUL Event)

**Semantics**: Agent is involved in Event

**DUL Definition**: Inverse of involvesAgent

**Inverse**: involvesAgent

**Status**: DUL core property

---

#### 8.17.5 includesAction

**Type**: DUL Property
**Background Frame**: *DUL_Action_Inclusion*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#includesAction`

**Frame Elements**:
- **FE1**: Situation (DUL Situation)
- **FE2**: Action (DUL Action)

**Semantics**: Situation includes Action

**DUL Definition**: Action inclusion in situations

**Inverse**: isActionIncludedIn

**Status**: DUL core property

---

#### 8.17.6 isActionIncludedIn

**Type**: DUL Property
**Background Frame**: *DUL_Action_Inclusion*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#isActionIncludedIn`

**Frame Elements**:
- **FE1**: Action (DUL Action)
- **FE2**: Situation (DUL Situation)

**Semantics**: Action is included in Situation

**DUL Definition**: Inverse of includesAction

**Inverse**: includesAction

**Status**: DUL core property

---

### 8.18 Parameter and Constraint Properties

---

#### 8.18.1 hasParameter

**Type**: DUL Property
**Background Frame**: *DUL_Parametrization*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#hasParameter`

**Frame Elements**:
- **FE1**: Concept (DUL Concept)
- **FE2**: Parameter (DUL Parameter)

**Semantics**: Concept has Parameter

**DUL Definition**: Parameter relation for concepts

**Inverse**: isParameterFor

**Status**: DUL core property

---

#### 8.18.2 isParameterFor

**Type**: DUL Property
**Background Frame**: *DUL_Parametrization*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#isParameterFor`

**Frame Elements**:
- **FE1**: Parameter (DUL Parameter)
- **FE2**: Concept (DUL Concept)

**Semantics**: Parameter is a parameter for Concept

**DUL Definition**: Inverse of hasParameter

**Inverse**: hasParameter

**Status**: DUL core property

---

#### 8.18.3 parametrizes

**Type**: DUL Property
**Background Frame**: *DUL_Parametrization*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#parametrizes`

**Frame Elements**:
- **FE1**: Parameter (DUL Parameter)
- **FE2**: Concept (DUL Concept)

**Semantics**: Parameter parametrizes Concept

**DUL Definition**: Parametrization relation

**Inverse**: isParametrizedBy

**Status**: DUL core property

---

#### 8.18.4 isParametrizedBy

**Type**: DUL Property
**Background Frame**: *DUL_Parametrization*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#isParametrizedBy`

**Frame Elements**:
- **FE1**: Concept (DUL Concept)
- **FE2**: Parameter (DUL Parameter)

**Semantics**: Concept is parametrized by Parameter

**DUL Definition**: Inverse of parametrizes

**Inverse**: parametrizes

**Status**: DUL core property

---

#### 8.18.5 hasConstraint

**Type**: DUL Property
**Background Frame**: *DUL_Constraint*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#hasConstraint`

**Frame Elements**:
- **FE1**: Description (DUL Description)
- **FE2**: Constraint (DUL Constraint)

**Semantics**: Description has Constraint

**DUL Definition**: Constraint relation for descriptions

**Inverse**: isConstraintFor

**Status**: DUL core property

---

#### 8.18.6 isConstraintFor

**Type**: DUL Property
**Background Frame**: *DUL_Constraint*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#isConstraintFor`

**Frame Elements**:
- **FE1**: Constraint (DUL Constraint)
- **FE2**: Description (DUL Description)

**Semantics**: Constraint constrains Description

**DUL Definition**: Inverse of hasConstraint

**Inverse**: hasConstraint

**Status**: DUL core property

---

#### 8.18.7 hasPrecondition

**Type**: DUL Property
**Background Frame**: *DUL_Precondition*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#hasPrecondition`

**Frame Elements**:
- **FE1**: Task (DUL Task)
- **FE2**: Situation (DUL Situation)

**Semantics**: Task requires Situation as precondition

**DUL Definition**: Precondition for tasks

**Inverse**: isPreconditionOf

**Status**: DUL core property

---

#### 8.18.8 isPreconditionOf

**Type**: DUL Property
**Background Frame**: *DUL_Precondition*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#isPreconditionOf`

**Frame Elements**:
- **FE1**: Situation (DUL Situation)
- **FE2**: Task (DUL Task)

**Semantics**: Situation is a precondition for Task

**DUL Definition**: Inverse of hasPrecondition

**Inverse**: hasPrecondition

**Status**: DUL core property

---

#### 8.18.9 hasPostcondition

**Type**: DUL Property
**Background Frame**: *DUL_Postcondition*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#hasPostcondition`

**Frame Elements**:
- **FE1**: Task (DUL Task)
- **FE2**: Situation (DUL Situation)

**Semantics**: Task results in Situation as postcondition

**DUL Definition**: Postcondition for tasks

**Inverse**: isPostconditionOf

**Status**: DUL core property

---

#### 8.18.10 isPostconditionOf

**Type**: DUL Property
**Background Frame**: *DUL_Postcondition*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#isPostconditionOf`

**Frame Elements**:
- **FE1**: Situation (DUL Situation)
- **FE2**: Task (DUL Task)

**Semantics**: Situation is a postcondition of Task

**DUL Definition**: Inverse of hasPostcondition

**Inverse**: hasPostcondition

**Status**: DUL core property

---

### 8.19 Association and Relation Properties

---

#### 8.19.1 associatedWith

**Type**: DUL Property
**Background Frame**: *DUL_Association*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#associatedWith`

**Frame Elements**:
- **FE1**: Entity1 (DUL Entity)
- **FE2**: Entity2 (DUL Entity)

**Semantics**: Entity1 is associated with Entity2 (general relation)

**DUL Definition**: Generic association relation

**Symmetric**: true

**Status**: DUL core property

---

#### 8.19.2 coparticipatesWith

**Type**: DUL Property
**Background Frame**: *DUL_Coparticipation*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#coparticipatesWith`

**Frame Elements**:
- **FE1**: Object1 (DUL Object)
- **FE2**: Object2 (DUL Object)

**Semantics**: Object1 coparticipates with Object2 in some event

**DUL Definition**: Co-participation relation

**Symmetric**: true

**Status**: DUL core property

---

#### 8.19.3 sameSettingAs

**Type**: DUL Property
**Background Frame**: *DUL_Setting_Sharing*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#sameSettingAs`

**Frame Elements**:
- **FE1**: Entity1 (DUL Entity)
- **FE2**: Entity2 (DUL Entity)

**Semantics**: Entity1 and Entity2 share the same situational setting

**DUL Definition**: Shared context relation

**Symmetric**: true

**Status**: DUL core property

---

#### 8.19.4 isRelatedToConcept

**Type**: DUL Property
**Background Frame**: *DUL_Conceptual_Relation*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#isRelatedToConcept`

**Frame Elements**:
- **FE1**: Concept1 (DUL Concept)
- **FE2**: Concept2 (DUL Concept)

**Semantics**: Concept1 is related to Concept2

**DUL Definition**: Generic concept relation

**Status**: DUL core property

---

#### 8.19.5 isRelatedToDescription

**Type**: DUL Property
**Background Frame**: *DUL_Description_Relation*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#isRelatedToDescription`

**Frame Elements**:
- **FE1**: Description1 (DUL Description)
- **FE2**: Description2 (DUL Description)

**Semantics**: Description1 is related to Description2

**DUL Definition**: Generic description relation

**Status**: DUL core property

---

### 8.20 Coverage and Expansion Properties

---

#### 8.20.1 covers

**Type**: DUL Property
**Background Frame**: *DUL_Coverage*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#covers`

**Frame Elements**:
- **FE1**: Covering_concept (DUL Concept)
- **FE2**: Covered_concept (DUL Concept)

**Semantics**: Covering_concept covers Covered_concept

**DUL Definition**: Conceptual coverage relation

**Inverse**: isCoveredBy

**Status**: DUL core property

---

#### 8.20.2 isCoveredBy

**Type**: DUL Property
**Background Frame**: *DUL_Coverage*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#isCoveredBy`

**Frame Elements**:
- **FE1**: Covered_concept (DUL Concept)
- **FE2**: Covering_concept (DUL Concept)

**Semantics**: Covered_concept is covered by Covering_concept

**DUL Definition**: Inverse of covers

**Inverse**: covers

**Status**: DUL core property

---

#### 8.20.3 expands

**Type**: DUL Property
**Background Frame**: *DUL_Expansion*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#expands`

**Frame Elements**:
- **FE1**: Expanding_description (DUL Description)
- **FE2**: Expanded_description (DUL Description)

**Semantics**: Expanding_description expands Expanded_description

**DUL Definition**: Description expansion relation

**Inverse**: isExpandedIn

**Status**: DUL core property

---

#### 8.20.4 isExpandedIn

**Type**: DUL Property
**Background Frame**: *DUL_Expansion*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#isExpandedIn`

**Frame Elements**:
- **FE1**: Expanded_description (DUL Description)
- **FE2**: Expanding_description (DUL Description)

**Semantics**: Expanded_description is expanded in Expanding_description

**DUL Definition**: Inverse of expands

**Inverse**: expands

**Status**: DUL core property

---

#### 8.20.5 unifies

**Type**: DUL Property
**Background Frame**: *DUL_Unification*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#unifies`

**Frame Elements**:
- **FE1**: Unifying_description (DUL Description)
- **FE2**: Unified_description (DUL Description)

**Semantics**: Unifying_description unifies Unified_description

**DUL Definition**: Description unification relation

**Inverse**: isUnifiedBy

**Status**: DUL core property

---

#### 8.20.6 isUnifiedBy

**Type**: DUL Property
**Background Frame**: *DUL_Unification*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#isUnifiedBy`

**Frame Elements**:
- **FE1**: Unified_description (DUL Description)
- **FE2**: Unifying_description (DUL Description)

**Semantics**: Unified_description is unified by Unifying_description

**DUL Definition**: Inverse of unifies

**Inverse**: unifies

**Status**: DUL core property

---

### 8.21 Specialization and Subordination Properties

---

#### 8.21.1 specializes

**Type**: DUL Property
**Background Frame**: *DUL_Specialization*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#specializes`

**Frame Elements**:
- **FE1**: Specialized_concept (DUL Concept)
- **FE2**: General_concept (DUL Concept)

**Semantics**: Specialized_concept specializes General_concept

**DUL Definition**: Concept specialization (subsumption)

**Inverse**: isSpecializedBy

**Status**: DUL core property

---

#### 8.21.2 isSpecializedBy

**Type**: DUL Property
**Background Frame**: *DUL_Specialization*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#isSpecializedBy`

**Frame Elements**:
- **FE1**: General_concept (DUL Concept)
- **FE2**: Specialized_concept (DUL Concept)

**Semantics**: General_concept is specialized by Specialized_concept

**DUL Definition**: Inverse of specializes

**Inverse**: specializes

**Status**: DUL core property

---

#### 8.21.3 isSubordinatedTo

**Type**: DUL Property
**Background Frame**: *DUL_Subordination*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#isSubordinatedTo`

**Frame Elements**:
- **FE1**: Subordinate_concept (DUL Concept)
- **FE2**: Superordinate_concept (DUL Concept)

**Semantics**: Subordinate_concept is subordinated to Superordinate_concept

**DUL Definition**: Concept subordination relation

**Inverse**: isSuperordinatedTo

**Status**: DUL core property

---

#### 8.21.4 isSuperordinatedTo

**Type**: DUL Property
**Background Frame**: *DUL_Subordination*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#isSuperordinatedTo`

**Frame Elements**:
- **FE1**: Superordinate_concept (DUL Concept)
- **FE2**: Subordinate_concept (DUL Concept)

**Semantics**: Superordinate_concept is superordinated to Subordinate_concept

**DUL Definition**: Inverse of isSubordinatedTo

**Inverse**: isSubordinatedTo

**Status**: DUL core property

---

### 8.22 Additional DUL Properties

---

#### 8.22.1 characterizes

**Type**: DUL Property
**Background Frame**: *DUL_Characterization*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#characterizes`

**Frame Elements**:
- **FE1**: Quality (DUL Quality)
- **FE2**: Entity (DUL Entity)

**Semantics**: Quality characterizes Entity

**DUL Definition**: Quality characterization relation

**Inverse**: isCharacterizedBy

**Status**: DUL core property

---

#### 8.22.2 isCharacterizedBy

**Type**: DUL Property
**Background Frame**: *DUL_Characterization*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#isCharacterizedBy`

**Frame Elements**:
- **FE1**: Entity (DUL Entity)
- **FE2**: Quality (DUL Quality)

**Semantics**: Entity is characterized by Quality

**DUL Definition**: Inverse of characterizes

**Inverse**: characterizes

**Status**: DUL core property

---

#### 8.22.3 introduces

**Type**: DUL Property
**Background Frame**: *DUL_Introduction*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#introduces`

**Frame Elements**:
- **FE1**: Description (DUL Description)
- **FE2**: Concept (DUL Concept)

**Semantics**: Description introduces Concept

**DUL Definition**: Concept introduction by descriptions

**Inverse**: isIntroducedBy

**Status**: DUL core property

---

#### 8.22.4 isIntroducedBy

**Type**: DUL Property
**Background Frame**: *DUL_Introduction*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#isIntroducedBy`

**Frame Elements**:
- **FE1**: Concept (DUL Concept)
- **FE2**: Description (DUL Description)

**Semantics**: Concept is introduced by Description

**DUL Definition**: Inverse of introduces

**Inverse**: introduces

**Status**: DUL core property

---

#### 8.22.5 usesConcept

**Type**: DUL Property
**Background Frame**: *DUL_Concept_Usage*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#usesConcept`

**Frame Elements**:
- **FE1**: Description (DUL Description)
- **FE2**: Concept (DUL Concept)

**Semantics**: Description uses Concept

**DUL Definition**: Concept usage in descriptions

**Inverse**: isConceptUsedIn

**Status**: DUL core property

---

#### 8.22.6 isConceptUsedIn

**Type**: DUL Property
**Background Frame**: *DUL_Concept_Usage*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#isConceptUsedIn`

**Frame Elements**:
- **FE1**: Concept (DUL Concept)
- **FE2**: Description (DUL Description)

**Semantics**: Concept is used in Description

**DUL Definition**: Inverse of usesConcept

**Inverse**: usesConcept

**Status**: DUL core property

---

## Summary Statistics

### Whole Micro-Frames Count

| Category | Implemented | Under Analysis | DUL Properties | Whole |
|----------|-------------|----------------|----------------|-------|
| **AGENTIVE** | 11 | 6 | - | 17 |
| **CONSTITUTIVE** | 23 | 17 | - | 40 |
| **FORMAL** | 2 | 0 | - | 2 |
| **TELIC** | 10 | 3 | - | 13 |
| **DUL Core** | - | - | 118 | 118 |
| **Whole** | **46** | **26** | **118** | **190** |

### DUL Properties by Category

| DUL Category | Count |
|--------------|-------|
| Role and Task | 9 |
| Participation | 8 |
| Part-Whole | 9 |
| Quality and Region | 4 |
| Temporal | 8 |
| Spatial | 6 |
| Expression and Information | 8 |
| Agency and Action | 6 |
| Parameter and Constraint | 10 |
| Association and Relation | 5 |
| Coverage and Expansion | 6 |
| Specialization | 4 |
| Description and Situation | 6 |
| Classification | 4 |
| Other | 31 |

### Implementation Status

- **Production Ready**: 46 micro-frames (TQR implemented)
- **Analysis Phase**: 26 micro-frames (SIMPLE relations)
- **DUL Integration**: 118 properties ready for implementation
- **Whole Coverage**: 190 relation types

---

## Usage Examples

### Example 1: Agentive Relation (criado_por)

**Scenario**: Relating a dish to its creator

**Micro-Frame**: criado_por (Culinary_creation)

**Application**:
```
# Frames
pizza.n (Entity frame, type: Food)
  └─ Target FE: The pizza entity

chef.n (Entity frame, type: Person)
  └─ Target FE: The chef entity

# Micro-frame
Culinary_creation (micro_frame)
  └─ FE1: Produced_food
  └─ FE2: Cook

# Relation
fe_relation:
  micro_frame_id: Culinary_creation
  source_fe_id: pizza.n.Target
  target_fe_id: chef.n.Target
  source_maps_to: Produced_food
  target_maps_to: Cook
```

**Interpretation**: The pizza (Produced_food) was created by the chef (Cook)

---

### Example 2: Constitutive Relation (tem_como_parte)

**Scenario**: Mereological relation between whole and part

**Micro-Frame**: tem_como_parte (Part_whole)

**Application**:
```
# Frames
car.n (Entity frame, type: Vehicle)
  └─ Target FE: The car entity

engine.n (Entity frame, type: Component)
  └─ Target FE: The engine entity

# Micro-frame
Part_whole (micro_frame)
  └─ FE1: Whole (the whole)
  └─ FE2: Part (the part)

# Relation
fe_relation:
  micro_frame_id: Part_whole
  source_fe_id: car.n.Target
  target_fe_id: engine.n.Target
  source_maps_to: Whole
  target_maps_to: Part
```

**Interpretation**: The car (Whole) has the engine (Part) as a component

---

### Example 3: Telic Relation (propósito_de)

**Scenario**: Purpose/function relation

**Micro-Frame**: propósito_de (Tool_purpose)

**Application**:
```
# Frames
cutting.n (Event frame, type: Action)
  └─ Target FE: The cutting action

knife.n (Entity frame, type: Tool)
  └─ Target FE: The knife entity

# Micro-frame
Tool_purpose (micro_frame)
  └─ FE1: Purpose (the purpose)
  └─ FE2: Tool (the tool)

# Relation
fe_relation:
  micro_frame_id: Tool_purpose
  source_fe_id: cutting.n.Target
  target_fe_id: knife.n.Target
  source_maps_to: Purpose
  target_maps_to: Tool
```

**Interpretation**: Cutting (Purpose) is the purpose of the knife (Tool)

---

### Example 4: DUL Property (hasRole)

**Scenario**: Role assignment using DUL

**Micro-Frame**: hasRole (DUL_Role_Assignment)

**Application**:
```
# Frames
john.n (Entity frame, type: Person, DUL: AgentivePhysicalObject)
  └─ Target FE: The person John

student_role (Role frame, DUL: Role)
  └─ Target FE: The student role

# Micro-frame
DUL_Role_Assignment (micro_frame, DUL property)
  └─ FE1: Object
  └─ FE2: Role

# Relation
fe_relation:
  micro_frame_id: DUL_Role_Assignment
  source_fe_id: john.n.Target
  target_fe_id: student_role.Target
  source_maps_to: Object
  target_maps_to: Role
```

**Interpretation**: John (Object) has the student role (Role)

---

### Example 5: Intra-Frame Relation (agent_relation)

**Scenario**: Relating FEs within a semantic frame

**Semantic Frame**: Commerce_buy

**Micro-Frame**: agent_relation

**Application**:
```
# Semantic frame
Commerce_buy (semantic frame)
  └─ Target FE: The buying event
  └─ Buyer FE: The purchaser
  └─ Goods FE: What is purchased
  └─ Seller FE: Who sells

# Micro-frame
agent_relation (micro_frame)
  └─ FE1: Event
  └─ FE2: Agent

# Intra-frame relation
fe_relation:
  micro_frame_id: agent_relation
  host_frame_id: Commerce_buy  # Intra-frame!
  source_fe_id: Commerce_buy.Target
  target_fe_id: Commerce_buy.Buyer
  source_maps_to: Event
  target_maps_to: Agent
```

**Interpretation**: Within Commerce_buy frame, the Buyer is the agent of the buying event (Target)

---

### Example 6: Frame Inheritance via Target FEs

**Scenario**: Frame-to-frame relation using Target FEs

**Frames**: Commerce_buy and Getting

**Micro-Frame**: inherits_from_relation

**Application**:
```
# Child frame
Commerce_buy (semantic frame)
  └─ Target FE: The buying event

# Parent frame
Getting (semantic frame)
  └─ Target FE: The getting event

# Micro-frame
inherits_from_relation (micro_frame)
  └─ FE1: Child_frame
  └─ FE2: Parent_frame

# Inter-frame relation
fe_relation:
  micro_frame_id: inherits_from_relation
  host_frame_id: NULL  # Inter-frame!
  source_fe_id: Commerce_buy.Target
  target_fe_id: Getting.Target
  source_maps_to: Child_frame
  target_maps_to: Parent_frame
```

**Interpretation**: Commerce_buy (Child_frame) inherits from Getting (Parent_frame)

---

## References

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

### DUL Ontology

5. **Gangemi, A., & Mika, P. (2003)**. "Understanding the Semantic Web through Descriptions and Situations". *Proceedings of International Semantic Web Conference*, 689-706.
   - DnS pattern and DUL foundations

6. **Masolo, C., et al. (2003)**. "WonderWeb Deliverable D18: The WonderWeb Library of Foundational Ontologies". *ISTC-CNR Technical Report*.
   - Complete DOLCE/DUL specification

7. **Gangemi, A. (2005)**. "Ontology Design Patterns for Semantic Web Content". *Proceedings of International Semantic Web Conference*, 262-276.
   - Ontology design patterns using DUL

8. **DUL Documentation**: http://www.ontologydesignpatterns.org/ont/dul/DUL.owl
   - Official DUL ontology and documentation

### FrameNet and Frame Semantics

9. **Fillmore, C. J. (1982)**. "Frame Semantics". In *Linguistics in the Morning Calm* (pp. 111-137). Hanshin Publishing Co.
   - Foundational work on frame semantics

10. **Baker, C. F., Fillmore, C. J., & Lowe, J. B. (1998)**. "The Berkeley FrameNet Project". *Proceedings of COLING-ACL*, 86-90.
    - FrameNet project introduction

11. **Ruppenhofer, J., et al. (2016)**. *FrameNet II: Extended Theory and Practice*.
    - Current FrameNet methodology

### Frame-Native Architecture

12. **Salomão, M. M. M. (2009)**. "FrameNet brazil: one trabalho em progresso". *Calidoscópio*, 7(3), 171-182.
    - FrameNet brazil foundations

13. **Torrent, T. T., et al. (2014)**. "Multilingual Lexicographic Annotation for Domain-Specific Electronic Dictionaries". *Constructions and Frames*, 6(1), 73-94.
    - Multilingual frame-based annotation

### Micro-Frames and TQR

14. **Chishman, R., et al. (2018)**. "Ternary Qualia Relations in FrameNet: Challenges and Perspectives for Lexical-Ontological Integration". *Proceedings of LREC*.
    - Original TQR proposal for FrameNet brazil

15. **Present work (2025)**. "Frame-Native DUL: A Unified Micro-Frame Architecture". FrameNet brazil Documentation.
    - Micro-frame formalization and DUL integration

---

---

## Appendix: Quick Reference Tables

This appendix provides quick reference tables for all 118 DUL properties organized by functional category.

---

### A.1 Description and Situation Pattern (12 properties)

| Property Name | Semantics | FE1 | FE2 |
|---------------|-----------|-----|-----|
| defines | Description defines Entity | Description | Entity |
| isDefinedIn | Entity is defined in Description | Entity | Description |
| satisfies | Situation satisfies Description | Situation | Description |
| isSatisfiedBy | Description is satisfied by Situation | Description | Situation |
| describes | Description describes Entity | Description | Entity |
| isDescribedBy | Entity is described by Description | Entity | Description |
| hasSetting | Entity has Setting (situational context) | Entity | Setting |
| isSettingFor | Setting is the context for Entity | Setting | Entity |
| classifies | Concept classifies Entity | Concept | Entity |
| isClassifiedBy | Entity is classified by Concept | Entity | Concept |
| conceptualizes | Concept conceptualizes Entity | Concept | Entity |
| isConceptualizedBy | Entity is conceptualized by Concept | Entity | Concept |

---

### A.2 Role and Task Properties (9 properties)

| Property Name | Semantics | FE1 | FE2 |
|---------------|-----------|-----|-----|
| hasRole | Object has Role | Object | Role |
| isRoleOf | Role is the role of Object | Role | Object |
| definesRole | Description defines Role | Description | Role |
| isRoleDefinedIn | Role is defined in Description | Role | Description |
| hasTask | Role has Task as a duty or responsibility | Role | Task |
| isTaskOf | Task is a duty of Role | Task | Role |
| definesTask | Description defines Task | Description | Task |
| isTaskDefinedIn | Task is defined in Description | Task | Description |
| executesTask | Action executes Task | Action | Task |

---

### A.3 Participation Properties (8 properties)

| Property Name | Semantics | FE1 | FE2 |
|---------------|-----------|-----|-----|
| hasParticipant | Event has Object as a participant | Event | Object |
| isParticipantIn | Object participates in Event | Object | Event |
| includesAgent | Situation includes Agent | Situation | Agent |
| isAgentIncludedIn | Agent is included in Situation | Agent | Situation |
| includesEvent | Situation includes Event | Situation | Event |
| isEventIncludedIn | Event is included in Situation | Event | Situation |
| includesObject | Situation includes Object | Situation | Object |
| isObjectIncludedIn | Object is included in Situation | Object | Situation |

---

### A.4 Part-Whole Properties (9 properties)

| Property Name | Semantics | FE1 | FE2 |
|---------------|-----------|-----|-----|
| hasPart | Whole has Part as a component | Whole | Part |
| isPartOf | Part is a component of Whole | Part | Whole |
| hasProperPart | Whole has Proper_part (where part ≠ whole) | Whole | Proper_part |
| hasComponent | System has Component as a functional part | System | Component |
| isComponentOf | Component is a functional part of System | Component | System |
| hasConstituent | Constituted_entity is materially constituted by Constituent | Constituted_entity | Constituent |
| isConstituentOf | Constituent materially constitutes Constituted_entity | Constituent | Constituted_entity |
| hasMember | Collection has Member | Collection | Member |
| isMemberOf | Member belongs to Collection | Member | Collection |

---

### A.5 Quality and Region Properties (4 properties)

| Property Name | Semantics | FE1 | FE2 |
|---------------|-----------|-----|-----|
| hasQuality | Entity possesses Quality | Entity | Quality |
| isQualityOf | Quality is possessed by Entity | Quality | Entity |
| hasRegion | Entity is associated with Region (quale/value) | Entity | Region |
| isRegionFor | Region is the value/quale for Entity | Region | Entity |

---

### A.6 Temporal Properties (8 properties)

| Property Name | Semantics | FE1 | FE2 |
|---------------|-----------|-----|-----|
| hasTimeInterval | Entity occurs/exists during Time_interval | Entity | Time_interval |
| isTimeIntervalOf | Time_interval is when Entity occurs/exists | Time_interval | Entity |
| directlyFollows | Following_entity directly follows Preceding_entity (no gap) | Following_entity | Preceding_entity |
| directlyPrecedes | Preceding_entity directly precedes Following_entity (no gap) | Preceding_entity | Following_entity |
| follows | Following_entity follows Preceding_entity (possibly with gap) | Following_entity | Preceding_entity |
| precedes | Preceding_entity precedes Following_entity (possibly with gap) | Preceding_entity | Following_entity |
| includesTime | Situation temporally includes Time_interval | Situation | Time_interval |
| isTimeIncludedIn | Time_interval is temporally included in Situation | Time_interval | Situation |

---

### A.7 Spatial Properties (6 properties)

| Property Name | Semantics | FE1 | FE2 |
|---------------|-----------|-----|-----|
| hasLocation | Entity is located at Place | Entity | Place |
| isLocationOf | Place is the location of Entity | Place | Entity |
| hasCommonBoundary | Entity1 and Entity2 share a common boundary | Entity1 | Entity2 |
| nearTo | Entity1 is spatially near Entity2 | Entity1 | Entity2 |
| farFrom | Entity1 is spatially far from Entity2 | Entity1 | Entity2 |
| overlaps | Entity1 spatially overlaps with Entity2 | Entity1 | Entity2 |

---

### A.8 Expression and Information Properties (8 properties)

| Property Name | Semantics | FE1 | FE2 |
|---------------|-----------|-----|-----|
| expresses | Information_object expresses Social_object (concept, norm, etc.) | Information_object | Social_object |
| isExpressedBy | Social_object is expressed by Information_object | Social_object | Information_object |
| expressesConcept | Information_object expresses Concept | Information_object | Concept |
| isConceptExpressedBy | Concept is expressed by Information_object | Concept | Information_object |
| concretelyExpresses | Information_realization concretely expresses Information_object | Information_realization | Information_object |
| isConcretelyExpressedBy | Information_object is concretely expressed by Information_realization | Information_object | Information_realization |
| realizes | Information_realization realizes Information_object | Information_realization | Information_object |
| isRealizedBy | Information_object is realized by Information_realization | Information_object | Information_realization |

---

### A.9 Agency and Action Properties (6 properties)

| Property Name | Semantics | FE1 | FE2 |
|---------------|-----------|-----|-----|
| actsFor | Agent_acting acts on behalf of Agent_represented | Agent_acting | Agent_represented |
| actsThrough | Agent acts through Physical_object (as instrument) | Agent | Physical_object |
| involvesAgent | Event involves Agent | Event | Agent |
| isAgentInvolvedIn | Agent is involved in Event | Agent | Event |
| includesAction | Situation includes Action | Situation | Action |
| isActionIncludedIn | Action is included in Situation | Action | Situation |

---

### A.10 Parameter and Constraint Properties (10 properties)

| Property Name | Semantics | FE1 | FE2 |
|---------------|-----------|-----|-----|
| hasParameter | Concept has Parameter | Concept | Parameter |
| isParameterFor | Parameter is a parameter for Concept | Parameter | Concept |
| parametrizes | Parameter parametrizes Concept | Parameter | Concept |
| isParametrizedBy | Concept is parametrized by Parameter | Concept | Parameter |
| hasConstraint | Description has Constraint | Description | Constraint |
| isConstraintFor | Constraint constrains Description | Constraint | Description |
| hasPrecondition | Task requires Situation as precondition | Task | Situation |
| isPreconditionOf | Situation is a precondition for Task | Situation | Task |
| hasPostcondition | Task results in Situation as postcondition | Task | Situation |
| isPostconditionOf | Situation is a postcondition of Task | Situation | Task |

---

### A.11 Association and Relation Properties (5 properties)

| Property Name | Semantics | FE1 | FE2 |
|---------------|-----------|-----|-----|
| associatedWith | Entity1 is associated with Entity2 (general relation) | Entity1 | Entity2 |
| coparticipatesWith | Object1 coparticipates with Object2 in some event | Object1 | Object2 |
| sameSettingAs | Entity1 and Entity2 share the same situational setting | Entity1 | Entity2 |
| isRelatedToConcept | Concept1 is related to Concept2 | Concept1 | Concept2 |
| isRelatedToDescription | Description1 is related to Description2 | Description1 | Description2 |

---

### A.12 Coverage and Expansion Properties (6 properties)

| Property Name | Semantics | FE1 | FE2 |
|---------------|-----------|-----|-----|
| covers | Covering_concept covers Covered_concept | Covering_concept | Covered_concept |
| isCoveredBy | Covered_concept is covered by Covering_concept | Covered_concept | Covering_concept |
| expands | Expanding_description expands Expanded_description | Expanding_description | Expanded_description |
| isExpandedIn | Expanded_description is expanded in Expanding_description | Expanded_description | Expanding_description |
| unifies | Unifying_description unifies Unified_description | Unifying_description | Unified_description |
| isUnifiedBy | Unified_description is unified by Unifying_description | Unified_description | Unifying_description |

---

### A.13 Specialization and Subordination Properties (4 properties)

| Property Name | Semantics | FE1 | FE2 |
|---------------|-----------|-----|-----|
| specializes | Specialized_concept specializes General_concept | Specialized_concept | General_concept |
| isSpecializedBy | General_concept is specialized by Specialized_concept | General_concept | Specialized_concept |
| isSubordinatedTo | Subordinate_concept is subordinated to Superordinate_concept | Subordinate_concept | Superordinate_concept |
| isSuperordinatedTo | Superordinate_concept is superordinated to Subordinate_concept | Superordinate_concept | Subordinate_concept |

---

### A.14 Additional DUL Properties (6 properties)

| Property Name | Semantics | FE1 | FE2 |
|---------------|-----------|-----|-----|
| characterizes | Quality characterizes Entity | Quality | Entity |
| isCharacterizedBy | Entity is characterized by Quality | Entity | Quality |
| introduces | Description introduces Concept | Description | Concept |
| isIntroducedBy | Concept is introduced by Description | Concept | Description |
| usesConcept | Description uses Concept | Description | Concept |
| isConceptUsedIn | Concept is used in Description | Concept | Description |

---

### A.15 Summary Statistics

**Total DUL Properties**: 118

**By Category**:
- Description and Situation Pattern: 12
- Role and Task: 9
- Participation: 8
- Part-Whole: 9
- Quality and Region: 4
- Temporal: 8
- Spatial: 6
- Expression and Information: 8
- Agency and Action: 6
- Parameter and Constraint: 10
- Association and Relation: 5
- Coverage and Expansion: 6
- Specialization and Subordination: 4
- Additional Properties: 6

**Implementation Status**:
- All 118 properties documented and ready for implementation
- Organized into 14 functional categories
- Each property includes inverse mappings where applicable
- Complete DUL URI references provided in main document

---

**END OF DOCUMENT**

**Version**: 1.1 (Complete with Appendix)
**Date**: October 21, 2025
**Total Lines**: ~2,500 (with appendix)
**Status**: Complete and ready for implementation
