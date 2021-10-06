const path = require('path');
const { LOGIN_URL, BASE_URL } = require('../configuracion/url');
const { CREDENCIALES_VALIDAS, CREDENCIALES_EMAIL_NO_EXISTE, CREDENCIALES_PASSWORD_INCORRECTO, CREDENCIALES_NO_SIGUE_A_NADIE_NO_HA_SUBIDO_FOTOS } = require('../data/credenciales');
const { generarStringRandomizado } = require('../data/generadorData');
const { clickIconoCamara } = require('../paginas/barraNavegacion');
const { crearPagina, crearPaginaQueRequiereAutentificacion } = require('../paginas/fabricaPaginas');
// No es necesario con la opcion optimizada
// const PaginaLogin = require('../paginas/paginaLogin');
// const CAPTION = 'fOTO DEL DIA';
const PATH_IMAGEN_A_SUBIR = path.join(__dirname, '..', 'data', 'imagen.jpg');

let contexto;

beforeEach(async () => {
    //opcion 1 de hacer las cosas   
    // contexto = await crearPagina({
    //     url:LOGIN_URL, 
    //     browserConfig: {
    //         headless: false, 
    //         slowMo: 10
    //     }
    // });

    //opcion optimizada, previamente debe estar autenticado
    contexto = await crearPaginaQueRequiereAutentificacion({
        url: BASE_URL,
        credenciales: CREDENCIALES_VALIDAS,
        browserConfig: {
            headless: false,
            slowMo: 10
        }
    });
    // no es necesario con la opcion optimizada
    // paginaLogin = new PaginaLogin(contexto.page);
}, __TIMEOUT_INICIALIZAR_BROWSER__);

afterEach(async () => {
    await contexto.browser.close();
});

describe('Upload de clontagram', () => {
    test('Hacer click en el icono de camara, debe llevar al usuario a la pagina /upload', async () => {
        // no es necesario con la opcion optimizada
        // await paginaLogin.llenarFormularioLogin(CREDENCIALES_VALIDAS);
        // await paginaLogin.clickLogin();
        const paginaUpload = await clickIconoCamara(contexto.page);
        await paginaUpload.verificarPaginaUploadCorrecta();

        //hacer click icono de la camara
    }, __TIMEOUT_INICIALIZAR_BROWSER__);

    test('Subir una imagen debe llevar al usuario al feed done su post es mostrado', async () => {
        // no es necesario con la opcion optimizada
        // await paginaLogin.llenarFormularioLogin(CREDENCIALES_VALIDAS);
        // await paginaLogin.clickLogin();
        const paginaUpload = await clickIconoCamara(contexto.page);
        // 1. poner caption
        const captionRandom = generarStringRandomizado();

        await paginaUpload.llenarCaption(captionRandom);//CAPTION);
        // 2. elegir foto
        await paginaUpload.elegirFotoUpload(PATH_IMAGEN_A_SUBIR);
        //Verficar que imagen está disponible para postear (subio al servidor)
        await paginaUpload.verificarImagenDisponibleParaPost();
        //3. Click botón post
        const paginaFeed = await paginaUpload.clickPostImagen();

        //4. Verificar que estamos en el feed
        const dataUsuario = await paginaFeed.obtenerUsuarioPrimerPost();
        expect(dataUsuario).toEqual({
            texto: CREDENCIALES_VALIDAS.username,
            href: `/perfil/${CREDENCIALES_VALIDAS.username}`,
        })

        //5. Vertificar que nuestro post que subimos esta visible
        const caption = await paginaFeed.obtenerCaptionPrimerPost();
        expect(caption).toEqual(`${CREDENCIALES_VALIDAS.username} ${captionRandom}`)
    }, __TIMEOUT_INICIALIZAR_BROWSER__);
});
