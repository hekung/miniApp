/*
 * @Author: your name
 * @Date: 2022-02-23 19:55:12
 * @LastEditTime: 2022-03-08 10:18:09
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \miniprogram-1\pages\repair\repairRecords\repairRecords.js
 */
const { queryEmplyeeList, queryRoleList, queryCommunityList } = require('../../../utils/api')
// const app = getApp()
Page({
  data: {
    pickerType: 1,
    roleList: [],
    roleName: '',
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
    search_roleId_eq: '',// 角色 选择
    search_status_eq: '',// 状态 （0：离职；1：在职）
    search_userName_like: '',//员工名搜索
    search_phoneNumber_like: '',// 手机号搜索
    tableData: [],
    columns: [
      { title: '姓名', attr: 'userName', width: '160rpx' },
      { title: '角色', attr: 'roleName', width: '200rpx' },
      { title: '手机号', attr: 'phoneNumber', width: '200rpx' },
      { title: '状态', attr: 'statusName', width: '160rpx' },
    ],
    pickList: [],
    communityList: [],
    communityNameList: [],
    responsorList: ['A', 'B']
  },
  async searchList() {
    const { search_communityId_eq, search_roleId_eq, search_status_eq, search_phoneNumber_like, search_userName_like } = this.data
    const res = await queryEmplyeeList({
      search_communityId_eq,
      search_roleId_eq,
      search_status_eq,
      search_phoneNumber_like,
      search_userName_like,
      search_provinceCode_eq: this.data.selectedOptions.province.code,
      search_cityCode_eq: this.data.selectedOptions.city.code,
      search_countryCode_eq: this.data.selectedOptions.country.code
    })
    if (res.state == 200) {
      res.data.forEach(e => {
        e.statusName = e.status == 1 ? '在职' : '离职'
      });
      this.setData({
        tableData: res.data
      })
    }
  },
  onChangeStatusType(e) {
    this.setData({
      search_status_eq: e.detail
    })
  },
  onInput(e) {
    if (e.currentTarget.dataset.type === 'userName') {
      this.setData({
        search_userName_like: e.detail
      })
    } else {
      this.setData({
        search_phoneNumber_like: e.detail
      })
    }
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
        pickList: this.data.roleList.map(e => e.roleName)
      })
    }
  },
  async onChangePickVal(e) {
    if (this.data.pickerType == 2) {

    } else if (this.data.pickerType == 3) {

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
    // if (this.data.pickType == 0) {
    //   this.setData({
    //     selectedOptions: []
    //   })
    // } else if (this.data.pickType == 1) {
    //   this.setData({
    //     search_communityId_eq: ''
    //   })
    // } else {
    //   this.setData({
    //     search_roleId_eq: ''
    //   })
    // }
  },
  goAdd() {
    wx.navigateTo({
      url: '/pages/management/employManage/addEmployee/addEmployee'
    });
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
      selectDisplace: '',
      selectedCommunity: '', // 小区中文
      roleName: '',
      search_communityId_eq: '', // 小区选择
      search_roleId_eq: '',// 角色 选择
      search_status_eq: '',// 状态 （0：离职；1：在职）
      search_userName_like: '',//员工名搜索
      search_phoneNumber_like: '',// 手机号搜索
    })
    this.searchList()
  },
  onShow() {
    this.searchList()
    this.getRoles()
  }
})
