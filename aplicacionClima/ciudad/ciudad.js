const request = require('request');
const redis = require('redis');
const Ciudad = require('../model/ciudad')
const axios = require('axios');
const API_KEY = '39860039f1eeda6dd272f43d61ae467d';// 'a5e036bc49458c5f7bb593e87668f9a8';

let redisCiudades = redis.createClient(6379);

const checkIfRequestFailed = () => {
    if (Math.random() < 0.1) {
        throw new Error('How unfortunate! The API Request Failed')
    }
}

let pushCiudades = async () => {
    let ciudad = []
    ciudad.push(new Ciudad('CL', 'Santiago', -70.6482700, -33.4569400));
    ciudad.push(new Ciudad('CH', 'Zurich', 8.5500000, 47.3666700));
    /* ciudad.push(new Ciudad('NZ', 'Auckland', 174.7833300, -36.8500000));
    ciudad.push(new Ciudad('AU', 'Sydney', 141.7022200, -13.4183300));
    ciudad.push(new Ciudad('UK', 'Londres', -0.118092, 51.509865));
    ciudad.push(new Ciudad('USA', 'Georgia', -83.5001800, 32.7504200)); */
    let ciudadesJSON = await redisCiudades.set('keyCiudades', JSON.stringify(ciudad));
    return ciudadesJSON;
}

let Ciudades = async () => {
    return new Promise((resolve, reject) => {
        redisCiudades.get('keyCiudades', function (err, reply) {
            resolve(reply);
        });
    })
}

let seachTemperatura = async (elementCiudad) => {
    return await axios.get(`https://api.darksky.net/forecast/${API_KEY}/${elementCiudad.latitud},${elementCiudad.longitud}`);
}

let converTime = (hora) => {
    let h = new Date(hora).getHours();
    let m = new Date(hora).getMinutes();

    h = (h < 10) ? '0' + h : h;
    m = (m < 10) ? '0' + m : m;

    let output = h + ':' + m;
    return output;
}

let concatCiudadClima = async (ciudades) => {
    let dataClima = [];
    await ciudades.forEach(async elementCiudad => {
        let dataTemp = await seachTemperatura(elementCiudad);
        await dataClima.push({
            ciudad: `(${elementCiudad.codigoCiudad}) - ${elementCiudad.nombreCiudad} `,
            latitud: elementCiudad.latitud,
            longitud: elementCiudad.longitud,
            hora: converTime(dataTemp.data.currently.time),
            temperatura: dataTemp.data.currently.temperature
        });
    });

    console.log("qqq", dataClima);
    return dataClima
}

let dataCiudad = async () => {
    pushCiudades();
    let ciudades = JSON.parse(await Ciudades());
    let ciudadClima = await concatCiudadClima(ciudades)
    return { a: 200, data: ciudadClima }
}

/* getCitiesForecast = async () => {
    let data = [];
    for (let i = 0; i < cities.length; i++) {
        let city = cities[i];
        let geospace = await this.redisRepository.hashGetAsync('cities', city.key);
        let forecastApiData = await this.forecastApi.getCityForecast(geospace);
        data.push({ name: city.key, country: city.country, ...forecastApiData });
    };
    return data;
} */

dataCiudad()
    .then(result => {
        console.log("*******************", result)
    }).catch((err) => {
        console.log(err);
    });

module.exports = {
    dataCiudad
}
