const { LOGIN_URL } = require('../configuracion/url');
const { crearPagina } = require('../paginas/fabricaPaginas');
const PaginaLogin = require('../paginas/paginaLogin');
const { CREDENCIALES_VALIDAS, CREDENCIALES_EMAIL_NO_EXISTE, CREDENCIALES_PASSWORD_INCORRECTO, CREDENCIALES_NO_SIGUE_A_NADIE_NO_HA_SUBIDO_FOTOS } = require('../data/credenciales');

let contexto, paginaLogin;

beforeEach(async () => {
    // contexto = await crearPagina({ url: LOGIN_URL, browserConfig: { headless: false, slowMo: 100 } });
    contexto = await crearPagina({ url: LOGIN_URL });

    paginaLogin = new PaginaLogin(contexto.page);
}, __TIMEOUT_INICIALIZAR_BROWSER__);

afterEach(async () => {
    await contexto.browser.close();
});

describe('Login de clontagram', () => {
    test('Debe llevar al usuario al feed luego de ingresar con credenciales validas', async () => {
        await paginaLogin.llenarFormularioLogin({ email: CREDENCIALES_NO_SIGUE_A_NADIE_NO_HA_SUBIDO_FOTOS.email, password: CREDENCIALES_NO_SIGUE_A_NADIE_NO_HA_SUBIDO_FOTOS.password });
        const paginaFeed = await paginaLogin.clickLogin();
        await paginaFeed.verificarFeedVacioSugiereExplorarClontagram();
    }, __TIMEOUT_INICIALIZAR_BROWSER__);

    test('Debe mostrar un error cuando email no existe', async () => {
        await paginaLogin.llenarFormularioLogin({ email: CREDENCIALES_EMAIL_NO_EXISTE.email, password: CREDENCIALES_EMAIL_NO_EXISTE.password });
        await paginaLogin.clickLogin();
        await paginaLogin.verificarErrorEsMostrado();
    }, __TIMEOUT_INICIALIZAR_BROWSER__);

    test('Debe mostrar un error cuando contraseña es incorrecta', async () => {
        await paginaLogin.llenarFormularioLogin({ email: CREDENCIALES_PASSWORD_INCORRECTO.email, password: CREDENCIALES_PASSWORD_INCORRECTO.password });
        await paginaLogin.clickLogin();
        await paginaLogin.verificarErrorEsMostrado();

    }, __TIMEOUT_INICIALIZAR_BROWSER__);
});
