# 📦 Project Database API

## 📝 Sobre o Projeto
Esta API foi desenvolvida utilizando **Node.js** e **Sequelize** para gerenciar listagens de itens. Cada listagem (**Listing**) contém um objeto **Item**, armazenado como JSON, mas com validação para garantir sua estrutura correta.

## 🚀 Tecnologias Utilizadas
- **Node.js**
- **Express.js**
- **Sequelize** (ORM para MySQL)
- **MySQL**

## 📂 Estrutura do Projeto
```
project-database-api/
│── config/
│   ├── database.js  # Configuração do Sequelize
│── models/
│   ├── Listing.js  # Modelo Listing com validação JSON
│── routes/
│   ├── listingRoutes.js  # Rotas para CRUD de Listings
│── utils/
│   ├── fetchApi.js  # Função para consumir a API
│── index.js  # Arquivo principal do servidor
│── package.json  # Dependências do projeto
```

## 🏗️ Configuração e Instalação
1. **Clone o repositório:**
```sh
  git clone https://github.com/seu-usuario/project-database-api.git
  cd project-database-api
```

2. **Instale as dependências:**
```sh
  npm install
```

3. **Configure o banco de dados:**
   - Crie um banco MySQL e configure as credenciais em `config/database.js`.
   
4. **Execute as migrações:**
```sh
  npx sequelize db:migrate
```

5. **Inicie o servidor:**
```sh
  npm start
```
O servidor será iniciado em `http://localhost:3000`.

## 🔗 Rotas da API

### 🔍 Criar uma nova listagem
```http
POST /listings
```
**Body (JSON):**
```json
{
  "title": "Oferta Especial",
  "price": 99.99,
  "item": {
    "name": "Espada Lendária",
    "rarity": "Épico",
    "damage": 50
  }
}
```

### 📜 Listar todas as listagens
```http
GET /listings
```

### 🔎 Obter uma listagem por ID
```http
GET /listings/:id
```

### ✏️ Atualizar uma listagem
```http
PUT /listings/:id
```

### ❌ Deletar uma listagem
```http
DELETE /listings/:id
```

## 🛠️ Validação de `item`
O objeto `item` deve sempre seguir a estrutura abaixo:
```json
{
  "name": "string",
  "rarity": "string",
  "damage": "number"
}
```
Se a estrutura for diferente, a API retornará um erro.

## 📜 Licença
Este projeto está sob a licença MIT. Sinta-se à vontade para usá-lo e modificá-lo.

---
💡 **Dúvidas ou sugestões?** Fique à vontade para abrir uma issue no repositório! 🚀

