/*
 * @Author: your name
 * @Date: 2022-02-21 20:06:18
 * @LastEditTime: 2022-02-22 18:26:33
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AEa
 * @FilePath: \miniprogram-1\custom-tab-bar\custom-tab-bar.js
 */
// custom-tab-bar/custom-tab-bar.js
const  app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    isIphoneX: app.globalData.isIphoneX,
    userInfo: app.globalData.userInfo,
    selected: 0,
    color: "#7A7E83",
    selectedColor: "#e1251b",
    list: [{
      pagePath: "/index/index",
      iconPath: "/assets/img/home.png",
      selectedIconPath: "/assets/img/home_h.png",
      text: "首页"
    }, {
      pagePath: "/index/wode",
      iconPath: "/assets/img/wode.png",
      selectedIconPath: "/assets/img/wode_h.png",
      text: "我的"
    }]
  },
  lifetimes: {
    attached: function() {
      // 在组件实例进入页面节点树时执行
       // 获取设备信息
      //  app.watch('isIphoneX',this.watchDevice)
      //  app.watch('userInfo',this.watchUser)
    },
    detached: function() {
      // 在组件实例被从页面节点树移除时执行
    },
  },
  /**
   * 组件的方法列表
   */
  methods: {
    watchUser(val){
      this.setData({
        userInfo: val
      })
    },
    watchDevice(val){
      this.setData({
        isIphoneX: val
      })
    },
    switchTab(e) {
      debugger
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({url})
      // this.setData({
      //   selected: data.index
      // })
      this.setData({
        selected: data.index
      })
    }
  }
})