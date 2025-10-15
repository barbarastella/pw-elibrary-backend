const { Router } = require('express');
const { getGeneros, getGeneroPorId, addGenero, updateGenero, deleteGenero } = require("../controllers/generoController");

const rotasGeneros = Router();

rotasGeneros.route('/genres')
    .get(getGeneros)
    .post(addGenero)
    .put(updateGenero);

rotasGeneros.route('/genres/:id')
    .get(getGeneroPorId)
    .delete(deleteGenero);

module.exports = { rotasGeneros };