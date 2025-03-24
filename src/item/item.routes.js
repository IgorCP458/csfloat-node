const express = require("express");
const router = express.Router();
const { updateDatabase, getItems } = require("./item.controller");

// Rota para buscar dados da API externa
router.post("/update-db", updateDatabase);

// Rota para listar todos os itens
router.post("/items", getItems);

module.exports = router;