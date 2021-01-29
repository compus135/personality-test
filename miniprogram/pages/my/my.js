const app = getApp();

Page({
  data: {
    orders: [
      {
        orderId: "19111",
        birthday: "19901022",
      },
      {
        orderId: "19112",
        birthday: "19901022",
      },
    ],
  },
  onViewReport(e) {
    console.log(e.currentTarget.dataset.orderId);
  },
});
