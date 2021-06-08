<template>
  <div>
    <el-carousel :interval="1000" type="card" height="200px">
      <el-carousel-item v-for="item in urls" :key="item">
        <!-- <h3 class="medium">{{ item }}</h3> -->
        <img :src="item" alt="" />
      </el-carousel-item>
    </el-carousel>
     </div>
</template>
<script>
export default {
  data() {
    return {
      flag:(new Date().getSeconds())%2?true:false,
      src:'./zhiduanqingchang.mp3',
      urls: [
        "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
        "https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg",
        "https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg",
        "https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg",
        "https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg",
        "https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg",
        "https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg",
      ],
    };
  },
  mounted(){
    let navbar=document.getElementsByClassName('navbar')[0]
    let a=document.getElementsByClassName('audio')
    console.log(a);
    a.length?navbar.removeChild(a[0]):''
    let audio=document.createElement('audio')
    audio.setAttribute('loop','loop')
    audio.setAttribute('class','audio')
    audio.setAttribute('autoplay','autoplay')
    audio.setAttribute('src',this.flag?require('./heniyiyang.mp3'):require('./zhiduanqingchang.mp3'))
    navbar.append(audio)
   this.snow()
  },
  methods:{
    snow(){
      let navbar=document.getElementsByClassName('navbar')[0]
      let div=document.createElement('div')
      div.className='snow-container'
      div.innerHTML=`<div class="snow foreground"></div>
    <div class="snow foreground layered"></div>
    <div class="snow middleground"></div>
    <div class="snow middleground layered"></div>
    <div class="snow background"></div>
    <div class="snow background layered"></div>`
      navbar.append(div)
      
      let sidebar=document.getElementsByClassName('sidebar')[0]
      let links=document.getElementsByClassName('links')[0]
      let page=document.getElementsByClassName('page')[0]
navbar.style.background=sidebar.style.background=links.style.background=page.style.background="#ccc"
    }
  }
};
</script>
<style>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.snow-container {
    position: absolute;
    height: calc(100vh);
    width: 100%;
    max-width: 100%;
    top: 0;
    overflow: hidden;
    z-index: 2;
    pointer-events: none;
}
.snow {
    display: block;
    position: absolute;
    z-index: 2;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    pointer-events: none;
    -webkit-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0);
    -webkit-animation: snow linear infinite;
    animation: snow linear infinite;
}
.snow.foreground {
    background-image: url("https://dl6rt3mwcjzxg.cloudfront.net/assets/snow/snow-large-075d267ecbc42e3564c8ed43516dd557.png");
    -webkit-animation-duration: 15s;
    animation-duration: 15s;
}
.snow.foreground.layered {
    -webkit-animation-delay: 7.5s;
    animation-delay: 7.5s;
}
.snow.middleground {
    background-image: url(https://dl6rt3mwcjzxg.cloudfront.net/assets/snow/snow-medium-0b8a5e0732315b68e1f54185be7a1ad9.png);
    -webkit-animation-duration: 20s;
    animation-duration: 20s;
}
.snow.middleground.layered {
    -webkit-animation-delay: 10s;
    animation-delay: 10s;
}
.snow.background {
    background-image: url(https://dl6rt3mwcjzxg.cloudfront.net/assets/snow/snow-small-1ecd03b1fce08c24e064ff8c0a72c519.png);
    -webkit-animation-duration: 25s;
    animation-duration: 25s;
}
.snow.background.layered {
    -webkit-animation-delay: 12.5s;
    animation-delay: 12.5s;
}
@-webkit-keyframes snow {
    0% {
        -webkit-transform: translate3d(0, -100%, 0);
        transform: translate3d(0, -100%, 0);
    }
    100% {
        -webkit-transform: translate3d(5%, 100%, 0);
        transform: translate3d(5%, 100%, 0);
    }
}
@keyframes snow {
    0% {
        -webkit-transform: translate3d(0, -100%, 0);
        transform: translate3d(0, -100%, 0);
    }
    100% {
        -webkit-transform: translate3d(5%, 100%, 0);
        transform: translate3d(5%, 100%, 0);
    }
}

</style>