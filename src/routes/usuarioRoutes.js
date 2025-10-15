const { Router } = require('express');
const { getUsuarios, getUsuarioPorId, addUsuario, updateUsuario, deleteUsuario } = require("../controllers/usuarioController");

const rotasUsuarios = Router();

rotasUsuarios.route('/users')
    .get(getUsuarios)
    .post(addUsuario)
    .put(updateUsuario);

rotasUsuarios.route('/users/:id')
    .get(getUsuarioPorId)
    .delete(deleteUsuario);

module.exports = { rotasUsuarios };