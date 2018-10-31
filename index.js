
const letras = require('./numerosaletras');
const casual = require('casual');
const axios = require('axios');
const key = require('./conf/conf');
const url = `http://data.fixer.io/api/latest?access_key=${key.key}&symbols=EUR,USD,MXN`;

axios.get(url)
    .then(response => {
        const moneda = casual.boolean;
        if (moneda == true) {
            console.log('De USD a MXN');
            const dolar = Math.round(casual.double(from = 1, to = 2500) * 100) / 100;
            console.log(`Valor en dólares: ${dolar}`);
            const cambio = response.data.rates;
            const value = Math.round(((dolar / cambio.USD) * cambio.MXN) * 100) / 100;
            console.log(`Valor en pesos: ${value}`);
            resolver();
            console.log('Convirtiendo a letras...');

            async function resolver() {
                const result = await letras.convertir(value);
                console.log(`${dolar}USD => ${value}MXN (${result})`);
            }
        } else {
            console.log('De MXN a USD');
            const peso = Math.round(casual.double(from = 1, to = 50000) * 100) / 100;
            console.log(`Valor en pesos: ${peso}`);
            const cambio = response.data.rates;
            const value = Math.round(((peso / cambio.MXN) * cambio.USD) * 100) / 100;
            console.log(`Valor en dólares: ${value}`);
            resolver();
            console.log('Convirtiendo a letras...');

            async function resolver() {
                const result = await letras.convertir(peso);
                console.log(`${peso}MXN(${result}) => ${value}USD`);
            }
        }
    })
    .catch(function (error) {
        console.log(error);
    });
