function t(t){if(void 0===t)throw ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function e(t,e){if(!(t instanceof e))throw TypeError("Cannot call a class as a function")}function r(t,e,n){return(r=c()?Reflect.construct:function(t,e,r){var n=[null];n.push.apply(n,e);var o=new(Function.bind.apply(t,n));return r&&i(o,r.prototype),o}).apply(null,arguments)}function n(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function o(t){return(o=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function i(t,e){return(i=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function u(t){var e="function"==typeof Map?new Map:void 0;return(u=function(t){if(null===t||-1===Function.toString.call(t).indexOf("[native code]"))return t;if("function"!=typeof t)throw TypeError("Super expression must either be null or a function");if(void 0!==e){if(e.has(t))return e.get(t);e.set(t,n)}function n(){return r(t,arguments,o(this).constructor)}return n.prototype=Object.create(t.prototype,{constructor:{value:n,enumerable:!1,writable:!0,configurable:!0}}),i(n,t)})(t)}function c(){if("undefined"==typeof Reflect||!Reflect.construct||Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch(t){return!1}}export var Timer=function(){var t;function r(){e(this,r),n(this,"intervalTimer",void 0),n(this,"timeoutTimer",void 0)}return t=[{key:"setInterval",value:function(t,e){this.intervalTimer=setInterval(t,e)}},{key:"clearInterval",value:function(){clearInterval(this.intervalTimer),this.intervalTimer=void 0}},{key:"setTimeout",value:function(t,e){this.timeoutTimer=setTimeout(t,e)}},{key:"clearTimeout",value:function(){clearTimeout(this.timeoutTimer),this.timeoutTimer=void 0}}],function(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}(r.prototype,t),r}();export var TimerPromise=function(r){!function(t,e){if("function"!=typeof e&&null!==e)throw TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&i(t,e)}(f,r);var u,a=(u=c(),function(){var e,r=o(f);return e=u?Reflect.construct(r,arguments,o(this).constructor):r.apply(this,arguments),e&&("object"==(e&&"undefined"!=typeof Symbol&&e.constructor===Symbol?"symbol":typeof e)||"function"==typeof e)?e:t(this)});function f(r,o){var i;return e(this,f),n(t(i=a.call(this,r)),"timer",void 0),i.timer=o,i}return f}(u(Promise));