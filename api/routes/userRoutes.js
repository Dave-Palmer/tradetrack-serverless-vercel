let express = require("express");
let router = express.Router();
let Controllers = require("../controllers"); //index.js
let auth = require("../middleware/auth");

router.get("/", auth, (req, res) => {
  Controllers.userController.getUsers(res);
});

router.get("/usernames", auth, (req, res) => {
  Controllers.userController.getAllUserNames(req, res);
});

router.get("/demoadminlogin", (req, res) => {
  Controllers.userController.getAdminLoginInfo(req, res);
});

router.get("/demostafflogin", (req, res) => {
  Controllers.userController.getStaffLoginInfo(req, res);
});

router.post("/create", auth, (req, res) => {
  Controllers.userController.createUser(req, res);
});

router.put("/:id", auth, (req, res) => {
  Controllers.userController.updateUser(req, res);
});

router.post("/user/login", (req, res) => {
  Controllers.userController.loginUser(req, res);
});

router.delete("/:id", auth, (req, res) => {
  Controllers.userController.deleteUser(req, res);
});

module.exports = router;
