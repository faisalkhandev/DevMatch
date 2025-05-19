
const express = require("express");
const { signUp, logIn } = require("../controller/auth.Controller");


const authRouter = express.Router();



authRouter.post("/signup", signUp)

authRouter.post("/login", logIn)


module.exports = {
    authRouter
}