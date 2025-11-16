const { Router } = require('express');
const { verificaJWT } = require("../controllers/usuarioController");
const { getUsuarios, getUsuarioPorId, addUsuario, updateUsuario, deleteUsuario } = require("../controllers/usuarioController");

const rotasUsuarios = Router();

rotasUsuarios.route('/users')
    .get(verificaJWT, getUsuarios)
    .post(addUsuario)
    .put(verificaJWT, updateUsuario);

rotasUsuarios.route('/users/:id')
    .get(verificaJWT, getUsuarioPorId)
    .delete(verificaJWT, deleteUsuario);

module.exports = { rotasUsuarios };