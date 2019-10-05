const Controllers = require('./controllers');

module.exports = async router => {
    router.route('/users/register').post(Controllers.registerUser);
    router.route('/users/login').post(Controllers.login);

    router.route('/users/:username')
        .put(Controllers.updateUser)
        .delete(Controllers.removeUser);
};
