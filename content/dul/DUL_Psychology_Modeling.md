# Modeling Psychological and Cognitive Concepts in DUL

## Table of Contents
1. [Introduction: Why DUL Doesn't Directly Model Psychology](#1-introduction-why-dul-doesnt-directly-model-psychology)
2. [Mapping Psychological Phenomena to DUL Categories](#2-mapping-psychological-phenomena-to-dul-categories)
3. [Modeling Mental States and Emotions](#3-modeling-mental-states-and-emotions)
4. [Modeling Cognitive Processes](#4-modeling-cognitive-processes)
5. [Modeling Propositional Attitudes: Beliefs, Desires, Intentions](#5-modeling-propositional-attitudes-beliefs-desires-intentions)
6. [Modeling Knowledge](#6-modeling-knowledge)
7. [Modeling Cognitive Capacities and Traits](#7-modeling-cognitive-capacities-and-traits)
8. [Complete Example: Integrated Psychological Model](#8-complete-example-integrated-psychological-model)
9. [Guidelines and Best Practices](#9-guidelines-and-best-practices)

---

## 1. Introduction: Why DUL Doesn't Directly Model Psychology

### Question
I noted that DUL doesn't handle (at least directly) questions related to psychological/cognitive concepts, like "attention", "memory", "intelligence", "knowledge", etc., neither about concepts related to emotions, like "love", "sadness", etc. How could this kind of concepts be handled in DUL?

### Answer

DUL is a **foundational ontology**, not a **domain ontology**. Its purpose is to provide reusable patterns and fundamental categories that can be specialized for any domain—including psychology.

#### 1.1 Why No Direct Psychological Classes?

**Design Philosophy:**
- DUL provides **abstract patterns** (Quality-Region, D&S, Participation) rather than domain-specific concepts
- Psychology/cognitive science is a **domain** that should **extend** DUL, not be part of it
- DUL avoids commitment to specific psychological theories (behaviorism, cognitivism, etc.)

**What DUL Does Provide:**
- **Event** explicitly includes "mental process, event, or state"
- **Agent** provides the basis for intentional beings
- **Quality** can represent mental/emotional qualities
- **Situation** can model mental states as contextualized views
- **Description** can represent mental representations/theories
- **InformationObject** relates to abstract information/knowledge

#### 1.2 The Approach: Extension, Not Invention

To model psychological concepts in DUL:
1. **Identify the ontological category** (Event, Quality, Situation, etc.)
2. **Specialize DUL classes** for psychological domain
3. **Apply DUL patterns** (D&S, Quality-Region, Participation)
4. **Use Descriptions** to represent psychological theories/frameworks

The result is a **psychology ontology grounded in DUL's foundational categories**.

---

## 2. Mapping Psychological Phenomena to DUL Categories

### 2.1 Categories of Psychological Phenomena

| Psychological Category | DUL Mapping | Rationale |
|------------------------|-------------|-----------|
| **Mental States** (emotions, moods, feelings) | Quality, Situation | States are aspects of agents, or contextualized views |
| **Mental Processes** (attention, perception, reasoning, memory) | Event (Process/Action) | Processes are events with temporal extent |
| **Cognitive Capacities** (intelligence, wisdom, creativity) | Parameter, Concept | Capacities classify agents or constrain their qualities |
| **Propositional Attitudes** (beliefs, desires, intentions) | Situation + Description | Attitudes relate agents to propositions (descriptions) |
| **Knowledge** (knowing that, knowing how) | InformationObject, Description | Knowledge is abstract information or conceptual framework |
| **Phenomenological Experience** (qualia, consciousness) | Quality, Situation | Subjective aspects or contextualized experiences |
| **Personality Traits** (extroversion, neuroticism) | Parameter, Role | Traits classify agents based on behavioral patterns |
| **Mental Content** (thoughts, concepts, memories) | InformationObject, Concept | Content is abstract information |

### 2.2 General Principles

#### Principle 1: Mental Events as Events
Mental processes (thinking, attending, remembering) are **Events** in DUL's sense:
```turtle
:ThinkingProcess a dul:Process ;
    a :MentalProcess ;  # Domain-specific subclass
    rdfs:subClassOf dul:Event .
```

#### Principle 2: Mental States as Qualities or Situations
Emotional/cognitive states can be:
- **Qualities**: When modeling as aspects of agents
- **Situations**: When modeling as contextualized, relational states

#### Principle 3: Propositional Attitudes via D&S Pattern
Beliefs, desires, etc. relate agents to **Descriptions** (propositions) via **Situations**:
```turtle
:John_believes_X a dul:Situation ;
    dul:includesAgent :John ;
    dul:satisfies :Proposition_X .
```

#### Principle 4: Psychological Theories as Descriptions
Different psychological frameworks (behaviorism, cognitivism, psychoanalysis) are **Descriptions** that define different **Concepts** for the same phenomena.

---

## 3. Modeling Mental States and Emotions

### 3.1 Emotions as Mental States

Emotions have multiple modeling options depending on what you need to represent.

#### Approach A: Emotions as Qualities

When modeling emotions as **aspects of agents**:

```turtle
# Domain-specific classes
:MentalQuality rdfs:subClassOf dul:Quality ;
    rdfs:label "Mental or emotional quality" .

:EmotionalState rdfs:subClassOf :MentalQuality ;
    rdfs:label "Emotional state quality" .

# Specific emotion instance
:JohnsSadness a :EmotionalState ;
    rdfs:label "John's sadness (his specific emotional state)" ;
    dul:isQualityOf :John ;
    dul:hasRegion :SadnessRegion .

# The person
:John a dul:NaturalPerson ;
    dul:hasQuality :JohnsSadness .

# The emotion value (region)
:SadnessRegion a :EmotionalValueRegion ;
    rdfs:label "Sadness (emotional value)" ;
    rdfs:subClassOf dul:SocialObjectAttribute .

# Parameter (emotion type)
:EmotionType_Sadness a dul:Parameter ;
    rdfs:label "Sadness (emotion type)" ;
    dul:classifies :SadnessRegion .
```

**When to use:**
- Tracking individual emotional states over time
- Modeling intensity or valence as region values
- Relating emotions to physiological qualities (heart rate, etc.)

#### Approach B: Emotions as Situations

When modeling emotions as **relational states** (especially directed emotions):

```turtle
# "John loves Mary" - love as directed emotion

# Psychological theory/framework
:EmotionalFramework a dul:Theory ;
    rdfs:label "Theory of emotions" ;
    dul:defines :Concept_Love, :Role_Lover, :Role_Beloved .

# Emotion concepts
:Concept_Love a dul:Concept ;
    rdfs:label "Love (emotion concept)" ;
    dul:isDefinedIn :EmotionalFramework .

# Roles
:Role_Lover a dul:Role ;
    dul:isDefinedIn :EmotionalFramework .

:Role_Beloved a dul:Role ;
    dul:isDefinedIn :EmotionalFramework .

# The emotional situation
:LoveSituation_John_Mary a dul:Situation ;
    rdfs:label "John loving Mary" ;
    dul:satisfies :EmotionalFramework ;
    dul:includesAgent :John ;
    dul:includesAgent :Mary ;
    dul:includesTime :TimeInterval_Current .

# Role assignments
:John dul:hasRole :Role_Lover .
:Mary dul:hasRole :Role_Beloved .

# Classification
:Concept_Love dul:classifies :LoveSituation_John_Mary .
```

**When to use:**
- Directed emotions (love, hate, fear toward something/someone)
- Social emotions requiring multiple participants
- Modeling emotional relationships

#### Approach C: Emotions as Events (Emotional Processes)

When modeling emotions as **occurring processes** (feeling, experiencing):

```turtle
# Domain-specific class
:EmotionalProcess rdfs:subClassOf dul:Process ;
    rdfs:label "Emotional process or experience" .

# "John experiences sadness"
:SadnessExperience a :EmotionalProcess ;
    rdfs:label "John experiencing sadness" ;
    dul:hasParticipant :John ;
    dul:hasTimeInterval :TimeInterval_Yesterday .

# The emotion type as EventType
:EventType_Sadness a dul:EventType ;
    rdfs:label "Experiencing sadness (event type)" .

:SadnessExperience dul:isClassifiedBy :EventType_Sadness .
```

**When to use:**
- Onset, duration, and termination of emotions are important
- Emotional episodes as distinct occurrences
- Temporal dynamics of emotional experience

### 3.2 Moods vs. Emotions

**Moods**: Diffuse, longer-lasting → Model as Qualities
**Emotions**: Object-directed, episodic → Model as Situations or Events

```turtle
# Mood as quality
:JohnsMood a :MoodQuality ;
    rdfs:subClassOf :MentalQuality ;
    dul:isQualityOf :John ;
    dul:hasRegion :MelancholicMood .

# Emotion as situation (directed)
:AngerSituation a dul:Situation ;
    rdfs:label "John's anger at the delay" ;
    dul:includesAgent :John ;
    dul:includesObject :TheDelay ;
    dul:satisfies :EmotionalFramework .
```

### 3.3 Complete Emotion Example: "John is sad because Mary left"

```turtle
# ========== Entities ==========

:John a dul:NaturalPerson .
:Mary a dul:NaturalPerson .

# ========== The Triggering Event ==========

:MaryLeavingEvent a dul:Action ;
    rdfs:label "Mary leaving" ;
    dul:hasParticipant :Mary ;
    dul:hasTimeInterval :TimeInterval_Yesterday .

# ========== Emotional State (Quality) ==========

:JohnsSadness a :EmotionalState ;
    rdfs:label "John's sadness" ;
    dul:isQualityOf :John ;
    dul:hasRegion :IntenseSadness .

:IntenseSadness a :EmotionalValueRegion ;
    rdfs:label "Intense sadness" ;
    :intensityValue "8"^^xsd:integer ;  # Scale 0-10
    :valence "negative" .

# ========== Emotional Situation (Contextualized) ==========

:JohnsSadnessSituation a dul:Situation ;
    rdfs:label "John being sad about Mary leaving" ;
    dul:satisfies :EmotionalFramework ;
    dul:includesAgent :John ;
    dul:includesQuality :JohnsSadness ;
    dul:includesEvent :MaryLeavingEvent ;  # The trigger
    dul:includesTime :TimeInterval_Now .

# ========== Causal Relation ==========

# The leaving event precedes the sadness situation
:MaryLeavingEvent dul:precedes :JohnsSadnessSituation .

# Or use explicit causation (if you extend DUL)
:JohnsSadnessSituation :causedBy :MaryLeavingEvent .
```

---

## 4. Modeling Cognitive Processes

### 4.1 Cognitive Processes as Mental Events

Cognitive processes (attention, perception, reasoning, memory retrieval) are **Events** (typically **Process** or **Action**).

#### General Pattern

```turtle
# Domain-specific class
:CognitiveProcess rdfs:subClassOf dul:Process ;
    rdfs:label "Cognitive process" .

# Specific cognitive processes
:AttentionProcess rdfs:subClassOf :CognitiveProcess .
:PerceptionProcess rdfs:subClassOf :CognitiveProcess .
:ReasoningProcess rdfs:subClassOf :CognitiveProcess .
:MemoryRetrieval rdfs:subClassOf :CognitiveProcess .
```

### 4.2 Example: Attention

**"John is paying attention to the lecture"**

```turtle
# The cognitive process
:AttentionProcess_John a :AttentionProcess ;
    rdfs:label "John paying attention to the lecture" ;
    dul:hasParticipant :John ;  # The attending agent
    dul:hasParticipant :TheLecture ;  # The attended object/event
    dul:hasTimeInterval :TimeInterval_Now .

# The lecture (the object of attention)
:TheLecture a dul:Event ;
    rdfs:label "The lecture event" ;
    dul:hasParticipant :Professor .

# Cognitive framework
:CognitiveTheory a dul:Theory ;
    rdfs:label "Cognitive psychology theory" ;
    dul:defines :EventType_Attention, :Role_Attender, :Concept_Focus .

# Event type
:EventType_Attention a dul:EventType ;
    rdfs:label "Attention (cognitive process type)" ;
    dul:isDefinedIn :CognitiveTheory .

:AttentionProcess_John dul:isClassifiedBy :EventType_Attention .

# Situation (contextualized view)
:AttentionSituation a dul:Situation ;
    rdfs:label "John's attention directed at lecture" ;
    dul:satisfies :CognitiveTheory ;
    dul:includesEvent :AttentionProcess_John ;
    dul:includesAgent :John ;
    dul:includesEvent :TheLecture .
```

### 4.3 Example: Memory

Memory has multiple aspects:
- **Memory process** (remembering, recalling) → Event
- **Memory content** (what is remembered) → InformationObject or Description
- **Memory trace** (the stored representation) → InformationObject

**"John remembers his childhood"**

```turtle
# ========== The Remembering Process (Event) ==========

:RememberingProcess a :MemoryRetrieval ;
    rdfs:subClassOf :CognitiveProcess ;
    rdfs:label "John remembering his childhood" ;
    dul:hasParticipant :John ;
    dul:hasTimeInterval :TimeInterval_Now .

# ========== The Memory Content (What is Remembered) ==========

:JohnsChildhoodNarrative a dul:Narrative ;
    rdfs:label "Narrative of John's childhood" ;
    dul:defines :Event_ChildhoodExperience .

# Specific remembered event
:Event_ChildhoodExperience a dul:Event ;
    rdfs:label "John's childhood experiences" ;
    dul:hasParticipant :YoungJohn ;
    dul:hasTimeInterval :TimeInterval_1990s .

# ========== The Memory Trace (Information Object) ==========

:MemoryTrace_Childhood a dul:InformationObject ;
    rdfs:label "John's memory trace of childhood" ;
    dul:expresses :JohnsChildhoodNarrative ;
    :storedBy :John .  # Extension property

# ========== The Remembering Situation ==========

:RememberingSituation a dul:Situation ;
    rdfs:label "John remembering his childhood" ;
    dul:satisfies :MemoryTheory ;
    dul:includesAgent :John ;
    dul:includesEvent :RememberingProcess ;
    dul:includesObject :MemoryTrace_Childhood ;
    dul:includesTime :TimeInterval_Now .

# The memory theory
:MemoryTheory a dul:Theory ;
    rdfs:label "Theory of episodic memory" ;
    dul:defines :EventType_Remembering, :Concept_MemoryTrace .
```

### 4.4 Example: Reasoning/Thinking

**"John is thinking about the problem"**

```turtle
# The thinking process
:ThinkingProcess a :ReasoningProcess ;
    rdfs:subClassOf :CognitiveProcess ;
    rdfs:label "John thinking about the problem" ;
    dul:hasParticipant :John ;
    dul:hasTimeInterval :TimeInterval_Now .

# The problem (what is being thought about)
:TheProblem a dul:Description ;
    rdfs:label "The mathematical problem" ;
    dul:defines :Concept_Solution .

# Mental content (thoughts)
:JohnsThought a dul:InformationObject ;
    rdfs:label "John's thought/mental representation" ;
    dul:expresses :ProposedSolution .

:ProposedSolution a dul:Description ;
    rdfs:label "Proposed solution to the problem" .

# Thinking situation
:ThinkingSituation a dul:Situation ;
    rdfs:label "John thinking about the problem" ;
    dul:satisfies :CognitiveTheory ;
    dul:includesAgent :John ;
    dul:includesEvent :ThinkingProcess ;
    dul:includesObject :TheProblem ;
    dul:includesTime :TimeInterval_Now .
```

### 4.5 Example: Perception

**"John perceives the red apple"**

```turtle
# The perception process
:PerceptionProcess a :PerceptionProcess ;
    rdfs:label "John perceiving the apple" ;
    dul:hasParticipant :John ;  # Perceiver
    dul:hasParticipant :TheApple ;  # Perceived object
    dul:hasTimeInterval :TimeInterval_Now .

# The perceived object
:TheApple a dul:PhysicalObject ;
    rdfs:label "The red apple" ;
    dul:hasQuality :ApplesColor .

:ApplesColor a dul:Quality ;
    dul:hasRegion :RedRegion .

# Perceptual experience (phenomenological)
:JohnsPerceptualExperience a :PerceptualExperience ;
    rdfs:subClassOf :MentalQuality ;
    rdfs:label "John's perceptual experience of redness" ;
    dul:isQualityOf :John .

# Perception situation
:PerceptionSituation a dul:Situation ;
    rdfs:label "John perceiving red apple" ;
    dul:satisfies :PerceptionTheory ;
    dul:includesAgent :John ;
    dul:includesEvent :PerceptionProcess ;
    dul:includesObject :TheApple ;
    dul:includesQuality :JohnsPerceptualExperience .
```

---

## 5. Modeling Propositional Attitudes: Beliefs, Desires, Intentions

Propositional attitudes are **relations between agents and propositions** (Descriptions). The D&S pattern is ideal for this.

### 5.1 The General Pattern

```
Agent + Attitude Type + Proposition (Description) + Situation
```

- **Agent**: The believer/desirer/intender
- **Attitude Type**: Belief, Desire, Intention (as Concepts or Roles)
- **Proposition**: A Description (the content of the attitude)
- **Situation**: The attitude situation (agent holding the attitude toward the proposition)

### 5.2 Example: Belief

**"John believes that Paris is in France"**

```turtle
# ========== The Proposition (What is Believed) ==========

:Proposition_ParisInFrance a dul:Description ;
    rdfs:label "Proposition: Paris is in France" ;
    dul:defines :Concept_Paris, :Concept_France, :Relation_LocatedIn .

# The content
:Paris a :Concept_City ;
    dul:isDefinedIn :Proposition_ParisInFrance .

:France a :Concept_Country ;
    dul:isDefinedIn :Proposition_ParisInFrance .

:Relation_LocatedIn a dul:Concept ;
    rdfs:label "Located-in relation" ;
    dul:isDefinedIn :Proposition_ParisInFrance .

# ========== The Belief Attitude ==========

# Doxastic framework (theory of belief)
:DoxasticFramework a dul:Theory ;
    rdfs:label "Theory of belief" ;
    dul:defines :AttitudeType_Belief, :Role_Believer .

:AttitudeType_Belief a dul:Concept ;
    rdfs:label "Belief (propositional attitude type)" ;
    dul:isDefinedIn :DoxasticFramework .

:Role_Believer a dul:Role ;
    rdfs:label "Believer role" ;
    dul:isDefinedIn :DoxasticFramework .

# ========== The Belief Situation ==========

:BeliefSituation_John a dul:Situation ;
    rdfs:label "John's belief that Paris is in France" ;
    dul:satisfies :DoxasticFramework ;
    dul:includesAgent :John ;
    dul:includesTime :TimeInterval_Now .

# The belief content link
:BeliefSituation_John :hasContent :Proposition_ParisInFrance .
# (`:hasContent` is a domain extension of dul:isSettingFor)

# Role assignment
:John dul:hasRole :Role_Believer .

# Classification
:AttitudeType_Belief dul:classifies :BeliefSituation_John .
```

**Key insight**: The proposition (Description) is **not asserted to be true**. It's the **content of John's belief**, which may be true or false.

### 5.3 Example: Desire

**"John desires to travel to Japan"**

```turtle
# ========== The Desired State (Goal) ==========

:Goal_TravelToJapan a dul:Goal ;
    rdfs:label "Goal: Travel to Japan" ;
    dul:defines :Action_Traveling, :Destination_Japan .

# ========== Conative Framework ==========

:ConativeFramework a dul:Theory ;
    rdfs:label "Theory of desire/motivation" ;
    dul:defines :AttitudeType_Desire, :Role_Desirer .

:AttitudeType_Desire a dul:Concept ;
    rdfs:label "Desire (conative attitude)" .

# ========== Desire Situation ==========

:DesireSituation_John a dul:Situation ;
    rdfs:label "John's desire to travel to Japan" ;
    dul:satisfies :ConativeFramework ;
    dul:includesAgent :John ;
    :hasContent :Goal_TravelToJapan ;
    dul:includesTime :TimeInterval_Now .

:AttitudeType_Desire dul:classifies :DesireSituation_John .
```

### 5.4 Example: Intention

**"John intends to write a book"**

```turtle
# ========== The Intended Action (Plan) ==========

:Plan_WriteBook a dul:Plan ;
    rdfs:label "Plan to write a book" ;
    dul:defines :Task_Writing, :Role_Author .

# ========== Intentional Framework ==========

:IntentionalFramework a dul:Theory ;
    rdfs:label "Theory of intention" ;
    dul:defines :AttitudeType_Intention, :Role_Intender .

# ========== Intention Situation ==========

:IntentionSituation_John a dul:Situation ;
    rdfs:label "John's intention to write a book" ;
    dul:satisfies :IntentionalFramework ;
    dul:includesAgent :John ;
    :hasContent :Plan_WriteBook ;
    dul:includesTime :TimeInterval_Now .

:AttitudeType_Intention dul:classifies :IntentionSituation_John .
```

### 5.5 Complex Example: Contradictory Beliefs

**"John believes Paris is in France, but Mary believes Paris is in Germany (she's wrong)"**

```turtle
# Two propositions (contradictory)
:Proposition_ParisInFrance a dul:Description ;
    rdfs:label "Paris is in France" .

:Proposition_ParisInGermany a dul:Description ;
    rdfs:label "Paris is in Germany" .

# John's belief
:BeliefSituation_John a dul:Situation ;
    rdfs:label "John's belief" ;
    dul:satisfies :DoxasticFramework ;
    dul:includesAgent :John ;
    :hasContent :Proposition_ParisInFrance .

# Mary's belief (different content)
:BeliefSituation_Mary a dul:Situation ;
    rdfs:label "Mary's belief" ;
    dul:satisfies :DoxasticFramework ;
    dul:includesAgent :Mary ;
    :hasContent :Proposition_ParisInGermany .

# Actual fact (grounded situation)
:ActualSituation a dul:Situation ;
    rdfs:label "The actual geography" ;
    dul:satisfies :GeographicalDescription ;
    dul:includesObject :Paris_City ;
    dul:includesObject :France_Country .

:Paris_City dul:hasLocation :France_Country .

# John's belief matches reality
:BeliefSituation_John :corresponds_to :ActualSituation .

# Mary's belief doesn't match reality (contradiction)
:BeliefSituation_Mary :contradicts :ActualSituation .
```

**Key insight**: DUL's Situation pattern allows modeling **multiple, contradictory beliefs** without asserting all of them as true.

---

## 6. Modeling Knowledge

Knowledge is complex: it involves beliefs, justification, truth, and information.

### 6.1 Knowledge as Justified True Belief (Traditional Epistemology)

**"John knows that Paris is in France"**

```turtle
# ========== The Proposition (Known Content) ==========

:Proposition_ParisInFrance a dul:Description ;
    rdfs:label "Paris is in France" .

# ========== The Belief Component ==========

:BeliefSituation_John a dul:Situation ;
    rdfs:label "John believes Paris is in France" ;
    dul:satisfies :DoxasticFramework ;
    dul:includesAgent :John ;
    :hasContent :Proposition_ParisInFrance .

# ========== The Truth Component ==========

:ActualSituation a dul:Situation ;
    rdfs:label "Paris actually being in France" ;
    dul:satisfies :GeographicalDescription ;
    dul:includesObject :Paris_City, :France_Country .

# The proposition matches reality
:Proposition_ParisInFrance dul:isSatisfiedBy :ActualSituation .

# ========== The Justification Component ==========

:Justification_Geography a dul:InformationObject ;
    rdfs:label "Geographical textbook evidence" ;
    dul:expresses :Proposition_ParisInFrance .

:John :hasJustification :Justification_Geography .

# ========== The Knowledge Situation ==========

:KnowledgeSituation_John a dul:Situation ;
    rdfs:label "John knowing that Paris is in France" ;
    dul:satisfies :EpistemicFramework ;
    dul:includesAgent :John ;
    :hasContent :Proposition_ParisInFrance ;
    :grounded_in :BeliefSituation_John ;
    :verified_by :ActualSituation ;
    :justified_by :Justification_Geography .

:EpistemicFramework a dul:Theory ;
    rdfs:label "Theory of knowledge (epistemology)" ;
    dul:defines :AttitudeType_Knowledge .

:AttitudeType_Knowledge dul:classifies :KnowledgeSituation_John .
```

### 6.2 Knowledge as Information Object

**Knowledge as abstract information:**

```turtle
# Domain knowledge (abstract)
:GeographicalKnowledge a dul:InformationObject ;
    rdfs:label "Geographical knowledge" ;
    dul:expresses :GeographicalDescription .

:GeographicalDescription a dul:Theory ;
    rdfs:label "Geographical theory" ;
    dul:defines :Concept_City, :Concept_Country, :Relation_LocatedIn .

# Knowledge possessed by agent
:John :possesses :GeographicalKnowledge .
# (`:possesses` is a domain-specific extension)

# Or using situation
:KnowledgePossessionSituation a dul:Situation ;
    rdfs:label "John possessing geographical knowledge" ;
    dul:includesAgent :John ;
    dul:includesObject :GeographicalKnowledge ;
    dul:includesTime :TimeInterval_Now .
```

### 6.3 Procedural Knowledge ("Knowing How")

**"John knows how to ride a bicycle"**

```turtle
# The skill/procedure (plan)
:Plan_RideBicycle a dul:Plan ;
    rdfs:label "Procedure for riding a bicycle" ;
    dul:defines :Task_Pedaling, :Task_Balancing, :Task_Steering .

# John's competence
:JohnsRidingCompetence a :CognitiveCapacity ;
    rdfs:label "John's bicycle-riding skill" ;
    dul:isQualityOf :John .

# The knowledge situation
:ProceduralKnowledgeSituation a dul:Situation ;
    rdfs:label "John knowing how to ride a bicycle" ;
    dul:satisfies :EpistemicFramework ;
    dul:includesAgent :John ;
    :hasContent :Plan_RideBicycle ;
    :manifested_by :JohnsRidingCompetence .

# Demonstration (execution proves knowledge)
:JohnRidingBicycle a dul:PlanExecution ;
    rdfs:label "John riding a bicycle" ;
    dul:satisfies :Plan_RideBicycle ;
    dul:includesAgent :John ;
    dul:includesAction :RidingAction .
```

---

## 7. Modeling Cognitive Capacities and Traits

Cognitive capacities (intelligence, creativity, wisdom) and personality traits (extroversion, conscientiousness) can be modeled as **Parameters** or **Concepts** that classify agents.

### 7.1 Intelligence as Parameter/Concept

**"John is intelligent"**

```turtle
# ========== Intelligence as Parameter ==========

:Intelligence a dul:Parameter ;
    rdfs:label "Intelligence (cognitive capacity parameter)" ;
    dul:isDefinedIn :CognitiveTheory .

# Intelligence levels (regions)
:HighIntelligence a dul:Region ;
    rdfs:label "High intelligence level" ;
    :IQ_value "130"^^xsd:integer .

:Intelligence dul:classifies :HighIntelligence .

# ========== Intelligence as Quality of Agent ==========

:JohnsIntelligence a :CognitiveCapacity ;
    rdfs:subClassOf dul:Quality ;
    rdfs:label "John's intelligence" ;
    dul:isQualityOf :John ;
    dul:hasRegion :HighIntelligence .

# ========== Intelligence as Concept ==========

:Concept_Intelligent a dul:Concept ;
    rdfs:label "Intelligent (concept)" ;
    dul:isDefinedIn :CognitiveTheory .

:Concept_Intelligent dul:classifies :John .

# ========== Intelligence Situation ==========

:IntelligenceSituation a dul:Situation ;
    rdfs:label "John being intelligent" ;
    dul:satisfies :CognitiveTheory ;
    dul:includesAgent :John ;
    dul:includesQuality :JohnsIntelligence ;
    dul:includesTime :TimeInterval_Current .
```

### 7.2 Personality Traits

**"Alice is extroverted"**

```turtle
# Personality theory (e.g., Big Five)
:PersonalityTheory a dul:Theory ;
    rdfs:label "Big Five personality theory" ;
    dul:defines :Trait_Extroversion, :Trait_Neuroticism, :Trait_Openness .

# Trait as parameter
:Trait_Extroversion a dul:Parameter ;
    rdfs:label "Extroversion trait" ;
    dul:isDefinedIn :PersonalityTheory .

# Trait value (region)
:HighExtroversion a dul:Region ;
    rdfs:label "High extroversion level" ;
    :traitScore "85"^^xsd:integer .  # Percentile

# Alice's trait (quality)
:AlicesExtroversion a :PersonalityTrait ;
    rdfs:subClassOf dul:Quality ;
    rdfs:label "Alice's extroversion" ;
    dul:isQualityOf :Alice ;
    dul:hasRegion :HighExtroversion .

# Classification
:Concept_Extroverted a dul:Concept ;
    dul:isDefinedIn :PersonalityTheory .

:Concept_Extroverted dul:classifies :Alice .
```

### 7.3 Skills and Competencies

**"Bob has excellent writing skills"**

```turtle
# Skill as cognitive capacity (quality)
:BobsWritingSkill a :CognitiveCapacity ;
    rdfs:label "Bob's writing skill" ;
    dul:isQualityOf :Bob ;
    dul:hasRegion :ExpertLevel .

:ExpertLevel a dul:Region ;
    rdfs:label "Expert skill level" ;
    :skillLevel "expert" .

# Skill as role/concept
:Role_Writer a dul:Role ;
    rdfs:label "Writer role" ;
    dul:hasParameter :Skill_Writing .

:Skill_Writing a dul:Parameter ;
    rdfs:label "Writing skill parameter" .

# Bob playing writer role
:Bob dul:hasRole :Role_Writer .

# Competence situation
:CompetenceSituation a dul:Situation ;
    rdfs:label "Bob's writing competence" ;
    dul:satisfies :SkillFramework ;
    dul:includesAgent :Bob ;
    dul:includesQuality :BobsWritingSkill .
```

---

## 8. Complete Example: Integrated Psychological Model

Let's model a rich scenario: **"Alice, an intelligent psychology student, believes that cognitive therapy works. She is learning about depression while feeling slightly anxious about her upcoming exam."**

This involves:
- Cognitive trait (intelligence)
- Social role (psychology student)
- Belief (propositional attitude)
- Learning process (cognitive process)
- Emotional state (anxiety)
- Knowledge domain (depression)

```turtle
# ========== Agent ==========

:Alice a dul:NaturalPerson ;
    rdfs:label "Alice" .

# ========== Cognitive Trait: Intelligence ==========

:AlicesIntelligence a :CognitiveCapacity ;
    rdfs:label "Alice's intelligence" ;
    dul:isQualityOf :Alice ;
    dul:hasRegion :HighIntelligence .

:HighIntelligence a dul:Region ;
    rdfs:label "High intelligence" ;
    :IQ_estimate "125"^^xsd:integer .

# ========== Social Role: Psychology Student ==========

:UniversityStructure a dul:Description ;
    rdfs:label "University organizational structure" ;
    dul:defines :Role_PsychologyStudent .

:Role_PsychologyStudent a dul:Role ;
    rdfs:label "Psychology student role" ;
    dul:isDefinedIn :UniversityStructure .

:AliceRoleSituation a dul:Situation ;
    rdfs:label "Alice as psychology student" ;
    dul:satisfies :UniversityStructure ;
    dul:isSettingFor :Alice ;
    dul:isSettingFor :Role_PsychologyStudent ;
    dul:includesTime :TimeInterval_2024 .

# ========== Belief: Cognitive Therapy Works ==========

# The proposition (believed content)
:Proposition_CBT_Effective a dul:Theory ;
    rdfs:label "Cognitive therapy is effective for depression" ;
    dul:defines :Concept_CognitiveTherapy, :Concept_Depression .

# Belief situation
:BeliefSituation_Alice a dul:Situation ;
    rdfs:label "Alice's belief about CBT effectiveness" ;
    dul:satisfies :DoxasticFramework ;
    dul:includesAgent :Alice ;
    :hasContent :Proposition_CBT_Effective ;
    dul:includesTime :TimeInterval_Now .

# ========== Cognitive Process: Learning ==========

# The learning process
:LearningProcess_Alice a :LearningProcess ;
    rdfs:subClassOf :CognitiveProcess ;
    rdfs:label "Alice learning about depression" ;
    dul:hasParticipant :Alice ;
    dul:hasTimeInterval :TimeInterval_ThisSemester .

# What is being learned (knowledge domain)
:DepressionKnowledge a dul:InformationObject ;
    rdfs:label "Knowledge about depression" ;
    dul:expresses :DepressionTheory .

:DepressionTheory a dul:Theory ;
    rdfs:label "Theory of depression" ;
    dul:defines :Concept_Depression, :Concept_Symptoms, :Concept_Treatments .

# Learning situation
:LearningSituation a dul:Situation ;
    rdfs:label "Alice learning about depression" ;
    dul:satisfies :EducationalFramework ;
    dul:includesAgent :Alice ;
    dul:includesEvent :LearningProcess_Alice ;
    dul:includesObject :DepressionKnowledge ;
    dul:includesTime :TimeInterval_ThisSemester .

# ========== Emotional State: Anxiety ==========

# Anxiety as emotional quality
:AlicesAnxiety a :EmotionalState ;
    rdfs:label "Alice's anxiety" ;
    dul:isQualityOf :Alice ;
    dul:hasRegion :MildAnxietyLevel .

:MildAnxietyLevel a :EmotionalValueRegion ;
    rdfs:label "Mild anxiety" ;
    :intensityLevel "4"^^xsd:integer ;  # Scale 0-10
    :valence "negative" .

# Anxiety directed at exam (situation)
:AnxietySituation a dul:Situation ;
    rdfs:label "Alice's anxiety about exam" ;
    dul:satisfies :EmotionalFramework ;
    dul:includesAgent :Alice ;
    dul:includesQuality :AlicesAnxiety ;
    dul:includesEvent :UpcomingExam ;  # The object of anxiety
    dul:includesTime :TimeInterval_Now .

# ========== The Exam (Future Event) ==========

:UpcomingExam a dul:Event ;
    rdfs:label "Alice's upcoming exam" ;
    dul:hasParticipant :Alice ;
    dul:hasTimeInterval :TimeInterval_NextWeek .

# The anxiety precedes the exam
:AnxietySituation dul:precedes :UpcomingExam .

# ========== Overall Psychological Profile ==========

:AlicesPsychologicalProfile a dul:Situation ;
    rdfs:label "Alice's current psychological state" ;
    dul:includesAgent :Alice ;
    dul:includesQuality :AlicesIntelligence ;
    dul:includesQuality :AlicesAnxiety ;
    dul:includesEvent :LearningProcess_Alice ;
    dul:includesTime :TimeInterval_Now .

# ========== Temporal Relations ==========

# Learning is ongoing
:LearningProcess_Alice dul:hasTimeInterval :TimeInterval_ThisSemester .

# Anxiety is current
:AnxietySituation dul:includesTime :TimeInterval_Now .

# Exam is future
:UpcomingExam dul:hasTimeInterval :TimeInterval_NextWeek .
```

**This integrated model captures:**
- Stable traits (intelligence)
- Social roles (student)
- Propositional attitudes (belief about CBT)
- Cognitive processes (learning)
- Emotional states (anxiety)
- Temporal dynamics (learning ongoing, anxiety current, exam future)
- Causal/intentional relations (anxiety about the exam)

---

## 9. Guidelines and Best Practices

### 9.1 Choosing the Right Pattern

| Psychological Phenomenon | Primary DUL Pattern | Secondary Considerations |
|--------------------------|---------------------|-------------------------|
| **Emotions (directed)** | Situation | Use when emotion has object/target |
| **Emotions (undirected)** | Quality | Use for moods, ambient feelings |
| **Cognitive processes** | Event (Process/Action) | Use for attention, reasoning, memory retrieval |
| **Beliefs/Desires** | Situation + Description | D&S pattern for propositional attitudes |
| **Knowledge** | InformationObject, Description | Plus Situation for "knowing that" |
| **Traits/Capacities** | Quality + Parameter | Use Parameter for trait type, Quality for individual trait |
| **Mental states (general)** | Quality or Situation | Quality for aspectual, Situation for relational |
| **Perceptual experience** | Event + Quality | Event for process, Quality for phenomenology |

### 9.2 Key Principles

#### Principle 1: Extend, Don't Replace
Create domain-specific subclasses of DUL classes:
```turtle
:MentalQuality rdfs:subClassOf dul:Quality .
:CognitiveProcess rdfs:subClassOf dul:Process .
```

#### Principle 2: Use Descriptions for Psychological Theories
Different psychological frameworks → Different Descriptions:
```turtle
:BehavioristFramework a dul:Theory .
:CognitivistFramework a dul:Theory .
:PsychoanalyticFramework a dul:Theory .
```

#### Principle 3: Reify Complex Mental States
Use Situations for:
- Relational mental states (love, fear of X, attention to Y)
- Time-indexed states (beliefs that change)
- Multi-participant psychological situations (group emotions, shared beliefs)

#### Principle 4: Distinguish Content from Attitude
- **Attitude**: The mental state type (belief, desire, intention)
- **Content**: The proposition/plan/goal (expressed as Description)
- Model as: `Situation (attitude) + satisfies/hasContent + Description (content)`

#### Principle 5: Model Mental Causation Carefully
Mental states can cause/precede/trigger:
- Other mental states (anxiety causes distraction)
- Actions (intention causes action)
- Physical events (stress causes illness)

Use temporal relations (`precedes`, `causes` [if extended]) judiciously.

### 9.3 Common Patterns Summary

#### Pattern A: Mental Quality
```turtle
:MentalQuality rdfs:subClassOf dul:Quality .
:JohnsAnxiety a :MentalQuality ;
    dul:isQualityOf :John ;
    dul:hasRegion :AnxietyLevel_High .
```

#### Pattern B: Mental Process
```turtle
:CognitiveProcess rdfs:subClassOf dul:Process .
:ThinkingEvent a :CognitiveProcess ;
    dul:hasParticipant :John ;
    dul:hasTimeInterval :Now .
```

#### Pattern C: Propositional Attitude
```turtle
:AttitudeSituation a dul:Situation ;
    dul:satisfies :DoxasticFramework ;
    dul:includesAgent :John ;
    :hasContent :Proposition .
```

#### Pattern D: Directed Emotion
```turtle
:EmotionSituation a dul:Situation ;
    dul:satisfies :EmotionalFramework ;
    dul:includesAgent :John ;  # Experiencer
    dul:includesObject :Target ;  # Object of emotion
    dul:includesTime :Now .
```

### 9.4 Integration with Physical and Social

Remember that psychological phenomena don't exist in isolation:

- **Embodiment**: Mental states relate to physical states (brain states, physiological arousal)
- **Social grounding**: Many mental states are socially constituted (beliefs about social facts, emotions in social contexts)
- **Behavioral manifestation**: Mental states cause observable actions

Example:
```turtle
# Mental state
:JohnsAnger a :EmotionalState ;
    dul:isQualityOf :John .

# Physical manifestation
:JohnsPhysiologicalArousal a dul:Quality ;
    dul:isQualityOf :John ;
    :correlatesWith :JohnsAnger .

# Behavioral manifestation
:ShoutingAction a dul:Action ;
    dul:hasParticipant :John ;
    :causedBy :JohnsAnger .

# Social context
:ConflictSituation a dul:Situation ;
    dul:includesAgent :John ;
    dul:includesQuality :JohnsAnger ;
    dul:includesAction :ShoutingAction .
```

### 9.5 Avoiding Common Pitfalls

❌ **Pitfall 1: Over-reification**
Don't create Situations for every simple mental state:
```turtle
# Bad (over-complex for simple statement)
:BeliefSituation123 a dul:Situation ;
    dul:includesAgent :John ;
    dul:includesObject :SimpleFact .

# Good (simple property sufficient)
:John :believes :SimpleFact .
```

❌ **Pitfall 2: Confusing Content and Attitude**
Don't assert propositions as true when they're belief contents:
```turtle
# Bad (asserts Paris is in Germany!)
:Mary :believes :ParisInGermany .
:ParisInGermany a dul:Situation ;
    dul:includesObject :Paris, :Germany .

# Good (proposition is content, not asserted)
:MaryBeliefSituation a dul:Situation ;
    dul:includesAgent :Mary ;
    :hasContent :Proposition_ParisInGermany .
:Proposition_ParisInGermany a dul:Description .
```

❌ **Pitfall 3: Ignoring Temporal Dynamics**
Mental states change over time:
```turtle
# Include temporal bounds
:AnxietySituation dul:includesTime :TimeInterval_BeforeExam .
```

✅ **Best Practice**: Start simple, add complexity as needed. Use direct properties for simple cases, Situations for complex/temporal/relational cases.

---

## Conclusion

While DUL doesn't provide psychology-specific classes, its foundational patterns are **ideally suited** for modeling psychological phenomena:

1. **Mental processes** → Events (Process/Action)
2. **Mental states** → Qualities or Situations
3. **Emotions** → Qualities (undirected) or Situations (directed)
4. **Propositional attitudes** → Situations + Descriptions (D&S pattern)
5. **Knowledge** → InformationObjects + Descriptions
6. **Cognitive traits** → Parameters + Qualities
7. **Phenomenological experience** → Qualities + Situations

The key is to **extend DUL systematically** by:
- Creating domain-specific subclasses
- Defining psychological Descriptions (theories, frameworks)
- Applying DUL's patterns (D&S, Quality-Region, Participation)
- Maintaining temporal and contextual awareness

By grounding psychological ontology in DUL, you gain:
- **Interoperability** with other DUL-based ontologies
- **Philosophical rigor** from DUL's foundational commitments
- **Flexibility** to represent multiple psychological theories
- **Integration** with physical, social, and informational domains

---

**Related Documentation**:
- See [DUL_Documentation.md](DUL_Documentation.md) for comprehensive coverage of DUL classes and patterns.
- See [DUL_FAQ.md](DUL_FAQ.md) for answers to common modeling questions.
- See [DUL_Advanced_Topics.md](DUL_Advanced_Topics.md) for classification, social contexts, and event descriptions.

**Version**: 1.0
**Last Updated**: 2025-11-04
**Topics Covered**: Psychological concepts, cognitive processes, emotions, propositional attitudes, knowledge, mental states
