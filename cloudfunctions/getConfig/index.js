// 云函数入口文件
const cloud = require("wx-server-sdk");

cloud.init({
  env: "characters-1g5805hffbe21a42",
});

// 云函数入口函数
exports.main = async (event, context) => {
  return new Date().getTime() < 1622476800000 ? true : false;
};
