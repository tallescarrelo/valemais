# Vale+ (Vale Mais) Vantagens - Visao Geral do Projeto

## O que e o Vale+

O Vale+ e uma plataforma de beneficios por assinatura onde **clientes** pagam um plano mensal (recorrente ou avulso) e recebem um **cartao virtual de descontos** valido em uma rede de **estabelecimentos parceiros** credenciados.

## Modelo de Negocio

```
[Cliente] --paga plano--> [Vale+] <--credencia-- [Parceiro/Estabelecimento]
    |                        |                          |
    |-- recebe cartao virtual |-- gerencia plataforma    |-- oferece descontos
    |-- valida desconto       |-- cobra assinaturas      |-- recebe clientes
    |-- goza beneficios       |-- administra parceiros   |-- ganha visibilidade
```

### Fluxo de Receita
- **Assinaturas de clientes**: Plano mensal (recorrente ou avulso)
- **Credenciamento de parceiros**: Parceiros aderem a rede (modelo a definir)

### Proposta de Valor
- **Para o Cliente**: Descontos reais em estabelecimentos locais por um valor acessivel
- **Para o Parceiro**: Aumento de fluxo de clientes e visibilidade na plataforma
- **Para o Vale+**: Receita recorrente e efeito de rede (mais parceiros = mais valor para clientes)

## Tres Pilares da Plataforma

### 1. Landing Page Publica
Site institucional com todas as vantagens da plataforma, direcionando visitantes para:
- **Area de Clientes**: Beneficios + formulario de cadastro
- **Area de Parceiros**: Vantagens de ser parceiro + formulario de cadastro/contato

### 2. Dashboards (Areas Logadas)
- **Dashboard do Cliente**: Cartao virtual, status do plano, pagamentos, validacao de cupons
- **Dashboard do Parceiro**: Dados do estabelecimento, QR Code, historico de validacoes
- **Dashboard Admin**: Gestao completa da plataforma (planos, clientes, parceiros)

### 3. Sistema de Validacao (QR Code)
Mecanismo de validacao de desconto em tempo real via QR Code nos estabelecimentos.

## Concorrente de Referencia
- **Cartao de TODOS** (cartaodetodos.com.br): Modelo similar mas focado em saude. O Vale+ foca em comercio/servicos em geral.

## Stack Tecnica Definida
- **Frontend**: React + Vite + SCSS Modules (SPA)
- **Backend**: Node.js + Express + Prisma (Clean Architecture + DDD)
- **Banco**: PostgreSQL (Railway)
- **Real-time**: Socket.io (notificacoes)
- **Storage**: Cloudflare R2 (S3-compatible)
- **Email**: SendGrid (transacional)
- **Deploy**: Vercel (frontend) + Railway (backend)
- **Estrutura**: Monorepo (frontend/ e backend/ com gestao independente)

## Referencias de Design
1. **referencia_design.png**: Estilo agencia criativa - bold, moderno, contraste forte, tipografia grande
2. **referencia_rdesign2.png**: Ohio Demo26 - minimalista, muito espaco em branco, ilustracoes, laranja como accent
3. **Referencia_funcionalidade.png**: Cartao de TODOS - referencia funcional (cards de beneficios, FAQ, estatisticas, depoimentos)

### Direcao Visual Pretendida
- Design **limpo e moderno** com bastante whitespace (referencia Ohio)
- **Tipografia bold** e impactante (referencia design)
- **Secoes bem definidas** com cards de beneficios (referencia Cartao de TODOS)
- Identidade propria do Vale+ com foco nos dois elos: clientes e parceiros
