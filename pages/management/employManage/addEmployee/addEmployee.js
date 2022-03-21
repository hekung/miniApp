
const { queryCommunityList, queryRoleList, createEmployee } = require('../../../../utils/api')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    step: 0,
    // startDate:'',
    // endDate:'',
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
    isAllComChecked: false,
    selectDisplace: '',// 区域中文
    selectDisplace2: '',// 区域中文
    communityIds: [], // 小区中文
    pickList: [],
    pickerType: 1,
    communityList: [],
    roleList: [],

    userName: '',
    sex: '',
    roleId: '',
    phoneNumber: '',
    wechatNo: '',
    birthTime: '',
    idType: '',
    passNumber: '',
    address: '',
    imgUrls: [],
    contractUrl: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getRoles()
  },
  clickToPick(e) {
    const pickerType = e.currentTarget.dataset.type
    this.setData({
      pickerType,
      showPicker: true
    })
    if (this.data.pickerType == 2) {
      this.setData({
        pickList: this.data.roleList.map(e => e.roleName)
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
        const values = e.detail._values
        this.setData({
          selectedOptions: values,
          selectDisplace: values.province.name + values.city.name + values.country.name
        })
        this.queryCommunitys(values)
        break;
      case 2:
        const role = this.data.roleList[e.detail.index]
        this.setData({
          roleName: role.roleName,
          roleId: role.id
        })
        break;
      case 3:
        const values2 = e.detail._values
        this.setData({
          selectedOptions2: values2,
          selectDisplace2: values2.province.name + values2.city.name + values2.country.name
        })
        break;
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
        communityList: res.data,
        isAllComChecked: false,
        communityIds: []
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
  onChangeCommunityIds(e) {
    this.setData({
      communityIds: e.detail,
      isAllComChecked: this.data.communityList.length == e.detail.length
    });
  },
  onAllComChange() {
    if (this.data.communityList.length == this.data.communityIds.length) {
      this.setData({
        communityIds: [],
        isAllComChecked: false
      })
    } else {
      this.setData({
        communityIds: this.data.communityList.map(e => e.id),
        isAllComChecked: true
      })
    }
  },
  // bindStartDateChange(e) {
  //   console.log('picker发送选择改变，携带值为', e.detail.value)
  //   this.setData({
  //     startDate: e.detail.value
  //   })
  // },
  // bindEndDateChange(e) {
  //   console.log('picker发送选择改变，携带值为', e.detail.value)
  //   this.setData({
  //     endDate: e.detail.value
  //   })
  // },
  goNext() {
    if (!this.data.communityIds.length) {
      wx.showToast({
        title: '请选择小区',
        icon: 'error',
        duration: 2000
      })
      return
    }
    const step = this.data.step
    this.setData({
      step: step + 1
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
      // formData: { user: 'test' },
      success(res) {
        // 上传完成需要更新 fileList
        const { imgUrls = [] } = _this.data;
        imgUrls.push({ url: JSON.parse(res.data).data })
        _this.setData({ imgUrls });
      },
    });
  },
  deleteImg(e) {
    const index = e.detail.index
    const { imgUrls } = this.data
    imgUrls.splice(index, 1)
    this.setData({
      imgUrls
    })
  },
  afterRead(event) {
    debugger
    const { file } = event.detail;
    const _this = this
    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
    wx.uploadFile({
      url: 'http://119.91.25.208/api/propertyResources/uploadResource', // 仅为示例，非真实的接口地址
      filePath: file.url,
      name: 'file',
      // formData: { user: 'test' },
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
  save() {
    const params = {
      userName: this.data.userName,
      sex: this.data.sex,
      roleId: this.data.roleId,
      phoneNumber: this.data.phoneNumber,
      wechatNo: this.data.wechatNo,
      birthTime: this.data.birthTime ? this.data.birthTime + ' 00:00:00' : '',
      provinceCode: this.data.selectedOptions2.province.code,
      cityCode: this.data.selectedOptions2.city.code,
      countryCode: this.data.selectedOptions2.country.code,
      province: this.data.selectedOptions2.province.name,
      city: this.data.selectedOptions2.city.name,
      country: this.data.selectedOptions2.country.name,
      address: this.data.address,
      idType: this.data.idType,
      idNumber: this.data.idNumber,
      communityIds: this.data.communityIds,
      imgUrls: this.data.imgUrls.map(e => e.url),
      contractUrl: this.data.contractUrl.length ? this.data.contractUrl[0].url : ''
    }
    createEmployee(params).then(res => {
      if (res.state == 200) {
        wx.showToast({
          title: '新增员工成功',
          icon: 'success'
        })
        setTimeout(() => {
          wx.navigateBack()
        }, 1300)
      }
    })
  },
  goLast() {
    const step = this.data.step
    this.setData({
      step: step - 1
    })
  },
  onInput(e) {
    const type = e.currentTarget.dataset.type
    this.setData({
      [type]: e.detail
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
  onChangeIdType(e) {
    this.setData({
      idType: e.detail
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