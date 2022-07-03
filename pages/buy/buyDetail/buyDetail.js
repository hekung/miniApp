/*
 * @Author: your name
 * @Date: 2022-02-23 19:55:12
 * @LastEditTime: 2022-03-08 10:18:09
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \miniprogram-1\pages\repair\repairRecords\repairRecords.js
 */
const { queryBuyDetail } = require('../../../utils/api')
// const app = getApp()
Page({
  data: {
    id: '',
    // info: {
    //   no: '',
    //   community: {
    //     id: '',
    //     name: '',
    //   },
    //   principalName: '',
    //   level: '',
    //   remark: ''
    // },
    no: '',
    communityName: '',
    principalName: '',
    level: '',
    remark: '',
    tableData: [],
    status: [],
    statusList: ['发起申请', '申请批准', '申请否决', '采购完成', '采购中止'],
    columns: [
      { title: '子单号', attr: 'childNo', width: '200rpx' },
      { title: '产品', attr: 'productName', width: '200rpx' },
      { title: '规格', attr: 'spec', width: '160rpx' },
      { title: '数量', attr: 'count', width: '160rpx' },
      { title: '单价', attr: 'price', width: '160rpx' },
      { title: '关联单号', attr: 'associatedNo', width: '160rpx' },
      { title: '状态', attr: 'statusName', width: '160rpx' },
    ],
  },
  async searchInfo() {
    const { id } = this
    const res = await queryBuyDetail({ id })
    if (res.state == 200) {
      // this.productInfo = res.data
      const info = res.data
      this.setData({
        no: info.no,
        communityName: info.community.name,
        principalName: info.principalName,
        level: info.level,
        remark: info.remark,
      })
      info.workflowList.forEach(e => {
        e.statusName = this.data.statusList[e.status]
      })
      this.setData({
        tableData: info.workflowList
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
    this.searchInfo()
  },
  onLoad(options) {
    const { id } = options
    this.setData({
      id
    })
  }
})
