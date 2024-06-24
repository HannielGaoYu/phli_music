// components/show-directory/show-directory.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    name: {
      type: String,
      value: ""
    },
    index: {
      type: Number,
      value: 0
    },
    bookname: {
      type: String,
      value: ""
    },
  },
  methods: {
    onLook() {
      wx.navigateTo({
        url: `../../pages/detail-read-text/detail-read-text?index=${this.properties.index}&name=${this.properties.bookname}`,
      })
    }
  }
})