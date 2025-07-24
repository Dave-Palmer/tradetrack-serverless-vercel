const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const VehicleSchema = new Schema({
  assignedTo: { type: String, required: true },
  make: { type: String, trim: true, required: true },
  model: { type: String, trim: true, required: true },
  plate: { type: String, trim: true, required: true },
  odo: { type: Number, trim: true, required: true },
  wof: { type: String, trim: true, required: true },
  rego: { type: String, trim: true, required: true },
  rucs: { type: Number, trim: true },
  alert: { type: Boolean, default: false },
  alertDescription: { type: String, trim: true },
  photo: {
    url: { type: String, default: "" },
    fileName: { type: String, default: "" },
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
module.exports = mongoose.model("vehicle", VehicleSchema);
