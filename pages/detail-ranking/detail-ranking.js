// pages/detail-ranking/detail-ranking.js
import { getSongDetails } from "../../services/pageRequest/music"
import { playListStore } from "../../store/PlayListStore"
Page({
  data: {
    hotSongRank: []
  },
  onLoad(options) {
    this.fetchHotSongRank(options.id)
  },

  async fetchHotSongRank(id) {
    const res = await getSongDetails(id)
    this.setData({hotSongRank: res.playlist})
    // console.log(this.data.hotSongRank);
  },

  onPlayMusic(event) {
    playListStore.setState("playSongList", this.data.hotSongRank)
    playListStore.setState("playSongIndex", event.currentTarget.dataset.index)
    wx.navigateTo({
      url: '../main-play/main-play',
    })
  }
})