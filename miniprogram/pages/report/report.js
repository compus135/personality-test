const app = getApp();
const titles = {
  1: "性格情感",
  2: "性格描述",
  3: "个性特征",
  4: "性格详解",
  5: "性格三字经",
  6: "优点",
  7: "缺点",
};

function formatNumber(num) {
  if (num < 10) {
    return "0" + num;
  }
  return num;
}

function formatDate(now) {
  var year = now.getFullYear();
  var month = formatNumber(now.getMonth() + 1);
  var date = formatNumber(now.getDate());
  var hour = formatNumber(now.getHours());
  var minute = formatNumber(now.getMinutes());
  var second = formatNumber(now.getSeconds());
  return (
    year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second
  );
}

function formatCharacters(characters) {
  return characters.map((item) => {
    return { title: titles[item.id], description: item.description };
  });
}
Page({
  data: {
    reportFailTip: "",
    characters: [],
    birthday: "",
    orderTime: "",
    orderId: "",
    fetchingReport: true,
  },
  onLoad(options) {
    const { outTradeNo } = options;
    wx.showLoading({ title: "加载中..." });
    wx.cloud.callFunction({
      name: "getReport",
      data: { outTradeNo },
      success: (res) => {
        if (res.result.status === 0) {
          this.setData({
            characters: formatCharacters(res.result.characters),
            orderTime: formatDate(new Date(res.result.orderTime)),
            orderId: outTradeNo.substr(15),
            birthday: res.result.birthday,
          });
        } else if (res.result.status === 10000) {
          this.setData({
            reportFailTip: "支付失败，请再试一次",
          });
        } else if (res.result.status === 20000) {
          this.setData({
            reportFailTip: "订单处理中，请稍后查询",
          });
        }

        wx.hideLoading();
        this.setData({ fetchingReport: false });
      },
      fail: (res) => {
        wx.hideLoading();
        this.setData({ fetchingReport: false });
      },
    });
  },
});
