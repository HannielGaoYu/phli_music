import { myHotList, worldinminutes} from "../index"

export function getHotList(offset = 0, limit = 20) {
  return myHotList.get({
    url: "/api/wl/today",
    // data: {
    //   offset,
    //   limit
    // }
  })
}

export function getWorldNews(){
  return worldinminutes.get({
    url: ""
  })
}