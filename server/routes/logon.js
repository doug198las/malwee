const knl = require('../knl');
const securityConsts = require('../consts/security-consts');
const Joi = require('joi');

knl.post('logon', async (req, resp) => {
    const schema = Joi.object({
        username : Joi.string().max(100).min(1).required(),
        password : Joi.string().max(16).min(6).required()
    });

    knl.validate(req.body, schema);

    const sequelize = knl.sequelize();
    const result = await sequelize.models.Usuario.findAll({
        where : {
            username : req.body.username,
            password : req.body.password
        }
    })

    knl.createException('0005', knl.objects.isEmptyArray(result));
    
}, securityConsts.USER_TYPE_PUBLIC);