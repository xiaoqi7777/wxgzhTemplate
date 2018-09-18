const Router = require('koa-router');
var sha1 = require('sha1')
let Wechat = require('../wechat/wechat')
var config = require('../config')

let router= new Router()
let wechatApi = new Wechat(config.wechat)

router.get('/',async (x,next)=>{
  let access = await wechatApi.fetchAccessToken().then(data=>{})
  let data = JSON.parse(access)
  let access_token = data.access_token
  let ticketData = await wechatApi.fetchTicket(access_token)
  let ticket = JSON.parse(ticketData).ticket
  let url = x.href
  // console.log('url',url,'ticket',ticket,'access_token',access_token)
  var params = sign(ticket,url)
  console.log('params',params)
  x.body = params
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
  return{
    noncestr : noncestr,
    timestamp : timestamp,
    signature : signature
  }
}
function _sign(noncestr, timestamp, ticket, url) {
  var data = [
    'noncestr='+noncestr,
    'jsapi_ticket='+timestamp,
    'timestamp='+ticket,
    'url='+url
  ]
  var str = data.sort().join('&')
  return sha1(str)
}







module.exports = router