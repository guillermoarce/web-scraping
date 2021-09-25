const mongoose = require('mongoose');

const CasaSchema = new mongoose.Schema({
    imagenes: [{type: String}],
    titulo: {type: String},
    ubicacion: {type: String},
    precio: {type: Number},
    comodidades: {habitaciones: Number, camas: Number, baños: Number},
    servicios: [{type: String}],
    numeroDeEstrellas: Number,
    numeroDeOpiniones: Number,
    url: String
});

module.exports = mongoose.model("Casa", CasaSchema);