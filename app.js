// DEPENDENCIES
const cors = require("cors");
const express = require("express");
const morgan = require("morgan");

// CONFIGURATION
const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));

// ROUTES
app.get("/", (req, res) => {
  res.send("Welcome to Bookmarks App");
});

const usersController = require("./controllers/usersController.js");
app.use("/users", usersController);

const bookmarksController = require("./controllers/bookmarksController.js");
app.use("/bookmarks", bookmarksController);

// Not needed for this application's features
const reviewsController = require("./controllers/reviewsController.js");
app.use("/reviews", reviewsController);

// 404 PAGE
app.get("*", (req, res) => {
  res.status(404).send("Page not found");
});

// EXPORT
module.exports = app;
