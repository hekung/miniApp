/*
 * @Author: your name
 * @Date: 2022-02-28 20:15:19
 * @LastEditTime: 2022-03-01 15:28:16
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \miniprogram-1\pages\repair\repairRecordOne\repairRecordOne.js
 */
// pages/repair/repairRecordOne/repairRecordOne.js
const { queryEmpInfo, delEmpInfo, departureEmpInfo } = require('../../../../utils/api')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    info: {
      userName: '',
      status: '',
      sex: '',
      roleName: '',
      phoneNumber: '',
      wechatNo: '',
      birthTime: '',
      displace: '',
      idType: '',
      idNumber: '',
      contractUrl: '',
      communities: []
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
  getInfo(id) {
    queryEmpInfo(id).then(res => {
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
  //删除
  deleteInfo() {
    const _this = this
    wx.showModal({
      title: '提示',
      content: '是否确认删除该员工',
      success(res) {
        if (res.confirm) {
          delEmpInfo(_this.data.id)
          wx.showToast({
            title: '删除员工信息成功',
          })
          setTimeout(() => {
            wx.navigateBack()
          }, 1200);
        }
      }
    })
  },
  //离职
  departureEmployee() {
    const _this = this
    wx.showModal({
      title: '提示',
      content: '是否确认该员工离职',
      success(res) {
        if (res.confirm) {
          departureEmpInfo(_this.data.id)
          wx.showToast({
            title: '员工离职成功',
          })
          setTimeout(() => {
            wx.navigateBack()
          }, 1200);
        }
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