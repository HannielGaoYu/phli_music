const app = getApp()

Page({
  data: {
    bookFavor: []
  },
  onLoad() {
    console.log(app.globalData.bookFavorList);
    this.setData({bookFavor: app.globalData.bookFavorList})
  },
  bookMore(event) {
    console.log(event);
    const name = event.currentTarget.dataset.name
    const imgurl = event.currentTarget.dataset.img
    wx.navigateTo({
      url: `../../pages/detail-read-v2/detail-read-v2?name=${name}&imgurl=${imgurl}`
    })
  }
})