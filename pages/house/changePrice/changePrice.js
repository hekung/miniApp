/*
 * @Author: your name
 * @Date: 2022-02-23 19:55:12
 * @LastEditTime: 2022-03-24 17:49:04
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \miniprogram-1\pages\repair\repairRecords\repairRecords.js
 */
const { queryBuildList, queryCommunityList, queryLayerList,addChangePrice } = require('../../../utils/api')
const app = getApp()
Page({
  data: {
    active: 'a',
    selectDisplace:'',
    selectedCommunity:'',
    communityList: [],
    communityNameList: [],
    buildList: [],
    layerList: [],
    form1:{
      selectedOptions:{
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
        },
      },
      communityId: '',
      buildNo:'',
      layerNo:'',
      scope:0,
      ratio:''
    },
    form2:{
      selectedOptions:[],
      selectedCommunity:'',
      buildNo:'',
      layerNo:'',
      scope:'',
      ratio:''
    },
    pickerType:1,
    tableData: [],
    columns:[
      {title: '单号',attr: 'no'},
      {title: '等级',attr: 'rate'},
      {title: '报修事项',attr: 'items'},
      {title: '范围类型',attr: 'scope'},
      {title: '小区',attr: 'community'},
      {title: '发起时间',attr: 'createTime'},
    ],
    pickList:[],
  },
  searchList(){},
  onChangeTab(e){
    this.setData({
     active: e.detail.name
    })
    this.searchList()
  },
  clickToPick(e){
    const pickerType = e.currentTarget.dataset.type
    this.setData({
      pickerType,
      showPicker: true
    })
    if(this.data.pickerType == 2){
      this.setData({
        pickList: this.data.communityNameList 
      })
    }else if(this.data.pickerType == 3) {
      this.setData({
        pickList: this.data.buildList 
      })
    }else if(this.data.pickerType == 4) {
      this.setData({
        pickList: this.data.layerList 
      })
    }
  },
  onClosePick(){
    this.setData({
      showPicker:false
    })
  },
  onConfirmPick(e){
    this.setData({
      showPicker:false
    })
    switch (this.data.pickerType) {
      case 1:
        if (this.data.pickerType == 1) {
          const values = e.detail._values
          this.setData({
            'form1.selectedOptions': values,
            selectDisplace: values.province.name + values.city.name + values.country.name,
            selectedCommunity: '',
            'form1.communityId': '',
            'form1.buildNo': '',
            'form1.layerNo': '',
            communityList: [],
            communityNameList: [],
            buildList: [],
            layerList: [],
          })
          this.queryCommunitys(values)
        }
        break;
      case 2:
        const communityId = this.data.communityList.find(el => el.name === e.detail.value).id
        this.setData({
          selectedCommunity: e.detail.value,
          'form1.communityId': communityId,
          'form1.buildNo': '',
          'form1.layerNo': '',
          buildList: [],
          layerList: [],
        })
        this.getBuildList(communityId)
        break;
      case 3:
        this.setData({
          'form1.buildNo': e.detail.value,
          'form1.layerNo': '',
          layerList: [],
        })
        this.getLayerList()
        break;
      case 4:
        this.setData({
          'form1.layerNo': e.detail.value,
        })
        break;
      // case 6:
      //   const values = e.detail._values
      //   this.setData({
      //     selectedOptions2: values,
      //     selectDisplace2: values.province.name + values.city.name + values.country.name,
      //   })
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
    queryLayerList({ communityId: this.data.form1.communityId, buildNo: this.data.form1.buildNo }).then(res => {
      if (res.state == 200) {
        this.setData({
          layerList: res.data ? res.data : []
        })
      }
    })
  },
  onCancelPick(){
    this.setData({
      showPicker:false
    })
  },
  onChangeScopeType(e){
    this.setData({
      'form1.scope': e.detail
    })
  },
  rationChange(e){
    this.setData({
      'form1.ratio': e.detail
    })
  },
  batchChangePrice(){
    if(!this.data.form1.communityId){
      wx.showToast({
        title: '请选择小区',
        icon: 'none',
      });
      return
    }
    if(this.data.form1.scope==1 && !this.data.form1.buildNo){
      wx.showToast({
        title: '请选择栋',
        icon: 'none',
      });
      return
    }
    if(this.data.form1.scope==2 && !this.data.form1.layerNo){
      wx.showToast({
        title: '请选择层',
        icon: 'none',
      });
      return
    }
    if(!this.data.form1.ratio){
      wx.showToast({
        title: '请输入调价比例',
        icon: 'none',
      });
      return
    }
    const params ={
      "type": this.data.form1.scope,
      "communityId":this.data.form1.communityId,
      "communityName": this.data.selectedCommunity,
      "buildNo": this.data.form1.buildNo,
      
      "layerNo": this.data.form1.layerNo,
      "amplitude": this.data.form1.ratio,
      "provinceCode": this.data.form1.selectedOptions.province.code,
      "cityCode": this.data.form1.selectedOptions.city.code,
      "countryCode": this.data.form1.selectedOptions.country.code,
      "province": this.data.form1.selectedOptions.province.name,
      "city": this.data.form1.selectedOptions.city.name,
      "country":  this.data.form1.selectedOptions.country.name,
    }
    addChangePrice(params).then(res=>{
      if(res.state == 200){
        wx.showToast({
          title: '调价成功',
          icon: 'none',
        });
        setTimeout(() => {
          wx.navigateBack({
            delta: 1
          });
        }, 1000);
      }else {
        wx.showToast({
          title: '调价失败',
          icon: 'none',
        });
      }
    })
  }
})
 