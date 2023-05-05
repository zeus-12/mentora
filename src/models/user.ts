import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  email: { type: String, required: true },
  name: { type: String, required: true },
  image: { type: String, required: true },
  status: { type: String, default: "ACTIVE", required: true },
});

const User = models.User || model("User", userSchema);

export default User;
