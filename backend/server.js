import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/user";
import postRouter from "./routes/post";
import dotenv from "dotenv";
import cors from "cors";
import { Server } from "socket.io";
import http from "http";
import chatRouter from "./routes/chat";
import messageRouter from "./routes/message";

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());

app.use(userRouter);
app.use(postRouter);
app.use("/chats", chatRouter);
app.use("/message", messageRouter);

const PORT = process.env.PORT || 5000;
const MongoDbURL = process.env.MongoDbURL;

const expServer = mongoose
  .connect(MongoDbURL)
  .then(() => app.listen(PORT))
  .then((server) => {
    const io = new Server(server, {
      cors: {
        origin: "http://localhost:3000/",
        methods: ["GET", "POST"],
      },
    });

    io.on("connection", (socket) => {
      console.log(`User connected : ${socket.id}`);

      socket.on("send_message", (data) => {
        socket.broadcast.emit("recieve_message", data);
      });

      socket.on("disconnect", () => {
        console.log("user disconnected");
      });
    });
  })
  .catch((err) => console.log(err));
