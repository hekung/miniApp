/*
 * @Author: your name
 * @Date: 2022-02-23 19:55:12
 * @LastEditTime: 2022-04-11 14:36:02
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \miniprogram-1\pages\repair\repairRecords\repairRecords.js
 */
const { queryRepairRecords, queryCommunityList } = require('../../../utils/api')
Page({
  data: {
    active: 0,
    status: 0,
    no: "",
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
    selectDisplace: '',
    selectedCommunity: '',
    selectedResponser: '',
    principal: '',
    communityId: '',
    pickerType: 1,
    tableData: [
      { id: 1, no: '233', rate: '中', items: 'dqw.dwq', scope: '是被', community: 'dwq', createTime: 'dasdadsadd', linkUrl: '/pages/repair/repairRecordOne/repairRecordOne?id=' + 1 },
      { id: 2, no: '233', rate: '中', items: 'dqw.dwq', scope: '是被', community: 'dwq', createTime: 'dasdadsadd', linkUrl: '/pages/repair/repairRecordOne/repairRecordOne?id=' + 2 },
      { id: 3, no: '233', rate: '中', items: 'dqw.dwq', scope: '是被', community: 'dwq', createTime: 'dasdadsadd', linkUrl: '/pages/repair/repairRecordOne/repairRecordOne?id=' + 3 },
      { id: 4, no: '233', rate: '中', items: 'dqw.dwq', scope: '是被', community: 'dwq', createTime: 'dasdadsadd', linkUrl: '/pages/repair/repairRecordOne/repairRecordOne?id=' + 4 },
      { id: 5, no: '233', rate: '中', items: 'dqw.dwq', scope: '是被', community: 'dwq', createTime: 'dasdadsadd', linkUrl: '/pages/repair/repairRecordOne/repairRecordOne?id=' + 5 },
      { id: 6, no: '233', rate: '中', items: 'dqw.dwq', scope: '是被', community: 'dwq', createTime: 'dasdadsadd', linkUrl: '/pages/repair/repairRecordOne/repairRecordOne?id=' + 5 },
    ],
    columns: [
      { title: '单号', attr: 'no', width: '200rpx' },
      { title: '等级', attr: 'level', width: '160rpx' },
      { title: '报修事项', attr: 'repairItemName', width: '200rpx' },
      { title: '范围类型', attr: 'type', width: '200rpx' },
      { title: '小区', attr: 'communityName', width: '200rpx' },
      { title: '发起时间', attr: 'createTime', width: '200rpx' },
    ],
    pickList: [],
    communityList: [],
    communityNameList: [],
    principalList: []
  },
  searchList() {
    const params = {
      communityId: this.data.communityId,
      status: this.data.status,
      principal: this.data.principal,
      no: this.data.no,
      type: this.data.active
    }
    queryRepairRecords(params).then(res => {
      if (res.state == 200) {
        res.forEach(e => {
          e.communityName = e.community.name
        });
        this.setData({
          tableData: res.data
        })
      }
    })
  },
  onChangeTab(e) {
    this.setData({
      active: e.detail.name
    })
    this.searchList()
  },
  onChangestatus(e) {
    this.setData({
      status: e.detail
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
        pickList: this.data.principalList
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
      const communityId = this.data.communityList.find(el => el.name === e.detail.value).id
      this.setData({
        selectedCommunity: e.detail.value,
        communityId
      })
    } else if (this.data.pickerType == 3) {
      this.setData({
        selectedResponser: e.detail.value,
        principal: this.data.principalList.find(el => el.name === e.detail.value).id
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
  onCancelPick() {
    this.setData({
      showPicker: false
    })
  },
  onShow() {
    this.searchList()
  },
  reset(){
    this.setData({
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
      selectDisplace: '',
      selectedCommunity: '', // 小区中文
      communityId: '',
      communityList: [],
      communityNameList: [],
      selectedResponser:'',
      principal:''
    })
    this.searchList()
  }
})
