const uuid     = require('../utils/uuid');
const container = require('./container');

exports.express = global.app.express;
exports.uuid    = uuid.gen;
exports.get     = container.get;
exports.post    = container.post;
exports.put     = container.put;
exports.delete  = container.delete;