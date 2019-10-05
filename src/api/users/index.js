const routes = require('./routes');

module.exports.routes = async router => {
    await routes(router);
};
