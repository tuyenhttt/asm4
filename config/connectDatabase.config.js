const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const connectDB = async() => {
    try {
        const conn = await mongoose.connect(process.env.MONGOBD_URL, {
            serverSelectionTimeoutMS: 20000,
        }
        );
        console.log(`Database Connected: ${conn.connection.host}`);
    } catch(error) {
        console.log(error);
    }
};

module.exports = connectDB;