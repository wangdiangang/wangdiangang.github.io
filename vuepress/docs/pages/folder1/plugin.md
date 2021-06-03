## better-scroll
better-scroll 是一款重点解决移动端（已支持 PC）各种滚动场景需求的插件。

> better-scroll 是基于原生 JS 实现的，不依赖任何框架。它编译后的代码大小是 63kb，压缩后是 35kb，zip 后仅有9kb，是一款非常轻量的 JS > lib。
### 怎么使用 better-scroll
``` html
 <div class="wrapper">
    <ul class="content">
      <li>...</li>
      <li>...</li>
      ...
    </ul>
  </div>
```
>   以上代码better-scroll 是作用在外层 wrapper 容器上的，滚动的部分是 content 元素。


```JavaScript
//下载
npm/cnpm install better-scroll --save
// 实例化
> var BS = new BScroll('.wrapper');
```
:::tip

better-scroll 只处理容器（wrapper）的第一个子元素（content）的滚动，其它的元素都会被忽略。
外盒子设置固定宽或高和属性：overflow: hidden;
:::

-------------------

### 滚动原理
![](/content.png)
```
当 content的高度不超过父容器的高度，是不能滚动的，而它一旦超过了父容器的高度，我们就可以滚动了，这就是 better-scroll 的滚动原理。
红色部分为 wrapper，也就是父容器，它会有固定的高度
黄色部分为 content，它是父容器的第一个子元素，它的高度会随着内容的大小而撑高。
better-scroll 支持很多参数配置，可以在初始化的时候传入第二个参数。
```
```js
let scroll = new BScroll('.wrapper',{
       scrollY: true,
       click: true
   })
//    这样就实现了一个纵向可点击的滚动效果。better-scroll 支持的参数非常多，可以修改它们去实现更多的特性。通常你可以不改这些参数
```
### API

api 里面所有的方法和属性都是实例化对象的。

on （方法）
::: tip
on(type,fn,context)
:::

参数：
```
type：事件名
fn：回调函数
context：函数执行的上下文环境，默认是this
返回值：无
作用：监听当前实例上的自定义事件。如：scroll，scrollEnd，pullingUp,pullingDown等
```


### 使用方法

```vue
 <div class="wrapper" ref="wrapper">
      <ul class="content">
        <li v-for="i in 200" :key="i">哈哈哈哈{{ i }}</li>
      </ul>
    </div>
```
```js
export default {
  data() {
    return {
      bs: null,
    };
  },
  mounted(){
        this.bs = new BScroll(this.$refs.wrapper, {
        scrollY: true,
        movable: true,
        zoom: true,
        probeType: 3,
      });
      this.bs.on("scrollStart", (pos) => {
        console.log("scrollStart-",pos);
      });
      this.bs.on("scroll", ({ y }) => {
        console.log("scrolling-滚动实时位置",y);
      });
      this.bs.on("scrollEnd", (pos) => {
        console.log('结束位置',pos);
      });
  }
}
```
::: tip
独自漫步在星河夜空中

回首永远不曾停留的光年

怀念我们一起走过的日子

光年载着年华驰骋行空

像穿越千年的光芒

在遥远的天宇星辰中

我寻到了一个天蝎星座
:::