//app.js
import Touches from './common/Touches.js'
var ajax = require("./api/ajax.js")
var config = require("./api/config.js")
App({
  onLaunch: function (options) {
    console.log(options)
    //场景值应该是1036(App 分享消息卡片)
    var zhi = options.scene
    console.log(options.scene)
    //获取小程序的appid
    let accountInfo = wx.getAccountInfoSync()
    let appId = accountInfo.miniProgram.appId
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    wx.setStorageSync("config",config);
    let token = wx.getStorageSync('token')
    
    console.log("access_token:" + token.access_token)
    console.log("refresh_token:" + token.refresh_token)
    if(token.access_token){
      //拿着openid获取用户信息
      ajax.post(wx.getStorageSync("config").openId_url,{
      }).then(res => {
        console.log(res)
        console.log(zhi)
        if(res.code == "-9003"){
            // wx.navigateTo({
            //   url: "/pages/login/login?zhi="+zhi,
            // });
          
        }else if(res.code == "0"){
          wx.setStorageSync("userInfoTwo",res.data);
          // wx.navigateTo({
          //   url: "/pages/user/index/index?zhi="+zhi,
          // });
          
        }else{
          wx.showToast({ title: res.msg ,icon: "none",duration: 2000 });
        }
       
      }).catch(err => {
        //ajax.js反馈的reject结果
        console.log(err)
      })
    }else{
      // console.log("本地没有token,先去登录获取token存微信小程序内存.下次就不用登录了")
      wx.login({
        success: res => {
          let code = res.code;
            //ajax.js反馈的resolve结果
          console.log("code:" + code)
          console.log("appId:" + appId)
          console.log("去获取openId存到本地")
          
          ajax.post(wx.getStorageSync("config").token_url,{
            appid: appId,
            code: code
          }).then(res => {
            console.log("------测试.获取token-----")
            console.log(res)
            let id = {
              appid:appId,
              code:code,
              openid:res.data.openid,
              session_key:res.data.session_key
            }
            let token = {
              access_token:res.data.accessToken.access_token,
              refresh_token:res.data.accessToken.refresh_token
            }
            console.log(token)
            wx.setStorageSync("userId",id);
            wx.setStorageSync("token",token);
            //调用openid接口获取用户信息
            wx.request({
              url: wx.getStorageSync("config").pathPrefix+'appUser/getUserInfoByOpenId',
              method: "post",
              header: {
               'Content-Type': 'application/x-www-form-urlencoded', // 默认值
               'Authorization':'Bearer '+res.data.accessToken.access_token
              },
              success(res) {
                console.log(res)
                console.log(zhi)
                if(res.data.code == "-9003"){
                  //微信未绑定.去登录页绑定
                    wx.navigateTo({
                      url: "/pages/login/login?zhi="+zhi,
                    });
                }else if(res.data.code == "0"){
                  wx.setStorageSync("userInfoTwo",res.data.data);
                  if(res.data.data.userRole == "promoter"){
                    if(res.data.data.openId == "" || res.data.data.openId == null){
                        wx.navigateTo({
                          url: "/pages/login/login?zhi="+zhi,
                        });
                    }else{
                        wx.navigateTo({
                          url: "/pages/user/index/index?zhi="+zhi,
                        });
                    }
                  }else{
                    wx.showToast({ title: "该账号没有权限,请重试", image:"/static/erreo.png",icon: "success",duration: 2000 });
                  }
                }else{
                  wx.showToast({ title: res.data.msg ,icon: "none",duration: 2000 });
                }
              },
              fail(error) {
                  //失败结果
                  console.log(error)
                  //401 如果不成功跳登录页
              }
            })
            
          }).catch(err => {
            //ajax.js反馈的reject结果
            console.log(err)
          })

        }
      })
    }
    //获取胶囊的信息
    let menuButtonObject = wx.getMenuButtonBoundingClientRect();
    wx.getSystemInfo({
      success: res => {
        let statusBarHeight = res.statusBarHeight,
          navTop = menuButtonObject.top + 3,//胶囊按钮与顶部的距离 index页面要设置padding-top
          navBtnHeight = menuButtonObject.height,//胶囊按钮的高度 
          navHeight = statusBarHeight + menuButtonObject.height + (menuButtonObject.top - statusBarHeight)*2 + 5,//导航高度
          navBtnBottom = menuButtonObject.top - statusBarHeight + 5 //胶囊按钮到下面的距离
        this.globalData.navBtnBottom = navBtnBottom
        this.globalData.navHeight = navHeight;
        this.globalData.navTop = navTop;
        this.globalData.windowHeight = res.windowHeight;
        this.globalData.navBtnHeight = navBtnHeight;
      },
      fail(err) {
        console.log(err);
      }
    })
  },
  globalData: {
    userInfo: null,
    userId:null,
    token:null
  },
  Touches:new Touches()
})