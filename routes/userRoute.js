const express = require("express");
const { userAllConnection, userAllFriends } = require("../controller/userController");
const { userAuth } = require("../middleware/userAuth.middleware");

const userRouter = express.Router();


userRouter.get("/user/requests", userAuth, userAllConnection)

userRouter.get("/user/connections", userAuth, userAllFriends)


module.exports = {
    userRouter
}