<template>
  <div>
      <div class="div" @click="startyin">开启录音</div>
        <br/>
      <div class="div" @click="stopyin">停止录音</div>
        <br/>
      <div class="div" @click="playyin">播放</div>
        <br/>
      <input type="text" v-model="input">
      <div class="div" @click="scanPay">扫码支付</div>
      <div class="div" @click="commonPay">普通支付</div>

      <img :src="base64" alt="" srcset="">
  </div>
</template>

<script>
export default {
  props:['openId'],
  data() {
    return {
      localId: null,
      base64:null,
      input:0,
      obj:null  
    };
  },
  methods: {

    scanPay(){
      if(this.input === 0){
        alert('请输入金额')
      }
      this.axio.post('/wx/scanPay',{money:this.input})
      .then(data=>{
        this.base64 = data.data
        console.log('++++++++',data)
      }) 
    },
    startyin() {
      wx.startRecord();
    },
    stopyin() {
      wx.stopRecord({
        success: res => {
          this.localId = res.localId;
          alert(this.localId);
        }
      });
    },
    playyin() {
      wx.playVoice({
        localId: this.localId // 需要播放的音频的本地ID，由stopRecord接口获得
      });
    },
    onBridgeReady(data){
        console.log('请求的数据',data)
        WeixinJSBridge.invoke(
            'getBrandWCPayRequest', {
              "appId":data.appId,     //公众号名称，由商户传入     
              "timeStamp":data.timeStamp,         //时间戳，自1970年以来的秒数     
              "nonceStr":data.nonceStr, //随机串     
              "package":`prepay_id=${data.package}`,     
              "signType":"MD5",         //微信签名方式：     
              "paySign":data.paySign //微信签名 
            },
            function(res){
            if(res.err_msg == "get_brand_wcpay_request:ok" ){
            // 使用以上方式判断前端返回,微信团队郑重提示：
                  //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
            } 
        }); 
      },
    async commonPay() {
      let data = await this.axio.post('/wx/commonPay',{money:this.input})
      this.obj = data.data
      this.onBridgeReady(this.obj)

      // wx.chooseWXPay({
      //     timeStamp: this.obj.timeStamp, //时间戳，自1970年以来的秒数
      //     nonceStr:this.obj.nonceStr, //随机串
      //     package: `prepay_id=${this.obj.package}`,
      //     signType: this.obj.signType, //微信签名方式：
      //     paySign: this.obj.paySign //微信签名
      //   },
      //   function(res) {
      //     console.log('---------',res)
      //     if (res.err_msg == "get_brand_wcpay_request:ok") {
      //       console.log('支付成功~~~~~~~~~~')
      //       // 使用以上方式判断前端返回,微信团队郑重提示：
      //       //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
      //     }
      //   }
      // );
    }
  }
};
</script>

<style scoped>
.div {
  height: 50px;
  width: 100px;
  border: 2px solid rebeccapurple;
}
</style>