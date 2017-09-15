# vue-tips
基于vue2.0以上的vue一个移动端提示插件,包括confirm,alert,toast,loading的一些提示
## 使用方法 
* 1、直接引用vue-tips.js和css,入口文件加上Vue使用插件的api,Vue.use(Tips)
* 2、在使用vue-cli的项目中使用vue-tips需要在vue-tips.js使用export default Tips 导出Tips,最后在入口js中import Tips from 'vue-tips.js的路径',注意也要import css

## vue-tips提供的API
* center 表示toast需要显示的地方 可以选择bottom,top,center
* 参数1 提示的消息 | 参数2 消息多少ms后消失 |  参数3 消息消失后的回调函数 | 参数4 {} 可以传自己订制的css
```
this.$toast.center('我是提示框',3000,function(){
  //todo
},{
    background:"#f63"
})
```
* 参数1 confirm提示的信息 参数2点击确定后的回调函数
```
this.$comfirm('确认删除吗？',function(){
  //todo
})
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
    this.$alert('success',val)
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
