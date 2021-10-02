const PaginaBase = require('./paginaBase');

const SELECTOR_BOTON_LIKE = 'div[class="Post__like"] > button';
const SELECTOR_ICONO_CORAZON = `${SELECTOR_BOTON_LIKE} > svg`;

const SELECTOR_INPUT_COMENTARIO = 'form[class="Post__comentario-form-container"] > input[type="text"]';
const SELECTOR_BUTTON_POST_COMENTARIO = 'form[class="Post__comentario-form-container"] > button[type="submit"]';

const SELECTOR_ULTIMO_COMENTARIO = 'div[class="Post__comentarios-y-like"] > ul > li:last-child';

const SELECTOR_LISTA_COMENTARIOS = 'ul[class="Post__comentarios"]';
const CLASE_HACER_ROJO = 'text-red-dark';

class PaginaPost extends PaginaBase {
    constructor(page) {
        super(page);
    }

    async clickLike() {
        await this.page.waitForSelector(SELECTOR_BOTON_LIKE);
        await this.page.click(SELECTOR_BOTON_LIKE);
        // await this.pagina.waitForSelector(SELECTOR_BOTON_LIKE).click();
    }

    async verificarCorazonLleno(){
        const corazonElemento = await this.page.waitForSelector(SELECTOR_ICONO_CORAZON);
        //verificar si en la lista de elementos se tiene el elemento text-red-dark
        return corazonElemento.evaluate((elemento, CLASE_HACER_ROJO) => {
            return elemento.classList.contains(CLASE_HACER_ROJO);
        }, CLASE_HACER_ROJO);
    }

    async dejarComentario( comentario ) {
        await this.page.type(SELECTOR_INPUT_COMENTARIO, comentario);
        await this.page.click(SELECTOR_BUTTON_POST_COMENTARIO);
    }

    async obtenerTextoUltimoComentario(){
        const ultimoComentario = await this.page.waitForSelector(SELECTOR_ULTIMO_COMENTARIO);
        return await ultimoComentario.evaluate((comentario) => {
            return comentario.innerText;
        })
    }

    async esperarQueEstadoLikeCambie() {
        const corazonElemento = await this.page.waitForSelector(SELECTOR_ICONO_CORAZON);
        
        const corazonEsRojo = await corazonElemento.evaluate((elemento, CLASE_HACER_ROJO) => {
            return elemento.classList.contains(CLASE_HACER_ROJO);
        }, CLASE_HACER_ROJO);

        // Retorna una promesa
        // - Promesa se va a resolver una vez que la condicion sea true
        // - Si en 30 segundos la condicion no es true, la promesa es rechazada
        return this.page.waitForFunction(( SELECTOR_ICONO_CORAZON, CLASE_HACER_ROJO, corazonEsRojo) => {
            const nuevoEstado = document.querySelector(SELECTOR_ICONO_CORAZON).classList.contains(CLASE_HACER_ROJO);
            
            return nuevoEstado != corazonEsRojo;

        }, {} ,SELECTOR_ICONO_CORAZON, CLASE_HACER_ROJO, corazonEsRojo)
    }

    async esperarQueComentarioAparezcaEnElDom() {
        const listaComentarios = await this.page.waitForSelector(SELECTOR_LISTA_COMENTARIOS);

        const numeroComentarios = await listaComentarios.evaluate ((elementoPagina) => {
            return elementoPagina.children.length;
        });

        return await this.page.waitForFunction((SELECTOR_LISTA_COMENTARIOS, numeroComentarios) => {
            const numeroNumeroComentarios = document.querySelector(SELECTOR_LISTA_COMENTARIOS).children.length;

            return numeroNumeroComentarios > numeroComentarios;

        }, {}, SELECTOR_LISTA_COMENTARIOS, numeroComentarios);
    }


}

module.exports = PaginaPost;