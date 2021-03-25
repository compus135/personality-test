const app = getApp();

Page({
  data: {
    orders: [],
    fetchingOrders: true,
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
        this.setData({ orders: res.result, fetchingOrders: false });
      },
      fail(res) {
        this.setData({ fetchingOrders: false });
      },
    });
  },
});
