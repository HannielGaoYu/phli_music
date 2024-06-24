import {getSearchRes} from "../../services/pageRequest/music-search"
import {playListStore} from "../../store/PlayListStore"
Page({
  data: {
    value: "",
    searchData: []
  },

  onChange(event) {
    this.setData({value: event.detail})
    console.log(this.data.value);
  },

  onSearch() {
    // console.log(this.data.value);
    getSearchRes(this.data.value).then(res => {
      this.setData({searchData: res.result.songs})
    })
    console.log(this.data.searchData);
  },

  onPlayMusic(event) {
    playListStore.setState("playSongList", this.data.searchData)
    playListStore.setState("playSongIndex", event.currentTarget.dataset.index)
    wx.navigateTo({
      url: '../main-play/main-play',
    })
  }
})