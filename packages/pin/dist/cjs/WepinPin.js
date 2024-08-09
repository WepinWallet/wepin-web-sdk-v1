"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),Object.defineProperty(exports,"WepinPin",{enumerable:!0,get:function(){return d}});var e=require("@wepin/common"),n=require("@wepin/fetch-js"),t=require("@wepin/login-js"),i=require("@wepin/modal-js"),r=l(require("@wepin/pin-js/package.json")),a=l(require("@wepin/storage-js")),o=require("jwt-decode");function s(e,n,t,i,r,a,o){try{var s=e[a](o),u=s.value}catch(e){t(e);return}s.done?n(u):Promise.resolve(u).then(i,r)}function u(e){return function(){var n=this,t=arguments;return new Promise(function(i,r){var a=e.apply(n,t);function o(e){s(a,i,r,o,u,"next",e)}function u(e){s(a,i,r,o,u,"throw",e)}o(void 0)})}}function c(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function l(e){return e&&e.__esModule?e:{default:e}}function p(e,n){var t,i,r,a,o={label:0,sent:function(){if(1&r[0])throw r[1];return r[1]},trys:[],ops:[]};return a={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a;function s(a){return function(s){return function(a){if(t)throw TypeError("Generator is already executing.");for(;o;)try{if(t=1,i&&(r=2&a[0]?i.return:a[0]?i.throw||((r=i.return)&&r.call(i),0):i.next)&&!(r=r.call(i,a[1])).done)return r;switch(i=0,r&&(a=[2&a[0],r.value]),a[0]){case 0:case 1:r=a;break;case 4:return o.label++,{value:a[1],done:!1};case 5:o.label++,i=a[1],a=[0];continue;case 7:a=o.ops.pop(),o.trys.pop();continue;default:if(!(r=(r=o.trys).length>0&&r[r.length-1])&&(6===a[0]||2===a[0])){o=0;continue}if(3===a[0]&&(!r||a[1]>r[0]&&a[1]<r[3])){o.label=a[1];break}if(6===a[0]&&o.label<r[1]){o.label=r[1],r=a;break}if(r&&o.label<r[2]){o.label=r[2],o.ops.push(a);break}r[2]&&o.ops.pop(),o.trys.pop();continue}a=n.call(e,o)}catch(e){a=[6,e],i=0}finally{t=r=0}if(5&a[0])throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}([a,s])}}}var d=function(){"use strict";var s;function l(n){var r;!function(e,n){if(!(e instanceof n))throw TypeError("Cannot call a class as a function")}(this,l),c(this,"_login",void 0),c(this,"modal",new i.WepinModal),c(this,"webviewEventHandler",new e.WebviewEventHandler),c(this,"widget",void 0),c(this,"wepinStorage",new a.default),c(this,"_isInitialized",!1),c(this,"wepinAppAttributes",void 0),c(this,"_wepinLifeCycle",void 0),c(this,"_wepinFetch",void 0),c(this,"_userInfo",void 0),c(this,"appId",void 0),c(this,"appKey",void 0),c(this,"type",void 0),this.appKey=n.appKey,this._login=null!==(r=n.wepinLogin)&&void 0!==r?r:new t.WepinLogin({appId:"",appKey:this.appKey}),this.type=this.wepinStorage.platform,this.initEventHandler()}return s=[{key:"login",get:function(){return this._login}},{key:"init",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{defaultLanguage:e.WEPIN_DEFAULT_LANG},i=this;return u(function(){var a,o,s,u,c,l;return p(this,function(p){switch(p.label){case 0:if(i._isInitialized)throw Error("Wepin is already initialized!");return t&&(t.defaultLanguage=null!==(a=t.defaultLanguage)&&void 0!==a?a:e.WEPIN_DEFAULT_LANG,t.defaultCurrency=null!==(o=t.defaultCurrency)&&void 0!==o?o:e.WEPIN_DEFAULT_CURRENCY,t.type=null!==(s=t.type)&&void 0!==s?s:"hide"),i.wepinAppAttributes=t,u=i.modal.domain,i._isInitialized=!1,i._wepinLifeCycle="initializing",i._wepinFetch=new n.WepinFetch({appId:i.appId,appKey:i.appKey,domain:u,sdk:{version:r.default.version,type:"web-sdk"},storage:i.wepinStorage}),[4,i._wepinFetch.init()];case 1:return p.sent(),[4,i._wepinFetch.wepinApi.app.getAppInfo({platform:e.Platform.web,withNetwork:!1})];case 2:if(c=p.sent(),(0,n.isErrorResponse)(c))throw Error(c.message);return i.appId=i._wepinFetch.appId=c.appInfo.id,[4,i.wepinStorage.getLocalStorage(i.appId,"wepin:connectUser")];case 3:if((l=p.sent())&&i._wepinFetch.setToken(l),i.login.isInitialized())return[3,5];return[4,i.login.init(t.defaultLanguage)];case 4:p.sent(),p.label=5;case 5:return i._isInitialized=!0,[4,i.checkExpiredToken()];case 6:return p.sent()?i._wepinLifeCycle="initialized":i._wepinLifeCycle="login",[2]}})})()}},{key:"isInitialized",value:function(){return this._isInitialized}},{key:"checkExpiredToken",value:function(){var e=this;return u(function(){var t,i,r;return p(this,function(a){switch(a.label){case 0:return a.trys.push([0,8,,9]),[4,e.wepinStorage.getLocalStorage(e.appId,"wepin:connectUser")];case 1:if(!(t=a.sent()))return[2,!0];if(!((0,o.jwtDecode)(t.accessToken).exp<Math.floor(Date.now()/1e3)+60))return[3,6];return[4,e._wepinFetch.setToken(t)];case 2:return a.sent(),[4,e.wepinStorage.getLocalStorage(e.appId,"user_id")];case 3:return i=a.sent(),[4,e._wepinFetch.wepinApi.user.refreshToken({userId:i})];case 4:if(r=a.sent(),(0,n.isErrorResponse)(r))return[2,!0];return t.accessToken=r.token,[4,e.wepinStorage.setLocalStorage(e.appId,"wepin:connectUser",t)];case 5:return a.sent(),[2,!1];case 6:return[2,!1];case 7:return[3,9];case 8:return a.sent(),[2,!0];case 9:return[2]}})})()}},{key:"finalize",value:function(){this._isInitialized=!1,this._wepinLifeCycle="initializing",this._userInfo=void 0,this._wepinFetch=void 0,this.wepinAppAttributes=void 0,this.login.finalize()}},{key:"initEventHandler",value:function(){var n,t,i=this;t="local_ak_dev_"===this.appKey.slice(0,13)?this.appKey.slice(6):this.appKey;var a=this;this.webviewEventHandler.addRequestHandler("ready_to_widget",(n=u(function(n){var i,o,s,u;return p(this,function(c){switch(c.label){case 0:return[4,a.wepinStorage.getAllLocalStorage(a.appId)];case 1:return s=null!==(o=c.sent())&&void 0!==o?o:{},u=(0,e.makeWepinResponseMessage)(n,"SUCCESS",{appKey:t,appId:a.appId,domain:a.modal.domain,platform:e.Platform.web,version:r.default.version.includes("-alpha")?r.default.version.substring(0,r.default.version.indexOf("-")):r.default.version,type:"web-pin-module",localDate:s,attributes:a.wepinAppAttributes}),(null===(i=a.widget)||void 0===i?void 0:i.isOpen)&&a.widget.response(u),[2]}})}),function(e){return n.apply(this,arguments)})),this.webviewEventHandler.addRequestHandler("close_wepin_widget",function(){i.widget&&(i.widget.close(),i.widget=void 0)}),this.webviewEventHandler.addRequestHandler("set_local_storage",function(n){i.wepinStorage.setAllLocalStorage(i.appId,n.body.parameter.data);var t,r=(0,e.makeWepinResponseMessage)(n,"SUCCESS","");(null===(t=i.widget)||void 0===t?void 0:t.isOpen)&&i.widget.response(r)})}},{key:"openAndRequestWepinWidget",value:function(n){var t,i=(0,e.getUrlsByMode)((0,e.getModeByAppKey)(this.appKey)).wepinWebview,r=Date.now()+Math.random(),a={header:{id:r,request_from:"web",request_to:"wepin_widget"},body:n},o=this;return new Promise((t=u(function(n,t){return p(this,function(s){switch(s.label){case 0:return o.webviewEventHandler.addRequestHandler("get_sdk_request",function(i){var s,u=(0,e.makeWepinResponseMessage)(i,"SUCCESS",a);(null===(s=o.widget)||void 0===s?void 0:s.isOpen)&&(o.webviewEventHandler.addResponseHandler(r.toString(),function(e){if("ERROR"===e.body.state){t(Error(e.body.data));return}n(e)},!0),o.widget.response(u))},!0),[4,o.modal.openModal(i,o.webviewEventHandler.getEventListenerFunction())];case 1:return o.widget=s.sent(),[2]}})}),function(e,n){return t.apply(this,arguments)}))}},{key:"checkLogin",value:function(){var e=this;return u(function(){return p(this,function(n){switch(n.label){case 0:return[4,e.checkExpiredToken()];case 1:if(n.sent())throw Error("auth/login_required");return[2]}})})()}},{key:"generateRegistrationPINBlock",value:function(){var e=this;return u(function(){return p(this,function(n){switch(n.label){case 0:return[4,e.checkLogin()];case 1:return n.sent(),[4,e.openAndRequestWepinWidget({command:"pin_register",parameter:{}})];case 2:return[2,n.sent().body.data]}})})()}},{key:"generateAuthPINBlock",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,n=this;return u(function(){return p(this,function(t){switch(t.label){case 0:return[4,n.checkLogin()];case 1:return t.sent(),[4,n.openAndRequestWepinWidget({command:"pin_auth",parameter:{count:e}})];case 2:return[2,t.sent().body.data]}})})()}},{key:"generateChangePINBlock",value:function(){var e=this;return u(function(){return p(this,function(n){switch(n.label){case 0:return[4,e.checkLogin()];case 1:return n.sent(),[4,e.openAndRequestWepinWidget({command:"pin_change",parameter:{}})];case 2:return[2,n.sent().body.data]}})})()}},{key:"generateAuthOTP",value:function(){var e=this;return u(function(){return p(this,function(n){switch(n.label){case 0:return[4,e.checkLogin()];case 1:return n.sent(),[4,e.openAndRequestWepinWidget({command:"pin_otp",parameter:{}})];case 2:return[2,n.sent().body.data]}})})()}}],function(e,n){for(var t=0;t<n.length;t++){var i=n[t];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}(l.prototype,s),l}();