const CREDENCIALES_VALIDAS = {
    email: 'garce@gmail.com',
    password: 'mipassword',
    username: 'garce',
};

const CREDENCIALES_EMAIL_NO_EXISTE = {
    email: 'no_existe@gmail.com',
    password: 'mipassword',
    username: 'garce',
};

const CREDENCIALES_PASSWORD_INCORRECTO = {
    email: 'garce@gmail.com',
    password: 'mipassword1',
    username: 'garce',
};

const CREDENCIALES_NO_SIGUE_A_NADIE_NO_HA_SUBIDO_FOTOS = {
    email: 'testlogincredsvalidas@gmail.com',
    password: 'prueba',
    username: 'testlogincredsvalidas'
}



module.exports = {
    CREDENCIALES_VALIDAS,
    CREDENCIALES_EMAIL_NO_EXISTE,
    CREDENCIALES_PASSWORD_INCORRECTO,
    CREDENCIALES_NO_SIGUE_A_NADIE_NO_HA_SUBIDO_FOTOS
}