
var sha1 = require('sha1')

let promise = require('bluebird')
let request = promise.promisify(require('request'))
var prefix = 'https://api.weixin.qq.com/cgi-bin/'
var  api = {
  access_token :prefix+ 'token?grant_type=client_credential',
  //临时素材 上传地址
  temporary:{
    upload : prefix + 'media/upload',
  },
  permanent:{
    // https://api.weixin.qq.com/cgi-bin/material/add_news?access_token=ACCESS_TOKEN
    upload :  prefix + 'material/add_material?',
    uploadNews : prefix + 'material/add_news',
    uploadNewsPic : prefix + 'material/uploadimg',
  },
  getUser:{
    // https://api.weixin.qq.com/cgi-bin/user/info?access_token=ACCESS_TOKEN&openid=OPENID&lang=zh_CN
    url:prefix + 'user/info?' 
  },
  menu:{
    // https://api.weixin.qq.com/cgi-bin/menu/create?access_token=ACCESS_TOKEN
    url:prefix + 'menu/create?'
  }
}
function Wechat(opts){
  var that = this
  this.appID = opts.appID
  this.appSecret = opts.appSecret
  this.token = opts.token
  // 获取 存储票据都是异步的 返回一个Promise
  this.getAccessToken = opts.getAccessToken
  this.saveAccessToken = opts.saveAccessToken

  this.getAccessToken()
  .then( (data)=> {
      //获取票据
      try{
        // 获取到的是liu 要转换
          data = JSON.parse(data)
      }
      catch(e){
        // 如果异常,则更新 获取票据
        // 第一次获取和需要更新会走这里
        // 返回的一个封装好的promise 里面是一个对象
        /* 
        {
          access_token: '获取的access_token字符串'
          expires_in: 7200 //处理之后的时间(获取的7200+加上获取时候的时间秒数)
        }
        */
        return that.updateAccessToken()
      }
      //判断是否合法
      if(that.isValidAccessToken(data)){
        return Promise.resolve(data)
      }
      else{
        return that.updateAccessToken()
      }
    })
    .then((data)=>{
      that.access_token = data.access_token
      that.expires_in = data.expires_in

      that.saveAccessToken(data)
    })
}
//增加 自定义菜单
Wechat.prototype.addMenu = function(menu){
  var that = this
  
  return new Promise((resolve,rej)=>{
    that.getAccessToken()
        .then((data)=>{
          console.log('成功',data)
          var  url = api.menu.url + 'access_token=' + data.access_token 
            
          request({method: 'POST', url: url,body: menu, json: true}).then((response)=>{
            console.log('自定一菜单-----',response.body)
            var _data = response.body
              if(_data){
                  resolve(_data)
              }else{
                  throw new Error('addMenu fails')
              }                    
            })
            .catch(function(err){
                rej(err)
            })
        })
      })

}
//获取 AccessToken
Wechat.prototype.updateAccessToken = function(){
  var appID = this.appID
  var appSecret = this.appSecret
  var  url = api.access_token + '&appid=' + appID + '&secret=' + appSecret
  
  return new Promise((resolve)=>{
 
  request({url:url,json:true}).then(function(response){
    //获取 access_token 和 expires_in
    var data = response.body
    //getTime返回的是毫秒数
    var now = (new Date().getTime())
    var expires_in = now + (data.expires_in - 20) * 1000

    data.expires_in = expires_in

    resolve(data)
    })
  }) 
}

Wechat.prototype.isValidAccessToken = function(data){
  if(!data || !data.access_token || !data.expires_in){
    return false
  }

  var access_token = data.access_token
  var expires_in = data.expires_in
  var now = (new Date().getTime())
  if(now < expires_in){
    return true
  }
  else{
    return false
  }
}

module.exports = function(config){
  var wechat = new Wechat(config)
  let menu =   {
    "button":[
    {    
         "type":"click",
         "name":"今日歌曲",
         "key":"V1001_TODAY_MUSIC"
     },
     {
      "name": "发图", 
      "sub_button": [
          {
              "type": "pic_sysphoto", 
              "name": "系统拍照发图", 
              "key": "rselfmenu_1_0", 
             "sub_button": [ ]
           }, 
          {
              "type": "pic_photo_or_album", 
              "name": "拍照或者相册发图", 
              "key": "rselfmenu_1_1", 
              "sub_button": [ ]
          }, 
          {
              "type": "pic_weixin", 
              "name": "微信相册发图", 
              "key": "rselfmenu_1_2", 
              "sub_button": [ ]
          }
      ]
  },
     {
          "name":"菜单",
          "sub_button":[
          {    
              "type":"view",
              "name":"搜索",
              "url":"http://www.soso.com/"
           },
           {
              "type":"click",
              "name":"赞一下我们",
              "key":"V1001_GOOD"
           },
           {
            "name": "发送位置", 
            "type": "location_select", 
            "key": "rselfmenu_2_0"
        }]
      }]
  }
  wechat.addMenu(menu).then((data)=>{
      console.log('自定义菜单返回的数据2',data)
    })
  
  return function *(next) {
    console.log('.',this.query)
    let token = config.token
    let signature = this.query.signature
    let nonce = this.query.nonce
    let timestamp = this.query.timestamp
    let echostr = this.query.echostr
  
    var str = [token,timestamp,nonce].sort().join('')
    var sha = sha1(str)
  
    if(sha === signature){
      this.body = echostr
    }else{
      this.body = 'wrong---'
    }
  }
}
