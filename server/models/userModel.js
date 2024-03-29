import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Name is Required"] },
  email: { type: String, required: [true, "Email is Required"] },
  password: { type: String, required: [true, "Password is Required"] },
  isAdmin: { type: Boolean, default: false },
  isDoctor: { type: Boolean, default: false },
  notification: { type: Array, default: [] },
  seenNotification: { type: Array, default: [] },
});
const User = mongoose.model("users", userSchema);

export default User;
