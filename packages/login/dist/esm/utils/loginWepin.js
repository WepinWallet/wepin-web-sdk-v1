var e,r,n;function t(e,r,n,t,s,o,a){try{var u=e[o](a),c=u.value}catch(e){n(e);return}u.done?r(c):Promise.resolve(c).then(t,s)}function s(e){return function(){var r=this,n=arguments;return new Promise(function(s,o){var a=e.apply(r,n);function u(e){t(a,s,o,u,c,"next",e)}function c(e){t(a,s,o,u,c,"throw",e)}u(void 0)})}}function o(e,r){var n,t,s,o,a={label:0,sent:function(){if(1&s[0])throw s[1];return s[1]},trys:[],ops:[]};return o={next:u(0),throw:u(1),return:u(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function u(o){return function(u){return function(o){if(n)throw TypeError("Generator is already executing.");for(;a;)try{if(n=1,t&&(s=2&o[0]?t.return:o[0]?t.throw||((s=t.return)&&s.call(t),0):t.next)&&!(s=s.call(t,o[1])).done)return s;switch(t=0,s&&(o=[2&o[0],s.value]),o[0]){case 0:case 1:s=o;break;case 4:return a.label++,{value:o[1],done:!1};case 5:a.label++,t=o[1],o=[0];continue;case 7:o=a.ops.pop(),a.trys.pop();continue;default:if(!(s=(s=a.trys).length>0&&s[s.length-1])&&(6===o[0]||2===o[0])){a=0;continue}if(3===o[0]&&(!s||o[1]>s[0]&&o[1]<s[3])){a.label=o[1];break}if(6===o[0]&&a.label<s[1]){a.label=s[1],s=o;break}if(s&&a.label<s[2]){a.label=s[2],a.ops.push(o);break}s[2]&&a.ops.pop(),a.trys.pop();continue}o=r.call(e,a)}catch(e){o=[6,e],t=0}finally{n=s=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,u])}}}import{isErrorResponse as a,isFirebaseErrorResponse as u}from"@wepin/fetch-js";export var checkExistFirebaseLoginSession=(e=s(function(e,r,n){var t,s,a;return o(this,function(o){switch(o.label){case 0:return[4,n.getLocalStorage(e,"firebase:wepin")];case 1:if(!(null!=(t=o.sent())))return[3,8];o.label=2;case 2:return o.trys.push([2,5,,7]),[4,r.wepinFirebaseApi.getRefreshIdToken(t.refreshToken)];case 3:if(u(s=o.sent()))return[2,!1];return a={provider:t.provider,idToken:s,refreshToken:t.refreshToken},[4,n.setLocalStorage(e,"firebase:wepin",a)];case 4:return o.sent(),[2,!0];case 5:return o.sent(),r.setToken(),[4,n.clearAllLocalStorage(e)];case 6:case 9:return o.sent(),[2,!1];case 7:return[3,10];case 8:return r.setToken(),[4,n.clearAllLocalStorage(e)];case 10:return[2]}})}),function(r,n,t){return e.apply(this,arguments)});export var checkExistWepinLoginSession=(r=s(function(e,r,n){var t,s,u,c;return o(this,function(o){switch(o.label){case 0:return[4,n.getLocalStorage(e,"wepin:connectUser")];case 1:return t=o.sent(),[4,n.getLocalStorage(e,"user_id")];case 2:if(s=o.sent(),!(null!=t&&null!=s))return[3,9];r.setToken(t),o.label=3;case 3:return o.trys.push([3,6,,8]),[4,r.wepinApi.user.refreshToken({userId:s})];case 4:if(a(u=o.sent()))return[2,!1];return c={accessToken:u.token,refreshToken:t.refreshToken},[4,n.setLocalStorage(e,"wepin:connectUser",c)];case 5:return o.sent(),r.setToken(c),[2,!0];case 6:return o.sent(),r.setToken(),[4,n.clearAllLocalStorage(e)];case 7:case 10:return o.sent(),[2,!1];case 8:return[3,11];case 9:return r.setToken(),[4,n.clearAllLocalStorage(e)];case 11:return[2]}})}),function(e,n,t){return r.apply(this,arguments)});export var getLoginUserStorage=(n=s(function(e,r){var n,t,s,a,u;return o(this,function(o){switch(o.label){case 0:return[4,r.getAllLocalStorage(e)];case 1:if(!(n=o.sent())||(t=n.wallet_id,s=n.user_info,a=n["wepin:connectUser"],u=n.user_status,!s||!a||!u))return[2,null];return[2,{status:"success",userInfo:{userId:s.userInfo.userId,email:s.userInfo.email,provider:s.userInfo.provider,use2FA:s.userInfo.use2FA},userStatus:u,walletId:t,token:a}]}})}),function(e,r){return n.apply(this,arguments)});