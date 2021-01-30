// 云函数入口文件
const cloud = require("wx-server-sdk");
const request = require("request");

cloud.init({
  env: "personality-4gz3z2mg80c816ff",
});

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  const db = cloud.database();
  const queryResult = await db
    .collection("orders")
    .where({
      openId: wxContext.OPENID,
      birthday: event.birthday,
    })
    .get()
    .then((res) => res);
  console.log("wxContext.OPENID", wxContext.OPENID);
  console.log("event.birthday", event.birthday);
  console.log("queryResult", queryResult);
  if (queryResult.data && queryResult.data.length > 0) {
    const { birthday, orderTime } = queryResult.data[0];
    const options = {
      url:
        "http://characters.market.alicloudapi.com/ln/report/mastercode/emotion_description/1.0",
      method: "POST",
      headers: {
        Authorization: "APPCODE ea40b24093c246678f898e36496a94ea",
      },
      form: { birthday: birthday.replace(/-/g, "") },
    };
    console.log("options", options);

    const report = await new Promise((resolve, reject) => {
      request(options, function (error, response, body) {
        console.log("error", error);
        console.log("body", body);
        console.log("response.statusCode", response.statusCode);

        if (!error && response.statusCode == 200) {
          resolve(body);
        } else {
          reject("获取报告失败");
        }
      });
    });
    return { report, orderTime };
  } else {
    throw new Error("没发现订单");
  }
};
