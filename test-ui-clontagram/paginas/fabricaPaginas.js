const puppeteer = require('puppeteer');
const { LOGIN_URL } = require('../configuracion/url');
const obtenerTokenYDataAutenticacion = require('../auth/autenticacion');

async function crearPagina ({
    url, 
    browserConfig = {headless: true},
    paginaConfig = {
        timeout: 15000, // 15 segundos
        waitUntil: 'networkidle0' //espera hasta terminar de cargar todos los componentes
    }
}) {
    const browser = await puppeteer.launch(browserConfig);
    const page = await browser.newPage();

    await page.goto(url, paginaConfig);

    return { browser, page}
}


async function crearPaginaQueRequiereAutentificacion ({
    url, 
    credenciales,
    browserConfig = {headless: true},
    paginaConfig = {
        timeout: 15000, // 15 segundos
        waitUntil: 'networkidle0' //espera hasta terminar de cargar todos los componentes
    }
}) {
    const browser = await puppeteer.launch(browserConfig);
    const page = await browser.newPage();

    await page.goto(LOGIN_URL, paginaConfig);

    const dataAutenticacion = await obtenerTokenYDataAutenticacion(credenciales);
    //evaluate, se encuentra dentro del contexto del token, es decir, en el navegador de levanta o crea puppeteer
    await page.evaluate( (token) => {
        localStorage.setItem('CLONTAGRAM_TOKEN', token);
    }, dataAutenticacion.token);

    await page.goto(url, paginaConfig);

    return { browser, page}
}



module.exports = {
    crearPagina,
    crearPaginaQueRequiereAutentificacion
}