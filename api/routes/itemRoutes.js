const express = require("express");
const router = express.Router();
const Controllers = require("../controllers"); //index.js
const { storage } = require("../cloudinary");
const multer = require("multer");
const upload = multer({ storage });
// const uploadFile = require("../middleware/uploads");

router.get("/", (req, res) => {
  Controllers.itemController.getItems(res);
});

router.get("/reporteditems", (req, res) => {
  Controllers.itemController.getReportedItems(req, res);
});

router.get("/numalerts", (req, res) => {
  Controllers.itemController.getNumOfAlerts(req, res);
});

router.get("/:id", (req, res) => {
  Controllers.itemController.getItem(req, res);
});

router.post("/create", upload.single("file"), (req, res) => {
  Controllers.itemController.createItem(req, res);
});

router.put("/:id", (req, res) => {
  Controllers.itemController.updateItem(req, res);
});
router.delete("/:id", (req, res) => {
  Controllers.itemController.deleteItem(req, res);
});

module.exports = router;
