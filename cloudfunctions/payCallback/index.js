// 云函数入口文件
const cloud = require("wx-server-sdk");

cloud.init({
  env: "characters-1g5805hffbe21a42",
});

// 云函数入口函数
exports.main = async (event, context) => {
  const { returnCode, resultCode, outTradeNo } = event;
  if (returnCode === "SUCCESS") {
    const db = cloud.database();
    const orders = db.collection("orders");
    const hasPaid = resultCode === "SUCCESS" ? true : "fail";
    await orders
      .where({
        outTradeNo: outTradeNo,
      })
      .update({
        data: {
          hasPaid: hasPaid,
        },
      });
    return {
      errcode: 0,
      errmsg: "",
    };
  }
};
