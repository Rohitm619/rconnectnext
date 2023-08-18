import express from "express";
import {
  deleteUser,
  getAllUser,
  getFriends,
  getPendingFriends,
  getUser,
  signIn,
  signUp,
  updateUser,
  myProfile,
  changePassword,
} from "../controller/user";
import { verifyUser } from "../middleware/user";

const userRouter = express.Router();

userRouter.get("/getallusers", getAllUser);
userRouter.get("/getuser", verifyUser, getUser);
userRouter.get("/myprofile", verifyUser, myProfile);
userRouter.post("/signup", signUp);
userRouter.post("/signin", signIn);
userRouter.patch("/updateuser/:userid", verifyUser, updateUser);
userRouter.delete("/deleteuser/:userid", verifyUser, deleteUser);
userRouter.get("/getfriends/:userid", verifyUser, getFriends);
userRouter.get("/getpendingfriends/:userid", verifyUser, getPendingFriends);
userRouter.patch("/changepassword", verifyUser, changePassword);

export default userRouter;
