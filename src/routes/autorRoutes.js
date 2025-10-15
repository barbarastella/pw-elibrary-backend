const { Router } = require('express');
const { getAutores, getAutorPorId, addAutor, updateAutor, deleteAutor } = require("../controllers/autorController");

const rotasAutores = Router();

rotasAutores.route('/authors')
    .get(getAutores)
    .post(addAutor)
    .put(updateAutor);

rotasAutores.route('/authors/:id')
    .get(getAutorPorId)
    .delete(deleteAutor);

module.exports = { rotasAutores };