// controllers/userController.js
const bcrypt = require('bcrypt');
const { userModel } = require('../model/user.model');


async function createUser(req, res) {
    const { firstName, lastName, emailId, password, age, gender, isPremium, membershipType, photoUrl, about, skills } = req.body;



    try {
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
            age,
            gender,
            isPremium,
            membershipType,
            photoUrl,
            about,
            skills,
        });

        await user.save();

        res.status(201).send({ message: "User created successfully!", userDetail: user });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
}

module.exports = {
    createUser
};
