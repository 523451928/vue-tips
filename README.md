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
```
| Option | Description |
| ----- | ----- |
| title  | String(default 'actionSheet') 标题 |
| maskClose | Boolean(defualt true) 点击遮罩是否能关闭 |
| comfirm | Object text => 确认文字 callback => 点击后的回调函数 当前this指向Vue.extend()的实例|
| cancel | Object text => 取消文字 |


## $toast 使用方法
```
this.$toast('message')
```

* warning 表示提示给用户的状态 可以选择 error,warning,success
* 参数1 alert提示的信息 ,参数2按钮的文字,参数3点击按钮后执行的回调函数
```
this.$alert.warning('参数错误','确认',function(){
   //todo
})
```
* 参数1 prompt提示的信息 参数2点击确定后执行的回调函数 回调函数的参数是input输入的值

```
this.$prompt('请输入姓名',function(val){
  //val的值是input里面输入的值
  //todo
})
```

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
