"use strict";
const Models = require("../models");
const { cloudinary } = require("../cloudinary");

const getVehicles = (res) => {
  Models.Vehicle.find({})
    .then((data) => res.send({ result: 200, data: data }))
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

const getVehicle = (req, res) => {
  const { id } = req.params;
  Models.Vehicle.find({ _id: id })
    .then((data) => res.send({ result: 200, data: data }))
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

const getReportedVehicles = (res) => {
  Models.Vehicle.find({ alert: true })
    .then((data) => res.send({ result: 200, data: data }))
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

const createVehicle = (req, res) => {
  const fileUrl = req.file.path;
  const fileName = req.file.filename;
  const { assignedTo, make, model, plate, odo, wof, rego, rucs } = req.body;
  const newVehicle = {
    assignedTo: assignedTo,
    make: make,
    model: model,
    plate: plate,
    odo: odo,
    wof: wof,
    rego: rego,
    rucs: rucs,
    photo: { url: fileUrl, fileName: fileName },
  };
  new Models.Vehicle(newVehicle)
    .save()
    .then((data) => res.send({ result: 200, data: data }))
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

const updateVehicle = (req, res) => {
  Models.Vehicle.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
  })
    .then((data) => res.send({ result: 200, data: data }))
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

const deleteVehicle = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedItem = await Models.Vehicle.findOneAndDelete({ _id: id });
    await cloudinary.uploader.destroy(deletedItem.photo.fileName);
    res.send({ result: 200, data: data });
  } catch (err) {
    res.send({ result: 500, error: err.message });
  }
};

module.exports = {
  createVehicle,
  deleteVehicle,
  getVehicles,
  getVehicle,
  updateVehicle,
  getReportedVehicles,
};
