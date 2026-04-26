# Atividade 4 - React consumindo API REST

Projeto desenvolvido para a Atividade 4 da disciplina de Desenvolvimento Web II.

A aplicacao possui um frontend em React com TypeScript que consome uma API REST feita com Express e TypeScript. A API trabalha com tres estruturas lineares: pilha, fila e lista.

## Funcionalidades

- Navegacao entre as paginas de Pilha, Fila e Lista.
- Barra de menu fixa com estatisticas vindas da API.
- Operacoes de adicionar, remover, consultar, listar e limpar estruturas.
- Tratamento de mensagens de sucesso e erro.
- Configuracao da URL da API por variavel de ambiente.
- Execucao integrada com Docker Compose.

## Tecnologias

- Node.js
- TypeScript
- Express
- React
- Vite
- React Router DOM
- Docker
- Docker Compose

## Como Rodar Com Docker

Na raiz do projeto, execute:

```bash
docker compose up --build
```

Depois acesse:

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:3001/api`

## Como Rodar Sem Docker

Backend:

```bash
npm install
npm run dev
```

Frontend:

```bash
cd frontend
npm install
npm run dev
```

## Variaveis De Ambiente

Backend:

```env
PORT=3001
FRONTEND_ORIGIN=http://localhost:5173
```

Frontend:

```env
VITE_API_URL=http://localhost:3001/api
```

## Principais Endpoints

- `GET /api/estatisticas`
- `GET /api/pilha`
- `POST /api/pilha`
- `GET /api/pilha/topo`
- `DELETE /api/pilha`
- `DELETE /api/pilha/limpar`
- `GET /api/fila`
- `POST /api/fila`
- `GET /api/fila/frente`
- `DELETE /api/fila`
- `DELETE /api/fila/limpar`
- `GET /api/lista`
- `POST /api/lista`
- `GET /api/lista/ultimo`
- `GET /api/lista/:index`
- `DELETE /api/lista`
- `DELETE /api/lista/:index`
- `DELETE /api/lista/limpar`

## Scripts

Backend:

```bash
npm run dev
npm run build
npm start
```

Frontend:

```bash
npm run dev
npm run build
npm run preview
```

## Observacoes

- A pasta `node_modules` nao deve ser enviada para o repositorio.
- As pastas `dist` e `frontend/dist` tambem nao precisam ser versionadas.
- O arquivo `.gitignore` ja possui essas pastas configuradas.
