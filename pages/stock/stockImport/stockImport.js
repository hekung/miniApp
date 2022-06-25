/*
 * @Author: your name
 * @Date: 2022-02-21 19:33:54
 * @LastEditTime: 2022-02-24 20:25:52
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \miniprogram-1\pages\house\analysis\analysis.js
 */
// pages/house/analysis/analysis.js
const { queryInOutList, queryCommunityList, queryWarehouseList, queryProductList } = require('../../../utils/api')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 'a',
    pickerType: 1,
    pickList: [],
    statusName: '',
    showPicker: false,
    selectDisplace: '',
    selectedOptions: {
      province: {
        name: '',
        code: '',
      },
      city: {
        name: '',
        code: ''
      },
      country: {
        name: '',
        code: ''
      }
    },
    statusList: [
      "发起申请",
      '完成',
      '中止'
    ],
    communityList: [],
    communityNameList: [],
    selectedCommunity: '', // 小区中文
    communityId: '', // 查询入参
    productList: [],
    productNameList: [],
    selectProductName: '',
    productTypeName: '',
    productTypeList: ['工程类', '生活类'],
    selectHouseName: '', //仓库名称
    houseList: [],
    houseNameList: [],
    form1: {
      status: '',
    },
    form2: {
      inventoryId: '',
      productType: '',
      specification: '',//规格
      price: '', //单价
      count: '',//数量
      communityId: '',//小区id
      associatedNo: '',// 关联单号
      warehouseId: ''// 仓库id
    },
    tableData: [],
    columns: [
      { title: '单号', attr: 'no', width: '300rpx' },
      { title: '申请时间', attr: 'createTime', width: '300rpx' },
      { title: '任务状态', attr: 'statusName', width: '300rpx' },
    ],
  },
  reset() {
    this.data.form1.status = ''
    this.data.statusName = ''
    this.getImportList()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (this.data.active == 'a') {
      this.getImportList()
    }
  },
  getImportList() {
    const params = {
      status: this.data.form1.status,
      type: 1
    }
    queryInOutList(params).then(res => {
      if (res.state == 200) {
        res.data.forEach(e => {
          e.statusName = this.data.statusList[e.status]
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
        pickList: this.data.statusList
      })
    } else if (this.data.pickerType == 3) {
      this.setData({
        pickList: this.data.productNameList
      })
    } else if (this.data.pickerType == 4) {
      this.setData({
        pickList: this.data.productTypeList
      })
    } else if (this.data.pickerType == 5) {
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
    if (this.data.pickerType == 1) {
      // const values = e.detail._values
      // this.setData({
      //   selectedOptions: values,
      //   selectDisplace: values.province.name + values.city.name + values.country.name,
      //   selectedCommunity: e.detail.value,
      //   communityId,
      //   buildNo: ''
      // })
      this.queryCommunitys(values)
    } else if (this.data.pickerType == 2) {
      this.setData({
        'form1.status': e.detail.index,
        statusName: e.detail.value
      })
      this.getImportList()
    } else if (this.data.pickerType == 3) {
      this.setData({
        selectProductName: e.detail.value,
        'form2.inventoryId': this.data.productList.find(el => el.name == e.detail.value).id
      })
    } else if (this.data.pickerType == 4) {
      this.setData({
        selectProductName: e.detail.value,
        'form2.productType': this.data.productTypeList.findIndex(el => el == e.detail.value)
      })
    } else if (this.data.pickerType == 5) {
      this.setDate({
        selectHouseName: e.detai.value,
        'form2.warehouseId': this.data.houseList.find(el => el.name === e.detail.value)
      })
    }
  },
  async queryCommunitys(values) {
    const params = {
      provinceCode: values.province.code,
      cityCode: values.city.code,
      countryCode: values.country.code
    }
    const res = await queryCommunityList(params)
    if (res.state == 200) {
      // this.communityList = res.data
      this.setData({
        communityList: res.data,
        communityNameList: res.data.map(e => e.name)
      })
    }
  },
  onChange(e) {
    // wx.showToast({
    //   title: `切换到标签 ${event.detail.name}`,
    //   icon: 'none',
    // });
    this.setData({
      active: e.detail.name
    })
    if (this.data.active == 'a') {
      this.getImportList()
    } else {
      this.getProductList()
      this.getHouseList()
    }
  },
  getProductList() {
    queryProductList().then(res => {
      if (res.state == 200) {
        this.setData({
          productList: res.data,
          productNameList: res.data.map(e => e.name)
        })
      }
    })
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