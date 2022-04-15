/*
 * @Author: your name
 * @Date: 2022-02-28 20:15:19
 * @LastEditTime: 2022-04-15 16:10:21
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \miniprogram-1\pages\repair\repairRecordOne\repairRecordOne.js
 */
// pages/repair/repairRecordOne/repairRecordOne.js
const { queryRepairInfo, queryRepairDetailList } = require('../../../utils/api')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    info:{
      id:null,
      no: null,
      level: null,
      repairItem:{
        name:''
      },
      type:null,
      type:null,
      community: {
        name:''
      },
      createTime:'',
      beginTime:'',
      repairWorkflowList:{
        status:'',
        principal:'',
        remark:'',
        principalName:''
      },
      creator:'dwqdq',
      remark:'d',
      resourcesList:[
        {
          resourceId:'',
          url:''
        }
      ],
      status: ''
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
      {id:1,no: '233',level: '中',items:'dqw.dwq',scope:'是被',community:'dwq',createTime:'dasdadsadd',linkUrl: '/pages/repair/repairInfo/repairInfo?id='+ 1},
      {id:2,no: '233',level: '中',items:'dqw.dwq',scope:'是被',community:'dwq',createTime:'dasdadsadd',linkUrl: '/pages/repair/repairInfo/repairInfo?id='+ 1},
      {id:3,no: '233',level: '中',items:'dqw.dwq',scope:'是被',community:'dwq',createTime:'dasdadsadd',linkUrl: '/pages/repair/repairInfo/repairInfo?id='+ 1},
      {id:4,no: '233',level: '中',items:'dqw.dwq',scope:'是被',community:'dwq',createTime:'dasdadsadd',linkUrl: '/pages/repair/repairInfo/repairInfo?id='+ 1},
      {id:5,no: '233',level: '中',items:'dqw.dwq',scope:'是被',community:'dwq',createTime:'dasdadsadd',linkUrl: '/pages/repair/repairInfo/repairInfo?id='+ 1},
      {id:6,no: '233',level: '中',items:'dqw.dwq',scope:'是被',community:'dwq',createTime:'dasdadsadd',linkUrl: '/pages/repair/repairInfo/repairInfo?id='+ 1},
    ],

    columns:[
      {title: '子单号',attr: 'no'},
      {title: '位置',attr: 'position'},
      {title: '状态',attr: 'items'},
      {title: '负责人',attr: 'scope'},
      {title: '操作',attr: 'community'},
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const id = options.id
    this.setData({
      id
    })
  },
  bindStatusPickerChange(e){
    this.setData({
      'info.status': e.detail.value
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
    this.getInfo()
  },
  getInfo(){
    queryRepairInfo(this.data.id).then(res=>{
      this.setData({
        info: res.data
      })
    })
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