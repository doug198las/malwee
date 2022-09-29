const knl = require('../knl');
const securityConsts = require('../consts/security-consts');

const runInContext = async (req, resp, fn, userTypes) => {
    let connection = null;

    try{
        if (userTypes == undefined || userTypes == null){
            userTypes = [securityConsts.USER_TYPE_PRIVATE]
        }

        if (!Array.isArray(userTypes)){
            userTypes = [userTypes];
        }

        const publicUser = userTypes.find(element => element == securityConsts.USER_TYPE_PUBLIC);

        if (!publicUser){
        // Criar exceção aqui req.app.session == undefined;
        }

        connection = global.app.context.getStore()?.db; 

        await connection.startTransaction();

        await fn(req, resp);
        
        await connection.commitTransaction();
        
    }catch(e){
        console.error(e);
        if (connection){
            await connection.rollbackTransaction();
        }
    } finally{
        if (connection){
            if (connection.isInTransaction()){
                await connection.rollbackTransaction();
            }
            connection.close();
        }
    };
};

const container = (req, resp, fn, userTypes) => {
    global.app.context.run({
        req   : req,
        resp  : resp,
        db    : req.app.db,
        name  : knl.uuid()
    }, async () => {
        await runInContext(req, resp, fn, userTypes);
    })
};

const route = (path) => {
    if (!path || path == '' || typeof path != 'string'){
        throw 'Invalid path';
    }

    if (path[0] != '/'){
        path = '/' + path;
    }

    return path;
}

exports.get = (path, fn, userTypes) => {
    path = route(path);
    console.log('Register route: GET:' + path);

    knl.express.get(path, (req, resp) => {
        container(req, resp, fn, userTypes);
    })
}

exports.post = (path, fn, userTypes) => {
    path = route(path);
    console.log('Register route: POST:' + path);

    knl.express.post(path, (req, resp) => {
        container(req, resp, fn, userTypes);
    })
}

exports.put = (path, fn, userTypes) => {
    path = route(path);
    console.log('Register route: PUT:' + path);

    knl.express.put(path, (req, resp) => {
        container(req, resp, fn, userTypes);
    })
}

exports.delete = (path, fn, userTypes) => {
    path = route(path);
    console.log('Register route: DELETE:' + path);

    knl.express.delete(path, (req, resp) => {
        container(req, resp, fn, userTypes);
    })
}