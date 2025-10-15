const { Router } = require("express");
const { rotasLivros } = require("./livroRoutes");
const { rotasGeneros } = require("./generoRoutes");
const { rotasAutores } = require("./autorRoutes");
const { rotasUsuarios } = require("./usuarioRoutes");
const { rotasLeituras } = require("./leituraRoutes");

const rotas = Router();
rotas.use(rotasLivros);
rotas.use(rotasGeneros);
rotas.use(rotasAutores);
rotas.use(rotasUsuarios);
rotas.use(rotasLeituras);

module.exports = rotas;