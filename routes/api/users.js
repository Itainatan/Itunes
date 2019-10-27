const express = require("express");
const router = express.Router();

// Load User model
const User = require("../../config/models/user");
const Chat = require("../../config/models/chat");

router.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  //Find user by email
  User.findOne({ username: username })
    .then(user => {
      // Check for user
      if (!user || user.password !== password) {
        return res.status(404).json("User not found");
      }
      Chat.find({
        $or: [{ username1: username }, { username2: username }]
      })
        .then(chats => {
          res.json({ success: true, chats: chats });
        })
        .catch(err => {
          console.error(err);
        });
    })
    .catch(err => {
      console.error(err);
    });
});

module.exports = router;
