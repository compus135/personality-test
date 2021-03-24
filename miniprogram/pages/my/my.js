const app = getApp();

Page({
  data: {
    orders: [],
  },
  onViewReport(e) {
    wx.navigateTo({
      url: "../report/report?outTradeNo=" + e.currentTarget.dataset.outtradeno,
    });
  },
  onLoad(options) {
    wx.cloud.callFunction({
      name: "getOrders",
      success: (res) => {
        this.setData({ orders: res.result });
      },
      fail(res) {},
    });
  },
});
