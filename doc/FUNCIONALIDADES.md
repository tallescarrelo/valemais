# Vale+ - Funcionalidades Detalhadas (MVP)

## 1. Landing Page Publica

### 1.1 Hero Section
- Titulo impactante com proposta de valor
- Subtitulo explicativo
- CTAs principais: "Quero ser Cliente" / "Quero ser Parceiro"
- Imagem/ilustracao do cartao virtual

### 1.2 Secao de Beneficios
- Cards com os principais beneficios para clientes
- Icones ilustrativos
- Descricoes curtas e diretas

### 1.3 Como Funciona
- Passo a passo visual (3-4 passos)
- 1. Cadastre-se | 2. Escolha seu plano | 3. Receba seu cartao | 4. Use seus descontos

### 1.4 Parceiros em Destaque
- Grid/carrossel com logos e categorias dos parceiros
- Filtro por categoria (alimentacao, saude, beleza, servicos, etc.)
- Desconto oferecido por cada parceiro

### 1.5 Planos e Precos
- Card(s) de plano com preco, beneficios inclusos
- CTA para cadastro

### 1.6 Depoimentos
- Carrossel de depoimentos de clientes
- Foto, nome, texto

### 1.7 Numeros/Estatisticas
- Clientes ativos, parceiros credenciados, descontos concedidos, etc.

### 1.8 FAQ
- Accordion com perguntas frequentes

### 1.9 Secao Parceiros (CTA)
- Bloco dedicado a atrair estabelecimentos
- Beneficios de ser parceiro
- CTA: "Cadastre seu estabelecimento"

### 1.10 Footer
- Links uteis, redes sociais, contato, termos de uso, politica de privacidade

---

## 2. Fluxo do Cliente

### 2.1 Cadastro
- **Dados obrigatorios**: Nome completo, CPF, Email, Telefone/WhatsApp, Senha
- **Dados opcionais**: Data de nascimento, Endereco
- Validacao de CPF (formato + unicidade)
- Validacao de email (formato + unicidade)
- Confirmacao de senha
- Termos de uso e politica de privacidade (checkbox obrigatorio)

### 2.2 Checkout / Pagamento
- Apos cadastro, redireciona direto para pagamento
- Exibe o plano disponivel com valor e beneficios
- Opcao: pagamento unico (avulso) ou assinatura recorrente
- Integracao com gateway de pagamento
- Confirmacao de pagamento
- Ativacao automatica do plano apos pagamento confirmado

### 2.3 Email de Boas-vindas
- Enviado apos cadastro + pagamento confirmado
- Contem: nome do cliente, codigo do cartao, instrucoes de acesso
- Link direto para area do cliente

### 2.4 Login
- Email + Senha
- "Esqueci minha senha" (envio de link por email)
- Sessao persistente (token JWT)

### 2.5 Dashboard do Cliente

#### 2.5.1 Cartao Virtual
- **Exibicao estilo cartao** (frente)
  - Logo Vale+
  - Nome do cliente
  - Codigo unico do cartao
  - Status: ATIVO / INATIVO / VENCIDO
  - Data de validade
- Visual bonito, tipo cartao de credito/SAMs Club
- Possibilidade de mostrar na tela do celular ao caixa

#### 2.5.2 Status do Plano
- Plano atual
- Status (ativo/inativo/vencido)
- Data de inicio e proxima renovacao
- Tipo: recorrente ou avulso
- Botao "Renovar Plano" (se avulso e proximo de vencer)
- Botao "Cancelar Assinatura" (se recorrente)

#### 2.5.3 Extrato de Pagamentos
- Lista de todos os pagamentos realizados
- Data, valor, status (pago/pendente/falhou), metodo
- Filtro por periodo

#### 2.5.4 Validacao de Desconto (Scanner QR)
- Botao "Validar Desconto" ou acesso via link do QR Code
- Abre camera do dispositivo
- Le QR Code do parceiro
- Fluxo de validacao (detalhado na secao 5)

#### 2.5.5 Historico de Validacoes
- Lista de todas as validacoes feitas
- Parceiro, data/hora, status

#### 2.5.6 Meus Dados
- Edicao de dados pessoais
- Troca de senha

---

## 3. Fluxo do Parceiro

### 3.1 Cadastro do Parceiro
- **Dados obrigatorios**:
  - Razao Social
  - Nome Fantasia
  - CNPJ
  - Email corporativo
  - Telefone/WhatsApp
  - Endereco completo (CEP, rua, numero, complemento, bairro, cidade, UF)
  - Categoria do estabelecimento (alimentacao, saude, beleza, servicos, educacao, etc.)
  - Desconto oferecido (% ou valor fixo)
  - Descricao do beneficio (ex: "10% em todos os produtos", "15% em servicos de beleza")
  - Senha de acesso
- **Dados opcionais**:
  - Logo/imagem do estabelecimento
  - Horario de funcionamento
  - Website / redes sociais
- Pode ser cadastrado pelo proprio parceiro OU pelo admin

### 3.2 Dashboard do Parceiro

#### 3.2.1 Visao Geral
- Resumo: total de validacoes do mes, ultimas validacoes
- Status do credenciamento (ativo/inativo)

#### 3.2.2 QR Code
- QR Code exclusivo do estabelecimento para download/impressao
- Instrucoes de uso e onde posicionar
- QR Code contem URL: `valemais.com.br/validar/{codigo_parceiro}`

#### 3.2.3 Historico de Validacoes
- Lista de todas as validacoes feitas no estabelecimento
- Cliente (nome parcial por privacidade), data/hora, status
- Filtro por periodo

#### 3.2.4 Dados do Estabelecimento
- Edicao dos dados cadastrais
- Atualizacao do desconto oferecido
- Upload/troca de logo

---

## 4. Dashboard Admin

### 4.1 Dashboard Principal
- Metricas gerais: total clientes, total parceiros, receita do mes
- Graficos: novos cadastros, pagamentos, validacoes
- Alertas: pagamentos falhos, planos vencendo

### 4.2 Gestao de Planos
- CRUD de planos (nome, descricao, valor, periodicidade, beneficios)
- Ativar/desativar planos
- MVP: um plano, mas estrutura preparada para multiplos

### 4.3 Gestao de Clientes
- Lista de todos os clientes
- Filtros: status do plano, data de cadastro, busca por nome/CPF/email
- Ver detalhes: dados, plano, pagamentos, validacoes
- Ativar/desativar/bloquear cliente manualmente

### 4.4 Gestao de Parceiros
- Lista de todos os parceiros
- Filtros: categoria, status, busca por nome/CNPJ
- Ver detalhes: dados, validacoes, QR Code
- Ativar/desativar parceiro
- Cadastrar novo parceiro
- Aprovar/reprovar solicitacoes de cadastro

### 4.5 Historico de Validacoes
- Visao geral de todas as validacoes da plataforma
- Filtros: por parceiro, por cliente, por periodo, por status

### 4.6 Financeiro
- Receita total e por periodo
- Lista de pagamentos
- Pagamentos pendentes/falhos
- Exportacao de relatorios (CSV)

### 4.7 Configuracoes
- Dados da plataforma (nome, logo, cores, contato)
- Configuracoes de email (templates)
- Configuracoes do gateway de pagamento

---

## 5. Sistema de Validacao de Desconto (QR Code)

### 5.1 Fluxo Completo

```
[Parceiro tem QR Code no caixa]
         |
         v
[Cliente aponta camera do celular para QR Code]
         |
         v
[Abre link: valemais.com.br/validar/{codigo_parceiro}]
         |
         v
[Cliente esta logado?]
    |          |
   SIM        NAO
    |          |
    v          v
[Tela de     [Tela de Login]
 Validacao]       |
    |             v
    |        [Apos login, redireciona para tela de validacao]
    |             |
    v             v
[Exibe: Nome do Parceiro + Logo + Desconto Oferecido]
[Botao: "VALIDAR MEU DESCONTO"]
         |
         v
[Sistema verifica:]
  - Cliente tem plano ativo? (data de validade OK, pagamento em dia)
  - Parceiro esta ativo na plataforma?
  - (Regras adicionais: limite por dia/mes?)
         |
    +---------+---------+
    |                   |
  VALIDO             INVALIDO
    |                   |
    v                   v
[CUPOM VALIDADO!]   [Motivo da falha]
[Data/Hora]         [Ex: Plano vencido,
[Codigo da          Parceiro inativo, etc.]
 validacao]         [CTA: Renovar plano]
    |
    v
[Cliente mostra tela ao caixa]
[Caixa concede o desconto]
```

### 5.2 Registro de Validacao
- Cada validacao gera um registro no banco:
  - ID unico da validacao
  - Cliente ID
  - Parceiro ID
  - Data/Hora
  - Status (valido/invalido)
  - Motivo (se invalido)
  - Codigo de verificacao (para auditoria)

### 5.3 Seguranca
- Validacao so funciona com sessao ativa do cliente
- Codigo de verificacao unico por validacao
- Registro de IP e dispositivo
- Possivel limite de validacoes por periodo (anti-abuso)
