/* eslint-disable */
let Tips = {};
Tips.install = function (Vue, options) {
    let opt = {
        defaultType:'bottom',
        duration:'2500'
    };
    for(let property in options){
        opt[property] = options[property];
    }
    function extend(opts, option) {
      let opt = opts || {}
      for (let key in opt) {
        if (typeof opt[key] === 'object') {
          for (let k in opt[key]) {
            option[key][k] = opt[key][k]
          }
        } else {
          option[key] = opt[key]
        }
      }
      return option
    }
    Vue.prototype.$toast = function(tips, type, duration, callback, themeObj){
        let curType = type ? type : opt.defaultType;
        let self = this
        if(document.querySelector('.wa-dialog')){
            // 如果dialog还在，则不再执行
            return;
        }
        let toastTpl = Vue.extend({
            template: `<div class="dia-mask"><div class="wa-dialog wa-dialog-${curType}">{{tips}}</div></div>`,
            data:function(){
                return{
                    tips:tips
                }
            }
        });
        let tpl = new toastTpl().$mount().$el;
        let tep = document.createElement("div");
        tep.setAttribute("class","wa-dialog wa-dialog-"+curType);
        tep.innerText=tips;
        document.body.appendChild(tpl);
        if(themeObj!=undefined){
            for(let key in themeObj){
                document.querySelector(".wa-dialog").style[key]=themeObj[key];
            }
        }
        let timer = setTimeout(function () {
            document.body.removeChild(tpl);
            if (typeof callback == 'function') {
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
    Vue.prototype.$actionSheet = function(opt) {
      let option = {
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
      }
      // Object.assign(option, opt)
      option = extend(opt, option)
      let actionSheetTpl = Vue.extend({
        template: `<div class="action-sheet-mask" ref="wrapper" @click="cancelFn(false)">
                    <div class="action-sheet-content" ref="content" @click.stop>
                      <div class="action-title scale-1px">{{title}}</div>
                      <div class="action-confirm" @click="comfirmFn">{{comfirm.text}}</div>
                      <div class="action-cancel" @click="cancelFn(true)">{{cancel.text}}</div>
                    </div>
                  </div>`,
        data() {
          return {
            title: option.title,
            comfirm: option.comfirm,
            cancel: option.cancel
          }
        },
        methods: {
          comfirmFn() {
            this.comfirm.callback.apply(this)
          },
          cancelFn(flag) {
            if (this.cancel.callback && flag) {
              this.cancel.callback.allpy(this)
            }
            if (flag || option.maskClose && !flag) {
              this.close()
            }
          },
          close() {
            this.$refs.content.style.transform = 'translateY(100%)'
            setTimeout(() => {
              document.body.removeChild(this.$refs.wrapper)
            }, 500)
          }
        }
      })
      let tpl = new actionSheetTpl().$mount().$el
      document.body.appendChild(tpl)
    }
    Vue.prototype.$dialog = function(opt) {
      let option = {
        title: '领取成功',
        content: '恭喜你,成功领取优惠券!',
        btnArr: [

        ]
      }
      option = extend(opt, option)
      let dialogTpl = Vue.extend({
        template:`<div @click="close" class="wa-tips-mask" ref="wrapper" @touchmove.stop.prevent>
                    <div class="tips-container" @click.stop>
                      <!--<span class="tips-close-btn" @click="close">&times;</span>-->
                      <div class="tips-title">{{title}}</div>
                      <div class="tips-content" v-html="content"></div>
                      <div class="tips-btn-group">
                        <!--<span class="view-btn">点击查看</span>-->
                        <!--<span class="use-btn">立即使用</span>-->
                        <span v-for="(item,index) in btnArr" :class="item.className" @click="callback(item.callback)">{{item.text}}</span>
                      </div>
                    </div>
                  </div>`,
        data() {
          return {
            title: option.title,
            content: option.content,
            btnArr: option.btnArr
          }
        },
        methods: {
          close() {
            this.$refs.wrapper.style.opacity=0
            setTimeout(() => {
              document.body.removeChild(this.$refs.wrapper)
            }, 1000)
          },
          callback(fn) {
            fn.apply(this)
          }
        }
      })
      let tpl = new dialogTpl().$mount().$el
      document.body.appendChild(tpl)
    }
    Vue.prototype.$alert = function(type,title,btnText,callback){
        if(!btnText){
            btnText = "确认"
        }
        let alertTpl=Vue.extend({
            template:`<div class="wa-confirm-wrapper" ref="wrapper">
                <div class="confirm-box">
                    <p>{{title}}</p>
                    <div class="btn-wrapper" @click="confirmFn">
                        <span class="alert-confirm" :class="{'success-confirm':type=='success','error-confirm':type=='error','warning-confirm':type=='warning'}">{{btnText}}</span>
                     </div>
                </div>
            </div>`,
            data(){
                return {
                    type:type,
                    title:title,
                    btnText:btnText
                }
            },
            methods:{
                confirmFn(){
                    if (typeof callback == "function") {
                        callback.apply(this)
                    }
                    this.$refs.wrapper.style.opacity = 0
                    setTimeout(() => {
                        document.body.removeChild(this.$refs.wrapper)
                    }, 500)
                }
            }
        })
        let tpl = new alertTpl().$mount().$el;
        document.body.appendChild(tpl);
    };

    ['error', 'warning', 'success'].forEach(function(type) {
        Vue.prototype.$alert[type] = (title,btnText,callback) => {
            return Vue.prototype.$alert(type,title,btnText,callback)
        };
    });

    Vue.prototype.$prompt = function(title, cancelCallback){
        let self=this;
        if (!title) {
            title = "请确认"
        }
        let promptTpl=Vue.extend({
            template:`<div class="wa-confirm-wrapper wa-prompt-wrapper" ref="wrapper">
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
            data() {
                return{
                    title:title,
                    val:""
                }
            },
            methods:{
                cancelFn(){
                    this.$refs.wrapper.style.opacity = 0
                    setTimeout(()=>{
                        document.body.removeChild(this.$refs.wrapper)
                    },500)
                },
                confirmFn(){
                    this.cancelFn()
                    if (typeof cancelCallback=="function") {
                        cancelCallback.call(self,this.val)
                    } else {
                        console.warn('参数错误')
                    }
                }
            }
        })
        let tpl = new promptTpl().$mount().$el
        document.body.appendChild(tpl)
    }

    Vue.prototype.$confirm = function(opt) {
        let option = {
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
        option = extend(opt, option)
        let confirmTpl=Vue.extend({
            template:`<div class="wa-confirm-wrapper" ref="wrapper">
                <div class="confirm-box">
                    <p>{{title}}</p>
                    <div class="btn-wrapper">
                        <span :class="item.className" v-for="(item, index) in btnArr" @click="callback(item.callback)">{{item.text}}</span>
                     </div>
                </div>
            </div>`,
            data() {
                return{
                    title: option.title,
                    btnArr: option.btnArr
                }
            },
            methods:{
              callback(fn){
                fn.apply(this)
                this.close()
              },
              close() {
                this.$refs.wrapper.style.opacity=0;
                setTimeout(()=>{
                  document.body.removeChild(this.$refs.wrapper);
                },500)
              }
            }
        })
        let tpl = new confirmTpl().$mount().$el;
        document.body.appendChild(tpl);
    };

    Vue.prototype.$loading = function(tips, type, themeObj) {
        let load = document.querySelector('.wa-load-mark');
        if(!tips){
            tips="加载中..."
        }
        if(type == 'close'){
            load && document.body.removeChild(load);
            return new Promise((resolve, reject) => {
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
            let loadTpl = Vue.extend({
                template: '<div class="wa-load-mark"><div class="wa-load-box"><div class="wa-loading"><div class="loading_leaf loading_leaf_0"></div><div class="loading_leaf loading_leaf_1"></div><div class="loading_leaf loading_leaf_3"></div><div class="loading_leaf loading_leaf_4"></div><div class="loading_leaf loading_leaf_5"></div><div class="loading_leaf loading_leaf_6"></div><div class="loading_leaf loading_leaf_7"></div><div class="loading_leaf loading_leaf_8"></div><div class="loading_leaf loading_leaf_9"></div><div class="loading_leaf loading_leaf_10"></div><div class="loading_leaf loading_leaf_11"></div></div><div class="wa-load-content">'+tips+'</div></div></div>'
            });

            let tpl = new loadTpl().$mount().$el;
            document.body.appendChild(tpl);
            if(themeObj!="undefined"){
            	for(let key in themeObj){
            		document.querySelector(".wa-load-box").style[key]=themeObj[key];
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

