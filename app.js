/*
 * @Author: your name
 * @Date: 2022-02-21 09:34:27
 * @LastEditTime: 2022-02-21 20:26:53
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \miniprogram-1\app.js
 */
// app.js
const { onLogin, checkUserLogin } = require('./utils/login.js');
const { getFromStorage } = require('./utils/util.js');
App({
  async onLaunch() {
    console.log('触发appLaunch ')
    const _this = this
    // 判断是否存在skey，存在就验证有效性
    // onLogin()
    let skey = getFromStorage('skey')
    console.log(skey, '----------skey')
    if (skey) {
      const isValid = await checkUserLogin()
      if (!isValid) {
        await onLogin()
        this.catchUserInfo()
      }
      // this.catchUserInfo()
    } else {
      debugger
      // wx.getUserProfile({
      //   desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      //   success: (res) => {
      //     const { userInfo, rawData, signature, encryptedData, iv
      //     } = res
      //     console.log(res)
      //     // this.setData({
      //     //   userInfo: res.userInfo,
      //     //   hasUserInfo: true
      //     // })

      //   }
      // })
      // await onLogin()
    }
    //获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      },
      fail: () => {

      }
    })
    //获取设备信息
    wx.getSystemInfo({
      success: res => {
        let modelmes = res.model;
        if (modelmes.includes('iPhone X') || modelmes.includes('iPhone 11') || modelmes.includes('unknown')) {
          _this.globalData.isIphoneX = true
        }
      }
    })
  },
  watch: function (prop, method) {
    var obj = this.globalData;
    Object.defineProperty(obj, prop, {
      configurable: true,
      enumerable: true,
      set: function (value) {
        this.userInfo = value;
        console.log('是否会被执行')
        method(value);
      },
      get: function () {
        // 可以在这里打印一些东西，然后在其他界面调用getApp().globalData.name的时候，这里就会执行。
        return this.globalData.userInfo
      }
    })
  },
  globalData: {
    userInfo: null,
    isIphoneX: false
  }
})
