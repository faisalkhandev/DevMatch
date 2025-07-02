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

        //user can join the chat.
        socket.on("joinChat", ({ senderId, receiverId, firstName, lastName }) => {
            const roomId = getSecretRoomId(senderId, receiverId)

            onlineUsers.set(senderId, socket.id);

            io.emit("updateUserStatus", Array.from(onlineUsers.keys()));

            socket.join(roomId);
        });

        //user can send the message.
        socket.on("sendMessage", async ({ firstName, senderId, receiverId, text, time }) => {
            try {
                const roomId = getSecretRoomId(senderId, receiverId)

                let chat = await Chat.findOne({
                    participants: { $all: [senderId, receiverId] }
                })

                if (!chat) {
                    chat = new Chat({
                        participants: [senderId, receiverId],
                        messages: []
                    })
                }

                const messageTime = new Date();
                const newMessage = {
                    senderId,
                    text,
                    createdAt: messageTime // Add timestamp to the message
                };

                chat.messages.push(newMessage)
                await chat.save();

                // Send the timestamp back to clients
                io.to(roomId).emit("receiveMessage", {
                    text,
                    time: messageTime,
                    firstName,
                    senderId,
                    receiverId
                });
            } catch (error) {
                console.log("error at sending msg: ", error)
            }
        });

        //user disconnect the socket.
        socket.on("disconnect", async () => {
            for (const [userId, socketId] of onlineUsers.entries()) {
                if (socketId === socket.id) {
                    onlineUsers.delete(userId);
                    try {
                        await userModel.findByIdAndUpdate(userId, {
                            lastSeen: new Date(),
                        });
                    } catch (err) {
                        console.error("Error updating last seen:", err);
                    }

                    break;
                }
            }
            io.emit("updateUserStatus", Array.from(onlineUsers.keys()));
        });
    });
};

module.exports = initializeSocket;