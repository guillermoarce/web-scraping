require('dotenv').config();
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const { guardarCasas } = require('./guardarEnDb');

( async () => {
    const browser = await puppeteer.launch({ 
        // headless: false, 
        // slowMo: 300
    });
    const page = await browser.newPage();
    //ir a la pagina web
    await page.goto('https://nextviaje.vercel.app/');
    //obtener los links <a> que se encuentran dentro de una class (FilaCasas__cartas)
    const urls = await page.evaluate(() => 
        Array.from(document.querySelectorAll(".FilaCasas__cartas a"), (nodo) => nodo.href
        )
    );

    //console.log(urls);
    //Obtener la data de todas las url
    const casas = [];

    for (const url of urls) {
        /**
        * Visitar paginas
        */
        await page.goto(url);
        const detallesDeLaCasa = await page.evaluate( () => {    
            //obtencion de las imagenes que posee una publicación en particular
            const imagenes = [
                ...document.querySelectorAll(".CasaVista__fotos img"),
            ].map((img) => img.src);

            //obtencion del texto del titulo que se encuentra en una class
            const titulo = document.querySelector('.CasaVista__titulo').innerText;

            //obtención del texto de la ubicación que no se encuentra en una class pero está dentro de una "padre"
            const ubicacion = document.querySelector('.CasaVista__titulo + div').innerText;

            //obtencion del precio  
            const precio = Number(
                document
                    .querySelector(".CasaVista__precio")
                    .innerText.replace(/[^0-9]/g, "")
                );  
                
            //obtener listado de comodidades y transformar a clase    
            const comodidades = [
                ...document.querySelectorAll(".CasaVista__cuartos span"),
            ].reduce( (acc, comodidad) => {
                const [cantidad, nombre] = comodidad.innerText.split(" ");
                acc[nombre] = Number(cantidad);

                return acc;
            }, {});

            //obtencion de servicios
            const servicios = [
                ...document.querySelectorAll('.CasaVista__extra')
            ].map( (nodo) => nodo.innerText.toLowerCase())

            const numeroDeEstrellas = document.querySelector('.Opiniones__numero-de-estrellas').innerText;
            const numeroDeOpiniones = Number(
                document.querySelector('.Opiniones__numero-de-opiniones')
                .innerText.replace(/[^0-9]/g, "")
            );

            return {
                imagenes,
                titulo,
                ubicacion,
                precio,
                comodidades,
                servicios,
                numeroDeEstrellas,
                numeroDeOpiniones,
                url: window.location.href
            };
        });

        casas.push(detallesDeLaCasa);
        // console.log(detallesDeLaCasa);
    }    
    
    const data = JSON.stringify(casas);

    //Guarda data en archivo fisico
    fs.writeFileSync(path.join(__dirname, 'casas.json'), data);

    //Guarda data en DB
    await guardarCasas(casas);
    console.log("Proceso generado correctamente ")

    await browser.close();
    process.exit();
})();