const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    console.log("boat");
    await fetch(
      "https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=1605763607&redirect_uri=https%3A%2F%2Fexample.com%2Fauth&state=12345abcde&scope=openid%20profile&nonce=09876xyz"
    );
    res.status(200).json({ status: 200 });
    return;
  } catch (e) {
    console.log("e", e);
    res.status(200).json({ status: 404, message: e });
  }
});

module.exports = router;
