# 📦 Project CSFloat-API

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
│── src/
│   ├── database/
      ├─ database.js  # Configuração do Sequelize
│── item/
│   ├── item.controller.js  # Lógica por trás das Rotas relacionadas a Item
│   ├── item.model.js  # Modelo Item com validação JSON
│   ├── item.routes.js  # Configurações de Rotas relacionadas a Item
│── fetchApi.js
│── server.js
│── package.json  # Dependências do projeto
│── package.lock.json # # Gestão de Dependências
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
POST /listings
```

### 🔎 Atualizar o DataBase local
```http
GET /update-db
```

## 📜 Licença
Este projeto está sob a licença MIT. Sinta-se à vontade para usá-lo e modificá-lo.

---
💡 **Dúvidas ou sugestões?** Fique à vontade para abrir uma issue no repositório! 🚀

