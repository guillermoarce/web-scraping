const SELECTOR_CAJA_ERROR = "div[class='ErrorContainer']"

class PaginaBase {
    constructor( pagina ) {
        this.page = pagina;
    }

    async verificarErrorEsMostrado(){
        await this.page.waitForSelector(SELECTOR_CAJA_ERROR, {visible: true});
    }
}

module.exports = PaginaBase;