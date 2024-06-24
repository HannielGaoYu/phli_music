import {playListStore} from "../../store/PlayListStore"
const app = getApp()
const audioContext = wx.createInnerAudioContext()

//1.get database
const db = wx.cloud.database()
//2.get collection
const favorList = db.collection("MusicFavor")

Page({
  data: {
    id: 0,
    playSongList: [],
    playSongIndex: 0,
    currectSong: {},
    contentHeight: 0,
    duringTime: 0,
    sliderValue: 0,
    currectTime: 0,
    isEnd: false,
    isParuse: false,
    isFavor: false,
    favorSongList: [],
    recSongList: []
  },
  onLoad(options) {
    favorList.get().then(res => {
      for (let item of res.data) {
        if (item.id == this.data.id) {
          this.setData({isFavor: true})
        } else {
          this.setData({isFavor: false})
        }
      }
    })
    // this.data.recSongList.push(this.data.currectSong)
    // this.setData({recSongList: this.data.recSongList})
    // playListStore.setState("recSongList", this.data.recSongList)

    // this.isFavor()
    this.setData({contentHeight: app.globalData.contentHeight})
    playListStore.onState("playSongIndex", (res) => {
      this.setData({playSongIndex: res})
    })
    playListStore.onState("playSongList", (res) => {
      if (res.tracks) {
        this.setData({playSongList: res.tracks})
      } else {
        this.setData({playSongList: res})
      }
    })

    this.setData({currectSong: this.data.playSongList[this.data.playSongIndex]})
    this.setData({id: this.data.currectSong.id})
    this.setData({duringTime: this.data.currectSong.dt * 1})

    audioContext.stop()
    audioContext.src = `https://music.163.com/song/media/outer/url?id=${this.data.id}.mp3`
    audioContext.autoplay = true

    // audioContext.seek(180)
    audioContext.onTimeUpdate(() => {
      // console.log(audioContext.currentTime);
      this.setData({sliderValue: (audioContext.currentTime * 1000 / this.data.duringTime) * 100})
      this.setData({currectTime: audioContext.currentTime * 1000})
      if (audioContext.currentTime*1000 === this.data.duringTime) {
        this.data.isEnd = true
      }
    })

    playListStore.onState("favorSongList", res => {
      this.setData({favorSongList: res})
    })

    for (let item of this.data.favorSongList) {
      if (parseInt(this.data.id) === parseInt(item.id)) {
        this.setData({isFavor: true})
      }
    }
    
  },
  onPutPre() {
    // console.log("pre")
    this.data.recSongList.push(this.data.currectSong)
    this.setData({recSongList: this.data.recSongList})
    playListStore.setState("recSongList", this.data.recSongList)
    // this.setData({isFavor: false})
    this.isFavor()
    this.data.playSongIndex -= 1
    this.setData({currectSong: this.data.playSongList[this.data.playSongIndex]})
    this.setData({id: this.data.currectSong.id})
    this.setData({duringTime: this.data.currectSong.dt * 1})

    audioContext.stop()
    audioContext.src = `https://music.163.com/song/media/outer/url?id=${this.data.id}.mp3`
    audioContext.autoplay = true

    // audioContext.seek(180)
    audioContext.onTimeUpdate(() => {
      // console.log(audioContext.currentTime);
      this.setData({sliderValue: (audioContext.currentTime * 1000 / this.data.duringTime) * 100})
      this.setData({currectTime: audioContext.currentTime * 1000})
      if (audioContext.currentTime*1000 === this.data.duringTime) {
        this.data.isEnd = true
        console.log("3435");
      }
    })
    // for (let item of this.data.favorSongList) {
    //   if (parseInt(this.data.id) === parseInt(item.id)) {
    //     this.setData({isFavor: true})
    //   }
    // }
  },
  onPutNext() {
    // console.log("next");
    this.data.recSongList.push(this.data.currectSong)
    this.setData({recSongList: this.data.recSongList})
    playListStore.setState("recSongList", this.data.recSongList)
    // this.setData({isFavor: false})
    this.isFavor()
    this.data.playSongIndex += 1
    this.setData({currectSong: this.data.playSongList[this.data.playSongIndex]})
    this.setData({id: this.data.currectSong.id})
    this.setData({duringTime: this.data.currectSong.dt * 1})
    audioContext.stop()
    audioContext.src = `https://music.163.com/song/media/outer/url?id=${this.data.id}.mp3`
    audioContext.autoplay = true
    // audioContext.play()


    audioContext.onTimeUpdate(() => {
      // console.log(audioContext.currentTime);
      this.setData({sliderValue: (audioContext.currentTime * 1000 / this.data.duringTime) * 100})
      this.setData({currectTime: audioContext.currentTime * 1000})
      if ((this.data.duringTime - audioContext.currentTime*1000) < 1000)  {
        this.onPutNext()
        this.data.isEnd = true
      }
    })
    // for (let item of this.data.favorSongList) {
    //   if (parseInt(this.data.id) === parseInt(item.id)) {
    //     this.setData({isFavor: true})
    //   }
    // }
  },
  Onparuse() {
    this.setData({isParuse: !this.data.isParuse})
    if (this.data.isParuse) {
      audioContext.pause()
    } else {
      audioContext.play()
    }
  },
  onFavor() {
    // wx.showToast({
    //   title: '收藏成功',
    //   icon: 'success',
    //   mask: true
    // })
    // //1.get database
    // const db = wx.cloud.database()
    // //2.get collection
    // const collection = db.collection("favorList")
    this.setData({isFavor: !this.data.isFavor})
    favorList.get().then(res => console.log(res))
    if (this.data.isFavor) {
      favorList.add({
        data: this.data.currectSong,
        success: (res) => {
          // console.log(res);
          wx.showToast({
            title: '收藏成功',
            icon: 'success',
            mask: true
          })
        }
      })
    } else {
      //const cmd = db.command
      favorList.where({
        id: this.data.currectSong.id
      }).remove().then(res => {
        console.log(res);
      })
    }
    

    // playListStore.onState("favorSongList", res => {
      // this.setData({favorSongList: res})
    // })
    // const id = this.data.id
    
    // df.id = this.data.currectSong
    // this.data.favorSongList.push(this.data.currectSong)
    // this.setData({favorSongList: this.data.favorSongList})
    // this.data.isFavor ? this.data.favorSongList.push(this.data.currectSong) : this.data.favorSongList.splice(this.data.favorSongList.push(this.data.currectSong, 1))

    // playListStore.setState("favorSongList", this.data.favorSongList)
  },

  isFavor() {
    favorList.get().then(res => {
      for (let item of res.data) {
        if (item.id == this.data.id) {
          this.setData({isFavor: true})
        } else {
          this.setData({isFavor: false})
        }
      }
    })
  },
  processChange(e) {
    audioContext.pause()
    audioContext.onTimeUpdate(() => {

      audioContext.currentTime = this.data.duringTime * (e.detail.value / 100)
      // console.log(audioContext.currentTime);
      this.setData({sliderValue: e.detail.value})
      this.setData({currectTime: this.data.duringTime * (e.detail.value / 100)})
      if (audioContext.currentTime*1000 === this.data.duringTime) {
        this.data.isEnd = true
      }
      
    })
    audioContext.play()
  }
 

})