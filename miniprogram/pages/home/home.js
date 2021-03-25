//index.js
const app = getApp();

Page({
  data: {
    birthday: "",
    isIos: false,
  },
  onBirthdayChange(e) {
    this.setData({ birthday: e.detail.value });
  },
  onLoad() {
    const res = wx.getSystemInfoSync();
    res.platform.includes("ios") && this.setData({ isIos: true });
  },
  onSubmit() {
    const birthday = this.data.birthday;
    wx.cloud.callFunction({
      name: "order",
      data: { birthday: birthday },
      success(res) {
        const payment = res.result.order.payment;
        const outTradeNo = res.result.outTradeNo;
        wx.requestPayment({
          ...payment,
          success(res) {
            wx.navigateTo({
              url: "../report/report?outTradeNo=" + outTradeNo,
            });
          },
          fail(res) {
            wx.showToast({
              title: "支付失败",
              icon: "error",
              duration: 2000,
            });
          },
        });
      },
      fail(res) {
        wx.showToast({
          title: "分析失败",
          icon: "error",
          duration: 2000,
        });
      },
    });
  },
});
