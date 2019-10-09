const express = require('express');
const router = express.Router();

const ciudadX = require('../ciudad/ciudad')

router.get('/ciudades', ciudadX.dataCiudad);

module.exports = router;