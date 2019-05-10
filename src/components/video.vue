<template>
  <div>
    <div  id="mse"  ></div>
  </div>
</template>

<script>
import  Player from 'xgplayer' 
  export default {
    mounted(){
      let player = new Player({
            id: "mse",
            url:'http://vjs.zencdn.net/v/oceans.mp4',
            width:window.innerWidth,
            height:window.innerWidth*(337.5/600),
            // 'x5-video-player-type': 'h5',
            playsinline:true,
            // webkit-playsinline="true" x-webkit-airplay="true" playsinline="true"
            // autoplay: true,
            // volume:0,
            // pip: true,
            // autoplayMuted:true
//rtsp://101.95.74.68:554/vod/00000000020008140777.mpg?userid=75720573&stbip=23.61.96.211&clienttype=1&mediaid=0000000003020014934402&ifcharge=1&time=20181114065947+00&life=172800&usersessionid=6455750&vcdnid=vcdn001&boid=001&srcboid=001&columnid=4603&backupagent=101.95.74.68:554&ctype=1&playtype=0&Drm=0&EpgId=epg_nj_001&programid=00000000020008140777&contname=&fathercont=&bp=0&authid=&tscnt=0&tstm=0&tsflow=0&ifpricereqsnd=1&stbid=0010029900D04940000180A1D7F3599D&nodelevel=3&usercharge=78CD2989AA406178A1CD599CCF531C6B
            

          });
    }
  }
</script>

<style scoped>

</style>