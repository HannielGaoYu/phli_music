import {getBookInfo, getBookMessage, getBookcontent} from "../../services/pageRequest/read" 
const app = getApp()

Page({
  data: {
    name: "",
    itemData: {},
    bookUrl: "",
    list: [],
    contentHeight: 0,
    screenHeight:0,
    imgUrl: "",
    comes: "",
    previewcontent: "",
    show: false,
    pageshow: true,
    isSearsh: false
  },

  onLoad(options) {
    this.setData({name: options.name})
    this.setData({imgUrl: options.imgurl})
    this.setData({isSearsh: options.isSearsh === true})
    this.fetchGetBook()
    this.setData({contentHeight: app.globalData.contentHeight})
    this.setData({screenHeight: app.globalData.screenHeight})
  },

  
  async fetchGetBook() {
    const res = await getBookInfo(this.data.name)
    this.setData({bookUrl: res.data[0].url})
    this.setData({comes: res.data[0].name})
    const res1 = await getBookMessage(this.data.bookUrl)
    this.setData({itemData: res1.data})

    console.log(this.data.itemData.list[0]);

    const res2 = await getBookcontent(this.data.itemData.list[0].url)
    this.setData({previewcontent: res2.data.text})
    this.setData({list: this.data.itemData.list})
    // console.log(this.data.list);
    // console.log(this.data.previewcontent);
  },

  showDirectoryList() {
    this.setData({show: !this.data.show})
  },

  noshow() {
    this.setData({pageshow: !this.data.pageshow})
  },

  stratRead() {
    wx.navigateTo({
      url: `../detail-read-text/detail-read-text?name=${this.data.name}&index=0`,
    })
  },
  onFavor() {
    app.globalData.bookFavorList.push(this.data.itemData)
  }
})