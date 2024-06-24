export function myRequestfun(options) {
  return new Promise((reslove, rejest) => {
    wx.request({
      ...options,
      success: (res) => {
        reslove(res.data)
      },
      fail: rejest
    })
  })
}

class myRequest {
  constructor(baseURL) {
    this.baseURL = baseURL
  }
  request(options) {
    const { url } = options
    return new Promise((reslove, rejest) => {
      wx.request({
        ...options,
        url: this.baseURL + url,
        success: (res) => {
          reslove(res.data)
        },
        fail: rejest
      })
    })
  }

  get(options) {
    return this.request({...options, method: "get"})
  }
  post(options) {
    return this.request({...options, method: "post"})
  } 
}
export const myReqInstance = new myRequest("http://codercba.com:9002")
export const myHotList = new myRequest("https://api.52vmy.cn")
export const myBookInstance = new myRequest("https://api.book.bbdaxia.com")
export const worldinminutes = new myRequest("https://jx.iqfk.top/60s.php?key=54K55paw6Iqx6Zuo")