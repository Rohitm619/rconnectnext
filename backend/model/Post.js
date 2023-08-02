import mongoose from "mongoose";

const Schema = mongoose.Schema;

const postSchema = new Schema({
  image: {
    type: String,
  },
  caption: {
    type: String,
  },
  userId: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Post", postSchema);
