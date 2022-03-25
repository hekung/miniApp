/*
 * @Author: your name
 * @Date: 2022-02-23 19:55:12
 * @LastEditTime: 2022-03-25 17:03:00
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \miniprogram-1\pages\repair\repairRecords\repairRecords.js
 */
const { queryBuildList, queryCommunityList, queryLayerList, queryRooms,queryHouseRentRecords } = require('../../../utils/api')
Page({
  data: {
    pickerType: 1,
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
    communityId: '', // 小区选择
    communityList: [],
    communityNameList: [],
    buildList: [],
    layerList: [],
    roomList: [],
    roomNoList: [],
    buildNo: '',
    layerNo: '',
    roomNo: '',
    roomId: '',
    tableData: [],
    columns: [
      { title: '租客名', attr: 'userName', width: '160rpx' },
      { title: '性别', attr: 'sexName', width: '200rpx' },
      { title: '小程序ID', attr: 'appletOpenId', width: '200rpx' },
      { title: '手机号', attr: 'phoneNumber', width: '160rpx' },
      { title: '起租日', attr: 'beginTime', width: '160rpx' },
      { title: '结组日', attr: 'realEndTime', width: '160rpx' },
      { title: '单价类型', attr: 'priceType', width: '160rpx' },
      { title: '单价', attr: 'price', width: '160rpx' },
    ],
    pickList: [],
  },
  async searchList() {
    const res = await queryHouseRentRecords({
      communityId: this.data.communityId,
      provinceCode: this.data.selectedOptions.province.code,
      cityCode: this.data.selectedOptions.city.code,
      countryCode: this.data.selectedOptions.country.code,
      buildNo: this.data.buildList,
      layerNo: this.data.layerNo,
      roomNo: this.data.roomNo
    })
    if (res.state == 200) {
      res.data.forEach(e => {
        e.sexName = e.sex == 1 ? '女' : '男'
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
        pickList: this.data.buildList
      })
    }else if (this.data.pickerType == 4) {
      this.setData({
        pickList: this.data.layerList
      })
    }
    else if (this.data.pickerType == 5) {
      this.setData({
        pickList: this.data.roomNoList
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
        communityId: '',
        buildNo: '',
        layerNo: '',
        roomId: '',
        roomNo: '',
        communityList: [],
        communityNameList: [],
        buildList: [],
        layerList: [],
        roomList: [],
        roomNoList: []
      })
      this.queryCommunitys(values)
    } else if (this.data.pickerType == 2) {
      const communityId = this.data.communityList.find(el => el.name === e.detail.value).id
      this.setData({
        selectedCommunity: e.detail.value,
        communityId,
        buildNo: '',
        layerNo: '',
        roomId: '',
        roomNo: '',
        buildList: [],
        layerList: [],
        roomList: [],
        roomNoList: []
      })
      this.getBuildList(communityId)
    } else if(this.data.pickerType == 3) {
      this.setData({
        buildNo: e.detail.value,
        layerNo: '',
        roomId: '',
        roomNo: '',
        layerList: [],
        roomList: [],
        roomNoList: []
      })
      this.getLayerList()
    }else if(this.data.pickerType == 4){
      this.setData({
        layerNo: e.detail.value,
        roomId: '',
        roomNo: '',
        roomList: [],
        roomNoList: []
      })
      this.getRoomList()
    }else if(this.data.pickerType == 5){
      this.setData({
        roomId: this.data.roomList.find(el => el.roomNo === e.detail.value).id,
        roomNo: e.detail.value
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
  async getBuildList(id) {
    queryBuildList(id).then(res => {
      if (res.state == 200) {
        this.setData({
          buildList: res.data ? res.data : []
        })
      }
    })
  },
  async getLayerList() {
    queryLayerList({ communityId: this.data.communityId, buildNo: this.data.buildNo }).then(res => {
      if (res.state == 200) {
        this.setData({
          layerList: res.data ? res.data : []
        })
      }
    })
  },
  async getRoomList() {
    queryRooms({ communityId: this.data.communityId, buildNo: this.data.buildNo, layerNo: this.data.layerNo }).then(res => {
      if (res.state == 200) {
        this.setData({
          roomList: res.data ? res.data : [],
          roomNoList: res.data ? res.data.map(e => e.roomNo) : []
        })
      }
    })
  },
  onCancelPick() {
    this.setData({
      showPicker: false
    })
  },
  goAdd() {
    wx.navigateTo({
      url: '/pages/management/employManage/addEmployee/addEmployee'
    });
  },
  reset() {
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
      buildNo: '',
      layerNo: '',
      roomId: '',
      roomNo: '',
      communityList: [],
      communityNameList: [],
      buildList: [],
      layerList: [],
      roomList: [],
      roomNoList: []
    })
    this.searchList()
  },
  onShow() {
    this.searchList()
  }
})
