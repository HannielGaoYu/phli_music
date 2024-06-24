import { getHotBooks } from "../../services/pageRequest/read"

Page({
  data: {
    active: 0,
    alltype: [],
    type: ["推荐", "都市", "玄幻", "奇幻", "历史", "科幻", "军事", "游戏"]
  },
  onLoad() {
    this.fetchGetHotBooks()
  },
  


  async fetchGetHotBooks(type = "全部类型") {
    getHotBooks(type).then(res => {
      this.setData({alltype: res.data})
      // console.log(this.data.type[this.data.active]);
      // console.log(this.data.alltype);
    })
  },

  onChange(event) {
    // console.log(event);
    this.fetchGetHotBooks(this.data.type[event.detail.index])
  },

  // onChanges(e) {
  //   wx.navigateTo({
  //     url: '../read-search/read-search',
  //   })
  // },
  // onSearchs() {
  //   // Toast('搜索' + this.data.value);
  // },
  onClick() {
    const rt = false
    wx.navigateTo({
      url: `../read-search/read-search?isSearch=${rt}`,
    })
  },

})