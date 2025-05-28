const mongoose = require("mongoose");
const { DB_CONNECTION_SECRET } = require("../config/config");

async function connectDB() {
    try {
        await mongoose.connect(DB_CONNECTION_SECRET);
        console.log("MongoDB connected successfully!");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
};

module.exports = connectDB;
