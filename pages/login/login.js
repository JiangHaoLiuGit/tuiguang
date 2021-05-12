// pages/login/login.js
var ajax = require("../../api/ajax.js")
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username:"test001",
    password:"test00",
    //去授权弹框显示状态
    point:false,
    //软件测试提出的优化效果
    usernamePoint:true,
    passwordPoint:true
  },
  //账号得到焦点
  usernameFocus:function(){
    if(this.data.usernamePoint){
      if(this.data.username == ""){
        this.data.usernamePoint = false
        this.setData({
          usernamePoint:false
        })
      }
    }
    
  },
  //账号失去焦点
  usernameBlur:function(){
    if(this.data.username == ""){
      this.data.usernamePoint = true
      this.setData({
        usernamePoint:true
      })
    }
  },
  //密码得到焦点
  passwordFocus:function(){
    if(this.data.passwordPoint){
      if(this.data.password == ""){
        this.data.passwordPoint = false
        this.setData({
          passwordPoint:false
        })
      }
    }
    
  },
  //密码失去焦点
  passwordBlur:function(){
    if(this.data.password == ""){
      this.data.passwordPoint = true
      this.setData({
        passwordPoint:true
      })
    }
  },
  //关闭分享弹窗
  callOff:function(){
    this.setData({
      point:false
    })
  },
  shouquan:function(e){
    //用户授权
    wx.getSetting({
      success: res => {
        console.log(res)
        if (res.authSetting['scope.userInfo'] === true) { // 成功授权
          wx.showLoading({
            title:"加载中",

          })
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              console.log(res)
              app.globalData.userInfo = res.userInfo
              wx.setStorageSync('userInfo', res.userInfo)
              this.data.userImg = res.userInfo.avatarUrl
              this.setData({
                userImg:res.userInfo.avatarUrl,
                point:false
              })
              wx.hideLoading()
              //授权之后进入主页面
              wx.navigateTo({
                url: "/pages/user/index/index",
              });
            },
            fail: res => {
              console.log(res)
            }
          })
        } else if (res.authSetting['scope.userInfo'] === false) { // 授权弹窗被拒绝
          wx.openSetting({
            success: res => {
              console.log(res)
              console.log("用户拒绝了")
            },
            fail: res => {
              console.log(res)
            }
          })
        } else { // 没有弹出过授权弹窗
          wx.getUserInfo({
            success: res => {
              console.log(res)
              app.globalData.userInfo = res.userInfo
              wx.setStorageSync('userInfo', res.userInfo)
              this.data.userImg = res.userInfo.avatarUrl
              this.setData({
                userImg:res.userInfo.avatarUrl,
                point:false
              })
              wx.hideLoading()
              //授权之后进入主页面
              wx.navigateTo({
                url: "/pages/user/index/index",
              });
            },
            fail: res => {
              console.log(res)
              wx.openSetting({
                success: res => {
                  console.log(res)
                  app.globalData.userInfo = res.userInfo
                  wx.setStorageSync('userInfo', res.userInfo)
                  this.setData({
                    userImg:res.userInfo.avatarUrl,
                    point:false
                  })
                  wx.hideLoading()
                  //授权之后进入主页面
                  wx.navigateTo({
                    url: "/pages/user/index/index",
                  });
                },
                fail: res => {
                  console.log(res)
                }
              })
            }
          })
        }
      }
    })
  },
  onClickApply:function(e){
    let username = e.detail.value.userName
    let password = e.detail.value.passWord
    var zg =  /^[0-9a-zA-Z]*$/; 
    if(!username){
      wx.showToast({ title: "账号必填", image:"/static/erreo.png",icon: "success",duration: 2000 });
      return 
    }else if(!zg.test(username)){
      wx.showToast({ title: "账号格式错误", image:"/static/erreo.png",icon: "success",duration: 2000 });
      return 
    }else if(!password){
      wx.showToast({ title: "密码必填", image:"/static/erreo.png",icon: "success",duration: 2000 });
      return 
    }else if(password.indexOf(" ") != -1){
      wx.showToast({ title: "密码不能含有空格", image:"/static/erreo.png",icon: "success",duration: 2000 });
      return 
    }
       
 
      
      wx.showLoading({
        title:"登录中"
      })
      // 登录接口验证账号密码.返回免秘钥登录access_token
      ajax.post(wx.getStorageSync("config").login_url,{
        username: username,
        password: password
      }).then(res => {
        //ajax.js反馈的resolve结果
        console.log(res)
        
        if(res.code == 0){
          console.log(res.data.access_token)
          //access_token存到小程序全局.以后每次调接口方便用,
          // app.globalData.access_token = res.data.access_token
          //调用方法判断access_token里面携带的username有没有权限
          let _this = this
          wx.request({
            url: wx.getStorageSync("config").pathPrefix+'appUser/getUserInfoByUserName',
            method: "post",
            header: {
             'Content-Type': 'application/x-www-form-urlencoded', // 默认值
             'Authorization':'Bearer '+res.data.access_token
            },
            success(request) {
                console.log(request)
                if (request.data.data.userRole == "promoter") {
                  app.globalData.userInfoTwo = request.data.data
                  wx.setStorageSync("userInfoTwo",request.data.data);
                  wx.setStorageSync("userid",request.data.data.id);
                  let userid = request.data.data.userId
                  if(request.data.data.openId != null && request.data.data.openId != ""){
                    wx.hideLoading()
                    console.log(wx.getStorageSync('userInfo'))
                    if(wx.getStorageSync('userInfo') == ""){
                      _this.data.point = true
                      _this.setData({
                        point:true
                      })
                    }else{
                      wx.navigateTo({
                        url: "/pages/user/index/index",
                      });
                    }
                    
                  }else{
                    //角色没有微信绑定
                    console.log("-----------微信绑定接口--------------")
                    console.log(userid)
                    //用户没有微信绑定过.所以微信绑定接口调用
                    ajax.post(wx.getStorageSync("config").weiXinBind_url,{
                      userId: userid,
                    }).then(res => {
                      console.log(res)
                      if(res.code == 0){
                        wx.hideLoading()
                        console.log(wx.getStorageSync('userInfo'))
                        if(wx.getStorageSync('userInfo') == ""){
                          _this.data.point = true
                          _this.setData({
                            point:true
                          })
                        }else{
                          wx.navigateTo({
                            url: "/pages/user/index/index",
                          });
                        }
                        
                      }
                    }).catch(err => {
                      //ajax.js反馈的reject结果
                      console.log(err)
                      wx.showToast({ title: "微信绑定失败", icon: "none",duration: 2000 });
                    })
                  }
                } else{
                  //如果有权限的话判断角色.如果是推广员.就跳主页.如果不是提示没有权限
                  //并且把data存到本地.因为index要用;
                  wx.showToast({ title: "该账号没有权限,请重试", icon: "none",duration: 2000 });
                }
            },
            fail(error) {
                //失败结果
                console.log(error)
                //401 如果不成功跳登录页
            }
          })
        }else{
          wx.showToast({ title: "账号或密码错误", icon: "none",duration: 2000 });
        }
        
        
        
      }).catch(err => {
        //ajax.js反馈的reject结果
        console.log(err)
        wx.showToast({ title: err, icon: "none",duration: 2000 });
      })
  
  
    
  },
  //登录名和密码数据双向绑定
  inputedit:function(e){
    let _this = this,
        dataset = e.currentTarget.dataset,
        value = e.detail.value,
        name = dataset.name;
    _this.data[name] = value
    _this.setData({
      name:_this.data[name]
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  
  onLoad: function (options) {
    wx.showLoading({
      title: '获取用户信息中',
    })
    setTimeout(function(){
      wx.hideLoading()
    },2000)
    console.log(options.zhi)
    if(options.zhi){
      // wx.showToast({title:"场景值:"+options.zhi,icon:'none',duration:10000})
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
    // username:"test001",
    // password:"test00",
    // //去授权弹框显示状态
    // point:false,
    // //软件测试提出的优化效果
    // usernamePoint:true,
    // passwordPoint:true
    if(this.data.username != ""){
      if(this.data.usernamePoint){
        this.data.usernamePoint = false
        this.setData({
          usernamePoint:false
        })
      }
    }
    if(this.data.password != ""){
      if(this.data.passwordPoint){
        this.data.passwordPoint = false
        this.setData({
          passwordPoint:false
        })
      }
    }
    // wx.request({
    //   url: wx.getStorageSync("config").pathPrefix+'login',
    //   method: "POST",
    //   header: {
    //    'Content-Type': 'application/x-www-form-urlencoded'
    //   },
    //   data:{
    //     username: this.data.username,
    //     password: this.data.password
    //   },
    //   success(res) {
    //     console.log(res)
    //     let token = {
    //       access_token:wx.getStorageSync("token").access_token,
    //       refresh_token:res.data.refresh_token
    //     }
    //     console.log(token)
    //     wx.setStorageSync("token",token);
    //     setTimeout(function(){
    //       wx.navigateTo({
    //         url: "/pages/user/index/index",
    //       });
    //     },2000)
    //   },
    //   fail(error) {
    //       //失败结果
    //       console.log(error)
    //       wx.showToast({ title: error, icon: "none",duration: 2000 });
    //       //401 如果不成功跳登录页
    //   }
    // })
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