
### 🔍 **Características principais das definições existentes:**

1. **Descrição estruturada da situação:**  
    Explica os papéis dos participantes (#Agente, #Tema, #Meta, etc.).
    
2. **Sequência ou dinâmica do evento:**  
    Indica frequentemente estados iniciais, processos intermediários e resultados.
    
3. **Motivações e condições:**  
    Inclui causas, motivações, intenções ou obstáculos.
    
4. **Contextualização:**  
    Muitas vezes especifica se ocorre em certo local, domínio social ou físico.
    

---

## ✔️ **Padrão detectado para replicação nas definições dos novos cenários:**

> "Neste cenário, um #Participante1 executa ou sofre um #Processo ou #Evento, com a participação de #Participante2, em um contexto de #Fundo, motivado por #Causa ou buscando #Meta. O processo geralmente resulta em #Resultado."

---

# 🔧 **Definição Formal do Conceito de “Elemento” na FN5**

## 🏛️ **Definição Ontológica**

- Um **Elemento** na FN5 é uma **unidade ontológica contextualizada**, que representa uma entidade, evento, processo, estado, qualidade ou relação **dentro do escopo semântico específico de um cenário**.
    
- ✔️ Cada elemento:
    
    - Existe apenas dentro de um cenário.
        
    - É interpretado e definido pela rede de relações e papéis naquele cenário.
        
    - Pode possuir o mesmo nome que elementos de outros cenários, mas é ontologicamente distinto, sendo diferenciado pela convenção de nomeação:  
        **`<nome_do_cenário>:<nome_do_elemento>`**.
        

## 🔗 **Natureza Relacional**

- Elementos não existem isoladamente.
    
- Eles se organizam em uma rede de:
    
    - ✔️ **Papéis:** funções dentro do cenário (Agente, Paciente, Tema, Meta, Instrumento...).
        
    - ✔️ **Relações:** estruturais (parte-todo), causais, temporais, espaciais, funcionais, sociais ou lógicas.
        

---

# 🔥 **Tipologia dos Elementos**

### 🔹 **1. Entidade (@entity)**

- Objetos, seres, conceitos, grupos ou instituições que são participantes ou componentes do cenário.
    
- ✔️ Ex.:  
    _Cenário_de_Negociação:Agente_,  
    _Cenário_de_Expressão_Emocional:Indivíduo_,  
    _Cenário_de_Evento_Cultural:Local_.
    

---

### 🔸 **2. Evento ou Processo (@event / @process)**

- Ações, atividades, ocorrências ou sequências dinâmicas que ocorrem dentro do cenário.
    
- ✔️ Ex.:  
    _Cenário_de_Negociação:Troca_de_Propostas_,  
    _Cenário_de_Conflito_Interpessoal:Disputa_,  
    _Cenário_de_Expressão_Emocional:Manifestação_Emocional_.
    

---

### 🔹 **3. Estado (@state)**

- Condições, situações ou status que se mantêm ao longo do tempo no cenário.
    
- ✔️ Ex.:  
    _Cenário_de_Interação_Social:Estado_de_Alinhamento_,  
    _Cenário_de_Suporte_e_Cuidado:Estado_de_Necessidade_.
    

---

### 🔸 **4. Qualidade ou Propriedade (@quality)**

- Atributos, características, avaliações ou propriedades atribuídas a entidades, eventos ou estados.
    
- ✔️ Ex.:  
    _Cenário_de_Negociação:Nível_de_Confiança_,  
    _Cenário_de_Conflito_Interpessoal:Intensidade_do_Conflito_.
    

---

### 🔹 **5. Relação (@relation)**

- Conexões estruturais ou funcionais entre elementos.
    
- Inclui relações:
    
    - ✔️ Mereológicas (parte-todo)
        
    - ✔️ Causais
        
    - ✔️ Temporais
        
    - ✔️ Espaciais
        
    - ✔️ Funcionais (Agente → Ação, Ação → Resultado)
        
    - ✔️ Sociais e simbólicas
        
- ✔️ Ex.:  
    _Cenário_de_Suporte_e_Cuidado:Agente_suporta_Beneficiário_,  
    _Cenário_de_Negociação:Oferta_leva_a_Concessão_.
    

---

# 🏗️ **Estrutura Interna de um Cenário (Modelo Formal)**

Cada cenário é uma tupla formal:

```plaintext
Cenário = { Elementos, Relações }
```

Onde:

- **Elementos = { e₁, e₂, ..., eₙ }**  
    Cada elemento tem:
    
- ✔️ Nome: `<nome_do_cenário>:<nome_do_elemento>`
    
- ✔️ Tipo: { @entity, @event, @state, @process, @quality, @relation }
    
- ✔️ Definição textual e formal
    
- ✔️ Eventualmente propriedades internas
    
- **Relações = { r₁, r₂, ..., rₘ }**  
    Cada relação conecta dois ou mais elementos e pode ser:
    
- ✔️ Estrutural, causal, temporal, espacial ou social.
    

---

# 🔗 **Exemplo: Cenário_de_Negociação**

### **Elementos:**

|Elemento|Tipo|Descrição|
|---|---|---|
|Cenário_de_Negociação:Agente1|@entity|Parte 1 da negociação|
|Cenário_de_Negociação:Agente2|@entity|Parte 2 da negociação|
|Cenário_de_Negociação:Oferta|@event|Proposta feita por um agente|
|Cenário_de_Negociação:Concessão|@event|Ajuste feito para atender parte da demanda|
|Cenário_de_Negociação:Acordo|@state|Estado final de entendimento|
|Cenário_de_Negociação:Nível_de_Confiança|@quality|Grau de confiança entre as partes|

### **Relações:**

|Relação|Descrição|
|---|---|
|Agente1 → Oferta|Agente1 realiza uma oferta|
|Agente2 → Contra_oferta|Agente2 responde com uma contra-oferta|
|Oferta → Concessão|Uma oferta pode levar a uma concessão|
|Concessão → Acordo|As concessões acumuladas podem gerar um acordo|
|Agente1 ↔ Agente2 (Nível_de_Confiança)|O nível de confiança modula as interações|

---

# ✔️ **Implicações e Vantagens**

- 🔥 Cada cenário possui uma mini-ontologia própria, flexível e contextualizada.
    
- 🔗 O mapeamento para a dimensão lexical ocorre no nível dos **frame elements (FEs)** → **elementos de cenário.**
    
- ✔️ Soluciona o problema clássico da fragilidade ontológica dos frames tradicionais.
    
- ✔️ Permite expressar tanto o conhecimento situacional aplicado (cenários) quanto o conhecimento lexical e linguístico associado.
    

---

## 🚀 **Próximo passo:**

1. ✔️ Definir um modelo padrão para documentar os elementos de qualquer cenário.
    
2. ✔️ Criar os conjuntos de elementos para um ou mais cenários escolhidos como exemplo (ex.: _Cenário_de_Negociação_, _Cenário_de_Expressão_Emocional_, etc.).
    
3. ✔️ Estabelecer o modelo de representação das relações internas (pode ser formalizado em OWL, Graph JSON, etc.).
    

👉 **Confirmo se seguimos diretamente com a etapa de definição dos elementos para cenários específicos.**