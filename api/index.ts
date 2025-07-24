const express = require("express");
const app = express();
const cors = require("cors");

app.get("/", (req, res) =>
  res.json({ message: "Hello from Express on Vercel" })
);
app.get("/hello", (req, res) => res.send("Helloooooo"));

const dbconnect = require("./db.connect");
const userRoutes = require("./routes/userRoutes");
const itemRoutes = require("./routes/itemRoutes");
const vehicleRoutes = require("./routes/vehicleRoutes");

app.use(cors());
app.use(express.json());
app.use("/", express.static("public"));

app.use("/users", userRoutes);
app.use("/items", itemRoutes);
app.use("/vehicles", vehicleRoutes);

app.listen(3000, () => console.log("Server ready on port 3000."));

module.exports = app;
