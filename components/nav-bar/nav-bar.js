const app = getApp()

Component({

  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    statusHight: 20
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onBack() {
      wx.navigateBack()
    }
  },

  lifetimes: {
    created() {
      this.setData({statusHight: app.globalData.statusHeight})
    }
  }
})