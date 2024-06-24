import { myReqInstance } from "../../services/index"
import { getTopMV } from "../../services/pageRequest/video"
Page({
  data: {
    videoList: [],
    offset: 0,
    hasMore: true
  },
  onLoad() {
    // myReqInstance.get({
    //   url: "/top/mv",
    //   data: {
    //     limit: 20,
    //     offset: 0
    //   }
    // }).then(res => {
    //   // console.log(res);
    //   this.setData({videoList: res})
    // })

    // getTopMV().then(res => {
    //   this.setData({videoList: res.data})
    // })

    this.fetchTopMV()
  },

  async fetchTopMV() {
    const res = await getTopMV(this.data.offset)
    this.setData({hasMore: res.hasMore})
    const newVideoList = [...this.data.videoList, ...res.data]
    this.setData({videoList: newVideoList})
    this.setData({offset: this.data.videoList.length})
  },
  onReachBottom() {
    if (!this.data.hasMore) return
    this.fetchTopMV()
  }
})