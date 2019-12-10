const express = require("express");
const router = express.Router();

// Load User model
const User = require("../../config/models/user");

//for Login
router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  // res.status(200).json({ email });
  //Find user by user name
  User.findOne({ email: email })
    .then(user => {
      // Check for user
      if (!user || user.password !== password) {
        return res.status(404).json("User not found");
      }
      else res.json({ success: true, user });
    })
    .catch(err => {
      console.error(err);
    });
});

//for SignUp
router.post("/signUp", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  res.status(200).json({ username });
  //Find user by email
  User.findOne({ email: email })
    .then(user => {
      // Check for user
      if (!user) {
        const newUser = {
          username,
          password,
          email
        }
        User.collection.insert(newUser);
        return res.json({ success: true, newUser });
      }
      else res.status(404).json("User already exist");
    })
    .catch(err => {
      console.error(err);
    });
});

module.exports = router;
