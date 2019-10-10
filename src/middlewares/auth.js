const jwt = require('jsonwebtoken');
const utils = require('../utils');

module.exports = async (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(412).send({ error: "Missing Authentication Token." });
    }

    const verifiedToken = await jwt.verify(token, utils.secret);
    const isTokenExpired = Date.now()  > verifiedToken.exp;

    if (Boolean(verifiedToken) && !isTokenExpired) {
        next();
    } else {
        res.status(401).send({ error: "Authentication Token expired or not valid" });
    }
};
