const puppeteer = require('puppeteer');

const {SIGNUP_URL} = require('./configuracion/url');

const { generarUsuario } = require('./generadorData');
const PaginaSignup = require('./paginas/paginaSignup');

async function completarSignUp() {
    const browser = await puppeteer.launch({
        headless: false
    });
    const page = await browser.newPage();
    // Usamos la propiedad 'networkidle0' para esperar a que no hayan requests en vuela por 500 ms
    await page.goto(SIGNUP_URL,{
        timeout: 15000, // 15 segundos
        waitUntil: 'networkidle0' //espera hasta terminar de cargar todos los componentes
    });

    /**
     * Optimizado en clase paginas/paginaSignup
     */
    // const inputEmail = await page.$('form > input[name="email"]');
    // const inputNombre = await page.$('form > input[name="nombre"]');
    // const inputUsername = await page.$('form > input[name="username"]');
    // const inputBio = await page.$('form > input[name="bio"]');
    // const inputPassword = await page.$('form > input[name="password"]');

    //escribe texto en input
    // await inputEmail.type('garce@gmail.com');
    // await inputNombre.type('Guillermo Arce');
    // await inputUsername.type('garce');
    // await inputBio.type('Prueba de webscraping');
    // await inputPassword.type('mipassword');

    /**
     * Generacion de data de funcion random
     */
    const usuario = generarUsuario();
    /**
     * Optimizado en clase paginas/paginaSignup
     */
    // await inputEmail.type(usuario.email);
    // await inputNombre.type(usuario.nombre);
    // await inputUsername.type(usuario.username);
    // await inputBio.type(usuario.bio);
    // await inputPassword.type(usuario.password);

    /**
     * Optimizado en clase paginas/paginaSignup
     */
    //selección de botón signup de formulario
    // const buttonSignUp = await page.$('form > button[type="submit"]');
    // await buttonSignUp.click();

    const paginaSignup = new PaginaSignup(page);
    await paginaSignup.llenadoFormularioSignup(usuario);
    await paginaSignup.clickSignup();
}

completarSignUp();