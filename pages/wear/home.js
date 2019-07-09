//index.js
//获取应用实例
var localData = require('../data/json.js');
var app = getApp()
//初始化
wx.cloud.init({
  env: 'ldd233-ddb286',
  traceUser: true
})
const db = wx.cloud.database()
const _ = db.command;

Page({
  data: {
    wearshow:false,
    wearshow2: false,
    jacketitem: {},
    trousersitem: {},
    weartopurl:"/pages/res/wear1.jpg",
    weartopurl2: "/pages/res/wear1.jpg",
    wearbtmurl: "/pages/res/wear5.jpg",
    wearbtmurl2: "/pages/res/wear5.jpg",
    weartoptext:"穿啥呢",
    wearbtmtext: "换套厉害的",
    index2:0
  },
  onLoad: function (option) {
    //数据库中取
    db.collection('clothes').get().then(res => {
      // res.data 包含该记录的数据
      var jitem = [];
      var titem = [];
      for (let v of res.data) {
        if (v.item.type) {
          titem.push(v);
        } else {
          jitem.push(v);
        }
      }
        //没有自己的衣服或者裤子使用默认数据
        // console.log(jitem.length)
        // if (!jitem.length || !titem.length) {
        //   console.log("11")
        // this.setData({
        //   jacketitem: localData.jacketitem.item,
        //   trousersitem: localData.trousersitem.item
        // });
        this.setData({
          jacketitem: jitem,
          trousersitem: titem
        });

    })
    
    
 
    //顶部loading
    wx.showNavigationBarLoading();
    setTimeout(function () {
      wx.hideNavigationBarLoading();
    }, 300);
    wx.setTopBarText({
      text: '谢谢你'
    })
    wx.showShareMenu({
      withShareTicket: true
    })
    wx.updateShareMenu({
      withShareTicket: true,
      success() { }
    })

  },

  setwear:function(e){
    var jitem = this.data.jacketitem;
    var titem = this.data.trousersitem;
    var index = Math.floor(Math.random() * jitem.length)
    var indexk = Math.floor(Math.random() * titem.length)
    if (jitem.length + titem.length<3 && this.data.wearshow) {
      wx.showToast({
        title: '小仙女该加衣服了~',
        icon: 'none',
        duration: 1000
      })
    }
    if (jitem.length + titem.length < 2) {
      wx.showToast({
        title: '请到我的衣柜上传衣服~',
        icon: 'none',
        duration: 1000
      })
    }else{
      this.setData({
        wearshow: true,
        weartopurl: jitem[index].item.src,
        weartopurl2: titem[indexk].item.src,
        weartoptext: "不喜欢,下一套",
      });
    }
    
    
  },
  setwear2: function (e) {
    var index2 = this.data.index2;
    if(index2 == localData.wearlist.length) index2=0;
    this.setData({
      wearbtmurl: localData.wearlist[index2],
      wearbtmtext: "再换",
      index2: index2 + 1,
    });
    switch (index2){
      case 3:
        var tiptext = "累不累哦~"
      break;
      case 35:
      break;
      case 40:
      break;
      case 50:
      default:
        wx.showToast({
          title: tiptext,
          icon: 'none',
          duration: 1000
        })
      break;
    }
   
  }

})
var Util = require('../../utils/util');