
let getNombre = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Carlos Lott");
        }, 3000)
    })
}

let saludo = async () => {
    return nombre = await getNombre();
}

saludo().then((nombre) => {
    console.log(`Hola ${nombre}`);
})


