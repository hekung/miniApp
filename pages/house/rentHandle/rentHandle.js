/*
 * @Author: your name
 * @Date: 2022-02-23 19:55:12
 * @LastEditTime: 2022-03-08 10:18:09
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \miniprogram-1\pages\repair\repairRecords\repairRecords.js
 */
const { queryCommunityList, queryRenterList } = require('../../../utils/api')
const app = getApp()
Page({
  data: {
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
    communityList: [],
    communityNameList: [],
    communityId: '', // 查询入参
    selectedCommunity: '',
    pickerType: 1,
    tableData: [],
    columns: [
      { title: '栋', attr: 'buildNo', width: '140rpx' },
      { title: '房间号', attr: 'roomNo', width: '160rpx' },
      { title: '租客名', attr: 'userName', width: '180rpx' },
      { title: '性别', attr: 'sexName', width: '120rpx' },
      { title: '手机号', attr: 'phoneNumber', width: '220rpx' },
    ],
    pickList: [],

  },
  searchList() {
    queryRenterList(this.data.communityId).then(res => {
      if (res.state == 200) {
        res.data = res.data ? res.data : []
        res.data.forEach(element => {
          element.sexName = element.sex == 1 ? '女' : '男'
          element.linkUrl = '/pages/house/rentHandle/renterInfo/renterInfo?id=' + element.id
        });
        this.setData({
          tableData: res.data
        })
      }
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
        pickList: this.data.communityNameList
      })
    }
  },
  onClosePick() {
    this.setData({
      showPicker: false
    })
  },
  onConfirmPick(e) {
    this.setData({
      showPicker: false
    })
    if (this.data.pickerType == 1) {
      const values = e.detail._values
      this.setData({
        selectedOptions: values,
        selectDisplace: values.province.name + values.city.name + values.country.name,
        selectedCommunity: '',
        communityId: ''
      })
      this.queryCommunitys(values)
    } else if (this.data.pickerType == 2) {
      const communityId = this.data.communityList.find(el => el.name === e.detail.value).id
      this.setData({
        selectedCommunity: e.detail.value,
        communityId
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
        communityList: res.data ? res.data : [],
        communityNameList: res.data ? res.data.map(e => e.name) : []
      })
    }
  },
  onCancelPick() {
    this.setData({
      showPicker: false
    })
  },
  goAdd() {
    wx.navigateTo({
      url: '/pages/house/rentHandle/addRenter/addRenter'
    });
  },
  onShow() {
    if (!this.data.communityId) return
    this.searchList()
  }
})
