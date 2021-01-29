// 云函数入口文件
const cloud = require("wx-server-sdk");

cloud.init({
  env: "personality-4gz3z2mg80c816ff",
});

// 云函数入口函数
exports.main = async (event, context) => {
  console.log("payCallback", event);
  const { resultCode, attach, userInfo } = event;
  if (resultCode === "SUCCESS") {
    const db = cloud.database();
    const orders = db.collection("orders");
    orders.add({
      data: {
        birthday: attach,
        orderTime: new Date().getTime(),
        openId: userInfo.openId,
      },
    });
  }

  return {
    errcode: 0,
    errmsg: "",
  };
};
