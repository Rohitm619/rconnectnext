import express from "express";
import { createMessage, getMessages } from "../controller/message";
const messageRouter = express.Router();

messageRouter.post("/createmessage", createMessage);
messageRouter.get("/getmessages/:chatId", getMessages);

export default messageRouter;
