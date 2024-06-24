import { getMvURL, getMVInfo, getrelativeMV} from "../../services/pageRequest/detail-video"
Page({
  data: {
    id: 0,
    mvURL: "",
    Info: [],
    more: []
  },
  onLoad(options) {
    const id = options.id
    console.log(id);
    this.setData({ id })
    this.fetchGetMvURL()
    this.fetchGetMVInfo()
    this.fetchGetRelative()
  },

  async fetchGetMvURL() {
    const mvurl = await getMvURL(this.data.id)
    const url = mvurl.data.url
    this.setData({mvURL: url})
  },

  async fetchGetMVInfo() {
    const Info = await getMVInfo(this.data.id)
    // const artistName = Info.artistName
    this.setData({Info: Info.data})
    console.log(Info);
  },
   
  async fetchGetRelative() {
    const rm = await getrelativeMV(this.data.id) 
    this.setData({more: rm})
    console.log(rm);
  }

})