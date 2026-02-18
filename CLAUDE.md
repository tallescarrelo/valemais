# Vale+ - Regras para o Claude

## Servidores
- Pode iniciar, reiniciar e parar o backend e o frontend sem pedir permissao.
- Backend: `cd backend && npm run dev` (porta 5050)
- Frontend: `cd frontend && npm run dev` (porta 5173)
- Sempre que for testar algo que dependa do backend rodando, inicie ele automaticamente.

## Projeto
- Monorepo com `frontend/` (React + Vite) e `backend/` (Express + Prisma)
- Database no Railway (PostgreSQL)
- Nunca commitar `.env` ou credenciais
- Valores monetarios em centavos (int) no banco, formatados no frontend
- Nunca usar URLs hardcoded - sempre importar de config
- Nunca usar dados mockados - sempre dados reais do banco
