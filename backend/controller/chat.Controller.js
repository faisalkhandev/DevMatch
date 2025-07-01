const Chat = require("../model/chat.model");

async function getChat(req, res) {
    const userId = req.userId;
    const { targetUserId } = req.params;

    console.log("userId, targetId", userId, targetUserId)

    try {
        const userChat = await Chat.findOne({
            participants: { $all: [userId, targetUserId] }
        }).populate({
            path: "messages.senderId",
            select: "firstName lastName",
        });

        // If no chat found, return empty messages
        if (!userChat) {
            return res.status(200).json({
                message: "No chat available.",
                messages: [],
            });
        }

        // Format messages
        const formattedMessages = userChat.messages.map(msg => ({
            senderId: msg.senderId._id,
            firstName: msg.senderId.firstName,
            lastName: msg.senderId.lastName,
            text: msg.text,
            
        }));

        return res.status(200).json({
            success: true,
            messages: formattedMessages,
        });

    } catch (error) {
        console.error("Error fetching chat:", error);
        res.status(500).json({
            success: false,
            message: "Getting chat error.",
            error: error.message,
        });
    }
}

module.exports = { getChat };
