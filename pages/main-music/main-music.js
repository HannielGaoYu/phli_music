import { getMusicBanner, getSongDetails, getSongMenuList } from "../../services/pageRequest/music"
import { querySelect } from "../../utils/query-selecter"
import { playListStore } from "../../store/PlayListStore"
// const querySelectThrottle = throttle(querySelect, 100)
const db = wx.cloud.database()
const Fly = db.collection("FlyList")
const New = db.collection("NewList")
const Hot = db.collection("HotList")
const Origin = db.collection("OriginList")
Page({
  data: {
    banner: [],
    bannerHeight: 0,
    showHotSongList: [],
    hotSongMenu: [],
    recMenuList: [],
    allHotSongData: [],
    allNewSongData: [],
    allFlySongData: [],
    allOriginSongData: []
  },
  onLoad() {
    this.fetchMusicBanner()
    this.fetchTopSong()
    this.fetchSongMenu()
  },

  //网络请求
  async fetchMusicBanner() {
    const res = await getMusicBanner()
    this.setData({banner: res.banners})
    // console.log(this.data.banner);
  },
  async fetchTopSong() {
    const res = await getSongDetails(3778678) 
    const res2 = await getSongDetails(3779629)
    const res3 = await getSongDetails(2884035)
    const res4 = await getSongDetails(19723756)

    Fly.where({id: 19723756}).remove()
    New.where({id: 3779629}).remove()
    Hot.where({id: 2884035}).remove()
    Origin.where({id: 3778678}).remove()
    Fly.add({
      data: res4.playlist
    })

    New.add({
      data: res2.playlist
    })
    Hot.add({
      data: res3.playlist
    })
    Origin.add({
      data: res.playlist
    })
    // Fly.where({
    //   id: 19723756
    // }).update({
    //   data: res4.playlist
    // })
    // New.where({
    //   id: 3779629
    // }).update({
    //   data: res2.playlist
    // })
    // Hot.where({
    //   id: 2884035
    // }).update({
    //   data: res3.playlist
    // })
    // Origin.where({
    //   id: 3778678
    // }).update({
    //   data: res.playlist
    // })
    // console.log(res.playlist.tracks);
    this.setData({allHotSongData: res.playlist})
    this.setData({allFlySongData: res4.playlist})
    this.setData({allOriginSongData: res3.playlist})
    this.setData({allNewSongData: res2.playlist})
    this.setData({showHotSongList: res.playlist.tracks.slice(0, 6)})
  },
  async fetchSongMenu() {
    const res = await getSongMenuList()
    // console.log(res);
    this.setData({hotSongMenu: res.playlists})
    getSongMenuList("华语").then(res => {
      this.setData({ recMenuList: res.playlists })
    })
  },

  //页面跳转
  onSearch() {
    wx.navigateTo({
      url: '../music-search/music-search',
    })
  },
  showRanking(event) {
    // console.log(event.currentTarget.dataset.id);
    wx.navigateTo({
      url: `../detail-ranking/detail-ranking?id=${event.currentTarget.dataset.id}`,
    })
  },

  onPlayMusic(event){
    // console.log(event.currentTarget.dataset.id);
    playListStore.setState("playSongList", this.data.allHotSongData)
    playListStore.setState("playSongIndex", event.currentTarget.dataset.index)
    wx.navigateTo({
      url: `../main-play/main-play?id=${event.currentTarget.dataset.id}`,
    })
  },

  //轮播图height
  imageLoad(event) {
    querySelect(".item-image").then(res => {
      this.setData({ bannerHeight: res[0].height })
    })
    // console.log(this.data.bannerHeight);
  },

})