# 📋 REGRAS E ACORDOS IMPORTANTES - LEIA SEMPRE ANTES DE IMPLEMENTAR!

## ⚠️ **ATENÇÃO: ESTE ARQUIVO DEVE SER CONSULTADO ANTES DE QUALQUER IMPLEMENTAÇÃO**

---

## 🚨 **0. NUNCA DELETAR ARQUIVOS SEM AUTORIZAÇÃO EXPLÍCITA - REGRA CRÍTICA #1**

### **🛑 REGRA ABSOLUTA:**
**JAMAIS, EM HIPÓTESE ALGUMA, FAZER COMMIT COM ARQUIVOS DELETADOS SEM AUTORIZAÇÃO EXPLÍCITA DO USUÁRIO!**

### **❌ TOTALMENTE PROIBIDO:**
- Fazer `git add .` se houver arquivos deletados no `git status`
- Commitar com arquivos marcados como `D` (deleted) sem confirmação
- Assumir que arquivos deletados devem ser commitados
- Ignorar arquivos deletados no staging

### **✅ PROCEDIMENTO OBRIGATÓRIO:**

#### **ANTES de QUALQUER commit, executar:**
```bash
# 1. Verificar se há arquivos deletados
git status | grep "deleted:"

# Se aparecer QUALQUER arquivo deletado:
# 2. PARAR TUDO IMEDIATAMENTE
# 3. AVISAR O USUÁRIO: "🚨 DETECTADOS ARQUIVOS DELETADOS: [listar arquivos]"
# 4. PERGUNTAR: "Esses arquivos devem ser deletados? Confirme para eu prosseguir."
# 5. AGUARDAR resposta explícita do usuário
# 6. SE confirmado: prosseguir
# 7. SE negado: fazer `git checkout -- [arquivos]` para restaurá-los
```

### **📋 CHECKLIST OBRIGATÓRIO ANTES DE COMMIT:**
- [ ] **Executei `git status`?**
- [ ] **Verifiquei se há arquivos com "deleted:"?**
- [ ] **Se SIM: PAREI e AVISEI o usuário?**
- [ ] **Aguardei confirmação EXPLÍCITA?**
- [ ] **NÃO fiz `git add .` antes de confirmar deletions?**

### **🚨 CONSEQUÊNCIAS DE VIOLAR ESTA REGRA:**
- ❌ **PERDA IRREVERSÍVEL de código implementado**
- ❌ **RETRABALHO massivo para recuperar arquivos**
- ❌ **FRUSTRAÇÃO e perda de confiança**
- ❌ **HORAS de trabalho perdidas**

### **💡 POR QUE ESTA REGRA É CRÍTICA:**
Arquivos deletados acidentalmente causaram perda de:
- Modal completo de Grupos de Permissões (3 arquivos, ~500 linhas)
- Sistema de Vendas (15 arquivos, ~5.000 linhas)
- Páginas Admin (8 arquivos, ~3.500 linhas)
- Services e Routes do Backend (21 arquivos)

**TOTAL: 33 arquivos e ~10.000 linhas de código perdidas em um único commit!**

---

## 🚫 **1. NUNCA USAR DADOS MOCKADOS**

### **❌ PROIBIDO:**
- Criar dados falsos/fictícios
- Usar arrays hardcoded com informações falsas
- Retornar valores simulados em APIs
- Fazer "placeholders" temporários
- Apagar dados do banco de dados sem consultar

---

## 🚫 **1.1. NUNCA MENCIONAR PLATAFORMAS EXTERNAS NOS TEXTOS**

### **🎯 REGRA FUNDAMENTAL:**
**NUNCA mencionar nomes de plataformas externas (Pagar.me, Bling, Correios, etc.) em textos de ajuda, placeholders ou labels de formulários!**

### **❌ PROIBIDO:**
- Textos de ajuda mencionando "Pagar.me", "Bling", "Correios", etc.
- Placeholders com nomes de integrações
- Labels explicando "obrigatório para [Plataforma X]"
- Comentários no código visíveis ao usuário
- Mensagens de erro citando plataformas

### **✅ OBRIGATÓRIO:**
- Usar textos genéricos e profissionais
- Focar no propósito do campo, não na integração
- Manter a experiência do usuário limpa e profissional

### **🔧 EXEMPLOS:**

#### **❌ ERRADO:**
```jsx
<small className="text-muted">Referência para localização (obrigatório para Pagar.me)</small>
<small className="text-muted">URL completa (obrigatório para cadastro na Pagar.me)</small>
<label>CEP (para integração com Correios)</label>
```

#### **✅ CORRETO:**
```jsx
<small className="text-muted">Referência para localização</small>
<small className="text-muted">URL completa do site da empresa</small>
<label>CEP</label>
```

### **💡 MOTIVO:**
- ✅ **Profissionalismo** - Usuário não precisa saber de integrações internas
- ✅ **Simplicidade** - Textos mais limpos e diretos
- ✅ **Flexibilidade** - Se mudar de plataforma, não precisa atualizar textos
- ✅ **Confiança** - Usuário confia mais em sistema que parece independente

### **📋 CHECKLIST:**
- [ ] **Verifiquei todos os labels de formulários?**
- [ ] **Textos de ajuda estão genéricos?**
- [ ] **Placeholders não mencionam plataformas?**
- [ ] **Mensagens de erro são neutras?**
- [ ] **Comentários visíveis ao usuário estão limpos?**

---

## 🚫 **2. NUNCA DEIXAR ARQUIVOS UNTRACKED**

### **❌ PROIBIDO:**
- Deixar arquivos não rastreados pelo Git
- Implementar funcionalidades sem `git add`
- Fazer commits sem incluir TODOS os arquivos modificados
- Perder trabalho por arquivos não commitados

### **✅ OBRIGATÓRIO:**
- **SEMPRE** fazer `git add .` antes de commit
- **SEMPRE** verificar `git status` antes de implementar
- **SEMPRE** incluir TODOS os arquivos no commit
- **SEMPRE** verificar se não há arquivos untracked

### **🔍 COMANDO OBRIGATÓRIO:**
```bash
# ANTES de qualquer implementação:
git status

# APÓS implementação:
git add .
git status  # Verificar se tudo foi adicionado
```

---

## 🚫 **3. NUNCA USAR ELEMENTOS HTML SEMÂNTICOS PARA TÍTULOS**

### **❌ PROIBIDO:**
- Usar `<h1>`, `<h2>`, `<h3>`, `<h4>`, `<h5>`, `<h6>` para títulos
- Elementos HTML que têm estilos padrão do navegador
- Tags que sobrescrevem nossos estilos CSS

### **✅ OBRIGATÓRIO:**
- **SEMPRE** usar `<span>` ou `<div>` para títulos
- **SEMPRE** controlar tamanho com `fontSize` inline
- **SEMPRE** usar `display: 'block'` se precisar quebrar linha

### **🔧 EXEMPLO CORRETO:**
```jsx
// ❌ ERRADO:
<h6 style={{ fontSize: '12px' }}>Título</h6>

// ✅ CORRETO:
<span style={{ 
  fontSize: '12px', 
  display: 'block',
  fontWeight: '500'
}}>Título</span>
```

### **✅ OBRIGATÓRIO:**
- **SEMPRE** integrar Frontend + Backend + Banco de Dados
- **SEMPRE** buscar dados reais do PostgreSQL
- **SEMPRE** usar endpoints que retornam dados do banco
- **SEMPRE** validar se os dados são 100% reais

---

## 🎛️ **3.1. NUNCA USAR FORM.CHECK SWITCH - USAR MODERNSWITCH**

### **🎯 REGRA FUNDAMENTAL:**
**SEMPRE usar o componente ModernSwitch para switches no projeto! NUNCA usar Form.Check type="switch" do Bootstrap!**

### **❌ PROIBIDO:**
- Usar `<Form.Check type="switch" />` do Bootstrap
- Criar switches customizados do zero
- Usar outros componentes de switch de bibliotecas externas

### **✅ OBRIGATÓRIO:**
- **SEMPRE** usar `ModernSwitch` de `frontend/src/components/forms/ModernSwitch.jsx`
- **SEMPRE** importar: `import ModernSwitch from '../../components/forms/ModernSwitch'`
- **SEMPRE** usar a propriedade `onChange` com callback que recebe o novo valor booleano

### **🔧 EXEMPLO CORRETO:**
```jsx
// ❌ ERRADO:
<Form.Check
  type="switch"
  id="meu-switch"
  label="Ativar funcionalidade"
  checked={isActive}
  onChange={(e) => setIsActive(e.target.checked)}
/>

// ✅ CORRETO:
import ModernSwitch from '../../components/forms/ModernSwitch';

<ModernSwitch
  label="Ativar funcionalidade"
  checked={isActive}
  onChange={(newValue) => setIsActive(newValue)}
  size="md"
  color="blue"
/>
```

### **📋 PROPRIEDADES DISPONÍVEIS:**
```jsx
<ModernSwitch
  label="Texto do switch"           // Obrigatório
  checked={boolean}                  // Obrigatório
  onChange={(newValue) => {...}}     // Obrigatório
  size="sm|md|lg"                    // Opcional (padrão: "md")
  color="blue|green|purple|orange"   // Opcional (padrão: "blue")
  description="Texto descritivo"     // Opcional
  disabled={boolean}                 // Opcional (padrão: false)
  className="custom-class"           // Opcional
/>
```

### **💡 BENEFÍCIOS:**
- ✅ **Visual consistente** - Mesmo design em todo o projeto
- ✅ **Funciona perfeitamente** - Testado e aprovado
- ✅ **Fácil manutenção** - Um único componente para manter
- ✅ **Responsivo** - Funciona em todos os tamanhos de tela
- ✅ **Acessível** - Suporte a teclado e screen readers

### **📁 LOCALIZAÇÃO:**
```bash
frontend/src/components/forms/ModernSwitch.jsx
frontend/src/components/forms/styles/ModernSwitch.css
```

---

## 🗄️ **4. BANCO DE DADOS - RAILWAY POSTGRESQL (CONFIGURAÇÃO CRÍTICA)**

### **🎯 REGRA FUNDAMENTAL:**
**SEMPRE usar as credenciais corretas do Railway! Configuração incorreta causa timeouts e falhas.**

### **🔑 CREDENCIAIS OFICIAIS DO RAILWAY:**

#### **PRODUÇÃO:**
```bash
# ✅ CONFIGURAÇÃO CORRETA (Produção & Desenvolvimento Local)
DB_HOST=yamabiko.proxy.rlwy.net
DB_PORT=15425
DB_USER=postgres
DB_PASSWORD=uqsKOLzANexZdKgZGMeaCGJRUEZwaNCz
DB_DATABASE=railway
```

#### **STAGING:**
```bash
# ✅ CONFIGURAÇÃO CORRETA (Ambiente de Testes)
DB_HOST=switchyard.proxy.rlwy.net
DB_PORT=49716
DB_USER=postgres
DB_PASSWORD=qLnUXNSJDIKSUUvtNkarPxZNgUizEfvi
DB_DATABASE=railway
DATABASE_PUBLIC_URL=postgresql://postgres:qLnUXNSJDIKSUUvtNkarPxZNgUizEfvi@switchyard.proxy.rlwy.net:49716/railway
```

### **📁 LOCALIZAÇÃO DOS ARQUIVOS DE CONFIGURAÇÃO:**
```bash
# ✅ AMBOS devem ter a MESMA configuração:
backend/env          # ← Arquivo principal
backend/.env         # ← Backup/fallback
```

### **🚫 ERROS COMUNS E SOLUÇÕES:**

#### **❌ ERRO: `ETIMEDOUT` ou `connection timeout`**
**Causa**: Porta incorreta (5432 em vez de 15425) ou host incorreto
```bash
# ❌ ERRADO:
DB_HOST=postgres.railway.internal  # Host interno do Railway
DB_PORT=5432                       # Porta padrão PostgreSQL

# ✅ CORRETO:
DB_HOST=yamabiko.proxy.rlwy.net    # Proxy público do Railway
DB_PORT=15425                      # Porta do proxy
```

#### **❌ ERRO: `getaddrinfo ENOTFOUND postgres.railway.internal`**
**Causa**: Tentando usar hostname interno do Railway em ambiente local
**Solução**: Sempre usar `yamabiko.proxy.rlwy.net`

### **⚙️ POOL DE CONEXÕES (backend/database/pool.js):**
```javascript
const pool = new Pool({
  host: process.env.DB_HOST || 'yamabiko.proxy.rlwy.net',
  port: process.env.DB_PORT || 15425,
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'uqsKOLzANexZdKgZGMeaCGJRUEZwaNCz',
  database: process.env.DB_DATABASE || 'railway',
  ssl: {
    require: true,
    rejectUnauthorized: false
  },
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 30000,  // ✅ 30s para latência de rede
  query_timeout: 30000,
  statement_timeout: 30000,
});
```

### **🌐 URLs de Acesso:**

#### **Produção:**
- **Backend**: https://pagmus-backend-production.up.railway.app
- **Frontend**: https://pagmus-frontend.vercel.app
- **Swagger API**: https://pagmus-backend-production.up.railway.app/api-docs
- **Banco**: yamabiko.proxy.rlwy.net:15425
- **Variáveis Railway**: `docs/deployment/RAILWAY_PRODUCTION_VARIABLES.md`

#### **Staging:**
- **Backend**: https://pagmus-backend-staging-production.up.railway.app ✅
- **Frontend**: https://pagmus-frontend-staging.vercel.app ✅
- **Swagger API**: https://pagmus-backend-staging-production.up.railway.app/api-docs ✅
- **Banco**: switchyard.proxy.rlwy.net:49716 ✅
- **Branch Git**: `staging` (frontend e backend) ✅

#### **Dashboards:**
- **Railway**: https://railway.app (Login: tallescarrelo@gmail.com)
- **Vercel**: https://vercel.com/dashboard (Login: tallescarrelo@gmail.com)

### **🔧 CONFIGURAÇÃO DE AMBIENTE:**

#### **📁 Arquivos de Configuração (AUTOMÁTICOS):**
- **`.env.production`** → Vercel usa automaticamente em produção
- **`env.local`** → Desenvolvimento local (frontend)
- **`backend/env`** → Backend principal
- **`backend/.env`** → Backend fallback

#### **⚙️ Configuração Atual (Frontend):**
```bash
# Desenvolvimento Local (env.local)
REACT_APP_API_URL=http://localhost:3001
REACT_APP_ENV=development

# Produção Vercel (.env.production)  
REACT_APP_API_URL=https://pagmus-backend-production.up.railway.app
REACT_APP_ENV=production
```

#### **⚙️ Configuração Atual (Backend):**
```bash
# backend/env e backend/.env (MESMAS credenciais)
DB_HOST=<CONSULTAR_RAILWAY>
DB_PORT=<CONSULTAR_RAILWAY>
DB_USER=postgres
DB_PASSWORD=<CONSULTAR_RAILWAY>
DB_DATABASE=railway

# SendGrid (Email)
SENDGRID_API_KEY=<CONSULTAR_RAILWAY>
SENDGRID_FROM_EMAIL=noreply@pagmus.com.br
SENDGRID_FROM_NAME=Pagmus

# Pagar.me (Pagamentos - PRODUÇÃO)
PAGARME_API_KEY=<CONSULTAR_RAILWAY>

# Payments API Remota
PAYMENTS_API_URL=https://pagmus-payments-production.up.railway.app
PAYMENTS_API_KEY=(consultar Railway)

# Correios (Frete)
CORREIOS_API_KEY=(consultar Railway)

# JWT (Autenticação)
JWT_SECRET=(consultar Railway - usar chave forte!)

# Ambiente
NODE_ENV=production

# Frontend (CORS)
FRONTEND_URL=https://pagmus-frontend.vercel.app

# ⚠️ IMPORTANTE: Todas essas variáveis devem estar no Railway!
# Guia completo: docs/deployment/RAILWAY_PRODUCTION_VARIABLES.md
```

#### **🚀 Deploy Automático:**
- **Vercel**: Detecta push → usa `.env.production` → conecta Railway
- **Railway**: Backend sempre ativo
- **Resultado**: Frontend produção conecta automaticamente no backend produção

### **📊 Características:**
- **Tipo**: PostgreSQL 16+
- **Provider**: Railway.app
- **Backup**: Automático
- **SSL**: Habilitado (obrigatório)
- **Conexões**: Pool com retry automático
- **Latência**: ~50-200ms (considerar em timeouts)

### **🔧 VERIFICAÇÃO DE CONECTIVIDADE:**
```bash
# Testar conexão local:
psql "postgresql://postgres:uqsKOLzANexZdKgZGMeaCGJRUEZwaNCz@yamabiko.proxy.rlwy.net:15425/railway?sslmode=require"

# Se funcionar: ✅ Configuração correta
# Se falhar: ❌ Verificar firewall/VPN
```

### **🚨 CHECKLIST DE PROBLEMAS DE CONEXÃO:**
- [ ] **Host é `yamabiko.proxy.rlwy.net`?**
- [ ] **Porta é `15425`?**
- [ ] **SSL está habilitado?**
- [ ] **Ambos arquivos (`env` e `.env`) têm mesma config?**
- [ ] **Reiniciei backend após alterar env?**
- [ ] **Timeout é >= 30000ms?**

---

## 🌍 **4.1. AMBIENTES DE PRODUÇÃO E STAGING - REGRAS CRÍTICAS**

### **🎯 REGRA FUNDAMENTAL:**
**O projeto possui DOIS ambientes completamente isolados: PRODUÇÃO (clientes) e STAGING (testes). NUNCA subir código direto em produção!**

### **📊 ESTRUTURA DOS AMBIENTES:**

#### **🏭 PRODUÇÃO (Ambiente de Clientes):**
- **Propósito**: Ambiente usado pelos clientes finais
- **Estabilidade**: Máxima prioridade - deve estar sempre funcionando
- **Dados**: Dados reais de clientes e transações
- **Branch Git**: `main` (frontend e backend)
- **Deploy**: Automático via Railway/Vercel quando há push para `main`

#### **🧪 STAGING (Ambiente de Testes):**
- **Propósito**: Ambiente de testes e validação antes de ir para produção
- **Estabilidade**: Pode ter instabilidades durante testes
- **Dados**: Cópia dos dados de produção (para testes realistas)
- **Branch Git**: `staging` (frontend e backend)
- **Deploy**: Automático via Railway/Vercel quando há push para `staging`

### **🚨 REGRA CRÍTICA - WORKFLOW OBRIGATÓRIO:**

#### **❌ TOTALMENTE PROIBIDO:**
- ❌ Push direto para branch `main` (produção)
- ❌ Deploy em produção sem testar em staging
- ❌ Alterar variáveis de produção sem backup
- ❌ Commitar em `main` e fazer push
- ❌ Fazer merge em `main` sem aprovação

#### **✅ OBRIGATÓRIO:**
- ✅ **SEMPRE** fazer push para branch `staging` primeiro
- ✅ **SEMPRE** testar em staging antes de produção
- ✅ **SEMPRE** criar PR de `staging` → `main` para produção
- ✅ **SEMPRE** validar que staging está funcionando antes de mergear para `main`
- ✅ **SEMPRE** exigir aprovação antes de mergear em `main` (configurado no GitHub)

### **🔒 PROTEÇÃO DE BRANCH - CONFIGURAÇÃO NO GITHUB:**

Para garantir que apenas pessoas autorizadas possam fazer merge em `main`, configure as **Branch Protection Rules**:

#### **📋 Passo a Passo:**

1. **Acesse o repositório no GitHub:**
   - Backend: https://github.com/tallescarrelo/pagmus-backend
   - Frontend: https://github.com/tallescarrelo/pagmus-frontend

2. **Vá em Settings → Branches:**
   - Clique em **Settings** (no topo do repositório)
   - No menu lateral, clique em **Branches**

3. **Adicione uma regra para a branch `main`:**
   - Clique em **Add branch protection rule**
   - Em **Branch name pattern**, digite: `main`
   - Marque as seguintes opções:

   **✅ Configurações Obrigatórias:**
   ```
   ☑️ Require a pull request before merging
      ☑️ Require approvals: 1 (ou mais, conforme necessário)
      ☑️ Dismiss stale pull request approvals when new commits are pushed
      ☑️ Require review from Code Owners (se tiver CODEOWNERS)
   
   ☑️ Require status checks to pass before merging
      (Opcional: adicione checks de CI/CD se tiver)
   
   ☑️ Require conversation resolution before merging
   
   ☑️ Do not allow bypassing the above settings
      (IMPORTANTE: mesmo admins precisam seguir as regras)
   
   ☑️ Restrict who can push to matching branches
      (Deixe vazio ou adicione apenas você)
   ```

4. **Configurar Aprovadores:**
   - Em **Restrict who can dismiss pull request reviews**, adicione você e outros admins
   - Em **Required reviewers**, você pode criar um **CODEOWNERS** file para definir automaticamente quem aprova

5. **Salvar:**
   - Clique em **Create** ou **Save changes**

#### **👥 Configurar CODEOWNERS (Opcional mas Recomendado):**

Crie um arquivo `.github/CODEOWNERS` na raiz do repositório:

```bash
# .github/CODEOWNERS
# Proteção da branch main - requer aprovação do dono
* @tallescarrelo

# Ou para múltiplos aprovadores:
# * @tallescarrelo @outro-usuario
```

**Resultado:**
- ✅ Qualquer PR de `staging` → `main` precisará de **pelo menos 1 aprovação**
- ✅ Apenas você (ou pessoas autorizadas) poderão aprovar
- ✅ Ninguém poderá fazer merge sem aprovação (nem admins, se configurado)
- ✅ Push direto para `main` será bloqueado

#### **⚠️ IMPORTANTE:**
- Configure isso para **AMBOS** os repositórios (backend e frontend)
- A regra se aplica apenas à branch `main` (produção)
- A branch `staging` continua livre para push direto (para facilitar testes)
- **NOTA**: Proteções restritivas (status checks, linear history, etc.) foram desativadas para agilizar o workflow. Apenas bloqueio de push direto está ativo.

#### **📚 Guia Completo:**
Para instruções detalhadas passo a passo, consulte:
- `docs/deployment/GITHUB_BRANCH_PROTECTION.md` - Guia completo de configuração

### **🔄 FLUXO OBRIGATÓRIO (Desenvolvimento → Produção):**

```
┌─────────────────────────────────────────────────────────────┐
│ 1. DESENVOLVIMENTO LOCAL                                    │
│    ├─ Implementar feature na main local                     │
│    ├─ Testar localmente (http://localhost:3002)            │
│    └─ Commitar na main local                                │
└─────────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│ 2. DEPLOY EM STAGING (OBRIGATÓRIO)                         │
│    ├─ Criar feature branch a partir da main                │
│    ├─ Push para GitHub (branch staging) ✅                  │
│    ├─ Railway detecta push → Deploy automático backend     │
│    ├─ Vercel detecta push → Deploy automático frontend      │
│    └─ ✅ Staging atualizado                                │
└─────────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│ 3. VALIDAÇÃO EM STAGING (OBRIGATÓRIO)                      │
│    ├─ Acessar: https://pagmus-frontend-staging.vercel.app │
│    ├─ Testar funcionalidade completa                        │
│    ├─ Verificar logs (Railway + Vercel)                     │
│    └─ ✅ Tudo funcionando? Prosseguir                       │
└─────────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│ 4. DEPLOY EM PRODUÇÃO (APENAS APÓS VALIDAÇÃO)              │
│    ├─ Opção A (Recomendado): Criar PR staging → main       │
│    │   ├─ Abrir PR no GitHub                                │
│    │   ├─ Revisar mudanças                                  │
│    │   └─ Mergear PR                                        │
│    │                                                         │
│    ├─ Opção B (Rápido): Merge direto                        │
│    │   ├─ git checkout main                                 │
│    │   ├─ git pull origin main                              │
│    │   ├─ git merge staging                                 │
│    │   └─ git push origin main                              │
│    │                                                         │
│    ├─ Railway detecta push → Deploy automático backend     │
│    ├─ Vercel detecta push → Deploy automático frontend     │
│    └─ ✅ Produção atualizada                                │
└─────────────────────────────────────────────────────────────┘
```

### **📋 CHECKLIST ANTES DE QUALQUER PUSH:**

#### **✅ ANTES DE PUSH:**
- [ ] **Estou na branch `staging`?** (NUNCA na `main`)
- [ ] **Testei localmente?** (http://localhost:3002)
- [ ] **Vou fazer push para `staging`?** (NUNCA para `main`)
- [ ] **Código está funcionando perfeitamente local?**

#### **✅ APÓS PUSH EM STAGING:**
- [ ] **Deploy em staging terminou?** (verificar Railway/Vercel)
- [ ] **Testei em staging?** (https://pagmus-frontend-staging.vercel.app)
- [ ] **Tudo funcionando corretamente?**
- [ ] **Sem erros nos logs?**

#### **✅ ANTES DE MERGEAR PARA MAIN (PRODUÇÃO):**
- [ ] **Testei TUDO em staging?**
- [ ] **Funcionalidade está completa?**
- [ ] **Sem erros no console?**
- [ ] **Sem erros no backend log?**
- [ ] **Dados são salvos corretamente?**
- [ ] **Escolhi o método: PR (recomendado) ou merge direto?**

### **🔗 URLs E CREDENCIAIS COMPLETAS:**

#### **🏭 PRODUÇÃO:**
```bash
# URLs
Frontend:  https://pagmus-frontend.vercel.app
Backend:   https://pagmus-backend-production.up.railway.app
Swagger:   https://pagmus-backend-production.up.railway.app/api-docs

# Banco de Dados
DB_HOST=yamabiko.proxy.rlwy.net
DB_PORT=15425
DB_USER=postgres
DB_PASSWORD=uqsKOLzANexZdKgZGMeaCGJRUEZwaNCz
DB_DATABASE=railway

# Branch Git
Frontend: main
Backend:  main
```

#### **🧪 STAGING:**
```bash
# URLs
Frontend:  https://pagmus-frontend-staging.vercel.app
Backend:   https://pagmus-backend-staging-production.up.railway.app
Swagger:   https://pagmus-backend-staging-production.up.railway.app/api-docs

# Banco de Dados
DB_HOST=switchyard.proxy.rlwy.net
DB_PORT=49716
DB_USER=postgres
DB_PASSWORD=qLnUXNSJDIKSUUvtNkarPxZNgUizEfvi
DB_DATABASE=railway

# Branch Git
Frontend: staging
Backend:  staging
```

### **⚙️ VARIÁVEIS DE AMBIENTE:**

#### **Frontend (Vercel):**

**Produção:**
```bash
REACT_APP_API_URL=https://pagmus-backend-production.up.railway.app
REACT_APP_ENV=production
```
- Configurado no Vercel Dashboard → Settings → Environment Variables
- Environment: **Production**
- Branch: `main`

**Staging:**
```bash
REACT_APP_API_URL=https://pagmus-backend-staging-production.up.railway.app
REACT_APP_ENV=staging
```
- Configurado no Vercel Dashboard → Settings → Environment Variables
- Environment: **All Environments** (ou Preview)
- Branch: `staging`

**⚠️ IMPORTANTE**: 
- **NUNCA** colocar variáveis `REACT_APP_*` no `vercel.json`
- O `vercel.json` deve conter apenas configurações de build, não variáveis de ambiente

#### **Backend (Railway):**

**Produção:**
- Projeto: `pagmus-backend-production`
- Branch: `main`
- Variáveis configuradas no Railway Dashboard → Variables

**Staging:**
- Projeto: `pagmus-backend-staging`
- Branch: `staging`
- Variáveis configuradas no Railway Dashboard → Variables

### **📚 DOCUMENTAÇÃO COMPLETA:**
Para informações detalhadas sobre os ambientes, consulte:
- `docs/deployment/AMBIENTES_PRODUCAO_E_STAGING.md` - Documentação completa dos ambientes

### **🚨 CONSEQUÊNCIAS DE VIOLAR AS REGRAS:**
- ❌ **Código quebrado em produção** - Clientes afetados
- ❌ **Dados corrompidos** - Perda de informações
- ❌ **Rollback necessário** - Retrabalho massivo
- ❌ **Perda de confiança** - Clientes insatisfeitos
- ❌ **Tempo perdido** - Corrigir problemas em produção é mais difícil

---

## 📚 **5. DOCUMENTAÇÃO - LEITURA OBRIGATÓRIA ANTES DE AJUSTES**

### **🎯 REGRA FUNDAMENTAL:**
**SEMPRE ler a documentação existente ANTES de fazer ajustes, correções ou melhorias!**

### **📁 LOCALIZAÇÃO DAS DOCUMENTAÇÕES:**
```bash
# ✅ Documentação Raiz (geral do projeto)
pagmus-monorepo/docs/

# ✅ Documentação Frontend (específica do frontend)
pagmus-monorepo/frontend/docs/
```

### **🔍 QUANDO CONSULTAR A DOCUMENTAÇÃO:**

#### **✅ SEMPRE CONSULTAR PARA:**
- **Ajustes** em funcionalidades existentes
- **Correções** de bugs em sistemas implementados
- **Melhorias** em features já construídas
- **Refatoração** de código existente
- **Manutenção** de sistemas em produção

#### **⚠️ OPCIONAL PARA:**
- **Implementações novas** do zero
- **Features completamente inéditas**
- **Protótipos** experimentais

### **📖 ESTRUTURA DA DOCUMENTAÇÃO:**

#### **🗂️ `pagmus-monorepo/docs/` (Documentação Raiz):**
```bash
docs/
├── REGRAS_E_ACORDOS_IMPORTANTES.md  # ← SEMPRE ler primeiro!
├── backend/                          # Documentação do backend
├── frontend/                         # Documentação do frontend
├── systems/                          # Sistemas completos
├── features/                         # Funcionalidades específicas
├── technical/                        # Detalhes técnicos
├── produtos/                         # Sistema de produtos
├── afterpay/                         # Sistema de AfterPay
├── deployment/                       # Deploy e CI/CD
└── security/                         # Segurança e roles
```

#### **🗂️ `pagmus-monorepo/frontend/docs/` (Específico Frontend):**
```bash
frontend/docs/
├── COMPONENTS.md                     # Componentes React
├── ARCHITECTURE.md                   # Arquitetura frontend
├── STYLING.md                        # Padrões de estilo/SCSS
└── API_INTEGRATION.md                # Integração com backend
```

### **🔧 PROCESSO OBRIGATÓRIO:**

#### **1️⃣ ANTES DE COMEÇAR:**
```bash
# Exemplo: Vou ajustar o sistema de Responsáveis
# PASSO 1: Buscar documentação relacionada
grep -r "responsáveis\|responsibles" docs/ frontend/docs/

# PASSO 2: Ler arquivos encontrados
# PASSO 3: Entender a arquitetura atual
# PASSO 4: SÓ ENTÃO começar a implementar
```

#### **2️⃣ DURANTE O AJUSTE:**
- **Verificar** se a solução proposta está alinhada com a documentação
- **Confirmar** que não está quebrando regras estabelecidas
- **Anotar** mudanças que devem ser refletidas na doc

#### **3️⃣ APÓS O AJUSTE:**
- **Atualizar** a documentação técnica se necessário
- **Documentar** novas regras ou padrões criados
- **Commitar** documentação junto com o código

### **🚨 BENEFÍCIOS DE LER A DOC:**
- ✅ **Evita retrabalho** - Não reinventar a roda
- ✅ **Mantém consistência** - Segue padrões estabelecidos
- ✅ **Previne bugs** - Conhece as regras de negócio
- ✅ **Acelera desenvolvimento** - Sabe onde estão as coisas
- ✅ **Reduz conflitos** - Entende decisões anteriores

### **❌ PROBLEMAS DE NÃO LER A DOC:**
- ❌ **Retrabalho** - Implementar de forma diferente do padrão
- ❌ **Bugs** - Quebrar regras de negócio não conhecidas
- ❌ **Conflitos** - Duplicar funcionalidades existentes
- ❌ **Inconsistência** - Criar padrões diferentes dos atuais
- ❌ **Perda de tempo** - Descobrir tarde que já estava pronto

### **📋 CHECKLIST DE DOCUMENTAÇÃO:**
- [ ] **Li `REGRAS_E_ACORDOS_IMPORTANTES.md`?**
- [ ] **Busquei docs relacionadas ao sistema que vou ajustar?**
- [ ] **Entendi a arquitetura atual?**
- [ ] **Verifiquei regras de negócio existentes?**
- [ ] **Identifiquei padrões a seguir?**
- [ ] **Anotei mudanças para atualizar a doc?**

### **💡 DICA PROFISSIONAL:**
```bash
# Comando útil para buscar documentação relevante:
find docs/ frontend/docs/ -type f -name "*.md" | xargs grep -l "palavra-chave" | head -10

# Exemplo: Buscar docs sobre "afiliados"
find docs/ -type f -name "*.md" | xargs grep -l "afiliado" | head -10
```

---

## 🚀 **6. GIT - COMMITS E PUSH**

### **🔒 REGRA FUNDAMENTAL:**
**NUNCA fazer commit ou push automaticamente!**

### **🚨 REGRA CRÍTICA #1 - NUNCA SUBIR NA BRANCH MAIN:**
**TERMINANTEMENTE PROIBIDO fazer push direto para a branch `main`!**

#### **❌ TOTALMENTE PROIBIDO:**
- ❌ `git push origin main` - **NUNCA FAZER!**
- ❌ Push direto para `main` sem passar por staging
- ❌ Commitar em `main` e fazer push
- ❌ Deploy direto em produção sem testar em staging

#### **✅ OBRIGATÓRIO:**
- ✅ **SEMPRE** fazer push para a branch `staging` primeiro
- ✅ **SEMPRE** testar em staging antes de produção
- ✅ **SEMPRE** criar PR de `staging` → `main` para produção
- ✅ **SEMPRE** validar que staging está funcionando antes de mergear para `main`

#### **🔄 FLUXO OBRIGATÓRIO:**
```
1. Desenvolvimento Local (main local)
   ↓
2. Push para staging → Deploy automático em staging
   ↓
3. Testar em staging → Validar tudo funcionando
   ↓
4. PR staging → main → Merge → Deploy automático em produção
```

#### **📋 CHECKLIST ANTES DE QUALQUER PUSH:**
- [ ] **Estou na branch `staging`?** (NUNCA na `main`)
- [ ] **Testei localmente?** (http://localhost:3002)
- [ ] **Vou fazer push para `staging`?** (NUNCA para `main`)
- [ ] **Após testar em staging, vou criar PR para `main`?** (NUNCA push direto)

#### **🚨 CONSEQUÊNCIAS DE VIOLAR ESTA REGRA:**
- ❌ **Código quebrado em produção** - Clientes afetados
- ❌ **Dados corrompidos** - Perda de informações
- ❌ **Rollback necessário** - Retrabalho massivo
- ❌ **Perda de confiança** - Clientes insatisfeitos

### **🚨 REGRA CRÍTICA #2 - TESTE LOCAL PRIMEIRO:**
**SEMPRE testar localmente ANTES de subir para remoto!**

### **📁 ESTRUTURA DOS REPOSITÓRIOS GIT - ATENÇÃO CRÍTICA:**

#### **🎯 REPOSITÓRIOS GIT SEPARADOS (APENAS 2):**
```bash
# 📁 ESTRUTURA FÍSICA DO MONOREPO:
/Users/tallescarrelo/Git/Pagmus/pagmus-monorepo/
├── frontend/                ← Repositório Git pagmus-frontend
│   └── .git/               ← Git SEPARADO (único frontend)
├── backend/                 ← Repositório Git pagmus-backend
│   └── .git/               ← Git SEPARADO (único backend)
└── docs/                    ← ⚠️ NÃO É COMMITADO! Apenas local!

# 🎯 REPOSITÓRIOS REMOTOS:
1. pagmus-frontend → frontend/.git/ (aplicação React)
2. pagmus-backend  → backend/.git/ (API Node.js)
```

#### **⚠️ ATENÇÃO CRÍTICA:**
```bash
# ❌ A RAIZ DO MONOREPO NÃO TEM REPOSITÓRIO GIT VÁLIDO!
# ❌ NUNCA fazer git commands na raiz: /pagmus-monorepo/
# ❌ NUNCA cd /pagmus-monorepo && git add/commit/push

# ✅ SEMPRE navegar para frontend/ ou backend/ ANTES de git commands
# ✅ Frontend: cd frontend/ → git commands
# ✅ Backend: cd backend/ → git commands
# ✅ São repositórios COMPLETAMENTE INDEPENDENTES
```

#### **📂 O QUE É COMMITADO E O QUE NÃO É:**
```bash
# ✅ COMMITADO (Frontend Repository):
frontend/src/
frontend/public/
frontend/package.json

# ✅ COMMITADO (Backend Repository):
backend/services/
backend/routes/
backend/server-simple.js

# ❌ NÃO É COMMITADO (Local apenas):
pagmus-monorepo/docs/            # Documentação fica apenas local
pagmus-monorepo/docs/REGRAS_E_ACORDOS_IMPORTANTES.md
pagmus-monorepo/docs/technical/
pagmus-monorepo/docs/systems/
```

### **📁 LOCALIZAÇÃO DO SCRIPT DE COMMIT:**
**Script obrigatório**: `frontend/commit-and-push.sh`
- ✅ **SEMPRE usar**: `bash frontend/commit-and-push.sh "mensagem"`
- ✅ **NUNCA fazer**: `git add/commit/push` manual na raiz
- ✅ **O script já navega**: Entra em `frontend/` e `backend/` automaticamente
- ✅ **Estrutura**: Repositórios separados (frontend + backend)

### **🔧 CONFIGURAÇÃO DOS REPOSITÓRIOS:**
```bash
# URLs dos repositórios remotos:
Frontend: https://github.com/tallescarrelo/pagmus-frontend
Backend:  https://github.com/tallescarrelo/pagmus-backend

# Token de acesso (se necessário):
GITHUB_TOKEN=<SEU_TOKEN_AQUI>

# Configurar remote com SSH (preferido):
cd frontend && git remote set-url origin git@github.com:tallescarrelo/pagmus-frontend.git
cd backend && git remote set-url origin git@github.com:tallescarrelo/pagmus-backend.git

# Configurar remote com HTTPS + token (alternativa):
cd frontend && git remote set-url origin https://<TOKEN>@github.com/tallescarrelo/pagmus-frontend.git
cd backend && git remote set-url origin https://<TOKEN>@github.com/tallescarrelo/pagmus-backend.git
```

### **🚨 ERROS COMUNS A EVITAR:**
```bash
# ❌ ERRO 1: Tentar commitar na raiz do monorepo
cd /Users/tallescarrelo/Git/Pagmus/pagmus-monorepo
git add .     # ❌ NUNCA FAZER! NÃO TEM .git/ NA RAIZ!
git commit    # ❌ Vai dar erro ou bagunçar tudo
git push      # ❌ NUNCA!

# ✅ CORRETO: Usar o script
cd /Users/tallescarrelo/Git/Pagmus/pagmus-monorepo
bash frontend/commit-and-push.sh "mensagem do commit"

# ✅ ALTERNATIVA: Navegar para o repositório específico
cd /Users/tallescarrelo/Git/Pagmus/pagmus-monorepo/frontend
git add .
git commit -m "mensagem"
git push origin main
```

### **❌ PROIBIDO:**
- **🚫 PUSH DIRETO PARA `main` - TERMINANTEMENTE PROIBIDO!**
- Fazer push sem testar localmente
- Subir código que não funciona local
- Commitar sem verificar se está funcionando
- Deixar o remoto quebrado por código local com erro
- Subir código sem criar branch de feature
- Criar commit sem Pull Request description

### **✅ PROCESSO OBRIGATÓRIO (NOVO FLUXO):**
1. **🛑 PARAR** após implementar
2. **🧪 TESTAR** localmente (http://localhost:3002)
3. **✅ VERIFICAR** se tudo funciona perfeitamente
4. **💾 CRIAR BACKUP LOCAL** (branch de backup)
5. **🌿 CRIAR FEATURE BRANCH** (nunca commitar direto na main)
6. **📝 AVISAR** que a implementação está pronta e testada
7. **⏳ AGUARDAR** autorização explícita do usuário
8. **✅ FAZER COMMIT** na feature branch com descrição completa
9. **📄 GERAR PR DESCRIPTION** em Markdown para o usuário
10. **🚀 PUSH** da feature branch (NUNCA para main)
11. **⏳ AGUARDAR** usuário criar e mergear a PR no GitHub
12. **🔄 SINCRONIZAR** main local após usuário avisar que mergeou

---

## 🌿 **6.1. FLUXO DE TRABALHO COM FEATURE BRANCHES E PULL REQUESTS**

### **🎯 REGRA FUNDAMENTAL:**
**NUNCA fazer push direto para `main` remoto! Implementações na `main` local são permitidas, mas SEMPRE criar feature branch antes de subir!**

### **🚨 MOTIVAÇÃO:**
Evitar perda de código implementado e manter código sempre na `main` local para facilitar rastreamento e evitar código espalhado em branches de backup.

### **📋 FLUXO COMPLETO OBRIGATÓRIO (ATUALIZADO):**

#### **PASSO 1: SINCRONIZAR MAIN LOCAL APÓS MERGE (OBRIGATÓRIO)**
```bash
# APÓS o usuário mergear uma PR no GitHub:
# Usuário avisa: "Mergeei a PR #X, pode atualizar a main local"

# Frontend
cd frontend
git checkout main
git pull origin main

# Backend
cd backend
git checkout main
git pull origin main

# ✅ Main local sincronizada com produção
```

#### **PASSO 2: CRIAR BRANCH DE BACKUP DO ESTADO DE PRODUÇÃO**
```bash
# Criar backup do que está em produção (ponto de referência seguro)
cd frontend
git checkout main
git branch backup-prod-sincronizado-$(date +%Y%m%d-%H%M)

cd ../backend
git checkout main
git branch backup-prod-sincronizado-$(date +%Y%m%d-%H%M)

# Exemplo:
# backup-prod-sincronizado-20251101-2200
# Este backup representa o estado atual de produção
```

#### **PASSO 3: IMPLEMENTAR DIRETAMENTE NA MAIN LOCAL**
```bash
# ✅ TRABALHAR DIRETAMENTE NA MAIN LOCAL (não criar feature branch ainda)
cd frontend
# (já está em main, então apenas implementar)

cd ../backend
# (já está em main, então apenas implementar)

# 🔧 Implementar funcionalidades diretamente na main
# 📝 Commitar normalmente na main
# 🧪 Testar localmente (http://localhost:3002)
# ✅ Verificar que tudo funciona perfeitamente
```

#### **PASSO 4: COMMIT NA MAIN LOCAL**
```bash
# Frontend
cd frontend
git add .
git status  # Verificar arquivos
git commit -m "feat: Descrição completa das mudanças

- Item 1 implementado
- Item 2 corrigido
- Item 3 melhorado

Arquivos modificados:
- src/pages/FeaturePage.jsx
- src/components/Feature.jsx
- src/services/FeatureService.js

Testes realizados:
- ✅ Teste 1 passou
- ✅ Teste 2 passou
- ✅ Teste 3 passou
"

# Backend
cd ../backend
git add .
git status  # Verificar arquivos
git commit -m "feat: Descrição completa das mudanças

- Service modular criado
- Routes implementadas
- Swagger atualizado

Arquivos modificados:
- services/FeatureService.js
- routes/feature.js
- swagger.js

Testes realizados:
- ✅ Endpoint funciona
- ✅ Validações corretas
- ✅ Banco de dados ok
"

# ✅ Código está agora na main local
```

#### **PASSO 5: CRIAR FEATURE BRANCH A PARTIR DA MAIN (QUANDO FOR SUBIR)**
```bash
# APENAS quando for subir para produção, criar feature branch:
cd frontend
git checkout -b feature/nome-descritivo

cd ../backend
git checkout -b feature/nome-descritivo

# Exemplo:
# feature/sistema-responsaveis-completo
# feature/fix-validacao-cpf-email
# feature/integracao-bling-v2

# ⚠️ IMPORTANTE: Esta feature branch terá TUDO que foi implementado na main
```

#### **PASSO 6: GERAR PR DESCRIPTION**

#### **PASSO 7: PUSH DA FEATURE BRANCH**

#### **PASSO 8: CRIAR PULL REQUEST NO GITHUB**

#### **PASSO 9: SINCRONIZAR MAIN LOCAL (APÓS MERGE)**

#### **PASSO 10: VOLTAR PARA MAIN E CRIAR NOVO BACKUP**
```bash
# Após sincronizar main (Passo 9), voltar para o Passo 2:
# Criar novo backup → Implementar novas features → Repetir ciclo
```

### **🔄 CICLO COMPLETO (RESUMO):**

#### **ANTES (FLUXO ANTIGO):**
1. ❌ Backup → Feature Branch → Implementar → PR → Merge → Atualizar Main
2. ❌ Código ficava espalhado em branches de backup/feature
3. ❌ Risco de perder código em branches

#### **AGORA (FLUXO NOVO):**
1. ✅ Atualizar Main Local (após merge de PR)
2. ✅ Criar Backup do estado de produção
3. ✅ Implementar diretamente na Main Local
4. ✅ Commitar na Main Local
5. ✅ Criar Feature Branch (quando for subir)
6. ✅ Push Feature Branch → PR → Merge
7. ✅ Voltar para passo 1 (ciclo se repete)

### **💡 BENEFÍCIOS DO NOVO FLUXO:**

#### **✅ Segurança:**
- **Código sempre na main local** - Fácil de encontrar
- **Backup explícito de produção** - Ponto de referência claro
- **Menos risco de perder código** - Tudo centralizado na main
- **Histórico limpo** - Commits diretos na main local

#### **✅ Organização:**
- **Main local sempre atualizada** - Sempre reflete o último estado
- **Feature branches apenas para subir** - Não ficam espalhadas
- **Backups organizados** - Representam estados de produção

#### **✅ Produtividade:**
- **Menos branches para gerenciar** - Foco na main
- **Implementação mais direta** - Sem criar branch antes de começar
- **Rastreamento simplificado** - Tudo na main local

---

### **📋 FLUXO DETALHADO (LEGADO - REFERÊNCIA):**

#### **PASSO 1: BACKUP LOCAL (LEGADO)**
```bash
# Criar branch de backup ANTES de qualquer mudança
cd frontend
git checkout main
git branch backup-nome-descritivo-$(date +%Y%m%d-%H%M)

cd ../backend
git checkout main
git branch backup-nome-descritivo-$(date +%Y%m%d-%H%M)

# Exemplo:
# backup-validacoes-restauradas-20251016-1946
```

#### **PASSO 2: CRIAR FEATURE BRANCH**
```bash
# Criar branch de feature para as mudanças
cd frontend
git checkout -b feature/nome-descritivo

cd ../backend
git checkout -b feature/nome-descritivo

# Exemplo:
# feature/sistema-responsaveis-completo
# feature/fix-validacao-cpf-email
# feature/integracao-bling-v2
```

#### **PASSO 3: IMPLEMENTAR E TESTAR**
```bash
# 1. Fazer as mudanças no código
# 2. Testar localmente (http://localhost:3002)
# 3. Verificar que tudo funciona perfeitamente
# 4. Verificar linter, console, erros
```

#### **PASSO 4: COMMIT NA FEATURE BRANCH**
```bash
# Frontend
cd frontend
git add .
git status  # Verificar arquivos
git commit -m "feat: Descrição completa das mudanças

- Item 1 implementado
- Item 2 corrigido
- Item 3 melhorado

Arquivos modificados:
- src/pages/FeaturePage.jsx
- src/components/Feature.jsx
- src/services/FeatureService.js

Testes realizados:
- ✅ Teste 1 passou
- ✅ Teste 2 passou
- ✅ Teste 3 passou
"

# Backend
cd ../backend
git add .
git status  # Verificar arquivos
git commit -m "feat: Descrição completa das mudanças

- Service modular criado
- Routes implementadas
- Swagger atualizado

Arquivos modificados:
- services/FeatureService.js
- routes/feature.js
- swagger.js

Testes realizados:
- ✅ Endpoint funciona
- ✅ Validações corretas
- ✅ Banco de dados ok
"
```

#### **PASSO 5: GERAR PR DESCRIPTION**
```markdown
# Template obrigatório para Pull Request:

## 📋 Resumo
Breve descrição do que foi implementado (2-3 linhas)

## 🎯 Objetivo
Qual problema resolve e por que foi necessário

## 🔧 Mudanças Técnicas

### Frontend:
- `src/pages/FeaturePage.jsx` - Página principal da feature
- `src/components/Feature.jsx` - Componente de interface
- `src/services/FeatureService.js` - Integração com API
- `src/theme/feature.module.scss` - Estilos modulares

### Backend:
- `backend/services/FeatureService.js` - Lógica de negócio
- `backend/routes/feature.js` - Endpoints REST
- `backend/swagger.js` - Documentação API
- `backend/migrations/create_feature_table.sql` - Migração DB

## 🧪 Testes Realizados
- [x] Testado localmente (http://localhost:3002)
- [x] Funcionalidade X funciona
- [x] Validações corretas
- [x] Sem erros no console
- [x] Sem erros no backend log
- [x] Banco de dados integrado

## 📸 Screenshots (se aplicável)
[Adicionar prints da feature funcionando]

## 🚨 Breaking Changes
- [ ] Não há breaking changes
- [ ] ⚠️ Breaking change: [descrever]

## 📚 Documentação
- Documentação técnica criada: `docs/technical/FEATURE_TECHNICAL.md`
- Swagger atualizado: ✅

## ✅ Checklist
- [x] Código testado localmente
- [x] Sem dados mockados
- [x] Arquitetura modular seguida
- [x] Documentação técnica criada
- [x] Swagger atualizado
- [x] Railway config correta
- [x] Sem URLs hardcoded
```

#### **PASSO 6: PUSH DA FEATURE BRANCH**
```bash
# Frontend
cd frontend
git push origin feature/nome-descritivo

# Backend
cd backend
git push origin feature/nome-descritivo

# ⚠️ NUNCA fazer:
# git push origin main  ❌ PROIBIDO!
```

#### **PASSO 7: CRIAR PULL REQUEST NO GITHUB**
```bash
# O USUÁRIO faz manualmente no GitHub:
1. Acessar https://github.com/tallescarrelo/pagmus-frontend
2. Clicar em "Compare & pull request"
3. Copiar PR Description gerada pelo assistente
4. Adicionar screenshots se necessário
5. Criar PR: feature/nome → main
6. Revisar mudanças
7. Mergear quando aprovado

# Repetir para backend:
https://github.com/tallescarrelo/pagmus-backend
```

#### **PASSO 8: SINCRONIZAR MAIN LOCAL (APÓS MERGE)**
```bash
# APÓS o usuário mergear a PR no GitHub:
# Usuário avisa: "Mergeei a PR, pode atualizar a main local"

# Frontend
cd frontend
git checkout main
git pull origin main
git branch -d feature/nome-descritivo  # Deletar feature branch local

# Backend
cd backend
git checkout main
git pull origin main
git branch -d feature/nome-descritivo  # Deletar feature branch local

# ✅ Agora a main local está sincronizada com o remoto
```

### **🔄 QUANDO SINCRONIZAR A MAIN LOCAL:**

#### **✅ CENÁRIO 1: Após VOCÊ mergear sua PR**
```bash
# Você avisa: "Mergeei a PR #123, pode atualizar a main"
# Assistente executa:
cd frontend && git checkout main && git pull origin main
cd ../backend && git checkout main && git pull origin main
```

#### **✅ CENÁRIO 2: Outro dev mergeou uma PR**
```bash
# Você avisa: "Outro dev mergeou PR #124, atualiza a main antes de começar"
# Assistente executa:
cd frontend && git checkout main && git pull origin main
cd ../backend && git checkout main && git pull origin main
```

#### **✅ CENÁRIO 3: Antes de iniciar nova feature**
```bash
# SEMPRE sincronizar main antes de criar nova feature branch
cd frontend && git checkout main && git pull origin main
cd ../backend && git checkout main && git pull origin main
# Depois criar feature branch a partir da main atualizada
```

### **🚨 REGRAS CRÍTICAS:**

#### **🚫 NUNCA:**
- ❌ Push direto para `main` (assistente NÃO PODE fazer isso)
- ❌ Commit na branch `main` diretamente
- ❌ Deletar branches de backup
- ❌ Fazer merge local sem PR
- ❌ Subir código sem testar

#### **✅ SEMPRE:**
- ✅ Criar branch de backup ANTES de mudanças
- ✅ Criar feature branch para TODA implementação
- ✅ Testar localmente ANTES de commitar
- ✅ Gerar PR Description completa
- ✅ Push APENAS da feature branch
- ✅ Aguardar usuário mergear a PR
- ✅ Sincronizar main local APÓS merge remoto

### **📋 NOMENCLATURA DE BRANCHES:**

#### **Feature Branches:**
```bash
feature/nome-descritivo          # Nova funcionalidade
fix/nome-do-bug                   # Correção de bug
refactor/nome-da-refatoracao      # Refatoração
docs/nome-da-doc                  # Documentação

# Exemplos:
feature/sistema-responsaveis-completo
fix/validacao-cpf-email
refactor/modular-notifications
docs/technical-webhooks
```

#### **Backup Branches:**
```bash
backup-descricao-YYYYMMDD-HHMM

# Exemplos:
backup-sistema-funcionando-20251016-1946
backup-antes-refatoracao-responsaveis-20251016-2030
backup-validacoes-restauradas-20251016-1946
```

### **💡 BENEFÍCIOS DESTE FLUXO:**

#### **✅ Segurança:**
- Backups locais antes de mudanças
- Main sempre estável (apenas código revisado)
- Histórico completo de mudanças
- Fácil reverter se algo quebrar

#### **✅ Organização:**
- PRs documentam o que foi feito
- Código revisado antes de mergear
- Histórico limpo e rastreável
- Colaboração facilitada (múltiplos devs)

#### **✅ Qualidade:**
- Menos bugs em produção
- Código testado antes de mergear
- Documentação completa das mudanças
- Evita perda de implementações

### **🎯 EXEMPLO COMPLETO DE FLUXO:**

```bash
# 1. BACKUP
cd frontend && git branch backup-nova-feature-20251016-2100
cd ../backend && git branch backup-nova-feature-20251016-2100

# 2. FEATURE BRANCH
cd frontend && git checkout -b feature/sistema-responsaveis
cd ../backend && git checkout -b feature/sistema-responsaveis

# 3. IMPLEMENTAR (código aqui...)

# 4. TESTAR LOCAL
# http://localhost:3002 - Tudo funcionando ✅

# 5. COMMIT
cd frontend && git add . && git commit -m "feat: Sistema de Responsáveis completo"
cd ../backend && git add . && git commit -m "feat: Sistema de Responsáveis - Backend modular"

# 6. GERAR PR DESCRIPTION (assistente gera markdown)

# 7. PUSH FEATURE BRANCH
cd frontend && git push origin feature/sistema-responsaveis
cd ../backend && git push origin feature/sistema-responsaveis

# 8. USUÁRIO CRIA PR NO GITHUB (manual)
# - Abre PR no GitHub
# - Cola PR Description
# - Revisa mudanças
# - Mergea

# 9. USUÁRIO AVISA: "Mergeei a PR, atualiza main"

# 10. SINCRONIZAR MAIN LOCAL
cd frontend && git checkout main && git pull origin main
cd ../backend && git checkout main && git pull origin main

# 11. LIMPAR FEATURE BRANCH
cd frontend && git branch -d feature/sistema-responsaveis
cd ../backend && git branch -d feature/sistema-responsaveis

# ✅ PRONTO! Main local sincronizada, feature mergeada, backup mantido
```

---

### **💬 Frases para usar:**
- "Implementação concluída e testada localmente! Quer que eu crie a feature branch e faça commit?"
- "Testei local e está funcionando. Posso commitar na feature branch e gerar a PR description?"
- "Feature branch criada e commit feito! Aqui está a PR Description para você criar a PR no GitHub"
- "Aguardando você mergear a PR no GitHub para eu sincronizar a main local"

### **📋 REGRAS PRINCIPAIS (QUANDO USUÁRIO DIZ "SIGA AS RULES"):**
1. **🚨 NUNCA SUBIR NA BRANCH MAIN** - **TERMINANTEMENTE PROIBIDO!** Sempre fazer push para `staging` primeiro, testar em staging, e só depois criar PR `staging → main` para produção
2. **🔄 SINCRONIZAR MAIN LOCAL** - Sempre após merge de PR (frontend + backend)
3. **💾 BACKUP DO ESTADO DE PRODUÇÃO** - Criar backup após sincronizar main
4. **🏠 IMPLEMENTAR NA MAIN LOCAL** - Trabalhar diretamente na main (não criar feature branch antes)
5. **🌿 FEATURE BRANCH SÓ PARA SUBIR** - Criar apenas quando for fazer push (contém tudo da main)
6. **🧪 TESTAR LOCAL PRIMEIRO** - Nunca commitar sem testar
7. **🧪 TESTAR EM STAGING** - Sempre testar em staging antes de mergear para main (produção)
8. **📄 GERAR PR DESCRIPTION** - Markdown completo para a PR
9. **🚫 NÃO USAR DADOS MOCKADOS** - Sempre dados reais do banco
10. **🚫 NÃO MENCIONAR PLATAFORMAS EXTERNAS** - Nunca citar Pagar.me, Bling, etc. em textos de ajuda
11. **📝 USAR `<span>` EM VEZ DE `<h1>-<h6>`** - Para títulos
12. **🎨 USAR DRAWER PADRÃO** - `theme/components/Drawer` em vez de Offcanvas
13. **🗄️ RAILWAY CONFIG CORRETA** - yamabiko.proxy.rlwy.net:15425 (produção) ou switchyard.proxy.rlwy.net:49716 (staging)
14. **📚 LER DOCUMENTAÇÃO** - Antes de ajustes/correções
15. **🌐 USAR `API_URL` DO CONFIG** - Nunca URLs hardcoded
16. **🏗️ ARQUITETURA MODULAR** - Service + Routes + Templates
17. **🔒 SEGURANÇA DE ROLES** - OWNER ≠ ADMIN
18. **💰 CURRENCY FORMATTER** - Para valores
19. **📚 SWAGGER ATUALIZADO** - Documentação completa
20. **📝 DOCUMENTAÇÃO TÉCNICA** - Detalhes completos da implementação
21. **🔍 VERIFICAR FRONTEND E BACKEND** - Sempre checar ambos os repositórios antes de dizer que está pronto
22. **🌍 CONHECER AMBIENTES** - Produção (main) e Staging (staging) são ambientes separados com URLs e bancos diferentes

---

## 💾 **7. BACKUP OBRIGATÓRIO - ANTES DE IMPLEMENTAR**

### **🎯 REGRA FUNDAMENTAL:**
**SEMPRE criar backup após testar que o sistema está funcionando perfeitamente**

### **🚫 PROIBIDO:**
- ❌ Implementar sem ter backup do estado funcionando
- ❌ Fazer backup só quando algo quebrar
- ❌ Pular o backup por "ser rápido"
- ❌ Não testar antes de fazer backup

### **✅ OBRIGATÓRIO:**
- ✅ **SEMPRE** testar que tudo funciona primeiro
- ✅ **SEMPRE** criar backup com script: `bash frontend/create-backup.sh "descrição"`
- ✅ **SEMPRE** usar descrições claras no backup
- ✅ **SEMPRE** confirmar que o backup foi criado com sucesso

### **🔧 COMANDO OBRIGATÓRIO:**
```bash
# 1. TESTAR primeiro que tudo funciona
# 2. ENTÃO criar backup:
bash frontend/create-backup.sh "descrição-do-estado-atual"

# Exemplo:
bash frontend/create-backup.sh "sistema-funcionando-antes-nova-feature"
```

### **📋 CHECKLIST DE BACKUP:**
- [ ] **🧪 Testei que tudo funciona localmente?**
- [ ] **✅ Sistema está estável e sem erros?**
- [ ] **💾 Criei backup com descrição clara?**
- [ ] **📊 Backup foi criado com sucesso (frontend + backend)?**
- [ ] **🌿 Branch de backup foi criada no repositório?**

### **💡 BENEFÍCIOS:**
- ✅ **Segurança**: Sempre podemos voltar ao estado funcionando
- ✅ **Confiança**: Implementamos sabendo que temos fallback
- ✅ **Histórico**: Rastreamos pontos estáveis do desenvolvimento
- ✅ **Colaboração**: Outros podem ver estados funcionais

### **🚨 EM CASO DE PROBLEMA:**
```bash
# Restaurar backup:
git checkout backup-nome-do-backup-20250925-2146

# Ver backups disponíveis:
git branch | grep backup
```

---

## 📚 **8. GITHUB PAGES - DOCUMENTAÇÃO**

### **🚫 NÃO USAR JEKYLL:**
```
❌ NÃO criar: _config.yml
❌ NÃO usar: Jekyll syntax
❌ NÃO usar: Markdown automático
```

### **✅ USAR FORMATO SIMPLES:**
```
✅ Arquivo principal: index.html
✅ HTML puro + CSS + JS
✅ Bootstrap para styling
✅ Navegação manual entre páginas
```

### **🔧 CONFIGURAÇÃO GITHUB ACTIONS (OBRIGATÓRIO):**
```
✅ Workflow: .github/workflows/pages.yml
✅ ESTRUTURA OBRIGATÓRIA: Jobs separados (build + deploy)
✅ Versão: actions/upload-pages-artifact@v3 (versão estável)
✅ Versão: actions/deploy-pages@v4
✅ Permissões: pages: write, id-token: write
✅ Trigger: push para main com mudanças em docs/
```

### **🏗️ ESTRUTURA DO WORKFLOW (OBRIGATÓRIO):**
```yaml
jobs:
  build:                    # ✅ PRIMEIRO: Job de build
    runs-on: ubuntu-latest
    steps:
      - checkout
      - criar .nojekyll
      - upload-pages-artifact@v3

  deploy:                   # ✅ SEGUNDO: Job de deploy
    needs: build            # 🔗 DEPENDÊNCIA OBRIGATÓRIA
    runs-on: ubuntu-latest
    environment: github-pages
    steps:
      - deploy-pages@v4
```

### **⚠️ PROBLEMAS COMUNS E SOLUÇÕES:**
```
❌ "No artifacts named github-pages found" 
   → SOLUÇÃO: Usar jobs separados (build + deploy)
   → SOLUÇÃO: Garantir que deploy precisa de build

❌ Deploy falhando 
   → SOLUÇÃO: Verificar permissões e versões das actions
   → SOLUÇÃO: Usar estrutura de jobs separados

❌ Cache não atualizando 
   → SOLUÇÃO: Aguardar 2-5 minutos após push
   → SOLUÇÃO: Verificar se workflow executou com sucesso

❌ Workflow em loop infinito
   → SOLUÇÃO: Usar concurrency: group: 'pages'
   → SOLUÇÃO: cancel-in-progress: true
```

### **📁 Estrutura da Documentação:**
```
docs/
├── index.html (página principal)
├── css/
│   └── bootstrap.min.css
├── js/
│   └── bootstrap.bundle.min.js
├── responsibles-system.html
├── product-registration-system.html
├── currency-formatter.html
└── cloudflare-r2-setup.html
```

### **🌐 URL de Acesso:**
- **GitHub Pages**: https://tallescarrelo.github.io/pagmus-frontend/

### **🔄 Como Atualizar:**
1. Criar/editar arquivos em `/docs`
2. Fazer commit para branch `main`
3. GitHub Pages atualiza automaticamente
4. Verificar em alguns minutos

### **🚨 RESOLUÇÃO DE PROBLEMAS GITHUB PAGES:**

#### **❌ Erro: "No artifacts named github-pages found"**
**🔍 DIAGNÓSTICO:** Workflow não está separando build e deploy
**✅ SOLUÇÃO:** Usar estrutura de jobs separados obrigatória

#### **❌ Erro: Deploy falhando constantemente**
**🔍 DIAGNÓSTICO:** Workflow em um job só ou dependências incorretas
**✅ SOLUÇÃO:** 
```yaml
jobs:
  build: # Primeiro: criar artifacts
  deploy: # Segundo: usar artifacts (needs: build)
```

#### **❌ Erro: Workflow em loop infinito**
**🔍 DIAGNÓSTICO:** Falta controle de concorrência
**✅ SOLUÇÃO:** 
```yaml
concurrency:
  group: 'pages'
  cancel-in-progress: true
```

#### **🔧 WORKFLOW COMPLETO FUNCIONAL:**
```yaml
name: Deploy Docs (Static) to GitHub Pages
on:
  push:
    branches: [ main ]
    paths: [ 'docs/**', '.github/workflows/pages.yml' ]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: 'pages'
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: touch docs/.nojekyll
      - uses: actions/upload-pages-artifact@v3
        with: { path: docs }

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment: github-pages
    steps:
      - uses: actions/deploy-pages@v4
```

---

## 🏗️ **9. ARQUITETURA MODULAR - PADRÃO OBRIGATÓRIO**

### **🎯 REGRA FUNDAMENTAL:**
**TODAS as novas implementações devem seguir o padrão modular**

### **📁 ESTRUTURA OBRIGATÓRIA:**
```
backend/
├── services/           ✅ Lógica de negócio + configuração
│   └── [Feature]Service.js
├── templates/          ✅ Templates (emails, HTML, etc.)
│   └── [feature]Templates.js  
├── routes/             ✅ Endpoints REST + Swagger
│   └── [feature].js
└── server-simple.js    ✅ APENAS imports + uso modular
```

### **🚫 PROIBIDO NO SERVER-SIMPLE.JS:**
- ❌ Implementar lógica de negócio diretamente
- ❌ Templates HTML/email inline
- ❌ Configurações extensas de serviços
- ❌ Funções auxiliares específicas
- ❌ Códigos com mais de 50 linhas por funcionalidade

### **✅ PERMITIDO NO SERVER-SIMPLE.JS:**
- ✅ Imports de módulos
- ✅ Registro de rotas: `app.use('/api/[feature]', routes)`
- ✅ Middlewares globais
- ✅ Configurações básicas do Express
- ✅ Comentários explicativos

### **🔧 EXEMPLO DE IMPLEMENTAÇÃO MODULAR:**

#### **❌ ANTES (Monolítico):**
```javascript
// server-simple.js - 350+ linhas de código SendGrid
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

app.post('/api/notifications/email/send', async (req, res) => {
  // 100+ linhas de lógica aqui...
});
```

#### **✅ DEPOIS (Modular):**
```javascript
// server-simple.js - 2 linhas limpas
const notificationRoutes = require('./routes/notifications');
app.use('/api/notifications', authenticateToken, notificationRoutes);
```

### **📋 CHECKLIST PARA NOVAS IMPLEMENTAÇÕES:**
- [ ] **Analisei todas as dependências do código a ser removido?**
- [ ] Criei `services/[Feature]Service.js`?
- [ ] Criei `routes/[feature].js` com Swagger?
- [ ] Templates estão em `templates/[feature]Templates.js`?
- [ ] `server-simple.js` tem APENAS import + registro?
- [ ] **Adicionei o arquivo de rotas no `swagger.js`?**
- [ ] **Testei o SISTEMA COMPLETO (não só o módulo isolado)?**
- [ ] Documentação Swagger está completa?
- [ ] **Verifiquei se as rotas aparecem no Swagger remoto?**

### **🎯 BENEFÍCIOS GARANTIDOS:**
- ✅ **Manutenibilidade** - Fácil encontrar e editar
- ✅ **Testabilidade** - Cada módulo testável independentemente
- ✅ **Reutilização** - Services usáveis em qualquer lugar
- ✅ **Escalabilidade** - Crescimento organizado
- ✅ **Debugging** - Erros isolados por módulo
- ✅ **Performance** - Carregamento otimizado

### **📚 CONFIGURAÇÃO OBRIGATÓRIA DO SWAGGER:**

#### **🚨 ATENÇÃO CRÍTICA:**
**Toda rota modular DEVE ser adicionada no `swagger.js` para aparecer na documentação!**

#### **📝 Passos obrigatórios:**
```javascript
// backend/swagger.js
apis: [
  './server-simple.js',           // ✅ Sempre presente
  './routes/notifications.js',    // ✅ Rota SendGrid
  './routes/[sua-nova-rota].js'   // ✅ ADICIONAR AQUI
]
```

#### **🏷️ Tag obrigatória:**
```javascript
// Adicionar na seção tags:
{
  name: 'Sua Nova Feature',
  description: 'Descrição da funcionalidade'
}
```

#### **❌ ERRO COMUM:**
- Criar rotas modulares mas esquecer do `swagger.js`
- Resultado: Rotas funcionam mas não aparecem na documentação

### **⚠️ CUIDADOS CRÍTICOS ANTES DE MODULARIZAR:**

#### **🚨 REGRA DE OURO:**
**SEMPRE verificar dependências antes de remover código, mesmo que pareça duplicado!**

#### **🔍 Verificações obrigatórias:**
- [ ] **Analisar todas as chamadas** da função que será removida
- [ ] **Testar o sistema completo** após remoção (não só a nova feature)
- [ ] **Verificar se há lógicas diferentes** em funções com nomes similares
- [ ] **Confirmar compatibilidade** entre sistemas antigos e novos
- [ ] **Manter backup** da função original até validação completa

#### **❌ ERRO COMUM:**
```javascript
// ❌ PERIGO: Remover sem verificar dependências
// const authenticateToken = async (req, res, next) => { ... } // REMOVIDO
// Resultado: Dashboard quebrado!
```

#### **✅ ABORDAGEM SEGURA:**
```javascript
// ✅ SEGURO: Coexistência temporária
const authenticateTokenCustom = async (req, res, next) => { ... }  // Dashboard
const { authenticateToken } = require('./middleware/auth');        // Notifications
```

### **🚨 PROCESSO OBRIGATÓRIO:**
1. **📋 Planejar** - Definir Service, Routes, Templates
2. **🔍 Analisar** - **VERIFICAR TODAS AS DEPENDÊNCIAS**
3. **🏗️ Implementar** - Criar módulos separados
4. **🔗 Integrar** - Adicionar ao server-simple.js
5. **📚 Configurar** - **ADICIONAR NO SWAGGER.JS**
6. **🧪 Testar** - **SISTEMA COMPLETO + módulo isolado**
7. **📝 Documentar** - Swagger + comentários
8. **✅ Validar** - Confirmar padrão seguido + Swagger remoto

---

## 🌐 **10. CONFIGURAÇÃO DE API - DETECÇÃO AUTOMÁTICA DE AMBIENTE**

### **🎯 REGRA FUNDAMENTAL:**
**NUNCA deixar URLs de API hardcoded! Sempre usar configuração automática de ambiente**

### **🚫 PROIBIDO:**
- ❌ URLs hardcoded: `'http://localhost:3001'`
- ❌ BaseURL fixo: `baseURL: 'http://localhost:3001/api'`
- ❌ Endpoints absolutos: `fetch('http://localhost:3001/api/users')`
- ❌ Configuração manual por ambiente

### **✅ OBRIGATÓRIO:**
- ✅ **SEMPRE** usar `src/config/api.js` para URLs de API
- ✅ **SEMPRE** importar: `import { API_URL } from '../../config/api'`
- ✅ **SEMPRE** usar: `${API_URL}/api/endpoint`
- ✅ **SEMPRE** detectar ambiente automaticamente

### **🔧 CONFIGURAÇÃO PADRÃO (src/config/api.js):**
```javascript
/**
 * 🔧 Configuração de API - Detecção Automática de Ambiente
 */
const getApiUrl = () => {
  // Se a variável de ambiente estiver definida, usa ela
  if (process.env.REACT_APP_API_URL) {
    return process.env.REACT_APP_API_URL;
  }
  
  // Se estiver em produção (Vercel), usa Railway
  if (process.env.NODE_ENV === 'production' || window.location.hostname !== 'localhost') {
    return 'https://pagmus-backend-production.up.railway.app';
  }
  
  // Se estiver em desenvolvimento local
  return 'http://localhost:3001';
};

export const API_URL = getApiUrl();
```

### **🔧 EXEMPLOS DE USO CORRETO:**

#### **❌ ERRADO (Hardcoded):**
```javascript
// ❌ NUNCA FAZER:
const api = axios.create({
  baseURL: 'http://localhost:3001/api',  // ❌ Hardcoded!
});

const response = await fetch('http://localhost:3001/api/users');  // ❌ Hardcoded!
```

#### **✅ CORRETO (Configuração Automática):**
```javascript
// ✅ SEMPRE FAZER:
import { API_URL } from '../../config/api';

const api = axios.create({
  baseURL: `${API_URL}/api`,  // ✅ Automático!
});

const response = await fetch(`${API_URL}/api/users`);  // ✅ Automático!
```

### **🚨 PROBLEMAS QUE ISSO EVITA:**
- ❌ `net::ERR_CONNECTION_REFUSED` em produção
- ❌ Relatórios não carregando no remoto
- ❌ Afiliados não funcionando em produção
- ❌ APIs falhando quando deployado
- ❌ Necessidade de configurar manualmente por ambiente

### **📋 CHECKLIST PARA NOVAS IMPLEMENTAÇÕES:**
- [ ] **Importei `API_URL` do config/api.js?**
- [ ] **Não há URLs hardcoded no código?**
- [ ] **Todas as requisições usam `${API_URL}`?**
- [ ] **Testei em desenvolvimento local?**
- [ ] **Testei em produção (Vercel)?**

### **🔧 ARQUIVOS QUE DEVEM USAR API_URL:**
- ✅ **Services**: `src/services/api/*.js`
- ✅ **Pages**: `src/pages/*/**.jsx`
- ✅ **Components**: `src/components/*/**.jsx`
- ✅ **Contexts**: `src/contexts/*.jsx`
- ✅ **Hooks**: `src/hooks/*.js`

---

## 💰 **11. VALORES DE PRODUTO - FUNÇÃO OBRIGATÓRIO**

### **🎯 REGRA FUNDAMENTAL:**
**O valor do produto = valor do plano básico/padrão**

### **⚙️ FUNÇÃO OBRIGATÓRIA:**
Sempre usar a função `CurrencyFormatter` para valores:

```javascript
// Frontend - Importar:
import { CurrencyFormatter } from '../utils/CurrencyFormatter';

// Usar para exibir:
const valorFormatado = CurrencyFormatter.format(valorEmCentavos);
// Exemplo: CurrencyFormatter.format(99700) -> "R$ 997,00"

// Usar para converter input:
const centavos = CurrencyFormatter.toCents("R$ 997,00");
// Exemplo: CurrencyFormatter.toCents("R$ 997,00") -> 99700
```

### **📊 Padrão de Armazenamento:**
- **Banco de Dados**: Sempre em centavos (INTEGER)
- **Frontend**: Sempre formatado (STRING com R$)
- **APIs**: Sempre retornar centavos, converter no frontend

### **🔄 Fluxo Obrigatório:**
1. **Input do usuário**: "R$ 997,00"
2. **Converter para centavos**: 99700 (para salvar no banco)
3. **Buscar do banco**: 99700 centavos
4. **Exibir formatado**: "R$ 997,00"

### **🧮 Função de Cálculo de Preço:**
```javascript
// Backend - função já implementada:
const { getProductPrice } = require('./utils/productPricing');

// Usar sempre que precisar do preço do produto:
const precoEmCentavos = await getProductPrice(productId);
```

---

## 💳 **11.1. CONVERSÃO DE VALORES - API DE PAYMENTS (REGRA CRÍTICA)**

### **🎯 REGRA FUNDAMENTAL:**
**Sistema Pagmus usa CENTAVOS, mas API de Payments espera STRING em REAIS!**

### **⚠️ CONVERSÃO OBRIGATÓRIA:**

#### **📌 Padrão do Sistema:**
```javascript
// ✅ Sistema Pagmus (interno):
const valor = 10000; // 10000 centavos = R$ 100,00 (INTEGER)
```

#### **📌 API de Payments (externa):**
```javascript
// ✅ API de Payments espera:
const valor = "100.00"; // STRING em reais
```

### **🔧 CONVERSÃO NO BACKEND:**

#### **✅ Implementação Correta:**
```javascript
// backend/services/PaymentsApiService.js

// ⚠️ REGRA CRÍTICA: Converter centavos → string em reais
const amountInReais = (amountInCents / 100).toFixed(2);

// Payload para API de Payments:
const payload = {
  items: [{
    amount: amountInReais, // "100.00" (STRING)
    description: "Produto X",
    quantity: 1
  }],
  payments: [{
    payment_method: "pix", // ou "boleto", "credit_card"
    amount: amountInReais  // "100.00" (STRING)
  }]
};
```

### **📋 MÉTODOS DE PAGAMENTO AFETADOS:**

| Método | Conversão Necessária | Status | Localização |
|--------|---------------------|--------|-------------|
| **PIX** | ✅ SIM | ✅ **Implementado** | `PaymentsApiService.createPixPayment()` (linha 36) |
| **Boleto** | ✅ SIM | ✅ **Implementado** | `PaymentsApiService.createBoletoPayment()` (linha 137) |
| **Cartão** | ✅ SIM | ✅ **Implementado** | `PaymentsApiService.createCreditCardPayment()` (linha 255) |

**✅ CARTÃO DE CRÉDITO - IMPLEMENTAÇÃO COMPLETA:**
- **Tokenização**: Frontend usa `tokenizecard.js` da Pagar.me ✅
- **Processamento**: Backend integrado com API de Payments ✅
- **Conversão**: Aplica regra de centavos → string reais ✅
- **Localização Backend**: `server-simple.js` (linha 11247)
- **Localização Frontend**: `LandingCheckout.jsx` (linhas 378-804)

### **🚨 ERROS COMUNS:**

#### **❌ ERRO 1: Enviar centavos (número)**
```javascript
// ❌ ERRADO:
amount: 10000  // API rejeita ou interpreta como R$ 10.000,00
```

#### **❌ ERRO 2: Enviar reais (número)**
```javascript
// ❌ ERRADO:
amount: 100.00  // API espera STRING, não número
```

#### **✅ CORRETO:**
```javascript
// ✅ CORRETO:
amount: "100.00"  // STRING em reais
```

### **📁 ARQUIVOS AFETADOS:**
```bash
# Backend - Conversão obrigatória:
backend/services/PaymentsApiService.js
  ├── createPixPayment()         → linha 36  ✅
  ├── createBoletoPayment()      → linha 137 ✅
  └── createCreditCardPayment()  → linha 255 ✅

backend/server-simple.js
  ├── PIX payment processing     → linha 11195 ✅
  ├── Boleto payment processing  → linha 11220 ✅
  └── Credit Card processing     → linha 11247 ✅

# Frontend - Mantém centavos:
frontend/src/utils/CurrencyFormatter.js
frontend/src/pages/checkout/LandingCheckout.jsx
  ├── tokenizecard.js loading    → linha 378  ✅
  ├── Card fields mapping        → linha 1777 ✅
  └── Token submission           → linha 684  ✅
```

### **🔍 COMO IDENTIFICAR:**
```javascript
// 🔍 Verificar se está correto:
console.log('Valor interno:', 10000);           // INTEGER em centavos
console.log('Valor para API:', "100.00");       // STRING em reais
console.log('Tipo:', typeof "100.00");          // "string"
```

### **📚 DOCUMENTAÇÃO:**
- **Código**: `backend/services/PaymentsApiService.js` (linhas 9-14)
- **Referência**: `frontend/src/utils/CurrencyFormatter.js`
- **Especificação**: Fornecida pelo desenvolvedor da API de Payments

### **✅ CHECKLIST:**
- [x] **Valores internos em centavos (INTEGER)?** ✅
- [x] **Conversão para STRING em reais antes de enviar para API?** ✅
- [x] **Formato correto: `(centavos / 100).toFixed(2)`?** ✅
- [x] **Todos os métodos de pagamento convertidos?** ✅ (PIX, Boleto, Cartão)
- [x] **Comentários no código explicando a conversão?** ✅

---

## 🔒 **12. SEGURANÇA DE ROLES - REGRA CRÍTICA**

### **🎯 REGRA FUNDAMENTAL:**
**NUNCA misturar permissões entre roles diferentes! Cada role tem acesso específico.**

### **🚫 PROIBIDO:**
- ❌ Mostrar seções ADMIN para usuários OWNER
- ❌ Usar lógica OR incorreta: `isAdmin || isOwner`
- ❌ Assumir que OWNER = ADMIN
- ❌ Dar acesso administrativo para roles de negócio

### **✅ OBRIGATÓRIO:**
- ✅ **SEMPRE** separar roles claramente
- ✅ **SEMPRE** usar lógica específica por role
- ✅ **SEMPRE** testar com diferentes roles
- ✅ **SEMPRE** documentar permissões de cada role

### **🏷️ ROLES DEFINIDOS:**

#### **👑 OWNER (Proprietário):**
- **Função**: Dono do negócio
- **Acesso**: Produtos, Vendas, Loja, Operações, Relatórios, Financeiro, Afiliados
- **NÃO ACESSA**: Seção Administrador

#### **🛡️ ADMIN (Administrador):**
- **Função**: Administrador da plataforma
- **Acesso**: APENAS seção Administrador (usuários, pedidos, saques, aprovações)
- **NÃO ACESSA**: Funcionalidades de negócio

#### **👨‍💼 FUNCIONARIO:**
- **Função**: Funcionário do owner
- **Acesso**: Conforme permissões definidas pelo owner
- **NÃO ACESSA**: Seção Administrador

### **🔧 EXEMPLO CORRETO:**
```javascript
// ✅ CORRETO - Lógica específica por role:
const showAdminSection = isAdmin(); // APENAS Admin
const showProductsSection = isOwner() || isEmployee(); // Owner + Funcionários
const showPurchasesSection = isCustomer(); // APENAS Customer
```

### **❌ EXEMPLO ERRADO:**
```javascript
// ❌ ERRADO - Mistura de roles:
const showAdminSection = isAdmin() || isOwner(); // PERIGOSO!
```

### **📋 CHECKLIST DE SEGURANÇA DE ROLES:**
- [ ] **Cada seção tem lógica específica de role?**
- [ ] **NÃO há lógica OR misturando roles diferentes?**
- [ ] **OWNER não vê seções administrativas?**
- [ ] **ADMIN não vê seções de negócio?**
- [ ] **Testei com diferentes roles?**

### **🚨 CORREÇÃO CRÍTICA APLICADA:**
**Data**: 30/09/2025  
**Problema**: OWNER vendo seção Administrador  
**Correção**: `showAdminSection = isAdmin()` (removido `|| isOwner()`)  
**Documentação**: `docs/security/CORRECAO_CRITICA_ADMIN_SECTION.md`

---

## 📝 **13. DOCUMENTAÇÃO TÉCNICA - PADRÃO PROFISSIONAL**

### **🎯 REGRA FUNDAMENTAL:**
**SEMPRE criar documentação técnica detalhada para cada implementação!**

### **🚫 PROIBIDO:**
- ❌ Documentar apenas "como usar" (documentação de usuário)
- ❌ Deixar documentação superficial ou genérica
- ❌ Esquecer detalhes técnicos importantes
- ❌ Não documentar decisões arquiteturais
- ❌ Omitir configurações críticas

### **✅ OBRIGATÓRIO:**
- ✅ **SEMPRE** criar documentação técnica completa
- ✅ **SEMPRE** incluir detalhes de implementação
- ✅ **SEMPRE** documentar configurações e credenciais
- ✅ **SEMPRE** explicar arquitetura e fluxos
- ✅ **SEMPRE** listar arquivos modificados/criados

### **📋 ESTRUTURA OBRIGATÓRIA DA DOCUMENTAÇÃO TÉCNICA:**

#### **1️⃣ VISÃO GERAL:**
```markdown
# [Nome do Sistema/Feature]

## 📌 Resumo
Breve descrição do que foi implementado (2-3 linhas)

## 🎯 Objetivo
Para que serve e qual problema resolve

## 🏗️ Arquitetura
Diagrama ou descrição da estrutura (Service → Routes → Frontend)
```

#### **2️⃣ DETALHES TÉCNICOS:**
```markdown
## 🔧 Tecnologias Utilizadas
- Backend: Node.js, Express, PostgreSQL
- Frontend: React, Axios, SCSS Modules
- Integrações: SendGrid, Cloudflare R2, Payments API

## 📁 Arquivos Criados/Modificados
### Backend:
- `backend/services/FeatureService.js` (230 linhas)
- `backend/routes/feature.js` (150 linhas)
- `backend/templates/featureTemplates.js` (80 linhas)

### Frontend:
- `frontend/src/pages/FeaturePage.jsx` (340 linhas)
- `frontend/src/components/feature/Component.jsx` (180 linhas)
- `frontend/src/theme/feature.module.scss` (120 linhas)

### Database:
- `backend/migrations/create_feature_table.sql`

## 🗄️ Estrutura do Banco de Dados
```sql
CREATE TABLE feature (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  status VARCHAR(20) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW()
);
```
```

#### **3️⃣ CONFIGURAÇÃO E CREDENCIAIS:**
```markdown
## ⚙️ Variáveis de Ambiente
```bash
# Feature Service API
FEATURE_API_URL=https://feature-api.example.com
FEATURE_API_KEY=sk_live_...

# Configurações específicas
FEATURE_TIMEOUT=30000
FEATURE_MAX_RETRIES=3
```

## 🔑 Credenciais e Acessos
- **API Key**: Consultar `backend/env` (linha 45)
- **Dashboard**: https://dashboard.example.com
- **Documentação**: https://docs.example.com
```

#### **4️⃣ FLUXOS E REGRAS DE NEGÓCIO:**
```markdown
## 🔄 Fluxo de Funcionamento
1. **Frontend**: Usuário preenche formulário
2. **Validação**: Verifica dados obrigatórios
3. **Backend**: POST `/api/feature` → `FeatureService.create()`
4. **Database**: INSERT em `feature` table
5. **Notificação**: Email via SendGrid
6. **Resposta**: Retorna status + ID criado

## 📐 Regras de Negócio
- ✅ Apenas usuários `OWNER` podem criar
- ✅ Validação de CPF/CNPJ obrigatória
- ✅ Limite de 10 registros por dia
- ✅ Status padrão: `pending`
- ✅ Aprovação manual pelo admin
```

#### **5️⃣ TESTES E VALIDAÇÃO:**
```markdown
## 🧪 Como Testar
```bash
# 1. Testar endpoint backend:
curl -X POST http://localhost:3001/api/feature \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","value":100}'

# 2. Testar frontend:
# Abrir http://localhost:3002/#/feature
# Preencher formulário e submeter

# 3. Verificar banco de dados:
psql "postgresql://..." -c "SELECT * FROM feature ORDER BY id DESC LIMIT 5;"
```

## ✅ Checklist de Validação
- [ ] Criação funciona
- [ ] Edição funciona
- [ ] Exclusão funciona
- [ ] Validações estão corretas
- [ ] Emails são enviados
- [ ] Dados persistem no banco
```

#### **6️⃣ PROBLEMAS CONHECIDOS E SOLUÇÕES:**
```markdown
## 🚨 Troubleshooting

### ❌ Erro: "Feature API timeout"
**Causa**: Timeout muito baixo
**Solução**: Aumentar `FEATURE_TIMEOUT` para 30000ms

### ❌ Erro: "Validation failed"
**Causa**: CPF inválido ou já cadastrado
**Solução**: Verificar `FeatureService.validateCPF()`

### ❌ Erro: "Database connection refused"
**Causa**: Credenciais incorretas do Railway
**Solução**: Verificar `DB_HOST=yamabiko.proxy.rlwy.net` e `DB_PORT=15425`
```

#### **7️⃣ MANUTENÇÃO E EVOLUÇÃO:**
```markdown
## 🔄 Histórico de Mudanças
- **2025-10-16**: Implementação inicial
- **2025-10-17**: Adicionado suporte para CNPJ
- **2025-10-18**: Otimização de performance

## 🚀 Próximas Melhorias
- [ ] Adicionar filtros avançados
- [ ] Implementar paginação
- [ ] Criar dashboard de analytics
- [ ] Integrar com sistema X

## 📚 Referências
- Documentação SendGrid: https://docs.sendgrid.com
- Documentação Railway: https://docs.railway.app
- REGRAS_E_ACORDOS_IMPORTANTES.md
```

### **📁 ONDE SALVAR A DOCUMENTAÇÃO:**
```bash
# Documentação técnica completa:
docs/technical/FEATURE_TECHNICAL.md

# Documentação do sistema (visão geral):
docs/systems/FEATURE_SYSTEM.md

# Documentação de features (guia do usuário):
docs/features/FEATURE.md
```

### **🎯 BENEFÍCIOS DA DOC TÉCNICA:**
- ✅ **Recuperação rápida** - Se algo quebrar, sabe onde olhar
- ✅ **Onboarding fácil** - Novos devs entendem rápido
- ✅ **Manutenção eficiente** - Não precisa "adivinhar" como funciona
- ✅ **Evita retrabalho** - Detalhes não se perdem
- ✅ **Profissionalismo** - Demonstra qualidade do trabalho

### **🚨 PROBLEMAS DE NÃO TER DOC TÉCNICA:**
- ❌ **Perda de informação** - Esquecer detalhes importantes
- ❌ **Retrabalho** - Ter que investigar tudo novamente
- ❌ **Dificuldade de manutenção** - Não lembrar como foi feito
- ❌ **Bugs recorrentes** - Esquecer de configurações críticas
- ❌ **Falta de profissionalismo** - Código sem documentação

### **📋 CHECKLIST DE DOCUMENTAÇÃO TÉCNICA:**
- [ ] **Visão geral está clara?**
- [ ] **Arquitetura está explicada?**
- [ ] **Arquivos modificados estão listados?**
- [ ] **Credenciais e configurações estão documentadas?**
- [ ] **Fluxos e regras de negócio estão descritos?**
- [ ] **Há instruções de como testar?**
- [ ] **Troubleshooting está documentado?**
- [ ] **Histórico de mudanças está registrado?**

---

## 🎨 **21. DRAWER PADRÃO - COMPONENTE OBRIGATÓRIO**

### **🎯 REGRA FUNDAMENTAL:**
**SEMPRE usar o componente Drawer padrão (`frontend/src/theme/components/Drawer.jsx`) para painéis laterais! NUNCA usar Offcanvas do Bootstrap!**

### **✅ IMPORT OBRIGATÓRIO:**
```jsx
import { Drawer } from '../../theme/components';
// ou
import { Drawer } from '../theme/components';
```

### **🏗️ ESTRUTURA PADRÃO:**
```jsx
<Drawer
  show={showDrawer}
  onHide={() => setShowDrawer(false)}
  title="Título do Drawer"
  icon="mdi:icon-name"
  size="xl"  // sm (400px), md (600px), lg (800px), xl (1000px)
  footer={
    <div className="d-flex gap-2 justify-content-end w-100">
      <Drawer.Button variant="secondary" onClick={handleClose}>
        Fechar
      </Drawer.Button>
      <Drawer.Button variant="primary" onClick={handleSave}>
        Salvar
      </Drawer.Button>
    </div>
  }
>
  {/* Conteúdo */}
</Drawer>
```

### **📦 SUB-COMPONENTES DISPONÍVEIS:**

#### **1. Drawer.Section** - Seção com título
```jsx
<Drawer.Section title="Título da Seção" icon="mdi:icon-name">
  {/* Conteúdo */}
</Drawer.Section>
```

#### **2. Drawer.Row** - Linha de informação (Label + Valor)
```jsx
<Drawer.Row label="Nome" value="João Silva" />
<Drawer.Row label="Email" value={<a href="mailto:...">email@exemplo.com</a>} />
```

#### **3. Drawer.Divider** - Linha divisória
```jsx
<Drawer.Divider />
```

#### **4. Drawer.Badge** - Badge estilizado
```jsx
<Drawer.Badge variant="success">Aprovado</Drawer.Badge>
<Drawer.Badge variant="danger">Rejeitado</Drawer.Badge>
<Drawer.Badge variant="warning">Pendente</Drawer.Badge>
```

#### **5. Drawer.Button** - Botão estilizado
```jsx
<Drawer.Button variant="primary" icon="mdi:check" onClick={handleClick}>
  Confirmar
</Drawer.Button>
```

#### **6. Drawer.InfoCard** - Card informativo
```jsx
<Drawer.InfoCard variant="warning" icon="mdi:alert">
  <p>Mensagem importante aqui</p>
</Drawer.InfoCard>
```

#### **7. Drawer.EmptyState** - Estado vazio
```jsx
<Drawer.EmptyState 
  icon="mdi:file-remove" 
  text="Nenhum dado encontrado."
/>
```

### **🎨 VARIANTES DE COR:**
- **Drawer.Badge**: `success`, `danger`, `warning`, `info`, `neutral`
- **Drawer.Button**: `primary`, `secondary`, `success`, `danger`, `warning`
- **Drawer.InfoCard**: `info`, `success`, `warning`, `danger`, `neutral`

### **❌ PROIBIDO:**
```jsx
// ❌ NUNCA USAR:
import { Offcanvas } from "react-bootstrap";
<Offcanvas show={show} onHide={onHide}>...</Offcanvas>

// ❌ NUNCA CRIAR DRAWER CUSTOMIZADO DO ZERO
```

### **✅ CORRETO:**
```jsx
// ✅ SEMPRE USAR:
import { Drawer } from '../../theme/components';
<Drawer show={show} onHide={onHide} title="..." icon="...">
  <Drawer.Section title="Dados">
    <Drawer.Row label="Campo" value="Valor" />
  </Drawer.Section>
</Drawer>
```

### **📋 EXEMPLOS DE USO REAL:**
- `frontend/src/components/admin/AdminApprovalsList.jsx` - Drawer de aprovações
- `frontend/src/pages/admin/AdminProductsApprovalPage.jsx` - Drawer de produtos
- `frontend/src/pages/ResponsiblesPage.jsx` - Drawer de responsáveis

### **💡 BENEFÍCIOS:**
- ✅ **Visual consistente** - Mesmo design em todo o projeto
- ✅ **Funcionalidades prontas** - Fechar com ESC, click no backdrop, etc.
- ✅ **Responsivo** - Funciona em todos os tamanhos de tela
- ✅ **Acessível** - Suporte a teclado e screen readers
- ✅ **Manutenível** - Um único componente para manter
- ✅ **Profissional** - Design moderno e limpo

### **📁 LOCALIZAÇÃO:**
```bash
frontend/src/theme/components/Drawer.jsx
frontend/src/theme/components/Drawer.module.scss
```

---

## 🎯 **CHECKLIST ANTES DE QUALQUER IMPLEMENTAÇÃO:**

### **✅ Verificar:**

#### **📋 Preparação:**
- [ ] **Li `REGRAS_E_ACORDOS_IMPORTANTES.md`?**
- [ ] **Busquei documentação existente sobre o sistema?**
- [ ] **Entendi a arquitetura atual antes de começar?**
- [ ] **Não há arquivos UNTRACKED?**
- [ ] **Verifiquei dependências antes de remover código?**

#### **🗄️ Banco de Dados:**
- [ ] **DB_HOST = yamabiko.proxy.rlwy.net?**
- [ ] **DB_PORT = 15425?**
- [ ] **Ambos arquivos (`env` e `.env`) têm mesma config?**
- [ ] **Timeout >= 30000ms?**
- [ ] **Estou conectando no banco Railway correto?**

#### **💻 Código:**
- [ ] **Não usei dados mockados?**
- [ ] **Usei `<span>` em vez de `<h1>`, `<h2>`, etc.?**
- [ ] **NÃO mencionei plataformas externas (Pagar.me, Bling, etc.) em textos de ajuda?**
- [ ] **🎨 Usei Drawer padrão (`theme/components/Drawer`) em vez de Offcanvas?**
- [ ] **Implementação é modular (Service + Routes + Templates)?**
- [ ] **server-simple.js tem APENAS imports + registro de rotas?**
- [ ] **Adicionei as rotas modulares no swagger.js?**
- [ ] **🌐 NÃO há URLs hardcoded (localhost:3001)?**
- [ ] **🌐 Usei `API_URL` do config/api.js?**
- [ ] **Usei CurrencyFormatter para valores?**
- [ ] **Preço = plano básico?**
- [ ] **Dados são 100% reais do banco?**

#### **🔒 Segurança:**
- [ ] **VERIFIQUEI permissões de roles (OWNER ≠ ADMIN)?**
- [ ] **Seções administrativas APENAS para role ADMIN?**
- [ ] **Validações de CPF/Email/Licença funcionam?**

#### **🧪 Testes:**
- [ ] **TESTEI LOCALMENTE (http://localhost:3002) antes de commitar?**
- [ ] **VERIFIQUEI que tudo funciona perfeitamente local?**
- [ ] **Testei o SISTEMA COMPLETO após mudanças?**
- [ ] **Swagger remoto mostra as novas rotas?**
- [ ] **🌐 Testei em produção (Vercel)?**

#### **💾 Fluxo de Trabalho (NOVO):**
- [ ] **SINCRONIZEI MAIN LOCAL após último merge?** (frontend + backend)
- [ ] **CRIEI BACKUP do estado de produção?**
- [ ] **ESTOU TRABALHANDO NA MAIN LOCAL?** (implementações diretas)
- [ ] **VOU CRIAR FEATURE BRANCH apenas quando for subir?**
- [ ] **GEREI PR DESCRIPTION completa em Markdown?**
- [ ] **VERIFIQUEI FRONTEND E BACKEND antes de dizer que está pronto?**
- [ ] **Vou fazer push APENAS da feature branch (não da main)?**

#### **📝 Documentação:**
- [ ] **Criei documentação técnica completa?**
- [ ] **Documentei arquivos criados/modificados?**
- [ ] **Documentei configurações e credenciais?**
- [ ] **Documentei fluxos e regras de negócio?**
- [ ] **Documentei troubleshooting?**
- [ ] **GitHub Pages é HTML simples (se aplicável)?**

---

## 🚨 **EM CASO DE DÚVIDA:**

### **🎯 REGRA FUNDAMENTAL:**
**NUNCA assumir algo que você não sabe! SEMPRE perguntar ao usuário quando não souber ou não encontrar informações claras no código.**

### **❓ PERGUNTAR SEMPRE:**
- "Li `REGRAS_E_ACORDOS_IMPORTANTES.md` antes de começar?"
- "Busquei documentação existente sobre esse sistema?"
- "Criei branch de backup antes de começar as mudanças?"
- "Criei feature branch (não estou na main, certo)?"
- "Posso implementar isso sem dados mockados?"
- "Verifiquei todas as dependências do código que vou remover?"
- "Devo criar Service + Routes + Templates separados?"
- "Preciso adicionar as rotas no swagger.js?"
- "As configurações do Railway estão corretas (yamabiko:15425)?"
- "Ambos arquivos env têm a mesma configuração?"
- "Testei o sistema completo após as mudanças?"
- "🧪 Testei localmente e está funcionando perfeitamente?"
- "🌐 Não há URLs hardcoded no código?"
- "🌐 Usei API_URL do config/api.js?"
- "🌐 Testei em produção (Vercel)?"
- "Criei documentação técnica com todos os detalhes?"
- "Gerei a PR Description completa em Markdown?"
- "Quer que eu faça commit na feature branch e push?"
- "Vou fazer push da feature branch (NÃO da main, correto)?"
- "O valor deve vir do plano básico, correto?"
- "Devo usar HTML simples para docs?"

### **🛑 NUNCA ASSUMIR:**
- **Que pode fazer push direto para `main` (PROIBIDO! SEMPRE staging primeiro!)**
- **Que pode commitar na branch main e fazer push**
- **Que não precisa testar em staging antes de produção**
- **Que pode fazer deploy direto em produção sem passar por staging**
- **Que staging e produção são o mesmo ambiente**
- **Que não precisa criar feature branch**
- **Que não precisa criar branch de backup**
- **Que não precisa gerar PR Description**
- Que pode usar dados falsos "temporariamente"
- Que código duplicado pode ser removido sem análise
- Que pode implementar tudo no server-simple.js
- Que pode fazer commit automático
- **Que pode subir código sem testar localmente**
- **Que o remoto vai funcionar se o local não funciona**
- **Que URLs hardcoded vão funcionar em produção**
- **Que o Vercel vai detectar variáveis de ambiente automaticamente**
- **Que localhost:3001 vai funcionar no remoto**
- **Que DB_PORT=5432 vai funcionar (correto é 15425)**
- **Que não precisa ler a documentação antes de ajustar**
- **Que não precisa documentar tecnicamente a implementação**
- **Que pode deletar branches de backup**
- Que pode usar Jekyll na documentação
- Que pode calcular preços manualmente

---

## 🛍️ **14. MAPA DE FUNCIONALIDADES - ONDE ESTÁ CADA COISA**

### **🎯 OBJETIVO:**
Documentar onde estão implementadas as principais funcionalidades para acelerar desenvolvimento e manutenção.

---

### **📦 SISTEMA DE PRODUTOS**

#### **📁 Localização Principal:**
```
frontend/src/components/products/ViewProductV2.jsx
```

#### **🗂️ ABAS DO PRODUTO:**

##### **1️⃣ ABA "DADOS GERAIS"**
- **Onde editar**: Modal direto na mesma tela
- **Campos principais**:
  - Nome, descrição, imagem
  - Tipo (físico/digital)
  - Status (ativo/inativo)
  - Email e telefone de suporte
  - Código do produto (auto-gerado)
  - Status de aprovação (pending_approval/approved/rejected)

##### **2️⃣ ABA "PLANOS"**
- **Onde editar**: Modal `PlanModal` (mesmo arquivo)
- **Campos**:
  - Nome do plano
  - Preço (em centavos no banco, formatado no frontend)
  - Quantidade de itens inclusos
  - Parcelamento máximo
  - Tipo de recorrência
  - Status (ativo/inativo)
- **Regras**:
  - Preço do produto = preço do plano básico/padrão
  - Sempre usar `CurrencyFormatter` para valores

##### **3️⃣ ABA "CHECKOUTS"**
- **Onde editar**: Modal `CheckoutModalV2.jsx`
- **Arquivo**: `frontend/src/components/products/modals/CheckoutModalV2.jsx`
- **Estrutura do Modal**:
  - **Coluna 1**:
    - Informações Básicas (nome, descrição na fatura)
    - Vincular com Plano (obrigatório)
    - Contato para Suporte (telefone, WhatsApp)
  - **Coluna 2**:
    - Configuração do Chat
    - Rastreamento e Analytics
  - **Full Width**:
    - Métodos de Pagamento (Boleto, Cartão, PIX, AfterPay)
    - Configurações e Funcionalidades (switches)
    - Banner Personalizado do Checkout

- **Campos de Tracking/Analytics**:
  - `facebook_pixel` - Código do Facebook Pixel
  - `google_analytics` - Código do Google Analytics (GA4)
  - `google_tag_manager` - Código do Google Tag Manager
  - Salvos no banco como JSON em `pixel_config`

- **Campos de Chat**:
  - `chat_type` - Tipo do chat (JIVOCHAT, TAWK.TO, DRIFT, INTERCOM, PERSONALIZADO)
  - `chat_configuration` - Código do widget do chat
  - Injetado no `<body>` da página de checkout

- **Banner Personalizado**:
  - **Campo**: `banner_url`
  - **Dimensões**: 1200x400px (aspect ratio 3:1)
  - **Formatos**: JPG, PNG, GIF, WebP
  - **Tamanho máximo**: 2MB
  - **Upload**: Cloudflare R2
  - **Crop**: Inline com `react-image-crop`
  - **Exibição**: `LandingCheckout.jsx` (topo da página)

- **Métodos de Pagamento**:
  - Salvos como JSON em `payment_methods`
  - Campos: `boleto`, `credit_card` (ou `cartao`), `pix`, `after_pay`

- **Validações Obrigatórias**:
  - Nome do checkout (required)
  - Plano vinculado (required)

- **Campos de Contato**:
  - `support_phone` - Telefone para suporte (com máscara)
  - `whatsapp_phone` - Telefone do WhatsApp (com máscara)
  - Disclaimer: "Deixe em branco para usar dados do produto"

##### **4️⃣ ABA "AFILIAÇÃO"**
- **Onde editar**: Diretamente na tela (sem modal)
- **Seções**:
  - **Configurações**:
    - Programa de afiliado ativo (switch)
    - Etapa da comissão (Primeiro Clique / Último Clique)
    - Valor da Comissão (%)
    - Tempo de duração do cookie
    - Aprovação automática de afiliados (switch)
    - Acesso aos dados do comprador (switch)
  - **Afiliados**:
    - Lista de afiliados do produto
    - Link de afiliação (com botão copiar)
    - Estatísticas
  - **Gerentes**:
    - Lista de gerentes de afiliados
    - Adicionar/remover gerentes

##### **5️⃣ ABA "CUPONS"**
- **Onde editar**: Tela dedicada de cupons (não implementado no modal de checkout)
- **Nota**: Cupons foram removidos do CheckoutModalV2, devem ser gerenciados em tela própria

##### **6️⃣ ABA "URLs"**
- **Funcionalidade**: Links diretos para checkout, loja, afiliação
- **Campos**: URLs auto-geradas

##### **7️⃣ ABA "DIMENSÕES E FRETE"**
- **Onde editar**: Modal `EditShippingModal.jsx`
- **Arquivo**: `frontend/src/components/products/modals/EditShippingModal.jsx`
- **Campos**:
  - **Dimensões** (validações rigorosas):
    - Altura: 2cm - 105cm
    - Largura: 11cm - 105cm
    - Comprimento: 16cm - 105cm
    - Peso: 0.010kg - 30kg
  - **Tipo de Frete**:
    - Frete Variável: Mostra "Valor Padrão do Frete"
    - Frete Fixo: Mostra "Frete Fixo (R$)" (obrigatório)
  - **Outras opções**:
    - Frete grátis acima de (R$)
    - PAC gratuito
    - Aceita SEDEX
    - Frete incluído no preço
    - CEP de Origem (obrigatório)

---

### **💳 CHECKOUT DO CLIENTE (PÚBLICO)**

#### **📁 Arquivo Principal:**
```
frontend/src/pages/checkout/LandingCheckout.jsx
frontend/src/pages/checkout/LandingCheckout.css
```

#### **🎨 Estrutura Visual:**
1. **Banner Personalizado** (topo):
   - Exibido se `checkout.banner_url` existir
   - Centralizado, max-width 1200px
   - Responsivo e com bordas arredondadas

2. **Container Principal** (1200px max):
   - **Coluna Esquerda**: Produto (imagem, preço, descrição, benefícios)
   - **Coluna Direita**: Formulário de checkout

3. **Formulário**:
   - Dados Pessoais (nome, email, celular, CPF)
   - Endereço de Entrega (com busca automática por CEP)
   - Métodos de Pagamento (baseados no `checkout.payment_methods`)
   - Resumo do Pedido

4. **Footer**:
   - Selo "Compra 100% Segura" (badge verde destacado)
   - Informações da Pagmus

#### **🔧 Integrações Dinâmicas:**

##### **Tracking e Analytics:**
- **Arquivo Utility**: `frontend/src/utils/trackingScripts.js`
- **Funções disponíveis**:
  - `injectFacebookPixel(code)` - Injeta no `<head>`
  - `injectGoogleAnalytics(code)` - Injeta no `<head>`
  - `injectGoogleTagManager(code)` - Injeta no `<head>`
  - `injectAllTrackingScripts(pixelConfig, chatCode)` - Injeta todos de uma vez
- **Quando injetar**: No `useEffect` após carregar o checkout
- **Dados vêm de**: `checkout.pixel_config` (JSON no banco)

##### **Chat Widgets:**
- **Função**: `injectChatCode(code)` - Injeta no `<body>`
- **Tipos suportados**:
  - JIVOCHAT
  - TAWK.TO
  - DRIFT
  - INTERCOM
  - PERSONALIZADO (qualquer código HTML/JS)
- **Dados vêm de**: `checkout.chat_type` e `checkout.chat_configuration`
- **Como funciona**: Usuário cola o código do widget no modal, sistema injeta dinamicamente na página

##### **Métodos de Pagamento:**
- **Cartão de Crédito**:
  - Tokenização: Pagar.me `tokenizecard.js`
  - Campos mapeados: `data-pagarmecheckout-element`
- **PIX**: Modal com QR Code e código copia-cola
- **Boleto**: Modal com código de barras e PDF
- **AfterPay**: (se habilitado)

---

### **📊 BACKEND - ESTRUTURA DOS DADOS**

#### **Tabela: `products`**
- Campos principais do produto
- Relacionamentos: `product_plans`, `product_shipping`, `product_checkouts`

#### **Tabela: `product_checkouts`**
```sql
-- Campos importantes:
- id, product_id, name, status
- payment_methods (JSON)
- pixel_config (JSON) {
    facebook_pixel: string,
    google_analytics: string,
    google_tag_manager: string
  }
- chat_type (VARCHAR)
- chat_configuration (TEXT)
- banner_url (TEXT)
- support_phone, whatsapp_phone
- linked_plan_id (FK para product_plans)
```

#### **Endpoints Relevantes:**
```bash
# Checkouts
GET    /api/products/:productId/checkouts
POST   /api/products/:productId/checkouts
PUT    /api/products/:productId/checkouts/:checkoutId
DELETE /api/products/:productId/checkouts/:checkoutId

# Checkout Público
GET    /api/store/products/:productId (inclui checkout ativo)
```

---

### **🎯 REGRAS DE NEGÓCIO - CHECKOUT**

#### **✅ Validações Obrigatórias:**
1. Nome do checkout é obrigatório
2. Deve estar vinculado a um plano
3. Ao menos um método de pagamento deve estar ativo
4. Banner deve respeitar dimensões (1200x400px) e tamanho (2MB)

#### **📐 Dimensões e Formatos:**
- **Banner**: 1200x400px, max 2MB, JPG/PNG/GIF/WebP
- **Container**: max-width 1200px (alinhado com banner)

#### **🔒 Status:**
- `active`: Checkout disponível para uso
- `inactive`: Checkout oculto/desabilitado

#### **💡 Boas Práticas:**
1. Sempre testar códigos de tracking/analytics em ambiente de desenvolvimento
2. Validar códigos de chat antes de salvar (usar `isValidTrackingCode()`)
3. Banner deve ser responsivo e centralizado
4. Scripts de tracking injetados apenas uma vez (remover anteriores)
5. Chat widget deve ser leve e não bloquear carregamento da página

---

### **🔧 COMANDOS ÚTEIS PARA DEBUG:**

```bash
# Ver estrutura de um checkout no banco:
SELECT id, name, status, pixel_config, chat_type, banner_url 
FROM product_checkouts 
WHERE product_id = 48;

# Ver métodos de pagamento:
SELECT id, name, payment_methods 
FROM product_checkouts 
WHERE product_id = 48;

# Verificar se scripts foram injetados (console do navegador):
document.querySelector('#facebook-pixel-script')
document.querySelector('#google-analytics-script')
document.querySelector('#chat-widget-script')
```

---

## 💡 **LEMBRETE FINAL:**

**🎯 ESTE ARQUIVO EXISTE PARA EVITAR RETRABALHO E FRUSTRAÇÃO**

**📖 SEMPRE CONSULTE ANTES DE IMPLEMENTAR QUALQUER COISA**

**🤝 NOSSOS ACORDOS SÃO IMPORTANTES E DEVEM SER RESPEITADOS**

---

## 🤝 **18. SISTEMA DE AFILIADOS - CHECKOUT E VENDAS**

### **🎯 REGRA FUNDAMENTAL:**
**O sistema de afiliados rastreia vendas via cookies e links únicos. SEMPRE seguir o fluxo completo!**

### **🔄 FLUXO OBRIGATÓRIO:**

#### **1️⃣ Criação do Link**
- **Onde**: `frontend/src/pages/affiliate/AffiliateProductDetailsPage.jsx`
- **Como**: Link padrão criado automaticamente se não existir nenhum
- **Formato**: `?aff={link_code}` (ex: `?aff=linkpadro142p9mhox`)
- **Tabela**: `affiliate_links` (armazena link_code, affiliate_id, duração do cookie)

#### **2️⃣ Cliente Acessa Link**
- **URL**: `http://localhost:3002/#/checkout/9/36?aff=linkpadro142p9mhox`
- **Frontend**: `LandingCheckout.jsx` captura parâmetro `aff` da URL (linha 350)
- **Cookie**: Salvo como `aff_{productId}` via `affiliateCookies.js`
- **Duração**: Configurável (padrão: 7 dias / 168 horas)

#### **3️⃣ Cliente Finaliza Compra**
- **Endpoint**: `POST /api/sales`
- **Backend**: Detecta afiliado via `detectAffiliateFromCookie(req, productId)`
- **Arquivo**: `backend/utils/commissionCalculator.js` (linhas 373-421)

#### **4️⃣ Detecção do Afiliado**
```javascript
// backend/utils/commissionCalculator.js
async function detectAffiliateFromCookie(req, productId) {
  // 1. Busca cookie: aff_{productId}
  const affiliateCookie = req.cookies[`aff_${productId}`];
  
  // 2. Valida no banco: affiliate_links
  const linkQuery = await client.query(`
    SELECT affiliate_id, link_code, cookie_duration_hours
    FROM affiliate_links
    WHERE link_code = $1 AND product_id = $2 AND is_active = true
  `, [affiliateCookie.code, productId]);
  
  // 3. Verifica expiração
  const cookieAge = Date.now() - new Date(affiliateCookie.timestamp).getTime();
  if (cookieAge > maxAge) return null;
  
  // 4. Retorna AMBOS: affiliate_id E link_code
  return {
    affiliate_id: link.affiliate_id,
    link_code: link.link_code
  };
}
```

#### **5️⃣ Registro da Venda**
```javascript
// backend/server-simple.js (linhas 11091-11128)
// Detectar afiliado
const affiliateData = await detectAffiliateFromCookie(req, product_id);
let affiliate_id = affiliateData?.affiliate_id;
let affiliate_link_code = affiliateData?.link_code;

// Salvar venda com AMBOS os campos
INSERT INTO sales (
  product_id, customer_id, 
  affiliate_id, affiliate_link_code,  // ✅ AMBOS!
  total_amount, payment_method, ...
)
VALUES ($1, $2, $3, $4, $5, $6, ...)
```

#### **6️⃣ Cálculo de Comissões**
- **Automático**: `CommissionManager.processCommissions()` é chamado após inserir venda
- **Tabela**: `commission_transactions` registra comissão do afiliado
- **Valor**: Baseado em `products.commission_value` ou `product_affiliates.commission_rate`

---

### **🗄️ ESTRUTURA DO BANCO:**

#### **Tabela `affiliate_links`:**
```sql
- id (PK)
- product_id (FK → products)
- affiliate_id (FK → users)
- link_code (VARCHAR UNIQUE)        -- ✅ Código único do link
- cookie_duration_hours (INTEGER)   -- Duração do cookie (padrão: 168h)
- is_active (BOOLEAN)
```

#### **Tabela `sales`:**
```sql
- id (PK)
- affiliate_id (FK → users)         -- ✅ Qual afiliado
- affiliate_link_code (VARCHAR)     -- ✅ Qual link específico
- affiliate_commission (INTEGER)    -- Comissão calculada
```

---

### **📋 CHECKLIST PARA AJUSTES/CORREÇÕES:**

#### **✅ Ao modificar Frontend:**
- [ ] **Parâmetro `aff` é capturado da URL?**
- [ ] **Cookie `aff_{productId}` é salvo corretamente?**
- [ ] **`affiliateCookies.js` está sendo usado?**
- [ ] **LocalStorage salva `affiliate_link_code`?**

#### **✅ Ao modificar Backend:**
- [ ] **`detectAffiliateFromCookie` retorna AMBOS (affiliate_id + link_code)?**
- [ ] **Endpoint `/api/sales` salva `affiliate_link_code`?**
- [ ] **INSERT tem AMBOS os campos (affiliate_id, affiliate_link_code)?**
- [ ] **`CommissionManager.processCommissions()` é chamado?**

#### **✅ Ao testar:**
- [ ] **URL tem `?aff=codigo`?**
- [ ] **Cookie é criado no navegador?**
- [ ] **Venda tem `affiliate_id` preenchido?**
- [ ] **Venda tem `affiliate_link_code` preenchido?**
- [ ] **Comissão foi calculada (> R$ 0,00)?**

---

### **🚨 ERROS COMUNS:**

#### **❌ ERRO 1: Venda sem affiliate_id/affiliate_link_code**
**Causa:** Cliente não acessou via link com `?aff=` ou cookie não foi salvo  
**Solução:** Garantir que URL tem parâmetro `aff` e cookies estão habilitados

#### **❌ ERRO 2: detectAffiliateFromCookie retorna só affiliate_id**
**Causa:** Função antiga que não retornava `link_code`  
**Solução:** Função DEVE retornar objeto `{ affiliate_id, link_code }`

#### **❌ ERRO 3: Comissão R$ 0,00**
**Causa:** `affiliate_id` está NULL ou CommissionManager não foi executado  
**Solução:** Verificar que afiliado foi detectado e `processCommissions()` foi chamado

---

### **📚 DOCUMENTAÇÃO COMPLETA:**
```bash
docs/DOCUMENTACAO_FINAL/SISTEMA_AFILIADOS_CHECKOUT_VENDAS.md
```

---

### **💡 PONTOS CRÍTICOS:**

1. **Cookie Duration**: Salvo em `affiliate_links.cookie_duration_hours` (não hardcoded!)
2. **Dois Campos**: `affiliate_id` (quem) + `affiliate_link_code` (qual link)
3. **Relatórios**: Possível filtrar vendas por link específico via `affiliate_link_code`
4. **Múltiplos Links**: Afiliado pode ter vários links (WhatsApp, Instagram, etc.)
5. **Link Padrão**: Criado automaticamente se afiliado não tiver nenhum

---

## 🏦 **19. SISTEMA DE RECIPIENTS PAGAR.ME - ARQUITETURA CRÍTICA**

### **🎯 REGRA FUNDAMENTAL:**
**1 USER = 1 RECIPIENT_ID. Recipient é criado automaticamente quando admin aprova a PRIMEIRA conta bancária.**

### **📋 CONCEITO:**

Recipients são **recebedores** na Pagar.me. Cada participante de uma venda precisa ter um `recipient_id` para receber via split de pagamentos.

### **🗄️ ESTRUTURA:**

#### **Tabela `users`:**
```sql
-- Nova coluna (Migration 20260116):
ALTER TABLE users ADD COLUMN pagarme_recipient_id VARCHAR(255) UNIQUE;
```

- **`pagarme_recipient_id`**: ID do recipient na Pagar.me (ex: `rec_abc123`)
- **Criado**: Quando admin aprova a **primeira** conta bancária
- **Único**: Cada user tem apenas 1 recipient_id
- **Saldo**: Fica no recipient_id (user), NÃO na conta bancária

#### **Tabela `bank_accounts`:**
```sql
-- Sem alterações. Múltiplas contas OK!
-- holder_name pode ser de "responsáveis" (sócios, parceiros)
```

### **🔄 FLUXO AUTOMÁTICO:**

#### **1️⃣ Admin Aprova Conta Bancária:**
```javascript
// backend/services/BankAccountService.js
async approveBankAccount(accountId, adminId) {
  // 1. Aprovar conta no banco
  // 2. Verificar se usuário já tem recipient_id
  
  if (!user.pagarme_recipient_id) {
    // 🆕 PRIMEIRA CONTA: Criar recipient
    await RecipientService.createRecipientInPagarme(userId, accountId);
  } else {
    // 🔄 CONTA ADICIONAL: Adicionar ao recipient existente
    await RecipientService.addBankAccountToRecipient(recipient_id, accountId);
  }
}
```

#### **2️⃣ Venda com Split:**
```javascript
// backend/server-simple.js (POST /api/checkout/process)
// Após calcular comissões:

const splitResult = await PagarmeIntegrationService.calculateSplitForSale(saleData, commissionResults);

// ⚠️ VALIDAÇÃO CRÍTICA:
// SE algum participante NÃO tem recipient_id → ERRO!
if (!splitResult.success) {
  return res.status(400).json({
    error: 'Participantes sem conta bancária aprovada'
  });
}

// ✅ Enviar split para Pagar.me
await PaymentsApiService.createPixPayment(paymentData, splitRules);
```

### **📁 ARQUIVOS PRINCIPAIS:**

```bash
# Migration:
backend/migrations/20260116_add_pagarme_recipient_id_to_users.sql

# Services:
backend/services/RecipientService.js          # Gerencia recipients
backend/services/BankAccountService.js        # Cria recipients na aprovação
backend/services/PagarmeIntegrationService.js # Calcula split
backend/services/PaymentsApiService.js        # Envia split (PIX, Boleto, Cartão)

# Endpoints Admin:
GET /api/admin/recipients              # Listar todos recipients
GET /api/admin/users/:userId/recipient # Obter recipient de um usuário

# Documentação:
docs/SISTEMA_RECIPIENTS_PAGARME.md           # Guia completo
docs/ARQUITETURA_RECIPIENT_VS_RESPONSAVEL_16JAN2026.md
```

### **⚠️ TIPO DE SPLIT:**

```javascript
// ✅ CORRETO (recomendação do time Payments):
{
  "recipient_id": "rec_abc123",
  "amount": 70,           // Percentual (70%)
  "type": "percentage",   // ✅ Usar percentage!
  "options": {
    "liable": true,
    "charge_processing_fee": true,
    "charge_remainder_fee": false
  }
}

// ❌ ERRADO:
{
  "type": "fixed"  // Não usar!
}
```

### **🚨 VALIDAÇÕES CRÍTICAS:**

#### **✅ ANTES DE PROCESSAR VENDA:**
1. **Verificar** que TODOS participantes têm `pagarme_recipient_id`
2. **Bloquear** venda se algum não tiver
3. **Erro claro**: "Participante X não possui conta bancária aprovada"

#### **✅ CHECKLIST PRÉ-DEPLOY:**
- [ ] Migration executada (staging + produção)
- [ ] `PAYMENTS_API_KEY` configurado no Railway
- [ ] Teste: Aprovar conta → Verificar `recipient_id` criado
- [ ] Teste: Venda com split → Verificar `split_rules` enviado
- [ ] Teste: Venda sem conta aprovada → Deve bloquear

### **📚 DOCUMENTAÇÃO COMPLETA:**
```bash
# Ver guia detalhado:
docs/SISTEMA_RECIPIENTS_PAGARME.md
```

### **💡 BENEFÍCIOS:**
- ✅ **Split Real**: Pagar.me distribui valores automaticamente
- ✅ **Saldos Separados**: Cada recipient tem seu próprio saldo
- ✅ **Rastreabilidade**: Sabemos exatamente quem recebeu o quê
- ✅ **Segurança**: Validação de contas aprovadas antes da venda
- ✅ **Flexibilidade**: Múltiplas contas por user

### **🚫 NUNCA:**
- ❌ Processar venda sem validar `recipient_id`
- ❌ Usar UUID como `recipient_id` (Pagar.me gera o próprio ID)
- ❌ Usar split tipo `fixed` (usar `percentage`)
- ❌ Esquecer de criar recipient na aprovação de conta

---

**✅ Arquivo criado em: ${new Date().toLocaleDateString('pt-BR')}**
**🔄 Deve ser consultado antes de TODA implementação**
**📝 Última atualização: 16/01/2026 - Adicionado Sistema de Recipients Pagar.me**

---

## 👔 **20. SISTEMA DE RESPONSÁVEIS - FORMULÁRIOS E EXCLUSÃO**

### **🎯 REGRA FUNDAMENTAL:**
**SEMPRE usar `ResponsibleRegistrationForm` (modal) para criar novos responsáveis. ResponsibleFormPage é APENAS para editar responsáveis existentes.**

---

### **📁 ESTRUTURA DOS COMPONENTES:**

#### **✅ COMPONENTE CORRETO - CRIAR NOVO:**
```bash
frontend/src/components/responsibles/ResponsibleRegistrationForm.jsx
```

**Uso:**
- **Quando**: Clicar no botão "Novo Responsável" na página principal
- **Como**: Modal que abre dentro de `ResponsiblesPage`
- **Estado**: `showNewResponsibleModal`
- **Ação**: `setShowNewResponsibleModal(true)`

**Características:**
- ✅ Modal inline (não muda de página)
- ✅ Todos os campos de PF e PJ
- ✅ Upload de documentos
- ✅ Integração com ViaCEP
- ✅ Máscaras automáticas
- ✅ Validações completas para Pagar.me

---

#### **✅ COMPONENTE CORRETO - EDITAR EXISTENTE:**
```bash
frontend/src/pages/ResponsibleFormPage.jsx
```

**Uso:**
- **Quando**: Clicar em "Editar" ou "Completar" em um responsável existente
- **Como**: Página dedicada com rota
- **Rota**: `/responsibles/edit/:id` ou `/responsibles/complete/:id`

**Características:**
- ✅ Página completa (muda de rota)
- ✅ Carrega dados existentes
- ✅ Edita responsáveis aprovados, rejeitados ou pendentes
- ✅ Mesmas validações do modal de criação

---

#### **❌ CÓDIGO MORTO - REMOVER:**
```bash
frontend/src/components/modals/ResponsibleRequiredModal.jsx (em ResponsiblesPage)
```

**Motivo da Remoção:**
- ❌ Estado `showResponsibleModal` nunca é setado como `true`
- ❌ Modal nunca é aberto
- ❌ Rota `/responsibles/new` existe mas nunca é acessada
- ❌ Botão "Novo Responsável" abre `ResponsibleRegistrationForm`, não redireciona

**Ação:**
- ✅ Remover import de `ResponsibleRequiredModal` em `ResponsiblesPage.jsx`
- ✅ Remover estado `showResponsibleModal`
- ✅ Remover renderização do modal

---

### **🗑️ EXCLUSÃO DE RESPONSÁVEIS:**

#### **✅ COMPORTAMENTO ATUAL:**
Ao excluir um responsável, o sistema **automaticamente exclui** TODAS as contas bancárias vinculadas.

**Fluxo:**
1. **Usuário clica em "Excluir"**
2. **Backend busca** quantas contas bancárias estão vinculadas
3. **Modal de confirmação** exibe:
   - Nome do responsável
   - ⚠️ Aviso: "Este responsável possui X conta(s) bancária(s) vinculada(s)"
   - Lista do que será removido: documentos + contas bancárias
4. **Usuário confirma exclusão**
5. **Backend executa** exclusão em cascata:
   - Exclui TODAS as contas bancárias
   - Exclui documentos
   - Exclui responsável
6. **Modal de sucesso** exibe:
   - Nome do responsável excluído
   - Quantas contas bancárias foram excluídas

**Arquivos:**
- `backend/services/ResponsibleService.js` - Método `deleteResponsible()`
- `frontend/src/pages/ResponsiblesPage.jsx` - Modais e handlers

**Documentação Completa:**
```bash
docs/responsibles/EXCLUSAO_RESPONSAVEL_E_CONTAS.md
```

---

### **📋 CHECKLIST - RESPONSÁVEIS:**

#### **✅ Ao criar novo responsável:**
- [ ] Usei `ResponsibleRegistrationForm` (modal)?
- [ ] Todos os campos obrigatórios aparecem?
- [ ] Validações estão funcionando?
- [ ] Upload de documentos está habilitado?
- [ ] CEP automático funciona?

#### **✅ Ao editar responsável:**
- [ ] Usei `ResponsibleFormPage` (página)?
- [ ] Dados existentes são carregados?
- [ ] Salvamento funciona?
- [ ] Validações são aplicadas?

#### **✅ Ao excluir responsável:**
- [ ] Modal de confirmação exibe aviso sobre contas bancárias?
- [ ] Modal de sucesso exibe resultado correto?
- [ ] Responsável E contas foram excluídos do banco?
- [ ] Logs do backend mostram as exclusões?

---

### **🚨 ERROS COMUNS A EVITAR:**

#### **❌ ERRO 1: Usar ResponsibleFormPage para criar novo**
```javascript
// ❌ ERRADO:
onClick={() => navigate('/responsibles/new')}

// ✅ CORRETO:
onClick={() => setShowNewResponsibleModal(true)}
```

#### **❌ ERRO 2: Usar ResponsibleRegistrationForm para editar**
```javascript
// ❌ ERRADO:
<ResponsibleRegistrationForm responsibleId={id} />

// ✅ CORRETO:
navigate(`/responsibles/edit/${id}`)
```

#### **❌ ERRO 3: Manter ResponsibleRequiredModal em ResponsiblesPage**
```javascript
// ❌ CÓDIGO MORTO:
import ResponsibleRequiredModal from "../components/modals/ResponsibleRequiredModal";
const [showResponsibleModal, setShowResponsibleModal] = useState(false);
<ResponsibleRequiredModal show={showResponsibleModal} ... />

// ✅ REMOVER TUDO ISSO!
```

---

### **💡 BOAS PRÁTICAS:**

1. **Modal para criar** (rápido, sem mudança de página)
2. **Página para editar** (mais espaço, contexto completo)
3. **Avisos claros** ao excluir (mostrar impacto completo)
4. **Confirmação de sucesso** (feedback visual positivo)
5. **Logs detalhados** (rastreamento de exclusões)

---

### **📚 DOCUMENTAÇÃO RELACIONADA:**
- `docs/responsibles/EXCLUSAO_RESPONSAVEL_E_CONTAS.md` - Exclusão em cascata
- `docs/pagamentos-split/ROADMAP_MELHORIAS_TAXAS_E_SPLIT_15JAN2026.md` - Validações de dados
- `docs/SISTEMA_RECIPIENTS_PAGARME.md` - Integração com Pagar.me

---

## 🔐 16. 2FA (Autenticação em Duas Etapas) – Fluxo Oficial

### ✅ Comportamento Atual (Obrigatório)
- **Entrada do código**: 6 dígitos numéricos.
- **Validação**: Somente ao clicar no botão **Acessar**.
- **Habilitação do botão**: Fica ativo apenas quando os 6 dígitos foram digitados corretamente (regex: `^\d{6}$`).
- **Colar código**: Continua funcionando normalmente (preenche os 6 dígitos); ainda assim, a validação ocorre no clique em Acessar.
- **Reenvio**: Quando o countdown termina, o botão volta a ser **Reenviar código**.
- **Sem auto-submit**: A validação automática ao completar os 6 dígitos (onComplete) não deve disparar login – evita falhas ao digitar.

### 🧭 Racional
- Evitar inconsistências ao digitar manualmente (inputs ficavam verdes mas não validavam).
- Tornar o fluxo explícito e previsível: o usuário sempre confirma com **Acessar**.

### 📋 Checklist de Implementação/Validação
- [ ] Botão "Acessar" aparece durante o countdown e só habilita com 6 dígitos.
- [ ] Botão alterna para "Reenviar código" quando o tempo expira.
- [ ] Colar preenche corretamente, mas valida apenas no clique.
- [ ] Nenhum auto-submit ao completar os 6 dígitos.

### 🗂️ Locais relevantes
- `frontend/src/components/modals/TwoFactorModal.jsx`
- `frontend/src/components/auth/TwoFactorInput.jsx`

### ⚠️ Boas Práticas
- Não alterar o fluxo para auto-submit sem teste e validação prévia.
- Manter contagem regressiva e limites de tentativas consistentes com o backend.

---

## 📧 **16.1. NOTIFICAÇÕES DE APROVAÇÃO - PADRÃO OBRIGATÓRIO**

### **🎯 REGRA FUNDAMENTAL:**
**TODAS as notificações de aprovação/rejeição DEVEM incluir o nome do admin que executou a ação!**

### **✅ IMPLEMENTAÇÃO PADRÃO:**

#### **🔧 Buscar Nome do Admin:**
```javascript
// Em TODOS os serviços de aprovação:
// AdminApprovalService.js
// ProductApprovalService.js
// BankAccountService.js
// WithdrawalService.js

// Buscar dados do admin
const adminResult = await pool.query('SELECT name FROM users WHERE id = $1', [adminId]);
const adminName = adminResult.rows[0]?.name || 'Administrador';

// Passar para a notificação
await NotificationIntegrationService.notify*({
  userId: user_id,
  ...otherData,
  adminName: adminName  // ✅ SEMPRE incluir!
});
```

### **📋 NOTIFICAÇÕES IMPLEMENTADAS:**

#### **✅ Responsáveis:**
- `notifyResponsibleApproved({ userId, responsibleId, responsibleName, adminName })`
- `notifyResponsibleRejected({ userId, responsibleId, responsibleName, adminName, reason })`

#### **✅ Produtos:**
- `notifyProductApproved({ userId, productId, productName, productUuid, adminName })`
- `notifyProductRejected({ userId, productId, productName, productUuid, adminName, reason })`

#### **✅ Saques:**
- `notifyWithdrawalApproved({ userId, withdrawalId, amount, adminName, estimatedDate })`
- `notifyWithdrawalRejected({ userId, withdrawalId, amount, adminName, reason })`

#### **✅ Contas Bancárias:**
- `notifyBankAccountApproved({ userId, bankAccountId, bankName, accountNumber, adminName })`
- `notifyBankAccountRejected({ userId, bankAccountId, bankName, accountNumber, adminName, reason })`

### **🗄️ BANCO DE DADOS:**

#### **❌ NÃO REQUER ALTERAÇÃO NO BANCO!**
- ✅ O nome do admin já existe em `users.name`
- ✅ Buscado dinamicamente quando a aprovação/rejeição acontece
- ✅ Não precisa salvar em tabelas de histórico/log
- ✅ Sem migrações necessárias (staging ou produção)

### **📧 TEMPLATES DE EMAIL:**

#### **✅ Todos os Templates Já Incluem adminName:**
```javascript
// backend/templates/emailTemplates.js

getResponsibleApprovedTemplate({ userName, responsibleName, adminName, link })
getResponsibleRejectedTemplate({ userName, responsibleName, adminName, reason, link })
getProductApprovedTemplate({ userName, productName, adminName, link })
getProductRejectedTemplate({ userName, productName, adminName, reason, link })
getWithdrawalApprovedTemplate({ userName, amount, adminName, link })
getWithdrawalRejectedTemplate({ userName, amount, adminName, reason, link })
getBankAccountApprovedTemplate({ userName, bankName, accountNumber, adminName, link })
getBankAccountRejectedTemplate({ userName, bankName, accountNumber, adminName, reason, link })
```

### **📁 ARQUIVOS AFETADOS:**
```bash
# Backend - Services que fazem aprovações:
backend/services/AdminApprovalService.js      # ✅ Responsáveis
backend/services/ProductApprovalService.js    # ✅ Produtos
backend/services/BankAccountService.js        # ✅ Contas Bancárias
backend/services/WithdrawalService.js         # ✅ Saques

# Backend - Integração de notificações:
backend/services/NotificationIntegrationService.js  # ✅ 8 métodos
backend/templates/emailTemplates.js                 # ✅ 8 templates

# Frontend - Navegação de notificações:
frontend/src/utils/NotificationNavigation.js        # ✅ Redirecionamentos
```

### **🚨 PADRÃO CRÍTICO:**

#### **✅ SEMPRE:**
1. **Buscar nome do admin** antes de disparar notificação
2. **Passar adminName** para o método de notificação
3. **Incluir no template de email** (já implementado)
4. **Exibir no dashboard** quando relevante

#### **❌ NUNCA:**
- Omitir `adminName` em notificações de aprovação/rejeição
- Usar "Admin" ou "Sistema" sem buscar o nome real
- Assumir que adminName não é necessário

### **💡 BENEFÍCIOS:**
- ✅ **Transparência** - Usuário sabe quem aprovou/rejeitou
- ✅ **Profissionalismo** - Emails e notificações completos
- ✅ **Rastreabilidade** - Histórico claro de ações administrativas
- ✅ **Confiança** - Mostra que há pessoas reais gerenciando o sistema

### **📋 CHECKLIST:**
- [ ] **Todos os serviços de aprovação buscam `adminName`?**
- [ ] **Todas as notificações incluem `adminName`?**
- [ ] **Todos os templates de email usam `adminName`?**
- [ ] **Testado localmente com aprovações reais?**
- [ ] **Emails chegam com o nome correto do admin?**

---

## 🗄️ **17. ESTRUTURA DO BANCO DE DADOS - TABELAS E RELACIONAMENTOS CRÍTICOS**

### **🎯 REGRA FUNDAMENTAL:**
**SEMPRE verificar a estrutura real das tabelas antes de criar queries! NUNCA assumir que colunas ou tabelas existem sem confirmar.**

### **🚫 TABELAS QUE NÃO EXISTEM:**
- ❌ **`customers`** - **NÃO EXISTE!** Os dados de clientes estão na tabela `users` (via `sales.customer_id`)
- ❌ **`afterpay_orders`** - **NÃO EXISTE!** Usar tabela `sales` com `is_afterpay = true`
- ❌ **`product_type`** - **NÃO EXISTE!** A coluna correta é `category` na tabela `products`
- ❌ **`product_plans`** - **NÃO EXISTE!** A tabela correta é `plans` (sem prefixo `product_`)

### **⚠️ COLUNAS QUE NÃO EXISTEM:**
- ❌ **`sales.coupon_id`** - **NÃO EXISTE!** A tabela `sales` não possui coluna de relacionamento direto com cupons
  - **Uso de cupons**: Rastrear via campo `used_count` na tabela `coupons`
  - **Valor descontado**: Calcular estimativamente baseado em `coupons.used_count` e `coupons.discount_value`
- ❌ **`tickets.resolved_at`** - **NÃO EXISTE!** A tabela `tickets` não possui coluna `resolved_at`
  - **Tickets resolvidos**: Identificar via `status IN ('resolved', 'closed')`
  - **SLA/Resolução**: Calcular usando `updated_at - created_at` quando `status IN ('resolved', 'closed')`

### **✅ ESTRUTURA CORRETA DAS TABELAS:**

#### **📊 TABELA `sales` (Vendas):**
```sql
-- Campos importantes:
- id (PK)
- customer_id (FK → users.id)  ⚠️ NÃO customers.id!
- product_id (FK → products.id)
- total_amount (INTEGER - centavos)
- payment_status (ENUM)
- sale_status (ENUM)
- is_afterpay (BOOLEAN)  ⚠️ Para filtrar pedidos AfterPay
- tracking_code (VARCHAR)
- delivered_at (TIMESTAMP)  ⚠️ Para status de entrega
- created_at (TIMESTAMP)
```

**⚠️ IMPORTANTE:**
- **Cliente**: `sales.customer_id` referencia `users.id`, **NÃO** `customers.id`
- **Para JOIN com cliente**: `LEFT JOIN users c ON c.id = s.customer_id`
- **Status de entrega**: Não existe `delivery_status`, usar lógica:
  - `delivered_at IS NOT NULL` → **Entregue**
  - `delivered_at IS NULL AND tracking_code IS NOT NULL` → **Em Trânsito**
  - `delivered_at IS NULL AND tracking_code IS NULL` → **Pendente**

#### **📦 TABELA `products` (Produtos):**
```sql
-- Campos importantes:
- id (PK)
- user_id (FK → users.id)
- name (VARCHAR)
- image (VARCHAR)  ⚠️ NÃO image_url! Coluna é `image`
- category (VARCHAR)  ⚠️ NÃO product_type!
- product_code (VARCHAR)
- status (VARCHAR)
- price (INTEGER - centavos)
- approval_status (ENUM: pending_approval, approved, rejected)
- approved_by (FK → users.id)
- approved_at (TIMESTAMP)
- rejection_reason (TEXT)
```

**⚠️ IMPORTANTE:**
- **Imagem**: A coluna é `image`, **NÃO** `image_url`. Usar `p.image as image_url` em queries se necessário
- **Categoria**: A coluna é `category`, **NÃO** `product_type`
- **Para queries**: Sempre usar `p.category`, nunca `p.product_type`
- **Para imagem**: Usar `p.image` ou `p.image as image_url` se precisar do alias

#### **👥 TABELA `users` (Usuários):**
```sql
-- Campos importantes:
- id (PK)
- name (VARCHAR)
- email (VARCHAR)
- role (VARCHAR: owner, admin, customer, employee, seller)
- seller_exclusive_owner_id (FK → users.id)  ⚠️ Para identificar vendedores
```

**⚠️ IMPORTANTE:**
- **Clientes**: São usuários com `role = 'customer'`
- **Vendedores**: São usuários com `seller_exclusive_owner_id IS NOT NULL`
- **Para relatórios**: `customer_id` na tabela `sales` referencia `users.id`

#### **🚚 AFTERPAY / LOGÍSTICA:**
**⚠️ NÃO EXISTE TABELA `afterpay_orders`!**

**Como identificar pedidos AfterPay:**
```sql
-- ✅ CORRETO:
FROM sales s
WHERE s.is_afterpay = true

-- ❌ ERRADO:
FROM afterpay_orders apo  -- Tabela não existe!
```

**Status de entrega (AfterPay):**
- Usar a mesma lógica da tabela `sales`:
  - `delivered_at IS NOT NULL` → Entregue
  - `tracking_code IS NOT NULL AND delivered_at IS NULL` → Em Trânsito
  - `tracking_code IS NULL AND delivered_at IS NULL` → Pendente

### **📋 CHECKLIST ANTES DE CRIAR QUERIES:**
- [ ] **Verifiquei a estrutura real da tabela** (com `\d nome_tabela` no psql)?
- [ ] **Confirmei que todas as colunas existem** antes de usar?
- [ ] **Verifiquei relacionamentos** (FKs) corretos?
- [ ] **NÃO estou usando tabelas/colunas que não existem** (`customers`, `afterpay_orders`, `product_type`, `product_plans`, `p.image_url`, `sales.coupon_id`)?
- [ ] **Para clientes, uso `users` via `sales.customer_id`**?
- [ ] **Para AfterPay, uso `sales` com `is_afterpay = true`**?
- [ ] **Para categoria de produto, uso `p.category`**?
- [ ] **Para imagem do produto, uso `p.image` (não `p.image_url`)**?
- [ ] **Para planos do produto, uso tabela `plans` (não `product_plans`)**?
- [ ] **Para cupons, uso `coupons.used_count` ao invés de `sales.coupon_id`**?
- [ ] **Para tickets resolvidos, uso `status IN ('resolved', 'closed')` e `updated_at - created_at` ao invés de `resolved_at`**?

### **🔍 COMO VERIFICAR ESTRUTURA DAS TABELAS:**
```bash
# Via psql (Railway):
psql "postgresql://postgres:senha@yamabiko.proxy.rlwy.net:15425/railway?sslmode=require" -c "\d nome_tabela"

# Exemplos:
psql ... -c "\d sales"      # Ver estrutura da tabela sales
psql ... -c "\d products"    # Ver estrutura da tabela products
psql ... -c "\d users"       # Ver estrutura da tabela users
psql ... -c "\dt"            # Listar todas as tabelas
```

### **💡 ERROS COMUNS A EVITAR:**
- ❌ `LEFT JOIN customers c` → Use `LEFT JOIN users c`
- ❌ `FROM afterpay_orders` → Use `FROM sales WHERE is_afterpay = true`
- ❌ `p.product_type` → Use `p.category`
- ❌ `p.image_url` → Use `p.image` (ou `p.image as image_url` se precisar do alias)
- ❌ `FROM product_plans` → Use `FROM plans` (a tabela é `plans`, não `product_plans`)
- ❌ `s.delivery_status` → Use lógica com `delivered_at` e `tracking_code`
- ❌ `s.coupon_id` → A tabela `sales` não possui `coupon_id`. Use `coupons.used_count` para rastrear usos
- ❌ `t.resolved_at` → A tabela `tickets` não possui `resolved_at`. Use `status IN ('resolved', 'closed')` e `updated_at - created_at` para calcular SLA

### **✅ EXEMPLOS DE QUERIES CORRETAS:**

#### **Query de Vendas com Cliente:**
```sql
SELECT 
  s.id, s.total_amount,
  u.name as customer_name,  -- ✅ users, não customers
  p.name as product_name
FROM sales s
INNER JOIN products p ON p.id = s.product_id
LEFT JOIN users u ON u.id = s.customer_id  -- ✅ Correto
WHERE p.user_id = $1
```

#### **Query de AfterPay:**
```sql
SELECT 
  s.id, s.tracking_code,
  CASE 
    WHEN s.delivered_at IS NOT NULL THEN 'delivered'
    WHEN s.tracking_code IS NOT NULL THEN 'in_transit'
    ELSE 'pending'
  END as delivery_status
FROM sales s
WHERE s.is_afterpay = true  -- ✅ Correto, não afterpay_orders
```

#### **Query de Produtos por Categoria:**
```sql
SELECT 
  p.category,  -- ✅ Correto, não product_type
  COUNT(p.id) as total
FROM products p
GROUP BY p.category
```

#### **Query de Produtos com Planos:**
```sql
SELECT 
  p.id,
  p.name,
  p.image as image_url,  -- ✅ Correto: coluna é `image`, não `image_url`
  (
    SELECT COUNT(*)::int
    FROM plans pp  -- ✅ Correto: tabela é `plans`, não `product_plans`
    WHERE pp.product_id = p.id
  ) as plans_count,
  (
    SELECT MIN(pp.price)
    FROM plans pp  -- ✅ Correto: tabela é `plans`, não `product_plans`
    WHERE pp.product_id = p.id AND pp.status = 'active'Produtos que Promovo
  ) as min_price
FROM products p
WHERE p.approval_status = 'pending_approval'
```

---

## 📁 **14. DOCUMENTOS DE RESPONSÁVEIS - REGRA DE EDIÇÃO E SUBSTITUIÇÃO**

### **📋 REGRA ABSOLUTA:**
**1 tipo de documento = 1 arquivo por responsável. NUNCA duplicar documentos ao editar.**

---

### **✅ COMPORTAMENTO ESPERADO:**

#### **1. AO EDITAR RESPONSÁVEL:**
- ✅ Carregar documentos existentes via `GET /api/responsibles/:id/documents`
- ✅ Exibir documentos existentes com status visual (caixa verde: "Documento já enviado")
- ✅ Permitir salvar SEM reenviar documento (se já existe)
- ✅ Validação aceita documento existente OU novo (não obriga reenvio)

#### **2. AO SUBSTITUIR DOCUMENTO:**
- ✅ **DELETAR documento antigo ANTES** de enviar novo
- ✅ Usar endpoint `DELETE /api/responsibles/:id/documents/:documentId`
- ✅ Enviar novo documento via `POST /api/responsibles/:id/documents`
- ✅ Garantir: **1 tipo = 1 arquivo** no banco

---

### **❌ COMPORTAMENTO PROIBIDO:**

- ❌ **NÃO** criar documento novo sem deletar antigo
- ❌ **NÃO** permitir duplicatas (ex: 3x CNH do mesmo responsável)
- ❌ **NÃO** forçar usuário a reenviar documento que já existe
- ❌ **NÃO** bloquear salvamento se documento já existe (mas não foi reenviado)

---

### **🔧 IMPLEMENTAÇÃO TÉCNICA:**

#### **Frontend:**
```javascript
// Estado para documentos existentes
const [existingDocuments, setExistingDocuments] = useState({
  cnh: null,
  cnpj: null,
  inscricao_estadual: null
});

// Carregar documentos existentes
useEffect(() => {
  const loadExistingDocuments = async () => {
    const response = await fetch(`${API_URL}/api/responsibles/${responsible.id}/documents`);
    const data = await response.json();
    // Mapear documentos por tipo
    setExistingDocuments({ cnh: doc1, cnpj: doc2, ... });
  };
  loadExistingDocuments();
}, [responsible?.id]);

// Validação aceita documento existente OU novo
if (!documents.cnh && !existingDocuments.cnh) {
  newErrors.cnh = 'Documento pessoal (CNH ou RG) é obrigatório';
}

// Ao enviar: deletar antigo antes de criar novo
if (existingDocuments.cnh && documents.cnh) {
  await fetch(`${API_URL}/api/responsibles/${id}/documents/${existingDocuments.cnh.id}`, {
    method: 'DELETE'
  });
}
```

#### **Backend:**
```javascript
// Endpoint DELETE para documentos
router.delete('/:id/documents/:documentId', async (req, res) => {
  const result = await responsibleService.deleteDocument(
    req.params.id,
    req.params.documentId,
    req.user.id
  );
  res.json(result);
});

// Service: Deletar documento
async deleteDocument(responsibleId, documentId, userId) {
  // Verificar permissões
  // Deletar documento
  await this.pool.query('DELETE FROM responsible_documents WHERE id = $1 AND responsible_id = $2', [documentId, responsibleId]);
}
```

---

### **🎨 UI/UX:**

#### **Exibir Documento Existente:**
```jsx
{!documents.cnh && existingDocuments.cnh && (
  <div className={styles['existing-document']}>
    <Icon icon="mdi:check-circle" style={{ color: '#28a745' }} />
    <span>
      Documento já enviado: <strong>{existingDocuments.cnh.file_name}</strong>
      <small>Enviado em {new Date(existingDocuments.cnh.uploaded_at).toLocaleDateString('pt-BR')}</small>
    </span>
  </div>
)}

<label htmlFor="doc-cnh">
  <Icon icon={documents.cnh ? "mdi:file-check" : existingDocuments.cnh ? "mdi:file-replace" : "mdi:cloud-upload"} />
  {documents.cnh ? (
    'Aguardando envio (substituirá o existente)'
  ) : existingDocuments.cnh ? (
    'Substituir documento'
  ) : (
    'Selecionar arquivo'
  )}
</label>
```

---

### **📚 DOCUMENTAÇÃO DE REFERÊNCIA:**

- **Guia Completo:** `docs/responsibles/CORRECAO_DOCUMENTOS_EDICAO_21JAN2026.md`
- **Arquivos Modificados:**
  - `frontend/src/components/responsibles/ResponsibleFinalizationForm.jsx`
  - `backend/services/ResponsibleService.js`
  - `backend/routes/responsibles.js`
  - `frontend/src/theme/responsibles-form.module.scss`

---

### **🧪 TESTE OBRIGATÓRIO:**

```bash
# 1. Criar responsável e enviar CNH (doc1.jpg)
# 2. Editar responsável
# 3. Verificar: Aparece "Documento já enviado: doc1.jpg"?
# 4. NÃO reenviar documento, apenas salvar
# 5. Verificar: Salvou sem erro?
# 6. Editar novamente e enviar doc2.jpg
# 7. Verificar no banco:
SELECT COUNT(*) FROM responsible_documents WHERE responsible_id = X AND document_type = 'CNH';
# Resultado esperado: 1 (apenas doc2.jpg)
```

---

**Data de Criação:** 21 de Janeiro de 2026  
**Autor:** Assistente AI  
**Revisado por:** Talles Carrelo  
**Status:** ✅ Implementado e documentado

---

## 🔐 **17. AUTENTICAÇÃO HTTP - BEARER TOKEN OBRIGATÓRIO**

### **🛑 REGRA ABSOLUTA:**
**TODA requisição HTTP autenticada DEVE incluir o token Bearer no header Authorization!**

---

### **❌ PROBLEMA FREQUENTE:**

Requisições sem token de autenticação resultando em erro **401 Unauthorized**:

```javascript
// ❌ ERRADO - Sem token!
const response = await fetch(`${API_URL}/api/products/${id}/managers/${managerId}`, {
  method: 'DELETE'
  // ❌ Falta headers com Authorization!
});
```

**Resultado:** `Error 401: Token de acesso requerido`

---

### **✅ PADRÃO OBRIGATÓRIO PARA TODAS AS REQUISIÇÕES AUTENTICADAS:**

```javascript
// ✅ CORRETO - Com token Bearer
const token = localStorage.getItem('auth_token');
if (!token) {
  throw new Error('Token de acesso requerido');
}

const response = await fetch(`${API_URL}/api/endpoint`, {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: method !== 'GET' ? JSON.stringify(data) : undefined
});
```

---

### **📋 CHECKLIST OBRIGATÓRIO PARA REQUISIÇÕES HTTP:**

Antes de fazer **QUALQUER** requisição autenticada, verifique:

- [ ] **1. Token recuperado?** → `localStorage.getItem('auth_token')`
- [ ] **2. Token validado?** → `if (!token) throw new Error(...)`
- [ ] **3. Header Authorization?** → `'Authorization': 'Bearer ${token}'`
- [ ] **4. Header Content-Type?** → `'Content-Type': 'application/json'` (se enviar body)
- [ ] **5. Método HTTP correto?** → GET, POST, PUT, DELETE, PATCH
- [ ] **6. Body incluído?** → Apenas se não for GET

---

### **🎯 QUANDO APLICAR:**

Use **SEMPRE** este padrão para:

- ✅ **GET** de dados privados (usuário, produtos, vendas, etc.)
- ✅ **POST** para criar registros (produtos, responsáveis, etc.)
- ✅ **PUT/PATCH** para atualizar registros
- ✅ **DELETE** para remover registros

**Exceções:** Apenas endpoints públicos (login, registro, checkout público)

---

### **📚 EXEMPLOS PRÁTICOS:**

#### **1. DELETE (Remover Gerente):**
```javascript
const executeDelete = async () => {
  const token = localStorage.getItem('auth_token');
  if (!token) throw new Error('Token de acesso requerido');

  const response = await fetch(`${API_URL}/api/products/${productId}/managers/${managerId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  
  const data = await response.json();
  if (!data.success) throw new Error(data.message);
};
```

#### **2. POST (Criar Produto):**
```javascript
const createProduct = async (productData) => {
  const token = localStorage.getItem('auth_token');
  if (!token) throw new Error('Token de acesso requerido');

  const response = await fetch(`${API_URL}/api/products`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(productData)
  });
  
  return await response.json();
};
```

#### **3. PUT (Atualizar Responsável):**
```javascript
const updateResponsible = async (responsibleId, data) => {
  const token = localStorage.getItem('auth_token');
  if (!token) throw new Error('Token de acesso requerido');

  const response = await fetch(`${API_URL}/api/responsibles/${responsibleId}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  
  return await response.json();
};
```

#### **4. GET (Buscar Vendas):**
```javascript
const fetchSales = async () => {
  const token = localStorage.getItem('auth_token');
  if (!token) throw new Error('Token de acesso requerido');

  const response = await fetch(`${API_URL}/api/sales`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  
  return await response.json();
};
```

---

### **🐛 COMO IDENTIFICAR O PROBLEMA:**

#### **Sinais de que falta o token:**
- ❌ Erro **401 Unauthorized**
- ❌ Mensagem: "Token de acesso requerido"
- ❌ Mensagem: "Authentication failed"
- ❌ Backend retorna `{ success: false, message: "Token inválido" }`

#### **Como debugar:**
1. Abra o **DevTools** → **Network**
2. Encontre a requisição que falhou
3. Clique na requisição → **Headers**
4. Procure por **Request Headers**
5. Verifique se existe: `Authorization: Bearer eyJ...`

**Se NÃO existir:** Token não foi enviado! Aplique o padrão acima.

---

### **🚨 ERROS COMUNS E SOLUÇÕES:**

#### **1. "Token de acesso requerido"**
**Causa:** Requisição sem header Authorization  
**Solução:** Adicionar `'Authorization': 'Bearer ${token}'`

#### **2. "Token inválido ou expirado"**
**Causa:** Token expirou ou foi corrompido  
**Solução:** Fazer logout e login novamente

#### **3. "Cannot read property 'getItem' of undefined"**
**Causa:** `localStorage` não disponível (SSR, testes)  
**Solução:** Verificar se `typeof window !== 'undefined'`

#### **4. Token é null**
**Causa:** Usuário não fez login ou token foi deletado  
**Solução:** Redirecionar para `/login`

---

### **🔧 HELPER FUNCTION RECOMENDADA:**

Crie uma função auxiliar para centralizar a lógica:

```javascript
// src/utils/api.js
export const fetchWithAuth = async (endpoint, options = {}) => {
  const token = localStorage.getItem('auth_token');
  if (!token) {
    throw new Error('Token de acesso requerido');
  }

  const config = {
    ...options,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      ...options.headers
    }
  };

  const response = await fetch(`${API_URL}${endpoint}`, config);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Erro na requisição');
  }

  return data;
};

// Uso:
const deleteManager = async (productId, managerId) => {
  return await fetchWithAuth(`/api/products/${productId}/managers/${managerId}`, {
    method: 'DELETE'
  });
};
```

---

### **📚 DOCUMENTAÇÃO DE REFERÊNCIA:**

- **Correção Aplicada:** `docs/correcoes/CORRECAO_AUTH_TOKEN_DELETE_MANAGER_22JAN2026.md`
- **Arquivo Corrigido:** `frontend/src/components/products/ViewProductV2.jsx` (linha 980)
- **Backend API:** Todos os endpoints autenticados verificam token via middleware

---

### **🧪 TESTE OBRIGATÓRIO:**

Após implementar qualquer requisição autenticada:

```bash
# 1. Faça login no sistema
# 2. Execute a ação (ex: remover gerente)
# 3. Abra DevTools → Network
# 4. Verifique a requisição:
#    - Status: 200 (não 401)
#    - Request Headers: Authorization: Bearer eyJ...
# 5. Se erro 401: Verificar se token foi enviado
```

---

### **✅ RESULTADO ESPERADO:**

Após aplicar o padrão:
- ✅ Status **200 OK** (não 401)
- ✅ Header `Authorization: Bearer eyJ...` presente
- ✅ Requisição processada com sucesso
- ✅ Dados retornados corretamente

---

**Data de Criação:** 22 de Janeiro de 2026  
**Última Atualização:** 22 de Janeiro de 2026 - 05:00 UTC  
**Autor:** Assistente AI  
**Revisado por:** Talles Carrelo  
**Status:** ✅ Implementado e documentado

---

## 🌐 **18. SERVER BINDING - 0.0.0.0 VS 127.0.0.1 (REGRA CRÍTICA)**

### **🛑 REGRA ABSOLUTA:**
**SEMPRE usar `0.0.0.0` para binding do servidor em produção! NUNCA usar `127.0.0.1` pois bloqueia conexões externas!**

---

### **🎯 DIFERENÇA CRÍTICA:**

#### **`127.0.0.1` (localhost)**
- ✅ **Aceita:** Apenas conexões **locais** (dentro da máquina/container)
- ❌ **Rejeita:** Conexões **externas** (internet, proxies, load balancers)
- 🎯 **Uso:** Desenvolvimento local (macOS, Linux, Windows)

#### **`0.0.0.0` (todas as interfaces)**
- ✅ **Aceita:** Conexões de **qualquer origem** (local + externo)
- ✅ **Permite:** Proxies, load balancers, Railway, Heroku, Docker
- 🎯 **Uso:** Produção, staging, containers, deploy

---

### **❌ PROBLEMA REAL QUE ACONTECEU:**

#### **Situação:**
```javascript
// ❌ ERRADO (quebrou produção):
app.listen(port, '127.0.0.1', () => {
  console.log('Servidor rodando...');
});
```

#### **Resultado:**
- ✅ **Local:** Funcionou perfeitamente
- ❌ **Railway/Produção:** **502 Bad Gateway** (backend inacessível)
- ❌ **Health Check:** Falhou
- ❌ **CORS:** Impossível de configurar (backend não responde)

#### **Causa:**
- Railway tenta conectar **externamente** no backend
- Backend configurado com `127.0.0.1` **rejeita** conexões externas
- Railway não consegue rotear tráfego → **502 error**

---

### **✅ SOLUÇÃO OBRIGATÓRIA:**

```javascript
// ✅ CORRETO (funciona em TODOS os ambientes):
const port = process.env.PORT || 3001;
app.listen(port, '0.0.0.0', () => {
  console.log(`🚀 Servidor rodando em http://0.0.0.0:${port}`);
});
```

**Por quê funciona?**
- ✅ **Local:** `0.0.0.0` aceita localhost (você acessa via `http://localhost:3001`)
- ✅ **Produção:** Railway/Heroku conseguem rotear tráfego externo
- ✅ **Docker:** Containers podem expor portas corretamente
- ✅ **Kubernetes:** Pods acessíveis via service discovery

---

### **🚨 ERRO ESPECÍFICO DO macOS SEQUOIA:**

#### **Problema:**
```bash
# macOS Sequoia tem restrição de segurança:
Error: listen EPERM: operation not permitted 0.0.0.0:3001
```

#### **❌ SOLUÇÃO ERRADA:**
```javascript
// ❌ NÃO FAZER ISSO:
app.listen(port, '127.0.0.1', ...);  // Funciona local, quebra produção!
```

#### **✅ SOLUÇÃO CORRETA:**
```javascript
// ✅ Usar 0.0.0.0 (funciona em ambos!)
// Se der EPERM no macOS:
// 1. Verificar Firewall (Preferências do Sistema → Segurança)
// 2. Permitir Node.js nas configurações de rede
// 3. Reiniciar terminal
// 4. Se persistir: usar sudo temporariamente ou mudar porta
```

**IMPORTANTE:** `0.0.0.0` **funciona no macOS** também! O EPERM é raro e geralmente problema de firewall/permissões.

---

### **📋 CHECKLIST OBRIGATÓRIO:**

#### **✅ Antes de Commitar Código de Servidor:**
- [ ] **Binding está em `0.0.0.0`?**
- [ ] **NÃO está em `127.0.0.1`?**
- [ ] **Testei localmente que funciona?**
- [ ] **Funciona em container/docker?**

#### **✅ Ao Fazer Deploy:**
- [ ] **Backend responde em produção?**
- [ ] **Health check retorna 200?**
- [ ] **Sem 502 Bad Gateway?**
- [ ] **CORS funciona corretamente?**

---

### **🔍 COMO IDENTIFICAR O PROBLEMA:**

#### **Sintomas de Binding Incorreto:**
```bash
# ❌ Sintomas:
- Health check: 502 Bad Gateway
- Backend logs: "Servidor rodando..." (mas não responde)
- curl externo: "Application failed to respond"
- Railway status: Active (mas inacessível)
```

#### **Como Testar:**
```bash
# 1. Testar health check:
curl https://seu-backend.railway.app/health

# ❌ Se retornar 502: binding incorreto
# ✅ Se retornar 200: binding correto

# 2. Ver logs do Railway:
# Procurar por: "Servidor rodando em http://127.0.0.1"
# ❌ Se aparecer 127.0.0.1: PROBLEMA!
# ✅ Se aparecer 0.0.0.0: CORRETO!
```

---

### **📁 LOCALIZAÇÃO DO CÓDIGO:**

#### **Backend (Node.js/Express):**
```javascript
// backend/server-simple.js (linha ~23775)
const port = process.env.PORT || 3001;
const server = app.listen(port, '0.0.0.0', () => {  // ✅ SEMPRE 0.0.0.0
  console.log(`🚀 Servidor rodando em http://0.0.0.0:${port}`);
});
```

---

### **🚨 CONSEQUÊNCIAS DE VIOLAR ESTA REGRA:**

- ❌ **Login quebrado** em produção (502 error)
- ❌ **Backend inacessível** externamente
- ❌ **CORS impossível** de configurar (não há resposta)
- ❌ **Perda de tempo** debugando problema errado
- ❌ **Clientes sem acesso** ao sistema

---

### **💡 EXEMPLO DE PROBLEMA REAL:**

**Data:** 22 de Janeiro de 2026  
**Contexto:** Tentativa de resolver EPERM no macOS Sequoia  
**Erro:** Mudou de `0.0.0.0` para `127.0.0.1`  
**Resultado:**
- ✅ Local: Funcionou
- ❌ Produção: **TUDO QUEBROU** (502 em todas requisições)
- ❌ Tempo perdido: 1+ hora debugando CORS (problema era outro)

**Lição:** Sempre testar mudanças em **AMBOS** os ambientes (local + produção)!

---

### **📚 REFERÊNCIAS:**

- **Commit que quebrou:** `aa320a15` (21/01/2026)
- **Commit que corrigiu:** `0da718c` (22/01/2026)
- **Problema:** Binding `127.0.0.1` impede conexões externas
- **Solução:** Binding `0.0.0.0` aceita todas as conexões

---

### **✅ REGRA FINAL:**

**SEMPRE `0.0.0.0` NO `app.listen()`! NUNCA `127.0.0.1`!**

Se tiver problema no macOS, resolver o problema do macOS (firewall/permissões), **NÃO mudar o binding!**

---

**Data de Criação:** 22 de Janeiro de 2026 - 00:40 UTC  
**Autor:** Assistente AI  
**Revisado por:** Talles Carrelo  
**Status:** ✅ Regra crítica adicionada após problema real em produção
