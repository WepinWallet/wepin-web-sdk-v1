"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),function(r,e){for(var t in e)Object.defineProperty(r,t,{enumerable:!0,get:e[t]})}(exports,{getRpcPromiseCallback:function(){return r},isValidChainId:function(){return e}});var r=function(r,e){var t=!(arguments.length>2)||void 0===arguments[2]||arguments[2];return function(n,i){n||i.error?e(n||i.error):!t||Array.isArray(i)?r(i):r(i.result)}},e=function(r){return!!r&&"string"==typeof r&&r.startsWith("0x")};