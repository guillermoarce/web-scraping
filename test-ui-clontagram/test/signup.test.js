const puppeteer = require('puppeteer');
const { SIGNUP_URL } = require('../configuracion/url');
const PaginaSignup = require('../paginas/paginaSignup');
const { generarUsuario } = require('../generadorData');

const TIMEOUT_INICIALIZA_BROWSER = 15000; //15 Segundos

let browser, page, paginaSignup;

beforeEach( async () => {
    browser = await puppeteer.launch({headless: false});
    page = await browser.newPage();

    await page.goto(SIGNUP_URL,{
        timeout: 15000, // 15 segundos
        waitUntil: 'networkidle0' //espera hasta terminar de cargar todos los componentes
    });

    paginaSignup = new PaginaSignup(page);
}, TIMEOUT_INICIALIZA_BROWSER);

afterEach( async () => {
    await browser.close();
});

describe('Signup de clontagram', () => {

    test('Debe llevar el usuario al feed luego hacer signup', async () => {                

        const usuario = generarUsuario();
        await paginaSignup.llenadoFormularioSignup(usuario);
        const paginaFeed = await paginaSignup.clickSignup();

        //llamado a funcion que verifica llamado a carga paginaFeed
        await paginaFeed.verificarFeedVacioSugiereExplorarClontagram();
        
    }, TIMEOUT_INICIALIZA_BROWSER); //tiempo de espera antes de dar por falla el test
});