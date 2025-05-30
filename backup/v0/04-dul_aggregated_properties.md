# DUL 3.34 Object Properties - Aggregated Documentation

This document contains the Object Properties from the DOLCE+DnS Ultralite (DUL) ontology version 3.34, aggregated with their inverse properties for easier consultation.

## Agent and Social Agent Relations

### actsFor / actsThrough
**actsFor**
- **Comment**: The relation holding between any Agent, and a SocialAgent. In principle, a SocialAgent requires at least one PhysicalAgent in order to act, but this dependency can be 'delegated'; e.g. a university can be acted for by a department, which on its turm is acted for by physical agents.
- **Domain**: Agent
- **Range**: SocialAgent
- **SubProperties**: associatedWith

**actsThrough**
- **Comment**: The relation holding between a PhysicalAgent and a SocialAgent. In principle, a SocialAgent requires at least one PhysicalAgent in order to act, but this dependency can be 'delegated', e.g. a university can be acted for by a department, which is acted for by physical agents. AKA isActedBy
- **Domain**: SocialAgent
- **Range**: Agent
- **SubProperties**: associatedWith

### conceptualizes / isConceptualizedBy
**conceptualizes**
- **Comment**: A relation stating that an Agent is internally representing a SocialObject: situations, descriptions, concepts, etc. E.g., 'John believes in the conspiracy theory'; 'Niels Bohr created the solar-system metaphor for the atomic theory'; 'Jacques assumes all swans are white'; 'the task force members share the attack plan'. Conceptualizations can be distinguished into different forms, primarily based on the type of SocialObject that is conceptualized. Descriptions and concepts can be 'assumed', situations can be 'believed' or 'known', plans can be 'adopted', etc.
- **Domain**: Agent
- **Range**: SocialObject
- **SubProperties**: associatedWith

**isConceptualizedBy**
- **Comment**: A relation stating that an Agent is internally representing a Description . E.g., 'John believes in the conspiracy theory'; 'Niels Bohr created a solar-system metaphor for his atomic theory'; 'Jacques assumes all swans are white'; 'the task force shares the attack plan'.
- **Domain**: SocialObject
- **Range**: Agent
- **SubProperties**: associatedWith

### involvesAgent / isAgentInvolvedIn
**involvesAgent**
- **Comment**: Agent participation.
- **Domain**: Event
- **Range**: Agent
- **SubProperties**: hasParticipant

**isAgentInvolvedIn**
- **Comment**: Agent participation.
- **Domain**: Agent
- **Range**: Event
- **SubProperties**: isParticipantIn

### includesAgent / isAgentIncludedIn
**includesAgent**
- **Comment**: A relation between situations and persons, e.g. 'this morning I've prepared my coffee and had my fingers burnt' (i.e.: the preparation of my coffee this morning included me).
- **Domain**: Situation
- **Range**: Agent
- **SubProperties**: includesObject

**isAgentIncludedIn**
- **Comment**: The inverse of includesAgent.
- **Domain**: Agent
- **Range**: Situation
- **SubProperties**: isObjectIncludedIn

### introduces / isIntroducedBy
**introduces**
- **Comment**: A relation between a Description and a SocialAgent, e.g. a Constitutional Charter introduces the SocialAgent 'PresidentOfRepublic'.
- **Domain**: Description
- **Range**: SocialAgent
- **SubProperties**: associatedWith

**isIntroducedBy**
- **Comment**: A relation between a Description and a SocialAgent, e.g. a Constitutional Charter introduces the SocialAgent 'PresidentOfRepublic'.
- **Domain**: SocialAgent
- **Range**: Description
- **SubProperties**: associatedWith

## Classification and Conceptual Relations

### classifies / isClassifiedBy
**classifies**
- **Comment**: A relation between a Concept and an Entity, e.g. the Role 'student' classifies a Person 'John'.
- **Domain**: Concept
- **Range**: Entity
- **SubProperties**: associatedWith

**isClassifiedBy**
- **Comment**: A relation between a Concept and an Entity, e.g. 'John is considered a typical rude man'; your last concert constitutes the achievement of a lifetime; '20-year-old means she's mature enough'.
- **Domain**: Entity
- **Range**: Concept
- **SubProperties**: associatedWith

### characterizes / isCharacterizedBy
**characterizes**
- **Comment**: A relation between concepts and collections, where a Concept is said to characterize a Collection; it corresponds to a link between the (reified) intensional and extensional interpretations of a _proper subset of_ a (reified) class. This is different from covers, because it refers to an interpretation the entire reified class. E.g. the collection of vintage saxophones is characterized by the Concept 'manufactured by hand', while it gets covered by the Concept 'Saxophone' with the Parameter 'Vintage'.
- **Domain**: Concept
- **Range**: Collection
- **SubProperties**: associatedWith

**isCharacterizedBy**
- **Comment**: The inverse of characterizes.
- **Domain**: Collection
- **Range**: Concept
- **SubProperties**: associatedWith

### covers / isCoveredBy
**covers**
- **Comment**: A relation between concepts and collections, where a Concept is said to cover a Collection; it corresponds to a link between the (reified) intensional and extensional interpretations of a (reified) class. E.g. the collection of vintage saxophones is covered by the Concept 'Saxophone' with the Parameter 'Vintage'.
- **Domain**: Concept
- **Range**: Collection
- **SubProperties**: associatedWith

**isCoveredBy**
- **Comment**: A relation between concepts and collections, where a Concept is said to cover a Collection; it corresponds to a link between the (reified) intensional and extensional interpretations of a (reified) class. E.g. the collection of vintage saxophones is covered by the Concept 'Saxophone' with the Parameter 'Vintage'.
- **Domain**: Collection
- **Range**: Concept
- **SubProperties**: associatedWith

### defines / isDefinedIn
**defines**
- **Comment**: A relation between a Description and a Concept, e.g. a Workflow for a governmental Organization defines the Role 'officer', or 'the Italian Traffic Law defines the role Vehicle'.
- **Domain**: Description
- **Range**: Concept
- **SubProperties**: usesConcept

**isDefinedIn**
- **Comment**: A relation between a Description and a Concept, e.g. a Workflow for a governmental Organization defines the Role 'officer', or 'the Italian Traffic Law defines the role Vehicle'.
- **Domain**: Concept
- **Range**: Description
- **SubProperties**: isConceptUsedIn

### definesRole / isRoleDefinedIn
**definesRole**
- **Comment**: A relation between a description and a role, e.g. the recipe for a cake defines the role 'ingredient'.
- **Domain**: Description
- **Range**: Role
- **SubProperties**: defines

**isRoleDefinedIn**
- **Comment**: A relation between a description and a role, e.g. the role 'Ingredient' is defined in the recipe for a cake.
- **Domain**: Role
- **Range**: Description
- **SubProperties**: isDefinedIn

### definesTask / isTaskDefinedIn
**definesTask**
- **Comment**: A relation between a description and a task, e.g. the recipe for a cake defines the task 'boil'.
- **Domain**: Description
- **Range**: Task
- **SubProperties**: defines

**isTaskDefinedIn**
- **Comment**: A relation between a description and a task, e.g. the task 'boil' is defined in a recipe for a cake.
- **Domain**: Task
- **Range**: Description
- **SubProperties**: isDefinedIn

### usesConcept / isConceptUsedIn
**usesConcept**
- **Comment**: A generic relation holding between a Description and a Concept. In order to be used, a Concept must be previously definedIn another Description. This last condition cannot be encoded for object properties in OWL.
- **Domain**: Description
- **Range**: Concept
- **SubProperties**: associatedWith

**isConceptUsedIn**
- **Comment**: A more generic relation holding between a Description and a Concept. In order to be used, a Concept must be previously definedIn another Description
- **Domain**: Concept
- **Range**: Description
- **SubProperties**: associatedWith

### hasParameter / isParameterFor
**hasParameter**
- **Comment**: A Concept can have a Parameter that constrains the attributes that a classified Entity can have in a certain Situation, e.g. a 4WheelDriver Role definedIn the ItalianTrafficLaw has a MinimumAge parameter on the Amount 16.
- **Domain**: Concept
- **Range**: Parameter
- **SubProperties**: isRelatedToConcept

**isParameterFor**
- **Comment**: A Concept can have a Parameter that constrains the attributes that a classified Entity can have in a certain Situation, e.g. a 4WheelDriver Role definedIn the ItalianTrafficLaw has a MinimumAge parameter on the Amount 16.
- **Domain**: Parameter
- **Range**: Concept
- **SubProperties**: isRelatedToConcept

### parametrizes / isParametrizedBy
**parametrizes**
- **Comment**: The relation between a Parameter, e.g. 'MajorAgeLimit', and a Region, e.g. '18_year'. For a more data-oriented relation, see hasDataValue
- **Domain**: Parameter
- **Range**: Region
- **SubProperties**: classifies

**isParametrizedBy**
- **Comment**: The relation between a Parameter, e.g. 'MajorAge', and a Region, e.g. '>17 year'.
- **Domain**: Region
- **Range**: Parameter
- **SubProperties**: isClassifiedBy

### hasConstraint / isConstraintFor
**hasConstraint**
- **Comment**: A relation between parameters and entities. It allows to assert generic constraints (encoded as parameters), e.g. MinimumAgeForDriving isConstraintFor John (where John is a legal subject under the TrafficLaw). The intended semantics (not expressible in OWL) is that a Parameter isParameterFor a Concept that classifies an Entity; moreover, it entails that a Parameter parametrizes a Region that isRegionFor that Entity.
- **Domain**: Entity
- **Range**: Parameter
- **SubProperties**: isClassifiedBy

**isConstraintFor**
- **Comment**: A relation between parameters and entities. It allows to assert generic constraints (encoded as parameters), e.g. MinimumAgeForDriving isConstraintFor John (where John is a legal subject under the TrafficLaw). The intended semantics (not expressible in OWL) is that a Parameter isConstraintFor and Entity if the Parameter isParameterFor a Concept that classifies that Entity; moreover, it entails that a Parameter parametrizes a Region that isRegionFor that Entity. The use in OWL is therefore a shortcut to annotate what Parameter constrains what Entity
- **Domain**: Parameter
- **Range**: Entity
- **SubProperties**: classifies

## Role and Task Relations

### hasRole / isRoleOf
**hasRole**
- **Comment**: A relation between an object and a role, e.g. the person 'John' has role 'student'.
- **Domain**: Object
- **Range**: Role
- **SubProperties**: isClassifiedBy

**isRoleOf**
- **Comment**: A relation between an object and a role, e.g. 'student' is the role of 'John'.
- **Domain**: Role
- **Range**: Object
- **SubProperties**: classifies

### hasTask / isTaskOf
**hasTask**
- **Comment**: A relation between roles and tasks, e.g. 'students have the duty of giving exams' (i.e. the Role 'student' hasTask the Task 'giving exams').
- **Domain**: Role
- **Range**: Task
- **SubProperties**: isRelatedToConcept

**isTaskOf**
- **Comment**: A relation between roles and tasks, e.g. 'students have the duty of giving exams' (i.e. the Role 'student' hasTask the Task 'giving exams').
- **Domain**: Task
- **Range**: Role
- **SubProperties**: isRelatedToConcept

### executesTask / isExecutedIn
**executesTask**
- **Comment**: A relation between an action and a task, e.g. 'putting some water in a pot and putting the pot on a fire until the water starts bubbling' executes the task 'boiling'.
- **Domain**: Action
- **Range**: Task
- **SubProperties**: isClassifiedBy

**isExecutedIn**
- **Comment**: A relation between an action and a task, e.g. 'putting some water in a pot and putting the pot on a fire until the water starts bubbling' executes the task 'boiling'.
- **Domain**: Task
- **Range**: Action
- **SubProperties**: classifies

## Description and Entity Relations

### describes / isDescribedBy
**describes**
- **Comment**: The relation between a Description and an Entity : a Description gives a unity to a Collection of parts (the components), or constituents, by assigning a Role to each of them in the context of a whole Object (the system). A same Entity can be given different descriptions, for example, an old cradle can be given a unifying Description based on the original aesthetic design, the functionality it was built for, or a new aesthetic functionality in which it can be used as a flower pot.
- **Domain**: Description
- **Range**: Entity
- **SubProperties**: associatedWith

**isDescribedBy**
- **Comment**: The relation between an Entity and a Description: a Description gives a unity to a Collection of parts (the components), or constituents, by assigning a Role to each of them in the context of a whole Object (the system). A same Entity can be given different descriptions, for example, an old cradle can be given a unifying Description based on the original aesthetic design, the functionality it was built for, or a new aesthetic functionality in which it can be used as a flower pot.
- **Domain**: Entity
- **Range**: Description
- **SubProperties**: associatedWith

### expands / isExpandedIn
**expands**
- **Comment**: A partial order relation that holds between descriptions. It represents the proper part relation between a description and another description featuring the same properties as the former, with at least one additional one. Descriptions can be expanded either by adding other descriptions as parts, or by refining concepts that are used by them. An 'intention' to expand must be present (unless purely formal theories are considered, but even in this case a criterion of relevance is usually active).
- **Domain**: Description
- **Range**: Description
- **SubProperties**: isRelatedToDescription

**isExpandedIn**
- **Comment**: A partial order relation that holds between descriptions. It represents the proper part relation between a description and another description featuring the same properties as the former, with at least one additional one. Descriptions can be expanded either by adding other descriptions as parts, or by refining concepts that are used by them. An 'intention' to expand must be present (unless purely formal theories are considered, but even in this case a criterion of relevance is usually active).
- **Domain**: Description
- **Range**: Description
- **SubProperties**: isRelatedToDescription

### satisfies / isSatisfiedBy
**satisfies**
- **Comment**: A relation between a Situation and a Description, e.g. the execution of a Plan satisfies that plan.
- **Domain**: Situation
- **Range**: Description
- **SubProperties**: associatedWith

**isSatisfiedBy**
- **Comment**: A relation between a Situation and a Description, e.g. the execution of a Plan satisfies that plan.
- **Domain**: Description
- **Range**: Situation
- **SubProperties**: associatedWith

### unifies / isUnifiedBy
**unifies**
- **Comment**: A Collection has a unification criterion, provided by a Description; for example, a community of practice can be unified by a shared theory or interest, e.g. the community that makes research on mirror neurons shares some core knowledge about mirror neurons, which can be represented as a Description MirrorNeuronTheory that unifies the community. There can be several unifying descriptions.
- **Domain**: Description
- **Range**: Collection
- **SubProperties**: associatedWith

**isUnifiedBy**
- **Comment**: A Collection has a unification criterion, provided by a Description; for example, a community of practice can be unified by a shared theory or interest, e.g. the community that makes research on mirror neurons shares some core knowledge about mirror neurons, which can be represented as a Description MirrorNeuronTheory that unifies the community. There can be several unifying descriptions.
- **Domain**: Collection
- **Range**: Description
- **SubProperties**: associatedWith

## Information and Expression Relations

### expresses / isExpressedBy
**expresses**
- **Comment**: A relation between an InformationObject and a 'meaning', generalized here as a 'SocialObject'. For example: 'A Beehive is a structure in which bees are kept, typically in the form of a dome or box.' (Oxford dictionary)'; 'the term Beehive expresses the concept Beehive in my apiculture ontology'. The intuition for 'meaning' is intended to be very broad. A separate, large comment is included for those who want to investigate more on what kind of meaning can be represented in what form.
- **Domain**: InformationObject
- **Range**: SocialObject
- **SubProperties**: associatedWith

**isExpressedBy**
- **Comment**: A relation between a dul:SocialObject (the 'meaning') and a dul:InformationObject (the 'expression'). For example: 'A Beehive is a structure in which bees are kept, typically in the form of a dome or box.' (Oxford dictionary)'; 'the term Beehive expresses the concept Beehive in my apiculture ontology'. The intuition for 'meaning' is intended to be very broad. A separate, large comment is included in the encoding of 'expresses', for those who want to investigate more on what kind of meaning can be represented in what form.
- **Domain**: SocialObject
- **Range**: InformationObject
- **SubProperties**: associatedWith

### expressesConcept / isConceptExpressedBy
**expressesConcept**
- **Comment**: A relation between an InformationObject and a Concept , e.g. the term "dog" expresses the Concept "dog". For expressing a relational meaning, see the more general object property: expresses
- **Domain**: InformationObject
- **Range**: Concept
- **SubProperties**: expresses

**isConceptExpressedBy**
- **Comment**: A relation between an InformationObject and a Concept , e.g. the term "dog" expresses the Concept "dog". For expressing a relational meaning, see the more general object property: expresses
- **Domain**: Concept
- **Range**: InformationObject
- **SubProperties**: isExpressedBy

### concretelyExpresses / isConcretelyExpressedBy
**concretelyExpresses**
- **Comment**: A relation between an InformationRealization and a Description, e.g. 'the printout of the Italian Constitution concretelyExpresses the Italian Constitution'. It should be supplied also with a rule stating that the InformationRealization realizes an InformationObject that expresses the Description
- **Domain**: InformationRealization
- **Range**: SocialObject
- **SubProperties**: associatedWith

**isConcretelyExpressedBy**
- **Comment**: A relation between an InformationRealization and a Description, e.g. 'the printout of the Italian Constitution concretelyExpresses the Italian Constitution'. It should be supplied also with a rule stating that the InformationRealization realizes an InformationObject that expresses the Description
- **Domain**: SocialObject
- **Range**: InformationRealization
- **SubProperties**: associatedWith

### realizes / isRealizedBy
**realizes**
- **Comment**: A relation between an information realization and an information object, e.g. the paper copy of the Italian Constitution realizes the text of the Constitution.
- **Domain**: InformationRealization
- **Range**: InformationObject
- **SubProperties**: associatedWith

**isRealizedBy**
- **Comment**: A relation between an information realization and an information object, e.g. the paper copy of the Italian Constitution realizes the text of the Constitution.
- **Domain**: InformationObject
- **Range**: InformationRealization
- **SubProperties**: associatedWith

### realizesInformationAbout / isReferenceOfInformationRealizedBy
**realizesInformationAbout**
- **Comment**: The relation between entities and information realizations, e.g. between Italy and a paper copy of the text of the Italian Constitution.
- **Domain**: InformationRealization
- **Range**: Entity
- **SubProperties**: associatedWith

**isReferenceOfInformationRealizedBy**
- **Comment**: The relation between entities and information realizations, e.g. between Italy and a paper copy of the text of the Italian Constitution.
- **Domain**: Entity
- **Range**: InformationRealization
- **SubProperties**: associatedWith

### isAbout / isReferenceOf
**isAbout**
- **Comment**: A relation between an information object and an Entity (including information objects). It can be used to talk about entities that are references of proper nouns: the proper noun 'Leonardo da Vinci' isAbout the Person Leonardo da Vinci; as well as to talk about sets of entities that can be described by a common noun: the common noun 'person' isAbout the set of all persons in a domain of discourse, which can be represented in DOLCE-Ultralite as an individual of the class: dul:Collection. A specific sentence may use common nouns with either a singular or plural reference, or it can even refer to all possible references (e.g. in a lexicographic definition): all those uses are kinds of aboutness. The isAbout relation is sometimes considered as reflexive, however this is semiotically inaccurate, because information can be about itself ('de dicto' usage, as in 'John is four character long'), but it is typically about something else ('de re' usage, as in 'John loves Mary'). If a reflexivity exists in general, it rather concerns its realisation, which is always associated with an event, e.g. an utterance, which makes the information denoting itself, besides its aboutness. This is implemented in DUL with the dul:realizesSelfInformation property, which is used with local reflexivity in the dul:InformationRealization class.
- **Domain**: InformationObject
- **Range**: Entity
- **SubProperties**: associatedWith

**isReferenceOf**
- **Comment**: A relation between information objects and any Entity (including information objects). It can be used to talk about e.g. entities are references of proper nouns: the proper noun 'Leonardo da Vinci' isAbout the Person Leonardo da Vinci; as well as to talk about sets of entities that can be described by a common noun: the common noun 'person' isAbout the set of all persons in a domain of discourse, which can be represented in DOLCE-Ultralite as an individual of the class: Collection . The isReferenceOf relation is irreflexive, differently from its inverse isAbout.
- **Domain**: Entity
- **Range**: InformationObject
- **SubProperties**: associatedWith

## Participation and Event Relations

### hasParticipant / isParticipantIn
**hasParticipant**
- **Comment**: A relation between an object and a process, e.g. 'John took part in the discussion', 'a large mass of snow fell during the avalanche', or 'a cook, some sugar, flour, etc. are all present in the cooking of a cake'.
- **Domain**: Event
- **Range**: Object
- **SubProperties**: associatedWith

**isParticipantIn**
- **Comment**: A relation between an object and a process, e.g. 'John took part in the discussion', 'a large mass of snow fell during the avalanche', or 'a cook, some sugar, flour, etc. are all present in the cooking of a cake'.
- **Domain**: Object
- **Range**: Event
- **SubProperties**: associatedWith

### includesEvent / isEventIncludedIn
**includesEvent**
- **Comment**: A relation between situations and events, e.g. 'this morning I've prepared my coffee and had my fingers burnt' (i.e.: the preparation of my coffee this morning included a burning of my fingers).
- **Domain**: Situation
- **Range**: Event
- **SubProperties**: isSettingFor

**isEventIncludedIn**
- **Comment**: The inverse of includesEvent.
- **Domain**: Event
- **Range**: Situation
- **SubProperties**: hasSetting

### includesAction / isActionIncludedIn
**includesAction**
- **Comment**: A relation between situations and actions, e.g. 'this morning I've prepared my coffee and had my fingers burnt' (i.e.: the preparation of my coffee this morning included a burning of my fingers).
- **Domain**: Situation
- **Range**: Action
- **SubProperties**: includesEvent

**isActionIncludedIn**
- **Comment**: The inverse of includesAction.
- **Domain**: Action
- **Range**: Situation
- **SubProperties**: isEventIncludedIn

### includesObject / isObjectIncludedIn
**includesObject**
- **Comment**: A relation between situations and objects, e.g. 'this morning I've prepared my coffee and had my fingers burnt' (i.e.: the preparation of my coffee this morning included me).
- **Domain**: Situation
- **Range**: Object
- **SubProperties**: isSettingFor

**isObjectIncludedIn**
- **Comment**: The inverse of includesObject.
- **Domain**: Object
- **Range**: Situation
- **SubProperties**: hasSetting

## Temporal Relations

### directlyPrecedes / directlyFollows
**directlyPrecedes**
- **Comment**: The intransitive precedes relation. For example, Monday directly precedes Tuesday. Directness of precedence depends on the designer conceptualization.
- **Domain**: Entity
- **Range**: Entity
- **SubProperties**: precedes

**directlyFollows**
- **Comment**: The intransitive follows relation. For example, Wednesday directly precedes Thursday. Directness of precedence depends on the designer conceptualization.
- **Domain**: Entity
- **Range**: Entity
- **SubProperties**: follows

### precedes / follows
**precedes**
- **Comment**: A relation between entities, expressing a 'sequence' schema. E.g. 'year 1999 precedes 2000', 'deciding what coffee to use' precedes 'preparing coffee', 'World War II follows World War I', 'in the Milan to Rome autoroute, Bologna precedes Florence', etc. It can then be used between tasks, processes, time intervals, spatially locate objects, situations, etc. Subproperties can be defined in order to distinguish the different uses.
- **Domain**: Entity
- **Range**: Entity
- **SubProperties**: associatedWith

**follows**
- **Comment**: A relation between entities, expressing a 'sequence' schema. E.g. 'year 2000 follows 1999', 'preparing coffee' follows 'deciding what coffee to use', 'II World War follows I World War', etc. It can be used between tasks, processes or time intervals, and subproperties would fit best in order to distinguish the different uses.
- **Domain**: Entity
- **Range**: Entity
- **SubProperties**: associatedWith

### hasPrecondition / isPreconditionOf
**hasPrecondition**
- **Comment**: Direct precedence applied to situations. E.g., 'A precondition to declare war against a foreign country is claiming to find nuclear weapons in it'.
- **Domain**: Event or Situation
- **Range**: Event or Situation
- **SubProperties**: directlyFollows

**isPreconditionOf**
- **Comment**: Direct precedence applied to situations. E.g., 'claiming to find nuclear weapons in a foreign country is a precondition to declare war against it'.
- **Domain**: Event or Situation
- **Range**: Event or Situation
- **SubProperties**: directlyPrecedes

### hasPostcondition / isPostconditionOf
**hasPostcondition**
- **Comment**: Direct succession applied to situations. E.g., 'A postcondition of our Plan is to have things settled'.
- **Domain**: Event or Situation
- **Range**: Event or Situation
- **SubProperties**: directlyPrecedes

**isPostconditionOf**
- **Comment**: Direct succession applied to situations. E.g., 'Taking some rest is a postcondition of my search for a hotel'.
- **Domain**: Event or Situation
- **Range**: Event or Situation
- **SubProperties**: directlyFollows

### hasTimeInterval / isTimeIntervalOf
**hasTimeInterval**
- **Comment**: The generic relation between events and time intervals.
- **Domain**: Event
- **Range**: TimeInterval
- **SubProperties**: hasRegion

**isTimeIntervalOf**
- **Comment**: The generic relation between time intervals and events.
- **Domain**: TimeInterval
- **Range**: Event
- **SubProperties**: isRegionFor

### includesTime / isTimeIncludedIn
**includesTime**
- **Comment**: A relation between situations and time intervals, e.g. 'this morning I've prepared my coffee and had my fingers burnt' (i.e.: preparing my coffee was held this morning). A data value attached to the time interval typically complements this modelling pattern.
- **Domain**: Situation
- **Range**: TimeInterval
- **SubProperties**: isSettingFor

**isTimeIncludedIn**
- **Comment**: The inverse of includesTime.
- **Domain**: TimeInterval
- **Range**: Situation
- **SubProperties**: hasSetting

### isObservableAt / isTimeOfObservationOf
**isObservableAt**
- **Comment**: A relation to represent a (past, present or future) TimeInterval at which an Entity is observable. In order to encode a specific time, a data value should be related to the TimeInterval. An alternative way of representing time is the datatype property: hasIntervalDate
- **Domain**: Entity
- **Range**: TimeInterval
- **SubProperties**: hasRegion

**isTimeOfObservationOf**
- **Comment**: A relation to represent a (past, present or future) TimeInterval at which an Entity is observable. In order to encode a specific time, a data value should be related to the TimeInterval. An alternative way of representing time is the datatype property: hasIntervalDate
- **Domain**: TimeInterval
- **Range**: Entity
- **SubProperties**: isRegionFor

## Part-Whole Relations

### hasPart / isPartOf
**hasPart**
- **Comment**: A schematic relation between any entities, e.g. 'the human body has a brain as part', '20th century contains year 1923', 'World War II includes the Pearl Harbour event'. Parthood should assume the basic properties of mereology: transitivity, antisymmetry, and reflexivity (propert Parthood of course misses reflexivity). However, antisymmetry is not supported in OWL2 explicitly, therefore DUL has to adopt one of two patterns: 1) dropping asymmetry axioms, while granting reflexivity: this means that symmetry is not enforced, but permitted for the case of reflexivity. Of course, in this way we cannot prevent symmetric usages of hasPart; 2) dropping the reflexivity axiom, and enforce asymmetry: in this case, we would prevent all symmetric usages, but we loose the possibility of enforcing reflexivity, which is commonsensical in parthood. In DUL, we adopt pattern #1 for partOf, and pattern #2 for properPartOf, which seems a good approximation: due to the lack of inheritance of property characteristics, each asymmetric hasPropertPart assertion would also be a reflexive hasPart assertion (reflexive reduction design pattern). Subproperties and restrictions can be used to specialize hasPart for objects, events, etc.
- **Domain**: Entity
- **Range**: Entity
- **SubProperties**: associatedWith

**isPartOf**
- **Comment**: A relation between any entities, e.g. 'brain is a part of the human body'. See dul:hasPart for additional documentation.
- **Domain**: Entity
- **Range**: Entity
- **SubProperties**: associatedWith

### hasProperPart / isPropertPartOf
**hasProperPart**
- **Comment**: Asymmetric (so including irreflexive) parthood.
- **Domain**: Entity
- **Range**: Entity
- **SubProperties**: hasPart

**isPropertPartOf**
- **Comment**: See dul:hasProperPart for additional documentation.
- **Domain**: Entity
- **Range**: Entity
- **SubProperties**: isPartOf

### hasComponent / isComponentOf
**hasComponent**
- **Comment**: The hasProperPart relation without transitivity, holding between an Object (the system) and another (the component), and assuming a Design that structures the Object.
- **Domain**: Entity
- **Range**: Entity
- **SubProperties**: hasProperPart

**isComponentOf**
- **Comment**: The asymmetric isProperPartOf relation without transitivity, holding between an Object (the system) and another (the component), and assuming a Design that structures the Object.
- **Domain**: Entity
- **Range**: Entity
- **SubProperties**: isPropertPartOf

### hasConstituent / isConstituentOf
**hasConstituent**
- **Comment**: 'Constituency' depends on some layering of the world described by the ontology. For example, scientific granularities (e.g. body-organ-tissue-cell) or ontological 'strata' (e.g. social-mental-biological-physical) are typical layerings. Intuitively, a constituent is a part belonging to a lower layer. Since layering is actually a partition of the world described by the ontology, constituents are not properly classified as parts, although this kinship can be intuitive for common sense. A desirable advantage of this distinction is that we are able to talk e.g. of physical constituents of non-physical objects (e.g. systems), while this is not possible in terms of parts. Example of are the persons constituting a social system, the molecules constituting a person, the atoms constituting a river, etc. In all these examples, we notice a typical discontinuity between the constituted and the constituent object: e.g. a social system is conceptualized at a different layer from the persons that constitute it, a person is conceptualized at a different layer from the molecules that constitute them, and a river is conceptualized at a different layer from the atoms that constitute it.
- **Domain**: Entity
- **Range**: Entity
- **SubProperties**: associatedWith

**isConstituentOf**
- **Comment**: 'Constituency' depends on some layering of the world described by the ontology. For example, scientific granularities (e.g. body-organ-tissue-cell) or ontological 'strata' (e.g. social-mental-biological-physical) are typical layerings. Intuitively, a constituent is a part belonging to a lower layer. Since layering is actually a partition of the world described by the ontology, constituents are not properly classified as parts, although this kinship can be intuitive for common sense. A desirable advantage of this distinction is that we are able to talk e.g. of physical constituents of non-physical objects (e.g. systems), while this is not possible in terms of parts. Example of are the persons constituting a social system, the molecules constituting a person, the atoms constituting a river, etc. In all these examples, we notice a typical discontinuity between the constituted and the constituent object: e.g. a social system is conceptualized at a different layer from the persons that constitute it, a person is conceptualized at a different layer from the molecules that constitute them, and a river is conceptualized at a different layer from the atoms that constitute it.
- **Domain**: Entity
- **Range**: Entity
- **SubProperties**: associatedWith

## Collection and Membership Relations

### hasMember / isMemberOf
**hasMember**
- **Comment**: A relation between collections and entities, e.g. 'my collection of saxophones includes an old Adolphe Sax original alto' (i.e. my collection has member an Adolphe Sax alto).
- **Domain**: Collection
- **Range**: Entity
- **SubProperties**: associatedWith

**isMemberOf**
- **Comment**: A relation between collections and entities, e.g. 'the Night Watch by Rembrandt is in the Rijksmuseum collection'; 'Davide is member of the Pen Club', 'Igor is one the subjects chosen for the experiment'.
- **Domain**: Entity
- **Range**: Collection
- **SubProperties**: associatedWith

## Quality and Region Relations

### hasQuality / isQualityOf
**hasQuality**
- **Comment**: A relation between entities and qualities, e.g. 'Dmitri's skin is yellowish'.
- **Domain**: Entity
- **Range**: Quality
- **SubProperties**: associatedWith

**isQualityOf**
- **Comment**: A relation between entities and qualities, e.g. 'Dmitri's skin is yellowish'.
- **Domain**: Quality
- **Range**: Entity
- **SubProperties**: associatedWith

### hasRegion / isRegionFor
**hasRegion**
- **Comment**: A relation between entities and regions, e.g. 'the number of wheels of that truck is 12', 'the time of the experiment is August 9th, 2004', 'the whale has been localized at 34 degrees E, 20 degrees S'.
- **Domain**: Entity
- **Range**: Region
- **SubProperties**: associatedWith

**isRegionFor**
- **Comment**: A relation between entities and regions, e.g. 'the color of my car is red'.
- **Domain**: Region
- **Range**: Entity
- **SubProperties**: associatedWith

## Spatial Relations

### hasLocation / isLocationOf
**hasLocation**
- **Comment**: A generic, relative spatial location, holding between any entities. E.g. 'the cat is on the mat', 'Omar is in Samarcanda', 'the wound is close to the femural artery'. For 'absolute' locations, see SpaceRegion
- **Domain**: Entity
- **Range**: Entity
- **SubProperties**: associatedWith

**isLocationOf**
- **Comment**: A generic, relative localization, holding between any entities. E.g. 'Rome is the seat of the Pope', 'the liver is the location of the tumor'. For 'absolute' locations, see SpaceRegion
- **Domain**: Entity
- **Range**: Entity
- **SubProperties**: associatedWith

## Situation and Setting Relations

### hasSetting / isSettingFor
**hasSetting**
- **Comment**: A relation between entities and situations, e.g. 'this morning I've prepared my coffee with a new fantastic Arabica', i.e.: (an amount of) a new fantastic Arabica hasSetting the preparation of my coffee this morning.
- **Domain**: Entity
- **Range**: Situation
- **SubProperties**: associatedWith

**isSettingFor**
- **Comment**: A relation between situations and entities, e.g. 'this morning I've prepared my coffee with a new fantastic Arabica', i.e.: the preparation of my coffee this morning is the setting for (an amount of) a new fantastic Arabica.
- **Domain**: Situation
- **Range**: Entity
- **SubProperties**: associatedWith

## Concept Hierarchical Relations

### isSuperordinatedTo / isSubordinatedTo
**isSuperordinatedTo**
- **Comment**: Direct precedence applied to concepts. E.g. the role 'Executive' is superordinated to 'DepartmentManager'.
- **Domain**: Concept
- **Range**: Concept
- **SubProperties**: directlyPrecedes, isRelatedToConcept

**isSubordinatedTo**
- **Comment**: Direct succession applied to concepts. E.g. the role 'Officer' is subordinated to 'Director'.
- **Domain**: Concept
- **Range**: Concept
- **SubProperties**: directlyFollows, isRelatedToConcept

### specializes / isSpecializedBy
**specializes**
- **Comment**: A partial order relation that holds between social objects. It mainly represents the subsumption relation between e.g. a Concept or Description and another Concept (resp. Description) that is broader in extensional interpretation, but narrower in intensional interpretation. For example, the role PhDStudent specializes the role Student. Another possible use is between a Collection that isCoveredBy a Concept A, and another Collection that isCoveredBy a Concept B that on its turm specializes A. For example, the 70,000 series Selmer Mark VI saxophone Collection specializes the Selmer Mark VI saxophone Collection.
- **Domain**: SocialObject
- **Range**: SocialObject
- **SubProperties**: associatedWith

**isSpecializedBy**
- **Comment**: A partial order relation that holds between social objects. It represents the subsumption relation between e.g. a Concept and another Concept that is broader in extensional interpretation, but narrowe in intensional interpretation. E.g. PhDStudent Role specializes Student Role
- **Domain**: SocialObject
- **Range**: SocialObject
- **SubProperties**: associatedWith

## Symmetric Relations

### associatedWith
**associatedWith**
- **Comment**: A catch-all object property, useful for alignment and querying purposes. It is declared as both transitive and symmetric, in order to reason an a maximal closure of associations between individuals.
- **Domain**: Entity
- **Range**: Entity
- **SubProperties**: (none)
- **Inverse Properties**: associatedWith (symmetric)

### coparticipatesWith
**coparticipatesWith**
- **Comment**: A relation between two objects participating in a same Event; e.g., 'Vitas and Jimmy are playing tennis'.
- **Domain**: Object
- **Range**: Object
- **SubProperties**: associatedWith
- **Inverse Properties**: coparticipatesWith (symmetric)

### farFrom
**farFrom**
- **Comment**: Generic distance relation between any Entity(s). E.g. Rome is far from Beijing, astronomy is far from necromancy.
- **Domain**: Entity
- **Range**: Entity
- **SubProperties**: associatedWith
- **Inverse Properties**: farFrom (symmetric)

### nearTo
**nearTo**
- **Comment**: Generic distance relation between any Entity(s). E.g. Rome is near to Florence, astronomy is near to physics.
- **Domain**: Entity
- **Range**: Entity
- **SubProperties**: associatedWith
- **Inverse Properties**: nearTo (symmetric)

### hasCommonBoundary
**hasCommonBoundary**
- **Comment**: A relation to encode either formal or informal characterizations of 'boundaries' common to two different entities: an Event that ends when another begins, two abstract regions that have a common topological boundary, two objects that are said to be 'in contact' from a commonsense perspective, etc.
- **Domain**: Entity
- **Range**: Entity
- **SubProperties**: associatedWith
- **Inverse Properties**: hasCommonBoundary (symmetric)

### overlaps
**overlaps**
- **Comment**: A schematic relation between any entities, e.g. 'the chest region overlaps with the abdomen region', 'my spoken words overlap with hers', 'the time of my leave overlaps with the time of your arrival', 'fibromyalgia overlaps with other conditions'. Subproperties and restrictions can be used to specialize overlaps for objects, events, time intervals, etc.
- **Domain**: Entity
- **Range**: Entity
- **SubProperties**: associatedWith
- **Inverse Properties**: overlaps (symmetric)

### sameSettingAs
**sameSettingAs**
- **Comment**: A relation between two entities participating in a same Situation; e.g., 'Our company provides an antivenom service' (the situation is the service, the two entities are the company and the antivenom).
- **Domain**: Entity
- **Range**: Entity
- **SubProperties**: associatedWith
- **Inverse Properties**: sameSettingAs (symmetric)

### isRelatedToConcept
**isRelatedToConcept**
- **Comment**: Any relation between concepts, e.g. superordinated, conceptual parthood, having a parameter, having a task, superordination, etc.
- **Domain**: Concept
- **Range**: Concept
- **SubProperties**: associatedWith
- **Inverse Properties**: isRelatedToConcept (symmetric)

### isRelatedToDescription
**isRelatedToDescription**
- **Comment**: Any relation between descriptions.
- **Domain**: Description
- **Range**: Description
- **SubProperties**: associatedWith
- **Inverse Properties**: isRelatedToDescription (symmetric)

## Special Relations

### includesPart
**includesPart**
- **Comment**: A relation used in the context of time-indexed parthood situations.
- **Domain**: Situation
- **Range**: Entity
- **SubProperties**: isSettingFor
- **Inverse Properties**: (none specified)

### includesWhole
**includesWhole**
- **Comment**: A relation used in the context of time-indexed parthood situations.
- **Domain**: Situation
- **Range**: Entity
- **SubProperties**: isSettingFor
- **Inverse Properties**: (none specified)

### realizesSelfInformation
**realizesSelfInformation**
- **Comment**: This relation is a workaround to enable local reflexivity axioms (Self) working with non-simple properties; in this case, dul:realizesInformation About.
- **Domain**: InformationRealization
- **Range**: InformationRealization
- **SubProperties**: realizesInformationAbout
- **Inverse Properties**: (none specified)

---

## Summary

This aggregated documentation contains **108 Object Properties** from the DUL 3.34 ontology, organized by their inverse relationships. The properties are grouped into logical categories:

- **Agent and Social Agent Relations** (6 property pairs)
- **Classification and Conceptual Relations** (10 property pairs)
- **Role and Task Relations** (3 property pairs)
- **Description and Entity Relations** (4 property pairs)
- **Information and Expression Relations** (5 property pairs)
- **Participation and Event Relations** (3 property pairs)
- **Temporal Relations** (6 property pairs)
- **Part-Whole Relations** (3 property pairs)
- **Collection and Membership Relations** (1 property pair)
- **Quality and Region Relations** (2 property pairs)
- **Spatial Relations** (1 property pair)
- **Situation and Setting Relations** (1 property pair)
- **Concept Hierarchical Relations** (2 property pairs)
- **Symmetric Relations** (9 self-inverse properties)
- **Special Relations** (3 properties without specified inverses)

This organization facilitates easier consultation by presenting related properties together, showing both directions of the relationship in a single section.