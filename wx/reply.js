let Wechat = require('../wechat/wechat')
var config = require('../config')

let wechatApi = new Wechat(config.wechat)


let data={
    appid:'wx3df629936bf31f75',
    redirect_uri:encodeURI('http://tsml520.cn/wx'),
    response_type:'code',
    scope:'snsapi_userinfo',
    wechat_redirect:'wechat_redirect' 
}
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
            "url":`http://tsml520.cn`
         }
         ]
    }]
}

wechatApi.addMenu(menu).then((data)=>{
    console.log('自定义菜单返回的数据2',data)
  })

wechatApi.fetchAccessToken().then(data=>{
    data = JSON.parse(data)
    console.log('用来获取 ------ 临时获取的票据',data.access_token)
    let access_token = data.access_token
    wechatApi.fetchTicket(access_token).then((data)=>{
        console.log('临时票价',data)
      })
})

exports.reply = function(){

}