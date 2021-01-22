// 云函数入口文件
const cloud = require("wx-server-sdk");
// 接下来API调用都请求到与该云函数相同的环境
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
  console.log(1111);
  const res = await cloud.cloudPay.unifiedOrder({
    functionName: "pay",
    envId: "personality-4gz3z2mg80c816ff",
    subMchId: "1587853521",
    nonceStr: getRandom32(),
    body: "进击de奶爸-服务",
    outTradeNo: getRandom32(),
    totalFee: 1,
    spbillCreateIp: "127.0.0.1",
    tradeType: "JSAPI",
  });
  console.log(222, res);
  return res;
};
