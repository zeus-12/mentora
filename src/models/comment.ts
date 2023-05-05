import { Schema, model, models } from "mongoose";

const commentSchema = new Schema({
  course_id: { type: String, required: true },
  user: { type: String, required: true },
  comment: { type: String, required: true },
  date: { type: Date, default: Date.now },
  parent_id: { type: String },
  liked_users: { type: Array, default: [] },
});

const Comment = models.Comment || model("Comment", commentSchema);

export default Comment;
