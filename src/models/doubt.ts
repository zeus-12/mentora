import { Schema, model, models } from "mongoose";

const doubtSchema = new Schema({
  course_id: { type: String, required: true },
  doubt: { type: String, required: true },
  title: { type: String, required: true },
  user: { type: String, required: true },
  status: { type: String, required: true, default: "PENDING" },
  date: { type: Date, default: Date.now },
});

const Doubt = models.Doubt || model("Doubt", doubtSchema);

export default Doubt;
