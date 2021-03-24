// 云函数入口文件
const cloud = require("wx-server-sdk");

cloud.init({
  env: "personality-4gz3z2mg80c816ff",
});

const getRandom32 = () => {
  let str = "";
  for (let index = 0; index < 32; index++) {
    str += Math.round(Math.random() * 8 + 1);
  }
  return str;
};

// 云函数入口函数
exports.main = async (event, context) => {
  const { birthday, userInfo } = event;
  const db = cloud.database();
  const orders = db.collection("orders");
  const orderTime = new Date().getTime();
  const outTradeNo = getRandom32();
  await orders.add({
    data: {
      birthday: birthday,
      orderTime: orderTime,
      openId: userInfo.openId,
      outTradeNo: outTradeNo,
      hasPaid: false,
    },
  });

  const res = await cloud.cloudPay.unifiedOrder({
    functionName: "payCallback",
    envId: "personality-4gz3z2mg80c816ff",
    subMchId: "1587853521",
    nonceStr: outTradeNo,
    body: "进击de奶爸-服务",
    outTradeNo: outTradeNo,
    attach: birthday,
    totalFee: 1,
    spbillCreateIp: "127.0.0.1",
    tradeType: "JSAPI",
  });
  return { order: res, outTradeNo };
};
