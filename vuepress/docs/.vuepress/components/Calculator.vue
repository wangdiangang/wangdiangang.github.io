<template>
      <div id='calculator'>
      <input type="text" v-model='value'>
      <ul id='ul'>
        <li>(</li>
        <li>)</li>
        <li>%</li>
        <li>C</li>
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li @click="add()">+</li>
        <li>4</li>
        <li>5</li>
        <li>6</li>
        <li @click='reduce()'>-</li>
        <li>7</li>
        <li>8</li>
        <li>9</li>
        <li @click='ride()'>×</li>
        <li>0</li>
        <li>.</li>
        <li @click="equal">=</li>
        <li @click="except()">÷</li>
      </ul>
      <div class='ps'>PS:加减乘除只能运算一次</div>
    </div>
</template>

<script>
export default {
data: function() {
        return { 
          value:0,
          flagValue1:0,
          flagValue2:0,
          requ:''
        }
      },
      methods:{
        add(){//+
            this.flagValue1=Number(this.value)
            this.value=''
            this.requ='+'
        },
        reduce(){//-
          this.flagValue1=Number(this.value)
          this.value=''
          this.requ='-'
        },
        ride(){//*
          this.flagValue1=Number(this.value)
          this.value=''
          this.requ='*'
        },
        except(){//   /
          this.flagValue1=Number(this.value)
          this.value=''
          this.requ='/'
        },
        equal(){//=
              if(this.requ=='+'){
              this.value=Number(this.flagValue1)+Number(this.value)
              }
              if(this.requ=='-'){
              this.value=Number(this.flagValue1)-Number(this.value)
              }
              if(this.requ=='*'){
              this.value=Number(this.flagValue1)*Number(this.value)
              }
              if(this.requ=='/'){
              this.value=Number(this.flagValue1)/Number(this.value)
              }
              if(this.value=='Infinity'){
             this.value='错误'
              }
        }
      },
      mounted(){
        let calculatorId=document.getElementById('calculator')
        let lis=calculator.getElementsByTagName('li')
        for (let i = 0; i < lis.length; i++) {
        let cur = lis[i]
        cur.onclick=(e)=>{
           let val=e.target.innerText
           if(this.value==0){
             this.value=''
           }
           if(val=="C"){
             this.value=this.flagValue1=0;
             this.requ=''
             return
           }
           if(val=='×'||val=='÷'||val=='+'||val=="-"||val=="="||val=="%"||val=="("||val==")"){
             return 
           }
          this.value=this.value+val
        }
        }
      }
}

</script>
<style>
  #calculator{
    width: 500px;
    border: 1px solid #ccc;
    padding: 20px;
    margin: 20px;
  }
#calculator ul{
  list-style: none;
}
#calculator li{
  display: inline-block;
  width: 100px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  background-color: #F9F9F9;
  font-size: 20px;
  cursor: pointer;
  margin: 2px;
}
#calculator li:active{
  background-color: #ccc;
}
#calculator input{
    width: 400px;
    display: inline-block;
    height: 30px;
    margin-left: 50px;
    background: #ccc;
    font-size: 20px;
    color: #fff;
}
#calculator .ps{
  margin-left: 50px;
    color: red;
    font-size: 30px;
}
</style>