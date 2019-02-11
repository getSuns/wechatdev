//index.js
//获取应用实例
const app = getApp()


Page({

  // clickMe: function () {
  //   var that=this;
  //  console.log("okok")
  // },
  data: {
    showview:false,
    motto: 'Hello World',
    userInfo: {},
    FilePath:"111",
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  // bindViewTap: function() {
  //   wx.navigateTo({
  //     url: '../logs/logs'
  //   })
  // },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
      console.log("3333"+this.userInfo);

    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }

      })
    }
    
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    console.log(app.globalData.userInfo);
  },
  clickMe: function () {
    var that=this;
    wx.getLocation({
      type: 'wgs84',
      success: (res) => {
        that.setData({
          motto: "这是我的点击",
          showview: true,
          latitude: res.latitude,// 经度
          longitude : res.longitude // 纬度
        })
      }
    })


    //requestTask.abort() // 取消请求任务
  },
  download:function(){
    var that=this;
    wx.downloadFile({
  url:'https://images.qipeilong.cn/oldupload/edbafbd5-3f22-4197-8b73-3ce53198754f.png', 
            success: function (res) {
              var tempFilePaths = res.tempFilePath
              wx.saveFile({
                tempFilePath: tempFilePaths,
                success: function (res) {
                  that.setData({
                    savedFilePath: res.savedFilePath
                  })
                  console.log(that.data.savedFilePath);
                }
              })
            }
          })
  },
  imgclickdown:function(){
    var that=this;
    app.setphoto();
    console.log("img" + that.data.savedFilePath)
    wx.saveImageToPhotosAlbum({
      filePath: that.data.savedFilePath,
      success(res) {
        that.setData({
          photolog: res.errMsg
        })
      },
      fail: function (res) {
        if (res.errMsg === "saveImageToPhotosAlbum:fail auth deny") {
          console.log("用户一开始拒绝了，我们想再次发起授权")
          console.log('打开设置窗口')
          wx.openSetting({
            success(settingdata) {
              console.log(settingdata)
            }
          })
        }
      }
    })
  },
  getfilelist:function(){
    wx.getSavedFileList({
      success: function (res) {
        if (res.fileList.length > 0) {
          //删除本地存储文件
          // wx.removeSavedFile({
          //   filePath: res.fileList[0].filePath,
          //   complete: function (res) {
          //     console.log(res)
          //   }
          // })
        }
      }
    })
  },
  showtoast:function(){
    //底部路由测试
    // wx.switchTab({
    //   url: '/pages/wear/home'
    // })
    //测试wx.reLaunch
    // wx.reLaunch({
    //   url: '/pages/wear/home?name=test'
    // })
    //测试redirectTo非底部路由
    // wx.redirectTo({
    //   url: '/index/index2?name=test'
    // })
    //测试开始下拉刷新
    //wx.startPullDownRefresh()
    //接口请求测试
    const requestTask = wx.request({
      url: 'https://m.qipeilong.cn/HPResourceMarke/GetHomePageJXTJInfo',
      data: Util.json2Form({
        "pageCount": 8,
        "pageNo": 1,
        "positionID": "H5APP_JXTJ",
        "ver": "1.0",
        "modelType": 1
      }),
      header: {
        'content-type': 'application/x-www-form-urlencoded' //'application/json'
      },
      method: "POST",
      success: function (res) {
        console.log(res.data)
      },
      fail: function (res) {
        console.log('失败' + JSON.stringify(res))
      },
      complete: function () {
        console.log("我是来好玩的")
      }
    })
    var animation = wx.createAnimation({
      transformOrigin: "50% 50%",
      duration: 1000,
      timingFunction: "ease",
      delay: 0
    })
    wx.showToast({
      title: '成功',
      icon: 'success',
      duration: 2000
    })
    //顶部
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#ff0000',
      animation: {
        duration: 400,
        timingFunc: 'easeIn'
      }
    })
    wx.removeTabBarBadge({
      index: 0,
      success: function (res) {
        console.log("移除");
      },
      fail: function (res) {
        console.log(res);
      }
    })
    wx.hideTabBarRedDot({
      index:2
    })
    },
showloading:function(){
  wx.showLoading({
    title: '加载中',
  })
  setTimeout(function () {
    wx.hideLoading()
  }, 2000)

},
showmodal:function(){
  wx.showModal({
    title: '提示',
    content: '这是一个模态弹窗',
    success: function (res) {
      if (res.confirm) {
        console.log('用户点击确定')
      } else if (res.cancel) {
        console.log('用户点击取消')
      }
    }
  })
  //底部导航
  if(wx.canIUse('showModal.cancel')){
  wx.setTabBarStyle({
    color: '#red',
    selectedColor: '#000',
    backgroundColor: '#0000FF',
    borderStyle: 'white'
  })
  }
  else{
    console.log("版本过低");
  }
},
showactionsheet:function(){
  wx.showActionSheet({
    itemList: ['A', 'B', 'C'],
    success: function (res) {
      console.log(res.tapIndex)
    },
    fail: function (res) {
      console.log(res.errMsg)
    }
  })
},
})
var Util = require('../../utils/util');