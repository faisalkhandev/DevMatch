const socket = require("socket.io");

const initializeSocket = (server) => {
    const io = socket(server, {
        cors: {
            origin: "http://localhost:5000",
        },
    });

    io.on("connection", (socket) => {

        //user can join the chat.
        socket.on("joinChat", ({ userId, targetUserId, firstName, lastName }) => {
            const roomId = [userId, targetUserId].sort().join("-");
            console.log(firstName, lastName + "joining the room", roomId,)
            socket.join(roomId);
        });

        //user can send the message.
        socket.on("sendMessage", (message) => {
            io.emit("message", message);
        });

        //user disconnect the socket.
        socket.on("disconnect", () => {
            console.log("A user disconnected");
        });
    });
};

module.exports = initializeSocket;
