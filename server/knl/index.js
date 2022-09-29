const uuid      = require('../utils/uuid');
const container = require('./container');
const validator = require('./validator');

exports.express   = global.app.express;
exports.uuid      = uuid.gen;
exports.get       = container.get;
exports.post      = container.post;
exports.put       = container.put;
exports.delete    = container.delete;
exports.validate  = validator.validate;
exports.query     = (sql, params) => {
    const connection = global.app.context.getStore().db;

    
};