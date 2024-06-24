import { getBookSearch } from "../../services/pageRequest/read"
Page({
  data: {
    value: "",
    bookData: []
  },
  onLoad() {

  },
  onChange(e) {
    this.setData({
      value: e.detail,
    });
  },
  onSearch() {
    // Toast('搜索' + this.data.value);
    getBookSearch(this.data.value).then(res => {
      this.setData({bookData: res.data})
    })
  },
})