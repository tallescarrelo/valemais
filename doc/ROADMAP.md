# Vale+ - Roadmap de Desenvolvimento (MVP)

## Visao Geral das Fases

```
FASE 0: Setup          ███░░░░░░░░░░░░░░░░░  ~5%
FASE 1: Backend Core   ████████░░░░░░░░░░░░  ~25%
FASE 2: Frontend Base  ████████████░░░░░░░░  ~20%
FASE 3: Landing Page   ████████████████░░░░  ~15%
FASE 4: Dashboards     ██████████████████░░  ~20%
FASE 5: Integracoes    ████████████████████  ~10%
FASE 6: Polish & Deploy████████████████████  ~5%
```

---

## FASE 0 - Setup do Projeto

### 0.1 Estrutura do Monorepo
- [ ] Inicializar repositorio git
- [ ] Criar estrutura de pastas (frontend/ e backend/)
- [ ] Configurar .gitignore global
- [ ] Criar README.md raiz

### 0.2 Backend Setup
- [ ] `npm init` + TypeScript config
- [ ] Instalar dependencias (Express, Prisma, etc.)
- [ ] Configurar ESLint + Prettier
- [ ] Configurar Prisma com PostgreSQL
- [ ] Estrutura de pastas Clean Architecture
- [ ] Configurar variaves de ambiente (.env)
- [ ] Setup do servidor Express basico
- [ ] Configurar CORS, Helmet, Rate Limit
- [ ] Setup de logging (Winston)

### 0.3 Frontend Setup
- [ ] `npm create vite@latest` com React + TypeScript
- [ ] Instalar dependencias
- [ ] Configurar SCSS Modules
- [ ] Configurar ESLint + Prettier
- [ ] Setup de rotas (React Router v6)
- [ ] Configurar variaveis de ambiente
- [ ] Criar layout base e sistema de design (cores, tipografia, spacing)
- [ ] Componentes UI base (Button, Input, Card, Modal)

---

## FASE 1 - Backend Core

### 1.1 Banco de Dados
- [ ] Schema Prisma completo (todas as entidades)
- [ ] Migration inicial
- [ ] Seed com dados de teste
- [ ] Repositorios base (CRUD generico)

### 1.2 Autenticacao
- [ ] Entidade User (domain)
- [ ] Use Cases: Register, Login, ForgotPassword, ResetPassword
- [ ] JWT (access + refresh tokens)
- [ ] Middleware de autenticacao
- [ ] Middleware de autorizacao por role
- [ ] Rotas: POST /auth/register, POST /auth/login, POST /auth/refresh, POST /auth/forgot-password, POST /auth/reset-password

### 1.3 Gestao de Planos
- [ ] Entidade Plan (domain)
- [ ] Use Cases: CreatePlan, UpdatePlan, ListPlans, GetPlan, TogglePlanStatus
- [ ] Rotas CRUD: /admin/plans

### 1.4 Gestao de Clientes
- [ ] Use Cases: ListClients, GetClient, UpdateClient, ToggleClientStatus
- [ ] Rotas: /admin/clients
- [ ] Rota do cliente: GET /client/profile, PUT /client/profile

### 1.5 Gestao de Parceiros
- [ ] Entidade Partner (domain)
- [ ] Use Cases: RegisterPartner, ApprovePartner, ListPartners, GetPartner, UpdatePartner, TogglePartnerStatus
- [ ] Geracao de QR Code ao aprovar parceiro
- [ ] Rotas: /admin/partners, /partner/profile

### 1.6 Subscriptions (Assinaturas)
- [ ] Entidade Subscription (domain)
- [ ] Use Cases: CreateSubscription, CancelSubscription, RenewSubscription, CheckSubscriptionStatus
- [ ] Logica de expiracao automatica
- [ ] Rotas: /client/subscription

### 1.7 Pagamentos
- [ ] Entidade Payment (domain)
- [ ] Use Cases: CreatePayment, ProcessWebhook, ListPayments
- [ ] Integracao com gateway (adapter pattern)
- [ ] Webhook endpoint
- [ ] Rotas: /client/payments, /webhooks/payment

### 1.8 Validacao de Descontos
- [ ] Entidade Validation (domain)
- [ ] Use Cases: ValidateDiscount, GetValidationHistory
- [ ] Logica de verificacao (plano ativo + parceiro ativo)
- [ ] Geracao de codigo unico de validacao
- [ ] Rotas: POST /validations/validate, GET /validations/history

### 1.9 Emails
- [ ] Service de email (SendGrid)
- [ ] Templates: boas-vindas, confirmacao pagamento, lembrete renovacao, cancelamento, reset senha, aprovacao parceiro

---

## FASE 2 - Frontend Base

### 2.1 Design System
- [ ] Definir paleta de cores Vale+
- [ ] Tipografia (font-family, sizes, weights)
- [ ] Espacamento (spacing scale)
- [ ] Breakpoints responsivos
- [ ] Variaveis SCSS globais
- [ ] Mixins SCSS uteis

### 2.2 Componentes UI
- [ ] Button (variantes: primary, secondary, outline, ghost, sizes)
- [ ] Input (text, email, password, phone, CPF, CNPJ com mascaras)
- [ ] Select / Dropdown
- [ ] Card
- [ ] Modal / Dialog
- [ ] Toast / Notificacao
- [ ] Loading / Spinner
- [ ] Badge / Tag
- [ ] Avatar
- [ ] Table (com paginacao)
- [ ] Tabs
- [ ] Accordion (FAQ)
- [ ] Sidebar (dashboards)
- [ ] Header / Navbar
- [ ] Footer

### 2.3 Autenticacao (Frontend)
- [ ] Context de autenticacao (AuthContext)
- [ ] Tela de Login
- [ ] Tela de Cadastro (Cliente)
- [ ] Tela de Esqueci Senha
- [ ] Tela de Redefinir Senha
- [ ] Protecao de rotas (PrivateRoute)
- [ ] Interceptor Axios (refresh token automatico)

### 2.4 Layouts
- [ ] Layout publico (Header + Footer)
- [ ] Layout Dashboard Cliente (Sidebar + Header + Content)
- [ ] Layout Dashboard Parceiro (Sidebar + Header + Content)
- [ ] Layout Dashboard Admin (Sidebar + Header + Content)

---

## FASE 3 - Landing Page

### 3.1 Paginas Publicas
- [ ] Home (Landing Page completa)
  - [ ] Hero Section
  - [ ] Beneficios
  - [ ] Como Funciona
  - [ ] Parceiros em Destaque
  - [ ] Planos e Precos
  - [ ] Depoimentos
  - [ ] Numeros/Estatisticas
  - [ ] FAQ
  - [ ] Secao Parceiros (CTA)
  - [ ] Footer
- [ ] Pagina "Para Clientes" (detalhes + CTA cadastro)
- [ ] Pagina "Para Parceiros" (detalhes + CTA cadastro)
- [ ] Pagina de Termos de Uso
- [ ] Pagina de Politica de Privacidade

### 3.2 Checkout
- [ ] Pagina de Checkout apos cadastro
- [ ] Selecao avulso/recorrente
- [ ] Integracao visual com gateway
- [ ] Pagina de confirmacao de pagamento

---

## FASE 4 - Dashboards

### 4.1 Dashboard do Cliente
- [ ] Pagina inicial (resumo)
- [ ] Cartao Virtual (componente visual)
- [ ] Status do Plano
- [ ] Extrato de Pagamentos
- [ ] Scanner QR Code (camera)
- [ ] Tela de Validacao de Desconto
- [ ] Historico de Validacoes
- [ ] Meus Dados (edicao)
- [ ] Renovar Plano
- [ ] Cancelar Assinatura

### 4.2 Dashboard do Parceiro
- [ ] Pagina inicial (resumo)
- [ ] QR Code (visualizacao + download)
- [ ] Historico de Validacoes
- [ ] Dados do Estabelecimento (edicao)

### 4.3 Dashboard Admin
- [ ] Pagina inicial (metricas e graficos)
- [ ] Gestao de Planos (CRUD)
- [ ] Gestao de Clientes (lista + detalhes + acoes)
- [ ] Gestao de Parceiros (lista + detalhes + aprovacao + acoes)
- [ ] Historico de Validacoes (geral)
- [ ] Financeiro (pagamentos + relatorios)
- [ ] Configuracoes da plataforma

---

## FASE 5 - Integracoes

### 5.1 Gateway de Pagamento
- [ ] Configurar conta no gateway
- [ ] Implementar adapter de pagamento
- [ ] Testar fluxo completo (sandbox)
- [ ] Configurar webhooks

### 5.2 SendGrid
- [ ] Configurar conta e dominio
- [ ] Criar templates de email (HTML)
- [ ] Testar envio de todos os tipos de email

### 5.3 Cloudflare R2
- [ ] Configurar bucket
- [ ] Implementar upload de logos de parceiros
- [ ] Testar upload e exibicao

### 5.4 Socket.io (Notificacoes)
- [ ] Configurar servidor Socket.io
- [ ] Notificacoes para admin (novo parceiro, novo cliente)
- [ ] Notificacao para parceiro (nova validacao)

---

## FASE 6 - Polish & Deploy

### 6.1 Responsividade
- [ ] Testar e ajustar landing page em mobile
- [ ] Testar e ajustar dashboards em mobile
- [ ] Testar fluxo de validacao (QR Code) em mobile

### 6.2 SEO & Performance
- [ ] Meta tags (title, description, og:image)
- [ ] Lazy loading de imagens
- [ ] Code splitting por rota
- [ ] Otimizacao de bundle

### 6.3 Seguranca
- [ ] Revisao de validacoes (backend)
- [ ] Rate limiting em rotas criticas
- [ ] Sanitizacao de inputs
- [ ] Protecao contra CSRF
- [ ] Audit de dependencias

### 6.4 Deploy
- [ ] Configurar Vercel (frontend)
- [ ] Configurar Railway (backend + PostgreSQL)
- [ ] Variaveis de ambiente producao
- [ ] Dominio customizado
- [ ] SSL/HTTPS
- [ ] Testar fluxo completo em producao

### 6.5 Testes Finais
- [ ] Testar cadastro de cliente completo
- [ ] Testar pagamento (sandbox e producao)
- [ ] Testar validacao de desconto end-to-end
- [ ] Testar todos os fluxos de admin
- [ ] Testar em diferentes navegadores
- [ ] Testar em diferentes dispositivos

---

## Pos-MVP (Futuro)

- [ ] App mobile (React Native ou PWA)
- [ ] Multiplos planos com diferentes niveis
- [ ] Sistema de cashback
- [ ] Chat entre cliente e suporte
- [ ] Sistema de indicacao (member-get-member)
- [ ] Relatorios avancados com graficos
- [ ] Parceiro com multiplas unidades
- [ ] Geolocalizacao de parceiros
- [ ] Push notifications
- [ ] Integracao WhatsApp (API Business)
