//index.js
//获取应用实例
var localData = require('../data/json.js');
const app = getApp()
Page({
  data: {
    jacketitem:{},
    trousersitem:{}
  },
  onLoad:function(){
    this.setData({
      jacketitem: localData.jacketitem,
      trousersitem: localData.trousersitem
    });
  },
  toggerlist:function(e){
    console.log(e);
    var typeid = e.currentTarget.dataset.index;
    var jitem = this.data.jacketitem;
    var titem = this.data.trousersitem;
    if (typeid==1){
      jitem.hiddena = jitem.hiddena ? false : true;
      if (jitem.hiddena){
        jitem.icsrc = "/pages/res/ic-down.png";
      }else{
        jitem.icsrc = "/pages/res/ic-up.png";
      }
    }else{
      titem.hiddena = titem.hiddena ? false : true;
      if (titem.hiddena) {
        titem.icsrc = "/pages/res/ic-down.png";
      } else {
        titem.icsrc = "/pages/res/ic-up.png";
      }
    }
    
    this.setData({
      jacketitem: jitem,
      trousersitem: titem
    });
  },
  upclothes: function (e) {
    // wx.chooseImage({
    //   success(res) {
    //     const tempFilePaths = res.tempFilePaths
    //     wx.uploadFile({
    //       url: '../data/json.js', // 仅为示例，非真实的接口地址
    //       filePath: tempFilePaths[0],
    //       name: 'file',
    //       formData: {
    //         user: 'test'
    //       },
    //       success(res) {
    //         const data = res.data
    //         // do something
    //       }
    //     })
    //   }
    // })
    wx.navigateTo({
      url: '/pages/wear/upclothes'
    })
  },
  fire:function(){
    wx.navigateTo({
      url: '/pages/wear/fire'
    })
  }
})

var Util = require('../../utils/util');