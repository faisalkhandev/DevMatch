const { ConnectionRequest } = require("../model/connectionRequest.model");




async function requestSend(req, res) {

    try {
        const receiverId = req.userId;

        const senderId = req.params.senderId;

        const status = req.params.status;


        const connectionRequest = await new ConnectionRequest({
            receiverId,
            senderId,
            status
        })

        const requestData = await connectionRequest.save();

        res.status(200).json({
            message: "the connection has been send successfully.",
            requestData
        })


    } catch (error) {
        res.json({
            error: error.message
        })
    }



}




module.exports = {
    requestSend
}