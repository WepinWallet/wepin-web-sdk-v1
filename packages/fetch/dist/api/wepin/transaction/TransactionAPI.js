function e(e,t,n,r,a,i,o){try{var u=e[i](o),c=u.value}catch(e){n(e);return}u.done?t(c):Promise.resolve(c).then(r,a)}function t(t){return function(){var n=this,r=arguments;return new Promise(function(a,i){var o=t.apply(n,r);function u(t){e(o,a,i,u,c,"next",t)}function c(t){e(o,a,i,u,c,"throw",t)}u(void 0)})}}function n(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n,r,a,i,o={label:0,sent:function(){if(1&a[0])throw a[1];return a[1]},trys:[],ops:[]};return i={next:u(0),throw:u(1),return:u(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function u(i){return function(u){return function(i){if(n)throw TypeError("Generator is already executing.");for(;o;)try{if(n=1,r&&(a=2&i[0]?r.return:i[0]?r.throw||((a=r.return)&&a.call(r),0):r.next)&&!(a=a.call(r,i[1])).done)return a;switch(r=0,a&&(i=[2&i[0],a.value]),i[0]){case 0:case 1:a=i;break;case 4:return o.label++,{value:i[1],done:!1};case 5:o.label++,r=i[1],i=[0];continue;case 7:i=o.ops.pop(),o.trys.pop();continue;default:if(!(a=(a=o.trys).length>0&&a[a.length-1])&&(6===i[0]||2===i[0])){o=0;continue}if(3===i[0]&&(!a||i[1]>a[0]&&i[1]<a[3])){o.label=i[1];break}if(6===i[0]&&o.label<a[1]){o.label=a[1],a=i;break}if(a&&o.label<a[2]){o.label=a[2],o.ops.push(i);break}a[2]&&o.ops.pop(),o.trys.pop();continue}i=t.call(e,o)}catch(e){i=[6,e],r=0}finally{n=a=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,u])}}}import a from"../../APIRequest";var i=function(){var e;function i(e){!function(e,t){if(!(e instanceof t))throw TypeError("Cannot call a class as a function")}(this,i),n(this,"fetcher",void 0),n(this,"basePath",void 0),this.fetcher=e,this.basePath="/tx"}return e=[{key:"sign",value:function(e){var n=this;return t(function(){var t;return r(this,function(r){switch(r.label){case 0:return t=new a({url:"".concat(n.basePath,"/sign"),data:e,method:"POST",withCredentials:!0}),[4,n.fetcher.send(t)];case 1:return[2,r.sent().data]}})})()}},{key:"broadCast",value:function(e){var n=this;return t(function(){var t;return r(this,function(r){switch(r.label){case 0:return t=new a({url:"".concat(n.basePath,"/broadcast"),data:e,method:"POST",withCredentials:!0}),[4,n.fetcher.send(t)];case 1:return[2,r.sent().data]}})})()}},{key:"prepareTransaction",value:function(e){var n=this;return t(function(){var t;return r(this,function(r){switch(r.label){case 0:return t=new a({url:"".concat(n.basePath,"/prepare"),data:e,method:"POST",withCredentials:!0}),[4,n.fetcher.send(t)];case 1:return[2,r.sent().data]}})})()}},{key:"checkAddressValidation",value:function(e){var n=this;return t(function(){var t;return r(this,function(r){switch(r.label){case 0:return t=new a({url:"".concat(n.basePath,"/check_address"),query:e,method:"GET",withCredentials:!0}),[4,n.fetcher.send(t)];case 1:return[2,r.sent().data]}})})()}}],function(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}(i.prototype,e),i}();export default i;