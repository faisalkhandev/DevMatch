const mongoose = require('mongoose');


const connectionRequestSchema = new mongoose.Schema({

    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
        index: true,
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
        index: true,
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

// Compound index(more than 1 index together) on senderId and receiverId to optimize queries between users
// The '1' means the index is sorted in ascending order (default)
// Helps quickly find or prevent connection requests between two specific users
connectionRequestSchema.index({ senderId: 1, receiverId: 1 })


const ConnectionRequest = new mongoose.model("ConnectionRequest", connectionRequestSchema)

module.exports = {
    ConnectionRequest
}