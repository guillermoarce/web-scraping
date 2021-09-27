const SELECTOR_EXPLORA_CLONTAGRAM_BOX = "div[class='NoSiguesANadie']";

class PaginaFeed {
    constructor(pagina) {
        this.page = pagina;
    }

    async verificarFeedVacioSugiereExplorarClontagram(){
        // busqueda del elemento
        await this.page.waitForSelector(SELECTOR_EXPLORA_CLONTAGRAM_BOX, {
            visible: true
        });
    }
}

module.exports = PaginaFeed;