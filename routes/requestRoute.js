const express = require("express");
const { userAuth } = require("../middleware/userAuth.middleware");
const { requestSend } = require("../controller/request.Controller");

const requestRouter = express.Router();

requestRouter.post("/request/send/:status/:receiverId", userAuth, requestSend)

requestRouter.post("/request/:status/:requestId", userAuth, requestSend)


module.exports = {
    requestRouter
}