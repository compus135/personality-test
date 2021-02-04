const app = getApp();
function formatDate(now) {
  var year = now.getFullYear(); //取得4位数的年份
  var month = now.getMonth() + 1; //取得日期中的月份，其中0表示1月，11表示12月
  var date = now.getDate(); //返回日期月份中的天数（1到31）
  var hour = now.getHours(); //返回日期中的小时数（0到23）
  var minute = now.getMinutes(); //返回日期中的分钟数（0到59）
  var second = now.getSeconds(); //返回日期中的秒数（0到59）
  return (
    year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second
  );
}
Page({
  data: {
    report: "",
    birthday: "",
    orderTime: "",
    orderId: "",
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
        this.setData({
          report: res.result.report,
          orderTime: formatDate(new Date(res.result.orderTime)),
          orderId: res.result.orderId,
        });
      },
      fail(res) {
        console.log("getReport fail", res);
        wx.navigateBack({});
      },
    });
  },
});
