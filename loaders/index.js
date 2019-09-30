const expressLoader = require('./express');
const mongooseLoader = require('./mongoose').connect;

module.exports = async ({ expressApp }) => {
    await expressLoader({ app: expressApp });
    await mongooseLoader();
};
