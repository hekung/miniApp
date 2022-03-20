// pages/repair/makeRepair/makeRepair.js
const citys = {
  浙江: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
  福建: ['福州', '厦门', '莆田', '三明', '泉州'],
};
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scopeType: 1,
    selectedOptions: [],
    showPicker: false,
    pickerType: 1,
    contentType: 1,
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
    selectedCommunity: '',
    communityList: [
      'dad',
      'dasda'
    ],
    columns: [],
    checkedRooms: [],
    houses: [
      {
        buildNo: 1,
        layerList: [
          {
            layerNo: 1,
            roomList: [
              { roomNo: 101 }
            ]
          }
        ]
      },
      {
        buildNo: 2,
        layerList: [
          {
            layerNo: 1,
            roomList: [
              { roomNo: 101 }
            ]
          }
        ]
      },
      {
        buildNo: 3,
        layerList: [
          {
            layerNo: 1,
            roomList: [
              { roomNo: 101 }
            ]
          }
        ]
      },
      {
        buildNo: 4,
        layerList: [
          {
            layerNo: 1,
            roomList: [
              { roomNo: 101 }
            ]
          }
        ]
      },
      {
        buildNo: 5,
        layerList: [
          {
            layerNo: 1,
            roomList: [
              { roomNo: 101 }
            ]
          }
        ]
      }
    ],
    form2:{
      tags:[
       {name:'灯泡',check: false},
       {name: '水龙头',check: false},
       {name: '马桶',check: false},
       {name:'墙面深水',check: false},
       {name:'管道漏水',check: false}    
      ],
      isOtherItem: false,
      messageItem:'',
      rate:''
    },
    fileList:[],
    rangeList:[
      '低',
      '中',
      '高'
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  onClosePick(e) {
    this.setData({
      showPicker: false
    })
  },
  onChangePickVal(event) {
    if (this.data.pickerType === 1) {
      //省市区
      debugger
      const { picker, value, index } = event.detail;
      picker.setColumnValues(1, citys[value[0]]);
    } else {
      //小区
    }
  },
  clickToPick(e) {
    const type = e.currentTarget.dataset.type
    this.setData({
      showPicker: true,
      columns: type === 1 ? this.data.disList : this.data.communityList
    })
  },
  onChangeScopeType(e) {
    this.setData({
      scopeType: e.detail
    })
  },
  houseChangeSelectAll(e) {
    const buildNo = e.currentTarget.dataset.buildNo
    const item = this.data.houses.find(e => e.buildNo === buildNo)
    item.layerList.forEach((layer) => {
      layer.selectAll = e.detail.value
      layer.roomList.forEach((room) => {
        room.selected = e.detail.value
      })
    })
    //判断是否选整个小区
    // let allchecked = this.houses.every((e) => e.selectAll === true)
    // this.radio = allchecked
  },
  floorChangeSelectAll(e) {
    const buildNo = e.currentTarget.dataset.buildNo
    const item = this.data.houses.find(e => e.buildNo === buildNo)
    const layerNo = e.currentTarget.dataset.layerNo
    const layer = item.find(e => e.layerNo === layerNo)
    layer.roomList.forEach((room) => {
      room.selected = e
    })
    // 判断是否选择整栋
    let isHouseCheck = item.layerList.every((e) => e.selectAll === true)
    item.selectAll = isHouseCheck
    //判断是否选整个小区
    // let allchecked = this.houses.every((e) => e.selectAll === true)
    // this.radio = allchecked
  },
  roomChangeSelect(e) {
    const buildNo = e.currentTarget.dataset.buildNo
    const item = this.data.houses.find(e => e.buildNo === buildNo)
    const layerNo = e.currentTarget.dataset.layerNo
    const layer = item.find(e => e.layerNo === layerNo)
    // 判断是否选择整楼
    let isFloorCheck = layer.roomList.every((e) => e.selected === true)
    layer.selectAll = isFloorCheck
    // 判断是否选择整栋
    let isHouseCheck = house.layerList.every((e) => e.selectAll === true)
    house.selectAll = isHouseCheck
    //判断是否选整个小区
    let allchecked = this.houses.every((e) => e.selectAll === true)
    this.radio = allchecked
  },
  tapToNext(){
    this.setData({
      contentType:2
    })
  },
  clickTag(e){
    const itemName = e.currentTarget.dataset.item 
    const index = this.data.form2.tags.findIndex(e=> e.name === itemName)
    const item = this.data.form2.tags[index]
    item.check = !item.check
    const key = `form2.tags[${index}]`
    this.setData({
      [key]: item
    })
  },
  onChangeIsOtherItem(e){
    this.setData({
      'form2.isOtherItem': e.detail
    })
  },
  bindRatePickerChange(e){
    this.setData({
      'form2.rate': e.detail.value
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
  submit(){},
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