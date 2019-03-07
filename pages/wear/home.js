//index.js
//获取应用实例
var localData = require('../data/json.js');

const app = getApp()


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
    //console.log(option) 
    this.setData({
      jacketitem: localData.jacketitem,
      trousersitem: localData.trousersitem
    });
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
    var jitem = this.data.jacketitem.item;
    var titem = this.data.trousersitem.item;
    var index = Math.floor(Math.random() * jitem.length)
    var indexk = Math.floor(Math.random() * titem.length)
    console.log(index+","+indexk);
    this.setData({
      wearshow: true,
      weartopurl: jitem[index].url,
      weartopurl2: titem[indexk].url,
      weartoptext:"不喜欢,下一套",
    });
  },
  setwear2: function (e) {
    var index2 = this.data.index2;
    if(index2 == localData.wearlist.length) index2=0;
    this.setData({
      wearbtmurl: localData.wearlist[index2],
      wearbtmtext: "再换",
      index2: index2 + 1,
    });
  }

})
var Util = require('../../utils/util');