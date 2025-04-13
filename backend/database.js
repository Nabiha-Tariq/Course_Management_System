const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/CourseManagSYS";

const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("Connected to Mongo Successfully");
    } catch (err) {
        console.error("Error connecting to Mongo:", err);
    }
};

module.exports = connectToMongo;
