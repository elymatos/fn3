Perfeito. A partir desse princípio — de que frames representam **relações estruturais e semânticas entre elementos da realidade**, sejam entidades, eventos, qualidades ou estados — podemos agora formalizar a **estrutura interna dos frames na FN5**, com foco nos **Elementos de Frame (Frame Elements - FEs)**.

---

# 🔍 **Estrutura Interna dos Frames na FN5: Modelagem dos Elementos de Frame**

## 🏗️ **Princípio Geral**

- Cada **frame** é uma representação formal de uma **relação** existente na realidade — seja uma situação, um estado, uma relação ontológica, uma qualidade ou um vínculo estrutural.
    
- Um frame não é simplesmente um conjunto de papéis linguísticos, mas uma estrutura conceitual que modela como os elementos do mundo se relacionam.
    
- Cada frame é composto por um conjunto de **Elementos de Frame (FEs)** que representam os constituintes necessários ou acessórios dessa relação.
    

---

## 🔬 **Componentes dos Elementos de Frame (FEs)**

|Atributo|Descrição|
|---|---|
|**Nome**|Nome do elemento, especializado no contexto do domínio.|
|**Definição Formal**|Descrição precisa da função semântica e conceitual deste elemento no frame.|
|**Tipo Ontológico**|Categoria ontológica a que pertence (ex.: @Entidade, @Evento, @Qualidade, @Relação).|
|**Coreness**|Grau de essencialidade no frame: **Core**, **Peripheral**, **Extra-Frame**, **Backgrounded**.|
|**Cardinalidade**|Quantidade exigida: obrigatória (1), opcional (0-1), múltipla (0-N, 1-N).|
|**Comentários**|Observações, restrições ou variações contextuais específicas ao domínio.|

---

## ⭐ **Status de Coreness dos FEs**

- 🔵 **Core:** Elemento essencial e necessário para a ocorrência e definição do frame. Sua ausência invalida a instância do frame.
    
- 🟡 **Peripheral:** Informações contextuais, circunstanciais ou acessórios. Ajudam a especificar, mas não definem o frame.
    
- 🟢 **Extra-Frame:** Informações externas, geralmente associadas a frames maiores, frames compostos ou à estrutura discursiva.
    
- ⚪ **Backgrounded:** Informações implícitas, pressupostas ou culturalmente ancoradas, que não precisam ser explicitadas na instância do frame.
    

---

## 📐 **Modelo Formal de Estrutura Interna de Frames**

### ✅ **Exemplo 1: Frame de Evento — TRANSFERÊNCIA**

- **Definição:** Representa a situação em que uma entidade (o Tema) muda de posse ou localização de um Agente (Origem) para um Destinatário (Destino).
    

|Nome|Definição|Tipo Ontológico|Coreness|Cardinalidade|
|---|---|---|---|---|
|**Agente**|Quem inicia ou controla o ato de transferir.|@Agente|Core|1|
|**Tema**|A entidade que é transferida.|@Objeto|Core|1|
|**Destino**|Quem recebe o Tema.|@Agente/@Lugar|Core|1|
|**Origem**|Onde ou de quem o Tema parte.|@Agente/@Lugar|Peripheral|0-1|
|**Meio**|Meio ou canal utilizado na transferência.|@Meio|Peripheral|0-1|
|**Tempo**|Momento da transferência.|@Tempo|Peripheral|0-1|

---

### ✅ **Exemplo 2: Frame de Estado — POSSE**

- **Definição:** Representa a situação estática em que um Agente mantém controle ou posse sobre um Objeto.
    

|Nome|Definição|Tipo Ontológico|Coreness|Cardinalidade|
|---|---|---|---|---|
|**Possuidor**|Entidade que possui ou controla algo.|@Agente|Core|1|
|**Objeto**|A entidade possuída.|@Objeto|Core|1|
|**Base Legal**|Fundamento legal, contratual ou informal.|@Documento/@Relação|Peripheral|0-1|
|**Tempo**|Período durante o qual a posse é válida.|@Tempo|Peripheral|0-1|

---

### ✅ **Exemplo 3: Frame Estrutural — PARTE-TODO**

- **Definição:** Representa a relação estrutural em que uma entidade é parte constituinte de um todo.
    

|Nome|Definição|Tipo Ontológico|Coreness|Cardinalidade|
|---|---|---|---|---|
|**Parte**|Entidade que compõe, mas não é o todo.|@Entidade|Core|1-N|
|**Todo**|A entidade composta pelas partes.|@Entidade|Core|1|
|**Tipo-de-Relação**|Tipo de conexão (física, funcional, hierárquica).|@Relação|Peripheral|0-1|

---

### ✅ **Exemplo 4: Frame de Qualidade — TAMANHO**

- **Definição:** Representa a atribuição de uma dimensão espacial ou abstrata a uma entidade.
    

|Nome|Definição|Tipo Ontológico|Coreness|Cardinalidade|
|---|---|---|---|---|
|**Objeto**|A entidade à qual a qualidade se aplica.|@Entidade|Core|1|
|**Valor**|Medida ou escala do tamanho.|@Dimensão|Core|1|
|**Unidade**|Unidade de medida (metros, grande, pequeno).|@Unidade|Peripheral|0-1|
|**Referência**|Base comparativa (ex.: padrão, outro objeto).|@Entidade|Peripheral|0-1|

---

## 🔗 **Formalização Geral**

> Todo frame FN5 é uma relação formal do tipo:  
> **Frame = ⟨ FE₁, FE₂, ..., FEₙ ⟩**,  
> onde cada **FEᵢ** = ⟨Nome, Definição, TipoOntológico, Coreness, Cardinalidade⟩.

---

## ⚙️ **Observações**

- Em frames especializados de subdomínios (ex.: jurídico, médico, engenharia), os nomes dos elementos de frame são adaptados à terminologia própria, embora suas funções estruturais se mantenham.
    
- A definição de coreness permite distinguir com rigor entre:
    
    - O que é **ontologicamente constitutivo** do frame.
        
    - E o que é **contextual, circunstancial ou periférico**.
        

---

Se desejar, posso agora:

1. ✅ Gerar uma tabela padrão que será aplicada a qualquer frame da rede.
    
2. ✅ Criar templates prontos para você preencher os frames específicos dos subdomínios.
    
3. ✅ Seguir para a análise formal das **relações possíveis entre os frames** (passo 3 do seu plano).
    

Perfeito. A partir dos tipos de frames definidos anteriormente, combinados com os exemplos do arquivo anexado, podemos agora propor a **estrutura interna básica — os Elementos de Frame (EF) fundamentais — para cada tipo de frame na FN5.**

Cada tipo de frame possui um conjunto mínimo de EFs, que definem sua natureza conceitual. Estes EFs podem ser especializados em cada domínio, mas sua função estrutural permanece constante.

---

# 🔍 **Elementos de Frame Básicos por Tipo de Frame na FN5**

---

## 🔵 **1. Frames de Entidade (Ontológicos)**

> Representam entidades do mundo, concretas ou abstratas.

### ✔️ **Elementos Básicos**

|Nome Geral do EF|Descrição|Coreness|
|---|---|---|
|**Entidade**|A entidade central do frame.|Core|
|**Qualidade**|Propriedades ou atributos da entidade.|Peripheral|
|**Composição**|Componentes internos da entidade (se aplicável).|Peripheral|
|**Localização**|Onde a entidade está situada.|Peripheral|
|**Relação**|Vínculos externos da entidade com outras.|Peripheral|

---

## 🔵 **2. Frames de Evento/Situação/Cena**

> Modelam ações, processos, interações ou mudanças no mundo.

### ✔️ **Elementos Básicos**

|Nome Geral do EF|Descrição|Coreness|
|---|---|---|
|**Agente**|Quem inicia, controla ou realiza a ação.|Core|
|**Paciente/Tema**|Quem ou o que sofre, recebe ou é afetado pela ação.|Core|
|**Meta/Destino**|Objetivo, destino ou alvo da ação.|Core/Peripheral (conforme o evento)|
|**Origem**|Fonte de onde algo parte (quando relevante).|Peripheral|
|**Meio**|Instrumento, meio ou canal da ação.|Peripheral|
|**Tempo**|Quando a ação ocorre.|Peripheral|
|**Localização**|Onde a ação ocorre.|Peripheral|
|**Maneira**|Como a ação é executada.|Peripheral|
|**Causa**|Razão ou força que motiva a ação.|Peripheral|
|**Resultado**|Efeito ou consequência do evento.|Peripheral|

---

## 🔵 **3. Frames de Estado**

> Representam condições estáticas, situações permanentes ou relações duradouras.

### ✔️ **Elementos Básicos**

|Nome Geral do EF|Descrição|Coreness|
|---|---|---|
|**Sujeito**|Entidade que possui o estado ou condição.|Core|
|**Estado**|A condição, propriedade ou situação atribuída.|Core|
|**Tempo**|Duração ou validade do estado.|Peripheral|
|**Localização**|Contexto espacial do estado (quando aplicável).|Peripheral|
|**Justificativa**|Base para o estado (contrato, lei, acordo).|Peripheral|

---

## 🔵 **4. Frames de Qualidade**

> Atribuem uma propriedade mensurável, perceptível ou avaliativa a uma entidade.

### ✔️ **Elementos Básicos**

|Nome Geral do EF|Descrição|Coreness|
|---|---|---|
|**Objeto**|A entidade à qual a qualidade é atribuída.|Core|
|**Valor**|O valor da qualidade (numérico ou categórico).|Core|
|**Unidade/Escala**|A escala ou sistema de medida (metros, forte, etc.).|Peripheral|
|**Referência**|Base comparativa (se a qualidade for relativa).|Peripheral|

---

## 🔵 **5. Frames de Relação (Ontológicas, Lógicas ou Estruturais)**

> Representam relações binárias, ternárias ou n-árias entre entidades, qualidades ou eventos.

### ✔️ **Elementos Básicos**

|Nome Geral do EF|Descrição|Coreness|
|---|---|---|
|**Participante 1**|Primeira entidade na relação.|Core|
|**Participante 2**|Segunda entidade na relação.|Core|
|**Relação**|Tipo da relação (parte-todo, causal, posse, etc.).|Core|
|**Contexto**|Condições contextuais (tempo, espaço, domínio).|Peripheral|

> 🔸 _Quando aplicável, adiciona-se: Participante 3, Participante N._

---

## 🔵 **6. Frames Estruturais (Espaciais, Temporais, Causais, Sequenciais)**

> Representam padrões estruturais recorrentes na experiência e na cognição.

### ✔️ **Subtipos e seus Elementos**

#### 🔹 **Containment**

|EF|Descrição|Coreness|
|---|---|---|
|**Interior**|Entidade contida.|Core|
|**Container**|Entidade que contém.|Core|

#### 🔹 **Path / Source-Path-Goal**

|EF|Descrição|Coreness|
|---|---|---|
|**Trajeto**|O percurso.|Core|
|**Origem**|Onde o movimento começa.|Core|
|**Destino**|Onde o movimento termina.|Core|
|**Mover**|A entidade que se desloca.|Core|
|**Meio**|Canal ou suporte do deslocamento.|Peripheral|

#### 🔹 **Part-Whole**

|EF|Descrição|Coreness|
|---|---|---|
|**Parte**|Entidade componente.|Core|
|**Todo**|Entidade composta.|Core|

#### 🔹 **Sequence**

|EF|Descrição|Coreness|
|---|---|---|
|**Evento 1**|Primeiro evento na sequência.|Core|
|**Evento 2**|Segundo evento.|Core|
|**Ordem**|Relacionamento sequencial.|Core|

#### 🔹 **Causation**

|EF|Descrição|Coreness|
|---|---|---|
|**Causa**|Evento, entidade ou condição que gera o efeito.|Core|
|**Efeito**|Resultado da causa.|Core|
|**Meio**|Meio ou mecanismo.|Peripheral|
|**Condições**|Restrições para a causalidade.|Peripheral|

---

## 🔵 **7. Frames Lógicos e Matemáticos**

> Frames formais de operações, funções e relações lógicas.

### ✔️ **Elementos Básicos**

|Nome Geral do EF|Descrição|Coreness|
|---|---|---|
|**Entrada**|O input de uma operação, função ou relação.|Core|
|**Saída**|O output da operação ou função.|Core|
|**Operador**|O tipo de operação (e.g. AND, OR, NOT, função f(x)).|Core|
|**Condições**|Restrições, domínios, axiomas.|Peripheral|

---

## 🔵 **8. Frames Metalinguísticos**

> Frames que representam operações sobre linguagem, discurso ou significado.

### ✔️ **Elementos Básicos**

|Nome Geral do EF|Descrição|Coreness|
|---|---|---|
|**Termo/Expressão**|A unidade linguística sob análise.|Core|
|**Significado/Conteúdo**|O significado atribuído.|Core|
|**Fonte/Idioma**|Origem da expressão (se aplicável).|Peripheral|
|**Destino/Idioma**|Destino da tradução ou reformulação.|Peripheral|
|**Contexto**|Domínio, registro, situação discursiva.|Peripheral|

---

# 🏛️ **Resumo Geral: Arquitetura de Frames na FN5**

Cada tipo de frame carrega uma **estrutura interna mínima**, que funciona como **molde formal**. Quando um frame é classificado, ele automaticamente herda essa estrutura, podendo especializar os nomes dos EFs segundo o subdomínio.

---

## 🚩 **Próximos passos sugeridos:**

1. ✔️ Formalizar isso como **template de especificação de frames**.
    
2. ✔️ Aplicar aos exemplos concretos dos clusters/dominios.
    
3. ✔️ Seguir para a definição formal das **relações entre frames**.
    

👉 **Deseja que eu converta este modelo em templates operacionais (tabelas ou JSON)? Ou avançamos diretamente para a modelagem das relações entre frames?**