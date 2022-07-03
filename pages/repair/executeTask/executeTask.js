/*
 * @Author: your name
 * @Date: 2022-02-23 19:55:12
 * @LastEditTime: 2022-03-01 17:43:34
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \miniprogram-1\pages\repair\repairRecords\repairRecords.js
 */
const { queryEmpList } = require('../../../utils/api')
Page({
  data: {
    active: 0,
    scopeType: 1,
    taskList: [{
      id: '',
      no: 'dwq',
      status: 'dwq',
      childNo: '',
      level: 'dqw',
      repairItemName: 'dq',
      type: 'dq',
      community: {},
      createTime: 'qwdwq',
      creatorName: 'dwqdq',
      remark: 'd',
      imgs: [
      ]
    }],
    columns: [],
    rangeList: [
      '低',
      '中',
      '高'
    ],
    statusList: [
      '全部',
      '执行中',
      '已完成'
    ],
    status: '',
    level: '',
    responser: "",
    currentPage: 1
  },
  onShow() {
    this.searchList()
    this.searchEmps()
  },
  searchList() {
    // queryDelegateList({ level: this.data.level, type: this.data.active }).then(res => {
    //   if (res.state = 200) {
    //     this.setData({
    //       // taskList: res.data
    //     })
    //   }
    // })
  },
  searchEmps() {
    queryEmpList()
  },
  onChangeTab(e) {
    this.setData({
      active: e.detail.name
    })
    this.searchList()
  },
  clickToPickStatus() {
    this.setData({
      showPicker: true,
      pickType: 0,
      columns: this.data.statusList
    })
  },
  clickToPick() {
    this.setData({
      showPicker: true,
      pickType: 1,
      columns: this.data.rangeList
    })
  },
  onClosePick() {
    this.setData({
      showPicker: false
    })
  },
  onChangePickVal(e) {
    if (this.data.pickType == 1) {
      this.setData({
        level: e.detail.value
      })
    } else {
      this.setData({
        responser: e.detail.value
      })
    }
  },

  onReachBottom() {
    this.setData({
      currentPage: this.data.currentPage + 1
    })
    const tasks = this.data.taskList.concat([this.data.taskList[0]])
    this.setData({
      taskList: tasks
    })
  },
  toDis() {
    this.setData({
      showPicker: true,
      pickType: 2
    })
    this.setData({
      columns: [
        'a',
        'b',
        'c'
      ]
    })
  },
  confirmDis() {
    this.setData({
      showPicker: false
    })
    wx.showToast({
      title: '提交派单',
      icon: 'success'
    })
    // 查询
  },
  cancelPick() {
    this.setData({
      showPicker: false
    })
    if (this.data.pickType == 0) {
      this.setData({
        status: ''
      })
    } else if (this.data.pickType == 1) {
      this.setData({
        level: ''
      })
    } else {
      this.setData({
        responser: ''
      })
    }
  },
  goback() {
    wx.navigateBack({
      delta: 1
    });

  }
})
