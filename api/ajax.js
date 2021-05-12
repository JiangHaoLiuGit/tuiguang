const request = (url, options) => {
   let headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
   }
   let token = wx.getStorageSync('token')
   if(token.access_token){
      headers = {
         'Content-Type': 'application/x-www-form-urlencoded',
         'Authorization':'Bearer ' + token.access_token
      }
   }
   if(url == wx.getStorageSync("config").login_url){
      headers = {
         'Content-Type': 'application/x-www-form-urlencoded'
      }
   }
   
   console.log(headers)
   return new Promise((resolve, reject) => {
       wx.request({
           url: url,
           method: options.method,
           data: options.data,
           header: headers,
           success(request) {

              if(request.statusCode == '401'){
                 
                  console.log(token.access_token)
                  console.log("token过期了")
              }
              if(typeof request.data == "string"){
               if(request.data.substring(0,3) == "<In"){
                     //检测到token过期
                     console.log(token.refresh_token)
                     if(token.refresh_token == "" && url != wx.getStorageSync("config").login_url){
                        if(getCurrentPages()[getCurrentPages().length-1].route == "pages/user/code/code"){
                           wx.showToast({ title: "账号信息过期.重新跳往验证码页", icon: "none",duration: 2000 });
                           setTimeout(function(){
                              wx.navigateTo({
                                 url: "/pages/user/code/code",
                              });
                           },2000)
                        }else if(getCurrentPages()[getCurrentPages().length-1].route == "pages/firm/firmRegist/firmRegist"){
                           wx.showToast({ title: "账号信息过期.重新跳往注册页", icon: "none",duration: 2000 });
                           setTimeout(function(){
                              wx.navigateTo({
                                 url: "/pages/firm/firmRegist/firmRegist",
                              });
                           },2000)
                        }else{
                           //跳往主页
                           wx.showToast({ title: "账号信息过期.正在跳往登录页", icon: "none",duration: 2000 });
                           setTimeout(function(){
                              wx.navigateTo({
                                 url: "/pages/login/login",
                              });
                           },2000)
                        }
                        
                        
                     }
                     wx.showModal({
                        title: '提示',
                        content: '用户信息过期.请重新获取',
                        success (res) {
                           
                        if (res.confirm) {
                              wx.request({
                                 url: wx.getStorageSync("config").pathPrefix+"token/refresh",
                                 method: "POST",
                                 data: {"refreshToken":token.refresh_token},
                                 header:{
                                    'Content-Type': 'application/x-www-form-urlencoded'
                                 },
                                 success(res) {
                                    console.log(res)
                                    if(res.data.code == "0"){
                                       let token = {
                                          access_token:res.data.data.access_token,
                                          refresh_token:res.data.data.refresh_token
                                        }
                                        wx.setStorageSync("token",token);
                                    }else{
                                       if(getCurrentPages()[getCurrentPages().length-1].route == "pages/user/code/code"){
                                          wx.showToast({ title: "账号信息过期.重新跳往验证码页", icon: "none",duration: 2000 });
                                          setTimeout(function(){
                                             wx.navigateTo({
                                                url: "/pages/user/code/code",
                                             });
                                          },2000)
                                       }else if(getCurrentPages()[getCurrentPages().length-1].route == "pages/firm/firmRegist/firmRegist"){
                                          wx.showToast({ title: "账号信息过期.重新跳往注册页", icon: "none",duration: 2000 });
                                          setTimeout(function(){
                                             wx.navigateTo({
                                                url: "/pages/firm/firmRegist/firmRegist",
                                             });
                                          },2000)
                                       }else{
                                          //跳往主页
                                          wx.showToast({ title: "账号信息过期.正在跳往登录页", icon: "none",duration: 2000 });
                                          setTimeout(function(){
                                             wx.navigateTo({
                                                url: "/pages/login/login",
                                             });
                                          },2000)
                                       }
                                    }
                                 },
                                 fail(error) {
                                    //失败结果
                                    console.log(error)
                                    //401 如果不成功跳登录页
                                    reject(error)
                                 }
                              })
                        } else if (res.cancel) {}
                        }
                     })
                  }
                  
               }else{
                  resolve(request.data)
               }
               
           },
           fail(error) {
               //失败结果
               console.log(error)
               //401 如果不成功跳登录页
               reject(error)
           }
       })
   })
}

function token(){
   //判断本地有没有token如果没有的话返回login页面.重新登录(登录超时)
   
}

const get = (url, options = {}) => {
   return request(url, { method: 'GET', data: options })
}

const post = (url, options) => {
   return request(url, { method: 'POST', data: options })
}


module.exports = {
   get,
   post,
}