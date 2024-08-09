"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),Object.defineProperty(exports,"WebviewEventHandler",{enumerable:!0,get:function(){return i}});var e,t=(e=require("@metamask/safe-event-emitter"))&&e.__esModule?e:{default:e},n=require("./WebviewMessage.js");function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var i=function(){"use strict";var e;function i(e){!function(e,t){if(!(e instanceof t))throw TypeError("Cannot call a class as a function")}(this,i),r(this,"eventEmitter",new t.default),r(this,"checkValidEvent",function(){return!0}),(null==e?void 0:e.checkValidEvent)&&(this.checkValidEvent=e.checkValidEvent)}return e=[{key:"getEventListenerFunction",value:function(){var e=this;return function(t){e.checkValidEvent(t)&&Object.prototype.hasOwnProperty.call(t.data,"header")&&Object.prototype.hasOwnProperty.call(t.data,"body")&&e.handleMessage(t.data)}}},{key:"setCheckValidEventFunction",value:function(e){this.checkValidEvent=e}},{key:"addRequestHandler",value:function(e,t){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2];if(n){this.eventEmitter.once("request"+e,t);return}this.eventEmitter.addListener("request"+e,t)}},{key:"removeRequestHandler",value:function(e,t){this.eventEmitter.removeListener("request"+e,t)}},{key:"addResponseHandler",value:function(e,t){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2];if(n){this.eventEmitter.once("response"+e,t);return}this.eventEmitter.addListener("response"+e,t)}},{key:"removeResponseHandler",value:function(e,t){this.eventEmitter.removeListener("response"+e,t)}},{key:"addGlobalHandler",value:function(e,t){this.eventEmitter.addListener(e,t)}},{key:"removeGlobalHandler",value:function(e,t){this.eventEmitter.removeListener(e,t)}},{key:"handleMessage",value:function(e){(0,n.isWebviewRequestMessage)(e)?(this.eventEmitter.emit("pre_request",e),this.eventEmitter.emit("request"+e.body.command,e),this.eventEmitter.emit("post_request",e)):(0,n.isWebviewResponseMessage)(e)?(this.eventEmitter.emit("pre_response",e),this.eventEmitter.emit("response"+e.header.id.toString(),e),this.eventEmitter.emit("post_response",e)):console.error("Failed to handle message:",e)}}],function(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}(i.prototype,e),i}();