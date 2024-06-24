import { getHotList, getWorldNews } from "../../services/pageRequest/HotList"
const app = getApp()
Page({
  data: {
    hotList: [],
    todayInHistory: [],
    hotsearsh: [],
    active: 1,
    screenWidth: 375,
    screenHeight: 667,
  },
  onLoad() {
    // wx.cloud.init()
    // const db = wx.cloud.database()
    // const songs = db.collection("playlist")
    // songs.add({
    //   data: {
    //     name: "phil",
    //     age: 18,
    //     adress: {
    //       id:1313,
    //       code: 1218
    //     }
    //   },
    //   success: (res) => {
    //     wx.showToast({
    //       title: '成功',
    //     })
    //   }
    // })
    // console.log(songs);
    this.fetchHotList()
    this.setData({screenWidth: app.globalData.screenWidth})
    this.setData({screenHeight: app.globalData.screenHeight})
    console.log(this.data.todayInHistory);
  },

  onChange(event) {
    // wx.showToast({
    //   title: `切换到标签 ${event.detail.name}`,
    //   icon: 'none',
    // });
  },

  // onactive() {
  //   const textEI = document.querySelector(""); 
  // }

  async fetchHotList() {
    const res = await getHotList()
    const res2 = await getWorldNews()
    this.setData({hotList: res.data})
    this.setData({todayInHistory: res.data})
    this.setData({hotsearsh: res2.data.news})
  }

})