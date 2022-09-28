const knl = require('../knl');

knl.express.use((req, resp, next) => {
    if (req.app.public){
        next();
        return;
    }

    // Load user from database
    // Se não achar o usuário no banco, subir exceção

    req.app.session = {};
    next();
});