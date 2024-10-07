"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),Object.defineProperty(exports,"solanaSendTransaction",{enumerable:!0,get:function(){return n}});var e=require("eth-rpc-errors"),r=require("../utils/paramChecker.js"),a=require("../utils/selectedAddress.js"),s=require("../utils/utils.js"),i=require("./sendTransaction.js"),n=function(n){var t=n.wepinProvider,o=n.network;return function(n,d,u,c){if(!t._isInitialized){c(e.ethErrors.provider.unauthorized());return}var l,p=!1;Object.keys(n.params).includes("message")||(c(e.ethErrors.rpc.invalidParams()),p=!0);var v=(0,r.parsingSolanaTransaction)(Object.values(n.params)[0]);void 0===v.value?v.data="0x"+Object.values(n.params)[0]:(0,r.signTransactionParameterChecker)(v)||(c(e.ethErrors.rpc.invalidParams()),p=!0);var m=null!==(l=v.from)&&void 0!==l?l:"";(0,a.getSelectedAddress)(t.wepinStorage,t.wepinAppId,o).then(function(r){if((null==r?void 0:r.address)!==(0,s.getAddress)(o,m)){c(e.ethErrors.provider.unauthorized());return}p||(n.params=[v],(0,i.sendTransaction)({wepinProvider:t,network:o})(n,d,u,c))})}};