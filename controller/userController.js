const bcrypt = require("bcrypt");
const { userModel } = require("../model/user.model");
const jwt = require("jsonwebtoken");
const { z } = require("zod");
const { JWT_SECRET } = require("../config/config");

const signUpSchema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().optional(),
    emailId: z.string().trim().email("Invalid email address"),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .refine(
            (val) => {
                // Here just an example: at least one uppercase, one number
                return /[A-Z]/.test(val) && /[0-9]/.test(val);
            },
            {
                message:
                    "Password must contain at least one uppercase letter and one number",
            }
        ),
});

const logInSchema = z.object({
    emailId: z.string().email("Invalid email address"),
    password: z.string().min(1, "Password is required"),
});

async function signUp(req, res) {
    try {
        const parsedData = signUpSchema.parse(req.body);

        const { firstName, lastName, emailId, password } = parsedData;

        const existingUser = await userModel.findOne({ emailId });
        if (existingUser) {
            return res.status(400).send({ error: "Email already in use." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new userModel({
            firstName,
            lastName,
            emailId,
            password: hashedPassword,
        });

        await user.save();

        res.status(201).send({ message: "User created successfully!", userDetail: user });
    }
    catch (err) {
        if (err.name === "ZodError") {
            return res.status(400).send({ errors: err.errors });
        }
        res.status(500).send({ error: err.message });
    }
}

async function logIn(req, res) {
    try {
        const parsedData = logInSchema.parse(req.body);

        const { emailId, password } = parsedData;

        const user = await userModel.findOne({ emailId });
        if (!user) {
            return res.status(401).send({ error: "Invalid email or password." });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).send({ error: "Invalid email or password." });
        }

        const token = jwt.sign(
            {
                id: user._id,
            },
            JWT_SECRET,
            {
                expiresIn: "1d",
            }
        );

        res.cookie("token", token, {
            maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
        });

        res.status(200).send({ message: "Sign in successful", userDetail: user });
    }
    catch (err) {
        if (err.name === "ZodError") {
            return res.status(400).send({ errors: err.errors });
        }
        res.status(500).send({ error: err.message });
    }
}

async function userProfile(req, res) {
    const user = req.userId;

    const userData = await userModel.findById(user)

    res.json({
        user: userData
    })


}

module.exports = {
    signUp,
    logIn,
    userProfile
};
