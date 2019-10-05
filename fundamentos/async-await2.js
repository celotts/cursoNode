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

let getEmpleado = async (id) => {


    let empleadoDB = await empleados.find(empleado => empleado.id === id);
    if (!empleadoDB) {
        throw new Error | (`No existe en la DB el id ${id}`)
    } else {
        return empleadoDB;
    }

}

let getSalario = async (empleado) => {
    let salarioDB = await salarios.find(salario => salario.id === empleado.id)
    if (!salarioDB) {
        throw new Error(`No existe salario para el id ${empleado.id}`)
    } else {
        return { nombre: empleado.nombre, salario: salarioDB.salario, id: empleado.id };
    }

}

let getInformacion = async (id) => {
    let empleado = await getEmpleado(id);
    let respSalario = await getSalario(empleado);
    return `${respSalario.nombre} tiene un sueldo de $ ${respSalario.salario}`
}

getInformacion(4)
    .then(mensaje => console.log(mensaje))
    .catch(e => console.log(e));