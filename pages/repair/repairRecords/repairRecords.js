/*
 * @Author: your name
 * @Date: 2022-02-23 19:55:12
 * @LastEditTime: 2022-02-28 18:34:44
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \miniprogram-1\pages\repair\repairRecords\repairRecords.js
 */
const app = getApp()

Page({
  data: {
    scopeType: 1,
    arrData: [
      {id:1,no: '233',rate: '中',items:'dqw.dwq',scope:'是被',community:'dwq',createTime:'dasdadsadd'},
      {id:2,no: '233',rate: '中',items:'dqw.dwq',scope:'是被',community:'dwq',createTime:'dasdadsadd'},
      {id:3,no: '233',rate: '中',items:'dqw.dwq',scope:'是被',community:'dwq',createTime:'dasdadsadd'},
      {id:4,no: '233',rate: '中',items:'dqw.dwq',scope:'是被',community:'dwq',createTime:'dasdadsadd'},
      {id:5,no: '233',rate: '中',items:'dqw.dwq',scope:'是被',community:'dwq',createTime:'dasdadsadd'},
      {id:6,no: '233',rate: '中',items:'dqw.dwq',scope:'是被',community:'dwq',createTime:'dasdadsadd'},
    ],
    toView: 'green'
  },
  onReady: function () {
  },

  upper(e) {
    console.log(e)
  },

  lower(e) {
    console.log(e)
  },

  scroll(e) {
    console.log(e)
  },

  scrollToTop() {
    this.setAction({
      scrollTop: 0
    })
  },
})
