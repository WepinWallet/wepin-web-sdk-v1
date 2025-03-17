"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),Object.defineProperty(exports,"WepinLogin",{enumerable:!0,get:function(){return g}});var e=require("@wepin/common"),r=require("@wepin/fetch-js"),i=require("@wepin/modal-js"),t=/*#__PURE__*/f(require("@wepin/storage-js")),n=require("./const/CookieName.js"),o=require("./const/regExp.js"),s=require("./const/version.js"),a=require("./utils/IntervalPromise.js"),u=/*#__PURE__*/f(require("./utils/log.js")),c=require("./utils/loginWepin.js"),l=require("./utils/signUpEmail.js");function p(e,r,i,t,n,o,s){try{var a=e[o](s),u=a.value}catch(e){i(e);return}a.done?r(u):Promise.resolve(u).then(t,n)}function d(e){return function(){var r=this,i=arguments;return new Promise(function(t,n){var o=e.apply(r,i);function s(e){p(o,t,n,s,a,"next",e)}function a(e){p(o,t,n,s,a,"throw",e)}s(void 0)})}}function h(e,r,i){return r in e?Object.defineProperty(e,r,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[r]=i,e}function f(e){return e&&e.__esModule?e:{default:e}}function w(e,r){var i,t,n,o,s={label:0,sent:function(){if(1&n[0])throw n[1];return n[1]},trys:[],ops:[]};return o={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function a(o){return function(a){return function(o){if(i)throw TypeError("Generator is already executing.");for(;s;)try{if(i=1,t&&(n=2&o[0]?t.return:o[0]?t.throw||((n=t.return)&&n.call(t),0):t.next)&&!(n=n.call(t,o[1])).done)return n;switch(t=0,n&&(o=[2&o[0],n.value]),o[0]){case 0:case 1:n=o;break;case 4:return s.label++,{value:o[1],done:!1};case 5:s.label++,t=o[1],o=[0];continue;case 7:o=s.ops.pop(),s.trys.pop();continue;default:if(!(n=(n=s.trys).length>0&&n[n.length-1])&&(6===o[0]||2===o[0])){s=0;continue}if(3===o[0]&&(!n||o[1]>n[0]&&o[1]<n[3])){s.label=o[1];break}if(6===o[0]&&s.label<n[1]){s.label=n[1],n=o;break}if(n&&s.label<n[2]){s.label=n[2],s.ops.push(o);break}n[2]&&s.ops.pop(),s.trys.pop();continue}o=r.call(e,s)}catch(e){o=[6,e],t=0}finally{i=n=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,a])}}}var g=/*#__PURE__*/function(){"use strict";var p;function f(r){var n=r.appId,o=r.appKey;!function(e,r){if(!(e instanceof r))throw TypeError("Cannot call a class as a function")}(this,f),h(this,"version",void 0),h(this,"type",void 0),h(this,"appId",void 0),h(this,"_appKey",void 0),h(this,"_isInitialized",void 0),h(this,"_wepinModal",void 0),h(this,"_wepinStorage",void 0),h(this,"_wepinFetch",void 0),h(this,"widget",void 0),h(this,"_url",void 0),h(this,"appEmailVerified",void 0),h(this,"language",void 0),h(this,"webviewEventHandler",new e.WebviewEventHandler),this.version=s.version,this.appId=n,this._appKey=o,this._isInitialized=!1,this.widget=void 0,this._wepinModal=new i.WepinModal,this._wepinStorage=new t.default,this.type=this._wepinStorage.platform,this._url=new URL((0,e.getUrlsByMode)((0,e.getModeByAppKey)(o)).wepinWebview),console.log("WepinLogin v".concat(this.version))}return p=[{key:"init",value:function(e){var i=this;return d(function(){var t;return w(this,function(n){switch(n.label){case 0:if(i._isInitialized)throw Error("Already initialized");return i.language=null!=e?e:"en",i._wepinFetch=new r.WepinFetch({appId:i.appId,appKey:i._appKey,domain:i._wepinModal.domain,sdk:{version:i.version,type:"".concat(i.type,"-login")},storage:i._wepinStorage}),[4,i._wepinFetch.init()];case 1:return n.sent(),[4,i._wepinFetch.wepinApi.app.getAppInfo({platform:r.WepinPlatformType[i.type],withNetwork:!1})];case 2:if(t=n.sent(),(0,r.isErrorResponse)(t))throw Error(t.message);return i.appEmailVerified=t.appInfo.property.emailVerify,i.appId=i._wepinFetch.appId=t.appInfo.id,i._isInitialized=!0,[2]}})})()}},{key:"finalize",value:function(){var e;this._isInitialized=!1,null===(e=this.widget)||void 0===e||e.close()}},{key:"changeLanguage",value:function(e){this.language=e}},{key:"isInitialized",value:function(){return this._isInitialized}},{key:"initCookieData",value:function(e){var r=this;return d(function(){var i;return w(this,function(t){switch(t.label){case 0:return[4,r._wepinStorage.getLocalStorage(r.appId,n.COOKIE_NAME)];case 1:if(i=t.sent(),!(e&&i))return[3,4];return[4,r._wepinStorage.clearLocalStorage(r.appId,n.COOKIE_NAME)];case 2:return t.sent(),[4,r._wepinStorage.clearAllLocalStorage(r.appId)];case 3:t.sent(),t.label=4;case 4:return[2,i]}})})()}},{key:"setCookieData",value:function(e){var r=this;return d(function(){return w(this,function(i){switch(i.label){case 0:return[4,r._wepinStorage.setLocalStorage(r.appId,n.COOKIE_NAME,e)];case 1:return i.sent(),[2]}})})()}},{key:"throwUserCancel",value:function(){var e=this,r=new a.Timer;return new a.TimerPromise(function(t,n){"Window"===e.widget.type&&r.setInterval(function(){try{var t,o,s=i.Widget.getWebview(e.widget.id);(!s||s.closed)&&(r.clearInterval(),null===(o=e.widget)||void 0===o||o.close(),n(Error("User canceled")))}catch(i){r.clearInterval(),null===(t=e.widget)||void 0===t||t.close(),n(Error("Internal error"))}},200)},r)}},{key:"openLoginWidget",value:function(r){var i=this;return d(function(){var t,o;return w(this,function(s){switch(s.label){case 0:return(t=new URL(i._url)).pathname="/before-oauth",t.searchParams.append("move_to",r),t.searchParams.append("token_to","login_lib"),t.searchParams.append("locale",null!==(o=i.language)&&void 0!==o?o:"en"),[4,i.openWidget(t.toString(),"Window")];case 1:return s.sent(),[2,new Promise(function(t,o){var s,a=i.throwUserCancel();a.catch(function(e){a.timer.clearInterval(),i.webviewEventHandler.removeRequestHandler("set_token",u),o(e)});var u=(s=d(function(s){var u,c,l,p,d,h;return w(this,function(f){switch(f.label){case 0:if(c=(u=s.body.parameter).customToken,l=u.provider,p=u.idToken,d=u.accessToken,!c)return[3,4];if(!c.includes("error"))return[3,2];return[4,i._wepinStorage.clearLocalStorage(i.appId,n.COOKIE_NAME)];case 1:return f.sent(),o(Error(c)),a.timer.clearInterval(),i.widget.close(),[2];case 2:return[4,i.doFirebaseLoginWithCustomToken(c,r)];case 3:return t.apply(void 0,[f.sent()]),[3,7];case 4:if(!(l&&(p||d)))return[3,5];return t({error:"required/register_email",provider:l,idToken:p,accessToken:d}),[3,7];case 5:return[4,i._wepinStorage.clearLocalStorage(i.appId,n.COOKIE_NAME)];case 6:f.sent(),o(Error("User canceled")),f.label=7;case 7:return a.timer.clearInterval(),i.widget.close(),h=(0,e.makeWepinResponseMessage)(s,"SUCCESS",{}),i.widget.response(h),[2]}})}),function(e){return s.apply(this,arguments)});i.webviewEventHandler.addRequestHandler("set_token",u,!0)})]}})})()}},{key:"loginOAuth2",value:function(e){var r=this;return d(function(){var i,t;return w(this,function(o){switch(o.label){case 0:return[4,r._wepinStorage.getLocalStorage(r.appId,n.COOKIE_NAME)];case 1:if(!((i=o.sent())&&!e.withLogout))return[3,4];return[4,r._wepinFetch.wepinFirebaseApi.getRefreshIdToken(null==i?void 0:i.refreshToken)];case 2:return t=o.sent(),[4,r.setCookieData({idToken:t,refreshToken:null==i?void 0:i.refreshToken,provider:e.provider})];case 3:return o.sent(),[2,{provider:e.provider,token:{idToken:t,refreshToken:null==i?void 0:i.refreshToken}}];case 4:return[4,r.openLoginWidget(e.provider)];case 5:return[2,o.sent()]}})})()}},{key:"checkProvider",value:function(r){if(!e.OAUTH2.includes(r))throw Error("Invalid provider")}},{key:"loginWithOauthProvider",value:function(e){var r=this;return d(function(){var i;return w(this,function(t){switch(t.label){case 0:if(!r._isInitialized)throw Error("Wepin login module Not initialized");return[4,r._wepinStorage.getLocalStorage(r.appId,n.COOKIE_NAME)];case 1:return i=t.sent(),[4,r.initCookieData(e.withLogout||i&&i.provider!==e.provider)];case 2:return t.sent(),r.checkProvider(e.provider),[2,r.loginOAuth2(e)]}})})()}},{key:"logout",value:function(){var e=this;return d(function(){return w(this,function(r){switch(r.label){case 0:if(!e._isInitialized)throw Error("Wepin login module Not initialized");return[4,e.initCookieData(!0)];case 1:if(r.sent())return[2,!0];throw Error("Already logout")}})})()}},{key:"signUpWithEmailAndPassword",value:function(r,i,t){var n=this;return d(function(){var s,a,u;return w(this,function(c){switch(c.label){case 0:if(!n._isInitialized)throw Error("Wepin login module Not initialized");if(r&&!o.emailRegExp.test(r))throw Error("The email does not match the correct format.");return[4,n.initCookieData(!0)];case 1:return c.sent(),[4,(0,l.checkAndVerifyEmail)({email:r.trim(),locale:n.language,isRequireVerified:n.appEmailVerified,wepinFetch:n._wepinFetch,wepinUrl:new URL((0,e.getUrlsByMode)((0,e.getModeByAppKey)(n._appKey)).wallet),openWepinWallet:t})];case 2:if(a=(s=c.sent()).oobReset,u=s.oobVerify,i&&!o.passwordRegExp.test(i))throw Error("The password does not match the correct format.");return[4,(0,l.signUpEmail)({oobReset:a,oobVerify:u,email:r.trim(),password:i,wepinFetch:n._wepinFetch})];case 3:return c.sent(),[4,n.loginWithEmailAndResetPasswordState(r,i)];case 4:return[2,c.sent()]}})})()}},{key:"changePassword",value:function(e,i,t){var n=this;return d(function(){var o,s,a,u,c,l,p;return w(this,function(d){switch(d.label){case 0:return[4,n._wepinFetch.wepinApi.user.getUserPasswordState({email:e.trim()})];case 1:if(s=d.sent(),(0,r.isErrorResponse)(s)){if(400!==s.statusCode||!s.message.includes("not exist"))throw Error(s.message);o=!0}else o=s.isPasswordResetRequired;if(!o)return[2,t];return[4,n._wepinFetch.wepinApi.user.login({idToken:t.idToken})];case 2:if(a=d.sent(),(0,r.isErrorResponse)(a))throw Error(a.message);return[4,n._wepinFetch.wepinFirebaseApi.updatePassword(t.idToken,i)];case 3:if(u=d.sent(),(0,r.isFirebaseErrorResponse)(u))throw Error(null===(c=u.error)||void 0===c?void 0:c.message);return[4,n._wepinFetch.setToken({accessToken:a.token.access,refreshToken:a.token.refresh})];case 4:return d.sent(),[4,n._wepinFetch.wepinApi.user.updateUserPasswordState({userId:a.userInfo.userId},{isPasswordResetRequired:!1})];case 5:if(l=d.sent(),(0,r.isFirebaseErrorResponse)(l))throw Error(null===(p=l.error)||void 0===p?void 0:p.message);return[4,n._wepinFetch.wepinApi.user.logout({userId:a.userInfo.userId})];case 6:return d.sent(),[4,n._wepinFetch.setToken(void 0)];case 7:return d.sent(),[2,{idToken:u.idToken,refreshToken:u.refreshToken}]}})})()}},{key:"loginWithEmailAndResetPasswordState",value:function(e,i){var t=this;return d(function(){var n,o,s,a,u,c;return w(this,function(l){switch(l.label){case 0:return[4,t.initCookieData(!0)];case 1:return l.sent(),n=!1,[4,t._wepinFetch.wepinApi.user.getUserPasswordState({email:e.trim()})];case 2:if(o=l.sent(),(0,r.isErrorResponse)(o)){if(400!==o.statusCode||!o.message.includes("not exist"))throw Error(o.message);n=!0}else n=o.isPasswordResetRequired;return[4,t._wepinFetch.wepinFirebaseApi.signInWithEmailPassword(e.trim(),i,!n)];case 3:return a=(s=l.sent()).idToken,u=s.refreshToken,[4,t.changePassword(e,i,{idToken:a,refreshToken:u})];case 4:return c=l.sent(),[4,t.setCookieData({idToken:c.idToken,refreshToken:c.refreshToken,provider:"email"})];case 5:return l.sent(),[2,{provider:"email",token:{idToken:c.idToken,refreshToken:c.refreshToken}}]}})})()}},{key:"loginWithEmailAndPassword",value:function(e,i){var t=this;return d(function(){var n,s,a,u;return w(this,function(c){switch(c.label){case 0:if(!t._isInitialized)throw Error("Wepin login module Not initialized");if(e&&!o.emailRegExp.test(e))throw Error("The email does not match the correct format.");if(i&&!o.passwordRegExp.test(i))throw Error("The password does not match the correct format.");return[4,t._wepinFetch.wepinApi.user.checkEmailExist({email:e})];case 1:if(n=c.sent(),(0,r.isErrorResponse)(n))throw Error(n.message);if(s=n.isEmailExist,a=n.isEmailverified,u=n.providerIds,!(s&&a&&u.includes("password")))return[3,3];return[4,t.loginWithEmailAndResetPasswordState(e,i)];case 2:return[2,c.sent()];case 3:throw Error("required/signup-email");case 4:return[2]}})})()}},{key:"doFirebaseLoginWithCustomToken",value:function(e,r){var i=this;return d(function(){var t,n,o;return w(this,function(s){switch(s.label){case 0:return[4,i._wepinFetch.wepinFirebaseApi.signInWithCustomToken(e)];case 1:return n=(t=s.sent()).idToken,o=t.refreshToken,[4,i.setCookieData({idToken:n,refreshToken:o,provider:r})];case 2:return s.sent(),[2,{provider:r,token:{idToken:n,refreshToken:o}}]}})})()}},{key:"loginWithToken",value:function(e){var i=this;return d(function(){var t;return w(this,function(n){switch(n.label){case 0:if(!i._isInitialized)throw Error("Wepin login module Not initialized");return[4,i.initCookieData(!0)];case 1:if(n.sent(),"id"!==e.type)return[3,3];return[4,i._wepinFetch.wepinApi.user.loginOAuthIdToken({idToken:e.token,sign:e.sign})];case 2:return t=n.sent(),[3,5];case 3:return[4,i._wepinFetch.wepinApi.user.loginOAuthAccessToken({provider:e.provider,accessToken:e.token,sign:e.sign})];case 4:t=n.sent(),n.label=5;case 5:if((0,r.isErrorResponse)(t)){if(428===t.statusCode)return[2,function(e){for(var r=1;r<arguments.length;r++){var i=null!=arguments[r]?arguments[r]:{},t=Object.keys(i);"function"==typeof Object.getOwnPropertySymbols&&(t=t.concat(Object.getOwnPropertySymbols(i).filter(function(e){return Object.getOwnPropertyDescriptor(i,e).enumerable}))),t.forEach(function(r){h(e,r,i[r])})}return e}({error:"required/register_email"},"id"===e.type?{idToken:e.token}:{provider:e.provider,accessToken:e.token})];throw Error(t.message)}return[4,i.doFirebaseLoginWithCustomToken(t.token,"external_token")];case 6:return[2,n.sent()]}})})()}},{key:"loginWithIdToken",value:function(e){var r=this;return d(function(){return w(this,function(i){return[2,r.loginWithToken({type:"id",token:e.token,sign:e.sign})]})})()}},{key:"loginWithAccessToken",value:function(e){var r=this;return d(function(){return w(this,function(i){return r.checkProvider(e.provider),[2,r.loginWithToken({type:"access",provider:e.provider,token:e.token,sign:e.sign})]})})()}},{key:"sendVerifyEmail",value:function(e){var i=this;return d(function(){var t,n,s,a,u,c;return w(this,function(l){switch(l.label){case 0:if(!i._isInitialized)throw Error("Wepin login module Not initialized");if(t=e.email,n=e.provider,s=e.idToken,a=e.accessToken,!t)throw Error("Email is required.");if(!o.emailRegExp.test(t))throw Error("The email does not match the correct format.");if(i.checkProvider(e.provider),!s&&!a)throw Error("Either idToken or accessToken is required.");return u="ko"===i.language?1:"ja"===i.language?3:2,[4,i._wepinFetch.wepinApi.user.OAuthVerifyEmail({email:t,provider:n,idToken:s,accessToken:a,localeId:u})];case 1:if(c=l.sent(),(0,r.isErrorResponse)(c)||(0,r.isFirebaseErrorResponse)(c))throw Error(JSON.stringify("message"in c?c.message:"error"in c?c.error:c));return[2,c.result]}})})()}},{key:"getRefreshFirebaseToken",value:function(e){var i=this;return d(function(){var t,n;return w(this,function(o){switch(o.label){case 0:if(!i._isInitialized)throw Error("Wepin.getRefreshFirebaseToken: wepin sdk has to be initialized");if(!e)return[3,4];o.label=1;case 1:return o.trys.push([1,3,,4]),[4,i._wepinFetch.wepinFirebaseApi.getRefreshIdToken(e.token.refreshToken)];case 2:if(t=o.sent(),(0,r.isFirebaseErrorResponse)(t))throw Error("Wepin.getRefreshFirebaseToken: wepin sdk has to be initialized");return[2,{provider:e.provider,token:{idToken:t,refreshToken:e.token.refreshToken}}];case 3:throw o.sent(),Error("Wepin.getRefreshFirebaseToken: wepin sdk has to be initialized");case 4:return[4,(0,c.checkExistFirebaseLoginSession)(i.appId,i._wepinFetch,i._wepinStorage)];case 5:if(!o.sent())return[3,7];return[4,i._wepinStorage.getLocalStorage(i.appId,"firebase:wepin")];case 6:return[2,{provider:(n=o.sent()).provider,token:{idToken:n.idToken,refreshToken:n.refreshToken}}];case 7:throw Error("invalid login session");case 8:return[2]}})})()}},{key:"loginWepin",value:function(e){var i=e.provider,t=e.token,n=this;return d(function(){var e,o,s,a;return w(this,function(u){switch(u.label){case 0:if(!n._isInitialized)throw Error("Wepin.loginWepin: wepin sdk has to be initialized");if(!t.idToken||!t.refreshToken)throw Error("Wepin.loginWepin: idToken and refreshToken are required");return[4,n._wepinFetch.wepinApi.user.login({idToken:t.idToken})];case 1:if(e=u.sent(),(0,r.isErrorResponse)(e))throw Error(e.message);return[4,n._wepinStorage.setLoginUserLocalStorage(n.appId,{provider:i,token:t},e)];case 2:return o=u.sent(),[4,n._wepinFetch.setToken(o.connectUser)];case 3:return u.sent(),[4,n._wepinStorage.getLocalStorage(n.appId,"user_status")];case 4:return s=u.sent(),[4,n._wepinStorage.getLocalStorage(n.appId,"wallet_id")];case 5:return a=u.sent(),"pinRequired"===s.loginStatus&&(s.pinRequired=!0),[2,Object.assign(o.userInfo,{walletId:a,userStatus:s,token:o.connectUser})]}})})()}},{key:"getCurrentWepinUser",value:function(){var e=this;return d(function(){var r;return w(this,function(i){switch(i.label){case 0:if(!e._isInitialized)throw Error("Wepin.getCurrentWepinUser: wepin sdk has to be initialized");return[4,(0,c.checkExistWepinLoginSession)(e.appId,e._wepinFetch,e._wepinStorage)];case 1:if(!i.sent())throw Error("invalid login session");return[4,(0,c.getLoginUserStorage)(e.appId,e._wepinStorage)];case 2:if(!(r=i.sent()))throw Error("invalid login session");return[2,r]}})})()}},{key:"openWidget",value:function(e,r){var t=this;return d(function(){var n,o,s;return w(this,function(a){switch(a.label){case 0:if(a.trys.push([0,7,,8]),n=t.webviewEventHandler.getEventListenerFunction(),"Frame"!=r)return[3,2];return[4,t._wepinModal.openModal(e,n,{isHide:!0})];case 1:return t.widget=a.sent(),i.Widget.getWebview(t.widget.id).src=e,[3,6];case 2:return[4,t._wepinModal.openAuthBrowser(e,n)];case 3:if(t.widget=a.sent(),(o=i.Widget.getWebview(t.widget.id)).location.href=e,o)return[3,5];return[4,t._wepinModal.openAuthBrowser(e,n)];case 4:return t.widget=a.sent(),o.location.href=e,[3,6];case 5:o.focus(),a.label=6;case 6:return[2,!0];case 7:throw s=a.sent(),u.default.error(s),Error("Failed to open widget");case 8:return[2]}})})()}},{key:"closeWidget",value:function(){if(this.widget)this.widget.close(),this.widget=void 0;else throw Error("Widget is not exist")}}],function(e,r){for(var i=0;i<r.length;i++){var t=r[i];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(e,t.key,t)}}(f.prototype,p),f}();