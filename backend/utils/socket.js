const socket = require("socket.io");
const crypto = require("crypto");
const Chat = require("../model/chat.model");
const { userModel } = require("../model/user.model");

const getSecretRoomId = (senderId, receiverId) => {
    return crypto
        .createHash("sha256")
        .update([senderId, receiverId].sort().join("$"))
        .digest("hex");
};

const onlineUsers = new Map();

const initializeSocket = (server) => {
    const io = socket(server, {
        cors: {
            origin: [
                "http://localhost:5000",
                "https://devmatching.faisalkhandev.com"
            ],
        },
    });

    io.on("connection", (socket) => {
        console.log(`[SOCKET] Client connected: ${socket.id}`);

        socket.on("joinChat", ({ senderId, receiverId, firstName, lastName }) => {
            const roomId = getSecretRoomId(senderId, receiverId);
            console.log(`[JOIN] User ${senderId} joined room: ${roomId}`);
            onlineUsers.set(senderId, socket.id);
            io.emit("updateUserStatus", Array.from(onlineUsers.keys()));
            socket.join(roomId);
        });

        socket.on("sendMessage", async ({ firstName, senderId, receiverId, text, time }) => {
            console.log(`[SEND] Received message from ${senderId} to ${receiverId}: "${text}"`);
            try {
                const roomId = getSecretRoomId(senderId, receiverId);

                let chat = await Chat.findOne({
                    participants: { $all: [senderId, receiverId] }
                });

                if (!chat) {
                    console.log(`[DB] No chat found. Creating new chat for ${senderId} & ${receiverId}`);
                    chat = new Chat({
                        participants: [senderId, receiverId],
                        messages: []
                    });
                }

                const messageTime = new Date();
                const newMessage = {
                    senderId,
                    text,
                    createdAt: messageTime
                };

                chat.messages.push(newMessage);
                await chat.save();

                console.log(`[SEND] Emitting message to room ${roomId}`);
                io.to(roomId).emit("receiveMessage", {
                    text,
                    time: messageTime,
                    firstName,
                    senderId,
                    receiverId
                });
            } catch (error) {
                console.error("[ERROR] Error sending message:", error);
            }
        });

        socket.on("disconnect", async () => {
            console.log(`[SOCKET] Client disconnected: ${socket.id}`);
            for (const [userId, socketId] of onlineUsers.entries()) {
                if (socketId === socket.id) {
                    onlineUsers.delete(userId);
                    try {
                        await userModel.findByIdAndUpdate(userId, {
                            lastSeen: new Date(),
                        });
                        console.log(`[STATUS] Updated lastSeen for ${userId}`);
                    } catch (err) {
                        console.error("[ERROR] Updating last seen:", err);
                    }
                    break;
                }
            }
            io.emit("updateUserStatus", Array.from(onlineUsers.keys()));
        });
    });
};


module.exports = initializeSocket;