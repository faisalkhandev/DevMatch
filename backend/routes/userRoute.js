const express = require("express");
const { userAllConnection, userAllFriends, userFeed } = require("../controller/userController");
const { userAuth } = require("../middleware/userAuth.middleware");

const userRouter = express.Router();


userRouter.get("/user/requests", userAuth, userAllConnection)

userRouter.get("/user/connections", userAuth, userAllFriends)

userRouter.get("/user/feed", userAuth, userFeed)


module.exports = {
    userRouter
}