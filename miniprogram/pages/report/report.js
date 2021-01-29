const app = getApp();

Page({
  data: {
    report: "",
    birthday: "",
    orderTime: "",
  },
  onLoad(options) {
    const { birthday } = options.query;
    this.setDate({ birthday });
    wx.cloud.callFunction({
      name: "getReport",
      data: { birthday: birthday },
      success(res) {
        this.setDate({ report: res.report, orderTime: res.orderTime });
      },
      fail(res) {
        wx.navigateTo({ url: "../report/report" });
      },
    });
  },
});
