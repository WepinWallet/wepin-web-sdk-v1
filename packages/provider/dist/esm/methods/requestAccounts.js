import{ethErrors as e}from"eth-rpc-errors";import{requestFactory as r}from"../utils/requestFactory.js";import{getSelectedAddress as n}from"../utils/selectedAddress.js";export var requestAccounts=function(t){var i=t.wepinProvider,o=t.network;return function(t,d,s,u){if(!i._isInitialized){u(e.provider.unauthorized());return}var l,p={network:o};null===(l=n(i.wepinStorage,i.wepinAppId,o))||void 0===l||l.then(function(e){(null==e?void 0:e.address)?(window.evmproviders.Wepin.selectedAddress=null==e?void 0:e.address,d.result=[null==e?void 0:e.address],u()):r({wepinProvider:i,network:o,req:t,res:d,next:s,end:u,command:"request_enable",parameter:p})})}};