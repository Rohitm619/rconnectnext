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
  getUserById,
  getUserByText,
  getUserByTwoTexts,
  updateUserFriendList,
  updateUserPendingFriendList,
  updateUserSentFriendReqList,
} from "../controller/user";
import { verifyUser } from "../middleware/user";

const userRouter = express.Router();

userRouter.get("/getallusers", getAllUser);
userRouter.get("/getuser", verifyUser, getUser);
userRouter.get("/getuserbyid/:userid", verifyUser, getUserById);
userRouter.get("/getuserbytext/:text", verifyUser, getUserByText);
userRouter.get(
  "/getuserbytext/:firstname/:lastname",
  verifyUser,
  getUserByTwoTexts
);
userRouter.get("/myprofile", verifyUser, myProfile);
userRouter.post("/signup", signUp);
userRouter.post("/signin", signIn);
userRouter.patch("/updateuser/:userid", verifyUser, updateUser);
userRouter.patch(
  "/updateuserfriendlist/:userid/:isdelete?",
  verifyUser,
  updateUserFriendList
);
userRouter.patch(
  "/updateuserpendingfriendlist/:userid/:isdelete?",
  verifyUser,
  updateUserPendingFriendList
);

userRouter.patch(
  "/updateusersentfriendreqlist/:userid/:isdelete?",
  verifyUser,
  updateUserSentFriendReqList
);
userRouter.delete("/deleteuser/:userid", verifyUser, deleteUser);
userRouter.get("/getfriends/:userid", verifyUser, getFriends);
userRouter.get("/getpendingfriends/:userid", verifyUser, getPendingFriends);
userRouter.patch("/changepassword", verifyUser, changePassword);

export default userRouter;
