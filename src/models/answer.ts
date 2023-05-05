import { Schema, model, models } from "mongoose";

const answerSchema = new Schema({
  user: { type: String, required: true },
  answer: { type: String, required: true },
  doubt_id: { type: String, required: true },
  date: { type: Date, default: Date.now },
  parent_id: { type: String },
  liked_users: { type: Array, default: [] },
});

const Answer = models.Answer || model("Answer", answerSchema);

export default Answer;
