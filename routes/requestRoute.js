const express = require("express");
const { userAuth } = require("../middleware/userAuth.middleware");
const { requestSend } = require("../controller/request.Controller");

const requestRouter = express.Router();

requestRouter.get("/request/send/:status/:receiverId", userAuth, requestSend)


module.exports = {
    requestRouter
}