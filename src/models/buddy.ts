import { Schema, model, models } from "mongoose";

const buddySchema = new Schema({
  course_id: { type: String, required: true },
  user: { type: String, required: true },
  date: { type: Date, default: Date.now },
  message: { type: String, required: true },
  buddyType: { type: String, required: true },
  money: { type: String },
  applied_users: { type: Array, default: [] },
});

const Buddy = models.Buddy || model("Buddy", buddySchema);

export default Buddy;
