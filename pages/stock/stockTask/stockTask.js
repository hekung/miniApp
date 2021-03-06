/*
 * @Author: your name
 * @Date: 2022-02-21 19:33:54
 * @LastEditTime: 2022-02-24 20:25:52
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \miniprogram-1\pages\house\analysis\analysis.js
 */
// pages/house/analysis/analysis.js
const { needInOutTaskList, queryWarehouseList } = require('../../../utils/api')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: 0,
    typeName: '出库',
    pickerType: 1,
    pickList: [],
    showPicker: false,
    statusList: [
      "发起申请",
      '完成',
      '中止'
    ],
    productTypeList: ['工程类', '生活类'],
    selectHouseName: '', //仓库名称
    houseId: '',
    houseList: [],
    houseNameList: [],
    tableData: [],
    columns: [
      { title: '仓库', attr: 'createTime', width: '300rpx' },
      { title: '产品', attr: 'productName', width: '300rpx' },
      { title: '产品类型', attr: 'productType', width: '300rpx' },
      { title: '规格', attr: 'specsification', width: '300rpx' },
      { title: '数量', attr: 'count', width: '300rpx' },
      { title: '状态', attr: 'status', width: '300rpx' },
    ],
  },
  reset() {
    this.setData({
      houseId: '',
      selectHouseName: ''
    })
    this.getStockTaskList()
  },
  goback() {
    wx.navigateBack({
      delta: 1
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
    this.getStockTaskList()
    this.getHouseList()
  },
  getStockTaskList() {
    const params = {
      warehouseId: this.data.houseId,
      type: this.data.type
    }
    needInOutTaskList(params).then(res => {
      if (res.state == 200) {
        res.data.forEach(e => {
          e.statusName = this.data.statusList[e.status]
          e.linkUrl = e.linkUrl = `/pages/stock/stockTaskDetail/stockTaskDetail?inventoryId=${e.inventoryId}type=0&no=+${e.no}`
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
    if (this.data.pickerType == 2) {
      this.setData({
        pickList: this.data.houseNameList
      })
    }
  },
  onCancelPick() {
    this.setData({
      showPicker: false
    })
  },
  onConfirmPick(e) {
    this.setData({
      showPicker: false
    })
    if (this.data.pickerType == 2) {
      this.setData({
        selectHouseName: e.detail.value,
        houseId: this.data.houseList.find(el => el.name === e.detail.value).id
      })
    }
  },
  onChange(e) {
    this.setData({
      type: e.detail.name,
      typeName: e.detail.name == 0 ? '出库' : '入库'
    })
    this.getStockTaskList()
  },
  getHouseList() {
    queryWarehouseList().then(res => {
      if (res.state == 200) {
        this.setData({
          houseList: res.data,
          houseNameList: res.data.map(e => e.name)
        })
      }
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