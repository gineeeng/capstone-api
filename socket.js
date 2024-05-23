// socket.js
const { Server } = require("socket.io");
let io;

function initialize(server) {
  io = new Server(server, {
    cors: { origin: ["*"] },
  });

  io.on("connection", (socket) => {
    console.log("a user connected");

    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  });
}

function getIO() {
  if (!io) {
    throw new Error("Socket.io not initialized!");
  }
  return io;
}

module.exports = {
  initialize,
  getIO,
};
