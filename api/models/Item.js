const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ItemSchema = new Schema({
  assignedTo: { type: String, required: true },
  brand: { type: String, trim: true, required: true },
  type: { type: String, trim: true },
  description: { type: String },
  alert: { type: Boolean, default: false },
  alertDescription: { type: String },
  lent: { type: Boolean, default: false },
  lentTo: { type: String, trim: true },
  photo: {
    url: { type: String, default: "" },
    fileName: { type: String, default: "" },
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
module.exports = mongoose.model("item", ItemSchema);
