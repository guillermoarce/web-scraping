const path = require('path');
const { LOGIN_URL, POST_EXISTENTE_URL } = require('../configuracion/url');
const { CREDENCIALES_USUARIO_LIKE } = require('../data/credenciales');
const { generarStringRandomizado } = require('../data/generadorData');
const { clickIconoCamara } = require('../paginas/barraNavegacion');
const { crearPaginaQueRequiereAutentificacion } = require('../paginas/fabricaPaginas');
// const PaginaLogin = require('../paginas/paginaLogin');
const PaginaPost = require('../paginas/paginaPost');
const TIMEOUT_INICIALIZA_BROWSER = 25000; //15 Segundos
// const CAPTION = 'fOTO DEL DIA';
const PATH_IMAGEN_A_SUBIR = path.join(__dirname, '..','data','imagen.jpg');
const RUTA_LIKES = '/likes';
const RUTA_COMENTARIOS = '/comentarios';

let contexto, paginaPost;

beforeEach( async () => {    
    contexto = await crearPaginaQueRequiereAutentificacion({url:POST_EXISTENTE_URL, credenciales:CREDENCIALES_USUARIO_LIKE,
        browserConfig: {headless: false, slowMo: 10, defaultViewport: {width: 1600, height: 1000} }});
    paginaPost = new PaginaPost(contexto.page);
}, TIMEOUT_INICIALIZA_BROWSER);

afterEach( async () => {
    await contexto.browser.close();
});

describe('Vista Post de Clontagram', () => {
    //Estado: este test depende de ue el post al qe naveguemos no tenga un like
    test('Puedo dar y quitar un like', async () => {
        //1. Hace login, se encuentra en beforeEach
        // await paginaLogin.llenarFormularioLogin(
        //     CREDENCIALES_USUARIO_LIKE
        // );

        // await paginaLogin.clickLogin();
        
        // //esperar hasta que se tiene una respuesta al browser de la ruta /api/usuarios/login
        // await contexto.page.waitForResponse((response) => {
        //     return response.url().includes('/api/usuarios/login');
        // })

        // //2. ir a una pagina de un post en especifico
        // await contexto.page.goto(POST_EXISTENTE_URL, {
        //     waitUntil: 'networkidle0',
        //     timeout: TIMEOUT_INICIALIZA_BROWSER,
        // });

        // const paginaPost = new PaginaPost(contexto.page);

        //3. Damos like, verificamos que corazon es rojo
        await Promise.all([
            vertificarQueLlegaRespuestaDeRuta(RUTA_LIKES),
            paginaPost.clickLike(),
        ])

        let corazonEstaLleno = await paginaPost.verificarCorazonLleno();
        expect(corazonEstaLleno).toEqual(true);

        //4. Quitamos like, verificamos corazon no es rojo   
        await Promise.all([
            vertificarQueLlegaRespuestaDeRuta(RUTA_LIKES),
            paginaPost.clickLike(),
        ])

        corazonEstaLleno = await paginaPost.verificarCorazonLleno();
        expect(corazonEstaLleno).toEqual(false);


    }, TIMEOUT_INICIALIZA_BROWSER);

    test('Puedo dejar un comentario en un post', async () => {
        //1. Navegar al post
        // se realiza con el beforeEach
        const randomString = generarStringRandomizado();
        //2. Dejar un comentario
        // Primero se escucha y luego se realiza la acción
        await Promise.all([
            vertificarQueLlegaRespuestaDeRuta(RUTA_COMENTARIOS),
            paginaPost.dejarComentario(randomString),
        ]);

        //3. Vertificar que comentario aparece 
        const textoUltimoComentario = await paginaPost.obtenerTextoUltimoComentario();
        expect(textoUltimoComentario).toEqual(`${CREDENCIALES_USUARIO_LIKE.username} ${randomString}`);
    });
});

//funcion que espera respuesta del servicio api indicado en ruta
async function vertificarQueLlegaRespuestaDeRuta( ruta ) {
        //esperar a la respuesta del servidor, /like 
        await contexto.page.waitForResponse((response) => {
            return response.url().includes(ruta);
        });
    }

// //funcion que espera respuesta del servicio api /likes
// async function esperarAQueLlegueRespuestaLike() {
//     //esperar a la respuesta del servidor, /like 
//     await contexto.page.waitForResponse((response) => {
//         return response.url().includes('/likes');
//     });
// }

// //funcion que espera respuesta del servicio api /comentarios
// async function verificarServidorGraboComentario() {
//     //esperar a la respuesta del servidor, /like 
//     await contexto.page.waitForResponse((response) => {
//         return response.url().includes('/comentarios');
//     });
// }