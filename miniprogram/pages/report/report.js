const app = getApp();

Page({
  data: {
    report: "",
    birthday: "",
    orderTime: "",
  },
  onLoad(options) {
    console.log(options);
    const { birthday } = options;
    this.setData({ birthday });
    wx.cloud.callFunction({
      name: "getReport",
      data: { birthday: birthday },
      success: (res) => {
        console.log("getReport success", res);
        this.setData({ report: res.report, orderTime: res.orderTime });
      },
      fail(res) {
        console.log("getReport fail", res);
        wx.navigateBack({});
      },
    });
  },
});
