const mongoose = require('mongoose');


const connectionRequestSchema = new mongoose.Schema({

    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    status: {
        type: String,
        enum: {
            values: ["interested", "rejected", "accepted", "ignored"],
            message: `{VALUE} is incorrect status type`
        }
    },
},
    {
        timestamps: true
    }

)


const ConnectionRequest = new mongoose.model("ConnectionRequest", connectionRequestSchema)

module.exports = {
    ConnectionRequest
}