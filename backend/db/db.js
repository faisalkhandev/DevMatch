const mongoose = require("mongoose");
const { DB_CONNECTION_SECRET } = require("../config/config");
require("dotenv").config();

async function connectDB() {
    try {
        await mongoose.connect("mongodb+srv://devMatch:f9ZKaEo3u4HEhStY@cluster0.iv8geja.mongodb.net/");

        console.log("MongoDB connected successfully!");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
};

module.exports = connectDB;
