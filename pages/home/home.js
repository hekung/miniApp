/*
 * @Author: your name
 * @Date: 2022-02-21 09:56:33
 * @LastEditTime: 2022-02-23 19:32:23
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \miniprogram-1\pages\home\home.js
 */
// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeObj:{
      name: '',
      text:''
    },
    activeRoutesList:[],
    routes:[
      {
        src:'/assets/img/house_h.png',
        text:'房屋',
        url: '/pages/house/house',
        name: 'house'
      },
      {
        src:'/assets/img/repair_h.png',
        text:'维修',
        name: 'repair',
        url:'/pages/repair/repair'
      },
      {
        src:'/assets/img/stock_h.png',
        text:'库存',
        name:'stock',
        url:'/pages/stock/stock'
      },
      {
        src:'/assets/img/buy_h.png',
        text:'采购',
        name: 'buy',
        url: '/pages/buy/buy'
      },
      {
        src:'/assets/img/manage_h.png',
        text:'管理',
        name:'management',
        url: '/pages/management/management'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.activeRoutesList = this.routes
    this.setData({
      activeRoutesList: this.data.routes
    })
  },
  tapBlock(e){
    const item = e.currentTarget.dataset.item
    if(item.url){
      wx.navigateTo({
        url: item.url,
        success: (result)=>{
        },
        fail: ()=>{},
        complete: ()=>{}
      });
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