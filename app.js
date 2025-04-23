// initialization
const express = require("express");
const app = express();

// module imports
require("dotenv").config();
const morgan = require("morgan");

// local imports
const authRoutes = require("./routes/authRoutes");
const linkRoutes = require("./routes/linkRoutes");

// middleware
app.use(express.json());
app.use(morgan("dev"));

// starting the server
app.listen(3000, () => {
  console.log("Server is now running!");
  console.log("Hope you get no bugs!");
});

// request
app.use("/auth", authRoutes);
app.use("/links", linkRoutes);

app.use((req, res) => {
  res.status(404).json({ msg: "Invalid request" });
});
