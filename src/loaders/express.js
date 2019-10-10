const express = require('express');
const bodyParser = require('body-parser');

const routes = require('../api/users').routes;

module.exports = ({ app }) => {
    const router = express.Router();

    app.use(require('morgan')('dev'));
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    routes(router);

    app.use('/api/v1/', router);

    app.use((req, res) => {
        res.status(404).send({ error: `The route '${req.url}'  Not found.` });
    });

    app.use((err, req, res) => {
        res.status(500).send(err);
    });

    return app;
};
