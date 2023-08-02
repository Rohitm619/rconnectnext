import express from "express";
import {
  getAllPosts,
  addPost,
  getUserPosts,
  getPost,
  updatePost,
  deletePost,
  getFriendsPosts,
} from "../controller/post";

const postRouter = express.Router();

postRouter.get("/getallposts", getAllPosts);
postRouter.get("/getuserposts/:userid", getUserPosts);
postRouter.post("/addpost", addPost);
postRouter.get("/getpost/:postid", getPost);
postRouter.patch("/updatepost/:postid", updatePost);
postRouter.delete("/deletepost/:postid", deletePost);
postRouter.get("/getfriendsposts/:userid", getFriendsPosts);
// postRouter.get("/getpendingfriends/:id", getPendingFriends)

export default postRouter;
