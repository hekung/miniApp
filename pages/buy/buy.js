/*
 * @Author: your name
 * @Date: 2022-02-21 11:31:25
 * @LastEditTime: 2022-02-23 20:24:49
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \miniprogram-1\pages\house\house.js
 */
// pages/house/house.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    routes:[
      {
        url: '/pages/buy/review/review',
        src:'/assets/img/buy/review.png',
        text:'审批采购'
      },
      {
        url:'/pages/buy/buyRecords/buyRecords',
        src:'/assets/img/buy/records.png',
        text:'采购记录'
      },
      {
        url:'/pages/buy/executeBuy/executeBuy',
        src:'/assets/img/buy/exeBuy.png',
        text:'执行采购'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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