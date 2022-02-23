/*
 * @Author: your name
 * @Date: 2022-02-21 11:31:25
 * @LastEditTime: 2022-02-23 19:35:20
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
        url: '/pages/house/analysis/analysis',
        src:'/assets/img/house/quality.png',
        text:'房态查询/分析'
      },
      {
        url:'/pages/house/rentHandle/rentHandle',
        src:'/assets/img/house/handle.png',
        text:'租赁处理'
      },
      {
        url:'/pages/house/changePrice/changePrice',
        src:'/assets/img/house/change.png',
        text:'调价'
      },
      {
        url: '/pages/house/records/records',
        src: '/assets/img/house/record.png',
        text: '租金交付记录'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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