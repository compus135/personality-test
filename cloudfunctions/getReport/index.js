// 云函数入口文件
const cloud = require("wx-server-sdk");
const request = require("request");

const urls = [
  // { url: "emotion_description/1.0", id: 1 },
  // { url: "characteristics_description/1.0", id: 3 },
  // { url: "detailed_description/1.0", id: 4 },
  { url: "threecharacter_description/1.0", id: 5 },
  // { url: "advantages", id: 6 },
  // { url: "disadvantages", id: 7 },
];

function getOptions(url, birthday) {
  let options = {
    url: "http://characters.market.alicloudapi.com/ln/report/mastercode/" + url,
    method: "POST",
    headers: {
      Authorization: "APPCODE ea40b24093c246678f898e36496a94ea",
    },
    form: {
      birthday: birthday,
    },
  };
  if (url === "advantages") {
    options.url =
      "http://characters.market.alicloudapi.com/ln/report/mastercode/advantages_and_disadvantages/1.0";
    options.form.descriptionType = 1;
  }
  if (url === "disadvantages") {
    options.url =
      "http://characters.market.alicloudapi.com/ln/report/mastercode/advantages_and_disadvantages/1.0";
    options.form.descriptionType = 2;
  }
  return options;
}

cloud.init({
  env: "characters-1g5805hffbe21a42",
});

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  const { outTradeNo } = event;
  const db = cloud.database();
  const records = await db
    .collection("orders")
    .where({
      outTradeNo,
      hasPaid: true,
    })
    .get()
    .then((res) => res.data);
  if (records.length && records[0].hasPaid === true) {
    const birthday = records[0].birthday;
    const orderTime = records[0].orderTime;
    const queryResult = await db
      .collection("reports")
      .where({
        birthday: birthday,
      })
      .get()
      .then((res) => res);
    if (queryResult.data && queryResult.data.length > 0) {
      const { characters } = queryResult.data[0];
      return { status: 0, characters, birthday, orderTime };
    } else {
      console.log("characters request start...");
      const requests = urls.map((item) => {
        return new Promise((resolve, reject) => {
          const formatBirthday = birthday.replace(/-/g, "");
          request(
            getOptions(item.url, formatBirthday),
            function (error, response, body) {
              if (!error && response.statusCode == 200) {
                resolve({
                  id: item.id,
                  description: JSON.parse(body).description,
                });
              } else {
                reject("获取报告失败");
              }
            }
          );
        });
      });
      const characters = [];
      for (const request of requests) {
        try {
          const result = await request;
          characters.push(result);
        } catch (error) {}
      }
      console.log("characters request end length " + characters.length);
      if (characters.length) {
        await db
          .collection("reports")
          .add({ data: { birthday: birthday, characters: characters } });
        return { status: 0, characters, birthday, orderTime };
      } else {
        console.log("characters.length is 0");
        return { status: 20000 };
      }
    }
  } else if (records.length && records[0].hasPaid === "fail") {
    return { status: 10000 };
  } else {
    return { status: 20000 };
  }
};
