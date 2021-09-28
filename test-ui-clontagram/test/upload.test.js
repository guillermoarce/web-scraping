const { LOGIN_URL } = require('../configuracion/url');
const { clickIconoCamara } = require('../paginas/barraNavegacion');
const { crearPagina } = require('../paginas/fabricaPaginas');
const PaginaLogin = require('../paginas/paginaLogin');
const { CREDENCIALES_VALIDAS, CREDENCIALES_EMAIL_NO_EXISTE, CREDENCIALES_PASSWORD_INCORRECTO, CREDENCIALES_NO_SIGUE_A_NADIE_NO_HA_SUBIDO_FOTOS } = require('../data/credenciales');
const TIMEOUT_INICIALIZA_BROWSER = 15000; //15 Segundos

let contexto, paginaLogin;

beforeEach( async () => {    
    contexto = await crearPagina({url:LOGIN_URL, browserConfig: {headless: false, slowMo: 50} });
    paginaLogin = new PaginaLogin(contexto.page);
}, TIMEOUT_INICIALIZA_BROWSER);

afterEach( async () => {
    await contexto.browser.close();
});

describe('Upload de clontagram', () => {
    test('Hacer click en el icono de camara, debe llevar al usuario a la pagina /upload', async () => {
        await paginaLogin.llenarFormularioLogin(CREDENCIALES_VALIDAS);
        await paginaLogin.clickLogin();
        const paginaUpload = await clickIconoCamara(contexto.page);
        await paginaUpload.verificarPaginaUploadCorrecta();

        //hacer click icono de la camara
    }, TIMEOUT_INICIALIZA_BROWSER);
});
