require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const Casa = require('./casa.schema');

mongoose.connect(process.env.URL_DB,{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('error', function(error) {
    console.log("Error conectandome a mongo", error);
    process.exit(1); //el script se ejecut
});

//Aplicacion express

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", async (req, res) => {
    res.send('Todo funcionando')
})

app.get("/api/casas", async (req, res) => {
    const { 
        numeroDeEstrellas, 
        servicios, 
        comodidad, 
        numeroDeComonidad 
    } = req.query;

    const query = {};

    if (numeroDeEstrellas) {
        query.numeroDeEstrellas = Number(numeroDeEstrellas);
    }

    if (servicios) {
        const s = servicios.split(",");
        query.servicios = {$all: s};
    }

    if (comodidad && numeroDeComonidad) {
        query[`comodidades.${comodidad}`] = Number(numeroDeComonidad); 
    }

    const resultado = await Casa.find(query);


    res.send(resultado);
});


app.listen(PORT, () => {
    console.log('Escuchando en puerto', PORT);
})