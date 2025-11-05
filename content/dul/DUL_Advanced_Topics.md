# DUL Advanced Topics: Classification, Social Context, and Event Descriptions

## Table of Contents
1. [Understanding Classification in DUL](#1-understanding-classification-in-dul)
2. [Social Context and Social Objects: A Deep Dive](#2-social-context-and-social-objects-a-deep-dive)
3. [Modeling Event Descriptions: Agentive, Stative, and Experiential Situations](#3-modeling-event-descriptions-agentive-stative-and-experiential-situations)

---

## 1. Understanding Classification in DUL

### Question
Section 4.4 talks about "Classification" as a Situation subclass, but we don't have a class "Classification" in the ontology. How can I interpret the idea of "classification"?

### Answer

The concept of "Classification" in DUL can be understood at multiple levels. If the explicit `Classification` class doesn't exist in your version of DUL, the pattern it represents is still fundamental and can be modeled directly.

#### 1.1 What is Classification Conceptually?

**Classification** is the cognitive and social act of applying a **Concept** to an **Entity**. It answers the question: "What is this thing?" or "What category does this belong to?"

Key aspects:
- **Intensional side**: The Concept (the category, the "idea")
- **Extensional side**: The Entity being classified (the individual thing)
- **Temporal dimension**: When does this classification hold?
- **Contextual dimension**: Under what conceptual framework (Description) is this classification made?

#### 1.2 The Classification Pattern (Conceptual)

Classification is fundamentally about creating a **contextualized view** that links:

```
Concept (classifier) + Entity (classified) + TimeInterval (when) + Description (framework)
```

This is why Classification is modeled as a **Situation** - it's a contextualized view that includes multiple entities in a coherent relationship.

#### 1.3 Modeling Classification: Three Approaches

##### Approach A: Direct Property (Simple, Atemporal)

If you only need simple, timeless classification without context:

```turtle
# Direct classification using the classifies property
:Concept_Student a dul:Concept ;
    dul:classifies :John .

# Equivalent inverse
:John dul:isClassifiedBy :Concept_Student .

# Or using role property
:John dul:hasRole :Role_Student .
```

**When to use:**
- Classification doesn't change over time
- No need to track when classification started/ended
- Single conceptual framework (no competing classifications)

**Limitations:**
- Cannot represent temporal changes
- Cannot attach additional context
- Cannot distinguish between different classificatory frameworks

##### Approach B: Using Situation (If Classification Class Doesn't Exist)

If the `Classification` class isn't available, model it as a general `Situation` or `TimeIndexedRelation`:

```turtle
# Create a situation that represents the classification context
:Classification_John_Student a dul:Situation ;  # or dul:TimeIndexedRelation
    rdfs:label "John classified as Student" ;
    dul:satisfies :UniversityStructure ;  # The Description defining Student concept
    dul:isSettingFor :Concept_Student ;    # The classifying concept
    dul:isSettingFor :John ;                # The classified entity
    dul:includesTime :TimeInterval_2020_2024 .  # When classification holds

# The Description that defines the concept
:UniversityStructure a dul:Description ;
    dul:defines :Concept_Student .

# The concept itself
:Concept_Student a dul:Concept ;
    dul:isDefinedIn :UniversityStructure .

# The time interval
:TimeInterval_2020_2024 a dul:TimeInterval ;
    dul:hasIntervalDate "2020-01-01"^^xsd:date ;
    dul:hasIntervalDate "2024-12-31"^^xsd:date .
```

**When to use:**
- Classification changes over time
- Need to track when classification started/ended
- Multiple conceptual frameworks competing or coexisting
- Need to attach additional context (place, observer, etc.)

##### Approach C: Using Classification Class (If Available)

If your version of DUL includes the `Classification` class:

```turtle
:Classification_John_Student a dul:Classification ;
    rdfs:label "John classified as Student" ;
    dul:satisfies :UniversityStructure ;
    dul:isSettingFor :Concept_Student ;
    dul:isSettingFor :John ;
    dul:includesTime :TimeInterval_2020_2024 .
```

This is identical to Approach B but uses the specialized class.

#### 1.4 Complete Example: Dynamic Classification

Let's model a more complex scenario: "John was a student from 2020-2024, and is now a teacher from 2025 onwards."

```turtle
# The institutional framework
:UniversityStructure a dul:Description ;
    rdfs:label "University organizational structure" ;
    dul:defines :Concept_Student, :Concept_Teacher .

# The concepts (roles)
:Concept_Student a dul:Role ;
    dul:isDefinedIn :UniversityStructure ;
    rdfs:label "Student role" .

:Concept_Teacher a dul:Role ;
    dul:isDefinedIn :UniversityStructure ;
    rdfs:label "Teacher role" .

# The person
:John a dul:NaturalPerson ;
    rdfs:label "John Smith" .

# First classification: John as Student (2020-2024)
:Classification_John_Student a dul:Situation ;
    rdfs:label "John classified as Student" ;
    dul:satisfies :UniversityStructure ;
    dul:isSettingFor :Concept_Student ;
    dul:isSettingFor :John ;
    dul:includesTime :TimeInterval_2020_2024 .

:TimeInterval_2020_2024 a dul:TimeInterval ;
    rdfs:label "2020 to 2024" .

# Second classification: John as Teacher (2025 onwards)
:Classification_John_Teacher a dul:Situation ;
    rdfs:label "John classified as Teacher" ;
    dul:satisfies :UniversityStructure ;
    dul:isSettingFor :Concept_Teacher ;
    dul:isSettingFor :John ;
    dul:includesTime :TimeInterval_2025_onwards .

:TimeInterval_2025_onwards a dul:TimeInterval ;
    rdfs:label "2025 onwards" .

# Temporal sequence
:Classification_John_Student dul:directlyPrecedes :Classification_John_Teacher .
```

#### 1.5 Multi-Perspective Classification

The Classification pattern also supports **multiple simultaneous classifications** under different frameworks:

```turtle
# An old cradle classified differently in different contexts

# Physical object
:OldCradle a dul:PhysicalArtifact ;
    rdfs:label "An antique wooden cradle" .

# Museum context: classified as historical furniture
:MuseumClassification a dul:Situation ;
    rdfs:label "Cradle as historical furniture" ;
    dul:satisfies :MuseumCatalogDescription ;
    dul:isSettingFor :Concept_HistoricalFurniture ;
    dul:isSettingFor :OldCradle ;
    dul:includesTime :TimeInterval_InMuseum .

:MuseumCatalogDescription a dul:Description ;
    dul:defines :Concept_HistoricalFurniture .

# Garden context: classified as flower pot
:GardenClassification a dul:Situation ;
    rdfs:label "Cradle as flower pot" ;
    dul:satisfies :GardenDecorationDescription ;
    dul:isSettingFor :Concept_FlowerPot ;
    dul:isSettingFor :OldCradle ;
    dul:includesTime :TimeInterval_InGarden .

:GardenDecorationDescription a dul:Description ;
    dul:defines :Concept_FlowerPot .

# Both classifications are valid, non-contradictory
# They represent different perspectives on the same physical object
```

#### 1.6 Key Insights

1. **Classification is not just taxonomy**: It's a **contextualized, temporal relation** between concepts and entities.

2. **The power of reification**: By treating classification as a Situation (first-class entity), we can:
   - Attach temporal bounds
   - Link to conceptual frameworks
   - Represent multiple simultaneous or sequential classifications
   - Attach observers, locations, and other context

3. **Simple vs. Complex**: Use direct `classifies` property for simple cases; use Situation pattern when context matters.

4. **The epistemological stance**: Classification reflects how **we interpret entities**, not their intrinsic nature. Different Descriptions yield different valid classifications.

---

## 2. Social Context and Social Objects: A Deep Dive

### Question
I need a deep explanation about the idea of "Social Context". What characterizes a "social context"? What means a "social object" or a "social agent"? How are "information" and "information sharing" related to "social contexts"? Which criteria define an entity as "social"?

### Answer

This is one of DUL's most philosophically sophisticated aspects. Let's unpack it systematically.

### 2.1 The Fundamental Distinction: Physical vs. Social

DUL makes **PhysicalObject** and **SocialObject** **disjoint** (mutually exclusive). This is a foundational ontological commitment:

#### PhysicalObject
- Has spatial location (proper spatial region)
- Typically has mass (matter-based)
- **Exists independently of human conceptualization**
- Examples: rocks, trees, human bodies (as biological entities), buildings (as material structures)

#### SocialObject
- **Exists only through communication** and shared understanding
- Must be **expressed by InformationObjects** (language, symbols, gestures)
- **Ontologically dependent** on information and social practices
- Examples: laws, roles, organizations, concepts, money, marriages, contracts

### 2.2 The Criterion for "Social": Existence Through Communication

**The key criterion: A social object cannot exist without being expressed/communicated.**

This is DUL's adoption of **John Searle's philosophy of social ontology**:

#### What Makes Something Social?

1. **Constitutive dependence on communication**
   - A marriage exists because it is expressed in legal documents, ceremonies, and social recognition
   - Remove all expression/communication of marriage → marriage ceases to exist
   - A rock exists even if no one talks about it → rock is physical

2. **Collective intentionality**
   - Social objects require shared mental states ("we believe", "we agree")
   - They are created and maintained through intersubjective agreement

3. **Institutional reality**
   - Social objects often involve status functions ("X counts as Y in context C")
   - Example: "This paper counts as money in this society"

#### The Triple Test

To determine if something is social, ask:

| Question | Physical Object | Social Object |
|----------|----------------|---------------|
| Does it exist without human communication? | **Yes** | **No** |
| Must it be expressed by information objects? | No | **Yes** |
| Does it have spatial location and mass? | **Yes** | No |

### 2.3 The Information-Social Connection

The relationship between information and social objects is **constitutive**, not merely descriptive:

#### The Three-Level Model

```
Physical/Event Realization → Abstract Information → Social Meaning
     (concrete)                  (abstract)          (social)
```

**Example: A Law**

```turtle
# Level 1: Physical Realization (concrete)
:ConstitutionBook_Copy123 a dul:InformationRealization ;
    a dul:PhysicalObject ;  # It's also a physical book
    rdfs:label "A physical copy of the Constitution" ;
    dul:realizes :ConstitutionText .

:OralRecitation_July4 a dul:InformationRealization ;
    a dul:Event ;  # It's also an event
    rdfs:label "Oral recitation on July 4th" ;
    dul:realizes :ConstitutionText .

# Level 2: Abstract Information
:ConstitutionText a dul:InformationObject ;
    rdfs:label "The text of the Constitution (abstract)" ;
    dul:expresses :ConstitutionalLaw .

# Level 3: Social Meaning
:ConstitutionalLaw a dul:Norm ;  # A type of SocialObject
    rdfs:label "The legal norms of the Constitution" ;
    dul:isExpressedBy :ConstitutionText .
```

#### The Constitutive Role

Information doesn't just **describe** social objects - it **creates** them:

- Without the Constitution text being written, spoken, and communicated, constitutional law doesn't exist
- The social object (law) is **brought into existence** through its expression
- This is why `expresses` and `isExpressedBy` are fundamental properties

### 2.4 What is a Social Context?

A **social context** is a Situation that:

1. **Satisfies a Description** that defines social concepts (roles, norms, institutions)
2. **Includes social objects** (and often physical objects/agents playing social roles)
3. **Is grounded in communication** - exists because there's shared understanding

#### Characteristics of Social Contexts

**1. Normativity**
- Social contexts involve rules, obligations, permissions
- "In the context of university, professors have obligation to teach"

**2. Role-based structure**
- Agents play socially defined roles
- "In this meeting context, John plays Chair role, Mary plays Secretary role"

**3. Institutional grounding**
- Often tied to organizations, practices, conventions
- "In the context of US law, this document counts as a legal contract"

**4. Communicative maintenance**
- The context persists only as long as participants maintain shared understanding
- "This committee meeting context exists because we collectively understand it as such"

#### Modeling a Social Context

```turtle
# The social context: A university course session
:CourseSession_CS101_Spring2024 a dul:Situation ;
    rdfs:label "CS101 course session, Spring 2024" ;
    dul:satisfies :UniversityCourseStructure ;  # The institutional Description
    dul:includesAgent :ProfessorSmith ;
    dul:includesAgent :StudentJohn ;
    dul:includesObject :Classroom_A101 ;
    dul:includesTime :TimeInterval_Spring2024 .

# The institutional framework (Description)
:UniversityCourseStructure a dul:Description ;
    rdfs:label "University course structure" ;
    dul:defines :Role_Professor, :Role_Student, :Task_Teaching, :Task_Learning .

# Social objects (roles)
:Role_Professor a dul:Role ;
    rdfs:label "Professor role" ;
    dul:isDefinedIn :UniversityCourseStructure .

:Role_Student a dul:Role ;
    rdfs:label "Student role" ;
    dul:isDefinedIn :UniversityCourseStructure .

# Role assignments (classifications within the context)
:ProfSmith_as_Professor a dul:Situation ;
    rdfs:label "Prof Smith playing Professor role" ;
    dul:satisfies :UniversityCourseStructure ;
    dul:isSettingFor :ProfessorSmith ;
    dul:isSettingFor :Role_Professor ;
    dul:includesTime :TimeInterval_Spring2024 .

# The physical object (classroom) is in the context but isn't social
:Classroom_A101 a dul:PhysicalPlace ;
    rdfs:label "Classroom A101" .

# The agents can be both physical and social
:ProfessorSmith a dul:NaturalPerson ;  # Physical aspect
    rdfs:label "Professor Smith" .
    # The social aspect is the role-playing in context
```

### 2.5 Social Agents

**SocialAgent** is a special category that bridges Object and Agent:

#### Definition
Agents that are **socially constructed** - they exist through communication and shared understanding, but can act (have agency).

#### Types of Social Agents

**Organization**
```turtle
:MIT a dul:Organization ;
    rdfs:label "Massachusetts Institute of Technology" ;
    rdfs:comment "Internally structured, conventionally created agent" .

# Organizations act through physical agents
:PresidentSmith a dul:NaturalPerson .

:PresidentSmith dul:actsFor :MIT .

# Organizations must be expressed
:MIT_Charter a dul:InformationObject ;
    dul:expresses :MIT .
```

**Key properties of Organizations:**
- Internally structured (have defined roles)
- Conventionally created (require legal/social recognition)
- Require specific agents in specific roles to act
- Examples: companies, governments, institutions

**CollectiveAgent**
```turtle
:SoftwareDevTeam a dul:Group ;  # Group is a subclass of CollectiveAgent
    rdfs:label "Software Development Team" ;
    rdfs:comment "Collective with shared conceptualization" ;
    dul:hasMember :Alice, :Bob, :Carol .

:Alice a dul:NaturalPerson .
:Bob a dul:NaturalPerson .
:Carol a dul:NaturalPerson .
```

**Key properties of Collectives:**
- Less stable structure than Organizations
- Coordination through shared intentionality
- Members act collectively "as if" single agent
- Examples: committees, teams, movements, communities

#### Physical vs. Social Agency

| Aspect | PhysicalAgent | SocialAgent |
|--------|--------------|-------------|
| Basis | Biological/physical | Social/institutional |
| Examples | Humans, animals, robots | Organizations, groups, collectives |
| Existence | Independent | Through communication |
| Action mechanism | Physical causation | Social convention + physical agents acting for |

**Dual nature of persons:**

```turtle
# Physical aspect
:John a dul:NaturalPerson ;  # Biological organism
    a dul:PhysicalAgent .

# Social aspect (roles in contexts)
:John_Professor_Role a dul:Situation ;
    dul:isSettingFor :John ;
    dul:isSettingFor :Role_Professor .

# Or using SocialPerson
:John_SocialIdentity a dul:SocialPerson ;
    rdfs:label "John's social/legal identity" ;
    # Connected to physical John through appropriate relation
    :correspondsToPhysicalPerson :John .
```

### 2.6 Information Sharing and Social Contexts

**Information sharing is the mechanism that creates and maintains social contexts.**

#### The Process

1. **Expression**: Social objects are expressed in InformationObjects
2. **Realization**: InformationObjects are realized in physical/event forms (speech, writing)
3. **Transmission**: Realizations are perceived by agents
4. **Shared understanding**: Agents develop collective intentionality
5. **Context maintenance**: Continued communication sustains the social context

#### Example: Creating a Social Context Through Communication

```turtle
# Step 1: A plan is created (social object)
:MeetingAgenda a dul:Plan ;
    rdfs:label "Board meeting agenda" ;
    dul:defines :Role_Chair, :Role_Secretary, :Task_OpeningRemarks .

# Step 2: The plan is expressed in information
:MeetingAgendaDocument a dul:InformationObject ;
    rdfs:label "Meeting agenda text" ;
    dul:expresses :MeetingAgenda .

# Step 3: Information is realized (communicated)
:EmailAnnouncement a dul:InformationRealization ;
    a dul:Event ;  # Sending email is an event
    rdfs:label "Email announcing meeting" ;
    dul:realizes :MeetingAgendaDocument .

:PrintedAgenda a dul:InformationRealization ;
    a dul:PhysicalObject ;  # Printed paper
    rdfs:label "Printed agenda copies" ;
    dul:realizes :MeetingAgendaDocument .

# Step 4: Agents receive and understand
:Alice dul:isParticipantIn :EmailAnnouncement .
:Bob dul:isParticipantIn :EmailAnnouncement .

# Step 5: Social context is established (shared understanding)
:BoardMeeting_June15 a dul:PlanExecution ;
    rdfs:label "Board meeting execution" ;
    dul:satisfies :MeetingAgenda ;  # The communicated plan
    dul:includesAgent :Alice, :Bob, :Carol ;
    dul:includesTime :TimeInterval_June15 .

# The meeting context exists BECAUSE the agenda was communicated and shared
```

### 2.7 Complete Example: A Marriage (Quintessential Social Object)

Marriage exemplifies all aspects of social objects:

```turtle
# The social object: the marriage itself
:Marriage_Alice_Bob a dul:SocialObject ;
    rdfs:label "Marriage between Alice and Bob" .

# The institutional framework
:MarriageLaw a dul:Norm ;
    rdfs:label "Marriage law" ;
    dul:defines :Role_Spouse, :Contract_Marriage .

# The marriage contract (social object)
:Marriage_Alice_Bob a dul:Contract ;
    dul:satisfies :MarriageLaw ;
    dul:defines :Role_Husband, :Role_Wife .

# Expression in information
:MarriageCertificateText a dul:InformationObject ;
    rdfs:label "Marriage certificate (abstract)" ;
    dul:expresses :Marriage_Alice_Bob .

# Physical realization
:MarriageCertificate_Copy1 a dul:InformationRealization ;
    a dul:PhysicalObject ;
    rdfs:label "Physical marriage certificate" ;
    dul:realizes :MarriageCertificateText .

# The ceremonial event (communication/establishment)
:WeddingCeremony a dul:Action ;
    rdfs:label "Wedding ceremony" ;
    dul:hasParticipant :Alice, :Bob, :Officiant ;
    dul:hasTimeInterval :TimeInterval_June15_2024 .

# This action realizes the marriage information
:OfficiantSpeech a dul:InformationRealization ;
    a dul:Event ;
    rdfs:label "Officiant's pronouncement" ;
    dul:realizes :MarriageCertificateText ;
    dul:isPartOf :WeddingCeremony .

# The ongoing social context (marriage situation)
:MarriageContext_Alice_Bob a dul:Situation ;
    rdfs:label "Alice and Bob's marriage context" ;
    dul:satisfies :MarriageLaw ;
    dul:includesAgent :Alice, :Bob ;
    dul:includesTime :TimeInterval_June15_2024_onwards .

# Role assignments
:Alice_as_Spouse a dul:Situation ;
    dul:satisfies :MarriageLaw ;
    dul:isSettingFor :Alice ;
    dul:isSettingFor :Role_Spouse .

:Bob_as_Spouse a dul:Situation ;
    dul:satisfies :MarriageLaw ;
    dul:isSettingFor :Bob ;
    dul:isSettingFor :Role_Spouse .

# Physical persons (not social)
:Alice a dul:NaturalPerson ;
    rdfs:label "Alice (as biological person)" .

:Bob a dul:NaturalPerson ;
    rdfs:label "Bob (as biological person)" .
```

**Key observations:**
- The marriage **cannot exist** without being expressed (certificate, ceremony, social recognition)
- Remove all communication/documentation → marriage ceases to exist socially
- Alice and Bob as **physical persons** continue to exist, but their **social relation** (marriage) depends on information and context
- The wedding ceremony is the **communicative act** that establishes the social reality

### 2.8 Summary: Criteria for Social Objects

An entity is **social** (SocialObject) if and only if:

1. ✅ **Existence through communication**: It cannot exist without being expressed in InformationObjects
2. ✅ **Collective intentionality**: It requires shared understanding among agents
3. ✅ **Institutional grounding**: It typically involves status functions, roles, or norms
4. ✅ **Independence from physical substrate**: The "same" social object can be realized through different physical means

An entity is **NOT social** if:
- ❌ It exists independently of communication (e.g., rocks, trees, bodies)
- ❌ It has spatial location and mass as primary characteristics
- ❌ It would continue to exist if all humans disappeared

### 2.9 Social Context Summary

A **social context** is:
- A **Situation** that includes social objects, roles, and agents
- **Grounded in Descriptions** that define institutional/social structures
- **Maintained through communication** and shared understanding
- **Temporally bounded** - exists for specific time intervals
- **Normative** - involves obligations, permissions, rules

---

## 3. Modeling Event Descriptions: Agentive, Stative, and Experiential Situations

### Question
There are different types of Descriptions, but I'm not grasping how to classify simple "event descriptions", like "the man abandoned the woman", "the tree grows in the garden", "the water is hot", etc. In other words, how can I classify descriptions of agentive, stative, and experiential situations?

### Answer

This question goes to the heart of how DUL handles **event types and situational descriptions**. Let's systematically work through different types of situations and how to model them.

### 3.1 Understanding DUL's Approach to Events

First, a key principle: **DUL Events are aspectually neutral**.

What does this mean?
- The same real-world occurrence can be viewed as an accomplishment, achievement, process, or state
- DUL doesn't force events into aspectual categories at the Event class level
- Instead, **use Situations to provide aspectual interpretations**

#### The Event Hierarchy

```
Event
├── Action (event with at least one Agent)
└── Process (event without agentive focus)
```

Plus:
- **State**: Often treated as a special kind of event (or quality-bearing situation)

### 3.2 Three Types of Situations

Let's work through your examples using three major categories:

#### Type 1: Agentive Situations (Actions)
**Characteristics:**
- Involves intentional agents
- Goal-directed activity
- Typically modeled as Action + Plan/Task

**Example: "The man abandoned the woman"**

#### Type 2: Process/Stative Situations
**Characteristics:**
- Natural processes or states
- No intentional agent (or non-human agents)
- Growth, change, maintenance of state

**Example: "The tree grows in the garden"**

#### Type 3: State/Quality Situations
**Characteristics:**
- Attributes or qualities of objects
- Stative (no change implied)
- Often about object properties

**Example: "The water is hot"**

### 3.3 Type 1: Agentive Situations - "The man abandoned the woman"

This is an **intentional action** with an agent and (typically) a patient.

#### Analysis
- **Agent**: The man (performs intentional action)
- **Action type**: Abandoning (a task/event type)
- **Patient/Theme**: The woman (affected participant)
- **Description type**: Could be Narrative (storytelling), Plan (if prescribed), or Norm (if evaluating obligation)

#### Modeling Approach

```turtle
# The concrete event (what actually happened)
:AbandonmentEvent_123 a dul:Action ;
    rdfs:label "The man abandoning the woman" ;
    dul:hasParticipant :TheMan, :TheWoman ;
    dul:hasTimeInterval :TimeInterval_SomeTime .

# Participants
:TheMan a dul:NaturalPerson ;
    rdfs:label "The man" .

:TheWoman a dul:NaturalPerson ;
    rdfs:label "The woman" .

# The event type (concept of abandonment)
:Task_Abandoning a dul:Task ;
    rdfs:label "Abandoning (as an action type)" ;
    dul:isDefinedIn :NarrativeDescription_Story .

# The description that frames this event
:NarrativeDescription_Story a dul:Narrative ;
    rdfs:label "The story/narrative framing" ;
    dul:defines :Task_Abandoning, :Role_Abandoner, :Role_Abandoned .

# The situation (contextualized view of the event)
:AbandonmentSituation a dul:Situation ;
    rdfs:label "Abandonment situation" ;
    dul:satisfies :NarrativeDescription_Story ;
    dul:includesAction :AbandonmentEvent_123 ;
    dul:includesAgent :TheMan, :TheWoman ;
    dul:includesTime :TimeInterval_SomeTime .

# Role assignments (who plays what role)
:TheMan_as_Abandoner a dul:Situation ;
    rdfs:label "The man as abandoner" ;
    dul:satisfies :NarrativeDescription_Story ;
    dul:isSettingFor :TheMan ;
    dul:isSettingFor :Role_Abandoner .

:TheWoman_as_Abandoned a dul:Situation ;
    rdfs:label "The woman as abandoned" ;
    dul:satisfies :NarrativeDescription_Story ;
    dul:isSettingFor :TheWoman ;
    dul:isSettingFor :Role_Abandoned .

# The action executes the task type
:AbandonmentEvent_123 dul:executesTask :Task_Abandoning .
```

#### Alternative: If Evaluating Against Norms

If we're evaluating whether the abandonment violates obligations:

```turtle
# Moral/legal framework
:MoralFramework a dul:Norm ;
    rdfs:label "Moral obligations in relationships" ;
    dul:defines :Role_Partner, :Obligation_Loyalty .

# The abandonment situation evaluated against norms
:AbandonmentSituation a dul:Situation ;
    rdfs:label "Abandonment evaluated morally" ;
    dul:satisfies :MoralFramework ;  # Or: violates
    dul:includesAction :AbandonmentEvent_123 .

# This allows reasoning: does this action satisfy or violate the norm?
```

### 3.4 Type 2: Process Situations - "The tree grows in the garden"

This is a **natural process** without intentional agency.

#### Analysis
- **Subject**: The tree (undergoing change)
- **Process type**: Growing (biological process)
- **Location**: The garden
- **Description type**: Could be Theory (biological growth theory), Narrative (observational account), or Diagnosis (state assessment)

#### Modeling Approach

```turtle
# The process event
:TreeGrowthProcess a dul:Process ;
    rdfs:label "The tree growing" ;
    dul:hasParticipant :TheTree ;
    dul:hasTimeInterval :TimeInterval_2020_2024 .

# The tree (participant)
:TheTree a dul:BiologicalObject ;
    rdfs:label "The tree" ;
    dul:hasLocation :TheGarden .

# The location
:TheGarden a dul:PhysicalPlace ;
    rdfs:label "The garden" .

# Event type (concept of growing)
:EventType_Growing a dul:EventType ;
    rdfs:label "Growing (biological process type)" ;
    dul:isDefinedIn :BiologicalTheory .

# The description (biological theory)
:BiologicalTheory a dul:Theory ;
    rdfs:label "Plant biology theory" ;
    dul:defines :EventType_Growing, :Concept_Plant .

# The situation (contextualized view)
:GrowthSituation a dul:Situation ;
    rdfs:label "Tree growth situation" ;
    dul:satisfies :BiologicalTheory ;
    dul:includesEvent :TreeGrowthProcess ;
    dul:includesObject :TheTree ;
    dul:includesTime :TimeInterval_2020_2024 .

# Classification: tree as plant
:TheTree dul:isClassifiedBy :Concept_Plant .
```

#### Alternative: As a Narrative/Observation

If describing an observed occurrence:

```turtle
# Narrative/observational account
:GardenNarrative a dul:Narrative ;
    rdfs:label "Observations of the garden" ;
    dul:defines :EventType_Growing .

:GrowthSituation a dul:Situation ;
    rdfs:label "Observed tree growth" ;
    dul:satisfies :GardenNarrative ;
    dul:includesEvent :TreeGrowthProcess ;
    dul:includesObject :TheTree ;
    dul:includesObject :TheGarden .
```

#### Alternative: As Transition (State Change)

If emphasizing the change aspect:

```turtle
# Before state
:TreeState_Small a dul:Situation ;
    rdfs:label "Tree is small" ;
    dul:isSettingFor :TheTree ;
    dul:includesTime :TimeInterval_2020 .

# After state
:TreeState_Large a dul:Situation ;
    rdfs:label "Tree is large" ;
    dul:isSettingFor :TheTree ;
    dul:includesTime :TimeInterval_2024 .

# The transition (growth as change)
:GrowthTransition a dul:Transition ;
    rdfs:label "Tree growth as transition" ;
    dul:hasPrecondition :TreeState_Small ;
    dul:hasPostcondition :TreeState_Large ;
    dul:includesEvent :TreeGrowthProcess .
```

### 3.5 Type 3: State/Quality Situations - "The water is hot"

This is a **stative situation** describing an object's property.

#### Analysis
- **Subject**: The water
- **Property**: Temperature (hot)
- **State type**: Stative (no change implied in the statement)
- **Description type**: Could be Diagnosis (state assessment), Theory (thermodynamics), or simple Description

#### Modeling Approach A: Using Qualities (Fine-grained)

```turtle
# The water (object)
:TheWater a dul:Substance ;
    rdfs:label "The water sample" ;
    dul:hasQuality :TheWater_Temperature .

# The quality (individual temperature aspect)
:TheWater_Temperature a dul:Quality ;
    rdfs:label "The water's temperature" ;
    dul:isQualityOf :TheWater ;
    dul:hasRegion :Region_Hot .

# The region (value: "hot")
:Region_Hot a dul:PhysicalAttribute ;
    rdfs:label "Hot temperature" ;
    dul:hasRegionDataValue "80"^^xsd:decimal ;  # Celsius
    :temperatureUnit :Celsius .

# Parameter (temperature as attribute type)
:Parameter_Temperature a dul:Parameter ;
    rdfs:label "Temperature parameter" ;
    dul:classifies :Region_Hot .

# Description that defines temperature concepts
:ThermodynamicsTheory a dul:Theory ;
    rdfs:label "Thermodynamics theory" ;
    dul:defines :Parameter_Temperature, :Concept_Hot, :Concept_Cold .

# Concept of "hot"
:Concept_Hot a dul:Concept ;
    rdfs:label "Hot (temperature concept)" ;
    dul:isDefinedIn :ThermodynamicsTheory ;
    dul:classifies :Region_Hot .

# The stative situation
:WaterHotSituation a dul:Situation ;
    rdfs:label "The water being hot" ;
    dul:satisfies :ThermodynamicsTheory ;
    dul:includesObject :TheWater ;
    dul:includesQuality :TheWater_Temperature ;
    dul:includesTime :TimeInterval_Now .
```

#### Modeling Approach B: Direct Property (Simplified)

If fine-grained quality tracking isn't needed:

```turtle
# The water
:TheWater a dul:Substance ;
    rdfs:label "The water" ;
    :hasTemperature :Region_Hot .

# The temperature value
:Region_Hot a dul:PhysicalAttribute ;
    rdfs:label "Hot" ;
    dul:hasRegionDataValue "80"^^xsd:decimal .

# Simple classification
:Concept_Hot dul:classifies :TheWater .
```

#### Alternative: As Diagnosis (State Assessment)

If the statement is part of a diagnostic assessment:

```turtle
# Diagnostic framework (e.g., cooking recipe)
:CookingDiagnosis a dul:Diagnosis ;
    rdfs:label "Assessment of cooking state" ;
    dul:defines :Concept_Hot, :Concept_Ready .

# The diagnostic situation
:WaterAssessment a dul:Situation ;
    rdfs:label "Assessing water temperature" ;
    dul:satisfies :CookingDiagnosis ;
    dul:includesObject :TheWater ;
    dul:includesTime :TimeInterval_Now .

# Classification within diagnostic context
:Concept_Hot dul:classifies :TheWater .

# Diagnostic interpretation: water is ready for next step
:Concept_Ready dul:classifies :WaterAssessment .
```

### 3.6 Choosing the Right Description Type

Here's a decision guide for selecting Description types:

| Description Type | When to Use | Example Context |
|-----------------|-------------|-----------------|
| **Plan** | Prescribed actions, recipes, procedures | "To make tea, boil water" → boiling is a Task |
| **Narrative** | Storytelling, historical accounts, observations | "The man abandoned the woman" (story) |
| **Theory** | Scientific/explanatory framework | "Trees grow through photosynthesis" |
| **Diagnosis** | State assessment, system status | "The water is hot (ready for tea)" |
| **Norm** | Rules, obligations, evaluations | "Abandoning family violates moral duty" |
| **Design** | Structure/function descriptions | "The kettle is designed to heat water" |
| **Goal** | Desired states | "The goal is hot water for tea" |

### 3.7 Complete Example: A Complex Scenario

Let's model a richer scenario: **"Alice prepared tea in the kitchen by boiling water at 100°C"**

This involves:
- Agentive action (preparing, boiling)
- Process (heating)
- State (temperature)
- Location (kitchen)

```turtle
# ========== Entities ==========

# Agent
:Alice a dul:NaturalPerson ;
    rdfs:label "Alice" .

# Objects
:TheWater a dul:Substance ;
    rdfs:label "Water sample" .

:TheKettle a dul:DesignedArtifact ;
    rdfs:label "Electric kettle" .

:TheKitchen a dul:PhysicalPlace ;
    rdfs:label "The kitchen" .

# ========== The Plan (Recipe) ==========

:TeaRecipe a dul:Plan ;
    rdfs:label "Tea preparation recipe" ;
    dul:defines :Role_TeaMaker, :Task_BoilWater, :Task_PrepareTea, :Parameter_BoilingTemp .

:Role_TeaMaker a dul:Role ;
    rdfs:label "Tea maker" ;
    dul:isDefinedIn :TeaRecipe .

:Task_BoilWater a dul:Task ;
    rdfs:label "Boil water" ;
    dul:isDefinedIn :TeaRecipe ;
    dul:hasParameter :Parameter_BoilingTemp .

:Task_PrepareTea a dul:Task ;
    rdfs:label "Prepare tea" ;
    dul:isDefinedIn :TeaRecipe .

:Parameter_BoilingTemp a dul:Parameter ;
    rdfs:label "Boiling temperature (100°C)" ;
    dul:isDefinedIn :TeaRecipe .

# Task sequencing
:Task_BoilWater dul:directlyPrecedes :Task_PrepareTea .

# ========== The Events ==========

# Overall action: tea preparation
:TeaPreparation_Event a dul:Action ;
    rdfs:label "Alice preparing tea" ;
    dul:hasParticipant :Alice, :TheWater, :TheKettle ;
    dul:hasLocation :TheKitchen ;
    dul:hasTimeInterval :TimeInterval_Morning ;
    dul:executesTask :Task_PrepareTea .

# Sub-action: boiling water
:BoilingAction a dul:Action ;
    rdfs:label "Boiling the water" ;
    dul:hasParticipant :Alice, :TheWater, :TheKettle ;
    dul:executesTask :Task_BoilWater ;
    dul:isPartOf :TeaPreparation_Event .

# Process: heating (physical process)
:HeatingProcess a dul:Process ;
    rdfs:label "Water heating process" ;
    dul:hasParticipant :TheWater ;
    dul:isPartOf :BoilingAction .

# ========== States/Qualities ==========

# Water temperature quality
:WaterTemp a dul:Quality ;
    rdfs:label "Water temperature" ;
    dul:isQualityOf :TheWater .

# Before: cold
:ColdRegion a dul:PhysicalAttribute ;
    rdfs:label "Cold (20°C)" ;
    dul:hasRegionDataValue "20"^^xsd:decimal .

# After: hot (boiling)
:BoilingRegion a dul:PhysicalAttribute ;
    rdfs:label "Boiling (100°C)" ;
    dul:hasRegionDataValue "100"^^xsd:decimal .

# Transition
:WaterHeatingTransition a dul:Transition ;
    rdfs:label "Water heating transition" ;
    dul:includesEvent :HeatingProcess .

:BeforeState a dul:Situation ;
    rdfs:label "Water is cold" ;
    dul:isSettingFor :TheWater ;
    dul:includesTime :TimeInterval_Before .

:WaterTemp dul:hasRegion :ColdRegion .

:AfterState a dul:Situation ;
    rdfs:label "Water is boiling" ;
    dul:isSettingFor :TheWater ;
    dul:includesTime :TimeInterval_After .

:WaterTemp dul:hasRegion :BoilingRegion .

:WaterHeatingTransition dul:hasPrecondition :BeforeState ;
    dul:hasPostcondition :AfterState .

# ========== The Situation (Overall Context) ==========

:TeaPreparationSituation a dul:PlanExecution ;
    rdfs:label "Alice's tea preparation session" ;
    dul:satisfies :TeaRecipe ;
    dul:includesAgent :Alice ;
    dul:includesAction :TeaPreparation_Event, :BoilingAction ;
    dul:includesEvent :HeatingProcess ;
    dul:includesObject :TheWater, :TheKettle ;
    dul:includesTime :TimeInterval_Morning .

# Role assignment
:Alice_as_TeaMaker a dul:Situation ;
    rdfs:label "Alice playing tea maker role" ;
    dul:satisfies :TeaRecipe ;
    dul:isSettingFor :Alice ;
    dul:isSettingFor :Role_TeaMaker .

# ========== Diagnostic Situation (State Check) ==========

:WaterTempDiagnosis a dul:Diagnosis ;
    rdfs:label "Water temperature check" ;
    dul:defines :Concept_Boiling, :Concept_Ready .

:TempCheckSituation a dul:Situation ;
    rdfs:label "Checking if water reached boiling point" ;
    dul:satisfies :WaterTempDiagnosis ;
    dul:includesObject :TheWater ;
    dul:includesQuality :WaterTemp ;
    dul:includesTime :TimeInterval_After .

:Concept_Boiling dul:classifies :BoilingRegion .
:Concept_Ready dul:classifies :TempCheckSituation .
```

### 3.8 Summary Table: Event Description Patterns

| Situation Type | Event Class | Description Type | Key Pattern | Example |
|----------------|-------------|------------------|-------------|---------|
| **Agentive (intentional action)** | Action | Plan, Narrative, Norm | Action + Agent + Task + Role | "Man abandons woman" |
| **Process (natural change)** | Process | Theory, Narrative | Process + Object + EventType | "Tree grows" |
| **State (static property)** | (Quality/Situation) | Diagnosis, Theory, Description | Object + Quality + Region | "Water is hot" |
| **Transition (change)** | Event | Theory, Narrative, Diagnosis | Transition + Precondition + Postcondition | "Water becomes hot" |
| **Complex (multi-aspect)** | Multiple | Multiple | Situation + multiple sub-events | "Alice prepared tea" |

### 3.9 Key Principles

1. **Events are neutral, Situations provide interpretation**
   - Same event can be in multiple situations with different framings

2. **Choose Description type based on purpose**
   - Prescribing action → Plan
   - Explaining causation → Theory
   - Telling story → Narrative
   - Assessing state → Diagnosis
   - Evaluating against rules → Norm

3. **Agentive = Action + Task**
   - Actions execute Tasks defined in Descriptions
   - Agents play Roles defined in Descriptions

4. **States can be modeled multiple ways**
   - Fine-grained: Quality + Region + Situation
   - Simple: Direct property + classification
   - Diagnostic: Situation satisfying Diagnosis

5. **Processes vs. Actions**
   - Process: No intentional agent or non-human agent
   - Action: At least one intentional agent

6. **Complex scenarios need layered modeling**
   - Overall Situation satisfying high-level Description
   - Sub-events and sub-situations for components
   - Transitions for state changes
   - Role/task assignments for agents

---

## Conclusion

These three advanced topics reveal the depth of DUL's philosophical foundations:

1. **Classification** is not mere taxonomy but a contextualized, temporal relation that can be represented as direct properties (simple cases) or reified Situations (complex cases with context).

2. **Social objects and contexts** are fundamentally grounded in **communication and shared understanding**. They exist through expression in information objects and are maintained through social practices. The criterion is ontological dependence on communication.

3. **Event descriptions** require careful consideration of:
   - Agentivity (Action vs. Process)
   - Aspect (state, transition, accomplishment)
   - Purpose (Plan for prescription, Narrative for storytelling, Theory for explanation, Diagnosis for assessment, Norm for evaluation)

The power of DUL lies in its ability to model not just "what exists" but **how we conceptualize and contextualize what exists** - making it ideal for domains where meaning, interpretation, and social reality are central.

---

**Related Documentation**:
- See [DUL_Documentation.md](DUL_Documentation.md) for comprehensive coverage of DUL classes and patterns.
- See [DUL_FAQ.md](DUL_FAQ.md) for answers to common modeling questions.

**Version**: 1.0
**Last Updated**: 2025-11-04
**Topics Covered**: Classification patterns, social ontology, event description modeling
