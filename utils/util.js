// const formatTime = date => {
//   const year = date.getFullYear()
//   const month = date.getMonth() + 1
//   const day = date.getDate()
//   const hour = date.getHours()
//   const minute = date.getMinutes()
//   const second = date.getSeconds()

//   return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
// }
const FormData = require('./formData.js')

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

const baseUrl = 'http://119.91.25.208'// 'http://192.168.3.36:8084' //  "https://www.diqifan.com" // 

const get = async (url, params, header) => {
  const cookie = wx.getStorageSync('cookie')
  if (cookie) {
    if (header) {
      header.Cookie = cookie
    } else {
      header = { Cookie: cookie }
    }

  }
  if (!header) {
    header = {}
  }
  header.Authorization = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyTmFtZSI6ImFkbWluIiwidHlwZSI6NiwidXNlcklkIjoidzIzNDM1MzUzNSIsImlhdCI6MTY1MDgwNTEwMywiZXhwIjoxNjUxNDA5OTAzfQ.Tj6oS59GCGCihsAhyHKx1SZ5VuyAkaE4nylld0Ujycg'
  const result = await new Promise((resolve, reject) => {
    wx.request({
      url: baseUrl + url, header,
      data: params,
      success(res) {
        // if (res.header['Set-Cookie']) {
        //   wx.setStorageSync('cookie', res.header['Set-Cookie']); //保存Cookie到Storage
        // }
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
  if (!header) {
    header = {}
  }
  header.Authorization = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyTmFtZSI6ImFkbWluIiwidHlwZSI6NiwidXNlcklkIjoidzIzNDM1MzUzNSIsImlhdCI6MTY1MDgwNTEwMywiZXhwIjoxNjUxNDA5OTAzfQ.Tj6oS59GCGCihsAhyHKx1SZ5VuyAkaE4nylld0Ujycg'
  const result = await new Promise((resolve, reject) => {
    if (!header) {
      header = {}
    }
    wx.request({
      url: baseUrl + url, method: 'POST', header, data: params, success(res) {
        if (res.header['Set-Cookie']) {
          wx.setStorageSync('cookie', res.header['Set-Cookie']); //保存Cookie到Storage
        }
        resolve(res.data)
      }
    })
  })
  return result
}
const postForm = async (url, params = {}) => {
  let formData = new FormData();
  for (const key in params) {
    formData.append(key, params[key])
  }
  debugger
  const result = await new Promise((resolve, reject) => {
    const token = getFromStorage('token')
    let data = formData.getData();
    wx.request({
      url: baseUrl + url,
      method: 'POST',
      header: {
        'content-type': data.contentType,
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyTmFtZSI6ImFkbWluIiwidHlwZSI6NiwidXNlcklkIjoidzIzNDM1MzUzNSIsImlhdCI6MTY1MDgwNTEwMywiZXhwIjoxNjUxNDA5OTAzfQ.Tj6oS59GCGCihsAhyHKx1SZ5VuyAkaE4nylld0Ujycg'
      },
      data: data.buffer,
      success: function (res) {
        resolve(res.data)
      },
      fail: function (error) {
        reject(error)
      }
    });
  })
  return result
}
const requestDelete = async (url, params, header) => {
  if (!header) {
    header = {}
  }
  header.Authorization = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyTmFtZSI6ImFkbWluIiwidHlwZSI6NiwidXNlcklkIjoidzIzNDM1MzUzNSIsImlhdCI6MTY1MDgwNTEwMywiZXhwIjoxNjUxNDA5OTAzfQ.Tj6oS59GCGCihsAhyHKx1SZ5VuyAkaE4nylld0Ujycg'
  const result = await new Promise((resolve, reject) => {
    wx.request({
      url: baseUrl + url, method: 'DELETE', header, data: params, success(res) {
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
  postForm,
  requestDelete,
  getFromStorage,
  throttle
}
