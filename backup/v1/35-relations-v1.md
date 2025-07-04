### 1. **Relations in Berkeley FrameNet (BFN)**

BFN organizes frames in a **network of meaning** via **typed relations between frames**, supported by **semantic mappings between their Frame Elements (FEs)**. These relations enable inferences, generalizations, and semantic navigation across frames.

#### 🔹 BFN defines three main categories of frame-to-frame relations:

#### A. **Generalization Relations**

- **Inheritance**: Classic “is-a” relationship. A child frame inherits all FEs (with possible renaming or extension) from its parent. Used for **taxonomic generalization**.
    
- **Perspective_on**: Represents alternate construals or profiling of the same situation (e.g., `Commerce_buy` vs. `Commerce_sell`).
    
- **Using**: Indicates **background dependency**. The daughter frame presupposes the mother frame for its semantic interpretation.
    

#### B. **Event Structure Relations**

- **Subframe**: Indicates **event decomposition**. The child is a temporal or conceptual **subevent** of the parent.
    
- **Precedes**: Temporal ordering of frames. Parent precedes the daughter frame.
    

#### C. **Systematic Relations**

- **Causative_of**: Maps a **causing event** to its **resulting state/event** (e.g., `Causation` → `Change_of_state`).
    
- **Inchoative_of**: Captures **result states** that follow a change, usually emphasizing entry into a state.
    

#### ➕ Meta-relation:

- **See_also**: Editorial cross-reference, not semantically typed.
    

These relations are maintained in a **typed graph**, and **semantic consistency is enforced via FE-to-FE mappings** across related frames.

---

### 2. **Extensions from FrameNet Brasil (FN-Br)**

FN-Br builds upon BFN by introducing **new relations and dimensions** to better capture **contextual, ontological, and multimodal information**.

#### 🆕 A. **FE-to-Frame Relation**

- Allows a **core FE** within a frame to be explicitly linked to another **frame** that better models its **conceptual interpretation**.
    
- Example: The `TOURIST` FE in the `Touring` frame is linked to the `People_by_leisure_activity` frame.
    
- This adds a **layer of conceptual enrichment** to the FE, beyond flat semantic types.
    
- **Only core FEs** and **non-entity frames** are eligible to avoid circularity and semantic drift.
    

#### 🆕 B. **Metonymy Relation**

- Captures **metonymic shifts** between frames, often needed when a word evokes one frame but the context suggests another (e.g., “Brazil won the match” evokes a `Country` frame but metonymically maps to `Sports_team`).
    
- This relation addresses **context-driven meaning extensions**.
    

#### 🆕 C. **Ternary Qualia Relations (TQR)**

- Inspired by **Generative Lexicon Theory** (Pustejovsky), FN-Br formalizes qualia roles as structured relations within or across frames:
    
    - **Formal** (what it is),
        
    - **Constitutive** (what it’s made of),
        
    - **Telic** (what it’s for),
        
    - **Agentive** (how it comes to be).
        
- These are applied especially to **noun frames** and are used to capture **commonsense knowledge** and **cognitive affordances**.
    

---

### 3. **Key Insights for FN5 Lexical Dimension**

- BFN’s seven relations are **foundational** and should be retained in FN5 for compatibility and coverage of **event structure and taxonomic inheritance**.
    
- FN-Br’s additions—**FE-to-Frame, Metonymy, TQR**—respond to **known limitations in BFN**, especially regarding:
    
    - Internal complexity of FEs
        
    - Pragmatic context
        
    - Semantic shifts and conceptual affordances
        
- FN5 can unify these under a **layered semantic relation model**:
    
    - **Frame-level** (frame-to-frame)
        
    - **FE-level** (FE-to-FE and FE-to-frame)
        
    - **Conceptual/qualia-level** (internal structure of FEs)
        

