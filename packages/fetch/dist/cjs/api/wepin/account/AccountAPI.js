"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),Object.defineProperty(exports,"default",{enumerable:!0,get:function(){return o}});var e,t=(e=require("../../APIRequest.js"))&&e.__esModule?e:{default:e};function r(e,t,r,n,a,u,o){try{var i=e[u](o),c=i.value}catch(e){r(e);return}i.done?t(c):Promise.resolve(c).then(n,a)}function n(e){return function(){var t=this,n=arguments;return new Promise(function(a,u){var o=e.apply(t,n);function i(e){r(o,a,u,i,c,"next",e)}function c(e){r(o,a,u,i,c,"throw",e)}i(void 0)})}}function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function u(e,t){var r,n,a,u,o={label:0,sent:function(){if(1&a[0])throw a[1];return a[1]},trys:[],ops:[]};return u={next:i(0),throw:i(1),return:i(2)},"function"==typeof Symbol&&(u[Symbol.iterator]=function(){return this}),u;function i(u){return function(i){return function(u){if(r)throw TypeError("Generator is already executing.");for(;o;)try{if(r=1,n&&(a=2&u[0]?n.return:u[0]?n.throw||((a=n.return)&&a.call(n),0):n.next)&&!(a=a.call(n,u[1])).done)return a;switch(n=0,a&&(u=[2&u[0],a.value]),u[0]){case 0:case 1:a=u;break;case 4:return o.label++,{value:u[1],done:!1};case 5:o.label++,n=u[1],u=[0];continue;case 7:u=o.ops.pop(),o.trys.pop();continue;default:if(!(a=(a=o.trys).length>0&&a[a.length-1])&&(6===u[0]||2===u[0])){o=0;continue}if(3===u[0]&&(!a||u[1]>a[0]&&u[1]<a[3])){o.label=u[1];break}if(6===u[0]&&o.label<a[1]){o.label=a[1],a=u;break}if(a&&o.label<a[2]){o.label=a[2],o.ops.push(u);break}a[2]&&o.ops.pop(),o.trys.pop();continue}u=t.call(e,o)}catch(e){u=[6,e],n=0}finally{r=a=0}if(5&u[0])throw u[1];return{value:u[0]?u[1]:void 0,done:!0}}([u,i])}}}var o=function(){"use strict";var e;function r(e){!function(e,t){if(!(e instanceof t))throw TypeError("Cannot call a class as a function")}(this,r),a(this,"fetcher",void 0),a(this,"basePath",void 0),this.fetcher=e,this.basePath="/account"}return e=[{key:"readdress",value:function(e){var r=this;return n(function(){var n;return u(this,function(a){switch(a.label){case 0:return n=new t.default({url:"".concat(r.basePath,"/readdress"),data:e,method:"PATCH",withCredentials:!0}),[4,r.fetcher.send(n)];case 1:return[2,a.sent().data]}})})()}},{key:"getAppAccountList",value:function(e){var r=this;return n(function(){var n;return u(this,function(a){switch(a.label){case 0:return n=new t.default({url:"".concat(r.basePath),query:e,method:"GET",withCredentials:!0}),[4,r.fetcher.send(n)];case 1:return[2,a.sent().data]}})})()}}],function(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}(r.prototype,e),r}();