let empleados = [{
    id: 1,
    nombre: "Carlos Eduardo"
}, {
    id: 2,
    nombre: "Carlos Emilio"
}, {
    id: 3,
    nombre: 'Carlos Alfredo'
}];

let salarios = [{
    id: 1,
    salario: 1000
}, {
    id: 2,
    salario: 2000
}];

let getEmpleado = (id, callback) => {

    let empleadoBD = empleados.find(empleado => empleado.id === id)

    if (!empleadoBD) {
        callback(`No existe el empleado con el id ${id}`)
    } else {
        callback(null, empleadoBD)
    }
}

let getSalario = (empleado, callback) => {

    let salarioDB = salarios.find(salario => salario.id === empleado.id)

    if (!salarioDB) {
        callback(`No se encontró un salario para el empleado ${empleado.nombre}`)
    } else {
        callback(null, { nombre: empleado.nombre, salario: salarioDB.salario, id: empleado.id });
    }
}


getEmpleado(3, (err, empleado) => {
    if (err) {
        return console.log(err);
    }


    getSalario(empleado, (err, resp) => {
        if (err) {
            return console.log(err);
        }
        console.log(`El salario  de ${resp.nombre} es de ${resp.salario} $`)
    });
});