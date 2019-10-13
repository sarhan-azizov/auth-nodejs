const express = require('express');
const loaders = require('./src/loaders');

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
