const Controllers = require('./controllers');
const middlewares = require('../../middlewares');
const Schemas = require('./validation');

const { withAuth, withBodyValidation } = middlewares;
const { registerUser, login, updateUser, removeUser } = Controllers;

module.exports = async router => {
    router.route('/users/register')
        .post(withBodyValidation(Schemas.user), registerUser);

    router.route('/users/login')
        .post(withBodyValidation(Schemas.loginUser), login);

    router.route('/users/:username')
        .put(withAuth, withBodyValidation(Schemas.user), updateUser)
        .delete(withAuth, removeUser);
};
