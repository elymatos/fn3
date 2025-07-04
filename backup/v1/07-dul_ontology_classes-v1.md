# DUL Ontology

The DOLCE+DnS Ultralite (DUL) ontology is a simplification of some parts of the DOLCE Lite-Plus library. The final result is a lightweight, easy-to-apply foundational ontology for modeling either physical or social contexts. Several extensions of DOLCE+DnS Ultralite have been designed: 
- Information objects: http://www.ontologydesignpatterns.org/ont/dul/IOLite.owl 
- Systems: http://www.ontologydesignpatterns.org/ont/dul/SystemsLite.owl 
- Plans: http://www.ontologydesignpatterns.org/ont/dul/PlansLite.owl
- Legal domain: http://www.ontologydesignpatterns.org/ont/dul/CLO/CoreLegal.owl
- Lexical and semiotic domains: http://www.ontologydesignpatterns.org/ont/lmm/LMM_L2.owl
- DOLCE-Zero: http://www.ontologydesignpatterns.org/ont/d0.owl is a commonsense-oriented generalisation of some top-level classes, which allows to use DOLCE with tolerance against ambiguities like abstract vs. concrete information, locations vs. physical artifacts, event occurrences vs. event types, events vs. situations, qualities vs. regions, etc.; etc.

Current version:  Version 3.34

**Total number of classes:** 72

## Classes

### Abstract

**Comment:** Any Entity that cannot be located in space-time. E.g. mathematical entities: formal semantics elements, regions within dimensional spaces, etc.

**Superclasses:**
- Entity

---

### Action

**Comment:** An Event with at least one Agent that isParticipantIn it, and that executes a Task that typically isDefinedIn a Plan, Workflow, Project, etc.

**Superclasses:**
- Event

---

### Agent

**Comment:** Any agentive Object, either physical (e.g. a whale, a robot, an oak), or social (e.g. a corporation, an institution, a community). Additional comment: a computational agent can be considered as a PhysicalAgent that realizes a certain class of algorithms (that can be considered as instances of InformationObject) that allow to obtain some behaviors that are considered typical of agents in general.

**Superclasses:**
- Object

---

### Amount

**Comment:** A quantity, independently from how it is measured, computed, etc.

**Superclasses:**
- Region

---

### BiologicalObject

**Comment:** A biological object.

**Superclasses:**
- PhysicalBody

---

### ChemicalObject

**Comment:** A chemical object.

**Superclasses:**
- PhysicalBody

---

### Classification

**Comment:** A special kind of Situation that allows to include time indexing for the classifies relation in situations. For example, if a Situation s 'my old cradle is used in these days as a flower pot' isSettingFor the entity 'my old cradle' and the TimeIntervals '8June2007' and '10June2007', and we know that s satisfies a functional Description for aesthetic objects, which defines the Concepts 'flower pot' and 'flower', then we also need to know what concept classifies 'my old cradle' at what time.

**Superclasses:**
- TimeIndexedRelation

---

### Collection

**Comment:** Any container for entities that share one or more common properties. E.g. "stone objects", "the nurses", "the Louvre Aegyptian collection", all the elections for the Italian President of the Republic. A collection is not a logical class: a collection is a first-order entity, while a class is second-order. A collection is neither an aggregate of its member entities (see e.g. ObjectAggregate class).

**Superclasses:**
- SocialObject

---

### Collective

**Comment:** A Collection whose members are agents, e.g. "the nurses", "the Italian rockabilly fans". Collectives, facon de parler, can act as agents, although they are not assumed here to be agents (they are even disjoint from the class SocialAgent). This is represented by admitting collectives in the range of the relations having Agent in their domain or range.

**Superclasses:**
- Collection

---

### CollectiveAgent

**Comment:** A SocialAgent that is actedBy agents that are (and act as) members of a Collective. A collective agent can have roles that are also roles of those agents. For example, in sociology, a 'group action' is the situation in which a number of people (that result to be members of a collective) in a given area behave in a coordinated way in order to achieve a (often common) goal. The Agent in such a Situation is not single, but a CollectiveAgent (a Group). This can be generalized to the notion of social movement, which assumes a large Community or even the entire Society as agents. The difference between a CollectiveAgent and an Organization is that a Description that introduces a CollectiveAgent is also one that unifies the corresponding Collective. In practice, this difference makes collective agents 'less stable' than organizations, because they have a dedicated, publicly recognizable Description that is conceived to introduce them.

**Superclasses:**
- SocialAgent

---

### Community

**Comment:** A type of collective agent representing a community.

**Superclasses:**
- CollectiveAgent

---

### Concept

**Comment:** A Concept is a SocialObject, and isDefinedIn some Description; once defined, a Concept can be used in other Description(s). If a Concept isDefinedIn exactly one Description, see the LocalConcept class. The classifies relation relates Concept(s) to Entity(s) at some TimeInterval

**Superclasses:**
- SocialObject

---

### Configuration

**Comment:** A collection whose members are 'unified', i.e. organized according to a certain schema that can be represented by a Description. Typically, a configuration is the collection that emerges out of a composed entity: an industrial artifact, a plan, a discourse, etc. E.g. a physical book has a configuration provided by the part-whole schema that holds together its cover, pages, ink. That schema, based on the individual relations between the book and its parts, can be represented in a reified way by means of a (structural) description, which is said to 'unify' the book configuration.

**Superclasses:**
- Collection

---

### Contract

**Comment:** (The content of) an agreement between at least two agents that play a Party Role, about some contract object (a Task to be executed).

**Superclasses:**
- Description

---

### Description

**Comment:** A Description is a SocialObject that represents a conceptualization. It can be thought also as a 'descriptive context' that uses or defines concepts in order to create a view on a 'relational context' (cf. Situation) out of a set of data or observations. For example, a Plan is a Description of some actions to be executed by agents in a certain way, with certain parameters; a Diagnosis is a Description that provides an interpretation for a set of observed entities, etc. Descriptions 'define' or 'use' concepts, and can be 'satisfied' by situations.

**Superclasses:**
- SocialObject

---

### Design

**Comment:** A Description of the Situation, in terms of structure and function, held by an Entity for some reason. A design is usually accompanied by the rationales behind the construction of the designed Entity (i.e. of the reasons why a design is claimed to be as such). For example, the actual design (a Situation) of a car or of a law is based on both the specification (a Description) of the structure, and the rationales used to construct cars or laws. While designs typically describe entities to be constructed, they can also be used to describe 'refunctionalized' entities, or to hypothesize unknown functions. For example, a cradle can be refunctionalized as a flowerpot based on a certain home design.

**Superclasses:**
- Description

---

### DesignedArtifact

**Comment:** A PhysicalArtifact that is also described by a Design. This excludes simple recycling or refunctionalization of natural objects. Most common sense 'artifacts' can be included in this class: cars, lamps, houses, chips, etc.

**Superclasses:**
- PhysicalArtifact

---

### DesignedSubstance

**Comment:** A designed substance that is both a designed artifact and a functional substance.

**Superclasses:**
- DesignedArtifact
- FunctionalSubstance

---

### Diagnosis

**Comment:** A Description of the Situation of a system, usually applied in order to control a normal behaviour, or to explain a notable behavior (e.g. a functional breakdown).

**Superclasses:**
- Description

---

### Entity

**Comment:** Anything: real, possible, or imaginary, which some modeller wants to talk about for some purpose.

**Superclasses:** None (top-level class)

---

### Event

**Comment:** Any physical, social, or mental process, event, or state. More theoretically, events can be classified in different ways, possibly based on 'aspect' (e.g. stative, continuous, accomplishement, achievement, etc.), on 'agentivity' (e.g. intentional, natural, etc.), or on 'typical participants' (e.g. human, physical, abstract, food, etc.). Here no special direction is taken, and the following explains why: events are related to observable situations, and they can have different views at a same time. If a position has to be suggested here anyway, the participant-based classification of events seems the most stable and appropriate for many modelling problems.

**Superclasses:**
- Entity

---

### EventType

**Comment:** A Concept that classifies an Event. An event type describes how an Event should be interpreted, executed, expected, seen, etc., according to the Description that the EventType isDefinedIn (or used in)

**Superclasses:**
- Concept

---

### FormalEntity

**Comment:** Entities that are formally defined and are considered independent from the social context in which they are used. They cannot be localized in space or time. Also called 'Platonic entities'. Mathematical and logical entities are included in this class: sets, categories, tuples, costants, variables, etc. Abstract formal entities are distinguished from information objects, which are supposed to be part of a social context, and are localized in space and time, therefore being (social) objects.

**Superclasses:**
- Abstract

---

### FunctionalSubstance

**Comment:** A functional substance.

**Superclasses:**
- Substance

---

### Goal

**Comment:** The Description of a Situation that is desired by an Agent, and usually associated to a Plan that describes how to actually achieve it

**Superclasses:**
- Description

---

### Group

**Comment:** A CollectiveAgent whose acting agents conceptualize a same SocialRelation.

**Superclasses:**
- CollectiveAgent

---

### InformationEntity

**Comment:** A piece of information, be it concretely realized or not. It is a catchall class, intended to bypass the ambiguities of many data or text that could denote either a an expression or a concrete realization of that expression. In a semiotic model, there is no special reason to distinguish between them, however we may want to distinguish between a pure information content (e.g. the 3rd Gymnopedie by Satie), and its possible concrete realizations as a music sheet, a piano execution, the reproduction of the execution, its publishing as a record, etc.).

**Superclasses:**
- Entity

---

### InformationObject

**Comment:** A piece of information, such as a musical composition, a text, a word, a picture, independently from how it is concretely realized.

**Superclasses:**
- InformationEntity
- SocialObject

---

### InformationRealization

**Comment:** A concrete realization of an InformationObject, e.g. the written document (object) containing the text of a law, a poetry reading (event), the dark timbre (quality) of a sound (event) in the execution (event) of a musical composition, realizing a 'misterioso' tempo indication. The realization of an information object also realizes information about itself. This is a special semiotic feature, which allows to avoid a traditonal paradox, by which an information is often supposed to be about itself besides other entities.

**Superclasses:**
- InformationEntity
- Union of classes (Event, PhysicalObject, Quality)

---

### LocalConcept

**Comment:** A Concept that isDefinedIn exactly 1 Description. For example, the Concept 'coffee' in a 'preparesCoffee' relation can be defined in that relation, and for all other Description(s) that use it, the isConceptUsedIn property should be applied. Notice therefore that not necessarily all Concept(s) isDefinedIn exactly 1 Description.

**Superclasses:**
- Concept

---

### Method

**Comment:** A method is a Description that defines or uses concepts in order to guide carrying out actions aimed at a solution with respect to a problem. It is different from a Plan, because plans could be carried out in order to follow a method, but a method can be followed by executing alternative plans.

**Superclasses:**
- Description

---

### Narrative

**Comment:** A narrative description.

**Superclasses:**
- Description

---

### NaturalPerson

**Comment:** A person in the physical commonsense intuition: 'have you seen that person walking down the street?'

**Superclasses:**
- Person
- PhysicalAgent

---

### Norm

**Comment:** A social norm.

**Superclasses:**
- Description

---

### Object

**Comment:** Any physical, social, or mental object, or a substance. Following DOLCE Full, objects are always participating in some event (at least their own life), and are spatially located.

**Superclasses:**
- Entity

---

### ObjectAggregate

**Comment:** An aggregate of distributed objects, members of a same Collection, e.g. the stars in a constellation, the parts of a car, the employees of a company, the entries from an encyclopedia, the concepts expressed in a speech, etc. It cannot be defined by means of an equivalence axiom, because it'd require the same Collection for all members, an axiom that cannot be expressed in OWL.

**Superclasses:**
- Object
- Restriction on hasPart

---

### Organism

**Comment:** A physical objects with biological characteristics, typically that organisms can self-reproduce.

**Superclasses:**
- BiologicalObject
- PhysicalAgent

---

### Organization

**Comment:** An internally structured, conventionally created SocialAgent, needing a specific Role and Agent that plays it, in order to act.

**Superclasses:**
- SocialAgent

---

### Parameter

**Comment:** A Concept that classifies a Region; the difference between a Region and a Parameter is that regions represent sets of observable values, e.g. the height of a given building, while parameters represent constraints or selections on observable values, e.g. 'VeryHigh'. Therefore, parameters can also be used to constrain regions, e.g. VeryHigh on a subset of values of the Region Height applied to buildings, or to add an external selection criterion, such as measurement units, to regions, e.g. Meter on a subset of values from the Region Length applied to the Region Length applied to roads.

**Superclasses:**
- Concept

---

### Parthood

**Comment:** A special kind of Situation that allows to include time indexing for the hasPart relation in situations. For example, if a Situation s 'finally, my bike has a luggage rack' isSettingFor the entity 'my bike' and the TimeIntervals 'now', or more specifically '29March2021', we need to have a time-index the part relation. With Parthood, we use includesWhole and includesPart properties. This can be done similarly for other arguments of parthood, e.g. location, configuration, topology, etc.

**Superclasses:**
- TimeIndexedRelation

---

### Pattern

**Comment:** Any invariance detected from a dataset, or from observation; also, any invariance proposed based on top-down considerations. E.g. patterns detected and abstracted by an organism, by pattern recognition algorithms, by machine learning techniques, etc. An occurrence of a pattern is an 'observable', or detected Situation

**Superclasses:**
- Relation

---

### Person

**Comment:** Persons in commonsense intuition, which does not apparently distinguish between either natural or social persons.

**Superclasses:**
- Agent

---

### Personification

**Comment:** A social entity with agentive features, but whose status is the result of a cultural transformation from e.g. a PhysicalObject, an Event, an Abstract, another SocialObject, etc. For example: the holy grail, deus ex machina, gods, magic wands, etc.

**Superclasses:**
- SocialAgent

---

### PhysicalAgent

**Comment:** A PhysicalObject that is capable of self-representing (conceptualizing) a Description in order to plan an Action. A PhysicalAgent is a substrate for (actsFor) a Social Agent

**Superclasses:**
- Agent
- PhysicalObject

---

### PhysicalArtifact

**Comment:** Any PhysicalObject that isDescribedBy a Plan. This axiomatization is weak, but allows to talk of artifacts in a very general sense, i.e. including recycled objects, objects with an intentional functional change, natural objects that are given a certain function, even though they are not modified or structurally designed, etc. PhysicalArtifact(s) are not considered disjoint from PhysicalBody(s), in order to allow a dual classification when needed. E.g., FunctionalSubstance(s) are included here as well.

**Superclasses:**
- PhysicalObject

---

### PhysicalAttribute

**Comment:** Physical value of a physical object, e.g. density, color, etc.

**Superclasses:**
- Region

---

### PhysicalBody

**Comment:** Physical bodies are PhysicalObject(s), for which we tend to neutralize any possible artifactual character. They can have several granularity levels: geological, chemical, physical, biological, etc.

**Superclasses:**
- PhysicalObject

---

### PhysicalObject

**Comment:** Any Object that has a proper space region. The prototypical physical object has also an associated mass, but the nature of its mass can greatly vary based on the epistemological status of the object (scientifically measured, subjectively possible, imaginary).

**Superclasses:**
- Object

---

### PhysicalPlace

**Comment:** A physical object that is inherently located; for example, a water area.

**Superclasses:**
- PhysicalObject

---

### Place

**Comment:** Socially or cognitively dependent locations: political geographic entities (Rome, Lesotho), and non-material locations determined by the presence of other entities ("the area close to Rome") or of pivot events or signs ("the area where the helicopter fell"), as well as identified as complements to other entities ("the area under the table"), etc. In this generic sense, a Place is a 'dependent' location. For 'non-dependent' locations, cf. the PhysicalPlace class. For an abstract (dimensional) location, cf. the SpaceRegion class.

**Superclasses:**
- SocialObject

---

### Plan

**Comment:** A Description having an explicit Goal, to be achieved by executing the plan

**Superclasses:**
- Description

---

### PlanExecution

**Comment:** Plan executions are situations that proactively satisfy a plan. Subplan executions are proper parts of the whole plan execution.

**Superclasses:**
- Situation

---

### Process

**Comment:** This is a placeholder for events that are considered in their evolution, or anyway not strictly dependent on agents, tasks, and plans. See Event class for some thoughts on classifying events. See also 'Transition'.

**Superclasses:**
- Event

---

### Project

**Comment:** A Plan that defines Role(s), Task(s), and a specific structure for tasks to be executed in relation to goals to be achieved, in order to achieve the main goal of the project. In other words, a project is a plan with a subgoal structure and multiple roles and tasks.

**Superclasses:**
- Plan

---

### Quality

**Comment:** Any aspect of an Entity (but not a part of it), which cannot exist without that Entity. For example, the way the surface of a specific PhysicalObject looks like, or the specific light of a place at a certain time, are examples of Quality, while the encoding of a Quality into e.g. a PhysicalAttribute should be modeled as a Region. From the design viewpoint, the Quality-Region distinction is useful only when individual aspects of an Entity are considered in a domain of discourse.

**Superclasses:**
- Entity

---

### Region

**Comment:** Any region in a dimensional space (a dimensional space is a maximal Region), which can be used as a value for a quality of an Entity. For example, TimeInterval, SpaceRegion, PhysicalAttribute, Amount, SocialAttribute are all subclasses of Region. Regions are not data values in the ordinary knowledge representation sense; in order to get patterns for modelling data, see the properties: representsDataValue and hasDataValue

**Superclasses:**
- Abstract

---

### Relation

**Comment:** Relations are descriptions that can be considered as the counterpart of formal relations (that are included in the FormalEntity class). For example, 'givingGrantToInstitution(x,y,z)' with three argument types: Provider(x),Grant(y),Recipient(z), can have a Relation counterpart: 'GivingGrantToInstitution', which defines three Concept instances: Provider,Grant,Recipient. Since social objects are not formal entities, Relation includes here any 'relation-like' entity in common sense, including social relations.

**Superclasses:**
- Description

---

### Right

**Comment:** A legal position by which an Agent is entitled to obtain something from another Agent, under specified circumstances, through an enforcement explicited either in a Law, Contract, etc.

**Superclasses:**
- Description

---

### Role

**Comment:** A Concept that classifies an Object

**Superclasses:**
- Concept

---

### Set

**Comment:** A formal set entity.

**Superclasses:**
- FormalEntity

---

### Situation

**Comment:** A view, consistent with ('satisfying') a Description, on a set of entities. It can also be seen as a 'relational context' created by an observer on the basis of a 'frame' (i.e. a Description). For example, a PlanExecution is a context including some actions executed by agents according to certain parameters and expected tasks to be achieved from a Plan; a DiagnosedSituation is a context of observed entities that is interpreted on the basis of a Diagnosis, etc. Situation is also able to represent reified n-ary relations, where isSettingFor is the top-level relation for all binary projections of the n-ary relation.

**Superclasses:**
- Entity

---

### SocialAgent

**Comment:** Any individual whose existence is granted simply by its social communicability and capability of action (through some PhysicalAgent).

**Superclasses:**
- Agent
- SocialObject

---

### SocialObject

**Comment:** Any Object that exists only within some communication Event, in which at least one PhysicalObject participates in. In other words, all objects that have been or are created in the process of social communication: for the sake of communication (InformationObject), for incorporating new individuals (SocialAgent, Place), for contextualizing or intepreting existing entities (Description, Concept), or for collecting existing entities (Collection). Being dependent on communication, all social objects need to be expressed by some information object (information objects are self-expressing).

**Superclasses:**
- Object

---

### SocialObjectAttribute

**Comment:** Any Region in a dimensional space that is used to represent some characteristic of a SocialObject, e.g. judgment values, social scalars, statistical attributes over a collection of entities, etc.

**Superclasses:**
- Region

---

### SocialPerson

**Comment:** A SocialAgent that needs the existence of a specific NaturalPerson in order to act (but the lifetime of the NaturalPerson has only to overlap that of the SocialPerson).

**Superclasses:**
- Person
- SocialAgent

---

### SocialRelation

**Comment:** Any social relationship

**Superclasses:**
- Relation

---

### SpaceRegion

**Comment:** Any Region in a dimensional space that is used to localize an Entity; i.e., it is not used to represent some characteristic (e.g. it excludes time intervals, colors, size values, judgment values, etc.). Differently from a Place, a space region has a specific dimensional space.

**Superclasses:**
- Region

---

### SpatioTemporalRegion

**Comment:** A region that combines both spatial and temporal dimensions.

**Superclasses:**
- Region

---

### Substance

**Comment:** Any PhysicalBody that has not necessarily specified (designed) boundaries, e.g. a pile of trash, some sand, etc. In this sense, an artistic object made of trash or a dose of medicine in the form of a pill would be a FunctionalSubstance, and a DesignedArtifact, since its boundaries are specified by a Design; aleatoric objects that are outcomes of an artistic process might be still considered DesignedArtifact(s), and Substance(s).

**Superclasses:**
- PhysicalBody

---

### Task

**Comment:** An EventType that classifies an Action to be executed. For example, reaching a destination is a task that can be executed by performing certain actions, e.g. driving a car, buying a train ticket, etc. The actions to execute a task can also be organized according to a Plan that is not the same as the one that defines the task (if any). For example, reaching a destination could be defined by a plan to get on holidays, while the plan to execute the task can consist of putting some travels into a sequence.

**Superclasses:**
- EventType

---

### Theory

**Comment:** A Theory is a Description that represents a set of assumptions for describing something, usually general. Scientific, philosophical, and commonsense theories can be included here. This class can also be used to act as 'naturalized reifications' of logical theories (of course, they will be necessarily incomplete in this case, because second-order entities are represented as first-order ones).

**Superclasses:**
- Description

---

### TimeIndexedRelation

**Comment:** A Situation that includes a time indexing in its setting, so allowing to order any binary relation (property) with time.

**Superclasses:**
- Situation

---

### TimeInterval

**Comment:** Any Region in a dimensional space that aims at representing time.

**Superclasses:**
- Region

---

### Transition

**Comment:** A transition is a Situation that creates a context for three TimeInterval(s), two additional different Situation(s), one Event, one Process, and at least one Object: the Event is observed as the cause for the transition, one Situation is the state before the transition, the second Situation is the state after the transition, the Process is the invariance under some different transitions (including the one represented here), in which at least one Object is situated. Finally, the time intervals position the situations and the transitional event in time. This class of situations partly encodes the ontology underlying typical engineering algebras for processes, e.g. Petri Nets.

**Superclasses:**
- Situation

---

### TypeCollection

**Comment:** A Collection whose members are the maximal set of individuals that share the same (named) type, e.g. "the gem stones", "the Italians". This class is very useful to apply a variety of the so-called "ClassesAsValues" design pattern, when it is used to talk about the extensional aspect of a class. An alternative variety of the pattern applies to the intensional aspect of a class, and the class Concept should be used instead.

**Superclasses:**
- Collection

---

### UnitOfMeasure

**Comment:** Units of measure are conceptualized here as parameters on regions, which can be valued as datatype values.

**Superclasses:**
- Parameter

---

### Workflow

**Comment:** A Plan that defines Role(s), Task(s), and a specific structure for tasks to be executed, usually supporting the work of an Organization

**Superclasses:**
- Plan

---

### WorkflowExecution

**Comment:** Workflow executions are situations that satisfy a workflow.

**Superclasses:**
- Situation

---

## Summary

The DOLCE+DnS Ultralite (DUL) ontology provides a foundational framework for modeling various aspects of reality, including:

- **Physical entities** (objects, bodies, agents, places)
- **Abstract entities** (regions, formal entities, qualities)
- **Social entities** (agents, objects, concepts, descriptions)
- **Events and processes** (actions, transitions, tasks)
- **Information entities** (objects and realizations)
- **Organizational structures** (plans, workflows, projects, goals)

The ontology follows a clear hierarchical structure with **Entity** as the top-level class, branching into major categories like **Abstract**, **Event**, **Object**, **Quality**, and **Situation**. This structure enables precise modeling of complex domains while maintaining ontological clarity and consistency.