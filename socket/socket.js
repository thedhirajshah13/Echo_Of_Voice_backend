import express from "express";
import { Server } from "socket.io";
import http from "http";

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["https://echoofvoices.netlify.app", "http://localhost:3000"],
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);
  const userId = socket.handshake.query.userId;

  if (userId) {
    console.log(`user ${userId} is connected with socket Id: ${socket.id}`);
  }

  socket.on("newComment", (commentData) => {
    io.emit("newComment", commentData);
    // console.log("New comment:", commentData);
  });

  socket.on("newLike", (likeData) => {
    io.emit("newLike", likeData);
    // console.log("New like:", likeData);
  });

  socket.on("disconnect", () => {
    console.log("a user disconnect", socket.id);
  });
});

export { app, io, server };
