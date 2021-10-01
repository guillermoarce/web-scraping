const SELECTOR_EXPLORA_CLONTAGRAM_BOX = "div[class='NoSiguesANadie']";
const SELECTOR_CAJA_POST = 'div[class="Post-Componente"]';
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

    async obtenerUsuarioPrimerPost() {
        const primerPost = await this.page.waitForSelector(SELECTOR_CAJA_POST);
        return await primerPost.evaluate(elemento => {
            const avatar = elemento.querySelector('div[class="Avatar"] > a');
            return {
                texto: avatar.innerText,
                href: avatar.pathname
            }
        });
    }

    async obtenerCaptionPrimerPost() {
        const primerPost = await this.page.waitForSelector(SELECTOR_CAJA_POST);

        return await primerPost.evaluate((elemento) => {
            const caption = elemento.querySelector('div[class="Post-Componente__acciones"] > ul > li');
            return caption.innerText;
        })
    }
}

module.exports = PaginaFeed;