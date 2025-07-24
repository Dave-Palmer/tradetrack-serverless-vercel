"use strict";
const Models = require("../models"); //matches index.js
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const createUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, phone } = req.body;
    if (!(email && password && firstName && lastName)) {
      res.status(400).send("All inputs are required");
    }
    const oldUser = await Models.User.findOne({ email });
    if (oldUser) {
      return res.status(409).send({ result: "User Already Exists" });
    }
    //Encrypt user password
    let encryptedPassword = await bcrypt.hash(password, 10);
    // Create user in the database
    const user = await Models.User.create({
      firstName,
      lastName,
      email: email.toLowerCase(),
      password: encryptedPassword,
      phone,
    });
    // Create token
    const token = jwt.sign({ user_id: user._id, email }, process.env.JWT_KEY, {
      expiresIn: "2h",
    });
    // save user token
    user.token = token;
    // return new user
    res.status(201).json(user);
  } catch (error) {
    console.log(error);
  }
};

const loginUser = async (req, res) => {
  try {
    console.log(process.env.JWT_KEY);
    // Get user input from request body
    const { email, password } = req.body;
    // Validate if user exists in the database
    const user = await Models.User.findOne({ email });
    // if they do exist, this will check to make sure their password matches using bcrypt compare
    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token for use based on their id and email
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.JWT_KEY,
        {
          expiresIn: "2h",
        }
      );

      user.token = token;
      // send back logged in user details including token
      res
        .status(200)
        .json({ result: "User successfully logged in", data: user });
      user;
      // res.status(200).json(user);
    } else res.status(400).json({ result: "Email or Password are invalid" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ result: err.message });
  }
};

const getUsers = (res) => {
  Models.User.find({ admin: false })
    .then((data) => {
      res.send({ result: 200, data: data });
    })
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

const getUser = (req, res) => {
  const { id } = req.params;
  Models.User.find({ _id: id })
    .then((data) => res.send({ result: 200, data: data }))
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

const getAllUserNames = (req, res) => {
  Models.User.find({ admin: false })
    .select("firstName lastName")
    .then((data) => res.send({ result: 200, data: data }))
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

const updateUser = (req, res) => {
  console.log(req.body);
  Models.User.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
  })
    .then((data) => res.send({ result: 200, data: data }))
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

const deleteUser = (req, res) => {
  console.log(req.params.id);
  Models.User.findOneAndDelete({ _id: req.params.id })
    .then((data) => res.send({ result: 200, data: data }))
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

//This function will run on server start up, it's used to create an admin user account
const createAdminUser = async () => {
  try {
    const [firstName, lastName, email, password] = [
      "Dave",
      "Palmer",
      "dave@palmer.com",
      "dave",
    ];
    const oldAdmin = await Models.User.findOne({ email });
    if (oldAdmin) {
      console.log("Admin user Exists");
      return;
    }
    //Encrypt user password
    let encryptedPassword = await bcrypt.hash(password, 10);
    // Create user in the database
    const user = await Models.User.create({
      firstName,
      lastName,
      email: email.toLowerCase(),
      password: encryptedPassword,
      admin: true,
    });
    console.log("admin user created " + user);
  } catch (error) {
    console.log(error);
  }
};

const getAdminLoginInfo = (req, res) => {
  const data = {
    email: "dave@palmer.com",
    password: "dave",
  };
  res.send(data);
};

const getStaffLoginInfo = (req, res) => {
  const data = {
    email: "rowan@thompson.com",
    password: "rowan",
  };
  res.send(data);
};

module.exports = {
  createUser,
  deleteUser,
  getUsers,
  getUser,
  updateUser,
  getAllUserNames,
  loginUser,
  createAdminUser,
  getAdminLoginInfo,
  getStaffLoginInfo,
};
