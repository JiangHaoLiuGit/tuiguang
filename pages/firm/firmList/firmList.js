// pages/firm/firmList/firmList.js
var ajax = require("../../../api/ajax.js")
const App = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    navTop:"",
    navBtnHeight:"",
    headHeight:"",
    //企业查询状态,全部0,等待1,审核成功2,失败3
    state:0,
    //去分享弹框显示状态
    point:false,
    // touchS:[0,0],
    // touchE:[0,0],
    //拒绝原因
    reason:"",
    reView:[],
    reView1:[],
    reView2:[],
    reView3:[],
    failName:"暂无数据",
    //验证码
    code:666666,
    //推广码id
    codeId:0,
    //公司id
    firm_id:0,
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
  //点击重新注册
  goBtn:function(e){
    wx.showLoading({
      title:"加载中"
    })
    //点击重新注册的时候获取企业id
    let id = e.currentTarget.dataset.id
    console.log(id)
    //点击重新注册的时候获取推广表信息有没有失效.过期啥的
    ajax.get(wx.getStorageSync("config").getInfoBy_url,{
      enterpriseId: id,
      codeType:2
    }).then(res => {
      console.log(res)
      wx.hideLoading()
      if(res.data == null){
        wx.showToast({ title: "推广员选了该公司不能重新注册",icon: "none",duration: 2000 });
      }else if(res.data.codeState == 0){
        //注册码未使用.可以分享 会获取到企业修改码.修改验证码.企业名字.
        this.data.code = res.data.verificationCode
        this.data.codeId = res.data.id
        this.data.firm_id = res.data.enterpriseId
        this.setData({
          point:true,
          codeId:res.data.id,
          code:res.data.verificationCode,
          firm_id:res.data.enterpriseId,
        })
      }else{
        wx.showToast({ title: "修改码已经失效", image:"/static/erreo.png",icon: "success",duration: 2000 });
      }
    }).catch(err => {
      //ajax.js反馈的reject结果
      console.log(err)
    })
  },
  //关闭分享弹窗
  callOff:function(){
    this.setData({
      point:false
    })
  },
  //点击获取失败原因
  touchC:function(e){
    let id = e.currentTarget.dataset.id
    console.log("获取失败原因")
    console.log("公司id" + id)
    this.setData({
      reason:""
    })
      //点击查看失败原因
      ajax.post(wx.getStorageSync("config").getAudit_url,{
        enterpriseId:id,
        auditState:2
      }).then(res => {
        console.log(res)
        this.setData({
          reason:res.data.content
        })
      }).catch(err => {
        //ajax.js反馈的reject结果
        console.log(err)
      })
  },
  touchS: function (e) {  // touchstart
    let startX = App.Touches.getClientX(e)
    startX && this.setData({ startX })
  },
  touchM: function (e) {  // touchmove
    let name = e.currentTarget.dataset.name
    if(name == "reView3"){
      let reView3 = App.Touches.touchM(e, this.data.reView3, this.data.startX)
      reView3 && this.setData({ reView3 })
    }else if(name == "reView"){
      let reView = App.Touches.touchM(e, this.data.reView, this.data.startX)
      reView && this.setData({ reView })
    }
  },
  touchE: function (e) {  // touchend
    const width = 130  // 定义操作列表宽度
    let name = e.currentTarget.dataset.name
    if(name == "reView3"){
      let reView3 = App.Touches.touchE(e, this.data.reView3, this.data.startX, width)
      reView3 && this.setData({ reView3 })
    }else if(name == "reView"){
      let reView = App.Touches.touchE(e, this.data.reView, this.data.startX, width)
      reView && this.setData({ reView })
    }
    
  },
  //切换tab
  tab:function(e){
    let index = e.currentTarget.dataset.index
    this.data.state = index
    this.setData({
      state:index
    })
    this.obtain(this.data.state)
  },
  obtain:function(index){
    wx.showLoading({
      title:"加载中"
    })
    if(index == 0){
      ajax.post(wx.getStorageSync("config").getCompanyList_url,{
      }).then(res => {
        wx.hideLoading()
        if(res.code == 0){
          let arr = res.data
          if(res.data.length == 0){
            this.setData({
              failName:"暂无数据"
            })
          }
          for(let i = 0 ; i < arr.length ; i++){
            arr[i].first = arr[i].abbreviation.substring(0,1)
            arr[i].createDate = this.formatTimeTwo(arr[i].createDate)
          }
          this.data.reView = arr
          this.setData({
            reView:arr
          })
          let _this = this
          if(this.data.reView.length>0){
            for (let i in _this.data.reView) {
              if(_this.data.reView[i].auditState == 2){
                _this.data.reView[i].hidden = false
              }
            }
            this.setData({
              reView:_this.data.reView
            })
          }
          
          }else{
            this.setData({
              failName:"未知错误"
            })
          }
          
        }).catch(err => {
          //ajax.js反馈的reject结果
          console.log(err)
        })
    }else{
      let ind = ""
      if(index > 0){
        ind = index - 1
      }
      ajax.post(wx.getStorageSync("config").getCompanyList_url,{
        auditState:ind
      }).then(res => {
        console.log(res)
        wx.hideLoading()
        if(res.code == 0){
          let arr = res.data
          if(res.data.length == 0){
            this.setData({
              failName:"暂无数据"
            })
          }
          for(let i = 0 ; i < arr.length ; i++){
            arr[i].first = arr[i].abbreviation.substring(0,1)
            arr[i].createDate = this.formatTimeTwo(arr[i].createDate)
          }
          if(index == 1){
            this.setData({
              reView1:arr
            })
          }else if(index == 2){
            this.setData({
              reView2:arr
            })
          }else if(index == 3){
            this.setData({
              reView3:arr
            })
          }
          let _this = this
          if(this.data.reView3.length>0){
            for (let i in _this.data.reView3) {
              _this.data.reView3[i].hidden = false
            }
            this.setData({
              reView3:_this.data.reView3
            })
          }
          
          
        }else{
          this.setData({
            failName:"未知错误"
          })
        }
          
      }).catch(err => {
        //ajax.js反馈的reject结果
        console.log(err)
      })
    }
    
    
  },
  //每个块转页面
  enter:function(e){
    let dataset = e.currentTarget.dataset
    let state = dataset.state
    let id = dataset.id
    console.log(id)
    if(state == 0){
      wx.navigateTo({
        url: "/pages/firm/pending/pending?id="+id
      });
    }else if(state == 1){
      wx.navigateTo({
        url: "/pages/firm/success/success?id="+id
      });
    }else{
      
    }
  },
  tabView: function(){
    let reView3 = App.Touches.clearData(this.data.reView3)
      reView3 && this.setData({ reView3 })
    let reView = App.Touches.clearData(this.data.reView)
    reView && this.setData({ reView })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    if(options.state){
      let index = options.state
      this.data.state = index
      this.setData({
        state:index
      })
    }
    if(getApp().globalData.navTop != ""){
      this.data.navTop = getApp().globalData.navTop * 2
      this.data.navBtnHeight = getApp().globalData.navBtnHeight * 2
      this.data.headHeight = getApp().globalData.navTop * 2 + getApp().globalData.navBtnHeight * 2 + 36 + 68
      this.setData({
        navTop:getApp().globalData.navTop * 2,
        navBtnHeight:getApp().globalData.navBtnHeight * 2,
        headHeight:getApp().globalData.navTop * 2 + getApp().globalData.navBtnHeight * 2 + 36 + 68
      })
    }
  },
  

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.obtain(this.data.state)

    // ajaxRes.get(wx.getStorageSync("config").getInfoBy_url,{
    //   enterpriseId: 32,
    //   auditState:2
    // }).then(res => {
    //   if(res.data.codeState == 0){
    //     //注册码未使用.可以分享
    //   }
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
  //回退
  navBack: function () {
    wx.navigateBack({
      delta: 1
    })      
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (e) {
    this.setData({
      point:false
    })
    let dataSet = e.target.dataset,
    name = dataSet.name
    console.log(name)
    // this.data.code = res.data.verificationCode
    // this.data.codeId = res.data.id
    // this.data.firm_id = res.data.enterpriseId
    return {
      title: "企业注册",
      desc:"马上去企业注册",
      path:'/pages/user/code/code?firm_id=' + this.data.firm_id + "&&codeId=" + this.data.codeId + "&&code=" +  this.data.code
    }
    
  }
})
