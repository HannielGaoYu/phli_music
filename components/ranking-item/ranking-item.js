// components/ranking-item/ranking-item.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    itemData: {
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    showSongList: []
  },

  /**
   * 组件的方法列表
   */
  methods: {

  },
  lifetimes: {
    attached() {
      // const list = this.properties.itemData.tracks.slice(0,3)
      // this.setData({showSongList: this.properties?.itemData?.tracks?.slice(0,3)})
      // console.log(this.properties?.itemData?.tracks?.slice(0,3));
    }
  }

})