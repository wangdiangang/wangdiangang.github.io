<template>
  <div id="date" v-loading="loading">
    <div v-html="endDates"></div>
    <h2>函数防抖与节流</h2>
    <h4>函数的防抖(非立即执行)👇</h4>
    <div class="content" @mousemove="debounce">防抖{{num}}</div>
    <input type="text" v-model="time" style="width:25px" />秒执行一次
    <div style="width:100%;border:1px solid #ccc;margin-top:20px"></div>
    <h4>函数的防抖(立即执行)👇(执行一次n秒后再执行)</h4>
    <div class="content" @mousemove="debounce2">防抖{{num2}}</div>
    <input type="text" v-model="time2" style="width:25px" />执行一次n
    <h4>函数的节流👇(一定时间只执行一次)</h4>
    <div class="content" @mousemove="throttle">节流{{num3}}</div>
    <input type="text" v-model="time3" style="width:25px" />执行一次n
    <div>
      {{num}}
      <button @click="num+=2">加2</button>
      <button @click="num-=2">减2</button>
      <el-button @click="changeLoading">loading</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      num: 0,
      endDates: "",
      num: 0,
      num2: 0,
      num3: 0,
      previous: 0,
      timer: "", //接收定时器
      timer2: "",
      time: 1,
      time2: 1,
      time3: 1,
      loading:false
    };
  },
  methods: {
    changeLoading(){
      this.loading=true
      setTimeout(()=>{
        this.loading=false
      },2000)
    },
    debounce() {
      // 防抖，非立即执行，n秒后执行一次
      if (this.time > 5 || isNaN(this.time) || this.time <= 0) {
        this.time = 1;
        alert("输入有效数字并且在0-5之间");
      }
      if (this.timer) clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.num++;
      }, this.time * 1000);
    },
    debounce2() {
      // 防抖，立即执行，执行一次n秒后再执行
      if (this.time2 > 5 || isNaN(this.time2) || this.time2 <= 0) {
        this.time2 = 1;
        alert("输入有效数字并且在0-5之间");
      }
      if (this.timer2) clearTimeout(this.timer2);
      let callNow = !this.timer2;
      this.timer2 = setTimeout(() => {
        this.timer2 = null;
      }, this.time2 * 1000);

      if (callNow) {
        this.num2++;
      }
    },
    throttle() {
      //节流，一定之间执行一次
      if (this.time3 > 5 || isNaN(this.time3) || this.time3 <= 0) {
        this.time3 = 1;
        alert("输入有效数字并且在0-5之间");
      }
      let now = Date.now();
      if (now - this.previous > this.time3 * 1000) {
        this.num3++;
        this.previous = now;
      }
    },
    countDown() {
      //倒计时
      var endDate = new Date("2021-02-12 00:00:00");
      //当前时间
      var nowDate = new Date();
      //相差的总秒数
      var totalSeconds = parseInt((endDate - nowDate) / 1000);
      //天数
      var days = Math.floor(totalSeconds / (60 * 60 * 24));
      //取模（余数）
      var modulo = totalSeconds % (60 * 60 * 24);
      //小时数
      var hours = Math.floor(modulo / (60 * 60));
      modulo = modulo % (60 * 60);
      //分钟
      var minutes = Math.floor(modulo / 60);
      //秒
      var seconds = modulo % 60;
      var nowYear = nowDate.getFullYear();
      var nowMouth =
        nowDate.getMonth() + 1 >= 10
          ? nowDate.getMonth() + 1
          : "0" + (nowDate.getMonth() + 1 + 1);
      var nowDay =
        nowDate.getDate() >= 10 ? nowDate.getDate() : "0" + nowDate.getDate();
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
      var nowMouth =
        nowDate.getMonth() + 1 >= 10
          ? nowDate.getMonth() + 1
          : "0" + (nowDate.getMonth() + 1 + 1);
      return (
        "现在是:<span class='days date'>" +
        nowYear +
        "年" +
        nowMouth +
        "月" +
        nowDay +
        "日  " +
        nowHouer +
        ":" +
        nowMinu +
        ":" +
        nowSec +
        "</span></br>" +
        "距离新年还剩:<span class='days date'>" +
        (days < 10 ? "0" + days : days) +
        "</span>天<span class='hours date'>" +
        (hours < 10 ? "0" + hours : hours) +
        "</span>小时<span class='min date'>" +
        (minutes < 10 ? "0" + minutes : minutes) +
        "</span>分<span class='sec date'>" +
        (seconds < 10 ? "0" + seconds : seconds) +
        "</span>秒"
      );
    }
  },
  mounted() {
    setInterval(() => {
      this.endDates = this.countDown();
    }, 1000);
    this.endDates = this.countDown();
  }
};
</script>


<style>
.color {
  color: #f8a100;
}
#date .date {
  margin: 0 10px;
  font-size: 24px;
  color: red;
}
.content {
  height: 150px;
  line-height: 150px;
  text-align: center;
  color: #fff;
  background-image:linear-gradient(to right bottom, red, blue, yellow, green);
  font-size: 80px;
}
</style>


