const fs   = require('fs');
const path = require('path')

const loadModels = () => {
    const files = fs.readdirSync(__dirname);

    files.forEach(file => {
        if (path.extname(file) != '.js'){
            return;
        }
        
        if (file != 'index.js'){
            require(__dirname + '/' + file);
        }
    })
}

loadModels();