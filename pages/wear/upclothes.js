// pages/wear/upclothes.js
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
    showModalStatus: true,
    clothesname:"",
    clothestype:"",
    clothestypename:"",
    count: 0,
    imgUrl:""
  },
  /**
  * 生命周期函数--监听页面加载
  */
  onLoad: function (options) {
    this.getCount()

  },
  getCount: function () {
    //已输入的字数
    var that = this
    db.collection('clothes').count({
      success: res => {
        that.setData({
          count: Number(res.total) + 1
        })
      }
    })

  },
  getclothesname:function(e){
    var val = e.detail.value;
    this.setData({
      clothesname: val
    });

  },
  addclothes: function (e) {
    const that=this;
    console.log(this.data.clothestype);
    if (!this.data.clothesname || !this.data.clothestypename){
      wx.showToast({
        title: '请填写衣服类型及名称',
        icon: 'none',
        duration: 1000
      })
      return false;
    }
    //上传图片
    const filePath = that.data.imgUrl;
    const cloudPath = that.data.count + filePath.match(/\.[^.]+?$/)[0]
    wx.cloud.uploadFile({
      cloudPath,
      filePath,
      success: res => {
        wx.showLoading();
        app.globalData.fileID = res.fileID
        app.globalData.cloudPath = cloudPath
        app.globalData.imagePath = filePath
      },
      fail: e => {
        console.error('[上传文件] 失败：', e)
        wx.showToast({
          icon: 'none',
          title: '上传失败',
        })
      },
      complete: () => {
        wx.hideLoading();
      }
    })
//end
    var item={
      "name": this.data.clothesname,
      "type": this.data.clothestype,
      "id": this.data.count+1,
      "src": this.data.imgUrl
    }
    db.collection('clothes').add({
        // data 字段表示需新增的 JSON 数据
          data: {
            item
          }
        })
        .then(res => {
          wx.showModal({
            title: '上传成功',
            content: '您已上传成功，是否继续上传？',
            cancelText:"衣柜",
            confirmText:"上传",
            success(res) {
              if (res.confirm) {
                //继续上传
                that.setData({
                  clothesname: "",
                  clothestype: "",
                  clothestypename: "",
                  count: 0,
                  imgUrl: ""
                })
              } else if (res.cancel) {
                console.log(1111)
                //回到我的衣柜
                wx.reLaunch({
                  url: '/pages/wear/wardrobe'
                })
              }
            }
          })
        })
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
    var that=this;
    var tapIndex;
    var clothestypename = ['上衣', '裤子']
    wx.showActionSheet({
      itemList: clothestypename,
      success: function (res) {
        tapIndex = res.tapIndex;
        that.setData({
          clothestype: tapIndex,
          clothestypename: clothestypename[tapIndex]
        })
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })

  },
  uploadimg:function(){
    // 选择图片
      var that = this;
      wx.chooseImage({
        count: 1,
        sizeType: ['compressed'],
        sourceType: ['album', 'camera'],
        success: function (res) {
          wx.showLoading({
            title: '上传中',
          })
          const filePath = res.tempFilePaths[0]
          that.setData({
            imgUrl: filePath
          })
          console.log(filePath);
        },
        complete: () => {
          wx.hideLoading()
        },
        fail: e => {
          //console.error(e)
        }
      })
  }


})