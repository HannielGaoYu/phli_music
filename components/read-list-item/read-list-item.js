// components/read-list-item/read-list-item.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    itemData: {
      type: Object,
      value: {}
    },
    isSearsh: {
      type: Boolean,
      value: false
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
    bookMore() {
      const name = this.properties.itemData.name
      const imgurl = this.properties.itemData.img
      console.log(imgurl);
      wx.navigateTo({
        url: `../../pages/detail-read-v2/detail-read-v2?name=${name}&imgurl=${imgurl}&isSearsh=${this.properties.isSearsh}`
      })
    }
  }
})