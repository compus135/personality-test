const app = getApp();

Page({
  data: {
    orders: [],
  },
  onViewReport(e) {
    wx.navigateTo({
      url: "../report/report?birthday=" + e.currentTarget.dataset.birthday,
    });
  },
  onLoad(options) {
    wx.cloud.callFunction({
      name: "getOrders",
      success: (res) => {
        console.log("my success", res);
        this.setData({ orders: res.result });
      },
      fail(res) {
        console.log("my fail", res);
      },
    });
  },
});
