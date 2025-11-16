const { Router } = require('express');
const { verificaJWT } = require("../controllers/usuarioController");
const { getLivros, getLivroPorId, addLivro, updateLivro, deleteLivro } = require("../controllers/livroController");

const rotasLivros = Router();

rotasLivros.route('/books')
    .get(getLivros)
    .post(verificaJWT, addLivro)
    .put(verificaJWT, updateLivro);

rotasLivros.route('/books/:id')
    .get(getLivroPorId)
    .delete(verificaJWT, deleteLivro);

module.exports = { rotasLivros };