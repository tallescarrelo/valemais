# Vale+ - Arquitetura Tecnica

## Estrutura do Monorepo

```
ValeMais/
├── doc/                          # Documentacao do projeto
│   ├── VISAO_GERAL.md
│   ├── FUNCIONALIDADES.md
│   ├── ARQUITETURA.md
│   ├── DATABASE.md
│   ├── FLUXOS.md
│   ├── ROADMAP.md
│   └── API.md
├── frontend/                     # React SPA (deploy: Vercel)
│   ├── public/
│   ├── src/
│   │   ├── assets/               # Imagens, fontes, icones
│   │   ├── components/           # Componentes reutilizaveis
│   │   │   ├── ui/               # Botoes, inputs, modals, cards
│   │   │   ├── layout/           # Header, Footer, Sidebar, etc.
│   │   │   └── shared/           # Componentes compartilhados
│   │   ├── pages/                # Paginas da aplicacao
│   │   │   ├── public/           # Landing, Login, Cadastro
│   │   │   ├── client/           # Dashboard do Cliente
│   │   │   ├── partner/          # Dashboard do Parceiro
│   │   │   └── admin/            # Dashboard Admin
│   │   ├── hooks/                # Custom React hooks
│   │   ├── contexts/             # React Contexts (Auth, Theme, etc.)
│   │   ├── services/             # API calls (axios/fetch)
│   │   ├── utils/                # Funcoes utilitarias
│   │   ├── styles/               # SCSS globais e variaveis
│   │   │   ├── _variables.scss
│   │   │   ├── _mixins.scss
│   │   │   ├── _reset.scss
│   │   │   └── global.scss
│   │   ├── routes/               # Configuracao de rotas
│   │   ├── types/                # TypeScript types/interfaces
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── .env.example
│   ├── vite.config.ts
│   ├── tsconfig.json
│   └── package.json
├── backend/                      # Node.js API (deploy: Railway)
│   ├── prisma/
│   │   ├── schema.prisma         # Schema do banco
│   │   ├── migrations/           # Migrations
│   │   └── seed.ts               # Seed de dados iniciais
│   ├── src/
│   │   ├── domain/               # Camada de Dominio (DDD)
│   │   │   ├── entities/         # Entidades do dominio
│   │   │   ├── repositories/     # Interfaces dos repositorios
│   │   │   ├── services/         # Servicos de dominio
│   │   │   └── value-objects/    # Value Objects
│   │   ├── application/          # Camada de Aplicacao
│   │   │   ├── use-cases/        # Casos de uso
│   │   │   │   ├── client/
│   │   │   │   ├── partner/
│   │   │   │   ├── admin/
│   │   │   │   ├── auth/
│   │   │   │   ├── payment/
│   │   │   │   └── validation/
│   │   │   ├── dtos/             # Data Transfer Objects
│   │   │   └── mappers/          # Mapeadores entidade <-> DTO
│   │   ├── infrastructure/       # Camada de Infraestrutura
│   │   │   ├── database/         # Prisma client, repositorios
│   │   │   ├── email/            # SendGrid service
│   │   │   ├── payment/          # Gateway de pagamento
│   │   │   ├── storage/          # Cloudflare R2
│   │   │   ├── auth/             # JWT, bcrypt
│   │   │   └── qrcode/           # Geracao de QR Code
│   │   ├── interfaces/           # Camada de Interface (API)
│   │   │   ├── http/
│   │   │   │   ├── routes/       # Definicao de rotas
│   │   │   │   ├── controllers/  # Controllers
│   │   │   │   ├── middlewares/  # Auth, validation, error handling
│   │   │   │   └── validators/   # Schemas de validacao (Zod)
│   │   │   └── websocket/        # Socket.io events
│   │   ├── shared/               # Codigo compartilhado
│   │   │   ├── errors/           # Classes de erro customizadas
│   │   │   ├── utils/            # Utilitarios
│   │   │   └── constants/        # Constantes
│   │   └── server.ts             # Entry point
│   ├── .env.example
│   ├── tsconfig.json
│   └── package.json
├── imagens/                      # Referencias visuais
└── README.md
```

## Stack Detalhada

### Frontend
| Tecnologia | Uso |
|---|---|
| **React 18+** | Framework UI |
| **Vite** | Build tool + dev server |
| **TypeScript** | Tipagem estatica |
| **SCSS Modules** | Estilizacao com escopo local |
| **React Router v6** | Roteamento SPA |
| **Axios** | Cliente HTTP |
| **React Hook Form + Zod** | Formularios + validacao |
| **Socket.io Client** | Notificacoes real-time |
| **html5-qrcode** | Leitura de QR Code via camera |
| **React Hot Toast** | Notificacoes/toasts |
| **Lucide React** | Icones |
| **Framer Motion** | Animacoes |

### Backend
| Tecnologia | Uso |
|---|---|
| **Node.js 20+** | Runtime |
| **Express** | Framework HTTP |
| **TypeScript** | Tipagem estatica |
| **Prisma** | ORM + migrations |
| **PostgreSQL** | Banco de dados |
| **Zod** | Validacao de schemas |
| **JWT (jsonwebtoken)** | Autenticacao |
| **bcryptjs** | Hash de senhas |
| **SendGrid** | Envio de emails |
| **qrcode** | Geracao de QR Codes |
| **Socket.io** | WebSocket real-time |
| **Multer + R2** | Upload de arquivos |
| **helmet + cors** | Seguranca HTTP |
| **express-rate-limit** | Rate limiting |
| **winston** | Logging |

## Padroes Arquiteturais

### Backend: Clean Architecture + DDD

```
Interfaces (HTTP/WS) --> Application (Use Cases) --> Domain (Entities)
                              |
                        Infrastructure (DB, Email, Payment, Storage)
```

**Principios:**
- Dependencias apontam para dentro (dominio nao depende de infra)
- Use Cases orquestram a logica de negocio
- Entities contem regras de dominio
- Repositories sao interfaces no dominio, implementados na infra
- DTOs na fronteira da aplicacao

### Frontend: Feature-based Organization
- Paginas agrupadas por area (public, client, partner, admin)
- Componentes reutilizaveis em components/ui/
- Logica compartilhada via hooks e contexts
- Services como camada de abstracao para API calls

## Autenticacao e Autorizacao

### Fluxo de Auth
1. Login via email + senha
2. Backend gera par de tokens JWT:
   - **Access Token** (curta duracao: 15min)
   - **Refresh Token** (longa duracao: 7 dias)
3. Access Token enviado no header `Authorization: Bearer <token>`
4. Refresh Token armazenado em httpOnly cookie
5. Middleware de auth valida token e injeta user no request

### Roles (Papeis)
- `CLIENT` - Acesso a dashboard do cliente
- `PARTNER` - Acesso a dashboard do parceiro
- `ADMIN` - Acesso total

### Middleware de Autorizacao
- `requireAuth()` - Verifica se esta autenticado
- `requireRole('ADMIN')` - Verifica role especifica
- `requireActiveSubscription()` - Verifica plano ativo (para validacao)

## Integracao com Gateway de Pagamento

### Fluxo de Pagamento
1. Cliente escolhe plano e tipo (avulso ou recorrente)
2. Frontend envia para backend os dados do plano
3. Backend cria sessao/checkout no gateway
4. Cliente e redirecionado para pagamento (ou paga inline)
5. Gateway envia webhook para backend confirmando pagamento
6. Backend ativa o plano do cliente
7. Email de confirmacao e enviado

### Webhooks
- `payment.confirmed` -> Ativa plano
- `payment.failed` -> Marca como falho, notifica cliente
- `subscription.cancelled` -> Desativa plano
- `subscription.renewed` -> Renova plano

## Deploy

### Frontend (Vercel)
- Build: `npm run build` (Vite)
- SPA com fallback para index.html
- Variaveis de ambiente via Vercel Dashboard
- Preview deploys automaticos por branch

### Backend (Railway)
- Dockerfile ou Nixpacks
- PostgreSQL como servico no Railway
- Variaveis de ambiente via Railway Dashboard
- Migrations automaticas no deploy (`prisma migrate deploy`)

### CI/CD
- GitHub Actions (futuro)
- Lint + Type check + Testes antes do merge
- Deploy automatico ao merge na main
