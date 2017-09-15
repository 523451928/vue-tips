var Tips = {};
Tips.install = function (Vue, options) {
    var opt = {
        defaultType:'bottom',
        duration:'2500'
    };
    for(var property in options){
        opt[property] = options[property];
    }
    Vue.prototype.$toast = function(tips,type,duration,callback,themeObj){
        var curType = type ? type : opt.defaultType;
        var self=this
        if(document.querySelector('.lx-dialog')){
            // 如果dialog还在，则不再执行
            return;
        }
        var toastTpl = Vue.extend({
            template: `<div class="dia-mask"><div class="lx-dialog lx-dialog-${curType}">{{tips}}</div></div>`,
            data:function(){
                return{
                    tips:tips
                }
            }
        });
        var tpl = new toastTpl().$mount().$el;
        var tep = document.createElement("div");
        tep.setAttribute("class","lx-dialog lx-dialog-"+curType);
        tep.innerText=tips;
        document.body.appendChild(tpl);
        if(themeObj!=undefined){
            for(var key in themeObj){
                document.querySelector(".lx-dialog").style[key]=themeObj[key];
            }
        }
        var timer=setTimeout(function () {
            document.body.removeChild(tpl);
            if(typeof callback=='function'){
                callback.call(self)
            }
        }, duration || opt.duration);

        return new Promise(function(resolve,reject){
            if(true){
                resolve({
                    "status":"success"
                })
            }else{
                reject({
                    "status":"error"
                })
            }
        })
    };
    ['bottom', 'center', 'top'].forEach(function(type) {
        Vue.prototype.$toast[type] = function(tips,duration,callback,themeObj) {
            return Vue.prototype.$toast(tips,type,duration,callback,themeObj);
        };
    });

    Vue.prototype.$alert=function(type,title,btnText,callback){
        var self=this
        if(!btnText){
            btnText="确认"
        }
        var alertTpl=Vue.extend({
            template:`<div class="lx-confirm-wrapper" ref="wrapper">
                <div class="confirm-box">
                    <p>{{title}}</p>
                    <div class="btn-wrapper" @click="confirmFn">
                        <span class="alert-confirm" :class="{'success-confirm':type=='success','error-confirm':type=='error','warning-confirm':type=='warning'}">{{btnText}}</span>
                     </div>
                </div>
            </div>`,
            data:function(){
                return {
                    type:type,
                    title:title,
                    btnText:btnText
                }
            },
            methods:{
                confirmFn(){
                    if(typeof callback=="function"){
                        callback.apply(self)
                    }
                    this.$refs.wrapper.style.opacity=0;
                    setTimeout(()=>{
                        document.body.removeChild(this.$refs.wrapper);
                    },500)
                }
            }
        })
        var tpl = new alertTpl().$mount().$el;
        document.body.appendChild(tpl);
    };

    ['error', 'warning', 'success'].forEach(function(type) {
        Vue.prototype.$alert[type] = function(title,btnText,callback) {
            return Vue.prototype.$alert(type,title,btnText,callback);
        };
    });

    Vue.prototype.$prompt=function(title,cancelCallback){
        var self=this;
        if(!title){
            title="请确认"
        }
        var promptTpl=Vue.extend({
            template:`<div class="lx-confirm-wrapper lx-prompt-wrapper" ref="wrapper">
                <div class="confirm-box">
                    <div>
                        <p>{{title}}</p>
                        <input type="text" v-model="val">
                    </div>
                    <div class="btn-wrapper">
                        <span class="cancel" @click="cancelFn">取消</span>
                        <span class="confirm" @click="confirmFn">确认</span>
                     </div>
                </div>
            </div>`,
            data:function(){
                return{
                    title:title,
                    val:""
                }
            },
            methods:{
                cancelFn(){
                    this.$refs.wrapper.style.opacity=0;
                    setTimeout(()=>{
                        document.body.removeChild(this.$refs.wrapper);
                    },500)
                },
                confirmFn(){
                    this.cancelFn();
                    if(typeof cancelCallback=="function"){
                        cancelCallback.call(self,this.val);
                    }else{
                        console.warn('参数错误')
                    }
                }
            }
        })
        var tpl = new promptTpl().$mount().$el;
        document.body.appendChild(tpl);
    }

    Vue.prototype.$comfirm=function(title,cancelCallback){
        var self=this;
        if(!title){
            title="请确认"
        }
        var confirmTpl=Vue.extend({
            template:`<div class="lx-confirm-wrapper" ref="wrapper">
                <div class="confirm-box">
                    <p>{{title}}</p>
                    <div class="btn-wrapper">
                        <span class="cancel" @click="cancelFn">取消</span>
                        <span class="confirm" @click="confirmFn">确认</span>
                     </div>
                </div>
            </div>`,
            data:function(){
                return{
                    title:title
                }
            },
            methods:{
                cancelFn(){
                    this.$refs.wrapper.style.opacity=0;
                    setTimeout(()=>{
                        document.body.removeChild(this.$refs.wrapper);
                    },500)
                },
                confirmFn(){
                    this.cancelFn();
                    if(typeof cancelCallback=="function"){
                        cancelCallback.apply(self);
                    }else{
                        console.warn('参数错误')
                    }
                }
            }
        })
        var tpl = new confirmTpl().$mount().$el;
        document.body.appendChild(tpl);
    };

    Vue.prototype.$loading = function(tips,type,themeObj) {
        var load = document.querySelector('.lx-load-mark');
        if(!tips){
            tips="加载中..."
        }
        if(type == 'close'){
            load && document.body.removeChild(load);
            return new Promise(function(resolve,reject){
                if(true){
                    resolve('可以执行回调')
                }else{
                    reject()
                }
            })
        }else{
            if(load){
                // 如果loading还在，则不再执行
                return;
            }
            var loadTpl = Vue.extend({
                template: '<div class="lx-load-mark"><div class="lx-load-box"><div class="lx-loading"><div class="loading_leaf loading_leaf_0"></div><div class="loading_leaf loading_leaf_1"></div><div class="loading_leaf loading_leaf_3"></div><div class="loading_leaf loading_leaf_4"></div><div class="loading_leaf loading_leaf_5"></div><div class="loading_leaf loading_leaf_6"></div><div class="loading_leaf loading_leaf_7"></div><div class="loading_leaf loading_leaf_8"></div><div class="loading_leaf loading_leaf_9"></div><div class="loading_leaf loading_leaf_10"></div><div class="loading_leaf loading_leaf_11"></div></div><div class="lx-load-content">'+tips+'</div></div></div>'
            });

            var tpl = new loadTpl().$mount().$el;
            document.body.appendChild(tpl);
            if(themeObj!="undefined"){
            	for(var key in themeObj){
            		document.querySelector(".lx-load-box").style[key]=themeObj[key];
            	}
            }
        }
    };

    ['open', 'close'].forEach(function(type) {
        Vue.prototype.$loading[type] = function(tips,theme) {
            return Vue.prototype.$loading(tips,type,theme);
        };
    });

    Vue.directive('drag', {     //添加全局指令
        bind (el, binding, vnode, oldVnode) {

        }
    })
};

