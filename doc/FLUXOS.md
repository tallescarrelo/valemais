# Vale+ - Fluxos de Usuario

## 1. Jornada do Cliente (Novo)

```
[Visita Landing Page]
       |
       v
[Clica "Quero ser Cliente"]
       |
       v
[Pagina de Beneficios + CTA "Cadastrar"]
       |
       v
[Formulario de Cadastro]
  - Nome, CPF, Email, Telefone, Senha
  - Aceita termos
       |
       v
[Validacao dos dados]
  - CPF valido e unico
  - Email unico
  - Senha forte
       |
       v
[Cadastro salvo no banco]
[Gera codigo unico do cartao]
       |
       v
[Redireciona para Checkout]
  - Exibe plano disponivel
  - Escolhe: avulso ou recorrente
  - Insere dados de pagamento
       |
       v
[Processa pagamento via gateway]
       |
   +---+---+
   |       |
 PAGO    FALHOU
   |       |
   v       v
[Ativa   [Exibe erro]
 plano]  [Opção de tentar novamente]
   |
   v
[Envia email de boas-vindas]
  - Nome, codigo do cartao
  - Link para area do cliente
  - Instrucoes de uso
       |
       v
[Redireciona para Dashboard do Cliente]
[Cartao virtual ATIVO!]
```

## 2. Jornada de Validacao de Desconto

```
[Cliente no estabelecimento parceiro]
       |
       v
[Aponta camera para QR Code do parceiro]
       |
       v
[Abre URL: valemais.com.br/validar/{codigo_parceiro}]
       |
       v
[Cliente logado?]
   |         |
  SIM       NAO
   |         |
   |    [Redireciona para login]
   |    [Apos login, volta para validacao]
   |         |
   v         v
[Tela de Pre-Validacao]
  - Logo do parceiro
  - Nome do estabelecimento
  - Desconto oferecido: "10% em todos os produtos"
  - [BOTAO] "Validar meu desconto"
       |
       v
[Backend verifica:]
  1. Cliente existe e esta ativo?
  2. Subscription ativa e nao expirada?
  3. Pagamento em dia?
  4. Parceiro esta ativo?
  5. Limites de validacao respeitados?
       |
   +---+---+
   |       |
 VALIDO  INVALIDO
   |       |
   v       v
[TELA DE SUCESSO]          [TELA DE ERRO]
- "Cupom Validado!"        - "Nao foi possivel validar"
- Codigo: #VAL-XXXXX       - Motivo: "Plano vencido"
- Data: 11/02/2026          - CTA: "Renovar meu plano"
- Hora: 14:35
- Parceiro: Restaurante X
- Desconto: 10%
- [Mostrar ao caixa]
       |
       v
[Cliente mostra tela ao caixa]
[Caixa confirma e aplica desconto]
```

## 3. Jornada do Parceiro (Novo)

```
[Visita Landing Page]
       |
       v
[Clica "Quero ser Parceiro"]
       |
       v
[Pagina de Vantagens para Parceiros]
  - Aumente seu fluxo de clientes
  - Visibilidade na plataforma
  - Zero custo de adesao (ou modelo a definir)
       |
       v
[Formulario de Cadastro]
  - Razao Social, Nome Fantasia, CNPJ
  - Email, Telefone
  - Endereco completo
  - Categoria
  - Desconto oferecido
  - Upload de logo
  - Senha
       |
       v
[Cadastro salvo com status PENDING]
       |
       v
[Admin recebe notificacao de novo parceiro]
       |
       v
[Admin aprova ou reprova]
   |         |
APROVA    REPROVA
   |         |
   v         v
[Status     [Email de
 ACTIVE]     reprovacao
   |         com motivo]
   v
[Email de boas-vindas ao parceiro]
  - Dados de acesso
  - QR Code gerado
  - Instrucoes de uso
       |
       v
[Parceiro acessa dashboard]
[Baixa QR Code e posiciona no caixa]
```

## 4. Fluxo de Renovacao (Avulso)

```
[Plano se aproxima do vencimento (7 dias)]
       |
       v
[Email de lembrete enviado]
       |
       v
[Cliente acessa dashboard]
[Ve alerta: "Seu plano vence em X dias"]
       |
       v
[Clica "Renovar Plano"]
       |
       v
[Checkout com dados pre-preenchidos]
       |
       v
[Pagamento processado]
   |         |
 PAGO      FALHOU
   |         |
   v         v
[Novo periodo ativado]  [Tentar novamente]
[Email de confirmacao]
```

## 5. Fluxo de Cancelamento (Recorrente)

```
[Cliente acessa dashboard]
       |
       v
[Clica "Cancelar Assinatura"]
       |
       v
[Modal de confirmacao]
  - "Tem certeza? Voce perdera seus beneficios em DD/MM/AAAA"
  - [Manter assinatura] [Confirmar cancelamento]
       |
       v
[Backend cancela no gateway]
[Status: CANCELLED]
[cancelledAt: now()]
       |
       v
[Plano continua ativo ate endDate]
[Apos endDate, cartao fica inativo]
       |
       v
[Email confirmando cancelamento]
  - "Sentimos sua falta"
  - Plano ativo ate DD/MM/AAAA
  - Link para reativar
```

## 6. Fluxo de Esqueci Minha Senha

```
[Tela de Login]
       |
       v
[Clica "Esqueci minha senha"]
       |
       v
[Informa email cadastrado]
       |
       v
[Backend gera token de reset (expira em 1h)]
[Envia email com link de redefinicao]
       |
       v
[Cliente clica no link do email]
       |
       v
[Tela de nova senha]
  - Nova senha
  - Confirmar nova senha
       |
       v
[Senha atualizada]
[Redireciona para login]
```

## 7. Fluxo Admin - Gestao de Parceiros

```
[Admin acessa Dashboard]
       |
       v
[Menu: Parceiros]
       |
   +---+---+---+
   |       |   |
   v       v   v
[Lista  [Novo  [Pendentes]
 todos]  parceiro]
   |       |       |
   v       v       v
[Filtros] [Form  [Lista de
[Busca]   completo] solicitacoes]
   |       |       |
   v       v       v
[Detalhes [Salva  [Aprovar/
 parceiro] e ativa] Reprovar]
   |
   v
[Editar/Desativar/Ver QR/Ver validacoes]
```
