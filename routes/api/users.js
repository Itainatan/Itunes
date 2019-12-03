const express = require("express");
const router = express.Router();

// Load User model
const User = require("../../config/models/user");

router.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  console.log(req.body)
  // res.json({ success: true });
  //Find user by email
  try {
      User.findOne({ username: username })
        .then(user => {
          console.log(user)
          // Check for user
          if (!user || user.password !== password) {
            return res.status(404).json("User not found");
          }
            res.json({ success: true, user });
        })
        .catch(err => {
          console.error(err);
        });
    }
  catch(e){
        console.log(e)
  }
});
  
  

module.exports = router;
