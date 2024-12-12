"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),Object.defineProperty(exports,"solanaSendTransaction",{enumerable:!0,get:function(){return n}});var r=require("eth-rpc-errors"),e=require("../utils/paramChecker.js"),a=require("../utils/selectedAddress.js"),s=require("../utils/solanaParser.js"),t=require("../utils/utils.js"),i=require("./sendTransaction.js"),n=function(n){var o=n.wepinProvider,u=n.network;return function(n,d,c,l){if(!o._isInitialized){l(r.ethErrors.provider.unauthorized());return}var p,v,h=!1;Object.keys(n.params).includes("message")||(l(r.ethErrors.rpc.invalidParams()),h=!0);try{if(p=(0,s.parsingSolanaTransaction)(Object.values(n.params)[0]),void 0===p.value){var m=Object.values(n.params)[0];p.data=m.startsWith("0x")?m:"0x"+m}else(0,e.signTransactionParameterChecker)(p)||(l(r.ethErrors.rpc.invalidParams()),h=!0)}catch(e){l(r.ethErrors.rpc.invalidParams());return}var f=null!==(v=p.from)&&void 0!==v?v:"";(0,a.getSelectedAddress)(o.wepinStorage,o.wepinAppId,u).then(function(e){if((null==e?void 0:e.address)!==(0,t.getAddress)(u,f)){l(r.ethErrors.provider.unauthorized());return}h||(n.params=[p],(0,i.sendTransaction)({wepinProvider:o,network:u})(n,d,c,l))})}};