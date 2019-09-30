const Models = require('./models');
const CryptoJS = require('crypto-js');

const Schemas = require('./validation');
const utils = require('./utils');


exports.registerUser = async (req, res) => {
    const errors = utils.validateBody(Schemas.user, req.body);

    if (errors) {
        return res.status(400).send(errors);
    }

    try {
        const user = await Models.ModelUser.find({ username: req.body.username });

        if (user === null || !user.length) {
            const createdUser = await new Models.ModelUser({
                username: req.body.username,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                password: CryptoJS.HmacSHA1(req.body.password, "SARhAn"),
                repeatPassword: CryptoJS.HmacSHA1(req.body.repeatPassword, "SARhAn")
            }).save();

            res.status(201).send(createdUser);
        }

        res.status(400).send(`the username '${req.body.username}' is already in use`);
    } catch (err) {
        res.status(500).send(err);
    }
};

exports.login = async (req, res) => {
    const errors = utils.validateBody(Schemas.region, req.body);

    if (errors) {
        return res.status(400).send(errors);
    }

    try {
        const createdRegion = await new Models.Regions({ name: req.body.name }).save();

        res.status(201).send(createdRegion);
    } catch (err) {
        res.status(500).send(err);
    }
};


exports.updateUser = async (req, res) => {
    if (!utils.isDBIdValid(req.params.regionId)) {
        return res.status(400).send("The queries regionId is the wrong format");
    }

    const errors = utils.validateBody(Schemas.region, req.body);

    if (errors) {
        return res.status(400).send(errors);
    }

    try {
        const updatedRegion = await Models.Regions.findOneAndUpdate(
            { _id: req.params.regionId },
            { name: req.body.name, updatedAt: Date.now() }
        );
        res.status(200).send(utils.findModel(updatedRegion, `regionId: ${req.params.regionId}`));
    } catch (err) {
        res.status(500).send(err)
    }
};

exports.removeUser = async (req, res) => {
    if (!req.params.username) {
        return res.status(400).send("The username is required");
    }

    try {
        const removedUser = await Models.ModelUser.findOneAndRemove({ username: req.params.username });
        res.status(200).send(utils.findModel(removedUser, `username: ${req.params.username}`))
    } catch (err) {
        res.status(500).send(err);
    }
};
