## vue+element-ui遇到的问题
![](/ele-table.png)
> **如图：** 新增多行时进行保存操作验证，对prop进行动态绑定。需要
在tabledate标签外侧嵌套一层form标签进行校验。
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <link rel="stylesheet" href="https://unpkg.com/element-ui/lib/theme-chalk/index.css">
  <script src="https://unpkg.com/vue/dist/vue.js"></script>
  <script src="https://unpkg.com/element-ui/lib/index.js"></script>
</head>
<body>
  <div id="app">
        <el-form :model="model" ref="model" inline >
        <el-table
        :data="model.tableData"
        style="width: 100%">
        <el-table-column
          prop="date"
          label="日期"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="280">
          <template slot-scope="scope">
              <span v-if="scope.row.flag">{{scope.row.name}}</span>
              <el-form-item label=" "
              v-else
              :prop="`tableData.${scope.$index}.name`"
              :rules="rules.name">
              <el-input placeholder="请输入类别名称" v-model="scope.row.name"></el-input>
              </el-form-item>
          </template>
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址">
        </el-table-column>
      </el-table>
    </el-form>
 <el-button type="primary" @click="add">增加</el-button>
 <el-button type="primary" @click="save">保存</el-button>
  </div>
</body>
  <script>
    new Vue({
      el: '#app',
      data() {
        return { 
            model:{
             tableData: [],
            },
            rules:{
            name: [{ required: true, message: "这个还没输入，不能保存", trigger: "blur" }]
          }
         }
      },
      created(){
        for (let i = 0; i < 6; i++) {
    this.model.tableData.push({
        name:'张'+i,
        date:"2019-09-0"+i,
        address:'朝阳区潮驿178--'+((i+3)*2)+'层',
        flag:true
    })
        }
      },
      methods:{
          add(){
          console.log('增加');
          let obj={
              name:'',
              date:'2019-11-30',
              address:'北京潮驿178',
              flag:false
          }
          this.model.tableData.push(obj)
          },
          save(){
              console.log('保存');
              this.$refs["model"].validate(valid => {
                  console.log(valid);
                  
              })
          }
      }
    })
  </script>
</html>

```



## 谷歌设置跨域的浏览器
### window
> **跨域**：协议.域名.端口号三个有其一不同及涉及到跨域问题，跨域是浏览器的安全机制，可以把浏览器配置可跨域访问的浏览器即可解决大部分需求 

>1.找到桌面的谷歌浏览器快捷方式（一定是快捷方式，没有的话就找到安装目录发到桌面一个）右键属性.如下👇
![](/google.png)


> 在 **版本号49之前chrome** 目标一栏里  加入  --disable-web-security **or**  --args --disable-web-security --user-data-dir  
> 在 **版本号49之后chrome** 
> 
> 1.在电脑上新建一个目录，例如：C:\MyChromeDevUserData
> 
> 2.在属性页面中的目标输入框里加上   --disable-web-security --user-data-dir=C:\MyChromeDevUserData，--user-data-dir的值就是刚才新建的目录。
> 
> 3.点击应用和确定后关闭属性页面，并打开chrome浏览器。
> 再次打开chrome，发现有“--disable-web-security”相关的提示，说明chrome又能正常跨域工作了。
> 
> （注意：--前面是有空格的！不加空格会报错！！）
> 
> 再次打开浏览器，出现提示“你使用的是不受支持的命令标记 --disable-web-security”，那么说明配置成功。
### MAC
> mac苹果系统的chrome浏览器就尴尬了，，，，，
```javascript
open -n /Applications/Google\ Chrome.app/ --args --disable-web-security  --user-data-dir=/Users/LeoLee/Documents/MyChromeDevUserData 
   ⬆打开              ⬆浏览器文件路径                          ⬆跨域                       ⬆跨域后浏览信息存储位置////自己定义
```
> 每次打开跨域浏览器都要这样打开   很麻烦。。。。。找运维写个shell脚本。
> 
> 
> **微信开发助手也可以通过这种方式进行跨域设置**


## 前端插件xlsx对excel的导出功能
> table表格导出功能可以使用xlsx插件进行不依赖后端的导出功能
```javascript
  vue项目
  npm install file-saver xlsx
  //================================
  import FileSaver from 'file-saver';//引入file-saver
  import XLSX from 'xlsx';//引入xlsx
  //导出表格中会涉及到%的使用，当导出内容是number时，百分号会自动转换成数
  export(){//导出
        var wb = XLSX.utils.table_to_book(document.querySelector('#tabOne'),{raw:true})
        //添加{raw:true}会把内容区域转换成string类型会把%带出来
        try {
          FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), '表格名称.xlsx')
        } catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }
        return wbout
  }
```
> 以上解决'%'在excel不展示的问题。但是会出现无法在表格中进行数据计算
```javascript
        export(){//导出
        var wb = XLSX.utils.table_to_book(document.querySelector('#tabOne'),{raw:true})
             let wa=wb.Sheets.Sheet1    
        for (const k in wb.Sheets.Sheet1) { // 对wb对象进行遍历操作，把非'%'的number类型值全部置为n(Number)
            if(k=='!merges'||k=='!ref'){continue}
            let k1=wa[k]
            if(!isNaN(k1['v'])&&k1['v']!=''){
                k1['t']='n'
            }
        }
        ////以下是二进制文件，暂时还无法操作
        try {
          FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), '表格名称.xlsx')
        } catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }
        return wbout
  }
```