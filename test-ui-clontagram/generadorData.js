const crypto = require('crypto');
// Podríamos generar UUIDs, pero son muy largos. El servidor enforza que los usernames pueden tener máximo
// 30 caracteres. Con el módulo crypto logramos el resultado que queremos, pero es posible que hayan colisiones.

function generarUsuario() {
    // 'hex' nos garantiza que el resultado es alfanúmerico. No hay símbolos.
    const username = `test${crypto.randomBytes(12).toString('hex')}`;
    
    return {
        username: username,
        email: `${username}@gmail.com`,
        password: 'mipassword',
        nombre: 'Usuario Random',
        bio: 'Biografia'
    }
}

module.exports = {
    generarUsuario
}