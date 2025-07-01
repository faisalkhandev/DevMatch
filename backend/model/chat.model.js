const mongoose = require("mongoose")


const chatSchema = new mongoose.Schema({

    // participants will have senderId and recieverId
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }],
    messages: [{
        senderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        text: {
            type: String,
            required: true,
        },
    }],
},
    {
        timestamps: true
    }

)

const Chat = new mongoose.model("Chat", chatSchema)

module.exports = Chat