let getUsuarioById = (id, callback) => {

    let usuario = {
        nombre: 'Fernando',
        id
    }

    if (id === 20) {
        callback(`El usuario con id ${id}, no existen en la base de dato`);
    } else {
        callback(null, usuario);
    }


}

getUsuarioById(1, (err, usuario) => {
    if (err) {
        return console.log(err);

    }
    console.log('Usuario de base de dato ', usuario)
});