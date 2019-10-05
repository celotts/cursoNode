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

let getEmpleado = (id) => {

    return new Promise((resolve, reject) => {

        let empleadoDB = empleados.find(empleado => empleado.id === id);
        if (!empleadoDB) {
            reject(`No existe en la DB el id ${id}`)
        } else {
            resolve(empleadoDB)
        }
    })
}

let getSalario = (empleado) => {
    return new Promise((resolve, reject) => {
        let salarioDB = salarios.find(salario => salario.id === empleado.id)
        if (!salarioDB) {
            reject(`No existe salario para el id ${empleado.id}`)
        } else {
            resolve(salarioDB)
        }
    });
}

getEmpleado(10).then(empleado => {
    console.log("El empleado de la db es", empleado);

    getSalario(empleado).then(resp => {
        console.log('El salario de ${empleado.nombre} es ', resp.salario);
    }, (err) => {
        console.log(err)
    })

}, (err) => {
    console.log(err);
})

