const app = getApp()

Component({
  data: {
    statusHeight: 20
  },

  lifetimes: {
    created() {
      this.setData({statusHeight: app.globalData.statusHeight})
    }
  },
  methods: {
    back() {
      wx.navigateBack()
    }
  }
})