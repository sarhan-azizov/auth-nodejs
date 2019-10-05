const jwt = require('jsonwebtoken');
const utils = require('../utils');

module.exports = async (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(412).send({ msg: "Missing Authentication Token." });
    }

    const verifiedToken = await jwt.verify(token, utils.secret);

    if (Boolean(verifiedToken)) {
        next();
    } else {
        res.status(412).send(verifiedToken);
    }
};
