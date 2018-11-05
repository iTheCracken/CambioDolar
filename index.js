
const letras = require('./numerosaletras');
const casual = require('casual');
const axios = require('axios');
const key = require('./config/config');
const url = `http://data.fixer.io/api/latest?access_key=${key.key}&symbols=EUR,USD,MXN`;

axios.get(url)
    .then(response => {
        const moneda = casual.boolean;
        if (moneda == true) {

            resolver();

            async function resolver() {
                console.log('De USD a MXN');
                const dolar = await Math.round(casual.double(from = 1, to = 2500) * 100) / 100;
                console.log(`Valor en dólares: ${dolar}`);
                const cambio = response.data.rates;
                const value = await Math.round(((dolar / cambio.USD) * cambio.MXN) * 100) / 100;
                console.log(`Valor en pesos: ${value}`);
                console.log('Convirtiendo a letras...');
                const result = await letras.convertir(value);
                console.log(`${dolar}USD => ${value}MXN (${result})`);
            }
        } else {

            resolver();

            async function resolver() {
                console.log('De MXN a USD');
                const peso = await Math.round(casual.double(from = 1, to = 50000) * 100) / 100;
                console.log(`Valor en pesos: ${peso}`);
                const cambio = response.data.rates;
                const value = await Math.round(((peso / cambio.MXN) * cambio.USD) * 100) / 100;
                console.log(`Valor en dólares: ${value}`);
                console.log('Convirtiendo a letras...');
                const result = await letras.convertir(peso);
                console.log(`${peso}MXN(${result}) => ${value}USD`);
            }
        }
    })
    .catch(function (error) {
        console.log(error);
    });
