const knl = require('../knl');
const db  = require('../knl/db');

knl.express.use((req, resp, next) => {
    const client = {};
    
    if (!req.app){
        req.app = {};
    }

    req.app.db = db(client);

    next();
});