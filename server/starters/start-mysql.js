const knl = require('../knl');
const db  = require('../knl/db');
const mysql = require('mysql2/promise');

const makeConnectorOptions = () => {
    return {
        host     : process.env.DB_SERVER  ,
        user     : process.env.DB_USER    ,
        password : process.env.DB_PASS    ,
        database : process.env.DB_DATABASE
    }
}

knl.express.use(async (req, resp, next) => {
    const connection = await mysql.createConnection(makeConnectorOptions());

    await connection.execute('SET TRANSACTION ISOLATION LEVEL READ COMMITTED');
    
    if (!req.app){
        req.app = {};
    }

    req.app.db = db(connection);

    next();
});