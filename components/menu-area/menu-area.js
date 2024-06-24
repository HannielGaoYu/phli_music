// components/menu-area/menu-area.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      value: "默认歌曲"
    },
    itemData: {
      type: Object,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onMore() {
      wx.navigateTo({
        url: '../../pages/detail-menu/detail-menu',
      })
    }
  }
})