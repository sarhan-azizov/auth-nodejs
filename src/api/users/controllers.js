const jwt = require('jsonwebtoken');

const Users = require('./models').Users;
const utils = require('../../utils');

exports.registerUser = async (req, res, next) => {
    const user = await Users.findOne({ username: req.body.username });

    if (!user) {
        try {
            const user = await new Users({
                username: req.body.username,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                password: utils.crypt(req.body.password),
                repeatPassword: utils.crypt(req.body.repeatPassword)
            }).save();

            return res.status(200).send(user);
        } catch (error) {
            return next(error);
        }
    }

    return res.status(400).send({ error: `the username '${req.body.username}' is already in use` });
};

exports.login = async (req, res, next) => {
    const foundUser = await Users.findOne({ username: req.body.username });

    if (!foundUser) {
        return res.status(400).send({ error: `the username or password is incorrect` });
    }

    const decryptedPassword = utils.decrypt(foundUser.password);
    const isValidLoginAndPassword = foundUser && decryptedPassword === req.body.password;

    if (isValidLoginAndPassword) {
        try {
            const token = await jwt.sign({
                data: { username: req.body.username },
                exp: utils.getExpirationDateByHours(),
            }, utils.secret, { algorithm: 'HS256'});

            return res.status(200).send({ token });
        } catch (error) {
            return next(error);
        }
    }

    return res.status(400).send({ error: `the username or password is incorrect` });
};

exports.updateUser = async (req, res, next) => {
    if (!req.params.username) {
        return res.status(400).send({ error: "The queries username is missing" });
    }

    try {
        const foundUser = await Users.findOne({ username: req.params.username });

        if (foundUser) {
            const updatedUser = await Users.updateOne(
                { username: req.params.username },
                {
                    username: req.body.username,
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    password: utils.crypt(req.body.password),
                    repeatPassword: utils.crypt(req.body.repeatPassword),
                    updatedAt: Date.now()
                },
                { new: true }
            );

            return res.status(200).send(updatedUser);
        }
    } catch (error) {
        return next(error);
    }

    return res.status(400).send({ error: `The username '${req.params.username}' doesn\'t exist` });
};

exports.removeUser = async (req, res, next) => {
    if (!req.params.username) {
        return res.status(400).send({ error: "The username is required" });
    }

    try {
        const foundUser = await Users.findOne({ username: req.params.username });

        if (foundUser) {
            const removedUser = await Users.deleteOne({ username: req.params.username });

            return res.status(200).send(removedUser);
        }
    } catch (error) {
        return next(error);
    }

    return res.status(400).send({ error: `The username '${req.params.username}' doesn\'t exist` });
};
