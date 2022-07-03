/*
 * @Author: your name
 * @Date: 2022-02-21 19:33:54
 * @LastEditTime: 2022-02-24 20:25:52
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \miniprogram-1\pages\house\analysis\analysis.js
 */
// pages/house/analysis/analysis.js
const { queryInOutDetailList } = require('../../../utils/api')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    no: '',
    createTime: '',
    type: '',
    pickList: [
      "发起申请",
      '完成',
      '中止'
    ],
    statusName: '',
    showPicker: false,
    productList: [],
    productNameList: [],
    selectProductName: '',
    productTypeName: '',
    productTypeList: ['工程类', '生活类'],
    status: '',
    tableData: [],
    columns: [
      { title: '子单号', attr: 'childNo', width: '300rpx' },
      { title: '仓库', attr: 'createTime', width: '300rpx' },
      { title: '产品', attr: 'productName', width: '300rpx' },
      { title: '产品类型', attr: 'productType', width: '300rpx' },
      { title: '规格', attr: 'specsification', width: '300rpx' },
      { title: '单价', attr: 'price', width: '300rpx' },
      { title: '数量', attr: 'count', width: '300rpx' },
      { title: '状态', attr: 'status', width: '300rpx' },
    ],
  },
  reset() {
    this.setData({
      status: '',
      statusName: ''
    })
    this.getHistoryDetailList()
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
    this.setData({
      no: options.no,
      createTime: options.createTime
    })
    this.getHistoryDetailList()
  },
  getHistoryDetailList() {
    const params = {
      status: this.data.tatus,
      type: 1
    }
    queryInOutDetailList(params).then(res => {
      if (res.state == 200) {
        res.data.forEach(e => {
          e.statusName = this.data.statusList[e.status]
          e.linkUrl = "/pages/stock/stockInOutDetailHistory/stockInOutDetailHistory?type=1&no=" + e.no
        })
        this.setData({
          tableData: res.data
        })
      }
    })
  },
  onClosePick() {
    this.setData({
      showPicker: false
    })
  },
  clickToPick(e) {
    const pickerType = e.currentTarget.dataset.type
    this.setData({
      pickerType,
      showPicker: true
    })
  },
  onCancelPick() {
    this.setData({
      showPicker: false
    })
  },
  onConfirmPick(e) {
    this.setData({
      showPicker: false,
      status: e.detail.index,
      statusName: e.detail.value
    })
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