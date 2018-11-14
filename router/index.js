const Router = require('koa-router');
var sha1 = require('sha1')
let Wechat = require('../wechat/wechat')
var config = require('../config')
const crypto = require('crypto');
const md5 = crypto.createHash('md5');
// var result = md5.update('a').digest('hex').toUpperCase()

let router= new Router()
let wechatApi = new Wechat(config.wechat)

router.get('/sdk',async (x,next)=>{
  let access = await wechatApi.fetchAccessToken()
  let data = JSON.parse(access)
  let access_token = data.access_token
  let ticketData = await wechatApi.fetchTicket(access_token)
  let ticket = JSON.parse(ticketData).ticket
  let getUrl = x.query.url
  let url = getUrl.split('#')[0]
  //url 当前页面的地址 不含#及其后面的
  console.log('url',url,'ticket',ticket)
  var params = sign(ticket,url)
  // console.log('params',params)
  x.body = params
})
router.get('/wx',async(x,next)=>{
  console.log(x.query,'获取code值-----')
  x.body = 'wx'
})
router.get('/play',async(x,next)=>{
    // let appid = 'wx3df629936bf31f75'
    // let mch_id = '1511047841'
    // 回调连接 http://tsml520.cn/
    // 密钥 gmklNxpgLPCQrOxji2HzIThpAfiyIVx7
  // let   appid = 'wx3df629936bf31f75'  
  // let   mch_id = '10000100'
  // let  device_info = '1000'
  // let  body = 'test'
  // let nonce_str = 'ibuaiVcKdpRxkhJA'
  // let stringA = "appid=wx3df629936bf31f75&body=test&device_info=1000&mch_id=10000100&nonce_str=ibuaiVcKdpRxkhJA";
  // let stringSignTemp = stringA+"&key=036989030fec913af6365b7695ffa918"

  // var result = md5.update(stringSignTemp).digest('hex').toUpperCase()
  console.log(result)

})


router.post('/data',(x,next)=>{
  console.log(x.request.body)

  x.body = {data:'数据-接收成功'}
})

var createNonace = function(){
  return Math.random().toString(26).substr(2,15)
}
var createTimestamp = function () {
  return parseInt(new Date().getTime() / 1000)+''
}

function sign(ticket, url){
  var noncestr = createNonace()
  var timestamp = createTimestamp()
  var signature = _sign(noncestr, timestamp, ticket, url)
  // console.log('noncestr',noncestr,'timestamp',timestamp)
  // console.log('signature',signature)
  return{
    noncestr : noncestr,
    timestamp : timestamp,
    signature : signature
  }
}
function _sign(noncestr, timestamp, ticket, url) {
  var data = [
    'noncestr='+noncestr,
    'jsapi_ticket='+ticket,
    'timestamp='+timestamp,
    'url='+url
  ]
  var str = data.sort().join('&')
  return sha1(str)
}
module.exports = router