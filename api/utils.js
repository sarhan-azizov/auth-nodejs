const mongoose = require('mongoose');

module.exports.findModel = (entity, msg) =>
    entity === null ? 'The item wasn\'t find by ' + msg : entity;

module.exports.validateBody = (schema, value) => {
    const { error } = schema.validate(value, { abortEarly: false });

    return error ? error.details : null;
};

module.exports.isDBIdValid = id => mongoose.Types.ObjectId.isValid(id) ;
