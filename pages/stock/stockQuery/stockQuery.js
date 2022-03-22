/*
 * @Author: your name
 * @Date: 2022-02-23 19:55:12
 * @LastEditTime: 2022-03-08 10:18:09
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \miniprogram-1\pages\repair\repairRecords\repairRecords.js
 */
const { queryStockList, queryWarehouseList } = require('../../../utils/api')
// const app = getApp()
Page({
  data: {
    selectedStore: '', // 小区中文
    warehouseId: '', // 小区选择
    name: '',
    tableData: [],
    columns: [
      { title: '仓库', attr: 'name', width: '160rpx' },
      { title: '类型', attr: 'typeName', width: '200rpx' },
      { title: '产品', attr: 'product', width: '200rpx' },
      { title: '规格', attr: 'specification', width: '160rpx' },
      { title: '可用量', attr: 'availableNum', width: '160rpx' },
    ],
    storeList: [],
    storeNameList: [],
  },
  async searchList() {
    const { warehouseId, name } = this.data
    const res = await queryStockList({
      warehouseId,
      name
    })
    if (res.state == 200) {
      if (!res.data) {
        res.data = []
      }
      res.data.forEach(e => {
        e.typeNam = e.type == 1 ? '生活类' : '工程类'
        e.linkUrl = `/pages/stock/stockQuery/stockDetail/stockDetail?inventoryId=${e.inventoryId}&warehouseId=${e.warehouseId}`

      });
      this.setData({
        tableData: res.data
      })
    }
  },
  onInput(e) {
    this.setData({
      name: e.detail
    })
  },
  clickToPick(e) {
    this.setData({
      showPicker: true
    })
  },
  onClosePick() {
    this.setData({
      showPicker: false
    })
  },
  onConfirmPick(e) {
    this.setData({
      showPicker: false,
      selectedStore: e.detail.value,
      warehouseId: this.data.storeList.find(el => el.name === e.detail.value).id
    })
  },
  async getSotres() {
    const res = await queryWarehouseList()
    if (res.state == 200) {
      // this.storeList = res.data
      this.setData({
        storeList: res.data,
        storeNameList: res.data.map(e => e.name)
      })
    }
  },
  reset() {
    this.setData({
      selectedStore: '', // 小区中文
      warehouseId: '', // 小区选择
      name: ''
    })
    this.searchList()
  },
  onShow() {
    this.searchList()
    this.getSotres()
  }
})
