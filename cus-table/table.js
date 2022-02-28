/*
 * @Author: your name
 * @Date: 2022-02-28 18:37:39
 * @LastEditTime: 2022-02-28 19:11:54
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \miniprogram-1\components\table\table.js
 */
// components/table/table.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    innerText: {
      type: String,
      value: 'default value',
    },
    columns:{
      type: Array,
      value:[
       // {title:'', attr:''}
      ]
    },
    contentArray:{
      type: Array,
      value:[]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})