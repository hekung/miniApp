/*
 * @Author: your name
 * @Date: 2022-02-28 20:15:19
 * @LastEditTime: 2022-03-01 15:28:16
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \miniprogram-1\pages\repair\repairRecordOne\repairRecordOne.js
 */
// pages/repair/repairRecordOne/repairRecordOne.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info:{
      no: 'dwq',
      status:'dwq',
      childNo:'',
      rate: 'dqw',
      item:'dq',
      scope:'dq',
      community: 'dwwq',
      createTime:'qwdwq',
      creator:'dwqdq',
      remark:'d',
      imgs:[
        "https://images.unsplash.com/photo-1565699894576-1710004524ba?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1832&q=80",
        "https://images.unsplash.com/photo-1565699894576-1710004524ba?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1832&q=80",
        "https://images.unsplash.com/photo-1565699894576-1710004524ba?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1832&q=80"
      ]
    },
    rangeList:[
      '全部',
      '发起报修',
      '已派单',
      '已接单',
      '检测完成',
      '维修完成',
      '报修完成',
      '维修中止',
    ],
    tableData: [
      {id:1,no: '233',rate: '中',items:'dqw.dwq',scope:'是被',community:'dwq',createTime:'dasdadsadd',linkUrl: '/pages/repair/repairInfo/repairInfo?id='+ 1},
      {id:2,no: '233',rate: '中',items:'dqw.dwq',scope:'是被',community:'dwq',createTime:'dasdadsadd',linkUrl: '/pages/repair/repairInfo/repairInfo?id='+ 1},
      {id:3,no: '233',rate: '中',items:'dqw.dwq',scope:'是被',community:'dwq',createTime:'dasdadsadd',linkUrl: '/pages/repair/repairInfo/repairInfo?id='+ 1},
      {id:4,no: '233',rate: '中',items:'dqw.dwq',scope:'是被',community:'dwq',createTime:'dasdadsadd',linkUrl: '/pages/repair/repairInfo/repairInfo?id='+ 1},
      {id:5,no: '233',rate: '中',items:'dqw.dwq',scope:'是被',community:'dwq',createTime:'dasdadsadd',linkUrl: '/pages/repair/repairInfo/repairInfo?id='+ 1},
      {id:6,no: '233',rate: '中',items:'dqw.dwq',scope:'是被',community:'dwq',createTime:'dasdadsadd',linkUrl: '/pages/repair/repairInfo/repairInfo?id='+ 1},
    ],

    columns:[
      {title: '子单号',attr: 'no'},
      {title: '位置',attr: 'rate'},
      {title: '状态',attr: 'items'},
      {title: '负责人',attr: 'scope'},
      {title: '操作',attr: 'community'},
    ],
  },
  goback(){
    wx.navigateBack({
      delta: 1
    });
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