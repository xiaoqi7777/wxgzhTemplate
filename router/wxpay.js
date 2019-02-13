const Router = require('koa-router')
const router = new Router();
const moment = require('moment');
//产生随机数
const randomstring = require('randomstring');
const sha1 = require('sha1')

const wx = require('../wx')

let appId = "wx3df629936bf31f75"
let nonce_str = randomstring.generate(32) // 随机字符串
let time_stamp = moment().unix().toString() //时间戳

router.get('/sdk', async (ctx, next) => {
    // let url = ctx.href
    let url = 'http://tsml520.cn/'
    let sdkToken = await wx.sdkToken()
    let rs = sign(nonce_str,time_stamp,sdkToken, url)
    ctx.body =  rs
})

function sign(noncestr,timestamp,ticket, url) {
    console.log("noncestr",noncestr)
    console.log("timestamp",timestamp)
    console.log("ticket", ticket)
    console.log("url",url)
    var data = [
        'noncestr=' + noncestr,
        'jsapi_ticket=' + ticket,
        'timestamp=' + timestamp,
        'url=' + url
    ]
    var str = data.sort().join('&')
    console.log('str',str)
    var signature = sha1(str)
    console.log('signature',signature)
    return {
        noncestr: noncestr,
        timestamp: timestamp,
        signature: signature
    }
}
let s = 'jsapi_ticket=HoagFKDcsGMVCIY2vOjf9q19Q9D1hjn9EBB55Jjb0eCxGYhmpouJ0Hy85FgElp0YOzC2PvDlirwx4izhpjRWEA&noncestr=LZ1YZkY2t0HcybesOzNMsupC6mbAFUC3&timestamp=1549547358&url=http://tsml520.cn/#/'
let a = 'jsapi_ticket=HoagFKDcsGMVCIY2vOjf9q19Q9D1hjn9EBB55Jjb0eCxGYhmpouJ0Hy85FgElp0YOzC2PvDlirwx4izhpjRWEA&noncestr=LZ1YZkY2t0HcybesOzNMsupC6mbAFUC3&timestamp=1549547358&url=http://tsml520.cn/'

module.exports = router