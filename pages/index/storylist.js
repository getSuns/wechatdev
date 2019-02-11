// pages/index/storylist.js
Page({
  /**
   * 用户点击右上角分享
   */
  
  onShareAppMessage: function () {
    return {title: '汽配龙diy'}
  },
  scroll:function(){
    wx.pageScrollTo({
      scrollTop: 800,
      duration: 300
    })
  }
})