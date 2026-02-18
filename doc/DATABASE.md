# Vale+ - Modelo de Dados (PostgreSQL + Prisma)

## Diagrama de Entidades

```
┌──────────┐     ┌──────────────┐     ┌───────────┐
│   User   │────>│ Subscription │────>│   Plan    │
│(Cliente) │     │  (Assinatura)│     │  (Plano)  │
└──────────┘     └──────────────┘     └───────────┘
     │
     │           ┌──────────────┐
     ├──────────>│   Payment    │
     │           │ (Pagamento)  │
     │           └──────────────┘
     │
     │           ┌──────────────┐     ┌───────────┐
     └──────────>│  Validation  │<────│  Partner  │
                 │ (Validacao)  │     │ (Parceiro)│
                 └──────────────┘     └───────────┘
                                           │
                                     ┌───────────┐
                                     │PartnerUser│
                                     │(User do   │
                                     │ parceiro) │
                                     └───────────┘
```

## Entidades Detalhadas

### User (Cliente)
```prisma
model User {
  id              String    @id @default(cuid())
  name            String
  email           String    @unique
  cpf             String    @unique
  phone           String
  password        String    // hash bcrypt
  birthDate       DateTime?
  role            Role      @default(CLIENT)
  status          UserStatus @default(ACTIVE)
  cardCode        String    @unique // Codigo unico do cartao virtual

  // Endereco (opcional)
  zipCode         String?
  street          String?
  number          String?
  complement      String?
  neighborhood    String?
  city            String?
  state           String?

  // Relacionamentos
  subscriptions   Subscription[]
  payments        Payment[]
  validations     Validation[]

  // Metadata
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
  lastLoginAt     DateTime?

  @@map("users")
}

enum Role {
  CLIENT
  PARTNER
  ADMIN
}

enum UserStatus {
  ACTIVE
  INACTIVE
  BLOCKED
}
```

### Partner (Parceiro/Estabelecimento)
```prisma
model Partner {
  id              String    @id @default(cuid())
  companyName     String    // Razao Social
  tradeName       String    // Nome Fantasia
  cnpj            String    @unique
  email           String    @unique
  phone           String

  // Endereco
  zipCode         String
  street          String
  number          String
  complement      String?
  neighborhood    String
  city            String
  state           String

  // Dados do parceiro
  category        PartnerCategory
  discountType    DiscountType   @default(PERCENTAGE)
  discountValue   Decimal        // Ex: 10 (para 10%) ou 5.00 (para R$5)
  discountDescription String     // Ex: "10% em todos os produtos"

  // Media
  logoUrl         String?

  // Configuracoes
  partnerCode     String    @unique // Codigo unico para QR Code
  qrCodeUrl       String?   // URL do QR Code gerado
  status          PartnerStatus @default(PENDING)

  // Opcional
  website         String?
  instagram       String?
  openingHours    String?   // JSON ou texto livre

  // Relacionamentos
  users           PartnerUser[]
  validations     Validation[]

  // Metadata
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt

  @@map("partners")
}

model PartnerUser {
  id          String   @id @default(cuid())
  name        String
  email       String   @unique
  password    String
  partnerId   String
  partner     Partner  @relation(fields: [partnerId], references: [id])

  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@map("partner_users")
}

enum PartnerCategory {
  FOOD          // Alimentacao
  HEALTH        // Saude
  BEAUTY        // Beleza
  SERVICES      // Servicos
  EDUCATION     // Educacao
  ENTERTAINMENT // Entretenimento
  FASHION       // Moda
  AUTOMOTIVE    // Automotivo
  TECHNOLOGY    // Tecnologia
  OTHER         // Outros
}

enum DiscountType {
  PERCENTAGE    // Desconto em %
  FIXED         // Desconto em valor fixo (R$)
}

enum PartnerStatus {
  PENDING       // Aguardando aprovacao
  ACTIVE        // Ativo
  INACTIVE      // Inativo
  BLOCKED       // Bloqueado
}
```

### Plan (Plano)
```prisma
model Plan {
  id              String    @id @default(cuid())
  name            String    // Ex: "Plano Vale+"
  description     String
  price           Decimal   // Valor do plano
  intervalMonths  Int       @default(1) // Intervalo em meses
  benefits        String[]  // Lista de beneficios
  isActive        Boolean   @default(true)

  // Relacionamentos
  subscriptions   Subscription[]

  // Metadata
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt

  @@map("plans")
}
```

### Subscription (Assinatura)
```prisma
model Subscription {
  id              String    @id @default(cuid())
  userId          String
  user            User      @relation(fields: [userId], references: [id])
  planId          String
  plan            Plan      @relation(fields: [planId], references: [id])

  type            SubscriptionType
  status          SubscriptionStatus @default(PENDING)

  startDate       DateTime
  endDate         DateTime  // Data de expiracao
  nextBillingDate DateTime? // Proxima cobranca (se recorrente)
  cancelledAt     DateTime? // Data do cancelamento

  // Gateway
  externalId      String?   // ID no gateway de pagamento

  // Relacionamentos
  payments        Payment[]

  // Metadata
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt

  @@map("subscriptions")
}

enum SubscriptionType {
  ONE_TIME      // Pagamento unico
  RECURRING     // Assinatura recorrente
}

enum SubscriptionStatus {
  PENDING       // Aguardando pagamento
  ACTIVE        // Ativa
  EXPIRED       // Expirada
  CANCELLED     // Cancelada
  SUSPENDED     // Suspensa (falha pagamento)
}
```

### Payment (Pagamento)
```prisma
model Payment {
  id              String    @id @default(cuid())
  userId          String
  user            User      @relation(fields: [userId], references: [id])
  subscriptionId  String
  subscription    Subscription @relation(fields: [subscriptionId], references: [id])

  amount          Decimal
  status          PaymentStatus @default(PENDING)
  method          PaymentMethod?

  // Gateway
  externalId      String?   // ID da transacao no gateway
  gatewayResponse Json?     // Resposta completa do gateway

  paidAt          DateTime?

  // Metadata
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt

  @@map("payments")
}

enum PaymentStatus {
  PENDING
  CONFIRMED
  FAILED
  REFUNDED
  CANCELLED
}

enum PaymentMethod {
  CREDIT_CARD
  DEBIT_CARD
  PIX
  BOLETO
}
```

### Validation (Validacao de Desconto)
```prisma
model Validation {
  id              String    @id @default(cuid())
  userId          String
  user            User      @relation(fields: [userId], references: [id])
  partnerId       String
  partner         Partner   @relation(fields: [partnerId], references: [id])

  status          ValidationStatus
  code            String    @unique // Codigo unico da validacao
  reason          String?   // Motivo (se invalido)

  validatedAt     DateTime  @default(now())

  // Auditoria
  ipAddress       String?
  userAgent       String?

  // Metadata
  createdAt       DateTime  @default(now())

  @@map("validations")
}

enum ValidationStatus {
  VALID
  INVALID
}
```

### AdminConfig (Configuracoes Gerais)
```prisma
model AdminConfig {
  id              String    @id @default(cuid())
  key             String    @unique
  value           String
  description     String?

  updatedAt       DateTime  @updatedAt

  @@map("admin_configs")
}
```

## Indices Importantes

```prisma
// Busca rapida por cartao
@@index([cardCode]) // User

// Busca por parceiro via QR Code
@@index([partnerCode]) // Partner

// Validacoes por periodo
@@index([validatedAt]) // Validation
@@index([userId, validatedAt]) // Validacoes de um cliente
@@index([partnerId, validatedAt]) // Validacoes de um parceiro

// Pagamentos por usuario
@@index([userId, createdAt]) // Payment

// Subscriptions ativas
@@index([userId, status]) // Subscription
```

## Seed Inicial (Dados de Exemplo)

O seed deve criar:
1. **Admin padrao**: admin@valemais.com.br (senha temporaria)
2. **Plano MVP**: "Plano Vale+" - R$ XX,XX/mes
3. **Categorias**: Ja vem dos enums do Prisma
4. **Parceiros de exemplo**: 3-5 parceiros fictfcios para testes
5. **Cliente de exemplo**: 1 cliente com plano ativo para testes
