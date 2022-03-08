const app = getApp()
const citys = {
  浙江: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
  福建: ['福州', '厦门', '莆田', '三明', '泉州'],
};
Page({

  /**
   * 页面的初始数据
   */
  data: {
    step:0,
    startDate:'',
    endDate:'',
    selectedOptions:[],
    selectedCommunity:'',
    buildNo:'',
    layerNo:'',
    roomNo:'',
    pickList:[],
    pickerType:1,
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
    communityList:[1,3123,4432231],
    buildList:[1,2,3],
    layerList:[2,3,4],
    roomList:[3,4,5],

    userName:'',
    sex:'',
    phone:'',
    appId:'',
    wechat:'',
    birthDate:'',
    passType:'',
    passNumber:'',
    passPlaces:[],
    address:'',
    imgUrls:[],

    price:'',
    dateTypeOptions:[
      { text: '日', value: 0 },
      { text: '月', value: 1 },
      { text: '季', value: 2 },
      { text: '年', value: 3 },
    ],
    dateType: '',
    statusType: '',
    lastMonthWater:'',
    lastMonthWaterDate:'',
    lastMonthElec:'',
    lastMonthElecDate:'',
    yajin:'',
    fileList:[] 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  clickToPick(e){
    const pickerType = e.currentTarget.dataset.type
    this.setData({
      pickerType,
      showPicker: true
    })
    if(this.data.pickerType == 1){
      this.setData({
        pickList: this.data.disList 
      })
    }else if(this.data.pickerType == 2){
      this.setData({
        pickList: this.data.communityList 
      })
    }else if(this.data.pickerType == 3) {
      this.setData({
        pickList: this.data.buildList 
      })
    }
    else if(this.data.pickerType == 4) {
      this.setData({
        pickList: this.data.layerList 
      })
    }
    else if(this.data.pickerType == 5) {
      this.setData({
        pickList: this.data.roomList 
      })
    }
    else if(this.data.pickerType == 6) {
      this.setData({
        pickList: this.data.disList 
      })
    }
  },
  onChangePickVal(e){
    // if(this.data.pickerType == 1){
    //   const { picker, value, index } = e.detail;
    //   picker.setColumnValues(1, citys[value[0]]);
    // }else if(this.data.pickerType == 2){

    // }else {

    // }
  },
  onClosePick(){
    this.setData({
      showPicker:false
    })
  },
  onConfirmPick(e){
    console.log(e);
    this.setData({
      showPicker:false
    })
    switch(this.data.pickerType){
      case 1: break;
      case 1: break;
      case 1: break;
      case 1: break;
      case 1: break;
      case 1: break;
      default: break;
    }
  },
  onCancelPick(){
    // this.setData({
    //   showPicker:false
    // })
    // if(this.data.pickType == 1){
    //   this.setData({
    //     selectedOptions:[]
    //   })
    // }else  if(this.data.pickType == 2){
    //   this.setData({
    //     selectedCommunity: ''
    //   })
    // }else {
    //   this.setData({
    //     selectedResponser: ''
    //   })
    // }
  },
  bindStartDateChange(e){
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      startDate: e.detail.value
    })
  },
  bindLastWaterDateChange(e){
    this.setData({
      lastMonthWaterDate: e.detail.value
    })
  },
  bindLastElecDateChange(e){
    this.setData({
      lastMonthElecDate: e.detail.value
    })
  },
  bindEndDateChange(e){
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      endDate: e.detail.value
    })
  },
  onChangeStatusType(e){
    this.setData({
      statusType: e.detail,
    });
  },
  goNext(){
    const step = this.data.step
    this.setData({
      step: step+1
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
  afterReadImg(event){
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
  save(){},
  goLast(){
    const step = this.data.step
    this.setData({
      step: step -1
    })
  },
  cancelCreate(){
    wx.navigateBack({
      delta: 1
    });
  },
  onChangeSexType(e){
    this.setData({
      sex: e.detail
    })
  },
  bindBirthDateChange(e) {
    this.setData({
      birthDate: e.detail.value
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