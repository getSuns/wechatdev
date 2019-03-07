// pages/wear/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that =this;
    //获取用户的授权信息，放到本地缓存中
    wx.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userInfo'])
    {
      wx.setStorage({
        key: 'can_getuserinfo',
        data: 1,
      })
    }else
        {
    wx.setStorage({
      key: 'can_getuserinfo',
      data: 0,
    })
  }
}}),
  wx.getStorage({
    key: 'can_getuserinfo',
    success: function (res) {
      console.log(res.data);
      that.setData({
        can_getuserinfo: res.data
      })
    }, fail: function () {
      that.setData({
        can_getuserinfo: 0
      })
    }
  })
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