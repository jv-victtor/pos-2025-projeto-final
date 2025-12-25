# pos-2025-projeto-final
Projeto Final

Este repositório contém uma pequena API REST que replica os recursos da JSONPlaceholder (Users, ToDos, Posts, Comments, Albums, Photos) e um cliente web em React que consome a API.

## Estrutura

- `server/` - API Express simples com armazenamento em `server/db.json`.
- `client/` - App React (Vite) que consome a API e permite CRUD em todos os recursos.

## Requisitos

- Node.js 18+ e `npm`.

## Execução

1. Instalar dependências do servidor e iniciar:

```bash
cd server
npm install
npm start
```

O servidor roda por padrão em `http://localhost:3000`.

2. Em outro terminal, instalar dependências do cliente e iniciar:

```bash
cd client
npm install
npm run dev
```

Abra o endereço mostrado pelo Vite (normalmente `http://localhost:5173`). O cliente consome a API em `http://localhost:3000`.

## Notas

- A persistência é feita em `server/db.json` (arquivo JSON). É intencional para simplicidade.
- A API não exige autenticação e implementa endpoints REST básicos:
	- `GET /users`, `GET /users/:id`, `POST /users`, `PUT /users/:id`, `DELETE /users/:id`
	- Mesma estrutura para `todos`, `posts`, `comments`, `albums`, `photos`.

Se quiser que eu ajuste o cliente, adicione rotas separadas, ou troque a persistência para um banco real (SQLite), diga quais preferências você tem.
