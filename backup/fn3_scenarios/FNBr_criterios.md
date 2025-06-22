# Estrutura
- A rede como um todo é estruturada em "domínios".
- "Domínios" podem possuir "subdomínios".
- "Domínios" são compostos por "cenários".
- Um "frame" expressa uma "situação".
- Um conjunto de situações é uma "cena".
- Um "cenário" é composto por um conjunto de "situações" expressas por "frames". 
- Um frame está associado a um "tipo" (Event, Process, State, Relation, Attribute, Entity)
- Desta forma um "cenário" é constituído por eventos, processos, estados, relações e entidades.

## Domínios
- **FN-Br Domains** like “tourism” or “violence” are **epistemic or thematic domains**: they group frames according to **discursive contexts** or **real-world application areas**, often for pragmatic, pedagogical, or project-specific reasons.
- **FrameNet Brasil Domains (e.g., Tourism, Sports, Gastronomy, Health):** These are best understood as **complex, application-specific Scenarios** or **macro-situations** rather than fundamental ontological domains. They are human-constructed contexts that integrate elements from multiple underlying ontological dimensions. For instance, "Health" involves biological processes, physical states, psychological experiences, social interactions, and cultural beliefs. "Tourism" involves physical travel, economic transactions, cultural experiences, and cognitive planning.

## Situações (frames)
Situações - expressas por frames - são estruturas compostas por outras estruturas, suas propriedades e as relações nas quais estão envolvidas. As situações nos ajudam a conceituar certas “partes da realidade que podem ser compreendidas como um todo”. 
As situações são muitas vezes reificadas, ou consideradas como um “objeto”, o que permite não apenas identificar situações, mas também considerar suas propriedades. Por exemplo, podemos considerar a localização no espaço e no tempo de uma situação específica.
Como visto, uma característica importante das situações é que elas podem ser concebidas como tendo uma estrutura mereológica complexa, com situações constituindo outras situações. Essa forma hierárquica pode ser explorada na reutilização das especificações de uma situação.
Finalmente, assim como ocorre com entidades, é possível considerar aspectos invariantes de classes de situações usando alguma noção de categoria ou tipo. Um "tipo de situação" (ou um tipo de frame) nos permite considerar características gerais de situações de um tipo específico, captando os critérios de unidade e identidade de situações desse tipo.
A descrição de uma situação (e a representação de uma ocorrência específica) pode envolver diferentes tipos de elementos (evento, estados, entidades, etc) 
relacionados entre si, mas a ideia é que uma situação seja caracterizada por um tipo específico.
A proposta é que a situações sigam a noção de *rigid embodiment*. De maneira simplificada, isso significa que uma situação não admite variações na sua constituição: os conceitos que a compõe não podem mudar (embora as características destes conceitos possam sofrer variações). As situações são *timeless*, elas são independentes do tempo.

## Cenas
Uma cena envolve um conjunto ou uma sucessão (temporal) de situações. De certa forma, uma cena pode ser vista como um contêiner para situações. Os limites desse contêiner são tipicamente definidos por uma região espaço-temporal, ou seja, uma cena acontece em um intervalo contínuo de tempo e em uma região convexa do espaço. Além disso, uma cena é um *ato de percepção unitária*, ou seja, a principal característica de uma cena é que “ela é um todo, do ponto de vista perceptivo”, sem se comprometer com “condições específicas de unidade para especificar esse todo”.
A proposta é que as cenas sigam a noção de *variable embodiment*, ou seja, alguns elementos da cena podem mudar com a passagem do tempo, sem que a cena perca a sua unidade.
Finalmente, eventos complexos podem ser vistos como decompostos em uma série de cenas mais elementares, cada uma das quais pode ser compreendida como um todo.
No contexto de uma FNBr multimodal, as cenas são representadas por sentenças, imagens e videos: 
* As sentenças representam cenas com uma ou mais situações. As situações (frames) são construídas a partir dos conceitos expressos pelas unidades lexicais.
* Uma imagem será considerada uma cena, representando uma ou mais situações simultaneamente.
* Um video pode ser considerado como uma sucessão de cenas, sendo que várias situações são representadas pela ocorrência de uma sucessão de frames de vídeo. Cada frame do video é uma imagem (que, como visto, pode representar uma ou mais situações simultaneamente). Nos videos, uma situação pode se estender no tempo.

## Cenários
Um cenário é um tipo de frame especial, usado para agrupar situações (frames) que estejam relacionados entre si, formando um subcontexto dentro de um dado domínio.
Cada frame está associado a um tipo (Event, Process, State, Relation, Attribute, Entity). Desta forma um "cenário" é constituído por eventos, processos, estados, relações e entidades.
A definição dos Elelentos de Frame dos cenários pode envolver:
- Descrição estruturada do cenário: Explica os papéis dos participantes (#Agente, #Tema, #Meta, etc.).
- Sequência ou dinâmica dos eventos que ocorrem no cenário: Indica frequentemente estados iniciais, processos intermediários e resultados.
- Motivações e condições:Inclui causas, motivações, intenções ou obstáculos.
- Contextualização:Muitas vezes especifica se ocorre em certo local, tempo, maneira.

## Tipos de frames
### Entity
Frames that represent objects, actors, artifacts, concepts, or any discrete unit that can be conceptualized as an entity. Entities may be concrete (person, city) or abstract (law, algorithm, contract). 

### Event
Frames that capture dynamic situations: actions, operations, procedures, natural phenomena, or social events. They involve change over time, interaction between entities, or sequences of operations.

### Process
Frames that describe a complex event which lasts some amount of time, consisting of a beginning stage, a stage where the process is ongoing, and a finish or end. In some cases the process may pause, and then possibly resume. Delineated as a subclass or a specific kind of event with temporal structure and possible interruption. 

### State
Frames that describe static situations, conditions, configurations, or properties that hold over time without inherent change. Examples include being hungry, ownership, or spatial positioning.
A State is a Situation that persists over some duration without internal transition or inherent unfolding from one phase to another. It describes a static condition, configuration, or status of an entity or set of entities. Unlike an Event or Process, a state does not inherently describe a change or an activity. However, a state can change, and the change from one state to another would be an Event or Process. Some criteria:
- Persistence over Duration: A State is characterized by its duration, during which its defining conditions remain constant. It is not instantaneous like some Events.
- Lack of Intrinsic Dynamics/Internal Transition: A state does not involve an inherent progression or internal activity. It is a stable condition, even if it is temporary. The beginning or end of a state, or the transition between states, would be an Event or Process.
- Cognitive Stability: Cognitively, states are understood as relatively stable configurations of entities and their relationships.
- Result of a Process/Event (often): Many states are the result or outcome of an Event or Process (e.g., Agreement resulting from Negotiation; ProblemResolution resulting from SolutionSteps).

### Attribute
Frames representing attributes or characteristics of entities or states. These include measurable properties (size, weight), perceptual qualities (color, texture), and abstract attributes (importance, legality, validity).  
An attribute inheres in an Entity or Situation (Event/Process/State) at a specific point in time or over a duration, but does not inherently imply change or duration itself. Attributes describe what something is like or what characteristics it possesses. Attributes can be predicated of something. Some criteria:
- Inherence: An attribute must inhere in something else (an Entity, Event, Process, or State). It cannot exist independently. For instance, 'red' inheres in a 'ball'; 'intensity' inheres in an 'emotion'.
- Lack of Intrinsic Temporal Dynamics: While the value of an atributee can change over time (e.g., something can become 'redder'), the attribute itself (e.g., 'redness') does not unfold or progress through time in the way an event or process does. It is a snapshot-like descriptor.
- Measurability/Gradability (often, but not exclusively): Many attributes are gradable (e.g., 'very hard', 'slightly soft') or measurable (e.g., 'weight', 'temperature'). This is a strong indicator, but not a strict requirement (e.g., 'broken' as a quality might not be easily gradable in all contexts).
- Descriptive Function: Its primary role is to describe an inherent characteristic, property, or attribute of something.

### Relation
Frames that explicitly represent the connection between entities, events, or states. Relations may be spatial (next to, inside), temporal (before, during), causal (cause-effect), hierarchical (part-of, type-of), or logical (equivalence, implication).  

## CORE PRINCIPLES FOR FORMALIZING FRAME CREATION IN FNBr

### 1. **Frame-Centric Representation**

> **Principle**: A semantic frame is the _primary unit of meaning_, from which roles (frame elements) are derived, not vice versa.

**Justification**: This principle distinguishes frame semantics from case grammar. Rather than starting with fixed semantic roles, FN5 treats frames as _situated conceptual wholes_, with roles defined _relative to that frame_. This supports cognitive realism and avoids overly rigid role inventories.

---

### 2. **Event and Situation Grounding**

> **Principle**: Every frame must be grounded in a **prototypical situation**, event, or cognitive script, either perceptual, social, or culturally embedded.

**Justification**: As Fillmore emphasized, frames are schematic representations of experiences. Grounding in prototypical situations allows frames to reflect human conceptual structures and supports inferential completeness (expectations, roles, consequences).

---

### 3. **Role Distinctiveness and Minimality**

> **Principle**: Frame Elements (FEs) must reflect **functionally and conceptually distinct participants or aspects**. Frames should define a **minimal necessary set of core FEs** for coherence.

**Justification**: Frames overloaded with redundant roles blur their internal structure. Distinctiveness ensures clarity, and minimality aids generalization and inheritance. Peripheral or optional roles can be added with looser constraints.

---

### 4. **Valence Evidence and Corpus Plausibility**

> **Principle**: Frame and FE definitions should be **anchored in actual linguistic behavior**, ideally supported by valence patterns and corpus examples.

**Justification**: Usage-based grounding keeps frame creation empirical rather than speculative. This is core to the FrameNet model and ensures frames reflect how meaning is structured in language.

---

### 5. **Compositional Inheritance**

> **Principle**: New frames should **inherit structure from existing frames** wherever possible, unless there is strong evidence for disjunction.

**Justification**: This reduces redundancy and supports a lattice or network structure in the Lexical Dimension. Inheritance ensures shared structure is not redefined arbitrarily and helps maintain internal coherence across the frame network.

---

### 6. **Perspective Sensitivity**

> **Principle**: A frame can represent a **perspective** on a situation, even if it shares event structure with others.

**Justification**: Verbs like _give_ vs _receive_ show that the same event can be framed from different participant focal points. FN5 should distinguish such frames to reflect perspectivization as a cognitive-linguistic phenomenon.

---

### 7. **Frame-Type Categorization**

> **Principle**: Each frame should be typed to facilitate typological control and formal inference.

**Justification**: Typing supports modular design, inheritance grouping, and automated reasoning. It aligns with ontological commitments (e.g. distinguishing processes from states) and with computational goals (e.g. clustering, inference).

---

### 8. **Cognitive Embeddability**

> **Principle**: A valid frame should be **mentally imageable**, relatable to experience, and potentially learnable by humans without explicit definition.

**Justification**: This ensures cognitive adequacy. If a frame cannot be imagined or mentally simulated as a whole situation, it likely violates the cognitive motivations of frame semantics.

---

### 9. **LLM-Computability**

> **Principle**: Frame creation should follow a **structured enough process** that it can be guided or replicated (semi-)automatically by language models.

**Justification**: A long-term goal of FNBr is automation. Aligning the method with LLM capabilities (e.g. pattern recognition, analogy, paraphrase alignment) enables assisted frame induction and scaling.
