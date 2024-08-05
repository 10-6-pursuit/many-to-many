const express = require("express");

// const { getBookmark } = require("../queries/bookmarks.js");
const users = express.Router({ mergeParams: true });
const {
  getAllUsers,
  getUser,
  newUser,
  deleteUser,
  updateUser,
  getAllBookmarksForUser,
  addNewBookmarkToUser,
} = require("../queries/users");

users.get("/", async (req, res) => {
  try {
    const allUsers = await getAllUsers();

    res.json(allUsers);
  } catch (err) {
    res.json(err);
  }
});

// SHOW
users.get("/:id", async (req, res) => {
  const { id } = req.params;
  const user = await getUser(id);
  if (user.length > 0) {
    res.json(user[0]);
  } else {
    res.status(404).json({ error: "not found" });
  }
});

// UPDATE
users.put("/:id", async (req, res) => {
  const { id } = req.params;
  const updatedUser = await updateUser(req.body);
  res.status(200).json(updatedUser);
});

users.post("/", async (req, res) => {
  const user = await newUser(req.body);
  res.json(user);
});

// DELETE
users.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const deletedUser = await deleteUser(id);
  res.status(200).json(deletedUser);
});

// All Bookmarks for one User
users.get("/:userId/bookmarks", async (req, res) => {
  const { userId } = req.params;
  const userBookmarks = await getAllBookmarksForUser(userId);
  res.json(userBookmarks);
});

// Add Bookmark to User's Collection
users.post("/:userId/bookmarks/:bookmarkId", async (req, res) => {
    const { userId, bookmarkId } = req.params;
  const successfulAdd = await addNewBookmarkToUser(userId, bookmarkId);
  if (successfulAdd) {
    res.status(201).json({ message: "ok" });
  } else {
    res.status(400).json({ info: successfulAdd });
  }
});

// TEST JSON NEW
// {
// "userer":"Lou",
// "title": "Fryin Better",
// "content": "With the great tips and tricks I found here",
// "bookmark_id": "2",
// "rating": "4"
// }
module.exports = users;
