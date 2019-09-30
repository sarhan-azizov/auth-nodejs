const mongoose = require('mongoose');

const state = {
    db: null
};

mongoose.connection.on('connected', () => {
    console.log('MongoDB connection is open');
});

mongoose.connection.on('error', err => {
    state.db = Promise.reject(err);
    console.log('MongoDB has occurred', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('MongoDB is disconnected');
});

exports.connect = async () => {
    if (!state.db) {
        state.db = await mongoose.connect(process.env.DATABASE_URL, {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        });
    }

    return state.db;
};

exports.close = () => {
    mongoose.connection.close(() => {
        state.db = null;
        console.log('Mongoose is disconnected due to application termination');
    });
};
