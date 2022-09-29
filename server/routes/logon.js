const knl = require('../knl');
const securityConsts = require('../consts/security-consts');
const Joi = require('joi');

knl.post('logon', async (req, resp) => {
    const schema = Joi.object({
        username : Joi.string().max(100).min(1).required(),
        password : Joi.string().max(16).min(6).required()
    });

    knl.validate(req.body, schema);


    
}, securityConsts.USER_TYPE_PUBLIC);