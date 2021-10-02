const axios = require('axios').default;

const { API_LOGIN_URL } = require('../configuracion/url');

module.exports = async function obtenerTokenYDataAutenticacion ({email, password}) {
    try {
        let respuesta = await axios.post(API_LOGIN_URL, {email, password});
        return respuesta.data;
    } catch (error) {
        throw new Error( `Usuario con email ${email} y contraseña ${password} no pudo ser autenticado ${error.name}: ${error.message}` );
    }
    
}

