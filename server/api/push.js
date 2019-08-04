const express = require("express");
const router = express.Router();
const { push } = require("../utils/line");

router.post("/", async (req, res) => {
  try {
    const { message, uid, arrowShowDisplay, DisplayNameFrom } = req.body;
    let sendText = `มีคนฝากข้อความมาบอกว่า : ${message}`;
    if (arrowShowDisplay) {
      sendText = `คุณ ${DisplayNameFrom} ฝากข้อความมาว่า : ${message}`;
    }
    let createMessage = {
      type: `text`,
      text: sendText
    };
    await push({ message: createMessage, uid });
    res.status(200).json({ status: 200 });
    return;
  } catch (e) {
    console.log("e", e);
    res.status(200).json({ status: 404, message: e });
  }
});

module.exports = router;
