const { Router } = require('express');
const { getLivros, getLivroPorId, addLivro, updateLivro, deleteLivro } = require("../controllers/livroController");

const rotasLivros = Router();

rotasLivros.route('/books')
    .get(getLivros)
    .post(addLivro)
    .put(updateLivro);

rotasLivros.route('/books/:id')
    .get(getLivroPorId)
    .delete(deleteLivro);

module.exports = { rotasLivros };