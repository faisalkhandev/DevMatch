const { ConnectionRequest } = require("../model/connectionRequest.model");

const USER_DATA = ["firstName", "lastName", "gender", "age", "photoUrl", "about", "skills"]

async function userAllConnection(req, res) {

    try {

        const loggedInUser = req.userId;

        const pendingRequest = await ConnectionRequest.find({
            receiverId: loggedInUser,
            status: 'interested'
        })
            .populate('senderId', USER_DATA)



        return res.status(400).json({
            message: "All connections of the user",
            pendingRequest,
            count: pendingRequest.length
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
                { receiverId: loggedInUser, status: 'accepted' },
                { senderId: loggedInUser, status: "accepted" }
            ]
        })
            .populate("senderId", USER_DATA)
            .populate("receiverId", USER_DATA);

        // Extract the actual friends (not the logged-in user)
        const friendsList = allFriends.map(connection => {
            // If logged-in user is the sender, return the receiver as friend
            if (connection.senderId._id.toString() === loggedInUser.toString()) {
                return connection.receiverId;
            }
            // If logged-in user is the receiver, return the sender as friend
            else {
                return connection.senderId;
            }
        });

        return res.status(200).json({
            message: "All friends are here",
            friends: friendsList,
            count: friendsList.length
        });

    } catch (error) {
        return res.status(400).json({
            message: "Error fetching friends",
            error: error.message
        });
    }
}

module.exports = {
    userAllConnection,
    userAllFriends
}