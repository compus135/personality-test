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
  const res = cloud.cloudPay.unifiedOrder({
    functionName: "payCallback",
    envId: "personality-4gz3z2mg80c816ff",
    subMchId: "1587853521",
    nonceStr: getRandom32(),
    body: "进击de奶爸-服务",
    outTradeNo: getRandom32(),
    attach: event.birthday,
    totalFee: 1,
    spbillCreateIp: "127.0.0.1",
    tradeType: "JSAPI",
  });

  return res;
};
