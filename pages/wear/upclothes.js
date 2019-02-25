// pages/wear/upclothes.js
Page({
  data: {
    showModalStatus: true,
    clothesname:"",
    clothestype:"",
    clothessrc:""
  },
  getclothesname:function(e){
    var val = e.detail.value;
    this.setData({
      clothesname: val
    });

  },
  addclothes: function (e) {
    if (!this.data.clothesname ||!this.data.clothestype){
      wx.showToast({
        title: '请填写衣服类型及名称',
        icon: 'none',
        duration: 1000
      })
    }
    var item={
        "name": this.data.clothesname,
        "id": 1,
        "url": "",
        "xid": 1
    }
    if (this.data.clothestype){
      //裤子

    }else{
      //上衣

    }
    // var currentStatu = e.currentTarget.dataset.statu;
    // this.util(currentStatu)
  },
  closemodel:function(e){
    var currentStatu = e.currentTarget.dataset.statu;
    this.util(currentStatu)
  },
  util: function (currentStatu) {
    /* 动画部分 */
    // 第1步：创建动画实例   
    var animation = wx.createAnimation({
      duration: 200,  //动画时长  
      timingFunction: "linear", //线性  
      delay: 0  //0则不延迟  
    });

    // 第2步：这个动画实例赋给当前的动画实例  
    this.animation = animation;

    // 第3步：执行第一组动画  
    animation.opacity(0).rotateX(-100).step();

    // 第4步：导出动画对象赋给数据对象储存  
    this.setData({
      animationData: animation.export()
    })

    // 第5步：设置定时器到指定时候后，执行第二组动画  
    setTimeout(function () {
      // 执行第二组动画  
      animation.opacity(1).rotateX(0).step();
      // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象  
      this.setData({
        animationData: animation
      })

      //关闭  
      if (currentStatu == "close") {
        this.setData(
          {
            showModalStatus: false
          }
        );
      }
    }.bind(this), 200)

    // 显示  
    if (currentStatu == "open") {
      this.setData(
        {
          showModalStatus: true
        }
      );
    }
  },
  setclothestype: function () {
    var tapIndex;
    wx.showActionSheet({
      itemList: ['上衣', '裤子'],
      success: function (res) {
        console.log(res)
        tapIndex = res.tapIndex;
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
    this.setData({
      clothestype: tapIndex?"裤子":"上衣"
    })
  },
  uploadimg:function(){
    //初始化
    wx.cloud.init({
      env: 'ldd233-ddb286',
      traceUser: true
    })
    //引用数据库
    const db = wx.cloud.database({
      env: 'ldd233-ddb286'
    })
    //const test = db.collection('test1');
    const test1 = db.collection('test1').doc('XHObJInnuWjcix65')
    db.collection('test1').get().then(res => {
      // res.data 包含该记录的数据
      console.log(res.data)
    })
    // db.collection('test1').add({
    //   // data 字段表示需新增的 JSON 数据
    //   data: {
    //     "type": 1,
    //     "typename": "上衣",
    //     "hiddena": false,
    //     "icsrc": "/pages/res/ic-up.png",
    //     "item": [
    //       {
    //         "name": "粉色假两件",
    //         "id": 1,
    //         "url": "/pages/res/p-s1.jpg",
    //         "xid": 1
    //       },
    //     ]
    //   }
    // })
    //   .then(res => {
    //     console.log(res)
    //   })

    wx.showToast({
      title: '这个还没做~嘻嘻嘻',
      icon: 'none',
      duration: 2000
    })
  }


})