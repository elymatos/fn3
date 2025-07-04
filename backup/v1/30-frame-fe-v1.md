In the FN5 lexical framework, **Frame Elements (FEs)** are the fundamental components that define the **internal structure** of a semantic frame. Each FE corresponds to a **conceptually salient aspect** of the situation evoked by the frame — typically, a participant, role, condition, or attribute.

By explicitly identifying the roles that constitute a frame, FEs provide the **interface between conceptual structure and linguistic realization**, and serve as the anchoring point for **ontological alignment** with the DUL-based scenario layer of FN5.

## 🔹 1. Conceptual Role of Frame Elements

A frame element is not just a syntactic argument or a filler of a grammatical position. Instead, it is a **semantic role defined in relation to the frame as a whole**. For example, in the frame `Commercial_Transaction`, the FE `Buyer` only makes sense in relation to the entire situation involving goods, money, a seller, and a transaction.

Thus, **FEs are frame-relative** and must be interpreted as part of a coherent event or state. They reflect how human cognition organizes prototypical situations: in terms of who is involved, what happens, what changes, and what conditions apply.

## 🔹 2. Coreness: Essential vs. Peripheral Roles

In FN5, each frame element is classified along a single **axis of coreness**, which indicates its **necessity for frame identification**:

| **Coreness Type** | **Definition** |
|-------------------|----------------|
| **Core**          | Defines the **minimal conceptual structure** of the frame. The absence of one or more core FEs would result in a different frame. |
| **Peripheral**    | Provides **contextual, circumstantial, or modifying information**. These FEs are optional from the point of view of frame identity, but crucial for realistic and expressive language use. |

> 🛑 FN5 does **not** adopt the category of *extra-thematic* FEs used in Berkeley FrameNet. All frame-relevant elements are classified strictly as **core** or **peripheral**.

## 🔹 3. Role Types: Functional Classification of Frame Elements

Beyond coreness, each FE in FN5 is assigned a **Role Type** — a conceptual label indicating the **kind of semantic function** the element plays within the frame. These Role Types help generalize and align FEs across different frames, support automated generation, and provide a bridge to ontological modeling.

### 🧠 The Role Type answers the question:  
_“What kind of thing is this FE doing in the structure of the frame?”_

Here is the official FN5 classification of **FE Role Types**:

| **Role Type**        | **Definition**                                                                                     | **Typical FE Labels**                         |
|----------------------|-----------------------------------------------------------------------------------------------------|-------------------------------------------------|
| **Participant**       | Entity that **actively or passively participates** in the event or state described by the frame. | `Agent`, `Patient`, `Experiencer`, `Recipient`, `Cognizer` |
| **Instrument**        | Object, medium, or method **used to carry out the event**, without being a primary participant. | `Instrument`, `Means`, `Tool`                 |
| **Result**            | The **outcome or product** of the event, or a state that results from it.                         | `Result`, `Outcome`, `Product`, `Effect`      |
| **Path/Location**     | The **spatial configuration** of the frame: source, goal, movement path, or static place.        | `Source`, `Goal`, `Place`, `Path`, `Direction` |
| **Time/Duration**     | The **temporal anchoring** of the frame’s instantiation.                                          | `Time`, `Duration`, `Start_time`, `Frequency` |
| **Manner**            | The **style, strategy, or process** by which the event occurs.                                    | `Manner`, `Means`, `Mode`, `Style`            |
| **Cause/Trigger**     | The **initiating condition** or explanation for the event.                                        | `Cause`, `Stimulus`, `Trigger`, `Explanation` |
| **Purpose/Goal**      | The **intentional endpoint** of the event or process.                                             | `Purpose`, `Goal`, `Intended_effect`          |
| **Condition/Constraint** | External **circumstances or prerequisites** for the frame to be valid.                         | `Condition`, `Prerequisite`, `Requirement`    |
| **Measure/Degree**    | A **scalar, quantitative, or comparative** element within the frame.                             | `Extent`, `Degree`, `Quantity`, `Intensity`   |
| **Identity/Role**     | A **named or institutional identity** that classifies an entity beyond its functional role.       | `Position`, `Title`, `Social_role`, `Status`  |
| **Mental Content**    | The **propositional or representational content** of mental or communicative frames.             | `Message`, `Thought`, `Idea`, `Content`, `Belief` |

## 🔗 4. Mapping Role Types to Ontological Categories

Each Role Type is also associated with a **typical mapping** to foundational DUL concepts. This facilitates the **link between Frame Elements and Ontological Elements** in FN5’s dual structure.

For example:

| **Role Type**     | **Typical DUL Mapping**          |
|-------------------|----------------------------------|
| `Participant`      | `dul:Agent`, `dul:SocialAgent`, `dul:Patient` |
| `Instrument`       | `dul:Instrument`, `dul:Object`   |
| `Result`           | `dul:Event`, `dul:State`, `dul:InformationObject` |
| `Path/Location`    | `dul:Place`, `dul:Region`        |
| `Time/Duration`    | `dul:TimeInterval`, `dul:TimeLocation` |
| `Identity/Role`    | `dul:Role`, `dul:SocialRole`     |
| `Mental Content`   | `dul:Description`, `dul:InformationObject` |

These mappings are **default recommendations** — they can be further **specialized per frame**, allowing precision without sacrificing generalizability.

## 📌 5. Guidelines for Creating FEs in FN5

When designing a new frame:
- **Identify core roles first**: Who are the participants essential to instantiate the scenario?
- **Assign a Role Type** to each FE: This helps structure the semantics and guides DUL mapping.
- **Add peripheral roles** only as needed to enrich expressiveness or reflect common valence patterns.
- Prefer **short, descriptive FE names**, using consistent terminology across frames when possible.
- **Avoid redundancy**: If two FEs can be captured by a shared Role Type and function, consider unifying them.

## ✅ Summary

Frame Elements in FN5 serve as the **semantic skeleton** of each frame. By clearly distinguishing their **core status** and **role type**, and by linking them to foundational ontologies, FN5 enables:
- Frame construction to be **principled and modular**
- Semantic networks to be **interoperable and coherent**
- LLM-driven tools to assist in **systematic frame generation**

This structured treatment of FEs ensures that FN5 can scale with clarity, formal rigor, and cognitive plausibility.