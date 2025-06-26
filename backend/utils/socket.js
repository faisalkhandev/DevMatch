const socket = require("socket.io");
const crypto = require("crypto")


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
        socket.on("sendMessage", ({ firstName, senderId, receiverId, text, time }) => {
            const roomId = getSecretRoomId(senderId, receiverId)
            console.log(firstName + " says " + text, time)
            io.to(roomId).emit("receiveMessage", { text, time, firstName, senderId, receiverId });
        });

        //user disconnect the socket.
        socket.on("disconnect", () => {
            console.log(`❌ User disconnected: ${socket.id}`);
        });

    });
};

module.exports = initializeSocket;
