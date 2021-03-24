// 云函数入口文件
const cloud = require("wx-server-sdk");

cloud.init({
  env: "personality-4gz3z2mg80c816ff",
});

// 云函数入口函数
exports.main = async (event, context) => {
  const { resultCode, outTradeNo } = event;
  if (resultCode === "SUCCESS") {
    console.log("paycallback SUCCESS");
    const db = cloud.database();
    const orders = db.collection("orders");
    await orders
      .where({
        outTradeNo: outTradeNo,
      })
      .update({
        data: {
          hasPaid: true,
        },
      });
    return {
      errcode: 0,
      errmsg: "",
    };
  }
};
