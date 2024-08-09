"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),function(e,r){for(var t in r)Object.defineProperty(e,t,{enumerable:!0,get:r[t]})}(exports,{makeRequestID:function(){return n},requestFactory:function(){return o}});var e=require("eth-rpc-errors"),r=require("./selectedAddress.js");function t(e,r,t,n,o,a,u){try{var i=e[a](u),l=i.value}catch(e){t(e);return}i.done?r(l):Promise.resolve(l).then(n,o)}var n=function(){return new Date().getTime()},o=function(o){var a,u,i,l=o.wepinProvider,s=o.network,c=(o.req,o.res),d=(o.next,o.end),p=o.command,f=o.parameter,b=n();l.webviewEventHandler.addResponseHandler(b.toString(),(a=function(t){var n,o;return function(e,r){var t,n,o,a,u={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return a={next:i(0),throw:i(1),return:i(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a;function i(a){return function(i){return function(a){if(t)throw TypeError("Generator is already executing.");for(;u;)try{if(t=1,n&&(o=2&a[0]?n.return:a[0]?n.throw||((o=n.return)&&o.call(n),0):n.next)&&!(o=o.call(n,a[1])).done)return o;switch(n=0,o&&(a=[2&a[0],o.value]),a[0]){case 0:case 1:o=a;break;case 4:return u.label++,{value:a[1],done:!1};case 5:u.label++,n=a[1],a=[0];continue;case 7:a=u.ops.pop(),u.trys.pop();continue;default:if(!(o=(o=u.trys).length>0&&o[o.length-1])&&(6===a[0]||2===a[0])){u=0;continue}if(3===a[0]&&(!o||a[1]>o[0]&&a[1]<o[3])){u.label=a[1];break}if(6===a[0]&&u.label<o[1]){u.label=o[1],o=a;break}if(o&&u.label<o[2]){u.label=o[2],u.ops.push(a);break}o[2]&&u.ops.pop(),u.trys.pop();continue}a=r.call(e,u)}catch(e){a=[6,e],n=0}finally{t=o=0}if(5&a[0])throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}([a,i])}}}(this,function(a){switch(a.label){case 0:if("User Cancel"!==t.body.data)return[3,1];return l.queue.shift(),d(e.ethErrors.provider.userRejectedRequest()),[3,4];case 1:if(c.result="User Cancel"===t.body.data?"":t.body.data,"request_enable"!==t.body.command)return[3,3];return o=null===(n=c.result)||void 0===n?void 0:n[0],[4,(0,r.setSelectedAddress)(l.wepinStorage,l.wepinAppId,s,o)];case 2:a.sent(),a.label=3;case 3:"wallet_switchEthereumChain"===t.body.command&&(c.result.rpcUrl=JSON.parse(c.result.rpcUrl),c.result.wepinProvider=l),d(),a.label=4;case 4:return[2]}})},u=function(){var e=this,r=arguments;return new Promise(function(n,o){var u=a.apply(e,r);function i(e){t(u,n,o,i,l,"next",e)}function l(e){t(u,n,o,i,l,"throw",e)}i(void 0)})},function(e){return u.apply(this,arguments)}),!0);try{l.queue.push({header:{request_from:"web",request_to:"wepin_widget",id:b},body:{command:p,parameter:f}}),(null===(i=l.wepinWidget)||void 0===i?void 0:i.isOpen)||l.openModal().catch(function(e){d(e)})}catch(e){d(e)}};