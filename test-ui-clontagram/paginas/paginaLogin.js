const PaginaFeed = require('./paginaFeed');
const PaginaBase = require('./paginaBase');

const SELECTOR_EMAIL = 'form > input[name="email"]';
const SELECTOR_PASSWORD = 'form > input[name="password"]';
const SELECTOR_BOTON_LOGIN = 'form > button[type="submit"]';


class PaginaLogin extends PaginaBase {
    constructor(pagina) {
        //this.page = pagina;
        super(pagina);
    }

    async llenarFormularioLogin({ email, password }) {
        await this.page.type(SELECTOR_EMAIL, email);
        await this.page.type(SELECTOR_PASSWORD, password );

    }

    async clickLogin() {
        await this.page.click(SELECTOR_BOTON_LOGIN);
        return new PaginaFeed(this.page);
    }
}

module.exports = PaginaLogin;