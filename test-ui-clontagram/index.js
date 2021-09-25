const puppeteer = require('puppeteer');
const { generarUsuario } = require('./generadorData')

async function completarSignUp() {
    const browser = await puppeteer.launch({
        headless: false
    });
    const page = await browser.newPage();
    // Usamos la propiedad 'networkidle0' para esperar a que no hayan requests en vuela por 500 ms
    await page.goto('https://beta.clontagram.com/signup',{
        timeout: 15000, // 15 segundos
        waitUntil: 'networkidle0' //espera hasta terminar de cargar todos los componentes
    });

    const inputEmail = await page.$('form > input[name="email"]');
    const inputNombre = await page.$('form > input[name="nombre"]');
    const inputUsername = await page.$('form > input[name="username"]');
    const inputBio = await page.$('form > input[name="bio"]');
    const inputPassword = await page.$('form > input[name="password"]');

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

    await inputEmail.type(usuario.email);
    await inputNombre.type(usuario.nombre);
    await inputUsername.type(usuario.username);
    await inputBio.type(usuario.bio);
    await inputPassword.type(usuario.password);

    //selección de botón signup de formulario
    const buttonSignUp = await page.$('form > button[type="submit"]');
    await buttonSignUp.click();


}

completarSignUp();