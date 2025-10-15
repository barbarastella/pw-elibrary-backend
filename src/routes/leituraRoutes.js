const { Router } = require('express');
const { getLeituras, getLeituraPorId, addLeitura, updateLeitura, deleteLeitura } = require("../controllers/leituraController");

const rotasLeituras = Router();

rotasLeituras.route('/readings')
    .get(getLeituras)
    .post(addLeitura)
    .put(updateLeitura);

rotasLeituras.route('/readings/:id')
    .get(getLeituraPorId)
    .delete(deleteLeitura);

module.exports = { rotasLeituras };