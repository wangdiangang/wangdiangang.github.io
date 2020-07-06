<template>
  <div id="img">
    <h1 class="h1">{{timer}}</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      timer: ""
    };
  },
  methods: {
    nowTime() {
      var nowDate = new Date();
      var nowHouer =
        nowDate.getHours() >= 10
          ? nowDate.getHours()
          : "0" + nowDate.getHours();
      var nowMinu =
        nowDate.getMinutes() >= 10
          ? nowDate.getMinutes()
          : "0" + nowDate.getMinutes();
      var nowSec =
        nowDate.getSeconds() >= 10
          ? nowDate.getSeconds()
          : "0" + nowDate.getSeconds();
          return nowHouer+':'+nowMinu+':'+nowSec
    }
  },
  mounted(){
     setInterval(() => {
       this.timer=this.nowTime() 
     }, 1000);
  }
};
</script>
<style scope>
#img {
  position: relative;
  height: 700px;
  width: 150%;
  margin-left: -200px;
  background: url(../public/photo.jpg) no-repeat;
}

.h1 {
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -250px;
  font-size: 1050%;
  margin-top: -200px;
  color: #fff;
}
</style>