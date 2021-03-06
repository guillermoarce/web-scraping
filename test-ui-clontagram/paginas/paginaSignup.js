const PaginaFeed = require('./paginaFeed');
const PaginaBase = require('./paginaBase');

const SELECTOR_EMAIL = 'form > input[name="email"]';
const SELECTOR_NOMBRE = 'form > input[name="nombre"]';
const SELECTOR_USERNAME = 'form > input[name="username"]';
const SELECTOR_BIO = 'form > input[name="bio"]';
const SELECTOR_PASSWORD = 'form > input[name="password"]';
const SELECTOR_BOTON_SUBMIT = 'form > button[type="submit"]';
// const SELECTOR_CAJA_ERROR = "div[class='ErrorContainer']"

class PaginaSignup extends PaginaBase {
    constructor(pagina){
        // this.page = pagina;
        //constructor de pagina base
        super(pagina);
    }

    async llenadoFormularioSignup(usuario){
        // await inputEmail.type(usuario.email);
        // await inputNombre.type(usuario.nombre);
        // await inputUsername.type(usuario.username);
        // await inputBio.type(usuario.bio);
        // await inputPassword.type(usuario.password);
        /**
         * Código optimizado, simil arriba
         */
         await this.page.type(SELECTOR_EMAIL,usuario.email);
         await this.page.type(SELECTOR_NOMBRE,usuario.nombre);
         await this.page.type(SELECTOR_USERNAME,usuario.username);
         await this.page.type(SELECTOR_BIO,usuario.bio);
         await this.page.type(SELECTOR_PASSWORD,usuario.password);
    }

    async clickSignup(){
        //selección de botón signup de formulario
        // const buttonSignUp = await this.page.$('form > button[type="submit"]');
        // await buttonSignUp.click();
        /**
         * Código optimizado, simil arriba 
         */
        await this.page.click(SELECTOR_BOTON_SUBMIT);

        return new PaginaFeed(this.page);
    }

    // async verificarErrorEsMostrado(){
    //     await this.page.waitForSelector(SELECTOR_CAJA_ERROR, {visible: true});
    // }

}

module.exports = PaginaSignup;