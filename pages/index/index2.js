const app = getApp()
var common = require('../common/common.js')
// pages/index/index2.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    test: "testok",
    text:" data试用",
    arr:[{a:1}],
    obj:{
      name:"test"
    },
     nodes: [{
      name: 'div',
      attrs: {
        class: 'div_class',
        style: 'line-height: 60px; color: red;'
      },
      children: [{
        type: 'text',
        text: 'Hello&nbsp;World!'
      }]
    }],
  
  },

  tap() {
    console.log('tap')
  },
  viewTaps:function(){
    console.log("viewtaps")
    this.setData({
      text:" dataok"
    })
  },
  getlocalurl:function(){
    console.log(this.route);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  console.log(options)
  common.saygood("load");
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
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
    console.log("下拉刷新")
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log("上拉触底") 
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '汽配龙diy',
      path: '/page/index2'
    }
  },
  onPageScroll:function(){
    console.log("滚动");
  },
  onTabItemTap(item) {
    console.log(item.index+"111111111")
    console.log(item.pagePath)
    console.log(item.text)
  },
  // Event handler.
  viewTap: function () {
    this.setData({
      text: 'Set some data for updating view.'
    }, function () {
      // this is setData callback
    })
  },
  customData: {
    hi: 'MINA'
  }
})