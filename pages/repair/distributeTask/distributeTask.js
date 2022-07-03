/*
 * @Author: your name
 * @Date: 2022-02-23 19:55:12
 * @LastEditTime: 2022-03-01 17:19:04
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \miniprogram-1\pages\repair\repairRecords\repairRecords.js
 */
const { queryDelegateList, queryEmpList, dispatchTask, stopRepairTask } = require('../../../utils/api')
const app = getApp()
Page({
  data: {
    type: 0,
    scopeType: 1,
    taskList: [{
      id: '11',
      no: 'dwq',
      status: 'dwq',
      childNo: '',
      level: 'dqw',
      item: 'dq',
      scope: 'dq',
      community: 'dwwq',
      createTime: 'qwdwq',
      creator: 'dwqdq',
      remark: 'd',
      imgs: [
        "https://images.unsplash.com/photo-1565699894576-1710004524ba?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1832&q=80",
        "https://images.unsplash.com/photo-1565699894576-1710004524ba?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1832&q=80",
        "https://images.unsplash.com/photo-1565699894576-1710004524ba?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1832&q=80"
      ]
    }],
    columns: [],
    rangeList: [
      '低',
      '中',
      '高'
    ],
    empList: '',
    level: '',
    userId: "",
    id: '',
    currentPage: 1
  },
  onShow() {
    this.searchList()
    // this.getEmps()
  },
  searchList() {
    const index = this.data.rangeList.findIndex(e => e == this.data.level)
    const level = index == -1 ? '' : index
    const type = this.data.type
    queryDelegateList({ level, type }).then(res => {
      if (res.state == 200) {
        this.setData({
          taskList: res.data
        })
      }
    })
  },
  onChangeTab(e) {
    this.setData({
      type: e.detail.name
    })
    this.searchList()
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
        level: e.detail.level
      })
    } else {
      this.setData({
        userId: e.detail.value
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
  toDis(e) {
    this.setData({
      showPicker: true,
      pickType: 2
    })
    const communityId = e.currentTarget.dataset.community
    this.setData({
      id: e.currentTarget.dataset.id
    })
    this.getEmps(communityId)
  },
  getEmps(communityId) {
    queryEmpList({ communityId }).then(res => {
      if (res.state == 200) {
        this.setData({
          columns: res.data.map(e => e.userName),
          empList: res.data
        })
      }
    })
  },
  confirmClick(e) {
    this.setData({
      showPicker: false
    })
    if (this.data.pickType == 1) {
      this.setData({
        level: e.detail.value
      })
      this.searchList()
    } else {
      // const userId = e.currentTarget.dataset.id
      const userId = this.data.empList.find(el => el.userName == e.detail.value).id
      const params = {
        id: this.data.id,
        userId
      }
      dispatchTask(params).then(res => {
        if (res.satate == 200) {
          wx.showToast({
            title: '委派任务成功'
          })
          this.searchList()
        }
      })
    }
    // wx.showToast({
    //   title: '提交派单',
    //   icon: 'success'
    // })
  },
  stopTask(e) {
    const no = e.currentTarget.dataset.no
    stopRepairTask({ no }).then(res => {
      if (res.satate == 200) {
        wx.showToast({
          title: '中止任务成功'
        })
        this.searchList()
      }
    })
  },
  goback() {
    wx.navigateBack({
      delta: 1
    });

  }
})
