"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),Object.defineProperty(exports,"WepinLogin",{enumerable:!0,get:function(){return v}});var e=require("@wepin/common"),r=require("@wepin/fetch-js"),t=f(require("@wepin/login-js/package.json")),i=require("@wepin/modal-js"),n=f(require("@wepin/storage-js")),o=require("./const/CookieName.js"),s=require("./const/Provider.js"),a=require("./const/regExp.js"),u=require("./utils/IntervalPromise.js"),c=f(require("./utils/log.js")),l=require("./utils/loginWepin.js"),p=require("./utils/signUpEmail.js");function d(e,r,t,i,n,o,s){try{var a=e[o](s),u=a.value}catch(e){t(e);return}a.done?r(u):Promise.resolve(u).then(i,n)}function h(e){return function(){var r=this,t=arguments;return new Promise(function(i,n){var o=e.apply(r,t);function s(e){d(o,i,n,s,a,"next",e)}function a(e){d(o,i,n,s,a,"throw",e)}s(void 0)})}}function w(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function f(e){return e&&e.__esModule?e:{default:e}}function g(e,r){var t,i,n,o,s={label:0,sent:function(){if(1&n[0])throw n[1];return n[1]},trys:[],ops:[]};return o={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function a(o){return function(a){return function(o){if(t)throw TypeError("Generator is already executing.");for(;s;)try{if(t=1,i&&(n=2&o[0]?i.return:o[0]?i.throw||((n=i.return)&&n.call(i),0):i.next)&&!(n=n.call(i,o[1])).done)return n;switch(i=0,n&&(o=[2&o[0],n.value]),o[0]){case 0:case 1:n=o;break;case 4:return s.label++,{value:o[1],done:!1};case 5:s.label++,i=o[1],o=[0];continue;case 7:o=s.ops.pop(),s.trys.pop();continue;default:if(!(n=(n=s.trys).length>0&&n[n.length-1])&&(6===o[0]||2===o[0])){s=0;continue}if(3===o[0]&&(!n||o[1]>n[0]&&o[1]<n[3])){s.label=o[1];break}if(6===o[0]&&s.label<n[1]){s.label=n[1],n=o;break}if(n&&s.label<n[2]){s.label=n[2],s.ops.push(o);break}n[2]&&s.ops.pop(),s.trys.pop();continue}o=r.call(e,s)}catch(e){o=[6,e],i=0}finally{t=n=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,a])}}}var v=function(){"use strict";var d;function f(r){var o=r.appId,s=r.appKey;!function(e,r){if(!(e instanceof r))throw TypeError("Cannot call a class as a function")}(this,f),w(this,"version",void 0),w(this,"type",void 0),w(this,"appId",void 0),w(this,"_appKey",void 0),w(this,"_isInitialized",void 0),w(this,"_wepinModal",void 0),w(this,"_wepinStorage",void 0),w(this,"_wepinFetch",void 0),w(this,"widget",void 0),w(this,"_url",void 0),w(this,"appEmailVerified",void 0),w(this,"language",void 0),w(this,"webviewEventHandler",new e.WebviewEventHandler),this.version=t.default.version,this.appId=o,this._appKey=s,this._isInitialized=!1,this.widget=void 0,this._wepinModal=new i.WepinModal,this._wepinStorage=new n.default,this.type=this._wepinStorage.platform,this._url=new URL((0,e.getUrlsByMode)((0,e.getModeByAppKey)(s)).wepinWebview),console.log("WepinLogin v".concat(this.version))}return d=[{key:"init",value:function(e){var t=this;return h(function(){var i;return g(this,function(n){switch(n.label){case 0:if(t._isInitialized)throw Error("Already initialized");return t.language=null!=e?e:"en",t._wepinFetch=new r.WepinFetch({appId:t.appId,appKey:t._appKey,domain:t._wepinModal.domain,sdk:{version:t.version,type:"".concat(t.type,"-login")},storage:t._wepinStorage}),[4,t._wepinFetch.init()];case 1:return n.sent(),[4,t._wepinFetch.wepinApi.app.getAppInfo({platform:r.WepinPlatformType[t.type],withNetwork:!1})];case 2:if(i=n.sent(),(0,r.isErrorResponse)(i))throw Error(i.message);return t.appEmailVerified=i.appInfo.property.emailVerify,t.appId=t._wepinFetch.appId=i.appInfo.id,t._isInitialized=!0,[2]}})})()}},{key:"finalize",value:function(){var e;this._isInitialized=!1,null===(e=this.widget)||void 0===e||e.close()}},{key:"changeLanguage",value:function(e){this.language=e}},{key:"isInitialized",value:function(){return this._isInitialized}},{key:"initCookieData",value:function(e){var r=this;return h(function(){var t;return g(this,function(i){switch(i.label){case 0:return[4,r._wepinStorage.getLocalStorage(r.appId,o.COOKIE_NAME)];case 1:if(t=i.sent(),!(e&&t))return[3,4];return[4,r._wepinStorage.clearLocalStorage(r.appId,o.COOKIE_NAME)];case 2:return i.sent(),[4,r._wepinStorage.clearAllLocalStorage(r.appId)];case 3:i.sent(),i.label=4;case 4:return[2,t]}})})()}},{key:"setCookieData",value:function(e){var r=this;return h(function(){return g(this,function(t){switch(t.label){case 0:return[4,r._wepinStorage.setLocalStorage(r.appId,o.COOKIE_NAME,e)];case 1:return t.sent(),[2]}})})()}},{key:"throwUserCancel",value:function(){var e=this,r=new u.Timer;return new u.TimerPromise(function(t,n){"Window"===e.widget.type&&r.setInterval(function(){try{var t,o,s=i.Widget.getWebview(e.widget.id);(!s||s.closed)&&(r.clearInterval(),null===(o=e.widget)||void 0===o||o.close(),n(Error("User canceled")))}catch(i){r.clearInterval(),null===(t=e.widget)||void 0===t||t.close(),n(Error("Internal error"))}},200)},r)}},{key:"openLoginWidget",value:function(r){var t=this;return h(function(){var i,n;return g(this,function(s){switch(s.label){case 0:return(i=new URL(t._url)).pathname="/before-oauth",i.searchParams.append("move_to",r),i.searchParams.append("token_to","login_lib"),i.searchParams.append("locale",null!==(n=t.language)&&void 0!==n?n:"en"),[4,t.openWidget(i.toString(),"Window")];case 1:return s.sent(),[2,new Promise(function(i,n){var s,a=t.throwUserCancel();a.catch(function(e){a.timer.clearInterval(),t.webviewEventHandler.removeRequestHandler("set_token",u),n(e)});var u=(s=h(function(s){var u,c;return g(this,function(l){switch(l.label){case 0:if(!(u=s.body.parameter.customToken))return[3,4];if(!u.includes("error"))return[3,2];return[4,t._wepinStorage.clearLocalStorage(t.appId,o.COOKIE_NAME)];case 1:return l.sent(),n(Error(u)),a.timer.clearInterval(),t.widget.close(),[2];case 2:return[4,t.doFirebaseLoginWithCustomToken(u,r)];case 3:return i.apply(void 0,[l.sent()]),[3,6];case 4:return[4,t._wepinStorage.clearLocalStorage(t.appId,o.COOKIE_NAME)];case 5:l.sent(),n(Error("User canceled")),l.label=6;case 6:return a.timer.clearInterval(),t.widget.close(),c=(0,e.makeWepinResponseMessage)(s,"SUCCESS",{}),t.widget.response(c),[2]}})}),function(e){return s.apply(this,arguments)});t.webviewEventHandler.addRequestHandler("set_token",u,!0)})]}})})()}},{key:"loginOAuth2",value:function(e){var r=this;return h(function(){var t,i;return g(this,function(n){switch(n.label){case 0:return[4,r._wepinStorage.getLocalStorage(r.appId,o.COOKIE_NAME)];case 1:if(!((t=n.sent())&&!e.withLogout))return[3,4];return[4,r._wepinFetch.wepinFirebaseApi.getRefreshIdToken(null==t?void 0:t.refreshToken)];case 2:return i=n.sent(),[4,r.setCookieData({idToken:i,refreshToken:null==t?void 0:t.refreshToken,provider:e.provider})];case 3:return n.sent(),[2,{provider:e.provider,token:{idToken:i,refreshToken:null==t?void 0:t.refreshToken}}];case 4:return[4,r.openLoginWidget(e.provider)];case 5:return[2,n.sent()]}})})()}},{key:"loginWithOauthProvider",value:function(e){var r=this;return h(function(){var t;return g(this,function(i){switch(i.label){case 0:if(!r._isInitialized)throw Error("Wepin login module Not initialized");return[4,r._wepinStorage.getLocalStorage(r.appId,o.COOKIE_NAME)];case 1:return t=i.sent(),[4,r.initCookieData(e.withLogout||t&&t.provider!==e.provider)];case 2:if(i.sent(),s.OAUTH2.includes(e.provider))return[2,r.loginOAuth2(e)];throw Error("Invalid provider")}})})()}},{key:"logout",value:function(){var e=this;return h(function(){return g(this,function(r){switch(r.label){case 0:if(!e._isInitialized)throw Error("Wepin login module Not initialized");return[4,e.initCookieData(!0)];case 1:if(r.sent())return[2,!0];throw Error("Already logout")}})})()}},{key:"signUpWithEmailAndPassword",value:function(r,t,i){var n=this;return h(function(){var o,s,u;return g(this,function(c){switch(c.label){case 0:if(!n._isInitialized)throw Error("Wepin login module Not initialized");if(r&&!a.emailRegExp.test(r))throw Error("The email does not match the correct format.");return[4,n.initCookieData(!0)];case 1:return c.sent(),[4,(0,p.checkAndVerifyEmail)({email:r.trim(),locale:n.language,isRequireVerified:n.appEmailVerified,wepinFetch:n._wepinFetch,wepinUrl:new URL((0,e.getUrlsByMode)((0,e.getModeByAppKey)(n._appKey)).wallet),openWepinWallet:i})];case 2:if(s=(o=c.sent()).oobReset,u=o.oobVerify,t&&!a.passwordRegExp.test(t))throw Error("The password does not match the correct format.");return[4,(0,p.signUpEmail)({oobReset:s,oobVerify:u,email:r.trim(),password:t,wepinFetch:n._wepinFetch})];case 3:return c.sent(),[4,n.loginWithEmailAndResetPasswordState(r,t)];case 4:return[2,c.sent()]}})})()}},{key:"changePassword",value:function(e,t,i){var n=this;return h(function(){var o,s,a,u,c,l,p;return g(this,function(d){switch(d.label){case 0:return[4,n._wepinFetch.wepinApi.user.getUserPasswordState({email:e.trim()})];case 1:if(s=d.sent(),(0,r.isErrorResponse)(s)){if(400!==s.statusCode||!s.message.includes("not exist"))throw Error(s.message);o=!0}else o=s.isPasswordResetRequired;if(!o)return[2,i];return[4,n._wepinFetch.wepinApi.user.login({idToken:i.idToken})];case 2:if(a=d.sent(),(0,r.isErrorResponse)(a))throw Error(a.message);return[4,n._wepinFetch.wepinFirebaseApi.updatePassword(i.idToken,t)];case 3:if(u=d.sent(),(0,r.isFirebaseErrorResponse)(u))throw Error(null===(c=u.error)||void 0===c?void 0:c.message);return[4,n._wepinFetch.setToken({accessToken:a.token.access,refreshToken:a.token.refresh})];case 4:return d.sent(),[4,n._wepinFetch.wepinApi.user.updateUserPasswordState({userId:a.userInfo.userId},{isPasswordResetRequired:!1})];case 5:if(l=d.sent(),(0,r.isFirebaseErrorResponse)(l))throw Error(null===(p=l.error)||void 0===p?void 0:p.message);return[4,n._wepinFetch.wepinApi.user.logout({userId:a.userInfo.userId})];case 6:return d.sent(),[4,n._wepinFetch.setToken(void 0)];case 7:return d.sent(),[2,{idToken:u.idToken,refreshToken:u.refreshToken}]}})})()}},{key:"loginWithEmailAndResetPasswordState",value:function(e,t){var i=this;return h(function(){var n,o,s,a,u,c;return g(this,function(l){switch(l.label){case 0:return[4,i.initCookieData(!0)];case 1:return l.sent(),n=!1,[4,i._wepinFetch.wepinApi.user.getUserPasswordState({email:e.trim()})];case 2:if(o=l.sent(),(0,r.isErrorResponse)(o)){if(400!==o.statusCode||!o.message.includes("not exist"))throw Error(o.message);n=!0}else n=o.isPasswordResetRequired;return[4,i._wepinFetch.wepinFirebaseApi.signInWithEmailPassword(e.trim(),t,!n)];case 3:return a=(s=l.sent()).idToken,u=s.refreshToken,[4,i.changePassword(e,t,{idToken:a,refreshToken:u})];case 4:return c=l.sent(),[4,i.setCookieData({idToken:c.idToken,refreshToken:c.refreshToken,provider:"email"})];case 5:return l.sent(),[2,{provider:"email",token:{idToken:c.idToken,refreshToken:c.refreshToken}}]}})})()}},{key:"loginWithEmailAndPassword",value:function(e,t){var i=this;return h(function(){var n,o,s,u;return g(this,function(c){switch(c.label){case 0:if(!i._isInitialized)throw Error("Wepin login module Not initialized");if(e&&!a.emailRegExp.test(e))throw Error("The email does not match the correct format.");if(t&&!a.passwordRegExp.test(t))throw Error("The password does not match the correct format.");return[4,i._wepinFetch.wepinApi.user.checkEmailExist({email:e})];case 1:if(n=c.sent(),(0,r.isErrorResponse)(n))throw Error(n.message);if(o=n.isEmailExist,s=n.isEmailverified,u=n.providerIds,!(o&&s&&u.includes("password")))return[3,3];return[4,i.loginWithEmailAndResetPasswordState(e,t)];case 2:return[2,c.sent()];case 3:throw Error("required/signup-email");case 4:return[2]}})})()}},{key:"doFirebaseLoginWithCustomToken",value:function(e,r){var t=this;return h(function(){var i,n,o;return g(this,function(s){switch(s.label){case 0:return[4,t._wepinFetch.wepinFirebaseApi.signInWithCustomToken(e)];case 1:return n=(i=s.sent()).idToken,o=i.refreshToken,[4,t.setCookieData({idToken:n,refreshToken:o,provider:r})];case 2:return s.sent(),[2,{provider:r,token:{idToken:n,refreshToken:o}}]}})})()}},{key:"loginWithIdToken",value:function(e){var t=this;return h(function(){var i;return g(this,function(n){switch(n.label){case 0:if(!t._isInitialized)throw Error("Wepin login module Not initialized");return[4,t.initCookieData(!0)];case 1:return n.sent(),[4,t._wepinFetch.wepinApi.user.loginOAuthIdToken({idToken:e.token,sign:e.sign})];case 2:if(i=n.sent(),(0,r.isErrorResponse)(i))throw Error(i.message);return[4,t.doFirebaseLoginWithCustomToken(i.token,"external_token")];case 3:return[2,n.sent()]}})})()}},{key:"loginWithAccessToken",value:function(e){var t=this;return h(function(){var i;return g(this,function(n){switch(n.label){case 0:if(!t._isInitialized)throw Error("Wepin login module Not initialized");return[4,t.initCookieData(!0)];case 1:return n.sent(),[4,t._wepinFetch.wepinApi.user.loginOAuthAccessToken({provider:e.provider,accessToken:e.token,sign:e.sign})];case 2:if(i=n.sent(),(0,r.isErrorResponse)(i))throw Error(i.message);return[4,t.doFirebaseLoginWithCustomToken(i.token,"external_token")];case 3:return[2,n.sent()]}})})()}},{key:"getRefreshFirebaseToken",value:function(){var e=this;return h(function(){var r;return g(this,function(t){switch(t.label){case 0:if(!e._isInitialized)throw Error("Wepin.loginWepin: wepin sdk has to be initialized");return[4,(0,l.checkExistFirebaseLoginSession)(e.appId,e._wepinFetch,e._wepinStorage)];case 1:if(!t.sent())return[3,3];return[4,e._wepinStorage.getLocalStorage(e.appId,"firebase:wepin")];case 2:return[2,{provider:(r=t.sent()).provider,token:{idToken:r.idToken,refreshToken:r.refreshToken}}];case 3:throw Error("invalid login session");case 4:return[2]}})})()}},{key:"loginWepin",value:function(e){var t=e.provider,i=e.token,n=this;return h(function(){var e,o,s,a;return g(this,function(u){switch(u.label){case 0:if(!n._isInitialized)throw Error("Wepin.loginWepin: wepin sdk has to be initialized");if(!i.idToken||!i.refreshToken)throw Error("Wepin.loginWepin: idToken and refreshToken are required");return[4,n._wepinFetch.wepinApi.user.login({idToken:i.idToken})];case 1:if(e=u.sent(),(0,r.isErrorResponse)(e))throw Error(e.message);return[4,n._wepinStorage.setLoginUserLocalStorage(n.appId,{provider:t,token:i},e)];case 2:return o=u.sent(),[4,n._wepinFetch.setToken(o.connectUser)];case 3:return u.sent(),[4,n._wepinStorage.getLocalStorage(n.appId,"user_status")];case 4:return s=u.sent(),[4,n._wepinStorage.getLocalStorage(n.appId,"wallet_id")];case 5:return a=u.sent(),"pinRequired"===s.loginStatus&&(s.pinRequired=!0),[2,Object.assign(o.userInfo,{walletId:a,userStatus:s,token:o.connectUser})]}})})()}},{key:"getCurrentWepinUser",value:function(){var e=this;return h(function(){var r;return g(this,function(t){switch(t.label){case 0:if(!e._isInitialized)throw Error("Wepin.getCurrentWepinUser: wepin sdk has to be initialized");return[4,(0,l.checkExistWepinLoginSession)(e.appId,e._wepinFetch,e._wepinStorage)];case 1:if(!t.sent())throw Error("invalid login session");return[4,(0,l.getLoginUserStorage)(e.appId,e._wepinStorage)];case 2:if(!(r=t.sent()))throw Error("invalid login session");return[2,r]}})})()}},{key:"openWidget",value:function(e,r){var t=this;return h(function(){var n,o,s;return g(this,function(a){switch(a.label){case 0:if(a.trys.push([0,7,,8]),n=t.webviewEventHandler.getEventListenerFunction(),"Frame"!=r)return[3,2];return[4,t._wepinModal.openModal(e,n,{isHide:!0})];case 1:return t.widget=a.sent(),i.Widget.getWebview(t.widget.id).src=e,[3,6];case 2:return[4,t._wepinModal.openAuthBrowser(e,n)];case 3:if(t.widget=a.sent(),(o=i.Widget.getWebview(t.widget.id)).location.href=e,o)return[3,5];return[4,t._wepinModal.openAuthBrowser(e,n)];case 4:return t.widget=a.sent(),o.location.href=e,[3,6];case 5:o.focus(),a.label=6;case 6:return[2,!0];case 7:throw s=a.sent(),c.default.error(s),Error("Failed to open widget");case 8:return[2]}})})()}},{key:"closeWidget",value:function(){if(this.widget)this.widget.close(),this.widget=void 0;else throw Error("Widget is not exist")}}],function(e,r){for(var t=0;t<r.length;t++){var i=r[t];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}(f.prototype,d),f}();