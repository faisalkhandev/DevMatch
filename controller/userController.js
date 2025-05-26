const { ConnectionRequest } = require("../model/connectionRequest.model");

async function userAllConnection(req, res) {

    try {

        const loggedInUser = req.userId;

        const userPendingRequest = await ConnectionRequest.find({
            receiverId: loggedInUser,
            status: 'interested'
        })
            .populate('senderId', ["firstName", "lastName", "age", "photoUrl", "about", "skills"])



        res.status(400).json({
            message: "All connections of the user",
            userPendingRequest
        })

    } catch (err) {

        res.status(400).json({
            message: "got an error in the catch.",
            error: err.message
        })

    }
}


async function userAllFriends(req, res) {
    try {
        const loggedInUser = req.userId;

        const allFriends = await ConnectionRequest.find({
            $or: [
                {
                    receiverId: loggedInUser, status: 'accepted'
                },
                {
                    senderId: loggedInUser, status: "accepted"
                }
            ]
        })
            .populate("senderId", ["firstName", "lastName", "age", "photoUrl", "about", "skills"])

        return res.status(200).json({
            message: "All friends are here",
            allFriends
        })


    } catch (error) {
        error: error.message
    }
}

module.exports = {
    userAllConnection,
    userAllFriends
}