/*
 * @Author: your name
 * @Date: 2022-02-21 11:31:25
 * @LastEditTime: 2022-02-23 20:14:06
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
        url: '/pages/stock/stockImport/stockImport',
        src:'/assets/img/stock/import.png',
        text:'入库'
      },
      {
        url:'/pages/stock/stockOutport/stockOutport',
        src:'/assets/img/stock/outport.png',
        text:'出库'
      },
      {
        url:'/pages/stock/stockTask/stockTask',
        src:'/assets/img/stock/task.png',
        text:'仓库分拣任务'
      },
      {
        url:'/pages/stock/stockQuery/stockQuery',
        src:'/assets/img/stock/query.png',
        text:'库存查询'
      },
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