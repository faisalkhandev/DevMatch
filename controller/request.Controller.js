const mongoose = require("mongoose");
const { ConnectionRequest } = require("../model/connectionRequest.model");
const { userModel } = require("../model/user.model");

async function requestSend(req, res) {
    try {
        const senderId = req.userId;
        const receiverId = req.params.receiverId;
        const status = req.params.status;


        //Checking if the reciverId is valid or not
        if (!mongoose.Types.ObjectId.isValid(receiverId)) {
            return res.status(400).json({
                message: "Invalid receiver ID format.",
            });
        }

        // Allowed status to be send.
        const allowedStatus = ["ignored", "interested"];

        if (!allowedStatus.includes(status)) {
            return res.status(400).json({
                message: "Invalid status type: " + status,
            });
        }

        // Checking whether the reciver present in the Database.
        const existReciver = await userModel.findById(receiverId);
        if (!existReciver) {
            return res.status(400).json({
                message: "Reciver user doesn't exist."
            });
        }

        // You cannot send a request to yourself
        if (senderId === receiverId) {
            return res.status(400).json({
                message: "You cannot send a request to yourself."
            })
        }

        // Checking Existing reverse request(one user can send the request. the reciver can't send the request back.)
        const existingReverseRequest = await ConnectionRequest.findOne({
            senderId: receiverId,
            receiverId: senderId,
        });

        if (existingReverseRequest) {
            return res.status(409).json({
                message: "This user has already sent you a connection request. Please respond to it first.",
            });
        }



        // Can't send the request twice/2 times.
        const existRequest = await ConnectionRequest.findOne({
            senderId,
            receiverId,
        });

        if (existRequest) {
            res.status(400).json({
                message: "Connection request already sent.",
            });
        }
        // create the request
        const connectionRequest = await new ConnectionRequest({
            senderId,
            receiverId,
            status,
        });

        // save the data into the DB
        const requestData = await connectionRequest.save();

        res.status(200).json({
            message: "the connection has been send successfully.",
            requestData,
        });
    } catch (error) {
        res.json({
            error: error.message,
        });
    }
}

module.exports = {
    requestSend,
};
