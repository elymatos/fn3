### 🧩 Scenario: Group Membership

**Domain:** Social  
**Subdomain:** Social Interaction and Relationships  
**Concept:** Group Membership

---

#### 🧠 Cognitive Narrative

Individuals often belong to various social groups — teams, clubs, communities — which shape their identity, relationships, and responsibilities. Group membership is usually marked by social acceptance, active inclusion, and mutual recognition. It may also entail expectations for loyalty and alignment with group norms. Rejection from a group can produce exclusion, loss of belonging, or social isolation.

---

### 🔍 Ontological Elements

|OE Name|Type|Definition|DUL Class|
|---|---|---|---|
|**SocialGroup**|@entity|A social collection with shared identity, norms, or purpose.|`dul:SocialAgent` or `dul:Collection`|
|**GroupMember**|@entity|An agent recognized as belonging to a specific group.|`dul:Agent`|
|**MembershipRelation**|@relation|The structured affiliation relation between a group and its member.|`dul:isMemberOf` (reified)|
|**InclusionProcess**|@event|The event or act through which a person becomes a group member.|`dul:Event`|
|**RejectionProcess**|@event|The event through which a person is denied access to group membership.|`dul:Event`|
|**BelongingState**|@state|The condition of being socially recognized and included in a group.|`dul:Situation`|
|**ExclusionState**|@state|The condition of being socially excluded or denied group identity.|`dul:Situation`|
|**AcceptanceAttitude**|@quality|The evaluative stance of the group indicating willingness to include a member.|`dul:Quality`|
|**LoyaltyExpectation**|@quality|The normative attribute expected of a group member to demonstrate commitment or alignment.|`dul:Quality`|
|**GroupIdentification**|@relation|The cognitive relation where the agent aligns self-concept with group identity.|`dul:classifies`, `dul:isConceptualizedBy`|

---

### 🔗 Relations Between Ontological Elements (via DUL)

|Subject|DUL Property|Object|Description|
|---|---|---|---|
|GroupMember|`dul:isMemberOf`|SocialGroup|The individual belongs to the group.|
|SocialGroup|`dul:hasMember`|GroupMember|The group includes the individual.|
|MembershipRelation|`dul:classifies`|GroupMember|The affiliation classifies the agent under a group role.|
|MembershipRelation|`dul:isClassifiedBy`|SocialGroup|The group is the context of classification.|
|InclusionProcess|`dul:hasParticipant`|GroupMember, SocialGroup|Both are involved in the inclusion process.|
|InclusionProcess|`dul:satisfies`|MembershipRelation|The process realizes the affiliation.|
|RejectionProcess|`dul:hasParticipant`|GroupMember, SocialGroup|The rejection involves both the excluded agent and group.|
|BelongingState|`dul:includesAgent`|GroupMember|The state includes the individual as socially situated.|
|BelongingState|`dul:isSettingFor`|LoyaltyExpectation|The expectation is contextually situated within the state.|
|AcceptanceAttitude|`dul:isQualityOf`|BelongingState|Acceptance inheres in the inclusion condition.|
|LoyaltyExpectation|`dul:isQualityOf`|GroupMember|Loyalty is expected from the agent.|
|GroupIdentification|`dul:isConceptualizedBy`|GroupMember|The member cognitively aligns with the group.|
|GroupIdentification|`dul:classifies`|SocialGroup|The group is the conceptual object of identification.|