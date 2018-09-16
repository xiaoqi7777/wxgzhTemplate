
var sha1 = require('sha1')


module.exports = function(){
  return function *(next) {
    console.log('.',this.query)
    let token = config.token
    let signature = this.query.signature
    let nonce = this.query.nonce
    let timestamp = this.query.timestamp
    let ecostr = this.query.ecostr
  
    var str = [token,timestamp,nonce].sort().join('')
    var sha = sha1(str)
  
    if(sha === signature){
      this.body = ecostr
    }else{
      this.body = 'wrong---'
    }
  }

}
