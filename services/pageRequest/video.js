import { myReqInstance } from "../index"

export function getTopMV(offset = 0, limit = 20) {
  return myReqInstance.get({
    url: "/top/mv",
    data: {
      limit,
      offset
    }
  })
}