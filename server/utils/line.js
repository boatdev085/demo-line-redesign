const axios = require("axios");
const LINE_MESSAGING_API_REPLY = "https://api.line.me/v2/bot/message/reply";
const LINE_MESSAGING_API_PUSH = "https://api.line.me/v2/bot/message/push";
const LINE_GET_PROFILE = "https://api.line.me/v2/bot/profile/";
const TOKEN = "";

const LINE_HEADER = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${TOKEN}`
};
const api = axios.create({
  timeout: 60000,
  headers: LINE_HEADER
});
const reply = ({
  replyToken,
  message = {
    type: `text`,
    text: "ไม่พบสิ่งที่ต้องการครับ"
  }
}) => {
  return api
    .post(
      `${LINE_MESSAGING_API_REPLY}`,
      JSON.stringify({
        replyToken,
        messages: [message]
      })
    )
    .then(res => {
      return { status: 200, data: res.data };
    })
    .catch(e => {
      console.log("e", e);
      return { status: e.response.status, data: e.response.statusText };
    });
};
const push = ({ message = ``, uid }) => {
  return api
    .post(
      `${LINE_MESSAGING_API_PUSH}`,
      JSON.stringify({
        to: uid,
        messages: [message]
      })
    )
    .then(res => {
      return { status: 200, data: res.data };
    })
    .catch(e => {
      console.log("e", e);
      return { status: e.response.status, data: e.response.statusText };
    });
};
const getProfile = uid => {
  if (!uid || uid === "") {
    return null;
  }
  const LINE_HEADER_PROFILE = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${TOKEN}`
  };
  const apiGetProfile = axios.create({
    timeout: 60000,
    headers: LINE_HEADER_PROFILE
  });
  return apiGetProfile
    .get(`${LINE_GET_PROFILE + uid}`)
    .then(res => {
      return res.data;
    })
    .catch(e => {
      return { status: e.response.status, data: e.response.statusText };
    });
};
module.exports = {
  reply,
  push,
  getProfile
};
