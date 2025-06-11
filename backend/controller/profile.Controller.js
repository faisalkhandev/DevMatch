const { userModel } = require("../model/user.model");
const {
    editUserProfileSchema,
    passwordSchema,
} = require("../validation/auth.Schema");

const bcrypt = require("bcrypt")


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
        const validateData = editUserProfileSchema.safeParse(req.body);

        // it will stop if the user try to update not allowed/mention field.
        if (!validateData.success) {

            return res.status(400).json({
                success: false,
                message: "Validation failed",
                errors: validateData.error.errors,
            });

        }

        const updateUser = await userModel.findByIdAndUpdate(userId,
            { $set: validateData.data },
            { new: true, runValidators: true }
        ).select("-password");

        if (!updateUser) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        res.status(200).json({
            success: true,
            message: "User profile updated successfully",
            updateData: updateUser,
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


async function userProfilePassword(req, res) {

    const userId = req.userId;

    try {
        const validatePassword = passwordSchema.safeParse(req.body);

        if (!validatePassword.success) {
            return res.status(400).json({
                success: false,
                message: "Validation failed",
                errors: validatePassword.error.errors,
            });
        }

        const { oldPassword, newPassword } = validatePassword.data;

        const user = await userModel.findById(userId)
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found.",
            })
        }

        const comparePassword = await bcrypt.compare(oldPassword, user?.password)

        if (!comparePassword) {
            return res.status(400).json({
                success: false,
                message: "Old password is not correct",
            })
        }

        const hashNewPassword = await bcrypt.hash(newPassword, 10);

        user.password = hashNewPassword;
        await user.save();

        res.status(200).json({
            success: true,
            message: "Password updated successfully",
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to update password",
            error: error.message,
        });

    }

}

module.exports = {

    userProfile,
    userProfileEdit,
    userProfilePassword,
};
