
var sha1 = require('sha1')
var Wechat = require('./wechat')



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
