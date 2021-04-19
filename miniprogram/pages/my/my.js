const app = getApp();

Page({
  data: {
    orders: [],
    fetchingOrders: true,
    isIos: false,
  },
  onViewReport(e) {
    wx.navigateTo({
      url: "../report/report?outTradeNo=" + e.currentTarget.dataset.outtradeno,
    });
  },
  onLoad(options) {
    try {
      wx.cloud.callFunction({
        name: "getConfig",
        success(res) {
          const isNotStart = res.result;
          const systemInfo = wx.getSystemInfoSync();
          systemInfo.platform.includes("ios") &&
            isNotStart &&
            this.setData({ isIos: true });
        },
      });
    } catch (error) {}

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
