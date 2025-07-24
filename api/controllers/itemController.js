const { cloudinary } = require("../cloudinary");

("use strict");
const Models = require("../models"); //matches index.js

const getItems = (res) => {
  Models.Item.find({})
    .then((data) => res.send({ result: 200, data: data }))
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

const getItem = (req, res) => {
  const { id } = req.params;
  Models.Item.find({ _id: id })
    .then((data) => res.send({ result: 200, data: data }))
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

const getReportedItems = (req, res) => {
  Models.Item.find({ alert: true })
    .then((data) => res.send({ result: 200, data: data }))
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

const getNumOfAlerts = async (req, res) => {
  let numOfAlerts;
  try {
    const itemsCount = await Models.Item.count({ alert: true });
    const vehiclesCount = await Models.Vehicle.count({ alert: true });
    numOfAlerts = itemsCount + vehiclesCount;
    res.send({ numOfAlerts });
  } catch (err) {
    res.send({ result: 500, error: err.message });
  }
};

const createItem = (req, res) => {
  const fileUrl = req.file.path;
  const fileName = req.file.filename;
  const { assignedTo, brand, type, description } = req.body;
  const newItem = {
    assignedTo: assignedTo,
    brand: brand,
    type: type,
    description: description,
    photo: { url: fileUrl, fileName: fileName },
  };
  new Models.Item(newItem)
    .save()
    .then((data) => res.send({ result: 200, data: data }))
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

const updateItem = (req, res) => {
  Models.Item.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
  })
    .then((data) => res.send({ result: 200, data: data }))
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

//Delete image from cloudinary also ---
const deleteItem = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedItem = await Models.Item.findOneAndDelete({ _id: id });
    await cloudinary.uploader.destroy(deletedItem.photo.fileName);
    res.send({ result: 200, data: data });
  } catch (err) {
    res.send({ result: 500, error: err.message });
  }
};
module.exports = {
  createItem,
  deleteItem,
  getItems,
  getItem,
  updateItem,
  getReportedItems,
  getNumOfAlerts,
};
