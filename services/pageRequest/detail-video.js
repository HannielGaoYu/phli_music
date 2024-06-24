import { myReqInstance } from "../index"

export function getMvURL(mvId) {
  return myReqInstance.get({
    url: "/mv/url",
    data: {
      id: mvId
    }
  })
}

export function getMVInfo(mvid) {
  return myReqInstance.get({
    url: "/mv/detail",
    data: {
      mvid
    }
  })
}

export function getrelativeMV(id) {
  return myReqInstance.get({
    url: "/related/allvideo",
    data: {
      id
    }
  })
}