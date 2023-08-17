import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/user";
import postRouter from "./routes/post";
import dotenv from "dotenv";
import cors from "cors";

const app = express();
dotenv.config();

app.use(cors());

app.use(express.json());
app.use(cors());
app.use(userRouter);
app.use(postRouter);

const PORT = process.env.PORT || 5000;
const MongoDbURL = process.env.MongoDbURL;

mongoose
  .connect(MongoDbURL)
  .then(() => app.listen(PORT))
  .then(() => console.log("Connected!"))
  .catch((err) => console.log(err));
