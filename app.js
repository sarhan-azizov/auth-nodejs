const express = require('express');
const dotenv = require('dotenv');
const loaders = require('./src/loaders');

process.env.TZ = "Europe/Kiev";

dotenv.config();

async function startServer() {
    const app = express();

    await loaders({ expressApp: app });

    app.listen(process.env.PORT, err => {
        if (err) {
            console.log(err);
            return;
        }
        console.log(`Server is Ready! http://${process.env.HOST}:${process.env.PORT}`);
    });
}

startServer();
