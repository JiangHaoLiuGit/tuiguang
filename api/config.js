const pathPrefix = "http://3506y2l291.wicp.vip:25916/"
const ip = "http://192.168.0.137:8900/"
//http://3506y2l291.wicp.vip:42643/ //上一次11-03
//汪琪电脑ip http://192.168.101.38:8900/
//http://192.168.0.106:8900/
//http://3506y2l291.wicp.vip:28755
const config = {
  pathPrefix,
  login_url: pathPrefix + "login",
  token_url: pathPrefix + "weixin/code2token",
  username_url: pathPrefix + "appUser/getUserInfoByUserName",
  openId_url: pathPrefix + "appUser/getUserInfoByOpenId",
  weiXinBind_url: pathPrefix + "appUser/weiXinBind",
  firmRegist_url: pathPrefix + "company/save",
  getInfoById_url: pathPrefix + "company/getInfoById",//根据企业id获取企业信息
  getCompanyList_url:pathPrefix + "company/getCompanyList",
  tel_url:pathPrefix + "sms/smsByWeChat",
  verification_url:pathPrefix + "promotionCode/verification",//推广码分享验证唯一
  enterprise_url:pathPrefix + "promotionCode/addSave",//推广码保存
  useCode_url:pathPrefix + "promotionCode/useCode",//注册完之后调用使用推广码
  getById_url:pathPrefix + "promotionCode/getById",//推广码查询
  enterpriseAudit_url:pathPrefix + "audit/enterpriseAudit",//推广员审核接口
  getList_url:pathPrefix + "grade/getList",//推广员获取vip等级
  getAudit_url:pathPrefix + "audit/getAuditInfoByEnterpriseId",//根据企业id获取失败的原因
  getInfoBy_url:pathPrefix + "promotionCode/selectByEnterpriseIdCodeType",//获取推广表信息
  // sms/verificationCode
  codeVerif_url:pathPrefix + "sms/verificationCode",//手机验证码
}

module.exports = config







  // wx.request({
  //   url: 'http://192.168.0.134:8900/appUser/getUserInfoByUserName',
  //   method: "post",
  //   header: {
  //    'Content-Type': 'application/x-www-form-urlencoded', // 默认值
  //    'Authorization':'Bearer '+res.data.access_token
  //   },
  //   success(res) {
  //       console.log(res)
  //   },
  //   fail(error) {
  //       //失败结果
  //       console.log(error)
  //   }
  // })
  // ajax.post(wx.getStorageSync("config").weiXinBind_url,{
  //   userId: userid,
  // }).then(res => {
  //   console.log(res)
  // }).catch(err => {
  //   //ajax.js反馈的reject结果
  //   console.log(err)
  // })

  //wx.showToast({ title: "账号或密码必填", image:"/static/erreo.png",icon: "success",duration: 2000 });
  //杭州谷禾技术有限公司 40
