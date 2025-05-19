const express = require("express");
const { userAuth } = require("../middleware/userAuth.middleware");
const { connection } = require("../controller/connection.Controller");

const connectionRouter = express.Router();



connectionRouter.get("/connection", userAuth, connection)



module.exports = {
    connectionRouter
}