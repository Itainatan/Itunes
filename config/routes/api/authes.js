const express = require("express");
const router = express.Router();
const axios = require("axios");
const secretCaptcha = require("../../keys").secretCaptcha;

router.post("/captcha", async (req, res) => {
  const { token } = req.body;
  console.log(secretCaptcha);
  let respons = await axios.get(
    `https://www.google.com/recaptcha/api/siteverify?secret=${secretCaptcha}&response=${token}`
  );
  console.log(respons.data);
  return respons.data.score >= 0.5
    ? res.status(200).json({ success: true })
    : res.status(402).json({ success: false });
});

module.exports = router;
