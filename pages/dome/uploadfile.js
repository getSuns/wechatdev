var util = require('../../utils/util.js')
var app = getApp()
Page({
  data: {
    sex_items: [
      { name: '1', value: '小王子' },
      { name: '2', value: '小公主' },
      { name: '0', value: '尚无' }
    ],
    logo: null,
    userInfo: {}
  },

  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      // url: '../logs/logs'
      //   url: '../load/load'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
      that.setData({
        userInfo: app.globalData.userInfo,
        logo: app.globalData.userInfo.avatarUrl
      })
  },

  bindSaveTap: function (e) {
    console.log(e)
    var formData = {
      //uid: util.getUserID(),
      user_name: e.detail.value.nick_name,
      baby_sex: e.detail.value.baby_sex,
      baby_age: e.detail.value.baby_age
    }
    console.log(formData)
    app.upload_file("https://m.qipeilong.cn", this.data.logo, 'photos', formData,
      function (res) {
        console.log(res);
      },
      function (res) {
        console.log(res);
      })
  },

  chooseImageTap: function () {
    let _this = this;
    wx.showActionSheet({
      itemList: ['从相册中选择', '拍照'],
      itemColor: "#f7982a",
      success: function (res) {
        if (!res.cancel) {
          if (res.tapIndex == 0) {
            _this.chooseWxImage('album')
          } else if (res.tapIndex == 1) {
            _this.chooseWxImage('camera')
          }
        }
      }
    })

  },
  chooseWxImage: function (type) {
    let _this = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: [type],
      success: function (res) {
        console.log(res);
        wx.previewImage({
          current: res.tempFilePaths[0], // 当前显示图片的http链接
          urls: res.tempFilePaths // 需要预览的图片http链接列表
        })
        wx.getImageInfo({
          src: res.tempFilePaths[0],
          success: function (res) {
            console.log(res.width)
            console.log(res.height)
          }
        })
        _this.setData({
          logo: res.tempFilePaths[0],
        })
      }
    })
  }
})