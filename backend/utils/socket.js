const socket = require("socket.io");
const crypto = require("crypto");
const Chat = require("../model/chat.model");

const getSecretRoomId = (senderId, receiverId) => {
    return crypto
        .createHash("sha256")
        .update([senderId, receiverId].sort().join("$"))
        .digest("hex");
};

const initializeSocket = (server) => {
    const io = socket(server, {
        cors: {
            origin: "http://localhost:5000",
        },
    });

    io.on("connection", (socket) => {

        //user can join the chat.
        socket.on("joinChat", ({ senderId, receiverId, firstName, lastName }) => {
            const roomId = getSecretRoomId(senderId, receiverId)
            console.log("roomID::", roomId)
            socket.join(roomId);
        });

        //user can send the message.
        socket.on("sendMessage", async ({ firstName, senderId, receiverId, text, time }) => {
            try {
                const roomId = getSecretRoomId(senderId, receiverId)
                console.log(firstName + " says " + text, time)

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
                    time: messageTime, // Use the actual saved timestamp
                    firstName,
                    senderId,
                    receiverId
                });
            } catch (error) {
                console.log("error at sending msg: ", error)
            }
        });

        //user disconnect the socket.
        socket.on("disconnect", () => {
            console.log(`❌ User disconnected: ${socket.id}`);
        });

    });
};

module.exports = initializeSocket;