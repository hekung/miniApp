/*
 * @Author: your name
 * @Date: 2022-02-21 09:34:27
 * @LastEditTime: 2022-02-21 20:26:53
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \miniprogram-1\app.js
 */
// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    // wx.login({
    //   success: res => {
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //   }
    // })

    // 设备
    wx.getSystemInfo({
      success: res => {
        let modelmes = res.model;
        if (modelmes.includes('iPhone X') || modelmes.includes('iPhone 1') || modelmes.includes('unknown')) {
          this.setData({
            isIphoneX: true
          })
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
