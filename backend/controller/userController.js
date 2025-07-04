const { ConnectionRequest } = require("../model/connectionRequest.model");
const { userModel } = require("../model/user.model");

const USER_DATA = [
    "firstName",
    "lastName",
    "gender",
    "age",
    "photoUrl",
    "about",
    "skills",
    "lastSeen",
];

async function userAllConnection(req, res) {
    try {
        const loggedInUser = req.userId;

        const pendingRequest = await ConnectionRequest.find({
            receiverId: loggedInUser,
            status: "interested",
        }).populate("senderId", USER_DATA);

        return res.status(200).json({
            message: "All connections of the user",
            pendingRequest,
            count: pendingRequest.length,
        });
    } catch (err) {
        res.status(400).json({
            message: "got an error in the catch.",
            error: err.message,
        });
    }
}

async function userAllFriends(req, res) {
    try {
        const loggedInUser = req.userId;

        const allFriends = await ConnectionRequest.find({
            $or: [
                { receiverId: loggedInUser, status: "accepted" },
                { senderId: loggedInUser, status: "accepted" },
            ],
        })
            .populate("senderId", USER_DATA)
            .populate("receiverId", USER_DATA);

        // Extract the actual friends (not the logged-in user)
        const friendsList = allFriends.map((connection) => {
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
            count: friendsList.length,
        });
    } catch (error) {
        return res.status(400).json({
            message: "Error fetching friends",
            error: error.message,
        });
    }
}

async function userFeed(req, res) {
    /**
     * Get new people the user has not interacted with
     * Excludes already connected/requested/ignored users
     */
    try {
        const userId = req.userId;

        // pagination in GET APIs
        // difference btw query(?limit) and params(/:limmit)
        const page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;
        // if a user send limit 100k or more than this or to prevent DDoS attack or slow querying or high ram/cpu usage and high cost.
        limit = limit > 50 ? 50 : limit;

        const skip = (page - 1) * limit;

        // Get all requests where user is sender or receiver
        const connection = await ConnectionRequest.find({
            $or: [
                {
                    receiverId: userId,
                },
                {
                    senderId: userId,
                },
            ],
        });

        //Set can have only unique values not repeated
        const hideFromFeed = new Set();

        // Collect all users the current user has interacted with
        connection.forEach((conn) => {
            hideFromFeed.add(conn.receiverId.toString());
            hideFromFeed.add(conn.senderId.toString());
        });
        // Exclude myself
        hideFromFeed.add(userId);

        // Find users who has not interacted with me yet.
        const potentialUsers = await userModel
            .find({
                _id: { $nin: Array.from(hideFromFeed) },
            })
            .select(USER_DATA)
            .skip(skip)
            .limit(limit)

        if (potentialUsers.length === 0) {
            return res.status(200).json({
                message: "No new users to show in feed.",
                data: [],
            });
        }

        // Find users who i have not interacted yet
        return res.status(200).json({
            message: "Here are some new people for you to connect with.",
            count: potentialUsers.length,
            currentPage: page,
            hasMore: potentialUsers.length === limit,
            feed: potentialUsers
        });
    } catch (err) {
        return res.status(500).json({
            message: "Server error while loading feed.",
            error: err.message,
        });
    }
}

module.exports = {
    userAllConnection,
    userAllFriends,
    userFeed,
};
