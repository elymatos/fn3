
# 🔗 FN5 Relation Typology

This document defines the official set of **semantic relations** between frames in the **Lexical Dimension** of FN5. These relations guide the structure of the frame network, allowing frames to inherit, depend on, sequence, or contrast with each other in semantically principled ways.

FN5 organizes frame-to-frame relations into three conceptual tiers:

---

## 🏛 Tier 1 – Core FrameNet Relations (Inherited from BFN)

These are preserved from Berkeley FrameNet and serve as the **core scaffolding** of the network.

### 1. `Inheritance`

> **Definition**: Indicates that one frame is a subtype of another, inheriting all or most Frame Elements (FEs).
> 
> **Example**: `Revenge` inherits from `Punishment`.

### 2. `Perspective_on`

> **Definition**: Marks two frames that describe the same situation from different participant perspectives.
> 
> **Example**: `Commerce_buy` is a perspective on `Commerce_goods-transfer`.

### 3. `Subframe`

> **Definition**: A complex frame may be composed of simpler sub-events modeled as subframes.
> 
> **Example**: `Trial` has `Verdict` and `Testimony` as subframes.

### 4. `Causative_of`

> **Definition**: Links a causative frame to a non-causative base frame that describes the resulting event.
> 
> **Example**: `Destroying` is causative of `Becoming_nonfunctional`.

### 5. `Inchoative_of`

> **Definition**: Links a frame about entering a state to one that describes that state.
> 
> **Example**: `Waking_up` is inchoative of `Being_awake`.

### 6. `Precedes`

> **Definition**: A frame temporally precedes another.
> 
> **Example**: `Court_indictment` precedes `Court_trial`.

---

## 🧩 Tier 2 – Structural Semantic Extensions

These relations **replace or refine** the overly broad `Using` relation in BFN. Each represents a **specific kind of structural dependence** between frames.

### 7. `rel_structural_causation`

> **Definition**: One frame provides the structural or conceptual cause for another.
> 
> **Example**: `Injury` structurally causes `Pain`.

### 8. `rel_structural_path`

> **Definition**: One frame defines a **stage or movement** within the progression modeled by another.
> 
> **Example**: `Migration` contains `Crossing_border` as a structural path.

### 9. `rel_structural_containment`

> **Definition**: One frame occurs **within the conceptual or temporal boundaries** of another.
> 
> **Example**: `Meal` contains `Eating`, `Drinking`, `Conversing`.

### 10. `rel_structural_link`

> **Definition**: A general relation of **semantic dependence or support**, less strict than inheritance or causation.
> 
> **Example**: `Prediction` is structurally linked to `Belief`.

### 11. `rel_structural_sequence`

> **Definition**: A frame is part of a **conceptual or narrative sequence**.
> 
> **Example**: `Court_verdict` follows `Court_arguments`.

### 12. `rel_structural_dependency`

> **Definition**: One frame’s coherence **requires or presupposes** another frame structurally.
> 
> **Example**: `Promise` depends on `Intention`.

---

## 🧠 Tier 3 – Contextual and Interpretative Relations

These relations represent **pragmatic, contrastive, or co-occurrence patterns** that reflect contextual or discourse-level structures.

### 13. `rel_interpretative_cooccurrence`

> **Definition**: One frame often activates or co-occurs with another due to conceptual or metaphorical association.
> 
> **Example**: `Journey` co-occurs with `Life_event` in metaphors.

### 14. `rel_mutual_exclusion`

> **Definition**: Two frames are **semantically incompatible** in the same context.
> 
> **Example**: `Alive` is mutually exclusive with `Dead`.

### 15. `rel_alternative`

> **Definition**: Frames that form a **set of disjunctive possibilities**.
> 
> **Example**: `Guilty_verdict` and `Innocent_verdict`.

### 16. `rel_requires_precondition`

> **Definition**: One frame can only be valid if another is true or instantiated beforehand.
> 
> **Example**: `Retirement` requires `Employment`.

---

## 🧬 Special Note: FE-to-Frame and Qualia-Based Relations

FN5 supports additional relation types not strictly between whole frames but between **Frame Elements and frames**, or between **elements within frames**:

- **FE-to-Frame Links**: A core FE may be linked to another frame that conceptually defines it (e.g., `TOURIST` in `Touring` linked to `People_by_activity`).
    
- **Ternary Qualia Relations**: Inspired by Generative Lexicon theory, FN5 includes:
    
    - **Formal**: what the FE/entity is.
        
    - **Telic**: what the FE/entity is for.
        
    - **Agentive**: how the FE/entity came to be.
        
    - **Constitutive**: what it's made of or composed with.
        

These are encoded as internal semantic structures and support alignment between lexical and ontological dimensions.

