// pages/spread/spread.js
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
    array:['关于企业加盟1号协议'],
    index:"关于企业加盟1号协议",
    firmName:"",
    //控制企业名字是否能使用参数
    text:false,
    textName:"此名字重复,不可用",
    //推广码id
    firm_id:"",
    sha:"",
    sub:"submit",
    btnDisabled:true,
    //去分享弹框显示状态
    point:false,
    openId:""
  },
  //关闭分享弹窗
  callOff:function(){
    this.setData({
      point:false
    })
  },
  //点击生成并分享按钮,生成分享链接
  goBtn:function(){
    //企业名字可以使用.成功,去获取推广码
    // if(this.data.firm_id == ""){
      var extensionREQ = {
        enterpriseName: this.data.firmName,
        extensionUrl:"/pages/firm/firmRegist/firmRegist",
        codeType:1
      }
      wx.showLoading({
        title:"加载中"
      })
      ajax.post(wx.getStorageSync("config").enterprise_url,extensionREQ)
      .then(res => {
        console.log(res)
        wx.hideLoading()
        if(res.data > 0){
          //生成了企业注册id.准备去分享
          this.data.firm_id = res.data
          let userInfoTwo = wx.getStorageSync('userInfoTwo')
          this.data.openId = userInfoTwo.userNo
          this.setData({
            firm_id:res.data,
            point:true,
            openId:userInfoTwo.userNo
          })
        }else{
          wx.showToast({ title: "该注册码已被分享,但未注册成功!", icon: "none",duration: 2000 });
        }
      }).catch(err => {
        //ajax.js反馈的reject结果
        console.log(err)
      })
    // }else{
    //   //企业推广码有了.直接去分享
    //   ajax.post(wx.getStorageSync("config").verification_url,{
    //     enterpriseName: this.data.firmName,
    //   }).then(res => {
    //     console.log(res)
    //     if(res.code == 0){
    //       //如果正确.分享按钮可以点
    //       this.setData({
    //         point:true
    //       })
    //     }else{
    //       this.disabled(true)
    //     }
    //   }).catch(err => {
    //     //ajax.js反馈的reject结果
    //     console.log(err)
    //   })

      
    // }
  },
  // pick 协议选项双向绑定
  bindPickerChange : function(e){
    let _this = this
    this.data.index = this.data.array[e.detail.value]
    this.setData({
      index:_this.data.array[e.detail.value]
    })
    //设置禁用分享按钮
    if(this.data.index == "请选择协议" || this.data.firmName == ""){
      this.disabled(true)
    }else{
      this.disabled(false)
    }
  },
  //设置分享按钮的禁用开关
  disabled:function(state){
      this.data.btnDisabled = state
      this.setData({
        btnDisabled:state
      })
  },
  // input 协议选项双向绑定
  inputedit:function(e){
    if(e.currentTarget.dataset == ""){
      console.log("名称是空")
      //企业名称
      this.disabled(true)
      return
    }
    let _this = this;
    //input 和 info 双向数据绑定
    let dataset = e.currentTarget.dataset;
    //data-开头是自定义属性,可以通过dataset获取到,dataset是一个json对象
    let value = e.detail.value;
    if(value == ""){
      wx.showToast({ title: "企业名称不能为空", icon: "none",duration: 2000,mask:true });
      this.disabled(true)
      return
    }
    let name = dataset.name
    _this.data[name] = value
    _this.setData({
      firmName:_this.data[name]
    })
    console.log(_this.data[name])
    var pattern = /^[0-9\u4e00-\u9fa5]+$/gi;
    if(pattern.test(_this.data[name])){
      //只有是中文或者数字才能请求后端
      ajax.post(wx.getStorageSync("config").verification_url,{
        enterpriseName: _this.data[name],
      }).then(res => {
        console.log(res)
        if(res.code == 0){
          //如果正确.分享按钮可以点
          this.disabled(false)
        }else{
          this.disabled(true)
        }
      }).catch(err => {
        //ajax.js反馈的reject结果
        console.log(err)
      })
    }else{
      wx.showToast({ title: "企业名称必须是中文或者数字", icon: "none",duration: 2000,mask:true });
      this.disabled(true)
    }
    
      
    //设置禁用分享按钮
    // if(this.data.index == "请选择协议" || this.data.firmName == ""){
    //   this.disabled(true)
    // }else{
    //   this.disabled(false)
    // }
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
    // wx.showModal({
    //   title: '提示',
    //   content: '分享群成功',
    //   success: function(res) {
    //     if (res.confirm) {
    //       console.log('用户点击确定')
    //     } else if (res.cancel) {
    //       console.log('用户点击取消')
    //     }
    //   }
    // })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // ajax.post(wx.getStorageSync("config").getCompanyList_url,{
    //   enterpriseInfoREQ: {auditState:0},
    // }).then(res => {
    //   console.log(res)
    // }).catch(err => {
    //   //ajax.js反馈的reject结果
    //   console.log(err)
    // })
    
    
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
    this.setData({
      point:false
    })
    let firmId = this.data.firm_id
    let openId = this.data.openId
    console.log(openId)
    this.data.firm_id = ""
    return {
      title: "企业注册",
      desc:"马上去企业注册",
      path:'/pages/firm/firmRegist/firmRegist?open=' + openId + "&&tuiguang=" + firmId
    }
    
  }
})