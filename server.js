const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*", // change to frontend domain later
    methods: ["GET", "POST"]
  }
});

app.get("/", (req, res) => {
  res.send("Hello from Northflank + Socket.IO 🚀");
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("message", (msg) => {
    console.log("Message:", msg);
    io.emit("message", msg);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 8080; 
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
