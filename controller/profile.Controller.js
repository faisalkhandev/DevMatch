const { userModel } = require("../model/user.model");
const {
    editUserProfileSchema,
} = require("../validation/auth.Schema");


async function userProfile(req, res) {
    const user = req.userId;

    const userData = await userModel.findById(user).select("-password");

    res.json({
        user: userData,
        sucess: true,
    });
}

async function userProfileEdit(req, res) {
    const userId = req.userId;

    try {
        const validateData = editUserProfileSchema.parse(req.body);

        const updateUser = await userModel.findByIdAndUpdate(userId,
            { $set: validateData },
            { new: true, runValidators: true }
        ).select("-password");

        if (!updateUser) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        res.status(300).json({
            success: true,
            message: "User profile updated successfully",
            user: updateUser,
        });


    }
    catch (err) {
        if (err.name === "ZodError") {
            return res.status(400).json({
                success: false,
                message: "Validation failed",
                errors: err.errors,
            });
        }

        res.status(500).json({
            success: false,
            message: "Failed to update profile",
            error: err.message,
        });
    }
}


module.exports = {

    userProfile,
    userProfileEdit,
};
