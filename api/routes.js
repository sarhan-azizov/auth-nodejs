const Controllers = require('./controllers');

module.exports = async router => {
    router.route('/register').post(Controllers.registerUser);
    router.route('/login').post(Controllers.login);

    router.route('/:username')
        .put(Controllers.updateUser)
        .delete(Controllers.removeUser);

};
