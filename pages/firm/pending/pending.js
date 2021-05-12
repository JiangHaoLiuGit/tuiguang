// pages/firm/pending/pending.js
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
    hidd1:false,
    hidd2:false,
    hidd3:false,
    imgSrc:"",
    maxLength:100,
    switchChecked:true,
    //拒绝原因
    textArea:"",
    firmData:{},
    items:[],
    frimId:0,
    radio:1,
    btnDisabled:true,
    //点击图片放大之后图片宽高
    imagesWidth:"",
    imagesHeight:"",
    //监控失败原因时的参数
    jianBlean:false,
    jianNumber:0
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
  //回退
  navBack: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  //放大图片
  succ2:function(e){
    this.data.imgSrc = e.currentTarget.dataset.value
    this.data.hidd3 = true
    this.setData({
      hidd3:true,
      imgSrc:e.currentTarget.dataset.value
    })
  },
  //关闭放大图片
  por3:function(){
    this.data.hidd3 = false
    this.setData({
      hidd3:false
    })
  },
  radioChange:function(e){
    console.log(e.detail)
    // const items = this.data.items
    // for (let i = 0, len = items.length; i < len; ++i) {
    //   items[i].checked = items[i].value === e.detail.value
    // }
    // this.data.radio = e.detail.value
    this.setData({
      radio:e.detail
    })
    // console.log(this.data.radio)
    // console.log(this.data.items)
  },
  switchChange:function(event){
    const detail = event.detail;
    this.data.switchChecked = detail.value
    this.setData({
      switchChecked : detail.value
    })
    
  },
  por1:function(){
    this.data.hidd1 = false
    this.setData({
      hidd1:false
    })
  },
  poa1:function(){
    
  },
  por2:function(){
    this.data.hidd2 = false
    this.setData({
      hidd2:false
    })
  },
  poa2:function(){
    
  },
  succ:function(){
    this.data.hidd1 = true
    this.setData({
      hidd1:true
    })
    //获取vip等级
    ajax.get(wx.getStorageSync("config").getList_url,{
      
    }).then(res => {
      console.log(res)
      this.data.items = []
      for(let i = 0 ; i < res.data.length ; i++){
        let obj = {
          name:res.data[i].id,
          value:res.data[i].name
        }
        console.log(obj)
        this.data.items.push(obj)
      }
      // this.data.items = res.data
      let _this = this
      this.setData({
        items:_this.data.items
      })
      console.log(this.data.items)
    }).catch(err => {
      //ajax.js反馈的reject结果
      console.log(err)
    })
    // items:[
    //   {name: '0', value: '王者VIP'},
    //   {name: '1', value: '荣耀VIP'},
    //   {name: '2', value: '砖石VIP'},
    //   {name: '3', value: '昕哲VIP'},
    // ]
  },
  fail:function(){
    this.data.hidd2 = true
    this.setData({
      hidd2:true
    })
  },
  buttonSubmit:function(){
    
    console.log("通过")
    console.log()
    ajax.post(wx.getStorageSync("config").enterpriseAudit_url,{
      enterpriseId: this.data.firmData.id,
      enterpriseName: this.data.firmData.enterpriseName,
      auditState:1,
      preferentialGradeId:this.data.radio,
      extensionUrl:"/pages/firm/firmRegist/firmRegist",
    }).then(res => {
      console.log(res)
      if(res.code == 0 && res.msg == "success"){
        wx.showToast({ title: "审核通过", icon: "success",duration: 2000 });
        wx.redirectTo({
          url: "/pages/firm/firmList/firmList?state="+2,
        });
      }else{
        wx.showToast({ title: res.msg, icon: "none",duration: 2000 });
      }
    }).catch(err => {
      //ajax.js反馈的reject结果
      console.log(err)
    })
    
  },
  buttonSubmit2:function(){
    let type = 0
    if(this.data.switchChecked){
      type = 0
    }else{
      type = 1
    }
    console.log("拒绝")
    ajax.post(wx.getStorageSync("config").enterpriseAudit_url,{
      enterpriseId: this.data.firmData.id,
      enterpriseName: this.data.firmData.enterpriseName,
      auditState:2,
      //
      content:this.data.textArea,
      //是否重新修改
      type:type,
      extensionUrl:"/pages/firm/firmRegist/firmRegist",
    }).then(res => {
      console.log(res)
      if(res.code == 0 && res.msg == "success"){
        
        wx.showToast({ title: "审核拒绝成功", icon: "success",duration: 2000 });
        wx.redirectTo({
          url: "/pages/firm/firmList/firmList?state="+3,
        });
      }else{
        wx.showToast({ title: res.msg, icon: "none",duration: 2000 });
      }
    }).catch(err => {
      //ajax.js反馈的reject结果
      console.log(err)
    })
    
  },
  blurTextArea:function(e){
    var value = e.detail.value
    this.data.textArea = value
    this.setData({
      textArea:value
    })
  },
  bindTextArea:function(e){
    var value = e.detail.value
    let _this = this
      this.data.jianNumber = value.length
      if(value.length >= this.data.maxLength){
        this.data.jianNumber = this.data.maxLength
        this.setData({
          jianNumber:_this.data.maxLength
        })
      }else{
        this.setData({
          jianNumber:value.length
        })
      }
      
      if(value.length >= this.data.maxLength){
        this.data.jianBlean = true
        this.setData({
          jianBlean:true
        })
      }else{
        this.data.jianBlean = false
        this.setData({
          jianBlean:false
        })
      }
      
    if(e.detail.value == ""){
      this.data.btnDisabled = true
      this.setData({
        btnDisabled:true
      })
    }else{
      // this.data.textArea = e.detail.value
      this.data.btnDisabled = false
      this.setData({
        btnDisabled:false
        // textArea:e.detail.value
      })
    }
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
      
      console.log("公司id:"+options.id)
      options.id = Number(options.id)
      console.log(typeof options.id)
      ajax.get(wx.getStorageSync("config").getInfoById_url,{
        id: options.id
      }).then(res => {
        console.log(res)
        this.setData({
          firmData:res.data
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