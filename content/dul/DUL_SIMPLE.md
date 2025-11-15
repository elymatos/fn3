# Summary of SIMPLE Ontology with Focus on Qualia Relations and DUL Alignment

## Overview of SIMPLE

SIMPLE (Semantic Information for Multifunctional Plurilingual Lexicons) is a foundational ontology project that developed harmonized semantic lexicons for 12 European languages. It builds on the **Generative Lexicon (GL)** framework, particularly emphasizing the **Qualia Structure** as a core organizing principle for representing lexical meaning.

## The Qualia Structure: Core Concept

The Qualia Structure provides a **multidimensional vocabulary** for expressing different orthogonal aspects of word meaning through four fundamental roles:

### 1. **Formal Role**
- **What it captures**: Information distinguishing an entity within a larger set
- **Key relation**: `Isa` (hyperonymy/taxonomic relations)
- **Example**: A lion `Isa` feline
- **DUL alignment potential**: 
  - Maps to `dul:classifies` / `dul:isClassifiedBy`
  - Could use `rdfs:subClassOf` for taxonomic hierarchies
  - Antonym relations (for adjectives) might map to inverse properties or negation patterns

### 2. **Constitutive Role**
- **What it captures**: Internal constitution, parts, materials, members
- **Primary function**: Expresses mereological and compositional relationships

#### Key Constitutive Relations:

**Mereological Relations:**
- `Is_a_part_of` / `Has_as_part` 
  - **DUL mapping**: `dul:hasPart` / `dul:isPartOf`
- `Is_a_member_of` / `Has_as_member`
  - **DUL mapping**: `dul:hasMember` / `dul:isMemberOf`
- `Is_a_component_of` / `Has_as_component`
  - **DUL mapping**: `dul:hasComponent` / `dul:isComponentOf`
- `Is_a_constituent_of` / `Has_as_constituent`
  - **DUL mapping**: `dul:hasConstituent` / `dul:isConstituentOf`

**Material and Location Relations:**
- `Made_of`: What substance/material something is made from
  - **DUL mapping**: Could use `dul:hasConstituent` or create specialized subproperty
- `Is_in` / `Lives_in`: Typical location
  - **DUL mapping**: `dul:hasLocation` / `dul:isLocationOf`

**Property Relations:**
- `Has_as_colour`, `Constitutive_activity`, `Produces`, `Produced_by`
  - **DUL mapping**: These map to DUL's **Quality-Region pattern**
  - Entity → `dul:hasQuality` → Quality → `dul:hasRegion` → Region

**Other Constitutive Relations:**
- `Instrument`: Typical instrument used
  - **DUL mapping**: Could use `dul:hasParticipant` with role qualification
- `Relates`: Entities related by a relation
- `Resulting_state`: Resulting state of transitions
  - **DUL mapping**: `dul:hasPostcondition` / temporal sequences
- `Property_of`: Links abstract nouns to adjectives (e.g., beauty → beautiful)

#### Constitutive Features:
SIMPLE includes ~30 binary/closed-list features (Sex, Age, Dimension, Direction, etc.)
- **DUL mapping**: These map to `dul:Region` subclasses or datatype properties

### 3. **Telic Role**
- **What it captures**: Typical function, purpose, or intended use
- **Central to**: Artifactual entities (created for specific purposes)

#### Key Telic Relations:

**Direct Telic:**
- `Object_of_the_activity`: What activity the entity is typically object of
  - Example: Book → read
  - **DUL mapping**: `dul:executesTask` (where task is defined in a `dul:Plan` or `dul:Design`)

**Indirect Telic:**
- `Used_for`: Typical function/purpose
  - Example: Crane → lift
  - **DUL mapping**: Links to `dul:Task` via `dul:Design` descriptions
  
- `Is_the_activity_of`: Characterizing activity (for professions/roles)
  - Example: Doctor → heal
  - **DUL mapping**: `dul:hasTask` / `dul:isTaskOf` within role definitions

- `Is_the_ability_of`, `Is_the_habit_of`: Abilities or habits
  - **DUL mapping**: Similar to activities, via `dul:Role` and `dul:Task`

**Other Telic Relations:**
- `Used_by`, `Used_against`, `Used_as`, `Purpose`
  - **DUL mapping**: All connect to DUL's **Description-Situation** framework
  - Purposes are `dul:Goal` instances
  - Uses are captured in `dul:Design` or `dul:Plan` descriptions

### 4. **Agentive Role**
- **What it captures**: Origin, creation, coming into being
- **Type-defining for**: Artifacts and derived entities

#### Key Agentive Relations:

**Artifactual Agentive:**
- `Created_by`: Process/action that creates
  - Example: Book → write
  - **DUL mapping**: `dul:describes` (Design describes creation process)
  
- `Derived_from`: Object derived through transformation
  - Example: Petrol → oil
  - **DUL mapping**: Could use `dul:precedes` or specialized process relations

**Natural/Causal Agentive:**
- `Caused_by`: Natural cause
  - Example: Infection → bacterium
  - **DUL mapping**: `dul:hasParticipant` with causal interpretation
  
- `Produced_by`: Natural production
  - Example: Honey → bee
  - **DUL mapping**: Similar to `Caused_by`

**Event-Related Agentive:**
- `Result_of`: Entity as result of event
  - Example: Loss → lose
  - **DUL mapping**: `dul:hasPrecondition` / `dul:hasPostcondition`
  
- `Agentive_prog`: Ongoing event while property holds
  - Example: Pedestrian → walk
  - **DUL mapping**: `dul:hasTimeInterval` + `dul:hasParticipant`

- `Agentive_Cause`: Causing component of causative events
  - **DUL mapping**: Causal relations in event hierarchies

- `Agentive_Experience`: Psychological experience that brings about state
  - **DUL mapping**: `dul:includesEvent` in situation modeling

**Other Agentive:**
- `Source`: Origin/source
  - Example: Law → society

## Type Construction and Semantic Types

SIMPLE distinguishes three levels of semantic type complexity:

### 1. **Simple Types**
- Defined solely by taxonomic (Isa) relations
- Example: `[Animal]` → subtype of `[Living_entity]`
- **DUL mapping**: Direct use of `rdfs:subClassOf` or `dul:classifies`

### 2. **Unified Types**
- Multidimensional types requiring multiple coordinates
- Identified by: Supertype + Agentive and/or Telic dimensions
- Use **Unification_path** notation: `[Simple_type | Agentive | Telic]`

Examples:
- `[Vehicle]`: `[Concrete_entity | ArtifactAgentive | Telic]`
- `[Profession]`: `[Human | Telic]`
- `[Instrument]`: `[Concrete_entity | ArtifactAgentive | Telic]`

**DUL mapping**: This maps directly to DUL's **Description-Situation** pattern:
- The Agentive dimension → `dul:Design` describing creation
- The Telic dimension → `dul:Design` or `dul:Plan` describing purpose
- Unified types are entities satisfying these descriptions

### 3. **Complex Types**
- For regular polysemous classes
- Represent systematic sense alternations
- Examples: Building-Institution, Animal-Food, Container-Content

**DUL mapping**: Multiple `dul:Situation` instances satisfying different `dul:Description`s, all including the same entity

## Critical Alignment Points: SIMPLE ↔ DUL

### A. **The Description-Situation Correspondence**

**SIMPLE's approach:**
- Distinguishes type-defining vs. additional information in Qualia
- Recognizes frame-based interpretation

**DUL's D&S pattern:**
- `Description` = conceptual frame (theories, schemas)
- `Situation` = view on reality satisfying a description

**Mapping strategy:**
1. SIMPLE's **type-defining Qualia information** → DUL `Description` that defines concepts
2. SIMPLE's **Situations** (implicit in templates) → DUL `Situation` instances
3. SIMPLE's **Templates** → DUL `Concept` definitions within `Description`

Example:
```turtle
# SIMPLE: Vehicle template with telic info
[Vehicle] | [Concrete_entity | ArtifactAgentive | Telic]
Telic: Used_for(<vehicle>, <move>)

# DUL equivalent:
:VehicleDesign a dul:Design ;
    dul:defines :VehicleConcept ;
    dul:definesTask :TransportationTask .

:VehicleConcept a dul:Concept ;
    dul:isDefinedIn :VehicleDesign .

:Car123 a dul:PhysicalObject ;
    dul:isClassifiedBy :VehicleConcept .

:Car123Usage a dul:Situation ;
    dul:satisfies :VehicleDesign ;
    dul:includesObject :Car123 ;
    dul:includesAction :DrivingAction .
```

### B. **Mereological Relations: Direct Correspondence**

SIMPLE's parthood relations map cleanly to DUL:

| SIMPLE Relation | DUL Property | Notes |
|----------------|--------------|-------|
| `Has_as_part` / `Is_a_part_of` | `dul:hasPart` / `dul:isPartOf` | Reflexive + transitive |
| `Has_as_component` / `Is_a_component_of` | `dul:hasComponent` / `dul:isComponentOf` | For designed systems |
| `Has_as_constituent` / `Is_a_constituent_of` | `dul:hasConstituent` / `dul:isConstituentOf` | Cross-layer |
| `Has_as_member` / `Is_a_member_of` | `dul:hasMember` / `dul:isMemberOf` | For collections |

Both support **time-indexed parthood** through situational reification.

### C. **Quality-Region Pattern Correspondence**

**SIMPLE's approach:**
- `Quality` = individual aspect (e.g., "Dmitri's skin yellowness")
- `Region` = abstract value (e.g., "Yellow" in color space)
- Relation: `hasRegion` connects Quality to Region

**DUL's approach:**
- `dul:Quality` = individual aspects of entities
- `dul:Region` = values in dimensional spaces
- `dul:hasRegion` / `dul:isRegionFor`

**Perfect alignment**: The Quality-Region pattern is essentially identical in both ontologies.

SIMPLE features map to DUL `Region` subclasses:
- SIMPLE `Amount` → DUL `dul:Amount`
- SIMPLE `PhysicalAttribute` → DUL `dul:PhysicalAttribute`
- SIMPLE `SpaceRegion` → DUL `dul:SpaceRegion`
- SIMPLE `TimeInterval` → DUL `dul:TimeInterval`

### D. **Information and Expression**

**SIMPLE model:**
- `InformationObject` (abstract)
- `InformationRealization` (concrete)
- `expresses` relation (InformationObject → SocialObject)

**DUL model:**
- `dul:InformationObject` (abstract)
- `dul:InformationRealization` (concrete)
- `dul:realizes` (Realization → Object)
- `dul:expresses` (InformationObject → SocialObject)

**Direct correspondence**: Three-level model identical:
Physical Realization → Abstract Information → Social Meaning

### E. **Events and Participants**

**SIMPLE:**
- Event types with argument structures
- Predicative representations with selectional restrictions
- Event_type feature: {state, process, transition}

**DUL:**
- `dul:Event` with `dul:hasParticipant`
- `dul:Action` (with agents) vs. `dul:Process`
- Aspectual neutrality (use Situations for aspect)

**Mapping strategy:**
- SIMPLE predicates → DUL `dul:EventType` or `dul:Task` concepts
- SIMPLE arguments → DUL participants via `dul:hasParticipant`
- SIMPLE selectional restrictions → DUL `dul:Concept` constraints in `dul:Description`

### F. **Roles and Classification**

**SIMPLE:**
- Roles defined in Descriptions
- Time-indexed classification via `Classification` Situations
- `Is_the_activity_of` connects roles to activities

**DUL:**
- `dul:Role` defined in `dul:Description`
- `dul:Classification` (a TimeIndexedRelation)
- `dul:hasRole` / `dul:hasTask`

**Strong alignment**: Both use Description-based role definitions with situational classification.

## Comprehensive Mapping Table: SIMPLE Qualia → DUL Properties

### Formal Role

| SIMPLE Relation | DUL Property | Notes |
|----------------|--------------|-------|
| `Isa` | `rdfs:subClassOf` or `dul:classifies` | Taxonomic hierarchy |
| `Antonym_comp/grad/mult` | Custom inverse properties | For adjectives |

### Constitutive Role

| SIMPLE Relation | DUL Property | Notes |
|----------------|--------------|-------|
| `Is_a_part_of` | `dul:isPartOf` | Mereology |
| `Has_as_part` | `dul:hasPart` | Mereology |
| `Is_a_component_of` | `dul:isComponentOf` | Design structure |
| `Has_as_component` | `dul:hasComponent` | Design structure |
| `Is_a_constituent_of` | `dul:isConstituentOf` | Cross-layer |
| `Has_as_constituent` | `dul:hasConstituent` | Cross-layer |
| `Is_a_member_of` | `dul:isMemberOf` | Collections |
| `Has_as_member` | `dul:hasMember` | Collections |
| `Made_of` | `dul:hasConstituent` (specialized) | Material composition |
| `Is_in` / `Lives_in` | `dul:hasLocation` | Spatial relations |
| `Has_as_colour` | `dul:hasQuality` → `dul:hasRegion` | Quality-Region pattern |
| `Constitutive_activity` | `dul:hasParticipant` (in situation) | Natural activities |
| `Produces` / `Produced_by` | Custom causal properties | Or use situations |
| `Property_of` | Custom property | Adjective-noun link |
| `Instrument` | `dul:hasParticipant` (qualified) | In action contexts |
| `Resulting_state` | `dul:hasPostcondition` | State transitions |
| `Concerns` | `dul:describes` or custom | Topical relations |
| `Contains` | `dul:hasPart` (specialized) | Containment |
| `Quantifies` | Custom property | Amount relations |
| `Measured_by` | `dul:hasParameter` | Units of measure |
| `Related_to` | `dul:associatedWith` | Generic relation |

### Telic Role

| SIMPLE Relation | DUL Property | Context |
|----------------|--------------|---------|
| `Used_for` | Via `dul:Design` → `dul:Task` | Artifact functions |
| `Object_of_the_activity` | Via `dul:Design` → `dul:Task` | Purpose activities |
| `Is_the_activity_of` | `dul:hasTask` | Role activities |
| `Is_the_ability_of` | `dul:hasTask` (ability variant) | Agent capabilities |
| `Is_the_habit_of` | `dul:hasTask` (habitual variant) | Regular activities |
| `Used_by` | Via `dul:Design` → `dul:Role` | User specification |
| `Used_against` | Via `dul:Design` → `dul:Role` | Target specification |
| `Used_as` | Via `dul:Design` → `dul:Concept` | Functional role |
| `Purpose` | `dul:Goal` or `dul:hasPostcondition` | Intended outcomes |

### Agentive Role

| SIMPLE Relation | DUL Property | Context |
|----------------|--------------|---------|
| `Created_by` | Via `dul:Design` → `dul:Task` | Creation processes |
| `Derived_from` | `dul:precedes` or custom | Transformation |
| `Caused_by` | `dul:hasParticipant` (causal) | Natural causation |
| `Produced_by` | `dul:hasParticipant` (productive) | Natural production |
| `Result_of` | `dul:hasPrecondition` (inverse) | Result relations |
| `Agentive_prog` | Via temporal `dul:Situation` | Ongoing events |
| `Agentive_Cause` | Causal event relations | Causative events |
| `Agentive_Experience` | `dul:includesEvent` | Psychological events |
| `Source` | Custom origin property | Origins |

## Derivational Relations

SIMPLE's derivational relations map to DUL's property chains:

| SIMPLE Derivation | DUL Pattern |
|------------------|-------------|
| `Nounadjective` | Property → `dul:expresses` → Concept |
| `Agentverb` | Agent role → `dul:executesTask` → Task |
| `Eventverb` | Event nominalization pattern |
| `DenominalVerbNoun` | Via `dul:Design` descriptions |

## Implementation Strategy for SIMPLE-DUL Alignment

### Phase 1: Core Mapping
1. Map SIMPLE's top ontology to DUL classes
2. Create property mappings for direct correspondences (mereology, quality-region)
3. Implement Description templates for unified types

### Phase 2: Qualia Integration
1. For each SIMPLE template:
   - Create corresponding DUL `Description`
   - Define `Concept`s, `Role`s, `Task`s
   - Specify type-defining Qualia as Description constraints

2. Implement Situation patterns for:
   - Classification (time-indexed)
   - PlanExecution (for telic relations)
   - Design satisfaction (for artifactual types)

### Phase 3: Instance Mapping
1. SIMPLE SemUs → DUL entities satisfying Descriptions
2. Qualia relations → DUL property assertions within Situations
3. Features → Region values

### Example: Complete Mapping

**SIMPLE Template for Vehicle:**
```
Template_Type: [Vehicle]
Unification_Path: [Concrete_entity | ArtifactAgentive | Telic]
Formal: Isa(<vehicle>, <object>)
Constitutive: Has_as_part(<vehicle>, <engine>)
Telic: Used_for(<vehicle>, <move>)
Agentive: Created_by(<vehicle>, <make>)
```

**DUL Equivalent:**
```turtle
# Description
:VehicleDesign a dul:Design ;
    rdfs:label "Vehicle Design Description" ;
    dul:defines :VehicleConcept, :TransportationTask, :VehicleEngine ;
    dul:definesTask :ManufacturingTask .

# Concepts
:VehicleConcept a dul:Concept ;
    dul:isDefinedIn :VehicleDesign ;
    rdfs:subClassOf dul:PhysicalArtifact .

:TransportationTask a dul:Task ;
    dul:isDefinedIn :VehicleDesign .

:ManufacturingTask a dul:Task ;
    dul:isDefinedIn :VehicleDesign .

# Instance
:Car123 a dul:PhysicalObject, dul:DesignedArtifact ;
    dul:isClassifiedBy :VehicleConcept ;
    dul:hasComponent :Car123_Engine .

# Situation: Design Satisfaction
:Car123_AsVehicle a dul:Situation ;
    dul:satisfies :VehicleDesign ;
    dul:includesObject :Car123 .

# Situation: Usage (Telic)
:Car123_Usage a dul:PlanExecution ;
    dul:satisfies :TransportationPlan ;
    dul:includesObject :Car123 ;
    dul:includesAction :DrivingAction_20240615 .

:DrivingAction_20240615 a dul:Action ;
    dul:executesTask :TransportationTask .

# Agentive (via Design)
:Car123_Creation a dul:Situation ;
    dul:satisfies :VehicleDesign ;
    dul:includesAction :ManufacturingAction_2020 .

:ManufacturingAction_2020 a dul:Action ;
    dul:executesTask :ManufacturingTask ;
    dul:hasParticipant :Car123 .
```

## Key Insights

1. **Philosophical Alignment**: Both SIMPLE and DUL recognize frame-based interpretation (SIMPLE via Templates/Descriptions, DUL via Descriptions-Situations)

2. **Qualia as Descriptions**: SIMPLE's Qualia structure maps to DUL's Description-based modeling:
   - Type-defining Qualia → Definition in Description
   - Additional Qualia → Situation-specific assertions

3. **Unified Types = Situated Entities**: SIMPLE's unified types (with Agentive/Telic dimensions) correspond to DUL entities satisfying Design/Plan descriptions

4. **Reification Strategy**: Both use extensive reification (SIMPLE: Situations, Templates; DUL: Situations, Quality-Region)

5. **Social-Physical Distinction**: Both maintain Physical-Social ontological distinction, with information as bridge

## Challenges and Considerations

1. **Granularity**: DUL is more foundational; SIMPLE more lexical-semantic. May need intermediate layer.

2. **Predicative Representations**: SIMPLE's predicate-argument structures need careful mapping to DUL's event-participant model

3. **Regular Polysemy**: SIMPLE's complex types for polysemy need multiple DUL Situations satisfying different Descriptions

4. **Domain Specificity**: SIMPLE has domain/semantic class hierarchies; DUL is domain-neutral. Requires extension strategy.

5. **Template Instantiation**: SIMPLE templates are encoding guides; DUL needs actual Description instances. Transformation workflow needed.

## Conclusion

SIMPLE and DUL are highly compatible, sharing:
- Frame-based semantics
- Reification strategies  
- Physical-social-information distinctions
- Quality-Region patterns
- Mereological relations

The **Qualia relations** in SIMPLE map systematically to DUL through:
- **Formal** → Classification via `dul:Concept`
- **Constitutive** → Mereological `dul:hasPart` family + Quality-Region
- **Telic** → `dul:Design`/`dul:Plan` defining `dul:Task`s
- **Agentive** → `dul:Design` describing creation/causation

The alignment enables:
- Rich lexical resources with foundational grounding
- Interoperability between linguistic and conceptual models
- Multi-perspective modeling (same entity, different qualia emphases)
- Context-sensitive, time-indexed semantic relations
