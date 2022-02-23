/*
 * @Author: your name
 * @Date: 2022-02-21 11:31:25
 * @LastEditTime: 2022-02-23 19:54:57
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
        url: '/pages/repair/makeRepair/makeRepair',
        src:'/assets/img/repair/repair.png',
        text:'发起报修'
      },
      {
        url:'/pages/repair/repairRecords/repairRecords',
        src:'/assets/img/repair/records.png',
        text:'报修记录'
      },
      {
        url:'/pages/repair/executeTask/executeTask',
        src:'/assets/img/repair/handle.png',
        text:'报修任务执行'
      },
      {
        url:'/pages/repair/executeWaterElec/executeWaterElec',
        src:'/assets/img/repair/handle.png',
        text:'执行抄水电表'
      },
      {
        url:'/pages/repair/distributeTask/distributeTask',
        src:'/assets/img/repair/distribute.png',
        text:'委派报修任务'
      },
      {
        url:'/pages/repair/distributeWaterElec/distributeWaterElec',
        src:'/assets/img/repair/distribute.png',
        text:'委派抄水电表'
      },
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