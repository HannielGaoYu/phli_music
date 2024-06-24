import {getBookInfo, getBookMessage ,getBookcontent} from "../../services/pageRequest/read"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    index: 0,
    text: "",
    title: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let num = parseInt(options.index)
    // console.log(num);
    num = num === null ? 0 : num
    this.setData({index: num})
    this.fetchGetBook(options.name)

  },

  async fetchGetBook(name) {
    const res = await getBookInfo(name)
    // console.log(res);
    const res1 = await getBookMessage(res.data[0].url)
    this.setData({list: res1.data.list})
    this.setData({title: this.data.list[this.data.index].name})
    const res2 = await getBookcontent(this.data.list[this.data.index].url)
    this.setData({text: res2.data.text})

  },

  async onPre() {
    // console.log("1");
    if (this.data.index === 0) {
      return;
    }
    this.setData({index: this.data.index-1})

    this.setData({title: this.data.list[this.data.index].name})
    const res2 = await getBookcontent(this.data.list[this.data.index].url)
    this.setData({text: res2.data.text})
    wx.pageScrollTo({
      scrollTop: 0
    })
  },
  
  async onNext() {
    // console.log("2");
    if (this.data.index === this.data.list.length - 1) {
      return;
    }
    this.setData({index: this.data.index+1})
    // console.log(this.data.index);
    this.setData({title: this.data.list[this.data.index].name})
    const res2 = await getBookcontent(this.data.list[this.data.index].url)
    this.setData({text: res2.data.text})
    wx.pageScrollTo({
      scrollTop: 0
    })
  }
})