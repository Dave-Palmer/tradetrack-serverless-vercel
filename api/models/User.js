const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, trim: true, required: true },
  admin: { type: Boolean, trim: true, default: false },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phone: { type: String },
  token: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
module.exports = mongoose.model("user", UserSchema);
