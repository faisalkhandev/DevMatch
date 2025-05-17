const express = require("express");
const { logIn, signUp, userProfile, } = require("../controller/userController");
const { userAuth } = require("../middleware/userAuth.middleware");



const userRouter = express.Router();



userRouter.post("/signup", signUp)
userRouter.post("/login", logIn)
userRouter.get("/profile", userAuth, userProfile)





module.exports = {

    userRouter

}