# Micro-Frames Documentation for FrameNet Brasil

**Version**: 1.0  
**Date**: October 21, 2025  
**Status**: Complete documentation of all TQR relations (implemented and under analysis)

---

## Table of Contents

1. [Overview](#overview)
2. [Migration: TQR → Micro-Frames](#migration-tqr--micro-frames)
3. [Complete Micro-Frame Library](#complete-micro-frame-library)
    - [Section 1: AGENTIVE Micro-Frames (Implemented)](#section-1-agentive-micro-frames-implemented)
    - [Section 2: CONSTITUTIVE Micro-Frames (Implemented)](#section-2-constitutive-micro-frames-implemented)
    - [Section 3: FORMAL Micro-Frames (Implemented)](#section-3-formal-micro-frames-implemented)
    - [Section 4: TELIC Micro-Frames (Implemented)](#section-4-telic-micro-frames-implemented)
    - [Section 5: AGENTIVE Micro-Frames from SIMPLE (Under Analysis)](#section-5-agentive-micro-frames-from-simple-under-analysis)
    - [Section 6: CONSTITUTIVE Micro-Frames from SIMPLE (Under Analysis)](#section-6-constitutive-micro-frames-from-simple-under-analysis)
    - [Section 7: TELIC Micro-Frames from SIMPLE (Under Analysis)](#section-7-telic-micro-frames-from-simple-under-analysis)
4. [Implementation Notes](#implementation-notes)
5. [Summary Statistics](#summary-statistics)
6. [Usage Examples](#usage-examples)
7. [References](#references)

---

## Overview

**Micro-frames** replace the TQR (Ternary Qualia Relations) system in FrameNet Brasil. All existing TQR relations are preserved and reimplemented as micro-frames, including those already in use and those under analysis from the SIMPLE ontology.

### What are Micro-Frames?

Micro-frames are **binary relation frames** that define connections between Frame Elements. They preserve all the semantic richness of TQR while providing a unified, frame-native architecture.

**Key Properties**:
- Exactly **2 Frame Elements** (binary relations)
- `is_micro_frame = TRUE`
- `arity = 2`
- Each micro-frame IS the background frame from TQR

---

## Migration: TQR → Micro-Frames

### Structural Transformation

**Old TQR Structure**:
```
Qualia Structure (registro na tabela Qualia):
- idQualia
- info (nome amigável)
- entry
- idTypeInstance (Formal/Constitutive/Agentive/Telic)
- idFrame (background frame)
- idFrameElement1
- idFrameElement2

Qualia Relation (registro na tabela EntityRelation):
- rel_qualia_formal/constitutive/agentive/telic
- idEntityLU1
- idEntityLU2
- idEntityQualia
```

**New Micro-Frame Structure**:
```
Micro-Frame (frame with is_micro_frame=TRUE):
- frame_id (= old idFrame)
- frame_name (= old frame name)
- qualia_type (Formal/Constitutive/Agentive/Telic)
- definition
- FE1 (= old idFrameElement1)
- FE2 (= old idFrameElement2)

FE_Relation:
- micro_frame_id
- source_fe_id (= LU1.Target or FE in frame)
- target_fe_id (= LU2.Target or FE in frame)
- source_maps_to_micro_fe_id (= FE1 or FE2)
- target_maps_to_micro_fe_id (= FE1 or FE2)
```

---

## Complete Micro-Frame Library

### Section 1: AGENTIVE Micro-Frames (Implemented)

These micro-frames define relations of origin, creation, and causation.

#### 1.1 afetado_agentivamente_por

**Qualia Type**: Agentive  
**Background Frame**: Afetar_intencionalmente  
**Info**: afetado_agentivamente_por

**Frame Elements**:
- **FE1**: Paciente (the affected entity)
- **FE2**: Agente (the affecting agent)

**Semantics**: Paciente is intentionally affected by Agente

**Examples**:
```
patient.n --afetado_agentivamente_por--> doctor.v
paciente.n --afetado_agentivamente_por--> médico.n
```

---

#### 1.2 causado_agentivamente_por (Agir_intencionalmente)

**Qualia Type**: Agentive  
**Background Frame**: Agir_intencionalmente  
**Info**: causado_agentivamente_por

**Frame Elements**:
- **FE1**: Ação (the action/event)
- **FE2**: Agente (the intentional agent)

**Semantics**: Ação is intentionally caused by Agente

**Examples**:
```
building.n --causado_agentivamente_por--> architect.n
prédio.n --causado_agentivamente_por--> arquiteto.n
```

---

#### 1.3 causado_agentivamente_por (Causalidade)

**Qualia Type**: Agentive  
**Background Frame**: Causalidade  
**Info**: causado_agentivamente_por

**Frame Elements**:
- **FE1**: Efeito (the resulting effect)
- **FE2**: Ator (the actor causing effect)

**Semantics**: Efeito is brought about by Ator's action

**Examples**:
```
result.n --causado_agentivamente_por--> agent.n
resultado.n --causado_agentivamente_por--> agente.n
```

---

#### 1.4 causado_por

**Qualia Type**: Agentive  
**Background Frame**: Causalidade  
**Info**: causado_por

**Frame Elements**:
- **FE1**: Efeito (the effect)
- **FE2**: Causa (the cause)

**Semantics**: Efeito is caused by Causa (may be non-agentive)

**Examples**:
```
erosion.n --causado_por--> rain.n
erosão.n --causado_por--> chuva.n
```

---

#### 1.5 causa_naturalmente

**Qualia Type**: Agentive  
**Background Frame**: Causar_condição_em_saúde  
**Info**: causa_naturalmente

**Frame Elements**:
- **FE1**: Causa_da_condição_em_saúde (the causing condition)
- **FE2**: Condição_em_saúde (the resulting health condition)

**Semantics**: Causa naturally brings about Condição_em_saúde

**Examples**:
```
virus.n --causa_naturalmente--> disease.n
vírus.n --causa_naturalmente--> doença.n
```

---

#### 1.6 causa_reação

**Qualia Type**: Agentive  
**Background Frame**: Causar_iniciar  
**Info**: causa_reação

**Frame Elements**:
- **FE1**: Causa (the initiating cause)
- **FE2**: Efeito (the resulting effect/reaction)

**Semantics**: Causa initiates Efeito as a reaction

**Examples**:
```
stimulus.n --causa_reação--> response.n
estímulo.n --causa_reação--> resposta.n
```

---

#### 1.7 criado_por (Criação_culinária)

**Qualia Type**: Agentive  
**Background Frame**: Criação_culinária  
**Info**: criado_por

**Frame Elements**:
- **FE1**: Comida_produzida (the food created)
- **FE2**: Cozinheiro (the cook/chef)

**Semantics**: Comida_produzida is created by Cozinheiro

**Examples**:
```
prato.n --criado_por--> chef.n
feijoada.n --criado_por--> cozinheiro.n
```

---

#### 1.8 criado_por (Criar_intencionalmente)

**Qualia Type**: Agentive  
**Background Frame**: Criar_intencionalmente  
**Info**: criado_por

**Frame Elements**:
- **FE1**: Entidade_criada (the created entity)
- **FE2**: Criador (the creator)

**Semantics**: Entidade_criada is intentionally created by Criador

**Examples**:
```
painting.n --criado_por--> artist.n
pintura.n --criado_por--> artista.n
software.n --criado_por--> programmer.n
```

---

#### 1.9 é_causa_de

**Qualia Type**: Agentive  
**Background Frame**: Infectar  
**Info**: é_causa_de

**Frame Elements**:
- **FE1**: Causa_Infecção (the infectious agent)
- **FE2**: Infecção (the infection)

**Semantics**: Causa_Infecção is the cause of Infecção

**Examples**:
```
bacteria.n --é_causa_de--> infection.n
bactéria.n --é_causa_de--> infecção.n
```

---

#### 1.10 criado_por (Inovar)

**Qualia Type**: Agentive  
**Background Frame**: Inovar  
**Info**: criado_por

**Frame Elements**:
- **FE1**: Nova_ideia (the innovation/new idea)
- **FE2**: Pensador (the thinker/innovator)

**Semantics**: Nova_ideia is created by Pensador through innovation

**Examples**:
```
theory.n --criado_por--> scientist.n
teoria.n --criado_por--> pensador.n
```

---

#### 1.11 resolvido_por

**Qualia Type**: Agentive  
**Background Frame**: Resolver_problema  
**Info**: resolvido_por

**Frame Elements**:
- **FE1**: Problema (the problem)
- **FE2**: Agente (the problem-solver)

**Semantics**: Problema is solved by Agente

**Examples**:
```
problem.n --resolvido_por--> engineer.n
problema.n --resolvido_por--> engenheiro.n
```

---

### Section 2: CONSTITUTIVE Micro-Frames (Implemented)

These micro-frames define relations of composition, containment, and inherent properties.

#### 2.1 é_atividade_constitutiva_de

**Qualia Type**: Constitutive  
**Background Frame**: Agir_intencionalmente  
**Info**: é_atividade_constitutiva_de

**Frame Elements**:
- **FE1**: Ação (the activity)
- **FE2**: Agente (the agent)

**Semantics**: Ação constitutes the activity of Agente

**Examples**:
```
teaching.n --é_atividade_constitutiva_de--> teacher.n
ensino.n --é_atividade_constitutiva_de--> professor.n
```

---

#### 2.2 tem_como_membro

**Qualia Type**: Constitutive  
**Background Frame**: Associação  
**Info**: tem_como_membro

**Frame Elements**:
- **FE1**: Grupo (the group/collective)
- **FE2**: Membro (the member)

**Semantics**: Grupo has Membro as a member

**Examples**:
```
team.n --tem_como_membro--> player.n
equipe.n --tem_como_membro--> jogador.n
```

---

#### 2.3 tem_como_atributo_constitutivo

**Qualia Type**: Constitutive  
**Background Frame**: Atributos  
**Info**: tem_como_atributo_constitutivo

**Frame Elements**:
- **FE1**: Entidade (the entity)
- **FE2**: Atributo (the attribute)

**Semantics**: Entidade has Atributo as a constitutive attribute

**Examples**:
```
person.n --tem_como_atributo_constitutivo--> age.n
pessoa.n --tem_como_atributo_constitutivo--> idade.n
```

---

#### 2.4 causa_naturalmente (Causalidade)

**Qualia Type**: Constitutive  
**Background Frame**: Causalidade  
**Info**: causa_naturalmente

**Frame Elements**:
- **FE1**: Ator (the natural causer)
- **FE2**: Afetado (the affected entity)

**Semantics**: Ator naturally causes changes in Afetado

**Examples**:
```
sun.n --causa_naturalmente--> warmth.n
sol.n --causa_naturalmente--> calor.n
```

---

#### 2.5 contém

**Qualia Type**: Constitutive  
**Background Frame**: Conter  
**Info**: contém

**Frame Elements**:
- **FE1**: Recipiente (the container)
- **FE2**: Conteúdos (the contents)

**Semantics**: Recipiente contains Conteúdos

**Examples**:
```
bottle.n --contém--> liquid.n
garrafa.n --contém--> líquido.n
```

---

#### 2.6 produz_naturalmente

**Qualia Type**: Constitutive  
**Background Frame**: Criar  
**Info**: produz_naturalmente

**Frame Elements**:
- **FE1**: Criador (the natural producer)
- **FE2**: Entidade_criada (the naturally created entity)

**Semantics**: Criador naturally produces Entidade_criada

**Examples**:
```
tree.n --produz_naturalmente--> fruit.n
árvore.n --produz_naturalmente--> fruta.n
```

---

#### 2.7 é_o_lugar_de

**Qualia Type**: Constitutive  
**Background Frame**: Empregar  
**Info**: é_o_lugar_de

**Frame Elements**:
- **FE1**: Empregador (the employer/workplace)
- **FE2**: Empregado (the employee)

**Semantics**: Empregador is the workplace of Empregado

**Examples**:
```
company.n --é_o_lugar_de--> worker.n
empresa.n --é_o_lugar_de--> empregado.n
```

---

#### 2.8 idiossincrasia_de

**Qualia Type**: Constitutive  
**Background Frame**: Idiossincrasia  
**Info**: idiossincrasia_de

**Frame Elements**:
- **FE1**: Idiossincrasia (the characteristic)
- **FE2**: Entidade (the entity)

**Semantics**: Idiossincrasia is a characteristic feature of Entidade

**Examples**:
```
kilt.n --idiossincrasia_de--> scottish_person.n
kilt.n --idiossincrasia_de--> escocês.n
```

---

#### 2.9 inclui

**Qualia Type**: Constitutive  
**Background Frame**: Inclusão  
**Info**: inclui

**Frame Elements**:
- **FE1**: Total (the whole)
- **FE2**: Parte (the part)

**Semantics**: Total includes Parte as a component

**Examples**:
```
whole.n --inclui--> part.n
todo.n --inclui--> parte.n
```

---

#### 2.10 afeta

**Qualia Type**: Constitutive  
**Background Frame**: Influência_objetiva  
**Info**: afeta

**Frame Elements**:
- **FE1**: Entidade_influenciadora (the influencing entity)
- **FE2**: Entidade_dependente (the dependent entity)

**Semantics**: Entidade_influenciadora objectively affects Entidade_dependente

**Examples**:
```
temperature.n --afeta--> comfort.n
temperatura.n --afeta--> conforto.n
```

---

#### 2.11 tem (Infraestrutura)

**Qualia Type**: Constitutive  
**Background Frame**: Infraestrutura  
**Info**: tem

**Frame Elements**:
- **FE1**: Infraestrutura (the infrastructure)
- **FE2**: Usuário (the user)

**Semantics**: Infraestrutura has Usuário as its users

**Examples**:
```
road.n --tem--> driver.n
estrada.n --tem--> motorista.n
```

---

#### 2.12 é_feito_de

**Qualia Type**: Constitutive  
**Background Frame**: Ingredientes  
**Info**: é_feito_de

**Frame Elements**:
- **FE1**: Produto (the product)
- **FE2**: Material (the material/ingredient)

**Semantics**: Produto is made of Material

**Examples**:
```
bread.n --é_feito_de--> flour.n
pão.n --é_feito_de--> farinha.n
pizza.n --é_feito_de--> flour.n
```

---

#### 2.13 parentesco

**Qualia Type**: Constitutive  
**Background Frame**: Parentesco  
**Info**: parentesco

**Frame Elements**:
- **FE1**: Ego (reference person)
- **FE2**: Alter (related person)

**Semantics**: Ego and Alter are related by kinship

**Examples**:
```
father.n --parentesco--> child.n
pai.n --parentesco--> filho.n
```

---

#### 2.14 tem_como_parte (Parte_elemento)

**Qualia Type**: Constitutive  
**Background Frame**: Parte_elemento  
**Info**: tem_como_parte

**Frame Elements**:
- **FE1**: Substância (the substance)
- **FE2**: Elemento (the element)

**Semantics**: Substância has Elemento as a constituent element

**Examples**:
```
water.n --tem_como_parte--> hydrogen.n
água.n --tem_como_parte--> hidrogênio.n
```

---

#### 2.15 tem_como_parte (Parte_interior_exterior)

**Qualia Type**: Constitutive  
**Background Frame**: Parte_interior_exterior  
**Info**: tem_como_parte

**Frame Elements**:
- **FE1**: Todo (the whole)
- **FE2**: Parte (the interior/exterior part)

**Semantics**: Todo has Parte as an interior or exterior part

**Examples**:
```
car.n --tem_como_parte--> engine.n
carro.n --tem_como_parte--> motor.n
```

---

#### 2.16 tem_como_parte (Parte_todo)

**Qualia Type**: Constitutive  
**Background Frame**: Parte_todo  
**Info**: tem_como_parte

**Frame Elements**:
- **FE1**: Todo (the whole)
- **FE2**: Parte (the part)

**Semantics**: Todo has Parte as a component

**Examples**:
```
body.n --tem_como_parte--> arm.n
corpo.n --tem_como_parte--> braço.n
```

---

#### 2.17 tem_origem

**Qualia Type**: Constitutive  
**Background Frame**: Pessoas_por_origem  
**Info**: tem_origem

**Frame Elements**:
- **FE1**: Pessoa (the person)
- **FE2**: Origem (the origin/place)

**Semantics**: Pessoa has origin in Origem

**Examples**:
```
brazilian.n --tem_origem--> brazil.n
brasileiro.n --tem_origem--> brasil.n
```

---

#### 2.18 é_um_seguidor_de

**Qualia Type**: Constitutive  
**Background Frame**: Pessoas_por_religião  
**Info**: é_um_seguidor_de

**Frame Elements**:
- **FE1**: Pessoa (the person)
- **FE2**: Religião (the religion)

**Semantics**: Pessoa is a follower of Religião

**Examples**:
```
catholic.n --é_um_seguidor_de--> catholicism.n
católico.n --é_um_seguidor_de--> catolicismo.n
```

---

#### 2.19 tem (Relação_condição_sintoma)

**Qualia Type**: Constitutive  
**Background Frame**: Relação_condição_sintoma  
**Info**: tem

**Frame Elements**:
- **FE1**: Condição_em_saúde (the health condition)
- **FE2**: Sintoma (the symptom)

**Semantics**: Condição_em_saúde has Sintoma as a symptom

**Examples**:
```
flu.n --tem--> fever.n
gripe.n --tem--> febre.n
```

---

#### 2.20 relacionado_a

**Qualia Type**: Constitutive  
**Background Frame**: Relação  
**Info**: relacionado_a

**Frame Elements**:
- **FE1**: Entidade_1 (first entity)
- **FE2**: Entidade_2 (second entity)

**Semantics**: Entidade_1 is related to Entidade_2 (general relation)

**Examples**:
```
cause.n --relacionado_a--> effect.n
causa.n --relacionado_a--> efeito.n
```

---

#### 2.21 tem_como_residente

**Qualia Type**: Constitutive  
**Background Frame**: Residência  
**Info**: tem_como_residente

**Frame Elements**:
- **FE1**: Local (the place)
- **FE2**: Residente (the resident)

**Semantics**: Local has Residente as a resident

**Examples**:
```
city.n --tem_como_residente--> citizen.n
cidade.n --tem_como_residente--> cidadão.n
```

---

#### 2.22 tem_como_parte_predial

**Qualia Type**: Constitutive  
**Background Frame**: Subpartes_de_prédios  
**Info**: tem_como_parte_predial

**Frame Elements**:
- **FE1**: Todo (the building whole)
- **FE2**: Parte (the building part)

**Semantics**: Todo has Parte as a building component

**Examples**:
```
building.n --tem_como_parte_predial--> floor.n
prédio.n --tem_como_parte_predial--> andar.n
```

---

#### 2.23 usa

**Qualia Type**: Constitutive  
**Background Frame**: Usar_recurso  
**Info**: usa

**Frame Elements**:
- **FE1**: Agente (the user)
- **FE2**: Recurso (the resource)

**Semantics**: Agente uses Recurso

**Examples**:
```
writer.n --usa--> pen.n
escritor.n --usa--> caneta.n
```

---

### Section 3: FORMAL Micro-Frames (Implemented)

These micro-frames define taxonomic and classificatory relations.

#### 3.1 instância_de

**Qualia Type**: Formal  
**Background Frame**: Exemplar  
**Info**: instância_de

**Frame Elements**:
- **FE1**: Exemplar (the instance/example)
- **FE2**: Tipo (the type/category)

**Semantics**: Exemplar is an instance of Tipo (extensional definition)

**Examples**:
```
japanese_restaurant.n --instância_de--> restaurant.n
restaurante_japonês.n --instância_de--> restaurante.n
```

---

#### 3.2 tipo_de

**Qualia Type**: Formal  
**Background Frame**: Tipo  
**Info**: tipo_de

**Frame Elements**:
- **FE1**: Subtipo (the subtype)
- **FE2**: Categoria (the category/supertype)

**Semantics**: Subtipo is a type of Categoria (intensional definition)

**Examples**:
```
restaurant.n --tipo_de--> building.n
restaurante.n --tipo_de--> construção.n
```

---

### Section 4: TELIC Micro-Frames (Implemented)

These micro-frames define purpose, function, and goal relations.

#### 4.1 é_a_atividade_de

**Qualia Type**: Telic  
**Background Frame**: Agir_intencionalmente  
**Info**: é_a_atividade_de

**Frame Elements**:
- **FE1**: Ação (the action/activity)
- **FE2**: Agente (the agent)

**Semantics**: Ação is the activity/role of Agente

**Examples**:
```
teaching.n --é_a_atividade_de--> teacher.n
ensino.n --é_a_atividade_de--> professor.n
```

---

#### 4.2 é_a_habilidade_de

**Qualia Type**: Telic  
**Background Frame**: Capacidade_ação  
**Info**: é_a_habilidade_de

**Frame Elements**:
- **FE1**: Evento (the ability/capability)
- **FE2**: Entidade (the capable entity)

**Semantics**: Evento is the ability/capability of Entidade

**Examples**:
```
flying.n --é_a_habilidade_de--> bird.n
voo.n --é_a_habilidade_de--> pássaro.n
```

---

#### 4.3 é_o_hábito_de

**Qualia Type**: Telic  
**Background Frame**: Costume  
**Info**: é_o_hábito_de

**Frame Elements**:
- **FE1**: Comportamento (the behavior/custom)
- **FE2**: Protagonista (the protagonist)

**Semantics**: Comportamento is the habit of Protagonista

**Examples**:
```
meditation.n --é_o_hábito_de--> monk.n
meditação.n --é_o_hábito_de--> monge.n
```

---

#### 4.4 objeto_da_atividade

**Qualia Type**: Telic  
**Background Frame**: Criar_intencionalmente  
**Info**: objeto_da_atividade

**Frame Elements**:
- **FE1**: Entidade_criada (the created object)
- **FE2**: Criador (the creator)

**Semantics**: Entidade_criada is the object of Criador's activity

**Examples**:
```
painting.n --objeto_da_atividade--> painter.n
pintura.n --objeto_da_atividade--> pintor.n
```

---

#### 4.5 propósito_de

**Qualia Type**: Telic  
**Background Frame**: Finalidade_do_utensílio  
**Info**: propósito_de

**Frame Elements**:
- **FE1**: Finalidade (the purpose/function)
- **FE2**: Utensílio (the tool/artifact)

**Semantics**: Finalidade is the purpose of Utensílio

**Examples**:
```
cutting.n --propósito_de--> knife.n
cortar.v --propósito_de--> faca.n
```

---

#### 4.6 propósito

**Qualia Type**: Telic  
**Background Frame**: Finalidade  
**Info**: propósito

**Frame Elements**:
- **FE1**: Alvo (the goal/target)
- **FE2**: Agente (the agent)

**Semantics**: Alvo is the purpose/goal of Agente

**Examples**:
```
success.n --propósito--> entrepreneur.n
sucesso.n --propósito--> empreendedor.n
```

---

#### 4.7 é_a_atividade_executada_em

**Qualia Type**: Telic  
**Background Frame**: Infraestrutura  
**Info**: é_a_atividade_executada_em

**Frame Elements**:
- **FE1**: Atividade (the activity)
- **FE2**: Infraestrutura (the infrastructure)

**Semantics**: Atividade is the activity executed in Infraestrutura

**Examples**:
```
driving.n --é_a_atividade_executada_em--> road.n
dirigir.v --é_a_atividade_executada_em--> estrada.n
```

---

#### 4.8 usado_por (Usar_recurso)

**Qualia Type**: Telic  
**Background Frame**: Usar_recurso  
**Info**: usado_por

**Frame Elements**:
- **FE1**: Recurso (the resource)
- **FE2**: Agente (the user agent)

**Semantics**: Recurso is used by Agente

**Examples**:
```
tool.n --usado_por--> worker.n
ferramenta.n --usado_por--> trabalhador.n
```

---

#### 4.9 usa_para

**Qualia Type**: Telic  
**Background Frame**: Usar  
**Info**: usa_para

**Frame Elements**:
- **FE1**: Agente (the user)
- **FE2**: Finalidade (the purpose)

**Semantics**: Agente uses for Finalidade

**Examples**:
```
chef.n --usa_para--> cooking.n
chef.n --usa_para--> cozinhar.v
```

---

#### 4.10 vício_de

**Qualia Type**: Telic  
**Background Frame**: Vício  
**Info**: vício de

**Frame Elements**:
- **FE1**: Vício (the addiction/vice)
- **FE2**: Viciado (the addicted person)

**Semantics**: Vício is the addiction of Viciado

**Examples**:
```
smoking.n --vício_de--> smoker.n
fumar.v --vício_de--> fumante.n
```

---

### Section 5: AGENTIVE Micro-Frames from SIMPLE (Under Analysis)

These micro-frames from SIMPLE ontology are being analyzed for inclusion.

#### 5.1 AffectedBy

**Qualia Type**: Agentive  
**Background Frame**: *To be defined*  
**SIMPLE Definition**: [SemU1] is affected by [SemU2] occurrence

**Frame Elements**:
- **FE1**: Affected_entity (the affected entity)
- **FE2**: Affecting_event (the event that affects)

**Semantics**: Affected_entity undergoes change due to Affecting_event occurrence

**SIMPLE Example**: Climate :: deforestation

**Proposed FNBr Example**:
```
climate.n --AffectedBy--> deforestation.n
clima.n --AffectedBy--> desmatamento.n
```

**Status**: Under analysis

---

#### 5.2 AgentiveExperience

**Qualia Type**: Agentive  
**Background Frame**: *To be defined*  
**SIMPLE Definition**: [SemU1] is an experience predicate and [SemU2] is the event experienced by the individual

**Frame Elements**:
- **FE1**: Experience_state (the experiential state)
- **FE2**: Experienced_event (the event being experienced)

**Semantics**: Experience_state is the experiential state resulting from Experienced_event

**SIMPLE Example**: fear :: feel

**Proposed FNBr Example**:
```
fear.n --AgentiveExperience--> feel.v
medo.n --AgentiveExperience--> sentir.v
```

**Status**: Under analysis

---

#### 5.3 AgentiveProg

**Qualia Type**: Agentive  
**Background Frame**: *To be defined*  
**SIMPLE Definition**: [SemU2] is an event which is ongoing while an individual has the property expressed by [SemU1]

**Frame Elements**:
- **FE1**: Property (the property/state)
- **FE2**: Ongoing_event (the simultaneous event)

**Semantics**: Property is maintained while Ongoing_event is in progress

**SIMPLE Example**: Pedestrian :: walk

**Proposed FNBr Example**:
```
pedestrian.n --AgentiveProg--> walk.v
pedestre.n --AgentiveProg--> andar.v
```

**Status**: Under analysis

---

#### 5.4 ResultOf

**Qualia Type**: Agentive  
**Background Frame**: *To be defined*  
**SIMPLE Definition**: [SemU1] is an entity which is the result, effect or by-product of the event expressed by [SemU2]

**Frame Elements**:
- **FE1**: Result_entity (the resulting entity)
- **FE2**: Causing_event (the event that produces)

**Semantics**: Result_entity is the result or by-product of Causing_event

**SIMPLE Example**: Loss :: lose

**Proposed FNBr Example**:
```
loss.n --ResultOf--> lose.v
perda.n --ResultOf--> perder.v
```

**Status**: Under analysis

---

#### 5.5 Source

**Qualia Type**: Agentive  
**Background Frame**: *To be defined*  
**SIMPLE Definition**: [SemU2] is the source or origin of [SemU1]

**Frame Elements**:
- **FE1**: Derived_entity (the entity)
- **FE2**: Source_entity (the source/origin)

**Semantics**: Derived_entity originates from or is derived from Source_entity

**SIMPLE Example**: Law :: society

**Proposed FNBr Example**:
```
law.n --Source--> society.n
lei.n --Source--> sociedade.n
```

**Status**: Under analysis

---

#### 5.6 DerivedFrom

**Qualia Type**: Agentive  
**Background Frame**: *To be defined*  
**SIMPLE Definition**: [SemU1] is derived from another object [SemU2] through a certain process of alteration

**Frame Elements**:
- **FE1**: Derived_object (the derived entity)
- **FE2**: Original_object (the original entity)

**Semantics**: Derived_object is created from Original_object through transformation

**SIMPLE Example**: Petrol :: oil

**Proposed FNBr Example**:
```
petrol.n --DerivedFrom--> oil.n
gasolina.n --DerivedFrom--> petróleo.n
```

**Status**: Under analysis

---

### Section 6: CONSTITUTIVE Micro-Frames from SIMPLE (Under Analysis)

#### 6.1 HasAsMember

**Qualia Type**: Constitutive  
**Background Frame**: *To be defined*  
**SIMPLE Definition**: [SemU1], which corresponds to a collective entity or a set of entities, has [SemU2] as its (proto)-typical member or element

**Frame Elements**:
- **FE1**: Collective (the collection/group)
- **FE2**: Typical_member (the prototypical member)

**Semantics**: Collective has Typical_member as a prototypical or typical member

**SIMPLE Example**: Flock :: bird

**Proposed FNBr Example**:
```
flock.n --HasAsMember--> bird.n
bando.n --HasAsMember--> pássaro.n
```

**Note**: Similar to existing `tem_como_membro` (Associação frame) but emphasizes prototypicality

**Status**: Under analysis

---

#### 6.2 HasAsPart

**Qualia Type**: Constitutive  
**Background Frame**: *To be defined*  
**SIMPLE Definition**: [SemU1] has prototypically [SemU2] as one of its parts

**Frame Elements**:
- **FE1**: Whole (the whole entity)
- **FE2**: Typical_part (the prototypical part)

**Semantics**: Whole prototypically has Typical_part as a component

**SIMPLE Example**: Airplane :: wing

**Proposed FNBr Example**:
```
airplane.n --HasAsPart--> wing.n
avião.n --HasAsPart--> asa.n
```

**Note**: Similar to existing `tem_como_parte` but emphasizes prototypicality

**Status**: Under analysis

---

#### 6.3 Instrument

**Qualia Type**: Constitutive  
**Background Frame**: *To be defined*  
**SIMPLE Definition**: [SemU1] is an event SemU and [SemU2] is the typical instrument, vehicle or device which is used to perform this event

**Frame Elements**:
- **FE1**: Event (the event)
- **FE2**: Typical_instrument (the prototypical instrument)

**Semantics**: Event is typically performed using Typical_instrument

**SIMPLE Example**: Ski :: ski

**Proposed FNBr Example**:
```
skiing.n --Instrument--> ski.n
esquiar.v --Instrument--> esqui.n
```

**Status**: Under analysis

---

#### 6.4 ResultingState

**Qualia Type**: Constitutive  
**Background Frame**: *To be defined*  
**SIMPLE Definition**: [SemU1] is a transition and [SemU2] is the resulting state of the transition

**Frame Elements**:
- **FE1**: Transition_event (the transitional event)
- **FE2**: Result_state (the resulting state)

**Semantics**: Transition_event leads to Result_state as outcome

**SIMPLE Example**: die :: died

**Proposed FNBr Example**:
```
die.v --ResultingState--> dead.adj
morrer.v --ResultingState--> morto.adj
```

**Status**: Under analysis

---

#### 6.5 TypicalLocation

**Qualia Type**: Constitutive  
**Background Frame**: *To be defined*  
**SIMPLE Definition**: [SemU1] is a location that typically is associated the entity in [SemU2]

**Frame Elements**:
- **FE1**: Location (the typical location)
- **FE2**: Located_entity (the entity)

**Semantics**: Location is the prototypical or typical location for Located_entity

**SIMPLE Example**: oasis :: desert

**Proposed FNBr Example**:
```
oasis.n --TypicalLocation--> desert.n
oásis.n --TypicalLocation--> deserto.n
```

**Status**: Under analysis

---

#### 6.6 Affects

**Qualia Type**: Constitutive  
**Background Frame**: *To be defined*  
**SIMPLE Definition**: [SemU1] is a phenomenon that typically affects the entity in [SemU2]

**Frame Elements**:
- **FE1**: Affecting_phenomenon (the affecting phenomenon)
- **FE2**: Affected_entity (the affected entity)

**Semantics**: Affecting_phenomenon typically affects or influences Affected_entity

**SIMPLE Example**: heat :: temperature

**Proposed FNBr Example**:
```
heat.n --Affects--> temperature.n
calor.n --Affects--> temperatura.n
```

**Note**: Similar to existing `afeta` (Influência_objetiva) but emphasizes typical affection patterns

**Status**: Under analysis

---

#### 6.7 Concerns

**Qualia Type**: Constitutive  
**Background Frame**: *To be defined*  
**SIMPLE Definition**: [SemU1] is a phenomenon, event or situation that typically concerns or affects [SemU2]

**Frame Elements**:
- **FE1**: Concerning_phenomenon (the phenomenon)
- **FE2**: Concerned_entity (the concerned/affected entity)

**Semantics**: Concerning_phenomenon is about or pertains to Concerned_entity

**SIMPLE Example**: Hepatitis :: liver

**Proposed FNBr Example**:
```
hepatitis.n --Concerns--> liver.n
hepatite.n --Concerns--> fígado.n
```

**Status**: Under analysis

---

#### 6.8 Contains

**Qualia Type**: Constitutive  
**Background Frame**: *To be defined*  
**SIMPLE Definition**: [SemU2] is an object which is typically contained in [SemU1]

**Frame Elements**:
- **FE1**: Container (the container)
- **FE2**: Typical_content (the typical content)

**Semantics**: Container typically contains Typical_content

**SIMPLE Example**: Book :: information

**Proposed FNBr Example**:
```
book.n --Contains--> information.n
livro.n --Contains--> informação.n
```

**Note**: Similar to existing `contém` (Conter) but emphasizes prototypical content

**Status**: Under analysis

---

#### 6.9 HasAsColour

**Qualia Type**: Constitutive  
**Background Frame**: *To be defined*  
**SIMPLE Definition**: [SemU2] is the typical colour of [SemU1]

**Frame Elements**:
- **FE1**: Colored_entity (the entity)
- **FE2**: Typical_color (the typical color)

**Semantics**: Colored_entity typically has Typical_color as its color

**SIMPLE Example**: Apple :: red

**Proposed FNBr Example**:
```
apple.n --HasAsColour--> red.n
maçã.n --HasAsColour--> vermelho.n
```

**Status**: Under analysis

---

#### 6.10 HasAsEffect

**Qualia Type**: Constitutive  
**Background Frame**: *To be defined*  
**SIMPLE Definition**: [SemU2] is a side-effect, consequence or indirect effect of [SemU1]

**Frame Elements**:
- **FE1**: Causing_phenomenon (the cause)
- **FE2**: Side_effect (the side-effect/consequence)

**Semantics**: Causing_phenomenon has Side_effect as a typical consequence

**SIMPLE Example**: Tempestade :: trovão (Storm :: thunder)

**Proposed FNBr Example**:
```
storm.n --HasAsEffect--> thunder.n
tempestade.n --HasAsEffect--> trovão.n
```

**Status**: Under analysis

---

#### 6.11 HasAsProperty

**Qualia Type**: Constitutive  
**Background Frame**: *To be defined*  
**SIMPLE Definition**: [SemU2] is an adjective which refers to the property, quality or attribute expressed by [SemU1]

**Frame Elements**:
- **FE1**: Abstract_property (the nominal property)
- **FE2**: Adjectival_property (the adjectival form)

**Semantics**: Abstract_property corresponds to Adjectival_property

**SIMPLE Example**: Intelligence :: intelligent

**Proposed FNBr Example**:
```
intelligence.n --HasAsProperty--> intelligent.adj
inteligência.n --HasAsProperty--> inteligente.adj
```

**Status**: Under analysis

---

#### 6.12 MeasuredBy

**Qualia Type**: Constitutive  
**Background Frame**: *To be defined*  
**SIMPLE Definition**: [SemU1] is a property which is measured by [SemU2], a unit of measure

**Frame Elements**:
- **FE1**: Measurable_property (the property)
- **FE2**: Unit_of_measure (the measurement unit)

**Semantics**: Measurable_property is quantified using Unit_of_measure

**SIMPLE Example**: Temperature :: degree

**Proposed FNBr Example**:
```
temperature.n --MeasuredBy--> degree.n
temperatura.n --MeasuredBy--> grau.n
```

**Status**: Under analysis

---

#### 6.13 PropertyOf

**Qualia Type**: Constitutive  
**Background Frame**: *To be defined*  
**SIMPLE Definition**: [SemU2] is an adjective which refers to the property, quality or attribute expressed by [SemU1]

**Frame Elements**:
- **FE1**: Adjectival_property (the adjectival form)
- **FE2**: Abstract_property (the nominal property)

**Semantics**: Adjectival_property corresponds to Abstract_property (inverse of HasAsProperty)

**SIMPLE Example**: Intelligent :: intelligence

**Proposed FNBr Example**:
```
intelligent.adj --PropertyOf--> intelligence.n
inteligente.adj --PropertyOf--> inteligência.n
```

**Note**: This is the inverse direction of HasAsProperty

**Status**: Under analysis

---

#### 6.14 Quantifies

**Qualia Type**: Constitutive  
**Background Frame**: *To be defined*  
**SIMPLE Definition**: [SemU1] expresses a quantity of [SemU2]

**Frame Elements**:
- **FE1**: Quantifier (the quantifying container/measure)
- **FE2**: Quantified_substance (the substance being quantified)

**Semantics**: Quantifier expresses a quantity of Quantified_substance

**SIMPLE Example**: bottle :: liquid

**Proposed FNBr Example**:
```
bottle.n --Quantifies--> liquid.n
garrafa.n --Quantifies--> líquido.n
```

**Status**: Under analysis

---

#### 6.15 Regulates

**Qualia Type**: Constitutive  
**Background Frame**: *To be defined*  
**SIMPLE Definition**: [SemU1] regulates [SemU2]

**Frame Elements**:
- **FE1**: Regulating_entity (the regulator)
- **FE2**: Regulated_entity (the regulated activity/entity)

**Semantics**: Regulating_entity governs or controls Regulated_entity

**SIMPLE Example**: Rule :: play

**Proposed FNBr Example**:
```
rule.n --Regulates--> play.v
regra.n --Regulates--> jogo.n
```

**Status**: Under analysis

---

#### 6.16 SuccessorOf

**Qualia Type**: Constitutive  
**Background Frame**: *To be defined*  
**SIMPLE Definition**: [SemU1] is the element following [SemU2] in a series

**Frame Elements**:
- **FE1**: Successor (the following element)
- **FE2**: Predecessor (the preceding element)

**Semantics**: Successor follows Predecessor in an ordered sequence

**SIMPLE Example**: Two :: one

**Proposed FNBr Example**:
```
two.n --SuccessorOf--> one.n
dois.n --SuccessorOf--> um.n
```

**Status**: Under analysis

---

#### 6.17 TypicalOf

**Qualia Type**: Constitutive  
**Background Frame**: *To be defined*  
**SIMPLE Definition**: [SemU1] is a disease or phenomenon that typically affects the entity in [SemU2]

**Frame Elements**:
- **FE1**: Typical_phenomenon (the disease/phenomenon)
- **FE2**: Typically_affected (the typically affected entity)

**Semantics**: Typical_phenomenon is characteristic of or typically affects Typically_affected

**SIMPLE Example**: measles :: child

**Proposed FNBr Example**:
```
measles.n --TypicalOf--> child.n
sarampo.n --TypicalOf--> criança.n
```

**Status**: Under analysis

---

### Section 7: TELIC Micro-Frames from SIMPLE (Under Analysis)

#### 7.1 IndirectTelic

**Qualia Type**: Telic  
**Background Frame**: *To be defined*  
**SIMPLE Definition**: [SemU1] and [SemU2] are related through an underspecified indirect telic relation. [SemU1] is usually the subject or the instrument-complement of the event in [SemU2], which represents a purpose prototypically associated with [SemU1]

**Frame Elements**:
- **FE1**: Entity_with_purpose (the entity)
- **FE2**: Typical_purpose_event (the prototypical purpose)

**Semantics**: Entity_with_purpose is typically involved in Typical_purpose_event (underspecified telic relation)

**SIMPLE Example**: eye :: see

**Proposed FNBr Example**:
```
eye.n --IndirectTelic--> see.v
olho.n --IndirectTelic--> ver.v
```

**Status**: Under analysis

---

#### 7.2 UsedAs

**Qualia Type**: Telic  
**Background Frame**: *To be defined*  
**SIMPLE Definition**: [SemU1] is typically used with the function which is expressed by [SemU2]

**Frame Elements**:
- **FE1**: Used_entity (the entity)
- **FE2**: Function (the typical function)

**Semantics**: Used_entity is typically used as or for Function

**SIMPLE Example**: wood :: material

**Proposed FNBr Example**:
```
wood.n --UsedAs--> material.n
madeira.n --UsedAs--> material.n
```

**Status**: Under analysis

---

#### 7.3 UsedAgainst

**Qualia Type**: Telic  
**Background Frame**: *To be defined*  
**SIMPLE Definition**: [SemU1] is used typically against [SemU2]

**Frame Elements**:
- **FE1**: Treatment_method (the treatment/intervention)
- **FE2**: Target_condition (the condition being treated)

**Semantics**: Treatment_method is typically used to counteract Target_condition

**SIMPLE Example**: Quimioterapy :: cancer

**Proposed FNBr Example**:
```
chemotherapy.n --UsedAgainst--> cancer.n
quimioterapia.n --UsedAgainst--> câncer.n
```

**Status**: Under analysis

---

## Implementation Notes

### Database Schema Changes

**Old TQR Tables**:
```sql
-- Qualia structure definition
CREATE TABLE Qualia (
  idQualia INT PRIMARY KEY,
  info VARCHAR(255),
  entry VARCHAR(255),
  idTypeInstance INT,  -- Formal/Constitutive/Agentive/Telic
  idFrame INT,          -- Background frame
  idFrameElement1 INT,
  idFrameElement2 INT
);

-- LU-to-LU relations
CREATE TABLE EntityRelation (
  relationType VARCHAR(50),  -- rel_qualia_formal, rel_qualia_constitutive, etc.
  idEntityLU1 INT,
  idEntityLU2 INT,
  idEntityQualia INT
);
```

**New Micro-Frame Schema**:
```sql
-- Frames table (includes micro-frames)
CREATE TABLE frame (
  frame_id INT PRIMARY KEY,
  frame_name VARCHAR(255),
  frame_type ENUM('semantic', 'entity', 'lexical_unit', 'lemma', 'ontology', 'micro_frame'),
  is_micro_frame BOOLEAN DEFAULT FALSE,
  arity INT,  -- 2 for micro-frames
  qualia_type ENUM('Formal', 'Constitutive', 'Agentive', 'Telic', NULL),
  definition TEXT
);

-- Frame Elements (all FEs, including those in micro-frames)
CREATE TABLE frame_element (
  fe_id INT PRIMARY KEY,
  frame_id INT,
  fe_name VARCHAR(255),
  fe_type ENUM('core', 'peripheral', 'extra-thematic'),
  is_target_fe BOOLEAN DEFAULT FALSE,
  refers_to_frame_id INT,  -- Type constraint
  definition TEXT
);

-- All relations (intra-frame and inter-frame)
CREATE TABLE fe_relation (
  relation_id INT PRIMARY KEY,
  micro_frame_id INT,  -- Which micro-frame defines this relation
  host_frame_id INT,   -- NULL for inter-frame, frame_id for intra-frame
  source_fe_id INT,
  target_fe_id INT,
  source_maps_to_micro_fe_id INT,  -- Which FE in micro-frame
  target_maps_to_micro_fe_id INT   -- Which FE in micro-frame
);
```

### Migration Strategy

1. **Create micro-frames from existing background frames**:
    - Each background frame referenced in Qualia table becomes a micro-frame
    - Mark with `is_micro_frame = TRUE`
    - Set `arity = 2`
    - Preserve `qualia_type` from `idTypeInstance`

2. **Transform qualia relations to fe_relations**:
    - For LU-to-LU relations: source and target are Target FEs of LU frames
    - For intra-frame relations: source and target are FEs within same frame
    - Map to micro-frame FEs via `source_maps_to_micro_fe_id` and `target_maps_to_micro_fe_id`

3. **Preserve all relation metadata**:
    - `info` field → micro-frame `frame_name` or `definition`
    - Background frame → micro-frame
    - FE mappings preserved in fe_relation

### Example Migration

**Old TQR**:
```
Qualia:
  idQualia: 42
  info: "criado_por"
  idTypeInstance: Agentive
  idFrame: 123 (Criação_culinária)
  idFrameElement1: 456 (Comida_produzida)
  idFrameElement2: 789 (Cozinheiro)

EntityRelation:
  relationType: rel_qualia_agentive
  idEntityLU1: 1001 (pizza.n)
  idEntityLU2: 2002 (chef.n)
  idEntityQualia: 42
```

**New Micro-Frame**:
```sql
-- Micro-frame
INSERT INTO frame VALUES (
  123,  -- frame_id (same as old idFrame)
  'Criação_culinária',
  'micro_frame',
  TRUE,  -- is_micro_frame
  2,     -- arity
  'Agentive',
  'Defines creation relationship in culinary context'
);

-- FEs of micro-frame
INSERT INTO frame_element VALUES (456, 123, 'Comida_produzida', 'core', FALSE, NULL, '...');
INSERT INTO frame_element VALUES (789, 123, 'Cozinheiro', 'core', FALSE, NULL, '...');

-- Relation
INSERT INTO fe_relation VALUES (
  5001,  -- relation_id
  123,   -- micro_frame_id (Criação_culinária)
  NULL,  -- host_frame_id (inter-frame, LU to LU)
  1001,  -- source_fe_id (pizza.n.Target)
  2002,  -- target_fe_id (chef.n.Target)
  456,   -- source_maps_to (Comida_produzida)
  789    -- target_maps_to (Cozinheiro)
);
```

---

## Summary Statistics

### Implemented Micro-Frames

| Qualia Type | Count | Examples |
|-------------|-------|----------|
| **Agentive** | 11 | afetado_agentivamente_por, causado_por, criado_por, resolvido_por |
| **Constitutive** | 23 | tem_como_membro, contém, tem_como_parte, parentesco, usa |
| **Formal** | 2 | instância_de, tipo_de |
| **Telic** | 10 | é_a_atividade_de, propósito_de, usado_por, vício_de |
| **TOTAL** | **46** | All currently implemented in FNBr |

### SIMPLE Micro-Frames Under Analysis

| Qualia Type | Count | Examples |
|-------------|-------|----------|
| **Agentive** | 6 | AffectedBy, ResultOf, Source, DerivedFrom |
| **Constitutive** | 17 | HasAsMember, HasAsPart, Affects, Contains, MeasuredBy, Regulates |
| **Telic** | 3 | IndirectTelic, UsedAs, UsedAgainst |
| **TOTAL** | **26** | Pending analysis for implementation |

### Grand Total

**72 micro-frames** documented (46 implemented + 26 under analysis)

---

## Usage Examples

### Example 1: LU-to-LU Relation (Inter-Frame)

**Scenario**: Pizza is made by chef

```
Source: pizza.n (LU frame)
Target: chef.n (LU frame)
Micro-frame: Criação_culinária

Relation:
  source_fe_id: pizza.n.Target
  target_fe_id: chef.n.Target
  source_maps_to: Comida_produzida
  target_maps_to: Cozinheiro
```

### Example 2: Intra-Frame Relation

**Scenario**: In Commerce_buy frame, Buyer is the agent

```
Source: Commerce_buy.Target
Target: Commerce_buy.Buyer
Micro-frame: agent_relation (Agir_intencionalmente)

Relation:
  host_frame_id: Commerce_buy
  source_fe_id: Commerce_buy.Target
  target_fe_id: Commerce_buy.Buyer
  source_maps_to: Ação
  target_maps_to: Agente
```

### Example 3: Frame Inheritance (Inter-Frame via Targets)

**Scenario**: Commerce_buy inherits from Getting

```
Source: Commerce_buy.Target
Target: Getting.Target
Micro-frame: inherits_from_relation

Relation:
  host_frame_id: NULL (inter-frame)
  source_fe_id: Commerce_buy.Target
  target_fe_id: Getting.Target
  source_maps_to: Child_frame
  target_maps_to: Parent_frame
```

---

## References

### FrameNet Brasil Publications

- Torrent, T. T., et al. (2022). "Representing Context in FrameNet: A Multidimensional, Multimodal Approach." *Frontiers in Psychology*. PMC9014903.
- FNBr Qualia Relations Documentation (Draft 4, 2022; Draft 5, 2023)

### SIMPLE Ontology

- Lenci, A., Busa, F., Ruimy, N., Gola, E., Monachini, M., Calzolari, N., et al. (2000). *SIMPLE Linguistic Specifications*. University of Pisa and Institute of Computational Linguistics of CNR.

### Theoretical Foundations

- Pustejovsky, J. (1995). *The Generative Lexicon*. MIT Press.
- Pustejovsky, J. (2006). Type Theory and Lexical Decomposition. *Journal of Cognitive Science*.
- Fillmore, C. J. (1982). Frame Semantics. In *Linguistics in the Morning Calm*.
- Masolo, C., Borgo, S., Gangemi, A., Guarino, N., & Oltramari, A. (2003). *Wonderweb deliverable D18, ontology library (final)*.

### Frame-Native DUL Architecture

- FrameNet Brasil + DUL Integration - Frame-Native Architecture Specification v2.0 (2025)

---

## Conclusion

This documentation preserves all existing TQR relations as micro-frames while providing a unified, extensible framework. The 46 implemented micro-frames continue to function exactly as before, while the 26 SIMPLE relations under analysis can be added systematically using the same structure.

The micro-frame approach maintains backward compatibility while enabling the frame-native architecture's benefits:

- **Uniformity**: All relations use the same FE-to-FE mechanism
- **Extensibility**: New micro-frames can be added without schema changes
- **Semantic richness**: Each micro-frame is a full frame with definition and constraints
- **Frame-native**: Relations themselves are frames, achieving complete conceptual uniformity

**Status**: Complete documentation of all TQR relations (implemented and under analysis)  
**Date**: October 21, 2025  
**Version**: 1.0  
**Authors**: FrameNet Brasil Team

---

## Appendix: Quick Reference Tables

### All Implemented Micro-Frames by Background Frame

| Background Frame | Info | Qualia Type | FE1 | FE2 |
|------------------|------|-------------|-----|-----|
| Afetar_intencionalmente | afetado_agentivamente_por | Agentive | Paciente | Agente |
| Agir_intencionalmente | causado_agentivamente_por | Agentive | Ação | Agente |
| Agir_intencionalmente | é_atividade_constitutiva_de | Constitutive | Ação | Agente |
| Agir_intencionalmente | é_a_atividade_de | Telic | Ação | Agente |
| Associação | tem_como_membro | Constitutive | Grupo | Membro |
| Atributos | tem_como_atributo_constitutivo | Constitutive | Entidade | Atributo |
| Capacidade_ação | é_a_habilidade_de | Telic | Evento | Entidade |
| Causalidade | causado_agentivamente_por | Agentive | Efeito | Ator |
| Causalidade | causado_por | Agentive | Efeito | Causa |
| Causalidade | causa_naturalmente | Constitutive | Ator | Afetado |
| Causar_condição_em_saúde | causa_naturalmente | Agentive | Causa_da_condição_em_saúde | Condição_em_saúde |
| Causar_iniciar | causa_reação | Agentive | Causa | Efeito |
| Conter | contém | Constitutive | Recipiente | Conteúdos |
| Costume | é_o_hábito_de | Telic | Comportamento | Protagonista |
| Criar | produz_naturalmente | Constitutive | Criador | Entidade_criada |
| Criar_intencionalmente | criado_por | Agentive | Entidade_criada | Criador |
| Criar_intencionalmente | objeto_da_atividade | Telic | Entidade_criada | Criador |
| Criação_culinária | criado_por | Agentive | Comida_produzida | Cozinheiro |
| Empregar | é_o_lugar_de | Constitutive | Empregador | Empregado |
| Exemplar | instância_de | Formal | Exemplar | Tipo |
| Finalidade | propósito | Telic | Alvo | Agente |
| Finalidade_do_utensílio | propósito_de | Telic | Finalidade | Utensílio |
| Idiossincrasia | idiossincrasia_de | Constitutive | Idiossincrasia | Entidade |
| Inclusão | inclui | Constitutive | Total | Parte |
| Infectar | é_causa_de | Agentive | Causa_Infecção | Infecção |
| Influência_objetiva | afeta | Constitutive | Entidade_influenciadora | Entidade_dependente |
| Infraestrutura | tem | Constitutive | Infraestrutura | Usuário |
| Infraestrutura | é_a_atividade_executada_em | Telic | Atividade | Infraestrutura |
| Ingredientes | é_feito_de | Constitutive | Produto | Material |
| Inovar | criado_por | Agentive | Nova_ideia | Pensador |
| Parentesco | parentesco | Constitutive | Ego | Alter |
| Parte_elemento | tem_como_parte | Constitutive | Substância | Elemento |
| Parte_interior_exterior | tem_como_parte | Constitutive | Todo | Parte |
| Parte_todo | tem_como_parte | Constitutive | Todo | Parte |
| Pessoas_por_origem | tem_origem | Constitutive | Pessoa | Origem |
| Pessoas_por_religião | é_um_seguidor_de | Constitutive | Pessoa | Religião |
| Relação | relacionado_a | Constitutive | Entidade_1 | Entidade_2 |
| Relação_condição_sintoma | tem | Constitutive | Condição_em_saúde | Sintoma |
| Residência | tem_como_residente | Constitutive | Local | Residente |
| Resolver_problema | resolvido_por | Agentive | Problema | Agente |
| Subpartes_de_prédios | tem_como_parte_predial | Constitutive | Todo | Parte |
| Tipo | tipo_de | Formal | Subtipo | Categoria |
| Usar | usa_para | Telic | Agente | Finalidade |
| Usar_recurso | usa | Constitutive | Agente | Recurso |
| Usar_recurso | usado_por | Telic | Recurso | Agente |
| Vício | vício_de | Telic | Vício | Viciado |

### All SIMPLE Micro-Frames Under Analysis

| Relation Name | Qualia Type | SIMPLE Example | Status |
|---------------|-------------|----------------|--------|
| AffectedBy | Agentive | Climate :: deforestation | Under analysis |
| AgentiveExperience | Agentive | fear :: feel | Under analysis |
| AgentiveProg | Agentive | Pedestrian :: walk | Under analysis |
| ResultOf | Agentive | Loss :: loose | Under analysis |
| Source | Agentive | Law :: society | Under analysis |
| DerivedFrom | Agentive | Petrol :: oil | Under analysis |
| HasAsMember | Constitutive | Flock :: bird | Under analysis |
| HasAsPart | Constitutive | Airplane :: wing | Under analysis |
| Instrument | Constitutive | Ski :: ski | Under analysis |
| ResultingState | Constitutive | die :: died | Under analysis |
| TypicalLocation | Constitutive | oasis :: desert | Under analysis |
| Affects | Constitutive | heat :: temperature | Under analysis |
| Concerns | Constitutive | Hepatitis :: liver | Under analysis |
| Contains | Constitutive | Book :: information | Under analysis |
| HasAsColour | Constitutive | Apple :: red | Under analysis |
| HasAsEffect | Constitutive | Tempestade :: trovão | Under analysis |
| HasAsProperty | Constitutive | intelligent :: Intelligence | Under analysis |
| MeasuredBy | Constitutive | Temperature :: degree | Under analysis |
| PropertyOf | Constitutive | Intelligence :: intelligent | Under analysis |
| Quantifies | Constitutive | bottle :: liquid | Under analysis |
| Regulates | Constitutive | Rule :: play | Under analysis |
| SuccessorOf | Constitutive | Two :: one | Under analysis |
| TypicalOf | Constitutive | measles :: child | Under analysis |
| IndirectTelic | Telic | eye :: see | Under analysis |
| UsedAs | Telic | wood :: material | Under analysis |
| UsedAgainst | Telic | Quimioterapy :: cancer | Under analysis |

---

## Appendix: Glossary

**Agentive Qualia**: Relations concerning the origin, creation, or coming into being of an entity

**Arity**: The number of Frame Elements in a frame; micro-frames always have arity = 2

**Background Frame**: In TQR, the frame that provides semantic structure to a qualia relation; becomes the micro-frame itself in the new architecture

**Constitutive Qualia**: Relations concerning the internal constitution, parts, or inherent properties of an entity

**FE (Frame Element)**: A typed slot in a frame representing a participant, property, or circumstance

**Formal Qualia**: Relations concerning taxonomic classification and distinguishing characteristics

**Host Frame**: The frame containing FEs that are related via a micro-frame (for intra-frame relations); NULL for inter-frame relations

**Inter-Frame Relation**: A relation connecting FEs from different frames, typically Target FEs

**Intra-Frame Relation**: A relation connecting FEs within the same frame

**LU (Lexical Unit)**: A pairing of a lemma with a frame; in frame-native architecture, LUs are themselves frames

**Micro-Frame**: A binary relation frame (arity = 2) that defines connections between Frame Elements

**Qualia Structure**: The multi-dimensional characterization of lexical meaning via four qualia roles (from Generative Lexicon Theory)

**Target FE**: A special Frame Element representing what a frame is fundamentally about; every frame has exactly one Target FE

**Telic Qualia**: Relations concerning the purpose, function, or goal of an entity

**TQR (Ternary Qualia Relations)**: The previous system in FNBr where relations between LUs were mediated by background frames

---

## Appendix: Comparison with Related Approaches

### TQR vs. Micro-Frames

| Aspect | TQR (Old) | Micro-Frames (New) |
|--------|-----------|-------------------|
| **Conceptual model** | Background frames mediate LU relations | Relations ARE frames |
| **Relation storage** | Separate EntityRelation table | Unified fe_relation table |
| **Scope** | Primarily LU-to-LU | All FE-to-FE (intra-frame and inter-frame) |
| **Frame-to-frame relations** | Separate mechanism | Same mechanism (via Target FEs) |
| **Extensibility** | Add to EntityRelation types | Add new micro-frames |
| **Uniformity** | Mixed levels | Complete uniformity |

### Micro-Frames vs. Framester

| Aspect | Framester | FNBr Micro-Frames |
|--------|-----------|-------------------|
| **Architecture** | Hub with mappings to multiple ontologies | Direct DUL integration |
| **Representation** | Heterogeneous (multiple formalisms) | Frame-native (everything is frames) |
| **Relations** | Various mechanisms | Single micro-frame mechanism |
| **Complexity** | Translation layers needed | No translation needed |
| **Focus** | Interoperability across resources | Deep semantic integration |

### Micro-Frames vs. Traditional Ontologies (OWL)

| Aspect | OWL Ontologies | FNBr Micro-Frames |
|--------|----------------|-------------------|
| **Relations** | Binary properties (requires reification for n-ary) | Native binary via micro-frames |
| **Linguistic grounding** | Limited | Rich corpus-based grounding |
| **Reasoning** | Description Logic | Graph-based + frame semantics |
| **Standards** | Semantic Web standards | FrameNet + DUL standards |
| **Usage** | Formal reasoning, inference | NLU, semantic parsing, annotation |

---

## Appendix: Future Directions

### 1. Complete SIMPLE Integration

**Goal**: Implement all 26 SIMPLE micro-frames currently under analysis

**Tasks**:
- Define background frames for each SIMPLE relation
- Create frame definitions and constraints
- Populate with example LU relations from corpora
- Validate against SIMPLE specifications

**Timeline**: Phase 1 implementation

---

### 2. Cross-Linguistic Expansion

**Goal**: Extend micro-frames to multiple languages beyond Portuguese

**Tasks**:
- Document micro-frame applicability across languages
- Identify language-specific micro-frames
- Create translation equivalence micro-frames
- Validate with multilingual corpora

**Timeline**: Phase 2 implementation

---

### 3. Automatic Relation Discovery

**Goal**: Use NLP techniques to discover and suggest new micro-frame relations

**Tasks**:
- Develop pattern mining algorithms for corpus data
- Implement relation extraction using contextualized embeddings
- Create validation workflow for proposed relations
- Integration with annotation tools

**Timeline**: Research phase

---

### 4. Ontology Alignment

**Goal**: Align FNBr micro-frames with other lexical resources

**Tasks**:
- Map to WordNet relations (hypernym, meronym, etc.)
- Align with VerbNet thematic roles
- Connect to PropBank argument structures
- Link to BabelNet synsets

**Timeline**: Phase 3 implementation

---

### 5. Application Development

**Goal**: Leverage micro-frames for NLP applications

**Applications**:
- Enhanced semantic role labeling
- Relation extraction for knowledge graphs
- Question answering with inference
- Machine translation with semantic awareness
- Text entailment recognition

**Timeline**: Ongoing

---

## Appendix: Contact and Contribution

### FrameNet Brasil Team

**Principal Investigators**:
- Prof. Dr. Tiago Torrent (UFJF)
- Prof. Dr. Ely Matos (UFJF)

**Website**: [https://framenetbr.ufjf.br/](https://framenetbr.ufjf.br/)

**GitHub**: [https://github.com/FrameNetBrasil](https://github.com/FrameNetBrasil)

**Documentation**: [https://elymatos.github.io/fn3/](https://elymatos.github.io/fn3/)

### How to Contribute

1. **Report Issues**: Use GitHub issues to report errors or inconsistencies in micro-frame definitions

2. **Propose New Micro-Frames**: Submit proposals with:
    - Qualia type
    - Frame Elements definition
    - Semantic description
    - Examples from corpora
    - Justification for inclusion

3. **Corpus Annotation**: Contribute annotated examples of micro-frame relations in use

4. **Cross-Linguistic Data**: Provide examples and validation for languages beyond Portuguese

5. **Application Development**: Share applications leveraging micro-frames

---

## Appendix: Version History

### Version 1.0 (October 21, 2025)

**Initial Release**
- Complete documentation of 46 implemented micro-frames
- Documentation of 26 SIMPLE micro-frames under analysis
- Migration guide from TQR to micro-frames
- Database schema specification
- Usage examples and reference tables

**Contributors**:
- FrameNet Brasil Team
- Claude AI (Documentation assistance)

---

## Document Information

**Filename**: `Micro-Frames_Documentation_FNBr_v1.0.md`

**Format**: Markdown

**License**: CC BY-NC 4.0 (Attribution-NonCommercial)

**Citation**:
```
FrameNet Brasil Team (2025). Micro-Frames Documentation for FrameNet Brasil, 
Version 1.0. Federal University of Juiz de Fora, Brazil.
```

**Last Updated**: October 21, 2025

**Document Size**: ~50 pages (when converted to PDF)

---

## Notes for Implementation

### Priority Order

1. **Phase 0: Database Migration** (Immediate)
    - Migrate existing TQR to micro-frame schema
    - Validate data integrity
    - Test query performance
    - Update web tool interfaces

2. **Phase 1: SIMPLE Integration** (3-6 months)
    - Implement highest priority SIMPLE micro-frames
    - Focus on Agentive: AffectedBy, ResultOf, Source
    - Focus on Constitutive: HasAsPart, Instrument, ResultingState
    - Focus on Telic: IndirectTelic

3. **Phase 2: Validation** (6-12 months)
    - Corpus-based validation of all micro-frames
    - Inter-annotator agreement studies
    - Cross-linguistic validation
    - Application-based evaluation

4. **Phase 3: Enhancement** (12+ months)
    - Additional micro-frames based on corpus evidence
    - Advanced inference mechanisms
    - Integration with external resources
    - Scaling to production

### Testing Requirements

**Unit Tests**:
- Micro-frame structure validation
- FE relation creation and queries
- Target FE uniqueness constraints
- Arity constraints for micro-frames

**Integration Tests**:
- TQR to micro-frame migration completeness
- Query equivalence (old vs. new)
- Web tool functionality
- API compatibility

**Performance Tests**:
- Query performance benchmarks
- Large-scale relation traversal
- Neo4j sync performance
- Annotation tool responsiveness

---

## Section 8: DUL Ontology Properties as Micro-Frames

With the integration of the DUL (DOLCE+DnS Ultralite) ontology into FrameNet Brasil's frame-native architecture, all DUL object properties must be represented as micro-frames. This section documents the complete set of DUL properties transformed into micro-frames.

### 8.1 Core Association Properties

These micro-frames define fundamental relationships in DUL.

---

#### 8.1.1 associatedWith

**Type**: DUL Property (Top-level)  
**Background Frame**: *DUL_Association*  
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#associatedWith`

**Frame Elements**:
- **FE1**: Entity_1 (any DUL Entity)
- **FE2**: Entity_2 (any DUL Entity)

**Semantics**: Entity_1 is associated with Entity_2 in any way

**DUL Definition**: A catch-all property for any association between entities. This is the top-level property from which all other DUL properties are typically sub-properties.

**Note**: This is an abstract property; more specific sub-properties should be used when possible

**Status**: DUL core property

---

### 8.2 Participation Properties

These micro-frames define relationships between events and their participants.

---

#### 8.2.1 hasParticipant

**Type**: DUL Property  
**Background Frame**: *DUL_Participation*  
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#hasParticipant`

**Frame Elements**:
- **FE1**: Event (DUL Event)
- **FE2**: Participant (DUL Object)

**Semantics**: Event has Participant as a participant

**DUL Definition**: A relation between an Event and an Object that participates in it, e.g. 'a cook, some sugar, flour, etc. are all present in the cooking of a cake'

**Inverse**: isParticipantIn

**Examples**:
```
Cooking_event.Target --hasParticipant--> Cook.Target
Cooking_event.Target --hasParticipant--> Sugar.Target
```

**Status**: DUL core property

---

#### 8.2.2 isParticipantIn

**Type**: DUL Property  
**Background Frame**: *DUL_Participation*  
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#isParticipantIn`

**Frame Elements**:
- **FE1**: Participant (DUL Object)
- **FE2**: Event (DUL Event)

**Semantics**: Participant participates in Event

**DUL Definition**: Inverse of hasParticipant

**Inverse**: hasParticipant

**Examples**:
```
Cook.Target --isParticipantIn--> Cooking_event.Target
```

**Status**: DUL core property

---

### 8.3 Mereological Properties (Part-Whole)

These micro-frames define part-whole relationships.

---

#### 8.3.1 hasPart

**Type**: DUL Property  
**Background Frame**: *DUL_Parthood*  
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#hasPart`

**Frame Elements**:
- **FE1**: Whole (DUL Entity)
- **FE2**: Part (DUL Entity)

**Semantics**: Whole has Part as a component

**DUL Definition**: A relation between any entities, e.g. 'the human body has a brain as part'. Parthood is assumed as reflexive, transitive, and antisymmetric.

**Properties**: Reflexive, Transitive, Antisymmetric

**Inverse**: isPartOf

**Examples**:
```
Human_body.Target --hasPart--> Brain.Target
Car.Target --hasPart--> Engine.Target
```

**Status**: DUL core property

---

#### 8.3.2 isPartOf

**Type**: DUL Property  
**Background Frame**: *DUL_Parthood*  
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#isPartOf`

**Frame Elements**:
- **FE1**: Part (DUL Entity)
- **FE2**: Whole (DUL Entity)

**Semantics**: Part is a component of Whole

**DUL Definition**: Inverse of hasPart

**Properties**: Reflexive, Transitive

**Inverse**: hasPart

**Examples**:
```
Brain.Target --isPartOf--> Human_body.Target
```

**Status**: DUL core property

---

#### 8.3.3 hasProperPart

**Type**: DUL Property  
**Background Frame**: *DUL_Proper_Parthood*  
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#hasProperPart`

**Frame Elements**:
- **FE1**: Whole (DUL Entity)
- **FE2**: Proper_part (DUL Entity)

**Semantics**: Whole has Proper_part as a proper (non-reflexive) part

**DUL Definition**: A relation between any entities, where the part is distinct from the whole. Proper parthood is irreflexive, asymmetric, and transitive.

**Properties**: Irreflexive, Asymmetric, Transitive

**Note**: Sub-property of hasPart

**Examples**:
```
Human_body.Target --hasProperPart--> Arm.Target
(but NOT: Human_body.Target --hasProperPart--> Human_body.Target)
```

**Status**: DUL core property

---

#### 8.3.4 hasComponent

**Type**: DUL Property  
**Background Frame**: *DUL_Component*  
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#hasComponent`

**Frame Elements**:
- **FE1**: Whole (DUL Entity)
- **FE2**: Component (DUL Entity)

**Semantics**: Whole has Component as a functional/structural component

**DUL Definition**: A relation between any entities that have a component, e.g. 'the car has an engine as component'

**Note**: Sub-property of hasPart, emphasizes functional/structural role

**Inverse**: isComponentOf

**Status**: DUL core property

---

#### 8.3.5 isComponentOf

**Type**: DUL Property  
**Background Frame**: *DUL_Component*  
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#isComponentOf`

**Frame Elements**:
- **FE1**: Component (DUL Entity)
- **FE2**: Whole (DUL Entity)

**Semantics**: Component is a functional/structural component of Whole

**DUL Definition**: Inverse of hasComponent

**Inverse**: hasComponent

**Status**: DUL core property

---

#### 8.3.6 hasConstituent

**Type**: DUL Property  
**Background Frame**: *DUL_Constitution*  
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#hasConstituent`

**Frame Elements**:
- **FE1**: Whole (DUL Entity)
- **FE2**: Constituent (DUL Entity)

**Semantics**: Whole has Constituent as a material constituent

**DUL Definition**: A relation between entities, typically for material constitution

**Inverse**: isConstituentOf

**Status**: DUL core property

---

#### 8.3.7 isConstituentOf

**Type**: DUL Property  
**Background Frame**: *DUL_Constitution*  
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#isConstituentOf`

**Frame Elements**:
- **FE1**: Constituent (DUL Entity)
- **FE2**: Whole (DUL Entity)

**Semantics**: Constituent materially constitutes Whole

**DUL Definition**: Inverse of hasConstituent

**Inverse**: hasConstituent

**Status**: DUL core property

---

### 8.4 Collection and Membership Properties

---

#### 8.4.1 hasMember

**Type**: DUL Property  
**Background Frame**: *DUL_Membership*  
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#hasMember`

**Frame Elements**:
- **FE1**: Collection (DUL Collection)
- **FE2**: Member (DUL Entity)

**Semantics**: Collection has Member as a member

**DUL Definition**: A relation between collections and their members, e.g. 'the flock has several birds as members'

**Inverse**: isMemberOf

**Examples**:
```
Orchestra.Target --hasMember--> Musician.Target
Team.Target --hasMember--> Player.Target
```

**Status**: DUL core property

---

#### 8.4.2 isMemberOf

**Type**: DUL Property  
**Background Frame**: *DUL_Membership*  
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#isMemberOf`

**Frame Elements**:
- **FE1**: Member (DUL Entity)
- **FE2**: Collection (DUL Collection)

**Semantics**: Member belongs to Collection

**DUL Definition**: Inverse of hasMember

**Inverse**: hasMember

**Status**: DUL core property

---

### 8.5 Quality and Region Properties

---

#### 8.5.1 hasQuality

**Type**: DUL Property  
**Background Frame**: *DUL_Quality_Attribution*  
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#hasQuality`

**Frame Elements**:
- **FE1**: Entity (DUL Entity)
- **FE2**: Quality (DUL Quality)

**Semantics**: Entity has Quality as a quality/attribute

**DUL Definition**: A relation between entities and qualities, e.g. 'John has the quality of being tall'

**Inverse**: isQualityOf

**Examples**:
```
Person.Target --hasQuality--> Height.Target
Object.Target --hasQuality--> Color.Target
```

**Status**: DUL core property

---

#### 8.5.2 isQualityOf

**Type**: DUL Property  
**Background Frame**: *DUL_Quality_Attribution*  
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#isQualityOf`

**Frame Elements**:
- **FE1**: Quality (DUL Quality)
- **FE2**: Entity (DUL Entity)

**Semantics**: Quality is an attribute of Entity

**DUL Definition**: Inverse of hasQuality

**Inverse**: hasQuality

**Status**: DUL core property

---

#### 8.5.3 hasRegion

**Type**: DUL Property  
**Background Frame**: *DUL_Region_Attribution*  
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#hasRegion`

**Frame Elements**:
- **FE1**: Entity (DUL Entity)
- **FE2**: Region (DUL Region)

**Semantics**: Entity is located at or has value in Region

**DUL Definition**: A relation between entities and regions, e.g. 'the whale has been localized at 34 degrees E, 20 degrees S'

**Inverse**: isRegionFor

**Examples**:
```
Whale.Target --hasRegion--> Geographic_coordinates.Target
Temperature_quality.Target --hasRegion--> Temperature_region.Target
```

**Status**: DUL core property

---

#### 8.5.4 isRegionFor

**Type**: DUL Property  
**Background Frame**: *DUL_Region_Attribution*  
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#isRegionFor`

**Frame Elements**:
- **FE1**: Region (DUL Region)
- **FE2**: Entity (DUL Entity)

**Semantics**: Region is a region for Entity

**DUL Definition**: Inverse of hasRegion

**Inverse**: hasRegion

**Status**: DUL core property

---

### 8.6 Spatial Properties

---

#### 8.6.1 hasLocation

**Type**: DUL Property  
**Background Frame**: *DUL_Location*  
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#hasLocation`

**Frame Elements**:
- **FE1**: Entity (DUL Entity)
- **FE2**: Location (DUL Entity)

**Semantics**: Entity is located at Location

**DUL Definition**: A generic, relative location relation, holding between any entities. E.g. 'Rome is located in Italy', 'the cat is on the mat', etc.

**Inverse**: isLocationOf

**Examples**:
```
Rome.Target --hasLocation--> Italy.Target
Cat.Target --hasLocation--> Mat.Target
```

**Status**: DUL core property

---

#### 8.6.2 isLocationOf

**Type**: DUL Property  
**Background Frame**: *DUL_Location*  
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#isLocationOf`

**Frame Elements**:
- **FE1**: Location (DUL Entity)
- **FE2**: Entity (DUL Entity)

**Semantics**: Location is the location of Entity

**DUL Definition**: Inverse of hasLocation

**Inverse**: hasLocation

**Status**: DUL core property

---

#### 8.6.3 overlaps

**Type**: DUL Property  
**Background Frame**: *DUL_Overlap*  
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#overlaps`

**Frame Elements**:
- **FE1**: Entity_1 (DUL Entity)
- **FE2**: Entity_2 (DUL Entity)

**Semantics**: Entity_1 spatially or temporally overlaps with Entity_2

**DUL Definition**: A relation of spatial or temporal overlap between entities

**Properties**: Symmetric

**Examples**:
```
Meeting1.Target --overlaps--> Meeting2.Target
Region1.Target --overlaps--> Region2.Target
```

**Status**: DUL core property

---

#### 8.6.4 hasCommonBoundary

**Type**: DUL Property  
**Background Frame**: *DUL_Common_Boundary*  
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#hasCommonBoundary`

**Frame Elements**:
- **FE1**: Entity_1 (DUL Entity)
- **FE2**: Entity_2 (DUL Entity)

**Semantics**: Entity_1 shares a boundary with Entity_2

**DUL Definition**: A relation between entities that share a common boundary

**Properties**: Symmetric

**Examples**:
```
France.Target --hasCommonBoundary--> Germany.Target
```

**Status**: DUL core property

---

#### 8.6.5 nearTo

**Type**: DUL Property  
**Background Frame**: *DUL_Proximity*  
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#nearTo`

**Frame Elements**:
- **FE1**: Entity_1 (DUL Entity)
- **FE2**: Entity_2 (DUL Entity)

**Semantics**: Entity_1 is spatially near to Entity_2

**DUL Definition**: A spatial proximity relation

**Properties**: Symmetric

**Examples**:
```
House.Target --nearTo--> School.Target
```

**Status**: DUL core property

---

#### 8.6.6 farFrom

**Type**: DUL Property  
**Background Frame**: *DUL_Distance*  
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#farFrom`

**Frame Elements**:
- **FE1**: Entity_1 (DUL Entity)
- **FE2**: Entity_2 (DUL Entity)

**Semantics**: Entity_1 is spatially far from Entity_2

**DUL Definition**: A spatial distance relation

**Properties**: Symmetric

**Examples**:
```
Earth.Target --farFrom--> Mars.Target
```

**Status**: DUL core property

---

### 8.7 Temporal Properties

---

#### 8.7.1 hasTimeInterval

**Type**: DUL Property  
**Background Frame**: *DUL_Temporal_Extension*  
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#hasTimeInterval`

**Frame Elements**:
- **FE1**: Entity (DUL Entity)
- **FE2**: Time_interval (DUL TimeInterval)

**Semantics**: Entity occurs during or is associated with Time_interval

**DUL Definition**: A relation between entities and time intervals

**Inverse**: isTimeIntervalOf

**Examples**:
```
Event.Target --hasTimeInterval--> TimeInterval.Target
Meeting.Target --hasTimeInterval--> Morning_interval.Target
```

**Status**: DUL core property

---

#### 8.7.2 isObservableAt

**Type**: DUL Property  
**Background Frame**: *DUL_Observation_Time*  
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#isObservableAt`

**Frame Elements**:
- **FE1**: Entity (DUL Entity)
- **FE2**: Time_interval (DUL TimeInterval)

**Semantics**: Entity can be observed at Time_interval

**DUL Definition**: A relation between entities and the time when they can be observed

**Inverse**: isTimeOfObservationOf

**Status**: DUL core property

---

#### 8.7.3 precedes

**Type**: DUL Property  
**Background Frame**: *DUL_Temporal_Precedence*  
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#precedes`

**Frame Elements**:
- **FE1**: Earlier_entity (DUL Entity)
- **FE2**: Later_entity (DUL Entity)

**Semantics**: Earlier_entity temporally precedes Later_entity

**DUL Definition**: A temporal precedence relation

**Properties**: Transitive

**Inverse**: follows

**Examples**:
```
Event1.Target --precedes--> Event2.Target
Morning.Target --precedes--> Afternoon.Target
```

**Status**: DUL core property

---

#### 8.7.4 follows

**Type**: DUL Property  
**Background Frame**: *DUL_Temporal_Succession*  
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#follows`

**Frame Elements**:
- **FE1**: Later_entity (DUL Entity)
- **FE2**: Earlier_entity (DUL Entity)

**Semantics**: Later_entity temporally follows Earlier_entity

**DUL Definition**: Inverse of precedes

**Properties**: Transitive

**Inverse**: precedes

**Status**: DUL core property

---

#### 8.7.5 directlyPrecedes

**Type**: DUL Property  
**Background Frame**: *DUL_Direct_Precedence*  
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#directlyPrecedes`

**Frame Elements**:
- **FE1**: Earlier_entity (DUL Entity)
- **FE2**: Later_entity (DUL Entity)

**Semantics**: Earlier_entity immediately precedes Later_entity with no intervening entity

**DUL Definition**: A direct temporal precedence relation

**Note**: Sub-property of precedes

**Inverse**: directlyFollows

**Examples**:
```
Step1.Target --directlyPrecedes--> Step2.Target
```

**Status**: DUL core property

---

#### 8.7.6 directlyFollows

**Type**: DUL Property  
**Background Frame**: *DUL_Direct_Succession*  
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#directlyFollows`

**Frame Elements**:
- **FE1**: Later_entity (DUL Entity)
- **FE2**: Earlier_entity (DUL Entity)

**Semantics**: Later_entity immediately follows Earlier_entity with no intervening entity

**DUL Definition**: Inverse of directlyPrecedes

**Note**: Sub-property of follows

**Inverse**: directlyPrecedes

**Status**: DUL core property

---

### 8.8 Description and Situation Properties (DnS Pattern)

These micro-frames implement the Descriptions and Situations (DnS) pattern, which is central to DUL.

---

#### 8.8.1 defines

**Type**: DUL Property  
**Background Frame**: *DUL_Definition*  
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#defines`

**Frame Elements**:
- **FE1**: Description (DUL Description)
- **FE2**: Concept (DUL Concept)

**Semantics**: Description defines Concept

**DUL Definition**: A relation between a Description and a Concept that it defines

**Inverse**: isDefinedIn

**Examples**:
```
Traffic_law.Target --defines--> Driver_role.Target
Recipe.Target --defines--> Cooking_task.Target
```

**Status**: DUL core property

---

#### 8.8.2 isDefinedIn

**Type**: DUL Property  
**Background Frame**: *DUL_Definition*  
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#isDefinedIn`

**Frame Elements**:
- **FE1**: Concept (DUL Concept)
- **FE2**: Description (DUL Description)

**Semantics**: Concept is defined in Description

**DUL Definition**: Inverse of defines

**Inverse**: defines

**Status**: DUL core property

---

#### 8.8.3 satisfies

**Type**: DUL Property  
**Background Frame**: *DUL_Satisfaction*  
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#satisfies`

**Frame Elements**:
- **FE1**: Situation (DUL Situation)
- **FE2**: Description (DUL Description)

**Semantics**: Situation satisfies (instantiates/realizes) Description

**DUL Definition**: A relation between a Situation and a Description, where the situation is a realization of the description

**Inverse**: isSatisfiedBy

**Examples**:
```
Actual_trip.Target --satisfies--> Travel_plan.Target
Cooking_situation.Target --satisfies--> Recipe.Target
```

**Status**: DUL core property

---

#### 8.8.4 isSatisfiedBy

**Type**: DUL Property  
**Background Frame**: *DUL_Satisfaction*  
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#isSatisfiedBy`

**Frame Elements**:
- **FE1**: Description (DUL Description)
- **FE2**: Situation (DUL Situation)

**Semantics**: Description is satisfied by Situation

**DUL Definition**: Inverse of satisfies

**Inverse**: satisfies

**Status**: DUL core property

---

#### 8.8.5 describes

**Type**: DUL Property  
**Background Frame**: *DUL_Description_Relation*  
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#describes`

**Frame Elements**:
- **FE1**: Description (DUL Description)
- **FE2**: Entity (DUL Entity)

**Semantics**: Description describes Entity

**DUL Definition**: A relation between a description and any entity it describes

**Inverse**: isDescribedBy

**Examples**:
```
Biography.Target --describes--> Person.Target
Manual.Target --describes--> Machine.Target
```

**Status**: DUL core property

---

#### 8.8.6 isDescribedBy

**Type**: DUL Property  
**Background Frame**: *DUL_Description_Relation*  
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#isDescribedBy`

**Frame Elements**:
- **FE1**: Entity (DUL Entity)
- **FE2**: Description (DUL Description)

**Semantics**: Entity is described by Description

**DUL Definition**: Inverse of describes

**Inverse**: describes

**Status**: DUL core property

---

#### 8.8.7 hasSetting

**Type**: DUL Property  
**Background Frame**: *DUL_Setting*  
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#hasSetting`

**Frame Elements**:
- **FE1**: Entity (DUL Entity)
- **FE2**: Situation (DUL Situation)

**Semantics**: Entity is framed within Situation

**DUL Definition**: A relation between entities and situations that provide the context for them

**Inverse**: isSettingFor

**Examples**:
```
Event.Target --hasSetting--> Context_situation.Target
```

**Status**: DUL core property

---

#### 8.8.8 isSettingFor

**Type**: DUL Property  
**Background Frame**: *DUL_Setting*  
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#isSettingFor`

**Frame Elements**:
- **FE1**: Situation (DUL Situation)
- **FE2**: Entity (DUL Entity)

**Semantics**: Situation provides the context for Entity

**DUL Definition**: Inverse of hasSetting

**Inverse**: hasSetting

**Status**: DUL core property

---

### 8.9 Classification and Conceptualization Properties

---

#### 8.9.1 classifies

**Type**: DUL Property  
**Background Frame**: *DUL_Classification*  
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#classifies`

**Frame Elements**:
- **FE1**: Concept (DUL Concept)
- **FE2**: Entity (DUL Entity)

**Semantics**: Concept classifies Entity

**DUL Definition**: A relation between a concept and an entity that it classifies

**Inverse**: isClassifiedBy

**Examples**:
```
Driver_role.Target --classifies--> John.Target
Student_role.Target --classifies--> Mary.Target
```

**Status**: DUL core property

---

#### 8.9.2 isClassifiedBy

**Type**: DUL Property  
**Background Frame**: *DUL_Classification*  
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#isClassifiedBy`

**Frame Elements**:
- **FE1**: Entity (DUL Entity)
- **FE2**: Concept (DUL Concept)

**Semantics**: Entity is classified by Concept

**DUL Definition**: Inverse of classifies

**Inverse**: classifies

**Status**: DUL core property

---

#### 8.9.3 conceptualizes

**Type**: DUL Property  
**Background Frame**: *DUL_Conceptualization*  
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#conceptualizes`

**Frame Elements**:
- **FE1**: Social_object (DUL SocialObject)
- **FE2**: Entity (DUL Entity)

**Semantics**: Social_object conceptualizes Entity

**DUL Definition**: A relation between social objects (e.g. concepts, norms) and entities they conceptualize

**Inverse**: isConceptualizedBy

**Examples**:
```
Traffic_law.Target --conceptualizes--> Driving_behavior.Target
```

**Status**: DUL core property

---

#### 8.9.4 isConceptualizedBy

**Type**: DUL Property  
**Background Frame**: *DUL_Conceptualization*  
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#isConceptualizedBy`

**Frame Elements**:
- **FE1**: Entity (DUL Entity)
- **FE2**: Social_object (DUL SocialObject)

**Semantics**: Entity is conceptualized by Social_object

**DUL Definition**: Inverse of conceptualizes

**Inverse**: conceptualizes

**Status**: DUL core property

---

### 8.10 Role and Task Properties

---
### 8.10 Role and Task Properties

---

#### 8.10.1 hasRole

**Type**: DUL Property  
**Background Frame**: *DUL_Role_Attribution*  
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#hasRole`

**Frame Elements**:
- **FE1**: Entity (DUL Object)
- **FE2**: Role (DUL Role)

**Semantics**: Entity has Role in some context

**DUL Definition**: A relation between objects and roles, e.g. 'John has the role of student'

**Inverse**: isRoleOf

**Examples**:
```
John.Target --hasRole--> Student.Target
Mary.Target --hasRole--> Teacher.Target
```

**Status**: DUL core property

---

#### 8.10.2 isRoleOf

**Type**: DUL Property  
**Background Frame**: *DUL_Role_Attribution*  
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#isRoleOf`

**Frame Elements**:
- **FE1**: Role (DUL Role)
- **FE2**: Entity (DUL Object)

**Semantics**: Role is a role of Entity

**DUL Definition**: Inverse of hasRole

**Inverse**: hasRole

**Status**: DUL core property

---

#### 8.10.3 hasTask

**Type**: DUL Property  
**Background Frame**: *DUL_Task_Association*  
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#hasTask`

**Frame Elements**:
- **FE1**: Role (DUL Role)
- **FE2**: Task (DUL Task)

**Semantics**: Role has Task as an associated task

**DUL Definition**: A relation between roles and tasks, e.g. 'students have the duty of giving exams'

**Inverse**: isTaskOf

**Examples**:
```
Student_role.Target --hasTask--> Taking_exams.Target
Teacher_role.Target --hasTask--> Grading.Target
```

**Status**: DUL core property

---

#### 8.10.4 isTaskOf

**Type**: DUL Property  
**Background Frame**: *DUL_Task_Association*  
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#isTaskOf`

**Frame Elements**:
- **FE1**: Task (DUL Task)
- **FE2**: Role (DUL Role)

**Semantics**: Task is associated with Role

**DUL Definition**: Inverse of hasTask

**Inverse**: hasTask

**Status**: DUL core property

---

#### 8.10.5 executesTask

**Type**: DUL Property  
**Background Frame**: *DUL_Task_Execution*  
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#executesTask`

**Frame Elements**:
- **FE1**: Action (DUL Action)
- **FE2**: Task (DUL Task)

**Semantics**: Action executes Task

**DUL Definition**: A relation between actions and tasks, e.g. 'putting water in a pot and heating it' executes the task 'boiling'

**Inverse**: isExecutedBy

**Examples**:
```
Boiling_action.Target --executesTask--> Boiling_task.Target
```

**Status**: DUL core property

---

#### 8.10.6 definesRole

**Type**: DUL Property  
**Background Frame**: *DUL_Role_Definition*  
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#definesRole`

**Frame Elements**:
- **FE1**: Description (DUL Description)
- **FE2**: Role (DUL Role)

**Semantics**: Description defines Role

**DUL Definition**: A relation between descriptions and the roles they define

**Note**: Sub-property of defines

**Examples**:
```
Traffic_law.Target --definesRole--> Driver.Target
```

**Status**: DUL core property

---

#### 8.10.7 definesTask

**Type**: DUL Property  
**Background Frame**: *DUL_Task_Definition*  
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#definesTask`

**Frame Elements**:
- **FE1**: Description (DUL Description)
- **FE2**: Task (DUL Task)

**Semantics**: Description defines Task

**DUL Definition**: A relation between descriptions and the tasks they define

**Note**: Sub-property of defines

**Examples**:
```
Recipe.Target --definesTask--> Cooking_task.Target
```

**Status**: DUL core property

---

### 8.11 Parameter and Constraint Properties

---

#### 8.11.1 hasParameter

**Type**: DUL Property  
**Background Frame**: *DUL_Parameterization*  
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#hasParameter`

**Frame Elements**:
- **FE1**: Concept (DUL Concept)
- **FE2**: Parameter (DUL Parameter)

**Semantics**: Concept has Parameter as a constraining parameter

**DUL Definition**: A relation between concepts and parameters, e.g. a WheelDriver Role has a MinimumAge parameter on the Amount 16

**Inverse**: isParameterFor

**Examples**:
```
Driver_role.Target --hasParameter--> Minimum_age_parameter.Target
```

**Status**: DUL core property

---

#### 8.11.2 isParameterFor

**Type**: DUL Property  
**Background Frame**: *DUL_Parameterization*  
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#isParameterFor`

**Frame Elements**:
- **FE1**: Parameter (DUL Parameter)
- **FE2**: Concept (DUL Concept)

**Semantics**: Parameter constrains Concept

**DUL Definition**: Inverse of hasParameter

**Inverse**: hasParameter

**Status**: DUL core property

---

#### 8.11.3 hasConstraint

**Type**: DUL Property  
**Background Frame**: *DUL_Constraint*  
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#hasConstraint`

**Frame Elements**:
- **FE1**: Entity (DUL Entity)
- **FE2**: Parameter (DUL Parameter)

**Semantics**: Entity has Parameter as a constraint

**DUL Definition**: A relation between entities and parameters that constrain them

**Inverse**: isConstraintFor

**Examples**:
```
Event.Target --hasConstraint--> Time_parameter.Target
```

**Status**: DUL core property

---

#### 8.11.4 isConstraintFor

**Type**: DUL Property  
**Background Frame**: *DUL_Constraint*  
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#isConstraintFor`

**Frame Elements**:
- **FE1**: Parameter (DUL Parameter)
- **FE2**: Entity (DUL Entity)

**Semantics**: Parameter constrains Entity

**DUL Definition**: Inverse of hasConstraint

**Inverse**: hasConstraint

**Status**: DUL core property

---

### 8.12 Information and Expression Properties

---

#### 8.12.1 expresses

**Type**: DUL Property  
**Background Frame**: *DUL_Expression*  
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#expresses`

**Frame Elements**:
- **FE1**: Information_object (DUL InformationObject)
- **FE2**: Social_object (DUL SocialObject)

**Semantics**: Information_object expresses Social_object as its meaning

**DUL Definition**: A relation between information objects (expressions) and social objects (meanings), e.g. 'A Beehive is a structure in which bees are kept' expresses the concept Beehive

**Inverse**: isExpressedBy

**Examples**:
```
Dictionary_entry.Target --expresses--> Concept.Target
Text.Target --expresses--> Meaning.Target
```

**Status**: DUL core property

---

#### 8.12.2 isExpressedBy

**Type**: DUL Property  
**Background Frame**: *DUL_Expression*  
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#isExpressedBy`

**Frame Elements**:
- **FE1**: Social_object (DUL SocialObject)
- **FE2**: Information_object (DUL InformationObject)

**Semantics**: Social_object is expressed by Information_object

**DUL Definition**: Inverse of expresses

**Inverse**: expresses

**Status**: DUL core property

---

#### 8.12.3 isAbout

**Type**: DUL Property  
**Background Frame**: *DUL_Aboutness*  
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#isAbout`

**Frame Elements**:
- **FE1**: Information_object (DUL InformationObject)
- **FE2**: Entity (DUL Entity)

**Semantics**: Information_object is about Entity

**DUL Definition**: A relation between information objects and entities they refer to. E.g., the proper noun 'Leonardo da Vinci' isAbout the Person Leonardo da Vinci; the common noun 'person' isAbout the set of all persons

**Inverse**: isReferenceOf

**Examples**:
```
Biography.Target --isAbout--> Leonardo_da_Vinci.Target
Article.Target --isAbout--> Climate_change.Target
```

**Status**: DUL core property

---

#### 8.12.4 isReferenceOf

**Type**: DUL Property  
**Background Frame**: *DUL_Aboutness*  
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#isReferenceOf`

**Frame Elements**:
- **FE1**: Entity (DUL Entity)
- **FE2**: Information_object (DUL InformationObject)

**Semantics**: Entity is the reference of Information_object

**DUL Definition**: Inverse of isAbout

**Inverse**: isAbout

**Status**: DUL core property

---

#### 8.12.5 concretelyExpresses

**Type**: DUL Property  
**Background Frame**: *DUL_Concrete_Expression*  
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#concretelyExpresses`

**Frame Elements**:
- **FE1**: Information_realization (DUL InformationRealization)
- **FE2**: Information_object (DUL InformationObject)

**Semantics**: Information_realization concretely expresses Information_object

**DUL Definition**: A relation between concrete realizations and abstract information objects, e.g. a book copy expresses the abstract work

**Examples**:
```
Book_copy.Target --concretelyExpresses--> Book_work.Target
Utterance.Target --concretelyExpresses--> Sentence.Target
```

**Status**: DUL core property

---

### 8.13 Agent and Action Properties

---

#### 8.13.1 actsFor

**Type**: DUL Property  
**Background Frame**: *DUL_Agency_For*  
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#actsFor`

**Frame Elements**:
- **FE1**: Agent (DUL Agent)
- **FE2**: Social_agent (DUL SocialAgent)

**Semantics**: Agent acts on behalf of Social_agent

**DUL Definition**: The relation holding between any Agent and a SocialAgent. E.g., a university can be acted for by a department, which is acted for by physical agents

**Inverse**: actsThrough

**Examples**:
```
Department.Target --actsFor--> University.Target
Employee.Target --actsFor--> Company.Target
```

**Status**: DUL core property

---

#### 8.13.2 actsThrough

**Type**: DUL Property  
**Background Frame**: *DUL_Agency_Through*  
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#actsThrough`

**Frame Elements**:
- **FE1**: Social_agent (DUL SocialAgent)
- **FE2**: Agent (DUL Agent)

**Semantics**: Social_agent acts through Agent

**DUL Definition**: The relation holding between a SocialAgent and an Agent that acts for it

**Inverse**: actsFor

**Examples**:
```
University.Target --actsThrough--> Department.Target
```

**Status**: DUL core property

---

#### 8.13.3 includesAgent

**Type**: DUL Property  
**Background Frame**: *DUL_Agent_Inclusion*  
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#includesAgent`

**Frame Elements**:
- **FE1**: Situation (DUL Situation)
- **FE2**: Agent (DUL Agent)

**Semantics**: Situation includes Agent as a participant

**DUL Definition**: A relation between situations and agents involved in them

**Examples**:
```
Meeting_situation.Target --includesAgent--> Participant.Target
```

**Status**: DUL core property

---

#### 8.13.4 includesAction

**Type**: DUL Property  
**Background Frame**: *DUL_Action_Inclusion*  
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#includesAction`

**Frame Elements**:
- **FE1**: Situation (DUL Situation)
- **FE2**: Action (DUL Action)

**Semantics**: Situation includes Action

**DUL Definition**: A relation between situations and actions that occur in them

**Examples**:
```
Meeting_situation.Target --includesAction--> Presenting.Target
```

**Status**: DUL core property

---

#### 8.13.5 includesEvent

**Type**: DUL Property  
**Background Frame**: *DUL_Event_Inclusion*  
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#includesEvent`

**Frame Elements**:
- **FE1**: Situation (DUL Situation)
- **FE2**: Event (DUL Event)

**Semantics**: Situation includes Event

**DUL Definition**: A relation between situations and events that occur in them

**Examples**:
```
Conference_situation.Target --includesEvent--> Presentation.Target
```

**Status**: DUL core property

---

#### 8.13.6 includesObject

**Type**: DUL Property  
**Background Frame**: *DUL_Object_Inclusion*  
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#includesObject`

**Frame Elements**:
- **FE1**: Situation (DUL Situation)
- **FE2**: Object (DUL Object)

**Semantics**: Situation includes Object

**DUL Definition**: A relation between situations and objects involved in them

**Examples**:
```
Cooking_situation.Target --includesObject--> Ingredients.Target
```

**Status**: DUL core property

---

### 8.14 Composition and Coverage Properties

---

#### 8.14.1 covers

**Type**: DUL Property  
**Background Frame**: *DUL_Coverage*  
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#covers`

**Frame Elements**:
- **FE1**: Concept (DUL Concept)
- **FE2**: Entity (DUL Entity)

**Semantics**: Concept covers Entity in its extension

**DUL Definition**: A relation between concepts and entities in their extension

**Inverse**: isCoveredBy

**Examples**:
```
Animal_concept.Target --covers--> Dog.Target
Color_concept.Target --covers--> Red.Target
```

**Status**: DUL core property

---

#### 8.14.2 isCoveredBy

**Type**: DUL Property  
**Background Frame**: *DUL_Coverage*  
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#isCoveredBy`

**Frame Elements**:
- **FE1**: Entity (DUL Entity)
- **FE2**: Concept (DUL Concept)

**Semantics**: Entity is covered by Concept

**DUL Definition**: Inverse of covers

**Inverse**: covers

**Status**: DUL core property

---

#### 8.14.3 unifies

**Type**: DUL Property  
**Background Frame**: *DUL_Unification*  
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#unifies`

**Frame Elements**:
- **FE1**: Collection (DUL Collection)
- **FE2**: Entity (DUL Entity)

**Semantics**: Collection unifies Entity as a unified whole

**DUL Definition**: A relation between collections and the entities they unify

**Inverse**: isUnifiedBy

**Examples**:
```
Team.Target --unifies--> Members.Target
System.Target --unifies--> Components.Target
```

**Status**: DUL core property

---

#### 8.14.4 isUnifiedBy

**Type**: DUL Property  
**Background Frame**: *DUL_Unification*  
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#isUnifiedBy`

**Frame Elements**:
- **FE1**: Entity (DUL Entity)
- **FE2**: Collection (DUL Collection)

**Semantics**: Entity is unified by Collection

**DUL Definition**: Inverse of unifies

**Inverse**: unifies

**Status**: DUL core property

---

#### 8.14.5 expands

**Type**: DUL Property  
**Background Frame**: *DUL_Expansion*  
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#expands`

**Frame Elements**:
- **FE1**: Description_1 (DUL Description)
- **FE2**: Description_2 (DUL Description)

**Semantics**: Description_1 expands Description_2 by adding details

**DUL Definition**: A partial order relation between descriptions, where one expands another by adding properties or details

**Examples**:
```
Detailed_plan.Target --expands--> Basic_plan.Target
```

**Status**: DUL core property

---

#### 8.14.6 specializes

**Type**: DUL Property  
**Background Frame**: *DUL_Specialization*  
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#specializes`

**Frame Elements**:
- **FE1**: Specific_concept (DUL Concept)
- **FE2**: General_concept (DUL Concept)

**Semantics**: Specific_concept specializes General_concept

**DUL Definition**: A relation between concepts where one is more specific than another

**Inverse**: isSpecializedBy

**Examples**:
```
Car.Target --specializes--> Vehicle.Target
Dog.Target --specializes--> Animal.Target
```

**Status**: DUL core property

---

#### 8.14.7 usesConcept

**Type**: DUL Property  
**Background Frame**: *DUL_Concept_Use*  
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#usesConcept`

**Frame Elements**:
- **FE1**: Description (DUL Description)
- **FE2**: Concept (DUL Concept)

**Semantics**: Description uses Concept in its formulation

**DUL Definition**: A relation between descriptions and concepts they use

**Inverse**: isConceptUsedIn

**Examples**:
```
Recipe.Target --usesConcept--> Cooking_concept.Target
Law.Target --usesConcept--> Legal_concept.Target
```

**Status**: DUL core property

---

### 8.15 Contextual Relationship Properties

---

#### 8.15.1 coParticipatesWith

**Type**: DUL Property  
**Background Frame**: *DUL_Co_Participation*  
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#coParticipatesWith`

**Frame Elements**:
- **FE1**: Object_1 (DUL Object)
- **FE2**: Object_2 (DUL Object)

**Semantics**: Object_1 co-participates with Object_2 in the same event

**DUL Definition**: A relation between objects that participate in the same event

**Properties**: Symmetric

**Examples**:
```
Actor1.Target --coParticipatesWith--> Actor2.Target
(in the same performance)
```

**Status**: DUL core property

---

#### 8.15.2 characterizes

**Type**: DUL Property  
**Background Frame**: *DUL_Characterization*  
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#characterizes`

**Frame Elements**:
- **FE1**: Concept (DUL Concept)
- **FE2**: Description (DUL Description)

**Semantics**: Concept characterizes Description

**DUL Definition**: A relation between concepts and descriptions they characterize

**Examples**:
```
Key_concept.Target --characterizes--> Theory.Target
```

**Status**: DUL core property

---

#### 8.15.3 isInTheSameSettingAs

**Type**: DUL Property  
**Background Frame**: *DUL_Same_Setting*  
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#isInTheSameSettingAs`

**Frame Elements**:
- **FE1**: Entity_1 (DUL Entity)
- **FE2**: Entity_2 (DUL Entity)

**Semantics**: Entity_1 is in the same situational context as Entity_2

**DUL Definition**: A relation between entities that share the same situational setting

**Properties**: Symmetric

**Examples**:
```
Event1.Target --isInTheSameSettingAs--> Event2.Target
```

**Status**: DUL core property

---

### 8.16 Precondition and Postcondition Properties

---

#### 8.16.1 hasPrecondition

**Type**: DUL Property  
**Background Frame**: *DUL_Precondition*  
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#hasPrecondition`

**Frame Elements**:
- **FE1**: Situation (DUL Situation)
- **FE2**: Precondition_situation (DUL Situation)

**Semantics**: Situation has Precondition_situation as a precondition

**DUL Definition**: A relation between situations where one must hold before the other

**Examples**:
```
Driving.Target --hasPrecondition--> Having_license.Target
```

**Status**: DUL core property

---

#### 8.16.2 hasPostcondition

**Type**: DUL Property  
**Background Frame**: *DUL_Postcondition*  
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#hasPostcondition`

**Frame Elements**:
- **FE1**: Situation (DUL Situation)
- **FE2**: Postcondition_situation (DUL Situation)

**Semantics**: Situation has Postcondition_situation as a result

**DUL Definition**: A relation between situations where one follows as a result of the other

**Examples**:
```
Cooking.Target --hasPostcondition--> Cooked_food.Target
```

**Status**: DUL core property

---

## Summary: DUL Properties as Micro-Frames

### Statistics

**Total DUL Properties Documented**: 88 micro-frames

**By Category**:
- Core Association: 1
- Participation: 2
- Mereological (Part-Whole): 7
- Collection and Membership: 2
- Quality and Region: 4
- Spatial: 6
- Temporal: 6
- Description and Situation (DnS): 8
- Classification and Conceptualization: 4
- Role and Task: 7
- Parameter and Constraint: 4
- Information and Expression: 5
- Agent and Action: 6
- Composition and Coverage: 7
- Contextual Relationship: 3
- Precondition and Postcondition: 2

### Integration Notes

**Implementation Strategy**:

1. **Create DUL Property Micro-Frames**:
    - Each DUL property becomes a micro-frame with `is_micro_frame = TRUE`
    - Frame name uses DUL property name (e.g., "hasParticipant")
    - DUL URI stored as metadata

2. **Maintain Inverse Properties**:
    - Both directions stored as separate micro-frames
    - Linked via metadata indicating inverse relationship

3. **Property Hierarchy**:
    - Sub-property relationships preserved via frame inheritance
    - E.g., `hasProperPart` inherits from `hasPart`

4. **Type Constraints**:
    - FE1 and FE2 use `refers_to_frame_id` to specify DUL class constraints
    - E.g., `hasParticipant`: FE1 refers to DUL_Event, FE2 refers to DUL_Object

**Usage in Frame-Native Architecture**:

```
Example: Cooking event has cook as participant

Micro-frame: hasParticipant (DUL property)
  FE1: Event (refers_to: DUL_Event)
  FE2: Participant (refers_to: DUL_Object)

FE_Relation:
  micro_frame_id: hasParticipant
  source_fe_id: Cooking_event.Target
  target_fe_id: Cook.Target
  source_maps_to: Event
  target_maps_to: Participant
```

**Benefits**:

1. **Unified Representation**: DUL properties use same micro-frame mechanism as qualia relations
2. **Ontological Grounding**: Frames inherit formal semantics from DUL
3. **Type Safety**: FE constraints enforce DUL type restrictions
4. **Inference**: Transitive, symmetric properties enable reasoning
5. **Interoperability**: Direct mapping to standard DUL ontology

---

## Appendix: Complete Summary Tables

### All Micro-Frames Count

| Category | Count |
|----------|-------|
| **Implemented (TQR)** | 46 |
| **Under Analysis (SIMPLE)** | 26 |
| **DUL Properties** | 88 |
| **TOTAL** | **160** |

### DUL Properties Quick Reference

| DUL Property | Inverse | Domain | Range | Properties |
|--------------|---------|---------|-------|------------|
| associatedWith | - | Entity | Entity | - |
| hasParticipant | isParticipantIn | Event | Object | - |
| hasPart | isPartOf | Entity | Entity | Reflexive, Transitive |
| hasProperPart | - | Entity | Entity | Irreflexive, Transitive |
| hasComponent | isComponentOf | Entity | Entity | - |
| hasConstituent | isConstituentOf | Entity | Entity | - |
| hasMember | isMemberOf | Collection | Entity | - |
| hasQuality | isQualityOf | Entity | Quality | - |
| hasRegion | isRegionFor | Entity | Region | - |
| hasLocation | isLocationOf | Entity | Entity | - |
| overlaps | - | Entity | Entity | Symmetric |
| hasCommonBoundary | - | Entity | Entity | Symmetric |
| nearTo | - | Entity | Entity | Symmetric |
| farFrom | - | Entity | Entity | Symmetric |
| hasTimeInterval | isTimeIntervalOf | Entity | TimeInterval | - |
| isObservableAt | isTimeOfObservationOf | Entity | TimeInterval | - |
| precedes | follows | Entity | Entity | Transitive |
| follows | precedes | Entity | Entity | Transitive |
| directlyPrecedes | directlyFollows | Entity | Entity | - |
| directlyFollows | directlyPrecedes | Entity | Entity | - |
| defines | isDefinedIn | Description | Concept | - |
| satisfies | isSatisfiedBy | Situation | Description | - |
| describes | isDescribedBy | Description | Entity | - |
| hasSetting | isSettingFor | Entity | Situation | - |
| classifies | isClassifiedBy | Concept | Entity | - |
| conceptualizes | isConceptualizedBy | SocialObject | Entity | - |
| hasRole | isRoleOf | Object | Role | - |
| hasTask | isTaskOf | Role | Task | - |
| executesTask | isExecutedBy | Action | Task | - |
| definesRole | - | Description | Role | - |
| definesTask | - | Description | Task | - |
| hasParameter | isParameterFor | Concept | Parameter | - |
| hasConstraint | isConstraintFor | Entity | Parameter | - |
| expresses | isExpressedBy | InformationObject | SocialObject | - |
| isAbout | isReferenceOf | InformationObject | Entity | - |
| concretelyExpresses | - | InformationRealization | InformationObject | - |
| actsFor | actsThrough | Agent | SocialAgent | - |
| actsThrough | actsFor | SocialAgent | Agent | - |
| includesAgent | - | Situation | Agent | - |
| includesAction | - | Situation | Action | - |
| includesEvent | - | Situation | Event | - |
| includesObject | - | Situation | Object | - |
| covers | isCoveredBy | Concept | Entity | - |
| unifies | isUnifiedBy | Collection | Entity | - |
| expands | - | Description | Description | - |
| specializes | isSpecializedBy | Concept | Concept | - |
| usesConcept | isConceptUsedIn | Description | Concept | - |
| coParticipatesWith | - | Object | Object | Symmetric |
| characterizes | - | Concept | Description | - |
| isInTheSameSettingAs | - | Entity | Entity | Symmetric |
| hasPrecondition | - | Situation | Situation | - |
| hasPostcondition | - | Situation | Situation | - |

---

END OF DOCUMENT# Micro-Frames Documentation for FrameNet Brasil

**Version**: 1.0  
**Date**: October 21, 2025  
**Status**: Complete documentation of all TQR relations (implemented and under analysis)

---

## Table of Contents

1. [Overview](#overview)
2. [Migration: TQR → Micro-Frames](#migration-tqr--micro-frames)
3. [Complete Micro-Frame Library](#complete-micro-frame-library)
    - [Section 1: AGENTIVE Micro-Frames (Implemented)](#section-1-agentive-micro-frames-implemented)
    - [Section 2: CONSTITUTIVE Micro-Frames (Implemented)](#section-2-constitutive-micro-frames-implemented)
    - [Section 3: FORMAL Micro-Frames (Implemented)](#section-3-formal-micro-frames-implemented)
    - [Section 4: TELIC Micro-Frames (Implemented)](#section-4-telic-micro-frames-implemented)
    - [Section 5: AGENTIVE Micro-Frames from SIMPLE (Under Analysis)](#section-5-agentive-micro-frames-from-simple-under-analysis)
    - [Section 6: CONSTITUTIVE Micro-Frames from SIMPLE (Under Analysis)](#section-6-constitutive-micro-frames-from-simple-under-analysis)
    - [Section 7: TELIC Micro-Frames from SIMPLE (Under Analysis)](#section-7-telic-micro-frames-from-simple-under-analysis)
4. [Implementation Notes](#implementation-notes)
5. [Summary Statistics](#summary-statistics)
6. [Usage Examples](#usage-examples)
7. [References](#references)

---

## Overview

**Micro-frames** replace the TQR (Ternary Qualia Relations) system in FrameNet Brasil. All existing TQR relations are preserved and reimplemented as micro-frames, including those already in use and those under analysis from the SIMPLE ontology.

### What are Micro-Frames?

Micro-frames are **binary relation frames** that define connections between Frame Elements. They preserve all the semantic richness of TQR while providing a unified, frame-native architecture.

**Key Properties**:
- Exactly **2 Frame Elements** (binary relations)
- `is_micro_frame = TRUE`
- `arity = 2`
- Each micro-frame IS the background frame from TQR

---

## Migration: TQR → Micro-Frames

### Structural Transformation

**Old TQR Structure**:
```
Qualia Structure (registro na tabela Qualia):
- idQualia
- info (nome amigável)
- entry
- idTypeInstance (Formal/Constitutive/Agentive/Telic)
- idFrame (background frame)
- idFrameElement1
- idFrameElement2

Qualia Relation (registro na tabela EntityRelation):
- rel_qualia_formal/constitutive/agentive/telic
- idEntityLU1
- idEntityLU2
- idEntityQualia
```

**New Micro-Frame Structure**:
```
Micro-Frame (frame with is_micro_frame=TRUE):
- frame_id (= old idFrame)
- frame_name (= old frame name)
- qualia_type (Formal/Constitutive/Agentive/Telic)
- definition
- FE1 (= old idFrameElement1)
- FE2 (= old idFrameElement2)

FE_Relation:
- micro_frame_id
- source_fe_id (= LU1.Target or FE in frame)
- target_fe_id (= LU2.Target or FE in frame)
- source_maps_to_micro_fe_id (= FE1 or FE2)
- target_maps_to_micro_fe_id (= FE1 or FE2)
```

---

## Complete Micro-Frame Library

### Section 1: AGENTIVE Micro-Frames (Implemented)

These micro-frames define relations of origin, creation, and causation.

#### 1.1 afetado_agentivamente_por

**Qualia Type**: Agentive  
**Background Frame**: Afetar_intencionalmente  
**Info**: afetado_agentivamente_por

**Frame Elements**:
- **FE1**: Paciente (the affected entity)
- **FE2**: Agente (the affecting agent)

**Semantics**: Paciente is intentionally affected by Agente

**Examples**:
```
patient.n --afetado_agentivamente_por--> doctor.v
paciente.n --afetado_agentivamente_por--> médico.n
```

---

#### 1.2 causado_agentivamente_por (Agir_intencionalmente)

**Qualia Type**: Agentive  
**Background Frame**: Agir_intencionalmente  
**Info**: causado_agentivamente_por

**Frame Elements**:
- **FE1**: Ação (the action/event)
- **FE2**: Agente (the intentional agent)

**Semantics**: Ação is intentionally caused by Agente

**Examples**:
```
building.n --causado_agentivamente_por--> architect.n
prédio.n --causado_agentivamente_por--> arquiteto.n
```

---

#### 1.3 causado_agentivamente_por (Causalidade)

**Qualia Type**: Agentive  
**Background Frame**: Causalidade  
**Info**: causado_agentivamente_por

**Frame Elements**:
- **FE1**: Efeito (the resulting effect)
- **FE2**: Ator (the actor causing effect)

**Semantics**: Efeito is brought about by Ator's action

**Examples**:
```
result.n --causado_agentivamente_por--> agent.n
resultado.n --causado_agentivamente_por--> agente.n
```

---

#### 1.4 causado_por

**Qualia Type**: Agentive  
**Background Frame**: Causalidade  
**Info**: causado_por

**Frame Elements**:
- **FE1**: Efeito (the effect)
- **FE2**: Causa (the cause)

**Semantics**: Efeito is caused by Causa (may be non-agentive)

**Examples**:
```
erosion.n --causado_por--> rain.n
erosão.n --causado_por--> chuva.n
```

---

#### 1.5 causa_naturalmente

**Qualia Type**: Agentive  
**Background Frame**: Causar_condição_em_saúde  
**Info**: causa_naturalmente

**Frame Elements**:
- **FE1**: Causa_da_condição_em_saúde (the causing condition)
- **FE2**: Condição_em_saúde (the resulting health condition)

**Semantics**: Causa naturally brings about Condição_em_saúde

**Examples**:
```
virus.n --causa_naturalmente--> disease.n
vírus.n --causa_naturalmente--> doença.n
```

---

#### 1.6 causa_reação

**Qualia Type**: Agentive  
**Background Frame**: Causar_iniciar  
**Info**: causa_reação

**Frame Elements**:
- **FE1**: Causa (the initiating cause)
- **FE2**: Efeito (the resulting effect/reaction)

**Semantics**: Causa initiates Efeito as a reaction

**Examples**:
```
stimulus.n --causa_reação--> response.n
estímulo.n --causa_reação--> resposta.n
```

---

#### 1.7 criado_por (Criação_culinária)

**Qualia Type**: Agentive  
**Background Frame**: Criação_culinária  
**Info**: criado_por

**Frame Elements**:
- **FE1**: Comida_produzida (the food created)
- **FE2**: Cozinheiro (the cook/chef)

**Semantics**: Comida_produzida is created by Cozinheiro

**Examples**:
```
prato.n --criado_por--> chef.n
feijoada.n --criado_por--> cozinheiro.n
```

---

#### 1.8 criado_por (Criar_intencionalmente)

**Qualia Type**: Agentive  
**Background Frame**: Criar_intencionalmente  
**Info**: criado_por

**Frame Elements**:
- **FE1**: Entidade_criada (the created entity)
- **FE2**: Criador (the creator)

**Semantics**: Entidade_criada is intentionally created by Criador

**Examples**:
```
painting.n --criado_por--> artist.n
pintura.n --criado_por--> artista.n
software.n --criado_por--> programmer.n
```

---

#### 1.9 é_causa_de

**Qualia Type**: Agentive  
**Background Frame**: Infectar  
**Info**: é_causa_de

**Frame Elements**:
- **FE1**: Causa_Infecção (the infectious agent)
- **FE2**: Infecção (the infection)

**Semantics**: Causa_Infecção is the cause of Infecção

**Examples**:
```
bacteria.n --é_causa_de--> infection.n
bactéria.n --é_causa_de--> infecção.n
```

---

#### 1.10 criado_por (Inovar)

**Qualia Type**: Agentive  
**Background Frame**: Inovar  
**Info**: criado_por

**Frame Elements**:
- **FE1**: Nova_ideia (the innovation/new idea)
- **FE2**: Pensador (the thinker/innovator)

**Semantics**: Nova_ideia is created by Pensador through innovation

**Examples**:
```
theory.n --criado_por--> scientist.n
teoria.n --criado_por--> pensador.n
```

---

#### 1.11 resolvido_por

**Qualia Type**: Agentive  
**Background Frame**: Resolver_problema  
**Info**: resolvido_por

**Frame Elements**:
- **FE1**: Problema (the problem)
- **FE2**: Agente (the problem-solver)

**Semantics**: Problema is solved by Agente

**Examples**:
```
problem.n --resolvido_por--> engineer.n
problema.n --resolvido_por--> engenheiro.n
```

---

### Section 2: CONSTITUTIVE Micro-Frames (Implemented)

These micro-frames define relations of composition, containment, and inherent properties.

#### 2.1 é_atividade_constitutiva_de

**Qualia Type**: Constitutive  
**Background Frame**: Agir_intencionalmente  
**Info**: é_atividade_constitutiva_de

**Frame Elements**:
- **FE1**: Ação (the activity)
- **FE2**: Agente (the agent)

**Semantics**: Ação constitutes the activity of Agente

**Examples**:
```
teaching.n --é_atividade_constitutiva_de--> teacher.n
ensino.n --é_atividade_constitutiva_de--> professor.n
```

---

#### 2.2 tem_como_membro

**Qualia Type**: Constitutive  
**Background Frame**: Associação  
**Info**: tem_como_membro

**Frame Elements**:
- **FE1**: Grupo (the group/collective)
- **FE2**: Membro (the member)

**Semantics**: Grupo has Membro as a member

**Examples**:
```
team.n --tem_como_membro--> player.n
equipe.n --tem_como_membro--> jogador.n
```

---

#### 2.3 tem_como_atributo_constitutivo

**Qualia Type**: Constitutive  
**Background Frame**: Atributos  
**Info**: tem_como_atributo_constitutivo

**Frame Elements**:
- **FE1**: Entidade (the entity)
- **FE2**: Atributo (the attribute)

**Semantics**: Entidade has Atributo as a constitutive attribute

**Examples**:
```
person.n --tem_como_atributo_constitutivo--> age.n
pessoa.n --tem_como_atributo_constitutivo--> idade.n
```

---

#### 2.4 causa_naturalmente (Causalidade)

**Qualia Type**: Constitutive  
**Background Frame**: Causalidade  
**Info**: causa_naturalmente

**Frame Elements**:
- **FE1**: Ator (the natural causer)
- **FE2**: Afetado (the affected entity)

**Semantics**: Ator naturally causes changes in Afetado

**Examples**:
```
sun.n --causa_naturalmente--> warmth.n
sol.n --causa_naturalmente--> calor.n
```

---

#### 2.5 contém

**Qualia Type**: Constitutive  
**Background Frame**: Conter  
**Info**: contém

**Frame Elements**:
- **FE1**: Recipiente (the container)
- **FE2**: Conteúdos (the contents)

**Semantics**: Recipiente contains Conteúdos

**Examples**:
```
bottle.n --contém--> liquid.n
garrafa.n --contém--> líquido.n
```

---

#### 2.6 produz_naturalmente

**Qualia Type**: Constitutive  
**Background Frame**: Criar  
**Info**: produz_naturalmente

**Frame Elements**:
- **FE1**: Criador (the natural producer)
- **FE2**: Entidade_criada (the naturally created entity)

**Semantics**: Criador naturally produces Entidade_criada

**Examples**:
```
tree.n --produz_naturalmente--> fruit.n
árvore.n --produz_naturalmente--> fruta.n
```

---

#### 2.7 é_o_lugar_de

**Qualia Type**: Constitutive  
**Background Frame**: Empregar  
**Info**: é_o_lugar_de

**Frame Elements**:
- **FE1**: Empregador (the employer/workplace)
- **FE2**: Empregado (the employee)

**Semantics**: Empregador is the workplace of Empregado

**Examples**:
```
company.n --é_o_lugar_de--> worker.n
empresa.n --é_o_lugar_de--> empregado.n
```

---

#### 2.8 idiossincrasia_de

**Qualia Type**: Constitutive  
**Background Frame**: Idiossincrasia  
**Info**: idiossincrasia_de

**Frame Elements**:
- **FE1**: Idiossincrasia (the characteristic)
- **FE2**: Entidade (the entity)

**Semantics**: Idiossincrasia is a characteristic feature of Entidade

**Examples**:
```
kilt.n --idiossincrasia_de--> scottish_person.n
kilt.n --idiossincrasia_de--> escocês.n
```

---

#### 2.9 inclui

**Qualia Type**: Constitutive  
**Background Frame**: Inclusão  
**Info**: inclui

**Frame Elements**:
- **FE1**: Total (the whole)
- **FE2**: Parte (the part)

**Semantics**: Total includes Parte as a component

**Examples**:
```
whole.n --inclui--> part.n
todo.n --inclui--> parte.n
```

---

#### 2.10 afeta

**Qualia Type**: Constitutive  
**Background Frame**: Influência_objetiva  
**Info**: afeta

**Frame Elements**:
- **FE1**: Entidade_influenciadora (the influencing entity)
- **FE2**: Entidade_dependente (the dependent entity)

**Semantics**: Entidade_influenciadora objectively affects Entidade_dependente

**Examples**:
```
temperature.n --afeta--> comfort.n
temperatura.n --afeta--> conforto.n
```

---

#### 2.11 tem (Infraestrutura)

**Qualia Type**: Constitutive  
**Background Frame**: Infraestrutura  
**Info**: tem

**Frame Elements**:
- **FE1**: Infraestrutura (the infrastructure)
- **FE2**: Usuário (the user)

**Semantics**: Infraestrutura has Usuário as its users

**Examples**:
```
road.n --tem--> driver.n
estrada.n --tem--> motorista.n
```

---

#### 2.12 é_feito_de

**Qualia Type**: Constitutive  
**Background Frame**: Ingredientes  
**Info**: é_feito_de

**Frame Elements**:
- **FE1**: Produto (the product)
- **FE2**: Material (the material/ingredient)

**Semantics**: Produto is made of Material

**Examples**:
```
bread.n --é_feito_de--> flour.n
pão.n --é_feito_de--> farinha.n
pizza.n --é_feito_de--> flour.n
```

---

#### 2.13 parentesco

**Qualia Type**: Constitutive  
**Background Frame**: Parentesco  
**Info**: parentesco

**Frame Elements**:
- **FE1**: Ego (reference person)
- **FE2**: Alter (related person)

**Semantics**: Ego and Alter are related by kinship

**Examples**:
```
father.n --parentesco--> child.n
pai.n --parentesco--> filho.n
```

---

#### 2.14 tem_como_parte (Parte_elemento)

**Qualia Type**: Constitutive  
**Background Frame**: Parte_elemento  
**Info**: tem_como_parte

**Frame Elements**:
- **FE1**: Substância (the substance)
- **FE2**: Elemento (the element)

**Semantics**: Substância has Elemento as a constituent element

**Examples**:
```
water.n --tem_como_parte--> hydrogen.n
água.n --tem_como_parte--> hidrogênio.n
```

---

#### 2.15 tem_como_parte (Parte_interior_exterior)

**Qualia Type**: Constitutive  
**Background Frame**: Parte_interior_exterior  
**Info**: tem_como_parte

**Frame Elements**:
- **FE1**: Todo (the whole)
- **FE2**: Parte (the interior/exterior part)

**Semantics**: Todo has Parte as an interior or exterior part

**Examples**:
```
car.n --tem_como_parte--> engine.n
carro.n --tem_como_parte--> motor.n
```

---

#### 2.16 tem_como_parte (Parte_todo)

**Qualia Type**: Constitutive  
**Background Frame**: Parte_todo  
**Info**: tem_como_parte

**Frame Elements**:
- **FE1**: Todo (the whole)
- **FE2**: Parte (the part)

**Semantics**: Todo has Parte as a component

**Examples**:
```
body.n --tem_como_parte--> arm.n
corpo.n --tem_como_parte--> braço.n
```

---

#### 2.17 tem_origem

**Qualia Type**: Constitutive  
**Background Frame**: Pessoas_por_origem  
**Info**: tem_origem

**Frame Elements**:
- **FE1**: Pessoa (the person)
- **FE2**: Origem (the origin/place)

**Semantics**: Pessoa has origin in Origem

**Examples**:
```
brazilian.n --tem_origem--> brazil.n
brasileiro.n --tem_origem--> brasil.n
```

---

#### 2.18 é_um_seguidor_de

**Qualia Type**: Constitutive  
**Background Frame**: Pessoas_por_religião  
**Info**: é_um_seguidor_de

**Frame Elements**:
- **FE1**: Pessoa (the person)
- **FE2**: Religião (the religion)

**Semantics**: Pessoa is a follower of Religião

**Examples**:
```
catholic.n --é_um_seguidor_de--> catholicism.n
católico.n --é_um_seguidor_de--> catolicismo.n
```

---

#### 2.19 tem (Relação_condição_sintoma)

**Qualia Type**: Constitutive  
**Background Frame**: Relação_condição_sintoma  
**Info**: tem

**Frame Elements**:
- **FE1**: Condição_em_saúde (the health condition)
- **FE2**: Sintoma (the symptom)

**Semantics**: Condição_em_saúde has Sintoma as a symptom

**Examples**:
```
flu.n --tem--> fever.n
gripe.n --tem--> febre.n
```

---

#### 2.20 relacionado_a

**Qualia Type**: Constitutive  
**Background Frame**: Relação  
**Info**: relacionado_a

**Frame Elements**:
- **FE1**: Entidade_1 (first entity)
- **FE2**: Entidade_2 (second entity)

**Semantics**: Entidade_1 is related to Entidade_2 (general relation)

**Examples**:
```
cause.n --relacionado_a--> effect.n
causa.n --relacionado_a--> efeito.n
```

---

#### 2.21 tem_como_residente

**Qualia Type**: Constitutive  
**Background Frame**: Residência  
**Info**: tem_como_residente

**Frame Elements**:
- **FE1**: Local (the place)
- **FE2**: Residente (the resident)

**Semantics**: Local has Residente as a resident

**Examples**:
```
city.n --tem_como_residente--> citizen.n
cidade.n --tem_como_residente--> cidadão.n
```

---

#### 2.22 tem_como_parte_predial

**Qualia Type**: Constitutive  
**Background Frame**: Subpartes_de_prédios  
**Info**: tem_como_parte_predial

**Frame Elements**:
- **FE1**: Todo (the building whole)
- **FE2**: Parte (the building part)

**Semantics**: Todo has Parte as a building component

**Examples**:
```
building.n --tem_como_parte_predial--> floor.n
prédio.n --tem_como_parte_predial--> andar.n
```

---

#### 2.23 usa

**Qualia Type**: Constitutive  
**Background Frame**: Usar_recurso  
**Info**: usa

**Frame Elements**:
- **FE1**: Agente (the user)
- **FE2**: Recurso (the resource)

**Semantics**: Agente uses Recurso

**Examples**:
```
writer.n --usa--> pen.n
escritor.n --usa--> caneta.n
```

---

### Section 3: FORMAL Micro-Frames (Implemented)

These micro-frames define taxonomic and classificatory relations.

#### 3.1 instância_de

**Qualia Type**: Formal  
**Background Frame**: Exemplar  
**Info**: instância_de

**Frame Elements**:
- **FE1**: Exemplar (the instance/example)
- **FE2**: Tipo (the type/category)

**Semantics**: Exemplar is an instance of Tipo (extensional definition)

**Examples**:
```
japanese_restaurant.n --instância_de--> restaurant.n
restaurante_japonês.n --instância_de--> restaurante.n
```

---

#### 3.2 tipo_de

**Qualia Type**: Formal  
**Background Frame**: Tipo  
**Info**: tipo_de

**Frame Elements**:
- **FE1**: Subtipo (the subtype)
- **FE2**: Categoria (the category/supertype)

**Semantics**: Subtipo is a type of Categoria (intensional definition)

**Examples**:
```
restaurant.n --tipo_de--> building.n
restaurante.n --tipo_de--> construção.n
```

---

### Section 4: TELIC Micro-Frames (Implemented)

These micro-frames define purpose, function, and goal relations.

#### 4.1 é_a_atividade_de

**Qualia Type**: Telic  
**Background Frame**: Agir_intencionalmente  
**Info**: é_a_atividade_de

**Frame Elements**:
- **FE1**: Ação (the action/activity)
- **FE2**: Agente (the agent)

**Semantics**: Ação is the activity/role of Agente

**Examples**:
```
teaching.n --é_a_atividade_de--> teacher.n
ensino.n --é_a_atividade_de--> professor.n
```

---

#### 4.2 é_a_habilidade_de

**Qualia Type**: Telic  
**Background Frame**: Capacidade_ação  
**Info**: é_a_habilidade_de

**Frame Elements**:
- **FE1**: Evento (the ability/capability)
- **FE2**: Entidade (the capable entity)

**Semantics**: Evento is the ability/capability of Entidade

**Examples**:
```
flying.n --é_a_habilidade_de--> bird.n
voo.n --é_a_habilidade_de--> pássaro.n
```

---

#### 4.3 é_o_hábito_de

**Qualia Type**: Telic  
**Background Frame**: Costume  
**Info**: é_o_hábito_de

**Frame Elements**:
- **FE1**: Comportamento (the behavior/custom)
- **FE2**: Protagonista (the protagonist)

**Semantics**: Comportamento is the habit of Protagonista

**Examples**:
```
meditation.n --é_o_hábito_de--> monk.n
meditação.n --é_o_hábito_de--> monge.n
```

---

#### 4.4 objeto_da_atividade

**Qualia Type**: Telic  
**Background Frame**: Criar_intencionalmente  
**Info**: objeto_da_atividade

**Frame Elements**:
- **FE1**: Entidade_criada (the created object)
- **FE2**: Criador (the creator)

**Semantics**: Entidade_criada is the object of Criador's activity

**Examples**:
```
painting.n --objeto_da_atividade--> painter.n
pintura.n --objeto_da_atividade--> pintor.n
```

---

#### 4.5 propósito_de

**Qualia Type**: Telic  
**Background Frame**: Finalidade_do_utensílio  
**Info**: propósito_de

**Frame Elements**:
- **FE1**: Finalidade (the purpose/function)
- **FE2**: Utensílio (the tool/artifact)

**Semantics**: Finalidade is the purpose of Utensílio

**Examples**:
```
cutting.n --propósito_de--> knife.n
cortar.v --propósito_de--> faca.n
```

---

#### 4.6 propósito

**Qualia Type**: Telic  
**Background Frame**: Finalidade  
**Info**: propósito

**Frame Elements**:
- **FE1**: Alvo (the goal/target)
- **FE2**: Agente (the agent)

**Semantics**: Alvo is the purpose/goal of Agente

**Examples**:
```
success.n --propósito--> entrepreneur.n
sucesso.n --propósito--> empreendedor.n
```

---

#### 4.7 é_a_atividade_executada_em

**Qualia Type**: Telic  
**Background Frame**: Infraestrutura  
**Info**: é_a_atividade_executada_em

**Frame Elements**:
- **FE1**: Atividade (the activity)
- **FE2**: Infraestrutura (the infrastructure)

**Semantics**: Atividade is the activity executed in Infraestrutura

**Examples**:
```
driving.n --é_a_atividade_executada_em--> road.n
dirigir.v --é_a_atividade_executada_em--> estrada.n
```

---

#### 4.8 usado_por (Usar_recurso)

**Qualia Type**: Telic  
**Background Frame**: Usar_recurso  
**Info**: usado_por

**Frame Elements**:
- **FE1**: Recurso (the resource)
- **FE2**: Agente (the user agent)

**Semantics**: Recurso is used by Agente

**Examples**:
```
tool.n --usado_por--> worker.n
ferramenta.n --usado_por--> trabalhador.n
```

---

#### 4.9 usa_para

**Qualia Type**: Telic  
**Background Frame**: Usar  
**Info**: usa_para

**Frame Elements**:
- **FE1**: Agente (the user)
- **FE2**: Finalidade (the purpose)

**Semantics**: Agente uses for Finalidade

**Examples**:
```
chef.n --usa_para--> cooking.n
chef.n --usa_para--> cozinhar.v
```

---

#### 4.10 vício_de

**Qualia Type**: Telic  
**Background Frame**: Vício  
**Info**: vício de

**Frame Elements**:
- **FE1**: Vício (the addiction/vice)
- **FE2**: Viciado (the addicted person)

**Semantics**: Vício is the addiction of Viciado

**Examples**:
```
smoking.n --vício_de--> smoker.n
fumar.v --vício_de--> fumante.n
```

---

### Section 5: AGENTIVE Micro-Frames from SIMPLE (Under Analysis)

These micro-frames from SIMPLE ontology are being analyzed for inclusion.

#### 5.1 AffectedBy

**Qualia Type**: Agentive  
**Background Frame**: *To be defined*  
**SIMPLE Definition**: [SemU1] is affected by [SemU2] occurrence

**Frame Elements**:
- **FE1**: Affected_entity (the affected entity)
- **FE2**: Affecting_event (the event that affects)

**Semantics**: Affected_entity undergoes change due to Affecting_event occurrence

**SIMPLE Example**: Climate :: deforestation

**Proposed FNBr Example**:
```
climate.n --AffectedBy--> deforestation.n
clima.n --AffectedBy--> desmatamento.n
```

**Status**: Under analysis

---

#### 5.2 AgentiveExperience

**Qualia Type**: Agentive  
**Background Frame**: *To be defined*  
**SIMPLE Definition**: [SemU1] is an experience predicate and [SemU2] is the event experienced by the individual

**Frame Elements**:
- **FE1**: Experience_state (the experiential state)
- **FE2**: Experienced_event (the event being experienced)

**Semantics**: Experience_state is the experiential state resulting from Experienced_event

**SIMPLE Example**: fear :: feel

**Proposed FNBr Example**:
```
fear.n --AgentiveExperience--> feel.v
medo.n --AgentiveExperience--> sentir.v
```

**Status**: Under analysis

---

#### 5.3 AgentiveProg

**Qualia Type**: Agentive  
**Background Frame**: *To be defined*  
**SIMPLE Definition**: [SemU2] is an event which is ongoing while an individual has the property expressed by [SemU1]

**Frame Elements**:
- **FE1**: Property (the property/state)
- **FE2**: Ongoing_event (the simultaneous event)

**Semantics**: Property is maintained while Ongoing_event is in progress

**SIMPLE Example**: Pedestrian :: walk

**Proposed FNBr Example**:
```
pedestrian.n --AgentiveProg--> walk.v
pedestre.n --AgentiveProg--> andar.v
```

**Status**: Under analysis

---

#### 5.4 ResultOf

**Qualia Type**: Agentive  
**Background Frame**: *To be defined*  
**SIMPLE Definition**: [SemU1] is an entity which is the result, effect or by-product of the event expressed by [SemU2]

**Frame Elements**:
- **FE1**: Result_entity (the resulting entity)
- **FE2**: Causing_event (the event that produces)

**Semantics**: Result_entity is the result or by-product of Causing_event

**SIMPLE Example**: Loss :: lose

**Proposed FNBr Example**:
```
loss.n --ResultOf--> lose.v
perda.n --ResultOf--> perder.v
```

**Status**: Under analysis

---

#### 5.5 Source

**Qualia Type**: Agentive  
**Background Frame**: *To be defined*  
**SIMPLE Definition**: [SemU2] is the source or origin of [SemU1]

**Frame Elements**:
- **FE1**: Derived_entity (the entity)
- **FE2**: Source_entity (the source/origin)

**Semantics**: Derived_entity originates from or is derived from Source_entity

**SIMPLE Example**: Law :: society

**Proposed FNBr Example**:
```
law.n --Source--> society.n
lei.n --Source--> sociedade.n
```

**Status**: Under analysis

---

#### 5.6 DerivedFrom

**Qualia Type**: Agentive  
**Background Frame**: *To be defined*  
**SIMPLE Definition**: [SemU1] is derived from another object [SemU2] through a certain process of alteration

**Frame Elements**:
- **FE1**: Derived_object (the derived entity)
- **FE2**: Original_object (the original entity)

**Semantics**: Derived_object is created from Original_object through transformation

**SIMPLE Example**: Petrol :: oil

**Proposed FNBr Example**:
```
petrol.n --DerivedFrom--> oil.n
gasolina.n --DerivedFrom--> petróleo.n
```

**Status**: Under analysis

---

### Section 6: CONSTITUTIVE Micro-Frames from SIMPLE (Under Analysis)

#### 6.1 HasAsMember

**Qualia Type**: Constitutive  
**Background Frame**: *To be defined*  
**SIMPLE Definition**: [SemU1], which corresponds to a collective entity or a set of entities, has [SemU2] as its (proto)-typical member or element

**Frame Elements**:
- **FE1**: Collective (the collection/group)
- **FE2**: Typical_member (the prototypical member)

**Semantics**: Collective has Typical_member as a prototypical or typical member

**SIMPLE Example**: Flock :: bird

**Proposed FNBr Example**:
```
flock.n --HasAsMember--> bird.n
bando.n --HasAsMember--> pássaro.n
```

**Note**: Similar to existing `tem_como_membro` (Associação frame) but emphasizes prototypicality

**Status**: Under analysis

---

#### 6.2 HasAsPart

**Qualia Type**: Constitutive  
**Background Frame**: *To be defined*  
**SIMPLE Definition**: [SemU1] has prototypically [SemU2] as one of its parts

**Frame Elements**:
- **FE1**: Whole (the whole entity)
- **FE2**: Typical_part (the prototypical part)

**Semantics**: Whole prototypically has Typical_part as a component

**SIMPLE Example**: Airplane :: wing

**Proposed FNBr Example**:
```
airplane.n --HasAsPart--> wing.n
avião.n --HasAsPart--> asa.n
```

**Note**: Similar to existing `tem_como_parte` but emphasizes prototypicality

**Status**: Under analysis

---

#### 6.3 Instrument

**Qualia Type**: Constitutive  
**Background Frame**: *To be defined*  
**SIMPLE Definition**: [SemU1] is an event SemU and [SemU2] is the typical instrument, vehicle or device which is used to perform this event

**Frame Elements**:
- **FE1**: Event (the event)
- **FE2**: Typical_instrument (the prototypical instrument)

**Semantics**: Event is typically performed using Typical_instrument

**SIMPLE Example**: Ski :: ski

**Proposed FNBr Example**:
```
skiing.n --Instrument--> ski.n
esquiar.v --Instrument--> esqui.n
```

**Status**: Under analysis

---

#### 6.4 ResultingState

**Qualia Type**: Constitutive  
**Background Frame**: *To be defined*  
**SIMPLE Definition**: [SemU1] is a transition and [SemU2] is the resulting state of the transition

**Frame Elements**:
- **FE1**: Transition_event (the transitional event)
- **FE2**: Result_state (the resulting state)

**Semantics**: Transition_event leads to Result_state as outcome

**SIMPLE Example**: die :: died

**Proposed FNBr Example**:
```
die.v --ResultingState--> dead.adj
morrer.v --ResultingState--> morto.adj
```

**Status**: Under analysis

---

#### 6.5 TypicalLocation

**Qualia Type**: Constitutive  
**Background Frame**: *To be defined*  
**SIMPLE Definition**: [SemU1] is a location that typically is associated the entity in [SemU2]

**Frame Elements**:
- **FE1**: Location (the typical location)
- **FE2**: Located_entity (the entity)

**Semantics**: Location is the prototypical or typical location for Located_entity

**SIMPLE Example**: oasis :: desert

**Proposed FNBr Example**:
```
oasis.n --TypicalLocation--> desert.n
oásis.n --TypicalLocation--> deserto.n
```

**Status**: Under analysis

---

#### 6.6 Affects

**Qualia Type**: Constitutive  
**Background Frame**: *To be defined*  
**SIMPLE Definition**: [SemU1] is a phenomenon that typically affects the entity in [SemU2]

**Frame Elements**:
- **FE1**: Affecting_phenomenon (the affecting phenomenon)
- **FE2**: Affected_entity (the affected entity)

**Semantics**: Affecting_phenomenon typically affects or influences Affected_entity

**SIMPLE Example**: heat :: temperature

**Proposed FNBr Example**:
```
heat.n --Affects--> temperature.n
calor.n --Affects--> temperatura.n
```

**Note**: Similar to existing `afeta` (Influência_objetiva) but emphasizes typical affection patterns

**Status**: Under analysis

---

#### 6.7 Concerns

**Qualia Type**: Constitutive  
**Background Frame**: *To be defined*  
**SIMPLE Definition**: [SemU1] is a phenomenon, event or situation that typically concerns or affects [SemU2]

**Frame Elements**:
- **FE1**: Concerning_phenomenon (the phenomenon)
- **FE2**: Concerned_entity (the concerned/affected entity)

**Semantics**: Concerning_phenomenon is about or pertains to Concerned_entity

**SIMPLE Example**: Hepatitis :: liver

**Proposed FNBr Example**:
```
hepatitis.n --Concerns--> liver.n
hepatite.n --Concerns--> fígado.n
```

**Status**: Under analysis

---

#### 6.8 Contains

**Qualia Type**: Constitutive  
**Background Frame**: *To be defined*  
**SIMPLE Definition**: [SemU2] is an object which is typically contained in [SemU1]

**Frame Elements**:
- **FE1**: Container (the container)
- **FE2**: Typical_content (the typical content)

**Semantics**: Container typically contains Typical_content

**SIMPLE Example**: Book :: information

**Proposed FNBr Example**:
```
book.n --Contains--> information.n
livro.n --Contains--> informação.n
```

**Note**: Similar to existing `contém` (Conter) but emphasizes prototypical content

**Status**: Under analysis

---

#### 6.9 HasAsColour

**Qualia Type**: Constitutive  
**Background Frame**: *To be defined*  
**SIMPLE Definition**: [SemU2] is the typical colour of [SemU1]

**Frame Elements**:
- **FE1**: Colored_entity (the entity)
- **FE2**: Typical_color (the typical color)

**Semantics**: Colored_entity typically has Typical_color as its color

**SIMPLE Example**: Apple :: red

**Proposed FNBr Example**:
```
apple.n --HasAsColour--> red.n
maçã.n --HasAsColour--> vermelho.n
```

**Status**: Under analysis

---

#### 6.10 HasAsEffect

**Qualia Type**: Constitutive  
**Background Frame**: *To be defined*  
**SIMPLE Definition**: [SemU2] is a side-effect, consequence or indirect effect of [SemU1]

**Frame Elements**:
- **FE1**: Causing_phenomenon (the cause)
- **FE2**: Side_effect (the side-effect/consequence)

**Semantics**: Causing_phenomenon has Side_effect as a typical consequence

**SIMPLE Example**: Tempestade :: trovão (Storm :: thunder)

**Proposed FNBr Example**:
```
storm.n --HasAsEffect--> thunder.n
tempestade.n --HasAsEffect--> trovão.n
```

**Status**: Under analysis

---

#### 6.11 HasAsProperty

**Qualia Type**: Constitutive  
**Background Frame**: *To be defined*  
**SIMPLE Definition**: [SemU2] is an adjective which refers to the property, quality or attribute expressed by [SemU1]

**Frame Elements**:
- **FE1**: Abstract_property (the nominal property)
- **FE2**: Adjectival_property (the adjectival form)

**Semantics**: Abstract_property corresponds to Adjectival_property

**SIMPLE Example**: Intelligence :: intelligent

**Proposed FNBr Example**:
```
intelligence.n --HasAsProperty--> intelligent.adj
inteligência.n --HasAsProperty--> inteligente.adj
```

**Status**: Under analysis

---

#### 6.12 MeasuredBy

**Qualia Type**: Constitutive  
**Background Frame**: *To be defined*  
**SIMPLE Definition**: [SemU1] is a property which is measured by [SemU2], a unit of measure

**Frame Elements**:
- **FE1**: Measurable_property (the property)
- **FE2**: Unit_of_measure (the measurement unit)

**Semantics**: Measurable_property is quantified using Unit_of_measure

**SIMPLE Example**: Temperature :: degree

**Proposed FNBr Example**:
```
temperature.n --MeasuredBy--> degree.n
temperatura.n --MeasuredBy--> grau.n
```

**Status**: Under analysis

---

#### 6.13 PropertyOf

**Qualia Type**: Constitutive  
**Background Frame**: *To be defined*  
**SIMPLE Definition**: [SemU2] is an adjective which refers to the property, quality or attribute expressed by [SemU1]

**Frame Elements**:
- **FE1**: Adjectival_property (the adjectival form)
- **FE2**: Abstract_property (the nominal property)

**Semantics**: Adjectival_property corresponds to Abstract_property (inverse of HasAsProperty)

**SIMPLE Example**: Intelligent :: intelligence

**Proposed FNBr Example**:
```
intelligent.adj --PropertyOf--> intelligence.n
inteligente.adj --PropertyOf--> inteligência.n
```

**Note**: This is the inverse direction of HasAsProperty

**Status**: Under analysis

---

#### 6.14 Quantifies

**Qualia Type**: Constitutive  
**Background Frame**: *To be defined*  
**SIMPLE Definition**: [SemU1] expresses a quantity of [SemU2]

**Frame Elements**:
- **FE1**: Quantifier (the quantifying container/measure)
- **FE2**: Quantified_substance (the substance being quantified)

**Semantics**: Quantifier expresses a quantity of Quantified_substance

**SIMPLE Example**: bottle :: liquid

**Proposed FNBr Example**:
```
bottle.n --Quantifies--> liquid.n
garrafa.n --Quantifies--> líquido.n
```

**Status**: Under analysis

---

#### 6.15 Regulates

**Qualia Type**: Constitutive  
**Background Frame**: *To be defined*  
**SIMPLE Definition**: [SemU1] regulates [SemU2]

**Frame Elements**:
- **FE1**: Regulating_entity (the regulator)
- **FE2**: Regulated_entity (the regulated activity/entity)

**Semantics**: Regulating_entity governs or controls Regulated_entity

**SIMPLE Example**: Rule :: play

**Proposed FNBr Example**:
```
rule.n --Regulates--> play.v
regra.n --Regulates--> jogo.n
```

**Status**: Under analysis

---

#### 6.16 SuccessorOf

**Qualia Type**: Constitutive  
**Background Frame**: *To be defined*  
**SIMPLE Definition**: [SemU1] is the element following [SemU2] in a series

**Frame Elements**:
- **FE1**: Successor (the following element)
- **FE2**: Predecessor (the preceding element)

**Semantics**: Successor follows Predecessor in an ordered sequence

**SIMPLE Example**: Two :: one

**Proposed FNBr Example**:
```
two.n --SuccessorOf--> one.n
dois.n --SuccessorOf--> um.n
```

**Status**: Under analysis

---

#### 6.17 TypicalOf

**Qualia Type**: Constitutive  
**Background Frame**: *To be defined*  
**SIMPLE Definition**: [SemU1] is a disease or phenomenon that typically affects the entity in [SemU2]

**Frame Elements**:
- **FE1**: Typical_phenomenon (the disease/phenomenon)
- **FE2**: Typically_affected (the typically affected entity)

**Semantics**: Typical_phenomenon is characteristic of or typically affects Typically_affected

**SIMPLE Example**: measles :: child

**Proposed FNBr Example**:
```
measles.n --TypicalOf--> child.n
sarampo.n --TypicalOf--> criança.n
```

**Status**: Under analysis

---

### Section 7: TELIC Micro-Frames from SIMPLE (Under Analysis)

#### 7.1 IndirectTelic

**Qualia Type**: Telic  
**Background Frame**: *To be defined*  
**SIMPLE Definition**: [SemU1] and [SemU2] are related through an underspecified indirect telic relation. [SemU1] is usually the subject or the instrument-complement of the event in [SemU2], which represents a purpose prototypically associated with [SemU1]

**Frame Elements**:
- **FE1**: Entity_with_purpose (the entity)
- **FE2**: Typical_purpose_event (the prototypical purpose)

**Semantics**: Entity_with_purpose is typically involved in Typical_purpose_event (underspecified telic relation)

**SIMPLE Example**: eye :: see

**Proposed FNBr Example**:
```
eye.n --IndirectTelic--> see.v
olho.n --IndirectTelic--> ver.v
```

**Status**: Under analysis

---

#### 7.2 UsedAs

**Qualia Type**: Telic  
**Background Frame**: *To be defined*  
**SIMPLE Definition**: [SemU1] is typically used with the function which is expressed by [SemU2]

**Frame Elements**:
- **FE1**: Used_entity (the entity)
- **FE2**: Function (the typical function)

**Semantics**: Used_entity is typically used as or for Function

**SIMPLE Example**: wood :: material

**Proposed FNBr Example**:
```
wood.n --UsedAs--> material.n
madeira.n --UsedAs--> material.n
```

**Status**: Under analysis

---

#### 7.3 UsedAgainst

**Qualia Type**: Telic  
**Background Frame**: *To be defined*  
**SIMPLE Definition**: [SemU1] is used typically against [SemU2]

**Frame Elements**:
- **FE1**: Treatment_method (the treatment/intervention)
- **FE2**: Target_condition (the condition being treated)

**Semantics**: Treatment_method is typically used to counteract Target_condition

**SIMPLE Example**: Quimioterapy :: cancer

**Proposed FNBr Example**:
```
chemotherapy.n --UsedAgainst--> cancer.n
quimioterapia.n --UsedAgainst--> câncer.n
```

**Status**: Under analysis

---

## Implementation Notes

### Database Schema Changes

**Old TQR Tables**:
```sql
-- Qualia structure definition
CREATE TABLE Qualia (
  idQualia INT PRIMARY KEY,
  info VARCHAR(255),
  entry VARCHAR(255),
  idTypeInstance INT,  -- Formal/Constitutive/Agentive/Telic
  idFrame INT,          -- Background frame
  idFrameElement1 INT,
  idFrameElement2 INT
);

-- LU-to-LU relations
CREATE TABLE EntityRelation (
  relationType VARCHAR(50),  -- rel_qualia_formal, rel_qualia_constitutive, etc.
  idEntityLU1 INT,
  idEntityLU2 INT,
  idEntityQualia INT
);
```

**New Micro-Frame Schema**:
```sql
-- Frames table (includes micro-frames)
CREATE TABLE frame (
  frame_id INT PRIMARY KEY,
  frame_name VARCHAR(255),
  frame_type ENUM('semantic', 'entity', 'lexical_unit', 'lemma', 'ontology', 'micro_frame'),
  is_micro_frame BOOLEAN DEFAULT FALSE,
  arity INT,  -- 2 for micro-frames
  qualia_type ENUM('Formal', 'Constitutive', 'Agentive', 'Telic', NULL),
  definition TEXT
);

-- Frame Elements (all FEs, including those in micro-frames)
CREATE TABLE frame_element (
  fe_id INT PRIMARY KEY,
  frame_id INT,
  fe_name VARCHAR(255),
  fe_type ENUM('core', 'peripheral', 'extra-thematic'),
  is_target_fe BOOLEAN DEFAULT FALSE,
  refers_to_frame_id INT,  -- Type constraint
  definition TEXT
);

-- All relations (intra-frame and inter-frame)
CREATE TABLE fe_relation (
  relation_id INT PRIMARY KEY,
  micro_frame_id INT,  -- Which micro-frame defines this relation
  host_frame_id INT,   -- NULL for inter-frame, frame_id for intra-frame
  source_fe_id INT,
  target_fe_id INT,
  source_maps_to_micro_fe_id INT,  -- Which FE in micro-frame
  target_maps_to_micro_fe_id INT   -- Which FE in micro-frame
);
```

### Migration Strategy

1. **Create micro-frames from existing background frames**:
    - Each background frame referenced in Qualia table becomes a micro-frame
    - Mark with `is_micro_frame = TRUE`
    - Set `arity = 2`
    - Preserve `qualia_type` from `idTypeInstance`

2. **Transform qualia relations to fe_relations**:
    - For LU-to-LU relations: source and target are Target FEs of LU frames
    - For intra-frame relations: source and target are FEs within same frame
    - Map to micro-frame FEs via `source_maps_to_micro_fe_id` and `target_maps_to_micro_fe_id`

3. **Preserve all relation metadata**:
    - `info` field → micro-frame `frame_name` or `definition`
    - Background frame → micro-frame
    - FE mappings preserved in fe_relation

### Example Migration

**Old TQR**:
```
Qualia:
  idQualia: 42
  info: "criado_por"
  idTypeInstance: Agentive
  idFrame: 123 (Criação_culinária)
  idFrameElement1: 456 (Comida_produzida)
  idFrameElement2: 789 (Cozinheiro)

EntityRelation:
  relationType: rel_qualia_agentive
  idEntityLU1: 1001 (pizza.n)
  idEntityLU2: 2002 (chef.n)
  idEntityQualia: 42
```

**New Micro-Frame**:
```sql
-- Micro-frame
INSERT INTO frame VALUES (
  123,  -- frame_id (same as old idFrame)
  'Criação_culinária',
  'micro_frame',
  TRUE,  -- is_micro_frame
  2,     -- arity
  'Agentive',
  'Defines creation relationship in culinary context'
);

-- FEs of micro-frame
INSERT INTO frame_element VALUES (456, 123, 'Comida_produzida', 'core', FALSE, NULL, '...');
INSERT INTO frame_element VALUES (789, 123, 'Cozinheiro', 'core', FALSE, NULL, '...');

-- Relation
INSERT INTO fe_relation VALUES (
  5001,  -- relation_id
  123,   -- micro_frame_id (Criação_culinária)
  NULL,  -- host_frame_id (inter-frame, LU to LU)
  1001,  -- source_fe_id (pizza.n.Target)
  2002,  -- target_fe_id (chef.n.Target)
  456,   -- source_maps_to (Comida_produzida)
  789    -- target_maps_to (Cozinheiro)
);
```

---

## Summary Statistics

### Implemented Micro-Frames

| Qualia Type | Count | Examples |
|-------------|-------|----------|
| **Agentive** | 11 | afetado_agentivamente_por, causado_por, criado_por, resolvido_por |
| **Constitutive** | 23 | tem_como_membro, contém, tem_como_parte, parentesco, usa |
| **Formal** | 2 | instância_de, tipo_de |
| **Telic** | 10 | é_a_atividade_de, propósito_de, usado_por, vício_de |
| **TOTAL** | **46** | All currently implemented in FNBr |

### SIMPLE Micro-Frames Under Analysis

| Qualia Type | Count | Examples |
|-------------|-------|----------|
| **Agentive** | 6 | AffectedBy, ResultOf, Source, DerivedFrom |
| **Constitutive** | 17 | HasAsMember, HasAsPart, Affects, Contains, MeasuredBy, Regulates |
| **Telic** | 3 | IndirectTelic, UsedAs, UsedAgainst |
| **TOTAL** | **26** | Pending analysis for implementation |

### Grand Total

**72 micro-frames** documented (46 implemented + 26 under analysis)

---

## Usage Examples

### Example 1: LU-to-LU Relation (Inter-Frame)

**Scenario**: Pizza is made by chef

```
Source: pizza.n (LU frame)
Target: chef.n (LU frame)
Micro-frame: Criação_culinária

Relation:
  source_fe_id: pizza.n.Target
  target_fe_id: chef.n.Target
  source_maps_to: Comida_produzida
  target_maps_to: Cozinheiro
```

### Example 2: Intra-Frame Relation

**Scenario**: In Commerce_buy frame, Buyer is the agent

```
Source: Commerce_buy.Target
Target: Commerce_buy.Buyer
Micro-frame: agent_relation (Agir_intencionalmente)

Relation:
  host_frame_id: Commerce_buy
  source_fe_id: Commerce_buy.Target
  target_fe_id: Commerce_buy.Buyer
  source_maps_to: Ação
  target_maps_to: Agente
```

### Example 3: Frame Inheritance (Inter-Frame via Targets)

**Scenario**: Commerce_buy inherits from Getting

```
Source: Commerce_buy.Target
Target: Getting.Target
Micro-frame: inherits_from_relation

Relation:
  host_frame_id: NULL (inter-frame)
  source_fe_id: Commerce_buy.Target
  target_fe_id: Getting.Target
  source_maps_to: Child_frame
  target_maps_to: Parent_frame
```

---

## References

### FrameNet Brasil Publications

- Torrent, T. T., et al. (2022). "Representing Context in FrameNet: A Multidimensional, Multimodal Approach." *Frontiers in Psychology*. PMC9014903.
- FNBr Qualia Relations Documentation (Draft 4, 2022; Draft 5, 2023)

### SIMPLE Ontology

- Lenci, A., Busa, F., Ruimy, N., Gola, E., Monachini, M., Calzolari, N., et al. (2000). *SIMPLE Linguistic Specifications*. University of Pisa and Institute of Computational Linguistics of CNR.

### Theoretical Foundations

- Pustejovsky, J. (1995). *The Generative Lexicon*. MIT Press.
- Pustejovsky, J. (2006). Type Theory and Lexical Decomposition. *Journal of Cognitive Science*.
- Fillmore, C. J. (1982). Frame Semantics. In *Linguistics in the Morning Calm*.
- Masolo, C., Borgo, S., Gangemi, A., Guarino, N., & Oltramari, A. (2003). *Wonderweb deliverable D18, ontology library (final)*.

### Frame-Native DUL Architecture

- FrameNet Brasil + DUL Integration - Frame-Native Architecture Specification v2.0 (2025)

---

## Conclusion

This documentation preserves all existing TQR relations as micro-frames while providing a unified, extensible framework. The 46 implemented micro-frames continue to function exactly as before, while the 26 SIMPLE relations under analysis can be added systematically using the same structure.

The micro-frame approach maintains backward compatibility while enabling the frame-native architecture's benefits:

- **Uniformity**: All relations use the same FE-to-FE mechanism
- **Extensibility**: New micro-frames can be added without schema changes
- **Semantic richness**: Each micro-frame is a full frame with definition and constraints
- **Frame-native**: Relations themselves are frames, achieving complete conceptual uniformity

**Status**: Complete documentation of all TQR relations (implemented and under analysis)  
**Date**: October 21, 2025  
**Version**: 1.0  
**Authors**: FrameNet Brasil Team

---

## Appendix: Quick Reference Tables

### All Implemented Micro-Frames by Background Frame

| Background Frame | Info | Qualia Type | FE1 | FE2 |
|------------------|------|-------------|-----|-----|
| Afetar_intencionalmente | afetado_agentivamente_por | Agentive | Paciente | Agente |
| Agir_intencionalmente | causado_agentivamente_por | Agentive | Ação | Agente |
| Agir_intencionalmente | é_atividade_constitutiva_de | Constitutive | Ação | Agente |
| Agir_intencionalmente | é_a_atividade_de | Telic | Ação | Agente |
| Associação | tem_como_membro | Constitutive | Grupo | Membro |
| Atributos | tem_como_atributo_constitutivo | Constitutive | Entidade | Atributo |
| Capacidade_ação | é_a_habilidade_de | Telic | Evento | Entidade |
| Causalidade | causado_agentivamente_por | Agentive | Efeito | Ator |
| Causalidade | causado_por | Agentive | Efeito | Causa |
| Causalidade | causa_naturalmente | Constitutive | Ator | Afetado |
| Causar_condição_em_saúde | causa_naturalmente | Agentive | Causa_da_condição_em_saúde | Condição_em_saúde |
| Causar_iniciar | causa_reação | Agentive | Causa | Efeito |
| Conter | contém | Constitutive | Recipiente | Conteúdos |
| Costume | é_o_hábito_de | Telic | Comportamento | Protagonista |
| Criar | produz_naturalmente | Constitutive | Criador | Entidade_criada |
| Criar_intencionalmente | criado_por | Agentive | Entidade_criada | Criador |
| Criar_intencionalmente | objeto_da_atividade | Telic | Entidade_criada | Criador |
| Criação_culinária | criado_por | Agentive | Comida_produzida | Cozinheiro |
| Empregar | é_o_lugar_de | Constitutive | Empregador | Empregado |
| Exemplar | instância_de | Formal | Exemplar | Tipo |
| Finalidade | propósito | Telic | Alvo | Agente |
| Finalidade_do_utensílio | propósito_de | Telic | Finalidade | Utensílio |
| Idiossincrasia | idiossincrasia_de | Constitutive | Idiossincrasia | Entidade |
| Inclusão | inclui | Constitutive | Total | Parte |
| Infectar | é_causa_de | Agentive | Causa_Infecção | Infecção |
| Influência_objetiva | afeta | Constitutive | Entidade_influenciadora | Entidade_dependente |
| Infraestrutura | tem | Constitutive | Infraestrutura | Usuário |
| Infraestrutura | é_a_atividade_executada_em | Telic | Atividade | Infraestrutura |
| Ingredientes | é_feito_de | Constitutive | Produto | Material |
| Inovar | criado_por | Agentive | Nova_ideia | Pensador |
| Parentesco | parentesco | Constitutive | Ego | Alter |
| Parte_elemento | tem_como_parte | Constitutive | Substância | Elemento |
| Parte_interior_exterior | tem_como_parte | Constitutive | Todo | Parte |
| Parte_todo | tem_como_parte | Constitutive | Todo | Parte |
| Pessoas_por_origem | tem_origem | Constitutive | Pessoa | Origem |
| Pessoas_por_religião | é_um_seguidor_de | Constitutive | Pessoa | Religião |
| Relação | relacionado_a | Constitutive | Entidade_1 | Entidade_2 |
| Relação_condição_sintoma | tem | Constitutive | Condição_em_saúde | Sintoma |
| Residência | tem_como_residente | Constitutive | Local | Residente |
| Resolver_problema | resolvido_por | Agentive | Problema | Agente |
| Subpartes_de_prédios | tem_como_parte_predial | Constitutive | Todo | Parte |
| Tipo | tipo_de | Formal | Subtipo | Categoria |
| Usar | usa_para | Telic | Agente | Finalidade |
| Usar_recurso | usa | Constitutive | Agente | Recurso |
| Usar_recurso | usado_por | Telic | Recurso | Agente |
| Vício | vício_de | Telic | Vício | Viciado |

### All SIMPLE Micro-Frames Under Analysis

| Relation Name | Qualia Type | SIMPLE Example | Status |
|---------------|-------------|----------------|--------|
| AffectedBy | Agentive | Climate :: deforestation | Under analysis |
| AgentiveExperience | Agentive | fear :: feel | Under analysis |
| AgentiveProg | Agentive | Pedestrian :: walk | Under analysis |
| ResultOf | Agentive | Loss :: loose | Under analysis |
| Source | Agentive | Law :: society | Under analysis |
| DerivedFrom | Agentive | Petrol :: oil | Under analysis |
| HasAsMember | Constitutive | Flock :: bird | Under analysis |
| HasAsPart | Constitutive | Airplane :: wing | Under analysis |
| Instrument | Constitutive | Ski :: ski | Under analysis |
| ResultingState | Constitutive | die :: died | Under analysis |
| TypicalLocation | Constitutive | oasis :: desert | Under analysis |
| Affects | Constitutive | heat :: temperature | Under analysis |
| Concerns | Constitutive | Hepatitis :: liver | Under analysis |
| Contains | Constitutive | Book :: information | Under analysis |
| HasAsColour | Constitutive | Apple :: red | Under analysis |
| HasAsEffect | Constitutive | Tempestade :: trovão | Under analysis |
| HasAsProperty | Constitutive | intelligent :: Intelligence | Under analysis |
| MeasuredBy | Constitutive | Temperature :: degree | Under analysis |
| PropertyOf | Constitutive | Intelligence :: intelligent | Under analysis |
| Quantifies | Constitutive | bottle :: liquid | Under analysis |
| Regulates | Constitutive | Rule :: play | Under analysis |
| SuccessorOf | Constitutive | Two :: one | Under analysis |
| TypicalOf | Constitutive | measles :: child | Under analysis |
| IndirectTelic | Telic | eye :: see | Under analysis |
| UsedAs | Telic | wood :: material | Under analysis |
| UsedAgainst | Telic | Quimioterapy :: cancer | Under analysis |

---

## Appendix: Glossary

**Agentive Qualia**: Relations concerning the origin, creation, or coming into being of an entity

**Arity**: The number of Frame Elements in a frame; micro-frames always have arity = 2

**Background Frame**: In TQR, the frame that provides semantic structure to a qualia relation; becomes the micro-frame itself in the new architecture

**Constitutive Qualia**: Relations concerning the internal constitution, parts, or inherent properties of an entity

**FE (Frame Element)**: A typed slot in a frame representing a participant, property, or circumstance

**Formal Qualia**: Relations concerning taxonomic classification and distinguishing characteristics

**Host Frame**: The frame containing FEs that are related via a micro-frame (for intra-frame relations); NULL for inter-frame relations

**Inter-Frame Relation**: A relation connecting FEs from different frames, typically Target FEs

**Intra-Frame Relation**: A relation connecting FEs within the same frame

**LU (Lexical Unit)**: A pairing of a lemma with a frame; in frame-native architecture, LUs are themselves frames

**Micro-Frame**: A binary relation frame (arity = 2) that defines connections between Frame Elements

**Qualia Structure**: The multi-dimensional characterization of lexical meaning via four qualia roles (from Generative Lexicon Theory)

**Target FE**: A special Frame Element representing what a frame is fundamentally about; every frame has exactly one Target FE

**Telic Qualia**: Relations concerning the purpose, function, or goal of an entity

**TQR (Ternary Qualia Relations)**: The previous system in FNBr where relations between LUs were mediated by background frames

---

## Appendix: Comparison with Related Approaches

### TQR vs. Micro-Frames

| Aspect | TQR (Old) | Micro-Frames (New) |
|--------|-----------|-------------------|
| **Conceptual model** | Background frames mediate LU relations | Relations ARE frames |
| **Relation storage** | Separate EntityRelation table | Unified fe_relation table |
| **Scope** | Primarily LU-to-LU | All FE-to-FE (intra-frame and inter-frame) |
| **Frame-to-frame relations** | Separate mechanism | Same mechanism (via Target FEs) |
| **Extensibility** | Add to EntityRelation types | Add new micro-frames |
| **Uniformity** | Mixed levels | Complete uniformity |

### Micro-Frames vs. Framester

| Aspect | Framester | FNBr Micro-Frames |
|--------|-----------|-------------------|
| **Architecture** | Hub with mappings to multiple ontologies | Direct DUL integration |
| **Representation** | Heterogeneous (multiple formalisms) | Frame-native (everything is frames) |
| **Relations** | Various mechanisms | Single micro-frame mechanism |
| **Complexity** | Translation layers needed | No translation needed |
| **Focus** | Interoperability across resources | Deep semantic integration |

### Micro-Frames vs. Traditional Ontologies (OWL)

| Aspect | OWL Ontologies | FNBr Micro-Frames |
|--------|----------------|-------------------|
| **Relations** | Binary properties (requires reification for n-ary) | Native binary via micro-frames |
| **Linguistic grounding** | Limited | Rich corpus-based grounding |
| **Reasoning** | Description Logic | Graph-based + frame semantics |
| **Standards** | Semantic Web standards | FrameNet + DUL standards |
| **Usage** | Formal reasoning, inference | NLU, semantic parsing, annotation |

---

## Appendix: Future Directions

### 1. Complete SIMPLE Integration

**Goal**: Implement all 26 SIMPLE micro-frames currently under analysis

**Tasks**:
- Define background frames for each SIMPLE relation
- Create frame definitions and constraints
- Populate with example LU relations from corpora
- Validate against SIMPLE specifications

**Timeline**: Phase 1 implementation

---

### 2. Cross-Linguistic Expansion

**Goal**: Extend micro-frames to multiple languages beyond Portuguese

**Tasks**:
- Document micro-frame applicability across languages
- Identify language-specific micro-frames
- Create translation equivalence micro-frames
- Validate with multilingual corpora

**Timeline**: Phase 2 implementation

---

### 3. Automatic Relation Discovery

**Goal**: Use NLP techniques to discover and suggest new micro-frame relations

**Tasks**:
- Develop pattern mining algorithms for corpus data
- Implement relation extraction using contextualized embeddings
- Create validation workflow for proposed relations
- Integration with annotation tools

**Timeline**: Research phase

---

### 4. Ontology Alignment

**Goal**: Align FNBr micro-frames with other lexical resources

**Tasks**:
- Map to WordNet relations (hypernym, meronym, etc.)
- Align with VerbNet thematic roles
- Connect to PropBank argument structures
- Link to BabelNet synsets

**Timeline**: Phase 3 implementation

---

### 5. Application Development

**Goal**: Leverage micro-frames for NLP applications

**Applications**:
- Enhanced semantic role labeling
- Relation extraction for knowledge graphs
- Question answering with inference
- Machine translation with semantic awareness
- Text entailment recognition

**Timeline**: Ongoing

---

## Appendix: Contact and Contribution

### FrameNet Brasil Team

**Principal Investigators**:
- Prof. Dr. Tiago Torrent (UFJF)
- Prof. Dr. Ely Matos (UFJF)

**Website**: [https://framenetbr.ufjf.br/](https://framenetbr.ufjf.br/)

**GitHub**: [https://github.com/FrameNetBrasil](https://github.com/FrameNetBrasil)

**Documentation**: [https://elymatos.github.io/fn3/](https://elymatos.github.io/fn3/)

### How to Contribute

1. **Report Issues**: Use GitHub issues to report errors or inconsistencies in micro-frame definitions

2. **Propose New Micro-Frames**: Submit proposals with:
    - Qualia type
    - Frame Elements definition
    - Semantic description
    - Examples from corpora
    - Justification for inclusion

3. **Corpus Annotation**: Contribute annotated examples of micro-frame relations in use

4. **Cross-Linguistic Data**: Provide examples and validation for languages beyond Portuguese

5. **Application Development**: Share applications leveraging micro-frames

---

## Appendix: Version History

### Version 1.0 (October 21, 2025)

**Initial Release**
- Complete documentation of 46 implemented micro-frames
- Documentation of 26 SIMPLE micro-frames under analysis
- Migration guide from TQR to micro-frames
- Database schema specification
- Usage examples and reference tables

**Contributors**:
- FrameNet Brasil Team
- Claude AI (Documentation assistance)

---

## Document Information

**Filename**: `Micro-Frames_Documentation_FNBr_v1.0.md`

**Format**: Markdown

**License**: CC BY-NC 4.0 (Attribution-NonCommercial)

**Citation**:
```
FrameNet Brasil Team (2025). Micro-Frames Documentation for FrameNet Brasil, 
Version 1.0. Federal University of Juiz de Fora, Brazil.
```

**Last Updated**: October 21, 2025

**Document Size**: ~50 pages (when converted to PDF)

---

## Notes for Implementation

### Priority Order

1. **Phase 0: Database Migration** (Immediate)
    - Migrate existing TQR to micro-frame schema
    - Validate data integrity
    - Test query performance
    - Update web tool interfaces

2. **Phase 1: SIMPLE Integration** (3-6 months)
    - Implement highest priority SIMPLE micro-frames
    - Focus on Agentive: AffectedBy, ResultOf, Source
    - Focus on Constitutive: HasAsPart, Instrument, ResultingState
    - Focus on Telic: IndirectTelic

3. **Phase 2: Validation** (6-12 months)
    - Corpus-based validation of all micro-frames
    - Inter-annotator agreement studies
    - Cross-linguistic validation
    - Application-based evaluation

4. **Phase 3: Enhancement** (12+ months)
    - Additional micro-frames based on corpus evidence
    - Advanced inference mechanisms
    - Integration with external resources
    - Scaling to production

### Testing Requirements

**Unit Tests**:
- Micro-frame structure validation
- FE relation creation and queries
- Target FE uniqueness constraints
- Arity constraints for micro-frames

**Integration Tests**:
- TQR to micro-frame migration completeness
- Query equivalence (old vs. new)
- Web tool functionality
- API compatibility

**Performance Tests**:
- Query performance benchmarks
- Large-scale relation traversal
- Neo4j sync performance
- Annotation tool responsiveness

---

## Section 8: DUL Ontology Properties as Micro-Frames

With the integration of the DUL (DOLCE+DnS Ultralite) ontology into FrameNet Brasil's frame-native architecture, all DUL object properties must be represented as micro-frames. This section documents the complete set of DUL properties transformed into micro-frames.

### 8.1 Core Association Properties

These micro-frames define fundamental relationships in DUL.

---

#### 8.1.1 associatedWith

**Type**: DUL Property (Top-level)  
**Background Frame**: *DUL_Association*  
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#associatedWith`

**Frame Elements**:
- **FE1**: Entity_1 (any DUL Entity)
- **FE2**: Entity_2 (any DUL Entity)

**Semantics**: Entity_1 is associated with Entity_2 in any way

**DUL Definition**: A catch-all property for any association between entities. This is the top-level property from which all other DUL properties are typically sub-properties.

**Note**: This is an abstract property; more specific sub-properties should be used when possible

**Status**: DUL core property

---

### 8.2 Participation Properties

These micro-frames define relationships between events and their participants.

---

#### 8.2.1 hasParticipant

**Type**: DUL Property  
**Background Frame**: *DUL_Participation*  
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#hasParticipant`

**Frame Elements**:
- **FE1**: Event (DUL Event)
- **FE2**: Participant (DUL Object)

**Semantics**: Event has Participant as a participant

**DUL Definition**: A relation between an Event and an Object that participates in it, e.g. 'a cook, some sugar, flour, etc. are all present in the cooking of a cake'

**Inverse**: isParticipantIn

**Examples**:
```
Cooking_event.Target --hasParticipant--> Cook.Target
Cooking_event.Target --hasParticipant--> Sugar.Target
```

**Status**: DUL core property

---

#### 8.2.2 isParticipantIn

**Type**: DUL Property  
**Background Frame**: *DUL_Participation*  
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#isParticipantIn`

**Frame Elements**:
- **FE1**: Participant (DUL Object)
- **FE2**: Event (DUL Event)

**Semantics**: Participant participates in Event

**DUL Definition**: Inverse of hasParticipant

**Inverse**: hasParticipant

**Examples**:
```
Cook.Target --isParticipantIn--> Cooking_event.Target
```

**Status**: DUL core property

---

### 8.3 Mereological Properties (Part-Whole)

These micro-frames define part-whole relationships.

---

#### 8.3.1 hasPart

**Type**: DUL Property  
**Background Frame**: *DUL_Parthood*  
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#hasPart`

**Frame Elements**:
- **FE1**: Whole (DUL Entity)
- **FE2**: Part (DUL Entity)

**Semantics**: Whole has Part as a component

**DUL Definition**: A relation between any entities, e.g. 'the human body has a brain as part'. Parthood is assumed as reflexive, transitive, and antisymmetric.

**Properties**: Reflexive, Transitive, Antisymmetric

**Inverse**: isPartOf

**Examples**:
```
Human_body.Target --hasPart--> Brain.Target
Car.Target --hasPart--> Engine.Target
```

**Status**: DUL core property

---

#### 8.3.2 isPartOf

**Type**: DUL Property  
**Background Frame**: *DUL_Parthood*  
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#isPartOf`

**Frame Elements**:
- **FE1**: Part (DUL Entity)
- **FE2**: Whole (DUL Entity)

**Semantics**: Part is a component of Whole

**DUL Definition**: Inverse of hasPart

**Properties**: Reflexive, Transitive

**Inverse**: hasPart

**Examples**:
```
Brain.Target --isPartOf--> Human_body.Target
```

**Status**: DUL core property

---

#### 8.3.3 hasProperPart

**Type**: DUL Property  
**Background Frame**: *DUL_Proper_Parthood*  
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#hasProperPart`

**Frame Elements**:
- **FE1**: Whole (DUL Entity)
- **FE2**: Proper_part (DUL Entity)

**Semantics**: Whole has Proper_part as a proper (non-reflexive) part

**DUL Definition**: A relation between any entities, where the part is distinct from the whole. Proper parthood is irreflexive, asymmetric, and transitive.

**Properties**: Irreflexive, Asymmetric, Transitive

**Note**: Sub-property of hasPart

**Examples**:
```
Human_body.Target --hasProperPart--> Arm.Target
(but NOT: Human_body.Target --hasProperPart--> Human_body.Target)
```

**Status**: DUL core property

---

#### 8.3.4 hasComponent

**Type**: DUL Property  
**Background Frame**: *DUL_Component*  
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#hasComponent`

**Frame Elements**:
- **FE1**: Whole (DUL Entity)
- **FE2**: Component (DUL Entity)

**Semantics**: Whole has Component as a functional/structural component

**DUL Definition**: A relation between any entities that have a component, e.g. 'the car has an engine as component'

**Note**: Sub-property of hasPart, emphasizes functional/structural role

**Inverse**: isComponentOf

**Status**: DUL core property

---

#### 8.3.5 isComponentOf

**Type**: DUL Property  
**Background Frame**: *DUL_Component*  
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#isComponentOf`

**Frame Elements**:
- **FE1**: Component (DUL Entity)
- **FE2**: Whole (DUL Entity)

**Semantics**: Component is a functional/structural component of Whole

**DUL Definition**: Inverse of hasComponent

**Inverse**: hasComponent

**Status**: DUL core property

---

#### 8.3.6 hasConstituent

**Type**: DUL Property  
**Background Frame**: *DUL_Constitution*  
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#hasConstituent`

**Frame Elements**:
- **FE1**: Whole (DUL Entity)
- **FE2**: Constituent (DUL Entity)

**Semantics**: Whole has Constituent as a material constituent

**DUL Definition**: A relation between entities, typically for material constitution

**Inverse**: isConstituentOf

**Status**: DUL core property

---

#### 8.3.7 isConstituentOf

**Type**: DUL Property  
**Background Frame**: *DUL_Constitution*  
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#isConstituentOf`

**Frame Elements**:
- **FE1**: Constituent (DUL Entity)
- **FE2**: Whole (DUL Entity)

**Semantics**: Constituent materially constitutes Whole

**DUL Definition**: Inverse of hasConstituent

**Inverse**: hasConstituent

**Status**: DUL core property

---

### 8.4 Collection and Membership Properties

---

#### 8.4.1 hasMember

**Type**: DUL Property  
**Background Frame**: *DUL_Membership*  
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#hasMember`

**Frame Elements**:
- **FE1**: Collection (DUL Collection)
- **FE2**: Member (DUL Entity)

**Semantics**: Collection has Member as a member

**DUL Definition**: A relation between collections and their members, e.g. 'the flock has several birds as members'

**Inverse**: isMemberOf

**Examples**:
```
Orchestra.Target --hasMember--> Musician.Target
Team.Target --hasMember--> Player.Target
```

**Status**: DUL core property

---

#### 8.4.2 isMemberOf

**Type**: DUL Property  
**Background Frame**: *DUL_Membership*  
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#isMemberOf`

**Frame Elements**:
- **FE1**: Member (DUL Entity)
- **FE2**: Collection (DUL Collection)

**Semantics**: Member belongs to Collection

**DUL Definition**: Inverse of hasMember

**Inverse**: hasMember

**Status**: DUL core property

---

### 8.5 Quality and Region Properties

---

#### 8.5.1 hasQuality

**Type**: DUL Property  
**Background Frame**: *DUL_Quality_Attribution*  
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#hasQuality`

**Frame Elements**:
- **FE1**: Entity (DUL Entity)
- **FE2**: Quality (DUL Quality)

**Semantics**: Entity has Quality as a quality/attribute

**DUL Definition**: A relation between entities and qualities, e.g. 'John has the quality of being tall'

**Inverse**: isQualityOf

**Examples**:
```
Person.Target --hasQuality--> Height.Target
Object.Target --hasQuality--> Color.Target
```

**Status**: DUL core property

---

#### 8.5.2 isQualityOf

**Type**: DUL Property  
**Background Frame**: *DUL_Quality_Attribution*  
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#isQualityOf`

**Frame Elements**:
- **FE1**: Quality (DUL Quality)
- **FE2**: Entity (DUL Entity)

**Semantics**: Quality is an attribute of Entity

**DUL Definition**: Inverse of hasQuality

**Inverse**: hasQuality

**Status**: DUL core property

---

#### 8.5.3 hasRegion

**Type**: DUL Property  
**Background Frame**: *DUL_Region_Attribution*  
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#hasRegion`

**Frame Elements**:
- **FE1**: Entity (DUL Entity)
- **FE2**: Region (DUL Region)

**Semantics**: Entity is located at or has value in Region

**DUL Definition**: A relation between entities and regions, e.g. 'the whale has been localized at 34 degrees E, 20 degrees S'

**Inverse**: isRegionFor

**Examples**:
```
Whale.Target --hasRegion--> Geographic_coordinates.Target
Temperature_quality.Target --hasRegion--> Temperature_region.Target
```

**Status**: DUL core property

---

#### 8.5.4 isRegionFor

**Type**: DUL Property  
**Background Frame**: *DUL_Region_Attribution*  
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#isRegionFor`

**Frame Elements**:
- **FE1**: Region (DUL Region)
- **FE2**: Entity (DUL Entity)

**Semantics**: Region is a region for Entity

**DUL Definition**: Inverse of hasRegion

**Inverse**: hasRegion

**Status**: DUL core property

---

### 8.6 Spatial Properties

---

#### 8.6.1 hasLocation

**Type**: DUL Property  
**Background Frame**: *DUL_Location*  
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#hasLocation`

**Frame Elements**:
- **FE1**: Entity (DUL Entity)
- **FE2**: Location (DUL Entity)

**Semantics**: Entity is located at Location

**DUL Definition**: A generic, relative location relation, holding between any entities. E.g. 'Rome is located in Italy', 'the cat is on the mat', etc.

**Inverse**: isLocationOf

**Examples**:
```
Rome.Target --hasLocation--> Italy.Target
Cat.Target --hasLocation--> Mat.Target
```

**Status**: DUL core property

---

#### 8.6.2 isLocationOf

**Type**: DUL Property  
**Background Frame**: *DUL_Location*  
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#isLocationOf`

**Frame Elements**:
- **FE1**: Location (DUL Entity)
- **FE2**: Entity (DUL Entity)

**Semantics**: Location is the location of Entity

**DUL Definition**: Inverse of hasLocation

**Inverse**: hasLocation

**Status**: DUL core property

---

#### 8.6.3 overlaps

**Type**: DUL Property  
**Background Frame**: *DUL_Overlap*  
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#overlaps`

**Frame Elements**:
- **FE1**: Entity_1 (DUL Entity)
- **FE2**: Entity_2 (DUL Entity)

**Semantics**: Entity_1 spatially or temporally overlaps with Entity_2

**DUL Definition**: A relation of spatial or temporal overlap between entities

**Properties**: Symmetric

**Examples**:
```
Meeting1.Target --overlaps--> Meeting2.Target
Region1.Target --overlaps--> Region2.Target
```

**Status**: DUL core property

---

#### 8.6.4 hasCommonBoundary

**Type**: DUL Property  
**Background Frame**: *DUL_Common_Boundary*  
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#hasCommonBoundary`

**Frame Elements**:
- **FE1**: Entity_1 (DUL Entity)
- **FE2**: Entity_2 (DUL Entity)

**Semantics**: Entity_1 shares a boundary with Entity_2

**DUL Definition**: A relation between entities that share a common boundary

**Properties**: Symmetric

**Examples**:
```
France.Target --hasCommonBoundary--> Germany.Target
```

**Status**: DUL core property

---

#### 8.6.5 nearTo

**Type**: DUL Property  
**Background Frame**: *DUL_Proximity*  
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#nearTo`

**Frame Elements**:
- **FE1**: Entity_1 (DUL Entity)
- **FE2**: Entity_2 (DUL Entity)

**Semantics**: Entity_1 is spatially near to Entity_2

**DUL Definition**: A spatial proximity relation

**Properties**: Symmetric

**Examples**:
```
House.Target --nearTo--> School.Target
```

**Status**: DUL core property

---

#### 8.6.6 farFrom

**Type**: DUL Property  
**Background Frame**: *DUL_Distance*  
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#farFrom`

**Frame Elements**:
- **FE1**: Entity_1 (DUL Entity)
- **FE2**: Entity_2 (DUL Entity)

**Semantics**: Entity_1 is spatially far from Entity_2

**DUL Definition**: A spatial distance relation

**Properties**: Symmetric

**Examples**:
```
Earth.Target --farFrom--> Mars.Target
```

**Status**: DUL core property

---

### 8.7 Temporal Properties

---

#### 8.7.1 hasTimeInterval

**Type**: DUL Property  
**Background Frame**: *DUL_Temporal_Extension*  
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#hasTimeInterval`

**Frame Elements**:
- **FE1**: Entity (DUL Entity)
- **FE2**: Time_interval (DUL TimeInterval)

**Semantics**: Entity occurs during or is associated with Time_interval

**DUL Definition**: A relation between entities and time intervals

**Inverse**: isTimeIntervalOf

**Examples**:
```
Event.Target --hasTimeInterval--> TimeInterval.Target
Meeting.Target --hasTimeInterval--> Morning_interval.Target
```

**Status**: DUL core property

---

#### 8.7.2 isObservableAt

**Type**: DUL Property  
**Background Frame**: *DUL_Observation_Time*  
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#isObservableAt`

**Frame Elements**:
- **FE1**: Entity (DUL Entity)
- **FE2**: Time_interval (DUL TimeInterval)

**Semantics**: Entity can be observed at Time_interval

**DUL Definition**: A relation between entities and the time when they can be observed

**Inverse**: isTimeOfObservationOf

**Status**: DUL core property

---

#### 8.7.3 precedes

**Type**: DUL Property  
**Background Frame**: *DUL_Temporal_Precedence*  
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#precedes`

**Frame Elements**:
- **FE1**: Earlier_entity (DUL Entity)
- **FE2**: Later_entity (DUL Entity)

**Semantics**: Earlier_entity temporally precedes Later_entity

**DUL Definition**: A temporal precedence relation

**Properties**: Transitive

**Inverse**: follows

**Examples**:
```
Event1.Target --precedes--> Event2.Target
Morning.Target --precedes--> Afternoon.Target
```

**Status**: DUL core property

---

#### 8.7.4 follows

**Type**: DUL Property  
**Background Frame**: *DUL_Temporal_Succession*  
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#follows`

**Frame Elements**:
- **FE1**: Later_entity (DUL Entity)
- **FE2**: Earlier_entity (DUL Entity)

**Semantics**: Later_entity temporally follows Earlier_entity

**DUL Definition**: Inverse of precedes

**Properties**: Transitive

**Inverse**: precedes

**Status**: DUL core property

---

#### 8.7.5 directlyPrecedes

**Type**: DUL Property  
**Background Frame**: *DUL_Direct_Precedence*  
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#directlyPrecedes`

**Frame Elements**:
- **FE1**: Earlier_entity (DUL Entity)
- **FE2**: Later_entity (DUL Entity)

**Semantics**: Earlier_entity immediately precedes Later_entity with no intervening entity

**DUL Definition**: A direct temporal precedence relation

**Note**: Sub-property of precedes

**Inverse**: directlyFollows

**Examples**:
```
Step1.Target --directlyPrecedes--> Step2.Target
```

**Status**: DUL core property

---

#### 8.7.6 directlyFollows

**Type**: DUL Property  
**Background Frame**: *DUL_Direct_Succession*  
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#directlyFollows`

**Frame Elements**:
- **FE1**: Later_entity (DUL Entity)
- **FE2**: Earlier_entity (DUL Entity)

**Semantics**: Later_entity immediately follows Earlier_entity with no intervening entity

**DUL Definition**: Inverse of directlyPrecedes

**Note**: Sub-property of follows

**Inverse**: directlyPrecedes

**Status**: DUL core property

---

### 8.8 Description and Situation Properties (DnS Pattern)

These micro-frames implement the Descriptions and Situations (DnS) pattern, which is central to DUL.

---

#### 8.8.1 defines

**Type**: DUL Property  
**Background Frame**: *DUL_Definition*  
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#defines`

**Frame Elements**:
- **FE1**: Description (DUL Description)
- **FE2**: Concept (DUL Concept)

**Semantics**: Description defines Concept

**DUL Definition**: A relation between a Description and a Concept that it defines

**Inverse**: isDefinedIn

**Examples**:
```
Traffic_law.Target --defines--> Driver_role.Target
Recipe.Target --defines--> Cooking_task.Target
```

**Status**: DUL core property

---

#### 8.8.2 isDefinedIn

**Type**: DUL Property  
**Background Frame**: *DUL_Definition*  
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#isDefinedIn`

**Frame Elements**:
- **FE1**: Concept (DUL Concept)
- **FE2**: Description (DUL Description)

**Semantics**: Concept is defined in Description

**DUL Definition**: Inverse of defines

**Inverse**: defines

**Status**: DUL core property

---

#### 8.8.3 satisfies

**Type**: DUL Property  
**Background Frame**: *DUL_Satisfaction*  
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#satisfies`

**Frame Elements**:
- **FE1**: Situation (DUL Situation)
- **FE2**: Description (DUL Description)

**Semantics**: Situation satisfies (instantiates/realizes) Description

**DUL Definition**: A relation between a Situation and a Description, where the situation is a realization of the description

**Inverse**: isSatisfiedBy

**Examples**:
```
Actual_trip.Target --satisfies--> Travel_plan.Target
Cooking_situation.Target --satisfies--> Recipe.Target
```

**Status**: DUL core property

---

#### 8.8.4 isSatisfiedBy

**Type**: DUL Property  
**Background Frame**: *DUL_Satisfaction*  
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#isSatisfiedBy`

**Frame Elements**:
- **FE1**: Description (DUL Description)
- **FE2**: Situation (DUL Situation)

**Semantics**: Description is satisfied by Situation

**DUL Definition**: Inverse of satisfies

**Inverse**: satisfies

**Status**: DUL core property

---

#### 8.8.5 describes

**Type**: DUL Property  
**Background Frame**: *DUL_Description_Relation*  
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#describes`

**Frame Elements**:
- **FE1**: Description (DUL Description)
- **FE2**: Entity (DUL Entity)

**Semantics**: Description describes Entity

**DUL Definition**: A relation between a description and any entity it describes

**Inverse**: isDescribedBy

**Examples**:
```
Biography.Target --describes--> Person.Target
Manual.Target --describes--> Machine.Target
```

**Status**: DUL core property

---

#### 8.8.6 isDescribedBy

**Type**: DUL Property  
**Background Frame**: *DUL_Description_Relation*  
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#isDescribedBy`

**Frame Elements**:
- **FE1**: Entity (DUL Entity)
- **FE2**: Description (DUL Description)

**Semantics**: Entity is described by Description

**DUL Definition**: Inverse of describes

**Inverse**: describes

**Status**: DUL core property

---

#### 8.8.7 hasSetting

**Type**: DUL Property  
**Background Frame**: *DUL_Setting*  
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#hasSetting`

**Frame Elements**:
- **FE1**: Entity (DUL Entity)
- **FE2**: Situation (DUL Situation)

**Semantics**: Entity is framed within Situation

**DUL Definition**: A relation between entities and situations that provide the context for them

**Inverse**: isSettingFor

**Examples**:
```
Event.Target --hasSetting--> Context_situation.Target
```

**Status**: DUL core property

---

#### 8.8.8 isSettingFor

**Type**: DUL Property  
**Background Frame**: *DUL_Setting*  
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#isSettingFor`

**Frame Elements**:
- **FE1**: Situation (DUL Situation)
- **FE2**: Entity (DUL Entity)

**Semantics**: Situation provides the context for Entity

**DUL Definition**: Inverse of hasSetting

**Inverse**: hasSetting

**Status**: DUL core property

---

### 8.9 Classification and Conceptualization Properties

---

#### 8.9.1 classifies

**Type**: DUL Property  
**Background Frame**: *DUL_Classification*  
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#classifies`

**Frame Elements**:
- **FE1**: Concept (DUL Concept)
- **FE2**: Entity (DUL Entity)

**Semantics**: Concept classifies Entity

**DUL Definition**: A relation between a concept and an entity that it classifies

**Inverse**: isClassifiedBy

**Examples**:
```
Driver_role.Target --classifies--> John.Target
Student_role.Target --classifies--> Mary.Target
```

**Status**: DUL core property

---

#### 8.9.2 isClassifiedBy

**Type**: DUL Property  
**Background Frame**: *DUL_Classification*  
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#isClassifiedBy`

**Frame Elements**:
- **FE1**: Entity (DUL Entity)
- **FE2**: Concept (DUL Concept)

**Semantics**: Entity is classified by Concept

**DUL Definition**: Inverse of classifies

**Inverse**: classifies

**Status**: DUL core property

---

#### 8.9.3 conceptualizes

**Type**: DUL Property  
**Background Frame**: *DUL_Conceptualization*  
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#conceptualizes`

**Frame Elements**:
- **FE1**: Social_object (DUL SocialObject)
- **FE2**: Entity (DUL Entity)

**Semantics**: Social_object conceptualizes Entity

**DUL Definition**: A relation between social objects (e.g. concepts, norms) and entities they conceptualize

**Inverse**: isConceptualizedBy

**Examples**:
```
Traffic_law.Target --conceptualizes--> Driving_behavior.Target
```

**Status**: DUL core property

---

#### 8.9.4 isConceptualizedBy

**Type**: DUL Property  
**Background Frame**: *DUL_Conceptualization*  
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#isConceptualizedBy`

**Frame Elements**:
- **FE1**: Entity (DUL Entity)
- **FE2**: Social_object (DUL SocialObject)

**Semantics**: Entity is conceptualized by Social_object

**DUL Definition**: Inverse of conceptualizes

**Inverse**: conceptualizes

**Status**: DUL core property

---

### 8.10 Role and Task Properties

These micro-frames define role assignment, task execution, and the DnS (Descriptions and Situations) pattern core relations.

---

#### 8.10.1 hasRole

**Type**: DUL Property
**Background Frame**: *DUL_Role_Assignment*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#hasRole`

**Frame Elements**:
- **FE1**: Object (DUL Object)
- **FE2**: Role (DUL Role)

**Semantics**: Object has Role

**DUL Definition**: A relation between an object and a role, e.g. the person 'John' has role 'student'

**Inverse**: isRoleOf

**Examples**:
```
John.Target --hasRole--> Student_role.Target
Doctor.Target --hasRole--> Healer_role.Target
```

**Status**: DUL core property

---

#### 8.10.2 isRoleOf

**Type**: DUL Property
**Background Frame**: *DUL_Role_Assignment*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#isRoleOf`

**Frame Elements**:
- **FE1**: Role (DUL Role)
- **FE2**: Object (DUL Object)

**Semantics**: Role is the role of Object

**DUL Definition**: A relation between an object and a role, e.g. 'student' is the role of 'John'

**Inverse**: hasRole

**Status**: DUL core property

---

#### 8.10.3 definesRole

**Type**: DUL Property
**Background Frame**: *DUL_Role_Definition*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#definesRole`

**Frame Elements**:
- **FE1**: Description (DUL Description)
- **FE2**: Role (DUL Role)

**Semantics**: Description defines Role

**DUL Definition**: A relation between a description and a role, e.g. the recipe for a cake defines the role 'ingredient'

**Inverse**: isRoleDefinedIn

**Examples**:
```
Recipe_frame.Target --definesRole--> Ingredient_role.Target
Employment_contract.Target --definesRole--> Employee_role.Target
```

**Status**: DUL core property

---

#### 8.10.4 isRoleDefinedIn

**Type**: DUL Property
**Background Frame**: *DUL_Role_Definition*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#isRoleDefinedIn`

**Frame Elements**:
- **FE1**: Role (DUL Role)
- **FE2**: Description (DUL Description)

**Semantics**: Role is defined in Description

**DUL Definition**: A relation between a description and a role, e.g. the role 'Ingredient' is defined in the recipe for a cake

**Inverse**: definesRole

**Status**: DUL core property

---

#### 8.10.5 hasTask

**Type**: DUL Property
**Background Frame**: *DUL_Task_Assignment*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#hasTask`

**Frame Elements**:
- **FE1**: Role (DUL Role)
- **FE2**: Task (DUL Task)

**Semantics**: Role has Task as a duty or responsibility

**DUL Definition**: A relation between roles and tasks, e.g. 'students have the duty of giving exams' (i.e. the Role 'student' hasTask the Task 'giving exams')

**Inverse**: isTaskOf

**Examples**:
```
Student_role.Target --hasTask--> Taking_exams.Target
Teacher_role.Target --hasTask--> Grading.Target
```

**Status**: DUL core property

---

#### 8.10.6 isTaskOf

**Type**: DUL Property
**Background Frame**: *DUL_Task_Assignment*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#isTaskOf`

**Frame Elements**:
- **FE1**: Task (DUL Task)
- **FE2**: Role (DUL Role)

**Semantics**: Task is a duty of Role

**DUL Definition**: A relation between roles and tasks, e.g. 'students have the duty of giving exams' (i.e. the Role 'student' hasTask the Task 'giving exams')

**Inverse**: hasTask

**Status**: DUL core property

---

#### 8.10.7 definesTask

**Type**: DUL Property
**Background Frame**: *DUL_Task_Definition*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#definesTask`

**Frame Elements**:
- **FE1**: Description (DUL Description)
- **FE2**: Task (DUL Task)

**Semantics**: Description defines Task

**DUL Definition**: A relation between a description and a task, e.g. the recipe for a cake defines the task 'boil'

**Inverse**: isTaskDefinedIn

**Examples**:
```
Recipe.Target --definesTask--> Boiling.Target
Job_description.Target --definesTask--> Report_writing.Target
```

**Status**: DUL core property

---

#### 8.10.8 isTaskDefinedIn

**Type**: DUL Property
**Background Frame**: *DUL_Task_Definition*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#isTaskDefinedIn`

**Frame Elements**:
- **FE1**: Task (DUL Task)
- **FE2**: Description (DUL Description)

**Semantics**: Task is defined in Description

**DUL Definition**: A relation between a description and a task, e.g. the task 'boil' is defined in a recipe for a cake

**Inverse**: definesTask

**Status**: DUL core property

---

#### 8.10.9 executesTask

**Type**: DUL Property
**Background Frame**: *DUL_Task_Execution*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#executesTask`

**Frame Elements**:
- **FE1**: Action (DUL Action)
- **FE2**: Task (DUL Task)

**Semantics**: Action executes Task

**DUL Definition**: A relation between an action and a task, e.g. 'putting some water in a pot and putting the pot on a fire until the water starts bubbling' executes the task 'boiling'

**Inverse**: isExecutedIn

**Examples**:
```
Concrete_boiling_action.Target --executesTask--> Boiling_task.Target
```

**Status**: DUL core property

---

### 8.11 Participation Properties

These micro-frames define participation relations between objects/agents and events/situations.

---

#### 8.11.1 hasParticipant

**Type**: DUL Property
**Background Frame**: *DUL_Participation*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#hasParticipant`

**Frame Elements**:
- **FE1**: Event (DUL Event)
- **FE2**: Object (DUL Object)

**Semantics**: Event has Object as a participant

**DUL Definition**: A relation between an object and a process, e.g. 'John took part in the discussion', 'a large mass of snow fell during the avalanche', or 'a cook, some sugar, flour, etc. are all present in the cooking of a cake'

**Inverse**: isParticipantIn

**Examples**:
```
Discussion_event.Target --hasParticipant--> John.Target
Cooking_event.Target --hasParticipant--> Chef.Target
```

**Status**: DUL core property

---

#### 8.11.2 isParticipantIn

**Type**: DUL Property
**Background Frame**: *DUL_Participation*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#isParticipantIn`

**Frame Elements**:
- **FE1**: Object (DUL Object)
- **FE2**: Event (DUL Event)

**Semantics**: Object participates in Event

**DUL Definition**: A relation between an object and a process, e.g. 'John took part in the discussion'

**Inverse**: hasParticipant

**Status**: DUL core property

---

#### 8.11.3 includesAgent

**Type**: DUL Property
**Background Frame**: *DUL_Agent_Inclusion*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#includesAgent`

**Frame Elements**:
- **FE1**: Situation (DUL Situation)
- **FE2**: Agent (DUL Agent)

**Semantics**: Situation includes Agent

**DUL Definition**: A relation between situations and persons, e.g. 'this morning I've prepared my coffee and had my fingers burnt' (i.e.: the preparation of my coffee this morning included me)

**Inverse**: isAgentIncludedIn

**Status**: DUL core property

---

#### 8.11.4 isAgentIncludedIn

**Type**: DUL Property
**Background Frame**: *DUL_Agent_Inclusion*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#isAgentIncludedIn`

**Frame Elements**:
- **FE1**: Agent (DUL Agent)
- **FE2**: Situation (DUL Situation)

**Semantics**: Agent is included in Situation

**DUL Definition**: Inverse of includesAgent

**Inverse**: includesAgent

**Status**: DUL core property

---

#### 8.11.5 includesEvent

**Type**: DUL Property
**Background Frame**: *DUL_Event_Inclusion*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#includesEvent`

**Frame Elements**:
- **FE1**: Situation (DUL Situation)
- **FE2**: Event (DUL Event)

**Semantics**: Situation includes Event

**DUL Definition**: A relation between situations and events, e.g. 'this morning I've prepared my coffee and had my fingers burnt' (i.e.: the preparation of my coffee this morning included a burning of my fingers)

**Inverse**: isEventIncludedIn

**Status**: DUL core property

---

#### 8.11.6 isEventIncludedIn

**Type**: DUL Property
**Background Frame**: *DUL_Event_Inclusion*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#isEventIncludedIn`

**Frame Elements**:
- **FE1**: Event (DUL Event)
- **FE2**: Situation (DUL Situation)

**Semantics**: Event is included in Situation

**DUL Definition**: Inverse of includesEvent

**Inverse**: includesEvent

**Status**: DUL core property

---

#### 8.11.7 includesObject

**Type**: DUL Property
**Background Frame**: *DUL_Object_Inclusion*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#includesObject`

**Frame Elements**:
- **FE1**: Situation (DUL Situation)
- **FE2**: Object (DUL Object)

**Semantics**: Situation includes Object

**DUL Definition**: A relation between situations and objects, e.g. 'this morning I've prepared my coffee and had my fingers burnt' (i.e.: the preparation of my coffee this morning included me)

**Inverse**: isObjectIncludedIn

**Status**: DUL core property

---

#### 8.11.8 isObjectIncludedIn

**Type**: DUL Property
**Background Frame**: *DUL_Object_Inclusion*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#isObjectIncludedIn`

**Frame Elements**:
- **FE1**: Object (DUL Object)
- **FE2**: Situation (DUL Situation)

**Semantics**: Object is included in Situation

**DUL Definition**: Inverse of includesObject

**Inverse**: includesObject

**Status**: DUL core property

---

### 8.12 Part-Whole Properties

These micro-frames define mereological (part-whole) relations.

---

#### 8.12.1 hasPart

**Type**: DUL Property
**Background Frame**: *DUL_Parthood*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#hasPart`

**Frame Elements**:
- **FE1**: Whole (DUL Entity)
- **FE2**: Part (DUL Entity)

**Semantics**: Whole has Part as a component

**DUL Definition**: Parthood relation between entities (both endurants and perdurants)

**Inverse**: isPartOf

**Examples**:
```
Car.Target --hasPart--> Engine.Target
Book.Target --hasPart--> Chapter.Target
```

**Status**: DUL core property

---

#### 8.12.2 isPartOf

**Type**: DUL Property
**Background Frame**: *DUL_Parthood*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#isPartOf`

**Frame Elements**:
- **FE1**: Part (DUL Entity)
- **FE2**: Whole (DUL Entity)

**Semantics**: Part is a component of Whole

**DUL Definition**: Inverse of hasPart

**Inverse**: hasPart

**Status**: DUL core property

---

#### 8.12.3 hasProperPart

**Type**: DUL Property
**Background Frame**: *DUL_Proper_Parthood*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#hasProperPart`

**Frame Elements**:
- **FE1**: Whole (DUL Entity)
- **FE2**: Proper_part (DUL Entity)

**Semantics**: Whole has Proper_part (where part ≠ whole)

**DUL Definition**: Proper parthood (asymmetric, irreflexive)

**Inverse**: isPropertPartOf

**Status**: DUL core property

---

#### 8.12.4 hasComponent

**Type**: DUL Property
**Background Frame**: *DUL_Component_Relation*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#hasComponent`

**Frame Elements**:
- **FE1**: System (DUL Entity)
- **FE2**: Component (DUL Entity)

**Semantics**: System has Component as a functional part

**DUL Definition**: Functional composition relation

**Inverse**: isComponentOf

**Examples**:
```
Computer.Target --hasComponent--> CPU.Target
Organization.Target --hasComponent--> Department.Target
```

**Status**: DUL core property

---

#### 8.12.5 isComponentOf

**Type**: DUL Property
**Background Frame**: *DUL_Component_Relation*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#isComponentOf`

**Frame Elements**:
- **FE1**: Component (DUL Entity)
- **FE2**: System (DUL Entity)

**Semantics**: Component is a functional part of System

**DUL Definition**: Inverse of hasComponent

**Inverse**: hasComponent

**Status**: DUL core property

---

#### 8.12.6 hasConstituent

**Type**: DUL Property
**Background Frame**: *DUL_Constitution*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#hasConstituent`

**Frame Elements**:
- **FE1**: Constituted_entity (DUL Entity)
- **FE2**: Constituent (DUL Entity)

**Semantics**: Constituted_entity is materially constituted by Constituent

**DUL Definition**: Material constitution relation

**Inverse**: isConstituentOf

**Examples**:
```
Statue.Target --hasConstituent--> Clay.Target
```

**Status**: DUL core property

---

#### 8.12.7 isConstituentOf

**Type**: DUL Property
**Background Frame**: *DUL_Constitution*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#isConstituentOf`

**Frame Elements**:
- **FE1**: Constituent (DUL Entity)
- **FE2**: Constituted_entity (DUL Entity)

**Semantics**: Constituent materially constitutes Constituted_entity

**DUL Definition**: Inverse of hasConstituent

**Inverse**: hasConstituent

**Status**: DUL core property

---

#### 8.12.8 hasMember

**Type**: DUL Property
**Background Frame**: *DUL_Membership*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#hasMember`

**Frame Elements**:
- **FE1**: Collection (DUL Collection)
- **FE2**: Member (DUL Entity)

**Semantics**: Collection has Member

**DUL Definition**: Membership relation for collections

**Inverse**: isMemberOf

**Examples**:
```
Team.Target --hasMember--> Player.Target
Committee.Target --hasMember--> Member_person.Target
```

**Status**: DUL core property

---

#### 8.12.9 isMemberOf

**Type**: DUL Property
**Background Frame**: *DUL_Membership*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#isMemberOf`

**Frame Elements**:
- **FE1**: Member (DUL Entity)
- **FE2**: Collection (DUL Collection)

**Semantics**: Member belongs to Collection

**DUL Definition**: Inverse of hasMember

**Inverse**: hasMember

**Status**: DUL core property

---

### 8.13 Quality and Region Properties

These micro-frames relate entities to their qualities and regions (values/qualia).

---

#### 8.13.1 hasQuality

**Type**: DUL Property
**Background Frame**: *DUL_Quality_Attribution*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#hasQuality`

**Frame Elements**:
- **FE1**: Entity (DUL Entity)
- **FE2**: Quality (DUL Quality)

**Semantics**: Entity possesses Quality

**DUL Definition**: Relation between entities and their qualities

**Inverse**: isQualityOf

**Examples**:
```
Person.Target --hasQuality--> Height_quality.Target
Object.Target --hasQuality--> Color_quality.Target
```

**Status**: DUL core property

---

#### 8.13.2 isQualityOf

**Type**: DUL Property
**Background Frame**: *DUL_Quality_Attribution*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#isQualityOf`

**Frame Elements**:
- **FE1**: Quality (DUL Quality)
- **FE2**: Entity (DUL Entity)

**Semantics**: Quality is possessed by Entity

**DUL Definition**: Inverse of hasQuality

**Inverse**: hasQuality

**Status**: DUL core property

---

#### 8.13.3 hasRegion

**Type**: DUL Property
**Background Frame**: *DUL_Region_Assignment*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#hasRegion`

**Frame Elements**:
- **FE1**: Entity (DUL Entity)
- **FE2**: Region (DUL Region)

**Semantics**: Entity is associated with Region (quale/value)

**DUL Definition**: Relation between entities and regions (conceptual spaces)

**Inverse**: isRegionFor

**Examples**:
```
Color_quality.Target --hasRegion--> Red_region.Target
Temperature_quality.Target --hasRegion--> 25C_region.Target
```

**Status**: DUL core property

---

#### 8.13.4 isRegionFor

**Type**: DUL Property
**Background Frame**: *DUL_Region_Assignment*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#isRegionFor`

**Frame Elements**:
- **FE1**: Region (DUL Region)
- **FE2**: Entity (DUL Entity)

**Semantics**: Region is the value/quale for Entity

**DUL Definition**: Inverse of hasRegion

**Inverse**: hasRegion

**Status**: DUL core property

---

### 8.14 Temporal Properties

These micro-frames define temporal ordering and interval relations.

---

#### 8.14.1 hasTimeInterval

**Type**: DUL Property
**Background Frame**: *DUL_Temporal_Location*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#hasTimeInterval`

**Frame Elements**:
- **FE1**: Entity (DUL Entity)
- **FE2**: Time_interval (DUL TimeInterval)

**Semantics**: Entity occurs/exists during Time_interval

**DUL Definition**: Temporal location of entities

**Inverse**: isTimeIntervalOf

**Examples**:
```
Meeting_event.Target --hasTimeInterval--> Monday_9am_10am.Target
```

**Status**: DUL core property

---

#### 8.14.2 isTimeIntervalOf

**Type**: DUL Property
**Background Frame**: *DUL_Temporal_Location*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#isTimeIntervalOf`

**Frame Elements**:
- **FE1**: Time_interval (DUL TimeInterval)
- **FE2**: Entity (DUL Entity)

**Semantics**: Time_interval is when Entity occurs/exists

**DUL Definition**: Inverse of hasTimeInterval

**Inverse**: hasTimeInterval

**Status**: DUL core property

---

#### 8.14.3 directlyFollows

**Type**: DUL Property
**Background Frame**: *DUL_Direct_Temporal_Succession*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#directlyFollows`

**Frame Elements**:
- **FE1**: Following_entity (DUL Entity)
- **FE2**: Preceding_entity (DUL Entity)

**Semantics**: Following_entity directly follows Preceding_entity (no gap)

**DUL Definition**: Immediate temporal succession

**Inverse**: directlyPrecedes

**Status**: DUL core property

---

#### 8.14.4 directlyPrecedes

**Type**: DUL Property
**Background Frame**: *DUL_Direct_Temporal_Succession*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#directlyPrecedes`

**Frame Elements**:
- **FE1**: Preceding_entity (DUL Entity)
- **FE2**: Following_entity (DUL Entity)

**Semantics**: Preceding_entity directly precedes Following_entity (no gap)

**DUL Definition**: Immediate temporal precedence

**Inverse**: directlyFollows

**Status**: DUL core property

---

#### 8.14.5 follows

**Type**: DUL Property
**Background Frame**: *DUL_Temporal_Succession*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#follows`

**Frame Elements**:
- **FE1**: Following_entity (DUL Entity)
- **FE2**: Preceding_entity (DUL Entity)

**Semantics**: Following_entity follows Preceding_entity (possibly with gap)

**DUL Definition**: Temporal succession (transitive)

**Inverse**: precedes

**Status**: DUL core property

---

#### 8.14.6 precedes

**Type**: DUL Property
**Background Frame**: *DUL_Temporal_Succession*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#precedes`

**Frame Elements**:
- **FE1**: Preceding_entity (DUL Entity)
- **FE2**: Following_entity (DUL Entity)

**Semantics**: Preceding_entity precedes Following_entity (possibly with gap)

**DUL Definition**: Temporal precedence (transitive)

**Inverse**: follows

**Status**: DUL core property

---

#### 8.14.7 includesTime

**Type**: DUL Property
**Background Frame**: *DUL_Temporal_Inclusion*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#includesTime`

**Frame Elements**:
- **FE1**: Situation (DUL Situation)
- **FE2**: Time_interval (DUL TimeInterval)

**Semantics**: Situation temporally includes Time_interval

**DUL Definition**: Temporal inclusion in situations

**Inverse**: isTimeIncludedIn

**Status**: DUL core property

---

#### 8.14.8 isTimeIncludedIn

**Type**: DUL Property
**Background Frame**: *DUL_Temporal_Inclusion*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#isTimeIncludedIn`

**Frame Elements**:
- **FE1**: Time_interval (DUL TimeInterval)
- **FE2**: Situation (DUL Situation)

**Semantics**: Time_interval is temporally included in Situation

**DUL Definition**: Inverse of includesTime

**Inverse**: includesTime

**Status**: DUL core property

---

### 8.15 Spatial Properties

These micro-frames define spatial relations between entities and locations.

---

#### 8.15.1 hasLocation

**Type**: DUL Property
**Background Frame**: *DUL_Spatial_Location*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#hasLocation`

**Frame Elements**:
- **FE1**: Entity (DUL Entity)
- **FE2**: Place (DUL Place)

**Semantics**: Entity is located at Place

**DUL Definition**: Spatial location relation

**Inverse**: isLocationOf

**Examples**:
```
Person.Target --hasLocation--> City.Target
Building.Target --hasLocation--> Address.Target
```

**Status**: DUL core property

---

#### 8.15.2 isLocationOf

**Type**: DUL Property
**Background Frame**: *DUL_Spatial_Location*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#isLocationOf`

**Frame Elements**:
- **FE1**: Place (DUL Place)
- **FE2**: Entity (DUL Entity)

**Semantics**: Place is the location of Entity

**DUL Definition**: Inverse of hasLocation

**Inverse**: hasLocation

**Status**: DUL core property

---

#### 8.15.3 hasCommonBoundary

**Type**: DUL Property
**Background Frame**: *DUL_Spatial_Adjacency*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#hasCommonBoundary`

**Frame Elements**:
- **FE1**: Entity1 (DUL Entity)
- **FE2**: Entity2 (DUL Entity)

**Semantics**: Entity1 and Entity2 share a common boundary

**DUL Definition**: Spatial adjacency/contiguity

**Symmetric**: true

**Examples**:
```
Country_A.Target --hasCommonBoundary--> Country_B.Target
```

**Status**: DUL core property

---

#### 8.15.4 nearTo

**Type**: DUL Property
**Background Frame**: *DUL_Spatial_Proximity*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#nearTo`

**Frame Elements**:
- **FE1**: Entity1 (DUL Entity)
- **FE2**: Entity2 (DUL Entity)

**Semantics**: Entity1 is spatially near Entity2

**DUL Definition**: Spatial proximity (vague)

**Symmetric**: true

**Status**: DUL core property

---

#### 8.15.5 farFrom

**Type**: DUL Property
**Background Frame**: *DUL_Spatial_Distance*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#farFrom`

**Frame Elements**:
- **FE1**: Entity1 (DUL Entity)
- **FE2**: Entity2 (DUL Entity)

**Semantics**: Entity1 is spatially far from Entity2

**DUL Definition**: Spatial distance (vague)

**Symmetric**: true

**Status**: DUL core property

---

#### 8.15.6 overlaps

**Type**: DUL Property
**Background Frame**: *DUL_Spatial_Overlap*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#overlaps`

**Frame Elements**:
- **FE1**: Entity1 (DUL Entity)
- **FE2**: Entity2 (DUL Entity)

**Semantics**: Entity1 spatially overlaps with Entity2

**DUL Definition**: Spatial overlap relation

**Symmetric**: true

**Status**: DUL core property

---

### 8.16 Expression and Information Properties

These micro-frames relate information objects, expressions, and concepts.

---

#### 8.16.1 expresses

**Type**: DUL Property
**Background Frame**: *DUL_Expression*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#expresses`

**Frame Elements**:
- **FE1**: Information_object (DUL InformationObject)
- **FE2**: Social_object (DUL SocialObject)

**Semantics**: Information_object expresses Social_object (concept, norm, etc.)

**DUL Definition**: Expression relation between information and social objects

**Inverse**: isExpressedBy

**Examples**:
```
Book.Target --expresses--> Theory.Target
Law_document.Target --expresses--> Legal_norm.Target
```

**Status**: DUL core property

---

#### 8.16.2 isExpressedBy

**Type**: DUL Property
**Background Frame**: *DUL_Expression*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#isExpressedBy`

**Frame Elements**:
- **FE1**: Social_object (DUL SocialObject)
- **FE2**: Information_object (DUL InformationObject)

**Semantics**: Social_object is expressed by Information_object

**DUL Definition**: Inverse of expresses

**Inverse**: expresses

**Status**: DUL core property

---

#### 8.16.3 expressesConcept

**Type**: DUL Property
**Background Frame**: *DUL_Concept_Expression*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#expressesConcept`

**Frame Elements**:
- **FE1**: Information_object (DUL InformationObject)
- **FE2**: Concept (DUL Concept)

**Semantics**: Information_object expresses Concept

**DUL Definition**: Specialization of expresses for concepts

**Inverse**: isConceptExpressedBy

**Status**: DUL core property

---

#### 8.16.4 isConceptExpressedBy

**Type**: DUL Property
**Background Frame**: *DUL_Concept_Expression*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#isConceptExpressedBy`

**Frame Elements**:
- **FE1**: Concept (DUL Concept)
- **FE2**: Information_object (DUL InformationObject)

**Semantics**: Concept is expressed by Information_object

**DUL Definition**: Inverse of expressesConcept

**Inverse**: expressesConcept

**Status**: DUL core property

---

#### 8.16.5 concretelyExpresses

**Type**: DUL Property
**Background Frame**: *DUL_Concrete_Expression*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#concretelyExpresses`

**Frame Elements**:
- **FE1**: Information_realization (DUL InformationRealization)
- **FE2**: Information_object (DUL InformationObject)

**Semantics**: Information_realization concretely expresses Information_object

**DUL Definition**: Relation between information realizations and information objects

**Inverse**: isConcretelyExpressedBy

**Examples**:
```
Physical_book.Target --concretelyExpresses--> Book_content.Target
```

**Status**: DUL core property

---

#### 8.16.6 isConcretelyExpressedBy

**Type**: DUL Property
**Background Frame**: *DUL_Concrete_Expression*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#isConcretelyExpressedBy`

**Frame Elements**:
- **FE1**: Information_object (DUL InformationObject)
- **FE2**: Information_realization (DUL InformationRealization)

**Semantics**: Information_object is concretely expressed by Information_realization

**DUL Definition**: Inverse of concretelyExpresses

**Inverse**: concretelyExpresses

**Status**: DUL core property

---

#### 8.16.7 realizes

**Type**: DUL Property
**Background Frame**: *DUL_Realization*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#realizes`

**Frame Elements**:
- **FE1**: Information_realization (DUL InformationRealization)
- **FE2**: Information_object (DUL InformationObject)

**Semantics**: Information_realization realizes Information_object

**DUL Definition**: Realization of information objects

**Inverse**: isRealizedBy

**Status**: DUL core property

---

#### 8.16.8 isRealizedBy

**Type**: DUL Property
**Background Frame**: *DUL_Realization*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#isRealizedBy`

**Frame Elements**:
- **FE1**: Information_object (DUL InformationObject)
- **FE2**: Information_realization (DUL InformationRealization)

**Semantics**: Information_object is realized by Information_realization

**DUL Definition**: Inverse of realizes

**Inverse**: realizes

**Status**: DUL core property

---

### 8.17 Agency and Action Properties

---

#### 8.17.1 actsFor

**Type**: DUL Property
**Background Frame**: *DUL_Agency_Delegation*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#actsFor`

**Frame Elements**:
- **FE1**: Agent_acting (DUL Agent)
- **FE2**: Agent_represented (DUL Agent)

**Semantics**: Agent_acting acts on behalf of Agent_represented

**DUL Definition**: Delegation of agency

**Examples**:
```
Lawyer.Target --actsFor--> Client.Target
Ambassador.Target --actsFor--> Country.Target
```

**Status**: DUL core property

---

#### 8.17.2 actsThrough

**Type**: DUL Property
**Background Frame**: *DUL_Agency_Instrumentality*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#actsThrough`

**Frame Elements**:
- **FE1**: Agent (DUL Agent)
- **FE2**: Physical_object (DUL PhysicalObject)

**Semantics**: Agent acts through Physical_object (as instrument)

**DUL Definition**: Instrumental agency

**Examples**:
```
Person.Target --actsThrough--> Tool.Target
```

**Status**: DUL core property

---

#### 8.17.3 involvesAgent

**Type**: DUL Property
**Background Frame**: *DUL_Agent_Involvement*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#involvesAgent`

**Frame Elements**:
- **FE1**: Event (DUL Event)
- **FE2**: Agent (DUL Agent)

**Semantics**: Event involves Agent

**DUL Definition**: Agent involvement in events

**Inverse**: isAgentInvolvedIn

**Status**: DUL core property

---

#### 8.17.4 isAgentInvolvedIn

**Type**: DUL Property
**Background Frame**: *DUL_Agent_Involvement*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#isAgentInvolvedIn`

**Frame Elements**:
- **FE1**: Agent (DUL Agent)
- **FE2**: Event (DUL Event)

**Semantics**: Agent is involved in Event

**DUL Definition**: Inverse of involvesAgent

**Inverse**: involvesAgent

**Status**: DUL core property

---

#### 8.17.5 includesAction

**Type**: DUL Property
**Background Frame**: *DUL_Action_Inclusion*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#includesAction`

**Frame Elements**:
- **FE1**: Situation (DUL Situation)
- **FE2**: Action (DUL Action)

**Semantics**: Situation includes Action

**DUL Definition**: Action inclusion in situations

**Inverse**: isActionIncludedIn

**Status**: DUL core property

---

#### 8.17.6 isActionIncludedIn

**Type**: DUL Property
**Background Frame**: *DUL_Action_Inclusion*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#isActionIncludedIn`

**Frame Elements**:
- **FE1**: Action (DUL Action)
- **FE2**: Situation (DUL Situation)

**Semantics**: Action is included in Situation

**DUL Definition**: Inverse of includesAction

**Inverse**: includesAction

**Status**: DUL core property

---

### 8.18 Parameter and Constraint Properties

---

#### 8.18.1 hasParameter

**Type**: DUL Property
**Background Frame**: *DUL_Parametrization*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#hasParameter`

**Frame Elements**:
- **FE1**: Concept (DUL Concept)
- **FE2**: Parameter (DUL Parameter)

**Semantics**: Concept has Parameter

**DUL Definition**: Parameter relation for concepts

**Inverse**: isParameterFor

**Status**: DUL core property

---

#### 8.18.2 isParameterFor

**Type**: DUL Property
**Background Frame**: *DUL_Parametrization*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#isParameterFor`

**Frame Elements**:
- **FE1**: Parameter (DUL Parameter)
- **FE2**: Concept (DUL Concept)

**Semantics**: Parameter is a parameter for Concept

**DUL Definition**: Inverse of hasParameter

**Inverse**: hasParameter

**Status**: DUL core property

---

#### 8.18.3 parametrizes

**Type**: DUL Property
**Background Frame**: *DUL_Parametrization*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#parametrizes`

**Frame Elements**:
- **FE1**: Parameter (DUL Parameter)
- **FE2**: Concept (DUL Concept)

**Semantics**: Parameter parametrizes Concept

**DUL Definition**: Parametrization relation

**Inverse**: isParametrizedBy

**Status**: DUL core property

---

#### 8.18.4 isParametrizedBy

**Type**: DUL Property
**Background Frame**: *DUL_Parametrization*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#isParametrizedBy`

**Frame Elements**:
- **FE1**: Concept (DUL Concept)
- **FE2**: Parameter (DUL Parameter)

**Semantics**: Concept is parametrized by Parameter

**DUL Definition**: Inverse of parametrizes

**Inverse**: parametrizes

**Status**: DUL core property

---

#### 8.18.5 hasConstraint

**Type**: DUL Property
**Background Frame**: *DUL_Constraint*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#hasConstraint`

**Frame Elements**:
- **FE1**: Description (DUL Description)
- **FE2**: Constraint (DUL Constraint)

**Semantics**: Description has Constraint

**DUL Definition**: Constraint relation for descriptions

**Inverse**: isConstraintFor

**Status**: DUL core property

---

#### 8.18.6 isConstraintFor

**Type**: DUL Property
**Background Frame**: *DUL_Constraint*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#isConstraintFor`

**Frame Elements**:
- **FE1**: Constraint (DUL Constraint)
- **FE2**: Description (DUL Description)

**Semantics**: Constraint constrains Description

**DUL Definition**: Inverse of hasConstraint

**Inverse**: hasConstraint

**Status**: DUL core property

---

#### 8.18.7 hasPrecondition

**Type**: DUL Property
**Background Frame**: *DUL_Precondition*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#hasPrecondition`

**Frame Elements**:
- **FE1**: Task (DUL Task)
- **FE2**: Situation (DUL Situation)

**Semantics**: Task requires Situation as precondition

**DUL Definition**: Precondition for tasks

**Inverse**: isPreconditionOf

**Status**: DUL core property

---

#### 8.18.8 isPreconditionOf

**Type**: DUL Property
**Background Frame**: *DUL_Precondition*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#isPreconditionOf`

**Frame Elements**:
- **FE1**: Situation (DUL Situation)
- **FE2**: Task (DUL Task)

**Semantics**: Situation is a precondition for Task

**DUL Definition**: Inverse of hasPrecondition

**Inverse**: hasPrecondition

**Status**: DUL core property

---

#### 8.18.9 hasPostcondition

**Type**: DUL Property
**Background Frame**: *DUL_Postcondition*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#hasPostcondition`

**Frame Elements**:
- **FE1**: Task (DUL Task)
- **FE2**: Situation (DUL Situation)

**Semantics**: Task results in Situation as postcondition

**DUL Definition**: Postcondition for tasks

**Inverse**: isPostconditionOf

**Status**: DUL core property

---

#### 8.18.10 isPostconditionOf

**Type**: DUL Property
**Background Frame**: *DUL_Postcondition*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#isPostconditionOf`

**Frame Elements**:
- **FE1**: Situation (DUL Situation)
- **FE2**: Task (DUL Task)

**Semantics**: Situation is a postcondition of Task

**DUL Definition**: Inverse of hasPostcondition

**Inverse**: hasPostcondition

**Status**: DUL core property

---

### 8.19 Association and Relation Properties

---

#### 8.19.1 associatedWith

**Type**: DUL Property
**Background Frame**: *DUL_Association*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#associatedWith`

**Frame Elements**:
- **FE1**: Entity1 (DUL Entity)
- **FE2**: Entity2 (DUL Entity)

**Semantics**: Entity1 is associated with Entity2 (general relation)

**DUL Definition**: Generic association relation

**Symmetric**: true

**Status**: DUL core property

---

#### 8.19.2 coparticipatesWith

**Type**: DUL Property
**Background Frame**: *DUL_Coparticipation*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#coparticipatesWith`

**Frame Elements**:
- **FE1**: Object1 (DUL Object)
- **FE2**: Object2 (DUL Object)

**Semantics**: Object1 coparticipates with Object2 in some event

**DUL Definition**: Co-participation relation

**Symmetric**: true

**Status**: DUL core property

---

#### 8.19.3 sameSettingAs

**Type**: DUL Property
**Background Frame**: *DUL_Setting_Sharing*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#sameSettingAs`

**Frame Elements**:
- **FE1**: Entity1 (DUL Entity)
- **FE2**: Entity2 (DUL Entity)

**Semantics**: Entity1 and Entity2 share the same situational setting

**DUL Definition**: Shared context relation

**Symmetric**: true

**Status**: DUL core property

---

#### 8.19.4 isRelatedToConcept

**Type**: DUL Property
**Background Frame**: *DUL_Conceptual_Relation*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#isRelatedToConcept`

**Frame Elements**:
- **FE1**: Concept1 (DUL Concept)
- **FE2**: Concept2 (DUL Concept)

**Semantics**: Concept1 is related to Concept2

**DUL Definition**: Generic concept relation

**Status**: DUL core property

---

#### 8.19.5 isRelatedToDescription

**Type**: DUL Property
**Background Frame**: *DUL_Description_Relation*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#isRelatedToDescription`

**Frame Elements**:
- **FE1**: Description1 (DUL Description)
- **FE2**: Description2 (DUL Description)

**Semantics**: Description1 is related to Description2

**DUL Definition**: Generic description relation

**Status**: DUL core property

---

### 8.20 Coverage and Expansion Properties

---

#### 8.20.1 covers

**Type**: DUL Property
**Background Frame**: *DUL_Coverage*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#covers`

**Frame Elements**:
- **FE1**: Covering_concept (DUL Concept)
- **FE2**: Covered_concept (DUL Concept)

**Semantics**: Covering_concept covers Covered_concept

**DUL Definition**: Conceptual coverage relation

**Inverse**: isCoveredBy

**Status**: DUL core property

---

#### 8.20.2 isCoveredBy

**Type**: DUL Property
**Background Frame**: *DUL_Coverage*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#isCoveredBy`

**Frame Elements**:
- **FE1**: Covered_concept (DUL Concept)
- **FE2**: Covering_concept (DUL Concept)

**Semantics**: Covered_concept is covered by Covering_concept

**DUL Definition**: Inverse of covers

**Inverse**: covers

**Status**: DUL core property

---

#### 8.20.3 expands

**Type**: DUL Property
**Background Frame**: *DUL_Expansion*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#expands`

**Frame Elements**:
- **FE1**: Expanding_description (DUL Description)
- **FE2**: Expanded_description (DUL Description)

**Semantics**: Expanding_description expands Expanded_description

**DUL Definition**: Description expansion relation

**Inverse**: isExpandedIn

**Status**: DUL core property

---

#### 8.20.4 isExpandedIn

**Type**: DUL Property
**Background Frame**: *DUL_Expansion*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#isExpandedIn`

**Frame Elements**:
- **FE1**: Expanded_description (DUL Description)
- **FE2**: Expanding_description (DUL Description)

**Semantics**: Expanded_description is expanded in Expanding_description

**DUL Definition**: Inverse of expands

**Inverse**: expands

**Status**: DUL core property

---

#### 8.20.5 unifies

**Type**: DUL Property
**Background Frame**: *DUL_Unification*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#unifies`

**Frame Elements**:
- **FE1**: Unifying_description (DUL Description)
- **FE2**: Unified_description (DUL Description)

**Semantics**: Unifying_description unifies Unified_description

**DUL Definition**: Description unification relation

**Inverse**: isUnifiedBy

**Status**: DUL core property

---

#### 8.20.6 isUnifiedBy

**Type**: DUL Property
**Background Frame**: *DUL_Unification*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#isUnifiedBy`

**Frame Elements**:
- **FE1**: Unified_description (DUL Description)
- **FE2**: Unifying_description (DUL Description)

**Semantics**: Unified_description is unified by Unifying_description

**DUL Definition**: Inverse of unifies

**Inverse**: unifies

**Status**: DUL core property

---

### 8.21 Specialization and Subordination Properties

---

#### 8.21.1 specializes

**Type**: DUL Property
**Background Frame**: *DUL_Specialization*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#specializes`

**Frame Elements**:
- **FE1**: Specialized_concept (DUL Concept)
- **FE2**: General_concept (DUL Concept)

**Semantics**: Specialized_concept specializes General_concept

**DUL Definition**: Concept specialization (subsumption)

**Inverse**: isSpecializedBy

**Status**: DUL core property

---

#### 8.21.2 isSpecializedBy

**Type**: DUL Property
**Background Frame**: *DUL_Specialization*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#isSpecializedBy`

**Frame Elements**:
- **FE1**: General_concept (DUL Concept)
- **FE2**: Specialized_concept (DUL Concept)

**Semantics**: General_concept is specialized by Specialized_concept

**DUL Definition**: Inverse of specializes

**Inverse**: specializes

**Status**: DUL core property

---

#### 8.21.3 isSubordinatedTo

**Type**: DUL Property
**Background Frame**: *DUL_Subordination*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#isSubordinatedTo`

**Frame Elements**:
- **FE1**: Subordinate_concept (DUL Concept)
- **FE2**: Superordinate_concept (DUL Concept)

**Semantics**: Subordinate_concept is subordinated to Superordinate_concept

**DUL Definition**: Concept subordination relation

**Inverse**: isSuperordinatedTo

**Status**: DUL core property

---

#### 8.21.4 isSuperordinatedTo

**Type**: DUL Property
**Background Frame**: *DUL_Subordination*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#isSuperordinatedTo`

**Frame Elements**:
- **FE1**: Superordinate_concept (DUL Concept)
- **FE2**: Subordinate_concept (DUL Concept)

**Semantics**: Superordinate_concept is superordinated to Subordinate_concept

**DUL Definition**: Inverse of isSubordinatedTo

**Inverse**: isSubordinatedTo

**Status**: DUL core property

---

### 8.22 Additional DUL Properties

---

#### 8.22.1 characterizes

**Type**: DUL Property
**Background Frame**: *DUL_Characterization*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#characterizes`

**Frame Elements**:
- **FE1**: Quality (DUL Quality)
- **FE2**: Entity (DUL Entity)

**Semantics**: Quality characterizes Entity

**DUL Definition**: Quality characterization relation

**Inverse**: isCharacterizedBy

**Status**: DUL core property

---

#### 8.22.2 isCharacterizedBy

**Type**: DUL Property
**Background Frame**: *DUL_Characterization*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#isCharacterizedBy`

**Frame Elements**:
- **FE1**: Entity (DUL Entity)
- **FE2**: Quality (DUL Quality)

**Semantics**: Entity is characterized by Quality

**DUL Definition**: Inverse of characterizes

**Inverse**: characterizes

**Status**: DUL core property

---

#### 8.22.3 introduces

**Type**: DUL Property
**Background Frame**: *DUL_Introduction*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#introduces`

**Frame Elements**:
- **FE1**: Description (DUL Description)
- **FE2**: Concept (DUL Concept)

**Semantics**: Description introduces Concept

**DUL Definition**: Concept introduction by descriptions

**Inverse**: isIntroducedBy

**Status**: DUL core property

---

#### 8.22.4 isIntroducedBy

**Type**: DUL Property
**Background Frame**: *DUL_Introduction*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#isIntroducedBy`

**Frame Elements**:
- **FE1**: Concept (DUL Concept)
- **FE2**: Description (DUL Description)

**Semantics**: Concept is introduced by Description

**DUL Definition**: Inverse of introduces

**Inverse**: introduces

**Status**: DUL core property

---

#### 8.22.5 usesConcept

**Type**: DUL Property
**Background Frame**: *DUL_Concept_Usage*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#usesConcept`

**Frame Elements**:
- **FE1**: Description (DUL Description)
- **FE2**: Concept (DUL Concept)

**Semantics**: Description uses Concept

**DUL Definition**: Concept usage in descriptions

**Inverse**: isConceptUsedIn

**Status**: DUL core property

---

#### 8.22.6 isConceptUsedIn

**Type**: DUL Property
**Background Frame**: *DUL_Concept_Usage*
**DUL URI**: `http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#isConceptUsedIn`

**Frame Elements**:
- **FE1**: Concept (DUL Concept)
- **FE2**: Description (DUL Description)

**Semantics**: Concept is used in Description

**DUL Definition**: Inverse of usesConcept

**Inverse**: usesConcept

**Status**: DUL core property

---

## Summary Statistics

### Total Micro-Frames Count

| Category | Implemented | Under Analysis | DUL Properties | Total |
|----------|-------------|----------------|----------------|-------|
| **AGENTIVE** | 11 | 6 | - | 17 |
| **CONSTITUTIVE** | 23 | 17 | - | 40 |
| **FORMAL** | 2 | 0 | - | 2 |
| **TELIC** | 10 | 3 | - | 13 |
| **DUL Core** | - | - | 118 | 118 |
| **TOTAL** | **46** | **26** | **118** | **190** |

### DUL Properties by Category

| DUL Category | Count |
|--------------|-------|
| Role and Task | 9 |
| Participation | 8 |
| Part-Whole | 9 |
| Quality and Region | 4 |
| Temporal | 8 |
| Spatial | 6 |
| Expression and Information | 8 |
| Agency and Action | 6 |
| Parameter and Constraint | 10 |
| Association and Relation | 5 |
| Coverage and Expansion | 6 |
| Specialization | 4 |
| Description and Situation | 6 |
| Classification | 4 |
| Other | 31 |

### Implementation Status

- **Production Ready**: 46 micro-frames (TQR implemented)
- **Analysis Phase**: 26 micro-frames (SIMPLE relations)
- **DUL Integration**: 118 properties ready for implementation
- **Total Coverage**: 190 relation types

---

## Usage Examples

### Example 1: Agentive Relation (criado_por)

**Scenario**: Relating a dish to its creator

**Micro-Frame**: criado_por (Criação_culinária)

**Application**:
```
# Frames
pizza.n (Entity frame, type: Food)
  └─ Target FE: The pizza entity

chef.n (Entity frame, type: Person)
  └─ Target FE: The chef entity

# Micro-frame
Criação_culinária (micro_frame)
  └─ FE1: Comida_produzida
  └─ FE2: Cozinheiro

# Relation
fe_relation:
  micro_frame_id: Criação_culinária
  source_fe_id: pizza.n.Target
  target_fe_id: chef.n.Target
  source_maps_to: Comida_produzida
  target_maps_to: Cozinheiro
```

**Interpretation**: The pizza (Comida_produzida) was created by the chef (Cozinheiro)

---

### Example 2: Constitutive Relation (tem_como_parte)

**Scenario**: Mereological relation between whole and part

**Micro-Frame**: tem_como_parte (Parte_todo)

**Application**:
```
# Frames
car.n (Entity frame, type: Vehicle)
  └─ Target FE: The car entity

engine.n (Entity frame, type: Component)
  └─ Target FE: The engine entity

# Micro-frame
Parte_todo (micro_frame)
  └─ FE1: Todo (the whole)
  └─ FE2: Parte (the part)

# Relation
fe_relation:
  micro_frame_id: Parte_todo
  source_fe_id: car.n.Target
  target_fe_id: engine.n.Target
  source_maps_to: Todo
  target_maps_to: Parte
```

**Interpretation**: The car (Todo) has the engine (Parte) as a component

---

### Example 3: Telic Relation (propósito_de)

**Scenario**: Purpose/function relation

**Micro-Frame**: propósito_de (Finalidade_do_utensílio)

**Application**:
```
# Frames
cutting.n (Event frame, type: Action)
  └─ Target FE: The cutting action

knife.n (Entity frame, type: Tool)
  └─ Target FE: The knife entity

# Micro-frame
Finalidade_do_utensílio (micro_frame)
  └─ FE1: Finalidade (the purpose)
  └─ FE2: Utensílio (the tool)

# Relation
fe_relation:
  micro_frame_id: Finalidade_do_utensílio
  source_fe_id: cutting.n.Target
  target_fe_id: knife.n.Target
  source_maps_to: Finalidade
  target_maps_to: Utensílio
```

**Interpretation**: Cutting (Finalidade) is the purpose of the knife (Utensílio)

---

### Example 4: DUL Property (hasRole)

**Scenario**: Role assignment using DUL

**Micro-Frame**: hasRole (DUL_Role_Assignment)

**Application**:
```
# Frames
john.n (Entity frame, type: Person, DUL: AgentivePhysicalObject)
  └─ Target FE: The person John

student_role (Role frame, DUL: Role)
  └─ Target FE: The student role

# Micro-frame
DUL_Role_Assignment (micro_frame, DUL property)
  └─ FE1: Object
  └─ FE2: Role

# Relation
fe_relation:
  micro_frame_id: DUL_Role_Assignment
  source_fe_id: john.n.Target
  target_fe_id: student_role.Target
  source_maps_to: Object
  target_maps_to: Role
```

**Interpretation**: John (Object) has the student role (Role)

---

### Example 5: Intra-Frame Relation (agent_relation)

**Scenario**: Relating FEs within a semantic frame

**Semantic Frame**: Commerce_buy

**Micro-Frame**: agent_relation

**Application**:
```
# Semantic frame
Commerce_buy (semantic frame)
  └─ Target FE: The buying event
  └─ Buyer FE: The purchaser
  └─ Goods FE: What is purchased
  └─ Seller FE: Who sells

# Micro-frame
agent_relation (micro_frame)
  └─ FE1: Event
  └─ FE2: Agent

# Intra-frame relation
fe_relation:
  micro_frame_id: agent_relation
  host_frame_id: Commerce_buy  # Intra-frame!
  source_fe_id: Commerce_buy.Target
  target_fe_id: Commerce_buy.Buyer
  source_maps_to: Event
  target_maps_to: Agent
```

**Interpretation**: Within Commerce_buy frame, the Buyer is the agent of the buying event (Target)

---

### Example 6: Frame Inheritance via Target FEs

**Scenario**: Frame-to-frame relation using Target FEs

**Frames**: Commerce_buy and Getting

**Micro-Frame**: inherits_from_relation

**Application**:
```
# Child frame
Commerce_buy (semantic frame)
  └─ Target FE: The buying event

# Parent frame
Getting (semantic frame)
  └─ Target FE: The getting event

# Micro-frame
inherits_from_relation (micro_frame)
  └─ FE1: Child_frame
  └─ FE2: Parent_frame

# Inter-frame relation
fe_relation:
  micro_frame_id: inherits_from_relation
  host_frame_id: NULL  # Inter-frame!
  source_fe_id: Commerce_buy.Target
  target_fe_id: Getting.Target
  source_maps_to: Child_frame
  target_maps_to: Parent_frame
```

**Interpretation**: Commerce_buy (Child_frame) inherits from Getting (Parent_frame)

---

## References

### Qualia Structure and Generative Lexicon

1. **Pustejovsky, J. (1995)**. *The Generative Lexicon*. MIT Press.
   - Original formulation of Qualia Structure (Formal, Constitutive, Telic, Agentive)

2. **Pustejovsky, J. (2006)**. "Type Theory and Lexical Decomposition". *Journal of Cognitive Science*, 7, 39-76.
   - Formal semantics for qualia roles

### SIMPLE Ontology

3. **Lenci, A., et al. (2000)**. "SIMPLE: A General Framework for the Development of Multilingual Lexicons". *International Journal of Lexicography*, 13(4), 249-263.
   - SIMPLE semantic relations and qualia-based modeling

4. **Busa, F., et al. (2001)**. "Building a Semantic Lexicon: Structuring and Generating Concepts". *Proceedings of Intelligent Text Processing and Computational Linguistics*.
   - Implementation of qualia structure in SIMPLE

### DUL Ontology

5. **Gangemi, A., & Mika, P. (2003)**. "Understanding the Semantic Web through Descriptions and Situations". *Proceedings of International Semantic Web Conference*, 689-706.
   - DnS pattern and DUL foundations

6. **Masolo, C., et al. (2003)**. "WonderWeb Deliverable D18: The WonderWeb Library of Foundational Ontologies". *ISTC-CNR Technical Report*.
   - Complete DOLCE/DUL specification

7. **Gangemi, A. (2005)**. "Ontology Design Patterns for Semantic Web Content". *Proceedings of International Semantic Web Conference*, 262-276.
   - Ontology design patterns using DUL

8. **DUL Documentation**: http://www.ontologydesignpatterns.org/ont/dul/DUL.owl
   - Official DUL ontology and documentation

### FrameNet and Frame Semantics

9. **Fillmore, C. J. (1982)**. "Frame Semantics". In *Linguistics in the Morning Calm* (pp. 111-137). Hanshin Publishing Co.
   - Foundational work on frame semantics

10. **Baker, C. F., Fillmore, C. J., & Lowe, J. B. (1998)**. "The Berkeley FrameNet Project". *Proceedings of COLING-ACL*, 86-90.
    - FrameNet project introduction

11. **Ruppenhofer, J., et al. (2016)**. *FrameNet II: Extended Theory and Practice*.
    - Current FrameNet methodology

### Frame-Native Architecture

12. **Salomão, M. M. M. (2009)**. "FrameNet Brasil: um trabalho em progresso". *Calidoscópio*, 7(3), 171-182.
    - FrameNet Brasil foundations

13. **Torrent, T. T., et al. (2014)**. "Multilingual Lexicographic Annotation for Domain-Specific Electronic Dictionaries". *Constructions and Frames*, 6(1), 73-94.
    - Multilingual frame-based annotation

### Micro-Frames and TQR

14. **Chishman, R., et al. (2018)**. "Ternary Qualia Relations in FrameNet: Challenges and Perspectives for Lexical-Ontological Integration". *Proceedings of LREC*.
    - Original TQR proposal for FrameNet Brasil

15. **Present work (2025)**. "Frame-Native DUL: A Unified Micro-Frame Architecture". FrameNet Brasil Documentation.
    - Micro-frame formalization and DUL integration

---

**END OF DOCUMENT**

**Version**: 1.0 (Complete)
**Date**: October 21, 2025
**Lines**: ~2500 (continuation)
**Total with base**: ~10,000 lines
**Status**: Complete and ready for implementation
