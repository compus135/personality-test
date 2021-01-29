//index.js
const app = getApp();

Page({
  data: {
    birthday: "",
  },
  onBirthdayChange(e) {
    this.setData({ birthday: e.detail.value });
  },
  onSubmit() {
    wx.cloud.callFunction({
      name: "order",
      data: { birthday: this.data.birthday },
      success(res) {
        const payment = res.result.payment;
        wx.requestPayment({
          ...payment,
          success(res) {
            wx.navigateTo({
              url: "../report/report",
            });
          },
          fail(res) {
            wx.showToast({
              title: "支付失败，请稍后再试",
              icon: "error",
              duration: 2000,
            });
          },
        });
      },
      fail(res) {
        wx.showToast({
          title: "分析失败，请稍后再试",
          icon: "error",
          duration: 2000,
        });
      },
    });
  },
});

//  //生成订单
//  const db = wx.cloud.database();
//  const orders = db.collection("orders");
//  orders.add({
//    data: {},
//  });
//  wx.request({
//    url:
//      "http://characters.market.alicloudapi.com/ln/report/mastercode/emotion_description/1.0",
//    method: "POST",
//    data: { birthday: this.data.birthday },
//    success(res) {},
//    fail(res) {
//      wx.showToast({
//        title: "分析失败，请稍后再试",
//        icon: "error",
//        duration: 2000,
//      });
//    },
//  });
