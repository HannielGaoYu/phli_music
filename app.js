// app.js
App({
  globalData: {
    screenWidth: 375,
    screenHeight: 667,
    statusHeight: 20,
    contentHeight: 500,
    bookFavorList: []
  },
  onLaunch() {

    if(!wx.cloud) {
      console.log('NO Cloud');
    } else {
      wx.cloud.init({
        env: "cloud1-9gcey56h31c3f016",
        traceUser: true
      })
    }
    // 1.获取设备的信息
    wx.getSystemInfo({
      success: (res) => {
        this.globalData.screenWidth = res.screenWidth
        this.globalData.screenHeight = res.screenHeight
        this.globalData.statusHeight = res.statusBarHeight
        this.globalData.contentHeight = res.screenHeight - res.statusBarHeight - 44
      },
    })
  }
})
