import{ethErrors as e}from"eth-rpc-errors";import{requestFactory as r}from"../utils/requestFactory.js";import{getSelectedAddress as n}from"../utils/selectedAddress.js";export var connect=function(i){var o=i.wepinProvider,t=i.network;return function(i,d,s,u){if(!o._isInitialized){u(e.provider.unauthorized());return}var a,l={network:t};null===(a=n(o.wepinStorage,o.wepinAppId,t))||void 0===a||a.then(function(e){(null==e?void 0:e.address)?(window.wepin.solana.Wepin.publicKey=null==e?void 0:e.address,d.result=[null==e?void 0:e.address],u()):r({wepinProvider:o,network:t,req:i,res:d,next:s,end:u,command:"request_enable",parameter:l})})}};