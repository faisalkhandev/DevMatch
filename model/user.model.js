const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true, 'First name is required'],
            minLength: [4, 'First name must be at least 4 characters long'],
            maxLength: [50, 'First name cannot exceed 50 characters'],
        },
        lastName: {
            type: String,
            required: [true, 'Last name is required'],
            minLength: [4, 'Last name must be at least 4 characters long'],
            maxLength: [50, 'Last name cannot exceed 50 characters'],
        },
        emailId: {
            type: String,
            lowercase: true,
            required: true,
            unique: true,
            trim: true,
            validate(value) {
                if (!validator.isEmail(value)) {
                    throw new Error("Invalid email address: " + value);
                }
            },
        },
        password: {
            type: String,
            required: true,
            validate(value) {
                if (!validator.isStrongPassword(value)) {
                    throw new Error("Enter a Strong Password: " + value);
                }
            },
        },
        age: {
            type: Number,
            min: 18,
        },
        gender: {
            type: String,
            enum: {
                values: ["male", "female", "other"],
                message: `{VALUE} is not a valid gender type`,
            },
        },
        isPremium: {
            type: Boolean,
            default: false,
        },
        membershipType: {
            type: String,
        },
        photoUrl: {
            type: String,
            default: "https://geographyandyou.com/images/user-profile.png",
            validate(value) {
                if (!validator.isURL(value)) {
                    throw new Error("Invalid Photo URL: " + value);
                }
            },
        },
        about: {
            type: String,
            default: "This is a default about of the user!",
        },
        skills: {
            type: [String],
        },
    },
    {
        timestamps: true,
    }
);



const userModel = mongoose.model("User", userSchema)
module.exports = {
    userModel
}