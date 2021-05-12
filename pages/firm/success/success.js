// pages/firm/success/success.js
var ajax = require("../../../api/ajax.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navTop:"",
    navBtnHeight:"",
    navBtnBottom:"",
    navHeight:"",
    state:0,
    imgSrc:"",
    hidd3:false,
    imagesWidth:"",
    imagesHeight:"",
    //公司id
    frimId:0,
    frimObj:{},
  },
  //时间戳转时间年月日
  formatTimeTwo:function(value){
    let date = new Date(value);
    let y = date.getFullYear();
    let MM = date.getMonth() + 1;
    MM = MM < 10 ? ('0' + MM) : MM;
    let d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    let h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    let m = date.getMinutes();
    m = m < 10 ? ('0' + m) : m;
    let s = date.getSeconds();
    s = s < 10 ? ('0' + s) : s;
    return y + '年' + MM + '月' + d + '日';
  },
  //给图片默认高度
  imageLoad: function(e) {
    console.log(e)
    let width = e.detail.width
    let height = e.detail.height

    if(width > 750){
      width = 600
    }
    if(height > 1000){
      height = 800
    }
    this.setData({
      imagesWidth:width,
      imagesHeight:height
    })
    console.log(this.data.imagesWidth)
    console.log(this.data.imagesHeight)
  },
  //放大图片
  succ:function(e){
    this.data.imgSrc = e.currentTarget.dataset.value
    this.data.hidd3 = true
    this.setData({
      hidd3:true,
      imgSrc:e.currentTarget.dataset.value
    })
  },
  //回退
  navBack: function () {
    wx.navigateBack({
      delta: 1
    })      
  },
  //返回按钮
  return:function(){
    wx.navigateTo({
      url: "/pages/firm/firmList/firmList?state="+0,
    });
  },
  //关闭放大图片
  por3:function(){
    this.data.hidd3 = false
    this.setData({
      hidd3:false
    })
  },
  formatTimeTwo:function(value){
    let date = new Date(value);
    let y = date.getFullYear();
    let MM = date.getMonth() + 1;
    MM = MM < 10 ? ('0' + MM) : MM;
    let d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    let h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    let m = date.getMinutes();
    m = m < 10 ? ('0' + m) : m;
    let s = date.getSeconds();
    s = s < 10 ? ('0' + s) : s;
    return y + '/' + MM + '/' + d
    // return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(getApp().globalData.navTop != ""){
      this.data.navTop = getApp().globalData.navTop * 2
      this.data.navBtnHeight = getApp().globalData.navBtnHeight * 2
      this.data.navBtnBottom = getApp().globalData.navBtnBottom * 2
      this.data.navHeight = getApp().globalData.navHeight * 2
      this.setData({
        navTop:getApp().globalData.navTop * 2,
        navBtnHeight:getApp().globalData.navBtnHeight * 2,
        navBtnBottom:getApp().globalData.navBtnBottom * 2,
        navHeight:getApp().globalData.navHeight * 2
      })
    }
    if(options.id){
      this.setData({
        frimId:options.id
      })
      console.log(options.id)
      ajax.get(wx.getStorageSync("config").getInfoById_url,{
        id: options.id,
      }).then(res => {
        console.log(res)
        res.data.icenseEffectivStart = this.formatTimeTwo(res.data.icenseEffectivStart)
        res.data.icenseEffectivEnd = this.formatTimeTwo(res.data.icenseEffectivEnd)
        res.data.auditDate = this.formatTimeTwo(res.data.auditDate)
        this.data.frimObj = res.data
        if(res.data.legalCardUrl != res.data.authorizedCardUrl){
          this.data.state = 1
        }else{
          this.data.state = 0
        }
        let _this = this
        this.setData({
          frimObj:res.data,
          state:_this.data.state
        })
      }).catch(err => {
        //ajax.js反馈的reject结果
        console.log(err)
      })
    }
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