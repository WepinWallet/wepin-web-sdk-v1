"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),function(e,r){for(var o in r)Object.defineProperty(e,o,{enumerable:!0,get:r[o]})}(exports,{isErrorResponse:function(){return e},isFirebaseErrorResponse:function(){return r}});var e=function(e){var r=void 0!==e.statusCode||void 0!==e.status,o=void 0!==e.timestamp&&void 0!==e.message&&void 0!==e.path;return r&&o},r=function(e){var r,o;return void 0!==e.error||(null===(r=e.error)||void 0===r?void 0:r.code)!==void 0||(null===(o=e.error)||void 0===o?void 0:o.message)!==void 0};