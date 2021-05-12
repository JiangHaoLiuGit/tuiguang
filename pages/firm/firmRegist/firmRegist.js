var ajax = require("../../../common/oss/uploadAliyun.js");
var app = getApp()
var ajaxRes = require("../../../api/ajax.js")
// pages/firmRegist/firmRegist.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    point:false,
    //控制是推广注册企业还是重新修改企业信息.默认是1.即推广注册企业.如果是重新修改就是2了
    type:1,
    //控制点击查看企业协议内容的显示隐藏
    pactBlean:false,
    //企业协议内容
    pact:{
      name:"企业加盟1号协议",
      content:`鉴于： 化学事故应急救援工作的目标是最大限度地减少化学事故造成的人员伤害、财产损失和环境破坏。《危险化学品安全管理条例》和《危险化学品登记管理办法》规定危险化学
      品生产企业必须向用户提供化学事故应急咨询服务，为危险化学品事故应急救援提供技术指导和必要的协助。企业提供24小时应急咨询服务（Ⅰ级应急服务），承担社会救援的义务，以便其产
      品在运输和使用过程中发生事故时，救援者能及时了解产品的成分、危险特性、应急措施等信息。 为了规范我国的化学事故应急咨询服务网络， _河南鑫华矿冶股份有限公司（以下简称甲方
      ）、河南省安全科学技术研究院技术咨询服务部（以下简称为乙方）、国家安全生产监督管理总局化学品登记中心（以下简称丙方）三方经友好协商，在平等的基础上签订本咨询代理协议，共同
      遵守。鉴于： 化学事故应急救援工作的目标是最大限度地减少化学事故造成的人员伤害、财产损失和环境破坏。《危险化学品安全管理条例》和《危险化学品登记管理办法》规定危险化学品生
      产企业必须向用户提供化学事故应急咨询服务，为危险化学品事故应急救援提供技术指导和必要的协助。企业提供24小时应急咨询服务（Ⅰ级应急服务），承担社会救援的义务，以便其产品
      在运输和使用过程中发生事故时，救援者能及时了解产品的成分、危险特性、应急措施等信息。 为了规范我国的化学事故应急咨询服务网络， _河南鑫华矿冶股份有限公司（以下简称甲方）
      、河南省安全科学技术研究院技术咨询服务部（以下简称为乙方）、国家安全生产监督管理总局化学品登记中心（以下简称丙方）三方经友好协商，在平等的基础上签订本咨询代理协议，共
      同遵守。`
    },
    openId:"",
    //公司成立日期
    endedTime1: '',
    //营业起始日期
    endedTime2: '',
    //营业到期日期
    endedTime3: '',
    //导航栏信息
    navTop:"",
    navBtnHeight:"",
    navBtnBottom:"",
    navHeight:"",
    //企业名称
    firmName:"",
    //企业类型
    array:['国有企业'],
    arrayIndex:"国有企业",
    //企业简称
    name5:"",
    //监控企业简称时的参数
    jianBlean:false,
    //营业执照
    yinye:"",
    yinyeImg:"",
    yinyeId:"",
    //企业法人姓名
    name1:"",
    //监控企业法人姓名时的参数
    nameBlean1:false,
    //法人身份证
    shenfen:"",
    shenfenImg:"",
    shenfenId:"",
    //法人手机号
    name2:"",
    //法人手机号状态
    name2Status:"",
    //法人手机号输入的验证码
    name2Id:"",
    //此数组收录验证码成功的手机号
    successIphone:[],
    //授权注册按钮
    switchChecked:false,

    //被授权人姓名
    name3:"",
    //监控企业法人姓名时的参数
    nameBlean3:false,
    //公司法人授权书：
    shouquan:"",
    shouquanImg:"",
    //被授权人手机号
    name4:"",
    //被授权人手机号状态
    name4Status:"",
    //被授权人手机号输入的验证码
    name4Id:"",
    time:true,
    yanzhen:"获取验证码",
    formBlean:false,
    //企业id
    firm_id:0,
    tuiguang:0,
    content:"",
  },
  //控制日期提示(请输入年月日)的事件
  onPickerChange3: function (e) {
    let index = e.target.dataset.index
    console.log(e.detail.dateString)
    if(index == 1){
      this.setData({
        endedTime1: e.detail.dateString
      })
    }else if(index == 2){
      this.setData({
        endedTime2: e.detail.dateString
      })
    }else if(index == 3){
      this.setData({
        endedTime3: e.detail.dateString
      })
    }

  },
  //关闭协议内容
  pactBtn:function(){
    this.setData({
      pactBlean:false
    })
  },
  pactBtnOpen:function(){
    this.setData({
      pactBlean:true
    })
  },
  toDouble:function(num) {
    if(num >= 10) {//大于10
      return num;
    } else {//0-9
      return '0' + num
    }
    },
  getToday:function() {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    return year + '-' + this.toDouble(month) + '-' + this.toDouble(day)
  },
  //微信小程序双向数据绑定开始
  //普通input封装
  inputedit:function(e){
    
    let _this = this,
        dataset = e.currentTarget.dataset,
        value = e.detail.value,
        name = dataset.name;
    if(name == "name5"){
      if(value.length >= 11){
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
    }
    if(name == "name1"){
      if(value.length >= 6){
        this.data.nameBlean1 = true
        this.setData({
          nameBlean1:true
        })
      }else{
        this.data.nameBlean1 = false
        this.setData({
          nameBlean1:false
        })
      }
    }
    if(name == "name3"){
      if(value.length >= 6){
        this.data.nameBlean3 = true
        this.setData({
          nameBlean3:true
        })
      }else{
        this.data.nameBlean3 = false
        this.setData({
          nameBlean3:false
        })
      }
    }
    _this.data[name] = value;
    _this.setData({
      //这个name是变量。复用性强
      name:_this.data[name]
    })
  },
  //对接阿里云oss
  addImg:function(e){
    let typeImg = e.currentTarget.dataset.img
    var that = this;
    wx.showActionSheet({
      itemList: ['从相册中选择', '拍照'],
      itemColor: "#00000",
      success: function (res) {
        if (!res.cancel) {
          if (res.tapIndex == 0) {
            that.chooseWxImage('album',typeImg)
          } else if (res.tapIndex == 1) {
            that.chooseWxImage('camera',typeImg)
          }
        }
      }
    })
  },
  // 图片本地路径
  chooseWxImage: function (type,typeImg) {
    var that = this;
    
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: [type],
      success: function (res) {
        that.data[typeImg] = res.tempFilePaths[0]
        if(typeImg == "yinye"){
          that.setData({
            yinye:res.tempFilePaths[0]
          })
        }else if(typeImg == "shenfen"){
          that.setData({
            shenfen:res.tempFilePaths[0]
          })
        }else if(typeImg == "shouquan"){
          that.setData({
            shouquan:res.tempFilePaths[0]
          })
        }
        ajax({
          filePath: res.tempFilePaths[0],
          dir: "images/",
          success: function (res) {
              if(typeImg == "yinye"){
                that.setData({
                  yinyeImg:app.globalData.imgUrl
                })
              }else if(typeImg == "shenfen"){
                that.setData({
                  shenfenImg:app.globalData.imgUrl
                })
              }else if(typeImg == "shouquan"){
                that.setData({
                  shouquanImg:app.globalData.imgUrl
                })
              }
          },
          fail: function (res) {
              console.log("上传失败", res );
          }
        }) //调用上传方法
      }
    }) 
  },
  bindPickerChange : function(e){
    let _this = this
    this.data.arrayIndex = this.data.array[e.detail.value]
    this.setData({
      arrayIndex:_this.data.array[e.detail.value]
    })
  },
  switchChange:function(event){
    const detail = event.detail;
    this.data.switchChecked = detail.value
    this.setData({
      switchChecked : detail.value
    })
    
  },
  //回退
  navBack: function () {
    wx.navigateBack({
      delta: 1
    })      
  },
  formSubmit:function(e){
    
    //防止用户注册提交之后重复点击
    if(this.data.formBlean){
      wx.showToast({ title: "请耐心等待管理员审核!", icon: "none",duration: 2000 });
      return
    }
    if(this.data.name5 == ""){
      this.errorFun("企业简称必填")
      return
    }
    if(this.data.name5.length >= 11){
      this.errorFun("企业简称名字请控制到1-10位之间")
      return
    }
    if(!this.chinese(this.data.name5,"企业简称")){
      return false
    }
    
    if(this.data.yinyeId == ""){
      this.errorFun("营业执照编码必填")
      return
    }
    if(this.data.yinye == ""){
      this.errorFun("营业执照必须上传")
      return
    }
    if(this.data.endedTime1 == ""){
      this.errorFun("公司成立日期必填")
      return
    }
    if(this.data.endedTime2 == ""){
      this.errorFun("营业起始日期必填")
      return
    }
    if(this.data.endedTime3 == ""){
      this.errorFun("营业期限日期必填")
      return
    }
    if(this.data.name1 == ""){
      this.errorFun("企业法人姓名必填")
      return
    }
    if(this.data.name1.length >= 6){
      this.errorFun("企业法人姓名请控制到1-5位之间")
      return
    }
    if(!this.chinese(this.data.name1,"企业法人姓名")){
      return false
    }
    
    //身份证验证
    var regId = /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/;
    if(this.data.shenfenId == ""){
      this.errorFun("身份证号码必填")
      return
    }else if (!this.data.shenfenId.match(regId)) {
      this.errorFun("身份证号格式错误")
      return
    }
    
    if(this.data.shenfen == ""){
      this.errorFun("身份证必须上传")
      return
    }
    if(this.data.switchChecked == false){
      //授权注册验证
      if(this.warrant() == false){
        return
      }
      this.zhuce()
    }else{
      //没有授权注册验证
      if(this.unwarrant() == false){
        return
      }
      this.zhuce()
    }
  },
  zhuce:function(){
    let timers = this.data.endedTime1
    if(this.data.endedTime2.length > 5 && this.data.endedTime3.length > 5){
      timers = parseInt(this.data.endedTime3.substring(0,4)) - parseInt(this.data.endedTime2.substring(0,4)) + "年"
    }
    let endTime = this.data.endedTime3
    if(this.data.endedTime3 == "长期"){
      endTime = "2099-12-31 00:00:00"
      timers = "长期"
    }
    let nums = {
      enterpriseName:this.data.firmName,
      licenseType:1,
      abbreviation:this.data.name5,
      licenseCode:this.data.yinyeId,
      licenseUrl:this.data.yinyeImg,
      icenseEffectiv:timers,
      icenseEffectivStart:this.data.endedTime2,
      icenseEffectivEnd:endTime,
      legalPerson:this.data.name1,
      legalCard:this.data.shenfenId,
      legalCardUrl:this.data.shenfenImg,
    }

    // //推广企业注册
    let obj ={}
    let num1 = {
      enterpriseName:this.data.firmName,
      licenseType:1,
      abbreviation:this.data.name5,
      licenseCode:this.data.yinyeId,
      licenseUrl:this.data.yinyeImg,
      icenseEffectiv:timers,
      icenseEffectivStart:this.data.endedTime2,
      icenseEffectivEnd:endTime,
      legalPerson:this.data.name1,
      legalCard:this.data.shenfenId,
      legalCardUrl:this.data.shenfenImg,
      authorizedPhone:this.data.name2,
      type:0,
      openId:this.data.openId
    }

    let num2 = {
      enterpriseName:this.data.firmName,
      licenseType:1,
      abbreviation:this.data.name5,
      licenseCode:this.data.yinyeId,
      licenseUrl:this.data.yinyeImg,
      icenseEffectiv:timers,
      icenseEffectivStart:this.data.endedTime2,
      icenseEffectivEnd:endTime,
      legalPerson:this.data.name1,
      legalCard:this.data.shenfenId,
      legalCardUrl:this.data.shenfenImg,
      authorizedName:this.data.name3,
      authorizedPhone:this.data.name4,
      authorizedCardUrl:this.data.shouquanImg,
      type:1,
      openId:this.data.openId
    }
    
    
    //修改企业信息
    let num3 = {
      enterpriseName:this.data.firmName,
      licenseType:1,
      abbreviation:this.data.name5,
      licenseCode:this.data.yinyeId,
      licenseUrl:this.data.yinyeImg,
      icenseEffectiv:timers,
      icenseEffectivStart:this.data.endedTime2,
      icenseEffectivEnd:endTime,
      legalPerson:this.data.name1,
      legalCard:this.data.shenfenId,
      legalCardUrl:this.data.shenfenImg,
      authorizedPhone:this.data.name2,
      id:this.data.firm_id,
      type:0
    }

    let num4 = {
      enterpriseName:this.data.firmName,
      licenseType:1,
      abbreviation:this.data.name5,
      licenseCode:this.data.yinyeId,
      licenseUrl:this.data.yinyeImg,
      icenseEffectiv:timers,
      icenseEffectivStart:this.data.endedTime2,
      icenseEffectivEnd:endTime,
      legalPerson:this.data.name1,
      legalCard:this.data.shenfenId,
      legalCardUrl:this.data.shenfenImg,
      authorizedName:this.data.name3,
      authorizedPhone:this.data.name4,
      authorizedCardUrl:this.data.shouquanImg,
      id:this.data.firm_id,
      type:1
    }
    if(this.data.type == 1 && this.data.switchChecked ==false){
      obj = num1
    }else if(this.data.type == 1 && this.data.switchChecked ==true){
      obj = num2
    }else if(this.data.type == 2 && this.data.switchChecked ==false){
      obj = num3
    }else if(this.data.type == 2 && this.data.switchChecked ==true){
      obj = num4
    }
    obj.icenseEffectivStart = obj.icenseEffectivStart + " 00:00:00"
    obj.icenseEffectivEnd = obj.icenseEffectivEnd + " 00:00:00"
    console.log("------------调试")
    console.log(obj)
    ajaxRes.post(wx.getStorageSync("config").firmRegist_url,obj).then(res => {
        console.log(res)
        if(res.code == 0){
          wx.showToast({ title: "上传成功!", icon: "success",duration: 2000 });
          this.data.formBlean = true
          this.setData({
            formBlean:true
          })
          //上传成功后使用推广码.
          console.log("使用本次推广码:"+this.data.tuiguang)
          this.tui(this.data.tuiguang)
        }else if(res.code == -8022){
          wx.showToast({ title: "上传失败，企业简称已经存在!", icon: "none",duration: 2000 });
        }
    }).catch(err => {
      //ajax.js反馈的reject结果
      console.log(err)
    })
  },
  tui:function(id){
    ajaxRes.post(wx.getStorageSync("config").useCode_url,{
      //推广码id
     id: id,
   }).then(res => {
     console.log(res)
   }).catch(err => {
     //ajax.js反馈的reject结果
     console.log(err)
   })
  },
  warrant:function(){
    //法人手机号长度,格式,非空验证
    if(this.phoneRlus(this.data.name2,"法人") == false){
      return false
    }
    
    if(this.data.name2Id == ""){
      this.errorFun("法人手机验证码必填")
      return false
    }
    // if(this.data.name2Status == "" || this.data.name2Status == false){
    //   this.errorFun("法人手机号没有通过验证码验证")
    //   return false
    // }
  },
  unwarrant:function(){
    
    if(this.data.name3 == ""){
      this.errorFun("被授权人姓名必填")
      return false
    }
    if(this.data.name3.length >= 6){
      this.errorFun("被授权人姓名请控制到1-5位之间")
      return false
    }
    if(!this.chinese(this.data.name3,"被授权人姓名")){
      return false
    }
    
    if(this.data.shouquan == ""){
      this.errorFun("公司法人授权书必填")
      return false
    }
    //被授权人手机号长度,格式,非空验证
    if(this.phoneRlus(this.data.name4,"被授权人") == false){
      return false
    }
    if(this.data.name4Id == ""){
      this.errorFun("被授权人手机验证码必填")
      return false
    }
    // if(this.data.name4Status == "" || this.data.name4Status == false){
    //   this.errorFun("被授权人手机号没有通过验证码验证")
    //   return false
    // }
  },
  errorFun:function(value){
    //image:"/static/erreo.png",
    wx.showToast({ title: value, icon: "none",duration: 2000,mask:true });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  //手机号长度,格式,非空验证
  phoneRlus:function(phone,people){
    if(phone == ""){
      this.errorFun(people + "手机号码必填")
      return false
    }
    if (phone.length > 11) {
      this.errorFun(people + "手机号输入超过11位,请重新输入")
      return false
    }
    if (!(/^1[34578]\d{9}$/.test(phone))) {
      this.errorFun(people + "手机号输入有误,请重新输入")
      return false
    }
  },
  //手机号失去焦点验证手机号是否通过
  iphoneYanBlur:function(e){
    let name = e.currentTarget.dataset.name
    if(name == "name2"){
      //法人手机号
      if(this.arrayYan(this.data.successIphone,this.data.name2)){
        this.data.name2Status = true;
        this.setData({
          name2Status:true
        })
      }else{
        if(this.data.name2Status){
          this.data.name2Status = "";
          this.setData({
            name2Status:""
          })
        }
      }
    }else if(name == "name4"){
      //法人手机号
      if(this.arrayYan(this.data.successIphone,this.data.name4)){
        this.data.name4Status = true;
        this.setData({
          name4Status:true
        })
      }else{
        if(this.data.name4Status){
          this.data.name4Status = "";
          this.setData({
            name4Status:""
          })
        }
      }
    }
  },
  arrayYan:function(arr,value){
    if(arr.length == 0){
      return false
    }else{
      for(let i = 0 ; i < arr.length ; i ++){
        if(value == arr[i]){
          return true
        }
      }
    }
  },
  //手机验证码离开焦点判断手机号,请求后端手机号和验证码是否一致
  yanCode:function(e){
    let name = e.currentTarget.dataset.name
    let _this = this
    if(name == "name2Id"){
      if(this.data.name2Status){
        return
      }else{
        //去请求后端接口判断 手机验证码name2Id和手机号name2
        console.log("法人手机号验证验证码是否成功")
        console.log(this.data.name2)
        console.log(this.data.name2Id)
        // ajaxRes.post(wx.getStorageSync("config").codeVerif_url,{
        //   tel: this.data.name2,
        //   code: this.data.name2Id
        // }).then(res => {
        //   console.log("法人手机号验证验证码是否成功后台返回")
        //   console.log(res)
        //   if(res.code == 0){
        //     wx.showToast({ title: "法人手机号验证码匹配成功", icon: "none",duration: 2000 });
        //     this.data.successIphone.push(this.data.name2)
        //     this.data.name2Status = true
        //     this.setData({
        //       name2Status:true,
        //       successIphone:_this.data.successIphone
        //     })
        //   }else{
        //     wx.showToast({ title: "法人手机号验证码匹配失败", icon: "none",duration: 2000 });
        //     this.data.name2Status = false
        //     this.setData({
        //       name2Status:false
        //     })
        //   }
        // }).catch(err => {
        //   //ajax.js反馈的reject结果
        //   console.log(err)
        // })
        
      }
    }else if(name == "name4Id"){
      if(this.data.name4Status){
        return
      }else{
        //去请求后端接口判断 手机验证码name4Id和手机号name4
        console.log("被授权人手机号验证验证码是否成功")
        console.log(this.data.name4)
        console.log(this.data.name4Id)
        // ajaxRes.post(wx.getStorageSync("config").codeVerif_url,{
        //   tel: this.data.name4,
        //   code: this.data.name4Id
        // }).then(res => {
        //   console.log("被授权人手机号验证验证码是否成功后台返回")
        //   console.log(res)
        //   if(res.code == 0){
        //     wx.showToast({ title: "被授权人手机号验证码匹配成功", icon: "none",duration: 2000 });
        //     this.data.successIphone.push(this.data.name4)
        //     this.data.name4Status = true
        //     this.setData({
        //       name4Status:true,
        //       successIphone:_this.data.successIphone
        //     })
        //   }else{
        //     wx.showToast({ title: "被授权人手机号验证码匹配失败", icon: "none",duration: 2000 });
        //     this.data.name4Status = false
        //     this.setData({
        //       name4Status:false
        //     })
        //   }
        // }).catch(err => {
        //   //ajax.js反馈的reject结果
        //   console.log(err)
        // })
      }
    }
  },
  //获取手机验证码
  yan:function(e){
    let num = e.currentTarget.dataset.name
    if(!this.data.time){
      let timerTim = this.data.yanzhen
      timerTim = timerTim.substring(0,timerTim.length - 1)
      wx.showToast({ title: "请您"+timerTim+"秒之后重试", icon: "none",duration: 2000 });
      return
    }
    if(num == 1){
      //法人手机号长度,格式,非空验证
      if(this.phoneRlus(this.data.name2,"法人") == false){
        return false
      }
      this.yufang()
      console.log(this.data.name2 + "去获取验证码")
      ajaxRes.post(wx.getStorageSync("config").tel_url,{
        tel: this.data.name2,
      }).then(res => {
        console.log(res)
        if(res.code == 0 || res.code == -8000){
          wx.showToast({ title: "获取验证码成功", icon: "success",duration: 2000 });
        }else{
          wx.showToast({ title: "获取验证码失败", image:"/static/erreo.png", icon: "none",duration: 2000 });
        }
      }).catch(err => {
        //ajax.js反馈的reject结果
        console.log(err)
      })
    }else if(num == 2){
      //被授权人手机号长度,格式,非空验证
      if(this.phoneRlus(this.data.name4,"被授权人") == false){
        return false
      }
      this.yufang()
      console.log(this.data.name4 + "去获取验证码")
      ajaxRes.post(wx.getStorageSync("config").tel_url,{
        tel: this.data.name4,
      }).then(res => {
        console.log(res)
        if(res.code == 0 || res.code == -8000){
          wx.showToast({ title: "获取验证码成功", icon: "success",duration: 2000 });
        }else{
          wx.showToast({ title: "获取验证码失败", image:"/static/erreo.png", icon: "none",duration: 2000 });
        }
      }).catch(err => {
        //ajax.js反馈的reject结果
        console.log(err)
      })
    }
  },
  //防止用户获取验证码的重复点击
  yufang:function(){
    this.data.time = false
    if(this.data.yanzhen != "获取验证码"){
      return
    }
    let tim = 60;
    this.setData({
      time:false,
      yanzhen:tim+"s"
    })
    let timer = setInterval(()=>{
      tim--
      this.data.yanzhen = tim+"s"
      this.setData({
        yanzhen:tim+"s"
      })
      if(tim == 0){
        this.data.yanzhen = "获取验证码"
        this.data.time = true
        this.setData({
          time:true,
          yanzhen:"获取验证码"
        })
        clearInterval(timer)
      }
    },1000)
  },
  chinese:function(value,name){
    var pattern = /^[\u4e00-\u9fa5]+$/;
    if(pattern.test(value)){
      return true
    }else{
      wx.showToast({ title: name + "必须是中文", icon: "none",duration: 2000,mask:true });
      return false
    }
  },
  callOff:function(){
    
  },
  callOn:function(){
    this.data.point = false
      this.setData({
        point:false
      })
  },
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
    console.log("------------调试")
    console.log(options.tuiguang)
    console.log(options.open)
    if(options.open){
      this.data.openId = options.open
      this.setData({
        openId:options.open
      })
    }
    if(options.type){
      this.setData({
        type:options.type
      })
    }
    if(options.firm_id){
      this.setData({
        firm_id:options.firm_id
      })
    }
    if(options.tuiguang){
      this.data.tuiguang = options.tuiguang
      this.setData({
        tuiguang:options.tuiguang
      })
    }
    //根据推广码id获取推广码信息
    
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    //获取小程序的appid
    wx.showLoading({
      title:"小程序加载中"
    })
    setTimeout(()=>{
      this.data.point = true
      this.setData({
        point:true
      })
      ajaxRes.get(wx.getStorageSync("config").getById_url,{
        id: this.data.tuiguang,
      }).then(res => {
        console.log(res)
        wx.hideLoading()
        if(res.data.codeState == 0){
          //未使用推广码.获取修改企业信息
          if(res.data.codeType == 1){
            //推广码.企业要注册
            this.data.firmName = res.data.enterpriseName
            this.setData({
              firmName:res.data.enterpriseName
            })
          }else if(res.data.codeType == 2){
            //修改码.企业要重新修改信息
            this.setData({
              firmName:res.data.enterpriseName,
              //修改需要穿企业id
              firm_id:res.data.enterpriseId,
              content:res.data.content,
              type:2
            })
            //根据企业id获取注册失败的企业上次填过的信息
            ajaxRes.post(wx.getStorageSync("config").getAudit_url,{
              enterpriseId: res.data.enterpriseId,
              auditState:2
            }).then(res => {
              console.log(res)
              //getInfoById_url get id(公司id)
              
              ajaxRes.get(wx.getStorageSync("config").getInfoById_url,{
                id: res.data.enterpriseId
              }).then(res => {
                console.log(res)
                //如果有被授权人的电话.那么按钮点true
                this.data.firmName = res.data.enterpriseName
                this.data.name5 = res.data.abbreviation
                this.data.yinyeId = res.data.licenseCode
                this.data.yinye = res.data.licenseUrl
                this.data.yinyeImg = res.data.licenseUrl
                this.data.endedTime1 = this.formatTimeTwo(res.data.icenseEffectivStart)
                this.data.endedTime2 = this.formatTimeTwo(res.data.icenseEffectivStart)
                this.data.endedTime3 = this.formatTimeTwo(res.data.icenseEffectivEnd)
                this.data.name1 = res.data.legalPerson
                this.data.shenfenId = res.data.legalCard
                this.data.shenfen = res.data.legalCardUrl
                this.data.shenfenImg = res.data.legalCardUrl
                
                
                this.setData({
                  firmName:res.data.enterpriseName,
                  name5:res.data.abbreviation,
                  yinyeId:res.data.licenseCode,
                  yinye:res.data.licenseUrl,
                  yinyeImg:res.data.licenseUrl,
                  endedTime1:this.formatTimeTwo(res.data.icenseEffectivStart),
                  endedTime2:this.formatTimeTwo(res.data.icenseEffectivStart),
                  endedTime3:this.formatTimeTwo(res.data.icenseEffectivEnd),
                  name1:res.data.legalPerson,
                  shenfenId:res.data.legalCard,
                  shenfen:res.data.legalCardUrl,
                  shenfenImg:res.data.legalCardUrl
                  
                })
                if(res.data.authorizedCardUrl == res.data.legalCardUrl){
                  this.data.name2 = res.data.authorizedPhone
                  this.setData({
                    name2:res.data.authorizedPhone
                  })
                }else{
                  this.data.switchChecked = res.data.true
                  this.data.name4 = res.data.authorizedPhone
                  this.data.name3 = res.data.authorizedName
                  this.data.shouquan = res.data.authorizedCardUrl
                  this.data.shouquanImg = res.data.authorizedCardUrl
                  this.setData({
                    switchChecked:true,
                    name4:res.data.authorizedPhone,
                    name3:res.data.authorizedName,
                    shouquan:res.data.authorizedCardUrl,
                    shouquanImg:res.data.authorizedCardUrl,
                  })
                }
              }).catch(err => {
                //ajax.js反馈的reject结果
                console.log(err)
              })
            }).catch(err => {
              //ajax.js反馈的reject结果
              console.log(err)
            })
          }
        }else if(res.data.codeState == 1){
          wx.showToast({ title: "推广码已经失效,请耐心等待推广员审核",icon: "none",duration: 2000 });
          this.data.formBlean = true
          this.setData({
            formBlean:true
          })
        }
      }).catch(err => {
        //ajax.js反馈的reject结果
        console.log(err)
      })
    },4000)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
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
    return y + '-' + MM + '-' + d
    // return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
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
