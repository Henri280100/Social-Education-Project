const mongoose = require('mongoose');
require('dotenv').config();
async function connect(uri, callback) {
    try {
        await mongoose.connect(`mongodb+srv://HenriPham280100:fTPdY76cqPnapcD9h@cluster0.y8k4j.mongodb.net/E-Social?authSource=admin&replicaSet=atlas-jkzq3h-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected');
    } catch (error) {
        console.log(error);
    }
}
module.exports = { connect };