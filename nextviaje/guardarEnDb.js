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



exports.guardarCasas = async (casas) => {
    for (const casa of casas) {
        try {
            await new Casa(casa).save()
        } catch (error) {
            console.log(`Problema guardando casas con el titulo ${titulo}`, error);
        }
    }
}