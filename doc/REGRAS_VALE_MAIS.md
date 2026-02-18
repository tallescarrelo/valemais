# REGRAS E ACORDOS - VALE+ (Vale Mais Vantagens)

## CONSULTAR ESTE ARQUIVO ANTES DE QUALQUER IMPLEMENTACAO

Este documento foi adaptado das regras do projeto Pagmus, trazendo apenas o que se aplica ao Vale+.

---

## 0. NUNCA DELETAR ARQUIVOS SEM AUTORIZACAO EXPLICITA

### REGRA ABSOLUTA:
JAMAIS fazer commit com arquivos deletados sem autorizacao explicita do usuario.

### PROCEDIMENTO OBRIGATORIO:
Antes de QUALQUER commit:
1. Executar `git status` e verificar se ha arquivos deletados
2. Se houver arquivos deletados: PARAR e AVISAR o usuario
3. Listar os arquivos deletados e pedir confirmacao
4. Aguardar resposta explicita antes de prosseguir

---

## 1. NUNCA USAR DADOS MOCKADOS

### PROIBIDO:
- Criar dados falsos/ficticios no codigo
- Usar arrays hardcoded com informacoes falsas
- Retornar valores simulados em APIs
- Fazer "placeholders" temporarios com dados falsos
- Hardcodar valores como preco de plano (R$ 19,90) - buscar do banco

### OBRIGATORIO:
- SEMPRE integrar Frontend + Backend + Banco de Dados
- SEMPRE buscar dados reais do PostgreSQL
- SEMPRE usar endpoints que retornam dados do banco
- Valores como preco do plano devem ser cadastrados via admin e buscados do banco

---

## 2. NUNCA MENCIONAR PLATAFORMAS EXTERNAS NOS TEXTOS DA UI

### PROIBIDO:
- Textos de ajuda mencionando "Pagar.me", "SendGrid", etc.
- Placeholders com nomes de integracoes
- Labels explicando "obrigatorio para [Plataforma X]"
- Mensagens de erro citando plataformas externas

### OBRIGATORIO:
- Textos genericos e profissionais
- Focar no proposito do campo, nao na integracao
- Manter a experiencia do usuario limpa

### EXEMPLO:
```
ERRADO:  "CEP (para integracao com Correios)"
CORRETO: "CEP"

ERRADO:  "Referencia para localizacao (obrigatorio para Pagar.me)"
CORRETO: "Referencia para localizacao"
```

---

## 3. GIT - REGRAS CRITICAS

### 3.1 NUNCA FAZER PUSH SEM AUTORIZACAO
- NUNCA fazer commit ou push automaticamente
- SEMPRE testar localmente antes de commitar
- SEMPRE avisar o usuario que a implementacao esta pronta
- SEMPRE aguardar autorizacao explicita para commitar e fazer push

### 3.2 ESTRUTURA DO REPOSITORIO
```
ValeMais/
├── frontend/          <- Repositorio Git separado (deploy: Vercel)
│   └── .git/
├── backend/           <- Repositorio Git separado (deploy: Railway)
│   └── .git/
├── doc/               <- Documentacao local (NAO commitada)
└── imagens/           <- Referencias visuais (NAO commitadas)
```

- Frontend e Backend tem repositorios Git INDEPENDENTES
- Comandos git devem ser executados DENTRO de frontend/ ou backend/
- NUNCA executar git na raiz do monorepo
- A pasta doc/ e imagens/ sao apenas locais

### 3.3 FLUXO DE TRABALHO COM BRANCHES
```
1. Implementar na main local
2. Testar localmente
3. Avisar usuario que esta pronto
4. Aguardar autorizacao
5. Criar feature branch a partir da main
6. Commit na feature branch
7. Push da feature branch (NUNCA push direto para main)
8. Criar PR: feature -> main
9. Aguardar usuario revisar e mergear
10. Sincronizar main local apos merge
```

### 3.4 NOMENCLATURA DE BRANCHES
```
feature/nome-descritivo       # Nova funcionalidade
fix/nome-do-bug               # Correcao de bug
refactor/nome-da-refatoracao  # Refatoracao
```

### 3.5 ANTES DE QUALQUER COMMIT - CHECKLIST
- [ ] Executei `git status`?
- [ ] Verifiquei se ha arquivos deletados?
- [ ] Se sim: PAREI e AVISEI o usuario?
- [ ] Testei localmente?
- [ ] O usuario autorizou o commit?
- [ ] Estou commitando na feature branch (NAO na main)?

---

## 4. NUNCA USAR URLs HARDCODED

### PROIBIDO:
- URLs hardcoded: `'http://localhost:5000'`
- BaseURL fixo em services
- Endpoints absolutos em fetch/axios

### OBRIGATORIO:
- Usar arquivo de configuracao para URLs de API
- Detectar ambiente automaticamente (development/production)
- Todas as requisicoes devem usar a variavel de configuracao

### EXEMPLO PARA O VALE+:
```typescript
// frontend/src/config/api.ts
const getApiUrl = (): string => {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  if (import.meta.env.PROD || window.location.hostname !== 'localhost') {
    return 'https://api.valemaisvantagens.com.br';
  }
  return 'http://localhost:5000';
};

export const API_URL = getApiUrl();
```

---

## 5. VALORES MONETARIOS - PADRAO OBRIGATORIO

### Armazenamento:
- Banco de Dados: SEMPRE em centavos (INTEGER)
- Frontend: SEMPRE formatado (STRING com R$)
- APIs: SEMPRE retornar centavos, converter no frontend

### Fluxo:
1. Input do usuario: "R$ 19,90"
2. Converter para centavos: 1990 (para salvar no banco)
3. Buscar do banco: 1990 centavos
4. Exibir formatado: "R$ 19,90"

### Usar funcao utilitaria de formatacao:
```typescript
// Centavos -> Display
formatCurrency(1990) // "R$ 19,90"

// Display -> Centavos
toCents("19,90") // 1990
```

---

## 6. ARQUITETURA MODULAR - PADRAO OBRIGATORIO

### Backend (Clean Architecture + DDD):
```
backend/src/
├── domain/           # Entidades e regras de negocio
├── application/      # Use cases (orquestracao)
├── infrastructure/   # Implementacoes (DB, email, pagamento)
└── interfaces/       # HTTP routes, controllers, middlewares
```

- NUNCA implementar logica de negocio nos controllers
- NUNCA colocar SQL/queries nos use cases
- Use Cases orquestram, Domain contem regras, Infra implementa

### Frontend:
```
frontend/src/
├── components/ui/    # Componentes reutilizaveis
├── pages/            # Paginas da aplicacao
├── services/         # Chamadas API (camada de abstracao)
├── hooks/            # Custom hooks
├── contexts/         # React contexts
└── config/           # Configuracoes
```

- NUNCA fazer chamadas API direto nos componentes
- SEMPRE usar a camada de services
- SEMPRE usar hooks para logica reutilizavel

---

## 7. DOCUMENTACAO - CONSULTAR ANTES DE AJUSTES

### OBRIGATORIO:
- Ler documentacao existente ANTES de fazer ajustes
- Entender a arquitetura atual antes de modificar
- Atualizar documentacao quando fizer mudancas significativas
- Commitar documentacao junto com o codigo

### ESTRUTURA:
```
doc/
├── REGRAS_VALE_MAIS.md       <- Este arquivo (ler primeiro!)
├── VISAO_GERAL.md            <- Visao do projeto
├── FUNCIONALIDADES.md        <- Features detalhadas
├── ARQUITETURA.md            <- Arquitetura tecnica
├── DATABASE.md               <- Modelo de dados
├── FLUXOS.md                 <- Jornadas de usuario
├── ROADMAP.md                <- Fases de desenvolvimento
├── API.md                    <- Endpoints da API
└── CHECKLIST.md              <- Checklist de entrega
```

---

## 8. SEGURANCA

### OBRIGATORIO:
- Senhas SEMPRE com hash bcrypt (nunca plain text)
- JWT com expiracao curta (15min access, 7d refresh)
- Rate limiting em rotas publicas e de login
- Validacao de input em TODAS as rotas (Zod)
- CORS configurado para aceitar apenas o frontend
- Helmet configurado no Express
- Variaveis sensiveis APENAS em .env (nunca no codigo)
- .env NUNCA commitado (esta no .gitignore)

### ROLES:
- CLIENT: Acesso apenas a dashboard do cliente
- PARTNER: Acesso apenas a dashboard do parceiro
- ADMIN: Acesso total

### AUTENTICACAO:
- Access Token: Bearer no header Authorization
- Refresh Token: httpOnly cookie
- Middleware valida token e injeta user no request

---

## 9. DEPLOY - AMBIENTES

### DESENVOLVIMENTO:
```
Frontend: http://localhost:5173 (Vite default)
Backend:  http://localhost:5000
Banco:    PostgreSQL local ou Railway
```

### PRODUCAO:
```
Frontend: https://valemaisvantagens.com.br (Vercel)
Backend:  Railway (URL a definir)
Banco:    PostgreSQL Railway
```

### REGRAS:
- NUNCA fazer deploy direto em producao sem testar localmente
- Variaveis de ambiente configuradas nas plataformas (Vercel/Railway)
- Migrations automaticas no deploy (`prisma migrate deploy`)

---

## 10. COMUNICACAO COM O USUARIO

### ANTES de fazer mudancas significativas:
- Explicar o que vai ser feito
- Perguntar se esta de acordo
- Aguardar confirmacao

### APOS implementar:
- Avisar que esta pronto e testado
- Aguardar autorizacao para commitar
- Gerar descricao de PR quando solicitado

### NUNCA:
- Sair mudando codigo sem avisar
- Assumir decisoes de arquitetura sem consultar
- Commitar sem autorizacao
- Fazer push sem autorizacao

---

## CHECKLIST RAPIDO ANTES DE QUALQUER IMPLEMENTACAO:

- [ ] Li a documentacao relevante?
- [ ] Entendi o que precisa ser feito?
- [ ] Nao estou usando dados mockados?
- [ ] URLs nao estao hardcoded?
- [ ] Valores monetarios em centavos no banco?
- [ ] Arquitetura modular sendo seguida?
- [ ] Textos da UI nao mencionam plataformas externas?
- [ ] Vou testar localmente antes de commitar?
- [ ] Vou aguardar autorizacao antes de commitar?
- [ ] git status nao tem arquivos deletados sem autorizacao?

---

## INFORMACOES DO PROJETO

### Dominio:
- **Producao**: valemaisvantagens.com.br

### Plano MVP:
- **Nome**: A definir (cadastrado pelo admin)
- **Valor**: R$ 19,90/mes
- **Tipo**: Avulso ou recorrente (escolha do cliente)

### Parceiros:
- **Adesao**: Gratuita (parceiro nao paga nada)
- **Fluxo**: Cadastro -> Aprovacao pelo admin -> Ativo

### Gateway de Pagamento:
- **Plataforma**: Pagar.me (conta em criacao)
- **Metodos**: PIX, cartao de credito, boleto

### Validacao de Desconto:
- **Limite**: Sem limite (cliente pode validar quantas vezes quiser)

### Cores da Marca (extraidas do logo SVG):
```
Primaria (cinza escuro):  #3c3c3b
Accent (verde):           #3aaa35
Branco:                   #ffffff
```
