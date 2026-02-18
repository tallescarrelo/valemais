# Vale+ - Checklist de Desenvolvimento

## Pre-Desenvolvimento
- [ ] Definir identidade visual (logo, cores, tipografia)
- [ ] Definir gateway de pagamento
- [ ] Configurar contas (Vercel, Railway, SendGrid, Cloudflare R2)
- [ ] Configurar dominio
- [ ] Definir valor do plano MVP

## Setup
- [ ] Monorepo inicializado
- [ ] Backend rodando localmente
- [ ] Frontend rodando localmente
- [ ] Banco PostgreSQL conectado
- [ ] Schema Prisma criado e migrado
- [ ] Seed de dados de teste

## Backend - Core
- [ ] Autenticacao (register, login, refresh, forgot/reset password)
- [ ] CRUD Planos (admin)
- [ ] CRUD Clientes (admin + self-service)
- [ ] CRUD Parceiros (admin + cadastro publico + self-service)
- [ ] Assinaturas (criar, cancelar, renovar, verificar status)
- [ ] Pagamentos (criar, processar webhook, listar)
- [ ] Validacao de desconto (verificar, registrar, historico)
- [ ] QR Code (gerar para parceiro)
- [ ] Emails (boas-vindas, pagamento, reset, aprovacao parceiro)

## Frontend - Estrutura
- [ ] Design system implementado
- [ ] Componentes UI base prontos
- [ ] Sistema de rotas configurado
- [ ] Auth context funcionando
- [ ] Layouts (publico, cliente, parceiro, admin)

## Frontend - Paginas
- [ ] Landing Page completa
- [ ] Login
- [ ] Cadastro Cliente
- [ ] Checkout/Pagamento
- [ ] Cadastro Parceiro
- [ ] Esqueci Senha / Redefinir Senha
- [ ] Dashboard Cliente (cartao, plano, pagamentos, validacoes, dados)
- [ ] Dashboard Parceiro (resumo, QR code, validacoes, dados)
- [ ] Dashboard Admin (metricas, planos, clientes, parceiros, financeiro, config)
- [ ] Tela de Validacao de Desconto
- [ ] Termos de Uso
- [ ] Politica de Privacidade

## Integracoes
- [ ] Gateway de pagamento configurado e testado
- [ ] SendGrid configurado e emails funcionando
- [ ] Cloudflare R2 configurado (upload de logos)
- [ ] Socket.io para notificacoes

## Quality
- [ ] Responsivo em mobile, tablet e desktop
- [ ] Funciona nos principais browsers (Chrome, Safari, Firefox)
- [ ] Validacoes de formulario funcionando
- [ ] Tratamento de erros em todas as telas
- [ ] Loading states em todas as acoes async
- [ ] SEO basico (meta tags, og:image)

## Deploy
- [ ] Frontend na Vercel
- [ ] Backend na Railway
- [ ] PostgreSQL na Railway
- [ ] Variaveis de ambiente configuradas
- [ ] Dominio apontando
- [ ] HTTPS funcionando
- [ ] Fluxo end-to-end testado em producao

## Seguranca
- [ ] Senhas com hash bcrypt
- [ ] JWT com expiracao curta + refresh token
- [ ] Rate limiting em login e rotas publicas
- [ ] Validacao de input em todas as rotas
- [ ] CORS configurado corretamente
- [ ] Helmet configurado
- [ ] Protecao contra SQL injection (Prisma cuida)
- [ ] Protecao contra XSS (sanitizacao)
