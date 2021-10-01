const PaginaBase = require('./paginaBase');
const PaginaFeed = require('./paginaFeed');

const SELECTOR_CAJA_ELIGE_FOTO = 'label[class="Upload__image-label"]';
const SELECTOR_TEXT_AREA_CAPTION = 'textarea[name="caption"]';
const SELECTOR_BOTON_POST = 'button[type="submit"]';
const SELECTOR_IMAGE_A_SUBIR = 'div[class="Upload__image-section"] > img';

class PaginaUpload extends PaginaBase {
    constructor( pagina) {
        super( pagina );
    }

    async verificarPaginaUploadCorrecta() {
        await this.page.waitForSelector(SELECTOR_CAJA_ELIGE_FOTO, {visible: true});
        await this.page.waitForSelector(SELECTOR_TEXT_AREA_CAPTION, {visible: true});
        await this.page.waitForSelector(SELECTOR_BOTON_POST, {visible: true});
    }

    async llenarCaption (caption) {
        await this.page.waitForSelector(SELECTOR_TEXT_AREA_CAPTION);
        await this.page.type(SELECTOR_TEXT_AREA_CAPTION, caption);
    }

    async elegirFotoUpload ( pathImagen ) {
        //Verificar que se encuentra disponible en la caja
        await this.page.waitForSelector(SELECTOR_CAJA_ELIGE_FOTO);
        const [fileChooser] = await Promise.all([
            this.page.waitForFileChooser(),
            this.page.click(SELECTOR_CAJA_ELIGE_FOTO),
        ]);

        //codigo para elegir foto
        await fileChooser.accept([pathImagen])
    }

    async clickPostImagen() {
        //Validar que el boton está disponible
        await this.page.waitForSelector(SELECTOR_BOTON_POST);
        await this.page.click(SELECTOR_BOTON_POST);
        //retornar pagina feed
        return new PaginaFeed(this.page);
    }

    async verificarImagenDisponibleParaPost () {
        await this.page.waitForSelector(SELECTOR_IMAGE_A_SUBIR);
    }
}

module.exports = PaginaUpload;