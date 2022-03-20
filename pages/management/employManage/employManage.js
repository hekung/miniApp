/*
 * @Author: your name
 * @Date: 2022-02-23 19:55:12
 * @LastEditTime: 2022-03-08 10:18:09
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \miniprogram-1\pages\repair\repairRecords\repairRecords.js
 */
const { queryEmplyeeList, queryRoleList, queryProvinceList, queryCityList, queryCountryList } = require('../../../utils/api')
// const app = getApp()
const citys = {
  浙江: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
  福建: ['福州', '厦门', '莆田', '三明', '泉州'],
};
Page({
  data: {
    provinceList: [],
    cityList: [],
    countryList: [],
    pickerType: 1,
    roleList: [],
    roleName: '',
    selectedOptions: [],
    search_communityId_eq: '', // 小区选择
    search_roleId_eq: '',// 角色 选择
    search_status_eq: '',// 状态 （0：离职；1：在职）
    search_userName_like: '',//员工名搜索
    search_phoneNumber_like: '',// 手机号搜索
    tableData: [
      { id: 1, no: '233', rate: '中', items: 'dqw.dwq', scope: '是被', community: 'dwq', createTime: 'dasdadsadd', linkUrl: '/pages/repair/repairRecordOne/repairRecordOne?id=' + 1 },
      { id: 2, no: '233', rate: '中', items: 'dqw.dwq', scope: '是被', community: 'dwq', createTime: 'dasdadsadd', linkUrl: '/pages/repair/repairRecordOne/repairRecordOne?id=' + 2 },
      { id: 3, no: '233', rate: '中', items: 'dqw.dwq', scope: '是被', community: 'dwq', createTime: 'dasdadsadd', linkUrl: '/pages/repair/repairRecordOne/repairRecordOne?id=' + 3 },
      { id: 4, no: '233', rate: '中', items: 'dqw.dwq', scope: '是被', community: 'dwq', createTime: 'dasdadsadd', linkUrl: '/pages/repair/repairRecordOne/repairRecordOne?id=' + 4 },
      { id: 5, no: '233', rate: '中', items: 'dqw.dwq', scope: '是被', community: 'dwq', createTime: 'dasdadsadd', linkUrl: '/pages/repair/repairRecordOne/repairRecordOne?id=' + 5 },
      { id: 6, no: '233', rate: '中', items: 'dqw.dwq', scope: '是被', community: 'dwq', createTime: 'dasdadsadd', linkUrl: '/pages/repair/repairRecordOne/repairRecordOne?id=' + 5 },
    ],
    columns: [
      { title: '单号', attr: 'no' },
      { title: '等级', attr: 'rate' },
      { title: '报修事项', attr: 'items' },
      { title: '范围类型', attr: 'scope' },
      { title: '小区', attr: 'community' },
      { title: '发起时间', attr: 'createTime' },
    ],
    pickList: [],
    disList: [
      {
        values: Object.keys(citys),
        className: 'column1',
      },
      {
        values: citys['浙江'],
        className: 'column2',
        defaultIndex: 2,
      },
    ],
    communityList: ['1', '2', '23'],
    responsorList: ['A', 'B']
  },
  async searchList() {
    const res = await queryEmplyeeList({

    })
  },
  onChangeStatusType(e) {
    console.log(e);
  },
  clickToPick(e) {
    const pickerType = e.currentTarget.dataset.type
    this.setData({
      pickerType,
      showPicker: true
    })
    if (this.data.pickerType == 1) {
      this.setData({
        pickList: this.data.disList
      })
    } else if (this.data.pickerType == 2) {
      this.setData({
        pickList: this.data.communityList
      })
    } else {
      this.setData({
        pickList: this.data.roleList.map(e => e.roleName)
      })
    }
  },
  async onChangePickVal(e) {
    if (this.data.pickerType == 1) {
      debugger
      const { picker, value, index } = e.detail;
      if (index == 0) {
        const provinceName = e.detail.value[0]
        const provinceCode = this.data.provinceList.find(e => e.name == provinceName).code
        const res = await queryCityList(provinceCode)
        if (res.state == 200) {
          // this.roleList = res.data
          const disList = this.data.disList
          if (res.data && res.data.length) {
            disList[1] = {
              values: res.data.map(e => e.name)
            }
          } else {
            disList[1] = {
              values: []
            }
          }
          this.setData({
            cityList: res.data || [],
            disList,
            pickList: disList
          })
        }
      } else if (index == 1) {
        const cityName = e.detail.value[1]
        const cityCode = this.data.cityList.find(e => e.name == cityName).code
        const res = await queryCountryList(cityCode)
        if (res.state == 200) {
          // this.roleList = res.data
          const disList = this.data.disList
          if (res.data.length) {
            disList[2] = {
              values: res.data.map(e => e.name)
            }
          } else {
            disList[2] = {
              values: []
            }
          }

          this.setData({
            countryList: res.data || [],
            disList,
            pickList: disList
          })
        }
      }
      // picker.setColumnValues(1, citys[value[0]]);

    } else if (this.data.pickerType == 2) {

    } else {

    }
  },
  onClosePick() {
    this.setData({
      showPicker: false
    })
  },
  onConfirmPick(e) {
    // console.log(e);
    this.setData({
      showPicker: false
    })
    if (this.data.pickType == 1) {

    } else if (this.data.pickType == 2) {

    } else {
      const roleItem = this.data.roleList[e.detail.index]
      this.setData({
        search_roleId_eq: roleItem.id,
        roleName: e.detail.value
      })
    }
  },
  onCancelPick() {
    this.setData({
      showPicker: false
    })
    if (this.data.pickType == 0) {
      this.setData({
        selectedOptions: []
      })
    } else if (this.data.pickType == 1) {
      this.setData({
        search_communityId_eq: ''
      })
    } else {
      this.setData({
        search_roleId_eq: ''
      })
    }
  },
  goAdd() {
    wx.navigateTo({
      url: '/pages/house/rentHandle/addRenter/addRenter'
    });
  },
  async getRoles() {
    const res = await queryRoleList()
    if (res.state == 200) {
      // this.roleList = res.data
      this.setData({
        roleList: res.data
      })
    }
  },
  reset() {
    this.setData({
      selectedOptions: [],
      search_communityId_eq: '', // 小区选择
      search_roleId_eq: '',// 角色 选择
      search_status_eq: '',// 状态 （0：离职；1：在职）
      search_userName_like: '',//员工名搜索
      search_phoneNumber_like: '',// 手机号搜索
    })
  },
  onLoad() {
    this.searchList()
    this.getRoles()
    queryProvinceList().then(res => {
      if (res.state == 200) {
        // this.roleList = res.data
        this.setData({
          provinceList: res.data,
          provinceNameList: res.data.map(e => e.name),
          disList: [
            {
              values: res.data.map(e => e.name)
            }
          ]
        })
      }
    })
  }
})
