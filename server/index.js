require('./config/env-config');
require('./starters/start-async-storange');
require('./starters/start-express');
require('./starters/start-bodyparser');
require('./starters/start-middlewares');
// Sempre iniciar o mysql depois do express
require('./starters/start-mysql'); 
require('./routes');

let port = 3000;

if (process.env.PORT){
    port = process.env.PORT;
}

global.app.express_listener_instance = global.app.express.listen(port, () => {
    console.log('Express is listen on ' + global.app.express_listener_instance.address().port)
});