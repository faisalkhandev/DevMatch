const socket = require("socket.io");

const initializeSocket = (server) => {
    const io = socket(server, {
        cors: {
            origin: "http://localhost:5000",
        },
    });

    io.on("connection", (socket) => {

        //user can join the chat.
        socket.on("joinChat", ({ senderId, receiverId, firstName, lastName }) => {
            const roomId = [senderId, receiverId].sort().join("-");
            socket.join(roomId);
        });

        //user can send the message.
        socket.on("sendMessage", ({ firstName, senderId, receiverId, text, time }) => {
            const roomId = [senderId, receiverId].sort().join("-");
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
