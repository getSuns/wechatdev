//index.js
//获取应用实例
var app = getApp()
//初始化
wx.cloud.init({
  env: 'ldd233-ddb286',
  traceUser: true
})
const db = wx.cloud.database()
const _ = db.command;
//var localData = require('../data/json.js');
Page({
  data: {
    jacketitem:{},
    trousersitem:{}
  },
  onLoad:function(){
    var jacketitemc={
      "type": 0,
      "typename": "上衣",
      "hiddena": false,
      "icsrc": "/pages/res/ic-up.png",
      "item":[]
    };
    var trousersitemc = {
      "type": 1,
      "typename": "裤子",
      "hiddena": false,
      "icsrc": "/pages/res/ic-up.png",
      "item": []
    };
    db.collection('clothes').get().then(res => {
      // res.data 包含该记录的数据
      var jitem=[];
      var titem=[];
      for (let v of res.data) {
        if (v.item.type){
          titem.push(v);
        }else{
          jitem.push(v);
        }
      }
      jacketitemc.item = jitem;
      trousersitemc.item = titem;
    })
    setTimeout(() => {
      this.setData({
        jacketitem: jacketitemc,
        trousersitem: trousersitemc,
      });
    }, 500);
    
  },
  toggerlist:function(e){
    var typeid = e.currentTarget.dataset.index;
    var jitem = this.data.jacketitem;
    var titem = this.data.trousersitem;
    console.log(jitem)
    if (typeid==0){
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
  longTap: function (e) {
    var that=this;
    wx.showModal({
      title: '',
      content: '是否删除？',
      cancelText: "取消",
      confirmText: "确定",
      success(res) {
        if (res.confirm) {
          var id = e.currentTarget.dataset.index;
          db.collection('clothes').doc(id).remove()
            .then(res => {
              wx.showToast({
                title: '删除成功',
                icon: 'success',
                duration: 1000
              })
              that.onLoad();
            })
            .catch(console.error)
        } else if (res.cancel) {
         
        }
      }
    })
   
  },
  upclothes: function (e) {
    wx.navigateTo({
      url: '/pages/wear/upclothes'
    })
  },
  onPullDownRefresh:function(){
    this.onLoad();
  }
})

var Util = require('../../utils/util');