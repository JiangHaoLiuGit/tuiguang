// pages/code.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    code:"666666",
    navTop:"",
    navBtnHeight:"",
    navBtnBottom:"",
    navHeight:"",
    firm_id:0,
    tuiguang:0
  },
  buttonSubmit2:function(e){
    if(e.detail.value.yanzhen == this.data.code){
      //传给下一个页面推广码
      wx.navigateTo({
        url: "/pages/firm/firmRegist/firmRegist?tuiguang="+this.data.tuiguang,
      });
    }else{
      wx.showToast({ title: "验证码错误", image:"/static/erreo.png",icon: "none",duration: 2000 });
    }
  },
  //回退
  navBack: function () {
    wx.navigateBack({
      delta: 1
    })      
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //公司id
    if(options.firm_id){
      console.log(options.firm_id)
      this.data.firm_id = options.firm_id
      this.setData({
        firm_id:options.firm_id
      })
    }
    //修改验证码
    if(options.code){
      this.data.code = options.code
      this.setData({
        code:options.code
      })
    }

    //推广码
    if(options.codeId){
      this.data.tuiguang = options.codeId
      this.setData({
        tuiguang:options.codeId
      })
      ajaxRes.get(wx.getStorageSync("config").getById_url,{
        id: this.data.tuiguang,
      }).then(res => {
        console.log(res)
        if(res.data.codeState == 1){
          wx.showToast({ title: "推广码已经失效,请耐心等待推广员审核",icon: "none",duration: 2000 });
        }
      }).catch(err => {
        //ajax.js反馈的reject结果
        console.log(err)
      })
    }
    console.log(this.data.tuiguang)
    console.log(this.data.codeId)
    console.log(this.data.code)
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