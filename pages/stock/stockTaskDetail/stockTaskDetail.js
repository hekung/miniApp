/*
 * @Author: your name
 * @Date: 2022-02-21 19:33:54
 * @LastEditTime: 2022-02-24 20:25:52
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \miniprogram-1\pages\house\analysis\analysis.js
 */
// pages/house/analysis/analysis.js
const { queryAreaListByHouse, queryTaskDetail, handleInOut } = require('../../../utils/api')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    no: '',
    type: '',
    typeName: '',
    inventoryId: '',
    creatorName: '',
    childNo: '',
    productName: '',
    spec: '',
    price: '',
    count: '',
    pickerType: '',
    pickList: [
    ],
    area: '',
    showPicker: false,
    productTypeList: ['工程类', '生活类'],

    area: '',
    // tableData: [],
    // columns: [
    //   { title: '子单号', attr: 'childNo', width: '300rpx' },
    //   { title: '仓库', attr: 'createTime', width: '300rpx' },
    //   { title: '产品', attr: 'productName', width: '300rpx' },
    //   { title: '产品类型', attr: 'productType', width: '300rpx' },
    //   { title: '规格', attr: 'specsification', width: '300rpx' },
    //   { title: '单价', attr: 'price', width: '300rpx' },
    //   { title: '数量', attr: 'count', width: '300rpx' },
    //   { title: '状态', attr: 'status', width: '300rpx' },
    // ],
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
      inventoryId: options.inventoryId,
      type: options.type,
      typeName: options.type == 0 ? '出库' : '入库'
    })
    this.getDetailInfo()
    this.getAreaListByHouse()
  },
  getDetailInfo() {
    const params = {
      inventoryId: this.data.inventoryId,
      type: 1
    }
    queryTaskDetail(params).then(res => {
      if (res.state == 200) {
        this.setData({
          id: res.data.id,
          no: res.data.no,
          creatorName: res.data.creatorName,
          childNo: res.data.childNo,
          productName: res.data.productName,
          spec: res.data.spec,
          price: res.data.price,
          count: res.data.count
        })
      }
    })
  },
  getAreaListByHouse() {
    const params = {
      id: this.data.inventoryId
    }
    queryAreaListByHouse(params).then(res => {
      if (res.state == 200) {
        this.setData({
          pickList: res.data
        })
      }
    })
  },
  handle() {
    const params = {
      id: this.data.id,
      area: this.data.area
    }
    handleInOut(params).then(res => {
      wx.showToast({
        title: this.data.typeName + '成功'
      })
      this.goback()
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
      // status: e.detail.index
      area: e.detail.value
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