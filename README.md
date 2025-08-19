# Desafio Técnico - Sistema de Receitas

##  Funcionalidades Implementadas
- Cadastro de usuário no sistema  
- Login de usuário  
- Logoff de usuário  
- Cadastro de receitas pelo usuário  
- Pesquisa de receitas cadastradas pelo usuário  
- Edição de uma receita  
- Exclusão de uma receita  
- Impressão de uma receita  

##  Banco de Dados
O projeto utiliza **MySQL** como banco de dados. Na base do projeto estão o scripts para criação da base. O ORM utilizado é o **Prisma**, sendo pego baseado no schema fornecido usando
```sh
$ prisma db pull
```
##  Tecnologias Utilizadas
- **Backend**: Node.js + Express + TypeScript + Prisma  
- **Frontend**: Vue.js + Pinia + Axios  
- **Banco de Dados**: MySQL  
- **Documentação**: Swagger (http://localhost:3000/docs/)  
- **Containerização**: Docker + Docker Compose  
Arquitetura do backend: **Service → Controller → Route**.

##  Como Rodar o Projeto

### 🔹 Opção 1 — Usando Docker (recomendado)
Na raiz do projeto, execute:
```sh
docker-compose up -d --build
```
Isso irá iniciar **backend, frontend e banco de dados** ja com os dados automaticamente.

### 🔹 Opção 2 — Rodando manualmente
#### Backend (API)
```sh
cd receitas-api
npm install   # ou yarn install / pnpm install
npm run dev   # ou yarn dev / pnpm dev
```
A API estará disponível em:  
`http://localhost:3000`  
Swagger disponível em:  
`http://localhost:3000/docs/`

#### Frontend (Client)
Em outro terminal:
```sh
cd receitas-client
npm install   # ou yarn install / pnpm install
npm run dev   # ou yarn dev / pnpm dev
```
O client estará disponível em:  
`http://localhost:4173`

## Usuário Inicial

- **Usuário:** `a4pm`  
- **Senha:** `a4pm`

## Env
O caso usado em docker o env deve ser inserido na raiz do projeto, segue de exemplo
```sh
#myql
MYSQL_ROOT_PASSWORD=1234
MYSQL_DATABASE=teste_receitas_rg_sistemas

# api
DATABASE_URL=mysql://root:1234@mysql:3306/teste_receitas_rg_sistemas

JWT_SECRET=segredo
JWT_EXPIRES=1h
PORT=3000
NODE_ENV=production
COOKIE_DOMAIN=localhost

# front end
VITE_API_BASE_URL="http://localhost:3000"
```



