/*
 * @Author: your name
 * @Date: 2022-02-23 19:55:12
 * @LastEditTime: 2022-03-08 10:18:09
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \miniprogram-1\pages\repair\repairRecords\repairRecords.js
 */
const app = getApp()
const citys = {
  浙江: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
  福建: ['福州', '厦门', '莆田', '三明', '泉州'],
};
Page({
  data: {
    scopeType: 1,
    selectedOptions:[],
    selectedCommunity:'',
    selectedResponser:'',
    pickerType:1,
    tableData: [
      {id:1,no: '233',rate: '中',items:'dqw.dwq',scope:'是被',community:'dwq',createTime:'dasdadsadd',linkUrl:'/pages/repair/repairRecordOne/repairRecordOne?id='+ 1},
      {id:2,no: '233',rate: '中',items:'dqw.dwq',scope:'是被',community:'dwq',createTime:'dasdadsadd',linkUrl:'/pages/repair/repairRecordOne/repairRecordOne?id='+ 2},
      {id:3,no: '233',rate: '中',items:'dqw.dwq',scope:'是被',community:'dwq',createTime:'dasdadsadd',linkUrl:'/pages/repair/repairRecordOne/repairRecordOne?id='+ 3},
      {id:4,no: '233',rate: '中',items:'dqw.dwq',scope:'是被',community:'dwq',createTime:'dasdadsadd',linkUrl:'/pages/repair/repairRecordOne/repairRecordOne?id='+ 4},
      {id:5,no: '233',rate: '中',items:'dqw.dwq',scope:'是被',community:'dwq',createTime:'dasdadsadd',linkUrl:'/pages/repair/repairRecordOne/repairRecordOne?id='+ 5},
      {id:6,no: '233',rate: '中',items:'dqw.dwq',scope:'是被',community:'dwq',createTime:'dasdadsadd',linkUrl:'/pages/repair/repairRecordOne/repairRecordOne?id='+ 5},
    ],
    columns:[
      {title: '单号',attr: 'no'},
      {title: '等级',attr: 'rate'},
      {title: '报修事项',attr: 'items'},
      {title: '范围类型',attr: 'scope'},
      {title: '小区',attr: 'community'},
      {title: '发起时间',attr: 'createTime'},
    ],
    pickList:[],
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
    communityList:['1','2','23'],
    responsorList:['A','B']
  },
  searchList(){},
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
    }else {
      this.setData({
        pickList: this.data.responsorList 
      })
    }
  },
  onChangePickVal(e){
    if(this.data.pickerType == 1){
      const { picker, value, index } = e.detail;
      picker.setColumnValues(1, citys[value[0]]);
    }else if(this.data.pickerType == 2){

    }else {

    }
  },
  onClosePick(){
    this.setData({
      showPicker:false
    })
  },
  onConfirmPick(){
    this.setData({
      showPicker:false
    })
  },
  onCancelPick(){
    this.setData({
      showPicker:false
    })
    if(this.data.pickType == 0){
      this.setData({
        selectedOptions:[]
      })
    }else  if(this.data.pickType == 1){
      this.setData({
        selectedCommunity: ''
      })
    }else {
      this.setData({
        selectedResponser: ''
      })
    }
  },
  goAdd(){
    wx.navigateTo({
      url: '/pages/house/rentHandle/addRenter/addRenter'
    });
  }
})
