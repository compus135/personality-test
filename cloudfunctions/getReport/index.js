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
    const { birthday, orderTime, orderId } = queryResult.data[0];
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
      // resolve(
      //   "fake: 追求和谐，擅长沟通、表达及写作，有耐心，做助理的最佳人选，适合工作放在咨询、客服或销售岗位；2号人的【行为模式】是喜欢陪伴，依赖性强，做决定时犹豫不决，动作偏缓慢...."
      // );
    });
    return { report, orderTime, orderId };
  } else {
    throw new Error("没发现订单");
  }
};
