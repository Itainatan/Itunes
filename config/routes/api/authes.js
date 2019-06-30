const express = require("express");
const router = express.Router();
const axios = require("axios");

router.post("/captcha", async (req, res) => {
  const { token } = req.body;

  let respons = await axios.get(
    `https://www.google.com/recaptcha/api/siteverify?secret=6LepYasUAAAAAGmjTKlRvFSBymhKP59FNXB3Vaa8&response=${token}`
  );
  console.log(respons.data);
  return respons.data.score >= 0.5
    ? res.status(200).json({ success: true })
    : res.status(402).json({ success: false });
});

module.exports = router;
