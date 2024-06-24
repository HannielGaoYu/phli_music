import { playListStore } from "../../store/PlayListStore"
const db = wx.cloud.database()
const favorList = db.collection("MusicFavor")
Page({
  data: {
    favorSongList: []
  },
  onLoad() {
    // this.setData({favorSongList: playListStore.favorSongList})
    // playListStore.onState("favorSongList", (res) => {
    //   this.setData({favorSongList: res})
    // })

    favorList.get().then(res => {
      // console.log(res);
      this.setData({favorSongList: res.data})
    })
  },

  onPlayMusic(event) {
    playListStore.setState("playSongList", this.data.favorSongList)
    playListStore.setState("playSongIndex", event.currentTarget.dataset.index)
    wx.navigateTo({
      url: '../main-play/main-play',
    })
  }
})