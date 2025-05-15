const bcrypt = require('bcrypt');
const { userModel } = require('../model/user.model');
const validator = require('validator');

async function createUser(req, res) {
    const { firstName, lastName, emailId, password, } = req.body;



    try {

        if (!validator.isStrongPassword(password)) {
            return res.status(400).send({ error: "Password must be strong." });
        }


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
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
}


async function signIn(req, res) {
    const { emailId, password } = req.body;

    try {
        if (!emailId || !password) {
            return res.status(400).send({ error: "Please provide email and password." });
        }

        const user = await userModel.findOne({ emailId });
        if (!user) {
            return res.status(401).send({ error: "Invalid email or password." });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).send({ error: "Invalid email or password." });
        }


        res.status(200).send({ message: "Sign in successful", userDetail: user });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}

module.exports = {
    createUser,
    signIn,
};
