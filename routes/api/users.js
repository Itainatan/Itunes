const express = require("express");
const router = express.Router();

// Load User model
const User = require("../../config/models/user");

//for Login
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email: email })
    .then(user => {
      if (!user || user.password !== password) res.status(404).json("User not found");
      else res.status(200).json({ success: true, user });
    })
    .catch(err => { });
});

// for SignUp
router.post("/signUp", (req, res) => {
  const { username, password, email } = req.body;
  User.findOne({ email: email })
    .then(user => {
      if (user !== null) return res.status(404).json("User already exist");
      else {
        const newUser = { username, password, email }
        User.collection.insertOne(newUser);
        return res.json({ success: true, newUser });
      }
    })
    .catch(err => { });
});

module.exports = router;
