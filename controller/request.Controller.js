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

        // Check if a connection request already exists in either direction
        const existingReverseRequest = await ConnectionRequest.findOne({
            $or: [
                {
                    senderId: receiverId,
                    receiverId: senderId,
                },
                {
                    senderId,
                    receiverId,
                }
            ]
        });

        if (existingReverseRequest) {
            return res.status(409).json({
                message: "This user has already sent you a connection request. Please respond to it first.",
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
            message: senderId + " is " + status + " " + existReciver.firstName,
            requestData,
        });
    } catch (error) {
        res.json({
            error: error.message,
        });
    }
}

async function requestAccept(req, res) {

    try {

        const receiverId = req.userId;
        const { requestId, status } = req.params;


        //checking if the requestId is valid
        if (!mongoose.Types.ObjectId.isValid(requestId)) {
            return res.status(400).json({
                message: "The requestId is invalid."
            })
        }

        //2 status will be allowed. accepted and ignored.
        const allowedStatus = ["accepted", "ignored"]
        if (!allowedStatus.includes(status)) {
            return res.status(400).json({
                message: "invalid status type" + status
            })
        }

        //find whether the request is present in the DB
        const request = await ConnectionRequest.findById(requestId)
        if (!request) {
            return res.json({
                message: "Connection request not found."
            })
        }

        // Only the receiver can respond
        if (request.receiverId.toString() !== receiverId) {
            return res.status(403).json({ message: "You are not authorized to respond to this request." });
        }


        //check if the request is already accepted or ignored. 
        if (allowedStatus.includes(request.status)) {
            return res.json({
                message: "This request has already been responded."
            })
        }

        request.status = status;
        await request.save();

        return res.status(200).json({
            message: `Connection has been ${status}`,
            response: request,
        })


    }
    catch (error) {
        res.json({
            error: error.message,
        });
    }

}

module.exports = {
    requestSend,
};
