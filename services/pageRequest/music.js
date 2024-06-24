import { myReqInstance } from "../index"

export function getMusicBanner(type = 2) {
  return myReqInstance.get({
    url: "/banner",
    data: {
      type
    }
  })
}

export function getSongDetails(id) {
  return myReqInstance.get({
    url: "/playlist/detail",
    data: {
      id
    }
  })
}

export function getSongMenuList(cat = "全部", limit = 6, offset = 0) {
  return myReqInstance.get({
    url: "/top/playlist",
    data: {
      cat,
      limit,
      offset
    }


  })
}
  
export function getSongMenuTags() {
    return myReqInstance.get({
      url: "/playlist/hot"
    })
}
