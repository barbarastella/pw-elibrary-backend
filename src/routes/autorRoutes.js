const { Router } = require('express');
const { verificaJWT } = require("../controllers/usuarioController");
const { getAutores, getAutorPorId, addAutor, updateAutor, deleteAutor } = require("../controllers/autorController");

const rotasAutores = Router();

rotasAutores.route('/authors')
    .get(verificaJWT, getAutores)
    .post(verificaJWT, addAutor)
    .put(verificaJWT, updateAutor);

rotasAutores.route('/authors/:id')
    .get(verificaJWT, getAutorPorId)
    .delete(verificaJWT, deleteAutor);

module.exports = { rotasAutores };