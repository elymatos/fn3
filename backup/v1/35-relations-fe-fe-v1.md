# 🧩 Frame Element-to-Frame Element (FE-to-FE) Relations in FN5

In FN5, all semantic **frame-to-frame relations** are grounded in **explicit mappings between Frame Elements (FEs)**. This ensures that relations between frames are not arbitrary but structurally and semantically validated by the alignment of their internal components.

---

## 🔗 1. FE-to-FE Mappings: The Backbone of Frame Relations

When two frames are related (e.g., via `Inheritance`, `Subframe`, `Perspective_on`), this relation is substantiated by a structured set of **FE-to-FE alignments**.

Each mapping connects an FE in one frame to a **semantically equivalent, specialized, or structurally related** FE in the other frame. These mappings:
- Preserve **semantic roles**
- Respect **role types** and **coreness**
- Enable **automated validation and inference**

### Example
If `Revenge` inherits from `Punishment`, then:
- `Avenger` in `Revenge` ←→ `Punisher` in `Punishment`
- `Offender` in `Revenge` ←→ `Offender` in `Punishment`

---

## 🧩 2. All FN5 Relations Operate at the FE Level

The new set of **structural and interpretative relations** proposed in FN5 can be applied **directly to FEs**, not just to whole frames.

| **Relation**                 | **Description (at FE level)** |
|-----------------------------|-------------------------------|
| `rel_structural_causation`  | One FE conceptually causes another FE in the target frame |
| `rel_structural_path`       | An FE describes a stage within a larger path/process |
| `rel_structural_containment`| One FE's situation includes or temporally contains the other's |
| `rel_structural_link`       | One FE conceptually or semantically supports the other |
| `rel_structural_sequence`   | One FE precedes another in a temporal or conceptual sequence |
| `rel_structural_dependency` | One FE depends on the existence of the other |
| `rel_interpretative_cooccurrence` | One FE co-occurs or activates another due to context or metaphor |
| `rel_mutual_exclusion`      | FEs are mutually incompatible in the same context |
| `rel_alternative`           | FEs represent disjunctive or competing roles |
| `rel_requires_precondition` | One FE presupposes another FE to be contextually valid |

---

## 🧠 3. Relation Propagation from FE to Frame Level

FN5 adopts the principle that:
> **Frame-level relations are induced from consistent sets of FE-to-FE relations.**

### Rule
A frame `B` is in relation `R` to frame `A` **iff**:
- There exists a **set of FE pairs** `{ (fe₁ᵃ, fe₁ᵇ), (fe₂ᵃ, fe₂ᵇ), … }` such that each pair satisfies the relation `R`.

This allows:
- Fine-grained validation of frame design
- Controlled inheritance and structural dependencies
- Automated consistency checks in the lexical network

---

## ✅ 4. Implementation Notes for FN5

- FE-to-FE relations are always directional and typed.
- Mappings must respect **role type compatibility**.
- Coreness (Core vs Peripheral) must be preserved or extended, but never weakened (a core FE cannot map to a peripheral one).
- Mappings can be **1:1, 1:n, or n:1**, but must be **semantically justified**.

---

By grounding frame relations in FE-level mappings, FN5 ensures a modular, scalable, and cognitively sound architecture for representing lexical meaning.