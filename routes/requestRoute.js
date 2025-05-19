const express = require("express");
const { userAuth } = require("../middleware/userAuth.middleware");
const { connection } = require("../controller/requests.Controller");

const connectionRouter = express.Router();



connectionRouter.get("/connection", userAuth, connection)



module.exports = {
    connectionRouter
}