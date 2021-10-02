const puppeteer = require('puppeteer');

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



module.exports = {
    crearPagina
}