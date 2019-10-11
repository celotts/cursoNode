const express = require('express');
const router = express.Router();

const ciudadController = require('../ciudad/ciudad')

router.get('/ciudades', ciudadController.dataCiudad);

module.exports = router;