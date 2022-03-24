const { queryBuildList, queryCommunityList, queryLayerList, queryRooms,addRenter } = require('../../../../utils/api')

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
    wechatNo: '',
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
    priceTypeOptions: [
      { text: '月', value: 0 },
      { text: '季', value: 1 },
      { text: '半年', value: 2 },
      { text: '年', value: 3 },
    ],
    priceType: '',
    type: '',
    lastMonthWater: '',
    lastMonthWaterDate: '',
    lastMonthElec: '',
    lastMonthElecDate: '',
    deposit: '',
    contractUrl: []
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
        const values = e.detail._values
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
      type: e.detail,
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
    if(step==1){
      if(!this.data.userName || !this.data.phoneNumber){
        wx.showToast({
          title: '信息请填写完整',
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
    const _this = this
    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
    wx.uploadFile({
      url: 'http://119.91.25.208/api/propertyResources/uploadResource', // 仅为示例，非真实的接口地址
      filePath: file.url,
      name: 'file',
      formData: { user: 'test' },
      success(res) {
        // 上传完成需要更新 fileList
        const { contractUrl = [] } = _this.data;
        contractUrl.push({ url: JSON.parse(res.data).data, name: file.name })
        _this.setData({ contractUrl });
      },
    });
  },
  deleteCon() {
    this.setData({
      contractUrl: []
    })
  },
  bindInput(e) {
    const type = e.currentTarget.dataset.type
    this.setData({
      [type]: e.detail
    })
  },
  deleteImg(e) {
    const index = e.detail.index
    const { imageUrls } = this.data
    imageUrls.splice(index, 1)
    this.setData({
      imageUrls
    })
  },
  afterReadImg(event) {
    const { file } = event.detail;
    const _this = this
    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
    wx.uploadFile({
      url: 'http://119.91.25.208/api/propertyResources/uploadResource', // 仅为示例，非真实的接口地址
      filePath: file.url,
      name: 'file',
      formData: { user: 'test' },
      success(res) {
        // 上传完成需要更新 fileList
        const { imageUrls = [] } = _this.data;
        imageUrls.push({ url: JSON.parse(res.data).data });
        _this.setData({ imageUrls });
      },
    });
  },
  save() {
    if(!this.data.price){
      wx.showToast({
        title: '信息请填写完整',
        icon: 'none'
      })
      return
    }
    const params = {
      "userName": this.data.userName,
      "sex": this.data.sex,
      "phoneNumber": this.data.phoneNumber,
      "wechatNo": this.data.wechatNo,
      "birthTime": this.data.birthTime?this.data.birthTime+' 00:00:00':'',
      "provinceCode": this.data.selectedOptions2.province.code,
      "cityCode": this.data.selectedOptions2.city.code,
      "countryCode": this.data.selectedOptions2.country.code,
      "province": this.data.selectedOptions2.province.name,
      "city": this.data.selectedOptions2.city.name,
      "country":  this.data.selectedOptions2.country.name,
      "address": this.data.address,
      "idType": this.data.idType,
      "haveAppletId": this.data.appletOpenId?1:0,
      "appletOpenId": this.data.appletOpenId,
      "idNumber": this.data.idNumber,
      "imageUrls": this.data.imageUrls.length?this.data.imageUrls.map(e=> e.url):[],
      "roomId": this.data.roomId,
      "beginTime": this.data.startDate?this.data.startDate+' 00:00:00':'',
      "endTime": this.data.endDate?this.data.endDate+' 23:59:59':'',
      communityId: this.data.communityId,
      communityName: this.data.selectedCommunity,
      "tenantRoomDTO": {
        "deposit": this.data.deposit,
        "priceType": this.data.priceType,
        "contractUrl": this.data.contractUrl.length?this.data.contractUrl[0].url:'',
        "price": this.data.price,
        "type": this.data.type,
        "waterNumber": this.data.lastMonthWater,
        "electricNumber": this.data.lastMonthElec,
        "waterTime": this.data.lastMonthWaterDate?this.data.lastMonthWaterDate+' 00:00:00':'',
        "electricTime": this.data.lastMonthElecDate?this.data.lastMonthElecDate+ ' 00:00:00':''
      }
    }
    addRenter(params).then(res=>{
      if(res.state == 200){
        wx.showToast({
          title: '新增租客成功',
          icon: 'none',
        });
        setTimeout(() => {
          wx.navigateBack({
            delta: 1
          });
        }, 1000);
      }else {
        wx.showToast({
          title: '新增租客失败',
          icon: 'none',
        });
      }
    })
   },
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
  onChangePriceType(e) {
    this.setData({
      priceType: e.detail
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