const express = require('express');
const fs = require('node:fs');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
require('dotenv').config();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // Importante garantir que o JSON do body seja interpretado

//Conexão com o Banco de Dados
const connection = require('./database/database')
connection.authenticate()
    .then(() => {
        console.log("Conexão feita com o banco de dados")
    })

const Item = require('./item/item.model')

const itemRouter = require('./item/item.routes');
const { fetchExternalData } = require('./item/item.controller');
app.use('/', itemRouter)


// Rota de teste GET
app.get('/', async (req, res) => {
    res.send("Rota Principal!")
});

app.post('/update-list', (req, res) => {
    res.json({msg: "Rota ainda não configurada"})
})

app.post('/list-item', (req, res) => {
    async function listItems() {
        try {
            const itemLog = await Item.findAll();
            res.json(itemLog.map(item => item.toJSON()))
        } catch(error) {
            res.json({msg: ("Erro ao buscar itens: " + error).toString()})
        }
    }
    listItems()
})

//setInterval(fetchExternalData, 50000);

// Middleware para capturar rotas não encontradas
app.all('*', (req, res) => {
    res.status(404).json({ erro: 'Rota não encontrada' });
});

// Iniciando o servidor
app.listen(3000, () => console.log(`Servidor rodando na porta 3000`));
