const express = require("express");
const { getChat } = require("../controller/chat.Controller");
const { userAuth } = require("../middleware/userAuth.middleware");


const chatRouter = express.Router();


chatRouter.get("/chat/:targetUserId", userAuth, getChat)


module.exports = {
    chatRouter
}
