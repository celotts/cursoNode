const fs = require('fs');

let crearFile = (base) => {
    return new Promise((resolve, reject) => {

        if (!Number(base)) {
            reject(`El valor introducido ${base} No es número`);
            return
        }
        let file = '';
        for (let i = 1; i <= 10; ++i) {
            file += `${i} * ${base} = ${base * i}\n`;
        }


        fs.writeFile(`file/tabla-${base}.txt`, file, (err) => {
            if (err) {
                reject(err)
            } else {
                resolve(`tabla-${base}`);
            }
        });
    })
}

module.exports = {
    crearFile
}