Great! Let's construct the **Tourism** scenario step by step, following your directive structure.

---

# 🧳 FN5 Scenario: Tourism

### 1. **Scenario Definition**

**Scenario name**: `Tourism`  
**Type**: Thematic Scenario  
**Description**:  
Tourism is a structured social and economic activity in which individuals (tourists) travel temporarily away from their usual environment for leisure, cultural exploration, or personal development. The scenario includes the planning, transportation, accommodation, and interaction with local services, sites, and traditions. It integrates cognitive intentions, spatial movements, institutional roles, cultural elements, and information structures.

---

### 2. **Ontological Elements (OEs)**

|OE Name|Generic Class|FN5 Domain / Subdomain|Description|
|---|---|---|---|
|Tourism:Tourist|@entity|Social / Social Roles and Identities|An individual engaging in tourism activities|
|Tourism:Destination|@entity|Physical / Spatial Configuration|The place or area being visited|
|Tourism:Accommodation|@entity|Social / Institutions and Organizations|A facility where tourists stay temporarily|
|Tourism:TravelActivity|@event|Space-Time / Motion and Trajectory|The act of traveling between places|
|Tourism:Itinerary|@state|Space-Time / Temporal Structure|The planned sequence of events and movements|
|Tourism:TravelPlan|@state|Cognitive / Intention and Planning|The goal-driven decision to undertake a journey|
|Tourism:TourService|@entity|Social / Economic and Commercial Practices|Services offered to tourists (e.g., guided tours, transport)|
|Tourism:LocalCulture|@quality|Cultural / Heritage and Identity|Cultural expressions and practices encountered by tourists|
|Tourism:MapOrGuide|@entity|Representational / Media and Digital Systems|Documents or media used to orient the tourist|
|Tourism:Host|@entity|Social / Social Roles and Identities|An individual or group receiving/serving tourists|
|Tourism:Spending|@event|Social / Economic and Commercial Practices|Economic transactions performed by tourists|
|Tourism:TravelDocument|@entity|Representational / Information Structures|Identification or authorization for travel|

---

### 3. **Core Relations**

|Relation (Natural Language)|Type|
|---|---|
|A `Tourist` performs a `TravelActivity`|functional / agentive|
|A `TravelPlan` precedes and causes a `TravelActivity`|causal / temporal|
|An `Itinerary` structures the `TravelActivity`|structural|
|A `Tourist` stays at an `Accommodation`|social / spatial|
|A `Tourist` interacts with a `TourService`|social / functional|
|A `Tourist` learns from or experiences `LocalCulture`|cognitive / experiential|
|A `Host` welcomes or guides a `Tourist`|social|
|A `Tourist` uses a `MapOrGuide` to navigate a `Destination`|representational / functional|
|A `TravelDocument` is required for a `TravelActivity`|normative / institutional|
|A `Tourist` spends money during `Spending` events|economic / processual|

---

### 4. **D&S Application**

- **Description**: The abstract schema of the `Tourism` scenario includes entities like `Tourist`, `Accommodation`, and `Destination`, and processes such as `TravelActivity`, governed by intentions like `TravelPlan` and contextualized through `Itinerary`, `MapOrGuide`, and `TourService`.
    
- **Situation**:  
    A specific case where _Maria Gonzalez_ flies from São Paulo to Salvador for a cultural weekend, books a hotel via an app, uses a local tour company, visits Afro-Brazilian heritage sites, and pays in local currency. Her activities are guided by her printed itinerary and city map.
    

---

### 5. **Lexical Frame Mappings**

|FrameNet Frame|Related OE|FE → OE Mapping|
|---|---|---|
|`Travel`|Tourism:TravelActivity|`Traveler` → `Tourist` `Destination` → `Destination`|
|`Touring`|Tourism:TourService, Tourism:LocalCulture|`Guide` → `Host`, `Tourist` → `Tourist`|
|`Residence`|Tourism:Accommodation|`Resident` → `Tourist`, `Location` → `Accommodation`|
|`Commerce_buy` / `Commerce_pay`|Tourism:Spending|`Buyer` → `Tourist`, `Money` → `Spending`|
|`Intentionally_act`|Tourism:TravelPlan|`Agent` → `Tourist`, `Purpose` → `Destination`|
|`Using`|Tourism:MapOrGuide, TravelDocument|`Instrument` → `MapOrGuide`|

---

Would you like this converted to a formal table structure (e.g. CSV or JSON), or shall we proceed with the **next scenario**, such as _Health_ or _Violence_?