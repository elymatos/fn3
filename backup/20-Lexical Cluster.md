## Lexical Clusters in FN5

### Introduction

In the context of the FN5 project, we introduce a novel intermediate level of semantic organization termed "Lexical Clusters". A Lexical Cluster is a structured grouping of semantically and morphologically related lexical units (LUs), independently of their grammatical categories (part-of-speech). Rather than directly evoking a semantic frame, lexical units first integrate into Lexical Clusters, and these clusters, in turn, evoke frames.

### Terminology

We adopt the term **Lexical Cluster** explicitly to denote this intermediary layer. "Lexical" emphasizes the direct association with Lexical Units, and "Cluster" clearly indicates a meaningful grouping of related items.

### Motivation

The main motivations behind introducing Lexical Clusters include:

- **Enhanced Scalability**: Simplifies expansion of the FrameNet lexicon, enabling the efficient incorporation of new lexical units.
    
- **Reduction of Redundancy**: Prevents repetitive connections between similar lexical units and frames.
    
- **Semantic Coherence**: Facilitates semantic generalization by grouping words sharing morphological roots and semantic bases.
    
- **Cross-linguistic Implementation**: Makes the translation and adaptation of FrameNet to other languages more straightforward and consistent.
    

### Possible Implementation Structure

Lexical Clusters can be implemented as structured nodes connecting LUs to semantic frames. For instance, the Lexical Cluster related to "buying" can be represented as:

```json
{
  "cluster_id": "lex_cluster_buy_001",
  "cluster_label": "Buy",
  "lexical_units": [
    {"lemma": "buy", "POS": "verb"},
    {"lemma": "buyer", "POS": "noun"},
    {"lemma": "purchase", "POS": "noun"},
    {"lemma": "bought", "POS": "adjective"}
  ],
  "evoked_frame": "Commerce_buy"
}
```

### Coherence with Original FrameNet Idea

While FrameNet traditionally links lexical units directly to frames, the Lexical Cluster approach maintains the core FrameNet idea that words evoke frames but introduces a structured, semantically coherent intermediary level. This intermediate structure remains fully consistent with FrameNet principles of semantic and lexical grouping, improving clarity and scalability without compromising the original framework.

### Advantages of Using Lexical Clusters

- **Easier Maintenance**: Updates and additions of lexical items become simpler and less error-prone.
    
- **Semantic Precision**: Improves frame assignment accuracy by explicitly modeling semantic relationships among lexical items.
    
- **Flexibility in Expansion**: Facilitates the integration of derivative forms and morphologically related lexical items without repetitive effort.
    

### Expected Improvements

By employing Lexical Clusters, we anticipate:

- **Increased Coverage**: Easier integration of diverse lexical items into existing frames.
    
- **Improved Consistency**: Uniform and structured documentation across lexical entries.
    
- **Enhanced Multilingual Adaptability**: Easier transfer and adaptation of lexical structures across different languages and cultures.
    

In summary, Lexical Clusters in FN5 represent a substantial conceptual and practical advancement, fully aligned with FrameNet's theoretical principles while significantly improving its usability, scalability, and linguistic precision.