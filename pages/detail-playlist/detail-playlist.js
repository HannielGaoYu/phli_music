import {getSongDetails} from "../../services/pageRequest/music"
import {playListStore} from "../../store/PlayListStore"
Page({
  data: {
    playlist: []
  },
  onLoad(options) {
    console.log(options.id);
    this.fetchGetSongList(options.id)
  },
  async fetchGetSongList(id) {
    const res = await getSongDetails(id)
    this.setData({playlist: res.playlist})
    console.log(res.playlist);
  },
  onPlayMusic(event) {
    playListStore.setState("playSongList", this.data.playlist)
    playListStore.setState("playSongIndex", event.currentTarget.dataset.index)
    wx.navigateTo({
      url: '../main-play/main-play',
    })
  }
})