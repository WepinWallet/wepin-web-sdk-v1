function e(e,t,n,r,a,o,i){try{var u=e[o](i),c=u.value}catch(e){n(e);return}u.done?t(c):Promise.resolve(c).then(r,a)}function t(t){return function(){var n=this,r=arguments;return new Promise(function(a,o){var i=t.apply(n,r);function u(t){e(i,a,o,u,c,"next",t)}function c(t){e(i,a,o,u,c,"throw",t)}u(void 0)})}}function n(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n,r,a,o,i={label:0,sent:function(){if(1&a[0])throw a[1];return a[1]},trys:[],ops:[]};return o={next:u(0),throw:u(1),return:u(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function u(o){return function(u){return function(o){if(n)throw TypeError("Generator is already executing.");for(;i;)try{if(n=1,r&&(a=2&o[0]?r.return:o[0]?r.throw||((a=r.return)&&a.call(r),0):r.next)&&!(a=a.call(r,o[1])).done)return a;switch(r=0,a&&(o=[2&o[0],a.value]),o[0]){case 0:case 1:a=o;break;case 4:return i.label++,{value:o[1],done:!1};case 5:i.label++,r=o[1],o=[0];continue;case 7:o=i.ops.pop(),i.trys.pop();continue;default:if(!(a=(a=i.trys).length>0&&a[a.length-1])&&(6===o[0]||2===o[0])){i=0;continue}if(3===o[0]&&(!a||o[1]>a[0]&&o[1]<a[3])){i.label=o[1];break}if(6===o[0]&&i.label<a[1]){i.label=a[1],a=o;break}if(a&&i.label<a[2]){i.label=a[2],i.ops.push(o);break}a[2]&&i.ops.pop(),i.trys.pop();continue}o=t.call(e,i)}catch(e){o=[6,e],r=0}finally{n=a=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,u])}}}import a from"../../APIRequest.js";var o=function(){var e;function o(e){!function(e,t){if(!(e instanceof t))throw TypeError("Cannot call a class as a function")}(this,o),n(this,"fetcher",void 0),n(this,"basePath",void 0),this.fetcher=e,this.basePath="/account"}return e=[{key:"readdress",value:function(e){var n=this;return t(function(){var t;return r(this,function(r){switch(r.label){case 0:return t=new a({url:"".concat(n.basePath,"/readdress"),data:e,method:"PATCH",withCredentials:!0}),[4,n.fetcher.send(t)];case 1:return[2,r.sent().data]}})})()}},{key:"getAppAccountList",value:function(e){var n=this;return t(function(){var t;return r(this,function(r){switch(r.label){case 0:return t=new a({url:"".concat(n.basePath),query:e,method:"GET",withCredentials:!0}),[4,n.fetcher.send(t)];case 1:return[2,r.sent().data]}})})()}}],function(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}(o.prototype,e),o}();export default o;