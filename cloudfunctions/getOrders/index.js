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

  if (queryResult.data) {
    return queryResult.data;
  } else {
    throw new Error("没发现订单");
  }
};
