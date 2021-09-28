const PaginaUpload = require('./paginaUpload');
const SELECTOR_ICONO_CAMARA = 'nav > ul > li.Nav__link-push > a';

async function clickIconoCamara(page) {
    //1. Verificar que existe icono de camara existe
    await page.waitForSelector(SELECTOR_ICONO_CAMARA, {visible: true});
    await page.click(SELECTOR_ICONO_CAMARA);

    return new PaginaUpload(page);
}

module.exports = {
    clickIconoCamara,
  };