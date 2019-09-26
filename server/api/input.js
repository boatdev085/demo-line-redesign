const express = require("express");
const router = express.Router();
const { db } = require("../utils/index");
const { reply, getProfile } = require("../utils/line");

router.post("/", async (req, res) => {
  try {
    const { events } = req.body;
    if (!events) {
      res.status(200).json({ status: 200, message: "not events" });
      return;
    }

    const { replyToken, message, source, type } = events[0];
    const { userId } = source;

    switch (type) {
      case "follow":
        const profile = await getProfile(userId || "");
        // await db
        //   .collection("user")
        //   .doc("user")
        //   .set({ [userId ]: profile });
        await db
          .collection("user")
          .doc(userId)
          .set(profile);
        break;
      case "unfollow":
        await db
          .collection("user")
          .doc(userId)
          .delete();
        break;
      case "message":
        if (message.type === "text") {
          await demoCase({ replyToken, text: message.text || "", uid: userId });
        }
        break;
      default:
        break;
    }

    res.status(200).json({ status: 200 });
    return;
  } catch (e) {
    console.log("e", e);
    res.status(200).json({ status: 404, message: e });
  }
});

const demoCase = async ({ replyToken, text, uid }) => {
  return new Promise(async resolve => {
    let flexSend = true;
    let createMessage = {
      type: `text`,
      text: "ไม่พบสิ่งที่ต้องการ"
    };
    switch (text) {
      case "demo quick":
        createMessage = {
          type: "text",
          text: "เลือกอาหารที่อยากกินสิ",
          quickReply: {
            items: [
              {
                type: "action",
                imageUrl: "https://png.pngtree.com/svg/20161115/a9a15fa99e.png",
                action: {
                  type: "message",
                  label: "Sushi",
                  text: "หิวซูชิ"
                }
              },
              {
                type: "action",
                imageUrl:
                  "https://img.pngio.com/omelette-png-omelet-png-300_146.png",
                action: {
                  type: "message",
                  label: "Omelet",
                  text: "หิวข้าวไข่เจียว"
                }
              },
              {
                type: "action",
                action: {
                  type: "location",
                  label: "send location"
                }
              }
            ]
          }
        };
        break;
      case "demo flex message":
        createMessage = {
          type: "flex",
          altText: "รายการอาหารทืี่สั่ง",
          contents: {
            type: "bubble",
            hero: {
              type: "image",
              url:
                "https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_2_restaurant.png",
              size: "full",
              aspectRatio: "20:13",
              aspectMode: "cover",
              action: {
                type: "uri",
                uri: "https://linecorp.com"
              }
            },
            body: {
              type: "box",
              layout: "vertical",
              spacing: "md",
              action: {
                type: "uri",
                uri: "https://linecorp.com"
              },
              contents: [
                {
                  type: "text",
                  text: "เบอร์เกอร์สุดพิเศษ",
                  size: "xl",
                  weight: "bold"
                },
                {
                  type: "box",
                  layout: "vertical",
                  spacing: "sm",
                  contents: [
                    {
                      type: "box",
                      layout: "baseline",
                      contents: [
                        {
                          type: "icon",
                          url:
                            "https://scdn.line-apps.com/n/channel_devcenter/img/fx/restaurant_regular_32.png"
                        },
                        {
                          type: "text",
                          text: "$10.5",
                          weight: "bold",
                          margin: "sm",
                          flex: 0
                        },
                        {
                          type: "text",
                          text: "400kcl",
                          size: "sm",
                          align: "end",
                          color: "#aaaaaa"
                        }
                      ]
                    },
                    {
                      type: "box",
                      layout: "baseline",
                      contents: [
                        {
                          type: "icon",
                          url:
                            "https://scdn.line-apps.com/n/channel_devcenter/img/fx/restaurant_large_32.png"
                        },
                        {
                          type: "text",
                          text: "$15.5",
                          weight: "bold",
                          margin: "sm",
                          flex: 0
                        },
                        {
                          type: "text",
                          text: "550kcl",
                          size: "sm",
                          align: "end",
                          color: "#aaaaaa"
                        }
                      ]
                    }
                  ]
                },
                {
                  type: "text",
                  text: "อยากกินละสิโทรสั่ง grab เอานะ",
                  wrap: true,
                  color: "#aaaaaa",
                  size: "xxs"
                }
              ]
            },
            footer: {
              type: "box",
              layout: "vertical",
              contents: [
                {
                  type: "spacer",
                  size: "xxl"
                },
                {
                  type: "button",
                  style: "primary",
                  color: "#905c44",
                  action: {
                    type: "uri",
                    label: "Add to Cart",
                    uri: "https://linecorp.com"
                  }
                }
              ]
            }
          }
        };
        break;
      case "demo flex message nowrap":
        createMessage = {
          type: "flex",
          altText: "รายการที่เลือก",
          contents: {
            type: "carousel",
            contents: [
              {
                type: "bubble",
                hero: {
                  type: "image",
                  size: "full",
                  aspectRatio: "20:13",
                  aspectMode: "cover",
                  url:
                    "https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_5_carousel.png"
                },
                body: {
                  type: "box",
                  layout: "vertical",
                  spacing: "sm",
                  contents: [
                    {
                      type: "text",
                      text: "เก้าอี้มหัศจรรย์",
                      wrap: true,
                      weight: "bold",
                      size: "xl"
                    },
                    {
                      type: "box",
                      layout: "baseline",
                      contents: [
                        {
                          type: "text",
                          text: "ราคา 500 บาท",
                          wrap: true,
                          weight: "bold",
                          size: "xl",
                          flex: 0
                        }
                      ]
                    }
                  ]
                },
                footer: {
                  type: "box",
                  layout: "vertical",
                  spacing: "sm",
                  contents: [
                    {
                      type: "button",
                      style: "primary",
                      action: {
                        type: "uri",
                        label: "Add to Cart",
                        uri: "https://linecorp.com"
                      }
                    },
                    {
                      type: "button",
                      action: {
                        type: "uri",
                        label: "Add to wishlist",
                        uri: "https://linecorp.com"
                      }
                    }
                  ]
                }
              },
              {
                type: "bubble",
                hero: {
                  type: "image",
                  size: "full",
                  aspectRatio: "20:13",
                  aspectMode: "cover",
                  url:
                    "https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_6_carousel.png"
                },
                body: {
                  type: "box",
                  layout: "vertical",
                  spacing: "sm",
                  contents: [
                    {
                      type: "text",
                      text: "โคมไฟไม่มีแสงไฟ",
                      wrap: true,
                      weight: "bold",
                      size: "xl"
                    },
                    {
                      type: "box",
                      layout: "baseline",
                      flex: 1,
                      contents: [
                        {
                          type: "text",
                          text: "ราคา 10 บาท",
                          wrap: true,
                          weight: "bold",
                          size: "xl",
                          flex: 0
                        }
                      ]
                    },
                    {
                      type: "text",
                      text: "ของหมดแล้วอะ อดเลย",
                      wrap: true,
                      size: "xxs",
                      margin: "md",
                      color: "#ff5551",
                      flex: 0
                    }
                  ]
                },
                footer: {
                  type: "box",
                  layout: "vertical",
                  spacing: "sm",
                  contents: [
                    {
                      type: "button",
                      flex: 2,
                      style: "primary",
                      color: "#aaaaaa",
                      action: {
                        type: "uri",
                        label: "Add to Cart",
                        uri: "https://linecorp.com"
                      }
                    },
                    {
                      type: "button",
                      action: {
                        type: "uri",
                        label: "Add to wish list",
                        uri: "https://linecorp.com"
                      }
                    }
                  ]
                }
              },
              {
                type: "bubble",
                body: {
                  type: "box",
                  layout: "vertical",
                  spacing: "sm",
                  contents: [
                    {
                      type: "button",
                      flex: 1,
                      gravity: "center",
                      action: {
                        type: "uri",
                        label: "ดูสิ้นค้าภายในร้านต่อ",
                        uri: "https://linecorp.com"
                      }
                    }
                  ]
                }
              }
            ]
          }
        };
        break;
      case "demo riff":
        createMessage.text = "demo riff";
        break;
      default:
        // flexSend = false;
        break;
    }
    if (flexSend) {
      await reply({ replyToken, message: createMessage });
    }
    resolve(null);
  });
};

module.exports = router;
