function e(e){if(void 0===e)throw ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function r(e,r,t,n,i,o,a){try{var s=e[o](a),u=s.value}catch(e){t(e);return}s.done?r(u):Promise.resolve(u).then(n,i)}function t(e){return function(){var t=this,n=arguments;return new Promise(function(i,o){var a=e.apply(t,n);function s(e){r(a,i,o,s,u,"next",e)}function u(e){r(a,i,o,s,u,"throw",e)}s(void 0)})}}function n(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function i(e){return(i=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function o(e,r){return(o=Object.setPrototypeOf||function(e,r){return e.__proto__=r,e})(e,r)}function a(e,r){var t,n,i,o,a={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return o={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function s(o){return function(s){return function(o){if(t)throw TypeError("Generator is already executing.");for(;a;)try{if(t=1,n&&(i=2&o[0]?n.return:o[0]?n.throw||((i=n.return)&&i.call(n),0):n.next)&&!(i=i.call(n,o[1])).done)return i;switch(n=0,i&&(o=[2&o[0],i.value]),o[0]){case 0:case 1:i=o;break;case 4:return a.label++,{value:o[1],done:!1};case 5:a.label++,n=o[1],o=[0];continue;case 7:o=a.ops.pop(),a.trys.pop();continue;default:if(!(i=(i=a.trys).length>0&&i[i.length-1])&&(6===o[0]||2===o[0])){a=0;continue}if(3===o[0]&&(!i||o[1]>i[0]&&o[1]<i[3])){a.label=o[1];break}if(6===o[0]&&a.label<i[1]){a.label=i[1],i=o;break}if(i&&a.label<i[2]){a.label=i[2],a.ops.push(o);break}i[2]&&a.ops.pop(),a.trys.pop();continue}o=r.call(e,a)}catch(e){o=[6,e],n=0}finally{t=i=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,s])}}}import{SafeEventEmitter as s,getUrlsByMode as u,getModeByAppKey as c}from"@wepin/common";import{WepinFetch as l,isErrorResponse as p,isFirebaseErrorResponse as d,WepinPlatformType as f}from"@wepin/fetch-js";import{Widget as h,WepinModal as w}from"@wepin/modal-js";import g from"@wepin/storage-js";import v from"../package.json";import{COOKIE_NAME as m}from"./const/CookieName";import{OAUTH2 as k}from"./const/Provider";import{emailRegExp as y,passwordRegExp as _}from"./const/regExp";import{getEventListener as b}from"./event/eventListener";import{Timer as T,TimerPromise as I}from"./utils/IntervalPromise";import E from"./utils/log";import{checkAndVerifyEmail as W,signUpEmail as S}from"./utils/signUpEmail";export var WepinLogin=function(r){!function(e,r){if("function"!=typeof r&&null!==r)throw TypeError("Super expression must either be null or a function");e.prototype=Object.create(r&&r.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),r&&o(e,r)}(P,r);var s,F,A=(s=function(){if("undefined"==typeof Reflect||!Reflect.construct||Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch(e){return!1}}(),function(){var r,t=i(P);return r=s?Reflect.construct(t,arguments,i(this).constructor):t.apply(this,arguments),r&&("object"==(r&&"undefined"!=typeof Symbol&&r.constructor===Symbol?"symbol":typeof r)||"function"==typeof r)?r:e(this)});function P(r){var t,i=r.appId,o=r.appKey;return!function(e,r){if(!(e instanceof r))throw TypeError("Cannot call a class as a function")}(this,P),n(e(t=A.call(this)),"version",void 0),n(e(t),"type",void 0),n(e(t),"appId",void 0),n(e(t),"_appKey",void 0),n(e(t),"_isInitialized",void 0),n(e(t),"_wepinModal",void 0),n(e(t),"_wepinStorage",void 0),n(e(t),"_wepinFetch",void 0),n(e(t),"widget",void 0),n(e(t),"_url",void 0),n(e(t),"appEmailVerified",void 0),n(e(t),"language",void 0),t.version=v.version,t.appId=i,t._appKey=o,t._isInitialized=!1,t.widget=void 0,t._wepinModal=new w,t._wepinStorage=new g,t.type=t._wepinStorage.platform,t._url=new URL(u(c(o)).wepinWebview),console.log("WepinLogin v".concat(t.version)),t}return F=[{key:"init",value:function(e){var r=this;return t(function(){var t;return a(this,function(n){switch(n.label){case 0:if(r._isInitialized)throw Error("Already initialized");return r.language=null!=e?e:"en",r._wepinFetch=new l({appId:r.appId,appKey:r._appKey,domain:r._wepinModal.domain,sdk:{version:r.version,type:"".concat(r.type,"-login")},storage:r._wepinStorage}),[4,r._wepinFetch.init()];case 1:return n.sent(),[4,r._wepinFetch.wepinApi.app.getAppInfo({platform:f[r.type],withNetwork:!1})];case 2:if(p(t=n.sent()))throw Error(t.message);return r.appEmailVerified=t.appInfo.property.emailVerify,r.appId=r._wepinFetch.appId=t.appInfo.id,r._isInitialized=!0,[2]}})})()}},{key:"finalize",value:function(){var e;this._isInitialized=!1,null===(e=this.widget)||void 0===e||e.close()}},{key:"changeLanguage",value:function(e){this.language=e}},{key:"isInitialized",value:function(){return this._isInitialized}},{key:"initCookieData",value:function(e){var r=this;return t(function(){var t;return a(this,function(n){switch(n.label){case 0:return[4,r._wepinStorage.getLocalStorage(r.appId,m)];case 1:if(t=n.sent(),!(e&&t))return[3,4];return[4,r._wepinStorage.clearLocalStorage(r.appId,m)];case 2:return n.sent(),[4,r._wepinStorage.clearAllLocalStorage(r.appId)];case 3:n.sent(),n.label=4;case 4:return[2,t]}})})()}},{key:"setCookieData",value:function(e){var r=this;return t(function(){return a(this,function(t){switch(t.label){case 0:return[4,r._wepinStorage.setLocalStorage(r.appId,m,e)];case 1:return t.sent(),[2]}})})()}},{key:"throwUserCancel",value:function(){var e=this,r=new T;return new I(function(t,n){"Window"===e.widget.type&&r.setInterval(function(){try{var t,i,o=h.getWebview(e.widget.id);(!o||o.closed)&&(r.clearInterval(),null===(i=e.widget)||void 0===i||i.close(),n(Error("User canceled")))}catch(i){r.clearInterval(),null===(t=e.widget)||void 0===t||t.close(),n(Error("Internal error"))}},200)},r)}},{key:"openLoginWidget",value:function(e){var r=this;return t(function(){var n,i;return a(this,function(o){switch(o.label){case 0:return(n=new URL(r._url)).pathname="/before-oauth",n.searchParams.append("move_to",e),n.searchParams.append("token_to","login_lib"),n.searchParams.append("locale",null!==(i=r.language)&&void 0!==i?i:"en"),[4,r.openWidget(n.toString(),"Window")];case 1:return o.sent(),[2,new Promise(function(n,i){var o,s=r.throwUserCancel();s.catch(function(e){s.timer.clearInterval(),r.removeListener("setToken",u),i(e)});var u=(o=t(function(t){var o;return a(this,function(a){switch(a.label){case 0:if(!(o=t.customToken))return[3,4];if(!o.includes("error"))return[3,2];return[4,r._wepinStorage.clearLocalStorage(r.appId,m)];case 1:return a.sent(),i(Error(o)),s.timer.clearInterval(),r.widget.close(),[2];case 2:return[4,r.doFirebaseLoginWithCustomToken(o,e)];case 3:return n.apply(void 0,[a.sent()]),[3,6];case 4:return[4,r._wepinStorage.clearLocalStorage(r.appId,m)];case 5:a.sent(),i(Error("User canceled")),a.label=6;case 6:return s.timer.clearInterval(),r.widget.close(),[2]}})}),function(e){return o.apply(this,arguments)});r.once("setToken",u)})]}})})()}},{key:"loginOAuth2",value:function(e){var r=this;return t(function(){var t,n;return a(this,function(i){switch(i.label){case 0:return[4,r._wepinStorage.getLocalStorage(r.appId,m)];case 1:if(!((t=i.sent())&&!e.withLogout))return[3,4];return[4,r._wepinFetch.wepinFirebaseApi.getRefreshIdToken(null==t?void 0:t.refreshToken)];case 2:return n=i.sent(),[4,r.setCookieData({idToken:n,refreshToken:null==t?void 0:t.refreshToken,provider:e.provider})];case 3:return i.sent(),[2,{provider:e.provider,token:{idToken:n,refreshToken:null==t?void 0:t.refreshToken}}];case 4:return[4,r.openLoginWidget(e.provider)];case 5:return[2,i.sent()]}})})()}},{key:"loginWithOauthProvider",value:function(e){var r=this;return t(function(){var t;return a(this,function(n){switch(n.label){case 0:if(!r._isInitialized)throw Error("Wepin login module Not initialized");return[4,r._wepinStorage.getLocalStorage(r.appId,m)];case 1:return t=n.sent(),[4,r.initCookieData(e.withLogout||t&&t.provider!==e.provider)];case 2:if(n.sent(),k.includes(e.provider))return[2,r.loginOAuth2(e)];throw Error("Invalid provider")}})})()}},{key:"logout",value:function(){var e=this;return t(function(){return a(this,function(r){switch(r.label){case 0:if(!e._isInitialized)throw Error("Wepin login module Not initialized");return[4,e.initCookieData(!0)];case 1:if(r.sent())return[2,!0];throw Error("Already logout")}})})()}},{key:"signUpWithEmailAndPassword",value:function(e,r,n){var i=this;return t(function(){var t,o,s;return a(this,function(a){switch(a.label){case 0:if(!i._isInitialized)throw Error("Wepin login module Not initialized");if(e&&!y.test(e))throw Error("The email does not match the correct format.");return[4,i.initCookieData(!0)];case 1:return a.sent(),[4,W({email:e.trim(),locale:i.language,isRequireVerified:i.appEmailVerified,wepinFetch:i._wepinFetch,wepinUrl:new URL(u(c(i._appKey)).wallet),openWepinWallet:n})];case 2:if(o=(t=a.sent()).oobReset,s=t.oobVerify,r&&!_.test(r))throw Error("The password does not match the correct format.");return[4,S({oobReset:o,oobVerify:s,email:e.trim(),password:r,wepinFetch:i._wepinFetch})];case 3:return a.sent(),[4,i.loginWithEmailAndResetPasswordState(e,r)];case 4:return[2,a.sent()]}})})()}},{key:"changePassword",value:function(e,r,n){var i=this;return t(function(){var t,o,s,u,c,l,f;return a(this,function(a){switch(a.label){case 0:return[4,i._wepinFetch.wepinApi.user.getUserPasswordState({email:e.trim()})];case 1:if(p(o=a.sent())){if(400!==o.statusCode||!o.message.includes("not exist"))throw Error(o.message);t=!0}else t=o.isPasswordResetRequired;if(!t)return[2,n];return[4,i._wepinFetch.wepinApi.user.login({idToken:n.idToken})];case 2:if(p(s=a.sent()))throw Error(s.message);return[4,i._wepinFetch.wepinFirebaseApi.updatePassword(n.idToken,r)];case 3:if(d(u=a.sent()))throw Error(null===(c=u.error)||void 0===c?void 0:c.message);return[4,i._wepinFetch.setToken({accessToken:s.token.access,refreshToken:s.token.refresh})];case 4:return a.sent(),[4,i._wepinFetch.wepinApi.user.updateUserPasswordState({userId:s.userInfo.userId},{isPasswordResetRequired:!1})];case 5:if(d(l=a.sent()))throw Error(null===(f=l.error)||void 0===f?void 0:f.message);return[4,i._wepinFetch.wepinApi.user.logout({userId:s.userInfo.userId})];case 6:return a.sent(),[4,i._wepinFetch.setToken(void 0)];case 7:return a.sent(),[2,{idToken:u.idToken,refreshToken:u.refreshToken}]}})})()}},{key:"loginWithEmailAndResetPasswordState",value:function(e,r){var n=this;return t(function(){var t,i,o,s,u,c;return a(this,function(a){switch(a.label){case 0:return[4,n.initCookieData(!0)];case 1:return a.sent(),t=!1,[4,n._wepinFetch.wepinApi.user.getUserPasswordState({email:e.trim()})];case 2:if(p(i=a.sent())){if(400!==i.statusCode||!i.message.includes("not exist"))throw Error(i.message);t=!0}else t=i.isPasswordResetRequired;return[4,n._wepinFetch.wepinFirebaseApi.signInWithEmailPassword(e.trim(),r,!t)];case 3:return s=(o=a.sent()).idToken,u=o.refreshToken,[4,n.changePassword(e,r,{idToken:s,refreshToken:u})];case 4:return c=a.sent(),[4,n.setCookieData({idToken:c.idToken,refreshToken:c.refreshToken,provider:"email"})];case 5:return a.sent(),[2,{provider:"email",token:{idToken:c.idToken,refreshToken:c.refreshToken}}]}})})()}},{key:"loginWithEmailAndPassword",value:function(e,r){var n=this;return t(function(){var t,i,o,s;return a(this,function(a){switch(a.label){case 0:if(!n._isInitialized)throw Error("Wepin login module Not initialized");if(e&&!y.test(e))throw Error("The email does not match the correct format.");if(r&&!_.test(r))throw Error("The password does not match the correct format.");return[4,n._wepinFetch.wepinApi.user.checkEmailExist({email:e})];case 1:if(p(t=a.sent()))throw Error(t.message);if(i=t.isEmailExist,o=t.isEmailverified,s=t.providerIds,!(i&&o&&s.includes("password")))return[3,3];return[4,n.loginWithEmailAndResetPasswordState(e,r)];case 2:return[2,a.sent()];case 3:throw Error("required/signup-email");case 4:return[2]}})})()}},{key:"doFirebaseLoginWithCustomToken",value:function(e,r){var n=this;return t(function(){var t,i,o;return a(this,function(a){switch(a.label){case 0:return[4,n._wepinFetch.wepinFirebaseApi.signInWithCustomToken(e)];case 1:return i=(t=a.sent()).idToken,o=t.refreshToken,[4,n.setCookieData({idToken:i,refreshToken:o,provider:r})];case 2:return a.sent(),[2,{provider:r,token:{idToken:i,refreshToken:o}}]}})})()}},{key:"loginWithIdToken",value:function(e){var r=this;return t(function(){var t;return a(this,function(n){switch(n.label){case 0:if(!r._isInitialized)throw Error("Wepin login module Not initialized");return[4,r.initCookieData(!0)];case 1:return n.sent(),[4,r._wepinFetch.wepinApi.user.loginOAuthIdToken({idToken:e.token,sign:e.sign})];case 2:if(p(t=n.sent()))throw Error(t.message);return[4,r.doFirebaseLoginWithCustomToken(t.token,"external_token")];case 3:return[2,n.sent()]}})})()}},{key:"loginWithAccessToken",value:function(e){var r=this;return t(function(){var t;return a(this,function(n){switch(n.label){case 0:if(!r._isInitialized)throw Error("Wepin login module Not initialized");return[4,r.initCookieData(!0)];case 1:return n.sent(),[4,r._wepinFetch.wepinApi.user.loginOAuthAccessToken({provider:e.provider,accessToken:e.token,sign:e.sign})];case 2:if(p(t=n.sent()))throw Error(t.message);return[4,r.doFirebaseLoginWithCustomToken(t.token,"external_token")];case 3:return[2,n.sent()]}})})()}},{key:"loginWepin",value:function(e){var r=e.provider,n=e.token,i=this;return t(function(){var e,t,o,s;return a(this,function(a){switch(a.label){case 0:if(!i._isInitialized)throw Error("Wepin.loginWithoutUI: wepin sdk has to be initialized");if(!n.idToken||!n.refreshToken)throw Error("Wepin.loginWithoutUI: idToken and refreshToken are required");return[4,i._wepinFetch.wepinApi.user.login({idToken:n.idToken})];case 1:if(p(e=a.sent()))throw Error(e.message);return[4,i._wepinStorage.setLoginUserLocalStorage(i.appId,{provider:r,token:n},e)];case 2:return t=a.sent(),[4,i._wepinFetch.setToken(t.connectUser)];case 3:return a.sent(),[4,i._wepinStorage.getLocalStorage(i.appId,"user_status")];case 4:return o=a.sent(),[4,i._wepinStorage.getLocalStorage(i.appId,"wallet_id")];case 5:return s=a.sent(),"pinRequired"===o.loginStatus&&(o.pinRequired=!0),[2,Object.assign(t.userInfo,{walletId:s,userStatus:o,token:t.connectUser})]}})})()}},{key:"openWidget",value:function(e,r){var n=this;return t(function(){var t,i,o;return a(this,function(a){switch(a.label){case 0:if(a.trys.push([0,7,,8]),t=b(n),"Frame"!=r)return[3,2];return[4,n._wepinModal.openModal(e,t,{isHide:!0})];case 1:return n.widget=a.sent(),h.getWebview(n.widget.id).src=e,[3,6];case 2:return[4,n._wepinModal.openAuthBrowser(e,t)];case 3:if(n.widget=a.sent(),(i=h.getWebview(n.widget.id)).location.href=e,i)return[3,5];return[4,n._wepinModal.openAuthBrowser(e,t)];case 4:return n.widget=a.sent(),i.location.href=e,[3,6];case 5:i.focus(),a.label=6;case 6:return[2,!0];case 7:throw o=a.sent(),E.error(o),Error("Failed to open widget");case 8:return[2]}})})()}},{key:"closeWidget",value:function(){if(this.widget)this.widget.close(),this.widget=void 0;else throw Error("Widget is not exist")}}],function(e,r){for(var t=0;t<r.length;t++){var n=r[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}(P.prototype,F),P}(s);