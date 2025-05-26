const express = require("express");
const { userAuth } = require("../middleware/userAuth.middleware");
const { requestSend, requestRespond } = require("../controller/request.Controller");

const requestRouter = express.Router();

requestRouter.post("/request/send/:status/:receiverId", userAuth, requestSend)

requestRouter.post("/request/respond/:status/:requestId", userAuth, requestRespond)


module.exports = {
    requestRouter
}