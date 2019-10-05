const { crearFile } = require('../multiplicar/multiplicar');
let base = "1"
crearFile(base)
    .then(file => console.log(`Archivo creado ${file}`))
    .catch(e => console.log(e))