// const formatTime = date => {
//   const year = date.getFullYear()
//   const month = date.getMonth() + 1
//   const day = date.getDate()
//   const hour = date.getHours()
//   const minute = date.getMinutes()
//   const second = date.getSeconds()

//   return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
// }

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const baseUrl = 'https://testlocal.diqifan.com'// 'http://192.168.3.36:8084' //  "https://www.diqifan.com" // 

const get = async (url, header) => {
  const cookie = wx.getStorageSync('cookie')
  if (cookie) {
    if (header) {
      header.Cookie = cookie
    } else {
      header = { Cookie: cookie }
    }

  }
  const result = await new Promise((resolve, reject) => {
    wx.request({
      url, header, success(res) {
        if (res.header['Set-Cookie']) {
          wx.setStorageSync('cookie', res.header['Set-Cookie']); //保存Cookie到Storage
        }
        resolve(res.data)
      }
    })
  })
  return result
}
const post = async (url, params, header) => {
  const cookie = wx.getStorageSync('cookie')
  if (cookie) {
    if (header) {
      header.Cookie = cookie
    } else {
      header = { Cookie: cookie }
    }
  }
  const result = await new Promise((resolve, reject) => {
    if (!header) {
      header = {}
    }
    wx.request({
      url, method: 'POST', header, data: params, success(res) {
        if (res.header['Set-Cookie']) {
          wx.setStorageSync('cookie', res.header['Set-Cookie']); //保存Cookie到Storage
        }
        resolve(res.data)
      }
    })
  })
  return result
}
const requestDelete = async (url, params, header) => {
  const result = await new Promise((resolve, reject) => {
    wx.request({
      url, method: 'DELETE', header, data: params, success(res) {
        resolve(res.data)
      }
    })
  })
  return result
}

const getFromStorage = (skey) => {
  let value = wx.getStorageSync(skey)
  return value
}
const throttle = (fn, delay) => {
  if (!delay) {
    delay = 2000
  }
  let lastTime = null
  let wrappedFn = function (e) {
    const current = + new Date()
    if ((lastTime && current - lastTime > delay) || !lastTime) {
      fn.call(this, e);
      lastTime = current
    }
  }
  return wrappedFn
}
module.exports = {
  formatTime: formatTime,
  baseUrl,
  get,
  post,
  requestDelete,
  getFromStorage,
  throttle
}
