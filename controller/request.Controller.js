const { ConnectionRequest } = require("../model/connectionRequest.model");
const { userModel } = require("../model/user.model");

async function requestSend(req, res) {
    try {
        const senderId = req.userId;
        const receiverId = req.params.receiverId;
        const status = req.params.status;

        // Allowed status to be send.
        const allowedStatus = ["ignored", "interested"];

        if (!allowedStatus.includes(status)) {
            return res.status(400).json({
                message: "Invalid status type: " + status,
            });
        }

        // checking whether the reciver present in the Database.

        const existReciver = await userModel.findById(receiverId);
        if (!existReciver) {
            return res.status(400).json({
                message: "Reciver user doesn't exist."
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

        const connectionRequest = await new ConnectionRequest({
            senderId,
            receiverId,
            status,
        });

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
