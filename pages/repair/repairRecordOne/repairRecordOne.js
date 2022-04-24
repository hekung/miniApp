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
    info: {
      id: null,
      no: null,
      level: null,
      repairItem: {
        name: ''
      },
      type: null,
      type: null,
      community: {
        name: ''
      },
      createTime: '',
      beginTime: '',
      repairWorkflowList: {
        status: '',
        principal: '',
        remark: '',
        principalName: ''
      },
      creator: 'dwqdq',
      remark: 'd',
      resourcesList: [
        {
          resourceId: '',
          url: ''
        }
      ],
      status: ''
    },
    rangeList: [
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
    ],

    columns: [
      { title: '子单号', attr: 'childNo', width: '200rpx' },
      { title: '位置', attr: 'position', width: '160rpx' },
      { title: '状态', attr: 'statusName', width: '160rpx' },
      { title: '负责人', attr: 'principal', width: '160rpx' },
      { title: '操作', attr: 'operate', width: "200rpx" },
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
  bindStatusPickerChange(e) {
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
    this.getList()
  },
  getInfo() {
    queryRepairInfo(this.data.id).then(res => {
      this.setData({
        info: res.data
      })
    })
  },
  getList() {
    let status = this.data.info.status == 0 ? '' : this.data.info.status - 1
    queryRepairDetailList(this.data.id, status).then(res => {
      if (res.state == 200) {
        if (!res.data) {
          res.data = []
        }
        res.data.forEach(e => {
          e.statusName = this.data.rangeList[e.status]
          e.operate = '详情'
          e.linkUrl = '/pages/repair/repairInfo/repairInfo?id=' + e.id
        });
        this.setData({
          tableData: res.data
        })
      }
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