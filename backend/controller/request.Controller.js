const mongoose = require("mongoose");
const { ConnectionRequest } = require("../model/connectionRequest.model");
const { userModel } = require("../model/user.model");
const { sendTemplatedEmail } = require("../utils/sendEmail");

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

        await requestData.populate([
            { path: 'senderId', select: 'firstName lastName' },
            { path: 'receiverId', select: 'firstName lastName' }
        ]);


        //when a user send a request then the reciever get an aler email(friend request email)(Amazon SES)

        // this is in SandBox mode so only aws SES verified email can work only. 
        // const emailRes = await sendTemplatedEmail({
        //     to: "khanfai900@gmail.com",
        //     from: "contact@devmatching.faisalkhandev.com",
        //     senderName: requestData.senderId.firstName,
        //     receiverName: requestData.receiverId.firstName,
        //     status: requestData.status,
        // });
        // console.log("Email sent:", emailRes);




        return res.status(200).json({
            message: `${requestData.senderId.firstName}  ${status} ${requestData.receiverId.firstName}`,
            Data: requestData
        });
    } catch (error) {
        res.json({
            error: error.message,
        });
    }
}

async function requestRespond(req, res) {

    try {

        const receiverId = req.userId;
        const { requestId, status } = req.params;



        //checking if the requestId is valid
        if (!mongoose.Types.ObjectId.isValid(requestId)) {
            return res.status(400).json({
                message: "The requestId is invalid."
            })
        }

        //Two status will be allowed. Accepted and Ignored.
        const allowedStatus = ["accepted", "rejected"]
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

        //if the status is ignored then it can't be accepted or rejected.
        if (request.status === "ignored") {
            return res.status(400).json({
                message: "This request has already been ignored."
            });
        }


        //check if the request is already accepted or ignored. 
        if (allowedStatus.includes(request.status)) {
            return res.status(400).json({
                message: `This request has already been ${request.status} and cannot be changed.`
            });
        }

        request.status = status;
        await request.save();

        await request.populate([
            { path: 'senderId', select: 'firstName lastName' },
            { path: 'receiverId', select: 'firstName lastName' }
        ]);

        return res.status(200).json({
            message: `Connection has been ${status}`,
            senderName: request.senderId.firstName + " " + request.senderId.lastName,
            receiverName: request.receiverId.firstName + " " + request.receiverId.lastName,
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
    requestRespond
};
