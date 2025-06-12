const mongoose = require("mongoose");
const { DB_CONNECTION_SECRET } = require("../config/config");
require("dotenv").config();

async function connectDB() {
    try {
        await mongoose.connect(process.env.DB_CONNECTION_SECRET);
        console.log("DB ENV:::", process.env.DB_CONNECTION_SECRET)
        console.log("MongoDB connected successfully!");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
};

module.exports = connectDB;
