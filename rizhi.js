/**
  1、加密逻辑
    意思:开启一个服务，微信给你发一个消息,截取Url里面的参数,进行加密校验,再给他返回一个东西即可
    url带signature,nonce,timestamp,ecostr(全部在this.query对象里面)
    
    加密:
      对token,timestamp,nonce进行字典排序，转换成字符串，在进行加密
      和传入的signature 进行比较，返回ecostr 即可
      var str = [token,timestamp,nonce].sort().join('')
      var sha = sha1(str)

      if(sha === signature){
        this.body = ecostr
      }

  


  2、app.use(function *(next) {
    console.log(this.query)
  })
  this.query 获取url？后面的参数
  例子:http://localhost:1234/?sg=123&&name=31
  打印{ sg: '123', name: '31' }
  
 */