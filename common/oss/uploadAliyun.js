const env = require('./config.js');  // 配置文件, 在这文件里配置你的 OSS keyId 和 KeySecret,timeout:86400;
let app = getApp()
//Base64,hmac,sha1,crypto 相关算法
const Base64 = require('./Base64.js');
require('./hmac.js');
require('./sha1.js');
const Crypto = require('./crypto.js');
const uploadFile = function (params) {
    console.log(params.filePath)
    if (!params.filePath || params.filePath.length < 9) {
        wx.showModal({
            title: '图片错误',
            content: '请重试',
            showCancel: false,
        })
        return;
    }
const aliyunFileKey = params.dir + new Date().getTime() + Math.floor(Math.random() * 150) + '.jpg'; // 图片名(可以自己设置想要的图片名)
const aliyunServerURL = env.uploadImageUrl;
const accessid = env.OSSAccessKeyId;
const policyBase64 = getPolicyBase64();
const signature = getSignature(policyBase64);
console.log('aliyunFileKey=', aliyunFileKey);
console.log('aliyunServerURL', aliyunServerURL);
wx.uploadFile({
    url: aliyunServerURL, // 开发者服务器 url
    filePath: params.filePath, // 要上传文件资源的路径, 也就是微信本地路径
    name: 'file',
    header: {  
        'Content-Type': 'application/json'  //这里注意POST请求content-type是小写，大写会报错  
    },
    formData: {
        'key': aliyunFileKey,
        'policy': policyBase64,
        'OSSAccessKeyId': accessid,
        'signature': signature,
        'success_action_status': '200'
    },
    success: function (res) {
        console.log(res)
        app.globalData.imgUrl = aliyunServerURL + "/" + aliyunFileKey
        wx.setStorageSync('imgUrl', aliyunServerURL + "/" + aliyunFileKey)
        console.log(app.globalData.imgUrl)
        if (res.statusCode != 200) {
            if (params.fail) {
                params.fail(res)
            }
            successc(aliyunServerURL + aliyunFileKey);
            return;
        }
        if (params.success) {
            params.success(res);
        }
    },
    fail: function (err) {
        if (params.fail) {
            params.fail(err)
        }
    },
})
}
const getPolicyBase64 = function () {
    let date = new Date();
    date.setHours(date.getHours() + env.timeout);
    let srcT = date.toISOString();
    const policyText = {
        "expiration": srcT, // 设置该 Policy 的失效时间
        "conditions": [
            ["content-length-range", 0, 5 * 1024 * 1024] // 设置上传文件的大小限制, 5mb
        ]
    };
    const policyBase64 = Base64.encode(JSON.stringify(policyText));
    return policyBase64;
}
const getSignature = function (policyBase64) {
    const accesskey = env.AccessKeySecret;
    const bytes = Crypto.HMAC(Crypto.SHA1, policyBase64, accesskey, {
        asBytes: true
    });
    const signature = Crypto.util.bytesToBase64(bytes);
    return signature;
}
module.exports = uploadFile;