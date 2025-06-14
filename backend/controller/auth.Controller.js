const bcrypt = require("bcrypt");
const { userModel } = require("../model/user.model");
const jwt = require("jsonwebtoken");
const {
    signUpSchema,
    logInSchema,
} = require("../validation/auth.Schema");


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

        res
            .status(201)
            .send({ message: "User created successfully!", userDetail: user });
    } catch (err) {
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
            process.env.JWT_SECRET,
            {
                expiresIn: "1d",
            }
        );

        console.log("loginJWT:::", process.env.JWT_SECRET)

        res.cookie("token", token, {
            maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
        });

        res.status(200).send({ message: "Sign in successful", user });
    } catch (err) {
        if (err.name === "ZodError") {
            return res.status(400).send({ errors: err.errors });
        }
        res.status(500).send({ error: err.message });
    }
}

async function logOut(req, res) {
    try {

        res.clearCookie("token")
        res.status(200).send({ message: "Logged out successfully" });

    }
    catch (err) {
        if (err.name === "ZodError") {
            return res.status(400).send({ errors: err.errors });
        }
        res.status(500).send({ error: err.message });

    }


}

module.exports = {
    signUp,
    logIn,
    logOut

}
