"use strict";function t(t,e){if(!(t instanceof e))throw TypeError("Cannot call a class as a function")}function e(t,r,n){return(e=u()?Reflect.construct:function(t,e,r){var n=[null];n.push.apply(n,e);var i=new(Function.bind.apply(t,n));return r&&o(i,r.prototype),i}).apply(null,arguments)}function r(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function n(t){return(n=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function o(t,e){return(o=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function i(t){var r="function"==typeof Map?new Map:void 0;return(i=function(t){if(null===t||-1===Function.toString.call(t).indexOf("[native code]"))return t;if("function"!=typeof t)throw TypeError("Super expression must either be null or a function");if(void 0!==r){if(r.has(t))return r.get(t);r.set(t,i)}function i(){return e(t,arguments,n(this).constructor)}return i.prototype=Object.create(t.prototype,{constructor:{value:i,enumerable:!1,writable:!0,configurable:!0}}),o(i,t)})(t)}function u(){try{var t=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){}))}catch(t){}return(u=function(){return!!t})()}Object.defineProperty(exports,"__esModule",{value:!0}),function(t,e){for(var r in e)Object.defineProperty(t,r,{enumerable:!0,get:e[r]})}(exports,{Timer:function(){return c},TimerPromise:function(){return a}});var c=/*#__PURE__*/function(){"use strict";var e;function n(){t(this,n),r(this,"intervalTimer",void 0),r(this,"timeoutTimer",void 0)}return e=[{key:"setInterval",value:function(t,e){this.intervalTimer=setInterval(t,e)}},{key:"clearInterval",value:function(){clearInterval(this.intervalTimer),this.intervalTimer=void 0}},{key:"setTimeout",value:function(t,e){this.timeoutTimer=setTimeout(t,e)}},{key:"clearTimeout",value:function(){clearTimeout(this.timeoutTimer),this.timeoutTimer=void 0}}],function(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}(n.prototype,e),n}(),a=/*#__PURE__*/function(e){"use strict";function i(e,o){var c,a,l,f;return t(this,i),a=i,l=[e],a=n(a),r(c=(f=u()?Reflect.construct(a,l||[],n(this).constructor):a.apply(this,l))&&("object"==(f&&"undefined"!=typeof Symbol&&f.constructor===Symbol?"symbol":typeof f)||"function"==typeof f)?f:function(t){if(void 0===t)throw ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(this),"timer",void 0),c.timer=o,c}return!function(t,e){if("function"!=typeof e&&null!==e)throw TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&o(t,e)}(i,e),i}(i(Promise));