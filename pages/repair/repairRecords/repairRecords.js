/*
 * @Author: your name
 * @Date: 2022-02-23 19:55:12
 * @LastEditTime: 2022-02-28 20:04:41
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \miniprogram-1\pages\repair\repairRecords\repairRecords.js
 */
const app = getApp()

Page({
  data: {
    active: 'a',
    scopeType: 1,
    tableData: [
      {id:1,no: '233',rate: '中',items:'dqw.dwq',scope:'是被',community:'dwq',createTime:'dasdadsadd'},
      {id:2,no: '233',rate: '中',items:'dqw.dwq',scope:'是被',community:'dwq',createTime:'dasdadsadd'},
      {id:3,no: '233',rate: '中',items:'dqw.dwq',scope:'是被',community:'dwq',createTime:'dasdadsadd'},
      {id:4,no: '233',rate: '中',items:'dqw.dwq',scope:'是被',community:'dwq',createTime:'dasdadsadd'},
      {id:5,no: '233',rate: '中',items:'dqw.dwq',scope:'是被',community:'dwq',createTime:'dasdadsadd'},
      {id:6,no: '233',rate: '中',items:'dqw.dwq',scope:'是被',community:'dwq',createTime:'dasdadsadd'},
    ],

    columns:[
      {title: '单号',attr: 'no'},
      {title: '等级',attr: 'rate'},
      {title: '报修事项',attr: 'items'},
      {title: '范围类型',attr: 'scope'},
      {title: '小区',attr: 'community'},
      {title: '发起时间',attr: 'createTime'},
    ],
    toView: 'green'
  },
  searchList(){},
  onChangeTab(e){
    this.setData({
     active: e.detail.name
    })
    this.searchList()
  }
})
