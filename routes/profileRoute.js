const express = require("express");
const { userProfile, userProfileEdit, userProfilePassword, } = require("../controller/profile.Controller");
const { userAuth } = require("../middleware/userAuth.middleware");



const profileRouter = express.Router();



profileRouter.get("/profile/view", userAuth, userProfile)

profileRouter.patch("/profile/edit", userAuth, userProfileEdit)

profileRouter.patch("/profile/password", userAuth, userProfilePassword)



module.exports = {

    profileRouter

}