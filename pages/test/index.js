/*
 * @Author: your name
 * @Date: 2022-02-28 17:54:31
 * @LastEditTime: 2022-02-28 18:06:59
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \miniprogram-1\pages\test\index.js
 */
const app = getApp()

Page({
  data: {
    kebiao: {
          totalWeek: 16,
      currentWeek: 11,
          currentKe:{day:-1,no:-1,ke:{name:'',time:'',classroom:'',teacher:''}},
          detail: [
              { 
                 no:0,
                 ke:[{name:"计算机组成与结构",time:"1-16周",classroom:"信工楼E536",teacher:"徐苏"},
                     {name:"",time:"",classroom:"",teacher:""},
                     {name:"计算机组成与结构",time:"1-16周",classroom:"信工楼E536",teacher:"徐苏"},
                     {name:"",time:"",classroom:"",teacher:""},
                     {name:"嵌入式系统",time:"1-16单周",classroom:"信工楼E536",teacher:"周聪"},
                     {name:"",time:"",classroom:"",teacher:""},
                     {name:"党课",time:"1-13单周",classroom:"党校B302",teacher:"张三"}]
               }]
  }
},
  onReady: function () {
    const arr = []
    for (let i = 0; i < 100; i++) arr.push(i)
    this.setData({
      arr
    })

    setTimeout(() => {
      this.setData({
        triggered: true,
      })
    }, 1000)
  },

  onPulling(e) {
    console.log('onPulling:', e)
  },

  onRefresh() {
    if (this._freshing) return
    this._freshing = true
    setTimeout(() => {
      this.setData({
        triggered: false,
      })
      this._freshing = false
    }, 3000)
  },

  onRestore(e) {
    console.log('onRestore:', e)
  },

  onAbort(e) {
    console.log('onAbort', e)
  },
})
