const { Router } = require('express');
const { verificaJWT } = require("../controllers/usuarioController");
const { getGeneros, getGeneroPorId, addGenero, updateGenero, deleteGenero } = require("../controllers/generoController");

const rotasGeneros = Router();

rotasGeneros.route('/genres')
    .get(verificaJWT, getGeneros)
    .post(verificaJWT, addGenero)
    .put(verificaJWT, updateGenero);

rotasGeneros.route('/genres/:id')
    .get(verificaJWT, getGeneroPorId)
    .delete(verificaJWT, deleteGenero);

module.exports = { rotasGeneros };