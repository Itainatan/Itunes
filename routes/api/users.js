const express = require("express");
const router = express.Router();

// Load User model
const User = require("../../config/models/user");

//@route POST api/users/current
router.post("/current", async (req, res) => {
  const { email } = req.body;
  let user = await User.findOne({ email });
  if (!user) {
    const error = "User not found";
    return res.status(404).json({ error: "User not found" });
  }
  return res.json(user);
});

module.exports = router;
