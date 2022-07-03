/*
 * @Author: your name
 * @Date: 2022-02-23 19:55:12
 * @LastEditTime: 2022-03-08 10:18:09
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \miniprogram-1\pages\repair\repairRecords\repairRecords.js
 */
const { queryCommunityList, queryBuyRecords } = require('../../../utils/api')
// const app = getApp()
Page({
  data: {
    pickerType: 1,
    search_level_eq: '',
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
    selectDisplace: '',// 区域中文
    selectedCommunity: '', // 小区中文
    search_communityId_eq: '', // 小区选择
    search_status_eq: '',// 状态 （0：离职；1：在职）
    search_no_like: '',//单号搜索
    tableData: [],
    columns: [
      { title: '单号', attr: 'no', width: '200rpx' },
      { title: '申报人', attr: 'userName', width: '160rpx' },
      { title: '备注', attr: 'remark', width: '160rpx' },
      { title: '等级', attr: 'level', width: '160rpx' },
      { title: '小区', attr: 'commmunityName', width: '160rpx' },
      { title: '状态', attr: 'statusName', width: '160rpx' },
    ],
    pickList: [],
    communityList: [],
    communityNameList: [],
    statusList: ['发起采购申请', '申请批准', '申请否决', '采购完成', '采购中止'],
    levelList: ['低', '中', '高'],
    statusName: ''
  },
  async searchList() {
    const { search_communityId_eq, search_level_eq, search_status_eq, search_no_like } = this.data
    const res = await queryBuyRecords({
      search_communityId_eq,
      search_level_eq,
      search_status_eq,
      search_no_like,
      search_provinceCode_eq: this.data.selectedOptions.province.code,
      search_cityCode_eq: this.data.selectedOptions.city.code,
      search_countryCode_eq: this.data.selectedOptions.country.code
    })
    if (res.state == 200) {
      res.data.forEach(e => {
        e.statusName = this.statusList[e.status]
        e.commmunityName = e.community.name
        e.linkUrl = '/pages/buy/buyDetail/buyDetail?id=' + e.id
      });
      this.setData({
        tableData: res.data
      })
    }
  },
  onInput(e) {
    this.setData({
      search_no_like: e.detail
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
    } else if (this.data.pickerType == 3) {
      this.setData({
        pickList: this.data.levelList
      })
    } else if (this.data.pickerType == 4) {
      this.setData({
        pickList: this.data.statusList
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
        selectDisplace: values.province.name + values.city.name + values.country.name
      })
      this.queryCommunitys(values)
    } else if (this.data.pickerType == 2) {
      this.setData({
        selectedCommunity: e.detail.value,
        search_communityId_eq: this.data.communityList.find(el => el.name === e.detail.value).id
      })
    } else if (this.data.pickerType == 3) {
      this.setData({
        search_level_eq: e.detail.value
      })
    } else if (this.data.pickerType == 4) {
      this.setData({
        search_status_eq: e.detail.index,
        statusName: e.detail.value
      })
    }
  },
  onCancelPick() {
    this.setData({
      showPicker: false
    })
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
  reset() {
    this.setData({
      selectedOptions: [],
      selectDisplace: '',
      selectedCommunity: '', // 小区中文
      search_level_eq: '',
      search_communityId_eq: '', // 小区选择
      search_status_eq: '',// 状态 （0：离职；1：在职）
      search_no_like: '',//员工名搜索
    })
    this.searchList()
  },
  onShow() {
    this.searchList()
  }
})
