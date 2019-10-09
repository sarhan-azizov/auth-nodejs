const { registerUser, login, updateUser, removeUser } = require('./controllers');
const { withAuth, withBodyValidation } = require('../../middlewares');
const { userSchema, loginUserSchema } = require('./validation');

module.exports = async router => {
    router.route('/users/register')
        .post(withBodyValidation(userSchema), registerUser);

    router.route('/users/login')
        .post(withBodyValidation(loginUserSchema), login);

    router.route('/users/:username')
        .put(withAuth, withBodyValidation(userSchema), updateUser)
        .delete(withAuth, removeUser);
};
