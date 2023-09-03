import express from "express";
import { createChat, findChat, findUserChats } from "../controller/chat";
const chatRouter = express.Router();

chatRouter.post("/createchat", createChat);
chatRouter.get("/findchats/:userId", findUserChats);
chatRouter.get("/findchat/:firstId/:secondId", findChat);
export default chatRouter;
