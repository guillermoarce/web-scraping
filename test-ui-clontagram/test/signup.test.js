// const puppeteer = require('puppeteer');
const { SIGNUP_URL } = require('../configuracion/url');
const PaginaSignup = require('../paginas/paginaSignup');
const { generarUsuario } = require('../data/generadorData');
const { crearPagina } = require('../paginas/fabricaPaginas');
const TIMEOUT_INICIALIZA_BROWSER = 15000; //15 Segundos

const USUARIO_CON_EMAIL_YA_REGISTRADO = {
    ...generarUsuario(),
    email: 'garce@gmail.com'
}

const USUARIO_CON_USUARIO_YA_REGISTRADO = {
    ...generarUsuario(),
    username: 'garce'
}

// let browser, page, paginaSignup;
let contexto, paginaSignup;

beforeEach( async () => {    
    // browser = await puppeteer.launch({headless: false});
    // page = await browser.newPage();

    // await page.goto(SIGNUP_URL,{
    //     timeout: 15000, // 15 segundos
    //     waitUntil: 'networkidle0' //espera hasta terminar de cargar todos los componentes
    // });

    //Centraliza la creación de paginas, optimizacion codigo arriba
    contexto = await crearPagina({url:SIGNUP_URL });

    paginaSignup = new PaginaSignup(contexto.page);


}, TIMEOUT_INICIALIZA_BROWSER);

afterEach( async () => {
    await contexto.browser.close();
});

describe('Signup de clontagram', () => {

    test('Debe llevar el usuario al feed luego hacer signup', async () => {                

        const usuario = generarUsuario();
        await paginaSignup.llenadoFormularioSignup(usuario);
        const paginaFeed = await paginaSignup.clickSignup();

        //llamado a funcion que verifica llamado a carga paginaFeed
        await paginaFeed.verificarFeedVacioSugiereExplorarClontagram();
        
    }, TIMEOUT_INICIALIZA_BROWSER); //tiempo de espera antes de dar por falla el test

    test ('Debe mostrar un error cuando el email ya está registrado', async () => {
        await paginaSignup.llenadoFormularioSignup(USUARIO_CON_EMAIL_YA_REGISTRADO);
        await paginaSignup.clickSignup();
        await paginaSignup.verificarErrorEsMostrado();
    }, TIMEOUT_INICIALIZA_BROWSER); //tiempo de espera antes de dar por falla el test

    test ('Debe mostrar un error cuando el username ya está registrado', async () => {
        await paginaSignup.llenadoFormularioSignup(USUARIO_CON_USUARIO_YA_REGISTRADO);
        await paginaSignup.clickSignup();
        await paginaSignup.verificarErrorEsMostrado();
    }, TIMEOUT_INICIALIZA_BROWSER); //tiempo de espera antes de dar por falla el test
});