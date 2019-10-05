console.log('Inicio de programa');

setTimeout(function () { console.log('Primer timeOut') }, 3000);

setTimeout(function () { console.log("Segundo timeOut"), 0 });

setTimeout(function () { console.log("Tercer timeOut") }, 0);

console.log('Fin del programa');