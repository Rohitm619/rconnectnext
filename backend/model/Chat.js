import mongoose from "mongoose";

const Schema = mongoose.Schema;

const chatSchema = new Schema(
  {
    members: Array,
  },
  { timestamps: true }
);

export default mongoose.model("Chat", chatSchema);
