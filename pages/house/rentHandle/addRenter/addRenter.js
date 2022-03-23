const { queryBuildList, queryCommunityList, queryLayerList, queryRooms } = require('../../../../utils/api')
const a = {
  "userName": "名称",
  "sex": "性别（0：男；1：女）",
  "phoneNumberNumber": "性别（0：男；1：女）",
  "wechatNo": "微信号",
  "birthTime": "出生日期",
  "provinceCode": "省份code",
  "cityCode": "城市code",
  "countryCode": "县城code",
  "province": "省份名称",
  "city": "城市名称",
  "country": "县城信息",
  "address": "详细地址",
  "idType": "证件类型（0：护照；1：身份证）",
  "haveAppletId": "是否有小程序id(0：没有；1：有)",
  "appletOpenId": "小程序id",
  "idNumber": "身份证号",
  "imageUrls": "证件照片",
  "roomId": "房屋id",
  "beginTime": "租赁开始时间",
  "endTime": "租赁结束时间",
  "tenantRoomDTO": {
    "deposit": "押金",
    "priceType": "租金类型",
    "contractUrl": "合同地址",
    "price": "租金价格",
    "type": "类型（0：新租；1：已在租）",
    "waterNumber": "水表数",
    "electricNumber": "电表数",
    "waterTime": "水表抄表时间",
    "electricTime": "电表抄表时间"
  }
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    step: 0,
    startDate: '',
    endDate: '',
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
    communityId: '',
    communityList: [],
    communityNameList: [],
    buildNo: '',
    layerNo: '',
    roomNo: '',
    roomId: '',
    pickList: [],
    pickerType: 1,
    buildList: [],
    layerList: [],
    roomList: [],
    roomNoList: [],
    userName: '',
    sex: '',
    phoneNumber: '',
    appletOpenId: '',
    wechat: '',
    birthTime: '',
    idType: '',
    idNumber: '',
    selectDisplace2: '',
    selectedOptions2: {
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
    address: '',
    imageUrls: [],

    price: '',
    dateTypeOptions: [
      { text: '日', value: 0 },
      { text: '月', value: 1 },
      { text: '季', value: 2 },
      { text: '年', value: 3 },
    ],
    dateType: '',
    statusType: '',
    lastMonthWater: '',
    lastMonthWaterDate: '',
    lastMonthElec: '',
    lastMonthElecDate: '',
    yajin: '',
    fileList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    }
    else if (this.data.pickerType == 4) {
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
    console.log(e);
    this.setData({
      showPicker: false
    })
    switch (this.data.pickerType) {
      case 1:
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
        }
        break;
      case 2:
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
        break;
      case 3:
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
        break;
      case 4:
        this.setData({
          layerNo: e.detail.value,
          roomId: '',
          roomNo: '',
          roomList: [],
          roomNoList: []
        })
        this.getRoomList()
        break;
      case 5:
        this.setData({
          roomId: this.data.roomList.find(el => el.roomNo === e.detail.value).id,
          roomNo: e.detail.value
        })
        break
      case 6:
        this.setData({
          selectedOptions2: values,
          selectDisplace2: values.province.name + values.city.name + values.country.name,
        })
      default: break;
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
  bindStartDateChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      startDate: e.detail.value
    })
  },
  bindLastWaterDateChange(e) {
    this.setData({
      lastMonthWaterDate: e.detail.value
    })
  },
  bindLastElecDateChange(e) {
    this.setData({
      lastMonthElecDate: e.detail.value
    })
  },
  bindEndDateChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      endDate: e.detail.value
    })
  },
  onChangeStatusType(e) {
    this.setData({
      statusType: e.detail,
    });
  },
  onChangeIdType(e) {
    this.setData({
      idType: e.detail
    })
  },
  goNext() {
    const step = this.data.step
    if (step == 0) {
      if (!this.data.startDate || !this.data.endDate) {
        wx.showToast({
          title: '请选择日期',
          icon: 'none'
        })
        return
      }
      if (!this.data.roomId) {
        wx.showToast({
          title: '请选择房间',
          icon: 'none'
        })
        return
      }
    }
    this.setData({
      step: step + 1
    })
  },
  afterRead(event) {
    const { file } = event.detail;
    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
    wx.uploadFile({
      url: 'http://119.91.25.208/api/propertyResources/uploadResource', // 仅为示例，非真实的接口地址
      filePath: file.url,
      name: 'file',
      formData: { user: 'test' },
      success(res) {
        // 上传完成需要更新 fileList
        const { fileList = [] } = this.data;
        fileList.push({ ...file, url: res.data });
        this.setData({ fileList });
      },
    });
  },
  bindInput(e) {
    const type = e.currentTarget.dataset.type
    this.setData({
      [type]: e.detail
    })
  },
  afterReadImg(event) {
    const { file } = event.detail;
    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
    wx.uploadFile({
      url: 'http://119.91.25.208/api/propertyResources/uploadResource', // 仅为示例，非真实的接口地址
      filePath: file.url,
      name: 'file',
      formData: { user: 'test' },
      success(res) {
        // 上传完成需要更新 fileList
        const { imageUrls = [] } = this.data;
        imageUrls.push({ ...file, url: res.data });
        this.setData({ imageUrls });
      },
    });
  },
  save() { },
  goLast() {
    const step = this.data.step
    this.setData({
      step: step - 1
    })
  },
  cancelCreate() {
    wx.navigateBack({
      delta: 1
    });
  },
  onChangeSexType(e) {
    this.setData({
      sex: e.detail
    })
  },
  bindbirthTimeChange(e) {
    this.setData({
      birthTime: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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