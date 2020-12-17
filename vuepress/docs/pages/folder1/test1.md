<ClientOnly>
  <Swipper/>
</ClientOnly>

## 使用插件
::: tip
CSS三角形產生器
http://apps.eky.hk/css-triangle-generator/zh-hant

LODOP浏览器打印插件
http://www.lodop.net
:::
## 时间格式化
```javascript
  function formatTime(date, format){

    if (typeof date == "number") {

      date = new Date(date);

      var o = {

        "y+":date.getFullYear,

        "M+": date.getMonth() + 1, //月份

        "d+": date.getDate(), //日

        "h+": date.getHours(), //小时

        "m+": date.getMinutes(), //分

        "s+": date.getSeconds(), //秒

        "q+": Math.floor((date.getMonth() + 3) / 3), //季度

        "S": date.getMilliseconds() //毫秒

      };

      var fmt = format || "yyyy-MM-dd hh:mm:ss";

      if (/(y+)/.test(fmt))

        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));

      for (var k in o)

        if (new RegExp("(" + k + ")").test(fmt))

          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));

      return fmt;

    } else {

      return date;

    }

  }

  console.log(formatTime(Date.now(),'yyyy'))//2019

  console.log(formatTime(Date.now(),'yyyy-MM-dd'))//2019-11-26

  console.log(formatTime(Date.now(),'yyyy-MM'))//2019-11

  console.log(formatTime(Date.now()))//2019-11-26 12:00:10
```
## ES6
### promise
::: tip
> 1、主要用于异步计算

> 2、可以将异步操作队列化，按照期望的顺序执行，返回符合预期的结果

> 3、常用于封装ajax时使用的回调
:::

```javascript
//单个promise请求
let p=new Promise((resolve, reject)=>{
    let xhr=new XMLHttpRequest() //创建ajax对象
xhr.open('get','www.baidu.com/getList',false)//打开路径方式同异步
xhr.onreadystatechange=()=>{ // 监测ajax状态
    if(xhr.status==200&&xhr.readyState==4){ //状态值正确执行resolve函数
        resolve(xhr)
    }else{//否中抛出错误
        reject(xhr)
    }
}
xhr.send(params)//params参数

})
p.then(res=>{
    console.log(res)//处理接收数据
})
p.catch(err=>{
    console.log(err)//抛出错误信息
})

```
### 多个promise并发请求
```javascript
let p1 = new Promise((resolve, reject) => {
  resolve('成功了')
})
let p2 = new Promise((resolve, reject) => {
  resolve('success')
})
let p3 = Promse.reject('失败')
Promise.all([p1, p2]).then((result) => {
  console.log(result)               //['成功了', 'success']
}).catch((error) => {
  console.log(error)
})
Promise.all([p1,p3,p2]).then((res) => {
  console.log(res)     //有一个失败就是失败
}).catch((err) => {
  console.log(err)      // 失败了，打出 '失败'
})
```
### Set
> *Set*是ES6中新增的类型，和数组类似，唯一不同在于该类型不会有重复的数据，一般常用来对数据进行去重操作
```javascript
//一、声明
let set = new Set();//即创建了一个空的set
//二、赋值
let set1 = new Set(['五道杠','六道杠','七道杠','王小布']);
console.log(set1)//set对象集合{'五道杠','六道杠','七道杠','王小布'}
let set2 = new Set(['五道杠','六道杠','七道杠','王小布','五道杠','六道杠','七道杠','王小布']
console.log(set2)//set对象集合{'五道杠','六道杠','七道杠','王小布'}去重作用
//三、属性
let set=new Set(['王小布'])
////add增加一个元素到set集合
set.add('五道杠')
console.log(set)//{'王小布','五道杠'}
///has判断某个元素是否在set这个集合中
set.has('六道杠')//false
set.has('五道杠')//true
///delete删除一个元素，返回的结果为true或者false
set.delete('王小布')
console.log(set)//{'五道杠'}
///clear清除集合中所有的元素。没有任何返回值。直接清除元素
set.clear()//////

```

### Map

```javascript
//初始化map对象
let map=new Map()
///set对map对象增加key-value
map.set('name','五道杠')
map.set('age',19)
///has查找map对象key是否在对象中
map.has('name')//truORfalse
///get获取map对象对用的value
map.get('name')//五道杠或undefined
///delete删除map对应的key-value
map.delete('name') //删除成功返回true


```
## select下拉选择框

> enenen最近接手个angular项目，里面涉及到使用select下拉选择加模糊搜索。奈何没有引入正常的bootstrap-select插件，更没有像element-ui如此简单加个'filter'就搞定，无奈之举写了个原生js搭配ul来模拟，别怪我。没招儿啊
> 废话不多，上代码。实现基本功能
```js
<!DOCTYPE html>
<html>
<head>
  <meta charset='utf-8'>
  <title></title>
  <style>
    div {
      margin-left: 200px;
      margin-top: 200px;
    }

    li {
      list-style: none;
      cursor: pointer;
    }

    #ul {
      display: none;
      width: 150px;
      height: 200px;
      background: #ccc;
      overflow: auto;
      padding-left: 10px;
      margin: 0;
    }

    #ul li:hover {
      background: red;
    }

    #input {
      width: 150px;
    }
  </style>
</head>
<body>
  <div>
    <input type="text" id="input" input='' autocomplete="off">
    <button id='btn'>发送</button>
    <ul id='ul'>
    </ul>
  </div>
</body>
<script>
  let str = '智这些数据就是为了叫他们拼凑用的，谁闲着没事写一大堆东西玩啊'
  let list = []
  let valueObj = {
    value: '',
    id: ''
  }
  function math() {//随机取值
    let n = Math.round(Math.random() * 25)
    return str[n]
  }
  for (let i = 0; i < 200; i++) {
    list.push({
      id: i + 13,
      name: math() + math() + math() + math() + math() + i + math()
    })
  }
  ///一下是正常操作
  let list2 = JSON.parse(JSON.stringify(list))
  let input = document.getElementById('input')
  let ul = document.getElementById('ul')
  function query(list) { // 给ul下拉框拼接
    for (let i = 0; i < list.length; i++) {
      let cur = list[i]
      let li = document.createElement('li')
      li.innerText = cur.name
      li.setAttribute('flagId', cur.id)
      ul.appendChild(li)
    }
    let lis = ul.getElementsByTagName('li')
    for (let i = 0; i < lis.length; i++) {
      let cur = lis[i]
      cur.onclick = function (e) {
        valueObj.id = e.target.getAttribute('flagId')
        input.value = valueObj.value = e.target.innerText//获取点击值
      }
    }
  }
  query(list)
  input.addEventListener('blur', () => { //失去焦点
    setTimeout(() => { // 选中li时会触发，做一个异步关闭
      ul.style.display = 'none'
    }, 200);

  }, false)
  input.addEventListener('focus', () => { //获取焦点
    ul.style.display = 'block'
  }, false)
  input.addEventListener('input', (e) => { //输入框值改变
    let list3 = list2.filter(item => {
      return item.name.includes(input.value)
    })
    if (!input.value) {//清空的话把原值赋值上去
      list3 = JSON.parse(JSON.stringify(list2))
      valueObj.value = ''
      valueObj.id = ''
    }
    ul.innerHTML = ''
    query(list3)
  }, false)
  let btn = document.getElementById('btn')
  btn.addEventListener('click', () => {
    if (!valueObj.value) {
      alert('选中值啊你倒是')
      return
    }
    let val = '选中的是' + valueObj.value + ';id是' + valueObj.id
    alert(val)
  })
</script>
</html>
```

## 字符串.数组.节点.DOM.Date的方法
### 常用的数组的操作方法
|方法|作用|参数|返回值|原有数组的变化
|-----|-----|-----|-----|-----|
|push|数组末尾增加一项|新增项|新增后的数组|发生改变|
|pop|删除数组最后一项|无|删除项|发生改变|
|unshift|数组开头增加一项|新增项|新增后的数组|发生改变|
|shift|删除数组第一项|无|删除项|发生改变|
|slice|数组截取|slice(m,n)索引m截取到n(不包含n)|数组返回值|不发生改变|
|：|：|slice(m)从索引m开始，截取到末尾|：|不发生改变|
|：|：|slice()从索引0开始，截取到末尾|：|不发生改变|
|:|:|slice(m,-n)从索引m开始，截取arr.length-n索引处|:|不发生改变|
|spice|删除数组的某些项|spice(m,n)索引m开始shanchun个|删除项|发生改变|
|：|：|splice(m)索引m删除到末尾|：|发生改变|
|：|：|splice()索引0删除到末尾|：|发生改变|
|：|：|splice(m,n,x)索引m删除n个，把x放进去|：|发生改变|
|sort|数组排序|按照大小排序(只可以排10以内)|排序后的数组|发生改变|
|：|：|sort((a,b)=>a-b)(0-9)|排序后的数组|发生改变|
|：|：|sort((a,b)=>b-a)(9-0)|排序后的数组|发生改变|
|reverse|数组颠倒|不需要(arr.reverse())|颠倒后的数组|发生改变|
|concat|数组拼接|不传参，数组克隆|拼接后的数组|不发生改变|
|:|:|arr.concat(arr1,arr2)|:|:|
|join|按照特定字符生成字符串|不传参，按照,分开|字符串|不发生改变|
|：|：|传参，按照参数分开|：|：|
|indexOf|检测第一次出位置|需要|第一次索引or-1|不发生改变|
|lastIndexOf|检测最后一次出位置|需要|最后一次索引or-1|不发生改变|
|map|遍历，映射|参数为回调函数|映射之后的数组|不发生变化|
|forEach|遍历|参数为回调函数|没有返回值|不发生变化|
|toString|转字符串|不传参|返回去了[]的字符|不发生改变|

### 字符串常用的操作方法
|方法|参数|定义|
|-----|------|-----|
|substr|str.substr(m,n)|索引m截取n个|
|substring(m,n)|str.substring(m,n)|索引m截取到索引n(不含n),n是负数往前截取|
|slice|str.slice(m,n)|索引m开始，截取到索引n，支持负数|
|indexOf|str.indexOf('a')|第一次出现的位置or-1|
|lastIndexOf|str.lastIndexOf('a')|最后一次出现的位置or-1|
|split|str.split(',')|字符串按照字符串里面的特定字符分割成数组每一项|
|repalce|str.repalce(old,new)|替换|
|concat|str.concat('a')|拼接|
|trim-left/right|str.trim()|去除左右两边的空格|

### Date
::: tip
let time=new Date()
:::
|--|属性|取值范围|
|------|------|------|
|time.getFullYear()|年||
|time.getMouth()|月|0-11|
|time.getDate()|日|1-31|
|time.getDay()|星期|0-6|
|time.getHover()|小时|0-23|
|time.getMintes()|分钟|0-59|
|time.getSeconds()|秒|0-59|
|time.getMilliseconds()|毫秒|0-999|

### Math
|||
|---|---|
|Math.floor()|向下取整|
|Math.ceil()|向上取整|
|Math.max()|取最大值|
|Math.min()|取最小值|
|Math.round()|四舍五入到整数|
|Math.random()|0-1随机小数|
|Math.floor|向下取整|
Math.round(Math.random()*(100-60)+60) 获取60以内随机数字

### DOM操作
|//|//|
|-----|-----|
|createElement|创建元素|
|appendChild|父元素末尾添加节点|
|removeChild|删除子节点|
|replaceChild|替换节点|
|insertBefore|把元素节点插入到某个节点的前面|
|set/get/remove/ Attribute| 设置/获取/删除自定义属性|
|add()| 增加class属性|
|remove()| 移除class属性|
|rrplace(old,new)| 替换class属性|
![](/egg.png)

### 节点的属性（不含IE8）
|方法|含义|
|---|---|
|childNodes|获取当前元素的所有子节点|
|children|获取当前元素的子元素节点|
|firstChild|获取第一个子节点|
|firstElementChild|获取第一个子元素节点|
|lastChild|获取最后一个子节点|
|lastElementChild|获取最后一个子元素节点|
|previousSibling|获取上一个哥哥节点|
|previousElementSibling|获取上一个哥哥元素节点|
|nextSibling|获取下一个弟弟节点|
|nextElementSibling|获取下一个弟弟元素节点|
|parentNode|获取当前元素父亲节点|

## es6新增数组方法及VUE使用 
 #### filter过滤：把符合条件的过滤出来，原有数组不发生改变
```js
let arr=[100,200,300,400]
let newArr=arr.filter((item,index)=>{
    return item>100
})
console.log(newArr) //[200,300,400]
console.log(arr) //[100,200,300,400]
```
#### find查找；从左到右进行查找，找到符合条件的第一项返回出来
```js
let arr=[100,200,300,400]
let newArr=arr.find((item,index)=>{
    return item>100
})
console.log(newArr) //200
```

#### some:返回布尔，有符合返回true，全部不符合返回false
```js
let arr = [34,80,56,101];
let a = arr.some((item,index)=>{
return item>80;
});
console.log(a);//true
```

#### every:返回布尔，必须都是true，否则是false
```js
let arr = [34,80,56,101];
let t = arr.every((item,index)=>{
return item>34;
})
console.log(t);//false
```
#### includes:包含，是否包含某一项
```js
let arr = [34,80,56,101];
console.log(arr.includes(81));//false
```

#### reduce收敛，求和；
```js
let arr = [34,80,56,101,999];
let yy = arr.reduce((prev,next)=>{
// prev : 输出上一次回调函数的返回值；【第一次除外】
console.log(prev,next);
34 80
114 56
170 101
271 999
return prev+next;
},0);
console.log(yy);//1270
```

## 原型链

![](/proto.png)
