import User from "../model/User";
import bcrypt from "bcryptjs";
import Jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const getAllUser = async (req, res, next) => {
  let users;
  try {
    users = await User.find({});
  } catch (err) {
    console.log(err);
  }

  if (!users) {
    return res.status(404).json({ message: "No users found" });
  }

  return res.status(200).json({ users });
};

export const signUp = async (req, res, next) => {
  const {
    firstname,
    lastname,
    email,
    password,
    profileImage,
    friendList,
    pendingFriendList,
  } = req.body;
  let existingUser;

  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    console.log(err);
  }

  if (existingUser) {
    // console.log(existingUser);
    return res.status(400).json({ message: "User already exists!" });
  }

  const hashedPassword = bcrypt.hashSync(password);

  const user = new User({
    firstname,
    lastname,
    email,
    password: hashedPassword,
    profileImage,
    friendList,
    pendingFriendList,
  });

  try {
    await user.save();
  } catch (err) {
    console.log(err);
  }

  return res.status(201).json({ user });
};

export const signIn = async (req, res, next) => {
  const { email, password } = req.body;
  let existingUser;

  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    console.log(err);
  }

  if (!existingUser) {
    return res.status(404).json({ message: "User not exists! Please Signup!" });
  } else {
    let isValidPassword = bcrypt.compareSync(password, existingUser.password);
    if (isValidPassword) {
      Jwt.sign(
        { existingUser },
        process.env.JWT_SECRET_Key,
        { expiresIn: "5m" },
        (err, token) => {
          if (err) {
            console.log(err);
            return res.status(400).json({ message: "Something went wrong!" });
          }
          return res.status(201).json({ message: "Login Successful!", token });
        }
      );
    } else {
      return res.status(400).json({ message: "Invalid Credentials!" });
    }
  }
};

export const getUser = async (req, res, next) => {
  let user;
  let id = req.user.existingUser._id;
  try {
    user = await User.findOne({ _id: id });
  } catch (err) {
    console.log(err);
    return res.status(404).json({ message: "Couldn't find the user" });
  }
  return res.status(200).json({ user });
};

export const myProfile = async (req, res, next) => {
  let user = req.user.existingUser;
  return res.status(200).json({ user });
};

export const updateUser = async (req, res, next) => {
  let myid = req.params.userid;
  let updates = req.body;
  let result;

  try {
    result = await User.updateOne({ _id: myid }, { $set: updates });
  } catch (err) {
    return res.status(404).json({ message: "Couldn't find the user" });
  }
  return res.status(200).json({ result });
};

export const deleteUser = async (req, res, next) => {
  let myid = req.params.userid;
  let result;

  try {
    result = await User.deleteOne({ _id: myid });
  } catch (err) {
    return res.status(404).json({ message: "Couldn't find the user" });
  }

  if (result.deletedCount === 0)
    return res.status(404).json({ message: "Couldn't find the user" });
  return res.status(200).json({ result });
};

export const getFriends = async (req, res, next) => {
  let myid = req.params.userid;
  let result;

  try {
    result = await User.findOne({ _id: myid });
  } catch (err) {
    console.log(err);
    return res.status(404).json({ message: "Couldn't find the user" });
  }

  return res.status(200).json(result.friendList);
};

export const getPendingFriends = async (req, res, next) => {
  let myid = req.params.userid;
  let result;

  try {
    result = await User.findOne({ _id: myid });
  } catch (err) {
    return res.status(404).json({ message: "Couldn't find the user" });
  }

  return res.status(200).json(result.pendingFriendList);
};
