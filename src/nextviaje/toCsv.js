const fs = require('fs');
const path = require('path');
const { Parser } = require('json2csv');

const casas = JSON.parse(fs.readFileSync(path.join(__dirname,'./casas.json')));

const campos = [
    'titulo', 
    'ubicacion', 
    'precio',
    'numeroDeEstrellas',
    'numeroDeOpiniones',
    'url',
    {
        label: 'baños',
        value: (row, campo) => {
            return row['comodidades']['baños'] || campo.default;
        },
        default: null
    },
    {
        label: 'habitaciones',
        value: (row, campo) => {
            return row['comodidades']['habitaciones'] || campo.default;
        },
        default: null
    },
    {
        label: 'camas',
        value: (row, campo) => {
            return row['comodidades']['camas'] || campo.default;
        },
        default: null
    }
];
const json2csvParser = new Parser({ fields: campos, delimiter: ';' });
const csv = json2csvParser.parse(casas);

fs.writeFileSync(path.join(__dirname, 'casas.csv'), csv);