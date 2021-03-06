const { baseUrl, getFromStorage, postForm } = require('./util.js');
async function getSettingData() {
    return new Promise((resolve, reject) => {
        wx.getSetting({
            success: function (res) {
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称
                    wx.getUserInfo({
                        success: function (res) {
                            resolve(res.userInfo)
                        }
                    })
                }
            }
        })
    })
}
async function catchPhoneNumber({ encryptedData, iv, skey, name, url }) {
    return new Promise((resolve, reject) => {
        let cookie = getFromStorage('cart')
        console.log('getPhoneNumber的skey入参：', skey)
        wx.request({
            url: baseUrl + '/innobeautylocal/wechat/getPhoneNumber',
            data: {
                encryptedData,
                iv,
                skey,
                name,
                url
            },
            header: {
                cookie
            },
            method: "post",
            success: function (res) {

                console.log('getPhone', res)
                if (res.data.status === 0) {
                    wx.removeStorageSync('cart')
                    if (res.header['Set-Cookie']) {
                        // cookie.getCookie(res.header['Set-Cookie'])
                        // console.log(res.header['Set-Cookie'])
                        wx.setStorageSync('cookie', res.header['Set-Cookie']); //保存Cookie到Storage

                    }
                    resolve(true)
                } else {
                    wx.removeStorageSync('skey')
                    resolve(false)
                }
            },
            fail: function (e) {
                resolve(false)
            }
        })
    })
}
async function checkUserLogin() {
    return new Promise((resolve, reject) => {
        wx.checkSession({
            success: function () {
                //存在登陆态
                resolve(true)
            },
            fail: async function () {
                //不存在登陆态
                // const status = await onLogin()
                resolve(false)
            }
        })
    })
}
function onLogin() {
    return new Promise((resolve, reject) => {
        wx.login({
            success: function (res) {
                if (res.code) {
                    console.log('code:' + res.code);
                    // postForm('/api/applet/login', { code: res.code }).then(res => {
                    //     console.log(res);
                    // }).catch(err => {
                    //     console.log(err);
                    // })
                    //发起网络请求
                    // wx.request({
                    //     url: baseUrl + '/api/applet/login',
                    //     method: 'POST',
                    //     data: {
                    //         code: res.code
                    //     },
                    //     headers: {
                    //         'Content-Type': 'application/x-www-form-urlencoded'
                    //     },
                    //     success: function (res) {
                    //         if (res.header['Set-Cookie']) {
                    //             wx.setStorageSync('cookie', res.header['Set-Cookie']); //保存Cookie到Storage
                    //         }
                    //         if (res.data.status === 0) {
                    //             //获取到用户凭证 存儲 3rd_session 
                    //             let skey = res.data.date.skey
                    //             console.log('调用登录获取的skey', skey)
                    //             let register = res.data.date.register
                    //             try {
                    //                 wx.setStorageSync(
                    //                     'skey',
                    //                     skey
                    //                 )
                    //                 wx.setStorageSync(
                    //                     'register',
                    //                     register
                    //                 )
                    //                 resolve({ skey, register })
                    //                 if (register) {
                    //                     wx.removeStorageSync('cart')
                    //                 }
                    //             } catch (e) { resolve(false) }
                    //         } else {
                    //             resolve(false)
                    //             console.log('登录错误', res.data)
                    //         }
                    //     },
                    //     fail: function (res) {
                    //         console.log({
                    //             title: 'loginCheckFail:' + res.data.msg,
                    //             icon: 'none'
                    //         })
                    //         resolve(false)
                    //     }
                    // })
                }
            },
            fail: function (res) {
                resolve(false)
            }
        })
    })
}
async function getUserInfo() {
    return new Promise((resolve, reject) => {
        wx.getUserInfo({
            success: function (res) {
                var userInfo = res.userInfo
                resolve(userInfo)
            },
            fail: function () {
                resolve({})
            }
        })
    })
}
module.exports = {
    getSettingData,
    checkUserLogin,
    onLogin,
    getUserInfo,
    catchPhoneNumber
}