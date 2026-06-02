const express = require('express');
const router = express.Router();
const EstacionamentoController = require('../controllers/Controller');

// Opa, aqui é o pedro, abaixo temos a definição dos endpoints do CRUD ^^

router.post('/estacionamentos', EstacionamentoController.cadastrar);
router.get('/estacionamentos', EstacionamentoController.listar);
router.get('/estacionamentos/:id', EstacionamentoController.buscarPorId);
router.put('/estacionamentos/:id', EstacionamentoController.editar);
router.delete('/estacionamentos/:id', EstacionamentoController.deletar);
router.post('/usuarios/cadastro', EstacionamentoController.cadastrarUsuario);
router.post('/usuarios/login', EstacionamentoController.loginUsuario);

module.exports = router;