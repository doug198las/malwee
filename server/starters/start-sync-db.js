const sequelizeUtils = require('../utils/sequelize-utils');

const updateDB = async () => {
    const sequelize = await sequelizeUtils();

    await sequelize.sync();
}

updateDB();