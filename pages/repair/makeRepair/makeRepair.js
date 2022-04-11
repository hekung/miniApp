// pages/repair/makeRepair/makeRepair.js
const { createRepair, queryBuildList, queryCommunityList, queryLayerList, queryRooms,queryRepaireItems } = require('../../../utils/api')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: 1,  
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
    showPicker: false,
    pickerType: 1,
    contentType: 1,
    pickList:[],
    selectedCommunity: '',
    communityId:'',
    communityList: [
    ],
    communityNameList:[],
    buildList: [],
    layerList: [],
    roomList: [],
    roomNoList: [],
    buildNo: '',
    layerNo: '',
    roomNo: '',
    roomId: '',
    columns: [],
    form2:{
      tags:[
       {name:'灯泡',check: false},
       {name: '水龙头',check: false},
       {name: '马桶',check: false},
       {name:'墙面深水',check: false},
       {name:'管道漏水',check: false}    
      ],
      imageUrls:[],
      isOtherItem: false,
      messageItem:'',
      level:''
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
    this.getRepairItems()
  },
  getRepairItems(){
    queryRepaireItems().then(res=>{
      // this.form2.tags = res.data
      res.data.forEach(element => {
        element.check = false
      });
      this.setData({
        'form2.tags':res.data
      })
    })
  },
  onClosePick(e) {
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
    }else if(this.data.pickerType == 3) {
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
    }else if(this.data.pickerType == 6){
       this.setData({
        'form2.level': e.detail.value
       })
    }
  },
  clickToPick(e) {
    const type = e.currentTarget.dataset.type
    this.setData({
      showPicker: true,
      pickerType: type
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
    else if (this.data.pickerType == 6) {
      this.setData({
        pickList: this.data.rangeList
      })
    }
  },
  onChangeScopeType(e) {
    this.setData({
      type: e.detail
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
  // houseChangeSelectAll(e) {
  //   const buildNo = e.currentTarget.dataset.buildNo
  //   const item = this.data.houses.find(e => e.buildNo === buildNo)
  //   item.layerList.forEach((layer) => {
  //     layer.selectAll = e.detail.value
  //     layer.roomList.forEach((room) => {
  //       room.selected = e.detail.value
  //     })
  //   })
  //   //判断是否选整个小区
  //   // let allchecked = this.houses.every((e) => e.selectAll === true)
  //   // this.radio = allchecked
  // },
  // floorChangeSelectAll(e) {
  //   const buildNo = e.currentTarget.dataset.buildNo
  //   const item = this.data.houses.find(e => e.buildNo === buildNo)
  //   const layerNo = e.currentTarget.dataset.layerNo
  //   const layer = item.find(e => e.layerNo === layerNo)
  //   layer.roomList.forEach((room) => {
  //     room.selected = e
  //   })
  //   // 判断是否选择整栋
  //   let isHouseCheck = item.layerList.every((e) => e.selectAll === true)
  //   item.selectAll = isHouseCheck
  //   //判断是否选整个小区
  //   // let allchecked = this.houses.every((e) => e.selectAll === true)
  //   // this.radio = allchecked
  // },
  // roomChangeSelect(e) {
  //   const buildNo = e.currentTarget.dataset.buildNo
  //   const item = this.data.houses.find(e => e.buildNo === buildNo)
  //   const layerNo = e.currentTarget.dataset.layerNo
  //   const layer = item.find(e => e.layerNo === layerNo)
  //   // 判断是否选择整楼
  //   let isFloorCheck = layer.roomList.every((e) => e.selected === true)
  //   layer.selectAll = isFloorCheck
  //   // 判断是否选择整栋
  //   let isHouseCheck = house.layerList.every((e) => e.selectAll === true)
  //   house.selectAll = isHouseCheck
  //   //判断是否选整个小区
  //   let allchecked = this.houses.every((e) => e.selectAll === true)
  //   this.radio = allchecked
  // },
  tapToNext(){
    if(!this.data.roomId){
      wx.showToast({
        title: '请选择房间',
        icon: 'none'
      });
      return
    }
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
      'form2.level': e.detail.value
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
        const { imageUrls } = _this.data.form2;
        imageUrls.push({ url: JSON.parse(res.data).data, name: file.name});
        _this.setData({ 'form2.imageUrls': imageUrls });
      },
    });
  },
  deleteCon() {
    this.setData({
      contractUrl: []
    })
  },
  onInput(e) {
      this.setData({
        'form2.remark': e.detail
      })
  },
  onOtherInput(e){
    this.setData({
      'form2.messageItem': e.detail
    })
  },
  submit(){
    const params = {
    "communityId": this.data.communityId,
    "roomId": this.data.roomId,
    "buildNo": this.data.buildNo,
    "layerNo": this.data.layerNo,
    "type": this.data.type,
    "level": this.data.form2.level,
    "other": this.data.form2.messageItem,
    "remark": this.data.form2.remark,
    "itemIds": this.data.form2.tags.filter(e=> e.check).map(e=> e.id),
    "imageUrls":  this.data.form2.imageUrls.length?this.data.form2.imageUrls.map(e=> e.url):[]
    }
    createRepair(params).then(res=>{
      if(res.state == 200){
        wx.showToast({
          title: '发起报修成功',
          icon: 'none',
        });
        setTimeout(() => {
          wx.navigateBack({
            delta: 1
          });
        }, 1000);
      }
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