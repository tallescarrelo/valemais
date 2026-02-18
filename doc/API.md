# Vale+ - Endpoints da API (v1)

Base URL: `https://api.valemais.com.br/api/v1`

## Autenticacao

| Metodo | Rota | Descricao | Auth |
|--------|------|-----------|------|
| POST | `/auth/register` | Cadastro de cliente | Publico |
| POST | `/auth/login` | Login (cliente, parceiro, admin) | Publico |
| POST | `/auth/refresh` | Renovar access token | Refresh Token |
| POST | `/auth/logout` | Logout (invalida refresh token) | Auth |
| POST | `/auth/forgot-password` | Solicitar reset de senha | Publico |
| POST | `/auth/reset-password` | Redefinir senha com token | Publico |

### POST /auth/register
```json
// Request
{
  "name": "Joao Silva",
  "email": "joao@email.com",
  "cpf": "12345678900",
  "phone": "11999999999",
  "password": "SenhaForte123!",
  "birthDate": "1990-05-15",       // opcional
  "acceptTerms": true
}

// Response 201
{
  "user": {
    "id": "clx...",
    "name": "Joao Silva",
    "email": "joao@email.com",
    "cardCode": "VM-2026-XXXXX",
    "role": "CLIENT"
  },
  "tokens": {
    "accessToken": "eyJ...",
    "refreshToken": "eyJ..."
  }
}
```

### POST /auth/login
```json
// Request
{
  "email": "joao@email.com",
  "password": "SenhaForte123!"
}

// Response 200
{
  "user": { ... },
  "tokens": {
    "accessToken": "eyJ...",
    "refreshToken": "eyJ..."
  }
}
```

---

## Cliente

| Metodo | Rota | Descricao | Auth |
|--------|------|-----------|------|
| GET | `/client/profile` | Dados do cliente logado | CLIENT |
| PUT | `/client/profile` | Atualizar dados | CLIENT |
| PUT | `/client/change-password` | Trocar senha | CLIENT |
| GET | `/client/card` | Dados do cartao virtual | CLIENT |
| GET | `/client/subscription` | Assinatura atual | CLIENT |
| POST | `/client/subscription/cancel` | Cancelar assinatura | CLIENT |
| GET | `/client/payments` | Extrato de pagamentos | CLIENT |
| GET | `/client/validations` | Historico de validacoes | CLIENT |

### GET /client/card
```json
// Response 200
{
  "cardCode": "VM-2026-XXXXX",
  "clientName": "Joao Silva",
  "status": "ACTIVE",
  "planName": "Plano Vale+",
  "validUntil": "2026-03-11T00:00:00Z"
}
```

---

## Parceiro

| Metodo | Rota | Descricao | Auth |
|--------|------|-----------|------|
| POST | `/partner/register` | Cadastro de parceiro | Publico |
| GET | `/partner/profile` | Dados do parceiro logado | PARTNER |
| PUT | `/partner/profile` | Atualizar dados | PARTNER |
| GET | `/partner/qrcode` | Obter QR Code | PARTNER |
| GET | `/partner/validations` | Historico de validacoes | PARTNER |
| GET | `/partner/stats` | Estatisticas resumidas | PARTNER |

### POST /partner/register
```json
// Request
{
  "companyName": "Restaurante Bom Sabor LTDA",
  "tradeName": "Restaurante Bom Sabor",
  "cnpj": "12345678000100",
  "email": "contato@bomsabor.com.br",
  "phone": "11988888888",
  "zipCode": "01310100",
  "street": "Av Paulista",
  "number": "1000",
  "complement": "Loja 5",
  "neighborhood": "Bela Vista",
  "city": "Sao Paulo",
  "state": "SP",
  "category": "FOOD",
  "discountType": "PERCENTAGE",
  "discountValue": 10,
  "discountDescription": "10% de desconto em todos os pratos",
  "password": "SenhaForte123!",
  "userName": "Carlos Santos"
}

// Response 201
{
  "partner": {
    "id": "clx...",
    "tradeName": "Restaurante Bom Sabor",
    "status": "PENDING"
  },
  "message": "Cadastro recebido! Aguarde aprovacao da equipe Vale+."
}
```

---

## Validacao de Desconto

| Metodo | Rota | Descricao | Auth |
|--------|------|-----------|------|
| GET | `/validations/partner/{partnerCode}` | Info do parceiro para validacao | CLIENT |
| POST | `/validations/validate` | Validar desconto | CLIENT |
| GET | `/validations/{id}` | Detalhes de uma validacao | CLIENT |

### GET /validations/partner/{partnerCode}
```json
// Response 200
{
  "partner": {
    "tradeName": "Restaurante Bom Sabor",
    "logoUrl": "https://r2.valemais.com.br/logos/xxx.png",
    "category": "FOOD",
    "discountType": "PERCENTAGE",
    "discountValue": 10,
    "discountDescription": "10% de desconto em todos os pratos"
  }
}
```

### POST /validations/validate
```json
// Request
{
  "partnerCode": "PBOMSABOR2026"
}

// Response 200 (Valido)
{
  "status": "VALID",
  "validation": {
    "id": "clx...",
    "code": "VAL-A1B2C3",
    "partnerName": "Restaurante Bom Sabor",
    "discountDescription": "10% de desconto em todos os pratos",
    "validatedAt": "2026-02-11T14:35:00Z"
  }
}

// Response 200 (Invalido)
{
  "status": "INVALID",
  "reason": "SUBSCRIPTION_EXPIRED",
  "message": "Seu plano esta vencido. Renove para continuar usando seus beneficios.",
  "renewUrl": "/client/subscription/renew"
}
```

---

## Admin

### Planos
| Metodo | Rota | Descricao | Auth |
|--------|------|-----------|------|
| GET | `/admin/plans` | Listar planos | ADMIN |
| POST | `/admin/plans` | Criar plano | ADMIN |
| GET | `/admin/plans/{id}` | Detalhes do plano | ADMIN |
| PUT | `/admin/plans/{id}` | Atualizar plano | ADMIN |
| PATCH | `/admin/plans/{id}/toggle` | Ativar/desativar | ADMIN |

### Clientes
| Metodo | Rota | Descricao | Auth |
|--------|------|-----------|------|
| GET | `/admin/clients` | Listar clientes | ADMIN |
| GET | `/admin/clients/{id}` | Detalhes do cliente | ADMIN |
| PATCH | `/admin/clients/{id}/status` | Alterar status | ADMIN |

### Parceiros
| Metodo | Rota | Descricao | Auth |
|--------|------|-----------|------|
| GET | `/admin/partners` | Listar parceiros | ADMIN |
| POST | `/admin/partners` | Cadastrar parceiro (admin) | ADMIN |
| GET | `/admin/partners/{id}` | Detalhes do parceiro | ADMIN |
| PUT | `/admin/partners/{id}` | Atualizar parceiro | ADMIN |
| PATCH | `/admin/partners/{id}/approve` | Aprovar parceiro | ADMIN |
| PATCH | `/admin/partners/{id}/reject` | Reprovar parceiro | ADMIN |
| PATCH | `/admin/partners/{id}/status` | Alterar status | ADMIN |

### Validacoes
| Metodo | Rota | Descricao | Auth |
|--------|------|-----------|------|
| GET | `/admin/validations` | Listar todas validacoes | ADMIN |
| GET | `/admin/validations/stats` | Estatisticas | ADMIN |

### Financeiro
| Metodo | Rota | Descricao | Auth |
|--------|------|-----------|------|
| GET | `/admin/payments` | Listar pagamentos | ADMIN |
| GET | `/admin/payments/stats` | Estatisticas financeiras | ADMIN |
| GET | `/admin/payments/export` | Exportar CSV | ADMIN |

### Dashboard
| Metodo | Rota | Descricao | Auth |
|--------|------|-----------|------|
| GET | `/admin/dashboard` | Metricas gerais | ADMIN |

### Configuracoes
| Metodo | Rota | Descricao | Auth |
|--------|------|-----------|------|
| GET | `/admin/settings` | Obter configuracoes | ADMIN |
| PUT | `/admin/settings` | Atualizar configuracoes | ADMIN |

---

## Publico

| Metodo | Rota | Descricao | Auth |
|--------|------|-----------|------|
| GET | `/public/plans` | Planos disponiveis | Publico |
| GET | `/public/partners` | Parceiros para landing page | Publico |
| GET | `/public/stats` | Numeros para landing page | Publico |

---

## Webhooks (Gateway de Pagamento)

| Metodo | Rota | Descricao | Auth |
|--------|------|-----------|------|
| POST | `/webhooks/payment` | Webhook do gateway | Signature |

---

## Padroes de Resposta

### Sucesso
```json
{
  "data": { ... },
  "message": "Operacao realizada com sucesso"
}
```

### Erro
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Dados invalidos",
    "details": [
      { "field": "email", "message": "Email ja cadastrado" }
    ]
  }
}
```

### Lista Paginada
```json
{
  "data": [ ... ],
  "pagination": {
    "page": 1,
    "perPage": 20,
    "total": 150,
    "totalPages": 8
  }
}
```

## Codigos de Status HTTP
- `200` - Sucesso
- `201` - Criado com sucesso
- `400` - Erro de validacao
- `401` - Nao autenticado
- `403` - Sem permissao
- `404` - Nao encontrado
- `409` - Conflito (ex: email ja cadastrado)
- `429` - Rate limit excedido
- `500` - Erro interno
