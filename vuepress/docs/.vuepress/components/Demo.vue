<template>
  <div>
      <div id="ball" @mousedown="move"></div>
  </div>
</template>

<script>
export default {
data(){
    return{
         positionX:0,
         positionY:0,
    }
},
methods: {
    move(e){
     let target=e.target;//获取拖拽的元素
     let x=e.clientX-target.offsetLeft;//鼠标距离左侧减去鼠标到当前元素的最左侧d得到当前定位元素距离左侧的距离
     let y=e.clientY-target.offsetTop;
     document.onmousemove=e=>{
         let left=e.clientX-x//实时计算鼠标位置并减去当时记录的位置
         let top=e.clientY-y
         if(left<0){
             left=0
         }
         if(top<0){
             top=0
         }
         if(top>window.innerHeight-200){
             top=window.innerHeight-200
         }
         if(left>window.innerWidth-200){
             left=window.innerWidth-200
         }
         this.positionX=top
         this.positionY=left
         
         target.style.left=left+'px'
         target.style.top=top+'px'
     }
     document.onmouseup=e=>{
          document.onmousemove = null;
          document.onmouseup = null;
     }
    }
}
}

</script>
<style>
 #ball{
     position: fixed;
     z-index: 200;
     top: 500px;
     left: 20px;
     width: 200px;
     height: 200px;
     line-height: 200px;
     text-align: center;
     cursor: pointer;
     background-image:linear-gradient(to right bottom, red, blue, yellow, green);
     border-radius: 50%;



 }
#ball::after{
    content: "可拖动";
    color: #fff
}

</style>