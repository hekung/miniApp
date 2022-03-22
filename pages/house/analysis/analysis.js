/*
 * @Author: your name
 * @Date: 2022-02-21 19:33:54
 * @LastEditTime: 2022-02-24 20:25:52
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \miniprogram-1\pages\house\analysis\analysis.js
 */
// pages/house/analysis/analysis.js
const { queryBuildList, queryRoomList, queryCommunityList, queryRommsStatus } = require('../../../utils/api')
import * as echarts from '../../../ec-canvas/echarts';
var option = {
  backgroundColor: "#ffffff",
  series: [{
    label: {
      normal: {
        fontSize: 14
      }
    },
    type: 'pie',
    center: ['50%', '50%'],
    radius: ['20%', '40%'],
    data: [{
      value: 55,
      name: '北京'
    }, {
      value: 20,
      name: '武汉'
    }, {
      value: 10,
      name: '杭州'
    }, {
      value: 20,
      name: '广州'
    }, {
      value: 38,
      name: '上海'
    }]
  }]
};
function setOption(chart) {
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {            // 坐标轴指示器，坐标轴触发有效
        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    legend: {
      data: ['热度', '正面', '负面']
    },
    grid: {
      left: 20,
      right: 20,
      bottom: 15,
      top: 40,
      containLabel: true
    },
    xAxis: [
      {
        type: 'value',
        axisLine: {
          lineStyle: {
            color: '#999'
          }
        },
        axisLabel: {
          color: '#666'
        }
      }
    ],
    yAxis: [
      {
        type: 'category',
        axisTick: { show: false },
        data: ['汽车之家', '今日头条', '百度贴吧', '一点资讯', '微信', '微博', '知乎'],
        axisLine: {
          lineStyle: {
            color: '#999'
          }
        },
        axisLabel: {
          color: '#666'
        }
      }
    ],
    series: [
      {
        name: '热度',
        type: 'bar',
        label: {
          normal: {
            show: true,
            position: 'inside'
          }
        },
        data: [300, 270, 340, 344, 300, 320, 310],
        itemStyle: {
          // emphasis: {
          //   color: '#37a2da'
          // }
        }
      },
      {
        name: '正面',
        type: 'bar',
        stack: '总量',
        label: {
          normal: {
            show: true
          }
        },
        data: [120, 102, 141, 174, 190, 250, 220],
        itemStyle: {
          // emphasis: {
          //   color: '#32c5e9'
          // }
        }
      },
      {
        name: '负面',
        type: 'bar',
        stack: '总量',
        label: {
          normal: {
            show: true,
            position: 'left'
          }
        },
        data: [-20, -32, -21, -34, -90, -130, -110],
        itemStyle: {
          // emphasis: {
          //   color: '#67e0e3'
          // }
        }
      }
    ]
  };
  chart.setOption(option);
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 'a',
    pickerType: 1,
    pickList: [],
    showPicker: false,
    selectDisplace: '',
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
    communityList: [],
    communityNameList: [],
    selectedCommunity: '', // 小区中文
    communityId: '', // 查询入参
    buildList: [],
    buildNo: '',
    form1: {
      startDate: '',
      endDate: ''
    },
    form2: {
      startDate: '',
      endDate: ''
    },
    tableData: [],
    columns: [
      { title: '层', attr: 'layerNo', width: '260rpx' },
      { title: '房间号', attr: 'roomNo', width: '300rpx' },
    ],
    ec: {
      // 将 lazyLoad 设为 true 后，需要手动初始化图表
      lazyLoad: true
    },
    isLoaded: false,
    isDisposed: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (this.data.active == 'a') {
      this.getRoomList()
    }
  },
  onReady() {
    // 获取组件
    this.ecComponent = this.selectComponent('#mychart-dom-bar');
  },
  getRoomList() {
    if (!this.data.form1.startDate || !this.data.form1.endDate) {
      wx.showToast({
        title: '请选择日期',
        icon: 'none'
      })
      return
    }
    if (!this.data.communityId || !this.data.buildNo) {
      wx.showToast({
        title: '请选择小区及栋号',
        icon: 'none'
      })
      return
    }
    const params = {
      provinceCode: this.data.selectedOptions.province.code,
      cityCode: this.data.selectedOptions.city.code,
      countryCode: this.data.selectedOptions.country.code,
      communityId: this.data.communityId,
      buildNo: this.data.buildNo,
      beginTime: this.data.form1.startDate ? this.data.form1.startDate + ' 00:00:00' : '',
      endTime: this.data.form1.endDate ? this.data.form1.endDate + ' 23:59:59' : '',
    }
    queryRoomList(params).then(res => {
      if (res.state == 200) {
        this.setData({
          tableData: res.data
        })
      }
    })
  },
  getRommsStatus() {
    if (!this.data.form2.startDate || !this.data.form2.endDate) {
      wx.showToast({
        title: '请选择月份',
        icon: 'none'
      })
      return
    }
    if (!this.data.communityId) {
      wx.showToast({
        title: '请选择小区',
        icon: 'none'
      })
      return
    }
    const params = {
      communityIds: this.data.communityId,
      beginTime: this.data.form2.startDate,
      endTime: this.data.form2.endDate
    }
    queryRommsStatus(params).then(res => {
      if (res.state == 200) {
        debugger
        console.log(res.data);
        this.init()
      }
    })
  },
  bindStartDateChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    if (this.data.active == 'a') {
      this.setData({
        'form1.startDate': e.detail.value
      })
    } else {
      this.setData({
        'form2.startDate': e.detail.value
      })
    }
  },
  bindEndDateChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      'form1.endDate': e.detail.value
    })
    if (this.data.active == 'a') {
      this.setData({
        'form1.endDate': e.detail.value
      })
    } else {
      this.setData({
        'form2.endDate': e.detail.value
      })
    }
  },
  onClosePick() {
    this.setData({
      showPicker: false
    })
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
  },
  onCancelPick() {
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
      const communityId = this.data.communityList.find(el => el.name === e.detail.value).id
      this.setData({
        selectedCommunity: e.detail.value,
        communityId
      })
      // 查询小区下的栋
      this.getBuildList(communityId)
    } else if (this.data.pickerType == 3) {
      const buildNo = this.data.buildList[e.detail.index]
      this.setData({
        buildNo
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
        communityList: res.data,
        communityNameList: res.data.map(e => e.name)
      })
    }
  },
  async getBuildList(id) {
    queryBuildList(id).then(res => {
      if (res.state == 200) {
        this.setData({
          buildList: res.data
        })
      }
    })
  },
  onChange(e) {
    // wx.showToast({
    //   title: `切换到标签 ${event.detail.name}`,
    //   icon: 'none',
    // });
    debugger
    this.setData({
      active: e.detail.name
    })
    if (this.data.active == 'a') {
      this.getRoomList()
    } else {
      this.getRommsStatus()
    }
  },
  // 点击按钮后初始化图表
  init: function () {
    debugger
    this.ecComponent.init((canvas, width, height, dpr) => {
      // 获取组件的 canvas、width、height 后的回调函数
      // 在这里初始化图表
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height,
        devicePixelRatio: dpr // new
      });
      setOption(chart);

      // 将图表实例绑定到 this 上，可以在其他成员函数（如 dispose）中访问
      this.chart = chart;

      this.setData({
        isLoaded: true,
        isDisposed: false
      });

      // 注意这里一定要返回 chart 实例，否则会影响事件处理等
      return chart;
    });
  },

  dispose: function () {
    if (this.chart) {
      this.chart.dispose();
    }

    this.setData({
      isDisposed: true
    });
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