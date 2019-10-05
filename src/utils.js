const mongoose = require('mongoose');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');

const validateBody = (schema, value) => {
    const { error } = schema.validate(value, { abortEarly: false });

    return error ? error.details : null;
};

const isDBIdValid = id => mongoose.Types.ObjectId.isValid(id) ;

const secret = "sARhAn_and.TomMy-foRevE";
const crypt = data => CryptoJS.AES.encrypt(data, secret).toString();

const decrypt = data =>  CryptoJS.AES.decrypt(data, secret).toString(CryptoJS.enc.Utf8);

const routeTemplate = async ({ schema, res, req, checkToken = false }, cb) => {
    if (schema) {
        const bodiesErrors = validateBody(schema, req.body);

        if (bodiesErrors) {
            return res.status(400).send(bodiesErrors);
        }
    }

    const token = req.header('Authorization');

    if (checkToken && !token) {
        return res.status(412).send("Missing Authentication Token.");
    }

    try {
        if (checkToken) {
            const isValidToken = await Boolean(jwt.verify(token, secret));

            if (isValidToken) {
                await cb();
            }
        } else {
            await cb();
        }
    } catch (err) {
        res.status(500).send(err.toString());
    }
};


const getExpirationDateByHours = (date = Date.now(), hours = 8) => Date.now() + 60 * 60 * 1000;

module.exports = {
    secret,
    validateBody,
    isDBIdValid,
    decrypt,
    crypt,
    getExpirationDateByHours,
    routeTemplate
};
