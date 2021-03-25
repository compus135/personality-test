// 云函数入口文件
const cloud = require("wx-server-sdk");

cloud.init({
  env: "characters-1g5805hffbe21a42",
});

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  const db = cloud.database();
  const queryResult = await db
    .collection("orders")
    .where({
      openId: wxContext.OPENID,
      hasPaid: true,
    })
    .get()
    .then((res) => res);
  if (queryResult.data) {
    return queryResult.data;
  } else {
    throw new Error("没发现订单");
  }
};
