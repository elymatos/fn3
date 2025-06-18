
# Narrower Frame Classification: Hybrid Strategy

This documentation describes a structured, hybrid strategy for achieving a narrower, more precise classification of FrameNet frames. Given that frames inherently encapsulate rich semantic complexity, a singular classification approach can lead to overly broad or ambiguous categorization. Therefore, a combination of linguistic, semantic, and relational criteria is proposed to enhance precision and consistency.

## 1. Motivation
FrameNet frames are semantically rich and resist rigid single-category assignments. Initial broad classification tends to assign multiple types per frame, reducing practical utility. To enhance usability and interpretability, a more constrained yet semantically justified classification is required.

## 2. Proposed Hybrid Strategy

This strategy combines multiple layers of semantic and linguistic evidence into a sequential process:

### Step 1: Frame Elements (FEs) Analysis
Frame Elements (particularly core elements) are primary semantic anchors for frames.
- **Event**: Frames prominently featuring core FEs like *Agent*, *Theme*, *Goal*, *Patient*, *Instrument*, and *Cause*.
- **State**: Frames defined by core FEs such as *State*, *Condition*, or *Status*.
- **Entity**: Frames characterized primarily by an *Entity*, *Object*, or similar static entities without explicit action dynamics.

### Step 2: Lexical Units (LUs) POS-based Refinement
Lexical Units offer linguistic evidence reflecting usage contexts:
- **Event/Process**: Predominantly verbs (e.g., *run.verb*, *attack.verb*).
- **Entity**: Predominantly concrete nouns (e.g., *book.noun*, *tree.noun*).
- **Attribute/State**: Predominantly adjectives or descriptive nouns (e.g., *happy.adj*, *height.noun*).
- **Relation**: Predominantly relational nouns or prepositions (e.g., *relationship.noun*, *connection.noun*).

### Step 3: Hierarchical Frame Relations (Inheritance)
FrameNet structure is hierarchical. Classification benefits from consistency within these hierarchical relations:
- If a parent frame is robustly classified as an **Event**, its child frame likely inherits the Event classification.
- Relational consistency propagates semantic coherence across frame hierarchies.

### Step 4: Type Hierarchy Resolution
Despite steps 1-3, ambiguities may persist. Resolve them via a strict priority hierarchy:
```
Event > Process > State > Relation > Attribute > Entity > Image Schema
```
This hierarchy ensures consistent and meaningful classification resolutions.

## 3. Workflow Example
A practical illustration of the hybrid classification strategy:
- **Initial Frame Analysis**: Frame "Attacking" identified as having an Agent, Theme, and Goal (core FEs), suggesting an Event.
- **Lexical Unit Check**: Dominated by verbs (attack.verb, assault.verb), reinforcing Event classification.
- **Hierarchical Check**: Parent frame "Hostile_encounter" classified as Event; hence, Attacking strongly confirmed as Event.
- **Hierarchy Resolution**: No ambiguity remains; confirmed classification as Event.

## 4. Advantages of Hybrid Approach
- Leverages multiple semantic dimensions for robust, linguistically grounded classification.
- Reduces classification ambiguity by systematically integrating linguistic, semantic, and hierarchical evidence.
- Enhances consistency across the entire frame network.

## 5. Next Steps
- Implement the strategy algorithmically to refine the frame dataset.
- Evaluate classification quality and adjust criteria based on empirical results and linguistic expert reviews.

---
