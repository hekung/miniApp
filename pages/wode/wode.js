// pages/my/my.js
// const { getUserInfo } = require('../../utils/api.js')
const { getFromStorage, postForm } = require('../../utils/util.js')
const { onLogin, catchPhoneNumber } = require('../../utils/login.js')
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    dialogShow: false,
    statusBarHeight: app.globalData.statusBarHeight,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    userInfo: {},
    hasUserInfo: false,
    hasTel: false,
    tel: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    // this.catchWXinfo()
  },
  catchWXinfo() {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        const { userInfo, rawData, signature, encryptedData, iv
        } = res
        // this.setData({
        //   userInfo: res.userInfo,
        //   hasUserInfo: true
        // })

      }
    })
  },
  getPhoneNumber: async function (e) {
    let that = this;
    console.log('手机号信息：', e);
    if (e.detail.errMsg == "getPhoneNumber:ok") {
      // const skey = await getFromStorage('skey')
      // if (skey) {
      //   this.queryPhone({ ...e, skey })
      // } else {
      //   let loginStatus = await onLogin()
      //   if (loginStatus) {
      //     skey = await getFromStorage('skey')
      //     this.queryPhone({ ...e, skey })
      //   }
      // }
    }
    // 这里要先获取登陆时保存的seeion_key
    // if (e.detail.errMsg == "getPhoneNumber:ok") {
    // }
  },
  async queryPhone({ encryptedData, skey, iv }) {
    let tel = await catchPhoneNumber({ ...e, skey })
    if (tel) {
      this.setData({
        tel
      })
    } else {
      tel = await catchPhoneNumber({ ...e, skey })
      tel && this.setData({
        tel
      })
    }
  },
  async catchUserInfo() {
    const result = await getUserInfo()
    let { success, user, unpay_order = 0, pay_order = 0, unreceive_order = 0 } = result
    if (success) {
      let all_order = unpay_order + pay_order + unreceive_order
      // res.render('my', { user: user, unpay_order, pay_order, unreceive_order, all_order })
      this.setData({
        infoAndNum: {
          user,
          unpay_order,
          pay_order,
          unreceive_order,
          all_order
        }
      })
    }
  },
  togglePop() {
    let dialogShow = !this.data.dialogShow
    this.setData({ dialogShow })
  },
  // gotoPersonPage() {
  //   wx.navigateTo({
  //     url: '/pages/personInfo/personInfo'
  //   })
  // },
  checkPermission(e) {
    let skey = getFromStorage('skey')
    let url = e.currentTarget.dataset.url
    let encodeUrl = encodeURIComponent(url)
    if (!skey) {
      wx.navigateTo({
        url: '/pages/personInfo/personInfo?returnUrl=' + encodeUrl
      })
    } else {
      wx.navigateTo({
        url
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})