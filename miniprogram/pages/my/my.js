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
    const { birthday } = options.query;
    this.setDate({ birthday });
    wx.cloud.callFunction({
      name: "getOrders",
      data: { birthday: birthday },
      success(res) {
        this.setDate({ orders: res });
      },
    });
  },
});
