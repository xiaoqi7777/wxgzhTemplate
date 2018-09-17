/**
  1、加密逻辑---验证
    意思:开启一个服务，微信给你发一个消息,截取Url里面的参数,进行加密校验,再给他返回一个东西即可
    url带signature,nonce,timestamp,echostr(全部在this.query对象里面)
    
    加密:
      对token,timestamp,nonce进行字典排序，转换成字符串，在进行加密
      和传入的signature 进行比较，返回echostr 即可
      var str = [token,timestamp,nonce].sort().join('')
      var sha = sha1(str)

      if(sha === signature){
        this.body = echostr
      }
  2、获取access_token(调用任何接口都需要，7200m)
    注意:每2个小时自动失效,需要重新获取   
         一旦更新了,之前的就不能用了
    存放票据:若没有数据库,可以用文件读写完成
    调取access_token 获取的接口,返回的是
    {
      access_token: '获取的access_token字符串'
      expires_in: 7200 //过期时间
    }
  3、获取的  access_token和expires_in 存取
    保存  将获取的 对象   转换成JSON 字符串
    取出  将取出的 字符串 转换成JSON 对象
  


  1、app.use(function *(next) {
    console.log(this.query)
  })
  this.query 获取url？后面的参数
  例子:http://localhost:1234/?sg=123&&name=31
  打印{ sg: '123', name: '31' }
  

  2、koa.use() 
    koa对中间键的要求是一个Generator函数
  
  3、module.exports = function(){}
    别的文件直接引用这个module.exports文件 就代表他后面等号的内容

  4、request发起请求
    let promise = require('bluebird')
    let request = promise.promisify(require('request'))
    用法,把request封装成promise   传入穿去{url:地址,json:true}}json获取时候的格式，也是默认的
    获取的数据:response.body
    request({url:url,json:true}).then(function(response){
        //获取 access_token 和 expires_in
      var data = response.body
     })

  5、var Wechat = require('./wechat')
     当一个文件被require进来的时候  就全局的代码就开始跑起来  
     例如有 console.log('123') 则在引入的时候 会被直接执行
 
 */