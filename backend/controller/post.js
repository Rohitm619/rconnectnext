import Post from "../model/Post";
import User from "../model/User";

export const getAllPosts = async (req, res, next) => {
  let posts;
  try {
    posts = await Post.find({});
  } catch (err) {
    console.log(err);
  }

  if (!posts) {
    return res.status(404).json({ message: "No post found" });
  }

  return res.status(200).json({ posts });
};

export const addPost = async (req, res, next) => {
  const { image, caption, userId } = req.body;

  const post = new Post({
    image,
    caption,
    userId,
  });

  try {
    await post.save();
  } catch (err) {
    console.log(err);
  }

  return res.status(201).json({ post });
};

export const getUserPosts = async (req, res, next) => {
  let userId = req.params.userid;
  let posts;

  try {
    posts = await Post.find({ userId: userId });
  } catch (err) {
    return res.status(404).json({ message: "Couldn't find the post" });
  }

  return res.status(201).json({ posts });
};

export const getPost = async (req, res, next) => {
  let postId = req.params.postid;
  let post;

  try {
    post = await Post.findOne({ _id: postId });
  } catch (err) {
    return res.status(404).json({ message: "Couldn't find the post" });
  }

  return res.status(201).json(post);
};

export const updatePost = async (req, res, next) => {
  let myid = req.params.postid;
  let updates = req.body;
  let result;

  try {
    result = await Post.updateOne({ _id: myid }, { $set: updates });
  } catch (err) {
    return res.status(404).json({ message: "Couldn't find the user" });
  }
  return res.status(200).json({ result });
};

export const deletePost = async (req, res, next) => {
  let myid = req.params.postid;
  let result;

  try {
    result = await Post.deleteOne({ _id: myid });
  } catch (err) {
    return res.status(404).json({ message: "Couldn't find the user" });
  }
  return res.status(200).json({ result });
};

export const getFriendsPosts = async (req, res, next) => {
  let userId = req.params.userid;
  let user;
  let friends;
  var friendsPosts = [];

  try {
    user = await User.findOne({ _id: userId });
    friends = user.friendList;
    console.log(friends);
    for (let friend = 0; friend < friends.length; friend++) {
      let frindsprof = await User.findOne({ email: friends[friend] });
      // console.log(frindsprof);
      if (frindsprof !== null) {
        let friendsuserId = frindsprof._id;
        let friendPost = await Post.find({ userId: friendsuserId });
        friendsPosts = [...friendsPosts, ...friendPost];
      }
    }
  } catch (err) {
    console.log(err);
    return res.status(404).json({ message: "Couldn't find the post" });
  }

  return res.status(201).json({ friendsPosts });
};
