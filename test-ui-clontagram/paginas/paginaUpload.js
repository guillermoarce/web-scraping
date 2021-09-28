const PaginaBase = require('./paginaBase');

const SELECTOR_CAJA_ELIGE_FOTO = 'label[class="Upload__image-label"]';
const SELECTOR_TEXT_AREA_CAPTION = 'textarea[name="caption"]';
const SELECTOR_BOTON_POST = 'button[type="submit"]';

class PaginaUpload extends PaginaBase {
    constructor( pagina) {
        super( pagina );
    }

    async verificarPaginaUploadCorrecta() {
        await this.page.waitForSelector(SELECTOR_CAJA_ELIGE_FOTO, {visible: true});
        await this.page.waitForSelector(SELECTOR_TEXT_AREA_CAPTION, {visible: true});
        await this.page.waitForSelector(SELECTOR_BOTON_POST, {visible: true});
    }
}

module.exports = PaginaUpload;