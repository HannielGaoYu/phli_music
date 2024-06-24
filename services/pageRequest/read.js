import { myBookInstance } from "../index"

export function getHotBooks(category) {
  return myBookInstance.get({
    url: "/hot",
    data: {
      category
    }
  })
}

export function getBookInfo(name) {
  return myBookInstance.get({
    url: "/book",
    data: {
      name
    }
  })
}



export function getBookSearch(keyword) {
  return myBookInstance.get({
    url: "/search",
    data: {
      keyword
    }
  })
}

export function getBookMessage(url) {
  return myBookInstance.get({
    url: url
  })
}

export function getBookcontent(url) {
  return myBookInstance.get({
    url
  })
}