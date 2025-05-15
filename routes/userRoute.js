const express = require("express");
const { createUser, logIn, signUp, } = require("../controller/userController");



const userRouter = express.Router();



userRouter.post("/signup", signUp)
userRouter.post("/login", logIn)




module.exports = {

    userRouter

}