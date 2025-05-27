I cannot directly create downloadable `.owl` files for you. However, I can provide the complete content for each of the nine domain ontology files in separate code blocks. You can then copy the content from each block and save it into a `.owl` file with the specified filename (e.g., `BiologicalDomain.owl`).

Each of these domain ontology files will import `http://www.fn5.org/ontology/domain`, which in turn imports `http://www.fn5.org/ontology/core` and DUL. This ensures a consistent and hierarchically structured ontological model.

Here are the contents for each of the nine domain ontology files:

---

### **1. Biological Domain Ontology (`BiologicalDomain.owl`)**

Code snippet

```
@prefix owl: <http://www.w3.org/2002/07/owl#> .
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .
@prefix fn5_core: <http://www.fn5.org/ontology/core#> .
@prefix fn5_domain: <http://www.fn5.org/ontology/domain#> .
@prefix fn5_biological: <http://www.fn5.org/ontology/biological#> .
@prefix dul: <http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#> .

<http://www.fn5.org/ontology/biological> rdf:type owl:Ontology ;
    owl:imports fn5_domain:domain . # Import the domain ontology

### Biological Domain - High-Level Classes ###

fn5_biological:Organism rdf:type owl:Class ;
    rdfs:subClassOf fn5_domain:BiologicalEntity ;
    rdfs:comment "Represents any living being, from single cells to complex organisms." .

fn5_biological:BiologicalProcess rdf:type owl:Class ;
    rdfs:subClassOf fn5_domain:BiologicalProcess ;
    rdfs:comment "Any process occurring within or involving living systems." .

fn5_biological:BiologicalState rdf:type owl:Class ;
    rdfs:subClassOf fn5_core:State ;
    rdfs:comment "A specific condition or mode of being of a biological entity." .

fn5_biological:BiologicalQuality rdf:type owl:Class ;
    rdfs:subClassOf fn5_core:Quality ;
    rdfs:comment "An attribute or characteristic of a biological entity or process." .

fn5_biological:BiologicalResource rdf:type owl:Class ;
    rdfs:subClassOf fn5_core:Resource ;
    rdfs:comment "Any biological material or entity used as a resource." .

### Biological Domain - High-Level Properties ###

fn5_biological:performsBiologicalProcess rdf:type owl:ObjectProperty ;
    rdfs:subPropertyOf fn5_core:performs ;
    rdfs:domain fn5_biological:Organism ;
    rdfs:range fn5_biological:BiologicalProcess ;
    rdfs:comment "Connects an organism to a biological process it performs." .

fn5_biological:hasBiologicalState rdf:type owl:ObjectProperty ;
    rdfs:subPropertyOf fn5_core:hasQuality ;
    rdfs:domain fn5_biological:Organism ;
    rdfs:range fn5_biological:BiologicalState ;
    rdfs:comment "Connects a biological entity to its biological state." .

fn5_biological:hasBiologicalQuality rdf:type owl:ObjectProperty ;
    rdfs:subPropertyOf fn5_core:hasQuality ;
    rdfs:domain fn5_biological:Organism ;
    rdfs:range fn5_biological:BiologicalQuality ;
    rdfs:comment "Connects a biological entity to its biological quality." .

fn5_biological:utilizesResource rdf:type owl:ObjectProperty ;
    rdfs:subPropertyOf fn5_core:uses ;
    rdfs:domain fn5_biological:Organism ;
    rdfs:range fn5_biological:BiologicalResource ;
    rdfs:comment "Indicates that an organism uses a biological resource." .

fn5_biological:affectsBiologicalState rdf:type owl:ObjectProperty ;
    rdfs:subPropertyOf fn5_domain:affectsBiologicalState ;
    rdfs:domain fn5_biological:BiologicalProcess ;
    rdfs:range fn5_biological:BiologicalEntity ;
    rdfs:comment "Indicates a process that influences a biological entity or its state." .

fn5_biological:undergoesProcess rdf:type owl:ObjectProperty ;
    rdfs:subPropertyOf fn5_core:occursIn ; # General relation
    rdfs:domain fn5_biological:Organism ;
    rdfs:range fn5_biological:BiologicalProcess ;
    rdfs:comment "Indicates that an organism undergoes a biological process." .

fn5_biological:involvesOrganism rdf:type owl:ObjectProperty ;
    rdfs:subPropertyOf dul:hasParticipant ;
    rdfs:domain fn5_biological:BiologicalProcess ;
    rdfs:range fn5_biological:Organism ;
    rdfs:comment "Indicates a biological process has an organism as a participant." .

```

---

### **2. Cognitive Domain Ontology (`CognitiveDomain.owl`)**

Code snippet

```
@prefix owl: <http://www.w3.org/2002/07/owl#> .
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .
@prefix fn5_core: <http://www.fn5.org/ontology/core#> .
@prefix fn5_domain: <http://www.fn5.org/ontology/domain#> .
@prefix fn5_cognitive: <http://www.fn5.org/ontology/cognitive#> .
@prefix dul: <http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#> .

<http://www.fn5.org/ontology/cognitive> rdf:type owl:Ontology ;
    owl:imports fn5_domain:domain . # Import the domain ontology

### Cognitive Domain - High-Level Classes ###

fn5_cognitive:MentalObject rdf:type owl:Class ;
    rdfs:subClassOf fn5_domain:CognitiveEntity ;
    rdfs:comment "Represents abstract mental constructs such as thoughts, ideas, concepts, and beliefs." .

fn5_cognitive:CognitiveAgent rdf:type owl:Class ;
    rdfs:subClassOf fn5_core:Agent ; # A specific type of agent within the cognitive domain
    rdfs:comment "An agent capable of cognitive processes." .

fn5_cognitive:CognitiveProcess rdf:type owl:Class ;
    rdfs:subClassOf fn5_domain:CognitiveProcess ;
    rdfs:comment "Any mental operation or activity, such as perception, memory, or reasoning." .

fn5_cognitive:CognitiveState rdf:type owl:Class ;
    rdfs:subClassOf fn5_core:State ;
    rdfs:comment "A specific condition or mode of being of a cognitive agent's mind, e.g., attentional state." .

fn5_cognitive:CognitiveQuality rdf:type owl:Class ;
    rdfs:subClassOf fn5_core:Quality ;
    rdfs:comment "An attribute or characteristic related to cognitive functions, e.g., clarity of thought." .

### Cognitive Domain - High-Level Properties ###

fn5_cognitive:engagesIn rdf:type owl:ObjectProperty ;
    rdfs:subPropertyOf fn5_core:performs ;
    rdfs:domain fn5_cognitive:CognitiveAgent ;
    rdfs:range fn5_cognitive:CognitiveProcess ;
    rdfs:comment "Connects a cognitive agent to a cognitive process they engage in." .

fn5_cognitive:formsMentalObject rdf:type owl:ObjectProperty ;
    rdfs:subPropertyOf fn5_core:resultsIn ; # Cognitive process results in mental object
    rdfs:domain fn5_cognitive:CognitiveProcess ;
    rdfs:range fn5_cognitive:MentalObject ;
    rdfs:comment "Indicates that a cognitive process creates a mental object." .

fn5_cognitive:hasCognitiveState rdf:type owl:ObjectProperty ;
    rdfs:subPropertyOf fn5_core:hasQuality ;
    rdfs:domain fn5_cognitive:CognitiveAgent ;
    rdfs:range fn5_cognitive:CognitiveState ;
    rdfs:comment "Connects a cognitive agent to their cognitive state." .

fn5_cognitive:hasCognitiveQuality rdf:type owl:ObjectProperty ;
    rdfs:subPropertyOf fn5_core:hasQuality ;
    rdfs:domain fn5_cognitive:CognitiveEntity ;
    rdfs:range fn5_cognitive:CognitiveQuality ;
    rdfs:comment "Connects a cognitive entity to its cognitive quality." .

fn5_cognitive:influencesCognition rdf:type owl:ObjectProperty ;
    rdfs:subPropertyOf fn5_domain:influencesCognition ;
    rdfs:domain fn5_cognitive:CognitiveEntity ;
    rdfs:range fn5_cognitive:CognitiveProcess ;
    rdfs:comment "Indicates that a cognitive entity impacts a cognitive process." .

fn5_cognitive:perceives rdf:type owl:ObjectProperty ;
    rdfs:subPropertyOf dul:perceives ;
    rdfs:domain fn5_cognitive:CognitiveAgent ;
    rdfs:range fn5_core:Entity ;
    rdfs:comment "Indicates that a cognitive agent perceives an entity." .

```

---

### **3. Cultural Domain Ontology (`CulturalDomain.owl`)**

Code snippet

```
@prefix owl: <http://www.w3.org/2002/07/owl#> .
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .
@prefix fn5_core: <http://www.fn5.org/ontology/core#> .
@prefix fn5_domain: <http://www.fn5.org/ontology/domain#> .
@prefix fn5_cultural: <http://www.fn5.org/ontology/cultural#> .
@prefix dul: <http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#> .

<http://www.fn5.org/ontology/cultural> rdf:type owl:Ontology ;
    owl:imports fn5_domain:domain . # Import the domain ontology

### Cultural Domain - High-Level Classes ###

fn5_cultural:CulturalConstruct rdf:type owl:Class ;
    rdfs:subClassOf fn5_domain:CulturalConstruct ;
    rdfs:comment "Represents shared beliefs, values, norms, practices, and institutions within a group." .

fn5_cultural:CulturalPractice rdf:type owl:Class ;
    rdfs:subClassOf fn5_domain:CulturalPractice ;
    rdfs:comment "Represents recurring or institutionalized activities performed within a cultural context." .

fn5_cultural:CulturalAgent rdf:type owl:Class ;
    rdfs:subClassOf fn5_core:Agent ; # Specific type of agent within cultural context
    rdfs:comment "An individual or group acting within a cultural context." .

fn5_cultural:CulturalContext rdf:type owl:Class ;
    rdfs:subClassOf fn5_core:Context ;
    rdfs:comment "The specific cultural setting or environment." .

fn5_cultural:CulturalState rdf:type owl:Class ;
    rdfs:subClassOf fn5_core:State ;
    rdfs:comment "A condition or mode of being of a cultural system or practice." .

### Cultural Domain - High-Level Properties ###

fn5_cultural:engagesInPractice rdf:type owl:ObjectProperty ;
    rdfs:subPropertyOf fn5_core:performs ;
    rdfs:domain fn5_cultural:CulturalAgent ;
    rdfs:range fn5_cultural:CulturalPractice ;
    rdfs:comment "Connects a cultural agent to a cultural practice they engage in." .

fn5_cultural:createsConstruct rdf:type owl:ObjectProperty ;
    rdfs:subPropertyOf fn5_core:resultsIn ;
    rdfs:domain fn5_cultural:CulturalPractice ;
    rdfs:range fn5_cultural:CulturalConstruct ;
    rdfs:comment "Indicates that a cultural practice creates or manifests a cultural construct." .

fn5_cultural:occursInCulturalContext rdf:type owl:ObjectProperty ;
    rdfs:subPropertyOf fn5_core:occursIn ;
    rdfs:domain fn5_cultural:CulturalPractice ;
    rdfs:range fn5_cultural:CulturalContext ;
    rdfs:comment "Indicates that a cultural practice occurs within a specific cultural context." .

fn5_cultural:shapesCulture rdf:type owl:ObjectProperty ;
    rdfs:subPropertyOf fn5_domain:shapesCulture ;
    rdfs:domain fn5_cultural:CulturalConstruct ;
    rdfs:range fn5_cultural:CulturalPractice ;
    rdfs:comment "Indicates how a cultural construct influences cultural practices." .

fn5_cultural:hasCulturalState rdf:type owl:ObjectProperty ;
    rdfs:subPropertyOf fn5_core:hasQuality ;
    rdfs:domain fn5_cultural:CulturalConstruct ;
    rdfs:range fn5_cultural:CulturalState ;
    rdfs:comment "Connects a cultural construct or system to its state." .

```

---

### **4. Moral Domain Ontology (`MoralDomain.owl`)**

Code snippet

```
@prefix owl: <http://www.w3.org/2002/07/owl#> .
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .
@prefix fn5_core: <http://www.fn5.org/ontology/core#> .
@prefix fn5_domain: <http://www.fn5.org/ontology/domain#> .
@prefix fn5_moral: <http://www.fn5.org/ontology/moral#> .
@prefix dul: <http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#> .

<http://www.fn5.org/ontology/moral> rdf:type owl:Ontology ;
    owl:imports fn5_domain:domain . # Import the domain ontology

### Moral Domain - High-Level Classes ###

fn5_moral:MoralNorm rdf:type owl:Class ;
    rdfs:subClassOf fn5_domain:MoralEntity ;
    rdfs:comment "Represents ethical principles, rules, or standards of conduct." .

fn5_moral:MoralAgent rdf:type owl:Class ;
    rdfs:subClassOf fn5_core:Agent ; # Specific type of agent in moral context
    rdfs:comment "An agent capable of moral reasoning and action." .

fn5_moral:MoralSituation rdf:type owl:Class ;
    rdfs:subClassOf fn5_core:Context ; # A moral context is a type of context
    rdfs:comment "A situation involving ethical considerations and moral choices." .

fn5_moral:MoralProcess rdf:type owl:Class ;
    rdfs:subClassOf fn5_domain:MoralProcess ;
    rdfs:comment "Any process of ethical evaluation, decision-making, or behavior." .

fn5_moral:MoralJudgment rdf:type owl:Class ;
    rdfs:subClassOf fn5_core:Quality ; # A judgment is a quality of an assessment
    rdfs:comment "A conclusion about moral rightness or wrongness." .

### Moral Domain - High-Level Properties ###

fn5_moral:appliesNorm rdf:type owl:ObjectProperty ;
    rdfs:subPropertyOf fn5_core:uses ;
    rdfs:domain fn5_moral:MoralAgent ;
    rdfs:range fn5_moral:MoralNorm ;
    rdfs:comment "Connects a moral agent to a moral norm they apply." .

fn5_moral:occursInMoralSituation rdf:type owl:ObjectProperty ;
    rdfs:subPropertyOf fn5_core:occursIn ;
    rdfs:domain fn5_moral:MoralProcess ;
    rdfs:range fn5_moral:MoralSituation ;
    rdfs:comment "Indicates that a moral process occurs within a specific moral situation." .

fn5_moral:guidesMoralBehavior rdf:type owl:ObjectProperty ;
    rdfs:subPropertyOf fn5_domain:guidesMoralBehavior ;
    rdfs:domain fn5_moral:MoralNorm ;
    rdfs:range fn5_moral:MoralProcess ;
    rdfs:comment "Indicates that a moral entity or principle guides moral processes or behavior." .

fn5_moral:resultsInJudgment rdf:type owl:ObjectProperty ;
    rdfs:subPropertyOf fn5_core:resultsIn ;
    rdfs:domain fn5_moral:MoralProcess ;
    rdfs:range fn5_moral:MoralJudgment ;
    rdfs:comment "Indicates that a moral process leads to a moral judgment." .

```

---

### **5. Physical Domain Ontology (`PhysicalDomain.owl`)**

Code snippet

```
@prefix owl: <http://www.w3.org/2002/07/owl#> .
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .
@prefix fn5_core: <http://www.fn5.org/ontology/core#> .
@prefix fn5_domain: <http://www.fn5.org/ontology/domain#> .
@prefix fn5_physical: <http://www.fn5.org/ontology/physical#> .
@prefix dul: <http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#> .

<http://www.fn5.org/ontology/physical> rdf:type owl:Ontology ;
    owl:imports fn5_domain:domain . # Import the domain ontology

### Physical Domain - High-Level Classes ###

fn5_physical:PhysicalObject rdf:type owl:Class ;
    rdfs:subClassOf fn5_domain:PhysicalObject ;
    rdfs:comment "Represents any tangible material entity." .

fn5_physical:PhysicalProcess rdf:type owl:Class ;
    rdfs:subClassOf fn5_domain:PhysicalProcess ;
    rdfs:comment "Any natural or artificial process involving physical forces, matter, or energy." .

fn5_physical:PhysicalQuality rdf:type owl:Class ;
    rdfs:subClassOf fn5_core:Quality ;
    rdfs:comment "An observable characteristic or attribute of a physical object or process." .

fn5_physical:PhysicalState rdf:type owl:Class ;
    rdfs:subClassOf fn5_core:State ;
    rdfs:comment "A condition or mode of being of a physical object, e.g., solid, liquid, gas." .

fn5_physical:PhysicalForce rdf:type owl:Class ;
    rdfs:subClassOf fn5_core:Entity ; # Can be seen as an abstract entity or quality related to a process
    rdfs:comment "A physical interaction that tends to change the motion of an object." .

### Physical Domain - High-Level Properties ###

fn5_physical:hasPhysicalQuality rdf:type owl:ObjectProperty ;
    rdfs:subPropertyOf fn5_core:hasQuality ;
    rdfs:domain fn5_physical:PhysicalObject ;
    rdfs:range fn5_physical:PhysicalQuality ;
    rdfs:comment "Connects a physical object to its physical quality." .

fn5_physical:undergoesPhysicalProcess rdf:type owl:ObjectProperty ;
    rdfs:subPropertyOf fn5_core:occursIn ;
    rdfs:domain fn5_physical:PhysicalObject ;
    rdfs:range fn5_physical:PhysicalProcess ;
    rdfs:comment "Indicates that a physical object undergoes a physical process." .

fn5_physical:exertsForceOn rdf:type owl:ObjectProperty ;
    rdfs:subPropertyOf fn5_domain:exertsForceOn ;
    rdfs:domain fn5_physical:PhysicalObject ;
    rdfs:range fn5_physical:PhysicalObject ;
    rdfs:comment "Indicates that one physical object exerts a force on another." .

fn5_physical:hasPhysicalState rdf:type owl:ObjectProperty ;
    rdfs:subPropertyOf fn5_core:hasQuality ;
    rdfs:domain fn5_physical:PhysicalObject ;
    rdfs:range fn5_physical:PhysicalState ;
    rdfs:comment "Connects a physical object to its physical state." .

```

---

### **6. Psychological Domain Ontology (`PsychologicalDomain.owl`)**

Code snippet

```
@prefix owl: <http://www.w3.org/2002/07/owl#> .
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .
@prefix fn5_core: <http://www.fn5.org/ontology/core#> .
@prefix fn5_domain: <http://www.fn5.org/ontology/domain#> .
@prefix fn5_psychological: <http://www.fn5.org/ontology/psychological#> .
@prefix dul: <http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#> .

<http://www.fn5.org/ontology/psychological> rdf:type owl:Ontology ;
    owl:imports fn5_domain:domain . # Import the domain ontology

### Psychological Domain - High-Level Classes ###

fn5_psychological:PsychologicalAgent rdf:type owl:Class ;
    rdfs:subClassOf fn5_core:Agent ; # Specific type of agent in psychological context
    rdfs:comment "An individual capable of psychological processes and states." .

fn5_psychological:PsychologicalProcess rdf:type owl:Class ;
    rdfs:subClassOf fn5_domain:PsychologicalProcess ;
    rdfs:comment "Any internal mental or emotional activity, such as emotional experience or motivation." .

fn5_psychological:PsychologicalState rdf:type owl:Class ;
    rdfs:subClassOf fn5_core:State ;
    rdfs:comment "An internal affective or cognitive condition of an individual's psyche." .

fn5_psychological:PsychologicalQuality rdf:type owl:Class ;
    rdfs:subClassOf fn5_core:Quality ;
    rdfs:comment "An attribute or characteristic related to psychological entities or processes, e.g., emotional intensity." .

fn5_psychological:EmotionalStimulus rdf:type owl:Class ;
    rdfs:subClassOf fn5_core:Entity ;
    rdfs:comment "An event, object, or situation that triggers emotions." .

### Psychological Domain - High-Level Properties ###

fn5_psychological:experiencesState rdf:type owl:ObjectProperty ;
    rdfs:subPropertyOf fn5_core:hasQuality ; # A specific type of hasQuality for psychological states
    rdfs:domain fn5_psychological:PsychologicalAgent ;
    rdfs:range fn5_psychological:PsychologicalState ;
    rdfs:comment "Connects a psychological agent to a psychological state they experience." .

fn5_psychological:engagesInProcess rdf:type owl:ObjectProperty ;
    rdfs:subPropertyOf fn5_core:performs ;
    rdfs:domain fn5_psychological:PsychologicalAgent ;
    rdfs:range fn5_psychological:PsychologicalProcess ;
    rdfs:comment "Connects a psychological agent to a psychological process they engage in." .

fn5_psychological:triggersEmotion rdf:type owl:ObjectProperty ;
    rdfs:subPropertyOf fn5_domain:triggersEmotion ;
    rdfs:domain fn5_psychological:EmotionalStimulus ;
    rdfs:range fn5_psychological:PsychologicalState ;
    rdfs:comment "Indicates that an emotional stimulus initiates an emotional or psychological state." .

fn5_psychological:hasPsychologicalQuality rdf:type owl:ObjectProperty ;
    rdfs:subPropertyOf fn5_core:hasQuality ;
    rdfs:domain fn5_psychological:PsychologicalAgent ;
    rdfs:range fn5_psychological:PsychologicalQuality ;
    rdfs:comment "Connects a psychological agent to their psychological quality." .

```

---

### **7. Representational Domain Ontology (`RepresentationalDomain.owl`)**

Code snippet

```
@prefix owl: <http://www.w3.org/2002/07/owl#> .
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .
@prefix fn5_core: <http://www.fn5.org/ontology/core#> .
@prefix fn5_domain: <http://www.fn5.org/ontology/domain#> .
@prefix fn5_representational: <http://www.fn5.org/ontology/representational#> .
@prefix dul: <http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#> .

<http://www.fn5.org/ontology/representational> rdf:type owl:Ontology ;
    owl:imports fn5_domain:domain . # Import the domain ontology

### Representational Domain - High-Level Classes ###

fn5_representational:Information rdf:type owl:Class ;
    rdfs:subClassOf fn5_domain:Information ;
    rdfs:comment "Represents data, knowledge, symbols, or structured representations." .

fn5_representational:RepresentationalProcess rdf:type owl:Class ;
    rdfs:subClassOf fn5_domain:RepresentationalProcess ;
    rdfs:comment "Any activity involving the creation, transmission, processing, or interpretation of information." .

fn5_representational:RepresentationalAgent rdf:type owl:Class ;
    rdfs:subClassOf fn5_core:Agent ;
    rdfs:comment "An agent involved in representational processes (e.g., an information organizer, communicator)." .

fn5_representational:InformationStructure rdf:type owl:Class ;
    rdfs:subClassOf fn5_core:AbstractEntity ;
    rdfs:comment "A structured framework for organizing and accessing information." .

### Representational Domain - High-Level Properties ###

fn5_representational:processesInformation rdf:type owl:ObjectProperty ;
    rdfs:subPropertyOf fn5_core:performs ;
    rdfs:domain fn5_representational:RepresentationalAgent ;
    rdfs:range fn5_representational:RepresentationalProcess ;
    rdfs:comment "Connects a representational agent to a representational process they perform." .

fn5_representational:conveysInformation rdf:type owl:ObjectProperty ;
    rdfs:subPropertyOf fn5_domain:conveysInformation ;
    rdfs:domain fn5_representational:RepresentationalProcess ;
    rdfs:range fn5_representational:Information ;
    rdfs:comment "Indicates that a representational process transmits information." .

fn5_representational:organizesInformation rdf:type owl:ObjectProperty ;
    rdfs:subPropertyOf dul:organizes ;
    rdfs:domain fn5_representational:RepresentationalAgent ;
    rdfs:range fn5_representational:InformationStructure ;
    rdfs:comment "Connects a representational agent to the information structure they organize." .

fn5_representational:describesEntity rdf:type owl:ObjectProperty ;
    rdfs:subPropertyOf fn5_core:describes ;
    rdfs:domain fn5_representational:Information ;
    rdfs:range fn5_core:Entity ;
    rdfs:comment "Indicates that a piece of information describes an entity." .

```

---

### **8. Social Domain Ontology (`SocialDomain.owl`)**

Code snippet

```
@prefix owl: <http://www.w3.org/2002/07/owl#> .
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .
@prefix fn5_core: <http://www.fn5.org/ontology/core#> .
@prefix fn5_domain: <http://www.fn5.org/ontology/domain#> .
@prefix fn5_social: <http://www.fn5.org/ontology/social#> .
@prefix dul: <http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#> .

<http://www.fn5.org/ontology/social> rdf:type owl:Ontology ;
    owl:imports fn5_domain:domain . # Import the domain ontology

### Social Domain - High-Level Classes ###

fn5_social:SocialAgent rdf:type owl:Class ;
    rdfs:subClassOf fn5_domain:SocialAgent ;
    rdfs:comment "Represents an individual or group acting within a social context, possessing social roles or identities." .

fn5_social:SocialInteraction rdf:type owl:Class ;
    rdfs:subClassOf fn5_domain:SocialInteraction ;
    rdfs:comment "Represents reciprocal actions and communications between social entities." .

fn5_social:SocialStructure rdf:type owl:Class ;
    rdfs:subClassOf fn5_domain:SocialStructure ;
    rdfs:comment "Represents organizational patterns, relationships, or institutions within a society." .

fn5_social:SocialRole rdf:type owl:Class ;
    rdfs:subClassOf fn5_core:Entity ; # A type of abstract entity
    rdfs:comment "A defined position with associated behaviors and expectations within a social context." .

fn5_social:SocialContext rdf:type owl:Class ;
    rdfs:subClassOf fn5_core:Context ;
    rdfs:comment "A situation or environment where social interactions occur." .

### Social Domain - High-Level Properties ###

fn5_social:participatesIn rdf:type owl:ObjectProperty ;
    rdfs:subPropertyOf fn5_domain:participatesIn ;
    rdfs:domain fn5_social:SocialAgent ;
    rdfs:range fn5_social:SocialInteraction ;
    rdfs:comment "Indicates that a social agent is involved in a social interaction." .

fn5_social:hasRole rdf:type owl:ObjectProperty ;
    rdfs:subPropertyOf dul:hasRole ;
    rdfs:domain fn5_social:SocialAgent ;
    rdfs:range fn5_social:SocialRole ;
    rdfs:comment "Connects a social agent to a social role they possess." .

fn5_social:occursInSocialContext rdf:type owl:ObjectProperty ;
    rdfs:subPropertyOf fn5_core:occursIn ;
    rdfs:domain fn5_social:SocialInteraction ;
    rdfs:range fn5_social:SocialContext ;
    rdfs:comment "Indicates that a social interaction occurs within a specific social context." .

fn5_social:maintainsStructure rdf:type owl:ObjectProperty ;
    rdfs:subPropertyOf dul:maintains ;
    rdfs:domain fn5_social:SocialAgent ;
    rdfs:range fn5_social:SocialStructure ;
    rdfs:comment "Indicates that a social agent helps maintain a social structure." .

```

---

### **9. Space-Time Domain Ontology (`SpaceTimeDomain.owl`)**

Code snippet

```
@prefix owl: <http://www.w3.org/2002/07/owl#> .
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .
@prefix fn5_core: <http://www.fn5.org/ontology/core#> .
@prefix fn5_domain: <http://www.fn5.org/ontology/domain#> .
@prefix fn5_spacetime: <http://www.fn5.org/ontology/spacetime#> .
@prefix dul: <http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#> .

<http://www.fn5.org/ontology/spacetime> rdf:type owl:Ontology ;
    owl:imports fn5_domain:domain . # Import the domain ontology

### Space-Time Domain - High-Level Classes ###

fn5_spacetime:SpatiotemporalEntity rdf:type owl:Class ;
    rdfs:subClassOf fn5_domain:SpatiotemporalEntity ;
    rdfs:comment "Represents any entity that exists or occurs in space and time, possessing spatial extent and temporal duration." .

fn5_spacetime:SpatiotemporalProcess rdf:type owl:Class ;
    rdfs:subClassOf fn5_domain:SpatiotemporalProcess ;
    rdfs:comment "Any dynamic activity, transformation, or sequence of events that explicitly involves change in spatial or temporal properties." .

fn5_spacetime:SpatialLocation rdf:type owl:Class ;
    rdfs:subClassOf fn5_core:Location ;
    rdfs:comment "A specific position or area in space." .

fn5_spacetime:TemporalExtent rdf:type owl:Class ;
    rdfs:subClassOf fn5_core:TemporalExtent ;
    rdfs:comment "A specific duration or point in time." .

fn5_spacetime:SpatiotemporalRelation rdf:type owl:Class ;
    rdfs:subClassOf fn5_core:Relation ;
    rdfs:comment "A relationship between entities in terms of their spatial or temporal arrangement." .

### Space-Time Domain - High-Level Properties ###

fn5_spacetime:hasSpatialLocation rdf:type owl:ObjectProperty ;
    rdfs:subPropertyOf fn5_core:hasLocation ;
    rdfs:domain fn5_spacetime:SpatiotemporalEntity ;
    rdfs:range fn5_spacetime:SpatialLocation ;
    rdfs:comment "Connects a spatiotemporal entity to its spatial location." .

fn5_spacetime:hasTemporalExtent rdf:type owl:ObjectProperty ;
    rdfs:subPropertyOf fn5_core:hasTime ;
    rdfs:domain fn5_spacetime:SpatiotemporalEntity ;
    rdfs:range fn5_spacetime:TemporalExtent ;
    rdfs:comment "Connects a spatiotemporal entity or process to its temporal extent." .

fn5_spacetime:occursAtLocation rdf:type owl:ObjectProperty ;
    rdfs:subPropertyOf fn5_domain:occursAtLocation ;
    rdfs:domain fn5_spacetime:SpatiotemporalProcess ;
    rdfs:range fn5_spacetime:SpatialLocation ;
    rdfs:comment "Indicates the spatial location where a spatiotemporal process occurs." .

fn5_spacetime:involvesRelation rdf:type owl:ObjectProperty ;
    rdfs:subPropertyOf dul:hasPart ; # A general relation to include a spatial/temporal relation
    rdfs:domain fn5_spacetime:SpatiotemporalProcess ;
    rdfs:range fn5_spacetime:SpatiotemporalRelation ;
    rdfs:comment "Indicates that a spatiotemporal process involves a specific spatial or temporal relation." .
```