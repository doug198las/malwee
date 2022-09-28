const knl = require('../knl');

knl.express.use((req, resp, next) => {
    let rawToken = req.headers['authorization'];

    req.app = {
        public          : true,
        token           : undefined,
        securitySession : undefined
    };

    if (!rawToken){
        next();
        return;
    }

    const auth = rawToken.split(' ');
    if (auth.length != 2){
        resp.status(404);
        resp.json({error : 'Token invalid. Its necessary bearer + token'});
        return;
    }

    rawToken = rawToken[1];

    req.app.public = false;
    req.app.token  = rawToken;

    // Validate JWT

    req.app.userid = '';

    next();
})