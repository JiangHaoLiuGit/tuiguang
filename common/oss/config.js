var fileHost = "https://liujianghao.oss-cn-hangzhou.aliyuncs.com"
//刘江浩
//https://liujianghao.oss-cn-hangzhou.aliyuncs.com
//LTAI4GDGEKa3eWzE6cXfHxfJ
//LMzo6CAw8KAJsPwBh352Y1DQOh3obj
//松格科技
//https://songgete.oss-accelerate.aliyuncs.com
//LTAI4GAADVDQTFKcA5zNW9dd
//1kKqFmVr3pT4lvTxS8gmsYhpPb6bfU
var config = {
  //aliyun OSS config
  uploadImageUrl: `${fileHost}`, //默认存在根目录，可根据需求改
  OSSAccessKeyId: 'LTAI4GDGEKa3eWzE6cXfHxfJ',
  AccessKeySecret: 'LMzo6CAw8KAJsPwBh352Y1DQOh3obj',
  timeout: 87600 //这个是上传文件时Policy的失效时间
};
module.exports = config