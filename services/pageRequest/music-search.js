import {myReqInstance} from "../index"

export function getHotSearchSong() {
  return myReqInstance.get({
    url: "/search/hot"
  })
}

export function getRelateSong(keywords, type="mobile") {
  return myReqInstance.get({
    url: "/search/suggest",
    data: {
      keywords,
      type
    }
  })
}

export function getSearchRes(keywords, limit = 100) {
  return myReqInstance.get({
    url: "/cloudsearch",
    data: {
      keywords,
      limit
    }
  })
}