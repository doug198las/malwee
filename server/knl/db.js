const knl      = require('./');
const namedSQL = require('yesql').pg

module.exports = (connection) => {
    if (!connection){
        return null;
    }

    let transaction = false;

    return {
        close : async () => {
            // connection.end();
        },
    
        startTransaction : async () => {
            // await connection.query('BEGIN');
            transaction = true;
        },

        commitTransaction : async () => {
            // await connection.query('COMMIT');
            transaction = false;
        },

        rollbackTransaction : async () => {
            // await connection.query('ROLLBACK');
            transaction = false;
        },

        isInTransaction : () => {
            return transaction;
        },

        query : (sql, params) => {
            return new Promise((resolve, reject) => {
                if (knl.objects.isNullOrUndefined(params)){
                    params = {};
                }

                connection.query(namedSQL(sql)(params), (error, result) => {
                    if (error){
                        console.log(error);
                        reject(error);
                        return;
                    }
        
                    resolve(result.rows);
                })
            })
        }
    }    
};