const app = getApp()

Page({
  data: {
    statusHeight: 20,
    nickpic: "",
    name: ""
  },

  onLoad() {
    this.setData({statusHeight: app.globalData.statusHeight})
  },

  myFavor() {
    wx.navigateTo({
      url: '../detail-favor/detail-favor',
    })
  },
  myHistory() {
    wx.navigateTo({
      url: '../detail-history/detail-history',
    })
  },
  myBook() {
    wx.navigateTo({
      url: '../detail-bookStore/detail-bookStore',
    })
  },
  async onUpLoadIcons() {
    const imageRes = await wx.chooseMedia({
      type: "image"
    })

    const imagePath = imageRes.tempFiles[0].tempFilePath
    const timestamp = new Date().getTime()
    const openid = "open_xx"
    const extension = imagePath.split(".").pop()
    const imageName = `${timestamp}_${openid}_${extension}`
    const upLoadRes = await wx.cloud.uploadFile({
      filePath: imagePath,
      cloudPath: "nickpic/" + imageName
    })
    this.setData({nickpic: imagePath})
    console.log(imagePath);
  },

  async onDownloadTap() {
    const res = await wx.cloud.downloadFile({
      fileID: "cloud://cloud1-9gcey56h31c3f016.636c-cloud1-9gcey56h31c3f016-1322982442/abc.png"
    })
    console.log(res.tempFilePath);
  },
  async onDeleteTap() {
    const res = await wx.cloud.deleteFile({
      fileList: [
        "cloud://cloud1-9gcey56h31c3f016.636c-cloud1-9gcey56h31c3f016-1322982442/abc.png"
      ]
    })

  },

  async onTempFlieTap() {
    const res = await wx.cloud.getTempFileURL({
      fileList: [
        "cloud://cloud1-9gcey56h31c3f016.636c-cloud1-9gcey56h31c3f016-1322982442/abc.png"
      ]

    })
    console.log(res);
  },

  async onLogin() {
    const profile = await wx.getUserProfile({
      desc: '获取您的昵称和头像',
    })
    // console.log(profile.userInfo);
    this.setData({name: profile.userInfo.nickName})
    this.setData({nickpic: profile.userInfo.avatarUrl})
    const loginRes = await wx.cloud.callFunction({
      name: "music-login"
    })
    const openId = loginRes.result.openid
    console.log(openId);
  },

})