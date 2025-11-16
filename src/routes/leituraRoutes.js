const { Router } = require('express');
const { verificaJWT } = require("../controllers/usuarioController");
const { getLeituras, getLeituraPorId, addLeitura, updateLeitura, deleteLeitura } = require("../controllers/leituraController");

const rotasLeituras = Router();

rotasLeituras.route('/readings')
    .get(getLeituras)
    .post(verificaJWT, addLeitura)
    .put(verificaJWT, updateLeitura);

rotasLeituras.route('/readings/:id')
    .get(verificaJWT, getLeituraPorId)
    .delete(verificaJWT, deleteLeitura);

module.exports = { rotasLeituras };