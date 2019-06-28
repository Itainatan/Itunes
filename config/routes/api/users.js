const express = require("express");
const router = express.Router();

// Load User model
const User = require("../../models/user");

//@route POST api/users/current
router.post("/current", async (req, res) => {
  const { email } = req.body;
  console.log(User);
  // let user = await User.findOne({ email });
  // console.log(user);
  // if (!user) {
  //   const error = "User not found";
  //   return res.json(error);
  // }
  // return res.json(user);
  return res.send("respnde success from server");
});

module.exports = router;
