
# 🔗 **Definições Formais das Relações Entre Frames na FN5**

---

## 🔸 **Relações Herdadas da FrameNet Brasil**

|Nome|Definição Formal|Tipo|
|---|---|---|
|**rel_inheritance**|O frame A é um subtipo mais específico do frame B, herdando seus elementos de frame (EFs) e estrutura.|Ontológica/Hierárquica|
|**rel_subframe**|O frame A é um subevento ou subprocesso do frame B. Instanciar B requer a ocorrência de A.|Composicional/Eventiva|
|**rel_perspective_on**|O frame A representa uma perspectiva ou foco específico sobre o frame B (ex.: comprar vs vender).|Focalização/Perspectiva|
|**rel_using**|O frame A faz uso da estrutura conceitual ou dos EFs do frame B para ser interpretado.|Dependência Funcional|
|**rel_precedes**|O frame A ocorre sequencialmente antes de B em uma ordem temporal ou processual.|Sequencial/Temporal|

---

## 🔸 **Relações Estruturais Adicionais Propostas (FN5)**

|Nome|Definição Formal|Tipo|
|---|---|---|
|**rel_structural_causation**|O frame A representa a causa, fundamento ou condição estrutural necessária para a ocorrência do frame B.|Causal/Estrutural|
|**rel_structural_path**|O frame A representa um ponto na trajetória (origem, meio ou destino) dentro da estrutura do frame B.|Trajetória/Espaço/Processo|
|**rel_structural_containment**|O frame A está contido estrutural ou conceitualmente dentro do frame B (parte de, subconjunto, etc.).|Contenção/Espaço/Hierarquia|
|**rel_structural_link**|O frame A está ligado funcional ou semanticamente ao frame B, representando conexão ou dependência.|Conexão/Estrutural|
|**rel_structural_sequence**|O frame A faz parte de uma sequência estrutural ordenada, na qual B é o próximo item.|Sequência/Estrutura/Processo|
|**rel_structural_dependency**|A existência ou validade do frame A depende funcionalmente da existência ou configuração do frame B.|Dependência Funcional ou Composicional|
|**rel_interpretative_cooccurrence**|A interpretação de A é fortalecida, dependente ou normalmente acompanhada pela ativação de B.|Coocorrência Semântica/Pragmática|

---

## 🔸 **Possíveis Relações Complementares (Sugestão FN5)**

|Nome|Definição Formal|Tipo|
|---|---|---|
|**rel_mutual_exclusion**|A ocorrência do frame A exclui logicamente a de B (ex.: vivo vs morto).|Lógica/Oposicional|
|**rel_alternative**|A e B são alternativas possíveis dentro de uma mesma situação ou escolha.|Alternativa/Escolha|
|**rel_participates_in**|O frame A representa uma entidade, qualidade ou estado que participa como elemento estrutural no frame B.|Participação/Estrutural|
|**rel_requires_precondition**|A ocorrência de A exige que B esteja previamente satisfeito como pré-condição.|Condicional/Estrutural|

---

# 🏗️ **Arquitetura Formal das Relações**

Cada relação será representada formalmente como uma tripla:

```
⟨ idFrame1, relationType, idFrame2 ⟩
```

Com os seguintes atributos semânticos definidos:

- **Direcionalidade:** As relações são direcionais, salvo indicação contrária (_ex.: rel_similarity pode ser simétrica_).
    
- **Herdabilidade:** As relações como _rel_inheritance_ propagam propriedades e EFs do frame superior.
    
- **Composição:** Relações como _rel_subframe_ e _rel_structural_containment_ geram frames compostos ou hierárquicos.
    

---

## 🔥 **Resumo dos Grupos de Relações**

- **Ontológicas/Hierárquicas:** _rel_inheritance, rel_structural_containment, rel_participates_in._
    
- **Eventivas/Composicionais:** _rel_subframe, rel_structural_sequence, rel_structural_path._
    
- **Causais/Condicionais:** _rel_structural_causation, rel_requires_precondition, rel_enablement (se adotado)._
    
- **Pragmáticas/Semânticas:** _rel_perspective_on, rel_using, rel_interpretative_cooccurrence._
    
- **Lógicas/Oposicionais:** _rel_mutual_exclusion, rel_alternative, rel_precedes._
    

---

# ⚠️ **Possíveis Problemas Detectáveis nas Relações Atuais**

1. **Uso excessivo ou genérico de `rel_using`:**
    
    - Observado frequentemente como uma relação comodínia.
        
    - Pode estar mascarando relações mais precisas, como _rel_structural_link_, _rel_participates_in_, ou até _rel_interpretative_cooccurrence_.
        
    - 🔧 **Ajuste:** Recomendar uma revisão. Verificar se realmente é dependência funcional ou se a relação é estrutural, de composição ou interpretativa.
        
2. **Confusão entre `rel_subframe` e `rel_structural_sequence`:**
    
    - _rel_subframe_ deveria ser usado para eventos internos obrigatórios dentro de um frame maior (ex.: _Julgar_ → inclui _Analisar provas_).
        
    - Já _rel_structural_sequence_ descreve uma ordem linear entre frames independentes em sua ocorrência, mas que fazem parte de processos ou narrativas maiores (ex.: _Compra_ → depois _Entrega_).
        
    - 🔧 **Ajuste:** Em muitos casos da base atual, _rel_subframe_ está sendo usado onde na verdade o correto seria _rel_structural_sequence_.
        
3. **Uso insuficiente de relações causais explícitas:**
    
    - Muitas relações que são de natureza causal estão expressas de forma implícita via _rel_using_ ou _rel_subframe_.
        
    - 🔧 **Ajuste:** Introduzir ativamente _rel_structural_causation_ para marcar relações onde uma condição ou processo gera, permite ou fundamenta outro.
        
4. **Subutilização de relações estruturais espaciais e topológicas:**
    
    - Relações como _rel_structural_containment_, _rel_structural_path_, _rel_structural_link_ quase não aparecem, embora cognitivamente sejam fundamentais para frames espaciais, de movimento, de trajetória ou de composição.
        
    - 🔧 **Ajuste:** Aumentar o uso dessas relações em frames como _Movimento_, _Trajetória_, _Part-Whole_, _Causalidade_, _Processo_, etc.
        
5. **Ambiguidade na aplicação de `rel_perspective_on`:**
    
    - Correto quando há mudança de foco conceitual sobre o mesmo evento (ex.: _Vender_ ↔ _Comprar_).
        
    - Mas é usado de forma confusa em alguns casos para frames que são na verdade especializados (e não apenas perspectivas), o que exigiria _rel_inheritance_.
        
    - 🔧 **Ajuste:** Diferenciar claramente _perspectiva_ (mudança de ponto de vista) de _especialização_ (subtipo ontológico).
        
6. **Ausência de relações negativas e lógicas (como oposição e exclusão):**
    
    - 🔧 **Ajuste:** A introdução de _rel_mutual_exclusion_ e _rel_alternative_ cobre lacunas fundamentais na representação de contrastes conceituais, especialmente útil em domínios como legal, biomédico, moral e científico.
        
7. **Falta de distinção entre relações ontológicas e eventivas em certas heranças:**
    
    - 🔧 **Ajuste:** Em alguns casos, _rel_inheritance_ conecta frames que são estruturalmente diferentes (ex.: uma entidade herdando de um evento ou vice-versa), o que pode ser um erro ontológico e deveria ser inspecionado.
        

---

# 🛠️ **Sugestões Operacionais para Melhoria da Rede**

1. ✔️ Implementar um **validador semântico automático** para verificar coerência de tipo entre os frames conectados. Por exemplo:
    
    - _Frame de Evento_ não deveria ser filho de _Frame de Entidade_.
        
    - _Frame de Relação_ deve obrigatoriamente ter dois ou mais participantes.
        
2. ✔️ Refinar a ontologia das relações com **campos adicionais**, como:
    
    - Direcionalidade (simétrica/assimétrica).
        
    - Força da dependência (obrigatória/opcional).
        
    - Tipo de composição (sequencial, causal, espacial, funcional).
        
3. ✔️ Criar um mapa visual interativo das relações entre frames, destacando:
    
    - Ciclos inválidos.
        
    - Componentes desconectados.
        
    - Overuse de relações genéricas.
        
4. ✔️ Para cada nova relação proposta, definir formalmente:
    
    - **Testes de aplicação:** Quando é válido usar.
        
    - **Contraexemplos:** Quando **não** é válido usar.
        
    - **Exemplos claros:** Ilustração da aplicação correta.
        

---

# 💡 **Resumo dos Ajustes Recomendados**

|Problema|Relação Afetada|Solução Proposta|
|---|---|---|
|Uso genérico de dependência|rel_using|Refinar para link, participates_in, etc.|
|Subframe confundido com sequência|rel_subframe ↔ rel_structural_sequence|Diferenciar claramente|
|Causalidade implícita|Sem relação causal explícita|Usar rel_structural_causation|
|Relações espaciais subutilizadas|rel_structural_containment etc.|Aumentar uso nos frames apropriados|
|Ambiguidade em perspectiva|rel_perspective_on|Diferenciar de rel_inheritance|
|Falta de oposição/alternativa|Ausente|Introduzir rel_mutual_exclusion, rel_alternative|
|Heranças incoerentes ontologicamente|rel_inheritance|Validar coerência entre tipos de frame|

---

