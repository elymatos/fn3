Below is a **structured schema/template** for **semantic frame creation** in the FN5 Lexical Dimension, based on the principles we just defined. This template is designed to be:

- **Human-usable** for frame designers.
    
- **Machine-readable** for LLM-based or rule-based generation.
    
- **Interoperable** with the Ontological Dimension via mappings.
    

---

## 📘 FN5 Frame Creation Template

---

### 🔹 1. **Frame Name**

- **Format**: `Domain:FrameType` (e.g. `Causation:Agentive`)
    
- **Constraints**: Unique across the network. Avoid metaphorical or ambiguous terms.
    

---

### 🔹 2. **Frame Type**

- **Options** (non-exclusive):
    
    - `Event`, `Process`, `State`, `Causation`, `Change`, `Interaction`, `Mental`, `Motion`, `Possession`, `Evaluation`, `Perspective`, `ImageSchema`, `ComplexFrame`, `Metaframe`, etc.
        
- **Justification**: Supports inheritance, search, modular reasoning.
    

---

### 🔹 3. **Frame Description**

- **Content**: Concise definition of the **prototypical situation** the frame represents.
    
- **Guidelines**:
    
    - Begin with a situation-based phrase ("A situation where...")
        
    - Avoid referring directly to words.
        
    - Anchor in common experience or conceptual script.
        
- **Example**:  
    _A situation in which one entity (the Agent) causes another entity (the Patient) to undergo a change of state._
    

---

### 🔹 4. **Core Frame Elements (FEs)**

List each **core participant or role**, with:

|FE Name|Role Type|Ontological Mapping|Description|
|---|---|---|---|
|Agent|Participant|`dul:Agent` (optional)|The entity that initiates or performs the action.|
|Patient|Participant|`dul:Patient`|The entity affected or changed by the action.|

- **Constraints**:
    
    - Each FE must be **conceptually distinct** and **required** for frame coherence.
        
    - Ontological mapping is optional at first, but recommended for integration.
        

---

### 🔹 5. **Peripheral / Optional FEs**

As above, but for circumstantial roles (e.g. Time, Place, Manner, Instrument, Cause, Degree, etc.)

---

### 🔹 6. **Valence Patterns**

Each pattern includes:

|FE|Phrase Type|Grammatical Function|
|---|---|---|
|Agent|NP|Subject|
|Patient|NP|Object|

- **Optional**: Include example sentences from corpus or constructed examples.
    

---

### 🔹 7. **Lexical Units (LUs)**

List at least 2 LUs (lemma:sense), in **Portuguese**:

|Lemma|POS|Sense ID (optional)|Notes|
|---|---|---|---|
|"quebrar"|V|sense1|evokes physical causation|
|"romper"|V|sense2|evokes mechanical breakage|

- **Constraint**: Only include LUs that **evoke** the frame as defined — not just share surface syntax.
    

---

### 🔹 8. **Frame-to-Frame Relations**

Specify structural relations:

|Type|Target Frame|Notes|
|---|---|---|
|`rel_inheritance`|`Change:Generic`|inherits temporal structure and state change|
|`rel_subframe`|—|for complex events like `Commercial_Transaction`|
|`rel_perspective_on`|`Causation:PatientFocus`|in case of different focal roles|

---

### 🔹 9. **Cognitive Justification**

- **Question**: Can the situation be mentally simulated?
    
- **Prompt**: Describe a prototypical situation that evokes this frame (as a script/story).
    
- **Example**: _You drop a glass; it shatters. You are the cause; the glass is affected._
    

---

### 🔹 10. **Design Notes (Optional)**

- Motivation for creating the frame (e.g. no existing frame captured this configuration)
    
- Challenges encountered (e.g. ambiguous LUs, metaphor overlaps)
    
- Cognitive schemas involved (e.g. container, path, force dynamics)
    

---