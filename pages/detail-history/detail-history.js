import { playListStore } from "../../store/PlayListStore"

Page({
  data: {
    recSongList: []
  },
  onLoad() {
    this.setData({recSongList: playListStore.recSongList})
    playListStore.onState("recSongList", (res) => {
      this.setData({recSongList: res.splice(0, 1)})
    })
  }
})