# vue-tips
基于vue2.0以上的vue一个移动端提示插件,包括confirm,alert,toast,loading的一些提示
## 使用方法 
* 1、直接引用vue-tips.js和css,入口文件加上Vue使用插件的api,Vue.use(Tips)
* 2、在使用vue-cli的项目中使用vue-tips需要在vue-tips.js使用export default Tips 导出Tips,最后在入口js中import Tips from 'vue-tips.js的路径',注意也要import css
## $actionSheet 使用方法
```
this.$actionSheet({
  title: 'actionSheet',
  maskClose: true,
  comfirm: {
    text: 'delete',
    callback: function() {
      this.close()
    }
  },
  cancel: {
    text: 'canceltext'
  }
})
//返回值为actionSheet的实例 可以使用actionSheet的方法
```
| Option | Description |
| ----- | ----- |
| title  | String(default 'actionSheet') 标题 |
| maskClose | Boolean(defualt true) 点击遮罩是否能关闭 |
| comfirm | Object text => 确认文字 callback => 点击后的回调函数 当前this指向Vue.extend()的实例|
| cancel | Object text => 取消文字 |

## $notify 使用方法
```
let notify = this.$notify({
  message: '提示信息',
  style: {
    background: "#f63"
  },
  delay: 3000,
  autoClose: true
})
setTimeout(() => {
  notify.close()
}, 3000)
//返回值为notify的实例 可以使用notify的方法
```
| Option | Description |
| ----- | ----- |
| message | String(default '提示信息') 需要显示的提示信息 |
| style | Object(default {}) 自定义皮肤 |
| delay | Number(default 3000) 多久后移除提示 单位: ms |
| autoClose | Bollean(default true) 是否自动关闭 | 

## $confirm 使用方法
```
this.$confirm({
  {
    title: '请确认',
    btnArr: [
      {
        text: '取消',
        callback() {
          console.log('click cancel button')
        },
        className: 'cancel'
      },
      {
        text: '确认',
        callback() {
          console.log('click comfirm button')
        },
        className: 'confirm'
      }
    ]
  }
})
```
| Option | Description |
| ----- | ----- |
| title | String(default '') confirm标题 |
| btnArr | Array 按钮组 text => 按钮文字 callback => 点击按钮后的回调函数 className => 按钮的类名 |

## $toast 使用方法
```
this.$toast('message')
```
| Option | Description |
| ----- | ----- |
| message | String(default '') 提示的信息 |

## $alert 使用方法
```
this.$alert.warning('参数错误','确认',function(){
   //todo
})
```
| Option | Description |
| ----- | ----- |
| warning | String  表示提示给用户的状态 可以选择 error,warning,success |
| argu-1 | String alert提示的信息 |
| argu-2 | String 按钮的文字 |
| argu-3 | Function 点击后的回调函数 |

## $prompt 使用方法
```
this.$prompt('请输入姓名',function(val){
  //val的值是input里面输入的值
  //todo
})
```
| Option | Description |
| ----- | ----- |
| argu-1 | String  prompt的标题 |
| argu-2 | Function 点击确认后的回调函数 |

## $loading 使用方法
* 异步请求显示的loading框
* 开启loading 参数1 需要提示的信息,参数2 可以传自己订制的css
```
this.$loading.open('加载中...',{})
```
* 关闭loading  //loading关闭后会返回一个promise对象,可以使用链式调用

```
this.$loading.close().then((res)=>{
   //todo
})
```
