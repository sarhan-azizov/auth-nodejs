const validateBody = (schema, value) => {
    const { error } = schema.validate(value, { abortEarly: false });

    return error ? error.details : null;
};

module.exports = schema => (req, res, next) => {
    const bodiesErrors = validateBody(schema, req.body);

    if (bodiesErrors) {
        return res.status(400).send(bodiesErrors);
    }

    next();
};
