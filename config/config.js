require("dotenv").config();


module.exports = {
    PORT: process.env.PORT,
    DB_CONNECTION_SECRET: process.env.DB_CONNECTION_SECRET,
    JWT_SECRET: process.env.JWT_SECRET,

}
