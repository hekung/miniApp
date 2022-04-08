/*
 * @Author: your name
 * @Date: 2022-02-23 19:55:12
 * @LastEditTime: 2022-03-08 10:18:09
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \miniprogram-1\pages\repair\repairRecords\repairRecords.js
 */
const { queryProductRecords, queryProductStockDetail } = require('../../../utils/api')
// const app = getApp()
Page({
  data: {
    warehouseId: '',
    inventoryId: '',
    tableData: [],
    productInfo: {
      name: 'dqw',
      type: 'wdq',//类型（0：工程类；1：生活类）
      specification: 'wqdw',
      total: 'wdq',
      lockNum: 'wdq',
      availableNum: 'wdq',
      wareHouse: {
        id: '',
        name: ''
      },
    },
    beginTime: '',
    endTime: '',
    type: '',//0:出库 1：入库
    columns: [
      { title: '记录类型', attr: 'typeName', width: '160rpx' },
      { title: '单号', attr: 'no', width: '200rpx' },
      { title: '子单号', attr: 'childNo', width: '200rpx' },
      { title: '关联项目', attr: 'associatedNo', width: '200rpx' },
      { title: '发起人', attr: 'creatorName', width: '160rpx' },
      { title: '数量', attr: 'count', width: '160rpx' },
      { title: '角色', attr: 'roleName', width: '160rpx' },
      { title: '日期', attr: 'createTime', width: '160rpx' },
    ],
  },
  bindBeginTimeChange(e) {
    this.setData({
      beginTime: e.detail.value
    })
  },
  bindEndTimeChange(e) {
    this.setData({
      endTime: e.detail.value
    })
  },
  onChangeType(e) {
    this.setData({
      type: e.detail,
    });
  },
  async searchList() {
    const { inventoryId, type, beginTime, endTime } = this.data
    const res = await queryProductRecords({
      inventoryId,
      type,
      beginTime,
      endTime
    })
    if (res.state == 200) {
      if (!res.data) {
        res.data = []
      }
      res.data.forEach(e => {
        e.typeNam = e.type == 1 ? '入库' : '出库'

      });
      this.setData({
        tableData: res.data
      })
    }
  },
  async searchInfo() {
    const { warehouseId, inventoryId } = this
    const res = await queryProductStockDetail({ warehouseId, inventoryId })
    if (res.state == 200) {
      this.productInfo = res.data
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
    this.searchInfo()
    this.searchList()
  },
  onLoad(options) {
    const { warehouseId
      , inventoryId } = options
    this.setData({
      warehouseId,
      inventoryId
    })
  }
})
