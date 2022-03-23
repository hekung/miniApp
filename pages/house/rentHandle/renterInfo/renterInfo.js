/*
 * @Author: your name
 * @Date: 2022-02-28 20:15:19
 * @LastEditTime: 2022-03-01 15:28:16
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \miniprogram-1\pages\repair\repairRecordOne\repairRecordOne.js
 */
// pages/repair/repairRecordOne/repairRecordOne.js
const { queryRenterInfo } = require('../../../../utils/api')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    info: {
      id: '',
      userName: '',
      phoneNumber: '',
      wechatNo: '',
      birthTime: '',
      displace: '',
      sex: '',
      idType: '',
      idNumber: '',
      leaseRecord: {
        buildNo: '',
        layerNo: '',
        price: '',
        beginTime: '',
        endTime: '',
        realEndTime: '',
        roomId: '',
        roomNo: '',
        communityName: '',
        address: '',
        deposit: '',// 押金
        priceType: '',//租金类  0 月租 1季度组  2年租
        status: '',// 0 租期结束 1 在租
        contractUrl: ''
      },
      resourceList: [{
        resourceId: '',
        url: ''
      }]
    },
  },
  goback() {
    wx.navigateBack({
      delta: 1
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.setData({
      id: options.id
    })
    this.getInfo(options.id)
  },
  downloadFile() {
    wx.downloadFile({
      url: this.data.info.leaseRecord.contractUrl,
    })
  },
  getInfo(id) {
    queryRenterInfo(id).then(res => {
      if (res.state == 200) {
        console.log(res.data);
        res.data.birthTime = res.data.birthTime ? res.data.birthTime.split(' ')[0] : ''
        const { province = '', city = '', country = '', address = '' } = res.data
        res.data.displace = province + city + country + address
        this.setData({
          info: res.data
        })
      }
    })
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