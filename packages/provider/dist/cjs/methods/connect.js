"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),Object.defineProperty(exports,"connect",{enumerable:!0,get:function(){return n}});var e=require("eth-rpc-errors"),r=require("../utils/requestFactory.js"),t=require("../utils/selectedAddress.js"),n=function(n){var i=n.wepinProvider,o=n.network;return function(n,s,d,u){if(!i._isInitialized){u(e.ethErrors.provider.unauthorized());return}var l,a={network:o};null===(l=(0,t.getSelectedAddress)(i.wepinStorage,i.wepinAppId,o))||void 0===l||l.then(function(e){(null==e?void 0:e.address)?(window.wepin.solana.Wepin.publicKey=null==e?void 0:e.address,s.result=[null==e?void 0:e.address],u()):(0,r.requestFactory)({wepinProvider:i,network:o,req:n,res:s,next:d,end:u,command:"request_enable",parameter:a})})}};