<template>
  <div id="app">
    <router-view :openId='openId'/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return{
      openId:null
    }
  },
  methods:{
    getSDK(){
      let str = location.href;
      console.log('fasong*------',str)
      this.axio.get(`wx/sdk?url=${str}`).then(data => {
        let res = data.data;
        console.log("signature", res);
        wx.config({
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: 'wx3df629936bf31f75', // 必填，公众号的唯一标识
          timestamp: res.timestamp, // 必填，生成签名的时间戳
          nonceStr: res.noncestr, // 必填，生成签名的随机串
          signature: res.signature, // 必填，签名
          jsApiList: [
            "startRecord",
            "stopRecord",
            "onVoiceRecordEnd",
            "translateVoice",
            "playVoice",
            "pauseVoice",
            "stopVoice",
            "uploadVoice",
            "chooseImage",
            "previewImage",
            "downloadVoice",
            "chooseWXPay",
          ] // 必填，需要使用的JS接口列表
        });
        wx.ready(function() {
          wx.checkJsApi({
            jsApiList: [
              "startRecord",
              "stopRecord",
              "playVoice",
              "chooseWXPay"
            ], // 需要检测的JS接口列表，所有JS接口列表见附录2,
            success: function(res) {
              console.log("成功获取res", res);
            }
          });
        });
        wx.error(function(res) {
          console.log("失败", res);
        });
      });
    },
    //跳鉴权
    oAuth(){
      location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx3df629936bf31f75&redirect_uri=http://tsml520.cn/&response_type=code&scope=snsapi_userinfo&state=STATEsg#wechat_redirect`
    },
    getOpenID(){
      this.axio.get(`/wx/getOpenId?code=${this.code}`)
        .then(data=>{
          this.openId = data.data
          console.log('获取openId',data)
        })
    },
    isSubscribe(){
      let str = location.href;
      console.log(!str.includes('code='))
      if(!str.includes('code=')){
        this.oAuth()
      }else{
        //截取code 发送给后端
        let start = str.indexOf("code=") + 5;
        let end = str.indexOf("&state");
        this.code = str.slice(start, end);
        console.log('this.code',this.code)
        this.getSDK()
        this.getOpenID()
      }
    }
  },
  mounted() {
    this.isSubscribe()

  },
}
</script>

<style>

</style>
