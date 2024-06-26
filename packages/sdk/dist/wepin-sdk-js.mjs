var Zt = Object.defineProperty;
var Ht = Object.getOwnPropertySymbols;
var Vt = Object.prototype.hasOwnProperty, Jt = Object.prototype.propertyIsEnumerable;
var Kt = (P, c, O) => c in P ? Zt(P, c, { enumerable: !0, configurable: !0, writable: !0, value: O }) : P[c] = O, Xt = (P, c) => {
  for (var O in c || (c = {}))
    Vt.call(c, O) && Kt(P, O, c[O]);
  if (Ht)
    for (var O of Ht(c))
      Jt.call(c, O) && Kt(P, O, c[O]);
  return P;
};
var wt = (P, c, O) => new Promise((q, X) => {
  var t = (U) => {
    try {
      l(O.next(U));
    } catch ($) {
      X($);
    }
  }, F = (U) => {
    try {
      l(O.throw(U));
    } catch ($) {
      X($);
    }
  }, l = (U) => U.done ? q(U.value) : Promise.resolve(U.value).then(t, F);
  l((O = O.apply(P, c)).next());
});
var events$1 = { exports: {} }, R = typeof Reflect == "object" ? Reflect : null, ReflectApply = R && typeof R.apply == "function" ? R.apply : function(c, O, q) {
  return Function.prototype.apply.call(c, O, q);
}, ReflectOwnKeys;
R && typeof R.ownKeys == "function" ? ReflectOwnKeys = R.ownKeys : Object.getOwnPropertySymbols ? ReflectOwnKeys = function(c) {
  return Object.getOwnPropertyNames(c).concat(Object.getOwnPropertySymbols(c));
} : ReflectOwnKeys = function(c) {
  return Object.getOwnPropertyNames(c);
};
function ProcessEmitWarning(P) {
  console && console.warn && console.warn(P);
}
var NumberIsNaN = Number.isNaN || function(c) {
  return c !== c;
};
function EventEmitter$1() {
  EventEmitter$1.init.call(this);
}
events$1.exports = EventEmitter$1;
events$1.exports.once = once;
EventEmitter$1.EventEmitter = EventEmitter$1;
EventEmitter$1.prototype._events = void 0;
EventEmitter$1.prototype._eventsCount = 0;
EventEmitter$1.prototype._maxListeners = void 0;
var defaultMaxListeners = 10;
function checkListener(P) {
  if (typeof P != "function")
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof P);
}
Object.defineProperty(EventEmitter$1, "defaultMaxListeners", {
  enumerable: !0,
  get: function() {
    return defaultMaxListeners;
  },
  set: function(P) {
    if (typeof P != "number" || P < 0 || NumberIsNaN(P))
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + P + ".");
    defaultMaxListeners = P;
  }
});
EventEmitter$1.init = function() {
  (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) && (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0;
};
EventEmitter$1.prototype.setMaxListeners = function(c) {
  if (typeof c != "number" || c < 0 || NumberIsNaN(c))
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + c + ".");
  return this._maxListeners = c, this;
};
function _getMaxListeners(P) {
  return P._maxListeners === void 0 ? EventEmitter$1.defaultMaxListeners : P._maxListeners;
}
EventEmitter$1.prototype.getMaxListeners = function() {
  return _getMaxListeners(this);
};
EventEmitter$1.prototype.emit = function(c) {
  for (var O = [], q = 1; q < arguments.length; q++) O.push(arguments[q]);
  var X = c === "error", t = this._events;
  if (t !== void 0)
    X = X && t.error === void 0;
  else if (!X)
    return !1;
  if (X) {
    var F;
    if (O.length > 0 && (F = O[0]), F instanceof Error)
      throw F;
    var l = new Error("Unhandled error." + (F ? " (" + F.message + ")" : ""));
    throw l.context = F, l;
  }
  var U = t[c];
  if (U === void 0)
    return !1;
  if (typeof U == "function")
    ReflectApply(U, this, O);
  else
    for (var $ = U.length, D = arrayClone$1(U, $), q = 0; q < $; ++q)
      ReflectApply(D[q], this, O);
  return !0;
};
function _addListener(P, c, O, q) {
  var X, t, F;
  if (checkListener(O), t = P._events, t === void 0 ? (t = P._events = /* @__PURE__ */ Object.create(null), P._eventsCount = 0) : (t.newListener !== void 0 && (P.emit(
    "newListener",
    c,
    O.listener ? O.listener : O
  ), t = P._events), F = t[c]), F === void 0)
    F = t[c] = O, ++P._eventsCount;
  else if (typeof F == "function" ? F = t[c] = q ? [O, F] : [F, O] : q ? F.unshift(O) : F.push(O), X = _getMaxListeners(P), X > 0 && F.length > X && !F.warned) {
    F.warned = !0;
    var l = new Error("Possible EventEmitter memory leak detected. " + F.length + " " + String(c) + " listeners added. Use emitter.setMaxListeners() to increase limit");
    l.name = "MaxListenersExceededWarning", l.emitter = P, l.type = c, l.count = F.length, ProcessEmitWarning(l);
  }
  return P;
}
EventEmitter$1.prototype.addListener = function(c, O) {
  return _addListener(this, c, O, !1);
};
EventEmitter$1.prototype.on = EventEmitter$1.prototype.addListener;
EventEmitter$1.prototype.prependListener = function(c, O) {
  return _addListener(this, c, O, !0);
};
function onceWrapper() {
  if (!this.fired)
    return this.target.removeListener(this.type, this.wrapFn), this.fired = !0, arguments.length === 0 ? this.listener.call(this.target) : this.listener.apply(this.target, arguments);
}
function _onceWrap(P, c, O) {
  var q = { fired: !1, wrapFn: void 0, target: P, type: c, listener: O }, X = onceWrapper.bind(q);
  return X.listener = O, q.wrapFn = X, X;
}
EventEmitter$1.prototype.once = function(c, O) {
  return checkListener(O), this.on(c, _onceWrap(this, c, O)), this;
};
EventEmitter$1.prototype.prependOnceListener = function(c, O) {
  return checkListener(O), this.prependListener(c, _onceWrap(this, c, O)), this;
};
EventEmitter$1.prototype.removeListener = function(c, O) {
  var q, X, t, F, l;
  if (checkListener(O), X = this._events, X === void 0)
    return this;
  if (q = X[c], q === void 0)
    return this;
  if (q === O || q.listener === O)
    --this._eventsCount === 0 ? this._events = /* @__PURE__ */ Object.create(null) : (delete X[c], X.removeListener && this.emit("removeListener", c, q.listener || O));
  else if (typeof q != "function") {
    for (t = -1, F = q.length - 1; F >= 0; F--)
      if (q[F] === O || q[F].listener === O) {
        l = q[F].listener, t = F;
        break;
      }
    if (t < 0)
      return this;
    t === 0 ? q.shift() : spliceOne(q, t), q.length === 1 && (X[c] = q[0]), X.removeListener !== void 0 && this.emit("removeListener", c, l || O);
  }
  return this;
};
EventEmitter$1.prototype.off = EventEmitter$1.prototype.removeListener;
EventEmitter$1.prototype.removeAllListeners = function(c) {
  var O, q, X;
  if (q = this._events, q === void 0)
    return this;
  if (q.removeListener === void 0)
    return arguments.length === 0 ? (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0) : q[c] !== void 0 && (--this._eventsCount === 0 ? this._events = /* @__PURE__ */ Object.create(null) : delete q[c]), this;
  if (arguments.length === 0) {
    var t = Object.keys(q), F;
    for (X = 0; X < t.length; ++X)
      F = t[X], F !== "removeListener" && this.removeAllListeners(F);
    return this.removeAllListeners("removeListener"), this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0, this;
  }
  if (O = q[c], typeof O == "function")
    this.removeListener(c, O);
  else if (O !== void 0)
    for (X = O.length - 1; X >= 0; X--)
      this.removeListener(c, O[X]);
  return this;
};
function _listeners(P, c, O) {
  var q = P._events;
  if (q === void 0)
    return [];
  var X = q[c];
  return X === void 0 ? [] : typeof X == "function" ? O ? [X.listener || X] : [X] : O ? unwrapListeners(X) : arrayClone$1(X, X.length);
}
EventEmitter$1.prototype.listeners = function(c) {
  return _listeners(this, c, !0);
};
EventEmitter$1.prototype.rawListeners = function(c) {
  return _listeners(this, c, !1);
};
EventEmitter$1.listenerCount = function(P, c) {
  return typeof P.listenerCount == "function" ? P.listenerCount(c) : listenerCount.call(P, c);
};
EventEmitter$1.prototype.listenerCount = listenerCount;
function listenerCount(P) {
  var c = this._events;
  if (c !== void 0) {
    var O = c[P];
    if (typeof O == "function")
      return 1;
    if (O !== void 0)
      return O.length;
  }
  return 0;
}
EventEmitter$1.prototype.eventNames = function() {
  return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
};
function arrayClone$1(P, c) {
  for (var O = new Array(c), q = 0; q < c; ++q)
    O[q] = P[q];
  return O;
}
function spliceOne(P, c) {
  for (; c + 1 < P.length; c++)
    P[c] = P[c + 1];
  P.pop();
}
function unwrapListeners(P) {
  for (var c = new Array(P.length), O = 0; O < c.length; ++O)
    c[O] = P[O].listener || P[O];
  return c;
}
function once(P, c) {
  return new Promise(function(O, q) {
    function X(F) {
      P.removeListener(c, t), q(F);
    }
    function t() {
      typeof P.removeListener == "function" && P.removeListener("error", X), O([].slice.call(arguments));
    }
    eventTargetAgnosticAddListener(P, c, t, { once: !0 }), c !== "error" && addErrorHandlerIfEventEmitter(P, X, { once: !0 });
  });
}
function addErrorHandlerIfEventEmitter(P, c, O) {
  typeof P.on == "function" && eventTargetAgnosticAddListener(P, "error", c, O);
}
function eventTargetAgnosticAddListener(P, c, O, q) {
  if (typeof P.on == "function")
    q.once ? P.once(c, O) : P.on(c, O);
  else if (typeof P.addEventListener == "function")
    P.addEventListener(c, function X(t) {
      q.once && P.removeEventListener(c, X), O(t);
    });
  else
    throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof P);
}
var eventsExports = events$1.exports;
function safeApply(P, c, O) {
  try {
    Reflect.apply(P, c, O);
  } catch (q) {
    setTimeout(() => {
      throw q;
    });
  }
}
function arrayClone(P) {
  const c = P.length, O = new Array(c);
  for (let q = 0; q < c; q += 1)
    O[q] = P[q];
  return O;
}
class SafeEventEmitter extends eventsExports.EventEmitter {
  emit(c, ...O) {
    let q = c === "error";
    const X = this._events;
    if (X !== void 0)
      q = q && X.error === void 0;
    else if (!q)
      return !1;
    if (q) {
      let F;
      if (O.length > 0 && ([F] = O), F instanceof Error)
        throw F;
      const l = new Error(`Unhandled error.${F ? ` (${F.message})` : ""}`);
      throw l.context = F, l;
    }
    const t = X[c];
    if (t === void 0)
      return !1;
    if (typeof t == "function")
      safeApply(t, this, O);
    else {
      const F = t.length, l = arrayClone(t);
      for (let U = 0; U < F; U += 1)
        safeApply(l[U], this, O);
    }
    return !0;
  }
}
const name$2 = "@wepin/sdk-js", version$2 = "0.0.5", description$2 = "Wepin Widget Javascript SDK for Web", author$2 = "IoTrust, Co., Ltd.", homepage$1 = "https://github.com/WepinWallet/wepin-web-sdk-v1/", license$2 = "MIT", main$2 = "./dist/wepin-sdk-js.mjs", jsdelivr = "./dist/wepin-sdk-js.umd.js", types$2 = "./dist/src/index.d.ts", files$2 = [
  "dist"
], scripts$2 = {
  build: "vite build --mode production",
  dev: "vite build --mode development",
  watch: "vite build --watch",
  lint: "eslint . --ext .vue,.js,.jsx,.cjs,.mjs,.ts,.tsx,.cts,.mts --fix --ignore-path .gitignore"
}, keywords$2 = [
  "wepin",
  "wepinwallet",
  "wallet"
], dependencies$2 = {}, devDependencies$2 = {
  "@wepin/fetch-js": "link:../fetch",
  "@wepin/modal-js": "link:../modal",
  "@wepin/storage-js": "link:../storage",
  "@types/events": "^3.0.3",
  events: "^3.3.0",
  "jwt-decode": "^4.0.0"
}, PackageJson = {
  name: name$2,
  version: version$2,
  description: description$2,
  author: author$2,
  homepage: homepage$1,
  license: license$2,
  main: main$2,
  jsdelivr,
  types: types$2,
  files: files$2,
  scripts: scripts$2,
  keywords: keywords$2,
  dependencies: dependencies$2,
  devDependencies: devDependencies$2
}, WEPIN_DEFAULT_LANG = "ko", WEPIN_DEFAULT_CURRENCY = "krw", Dt = class Dt {
};
Dt.test = console.warn.bind(window.console, "[SDK][test] "), Dt.warn = console.warn.bind(window.console, "[SDK][warn] "), Dt.error = console.error.bind(window.console, "[SDK][error] "), Dt.todo = console.warn.bind(window.console, "[SDK][todo] "), Dt.assert = console.assert.bind(window.console), Dt.debug = () => {
};
let LOG = Dt;
const Gt = class Gt {
  static isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  }
  static messages(c) {
    return {
      hasValidOrigin: (O) => O.origin === Gt.getUrls(c).wepinWebview
      // hasCorrectCorrelationID(message: MessageEvent,
      //                         correlationID: string | undefined) {
      //     return correlationID && message.data && message.data.correlationID === correlationID;
      // }
    };
  }
  static getUrls(c) {
    switch (c) {
      case "production":
        return {
          wepinWebview: "https://v1-widget.wepin.io"
        };
      case "test":
        return {
          wepinWebview: "https://stage-v1-widget.wepin.io"
        };
      case "development":
        return {
          wepinWebview: "https://localhost:8989"
          //wepinWebview: 'https://dev-v1-widget.wepin.io',
        };
      case "local":
        return {
          wepinWebview: "https://local-widget.wepin.io"
        };
      default:
        throw new Error("Utils.getUrls: invalid mode");
    }
  }
  static uuidv4() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function(c) {
        const O = Math.random() * 16 | 0;
        return (c == "x" ? O : O & 3 | 8).toString(16);
      }
    );
  }
};
Gt.checkSameNumber = (c, O, q) => {
  if (q) return !1;
  const X = [...Array(10)].map(Number.prototype.valueOf, 0);
  let t = !1;
  return [...c].forEach((l) => {
    if (X[Number(l)]++, X[Number(l)] >= O) {
      t = !0;
      return;
    }
  }), t;
};
let Utils = Gt;
var d = (P, c, O) => new Promise((q, X) => {
  var t = (U) => {
    try {
      l(O.next(U));
    } catch ($) {
      X($);
    }
  }, F = (U) => {
    try {
      l(O.throw(U));
    } catch ($) {
      X($);
    }
  }, l = (U) => U.done ? q(U.value) : Promise.resolve(U.value).then(t, F);
  l((O = O.apply(P, c)).next());
});
const v = class {
  static closeOverlay(c) {
    const O = document.querySelector(`#${c}`);
    O && O.parentNode && O.parentNode.removeChild(O);
  }
  static openOverlay(c) {
    const O = document.createElement("div");
    O.id = c, O.classList.add(this.CONST.overlayClassName), O.style.zIndex = "2147483647", O.style.display = "flex", O.style.alignItems = "center", O.style.justifyContent = "center", O.style.textAlign = "center", O.style.position = "fixed", O.style.left = "0px", O.style.right = "0px", O.style.top = "0px", O.style.bottom = "0px", O.style.left = "0px", O.style.background = "rgba(0,0,0,0.6)", O.style.color = "white", O.style.border = "2px solid #f1f1f1";
    const q = document.getElementsByClassName(
      this.CONST.overlayClassName
    );
    for (let X = 0; X < q.length; X++) {
      const t = q.item(X);
      t && t.remove();
    }
    document.body.appendChild(O);
  }
};
v.CONST = {
  overlayClassName: "wepin-widget__overlay"
};
let m$2 = v;
const x = (P) => {
  const c = (P == null ? void 0 : P.width) || 375, O = (P == null ? void 0 : P.height) || 604, q = P != null && P.sLeft ? P == null ? void 0 : P.sLeft : window.screenLeft ? window.screenLeft : window.screenX ? window.screenX : 0, X = P != null && P.sTop ? P == null ? void 0 : P.sTop : window.screenTop ? window.screenTop : window.screenY ? window.screenY : 0, t = screen.width / 2 - c / 2 + q, F = screen.height / 2 - O / 2 + X;
  return `width=${c}, height=${O}, left=${t}, top=${F}scrollbars=yes, resizable=1, menubar=no, toolbar=no`;
}, b = (P) => {
  const c = document.createElement("iframe");
  return c.classList.add("wepin-sdk-widget-iframe"), c.setAttribute("frameborder", "0"), c.setAttribute("marginwidth", "0"), c.setAttribute("marginheight", "0"), c.style.width = "100%", P && P != null && P.isHide ? c.style.height = "0" : c.style.height = "100%", c.style.maxHeight = "100%", c.style.position = "fixed", c.style.bottom = "0", c.style.left = "0", c.style.zIndex = "408888000000", c.title = "wepin sdk webview", c.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; camera; clipboard-read", c.allowFullscreen = !0, c;
}, f$2 = () => "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(P) {
  const c = Math.random() * 16 | 0;
  return (P == "x" ? c : c & 3 | 8).toString(16);
}), a = class Ft extends m$2 {
  constructor(c, O, q, X, t) {
    super(), this.isWidgetReady = !1, this.url = c, this.id = `id-${f$2()}`, this.isHide = t, t || Ft.openOverlay(this.id), Ft._webview[this.id] = O, this.type = q, this.EL = X, window.addEventListener("message", this.EL), this._open = !0;
  }
  get isOpen() {
    return this._open;
  }
  // For communicating with the Wepin instance
  // private _wepin: Wepin
  // public get Wepin() {
  //   return this._wepin
  // }
  // For communicating with the Webview
  // private _webview: HTMLIFrameElement
  static getWebview(c) {
    return Ft._webview[c];
  }
  static clearWebview(c) {
    delete Ft._webview[c];
  }
  static clearAllWebview() {
    this._webview = {};
  }
  close() {
    this.isHide || Ft.closeOverlay(this.id), window.removeEventListener("message", this.EL), this._open = !1, this.isWidgetReady = !1, this._closeWebview();
  }
  response(c) {
    try {
      this._post(c);
    } catch (O) {
      console.error("Can not response message to the webview", O);
    }
  }
  request(c) {
    try {
      this._post(c);
    } catch (O) {
      console.error("Can not send message to the webview", O);
    }
  }
};
a._webview = {};
let r$2 = a, h$2 = class zt extends r$2 {
  // is it necessary ?
  constructor({
    url: c,
    // wepin,
    frame: O,
    EL: q,
    isHide: X
  }) {
    super(c, O, "Frame", q, X), O.src = c, O.id = this.id;
    const t = document.querySelector("body");
    zt.scrollPosition = window.pageYOffset, t.style.overflow = "hidden", t.style.position = "fixed", t.style.top = `-${zt.scrollPosition}px`, t.style.width = "100%", document.body.appendChild(O);
  }
  static openNew(c) {
    return d(this, arguments, function* ({
      url: O,
      EL: q,
      widgetOptions: X
    }) {
      const t = b({ isHide: X == null ? void 0 : X.isHide });
      return new zt({
        url: O,
        // wepin,
        frame: t,
        EL: q,
        isHide: X == null ? void 0 : X.isHide
      });
    });
  }
  expand() {
    const c = r$2.getWebview(this.id);
    c.style.height = "100%", c.style.borderRadius = "0";
  }
  shrink() {
    const c = r$2.getWebview(this.id);
    c.style.height = "604px", c.style.borderRadius = "12px 12px 0 0 ";
  }
  _closeWebview() {
    const c = setTimeout(() => {
      const O = r$2.getWebview(this.id), q = document.querySelector("body");
      q.style.removeProperty("overflow"), q.style.removeProperty("position"), q.style.removeProperty("top"), q.style.removeProperty("width"), window.scrollTo(0, zt.scrollPosition), O && document.body.removeChild(O), r$2.clearWebview(this.id), clearTimeout(c);
    }, 500);
  }
  _post(c) {
    r$2.getWebview(this.id).contentWindow.postMessage(c, this.url);
  }
};
class p extends r$2 {
  constructor({
    url: c,
    webview: O,
    EL: q
  }) {
    super(c, O, "Window", q, !1);
  }
  //: NodeJS.Timer | number
  static openNew(c) {
    return d(this, arguments, function* ({
      url: O,
      EL: q,
      widgetFeatures: X
    }) {
      const t = x(X), F = window.open(O, "Wepin_Widget", t), l = new p({
        url: O,
        webview: F,
        EL: q
      });
      if (!F)
        throw l.close(), new Error("popup window blocked");
      return this.timer = setInterval(() => {
        try {
          F && F.closed && (clearInterval(this.timer), l.close());
        } catch (U) {
          clearInterval(this.timer), l.close();
        }
      }, 200), l;
    });
  }
  expand() {
  }
  shrink() {
  }
  _closeWebview() {
    p.timer && (clearInterval(p.timer), p.timer = void 0);
    const c = r$2.getWebview(this.id);
    c && c.close(), r$2.clearWebview(this.id);
  }
  _post(c) {
    r$2.getWebview(this.id).postMessage(c, this.url);
  }
}
const u = "@wepin/modal-js", W = "0.0.2", C = "wepin widget modal", T = "IoTrust, Co., Ltd.", L = "MIT", N = "./dist/wepin-modal-js.mjs", _ = "dist/wepin-modal-js.umd.js", j = "./dist/src/index.d.ts", E = [
  "dist"
], I = {
  build: "vite build --mode production",
  dev: "vite build --mode development",
  watch: "vite build --watch",
  lint: "eslint . --ext .vue,.js,.jsx,.cjs,.mjs,.ts,.tsx,.cts,.mts --fix --ignore-path .gitignore"
}, k = [
  "wepin",
  "wepinwallet",
  "wallet",
  "wepin-modal"
], M = {
  name: u,
  version: W,
  description: C,
  author: T,
  license: L,
  main: N,
  jsdelivr: _,
  types: j,
  files: E,
  scripts: I,
  keywords: k
};
class A {
  //   constructor(appKey: string, appId: string) {
  constructor() {
    this.platformType = "web", this._modalWindow = null, this._modalFrame = null, console.log(`WepinModal v${M.version}`), this.domain = window.location.origin;
  }
  //   async init() {
  //     // getAppInfo수행해보고기..
  //     this._appId
  //     this._appKey
  //     this._isInitialized = true
  //     return this._isInitialized
  //   }
  openAuthBrowser(c, O) {
    return d(this, null, function* () {
      return this._modalWindow = yield p.openNew({
        url: c,
        EL: O
      }), this._modalWindow;
    });
  }
  openModal(c, O, q) {
    return d(this, null, function* () {
      return this._modalFrame = yield h$2.openNew({
        url: c,
        EL: O,
        widgetOptions: q
      }), this._modalFrame;
    });
  }
  closeAuthBrowser() {
    return d(this, null, function* () {
      this._modalWindow && this._modalWindow.close();
    });
  }
  closeModal() {
    return d(this, null, function* () {
      this._modalFrame && this._modalFrame.close();
    });
  }
}
const proxyToObject = (P) => {
  if (typeof P != "object" || P === null)
    return P;
  if (Array.isArray(P))
    return P.map(proxyToObject);
  const c = {};
  for (const O of Object.keys(P))
    c[O] = proxyToObject(P[O]);
  return c;
};
var Platform = /* @__PURE__ */ ((P) => (P[P.web = 1] = "web", P[P.android = 2] = "android", P[P.ios = 3] = "ios", P))(Platform || {});
const WebviewRequestHandler = (P, c, O) => {
  var t, F, l, U;
  const q = {
    header: {
      response_from: "web",
      response_to: "wepin_widget",
      id: P.header.id
    }
  };
  let X = O.appKey;
  switch (O.appKey.slice(0, 13) === "local_ak_dev_" ? X = O.appKey.slice(6) : X = O.appKey, P.body.command) {
    case "ready_to_widget":
      LOG.debug("ready_to_widget"), c.wepinStorage.getAllLocalStorage(O.appId).then(($) => {
        var te, ie, ne;
        const D = $ != null ? $ : {}, Q = Object.assign({}, c.wepinAppAttributes), V = (te = c.wepinAppAttributes.loginProviders) != null && te.length || ((ie = c.wepinAppAttributes.loginProviders) == null ? void 0 : ie.length) === 0 ? Array.from(c.wepinAppAttributes.loginProviders) : void 0;
        Q.loginProviders = V, q.body = {
          command: "ready_to_widget",
          state: "SUCCESS",
          data: {
            appKey: X,
            appId: O.appId,
            domain: c.wepinDomain,
            platform: Platform[c.type],
            attributes: Q,
            //Object.assign({}, wepinSDK.wepinAppAttributes),
            version: c.version.includes("-alpha") ? c.version.substring(0, c.version.indexOf("-")) : c.version,
            type: `${c.type}-sdk`,
            localDate: D
          }
        }, (ne = c.wepinWidget) != null && ne.isOpen && c.wepinWidget.response(q);
      });
      break;
    case "close_wepin_widget":
      c.wepinWidget && (c.wepinWidget.close(), c.wepinWidget = void 0), c.wepinStorage.getLocalStorage(
        O.appId,
        "user_info"
      ).then(($) => {
        var D;
        $ ? c.setUserInfo($, !0) : c.setUserInfo({ status: "fail" }, !0), c.removeAllListeners(), c.specifiedEmail = void 0, (D = c.wepinWidget) != null && D.isOpen && c.wepinWidget.response(q);
      });
      break;
    case "set_local_storage":
      c.wepinStorage.setAllLocalStorage(
        O.appId,
        P.body.parameter.data
      ).then(() => wt(void 0, null, function* () {
        var $;
        P.body.parameter.data && P.body.parameter.data.user_info && c.setUserInfo(P.body.parameter.data.user_info, !0), P.body.parameter.data && P.body.parameter.data["wepin:connectUser"] && (yield c.setToken(P.body.parameter.data["wepin:connectUser"])), q.body = {
          command: "set_local_storage",
          state: "SUCCESS",
          data: ""
        }, ($ = c.wepinWidget) != null && $.isOpen && c.wepinWidget.response(q);
      }));
      break;
    case "set_user_email":
      q.body = {
        command: "set_user_email",
        state: "SUCCESS",
        data: {
          email: c.specifiedEmail
        }
      }, (t = c.wepinWidget) != null && t.isOpen && c.wepinWidget.response(q);
      break;
    case "get_sdk_request":
      LOG.debug("get_sdk_request", (F = c.getSDKRequest()) != null ? F : "No request"), q.body = {
        command: "get_sdk_request",
        state: "SUCCESS",
        data: (l = proxyToObject(c.getSDKRequest())) != null ? l : "No request"
      }, (U = c.wepinWidget) != null && U.isOpen && c.wepinWidget.response(q);
      break;
    default:
      throw new Error(`Command ${P.body.command} is not supported.`);
  }
}, WebviewResponseHandler = (P, c) => {
  LOG.debug("Got Response from webview =>", P), c.emit(P.header.id.toString(), P);
}, getEventListener = (P, c) => {
  const O = (q) => !(!(P.wepinWidget.url.includes("/wepin-sdk-login") || P.wepinWidget.url.includes(q.origin)) && q.origin !== P.wepinWidget.url || !Object.prototype.hasOwnProperty.call(q.data, "header") || !Object.prototype.hasOwnProperty.call(q.data, "body"));
  return (q) => {
    O(q) && handleMessage(
      q.data,
      P,
      c
    );
  };
}, handleMessage = (P, c, O) => {
  P.header.request_to === "web" ? WebviewRequestHandler(P, c, O) : P.header.response_to === "web" ? WebviewResponseHandler(P, c) : LOG.error("Failed to handle message:", P);
}, emailRegExp = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/i;
var buffer$2 = {}, base64Js$1 = {};
base64Js$1.byteLength = byteLength;
base64Js$1.toByteArray = toByteArray;
base64Js$1.fromByteArray = fromByteArray;
var lookup = [], revLookup = [], Arr = typeof Uint8Array != "undefined" ? Uint8Array : Array, code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
for (var i$2 = 0, len = code.length; i$2 < len; ++i$2)
  lookup[i$2] = code[i$2], revLookup[code.charCodeAt(i$2)] = i$2;
revLookup[45] = 62;
revLookup[95] = 63;
function getLens(P) {
  var c = P.length;
  if (c % 4 > 0)
    throw new Error("Invalid string. Length must be a multiple of 4");
  var O = P.indexOf("=");
  O === -1 && (O = c);
  var q = O === c ? 0 : 4 - O % 4;
  return [O, q];
}
function byteLength(P) {
  var c = getLens(P), O = c[0], q = c[1];
  return (O + q) * 3 / 4 - q;
}
function _byteLength(P, c, O) {
  return (c + O) * 3 / 4 - O;
}
function toByteArray(P) {
  var c, O = getLens(P), q = O[0], X = O[1], t = new Arr(_byteLength(P, q, X)), F = 0, l = X > 0 ? q - 4 : q, U;
  for (U = 0; U < l; U += 4)
    c = revLookup[P.charCodeAt(U)] << 18 | revLookup[P.charCodeAt(U + 1)] << 12 | revLookup[P.charCodeAt(U + 2)] << 6 | revLookup[P.charCodeAt(U + 3)], t[F++] = c >> 16 & 255, t[F++] = c >> 8 & 255, t[F++] = c & 255;
  return X === 2 && (c = revLookup[P.charCodeAt(U)] << 2 | revLookup[P.charCodeAt(U + 1)] >> 4, t[F++] = c & 255), X === 1 && (c = revLookup[P.charCodeAt(U)] << 10 | revLookup[P.charCodeAt(U + 1)] << 4 | revLookup[P.charCodeAt(U + 2)] >> 2, t[F++] = c >> 8 & 255, t[F++] = c & 255), t;
}
function tripletToBase64(P) {
  return lookup[P >> 18 & 63] + lookup[P >> 12 & 63] + lookup[P >> 6 & 63] + lookup[P & 63];
}
function encodeChunk(P, c, O) {
  for (var q, X = [], t = c; t < O; t += 3)
    q = (P[t] << 16 & 16711680) + (P[t + 1] << 8 & 65280) + (P[t + 2] & 255), X.push(tripletToBase64(q));
  return X.join("");
}
function fromByteArray(P) {
  for (var c, O = P.length, q = O % 3, X = [], t = 16383, F = 0, l = O - q; F < l; F += t)
    X.push(encodeChunk(P, F, F + t > l ? l : F + t));
  return q === 1 ? (c = P[O - 1], X.push(
    lookup[c >> 2] + lookup[c << 4 & 63] + "=="
  )) : q === 2 && (c = (P[O - 2] << 8) + P[O - 1], X.push(
    lookup[c >> 10] + lookup[c >> 4 & 63] + lookup[c << 2 & 63] + "="
  )), X.join("");
}
var ieee754$1 = {};
/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
ieee754$1.read = function(P, c, O, q, X) {
  var t, F, l = X * 8 - q - 1, U = (1 << l) - 1, $ = U >> 1, D = -7, Q = O ? X - 1 : 0, V = O ? -1 : 1, te = P[c + Q];
  for (Q += V, t = te & (1 << -D) - 1, te >>= -D, D += l; D > 0; t = t * 256 + P[c + Q], Q += V, D -= 8)
    ;
  for (F = t & (1 << -D) - 1, t >>= -D, D += q; D > 0; F = F * 256 + P[c + Q], Q += V, D -= 8)
    ;
  if (t === 0)
    t = 1 - $;
  else {
    if (t === U)
      return F ? NaN : (te ? -1 : 1) * (1 / 0);
    F = F + Math.pow(2, q), t = t - $;
  }
  return (te ? -1 : 1) * F * Math.pow(2, t - q);
};
ieee754$1.write = function(P, c, O, q, X, t) {
  var F, l, U, $ = t * 8 - X - 1, D = (1 << $) - 1, Q = D >> 1, V = X === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0, te = q ? 0 : t - 1, ie = q ? 1 : -1, ne = c < 0 || c === 0 && 1 / c < 0 ? 1 : 0;
  for (c = Math.abs(c), isNaN(c) || c === 1 / 0 ? (l = isNaN(c) ? 1 : 0, F = D) : (F = Math.floor(Math.log(c) / Math.LN2), c * (U = Math.pow(2, -F)) < 1 && (F--, U *= 2), F + Q >= 1 ? c += V / U : c += V * Math.pow(2, 1 - Q), c * U >= 2 && (F++, U /= 2), F + Q >= D ? (l = 0, F = D) : F + Q >= 1 ? (l = (c * U - 1) * Math.pow(2, X), F = F + Q) : (l = c * Math.pow(2, Q - 1) * Math.pow(2, X), F = 0)); X >= 8; P[O + te] = l & 255, te += ie, l /= 256, X -= 8)
    ;
  for (F = F << X | l, $ += X; $ > 0; P[O + te] = F & 255, te += ie, F /= 256, $ -= 8)
    ;
  P[O + te - ie] |= ne * 128;
};
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
(function(P) {
  var c = base64Js$1, O = ieee754$1, q = typeof Symbol == "function" && typeof Symbol.for == "function" ? Symbol.for("nodejs.util.inspect.custom") : null;
  P.Buffer = l, P.SlowBuffer = oe, P.INSPECT_MAX_BYTES = 50;
  var X = 2147483647;
  P.kMaxLength = X, l.TYPED_ARRAY_SUPPORT = t(), !l.TYPED_ARRAY_SUPPORT && typeof console != "undefined" && typeof console.error == "function" && console.error(
    "This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."
  );
  function t() {
    try {
      var Y = new Uint8Array(1), Z = { foo: function() {
        return 42;
      } };
      return Object.setPrototypeOf(Z, Uint8Array.prototype), Object.setPrototypeOf(Y, Z), Y.foo() === 42;
    } catch (re) {
      return !1;
    }
  }
  Object.defineProperty(l.prototype, "parent", {
    enumerable: !0,
    get: function() {
      if (l.isBuffer(this))
        return this.buffer;
    }
  }), Object.defineProperty(l.prototype, "offset", {
    enumerable: !0,
    get: function() {
      if (l.isBuffer(this))
        return this.byteOffset;
    }
  });
  function F(Y) {
    if (Y > X)
      throw new RangeError('The value "' + Y + '" is invalid for option "size"');
    var Z = new Uint8Array(Y);
    return Object.setPrototypeOf(Z, l.prototype), Z;
  }
  function l(Y, Z, re) {
    if (typeof Y == "number") {
      if (typeof Z == "string")
        throw new TypeError(
          'The "string" argument must be of type string. Received type number'
        );
      return Q(Y);
    }
    return U(Y, Z, re);
  }
  l.poolSize = 8192;
  function U(Y, Z, re) {
    if (typeof Y == "string")
      return V(Y, Z);
    if (ArrayBuffer.isView(Y))
      return ie(Y);
    if (Y == null)
      throw new TypeError(
        "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof Y
      );
    if (Ae(Y, ArrayBuffer) || Y && Ae(Y.buffer, ArrayBuffer) || typeof SharedArrayBuffer != "undefined" && (Ae(Y, SharedArrayBuffer) || Y && Ae(Y.buffer, SharedArrayBuffer)))
      return ne(Y, Z, re);
    if (typeof Y == "number")
      throw new TypeError(
        'The "value" argument must not be of type number. Received type number'
      );
    var ue = Y.valueOf && Y.valueOf();
    if (ue != null && ue !== Y)
      return l.from(ue, Z, re);
    var we = se(Y);
    if (we) return we;
    if (typeof Symbol != "undefined" && Symbol.toPrimitive != null && typeof Y[Symbol.toPrimitive] == "function")
      return l.from(
        Y[Symbol.toPrimitive]("string"),
        Z,
        re
      );
    throw new TypeError(
      "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof Y
    );
  }
  l.from = function(Y, Z, re) {
    return U(Y, Z, re);
  }, Object.setPrototypeOf(l.prototype, Uint8Array.prototype), Object.setPrototypeOf(l, Uint8Array);
  function $(Y) {
    if (typeof Y != "number")
      throw new TypeError('"size" argument must be of type number');
    if (Y < 0)
      throw new RangeError('The value "' + Y + '" is invalid for option "size"');
  }
  function D(Y, Z, re) {
    return $(Y), Y <= 0 ? F(Y) : Z !== void 0 ? typeof re == "string" ? F(Y).fill(Z, re) : F(Y).fill(Z) : F(Y);
  }
  l.alloc = function(Y, Z, re) {
    return D(Y, Z, re);
  };
  function Q(Y) {
    return $(Y), F(Y < 0 ? 0 : ae(Y) | 0);
  }
  l.allocUnsafe = function(Y) {
    return Q(Y);
  }, l.allocUnsafeSlow = function(Y) {
    return Q(Y);
  };
  function V(Y, Z) {
    if ((typeof Z != "string" || Z === "") && (Z = "utf8"), !l.isEncoding(Z))
      throw new TypeError("Unknown encoding: " + Z);
    var re = be(Y, Z) | 0, ue = F(re), we = ue.write(Y, Z);
    return we !== re && (ue = ue.slice(0, we)), ue;
  }
  function te(Y) {
    for (var Z = Y.length < 0 ? 0 : ae(Y.length) | 0, re = F(Z), ue = 0; ue < Z; ue += 1)
      re[ue] = Y[ue] & 255;
    return re;
  }
  function ie(Y) {
    if (Ae(Y, Uint8Array)) {
      var Z = new Uint8Array(Y);
      return ne(Z.buffer, Z.byteOffset, Z.byteLength);
    }
    return te(Y);
  }
  function ne(Y, Z, re) {
    if (Z < 0 || Y.byteLength < Z)
      throw new RangeError('"offset" is outside of buffer bounds');
    if (Y.byteLength < Z + (re || 0))
      throw new RangeError('"length" is outside of buffer bounds');
    var ue;
    return Z === void 0 && re === void 0 ? ue = new Uint8Array(Y) : re === void 0 ? ue = new Uint8Array(Y, Z) : ue = new Uint8Array(Y, Z, re), Object.setPrototypeOf(ue, l.prototype), ue;
  }
  function se(Y) {
    if (l.isBuffer(Y)) {
      var Z = ae(Y.length) | 0, re = F(Z);
      return re.length === 0 || Y.copy(re, 0, 0, Z), re;
    }
    if (Y.length !== void 0)
      return typeof Y.length != "number" || $e(Y.length) ? F(0) : te(Y);
    if (Y.type === "Buffer" && Array.isArray(Y.data))
      return te(Y.data);
  }
  function ae(Y) {
    if (Y >= X)
      throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + X.toString(16) + " bytes");
    return Y | 0;
  }
  function oe(Y) {
    return +Y != Y && (Y = 0), l.alloc(+Y);
  }
  l.isBuffer = function(Z) {
    return Z != null && Z._isBuffer === !0 && Z !== l.prototype;
  }, l.compare = function(Z, re) {
    if (Ae(Z, Uint8Array) && (Z = l.from(Z, Z.offset, Z.byteLength)), Ae(re, Uint8Array) && (re = l.from(re, re.offset, re.byteLength)), !l.isBuffer(Z) || !l.isBuffer(re))
      throw new TypeError(
        'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
      );
    if (Z === re) return 0;
    for (var ue = Z.length, we = re.length, Ee = 0, Ie = Math.min(ue, we); Ee < Ie; ++Ee)
      if (Z[Ee] !== re[Ee]) {
        ue = Z[Ee], we = re[Ee];
        break;
      }
    return ue < we ? -1 : we < ue ? 1 : 0;
  }, l.isEncoding = function(Z) {
    switch (String(Z).toLowerCase()) {
      case "hex":
      case "utf8":
      case "utf-8":
      case "ascii":
      case "latin1":
      case "binary":
      case "base64":
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return !0;
      default:
        return !1;
    }
  }, l.concat = function(Z, re) {
    if (!Array.isArray(Z))
      throw new TypeError('"list" argument must be an Array of Buffers');
    if (Z.length === 0)
      return l.alloc(0);
    var ue;
    if (re === void 0)
      for (re = 0, ue = 0; ue < Z.length; ++ue)
        re += Z[ue].length;
    var we = l.allocUnsafe(re), Ee = 0;
    for (ue = 0; ue < Z.length; ++ue) {
      var Ie = Z[ue];
      if (Ae(Ie, Uint8Array))
        Ee + Ie.length > we.length ? l.from(Ie).copy(we, Ee) : Uint8Array.prototype.set.call(
          we,
          Ie,
          Ee
        );
      else if (l.isBuffer(Ie))
        Ie.copy(we, Ee);
      else
        throw new TypeError('"list" argument must be an Array of Buffers');
      Ee += Ie.length;
    }
    return we;
  };
  function be(Y, Z) {
    if (l.isBuffer(Y))
      return Y.length;
    if (ArrayBuffer.isView(Y) || Ae(Y, ArrayBuffer))
      return Y.byteLength;
    if (typeof Y != "string")
      throw new TypeError(
        'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof Y
      );
    var re = Y.length, ue = arguments.length > 2 && arguments[2] === !0;
    if (!ue && re === 0) return 0;
    for (var we = !1; ; )
      switch (Z) {
        case "ascii":
        case "latin1":
        case "binary":
          return re;
        case "utf8":
        case "utf-8":
          return he(Y).length;
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return re * 2;
        case "hex":
          return re >>> 1;
        case "base64":
          return me(Y).length;
        default:
          if (we)
            return ue ? -1 : he(Y).length;
          Z = ("" + Z).toLowerCase(), we = !0;
      }
  }
  l.byteLength = be;
  function de(Y, Z, re) {
    var ue = !1;
    if ((Z === void 0 || Z < 0) && (Z = 0), Z > this.length || ((re === void 0 || re > this.length) && (re = this.length), re <= 0) || (re >>>= 0, Z >>>= 0, re <= Z))
      return "";
    for (Y || (Y = "utf8"); ; )
      switch (Y) {
        case "hex":
          return w(this, Z, re);
        case "utf8":
        case "utf-8":
          return o(this, Z, re);
        case "ascii":
          return z(this, Z, re);
        case "latin1":
        case "binary":
          return B(this, Z, re);
        case "base64":
          return e(this, Z, re);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return G(this, Z, re);
        default:
          if (ue) throw new TypeError("Unknown encoding: " + Y);
          Y = (Y + "").toLowerCase(), ue = !0;
      }
  }
  l.prototype._isBuffer = !0;
  function _e(Y, Z, re) {
    var ue = Y[Z];
    Y[Z] = Y[re], Y[re] = ue;
  }
  l.prototype.swap16 = function() {
    var Z = this.length;
    if (Z % 2 !== 0)
      throw new RangeError("Buffer size must be a multiple of 16-bits");
    for (var re = 0; re < Z; re += 2)
      _e(this, re, re + 1);
    return this;
  }, l.prototype.swap32 = function() {
    var Z = this.length;
    if (Z % 4 !== 0)
      throw new RangeError("Buffer size must be a multiple of 32-bits");
    for (var re = 0; re < Z; re += 4)
      _e(this, re, re + 3), _e(this, re + 1, re + 2);
    return this;
  }, l.prototype.swap64 = function() {
    var Z = this.length;
    if (Z % 8 !== 0)
      throw new RangeError("Buffer size must be a multiple of 64-bits");
    for (var re = 0; re < Z; re += 8)
      _e(this, re, re + 7), _e(this, re + 1, re + 6), _e(this, re + 2, re + 5), _e(this, re + 3, re + 4);
    return this;
  }, l.prototype.toString = function() {
    var Z = this.length;
    return Z === 0 ? "" : arguments.length === 0 ? o(this, 0, Z) : de.apply(this, arguments);
  }, l.prototype.toLocaleString = l.prototype.toString, l.prototype.equals = function(Z) {
    if (!l.isBuffer(Z)) throw new TypeError("Argument must be a Buffer");
    return this === Z ? !0 : l.compare(this, Z) === 0;
  }, l.prototype.inspect = function() {
    var Z = "", re = P.INSPECT_MAX_BYTES;
    return Z = this.toString("hex", 0, re).replace(/(.{2})/g, "$1 ").trim(), this.length > re && (Z += " ... "), "<Buffer " + Z + ">";
  }, q && (l.prototype[q] = l.prototype.inspect), l.prototype.compare = function(Z, re, ue, we, Ee) {
    if (Ae(Z, Uint8Array) && (Z = l.from(Z, Z.offset, Z.byteLength)), !l.isBuffer(Z))
      throw new TypeError(
        'The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof Z
      );
    if (re === void 0 && (re = 0), ue === void 0 && (ue = Z ? Z.length : 0), we === void 0 && (we = 0), Ee === void 0 && (Ee = this.length), re < 0 || ue > Z.length || we < 0 || Ee > this.length)
      throw new RangeError("out of range index");
    if (we >= Ee && re >= ue)
      return 0;
    if (we >= Ee)
      return -1;
    if (re >= ue)
      return 1;
    if (re >>>= 0, ue >>>= 0, we >>>= 0, Ee >>>= 0, this === Z) return 0;
    for (var Ie = Ee - we, xe = ue - re, Le = Math.min(Ie, xe), Pe = this.slice(we, Ee), Ce = Z.slice(re, ue), je = 0; je < Le; ++je)
      if (Pe[je] !== Ce[je]) {
        Ie = Pe[je], xe = Ce[je];
        break;
      }
    return Ie < xe ? -1 : xe < Ie ? 1 : 0;
  };
  function qe(Y, Z, re, ue, we) {
    if (Y.length === 0) return -1;
    if (typeof re == "string" ? (ue = re, re = 0) : re > 2147483647 ? re = 2147483647 : re < -2147483648 && (re = -2147483648), re = +re, $e(re) && (re = we ? 0 : Y.length - 1), re < 0 && (re = Y.length + re), re >= Y.length) {
      if (we) return -1;
      re = Y.length - 1;
    } else if (re < 0)
      if (we) re = 0;
      else return -1;
    if (typeof Z == "string" && (Z = l.from(Z, ue)), l.isBuffer(Z))
      return Z.length === 0 ? -1 : Te(Y, Z, re, ue, we);
    if (typeof Z == "number")
      return Z = Z & 255, typeof Uint8Array.prototype.indexOf == "function" ? we ? Uint8Array.prototype.indexOf.call(Y, Z, re) : Uint8Array.prototype.lastIndexOf.call(Y, Z, re) : Te(Y, [Z], re, ue, we);
    throw new TypeError("val must be string, number or Buffer");
  }
  function Te(Y, Z, re, ue, we) {
    var Ee = 1, Ie = Y.length, xe = Z.length;
    if (ue !== void 0 && (ue = String(ue).toLowerCase(), ue === "ucs2" || ue === "ucs-2" || ue === "utf16le" || ue === "utf-16le")) {
      if (Y.length < 2 || Z.length < 2)
        return -1;
      Ee = 2, Ie /= 2, xe /= 2, re /= 2;
    }
    function Le(Ne, ft) {
      return Ee === 1 ? Ne[ft] : Ne.readUInt16BE(ft * Ee);
    }
    var Pe;
    if (we) {
      var Ce = -1;
      for (Pe = re; Pe < Ie; Pe++)
        if (Le(Y, Pe) === Le(Z, Ce === -1 ? 0 : Pe - Ce)) {
          if (Ce === -1 && (Ce = Pe), Pe - Ce + 1 === xe) return Ce * Ee;
        } else
          Ce !== -1 && (Pe -= Pe - Ce), Ce = -1;
    } else
      for (re + xe > Ie && (re = Ie - xe), Pe = re; Pe >= 0; Pe--) {
        for (var je = !0, Ve = 0; Ve < xe; Ve++)
          if (Le(Y, Pe + Ve) !== Le(Z, Ve)) {
            je = !1;
            break;
          }
        if (je) return Pe;
      }
    return -1;
  }
  l.prototype.includes = function(Z, re, ue) {
    return this.indexOf(Z, re, ue) !== -1;
  }, l.prototype.indexOf = function(Z, re, ue) {
    return qe(this, Z, re, ue, !0);
  }, l.prototype.lastIndexOf = function(Z, re, ue) {
    return qe(this, Z, re, ue, !1);
  };
  function ce(Y, Z, re, ue) {
    re = Number(re) || 0;
    var we = Y.length - re;
    ue ? (ue = Number(ue), ue > we && (ue = we)) : ue = we;
    var Ee = Z.length;
    ue > Ee / 2 && (ue = Ee / 2);
    for (var Ie = 0; Ie < ue; ++Ie) {
      var xe = parseInt(Z.substr(Ie * 2, 2), 16);
      if ($e(xe)) return Ie;
      Y[re + Ie] = xe;
    }
    return Ie;
  }
  function pe(Y, Z, re, ue) {
    return ve(he(Z, Y.length - re), Y, re, ue);
  }
  function Me(Y, Z, re, ue) {
    return ve(Re(Z), Y, re, ue);
  }
  function K(Y, Z, re, ue) {
    return ve(me(Z), Y, re, ue);
  }
  function ee(Y, Z, re, ue) {
    return ve(ke(Z, Y.length - re), Y, re, ue);
  }
  l.prototype.write = function(Z, re, ue, we) {
    if (re === void 0)
      we = "utf8", ue = this.length, re = 0;
    else if (ue === void 0 && typeof re == "string")
      we = re, ue = this.length, re = 0;
    else if (isFinite(re))
      re = re >>> 0, isFinite(ue) ? (ue = ue >>> 0, we === void 0 && (we = "utf8")) : (we = ue, ue = void 0);
    else
      throw new Error(
        "Buffer.write(string, encoding, offset[, length]) is no longer supported"
      );
    var Ee = this.length - re;
    if ((ue === void 0 || ue > Ee) && (ue = Ee), Z.length > 0 && (ue < 0 || re < 0) || re > this.length)
      throw new RangeError("Attempt to write outside buffer bounds");
    we || (we = "utf8");
    for (var Ie = !1; ; )
      switch (we) {
        case "hex":
          return ce(this, Z, re, ue);
        case "utf8":
        case "utf-8":
          return pe(this, Z, re, ue);
        case "ascii":
        case "latin1":
        case "binary":
          return Me(this, Z, re, ue);
        case "base64":
          return K(this, Z, re, ue);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return ee(this, Z, re, ue);
        default:
          if (Ie) throw new TypeError("Unknown encoding: " + we);
          we = ("" + we).toLowerCase(), Ie = !0;
      }
  }, l.prototype.toJSON = function() {
    return {
      type: "Buffer",
      data: Array.prototype.slice.call(this._arr || this, 0)
    };
  };
  function e(Y, Z, re) {
    return Z === 0 && re === Y.length ? c.fromByteArray(Y) : c.fromByteArray(Y.slice(Z, re));
  }
  function o(Y, Z, re) {
    re = Math.min(Y.length, re);
    for (var ue = [], we = Z; we < re; ) {
      var Ee = Y[we], Ie = null, xe = Ee > 239 ? 4 : Ee > 223 ? 3 : Ee > 191 ? 2 : 1;
      if (we + xe <= re) {
        var Le, Pe, Ce, je;
        switch (xe) {
          case 1:
            Ee < 128 && (Ie = Ee);
            break;
          case 2:
            Le = Y[we + 1], (Le & 192) === 128 && (je = (Ee & 31) << 6 | Le & 63, je > 127 && (Ie = je));
            break;
          case 3:
            Le = Y[we + 1], Pe = Y[we + 2], (Le & 192) === 128 && (Pe & 192) === 128 && (je = (Ee & 15) << 12 | (Le & 63) << 6 | Pe & 63, je > 2047 && (je < 55296 || je > 57343) && (Ie = je));
            break;
          case 4:
            Le = Y[we + 1], Pe = Y[we + 2], Ce = Y[we + 3], (Le & 192) === 128 && (Pe & 192) === 128 && (Ce & 192) === 128 && (je = (Ee & 15) << 18 | (Le & 63) << 12 | (Pe & 63) << 6 | Ce & 63, je > 65535 && je < 1114112 && (Ie = je));
        }
      }
      Ie === null ? (Ie = 65533, xe = 1) : Ie > 65535 && (Ie -= 65536, ue.push(Ie >>> 10 & 1023 | 55296), Ie = 56320 | Ie & 1023), ue.push(Ie), we += xe;
    }
    return H(ue);
  }
  var y = 4096;
  function H(Y) {
    var Z = Y.length;
    if (Z <= y)
      return String.fromCharCode.apply(String, Y);
    for (var re = "", ue = 0; ue < Z; )
      re += String.fromCharCode.apply(
        String,
        Y.slice(ue, ue += y)
      );
    return re;
  }
  function z(Y, Z, re) {
    var ue = "";
    re = Math.min(Y.length, re);
    for (var we = Z; we < re; ++we)
      ue += String.fromCharCode(Y[we] & 127);
    return ue;
  }
  function B(Y, Z, re) {
    var ue = "";
    re = Math.min(Y.length, re);
    for (var we = Z; we < re; ++we)
      ue += String.fromCharCode(Y[we]);
    return ue;
  }
  function w(Y, Z, re) {
    var ue = Y.length;
    (!Z || Z < 0) && (Z = 0), (!re || re < 0 || re > ue) && (re = ue);
    for (var we = "", Ee = Z; Ee < re; ++Ee)
      we += Oe[Y[Ee]];
    return we;
  }
  function G(Y, Z, re) {
    for (var ue = Y.slice(Z, re), we = "", Ee = 0; Ee < ue.length - 1; Ee += 2)
      we += String.fromCharCode(ue[Ee] + ue[Ee + 1] * 256);
    return we;
  }
  l.prototype.slice = function(Z, re) {
    var ue = this.length;
    Z = ~~Z, re = re === void 0 ? ue : ~~re, Z < 0 ? (Z += ue, Z < 0 && (Z = 0)) : Z > ue && (Z = ue), re < 0 ? (re += ue, re < 0 && (re = 0)) : re > ue && (re = ue), re < Z && (re = Z);
    var we = this.subarray(Z, re);
    return Object.setPrototypeOf(we, l.prototype), we;
  };
  function g(Y, Z, re) {
    if (Y % 1 !== 0 || Y < 0) throw new RangeError("offset is not uint");
    if (Y + Z > re) throw new RangeError("Trying to access beyond buffer length");
  }
  l.prototype.readUintLE = l.prototype.readUIntLE = function(Z, re, ue) {
    Z = Z >>> 0, re = re >>> 0, ue || g(Z, re, this.length);
    for (var we = this[Z], Ee = 1, Ie = 0; ++Ie < re && (Ee *= 256); )
      we += this[Z + Ie] * Ee;
    return we;
  }, l.prototype.readUintBE = l.prototype.readUIntBE = function(Z, re, ue) {
    Z = Z >>> 0, re = re >>> 0, ue || g(Z, re, this.length);
    for (var we = this[Z + --re], Ee = 1; re > 0 && (Ee *= 256); )
      we += this[Z + --re] * Ee;
    return we;
  }, l.prototype.readUint8 = l.prototype.readUInt8 = function(Z, re) {
    return Z = Z >>> 0, re || g(Z, 1, this.length), this[Z];
  }, l.prototype.readUint16LE = l.prototype.readUInt16LE = function(Z, re) {
    return Z = Z >>> 0, re || g(Z, 2, this.length), this[Z] | this[Z + 1] << 8;
  }, l.prototype.readUint16BE = l.prototype.readUInt16BE = function(Z, re) {
    return Z = Z >>> 0, re || g(Z, 2, this.length), this[Z] << 8 | this[Z + 1];
  }, l.prototype.readUint32LE = l.prototype.readUInt32LE = function(Z, re) {
    return Z = Z >>> 0, re || g(Z, 4, this.length), (this[Z] | this[Z + 1] << 8 | this[Z + 2] << 16) + this[Z + 3] * 16777216;
  }, l.prototype.readUint32BE = l.prototype.readUInt32BE = function(Z, re) {
    return Z = Z >>> 0, re || g(Z, 4, this.length), this[Z] * 16777216 + (this[Z + 1] << 16 | this[Z + 2] << 8 | this[Z + 3]);
  }, l.prototype.readIntLE = function(Z, re, ue) {
    Z = Z >>> 0, re = re >>> 0, ue || g(Z, re, this.length);
    for (var we = this[Z], Ee = 1, Ie = 0; ++Ie < re && (Ee *= 256); )
      we += this[Z + Ie] * Ee;
    return Ee *= 128, we >= Ee && (we -= Math.pow(2, 8 * re)), we;
  }, l.prototype.readIntBE = function(Z, re, ue) {
    Z = Z >>> 0, re = re >>> 0, ue || g(Z, re, this.length);
    for (var we = re, Ee = 1, Ie = this[Z + --we]; we > 0 && (Ee *= 256); )
      Ie += this[Z + --we] * Ee;
    return Ee *= 128, Ie >= Ee && (Ie -= Math.pow(2, 8 * re)), Ie;
  }, l.prototype.readInt8 = function(Z, re) {
    return Z = Z >>> 0, re || g(Z, 1, this.length), this[Z] & 128 ? (255 - this[Z] + 1) * -1 : this[Z];
  }, l.prototype.readInt16LE = function(Z, re) {
    Z = Z >>> 0, re || g(Z, 2, this.length);
    var ue = this[Z] | this[Z + 1] << 8;
    return ue & 32768 ? ue | 4294901760 : ue;
  }, l.prototype.readInt16BE = function(Z, re) {
    Z = Z >>> 0, re || g(Z, 2, this.length);
    var ue = this[Z + 1] | this[Z] << 8;
    return ue & 32768 ? ue | 4294901760 : ue;
  }, l.prototype.readInt32LE = function(Z, re) {
    return Z = Z >>> 0, re || g(Z, 4, this.length), this[Z] | this[Z + 1] << 8 | this[Z + 2] << 16 | this[Z + 3] << 24;
  }, l.prototype.readInt32BE = function(Z, re) {
    return Z = Z >>> 0, re || g(Z, 4, this.length), this[Z] << 24 | this[Z + 1] << 16 | this[Z + 2] << 8 | this[Z + 3];
  }, l.prototype.readFloatLE = function(Z, re) {
    return Z = Z >>> 0, re || g(Z, 4, this.length), O.read(this, Z, !0, 23, 4);
  }, l.prototype.readFloatBE = function(Z, re) {
    return Z = Z >>> 0, re || g(Z, 4, this.length), O.read(this, Z, !1, 23, 4);
  }, l.prototype.readDoubleLE = function(Z, re) {
    return Z = Z >>> 0, re || g(Z, 8, this.length), O.read(this, Z, !0, 52, 8);
  }, l.prototype.readDoubleBE = function(Z, re) {
    return Z = Z >>> 0, re || g(Z, 8, this.length), O.read(this, Z, !1, 52, 8);
  };
  function J(Y, Z, re, ue, we, Ee) {
    if (!l.isBuffer(Y)) throw new TypeError('"buffer" argument must be a Buffer instance');
    if (Z > we || Z < Ee) throw new RangeError('"value" argument is out of bounds');
    if (re + ue > Y.length) throw new RangeError("Index out of range");
  }
  l.prototype.writeUintLE = l.prototype.writeUIntLE = function(Z, re, ue, we) {
    if (Z = +Z, re = re >>> 0, ue = ue >>> 0, !we) {
      var Ee = Math.pow(2, 8 * ue) - 1;
      J(this, Z, re, ue, Ee, 0);
    }
    var Ie = 1, xe = 0;
    for (this[re] = Z & 255; ++xe < ue && (Ie *= 256); )
      this[re + xe] = Z / Ie & 255;
    return re + ue;
  }, l.prototype.writeUintBE = l.prototype.writeUIntBE = function(Z, re, ue, we) {
    if (Z = +Z, re = re >>> 0, ue = ue >>> 0, !we) {
      var Ee = Math.pow(2, 8 * ue) - 1;
      J(this, Z, re, ue, Ee, 0);
    }
    var Ie = ue - 1, xe = 1;
    for (this[re + Ie] = Z & 255; --Ie >= 0 && (xe *= 256); )
      this[re + Ie] = Z / xe & 255;
    return re + ue;
  }, l.prototype.writeUint8 = l.prototype.writeUInt8 = function(Z, re, ue) {
    return Z = +Z, re = re >>> 0, ue || J(this, Z, re, 1, 255, 0), this[re] = Z & 255, re + 1;
  }, l.prototype.writeUint16LE = l.prototype.writeUInt16LE = function(Z, re, ue) {
    return Z = +Z, re = re >>> 0, ue || J(this, Z, re, 2, 65535, 0), this[re] = Z & 255, this[re + 1] = Z >>> 8, re + 2;
  }, l.prototype.writeUint16BE = l.prototype.writeUInt16BE = function(Z, re, ue) {
    return Z = +Z, re = re >>> 0, ue || J(this, Z, re, 2, 65535, 0), this[re] = Z >>> 8, this[re + 1] = Z & 255, re + 2;
  }, l.prototype.writeUint32LE = l.prototype.writeUInt32LE = function(Z, re, ue) {
    return Z = +Z, re = re >>> 0, ue || J(this, Z, re, 4, 4294967295, 0), this[re + 3] = Z >>> 24, this[re + 2] = Z >>> 16, this[re + 1] = Z >>> 8, this[re] = Z & 255, re + 4;
  }, l.prototype.writeUint32BE = l.prototype.writeUInt32BE = function(Z, re, ue) {
    return Z = +Z, re = re >>> 0, ue || J(this, Z, re, 4, 4294967295, 0), this[re] = Z >>> 24, this[re + 1] = Z >>> 16, this[re + 2] = Z >>> 8, this[re + 3] = Z & 255, re + 4;
  }, l.prototype.writeIntLE = function(Z, re, ue, we) {
    if (Z = +Z, re = re >>> 0, !we) {
      var Ee = Math.pow(2, 8 * ue - 1);
      J(this, Z, re, ue, Ee - 1, -Ee);
    }
    var Ie = 0, xe = 1, Le = 0;
    for (this[re] = Z & 255; ++Ie < ue && (xe *= 256); )
      Z < 0 && Le === 0 && this[re + Ie - 1] !== 0 && (Le = 1), this[re + Ie] = (Z / xe >> 0) - Le & 255;
    return re + ue;
  }, l.prototype.writeIntBE = function(Z, re, ue, we) {
    if (Z = +Z, re = re >>> 0, !we) {
      var Ee = Math.pow(2, 8 * ue - 1);
      J(this, Z, re, ue, Ee - 1, -Ee);
    }
    var Ie = ue - 1, xe = 1, Le = 0;
    for (this[re + Ie] = Z & 255; --Ie >= 0 && (xe *= 256); )
      Z < 0 && Le === 0 && this[re + Ie + 1] !== 0 && (Le = 1), this[re + Ie] = (Z / xe >> 0) - Le & 255;
    return re + ue;
  }, l.prototype.writeInt8 = function(Z, re, ue) {
    return Z = +Z, re = re >>> 0, ue || J(this, Z, re, 1, 127, -128), Z < 0 && (Z = 255 + Z + 1), this[re] = Z & 255, re + 1;
  }, l.prototype.writeInt16LE = function(Z, re, ue) {
    return Z = +Z, re = re >>> 0, ue || J(this, Z, re, 2, 32767, -32768), this[re] = Z & 255, this[re + 1] = Z >>> 8, re + 2;
  }, l.prototype.writeInt16BE = function(Z, re, ue) {
    return Z = +Z, re = re >>> 0, ue || J(this, Z, re, 2, 32767, -32768), this[re] = Z >>> 8, this[re + 1] = Z & 255, re + 2;
  }, l.prototype.writeInt32LE = function(Z, re, ue) {
    return Z = +Z, re = re >>> 0, ue || J(this, Z, re, 4, 2147483647, -2147483648), this[re] = Z & 255, this[re + 1] = Z >>> 8, this[re + 2] = Z >>> 16, this[re + 3] = Z >>> 24, re + 4;
  }, l.prototype.writeInt32BE = function(Z, re, ue) {
    return Z = +Z, re = re >>> 0, ue || J(this, Z, re, 4, 2147483647, -2147483648), Z < 0 && (Z = 4294967295 + Z + 1), this[re] = Z >>> 24, this[re + 1] = Z >>> 16, this[re + 2] = Z >>> 8, this[re + 3] = Z & 255, re + 4;
  };
  function le(Y, Z, re, ue, we, Ee) {
    if (re + ue > Y.length) throw new RangeError("Index out of range");
    if (re < 0) throw new RangeError("Index out of range");
  }
  function ge(Y, Z, re, ue, we) {
    return Z = +Z, re = re >>> 0, we || le(Y, Z, re, 4), O.write(Y, Z, re, ue, 23, 4), re + 4;
  }
  l.prototype.writeFloatLE = function(Z, re, ue) {
    return ge(this, Z, re, !0, ue);
  }, l.prototype.writeFloatBE = function(Z, re, ue) {
    return ge(this, Z, re, !1, ue);
  };
  function Se(Y, Z, re, ue, we) {
    return Z = +Z, re = re >>> 0, we || le(Y, Z, re, 8), O.write(Y, Z, re, ue, 52, 8), re + 8;
  }
  l.prototype.writeDoubleLE = function(Z, re, ue) {
    return Se(this, Z, re, !0, ue);
  }, l.prototype.writeDoubleBE = function(Z, re, ue) {
    return Se(this, Z, re, !1, ue);
  }, l.prototype.copy = function(Z, re, ue, we) {
    if (!l.isBuffer(Z)) throw new TypeError("argument should be a Buffer");
    if (ue || (ue = 0), !we && we !== 0 && (we = this.length), re >= Z.length && (re = Z.length), re || (re = 0), we > 0 && we < ue && (we = ue), we === ue || Z.length === 0 || this.length === 0) return 0;
    if (re < 0)
      throw new RangeError("targetStart out of bounds");
    if (ue < 0 || ue >= this.length) throw new RangeError("Index out of range");
    if (we < 0) throw new RangeError("sourceEnd out of bounds");
    we > this.length && (we = this.length), Z.length - re < we - ue && (we = Z.length - re + ue);
    var Ee = we - ue;
    return this === Z && typeof Uint8Array.prototype.copyWithin == "function" ? this.copyWithin(re, ue, we) : Uint8Array.prototype.set.call(
      Z,
      this.subarray(ue, we),
      re
    ), Ee;
  }, l.prototype.fill = function(Z, re, ue, we) {
    if (typeof Z == "string") {
      if (typeof re == "string" ? (we = re, re = 0, ue = this.length) : typeof ue == "string" && (we = ue, ue = this.length), we !== void 0 && typeof we != "string")
        throw new TypeError("encoding must be a string");
      if (typeof we == "string" && !l.isEncoding(we))
        throw new TypeError("Unknown encoding: " + we);
      if (Z.length === 1) {
        var Ee = Z.charCodeAt(0);
        (we === "utf8" && Ee < 128 || we === "latin1") && (Z = Ee);
      }
    } else typeof Z == "number" ? Z = Z & 255 : typeof Z == "boolean" && (Z = Number(Z));
    if (re < 0 || this.length < re || this.length < ue)
      throw new RangeError("Out of range index");
    if (ue <= re)
      return this;
    re = re >>> 0, ue = ue === void 0 ? this.length : ue >>> 0, Z || (Z = 0);
    var Ie;
    if (typeof Z == "number")
      for (Ie = re; Ie < ue; ++Ie)
        this[Ie] = Z;
    else {
      var xe = l.isBuffer(Z) ? Z : l.from(Z, we), Le = xe.length;
      if (Le === 0)
        throw new TypeError('The value "' + Z + '" is invalid for argument "value"');
      for (Ie = 0; Ie < ue - re; ++Ie)
        this[Ie + re] = xe[Ie % Le];
    }
    return this;
  };
  var ye = /[^+/0-9A-Za-z-_]/g;
  function fe(Y) {
    if (Y = Y.split("=")[0], Y = Y.trim().replace(ye, ""), Y.length < 2) return "";
    for (; Y.length % 4 !== 0; )
      Y = Y + "=";
    return Y;
  }
  function he(Y, Z) {
    Z = Z || 1 / 0;
    for (var re, ue = Y.length, we = null, Ee = [], Ie = 0; Ie < ue; ++Ie) {
      if (re = Y.charCodeAt(Ie), re > 55295 && re < 57344) {
        if (!we) {
          if (re > 56319) {
            (Z -= 3) > -1 && Ee.push(239, 191, 189);
            continue;
          } else if (Ie + 1 === ue) {
            (Z -= 3) > -1 && Ee.push(239, 191, 189);
            continue;
          }
          we = re;
          continue;
        }
        if (re < 56320) {
          (Z -= 3) > -1 && Ee.push(239, 191, 189), we = re;
          continue;
        }
        re = (we - 55296 << 10 | re - 56320) + 65536;
      } else we && (Z -= 3) > -1 && Ee.push(239, 191, 189);
      if (we = null, re < 128) {
        if ((Z -= 1) < 0) break;
        Ee.push(re);
      } else if (re < 2048) {
        if ((Z -= 2) < 0) break;
        Ee.push(
          re >> 6 | 192,
          re & 63 | 128
        );
      } else if (re < 65536) {
        if ((Z -= 3) < 0) break;
        Ee.push(
          re >> 12 | 224,
          re >> 6 & 63 | 128,
          re & 63 | 128
        );
      } else if (re < 1114112) {
        if ((Z -= 4) < 0) break;
        Ee.push(
          re >> 18 | 240,
          re >> 12 & 63 | 128,
          re >> 6 & 63 | 128,
          re & 63 | 128
        );
      } else
        throw new Error("Invalid code point");
    }
    return Ee;
  }
  function Re(Y) {
    for (var Z = [], re = 0; re < Y.length; ++re)
      Z.push(Y.charCodeAt(re) & 255);
    return Z;
  }
  function ke(Y, Z) {
    for (var re, ue, we, Ee = [], Ie = 0; Ie < Y.length && !((Z -= 2) < 0); ++Ie)
      re = Y.charCodeAt(Ie), ue = re >> 8, we = re % 256, Ee.push(we), Ee.push(ue);
    return Ee;
  }
  function me(Y) {
    return c.toByteArray(fe(Y));
  }
  function ve(Y, Z, re, ue) {
    for (var we = 0; we < ue && !(we + re >= Z.length || we >= Y.length); ++we)
      Z[we + re] = Y[we];
    return we;
  }
  function Ae(Y, Z) {
    return Y instanceof Z || Y != null && Y.constructor != null && Y.constructor.name != null && Y.constructor.name === Z.name;
  }
  function $e(Y) {
    return Y !== Y;
  }
  var Oe = function() {
    for (var Y = "0123456789abcdef", Z = new Array(256), re = 0; re < 16; ++re)
      for (var ue = re * 16, we = 0; we < 16; ++we)
        Z[ue + we] = Y[re] + Y[we];
    return Z;
  }();
})(buffer$2);
var process$2 = {}, cachedSetTimeout$1, cachedClearTimeout$1;
function defaultSetTimout$1() {
  throw new Error("setTimeout has not been defined");
}
function defaultClearTimeout$1() {
  throw new Error("clearTimeout has not been defined");
}
(function() {
  try {
    typeof setTimeout == "function" ? cachedSetTimeout$1 = setTimeout : cachedSetTimeout$1 = defaultSetTimout$1;
  } catch (P) {
    cachedSetTimeout$1 = defaultSetTimout$1;
  }
  try {
    typeof clearTimeout == "function" ? cachedClearTimeout$1 = clearTimeout : cachedClearTimeout$1 = defaultClearTimeout$1;
  } catch (P) {
    cachedClearTimeout$1 = defaultClearTimeout$1;
  }
})();
function runTimeout$1(P) {
  if (cachedSetTimeout$1 === setTimeout)
    return setTimeout(P, 0);
  if ((cachedSetTimeout$1 === defaultSetTimout$1 || !cachedSetTimeout$1) && setTimeout)
    return cachedSetTimeout$1 = setTimeout, setTimeout(P, 0);
  try {
    return cachedSetTimeout$1(P, 0);
  } catch (c) {
    try {
      return cachedSetTimeout$1.call(null, P, 0);
    } catch (O) {
      return cachedSetTimeout$1.call(this, P, 0);
    }
  }
}
function runClearTimeout$1(P) {
  if (cachedClearTimeout$1 === clearTimeout)
    return clearTimeout(P);
  if ((cachedClearTimeout$1 === defaultClearTimeout$1 || !cachedClearTimeout$1) && clearTimeout)
    return cachedClearTimeout$1 = clearTimeout, clearTimeout(P);
  try {
    return cachedClearTimeout$1(P);
  } catch (c) {
    try {
      return cachedClearTimeout$1.call(null, P);
    } catch (O) {
      return cachedClearTimeout$1.call(this, P);
    }
  }
}
var queue$1 = [], draining$1 = !1, currentQueue$1, queueIndex$1 = -1;
function cleanUpNextTick$1() {
  !draining$1 || !currentQueue$1 || (draining$1 = !1, currentQueue$1.length ? queue$1 = currentQueue$1.concat(queue$1) : queueIndex$1 = -1, queue$1.length && drainQueue$1());
}
function drainQueue$1() {
  if (!draining$1) {
    var P = runTimeout$1(cleanUpNextTick$1);
    draining$1 = !0;
    for (var c = queue$1.length; c; ) {
      for (currentQueue$1 = queue$1, queue$1 = []; ++queueIndex$1 < c; )
        currentQueue$1 && currentQueue$1[queueIndex$1].run();
      queueIndex$1 = -1, c = queue$1.length;
    }
    currentQueue$1 = null, draining$1 = !1, runClearTimeout$1(P);
  }
}
process$2.nextTick = function(P) {
  var c = new Array(arguments.length - 1);
  if (arguments.length > 1)
    for (var O = 1; O < arguments.length; O++)
      c[O - 1] = arguments[O];
  queue$1.push(new Item$1(P, c)), queue$1.length === 1 && !draining$1 && runTimeout$1(drainQueue$1);
};
function Item$1(P, c) {
  this.fun = P, this.array = c;
}
Item$1.prototype.run = function() {
  this.fun.apply(null, this.array);
};
process$2.title = "browser";
process$2.browser = !0;
process$2.env = {};
process$2.argv = [];
process$2.version = "";
process$2.versions = {};
function noop$1() {
}
process$2.on = noop$1;
process$2.addListener = noop$1;
process$2.once = noop$1;
process$2.off = noop$1;
process$2.removeListener = noop$1;
process$2.removeAllListeners = noop$1;
process$2.emit = noop$1;
process$2.prependListener = noop$1;
process$2.prependOnceListener = noop$1;
process$2.listeners = function(P) {
  return [];
};
process$2.binding = function(P) {
  throw new Error("process.binding is not supported");
};
process$2.cwd = function() {
  return "/";
};
process$2.chdir = function(P) {
  throw new Error("process.chdir is not supported");
};
process$2.umask = function() {
  return 0;
};
var _globalThis = function(P) {
  function c() {
    var q = this || self;
    return delete P.prototype.__magic__, q;
  }
  if (typeof globalThis == "object")
    return globalThis;
  if (this)
    return c();
  P.defineProperty(P.prototype, "__magic__", {
    configurable: !0,
    get: c
  });
  var O = __magic__;
  return O;
}(Object), _global = _globalThis, Mr = Object.getPrototypeOf, Sr = Reflect.get, _r = (P, c, O) => Sr(Mr(P), O, c), Be = (P, c, O) => new Promise((q, X) => {
  var t = (U) => {
    try {
      l(O.next(U));
    } catch ($) {
      X($);
    }
  }, F = (U) => {
    try {
      l(O.throw(U));
    } catch ($) {
      X($);
    }
  }, l = (U) => U.done ? q(U.value) : Promise.resolve(U.value).then(t, F);
  l((O = O.apply(P, c)).next());
});
const name$1 = "@wepin/fetch-js", version$1 = "0.0.4", description$1 = "Wepin fetch library for Web", author$1 = "IoTrust, Co., Ltd.", license$1 = "MIT", main$1 = "./dist/wepin-fetch-js.mjs", types$1 = "./dist/src/index.d.ts", files$1 = [
  "dist"
], scripts$1 = {
  build: "vite build --mode production",
  dev: "vite build --mode development",
  watch: "vite build --watch",
  lint: "eslint . --ext .vue,.js,.jsx,.cjs,.mjs,.ts,.tsx,.cts,.mts --fix --ignore-path .gitignore"
}, dependencies$1 = {}, devDependencies$1 = {
  "@wepin/storage-js": "link:../storage",
  "@types/bcryptjs": "^2.4.6",
  bcryptjs: "^2.4.3",
  eventemitter2: "^6.4.9",
  "jwt-decode": "^4.0.0"
}, keywords$1 = [
  "wepin",
  "wepinwallet",
  "wallet",
  "wepin-fetch"
], packageJson = {
  name: name$1,
  version: version$1,
  description: description$1,
  author: author$1,
  license: license$1,
  main: main$1,
  types: types$1,
  files: files$1,
  scripts: scripts$1,
  dependencies: dependencies$1,
  devDependencies: devDependencies$1,
  keywords: keywords$1
};
class APIResponse {
  constructor({
    data: c,
    status: O,
    headers: q,
    request: X
  }) {
    this.data = c, this.status = O, this.headers = q, this.request = X;
  }
}
var commonjsGlobal = typeof globalThis != "undefined" ? globalThis : typeof window != "undefined" ? window : typeof _global != "undefined" ? _global : typeof self != "undefined" ? self : {};
function getDefaultExportFromCjs(P) {
  return P && P.__esModule && Object.prototype.hasOwnProperty.call(P, "default") ? P.default : P;
}
var buffer$1 = {}, base64Js = {}, hasRequiredBase64Js;
function requireBase64Js() {
  if (hasRequiredBase64Js) return base64Js;
  hasRequiredBase64Js = 1, base64Js.byteLength = l, base64Js.toByteArray = $, base64Js.fromByteArray = V;
  for (var P = [], c = [], O = typeof Uint8Array != "undefined" ? Uint8Array : Array, q = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", X = 0, t = q.length; X < t; ++X)
    P[X] = q[X], c[q.charCodeAt(X)] = X;
  c[45] = 62, c[95] = 63;
  function F(te) {
    var ie = te.length;
    if (ie % 4 > 0)
      throw new Error("Invalid string. Length must be a multiple of 4");
    var ne = te.indexOf("=");
    ne === -1 && (ne = ie);
    var se = ne === ie ? 0 : 4 - ne % 4;
    return [ne, se];
  }
  function l(te) {
    var ie = F(te), ne = ie[0], se = ie[1];
    return (ne + se) * 3 / 4 - se;
  }
  function U(te, ie, ne) {
    return (ie + ne) * 3 / 4 - ne;
  }
  function $(te) {
    var ie, ne = F(te), se = ne[0], ae = ne[1], oe = new O(U(te, se, ae)), be = 0, de = ae > 0 ? se - 4 : se, _e;
    for (_e = 0; _e < de; _e += 4)
      ie = c[te.charCodeAt(_e)] << 18 | c[te.charCodeAt(_e + 1)] << 12 | c[te.charCodeAt(_e + 2)] << 6 | c[te.charCodeAt(_e + 3)], oe[be++] = ie >> 16 & 255, oe[be++] = ie >> 8 & 255, oe[be++] = ie & 255;
    return ae === 2 && (ie = c[te.charCodeAt(_e)] << 2 | c[te.charCodeAt(_e + 1)] >> 4, oe[be++] = ie & 255), ae === 1 && (ie = c[te.charCodeAt(_e)] << 10 | c[te.charCodeAt(_e + 1)] << 4 | c[te.charCodeAt(_e + 2)] >> 2, oe[be++] = ie >> 8 & 255, oe[be++] = ie & 255), oe;
  }
  function D(te) {
    return P[te >> 18 & 63] + P[te >> 12 & 63] + P[te >> 6 & 63] + P[te & 63];
  }
  function Q(te, ie, ne) {
    for (var se, ae = [], oe = ie; oe < ne; oe += 3)
      se = (te[oe] << 16 & 16711680) + (te[oe + 1] << 8 & 65280) + (te[oe + 2] & 255), ae.push(D(se));
    return ae.join("");
  }
  function V(te) {
    for (var ie, ne = te.length, se = ne % 3, ae = [], oe = 16383, be = 0, de = ne - se; be < de; be += oe)
      ae.push(Q(te, be, be + oe > de ? de : be + oe));
    return se === 1 ? (ie = te[ne - 1], ae.push(
      P[ie >> 2] + P[ie << 4 & 63] + "=="
    )) : se === 2 && (ie = (te[ne - 2] << 8) + te[ne - 1], ae.push(
      P[ie >> 10] + P[ie >> 4 & 63] + P[ie << 2 & 63] + "="
    )), ae.join("");
  }
  return base64Js;
}
var ieee754 = {};
/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
var hasRequiredIeee754;
function requireIeee754() {
  return hasRequiredIeee754 || (hasRequiredIeee754 = 1, ieee754.read = function(P, c, O, q, X) {
    var t, F, l = X * 8 - q - 1, U = (1 << l) - 1, $ = U >> 1, D = -7, Q = O ? X - 1 : 0, V = O ? -1 : 1, te = P[c + Q];
    for (Q += V, t = te & (1 << -D) - 1, te >>= -D, D += l; D > 0; t = t * 256 + P[c + Q], Q += V, D -= 8)
      ;
    for (F = t & (1 << -D) - 1, t >>= -D, D += q; D > 0; F = F * 256 + P[c + Q], Q += V, D -= 8)
      ;
    if (t === 0)
      t = 1 - $;
    else {
      if (t === U)
        return F ? NaN : (te ? -1 : 1) * (1 / 0);
      F = F + Math.pow(2, q), t = t - $;
    }
    return (te ? -1 : 1) * F * Math.pow(2, t - q);
  }, ieee754.write = function(P, c, O, q, X, t) {
    var F, l, U, $ = t * 8 - X - 1, D = (1 << $) - 1, Q = D >> 1, V = X === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0, te = q ? 0 : t - 1, ie = q ? 1 : -1, ne = c < 0 || c === 0 && 1 / c < 0 ? 1 : 0;
    for (c = Math.abs(c), isNaN(c) || c === 1 / 0 ? (l = isNaN(c) ? 1 : 0, F = D) : (F = Math.floor(Math.log(c) / Math.LN2), c * (U = Math.pow(2, -F)) < 1 && (F--, U *= 2), F + Q >= 1 ? c += V / U : c += V * Math.pow(2, 1 - Q), c * U >= 2 && (F++, U /= 2), F + Q >= D ? (l = 0, F = D) : F + Q >= 1 ? (l = (c * U - 1) * Math.pow(2, X), F = F + Q) : (l = c * Math.pow(2, Q - 1) * Math.pow(2, X), F = 0)); X >= 8; P[O + te] = l & 255, te += ie, l /= 256, X -= 8)
      ;
    for (F = F << X | l, $ += X; $ > 0; P[O + te] = F & 255, te += ie, F /= 256, $ -= 8)
      ;
    P[O + te - ie] |= ne * 128;
  }), ieee754;
}
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
var hasRequiredBuffer$1;
function requireBuffer$1() {
  return hasRequiredBuffer$1 || (hasRequiredBuffer$1 = 1, function(P) {
    var c = requireBase64Js(), O = requireIeee754(), q = typeof Symbol == "function" && typeof Symbol.for == "function" ? Symbol.for("nodejs.util.inspect.custom") : null;
    P.Buffer = l, P.SlowBuffer = oe, P.INSPECT_MAX_BYTES = 50;
    var X = 2147483647;
    P.kMaxLength = X, l.TYPED_ARRAY_SUPPORT = t(), !l.TYPED_ARRAY_SUPPORT && typeof console != "undefined" && typeof console.error == "function" && console.error(
      "This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."
    );
    function t() {
      try {
        var Y = new Uint8Array(1), Z = { foo: function() {
          return 42;
        } };
        return Object.setPrototypeOf(Z, Uint8Array.prototype), Object.setPrototypeOf(Y, Z), Y.foo() === 42;
      } catch (re) {
        return !1;
      }
    }
    Object.defineProperty(l.prototype, "parent", {
      enumerable: !0,
      get: function() {
        if (l.isBuffer(this))
          return this.buffer;
      }
    }), Object.defineProperty(l.prototype, "offset", {
      enumerable: !0,
      get: function() {
        if (l.isBuffer(this))
          return this.byteOffset;
      }
    });
    function F(Y) {
      if (Y > X)
        throw new RangeError('The value "' + Y + '" is invalid for option "size"');
      var Z = new Uint8Array(Y);
      return Object.setPrototypeOf(Z, l.prototype), Z;
    }
    function l(Y, Z, re) {
      if (typeof Y == "number") {
        if (typeof Z == "string")
          throw new TypeError(
            'The "string" argument must be of type string. Received type number'
          );
        return Q(Y);
      }
      return U(Y, Z, re);
    }
    l.poolSize = 8192;
    function U(Y, Z, re) {
      if (typeof Y == "string")
        return V(Y, Z);
      if (ArrayBuffer.isView(Y))
        return ie(Y);
      if (Y == null)
        throw new TypeError(
          "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof Y
        );
      if (Ae(Y, ArrayBuffer) || Y && Ae(Y.buffer, ArrayBuffer) || typeof SharedArrayBuffer != "undefined" && (Ae(Y, SharedArrayBuffer) || Y && Ae(Y.buffer, SharedArrayBuffer)))
        return ne(Y, Z, re);
      if (typeof Y == "number")
        throw new TypeError(
          'The "value" argument must not be of type number. Received type number'
        );
      var ue = Y.valueOf && Y.valueOf();
      if (ue != null && ue !== Y)
        return l.from(ue, Z, re);
      var we = se(Y);
      if (we) return we;
      if (typeof Symbol != "undefined" && Symbol.toPrimitive != null && typeof Y[Symbol.toPrimitive] == "function")
        return l.from(
          Y[Symbol.toPrimitive]("string"),
          Z,
          re
        );
      throw new TypeError(
        "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof Y
      );
    }
    l.from = function(Y, Z, re) {
      return U(Y, Z, re);
    }, Object.setPrototypeOf(l.prototype, Uint8Array.prototype), Object.setPrototypeOf(l, Uint8Array);
    function $(Y) {
      if (typeof Y != "number")
        throw new TypeError('"size" argument must be of type number');
      if (Y < 0)
        throw new RangeError('The value "' + Y + '" is invalid for option "size"');
    }
    function D(Y, Z, re) {
      return $(Y), Y <= 0 ? F(Y) : Z !== void 0 ? typeof re == "string" ? F(Y).fill(Z, re) : F(Y).fill(Z) : F(Y);
    }
    l.alloc = function(Y, Z, re) {
      return D(Y, Z, re);
    };
    function Q(Y) {
      return $(Y), F(Y < 0 ? 0 : ae(Y) | 0);
    }
    l.allocUnsafe = function(Y) {
      return Q(Y);
    }, l.allocUnsafeSlow = function(Y) {
      return Q(Y);
    };
    function V(Y, Z) {
      if ((typeof Z != "string" || Z === "") && (Z = "utf8"), !l.isEncoding(Z))
        throw new TypeError("Unknown encoding: " + Z);
      var re = be(Y, Z) | 0, ue = F(re), we = ue.write(Y, Z);
      return we !== re && (ue = ue.slice(0, we)), ue;
    }
    function te(Y) {
      for (var Z = Y.length < 0 ? 0 : ae(Y.length) | 0, re = F(Z), ue = 0; ue < Z; ue += 1)
        re[ue] = Y[ue] & 255;
      return re;
    }
    function ie(Y) {
      if (Ae(Y, Uint8Array)) {
        var Z = new Uint8Array(Y);
        return ne(Z.buffer, Z.byteOffset, Z.byteLength);
      }
      return te(Y);
    }
    function ne(Y, Z, re) {
      if (Z < 0 || Y.byteLength < Z)
        throw new RangeError('"offset" is outside of buffer bounds');
      if (Y.byteLength < Z + (re || 0))
        throw new RangeError('"length" is outside of buffer bounds');
      var ue;
      return Z === void 0 && re === void 0 ? ue = new Uint8Array(Y) : re === void 0 ? ue = new Uint8Array(Y, Z) : ue = new Uint8Array(Y, Z, re), Object.setPrototypeOf(ue, l.prototype), ue;
    }
    function se(Y) {
      if (l.isBuffer(Y)) {
        var Z = ae(Y.length) | 0, re = F(Z);
        return re.length === 0 || Y.copy(re, 0, 0, Z), re;
      }
      if (Y.length !== void 0)
        return typeof Y.length != "number" || $e(Y.length) ? F(0) : te(Y);
      if (Y.type === "Buffer" && Array.isArray(Y.data))
        return te(Y.data);
    }
    function ae(Y) {
      if (Y >= X)
        throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + X.toString(16) + " bytes");
      return Y | 0;
    }
    function oe(Y) {
      return +Y != Y && (Y = 0), l.alloc(+Y);
    }
    l.isBuffer = function(Y) {
      return Y != null && Y._isBuffer === !0 && Y !== l.prototype;
    }, l.compare = function(Y, Z) {
      if (Ae(Y, Uint8Array) && (Y = l.from(Y, Y.offset, Y.byteLength)), Ae(Z, Uint8Array) && (Z = l.from(Z, Z.offset, Z.byteLength)), !l.isBuffer(Y) || !l.isBuffer(Z))
        throw new TypeError(
          'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
        );
      if (Y === Z) return 0;
      for (var re = Y.length, ue = Z.length, we = 0, Ee = Math.min(re, ue); we < Ee; ++we)
        if (Y[we] !== Z[we]) {
          re = Y[we], ue = Z[we];
          break;
        }
      return re < ue ? -1 : ue < re ? 1 : 0;
    }, l.isEncoding = function(Y) {
      switch (String(Y).toLowerCase()) {
        case "hex":
        case "utf8":
        case "utf-8":
        case "ascii":
        case "latin1":
        case "binary":
        case "base64":
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return !0;
        default:
          return !1;
      }
    }, l.concat = function(Y, Z) {
      if (!Array.isArray(Y))
        throw new TypeError('"list" argument must be an Array of Buffers');
      if (Y.length === 0)
        return l.alloc(0);
      var re;
      if (Z === void 0)
        for (Z = 0, re = 0; re < Y.length; ++re)
          Z += Y[re].length;
      var ue = l.allocUnsafe(Z), we = 0;
      for (re = 0; re < Y.length; ++re) {
        var Ee = Y[re];
        if (Ae(Ee, Uint8Array))
          we + Ee.length > ue.length ? l.from(Ee).copy(ue, we) : Uint8Array.prototype.set.call(
            ue,
            Ee,
            we
          );
        else if (l.isBuffer(Ee))
          Ee.copy(ue, we);
        else
          throw new TypeError('"list" argument must be an Array of Buffers');
        we += Ee.length;
      }
      return ue;
    };
    function be(Y, Z) {
      if (l.isBuffer(Y))
        return Y.length;
      if (ArrayBuffer.isView(Y) || Ae(Y, ArrayBuffer))
        return Y.byteLength;
      if (typeof Y != "string")
        throw new TypeError(
          'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof Y
        );
      var re = Y.length, ue = arguments.length > 2 && arguments[2] === !0;
      if (!ue && re === 0) return 0;
      for (var we = !1; ; )
        switch (Z) {
          case "ascii":
          case "latin1":
          case "binary":
            return re;
          case "utf8":
          case "utf-8":
            return he(Y).length;
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return re * 2;
          case "hex":
            return re >>> 1;
          case "base64":
            return me(Y).length;
          default:
            if (we)
              return ue ? -1 : he(Y).length;
            Z = ("" + Z).toLowerCase(), we = !0;
        }
    }
    l.byteLength = be;
    function de(Y, Z, re) {
      var ue = !1;
      if ((Z === void 0 || Z < 0) && (Z = 0), Z > this.length || ((re === void 0 || re > this.length) && (re = this.length), re <= 0) || (re >>>= 0, Z >>>= 0, re <= Z))
        return "";
      for (Y || (Y = "utf8"); ; )
        switch (Y) {
          case "hex":
            return w(this, Z, re);
          case "utf8":
          case "utf-8":
            return o(this, Z, re);
          case "ascii":
            return z(this, Z, re);
          case "latin1":
          case "binary":
            return B(this, Z, re);
          case "base64":
            return e(this, Z, re);
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return G(this, Z, re);
          default:
            if (ue) throw new TypeError("Unknown encoding: " + Y);
            Y = (Y + "").toLowerCase(), ue = !0;
        }
    }
    l.prototype._isBuffer = !0;
    function _e(Y, Z, re) {
      var ue = Y[Z];
      Y[Z] = Y[re], Y[re] = ue;
    }
    l.prototype.swap16 = function() {
      var Y = this.length;
      if (Y % 2 !== 0)
        throw new RangeError("Buffer size must be a multiple of 16-bits");
      for (var Z = 0; Z < Y; Z += 2)
        _e(this, Z, Z + 1);
      return this;
    }, l.prototype.swap32 = function() {
      var Y = this.length;
      if (Y % 4 !== 0)
        throw new RangeError("Buffer size must be a multiple of 32-bits");
      for (var Z = 0; Z < Y; Z += 4)
        _e(this, Z, Z + 3), _e(this, Z + 1, Z + 2);
      return this;
    }, l.prototype.swap64 = function() {
      var Y = this.length;
      if (Y % 8 !== 0)
        throw new RangeError("Buffer size must be a multiple of 64-bits");
      for (var Z = 0; Z < Y; Z += 8)
        _e(this, Z, Z + 7), _e(this, Z + 1, Z + 6), _e(this, Z + 2, Z + 5), _e(this, Z + 3, Z + 4);
      return this;
    }, l.prototype.toString = function() {
      var Y = this.length;
      return Y === 0 ? "" : arguments.length === 0 ? o(this, 0, Y) : de.apply(this, arguments);
    }, l.prototype.toLocaleString = l.prototype.toString, l.prototype.equals = function(Y) {
      if (!l.isBuffer(Y)) throw new TypeError("Argument must be a Buffer");
      return this === Y ? !0 : l.compare(this, Y) === 0;
    }, l.prototype.inspect = function() {
      var Y = "", Z = P.INSPECT_MAX_BYTES;
      return Y = this.toString("hex", 0, Z).replace(/(.{2})/g, "$1 ").trim(), this.length > Z && (Y += " ... "), "<Buffer " + Y + ">";
    }, q && (l.prototype[q] = l.prototype.inspect), l.prototype.compare = function(Y, Z, re, ue, we) {
      if (Ae(Y, Uint8Array) && (Y = l.from(Y, Y.offset, Y.byteLength)), !l.isBuffer(Y))
        throw new TypeError(
          'The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof Y
        );
      if (Z === void 0 && (Z = 0), re === void 0 && (re = Y ? Y.length : 0), ue === void 0 && (ue = 0), we === void 0 && (we = this.length), Z < 0 || re > Y.length || ue < 0 || we > this.length)
        throw new RangeError("out of range index");
      if (ue >= we && Z >= re)
        return 0;
      if (ue >= we)
        return -1;
      if (Z >= re)
        return 1;
      if (Z >>>= 0, re >>>= 0, ue >>>= 0, we >>>= 0, this === Y) return 0;
      for (var Ee = we - ue, Ie = re - Z, xe = Math.min(Ee, Ie), Le = this.slice(ue, we), Pe = Y.slice(Z, re), Ce = 0; Ce < xe; ++Ce)
        if (Le[Ce] !== Pe[Ce]) {
          Ee = Le[Ce], Ie = Pe[Ce];
          break;
        }
      return Ee < Ie ? -1 : Ie < Ee ? 1 : 0;
    };
    function qe(Y, Z, re, ue, we) {
      if (Y.length === 0) return -1;
      if (typeof re == "string" ? (ue = re, re = 0) : re > 2147483647 ? re = 2147483647 : re < -2147483648 && (re = -2147483648), re = +re, $e(re) && (re = we ? 0 : Y.length - 1), re < 0 && (re = Y.length + re), re >= Y.length) {
        if (we) return -1;
        re = Y.length - 1;
      } else if (re < 0)
        if (we) re = 0;
        else return -1;
      if (typeof Z == "string" && (Z = l.from(Z, ue)), l.isBuffer(Z))
        return Z.length === 0 ? -1 : Te(Y, Z, re, ue, we);
      if (typeof Z == "number")
        return Z = Z & 255, typeof Uint8Array.prototype.indexOf == "function" ? we ? Uint8Array.prototype.indexOf.call(Y, Z, re) : Uint8Array.prototype.lastIndexOf.call(Y, Z, re) : Te(Y, [Z], re, ue, we);
      throw new TypeError("val must be string, number or Buffer");
    }
    function Te(Y, Z, re, ue, we) {
      var Ee = 1, Ie = Y.length, xe = Z.length;
      if (ue !== void 0 && (ue = String(ue).toLowerCase(), ue === "ucs2" || ue === "ucs-2" || ue === "utf16le" || ue === "utf-16le")) {
        if (Y.length < 2 || Z.length < 2)
          return -1;
        Ee = 2, Ie /= 2, xe /= 2, re /= 2;
      }
      function Le(Ne, ft) {
        return Ee === 1 ? Ne[ft] : Ne.readUInt16BE(ft * Ee);
      }
      var Pe;
      if (we) {
        var Ce = -1;
        for (Pe = re; Pe < Ie; Pe++)
          if (Le(Y, Pe) === Le(Z, Ce === -1 ? 0 : Pe - Ce)) {
            if (Ce === -1 && (Ce = Pe), Pe - Ce + 1 === xe) return Ce * Ee;
          } else
            Ce !== -1 && (Pe -= Pe - Ce), Ce = -1;
      } else
        for (re + xe > Ie && (re = Ie - xe), Pe = re; Pe >= 0; Pe--) {
          for (var je = !0, Ve = 0; Ve < xe; Ve++)
            if (Le(Y, Pe + Ve) !== Le(Z, Ve)) {
              je = !1;
              break;
            }
          if (je) return Pe;
        }
      return -1;
    }
    l.prototype.includes = function(Y, Z, re) {
      return this.indexOf(Y, Z, re) !== -1;
    }, l.prototype.indexOf = function(Y, Z, re) {
      return qe(this, Y, Z, re, !0);
    }, l.prototype.lastIndexOf = function(Y, Z, re) {
      return qe(this, Y, Z, re, !1);
    };
    function ce(Y, Z, re, ue) {
      re = Number(re) || 0;
      var we = Y.length - re;
      ue ? (ue = Number(ue), ue > we && (ue = we)) : ue = we;
      var Ee = Z.length;
      ue > Ee / 2 && (ue = Ee / 2);
      for (var Ie = 0; Ie < ue; ++Ie) {
        var xe = parseInt(Z.substr(Ie * 2, 2), 16);
        if ($e(xe)) return Ie;
        Y[re + Ie] = xe;
      }
      return Ie;
    }
    function pe(Y, Z, re, ue) {
      return ve(he(Z, Y.length - re), Y, re, ue);
    }
    function Me(Y, Z, re, ue) {
      return ve(Re(Z), Y, re, ue);
    }
    function K(Y, Z, re, ue) {
      return ve(me(Z), Y, re, ue);
    }
    function ee(Y, Z, re, ue) {
      return ve(ke(Z, Y.length - re), Y, re, ue);
    }
    l.prototype.write = function(Y, Z, re, ue) {
      if (Z === void 0)
        ue = "utf8", re = this.length, Z = 0;
      else if (re === void 0 && typeof Z == "string")
        ue = Z, re = this.length, Z = 0;
      else if (isFinite(Z))
        Z = Z >>> 0, isFinite(re) ? (re = re >>> 0, ue === void 0 && (ue = "utf8")) : (ue = re, re = void 0);
      else
        throw new Error(
          "Buffer.write(string, encoding, offset[, length]) is no longer supported"
        );
      var we = this.length - Z;
      if ((re === void 0 || re > we) && (re = we), Y.length > 0 && (re < 0 || Z < 0) || Z > this.length)
        throw new RangeError("Attempt to write outside buffer bounds");
      ue || (ue = "utf8");
      for (var Ee = !1; ; )
        switch (ue) {
          case "hex":
            return ce(this, Y, Z, re);
          case "utf8":
          case "utf-8":
            return pe(this, Y, Z, re);
          case "ascii":
          case "latin1":
          case "binary":
            return Me(this, Y, Z, re);
          case "base64":
            return K(this, Y, Z, re);
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return ee(this, Y, Z, re);
          default:
            if (Ee) throw new TypeError("Unknown encoding: " + ue);
            ue = ("" + ue).toLowerCase(), Ee = !0;
        }
    }, l.prototype.toJSON = function() {
      return {
        type: "Buffer",
        data: Array.prototype.slice.call(this._arr || this, 0)
      };
    };
    function e(Y, Z, re) {
      return Z === 0 && re === Y.length ? c.fromByteArray(Y) : c.fromByteArray(Y.slice(Z, re));
    }
    function o(Y, Z, re) {
      re = Math.min(Y.length, re);
      for (var ue = [], we = Z; we < re; ) {
        var Ee = Y[we], Ie = null, xe = Ee > 239 ? 4 : Ee > 223 ? 3 : Ee > 191 ? 2 : 1;
        if (we + xe <= re) {
          var Le, Pe, Ce, je;
          switch (xe) {
            case 1:
              Ee < 128 && (Ie = Ee);
              break;
            case 2:
              Le = Y[we + 1], (Le & 192) === 128 && (je = (Ee & 31) << 6 | Le & 63, je > 127 && (Ie = je));
              break;
            case 3:
              Le = Y[we + 1], Pe = Y[we + 2], (Le & 192) === 128 && (Pe & 192) === 128 && (je = (Ee & 15) << 12 | (Le & 63) << 6 | Pe & 63, je > 2047 && (je < 55296 || je > 57343) && (Ie = je));
              break;
            case 4:
              Le = Y[we + 1], Pe = Y[we + 2], Ce = Y[we + 3], (Le & 192) === 128 && (Pe & 192) === 128 && (Ce & 192) === 128 && (je = (Ee & 15) << 18 | (Le & 63) << 12 | (Pe & 63) << 6 | Ce & 63, je > 65535 && je < 1114112 && (Ie = je));
          }
        }
        Ie === null ? (Ie = 65533, xe = 1) : Ie > 65535 && (Ie -= 65536, ue.push(Ie >>> 10 & 1023 | 55296), Ie = 56320 | Ie & 1023), ue.push(Ie), we += xe;
      }
      return H(ue);
    }
    var y = 4096;
    function H(Y) {
      var Z = Y.length;
      if (Z <= y)
        return String.fromCharCode.apply(String, Y);
      for (var re = "", ue = 0; ue < Z; )
        re += String.fromCharCode.apply(
          String,
          Y.slice(ue, ue += y)
        );
      return re;
    }
    function z(Y, Z, re) {
      var ue = "";
      re = Math.min(Y.length, re);
      for (var we = Z; we < re; ++we)
        ue += String.fromCharCode(Y[we] & 127);
      return ue;
    }
    function B(Y, Z, re) {
      var ue = "";
      re = Math.min(Y.length, re);
      for (var we = Z; we < re; ++we)
        ue += String.fromCharCode(Y[we]);
      return ue;
    }
    function w(Y, Z, re) {
      var ue = Y.length;
      (!Z || Z < 0) && (Z = 0), (!re || re < 0 || re > ue) && (re = ue);
      for (var we = "", Ee = Z; Ee < re; ++Ee)
        we += Oe[Y[Ee]];
      return we;
    }
    function G(Y, Z, re) {
      for (var ue = Y.slice(Z, re), we = "", Ee = 0; Ee < ue.length - 1; Ee += 2)
        we += String.fromCharCode(ue[Ee] + ue[Ee + 1] * 256);
      return we;
    }
    l.prototype.slice = function(Y, Z) {
      var re = this.length;
      Y = ~~Y, Z = Z === void 0 ? re : ~~Z, Y < 0 ? (Y += re, Y < 0 && (Y = 0)) : Y > re && (Y = re), Z < 0 ? (Z += re, Z < 0 && (Z = 0)) : Z > re && (Z = re), Z < Y && (Z = Y);
      var ue = this.subarray(Y, Z);
      return Object.setPrototypeOf(ue, l.prototype), ue;
    };
    function g(Y, Z, re) {
      if (Y % 1 !== 0 || Y < 0) throw new RangeError("offset is not uint");
      if (Y + Z > re) throw new RangeError("Trying to access beyond buffer length");
    }
    l.prototype.readUintLE = l.prototype.readUIntLE = function(Y, Z, re) {
      Y = Y >>> 0, Z = Z >>> 0, re || g(Y, Z, this.length);
      for (var ue = this[Y], we = 1, Ee = 0; ++Ee < Z && (we *= 256); )
        ue += this[Y + Ee] * we;
      return ue;
    }, l.prototype.readUintBE = l.prototype.readUIntBE = function(Y, Z, re) {
      Y = Y >>> 0, Z = Z >>> 0, re || g(Y, Z, this.length);
      for (var ue = this[Y + --Z], we = 1; Z > 0 && (we *= 256); )
        ue += this[Y + --Z] * we;
      return ue;
    }, l.prototype.readUint8 = l.prototype.readUInt8 = function(Y, Z) {
      return Y = Y >>> 0, Z || g(Y, 1, this.length), this[Y];
    }, l.prototype.readUint16LE = l.prototype.readUInt16LE = function(Y, Z) {
      return Y = Y >>> 0, Z || g(Y, 2, this.length), this[Y] | this[Y + 1] << 8;
    }, l.prototype.readUint16BE = l.prototype.readUInt16BE = function(Y, Z) {
      return Y = Y >>> 0, Z || g(Y, 2, this.length), this[Y] << 8 | this[Y + 1];
    }, l.prototype.readUint32LE = l.prototype.readUInt32LE = function(Y, Z) {
      return Y = Y >>> 0, Z || g(Y, 4, this.length), (this[Y] | this[Y + 1] << 8 | this[Y + 2] << 16) + this[Y + 3] * 16777216;
    }, l.prototype.readUint32BE = l.prototype.readUInt32BE = function(Y, Z) {
      return Y = Y >>> 0, Z || g(Y, 4, this.length), this[Y] * 16777216 + (this[Y + 1] << 16 | this[Y + 2] << 8 | this[Y + 3]);
    }, l.prototype.readIntLE = function(Y, Z, re) {
      Y = Y >>> 0, Z = Z >>> 0, re || g(Y, Z, this.length);
      for (var ue = this[Y], we = 1, Ee = 0; ++Ee < Z && (we *= 256); )
        ue += this[Y + Ee] * we;
      return we *= 128, ue >= we && (ue -= Math.pow(2, 8 * Z)), ue;
    }, l.prototype.readIntBE = function(Y, Z, re) {
      Y = Y >>> 0, Z = Z >>> 0, re || g(Y, Z, this.length);
      for (var ue = Z, we = 1, Ee = this[Y + --ue]; ue > 0 && (we *= 256); )
        Ee += this[Y + --ue] * we;
      return we *= 128, Ee >= we && (Ee -= Math.pow(2, 8 * Z)), Ee;
    }, l.prototype.readInt8 = function(Y, Z) {
      return Y = Y >>> 0, Z || g(Y, 1, this.length), this[Y] & 128 ? (255 - this[Y] + 1) * -1 : this[Y];
    }, l.prototype.readInt16LE = function(Y, Z) {
      Y = Y >>> 0, Z || g(Y, 2, this.length);
      var re = this[Y] | this[Y + 1] << 8;
      return re & 32768 ? re | 4294901760 : re;
    }, l.prototype.readInt16BE = function(Y, Z) {
      Y = Y >>> 0, Z || g(Y, 2, this.length);
      var re = this[Y + 1] | this[Y] << 8;
      return re & 32768 ? re | 4294901760 : re;
    }, l.prototype.readInt32LE = function(Y, Z) {
      return Y = Y >>> 0, Z || g(Y, 4, this.length), this[Y] | this[Y + 1] << 8 | this[Y + 2] << 16 | this[Y + 3] << 24;
    }, l.prototype.readInt32BE = function(Y, Z) {
      return Y = Y >>> 0, Z || g(Y, 4, this.length), this[Y] << 24 | this[Y + 1] << 16 | this[Y + 2] << 8 | this[Y + 3];
    }, l.prototype.readFloatLE = function(Y, Z) {
      return Y = Y >>> 0, Z || g(Y, 4, this.length), O.read(this, Y, !0, 23, 4);
    }, l.prototype.readFloatBE = function(Y, Z) {
      return Y = Y >>> 0, Z || g(Y, 4, this.length), O.read(this, Y, !1, 23, 4);
    }, l.prototype.readDoubleLE = function(Y, Z) {
      return Y = Y >>> 0, Z || g(Y, 8, this.length), O.read(this, Y, !0, 52, 8);
    }, l.prototype.readDoubleBE = function(Y, Z) {
      return Y = Y >>> 0, Z || g(Y, 8, this.length), O.read(this, Y, !1, 52, 8);
    };
    function J(Y, Z, re, ue, we, Ee) {
      if (!l.isBuffer(Y)) throw new TypeError('"buffer" argument must be a Buffer instance');
      if (Z > we || Z < Ee) throw new RangeError('"value" argument is out of bounds');
      if (re + ue > Y.length) throw new RangeError("Index out of range");
    }
    l.prototype.writeUintLE = l.prototype.writeUIntLE = function(Y, Z, re, ue) {
      if (Y = +Y, Z = Z >>> 0, re = re >>> 0, !ue) {
        var we = Math.pow(2, 8 * re) - 1;
        J(this, Y, Z, re, we, 0);
      }
      var Ee = 1, Ie = 0;
      for (this[Z] = Y & 255; ++Ie < re && (Ee *= 256); )
        this[Z + Ie] = Y / Ee & 255;
      return Z + re;
    }, l.prototype.writeUintBE = l.prototype.writeUIntBE = function(Y, Z, re, ue) {
      if (Y = +Y, Z = Z >>> 0, re = re >>> 0, !ue) {
        var we = Math.pow(2, 8 * re) - 1;
        J(this, Y, Z, re, we, 0);
      }
      var Ee = re - 1, Ie = 1;
      for (this[Z + Ee] = Y & 255; --Ee >= 0 && (Ie *= 256); )
        this[Z + Ee] = Y / Ie & 255;
      return Z + re;
    }, l.prototype.writeUint8 = l.prototype.writeUInt8 = function(Y, Z, re) {
      return Y = +Y, Z = Z >>> 0, re || J(this, Y, Z, 1, 255, 0), this[Z] = Y & 255, Z + 1;
    }, l.prototype.writeUint16LE = l.prototype.writeUInt16LE = function(Y, Z, re) {
      return Y = +Y, Z = Z >>> 0, re || J(this, Y, Z, 2, 65535, 0), this[Z] = Y & 255, this[Z + 1] = Y >>> 8, Z + 2;
    }, l.prototype.writeUint16BE = l.prototype.writeUInt16BE = function(Y, Z, re) {
      return Y = +Y, Z = Z >>> 0, re || J(this, Y, Z, 2, 65535, 0), this[Z] = Y >>> 8, this[Z + 1] = Y & 255, Z + 2;
    }, l.prototype.writeUint32LE = l.prototype.writeUInt32LE = function(Y, Z, re) {
      return Y = +Y, Z = Z >>> 0, re || J(this, Y, Z, 4, 4294967295, 0), this[Z + 3] = Y >>> 24, this[Z + 2] = Y >>> 16, this[Z + 1] = Y >>> 8, this[Z] = Y & 255, Z + 4;
    }, l.prototype.writeUint32BE = l.prototype.writeUInt32BE = function(Y, Z, re) {
      return Y = +Y, Z = Z >>> 0, re || J(this, Y, Z, 4, 4294967295, 0), this[Z] = Y >>> 24, this[Z + 1] = Y >>> 16, this[Z + 2] = Y >>> 8, this[Z + 3] = Y & 255, Z + 4;
    }, l.prototype.writeIntLE = function(Y, Z, re, ue) {
      if (Y = +Y, Z = Z >>> 0, !ue) {
        var we = Math.pow(2, 8 * re - 1);
        J(this, Y, Z, re, we - 1, -we);
      }
      var Ee = 0, Ie = 1, xe = 0;
      for (this[Z] = Y & 255; ++Ee < re && (Ie *= 256); )
        Y < 0 && xe === 0 && this[Z + Ee - 1] !== 0 && (xe = 1), this[Z + Ee] = (Y / Ie >> 0) - xe & 255;
      return Z + re;
    }, l.prototype.writeIntBE = function(Y, Z, re, ue) {
      if (Y = +Y, Z = Z >>> 0, !ue) {
        var we = Math.pow(2, 8 * re - 1);
        J(this, Y, Z, re, we - 1, -we);
      }
      var Ee = re - 1, Ie = 1, xe = 0;
      for (this[Z + Ee] = Y & 255; --Ee >= 0 && (Ie *= 256); )
        Y < 0 && xe === 0 && this[Z + Ee + 1] !== 0 && (xe = 1), this[Z + Ee] = (Y / Ie >> 0) - xe & 255;
      return Z + re;
    }, l.prototype.writeInt8 = function(Y, Z, re) {
      return Y = +Y, Z = Z >>> 0, re || J(this, Y, Z, 1, 127, -128), Y < 0 && (Y = 255 + Y + 1), this[Z] = Y & 255, Z + 1;
    }, l.prototype.writeInt16LE = function(Y, Z, re) {
      return Y = +Y, Z = Z >>> 0, re || J(this, Y, Z, 2, 32767, -32768), this[Z] = Y & 255, this[Z + 1] = Y >>> 8, Z + 2;
    }, l.prototype.writeInt16BE = function(Y, Z, re) {
      return Y = +Y, Z = Z >>> 0, re || J(this, Y, Z, 2, 32767, -32768), this[Z] = Y >>> 8, this[Z + 1] = Y & 255, Z + 2;
    }, l.prototype.writeInt32LE = function(Y, Z, re) {
      return Y = +Y, Z = Z >>> 0, re || J(this, Y, Z, 4, 2147483647, -2147483648), this[Z] = Y & 255, this[Z + 1] = Y >>> 8, this[Z + 2] = Y >>> 16, this[Z + 3] = Y >>> 24, Z + 4;
    }, l.prototype.writeInt32BE = function(Y, Z, re) {
      return Y = +Y, Z = Z >>> 0, re || J(this, Y, Z, 4, 2147483647, -2147483648), Y < 0 && (Y = 4294967295 + Y + 1), this[Z] = Y >>> 24, this[Z + 1] = Y >>> 16, this[Z + 2] = Y >>> 8, this[Z + 3] = Y & 255, Z + 4;
    };
    function le(Y, Z, re, ue, we, Ee) {
      if (re + ue > Y.length) throw new RangeError("Index out of range");
      if (re < 0) throw new RangeError("Index out of range");
    }
    function ge(Y, Z, re, ue, we) {
      return Z = +Z, re = re >>> 0, we || le(Y, Z, re, 4), O.write(Y, Z, re, ue, 23, 4), re + 4;
    }
    l.prototype.writeFloatLE = function(Y, Z, re) {
      return ge(this, Y, Z, !0, re);
    }, l.prototype.writeFloatBE = function(Y, Z, re) {
      return ge(this, Y, Z, !1, re);
    };
    function Se(Y, Z, re, ue, we) {
      return Z = +Z, re = re >>> 0, we || le(Y, Z, re, 8), O.write(Y, Z, re, ue, 52, 8), re + 8;
    }
    l.prototype.writeDoubleLE = function(Y, Z, re) {
      return Se(this, Y, Z, !0, re);
    }, l.prototype.writeDoubleBE = function(Y, Z, re) {
      return Se(this, Y, Z, !1, re);
    }, l.prototype.copy = function(Y, Z, re, ue) {
      if (!l.isBuffer(Y)) throw new TypeError("argument should be a Buffer");
      if (re || (re = 0), !ue && ue !== 0 && (ue = this.length), Z >= Y.length && (Z = Y.length), Z || (Z = 0), ue > 0 && ue < re && (ue = re), ue === re || Y.length === 0 || this.length === 0) return 0;
      if (Z < 0)
        throw new RangeError("targetStart out of bounds");
      if (re < 0 || re >= this.length) throw new RangeError("Index out of range");
      if (ue < 0) throw new RangeError("sourceEnd out of bounds");
      ue > this.length && (ue = this.length), Y.length - Z < ue - re && (ue = Y.length - Z + re);
      var we = ue - re;
      return this === Y && typeof Uint8Array.prototype.copyWithin == "function" ? this.copyWithin(Z, re, ue) : Uint8Array.prototype.set.call(
        Y,
        this.subarray(re, ue),
        Z
      ), we;
    }, l.prototype.fill = function(Y, Z, re, ue) {
      if (typeof Y == "string") {
        if (typeof Z == "string" ? (ue = Z, Z = 0, re = this.length) : typeof re == "string" && (ue = re, re = this.length), ue !== void 0 && typeof ue != "string")
          throw new TypeError("encoding must be a string");
        if (typeof ue == "string" && !l.isEncoding(ue))
          throw new TypeError("Unknown encoding: " + ue);
        if (Y.length === 1) {
          var we = Y.charCodeAt(0);
          (ue === "utf8" && we < 128 || ue === "latin1") && (Y = we);
        }
      } else typeof Y == "number" ? Y = Y & 255 : typeof Y == "boolean" && (Y = Number(Y));
      if (Z < 0 || this.length < Z || this.length < re)
        throw new RangeError("Out of range index");
      if (re <= Z)
        return this;
      Z = Z >>> 0, re = re === void 0 ? this.length : re >>> 0, Y || (Y = 0);
      var Ee;
      if (typeof Y == "number")
        for (Ee = Z; Ee < re; ++Ee)
          this[Ee] = Y;
      else {
        var Ie = l.isBuffer(Y) ? Y : l.from(Y, ue), xe = Ie.length;
        if (xe === 0)
          throw new TypeError('The value "' + Y + '" is invalid for argument "value"');
        for (Ee = 0; Ee < re - Z; ++Ee)
          this[Ee + Z] = Ie[Ee % xe];
      }
      return this;
    };
    var ye = /[^+/0-9A-Za-z-_]/g;
    function fe(Y) {
      if (Y = Y.split("=")[0], Y = Y.trim().replace(ye, ""), Y.length < 2) return "";
      for (; Y.length % 4 !== 0; )
        Y = Y + "=";
      return Y;
    }
    function he(Y, Z) {
      Z = Z || 1 / 0;
      for (var re, ue = Y.length, we = null, Ee = [], Ie = 0; Ie < ue; ++Ie) {
        if (re = Y.charCodeAt(Ie), re > 55295 && re < 57344) {
          if (!we) {
            if (re > 56319) {
              (Z -= 3) > -1 && Ee.push(239, 191, 189);
              continue;
            } else if (Ie + 1 === ue) {
              (Z -= 3) > -1 && Ee.push(239, 191, 189);
              continue;
            }
            we = re;
            continue;
          }
          if (re < 56320) {
            (Z -= 3) > -1 && Ee.push(239, 191, 189), we = re;
            continue;
          }
          re = (we - 55296 << 10 | re - 56320) + 65536;
        } else we && (Z -= 3) > -1 && Ee.push(239, 191, 189);
        if (we = null, re < 128) {
          if ((Z -= 1) < 0) break;
          Ee.push(re);
        } else if (re < 2048) {
          if ((Z -= 2) < 0) break;
          Ee.push(
            re >> 6 | 192,
            re & 63 | 128
          );
        } else if (re < 65536) {
          if ((Z -= 3) < 0) break;
          Ee.push(
            re >> 12 | 224,
            re >> 6 & 63 | 128,
            re & 63 | 128
          );
        } else if (re < 1114112) {
          if ((Z -= 4) < 0) break;
          Ee.push(
            re >> 18 | 240,
            re >> 12 & 63 | 128,
            re >> 6 & 63 | 128,
            re & 63 | 128
          );
        } else
          throw new Error("Invalid code point");
      }
      return Ee;
    }
    function Re(Y) {
      for (var Z = [], re = 0; re < Y.length; ++re)
        Z.push(Y.charCodeAt(re) & 255);
      return Z;
    }
    function ke(Y, Z) {
      for (var re, ue, we, Ee = [], Ie = 0; Ie < Y.length && !((Z -= 2) < 0); ++Ie)
        re = Y.charCodeAt(Ie), ue = re >> 8, we = re % 256, Ee.push(we), Ee.push(ue);
      return Ee;
    }
    function me(Y) {
      return c.toByteArray(fe(Y));
    }
    function ve(Y, Z, re, ue) {
      for (var we = 0; we < ue && !(we + re >= Z.length || we >= Y.length); ++we)
        Z[we + re] = Y[we];
      return we;
    }
    function Ae(Y, Z) {
      return Y instanceof Z || Y != null && Y.constructor != null && Y.constructor.name != null && Y.constructor.name === Z.name;
    }
    function $e(Y) {
      return Y !== Y;
    }
    var Oe = function() {
      for (var Y = "0123456789abcdef", Z = new Array(256), re = 0; re < 16; ++re)
        for (var ue = re * 16, we = 0; we < 16; ++we)
          Z[ue + we] = Y[re] + Y[we];
      return Z;
    }();
  }(buffer$1)), buffer$1;
}
var bufferExports = requireBuffer$1(), browser$c = { exports: {} }, process = browser$c.exports = {}, cachedSetTimeout, cachedClearTimeout;
function defaultSetTimout() {
  throw new Error("setTimeout has not been defined");
}
function defaultClearTimeout() {
  throw new Error("clearTimeout has not been defined");
}
(function() {
  try {
    typeof setTimeout == "function" ? cachedSetTimeout = setTimeout : cachedSetTimeout = defaultSetTimout;
  } catch (P) {
    cachedSetTimeout = defaultSetTimout;
  }
  try {
    typeof clearTimeout == "function" ? cachedClearTimeout = clearTimeout : cachedClearTimeout = defaultClearTimeout;
  } catch (P) {
    cachedClearTimeout = defaultClearTimeout;
  }
})();
function runTimeout(P) {
  if (cachedSetTimeout === setTimeout)
    return setTimeout(P, 0);
  if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout)
    return cachedSetTimeout = setTimeout, setTimeout(P, 0);
  try {
    return cachedSetTimeout(P, 0);
  } catch (c) {
    try {
      return cachedSetTimeout.call(null, P, 0);
    } catch (O) {
      return cachedSetTimeout.call(this, P, 0);
    }
  }
}
function runClearTimeout(P) {
  if (cachedClearTimeout === clearTimeout)
    return clearTimeout(P);
  if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout)
    return cachedClearTimeout = clearTimeout, clearTimeout(P);
  try {
    return cachedClearTimeout(P);
  } catch (c) {
    try {
      return cachedClearTimeout.call(null, P);
    } catch (O) {
      return cachedClearTimeout.call(this, P);
    }
  }
}
var queue = [], draining = !1, currentQueue, queueIndex = -1;
function cleanUpNextTick() {
  !draining || !currentQueue || (draining = !1, currentQueue.length ? queue = currentQueue.concat(queue) : queueIndex = -1, queue.length && drainQueue());
}
function drainQueue() {
  if (!draining) {
    var P = runTimeout(cleanUpNextTick);
    draining = !0;
    for (var c = queue.length; c; ) {
      for (currentQueue = queue, queue = []; ++queueIndex < c; )
        currentQueue && currentQueue[queueIndex].run();
      queueIndex = -1, c = queue.length;
    }
    currentQueue = null, draining = !1, runClearTimeout(P);
  }
}
process.nextTick = function(P) {
  var c = new Array(arguments.length - 1);
  if (arguments.length > 1)
    for (var O = 1; O < arguments.length; O++)
      c[O - 1] = arguments[O];
  queue.push(new Item(P, c)), queue.length === 1 && !draining && runTimeout(drainQueue);
};
function Item(P, c) {
  this.fun = P, this.array = c;
}
Item.prototype.run = function() {
  this.fun.apply(null, this.array);
};
process.title = "browser";
process.browser = !0;
process.env = {};
process.argv = [];
process.version = "";
process.versions = {};
function noop() {
}
process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;
process.listeners = function(P) {
  return [];
};
process.binding = function(P) {
  throw new Error("process.binding is not supported");
};
process.cwd = function() {
  return "/";
};
process.chdir = function(P) {
  throw new Error("process.chdir is not supported");
};
process.umask = function() {
  return 0;
};
var browserExports = browser$c.exports;
const process$1 = /* @__PURE__ */ getDefaultExportFromCjs(browserExports);
(function(P) {
  function c() {
    var q = this || self;
    return delete P.prototype.__magic__, q;
  }
  if (typeof globalThis == "object")
    return globalThis;
  if (this)
    return c();
  P.defineProperty(P.prototype, "__magic__", {
    configurable: !0,
    get: c
  });
  var O = __magic__;
  return O;
})(Object);
var eventemitter2 = { exports: {} };
(function(P, c) {
  (function(O) {
    var q = Object.hasOwnProperty, X = Array.isArray ? Array.isArray : function(B) {
      return Object.prototype.toString.call(B) === "[object Array]";
    }, t = 10, F = typeof process$1 == "object" && typeof process$1.nextTick == "function", l = typeof Symbol == "function", U = typeof Reflect == "object", $ = typeof setImmediate == "function", D = $ ? setImmediate : setTimeout, Q = l ? U && typeof Reflect.ownKeys == "function" ? Reflect.ownKeys : function(B) {
      var w = Object.getOwnPropertyNames(B);
      return w.push.apply(w, Object.getOwnPropertySymbols(B)), w;
    } : Object.keys;
    function V() {
      this._events = {}, this._conf && te.call(this, this._conf);
    }
    function te(B) {
      B && (this._conf = B, B.delimiter && (this.delimiter = B.delimiter), B.maxListeners !== O && (this._maxListeners = B.maxListeners), B.wildcard && (this.wildcard = B.wildcard), B.newListener && (this._newListener = B.newListener), B.removeListener && (this._removeListener = B.removeListener), B.verboseMemoryLeak && (this.verboseMemoryLeak = B.verboseMemoryLeak), B.ignoreErrors && (this.ignoreErrors = B.ignoreErrors), this.wildcard && (this.listenerTree = {}));
    }
    function ie(B, w) {
      var G = "(node) warning: possible EventEmitter memory leak detected. " + B + " listeners added. Use emitter.setMaxListeners() to increase limit.";
      if (this.verboseMemoryLeak && (G += " Event name: " + w + "."), typeof process$1 != "undefined" && process$1.emitWarning) {
        var g = new Error(G);
        g.name = "MaxListenersExceededWarning", g.emitter = this, g.count = B, process$1.emitWarning(g);
      } else
        console.error(G), console.trace && console.trace();
    }
    var ne = function(B, w, G) {
      var g = arguments.length;
      switch (g) {
        case 0:
          return [];
        case 1:
          return [B];
        case 2:
          return [B, w];
        case 3:
          return [B, w, G];
        default:
          for (var J = new Array(g); g--; )
            J[g] = arguments[g];
          return J;
      }
    };
    function se(B, w) {
      for (var G = {}, g, J = B.length, le = 0, ge = 0; ge < J; ge++)
        g = B[ge], G[g] = ge < le ? w[ge] : O;
      return G;
    }
    function ae(B, w, G) {
      this._emitter = B, this._target = w, this._listeners = {}, this._listenersCount = 0;
      var g, J;
      if ((G.on || G.off) && (g = G.on, J = G.off), w.addEventListener ? (g = w.addEventListener, J = w.removeEventListener) : w.addListener ? (g = w.addListener, J = w.removeListener) : w.on && (g = w.on, J = w.off), !g && !J)
        throw Error("target does not implement any known event API");
      if (typeof g != "function")
        throw TypeError("on method must be a function");
      if (typeof J != "function")
        throw TypeError("off method must be a function");
      this._on = g, this._off = J;
      var le = B._observers;
      le ? le.push(this) : B._observers = [this];
    }
    Object.assign(ae.prototype, {
      subscribe: function(B, w, G) {
        var g = this, J = this._target, le = this._emitter, ge = this._listeners, Se = function() {
          var ye = ne.apply(null, arguments), fe = {
            data: ye,
            name: w,
            original: B
          };
          if (G) {
            var he = G.call(J, fe);
            he !== !1 && le.emit.apply(le, [fe.name].concat(ye));
            return;
          }
          le.emit.apply(le, [w].concat(ye));
        };
        if (ge[B])
          throw Error("Event '" + B + "' is already listening");
        this._listenersCount++, le._newListener && le._removeListener && !g._onNewListener ? (this._onNewListener = function(ye) {
          ye === w && ge[B] === null && (ge[B] = Se, g._on.call(J, B, Se));
        }, le.on("newListener", this._onNewListener), this._onRemoveListener = function(ye) {
          ye === w && !le.hasListeners(ye) && ge[B] && (ge[B] = null, g._off.call(J, B, Se));
        }, ge[B] = null, le.on("removeListener", this._onRemoveListener)) : (ge[B] = Se, g._on.call(J, B, Se));
      },
      unsubscribe: function(B) {
        var w = this, G = this._listeners, g = this._emitter, J, le, ge = this._off, Se = this._target, ye;
        if (B && typeof B != "string")
          throw TypeError("event must be a string");
        function fe() {
          w._onNewListener && (g.off("newListener", w._onNewListener), g.off("removeListener", w._onRemoveListener), w._onNewListener = null, w._onRemoveListener = null);
          var he = ce.call(g, w);
          g._observers.splice(he, 1);
        }
        if (B) {
          if (J = G[B], !J) return;
          ge.call(Se, B, J), delete G[B], --this._listenersCount || fe();
        } else {
          for (le = Q(G), ye = le.length; ye-- > 0; )
            B = le[ye], ge.call(Se, B, G[B]);
          this._listeners = {}, this._listenersCount = 0, fe();
        }
      }
    });
    function oe(B, w, G, g) {
      var J = Object.assign({}, w);
      if (!B) return J;
      if (typeof B != "object")
        throw TypeError("options must be an object");
      var le = Object.keys(B), ge = le.length, Se, ye, fe;
      function he(ke) {
        throw Error('Invalid "' + Se + '" option value' + (ke ? ". Reason: " + ke : ""));
      }
      for (var Re = 0; Re < ge; Re++) {
        if (Se = le[Re], !q.call(w, Se))
          throw Error('Unknown "' + Se + '" option');
        ye = B[Se], ye !== O && (fe = G[Se], J[Se] = fe ? fe(ye, he) : ye);
      }
      return J;
    }
    function be(B, w) {
      return (typeof B != "function" || !B.hasOwnProperty("prototype")) && w("value must be a constructor"), B;
    }
    function de(B) {
      var w = "value must be type of " + B.join("|"), G = B.length, g = B[0], J = B[1];
      return G === 1 ? function(le, ge) {
        if (typeof le === g)
          return le;
        ge(w);
      } : G === 2 ? function(le, ge) {
        var Se = typeof le;
        if (Se === g || Se === J) return le;
        ge(w);
      } : function(le, ge) {
        for (var Se = typeof le, ye = G; ye-- > 0; )
          if (Se === B[ye]) return le;
        ge(w);
      };
    }
    var _e = de(["function"]), qe = de(["object", "function"]);
    function Te(B, w, G) {
      var g, J, le = 0, ge, Se = new B(function(ye, fe, he) {
        G = oe(G, {
          timeout: 0,
          overload: !1
        }, {
          timeout: function(ve, Ae) {
            return ve *= 1, (typeof ve != "number" || ve < 0 || !Number.isFinite(ve)) && Ae("timeout must be a positive number"), ve;
          }
        }), g = !G.overload && typeof B.prototype.cancel == "function" && typeof he == "function";
        function Re() {
          J && (J = null), le && (clearTimeout(le), le = 0);
        }
        var ke = function(ve) {
          Re(), ye(ve);
        }, me = function(ve) {
          Re(), fe(ve);
        };
        g ? w(ke, me, he) : (J = [function(ve) {
          me(ve || Error("canceled"));
        }], w(ke, me, function(ve) {
          if (ge)
            throw Error("Unable to subscribe on cancel event asynchronously");
          if (typeof ve != "function")
            throw TypeError("onCancel callback must be a function");
          J.push(ve);
        }), ge = !0), G.timeout > 0 && (le = setTimeout(function() {
          var ve = Error("timeout");
          ve.code = "ETIMEDOUT", le = 0, Se.cancel(ve), fe(ve);
        }, G.timeout));
      });
      return g || (Se.cancel = function(ye) {
        if (J) {
          for (var fe = J.length, he = 1; he < fe; he++)
            J[he](ye);
          J[0](ye), J = null;
        }
      }), Se;
    }
    function ce(B) {
      var w = this._observers;
      if (!w)
        return -1;
      for (var G = w.length, g = 0; g < G; g++)
        if (w[g]._target === B) return g;
      return -1;
    }
    function pe(B, w, G, g, J) {
      if (!G)
        return null;
      if (g === 0) {
        var le = typeof w;
        if (le === "string") {
          var ge, Se, ye = 0, fe = 0, he = this.delimiter, Re = he.length;
          if ((Se = w.indexOf(he)) !== -1) {
            ge = new Array(5);
            do
              ge[ye++] = w.slice(fe, Se), fe = Se + Re;
            while ((Se = w.indexOf(he, fe)) !== -1);
            ge[ye++] = w.slice(fe), w = ge, J = ye;
          } else
            w = [w], J = 1;
        } else le === "object" ? J = w.length : (w = [w], J = 1);
      }
      var ke = null, me, ve, Ae, $e, Oe, Y = w[g], Z = w[g + 1], re, ue;
      if (g === J)
        G._listeners && (typeof G._listeners == "function" ? (B && B.push(G._listeners), ke = [G]) : (B && B.push.apply(B, G._listeners), ke = [G]));
      else if (Y === "*") {
        for (re = Q(G), Se = re.length; Se-- > 0; )
          me = re[Se], me !== "_listeners" && (ue = pe(B, w, G[me], g + 1, J), ue && (ke ? ke.push.apply(ke, ue) : ke = ue));
        return ke;
      } else if (Y === "**") {
        for (Oe = g + 1 === J || g + 2 === J && Z === "*", Oe && G._listeners && (ke = pe(B, w, G, J, J)), re = Q(G), Se = re.length; Se-- > 0; )
          me = re[Se], me !== "_listeners" && (me === "*" || me === "**" ? (G[me]._listeners && !Oe && (ue = pe(B, w, G[me], J, J), ue && (ke ? ke.push.apply(ke, ue) : ke = ue)), ue = pe(B, w, G[me], g, J)) : me === Z ? ue = pe(B, w, G[me], g + 2, J) : ue = pe(B, w, G[me], g, J), ue && (ke ? ke.push.apply(ke, ue) : ke = ue));
        return ke;
      } else G[Y] && (ke = pe(B, w, G[Y], g + 1, J));
      if (ve = G["*"], ve && pe(B, w, ve, g + 1, J), Ae = G["**"], Ae)
        if (g < J)
          for (Ae._listeners && pe(B, w, Ae, J, J), re = Q(Ae), Se = re.length; Se-- > 0; )
            me = re[Se], me !== "_listeners" && (me === Z ? pe(B, w, Ae[me], g + 2, J) : me === Y ? pe(B, w, Ae[me], g + 1, J) : ($e = {}, $e[me] = Ae[me], pe(B, w, { "**": $e }, g + 1, J)));
        else Ae._listeners ? pe(B, w, Ae, J, J) : Ae["*"] && Ae["*"]._listeners && pe(B, w, Ae["*"], J, J);
      return ke;
    }
    function Me(B, w, G) {
      var g = 0, J = 0, le, ge = this.delimiter, Se = ge.length, ye;
      if (typeof B == "string")
        if ((le = B.indexOf(ge)) !== -1) {
          ye = new Array(5);
          do
            ye[g++] = B.slice(J, le), J = le + Se;
          while ((le = B.indexOf(ge, J)) !== -1);
          ye[g++] = B.slice(J);
        } else
          ye = [B], g = 1;
      else
        ye = B, g = B.length;
      if (g > 1) {
        for (le = 0; le + 1 < g; le++)
          if (ye[le] === "**" && ye[le + 1] === "**")
            return;
      }
      var fe = this.listenerTree, he;
      for (le = 0; le < g; le++)
        if (he = ye[le], fe = fe[he] || (fe[he] = {}), le === g - 1)
          return fe._listeners ? (typeof fe._listeners == "function" && (fe._listeners = [fe._listeners]), G ? fe._listeners.unshift(w) : fe._listeners.push(w), !fe._listeners.warned && this._maxListeners > 0 && fe._listeners.length > this._maxListeners && (fe._listeners.warned = !0, ie.call(this, fe._listeners.length, he))) : fe._listeners = w, !0;
      return !0;
    }
    function K(B, w, G, g) {
      for (var J = Q(B), le = J.length, ge, Se, ye, fe = B._listeners, he; le-- > 0; )
        Se = J[le], ge = B[Se], Se === "_listeners" ? ye = G : ye = G ? G.concat(Se) : [Se], he = g || typeof Se == "symbol", fe && w.push(he ? ye : ye.join(this.delimiter)), typeof ge == "object" && K.call(this, ge, w, ye, he);
      return w;
    }
    function ee(B) {
      for (var w = Q(B), G = w.length, g, J, le; G-- > 0; )
        J = w[G], g = B[J], g && (le = !0, J !== "_listeners" && !ee(g) && delete B[J]);
      return le;
    }
    function e(B, w, G) {
      this.emitter = B, this.event = w, this.listener = G;
    }
    e.prototype.off = function() {
      return this.emitter.off(this.event, this.listener), this;
    };
    function o(B, w, G) {
      if (G === !0)
        J = !0;
      else if (G === !1)
        g = !0;
      else {
        if (!G || typeof G != "object")
          throw TypeError("options should be an object or true");
        var g = G.async, J = G.promisify, le = G.nextTick, ge = G.objectify;
      }
      if (g || le || J) {
        var Se = w, ye = w._origin || w;
        if (le && !F)
          throw Error("process.nextTick is not supported");
        J === O && (J = w.constructor.name === "AsyncFunction"), w = function() {
          var fe = arguments, he = this, Re = this.event;
          return J ? le ? Promise.resolve() : new Promise(function(ke) {
            D(ke);
          }).then(function() {
            return he.event = Re, Se.apply(he, fe);
          }) : (le ? process$1.nextTick : D)(function() {
            he.event = Re, Se.apply(he, fe);
          });
        }, w._async = !0, w._origin = ye;
      }
      return [w, ge ? new e(this, B, w) : this];
    }
    function y(B) {
      this._events = {}, this._newListener = !1, this._removeListener = !1, this.verboseMemoryLeak = !1, te.call(this, B);
    }
    y.EventEmitter2 = y, y.prototype.listenTo = function(B, w, G) {
      if (typeof B != "object")
        throw TypeError("target musts be an object");
      var g = this;
      G = oe(G, {
        on: O,
        off: O,
        reducers: O
      }, {
        on: _e,
        off: _e,
        reducers: qe
      });
      function J(le) {
        if (typeof le != "object")
          throw TypeError("events must be an object");
        var ge = G.reducers, Se = ce.call(g, B), ye;
        Se === -1 ? ye = new ae(g, B, G) : ye = g._observers[Se];
        for (var fe = Q(le), he = fe.length, Re, ke = typeof ge == "function", me = 0; me < he; me++)
          Re = fe[me], ye.subscribe(
            Re,
            le[Re] || Re,
            ke ? ge : ge && ge[Re]
          );
      }
      return X(w) ? J(se(w)) : J(typeof w == "string" ? se(w.split(/\s+/)) : w), this;
    }, y.prototype.stopListeningTo = function(B, w) {
      var G = this._observers;
      if (!G)
        return !1;
      var g = G.length, J, le = !1;
      if (B && typeof B != "object")
        throw TypeError("target should be an object");
      for (; g-- > 0; )
        J = G[g], (!B || J._target === B) && (J.unsubscribe(w), le = !0);
      return le;
    }, y.prototype.delimiter = ".", y.prototype.setMaxListeners = function(B) {
      B !== O && (this._maxListeners = B, this._conf || (this._conf = {}), this._conf.maxListeners = B);
    }, y.prototype.getMaxListeners = function() {
      return this._maxListeners;
    }, y.prototype.event = "", y.prototype.once = function(B, w, G) {
      return this._once(B, w, !1, G);
    }, y.prototype.prependOnceListener = function(B, w, G) {
      return this._once(B, w, !0, G);
    }, y.prototype._once = function(B, w, G, g) {
      return this._many(B, 1, w, G, g);
    }, y.prototype.many = function(B, w, G, g) {
      return this._many(B, w, G, !1, g);
    }, y.prototype.prependMany = function(B, w, G, g) {
      return this._many(B, w, G, !0, g);
    }, y.prototype._many = function(B, w, G, g, J) {
      var le = this;
      if (typeof G != "function")
        throw new Error("many only accepts instances of Function");
      function ge() {
        return --w === 0 && le.off(B, ge), G.apply(this, arguments);
      }
      return ge._origin = G, this._on(B, ge, g, J);
    }, y.prototype.emit = function() {
      if (!this._events && !this._all)
        return !1;
      this._events || V.call(this);
      var B = arguments[0], w, G = this.wildcard, g, J, le, ge, Se;
      if (B === "newListener" && !this._newListener && !this._events.newListener)
        return !1;
      if (G && (w = B, B !== "newListener" && B !== "removeListener" && typeof B == "object")) {
        if (J = B.length, l) {
          for (le = 0; le < J; le++)
            if (typeof B[le] == "symbol") {
              Se = !0;
              break;
            }
        }
        Se || (B = B.join(this.delimiter));
      }
      var ye = arguments.length, fe;
      if (this._all && this._all.length)
        for (fe = this._all.slice(), le = 0, J = fe.length; le < J; le++)
          switch (this.event = B, ye) {
            case 1:
              fe[le].call(this, B);
              break;
            case 2:
              fe[le].call(this, B, arguments[1]);
              break;
            case 3:
              fe[le].call(this, B, arguments[1], arguments[2]);
              break;
            default:
              fe[le].apply(this, arguments);
          }
      if (G)
        fe = [], pe.call(this, fe, w, this.listenerTree, 0, J);
      else if (fe = this._events[B], typeof fe == "function") {
        switch (this.event = B, ye) {
          case 1:
            fe.call(this);
            break;
          case 2:
            fe.call(this, arguments[1]);
            break;
          case 3:
            fe.call(this, arguments[1], arguments[2]);
            break;
          default:
            for (g = new Array(ye - 1), ge = 1; ge < ye; ge++) g[ge - 1] = arguments[ge];
            fe.apply(this, g);
        }
        return !0;
      } else fe && (fe = fe.slice());
      if (fe && fe.length) {
        if (ye > 3)
          for (g = new Array(ye - 1), ge = 1; ge < ye; ge++) g[ge - 1] = arguments[ge];
        for (le = 0, J = fe.length; le < J; le++)
          switch (this.event = B, ye) {
            case 1:
              fe[le].call(this);
              break;
            case 2:
              fe[le].call(this, arguments[1]);
              break;
            case 3:
              fe[le].call(this, arguments[1], arguments[2]);
              break;
            default:
              fe[le].apply(this, g);
          }
        return !0;
      } else if (!this.ignoreErrors && !this._all && B === "error")
        throw arguments[1] instanceof Error ? arguments[1] : new Error("Uncaught, unspecified 'error' event.");
      return !!this._all;
    }, y.prototype.emitAsync = function() {
      if (!this._events && !this._all)
        return !1;
      this._events || V.call(this);
      var B = arguments[0], w = this.wildcard, G, g, J, le, ge, Se;
      if (B === "newListener" && !this._newListener && !this._events.newListener)
        return Promise.resolve([!1]);
      if (w && (G = B, B !== "newListener" && B !== "removeListener" && typeof B == "object")) {
        if (le = B.length, l) {
          for (ge = 0; ge < le; ge++)
            if (typeof B[ge] == "symbol") {
              g = !0;
              break;
            }
        }
        g || (B = B.join(this.delimiter));
      }
      var ye = [], fe = arguments.length, he;
      if (this._all)
        for (ge = 0, le = this._all.length; ge < le; ge++)
          switch (this.event = B, fe) {
            case 1:
              ye.push(this._all[ge].call(this, B));
              break;
            case 2:
              ye.push(this._all[ge].call(this, B, arguments[1]));
              break;
            case 3:
              ye.push(this._all[ge].call(this, B, arguments[1], arguments[2]));
              break;
            default:
              ye.push(this._all[ge].apply(this, arguments));
          }
      if (w ? (he = [], pe.call(this, he, G, this.listenerTree, 0)) : he = this._events[B], typeof he == "function")
        switch (this.event = B, fe) {
          case 1:
            ye.push(he.call(this));
            break;
          case 2:
            ye.push(he.call(this, arguments[1]));
            break;
          case 3:
            ye.push(he.call(this, arguments[1], arguments[2]));
            break;
          default:
            for (J = new Array(fe - 1), Se = 1; Se < fe; Se++) J[Se - 1] = arguments[Se];
            ye.push(he.apply(this, J));
        }
      else if (he && he.length) {
        if (he = he.slice(), fe > 3)
          for (J = new Array(fe - 1), Se = 1; Se < fe; Se++) J[Se - 1] = arguments[Se];
        for (ge = 0, le = he.length; ge < le; ge++)
          switch (this.event = B, fe) {
            case 1:
              ye.push(he[ge].call(this));
              break;
            case 2:
              ye.push(he[ge].call(this, arguments[1]));
              break;
            case 3:
              ye.push(he[ge].call(this, arguments[1], arguments[2]));
              break;
            default:
              ye.push(he[ge].apply(this, J));
          }
      } else if (!this.ignoreErrors && !this._all && B === "error")
        return arguments[1] instanceof Error ? Promise.reject(arguments[1]) : Promise.reject("Uncaught, unspecified 'error' event.");
      return Promise.all(ye);
    }, y.prototype.on = function(B, w, G) {
      return this._on(B, w, !1, G);
    }, y.prototype.prependListener = function(B, w, G) {
      return this._on(B, w, !0, G);
    }, y.prototype.onAny = function(B) {
      return this._onAny(B, !1);
    }, y.prototype.prependAny = function(B) {
      return this._onAny(B, !0);
    }, y.prototype.addListener = y.prototype.on, y.prototype._onAny = function(B, w) {
      if (typeof B != "function")
        throw new Error("onAny only accepts instances of Function");
      return this._all || (this._all = []), w ? this._all.unshift(B) : this._all.push(B), this;
    }, y.prototype._on = function(B, w, G, g) {
      if (typeof B == "function")
        return this._onAny(B, w), this;
      if (typeof w != "function")
        throw new Error("on only accepts instances of Function");
      this._events || V.call(this);
      var J = this, le;
      return g !== O && (le = o.call(this, B, w, g), w = le[0], J = le[1]), this._newListener && this.emit("newListener", B, w), this.wildcard ? (Me.call(this, B, w, G), J) : (this._events[B] ? (typeof this._events[B] == "function" && (this._events[B] = [this._events[B]]), G ? this._events[B].unshift(w) : this._events[B].push(w), !this._events[B].warned && this._maxListeners > 0 && this._events[B].length > this._maxListeners && (this._events[B].warned = !0, ie.call(this, this._events[B].length, B))) : this._events[B] = w, J);
    }, y.prototype.off = function(B, w) {
      if (typeof w != "function")
        throw new Error("removeListener only takes instances of Function");
      var G, g = [];
      if (this.wildcard) {
        var J = typeof B == "string" ? B.split(this.delimiter) : B.slice();
        if (g = pe.call(this, null, J, this.listenerTree, 0), !g) return this;
      } else {
        if (!this._events[B]) return this;
        G = this._events[B], g.push({ _listeners: G });
      }
      for (var le = 0; le < g.length; le++) {
        var ge = g[le];
        if (G = ge._listeners, X(G)) {
          for (var Se = -1, ye = 0, fe = G.length; ye < fe; ye++)
            if (G[ye] === w || G[ye].listener && G[ye].listener === w || G[ye]._origin && G[ye]._origin === w) {
              Se = ye;
              break;
            }
          if (Se < 0)
            continue;
          return this.wildcard ? ge._listeners.splice(Se, 1) : this._events[B].splice(Se, 1), G.length === 0 && (this.wildcard ? delete ge._listeners : delete this._events[B]), this._removeListener && this.emit("removeListener", B, w), this;
        } else (G === w || G.listener && G.listener === w || G._origin && G._origin === w) && (this.wildcard ? delete ge._listeners : delete this._events[B], this._removeListener && this.emit("removeListener", B, w));
      }
      return this.listenerTree && ee(this.listenerTree), this;
    }, y.prototype.offAny = function(B) {
      var w = 0, G = 0, g;
      if (B && this._all && this._all.length > 0) {
        for (g = this._all, w = 0, G = g.length; w < G; w++)
          if (B === g[w])
            return g.splice(w, 1), this._removeListener && this.emit("removeListenerAny", B), this;
      } else {
        if (g = this._all, this._removeListener)
          for (w = 0, G = g.length; w < G; w++)
            this.emit("removeListenerAny", g[w]);
        this._all = [];
      }
      return this;
    }, y.prototype.removeListener = y.prototype.off, y.prototype.removeAllListeners = function(B) {
      if (B === O)
        return !this._events || V.call(this), this;
      if (this.wildcard) {
        var w = pe.call(this, null, B, this.listenerTree, 0), G, g;
        if (!w) return this;
        for (g = 0; g < w.length; g++)
          G = w[g], G._listeners = null;
        this.listenerTree && ee(this.listenerTree);
      } else this._events && (this._events[B] = null);
      return this;
    }, y.prototype.listeners = function(B) {
      var w = this._events, G, g, J, le, ge;
      if (B === O) {
        if (this.wildcard)
          throw Error("event name required for wildcard emitter");
        if (!w)
          return [];
        for (G = Q(w), le = G.length, J = []; le-- > 0; )
          g = w[G[le]], typeof g == "function" ? J.push(g) : J.push.apply(J, g);
        return J;
      } else {
        if (this.wildcard) {
          if (ge = this.listenerTree, !ge) return [];
          var Se = [], ye = typeof B == "string" ? B.split(this.delimiter) : B.slice();
          return pe.call(this, Se, ye, ge, 0), Se;
        }
        return w ? (g = w[B], g ? typeof g == "function" ? [g] : g : []) : [];
      }
    }, y.prototype.eventNames = function(B) {
      var w = this._events;
      return this.wildcard ? K.call(this, this.listenerTree, [], null, B) : w ? Q(w) : [];
    }, y.prototype.listenerCount = function(B) {
      return this.listeners(B).length;
    }, y.prototype.hasListeners = function(B) {
      if (this.wildcard) {
        var w = [], G = typeof B == "string" ? B.split(this.delimiter) : B.slice();
        return pe.call(this, w, G, this.listenerTree, 0), w.length > 0;
      }
      var g = this._events, J = this._all;
      return !!(J && J.length || g && (B === O ? Q(g).length : g[B]));
    }, y.prototype.listenersAny = function() {
      return this._all ? this._all : [];
    }, y.prototype.waitFor = function(B, w) {
      var G = this, g = typeof w;
      return g === "number" ? w = { timeout: w } : g === "function" && (w = { filter: w }), w = oe(w, {
        timeout: 0,
        filter: O,
        handleError: !1,
        Promise,
        overload: !1
      }, {
        filter: _e,
        Promise: be
      }), Te(w.Promise, function(J, le, ge) {
        function Se() {
          var ye = w.filter;
          if (!(ye && !ye.apply(G, arguments)))
            if (G.off(B, Se), w.handleError) {
              var fe = arguments[0];
              fe ? le(fe) : J(ne.apply(null, arguments).slice(1));
            } else
              J(ne.apply(null, arguments));
        }
        ge(function() {
          G.off(B, Se);
        }), G._on(B, Se, !1);
      }, {
        timeout: w.timeout,
        overload: w.overload
      });
    };
    function H(B, w, G) {
      G = oe(G, {
        Promise,
        timeout: 0,
        overload: !1
      }, {
        Promise: be
      });
      var g = G.Promise;
      return Te(g, function(J, le, ge) {
        var Se;
        if (typeof B.addEventListener == "function") {
          Se = function() {
            J(ne.apply(null, arguments));
          }, ge(function() {
            B.removeEventListener(w, Se);
          }), B.addEventListener(
            w,
            Se,
            { once: !0 }
          );
          return;
        }
        var ye = function() {
          fe && B.removeListener("error", fe), J(ne.apply(null, arguments));
        }, fe;
        w !== "error" && (fe = function(he) {
          B.removeListener(w, ye), le(he);
        }, B.once("error", fe)), ge(function() {
          fe && B.removeListener("error", fe), B.removeListener(w, ye);
        }), B.once(w, ye);
      }, {
        timeout: G.timeout,
        overload: G.overload
      });
    }
    var z = y.prototype;
    Object.defineProperties(y, {
      defaultMaxListeners: {
        get: function() {
          return z._maxListeners;
        },
        set: function(B) {
          if (typeof B != "number" || B < 0 || Number.isNaN(B))
            throw TypeError("n must be a non-negative number");
          z._maxListeners = B;
        },
        enumerable: !0
      },
      once: {
        value: H,
        writable: !0,
        configurable: !0
      }
    }), Object.defineProperties(z, {
      _maxListeners: {
        value: t,
        writable: !0,
        configurable: !0
      },
      _observers: { value: null, writable: !0, configurable: !0 }
    }), P.exports = y;
  })();
})(eventemitter2);
var eventemitter2Exports = eventemitter2.exports;
const EventEmitter = /* @__PURE__ */ getDefaultExportFromCjs(eventemitter2Exports);
class FetchAPI extends EventEmitter {
  constructor(c) {
    super(), this.baseUrl = c;
  }
  send(c, O) {
    return Be(this, null, function* () {
      const { url: q, query: X, method: t, data: F, headers: l } = c, [U, $] = F instanceof FormData ? [F, {}] : [
        typeof F != "string" ? JSON.stringify(F) : F,
        {
          "Content-Type": "application/json"
        }
      ], D = this.baseUrl + q, Q = this.getUrlWithParams(D, X), V = yield fetch(Q, {
        method: t,
        headers: Object.assign(l || {}, $),
        body: U,
        credentials: c.withCredentials ? "include" : "same-origin"
      }), te = yield V.json(), ie = this.convertHeadersToPlainObject(V.headers);
      return new APIResponse({
        data: te,
        status: V.status,
        headers: ie,
        request: c
      });
    });
  }
  getUrlWithParams(c, O) {
    if (!O) return c;
    const q = new URL(c);
    return Object.entries(O).forEach(
      ([X, t]) => {
        q.searchParams.append(X, t);
      }
    ), q.toString();
  }
  convertHeadersToPlainObject(c) {
    const O = {};
    for (const q of Object.keys(c))
      O[q] = c.get(q);
    return O;
  }
  // type override 를 위해서 구현 class 에서 메서드들을 재정의 해줘야함..
  addListener(c, O) {
    return super.addListener(c, O);
  }
  on(c, O, q) {
    return super.on(c, O, q);
  }
  prependListener(c, O, q) {
    return super.prependListener(c, O, q);
  }
  once(c, O, q) {
    return super.once(c, O, q);
  }
  emit(c, ...O) {
    return super.emit(c, ...O);
  }
  emitAsync(c, ...O) {
    return super.emitAsync(c, ...O);
  }
}
function commonjsRequire(P) {
  throw new Error('Could not dynamically require "' + P + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}
var bcrypt$1 = { exports: {} }, cryptoBrowserify = {}, browser$b = { exports: {} }, safeBuffer$1 = { exports: {} };
/*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
var hasRequiredSafeBuffer$1;
function requireSafeBuffer$1() {
  return hasRequiredSafeBuffer$1 || (hasRequiredSafeBuffer$1 = 1, function(P, c) {
    var O = requireBuffer$1(), q = O.Buffer;
    function X(F, l) {
      for (var U in F)
        l[U] = F[U];
    }
    q.from && q.alloc && q.allocUnsafe && q.allocUnsafeSlow ? P.exports = O : (X(O, c), c.Buffer = t);
    function t(F, l, U) {
      return q(F, l, U);
    }
    t.prototype = Object.create(q.prototype), X(q, t), t.from = function(F, l, U) {
      if (typeof F == "number")
        throw new TypeError("Argument must not be a number");
      return q(F, l, U);
    }, t.alloc = function(F, l, U) {
      if (typeof F != "number")
        throw new TypeError("Argument must be a number");
      var $ = q(F);
      return l !== void 0 ? typeof U == "string" ? $.fill(l, U) : $.fill(l) : $.fill(0), $;
    }, t.allocUnsafe = function(F) {
      if (typeof F != "number")
        throw new TypeError("Argument must be a number");
      return q(F);
    }, t.allocUnsafeSlow = function(F) {
      if (typeof F != "number")
        throw new TypeError("Argument must be a number");
      return O.SlowBuffer(F);
    };
  }(safeBuffer$1, safeBuffer$1.exports)), safeBuffer$1.exports;
}
var hasRequiredBrowser$b;
function requireBrowser$b() {
  if (hasRequiredBrowser$b) return browser$b.exports;
  hasRequiredBrowser$b = 1;
  var P = 65536, c = 4294967295;
  function O() {
    throw new Error(`Secure random number generation is not supported by this browser.
Use Chrome, Firefox or Internet Explorer 11`);
  }
  var q = requireSafeBuffer$1().Buffer, X = commonjsGlobal.crypto || commonjsGlobal.msCrypto;
  X && X.getRandomValues ? browser$b.exports = t : browser$b.exports = O;
  function t(F, l) {
    if (F > c) throw new RangeError("requested too many random bytes");
    var U = q.allocUnsafe(F);
    if (F > 0)
      if (F > P)
        for (var $ = 0; $ < F; $ += P)
          X.getRandomValues(U.slice($, $ + P));
      else
        X.getRandomValues(U);
    return typeof l == "function" ? process$1.nextTick(function() {
      l(null, U);
    }) : U;
  }
  return browser$b.exports;
}
var inherits_browser = { exports: {} }, hasRequiredInherits_browser;
function requireInherits_browser() {
  return hasRequiredInherits_browser || (hasRequiredInherits_browser = 1, typeof Object.create == "function" ? inherits_browser.exports = function(P, c) {
    c && (P.super_ = c, P.prototype = Object.create(c.prototype, {
      constructor: {
        value: P,
        enumerable: !1,
        writable: !0,
        configurable: !0
      }
    }));
  } : inherits_browser.exports = function(P, c) {
    if (c) {
      P.super_ = c;
      var O = function() {
      };
      O.prototype = c.prototype, P.prototype = new O(), P.prototype.constructor = P;
    }
  }), inherits_browser.exports;
}
var readableBrowser$1 = { exports: {} }, events = { exports: {} }, hasRequiredEvents;
function requireEvents() {
  if (hasRequiredEvents) return events.exports;
  hasRequiredEvents = 1;
  var P = typeof Reflect == "object" ? Reflect : null, c = P && typeof P.apply == "function" ? P.apply : function(de, _e, qe) {
    return Function.prototype.apply.call(de, _e, qe);
  }, O;
  P && typeof P.ownKeys == "function" ? O = P.ownKeys : Object.getOwnPropertySymbols ? O = function(de) {
    return Object.getOwnPropertyNames(de).concat(Object.getOwnPropertySymbols(de));
  } : O = function(de) {
    return Object.getOwnPropertyNames(de);
  };
  function q(de) {
    console && console.warn && console.warn(de);
  }
  var X = Number.isNaN || function(de) {
    return de !== de;
  };
  function t() {
    t.init.call(this);
  }
  events.exports = t, events.exports.once = ae, t.EventEmitter = t, t.prototype._events = void 0, t.prototype._eventsCount = 0, t.prototype._maxListeners = void 0;
  var F = 10;
  function l(de) {
    if (typeof de != "function")
      throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof de);
  }
  Object.defineProperty(t, "defaultMaxListeners", {
    enumerable: !0,
    get: function() {
      return F;
    },
    set: function(de) {
      if (typeof de != "number" || de < 0 || X(de))
        throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + de + ".");
      F = de;
    }
  }), t.init = function() {
    (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) && (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0;
  }, t.prototype.setMaxListeners = function(de) {
    if (typeof de != "number" || de < 0 || X(de))
      throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + de + ".");
    return this._maxListeners = de, this;
  };
  function U(de) {
    return de._maxListeners === void 0 ? t.defaultMaxListeners : de._maxListeners;
  }
  t.prototype.getMaxListeners = function() {
    return U(this);
  }, t.prototype.emit = function(de) {
    for (var _e = [], qe = 1; qe < arguments.length; qe++) _e.push(arguments[qe]);
    var Te = de === "error", ce = this._events;
    if (ce !== void 0)
      Te = Te && ce.error === void 0;
    else if (!Te)
      return !1;
    if (Te) {
      var pe;
      if (_e.length > 0 && (pe = _e[0]), pe instanceof Error)
        throw pe;
      var Me = new Error("Unhandled error." + (pe ? " (" + pe.message + ")" : ""));
      throw Me.context = pe, Me;
    }
    var K = ce[de];
    if (K === void 0)
      return !1;
    if (typeof K == "function")
      c(K, this, _e);
    else
      for (var ee = K.length, e = ie(K, ee), qe = 0; qe < ee; ++qe)
        c(e[qe], this, _e);
    return !0;
  };
  function $(de, _e, qe, Te) {
    var ce, pe, Me;
    if (l(qe), pe = de._events, pe === void 0 ? (pe = de._events = /* @__PURE__ */ Object.create(null), de._eventsCount = 0) : (pe.newListener !== void 0 && (de.emit(
      "newListener",
      _e,
      qe.listener ? qe.listener : qe
    ), pe = de._events), Me = pe[_e]), Me === void 0)
      Me = pe[_e] = qe, ++de._eventsCount;
    else if (typeof Me == "function" ? Me = pe[_e] = Te ? [qe, Me] : [Me, qe] : Te ? Me.unshift(qe) : Me.push(qe), ce = U(de), ce > 0 && Me.length > ce && !Me.warned) {
      Me.warned = !0;
      var K = new Error("Possible EventEmitter memory leak detected. " + Me.length + " " + String(_e) + " listeners added. Use emitter.setMaxListeners() to increase limit");
      K.name = "MaxListenersExceededWarning", K.emitter = de, K.type = _e, K.count = Me.length, q(K);
    }
    return de;
  }
  t.prototype.addListener = function(de, _e) {
    return $(this, de, _e, !1);
  }, t.prototype.on = t.prototype.addListener, t.prototype.prependListener = function(de, _e) {
    return $(this, de, _e, !0);
  };
  function D() {
    if (!this.fired)
      return this.target.removeListener(this.type, this.wrapFn), this.fired = !0, arguments.length === 0 ? this.listener.call(this.target) : this.listener.apply(this.target, arguments);
  }
  function Q(de, _e, qe) {
    var Te = { fired: !1, wrapFn: void 0, target: de, type: _e, listener: qe }, ce = D.bind(Te);
    return ce.listener = qe, Te.wrapFn = ce, ce;
  }
  t.prototype.once = function(de, _e) {
    return l(_e), this.on(de, Q(this, de, _e)), this;
  }, t.prototype.prependOnceListener = function(de, _e) {
    return l(_e), this.prependListener(de, Q(this, de, _e)), this;
  }, t.prototype.removeListener = function(de, _e) {
    var qe, Te, ce, pe, Me;
    if (l(_e), Te = this._events, Te === void 0)
      return this;
    if (qe = Te[de], qe === void 0)
      return this;
    if (qe === _e || qe.listener === _e)
      --this._eventsCount === 0 ? this._events = /* @__PURE__ */ Object.create(null) : (delete Te[de], Te.removeListener && this.emit("removeListener", de, qe.listener || _e));
    else if (typeof qe != "function") {
      for (ce = -1, pe = qe.length - 1; pe >= 0; pe--)
        if (qe[pe] === _e || qe[pe].listener === _e) {
          Me = qe[pe].listener, ce = pe;
          break;
        }
      if (ce < 0)
        return this;
      ce === 0 ? qe.shift() : ne(qe, ce), qe.length === 1 && (Te[de] = qe[0]), Te.removeListener !== void 0 && this.emit("removeListener", de, Me || _e);
    }
    return this;
  }, t.prototype.off = t.prototype.removeListener, t.prototype.removeAllListeners = function(de) {
    var _e, qe, Te;
    if (qe = this._events, qe === void 0)
      return this;
    if (qe.removeListener === void 0)
      return arguments.length === 0 ? (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0) : qe[de] !== void 0 && (--this._eventsCount === 0 ? this._events = /* @__PURE__ */ Object.create(null) : delete qe[de]), this;
    if (arguments.length === 0) {
      var ce = Object.keys(qe), pe;
      for (Te = 0; Te < ce.length; ++Te)
        pe = ce[Te], pe !== "removeListener" && this.removeAllListeners(pe);
      return this.removeAllListeners("removeListener"), this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0, this;
    }
    if (_e = qe[de], typeof _e == "function")
      this.removeListener(de, _e);
    else if (_e !== void 0)
      for (Te = _e.length - 1; Te >= 0; Te--)
        this.removeListener(de, _e[Te]);
    return this;
  };
  function V(de, _e, qe) {
    var Te = de._events;
    if (Te === void 0)
      return [];
    var ce = Te[_e];
    return ce === void 0 ? [] : typeof ce == "function" ? qe ? [ce.listener || ce] : [ce] : qe ? se(ce) : ie(ce, ce.length);
  }
  t.prototype.listeners = function(de) {
    return V(this, de, !0);
  }, t.prototype.rawListeners = function(de) {
    return V(this, de, !1);
  }, t.listenerCount = function(de, _e) {
    return typeof de.listenerCount == "function" ? de.listenerCount(_e) : te.call(de, _e);
  }, t.prototype.listenerCount = te;
  function te(de) {
    var _e = this._events;
    if (_e !== void 0) {
      var qe = _e[de];
      if (typeof qe == "function")
        return 1;
      if (qe !== void 0)
        return qe.length;
    }
    return 0;
  }
  t.prototype.eventNames = function() {
    return this._eventsCount > 0 ? O(this._events) : [];
  };
  function ie(de, _e) {
    for (var qe = new Array(_e), Te = 0; Te < _e; ++Te)
      qe[Te] = de[Te];
    return qe;
  }
  function ne(de, _e) {
    for (; _e + 1 < de.length; _e++)
      de[_e] = de[_e + 1];
    de.pop();
  }
  function se(de) {
    for (var _e = new Array(de.length), qe = 0; qe < _e.length; ++qe)
      _e[qe] = de[qe].listener || de[qe];
    return _e;
  }
  function ae(de, _e) {
    return new Promise(function(qe, Te) {
      function ce(Me) {
        de.removeListener(_e, pe), Te(Me);
      }
      function pe() {
        typeof de.removeListener == "function" && de.removeListener("error", ce), qe([].slice.call(arguments));
      }
      be(de, _e, pe, { once: !0 }), _e !== "error" && oe(de, ce, { once: !0 });
    });
  }
  function oe(de, _e, qe) {
    typeof de.on == "function" && be(de, "error", _e, qe);
  }
  function be(de, _e, qe, Te) {
    if (typeof de.on == "function")
      Te.once ? de.once(_e, qe) : de.on(_e, qe);
    else if (typeof de.addEventListener == "function")
      de.addEventListener(_e, function ce(pe) {
        Te.once && de.removeEventListener(_e, ce), qe(pe);
      });
    else
      throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof de);
  }
  return events.exports;
}
var streamBrowser$1, hasRequiredStreamBrowser$1;
function requireStreamBrowser$1() {
  return hasRequiredStreamBrowser$1 || (hasRequiredStreamBrowser$1 = 1, streamBrowser$1 = requireEvents().EventEmitter), streamBrowser$1;
}
var util$1 = {}, types = {}, shams$1, hasRequiredShams$1;
function requireShams$1() {
  return hasRequiredShams$1 || (hasRequiredShams$1 = 1, shams$1 = function() {
    if (typeof Symbol != "function" || typeof Object.getOwnPropertySymbols != "function")
      return !1;
    if (typeof Symbol.iterator == "symbol")
      return !0;
    var P = {}, c = Symbol("test"), O = Object(c);
    if (typeof c == "string" || Object.prototype.toString.call(c) !== "[object Symbol]" || Object.prototype.toString.call(O) !== "[object Symbol]")
      return !1;
    var q = 42;
    P[c] = q;
    for (c in P)
      return !1;
    if (typeof Object.keys == "function" && Object.keys(P).length !== 0 || typeof Object.getOwnPropertyNames == "function" && Object.getOwnPropertyNames(P).length !== 0)
      return !1;
    var X = Object.getOwnPropertySymbols(P);
    if (X.length !== 1 || X[0] !== c || !Object.prototype.propertyIsEnumerable.call(P, c))
      return !1;
    if (typeof Object.getOwnPropertyDescriptor == "function") {
      var t = Object.getOwnPropertyDescriptor(P, c);
      if (t.value !== q || t.enumerable !== !0)
        return !1;
    }
    return !0;
  }), shams$1;
}
var shams, hasRequiredShams;
function requireShams() {
  if (hasRequiredShams) return shams;
  hasRequiredShams = 1;
  var P = requireShams$1();
  return shams = function() {
    return P() && !!Symbol.toStringTag;
  }, shams;
}
var esErrors, hasRequiredEsErrors;
function requireEsErrors() {
  return hasRequiredEsErrors || (hasRequiredEsErrors = 1, esErrors = Error), esErrors;
}
var _eval, hasRequired_eval;
function require_eval() {
  return hasRequired_eval || (hasRequired_eval = 1, _eval = EvalError), _eval;
}
var range, hasRequiredRange;
function requireRange() {
  return hasRequiredRange || (hasRequiredRange = 1, range = RangeError), range;
}
var ref, hasRequiredRef;
function requireRef() {
  return hasRequiredRef || (hasRequiredRef = 1, ref = ReferenceError), ref;
}
var syntax, hasRequiredSyntax;
function requireSyntax() {
  return hasRequiredSyntax || (hasRequiredSyntax = 1, syntax = SyntaxError), syntax;
}
var type, hasRequiredType;
function requireType() {
  return hasRequiredType || (hasRequiredType = 1, type = TypeError), type;
}
var uri, hasRequiredUri;
function requireUri() {
  return hasRequiredUri || (hasRequiredUri = 1, uri = URIError), uri;
}
var hasSymbols, hasRequiredHasSymbols;
function requireHasSymbols() {
  if (hasRequiredHasSymbols) return hasSymbols;
  hasRequiredHasSymbols = 1;
  var P = typeof Symbol != "undefined" && Symbol, c = requireShams$1();
  return hasSymbols = function() {
    return typeof P != "function" || typeof Symbol != "function" || typeof P("foo") != "symbol" || typeof Symbol("bar") != "symbol" ? !1 : c();
  }, hasSymbols;
}
var hasProto, hasRequiredHasProto;
function requireHasProto() {
  if (hasRequiredHasProto) return hasProto;
  hasRequiredHasProto = 1;
  var P = {
    __proto__: null,
    foo: {}
  }, c = Object;
  return hasProto = function() {
    return { __proto__: P }.foo === P.foo && !(P instanceof c);
  }, hasProto;
}
var implementation, hasRequiredImplementation;
function requireImplementation() {
  if (hasRequiredImplementation) return implementation;
  hasRequiredImplementation = 1;
  var P = "Function.prototype.bind called on incompatible ", c = Object.prototype.toString, O = Math.max, q = "[object Function]", X = function(l, U) {
    for (var $ = [], D = 0; D < l.length; D += 1)
      $[D] = l[D];
    for (var Q = 0; Q < U.length; Q += 1)
      $[Q + l.length] = U[Q];
    return $;
  }, t = function(l, U) {
    for (var $ = [], D = U, Q = 0; D < l.length; D += 1, Q += 1)
      $[Q] = l[D];
    return $;
  }, F = function(l, U) {
    for (var $ = "", D = 0; D < l.length; D += 1)
      $ += l[D], D + 1 < l.length && ($ += U);
    return $;
  };
  return implementation = function(l) {
    var U = this;
    if (typeof U != "function" || c.apply(U) !== q)
      throw new TypeError(P + U);
    for (var $ = t(arguments, 1), D, Q = function() {
      if (this instanceof D) {
        var se = U.apply(
          this,
          X($, arguments)
        );
        return Object(se) === se ? se : this;
      }
      return U.apply(
        l,
        X($, arguments)
      );
    }, V = O(0, U.length - $.length), te = [], ie = 0; ie < V; ie++)
      te[ie] = "$" + ie;
    if (D = Function("binder", "return function (" + F(te, ",") + "){ return binder.apply(this,arguments); }")(Q), U.prototype) {
      var ne = function() {
      };
      ne.prototype = U.prototype, D.prototype = new ne(), ne.prototype = null;
    }
    return D;
  }, implementation;
}
var functionBind, hasRequiredFunctionBind;
function requireFunctionBind() {
  if (hasRequiredFunctionBind) return functionBind;
  hasRequiredFunctionBind = 1;
  var P = requireImplementation();
  return functionBind = Function.prototype.bind || P, functionBind;
}
var hasown, hasRequiredHasown;
function requireHasown() {
  if (hasRequiredHasown) return hasown;
  hasRequiredHasown = 1;
  var P = Function.prototype.call, c = Object.prototype.hasOwnProperty, O = requireFunctionBind();
  return hasown = O.call(P, c), hasown;
}
var getIntrinsic, hasRequiredGetIntrinsic;
function requireGetIntrinsic() {
  if (hasRequiredGetIntrinsic) return getIntrinsic;
  hasRequiredGetIntrinsic = 1;
  var P, c = requireEsErrors(), O = require_eval(), q = requireRange(), X = requireRef(), t = requireSyntax(), F = requireType(), l = requireUri(), U = Function, $ = function(z) {
    try {
      return U('"use strict"; return (' + z + ").constructor;")();
    } catch (B) {
    }
  }, D = Object.getOwnPropertyDescriptor;
  if (D)
    try {
      D({}, "");
    } catch (z) {
      D = null;
    }
  var Q = function() {
    throw new F();
  }, V = D ? function() {
    try {
      return arguments.callee, Q;
    } catch (z) {
      try {
        return D(arguments, "callee").get;
      } catch (B) {
        return Q;
      }
    }
  }() : Q, te = requireHasSymbols()(), ie = requireHasProto()(), ne = Object.getPrototypeOf || (ie ? function(z) {
    return z.__proto__;
  } : null), se = {}, ae = typeof Uint8Array == "undefined" || !ne ? P : ne(Uint8Array), oe = {
    __proto__: null,
    "%AggregateError%": typeof AggregateError == "undefined" ? P : AggregateError,
    "%Array%": Array,
    "%ArrayBuffer%": typeof ArrayBuffer == "undefined" ? P : ArrayBuffer,
    "%ArrayIteratorPrototype%": te && ne ? ne([][Symbol.iterator]()) : P,
    "%AsyncFromSyncIteratorPrototype%": P,
    "%AsyncFunction%": se,
    "%AsyncGenerator%": se,
    "%AsyncGeneratorFunction%": se,
    "%AsyncIteratorPrototype%": se,
    "%Atomics%": typeof Atomics == "undefined" ? P : Atomics,
    "%BigInt%": typeof BigInt == "undefined" ? P : BigInt,
    "%BigInt64Array%": typeof BigInt64Array == "undefined" ? P : BigInt64Array,
    "%BigUint64Array%": typeof BigUint64Array == "undefined" ? P : BigUint64Array,
    "%Boolean%": Boolean,
    "%DataView%": typeof DataView == "undefined" ? P : DataView,
    "%Date%": Date,
    "%decodeURI%": decodeURI,
    "%decodeURIComponent%": decodeURIComponent,
    "%encodeURI%": encodeURI,
    "%encodeURIComponent%": encodeURIComponent,
    "%Error%": c,
    "%eval%": eval,
    // eslint-disable-line no-eval
    "%EvalError%": O,
    "%Float32Array%": typeof Float32Array == "undefined" ? P : Float32Array,
    "%Float64Array%": typeof Float64Array == "undefined" ? P : Float64Array,
    "%FinalizationRegistry%": typeof FinalizationRegistry == "undefined" ? P : FinalizationRegistry,
    "%Function%": U,
    "%GeneratorFunction%": se,
    "%Int8Array%": typeof Int8Array == "undefined" ? P : Int8Array,
    "%Int16Array%": typeof Int16Array == "undefined" ? P : Int16Array,
    "%Int32Array%": typeof Int32Array == "undefined" ? P : Int32Array,
    "%isFinite%": isFinite,
    "%isNaN%": isNaN,
    "%IteratorPrototype%": te && ne ? ne(ne([][Symbol.iterator]())) : P,
    "%JSON%": typeof JSON == "object" ? JSON : P,
    "%Map%": typeof Map == "undefined" ? P : Map,
    "%MapIteratorPrototype%": typeof Map == "undefined" || !te || !ne ? P : ne((/* @__PURE__ */ new Map())[Symbol.iterator]()),
    "%Math%": Math,
    "%Number%": Number,
    "%Object%": Object,
    "%parseFloat%": parseFloat,
    "%parseInt%": parseInt,
    "%Promise%": typeof Promise == "undefined" ? P : Promise,
    "%Proxy%": typeof Proxy == "undefined" ? P : Proxy,
    "%RangeError%": q,
    "%ReferenceError%": X,
    "%Reflect%": typeof Reflect == "undefined" ? P : Reflect,
    "%RegExp%": RegExp,
    "%Set%": typeof Set == "undefined" ? P : Set,
    "%SetIteratorPrototype%": typeof Set == "undefined" || !te || !ne ? P : ne((/* @__PURE__ */ new Set())[Symbol.iterator]()),
    "%SharedArrayBuffer%": typeof SharedArrayBuffer == "undefined" ? P : SharedArrayBuffer,
    "%String%": String,
    "%StringIteratorPrototype%": te && ne ? ne(""[Symbol.iterator]()) : P,
    "%Symbol%": te ? Symbol : P,
    "%SyntaxError%": t,
    "%ThrowTypeError%": V,
    "%TypedArray%": ae,
    "%TypeError%": F,
    "%Uint8Array%": typeof Uint8Array == "undefined" ? P : Uint8Array,
    "%Uint8ClampedArray%": typeof Uint8ClampedArray == "undefined" ? P : Uint8ClampedArray,
    "%Uint16Array%": typeof Uint16Array == "undefined" ? P : Uint16Array,
    "%Uint32Array%": typeof Uint32Array == "undefined" ? P : Uint32Array,
    "%URIError%": l,
    "%WeakMap%": typeof WeakMap == "undefined" ? P : WeakMap,
    "%WeakRef%": typeof WeakRef == "undefined" ? P : WeakRef,
    "%WeakSet%": typeof WeakSet == "undefined" ? P : WeakSet
  };
  if (ne)
    try {
      null.error;
    } catch (z) {
      var be = ne(ne(z));
      oe["%Error.prototype%"] = be;
    }
  var de = function z(B) {
    var w;
    if (B === "%AsyncFunction%")
      w = $("async function () {}");
    else if (B === "%GeneratorFunction%")
      w = $("function* () {}");
    else if (B === "%AsyncGeneratorFunction%")
      w = $("async function* () {}");
    else if (B === "%AsyncGenerator%") {
      var G = z("%AsyncGeneratorFunction%");
      G && (w = G.prototype);
    } else if (B === "%AsyncIteratorPrototype%") {
      var g = z("%AsyncGenerator%");
      g && ne && (w = ne(g.prototype));
    }
    return oe[B] = w, w;
  }, _e = {
    __proto__: null,
    "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"],
    "%ArrayPrototype%": ["Array", "prototype"],
    "%ArrayProto_entries%": ["Array", "prototype", "entries"],
    "%ArrayProto_forEach%": ["Array", "prototype", "forEach"],
    "%ArrayProto_keys%": ["Array", "prototype", "keys"],
    "%ArrayProto_values%": ["Array", "prototype", "values"],
    "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"],
    "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"],
    "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"],
    "%BooleanPrototype%": ["Boolean", "prototype"],
    "%DataViewPrototype%": ["DataView", "prototype"],
    "%DatePrototype%": ["Date", "prototype"],
    "%ErrorPrototype%": ["Error", "prototype"],
    "%EvalErrorPrototype%": ["EvalError", "prototype"],
    "%Float32ArrayPrototype%": ["Float32Array", "prototype"],
    "%Float64ArrayPrototype%": ["Float64Array", "prototype"],
    "%FunctionPrototype%": ["Function", "prototype"],
    "%Generator%": ["GeneratorFunction", "prototype"],
    "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"],
    "%Int8ArrayPrototype%": ["Int8Array", "prototype"],
    "%Int16ArrayPrototype%": ["Int16Array", "prototype"],
    "%Int32ArrayPrototype%": ["Int32Array", "prototype"],
    "%JSONParse%": ["JSON", "parse"],
    "%JSONStringify%": ["JSON", "stringify"],
    "%MapPrototype%": ["Map", "prototype"],
    "%NumberPrototype%": ["Number", "prototype"],
    "%ObjectPrototype%": ["Object", "prototype"],
    "%ObjProto_toString%": ["Object", "prototype", "toString"],
    "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"],
    "%PromisePrototype%": ["Promise", "prototype"],
    "%PromiseProto_then%": ["Promise", "prototype", "then"],
    "%Promise_all%": ["Promise", "all"],
    "%Promise_reject%": ["Promise", "reject"],
    "%Promise_resolve%": ["Promise", "resolve"],
    "%RangeErrorPrototype%": ["RangeError", "prototype"],
    "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"],
    "%RegExpPrototype%": ["RegExp", "prototype"],
    "%SetPrototype%": ["Set", "prototype"],
    "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"],
    "%StringPrototype%": ["String", "prototype"],
    "%SymbolPrototype%": ["Symbol", "prototype"],
    "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"],
    "%TypedArrayPrototype%": ["TypedArray", "prototype"],
    "%TypeErrorPrototype%": ["TypeError", "prototype"],
    "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"],
    "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"],
    "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"],
    "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"],
    "%URIErrorPrototype%": ["URIError", "prototype"],
    "%WeakMapPrototype%": ["WeakMap", "prototype"],
    "%WeakSetPrototype%": ["WeakSet", "prototype"]
  }, qe = requireFunctionBind(), Te = requireHasown(), ce = qe.call(Function.call, Array.prototype.concat), pe = qe.call(Function.apply, Array.prototype.splice), Me = qe.call(Function.call, String.prototype.replace), K = qe.call(Function.call, String.prototype.slice), ee = qe.call(Function.call, RegExp.prototype.exec), e = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g, o = /\\(\\)?/g, y = function(z) {
    var B = K(z, 0, 1), w = K(z, -1);
    if (B === "%" && w !== "%")
      throw new t("invalid intrinsic syntax, expected closing `%`");
    if (w === "%" && B !== "%")
      throw new t("invalid intrinsic syntax, expected opening `%`");
    var G = [];
    return Me(z, e, function(g, J, le, ge) {
      G[G.length] = le ? Me(ge, o, "$1") : J || g;
    }), G;
  }, H = function(z, B) {
    var w = z, G;
    if (Te(_e, w) && (G = _e[w], w = "%" + G[0] + "%"), Te(oe, w)) {
      var g = oe[w];
      if (g === se && (g = de(w)), typeof g == "undefined" && !B)
        throw new F("intrinsic " + z + " exists, but is not available. Please file an issue!");
      return {
        alias: G,
        name: w,
        value: g
      };
    }
    throw new t("intrinsic " + z + " does not exist!");
  };
  return getIntrinsic = function(z, B) {
    if (typeof z != "string" || z.length === 0)
      throw new F("intrinsic name must be a non-empty string");
    if (arguments.length > 1 && typeof B != "boolean")
      throw new F('"allowMissing" argument must be a boolean');
    if (ee(/^%?[^%]*%?$/, z) === null)
      throw new t("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
    var w = y(z), G = w.length > 0 ? w[0] : "", g = H("%" + G + "%", B), J = g.name, le = g.value, ge = !1, Se = g.alias;
    Se && (G = Se[0], pe(w, ce([0, 1], Se)));
    for (var ye = 1, fe = !0; ye < w.length; ye += 1) {
      var he = w[ye], Re = K(he, 0, 1), ke = K(he, -1);
      if ((Re === '"' || Re === "'" || Re === "`" || ke === '"' || ke === "'" || ke === "`") && Re !== ke)
        throw new t("property names with quotes must have matching quotes");
      if ((he === "constructor" || !fe) && (ge = !0), G += "." + he, J = "%" + G + "%", Te(oe, J))
        le = oe[J];
      else if (le != null) {
        if (!(he in le)) {
          if (!B)
            throw new F("base intrinsic for " + z + " exists, but the property is not available.");
          return;
        }
        if (D && ye + 1 >= w.length) {
          var me = D(le, he);
          fe = !!me, fe && "get" in me && !("originalValue" in me.get) ? le = me.get : le = le[he];
        } else
          fe = Te(le, he), le = le[he];
        fe && !ge && (oe[J] = le);
      }
    }
    return le;
  }, getIntrinsic;
}
var callBind = { exports: {} }, esDefineProperty, hasRequiredEsDefineProperty;
function requireEsDefineProperty() {
  if (hasRequiredEsDefineProperty) return esDefineProperty;
  hasRequiredEsDefineProperty = 1;
  var P = requireGetIntrinsic(), c = P("%Object.defineProperty%", !0) || !1;
  if (c)
    try {
      c({}, "a", { value: 1 });
    } catch (O) {
      c = !1;
    }
  return esDefineProperty = c, esDefineProperty;
}
var gopd, hasRequiredGopd;
function requireGopd() {
  if (hasRequiredGopd) return gopd;
  hasRequiredGopd = 1;
  var P = requireGetIntrinsic(), c = P("%Object.getOwnPropertyDescriptor%", !0);
  if (c)
    try {
      c([], "length");
    } catch (O) {
      c = null;
    }
  return gopd = c, gopd;
}
var defineDataProperty, hasRequiredDefineDataProperty;
function requireDefineDataProperty() {
  if (hasRequiredDefineDataProperty) return defineDataProperty;
  hasRequiredDefineDataProperty = 1;
  var P = requireEsDefineProperty(), c = requireSyntax(), O = requireType(), q = requireGopd();
  return defineDataProperty = function(X, t, F) {
    if (!X || typeof X != "object" && typeof X != "function")
      throw new O("`obj` must be an object or a function`");
    if (typeof t != "string" && typeof t != "symbol")
      throw new O("`property` must be a string or a symbol`");
    if (arguments.length > 3 && typeof arguments[3] != "boolean" && arguments[3] !== null)
      throw new O("`nonEnumerable`, if provided, must be a boolean or null");
    if (arguments.length > 4 && typeof arguments[4] != "boolean" && arguments[4] !== null)
      throw new O("`nonWritable`, if provided, must be a boolean or null");
    if (arguments.length > 5 && typeof arguments[5] != "boolean" && arguments[5] !== null)
      throw new O("`nonConfigurable`, if provided, must be a boolean or null");
    if (arguments.length > 6 && typeof arguments[6] != "boolean")
      throw new O("`loose`, if provided, must be a boolean");
    var l = arguments.length > 3 ? arguments[3] : null, U = arguments.length > 4 ? arguments[4] : null, $ = arguments.length > 5 ? arguments[5] : null, D = arguments.length > 6 ? arguments[6] : !1, Q = !!q && q(X, t);
    if (P)
      P(X, t, {
        configurable: $ === null && Q ? Q.configurable : !$,
        enumerable: l === null && Q ? Q.enumerable : !l,
        value: F,
        writable: U === null && Q ? Q.writable : !U
      });
    else if (D || !l && !U && !$)
      X[t] = F;
    else
      throw new c("This environment does not support defining a property as non-configurable, non-writable, or non-enumerable.");
  }, defineDataProperty;
}
var hasPropertyDescriptors_1, hasRequiredHasPropertyDescriptors;
function requireHasPropertyDescriptors() {
  if (hasRequiredHasPropertyDescriptors) return hasPropertyDescriptors_1;
  hasRequiredHasPropertyDescriptors = 1;
  var P = requireEsDefineProperty(), c = function() {
    return !!P;
  };
  return c.hasArrayLengthDefineBug = function() {
    if (!P)
      return null;
    try {
      return P([], "length", { value: 1 }).length !== 1;
    } catch (O) {
      return !0;
    }
  }, hasPropertyDescriptors_1 = c, hasPropertyDescriptors_1;
}
var setFunctionLength, hasRequiredSetFunctionLength;
function requireSetFunctionLength() {
  if (hasRequiredSetFunctionLength) return setFunctionLength;
  hasRequiredSetFunctionLength = 1;
  var P = requireGetIntrinsic(), c = requireDefineDataProperty(), O = requireHasPropertyDescriptors()(), q = requireGopd(), X = requireType(), t = P("%Math.floor%");
  return setFunctionLength = function(F, l) {
    if (typeof F != "function")
      throw new X("`fn` is not a function");
    if (typeof l != "number" || l < 0 || l > 4294967295 || t(l) !== l)
      throw new X("`length` must be a positive 32-bit integer");
    var U = arguments.length > 2 && !!arguments[2], $ = !0, D = !0;
    if ("length" in F && q) {
      var Q = q(F, "length");
      Q && !Q.configurable && ($ = !1), Q && !Q.writable && (D = !1);
    }
    return ($ || D || !U) && (O ? c(
      /** @type {Parameters<define>[0]} */
      F,
      "length",
      l,
      !0,
      !0
    ) : c(
      /** @type {Parameters<define>[0]} */
      F,
      "length",
      l
    )), F;
  }, setFunctionLength;
}
var hasRequiredCallBind;
function requireCallBind() {
  return hasRequiredCallBind || (hasRequiredCallBind = 1, function(P) {
    var c = requireFunctionBind(), O = requireGetIntrinsic(), q = requireSetFunctionLength(), X = requireType(), t = O("%Function.prototype.apply%"), F = O("%Function.prototype.call%"), l = O("%Reflect.apply%", !0) || c.call(F, t), U = requireEsDefineProperty(), $ = O("%Math.max%");
    P.exports = function(Q) {
      if (typeof Q != "function")
        throw new X("a function is required");
      var V = l(c, F, arguments);
      return q(
        V,
        1 + $(0, Q.length - (arguments.length - 1)),
        !0
      );
    };
    var D = function() {
      return l(c, t, arguments);
    };
    U ? U(P.exports, "apply", { value: D }) : P.exports.apply = D;
  }(callBind)), callBind.exports;
}
var callBound, hasRequiredCallBound;
function requireCallBound() {
  if (hasRequiredCallBound) return callBound;
  hasRequiredCallBound = 1;
  var P = requireGetIntrinsic(), c = requireCallBind(), O = c(P("String.prototype.indexOf"));
  return callBound = function(q, X) {
    var t = P(q, !!X);
    return typeof t == "function" && O(q, ".prototype.") > -1 ? c(t) : t;
  }, callBound;
}
var isArguments, hasRequiredIsArguments;
function requireIsArguments() {
  if (hasRequiredIsArguments) return isArguments;
  hasRequiredIsArguments = 1;
  var P = requireShams()(), c = requireCallBound(), O = c("Object.prototype.toString"), q = function(F) {
    return P && F && typeof F == "object" && Symbol.toStringTag in F ? !1 : O(F) === "[object Arguments]";
  }, X = function(F) {
    return q(F) ? !0 : F !== null && typeof F == "object" && typeof F.length == "number" && F.length >= 0 && O(F) !== "[object Array]" && O(F.callee) === "[object Function]";
  }, t = function() {
    return q(arguments);
  }();
  return q.isLegacyArguments = X, isArguments = t ? q : X, isArguments;
}
var isGeneratorFunction, hasRequiredIsGeneratorFunction;
function requireIsGeneratorFunction() {
  if (hasRequiredIsGeneratorFunction) return isGeneratorFunction;
  hasRequiredIsGeneratorFunction = 1;
  var P = Object.prototype.toString, c = Function.prototype.toString, O = /^\s*(?:function)?\*/, q = requireShams()(), X = Object.getPrototypeOf, t = function() {
    if (!q)
      return !1;
    try {
      return Function("return function*() {}")();
    } catch (l) {
    }
  }, F;
  return isGeneratorFunction = function(l) {
    if (typeof l != "function")
      return !1;
    if (O.test(c.call(l)))
      return !0;
    if (!q) {
      var U = P.call(l);
      return U === "[object GeneratorFunction]";
    }
    if (!X)
      return !1;
    if (typeof F == "undefined") {
      var $ = t();
      F = $ ? X($) : !1;
    }
    return X(l) === F;
  }, isGeneratorFunction;
}
var isCallable, hasRequiredIsCallable;
function requireIsCallable() {
  if (hasRequiredIsCallable) return isCallable;
  hasRequiredIsCallable = 1;
  var P = Function.prototype.toString, c = typeof Reflect == "object" && Reflect !== null && Reflect.apply, O, q;
  if (typeof c == "function" && typeof Object.defineProperty == "function")
    try {
      O = Object.defineProperty({}, "length", {
        get: function() {
          throw q;
        }
      }), q = {}, c(function() {
        throw 42;
      }, null, O);
    } catch (oe) {
      oe !== q && (c = null);
    }
  else
    c = null;
  var X = /^\s*class\b/, t = function(oe) {
    try {
      var be = P.call(oe);
      return X.test(be);
    } catch (de) {
      return !1;
    }
  }, F = function(oe) {
    try {
      return t(oe) ? !1 : (P.call(oe), !0);
    } catch (be) {
      return !1;
    }
  }, l = Object.prototype.toString, U = "[object Object]", $ = "[object Function]", D = "[object GeneratorFunction]", Q = "[object HTMLAllCollection]", V = "[object HTML document.all class]", te = "[object HTMLCollection]", ie = typeof Symbol == "function" && !!Symbol.toStringTag, ne = !(0 in [,]), se = function() {
    return !1;
  };
  if (typeof document == "object") {
    var ae = document.all;
    l.call(ae) === l.call(document.all) && (se = function(oe) {
      if ((ne || !oe) && (typeof oe == "undefined" || typeof oe == "object"))
        try {
          var be = l.call(oe);
          return (be === Q || be === V || be === te || be === U) && oe("") == null;
        } catch (de) {
        }
      return !1;
    });
  }
  return isCallable = c ? function(oe) {
    if (se(oe))
      return !0;
    if (!oe || typeof oe != "function" && typeof oe != "object")
      return !1;
    try {
      c(oe, null, O);
    } catch (be) {
      if (be !== q)
        return !1;
    }
    return !t(oe) && F(oe);
  } : function(oe) {
    if (se(oe))
      return !0;
    if (!oe || typeof oe != "function" && typeof oe != "object")
      return !1;
    if (ie)
      return F(oe);
    if (t(oe))
      return !1;
    var be = l.call(oe);
    return be !== $ && be !== D && !/^\[object HTML/.test(be) ? !1 : F(oe);
  }, isCallable;
}
var forEach_1, hasRequiredForEach;
function requireForEach() {
  if (hasRequiredForEach) return forEach_1;
  hasRequiredForEach = 1;
  var P = requireIsCallable(), c = Object.prototype.toString, O = Object.prototype.hasOwnProperty, q = function(l, U, $) {
    for (var D = 0, Q = l.length; D < Q; D++)
      O.call(l, D) && ($ == null ? U(l[D], D, l) : U.call($, l[D], D, l));
  }, X = function(l, U, $) {
    for (var D = 0, Q = l.length; D < Q; D++)
      $ == null ? U(l.charAt(D), D, l) : U.call($, l.charAt(D), D, l);
  }, t = function(l, U, $) {
    for (var D in l)
      O.call(l, D) && ($ == null ? U(l[D], D, l) : U.call($, l[D], D, l));
  }, F = function(l, U, $) {
    if (!P(U))
      throw new TypeError("iterator must be a function");
    var D;
    arguments.length >= 3 && (D = $), c.call(l) === "[object Array]" ? q(l, U, D) : typeof l == "string" ? X(l, U, D) : t(l, U, D);
  };
  return forEach_1 = F, forEach_1;
}
var possibleTypedArrayNames, hasRequiredPossibleTypedArrayNames;
function requirePossibleTypedArrayNames() {
  return hasRequiredPossibleTypedArrayNames || (hasRequiredPossibleTypedArrayNames = 1, possibleTypedArrayNames = [
    "Float32Array",
    "Float64Array",
    "Int8Array",
    "Int16Array",
    "Int32Array",
    "Uint8Array",
    "Uint8ClampedArray",
    "Uint16Array",
    "Uint32Array",
    "BigInt64Array",
    "BigUint64Array"
  ]), possibleTypedArrayNames;
}
var availableTypedArrays, hasRequiredAvailableTypedArrays;
function requireAvailableTypedArrays() {
  if (hasRequiredAvailableTypedArrays) return availableTypedArrays;
  hasRequiredAvailableTypedArrays = 1;
  var P = requirePossibleTypedArrayNames(), c = typeof globalThis == "undefined" ? commonjsGlobal : globalThis;
  return availableTypedArrays = function() {
    for (var O = [], q = 0; q < P.length; q++)
      typeof c[P[q]] == "function" && (O[O.length] = P[q]);
    return O;
  }, availableTypedArrays;
}
var whichTypedArray, hasRequiredWhichTypedArray;
function requireWhichTypedArray() {
  if (hasRequiredWhichTypedArray) return whichTypedArray;
  hasRequiredWhichTypedArray = 1;
  var P = requireForEach(), c = requireAvailableTypedArrays(), O = requireCallBind(), q = requireCallBound(), X = requireGopd(), t = q("Object.prototype.toString"), F = requireShams()(), l = typeof globalThis == "undefined" ? commonjsGlobal : globalThis, U = c(), $ = q("String.prototype.slice"), D = Object.getPrototypeOf, Q = q("Array.prototype.indexOf", !0) || function(ne, se) {
    for (var ae = 0; ae < ne.length; ae += 1)
      if (ne[ae] === se)
        return ae;
    return -1;
  }, V = { __proto__: null };
  F && X && D ? P(U, function(ne) {
    var se = new l[ne]();
    if (Symbol.toStringTag in se) {
      var ae = D(se), oe = X(ae, Symbol.toStringTag);
      if (!oe) {
        var be = D(ae);
        oe = X(be, Symbol.toStringTag);
      }
      V["$" + ne] = O(oe.get);
    }
  }) : P(U, function(ne) {
    var se = new l[ne](), ae = se.slice || se.set;
    ae && (V["$" + ne] = O(ae));
  });
  var te = function(ne) {
    var se = !1;
    return P(
      // eslint-disable-next-line no-extra-parens
      /** @type {Record<`\$${TypedArrayName}`, Getter>} */
      /** @type {any} */
      V,
      /** @type {(getter: Getter, name: `\$${import('.').TypedArrayName}`) => void} */
      function(ae, oe) {
        if (!se)
          try {
            "$" + ae(ne) === oe && (se = $(oe, 1));
          } catch (be) {
          }
      }
    ), se;
  }, ie = function(ne) {
    var se = !1;
    return P(
      // eslint-disable-next-line no-extra-parens
      /** @type {Record<`\$${TypedArrayName}`, Getter>} */
      /** @type {any} */
      V,
      /** @type {(getter: typeof cache, name: `\$${import('.').TypedArrayName}`) => void} */
      function(ae, oe) {
        if (!se)
          try {
            ae(ne), se = $(oe, 1);
          } catch (be) {
          }
      }
    ), se;
  };
  return whichTypedArray = function(ne) {
    if (!ne || typeof ne != "object")
      return !1;
    if (!F) {
      var se = $(t(ne), 8, -1);
      return Q(U, se) > -1 ? se : se !== "Object" ? !1 : ie(ne);
    }
    return X ? te(ne) : null;
  }, whichTypedArray;
}
var isTypedArray, hasRequiredIsTypedArray;
function requireIsTypedArray() {
  if (hasRequiredIsTypedArray) return isTypedArray;
  hasRequiredIsTypedArray = 1;
  var P = requireWhichTypedArray();
  return isTypedArray = function(c) {
    return !!P(c);
  }, isTypedArray;
}
var hasRequiredTypes;
function requireTypes() {
  return hasRequiredTypes || (hasRequiredTypes = 1, function(P) {
    var c = requireIsArguments(), O = requireIsGeneratorFunction(), q = requireWhichTypedArray(), X = requireIsTypedArray();
    function t(ue) {
      return ue.call.bind(ue);
    }
    var F = typeof BigInt != "undefined", l = typeof Symbol != "undefined", U = t(Object.prototype.toString), $ = t(Number.prototype.valueOf), D = t(String.prototype.valueOf), Q = t(Boolean.prototype.valueOf);
    if (F)
      var V = t(BigInt.prototype.valueOf);
    if (l)
      var te = t(Symbol.prototype.valueOf);
    function ie(ue, we) {
      if (typeof ue != "object")
        return !1;
      try {
        return we(ue), !0;
      } catch (Ee) {
        return !1;
      }
    }
    P.isArgumentsObject = c, P.isGeneratorFunction = O, P.isTypedArray = X;
    function ne(ue) {
      return typeof Promise != "undefined" && ue instanceof Promise || ue !== null && typeof ue == "object" && typeof ue.then == "function" && typeof ue.catch == "function";
    }
    P.isPromise = ne;
    function se(ue) {
      return typeof ArrayBuffer != "undefined" && ArrayBuffer.isView ? ArrayBuffer.isView(ue) : X(ue) || le(ue);
    }
    P.isArrayBufferView = se;
    function ae(ue) {
      return q(ue) === "Uint8Array";
    }
    P.isUint8Array = ae;
    function oe(ue) {
      return q(ue) === "Uint8ClampedArray";
    }
    P.isUint8ClampedArray = oe;
    function be(ue) {
      return q(ue) === "Uint16Array";
    }
    P.isUint16Array = be;
    function de(ue) {
      return q(ue) === "Uint32Array";
    }
    P.isUint32Array = de;
    function _e(ue) {
      return q(ue) === "Int8Array";
    }
    P.isInt8Array = _e;
    function qe(ue) {
      return q(ue) === "Int16Array";
    }
    P.isInt16Array = qe;
    function Te(ue) {
      return q(ue) === "Int32Array";
    }
    P.isInt32Array = Te;
    function ce(ue) {
      return q(ue) === "Float32Array";
    }
    P.isFloat32Array = ce;
    function pe(ue) {
      return q(ue) === "Float64Array";
    }
    P.isFloat64Array = pe;
    function Me(ue) {
      return q(ue) === "BigInt64Array";
    }
    P.isBigInt64Array = Me;
    function K(ue) {
      return q(ue) === "BigUint64Array";
    }
    P.isBigUint64Array = K;
    function ee(ue) {
      return U(ue) === "[object Map]";
    }
    ee.working = typeof Map != "undefined" && ee(/* @__PURE__ */ new Map());
    function e(ue) {
      return typeof Map == "undefined" ? !1 : ee.working ? ee(ue) : ue instanceof Map;
    }
    P.isMap = e;
    function o(ue) {
      return U(ue) === "[object Set]";
    }
    o.working = typeof Set != "undefined" && o(/* @__PURE__ */ new Set());
    function y(ue) {
      return typeof Set == "undefined" ? !1 : o.working ? o(ue) : ue instanceof Set;
    }
    P.isSet = y;
    function H(ue) {
      return U(ue) === "[object WeakMap]";
    }
    H.working = typeof WeakMap != "undefined" && H(/* @__PURE__ */ new WeakMap());
    function z(ue) {
      return typeof WeakMap == "undefined" ? !1 : H.working ? H(ue) : ue instanceof WeakMap;
    }
    P.isWeakMap = z;
    function B(ue) {
      return U(ue) === "[object WeakSet]";
    }
    B.working = typeof WeakSet != "undefined" && B(/* @__PURE__ */ new WeakSet());
    function w(ue) {
      return B(ue);
    }
    P.isWeakSet = w;
    function G(ue) {
      return U(ue) === "[object ArrayBuffer]";
    }
    G.working = typeof ArrayBuffer != "undefined" && G(new ArrayBuffer());
    function g(ue) {
      return typeof ArrayBuffer == "undefined" ? !1 : G.working ? G(ue) : ue instanceof ArrayBuffer;
    }
    P.isArrayBuffer = g;
    function J(ue) {
      return U(ue) === "[object DataView]";
    }
    J.working = typeof ArrayBuffer != "undefined" && typeof DataView != "undefined" && J(new DataView(new ArrayBuffer(1), 0, 1));
    function le(ue) {
      return typeof DataView == "undefined" ? !1 : J.working ? J(ue) : ue instanceof DataView;
    }
    P.isDataView = le;
    var ge = typeof SharedArrayBuffer != "undefined" ? SharedArrayBuffer : void 0;
    function Se(ue) {
      return U(ue) === "[object SharedArrayBuffer]";
    }
    function ye(ue) {
      return typeof ge == "undefined" ? !1 : (typeof Se.working == "undefined" && (Se.working = Se(new ge())), Se.working ? Se(ue) : ue instanceof ge);
    }
    P.isSharedArrayBuffer = ye;
    function fe(ue) {
      return U(ue) === "[object AsyncFunction]";
    }
    P.isAsyncFunction = fe;
    function he(ue) {
      return U(ue) === "[object Map Iterator]";
    }
    P.isMapIterator = he;
    function Re(ue) {
      return U(ue) === "[object Set Iterator]";
    }
    P.isSetIterator = Re;
    function ke(ue) {
      return U(ue) === "[object Generator]";
    }
    P.isGeneratorObject = ke;
    function me(ue) {
      return U(ue) === "[object WebAssembly.Module]";
    }
    P.isWebAssemblyCompiledModule = me;
    function ve(ue) {
      return ie(ue, $);
    }
    P.isNumberObject = ve;
    function Ae(ue) {
      return ie(ue, D);
    }
    P.isStringObject = Ae;
    function $e(ue) {
      return ie(ue, Q);
    }
    P.isBooleanObject = $e;
    function Oe(ue) {
      return F && ie(ue, V);
    }
    P.isBigIntObject = Oe;
    function Y(ue) {
      return l && ie(ue, te);
    }
    P.isSymbolObject = Y;
    function Z(ue) {
      return ve(ue) || Ae(ue) || $e(ue) || Oe(ue) || Y(ue);
    }
    P.isBoxedPrimitive = Z;
    function re(ue) {
      return typeof Uint8Array != "undefined" && (g(ue) || ye(ue));
    }
    P.isAnyArrayBuffer = re, ["isProxy", "isExternal", "isModuleNamespaceObject"].forEach(function(ue) {
      Object.defineProperty(P, ue, {
        enumerable: !1,
        value: function() {
          throw new Error(ue + " is not supported in userland");
        }
      });
    });
  }(types)), types;
}
var isBufferBrowser, hasRequiredIsBufferBrowser;
function requireIsBufferBrowser() {
  return hasRequiredIsBufferBrowser || (hasRequiredIsBufferBrowser = 1, isBufferBrowser = function(P) {
    return P && typeof P == "object" && typeof P.copy == "function" && typeof P.fill == "function" && typeof P.readUInt8 == "function";
  }), isBufferBrowser;
}
var hasRequiredUtil$1;
function requireUtil$1() {
  return hasRequiredUtil$1 || (hasRequiredUtil$1 = 1, function(P) {
    var c = Object.getOwnPropertyDescriptors || function(J) {
      for (var le = Object.keys(J), ge = {}, Se = 0; Se < le.length; Se++)
        ge[le[Se]] = Object.getOwnPropertyDescriptor(J, le[Se]);
      return ge;
    }, O = /%[sdj%]/g;
    P.format = function(J) {
      if (!_e(J)) {
        for (var le = [], ge = 0; ge < arguments.length; ge++)
          le.push(F(arguments[ge]));
        return le.join(" ");
      }
      for (var ge = 1, Se = arguments, ye = Se.length, fe = String(J).replace(O, function(ke) {
        if (ke === "%%") return "%";
        if (ge >= ye) return ke;
        switch (ke) {
          case "%s":
            return String(Se[ge++]);
          case "%d":
            return Number(Se[ge++]);
          case "%j":
            try {
              return JSON.stringify(Se[ge++]);
            } catch (me) {
              return "[Circular]";
            }
          default:
            return ke;
        }
      }), he = Se[ge]; ge < ye; he = Se[++ge])
        oe(he) || !pe(he) ? fe += " " + he : fe += " " + F(he);
      return fe;
    }, P.deprecate = function(J, le) {
      if (typeof process$1 != "undefined" && process$1.noDeprecation === !0)
        return J;
      if (typeof process$1 == "undefined")
        return function() {
          return P.deprecate(J, le).apply(this, arguments);
        };
      var ge = !1;
      function Se() {
        if (!ge) {
          if (process$1.throwDeprecation)
            throw new Error(le);
          process$1.traceDeprecation ? console.trace(le) : console.error(le), ge = !0;
        }
        return J.apply(this, arguments);
      }
      return Se;
    };
    var q = {}, X = /^$/;
    if (process$1.env.NODE_DEBUG) {
      var t = process$1.env.NODE_DEBUG;
      t = t.replace(/[|\\{}()[\]^$+?.]/g, "\\$&").replace(/\*/g, ".*").replace(/,/g, "$|^").toUpperCase(), X = new RegExp("^" + t + "$", "i");
    }
    P.debuglog = function(J) {
      if (J = J.toUpperCase(), !q[J])
        if (X.test(J)) {
          var le = process$1.pid;
          q[J] = function() {
            var ge = P.format.apply(P, arguments);
            console.error("%s %d: %s", J, le, ge);
          };
        } else
          q[J] = function() {
          };
      return q[J];
    };
    function F(J, le) {
      var ge = {
        seen: [],
        stylize: U
      };
      return arguments.length >= 3 && (ge.depth = arguments[2]), arguments.length >= 4 && (ge.colors = arguments[3]), ae(le) ? ge.showHidden = le : le && P._extend(ge, le), Te(ge.showHidden) && (ge.showHidden = !1), Te(ge.depth) && (ge.depth = 2), Te(ge.colors) && (ge.colors = !1), Te(ge.customInspect) && (ge.customInspect = !0), ge.colors && (ge.stylize = l), D(ge, J, ge.depth);
    }
    P.inspect = F, F.colors = {
      bold: [1, 22],
      italic: [3, 23],
      underline: [4, 24],
      inverse: [7, 27],
      white: [37, 39],
      grey: [90, 39],
      black: [30, 39],
      blue: [34, 39],
      cyan: [36, 39],
      green: [32, 39],
      magenta: [35, 39],
      red: [31, 39],
      yellow: [33, 39]
    }, F.styles = {
      special: "cyan",
      number: "yellow",
      boolean: "yellow",
      undefined: "grey",
      null: "bold",
      string: "green",
      date: "magenta",
      // "name": intentionally not styling
      regexp: "red"
    };
    function l(J, le) {
      var ge = F.styles[le];
      return ge ? "\x1B[" + F.colors[ge][0] + "m" + J + "\x1B[" + F.colors[ge][1] + "m" : J;
    }
    function U(J, le) {
      return J;
    }
    function $(J) {
      var le = {};
      return J.forEach(function(ge, Se) {
        le[ge] = !0;
      }), le;
    }
    function D(J, le, ge) {
      if (J.customInspect && le && ee(le.inspect) && // Filter out the util module, it's inspect function is special
      le.inspect !== P.inspect && // Also filter out any prototype objects using the circular check.
      !(le.constructor && le.constructor.prototype === le)) {
        var Se = le.inspect(ge, J);
        return _e(Se) || (Se = D(J, Se, ge)), Se;
      }
      var ye = Q(J, le);
      if (ye)
        return ye;
      var fe = Object.keys(le), he = $(fe);
      if (J.showHidden && (fe = Object.getOwnPropertyNames(le)), K(le) && (fe.indexOf("message") >= 0 || fe.indexOf("description") >= 0))
        return V(le);
      if (fe.length === 0) {
        if (ee(le)) {
          var Re = le.name ? ": " + le.name : "";
          return J.stylize("[Function" + Re + "]", "special");
        }
        if (ce(le))
          return J.stylize(RegExp.prototype.toString.call(le), "regexp");
        if (Me(le))
          return J.stylize(Date.prototype.toString.call(le), "date");
        if (K(le))
          return V(le);
      }
      var ke = "", me = !1, ve = ["{", "}"];
      if (se(le) && (me = !0, ve = ["[", "]"]), ee(le)) {
        var Ae = le.name ? ": " + le.name : "";
        ke = " [Function" + Ae + "]";
      }
      if (ce(le) && (ke = " " + RegExp.prototype.toString.call(le)), Me(le) && (ke = " " + Date.prototype.toUTCString.call(le)), K(le) && (ke = " " + V(le)), fe.length === 0 && (!me || le.length == 0))
        return ve[0] + ke + ve[1];
      if (ge < 0)
        return ce(le) ? J.stylize(RegExp.prototype.toString.call(le), "regexp") : J.stylize("[Object]", "special");
      J.seen.push(le);
      var $e;
      return me ? $e = te(J, le, ge, he, fe) : $e = fe.map(function(Oe) {
        return ie(J, le, ge, he, Oe, me);
      }), J.seen.pop(), ne($e, ke, ve);
    }
    function Q(J, le) {
      if (Te(le))
        return J.stylize("undefined", "undefined");
      if (_e(le)) {
        var ge = "'" + JSON.stringify(le).replace(/^"|"$/g, "").replace(/'/g, "\\'").replace(/\\"/g, '"') + "'";
        return J.stylize(ge, "string");
      }
      if (de(le))
        return J.stylize("" + le, "number");
      if (ae(le))
        return J.stylize("" + le, "boolean");
      if (oe(le))
        return J.stylize("null", "null");
    }
    function V(J) {
      return "[" + Error.prototype.toString.call(J) + "]";
    }
    function te(J, le, ge, Se, ye) {
      for (var fe = [], he = 0, Re = le.length; he < Re; ++he)
        B(le, String(he)) ? fe.push(ie(
          J,
          le,
          ge,
          Se,
          String(he),
          !0
        )) : fe.push("");
      return ye.forEach(function(ke) {
        ke.match(/^\d+$/) || fe.push(ie(
          J,
          le,
          ge,
          Se,
          ke,
          !0
        ));
      }), fe;
    }
    function ie(J, le, ge, Se, ye, fe) {
      var he, Re, ke;
      if (ke = Object.getOwnPropertyDescriptor(le, ye) || { value: le[ye] }, ke.get ? ke.set ? Re = J.stylize("[Getter/Setter]", "special") : Re = J.stylize("[Getter]", "special") : ke.set && (Re = J.stylize("[Setter]", "special")), B(Se, ye) || (he = "[" + ye + "]"), Re || (J.seen.indexOf(ke.value) < 0 ? (oe(ge) ? Re = D(J, ke.value, null) : Re = D(J, ke.value, ge - 1), Re.indexOf(`
`) > -1 && (fe ? Re = Re.split(`
`).map(function(me) {
        return "  " + me;
      }).join(`
`).slice(2) : Re = `
` + Re.split(`
`).map(function(me) {
        return "   " + me;
      }).join(`
`))) : Re = J.stylize("[Circular]", "special")), Te(he)) {
        if (fe && ye.match(/^\d+$/))
          return Re;
        he = JSON.stringify("" + ye), he.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/) ? (he = he.slice(1, -1), he = J.stylize(he, "name")) : (he = he.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'"), he = J.stylize(he, "string"));
      }
      return he + ": " + Re;
    }
    function ne(J, le, ge) {
      var Se = J.reduce(function(ye, fe) {
        return fe.indexOf(`
`) >= 0, ye + fe.replace(/\u001b\[\d\d?m/g, "").length + 1;
      }, 0);
      return Se > 60 ? ge[0] + (le === "" ? "" : le + `
 `) + " " + J.join(`,
  `) + " " + ge[1] : ge[0] + le + " " + J.join(", ") + " " + ge[1];
    }
    P.types = requireTypes();
    function se(J) {
      return Array.isArray(J);
    }
    P.isArray = se;
    function ae(J) {
      return typeof J == "boolean";
    }
    P.isBoolean = ae;
    function oe(J) {
      return J === null;
    }
    P.isNull = oe;
    function be(J) {
      return J == null;
    }
    P.isNullOrUndefined = be;
    function de(J) {
      return typeof J == "number";
    }
    P.isNumber = de;
    function _e(J) {
      return typeof J == "string";
    }
    P.isString = _e;
    function qe(J) {
      return typeof J == "symbol";
    }
    P.isSymbol = qe;
    function Te(J) {
      return J === void 0;
    }
    P.isUndefined = Te;
    function ce(J) {
      return pe(J) && o(J) === "[object RegExp]";
    }
    P.isRegExp = ce, P.types.isRegExp = ce;
    function pe(J) {
      return typeof J == "object" && J !== null;
    }
    P.isObject = pe;
    function Me(J) {
      return pe(J) && o(J) === "[object Date]";
    }
    P.isDate = Me, P.types.isDate = Me;
    function K(J) {
      return pe(J) && (o(J) === "[object Error]" || J instanceof Error);
    }
    P.isError = K, P.types.isNativeError = K;
    function ee(J) {
      return typeof J == "function";
    }
    P.isFunction = ee;
    function e(J) {
      return J === null || typeof J == "boolean" || typeof J == "number" || typeof J == "string" || typeof J == "symbol" || // ES6 symbol
      typeof J == "undefined";
    }
    P.isPrimitive = e, P.isBuffer = requireIsBufferBrowser();
    function o(J) {
      return Object.prototype.toString.call(J);
    }
    function y(J) {
      return J < 10 ? "0" + J.toString(10) : J.toString(10);
    }
    var H = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
    function z() {
      var J = /* @__PURE__ */ new Date(), le = [
        y(J.getHours()),
        y(J.getMinutes()),
        y(J.getSeconds())
      ].join(":");
      return [J.getDate(), H[J.getMonth()], le].join(" ");
    }
    P.log = function() {
      console.log("%s - %s", z(), P.format.apply(P, arguments));
    }, P.inherits = requireInherits_browser(), P._extend = function(J, le) {
      if (!le || !pe(le)) return J;
      for (var ge = Object.keys(le), Se = ge.length; Se--; )
        J[ge[Se]] = le[ge[Se]];
      return J;
    };
    function B(J, le) {
      return Object.prototype.hasOwnProperty.call(J, le);
    }
    var w = typeof Symbol != "undefined" ? Symbol("util.promisify.custom") : void 0;
    P.promisify = function(J) {
      if (typeof J != "function")
        throw new TypeError('The "original" argument must be of type Function');
      if (w && J[w]) {
        var le = J[w];
        if (typeof le != "function")
          throw new TypeError('The "util.promisify.custom" argument must be of type Function');
        return Object.defineProperty(le, w, {
          value: le,
          enumerable: !1,
          writable: !1,
          configurable: !0
        }), le;
      }
      function le() {
        for (var ge, Se, ye = new Promise(function(Re, ke) {
          ge = Re, Se = ke;
        }), fe = [], he = 0; he < arguments.length; he++)
          fe.push(arguments[he]);
        fe.push(function(Re, ke) {
          Re ? Se(Re) : ge(ke);
        });
        try {
          J.apply(this, fe);
        } catch (Re) {
          Se(Re);
        }
        return ye;
      }
      return Object.setPrototypeOf(le, Object.getPrototypeOf(J)), w && Object.defineProperty(le, w, {
        value: le,
        enumerable: !1,
        writable: !1,
        configurable: !0
      }), Object.defineProperties(
        le,
        c(J)
      );
    }, P.promisify.custom = w;
    function G(J, le) {
      if (!J) {
        var ge = new Error("Promise was rejected with a falsy value");
        ge.reason = J, J = ge;
      }
      return le(J);
    }
    function g(J) {
      if (typeof J != "function")
        throw new TypeError('The "original" argument must be of type Function');
      function le() {
        for (var ge = [], Se = 0; Se < arguments.length; Se++)
          ge.push(arguments[Se]);
        var ye = ge.pop();
        if (typeof ye != "function")
          throw new TypeError("The last argument must be of type Function");
        var fe = this, he = function() {
          return ye.apply(fe, arguments);
        };
        J.apply(this, ge).then(
          function(Re) {
            process$1.nextTick(he.bind(null, null, Re));
          },
          function(Re) {
            process$1.nextTick(G.bind(null, Re, he));
          }
        );
      }
      return Object.setPrototypeOf(le, Object.getPrototypeOf(J)), Object.defineProperties(
        le,
        c(J)
      ), le;
    }
    P.callbackify = g;
  }(util$1)), util$1;
}
var buffer_list, hasRequiredBuffer_list;
function requireBuffer_list() {
  if (hasRequiredBuffer_list) return buffer_list;
  hasRequiredBuffer_list = 1;
  function P(ie, ne) {
    var se = Object.keys(ie);
    if (Object.getOwnPropertySymbols) {
      var ae = Object.getOwnPropertySymbols(ie);
      ne && (ae = ae.filter(function(oe) {
        return Object.getOwnPropertyDescriptor(ie, oe).enumerable;
      })), se.push.apply(se, ae);
    }
    return se;
  }
  function c(ie) {
    for (var ne = 1; ne < arguments.length; ne++) {
      var se = arguments[ne] != null ? arguments[ne] : {};
      ne % 2 ? P(Object(se), !0).forEach(function(ae) {
        O(ie, ae, se[ae]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(ie, Object.getOwnPropertyDescriptors(se)) : P(Object(se)).forEach(function(ae) {
        Object.defineProperty(ie, ae, Object.getOwnPropertyDescriptor(se, ae));
      });
    }
    return ie;
  }
  function O(ie, ne, se) {
    return ne = F(ne), ne in ie ? Object.defineProperty(ie, ne, { value: se, enumerable: !0, configurable: !0, writable: !0 }) : ie[ne] = se, ie;
  }
  function q(ie, ne) {
    if (!(ie instanceof ne))
      throw new TypeError("Cannot call a class as a function");
  }
  function X(ie, ne) {
    for (var se = 0; se < ne.length; se++) {
      var ae = ne[se];
      ae.enumerable = ae.enumerable || !1, ae.configurable = !0, "value" in ae && (ae.writable = !0), Object.defineProperty(ie, F(ae.key), ae);
    }
  }
  function t(ie, ne, se) {
    return ne && X(ie.prototype, ne), Object.defineProperty(ie, "prototype", { writable: !1 }), ie;
  }
  function F(ie) {
    var ne = l(ie, "string");
    return typeof ne == "symbol" ? ne : String(ne);
  }
  function l(ie, ne) {
    if (typeof ie != "object" || ie === null) return ie;
    var se = ie[Symbol.toPrimitive];
    if (se !== void 0) {
      var ae = se.call(ie, ne || "default");
      if (typeof ae != "object") return ae;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (ne === "string" ? String : Number)(ie);
  }
  var U = requireBuffer$1(), $ = U.Buffer, D = requireUtil$1(), Q = D.inspect, V = Q && Q.custom || "inspect";
  function te(ie, ne, se) {
    $.prototype.copy.call(ie, ne, se);
  }
  return buffer_list = /* @__PURE__ */ function() {
    function ie() {
      q(this, ie), this.head = null, this.tail = null, this.length = 0;
    }
    return t(ie, [{
      key: "push",
      value: function(ne) {
        var se = {
          data: ne,
          next: null
        };
        this.length > 0 ? this.tail.next = se : this.head = se, this.tail = se, ++this.length;
      }
    }, {
      key: "unshift",
      value: function(ne) {
        var se = {
          data: ne,
          next: this.head
        };
        this.length === 0 && (this.tail = se), this.head = se, ++this.length;
      }
    }, {
      key: "shift",
      value: function() {
        if (this.length !== 0) {
          var ne = this.head.data;
          return this.length === 1 ? this.head = this.tail = null : this.head = this.head.next, --this.length, ne;
        }
      }
    }, {
      key: "clear",
      value: function() {
        this.head = this.tail = null, this.length = 0;
      }
    }, {
      key: "join",
      value: function(ne) {
        if (this.length === 0) return "";
        for (var se = this.head, ae = "" + se.data; se = se.next; ) ae += ne + se.data;
        return ae;
      }
    }, {
      key: "concat",
      value: function(ne) {
        if (this.length === 0) return $.alloc(0);
        for (var se = $.allocUnsafe(ne >>> 0), ae = this.head, oe = 0; ae; )
          te(ae.data, se, oe), oe += ae.data.length, ae = ae.next;
        return se;
      }
      // Consumes a specified amount of bytes or characters from the buffered data.
    }, {
      key: "consume",
      value: function(ne, se) {
        var ae;
        return ne < this.head.data.length ? (ae = this.head.data.slice(0, ne), this.head.data = this.head.data.slice(ne)) : ne === this.head.data.length ? ae = this.shift() : ae = se ? this._getString(ne) : this._getBuffer(ne), ae;
      }
    }, {
      key: "first",
      value: function() {
        return this.head.data;
      }
      // Consumes a specified amount of characters from the buffered data.
    }, {
      key: "_getString",
      value: function(ne) {
        var se = this.head, ae = 1, oe = se.data;
        for (ne -= oe.length; se = se.next; ) {
          var be = se.data, de = ne > be.length ? be.length : ne;
          if (de === be.length ? oe += be : oe += be.slice(0, ne), ne -= de, ne === 0) {
            de === be.length ? (++ae, se.next ? this.head = se.next : this.head = this.tail = null) : (this.head = se, se.data = be.slice(de));
            break;
          }
          ++ae;
        }
        return this.length -= ae, oe;
      }
      // Consumes a specified amount of bytes from the buffered data.
    }, {
      key: "_getBuffer",
      value: function(ne) {
        var se = $.allocUnsafe(ne), ae = this.head, oe = 1;
        for (ae.data.copy(se), ne -= ae.data.length; ae = ae.next; ) {
          var be = ae.data, de = ne > be.length ? be.length : ne;
          if (be.copy(se, se.length - ne, 0, de), ne -= de, ne === 0) {
            de === be.length ? (++oe, ae.next ? this.head = ae.next : this.head = this.tail = null) : (this.head = ae, ae.data = be.slice(de));
            break;
          }
          ++oe;
        }
        return this.length -= oe, se;
      }
      // Make sure the linked list only shows the minimal necessary information.
    }, {
      key: V,
      value: function(ne, se) {
        return Q(this, c(c({}, se), {}, {
          // Only inspect one level.
          depth: 0,
          // It should not recurse.
          customInspect: !1
        }));
      }
    }]), ie;
  }(), buffer_list;
}
var destroy_1$1, hasRequiredDestroy$1;
function requireDestroy$1() {
  if (hasRequiredDestroy$1) return destroy_1$1;
  hasRequiredDestroy$1 = 1;
  function P(F, l) {
    var U = this, $ = this._readableState && this._readableState.destroyed, D = this._writableState && this._writableState.destroyed;
    return $ || D ? (l ? l(F) : F && (this._writableState ? this._writableState.errorEmitted || (this._writableState.errorEmitted = !0, process$1.nextTick(X, this, F)) : process$1.nextTick(X, this, F)), this) : (this._readableState && (this._readableState.destroyed = !0), this._writableState && (this._writableState.destroyed = !0), this._destroy(F || null, function(Q) {
      !l && Q ? U._writableState ? U._writableState.errorEmitted ? process$1.nextTick(O, U) : (U._writableState.errorEmitted = !0, process$1.nextTick(c, U, Q)) : process$1.nextTick(c, U, Q) : l ? (process$1.nextTick(O, U), l(Q)) : process$1.nextTick(O, U);
    }), this);
  }
  function c(F, l) {
    X(F, l), O(F);
  }
  function O(F) {
    F._writableState && !F._writableState.emitClose || F._readableState && !F._readableState.emitClose || F.emit("close");
  }
  function q() {
    this._readableState && (this._readableState.destroyed = !1, this._readableState.reading = !1, this._readableState.ended = !1, this._readableState.endEmitted = !1), this._writableState && (this._writableState.destroyed = !1, this._writableState.ended = !1, this._writableState.ending = !1, this._writableState.finalCalled = !1, this._writableState.prefinished = !1, this._writableState.finished = !1, this._writableState.errorEmitted = !1);
  }
  function X(F, l) {
    F.emit("error", l);
  }
  function t(F, l) {
    var U = F._readableState, $ = F._writableState;
    U && U.autoDestroy || $ && $.autoDestroy ? F.destroy(l) : F.emit("error", l);
  }
  return destroy_1$1 = {
    destroy: P,
    undestroy: q,
    errorOrDestroy: t
  }, destroy_1$1;
}
var errorsBrowser = {}, hasRequiredErrorsBrowser;
function requireErrorsBrowser() {
  if (hasRequiredErrorsBrowser) return errorsBrowser;
  hasRequiredErrorsBrowser = 1;
  function P(l, U) {
    l.prototype = Object.create(U.prototype), l.prototype.constructor = l, l.__proto__ = U;
  }
  var c = {};
  function O(l, U, $) {
    $ || ($ = Error);
    function D(V, te, ie) {
      return typeof U == "string" ? U : U(V, te, ie);
    }
    var Q = /* @__PURE__ */ function(V) {
      P(te, V);
      function te(ie, ne, se) {
        return V.call(this, D(ie, ne, se)) || this;
      }
      return te;
    }($);
    Q.prototype.name = $.name, Q.prototype.code = l, c[l] = Q;
  }
  function q(l, U) {
    if (Array.isArray(l)) {
      var $ = l.length;
      return l = l.map(function(D) {
        return String(D);
      }), $ > 2 ? "one of ".concat(U, " ").concat(l.slice(0, $ - 1).join(", "), ", or ") + l[$ - 1] : $ === 2 ? "one of ".concat(U, " ").concat(l[0], " or ").concat(l[1]) : "of ".concat(U, " ").concat(l[0]);
    } else
      return "of ".concat(U, " ").concat(String(l));
  }
  function X(l, U, $) {
    return l.substr(0, U.length) === U;
  }
  function t(l, U, $) {
    return ($ === void 0 || $ > l.length) && ($ = l.length), l.substring($ - U.length, $) === U;
  }
  function F(l, U, $) {
    return typeof $ != "number" && ($ = 0), $ + U.length > l.length ? !1 : l.indexOf(U, $) !== -1;
  }
  return O("ERR_INVALID_OPT_VALUE", function(l, U) {
    return 'The value "' + U + '" is invalid for option "' + l + '"';
  }, TypeError), O("ERR_INVALID_ARG_TYPE", function(l, U, $) {
    var D;
    typeof U == "string" && X(U, "not ") ? (D = "must not be", U = U.replace(/^not /, "")) : D = "must be";
    var Q;
    if (t(l, " argument"))
      Q = "The ".concat(l, " ").concat(D, " ").concat(q(U, "type"));
    else {
      var V = F(l, ".") ? "property" : "argument";
      Q = 'The "'.concat(l, '" ').concat(V, " ").concat(D, " ").concat(q(U, "type"));
    }
    return Q += ". Received type ".concat(typeof $), Q;
  }, TypeError), O("ERR_STREAM_PUSH_AFTER_EOF", "stream.push() after EOF"), O("ERR_METHOD_NOT_IMPLEMENTED", function(l) {
    return "The " + l + " method is not implemented";
  }), O("ERR_STREAM_PREMATURE_CLOSE", "Premature close"), O("ERR_STREAM_DESTROYED", function(l) {
    return "Cannot call " + l + " after a stream was destroyed";
  }), O("ERR_MULTIPLE_CALLBACK", "Callback called multiple times"), O("ERR_STREAM_CANNOT_PIPE", "Cannot pipe, not readable"), O("ERR_STREAM_WRITE_AFTER_END", "write after end"), O("ERR_STREAM_NULL_VALUES", "May not write null values to stream", TypeError), O("ERR_UNKNOWN_ENCODING", function(l) {
    return "Unknown encoding: " + l;
  }, TypeError), O("ERR_STREAM_UNSHIFT_AFTER_END_EVENT", "stream.unshift() after end event"), errorsBrowser.codes = c, errorsBrowser;
}
var state, hasRequiredState;
function requireState() {
  if (hasRequiredState) return state;
  hasRequiredState = 1;
  var P = requireErrorsBrowser().codes.ERR_INVALID_OPT_VALUE;
  function c(q, X, t) {
    return q.highWaterMark != null ? q.highWaterMark : X ? q[t] : null;
  }
  function O(q, X, t, F) {
    var l = c(X, F, t);
    if (l != null) {
      if (!(isFinite(l) && Math.floor(l) === l) || l < 0) {
        var U = F ? t : "highWaterMark";
        throw new P(U, l);
      }
      return Math.floor(l);
    }
    return q.objectMode ? 16 : 16 * 1024;
  }
  return state = {
    getHighWaterMark: O
  }, state;
}
var browser$a, hasRequiredBrowser$a;
function requireBrowser$a() {
  if (hasRequiredBrowser$a) return browser$a;
  hasRequiredBrowser$a = 1, browser$a = P;
  function P(O, q) {
    if (c("noDeprecation"))
      return O;
    var X = !1;
    function t() {
      if (!X) {
        if (c("throwDeprecation"))
          throw new Error(q);
        c("traceDeprecation") ? console.trace(q) : console.warn(q), X = !0;
      }
      return O.apply(this, arguments);
    }
    return t;
  }
  function c(O) {
    try {
      if (!commonjsGlobal.localStorage) return !1;
    } catch (X) {
      return !1;
    }
    var q = commonjsGlobal.localStorage[O];
    return q == null ? !1 : String(q).toLowerCase() === "true";
  }
  return browser$a;
}
var _stream_writable$1, hasRequired_stream_writable$1;
function require_stream_writable$1() {
  if (hasRequired_stream_writable$1) return _stream_writable$1;
  hasRequired_stream_writable$1 = 1, _stream_writable$1 = ce;
  function P(ye) {
    var fe = this;
    this.next = null, this.entry = null, this.finish = function() {
      Se(fe, ye);
    };
  }
  var c;
  ce.WritableState = qe;
  var O = {
    deprecate: requireBrowser$a()
  }, q = requireStreamBrowser$1(), X = requireBuffer$1().Buffer, t = (typeof commonjsGlobal != "undefined" ? commonjsGlobal : typeof window != "undefined" ? window : typeof self != "undefined" ? self : {}).Uint8Array || function() {
  };
  function F(ye) {
    return X.from(ye);
  }
  function l(ye) {
    return X.isBuffer(ye) || ye instanceof t;
  }
  var U = requireDestroy$1(), $ = requireState(), D = $.getHighWaterMark, Q = requireErrorsBrowser().codes, V = Q.ERR_INVALID_ARG_TYPE, te = Q.ERR_METHOD_NOT_IMPLEMENTED, ie = Q.ERR_MULTIPLE_CALLBACK, ne = Q.ERR_STREAM_CANNOT_PIPE, se = Q.ERR_STREAM_DESTROYED, ae = Q.ERR_STREAM_NULL_VALUES, oe = Q.ERR_STREAM_WRITE_AFTER_END, be = Q.ERR_UNKNOWN_ENCODING, de = U.errorOrDestroy;
  requireInherits_browser()(ce, q);
  function _e() {
  }
  function qe(ye, fe, he) {
    c = c || require_stream_duplex$1(), ye = ye || {}, typeof he != "boolean" && (he = fe instanceof c), this.objectMode = !!ye.objectMode, he && (this.objectMode = this.objectMode || !!ye.writableObjectMode), this.highWaterMark = D(this, ye, "writableHighWaterMark", he), this.finalCalled = !1, this.needDrain = !1, this.ending = !1, this.ended = !1, this.finished = !1, this.destroyed = !1;
    var Re = ye.decodeStrings === !1;
    this.decodeStrings = !Re, this.defaultEncoding = ye.defaultEncoding || "utf8", this.length = 0, this.writing = !1, this.corked = 0, this.sync = !0, this.bufferProcessing = !1, this.onwrite = function(ke) {
      H(fe, ke);
    }, this.writecb = null, this.writelen = 0, this.bufferedRequest = null, this.lastBufferedRequest = null, this.pendingcb = 0, this.prefinished = !1, this.errorEmitted = !1, this.emitClose = ye.emitClose !== !1, this.autoDestroy = !!ye.autoDestroy, this.bufferedRequestCount = 0, this.corkedRequestsFree = new P(this);
  }
  qe.prototype.getBuffer = function() {
    for (var ye = this.bufferedRequest, fe = []; ye; )
      fe.push(ye), ye = ye.next;
    return fe;
  }, function() {
    try {
      Object.defineProperty(qe.prototype, "buffer", {
        get: O.deprecate(function() {
          return this.getBuffer();
        }, "_writableState.buffer is deprecated. Use _writableState.getBuffer instead.", "DEP0003")
      });
    } catch (ye) {
    }
  }();
  var Te;
  typeof Symbol == "function" && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] == "function" ? (Te = Function.prototype[Symbol.hasInstance], Object.defineProperty(ce, Symbol.hasInstance, {
    value: function(ye) {
      return Te.call(this, ye) ? !0 : this !== ce ? !1 : ye && ye._writableState instanceof qe;
    }
  })) : Te = function(ye) {
    return ye instanceof this;
  };
  function ce(ye) {
    c = c || require_stream_duplex$1();
    var fe = this instanceof c;
    if (!fe && !Te.call(ce, this)) return new ce(ye);
    this._writableState = new qe(ye, this, fe), this.writable = !0, ye && (typeof ye.write == "function" && (this._write = ye.write), typeof ye.writev == "function" && (this._writev = ye.writev), typeof ye.destroy == "function" && (this._destroy = ye.destroy), typeof ye.final == "function" && (this._final = ye.final)), q.call(this);
  }
  ce.prototype.pipe = function() {
    de(this, new ne());
  };
  function pe(ye, fe) {
    var he = new oe();
    de(ye, he), process$1.nextTick(fe, he);
  }
  function Me(ye, fe, he, Re) {
    var ke;
    return he === null ? ke = new ae() : typeof he != "string" && !fe.objectMode && (ke = new V("chunk", ["string", "Buffer"], he)), ke ? (de(ye, ke), process$1.nextTick(Re, ke), !1) : !0;
  }
  ce.prototype.write = function(ye, fe, he) {
    var Re = this._writableState, ke = !1, me = !Re.objectMode && l(ye);
    return me && !X.isBuffer(ye) && (ye = F(ye)), typeof fe == "function" && (he = fe, fe = null), me ? fe = "buffer" : fe || (fe = Re.defaultEncoding), typeof he != "function" && (he = _e), Re.ending ? pe(this, he) : (me || Me(this, Re, ye, he)) && (Re.pendingcb++, ke = ee(this, Re, me, ye, fe, he)), ke;
  }, ce.prototype.cork = function() {
    this._writableState.corked++;
  }, ce.prototype.uncork = function() {
    var ye = this._writableState;
    ye.corked && (ye.corked--, !ye.writing && !ye.corked && !ye.bufferProcessing && ye.bufferedRequest && w(this, ye));
  }, ce.prototype.setDefaultEncoding = function(ye) {
    if (typeof ye == "string" && (ye = ye.toLowerCase()), !(["hex", "utf8", "utf-8", "ascii", "binary", "base64", "ucs2", "ucs-2", "utf16le", "utf-16le", "raw"].indexOf((ye + "").toLowerCase()) > -1)) throw new be(ye);
    return this._writableState.defaultEncoding = ye, this;
  }, Object.defineProperty(ce.prototype, "writableBuffer", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._writableState && this._writableState.getBuffer();
    }
  });
  function K(ye, fe, he) {
    return !ye.objectMode && ye.decodeStrings !== !1 && typeof fe == "string" && (fe = X.from(fe, he)), fe;
  }
  Object.defineProperty(ce.prototype, "writableHighWaterMark", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._writableState.highWaterMark;
    }
  });
  function ee(ye, fe, he, Re, ke, me) {
    if (!he) {
      var ve = K(fe, Re, ke);
      Re !== ve && (he = !0, ke = "buffer", Re = ve);
    }
    var Ae = fe.objectMode ? 1 : Re.length;
    fe.length += Ae;
    var $e = fe.length < fe.highWaterMark;
    if ($e || (fe.needDrain = !0), fe.writing || fe.corked) {
      var Oe = fe.lastBufferedRequest;
      fe.lastBufferedRequest = {
        chunk: Re,
        encoding: ke,
        isBuf: he,
        callback: me,
        next: null
      }, Oe ? Oe.next = fe.lastBufferedRequest : fe.bufferedRequest = fe.lastBufferedRequest, fe.bufferedRequestCount += 1;
    } else
      e(ye, fe, !1, Ae, Re, ke, me);
    return $e;
  }
  function e(ye, fe, he, Re, ke, me, ve) {
    fe.writelen = Re, fe.writecb = ve, fe.writing = !0, fe.sync = !0, fe.destroyed ? fe.onwrite(new se("write")) : he ? ye._writev(ke, fe.onwrite) : ye._write(ke, me, fe.onwrite), fe.sync = !1;
  }
  function o(ye, fe, he, Re, ke) {
    --fe.pendingcb, he ? (process$1.nextTick(ke, Re), process$1.nextTick(le, ye, fe), ye._writableState.errorEmitted = !0, de(ye, Re)) : (ke(Re), ye._writableState.errorEmitted = !0, de(ye, Re), le(ye, fe));
  }
  function y(ye) {
    ye.writing = !1, ye.writecb = null, ye.length -= ye.writelen, ye.writelen = 0;
  }
  function H(ye, fe) {
    var he = ye._writableState, Re = he.sync, ke = he.writecb;
    if (typeof ke != "function") throw new ie();
    if (y(he), fe) o(ye, he, Re, fe, ke);
    else {
      var me = G(he) || ye.destroyed;
      !me && !he.corked && !he.bufferProcessing && he.bufferedRequest && w(ye, he), Re ? process$1.nextTick(z, ye, he, me, ke) : z(ye, he, me, ke);
    }
  }
  function z(ye, fe, he, Re) {
    he || B(ye, fe), fe.pendingcb--, Re(), le(ye, fe);
  }
  function B(ye, fe) {
    fe.length === 0 && fe.needDrain && (fe.needDrain = !1, ye.emit("drain"));
  }
  function w(ye, fe) {
    fe.bufferProcessing = !0;
    var he = fe.bufferedRequest;
    if (ye._writev && he && he.next) {
      var Re = fe.bufferedRequestCount, ke = new Array(Re), me = fe.corkedRequestsFree;
      me.entry = he;
      for (var ve = 0, Ae = !0; he; )
        ke[ve] = he, he.isBuf || (Ae = !1), he = he.next, ve += 1;
      ke.allBuffers = Ae, e(ye, fe, !0, fe.length, ke, "", me.finish), fe.pendingcb++, fe.lastBufferedRequest = null, me.next ? (fe.corkedRequestsFree = me.next, me.next = null) : fe.corkedRequestsFree = new P(fe), fe.bufferedRequestCount = 0;
    } else {
      for (; he; ) {
        var $e = he.chunk, Oe = he.encoding, Y = he.callback, Z = fe.objectMode ? 1 : $e.length;
        if (e(ye, fe, !1, Z, $e, Oe, Y), he = he.next, fe.bufferedRequestCount--, fe.writing)
          break;
      }
      he === null && (fe.lastBufferedRequest = null);
    }
    fe.bufferedRequest = he, fe.bufferProcessing = !1;
  }
  ce.prototype._write = function(ye, fe, he) {
    he(new te("_write()"));
  }, ce.prototype._writev = null, ce.prototype.end = function(ye, fe, he) {
    var Re = this._writableState;
    return typeof ye == "function" ? (he = ye, ye = null, fe = null) : typeof fe == "function" && (he = fe, fe = null), ye != null && this.write(ye, fe), Re.corked && (Re.corked = 1, this.uncork()), Re.ending || ge(this, Re, he), this;
  }, Object.defineProperty(ce.prototype, "writableLength", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._writableState.length;
    }
  });
  function G(ye) {
    return ye.ending && ye.length === 0 && ye.bufferedRequest === null && !ye.finished && !ye.writing;
  }
  function g(ye, fe) {
    ye._final(function(he) {
      fe.pendingcb--, he && de(ye, he), fe.prefinished = !0, ye.emit("prefinish"), le(ye, fe);
    });
  }
  function J(ye, fe) {
    !fe.prefinished && !fe.finalCalled && (typeof ye._final == "function" && !fe.destroyed ? (fe.pendingcb++, fe.finalCalled = !0, process$1.nextTick(g, ye, fe)) : (fe.prefinished = !0, ye.emit("prefinish")));
  }
  function le(ye, fe) {
    var he = G(fe);
    if (he && (J(ye, fe), fe.pendingcb === 0 && (fe.finished = !0, ye.emit("finish"), fe.autoDestroy))) {
      var Re = ye._readableState;
      (!Re || Re.autoDestroy && Re.endEmitted) && ye.destroy();
    }
    return he;
  }
  function ge(ye, fe, he) {
    fe.ending = !0, le(ye, fe), he && (fe.finished ? process$1.nextTick(he) : ye.once("finish", he)), fe.ended = !0, ye.writable = !1;
  }
  function Se(ye, fe, he) {
    var Re = ye.entry;
    for (ye.entry = null; Re; ) {
      var ke = Re.callback;
      fe.pendingcb--, ke(he), Re = Re.next;
    }
    fe.corkedRequestsFree.next = ye;
  }
  return Object.defineProperty(ce.prototype, "destroyed", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._writableState === void 0 ? !1 : this._writableState.destroyed;
    },
    set: function(ye) {
      this._writableState && (this._writableState.destroyed = ye);
    }
  }), ce.prototype.destroy = U.destroy, ce.prototype._undestroy = U.undestroy, ce.prototype._destroy = function(ye, fe) {
    fe(ye);
  }, _stream_writable$1;
}
var _stream_duplex$1, hasRequired_stream_duplex$1;
function require_stream_duplex$1() {
  if (hasRequired_stream_duplex$1) return _stream_duplex$1;
  hasRequired_stream_duplex$1 = 1;
  var P = Object.keys || function($) {
    var D = [];
    for (var Q in $) D.push(Q);
    return D;
  };
  _stream_duplex$1 = F;
  var c = require_stream_readable$1(), O = require_stream_writable$1();
  requireInherits_browser()(F, c);
  for (var q = P(O.prototype), X = 0; X < q.length; X++) {
    var t = q[X];
    F.prototype[t] || (F.prototype[t] = O.prototype[t]);
  }
  function F($) {
    if (!(this instanceof F)) return new F($);
    c.call(this, $), O.call(this, $), this.allowHalfOpen = !0, $ && ($.readable === !1 && (this.readable = !1), $.writable === !1 && (this.writable = !1), $.allowHalfOpen === !1 && (this.allowHalfOpen = !1, this.once("end", l)));
  }
  Object.defineProperty(F.prototype, "writableHighWaterMark", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._writableState.highWaterMark;
    }
  }), Object.defineProperty(F.prototype, "writableBuffer", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._writableState && this._writableState.getBuffer();
    }
  }), Object.defineProperty(F.prototype, "writableLength", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._writableState.length;
    }
  });
  function l() {
    this._writableState.ended || process$1.nextTick(U, this);
  }
  function U($) {
    $.end();
  }
  return Object.defineProperty(F.prototype, "destroyed", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._readableState === void 0 || this._writableState === void 0 ? !1 : this._readableState.destroyed && this._writableState.destroyed;
    },
    set: function($) {
      this._readableState === void 0 || this._writableState === void 0 || (this._readableState.destroyed = $, this._writableState.destroyed = $);
    }
  }), _stream_duplex$1;
}
var string_decoder = {}, hasRequiredString_decoder;
function requireString_decoder() {
  if (hasRequiredString_decoder) return string_decoder;
  hasRequiredString_decoder = 1;
  var P = requireSafeBuffer$1().Buffer, c = P.isEncoding || function(ae) {
    switch (ae = "" + ae, ae && ae.toLowerCase()) {
      case "hex":
      case "utf8":
      case "utf-8":
      case "ascii":
      case "binary":
      case "base64":
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
      case "raw":
        return !0;
      default:
        return !1;
    }
  };
  function O(ae) {
    if (!ae) return "utf8";
    for (var oe; ; )
      switch (ae) {
        case "utf8":
        case "utf-8":
          return "utf8";
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return "utf16le";
        case "latin1":
        case "binary":
          return "latin1";
        case "base64":
        case "ascii":
        case "hex":
          return ae;
        default:
          if (oe) return;
          ae = ("" + ae).toLowerCase(), oe = !0;
      }
  }
  function q(ae) {
    var oe = O(ae);
    if (typeof oe != "string" && (P.isEncoding === c || !c(ae))) throw new Error("Unknown encoding: " + ae);
    return oe || ae;
  }
  string_decoder.StringDecoder = X;
  function X(ae) {
    this.encoding = q(ae);
    var oe;
    switch (this.encoding) {
      case "utf16le":
        this.text = Q, this.end = V, oe = 4;
        break;
      case "utf8":
        this.fillLast = U, oe = 4;
        break;
      case "base64":
        this.text = te, this.end = ie, oe = 3;
        break;
      default:
        this.write = ne, this.end = se;
        return;
    }
    this.lastNeed = 0, this.lastTotal = 0, this.lastChar = P.allocUnsafe(oe);
  }
  X.prototype.write = function(ae) {
    if (ae.length === 0) return "";
    var oe, be;
    if (this.lastNeed) {
      if (oe = this.fillLast(ae), oe === void 0) return "";
      be = this.lastNeed, this.lastNeed = 0;
    } else
      be = 0;
    return be < ae.length ? oe ? oe + this.text(ae, be) : this.text(ae, be) : oe || "";
  }, X.prototype.end = D, X.prototype.text = $, X.prototype.fillLast = function(ae) {
    if (this.lastNeed <= ae.length)
      return ae.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed), this.lastChar.toString(this.encoding, 0, this.lastTotal);
    ae.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, ae.length), this.lastNeed -= ae.length;
  };
  function t(ae) {
    return ae <= 127 ? 0 : ae >> 5 === 6 ? 2 : ae >> 4 === 14 ? 3 : ae >> 3 === 30 ? 4 : ae >> 6 === 2 ? -1 : -2;
  }
  function F(ae, oe, be) {
    var de = oe.length - 1;
    if (de < be) return 0;
    var _e = t(oe[de]);
    return _e >= 0 ? (_e > 0 && (ae.lastNeed = _e - 1), _e) : --de < be || _e === -2 ? 0 : (_e = t(oe[de]), _e >= 0 ? (_e > 0 && (ae.lastNeed = _e - 2), _e) : --de < be || _e === -2 ? 0 : (_e = t(oe[de]), _e >= 0 ? (_e > 0 && (_e === 2 ? _e = 0 : ae.lastNeed = _e - 3), _e) : 0));
  }
  function l(ae, oe, be) {
    if ((oe[0] & 192) !== 128)
      return ae.lastNeed = 0, "�";
    if (ae.lastNeed > 1 && oe.length > 1) {
      if ((oe[1] & 192) !== 128)
        return ae.lastNeed = 1, "�";
      if (ae.lastNeed > 2 && oe.length > 2 && (oe[2] & 192) !== 128)
        return ae.lastNeed = 2, "�";
    }
  }
  function U(ae) {
    var oe = this.lastTotal - this.lastNeed, be = l(this, ae);
    if (be !== void 0) return be;
    if (this.lastNeed <= ae.length)
      return ae.copy(this.lastChar, oe, 0, this.lastNeed), this.lastChar.toString(this.encoding, 0, this.lastTotal);
    ae.copy(this.lastChar, oe, 0, ae.length), this.lastNeed -= ae.length;
  }
  function $(ae, oe) {
    var be = F(this, ae, oe);
    if (!this.lastNeed) return ae.toString("utf8", oe);
    this.lastTotal = be;
    var de = ae.length - (be - this.lastNeed);
    return ae.copy(this.lastChar, 0, de), ae.toString("utf8", oe, de);
  }
  function D(ae) {
    var oe = ae && ae.length ? this.write(ae) : "";
    return this.lastNeed ? oe + "�" : oe;
  }
  function Q(ae, oe) {
    if ((ae.length - oe) % 2 === 0) {
      var be = ae.toString("utf16le", oe);
      if (be) {
        var de = be.charCodeAt(be.length - 1);
        if (de >= 55296 && de <= 56319)
          return this.lastNeed = 2, this.lastTotal = 4, this.lastChar[0] = ae[ae.length - 2], this.lastChar[1] = ae[ae.length - 1], be.slice(0, -1);
      }
      return be;
    }
    return this.lastNeed = 1, this.lastTotal = 2, this.lastChar[0] = ae[ae.length - 1], ae.toString("utf16le", oe, ae.length - 1);
  }
  function V(ae) {
    var oe = ae && ae.length ? this.write(ae) : "";
    if (this.lastNeed) {
      var be = this.lastTotal - this.lastNeed;
      return oe + this.lastChar.toString("utf16le", 0, be);
    }
    return oe;
  }
  function te(ae, oe) {
    var be = (ae.length - oe) % 3;
    return be === 0 ? ae.toString("base64", oe) : (this.lastNeed = 3 - be, this.lastTotal = 3, be === 1 ? this.lastChar[0] = ae[ae.length - 1] : (this.lastChar[0] = ae[ae.length - 2], this.lastChar[1] = ae[ae.length - 1]), ae.toString("base64", oe, ae.length - be));
  }
  function ie(ae) {
    var oe = ae && ae.length ? this.write(ae) : "";
    return this.lastNeed ? oe + this.lastChar.toString("base64", 0, 3 - this.lastNeed) : oe;
  }
  function ne(ae) {
    return ae.toString(this.encoding);
  }
  function se(ae) {
    return ae && ae.length ? this.write(ae) : "";
  }
  return string_decoder;
}
var endOfStream, hasRequiredEndOfStream;
function requireEndOfStream() {
  if (hasRequiredEndOfStream) return endOfStream;
  hasRequiredEndOfStream = 1;
  var P = requireErrorsBrowser().codes.ERR_STREAM_PREMATURE_CLOSE;
  function c(t) {
    var F = !1;
    return function() {
      if (!F) {
        F = !0;
        for (var l = arguments.length, U = new Array(l), $ = 0; $ < l; $++)
          U[$] = arguments[$];
        t.apply(this, U);
      }
    };
  }
  function O() {
  }
  function q(t) {
    return t.setHeader && typeof t.abort == "function";
  }
  function X(t, F, l) {
    if (typeof F == "function") return X(t, null, F);
    F || (F = {}), l = c(l || O);
    var U = F.readable || F.readable !== !1 && t.readable, $ = F.writable || F.writable !== !1 && t.writable, D = function() {
      t.writable || V();
    }, Q = t._writableState && t._writableState.finished, V = function() {
      $ = !1, Q = !0, U || l.call(t);
    }, te = t._readableState && t._readableState.endEmitted, ie = function() {
      U = !1, te = !0, $ || l.call(t);
    }, ne = function(oe) {
      l.call(t, oe);
    }, se = function() {
      var oe;
      if (U && !te)
        return (!t._readableState || !t._readableState.ended) && (oe = new P()), l.call(t, oe);
      if ($ && !Q)
        return (!t._writableState || !t._writableState.ended) && (oe = new P()), l.call(t, oe);
    }, ae = function() {
      t.req.on("finish", V);
    };
    return q(t) ? (t.on("complete", V), t.on("abort", se), t.req ? ae() : t.on("request", ae)) : $ && !t._writableState && (t.on("end", D), t.on("close", D)), t.on("end", ie), t.on("finish", V), F.error !== !1 && t.on("error", ne), t.on("close", se), function() {
      t.removeListener("complete", V), t.removeListener("abort", se), t.removeListener("request", ae), t.req && t.req.removeListener("finish", V), t.removeListener("end", D), t.removeListener("close", D), t.removeListener("finish", V), t.removeListener("end", ie), t.removeListener("error", ne), t.removeListener("close", se);
    };
  }
  return endOfStream = X, endOfStream;
}
var async_iterator, hasRequiredAsync_iterator;
function requireAsync_iterator() {
  if (hasRequiredAsync_iterator) return async_iterator;
  hasRequiredAsync_iterator = 1;
  var P;
  function c(be, de, _e) {
    return de = O(de), de in be ? Object.defineProperty(be, de, { value: _e, enumerable: !0, configurable: !0, writable: !0 }) : be[de] = _e, be;
  }
  function O(be) {
    var de = q(be, "string");
    return typeof de == "symbol" ? de : String(de);
  }
  function q(be, de) {
    if (typeof be != "object" || be === null) return be;
    var _e = be[Symbol.toPrimitive];
    if (_e !== void 0) {
      var qe = _e.call(be, de || "default");
      if (typeof qe != "object") return qe;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (de === "string" ? String : Number)(be);
  }
  var X = requireEndOfStream(), t = Symbol("lastResolve"), F = Symbol("lastReject"), l = Symbol("error"), U = Symbol("ended"), $ = Symbol("lastPromise"), D = Symbol("handlePromise"), Q = Symbol("stream");
  function V(be, de) {
    return {
      value: be,
      done: de
    };
  }
  function te(be) {
    var de = be[t];
    if (de !== null) {
      var _e = be[Q].read();
      _e !== null && (be[$] = null, be[t] = null, be[F] = null, de(V(_e, !1)));
    }
  }
  function ie(be) {
    process$1.nextTick(te, be);
  }
  function ne(be, de) {
    return function(_e, qe) {
      be.then(function() {
        if (de[U]) {
          _e(V(void 0, !0));
          return;
        }
        de[D](_e, qe);
      }, qe);
    };
  }
  var se = Object.getPrototypeOf(function() {
  }), ae = Object.setPrototypeOf((P = {
    get stream() {
      return this[Q];
    },
    next: function() {
      var be = this, de = this[l];
      if (de !== null)
        return Promise.reject(de);
      if (this[U])
        return Promise.resolve(V(void 0, !0));
      if (this[Q].destroyed)
        return new Promise(function(ce, pe) {
          process$1.nextTick(function() {
            be[l] ? pe(be[l]) : ce(V(void 0, !0));
          });
        });
      var _e = this[$], qe;
      if (_e)
        qe = new Promise(ne(_e, this));
      else {
        var Te = this[Q].read();
        if (Te !== null)
          return Promise.resolve(V(Te, !1));
        qe = new Promise(this[D]);
      }
      return this[$] = qe, qe;
    }
  }, c(P, Symbol.asyncIterator, function() {
    return this;
  }), c(P, "return", function() {
    var be = this;
    return new Promise(function(de, _e) {
      be[Q].destroy(null, function(qe) {
        if (qe) {
          _e(qe);
          return;
        }
        de(V(void 0, !0));
      });
    });
  }), P), se), oe = function(be) {
    var de, _e = Object.create(ae, (de = {}, c(de, Q, {
      value: be,
      writable: !0
    }), c(de, t, {
      value: null,
      writable: !0
    }), c(de, F, {
      value: null,
      writable: !0
    }), c(de, l, {
      value: null,
      writable: !0
    }), c(de, U, {
      value: be._readableState.endEmitted,
      writable: !0
    }), c(de, D, {
      value: function(qe, Te) {
        var ce = _e[Q].read();
        ce ? (_e[$] = null, _e[t] = null, _e[F] = null, qe(V(ce, !1))) : (_e[t] = qe, _e[F] = Te);
      },
      writable: !0
    }), de));
    return _e[$] = null, X(be, function(qe) {
      if (qe && qe.code !== "ERR_STREAM_PREMATURE_CLOSE") {
        var Te = _e[F];
        Te !== null && (_e[$] = null, _e[t] = null, _e[F] = null, Te(qe)), _e[l] = qe;
        return;
      }
      var ce = _e[t];
      ce !== null && (_e[$] = null, _e[t] = null, _e[F] = null, ce(V(void 0, !0))), _e[U] = !0;
    }), be.on("readable", ie.bind(null, _e)), _e;
  };
  return async_iterator = oe, async_iterator;
}
var fromBrowser, hasRequiredFromBrowser;
function requireFromBrowser() {
  return hasRequiredFromBrowser || (hasRequiredFromBrowser = 1, fromBrowser = function() {
    throw new Error("Readable.from is not available in the browser");
  }), fromBrowser;
}
var _stream_readable$1, hasRequired_stream_readable$1;
function require_stream_readable$1() {
  if (hasRequired_stream_readable$1) return _stream_readable$1;
  hasRequired_stream_readable$1 = 1, _stream_readable$1 = pe;
  var P;
  pe.ReadableState = ce, requireEvents().EventEmitter;
  var c = function(me, ve) {
    return me.listeners(ve).length;
  }, O = requireStreamBrowser$1(), q = requireBuffer$1().Buffer, X = (typeof commonjsGlobal != "undefined" ? commonjsGlobal : typeof window != "undefined" ? window : typeof self != "undefined" ? self : {}).Uint8Array || function() {
  };
  function t(me) {
    return q.from(me);
  }
  function F(me) {
    return q.isBuffer(me) || me instanceof X;
  }
  var l = requireUtil$1(), U;
  l && l.debuglog ? U = l.debuglog("stream") : U = function() {
  };
  var $ = requireBuffer_list(), D = requireDestroy$1(), Q = requireState(), V = Q.getHighWaterMark, te = requireErrorsBrowser().codes, ie = te.ERR_INVALID_ARG_TYPE, ne = te.ERR_STREAM_PUSH_AFTER_EOF, se = te.ERR_METHOD_NOT_IMPLEMENTED, ae = te.ERR_STREAM_UNSHIFT_AFTER_END_EVENT, oe, be, de;
  requireInherits_browser()(pe, O);
  var _e = D.errorOrDestroy, qe = ["error", "close", "destroy", "pause", "resume"];
  function Te(me, ve, Ae) {
    if (typeof me.prependListener == "function") return me.prependListener(ve, Ae);
    !me._events || !me._events[ve] ? me.on(ve, Ae) : Array.isArray(me._events[ve]) ? me._events[ve].unshift(Ae) : me._events[ve] = [Ae, me._events[ve]];
  }
  function ce(me, ve, Ae) {
    P = P || require_stream_duplex$1(), me = me || {}, typeof Ae != "boolean" && (Ae = ve instanceof P), this.objectMode = !!me.objectMode, Ae && (this.objectMode = this.objectMode || !!me.readableObjectMode), this.highWaterMark = V(this, me, "readableHighWaterMark", Ae), this.buffer = new $(), this.length = 0, this.pipes = null, this.pipesCount = 0, this.flowing = null, this.ended = !1, this.endEmitted = !1, this.reading = !1, this.sync = !0, this.needReadable = !1, this.emittedReadable = !1, this.readableListening = !1, this.resumeScheduled = !1, this.paused = !0, this.emitClose = me.emitClose !== !1, this.autoDestroy = !!me.autoDestroy, this.destroyed = !1, this.defaultEncoding = me.defaultEncoding || "utf8", this.awaitDrain = 0, this.readingMore = !1, this.decoder = null, this.encoding = null, me.encoding && (oe || (oe = requireString_decoder().StringDecoder), this.decoder = new oe(me.encoding), this.encoding = me.encoding);
  }
  function pe(me) {
    if (P = P || require_stream_duplex$1(), !(this instanceof pe)) return new pe(me);
    var ve = this instanceof P;
    this._readableState = new ce(me, this, ve), this.readable = !0, me && (typeof me.read == "function" && (this._read = me.read), typeof me.destroy == "function" && (this._destroy = me.destroy)), O.call(this);
  }
  Object.defineProperty(pe.prototype, "destroyed", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._readableState === void 0 ? !1 : this._readableState.destroyed;
    },
    set: function(me) {
      this._readableState && (this._readableState.destroyed = me);
    }
  }), pe.prototype.destroy = D.destroy, pe.prototype._undestroy = D.undestroy, pe.prototype._destroy = function(me, ve) {
    ve(me);
  }, pe.prototype.push = function(me, ve) {
    var Ae = this._readableState, $e;
    return Ae.objectMode ? $e = !0 : typeof me == "string" && (ve = ve || Ae.defaultEncoding, ve !== Ae.encoding && (me = q.from(me, ve), ve = ""), $e = !0), Me(this, me, ve, !1, $e);
  }, pe.prototype.unshift = function(me) {
    return Me(this, me, null, !0, !1);
  };
  function Me(me, ve, Ae, $e, Oe) {
    U("readableAddChunk", ve);
    var Y = me._readableState;
    if (ve === null)
      Y.reading = !1, H(me, Y);
    else {
      var Z;
      if (Oe || (Z = ee(Y, ve)), Z)
        _e(me, Z);
      else if (Y.objectMode || ve && ve.length > 0)
        if (typeof ve != "string" && !Y.objectMode && Object.getPrototypeOf(ve) !== q.prototype && (ve = t(ve)), $e)
          Y.endEmitted ? _e(me, new ae()) : K(me, Y, ve, !0);
        else if (Y.ended)
          _e(me, new ne());
        else {
          if (Y.destroyed)
            return !1;
          Y.reading = !1, Y.decoder && !Ae ? (ve = Y.decoder.write(ve), Y.objectMode || ve.length !== 0 ? K(me, Y, ve, !1) : w(me, Y)) : K(me, Y, ve, !1);
        }
      else $e || (Y.reading = !1, w(me, Y));
    }
    return !Y.ended && (Y.length < Y.highWaterMark || Y.length === 0);
  }
  function K(me, ve, Ae, $e) {
    ve.flowing && ve.length === 0 && !ve.sync ? (ve.awaitDrain = 0, me.emit("data", Ae)) : (ve.length += ve.objectMode ? 1 : Ae.length, $e ? ve.buffer.unshift(Ae) : ve.buffer.push(Ae), ve.needReadable && z(me)), w(me, ve);
  }
  function ee(me, ve) {
    var Ae;
    return !F(ve) && typeof ve != "string" && ve !== void 0 && !me.objectMode && (Ae = new ie("chunk", ["string", "Buffer", "Uint8Array"], ve)), Ae;
  }
  pe.prototype.isPaused = function() {
    return this._readableState.flowing === !1;
  }, pe.prototype.setEncoding = function(me) {
    oe || (oe = requireString_decoder().StringDecoder);
    var ve = new oe(me);
    this._readableState.decoder = ve, this._readableState.encoding = this._readableState.decoder.encoding;
    for (var Ae = this._readableState.buffer.head, $e = ""; Ae !== null; )
      $e += ve.write(Ae.data), Ae = Ae.next;
    return this._readableState.buffer.clear(), $e !== "" && this._readableState.buffer.push($e), this._readableState.length = $e.length, this;
  };
  var e = 1073741824;
  function o(me) {
    return me >= e ? me = e : (me--, me |= me >>> 1, me |= me >>> 2, me |= me >>> 4, me |= me >>> 8, me |= me >>> 16, me++), me;
  }
  function y(me, ve) {
    return me <= 0 || ve.length === 0 && ve.ended ? 0 : ve.objectMode ? 1 : me !== me ? ve.flowing && ve.length ? ve.buffer.head.data.length : ve.length : (me > ve.highWaterMark && (ve.highWaterMark = o(me)), me <= ve.length ? me : ve.ended ? ve.length : (ve.needReadable = !0, 0));
  }
  pe.prototype.read = function(me) {
    U("read", me), me = parseInt(me, 10);
    var ve = this._readableState, Ae = me;
    if (me !== 0 && (ve.emittedReadable = !1), me === 0 && ve.needReadable && ((ve.highWaterMark !== 0 ? ve.length >= ve.highWaterMark : ve.length > 0) || ve.ended))
      return U("read: emitReadable", ve.length, ve.ended), ve.length === 0 && ve.ended ? he(this) : z(this), null;
    if (me = y(me, ve), me === 0 && ve.ended)
      return ve.length === 0 && he(this), null;
    var $e = ve.needReadable;
    U("need readable", $e), (ve.length === 0 || ve.length - me < ve.highWaterMark) && ($e = !0, U("length less than watermark", $e)), ve.ended || ve.reading ? ($e = !1, U("reading or ended", $e)) : $e && (U("do read"), ve.reading = !0, ve.sync = !0, ve.length === 0 && (ve.needReadable = !0), this._read(ve.highWaterMark), ve.sync = !1, ve.reading || (me = y(Ae, ve)));
    var Oe;
    return me > 0 ? Oe = fe(me, ve) : Oe = null, Oe === null ? (ve.needReadable = ve.length <= ve.highWaterMark, me = 0) : (ve.length -= me, ve.awaitDrain = 0), ve.length === 0 && (ve.ended || (ve.needReadable = !0), Ae !== me && ve.ended && he(this)), Oe !== null && this.emit("data", Oe), Oe;
  };
  function H(me, ve) {
    if (U("onEofChunk"), !ve.ended) {
      if (ve.decoder) {
        var Ae = ve.decoder.end();
        Ae && Ae.length && (ve.buffer.push(Ae), ve.length += ve.objectMode ? 1 : Ae.length);
      }
      ve.ended = !0, ve.sync ? z(me) : (ve.needReadable = !1, ve.emittedReadable || (ve.emittedReadable = !0, B(me)));
    }
  }
  function z(me) {
    var ve = me._readableState;
    U("emitReadable", ve.needReadable, ve.emittedReadable), ve.needReadable = !1, ve.emittedReadable || (U("emitReadable", ve.flowing), ve.emittedReadable = !0, process$1.nextTick(B, me));
  }
  function B(me) {
    var ve = me._readableState;
    U("emitReadable_", ve.destroyed, ve.length, ve.ended), !ve.destroyed && (ve.length || ve.ended) && (me.emit("readable"), ve.emittedReadable = !1), ve.needReadable = !ve.flowing && !ve.ended && ve.length <= ve.highWaterMark, ye(me);
  }
  function w(me, ve) {
    ve.readingMore || (ve.readingMore = !0, process$1.nextTick(G, me, ve));
  }
  function G(me, ve) {
    for (; !ve.reading && !ve.ended && (ve.length < ve.highWaterMark || ve.flowing && ve.length === 0); ) {
      var Ae = ve.length;
      if (U("maybeReadMore read 0"), me.read(0), Ae === ve.length)
        break;
    }
    ve.readingMore = !1;
  }
  pe.prototype._read = function(me) {
    _e(this, new se("_read()"));
  }, pe.prototype.pipe = function(me, ve) {
    var Ae = this, $e = this._readableState;
    switch ($e.pipesCount) {
      case 0:
        $e.pipes = me;
        break;
      case 1:
        $e.pipes = [$e.pipes, me];
        break;
      default:
        $e.pipes.push(me);
        break;
    }
    $e.pipesCount += 1, U("pipe count=%d opts=%j", $e.pipesCount, ve);
    var Oe = (!ve || ve.end !== !1) && me !== process$1.stdout && me !== process$1.stderr, Y = Oe ? re : Ce;
    $e.endEmitted ? process$1.nextTick(Y) : Ae.once("end", Y), me.on("unpipe", Z);
    function Z(je, Ve) {
      U("onunpipe"), je === Ae && Ve && Ve.hasUnpiped === !1 && (Ve.hasUnpiped = !0, Ee());
    }
    function re() {
      U("onend"), me.end();
    }
    var ue = g(Ae);
    me.on("drain", ue);
    var we = !1;
    function Ee() {
      U("cleanup"), me.removeListener("close", Le), me.removeListener("finish", Pe), me.removeListener("drain", ue), me.removeListener("error", xe), me.removeListener("unpipe", Z), Ae.removeListener("end", re), Ae.removeListener("end", Ce), Ae.removeListener("data", Ie), we = !0, $e.awaitDrain && (!me._writableState || me._writableState.needDrain) && ue();
    }
    Ae.on("data", Ie);
    function Ie(je) {
      U("ondata");
      var Ve = me.write(je);
      U("dest.write", Ve), Ve === !1 && (($e.pipesCount === 1 && $e.pipes === me || $e.pipesCount > 1 && ke($e.pipes, me) !== -1) && !we && (U("false write response, pause", $e.awaitDrain), $e.awaitDrain++), Ae.pause());
    }
    function xe(je) {
      U("onerror", je), Ce(), me.removeListener("error", xe), c(me, "error") === 0 && _e(me, je);
    }
    Te(me, "error", xe);
    function Le() {
      me.removeListener("finish", Pe), Ce();
    }
    me.once("close", Le);
    function Pe() {
      U("onfinish"), me.removeListener("close", Le), Ce();
    }
    me.once("finish", Pe);
    function Ce() {
      U("unpipe"), Ae.unpipe(me);
    }
    return me.emit("pipe", Ae), $e.flowing || (U("pipe resume"), Ae.resume()), me;
  };
  function g(me) {
    return function() {
      var ve = me._readableState;
      U("pipeOnDrain", ve.awaitDrain), ve.awaitDrain && ve.awaitDrain--, ve.awaitDrain === 0 && c(me, "data") && (ve.flowing = !0, ye(me));
    };
  }
  pe.prototype.unpipe = function(me) {
    var ve = this._readableState, Ae = {
      hasUnpiped: !1
    };
    if (ve.pipesCount === 0) return this;
    if (ve.pipesCount === 1)
      return me && me !== ve.pipes ? this : (me || (me = ve.pipes), ve.pipes = null, ve.pipesCount = 0, ve.flowing = !1, me && me.emit("unpipe", this, Ae), this);
    if (!me) {
      var $e = ve.pipes, Oe = ve.pipesCount;
      ve.pipes = null, ve.pipesCount = 0, ve.flowing = !1;
      for (var Y = 0; Y < Oe; Y++) $e[Y].emit("unpipe", this, {
        hasUnpiped: !1
      });
      return this;
    }
    var Z = ke(ve.pipes, me);
    return Z === -1 ? this : (ve.pipes.splice(Z, 1), ve.pipesCount -= 1, ve.pipesCount === 1 && (ve.pipes = ve.pipes[0]), me.emit("unpipe", this, Ae), this);
  }, pe.prototype.on = function(me, ve) {
    var Ae = O.prototype.on.call(this, me, ve), $e = this._readableState;
    return me === "data" ? ($e.readableListening = this.listenerCount("readable") > 0, $e.flowing !== !1 && this.resume()) : me === "readable" && !$e.endEmitted && !$e.readableListening && ($e.readableListening = $e.needReadable = !0, $e.flowing = !1, $e.emittedReadable = !1, U("on readable", $e.length, $e.reading), $e.length ? z(this) : $e.reading || process$1.nextTick(le, this)), Ae;
  }, pe.prototype.addListener = pe.prototype.on, pe.prototype.removeListener = function(me, ve) {
    var Ae = O.prototype.removeListener.call(this, me, ve);
    return me === "readable" && process$1.nextTick(J, this), Ae;
  }, pe.prototype.removeAllListeners = function(me) {
    var ve = O.prototype.removeAllListeners.apply(this, arguments);
    return (me === "readable" || me === void 0) && process$1.nextTick(J, this), ve;
  };
  function J(me) {
    var ve = me._readableState;
    ve.readableListening = me.listenerCount("readable") > 0, ve.resumeScheduled && !ve.paused ? ve.flowing = !0 : me.listenerCount("data") > 0 && me.resume();
  }
  function le(me) {
    U("readable nexttick read 0"), me.read(0);
  }
  pe.prototype.resume = function() {
    var me = this._readableState;
    return me.flowing || (U("resume"), me.flowing = !me.readableListening, ge(this, me)), me.paused = !1, this;
  };
  function ge(me, ve) {
    ve.resumeScheduled || (ve.resumeScheduled = !0, process$1.nextTick(Se, me, ve));
  }
  function Se(me, ve) {
    U("resume", ve.reading), ve.reading || me.read(0), ve.resumeScheduled = !1, me.emit("resume"), ye(me), ve.flowing && !ve.reading && me.read(0);
  }
  pe.prototype.pause = function() {
    return U("call pause flowing=%j", this._readableState.flowing), this._readableState.flowing !== !1 && (U("pause"), this._readableState.flowing = !1, this.emit("pause")), this._readableState.paused = !0, this;
  };
  function ye(me) {
    var ve = me._readableState;
    for (U("flow", ve.flowing); ve.flowing && me.read() !== null; ) ;
  }
  pe.prototype.wrap = function(me) {
    var ve = this, Ae = this._readableState, $e = !1;
    me.on("end", function() {
      if (U("wrapped end"), Ae.decoder && !Ae.ended) {
        var Z = Ae.decoder.end();
        Z && Z.length && ve.push(Z);
      }
      ve.push(null);
    }), me.on("data", function(Z) {
      if (U("wrapped data"), Ae.decoder && (Z = Ae.decoder.write(Z)), !(Ae.objectMode && Z == null) && !(!Ae.objectMode && (!Z || !Z.length))) {
        var re = ve.push(Z);
        re || ($e = !0, me.pause());
      }
    });
    for (var Oe in me)
      this[Oe] === void 0 && typeof me[Oe] == "function" && (this[Oe] = /* @__PURE__ */ function(Z) {
        return function() {
          return me[Z].apply(me, arguments);
        };
      }(Oe));
    for (var Y = 0; Y < qe.length; Y++)
      me.on(qe[Y], this.emit.bind(this, qe[Y]));
    return this._read = function(Z) {
      U("wrapped _read", Z), $e && ($e = !1, me.resume());
    }, this;
  }, typeof Symbol == "function" && (pe.prototype[Symbol.asyncIterator] = function() {
    return be === void 0 && (be = requireAsync_iterator()), be(this);
  }), Object.defineProperty(pe.prototype, "readableHighWaterMark", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._readableState.highWaterMark;
    }
  }), Object.defineProperty(pe.prototype, "readableBuffer", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._readableState && this._readableState.buffer;
    }
  }), Object.defineProperty(pe.prototype, "readableFlowing", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._readableState.flowing;
    },
    set: function(me) {
      this._readableState && (this._readableState.flowing = me);
    }
  }), pe._fromList = fe, Object.defineProperty(pe.prototype, "readableLength", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._readableState.length;
    }
  });
  function fe(me, ve) {
    if (ve.length === 0) return null;
    var Ae;
    return ve.objectMode ? Ae = ve.buffer.shift() : !me || me >= ve.length ? (ve.decoder ? Ae = ve.buffer.join("") : ve.buffer.length === 1 ? Ae = ve.buffer.first() : Ae = ve.buffer.concat(ve.length), ve.buffer.clear()) : Ae = ve.buffer.consume(me, ve.decoder), Ae;
  }
  function he(me) {
    var ve = me._readableState;
    U("endReadable", ve.endEmitted), ve.endEmitted || (ve.ended = !0, process$1.nextTick(Re, ve, me));
  }
  function Re(me, ve) {
    if (U("endReadableNT", me.endEmitted, me.length), !me.endEmitted && me.length === 0 && (me.endEmitted = !0, ve.readable = !1, ve.emit("end"), me.autoDestroy)) {
      var Ae = ve._writableState;
      (!Ae || Ae.autoDestroy && Ae.finished) && ve.destroy();
    }
  }
  typeof Symbol == "function" && (pe.from = function(me, ve) {
    return de === void 0 && (de = requireFromBrowser()), de(pe, me, ve);
  });
  function ke(me, ve) {
    for (var Ae = 0, $e = me.length; Ae < $e; Ae++)
      if (me[Ae] === ve) return Ae;
    return -1;
  }
  return _stream_readable$1;
}
var _stream_transform$1, hasRequired_stream_transform$1;
function require_stream_transform$1() {
  if (hasRequired_stream_transform$1) return _stream_transform$1;
  hasRequired_stream_transform$1 = 1, _stream_transform$1 = l;
  var P = requireErrorsBrowser().codes, c = P.ERR_METHOD_NOT_IMPLEMENTED, O = P.ERR_MULTIPLE_CALLBACK, q = P.ERR_TRANSFORM_ALREADY_TRANSFORMING, X = P.ERR_TRANSFORM_WITH_LENGTH_0, t = require_stream_duplex$1();
  requireInherits_browser()(l, t);
  function F(D, Q) {
    var V = this._transformState;
    V.transforming = !1;
    var te = V.writecb;
    if (te === null)
      return this.emit("error", new O());
    V.writechunk = null, V.writecb = null, Q != null && this.push(Q), te(D);
    var ie = this._readableState;
    ie.reading = !1, (ie.needReadable || ie.length < ie.highWaterMark) && this._read(ie.highWaterMark);
  }
  function l(D) {
    if (!(this instanceof l)) return new l(D);
    t.call(this, D), this._transformState = {
      afterTransform: F.bind(this),
      needTransform: !1,
      transforming: !1,
      writecb: null,
      writechunk: null,
      writeencoding: null
    }, this._readableState.needReadable = !0, this._readableState.sync = !1, D && (typeof D.transform == "function" && (this._transform = D.transform), typeof D.flush == "function" && (this._flush = D.flush)), this.on("prefinish", U);
  }
  function U() {
    var D = this;
    typeof this._flush == "function" && !this._readableState.destroyed ? this._flush(function(Q, V) {
      $(D, Q, V);
    }) : $(this, null, null);
  }
  l.prototype.push = function(D, Q) {
    return this._transformState.needTransform = !1, t.prototype.push.call(this, D, Q);
  }, l.prototype._transform = function(D, Q, V) {
    V(new c("_transform()"));
  }, l.prototype._write = function(D, Q, V) {
    var te = this._transformState;
    if (te.writecb = V, te.writechunk = D, te.writeencoding = Q, !te.transforming) {
      var ie = this._readableState;
      (te.needTransform || ie.needReadable || ie.length < ie.highWaterMark) && this._read(ie.highWaterMark);
    }
  }, l.prototype._read = function(D) {
    var Q = this._transformState;
    Q.writechunk !== null && !Q.transforming ? (Q.transforming = !0, this._transform(Q.writechunk, Q.writeencoding, Q.afterTransform)) : Q.needTransform = !0;
  }, l.prototype._destroy = function(D, Q) {
    t.prototype._destroy.call(this, D, function(V) {
      Q(V);
    });
  };
  function $(D, Q, V) {
    if (Q) return D.emit("error", Q);
    if (V != null && D.push(V), D._writableState.length) throw new X();
    if (D._transformState.transforming) throw new q();
    return D.push(null);
  }
  return _stream_transform$1;
}
var _stream_passthrough$1, hasRequired_stream_passthrough$1;
function require_stream_passthrough$1() {
  if (hasRequired_stream_passthrough$1) return _stream_passthrough$1;
  hasRequired_stream_passthrough$1 = 1, _stream_passthrough$1 = c;
  var P = require_stream_transform$1();
  requireInherits_browser()(c, P);
  function c(O) {
    if (!(this instanceof c)) return new c(O);
    P.call(this, O);
  }
  return c.prototype._transform = function(O, q, X) {
    X(null, O);
  }, _stream_passthrough$1;
}
var pipeline_1, hasRequiredPipeline;
function requirePipeline() {
  if (hasRequiredPipeline) return pipeline_1;
  hasRequiredPipeline = 1;
  var P;
  function c(V) {
    var te = !1;
    return function() {
      te || (te = !0, V.apply(void 0, arguments));
    };
  }
  var O = requireErrorsBrowser().codes, q = O.ERR_MISSING_ARGS, X = O.ERR_STREAM_DESTROYED;
  function t(V) {
    if (V) throw V;
  }
  function F(V) {
    return V.setHeader && typeof V.abort == "function";
  }
  function l(V, te, ie, ne) {
    ne = c(ne);
    var se = !1;
    V.on("close", function() {
      se = !0;
    }), P === void 0 && (P = requireEndOfStream()), P(V, {
      readable: te,
      writable: ie
    }, function(oe) {
      if (oe) return ne(oe);
      se = !0, ne();
    });
    var ae = !1;
    return function(oe) {
      if (!se && !ae) {
        if (ae = !0, F(V)) return V.abort();
        if (typeof V.destroy == "function") return V.destroy();
        ne(oe || new X("pipe"));
      }
    };
  }
  function U(V) {
    V();
  }
  function $(V, te) {
    return V.pipe(te);
  }
  function D(V) {
    return !V.length || typeof V[V.length - 1] != "function" ? t : V.pop();
  }
  function Q() {
    for (var V = arguments.length, te = new Array(V), ie = 0; ie < V; ie++)
      te[ie] = arguments[ie];
    var ne = D(te);
    if (Array.isArray(te[0]) && (te = te[0]), te.length < 2)
      throw new q("streams");
    var se, ae = te.map(function(oe, be) {
      var de = be < te.length - 1, _e = be > 0;
      return l(oe, de, _e, function(qe) {
        se || (se = qe), qe && ae.forEach(U), !de && (ae.forEach(U), ne(se));
      });
    });
    return te.reduce($);
  }
  return pipeline_1 = Q, pipeline_1;
}
var hasRequiredReadableBrowser$1;
function requireReadableBrowser$1() {
  return hasRequiredReadableBrowser$1 || (hasRequiredReadableBrowser$1 = 1, function(P, c) {
    c = P.exports = require_stream_readable$1(), c.Stream = c, c.Readable = c, c.Writable = require_stream_writable$1(), c.Duplex = require_stream_duplex$1(), c.Transform = require_stream_transform$1(), c.PassThrough = require_stream_passthrough$1(), c.finished = requireEndOfStream(), c.pipeline = requirePipeline();
  }(readableBrowser$1, readableBrowser$1.exports)), readableBrowser$1.exports;
}
var hashBase$1, hasRequiredHashBase$1;
function requireHashBase$1() {
  if (hasRequiredHashBase$1) return hashBase$1;
  hasRequiredHashBase$1 = 1;
  var P = requireSafeBuffer$1().Buffer, c = requireReadableBrowser$1().Transform, O = requireInherits_browser();
  function q(t, F) {
    if (!P.isBuffer(t) && typeof t != "string")
      throw new TypeError(F + " must be a string or a buffer");
  }
  function X(t) {
    c.call(this), this._block = P.allocUnsafe(t), this._blockSize = t, this._blockOffset = 0, this._length = [0, 0, 0, 0], this._finalized = !1;
  }
  return O(X, c), X.prototype._transform = function(t, F, l) {
    var U = null;
    try {
      this.update(t, F);
    } catch ($) {
      U = $;
    }
    l(U);
  }, X.prototype._flush = function(t) {
    var F = null;
    try {
      this.push(this.digest());
    } catch (l) {
      F = l;
    }
    t(F);
  }, X.prototype.update = function(t, F) {
    if (q(t, "Data"), this._finalized) throw new Error("Digest already called");
    P.isBuffer(t) || (t = P.from(t, F));
    for (var l = this._block, U = 0; this._blockOffset + t.length - U >= this._blockSize; ) {
      for (var $ = this._blockOffset; $ < this._blockSize; ) l[$++] = t[U++];
      this._update(), this._blockOffset = 0;
    }
    for (; U < t.length; ) l[this._blockOffset++] = t[U++];
    for (var D = 0, Q = t.length * 8; Q > 0; ++D)
      this._length[D] += Q, Q = this._length[D] / 4294967296 | 0, Q > 0 && (this._length[D] -= 4294967296 * Q);
    return this;
  }, X.prototype._update = function() {
    throw new Error("_update is not implemented");
  }, X.prototype.digest = function(t) {
    if (this._finalized) throw new Error("Digest already called");
    this._finalized = !0;
    var F = this._digest();
    t !== void 0 && (F = F.toString(t)), this._block.fill(0), this._blockOffset = 0;
    for (var l = 0; l < 4; ++l) this._length[l] = 0;
    return F;
  }, X.prototype._digest = function() {
    throw new Error("_digest is not implemented");
  }, hashBase$1 = X, hashBase$1;
}
var md5_js, hasRequiredMd5_js;
function requireMd5_js() {
  if (hasRequiredMd5_js) return md5_js;
  hasRequiredMd5_js = 1;
  var P = requireInherits_browser(), c = requireHashBase$1(), O = requireSafeBuffer$1().Buffer, q = new Array(16);
  function X() {
    c.call(this, 64), this._a = 1732584193, this._b = 4023233417, this._c = 2562383102, this._d = 271733878;
  }
  P(X, c), X.prototype._update = function() {
    for (var D = q, Q = 0; Q < 16; ++Q) D[Q] = this._block.readInt32LE(Q * 4);
    var V = this._a, te = this._b, ie = this._c, ne = this._d;
    V = F(V, te, ie, ne, D[0], 3614090360, 7), ne = F(ne, V, te, ie, D[1], 3905402710, 12), ie = F(ie, ne, V, te, D[2], 606105819, 17), te = F(te, ie, ne, V, D[3], 3250441966, 22), V = F(V, te, ie, ne, D[4], 4118548399, 7), ne = F(ne, V, te, ie, D[5], 1200080426, 12), ie = F(ie, ne, V, te, D[6], 2821735955, 17), te = F(te, ie, ne, V, D[7], 4249261313, 22), V = F(V, te, ie, ne, D[8], 1770035416, 7), ne = F(ne, V, te, ie, D[9], 2336552879, 12), ie = F(ie, ne, V, te, D[10], 4294925233, 17), te = F(te, ie, ne, V, D[11], 2304563134, 22), V = F(V, te, ie, ne, D[12], 1804603682, 7), ne = F(ne, V, te, ie, D[13], 4254626195, 12), ie = F(ie, ne, V, te, D[14], 2792965006, 17), te = F(te, ie, ne, V, D[15], 1236535329, 22), V = l(V, te, ie, ne, D[1], 4129170786, 5), ne = l(ne, V, te, ie, D[6], 3225465664, 9), ie = l(ie, ne, V, te, D[11], 643717713, 14), te = l(te, ie, ne, V, D[0], 3921069994, 20), V = l(V, te, ie, ne, D[5], 3593408605, 5), ne = l(ne, V, te, ie, D[10], 38016083, 9), ie = l(ie, ne, V, te, D[15], 3634488961, 14), te = l(te, ie, ne, V, D[4], 3889429448, 20), V = l(V, te, ie, ne, D[9], 568446438, 5), ne = l(ne, V, te, ie, D[14], 3275163606, 9), ie = l(ie, ne, V, te, D[3], 4107603335, 14), te = l(te, ie, ne, V, D[8], 1163531501, 20), V = l(V, te, ie, ne, D[13], 2850285829, 5), ne = l(ne, V, te, ie, D[2], 4243563512, 9), ie = l(ie, ne, V, te, D[7], 1735328473, 14), te = l(te, ie, ne, V, D[12], 2368359562, 20), V = U(V, te, ie, ne, D[5], 4294588738, 4), ne = U(ne, V, te, ie, D[8], 2272392833, 11), ie = U(ie, ne, V, te, D[11], 1839030562, 16), te = U(te, ie, ne, V, D[14], 4259657740, 23), V = U(V, te, ie, ne, D[1], 2763975236, 4), ne = U(ne, V, te, ie, D[4], 1272893353, 11), ie = U(ie, ne, V, te, D[7], 4139469664, 16), te = U(te, ie, ne, V, D[10], 3200236656, 23), V = U(V, te, ie, ne, D[13], 681279174, 4), ne = U(ne, V, te, ie, D[0], 3936430074, 11), ie = U(ie, ne, V, te, D[3], 3572445317, 16), te = U(te, ie, ne, V, D[6], 76029189, 23), V = U(V, te, ie, ne, D[9], 3654602809, 4), ne = U(ne, V, te, ie, D[12], 3873151461, 11), ie = U(ie, ne, V, te, D[15], 530742520, 16), te = U(te, ie, ne, V, D[2], 3299628645, 23), V = $(V, te, ie, ne, D[0], 4096336452, 6), ne = $(ne, V, te, ie, D[7], 1126891415, 10), ie = $(ie, ne, V, te, D[14], 2878612391, 15), te = $(te, ie, ne, V, D[5], 4237533241, 21), V = $(V, te, ie, ne, D[12], 1700485571, 6), ne = $(ne, V, te, ie, D[3], 2399980690, 10), ie = $(ie, ne, V, te, D[10], 4293915773, 15), te = $(te, ie, ne, V, D[1], 2240044497, 21), V = $(V, te, ie, ne, D[8], 1873313359, 6), ne = $(ne, V, te, ie, D[15], 4264355552, 10), ie = $(ie, ne, V, te, D[6], 2734768916, 15), te = $(te, ie, ne, V, D[13], 1309151649, 21), V = $(V, te, ie, ne, D[4], 4149444226, 6), ne = $(ne, V, te, ie, D[11], 3174756917, 10), ie = $(ie, ne, V, te, D[2], 718787259, 15), te = $(te, ie, ne, V, D[9], 3951481745, 21), this._a = this._a + V | 0, this._b = this._b + te | 0, this._c = this._c + ie | 0, this._d = this._d + ne | 0;
  }, X.prototype._digest = function() {
    this._block[this._blockOffset++] = 128, this._blockOffset > 56 && (this._block.fill(0, this._blockOffset, 64), this._update(), this._blockOffset = 0), this._block.fill(0, this._blockOffset, 56), this._block.writeUInt32LE(this._length[0], 56), this._block.writeUInt32LE(this._length[1], 60), this._update();
    var D = O.allocUnsafe(16);
    return D.writeInt32LE(this._a, 0), D.writeInt32LE(this._b, 4), D.writeInt32LE(this._c, 8), D.writeInt32LE(this._d, 12), D;
  };
  function t(D, Q) {
    return D << Q | D >>> 32 - Q;
  }
  function F(D, Q, V, te, ie, ne, se) {
    return t(D + (Q & V | ~Q & te) + ie + ne | 0, se) + Q | 0;
  }
  function l(D, Q, V, te, ie, ne, se) {
    return t(D + (Q & te | V & ~te) + ie + ne | 0, se) + Q | 0;
  }
  function U(D, Q, V, te, ie, ne, se) {
    return t(D + (Q ^ V ^ te) + ie + ne | 0, se) + Q | 0;
  }
  function $(D, Q, V, te, ie, ne, se) {
    return t(D + (V ^ (Q | ~te)) + ie + ne | 0, se) + Q | 0;
  }
  return md5_js = X, md5_js;
}
var hashBase, hasRequiredHashBase;
function requireHashBase() {
  if (hasRequiredHashBase) return hashBase;
  hasRequiredHashBase = 1;
  var P = requireSafeBuffer$1().Buffer, c = requireReadableBrowser$1().Transform, O = requireInherits_browser();
  function q(t, F) {
    if (!P.isBuffer(t) && typeof t != "string")
      throw new TypeError(F + " must be a string or a buffer");
  }
  function X(t) {
    c.call(this), this._block = P.allocUnsafe(t), this._blockSize = t, this._blockOffset = 0, this._length = [0, 0, 0, 0], this._finalized = !1;
  }
  return O(X, c), X.prototype._transform = function(t, F, l) {
    var U = null;
    try {
      this.update(t, F);
    } catch ($) {
      U = $;
    }
    l(U);
  }, X.prototype._flush = function(t) {
    var F = null;
    try {
      this.push(this.digest());
    } catch (l) {
      F = l;
    }
    t(F);
  }, X.prototype.update = function(t, F) {
    if (q(t, "Data"), this._finalized) throw new Error("Digest already called");
    P.isBuffer(t) || (t = P.from(t, F));
    for (var l = this._block, U = 0; this._blockOffset + t.length - U >= this._blockSize; ) {
      for (var $ = this._blockOffset; $ < this._blockSize; ) l[$++] = t[U++];
      this._update(), this._blockOffset = 0;
    }
    for (; U < t.length; ) l[this._blockOffset++] = t[U++];
    for (var D = 0, Q = t.length * 8; Q > 0; ++D)
      this._length[D] += Q, Q = this._length[D] / 4294967296 | 0, Q > 0 && (this._length[D] -= 4294967296 * Q);
    return this;
  }, X.prototype._update = function() {
    throw new Error("_update is not implemented");
  }, X.prototype.digest = function(t) {
    if (this._finalized) throw new Error("Digest already called");
    this._finalized = !0;
    var F = this._digest();
    t !== void 0 && (F = F.toString(t)), this._block.fill(0), this._blockOffset = 0;
    for (var l = 0; l < 4; ++l) this._length[l] = 0;
    return F;
  }, X.prototype._digest = function() {
    throw new Error("_digest is not implemented");
  }, hashBase = X, hashBase;
}
var ripemd160, hasRequiredRipemd160;
function requireRipemd160() {
  if (hasRequiredRipemd160) return ripemd160;
  hasRequiredRipemd160 = 1;
  var P = requireBuffer$1().Buffer, c = requireInherits_browser(), O = requireHashBase(), q = new Array(16), X = [
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    7,
    4,
    13,
    1,
    10,
    6,
    15,
    3,
    12,
    0,
    9,
    5,
    2,
    14,
    11,
    8,
    3,
    10,
    14,
    4,
    9,
    15,
    8,
    1,
    2,
    7,
    0,
    6,
    13,
    11,
    5,
    12,
    1,
    9,
    11,
    10,
    0,
    8,
    12,
    4,
    13,
    3,
    7,
    15,
    14,
    5,
    6,
    2,
    4,
    0,
    5,
    9,
    7,
    12,
    2,
    10,
    14,
    1,
    3,
    8,
    11,
    6,
    15,
    13
  ], t = [
    5,
    14,
    7,
    0,
    9,
    2,
    11,
    4,
    13,
    6,
    15,
    8,
    1,
    10,
    3,
    12,
    6,
    11,
    3,
    7,
    0,
    13,
    5,
    10,
    14,
    15,
    8,
    12,
    4,
    9,
    1,
    2,
    15,
    5,
    1,
    3,
    7,
    14,
    6,
    9,
    11,
    8,
    12,
    2,
    10,
    0,
    4,
    13,
    8,
    6,
    4,
    1,
    3,
    11,
    15,
    0,
    5,
    12,
    2,
    13,
    9,
    7,
    10,
    14,
    12,
    15,
    10,
    4,
    1,
    5,
    8,
    7,
    6,
    2,
    13,
    14,
    0,
    3,
    9,
    11
  ], F = [
    11,
    14,
    15,
    12,
    5,
    8,
    7,
    9,
    11,
    13,
    14,
    15,
    6,
    7,
    9,
    8,
    7,
    6,
    8,
    13,
    11,
    9,
    7,
    15,
    7,
    12,
    15,
    9,
    11,
    7,
    13,
    12,
    11,
    13,
    6,
    7,
    14,
    9,
    13,
    15,
    14,
    8,
    13,
    6,
    5,
    12,
    7,
    5,
    11,
    12,
    14,
    15,
    14,
    15,
    9,
    8,
    9,
    14,
    5,
    6,
    8,
    6,
    5,
    12,
    9,
    15,
    5,
    11,
    6,
    8,
    13,
    12,
    5,
    12,
    13,
    14,
    11,
    8,
    5,
    6
  ], l = [
    8,
    9,
    9,
    11,
    13,
    15,
    15,
    5,
    7,
    7,
    8,
    11,
    14,
    14,
    12,
    6,
    9,
    13,
    15,
    7,
    12,
    8,
    9,
    11,
    7,
    7,
    12,
    7,
    6,
    15,
    13,
    11,
    9,
    7,
    15,
    11,
    8,
    6,
    6,
    14,
    12,
    13,
    5,
    14,
    13,
    13,
    7,
    5,
    15,
    5,
    8,
    11,
    14,
    14,
    6,
    14,
    6,
    9,
    12,
    9,
    12,
    5,
    15,
    8,
    8,
    5,
    12,
    9,
    12,
    5,
    14,
    6,
    8,
    13,
    6,
    5,
    15,
    13,
    11,
    11
  ], U = [0, 1518500249, 1859775393, 2400959708, 2840853838], $ = [1352829926, 1548603684, 1836072691, 2053994217, 0];
  function D() {
    O.call(this, 64), this._a = 1732584193, this._b = 4023233417, this._c = 2562383102, this._d = 271733878, this._e = 3285377520;
  }
  c(D, O), D.prototype._update = function() {
    for (var ae = q, oe = 0; oe < 16; ++oe) ae[oe] = this._block.readInt32LE(oe * 4);
    for (var be = this._a | 0, de = this._b | 0, _e = this._c | 0, qe = this._d | 0, Te = this._e | 0, ce = this._a | 0, pe = this._b | 0, Me = this._c | 0, K = this._d | 0, ee = this._e | 0, e = 0; e < 80; e += 1) {
      var o, y;
      e < 16 ? (o = V(be, de, _e, qe, Te, ae[X[e]], U[0], F[e]), y = se(ce, pe, Me, K, ee, ae[t[e]], $[0], l[e])) : e < 32 ? (o = te(be, de, _e, qe, Te, ae[X[e]], U[1], F[e]), y = ne(ce, pe, Me, K, ee, ae[t[e]], $[1], l[e])) : e < 48 ? (o = ie(be, de, _e, qe, Te, ae[X[e]], U[2], F[e]), y = ie(ce, pe, Me, K, ee, ae[t[e]], $[2], l[e])) : e < 64 ? (o = ne(be, de, _e, qe, Te, ae[X[e]], U[3], F[e]), y = te(ce, pe, Me, K, ee, ae[t[e]], $[3], l[e])) : (o = se(be, de, _e, qe, Te, ae[X[e]], U[4], F[e]), y = V(ce, pe, Me, K, ee, ae[t[e]], $[4], l[e])), be = Te, Te = qe, qe = Q(_e, 10), _e = de, de = o, ce = ee, ee = K, K = Q(Me, 10), Me = pe, pe = y;
    }
    var H = this._b + _e + K | 0;
    this._b = this._c + qe + ee | 0, this._c = this._d + Te + ce | 0, this._d = this._e + be + pe | 0, this._e = this._a + de + Me | 0, this._a = H;
  }, D.prototype._digest = function() {
    this._block[this._blockOffset++] = 128, this._blockOffset > 56 && (this._block.fill(0, this._blockOffset, 64), this._update(), this._blockOffset = 0), this._block.fill(0, this._blockOffset, 56), this._block.writeUInt32LE(this._length[0], 56), this._block.writeUInt32LE(this._length[1], 60), this._update();
    var ae = P.alloc ? P.alloc(20) : new P(20);
    return ae.writeInt32LE(this._a, 0), ae.writeInt32LE(this._b, 4), ae.writeInt32LE(this._c, 8), ae.writeInt32LE(this._d, 12), ae.writeInt32LE(this._e, 16), ae;
  };
  function Q(ae, oe) {
    return ae << oe | ae >>> 32 - oe;
  }
  function V(ae, oe, be, de, _e, qe, Te, ce) {
    return Q(ae + (oe ^ be ^ de) + qe + Te | 0, ce) + _e | 0;
  }
  function te(ae, oe, be, de, _e, qe, Te, ce) {
    return Q(ae + (oe & be | ~oe & de) + qe + Te | 0, ce) + _e | 0;
  }
  function ie(ae, oe, be, de, _e, qe, Te, ce) {
    return Q(ae + ((oe | ~be) ^ de) + qe + Te | 0, ce) + _e | 0;
  }
  function ne(ae, oe, be, de, _e, qe, Te, ce) {
    return Q(ae + (oe & de | be & ~de) + qe + Te | 0, ce) + _e | 0;
  }
  function se(ae, oe, be, de, _e, qe, Te, ce) {
    return Q(ae + (oe ^ (be | ~de)) + qe + Te | 0, ce) + _e | 0;
  }
  return ripemd160 = D, ripemd160;
}
var sha_js = { exports: {} }, hash$1, hasRequiredHash$1;
function requireHash$1() {
  if (hasRequiredHash$1) return hash$1;
  hasRequiredHash$1 = 1;
  var P = requireSafeBuffer$1().Buffer;
  function c(O, q) {
    this._block = P.alloc(O), this._finalSize = q, this._blockSize = O, this._len = 0;
  }
  return c.prototype.update = function(O, q) {
    typeof O == "string" && (q = q || "utf8", O = P.from(O, q));
    for (var X = this._block, t = this._blockSize, F = O.length, l = this._len, U = 0; U < F; ) {
      for (var $ = l % t, D = Math.min(F - U, t - $), Q = 0; Q < D; Q++)
        X[$ + Q] = O[U + Q];
      l += D, U += D, l % t === 0 && this._update(X);
    }
    return this._len += F, this;
  }, c.prototype.digest = function(O) {
    var q = this._len % this._blockSize;
    this._block[q] = 128, this._block.fill(0, q + 1), q >= this._finalSize && (this._update(this._block), this._block.fill(0));
    var X = this._len * 8;
    if (X <= 4294967295)
      this._block.writeUInt32BE(X, this._blockSize - 4);
    else {
      var t = (X & 4294967295) >>> 0, F = (X - t) / 4294967296;
      this._block.writeUInt32BE(F, this._blockSize - 8), this._block.writeUInt32BE(t, this._blockSize - 4);
    }
    this._update(this._block);
    var l = this._hash();
    return O ? l.toString(O) : l;
  }, c.prototype._update = function() {
    throw new Error("_update must be implemented by subclass");
  }, hash$1 = c, hash$1;
}
var sha$1, hasRequiredSha$1;
function requireSha$1() {
  if (hasRequiredSha$1) return sha$1;
  hasRequiredSha$1 = 1;
  var P = requireInherits_browser(), c = requireHash$1(), O = requireSafeBuffer$1().Buffer, q = [
    1518500249,
    1859775393,
    -1894007588,
    -899497514
  ], X = new Array(80);
  function t() {
    this.init(), this._w = X, c.call(this, 64, 56);
  }
  P(t, c), t.prototype.init = function() {
    return this._a = 1732584193, this._b = 4023233417, this._c = 2562383102, this._d = 271733878, this._e = 3285377520, this;
  };
  function F($) {
    return $ << 5 | $ >>> 27;
  }
  function l($) {
    return $ << 30 | $ >>> 2;
  }
  function U($, D, Q, V) {
    return $ === 0 ? D & Q | ~D & V : $ === 2 ? D & Q | D & V | Q & V : D ^ Q ^ V;
  }
  return t.prototype._update = function($) {
    for (var D = this._w, Q = this._a | 0, V = this._b | 0, te = this._c | 0, ie = this._d | 0, ne = this._e | 0, se = 0; se < 16; ++se) D[se] = $.readInt32BE(se * 4);
    for (; se < 80; ++se) D[se] = D[se - 3] ^ D[se - 8] ^ D[se - 14] ^ D[se - 16];
    for (var ae = 0; ae < 80; ++ae) {
      var oe = ~~(ae / 20), be = F(Q) + U(oe, V, te, ie) + ne + D[ae] + q[oe] | 0;
      ne = ie, ie = te, te = l(V), V = Q, Q = be;
    }
    this._a = Q + this._a | 0, this._b = V + this._b | 0, this._c = te + this._c | 0, this._d = ie + this._d | 0, this._e = ne + this._e | 0;
  }, t.prototype._hash = function() {
    var $ = O.allocUnsafe(20);
    return $.writeInt32BE(this._a | 0, 0), $.writeInt32BE(this._b | 0, 4), $.writeInt32BE(this._c | 0, 8), $.writeInt32BE(this._d | 0, 12), $.writeInt32BE(this._e | 0, 16), $;
  }, sha$1 = t, sha$1;
}
var sha1, hasRequiredSha1;
function requireSha1() {
  if (hasRequiredSha1) return sha1;
  hasRequiredSha1 = 1;
  var P = requireInherits_browser(), c = requireHash$1(), O = requireSafeBuffer$1().Buffer, q = [
    1518500249,
    1859775393,
    -1894007588,
    -899497514
  ], X = new Array(80);
  function t() {
    this.init(), this._w = X, c.call(this, 64, 56);
  }
  P(t, c), t.prototype.init = function() {
    return this._a = 1732584193, this._b = 4023233417, this._c = 2562383102, this._d = 271733878, this._e = 3285377520, this;
  };
  function F(D) {
    return D << 1 | D >>> 31;
  }
  function l(D) {
    return D << 5 | D >>> 27;
  }
  function U(D) {
    return D << 30 | D >>> 2;
  }
  function $(D, Q, V, te) {
    return D === 0 ? Q & V | ~Q & te : D === 2 ? Q & V | Q & te | V & te : Q ^ V ^ te;
  }
  return t.prototype._update = function(D) {
    for (var Q = this._w, V = this._a | 0, te = this._b | 0, ie = this._c | 0, ne = this._d | 0, se = this._e | 0, ae = 0; ae < 16; ++ae) Q[ae] = D.readInt32BE(ae * 4);
    for (; ae < 80; ++ae) Q[ae] = F(Q[ae - 3] ^ Q[ae - 8] ^ Q[ae - 14] ^ Q[ae - 16]);
    for (var oe = 0; oe < 80; ++oe) {
      var be = ~~(oe / 20), de = l(V) + $(be, te, ie, ne) + se + Q[oe] + q[be] | 0;
      se = ne, ne = ie, ie = U(te), te = V, V = de;
    }
    this._a = V + this._a | 0, this._b = te + this._b | 0, this._c = ie + this._c | 0, this._d = ne + this._d | 0, this._e = se + this._e | 0;
  }, t.prototype._hash = function() {
    var D = O.allocUnsafe(20);
    return D.writeInt32BE(this._a | 0, 0), D.writeInt32BE(this._b | 0, 4), D.writeInt32BE(this._c | 0, 8), D.writeInt32BE(this._d | 0, 12), D.writeInt32BE(this._e | 0, 16), D;
  }, sha1 = t, sha1;
}
var sha256$1, hasRequiredSha256;
function requireSha256() {
  if (hasRequiredSha256) return sha256$1;
  hasRequiredSha256 = 1;
  var P = requireInherits_browser(), c = requireHash$1(), O = requireSafeBuffer$1().Buffer, q = [
    1116352408,
    1899447441,
    3049323471,
    3921009573,
    961987163,
    1508970993,
    2453635748,
    2870763221,
    3624381080,
    310598401,
    607225278,
    1426881987,
    1925078388,
    2162078206,
    2614888103,
    3248222580,
    3835390401,
    4022224774,
    264347078,
    604807628,
    770255983,
    1249150122,
    1555081692,
    1996064986,
    2554220882,
    2821834349,
    2952996808,
    3210313671,
    3336571891,
    3584528711,
    113926993,
    338241895,
    666307205,
    773529912,
    1294757372,
    1396182291,
    1695183700,
    1986661051,
    2177026350,
    2456956037,
    2730485921,
    2820302411,
    3259730800,
    3345764771,
    3516065817,
    3600352804,
    4094571909,
    275423344,
    430227734,
    506948616,
    659060556,
    883997877,
    958139571,
    1322822218,
    1537002063,
    1747873779,
    1955562222,
    2024104815,
    2227730452,
    2361852424,
    2428436474,
    2756734187,
    3204031479,
    3329325298
  ], X = new Array(64);
  function t() {
    this.init(), this._w = X, c.call(this, 64, 56);
  }
  P(t, c), t.prototype.init = function() {
    return this._a = 1779033703, this._b = 3144134277, this._c = 1013904242, this._d = 2773480762, this._e = 1359893119, this._f = 2600822924, this._g = 528734635, this._h = 1541459225, this;
  };
  function F(V, te, ie) {
    return ie ^ V & (te ^ ie);
  }
  function l(V, te, ie) {
    return V & te | ie & (V | te);
  }
  function U(V) {
    return (V >>> 2 | V << 30) ^ (V >>> 13 | V << 19) ^ (V >>> 22 | V << 10);
  }
  function $(V) {
    return (V >>> 6 | V << 26) ^ (V >>> 11 | V << 21) ^ (V >>> 25 | V << 7);
  }
  function D(V) {
    return (V >>> 7 | V << 25) ^ (V >>> 18 | V << 14) ^ V >>> 3;
  }
  function Q(V) {
    return (V >>> 17 | V << 15) ^ (V >>> 19 | V << 13) ^ V >>> 10;
  }
  return t.prototype._update = function(V) {
    for (var te = this._w, ie = this._a | 0, ne = this._b | 0, se = this._c | 0, ae = this._d | 0, oe = this._e | 0, be = this._f | 0, de = this._g | 0, _e = this._h | 0, qe = 0; qe < 16; ++qe) te[qe] = V.readInt32BE(qe * 4);
    for (; qe < 64; ++qe) te[qe] = Q(te[qe - 2]) + te[qe - 7] + D(te[qe - 15]) + te[qe - 16] | 0;
    for (var Te = 0; Te < 64; ++Te) {
      var ce = _e + $(oe) + F(oe, be, de) + q[Te] + te[Te] | 0, pe = U(ie) + l(ie, ne, se) | 0;
      _e = de, de = be, be = oe, oe = ae + ce | 0, ae = se, se = ne, ne = ie, ie = ce + pe | 0;
    }
    this._a = ie + this._a | 0, this._b = ne + this._b | 0, this._c = se + this._c | 0, this._d = ae + this._d | 0, this._e = oe + this._e | 0, this._f = be + this._f | 0, this._g = de + this._g | 0, this._h = _e + this._h | 0;
  }, t.prototype._hash = function() {
    var V = O.allocUnsafe(32);
    return V.writeInt32BE(this._a, 0), V.writeInt32BE(this._b, 4), V.writeInt32BE(this._c, 8), V.writeInt32BE(this._d, 12), V.writeInt32BE(this._e, 16), V.writeInt32BE(this._f, 20), V.writeInt32BE(this._g, 24), V.writeInt32BE(this._h, 28), V;
  }, sha256$1 = t, sha256$1;
}
var sha224$1, hasRequiredSha224;
function requireSha224() {
  if (hasRequiredSha224) return sha224$1;
  hasRequiredSha224 = 1;
  var P = requireInherits_browser(), c = requireSha256(), O = requireHash$1(), q = requireSafeBuffer$1().Buffer, X = new Array(64);
  function t() {
    this.init(), this._w = X, O.call(this, 64, 56);
  }
  return P(t, c), t.prototype.init = function() {
    return this._a = 3238371032, this._b = 914150663, this._c = 812702999, this._d = 4144912697, this._e = 4290775857, this._f = 1750603025, this._g = 1694076839, this._h = 3204075428, this;
  }, t.prototype._hash = function() {
    var F = q.allocUnsafe(28);
    return F.writeInt32BE(this._a, 0), F.writeInt32BE(this._b, 4), F.writeInt32BE(this._c, 8), F.writeInt32BE(this._d, 12), F.writeInt32BE(this._e, 16), F.writeInt32BE(this._f, 20), F.writeInt32BE(this._g, 24), F;
  }, sha224$1 = t, sha224$1;
}
var sha512$1, hasRequiredSha512;
function requireSha512() {
  if (hasRequiredSha512) return sha512$1;
  hasRequiredSha512 = 1;
  var P = requireInherits_browser(), c = requireHash$1(), O = requireSafeBuffer$1().Buffer, q = [
    1116352408,
    3609767458,
    1899447441,
    602891725,
    3049323471,
    3964484399,
    3921009573,
    2173295548,
    961987163,
    4081628472,
    1508970993,
    3053834265,
    2453635748,
    2937671579,
    2870763221,
    3664609560,
    3624381080,
    2734883394,
    310598401,
    1164996542,
    607225278,
    1323610764,
    1426881987,
    3590304994,
    1925078388,
    4068182383,
    2162078206,
    991336113,
    2614888103,
    633803317,
    3248222580,
    3479774868,
    3835390401,
    2666613458,
    4022224774,
    944711139,
    264347078,
    2341262773,
    604807628,
    2007800933,
    770255983,
    1495990901,
    1249150122,
    1856431235,
    1555081692,
    3175218132,
    1996064986,
    2198950837,
    2554220882,
    3999719339,
    2821834349,
    766784016,
    2952996808,
    2566594879,
    3210313671,
    3203337956,
    3336571891,
    1034457026,
    3584528711,
    2466948901,
    113926993,
    3758326383,
    338241895,
    168717936,
    666307205,
    1188179964,
    773529912,
    1546045734,
    1294757372,
    1522805485,
    1396182291,
    2643833823,
    1695183700,
    2343527390,
    1986661051,
    1014477480,
    2177026350,
    1206759142,
    2456956037,
    344077627,
    2730485921,
    1290863460,
    2820302411,
    3158454273,
    3259730800,
    3505952657,
    3345764771,
    106217008,
    3516065817,
    3606008344,
    3600352804,
    1432725776,
    4094571909,
    1467031594,
    275423344,
    851169720,
    430227734,
    3100823752,
    506948616,
    1363258195,
    659060556,
    3750685593,
    883997877,
    3785050280,
    958139571,
    3318307427,
    1322822218,
    3812723403,
    1537002063,
    2003034995,
    1747873779,
    3602036899,
    1955562222,
    1575990012,
    2024104815,
    1125592928,
    2227730452,
    2716904306,
    2361852424,
    442776044,
    2428436474,
    593698344,
    2756734187,
    3733110249,
    3204031479,
    2999351573,
    3329325298,
    3815920427,
    3391569614,
    3928383900,
    3515267271,
    566280711,
    3940187606,
    3454069534,
    4118630271,
    4000239992,
    116418474,
    1914138554,
    174292421,
    2731055270,
    289380356,
    3203993006,
    460393269,
    320620315,
    685471733,
    587496836,
    852142971,
    1086792851,
    1017036298,
    365543100,
    1126000580,
    2618297676,
    1288033470,
    3409855158,
    1501505948,
    4234509866,
    1607167915,
    987167468,
    1816402316,
    1246189591
  ], X = new Array(160);
  function t() {
    this.init(), this._w = X, c.call(this, 128, 112);
  }
  P(t, c), t.prototype.init = function() {
    return this._ah = 1779033703, this._bh = 3144134277, this._ch = 1013904242, this._dh = 2773480762, this._eh = 1359893119, this._fh = 2600822924, this._gh = 528734635, this._hh = 1541459225, this._al = 4089235720, this._bl = 2227873595, this._cl = 4271175723, this._dl = 1595750129, this._el = 2917565137, this._fl = 725511199, this._gl = 4215389547, this._hl = 327033209, this;
  };
  function F(ne, se, ae) {
    return ae ^ ne & (se ^ ae);
  }
  function l(ne, se, ae) {
    return ne & se | ae & (ne | se);
  }
  function U(ne, se) {
    return (ne >>> 28 | se << 4) ^ (se >>> 2 | ne << 30) ^ (se >>> 7 | ne << 25);
  }
  function $(ne, se) {
    return (ne >>> 14 | se << 18) ^ (ne >>> 18 | se << 14) ^ (se >>> 9 | ne << 23);
  }
  function D(ne, se) {
    return (ne >>> 1 | se << 31) ^ (ne >>> 8 | se << 24) ^ ne >>> 7;
  }
  function Q(ne, se) {
    return (ne >>> 1 | se << 31) ^ (ne >>> 8 | se << 24) ^ (ne >>> 7 | se << 25);
  }
  function V(ne, se) {
    return (ne >>> 19 | se << 13) ^ (se >>> 29 | ne << 3) ^ ne >>> 6;
  }
  function te(ne, se) {
    return (ne >>> 19 | se << 13) ^ (se >>> 29 | ne << 3) ^ (ne >>> 6 | se << 26);
  }
  function ie(ne, se) {
    return ne >>> 0 < se >>> 0 ? 1 : 0;
  }
  return t.prototype._update = function(ne) {
    for (var se = this._w, ae = this._ah | 0, oe = this._bh | 0, be = this._ch | 0, de = this._dh | 0, _e = this._eh | 0, qe = this._fh | 0, Te = this._gh | 0, ce = this._hh | 0, pe = this._al | 0, Me = this._bl | 0, K = this._cl | 0, ee = this._dl | 0, e = this._el | 0, o = this._fl | 0, y = this._gl | 0, H = this._hl | 0, z = 0; z < 32; z += 2)
      se[z] = ne.readInt32BE(z * 4), se[z + 1] = ne.readInt32BE(z * 4 + 4);
    for (; z < 160; z += 2) {
      var B = se[z - 30], w = se[z - 15 * 2 + 1], G = D(B, w), g = Q(w, B);
      B = se[z - 2 * 2], w = se[z - 2 * 2 + 1];
      var J = V(B, w), le = te(w, B), ge = se[z - 7 * 2], Se = se[z - 7 * 2 + 1], ye = se[z - 16 * 2], fe = se[z - 16 * 2 + 1], he = g + Se | 0, Re = G + ge + ie(he, g) | 0;
      he = he + le | 0, Re = Re + J + ie(he, le) | 0, he = he + fe | 0, Re = Re + ye + ie(he, fe) | 0, se[z] = Re, se[z + 1] = he;
    }
    for (var ke = 0; ke < 160; ke += 2) {
      Re = se[ke], he = se[ke + 1];
      var me = l(ae, oe, be), ve = l(pe, Me, K), Ae = U(ae, pe), $e = U(pe, ae), Oe = $(_e, e), Y = $(e, _e), Z = q[ke], re = q[ke + 1], ue = F(_e, qe, Te), we = F(e, o, y), Ee = H + Y | 0, Ie = ce + Oe + ie(Ee, H) | 0;
      Ee = Ee + we | 0, Ie = Ie + ue + ie(Ee, we) | 0, Ee = Ee + re | 0, Ie = Ie + Z + ie(Ee, re) | 0, Ee = Ee + he | 0, Ie = Ie + Re + ie(Ee, he) | 0;
      var xe = $e + ve | 0, Le = Ae + me + ie(xe, $e) | 0;
      ce = Te, H = y, Te = qe, y = o, qe = _e, o = e, e = ee + Ee | 0, _e = de + Ie + ie(e, ee) | 0, de = be, ee = K, be = oe, K = Me, oe = ae, Me = pe, pe = Ee + xe | 0, ae = Ie + Le + ie(pe, Ee) | 0;
    }
    this._al = this._al + pe | 0, this._bl = this._bl + Me | 0, this._cl = this._cl + K | 0, this._dl = this._dl + ee | 0, this._el = this._el + e | 0, this._fl = this._fl + o | 0, this._gl = this._gl + y | 0, this._hl = this._hl + H | 0, this._ah = this._ah + ae + ie(this._al, pe) | 0, this._bh = this._bh + oe + ie(this._bl, Me) | 0, this._ch = this._ch + be + ie(this._cl, K) | 0, this._dh = this._dh + de + ie(this._dl, ee) | 0, this._eh = this._eh + _e + ie(this._el, e) | 0, this._fh = this._fh + qe + ie(this._fl, o) | 0, this._gh = this._gh + Te + ie(this._gl, y) | 0, this._hh = this._hh + ce + ie(this._hl, H) | 0;
  }, t.prototype._hash = function() {
    var ne = O.allocUnsafe(64);
    function se(ae, oe, be) {
      ne.writeInt32BE(ae, be), ne.writeInt32BE(oe, be + 4);
    }
    return se(this._ah, this._al, 0), se(this._bh, this._bl, 8), se(this._ch, this._cl, 16), se(this._dh, this._dl, 24), se(this._eh, this._el, 32), se(this._fh, this._fl, 40), se(this._gh, this._gl, 48), se(this._hh, this._hl, 56), ne;
  }, sha512$1 = t, sha512$1;
}
var sha384$1, hasRequiredSha384;
function requireSha384() {
  if (hasRequiredSha384) return sha384$1;
  hasRequiredSha384 = 1;
  var P = requireInherits_browser(), c = requireSha512(), O = requireHash$1(), q = requireSafeBuffer$1().Buffer, X = new Array(160);
  function t() {
    this.init(), this._w = X, O.call(this, 128, 112);
  }
  return P(t, c), t.prototype.init = function() {
    return this._ah = 3418070365, this._bh = 1654270250, this._ch = 2438529370, this._dh = 355462360, this._eh = 1731405415, this._fh = 2394180231, this._gh = 3675008525, this._hh = 1203062813, this._al = 3238371032, this._bl = 914150663, this._cl = 812702999, this._dl = 4144912697, this._el = 4290775857, this._fl = 1750603025, this._gl = 1694076839, this._hl = 3204075428, this;
  }, t.prototype._hash = function() {
    var F = q.allocUnsafe(48);
    function l(U, $, D) {
      F.writeInt32BE(U, D), F.writeInt32BE($, D + 4);
    }
    return l(this._ah, this._al, 0), l(this._bh, this._bl, 8), l(this._ch, this._cl, 16), l(this._dh, this._dl, 24), l(this._eh, this._el, 32), l(this._fh, this._fl, 40), F;
  }, sha384$1 = t, sha384$1;
}
var hasRequiredSha_js;
function requireSha_js() {
  if (hasRequiredSha_js) return sha_js.exports;
  hasRequiredSha_js = 1;
  var P = sha_js.exports = function(c) {
    c = c.toLowerCase();
    var O = P[c];
    if (!O) throw new Error(c + " is not supported (we accept pull requests)");
    return new O();
  };
  return P.sha = requireSha$1(), P.sha1 = requireSha1(), P.sha224 = requireSha224(), P.sha256 = requireSha256(), P.sha384 = requireSha384(), P.sha512 = requireSha512(), sha_js.exports;
}
var streamBrowserify, hasRequiredStreamBrowserify;
function requireStreamBrowserify() {
  if (hasRequiredStreamBrowserify) return streamBrowserify;
  hasRequiredStreamBrowserify = 1, streamBrowserify = O;
  var P = requireEvents().EventEmitter, c = requireInherits_browser();
  c(O, P), O.Readable = require_stream_readable$1(), O.Writable = require_stream_writable$1(), O.Duplex = require_stream_duplex$1(), O.Transform = require_stream_transform$1(), O.PassThrough = require_stream_passthrough$1(), O.finished = requireEndOfStream(), O.pipeline = requirePipeline(), O.Stream = O;
  function O() {
    P.call(this);
  }
  return O.prototype.pipe = function(q, X) {
    var t = this;
    function F(te) {
      q.writable && q.write(te) === !1 && t.pause && t.pause();
    }
    t.on("data", F);
    function l() {
      t.readable && t.resume && t.resume();
    }
    q.on("drain", l), !q._isStdio && (!X || X.end !== !1) && (t.on("end", $), t.on("close", D));
    var U = !1;
    function $() {
      U || (U = !0, q.end());
    }
    function D() {
      U || (U = !0, typeof q.destroy == "function" && q.destroy());
    }
    function Q(te) {
      if (V(), P.listenerCount(this, "error") === 0)
        throw te;
    }
    t.on("error", Q), q.on("error", Q);
    function V() {
      t.removeListener("data", F), q.removeListener("drain", l), t.removeListener("end", $), t.removeListener("close", D), t.removeListener("error", Q), q.removeListener("error", Q), t.removeListener("end", V), t.removeListener("close", V), q.removeListener("close", V);
    }
    return t.on("end", V), t.on("close", V), q.on("close", V), q.emit("pipe", t), q;
  }, streamBrowserify;
}
var cipherBase, hasRequiredCipherBase;
function requireCipherBase() {
  if (hasRequiredCipherBase) return cipherBase;
  hasRequiredCipherBase = 1;
  var P = requireSafeBuffer$1().Buffer, c = requireStreamBrowserify().Transform, O = requireString_decoder().StringDecoder, q = requireInherits_browser();
  function X(t) {
    c.call(this), this.hashMode = typeof t == "string", this.hashMode ? this[t] = this._finalOrDigest : this.final = this._finalOrDigest, this._final && (this.__final = this._final, this._final = null), this._decoder = null, this._encoding = null;
  }
  return q(X, c), X.prototype.update = function(t, F, l) {
    typeof t == "string" && (t = P.from(t, F));
    var U = this._update(t);
    return this.hashMode ? this : (l && (U = this._toString(U, l)), U);
  }, X.prototype.setAutoPadding = function() {
  }, X.prototype.getAuthTag = function() {
    throw new Error("trying to get auth tag in unsupported state");
  }, X.prototype.setAuthTag = function() {
    throw new Error("trying to set auth tag in unsupported state");
  }, X.prototype.setAAD = function() {
    throw new Error("trying to set aad in unsupported state");
  }, X.prototype._transform = function(t, F, l) {
    var U;
    try {
      this.hashMode ? this._update(t) : this.push(this._update(t));
    } catch ($) {
      U = $;
    } finally {
      l(U);
    }
  }, X.prototype._flush = function(t) {
    var F;
    try {
      this.push(this.__final());
    } catch (l) {
      F = l;
    }
    t(F);
  }, X.prototype._finalOrDigest = function(t) {
    var F = this.__final() || P.alloc(0);
    return t && (F = this._toString(F, t, !0)), F;
  }, X.prototype._toString = function(t, F, l) {
    if (this._decoder || (this._decoder = new O(F), this._encoding = F), this._encoding !== F) throw new Error("can't switch encodings");
    var U = this._decoder.write(t);
    return l && (U += this._decoder.end()), U;
  }, cipherBase = X, cipherBase;
}
var browser$9, hasRequiredBrowser$9;
function requireBrowser$9() {
  if (hasRequiredBrowser$9) return browser$9;
  hasRequiredBrowser$9 = 1;
  var P = requireInherits_browser(), c = requireMd5_js(), O = requireRipemd160(), q = requireSha_js(), X = requireCipherBase();
  function t(F) {
    X.call(this, "digest"), this._hash = F;
  }
  return P(t, X), t.prototype._update = function(F) {
    this._hash.update(F);
  }, t.prototype._final = function() {
    return this._hash.digest();
  }, browser$9 = function(F) {
    return F = F.toLowerCase(), F === "md5" ? new c() : F === "rmd160" || F === "ripemd160" ? new O() : new t(q(F));
  }, browser$9;
}
var legacy, hasRequiredLegacy;
function requireLegacy() {
  if (hasRequiredLegacy) return legacy;
  hasRequiredLegacy = 1;
  var P = requireInherits_browser(), c = requireSafeBuffer$1().Buffer, O = requireCipherBase(), q = c.alloc(128), X = 64;
  function t(F, l) {
    O.call(this, "digest"), typeof l == "string" && (l = c.from(l)), this._alg = F, this._key = l, l.length > X ? l = F(l) : l.length < X && (l = c.concat([l, q], X));
    for (var U = this._ipad = c.allocUnsafe(X), $ = this._opad = c.allocUnsafe(X), D = 0; D < X; D++)
      U[D] = l[D] ^ 54, $[D] = l[D] ^ 92;
    this._hash = [U];
  }
  return P(t, O), t.prototype._update = function(F) {
    this._hash.push(F);
  }, t.prototype._final = function() {
    var F = this._alg(c.concat(this._hash));
    return this._alg(c.concat([this._opad, F]));
  }, legacy = t, legacy;
}
var md5, hasRequiredMd5;
function requireMd5() {
  if (hasRequiredMd5) return md5;
  hasRequiredMd5 = 1;
  var P = requireMd5_js();
  return md5 = function(c) {
    return new P().update(c).digest();
  }, md5;
}
var browser$8, hasRequiredBrowser$8;
function requireBrowser$8() {
  if (hasRequiredBrowser$8) return browser$8;
  hasRequiredBrowser$8 = 1;
  var P = requireInherits_browser(), c = requireLegacy(), O = requireCipherBase(), q = requireSafeBuffer$1().Buffer, X = requireMd5(), t = requireRipemd160(), F = requireSha_js(), l = q.alloc(128);
  function U($, D) {
    O.call(this, "digest"), typeof D == "string" && (D = q.from(D));
    var Q = $ === "sha512" || $ === "sha384" ? 128 : 64;
    if (this._alg = $, this._key = D, D.length > Q) {
      var V = $ === "rmd160" ? new t() : F($);
      D = V.update(D).digest();
    } else D.length < Q && (D = q.concat([D, l], Q));
    for (var te = this._ipad = q.allocUnsafe(Q), ie = this._opad = q.allocUnsafe(Q), ne = 0; ne < Q; ne++)
      te[ne] = D[ne] ^ 54, ie[ne] = D[ne] ^ 92;
    this._hash = $ === "rmd160" ? new t() : F($), this._hash.update(te);
  }
  return P(U, O), U.prototype._update = function($) {
    this._hash.update($);
  }, U.prototype._final = function() {
    var $ = this._hash.digest(), D = this._alg === "rmd160" ? new t() : F(this._alg);
    return D.update(this._opad).update($).digest();
  }, browser$8 = function($, D) {
    return $ = $.toLowerCase(), $ === "rmd160" || $ === "ripemd160" ? new U("rmd160", D) : $ === "md5" ? new c(X, D) : new U($, D);
  }, browser$8;
}
const sha224WithRSAEncryption = {
  sign: "rsa",
  hash: "sha224",
  id: "302d300d06096086480165030402040500041c"
}, sha256WithRSAEncryption = {
  sign: "rsa",
  hash: "sha256",
  id: "3031300d060960864801650304020105000420"
}, sha384WithRSAEncryption = {
  sign: "rsa",
  hash: "sha384",
  id: "3041300d060960864801650304020205000430"
}, sha512WithRSAEncryption = {
  sign: "rsa",
  hash: "sha512",
  id: "3051300d060960864801650304020305000440"
}, sha256 = {
  sign: "ecdsa",
  hash: "sha256",
  id: ""
}, sha224 = {
  sign: "ecdsa",
  hash: "sha224",
  id: ""
}, sha384 = {
  sign: "ecdsa",
  hash: "sha384",
  id: ""
}, sha512 = {
  sign: "ecdsa",
  hash: "sha512",
  id: ""
}, DSA = {
  sign: "dsa",
  hash: "sha1",
  id: ""
}, ripemd160WithRSA = {
  sign: "rsa",
  hash: "rmd160",
  id: "3021300906052b2403020105000414"
}, md5WithRSAEncryption = {
  sign: "rsa",
  hash: "md5",
  id: "3020300c06082a864886f70d020505000410"
}, require$$6 = {
  sha224WithRSAEncryption,
  "RSA-SHA224": {
    sign: "ecdsa/rsa",
    hash: "sha224",
    id: "302d300d06096086480165030402040500041c"
  },
  sha256WithRSAEncryption,
  "RSA-SHA256": {
    sign: "ecdsa/rsa",
    hash: "sha256",
    id: "3031300d060960864801650304020105000420"
  },
  sha384WithRSAEncryption,
  "RSA-SHA384": {
    sign: "ecdsa/rsa",
    hash: "sha384",
    id: "3041300d060960864801650304020205000430"
  },
  sha512WithRSAEncryption,
  "RSA-SHA512": {
    sign: "ecdsa/rsa",
    hash: "sha512",
    id: "3051300d060960864801650304020305000440"
  },
  "RSA-SHA1": {
    sign: "rsa",
    hash: "sha1",
    id: "3021300906052b0e03021a05000414"
  },
  "ecdsa-with-SHA1": {
    sign: "ecdsa",
    hash: "sha1",
    id: ""
  },
  sha256,
  sha224,
  sha384,
  sha512,
  "DSA-SHA": {
    sign: "dsa",
    hash: "sha1",
    id: ""
  },
  "DSA-SHA1": {
    sign: "dsa",
    hash: "sha1",
    id: ""
  },
  DSA,
  "DSA-WITH-SHA224": {
    sign: "dsa",
    hash: "sha224",
    id: ""
  },
  "DSA-SHA224": {
    sign: "dsa",
    hash: "sha224",
    id: ""
  },
  "DSA-WITH-SHA256": {
    sign: "dsa",
    hash: "sha256",
    id: ""
  },
  "DSA-SHA256": {
    sign: "dsa",
    hash: "sha256",
    id: ""
  },
  "DSA-WITH-SHA384": {
    sign: "dsa",
    hash: "sha384",
    id: ""
  },
  "DSA-SHA384": {
    sign: "dsa",
    hash: "sha384",
    id: ""
  },
  "DSA-WITH-SHA512": {
    sign: "dsa",
    hash: "sha512",
    id: ""
  },
  "DSA-SHA512": {
    sign: "dsa",
    hash: "sha512",
    id: ""
  },
  "DSA-RIPEMD160": {
    sign: "dsa",
    hash: "rmd160",
    id: ""
  },
  ripemd160WithRSA,
  "RSA-RIPEMD160": {
    sign: "rsa",
    hash: "rmd160",
    id: "3021300906052b2403020105000414"
  },
  md5WithRSAEncryption,
  "RSA-MD5": {
    sign: "rsa",
    hash: "md5",
    id: "3020300c06082a864886f70d020505000410"
  }
};
var algos, hasRequiredAlgos;
function requireAlgos() {
  return hasRequiredAlgos || (hasRequiredAlgos = 1, algos = require$$6), algos;
}
var browser$7 = {}, precondition, hasRequiredPrecondition;
function requirePrecondition() {
  if (hasRequiredPrecondition) return precondition;
  hasRequiredPrecondition = 1;
  var P = Math.pow(2, 30) - 1;
  return precondition = function(c, O) {
    if (typeof c != "number")
      throw new TypeError("Iterations not a number");
    if (c < 0)
      throw new TypeError("Bad iterations");
    if (typeof O != "number")
      throw new TypeError("Key length not a number");
    if (O < 0 || O > P || O !== O)
      throw new TypeError("Bad key length");
  }, precondition;
}
var defaultEncoding_1, hasRequiredDefaultEncoding;
function requireDefaultEncoding() {
  if (hasRequiredDefaultEncoding) return defaultEncoding_1;
  hasRequiredDefaultEncoding = 1;
  var P;
  if (commonjsGlobal.process && commonjsGlobal.process.browser)
    P = "utf-8";
  else if (commonjsGlobal.process && commonjsGlobal.process.version) {
    var c = parseInt(process$1.version.split(".")[0].slice(1), 10);
    P = c >= 6 ? "utf-8" : "binary";
  } else
    P = "utf-8";
  return defaultEncoding_1 = P, defaultEncoding_1;
}
var toBuffer, hasRequiredToBuffer;
function requireToBuffer() {
  if (hasRequiredToBuffer) return toBuffer;
  hasRequiredToBuffer = 1;
  var P = requireSafeBuffer$1().Buffer;
  return toBuffer = function(c, O, q) {
    if (P.isBuffer(c))
      return c;
    if (typeof c == "string")
      return P.from(c, O);
    if (ArrayBuffer.isView(c))
      return P.from(c.buffer);
    throw new TypeError(q + " must be a string, a Buffer, a typed array or a DataView");
  }, toBuffer;
}
var syncBrowser, hasRequiredSyncBrowser;
function requireSyncBrowser() {
  if (hasRequiredSyncBrowser) return syncBrowser;
  hasRequiredSyncBrowser = 1;
  var P = requireMd5(), c = requireRipemd160(), O = requireSha_js(), q = requireSafeBuffer$1().Buffer, X = requirePrecondition(), t = requireDefaultEncoding(), F = requireToBuffer(), l = q.alloc(128), U = {
    md5: 16,
    sha1: 20,
    sha224: 28,
    sha256: 32,
    sha384: 48,
    sha512: 64,
    rmd160: 20,
    ripemd160: 20
  };
  function $(V, te, ie) {
    var ne = D(V), se = V === "sha512" || V === "sha384" ? 128 : 64;
    te.length > se ? te = ne(te) : te.length < se && (te = q.concat([te, l], se));
    for (var ae = q.allocUnsafe(se + U[V]), oe = q.allocUnsafe(se + U[V]), be = 0; be < se; be++)
      ae[be] = te[be] ^ 54, oe[be] = te[be] ^ 92;
    var de = q.allocUnsafe(se + ie + 4);
    ae.copy(de, 0, 0, se), this.ipad1 = de, this.ipad2 = ae, this.opad = oe, this.alg = V, this.blocksize = se, this.hash = ne, this.size = U[V];
  }
  $.prototype.run = function(V, te) {
    V.copy(te, this.blocksize);
    var ie = this.hash(te);
    return ie.copy(this.opad, this.blocksize), this.hash(this.opad);
  };
  function D(V) {
    function te(ne) {
      return O(V).update(ne).digest();
    }
    function ie(ne) {
      return new c().update(ne).digest();
    }
    return V === "rmd160" || V === "ripemd160" ? ie : V === "md5" ? P : te;
  }
  function Q(V, te, ie, ne, se) {
    X(ie, ne), V = F(V, t, "Password"), te = F(te, t, "Salt"), se = se || "sha1";
    var ae = new $(se, V, te.length), oe = q.allocUnsafe(ne), be = q.allocUnsafe(te.length + 4);
    te.copy(be, 0, 0, te.length);
    for (var de = 0, _e = U[se], qe = Math.ceil(ne / _e), Te = 1; Te <= qe; Te++) {
      be.writeUInt32BE(Te, te.length);
      for (var ce = ae.run(be, ae.ipad1), pe = ce, Me = 1; Me < ie; Me++) {
        pe = ae.run(pe, ae.ipad2);
        for (var K = 0; K < _e; K++) ce[K] ^= pe[K];
      }
      ce.copy(oe, de), de += _e;
    }
    return oe;
  }
  return syncBrowser = Q, syncBrowser;
}
var async, hasRequiredAsync;
function requireAsync() {
  if (hasRequiredAsync) return async;
  hasRequiredAsync = 1;
  var P = requireSafeBuffer$1().Buffer, c = requirePrecondition(), O = requireDefaultEncoding(), q = requireSyncBrowser(), X = requireToBuffer(), t, F = commonjsGlobal.crypto && commonjsGlobal.crypto.subtle, l = {
    sha: "SHA-1",
    "sha-1": "SHA-1",
    sha1: "SHA-1",
    sha256: "SHA-256",
    "sha-256": "SHA-256",
    sha384: "SHA-384",
    "sha-384": "SHA-384",
    "sha-512": "SHA-512",
    sha512: "SHA-512"
  }, U = [];
  function $(ie) {
    if (commonjsGlobal.process && !commonjsGlobal.process.browser || !F || !F.importKey || !F.deriveBits)
      return Promise.resolve(!1);
    if (U[ie] !== void 0)
      return U[ie];
    t = t || P.alloc(8);
    var ne = V(t, t, 10, 128, ie).then(function() {
      return !0;
    }).catch(function() {
      return !1;
    });
    return U[ie] = ne, ne;
  }
  var D;
  function Q() {
    return D || (commonjsGlobal.process && commonjsGlobal.process.nextTick ? D = commonjsGlobal.process.nextTick : commonjsGlobal.queueMicrotask ? D = commonjsGlobal.queueMicrotask : commonjsGlobal.setImmediate ? D = commonjsGlobal.setImmediate : D = commonjsGlobal.setTimeout, D);
  }
  function V(ie, ne, se, ae, oe) {
    return F.importKey(
      "raw",
      ie,
      { name: "PBKDF2" },
      !1,
      ["deriveBits"]
    ).then(function(be) {
      return F.deriveBits({
        name: "PBKDF2",
        salt: ne,
        iterations: se,
        hash: {
          name: oe
        }
      }, be, ae << 3);
    }).then(function(be) {
      return P.from(be);
    });
  }
  function te(ie, ne) {
    ie.then(function(se) {
      Q()(function() {
        ne(null, se);
      });
    }, function(se) {
      Q()(function() {
        ne(se);
      });
    });
  }
  return async = function(ie, ne, se, ae, oe, be) {
    typeof oe == "function" && (be = oe, oe = void 0), oe = oe || "sha1";
    var de = l[oe.toLowerCase()];
    if (!de || typeof commonjsGlobal.Promise != "function") {
      Q()(function() {
        var _e;
        try {
          _e = q(ie, ne, se, ae, oe);
        } catch (qe) {
          return be(qe);
        }
        be(null, _e);
      });
      return;
    }
    if (c(se, ae), ie = X(ie, O, "Password"), ne = X(ne, O, "Salt"), typeof be != "function") throw new Error("No callback provided to pbkdf2");
    te($(de).then(function(_e) {
      return _e ? V(ie, ne, se, ae, de) : q(ie, ne, se, ae, oe);
    }), be);
  }, async;
}
var hasRequiredBrowser$7;
function requireBrowser$7() {
  return hasRequiredBrowser$7 || (hasRequiredBrowser$7 = 1, browser$7.pbkdf2 = requireAsync(), browser$7.pbkdf2Sync = requireSyncBrowser()), browser$7;
}
var browser$6 = {}, des$1 = {}, utils$3 = {}, hasRequiredUtils$3;
function requireUtils$3() {
  if (hasRequiredUtils$3) return utils$3;
  hasRequiredUtils$3 = 1, utils$3.readUInt32BE = function(q, X) {
    var t = q[0 + X] << 24 | q[1 + X] << 16 | q[2 + X] << 8 | q[3 + X];
    return t >>> 0;
  }, utils$3.writeUInt32BE = function(q, X, t) {
    q[0 + t] = X >>> 24, q[1 + t] = X >>> 16 & 255, q[2 + t] = X >>> 8 & 255, q[3 + t] = X & 255;
  }, utils$3.ip = function(q, X, t, F) {
    for (var l = 0, U = 0, $ = 6; $ >= 0; $ -= 2) {
      for (var D = 0; D <= 24; D += 8)
        l <<= 1, l |= X >>> D + $ & 1;
      for (var D = 0; D <= 24; D += 8)
        l <<= 1, l |= q >>> D + $ & 1;
    }
    for (var $ = 6; $ >= 0; $ -= 2) {
      for (var D = 1; D <= 25; D += 8)
        U <<= 1, U |= X >>> D + $ & 1;
      for (var D = 1; D <= 25; D += 8)
        U <<= 1, U |= q >>> D + $ & 1;
    }
    t[F + 0] = l >>> 0, t[F + 1] = U >>> 0;
  }, utils$3.rip = function(q, X, t, F) {
    for (var l = 0, U = 0, $ = 0; $ < 4; $++)
      for (var D = 24; D >= 0; D -= 8)
        l <<= 1, l |= X >>> D + $ & 1, l <<= 1, l |= q >>> D + $ & 1;
    for (var $ = 4; $ < 8; $++)
      for (var D = 24; D >= 0; D -= 8)
        U <<= 1, U |= X >>> D + $ & 1, U <<= 1, U |= q >>> D + $ & 1;
    t[F + 0] = l >>> 0, t[F + 1] = U >>> 0;
  }, utils$3.pc1 = function(q, X, t, F) {
    for (var l = 0, U = 0, $ = 7; $ >= 5; $--) {
      for (var D = 0; D <= 24; D += 8)
        l <<= 1, l |= X >> D + $ & 1;
      for (var D = 0; D <= 24; D += 8)
        l <<= 1, l |= q >> D + $ & 1;
    }
    for (var D = 0; D <= 24; D += 8)
      l <<= 1, l |= X >> D + $ & 1;
    for (var $ = 1; $ <= 3; $++) {
      for (var D = 0; D <= 24; D += 8)
        U <<= 1, U |= X >> D + $ & 1;
      for (var D = 0; D <= 24; D += 8)
        U <<= 1, U |= q >> D + $ & 1;
    }
    for (var D = 0; D <= 24; D += 8)
      U <<= 1, U |= q >> D + $ & 1;
    t[F + 0] = l >>> 0, t[F + 1] = U >>> 0;
  }, utils$3.r28shl = function(q, X) {
    return q << X & 268435455 | q >>> 28 - X;
  };
  var P = [
    // inL => outL
    14,
    11,
    17,
    4,
    27,
    23,
    25,
    0,
    13,
    22,
    7,
    18,
    5,
    9,
    16,
    24,
    2,
    20,
    12,
    21,
    1,
    8,
    15,
    26,
    // inR => outR
    15,
    4,
    25,
    19,
    9,
    1,
    26,
    16,
    5,
    11,
    23,
    8,
    12,
    7,
    17,
    0,
    22,
    3,
    10,
    14,
    6,
    20,
    27,
    24
  ];
  utils$3.pc2 = function(q, X, t, F) {
    for (var l = 0, U = 0, $ = P.length >>> 1, D = 0; D < $; D++)
      l <<= 1, l |= q >>> P[D] & 1;
    for (var D = $; D < P.length; D++)
      U <<= 1, U |= X >>> P[D] & 1;
    t[F + 0] = l >>> 0, t[F + 1] = U >>> 0;
  }, utils$3.expand = function(q, X, t) {
    var F = 0, l = 0;
    F = (q & 1) << 5 | q >>> 27;
    for (var U = 23; U >= 15; U -= 4)
      F <<= 6, F |= q >>> U & 63;
    for (var U = 11; U >= 3; U -= 4)
      l |= q >>> U & 63, l <<= 6;
    l |= (q & 31) << 1 | q >>> 31, X[t + 0] = F >>> 0, X[t + 1] = l >>> 0;
  };
  var c = [
    14,
    0,
    4,
    15,
    13,
    7,
    1,
    4,
    2,
    14,
    15,
    2,
    11,
    13,
    8,
    1,
    3,
    10,
    10,
    6,
    6,
    12,
    12,
    11,
    5,
    9,
    9,
    5,
    0,
    3,
    7,
    8,
    4,
    15,
    1,
    12,
    14,
    8,
    8,
    2,
    13,
    4,
    6,
    9,
    2,
    1,
    11,
    7,
    15,
    5,
    12,
    11,
    9,
    3,
    7,
    14,
    3,
    10,
    10,
    0,
    5,
    6,
    0,
    13,
    15,
    3,
    1,
    13,
    8,
    4,
    14,
    7,
    6,
    15,
    11,
    2,
    3,
    8,
    4,
    14,
    9,
    12,
    7,
    0,
    2,
    1,
    13,
    10,
    12,
    6,
    0,
    9,
    5,
    11,
    10,
    5,
    0,
    13,
    14,
    8,
    7,
    10,
    11,
    1,
    10,
    3,
    4,
    15,
    13,
    4,
    1,
    2,
    5,
    11,
    8,
    6,
    12,
    7,
    6,
    12,
    9,
    0,
    3,
    5,
    2,
    14,
    15,
    9,
    10,
    13,
    0,
    7,
    9,
    0,
    14,
    9,
    6,
    3,
    3,
    4,
    15,
    6,
    5,
    10,
    1,
    2,
    13,
    8,
    12,
    5,
    7,
    14,
    11,
    12,
    4,
    11,
    2,
    15,
    8,
    1,
    13,
    1,
    6,
    10,
    4,
    13,
    9,
    0,
    8,
    6,
    15,
    9,
    3,
    8,
    0,
    7,
    11,
    4,
    1,
    15,
    2,
    14,
    12,
    3,
    5,
    11,
    10,
    5,
    14,
    2,
    7,
    12,
    7,
    13,
    13,
    8,
    14,
    11,
    3,
    5,
    0,
    6,
    6,
    15,
    9,
    0,
    10,
    3,
    1,
    4,
    2,
    7,
    8,
    2,
    5,
    12,
    11,
    1,
    12,
    10,
    4,
    14,
    15,
    9,
    10,
    3,
    6,
    15,
    9,
    0,
    0,
    6,
    12,
    10,
    11,
    1,
    7,
    13,
    13,
    8,
    15,
    9,
    1,
    4,
    3,
    5,
    14,
    11,
    5,
    12,
    2,
    7,
    8,
    2,
    4,
    14,
    2,
    14,
    12,
    11,
    4,
    2,
    1,
    12,
    7,
    4,
    10,
    7,
    11,
    13,
    6,
    1,
    8,
    5,
    5,
    0,
    3,
    15,
    15,
    10,
    13,
    3,
    0,
    9,
    14,
    8,
    9,
    6,
    4,
    11,
    2,
    8,
    1,
    12,
    11,
    7,
    10,
    1,
    13,
    14,
    7,
    2,
    8,
    13,
    15,
    6,
    9,
    15,
    12,
    0,
    5,
    9,
    6,
    10,
    3,
    4,
    0,
    5,
    14,
    3,
    12,
    10,
    1,
    15,
    10,
    4,
    15,
    2,
    9,
    7,
    2,
    12,
    6,
    9,
    8,
    5,
    0,
    6,
    13,
    1,
    3,
    13,
    4,
    14,
    14,
    0,
    7,
    11,
    5,
    3,
    11,
    8,
    9,
    4,
    14,
    3,
    15,
    2,
    5,
    12,
    2,
    9,
    8,
    5,
    12,
    15,
    3,
    10,
    7,
    11,
    0,
    14,
    4,
    1,
    10,
    7,
    1,
    6,
    13,
    0,
    11,
    8,
    6,
    13,
    4,
    13,
    11,
    0,
    2,
    11,
    14,
    7,
    15,
    4,
    0,
    9,
    8,
    1,
    13,
    10,
    3,
    14,
    12,
    3,
    9,
    5,
    7,
    12,
    5,
    2,
    10,
    15,
    6,
    8,
    1,
    6,
    1,
    6,
    4,
    11,
    11,
    13,
    13,
    8,
    12,
    1,
    3,
    4,
    7,
    10,
    14,
    7,
    10,
    9,
    15,
    5,
    6,
    0,
    8,
    15,
    0,
    14,
    5,
    2,
    9,
    3,
    2,
    12,
    13,
    1,
    2,
    15,
    8,
    13,
    4,
    8,
    6,
    10,
    15,
    3,
    11,
    7,
    1,
    4,
    10,
    12,
    9,
    5,
    3,
    6,
    14,
    11,
    5,
    0,
    0,
    14,
    12,
    9,
    7,
    2,
    7,
    2,
    11,
    1,
    4,
    14,
    1,
    7,
    9,
    4,
    12,
    10,
    14,
    8,
    2,
    13,
    0,
    15,
    6,
    12,
    10,
    9,
    13,
    0,
    15,
    3,
    3,
    5,
    5,
    6,
    8,
    11
  ];
  utils$3.substitute = function(q, X) {
    for (var t = 0, F = 0; F < 4; F++) {
      var l = q >>> 18 - F * 6 & 63, U = c[F * 64 + l];
      t <<= 4, t |= U;
    }
    for (var F = 0; F < 4; F++) {
      var l = X >>> 18 - F * 6 & 63, U = c[4 * 64 + F * 64 + l];
      t <<= 4, t |= U;
    }
    return t >>> 0;
  };
  var O = [
    16,
    25,
    12,
    11,
    3,
    20,
    4,
    15,
    31,
    17,
    9,
    6,
    27,
    14,
    1,
    22,
    30,
    24,
    8,
    18,
    0,
    5,
    29,
    23,
    13,
    19,
    2,
    26,
    10,
    21,
    28,
    7
  ];
  return utils$3.permute = function(q) {
    for (var X = 0, t = 0; t < O.length; t++)
      X <<= 1, X |= q >>> O[t] & 1;
    return X >>> 0;
  }, utils$3.padSplit = function(q, X, t) {
    for (var F = q.toString(2); F.length < X; )
      F = "0" + F;
    for (var l = [], U = 0; U < X; U += t)
      l.push(F.slice(U, U + t));
    return l.join(" ");
  }, utils$3;
}
var minimalisticAssert, hasRequiredMinimalisticAssert;
function requireMinimalisticAssert() {
  if (hasRequiredMinimalisticAssert) return minimalisticAssert;
  hasRequiredMinimalisticAssert = 1, minimalisticAssert = P;
  function P(c, O) {
    if (!c)
      throw new Error(O || "Assertion failed");
  }
  return P.equal = function(c, O, q) {
    if (c != O)
      throw new Error(q || "Assertion failed: " + c + " != " + O);
  }, minimalisticAssert;
}
var cipher, hasRequiredCipher;
function requireCipher() {
  if (hasRequiredCipher) return cipher;
  hasRequiredCipher = 1;
  var P = requireMinimalisticAssert();
  function c(O) {
    this.options = O, this.type = this.options.type, this.blockSize = 8, this._init(), this.buffer = new Array(this.blockSize), this.bufferOff = 0, this.padding = O.padding !== !1;
  }
  return cipher = c, c.prototype._init = function() {
  }, c.prototype.update = function(O) {
    return O.length === 0 ? [] : this.type === "decrypt" ? this._updateDecrypt(O) : this._updateEncrypt(O);
  }, c.prototype._buffer = function(O, q) {
    for (var X = Math.min(this.buffer.length - this.bufferOff, O.length - q), t = 0; t < X; t++)
      this.buffer[this.bufferOff + t] = O[q + t];
    return this.bufferOff += X, X;
  }, c.prototype._flushBuffer = function(O, q) {
    return this._update(this.buffer, 0, O, q), this.bufferOff = 0, this.blockSize;
  }, c.prototype._updateEncrypt = function(O) {
    var q = 0, X = 0, t = (this.bufferOff + O.length) / this.blockSize | 0, F = new Array(t * this.blockSize);
    this.bufferOff !== 0 && (q += this._buffer(O, q), this.bufferOff === this.buffer.length && (X += this._flushBuffer(F, X)));
    for (var l = O.length - (O.length - q) % this.blockSize; q < l; q += this.blockSize)
      this._update(O, q, F, X), X += this.blockSize;
    for (; q < O.length; q++, this.bufferOff++)
      this.buffer[this.bufferOff] = O[q];
    return F;
  }, c.prototype._updateDecrypt = function(O) {
    for (var q = 0, X = 0, t = Math.ceil((this.bufferOff + O.length) / this.blockSize) - 1, F = new Array(t * this.blockSize); t > 0; t--)
      q += this._buffer(O, q), X += this._flushBuffer(F, X);
    return q += this._buffer(O, q), F;
  }, c.prototype.final = function(O) {
    var q;
    O && (q = this.update(O));
    var X;
    return this.type === "encrypt" ? X = this._finalEncrypt() : X = this._finalDecrypt(), q ? q.concat(X) : X;
  }, c.prototype._pad = function(O, q) {
    if (q === 0)
      return !1;
    for (; q < O.length; )
      O[q++] = 0;
    return !0;
  }, c.prototype._finalEncrypt = function() {
    if (!this._pad(this.buffer, this.bufferOff))
      return [];
    var O = new Array(this.blockSize);
    return this._update(this.buffer, 0, O, 0), O;
  }, c.prototype._unpad = function(O) {
    return O;
  }, c.prototype._finalDecrypt = function() {
    P.equal(this.bufferOff, this.blockSize, "Not enough data to decrypt");
    var O = new Array(this.blockSize);
    return this._flushBuffer(O, 0), this._unpad(O);
  }, cipher;
}
var des, hasRequiredDes$1;
function requireDes$1() {
  if (hasRequiredDes$1) return des;
  hasRequiredDes$1 = 1;
  var P = requireMinimalisticAssert(), c = requireInherits_browser(), O = requireUtils$3(), q = requireCipher();
  function X() {
    this.tmp = new Array(2), this.keys = null;
  }
  function t(l) {
    q.call(this, l);
    var U = new X();
    this._desState = U, this.deriveKeys(U, l.key);
  }
  c(t, q), des = t, t.create = function(l) {
    return new t(l);
  };
  var F = [
    1,
    1,
    2,
    2,
    2,
    2,
    2,
    2,
    1,
    2,
    2,
    2,
    2,
    2,
    2,
    1
  ];
  return t.prototype.deriveKeys = function(l, U) {
    l.keys = new Array(16 * 2), P.equal(U.length, this.blockSize, "Invalid key length");
    var $ = O.readUInt32BE(U, 0), D = O.readUInt32BE(U, 4);
    O.pc1($, D, l.tmp, 0), $ = l.tmp[0], D = l.tmp[1];
    for (var Q = 0; Q < l.keys.length; Q += 2) {
      var V = F[Q >>> 1];
      $ = O.r28shl($, V), D = O.r28shl(D, V), O.pc2($, D, l.keys, Q);
    }
  }, t.prototype._update = function(l, U, $, D) {
    var Q = this._desState, V = O.readUInt32BE(l, U), te = O.readUInt32BE(l, U + 4);
    O.ip(V, te, Q.tmp, 0), V = Q.tmp[0], te = Q.tmp[1], this.type === "encrypt" ? this._encrypt(Q, V, te, Q.tmp, 0) : this._decrypt(Q, V, te, Q.tmp, 0), V = Q.tmp[0], te = Q.tmp[1], O.writeUInt32BE($, V, D), O.writeUInt32BE($, te, D + 4);
  }, t.prototype._pad = function(l, U) {
    if (this.padding === !1)
      return !1;
    for (var $ = l.length - U, D = U; D < l.length; D++)
      l[D] = $;
    return !0;
  }, t.prototype._unpad = function(l) {
    if (this.padding === !1)
      return l;
    for (var U = l[l.length - 1], $ = l.length - U; $ < l.length; $++)
      P.equal(l[$], U);
    return l.slice(0, l.length - U);
  }, t.prototype._encrypt = function(l, U, $, D, Q) {
    for (var V = U, te = $, ie = 0; ie < l.keys.length; ie += 2) {
      var ne = l.keys[ie], se = l.keys[ie + 1];
      O.expand(te, l.tmp, 0), ne ^= l.tmp[0], se ^= l.tmp[1];
      var ae = O.substitute(ne, se), oe = O.permute(ae), be = te;
      te = (V ^ oe) >>> 0, V = be;
    }
    O.rip(te, V, D, Q);
  }, t.prototype._decrypt = function(l, U, $, D, Q) {
    for (var V = $, te = U, ie = l.keys.length - 2; ie >= 0; ie -= 2) {
      var ne = l.keys[ie], se = l.keys[ie + 1];
      O.expand(V, l.tmp, 0), ne ^= l.tmp[0], se ^= l.tmp[1];
      var ae = O.substitute(ne, se), oe = O.permute(ae), be = V;
      V = (te ^ oe) >>> 0, te = be;
    }
    O.rip(V, te, D, Q);
  }, des;
}
var cbc$1 = {}, hasRequiredCbc$1;
function requireCbc$1() {
  if (hasRequiredCbc$1) return cbc$1;
  hasRequiredCbc$1 = 1;
  var P = requireMinimalisticAssert(), c = requireInherits_browser(), O = {};
  function q(t) {
    P.equal(t.length, 8, "Invalid IV length"), this.iv = new Array(8);
    for (var F = 0; F < this.iv.length; F++)
      this.iv[F] = t[F];
  }
  function X(t) {
    function F(D) {
      t.call(this, D), this._cbcInit();
    }
    c(F, t);
    for (var l = Object.keys(O), U = 0; U < l.length; U++) {
      var $ = l[U];
      F.prototype[$] = O[$];
    }
    return F.create = function(D) {
      return new F(D);
    }, F;
  }
  return cbc$1.instantiate = X, O._cbcInit = function() {
    var t = new q(this.options.iv);
    this._cbcState = t;
  }, O._update = function(t, F, l, U) {
    var $ = this._cbcState, D = this.constructor.super_.prototype, Q = $.iv;
    if (this.type === "encrypt") {
      for (var V = 0; V < this.blockSize; V++)
        Q[V] ^= t[F + V];
      D._update.call(this, Q, 0, l, U);
      for (var V = 0; V < this.blockSize; V++)
        Q[V] = l[U + V];
    } else {
      D._update.call(this, t, F, l, U);
      for (var V = 0; V < this.blockSize; V++)
        l[U + V] ^= Q[V];
      for (var V = 0; V < this.blockSize; V++)
        Q[V] = t[F + V];
    }
  }, cbc$1;
}
var ede, hasRequiredEde;
function requireEde() {
  if (hasRequiredEde) return ede;
  hasRequiredEde = 1;
  var P = requireMinimalisticAssert(), c = requireInherits_browser(), O = requireCipher(), q = requireDes$1();
  function X(F, l) {
    P.equal(l.length, 24, "Invalid key length");
    var U = l.slice(0, 8), $ = l.slice(8, 16), D = l.slice(16, 24);
    F === "encrypt" ? this.ciphers = [
      q.create({ type: "encrypt", key: U }),
      q.create({ type: "decrypt", key: $ }),
      q.create({ type: "encrypt", key: D })
    ] : this.ciphers = [
      q.create({ type: "decrypt", key: D }),
      q.create({ type: "encrypt", key: $ }),
      q.create({ type: "decrypt", key: U })
    ];
  }
  function t(F) {
    O.call(this, F);
    var l = new X(this.type, this.options.key);
    this._edeState = l;
  }
  return c(t, O), ede = t, t.create = function(F) {
    return new t(F);
  }, t.prototype._update = function(F, l, U, $) {
    var D = this._edeState;
    D.ciphers[0]._update(F, l, U, $), D.ciphers[1]._update(U, $, U, $), D.ciphers[2]._update(U, $, U, $);
  }, t.prototype._pad = q.prototype._pad, t.prototype._unpad = q.prototype._unpad, ede;
}
var hasRequiredDes;
function requireDes() {
  return hasRequiredDes || (hasRequiredDes = 1, des$1.utils = requireUtils$3(), des$1.Cipher = requireCipher(), des$1.DES = requireDes$1(), des$1.CBC = requireCbc$1(), des$1.EDE = requireEde()), des$1;
}
var browserifyDes, hasRequiredBrowserifyDes;
function requireBrowserifyDes() {
  if (hasRequiredBrowserifyDes) return browserifyDes;
  hasRequiredBrowserifyDes = 1;
  var P = requireCipherBase(), c = requireDes(), O = requireInherits_browser(), q = requireSafeBuffer$1().Buffer, X = {
    "des-ede3-cbc": c.CBC.instantiate(c.EDE),
    "des-ede3": c.EDE,
    "des-ede-cbc": c.CBC.instantiate(c.EDE),
    "des-ede": c.EDE,
    "des-cbc": c.CBC.instantiate(c.DES),
    "des-ecb": c.DES
  };
  X.des = X["des-cbc"], X.des3 = X["des-ede3-cbc"], browserifyDes = t, O(t, P);
  function t(F) {
    P.call(this);
    var l = F.mode.toLowerCase(), U = X[l], $;
    F.decrypt ? $ = "decrypt" : $ = "encrypt";
    var D = F.key;
    q.isBuffer(D) || (D = q.from(D)), (l === "des-ede" || l === "des-ede-cbc") && (D = q.concat([D, D.slice(0, 8)]));
    var Q = F.iv;
    q.isBuffer(Q) || (Q = q.from(Q)), this._des = U.create({
      key: D,
      iv: Q,
      type: $
    });
  }
  return t.prototype._update = function(F) {
    return q.from(this._des.update(F));
  }, t.prototype._final = function() {
    return q.from(this._des.final());
  }, browserifyDes;
}
var browser$5 = {}, encrypter = {}, ecb = {}, hasRequiredEcb;
function requireEcb() {
  return hasRequiredEcb || (hasRequiredEcb = 1, ecb.encrypt = function(P, c) {
    return P._cipher.encryptBlock(c);
  }, ecb.decrypt = function(P, c) {
    return P._cipher.decryptBlock(c);
  }), ecb;
}
var cbc = {}, bufferXor, hasRequiredBufferXor;
function requireBufferXor() {
  return hasRequiredBufferXor || (hasRequiredBufferXor = 1, bufferXor = function(P, c) {
    for (var O = Math.min(P.length, c.length), q = new bufferExports.Buffer(O), X = 0; X < O; ++X)
      q[X] = P[X] ^ c[X];
    return q;
  }), bufferXor;
}
var hasRequiredCbc;
function requireCbc() {
  if (hasRequiredCbc) return cbc;
  hasRequiredCbc = 1;
  var P = requireBufferXor();
  return cbc.encrypt = function(c, O) {
    var q = P(O, c._prev);
    return c._prev = c._cipher.encryptBlock(q), c._prev;
  }, cbc.decrypt = function(c, O) {
    var q = c._prev;
    c._prev = O;
    var X = c._cipher.decryptBlock(O);
    return P(X, q);
  }, cbc;
}
var cfb = {}, hasRequiredCfb;
function requireCfb() {
  if (hasRequiredCfb) return cfb;
  hasRequiredCfb = 1;
  var P = requireSafeBuffer$1().Buffer, c = requireBufferXor();
  function O(q, X, t) {
    var F = X.length, l = c(X, q._cache);
    return q._cache = q._cache.slice(F), q._prev = P.concat([q._prev, t ? X : l]), l;
  }
  return cfb.encrypt = function(q, X, t) {
    for (var F = P.allocUnsafe(0), l; X.length; )
      if (q._cache.length === 0 && (q._cache = q._cipher.encryptBlock(q._prev), q._prev = P.allocUnsafe(0)), q._cache.length <= X.length)
        l = q._cache.length, F = P.concat([F, O(q, X.slice(0, l), t)]), X = X.slice(l);
      else {
        F = P.concat([F, O(q, X, t)]);
        break;
      }
    return F;
  }, cfb;
}
var cfb8 = {}, hasRequiredCfb8;
function requireCfb8() {
  if (hasRequiredCfb8) return cfb8;
  hasRequiredCfb8 = 1;
  var P = requireSafeBuffer$1().Buffer;
  function c(O, q, X) {
    var t = O._cipher.encryptBlock(O._prev), F = t[0] ^ q;
    return O._prev = P.concat([
      O._prev.slice(1),
      P.from([X ? q : F])
    ]), F;
  }
  return cfb8.encrypt = function(O, q, X) {
    for (var t = q.length, F = P.allocUnsafe(t), l = -1; ++l < t; )
      F[l] = c(O, q[l], X);
    return F;
  }, cfb8;
}
var cfb1 = {}, hasRequiredCfb1;
function requireCfb1() {
  if (hasRequiredCfb1) return cfb1;
  hasRequiredCfb1 = 1;
  var P = requireSafeBuffer$1().Buffer;
  function c(q, X, t) {
    for (var F, l = -1, U = 8, $ = 0, D, Q; ++l < U; )
      F = q._cipher.encryptBlock(q._prev), D = X & 1 << 7 - l ? 128 : 0, Q = F[0] ^ D, $ += (Q & 128) >> l % 8, q._prev = O(q._prev, t ? D : Q);
    return $;
  }
  function O(q, X) {
    var t = q.length, F = -1, l = P.allocUnsafe(q.length);
    for (q = P.concat([q, P.from([X])]); ++F < t; )
      l[F] = q[F] << 1 | q[F + 1] >> 7;
    return l;
  }
  return cfb1.encrypt = function(q, X, t) {
    for (var F = X.length, l = P.allocUnsafe(F), U = -1; ++U < F; )
      l[U] = c(q, X[U], t);
    return l;
  }, cfb1;
}
var ofb = {}, hasRequiredOfb;
function requireOfb() {
  if (hasRequiredOfb) return ofb;
  hasRequiredOfb = 1;
  var P = requireBufferXor();
  function c(O) {
    return O._prev = O._cipher.encryptBlock(O._prev), O._prev;
  }
  return ofb.encrypt = function(O, q) {
    for (; O._cache.length < q.length; )
      O._cache = bufferExports.Buffer.concat([O._cache, c(O)]);
    var X = O._cache.slice(0, q.length);
    return O._cache = O._cache.slice(q.length), P(q, X);
  }, ofb;
}
var ctr = {}, incr32_1, hasRequiredIncr32;
function requireIncr32() {
  if (hasRequiredIncr32) return incr32_1;
  hasRequiredIncr32 = 1;
  function P(c) {
    for (var O = c.length, q; O--; )
      if (q = c.readUInt8(O), q === 255)
        c.writeUInt8(0, O);
      else {
        q++, c.writeUInt8(q, O);
        break;
      }
  }
  return incr32_1 = P, incr32_1;
}
var hasRequiredCtr;
function requireCtr() {
  if (hasRequiredCtr) return ctr;
  hasRequiredCtr = 1;
  var P = requireBufferXor(), c = requireSafeBuffer$1().Buffer, O = requireIncr32();
  function q(t) {
    var F = t._cipher.encryptBlockRaw(t._prev);
    return O(t._prev), F;
  }
  var X = 16;
  return ctr.encrypt = function(t, F) {
    var l = Math.ceil(F.length / X), U = t._cache.length;
    t._cache = c.concat([
      t._cache,
      c.allocUnsafe(l * X)
    ]);
    for (var $ = 0; $ < l; $++) {
      var D = q(t), Q = U + $ * X;
      t._cache.writeUInt32BE(D[0], Q + 0), t._cache.writeUInt32BE(D[1], Q + 4), t._cache.writeUInt32BE(D[2], Q + 8), t._cache.writeUInt32BE(D[3], Q + 12);
    }
    var V = t._cache.slice(0, F.length);
    return t._cache = t._cache.slice(F.length), P(F, V);
  }, ctr;
}
const aes128 = {
  cipher: "AES",
  key: 128,
  iv: 16,
  mode: "CBC",
  type: "block"
}, aes192 = {
  cipher: "AES",
  key: 192,
  iv: 16,
  mode: "CBC",
  type: "block"
}, aes256 = {
  cipher: "AES",
  key: 256,
  iv: 16,
  mode: "CBC",
  type: "block"
}, require$$2 = {
  "aes-128-ecb": {
    cipher: "AES",
    key: 128,
    iv: 0,
    mode: "ECB",
    type: "block"
  },
  "aes-192-ecb": {
    cipher: "AES",
    key: 192,
    iv: 0,
    mode: "ECB",
    type: "block"
  },
  "aes-256-ecb": {
    cipher: "AES",
    key: 256,
    iv: 0,
    mode: "ECB",
    type: "block"
  },
  "aes-128-cbc": {
    cipher: "AES",
    key: 128,
    iv: 16,
    mode: "CBC",
    type: "block"
  },
  "aes-192-cbc": {
    cipher: "AES",
    key: 192,
    iv: 16,
    mode: "CBC",
    type: "block"
  },
  "aes-256-cbc": {
    cipher: "AES",
    key: 256,
    iv: 16,
    mode: "CBC",
    type: "block"
  },
  aes128,
  aes192,
  aes256,
  "aes-128-cfb": {
    cipher: "AES",
    key: 128,
    iv: 16,
    mode: "CFB",
    type: "stream"
  },
  "aes-192-cfb": {
    cipher: "AES",
    key: 192,
    iv: 16,
    mode: "CFB",
    type: "stream"
  },
  "aes-256-cfb": {
    cipher: "AES",
    key: 256,
    iv: 16,
    mode: "CFB",
    type: "stream"
  },
  "aes-128-cfb8": {
    cipher: "AES",
    key: 128,
    iv: 16,
    mode: "CFB8",
    type: "stream"
  },
  "aes-192-cfb8": {
    cipher: "AES",
    key: 192,
    iv: 16,
    mode: "CFB8",
    type: "stream"
  },
  "aes-256-cfb8": {
    cipher: "AES",
    key: 256,
    iv: 16,
    mode: "CFB8",
    type: "stream"
  },
  "aes-128-cfb1": {
    cipher: "AES",
    key: 128,
    iv: 16,
    mode: "CFB1",
    type: "stream"
  },
  "aes-192-cfb1": {
    cipher: "AES",
    key: 192,
    iv: 16,
    mode: "CFB1",
    type: "stream"
  },
  "aes-256-cfb1": {
    cipher: "AES",
    key: 256,
    iv: 16,
    mode: "CFB1",
    type: "stream"
  },
  "aes-128-ofb": {
    cipher: "AES",
    key: 128,
    iv: 16,
    mode: "OFB",
    type: "stream"
  },
  "aes-192-ofb": {
    cipher: "AES",
    key: 192,
    iv: 16,
    mode: "OFB",
    type: "stream"
  },
  "aes-256-ofb": {
    cipher: "AES",
    key: 256,
    iv: 16,
    mode: "OFB",
    type: "stream"
  },
  "aes-128-ctr": {
    cipher: "AES",
    key: 128,
    iv: 16,
    mode: "CTR",
    type: "stream"
  },
  "aes-192-ctr": {
    cipher: "AES",
    key: 192,
    iv: 16,
    mode: "CTR",
    type: "stream"
  },
  "aes-256-ctr": {
    cipher: "AES",
    key: 256,
    iv: 16,
    mode: "CTR",
    type: "stream"
  },
  "aes-128-gcm": {
    cipher: "AES",
    key: 128,
    iv: 12,
    mode: "GCM",
    type: "auth"
  },
  "aes-192-gcm": {
    cipher: "AES",
    key: 192,
    iv: 12,
    mode: "GCM",
    type: "auth"
  },
  "aes-256-gcm": {
    cipher: "AES",
    key: 256,
    iv: 12,
    mode: "GCM",
    type: "auth"
  }
};
var modes_1, hasRequiredModes$1;
function requireModes$1() {
  if (hasRequiredModes$1) return modes_1;
  hasRequiredModes$1 = 1;
  var P = {
    ECB: requireEcb(),
    CBC: requireCbc(),
    CFB: requireCfb(),
    CFB8: requireCfb8(),
    CFB1: requireCfb1(),
    OFB: requireOfb(),
    CTR: requireCtr(),
    GCM: requireCtr()
  }, c = require$$2;
  for (var O in c)
    c[O].module = P[c[O].mode];
  return modes_1 = c, modes_1;
}
var aes = {}, hasRequiredAes;
function requireAes() {
  if (hasRequiredAes) return aes;
  hasRequiredAes = 1;
  var P = requireSafeBuffer$1().Buffer;
  function c(l) {
    P.isBuffer(l) || (l = P.from(l));
    for (var U = l.length / 4 | 0, $ = new Array(U), D = 0; D < U; D++)
      $[D] = l.readUInt32BE(D * 4);
    return $;
  }
  function O(l) {
    for (var U = 0; U < l.length; l++)
      l[U] = 0;
  }
  function q(l, U, $, D, Q) {
    for (var V = $[0], te = $[1], ie = $[2], ne = $[3], se = l[0] ^ U[0], ae = l[1] ^ U[1], oe = l[2] ^ U[2], be = l[3] ^ U[3], de, _e, qe, Te, ce = 4, pe = 1; pe < Q; pe++)
      de = V[se >>> 24] ^ te[ae >>> 16 & 255] ^ ie[oe >>> 8 & 255] ^ ne[be & 255] ^ U[ce++], _e = V[ae >>> 24] ^ te[oe >>> 16 & 255] ^ ie[be >>> 8 & 255] ^ ne[se & 255] ^ U[ce++], qe = V[oe >>> 24] ^ te[be >>> 16 & 255] ^ ie[se >>> 8 & 255] ^ ne[ae & 255] ^ U[ce++], Te = V[be >>> 24] ^ te[se >>> 16 & 255] ^ ie[ae >>> 8 & 255] ^ ne[oe & 255] ^ U[ce++], se = de, ae = _e, oe = qe, be = Te;
    return de = (D[se >>> 24] << 24 | D[ae >>> 16 & 255] << 16 | D[oe >>> 8 & 255] << 8 | D[be & 255]) ^ U[ce++], _e = (D[ae >>> 24] << 24 | D[oe >>> 16 & 255] << 16 | D[be >>> 8 & 255] << 8 | D[se & 255]) ^ U[ce++], qe = (D[oe >>> 24] << 24 | D[be >>> 16 & 255] << 16 | D[se >>> 8 & 255] << 8 | D[ae & 255]) ^ U[ce++], Te = (D[be >>> 24] << 24 | D[se >>> 16 & 255] << 16 | D[ae >>> 8 & 255] << 8 | D[oe & 255]) ^ U[ce++], de = de >>> 0, _e = _e >>> 0, qe = qe >>> 0, Te = Te >>> 0, [de, _e, qe, Te];
  }
  var X = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54], t = function() {
    for (var l = new Array(256), U = 0; U < 256; U++)
      U < 128 ? l[U] = U << 1 : l[U] = U << 1 ^ 283;
    for (var $ = [], D = [], Q = [[], [], [], []], V = [[], [], [], []], te = 0, ie = 0, ne = 0; ne < 256; ++ne) {
      var se = ie ^ ie << 1 ^ ie << 2 ^ ie << 3 ^ ie << 4;
      se = se >>> 8 ^ se & 255 ^ 99, $[te] = se, D[se] = te;
      var ae = l[te], oe = l[ae], be = l[oe], de = l[se] * 257 ^ se * 16843008;
      Q[0][te] = de << 24 | de >>> 8, Q[1][te] = de << 16 | de >>> 16, Q[2][te] = de << 8 | de >>> 24, Q[3][te] = de, de = be * 16843009 ^ oe * 65537 ^ ae * 257 ^ te * 16843008, V[0][se] = de << 24 | de >>> 8, V[1][se] = de << 16 | de >>> 16, V[2][se] = de << 8 | de >>> 24, V[3][se] = de, te === 0 ? te = ie = 1 : (te = ae ^ l[l[l[be ^ ae]]], ie ^= l[l[ie]]);
    }
    return {
      SBOX: $,
      INV_SBOX: D,
      SUB_MIX: Q,
      INV_SUB_MIX: V
    };
  }();
  function F(l) {
    this._key = c(l), this._reset();
  }
  return F.blockSize = 4 * 4, F.keySize = 256 / 8, F.prototype.blockSize = F.blockSize, F.prototype.keySize = F.keySize, F.prototype._reset = function() {
    for (var l = this._key, U = l.length, $ = U + 6, D = ($ + 1) * 4, Q = [], V = 0; V < U; V++)
      Q[V] = l[V];
    for (V = U; V < D; V++) {
      var te = Q[V - 1];
      V % U === 0 ? (te = te << 8 | te >>> 24, te = t.SBOX[te >>> 24] << 24 | t.SBOX[te >>> 16 & 255] << 16 | t.SBOX[te >>> 8 & 255] << 8 | t.SBOX[te & 255], te ^= X[V / U | 0] << 24) : U > 6 && V % U === 4 && (te = t.SBOX[te >>> 24] << 24 | t.SBOX[te >>> 16 & 255] << 16 | t.SBOX[te >>> 8 & 255] << 8 | t.SBOX[te & 255]), Q[V] = Q[V - U] ^ te;
    }
    for (var ie = [], ne = 0; ne < D; ne++) {
      var se = D - ne, ae = Q[se - (ne % 4 ? 0 : 4)];
      ne < 4 || se <= 4 ? ie[ne] = ae : ie[ne] = t.INV_SUB_MIX[0][t.SBOX[ae >>> 24]] ^ t.INV_SUB_MIX[1][t.SBOX[ae >>> 16 & 255]] ^ t.INV_SUB_MIX[2][t.SBOX[ae >>> 8 & 255]] ^ t.INV_SUB_MIX[3][t.SBOX[ae & 255]];
    }
    this._nRounds = $, this._keySchedule = Q, this._invKeySchedule = ie;
  }, F.prototype.encryptBlockRaw = function(l) {
    return l = c(l), q(l, this._keySchedule, t.SUB_MIX, t.SBOX, this._nRounds);
  }, F.prototype.encryptBlock = function(l) {
    var U = this.encryptBlockRaw(l), $ = P.allocUnsafe(16);
    return $.writeUInt32BE(U[0], 0), $.writeUInt32BE(U[1], 4), $.writeUInt32BE(U[2], 8), $.writeUInt32BE(U[3], 12), $;
  }, F.prototype.decryptBlock = function(l) {
    l = c(l);
    var U = l[1];
    l[1] = l[3], l[3] = U;
    var $ = q(l, this._invKeySchedule, t.INV_SUB_MIX, t.INV_SBOX, this._nRounds), D = P.allocUnsafe(16);
    return D.writeUInt32BE($[0], 0), D.writeUInt32BE($[3], 4), D.writeUInt32BE($[2], 8), D.writeUInt32BE($[1], 12), D;
  }, F.prototype.scrub = function() {
    O(this._keySchedule), O(this._invKeySchedule), O(this._key);
  }, aes.AES = F, aes;
}
var ghash, hasRequiredGhash;
function requireGhash() {
  if (hasRequiredGhash) return ghash;
  hasRequiredGhash = 1;
  var P = requireSafeBuffer$1().Buffer, c = P.alloc(16, 0);
  function O(t) {
    return [
      t.readUInt32BE(0),
      t.readUInt32BE(4),
      t.readUInt32BE(8),
      t.readUInt32BE(12)
    ];
  }
  function q(t) {
    var F = P.allocUnsafe(16);
    return F.writeUInt32BE(t[0] >>> 0, 0), F.writeUInt32BE(t[1] >>> 0, 4), F.writeUInt32BE(t[2] >>> 0, 8), F.writeUInt32BE(t[3] >>> 0, 12), F;
  }
  function X(t) {
    this.h = t, this.state = P.alloc(16, 0), this.cache = P.allocUnsafe(0);
  }
  return X.prototype.ghash = function(t) {
    for (var F = -1; ++F < t.length; )
      this.state[F] ^= t[F];
    this._multiply();
  }, X.prototype._multiply = function() {
    for (var t = O(this.h), F = [0, 0, 0, 0], l, U, $, D = -1; ++D < 128; ) {
      for (U = (this.state[~~(D / 8)] & 1 << 7 - D % 8) !== 0, U && (F[0] ^= t[0], F[1] ^= t[1], F[2] ^= t[2], F[3] ^= t[3]), $ = (t[3] & 1) !== 0, l = 3; l > 0; l--)
        t[l] = t[l] >>> 1 | (t[l - 1] & 1) << 31;
      t[0] = t[0] >>> 1, $ && (t[0] = t[0] ^ 225 << 24);
    }
    this.state = q(F);
  }, X.prototype.update = function(t) {
    this.cache = P.concat([this.cache, t]);
    for (var F; this.cache.length >= 16; )
      F = this.cache.slice(0, 16), this.cache = this.cache.slice(16), this.ghash(F);
  }, X.prototype.final = function(t, F) {
    return this.cache.length && this.ghash(P.concat([this.cache, c], 16)), this.ghash(q([0, t, 0, F])), this.state;
  }, ghash = X, ghash;
}
var authCipher, hasRequiredAuthCipher;
function requireAuthCipher() {
  if (hasRequiredAuthCipher) return authCipher;
  hasRequiredAuthCipher = 1;
  var P = requireAes(), c = requireSafeBuffer$1().Buffer, O = requireCipherBase(), q = requireInherits_browser(), X = requireGhash(), t = requireBufferXor(), F = requireIncr32();
  function l(D, Q) {
    var V = 0;
    D.length !== Q.length && V++;
    for (var te = Math.min(D.length, Q.length), ie = 0; ie < te; ++ie)
      V += D[ie] ^ Q[ie];
    return V;
  }
  function U(D, Q, V) {
    if (Q.length === 12)
      return D._finID = c.concat([Q, c.from([0, 0, 0, 1])]), c.concat([Q, c.from([0, 0, 0, 2])]);
    var te = new X(V), ie = Q.length, ne = ie % 16;
    te.update(Q), ne && (ne = 16 - ne, te.update(c.alloc(ne, 0))), te.update(c.alloc(8, 0));
    var se = ie * 8, ae = c.alloc(8);
    ae.writeUIntBE(se, 0, 8), te.update(ae), D._finID = te.state;
    var oe = c.from(D._finID);
    return F(oe), oe;
  }
  function $(D, Q, V, te) {
    O.call(this);
    var ie = c.alloc(4, 0);
    this._cipher = new P.AES(Q);
    var ne = this._cipher.encryptBlock(ie);
    this._ghash = new X(ne), V = U(this, V, ne), this._prev = c.from(V), this._cache = c.allocUnsafe(0), this._secCache = c.allocUnsafe(0), this._decrypt = te, this._alen = 0, this._len = 0, this._mode = D, this._authTag = null, this._called = !1;
  }
  return q($, O), $.prototype._update = function(D) {
    if (!this._called && this._alen) {
      var Q = 16 - this._alen % 16;
      Q < 16 && (Q = c.alloc(Q, 0), this._ghash.update(Q));
    }
    this._called = !0;
    var V = this._mode.encrypt(this, D);
    return this._decrypt ? this._ghash.update(D) : this._ghash.update(V), this._len += D.length, V;
  }, $.prototype._final = function() {
    if (this._decrypt && !this._authTag) throw new Error("Unsupported state or unable to authenticate data");
    var D = t(this._ghash.final(this._alen * 8, this._len * 8), this._cipher.encryptBlock(this._finID));
    if (this._decrypt && l(D, this._authTag)) throw new Error("Unsupported state or unable to authenticate data");
    this._authTag = D, this._cipher.scrub();
  }, $.prototype.getAuthTag = function() {
    if (this._decrypt || !c.isBuffer(this._authTag)) throw new Error("Attempting to get auth tag in unsupported state");
    return this._authTag;
  }, $.prototype.setAuthTag = function(D) {
    if (!this._decrypt) throw new Error("Attempting to set auth tag in unsupported state");
    this._authTag = D;
  }, $.prototype.setAAD = function(D) {
    if (this._called) throw new Error("Attempting to set AAD in unsupported state");
    this._ghash.update(D), this._alen += D.length;
  }, authCipher = $, authCipher;
}
var streamCipher, hasRequiredStreamCipher;
function requireStreamCipher() {
  if (hasRequiredStreamCipher) return streamCipher;
  hasRequiredStreamCipher = 1;
  var P = requireAes(), c = requireSafeBuffer$1().Buffer, O = requireCipherBase(), q = requireInherits_browser();
  function X(t, F, l, U) {
    O.call(this), this._cipher = new P.AES(F), this._prev = c.from(l), this._cache = c.allocUnsafe(0), this._secCache = c.allocUnsafe(0), this._decrypt = U, this._mode = t;
  }
  return q(X, O), X.prototype._update = function(t) {
    return this._mode.encrypt(this, t, this._decrypt);
  }, X.prototype._final = function() {
    this._cipher.scrub();
  }, streamCipher = X, streamCipher;
}
var evp_bytestokey, hasRequiredEvp_bytestokey;
function requireEvp_bytestokey() {
  if (hasRequiredEvp_bytestokey) return evp_bytestokey;
  hasRequiredEvp_bytestokey = 1;
  var P = requireSafeBuffer$1().Buffer, c = requireMd5_js();
  function O(q, X, t, F) {
    if (P.isBuffer(q) || (q = P.from(q, "binary")), X && (P.isBuffer(X) || (X = P.from(X, "binary")), X.length !== 8))
      throw new RangeError("salt should be Buffer with 8 byte length");
    for (var l = t / 8, U = P.alloc(l), $ = P.alloc(F || 0), D = P.alloc(0); l > 0 || F > 0; ) {
      var Q = new c();
      Q.update(D), Q.update(q), X && Q.update(X), D = Q.digest();
      var V = 0;
      if (l > 0) {
        var te = U.length - l;
        V = Math.min(l, D.length), D.copy(U, te, 0, V), l -= V;
      }
      if (V < D.length && F > 0) {
        var ie = $.length - F, ne = Math.min(F, D.length - V);
        D.copy($, ie, V, V + ne), F -= ne;
      }
    }
    return D.fill(0), { key: U, iv: $ };
  }
  return evp_bytestokey = O, evp_bytestokey;
}
var hasRequiredEncrypter;
function requireEncrypter() {
  if (hasRequiredEncrypter) return encrypter;
  hasRequiredEncrypter = 1;
  var P = requireModes$1(), c = requireAuthCipher(), O = requireSafeBuffer$1().Buffer, q = requireStreamCipher(), X = requireCipherBase(), t = requireAes(), F = requireEvp_bytestokey(), l = requireInherits_browser();
  function U(te, ie, ne) {
    X.call(this), this._cache = new D(), this._cipher = new t.AES(ie), this._prev = O.from(ne), this._mode = te, this._autopadding = !0;
  }
  l(U, X), U.prototype._update = function(te) {
    this._cache.add(te);
    for (var ie, ne, se = []; ie = this._cache.get(); )
      ne = this._mode.encrypt(this, ie), se.push(ne);
    return O.concat(se);
  };
  var $ = O.alloc(16, 16);
  U.prototype._final = function() {
    var te = this._cache.flush();
    if (this._autopadding)
      return te = this._mode.encrypt(this, te), this._cipher.scrub(), te;
    if (!te.equals($))
      throw this._cipher.scrub(), new Error("data not multiple of block length");
  }, U.prototype.setAutoPadding = function(te) {
    return this._autopadding = !!te, this;
  };
  function D() {
    this.cache = O.allocUnsafe(0);
  }
  D.prototype.add = function(te) {
    this.cache = O.concat([this.cache, te]);
  }, D.prototype.get = function() {
    if (this.cache.length > 15) {
      var te = this.cache.slice(0, 16);
      return this.cache = this.cache.slice(16), te;
    }
    return null;
  }, D.prototype.flush = function() {
    for (var te = 16 - this.cache.length, ie = O.allocUnsafe(te), ne = -1; ++ne < te; )
      ie.writeUInt8(te, ne);
    return O.concat([this.cache, ie]);
  };
  function Q(te, ie, ne) {
    var se = P[te.toLowerCase()];
    if (!se) throw new TypeError("invalid suite type");
    if (typeof ie == "string" && (ie = O.from(ie)), ie.length !== se.key / 8) throw new TypeError("invalid key length " + ie.length);
    if (typeof ne == "string" && (ne = O.from(ne)), se.mode !== "GCM" && ne.length !== se.iv) throw new TypeError("invalid iv length " + ne.length);
    return se.type === "stream" ? new q(se.module, ie, ne) : se.type === "auth" ? new c(se.module, ie, ne) : new U(se.module, ie, ne);
  }
  function V(te, ie) {
    var ne = P[te.toLowerCase()];
    if (!ne) throw new TypeError("invalid suite type");
    var se = F(ie, !1, ne.key, ne.iv);
    return Q(te, se.key, se.iv);
  }
  return encrypter.createCipheriv = Q, encrypter.createCipher = V, encrypter;
}
var decrypter = {}, hasRequiredDecrypter;
function requireDecrypter() {
  if (hasRequiredDecrypter) return decrypter;
  hasRequiredDecrypter = 1;
  var P = requireAuthCipher(), c = requireSafeBuffer$1().Buffer, O = requireModes$1(), q = requireStreamCipher(), X = requireCipherBase(), t = requireAes(), F = requireEvp_bytestokey(), l = requireInherits_browser();
  function U(te, ie, ne) {
    X.call(this), this._cache = new $(), this._last = void 0, this._cipher = new t.AES(ie), this._prev = c.from(ne), this._mode = te, this._autopadding = !0;
  }
  l(U, X), U.prototype._update = function(te) {
    this._cache.add(te);
    for (var ie, ne, se = []; ie = this._cache.get(this._autopadding); )
      ne = this._mode.decrypt(this, ie), se.push(ne);
    return c.concat(se);
  }, U.prototype._final = function() {
    var te = this._cache.flush();
    if (this._autopadding)
      return D(this._mode.decrypt(this, te));
    if (te)
      throw new Error("data not multiple of block length");
  }, U.prototype.setAutoPadding = function(te) {
    return this._autopadding = !!te, this;
  };
  function $() {
    this.cache = c.allocUnsafe(0);
  }
  $.prototype.add = function(te) {
    this.cache = c.concat([this.cache, te]);
  }, $.prototype.get = function(te) {
    var ie;
    if (te) {
      if (this.cache.length > 16)
        return ie = this.cache.slice(0, 16), this.cache = this.cache.slice(16), ie;
    } else if (this.cache.length >= 16)
      return ie = this.cache.slice(0, 16), this.cache = this.cache.slice(16), ie;
    return null;
  }, $.prototype.flush = function() {
    if (this.cache.length) return this.cache;
  };
  function D(te) {
    var ie = te[15];
    if (ie < 1 || ie > 16)
      throw new Error("unable to decrypt data");
    for (var ne = -1; ++ne < ie; )
      if (te[ne + (16 - ie)] !== ie)
        throw new Error("unable to decrypt data");
    if (ie !== 16)
      return te.slice(0, 16 - ie);
  }
  function Q(te, ie, ne) {
    var se = O[te.toLowerCase()];
    if (!se) throw new TypeError("invalid suite type");
    if (typeof ne == "string" && (ne = c.from(ne)), se.mode !== "GCM" && ne.length !== se.iv) throw new TypeError("invalid iv length " + ne.length);
    if (typeof ie == "string" && (ie = c.from(ie)), ie.length !== se.key / 8) throw new TypeError("invalid key length " + ie.length);
    return se.type === "stream" ? new q(se.module, ie, ne, !0) : se.type === "auth" ? new P(se.module, ie, ne, !0) : new U(se.module, ie, ne);
  }
  function V(te, ie) {
    var ne = O[te.toLowerCase()];
    if (!ne) throw new TypeError("invalid suite type");
    var se = F(ie, !1, ne.key, ne.iv);
    return Q(te, se.key, se.iv);
  }
  return decrypter.createDecipher = V, decrypter.createDecipheriv = Q, decrypter;
}
var hasRequiredBrowser$6;
function requireBrowser$6() {
  if (hasRequiredBrowser$6) return browser$5;
  hasRequiredBrowser$6 = 1;
  var P = requireEncrypter(), c = requireDecrypter(), O = require$$2;
  function q() {
    return Object.keys(O);
  }
  return browser$5.createCipher = browser$5.Cipher = P.createCipher, browser$5.createCipheriv = browser$5.Cipheriv = P.createCipheriv, browser$5.createDecipher = browser$5.Decipher = c.createDecipher, browser$5.createDecipheriv = browser$5.Decipheriv = c.createDecipheriv, browser$5.listCiphers = browser$5.getCiphers = q, browser$5;
}
var modes = {}, hasRequiredModes;
function requireModes() {
  return hasRequiredModes || (hasRequiredModes = 1, function(P) {
    P["des-ecb"] = {
      key: 8,
      iv: 0
    }, P["des-cbc"] = P.des = {
      key: 8,
      iv: 8
    }, P["des-ede3-cbc"] = P.des3 = {
      key: 24,
      iv: 8
    }, P["des-ede3"] = {
      key: 24,
      iv: 0
    }, P["des-ede-cbc"] = {
      key: 16,
      iv: 8
    }, P["des-ede"] = {
      key: 16,
      iv: 0
    };
  }(modes)), modes;
}
var hasRequiredBrowser$5;
function requireBrowser$5() {
  if (hasRequiredBrowser$5) return browser$6;
  hasRequiredBrowser$5 = 1;
  var P = requireBrowserifyDes(), c = requireBrowser$6(), O = requireModes$1(), q = requireModes(), X = requireEvp_bytestokey();
  function t(D, Q) {
    D = D.toLowerCase();
    var V, te;
    if (O[D])
      V = O[D].key, te = O[D].iv;
    else if (q[D])
      V = q[D].key * 8, te = q[D].iv;
    else
      throw new TypeError("invalid suite type");
    var ie = X(Q, !1, V, te);
    return l(D, ie.key, ie.iv);
  }
  function F(D, Q) {
    D = D.toLowerCase();
    var V, te;
    if (O[D])
      V = O[D].key, te = O[D].iv;
    else if (q[D])
      V = q[D].key * 8, te = q[D].iv;
    else
      throw new TypeError("invalid suite type");
    var ie = X(Q, !1, V, te);
    return U(D, ie.key, ie.iv);
  }
  function l(D, Q, V) {
    if (D = D.toLowerCase(), O[D]) return c.createCipheriv(D, Q, V);
    if (q[D]) return new P({ key: Q, iv: V, mode: D });
    throw new TypeError("invalid suite type");
  }
  function U(D, Q, V) {
    if (D = D.toLowerCase(), O[D]) return c.createDecipheriv(D, Q, V);
    if (q[D]) return new P({ key: Q, iv: V, mode: D, decrypt: !0 });
    throw new TypeError("invalid suite type");
  }
  function $() {
    return Object.keys(q).concat(c.getCiphers());
  }
  return browser$6.createCipher = browser$6.Cipher = t, browser$6.createCipheriv = browser$6.Cipheriv = l, browser$6.createDecipher = browser$6.Decipher = F, browser$6.createDecipheriv = browser$6.Decipheriv = U, browser$6.listCiphers = browser$6.getCiphers = $, browser$6;
}
var browser$4 = {}, bn$2 = { exports: {} }, hasRequiredBn$2;
function requireBn$2() {
  return hasRequiredBn$2 || (hasRequiredBn$2 = 1, function(P) {
    (function(c, O) {
      function q(K, ee) {
        if (!K) throw new Error(ee || "Assertion failed");
      }
      function X(K, ee) {
        K.super_ = ee;
        var e = function() {
        };
        e.prototype = ee.prototype, K.prototype = new e(), K.prototype.constructor = K;
      }
      function t(K, ee, e) {
        if (t.isBN(K))
          return K;
        this.negative = 0, this.words = null, this.length = 0, this.red = null, K !== null && ((ee === "le" || ee === "be") && (e = ee, ee = 10), this._init(K || 0, ee || 10, e || "be"));
      }
      typeof c == "object" ? c.exports = t : O.BN = t, t.BN = t, t.wordSize = 26;
      var F;
      try {
        typeof window != "undefined" && typeof window.Buffer != "undefined" ? F = window.Buffer : F = requireBuffer$1().Buffer;
      } catch (K) {
      }
      t.isBN = function(K) {
        return K instanceof t ? !0 : K !== null && typeof K == "object" && K.constructor.wordSize === t.wordSize && Array.isArray(K.words);
      }, t.max = function(K, ee) {
        return K.cmp(ee) > 0 ? K : ee;
      }, t.min = function(K, ee) {
        return K.cmp(ee) < 0 ? K : ee;
      }, t.prototype._init = function(K, ee, e) {
        if (typeof K == "number")
          return this._initNumber(K, ee, e);
        if (typeof K == "object")
          return this._initArray(K, ee, e);
        ee === "hex" && (ee = 16), q(ee === (ee | 0) && ee >= 2 && ee <= 36), K = K.toString().replace(/\s+/g, "");
        var o = 0;
        K[0] === "-" && (o++, this.negative = 1), o < K.length && (ee === 16 ? this._parseHex(K, o, e) : (this._parseBase(K, ee, o), e === "le" && this._initArray(this.toArray(), ee, e)));
      }, t.prototype._initNumber = function(K, ee, e) {
        K < 0 && (this.negative = 1, K = -K), K < 67108864 ? (this.words = [K & 67108863], this.length = 1) : K < 4503599627370496 ? (this.words = [
          K & 67108863,
          K / 67108864 & 67108863
        ], this.length = 2) : (q(K < 9007199254740992), this.words = [
          K & 67108863,
          K / 67108864 & 67108863,
          1
        ], this.length = 3), e === "le" && this._initArray(this.toArray(), ee, e);
      }, t.prototype._initArray = function(K, ee, e) {
        if (q(typeof K.length == "number"), K.length <= 0)
          return this.words = [0], this.length = 1, this;
        this.length = Math.ceil(K.length / 3), this.words = new Array(this.length);
        for (var o = 0; o < this.length; o++)
          this.words[o] = 0;
        var y, H, z = 0;
        if (e === "be")
          for (o = K.length - 1, y = 0; o >= 0; o -= 3)
            H = K[o] | K[o - 1] << 8 | K[o - 2] << 16, this.words[y] |= H << z & 67108863, this.words[y + 1] = H >>> 26 - z & 67108863, z += 24, z >= 26 && (z -= 26, y++);
        else if (e === "le")
          for (o = 0, y = 0; o < K.length; o += 3)
            H = K[o] | K[o + 1] << 8 | K[o + 2] << 16, this.words[y] |= H << z & 67108863, this.words[y + 1] = H >>> 26 - z & 67108863, z += 24, z >= 26 && (z -= 26, y++);
        return this.strip();
      };
      function l(K, ee) {
        var e = K.charCodeAt(ee);
        return e >= 65 && e <= 70 ? e - 55 : e >= 97 && e <= 102 ? e - 87 : e - 48 & 15;
      }
      function U(K, ee, e) {
        var o = l(K, e);
        return e - 1 >= ee && (o |= l(K, e - 1) << 4), o;
      }
      t.prototype._parseHex = function(K, ee, e) {
        this.length = Math.ceil((K.length - ee) / 6), this.words = new Array(this.length);
        for (var o = 0; o < this.length; o++)
          this.words[o] = 0;
        var y = 0, H = 0, z;
        if (e === "be")
          for (o = K.length - 1; o >= ee; o -= 2)
            z = U(K, ee, o) << y, this.words[H] |= z & 67108863, y >= 18 ? (y -= 18, H += 1, this.words[H] |= z >>> 26) : y += 8;
        else {
          var B = K.length - ee;
          for (o = B % 2 === 0 ? ee + 1 : ee; o < K.length; o += 2)
            z = U(K, ee, o) << y, this.words[H] |= z & 67108863, y >= 18 ? (y -= 18, H += 1, this.words[H] |= z >>> 26) : y += 8;
        }
        this.strip();
      };
      function $(K, ee, e, o) {
        for (var y = 0, H = Math.min(K.length, e), z = ee; z < H; z++) {
          var B = K.charCodeAt(z) - 48;
          y *= o, B >= 49 ? y += B - 49 + 10 : B >= 17 ? y += B - 17 + 10 : y += B;
        }
        return y;
      }
      t.prototype._parseBase = function(K, ee, e) {
        this.words = [0], this.length = 1;
        for (var o = 0, y = 1; y <= 67108863; y *= ee)
          o++;
        o--, y = y / ee | 0;
        for (var H = K.length - e, z = H % o, B = Math.min(H, H - z) + e, w = 0, G = e; G < B; G += o)
          w = $(K, G, G + o, ee), this.imuln(y), this.words[0] + w < 67108864 ? this.words[0] += w : this._iaddn(w);
        if (z !== 0) {
          var g = 1;
          for (w = $(K, G, K.length, ee), G = 0; G < z; G++)
            g *= ee;
          this.imuln(g), this.words[0] + w < 67108864 ? this.words[0] += w : this._iaddn(w);
        }
        this.strip();
      }, t.prototype.copy = function(K) {
        K.words = new Array(this.length);
        for (var ee = 0; ee < this.length; ee++)
          K.words[ee] = this.words[ee];
        K.length = this.length, K.negative = this.negative, K.red = this.red;
      }, t.prototype.clone = function() {
        var K = new t(null);
        return this.copy(K), K;
      }, t.prototype._expand = function(K) {
        for (; this.length < K; )
          this.words[this.length++] = 0;
        return this;
      }, t.prototype.strip = function() {
        for (; this.length > 1 && this.words[this.length - 1] === 0; )
          this.length--;
        return this._normSign();
      }, t.prototype._normSign = function() {
        return this.length === 1 && this.words[0] === 0 && (this.negative = 0), this;
      }, t.prototype.inspect = function() {
        return (this.red ? "<BN-R: " : "<BN: ") + this.toString(16) + ">";
      };
      var D = [
        "",
        "0",
        "00",
        "000",
        "0000",
        "00000",
        "000000",
        "0000000",
        "00000000",
        "000000000",
        "0000000000",
        "00000000000",
        "000000000000",
        "0000000000000",
        "00000000000000",
        "000000000000000",
        "0000000000000000",
        "00000000000000000",
        "000000000000000000",
        "0000000000000000000",
        "00000000000000000000",
        "000000000000000000000",
        "0000000000000000000000",
        "00000000000000000000000",
        "000000000000000000000000",
        "0000000000000000000000000"
      ], Q = [
        0,
        0,
        25,
        16,
        12,
        11,
        10,
        9,
        8,
        8,
        7,
        7,
        7,
        7,
        6,
        6,
        6,
        6,
        6,
        6,
        6,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5
      ], V = [
        0,
        0,
        33554432,
        43046721,
        16777216,
        48828125,
        60466176,
        40353607,
        16777216,
        43046721,
        1e7,
        19487171,
        35831808,
        62748517,
        7529536,
        11390625,
        16777216,
        24137569,
        34012224,
        47045881,
        64e6,
        4084101,
        5153632,
        6436343,
        7962624,
        9765625,
        11881376,
        14348907,
        17210368,
        20511149,
        243e5,
        28629151,
        33554432,
        39135393,
        45435424,
        52521875,
        60466176
      ];
      t.prototype.toString = function(K, ee) {
        K = K || 10, ee = ee | 0 || 1;
        var e;
        if (K === 16 || K === "hex") {
          e = "";
          for (var o = 0, y = 0, H = 0; H < this.length; H++) {
            var z = this.words[H], B = ((z << o | y) & 16777215).toString(16);
            y = z >>> 24 - o & 16777215, y !== 0 || H !== this.length - 1 ? e = D[6 - B.length] + B + e : e = B + e, o += 2, o >= 26 && (o -= 26, H--);
          }
          for (y !== 0 && (e = y.toString(16) + e); e.length % ee !== 0; )
            e = "0" + e;
          return this.negative !== 0 && (e = "-" + e), e;
        }
        if (K === (K | 0) && K >= 2 && K <= 36) {
          var w = Q[K], G = V[K];
          e = "";
          var g = this.clone();
          for (g.negative = 0; !g.isZero(); ) {
            var J = g.modn(G).toString(K);
            g = g.idivn(G), g.isZero() ? e = J + e : e = D[w - J.length] + J + e;
          }
          for (this.isZero() && (e = "0" + e); e.length % ee !== 0; )
            e = "0" + e;
          return this.negative !== 0 && (e = "-" + e), e;
        }
        q(!1, "Base should be between 2 and 36");
      }, t.prototype.toNumber = function() {
        var K = this.words[0];
        return this.length === 2 ? K += this.words[1] * 67108864 : this.length === 3 && this.words[2] === 1 ? K += 4503599627370496 + this.words[1] * 67108864 : this.length > 2 && q(!1, "Number can only safely store up to 53 bits"), this.negative !== 0 ? -K : K;
      }, t.prototype.toJSON = function() {
        return this.toString(16);
      }, t.prototype.toBuffer = function(K, ee) {
        return q(typeof F != "undefined"), this.toArrayLike(F, K, ee);
      }, t.prototype.toArray = function(K, ee) {
        return this.toArrayLike(Array, K, ee);
      }, t.prototype.toArrayLike = function(K, ee, e) {
        var o = this.byteLength(), y = e || Math.max(1, o);
        q(o <= y, "byte array longer than desired length"), q(y > 0, "Requested array length <= 0"), this.strip();
        var H = ee === "le", z = new K(y), B, w, G = this.clone();
        if (H) {
          for (w = 0; !G.isZero(); w++)
            B = G.andln(255), G.iushrn(8), z[w] = B;
          for (; w < y; w++)
            z[w] = 0;
        } else {
          for (w = 0; w < y - o; w++)
            z[w] = 0;
          for (w = 0; !G.isZero(); w++)
            B = G.andln(255), G.iushrn(8), z[y - w - 1] = B;
        }
        return z;
      }, Math.clz32 ? t.prototype._countBits = function(K) {
        return 32 - Math.clz32(K);
      } : t.prototype._countBits = function(K) {
        var ee = K, e = 0;
        return ee >= 4096 && (e += 13, ee >>>= 13), ee >= 64 && (e += 7, ee >>>= 7), ee >= 8 && (e += 4, ee >>>= 4), ee >= 2 && (e += 2, ee >>>= 2), e + ee;
      }, t.prototype._zeroBits = function(K) {
        if (K === 0) return 26;
        var ee = K, e = 0;
        return ee & 8191 || (e += 13, ee >>>= 13), ee & 127 || (e += 7, ee >>>= 7), ee & 15 || (e += 4, ee >>>= 4), ee & 3 || (e += 2, ee >>>= 2), ee & 1 || e++, e;
      }, t.prototype.bitLength = function() {
        var K = this.words[this.length - 1], ee = this._countBits(K);
        return (this.length - 1) * 26 + ee;
      };
      function te(K) {
        for (var ee = new Array(K.bitLength()), e = 0; e < ee.length; e++) {
          var o = e / 26 | 0, y = e % 26;
          ee[e] = (K.words[o] & 1 << y) >>> y;
        }
        return ee;
      }
      t.prototype.zeroBits = function() {
        if (this.isZero()) return 0;
        for (var K = 0, ee = 0; ee < this.length; ee++) {
          var e = this._zeroBits(this.words[ee]);
          if (K += e, e !== 26) break;
        }
        return K;
      }, t.prototype.byteLength = function() {
        return Math.ceil(this.bitLength() / 8);
      }, t.prototype.toTwos = function(K) {
        return this.negative !== 0 ? this.abs().inotn(K).iaddn(1) : this.clone();
      }, t.prototype.fromTwos = function(K) {
        return this.testn(K - 1) ? this.notn(K).iaddn(1).ineg() : this.clone();
      }, t.prototype.isNeg = function() {
        return this.negative !== 0;
      }, t.prototype.neg = function() {
        return this.clone().ineg();
      }, t.prototype.ineg = function() {
        return this.isZero() || (this.negative ^= 1), this;
      }, t.prototype.iuor = function(K) {
        for (; this.length < K.length; )
          this.words[this.length++] = 0;
        for (var ee = 0; ee < K.length; ee++)
          this.words[ee] = this.words[ee] | K.words[ee];
        return this.strip();
      }, t.prototype.ior = function(K) {
        return q((this.negative | K.negative) === 0), this.iuor(K);
      }, t.prototype.or = function(K) {
        return this.length > K.length ? this.clone().ior(K) : K.clone().ior(this);
      }, t.prototype.uor = function(K) {
        return this.length > K.length ? this.clone().iuor(K) : K.clone().iuor(this);
      }, t.prototype.iuand = function(K) {
        var ee;
        this.length > K.length ? ee = K : ee = this;
        for (var e = 0; e < ee.length; e++)
          this.words[e] = this.words[e] & K.words[e];
        return this.length = ee.length, this.strip();
      }, t.prototype.iand = function(K) {
        return q((this.negative | K.negative) === 0), this.iuand(K);
      }, t.prototype.and = function(K) {
        return this.length > K.length ? this.clone().iand(K) : K.clone().iand(this);
      }, t.prototype.uand = function(K) {
        return this.length > K.length ? this.clone().iuand(K) : K.clone().iuand(this);
      }, t.prototype.iuxor = function(K) {
        var ee, e;
        this.length > K.length ? (ee = this, e = K) : (ee = K, e = this);
        for (var o = 0; o < e.length; o++)
          this.words[o] = ee.words[o] ^ e.words[o];
        if (this !== ee)
          for (; o < ee.length; o++)
            this.words[o] = ee.words[o];
        return this.length = ee.length, this.strip();
      }, t.prototype.ixor = function(K) {
        return q((this.negative | K.negative) === 0), this.iuxor(K);
      }, t.prototype.xor = function(K) {
        return this.length > K.length ? this.clone().ixor(K) : K.clone().ixor(this);
      }, t.prototype.uxor = function(K) {
        return this.length > K.length ? this.clone().iuxor(K) : K.clone().iuxor(this);
      }, t.prototype.inotn = function(K) {
        q(typeof K == "number" && K >= 0);
        var ee = Math.ceil(K / 26) | 0, e = K % 26;
        this._expand(ee), e > 0 && ee--;
        for (var o = 0; o < ee; o++)
          this.words[o] = ~this.words[o] & 67108863;
        return e > 0 && (this.words[o] = ~this.words[o] & 67108863 >> 26 - e), this.strip();
      }, t.prototype.notn = function(K) {
        return this.clone().inotn(K);
      }, t.prototype.setn = function(K, ee) {
        q(typeof K == "number" && K >= 0);
        var e = K / 26 | 0, o = K % 26;
        return this._expand(e + 1), ee ? this.words[e] = this.words[e] | 1 << o : this.words[e] = this.words[e] & ~(1 << o), this.strip();
      }, t.prototype.iadd = function(K) {
        var ee;
        if (this.negative !== 0 && K.negative === 0)
          return this.negative = 0, ee = this.isub(K), this.negative ^= 1, this._normSign();
        if (this.negative === 0 && K.negative !== 0)
          return K.negative = 0, ee = this.isub(K), K.negative = 1, ee._normSign();
        var e, o;
        this.length > K.length ? (e = this, o = K) : (e = K, o = this);
        for (var y = 0, H = 0; H < o.length; H++)
          ee = (e.words[H] | 0) + (o.words[H] | 0) + y, this.words[H] = ee & 67108863, y = ee >>> 26;
        for (; y !== 0 && H < e.length; H++)
          ee = (e.words[H] | 0) + y, this.words[H] = ee & 67108863, y = ee >>> 26;
        if (this.length = e.length, y !== 0)
          this.words[this.length] = y, this.length++;
        else if (e !== this)
          for (; H < e.length; H++)
            this.words[H] = e.words[H];
        return this;
      }, t.prototype.add = function(K) {
        var ee;
        return K.negative !== 0 && this.negative === 0 ? (K.negative = 0, ee = this.sub(K), K.negative ^= 1, ee) : K.negative === 0 && this.negative !== 0 ? (this.negative = 0, ee = K.sub(this), this.negative = 1, ee) : this.length > K.length ? this.clone().iadd(K) : K.clone().iadd(this);
      }, t.prototype.isub = function(K) {
        if (K.negative !== 0) {
          K.negative = 0;
          var ee = this.iadd(K);
          return K.negative = 1, ee._normSign();
        } else if (this.negative !== 0)
          return this.negative = 0, this.iadd(K), this.negative = 1, this._normSign();
        var e = this.cmp(K);
        if (e === 0)
          return this.negative = 0, this.length = 1, this.words[0] = 0, this;
        var o, y;
        e > 0 ? (o = this, y = K) : (o = K, y = this);
        for (var H = 0, z = 0; z < y.length; z++)
          ee = (o.words[z] | 0) - (y.words[z] | 0) + H, H = ee >> 26, this.words[z] = ee & 67108863;
        for (; H !== 0 && z < o.length; z++)
          ee = (o.words[z] | 0) + H, H = ee >> 26, this.words[z] = ee & 67108863;
        if (H === 0 && z < o.length && o !== this)
          for (; z < o.length; z++)
            this.words[z] = o.words[z];
        return this.length = Math.max(this.length, z), o !== this && (this.negative = 1), this.strip();
      }, t.prototype.sub = function(K) {
        return this.clone().isub(K);
      };
      function ie(K, ee, e) {
        e.negative = ee.negative ^ K.negative;
        var o = K.length + ee.length | 0;
        e.length = o, o = o - 1 | 0;
        var y = K.words[0] | 0, H = ee.words[0] | 0, z = y * H, B = z & 67108863, w = z / 67108864 | 0;
        e.words[0] = B;
        for (var G = 1; G < o; G++) {
          for (var g = w >>> 26, J = w & 67108863, le = Math.min(G, ee.length - 1), ge = Math.max(0, G - K.length + 1); ge <= le; ge++) {
            var Se = G - ge | 0;
            y = K.words[Se] | 0, H = ee.words[ge] | 0, z = y * H + J, g += z / 67108864 | 0, J = z & 67108863;
          }
          e.words[G] = J | 0, w = g | 0;
        }
        return w !== 0 ? e.words[G] = w | 0 : e.length--, e.strip();
      }
      var ne = function(K, ee, e) {
        var o = K.words, y = ee.words, H = e.words, z = 0, B, w, G, g = o[0] | 0, J = g & 8191, le = g >>> 13, ge = o[1] | 0, Se = ge & 8191, ye = ge >>> 13, fe = o[2] | 0, he = fe & 8191, Re = fe >>> 13, ke = o[3] | 0, me = ke & 8191, ve = ke >>> 13, Ae = o[4] | 0, $e = Ae & 8191, Oe = Ae >>> 13, Y = o[5] | 0, Z = Y & 8191, re = Y >>> 13, ue = o[6] | 0, we = ue & 8191, Ee = ue >>> 13, Ie = o[7] | 0, xe = Ie & 8191, Le = Ie >>> 13, Pe = o[8] | 0, Ce = Pe & 8191, je = Pe >>> 13, Ve = o[9] | 0, Ne = Ve & 8191, ft = Ve >>> 13, Ye = y[0] | 0, De = Ye & 8191, ht = Ye >>> 13, et = y[1] | 0, Ue = et & 8191, ct = et >>> 13, tt = y[2] | 0, We = tt & 8191, lt = tt >>> 13, rt = y[3] | 0, Fe = rt & 8191, dt = rt >>> 13, it = y[4] | 0, ze = it & 8191, pt = it >>> 13, nt = y[5] | 0, Ge = nt & 8191, mt = nt >>> 13, ot = y[6] | 0, He = ot & 8191, bt = ot >>> 13, st = y[7] | 0, Ke = st & 8191, yt = st >>> 13, at = y[8] | 0, Xe = at & 8191, gt = at >>> 13, ut = y[9] | 0, Ze = ut & 8191, vt = ut >>> 13;
        e.negative = K.negative ^ ee.negative, e.length = 19, B = Math.imul(J, De), w = Math.imul(J, ht), w = w + Math.imul(le, De) | 0, G = Math.imul(le, ht);
        var Je = (z + B | 0) + ((w & 8191) << 13) | 0;
        z = (G + (w >>> 13) | 0) + (Je >>> 26) | 0, Je &= 67108863, B = Math.imul(Se, De), w = Math.imul(Se, ht), w = w + Math.imul(ye, De) | 0, G = Math.imul(ye, ht), B = B + Math.imul(J, Ue) | 0, w = w + Math.imul(J, ct) | 0, w = w + Math.imul(le, Ue) | 0, G = G + Math.imul(le, ct) | 0;
        var Qe = (z + B | 0) + ((w & 8191) << 13) | 0;
        z = (G + (w >>> 13) | 0) + (Qe >>> 26) | 0, Qe &= 67108863, B = Math.imul(he, De), w = Math.imul(he, ht), w = w + Math.imul(Re, De) | 0, G = Math.imul(Re, ht), B = B + Math.imul(Se, Ue) | 0, w = w + Math.imul(Se, ct) | 0, w = w + Math.imul(ye, Ue) | 0, G = G + Math.imul(ye, ct) | 0, B = B + Math.imul(J, We) | 0, w = w + Math.imul(J, lt) | 0, w = w + Math.imul(le, We) | 0, G = G + Math.imul(le, lt) | 0;
        var _t = (z + B | 0) + ((w & 8191) << 13) | 0;
        z = (G + (w >>> 13) | 0) + (_t >>> 26) | 0, _t &= 67108863, B = Math.imul(me, De), w = Math.imul(me, ht), w = w + Math.imul(ve, De) | 0, G = Math.imul(ve, ht), B = B + Math.imul(he, Ue) | 0, w = w + Math.imul(he, ct) | 0, w = w + Math.imul(Re, Ue) | 0, G = G + Math.imul(Re, ct) | 0, B = B + Math.imul(Se, We) | 0, w = w + Math.imul(Se, lt) | 0, w = w + Math.imul(ye, We) | 0, G = G + Math.imul(ye, lt) | 0, B = B + Math.imul(J, Fe) | 0, w = w + Math.imul(J, dt) | 0, w = w + Math.imul(le, Fe) | 0, G = G + Math.imul(le, dt) | 0;
        var Mt = (z + B | 0) + ((w & 8191) << 13) | 0;
        z = (G + (w >>> 13) | 0) + (Mt >>> 26) | 0, Mt &= 67108863, B = Math.imul($e, De), w = Math.imul($e, ht), w = w + Math.imul(Oe, De) | 0, G = Math.imul(Oe, ht), B = B + Math.imul(me, Ue) | 0, w = w + Math.imul(me, ct) | 0, w = w + Math.imul(ve, Ue) | 0, G = G + Math.imul(ve, ct) | 0, B = B + Math.imul(he, We) | 0, w = w + Math.imul(he, lt) | 0, w = w + Math.imul(Re, We) | 0, G = G + Math.imul(Re, lt) | 0, B = B + Math.imul(Se, Fe) | 0, w = w + Math.imul(Se, dt) | 0, w = w + Math.imul(ye, Fe) | 0, G = G + Math.imul(ye, dt) | 0, B = B + Math.imul(J, ze) | 0, w = w + Math.imul(J, pt) | 0, w = w + Math.imul(le, ze) | 0, G = G + Math.imul(le, pt) | 0;
        var St = (z + B | 0) + ((w & 8191) << 13) | 0;
        z = (G + (w >>> 13) | 0) + (St >>> 26) | 0, St &= 67108863, B = Math.imul(Z, De), w = Math.imul(Z, ht), w = w + Math.imul(re, De) | 0, G = Math.imul(re, ht), B = B + Math.imul($e, Ue) | 0, w = w + Math.imul($e, ct) | 0, w = w + Math.imul(Oe, Ue) | 0, G = G + Math.imul(Oe, ct) | 0, B = B + Math.imul(me, We) | 0, w = w + Math.imul(me, lt) | 0, w = w + Math.imul(ve, We) | 0, G = G + Math.imul(ve, lt) | 0, B = B + Math.imul(he, Fe) | 0, w = w + Math.imul(he, dt) | 0, w = w + Math.imul(Re, Fe) | 0, G = G + Math.imul(Re, dt) | 0, B = B + Math.imul(Se, ze) | 0, w = w + Math.imul(Se, pt) | 0, w = w + Math.imul(ye, ze) | 0, G = G + Math.imul(ye, pt) | 0, B = B + Math.imul(J, Ge) | 0, w = w + Math.imul(J, mt) | 0, w = w + Math.imul(le, Ge) | 0, G = G + Math.imul(le, mt) | 0;
        var qt = (z + B | 0) + ((w & 8191) << 13) | 0;
        z = (G + (w >>> 13) | 0) + (qt >>> 26) | 0, qt &= 67108863, B = Math.imul(we, De), w = Math.imul(we, ht), w = w + Math.imul(Ee, De) | 0, G = Math.imul(Ee, ht), B = B + Math.imul(Z, Ue) | 0, w = w + Math.imul(Z, ct) | 0, w = w + Math.imul(re, Ue) | 0, G = G + Math.imul(re, ct) | 0, B = B + Math.imul($e, We) | 0, w = w + Math.imul($e, lt) | 0, w = w + Math.imul(Oe, We) | 0, G = G + Math.imul(Oe, lt) | 0, B = B + Math.imul(me, Fe) | 0, w = w + Math.imul(me, dt) | 0, w = w + Math.imul(ve, Fe) | 0, G = G + Math.imul(ve, dt) | 0, B = B + Math.imul(he, ze) | 0, w = w + Math.imul(he, pt) | 0, w = w + Math.imul(Re, ze) | 0, G = G + Math.imul(Re, pt) | 0, B = B + Math.imul(Se, Ge) | 0, w = w + Math.imul(Se, mt) | 0, w = w + Math.imul(ye, Ge) | 0, G = G + Math.imul(ye, mt) | 0, B = B + Math.imul(J, He) | 0, w = w + Math.imul(J, bt) | 0, w = w + Math.imul(le, He) | 0, G = G + Math.imul(le, bt) | 0;
        var Et = (z + B | 0) + ((w & 8191) << 13) | 0;
        z = (G + (w >>> 13) | 0) + (Et >>> 26) | 0, Et &= 67108863, B = Math.imul(xe, De), w = Math.imul(xe, ht), w = w + Math.imul(Le, De) | 0, G = Math.imul(Le, ht), B = B + Math.imul(we, Ue) | 0, w = w + Math.imul(we, ct) | 0, w = w + Math.imul(Ee, Ue) | 0, G = G + Math.imul(Ee, ct) | 0, B = B + Math.imul(Z, We) | 0, w = w + Math.imul(Z, lt) | 0, w = w + Math.imul(re, We) | 0, G = G + Math.imul(re, lt) | 0, B = B + Math.imul($e, Fe) | 0, w = w + Math.imul($e, dt) | 0, w = w + Math.imul(Oe, Fe) | 0, G = G + Math.imul(Oe, dt) | 0, B = B + Math.imul(me, ze) | 0, w = w + Math.imul(me, pt) | 0, w = w + Math.imul(ve, ze) | 0, G = G + Math.imul(ve, pt) | 0, B = B + Math.imul(he, Ge) | 0, w = w + Math.imul(he, mt) | 0, w = w + Math.imul(Re, Ge) | 0, G = G + Math.imul(Re, mt) | 0, B = B + Math.imul(Se, He) | 0, w = w + Math.imul(Se, bt) | 0, w = w + Math.imul(ye, He) | 0, G = G + Math.imul(ye, bt) | 0, B = B + Math.imul(J, Ke) | 0, w = w + Math.imul(J, yt) | 0, w = w + Math.imul(le, Ke) | 0, G = G + Math.imul(le, yt) | 0;
        var Rt = (z + B | 0) + ((w & 8191) << 13) | 0;
        z = (G + (w >>> 13) | 0) + (Rt >>> 26) | 0, Rt &= 67108863, B = Math.imul(Ce, De), w = Math.imul(Ce, ht), w = w + Math.imul(je, De) | 0, G = Math.imul(je, ht), B = B + Math.imul(xe, Ue) | 0, w = w + Math.imul(xe, ct) | 0, w = w + Math.imul(Le, Ue) | 0, G = G + Math.imul(Le, ct) | 0, B = B + Math.imul(we, We) | 0, w = w + Math.imul(we, lt) | 0, w = w + Math.imul(Ee, We) | 0, G = G + Math.imul(Ee, lt) | 0, B = B + Math.imul(Z, Fe) | 0, w = w + Math.imul(Z, dt) | 0, w = w + Math.imul(re, Fe) | 0, G = G + Math.imul(re, dt) | 0, B = B + Math.imul($e, ze) | 0, w = w + Math.imul($e, pt) | 0, w = w + Math.imul(Oe, ze) | 0, G = G + Math.imul(Oe, pt) | 0, B = B + Math.imul(me, Ge) | 0, w = w + Math.imul(me, mt) | 0, w = w + Math.imul(ve, Ge) | 0, G = G + Math.imul(ve, mt) | 0, B = B + Math.imul(he, He) | 0, w = w + Math.imul(he, bt) | 0, w = w + Math.imul(Re, He) | 0, G = G + Math.imul(Re, bt) | 0, B = B + Math.imul(Se, Ke) | 0, w = w + Math.imul(Se, yt) | 0, w = w + Math.imul(ye, Ke) | 0, G = G + Math.imul(ye, yt) | 0, B = B + Math.imul(J, Xe) | 0, w = w + Math.imul(J, gt) | 0, w = w + Math.imul(le, Xe) | 0, G = G + Math.imul(le, gt) | 0;
        var Bt = (z + B | 0) + ((w & 8191) << 13) | 0;
        z = (G + (w >>> 13) | 0) + (Bt >>> 26) | 0, Bt &= 67108863, B = Math.imul(Ne, De), w = Math.imul(Ne, ht), w = w + Math.imul(ft, De) | 0, G = Math.imul(ft, ht), B = B + Math.imul(Ce, Ue) | 0, w = w + Math.imul(Ce, ct) | 0, w = w + Math.imul(je, Ue) | 0, G = G + Math.imul(je, ct) | 0, B = B + Math.imul(xe, We) | 0, w = w + Math.imul(xe, lt) | 0, w = w + Math.imul(Le, We) | 0, G = G + Math.imul(Le, lt) | 0, B = B + Math.imul(we, Fe) | 0, w = w + Math.imul(we, dt) | 0, w = w + Math.imul(Ee, Fe) | 0, G = G + Math.imul(Ee, dt) | 0, B = B + Math.imul(Z, ze) | 0, w = w + Math.imul(Z, pt) | 0, w = w + Math.imul(re, ze) | 0, G = G + Math.imul(re, pt) | 0, B = B + Math.imul($e, Ge) | 0, w = w + Math.imul($e, mt) | 0, w = w + Math.imul(Oe, Ge) | 0, G = G + Math.imul(Oe, mt) | 0, B = B + Math.imul(me, He) | 0, w = w + Math.imul(me, bt) | 0, w = w + Math.imul(ve, He) | 0, G = G + Math.imul(ve, bt) | 0, B = B + Math.imul(he, Ke) | 0, w = w + Math.imul(he, yt) | 0, w = w + Math.imul(Re, Ke) | 0, G = G + Math.imul(Re, yt) | 0, B = B + Math.imul(Se, Xe) | 0, w = w + Math.imul(Se, gt) | 0, w = w + Math.imul(ye, Xe) | 0, G = G + Math.imul(ye, gt) | 0, B = B + Math.imul(J, Ze) | 0, w = w + Math.imul(J, vt) | 0, w = w + Math.imul(le, Ze) | 0, G = G + Math.imul(le, vt) | 0;
        var kt = (z + B | 0) + ((w & 8191) << 13) | 0;
        z = (G + (w >>> 13) | 0) + (kt >>> 26) | 0, kt &= 67108863, B = Math.imul(Ne, Ue), w = Math.imul(Ne, ct), w = w + Math.imul(ft, Ue) | 0, G = Math.imul(ft, ct), B = B + Math.imul(Ce, We) | 0, w = w + Math.imul(Ce, lt) | 0, w = w + Math.imul(je, We) | 0, G = G + Math.imul(je, lt) | 0, B = B + Math.imul(xe, Fe) | 0, w = w + Math.imul(xe, dt) | 0, w = w + Math.imul(Le, Fe) | 0, G = G + Math.imul(Le, dt) | 0, B = B + Math.imul(we, ze) | 0, w = w + Math.imul(we, pt) | 0, w = w + Math.imul(Ee, ze) | 0, G = G + Math.imul(Ee, pt) | 0, B = B + Math.imul(Z, Ge) | 0, w = w + Math.imul(Z, mt) | 0, w = w + Math.imul(re, Ge) | 0, G = G + Math.imul(re, mt) | 0, B = B + Math.imul($e, He) | 0, w = w + Math.imul($e, bt) | 0, w = w + Math.imul(Oe, He) | 0, G = G + Math.imul(Oe, bt) | 0, B = B + Math.imul(me, Ke) | 0, w = w + Math.imul(me, yt) | 0, w = w + Math.imul(ve, Ke) | 0, G = G + Math.imul(ve, yt) | 0, B = B + Math.imul(he, Xe) | 0, w = w + Math.imul(he, gt) | 0, w = w + Math.imul(Re, Xe) | 0, G = G + Math.imul(Re, gt) | 0, B = B + Math.imul(Se, Ze) | 0, w = w + Math.imul(Se, vt) | 0, w = w + Math.imul(ye, Ze) | 0, G = G + Math.imul(ye, vt) | 0;
        var At = (z + B | 0) + ((w & 8191) << 13) | 0;
        z = (G + (w >>> 13) | 0) + (At >>> 26) | 0, At &= 67108863, B = Math.imul(Ne, We), w = Math.imul(Ne, lt), w = w + Math.imul(ft, We) | 0, G = Math.imul(ft, lt), B = B + Math.imul(Ce, Fe) | 0, w = w + Math.imul(Ce, dt) | 0, w = w + Math.imul(je, Fe) | 0, G = G + Math.imul(je, dt) | 0, B = B + Math.imul(xe, ze) | 0, w = w + Math.imul(xe, pt) | 0, w = w + Math.imul(Le, ze) | 0, G = G + Math.imul(Le, pt) | 0, B = B + Math.imul(we, Ge) | 0, w = w + Math.imul(we, mt) | 0, w = w + Math.imul(Ee, Ge) | 0, G = G + Math.imul(Ee, mt) | 0, B = B + Math.imul(Z, He) | 0, w = w + Math.imul(Z, bt) | 0, w = w + Math.imul(re, He) | 0, G = G + Math.imul(re, bt) | 0, B = B + Math.imul($e, Ke) | 0, w = w + Math.imul($e, yt) | 0, w = w + Math.imul(Oe, Ke) | 0, G = G + Math.imul(Oe, yt) | 0, B = B + Math.imul(me, Xe) | 0, w = w + Math.imul(me, gt) | 0, w = w + Math.imul(ve, Xe) | 0, G = G + Math.imul(ve, gt) | 0, B = B + Math.imul(he, Ze) | 0, w = w + Math.imul(he, vt) | 0, w = w + Math.imul(Re, Ze) | 0, G = G + Math.imul(Re, vt) | 0;
        var It = (z + B | 0) + ((w & 8191) << 13) | 0;
        z = (G + (w >>> 13) | 0) + (It >>> 26) | 0, It &= 67108863, B = Math.imul(Ne, Fe), w = Math.imul(Ne, dt), w = w + Math.imul(ft, Fe) | 0, G = Math.imul(ft, dt), B = B + Math.imul(Ce, ze) | 0, w = w + Math.imul(Ce, pt) | 0, w = w + Math.imul(je, ze) | 0, G = G + Math.imul(je, pt) | 0, B = B + Math.imul(xe, Ge) | 0, w = w + Math.imul(xe, mt) | 0, w = w + Math.imul(Le, Ge) | 0, G = G + Math.imul(Le, mt) | 0, B = B + Math.imul(we, He) | 0, w = w + Math.imul(we, bt) | 0, w = w + Math.imul(Ee, He) | 0, G = G + Math.imul(Ee, bt) | 0, B = B + Math.imul(Z, Ke) | 0, w = w + Math.imul(Z, yt) | 0, w = w + Math.imul(re, Ke) | 0, G = G + Math.imul(re, yt) | 0, B = B + Math.imul($e, Xe) | 0, w = w + Math.imul($e, gt) | 0, w = w + Math.imul(Oe, Xe) | 0, G = G + Math.imul(Oe, gt) | 0, B = B + Math.imul(me, Ze) | 0, w = w + Math.imul(me, vt) | 0, w = w + Math.imul(ve, Ze) | 0, G = G + Math.imul(ve, vt) | 0;
        var Tt = (z + B | 0) + ((w & 8191) << 13) | 0;
        z = (G + (w >>> 13) | 0) + (Tt >>> 26) | 0, Tt &= 67108863, B = Math.imul(Ne, ze), w = Math.imul(Ne, pt), w = w + Math.imul(ft, ze) | 0, G = Math.imul(ft, pt), B = B + Math.imul(Ce, Ge) | 0, w = w + Math.imul(Ce, mt) | 0, w = w + Math.imul(je, Ge) | 0, G = G + Math.imul(je, mt) | 0, B = B + Math.imul(xe, He) | 0, w = w + Math.imul(xe, bt) | 0, w = w + Math.imul(Le, He) | 0, G = G + Math.imul(Le, bt) | 0, B = B + Math.imul(we, Ke) | 0, w = w + Math.imul(we, yt) | 0, w = w + Math.imul(Ee, Ke) | 0, G = G + Math.imul(Ee, yt) | 0, B = B + Math.imul(Z, Xe) | 0, w = w + Math.imul(Z, gt) | 0, w = w + Math.imul(re, Xe) | 0, G = G + Math.imul(re, gt) | 0, B = B + Math.imul($e, Ze) | 0, w = w + Math.imul($e, vt) | 0, w = w + Math.imul(Oe, Ze) | 0, G = G + Math.imul(Oe, vt) | 0;
        var $t = (z + B | 0) + ((w & 8191) << 13) | 0;
        z = (G + (w >>> 13) | 0) + ($t >>> 26) | 0, $t &= 67108863, B = Math.imul(Ne, Ge), w = Math.imul(Ne, mt), w = w + Math.imul(ft, Ge) | 0, G = Math.imul(ft, mt), B = B + Math.imul(Ce, He) | 0, w = w + Math.imul(Ce, bt) | 0, w = w + Math.imul(je, He) | 0, G = G + Math.imul(je, bt) | 0, B = B + Math.imul(xe, Ke) | 0, w = w + Math.imul(xe, yt) | 0, w = w + Math.imul(Le, Ke) | 0, G = G + Math.imul(Le, yt) | 0, B = B + Math.imul(we, Xe) | 0, w = w + Math.imul(we, gt) | 0, w = w + Math.imul(Ee, Xe) | 0, G = G + Math.imul(Ee, gt) | 0, B = B + Math.imul(Z, Ze) | 0, w = w + Math.imul(Z, vt) | 0, w = w + Math.imul(re, Ze) | 0, G = G + Math.imul(re, vt) | 0;
        var xt = (z + B | 0) + ((w & 8191) << 13) | 0;
        z = (G + (w >>> 13) | 0) + (xt >>> 26) | 0, xt &= 67108863, B = Math.imul(Ne, He), w = Math.imul(Ne, bt), w = w + Math.imul(ft, He) | 0, G = Math.imul(ft, bt), B = B + Math.imul(Ce, Ke) | 0, w = w + Math.imul(Ce, yt) | 0, w = w + Math.imul(je, Ke) | 0, G = G + Math.imul(je, yt) | 0, B = B + Math.imul(xe, Xe) | 0, w = w + Math.imul(xe, gt) | 0, w = w + Math.imul(Le, Xe) | 0, G = G + Math.imul(Le, gt) | 0, B = B + Math.imul(we, Ze) | 0, w = w + Math.imul(we, vt) | 0, w = w + Math.imul(Ee, Ze) | 0, G = G + Math.imul(Ee, vt) | 0;
        var Ct = (z + B | 0) + ((w & 8191) << 13) | 0;
        z = (G + (w >>> 13) | 0) + (Ct >>> 26) | 0, Ct &= 67108863, B = Math.imul(Ne, Ke), w = Math.imul(Ne, yt), w = w + Math.imul(ft, Ke) | 0, G = Math.imul(ft, yt), B = B + Math.imul(Ce, Xe) | 0, w = w + Math.imul(Ce, gt) | 0, w = w + Math.imul(je, Xe) | 0, G = G + Math.imul(je, gt) | 0, B = B + Math.imul(xe, Ze) | 0, w = w + Math.imul(xe, vt) | 0, w = w + Math.imul(Le, Ze) | 0, G = G + Math.imul(Le, vt) | 0;
        var Pt = (z + B | 0) + ((w & 8191) << 13) | 0;
        z = (G + (w >>> 13) | 0) + (Pt >>> 26) | 0, Pt &= 67108863, B = Math.imul(Ne, Xe), w = Math.imul(Ne, gt), w = w + Math.imul(ft, Xe) | 0, G = Math.imul(ft, gt), B = B + Math.imul(Ce, Ze) | 0, w = w + Math.imul(Ce, vt) | 0, w = w + Math.imul(je, Ze) | 0, G = G + Math.imul(je, vt) | 0;
        var Ot = (z + B | 0) + ((w & 8191) << 13) | 0;
        z = (G + (w >>> 13) | 0) + (Ot >>> 26) | 0, Ot &= 67108863, B = Math.imul(Ne, Ze), w = Math.imul(Ne, vt), w = w + Math.imul(ft, Ze) | 0, G = Math.imul(ft, vt);
        var Lt = (z + B | 0) + ((w & 8191) << 13) | 0;
        return z = (G + (w >>> 13) | 0) + (Lt >>> 26) | 0, Lt &= 67108863, H[0] = Je, H[1] = Qe, H[2] = _t, H[3] = Mt, H[4] = St, H[5] = qt, H[6] = Et, H[7] = Rt, H[8] = Bt, H[9] = kt, H[10] = At, H[11] = It, H[12] = Tt, H[13] = $t, H[14] = xt, H[15] = Ct, H[16] = Pt, H[17] = Ot, H[18] = Lt, z !== 0 && (H[19] = z, e.length++), e;
      };
      Math.imul || (ne = ie);
      function se(K, ee, e) {
        e.negative = ee.negative ^ K.negative, e.length = K.length + ee.length;
        for (var o = 0, y = 0, H = 0; H < e.length - 1; H++) {
          var z = y;
          y = 0;
          for (var B = o & 67108863, w = Math.min(H, ee.length - 1), G = Math.max(0, H - K.length + 1); G <= w; G++) {
            var g = H - G, J = K.words[g] | 0, le = ee.words[G] | 0, ge = J * le, Se = ge & 67108863;
            z = z + (ge / 67108864 | 0) | 0, Se = Se + B | 0, B = Se & 67108863, z = z + (Se >>> 26) | 0, y += z >>> 26, z &= 67108863;
          }
          e.words[H] = B, o = z, z = y;
        }
        return o !== 0 ? e.words[H] = o : e.length--, e.strip();
      }
      function ae(K, ee, e) {
        var o = new oe();
        return o.mulp(K, ee, e);
      }
      t.prototype.mulTo = function(K, ee) {
        var e, o = this.length + K.length;
        return this.length === 10 && K.length === 10 ? e = ne(this, K, ee) : o < 63 ? e = ie(this, K, ee) : o < 1024 ? e = se(this, K, ee) : e = ae(this, K, ee), e;
      };
      function oe(K, ee) {
        this.x = K, this.y = ee;
      }
      oe.prototype.makeRBT = function(K) {
        for (var ee = new Array(K), e = t.prototype._countBits(K) - 1, o = 0; o < K; o++)
          ee[o] = this.revBin(o, e, K);
        return ee;
      }, oe.prototype.revBin = function(K, ee, e) {
        if (K === 0 || K === e - 1) return K;
        for (var o = 0, y = 0; y < ee; y++)
          o |= (K & 1) << ee - y - 1, K >>= 1;
        return o;
      }, oe.prototype.permute = function(K, ee, e, o, y, H) {
        for (var z = 0; z < H; z++)
          o[z] = ee[K[z]], y[z] = e[K[z]];
      }, oe.prototype.transform = function(K, ee, e, o, y, H) {
        this.permute(H, K, ee, e, o, y);
        for (var z = 1; z < y; z <<= 1)
          for (var B = z << 1, w = Math.cos(2 * Math.PI / B), G = Math.sin(2 * Math.PI / B), g = 0; g < y; g += B)
            for (var J = w, le = G, ge = 0; ge < z; ge++) {
              var Se = e[g + ge], ye = o[g + ge], fe = e[g + ge + z], he = o[g + ge + z], Re = J * fe - le * he;
              he = J * he + le * fe, fe = Re, e[g + ge] = Se + fe, o[g + ge] = ye + he, e[g + ge + z] = Se - fe, o[g + ge + z] = ye - he, ge !== B && (Re = w * J - G * le, le = w * le + G * J, J = Re);
            }
      }, oe.prototype.guessLen13b = function(K, ee) {
        var e = Math.max(ee, K) | 1, o = e & 1, y = 0;
        for (e = e / 2 | 0; e; e = e >>> 1)
          y++;
        return 1 << y + 1 + o;
      }, oe.prototype.conjugate = function(K, ee, e) {
        if (!(e <= 1))
          for (var o = 0; o < e / 2; o++) {
            var y = K[o];
            K[o] = K[e - o - 1], K[e - o - 1] = y, y = ee[o], ee[o] = -ee[e - o - 1], ee[e - o - 1] = -y;
          }
      }, oe.prototype.normalize13b = function(K, ee) {
        for (var e = 0, o = 0; o < ee / 2; o++) {
          var y = Math.round(K[2 * o + 1] / ee) * 8192 + Math.round(K[2 * o] / ee) + e;
          K[o] = y & 67108863, y < 67108864 ? e = 0 : e = y / 67108864 | 0;
        }
        return K;
      }, oe.prototype.convert13b = function(K, ee, e, o) {
        for (var y = 0, H = 0; H < ee; H++)
          y = y + (K[H] | 0), e[2 * H] = y & 8191, y = y >>> 13, e[2 * H + 1] = y & 8191, y = y >>> 13;
        for (H = 2 * ee; H < o; ++H)
          e[H] = 0;
        q(y === 0), q((y & -8192) === 0);
      }, oe.prototype.stub = function(K) {
        for (var ee = new Array(K), e = 0; e < K; e++)
          ee[e] = 0;
        return ee;
      }, oe.prototype.mulp = function(K, ee, e) {
        var o = 2 * this.guessLen13b(K.length, ee.length), y = this.makeRBT(o), H = this.stub(o), z = new Array(o), B = new Array(o), w = new Array(o), G = new Array(o), g = new Array(o), J = new Array(o), le = e.words;
        le.length = o, this.convert13b(K.words, K.length, z, o), this.convert13b(ee.words, ee.length, G, o), this.transform(z, H, B, w, o, y), this.transform(G, H, g, J, o, y);
        for (var ge = 0; ge < o; ge++) {
          var Se = B[ge] * g[ge] - w[ge] * J[ge];
          w[ge] = B[ge] * J[ge] + w[ge] * g[ge], B[ge] = Se;
        }
        return this.conjugate(B, w, o), this.transform(B, w, le, H, o, y), this.conjugate(le, H, o), this.normalize13b(le, o), e.negative = K.negative ^ ee.negative, e.length = K.length + ee.length, e.strip();
      }, t.prototype.mul = function(K) {
        var ee = new t(null);
        return ee.words = new Array(this.length + K.length), this.mulTo(K, ee);
      }, t.prototype.mulf = function(K) {
        var ee = new t(null);
        return ee.words = new Array(this.length + K.length), ae(this, K, ee);
      }, t.prototype.imul = function(K) {
        return this.clone().mulTo(K, this);
      }, t.prototype.imuln = function(K) {
        q(typeof K == "number"), q(K < 67108864);
        for (var ee = 0, e = 0; e < this.length; e++) {
          var o = (this.words[e] | 0) * K, y = (o & 67108863) + (ee & 67108863);
          ee >>= 26, ee += o / 67108864 | 0, ee += y >>> 26, this.words[e] = y & 67108863;
        }
        return ee !== 0 && (this.words[e] = ee, this.length++), this;
      }, t.prototype.muln = function(K) {
        return this.clone().imuln(K);
      }, t.prototype.sqr = function() {
        return this.mul(this);
      }, t.prototype.isqr = function() {
        return this.imul(this.clone());
      }, t.prototype.pow = function(K) {
        var ee = te(K);
        if (ee.length === 0) return new t(1);
        for (var e = this, o = 0; o < ee.length && ee[o] === 0; o++, e = e.sqr())
          ;
        if (++o < ee.length)
          for (var y = e.sqr(); o < ee.length; o++, y = y.sqr())
            ee[o] !== 0 && (e = e.mul(y));
        return e;
      }, t.prototype.iushln = function(K) {
        q(typeof K == "number" && K >= 0);
        var ee = K % 26, e = (K - ee) / 26, o = 67108863 >>> 26 - ee << 26 - ee, y;
        if (ee !== 0) {
          var H = 0;
          for (y = 0; y < this.length; y++) {
            var z = this.words[y] & o, B = (this.words[y] | 0) - z << ee;
            this.words[y] = B | H, H = z >>> 26 - ee;
          }
          H && (this.words[y] = H, this.length++);
        }
        if (e !== 0) {
          for (y = this.length - 1; y >= 0; y--)
            this.words[y + e] = this.words[y];
          for (y = 0; y < e; y++)
            this.words[y] = 0;
          this.length += e;
        }
        return this.strip();
      }, t.prototype.ishln = function(K) {
        return q(this.negative === 0), this.iushln(K);
      }, t.prototype.iushrn = function(K, ee, e) {
        q(typeof K == "number" && K >= 0);
        var o;
        ee ? o = (ee - ee % 26) / 26 : o = 0;
        var y = K % 26, H = Math.min((K - y) / 26, this.length), z = 67108863 ^ 67108863 >>> y << y, B = e;
        if (o -= H, o = Math.max(0, o), B) {
          for (var w = 0; w < H; w++)
            B.words[w] = this.words[w];
          B.length = H;
        }
        if (H !== 0) if (this.length > H)
          for (this.length -= H, w = 0; w < this.length; w++)
            this.words[w] = this.words[w + H];
        else
          this.words[0] = 0, this.length = 1;
        var G = 0;
        for (w = this.length - 1; w >= 0 && (G !== 0 || w >= o); w--) {
          var g = this.words[w] | 0;
          this.words[w] = G << 26 - y | g >>> y, G = g & z;
        }
        return B && G !== 0 && (B.words[B.length++] = G), this.length === 0 && (this.words[0] = 0, this.length = 1), this.strip();
      }, t.prototype.ishrn = function(K, ee, e) {
        return q(this.negative === 0), this.iushrn(K, ee, e);
      }, t.prototype.shln = function(K) {
        return this.clone().ishln(K);
      }, t.prototype.ushln = function(K) {
        return this.clone().iushln(K);
      }, t.prototype.shrn = function(K) {
        return this.clone().ishrn(K);
      }, t.prototype.ushrn = function(K) {
        return this.clone().iushrn(K);
      }, t.prototype.testn = function(K) {
        q(typeof K == "number" && K >= 0);
        var ee = K % 26, e = (K - ee) / 26, o = 1 << ee;
        if (this.length <= e) return !1;
        var y = this.words[e];
        return !!(y & o);
      }, t.prototype.imaskn = function(K) {
        q(typeof K == "number" && K >= 0);
        var ee = K % 26, e = (K - ee) / 26;
        if (q(this.negative === 0, "imaskn works only with positive numbers"), this.length <= e)
          return this;
        if (ee !== 0 && e++, this.length = Math.min(e, this.length), ee !== 0) {
          var o = 67108863 ^ 67108863 >>> ee << ee;
          this.words[this.length - 1] &= o;
        }
        return this.strip();
      }, t.prototype.maskn = function(K) {
        return this.clone().imaskn(K);
      }, t.prototype.iaddn = function(K) {
        return q(typeof K == "number"), q(K < 67108864), K < 0 ? this.isubn(-K) : this.negative !== 0 ? this.length === 1 && (this.words[0] | 0) < K ? (this.words[0] = K - (this.words[0] | 0), this.negative = 0, this) : (this.negative = 0, this.isubn(K), this.negative = 1, this) : this._iaddn(K);
      }, t.prototype._iaddn = function(K) {
        this.words[0] += K;
        for (var ee = 0; ee < this.length && this.words[ee] >= 67108864; ee++)
          this.words[ee] -= 67108864, ee === this.length - 1 ? this.words[ee + 1] = 1 : this.words[ee + 1]++;
        return this.length = Math.max(this.length, ee + 1), this;
      }, t.prototype.isubn = function(K) {
        if (q(typeof K == "number"), q(K < 67108864), K < 0) return this.iaddn(-K);
        if (this.negative !== 0)
          return this.negative = 0, this.iaddn(K), this.negative = 1, this;
        if (this.words[0] -= K, this.length === 1 && this.words[0] < 0)
          this.words[0] = -this.words[0], this.negative = 1;
        else
          for (var ee = 0; ee < this.length && this.words[ee] < 0; ee++)
            this.words[ee] += 67108864, this.words[ee + 1] -= 1;
        return this.strip();
      }, t.prototype.addn = function(K) {
        return this.clone().iaddn(K);
      }, t.prototype.subn = function(K) {
        return this.clone().isubn(K);
      }, t.prototype.iabs = function() {
        return this.negative = 0, this;
      }, t.prototype.abs = function() {
        return this.clone().iabs();
      }, t.prototype._ishlnsubmul = function(K, ee, e) {
        var o = K.length + e, y;
        this._expand(o);
        var H, z = 0;
        for (y = 0; y < K.length; y++) {
          H = (this.words[y + e] | 0) + z;
          var B = (K.words[y] | 0) * ee;
          H -= B & 67108863, z = (H >> 26) - (B / 67108864 | 0), this.words[y + e] = H & 67108863;
        }
        for (; y < this.length - e; y++)
          H = (this.words[y + e] | 0) + z, z = H >> 26, this.words[y + e] = H & 67108863;
        if (z === 0) return this.strip();
        for (q(z === -1), z = 0, y = 0; y < this.length; y++)
          H = -(this.words[y] | 0) + z, z = H >> 26, this.words[y] = H & 67108863;
        return this.negative = 1, this.strip();
      }, t.prototype._wordDiv = function(K, ee) {
        var e = this.length - K.length, o = this.clone(), y = K, H = y.words[y.length - 1] | 0, z = this._countBits(H);
        e = 26 - z, e !== 0 && (y = y.ushln(e), o.iushln(e), H = y.words[y.length - 1] | 0);
        var B = o.length - y.length, w;
        if (ee !== "mod") {
          w = new t(null), w.length = B + 1, w.words = new Array(w.length);
          for (var G = 0; G < w.length; G++)
            w.words[G] = 0;
        }
        var g = o.clone()._ishlnsubmul(y, 1, B);
        g.negative === 0 && (o = g, w && (w.words[B] = 1));
        for (var J = B - 1; J >= 0; J--) {
          var le = (o.words[y.length + J] | 0) * 67108864 + (o.words[y.length + J - 1] | 0);
          for (le = Math.min(le / H | 0, 67108863), o._ishlnsubmul(y, le, J); o.negative !== 0; )
            le--, o.negative = 0, o._ishlnsubmul(y, 1, J), o.isZero() || (o.negative ^= 1);
          w && (w.words[J] = le);
        }
        return w && w.strip(), o.strip(), ee !== "div" && e !== 0 && o.iushrn(e), {
          div: w || null,
          mod: o
        };
      }, t.prototype.divmod = function(K, ee, e) {
        if (q(!K.isZero()), this.isZero())
          return {
            div: new t(0),
            mod: new t(0)
          };
        var o, y, H;
        return this.negative !== 0 && K.negative === 0 ? (H = this.neg().divmod(K, ee), ee !== "mod" && (o = H.div.neg()), ee !== "div" && (y = H.mod.neg(), e && y.negative !== 0 && y.iadd(K)), {
          div: o,
          mod: y
        }) : this.negative === 0 && K.negative !== 0 ? (H = this.divmod(K.neg(), ee), ee !== "mod" && (o = H.div.neg()), {
          div: o,
          mod: H.mod
        }) : this.negative & K.negative ? (H = this.neg().divmod(K.neg(), ee), ee !== "div" && (y = H.mod.neg(), e && y.negative !== 0 && y.isub(K)), {
          div: H.div,
          mod: y
        }) : K.length > this.length || this.cmp(K) < 0 ? {
          div: new t(0),
          mod: this
        } : K.length === 1 ? ee === "div" ? {
          div: this.divn(K.words[0]),
          mod: null
        } : ee === "mod" ? {
          div: null,
          mod: new t(this.modn(K.words[0]))
        } : {
          div: this.divn(K.words[0]),
          mod: new t(this.modn(K.words[0]))
        } : this._wordDiv(K, ee);
      }, t.prototype.div = function(K) {
        return this.divmod(K, "div", !1).div;
      }, t.prototype.mod = function(K) {
        return this.divmod(K, "mod", !1).mod;
      }, t.prototype.umod = function(K) {
        return this.divmod(K, "mod", !0).mod;
      }, t.prototype.divRound = function(K) {
        var ee = this.divmod(K);
        if (ee.mod.isZero()) return ee.div;
        var e = ee.div.negative !== 0 ? ee.mod.isub(K) : ee.mod, o = K.ushrn(1), y = K.andln(1), H = e.cmp(o);
        return H < 0 || y === 1 && H === 0 ? ee.div : ee.div.negative !== 0 ? ee.div.isubn(1) : ee.div.iaddn(1);
      }, t.prototype.modn = function(K) {
        q(K <= 67108863);
        for (var ee = (1 << 26) % K, e = 0, o = this.length - 1; o >= 0; o--)
          e = (ee * e + (this.words[o] | 0)) % K;
        return e;
      }, t.prototype.idivn = function(K) {
        q(K <= 67108863);
        for (var ee = 0, e = this.length - 1; e >= 0; e--) {
          var o = (this.words[e] | 0) + ee * 67108864;
          this.words[e] = o / K | 0, ee = o % K;
        }
        return this.strip();
      }, t.prototype.divn = function(K) {
        return this.clone().idivn(K);
      }, t.prototype.egcd = function(K) {
        q(K.negative === 0), q(!K.isZero());
        var ee = this, e = K.clone();
        ee.negative !== 0 ? ee = ee.umod(K) : ee = ee.clone();
        for (var o = new t(1), y = new t(0), H = new t(0), z = new t(1), B = 0; ee.isEven() && e.isEven(); )
          ee.iushrn(1), e.iushrn(1), ++B;
        for (var w = e.clone(), G = ee.clone(); !ee.isZero(); ) {
          for (var g = 0, J = 1; !(ee.words[0] & J) && g < 26; ++g, J <<= 1) ;
          if (g > 0)
            for (ee.iushrn(g); g-- > 0; )
              (o.isOdd() || y.isOdd()) && (o.iadd(w), y.isub(G)), o.iushrn(1), y.iushrn(1);
          for (var le = 0, ge = 1; !(e.words[0] & ge) && le < 26; ++le, ge <<= 1) ;
          if (le > 0)
            for (e.iushrn(le); le-- > 0; )
              (H.isOdd() || z.isOdd()) && (H.iadd(w), z.isub(G)), H.iushrn(1), z.iushrn(1);
          ee.cmp(e) >= 0 ? (ee.isub(e), o.isub(H), y.isub(z)) : (e.isub(ee), H.isub(o), z.isub(y));
        }
        return {
          a: H,
          b: z,
          gcd: e.iushln(B)
        };
      }, t.prototype._invmp = function(K) {
        q(K.negative === 0), q(!K.isZero());
        var ee = this, e = K.clone();
        ee.negative !== 0 ? ee = ee.umod(K) : ee = ee.clone();
        for (var o = new t(1), y = new t(0), H = e.clone(); ee.cmpn(1) > 0 && e.cmpn(1) > 0; ) {
          for (var z = 0, B = 1; !(ee.words[0] & B) && z < 26; ++z, B <<= 1) ;
          if (z > 0)
            for (ee.iushrn(z); z-- > 0; )
              o.isOdd() && o.iadd(H), o.iushrn(1);
          for (var w = 0, G = 1; !(e.words[0] & G) && w < 26; ++w, G <<= 1) ;
          if (w > 0)
            for (e.iushrn(w); w-- > 0; )
              y.isOdd() && y.iadd(H), y.iushrn(1);
          ee.cmp(e) >= 0 ? (ee.isub(e), o.isub(y)) : (e.isub(ee), y.isub(o));
        }
        var g;
        return ee.cmpn(1) === 0 ? g = o : g = y, g.cmpn(0) < 0 && g.iadd(K), g;
      }, t.prototype.gcd = function(K) {
        if (this.isZero()) return K.abs();
        if (K.isZero()) return this.abs();
        var ee = this.clone(), e = K.clone();
        ee.negative = 0, e.negative = 0;
        for (var o = 0; ee.isEven() && e.isEven(); o++)
          ee.iushrn(1), e.iushrn(1);
        do {
          for (; ee.isEven(); )
            ee.iushrn(1);
          for (; e.isEven(); )
            e.iushrn(1);
          var y = ee.cmp(e);
          if (y < 0) {
            var H = ee;
            ee = e, e = H;
          } else if (y === 0 || e.cmpn(1) === 0)
            break;
          ee.isub(e);
        } while (!0);
        return e.iushln(o);
      }, t.prototype.invm = function(K) {
        return this.egcd(K).a.umod(K);
      }, t.prototype.isEven = function() {
        return (this.words[0] & 1) === 0;
      }, t.prototype.isOdd = function() {
        return (this.words[0] & 1) === 1;
      }, t.prototype.andln = function(K) {
        return this.words[0] & K;
      }, t.prototype.bincn = function(K) {
        q(typeof K == "number");
        var ee = K % 26, e = (K - ee) / 26, o = 1 << ee;
        if (this.length <= e)
          return this._expand(e + 1), this.words[e] |= o, this;
        for (var y = o, H = e; y !== 0 && H < this.length; H++) {
          var z = this.words[H] | 0;
          z += y, y = z >>> 26, z &= 67108863, this.words[H] = z;
        }
        return y !== 0 && (this.words[H] = y, this.length++), this;
      }, t.prototype.isZero = function() {
        return this.length === 1 && this.words[0] === 0;
      }, t.prototype.cmpn = function(K) {
        var ee = K < 0;
        if (this.negative !== 0 && !ee) return -1;
        if (this.negative === 0 && ee) return 1;
        this.strip();
        var e;
        if (this.length > 1)
          e = 1;
        else {
          ee && (K = -K), q(K <= 67108863, "Number is too big");
          var o = this.words[0] | 0;
          e = o === K ? 0 : o < K ? -1 : 1;
        }
        return this.negative !== 0 ? -e | 0 : e;
      }, t.prototype.cmp = function(K) {
        if (this.negative !== 0 && K.negative === 0) return -1;
        if (this.negative === 0 && K.negative !== 0) return 1;
        var ee = this.ucmp(K);
        return this.negative !== 0 ? -ee | 0 : ee;
      }, t.prototype.ucmp = function(K) {
        if (this.length > K.length) return 1;
        if (this.length < K.length) return -1;
        for (var ee = 0, e = this.length - 1; e >= 0; e--) {
          var o = this.words[e] | 0, y = K.words[e] | 0;
          if (o !== y) {
            o < y ? ee = -1 : o > y && (ee = 1);
            break;
          }
        }
        return ee;
      }, t.prototype.gtn = function(K) {
        return this.cmpn(K) === 1;
      }, t.prototype.gt = function(K) {
        return this.cmp(K) === 1;
      }, t.prototype.gten = function(K) {
        return this.cmpn(K) >= 0;
      }, t.prototype.gte = function(K) {
        return this.cmp(K) >= 0;
      }, t.prototype.ltn = function(K) {
        return this.cmpn(K) === -1;
      }, t.prototype.lt = function(K) {
        return this.cmp(K) === -1;
      }, t.prototype.lten = function(K) {
        return this.cmpn(K) <= 0;
      }, t.prototype.lte = function(K) {
        return this.cmp(K) <= 0;
      }, t.prototype.eqn = function(K) {
        return this.cmpn(K) === 0;
      }, t.prototype.eq = function(K) {
        return this.cmp(K) === 0;
      }, t.red = function(K) {
        return new pe(K);
      }, t.prototype.toRed = function(K) {
        return q(!this.red, "Already a number in reduction context"), q(this.negative === 0, "red works only with positives"), K.convertTo(this)._forceRed(K);
      }, t.prototype.fromRed = function() {
        return q(this.red, "fromRed works only with numbers in reduction context"), this.red.convertFrom(this);
      }, t.prototype._forceRed = function(K) {
        return this.red = K, this;
      }, t.prototype.forceRed = function(K) {
        return q(!this.red, "Already a number in reduction context"), this._forceRed(K);
      }, t.prototype.redAdd = function(K) {
        return q(this.red, "redAdd works only with red numbers"), this.red.add(this, K);
      }, t.prototype.redIAdd = function(K) {
        return q(this.red, "redIAdd works only with red numbers"), this.red.iadd(this, K);
      }, t.prototype.redSub = function(K) {
        return q(this.red, "redSub works only with red numbers"), this.red.sub(this, K);
      }, t.prototype.redISub = function(K) {
        return q(this.red, "redISub works only with red numbers"), this.red.isub(this, K);
      }, t.prototype.redShl = function(K) {
        return q(this.red, "redShl works only with red numbers"), this.red.shl(this, K);
      }, t.prototype.redMul = function(K) {
        return q(this.red, "redMul works only with red numbers"), this.red._verify2(this, K), this.red.mul(this, K);
      }, t.prototype.redIMul = function(K) {
        return q(this.red, "redMul works only with red numbers"), this.red._verify2(this, K), this.red.imul(this, K);
      }, t.prototype.redSqr = function() {
        return q(this.red, "redSqr works only with red numbers"), this.red._verify1(this), this.red.sqr(this);
      }, t.prototype.redISqr = function() {
        return q(this.red, "redISqr works only with red numbers"), this.red._verify1(this), this.red.isqr(this);
      }, t.prototype.redSqrt = function() {
        return q(this.red, "redSqrt works only with red numbers"), this.red._verify1(this), this.red.sqrt(this);
      }, t.prototype.redInvm = function() {
        return q(this.red, "redInvm works only with red numbers"), this.red._verify1(this), this.red.invm(this);
      }, t.prototype.redNeg = function() {
        return q(this.red, "redNeg works only with red numbers"), this.red._verify1(this), this.red.neg(this);
      }, t.prototype.redPow = function(K) {
        return q(this.red && !K.red, "redPow(normalNum)"), this.red._verify1(this), this.red.pow(this, K);
      };
      var be = {
        k256: null,
        p224: null,
        p192: null,
        p25519: null
      };
      function de(K, ee) {
        this.name = K, this.p = new t(ee, 16), this.n = this.p.bitLength(), this.k = new t(1).iushln(this.n).isub(this.p), this.tmp = this._tmp();
      }
      de.prototype._tmp = function() {
        var K = new t(null);
        return K.words = new Array(Math.ceil(this.n / 13)), K;
      }, de.prototype.ireduce = function(K) {
        var ee = K, e;
        do
          this.split(ee, this.tmp), ee = this.imulK(ee), ee = ee.iadd(this.tmp), e = ee.bitLength();
        while (e > this.n);
        var o = e < this.n ? -1 : ee.ucmp(this.p);
        return o === 0 ? (ee.words[0] = 0, ee.length = 1) : o > 0 ? ee.isub(this.p) : ee.strip !== void 0 ? ee.strip() : ee._strip(), ee;
      }, de.prototype.split = function(K, ee) {
        K.iushrn(this.n, 0, ee);
      }, de.prototype.imulK = function(K) {
        return K.imul(this.k);
      };
      function _e() {
        de.call(
          this,
          "k256",
          "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f"
        );
      }
      X(_e, de), _e.prototype.split = function(K, ee) {
        for (var e = 4194303, o = Math.min(K.length, 9), y = 0; y < o; y++)
          ee.words[y] = K.words[y];
        if (ee.length = o, K.length <= 9) {
          K.words[0] = 0, K.length = 1;
          return;
        }
        var H = K.words[9];
        for (ee.words[ee.length++] = H & e, y = 10; y < K.length; y++) {
          var z = K.words[y] | 0;
          K.words[y - 10] = (z & e) << 4 | H >>> 22, H = z;
        }
        H >>>= 22, K.words[y - 10] = H, H === 0 && K.length > 10 ? K.length -= 10 : K.length -= 9;
      }, _e.prototype.imulK = function(K) {
        K.words[K.length] = 0, K.words[K.length + 1] = 0, K.length += 2;
        for (var ee = 0, e = 0; e < K.length; e++) {
          var o = K.words[e] | 0;
          ee += o * 977, K.words[e] = ee & 67108863, ee = o * 64 + (ee / 67108864 | 0);
        }
        return K.words[K.length - 1] === 0 && (K.length--, K.words[K.length - 1] === 0 && K.length--), K;
      };
      function qe() {
        de.call(
          this,
          "p224",
          "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001"
        );
      }
      X(qe, de);
      function Te() {
        de.call(
          this,
          "p192",
          "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff"
        );
      }
      X(Te, de);
      function ce() {
        de.call(
          this,
          "25519",
          "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed"
        );
      }
      X(ce, de), ce.prototype.imulK = function(K) {
        for (var ee = 0, e = 0; e < K.length; e++) {
          var o = (K.words[e] | 0) * 19 + ee, y = o & 67108863;
          o >>>= 26, K.words[e] = y, ee = o;
        }
        return ee !== 0 && (K.words[K.length++] = ee), K;
      }, t._prime = function(K) {
        if (be[K]) return be[K];
        var ee;
        if (K === "k256")
          ee = new _e();
        else if (K === "p224")
          ee = new qe();
        else if (K === "p192")
          ee = new Te();
        else if (K === "p25519")
          ee = new ce();
        else
          throw new Error("Unknown prime " + K);
        return be[K] = ee, ee;
      };
      function pe(K) {
        if (typeof K == "string") {
          var ee = t._prime(K);
          this.m = ee.p, this.prime = ee;
        } else
          q(K.gtn(1), "modulus must be greater than 1"), this.m = K, this.prime = null;
      }
      pe.prototype._verify1 = function(K) {
        q(K.negative === 0, "red works only with positives"), q(K.red, "red works only with red numbers");
      }, pe.prototype._verify2 = function(K, ee) {
        q((K.negative | ee.negative) === 0, "red works only with positives"), q(
          K.red && K.red === ee.red,
          "red works only with red numbers"
        );
      }, pe.prototype.imod = function(K) {
        return this.prime ? this.prime.ireduce(K)._forceRed(this) : K.umod(this.m)._forceRed(this);
      }, pe.prototype.neg = function(K) {
        return K.isZero() ? K.clone() : this.m.sub(K)._forceRed(this);
      }, pe.prototype.add = function(K, ee) {
        this._verify2(K, ee);
        var e = K.add(ee);
        return e.cmp(this.m) >= 0 && e.isub(this.m), e._forceRed(this);
      }, pe.prototype.iadd = function(K, ee) {
        this._verify2(K, ee);
        var e = K.iadd(ee);
        return e.cmp(this.m) >= 0 && e.isub(this.m), e;
      }, pe.prototype.sub = function(K, ee) {
        this._verify2(K, ee);
        var e = K.sub(ee);
        return e.cmpn(0) < 0 && e.iadd(this.m), e._forceRed(this);
      }, pe.prototype.isub = function(K, ee) {
        this._verify2(K, ee);
        var e = K.isub(ee);
        return e.cmpn(0) < 0 && e.iadd(this.m), e;
      }, pe.prototype.shl = function(K, ee) {
        return this._verify1(K), this.imod(K.ushln(ee));
      }, pe.prototype.imul = function(K, ee) {
        return this._verify2(K, ee), this.imod(K.imul(ee));
      }, pe.prototype.mul = function(K, ee) {
        return this._verify2(K, ee), this.imod(K.mul(ee));
      }, pe.prototype.isqr = function(K) {
        return this.imul(K, K.clone());
      }, pe.prototype.sqr = function(K) {
        return this.mul(K, K);
      }, pe.prototype.sqrt = function(K) {
        if (K.isZero()) return K.clone();
        var ee = this.m.andln(3);
        if (q(ee % 2 === 1), ee === 3) {
          var e = this.m.add(new t(1)).iushrn(2);
          return this.pow(K, e);
        }
        for (var o = this.m.subn(1), y = 0; !o.isZero() && o.andln(1) === 0; )
          y++, o.iushrn(1);
        q(!o.isZero());
        var H = new t(1).toRed(this), z = H.redNeg(), B = this.m.subn(1).iushrn(1), w = this.m.bitLength();
        for (w = new t(2 * w * w).toRed(this); this.pow(w, B).cmp(z) !== 0; )
          w.redIAdd(z);
        for (var G = this.pow(w, o), g = this.pow(K, o.addn(1).iushrn(1)), J = this.pow(K, o), le = y; J.cmp(H) !== 0; ) {
          for (var ge = J, Se = 0; ge.cmp(H) !== 0; Se++)
            ge = ge.redSqr();
          q(Se < le);
          var ye = this.pow(G, new t(1).iushln(le - Se - 1));
          g = g.redMul(ye), G = ye.redSqr(), J = J.redMul(G), le = Se;
        }
        return g;
      }, pe.prototype.invm = function(K) {
        var ee = K._invmp(this.m);
        return ee.negative !== 0 ? (ee.negative = 0, this.imod(ee).redNeg()) : this.imod(ee);
      }, pe.prototype.pow = function(K, ee) {
        if (ee.isZero()) return new t(1).toRed(this);
        if (ee.cmpn(1) === 0) return K.clone();
        var e = 4, o = new Array(1 << e);
        o[0] = new t(1).toRed(this), o[1] = K;
        for (var y = 2; y < o.length; y++)
          o[y] = this.mul(o[y - 1], K);
        var H = o[0], z = 0, B = 0, w = ee.bitLength() % 26;
        for (w === 0 && (w = 26), y = ee.length - 1; y >= 0; y--) {
          for (var G = ee.words[y], g = w - 1; g >= 0; g--) {
            var J = G >> g & 1;
            if (H !== o[0] && (H = this.sqr(H)), J === 0 && z === 0) {
              B = 0;
              continue;
            }
            z <<= 1, z |= J, B++, !(B !== e && (y !== 0 || g !== 0)) && (H = this.mul(H, o[z]), B = 0, z = 0);
          }
          w = 26;
        }
        return H;
      }, pe.prototype.convertTo = function(K) {
        var ee = K.umod(this.m);
        return ee === K ? ee.clone() : ee;
      }, pe.prototype.convertFrom = function(K) {
        var ee = K.clone();
        return ee.red = null, ee;
      }, t.mont = function(K) {
        return new Me(K);
      };
      function Me(K) {
        pe.call(this, K), this.shift = this.m.bitLength(), this.shift % 26 !== 0 && (this.shift += 26 - this.shift % 26), this.r = new t(1).iushln(this.shift), this.r2 = this.imod(this.r.sqr()), this.rinv = this.r._invmp(this.m), this.minv = this.rinv.mul(this.r).isubn(1).div(this.m), this.minv = this.minv.umod(this.r), this.minv = this.r.sub(this.minv);
      }
      X(Me, pe), Me.prototype.convertTo = function(K) {
        return this.imod(K.ushln(this.shift));
      }, Me.prototype.convertFrom = function(K) {
        var ee = this.imod(K.mul(this.rinv));
        return ee.red = null, ee;
      }, Me.prototype.imul = function(K, ee) {
        if (K.isZero() || ee.isZero())
          return K.words[0] = 0, K.length = 1, K;
        var e = K.imul(ee), o = e.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m), y = e.isub(o).iushrn(this.shift), H = y;
        return y.cmp(this.m) >= 0 ? H = y.isub(this.m) : y.cmpn(0) < 0 && (H = y.iadd(this.m)), H._forceRed(this);
      }, Me.prototype.mul = function(K, ee) {
        if (K.isZero() || ee.isZero()) return new t(0)._forceRed(this);
        var e = K.mul(ee), o = e.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m), y = e.isub(o).iushrn(this.shift), H = y;
        return y.cmp(this.m) >= 0 ? H = y.isub(this.m) : y.cmpn(0) < 0 && (H = y.iadd(this.m)), H._forceRed(this);
      }, Me.prototype.invm = function(K) {
        var ee = this.imod(K._invmp(this.m).mul(this.r2));
        return ee._forceRed(this);
      };
    })(P, commonjsGlobal);
  }(bn$2)), bn$2.exports;
}
var brorand = { exports: {} }, hasRequiredBrorand;
function requireBrorand() {
  if (hasRequiredBrorand) return brorand.exports;
  hasRequiredBrorand = 1;
  var P;
  brorand.exports = function(q) {
    return P || (P = new c(null)), P.generate(q);
  };
  function c(q) {
    this.rand = q;
  }
  if (brorand.exports.Rand = c, c.prototype.generate = function(q) {
    return this._rand(q);
  }, c.prototype._rand = function(q) {
    if (this.rand.getBytes)
      return this.rand.getBytes(q);
    for (var X = new Uint8Array(q), t = 0; t < X.length; t++)
      X[t] = this.rand.getByte();
    return X;
  }, typeof self == "object")
    self.crypto && self.crypto.getRandomValues ? c.prototype._rand = function(q) {
      var X = new Uint8Array(q);
      return self.crypto.getRandomValues(X), X;
    } : self.msCrypto && self.msCrypto.getRandomValues ? c.prototype._rand = function(q) {
      var X = new Uint8Array(q);
      return self.msCrypto.getRandomValues(X), X;
    } : typeof window == "object" && (c.prototype._rand = function() {
      throw new Error("Not implemented yet");
    });
  else
    try {
      var O = requireCryptoBrowserify();
      if (typeof O.randomBytes != "function")
        throw new Error("Not supported");
      c.prototype._rand = function(q) {
        return O.randomBytes(q);
      };
    } catch (q) {
    }
  return brorand.exports;
}
var mr, hasRequiredMr;
function requireMr() {
  if (hasRequiredMr) return mr;
  hasRequiredMr = 1;
  var P = requireBn$2(), c = requireBrorand();
  function O(q) {
    this.rand = q || new c.Rand();
  }
  return mr = O, O.create = function(q) {
    return new O(q);
  }, O.prototype._randbelow = function(q) {
    var X = q.bitLength(), t = Math.ceil(X / 8);
    do
      var F = new P(this.rand.generate(t));
    while (F.cmp(q) >= 0);
    return F;
  }, O.prototype._randrange = function(q, X) {
    var t = X.sub(q);
    return q.add(this._randbelow(t));
  }, O.prototype.test = function(q, X, t) {
    var F = q.bitLength(), l = P.mont(q), U = new P(1).toRed(l);
    X || (X = Math.max(1, F / 48 | 0));
    for (var $ = q.subn(1), D = 0; !$.testn(D); D++)
      ;
    for (var Q = q.shrn(D), V = $.toRed(l), te = !0; X > 0; X--) {
      var ie = this._randrange(new P(2), $);
      t && t(ie);
      var ne = ie.toRed(l).redPow(Q);
      if (!(ne.cmp(U) === 0 || ne.cmp(V) === 0)) {
        for (var se = 1; se < D; se++) {
          if (ne = ne.redSqr(), ne.cmp(U) === 0)
            return !1;
          if (ne.cmp(V) === 0)
            break;
        }
        if (se === D)
          return !1;
      }
    }
    return te;
  }, O.prototype.getDivisor = function(q, X) {
    var t = q.bitLength(), F = P.mont(q), l = new P(1).toRed(F);
    X || (X = Math.max(1, t / 48 | 0));
    for (var U = q.subn(1), $ = 0; !U.testn($); $++)
      ;
    for (var D = q.shrn($), Q = U.toRed(F); X > 0; X--) {
      var V = this._randrange(new P(2), U), te = q.gcd(V);
      if (te.cmpn(1) !== 0)
        return te;
      var ie = V.toRed(F).redPow(D);
      if (!(ie.cmp(l) === 0 || ie.cmp(Q) === 0)) {
        for (var ne = 1; ne < $; ne++) {
          if (ie = ie.redSqr(), ie.cmp(l) === 0)
            return ie.fromRed().subn(1).gcd(q);
          if (ie.cmp(Q) === 0)
            break;
        }
        if (ne === $)
          return ie = ie.redSqr(), ie.fromRed().subn(1).gcd(q);
      }
    }
    return !1;
  }, mr;
}
var generatePrime, hasRequiredGeneratePrime;
function requireGeneratePrime() {
  if (hasRequiredGeneratePrime) return generatePrime;
  hasRequiredGeneratePrime = 1;
  var P = requireBrowser$b();
  generatePrime = se, se.simpleSieve = ie, se.fermatTest = ne;
  var c = requireBn$2(), O = new c(24), q = requireMr(), X = new q(), t = new c(1), F = new c(2), l = new c(5);
  new c(16), new c(8);
  var U = new c(10), $ = new c(3);
  new c(7);
  var D = new c(11), Q = new c(4);
  new c(12);
  var V = null;
  function te() {
    if (V !== null)
      return V;
    var ae = 1048576, oe = [];
    oe[0] = 2;
    for (var be = 1, de = 3; de < ae; de += 2) {
      for (var _e = Math.ceil(Math.sqrt(de)), qe = 0; qe < be && oe[qe] <= _e && de % oe[qe] !== 0; qe++)
        ;
      be !== qe && oe[qe] <= _e || (oe[be++] = de);
    }
    return V = oe, oe;
  }
  function ie(ae) {
    for (var oe = te(), be = 0; be < oe.length; be++)
      if (ae.modn(oe[be]) === 0)
        return ae.cmpn(oe[be]) === 0;
    return !0;
  }
  function ne(ae) {
    var oe = c.mont(ae);
    return F.toRed(oe).redPow(ae.subn(1)).fromRed().cmpn(1) === 0;
  }
  function se(ae, oe) {
    if (ae < 16)
      return oe === 2 || oe === 5 ? new c([140, 123]) : new c([140, 39]);
    oe = new c(oe);
    for (var be, de; ; ) {
      for (be = new c(P(Math.ceil(ae / 8))); be.bitLength() > ae; )
        be.ishrn(1);
      if (be.isEven() && be.iadd(t), be.testn(1) || be.iadd(F), oe.cmp(F)) {
        if (!oe.cmp(l))
          for (; be.mod(U).cmp($); )
            be.iadd(Q);
      } else for (; be.mod(O).cmp(D); )
        be.iadd(Q);
      if (de = be.shrn(1), ie(de) && ie(be) && ne(de) && ne(be) && X.test(de) && X.test(be))
        return be;
    }
  }
  return generatePrime;
}
const modp1 = {
  gen: "02",
  prime: "ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a63a3620ffffffffffffffff"
}, modp2 = {
  gen: "02",
  prime: "ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece65381ffffffffffffffff"
}, modp5 = {
  gen: "02",
  prime: "ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca237327ffffffffffffffff"
}, modp14 = {
  gen: "02",
  prime: "ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca18217c32905e462e36ce3be39e772c180e86039b2783a2ec07a28fb5c55df06f4c52c9de2bcbf6955817183995497cea956ae515d2261898fa051015728e5a8aacaa68ffffffffffffffff"
}, modp15 = {
  gen: "02",
  prime: "ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca18217c32905e462e36ce3be39e772c180e86039b2783a2ec07a28fb5c55df06f4c52c9de2bcbf6955817183995497cea956ae515d2261898fa051015728e5a8aaac42dad33170d04507a33a85521abdf1cba64ecfb850458dbef0a8aea71575d060c7db3970f85a6e1e4c7abf5ae8cdb0933d71e8c94e04a25619dcee3d2261ad2ee6bf12ffa06d98a0864d87602733ec86a64521f2b18177b200cbbe117577a615d6c770988c0bad946e208e24fa074e5ab3143db5bfce0fd108e4b82d120a93ad2caffffffffffffffff"
}, modp16 = {
  gen: "02",
  prime: "ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca18217c32905e462e36ce3be39e772c180e86039b2783a2ec07a28fb5c55df06f4c52c9de2bcbf6955817183995497cea956ae515d2261898fa051015728e5a8aaac42dad33170d04507a33a85521abdf1cba64ecfb850458dbef0a8aea71575d060c7db3970f85a6e1e4c7abf5ae8cdb0933d71e8c94e04a25619dcee3d2261ad2ee6bf12ffa06d98a0864d87602733ec86a64521f2b18177b200cbbe117577a615d6c770988c0bad946e208e24fa074e5ab3143db5bfce0fd108e4b82d120a92108011a723c12a787e6d788719a10bdba5b2699c327186af4e23c1a946834b6150bda2583e9ca2ad44ce8dbbbc2db04de8ef92e8efc141fbecaa6287c59474e6bc05d99b2964fa090c3a2233ba186515be7ed1f612970cee2d7afb81bdd762170481cd0069127d5b05aa993b4ea988d8fddc186ffb7dc90a6c08f4df435c934063199ffffffffffffffff"
}, modp17 = {
  gen: "02",
  prime: "ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca18217c32905e462e36ce3be39e772c180e86039b2783a2ec07a28fb5c55df06f4c52c9de2bcbf6955817183995497cea956ae515d2261898fa051015728e5a8aaac42dad33170d04507a33a85521abdf1cba64ecfb850458dbef0a8aea71575d060c7db3970f85a6e1e4c7abf5ae8cdb0933d71e8c94e04a25619dcee3d2261ad2ee6bf12ffa06d98a0864d87602733ec86a64521f2b18177b200cbbe117577a615d6c770988c0bad946e208e24fa074e5ab3143db5bfce0fd108e4b82d120a92108011a723c12a787e6d788719a10bdba5b2699c327186af4e23c1a946834b6150bda2583e9ca2ad44ce8dbbbc2db04de8ef92e8efc141fbecaa6287c59474e6bc05d99b2964fa090c3a2233ba186515be7ed1f612970cee2d7afb81bdd762170481cd0069127d5b05aa993b4ea988d8fddc186ffb7dc90a6c08f4df435c93402849236c3fab4d27c7026c1d4dcb2602646dec9751e763dba37bdf8ff9406ad9e530ee5db382f413001aeb06a53ed9027d831179727b0865a8918da3edbebcf9b14ed44ce6cbaced4bb1bdb7f1447e6cc254b332051512bd7af426fb8f401378cd2bf5983ca01c64b92ecf032ea15d1721d03f482d7ce6e74fef6d55e702f46980c82b5a84031900b1c9e59e7c97fbec7e8f323a97a7e36cc88be0f1d45b7ff585ac54bd407b22b4154aacc8f6d7ebf48e1d814cc5ed20f8037e0a79715eef29be32806a1d58bb7c5da76f550aa3d8a1fbff0eb19ccb1a313d55cda56c9ec2ef29632387fe8d76e3c0468043e8f663f4860ee12bf2d5b0b7474d6e694f91e6dcc4024ffffffffffffffff"
}, modp18 = {
  gen: "02",
  prime: "ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca18217c32905e462e36ce3be39e772c180e86039b2783a2ec07a28fb5c55df06f4c52c9de2bcbf6955817183995497cea956ae515d2261898fa051015728e5a8aaac42dad33170d04507a33a85521abdf1cba64ecfb850458dbef0a8aea71575d060c7db3970f85a6e1e4c7abf5ae8cdb0933d71e8c94e04a25619dcee3d2261ad2ee6bf12ffa06d98a0864d87602733ec86a64521f2b18177b200cbbe117577a615d6c770988c0bad946e208e24fa074e5ab3143db5bfce0fd108e4b82d120a92108011a723c12a787e6d788719a10bdba5b2699c327186af4e23c1a946834b6150bda2583e9ca2ad44ce8dbbbc2db04de8ef92e8efc141fbecaa6287c59474e6bc05d99b2964fa090c3a2233ba186515be7ed1f612970cee2d7afb81bdd762170481cd0069127d5b05aa993b4ea988d8fddc186ffb7dc90a6c08f4df435c93402849236c3fab4d27c7026c1d4dcb2602646dec9751e763dba37bdf8ff9406ad9e530ee5db382f413001aeb06a53ed9027d831179727b0865a8918da3edbebcf9b14ed44ce6cbaced4bb1bdb7f1447e6cc254b332051512bd7af426fb8f401378cd2bf5983ca01c64b92ecf032ea15d1721d03f482d7ce6e74fef6d55e702f46980c82b5a84031900b1c9e59e7c97fbec7e8f323a97a7e36cc88be0f1d45b7ff585ac54bd407b22b4154aacc8f6d7ebf48e1d814cc5ed20f8037e0a79715eef29be32806a1d58bb7c5da76f550aa3d8a1fbff0eb19ccb1a313d55cda56c9ec2ef29632387fe8d76e3c0468043e8f663f4860ee12bf2d5b0b7474d6e694f91e6dbe115974a3926f12fee5e438777cb6a932df8cd8bec4d073b931ba3bc832b68d9dd300741fa7bf8afc47ed2576f6936ba424663aab639c5ae4f5683423b4742bf1c978238f16cbe39d652de3fdb8befc848ad922222e04a4037c0713eb57a81a23f0c73473fc646cea306b4bcbc8862f8385ddfa9d4b7fa2c087e879683303ed5bdd3a062b3cf5b3a278a66d2a13f83f44f82ddf310ee074ab6a364597e899a0255dc164f31cc50846851df9ab48195ded7ea1b1d510bd7ee74d73faf36bc31ecfa268359046f4eb879f924009438b481c6cd7889a002ed5ee382bc9190da6fc026e479558e4475677e9aa9e3050e2765694dfc81f56e880b96e7160c980dd98edd3dfffffffffffffffff"
}, require$$1$1 = {
  modp1,
  modp2,
  modp5,
  modp14,
  modp15,
  modp16,
  modp17,
  modp18
};
var dh, hasRequiredDh;
function requireDh() {
  if (hasRequiredDh) return dh;
  hasRequiredDh = 1;
  var P = requireBn$2(), c = requireMr(), O = new c(), q = new P(24), X = new P(11), t = new P(10), F = new P(3), l = new P(7), U = requireGeneratePrime(), $ = requireBrowser$b();
  dh = ie;
  function D(se, ae) {
    return ae = ae || "utf8", bufferExports.Buffer.isBuffer(se) || (se = new bufferExports.Buffer(se, ae)), this._pub = new P(se), this;
  }
  function Q(se, ae) {
    return ae = ae || "utf8", bufferExports.Buffer.isBuffer(se) || (se = new bufferExports.Buffer(se, ae)), this._priv = new P(se), this;
  }
  var V = {};
  function te(se, ae) {
    var oe = ae.toString("hex"), be = [oe, se.toString(16)].join("_");
    if (be in V)
      return V[be];
    var de = 0;
    if (se.isEven() || !U.simpleSieve || !U.fermatTest(se) || !O.test(se))
      return de += 1, oe === "02" || oe === "05" ? de += 8 : de += 4, V[be] = de, de;
    O.test(se.shrn(1)) || (de += 2);
    var _e;
    switch (oe) {
      case "02":
        se.mod(q).cmp(X) && (de += 8);
        break;
      case "05":
        _e = se.mod(t), _e.cmp(F) && _e.cmp(l) && (de += 8);
        break;
      default:
        de += 4;
    }
    return V[be] = de, de;
  }
  function ie(se, ae, oe) {
    this.setGenerator(ae), this.__prime = new P(se), this._prime = P.mont(this.__prime), this._primeLen = se.length, this._pub = void 0, this._priv = void 0, this._primeCode = void 0, oe ? (this.setPublicKey = D, this.setPrivateKey = Q) : this._primeCode = 8;
  }
  Object.defineProperty(ie.prototype, "verifyError", {
    enumerable: !0,
    get: function() {
      return typeof this._primeCode != "number" && (this._primeCode = te(this.__prime, this.__gen)), this._primeCode;
    }
  }), ie.prototype.generateKeys = function() {
    return this._priv || (this._priv = new P($(this._primeLen))), this._pub = this._gen.toRed(this._prime).redPow(this._priv).fromRed(), this.getPublicKey();
  }, ie.prototype.computeSecret = function(se) {
    se = new P(se), se = se.toRed(this._prime);
    var ae = se.redPow(this._priv).fromRed(), oe = new bufferExports.Buffer(ae.toArray()), be = this.getPrime();
    if (oe.length < be.length) {
      var de = new bufferExports.Buffer(be.length - oe.length);
      de.fill(0), oe = bufferExports.Buffer.concat([de, oe]);
    }
    return oe;
  }, ie.prototype.getPublicKey = function(se) {
    return ne(this._pub, se);
  }, ie.prototype.getPrivateKey = function(se) {
    return ne(this._priv, se);
  }, ie.prototype.getPrime = function(se) {
    return ne(this.__prime, se);
  }, ie.prototype.getGenerator = function(se) {
    return ne(this._gen, se);
  }, ie.prototype.setGenerator = function(se, ae) {
    return ae = ae || "utf8", bufferExports.Buffer.isBuffer(se) || (se = new bufferExports.Buffer(se, ae)), this.__gen = se, this._gen = new P(se), this;
  };
  function ne(se, ae) {
    var oe = new bufferExports.Buffer(se.toArray());
    return ae ? oe.toString(ae) : oe;
  }
  return dh;
}
var hasRequiredBrowser$4;
function requireBrowser$4() {
  if (hasRequiredBrowser$4) return browser$4;
  hasRequiredBrowser$4 = 1;
  var P = requireGeneratePrime(), c = require$$1$1, O = requireDh();
  function q(F) {
    var l = new bufferExports.Buffer(c[F].prime, "hex"), U = new bufferExports.Buffer(c[F].gen, "hex");
    return new O(l, U);
  }
  var X = {
    binary: !0,
    hex: !0,
    base64: !0
  };
  function t(F, l, U, $) {
    return bufferExports.Buffer.isBuffer(l) || X[l] === void 0 ? t(F, "binary", l, U) : (l = l || "binary", $ = $ || "binary", U = U || new bufferExports.Buffer([2]), bufferExports.Buffer.isBuffer(U) || (U = new bufferExports.Buffer(U, $)), typeof F == "number" ? new O(P(F, U), U, !0) : (bufferExports.Buffer.isBuffer(F) || (F = new bufferExports.Buffer(F, l)), new O(F, U, !0)));
  }
  return browser$4.DiffieHellmanGroup = browser$4.createDiffieHellmanGroup = browser$4.getDiffieHellman = q, browser$4.createDiffieHellman = browser$4.DiffieHellman = t, browser$4;
}
var readableBrowser = { exports: {} }, processNextickArgs = { exports: {} }, hasRequiredProcessNextickArgs;
function requireProcessNextickArgs() {
  if (hasRequiredProcessNextickArgs) return processNextickArgs.exports;
  hasRequiredProcessNextickArgs = 1, typeof process$1 == "undefined" || !process$1.version || process$1.version.indexOf("v0.") === 0 || process$1.version.indexOf("v1.") === 0 && process$1.version.indexOf("v1.8.") !== 0 ? processNextickArgs.exports = { nextTick: P } : processNextickArgs.exports = process$1;
  function P(c, O, q, X) {
    if (typeof c != "function")
      throw new TypeError('"callback" argument must be a function');
    var t = arguments.length, F, l;
    switch (t) {
      case 0:
      case 1:
        return process$1.nextTick(c);
      case 2:
        return process$1.nextTick(function() {
          c.call(null, O);
        });
      case 3:
        return process$1.nextTick(function() {
          c.call(null, O, q);
        });
      case 4:
        return process$1.nextTick(function() {
          c.call(null, O, q, X);
        });
      default:
        for (F = new Array(t - 1), l = 0; l < F.length; )
          F[l++] = arguments[l];
        return process$1.nextTick(function() {
          c.apply(null, F);
        });
    }
  }
  return processNextickArgs.exports;
}
var isarray, hasRequiredIsarray;
function requireIsarray() {
  if (hasRequiredIsarray) return isarray;
  hasRequiredIsarray = 1;
  var P = {}.toString;
  return isarray = Array.isArray || function(c) {
    return P.call(c) == "[object Array]";
  }, isarray;
}
var streamBrowser, hasRequiredStreamBrowser;
function requireStreamBrowser() {
  return hasRequiredStreamBrowser || (hasRequiredStreamBrowser = 1, streamBrowser = requireEvents().EventEmitter), streamBrowser;
}
var safeBuffer = { exports: {} }, hasRequiredSafeBuffer;
function requireSafeBuffer() {
  return hasRequiredSafeBuffer || (hasRequiredSafeBuffer = 1, function(P, c) {
    var O = requireBuffer$1(), q = O.Buffer;
    function X(F, l) {
      for (var U in F)
        l[U] = F[U];
    }
    q.from && q.alloc && q.allocUnsafe && q.allocUnsafeSlow ? P.exports = O : (X(O, c), c.Buffer = t);
    function t(F, l, U) {
      return q(F, l, U);
    }
    X(q, t), t.from = function(F, l, U) {
      if (typeof F == "number")
        throw new TypeError("Argument must not be a number");
      return q(F, l, U);
    }, t.alloc = function(F, l, U) {
      if (typeof F != "number")
        throw new TypeError("Argument must be a number");
      var $ = q(F);
      return l !== void 0 ? typeof U == "string" ? $.fill(l, U) : $.fill(l) : $.fill(0), $;
    }, t.allocUnsafe = function(F) {
      if (typeof F != "number")
        throw new TypeError("Argument must be a number");
      return q(F);
    }, t.allocUnsafeSlow = function(F) {
      if (typeof F != "number")
        throw new TypeError("Argument must be a number");
      return O.SlowBuffer(F);
    };
  }(safeBuffer, safeBuffer.exports)), safeBuffer.exports;
}
var util = {}, hasRequiredUtil;
function requireUtil() {
  if (hasRequiredUtil) return util;
  hasRequiredUtil = 1;
  function P(ne) {
    return Array.isArray ? Array.isArray(ne) : ie(ne) === "[object Array]";
  }
  util.isArray = P;
  function c(ne) {
    return typeof ne == "boolean";
  }
  util.isBoolean = c;
  function O(ne) {
    return ne === null;
  }
  util.isNull = O;
  function q(ne) {
    return ne == null;
  }
  util.isNullOrUndefined = q;
  function X(ne) {
    return typeof ne == "number";
  }
  util.isNumber = X;
  function t(ne) {
    return typeof ne == "string";
  }
  util.isString = t;
  function F(ne) {
    return typeof ne == "symbol";
  }
  util.isSymbol = F;
  function l(ne) {
    return ne === void 0;
  }
  util.isUndefined = l;
  function U(ne) {
    return ie(ne) === "[object RegExp]";
  }
  util.isRegExp = U;
  function $(ne) {
    return typeof ne == "object" && ne !== null;
  }
  util.isObject = $;
  function D(ne) {
    return ie(ne) === "[object Date]";
  }
  util.isDate = D;
  function Q(ne) {
    return ie(ne) === "[object Error]" || ne instanceof Error;
  }
  util.isError = Q;
  function V(ne) {
    return typeof ne == "function";
  }
  util.isFunction = V;
  function te(ne) {
    return ne === null || typeof ne == "boolean" || typeof ne == "number" || typeof ne == "string" || typeof ne == "symbol" || // ES6 symbol
    typeof ne == "undefined";
  }
  util.isPrimitive = te, util.isBuffer = requireBuffer$1().Buffer.isBuffer;
  function ie(ne) {
    return Object.prototype.toString.call(ne);
  }
  return util;
}
var BufferList = { exports: {} }, hasRequiredBufferList;
function requireBufferList() {
  return hasRequiredBufferList || (hasRequiredBufferList = 1, function(P) {
    function c(t, F) {
      if (!(t instanceof F))
        throw new TypeError("Cannot call a class as a function");
    }
    var O = requireSafeBuffer().Buffer, q = requireUtil$1();
    function X(t, F, l) {
      t.copy(F, l);
    }
    P.exports = function() {
      function t() {
        c(this, t), this.head = null, this.tail = null, this.length = 0;
      }
      return t.prototype.push = function(F) {
        var l = { data: F, next: null };
        this.length > 0 ? this.tail.next = l : this.head = l, this.tail = l, ++this.length;
      }, t.prototype.unshift = function(F) {
        var l = { data: F, next: this.head };
        this.length === 0 && (this.tail = l), this.head = l, ++this.length;
      }, t.prototype.shift = function() {
        if (this.length !== 0) {
          var F = this.head.data;
          return this.length === 1 ? this.head = this.tail = null : this.head = this.head.next, --this.length, F;
        }
      }, t.prototype.clear = function() {
        this.head = this.tail = null, this.length = 0;
      }, t.prototype.join = function(F) {
        if (this.length === 0) return "";
        for (var l = this.head, U = "" + l.data; l = l.next; )
          U += F + l.data;
        return U;
      }, t.prototype.concat = function(F) {
        if (this.length === 0) return O.alloc(0);
        for (var l = O.allocUnsafe(F >>> 0), U = this.head, $ = 0; U; )
          X(U.data, l, $), $ += U.data.length, U = U.next;
        return l;
      }, t;
    }(), q && q.inspect && q.inspect.custom && (P.exports.prototype[q.inspect.custom] = function() {
      var t = q.inspect({ length: this.length });
      return this.constructor.name + " " + t;
    });
  }(BufferList)), BufferList.exports;
}
var destroy_1, hasRequiredDestroy;
function requireDestroy() {
  if (hasRequiredDestroy) return destroy_1;
  hasRequiredDestroy = 1;
  var P = requireProcessNextickArgs();
  function c(X, t) {
    var F = this, l = this._readableState && this._readableState.destroyed, U = this._writableState && this._writableState.destroyed;
    return l || U ? (t ? t(X) : X && (this._writableState ? this._writableState.errorEmitted || (this._writableState.errorEmitted = !0, P.nextTick(q, this, X)) : P.nextTick(q, this, X)), this) : (this._readableState && (this._readableState.destroyed = !0), this._writableState && (this._writableState.destroyed = !0), this._destroy(X || null, function($) {
      !t && $ ? F._writableState ? F._writableState.errorEmitted || (F._writableState.errorEmitted = !0, P.nextTick(q, F, $)) : P.nextTick(q, F, $) : t && t($);
    }), this);
  }
  function O() {
    this._readableState && (this._readableState.destroyed = !1, this._readableState.reading = !1, this._readableState.ended = !1, this._readableState.endEmitted = !1), this._writableState && (this._writableState.destroyed = !1, this._writableState.ended = !1, this._writableState.ending = !1, this._writableState.finalCalled = !1, this._writableState.prefinished = !1, this._writableState.finished = !1, this._writableState.errorEmitted = !1);
  }
  function q(X, t) {
    X.emit("error", t);
  }
  return destroy_1 = {
    destroy: c,
    undestroy: O
  }, destroy_1;
}
var _stream_writable, hasRequired_stream_writable;
function require_stream_writable() {
  if (hasRequired_stream_writable) return _stream_writable;
  hasRequired_stream_writable = 1;
  var P = requireProcessNextickArgs();
  _stream_writable = ne;
  function c(z) {
    var B = this;
    this.next = null, this.entry = null, this.finish = function() {
      H(B, z);
    };
  }
  var O = !process$1.browser && ["v0.10", "v0.9."].indexOf(process$1.version.slice(0, 5)) > -1 ? setImmediate : P.nextTick, q;
  ne.WritableState = te;
  var X = Object.create(requireUtil());
  X.inherits = requireInherits_browser();
  var t = {
    deprecate: requireBrowser$a()
  }, F = requireStreamBrowser(), l = requireSafeBuffer().Buffer, U = (typeof commonjsGlobal != "undefined" ? commonjsGlobal : typeof window != "undefined" ? window : typeof self != "undefined" ? self : {}).Uint8Array || function() {
  };
  function $(z) {
    return l.from(z);
  }
  function D(z) {
    return l.isBuffer(z) || z instanceof U;
  }
  var Q = requireDestroy();
  X.inherits(ne, F);
  function V() {
  }
  function te(z, B) {
    q = q || require_stream_duplex(), z = z || {};
    var w = B instanceof q;
    this.objectMode = !!z.objectMode, w && (this.objectMode = this.objectMode || !!z.writableObjectMode);
    var G = z.highWaterMark, g = z.writableHighWaterMark, J = this.objectMode ? 16 : 16 * 1024;
    G || G === 0 ? this.highWaterMark = G : w && (g || g === 0) ? this.highWaterMark = g : this.highWaterMark = J, this.highWaterMark = Math.floor(this.highWaterMark), this.finalCalled = !1, this.needDrain = !1, this.ending = !1, this.ended = !1, this.finished = !1, this.destroyed = !1;
    var le = z.decodeStrings === !1;
    this.decodeStrings = !le, this.defaultEncoding = z.defaultEncoding || "utf8", this.length = 0, this.writing = !1, this.corked = 0, this.sync = !0, this.bufferProcessing = !1, this.onwrite = function(ge) {
      Te(B, ge);
    }, this.writecb = null, this.writelen = 0, this.bufferedRequest = null, this.lastBufferedRequest = null, this.pendingcb = 0, this.prefinished = !1, this.errorEmitted = !1, this.bufferedRequestCount = 0, this.corkedRequestsFree = new c(this);
  }
  te.prototype.getBuffer = function() {
    for (var z = this.bufferedRequest, B = []; z; )
      B.push(z), z = z.next;
    return B;
  }, function() {
    try {
      Object.defineProperty(te.prototype, "buffer", {
        get: t.deprecate(function() {
          return this.getBuffer();
        }, "_writableState.buffer is deprecated. Use _writableState.getBuffer instead.", "DEP0003")
      });
    } catch (z) {
    }
  }();
  var ie;
  typeof Symbol == "function" && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] == "function" ? (ie = Function.prototype[Symbol.hasInstance], Object.defineProperty(ne, Symbol.hasInstance, {
    value: function(z) {
      return ie.call(this, z) ? !0 : this !== ne ? !1 : z && z._writableState instanceof te;
    }
  })) : ie = function(z) {
    return z instanceof this;
  };
  function ne(z) {
    if (q = q || require_stream_duplex(), !ie.call(ne, this) && !(this instanceof q))
      return new ne(z);
    this._writableState = new te(z, this), this.writable = !0, z && (typeof z.write == "function" && (this._write = z.write), typeof z.writev == "function" && (this._writev = z.writev), typeof z.destroy == "function" && (this._destroy = z.destroy), typeof z.final == "function" && (this._final = z.final)), F.call(this);
  }
  ne.prototype.pipe = function() {
    this.emit("error", new Error("Cannot pipe, not readable"));
  };
  function se(z, B) {
    var w = new Error("write after end");
    z.emit("error", w), P.nextTick(B, w);
  }
  function ae(z, B, w, G) {
    var g = !0, J = !1;
    return w === null ? J = new TypeError("May not write null values to stream") : typeof w != "string" && w !== void 0 && !B.objectMode && (J = new TypeError("Invalid non-string/buffer chunk")), J && (z.emit("error", J), P.nextTick(G, J), g = !1), g;
  }
  ne.prototype.write = function(z, B, w) {
    var G = this._writableState, g = !1, J = !G.objectMode && D(z);
    return J && !l.isBuffer(z) && (z = $(z)), typeof B == "function" && (w = B, B = null), J ? B = "buffer" : B || (B = G.defaultEncoding), typeof w != "function" && (w = V), G.ended ? se(this, w) : (J || ae(this, G, z, w)) && (G.pendingcb++, g = be(this, G, J, z, B, w)), g;
  }, ne.prototype.cork = function() {
    var z = this._writableState;
    z.corked++;
  }, ne.prototype.uncork = function() {
    var z = this._writableState;
    z.corked && (z.corked--, !z.writing && !z.corked && !z.bufferProcessing && z.bufferedRequest && Me(this, z));
  }, ne.prototype.setDefaultEncoding = function(z) {
    if (typeof z == "string" && (z = z.toLowerCase()), !(["hex", "utf8", "utf-8", "ascii", "binary", "base64", "ucs2", "ucs-2", "utf16le", "utf-16le", "raw"].indexOf((z + "").toLowerCase()) > -1)) throw new TypeError("Unknown encoding: " + z);
    return this._writableState.defaultEncoding = z, this;
  };
  function oe(z, B, w) {
    return !z.objectMode && z.decodeStrings !== !1 && typeof B == "string" && (B = l.from(B, w)), B;
  }
  Object.defineProperty(ne.prototype, "writableHighWaterMark", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._writableState.highWaterMark;
    }
  });
  function be(z, B, w, G, g, J) {
    if (!w) {
      var le = oe(B, G, g);
      G !== le && (w = !0, g = "buffer", G = le);
    }
    var ge = B.objectMode ? 1 : G.length;
    B.length += ge;
    var Se = B.length < B.highWaterMark;
    if (Se || (B.needDrain = !0), B.writing || B.corked) {
      var ye = B.lastBufferedRequest;
      B.lastBufferedRequest = {
        chunk: G,
        encoding: g,
        isBuf: w,
        callback: J,
        next: null
      }, ye ? ye.next = B.lastBufferedRequest : B.bufferedRequest = B.lastBufferedRequest, B.bufferedRequestCount += 1;
    } else
      de(z, B, !1, ge, G, g, J);
    return Se;
  }
  function de(z, B, w, G, g, J, le) {
    B.writelen = G, B.writecb = le, B.writing = !0, B.sync = !0, w ? z._writev(g, B.onwrite) : z._write(g, J, B.onwrite), B.sync = !1;
  }
  function _e(z, B, w, G, g) {
    --B.pendingcb, w ? (P.nextTick(g, G), P.nextTick(o, z, B), z._writableState.errorEmitted = !0, z.emit("error", G)) : (g(G), z._writableState.errorEmitted = !0, z.emit("error", G), o(z, B));
  }
  function qe(z) {
    z.writing = !1, z.writecb = null, z.length -= z.writelen, z.writelen = 0;
  }
  function Te(z, B) {
    var w = z._writableState, G = w.sync, g = w.writecb;
    if (qe(w), B) _e(z, w, G, B, g);
    else {
      var J = K(w);
      !J && !w.corked && !w.bufferProcessing && w.bufferedRequest && Me(z, w), G ? O(ce, z, w, J, g) : ce(z, w, J, g);
    }
  }
  function ce(z, B, w, G) {
    w || pe(z, B), B.pendingcb--, G(), o(z, B);
  }
  function pe(z, B) {
    B.length === 0 && B.needDrain && (B.needDrain = !1, z.emit("drain"));
  }
  function Me(z, B) {
    B.bufferProcessing = !0;
    var w = B.bufferedRequest;
    if (z._writev && w && w.next) {
      var G = B.bufferedRequestCount, g = new Array(G), J = B.corkedRequestsFree;
      J.entry = w;
      for (var le = 0, ge = !0; w; )
        g[le] = w, w.isBuf || (ge = !1), w = w.next, le += 1;
      g.allBuffers = ge, de(z, B, !0, B.length, g, "", J.finish), B.pendingcb++, B.lastBufferedRequest = null, J.next ? (B.corkedRequestsFree = J.next, J.next = null) : B.corkedRequestsFree = new c(B), B.bufferedRequestCount = 0;
    } else {
      for (; w; ) {
        var Se = w.chunk, ye = w.encoding, fe = w.callback, he = B.objectMode ? 1 : Se.length;
        if (de(z, B, !1, he, Se, ye, fe), w = w.next, B.bufferedRequestCount--, B.writing)
          break;
      }
      w === null && (B.lastBufferedRequest = null);
    }
    B.bufferedRequest = w, B.bufferProcessing = !1;
  }
  ne.prototype._write = function(z, B, w) {
    w(new Error("_write() is not implemented"));
  }, ne.prototype._writev = null, ne.prototype.end = function(z, B, w) {
    var G = this._writableState;
    typeof z == "function" ? (w = z, z = null, B = null) : typeof B == "function" && (w = B, B = null), z != null && this.write(z, B), G.corked && (G.corked = 1, this.uncork()), G.ending || y(this, G, w);
  };
  function K(z) {
    return z.ending && z.length === 0 && z.bufferedRequest === null && !z.finished && !z.writing;
  }
  function ee(z, B) {
    z._final(function(w) {
      B.pendingcb--, w && z.emit("error", w), B.prefinished = !0, z.emit("prefinish"), o(z, B);
    });
  }
  function e(z, B) {
    !B.prefinished && !B.finalCalled && (typeof z._final == "function" ? (B.pendingcb++, B.finalCalled = !0, P.nextTick(ee, z, B)) : (B.prefinished = !0, z.emit("prefinish")));
  }
  function o(z, B) {
    var w = K(B);
    return w && (e(z, B), B.pendingcb === 0 && (B.finished = !0, z.emit("finish"))), w;
  }
  function y(z, B, w) {
    B.ending = !0, o(z, B), w && (B.finished ? P.nextTick(w) : z.once("finish", w)), B.ended = !0, z.writable = !1;
  }
  function H(z, B, w) {
    var G = z.entry;
    for (z.entry = null; G; ) {
      var g = G.callback;
      B.pendingcb--, g(w), G = G.next;
    }
    B.corkedRequestsFree.next = z;
  }
  return Object.defineProperty(ne.prototype, "destroyed", {
    get: function() {
      return this._writableState === void 0 ? !1 : this._writableState.destroyed;
    },
    set: function(z) {
      this._writableState && (this._writableState.destroyed = z);
    }
  }), ne.prototype.destroy = Q.destroy, ne.prototype._undestroy = Q.undestroy, ne.prototype._destroy = function(z, B) {
    this.end(), B(z);
  }, _stream_writable;
}
var _stream_duplex, hasRequired_stream_duplex;
function require_stream_duplex() {
  if (hasRequired_stream_duplex) return _stream_duplex;
  hasRequired_stream_duplex = 1;
  var P = requireProcessNextickArgs(), c = Object.keys || function(Q) {
    var V = [];
    for (var te in Q)
      V.push(te);
    return V;
  };
  _stream_duplex = U;
  var O = Object.create(requireUtil());
  O.inherits = requireInherits_browser();
  var q = require_stream_readable(), X = require_stream_writable();
  O.inherits(U, q);
  for (var t = c(X.prototype), F = 0; F < t.length; F++) {
    var l = t[F];
    U.prototype[l] || (U.prototype[l] = X.prototype[l]);
  }
  function U(Q) {
    if (!(this instanceof U)) return new U(Q);
    q.call(this, Q), X.call(this, Q), Q && Q.readable === !1 && (this.readable = !1), Q && Q.writable === !1 && (this.writable = !1), this.allowHalfOpen = !0, Q && Q.allowHalfOpen === !1 && (this.allowHalfOpen = !1), this.once("end", $);
  }
  Object.defineProperty(U.prototype, "writableHighWaterMark", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._writableState.highWaterMark;
    }
  });
  function $() {
    this.allowHalfOpen || this._writableState.ended || P.nextTick(D, this);
  }
  function D(Q) {
    Q.end();
  }
  return Object.defineProperty(U.prototype, "destroyed", {
    get: function() {
      return this._readableState === void 0 || this._writableState === void 0 ? !1 : this._readableState.destroyed && this._writableState.destroyed;
    },
    set: function(Q) {
      this._readableState === void 0 || this._writableState === void 0 || (this._readableState.destroyed = Q, this._writableState.destroyed = Q);
    }
  }), U.prototype._destroy = function(Q, V) {
    this.push(null), this.end(), P.nextTick(V, Q);
  }, _stream_duplex;
}
var _stream_readable, hasRequired_stream_readable;
function require_stream_readable() {
  if (hasRequired_stream_readable) return _stream_readable;
  hasRequired_stream_readable = 1;
  var P = requireProcessNextickArgs();
  _stream_readable = oe;
  var c = requireIsarray(), O;
  oe.ReadableState = ae, requireEvents().EventEmitter;
  var q = function(fe, he) {
    return fe.listeners(he).length;
  }, X = requireStreamBrowser(), t = requireSafeBuffer().Buffer, F = (typeof commonjsGlobal != "undefined" ? commonjsGlobal : typeof window != "undefined" ? window : typeof self != "undefined" ? self : {}).Uint8Array || function() {
  };
  function l(fe) {
    return t.from(fe);
  }
  function U(fe) {
    return t.isBuffer(fe) || fe instanceof F;
  }
  var $ = Object.create(requireUtil());
  $.inherits = requireInherits_browser();
  var D = requireUtil$1(), Q = void 0;
  D && D.debuglog ? Q = D.debuglog("stream") : Q = function() {
  };
  var V = requireBufferList(), te = requireDestroy(), ie;
  $.inherits(oe, X);
  var ne = ["error", "close", "destroy", "pause", "resume"];
  function se(fe, he, Re) {
    if (typeof fe.prependListener == "function") return fe.prependListener(he, Re);
    !fe._events || !fe._events[he] ? fe.on(he, Re) : c(fe._events[he]) ? fe._events[he].unshift(Re) : fe._events[he] = [Re, fe._events[he]];
  }
  function ae(fe, he) {
    O = O || require_stream_duplex(), fe = fe || {};
    var Re = he instanceof O;
    this.objectMode = !!fe.objectMode, Re && (this.objectMode = this.objectMode || !!fe.readableObjectMode);
    var ke = fe.highWaterMark, me = fe.readableHighWaterMark, ve = this.objectMode ? 16 : 16 * 1024;
    ke || ke === 0 ? this.highWaterMark = ke : Re && (me || me === 0) ? this.highWaterMark = me : this.highWaterMark = ve, this.highWaterMark = Math.floor(this.highWaterMark), this.buffer = new V(), this.length = 0, this.pipes = null, this.pipesCount = 0, this.flowing = null, this.ended = !1, this.endEmitted = !1, this.reading = !1, this.sync = !0, this.needReadable = !1, this.emittedReadable = !1, this.readableListening = !1, this.resumeScheduled = !1, this.destroyed = !1, this.defaultEncoding = fe.defaultEncoding || "utf8", this.awaitDrain = 0, this.readingMore = !1, this.decoder = null, this.encoding = null, fe.encoding && (ie || (ie = requireString_decoder().StringDecoder), this.decoder = new ie(fe.encoding), this.encoding = fe.encoding);
  }
  function oe(fe) {
    if (O = O || require_stream_duplex(), !(this instanceof oe)) return new oe(fe);
    this._readableState = new ae(fe, this), this.readable = !0, fe && (typeof fe.read == "function" && (this._read = fe.read), typeof fe.destroy == "function" && (this._destroy = fe.destroy)), X.call(this);
  }
  Object.defineProperty(oe.prototype, "destroyed", {
    get: function() {
      return this._readableState === void 0 ? !1 : this._readableState.destroyed;
    },
    set: function(fe) {
      this._readableState && (this._readableState.destroyed = fe);
    }
  }), oe.prototype.destroy = te.destroy, oe.prototype._undestroy = te.undestroy, oe.prototype._destroy = function(fe, he) {
    this.push(null), he(fe);
  }, oe.prototype.push = function(fe, he) {
    var Re = this._readableState, ke;
    return Re.objectMode ? ke = !0 : typeof fe == "string" && (he = he || Re.defaultEncoding, he !== Re.encoding && (fe = t.from(fe, he), he = ""), ke = !0), be(this, fe, he, !1, ke);
  }, oe.prototype.unshift = function(fe) {
    return be(this, fe, null, !0, !1);
  };
  function be(fe, he, Re, ke, me) {
    var ve = fe._readableState;
    if (he === null)
      ve.reading = !1, Me(fe, ve);
    else {
      var Ae;
      me || (Ae = _e(ve, he)), Ae ? fe.emit("error", Ae) : ve.objectMode || he && he.length > 0 ? (typeof he != "string" && !ve.objectMode && Object.getPrototypeOf(he) !== t.prototype && (he = l(he)), ke ? ve.endEmitted ? fe.emit("error", new Error("stream.unshift() after end event")) : de(fe, ve, he, !0) : ve.ended ? fe.emit("error", new Error("stream.push() after EOF")) : (ve.reading = !1, ve.decoder && !Re ? (he = ve.decoder.write(he), ve.objectMode || he.length !== 0 ? de(fe, ve, he, !1) : e(fe, ve)) : de(fe, ve, he, !1))) : ke || (ve.reading = !1);
    }
    return qe(ve);
  }
  function de(fe, he, Re, ke) {
    he.flowing && he.length === 0 && !he.sync ? (fe.emit("data", Re), fe.read(0)) : (he.length += he.objectMode ? 1 : Re.length, ke ? he.buffer.unshift(Re) : he.buffer.push(Re), he.needReadable && K(fe)), e(fe, he);
  }
  function _e(fe, he) {
    var Re;
    return !U(he) && typeof he != "string" && he !== void 0 && !fe.objectMode && (Re = new TypeError("Invalid non-string/buffer chunk")), Re;
  }
  function qe(fe) {
    return !fe.ended && (fe.needReadable || fe.length < fe.highWaterMark || fe.length === 0);
  }
  oe.prototype.isPaused = function() {
    return this._readableState.flowing === !1;
  }, oe.prototype.setEncoding = function(fe) {
    return ie || (ie = requireString_decoder().StringDecoder), this._readableState.decoder = new ie(fe), this._readableState.encoding = fe, this;
  };
  var Te = 8388608;
  function ce(fe) {
    return fe >= Te ? fe = Te : (fe--, fe |= fe >>> 1, fe |= fe >>> 2, fe |= fe >>> 4, fe |= fe >>> 8, fe |= fe >>> 16, fe++), fe;
  }
  function pe(fe, he) {
    return fe <= 0 || he.length === 0 && he.ended ? 0 : he.objectMode ? 1 : fe !== fe ? he.flowing && he.length ? he.buffer.head.data.length : he.length : (fe > he.highWaterMark && (he.highWaterMark = ce(fe)), fe <= he.length ? fe : he.ended ? he.length : (he.needReadable = !0, 0));
  }
  oe.prototype.read = function(fe) {
    Q("read", fe), fe = parseInt(fe, 10);
    var he = this._readableState, Re = fe;
    if (fe !== 0 && (he.emittedReadable = !1), fe === 0 && he.needReadable && (he.length >= he.highWaterMark || he.ended))
      return Q("read: emitReadable", he.length, he.ended), he.length === 0 && he.ended ? ge(this) : K(this), null;
    if (fe = pe(fe, he), fe === 0 && he.ended)
      return he.length === 0 && ge(this), null;
    var ke = he.needReadable;
    Q("need readable", ke), (he.length === 0 || he.length - fe < he.highWaterMark) && (ke = !0, Q("length less than watermark", ke)), he.ended || he.reading ? (ke = !1, Q("reading or ended", ke)) : ke && (Q("do read"), he.reading = !0, he.sync = !0, he.length === 0 && (he.needReadable = !0), this._read(he.highWaterMark), he.sync = !1, he.reading || (fe = pe(Re, he)));
    var me;
    return fe > 0 ? me = G(fe, he) : me = null, me === null ? (he.needReadable = !0, fe = 0) : he.length -= fe, he.length === 0 && (he.ended || (he.needReadable = !0), Re !== fe && he.ended && ge(this)), me !== null && this.emit("data", me), me;
  };
  function Me(fe, he) {
    if (!he.ended) {
      if (he.decoder) {
        var Re = he.decoder.end();
        Re && Re.length && (he.buffer.push(Re), he.length += he.objectMode ? 1 : Re.length);
      }
      he.ended = !0, K(fe);
    }
  }
  function K(fe) {
    var he = fe._readableState;
    he.needReadable = !1, he.emittedReadable || (Q("emitReadable", he.flowing), he.emittedReadable = !0, he.sync ? P.nextTick(ee, fe) : ee(fe));
  }
  function ee(fe) {
    Q("emit readable"), fe.emit("readable"), w(fe);
  }
  function e(fe, he) {
    he.readingMore || (he.readingMore = !0, P.nextTick(o, fe, he));
  }
  function o(fe, he) {
    for (var Re = he.length; !he.reading && !he.flowing && !he.ended && he.length < he.highWaterMark && (Q("maybeReadMore read 0"), fe.read(0), Re !== he.length); )
      Re = he.length;
    he.readingMore = !1;
  }
  oe.prototype._read = function(fe) {
    this.emit("error", new Error("_read() is not implemented"));
  }, oe.prototype.pipe = function(fe, he) {
    var Re = this, ke = this._readableState;
    switch (ke.pipesCount) {
      case 0:
        ke.pipes = fe;
        break;
      case 1:
        ke.pipes = [ke.pipes, fe];
        break;
      default:
        ke.pipes.push(fe);
        break;
    }
    ke.pipesCount += 1, Q("pipe count=%d opts=%j", ke.pipesCount, he);
    var me = (!he || he.end !== !1) && fe !== process$1.stdout && fe !== process$1.stderr, ve = me ? $e : xe;
    ke.endEmitted ? P.nextTick(ve) : Re.once("end", ve), fe.on("unpipe", Ae);
    function Ae(Le, Pe) {
      Q("onunpipe"), Le === Re && Pe && Pe.hasUnpiped === !1 && (Pe.hasUnpiped = !0, Z());
    }
    function $e() {
      Q("onend"), fe.end();
    }
    var Oe = y(Re);
    fe.on("drain", Oe);
    var Y = !1;
    function Z() {
      Q("cleanup"), fe.removeListener("close", Ee), fe.removeListener("finish", Ie), fe.removeListener("drain", Oe), fe.removeListener("error", we), fe.removeListener("unpipe", Ae), Re.removeListener("end", $e), Re.removeListener("end", xe), Re.removeListener("data", ue), Y = !0, ke.awaitDrain && (!fe._writableState || fe._writableState.needDrain) && Oe();
    }
    var re = !1;
    Re.on("data", ue);
    function ue(Le) {
      Q("ondata"), re = !1;
      var Pe = fe.write(Le);
      Pe === !1 && !re && ((ke.pipesCount === 1 && ke.pipes === fe || ke.pipesCount > 1 && ye(ke.pipes, fe) !== -1) && !Y && (Q("false write response, pause", ke.awaitDrain), ke.awaitDrain++, re = !0), Re.pause());
    }
    function we(Le) {
      Q("onerror", Le), xe(), fe.removeListener("error", we), q(fe, "error") === 0 && fe.emit("error", Le);
    }
    se(fe, "error", we);
    function Ee() {
      fe.removeListener("finish", Ie), xe();
    }
    fe.once("close", Ee);
    function Ie() {
      Q("onfinish"), fe.removeListener("close", Ee), xe();
    }
    fe.once("finish", Ie);
    function xe() {
      Q("unpipe"), Re.unpipe(fe);
    }
    return fe.emit("pipe", Re), ke.flowing || (Q("pipe resume"), Re.resume()), fe;
  };
  function y(fe) {
    return function() {
      var he = fe._readableState;
      Q("pipeOnDrain", he.awaitDrain), he.awaitDrain && he.awaitDrain--, he.awaitDrain === 0 && q(fe, "data") && (he.flowing = !0, w(fe));
    };
  }
  oe.prototype.unpipe = function(fe) {
    var he = this._readableState, Re = { hasUnpiped: !1 };
    if (he.pipesCount === 0) return this;
    if (he.pipesCount === 1)
      return fe && fe !== he.pipes ? this : (fe || (fe = he.pipes), he.pipes = null, he.pipesCount = 0, he.flowing = !1, fe && fe.emit("unpipe", this, Re), this);
    if (!fe) {
      var ke = he.pipes, me = he.pipesCount;
      he.pipes = null, he.pipesCount = 0, he.flowing = !1;
      for (var ve = 0; ve < me; ve++)
        ke[ve].emit("unpipe", this, { hasUnpiped: !1 });
      return this;
    }
    var Ae = ye(he.pipes, fe);
    return Ae === -1 ? this : (he.pipes.splice(Ae, 1), he.pipesCount -= 1, he.pipesCount === 1 && (he.pipes = he.pipes[0]), fe.emit("unpipe", this, Re), this);
  }, oe.prototype.on = function(fe, he) {
    var Re = X.prototype.on.call(this, fe, he);
    if (fe === "data")
      this._readableState.flowing !== !1 && this.resume();
    else if (fe === "readable") {
      var ke = this._readableState;
      !ke.endEmitted && !ke.readableListening && (ke.readableListening = ke.needReadable = !0, ke.emittedReadable = !1, ke.reading ? ke.length && K(this) : P.nextTick(H, this));
    }
    return Re;
  }, oe.prototype.addListener = oe.prototype.on;
  function H(fe) {
    Q("readable nexttick read 0"), fe.read(0);
  }
  oe.prototype.resume = function() {
    var fe = this._readableState;
    return fe.flowing || (Q("resume"), fe.flowing = !0, z(this, fe)), this;
  };
  function z(fe, he) {
    he.resumeScheduled || (he.resumeScheduled = !0, P.nextTick(B, fe, he));
  }
  function B(fe, he) {
    he.reading || (Q("resume read 0"), fe.read(0)), he.resumeScheduled = !1, he.awaitDrain = 0, fe.emit("resume"), w(fe), he.flowing && !he.reading && fe.read(0);
  }
  oe.prototype.pause = function() {
    return Q("call pause flowing=%j", this._readableState.flowing), this._readableState.flowing !== !1 && (Q("pause"), this._readableState.flowing = !1, this.emit("pause")), this;
  };
  function w(fe) {
    var he = fe._readableState;
    for (Q("flow", he.flowing); he.flowing && fe.read() !== null; )
      ;
  }
  oe.prototype.wrap = function(fe) {
    var he = this, Re = this._readableState, ke = !1;
    fe.on("end", function() {
      if (Q("wrapped end"), Re.decoder && !Re.ended) {
        var Ae = Re.decoder.end();
        Ae && Ae.length && he.push(Ae);
      }
      he.push(null);
    }), fe.on("data", function(Ae) {
      if (Q("wrapped data"), Re.decoder && (Ae = Re.decoder.write(Ae)), !(Re.objectMode && Ae == null) && !(!Re.objectMode && (!Ae || !Ae.length))) {
        var $e = he.push(Ae);
        $e || (ke = !0, fe.pause());
      }
    });
    for (var me in fe)
      this[me] === void 0 && typeof fe[me] == "function" && (this[me] = /* @__PURE__ */ function(Ae) {
        return function() {
          return fe[Ae].apply(fe, arguments);
        };
      }(me));
    for (var ve = 0; ve < ne.length; ve++)
      fe.on(ne[ve], this.emit.bind(this, ne[ve]));
    return this._read = function(Ae) {
      Q("wrapped _read", Ae), ke && (ke = !1, fe.resume());
    }, this;
  }, Object.defineProperty(oe.prototype, "readableHighWaterMark", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._readableState.highWaterMark;
    }
  }), oe._fromList = G;
  function G(fe, he) {
    if (he.length === 0) return null;
    var Re;
    return he.objectMode ? Re = he.buffer.shift() : !fe || fe >= he.length ? (he.decoder ? Re = he.buffer.join("") : he.buffer.length === 1 ? Re = he.buffer.head.data : Re = he.buffer.concat(he.length), he.buffer.clear()) : Re = g(fe, he.buffer, he.decoder), Re;
  }
  function g(fe, he, Re) {
    var ke;
    return fe < he.head.data.length ? (ke = he.head.data.slice(0, fe), he.head.data = he.head.data.slice(fe)) : fe === he.head.data.length ? ke = he.shift() : ke = Re ? J(fe, he) : le(fe, he), ke;
  }
  function J(fe, he) {
    var Re = he.head, ke = 1, me = Re.data;
    for (fe -= me.length; Re = Re.next; ) {
      var ve = Re.data, Ae = fe > ve.length ? ve.length : fe;
      if (Ae === ve.length ? me += ve : me += ve.slice(0, fe), fe -= Ae, fe === 0) {
        Ae === ve.length ? (++ke, Re.next ? he.head = Re.next : he.head = he.tail = null) : (he.head = Re, Re.data = ve.slice(Ae));
        break;
      }
      ++ke;
    }
    return he.length -= ke, me;
  }
  function le(fe, he) {
    var Re = t.allocUnsafe(fe), ke = he.head, me = 1;
    for (ke.data.copy(Re), fe -= ke.data.length; ke = ke.next; ) {
      var ve = ke.data, Ae = fe > ve.length ? ve.length : fe;
      if (ve.copy(Re, Re.length - fe, 0, Ae), fe -= Ae, fe === 0) {
        Ae === ve.length ? (++me, ke.next ? he.head = ke.next : he.head = he.tail = null) : (he.head = ke, ke.data = ve.slice(Ae));
        break;
      }
      ++me;
    }
    return he.length -= me, Re;
  }
  function ge(fe) {
    var he = fe._readableState;
    if (he.length > 0) throw new Error('"endReadable()" called on non-empty stream');
    he.endEmitted || (he.ended = !0, P.nextTick(Se, he, fe));
  }
  function Se(fe, he) {
    !fe.endEmitted && fe.length === 0 && (fe.endEmitted = !0, he.readable = !1, he.emit("end"));
  }
  function ye(fe, he) {
    for (var Re = 0, ke = fe.length; Re < ke; Re++)
      if (fe[Re] === he) return Re;
    return -1;
  }
  return _stream_readable;
}
var _stream_transform, hasRequired_stream_transform;
function require_stream_transform() {
  if (hasRequired_stream_transform) return _stream_transform;
  hasRequired_stream_transform = 1, _stream_transform = q;
  var P = require_stream_duplex(), c = Object.create(requireUtil());
  c.inherits = requireInherits_browser(), c.inherits(q, P);
  function O(F, l) {
    var U = this._transformState;
    U.transforming = !1;
    var $ = U.writecb;
    if (!$)
      return this.emit("error", new Error("write callback called multiple times"));
    U.writechunk = null, U.writecb = null, l != null && this.push(l), $(F);
    var D = this._readableState;
    D.reading = !1, (D.needReadable || D.length < D.highWaterMark) && this._read(D.highWaterMark);
  }
  function q(F) {
    if (!(this instanceof q)) return new q(F);
    P.call(this, F), this._transformState = {
      afterTransform: O.bind(this),
      needTransform: !1,
      transforming: !1,
      writecb: null,
      writechunk: null,
      writeencoding: null
    }, this._readableState.needReadable = !0, this._readableState.sync = !1, F && (typeof F.transform == "function" && (this._transform = F.transform), typeof F.flush == "function" && (this._flush = F.flush)), this.on("prefinish", X);
  }
  function X() {
    var F = this;
    typeof this._flush == "function" ? this._flush(function(l, U) {
      t(F, l, U);
    }) : t(this, null, null);
  }
  q.prototype.push = function(F, l) {
    return this._transformState.needTransform = !1, P.prototype.push.call(this, F, l);
  }, q.prototype._transform = function(F, l, U) {
    throw new Error("_transform() is not implemented");
  }, q.prototype._write = function(F, l, U) {
    var $ = this._transformState;
    if ($.writecb = U, $.writechunk = F, $.writeencoding = l, !$.transforming) {
      var D = this._readableState;
      ($.needTransform || D.needReadable || D.length < D.highWaterMark) && this._read(D.highWaterMark);
    }
  }, q.prototype._read = function(F) {
    var l = this._transformState;
    l.writechunk !== null && l.writecb && !l.transforming ? (l.transforming = !0, this._transform(l.writechunk, l.writeencoding, l.afterTransform)) : l.needTransform = !0;
  }, q.prototype._destroy = function(F, l) {
    var U = this;
    P.prototype._destroy.call(this, F, function($) {
      l($), U.emit("close");
    });
  };
  function t(F, l, U) {
    if (l) return F.emit("error", l);
    if (U != null && F.push(U), F._writableState.length) throw new Error("Calling transform done when ws.length != 0");
    if (F._transformState.transforming) throw new Error("Calling transform done when still transforming");
    return F.push(null);
  }
  return _stream_transform;
}
var _stream_passthrough, hasRequired_stream_passthrough;
function require_stream_passthrough() {
  if (hasRequired_stream_passthrough) return _stream_passthrough;
  hasRequired_stream_passthrough = 1, _stream_passthrough = O;
  var P = require_stream_transform(), c = Object.create(requireUtil());
  c.inherits = requireInherits_browser(), c.inherits(O, P);
  function O(q) {
    if (!(this instanceof O)) return new O(q);
    P.call(this, q);
  }
  return O.prototype._transform = function(q, X, t) {
    t(null, q);
  }, _stream_passthrough;
}
var hasRequiredReadableBrowser;
function requireReadableBrowser() {
  return hasRequiredReadableBrowser || (hasRequiredReadableBrowser = 1, function(P, c) {
    c = P.exports = require_stream_readable(), c.Stream = c, c.Readable = c, c.Writable = require_stream_writable(), c.Duplex = require_stream_duplex(), c.Transform = require_stream_transform(), c.PassThrough = require_stream_passthrough();
  }(readableBrowser, readableBrowser.exports)), readableBrowser.exports;
}
var sign = { exports: {} }, bn$1 = { exports: {} }, hasRequiredBn$1;
function requireBn$1() {
  return hasRequiredBn$1 || (hasRequiredBn$1 = 1, function(P) {
    (function(c, O) {
      function q(e, o) {
        if (!e) throw new Error(o || "Assertion failed");
      }
      function X(e, o) {
        e.super_ = o;
        var y = function() {
        };
        y.prototype = o.prototype, e.prototype = new y(), e.prototype.constructor = e;
      }
      function t(e, o, y) {
        if (t.isBN(e))
          return e;
        this.negative = 0, this.words = null, this.length = 0, this.red = null, e !== null && ((o === "le" || o === "be") && (y = o, o = 10), this._init(e || 0, o || 10, y || "be"));
      }
      typeof c == "object" ? c.exports = t : O.BN = t, t.BN = t, t.wordSize = 26;
      var F;
      try {
        typeof window != "undefined" && typeof window.Buffer != "undefined" ? F = window.Buffer : F = requireBuffer$1().Buffer;
      } catch (e) {
      }
      t.isBN = function(e) {
        return e instanceof t ? !0 : e !== null && typeof e == "object" && e.constructor.wordSize === t.wordSize && Array.isArray(e.words);
      }, t.max = function(e, o) {
        return e.cmp(o) > 0 ? e : o;
      }, t.min = function(e, o) {
        return e.cmp(o) < 0 ? e : o;
      }, t.prototype._init = function(e, o, y) {
        if (typeof e == "number")
          return this._initNumber(e, o, y);
        if (typeof e == "object")
          return this._initArray(e, o, y);
        o === "hex" && (o = 16), q(o === (o | 0) && o >= 2 && o <= 36), e = e.toString().replace(/\s+/g, "");
        var H = 0;
        e[0] === "-" && (H++, this.negative = 1), H < e.length && (o === 16 ? this._parseHex(e, H, y) : (this._parseBase(e, o, H), y === "le" && this._initArray(this.toArray(), o, y)));
      }, t.prototype._initNumber = function(e, o, y) {
        e < 0 && (this.negative = 1, e = -e), e < 67108864 ? (this.words = [e & 67108863], this.length = 1) : e < 4503599627370496 ? (this.words = [
          e & 67108863,
          e / 67108864 & 67108863
        ], this.length = 2) : (q(e < 9007199254740992), this.words = [
          e & 67108863,
          e / 67108864 & 67108863,
          1
        ], this.length = 3), y === "le" && this._initArray(this.toArray(), o, y);
      }, t.prototype._initArray = function(e, o, y) {
        if (q(typeof e.length == "number"), e.length <= 0)
          return this.words = [0], this.length = 1, this;
        this.length = Math.ceil(e.length / 3), this.words = new Array(this.length);
        for (var H = 0; H < this.length; H++)
          this.words[H] = 0;
        var z, B, w = 0;
        if (y === "be")
          for (H = e.length - 1, z = 0; H >= 0; H -= 3)
            B = e[H] | e[H - 1] << 8 | e[H - 2] << 16, this.words[z] |= B << w & 67108863, this.words[z + 1] = B >>> 26 - w & 67108863, w += 24, w >= 26 && (w -= 26, z++);
        else if (y === "le")
          for (H = 0, z = 0; H < e.length; H += 3)
            B = e[H] | e[H + 1] << 8 | e[H + 2] << 16, this.words[z] |= B << w & 67108863, this.words[z + 1] = B >>> 26 - w & 67108863, w += 24, w >= 26 && (w -= 26, z++);
        return this._strip();
      };
      function l(e, o) {
        var y = e.charCodeAt(o);
        if (y >= 48 && y <= 57)
          return y - 48;
        if (y >= 65 && y <= 70)
          return y - 55;
        if (y >= 97 && y <= 102)
          return y - 87;
        q(!1, "Invalid character in " + e);
      }
      function U(e, o, y) {
        var H = l(e, y);
        return y - 1 >= o && (H |= l(e, y - 1) << 4), H;
      }
      t.prototype._parseHex = function(e, o, y) {
        this.length = Math.ceil((e.length - o) / 6), this.words = new Array(this.length);
        for (var H = 0; H < this.length; H++)
          this.words[H] = 0;
        var z = 0, B = 0, w;
        if (y === "be")
          for (H = e.length - 1; H >= o; H -= 2)
            w = U(e, o, H) << z, this.words[B] |= w & 67108863, z >= 18 ? (z -= 18, B += 1, this.words[B] |= w >>> 26) : z += 8;
        else {
          var G = e.length - o;
          for (H = G % 2 === 0 ? o + 1 : o; H < e.length; H += 2)
            w = U(e, o, H) << z, this.words[B] |= w & 67108863, z >= 18 ? (z -= 18, B += 1, this.words[B] |= w >>> 26) : z += 8;
        }
        this._strip();
      };
      function $(e, o, y, H) {
        for (var z = 0, B = 0, w = Math.min(e.length, y), G = o; G < w; G++) {
          var g = e.charCodeAt(G) - 48;
          z *= H, g >= 49 ? B = g - 49 + 10 : g >= 17 ? B = g - 17 + 10 : B = g, q(g >= 0 && B < H, "Invalid character"), z += B;
        }
        return z;
      }
      t.prototype._parseBase = function(e, o, y) {
        this.words = [0], this.length = 1;
        for (var H = 0, z = 1; z <= 67108863; z *= o)
          H++;
        H--, z = z / o | 0;
        for (var B = e.length - y, w = B % H, G = Math.min(B, B - w) + y, g = 0, J = y; J < G; J += H)
          g = $(e, J, J + H, o), this.imuln(z), this.words[0] + g < 67108864 ? this.words[0] += g : this._iaddn(g);
        if (w !== 0) {
          var le = 1;
          for (g = $(e, J, e.length, o), J = 0; J < w; J++)
            le *= o;
          this.imuln(le), this.words[0] + g < 67108864 ? this.words[0] += g : this._iaddn(g);
        }
        this._strip();
      }, t.prototype.copy = function(e) {
        e.words = new Array(this.length);
        for (var o = 0; o < this.length; o++)
          e.words[o] = this.words[o];
        e.length = this.length, e.negative = this.negative, e.red = this.red;
      };
      function D(e, o) {
        e.words = o.words, e.length = o.length, e.negative = o.negative, e.red = o.red;
      }
      if (t.prototype._move = function(e) {
        D(e, this);
      }, t.prototype.clone = function() {
        var e = new t(null);
        return this.copy(e), e;
      }, t.prototype._expand = function(e) {
        for (; this.length < e; )
          this.words[this.length++] = 0;
        return this;
      }, t.prototype._strip = function() {
        for (; this.length > 1 && this.words[this.length - 1] === 0; )
          this.length--;
        return this._normSign();
      }, t.prototype._normSign = function() {
        return this.length === 1 && this.words[0] === 0 && (this.negative = 0), this;
      }, typeof Symbol != "undefined" && typeof Symbol.for == "function")
        try {
          t.prototype[Symbol.for("nodejs.util.inspect.custom")] = Q;
        } catch (e) {
          t.prototype.inspect = Q;
        }
      else
        t.prototype.inspect = Q;
      function Q() {
        return (this.red ? "<BN-R: " : "<BN: ") + this.toString(16) + ">";
      }
      var V = [
        "",
        "0",
        "00",
        "000",
        "0000",
        "00000",
        "000000",
        "0000000",
        "00000000",
        "000000000",
        "0000000000",
        "00000000000",
        "000000000000",
        "0000000000000",
        "00000000000000",
        "000000000000000",
        "0000000000000000",
        "00000000000000000",
        "000000000000000000",
        "0000000000000000000",
        "00000000000000000000",
        "000000000000000000000",
        "0000000000000000000000",
        "00000000000000000000000",
        "000000000000000000000000",
        "0000000000000000000000000"
      ], te = [
        0,
        0,
        25,
        16,
        12,
        11,
        10,
        9,
        8,
        8,
        7,
        7,
        7,
        7,
        6,
        6,
        6,
        6,
        6,
        6,
        6,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5
      ], ie = [
        0,
        0,
        33554432,
        43046721,
        16777216,
        48828125,
        60466176,
        40353607,
        16777216,
        43046721,
        1e7,
        19487171,
        35831808,
        62748517,
        7529536,
        11390625,
        16777216,
        24137569,
        34012224,
        47045881,
        64e6,
        4084101,
        5153632,
        6436343,
        7962624,
        9765625,
        11881376,
        14348907,
        17210368,
        20511149,
        243e5,
        28629151,
        33554432,
        39135393,
        45435424,
        52521875,
        60466176
      ];
      t.prototype.toString = function(e, o) {
        e = e || 10, o = o | 0 || 1;
        var y;
        if (e === 16 || e === "hex") {
          y = "";
          for (var H = 0, z = 0, B = 0; B < this.length; B++) {
            var w = this.words[B], G = ((w << H | z) & 16777215).toString(16);
            z = w >>> 24 - H & 16777215, H += 2, H >= 26 && (H -= 26, B--), z !== 0 || B !== this.length - 1 ? y = V[6 - G.length] + G + y : y = G + y;
          }
          for (z !== 0 && (y = z.toString(16) + y); y.length % o !== 0; )
            y = "0" + y;
          return this.negative !== 0 && (y = "-" + y), y;
        }
        if (e === (e | 0) && e >= 2 && e <= 36) {
          var g = te[e], J = ie[e];
          y = "";
          var le = this.clone();
          for (le.negative = 0; !le.isZero(); ) {
            var ge = le.modrn(J).toString(e);
            le = le.idivn(J), le.isZero() ? y = ge + y : y = V[g - ge.length] + ge + y;
          }
          for (this.isZero() && (y = "0" + y); y.length % o !== 0; )
            y = "0" + y;
          return this.negative !== 0 && (y = "-" + y), y;
        }
        q(!1, "Base should be between 2 and 36");
      }, t.prototype.toNumber = function() {
        var e = this.words[0];
        return this.length === 2 ? e += this.words[1] * 67108864 : this.length === 3 && this.words[2] === 1 ? e += 4503599627370496 + this.words[1] * 67108864 : this.length > 2 && q(!1, "Number can only safely store up to 53 bits"), this.negative !== 0 ? -e : e;
      }, t.prototype.toJSON = function() {
        return this.toString(16, 2);
      }, F && (t.prototype.toBuffer = function(e, o) {
        return this.toArrayLike(F, e, o);
      }), t.prototype.toArray = function(e, o) {
        return this.toArrayLike(Array, e, o);
      };
      var ne = function(e, o) {
        return e.allocUnsafe ? e.allocUnsafe(o) : new e(o);
      };
      t.prototype.toArrayLike = function(e, o, y) {
        this._strip();
        var H = this.byteLength(), z = y || Math.max(1, H);
        q(H <= z, "byte array longer than desired length"), q(z > 0, "Requested array length <= 0");
        var B = ne(e, z), w = o === "le" ? "LE" : "BE";
        return this["_toArrayLike" + w](B, H), B;
      }, t.prototype._toArrayLikeLE = function(e, o) {
        for (var y = 0, H = 0, z = 0, B = 0; z < this.length; z++) {
          var w = this.words[z] << B | H;
          e[y++] = w & 255, y < e.length && (e[y++] = w >> 8 & 255), y < e.length && (e[y++] = w >> 16 & 255), B === 6 ? (y < e.length && (e[y++] = w >> 24 & 255), H = 0, B = 0) : (H = w >>> 24, B += 2);
        }
        if (y < e.length)
          for (e[y++] = H; y < e.length; )
            e[y++] = 0;
      }, t.prototype._toArrayLikeBE = function(e, o) {
        for (var y = e.length - 1, H = 0, z = 0, B = 0; z < this.length; z++) {
          var w = this.words[z] << B | H;
          e[y--] = w & 255, y >= 0 && (e[y--] = w >> 8 & 255), y >= 0 && (e[y--] = w >> 16 & 255), B === 6 ? (y >= 0 && (e[y--] = w >> 24 & 255), H = 0, B = 0) : (H = w >>> 24, B += 2);
        }
        if (y >= 0)
          for (e[y--] = H; y >= 0; )
            e[y--] = 0;
      }, Math.clz32 ? t.prototype._countBits = function(e) {
        return 32 - Math.clz32(e);
      } : t.prototype._countBits = function(e) {
        var o = e, y = 0;
        return o >= 4096 && (y += 13, o >>>= 13), o >= 64 && (y += 7, o >>>= 7), o >= 8 && (y += 4, o >>>= 4), o >= 2 && (y += 2, o >>>= 2), y + o;
      }, t.prototype._zeroBits = function(e) {
        if (e === 0) return 26;
        var o = e, y = 0;
        return o & 8191 || (y += 13, o >>>= 13), o & 127 || (y += 7, o >>>= 7), o & 15 || (y += 4, o >>>= 4), o & 3 || (y += 2, o >>>= 2), o & 1 || y++, y;
      }, t.prototype.bitLength = function() {
        var e = this.words[this.length - 1], o = this._countBits(e);
        return (this.length - 1) * 26 + o;
      };
      function se(e) {
        for (var o = new Array(e.bitLength()), y = 0; y < o.length; y++) {
          var H = y / 26 | 0, z = y % 26;
          o[y] = e.words[H] >>> z & 1;
        }
        return o;
      }
      t.prototype.zeroBits = function() {
        if (this.isZero()) return 0;
        for (var e = 0, o = 0; o < this.length; o++) {
          var y = this._zeroBits(this.words[o]);
          if (e += y, y !== 26) break;
        }
        return e;
      }, t.prototype.byteLength = function() {
        return Math.ceil(this.bitLength() / 8);
      }, t.prototype.toTwos = function(e) {
        return this.negative !== 0 ? this.abs().inotn(e).iaddn(1) : this.clone();
      }, t.prototype.fromTwos = function(e) {
        return this.testn(e - 1) ? this.notn(e).iaddn(1).ineg() : this.clone();
      }, t.prototype.isNeg = function() {
        return this.negative !== 0;
      }, t.prototype.neg = function() {
        return this.clone().ineg();
      }, t.prototype.ineg = function() {
        return this.isZero() || (this.negative ^= 1), this;
      }, t.prototype.iuor = function(e) {
        for (; this.length < e.length; )
          this.words[this.length++] = 0;
        for (var o = 0; o < e.length; o++)
          this.words[o] = this.words[o] | e.words[o];
        return this._strip();
      }, t.prototype.ior = function(e) {
        return q((this.negative | e.negative) === 0), this.iuor(e);
      }, t.prototype.or = function(e) {
        return this.length > e.length ? this.clone().ior(e) : e.clone().ior(this);
      }, t.prototype.uor = function(e) {
        return this.length > e.length ? this.clone().iuor(e) : e.clone().iuor(this);
      }, t.prototype.iuand = function(e) {
        var o;
        this.length > e.length ? o = e : o = this;
        for (var y = 0; y < o.length; y++)
          this.words[y] = this.words[y] & e.words[y];
        return this.length = o.length, this._strip();
      }, t.prototype.iand = function(e) {
        return q((this.negative | e.negative) === 0), this.iuand(e);
      }, t.prototype.and = function(e) {
        return this.length > e.length ? this.clone().iand(e) : e.clone().iand(this);
      }, t.prototype.uand = function(e) {
        return this.length > e.length ? this.clone().iuand(e) : e.clone().iuand(this);
      }, t.prototype.iuxor = function(e) {
        var o, y;
        this.length > e.length ? (o = this, y = e) : (o = e, y = this);
        for (var H = 0; H < y.length; H++)
          this.words[H] = o.words[H] ^ y.words[H];
        if (this !== o)
          for (; H < o.length; H++)
            this.words[H] = o.words[H];
        return this.length = o.length, this._strip();
      }, t.prototype.ixor = function(e) {
        return q((this.negative | e.negative) === 0), this.iuxor(e);
      }, t.prototype.xor = function(e) {
        return this.length > e.length ? this.clone().ixor(e) : e.clone().ixor(this);
      }, t.prototype.uxor = function(e) {
        return this.length > e.length ? this.clone().iuxor(e) : e.clone().iuxor(this);
      }, t.prototype.inotn = function(e) {
        q(typeof e == "number" && e >= 0);
        var o = Math.ceil(e / 26) | 0, y = e % 26;
        this._expand(o), y > 0 && o--;
        for (var H = 0; H < o; H++)
          this.words[H] = ~this.words[H] & 67108863;
        return y > 0 && (this.words[H] = ~this.words[H] & 67108863 >> 26 - y), this._strip();
      }, t.prototype.notn = function(e) {
        return this.clone().inotn(e);
      }, t.prototype.setn = function(e, o) {
        q(typeof e == "number" && e >= 0);
        var y = e / 26 | 0, H = e % 26;
        return this._expand(y + 1), o ? this.words[y] = this.words[y] | 1 << H : this.words[y] = this.words[y] & ~(1 << H), this._strip();
      }, t.prototype.iadd = function(e) {
        var o;
        if (this.negative !== 0 && e.negative === 0)
          return this.negative = 0, o = this.isub(e), this.negative ^= 1, this._normSign();
        if (this.negative === 0 && e.negative !== 0)
          return e.negative = 0, o = this.isub(e), e.negative = 1, o._normSign();
        var y, H;
        this.length > e.length ? (y = this, H = e) : (y = e, H = this);
        for (var z = 0, B = 0; B < H.length; B++)
          o = (y.words[B] | 0) + (H.words[B] | 0) + z, this.words[B] = o & 67108863, z = o >>> 26;
        for (; z !== 0 && B < y.length; B++)
          o = (y.words[B] | 0) + z, this.words[B] = o & 67108863, z = o >>> 26;
        if (this.length = y.length, z !== 0)
          this.words[this.length] = z, this.length++;
        else if (y !== this)
          for (; B < y.length; B++)
            this.words[B] = y.words[B];
        return this;
      }, t.prototype.add = function(e) {
        var o;
        return e.negative !== 0 && this.negative === 0 ? (e.negative = 0, o = this.sub(e), e.negative ^= 1, o) : e.negative === 0 && this.negative !== 0 ? (this.negative = 0, o = e.sub(this), this.negative = 1, o) : this.length > e.length ? this.clone().iadd(e) : e.clone().iadd(this);
      }, t.prototype.isub = function(e) {
        if (e.negative !== 0) {
          e.negative = 0;
          var o = this.iadd(e);
          return e.negative = 1, o._normSign();
        } else if (this.negative !== 0)
          return this.negative = 0, this.iadd(e), this.negative = 1, this._normSign();
        var y = this.cmp(e);
        if (y === 0)
          return this.negative = 0, this.length = 1, this.words[0] = 0, this;
        var H, z;
        y > 0 ? (H = this, z = e) : (H = e, z = this);
        for (var B = 0, w = 0; w < z.length; w++)
          o = (H.words[w] | 0) - (z.words[w] | 0) + B, B = o >> 26, this.words[w] = o & 67108863;
        for (; B !== 0 && w < H.length; w++)
          o = (H.words[w] | 0) + B, B = o >> 26, this.words[w] = o & 67108863;
        if (B === 0 && w < H.length && H !== this)
          for (; w < H.length; w++)
            this.words[w] = H.words[w];
        return this.length = Math.max(this.length, w), H !== this && (this.negative = 1), this._strip();
      }, t.prototype.sub = function(e) {
        return this.clone().isub(e);
      };
      function ae(e, o, y) {
        y.negative = o.negative ^ e.negative;
        var H = e.length + o.length | 0;
        y.length = H, H = H - 1 | 0;
        var z = e.words[0] | 0, B = o.words[0] | 0, w = z * B, G = w & 67108863, g = w / 67108864 | 0;
        y.words[0] = G;
        for (var J = 1; J < H; J++) {
          for (var le = g >>> 26, ge = g & 67108863, Se = Math.min(J, o.length - 1), ye = Math.max(0, J - e.length + 1); ye <= Se; ye++) {
            var fe = J - ye | 0;
            z = e.words[fe] | 0, B = o.words[ye] | 0, w = z * B + ge, le += w / 67108864 | 0, ge = w & 67108863;
          }
          y.words[J] = ge | 0, g = le | 0;
        }
        return g !== 0 ? y.words[J] = g | 0 : y.length--, y._strip();
      }
      var oe = function(e, o, y) {
        var H = e.words, z = o.words, B = y.words, w = 0, G, g, J, le = H[0] | 0, ge = le & 8191, Se = le >>> 13, ye = H[1] | 0, fe = ye & 8191, he = ye >>> 13, Re = H[2] | 0, ke = Re & 8191, me = Re >>> 13, ve = H[3] | 0, Ae = ve & 8191, $e = ve >>> 13, Oe = H[4] | 0, Y = Oe & 8191, Z = Oe >>> 13, re = H[5] | 0, ue = re & 8191, we = re >>> 13, Ee = H[6] | 0, Ie = Ee & 8191, xe = Ee >>> 13, Le = H[7] | 0, Pe = Le & 8191, Ce = Le >>> 13, je = H[8] | 0, Ve = je & 8191, Ne = je >>> 13, ft = H[9] | 0, Ye = ft & 8191, De = ft >>> 13, ht = z[0] | 0, et = ht & 8191, Ue = ht >>> 13, ct = z[1] | 0, tt = ct & 8191, We = ct >>> 13, lt = z[2] | 0, rt = lt & 8191, Fe = lt >>> 13, dt = z[3] | 0, it = dt & 8191, ze = dt >>> 13, pt = z[4] | 0, nt = pt & 8191, Ge = pt >>> 13, mt = z[5] | 0, ot = mt & 8191, He = mt >>> 13, bt = z[6] | 0, st = bt & 8191, Ke = bt >>> 13, yt = z[7] | 0, at = yt & 8191, Xe = yt >>> 13, gt = z[8] | 0, ut = gt & 8191, Ze = gt >>> 13, vt = z[9] | 0, Je = vt & 8191, Qe = vt >>> 13;
        y.negative = e.negative ^ o.negative, y.length = 19, G = Math.imul(ge, et), g = Math.imul(ge, Ue), g = g + Math.imul(Se, et) | 0, J = Math.imul(Se, Ue);
        var _t = (w + G | 0) + ((g & 8191) << 13) | 0;
        w = (J + (g >>> 13) | 0) + (_t >>> 26) | 0, _t &= 67108863, G = Math.imul(fe, et), g = Math.imul(fe, Ue), g = g + Math.imul(he, et) | 0, J = Math.imul(he, Ue), G = G + Math.imul(ge, tt) | 0, g = g + Math.imul(ge, We) | 0, g = g + Math.imul(Se, tt) | 0, J = J + Math.imul(Se, We) | 0;
        var Mt = (w + G | 0) + ((g & 8191) << 13) | 0;
        w = (J + (g >>> 13) | 0) + (Mt >>> 26) | 0, Mt &= 67108863, G = Math.imul(ke, et), g = Math.imul(ke, Ue), g = g + Math.imul(me, et) | 0, J = Math.imul(me, Ue), G = G + Math.imul(fe, tt) | 0, g = g + Math.imul(fe, We) | 0, g = g + Math.imul(he, tt) | 0, J = J + Math.imul(he, We) | 0, G = G + Math.imul(ge, rt) | 0, g = g + Math.imul(ge, Fe) | 0, g = g + Math.imul(Se, rt) | 0, J = J + Math.imul(Se, Fe) | 0;
        var St = (w + G | 0) + ((g & 8191) << 13) | 0;
        w = (J + (g >>> 13) | 0) + (St >>> 26) | 0, St &= 67108863, G = Math.imul(Ae, et), g = Math.imul(Ae, Ue), g = g + Math.imul($e, et) | 0, J = Math.imul($e, Ue), G = G + Math.imul(ke, tt) | 0, g = g + Math.imul(ke, We) | 0, g = g + Math.imul(me, tt) | 0, J = J + Math.imul(me, We) | 0, G = G + Math.imul(fe, rt) | 0, g = g + Math.imul(fe, Fe) | 0, g = g + Math.imul(he, rt) | 0, J = J + Math.imul(he, Fe) | 0, G = G + Math.imul(ge, it) | 0, g = g + Math.imul(ge, ze) | 0, g = g + Math.imul(Se, it) | 0, J = J + Math.imul(Se, ze) | 0;
        var qt = (w + G | 0) + ((g & 8191) << 13) | 0;
        w = (J + (g >>> 13) | 0) + (qt >>> 26) | 0, qt &= 67108863, G = Math.imul(Y, et), g = Math.imul(Y, Ue), g = g + Math.imul(Z, et) | 0, J = Math.imul(Z, Ue), G = G + Math.imul(Ae, tt) | 0, g = g + Math.imul(Ae, We) | 0, g = g + Math.imul($e, tt) | 0, J = J + Math.imul($e, We) | 0, G = G + Math.imul(ke, rt) | 0, g = g + Math.imul(ke, Fe) | 0, g = g + Math.imul(me, rt) | 0, J = J + Math.imul(me, Fe) | 0, G = G + Math.imul(fe, it) | 0, g = g + Math.imul(fe, ze) | 0, g = g + Math.imul(he, it) | 0, J = J + Math.imul(he, ze) | 0, G = G + Math.imul(ge, nt) | 0, g = g + Math.imul(ge, Ge) | 0, g = g + Math.imul(Se, nt) | 0, J = J + Math.imul(Se, Ge) | 0;
        var Et = (w + G | 0) + ((g & 8191) << 13) | 0;
        w = (J + (g >>> 13) | 0) + (Et >>> 26) | 0, Et &= 67108863, G = Math.imul(ue, et), g = Math.imul(ue, Ue), g = g + Math.imul(we, et) | 0, J = Math.imul(we, Ue), G = G + Math.imul(Y, tt) | 0, g = g + Math.imul(Y, We) | 0, g = g + Math.imul(Z, tt) | 0, J = J + Math.imul(Z, We) | 0, G = G + Math.imul(Ae, rt) | 0, g = g + Math.imul(Ae, Fe) | 0, g = g + Math.imul($e, rt) | 0, J = J + Math.imul($e, Fe) | 0, G = G + Math.imul(ke, it) | 0, g = g + Math.imul(ke, ze) | 0, g = g + Math.imul(me, it) | 0, J = J + Math.imul(me, ze) | 0, G = G + Math.imul(fe, nt) | 0, g = g + Math.imul(fe, Ge) | 0, g = g + Math.imul(he, nt) | 0, J = J + Math.imul(he, Ge) | 0, G = G + Math.imul(ge, ot) | 0, g = g + Math.imul(ge, He) | 0, g = g + Math.imul(Se, ot) | 0, J = J + Math.imul(Se, He) | 0;
        var Rt = (w + G | 0) + ((g & 8191) << 13) | 0;
        w = (J + (g >>> 13) | 0) + (Rt >>> 26) | 0, Rt &= 67108863, G = Math.imul(Ie, et), g = Math.imul(Ie, Ue), g = g + Math.imul(xe, et) | 0, J = Math.imul(xe, Ue), G = G + Math.imul(ue, tt) | 0, g = g + Math.imul(ue, We) | 0, g = g + Math.imul(we, tt) | 0, J = J + Math.imul(we, We) | 0, G = G + Math.imul(Y, rt) | 0, g = g + Math.imul(Y, Fe) | 0, g = g + Math.imul(Z, rt) | 0, J = J + Math.imul(Z, Fe) | 0, G = G + Math.imul(Ae, it) | 0, g = g + Math.imul(Ae, ze) | 0, g = g + Math.imul($e, it) | 0, J = J + Math.imul($e, ze) | 0, G = G + Math.imul(ke, nt) | 0, g = g + Math.imul(ke, Ge) | 0, g = g + Math.imul(me, nt) | 0, J = J + Math.imul(me, Ge) | 0, G = G + Math.imul(fe, ot) | 0, g = g + Math.imul(fe, He) | 0, g = g + Math.imul(he, ot) | 0, J = J + Math.imul(he, He) | 0, G = G + Math.imul(ge, st) | 0, g = g + Math.imul(ge, Ke) | 0, g = g + Math.imul(Se, st) | 0, J = J + Math.imul(Se, Ke) | 0;
        var Bt = (w + G | 0) + ((g & 8191) << 13) | 0;
        w = (J + (g >>> 13) | 0) + (Bt >>> 26) | 0, Bt &= 67108863, G = Math.imul(Pe, et), g = Math.imul(Pe, Ue), g = g + Math.imul(Ce, et) | 0, J = Math.imul(Ce, Ue), G = G + Math.imul(Ie, tt) | 0, g = g + Math.imul(Ie, We) | 0, g = g + Math.imul(xe, tt) | 0, J = J + Math.imul(xe, We) | 0, G = G + Math.imul(ue, rt) | 0, g = g + Math.imul(ue, Fe) | 0, g = g + Math.imul(we, rt) | 0, J = J + Math.imul(we, Fe) | 0, G = G + Math.imul(Y, it) | 0, g = g + Math.imul(Y, ze) | 0, g = g + Math.imul(Z, it) | 0, J = J + Math.imul(Z, ze) | 0, G = G + Math.imul(Ae, nt) | 0, g = g + Math.imul(Ae, Ge) | 0, g = g + Math.imul($e, nt) | 0, J = J + Math.imul($e, Ge) | 0, G = G + Math.imul(ke, ot) | 0, g = g + Math.imul(ke, He) | 0, g = g + Math.imul(me, ot) | 0, J = J + Math.imul(me, He) | 0, G = G + Math.imul(fe, st) | 0, g = g + Math.imul(fe, Ke) | 0, g = g + Math.imul(he, st) | 0, J = J + Math.imul(he, Ke) | 0, G = G + Math.imul(ge, at) | 0, g = g + Math.imul(ge, Xe) | 0, g = g + Math.imul(Se, at) | 0, J = J + Math.imul(Se, Xe) | 0;
        var kt = (w + G | 0) + ((g & 8191) << 13) | 0;
        w = (J + (g >>> 13) | 0) + (kt >>> 26) | 0, kt &= 67108863, G = Math.imul(Ve, et), g = Math.imul(Ve, Ue), g = g + Math.imul(Ne, et) | 0, J = Math.imul(Ne, Ue), G = G + Math.imul(Pe, tt) | 0, g = g + Math.imul(Pe, We) | 0, g = g + Math.imul(Ce, tt) | 0, J = J + Math.imul(Ce, We) | 0, G = G + Math.imul(Ie, rt) | 0, g = g + Math.imul(Ie, Fe) | 0, g = g + Math.imul(xe, rt) | 0, J = J + Math.imul(xe, Fe) | 0, G = G + Math.imul(ue, it) | 0, g = g + Math.imul(ue, ze) | 0, g = g + Math.imul(we, it) | 0, J = J + Math.imul(we, ze) | 0, G = G + Math.imul(Y, nt) | 0, g = g + Math.imul(Y, Ge) | 0, g = g + Math.imul(Z, nt) | 0, J = J + Math.imul(Z, Ge) | 0, G = G + Math.imul(Ae, ot) | 0, g = g + Math.imul(Ae, He) | 0, g = g + Math.imul($e, ot) | 0, J = J + Math.imul($e, He) | 0, G = G + Math.imul(ke, st) | 0, g = g + Math.imul(ke, Ke) | 0, g = g + Math.imul(me, st) | 0, J = J + Math.imul(me, Ke) | 0, G = G + Math.imul(fe, at) | 0, g = g + Math.imul(fe, Xe) | 0, g = g + Math.imul(he, at) | 0, J = J + Math.imul(he, Xe) | 0, G = G + Math.imul(ge, ut) | 0, g = g + Math.imul(ge, Ze) | 0, g = g + Math.imul(Se, ut) | 0, J = J + Math.imul(Se, Ze) | 0;
        var At = (w + G | 0) + ((g & 8191) << 13) | 0;
        w = (J + (g >>> 13) | 0) + (At >>> 26) | 0, At &= 67108863, G = Math.imul(Ye, et), g = Math.imul(Ye, Ue), g = g + Math.imul(De, et) | 0, J = Math.imul(De, Ue), G = G + Math.imul(Ve, tt) | 0, g = g + Math.imul(Ve, We) | 0, g = g + Math.imul(Ne, tt) | 0, J = J + Math.imul(Ne, We) | 0, G = G + Math.imul(Pe, rt) | 0, g = g + Math.imul(Pe, Fe) | 0, g = g + Math.imul(Ce, rt) | 0, J = J + Math.imul(Ce, Fe) | 0, G = G + Math.imul(Ie, it) | 0, g = g + Math.imul(Ie, ze) | 0, g = g + Math.imul(xe, it) | 0, J = J + Math.imul(xe, ze) | 0, G = G + Math.imul(ue, nt) | 0, g = g + Math.imul(ue, Ge) | 0, g = g + Math.imul(we, nt) | 0, J = J + Math.imul(we, Ge) | 0, G = G + Math.imul(Y, ot) | 0, g = g + Math.imul(Y, He) | 0, g = g + Math.imul(Z, ot) | 0, J = J + Math.imul(Z, He) | 0, G = G + Math.imul(Ae, st) | 0, g = g + Math.imul(Ae, Ke) | 0, g = g + Math.imul($e, st) | 0, J = J + Math.imul($e, Ke) | 0, G = G + Math.imul(ke, at) | 0, g = g + Math.imul(ke, Xe) | 0, g = g + Math.imul(me, at) | 0, J = J + Math.imul(me, Xe) | 0, G = G + Math.imul(fe, ut) | 0, g = g + Math.imul(fe, Ze) | 0, g = g + Math.imul(he, ut) | 0, J = J + Math.imul(he, Ze) | 0, G = G + Math.imul(ge, Je) | 0, g = g + Math.imul(ge, Qe) | 0, g = g + Math.imul(Se, Je) | 0, J = J + Math.imul(Se, Qe) | 0;
        var It = (w + G | 0) + ((g & 8191) << 13) | 0;
        w = (J + (g >>> 13) | 0) + (It >>> 26) | 0, It &= 67108863, G = Math.imul(Ye, tt), g = Math.imul(Ye, We), g = g + Math.imul(De, tt) | 0, J = Math.imul(De, We), G = G + Math.imul(Ve, rt) | 0, g = g + Math.imul(Ve, Fe) | 0, g = g + Math.imul(Ne, rt) | 0, J = J + Math.imul(Ne, Fe) | 0, G = G + Math.imul(Pe, it) | 0, g = g + Math.imul(Pe, ze) | 0, g = g + Math.imul(Ce, it) | 0, J = J + Math.imul(Ce, ze) | 0, G = G + Math.imul(Ie, nt) | 0, g = g + Math.imul(Ie, Ge) | 0, g = g + Math.imul(xe, nt) | 0, J = J + Math.imul(xe, Ge) | 0, G = G + Math.imul(ue, ot) | 0, g = g + Math.imul(ue, He) | 0, g = g + Math.imul(we, ot) | 0, J = J + Math.imul(we, He) | 0, G = G + Math.imul(Y, st) | 0, g = g + Math.imul(Y, Ke) | 0, g = g + Math.imul(Z, st) | 0, J = J + Math.imul(Z, Ke) | 0, G = G + Math.imul(Ae, at) | 0, g = g + Math.imul(Ae, Xe) | 0, g = g + Math.imul($e, at) | 0, J = J + Math.imul($e, Xe) | 0, G = G + Math.imul(ke, ut) | 0, g = g + Math.imul(ke, Ze) | 0, g = g + Math.imul(me, ut) | 0, J = J + Math.imul(me, Ze) | 0, G = G + Math.imul(fe, Je) | 0, g = g + Math.imul(fe, Qe) | 0, g = g + Math.imul(he, Je) | 0, J = J + Math.imul(he, Qe) | 0;
        var Tt = (w + G | 0) + ((g & 8191) << 13) | 0;
        w = (J + (g >>> 13) | 0) + (Tt >>> 26) | 0, Tt &= 67108863, G = Math.imul(Ye, rt), g = Math.imul(Ye, Fe), g = g + Math.imul(De, rt) | 0, J = Math.imul(De, Fe), G = G + Math.imul(Ve, it) | 0, g = g + Math.imul(Ve, ze) | 0, g = g + Math.imul(Ne, it) | 0, J = J + Math.imul(Ne, ze) | 0, G = G + Math.imul(Pe, nt) | 0, g = g + Math.imul(Pe, Ge) | 0, g = g + Math.imul(Ce, nt) | 0, J = J + Math.imul(Ce, Ge) | 0, G = G + Math.imul(Ie, ot) | 0, g = g + Math.imul(Ie, He) | 0, g = g + Math.imul(xe, ot) | 0, J = J + Math.imul(xe, He) | 0, G = G + Math.imul(ue, st) | 0, g = g + Math.imul(ue, Ke) | 0, g = g + Math.imul(we, st) | 0, J = J + Math.imul(we, Ke) | 0, G = G + Math.imul(Y, at) | 0, g = g + Math.imul(Y, Xe) | 0, g = g + Math.imul(Z, at) | 0, J = J + Math.imul(Z, Xe) | 0, G = G + Math.imul(Ae, ut) | 0, g = g + Math.imul(Ae, Ze) | 0, g = g + Math.imul($e, ut) | 0, J = J + Math.imul($e, Ze) | 0, G = G + Math.imul(ke, Je) | 0, g = g + Math.imul(ke, Qe) | 0, g = g + Math.imul(me, Je) | 0, J = J + Math.imul(me, Qe) | 0;
        var $t = (w + G | 0) + ((g & 8191) << 13) | 0;
        w = (J + (g >>> 13) | 0) + ($t >>> 26) | 0, $t &= 67108863, G = Math.imul(Ye, it), g = Math.imul(Ye, ze), g = g + Math.imul(De, it) | 0, J = Math.imul(De, ze), G = G + Math.imul(Ve, nt) | 0, g = g + Math.imul(Ve, Ge) | 0, g = g + Math.imul(Ne, nt) | 0, J = J + Math.imul(Ne, Ge) | 0, G = G + Math.imul(Pe, ot) | 0, g = g + Math.imul(Pe, He) | 0, g = g + Math.imul(Ce, ot) | 0, J = J + Math.imul(Ce, He) | 0, G = G + Math.imul(Ie, st) | 0, g = g + Math.imul(Ie, Ke) | 0, g = g + Math.imul(xe, st) | 0, J = J + Math.imul(xe, Ke) | 0, G = G + Math.imul(ue, at) | 0, g = g + Math.imul(ue, Xe) | 0, g = g + Math.imul(we, at) | 0, J = J + Math.imul(we, Xe) | 0, G = G + Math.imul(Y, ut) | 0, g = g + Math.imul(Y, Ze) | 0, g = g + Math.imul(Z, ut) | 0, J = J + Math.imul(Z, Ze) | 0, G = G + Math.imul(Ae, Je) | 0, g = g + Math.imul(Ae, Qe) | 0, g = g + Math.imul($e, Je) | 0, J = J + Math.imul($e, Qe) | 0;
        var xt = (w + G | 0) + ((g & 8191) << 13) | 0;
        w = (J + (g >>> 13) | 0) + (xt >>> 26) | 0, xt &= 67108863, G = Math.imul(Ye, nt), g = Math.imul(Ye, Ge), g = g + Math.imul(De, nt) | 0, J = Math.imul(De, Ge), G = G + Math.imul(Ve, ot) | 0, g = g + Math.imul(Ve, He) | 0, g = g + Math.imul(Ne, ot) | 0, J = J + Math.imul(Ne, He) | 0, G = G + Math.imul(Pe, st) | 0, g = g + Math.imul(Pe, Ke) | 0, g = g + Math.imul(Ce, st) | 0, J = J + Math.imul(Ce, Ke) | 0, G = G + Math.imul(Ie, at) | 0, g = g + Math.imul(Ie, Xe) | 0, g = g + Math.imul(xe, at) | 0, J = J + Math.imul(xe, Xe) | 0, G = G + Math.imul(ue, ut) | 0, g = g + Math.imul(ue, Ze) | 0, g = g + Math.imul(we, ut) | 0, J = J + Math.imul(we, Ze) | 0, G = G + Math.imul(Y, Je) | 0, g = g + Math.imul(Y, Qe) | 0, g = g + Math.imul(Z, Je) | 0, J = J + Math.imul(Z, Qe) | 0;
        var Ct = (w + G | 0) + ((g & 8191) << 13) | 0;
        w = (J + (g >>> 13) | 0) + (Ct >>> 26) | 0, Ct &= 67108863, G = Math.imul(Ye, ot), g = Math.imul(Ye, He), g = g + Math.imul(De, ot) | 0, J = Math.imul(De, He), G = G + Math.imul(Ve, st) | 0, g = g + Math.imul(Ve, Ke) | 0, g = g + Math.imul(Ne, st) | 0, J = J + Math.imul(Ne, Ke) | 0, G = G + Math.imul(Pe, at) | 0, g = g + Math.imul(Pe, Xe) | 0, g = g + Math.imul(Ce, at) | 0, J = J + Math.imul(Ce, Xe) | 0, G = G + Math.imul(Ie, ut) | 0, g = g + Math.imul(Ie, Ze) | 0, g = g + Math.imul(xe, ut) | 0, J = J + Math.imul(xe, Ze) | 0, G = G + Math.imul(ue, Je) | 0, g = g + Math.imul(ue, Qe) | 0, g = g + Math.imul(we, Je) | 0, J = J + Math.imul(we, Qe) | 0;
        var Pt = (w + G | 0) + ((g & 8191) << 13) | 0;
        w = (J + (g >>> 13) | 0) + (Pt >>> 26) | 0, Pt &= 67108863, G = Math.imul(Ye, st), g = Math.imul(Ye, Ke), g = g + Math.imul(De, st) | 0, J = Math.imul(De, Ke), G = G + Math.imul(Ve, at) | 0, g = g + Math.imul(Ve, Xe) | 0, g = g + Math.imul(Ne, at) | 0, J = J + Math.imul(Ne, Xe) | 0, G = G + Math.imul(Pe, ut) | 0, g = g + Math.imul(Pe, Ze) | 0, g = g + Math.imul(Ce, ut) | 0, J = J + Math.imul(Ce, Ze) | 0, G = G + Math.imul(Ie, Je) | 0, g = g + Math.imul(Ie, Qe) | 0, g = g + Math.imul(xe, Je) | 0, J = J + Math.imul(xe, Qe) | 0;
        var Ot = (w + G | 0) + ((g & 8191) << 13) | 0;
        w = (J + (g >>> 13) | 0) + (Ot >>> 26) | 0, Ot &= 67108863, G = Math.imul(Ye, at), g = Math.imul(Ye, Xe), g = g + Math.imul(De, at) | 0, J = Math.imul(De, Xe), G = G + Math.imul(Ve, ut) | 0, g = g + Math.imul(Ve, Ze) | 0, g = g + Math.imul(Ne, ut) | 0, J = J + Math.imul(Ne, Ze) | 0, G = G + Math.imul(Pe, Je) | 0, g = g + Math.imul(Pe, Qe) | 0, g = g + Math.imul(Ce, Je) | 0, J = J + Math.imul(Ce, Qe) | 0;
        var Lt = (w + G | 0) + ((g & 8191) << 13) | 0;
        w = (J + (g >>> 13) | 0) + (Lt >>> 26) | 0, Lt &= 67108863, G = Math.imul(Ye, ut), g = Math.imul(Ye, Ze), g = g + Math.imul(De, ut) | 0, J = Math.imul(De, Ze), G = G + Math.imul(Ve, Je) | 0, g = g + Math.imul(Ve, Qe) | 0, g = g + Math.imul(Ne, Je) | 0, J = J + Math.imul(Ne, Qe) | 0;
        var Ut = (w + G | 0) + ((g & 8191) << 13) | 0;
        w = (J + (g >>> 13) | 0) + (Ut >>> 26) | 0, Ut &= 67108863, G = Math.imul(Ye, Je), g = Math.imul(Ye, Qe), g = g + Math.imul(De, Je) | 0, J = Math.imul(De, Qe);
        var Wt = (w + G | 0) + ((g & 8191) << 13) | 0;
        return w = (J + (g >>> 13) | 0) + (Wt >>> 26) | 0, Wt &= 67108863, B[0] = _t, B[1] = Mt, B[2] = St, B[3] = qt, B[4] = Et, B[5] = Rt, B[6] = Bt, B[7] = kt, B[8] = At, B[9] = It, B[10] = Tt, B[11] = $t, B[12] = xt, B[13] = Ct, B[14] = Pt, B[15] = Ot, B[16] = Lt, B[17] = Ut, B[18] = Wt, w !== 0 && (B[19] = w, y.length++), y;
      };
      Math.imul || (oe = ae);
      function be(e, o, y) {
        y.negative = o.negative ^ e.negative, y.length = e.length + o.length;
        for (var H = 0, z = 0, B = 0; B < y.length - 1; B++) {
          var w = z;
          z = 0;
          for (var G = H & 67108863, g = Math.min(B, o.length - 1), J = Math.max(0, B - e.length + 1); J <= g; J++) {
            var le = B - J, ge = e.words[le] | 0, Se = o.words[J] | 0, ye = ge * Se, fe = ye & 67108863;
            w = w + (ye / 67108864 | 0) | 0, fe = fe + G | 0, G = fe & 67108863, w = w + (fe >>> 26) | 0, z += w >>> 26, w &= 67108863;
          }
          y.words[B] = G, H = w, w = z;
        }
        return H !== 0 ? y.words[B] = H : y.length--, y._strip();
      }
      function de(e, o, y) {
        return be(e, o, y);
      }
      t.prototype.mulTo = function(e, o) {
        var y, H = this.length + e.length;
        return this.length === 10 && e.length === 10 ? y = oe(this, e, o) : H < 63 ? y = ae(this, e, o) : H < 1024 ? y = be(this, e, o) : y = de(this, e, o), y;
      }, t.prototype.mul = function(e) {
        var o = new t(null);
        return o.words = new Array(this.length + e.length), this.mulTo(e, o);
      }, t.prototype.mulf = function(e) {
        var o = new t(null);
        return o.words = new Array(this.length + e.length), de(this, e, o);
      }, t.prototype.imul = function(e) {
        return this.clone().mulTo(e, this);
      }, t.prototype.imuln = function(e) {
        var o = e < 0;
        o && (e = -e), q(typeof e == "number"), q(e < 67108864);
        for (var y = 0, H = 0; H < this.length; H++) {
          var z = (this.words[H] | 0) * e, B = (z & 67108863) + (y & 67108863);
          y >>= 26, y += z / 67108864 | 0, y += B >>> 26, this.words[H] = B & 67108863;
        }
        return y !== 0 && (this.words[H] = y, this.length++), o ? this.ineg() : this;
      }, t.prototype.muln = function(e) {
        return this.clone().imuln(e);
      }, t.prototype.sqr = function() {
        return this.mul(this);
      }, t.prototype.isqr = function() {
        return this.imul(this.clone());
      }, t.prototype.pow = function(e) {
        var o = se(e);
        if (o.length === 0) return new t(1);
        for (var y = this, H = 0; H < o.length && o[H] === 0; H++, y = y.sqr())
          ;
        if (++H < o.length)
          for (var z = y.sqr(); H < o.length; H++, z = z.sqr())
            o[H] !== 0 && (y = y.mul(z));
        return y;
      }, t.prototype.iushln = function(e) {
        q(typeof e == "number" && e >= 0);
        var o = e % 26, y = (e - o) / 26, H = 67108863 >>> 26 - o << 26 - o, z;
        if (o !== 0) {
          var B = 0;
          for (z = 0; z < this.length; z++) {
            var w = this.words[z] & H, G = (this.words[z] | 0) - w << o;
            this.words[z] = G | B, B = w >>> 26 - o;
          }
          B && (this.words[z] = B, this.length++);
        }
        if (y !== 0) {
          for (z = this.length - 1; z >= 0; z--)
            this.words[z + y] = this.words[z];
          for (z = 0; z < y; z++)
            this.words[z] = 0;
          this.length += y;
        }
        return this._strip();
      }, t.prototype.ishln = function(e) {
        return q(this.negative === 0), this.iushln(e);
      }, t.prototype.iushrn = function(e, o, y) {
        q(typeof e == "number" && e >= 0);
        var H;
        o ? H = (o - o % 26) / 26 : H = 0;
        var z = e % 26, B = Math.min((e - z) / 26, this.length), w = 67108863 ^ 67108863 >>> z << z, G = y;
        if (H -= B, H = Math.max(0, H), G) {
          for (var g = 0; g < B; g++)
            G.words[g] = this.words[g];
          G.length = B;
        }
        if (B !== 0) if (this.length > B)
          for (this.length -= B, g = 0; g < this.length; g++)
            this.words[g] = this.words[g + B];
        else
          this.words[0] = 0, this.length = 1;
        var J = 0;
        for (g = this.length - 1; g >= 0 && (J !== 0 || g >= H); g--) {
          var le = this.words[g] | 0;
          this.words[g] = J << 26 - z | le >>> z, J = le & w;
        }
        return G && J !== 0 && (G.words[G.length++] = J), this.length === 0 && (this.words[0] = 0, this.length = 1), this._strip();
      }, t.prototype.ishrn = function(e, o, y) {
        return q(this.negative === 0), this.iushrn(e, o, y);
      }, t.prototype.shln = function(e) {
        return this.clone().ishln(e);
      }, t.prototype.ushln = function(e) {
        return this.clone().iushln(e);
      }, t.prototype.shrn = function(e) {
        return this.clone().ishrn(e);
      }, t.prototype.ushrn = function(e) {
        return this.clone().iushrn(e);
      }, t.prototype.testn = function(e) {
        q(typeof e == "number" && e >= 0);
        var o = e % 26, y = (e - o) / 26, H = 1 << o;
        if (this.length <= y) return !1;
        var z = this.words[y];
        return !!(z & H);
      }, t.prototype.imaskn = function(e) {
        q(typeof e == "number" && e >= 0);
        var o = e % 26, y = (e - o) / 26;
        if (q(this.negative === 0, "imaskn works only with positive numbers"), this.length <= y)
          return this;
        if (o !== 0 && y++, this.length = Math.min(y, this.length), o !== 0) {
          var H = 67108863 ^ 67108863 >>> o << o;
          this.words[this.length - 1] &= H;
        }
        return this._strip();
      }, t.prototype.maskn = function(e) {
        return this.clone().imaskn(e);
      }, t.prototype.iaddn = function(e) {
        return q(typeof e == "number"), q(e < 67108864), e < 0 ? this.isubn(-e) : this.negative !== 0 ? this.length === 1 && (this.words[0] | 0) <= e ? (this.words[0] = e - (this.words[0] | 0), this.negative = 0, this) : (this.negative = 0, this.isubn(e), this.negative = 1, this) : this._iaddn(e);
      }, t.prototype._iaddn = function(e) {
        this.words[0] += e;
        for (var o = 0; o < this.length && this.words[o] >= 67108864; o++)
          this.words[o] -= 67108864, o === this.length - 1 ? this.words[o + 1] = 1 : this.words[o + 1]++;
        return this.length = Math.max(this.length, o + 1), this;
      }, t.prototype.isubn = function(e) {
        if (q(typeof e == "number"), q(e < 67108864), e < 0) return this.iaddn(-e);
        if (this.negative !== 0)
          return this.negative = 0, this.iaddn(e), this.negative = 1, this;
        if (this.words[0] -= e, this.length === 1 && this.words[0] < 0)
          this.words[0] = -this.words[0], this.negative = 1;
        else
          for (var o = 0; o < this.length && this.words[o] < 0; o++)
            this.words[o] += 67108864, this.words[o + 1] -= 1;
        return this._strip();
      }, t.prototype.addn = function(e) {
        return this.clone().iaddn(e);
      }, t.prototype.subn = function(e) {
        return this.clone().isubn(e);
      }, t.prototype.iabs = function() {
        return this.negative = 0, this;
      }, t.prototype.abs = function() {
        return this.clone().iabs();
      }, t.prototype._ishlnsubmul = function(e, o, y) {
        var H = e.length + y, z;
        this._expand(H);
        var B, w = 0;
        for (z = 0; z < e.length; z++) {
          B = (this.words[z + y] | 0) + w;
          var G = (e.words[z] | 0) * o;
          B -= G & 67108863, w = (B >> 26) - (G / 67108864 | 0), this.words[z + y] = B & 67108863;
        }
        for (; z < this.length - y; z++)
          B = (this.words[z + y] | 0) + w, w = B >> 26, this.words[z + y] = B & 67108863;
        if (w === 0) return this._strip();
        for (q(w === -1), w = 0, z = 0; z < this.length; z++)
          B = -(this.words[z] | 0) + w, w = B >> 26, this.words[z] = B & 67108863;
        return this.negative = 1, this._strip();
      }, t.prototype._wordDiv = function(e, o) {
        var y = this.length - e.length, H = this.clone(), z = e, B = z.words[z.length - 1] | 0, w = this._countBits(B);
        y = 26 - w, y !== 0 && (z = z.ushln(y), H.iushln(y), B = z.words[z.length - 1] | 0);
        var G = H.length - z.length, g;
        if (o !== "mod") {
          g = new t(null), g.length = G + 1, g.words = new Array(g.length);
          for (var J = 0; J < g.length; J++)
            g.words[J] = 0;
        }
        var le = H.clone()._ishlnsubmul(z, 1, G);
        le.negative === 0 && (H = le, g && (g.words[G] = 1));
        for (var ge = G - 1; ge >= 0; ge--) {
          var Se = (H.words[z.length + ge] | 0) * 67108864 + (H.words[z.length + ge - 1] | 0);
          for (Se = Math.min(Se / B | 0, 67108863), H._ishlnsubmul(z, Se, ge); H.negative !== 0; )
            Se--, H.negative = 0, H._ishlnsubmul(z, 1, ge), H.isZero() || (H.negative ^= 1);
          g && (g.words[ge] = Se);
        }
        return g && g._strip(), H._strip(), o !== "div" && y !== 0 && H.iushrn(y), {
          div: g || null,
          mod: H
        };
      }, t.prototype.divmod = function(e, o, y) {
        if (q(!e.isZero()), this.isZero())
          return {
            div: new t(0),
            mod: new t(0)
          };
        var H, z, B;
        return this.negative !== 0 && e.negative === 0 ? (B = this.neg().divmod(e, o), o !== "mod" && (H = B.div.neg()), o !== "div" && (z = B.mod.neg(), y && z.negative !== 0 && z.iadd(e)), {
          div: H,
          mod: z
        }) : this.negative === 0 && e.negative !== 0 ? (B = this.divmod(e.neg(), o), o !== "mod" && (H = B.div.neg()), {
          div: H,
          mod: B.mod
        }) : this.negative & e.negative ? (B = this.neg().divmod(e.neg(), o), o !== "div" && (z = B.mod.neg(), y && z.negative !== 0 && z.isub(e)), {
          div: B.div,
          mod: z
        }) : e.length > this.length || this.cmp(e) < 0 ? {
          div: new t(0),
          mod: this
        } : e.length === 1 ? o === "div" ? {
          div: this.divn(e.words[0]),
          mod: null
        } : o === "mod" ? {
          div: null,
          mod: new t(this.modrn(e.words[0]))
        } : {
          div: this.divn(e.words[0]),
          mod: new t(this.modrn(e.words[0]))
        } : this._wordDiv(e, o);
      }, t.prototype.div = function(e) {
        return this.divmod(e, "div", !1).div;
      }, t.prototype.mod = function(e) {
        return this.divmod(e, "mod", !1).mod;
      }, t.prototype.umod = function(e) {
        return this.divmod(e, "mod", !0).mod;
      }, t.prototype.divRound = function(e) {
        var o = this.divmod(e);
        if (o.mod.isZero()) return o.div;
        var y = o.div.negative !== 0 ? o.mod.isub(e) : o.mod, H = e.ushrn(1), z = e.andln(1), B = y.cmp(H);
        return B < 0 || z === 1 && B === 0 ? o.div : o.div.negative !== 0 ? o.div.isubn(1) : o.div.iaddn(1);
      }, t.prototype.modrn = function(e) {
        var o = e < 0;
        o && (e = -e), q(e <= 67108863);
        for (var y = (1 << 26) % e, H = 0, z = this.length - 1; z >= 0; z--)
          H = (y * H + (this.words[z] | 0)) % e;
        return o ? -H : H;
      }, t.prototype.modn = function(e) {
        return this.modrn(e);
      }, t.prototype.idivn = function(e) {
        var o = e < 0;
        o && (e = -e), q(e <= 67108863);
        for (var y = 0, H = this.length - 1; H >= 0; H--) {
          var z = (this.words[H] | 0) + y * 67108864;
          this.words[H] = z / e | 0, y = z % e;
        }
        return this._strip(), o ? this.ineg() : this;
      }, t.prototype.divn = function(e) {
        return this.clone().idivn(e);
      }, t.prototype.egcd = function(e) {
        q(e.negative === 0), q(!e.isZero());
        var o = this, y = e.clone();
        o.negative !== 0 ? o = o.umod(e) : o = o.clone();
        for (var H = new t(1), z = new t(0), B = new t(0), w = new t(1), G = 0; o.isEven() && y.isEven(); )
          o.iushrn(1), y.iushrn(1), ++G;
        for (var g = y.clone(), J = o.clone(); !o.isZero(); ) {
          for (var le = 0, ge = 1; !(o.words[0] & ge) && le < 26; ++le, ge <<= 1) ;
          if (le > 0)
            for (o.iushrn(le); le-- > 0; )
              (H.isOdd() || z.isOdd()) && (H.iadd(g), z.isub(J)), H.iushrn(1), z.iushrn(1);
          for (var Se = 0, ye = 1; !(y.words[0] & ye) && Se < 26; ++Se, ye <<= 1) ;
          if (Se > 0)
            for (y.iushrn(Se); Se-- > 0; )
              (B.isOdd() || w.isOdd()) && (B.iadd(g), w.isub(J)), B.iushrn(1), w.iushrn(1);
          o.cmp(y) >= 0 ? (o.isub(y), H.isub(B), z.isub(w)) : (y.isub(o), B.isub(H), w.isub(z));
        }
        return {
          a: B,
          b: w,
          gcd: y.iushln(G)
        };
      }, t.prototype._invmp = function(e) {
        q(e.negative === 0), q(!e.isZero());
        var o = this, y = e.clone();
        o.negative !== 0 ? o = o.umod(e) : o = o.clone();
        for (var H = new t(1), z = new t(0), B = y.clone(); o.cmpn(1) > 0 && y.cmpn(1) > 0; ) {
          for (var w = 0, G = 1; !(o.words[0] & G) && w < 26; ++w, G <<= 1) ;
          if (w > 0)
            for (o.iushrn(w); w-- > 0; )
              H.isOdd() && H.iadd(B), H.iushrn(1);
          for (var g = 0, J = 1; !(y.words[0] & J) && g < 26; ++g, J <<= 1) ;
          if (g > 0)
            for (y.iushrn(g); g-- > 0; )
              z.isOdd() && z.iadd(B), z.iushrn(1);
          o.cmp(y) >= 0 ? (o.isub(y), H.isub(z)) : (y.isub(o), z.isub(H));
        }
        var le;
        return o.cmpn(1) === 0 ? le = H : le = z, le.cmpn(0) < 0 && le.iadd(e), le;
      }, t.prototype.gcd = function(e) {
        if (this.isZero()) return e.abs();
        if (e.isZero()) return this.abs();
        var o = this.clone(), y = e.clone();
        o.negative = 0, y.negative = 0;
        for (var H = 0; o.isEven() && y.isEven(); H++)
          o.iushrn(1), y.iushrn(1);
        do {
          for (; o.isEven(); )
            o.iushrn(1);
          for (; y.isEven(); )
            y.iushrn(1);
          var z = o.cmp(y);
          if (z < 0) {
            var B = o;
            o = y, y = B;
          } else if (z === 0 || y.cmpn(1) === 0)
            break;
          o.isub(y);
        } while (!0);
        return y.iushln(H);
      }, t.prototype.invm = function(e) {
        return this.egcd(e).a.umod(e);
      }, t.prototype.isEven = function() {
        return (this.words[0] & 1) === 0;
      }, t.prototype.isOdd = function() {
        return (this.words[0] & 1) === 1;
      }, t.prototype.andln = function(e) {
        return this.words[0] & e;
      }, t.prototype.bincn = function(e) {
        q(typeof e == "number");
        var o = e % 26, y = (e - o) / 26, H = 1 << o;
        if (this.length <= y)
          return this._expand(y + 1), this.words[y] |= H, this;
        for (var z = H, B = y; z !== 0 && B < this.length; B++) {
          var w = this.words[B] | 0;
          w += z, z = w >>> 26, w &= 67108863, this.words[B] = w;
        }
        return z !== 0 && (this.words[B] = z, this.length++), this;
      }, t.prototype.isZero = function() {
        return this.length === 1 && this.words[0] === 0;
      }, t.prototype.cmpn = function(e) {
        var o = e < 0;
        if (this.negative !== 0 && !o) return -1;
        if (this.negative === 0 && o) return 1;
        this._strip();
        var y;
        if (this.length > 1)
          y = 1;
        else {
          o && (e = -e), q(e <= 67108863, "Number is too big");
          var H = this.words[0] | 0;
          y = H === e ? 0 : H < e ? -1 : 1;
        }
        return this.negative !== 0 ? -y | 0 : y;
      }, t.prototype.cmp = function(e) {
        if (this.negative !== 0 && e.negative === 0) return -1;
        if (this.negative === 0 && e.negative !== 0) return 1;
        var o = this.ucmp(e);
        return this.negative !== 0 ? -o | 0 : o;
      }, t.prototype.ucmp = function(e) {
        if (this.length > e.length) return 1;
        if (this.length < e.length) return -1;
        for (var o = 0, y = this.length - 1; y >= 0; y--) {
          var H = this.words[y] | 0, z = e.words[y] | 0;
          if (H !== z) {
            H < z ? o = -1 : H > z && (o = 1);
            break;
          }
        }
        return o;
      }, t.prototype.gtn = function(e) {
        return this.cmpn(e) === 1;
      }, t.prototype.gt = function(e) {
        return this.cmp(e) === 1;
      }, t.prototype.gten = function(e) {
        return this.cmpn(e) >= 0;
      }, t.prototype.gte = function(e) {
        return this.cmp(e) >= 0;
      }, t.prototype.ltn = function(e) {
        return this.cmpn(e) === -1;
      }, t.prototype.lt = function(e) {
        return this.cmp(e) === -1;
      }, t.prototype.lten = function(e) {
        return this.cmpn(e) <= 0;
      }, t.prototype.lte = function(e) {
        return this.cmp(e) <= 0;
      }, t.prototype.eqn = function(e) {
        return this.cmpn(e) === 0;
      }, t.prototype.eq = function(e) {
        return this.cmp(e) === 0;
      }, t.red = function(e) {
        return new K(e);
      }, t.prototype.toRed = function(e) {
        return q(!this.red, "Already a number in reduction context"), q(this.negative === 0, "red works only with positives"), e.convertTo(this)._forceRed(e);
      }, t.prototype.fromRed = function() {
        return q(this.red, "fromRed works only with numbers in reduction context"), this.red.convertFrom(this);
      }, t.prototype._forceRed = function(e) {
        return this.red = e, this;
      }, t.prototype.forceRed = function(e) {
        return q(!this.red, "Already a number in reduction context"), this._forceRed(e);
      }, t.prototype.redAdd = function(e) {
        return q(this.red, "redAdd works only with red numbers"), this.red.add(this, e);
      }, t.prototype.redIAdd = function(e) {
        return q(this.red, "redIAdd works only with red numbers"), this.red.iadd(this, e);
      }, t.prototype.redSub = function(e) {
        return q(this.red, "redSub works only with red numbers"), this.red.sub(this, e);
      }, t.prototype.redISub = function(e) {
        return q(this.red, "redISub works only with red numbers"), this.red.isub(this, e);
      }, t.prototype.redShl = function(e) {
        return q(this.red, "redShl works only with red numbers"), this.red.shl(this, e);
      }, t.prototype.redMul = function(e) {
        return q(this.red, "redMul works only with red numbers"), this.red._verify2(this, e), this.red.mul(this, e);
      }, t.prototype.redIMul = function(e) {
        return q(this.red, "redMul works only with red numbers"), this.red._verify2(this, e), this.red.imul(this, e);
      }, t.prototype.redSqr = function() {
        return q(this.red, "redSqr works only with red numbers"), this.red._verify1(this), this.red.sqr(this);
      }, t.prototype.redISqr = function() {
        return q(this.red, "redISqr works only with red numbers"), this.red._verify1(this), this.red.isqr(this);
      }, t.prototype.redSqrt = function() {
        return q(this.red, "redSqrt works only with red numbers"), this.red._verify1(this), this.red.sqrt(this);
      }, t.prototype.redInvm = function() {
        return q(this.red, "redInvm works only with red numbers"), this.red._verify1(this), this.red.invm(this);
      }, t.prototype.redNeg = function() {
        return q(this.red, "redNeg works only with red numbers"), this.red._verify1(this), this.red.neg(this);
      }, t.prototype.redPow = function(e) {
        return q(this.red && !e.red, "redPow(normalNum)"), this.red._verify1(this), this.red.pow(this, e);
      };
      var _e = {
        k256: null,
        p224: null,
        p192: null,
        p25519: null
      };
      function qe(e, o) {
        this.name = e, this.p = new t(o, 16), this.n = this.p.bitLength(), this.k = new t(1).iushln(this.n).isub(this.p), this.tmp = this._tmp();
      }
      qe.prototype._tmp = function() {
        var e = new t(null);
        return e.words = new Array(Math.ceil(this.n / 13)), e;
      }, qe.prototype.ireduce = function(e) {
        var o = e, y;
        do
          this.split(o, this.tmp), o = this.imulK(o), o = o.iadd(this.tmp), y = o.bitLength();
        while (y > this.n);
        var H = y < this.n ? -1 : o.ucmp(this.p);
        return H === 0 ? (o.words[0] = 0, o.length = 1) : H > 0 ? o.isub(this.p) : o.strip !== void 0 ? o.strip() : o._strip(), o;
      }, qe.prototype.split = function(e, o) {
        e.iushrn(this.n, 0, o);
      }, qe.prototype.imulK = function(e) {
        return e.imul(this.k);
      };
      function Te() {
        qe.call(
          this,
          "k256",
          "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f"
        );
      }
      X(Te, qe), Te.prototype.split = function(e, o) {
        for (var y = 4194303, H = Math.min(e.length, 9), z = 0; z < H; z++)
          o.words[z] = e.words[z];
        if (o.length = H, e.length <= 9) {
          e.words[0] = 0, e.length = 1;
          return;
        }
        var B = e.words[9];
        for (o.words[o.length++] = B & y, z = 10; z < e.length; z++) {
          var w = e.words[z] | 0;
          e.words[z - 10] = (w & y) << 4 | B >>> 22, B = w;
        }
        B >>>= 22, e.words[z - 10] = B, B === 0 && e.length > 10 ? e.length -= 10 : e.length -= 9;
      }, Te.prototype.imulK = function(e) {
        e.words[e.length] = 0, e.words[e.length + 1] = 0, e.length += 2;
        for (var o = 0, y = 0; y < e.length; y++) {
          var H = e.words[y] | 0;
          o += H * 977, e.words[y] = o & 67108863, o = H * 64 + (o / 67108864 | 0);
        }
        return e.words[e.length - 1] === 0 && (e.length--, e.words[e.length - 1] === 0 && e.length--), e;
      };
      function ce() {
        qe.call(
          this,
          "p224",
          "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001"
        );
      }
      X(ce, qe);
      function pe() {
        qe.call(
          this,
          "p192",
          "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff"
        );
      }
      X(pe, qe);
      function Me() {
        qe.call(
          this,
          "25519",
          "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed"
        );
      }
      X(Me, qe), Me.prototype.imulK = function(e) {
        for (var o = 0, y = 0; y < e.length; y++) {
          var H = (e.words[y] | 0) * 19 + o, z = H & 67108863;
          H >>>= 26, e.words[y] = z, o = H;
        }
        return o !== 0 && (e.words[e.length++] = o), e;
      }, t._prime = function(e) {
        if (_e[e]) return _e[e];
        var o;
        if (e === "k256")
          o = new Te();
        else if (e === "p224")
          o = new ce();
        else if (e === "p192")
          o = new pe();
        else if (e === "p25519")
          o = new Me();
        else
          throw new Error("Unknown prime " + e);
        return _e[e] = o, o;
      };
      function K(e) {
        if (typeof e == "string") {
          var o = t._prime(e);
          this.m = o.p, this.prime = o;
        } else
          q(e.gtn(1), "modulus must be greater than 1"), this.m = e, this.prime = null;
      }
      K.prototype._verify1 = function(e) {
        q(e.negative === 0, "red works only with positives"), q(e.red, "red works only with red numbers");
      }, K.prototype._verify2 = function(e, o) {
        q((e.negative | o.negative) === 0, "red works only with positives"), q(
          e.red && e.red === o.red,
          "red works only with red numbers"
        );
      }, K.prototype.imod = function(e) {
        return this.prime ? this.prime.ireduce(e)._forceRed(this) : (D(e, e.umod(this.m)._forceRed(this)), e);
      }, K.prototype.neg = function(e) {
        return e.isZero() ? e.clone() : this.m.sub(e)._forceRed(this);
      }, K.prototype.add = function(e, o) {
        this._verify2(e, o);
        var y = e.add(o);
        return y.cmp(this.m) >= 0 && y.isub(this.m), y._forceRed(this);
      }, K.prototype.iadd = function(e, o) {
        this._verify2(e, o);
        var y = e.iadd(o);
        return y.cmp(this.m) >= 0 && y.isub(this.m), y;
      }, K.prototype.sub = function(e, o) {
        this._verify2(e, o);
        var y = e.sub(o);
        return y.cmpn(0) < 0 && y.iadd(this.m), y._forceRed(this);
      }, K.prototype.isub = function(e, o) {
        this._verify2(e, o);
        var y = e.isub(o);
        return y.cmpn(0) < 0 && y.iadd(this.m), y;
      }, K.prototype.shl = function(e, o) {
        return this._verify1(e), this.imod(e.ushln(o));
      }, K.prototype.imul = function(e, o) {
        return this._verify2(e, o), this.imod(e.imul(o));
      }, K.prototype.mul = function(e, o) {
        return this._verify2(e, o), this.imod(e.mul(o));
      }, K.prototype.isqr = function(e) {
        return this.imul(e, e.clone());
      }, K.prototype.sqr = function(e) {
        return this.mul(e, e);
      }, K.prototype.sqrt = function(e) {
        if (e.isZero()) return e.clone();
        var o = this.m.andln(3);
        if (q(o % 2 === 1), o === 3) {
          var y = this.m.add(new t(1)).iushrn(2);
          return this.pow(e, y);
        }
        for (var H = this.m.subn(1), z = 0; !H.isZero() && H.andln(1) === 0; )
          z++, H.iushrn(1);
        q(!H.isZero());
        var B = new t(1).toRed(this), w = B.redNeg(), G = this.m.subn(1).iushrn(1), g = this.m.bitLength();
        for (g = new t(2 * g * g).toRed(this); this.pow(g, G).cmp(w) !== 0; )
          g.redIAdd(w);
        for (var J = this.pow(g, H), le = this.pow(e, H.addn(1).iushrn(1)), ge = this.pow(e, H), Se = z; ge.cmp(B) !== 0; ) {
          for (var ye = ge, fe = 0; ye.cmp(B) !== 0; fe++)
            ye = ye.redSqr();
          q(fe < Se);
          var he = this.pow(J, new t(1).iushln(Se - fe - 1));
          le = le.redMul(he), J = he.redSqr(), ge = ge.redMul(J), Se = fe;
        }
        return le;
      }, K.prototype.invm = function(e) {
        var o = e._invmp(this.m);
        return o.negative !== 0 ? (o.negative = 0, this.imod(o).redNeg()) : this.imod(o);
      }, K.prototype.pow = function(e, o) {
        if (o.isZero()) return new t(1).toRed(this);
        if (o.cmpn(1) === 0) return e.clone();
        var y = 4, H = new Array(1 << y);
        H[0] = new t(1).toRed(this), H[1] = e;
        for (var z = 2; z < H.length; z++)
          H[z] = this.mul(H[z - 1], e);
        var B = H[0], w = 0, G = 0, g = o.bitLength() % 26;
        for (g === 0 && (g = 26), z = o.length - 1; z >= 0; z--) {
          for (var J = o.words[z], le = g - 1; le >= 0; le--) {
            var ge = J >> le & 1;
            if (B !== H[0] && (B = this.sqr(B)), ge === 0 && w === 0) {
              G = 0;
              continue;
            }
            w <<= 1, w |= ge, G++, !(G !== y && (z !== 0 || le !== 0)) && (B = this.mul(B, H[w]), G = 0, w = 0);
          }
          g = 26;
        }
        return B;
      }, K.prototype.convertTo = function(e) {
        var o = e.umod(this.m);
        return o === e ? o.clone() : o;
      }, K.prototype.convertFrom = function(e) {
        var o = e.clone();
        return o.red = null, o;
      }, t.mont = function(e) {
        return new ee(e);
      };
      function ee(e) {
        K.call(this, e), this.shift = this.m.bitLength(), this.shift % 26 !== 0 && (this.shift += 26 - this.shift % 26), this.r = new t(1).iushln(this.shift), this.r2 = this.imod(this.r.sqr()), this.rinv = this.r._invmp(this.m), this.minv = this.rinv.mul(this.r).isubn(1).div(this.m), this.minv = this.minv.umod(this.r), this.minv = this.r.sub(this.minv);
      }
      X(ee, K), ee.prototype.convertTo = function(e) {
        return this.imod(e.ushln(this.shift));
      }, ee.prototype.convertFrom = function(e) {
        var o = this.imod(e.mul(this.rinv));
        return o.red = null, o;
      }, ee.prototype.imul = function(e, o) {
        if (e.isZero() || o.isZero())
          return e.words[0] = 0, e.length = 1, e;
        var y = e.imul(o), H = y.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m), z = y.isub(H).iushrn(this.shift), B = z;
        return z.cmp(this.m) >= 0 ? B = z.isub(this.m) : z.cmpn(0) < 0 && (B = z.iadd(this.m)), B._forceRed(this);
      }, ee.prototype.mul = function(e, o) {
        if (e.isZero() || o.isZero()) return new t(0)._forceRed(this);
        var y = e.mul(o), H = y.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m), z = y.isub(H).iushrn(this.shift), B = z;
        return z.cmp(this.m) >= 0 ? B = z.isub(this.m) : z.cmpn(0) < 0 && (B = z.iadd(this.m)), B._forceRed(this);
      }, ee.prototype.invm = function(e) {
        var o = this.imod(e._invmp(this.m).mul(this.r2));
        return o._forceRed(this);
      };
    })(P, commonjsGlobal);
  }(bn$1)), bn$1.exports;
}
var browserifyRsa, hasRequiredBrowserifyRsa;
function requireBrowserifyRsa() {
  if (hasRequiredBrowserifyRsa) return browserifyRsa;
  hasRequiredBrowserifyRsa = 1;
  var P = requireBn$1(), c = requireBrowser$b();
  function O(t) {
    var F = q(t), l = F.toRed(P.mont(t.modulus)).redPow(new P(t.publicExponent)).fromRed();
    return { blinder: l, unblinder: F.invm(t.modulus) };
  }
  function q(t) {
    var F = t.modulus.byteLength(), l;
    do
      l = new P(c(F));
    while (l.cmp(t.modulus) >= 0 || !l.umod(t.prime1) || !l.umod(t.prime2));
    return l;
  }
  function X(t, F) {
    var l = O(F), U = F.modulus.byteLength(), $ = new P(t).mul(l.blinder).umod(F.modulus), D = $.toRed(P.mont(F.prime1)), Q = $.toRed(P.mont(F.prime2)), V = F.coefficient, te = F.prime1, ie = F.prime2, ne = D.redPow(F.exponent1).fromRed(), se = Q.redPow(F.exponent2).fromRed(), ae = ne.isub(se).imul(V).umod(te).imul(ie);
    return se.iadd(ae).imul(l.unblinder).umod(F.modulus).toArrayLike(bufferExports.Buffer, "be", U);
  }
  return X.getr = q, browserifyRsa = X, browserifyRsa;
}
var elliptic = {};
const name = "elliptic", version = "6.5.5", description = "EC cryptography", main = "lib/elliptic.js", files = [
  "lib"
], scripts = {
  lint: "eslint lib test",
  "lint:fix": "npm run lint -- --fix",
  unit: "istanbul test _mocha --reporter=spec test/index.js",
  test: "npm run lint && npm run unit",
  version: "grunt dist && git add dist/"
}, repository = {
  type: "git",
  url: "git@github.com:indutny/elliptic"
}, keywords = [
  "EC",
  "Elliptic",
  "curve",
  "Cryptography"
], author = "Fedor Indutny <fedor@indutny.com>", license = "MIT", bugs = {
  url: "https://github.com/indutny/elliptic/issues"
}, homepage = "https://github.com/indutny/elliptic", devDependencies = {
  brfs: "^2.0.2",
  coveralls: "^3.1.0",
  eslint: "^7.6.0",
  grunt: "^1.2.1",
  "grunt-browserify": "^5.3.0",
  "grunt-cli": "^1.3.2",
  "grunt-contrib-connect": "^3.0.0",
  "grunt-contrib-copy": "^1.0.0",
  "grunt-contrib-uglify": "^5.0.0",
  "grunt-mocha-istanbul": "^5.0.2",
  "grunt-saucelabs": "^9.0.1",
  istanbul: "^0.4.5",
  mocha: "^8.0.1"
}, dependencies = {
  "bn.js": "^4.11.9",
  brorand: "^1.1.0",
  "hash.js": "^1.0.0",
  "hmac-drbg": "^1.0.1",
  inherits: "^2.0.4",
  "minimalistic-assert": "^1.0.1",
  "minimalistic-crypto-utils": "^1.0.1"
}, require$$0 = {
  name,
  version,
  description,
  main,
  files,
  scripts,
  repository,
  keywords,
  author,
  license,
  bugs,
  homepage,
  devDependencies,
  dependencies
};
var utils$2 = {}, utils$1 = {}, hasRequiredUtils$2;
function requireUtils$2() {
  return hasRequiredUtils$2 || (hasRequiredUtils$2 = 1, function(P) {
    var c = P;
    function O(t, F) {
      if (Array.isArray(t))
        return t.slice();
      if (!t)
        return [];
      var l = [];
      if (typeof t != "string") {
        for (var U = 0; U < t.length; U++)
          l[U] = t[U] | 0;
        return l;
      }
      if (F === "hex") {
        t = t.replace(/[^a-z0-9]+/ig, ""), t.length % 2 !== 0 && (t = "0" + t);
        for (var U = 0; U < t.length; U += 2)
          l.push(parseInt(t[U] + t[U + 1], 16));
      } else
        for (var U = 0; U < t.length; U++) {
          var $ = t.charCodeAt(U), D = $ >> 8, Q = $ & 255;
          D ? l.push(D, Q) : l.push(Q);
        }
      return l;
    }
    c.toArray = O;
    function q(t) {
      return t.length === 1 ? "0" + t : t;
    }
    c.zero2 = q;
    function X(t) {
      for (var F = "", l = 0; l < t.length; l++)
        F += q(t[l].toString(16));
      return F;
    }
    c.toHex = X, c.encode = function(t, F) {
      return F === "hex" ? X(t) : t;
    };
  }(utils$1)), utils$1;
}
var hasRequiredUtils$1;
function requireUtils$1() {
  return hasRequiredUtils$1 || (hasRequiredUtils$1 = 1, function(P) {
    var c = P, O = requireBn$2(), q = requireMinimalisticAssert(), X = requireUtils$2();
    c.assert = q, c.toArray = X.toArray, c.zero2 = X.zero2, c.toHex = X.toHex, c.encode = X.encode;
    function t(D, Q, V) {
      var te = new Array(Math.max(D.bitLength(), V) + 1), ie;
      for (ie = 0; ie < te.length; ie += 1)
        te[ie] = 0;
      var ne = 1 << Q + 1, se = D.clone();
      for (ie = 0; ie < te.length; ie++) {
        var ae, oe = se.andln(ne - 1);
        se.isOdd() ? (oe > (ne >> 1) - 1 ? ae = (ne >> 1) - oe : ae = oe, se.isubn(ae)) : ae = 0, te[ie] = ae, se.iushrn(1);
      }
      return te;
    }
    c.getNAF = t;
    function F(D, Q) {
      var V = [
        [],
        []
      ];
      D = D.clone(), Q = Q.clone();
      for (var te = 0, ie = 0, ne; D.cmpn(-te) > 0 || Q.cmpn(-ie) > 0; ) {
        var se = D.andln(3) + te & 3, ae = Q.andln(3) + ie & 3;
        se === 3 && (se = -1), ae === 3 && (ae = -1);
        var oe;
        se & 1 ? (ne = D.andln(7) + te & 7, (ne === 3 || ne === 5) && ae === 2 ? oe = -se : oe = se) : oe = 0, V[0].push(oe);
        var be;
        ae & 1 ? (ne = Q.andln(7) + ie & 7, (ne === 3 || ne === 5) && se === 2 ? be = -ae : be = ae) : be = 0, V[1].push(be), 2 * te === oe + 1 && (te = 1 - te), 2 * ie === be + 1 && (ie = 1 - ie), D.iushrn(1), Q.iushrn(1);
      }
      return V;
    }
    c.getJSF = F;
    function l(D, Q, V) {
      var te = "_" + Q;
      D.prototype[Q] = function() {
        return this[te] !== void 0 ? this[te] : this[te] = V.call(this);
      };
    }
    c.cachedProperty = l;
    function U(D) {
      return typeof D == "string" ? c.toArray(D, "hex") : D;
    }
    c.parseBytes = U;
    function $(D) {
      return new O(D, "hex", "le");
    }
    c.intFromLE = $;
  }(utils$2)), utils$2;
}
var curve = {}, base$1, hasRequiredBase$1;
function requireBase$1() {
  if (hasRequiredBase$1) return base$1;
  hasRequiredBase$1 = 1;
  var P = requireBn$2(), c = requireUtils$1(), O = c.getNAF, q = c.getJSF, X = c.assert;
  function t(l, U) {
    this.type = l, this.p = new P(U.p, 16), this.red = U.prime ? P.red(U.prime) : P.mont(this.p), this.zero = new P(0).toRed(this.red), this.one = new P(1).toRed(this.red), this.two = new P(2).toRed(this.red), this.n = U.n && new P(U.n, 16), this.g = U.g && this.pointFromJSON(U.g, U.gRed), this._wnafT1 = new Array(4), this._wnafT2 = new Array(4), this._wnafT3 = new Array(4), this._wnafT4 = new Array(4), this._bitLength = this.n ? this.n.bitLength() : 0;
    var $ = this.n && this.p.div(this.n);
    !$ || $.cmpn(100) > 0 ? this.redN = null : (this._maxwellTrick = !0, this.redN = this.n.toRed(this.red));
  }
  base$1 = t, t.prototype.point = function() {
    throw new Error("Not implemented");
  }, t.prototype.validate = function() {
    throw new Error("Not implemented");
  }, t.prototype._fixedNafMul = function(l, U) {
    X(l.precomputed);
    var $ = l._getDoubles(), D = O(U, 1, this._bitLength), Q = (1 << $.step + 1) - ($.step % 2 === 0 ? 2 : 1);
    Q /= 3;
    var V = [], te, ie;
    for (te = 0; te < D.length; te += $.step) {
      ie = 0;
      for (var ne = te + $.step - 1; ne >= te; ne--)
        ie = (ie << 1) + D[ne];
      V.push(ie);
    }
    for (var se = this.jpoint(null, null, null), ae = this.jpoint(null, null, null), oe = Q; oe > 0; oe--) {
      for (te = 0; te < V.length; te++)
        ie = V[te], ie === oe ? ae = ae.mixedAdd($.points[te]) : ie === -oe && (ae = ae.mixedAdd($.points[te].neg()));
      se = se.add(ae);
    }
    return se.toP();
  }, t.prototype._wnafMul = function(l, U) {
    var $ = 4, D = l._getNAFPoints($);
    $ = D.wnd;
    for (var Q = D.points, V = O(U, $, this._bitLength), te = this.jpoint(null, null, null), ie = V.length - 1; ie >= 0; ie--) {
      for (var ne = 0; ie >= 0 && V[ie] === 0; ie--)
        ne++;
      if (ie >= 0 && ne++, te = te.dblp(ne), ie < 0)
        break;
      var se = V[ie];
      X(se !== 0), l.type === "affine" ? se > 0 ? te = te.mixedAdd(Q[se - 1 >> 1]) : te = te.mixedAdd(Q[-se - 1 >> 1].neg()) : se > 0 ? te = te.add(Q[se - 1 >> 1]) : te = te.add(Q[-se - 1 >> 1].neg());
    }
    return l.type === "affine" ? te.toP() : te;
  }, t.prototype._wnafMulAdd = function(l, U, $, D, Q) {
    var V = this._wnafT1, te = this._wnafT2, ie = this._wnafT3, ne = 0, se, ae, oe;
    for (se = 0; se < D; se++) {
      oe = U[se];
      var be = oe._getNAFPoints(l);
      V[se] = be.wnd, te[se] = be.points;
    }
    for (se = D - 1; se >= 1; se -= 2) {
      var de = se - 1, _e = se;
      if (V[de] !== 1 || V[_e] !== 1) {
        ie[de] = O($[de], V[de], this._bitLength), ie[_e] = O($[_e], V[_e], this._bitLength), ne = Math.max(ie[de].length, ne), ne = Math.max(ie[_e].length, ne);
        continue;
      }
      var qe = [
        U[de],
        /* 1 */
        null,
        /* 3 */
        null,
        /* 5 */
        U[_e]
        /* 7 */
      ];
      U[de].y.cmp(U[_e].y) === 0 ? (qe[1] = U[de].add(U[_e]), qe[2] = U[de].toJ().mixedAdd(U[_e].neg())) : U[de].y.cmp(U[_e].y.redNeg()) === 0 ? (qe[1] = U[de].toJ().mixedAdd(U[_e]), qe[2] = U[de].add(U[_e].neg())) : (qe[1] = U[de].toJ().mixedAdd(U[_e]), qe[2] = U[de].toJ().mixedAdd(U[_e].neg()));
      var Te = [
        -3,
        /* -1 -1 */
        -1,
        /* -1 0 */
        -5,
        /* -1 1 */
        -7,
        /* 0 -1 */
        0,
        /* 0 0 */
        7,
        /* 0 1 */
        5,
        /* 1 -1 */
        1,
        /* 1 0 */
        3
        /* 1 1 */
      ], ce = q($[de], $[_e]);
      for (ne = Math.max(ce[0].length, ne), ie[de] = new Array(ne), ie[_e] = new Array(ne), ae = 0; ae < ne; ae++) {
        var pe = ce[0][ae] | 0, Me = ce[1][ae] | 0;
        ie[de][ae] = Te[(pe + 1) * 3 + (Me + 1)], ie[_e][ae] = 0, te[de] = qe;
      }
    }
    var K = this.jpoint(null, null, null), ee = this._wnafT4;
    for (se = ne; se >= 0; se--) {
      for (var e = 0; se >= 0; ) {
        var o = !0;
        for (ae = 0; ae < D; ae++)
          ee[ae] = ie[ae][se] | 0, ee[ae] !== 0 && (o = !1);
        if (!o)
          break;
        e++, se--;
      }
      if (se >= 0 && e++, K = K.dblp(e), se < 0)
        break;
      for (ae = 0; ae < D; ae++) {
        var y = ee[ae];
        y !== 0 && (y > 0 ? oe = te[ae][y - 1 >> 1] : y < 0 && (oe = te[ae][-y - 1 >> 1].neg()), oe.type === "affine" ? K = K.mixedAdd(oe) : K = K.add(oe));
      }
    }
    for (se = 0; se < D; se++)
      te[se] = null;
    return Q ? K : K.toP();
  };
  function F(l, U) {
    this.curve = l, this.type = U, this.precomputed = null;
  }
  return t.BasePoint = F, F.prototype.eq = function() {
    throw new Error("Not implemented");
  }, F.prototype.validate = function() {
    return this.curve.validate(this);
  }, t.prototype.decodePoint = function(l, U) {
    l = c.toArray(l, U);
    var $ = this.p.byteLength();
    if ((l[0] === 4 || l[0] === 6 || l[0] === 7) && l.length - 1 === 2 * $) {
      l[0] === 6 ? X(l[l.length - 1] % 2 === 0) : l[0] === 7 && X(l[l.length - 1] % 2 === 1);
      var D = this.point(
        l.slice(1, 1 + $),
        l.slice(1 + $, 1 + 2 * $)
      );
      return D;
    } else if ((l[0] === 2 || l[0] === 3) && l.length - 1 === $)
      return this.pointFromX(l.slice(1, 1 + $), l[0] === 3);
    throw new Error("Unknown point format");
  }, F.prototype.encodeCompressed = function(l) {
    return this.encode(l, !0);
  }, F.prototype._encode = function(l) {
    var U = this.curve.p.byteLength(), $ = this.getX().toArray("be", U);
    return l ? [this.getY().isEven() ? 2 : 3].concat($) : [4].concat($, this.getY().toArray("be", U));
  }, F.prototype.encode = function(l, U) {
    return c.encode(this._encode(U), l);
  }, F.prototype.precompute = function(l) {
    if (this.precomputed)
      return this;
    var U = {
      doubles: null,
      naf: null,
      beta: null
    };
    return U.naf = this._getNAFPoints(8), U.doubles = this._getDoubles(4, l), U.beta = this._getBeta(), this.precomputed = U, this;
  }, F.prototype._hasDoubles = function(l) {
    if (!this.precomputed)
      return !1;
    var U = this.precomputed.doubles;
    return U ? U.points.length >= Math.ceil((l.bitLength() + 1) / U.step) : !1;
  }, F.prototype._getDoubles = function(l, U) {
    if (this.precomputed && this.precomputed.doubles)
      return this.precomputed.doubles;
    for (var $ = [this], D = this, Q = 0; Q < U; Q += l) {
      for (var V = 0; V < l; V++)
        D = D.dbl();
      $.push(D);
    }
    return {
      step: l,
      points: $
    };
  }, F.prototype._getNAFPoints = function(l) {
    if (this.precomputed && this.precomputed.naf)
      return this.precomputed.naf;
    for (var U = [this], $ = (1 << l) - 1, D = $ === 1 ? null : this.dbl(), Q = 1; Q < $; Q++)
      U[Q] = U[Q - 1].add(D);
    return {
      wnd: l,
      points: U
    };
  }, F.prototype._getBeta = function() {
    return null;
  }, F.prototype.dblp = function(l) {
    for (var U = this, $ = 0; $ < l; $++)
      U = U.dbl();
    return U;
  }, base$1;
}
var short, hasRequiredShort;
function requireShort() {
  if (hasRequiredShort) return short;
  hasRequiredShort = 1;
  var P = requireUtils$1(), c = requireBn$2(), O = requireInherits_browser(), q = requireBase$1(), X = P.assert;
  function t(U) {
    q.call(this, "short", U), this.a = new c(U.a, 16).toRed(this.red), this.b = new c(U.b, 16).toRed(this.red), this.tinv = this.two.redInvm(), this.zeroA = this.a.fromRed().cmpn(0) === 0, this.threeA = this.a.fromRed().sub(this.p).cmpn(-3) === 0, this.endo = this._getEndomorphism(U), this._endoWnafT1 = new Array(4), this._endoWnafT2 = new Array(4);
  }
  O(t, q), short = t, t.prototype._getEndomorphism = function(U) {
    if (!(!this.zeroA || !this.g || !this.n || this.p.modn(3) !== 1)) {
      var $, D;
      if (U.beta)
        $ = new c(U.beta, 16).toRed(this.red);
      else {
        var Q = this._getEndoRoots(this.p);
        $ = Q[0].cmp(Q[1]) < 0 ? Q[0] : Q[1], $ = $.toRed(this.red);
      }
      if (U.lambda)
        D = new c(U.lambda, 16);
      else {
        var V = this._getEndoRoots(this.n);
        this.g.mul(V[0]).x.cmp(this.g.x.redMul($)) === 0 ? D = V[0] : (D = V[1], X(this.g.mul(D).x.cmp(this.g.x.redMul($)) === 0));
      }
      var te;
      return U.basis ? te = U.basis.map(function(ie) {
        return {
          a: new c(ie.a, 16),
          b: new c(ie.b, 16)
        };
      }) : te = this._getEndoBasis(D), {
        beta: $,
        lambda: D,
        basis: te
      };
    }
  }, t.prototype._getEndoRoots = function(U) {
    var $ = U === this.p ? this.red : c.mont(U), D = new c(2).toRed($).redInvm(), Q = D.redNeg(), V = new c(3).toRed($).redNeg().redSqrt().redMul(D), te = Q.redAdd(V).fromRed(), ie = Q.redSub(V).fromRed();
    return [te, ie];
  }, t.prototype._getEndoBasis = function(U) {
    for (var $ = this.n.ushrn(Math.floor(this.n.bitLength() / 2)), D = U, Q = this.n.clone(), V = new c(1), te = new c(0), ie = new c(0), ne = new c(1), se, ae, oe, be, de, _e, qe, Te = 0, ce, pe; D.cmpn(0) !== 0; ) {
      var Me = Q.div(D);
      ce = Q.sub(Me.mul(D)), pe = ie.sub(Me.mul(V));
      var K = ne.sub(Me.mul(te));
      if (!oe && ce.cmp($) < 0)
        se = qe.neg(), ae = V, oe = ce.neg(), be = pe;
      else if (oe && ++Te === 2)
        break;
      qe = ce, Q = D, D = ce, ie = V, V = pe, ne = te, te = K;
    }
    de = ce.neg(), _e = pe;
    var ee = oe.sqr().add(be.sqr()), e = de.sqr().add(_e.sqr());
    return e.cmp(ee) >= 0 && (de = se, _e = ae), oe.negative && (oe = oe.neg(), be = be.neg()), de.negative && (de = de.neg(), _e = _e.neg()), [
      { a: oe, b: be },
      { a: de, b: _e }
    ];
  }, t.prototype._endoSplit = function(U) {
    var $ = this.endo.basis, D = $[0], Q = $[1], V = Q.b.mul(U).divRound(this.n), te = D.b.neg().mul(U).divRound(this.n), ie = V.mul(D.a), ne = te.mul(Q.a), se = V.mul(D.b), ae = te.mul(Q.b), oe = U.sub(ie).sub(ne), be = se.add(ae).neg();
    return { k1: oe, k2: be };
  }, t.prototype.pointFromX = function(U, $) {
    U = new c(U, 16), U.red || (U = U.toRed(this.red));
    var D = U.redSqr().redMul(U).redIAdd(U.redMul(this.a)).redIAdd(this.b), Q = D.redSqrt();
    if (Q.redSqr().redSub(D).cmp(this.zero) !== 0)
      throw new Error("invalid point");
    var V = Q.fromRed().isOdd();
    return ($ && !V || !$ && V) && (Q = Q.redNeg()), this.point(U, Q);
  }, t.prototype.validate = function(U) {
    if (U.inf)
      return !0;
    var $ = U.x, D = U.y, Q = this.a.redMul($), V = $.redSqr().redMul($).redIAdd(Q).redIAdd(this.b);
    return D.redSqr().redISub(V).cmpn(0) === 0;
  }, t.prototype._endoWnafMulAdd = function(U, $, D) {
    for (var Q = this._endoWnafT1, V = this._endoWnafT2, te = 0; te < U.length; te++) {
      var ie = this._endoSplit($[te]), ne = U[te], se = ne._getBeta();
      ie.k1.negative && (ie.k1.ineg(), ne = ne.neg(!0)), ie.k2.negative && (ie.k2.ineg(), se = se.neg(!0)), Q[te * 2] = ne, Q[te * 2 + 1] = se, V[te * 2] = ie.k1, V[te * 2 + 1] = ie.k2;
    }
    for (var ae = this._wnafMulAdd(1, Q, V, te * 2, D), oe = 0; oe < te * 2; oe++)
      Q[oe] = null, V[oe] = null;
    return ae;
  };
  function F(U, $, D, Q) {
    q.BasePoint.call(this, U, "affine"), $ === null && D === null ? (this.x = null, this.y = null, this.inf = !0) : (this.x = new c($, 16), this.y = new c(D, 16), Q && (this.x.forceRed(this.curve.red), this.y.forceRed(this.curve.red)), this.x.red || (this.x = this.x.toRed(this.curve.red)), this.y.red || (this.y = this.y.toRed(this.curve.red)), this.inf = !1);
  }
  O(F, q.BasePoint), t.prototype.point = function(U, $, D) {
    return new F(this, U, $, D);
  }, t.prototype.pointFromJSON = function(U, $) {
    return F.fromJSON(this, U, $);
  }, F.prototype._getBeta = function() {
    if (this.curve.endo) {
      var U = this.precomputed;
      if (U && U.beta)
        return U.beta;
      var $ = this.curve.point(this.x.redMul(this.curve.endo.beta), this.y);
      if (U) {
        var D = this.curve, Q = function(V) {
          return D.point(V.x.redMul(D.endo.beta), V.y);
        };
        U.beta = $, $.precomputed = {
          beta: null,
          naf: U.naf && {
            wnd: U.naf.wnd,
            points: U.naf.points.map(Q)
          },
          doubles: U.doubles && {
            step: U.doubles.step,
            points: U.doubles.points.map(Q)
          }
        };
      }
      return $;
    }
  }, F.prototype.toJSON = function() {
    return this.precomputed ? [this.x, this.y, this.precomputed && {
      doubles: this.precomputed.doubles && {
        step: this.precomputed.doubles.step,
        points: this.precomputed.doubles.points.slice(1)
      },
      naf: this.precomputed.naf && {
        wnd: this.precomputed.naf.wnd,
        points: this.precomputed.naf.points.slice(1)
      }
    }] : [this.x, this.y];
  }, F.fromJSON = function(U, $, D) {
    typeof $ == "string" && ($ = JSON.parse($));
    var Q = U.point($[0], $[1], D);
    if (!$[2])
      return Q;
    function V(ie) {
      return U.point(ie[0], ie[1], D);
    }
    var te = $[2];
    return Q.precomputed = {
      beta: null,
      doubles: te.doubles && {
        step: te.doubles.step,
        points: [Q].concat(te.doubles.points.map(V))
      },
      naf: te.naf && {
        wnd: te.naf.wnd,
        points: [Q].concat(te.naf.points.map(V))
      }
    }, Q;
  }, F.prototype.inspect = function() {
    return this.isInfinity() ? "<EC Point Infinity>" : "<EC Point x: " + this.x.fromRed().toString(16, 2) + " y: " + this.y.fromRed().toString(16, 2) + ">";
  }, F.prototype.isInfinity = function() {
    return this.inf;
  }, F.prototype.add = function(U) {
    if (this.inf)
      return U;
    if (U.inf)
      return this;
    if (this.eq(U))
      return this.dbl();
    if (this.neg().eq(U))
      return this.curve.point(null, null);
    if (this.x.cmp(U.x) === 0)
      return this.curve.point(null, null);
    var $ = this.y.redSub(U.y);
    $.cmpn(0) !== 0 && ($ = $.redMul(this.x.redSub(U.x).redInvm()));
    var D = $.redSqr().redISub(this.x).redISub(U.x), Q = $.redMul(this.x.redSub(D)).redISub(this.y);
    return this.curve.point(D, Q);
  }, F.prototype.dbl = function() {
    if (this.inf)
      return this;
    var U = this.y.redAdd(this.y);
    if (U.cmpn(0) === 0)
      return this.curve.point(null, null);
    var $ = this.curve.a, D = this.x.redSqr(), Q = U.redInvm(), V = D.redAdd(D).redIAdd(D).redIAdd($).redMul(Q), te = V.redSqr().redISub(this.x.redAdd(this.x)), ie = V.redMul(this.x.redSub(te)).redISub(this.y);
    return this.curve.point(te, ie);
  }, F.prototype.getX = function() {
    return this.x.fromRed();
  }, F.prototype.getY = function() {
    return this.y.fromRed();
  }, F.prototype.mul = function(U) {
    return U = new c(U, 16), this.isInfinity() ? this : this._hasDoubles(U) ? this.curve._fixedNafMul(this, U) : this.curve.endo ? this.curve._endoWnafMulAdd([this], [U]) : this.curve._wnafMul(this, U);
  }, F.prototype.mulAdd = function(U, $, D) {
    var Q = [this, $], V = [U, D];
    return this.curve.endo ? this.curve._endoWnafMulAdd(Q, V) : this.curve._wnafMulAdd(1, Q, V, 2);
  }, F.prototype.jmulAdd = function(U, $, D) {
    var Q = [this, $], V = [U, D];
    return this.curve.endo ? this.curve._endoWnafMulAdd(Q, V, !0) : this.curve._wnafMulAdd(1, Q, V, 2, !0);
  }, F.prototype.eq = function(U) {
    return this === U || this.inf === U.inf && (this.inf || this.x.cmp(U.x) === 0 && this.y.cmp(U.y) === 0);
  }, F.prototype.neg = function(U) {
    if (this.inf)
      return this;
    var $ = this.curve.point(this.x, this.y.redNeg());
    if (U && this.precomputed) {
      var D = this.precomputed, Q = function(V) {
        return V.neg();
      };
      $.precomputed = {
        naf: D.naf && {
          wnd: D.naf.wnd,
          points: D.naf.points.map(Q)
        },
        doubles: D.doubles && {
          step: D.doubles.step,
          points: D.doubles.points.map(Q)
        }
      };
    }
    return $;
  }, F.prototype.toJ = function() {
    if (this.inf)
      return this.curve.jpoint(null, null, null);
    var U = this.curve.jpoint(this.x, this.y, this.curve.one);
    return U;
  };
  function l(U, $, D, Q) {
    q.BasePoint.call(this, U, "jacobian"), $ === null && D === null && Q === null ? (this.x = this.curve.one, this.y = this.curve.one, this.z = new c(0)) : (this.x = new c($, 16), this.y = new c(D, 16), this.z = new c(Q, 16)), this.x.red || (this.x = this.x.toRed(this.curve.red)), this.y.red || (this.y = this.y.toRed(this.curve.red)), this.z.red || (this.z = this.z.toRed(this.curve.red)), this.zOne = this.z === this.curve.one;
  }
  return O(l, q.BasePoint), t.prototype.jpoint = function(U, $, D) {
    return new l(this, U, $, D);
  }, l.prototype.toP = function() {
    if (this.isInfinity())
      return this.curve.point(null, null);
    var U = this.z.redInvm(), $ = U.redSqr(), D = this.x.redMul($), Q = this.y.redMul($).redMul(U);
    return this.curve.point(D, Q);
  }, l.prototype.neg = function() {
    return this.curve.jpoint(this.x, this.y.redNeg(), this.z);
  }, l.prototype.add = function(U) {
    if (this.isInfinity())
      return U;
    if (U.isInfinity())
      return this;
    var $ = U.z.redSqr(), D = this.z.redSqr(), Q = this.x.redMul($), V = U.x.redMul(D), te = this.y.redMul($.redMul(U.z)), ie = U.y.redMul(D.redMul(this.z)), ne = Q.redSub(V), se = te.redSub(ie);
    if (ne.cmpn(0) === 0)
      return se.cmpn(0) !== 0 ? this.curve.jpoint(null, null, null) : this.dbl();
    var ae = ne.redSqr(), oe = ae.redMul(ne), be = Q.redMul(ae), de = se.redSqr().redIAdd(oe).redISub(be).redISub(be), _e = se.redMul(be.redISub(de)).redISub(te.redMul(oe)), qe = this.z.redMul(U.z).redMul(ne);
    return this.curve.jpoint(de, _e, qe);
  }, l.prototype.mixedAdd = function(U) {
    if (this.isInfinity())
      return U.toJ();
    if (U.isInfinity())
      return this;
    var $ = this.z.redSqr(), D = this.x, Q = U.x.redMul($), V = this.y, te = U.y.redMul($).redMul(this.z), ie = D.redSub(Q), ne = V.redSub(te);
    if (ie.cmpn(0) === 0)
      return ne.cmpn(0) !== 0 ? this.curve.jpoint(null, null, null) : this.dbl();
    var se = ie.redSqr(), ae = se.redMul(ie), oe = D.redMul(se), be = ne.redSqr().redIAdd(ae).redISub(oe).redISub(oe), de = ne.redMul(oe.redISub(be)).redISub(V.redMul(ae)), _e = this.z.redMul(ie);
    return this.curve.jpoint(be, de, _e);
  }, l.prototype.dblp = function(U) {
    if (U === 0)
      return this;
    if (this.isInfinity())
      return this;
    if (!U)
      return this.dbl();
    var $;
    if (this.curve.zeroA || this.curve.threeA) {
      var D = this;
      for ($ = 0; $ < U; $++)
        D = D.dbl();
      return D;
    }
    var Q = this.curve.a, V = this.curve.tinv, te = this.x, ie = this.y, ne = this.z, se = ne.redSqr().redSqr(), ae = ie.redAdd(ie);
    for ($ = 0; $ < U; $++) {
      var oe = te.redSqr(), be = ae.redSqr(), de = be.redSqr(), _e = oe.redAdd(oe).redIAdd(oe).redIAdd(Q.redMul(se)), qe = te.redMul(be), Te = _e.redSqr().redISub(qe.redAdd(qe)), ce = qe.redISub(Te), pe = _e.redMul(ce);
      pe = pe.redIAdd(pe).redISub(de);
      var Me = ae.redMul(ne);
      $ + 1 < U && (se = se.redMul(de)), te = Te, ne = Me, ae = pe;
    }
    return this.curve.jpoint(te, ae.redMul(V), ne);
  }, l.prototype.dbl = function() {
    return this.isInfinity() ? this : this.curve.zeroA ? this._zeroDbl() : this.curve.threeA ? this._threeDbl() : this._dbl();
  }, l.prototype._zeroDbl = function() {
    var U, $, D;
    if (this.zOne) {
      var Q = this.x.redSqr(), V = this.y.redSqr(), te = V.redSqr(), ie = this.x.redAdd(V).redSqr().redISub(Q).redISub(te);
      ie = ie.redIAdd(ie);
      var ne = Q.redAdd(Q).redIAdd(Q), se = ne.redSqr().redISub(ie).redISub(ie), ae = te.redIAdd(te);
      ae = ae.redIAdd(ae), ae = ae.redIAdd(ae), U = se, $ = ne.redMul(ie.redISub(se)).redISub(ae), D = this.y.redAdd(this.y);
    } else {
      var oe = this.x.redSqr(), be = this.y.redSqr(), de = be.redSqr(), _e = this.x.redAdd(be).redSqr().redISub(oe).redISub(de);
      _e = _e.redIAdd(_e);
      var qe = oe.redAdd(oe).redIAdd(oe), Te = qe.redSqr(), ce = de.redIAdd(de);
      ce = ce.redIAdd(ce), ce = ce.redIAdd(ce), U = Te.redISub(_e).redISub(_e), $ = qe.redMul(_e.redISub(U)).redISub(ce), D = this.y.redMul(this.z), D = D.redIAdd(D);
    }
    return this.curve.jpoint(U, $, D);
  }, l.prototype._threeDbl = function() {
    var U, $, D;
    if (this.zOne) {
      var Q = this.x.redSqr(), V = this.y.redSqr(), te = V.redSqr(), ie = this.x.redAdd(V).redSqr().redISub(Q).redISub(te);
      ie = ie.redIAdd(ie);
      var ne = Q.redAdd(Q).redIAdd(Q).redIAdd(this.curve.a), se = ne.redSqr().redISub(ie).redISub(ie);
      U = se;
      var ae = te.redIAdd(te);
      ae = ae.redIAdd(ae), ae = ae.redIAdd(ae), $ = ne.redMul(ie.redISub(se)).redISub(ae), D = this.y.redAdd(this.y);
    } else {
      var oe = this.z.redSqr(), be = this.y.redSqr(), de = this.x.redMul(be), _e = this.x.redSub(oe).redMul(this.x.redAdd(oe));
      _e = _e.redAdd(_e).redIAdd(_e);
      var qe = de.redIAdd(de);
      qe = qe.redIAdd(qe);
      var Te = qe.redAdd(qe);
      U = _e.redSqr().redISub(Te), D = this.y.redAdd(this.z).redSqr().redISub(be).redISub(oe);
      var ce = be.redSqr();
      ce = ce.redIAdd(ce), ce = ce.redIAdd(ce), ce = ce.redIAdd(ce), $ = _e.redMul(qe.redISub(U)).redISub(ce);
    }
    return this.curve.jpoint(U, $, D);
  }, l.prototype._dbl = function() {
    var U = this.curve.a, $ = this.x, D = this.y, Q = this.z, V = Q.redSqr().redSqr(), te = $.redSqr(), ie = D.redSqr(), ne = te.redAdd(te).redIAdd(te).redIAdd(U.redMul(V)), se = $.redAdd($);
    se = se.redIAdd(se);
    var ae = se.redMul(ie), oe = ne.redSqr().redISub(ae.redAdd(ae)), be = ae.redISub(oe), de = ie.redSqr();
    de = de.redIAdd(de), de = de.redIAdd(de), de = de.redIAdd(de);
    var _e = ne.redMul(be).redISub(de), qe = D.redAdd(D).redMul(Q);
    return this.curve.jpoint(oe, _e, qe);
  }, l.prototype.trpl = function() {
    if (!this.curve.zeroA)
      return this.dbl().add(this);
    var U = this.x.redSqr(), $ = this.y.redSqr(), D = this.z.redSqr(), Q = $.redSqr(), V = U.redAdd(U).redIAdd(U), te = V.redSqr(), ie = this.x.redAdd($).redSqr().redISub(U).redISub(Q);
    ie = ie.redIAdd(ie), ie = ie.redAdd(ie).redIAdd(ie), ie = ie.redISub(te);
    var ne = ie.redSqr(), se = Q.redIAdd(Q);
    se = se.redIAdd(se), se = se.redIAdd(se), se = se.redIAdd(se);
    var ae = V.redIAdd(ie).redSqr().redISub(te).redISub(ne).redISub(se), oe = $.redMul(ae);
    oe = oe.redIAdd(oe), oe = oe.redIAdd(oe);
    var be = this.x.redMul(ne).redISub(oe);
    be = be.redIAdd(be), be = be.redIAdd(be);
    var de = this.y.redMul(ae.redMul(se.redISub(ae)).redISub(ie.redMul(ne)));
    de = de.redIAdd(de), de = de.redIAdd(de), de = de.redIAdd(de);
    var _e = this.z.redAdd(ie).redSqr().redISub(D).redISub(ne);
    return this.curve.jpoint(be, de, _e);
  }, l.prototype.mul = function(U, $) {
    return U = new c(U, $), this.curve._wnafMul(this, U);
  }, l.prototype.eq = function(U) {
    if (U.type === "affine")
      return this.eq(U.toJ());
    if (this === U)
      return !0;
    var $ = this.z.redSqr(), D = U.z.redSqr();
    if (this.x.redMul(D).redISub(U.x.redMul($)).cmpn(0) !== 0)
      return !1;
    var Q = $.redMul(this.z), V = D.redMul(U.z);
    return this.y.redMul(V).redISub(U.y.redMul(Q)).cmpn(0) === 0;
  }, l.prototype.eqXToP = function(U) {
    var $ = this.z.redSqr(), D = U.toRed(this.curve.red).redMul($);
    if (this.x.cmp(D) === 0)
      return !0;
    for (var Q = U.clone(), V = this.curve.redN.redMul($); ; ) {
      if (Q.iadd(this.curve.n), Q.cmp(this.curve.p) >= 0)
        return !1;
      if (D.redIAdd(V), this.x.cmp(D) === 0)
        return !0;
    }
  }, l.prototype.inspect = function() {
    return this.isInfinity() ? "<EC JPoint Infinity>" : "<EC JPoint x: " + this.x.toString(16, 2) + " y: " + this.y.toString(16, 2) + " z: " + this.z.toString(16, 2) + ">";
  }, l.prototype.isInfinity = function() {
    return this.z.cmpn(0) === 0;
  }, short;
}
var mont, hasRequiredMont;
function requireMont() {
  if (hasRequiredMont) return mont;
  hasRequiredMont = 1;
  var P = requireBn$2(), c = requireInherits_browser(), O = requireBase$1(), q = requireUtils$1();
  function X(F) {
    O.call(this, "mont", F), this.a = new P(F.a, 16).toRed(this.red), this.b = new P(F.b, 16).toRed(this.red), this.i4 = new P(4).toRed(this.red).redInvm(), this.two = new P(2).toRed(this.red), this.a24 = this.i4.redMul(this.a.redAdd(this.two));
  }
  c(X, O), mont = X, X.prototype.validate = function(F) {
    var l = F.normalize().x, U = l.redSqr(), $ = U.redMul(l).redAdd(U.redMul(this.a)).redAdd(l), D = $.redSqrt();
    return D.redSqr().cmp($) === 0;
  };
  function t(F, l, U) {
    O.BasePoint.call(this, F, "projective"), l === null && U === null ? (this.x = this.curve.one, this.z = this.curve.zero) : (this.x = new P(l, 16), this.z = new P(U, 16), this.x.red || (this.x = this.x.toRed(this.curve.red)), this.z.red || (this.z = this.z.toRed(this.curve.red)));
  }
  return c(t, O.BasePoint), X.prototype.decodePoint = function(F, l) {
    return this.point(q.toArray(F, l), 1);
  }, X.prototype.point = function(F, l) {
    return new t(this, F, l);
  }, X.prototype.pointFromJSON = function(F) {
    return t.fromJSON(this, F);
  }, t.prototype.precompute = function() {
  }, t.prototype._encode = function() {
    return this.getX().toArray("be", this.curve.p.byteLength());
  }, t.fromJSON = function(F, l) {
    return new t(F, l[0], l[1] || F.one);
  }, t.prototype.inspect = function() {
    return this.isInfinity() ? "<EC Point Infinity>" : "<EC Point x: " + this.x.fromRed().toString(16, 2) + " z: " + this.z.fromRed().toString(16, 2) + ">";
  }, t.prototype.isInfinity = function() {
    return this.z.cmpn(0) === 0;
  }, t.prototype.dbl = function() {
    var F = this.x.redAdd(this.z), l = F.redSqr(), U = this.x.redSub(this.z), $ = U.redSqr(), D = l.redSub($), Q = l.redMul($), V = D.redMul($.redAdd(this.curve.a24.redMul(D)));
    return this.curve.point(Q, V);
  }, t.prototype.add = function() {
    throw new Error("Not supported on Montgomery curve");
  }, t.prototype.diffAdd = function(F, l) {
    var U = this.x.redAdd(this.z), $ = this.x.redSub(this.z), D = F.x.redAdd(F.z), Q = F.x.redSub(F.z), V = Q.redMul(U), te = D.redMul($), ie = l.z.redMul(V.redAdd(te).redSqr()), ne = l.x.redMul(V.redISub(te).redSqr());
    return this.curve.point(ie, ne);
  }, t.prototype.mul = function(F) {
    for (var l = F.clone(), U = this, $ = this.curve.point(null, null), D = this, Q = []; l.cmpn(0) !== 0; l.iushrn(1))
      Q.push(l.andln(1));
    for (var V = Q.length - 1; V >= 0; V--)
      Q[V] === 0 ? (U = U.diffAdd($, D), $ = $.dbl()) : ($ = U.diffAdd($, D), U = U.dbl());
    return $;
  }, t.prototype.mulAdd = function() {
    throw new Error("Not supported on Montgomery curve");
  }, t.prototype.jumlAdd = function() {
    throw new Error("Not supported on Montgomery curve");
  }, t.prototype.eq = function(F) {
    return this.getX().cmp(F.getX()) === 0;
  }, t.prototype.normalize = function() {
    return this.x = this.x.redMul(this.z.redInvm()), this.z = this.curve.one, this;
  }, t.prototype.getX = function() {
    return this.normalize(), this.x.fromRed();
  }, mont;
}
var edwards, hasRequiredEdwards;
function requireEdwards() {
  if (hasRequiredEdwards) return edwards;
  hasRequiredEdwards = 1;
  var P = requireUtils$1(), c = requireBn$2(), O = requireInherits_browser(), q = requireBase$1(), X = P.assert;
  function t(l) {
    this.twisted = (l.a | 0) !== 1, this.mOneA = this.twisted && (l.a | 0) === -1, this.extended = this.mOneA, q.call(this, "edwards", l), this.a = new c(l.a, 16).umod(this.red.m), this.a = this.a.toRed(this.red), this.c = new c(l.c, 16).toRed(this.red), this.c2 = this.c.redSqr(), this.d = new c(l.d, 16).toRed(this.red), this.dd = this.d.redAdd(this.d), X(!this.twisted || this.c.fromRed().cmpn(1) === 0), this.oneC = (l.c | 0) === 1;
  }
  O(t, q), edwards = t, t.prototype._mulA = function(l) {
    return this.mOneA ? l.redNeg() : this.a.redMul(l);
  }, t.prototype._mulC = function(l) {
    return this.oneC ? l : this.c.redMul(l);
  }, t.prototype.jpoint = function(l, U, $, D) {
    return this.point(l, U, $, D);
  }, t.prototype.pointFromX = function(l, U) {
    l = new c(l, 16), l.red || (l = l.toRed(this.red));
    var $ = l.redSqr(), D = this.c2.redSub(this.a.redMul($)), Q = this.one.redSub(this.c2.redMul(this.d).redMul($)), V = D.redMul(Q.redInvm()), te = V.redSqrt();
    if (te.redSqr().redSub(V).cmp(this.zero) !== 0)
      throw new Error("invalid point");
    var ie = te.fromRed().isOdd();
    return (U && !ie || !U && ie) && (te = te.redNeg()), this.point(l, te);
  }, t.prototype.pointFromY = function(l, U) {
    l = new c(l, 16), l.red || (l = l.toRed(this.red));
    var $ = l.redSqr(), D = $.redSub(this.c2), Q = $.redMul(this.d).redMul(this.c2).redSub(this.a), V = D.redMul(Q.redInvm());
    if (V.cmp(this.zero) === 0) {
      if (U)
        throw new Error("invalid point");
      return this.point(this.zero, l);
    }
    var te = V.redSqrt();
    if (te.redSqr().redSub(V).cmp(this.zero) !== 0)
      throw new Error("invalid point");
    return te.fromRed().isOdd() !== U && (te = te.redNeg()), this.point(te, l);
  }, t.prototype.validate = function(l) {
    if (l.isInfinity())
      return !0;
    l.normalize();
    var U = l.x.redSqr(), $ = l.y.redSqr(), D = U.redMul(this.a).redAdd($), Q = this.c2.redMul(this.one.redAdd(this.d.redMul(U).redMul($)));
    return D.cmp(Q) === 0;
  };
  function F(l, U, $, D, Q) {
    q.BasePoint.call(this, l, "projective"), U === null && $ === null && D === null ? (this.x = this.curve.zero, this.y = this.curve.one, this.z = this.curve.one, this.t = this.curve.zero, this.zOne = !0) : (this.x = new c(U, 16), this.y = new c($, 16), this.z = D ? new c(D, 16) : this.curve.one, this.t = Q && new c(Q, 16), this.x.red || (this.x = this.x.toRed(this.curve.red)), this.y.red || (this.y = this.y.toRed(this.curve.red)), this.z.red || (this.z = this.z.toRed(this.curve.red)), this.t && !this.t.red && (this.t = this.t.toRed(this.curve.red)), this.zOne = this.z === this.curve.one, this.curve.extended && !this.t && (this.t = this.x.redMul(this.y), this.zOne || (this.t = this.t.redMul(this.z.redInvm()))));
  }
  return O(F, q.BasePoint), t.prototype.pointFromJSON = function(l) {
    return F.fromJSON(this, l);
  }, t.prototype.point = function(l, U, $, D) {
    return new F(this, l, U, $, D);
  }, F.fromJSON = function(l, U) {
    return new F(l, U[0], U[1], U[2]);
  }, F.prototype.inspect = function() {
    return this.isInfinity() ? "<EC Point Infinity>" : "<EC Point x: " + this.x.fromRed().toString(16, 2) + " y: " + this.y.fromRed().toString(16, 2) + " z: " + this.z.fromRed().toString(16, 2) + ">";
  }, F.prototype.isInfinity = function() {
    return this.x.cmpn(0) === 0 && (this.y.cmp(this.z) === 0 || this.zOne && this.y.cmp(this.curve.c) === 0);
  }, F.prototype._extDbl = function() {
    var l = this.x.redSqr(), U = this.y.redSqr(), $ = this.z.redSqr();
    $ = $.redIAdd($);
    var D = this.curve._mulA(l), Q = this.x.redAdd(this.y).redSqr().redISub(l).redISub(U), V = D.redAdd(U), te = V.redSub($), ie = D.redSub(U), ne = Q.redMul(te), se = V.redMul(ie), ae = Q.redMul(ie), oe = te.redMul(V);
    return this.curve.point(ne, se, oe, ae);
  }, F.prototype._projDbl = function() {
    var l = this.x.redAdd(this.y).redSqr(), U = this.x.redSqr(), $ = this.y.redSqr(), D, Q, V, te, ie, ne;
    if (this.curve.twisted) {
      te = this.curve._mulA(U);
      var se = te.redAdd($);
      this.zOne ? (D = l.redSub(U).redSub($).redMul(se.redSub(this.curve.two)), Q = se.redMul(te.redSub($)), V = se.redSqr().redSub(se).redSub(se)) : (ie = this.z.redSqr(), ne = se.redSub(ie).redISub(ie), D = l.redSub(U).redISub($).redMul(ne), Q = se.redMul(te.redSub($)), V = se.redMul(ne));
    } else
      te = U.redAdd($), ie = this.curve._mulC(this.z).redSqr(), ne = te.redSub(ie).redSub(ie), D = this.curve._mulC(l.redISub(te)).redMul(ne), Q = this.curve._mulC(te).redMul(U.redISub($)), V = te.redMul(ne);
    return this.curve.point(D, Q, V);
  }, F.prototype.dbl = function() {
    return this.isInfinity() ? this : this.curve.extended ? this._extDbl() : this._projDbl();
  }, F.prototype._extAdd = function(l) {
    var U = this.y.redSub(this.x).redMul(l.y.redSub(l.x)), $ = this.y.redAdd(this.x).redMul(l.y.redAdd(l.x)), D = this.t.redMul(this.curve.dd).redMul(l.t), Q = this.z.redMul(l.z.redAdd(l.z)), V = $.redSub(U), te = Q.redSub(D), ie = Q.redAdd(D), ne = $.redAdd(U), se = V.redMul(te), ae = ie.redMul(ne), oe = V.redMul(ne), be = te.redMul(ie);
    return this.curve.point(se, ae, be, oe);
  }, F.prototype._projAdd = function(l) {
    var U = this.z.redMul(l.z), $ = U.redSqr(), D = this.x.redMul(l.x), Q = this.y.redMul(l.y), V = this.curve.d.redMul(D).redMul(Q), te = $.redSub(V), ie = $.redAdd(V), ne = this.x.redAdd(this.y).redMul(l.x.redAdd(l.y)).redISub(D).redISub(Q), se = U.redMul(te).redMul(ne), ae, oe;
    return this.curve.twisted ? (ae = U.redMul(ie).redMul(Q.redSub(this.curve._mulA(D))), oe = te.redMul(ie)) : (ae = U.redMul(ie).redMul(Q.redSub(D)), oe = this.curve._mulC(te).redMul(ie)), this.curve.point(se, ae, oe);
  }, F.prototype.add = function(l) {
    return this.isInfinity() ? l : l.isInfinity() ? this : this.curve.extended ? this._extAdd(l) : this._projAdd(l);
  }, F.prototype.mul = function(l) {
    return this._hasDoubles(l) ? this.curve._fixedNafMul(this, l) : this.curve._wnafMul(this, l);
  }, F.prototype.mulAdd = function(l, U, $) {
    return this.curve._wnafMulAdd(1, [this, U], [l, $], 2, !1);
  }, F.prototype.jmulAdd = function(l, U, $) {
    return this.curve._wnafMulAdd(1, [this, U], [l, $], 2, !0);
  }, F.prototype.normalize = function() {
    if (this.zOne)
      return this;
    var l = this.z.redInvm();
    return this.x = this.x.redMul(l), this.y = this.y.redMul(l), this.t && (this.t = this.t.redMul(l)), this.z = this.curve.one, this.zOne = !0, this;
  }, F.prototype.neg = function() {
    return this.curve.point(
      this.x.redNeg(),
      this.y,
      this.z,
      this.t && this.t.redNeg()
    );
  }, F.prototype.getX = function() {
    return this.normalize(), this.x.fromRed();
  }, F.prototype.getY = function() {
    return this.normalize(), this.y.fromRed();
  }, F.prototype.eq = function(l) {
    return this === l || this.getX().cmp(l.getX()) === 0 && this.getY().cmp(l.getY()) === 0;
  }, F.prototype.eqXToP = function(l) {
    var U = l.toRed(this.curve.red).redMul(this.z);
    if (this.x.cmp(U) === 0)
      return !0;
    for (var $ = l.clone(), D = this.curve.redN.redMul(this.z); ; ) {
      if ($.iadd(this.curve.n), $.cmp(this.curve.p) >= 0)
        return !1;
      if (U.redIAdd(D), this.x.cmp(U) === 0)
        return !0;
    }
  }, F.prototype.toP = F.prototype.normalize, F.prototype.mixedAdd = F.prototype.add, edwards;
}
var hasRequiredCurve;
function requireCurve() {
  return hasRequiredCurve || (hasRequiredCurve = 1, function(P) {
    var c = P;
    c.base = requireBase$1(), c.short = requireShort(), c.mont = requireMont(), c.edwards = requireEdwards();
  }(curve)), curve;
}
var curves = {}, hash = {}, utils = {}, hasRequiredUtils;
function requireUtils() {
  if (hasRequiredUtils) return utils;
  hasRequiredUtils = 1;
  var P = requireMinimalisticAssert(), c = requireInherits_browser();
  utils.inherits = c;
  function O(ee, e) {
    return (ee.charCodeAt(e) & 64512) !== 55296 || e < 0 || e + 1 >= ee.length ? !1 : (ee.charCodeAt(e + 1) & 64512) === 56320;
  }
  function q(ee, e) {
    if (Array.isArray(ee))
      return ee.slice();
    if (!ee)
      return [];
    var o = [];
    if (typeof ee == "string")
      if (e) {
        if (e === "hex")
          for (ee = ee.replace(/[^a-z0-9]+/ig, ""), ee.length % 2 !== 0 && (ee = "0" + ee), H = 0; H < ee.length; H += 2)
            o.push(parseInt(ee[H] + ee[H + 1], 16));
      } else for (var y = 0, H = 0; H < ee.length; H++) {
        var z = ee.charCodeAt(H);
        z < 128 ? o[y++] = z : z < 2048 ? (o[y++] = z >> 6 | 192, o[y++] = z & 63 | 128) : O(ee, H) ? (z = 65536 + ((z & 1023) << 10) + (ee.charCodeAt(++H) & 1023), o[y++] = z >> 18 | 240, o[y++] = z >> 12 & 63 | 128, o[y++] = z >> 6 & 63 | 128, o[y++] = z & 63 | 128) : (o[y++] = z >> 12 | 224, o[y++] = z >> 6 & 63 | 128, o[y++] = z & 63 | 128);
      }
    else
      for (H = 0; H < ee.length; H++)
        o[H] = ee[H] | 0;
    return o;
  }
  utils.toArray = q;
  function X(ee) {
    for (var e = "", o = 0; o < ee.length; o++)
      e += l(ee[o].toString(16));
    return e;
  }
  utils.toHex = X;
  function t(ee) {
    var e = ee >>> 24 | ee >>> 8 & 65280 | ee << 8 & 16711680 | (ee & 255) << 24;
    return e >>> 0;
  }
  utils.htonl = t;
  function F(ee, e) {
    for (var o = "", y = 0; y < ee.length; y++) {
      var H = ee[y];
      e === "little" && (H = t(H)), o += U(H.toString(16));
    }
    return o;
  }
  utils.toHex32 = F;
  function l(ee) {
    return ee.length === 1 ? "0" + ee : ee;
  }
  utils.zero2 = l;
  function U(ee) {
    return ee.length === 7 ? "0" + ee : ee.length === 6 ? "00" + ee : ee.length === 5 ? "000" + ee : ee.length === 4 ? "0000" + ee : ee.length === 3 ? "00000" + ee : ee.length === 2 ? "000000" + ee : ee.length === 1 ? "0000000" + ee : ee;
  }
  utils.zero8 = U;
  function $(ee, e, o, y) {
    var H = o - e;
    P(H % 4 === 0);
    for (var z = new Array(H / 4), B = 0, w = e; B < z.length; B++, w += 4) {
      var G;
      y === "big" ? G = ee[w] << 24 | ee[w + 1] << 16 | ee[w + 2] << 8 | ee[w + 3] : G = ee[w + 3] << 24 | ee[w + 2] << 16 | ee[w + 1] << 8 | ee[w], z[B] = G >>> 0;
    }
    return z;
  }
  utils.join32 = $;
  function D(ee, e) {
    for (var o = new Array(ee.length * 4), y = 0, H = 0; y < ee.length; y++, H += 4) {
      var z = ee[y];
      e === "big" ? (o[H] = z >>> 24, o[H + 1] = z >>> 16 & 255, o[H + 2] = z >>> 8 & 255, o[H + 3] = z & 255) : (o[H + 3] = z >>> 24, o[H + 2] = z >>> 16 & 255, o[H + 1] = z >>> 8 & 255, o[H] = z & 255);
    }
    return o;
  }
  utils.split32 = D;
  function Q(ee, e) {
    return ee >>> e | ee << 32 - e;
  }
  utils.rotr32 = Q;
  function V(ee, e) {
    return ee << e | ee >>> 32 - e;
  }
  utils.rotl32 = V;
  function te(ee, e) {
    return ee + e >>> 0;
  }
  utils.sum32 = te;
  function ie(ee, e, o) {
    return ee + e + o >>> 0;
  }
  utils.sum32_3 = ie;
  function ne(ee, e, o, y) {
    return ee + e + o + y >>> 0;
  }
  utils.sum32_4 = ne;
  function se(ee, e, o, y, H) {
    return ee + e + o + y + H >>> 0;
  }
  utils.sum32_5 = se;
  function ae(ee, e, o, y) {
    var H = ee[e], z = ee[e + 1], B = y + z >>> 0, w = (B < y ? 1 : 0) + o + H;
    ee[e] = w >>> 0, ee[e + 1] = B;
  }
  utils.sum64 = ae;
  function oe(ee, e, o, y) {
    var H = e + y >>> 0, z = (H < e ? 1 : 0) + ee + o;
    return z >>> 0;
  }
  utils.sum64_hi = oe;
  function be(ee, e, o, y) {
    var H = e + y;
    return H >>> 0;
  }
  utils.sum64_lo = be;
  function de(ee, e, o, y, H, z, B, w) {
    var G = 0, g = e;
    g = g + y >>> 0, G += g < e ? 1 : 0, g = g + z >>> 0, G += g < z ? 1 : 0, g = g + w >>> 0, G += g < w ? 1 : 0;
    var J = ee + o + H + B + G;
    return J >>> 0;
  }
  utils.sum64_4_hi = de;
  function _e(ee, e, o, y, H, z, B, w) {
    var G = e + y + z + w;
    return G >>> 0;
  }
  utils.sum64_4_lo = _e;
  function qe(ee, e, o, y, H, z, B, w, G, g) {
    var J = 0, le = e;
    le = le + y >>> 0, J += le < e ? 1 : 0, le = le + z >>> 0, J += le < z ? 1 : 0, le = le + w >>> 0, J += le < w ? 1 : 0, le = le + g >>> 0, J += le < g ? 1 : 0;
    var ge = ee + o + H + B + G + J;
    return ge >>> 0;
  }
  utils.sum64_5_hi = qe;
  function Te(ee, e, o, y, H, z, B, w, G, g) {
    var J = e + y + z + w + g;
    return J >>> 0;
  }
  utils.sum64_5_lo = Te;
  function ce(ee, e, o) {
    var y = e << 32 - o | ee >>> o;
    return y >>> 0;
  }
  utils.rotr64_hi = ce;
  function pe(ee, e, o) {
    var y = ee << 32 - o | e >>> o;
    return y >>> 0;
  }
  utils.rotr64_lo = pe;
  function Me(ee, e, o) {
    return ee >>> o;
  }
  utils.shr64_hi = Me;
  function K(ee, e, o) {
    var y = ee << 32 - o | e >>> o;
    return y >>> 0;
  }
  return utils.shr64_lo = K, utils;
}
var common$1 = {}, hasRequiredCommon$1;
function requireCommon$1() {
  if (hasRequiredCommon$1) return common$1;
  hasRequiredCommon$1 = 1;
  var P = requireUtils(), c = requireMinimalisticAssert();
  function O() {
    this.pending = null, this.pendingTotal = 0, this.blockSize = this.constructor.blockSize, this.outSize = this.constructor.outSize, this.hmacStrength = this.constructor.hmacStrength, this.padLength = this.constructor.padLength / 8, this.endian = "big", this._delta8 = this.blockSize / 8, this._delta32 = this.blockSize / 32;
  }
  return common$1.BlockHash = O, O.prototype.update = function(q, X) {
    if (q = P.toArray(q, X), this.pending ? this.pending = this.pending.concat(q) : this.pending = q, this.pendingTotal += q.length, this.pending.length >= this._delta8) {
      q = this.pending;
      var t = q.length % this._delta8;
      this.pending = q.slice(q.length - t, q.length), this.pending.length === 0 && (this.pending = null), q = P.join32(q, 0, q.length - t, this.endian);
      for (var F = 0; F < q.length; F += this._delta32)
        this._update(q, F, F + this._delta32);
    }
    return this;
  }, O.prototype.digest = function(q) {
    return this.update(this._pad()), c(this.pending === null), this._digest(q);
  }, O.prototype._pad = function() {
    var q = this.pendingTotal, X = this._delta8, t = X - (q + this.padLength) % X, F = new Array(t + this.padLength);
    F[0] = 128;
    for (var l = 1; l < t; l++)
      F[l] = 0;
    if (q <<= 3, this.endian === "big") {
      for (var U = 8; U < this.padLength; U++)
        F[l++] = 0;
      F[l++] = 0, F[l++] = 0, F[l++] = 0, F[l++] = 0, F[l++] = q >>> 24 & 255, F[l++] = q >>> 16 & 255, F[l++] = q >>> 8 & 255, F[l++] = q & 255;
    } else
      for (F[l++] = q & 255, F[l++] = q >>> 8 & 255, F[l++] = q >>> 16 & 255, F[l++] = q >>> 24 & 255, F[l++] = 0, F[l++] = 0, F[l++] = 0, F[l++] = 0, U = 8; U < this.padLength; U++)
        F[l++] = 0;
    return F;
  }, common$1;
}
var sha = {}, common = {}, hasRequiredCommon;
function requireCommon() {
  if (hasRequiredCommon) return common;
  hasRequiredCommon = 1;
  var P = requireUtils(), c = P.rotr32;
  function O(D, Q, V, te) {
    if (D === 0)
      return q(Q, V, te);
    if (D === 1 || D === 3)
      return t(Q, V, te);
    if (D === 2)
      return X(Q, V, te);
  }
  common.ft_1 = O;
  function q(D, Q, V) {
    return D & Q ^ ~D & V;
  }
  common.ch32 = q;
  function X(D, Q, V) {
    return D & Q ^ D & V ^ Q & V;
  }
  common.maj32 = X;
  function t(D, Q, V) {
    return D ^ Q ^ V;
  }
  common.p32 = t;
  function F(D) {
    return c(D, 2) ^ c(D, 13) ^ c(D, 22);
  }
  common.s0_256 = F;
  function l(D) {
    return c(D, 6) ^ c(D, 11) ^ c(D, 25);
  }
  common.s1_256 = l;
  function U(D) {
    return c(D, 7) ^ c(D, 18) ^ D >>> 3;
  }
  common.g0_256 = U;
  function $(D) {
    return c(D, 17) ^ c(D, 19) ^ D >>> 10;
  }
  return common.g1_256 = $, common;
}
var _1, hasRequired_1;
function require_1() {
  if (hasRequired_1) return _1;
  hasRequired_1 = 1;
  var P = requireUtils(), c = requireCommon$1(), O = requireCommon(), q = P.rotl32, X = P.sum32, t = P.sum32_5, F = O.ft_1, l = c.BlockHash, U = [
    1518500249,
    1859775393,
    2400959708,
    3395469782
  ];
  function $() {
    if (!(this instanceof $))
      return new $();
    l.call(this), this.h = [
      1732584193,
      4023233417,
      2562383102,
      271733878,
      3285377520
    ], this.W = new Array(80);
  }
  return P.inherits($, l), _1 = $, $.blockSize = 512, $.outSize = 160, $.hmacStrength = 80, $.padLength = 64, $.prototype._update = function(D, Q) {
    for (var V = this.W, te = 0; te < 16; te++)
      V[te] = D[Q + te];
    for (; te < V.length; te++)
      V[te] = q(V[te - 3] ^ V[te - 8] ^ V[te - 14] ^ V[te - 16], 1);
    var ie = this.h[0], ne = this.h[1], se = this.h[2], ae = this.h[3], oe = this.h[4];
    for (te = 0; te < V.length; te++) {
      var be = ~~(te / 20), de = t(q(ie, 5), F(be, ne, se, ae), oe, V[te], U[be]);
      oe = ae, ae = se, se = q(ne, 30), ne = ie, ie = de;
    }
    this.h[0] = X(this.h[0], ie), this.h[1] = X(this.h[1], ne), this.h[2] = X(this.h[2], se), this.h[3] = X(this.h[3], ae), this.h[4] = X(this.h[4], oe);
  }, $.prototype._digest = function(D) {
    return D === "hex" ? P.toHex32(this.h, "big") : P.split32(this.h, "big");
  }, _1;
}
var _256, hasRequired_256;
function require_256() {
  if (hasRequired_256) return _256;
  hasRequired_256 = 1;
  var P = requireUtils(), c = requireCommon$1(), O = requireCommon(), q = requireMinimalisticAssert(), X = P.sum32, t = P.sum32_4, F = P.sum32_5, l = O.ch32, U = O.maj32, $ = O.s0_256, D = O.s1_256, Q = O.g0_256, V = O.g1_256, te = c.BlockHash, ie = [
    1116352408,
    1899447441,
    3049323471,
    3921009573,
    961987163,
    1508970993,
    2453635748,
    2870763221,
    3624381080,
    310598401,
    607225278,
    1426881987,
    1925078388,
    2162078206,
    2614888103,
    3248222580,
    3835390401,
    4022224774,
    264347078,
    604807628,
    770255983,
    1249150122,
    1555081692,
    1996064986,
    2554220882,
    2821834349,
    2952996808,
    3210313671,
    3336571891,
    3584528711,
    113926993,
    338241895,
    666307205,
    773529912,
    1294757372,
    1396182291,
    1695183700,
    1986661051,
    2177026350,
    2456956037,
    2730485921,
    2820302411,
    3259730800,
    3345764771,
    3516065817,
    3600352804,
    4094571909,
    275423344,
    430227734,
    506948616,
    659060556,
    883997877,
    958139571,
    1322822218,
    1537002063,
    1747873779,
    1955562222,
    2024104815,
    2227730452,
    2361852424,
    2428436474,
    2756734187,
    3204031479,
    3329325298
  ];
  function ne() {
    if (!(this instanceof ne))
      return new ne();
    te.call(this), this.h = [
      1779033703,
      3144134277,
      1013904242,
      2773480762,
      1359893119,
      2600822924,
      528734635,
      1541459225
    ], this.k = ie, this.W = new Array(64);
  }
  return P.inherits(ne, te), _256 = ne, ne.blockSize = 512, ne.outSize = 256, ne.hmacStrength = 192, ne.padLength = 64, ne.prototype._update = function(se, ae) {
    for (var oe = this.W, be = 0; be < 16; be++)
      oe[be] = se[ae + be];
    for (; be < oe.length; be++)
      oe[be] = t(V(oe[be - 2]), oe[be - 7], Q(oe[be - 15]), oe[be - 16]);
    var de = this.h[0], _e = this.h[1], qe = this.h[2], Te = this.h[3], ce = this.h[4], pe = this.h[5], Me = this.h[6], K = this.h[7];
    for (q(this.k.length === oe.length), be = 0; be < oe.length; be++) {
      var ee = F(K, D(ce), l(ce, pe, Me), this.k[be], oe[be]), e = X($(de), U(de, _e, qe));
      K = Me, Me = pe, pe = ce, ce = X(Te, ee), Te = qe, qe = _e, _e = de, de = X(ee, e);
    }
    this.h[0] = X(this.h[0], de), this.h[1] = X(this.h[1], _e), this.h[2] = X(this.h[2], qe), this.h[3] = X(this.h[3], Te), this.h[4] = X(this.h[4], ce), this.h[5] = X(this.h[5], pe), this.h[6] = X(this.h[6], Me), this.h[7] = X(this.h[7], K);
  }, ne.prototype._digest = function(se) {
    return se === "hex" ? P.toHex32(this.h, "big") : P.split32(this.h, "big");
  }, _256;
}
var _224, hasRequired_224;
function require_224() {
  if (hasRequired_224) return _224;
  hasRequired_224 = 1;
  var P = requireUtils(), c = require_256();
  function O() {
    if (!(this instanceof O))
      return new O();
    c.call(this), this.h = [
      3238371032,
      914150663,
      812702999,
      4144912697,
      4290775857,
      1750603025,
      1694076839,
      3204075428
    ];
  }
  return P.inherits(O, c), _224 = O, O.blockSize = 512, O.outSize = 224, O.hmacStrength = 192, O.padLength = 64, O.prototype._digest = function(q) {
    return q === "hex" ? P.toHex32(this.h.slice(0, 7), "big") : P.split32(this.h.slice(0, 7), "big");
  }, _224;
}
var _512, hasRequired_512;
function require_512() {
  if (hasRequired_512) return _512;
  hasRequired_512 = 1;
  var P = requireUtils(), c = requireCommon$1(), O = requireMinimalisticAssert(), q = P.rotr64_hi, X = P.rotr64_lo, t = P.shr64_hi, F = P.shr64_lo, l = P.sum64, U = P.sum64_hi, $ = P.sum64_lo, D = P.sum64_4_hi, Q = P.sum64_4_lo, V = P.sum64_5_hi, te = P.sum64_5_lo, ie = c.BlockHash, ne = [
    1116352408,
    3609767458,
    1899447441,
    602891725,
    3049323471,
    3964484399,
    3921009573,
    2173295548,
    961987163,
    4081628472,
    1508970993,
    3053834265,
    2453635748,
    2937671579,
    2870763221,
    3664609560,
    3624381080,
    2734883394,
    310598401,
    1164996542,
    607225278,
    1323610764,
    1426881987,
    3590304994,
    1925078388,
    4068182383,
    2162078206,
    991336113,
    2614888103,
    633803317,
    3248222580,
    3479774868,
    3835390401,
    2666613458,
    4022224774,
    944711139,
    264347078,
    2341262773,
    604807628,
    2007800933,
    770255983,
    1495990901,
    1249150122,
    1856431235,
    1555081692,
    3175218132,
    1996064986,
    2198950837,
    2554220882,
    3999719339,
    2821834349,
    766784016,
    2952996808,
    2566594879,
    3210313671,
    3203337956,
    3336571891,
    1034457026,
    3584528711,
    2466948901,
    113926993,
    3758326383,
    338241895,
    168717936,
    666307205,
    1188179964,
    773529912,
    1546045734,
    1294757372,
    1522805485,
    1396182291,
    2643833823,
    1695183700,
    2343527390,
    1986661051,
    1014477480,
    2177026350,
    1206759142,
    2456956037,
    344077627,
    2730485921,
    1290863460,
    2820302411,
    3158454273,
    3259730800,
    3505952657,
    3345764771,
    106217008,
    3516065817,
    3606008344,
    3600352804,
    1432725776,
    4094571909,
    1467031594,
    275423344,
    851169720,
    430227734,
    3100823752,
    506948616,
    1363258195,
    659060556,
    3750685593,
    883997877,
    3785050280,
    958139571,
    3318307427,
    1322822218,
    3812723403,
    1537002063,
    2003034995,
    1747873779,
    3602036899,
    1955562222,
    1575990012,
    2024104815,
    1125592928,
    2227730452,
    2716904306,
    2361852424,
    442776044,
    2428436474,
    593698344,
    2756734187,
    3733110249,
    3204031479,
    2999351573,
    3329325298,
    3815920427,
    3391569614,
    3928383900,
    3515267271,
    566280711,
    3940187606,
    3454069534,
    4118630271,
    4000239992,
    116418474,
    1914138554,
    174292421,
    2731055270,
    289380356,
    3203993006,
    460393269,
    320620315,
    685471733,
    587496836,
    852142971,
    1086792851,
    1017036298,
    365543100,
    1126000580,
    2618297676,
    1288033470,
    3409855158,
    1501505948,
    4234509866,
    1607167915,
    987167468,
    1816402316,
    1246189591
  ];
  function se() {
    if (!(this instanceof se))
      return new se();
    ie.call(this), this.h = [
      1779033703,
      4089235720,
      3144134277,
      2227873595,
      1013904242,
      4271175723,
      2773480762,
      1595750129,
      1359893119,
      2917565137,
      2600822924,
      725511199,
      528734635,
      4215389547,
      1541459225,
      327033209
    ], this.k = ne, this.W = new Array(160);
  }
  P.inherits(se, ie), _512 = se, se.blockSize = 1024, se.outSize = 512, se.hmacStrength = 192, se.padLength = 128, se.prototype._prepareBlock = function(e, o) {
    for (var y = this.W, H = 0; H < 32; H++)
      y[H] = e[o + H];
    for (; H < y.length; H += 2) {
      var z = K(y[H - 4], y[H - 3]), B = ee(y[H - 4], y[H - 3]), w = y[H - 14], G = y[H - 13], g = pe(y[H - 30], y[H - 29]), J = Me(y[H - 30], y[H - 29]), le = y[H - 32], ge = y[H - 31];
      y[H] = D(
        z,
        B,
        w,
        G,
        g,
        J,
        le,
        ge
      ), y[H + 1] = Q(
        z,
        B,
        w,
        G,
        g,
        J,
        le,
        ge
      );
    }
  }, se.prototype._update = function(e, o) {
    this._prepareBlock(e, o);
    var y = this.W, H = this.h[0], z = this.h[1], B = this.h[2], w = this.h[3], G = this.h[4], g = this.h[5], J = this.h[6], le = this.h[7], ge = this.h[8], Se = this.h[9], ye = this.h[10], fe = this.h[11], he = this.h[12], Re = this.h[13], ke = this.h[14], me = this.h[15];
    O(this.k.length === y.length);
    for (var ve = 0; ve < y.length; ve += 2) {
      var Ae = ke, $e = me, Oe = Te(ge, Se), Y = ce(ge, Se), Z = ae(ge, Se, ye, fe, he), re = oe(ge, Se, ye, fe, he, Re), ue = this.k[ve], we = this.k[ve + 1], Ee = y[ve], Ie = y[ve + 1], xe = V(
        Ae,
        $e,
        Oe,
        Y,
        Z,
        re,
        ue,
        we,
        Ee,
        Ie
      ), Le = te(
        Ae,
        $e,
        Oe,
        Y,
        Z,
        re,
        ue,
        we,
        Ee,
        Ie
      );
      Ae = _e(H, z), $e = qe(H, z), Oe = be(H, z, B, w, G), Y = de(H, z, B, w, G, g);
      var Pe = U(Ae, $e, Oe, Y), Ce = $(Ae, $e, Oe, Y);
      ke = he, me = Re, he = ye, Re = fe, ye = ge, fe = Se, ge = U(J, le, xe, Le), Se = $(le, le, xe, Le), J = G, le = g, G = B, g = w, B = H, w = z, H = U(xe, Le, Pe, Ce), z = $(xe, Le, Pe, Ce);
    }
    l(this.h, 0, H, z), l(this.h, 2, B, w), l(this.h, 4, G, g), l(this.h, 6, J, le), l(this.h, 8, ge, Se), l(this.h, 10, ye, fe), l(this.h, 12, he, Re), l(this.h, 14, ke, me);
  }, se.prototype._digest = function(e) {
    return e === "hex" ? P.toHex32(this.h, "big") : P.split32(this.h, "big");
  };
  function ae(e, o, y, H, z) {
    var B = e & y ^ ~e & z;
    return B < 0 && (B += 4294967296), B;
  }
  function oe(e, o, y, H, z, B) {
    var w = o & H ^ ~o & B;
    return w < 0 && (w += 4294967296), w;
  }
  function be(e, o, y, H, z) {
    var B = e & y ^ e & z ^ y & z;
    return B < 0 && (B += 4294967296), B;
  }
  function de(e, o, y, H, z, B) {
    var w = o & H ^ o & B ^ H & B;
    return w < 0 && (w += 4294967296), w;
  }
  function _e(e, o) {
    var y = q(e, o, 28), H = q(o, e, 2), z = q(o, e, 7), B = y ^ H ^ z;
    return B < 0 && (B += 4294967296), B;
  }
  function qe(e, o) {
    var y = X(e, o, 28), H = X(o, e, 2), z = X(o, e, 7), B = y ^ H ^ z;
    return B < 0 && (B += 4294967296), B;
  }
  function Te(e, o) {
    var y = q(e, o, 14), H = q(e, o, 18), z = q(o, e, 9), B = y ^ H ^ z;
    return B < 0 && (B += 4294967296), B;
  }
  function ce(e, o) {
    var y = X(e, o, 14), H = X(e, o, 18), z = X(o, e, 9), B = y ^ H ^ z;
    return B < 0 && (B += 4294967296), B;
  }
  function pe(e, o) {
    var y = q(e, o, 1), H = q(e, o, 8), z = t(e, o, 7), B = y ^ H ^ z;
    return B < 0 && (B += 4294967296), B;
  }
  function Me(e, o) {
    var y = X(e, o, 1), H = X(e, o, 8), z = F(e, o, 7), B = y ^ H ^ z;
    return B < 0 && (B += 4294967296), B;
  }
  function K(e, o) {
    var y = q(e, o, 19), H = q(o, e, 29), z = t(e, o, 6), B = y ^ H ^ z;
    return B < 0 && (B += 4294967296), B;
  }
  function ee(e, o) {
    var y = X(e, o, 19), H = X(o, e, 29), z = F(e, o, 6), B = y ^ H ^ z;
    return B < 0 && (B += 4294967296), B;
  }
  return _512;
}
var _384, hasRequired_384;
function require_384() {
  if (hasRequired_384) return _384;
  hasRequired_384 = 1;
  var P = requireUtils(), c = require_512();
  function O() {
    if (!(this instanceof O))
      return new O();
    c.call(this), this.h = [
      3418070365,
      3238371032,
      1654270250,
      914150663,
      2438529370,
      812702999,
      355462360,
      4144912697,
      1731405415,
      4290775857,
      2394180231,
      1750603025,
      3675008525,
      1694076839,
      1203062813,
      3204075428
    ];
  }
  return P.inherits(O, c), _384 = O, O.blockSize = 1024, O.outSize = 384, O.hmacStrength = 192, O.padLength = 128, O.prototype._digest = function(q) {
    return q === "hex" ? P.toHex32(this.h.slice(0, 12), "big") : P.split32(this.h.slice(0, 12), "big");
  }, _384;
}
var hasRequiredSha;
function requireSha() {
  return hasRequiredSha || (hasRequiredSha = 1, sha.sha1 = require_1(), sha.sha224 = require_224(), sha.sha256 = require_256(), sha.sha384 = require_384(), sha.sha512 = require_512()), sha;
}
var ripemd = {}, hasRequiredRipemd;
function requireRipemd() {
  if (hasRequiredRipemd) return ripemd;
  hasRequiredRipemd = 1;
  var P = requireUtils(), c = requireCommon$1(), O = P.rotl32, q = P.sum32, X = P.sum32_3, t = P.sum32_4, F = c.BlockHash;
  function l() {
    if (!(this instanceof l))
      return new l();
    F.call(this), this.h = [1732584193, 4023233417, 2562383102, 271733878, 3285377520], this.endian = "little";
  }
  P.inherits(l, F), ripemd.ripemd160 = l, l.blockSize = 512, l.outSize = 160, l.hmacStrength = 192, l.padLength = 64, l.prototype._update = function(ne, se) {
    for (var ae = this.h[0], oe = this.h[1], be = this.h[2], de = this.h[3], _e = this.h[4], qe = ae, Te = oe, ce = be, pe = de, Me = _e, K = 0; K < 80; K++) {
      var ee = q(
        O(
          t(ae, U(K, oe, be, de), ne[Q[K] + se], $(K)),
          te[K]
        ),
        _e
      );
      ae = _e, _e = de, de = O(be, 10), be = oe, oe = ee, ee = q(
        O(
          t(qe, U(79 - K, Te, ce, pe), ne[V[K] + se], D(K)),
          ie[K]
        ),
        Me
      ), qe = Me, Me = pe, pe = O(ce, 10), ce = Te, Te = ee;
    }
    ee = X(this.h[1], be, pe), this.h[1] = X(this.h[2], de, Me), this.h[2] = X(this.h[3], _e, qe), this.h[3] = X(this.h[4], ae, Te), this.h[4] = X(this.h[0], oe, ce), this.h[0] = ee;
  }, l.prototype._digest = function(ne) {
    return ne === "hex" ? P.toHex32(this.h, "little") : P.split32(this.h, "little");
  };
  function U(ne, se, ae, oe) {
    return ne <= 15 ? se ^ ae ^ oe : ne <= 31 ? se & ae | ~se & oe : ne <= 47 ? (se | ~ae) ^ oe : ne <= 63 ? se & oe | ae & ~oe : se ^ (ae | ~oe);
  }
  function $(ne) {
    return ne <= 15 ? 0 : ne <= 31 ? 1518500249 : ne <= 47 ? 1859775393 : ne <= 63 ? 2400959708 : 2840853838;
  }
  function D(ne) {
    return ne <= 15 ? 1352829926 : ne <= 31 ? 1548603684 : ne <= 47 ? 1836072691 : ne <= 63 ? 2053994217 : 0;
  }
  var Q = [
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    7,
    4,
    13,
    1,
    10,
    6,
    15,
    3,
    12,
    0,
    9,
    5,
    2,
    14,
    11,
    8,
    3,
    10,
    14,
    4,
    9,
    15,
    8,
    1,
    2,
    7,
    0,
    6,
    13,
    11,
    5,
    12,
    1,
    9,
    11,
    10,
    0,
    8,
    12,
    4,
    13,
    3,
    7,
    15,
    14,
    5,
    6,
    2,
    4,
    0,
    5,
    9,
    7,
    12,
    2,
    10,
    14,
    1,
    3,
    8,
    11,
    6,
    15,
    13
  ], V = [
    5,
    14,
    7,
    0,
    9,
    2,
    11,
    4,
    13,
    6,
    15,
    8,
    1,
    10,
    3,
    12,
    6,
    11,
    3,
    7,
    0,
    13,
    5,
    10,
    14,
    15,
    8,
    12,
    4,
    9,
    1,
    2,
    15,
    5,
    1,
    3,
    7,
    14,
    6,
    9,
    11,
    8,
    12,
    2,
    10,
    0,
    4,
    13,
    8,
    6,
    4,
    1,
    3,
    11,
    15,
    0,
    5,
    12,
    2,
    13,
    9,
    7,
    10,
    14,
    12,
    15,
    10,
    4,
    1,
    5,
    8,
    7,
    6,
    2,
    13,
    14,
    0,
    3,
    9,
    11
  ], te = [
    11,
    14,
    15,
    12,
    5,
    8,
    7,
    9,
    11,
    13,
    14,
    15,
    6,
    7,
    9,
    8,
    7,
    6,
    8,
    13,
    11,
    9,
    7,
    15,
    7,
    12,
    15,
    9,
    11,
    7,
    13,
    12,
    11,
    13,
    6,
    7,
    14,
    9,
    13,
    15,
    14,
    8,
    13,
    6,
    5,
    12,
    7,
    5,
    11,
    12,
    14,
    15,
    14,
    15,
    9,
    8,
    9,
    14,
    5,
    6,
    8,
    6,
    5,
    12,
    9,
    15,
    5,
    11,
    6,
    8,
    13,
    12,
    5,
    12,
    13,
    14,
    11,
    8,
    5,
    6
  ], ie = [
    8,
    9,
    9,
    11,
    13,
    15,
    15,
    5,
    7,
    7,
    8,
    11,
    14,
    14,
    12,
    6,
    9,
    13,
    15,
    7,
    12,
    8,
    9,
    11,
    7,
    7,
    12,
    7,
    6,
    15,
    13,
    11,
    9,
    7,
    15,
    11,
    8,
    6,
    6,
    14,
    12,
    13,
    5,
    14,
    13,
    13,
    7,
    5,
    15,
    5,
    8,
    11,
    14,
    14,
    6,
    14,
    6,
    9,
    12,
    9,
    12,
    5,
    15,
    8,
    8,
    5,
    12,
    9,
    12,
    5,
    14,
    6,
    8,
    13,
    6,
    5,
    15,
    13,
    11,
    11
  ];
  return ripemd;
}
var hmac, hasRequiredHmac;
function requireHmac() {
  if (hasRequiredHmac) return hmac;
  hasRequiredHmac = 1;
  var P = requireUtils(), c = requireMinimalisticAssert();
  function O(q, X, t) {
    if (!(this instanceof O))
      return new O(q, X, t);
    this.Hash = q, this.blockSize = q.blockSize / 8, this.outSize = q.outSize / 8, this.inner = null, this.outer = null, this._init(P.toArray(X, t));
  }
  return hmac = O, O.prototype._init = function(q) {
    q.length > this.blockSize && (q = new this.Hash().update(q).digest()), c(q.length <= this.blockSize);
    for (var X = q.length; X < this.blockSize; X++)
      q.push(0);
    for (X = 0; X < q.length; X++)
      q[X] ^= 54;
    for (this.inner = new this.Hash().update(q), X = 0; X < q.length; X++)
      q[X] ^= 106;
    this.outer = new this.Hash().update(q);
  }, O.prototype.update = function(q, X) {
    return this.inner.update(q, X), this;
  }, O.prototype.digest = function(q) {
    return this.outer.update(this.inner.digest()), this.outer.digest(q);
  }, hmac;
}
var hasRequiredHash;
function requireHash() {
  return hasRequiredHash || (hasRequiredHash = 1, function(P) {
    var c = P;
    c.utils = requireUtils(), c.common = requireCommon$1(), c.sha = requireSha(), c.ripemd = requireRipemd(), c.hmac = requireHmac(), c.sha1 = c.sha.sha1, c.sha256 = c.sha.sha256, c.sha224 = c.sha.sha224, c.sha384 = c.sha.sha384, c.sha512 = c.sha.sha512, c.ripemd160 = c.ripemd.ripemd160;
  }(hash)), hash;
}
var secp256k1, hasRequiredSecp256k1;
function requireSecp256k1() {
  return hasRequiredSecp256k1 || (hasRequiredSecp256k1 = 1, secp256k1 = {
    doubles: {
      step: 4,
      points: [
        [
          "e60fce93b59e9ec53011aabc21c23e97b2a31369b87a5ae9c44ee89e2a6dec0a",
          "f7e3507399e595929db99f34f57937101296891e44d23f0be1f32cce69616821"
        ],
        [
          "8282263212c609d9ea2a6e3e172de238d8c39cabd5ac1ca10646e23fd5f51508",
          "11f8a8098557dfe45e8256e830b60ace62d613ac2f7b17bed31b6eaff6e26caf"
        ],
        [
          "175e159f728b865a72f99cc6c6fc846de0b93833fd2222ed73fce5b551e5b739",
          "d3506e0d9e3c79eba4ef97a51ff71f5eacb5955add24345c6efa6ffee9fed695"
        ],
        [
          "363d90d447b00c9c99ceac05b6262ee053441c7e55552ffe526bad8f83ff4640",
          "4e273adfc732221953b445397f3363145b9a89008199ecb62003c7f3bee9de9"
        ],
        [
          "8b4b5f165df3c2be8c6244b5b745638843e4a781a15bcd1b69f79a55dffdf80c",
          "4aad0a6f68d308b4b3fbd7813ab0da04f9e336546162ee56b3eff0c65fd4fd36"
        ],
        [
          "723cbaa6e5db996d6bf771c00bd548c7b700dbffa6c0e77bcb6115925232fcda",
          "96e867b5595cc498a921137488824d6e2660a0653779494801dc069d9eb39f5f"
        ],
        [
          "eebfa4d493bebf98ba5feec812c2d3b50947961237a919839a533eca0e7dd7fa",
          "5d9a8ca3970ef0f269ee7edaf178089d9ae4cdc3a711f712ddfd4fdae1de8999"
        ],
        [
          "100f44da696e71672791d0a09b7bde459f1215a29b3c03bfefd7835b39a48db0",
          "cdd9e13192a00b772ec8f3300c090666b7ff4a18ff5195ac0fbd5cd62bc65a09"
        ],
        [
          "e1031be262c7ed1b1dc9227a4a04c017a77f8d4464f3b3852c8acde6e534fd2d",
          "9d7061928940405e6bb6a4176597535af292dd419e1ced79a44f18f29456a00d"
        ],
        [
          "feea6cae46d55b530ac2839f143bd7ec5cf8b266a41d6af52d5e688d9094696d",
          "e57c6b6c97dce1bab06e4e12bf3ecd5c981c8957cc41442d3155debf18090088"
        ],
        [
          "da67a91d91049cdcb367be4be6ffca3cfeed657d808583de33fa978bc1ec6cb1",
          "9bacaa35481642bc41f463f7ec9780e5dec7adc508f740a17e9ea8e27a68be1d"
        ],
        [
          "53904faa0b334cdda6e000935ef22151ec08d0f7bb11069f57545ccc1a37b7c0",
          "5bc087d0bc80106d88c9eccac20d3c1c13999981e14434699dcb096b022771c8"
        ],
        [
          "8e7bcd0bd35983a7719cca7764ca906779b53a043a9b8bcaeff959f43ad86047",
          "10b7770b2a3da4b3940310420ca9514579e88e2e47fd68b3ea10047e8460372a"
        ],
        [
          "385eed34c1cdff21e6d0818689b81bde71a7f4f18397e6690a841e1599c43862",
          "283bebc3e8ea23f56701de19e9ebf4576b304eec2086dc8cc0458fe5542e5453"
        ],
        [
          "6f9d9b803ecf191637c73a4413dfa180fddf84a5947fbc9c606ed86c3fac3a7",
          "7c80c68e603059ba69b8e2a30e45c4d47ea4dd2f5c281002d86890603a842160"
        ],
        [
          "3322d401243c4e2582a2147c104d6ecbf774d163db0f5e5313b7e0e742d0e6bd",
          "56e70797e9664ef5bfb019bc4ddaf9b72805f63ea2873af624f3a2e96c28b2a0"
        ],
        [
          "85672c7d2de0b7da2bd1770d89665868741b3f9af7643397721d74d28134ab83",
          "7c481b9b5b43b2eb6374049bfa62c2e5e77f17fcc5298f44c8e3094f790313a6"
        ],
        [
          "948bf809b1988a46b06c9f1919413b10f9226c60f668832ffd959af60c82a0a",
          "53a562856dcb6646dc6b74c5d1c3418c6d4dff08c97cd2bed4cb7f88d8c8e589"
        ],
        [
          "6260ce7f461801c34f067ce0f02873a8f1b0e44dfc69752accecd819f38fd8e8",
          "bc2da82b6fa5b571a7f09049776a1ef7ecd292238051c198c1a84e95b2b4ae17"
        ],
        [
          "e5037de0afc1d8d43d8348414bbf4103043ec8f575bfdc432953cc8d2037fa2d",
          "4571534baa94d3b5f9f98d09fb990bddbd5f5b03ec481f10e0e5dc841d755bda"
        ],
        [
          "e06372b0f4a207adf5ea905e8f1771b4e7e8dbd1c6a6c5b725866a0ae4fce725",
          "7a908974bce18cfe12a27bb2ad5a488cd7484a7787104870b27034f94eee31dd"
        ],
        [
          "213c7a715cd5d45358d0bbf9dc0ce02204b10bdde2a3f58540ad6908d0559754",
          "4b6dad0b5ae462507013ad06245ba190bb4850f5f36a7eeddff2c27534b458f2"
        ],
        [
          "4e7c272a7af4b34e8dbb9352a5419a87e2838c70adc62cddf0cc3a3b08fbd53c",
          "17749c766c9d0b18e16fd09f6def681b530b9614bff7dd33e0b3941817dcaae6"
        ],
        [
          "fea74e3dbe778b1b10f238ad61686aa5c76e3db2be43057632427e2840fb27b6",
          "6e0568db9b0b13297cf674deccb6af93126b596b973f7b77701d3db7f23cb96f"
        ],
        [
          "76e64113f677cf0e10a2570d599968d31544e179b760432952c02a4417bdde39",
          "c90ddf8dee4e95cf577066d70681f0d35e2a33d2b56d2032b4b1752d1901ac01"
        ],
        [
          "c738c56b03b2abe1e8281baa743f8f9a8f7cc643df26cbee3ab150242bcbb891",
          "893fb578951ad2537f718f2eacbfbbbb82314eef7880cfe917e735d9699a84c3"
        ],
        [
          "d895626548b65b81e264c7637c972877d1d72e5f3a925014372e9f6588f6c14b",
          "febfaa38f2bc7eae728ec60818c340eb03428d632bb067e179363ed75d7d991f"
        ],
        [
          "b8da94032a957518eb0f6433571e8761ceffc73693e84edd49150a564f676e03",
          "2804dfa44805a1e4d7c99cc9762808b092cc584d95ff3b511488e4e74efdf6e7"
        ],
        [
          "e80fea14441fb33a7d8adab9475d7fab2019effb5156a792f1a11778e3c0df5d",
          "eed1de7f638e00771e89768ca3ca94472d155e80af322ea9fcb4291b6ac9ec78"
        ],
        [
          "a301697bdfcd704313ba48e51d567543f2a182031efd6915ddc07bbcc4e16070",
          "7370f91cfb67e4f5081809fa25d40f9b1735dbf7c0a11a130c0d1a041e177ea1"
        ],
        [
          "90ad85b389d6b936463f9d0512678de208cc330b11307fffab7ac63e3fb04ed4",
          "e507a3620a38261affdcbd9427222b839aefabe1582894d991d4d48cb6ef150"
        ],
        [
          "8f68b9d2f63b5f339239c1ad981f162ee88c5678723ea3351b7b444c9ec4c0da",
          "662a9f2dba063986de1d90c2b6be215dbbea2cfe95510bfdf23cbf79501fff82"
        ],
        [
          "e4f3fb0176af85d65ff99ff9198c36091f48e86503681e3e6686fd5053231e11",
          "1e63633ad0ef4f1c1661a6d0ea02b7286cc7e74ec951d1c9822c38576feb73bc"
        ],
        [
          "8c00fa9b18ebf331eb961537a45a4266c7034f2f0d4e1d0716fb6eae20eae29e",
          "efa47267fea521a1a9dc343a3736c974c2fadafa81e36c54e7d2a4c66702414b"
        ],
        [
          "e7a26ce69dd4829f3e10cec0a9e98ed3143d084f308b92c0997fddfc60cb3e41",
          "2a758e300fa7984b471b006a1aafbb18d0a6b2c0420e83e20e8a9421cf2cfd51"
        ],
        [
          "b6459e0ee3662ec8d23540c223bcbdc571cbcb967d79424f3cf29eb3de6b80ef",
          "67c876d06f3e06de1dadf16e5661db3c4b3ae6d48e35b2ff30bf0b61a71ba45"
        ],
        [
          "d68a80c8280bb840793234aa118f06231d6f1fc67e73c5a5deda0f5b496943e8",
          "db8ba9fff4b586d00c4b1f9177b0e28b5b0e7b8f7845295a294c84266b133120"
        ],
        [
          "324aed7df65c804252dc0270907a30b09612aeb973449cea4095980fc28d3d5d",
          "648a365774b61f2ff130c0c35aec1f4f19213b0c7e332843967224af96ab7c84"
        ],
        [
          "4df9c14919cde61f6d51dfdbe5fee5dceec4143ba8d1ca888e8bd373fd054c96",
          "35ec51092d8728050974c23a1d85d4b5d506cdc288490192ebac06cad10d5d"
        ],
        [
          "9c3919a84a474870faed8a9c1cc66021523489054d7f0308cbfc99c8ac1f98cd",
          "ddb84f0f4a4ddd57584f044bf260e641905326f76c64c8e6be7e5e03d4fc599d"
        ],
        [
          "6057170b1dd12fdf8de05f281d8e06bb91e1493a8b91d4cc5a21382120a959e5",
          "9a1af0b26a6a4807add9a2daf71df262465152bc3ee24c65e899be932385a2a8"
        ],
        [
          "a576df8e23a08411421439a4518da31880cef0fba7d4df12b1a6973eecb94266",
          "40a6bf20e76640b2c92b97afe58cd82c432e10a7f514d9f3ee8be11ae1b28ec8"
        ],
        [
          "7778a78c28dec3e30a05fe9629de8c38bb30d1f5cf9a3a208f763889be58ad71",
          "34626d9ab5a5b22ff7098e12f2ff580087b38411ff24ac563b513fc1fd9f43ac"
        ],
        [
          "928955ee637a84463729fd30e7afd2ed5f96274e5ad7e5cb09eda9c06d903ac",
          "c25621003d3f42a827b78a13093a95eeac3d26efa8a8d83fc5180e935bcd091f"
        ],
        [
          "85d0fef3ec6db109399064f3a0e3b2855645b4a907ad354527aae75163d82751",
          "1f03648413a38c0be29d496e582cf5663e8751e96877331582c237a24eb1f962"
        ],
        [
          "ff2b0dce97eece97c1c9b6041798b85dfdfb6d8882da20308f5404824526087e",
          "493d13fef524ba188af4c4dc54d07936c7b7ed6fb90e2ceb2c951e01f0c29907"
        ],
        [
          "827fbbe4b1e880ea9ed2b2e6301b212b57f1ee148cd6dd28780e5e2cf856e241",
          "c60f9c923c727b0b71bef2c67d1d12687ff7a63186903166d605b68baec293ec"
        ],
        [
          "eaa649f21f51bdbae7be4ae34ce6e5217a58fdce7f47f9aa7f3b58fa2120e2b3",
          "be3279ed5bbbb03ac69a80f89879aa5a01a6b965f13f7e59d47a5305ba5ad93d"
        ],
        [
          "e4a42d43c5cf169d9391df6decf42ee541b6d8f0c9a137401e23632dda34d24f",
          "4d9f92e716d1c73526fc99ccfb8ad34ce886eedfa8d8e4f13a7f7131deba9414"
        ],
        [
          "1ec80fef360cbdd954160fadab352b6b92b53576a88fea4947173b9d4300bf19",
          "aeefe93756b5340d2f3a4958a7abbf5e0146e77f6295a07b671cdc1cc107cefd"
        ],
        [
          "146a778c04670c2f91b00af4680dfa8bce3490717d58ba889ddb5928366642be",
          "b318e0ec3354028add669827f9d4b2870aaa971d2f7e5ed1d0b297483d83efd0"
        ],
        [
          "fa50c0f61d22e5f07e3acebb1aa07b128d0012209a28b9776d76a8793180eef9",
          "6b84c6922397eba9b72cd2872281a68a5e683293a57a213b38cd8d7d3f4f2811"
        ],
        [
          "da1d61d0ca721a11b1a5bf6b7d88e8421a288ab5d5bba5220e53d32b5f067ec2",
          "8157f55a7c99306c79c0766161c91e2966a73899d279b48a655fba0f1ad836f1"
        ],
        [
          "a8e282ff0c9706907215ff98e8fd416615311de0446f1e062a73b0610d064e13",
          "7f97355b8db81c09abfb7f3c5b2515888b679a3e50dd6bd6cef7c73111f4cc0c"
        ],
        [
          "174a53b9c9a285872d39e56e6913cab15d59b1fa512508c022f382de8319497c",
          "ccc9dc37abfc9c1657b4155f2c47f9e6646b3a1d8cb9854383da13ac079afa73"
        ],
        [
          "959396981943785c3d3e57edf5018cdbe039e730e4918b3d884fdff09475b7ba",
          "2e7e552888c331dd8ba0386a4b9cd6849c653f64c8709385e9b8abf87524f2fd"
        ],
        [
          "d2a63a50ae401e56d645a1153b109a8fcca0a43d561fba2dbb51340c9d82b151",
          "e82d86fb6443fcb7565aee58b2948220a70f750af484ca52d4142174dcf89405"
        ],
        [
          "64587e2335471eb890ee7896d7cfdc866bacbdbd3839317b3436f9b45617e073",
          "d99fcdd5bf6902e2ae96dd6447c299a185b90a39133aeab358299e5e9faf6589"
        ],
        [
          "8481bde0e4e4d885b3a546d3e549de042f0aa6cea250e7fd358d6c86dd45e458",
          "38ee7b8cba5404dd84a25bf39cecb2ca900a79c42b262e556d64b1b59779057e"
        ],
        [
          "13464a57a78102aa62b6979ae817f4637ffcfed3c4b1ce30bcd6303f6caf666b",
          "69be159004614580ef7e433453ccb0ca48f300a81d0942e13f495a907f6ecc27"
        ],
        [
          "bc4a9df5b713fe2e9aef430bcc1dc97a0cd9ccede2f28588cada3a0d2d83f366",
          "d3a81ca6e785c06383937adf4b798caa6e8a9fbfa547b16d758d666581f33c1"
        ],
        [
          "8c28a97bf8298bc0d23d8c749452a32e694b65e30a9472a3954ab30fe5324caa",
          "40a30463a3305193378fedf31f7cc0eb7ae784f0451cb9459e71dc73cbef9482"
        ],
        [
          "8ea9666139527a8c1dd94ce4f071fd23c8b350c5a4bb33748c4ba111faccae0",
          "620efabbc8ee2782e24e7c0cfb95c5d735b783be9cf0f8e955af34a30e62b945"
        ],
        [
          "dd3625faef5ba06074669716bbd3788d89bdde815959968092f76cc4eb9a9787",
          "7a188fa3520e30d461da2501045731ca941461982883395937f68d00c644a573"
        ],
        [
          "f710d79d9eb962297e4f6232b40e8f7feb2bc63814614d692c12de752408221e",
          "ea98e67232d3b3295d3b535532115ccac8612c721851617526ae47a9c77bfc82"
        ]
      ]
    },
    naf: {
      wnd: 7,
      points: [
        [
          "f9308a019258c31049344f85f89d5229b531c845836f99b08601f113bce036f9",
          "388f7b0f632de8140fe337e62a37f3566500a99934c2231b6cb9fd7584b8e672"
        ],
        [
          "2f8bde4d1a07209355b4a7250a5c5128e88b84bddc619ab7cba8d569b240efe4",
          "d8ac222636e5e3d6d4dba9dda6c9c426f788271bab0d6840dca87d3aa6ac62d6"
        ],
        [
          "5cbdf0646e5db4eaa398f365f2ea7a0e3d419b7e0330e39ce92bddedcac4f9bc",
          "6aebca40ba255960a3178d6d861a54dba813d0b813fde7b5a5082628087264da"
        ],
        [
          "acd484e2f0c7f65309ad178a9f559abde09796974c57e714c35f110dfc27ccbe",
          "cc338921b0a7d9fd64380971763b61e9add888a4375f8e0f05cc262ac64f9c37"
        ],
        [
          "774ae7f858a9411e5ef4246b70c65aac5649980be5c17891bbec17895da008cb",
          "d984a032eb6b5e190243dd56d7b7b365372db1e2dff9d6a8301d74c9c953c61b"
        ],
        [
          "f28773c2d975288bc7d1d205c3748651b075fbc6610e58cddeeddf8f19405aa8",
          "ab0902e8d880a89758212eb65cdaf473a1a06da521fa91f29b5cb52db03ed81"
        ],
        [
          "d7924d4f7d43ea965a465ae3095ff41131e5946f3c85f79e44adbcf8e27e080e",
          "581e2872a86c72a683842ec228cc6defea40af2bd896d3a5c504dc9ff6a26b58"
        ],
        [
          "defdea4cdb677750a420fee807eacf21eb9898ae79b9768766e4faa04a2d4a34",
          "4211ab0694635168e997b0ead2a93daeced1f4a04a95c0f6cfb199f69e56eb77"
        ],
        [
          "2b4ea0a797a443d293ef5cff444f4979f06acfebd7e86d277475656138385b6c",
          "85e89bc037945d93b343083b5a1c86131a01f60c50269763b570c854e5c09b7a"
        ],
        [
          "352bbf4a4cdd12564f93fa332ce333301d9ad40271f8107181340aef25be59d5",
          "321eb4075348f534d59c18259dda3e1f4a1b3b2e71b1039c67bd3d8bcf81998c"
        ],
        [
          "2fa2104d6b38d11b0230010559879124e42ab8dfeff5ff29dc9cdadd4ecacc3f",
          "2de1068295dd865b64569335bd5dd80181d70ecfc882648423ba76b532b7d67"
        ],
        [
          "9248279b09b4d68dab21a9b066edda83263c3d84e09572e269ca0cd7f5453714",
          "73016f7bf234aade5d1aa71bdea2b1ff3fc0de2a887912ffe54a32ce97cb3402"
        ],
        [
          "daed4f2be3a8bf278e70132fb0beb7522f570e144bf615c07e996d443dee8729",
          "a69dce4a7d6c98e8d4a1aca87ef8d7003f83c230f3afa726ab40e52290be1c55"
        ],
        [
          "c44d12c7065d812e8acf28d7cbb19f9011ecd9e9fdf281b0e6a3b5e87d22e7db",
          "2119a460ce326cdc76c45926c982fdac0e106e861edf61c5a039063f0e0e6482"
        ],
        [
          "6a245bf6dc698504c89a20cfded60853152b695336c28063b61c65cbd269e6b4",
          "e022cf42c2bd4a708b3f5126f16a24ad8b33ba48d0423b6efd5e6348100d8a82"
        ],
        [
          "1697ffa6fd9de627c077e3d2fe541084ce13300b0bec1146f95ae57f0d0bd6a5",
          "b9c398f186806f5d27561506e4557433a2cf15009e498ae7adee9d63d01b2396"
        ],
        [
          "605bdb019981718b986d0f07e834cb0d9deb8360ffb7f61df982345ef27a7479",
          "2972d2de4f8d20681a78d93ec96fe23c26bfae84fb14db43b01e1e9056b8c49"
        ],
        [
          "62d14dab4150bf497402fdc45a215e10dcb01c354959b10cfe31c7e9d87ff33d",
          "80fc06bd8cc5b01098088a1950eed0db01aa132967ab472235f5642483b25eaf"
        ],
        [
          "80c60ad0040f27dade5b4b06c408e56b2c50e9f56b9b8b425e555c2f86308b6f",
          "1c38303f1cc5c30f26e66bad7fe72f70a65eed4cbe7024eb1aa01f56430bd57a"
        ],
        [
          "7a9375ad6167ad54aa74c6348cc54d344cc5dc9487d847049d5eabb0fa03c8fb",
          "d0e3fa9eca8726909559e0d79269046bdc59ea10c70ce2b02d499ec224dc7f7"
        ],
        [
          "d528ecd9b696b54c907a9ed045447a79bb408ec39b68df504bb51f459bc3ffc9",
          "eecf41253136e5f99966f21881fd656ebc4345405c520dbc063465b521409933"
        ],
        [
          "49370a4b5f43412ea25f514e8ecdad05266115e4a7ecb1387231808f8b45963",
          "758f3f41afd6ed428b3081b0512fd62a54c3f3afbb5b6764b653052a12949c9a"
        ],
        [
          "77f230936ee88cbbd73df930d64702ef881d811e0e1498e2f1c13eb1fc345d74",
          "958ef42a7886b6400a08266e9ba1b37896c95330d97077cbbe8eb3c7671c60d6"
        ],
        [
          "f2dac991cc4ce4b9ea44887e5c7c0bce58c80074ab9d4dbaeb28531b7739f530",
          "e0dedc9b3b2f8dad4da1f32dec2531df9eb5fbeb0598e4fd1a117dba703a3c37"
        ],
        [
          "463b3d9f662621fb1b4be8fbbe2520125a216cdfc9dae3debcba4850c690d45b",
          "5ed430d78c296c3543114306dd8622d7c622e27c970a1de31cb377b01af7307e"
        ],
        [
          "f16f804244e46e2a09232d4aff3b59976b98fac14328a2d1a32496b49998f247",
          "cedabd9b82203f7e13d206fcdf4e33d92a6c53c26e5cce26d6579962c4e31df6"
        ],
        [
          "caf754272dc84563b0352b7a14311af55d245315ace27c65369e15f7151d41d1",
          "cb474660ef35f5f2a41b643fa5e460575f4fa9b7962232a5c32f908318a04476"
        ],
        [
          "2600ca4b282cb986f85d0f1709979d8b44a09c07cb86d7c124497bc86f082120",
          "4119b88753c15bd6a693b03fcddbb45d5ac6be74ab5f0ef44b0be9475a7e4b40"
        ],
        [
          "7635ca72d7e8432c338ec53cd12220bc01c48685e24f7dc8c602a7746998e435",
          "91b649609489d613d1d5e590f78e6d74ecfc061d57048bad9e76f302c5b9c61"
        ],
        [
          "754e3239f325570cdbbf4a87deee8a66b7f2b33479d468fbc1a50743bf56cc18",
          "673fb86e5bda30fb3cd0ed304ea49a023ee33d0197a695d0c5d98093c536683"
        ],
        [
          "e3e6bd1071a1e96aff57859c82d570f0330800661d1c952f9fe2694691d9b9e8",
          "59c9e0bba394e76f40c0aa58379a3cb6a5a2283993e90c4167002af4920e37f5"
        ],
        [
          "186b483d056a033826ae73d88f732985c4ccb1f32ba35f4b4cc47fdcf04aa6eb",
          "3b952d32c67cf77e2e17446e204180ab21fb8090895138b4a4a797f86e80888b"
        ],
        [
          "df9d70a6b9876ce544c98561f4be4f725442e6d2b737d9c91a8321724ce0963f",
          "55eb2dafd84d6ccd5f862b785dc39d4ab157222720ef9da217b8c45cf2ba2417"
        ],
        [
          "5edd5cc23c51e87a497ca815d5dce0f8ab52554f849ed8995de64c5f34ce7143",
          "efae9c8dbc14130661e8cec030c89ad0c13c66c0d17a2905cdc706ab7399a868"
        ],
        [
          "290798c2b6476830da12fe02287e9e777aa3fba1c355b17a722d362f84614fba",
          "e38da76dcd440621988d00bcf79af25d5b29c094db2a23146d003afd41943e7a"
        ],
        [
          "af3c423a95d9f5b3054754efa150ac39cd29552fe360257362dfdecef4053b45",
          "f98a3fd831eb2b749a93b0e6f35cfb40c8cd5aa667a15581bc2feded498fd9c6"
        ],
        [
          "766dbb24d134e745cccaa28c99bf274906bb66b26dcf98df8d2fed50d884249a",
          "744b1152eacbe5e38dcc887980da38b897584a65fa06cedd2c924f97cbac5996"
        ],
        [
          "59dbf46f8c94759ba21277c33784f41645f7b44f6c596a58ce92e666191abe3e",
          "c534ad44175fbc300f4ea6ce648309a042ce739a7919798cd85e216c4a307f6e"
        ],
        [
          "f13ada95103c4537305e691e74e9a4a8dd647e711a95e73cb62dc6018cfd87b8",
          "e13817b44ee14de663bf4bc808341f326949e21a6a75c2570778419bdaf5733d"
        ],
        [
          "7754b4fa0e8aced06d4167a2c59cca4cda1869c06ebadfb6488550015a88522c",
          "30e93e864e669d82224b967c3020b8fa8d1e4e350b6cbcc537a48b57841163a2"
        ],
        [
          "948dcadf5990e048aa3874d46abef9d701858f95de8041d2a6828c99e2262519",
          "e491a42537f6e597d5d28a3224b1bc25df9154efbd2ef1d2cbba2cae5347d57e"
        ],
        [
          "7962414450c76c1689c7b48f8202ec37fb224cf5ac0bfa1570328a8a3d7c77ab",
          "100b610ec4ffb4760d5c1fc133ef6f6b12507a051f04ac5760afa5b29db83437"
        ],
        [
          "3514087834964b54b15b160644d915485a16977225b8847bb0dd085137ec47ca",
          "ef0afbb2056205448e1652c48e8127fc6039e77c15c2378b7e7d15a0de293311"
        ],
        [
          "d3cc30ad6b483e4bc79ce2c9dd8bc54993e947eb8df787b442943d3f7b527eaf",
          "8b378a22d827278d89c5e9be8f9508ae3c2ad46290358630afb34db04eede0a4"
        ],
        [
          "1624d84780732860ce1c78fcbfefe08b2b29823db913f6493975ba0ff4847610",
          "68651cf9b6da903e0914448c6cd9d4ca896878f5282be4c8cc06e2a404078575"
        ],
        [
          "733ce80da955a8a26902c95633e62a985192474b5af207da6df7b4fd5fc61cd4",
          "f5435a2bd2badf7d485a4d8b8db9fcce3e1ef8e0201e4578c54673bc1dc5ea1d"
        ],
        [
          "15d9441254945064cf1a1c33bbd3b49f8966c5092171e699ef258dfab81c045c",
          "d56eb30b69463e7234f5137b73b84177434800bacebfc685fc37bbe9efe4070d"
        ],
        [
          "a1d0fcf2ec9de675b612136e5ce70d271c21417c9d2b8aaaac138599d0717940",
          "edd77f50bcb5a3cab2e90737309667f2641462a54070f3d519212d39c197a629"
        ],
        [
          "e22fbe15c0af8ccc5780c0735f84dbe9a790badee8245c06c7ca37331cb36980",
          "a855babad5cd60c88b430a69f53a1a7a38289154964799be43d06d77d31da06"
        ],
        [
          "311091dd9860e8e20ee13473c1155f5f69635e394704eaa74009452246cfa9b3",
          "66db656f87d1f04fffd1f04788c06830871ec5a64feee685bd80f0b1286d8374"
        ],
        [
          "34c1fd04d301be89b31c0442d3e6ac24883928b45a9340781867d4232ec2dbdf",
          "9414685e97b1b5954bd46f730174136d57f1ceeb487443dc5321857ba73abee"
        ],
        [
          "f219ea5d6b54701c1c14de5b557eb42a8d13f3abbcd08affcc2a5e6b049b8d63",
          "4cb95957e83d40b0f73af4544cccf6b1f4b08d3c07b27fb8d8c2962a400766d1"
        ],
        [
          "d7b8740f74a8fbaab1f683db8f45de26543a5490bca627087236912469a0b448",
          "fa77968128d9c92ee1010f337ad4717eff15db5ed3c049b3411e0315eaa4593b"
        ],
        [
          "32d31c222f8f6f0ef86f7c98d3a3335ead5bcd32abdd94289fe4d3091aa824bf",
          "5f3032f5892156e39ccd3d7915b9e1da2e6dac9e6f26e961118d14b8462e1661"
        ],
        [
          "7461f371914ab32671045a155d9831ea8793d77cd59592c4340f86cbc18347b5",
          "8ec0ba238b96bec0cbdddcae0aa442542eee1ff50c986ea6b39847b3cc092ff6"
        ],
        [
          "ee079adb1df1860074356a25aa38206a6d716b2c3e67453d287698bad7b2b2d6",
          "8dc2412aafe3be5c4c5f37e0ecc5f9f6a446989af04c4e25ebaac479ec1c8c1e"
        ],
        [
          "16ec93e447ec83f0467b18302ee620f7e65de331874c9dc72bfd8616ba9da6b5",
          "5e4631150e62fb40d0e8c2a7ca5804a39d58186a50e497139626778e25b0674d"
        ],
        [
          "eaa5f980c245f6f038978290afa70b6bd8855897f98b6aa485b96065d537bd99",
          "f65f5d3e292c2e0819a528391c994624d784869d7e6ea67fb18041024edc07dc"
        ],
        [
          "78c9407544ac132692ee1910a02439958ae04877151342ea96c4b6b35a49f51",
          "f3e0319169eb9b85d5404795539a5e68fa1fbd583c064d2462b675f194a3ddb4"
        ],
        [
          "494f4be219a1a77016dcd838431aea0001cdc8ae7a6fc688726578d9702857a5",
          "42242a969283a5f339ba7f075e36ba2af925ce30d767ed6e55f4b031880d562c"
        ],
        [
          "a598a8030da6d86c6bc7f2f5144ea549d28211ea58faa70ebf4c1e665c1fe9b5",
          "204b5d6f84822c307e4b4a7140737aec23fc63b65b35f86a10026dbd2d864e6b"
        ],
        [
          "c41916365abb2b5d09192f5f2dbeafec208f020f12570a184dbadc3e58595997",
          "4f14351d0087efa49d245b328984989d5caf9450f34bfc0ed16e96b58fa9913"
        ],
        [
          "841d6063a586fa475a724604da03bc5b92a2e0d2e0a36acfe4c73a5514742881",
          "73867f59c0659e81904f9a1c7543698e62562d6744c169ce7a36de01a8d6154"
        ],
        [
          "5e95bb399a6971d376026947f89bde2f282b33810928be4ded112ac4d70e20d5",
          "39f23f366809085beebfc71181313775a99c9aed7d8ba38b161384c746012865"
        ],
        [
          "36e4641a53948fd476c39f8a99fd974e5ec07564b5315d8bf99471bca0ef2f66",
          "d2424b1b1abe4eb8164227b085c9aa9456ea13493fd563e06fd51cf5694c78fc"
        ],
        [
          "336581ea7bfbbb290c191a2f507a41cf5643842170e914faeab27c2c579f726",
          "ead12168595fe1be99252129b6e56b3391f7ab1410cd1e0ef3dcdcabd2fda224"
        ],
        [
          "8ab89816dadfd6b6a1f2634fcf00ec8403781025ed6890c4849742706bd43ede",
          "6fdcef09f2f6d0a044e654aef624136f503d459c3e89845858a47a9129cdd24e"
        ],
        [
          "1e33f1a746c9c5778133344d9299fcaa20b0938e8acff2544bb40284b8c5fb94",
          "60660257dd11b3aa9c8ed618d24edff2306d320f1d03010e33a7d2057f3b3b6"
        ],
        [
          "85b7c1dcb3cec1b7ee7f30ded79dd20a0ed1f4cc18cbcfcfa410361fd8f08f31",
          "3d98a9cdd026dd43f39048f25a8847f4fcafad1895d7a633c6fed3c35e999511"
        ],
        [
          "29df9fbd8d9e46509275f4b125d6d45d7fbe9a3b878a7af872a2800661ac5f51",
          "b4c4fe99c775a606e2d8862179139ffda61dc861c019e55cd2876eb2a27d84b"
        ],
        [
          "a0b1cae06b0a847a3fea6e671aaf8adfdfe58ca2f768105c8082b2e449fce252",
          "ae434102edde0958ec4b19d917a6a28e6b72da1834aff0e650f049503a296cf2"
        ],
        [
          "4e8ceafb9b3e9a136dc7ff67e840295b499dfb3b2133e4ba113f2e4c0e121e5",
          "cf2174118c8b6d7a4b48f6d534ce5c79422c086a63460502b827ce62a326683c"
        ],
        [
          "d24a44e047e19b6f5afb81c7ca2f69080a5076689a010919f42725c2b789a33b",
          "6fb8d5591b466f8fc63db50f1c0f1c69013f996887b8244d2cdec417afea8fa3"
        ],
        [
          "ea01606a7a6c9cdd249fdfcfacb99584001edd28abbab77b5104e98e8e3b35d4",
          "322af4908c7312b0cfbfe369f7a7b3cdb7d4494bc2823700cfd652188a3ea98d"
        ],
        [
          "af8addbf2b661c8a6c6328655eb96651252007d8c5ea31be4ad196de8ce2131f",
          "6749e67c029b85f52a034eafd096836b2520818680e26ac8f3dfbcdb71749700"
        ],
        [
          "e3ae1974566ca06cc516d47e0fb165a674a3dabcfca15e722f0e3450f45889",
          "2aeabe7e4531510116217f07bf4d07300de97e4874f81f533420a72eeb0bd6a4"
        ],
        [
          "591ee355313d99721cf6993ffed1e3e301993ff3ed258802075ea8ced397e246",
          "b0ea558a113c30bea60fc4775460c7901ff0b053d25ca2bdeee98f1a4be5d196"
        ],
        [
          "11396d55fda54c49f19aa97318d8da61fa8584e47b084945077cf03255b52984",
          "998c74a8cd45ac01289d5833a7beb4744ff536b01b257be4c5767bea93ea57a4"
        ],
        [
          "3c5d2a1ba39c5a1790000738c9e0c40b8dcdfd5468754b6405540157e017aa7a",
          "b2284279995a34e2f9d4de7396fc18b80f9b8b9fdd270f6661f79ca4c81bd257"
        ],
        [
          "cc8704b8a60a0defa3a99a7299f2e9c3fbc395afb04ac078425ef8a1793cc030",
          "bdd46039feed17881d1e0862db347f8cf395b74fc4bcdc4e940b74e3ac1f1b13"
        ],
        [
          "c533e4f7ea8555aacd9777ac5cad29b97dd4defccc53ee7ea204119b2889b197",
          "6f0a256bc5efdf429a2fb6242f1a43a2d9b925bb4a4b3a26bb8e0f45eb596096"
        ],
        [
          "c14f8f2ccb27d6f109f6d08d03cc96a69ba8c34eec07bbcf566d48e33da6593",
          "c359d6923bb398f7fd4473e16fe1c28475b740dd098075e6c0e8649113dc3a38"
        ],
        [
          "a6cbc3046bc6a450bac24789fa17115a4c9739ed75f8f21ce441f72e0b90e6ef",
          "21ae7f4680e889bb130619e2c0f95a360ceb573c70603139862afd617fa9b9f"
        ],
        [
          "347d6d9a02c48927ebfb86c1359b1caf130a3c0267d11ce6344b39f99d43cc38",
          "60ea7f61a353524d1c987f6ecec92f086d565ab687870cb12689ff1e31c74448"
        ],
        [
          "da6545d2181db8d983f7dcb375ef5866d47c67b1bf31c8cf855ef7437b72656a",
          "49b96715ab6878a79e78f07ce5680c5d6673051b4935bd897fea824b77dc208a"
        ],
        [
          "c40747cc9d012cb1a13b8148309c6de7ec25d6945d657146b9d5994b8feb1111",
          "5ca560753be2a12fc6de6caf2cb489565db936156b9514e1bb5e83037e0fa2d4"
        ],
        [
          "4e42c8ec82c99798ccf3a610be870e78338c7f713348bd34c8203ef4037f3502",
          "7571d74ee5e0fb92a7a8b33a07783341a5492144cc54bcc40a94473693606437"
        ],
        [
          "3775ab7089bc6af823aba2e1af70b236d251cadb0c86743287522a1b3b0dedea",
          "be52d107bcfa09d8bcb9736a828cfa7fac8db17bf7a76a2c42ad961409018cf7"
        ],
        [
          "cee31cbf7e34ec379d94fb814d3d775ad954595d1314ba8846959e3e82f74e26",
          "8fd64a14c06b589c26b947ae2bcf6bfa0149ef0be14ed4d80f448a01c43b1c6d"
        ],
        [
          "b4f9eaea09b6917619f6ea6a4eb5464efddb58fd45b1ebefcdc1a01d08b47986",
          "39e5c9925b5a54b07433a4f18c61726f8bb131c012ca542eb24a8ac07200682a"
        ],
        [
          "d4263dfc3d2df923a0179a48966d30ce84e2515afc3dccc1b77907792ebcc60e",
          "62dfaf07a0f78feb30e30d6295853ce189e127760ad6cf7fae164e122a208d54"
        ],
        [
          "48457524820fa65a4f8d35eb6930857c0032acc0a4a2de422233eeda897612c4",
          "25a748ab367979d98733c38a1fa1c2e7dc6cc07db2d60a9ae7a76aaa49bd0f77"
        ],
        [
          "dfeeef1881101f2cb11644f3a2afdfc2045e19919152923f367a1767c11cceda",
          "ecfb7056cf1de042f9420bab396793c0c390bde74b4bbdff16a83ae09a9a7517"
        ],
        [
          "6d7ef6b17543f8373c573f44e1f389835d89bcbc6062ced36c82df83b8fae859",
          "cd450ec335438986dfefa10c57fea9bcc521a0959b2d80bbf74b190dca712d10"
        ],
        [
          "e75605d59102a5a2684500d3b991f2e3f3c88b93225547035af25af66e04541f",
          "f5c54754a8f71ee540b9b48728473e314f729ac5308b06938360990e2bfad125"
        ],
        [
          "eb98660f4c4dfaa06a2be453d5020bc99a0c2e60abe388457dd43fefb1ed620c",
          "6cb9a8876d9cb8520609af3add26cd20a0a7cd8a9411131ce85f44100099223e"
        ],
        [
          "13e87b027d8514d35939f2e6892b19922154596941888336dc3563e3b8dba942",
          "fef5a3c68059a6dec5d624114bf1e91aac2b9da568d6abeb2570d55646b8adf1"
        ],
        [
          "ee163026e9fd6fe017c38f06a5be6fc125424b371ce2708e7bf4491691e5764a",
          "1acb250f255dd61c43d94ccc670d0f58f49ae3fa15b96623e5430da0ad6c62b2"
        ],
        [
          "b268f5ef9ad51e4d78de3a750c2dc89b1e626d43505867999932e5db33af3d80",
          "5f310d4b3c99b9ebb19f77d41c1dee018cf0d34fd4191614003e945a1216e423"
        ],
        [
          "ff07f3118a9df035e9fad85eb6c7bfe42b02f01ca99ceea3bf7ffdba93c4750d",
          "438136d603e858a3a5c440c38eccbaddc1d2942114e2eddd4740d098ced1f0d8"
        ],
        [
          "8d8b9855c7c052a34146fd20ffb658bea4b9f69e0d825ebec16e8c3ce2b526a1",
          "cdb559eedc2d79f926baf44fb84ea4d44bcf50fee51d7ceb30e2e7f463036758"
        ],
        [
          "52db0b5384dfbf05bfa9d472d7ae26dfe4b851ceca91b1eba54263180da32b63",
          "c3b997d050ee5d423ebaf66a6db9f57b3180c902875679de924b69d84a7b375"
        ],
        [
          "e62f9490d3d51da6395efd24e80919cc7d0f29c3f3fa48c6fff543becbd43352",
          "6d89ad7ba4876b0b22c2ca280c682862f342c8591f1daf5170e07bfd9ccafa7d"
        ],
        [
          "7f30ea2476b399b4957509c88f77d0191afa2ff5cb7b14fd6d8e7d65aaab1193",
          "ca5ef7d4b231c94c3b15389a5f6311e9daff7bb67b103e9880ef4bff637acaec"
        ],
        [
          "5098ff1e1d9f14fb46a210fada6c903fef0fb7b4a1dd1d9ac60a0361800b7a00",
          "9731141d81fc8f8084d37c6e7542006b3ee1b40d60dfe5362a5b132fd17ddc0"
        ],
        [
          "32b78c7de9ee512a72895be6b9cbefa6e2f3c4ccce445c96b9f2c81e2778ad58",
          "ee1849f513df71e32efc3896ee28260c73bb80547ae2275ba497237794c8753c"
        ],
        [
          "e2cb74fddc8e9fbcd076eef2a7c72b0ce37d50f08269dfc074b581550547a4f7",
          "d3aa2ed71c9dd2247a62df062736eb0baddea9e36122d2be8641abcb005cc4a4"
        ],
        [
          "8438447566d4d7bedadc299496ab357426009a35f235cb141be0d99cd10ae3a8",
          "c4e1020916980a4da5d01ac5e6ad330734ef0d7906631c4f2390426b2edd791f"
        ],
        [
          "4162d488b89402039b584c6fc6c308870587d9c46f660b878ab65c82c711d67e",
          "67163e903236289f776f22c25fb8a3afc1732f2b84b4e95dbda47ae5a0852649"
        ],
        [
          "3fad3fa84caf0f34f0f89bfd2dcf54fc175d767aec3e50684f3ba4a4bf5f683d",
          "cd1bc7cb6cc407bb2f0ca647c718a730cf71872e7d0d2a53fa20efcdfe61826"
        ],
        [
          "674f2600a3007a00568c1a7ce05d0816c1fb84bf1370798f1c69532faeb1a86b",
          "299d21f9413f33b3edf43b257004580b70db57da0b182259e09eecc69e0d38a5"
        ],
        [
          "d32f4da54ade74abb81b815ad1fb3b263d82d6c692714bcff87d29bd5ee9f08f",
          "f9429e738b8e53b968e99016c059707782e14f4535359d582fc416910b3eea87"
        ],
        [
          "30e4e670435385556e593657135845d36fbb6931f72b08cb1ed954f1e3ce3ff6",
          "462f9bce619898638499350113bbc9b10a878d35da70740dc695a559eb88db7b"
        ],
        [
          "be2062003c51cc3004682904330e4dee7f3dcd10b01e580bf1971b04d4cad297",
          "62188bc49d61e5428573d48a74e1c655b1c61090905682a0d5558ed72dccb9bc"
        ],
        [
          "93144423ace3451ed29e0fb9ac2af211cb6e84a601df5993c419859fff5df04a",
          "7c10dfb164c3425f5c71a3f9d7992038f1065224f72bb9d1d902a6d13037b47c"
        ],
        [
          "b015f8044f5fcbdcf21ca26d6c34fb8197829205c7b7d2a7cb66418c157b112c",
          "ab8c1e086d04e813744a655b2df8d5f83b3cdc6faa3088c1d3aea1454e3a1d5f"
        ],
        [
          "d5e9e1da649d97d89e4868117a465a3a4f8a18de57a140d36b3f2af341a21b52",
          "4cb04437f391ed73111a13cc1d4dd0db1693465c2240480d8955e8592f27447a"
        ],
        [
          "d3ae41047dd7ca065dbf8ed77b992439983005cd72e16d6f996a5316d36966bb",
          "bd1aeb21ad22ebb22a10f0303417c6d964f8cdd7df0aca614b10dc14d125ac46"
        ],
        [
          "463e2763d885f958fc66cdd22800f0a487197d0a82e377b49f80af87c897b065",
          "bfefacdb0e5d0fd7df3a311a94de062b26b80c61fbc97508b79992671ef7ca7f"
        ],
        [
          "7985fdfd127c0567c6f53ec1bb63ec3158e597c40bfe747c83cddfc910641917",
          "603c12daf3d9862ef2b25fe1de289aed24ed291e0ec6708703a5bd567f32ed03"
        ],
        [
          "74a1ad6b5f76e39db2dd249410eac7f99e74c59cb83d2d0ed5ff1543da7703e9",
          "cc6157ef18c9c63cd6193d83631bbea0093e0968942e8c33d5737fd790e0db08"
        ],
        [
          "30682a50703375f602d416664ba19b7fc9bab42c72747463a71d0896b22f6da3",
          "553e04f6b018b4fa6c8f39e7f311d3176290d0e0f19ca73f17714d9977a22ff8"
        ],
        [
          "9e2158f0d7c0d5f26c3791efefa79597654e7a2b2464f52b1ee6c1347769ef57",
          "712fcdd1b9053f09003a3481fa7762e9ffd7c8ef35a38509e2fbf2629008373"
        ],
        [
          "176e26989a43c9cfeba4029c202538c28172e566e3c4fce7322857f3be327d66",
          "ed8cc9d04b29eb877d270b4878dc43c19aefd31f4eee09ee7b47834c1fa4b1c3"
        ],
        [
          "75d46efea3771e6e68abb89a13ad747ecf1892393dfc4f1b7004788c50374da8",
          "9852390a99507679fd0b86fd2b39a868d7efc22151346e1a3ca4726586a6bed8"
        ],
        [
          "809a20c67d64900ffb698c4c825f6d5f2310fb0451c869345b7319f645605721",
          "9e994980d9917e22b76b061927fa04143d096ccc54963e6a5ebfa5f3f8e286c1"
        ],
        [
          "1b38903a43f7f114ed4500b4eac7083fdefece1cf29c63528d563446f972c180",
          "4036edc931a60ae889353f77fd53de4a2708b26b6f5da72ad3394119daf408f9"
        ]
      ]
    }
  }), secp256k1;
}
var hasRequiredCurves;
function requireCurves() {
  return hasRequiredCurves || (hasRequiredCurves = 1, function(P) {
    var c = P, O = requireHash(), q = requireCurve(), X = requireUtils$1(), t = X.assert;
    function F($) {
      $.type === "short" ? this.curve = new q.short($) : $.type === "edwards" ? this.curve = new q.edwards($) : this.curve = new q.mont($), this.g = this.curve.g, this.n = this.curve.n, this.hash = $.hash, t(this.g.validate(), "Invalid curve"), t(this.g.mul(this.n).isInfinity(), "Invalid curve, G*N != O");
    }
    c.PresetCurve = F;
    function l($, D) {
      Object.defineProperty(c, $, {
        configurable: !0,
        enumerable: !0,
        get: function() {
          var Q = new F(D);
          return Object.defineProperty(c, $, {
            configurable: !0,
            enumerable: !0,
            value: Q
          }), Q;
        }
      });
    }
    l("p192", {
      type: "short",
      prime: "p192",
      p: "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff",
      a: "ffffffff ffffffff ffffffff fffffffe ffffffff fffffffc",
      b: "64210519 e59c80e7 0fa7e9ab 72243049 feb8deec c146b9b1",
      n: "ffffffff ffffffff ffffffff 99def836 146bc9b1 b4d22831",
      hash: O.sha256,
      gRed: !1,
      g: [
        "188da80e b03090f6 7cbf20eb 43a18800 f4ff0afd 82ff1012",
        "07192b95 ffc8da78 631011ed 6b24cdd5 73f977a1 1e794811"
      ]
    }), l("p224", {
      type: "short",
      prime: "p224",
      p: "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001",
      a: "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff fffffffe",
      b: "b4050a85 0c04b3ab f5413256 5044b0b7 d7bfd8ba 270b3943 2355ffb4",
      n: "ffffffff ffffffff ffffffff ffff16a2 e0b8f03e 13dd2945 5c5c2a3d",
      hash: O.sha256,
      gRed: !1,
      g: [
        "b70e0cbd 6bb4bf7f 321390b9 4a03c1d3 56c21122 343280d6 115c1d21",
        "bd376388 b5f723fb 4c22dfe6 cd4375a0 5a074764 44d58199 85007e34"
      ]
    }), l("p256", {
      type: "short",
      prime: null,
      p: "ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff ffffffff",
      a: "ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff fffffffc",
      b: "5ac635d8 aa3a93e7 b3ebbd55 769886bc 651d06b0 cc53b0f6 3bce3c3e 27d2604b",
      n: "ffffffff 00000000 ffffffff ffffffff bce6faad a7179e84 f3b9cac2 fc632551",
      hash: O.sha256,
      gRed: !1,
      g: [
        "6b17d1f2 e12c4247 f8bce6e5 63a440f2 77037d81 2deb33a0 f4a13945 d898c296",
        "4fe342e2 fe1a7f9b 8ee7eb4a 7c0f9e16 2bce3357 6b315ece cbb64068 37bf51f5"
      ]
    }), l("p384", {
      type: "short",
      prime: null,
      p: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe ffffffff 00000000 00000000 ffffffff",
      a: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe ffffffff 00000000 00000000 fffffffc",
      b: "b3312fa7 e23ee7e4 988e056b e3f82d19 181d9c6e fe814112 0314088f 5013875a c656398d 8a2ed19d 2a85c8ed d3ec2aef",
      n: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff c7634d81 f4372ddf 581a0db2 48b0a77a ecec196a ccc52973",
      hash: O.sha384,
      gRed: !1,
      g: [
        "aa87ca22 be8b0537 8eb1c71e f320ad74 6e1d3b62 8ba79b98 59f741e0 82542a38 5502f25d bf55296c 3a545e38 72760ab7",
        "3617de4a 96262c6f 5d9e98bf 9292dc29 f8f41dbd 289a147c e9da3113 b5f0b8c0 0a60b1ce 1d7e819d 7a431d7c 90ea0e5f"
      ]
    }), l("p521", {
      type: "short",
      prime: null,
      p: "000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff",
      a: "000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffc",
      b: "00000051 953eb961 8e1c9a1f 929a21a0 b68540ee a2da725b 99b315f3 b8b48991 8ef109e1 56193951 ec7e937b 1652c0bd 3bb1bf07 3573df88 3d2c34f1 ef451fd4 6b503f00",
      n: "000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffa 51868783 bf2f966b 7fcc0148 f709a5d0 3bb5c9b8 899c47ae bb6fb71e 91386409",
      hash: O.sha512,
      gRed: !1,
      g: [
        "000000c6 858e06b7 0404e9cd 9e3ecb66 2395b442 9c648139 053fb521 f828af60 6b4d3dba a14b5e77 efe75928 fe1dc127 a2ffa8de 3348b3c1 856a429b f97e7e31 c2e5bd66",
        "00000118 39296a78 9a3bc004 5c8a5fb4 2c7d1bd9 98f54449 579b4468 17afbd17 273e662c 97ee7299 5ef42640 c550b901 3fad0761 353c7086 a272c240 88be9476 9fd16650"
      ]
    }), l("curve25519", {
      type: "mont",
      prime: "p25519",
      p: "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed",
      a: "76d06",
      b: "1",
      n: "1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed",
      hash: O.sha256,
      gRed: !1,
      g: [
        "9"
      ]
    }), l("ed25519", {
      type: "edwards",
      prime: "p25519",
      p: "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed",
      a: "-1",
      c: "1",
      // -121665 * (121666^(-1)) (mod P)
      d: "52036cee2b6ffe73 8cc740797779e898 00700a4d4141d8ab 75eb4dca135978a3",
      n: "1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed",
      hash: O.sha256,
      gRed: !1,
      g: [
        "216936d3cd6e53fec0a4e231fdd6dc5c692cc7609525a7b2c9562d608f25d51a",
        // 4/5
        "6666666666666666666666666666666666666666666666666666666666666658"
      ]
    });
    var U;
    try {
      U = requireSecp256k1();
    } catch ($) {
      U = void 0;
    }
    l("secp256k1", {
      type: "short",
      prime: "k256",
      p: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f",
      a: "0",
      b: "7",
      n: "ffffffff ffffffff ffffffff fffffffe baaedce6 af48a03b bfd25e8c d0364141",
      h: "1",
      hash: O.sha256,
      // Precomputed endomorphism
      beta: "7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee",
      lambda: "5363ad4cc05c30e0a5261c028812645a122e22ea20816678df02967c1b23bd72",
      basis: [
        {
          a: "3086d221a7d46bcde86c90e49284eb15",
          b: "-e4437ed6010e88286f547fa90abfe4c3"
        },
        {
          a: "114ca50f7a8e2f3f657c1108d9d44cfd8",
          b: "3086d221a7d46bcde86c90e49284eb15"
        }
      ],
      gRed: !1,
      g: [
        "79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798",
        "483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8",
        U
      ]
    });
  }(curves)), curves;
}
var hmacDrbg, hasRequiredHmacDrbg;
function requireHmacDrbg() {
  if (hasRequiredHmacDrbg) return hmacDrbg;
  hasRequiredHmacDrbg = 1;
  var P = requireHash(), c = requireUtils$2(), O = requireMinimalisticAssert();
  function q(X) {
    if (!(this instanceof q))
      return new q(X);
    this.hash = X.hash, this.predResist = !!X.predResist, this.outLen = this.hash.outSize, this.minEntropy = X.minEntropy || this.hash.hmacStrength, this._reseed = null, this.reseedInterval = null, this.K = null, this.V = null;
    var t = c.toArray(X.entropy, X.entropyEnc || "hex"), F = c.toArray(X.nonce, X.nonceEnc || "hex"), l = c.toArray(X.pers, X.persEnc || "hex");
    O(
      t.length >= this.minEntropy / 8,
      "Not enough entropy. Minimum is: " + this.minEntropy + " bits"
    ), this._init(t, F, l);
  }
  return hmacDrbg = q, q.prototype._init = function(X, t, F) {
    var l = X.concat(t).concat(F);
    this.K = new Array(this.outLen / 8), this.V = new Array(this.outLen / 8);
    for (var U = 0; U < this.V.length; U++)
      this.K[U] = 0, this.V[U] = 1;
    this._update(l), this._reseed = 1, this.reseedInterval = 281474976710656;
  }, q.prototype._hmac = function() {
    return new P.hmac(this.hash, this.K);
  }, q.prototype._update = function(X) {
    var t = this._hmac().update(this.V).update([0]);
    X && (t = t.update(X)), this.K = t.digest(), this.V = this._hmac().update(this.V).digest(), X && (this.K = this._hmac().update(this.V).update([1]).update(X).digest(), this.V = this._hmac().update(this.V).digest());
  }, q.prototype.reseed = function(X, t, F, l) {
    typeof t != "string" && (l = F, F = t, t = null), X = c.toArray(X, t), F = c.toArray(F, l), O(
      X.length >= this.minEntropy / 8,
      "Not enough entropy. Minimum is: " + this.minEntropy + " bits"
    ), this._update(X.concat(F || [])), this._reseed = 1;
  }, q.prototype.generate = function(X, t, F, l) {
    if (this._reseed > this.reseedInterval)
      throw new Error("Reseed is required");
    typeof t != "string" && (l = F, F = t, t = null), F && (F = c.toArray(F, l || "hex"), this._update(F));
    for (var U = []; U.length < X; )
      this.V = this._hmac().update(this.V).digest(), U = U.concat(this.V);
    var $ = U.slice(0, X);
    return this._update(F), this._reseed++, c.encode($, t);
  }, hmacDrbg;
}
var key$1, hasRequiredKey$1;
function requireKey$1() {
  if (hasRequiredKey$1) return key$1;
  hasRequiredKey$1 = 1;
  var P = requireBn$2(), c = requireUtils$1(), O = c.assert;
  function q(X, t) {
    this.ec = X, this.priv = null, this.pub = null, t.priv && this._importPrivate(t.priv, t.privEnc), t.pub && this._importPublic(t.pub, t.pubEnc);
  }
  return key$1 = q, q.fromPublic = function(X, t, F) {
    return t instanceof q ? t : new q(X, {
      pub: t,
      pubEnc: F
    });
  }, q.fromPrivate = function(X, t, F) {
    return t instanceof q ? t : new q(X, {
      priv: t,
      privEnc: F
    });
  }, q.prototype.validate = function() {
    var X = this.getPublic();
    return X.isInfinity() ? { result: !1, reason: "Invalid public key" } : X.validate() ? X.mul(this.ec.curve.n).isInfinity() ? { result: !0, reason: null } : { result: !1, reason: "Public key * N != O" } : { result: !1, reason: "Public key is not a point" };
  }, q.prototype.getPublic = function(X, t) {
    return typeof X == "string" && (t = X, X = null), this.pub || (this.pub = this.ec.g.mul(this.priv)), t ? this.pub.encode(t, X) : this.pub;
  }, q.prototype.getPrivate = function(X) {
    return X === "hex" ? this.priv.toString(16, 2) : this.priv;
  }, q.prototype._importPrivate = function(X, t) {
    this.priv = new P(X, t || 16), this.priv = this.priv.umod(this.ec.curve.n);
  }, q.prototype._importPublic = function(X, t) {
    if (X.x || X.y) {
      this.ec.curve.type === "mont" ? O(X.x, "Need x coordinate") : (this.ec.curve.type === "short" || this.ec.curve.type === "edwards") && O(X.x && X.y, "Need both x and y coordinate"), this.pub = this.ec.curve.point(X.x, X.y);
      return;
    }
    this.pub = this.ec.curve.decodePoint(X, t);
  }, q.prototype.derive = function(X) {
    return X.validate() || O(X.validate(), "public point not validated"), X.mul(this.priv).getX();
  }, q.prototype.sign = function(X, t, F) {
    return this.ec.sign(X, this, t, F);
  }, q.prototype.verify = function(X, t) {
    return this.ec.verify(X, t, this);
  }, q.prototype.inspect = function() {
    return "<Key priv: " + (this.priv && this.priv.toString(16, 2)) + " pub: " + (this.pub && this.pub.inspect()) + " >";
  }, key$1;
}
var signature$1, hasRequiredSignature$1;
function requireSignature$1() {
  if (hasRequiredSignature$1) return signature$1;
  hasRequiredSignature$1 = 1;
  var P = requireBn$2(), c = requireUtils$1(), O = c.assert;
  function q(U, $) {
    if (U instanceof q)
      return U;
    this._importDER(U, $) || (O(U.r && U.s, "Signature without r or s"), this.r = new P(U.r, 16), this.s = new P(U.s, 16), U.recoveryParam === void 0 ? this.recoveryParam = null : this.recoveryParam = U.recoveryParam);
  }
  signature$1 = q;
  function X() {
    this.place = 0;
  }
  function t(U, $) {
    var D = U[$.place++];
    if (!(D & 128))
      return D;
    var Q = D & 15;
    if (Q === 0 || Q > 4)
      return !1;
    for (var V = 0, te = 0, ie = $.place; te < Q; te++, ie++)
      V <<= 8, V |= U[ie], V >>>= 0;
    return V <= 127 ? !1 : ($.place = ie, V);
  }
  function F(U) {
    for (var $ = 0, D = U.length - 1; !U[$] && !(U[$ + 1] & 128) && $ < D; )
      $++;
    return $ === 0 ? U : U.slice($);
  }
  q.prototype._importDER = function(U, $) {
    U = c.toArray(U, $);
    var D = new X();
    if (U[D.place++] !== 48)
      return !1;
    var Q = t(U, D);
    if (Q === !1 || Q + D.place !== U.length || U[D.place++] !== 2)
      return !1;
    var V = t(U, D);
    if (V === !1)
      return !1;
    var te = U.slice(D.place, V + D.place);
    if (D.place += V, U[D.place++] !== 2)
      return !1;
    var ie = t(U, D);
    if (ie === !1 || U.length !== ie + D.place)
      return !1;
    var ne = U.slice(D.place, ie + D.place);
    if (te[0] === 0)
      if (te[1] & 128)
        te = te.slice(1);
      else
        return !1;
    if (ne[0] === 0)
      if (ne[1] & 128)
        ne = ne.slice(1);
      else
        return !1;
    return this.r = new P(te), this.s = new P(ne), this.recoveryParam = null, !0;
  };
  function l(U, $) {
    if ($ < 128) {
      U.push($);
      return;
    }
    var D = 1 + (Math.log($) / Math.LN2 >>> 3);
    for (U.push(D | 128); --D; )
      U.push($ >>> (D << 3) & 255);
    U.push($);
  }
  return q.prototype.toDER = function(U) {
    var $ = this.r.toArray(), D = this.s.toArray();
    for ($[0] & 128 && ($ = [0].concat($)), D[0] & 128 && (D = [0].concat(D)), $ = F($), D = F(D); !D[0] && !(D[1] & 128); )
      D = D.slice(1);
    var Q = [2];
    l(Q, $.length), Q = Q.concat($), Q.push(2), l(Q, D.length);
    var V = Q.concat(D), te = [48];
    return l(te, V.length), te = te.concat(V), c.encode(te, U);
  }, signature$1;
}
var ec, hasRequiredEc;
function requireEc() {
  if (hasRequiredEc) return ec;
  hasRequiredEc = 1;
  var P = requireBn$2(), c = requireHmacDrbg(), O = requireUtils$1(), q = requireCurves(), X = requireBrorand(), t = O.assert, F = requireKey$1(), l = requireSignature$1();
  function U($) {
    if (!(this instanceof U))
      return new U($);
    typeof $ == "string" && (t(
      Object.prototype.hasOwnProperty.call(q, $),
      "Unknown curve " + $
    ), $ = q[$]), $ instanceof q.PresetCurve && ($ = { curve: $ }), this.curve = $.curve.curve, this.n = this.curve.n, this.nh = this.n.ushrn(1), this.g = this.curve.g, this.g = $.curve.g, this.g.precompute($.curve.n.bitLength() + 1), this.hash = $.hash || $.curve.hash;
  }
  return ec = U, U.prototype.keyPair = function($) {
    return new F(this, $);
  }, U.prototype.keyFromPrivate = function($, D) {
    return F.fromPrivate(this, $, D);
  }, U.prototype.keyFromPublic = function($, D) {
    return F.fromPublic(this, $, D);
  }, U.prototype.genKeyPair = function($) {
    $ || ($ = {});
    for (var D = new c({
      hash: this.hash,
      pers: $.pers,
      persEnc: $.persEnc || "utf8",
      entropy: $.entropy || X(this.hash.hmacStrength),
      entropyEnc: $.entropy && $.entropyEnc || "utf8",
      nonce: this.n.toArray()
    }), Q = this.n.byteLength(), V = this.n.sub(new P(2)); ; ) {
      var te = new P(D.generate(Q));
      if (!(te.cmp(V) > 0))
        return te.iaddn(1), this.keyFromPrivate(te);
    }
  }, U.prototype._truncateToN = function($, D) {
    var Q = $.byteLength() * 8 - this.n.bitLength();
    return Q > 0 && ($ = $.ushrn(Q)), !D && $.cmp(this.n) >= 0 ? $.sub(this.n) : $;
  }, U.prototype.sign = function($, D, Q, V) {
    typeof Q == "object" && (V = Q, Q = null), V || (V = {}), D = this.keyFromPrivate(D, Q), $ = this._truncateToN(new P($, 16));
    for (var te = this.n.byteLength(), ie = D.getPrivate().toArray("be", te), ne = $.toArray("be", te), se = new c({
      hash: this.hash,
      entropy: ie,
      nonce: ne,
      pers: V.pers,
      persEnc: V.persEnc || "utf8"
    }), ae = this.n.sub(new P(1)), oe = 0; ; oe++) {
      var be = V.k ? V.k(oe) : new P(se.generate(this.n.byteLength()));
      if (be = this._truncateToN(be, !0), !(be.cmpn(1) <= 0 || be.cmp(ae) >= 0)) {
        var de = this.g.mul(be);
        if (!de.isInfinity()) {
          var _e = de.getX(), qe = _e.umod(this.n);
          if (qe.cmpn(0) !== 0) {
            var Te = be.invm(this.n).mul(qe.mul(D.getPrivate()).iadd($));
            if (Te = Te.umod(this.n), Te.cmpn(0) !== 0) {
              var ce = (de.getY().isOdd() ? 1 : 0) | (_e.cmp(qe) !== 0 ? 2 : 0);
              return V.canonical && Te.cmp(this.nh) > 0 && (Te = this.n.sub(Te), ce ^= 1), new l({ r: qe, s: Te, recoveryParam: ce });
            }
          }
        }
      }
    }
  }, U.prototype.verify = function($, D, Q, V) {
    $ = this._truncateToN(new P($, 16)), Q = this.keyFromPublic(Q, V), D = new l(D, "hex");
    var te = D.r, ie = D.s;
    if (te.cmpn(1) < 0 || te.cmp(this.n) >= 0 || ie.cmpn(1) < 0 || ie.cmp(this.n) >= 0)
      return !1;
    var ne = ie.invm(this.n), se = ne.mul($).umod(this.n), ae = ne.mul(te).umod(this.n), oe;
    return this.curve._maxwellTrick ? (oe = this.g.jmulAdd(se, Q.getPublic(), ae), oe.isInfinity() ? !1 : oe.eqXToP(te)) : (oe = this.g.mulAdd(se, Q.getPublic(), ae), oe.isInfinity() ? !1 : oe.getX().umod(this.n).cmp(te) === 0);
  }, U.prototype.recoverPubKey = function($, D, Q, V) {
    t((3 & Q) === Q, "The recovery param is more than two bits"), D = new l(D, V);
    var te = this.n, ie = new P($), ne = D.r, se = D.s, ae = Q & 1, oe = Q >> 1;
    if (ne.cmp(this.curve.p.umod(this.curve.n)) >= 0 && oe)
      throw new Error("Unable to find sencond key candinate");
    oe ? ne = this.curve.pointFromX(ne.add(this.curve.n), ae) : ne = this.curve.pointFromX(ne, ae);
    var be = D.r.invm(te), de = te.sub(ie).mul(be).umod(te), _e = se.mul(be).umod(te);
    return this.g.mulAdd(de, ne, _e);
  }, U.prototype.getKeyRecoveryParam = function($, D, Q, V) {
    if (D = new l(D, V), D.recoveryParam !== null)
      return D.recoveryParam;
    for (var te = 0; te < 4; te++) {
      var ie;
      try {
        ie = this.recoverPubKey($, D, te);
      } catch (ne) {
        continue;
      }
      if (ie.eq(Q))
        return te;
    }
    throw new Error("Unable to find valid recovery factor");
  }, ec;
}
var key, hasRequiredKey;
function requireKey() {
  if (hasRequiredKey) return key;
  hasRequiredKey = 1;
  var P = requireUtils$1(), c = P.assert, O = P.parseBytes, q = P.cachedProperty;
  function X(t, F) {
    this.eddsa = t, this._secret = O(F.secret), t.isPoint(F.pub) ? this._pub = F.pub : this._pubBytes = O(F.pub);
  }
  return X.fromPublic = function(t, F) {
    return F instanceof X ? F : new X(t, { pub: F });
  }, X.fromSecret = function(t, F) {
    return F instanceof X ? F : new X(t, { secret: F });
  }, X.prototype.secret = function() {
    return this._secret;
  }, q(X, "pubBytes", function() {
    return this.eddsa.encodePoint(this.pub());
  }), q(X, "pub", function() {
    return this._pubBytes ? this.eddsa.decodePoint(this._pubBytes) : this.eddsa.g.mul(this.priv());
  }), q(X, "privBytes", function() {
    var t = this.eddsa, F = this.hash(), l = t.encodingLength - 1, U = F.slice(0, t.encodingLength);
    return U[0] &= 248, U[l] &= 127, U[l] |= 64, U;
  }), q(X, "priv", function() {
    return this.eddsa.decodeInt(this.privBytes());
  }), q(X, "hash", function() {
    return this.eddsa.hash().update(this.secret()).digest();
  }), q(X, "messagePrefix", function() {
    return this.hash().slice(this.eddsa.encodingLength);
  }), X.prototype.sign = function(t) {
    return c(this._secret, "KeyPair can only verify"), this.eddsa.sign(t, this);
  }, X.prototype.verify = function(t, F) {
    return this.eddsa.verify(t, F, this);
  }, X.prototype.getSecret = function(t) {
    return c(this._secret, "KeyPair is public only"), P.encode(this.secret(), t);
  }, X.prototype.getPublic = function(t) {
    return P.encode(this.pubBytes(), t);
  }, key = X, key;
}
var signature, hasRequiredSignature;
function requireSignature() {
  if (hasRequiredSignature) return signature;
  hasRequiredSignature = 1;
  var P = requireBn$2(), c = requireUtils$1(), O = c.assert, q = c.cachedProperty, X = c.parseBytes;
  function t(F, l) {
    this.eddsa = F, typeof l != "object" && (l = X(l)), Array.isArray(l) && (l = {
      R: l.slice(0, F.encodingLength),
      S: l.slice(F.encodingLength)
    }), O(l.R && l.S, "Signature without R or S"), F.isPoint(l.R) && (this._R = l.R), l.S instanceof P && (this._S = l.S), this._Rencoded = Array.isArray(l.R) ? l.R : l.Rencoded, this._Sencoded = Array.isArray(l.S) ? l.S : l.Sencoded;
  }
  return q(t, "S", function() {
    return this.eddsa.decodeInt(this.Sencoded());
  }), q(t, "R", function() {
    return this.eddsa.decodePoint(this.Rencoded());
  }), q(t, "Rencoded", function() {
    return this.eddsa.encodePoint(this.R());
  }), q(t, "Sencoded", function() {
    return this.eddsa.encodeInt(this.S());
  }), t.prototype.toBytes = function() {
    return this.Rencoded().concat(this.Sencoded());
  }, t.prototype.toHex = function() {
    return c.encode(this.toBytes(), "hex").toUpperCase();
  }, signature = t, signature;
}
var eddsa, hasRequiredEddsa;
function requireEddsa() {
  if (hasRequiredEddsa) return eddsa;
  hasRequiredEddsa = 1;
  var P = requireHash(), c = requireCurves(), O = requireUtils$1(), q = O.assert, X = O.parseBytes, t = requireKey(), F = requireSignature();
  function l(U) {
    if (q(U === "ed25519", "only tested with ed25519 so far"), !(this instanceof l))
      return new l(U);
    U = c[U].curve, this.curve = U, this.g = U.g, this.g.precompute(U.n.bitLength() + 1), this.pointClass = U.point().constructor, this.encodingLength = Math.ceil(U.n.bitLength() / 8), this.hash = P.sha512;
  }
  return eddsa = l, l.prototype.sign = function(U, $) {
    U = X(U);
    var D = this.keyFromSecret($), Q = this.hashInt(D.messagePrefix(), U), V = this.g.mul(Q), te = this.encodePoint(V), ie = this.hashInt(te, D.pubBytes(), U).mul(D.priv()), ne = Q.add(ie).umod(this.curve.n);
    return this.makeSignature({ R: V, S: ne, Rencoded: te });
  }, l.prototype.verify = function(U, $, D) {
    U = X(U), $ = this.makeSignature($);
    var Q = this.keyFromPublic(D), V = this.hashInt($.Rencoded(), Q.pubBytes(), U), te = this.g.mul($.S()), ie = $.R().add(Q.pub().mul(V));
    return ie.eq(te);
  }, l.prototype.hashInt = function() {
    for (var U = this.hash(), $ = 0; $ < arguments.length; $++)
      U.update(arguments[$]);
    return O.intFromLE(U.digest()).umod(this.curve.n);
  }, l.prototype.keyFromPublic = function(U) {
    return t.fromPublic(this, U);
  }, l.prototype.keyFromSecret = function(U) {
    return t.fromSecret(this, U);
  }, l.prototype.makeSignature = function(U) {
    return U instanceof F ? U : new F(this, U);
  }, l.prototype.encodePoint = function(U) {
    var $ = U.getY().toArray("le", this.encodingLength);
    return $[this.encodingLength - 1] |= U.getX().isOdd() ? 128 : 0, $;
  }, l.prototype.decodePoint = function(U) {
    U = O.parseBytes(U);
    var $ = U.length - 1, D = U.slice(0, $).concat(U[$] & -129), Q = (U[$] & 128) !== 0, V = O.intFromLE(D);
    return this.curve.pointFromY(V, Q);
  }, l.prototype.encodeInt = function(U) {
    return U.toArray("le", this.encodingLength);
  }, l.prototype.decodeInt = function(U) {
    return O.intFromLE(U);
  }, l.prototype.isPoint = function(U) {
    return U instanceof this.pointClass;
  }, eddsa;
}
var hasRequiredElliptic;
function requireElliptic() {
  return hasRequiredElliptic || (hasRequiredElliptic = 1, function(P) {
    var c = P;
    c.version = require$$0.version, c.utils = requireUtils$1(), c.rand = requireBrorand(), c.curve = requireCurve(), c.curves = requireCurves(), c.ec = requireEc(), c.eddsa = requireEddsa();
  }(elliptic)), elliptic;
}
var bn = { exports: {} }, hasRequiredBn;
function requireBn() {
  return hasRequiredBn || (hasRequiredBn = 1, function(P) {
    (function(c, O) {
      function q(e, o) {
        if (!e) throw new Error(o || "Assertion failed");
      }
      function X(e, o) {
        e.super_ = o;
        var y = function() {
        };
        y.prototype = o.prototype, e.prototype = new y(), e.prototype.constructor = e;
      }
      function t(e, o, y) {
        if (t.isBN(e))
          return e;
        this.negative = 0, this.words = null, this.length = 0, this.red = null, e !== null && ((o === "le" || o === "be") && (y = o, o = 10), this._init(e || 0, o || 10, y || "be"));
      }
      typeof c == "object" ? c.exports = t : O.BN = t, t.BN = t, t.wordSize = 26;
      var F;
      try {
        typeof window != "undefined" && typeof window.Buffer != "undefined" ? F = window.Buffer : F = requireBuffer$1().Buffer;
      } catch (e) {
      }
      t.isBN = function(e) {
        return e instanceof t ? !0 : e !== null && typeof e == "object" && e.constructor.wordSize === t.wordSize && Array.isArray(e.words);
      }, t.max = function(e, o) {
        return e.cmp(o) > 0 ? e : o;
      }, t.min = function(e, o) {
        return e.cmp(o) < 0 ? e : o;
      }, t.prototype._init = function(e, o, y) {
        if (typeof e == "number")
          return this._initNumber(e, o, y);
        if (typeof e == "object")
          return this._initArray(e, o, y);
        o === "hex" && (o = 16), q(o === (o | 0) && o >= 2 && o <= 36), e = e.toString().replace(/\s+/g, "");
        var H = 0;
        e[0] === "-" && (H++, this.negative = 1), H < e.length && (o === 16 ? this._parseHex(e, H, y) : (this._parseBase(e, o, H), y === "le" && this._initArray(this.toArray(), o, y)));
      }, t.prototype._initNumber = function(e, o, y) {
        e < 0 && (this.negative = 1, e = -e), e < 67108864 ? (this.words = [e & 67108863], this.length = 1) : e < 4503599627370496 ? (this.words = [
          e & 67108863,
          e / 67108864 & 67108863
        ], this.length = 2) : (q(e < 9007199254740992), this.words = [
          e & 67108863,
          e / 67108864 & 67108863,
          1
        ], this.length = 3), y === "le" && this._initArray(this.toArray(), o, y);
      }, t.prototype._initArray = function(e, o, y) {
        if (q(typeof e.length == "number"), e.length <= 0)
          return this.words = [0], this.length = 1, this;
        this.length = Math.ceil(e.length / 3), this.words = new Array(this.length);
        for (var H = 0; H < this.length; H++)
          this.words[H] = 0;
        var z, B, w = 0;
        if (y === "be")
          for (H = e.length - 1, z = 0; H >= 0; H -= 3)
            B = e[H] | e[H - 1] << 8 | e[H - 2] << 16, this.words[z] |= B << w & 67108863, this.words[z + 1] = B >>> 26 - w & 67108863, w += 24, w >= 26 && (w -= 26, z++);
        else if (y === "le")
          for (H = 0, z = 0; H < e.length; H += 3)
            B = e[H] | e[H + 1] << 8 | e[H + 2] << 16, this.words[z] |= B << w & 67108863, this.words[z + 1] = B >>> 26 - w & 67108863, w += 24, w >= 26 && (w -= 26, z++);
        return this._strip();
      };
      function l(e, o) {
        var y = e.charCodeAt(o);
        if (y >= 48 && y <= 57)
          return y - 48;
        if (y >= 65 && y <= 70)
          return y - 55;
        if (y >= 97 && y <= 102)
          return y - 87;
        q(!1, "Invalid character in " + e);
      }
      function U(e, o, y) {
        var H = l(e, y);
        return y - 1 >= o && (H |= l(e, y - 1) << 4), H;
      }
      t.prototype._parseHex = function(e, o, y) {
        this.length = Math.ceil((e.length - o) / 6), this.words = new Array(this.length);
        for (var H = 0; H < this.length; H++)
          this.words[H] = 0;
        var z = 0, B = 0, w;
        if (y === "be")
          for (H = e.length - 1; H >= o; H -= 2)
            w = U(e, o, H) << z, this.words[B] |= w & 67108863, z >= 18 ? (z -= 18, B += 1, this.words[B] |= w >>> 26) : z += 8;
        else {
          var G = e.length - o;
          for (H = G % 2 === 0 ? o + 1 : o; H < e.length; H += 2)
            w = U(e, o, H) << z, this.words[B] |= w & 67108863, z >= 18 ? (z -= 18, B += 1, this.words[B] |= w >>> 26) : z += 8;
        }
        this._strip();
      };
      function $(e, o, y, H) {
        for (var z = 0, B = 0, w = Math.min(e.length, y), G = o; G < w; G++) {
          var g = e.charCodeAt(G) - 48;
          z *= H, g >= 49 ? B = g - 49 + 10 : g >= 17 ? B = g - 17 + 10 : B = g, q(g >= 0 && B < H, "Invalid character"), z += B;
        }
        return z;
      }
      t.prototype._parseBase = function(e, o, y) {
        this.words = [0], this.length = 1;
        for (var H = 0, z = 1; z <= 67108863; z *= o)
          H++;
        H--, z = z / o | 0;
        for (var B = e.length - y, w = B % H, G = Math.min(B, B - w) + y, g = 0, J = y; J < G; J += H)
          g = $(e, J, J + H, o), this.imuln(z), this.words[0] + g < 67108864 ? this.words[0] += g : this._iaddn(g);
        if (w !== 0) {
          var le = 1;
          for (g = $(e, J, e.length, o), J = 0; J < w; J++)
            le *= o;
          this.imuln(le), this.words[0] + g < 67108864 ? this.words[0] += g : this._iaddn(g);
        }
        this._strip();
      }, t.prototype.copy = function(e) {
        e.words = new Array(this.length);
        for (var o = 0; o < this.length; o++)
          e.words[o] = this.words[o];
        e.length = this.length, e.negative = this.negative, e.red = this.red;
      };
      function D(e, o) {
        e.words = o.words, e.length = o.length, e.negative = o.negative, e.red = o.red;
      }
      if (t.prototype._move = function(e) {
        D(e, this);
      }, t.prototype.clone = function() {
        var e = new t(null);
        return this.copy(e), e;
      }, t.prototype._expand = function(e) {
        for (; this.length < e; )
          this.words[this.length++] = 0;
        return this;
      }, t.prototype._strip = function() {
        for (; this.length > 1 && this.words[this.length - 1] === 0; )
          this.length--;
        return this._normSign();
      }, t.prototype._normSign = function() {
        return this.length === 1 && this.words[0] === 0 && (this.negative = 0), this;
      }, typeof Symbol != "undefined" && typeof Symbol.for == "function")
        try {
          t.prototype[Symbol.for("nodejs.util.inspect.custom")] = Q;
        } catch (e) {
          t.prototype.inspect = Q;
        }
      else
        t.prototype.inspect = Q;
      function Q() {
        return (this.red ? "<BN-R: " : "<BN: ") + this.toString(16) + ">";
      }
      var V = [
        "",
        "0",
        "00",
        "000",
        "0000",
        "00000",
        "000000",
        "0000000",
        "00000000",
        "000000000",
        "0000000000",
        "00000000000",
        "000000000000",
        "0000000000000",
        "00000000000000",
        "000000000000000",
        "0000000000000000",
        "00000000000000000",
        "000000000000000000",
        "0000000000000000000",
        "00000000000000000000",
        "000000000000000000000",
        "0000000000000000000000",
        "00000000000000000000000",
        "000000000000000000000000",
        "0000000000000000000000000"
      ], te = [
        0,
        0,
        25,
        16,
        12,
        11,
        10,
        9,
        8,
        8,
        7,
        7,
        7,
        7,
        6,
        6,
        6,
        6,
        6,
        6,
        6,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5
      ], ie = [
        0,
        0,
        33554432,
        43046721,
        16777216,
        48828125,
        60466176,
        40353607,
        16777216,
        43046721,
        1e7,
        19487171,
        35831808,
        62748517,
        7529536,
        11390625,
        16777216,
        24137569,
        34012224,
        47045881,
        64e6,
        4084101,
        5153632,
        6436343,
        7962624,
        9765625,
        11881376,
        14348907,
        17210368,
        20511149,
        243e5,
        28629151,
        33554432,
        39135393,
        45435424,
        52521875,
        60466176
      ];
      t.prototype.toString = function(e, o) {
        e = e || 10, o = o | 0 || 1;
        var y;
        if (e === 16 || e === "hex") {
          y = "";
          for (var H = 0, z = 0, B = 0; B < this.length; B++) {
            var w = this.words[B], G = ((w << H | z) & 16777215).toString(16);
            z = w >>> 24 - H & 16777215, H += 2, H >= 26 && (H -= 26, B--), z !== 0 || B !== this.length - 1 ? y = V[6 - G.length] + G + y : y = G + y;
          }
          for (z !== 0 && (y = z.toString(16) + y); y.length % o !== 0; )
            y = "0" + y;
          return this.negative !== 0 && (y = "-" + y), y;
        }
        if (e === (e | 0) && e >= 2 && e <= 36) {
          var g = te[e], J = ie[e];
          y = "";
          var le = this.clone();
          for (le.negative = 0; !le.isZero(); ) {
            var ge = le.modrn(J).toString(e);
            le = le.idivn(J), le.isZero() ? y = ge + y : y = V[g - ge.length] + ge + y;
          }
          for (this.isZero() && (y = "0" + y); y.length % o !== 0; )
            y = "0" + y;
          return this.negative !== 0 && (y = "-" + y), y;
        }
        q(!1, "Base should be between 2 and 36");
      }, t.prototype.toNumber = function() {
        var e = this.words[0];
        return this.length === 2 ? e += this.words[1] * 67108864 : this.length === 3 && this.words[2] === 1 ? e += 4503599627370496 + this.words[1] * 67108864 : this.length > 2 && q(!1, "Number can only safely store up to 53 bits"), this.negative !== 0 ? -e : e;
      }, t.prototype.toJSON = function() {
        return this.toString(16, 2);
      }, F && (t.prototype.toBuffer = function(e, o) {
        return this.toArrayLike(F, e, o);
      }), t.prototype.toArray = function(e, o) {
        return this.toArrayLike(Array, e, o);
      };
      var ne = function(e, o) {
        return e.allocUnsafe ? e.allocUnsafe(o) : new e(o);
      };
      t.prototype.toArrayLike = function(e, o, y) {
        this._strip();
        var H = this.byteLength(), z = y || Math.max(1, H);
        q(H <= z, "byte array longer than desired length"), q(z > 0, "Requested array length <= 0");
        var B = ne(e, z), w = o === "le" ? "LE" : "BE";
        return this["_toArrayLike" + w](B, H), B;
      }, t.prototype._toArrayLikeLE = function(e, o) {
        for (var y = 0, H = 0, z = 0, B = 0; z < this.length; z++) {
          var w = this.words[z] << B | H;
          e[y++] = w & 255, y < e.length && (e[y++] = w >> 8 & 255), y < e.length && (e[y++] = w >> 16 & 255), B === 6 ? (y < e.length && (e[y++] = w >> 24 & 255), H = 0, B = 0) : (H = w >>> 24, B += 2);
        }
        if (y < e.length)
          for (e[y++] = H; y < e.length; )
            e[y++] = 0;
      }, t.prototype._toArrayLikeBE = function(e, o) {
        for (var y = e.length - 1, H = 0, z = 0, B = 0; z < this.length; z++) {
          var w = this.words[z] << B | H;
          e[y--] = w & 255, y >= 0 && (e[y--] = w >> 8 & 255), y >= 0 && (e[y--] = w >> 16 & 255), B === 6 ? (y >= 0 && (e[y--] = w >> 24 & 255), H = 0, B = 0) : (H = w >>> 24, B += 2);
        }
        if (y >= 0)
          for (e[y--] = H; y >= 0; )
            e[y--] = 0;
      }, Math.clz32 ? t.prototype._countBits = function(e) {
        return 32 - Math.clz32(e);
      } : t.prototype._countBits = function(e) {
        var o = e, y = 0;
        return o >= 4096 && (y += 13, o >>>= 13), o >= 64 && (y += 7, o >>>= 7), o >= 8 && (y += 4, o >>>= 4), o >= 2 && (y += 2, o >>>= 2), y + o;
      }, t.prototype._zeroBits = function(e) {
        if (e === 0) return 26;
        var o = e, y = 0;
        return o & 8191 || (y += 13, o >>>= 13), o & 127 || (y += 7, o >>>= 7), o & 15 || (y += 4, o >>>= 4), o & 3 || (y += 2, o >>>= 2), o & 1 || y++, y;
      }, t.prototype.bitLength = function() {
        var e = this.words[this.length - 1], o = this._countBits(e);
        return (this.length - 1) * 26 + o;
      };
      function se(e) {
        for (var o = new Array(e.bitLength()), y = 0; y < o.length; y++) {
          var H = y / 26 | 0, z = y % 26;
          o[y] = e.words[H] >>> z & 1;
        }
        return o;
      }
      t.prototype.zeroBits = function() {
        if (this.isZero()) return 0;
        for (var e = 0, o = 0; o < this.length; o++) {
          var y = this._zeroBits(this.words[o]);
          if (e += y, y !== 26) break;
        }
        return e;
      }, t.prototype.byteLength = function() {
        return Math.ceil(this.bitLength() / 8);
      }, t.prototype.toTwos = function(e) {
        return this.negative !== 0 ? this.abs().inotn(e).iaddn(1) : this.clone();
      }, t.prototype.fromTwos = function(e) {
        return this.testn(e - 1) ? this.notn(e).iaddn(1).ineg() : this.clone();
      }, t.prototype.isNeg = function() {
        return this.negative !== 0;
      }, t.prototype.neg = function() {
        return this.clone().ineg();
      }, t.prototype.ineg = function() {
        return this.isZero() || (this.negative ^= 1), this;
      }, t.prototype.iuor = function(e) {
        for (; this.length < e.length; )
          this.words[this.length++] = 0;
        for (var o = 0; o < e.length; o++)
          this.words[o] = this.words[o] | e.words[o];
        return this._strip();
      }, t.prototype.ior = function(e) {
        return q((this.negative | e.negative) === 0), this.iuor(e);
      }, t.prototype.or = function(e) {
        return this.length > e.length ? this.clone().ior(e) : e.clone().ior(this);
      }, t.prototype.uor = function(e) {
        return this.length > e.length ? this.clone().iuor(e) : e.clone().iuor(this);
      }, t.prototype.iuand = function(e) {
        var o;
        this.length > e.length ? o = e : o = this;
        for (var y = 0; y < o.length; y++)
          this.words[y] = this.words[y] & e.words[y];
        return this.length = o.length, this._strip();
      }, t.prototype.iand = function(e) {
        return q((this.negative | e.negative) === 0), this.iuand(e);
      }, t.prototype.and = function(e) {
        return this.length > e.length ? this.clone().iand(e) : e.clone().iand(this);
      }, t.prototype.uand = function(e) {
        return this.length > e.length ? this.clone().iuand(e) : e.clone().iuand(this);
      }, t.prototype.iuxor = function(e) {
        var o, y;
        this.length > e.length ? (o = this, y = e) : (o = e, y = this);
        for (var H = 0; H < y.length; H++)
          this.words[H] = o.words[H] ^ y.words[H];
        if (this !== o)
          for (; H < o.length; H++)
            this.words[H] = o.words[H];
        return this.length = o.length, this._strip();
      }, t.prototype.ixor = function(e) {
        return q((this.negative | e.negative) === 0), this.iuxor(e);
      }, t.prototype.xor = function(e) {
        return this.length > e.length ? this.clone().ixor(e) : e.clone().ixor(this);
      }, t.prototype.uxor = function(e) {
        return this.length > e.length ? this.clone().iuxor(e) : e.clone().iuxor(this);
      }, t.prototype.inotn = function(e) {
        q(typeof e == "number" && e >= 0);
        var o = Math.ceil(e / 26) | 0, y = e % 26;
        this._expand(o), y > 0 && o--;
        for (var H = 0; H < o; H++)
          this.words[H] = ~this.words[H] & 67108863;
        return y > 0 && (this.words[H] = ~this.words[H] & 67108863 >> 26 - y), this._strip();
      }, t.prototype.notn = function(e) {
        return this.clone().inotn(e);
      }, t.prototype.setn = function(e, o) {
        q(typeof e == "number" && e >= 0);
        var y = e / 26 | 0, H = e % 26;
        return this._expand(y + 1), o ? this.words[y] = this.words[y] | 1 << H : this.words[y] = this.words[y] & ~(1 << H), this._strip();
      }, t.prototype.iadd = function(e) {
        var o;
        if (this.negative !== 0 && e.negative === 0)
          return this.negative = 0, o = this.isub(e), this.negative ^= 1, this._normSign();
        if (this.negative === 0 && e.negative !== 0)
          return e.negative = 0, o = this.isub(e), e.negative = 1, o._normSign();
        var y, H;
        this.length > e.length ? (y = this, H = e) : (y = e, H = this);
        for (var z = 0, B = 0; B < H.length; B++)
          o = (y.words[B] | 0) + (H.words[B] | 0) + z, this.words[B] = o & 67108863, z = o >>> 26;
        for (; z !== 0 && B < y.length; B++)
          o = (y.words[B] | 0) + z, this.words[B] = o & 67108863, z = o >>> 26;
        if (this.length = y.length, z !== 0)
          this.words[this.length] = z, this.length++;
        else if (y !== this)
          for (; B < y.length; B++)
            this.words[B] = y.words[B];
        return this;
      }, t.prototype.add = function(e) {
        var o;
        return e.negative !== 0 && this.negative === 0 ? (e.negative = 0, o = this.sub(e), e.negative ^= 1, o) : e.negative === 0 && this.negative !== 0 ? (this.negative = 0, o = e.sub(this), this.negative = 1, o) : this.length > e.length ? this.clone().iadd(e) : e.clone().iadd(this);
      }, t.prototype.isub = function(e) {
        if (e.negative !== 0) {
          e.negative = 0;
          var o = this.iadd(e);
          return e.negative = 1, o._normSign();
        } else if (this.negative !== 0)
          return this.negative = 0, this.iadd(e), this.negative = 1, this._normSign();
        var y = this.cmp(e);
        if (y === 0)
          return this.negative = 0, this.length = 1, this.words[0] = 0, this;
        var H, z;
        y > 0 ? (H = this, z = e) : (H = e, z = this);
        for (var B = 0, w = 0; w < z.length; w++)
          o = (H.words[w] | 0) - (z.words[w] | 0) + B, B = o >> 26, this.words[w] = o & 67108863;
        for (; B !== 0 && w < H.length; w++)
          o = (H.words[w] | 0) + B, B = o >> 26, this.words[w] = o & 67108863;
        if (B === 0 && w < H.length && H !== this)
          for (; w < H.length; w++)
            this.words[w] = H.words[w];
        return this.length = Math.max(this.length, w), H !== this && (this.negative = 1), this._strip();
      }, t.prototype.sub = function(e) {
        return this.clone().isub(e);
      };
      function ae(e, o, y) {
        y.negative = o.negative ^ e.negative;
        var H = e.length + o.length | 0;
        y.length = H, H = H - 1 | 0;
        var z = e.words[0] | 0, B = o.words[0] | 0, w = z * B, G = w & 67108863, g = w / 67108864 | 0;
        y.words[0] = G;
        for (var J = 1; J < H; J++) {
          for (var le = g >>> 26, ge = g & 67108863, Se = Math.min(J, o.length - 1), ye = Math.max(0, J - e.length + 1); ye <= Se; ye++) {
            var fe = J - ye | 0;
            z = e.words[fe] | 0, B = o.words[ye] | 0, w = z * B + ge, le += w / 67108864 | 0, ge = w & 67108863;
          }
          y.words[J] = ge | 0, g = le | 0;
        }
        return g !== 0 ? y.words[J] = g | 0 : y.length--, y._strip();
      }
      var oe = function(e, o, y) {
        var H = e.words, z = o.words, B = y.words, w = 0, G, g, J, le = H[0] | 0, ge = le & 8191, Se = le >>> 13, ye = H[1] | 0, fe = ye & 8191, he = ye >>> 13, Re = H[2] | 0, ke = Re & 8191, me = Re >>> 13, ve = H[3] | 0, Ae = ve & 8191, $e = ve >>> 13, Oe = H[4] | 0, Y = Oe & 8191, Z = Oe >>> 13, re = H[5] | 0, ue = re & 8191, we = re >>> 13, Ee = H[6] | 0, Ie = Ee & 8191, xe = Ee >>> 13, Le = H[7] | 0, Pe = Le & 8191, Ce = Le >>> 13, je = H[8] | 0, Ve = je & 8191, Ne = je >>> 13, ft = H[9] | 0, Ye = ft & 8191, De = ft >>> 13, ht = z[0] | 0, et = ht & 8191, Ue = ht >>> 13, ct = z[1] | 0, tt = ct & 8191, We = ct >>> 13, lt = z[2] | 0, rt = lt & 8191, Fe = lt >>> 13, dt = z[3] | 0, it = dt & 8191, ze = dt >>> 13, pt = z[4] | 0, nt = pt & 8191, Ge = pt >>> 13, mt = z[5] | 0, ot = mt & 8191, He = mt >>> 13, bt = z[6] | 0, st = bt & 8191, Ke = bt >>> 13, yt = z[7] | 0, at = yt & 8191, Xe = yt >>> 13, gt = z[8] | 0, ut = gt & 8191, Ze = gt >>> 13, vt = z[9] | 0, Je = vt & 8191, Qe = vt >>> 13;
        y.negative = e.negative ^ o.negative, y.length = 19, G = Math.imul(ge, et), g = Math.imul(ge, Ue), g = g + Math.imul(Se, et) | 0, J = Math.imul(Se, Ue);
        var _t = (w + G | 0) + ((g & 8191) << 13) | 0;
        w = (J + (g >>> 13) | 0) + (_t >>> 26) | 0, _t &= 67108863, G = Math.imul(fe, et), g = Math.imul(fe, Ue), g = g + Math.imul(he, et) | 0, J = Math.imul(he, Ue), G = G + Math.imul(ge, tt) | 0, g = g + Math.imul(ge, We) | 0, g = g + Math.imul(Se, tt) | 0, J = J + Math.imul(Se, We) | 0;
        var Mt = (w + G | 0) + ((g & 8191) << 13) | 0;
        w = (J + (g >>> 13) | 0) + (Mt >>> 26) | 0, Mt &= 67108863, G = Math.imul(ke, et), g = Math.imul(ke, Ue), g = g + Math.imul(me, et) | 0, J = Math.imul(me, Ue), G = G + Math.imul(fe, tt) | 0, g = g + Math.imul(fe, We) | 0, g = g + Math.imul(he, tt) | 0, J = J + Math.imul(he, We) | 0, G = G + Math.imul(ge, rt) | 0, g = g + Math.imul(ge, Fe) | 0, g = g + Math.imul(Se, rt) | 0, J = J + Math.imul(Se, Fe) | 0;
        var St = (w + G | 0) + ((g & 8191) << 13) | 0;
        w = (J + (g >>> 13) | 0) + (St >>> 26) | 0, St &= 67108863, G = Math.imul(Ae, et), g = Math.imul(Ae, Ue), g = g + Math.imul($e, et) | 0, J = Math.imul($e, Ue), G = G + Math.imul(ke, tt) | 0, g = g + Math.imul(ke, We) | 0, g = g + Math.imul(me, tt) | 0, J = J + Math.imul(me, We) | 0, G = G + Math.imul(fe, rt) | 0, g = g + Math.imul(fe, Fe) | 0, g = g + Math.imul(he, rt) | 0, J = J + Math.imul(he, Fe) | 0, G = G + Math.imul(ge, it) | 0, g = g + Math.imul(ge, ze) | 0, g = g + Math.imul(Se, it) | 0, J = J + Math.imul(Se, ze) | 0;
        var qt = (w + G | 0) + ((g & 8191) << 13) | 0;
        w = (J + (g >>> 13) | 0) + (qt >>> 26) | 0, qt &= 67108863, G = Math.imul(Y, et), g = Math.imul(Y, Ue), g = g + Math.imul(Z, et) | 0, J = Math.imul(Z, Ue), G = G + Math.imul(Ae, tt) | 0, g = g + Math.imul(Ae, We) | 0, g = g + Math.imul($e, tt) | 0, J = J + Math.imul($e, We) | 0, G = G + Math.imul(ke, rt) | 0, g = g + Math.imul(ke, Fe) | 0, g = g + Math.imul(me, rt) | 0, J = J + Math.imul(me, Fe) | 0, G = G + Math.imul(fe, it) | 0, g = g + Math.imul(fe, ze) | 0, g = g + Math.imul(he, it) | 0, J = J + Math.imul(he, ze) | 0, G = G + Math.imul(ge, nt) | 0, g = g + Math.imul(ge, Ge) | 0, g = g + Math.imul(Se, nt) | 0, J = J + Math.imul(Se, Ge) | 0;
        var Et = (w + G | 0) + ((g & 8191) << 13) | 0;
        w = (J + (g >>> 13) | 0) + (Et >>> 26) | 0, Et &= 67108863, G = Math.imul(ue, et), g = Math.imul(ue, Ue), g = g + Math.imul(we, et) | 0, J = Math.imul(we, Ue), G = G + Math.imul(Y, tt) | 0, g = g + Math.imul(Y, We) | 0, g = g + Math.imul(Z, tt) | 0, J = J + Math.imul(Z, We) | 0, G = G + Math.imul(Ae, rt) | 0, g = g + Math.imul(Ae, Fe) | 0, g = g + Math.imul($e, rt) | 0, J = J + Math.imul($e, Fe) | 0, G = G + Math.imul(ke, it) | 0, g = g + Math.imul(ke, ze) | 0, g = g + Math.imul(me, it) | 0, J = J + Math.imul(me, ze) | 0, G = G + Math.imul(fe, nt) | 0, g = g + Math.imul(fe, Ge) | 0, g = g + Math.imul(he, nt) | 0, J = J + Math.imul(he, Ge) | 0, G = G + Math.imul(ge, ot) | 0, g = g + Math.imul(ge, He) | 0, g = g + Math.imul(Se, ot) | 0, J = J + Math.imul(Se, He) | 0;
        var Rt = (w + G | 0) + ((g & 8191) << 13) | 0;
        w = (J + (g >>> 13) | 0) + (Rt >>> 26) | 0, Rt &= 67108863, G = Math.imul(Ie, et), g = Math.imul(Ie, Ue), g = g + Math.imul(xe, et) | 0, J = Math.imul(xe, Ue), G = G + Math.imul(ue, tt) | 0, g = g + Math.imul(ue, We) | 0, g = g + Math.imul(we, tt) | 0, J = J + Math.imul(we, We) | 0, G = G + Math.imul(Y, rt) | 0, g = g + Math.imul(Y, Fe) | 0, g = g + Math.imul(Z, rt) | 0, J = J + Math.imul(Z, Fe) | 0, G = G + Math.imul(Ae, it) | 0, g = g + Math.imul(Ae, ze) | 0, g = g + Math.imul($e, it) | 0, J = J + Math.imul($e, ze) | 0, G = G + Math.imul(ke, nt) | 0, g = g + Math.imul(ke, Ge) | 0, g = g + Math.imul(me, nt) | 0, J = J + Math.imul(me, Ge) | 0, G = G + Math.imul(fe, ot) | 0, g = g + Math.imul(fe, He) | 0, g = g + Math.imul(he, ot) | 0, J = J + Math.imul(he, He) | 0, G = G + Math.imul(ge, st) | 0, g = g + Math.imul(ge, Ke) | 0, g = g + Math.imul(Se, st) | 0, J = J + Math.imul(Se, Ke) | 0;
        var Bt = (w + G | 0) + ((g & 8191) << 13) | 0;
        w = (J + (g >>> 13) | 0) + (Bt >>> 26) | 0, Bt &= 67108863, G = Math.imul(Pe, et), g = Math.imul(Pe, Ue), g = g + Math.imul(Ce, et) | 0, J = Math.imul(Ce, Ue), G = G + Math.imul(Ie, tt) | 0, g = g + Math.imul(Ie, We) | 0, g = g + Math.imul(xe, tt) | 0, J = J + Math.imul(xe, We) | 0, G = G + Math.imul(ue, rt) | 0, g = g + Math.imul(ue, Fe) | 0, g = g + Math.imul(we, rt) | 0, J = J + Math.imul(we, Fe) | 0, G = G + Math.imul(Y, it) | 0, g = g + Math.imul(Y, ze) | 0, g = g + Math.imul(Z, it) | 0, J = J + Math.imul(Z, ze) | 0, G = G + Math.imul(Ae, nt) | 0, g = g + Math.imul(Ae, Ge) | 0, g = g + Math.imul($e, nt) | 0, J = J + Math.imul($e, Ge) | 0, G = G + Math.imul(ke, ot) | 0, g = g + Math.imul(ke, He) | 0, g = g + Math.imul(me, ot) | 0, J = J + Math.imul(me, He) | 0, G = G + Math.imul(fe, st) | 0, g = g + Math.imul(fe, Ke) | 0, g = g + Math.imul(he, st) | 0, J = J + Math.imul(he, Ke) | 0, G = G + Math.imul(ge, at) | 0, g = g + Math.imul(ge, Xe) | 0, g = g + Math.imul(Se, at) | 0, J = J + Math.imul(Se, Xe) | 0;
        var kt = (w + G | 0) + ((g & 8191) << 13) | 0;
        w = (J + (g >>> 13) | 0) + (kt >>> 26) | 0, kt &= 67108863, G = Math.imul(Ve, et), g = Math.imul(Ve, Ue), g = g + Math.imul(Ne, et) | 0, J = Math.imul(Ne, Ue), G = G + Math.imul(Pe, tt) | 0, g = g + Math.imul(Pe, We) | 0, g = g + Math.imul(Ce, tt) | 0, J = J + Math.imul(Ce, We) | 0, G = G + Math.imul(Ie, rt) | 0, g = g + Math.imul(Ie, Fe) | 0, g = g + Math.imul(xe, rt) | 0, J = J + Math.imul(xe, Fe) | 0, G = G + Math.imul(ue, it) | 0, g = g + Math.imul(ue, ze) | 0, g = g + Math.imul(we, it) | 0, J = J + Math.imul(we, ze) | 0, G = G + Math.imul(Y, nt) | 0, g = g + Math.imul(Y, Ge) | 0, g = g + Math.imul(Z, nt) | 0, J = J + Math.imul(Z, Ge) | 0, G = G + Math.imul(Ae, ot) | 0, g = g + Math.imul(Ae, He) | 0, g = g + Math.imul($e, ot) | 0, J = J + Math.imul($e, He) | 0, G = G + Math.imul(ke, st) | 0, g = g + Math.imul(ke, Ke) | 0, g = g + Math.imul(me, st) | 0, J = J + Math.imul(me, Ke) | 0, G = G + Math.imul(fe, at) | 0, g = g + Math.imul(fe, Xe) | 0, g = g + Math.imul(he, at) | 0, J = J + Math.imul(he, Xe) | 0, G = G + Math.imul(ge, ut) | 0, g = g + Math.imul(ge, Ze) | 0, g = g + Math.imul(Se, ut) | 0, J = J + Math.imul(Se, Ze) | 0;
        var At = (w + G | 0) + ((g & 8191) << 13) | 0;
        w = (J + (g >>> 13) | 0) + (At >>> 26) | 0, At &= 67108863, G = Math.imul(Ye, et), g = Math.imul(Ye, Ue), g = g + Math.imul(De, et) | 0, J = Math.imul(De, Ue), G = G + Math.imul(Ve, tt) | 0, g = g + Math.imul(Ve, We) | 0, g = g + Math.imul(Ne, tt) | 0, J = J + Math.imul(Ne, We) | 0, G = G + Math.imul(Pe, rt) | 0, g = g + Math.imul(Pe, Fe) | 0, g = g + Math.imul(Ce, rt) | 0, J = J + Math.imul(Ce, Fe) | 0, G = G + Math.imul(Ie, it) | 0, g = g + Math.imul(Ie, ze) | 0, g = g + Math.imul(xe, it) | 0, J = J + Math.imul(xe, ze) | 0, G = G + Math.imul(ue, nt) | 0, g = g + Math.imul(ue, Ge) | 0, g = g + Math.imul(we, nt) | 0, J = J + Math.imul(we, Ge) | 0, G = G + Math.imul(Y, ot) | 0, g = g + Math.imul(Y, He) | 0, g = g + Math.imul(Z, ot) | 0, J = J + Math.imul(Z, He) | 0, G = G + Math.imul(Ae, st) | 0, g = g + Math.imul(Ae, Ke) | 0, g = g + Math.imul($e, st) | 0, J = J + Math.imul($e, Ke) | 0, G = G + Math.imul(ke, at) | 0, g = g + Math.imul(ke, Xe) | 0, g = g + Math.imul(me, at) | 0, J = J + Math.imul(me, Xe) | 0, G = G + Math.imul(fe, ut) | 0, g = g + Math.imul(fe, Ze) | 0, g = g + Math.imul(he, ut) | 0, J = J + Math.imul(he, Ze) | 0, G = G + Math.imul(ge, Je) | 0, g = g + Math.imul(ge, Qe) | 0, g = g + Math.imul(Se, Je) | 0, J = J + Math.imul(Se, Qe) | 0;
        var It = (w + G | 0) + ((g & 8191) << 13) | 0;
        w = (J + (g >>> 13) | 0) + (It >>> 26) | 0, It &= 67108863, G = Math.imul(Ye, tt), g = Math.imul(Ye, We), g = g + Math.imul(De, tt) | 0, J = Math.imul(De, We), G = G + Math.imul(Ve, rt) | 0, g = g + Math.imul(Ve, Fe) | 0, g = g + Math.imul(Ne, rt) | 0, J = J + Math.imul(Ne, Fe) | 0, G = G + Math.imul(Pe, it) | 0, g = g + Math.imul(Pe, ze) | 0, g = g + Math.imul(Ce, it) | 0, J = J + Math.imul(Ce, ze) | 0, G = G + Math.imul(Ie, nt) | 0, g = g + Math.imul(Ie, Ge) | 0, g = g + Math.imul(xe, nt) | 0, J = J + Math.imul(xe, Ge) | 0, G = G + Math.imul(ue, ot) | 0, g = g + Math.imul(ue, He) | 0, g = g + Math.imul(we, ot) | 0, J = J + Math.imul(we, He) | 0, G = G + Math.imul(Y, st) | 0, g = g + Math.imul(Y, Ke) | 0, g = g + Math.imul(Z, st) | 0, J = J + Math.imul(Z, Ke) | 0, G = G + Math.imul(Ae, at) | 0, g = g + Math.imul(Ae, Xe) | 0, g = g + Math.imul($e, at) | 0, J = J + Math.imul($e, Xe) | 0, G = G + Math.imul(ke, ut) | 0, g = g + Math.imul(ke, Ze) | 0, g = g + Math.imul(me, ut) | 0, J = J + Math.imul(me, Ze) | 0, G = G + Math.imul(fe, Je) | 0, g = g + Math.imul(fe, Qe) | 0, g = g + Math.imul(he, Je) | 0, J = J + Math.imul(he, Qe) | 0;
        var Tt = (w + G | 0) + ((g & 8191) << 13) | 0;
        w = (J + (g >>> 13) | 0) + (Tt >>> 26) | 0, Tt &= 67108863, G = Math.imul(Ye, rt), g = Math.imul(Ye, Fe), g = g + Math.imul(De, rt) | 0, J = Math.imul(De, Fe), G = G + Math.imul(Ve, it) | 0, g = g + Math.imul(Ve, ze) | 0, g = g + Math.imul(Ne, it) | 0, J = J + Math.imul(Ne, ze) | 0, G = G + Math.imul(Pe, nt) | 0, g = g + Math.imul(Pe, Ge) | 0, g = g + Math.imul(Ce, nt) | 0, J = J + Math.imul(Ce, Ge) | 0, G = G + Math.imul(Ie, ot) | 0, g = g + Math.imul(Ie, He) | 0, g = g + Math.imul(xe, ot) | 0, J = J + Math.imul(xe, He) | 0, G = G + Math.imul(ue, st) | 0, g = g + Math.imul(ue, Ke) | 0, g = g + Math.imul(we, st) | 0, J = J + Math.imul(we, Ke) | 0, G = G + Math.imul(Y, at) | 0, g = g + Math.imul(Y, Xe) | 0, g = g + Math.imul(Z, at) | 0, J = J + Math.imul(Z, Xe) | 0, G = G + Math.imul(Ae, ut) | 0, g = g + Math.imul(Ae, Ze) | 0, g = g + Math.imul($e, ut) | 0, J = J + Math.imul($e, Ze) | 0, G = G + Math.imul(ke, Je) | 0, g = g + Math.imul(ke, Qe) | 0, g = g + Math.imul(me, Je) | 0, J = J + Math.imul(me, Qe) | 0;
        var $t = (w + G | 0) + ((g & 8191) << 13) | 0;
        w = (J + (g >>> 13) | 0) + ($t >>> 26) | 0, $t &= 67108863, G = Math.imul(Ye, it), g = Math.imul(Ye, ze), g = g + Math.imul(De, it) | 0, J = Math.imul(De, ze), G = G + Math.imul(Ve, nt) | 0, g = g + Math.imul(Ve, Ge) | 0, g = g + Math.imul(Ne, nt) | 0, J = J + Math.imul(Ne, Ge) | 0, G = G + Math.imul(Pe, ot) | 0, g = g + Math.imul(Pe, He) | 0, g = g + Math.imul(Ce, ot) | 0, J = J + Math.imul(Ce, He) | 0, G = G + Math.imul(Ie, st) | 0, g = g + Math.imul(Ie, Ke) | 0, g = g + Math.imul(xe, st) | 0, J = J + Math.imul(xe, Ke) | 0, G = G + Math.imul(ue, at) | 0, g = g + Math.imul(ue, Xe) | 0, g = g + Math.imul(we, at) | 0, J = J + Math.imul(we, Xe) | 0, G = G + Math.imul(Y, ut) | 0, g = g + Math.imul(Y, Ze) | 0, g = g + Math.imul(Z, ut) | 0, J = J + Math.imul(Z, Ze) | 0, G = G + Math.imul(Ae, Je) | 0, g = g + Math.imul(Ae, Qe) | 0, g = g + Math.imul($e, Je) | 0, J = J + Math.imul($e, Qe) | 0;
        var xt = (w + G | 0) + ((g & 8191) << 13) | 0;
        w = (J + (g >>> 13) | 0) + (xt >>> 26) | 0, xt &= 67108863, G = Math.imul(Ye, nt), g = Math.imul(Ye, Ge), g = g + Math.imul(De, nt) | 0, J = Math.imul(De, Ge), G = G + Math.imul(Ve, ot) | 0, g = g + Math.imul(Ve, He) | 0, g = g + Math.imul(Ne, ot) | 0, J = J + Math.imul(Ne, He) | 0, G = G + Math.imul(Pe, st) | 0, g = g + Math.imul(Pe, Ke) | 0, g = g + Math.imul(Ce, st) | 0, J = J + Math.imul(Ce, Ke) | 0, G = G + Math.imul(Ie, at) | 0, g = g + Math.imul(Ie, Xe) | 0, g = g + Math.imul(xe, at) | 0, J = J + Math.imul(xe, Xe) | 0, G = G + Math.imul(ue, ut) | 0, g = g + Math.imul(ue, Ze) | 0, g = g + Math.imul(we, ut) | 0, J = J + Math.imul(we, Ze) | 0, G = G + Math.imul(Y, Je) | 0, g = g + Math.imul(Y, Qe) | 0, g = g + Math.imul(Z, Je) | 0, J = J + Math.imul(Z, Qe) | 0;
        var Ct = (w + G | 0) + ((g & 8191) << 13) | 0;
        w = (J + (g >>> 13) | 0) + (Ct >>> 26) | 0, Ct &= 67108863, G = Math.imul(Ye, ot), g = Math.imul(Ye, He), g = g + Math.imul(De, ot) | 0, J = Math.imul(De, He), G = G + Math.imul(Ve, st) | 0, g = g + Math.imul(Ve, Ke) | 0, g = g + Math.imul(Ne, st) | 0, J = J + Math.imul(Ne, Ke) | 0, G = G + Math.imul(Pe, at) | 0, g = g + Math.imul(Pe, Xe) | 0, g = g + Math.imul(Ce, at) | 0, J = J + Math.imul(Ce, Xe) | 0, G = G + Math.imul(Ie, ut) | 0, g = g + Math.imul(Ie, Ze) | 0, g = g + Math.imul(xe, ut) | 0, J = J + Math.imul(xe, Ze) | 0, G = G + Math.imul(ue, Je) | 0, g = g + Math.imul(ue, Qe) | 0, g = g + Math.imul(we, Je) | 0, J = J + Math.imul(we, Qe) | 0;
        var Pt = (w + G | 0) + ((g & 8191) << 13) | 0;
        w = (J + (g >>> 13) | 0) + (Pt >>> 26) | 0, Pt &= 67108863, G = Math.imul(Ye, st), g = Math.imul(Ye, Ke), g = g + Math.imul(De, st) | 0, J = Math.imul(De, Ke), G = G + Math.imul(Ve, at) | 0, g = g + Math.imul(Ve, Xe) | 0, g = g + Math.imul(Ne, at) | 0, J = J + Math.imul(Ne, Xe) | 0, G = G + Math.imul(Pe, ut) | 0, g = g + Math.imul(Pe, Ze) | 0, g = g + Math.imul(Ce, ut) | 0, J = J + Math.imul(Ce, Ze) | 0, G = G + Math.imul(Ie, Je) | 0, g = g + Math.imul(Ie, Qe) | 0, g = g + Math.imul(xe, Je) | 0, J = J + Math.imul(xe, Qe) | 0;
        var Ot = (w + G | 0) + ((g & 8191) << 13) | 0;
        w = (J + (g >>> 13) | 0) + (Ot >>> 26) | 0, Ot &= 67108863, G = Math.imul(Ye, at), g = Math.imul(Ye, Xe), g = g + Math.imul(De, at) | 0, J = Math.imul(De, Xe), G = G + Math.imul(Ve, ut) | 0, g = g + Math.imul(Ve, Ze) | 0, g = g + Math.imul(Ne, ut) | 0, J = J + Math.imul(Ne, Ze) | 0, G = G + Math.imul(Pe, Je) | 0, g = g + Math.imul(Pe, Qe) | 0, g = g + Math.imul(Ce, Je) | 0, J = J + Math.imul(Ce, Qe) | 0;
        var Lt = (w + G | 0) + ((g & 8191) << 13) | 0;
        w = (J + (g >>> 13) | 0) + (Lt >>> 26) | 0, Lt &= 67108863, G = Math.imul(Ye, ut), g = Math.imul(Ye, Ze), g = g + Math.imul(De, ut) | 0, J = Math.imul(De, Ze), G = G + Math.imul(Ve, Je) | 0, g = g + Math.imul(Ve, Qe) | 0, g = g + Math.imul(Ne, Je) | 0, J = J + Math.imul(Ne, Qe) | 0;
        var Ut = (w + G | 0) + ((g & 8191) << 13) | 0;
        w = (J + (g >>> 13) | 0) + (Ut >>> 26) | 0, Ut &= 67108863, G = Math.imul(Ye, Je), g = Math.imul(Ye, Qe), g = g + Math.imul(De, Je) | 0, J = Math.imul(De, Qe);
        var Wt = (w + G | 0) + ((g & 8191) << 13) | 0;
        return w = (J + (g >>> 13) | 0) + (Wt >>> 26) | 0, Wt &= 67108863, B[0] = _t, B[1] = Mt, B[2] = St, B[3] = qt, B[4] = Et, B[5] = Rt, B[6] = Bt, B[7] = kt, B[8] = At, B[9] = It, B[10] = Tt, B[11] = $t, B[12] = xt, B[13] = Ct, B[14] = Pt, B[15] = Ot, B[16] = Lt, B[17] = Ut, B[18] = Wt, w !== 0 && (B[19] = w, y.length++), y;
      };
      Math.imul || (oe = ae);
      function be(e, o, y) {
        y.negative = o.negative ^ e.negative, y.length = e.length + o.length;
        for (var H = 0, z = 0, B = 0; B < y.length - 1; B++) {
          var w = z;
          z = 0;
          for (var G = H & 67108863, g = Math.min(B, o.length - 1), J = Math.max(0, B - e.length + 1); J <= g; J++) {
            var le = B - J, ge = e.words[le] | 0, Se = o.words[J] | 0, ye = ge * Se, fe = ye & 67108863;
            w = w + (ye / 67108864 | 0) | 0, fe = fe + G | 0, G = fe & 67108863, w = w + (fe >>> 26) | 0, z += w >>> 26, w &= 67108863;
          }
          y.words[B] = G, H = w, w = z;
        }
        return H !== 0 ? y.words[B] = H : y.length--, y._strip();
      }
      function de(e, o, y) {
        return be(e, o, y);
      }
      t.prototype.mulTo = function(e, o) {
        var y, H = this.length + e.length;
        return this.length === 10 && e.length === 10 ? y = oe(this, e, o) : H < 63 ? y = ae(this, e, o) : H < 1024 ? y = be(this, e, o) : y = de(this, e, o), y;
      }, t.prototype.mul = function(e) {
        var o = new t(null);
        return o.words = new Array(this.length + e.length), this.mulTo(e, o);
      }, t.prototype.mulf = function(e) {
        var o = new t(null);
        return o.words = new Array(this.length + e.length), de(this, e, o);
      }, t.prototype.imul = function(e) {
        return this.clone().mulTo(e, this);
      }, t.prototype.imuln = function(e) {
        var o = e < 0;
        o && (e = -e), q(typeof e == "number"), q(e < 67108864);
        for (var y = 0, H = 0; H < this.length; H++) {
          var z = (this.words[H] | 0) * e, B = (z & 67108863) + (y & 67108863);
          y >>= 26, y += z / 67108864 | 0, y += B >>> 26, this.words[H] = B & 67108863;
        }
        return y !== 0 && (this.words[H] = y, this.length++), o ? this.ineg() : this;
      }, t.prototype.muln = function(e) {
        return this.clone().imuln(e);
      }, t.prototype.sqr = function() {
        return this.mul(this);
      }, t.prototype.isqr = function() {
        return this.imul(this.clone());
      }, t.prototype.pow = function(e) {
        var o = se(e);
        if (o.length === 0) return new t(1);
        for (var y = this, H = 0; H < o.length && o[H] === 0; H++, y = y.sqr())
          ;
        if (++H < o.length)
          for (var z = y.sqr(); H < o.length; H++, z = z.sqr())
            o[H] !== 0 && (y = y.mul(z));
        return y;
      }, t.prototype.iushln = function(e) {
        q(typeof e == "number" && e >= 0);
        var o = e % 26, y = (e - o) / 26, H = 67108863 >>> 26 - o << 26 - o, z;
        if (o !== 0) {
          var B = 0;
          for (z = 0; z < this.length; z++) {
            var w = this.words[z] & H, G = (this.words[z] | 0) - w << o;
            this.words[z] = G | B, B = w >>> 26 - o;
          }
          B && (this.words[z] = B, this.length++);
        }
        if (y !== 0) {
          for (z = this.length - 1; z >= 0; z--)
            this.words[z + y] = this.words[z];
          for (z = 0; z < y; z++)
            this.words[z] = 0;
          this.length += y;
        }
        return this._strip();
      }, t.prototype.ishln = function(e) {
        return q(this.negative === 0), this.iushln(e);
      }, t.prototype.iushrn = function(e, o, y) {
        q(typeof e == "number" && e >= 0);
        var H;
        o ? H = (o - o % 26) / 26 : H = 0;
        var z = e % 26, B = Math.min((e - z) / 26, this.length), w = 67108863 ^ 67108863 >>> z << z, G = y;
        if (H -= B, H = Math.max(0, H), G) {
          for (var g = 0; g < B; g++)
            G.words[g] = this.words[g];
          G.length = B;
        }
        if (B !== 0) if (this.length > B)
          for (this.length -= B, g = 0; g < this.length; g++)
            this.words[g] = this.words[g + B];
        else
          this.words[0] = 0, this.length = 1;
        var J = 0;
        for (g = this.length - 1; g >= 0 && (J !== 0 || g >= H); g--) {
          var le = this.words[g] | 0;
          this.words[g] = J << 26 - z | le >>> z, J = le & w;
        }
        return G && J !== 0 && (G.words[G.length++] = J), this.length === 0 && (this.words[0] = 0, this.length = 1), this._strip();
      }, t.prototype.ishrn = function(e, o, y) {
        return q(this.negative === 0), this.iushrn(e, o, y);
      }, t.prototype.shln = function(e) {
        return this.clone().ishln(e);
      }, t.prototype.ushln = function(e) {
        return this.clone().iushln(e);
      }, t.prototype.shrn = function(e) {
        return this.clone().ishrn(e);
      }, t.prototype.ushrn = function(e) {
        return this.clone().iushrn(e);
      }, t.prototype.testn = function(e) {
        q(typeof e == "number" && e >= 0);
        var o = e % 26, y = (e - o) / 26, H = 1 << o;
        if (this.length <= y) return !1;
        var z = this.words[y];
        return !!(z & H);
      }, t.prototype.imaskn = function(e) {
        q(typeof e == "number" && e >= 0);
        var o = e % 26, y = (e - o) / 26;
        if (q(this.negative === 0, "imaskn works only with positive numbers"), this.length <= y)
          return this;
        if (o !== 0 && y++, this.length = Math.min(y, this.length), o !== 0) {
          var H = 67108863 ^ 67108863 >>> o << o;
          this.words[this.length - 1] &= H;
        }
        return this._strip();
      }, t.prototype.maskn = function(e) {
        return this.clone().imaskn(e);
      }, t.prototype.iaddn = function(e) {
        return q(typeof e == "number"), q(e < 67108864), e < 0 ? this.isubn(-e) : this.negative !== 0 ? this.length === 1 && (this.words[0] | 0) <= e ? (this.words[0] = e - (this.words[0] | 0), this.negative = 0, this) : (this.negative = 0, this.isubn(e), this.negative = 1, this) : this._iaddn(e);
      }, t.prototype._iaddn = function(e) {
        this.words[0] += e;
        for (var o = 0; o < this.length && this.words[o] >= 67108864; o++)
          this.words[o] -= 67108864, o === this.length - 1 ? this.words[o + 1] = 1 : this.words[o + 1]++;
        return this.length = Math.max(this.length, o + 1), this;
      }, t.prototype.isubn = function(e) {
        if (q(typeof e == "number"), q(e < 67108864), e < 0) return this.iaddn(-e);
        if (this.negative !== 0)
          return this.negative = 0, this.iaddn(e), this.negative = 1, this;
        if (this.words[0] -= e, this.length === 1 && this.words[0] < 0)
          this.words[0] = -this.words[0], this.negative = 1;
        else
          for (var o = 0; o < this.length && this.words[o] < 0; o++)
            this.words[o] += 67108864, this.words[o + 1] -= 1;
        return this._strip();
      }, t.prototype.addn = function(e) {
        return this.clone().iaddn(e);
      }, t.prototype.subn = function(e) {
        return this.clone().isubn(e);
      }, t.prototype.iabs = function() {
        return this.negative = 0, this;
      }, t.prototype.abs = function() {
        return this.clone().iabs();
      }, t.prototype._ishlnsubmul = function(e, o, y) {
        var H = e.length + y, z;
        this._expand(H);
        var B, w = 0;
        for (z = 0; z < e.length; z++) {
          B = (this.words[z + y] | 0) + w;
          var G = (e.words[z] | 0) * o;
          B -= G & 67108863, w = (B >> 26) - (G / 67108864 | 0), this.words[z + y] = B & 67108863;
        }
        for (; z < this.length - y; z++)
          B = (this.words[z + y] | 0) + w, w = B >> 26, this.words[z + y] = B & 67108863;
        if (w === 0) return this._strip();
        for (q(w === -1), w = 0, z = 0; z < this.length; z++)
          B = -(this.words[z] | 0) + w, w = B >> 26, this.words[z] = B & 67108863;
        return this.negative = 1, this._strip();
      }, t.prototype._wordDiv = function(e, o) {
        var y = this.length - e.length, H = this.clone(), z = e, B = z.words[z.length - 1] | 0, w = this._countBits(B);
        y = 26 - w, y !== 0 && (z = z.ushln(y), H.iushln(y), B = z.words[z.length - 1] | 0);
        var G = H.length - z.length, g;
        if (o !== "mod") {
          g = new t(null), g.length = G + 1, g.words = new Array(g.length);
          for (var J = 0; J < g.length; J++)
            g.words[J] = 0;
        }
        var le = H.clone()._ishlnsubmul(z, 1, G);
        le.negative === 0 && (H = le, g && (g.words[G] = 1));
        for (var ge = G - 1; ge >= 0; ge--) {
          var Se = (H.words[z.length + ge] | 0) * 67108864 + (H.words[z.length + ge - 1] | 0);
          for (Se = Math.min(Se / B | 0, 67108863), H._ishlnsubmul(z, Se, ge); H.negative !== 0; )
            Se--, H.negative = 0, H._ishlnsubmul(z, 1, ge), H.isZero() || (H.negative ^= 1);
          g && (g.words[ge] = Se);
        }
        return g && g._strip(), H._strip(), o !== "div" && y !== 0 && H.iushrn(y), {
          div: g || null,
          mod: H
        };
      }, t.prototype.divmod = function(e, o, y) {
        if (q(!e.isZero()), this.isZero())
          return {
            div: new t(0),
            mod: new t(0)
          };
        var H, z, B;
        return this.negative !== 0 && e.negative === 0 ? (B = this.neg().divmod(e, o), o !== "mod" && (H = B.div.neg()), o !== "div" && (z = B.mod.neg(), y && z.negative !== 0 && z.iadd(e)), {
          div: H,
          mod: z
        }) : this.negative === 0 && e.negative !== 0 ? (B = this.divmod(e.neg(), o), o !== "mod" && (H = B.div.neg()), {
          div: H,
          mod: B.mod
        }) : this.negative & e.negative ? (B = this.neg().divmod(e.neg(), o), o !== "div" && (z = B.mod.neg(), y && z.negative !== 0 && z.isub(e)), {
          div: B.div,
          mod: z
        }) : e.length > this.length || this.cmp(e) < 0 ? {
          div: new t(0),
          mod: this
        } : e.length === 1 ? o === "div" ? {
          div: this.divn(e.words[0]),
          mod: null
        } : o === "mod" ? {
          div: null,
          mod: new t(this.modrn(e.words[0]))
        } : {
          div: this.divn(e.words[0]),
          mod: new t(this.modrn(e.words[0]))
        } : this._wordDiv(e, o);
      }, t.prototype.div = function(e) {
        return this.divmod(e, "div", !1).div;
      }, t.prototype.mod = function(e) {
        return this.divmod(e, "mod", !1).mod;
      }, t.prototype.umod = function(e) {
        return this.divmod(e, "mod", !0).mod;
      }, t.prototype.divRound = function(e) {
        var o = this.divmod(e);
        if (o.mod.isZero()) return o.div;
        var y = o.div.negative !== 0 ? o.mod.isub(e) : o.mod, H = e.ushrn(1), z = e.andln(1), B = y.cmp(H);
        return B < 0 || z === 1 && B === 0 ? o.div : o.div.negative !== 0 ? o.div.isubn(1) : o.div.iaddn(1);
      }, t.prototype.modrn = function(e) {
        var o = e < 0;
        o && (e = -e), q(e <= 67108863);
        for (var y = (1 << 26) % e, H = 0, z = this.length - 1; z >= 0; z--)
          H = (y * H + (this.words[z] | 0)) % e;
        return o ? -H : H;
      }, t.prototype.modn = function(e) {
        return this.modrn(e);
      }, t.prototype.idivn = function(e) {
        var o = e < 0;
        o && (e = -e), q(e <= 67108863);
        for (var y = 0, H = this.length - 1; H >= 0; H--) {
          var z = (this.words[H] | 0) + y * 67108864;
          this.words[H] = z / e | 0, y = z % e;
        }
        return this._strip(), o ? this.ineg() : this;
      }, t.prototype.divn = function(e) {
        return this.clone().idivn(e);
      }, t.prototype.egcd = function(e) {
        q(e.negative === 0), q(!e.isZero());
        var o = this, y = e.clone();
        o.negative !== 0 ? o = o.umod(e) : o = o.clone();
        for (var H = new t(1), z = new t(0), B = new t(0), w = new t(1), G = 0; o.isEven() && y.isEven(); )
          o.iushrn(1), y.iushrn(1), ++G;
        for (var g = y.clone(), J = o.clone(); !o.isZero(); ) {
          for (var le = 0, ge = 1; !(o.words[0] & ge) && le < 26; ++le, ge <<= 1) ;
          if (le > 0)
            for (o.iushrn(le); le-- > 0; )
              (H.isOdd() || z.isOdd()) && (H.iadd(g), z.isub(J)), H.iushrn(1), z.iushrn(1);
          for (var Se = 0, ye = 1; !(y.words[0] & ye) && Se < 26; ++Se, ye <<= 1) ;
          if (Se > 0)
            for (y.iushrn(Se); Se-- > 0; )
              (B.isOdd() || w.isOdd()) && (B.iadd(g), w.isub(J)), B.iushrn(1), w.iushrn(1);
          o.cmp(y) >= 0 ? (o.isub(y), H.isub(B), z.isub(w)) : (y.isub(o), B.isub(H), w.isub(z));
        }
        return {
          a: B,
          b: w,
          gcd: y.iushln(G)
        };
      }, t.prototype._invmp = function(e) {
        q(e.negative === 0), q(!e.isZero());
        var o = this, y = e.clone();
        o.negative !== 0 ? o = o.umod(e) : o = o.clone();
        for (var H = new t(1), z = new t(0), B = y.clone(); o.cmpn(1) > 0 && y.cmpn(1) > 0; ) {
          for (var w = 0, G = 1; !(o.words[0] & G) && w < 26; ++w, G <<= 1) ;
          if (w > 0)
            for (o.iushrn(w); w-- > 0; )
              H.isOdd() && H.iadd(B), H.iushrn(1);
          for (var g = 0, J = 1; !(y.words[0] & J) && g < 26; ++g, J <<= 1) ;
          if (g > 0)
            for (y.iushrn(g); g-- > 0; )
              z.isOdd() && z.iadd(B), z.iushrn(1);
          o.cmp(y) >= 0 ? (o.isub(y), H.isub(z)) : (y.isub(o), z.isub(H));
        }
        var le;
        return o.cmpn(1) === 0 ? le = H : le = z, le.cmpn(0) < 0 && le.iadd(e), le;
      }, t.prototype.gcd = function(e) {
        if (this.isZero()) return e.abs();
        if (e.isZero()) return this.abs();
        var o = this.clone(), y = e.clone();
        o.negative = 0, y.negative = 0;
        for (var H = 0; o.isEven() && y.isEven(); H++)
          o.iushrn(1), y.iushrn(1);
        do {
          for (; o.isEven(); )
            o.iushrn(1);
          for (; y.isEven(); )
            y.iushrn(1);
          var z = o.cmp(y);
          if (z < 0) {
            var B = o;
            o = y, y = B;
          } else if (z === 0 || y.cmpn(1) === 0)
            break;
          o.isub(y);
        } while (!0);
        return y.iushln(H);
      }, t.prototype.invm = function(e) {
        return this.egcd(e).a.umod(e);
      }, t.prototype.isEven = function() {
        return (this.words[0] & 1) === 0;
      }, t.prototype.isOdd = function() {
        return (this.words[0] & 1) === 1;
      }, t.prototype.andln = function(e) {
        return this.words[0] & e;
      }, t.prototype.bincn = function(e) {
        q(typeof e == "number");
        var o = e % 26, y = (e - o) / 26, H = 1 << o;
        if (this.length <= y)
          return this._expand(y + 1), this.words[y] |= H, this;
        for (var z = H, B = y; z !== 0 && B < this.length; B++) {
          var w = this.words[B] | 0;
          w += z, z = w >>> 26, w &= 67108863, this.words[B] = w;
        }
        return z !== 0 && (this.words[B] = z, this.length++), this;
      }, t.prototype.isZero = function() {
        return this.length === 1 && this.words[0] === 0;
      }, t.prototype.cmpn = function(e) {
        var o = e < 0;
        if (this.negative !== 0 && !o) return -1;
        if (this.negative === 0 && o) return 1;
        this._strip();
        var y;
        if (this.length > 1)
          y = 1;
        else {
          o && (e = -e), q(e <= 67108863, "Number is too big");
          var H = this.words[0] | 0;
          y = H === e ? 0 : H < e ? -1 : 1;
        }
        return this.negative !== 0 ? -y | 0 : y;
      }, t.prototype.cmp = function(e) {
        if (this.negative !== 0 && e.negative === 0) return -1;
        if (this.negative === 0 && e.negative !== 0) return 1;
        var o = this.ucmp(e);
        return this.negative !== 0 ? -o | 0 : o;
      }, t.prototype.ucmp = function(e) {
        if (this.length > e.length) return 1;
        if (this.length < e.length) return -1;
        for (var o = 0, y = this.length - 1; y >= 0; y--) {
          var H = this.words[y] | 0, z = e.words[y] | 0;
          if (H !== z) {
            H < z ? o = -1 : H > z && (o = 1);
            break;
          }
        }
        return o;
      }, t.prototype.gtn = function(e) {
        return this.cmpn(e) === 1;
      }, t.prototype.gt = function(e) {
        return this.cmp(e) === 1;
      }, t.prototype.gten = function(e) {
        return this.cmpn(e) >= 0;
      }, t.prototype.gte = function(e) {
        return this.cmp(e) >= 0;
      }, t.prototype.ltn = function(e) {
        return this.cmpn(e) === -1;
      }, t.prototype.lt = function(e) {
        return this.cmp(e) === -1;
      }, t.prototype.lten = function(e) {
        return this.cmpn(e) <= 0;
      }, t.prototype.lte = function(e) {
        return this.cmp(e) <= 0;
      }, t.prototype.eqn = function(e) {
        return this.cmpn(e) === 0;
      }, t.prototype.eq = function(e) {
        return this.cmp(e) === 0;
      }, t.red = function(e) {
        return new K(e);
      }, t.prototype.toRed = function(e) {
        return q(!this.red, "Already a number in reduction context"), q(this.negative === 0, "red works only with positives"), e.convertTo(this)._forceRed(e);
      }, t.prototype.fromRed = function() {
        return q(this.red, "fromRed works only with numbers in reduction context"), this.red.convertFrom(this);
      }, t.prototype._forceRed = function(e) {
        return this.red = e, this;
      }, t.prototype.forceRed = function(e) {
        return q(!this.red, "Already a number in reduction context"), this._forceRed(e);
      }, t.prototype.redAdd = function(e) {
        return q(this.red, "redAdd works only with red numbers"), this.red.add(this, e);
      }, t.prototype.redIAdd = function(e) {
        return q(this.red, "redIAdd works only with red numbers"), this.red.iadd(this, e);
      }, t.prototype.redSub = function(e) {
        return q(this.red, "redSub works only with red numbers"), this.red.sub(this, e);
      }, t.prototype.redISub = function(e) {
        return q(this.red, "redISub works only with red numbers"), this.red.isub(this, e);
      }, t.prototype.redShl = function(e) {
        return q(this.red, "redShl works only with red numbers"), this.red.shl(this, e);
      }, t.prototype.redMul = function(e) {
        return q(this.red, "redMul works only with red numbers"), this.red._verify2(this, e), this.red.mul(this, e);
      }, t.prototype.redIMul = function(e) {
        return q(this.red, "redMul works only with red numbers"), this.red._verify2(this, e), this.red.imul(this, e);
      }, t.prototype.redSqr = function() {
        return q(this.red, "redSqr works only with red numbers"), this.red._verify1(this), this.red.sqr(this);
      }, t.prototype.redISqr = function() {
        return q(this.red, "redISqr works only with red numbers"), this.red._verify1(this), this.red.isqr(this);
      }, t.prototype.redSqrt = function() {
        return q(this.red, "redSqrt works only with red numbers"), this.red._verify1(this), this.red.sqrt(this);
      }, t.prototype.redInvm = function() {
        return q(this.red, "redInvm works only with red numbers"), this.red._verify1(this), this.red.invm(this);
      }, t.prototype.redNeg = function() {
        return q(this.red, "redNeg works only with red numbers"), this.red._verify1(this), this.red.neg(this);
      }, t.prototype.redPow = function(e) {
        return q(this.red && !e.red, "redPow(normalNum)"), this.red._verify1(this), this.red.pow(this, e);
      };
      var _e = {
        k256: null,
        p224: null,
        p192: null,
        p25519: null
      };
      function qe(e, o) {
        this.name = e, this.p = new t(o, 16), this.n = this.p.bitLength(), this.k = new t(1).iushln(this.n).isub(this.p), this.tmp = this._tmp();
      }
      qe.prototype._tmp = function() {
        var e = new t(null);
        return e.words = new Array(Math.ceil(this.n / 13)), e;
      }, qe.prototype.ireduce = function(e) {
        var o = e, y;
        do
          this.split(o, this.tmp), o = this.imulK(o), o = o.iadd(this.tmp), y = o.bitLength();
        while (y > this.n);
        var H = y < this.n ? -1 : o.ucmp(this.p);
        return H === 0 ? (o.words[0] = 0, o.length = 1) : H > 0 ? o.isub(this.p) : o.strip !== void 0 ? o.strip() : o._strip(), o;
      }, qe.prototype.split = function(e, o) {
        e.iushrn(this.n, 0, o);
      }, qe.prototype.imulK = function(e) {
        return e.imul(this.k);
      };
      function Te() {
        qe.call(
          this,
          "k256",
          "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f"
        );
      }
      X(Te, qe), Te.prototype.split = function(e, o) {
        for (var y = 4194303, H = Math.min(e.length, 9), z = 0; z < H; z++)
          o.words[z] = e.words[z];
        if (o.length = H, e.length <= 9) {
          e.words[0] = 0, e.length = 1;
          return;
        }
        var B = e.words[9];
        for (o.words[o.length++] = B & y, z = 10; z < e.length; z++) {
          var w = e.words[z] | 0;
          e.words[z - 10] = (w & y) << 4 | B >>> 22, B = w;
        }
        B >>>= 22, e.words[z - 10] = B, B === 0 && e.length > 10 ? e.length -= 10 : e.length -= 9;
      }, Te.prototype.imulK = function(e) {
        e.words[e.length] = 0, e.words[e.length + 1] = 0, e.length += 2;
        for (var o = 0, y = 0; y < e.length; y++) {
          var H = e.words[y] | 0;
          o += H * 977, e.words[y] = o & 67108863, o = H * 64 + (o / 67108864 | 0);
        }
        return e.words[e.length - 1] === 0 && (e.length--, e.words[e.length - 1] === 0 && e.length--), e;
      };
      function ce() {
        qe.call(
          this,
          "p224",
          "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001"
        );
      }
      X(ce, qe);
      function pe() {
        qe.call(
          this,
          "p192",
          "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff"
        );
      }
      X(pe, qe);
      function Me() {
        qe.call(
          this,
          "25519",
          "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed"
        );
      }
      X(Me, qe), Me.prototype.imulK = function(e) {
        for (var o = 0, y = 0; y < e.length; y++) {
          var H = (e.words[y] | 0) * 19 + o, z = H & 67108863;
          H >>>= 26, e.words[y] = z, o = H;
        }
        return o !== 0 && (e.words[e.length++] = o), e;
      }, t._prime = function(e) {
        if (_e[e]) return _e[e];
        var o;
        if (e === "k256")
          o = new Te();
        else if (e === "p224")
          o = new ce();
        else if (e === "p192")
          o = new pe();
        else if (e === "p25519")
          o = new Me();
        else
          throw new Error("Unknown prime " + e);
        return _e[e] = o, o;
      };
      function K(e) {
        if (typeof e == "string") {
          var o = t._prime(e);
          this.m = o.p, this.prime = o;
        } else
          q(e.gtn(1), "modulus must be greater than 1"), this.m = e, this.prime = null;
      }
      K.prototype._verify1 = function(e) {
        q(e.negative === 0, "red works only with positives"), q(e.red, "red works only with red numbers");
      }, K.prototype._verify2 = function(e, o) {
        q((e.negative | o.negative) === 0, "red works only with positives"), q(
          e.red && e.red === o.red,
          "red works only with red numbers"
        );
      }, K.prototype.imod = function(e) {
        return this.prime ? this.prime.ireduce(e)._forceRed(this) : (D(e, e.umod(this.m)._forceRed(this)), e);
      }, K.prototype.neg = function(e) {
        return e.isZero() ? e.clone() : this.m.sub(e)._forceRed(this);
      }, K.prototype.add = function(e, o) {
        this._verify2(e, o);
        var y = e.add(o);
        return y.cmp(this.m) >= 0 && y.isub(this.m), y._forceRed(this);
      }, K.prototype.iadd = function(e, o) {
        this._verify2(e, o);
        var y = e.iadd(o);
        return y.cmp(this.m) >= 0 && y.isub(this.m), y;
      }, K.prototype.sub = function(e, o) {
        this._verify2(e, o);
        var y = e.sub(o);
        return y.cmpn(0) < 0 && y.iadd(this.m), y._forceRed(this);
      }, K.prototype.isub = function(e, o) {
        this._verify2(e, o);
        var y = e.isub(o);
        return y.cmpn(0) < 0 && y.iadd(this.m), y;
      }, K.prototype.shl = function(e, o) {
        return this._verify1(e), this.imod(e.ushln(o));
      }, K.prototype.imul = function(e, o) {
        return this._verify2(e, o), this.imod(e.imul(o));
      }, K.prototype.mul = function(e, o) {
        return this._verify2(e, o), this.imod(e.mul(o));
      }, K.prototype.isqr = function(e) {
        return this.imul(e, e.clone());
      }, K.prototype.sqr = function(e) {
        return this.mul(e, e);
      }, K.prototype.sqrt = function(e) {
        if (e.isZero()) return e.clone();
        var o = this.m.andln(3);
        if (q(o % 2 === 1), o === 3) {
          var y = this.m.add(new t(1)).iushrn(2);
          return this.pow(e, y);
        }
        for (var H = this.m.subn(1), z = 0; !H.isZero() && H.andln(1) === 0; )
          z++, H.iushrn(1);
        q(!H.isZero());
        var B = new t(1).toRed(this), w = B.redNeg(), G = this.m.subn(1).iushrn(1), g = this.m.bitLength();
        for (g = new t(2 * g * g).toRed(this); this.pow(g, G).cmp(w) !== 0; )
          g.redIAdd(w);
        for (var J = this.pow(g, H), le = this.pow(e, H.addn(1).iushrn(1)), ge = this.pow(e, H), Se = z; ge.cmp(B) !== 0; ) {
          for (var ye = ge, fe = 0; ye.cmp(B) !== 0; fe++)
            ye = ye.redSqr();
          q(fe < Se);
          var he = this.pow(J, new t(1).iushln(Se - fe - 1));
          le = le.redMul(he), J = he.redSqr(), ge = ge.redMul(J), Se = fe;
        }
        return le;
      }, K.prototype.invm = function(e) {
        var o = e._invmp(this.m);
        return o.negative !== 0 ? (o.negative = 0, this.imod(o).redNeg()) : this.imod(o);
      }, K.prototype.pow = function(e, o) {
        if (o.isZero()) return new t(1).toRed(this);
        if (o.cmpn(1) === 0) return e.clone();
        var y = 4, H = new Array(1 << y);
        H[0] = new t(1).toRed(this), H[1] = e;
        for (var z = 2; z < H.length; z++)
          H[z] = this.mul(H[z - 1], e);
        var B = H[0], w = 0, G = 0, g = o.bitLength() % 26;
        for (g === 0 && (g = 26), z = o.length - 1; z >= 0; z--) {
          for (var J = o.words[z], le = g - 1; le >= 0; le--) {
            var ge = J >> le & 1;
            if (B !== H[0] && (B = this.sqr(B)), ge === 0 && w === 0) {
              G = 0;
              continue;
            }
            w <<= 1, w |= ge, G++, !(G !== y && (z !== 0 || le !== 0)) && (B = this.mul(B, H[w]), G = 0, w = 0);
          }
          g = 26;
        }
        return B;
      }, K.prototype.convertTo = function(e) {
        var o = e.umod(this.m);
        return o === e ? o.clone() : o;
      }, K.prototype.convertFrom = function(e) {
        var o = e.clone();
        return o.red = null, o;
      }, t.mont = function(e) {
        return new ee(e);
      };
      function ee(e) {
        K.call(this, e), this.shift = this.m.bitLength(), this.shift % 26 !== 0 && (this.shift += 26 - this.shift % 26), this.r = new t(1).iushln(this.shift), this.r2 = this.imod(this.r.sqr()), this.rinv = this.r._invmp(this.m), this.minv = this.rinv.mul(this.r).isubn(1).div(this.m), this.minv = this.minv.umod(this.r), this.minv = this.r.sub(this.minv);
      }
      X(ee, K), ee.prototype.convertTo = function(e) {
        return this.imod(e.ushln(this.shift));
      }, ee.prototype.convertFrom = function(e) {
        var o = this.imod(e.mul(this.rinv));
        return o.red = null, o;
      }, ee.prototype.imul = function(e, o) {
        if (e.isZero() || o.isZero())
          return e.words[0] = 0, e.length = 1, e;
        var y = e.imul(o), H = y.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m), z = y.isub(H).iushrn(this.shift), B = z;
        return z.cmp(this.m) >= 0 ? B = z.isub(this.m) : z.cmpn(0) < 0 && (B = z.iadd(this.m)), B._forceRed(this);
      }, ee.prototype.mul = function(e, o) {
        if (e.isZero() || o.isZero()) return new t(0)._forceRed(this);
        var y = e.mul(o), H = y.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m), z = y.isub(H).iushrn(this.shift), B = z;
        return z.cmp(this.m) >= 0 ? B = z.isub(this.m) : z.cmpn(0) < 0 && (B = z.iadd(this.m)), B._forceRed(this);
      }, ee.prototype.invm = function(e) {
        var o = this.imod(e._invmp(this.m).mul(this.r2));
        return o._forceRed(this);
      };
    })(P, commonjsGlobal);
  }(bn)), bn.exports;
}
var asn1$1 = {}, asn1 = {}, api = {}, vmBrowserify = {}, hasRequiredVmBrowserify;
function requireVmBrowserify() {
  return hasRequiredVmBrowserify || (hasRequiredVmBrowserify = 1, function(exports) {
    var indexOf = function(P, c) {
      if (P.indexOf) return P.indexOf(c);
      for (var O = 0; O < P.length; O++)
        if (P[O] === c) return O;
      return -1;
    }, Object_keys = function(P) {
      if (Object.keys) return Object.keys(P);
      var c = [];
      for (var O in P) c.push(O);
      return c;
    }, forEach = function(P, c) {
      if (P.forEach) return P.forEach(c);
      for (var O = 0; O < P.length; O++)
        c(P[O], O, P);
    }, defineProp = function() {
      try {
        return Object.defineProperty({}, "_", {}), function(P, c, O) {
          Object.defineProperty(P, c, {
            writable: !0,
            enumerable: !1,
            configurable: !0,
            value: O
          });
        };
      } catch (P) {
        return function(c, O, q) {
          c[O] = q;
        };
      }
    }(), globals = [
      "Array",
      "Boolean",
      "Date",
      "Error",
      "EvalError",
      "Function",
      "Infinity",
      "JSON",
      "Math",
      "NaN",
      "Number",
      "Object",
      "RangeError",
      "ReferenceError",
      "RegExp",
      "String",
      "SyntaxError",
      "TypeError",
      "URIError",
      "decodeURI",
      "decodeURIComponent",
      "encodeURI",
      "encodeURIComponent",
      "escape",
      "eval",
      "isFinite",
      "isNaN",
      "parseFloat",
      "parseInt",
      "undefined",
      "unescape"
    ];
    function Context() {
    }
    Context.prototype = {};
    var Script = exports.Script = function(P) {
      if (!(this instanceof Script)) return new Script(P);
      this.code = P;
    };
    Script.prototype.runInContext = function(P) {
      if (!(P instanceof Context))
        throw new TypeError("needs a 'context' argument.");
      var c = document.createElement("iframe");
      c.style || (c.style = {}), c.style.display = "none", document.body.appendChild(c);
      var O = c.contentWindow, q = O.eval, X = O.execScript;
      !q && X && (X.call(O, "null"), q = O.eval), forEach(Object_keys(P), function(l) {
        O[l] = P[l];
      }), forEach(globals, function(l) {
        P[l] && (O[l] = P[l]);
      });
      var t = Object_keys(O), F = q.call(O, this.code);
      return forEach(Object_keys(O), function(l) {
        (l in P || indexOf(t, l) === -1) && (P[l] = O[l]);
      }), forEach(globals, function(l) {
        l in P || defineProp(P, l, O[l]);
      }), document.body.removeChild(c), F;
    }, Script.prototype.runInThisContext = function() {
      return eval(this.code);
    }, Script.prototype.runInNewContext = function(P) {
      var c = Script.createContext(P), O = this.runInContext(c);
      return P && forEach(Object_keys(c), function(q) {
        P[q] = c[q];
      }), O;
    }, forEach(Object_keys(Script.prototype), function(P) {
      exports[P] = Script[P] = function(c) {
        var O = Script(c);
        return O[P].apply(O, [].slice.call(arguments, 1));
      };
    }), exports.isContext = function(P) {
      return P instanceof Context;
    }, exports.createScript = function(P) {
      return exports.Script(P);
    }, exports.createContext = Script.createContext = function(P) {
      var c = new Context();
      return typeof P == "object" && forEach(Object_keys(P), function(O) {
        c[O] = P[O];
      }), c;
    };
  }(vmBrowserify)), vmBrowserify;
}
var hasRequiredApi;
function requireApi() {
  return hasRequiredApi || (hasRequiredApi = 1, function(P) {
    var c = requireAsn1$1(), O = requireInherits_browser(), q = P;
    q.define = function(t, F) {
      return new X(t, F);
    };
    function X(t, F) {
      this.name = t, this.body = F, this.decoders = {}, this.encoders = {};
    }
    X.prototype._createNamed = function(t) {
      var F;
      try {
        F = requireVmBrowserify().runInThisContext(
          "(function " + this.name + `(entity) {
  this._initNamed(entity);
})`
        );
      } catch (l) {
        F = function(U) {
          this._initNamed(U);
        };
      }
      return O(F, t), F.prototype._initNamed = function(l) {
        t.call(this, l);
      }, new F(this);
    }, X.prototype._getDecoder = function(t) {
      return t = t || "der", this.decoders.hasOwnProperty(t) || (this.decoders[t] = this._createNamed(c.decoders[t])), this.decoders[t];
    }, X.prototype.decode = function(t, F, l) {
      return this._getDecoder(F).decode(t, l);
    }, X.prototype._getEncoder = function(t) {
      return t = t || "der", this.encoders.hasOwnProperty(t) || (this.encoders[t] = this._createNamed(c.encoders[t])), this.encoders[t];
    }, X.prototype.encode = function(t, F, l) {
      return this._getEncoder(F).encode(t, l);
    };
  }(api)), api;
}
var base = {}, reporter = {}, hasRequiredReporter;
function requireReporter() {
  if (hasRequiredReporter) return reporter;
  hasRequiredReporter = 1;
  var P = requireInherits_browser();
  function c(q) {
    this._reporterState = {
      obj: null,
      path: [],
      options: q || {},
      errors: []
    };
  }
  reporter.Reporter = c, c.prototype.isError = function(q) {
    return q instanceof O;
  }, c.prototype.save = function() {
    var q = this._reporterState;
    return { obj: q.obj, pathLen: q.path.length };
  }, c.prototype.restore = function(q) {
    var X = this._reporterState;
    X.obj = q.obj, X.path = X.path.slice(0, q.pathLen);
  }, c.prototype.enterKey = function(q) {
    return this._reporterState.path.push(q);
  }, c.prototype.exitKey = function(q) {
    var X = this._reporterState;
    X.path = X.path.slice(0, q - 1);
  }, c.prototype.leaveKey = function(q, X, t) {
    var F = this._reporterState;
    this.exitKey(q), F.obj !== null && (F.obj[X] = t);
  }, c.prototype.path = function() {
    return this._reporterState.path.join("/");
  }, c.prototype.enterObject = function() {
    var q = this._reporterState, X = q.obj;
    return q.obj = {}, X;
  }, c.prototype.leaveObject = function(q) {
    var X = this._reporterState, t = X.obj;
    return X.obj = q, t;
  }, c.prototype.error = function(q) {
    var X, t = this._reporterState, F = q instanceof O;
    if (F ? X = q : X = new O(t.path.map(function(l) {
      return "[" + JSON.stringify(l) + "]";
    }).join(""), q.message || q, q.stack), !t.options.partial)
      throw X;
    return F || t.errors.push(X), X;
  }, c.prototype.wrapResult = function(q) {
    var X = this._reporterState;
    return X.options.partial ? {
      result: this.isError(q) ? null : q,
      errors: X.errors
    } : q;
  };
  function O(q, X) {
    this.path = q, this.rethrow(X);
  }
  return P(O, Error), O.prototype.rethrow = function(q) {
    if (this.message = q + " at: " + (this.path || "(shallow)"), Error.captureStackTrace && Error.captureStackTrace(this, O), !this.stack)
      try {
        throw new Error(this.message);
      } catch (X) {
        this.stack = X.stack;
      }
    return this;
  }, reporter;
}
var buffer = {}, hasRequiredBuffer;
function requireBuffer() {
  if (hasRequiredBuffer) return buffer;
  hasRequiredBuffer = 1;
  var P = requireInherits_browser(), c = requireBase().Reporter, O = requireBuffer$1().Buffer;
  function q(t, F) {
    if (c.call(this, F), !O.isBuffer(t)) {
      this.error("Input not Buffer");
      return;
    }
    this.base = t, this.offset = 0, this.length = t.length;
  }
  P(q, c), buffer.DecoderBuffer = q, q.prototype.save = function() {
    return { offset: this.offset, reporter: c.prototype.save.call(this) };
  }, q.prototype.restore = function(t) {
    var F = new q(this.base);
    return F.offset = t.offset, F.length = this.offset, this.offset = t.offset, c.prototype.restore.call(this, t.reporter), F;
  }, q.prototype.isEmpty = function() {
    return this.offset === this.length;
  }, q.prototype.readUInt8 = function(t) {
    return this.offset + 1 <= this.length ? this.base.readUInt8(this.offset++, !0) : this.error(t || "DecoderBuffer overrun");
  }, q.prototype.skip = function(t, F) {
    if (!(this.offset + t <= this.length))
      return this.error(F || "DecoderBuffer overrun");
    var l = new q(this.base);
    return l._reporterState = this._reporterState, l.offset = this.offset, l.length = this.offset + t, this.offset += t, l;
  }, q.prototype.raw = function(t) {
    return this.base.slice(t ? t.offset : this.offset, this.length);
  };
  function X(t, F) {
    if (Array.isArray(t))
      this.length = 0, this.value = t.map(function(l) {
        return l instanceof X || (l = new X(l, F)), this.length += l.length, l;
      }, this);
    else if (typeof t == "number") {
      if (!(0 <= t && t <= 255))
        return F.error("non-byte EncoderBuffer value");
      this.value = t, this.length = 1;
    } else if (typeof t == "string")
      this.value = t, this.length = O.byteLength(t);
    else if (O.isBuffer(t))
      this.value = t, this.length = t.length;
    else
      return F.error("Unsupported type: " + typeof t);
  }
  return buffer.EncoderBuffer = X, X.prototype.join = function(t, F) {
    return t || (t = new O(this.length)), F || (F = 0), this.length === 0 || (Array.isArray(this.value) ? this.value.forEach(function(l) {
      l.join(t, F), F += l.length;
    }) : (typeof this.value == "number" ? t[F] = this.value : typeof this.value == "string" ? t.write(this.value, F) : O.isBuffer(this.value) && this.value.copy(t, F), F += this.length)), t;
  }, buffer;
}
var node, hasRequiredNode;
function requireNode() {
  if (hasRequiredNode) return node;
  hasRequiredNode = 1;
  var P = requireBase().Reporter, c = requireBase().EncoderBuffer, O = requireBase().DecoderBuffer, q = requireMinimalisticAssert(), X = [
    "seq",
    "seqof",
    "set",
    "setof",
    "objid",
    "bool",
    "gentime",
    "utctime",
    "null_",
    "enum",
    "int",
    "objDesc",
    "bitstr",
    "bmpstr",
    "charstr",
    "genstr",
    "graphstr",
    "ia5str",
    "iso646str",
    "numstr",
    "octstr",
    "printstr",
    "t61str",
    "unistr",
    "utf8str",
    "videostr"
  ], t = [
    "key",
    "obj",
    "use",
    "optional",
    "explicit",
    "implicit",
    "def",
    "choice",
    "any",
    "contains"
  ].concat(X), F = [
    "_peekTag",
    "_decodeTag",
    "_use",
    "_decodeStr",
    "_decodeObjid",
    "_decodeTime",
    "_decodeNull",
    "_decodeInt",
    "_decodeBool",
    "_decodeList",
    "_encodeComposite",
    "_encodeStr",
    "_encodeObjid",
    "_encodeTime",
    "_encodeNull",
    "_encodeInt",
    "_encodeBool"
  ];
  function l($, D) {
    var Q = {};
    this._baseState = Q, Q.enc = $, Q.parent = D || null, Q.children = null, Q.tag = null, Q.args = null, Q.reverseArgs = null, Q.choice = null, Q.optional = !1, Q.any = !1, Q.obj = !1, Q.use = null, Q.useDecoder = null, Q.key = null, Q.default = null, Q.explicit = null, Q.implicit = null, Q.contains = null, Q.parent || (Q.children = [], this._wrap());
  }
  node = l;
  var U = [
    "enc",
    "parent",
    "children",
    "tag",
    "args",
    "reverseArgs",
    "choice",
    "optional",
    "any",
    "obj",
    "use",
    "alteredUse",
    "key",
    "default",
    "explicit",
    "implicit",
    "contains"
  ];
  return l.prototype.clone = function() {
    var $ = this._baseState, D = {};
    U.forEach(function(V) {
      D[V] = $[V];
    });
    var Q = new this.constructor(D.parent);
    return Q._baseState = D, Q;
  }, l.prototype._wrap = function() {
    var $ = this._baseState;
    t.forEach(function(D) {
      this[D] = function() {
        var Q = new this.constructor(this);
        return $.children.push(Q), Q[D].apply(Q, arguments);
      };
    }, this);
  }, l.prototype._init = function($) {
    var D = this._baseState;
    q(D.parent === null), $.call(this), D.children = D.children.filter(function(Q) {
      return Q._baseState.parent === this;
    }, this), q.equal(D.children.length, 1, "Root node can have only one child");
  }, l.prototype._useArgs = function($) {
    var D = this._baseState, Q = $.filter(function(V) {
      return V instanceof this.constructor;
    }, this);
    $ = $.filter(function(V) {
      return !(V instanceof this.constructor);
    }, this), Q.length !== 0 && (q(D.children === null), D.children = Q, Q.forEach(function(V) {
      V._baseState.parent = this;
    }, this)), $.length !== 0 && (q(D.args === null), D.args = $, D.reverseArgs = $.map(function(V) {
      if (typeof V != "object" || V.constructor !== Object)
        return V;
      var te = {};
      return Object.keys(V).forEach(function(ie) {
        ie == (ie | 0) && (ie |= 0);
        var ne = V[ie];
        te[ne] = ie;
      }), te;
    }));
  }, F.forEach(function($) {
    l.prototype[$] = function() {
      var D = this._baseState;
      throw new Error($ + " not implemented for encoding: " + D.enc);
    };
  }), X.forEach(function($) {
    l.prototype[$] = function() {
      var D = this._baseState, Q = Array.prototype.slice.call(arguments);
      return q(D.tag === null), D.tag = $, this._useArgs(Q), this;
    };
  }), l.prototype.use = function($) {
    q($);
    var D = this._baseState;
    return q(D.use === null), D.use = $, this;
  }, l.prototype.optional = function() {
    var $ = this._baseState;
    return $.optional = !0, this;
  }, l.prototype.def = function($) {
    var D = this._baseState;
    return q(D.default === null), D.default = $, D.optional = !0, this;
  }, l.prototype.explicit = function($) {
    var D = this._baseState;
    return q(D.explicit === null && D.implicit === null), D.explicit = $, this;
  }, l.prototype.implicit = function($) {
    var D = this._baseState;
    return q(D.explicit === null && D.implicit === null), D.implicit = $, this;
  }, l.prototype.obj = function() {
    var $ = this._baseState, D = Array.prototype.slice.call(arguments);
    return $.obj = !0, D.length !== 0 && this._useArgs(D), this;
  }, l.prototype.key = function($) {
    var D = this._baseState;
    return q(D.key === null), D.key = $, this;
  }, l.prototype.any = function() {
    var $ = this._baseState;
    return $.any = !0, this;
  }, l.prototype.choice = function($) {
    var D = this._baseState;
    return q(D.choice === null), D.choice = $, this._useArgs(Object.keys($).map(function(Q) {
      return $[Q];
    })), this;
  }, l.prototype.contains = function($) {
    var D = this._baseState;
    return q(D.use === null), D.contains = $, this;
  }, l.prototype._decode = function($, D) {
    var Q = this._baseState;
    if (Q.parent === null)
      return $.wrapResult(Q.children[0]._decode($, D));
    var V = Q.default, te = !0, ie = null;
    if (Q.key !== null && (ie = $.enterKey(Q.key)), Q.optional) {
      var ne = null;
      if (Q.explicit !== null ? ne = Q.explicit : Q.implicit !== null ? ne = Q.implicit : Q.tag !== null && (ne = Q.tag), ne === null && !Q.any) {
        var se = $.save();
        try {
          Q.choice === null ? this._decodeGeneric(Q.tag, $, D) : this._decodeChoice($, D), te = !0;
        } catch (qe) {
          te = !1;
        }
        $.restore(se);
      } else if (te = this._peekTag($, ne, Q.any), $.isError(te))
        return te;
    }
    var ae;
    if (Q.obj && te && (ae = $.enterObject()), te) {
      if (Q.explicit !== null) {
        var oe = this._decodeTag($, Q.explicit);
        if ($.isError(oe))
          return oe;
        $ = oe;
      }
      var be = $.offset;
      if (Q.use === null && Q.choice === null) {
        if (Q.any)
          var se = $.save();
        var de = this._decodeTag(
          $,
          Q.implicit !== null ? Q.implicit : Q.tag,
          Q.any
        );
        if ($.isError(de))
          return de;
        Q.any ? V = $.raw(se) : $ = de;
      }
      if (D && D.track && Q.tag !== null && D.track($.path(), be, $.length, "tagged"), D && D.track && Q.tag !== null && D.track($.path(), $.offset, $.length, "content"), Q.any ? V = V : Q.choice === null ? V = this._decodeGeneric(Q.tag, $, D) : V = this._decodeChoice($, D), $.isError(V))
        return V;
      if (!Q.any && Q.choice === null && Q.children !== null && Q.children.forEach(function(qe) {
        qe._decode($, D);
      }), Q.contains && (Q.tag === "octstr" || Q.tag === "bitstr")) {
        var _e = new O(V);
        V = this._getUse(Q.contains, $._reporterState.obj)._decode(_e, D);
      }
    }
    return Q.obj && te && (V = $.leaveObject(ae)), Q.key !== null && (V !== null || te === !0) ? $.leaveKey(ie, Q.key, V) : ie !== null && $.exitKey(ie), V;
  }, l.prototype._decodeGeneric = function($, D, Q) {
    var V = this._baseState;
    return $ === "seq" || $ === "set" ? null : $ === "seqof" || $ === "setof" ? this._decodeList(D, $, V.args[0], Q) : /str$/.test($) ? this._decodeStr(D, $, Q) : $ === "objid" && V.args ? this._decodeObjid(D, V.args[0], V.args[1], Q) : $ === "objid" ? this._decodeObjid(D, null, null, Q) : $ === "gentime" || $ === "utctime" ? this._decodeTime(D, $, Q) : $ === "null_" ? this._decodeNull(D, Q) : $ === "bool" ? this._decodeBool(D, Q) : $ === "objDesc" ? this._decodeStr(D, $, Q) : $ === "int" || $ === "enum" ? this._decodeInt(D, V.args && V.args[0], Q) : V.use !== null ? this._getUse(V.use, D._reporterState.obj)._decode(D, Q) : D.error("unknown tag: " + $);
  }, l.prototype._getUse = function($, D) {
    var Q = this._baseState;
    return Q.useDecoder = this._use($, D), q(Q.useDecoder._baseState.parent === null), Q.useDecoder = Q.useDecoder._baseState.children[0], Q.implicit !== Q.useDecoder._baseState.implicit && (Q.useDecoder = Q.useDecoder.clone(), Q.useDecoder._baseState.implicit = Q.implicit), Q.useDecoder;
  }, l.prototype._decodeChoice = function($, D) {
    var Q = this._baseState, V = null, te = !1;
    return Object.keys(Q.choice).some(function(ie) {
      var ne = $.save(), se = Q.choice[ie];
      try {
        var ae = se._decode($, D);
        if ($.isError(ae))
          return !1;
        V = { type: ie, value: ae }, te = !0;
      } catch (oe) {
        return $.restore(ne), !1;
      }
      return !0;
    }, this), te ? V : $.error("Choice not matched");
  }, l.prototype._createEncoderBuffer = function($) {
    return new c($, this.reporter);
  }, l.prototype._encode = function($, D, Q) {
    var V = this._baseState;
    if (!(V.default !== null && V.default === $)) {
      var te = this._encodeValue($, D, Q);
      if (te !== void 0 && !this._skipDefault(te, D, Q))
        return te;
    }
  }, l.prototype._encodeValue = function($, D, Q) {
    var V = this._baseState;
    if (V.parent === null)
      return V.children[0]._encode($, D || new P());
    var se = null;
    if (this.reporter = D, V.optional && $ === void 0)
      if (V.default !== null)
        $ = V.default;
      else
        return;
    var te = null, ie = !1;
    if (V.any)
      se = this._createEncoderBuffer($);
    else if (V.choice)
      se = this._encodeChoice($, D);
    else if (V.contains)
      te = this._getUse(V.contains, Q)._encode($, D), ie = !0;
    else if (V.children)
      te = V.children.map(function(be) {
        if (be._baseState.tag === "null_")
          return be._encode(null, D, $);
        if (be._baseState.key === null)
          return D.error("Child should have a key");
        var de = D.enterKey(be._baseState.key);
        if (typeof $ != "object")
          return D.error("Child expected, but input is not object");
        var _e = be._encode($[be._baseState.key], D, $);
        return D.leaveKey(de), _e;
      }, this).filter(function(be) {
        return be;
      }), te = this._createEncoderBuffer(te);
    else if (V.tag === "seqof" || V.tag === "setof") {
      if (!(V.args && V.args.length === 1))
        return D.error("Too many args for : " + V.tag);
      if (!Array.isArray($))
        return D.error("seqof/setof, but data is not Array");
      var ne = this.clone();
      ne._baseState.implicit = null, te = this._createEncoderBuffer($.map(function(be) {
        var de = this._baseState;
        return this._getUse(de.args[0], $)._encode(be, D);
      }, ne));
    } else V.use !== null ? se = this._getUse(V.use, Q)._encode($, D) : (te = this._encodePrimitive(V.tag, $), ie = !0);
    var se;
    if (!V.any && V.choice === null) {
      var ae = V.implicit !== null ? V.implicit : V.tag, oe = V.implicit === null ? "universal" : "context";
      ae === null ? V.use === null && D.error("Tag could be omitted only for .use()") : V.use === null && (se = this._encodeComposite(ae, ie, oe, te));
    }
    return V.explicit !== null && (se = this._encodeComposite(V.explicit, !1, "context", se)), se;
  }, l.prototype._encodeChoice = function($, D) {
    var Q = this._baseState, V = Q.choice[$.type];
    return V || q(
      !1,
      $.type + " not found in " + JSON.stringify(Object.keys(Q.choice))
    ), V._encode($.value, D);
  }, l.prototype._encodePrimitive = function($, D) {
    var Q = this._baseState;
    if (/str$/.test($))
      return this._encodeStr(D, $);
    if ($ === "objid" && Q.args)
      return this._encodeObjid(D, Q.reverseArgs[0], Q.args[1]);
    if ($ === "objid")
      return this._encodeObjid(D, null, null);
    if ($ === "gentime" || $ === "utctime")
      return this._encodeTime(D, $);
    if ($ === "null_")
      return this._encodeNull();
    if ($ === "int" || $ === "enum")
      return this._encodeInt(D, Q.args && Q.reverseArgs[0]);
    if ($ === "bool")
      return this._encodeBool(D);
    if ($ === "objDesc")
      return this._encodeStr(D, $);
    throw new Error("Unsupported tag: " + $);
  }, l.prototype._isNumstr = function($) {
    return /^[0-9 ]*$/.test($);
  }, l.prototype._isPrintstr = function($) {
    return /^[A-Za-z0-9 '\(\)\+,\-\.\/:=\?]*$/.test($);
  }, node;
}
var hasRequiredBase;
function requireBase() {
  return hasRequiredBase || (hasRequiredBase = 1, function(P) {
    var c = P;
    c.Reporter = requireReporter().Reporter, c.DecoderBuffer = requireBuffer().DecoderBuffer, c.EncoderBuffer = requireBuffer().EncoderBuffer, c.Node = requireNode();
  }(base)), base;
}
var constants = {}, der = {}, hasRequiredDer$2;
function requireDer$2() {
  return hasRequiredDer$2 || (hasRequiredDer$2 = 1, function(P) {
    var c = requireConstants();
    P.tagClass = {
      0: "universal",
      1: "application",
      2: "context",
      3: "private"
    }, P.tagClassByName = c._reverse(P.tagClass), P.tag = {
      0: "end",
      1: "bool",
      2: "int",
      3: "bitstr",
      4: "octstr",
      5: "null_",
      6: "objid",
      7: "objDesc",
      8: "external",
      9: "real",
      10: "enum",
      11: "embed",
      12: "utf8str",
      13: "relativeOid",
      16: "seq",
      17: "set",
      18: "numstr",
      19: "printstr",
      20: "t61str",
      21: "videostr",
      22: "ia5str",
      23: "utctime",
      24: "gentime",
      25: "graphstr",
      26: "iso646str",
      27: "genstr",
      28: "unistr",
      29: "charstr",
      30: "bmpstr"
    }, P.tagByName = c._reverse(P.tag);
  }(der)), der;
}
var hasRequiredConstants;
function requireConstants() {
  return hasRequiredConstants || (hasRequiredConstants = 1, function(P) {
    var c = P;
    c._reverse = function(O) {
      var q = {};
      return Object.keys(O).forEach(function(X) {
        (X | 0) == X && (X = X | 0);
        var t = O[X];
        q[t] = X;
      }), q;
    }, c.der = requireDer$2();
  }(constants)), constants;
}
var decoders = {}, der_1$1, hasRequiredDer$1;
function requireDer$1() {
  if (hasRequiredDer$1) return der_1$1;
  hasRequiredDer$1 = 1;
  var P = requireInherits_browser(), c = requireAsn1$1(), O = c.base, q = c.bignum, X = c.constants.der;
  function t($) {
    this.enc = "der", this.name = $.name, this.entity = $, this.tree = new F(), this.tree._init($.body);
  }
  der_1$1 = t, t.prototype.decode = function($, D) {
    return $ instanceof O.DecoderBuffer || ($ = new O.DecoderBuffer($, D)), this.tree._decode($, D);
  };
  function F($) {
    O.Node.call(this, "der", $);
  }
  P(F, O.Node), F.prototype._peekTag = function($, D, Q) {
    if ($.isEmpty())
      return !1;
    var V = $.save(), te = l($, 'Failed to peek tag: "' + D + '"');
    return $.isError(te) ? te : ($.restore(V), te.tag === D || te.tagStr === D || te.tagStr + "of" === D || Q);
  }, F.prototype._decodeTag = function($, D, Q) {
    var V = l(
      $,
      'Failed to decode tag of "' + D + '"'
    );
    if ($.isError(V))
      return V;
    var te = U(
      $,
      V.primitive,
      'Failed to get length of "' + D + '"'
    );
    if ($.isError(te))
      return te;
    if (!Q && V.tag !== D && V.tagStr !== D && V.tagStr + "of" !== D)
      return $.error('Failed to match tag: "' + D + '"');
    if (V.primitive || te !== null)
      return $.skip(te, 'Failed to match body of: "' + D + '"');
    var ie = $.save(), ne = this._skipUntilEnd(
      $,
      'Failed to skip indefinite length body: "' + this.tag + '"'
    );
    return $.isError(ne) ? ne : (te = $.offset - ie.offset, $.restore(ie), $.skip(te, 'Failed to match body of: "' + D + '"'));
  }, F.prototype._skipUntilEnd = function($, D) {
    for (; ; ) {
      var Q = l($, D);
      if ($.isError(Q))
        return Q;
      var V = U($, Q.primitive, D);
      if ($.isError(V))
        return V;
      var te;
      if (Q.primitive || V !== null ? te = $.skip(V) : te = this._skipUntilEnd($, D), $.isError(te))
        return te;
      if (Q.tagStr === "end")
        break;
    }
  }, F.prototype._decodeList = function($, D, Q, V) {
    for (var te = []; !$.isEmpty(); ) {
      var ie = this._peekTag($, "end");
      if ($.isError(ie))
        return ie;
      var ne = Q.decode($, "der", V);
      if ($.isError(ne) && ie)
        break;
      te.push(ne);
    }
    return te;
  }, F.prototype._decodeStr = function($, D) {
    if (D === "bitstr") {
      var Q = $.readUInt8();
      return $.isError(Q) ? Q : { unused: Q, data: $.raw() };
    } else if (D === "bmpstr") {
      var V = $.raw();
      if (V.length % 2 === 1)
        return $.error("Decoding of string type: bmpstr length mismatch");
      for (var te = "", ie = 0; ie < V.length / 2; ie++)
        te += String.fromCharCode(V.readUInt16BE(ie * 2));
      return te;
    } else if (D === "numstr") {
      var ne = $.raw().toString("ascii");
      return this._isNumstr(ne) ? ne : $.error("Decoding of string type: numstr unsupported characters");
    } else {
      if (D === "octstr" || D === "objDesc")
        return $.raw();
      if (D === "printstr") {
        var se = $.raw().toString("ascii");
        return this._isPrintstr(se) ? se : $.error("Decoding of string type: printstr unsupported characters");
      } else return /str$/.test(D) ? $.raw().toString() : $.error("Decoding of string type: " + D + " unsupported");
    }
  }, F.prototype._decodeObjid = function($, D, Q) {
    for (var V, te = [], ie = 0; !$.isEmpty(); ) {
      var ne = $.readUInt8();
      ie <<= 7, ie |= ne & 127, ne & 128 || (te.push(ie), ie = 0);
    }
    ne & 128 && te.push(ie);
    var se = te[0] / 40 | 0, ae = te[0] % 40;
    if (Q ? V = te : V = [se, ae].concat(te.slice(1)), D) {
      var oe = D[V.join(" ")];
      oe === void 0 && (oe = D[V.join(".")]), oe !== void 0 && (V = oe);
    }
    return V;
  }, F.prototype._decodeTime = function($, D) {
    var Q = $.raw().toString();
    if (D === "gentime")
      var V = Q.slice(0, 4) | 0, te = Q.slice(4, 6) | 0, ie = Q.slice(6, 8) | 0, ne = Q.slice(8, 10) | 0, se = Q.slice(10, 12) | 0, ae = Q.slice(12, 14) | 0;
    else if (D === "utctime") {
      var V = Q.slice(0, 2) | 0, te = Q.slice(2, 4) | 0, ie = Q.slice(4, 6) | 0, ne = Q.slice(6, 8) | 0, se = Q.slice(8, 10) | 0, ae = Q.slice(10, 12) | 0;
      V < 70 ? V = 2e3 + V : V = 1900 + V;
    } else
      return $.error("Decoding " + D + " time is not supported yet");
    return Date.UTC(V, te - 1, ie, ne, se, ae, 0);
  }, F.prototype._decodeNull = function($) {
    return null;
  }, F.prototype._decodeBool = function($) {
    var D = $.readUInt8();
    return $.isError(D) ? D : D !== 0;
  }, F.prototype._decodeInt = function($, D) {
    var Q = $.raw(), V = new q(Q);
    return D && (V = D[V.toString(10)] || V), V;
  }, F.prototype._use = function($, D) {
    return typeof $ == "function" && ($ = $(D)), $._getDecoder("der").tree;
  };
  function l($, D) {
    var Q = $.readUInt8(D);
    if ($.isError(Q))
      return Q;
    var V = X.tagClass[Q >> 6], te = (Q & 32) === 0;
    if ((Q & 31) === 31) {
      var ie = Q;
      for (Q = 0; (ie & 128) === 128; ) {
        if (ie = $.readUInt8(D), $.isError(ie))
          return ie;
        Q <<= 7, Q |= ie & 127;
      }
    } else
      Q &= 31;
    var ne = X.tag[Q];
    return {
      cls: V,
      primitive: te,
      tag: Q,
      tagStr: ne
    };
  }
  function U($, D, Q) {
    var V = $.readUInt8(Q);
    if ($.isError(V))
      return V;
    if (!D && V === 128)
      return null;
    if (!(V & 128))
      return V;
    var te = V & 127;
    if (te > 4)
      return $.error("length octect is too long");
    V = 0;
    for (var ie = 0; ie < te; ie++) {
      V <<= 8;
      var ne = $.readUInt8(Q);
      if ($.isError(ne))
        return ne;
      V |= ne;
    }
    return V;
  }
  return der_1$1;
}
var pem$1, hasRequiredPem$1;
function requirePem$1() {
  if (hasRequiredPem$1) return pem$1;
  hasRequiredPem$1 = 1;
  var P = requireInherits_browser(), c = requireBuffer$1().Buffer, O = requireDer$1();
  function q(X) {
    O.call(this, X), this.enc = "pem";
  }
  return P(q, O), pem$1 = q, q.prototype.decode = function(X, t) {
    for (var F = X.toString().split(/[\r\n]+/g), l = t.label.toUpperCase(), U = /^-----(BEGIN|END) ([^-]+)-----$/, $ = -1, D = -1, Q = 0; Q < F.length; Q++) {
      var V = F[Q].match(U);
      if (V !== null && V[2] === l)
        if ($ === -1) {
          if (V[1] !== "BEGIN")
            break;
          $ = Q;
        } else {
          if (V[1] !== "END")
            break;
          D = Q;
          break;
        }
    }
    if ($ === -1 || D === -1)
      throw new Error("PEM section not found for: " + l);
    var te = F.slice($ + 1, D).join("");
    te.replace(/[^a-z0-9\+\/=]+/gi, "");
    var ie = new c(te, "base64");
    return O.prototype.decode.call(this, ie, t);
  }, pem$1;
}
var hasRequiredDecoders;
function requireDecoders() {
  return hasRequiredDecoders || (hasRequiredDecoders = 1, function(P) {
    var c = P;
    c.der = requireDer$1(), c.pem = requirePem$1();
  }(decoders)), decoders;
}
var encoders = {}, der_1, hasRequiredDer;
function requireDer() {
  if (hasRequiredDer) return der_1;
  hasRequiredDer = 1;
  var P = requireInherits_browser(), c = requireBuffer$1().Buffer, O = requireAsn1$1(), q = O.base, X = O.constants.der;
  function t($) {
    this.enc = "der", this.name = $.name, this.entity = $, this.tree = new F(), this.tree._init($.body);
  }
  der_1 = t, t.prototype.encode = function($, D) {
    return this.tree._encode($, D).join();
  };
  function F($) {
    q.Node.call(this, "der", $);
  }
  P(F, q.Node), F.prototype._encodeComposite = function($, D, Q, V) {
    var te = U($, D, Q, this.reporter);
    if (V.length < 128) {
      var se = new c(2);
      return se[0] = te, se[1] = V.length, this._createEncoderBuffer([se, V]);
    }
    for (var ie = 1, ne = V.length; ne >= 256; ne >>= 8)
      ie++;
    var se = new c(2 + ie);
    se[0] = te, se[1] = 128 | ie;
    for (var ne = 1 + ie, ae = V.length; ae > 0; ne--, ae >>= 8)
      se[ne] = ae & 255;
    return this._createEncoderBuffer([se, V]);
  }, F.prototype._encodeStr = function($, D) {
    if (D === "bitstr")
      return this._createEncoderBuffer([$.unused | 0, $.data]);
    if (D === "bmpstr") {
      for (var Q = new c($.length * 2), V = 0; V < $.length; V++)
        Q.writeUInt16BE($.charCodeAt(V), V * 2);
      return this._createEncoderBuffer(Q);
    } else return D === "numstr" ? this._isNumstr($) ? this._createEncoderBuffer($) : this.reporter.error("Encoding of string type: numstr supports only digits and space") : D === "printstr" ? this._isPrintstr($) ? this._createEncoderBuffer($) : this.reporter.error("Encoding of string type: printstr supports only latin upper and lower case letters, digits, space, apostrophe, left and rigth parenthesis, plus sign, comma, hyphen, dot, slash, colon, equal sign, question mark") : /str$/.test(D) ? this._createEncoderBuffer($) : D === "objDesc" ? this._createEncoderBuffer($) : this.reporter.error("Encoding of string type: " + D + " unsupported");
  }, F.prototype._encodeObjid = function($, D, Q) {
    if (typeof $ == "string") {
      if (!D)
        return this.reporter.error("string objid given, but no values map found");
      if (!D.hasOwnProperty($))
        return this.reporter.error("objid not found in values map");
      $ = D[$].split(/[\s\.]+/g);
      for (var V = 0; V < $.length; V++)
        $[V] |= 0;
    } else if (Array.isArray($)) {
      $ = $.slice();
      for (var V = 0; V < $.length; V++)
        $[V] |= 0;
    }
    if (!Array.isArray($))
      return this.reporter.error("objid() should be either array or string, got: " + JSON.stringify($));
    if (!Q) {
      if ($[1] >= 40)
        return this.reporter.error("Second objid identifier OOB");
      $.splice(0, 2, $[0] * 40 + $[1]);
    }
    for (var te = 0, V = 0; V < $.length; V++) {
      var ie = $[V];
      for (te++; ie >= 128; ie >>= 7)
        te++;
    }
    for (var ne = new c(te), se = ne.length - 1, V = $.length - 1; V >= 0; V--) {
      var ie = $[V];
      for (ne[se--] = ie & 127; (ie >>= 7) > 0; )
        ne[se--] = 128 | ie & 127;
    }
    return this._createEncoderBuffer(ne);
  };
  function l($) {
    return $ < 10 ? "0" + $ : $;
  }
  F.prototype._encodeTime = function($, D) {
    var Q, V = new Date($);
    return D === "gentime" ? Q = [
      l(V.getFullYear()),
      l(V.getUTCMonth() + 1),
      l(V.getUTCDate()),
      l(V.getUTCHours()),
      l(V.getUTCMinutes()),
      l(V.getUTCSeconds()),
      "Z"
    ].join("") : D === "utctime" ? Q = [
      l(V.getFullYear() % 100),
      l(V.getUTCMonth() + 1),
      l(V.getUTCDate()),
      l(V.getUTCHours()),
      l(V.getUTCMinutes()),
      l(V.getUTCSeconds()),
      "Z"
    ].join("") : this.reporter.error("Encoding " + D + " time is not supported yet"), this._encodeStr(Q, "octstr");
  }, F.prototype._encodeNull = function() {
    return this._createEncoderBuffer("");
  }, F.prototype._encodeInt = function($, D) {
    if (typeof $ == "string") {
      if (!D)
        return this.reporter.error("String int or enum given, but no values map");
      if (!D.hasOwnProperty($))
        return this.reporter.error("Values map doesn't contain: " + JSON.stringify($));
      $ = D[$];
    }
    if (typeof $ != "number" && !c.isBuffer($)) {
      var Q = $.toArray();
      !$.sign && Q[0] & 128 && Q.unshift(0), $ = new c(Q);
    }
    if (c.isBuffer($)) {
      var V = $.length;
      $.length === 0 && V++;
      var te = new c(V);
      return $.copy(te), $.length === 0 && (te[0] = 0), this._createEncoderBuffer(te);
    }
    if ($ < 128)
      return this._createEncoderBuffer($);
    if ($ < 256)
      return this._createEncoderBuffer([0, $]);
    for (var V = 1, ie = $; ie >= 256; ie >>= 8)
      V++;
    for (var te = new Array(V), ie = te.length - 1; ie >= 0; ie--)
      te[ie] = $ & 255, $ >>= 8;
    return te[0] & 128 && te.unshift(0), this._createEncoderBuffer(new c(te));
  }, F.prototype._encodeBool = function($) {
    return this._createEncoderBuffer($ ? 255 : 0);
  }, F.prototype._use = function($, D) {
    return typeof $ == "function" && ($ = $(D)), $._getEncoder("der").tree;
  }, F.prototype._skipDefault = function($, D, Q) {
    var V = this._baseState, te;
    if (V.default === null)
      return !1;
    var ie = $.join();
    if (V.defaultBuffer === void 0 && (V.defaultBuffer = this._encodeValue(V.default, D, Q).join()), ie.length !== V.defaultBuffer.length)
      return !1;
    for (te = 0; te < ie.length; te++)
      if (ie[te] !== V.defaultBuffer[te])
        return !1;
    return !0;
  };
  function U($, D, Q, V) {
    var te;
    if ($ === "seqof" ? $ = "seq" : $ === "setof" && ($ = "set"), X.tagByName.hasOwnProperty($))
      te = X.tagByName[$];
    else if (typeof $ == "number" && ($ | 0) === $)
      te = $;
    else
      return V.error("Unknown tag: " + $);
    return te >= 31 ? V.error("Multi-octet tag encoding unsupported") : (D || (te |= 32), te |= X.tagClassByName[Q || "universal"] << 6, te);
  }
  return der_1;
}
var pem, hasRequiredPem;
function requirePem() {
  if (hasRequiredPem) return pem;
  hasRequiredPem = 1;
  var P = requireInherits_browser(), c = requireDer();
  function O(q) {
    c.call(this, q), this.enc = "pem";
  }
  return P(O, c), pem = O, O.prototype.encode = function(q, X) {
    for (var t = c.prototype.encode.call(this, q), F = t.toString("base64"), l = ["-----BEGIN " + X.label + "-----"], U = 0; U < F.length; U += 64)
      l.push(F.slice(U, U + 64));
    return l.push("-----END " + X.label + "-----"), l.join(`
`);
  }, pem;
}
var hasRequiredEncoders;
function requireEncoders() {
  return hasRequiredEncoders || (hasRequiredEncoders = 1, function(P) {
    var c = P;
    c.der = requireDer(), c.pem = requirePem();
  }(encoders)), encoders;
}
var hasRequiredAsn1$1;
function requireAsn1$1() {
  return hasRequiredAsn1$1 || (hasRequiredAsn1$1 = 1, function(P) {
    var c = P;
    c.bignum = requireBn$2(), c.define = requireApi().define, c.base = requireBase(), c.constants = requireConstants(), c.decoders = requireDecoders(), c.encoders = requireEncoders();
  }(asn1)), asn1;
}
var certificate, hasRequiredCertificate;
function requireCertificate() {
  if (hasRequiredCertificate) return certificate;
  hasRequiredCertificate = 1;
  var P = requireAsn1$1(), c = P.define("Time", function() {
    this.choice({
      utcTime: this.utctime(),
      generalTime: this.gentime()
    });
  }), O = P.define("AttributeTypeValue", function() {
    this.seq().obj(
      this.key("type").objid(),
      this.key("value").any()
    );
  }), q = P.define("AlgorithmIdentifier", function() {
    this.seq().obj(
      this.key("algorithm").objid(),
      this.key("parameters").optional(),
      this.key("curve").objid().optional()
    );
  }), X = P.define("SubjectPublicKeyInfo", function() {
    this.seq().obj(
      this.key("algorithm").use(q),
      this.key("subjectPublicKey").bitstr()
    );
  }), t = P.define("RelativeDistinguishedName", function() {
    this.setof(O);
  }), F = P.define("RDNSequence", function() {
    this.seqof(t);
  }), l = P.define("Name", function() {
    this.choice({
      rdnSequence: this.use(F)
    });
  }), U = P.define("Validity", function() {
    this.seq().obj(
      this.key("notBefore").use(c),
      this.key("notAfter").use(c)
    );
  }), $ = P.define("Extension", function() {
    this.seq().obj(
      this.key("extnID").objid(),
      this.key("critical").bool().def(!1),
      this.key("extnValue").octstr()
    );
  }), D = P.define("TBSCertificate", function() {
    this.seq().obj(
      this.key("version").explicit(0).int().optional(),
      this.key("serialNumber").int(),
      this.key("signature").use(q),
      this.key("issuer").use(l),
      this.key("validity").use(U),
      this.key("subject").use(l),
      this.key("subjectPublicKeyInfo").use(X),
      this.key("issuerUniqueID").implicit(1).bitstr().optional(),
      this.key("subjectUniqueID").implicit(2).bitstr().optional(),
      this.key("extensions").explicit(3).seqof($).optional()
    );
  }), Q = P.define("X509Certificate", function() {
    this.seq().obj(
      this.key("tbsCertificate").use(D),
      this.key("signatureAlgorithm").use(q),
      this.key("signatureValue").bitstr()
    );
  });
  return certificate = Q, certificate;
}
var hasRequiredAsn1;
function requireAsn1() {
  if (hasRequiredAsn1) return asn1$1;
  hasRequiredAsn1 = 1;
  var P = requireAsn1$1();
  asn1$1.certificate = requireCertificate();
  var c = P.define("RSAPrivateKey", function() {
    this.seq().obj(
      this.key("version").int(),
      this.key("modulus").int(),
      this.key("publicExponent").int(),
      this.key("privateExponent").int(),
      this.key("prime1").int(),
      this.key("prime2").int(),
      this.key("exponent1").int(),
      this.key("exponent2").int(),
      this.key("coefficient").int()
    );
  });
  asn1$1.RSAPrivateKey = c;
  var O = P.define("RSAPublicKey", function() {
    this.seq().obj(
      this.key("modulus").int(),
      this.key("publicExponent").int()
    );
  });
  asn1$1.RSAPublicKey = O;
  var q = P.define("AlgorithmIdentifier", function() {
    this.seq().obj(
      this.key("algorithm").objid(),
      this.key("none").null_().optional(),
      this.key("curve").objid().optional(),
      this.key("params").seq().obj(
        this.key("p").int(),
        this.key("q").int(),
        this.key("g").int()
      ).optional()
    );
  }), X = P.define("SubjectPublicKeyInfo", function() {
    this.seq().obj(
      this.key("algorithm").use(q),
      this.key("subjectPublicKey").bitstr()
    );
  });
  asn1$1.PublicKey = X;
  var t = P.define("PrivateKeyInfo", function() {
    this.seq().obj(
      this.key("version").int(),
      this.key("algorithm").use(q),
      this.key("subjectPrivateKey").octstr()
    );
  });
  asn1$1.PrivateKey = t;
  var F = P.define("EncryptedPrivateKeyInfo", function() {
    this.seq().obj(
      this.key("algorithm").seq().obj(
        this.key("id").objid(),
        this.key("decrypt").seq().obj(
          this.key("kde").seq().obj(
            this.key("id").objid(),
            this.key("kdeparams").seq().obj(
              this.key("salt").octstr(),
              this.key("iters").int()
            )
          ),
          this.key("cipher").seq().obj(
            this.key("algo").objid(),
            this.key("iv").octstr()
          )
        )
      ),
      this.key("subjectPrivateKey").octstr()
    );
  });
  asn1$1.EncryptedPrivateKey = F;
  var l = P.define("DSAPrivateKey", function() {
    this.seq().obj(
      this.key("version").int(),
      this.key("p").int(),
      this.key("q").int(),
      this.key("g").int(),
      this.key("pub_key").int(),
      this.key("priv_key").int()
    );
  });
  asn1$1.DSAPrivateKey = l, asn1$1.DSAparam = P.define("DSAparam", function() {
    this.int();
  });
  var U = P.define("ECParameters", function() {
    this.choice({
      namedCurve: this.objid()
    });
  }), $ = P.define("ECPrivateKey", function() {
    this.seq().obj(
      this.key("version").int(),
      this.key("privateKey").octstr(),
      this.key("parameters").optional().explicit(0).use(U),
      this.key("publicKey").optional().explicit(1).bitstr()
    );
  });
  return asn1$1.ECPrivateKey = $, asn1$1.signature = P.define("signature", function() {
    this.seq().obj(
      this.key("r").int(),
      this.key("s").int()
    );
  }), asn1$1;
}
const require$$1 = {
  "2.16.840.1.101.3.4.1.1": "aes-128-ecb",
  "2.16.840.1.101.3.4.1.2": "aes-128-cbc",
  "2.16.840.1.101.3.4.1.3": "aes-128-ofb",
  "2.16.840.1.101.3.4.1.4": "aes-128-cfb",
  "2.16.840.1.101.3.4.1.21": "aes-192-ecb",
  "2.16.840.1.101.3.4.1.22": "aes-192-cbc",
  "2.16.840.1.101.3.4.1.23": "aes-192-ofb",
  "2.16.840.1.101.3.4.1.24": "aes-192-cfb",
  "2.16.840.1.101.3.4.1.41": "aes-256-ecb",
  "2.16.840.1.101.3.4.1.42": "aes-256-cbc",
  "2.16.840.1.101.3.4.1.43": "aes-256-ofb",
  "2.16.840.1.101.3.4.1.44": "aes-256-cfb"
};
var fixProc, hasRequiredFixProc;
function requireFixProc() {
  if (hasRequiredFixProc) return fixProc;
  hasRequiredFixProc = 1;
  var P = /Proc-Type: 4,ENCRYPTED[\n\r]+DEK-Info: AES-((?:128)|(?:192)|(?:256))-CBC,([0-9A-H]+)[\n\r]+([0-9A-z\n\r+/=]+)[\n\r]+/m, c = /^-----BEGIN ((?:.*? KEY)|CERTIFICATE)-----/m, O = /^-----BEGIN ((?:.*? KEY)|CERTIFICATE)-----([0-9A-z\n\r+/=]+)-----END \1-----$/m, q = requireEvp_bytestokey(), X = requireBrowser$6(), t = requireSafeBuffer$1().Buffer;
  return fixProc = function(F, l) {
    var U = F.toString(), $ = U.match(P), D;
    if ($) {
      var Q = "aes" + $[1], V = t.from($[2], "hex"), te = t.from($[3].replace(/[\r\n]/g, ""), "base64"), ie = q(l, V.slice(0, 8), parseInt($[1], 10)).key, ne = [], se = X.createDecipheriv(Q, ie, V);
      ne.push(se.update(te)), ne.push(se.final()), D = t.concat(ne);
    } else {
      var ae = U.match(O);
      D = t.from(ae[2].replace(/[\r\n]/g, ""), "base64");
    }
    var oe = U.match(c)[1];
    return {
      tag: oe,
      data: D
    };
  }, fixProc;
}
var parseAsn1, hasRequiredParseAsn1;
function requireParseAsn1() {
  if (hasRequiredParseAsn1) return parseAsn1;
  hasRequiredParseAsn1 = 1;
  var P = requireAsn1(), c = require$$1, O = requireFixProc(), q = requireBrowser$6(), X = requireBrowser$7(), t = requireSafeBuffer$1().Buffer;
  function F(U, $) {
    var D = U.algorithm.decrypt.kde.kdeparams.salt, Q = parseInt(U.algorithm.decrypt.kde.kdeparams.iters.toString(), 10), V = c[U.algorithm.decrypt.cipher.algo.join(".")], te = U.algorithm.decrypt.cipher.iv, ie = U.subjectPrivateKey, ne = parseInt(V.split("-")[1], 10) / 8, se = X.pbkdf2Sync($, D, Q, ne, "sha1"), ae = q.createDecipheriv(V, se, te), oe = [];
    return oe.push(ae.update(ie)), oe.push(ae.final()), t.concat(oe);
  }
  function l(U) {
    var $;
    typeof U == "object" && !t.isBuffer(U) && ($ = U.passphrase, U = U.key), typeof U == "string" && (U = t.from(U));
    var D = O(U, $), Q = D.tag, V = D.data, te, ie;
    switch (Q) {
      case "CERTIFICATE":
        ie = P.certificate.decode(V, "der").tbsCertificate.subjectPublicKeyInfo;
      case "PUBLIC KEY":
        switch (ie || (ie = P.PublicKey.decode(V, "der")), te = ie.algorithm.algorithm.join("."), te) {
          case "1.2.840.113549.1.1.1":
            return P.RSAPublicKey.decode(ie.subjectPublicKey.data, "der");
          case "1.2.840.10045.2.1":
            return ie.subjectPrivateKey = ie.subjectPublicKey, {
              type: "ec",
              data: ie
            };
          case "1.2.840.10040.4.1":
            return ie.algorithm.params.pub_key = P.DSAparam.decode(ie.subjectPublicKey.data, "der"), {
              type: "dsa",
              data: ie.algorithm.params
            };
          default:
            throw new Error("unknown key id " + te);
        }
      case "ENCRYPTED PRIVATE KEY":
        V = P.EncryptedPrivateKey.decode(V, "der"), V = F(V, $);
      case "PRIVATE KEY":
        switch (ie = P.PrivateKey.decode(V, "der"), te = ie.algorithm.algorithm.join("."), te) {
          case "1.2.840.113549.1.1.1":
            return P.RSAPrivateKey.decode(ie.subjectPrivateKey, "der");
          case "1.2.840.10045.2.1":
            return {
              curve: ie.algorithm.curve,
              privateKey: P.ECPrivateKey.decode(ie.subjectPrivateKey, "der").privateKey
            };
          case "1.2.840.10040.4.1":
            return ie.algorithm.params.priv_key = P.DSAparam.decode(ie.subjectPrivateKey, "der"), {
              type: "dsa",
              params: ie.algorithm.params
            };
          default:
            throw new Error("unknown key id " + te);
        }
      case "RSA PUBLIC KEY":
        return P.RSAPublicKey.decode(V, "der");
      case "RSA PRIVATE KEY":
        return P.RSAPrivateKey.decode(V, "der");
      case "DSA PRIVATE KEY":
        return {
          type: "dsa",
          params: P.DSAPrivateKey.decode(V, "der")
        };
      case "EC PRIVATE KEY":
        return V = P.ECPrivateKey.decode(V, "der"), {
          curve: V.parameters.value,
          privateKey: V.privateKey
        };
      default:
        throw new Error("unknown key type " + Q);
    }
  }
  return l.signature = P.signature, parseAsn1 = l, parseAsn1;
}
const require$$4 = {
  "1.3.132.0.10": "secp256k1",
  "1.3.132.0.33": "p224",
  "1.2.840.10045.3.1.1": "p192",
  "1.2.840.10045.3.1.7": "p256",
  "1.3.132.0.34": "p384",
  "1.3.132.0.35": "p521"
};
var hasRequiredSign;
function requireSign() {
  if (hasRequiredSign) return sign.exports;
  hasRequiredSign = 1;
  var P = requireSafeBuffer$1().Buffer, c = requireBrowser$8(), O = requireBrowserifyRsa(), q = requireElliptic().ec, X = requireBn(), t = requireParseAsn1(), F = require$$4, l = 1;
  function U(ae, oe, be, de, _e) {
    var qe = t(oe);
    if (qe.curve) {
      if (de !== "ecdsa" && de !== "ecdsa/rsa")
        throw new Error("wrong private key type");
      return $(ae, qe);
    } else if (qe.type === "dsa") {
      if (de !== "dsa")
        throw new Error("wrong private key type");
      return D(ae, qe, be);
    }
    if (de !== "rsa" && de !== "ecdsa/rsa")
      throw new Error("wrong private key type");
    if (oe.padding !== void 0 && oe.padding !== l)
      throw new Error("illegal or unsupported padding mode");
    ae = P.concat([_e, ae]);
    for (var Te = qe.modulus.byteLength(), ce = [0, 1]; ae.length + ce.length + 1 < Te; )
      ce.push(255);
    ce.push(0);
    for (var pe = -1; ++pe < ae.length; )
      ce.push(ae[pe]);
    var Me = O(ce, qe);
    return Me;
  }
  function $(ae, oe) {
    var be = F[oe.curve.join(".")];
    if (!be)
      throw new Error("unknown curve " + oe.curve.join("."));
    var de = new q(be), _e = de.keyFromPrivate(oe.privateKey), qe = _e.sign(ae);
    return P.from(qe.toDER());
  }
  function D(ae, oe, be) {
    for (var de = oe.params.priv_key, _e = oe.params.p, qe = oe.params.q, Te = oe.params.g, ce = new X(0), pe, Me = te(ae, qe).mod(qe), K = !1, ee = V(de, qe, ae, be); K === !1; )
      pe = ne(qe, ee, be), ce = se(Te, pe, _e, qe), K = pe.invm(qe).imul(Me.add(de.mul(ce))).mod(qe), K.cmpn(0) === 0 && (K = !1, ce = new X(0));
    return Q(ce, K);
  }
  function Q(ae, oe) {
    ae = ae.toArray(), oe = oe.toArray(), ae[0] & 128 && (ae = [0].concat(ae)), oe[0] & 128 && (oe = [0].concat(oe));
    var be = ae.length + oe.length + 4, de = [
      48,
      be,
      2,
      ae.length
    ];
    return de = de.concat(ae, [2, oe.length], oe), P.from(de);
  }
  function V(ae, oe, be, de) {
    if (ae = P.from(ae.toArray()), ae.length < oe.byteLength()) {
      var _e = P.alloc(oe.byteLength() - ae.length);
      ae = P.concat([_e, ae]);
    }
    var qe = be.length, Te = ie(be, oe), ce = P.alloc(qe);
    ce.fill(1);
    var pe = P.alloc(qe);
    return pe = c(de, pe).update(ce).update(P.from([0])).update(ae).update(Te).digest(), ce = c(de, pe).update(ce).digest(), pe = c(de, pe).update(ce).update(P.from([1])).update(ae).update(Te).digest(), ce = c(de, pe).update(ce).digest(), { k: pe, v: ce };
  }
  function te(ae, oe) {
    var be = new X(ae), de = (ae.length << 3) - oe.bitLength();
    return de > 0 && be.ishrn(de), be;
  }
  function ie(ae, oe) {
    ae = te(ae, oe), ae = ae.mod(oe);
    var be = P.from(ae.toArray());
    if (be.length < oe.byteLength()) {
      var de = P.alloc(oe.byteLength() - be.length);
      be = P.concat([de, be]);
    }
    return be;
  }
  function ne(ae, oe, be) {
    var de, _e;
    do {
      for (de = P.alloc(0); de.length * 8 < ae.bitLength(); )
        oe.v = c(be, oe.k).update(oe.v).digest(), de = P.concat([de, oe.v]);
      _e = te(de, ae), oe.k = c(be, oe.k).update(oe.v).update(P.from([0])).digest(), oe.v = c(be, oe.k).update(oe.v).digest();
    } while (_e.cmp(ae) !== -1);
    return _e;
  }
  function se(ae, oe, be, de) {
    return ae.toRed(X.mont(be)).redPow(oe).fromRed().mod(de);
  }
  return sign.exports = U, sign.exports.getKey = V, sign.exports.makeKey = ne, sign.exports;
}
var verify_1, hasRequiredVerify;
function requireVerify() {
  if (hasRequiredVerify) return verify_1;
  hasRequiredVerify = 1;
  var P = requireSafeBuffer$1().Buffer, c = requireBn(), O = requireElliptic().ec, q = requireParseAsn1(), X = require$$4;
  function t($, D, Q, V, te) {
    var ie = q(Q);
    if (ie.type === "ec") {
      if (V !== "ecdsa" && V !== "ecdsa/rsa")
        throw new Error("wrong public key type");
      return F($, D, ie);
    } else if (ie.type === "dsa") {
      if (V !== "dsa")
        throw new Error("wrong public key type");
      return l($, D, ie);
    }
    if (V !== "rsa" && V !== "ecdsa/rsa")
      throw new Error("wrong public key type");
    D = P.concat([te, D]);
    for (var ne = ie.modulus.byteLength(), se = [1], ae = 0; D.length + se.length + 2 < ne; )
      se.push(255), ae += 1;
    se.push(0);
    for (var oe = -1; ++oe < D.length; )
      se.push(D[oe]);
    se = P.from(se);
    var be = c.mont(ie.modulus);
    $ = new c($).toRed(be), $ = $.redPow(new c(ie.publicExponent)), $ = P.from($.fromRed().toArray());
    var de = ae < 8 ? 1 : 0;
    for (ne = Math.min($.length, se.length), $.length !== se.length && (de = 1), oe = -1; ++oe < ne; )
      de |= $[oe] ^ se[oe];
    return de === 0;
  }
  function F($, D, Q) {
    var V = X[Q.data.algorithm.curve.join(".")];
    if (!V)
      throw new Error("unknown curve " + Q.data.algorithm.curve.join("."));
    var te = new O(V), ie = Q.data.subjectPrivateKey.data;
    return te.verify(D, $, ie);
  }
  function l($, D, Q) {
    var V = Q.data.p, te = Q.data.q, ie = Q.data.g, ne = Q.data.pub_key, se = q.signature.decode($, "der"), ae = se.s, oe = se.r;
    U(ae, te), U(oe, te);
    var be = c.mont(V), de = ae.invm(te), _e = ie.toRed(be).redPow(new c(D).mul(de).mod(te)).fromRed().mul(ne.toRed(be).redPow(oe.mul(de).mod(te)).fromRed()).mod(V).mod(te);
    return _e.cmp(oe) === 0;
  }
  function U($, D) {
    if ($.cmpn(0) <= 0)
      throw new Error("invalid sig");
    if ($.cmp(D) >= 0)
      throw new Error("invalid sig");
  }
  return verify_1 = t, verify_1;
}
var browser$3, hasRequiredBrowser$3;
function requireBrowser$3() {
  if (hasRequiredBrowser$3) return browser$3;
  hasRequiredBrowser$3 = 1;
  var P = requireSafeBuffer$1().Buffer, c = requireBrowser$9(), O = requireReadableBrowser(), q = requireInherits_browser(), X = requireSign(), t = requireVerify(), F = require$$6;
  Object.keys(F).forEach(function(Q) {
    F[Q].id = P.from(F[Q].id, "hex"), F[Q.toLowerCase()] = F[Q];
  });
  function l(Q) {
    O.Writable.call(this);
    var V = F[Q];
    if (!V)
      throw new Error("Unknown message digest");
    this._hashType = V.hash, this._hash = c(V.hash), this._tag = V.id, this._signType = V.sign;
  }
  q(l, O.Writable), l.prototype._write = function(Q, V, te) {
    this._hash.update(Q), te();
  }, l.prototype.update = function(Q, V) {
    return this._hash.update(typeof Q == "string" ? P.from(Q, V) : Q), this;
  }, l.prototype.sign = function(Q, V) {
    this.end();
    var te = this._hash.digest(), ie = X(te, Q, this._hashType, this._signType, this._tag);
    return V ? ie.toString(V) : ie;
  };
  function U(Q) {
    O.Writable.call(this);
    var V = F[Q];
    if (!V)
      throw new Error("Unknown message digest");
    this._hash = c(V.hash), this._tag = V.id, this._signType = V.sign;
  }
  q(U, O.Writable), U.prototype._write = function(Q, V, te) {
    this._hash.update(Q), te();
  }, U.prototype.update = function(Q, V) {
    return this._hash.update(typeof Q == "string" ? P.from(Q, V) : Q), this;
  }, U.prototype.verify = function(Q, V, te) {
    var ie = typeof V == "string" ? P.from(V, te) : V;
    this.end();
    var ne = this._hash.digest();
    return t(ie, ne, Q, this._signType, this._tag);
  };
  function $(Q) {
    return new l(Q);
  }
  function D(Q) {
    return new U(Q);
  }
  return browser$3 = {
    Sign: $,
    Verify: D,
    createSign: $,
    createVerify: D
  }, browser$3;
}
var browser$2, hasRequiredBrowser$2;
function requireBrowser$2() {
  if (hasRequiredBrowser$2) return browser$2;
  hasRequiredBrowser$2 = 1;
  var P = requireElliptic(), c = requireBn$2();
  browser$2 = function(t) {
    return new q(t);
  };
  var O = {
    secp256k1: {
      name: "secp256k1",
      byteLength: 32
    },
    secp224r1: {
      name: "p224",
      byteLength: 28
    },
    prime256v1: {
      name: "p256",
      byteLength: 32
    },
    prime192v1: {
      name: "p192",
      byteLength: 24
    },
    ed25519: {
      name: "ed25519",
      byteLength: 32
    },
    secp384r1: {
      name: "p384",
      byteLength: 48
    },
    secp521r1: {
      name: "p521",
      byteLength: 66
    }
  };
  O.p224 = O.secp224r1, O.p256 = O.secp256r1 = O.prime256v1, O.p192 = O.secp192r1 = O.prime192v1, O.p384 = O.secp384r1, O.p521 = O.secp521r1;
  function q(t) {
    this.curveType = O[t], this.curveType || (this.curveType = {
      name: t
    }), this.curve = new P.ec(this.curveType.name), this.keys = void 0;
  }
  q.prototype.generateKeys = function(t, F) {
    return this.keys = this.curve.genKeyPair(), this.getPublicKey(t, F);
  }, q.prototype.computeSecret = function(t, F, l) {
    F = F || "utf8", bufferExports.Buffer.isBuffer(t) || (t = new bufferExports.Buffer(t, F));
    var U = this.curve.keyFromPublic(t).getPublic(), $ = U.mul(this.keys.getPrivate()).getX();
    return X($, l, this.curveType.byteLength);
  }, q.prototype.getPublicKey = function(t, F) {
    var l = this.keys.getPublic(F === "compressed", !0);
    return F === "hybrid" && (l[l.length - 1] % 2 ? l[0] = 7 : l[0] = 6), X(l, t);
  }, q.prototype.getPrivateKey = function(t) {
    return X(this.keys.getPrivate(), t);
  }, q.prototype.setPublicKey = function(t, F) {
    return F = F || "utf8", bufferExports.Buffer.isBuffer(t) || (t = new bufferExports.Buffer(t, F)), this.keys._importPublic(t), this;
  }, q.prototype.setPrivateKey = function(t, F) {
    F = F || "utf8", bufferExports.Buffer.isBuffer(t) || (t = new bufferExports.Buffer(t, F));
    var l = new c(t);
    return l = l.toString(16), this.keys = this.curve.genKeyPair(), this.keys._importPrivate(l), this;
  };
  function X(t, F, l) {
    Array.isArray(t) || (t = t.toArray());
    var U = new bufferExports.Buffer(t);
    if (l && U.length < l) {
      var $ = new bufferExports.Buffer(l - U.length);
      $.fill(0), U = bufferExports.Buffer.concat([$, U]);
    }
    return F ? U.toString(F) : U;
  }
  return browser$2;
}
var browser$1 = {}, mgf, hasRequiredMgf;
function requireMgf() {
  if (hasRequiredMgf) return mgf;
  hasRequiredMgf = 1;
  var P = requireBrowser$9(), c = requireSafeBuffer$1().Buffer;
  mgf = function(q, X) {
    for (var t = c.alloc(0), F = 0, l; t.length < X; )
      l = O(F++), t = c.concat([t, P("sha1").update(q).update(l).digest()]);
    return t.slice(0, X);
  };
  function O(q) {
    var X = c.allocUnsafe(4);
    return X.writeUInt32BE(q, 0), X;
  }
  return mgf;
}
var xor, hasRequiredXor;
function requireXor() {
  return hasRequiredXor || (hasRequiredXor = 1, xor = function(P, c) {
    for (var O = P.length, q = -1; ++q < O; )
      P[q] ^= c[q];
    return P;
  }), xor;
}
var withPublic_1, hasRequiredWithPublic;
function requireWithPublic() {
  if (hasRequiredWithPublic) return withPublic_1;
  hasRequiredWithPublic = 1;
  var P = requireBn$2(), c = requireSafeBuffer$1().Buffer;
  function O(q, X) {
    return c.from(q.toRed(P.mont(X.modulus)).redPow(new P(X.publicExponent)).fromRed().toArray());
  }
  return withPublic_1 = O, withPublic_1;
}
var publicEncrypt, hasRequiredPublicEncrypt;
function requirePublicEncrypt() {
  if (hasRequiredPublicEncrypt) return publicEncrypt;
  hasRequiredPublicEncrypt = 1;
  var P = requireParseAsn1(), c = requireBrowser$b(), O = requireBrowser$9(), q = requireMgf(), X = requireXor(), t = requireBn$2(), F = requireWithPublic(), l = requireBrowserifyRsa(), U = requireSafeBuffer$1().Buffer;
  publicEncrypt = function(V, te, ie) {
    var ne;
    V.padding ? ne = V.padding : ie ? ne = 1 : ne = 4;
    var se = P(V), ae;
    if (ne === 4)
      ae = $(se, te);
    else if (ne === 1)
      ae = D(se, te, ie);
    else if (ne === 3) {
      if (ae = new t(te), ae.cmp(se.modulus) >= 0)
        throw new Error("data too long for modulus");
    } else
      throw new Error("unknown padding");
    return ie ? l(ae, se) : F(ae, se);
  };
  function $(V, te) {
    var ie = V.modulus.byteLength(), ne = te.length, se = O("sha1").update(U.alloc(0)).digest(), ae = se.length, oe = 2 * ae;
    if (ne > ie - oe - 2)
      throw new Error("message too long");
    var be = U.alloc(ie - ne - oe - 2), de = ie - ae - 1, _e = c(ae), qe = X(U.concat([se, be, U.alloc(1, 1), te], de), q(_e, de)), Te = X(_e, q(qe, ae));
    return new t(U.concat([U.alloc(1), Te, qe], ie));
  }
  function D(V, te, ie) {
    var ne = te.length, se = V.modulus.byteLength();
    if (ne > se - 11)
      throw new Error("message too long");
    var ae;
    return ie ? ae = U.alloc(se - ne - 3, 255) : ae = Q(se - ne - 3), new t(U.concat([U.from([0, ie ? 1 : 2]), ae, U.alloc(1), te], se));
  }
  function Q(V) {
    for (var te = U.allocUnsafe(V), ie = 0, ne = c(V * 2), se = 0, ae; ie < V; )
      se === ne.length && (ne = c(V * 2), se = 0), ae = ne[se++], ae && (te[ie++] = ae);
    return te;
  }
  return publicEncrypt;
}
var privateDecrypt, hasRequiredPrivateDecrypt;
function requirePrivateDecrypt() {
  if (hasRequiredPrivateDecrypt) return privateDecrypt;
  hasRequiredPrivateDecrypt = 1;
  var P = requireParseAsn1(), c = requireMgf(), O = requireXor(), q = requireBn$2(), X = requireBrowserifyRsa(), t = requireBrowser$9(), F = requireWithPublic(), l = requireSafeBuffer$1().Buffer;
  privateDecrypt = function(Q, V, te) {
    var ie;
    Q.padding ? ie = Q.padding : te ? ie = 1 : ie = 4;
    var ne = P(Q), se = ne.modulus.byteLength();
    if (V.length > se || new q(V).cmp(ne.modulus) >= 0)
      throw new Error("decryption error");
    var ae;
    te ? ae = F(new q(V), ne) : ae = X(V, ne);
    var oe = l.alloc(se - ae.length);
    if (ae = l.concat([oe, ae], se), ie === 4)
      return U(ne, ae);
    if (ie === 1)
      return $(ne, ae, te);
    if (ie === 3)
      return ae;
    throw new Error("unknown padding");
  };
  function U(Q, V) {
    var te = Q.modulus.byteLength(), ie = t("sha1").update(l.alloc(0)).digest(), ne = ie.length;
    if (V[0] !== 0)
      throw new Error("decryption error");
    var se = V.slice(1, ne + 1), ae = V.slice(ne + 1), oe = O(se, c(ae, ne)), be = O(ae, c(oe, te - ne - 1));
    if (D(ie, be.slice(0, ne)))
      throw new Error("decryption error");
    for (var de = ne; be[de] === 0; )
      de++;
    if (be[de++] !== 1)
      throw new Error("decryption error");
    return be.slice(de);
  }
  function $(Q, V, te) {
    for (var ie = V.slice(0, 2), ne = 2, se = 0; V[ne++] !== 0; )
      if (ne >= V.length) {
        se++;
        break;
      }
    var ae = V.slice(2, ne - 1);
    if ((ie.toString("hex") !== "0002" && !te || ie.toString("hex") !== "0001" && te) && se++, ae.length < 8 && se++, se)
      throw new Error("decryption error");
    return V.slice(ne);
  }
  function D(Q, V) {
    Q = l.from(Q), V = l.from(V);
    var te = 0, ie = Q.length;
    Q.length !== V.length && (te++, ie = Math.min(Q.length, V.length));
    for (var ne = -1; ++ne < ie; )
      te += Q[ne] ^ V[ne];
    return te;
  }
  return privateDecrypt;
}
var hasRequiredBrowser$1;
function requireBrowser$1() {
  return hasRequiredBrowser$1 || (hasRequiredBrowser$1 = 1, function(P) {
    P.publicEncrypt = requirePublicEncrypt(), P.privateDecrypt = requirePrivateDecrypt(), P.privateEncrypt = function(c, O) {
      return P.publicEncrypt(c, O, !0);
    }, P.publicDecrypt = function(c, O) {
      return P.privateDecrypt(c, O, !0);
    };
  }(browser$1)), browser$1;
}
var browser = {}, hasRequiredBrowser;
function requireBrowser() {
  if (hasRequiredBrowser) return browser;
  hasRequiredBrowser = 1;
  function P() {
    throw new Error(`secure random number generation not supported by this browser
use chrome, FireFox or Internet Explorer 11`);
  }
  var c = requireSafeBuffer$1(), O = requireBrowser$b(), q = c.Buffer, X = c.kMaxLength, t = commonjsGlobal.crypto || commonjsGlobal.msCrypto, F = Math.pow(2, 32) - 1;
  function l(V, te) {
    if (typeof V != "number" || V !== V)
      throw new TypeError("offset must be a number");
    if (V > F || V < 0)
      throw new TypeError("offset must be a uint32");
    if (V > X || V > te)
      throw new RangeError("offset out of range");
  }
  function U(V, te, ie) {
    if (typeof V != "number" || V !== V)
      throw new TypeError("size must be a number");
    if (V > F || V < 0)
      throw new TypeError("size must be a uint32");
    if (V + te > ie || V > X)
      throw new RangeError("buffer too small");
  }
  t && t.getRandomValues || !process$1.browser ? (browser.randomFill = $, browser.randomFillSync = Q) : (browser.randomFill = P, browser.randomFillSync = P);
  function $(V, te, ie, ne) {
    if (!q.isBuffer(V) && !(V instanceof commonjsGlobal.Uint8Array))
      throw new TypeError('"buf" argument must be a Buffer or Uint8Array');
    if (typeof te == "function")
      ne = te, te = 0, ie = V.length;
    else if (typeof ie == "function")
      ne = ie, ie = V.length - te;
    else if (typeof ne != "function")
      throw new TypeError('"cb" argument must be a function');
    return l(te, V.length), U(ie, te, V.length), D(V, te, ie, ne);
  }
  function D(V, te, ie, ne) {
    if (process$1.browser) {
      var se = V.buffer, ae = new Uint8Array(se, te, ie);
      if (t.getRandomValues(ae), ne) {
        process$1.nextTick(function() {
          ne(null, V);
        });
        return;
      }
      return V;
    }
    if (ne) {
      O(ie, function(be, de) {
        if (be)
          return ne(be);
        de.copy(V, te), ne(null, V);
      });
      return;
    }
    var oe = O(ie);
    return oe.copy(V, te), V;
  }
  function Q(V, te, ie) {
    if (typeof te == "undefined" && (te = 0), !q.isBuffer(V) && !(V instanceof commonjsGlobal.Uint8Array))
      throw new TypeError('"buf" argument must be a Buffer or Uint8Array');
    return l(te, V.length), ie === void 0 && (ie = V.length - te), U(ie, te, V.length), D(V, te, ie);
  }
  return browser;
}
var hasRequiredCryptoBrowserify;
function requireCryptoBrowserify() {
  if (hasRequiredCryptoBrowserify) return cryptoBrowserify;
  hasRequiredCryptoBrowserify = 1, cryptoBrowserify.randomBytes = cryptoBrowserify.rng = cryptoBrowserify.pseudoRandomBytes = cryptoBrowserify.prng = requireBrowser$b(), cryptoBrowserify.createHash = cryptoBrowserify.Hash = requireBrowser$9(), cryptoBrowserify.createHmac = cryptoBrowserify.Hmac = requireBrowser$8();
  var P = requireAlgos(), c = Object.keys(P), O = ["sha1", "sha224", "sha256", "sha384", "sha512", "md5", "rmd160"].concat(c);
  cryptoBrowserify.getHashes = function() {
    return O;
  };
  var q = requireBrowser$7();
  cryptoBrowserify.pbkdf2 = q.pbkdf2, cryptoBrowserify.pbkdf2Sync = q.pbkdf2Sync;
  var X = requireBrowser$5();
  cryptoBrowserify.Cipher = X.Cipher, cryptoBrowserify.createCipher = X.createCipher, cryptoBrowserify.Cipheriv = X.Cipheriv, cryptoBrowserify.createCipheriv = X.createCipheriv, cryptoBrowserify.Decipher = X.Decipher, cryptoBrowserify.createDecipher = X.createDecipher, cryptoBrowserify.Decipheriv = X.Decipheriv, cryptoBrowserify.createDecipheriv = X.createDecipheriv, cryptoBrowserify.getCiphers = X.getCiphers, cryptoBrowserify.listCiphers = X.listCiphers;
  var t = requireBrowser$4();
  cryptoBrowserify.DiffieHellmanGroup = t.DiffieHellmanGroup, cryptoBrowserify.createDiffieHellmanGroup = t.createDiffieHellmanGroup, cryptoBrowserify.getDiffieHellman = t.getDiffieHellman, cryptoBrowserify.createDiffieHellman = t.createDiffieHellman, cryptoBrowserify.DiffieHellman = t.DiffieHellman;
  var F = requireBrowser$3();
  cryptoBrowserify.createSign = F.createSign, cryptoBrowserify.Sign = F.Sign, cryptoBrowserify.createVerify = F.createVerify, cryptoBrowserify.Verify = F.Verify, cryptoBrowserify.createECDH = requireBrowser$2();
  var l = requireBrowser$1();
  cryptoBrowserify.publicEncrypt = l.publicEncrypt, cryptoBrowserify.privateEncrypt = l.privateEncrypt, cryptoBrowserify.publicDecrypt = l.publicDecrypt, cryptoBrowserify.privateDecrypt = l.privateDecrypt;
  var U = requireBrowser();
  return cryptoBrowserify.randomFill = U.randomFill, cryptoBrowserify.randomFillSync = U.randomFillSync, cryptoBrowserify.createCredentials = function() {
    throw new Error([
      "sorry, createCredentials is not implemented yet",
      "we accept pull requests",
      "https://github.com/crypto-browserify/crypto-browserify"
    ].join(`
`));
  }, cryptoBrowserify.constants = {
    DH_CHECK_P_NOT_SAFE_PRIME: 2,
    DH_CHECK_P_NOT_PRIME: 1,
    DH_UNABLE_TO_CHECK_GENERATOR: 4,
    DH_NOT_SUITABLE_GENERATOR: 8,
    NPN_ENABLED: 1,
    ALPN_ENABLED: 1,
    RSA_PKCS1_PADDING: 1,
    RSA_SSLV23_PADDING: 2,
    RSA_NO_PADDING: 3,
    RSA_PKCS1_OAEP_PADDING: 4,
    RSA_X931_PADDING: 5,
    RSA_PKCS1_PSS_PADDING: 6,
    POINT_CONVERSION_COMPRESSED: 2,
    POINT_CONVERSION_UNCOMPRESSED: 4,
    POINT_CONVERSION_HYBRID: 6
  }, cryptoBrowserify;
}
(function(P) {
  /**
   * @license bcrypt.js (c) 2013 Daniel Wirtz <dcode@dcode.io>
   * Released under the Apache License, Version 2.0
   * see: https://github.com/dcodeIO/bcrypt.js for details
   */
  (function(c, O) {
    typeof commonjsRequire == "function" && P && P.exports ? P.exports = O() : (c.dcodeIO = c.dcodeIO || {}).bcrypt = O();
  })(commonjsGlobal, function() {
    var c = {}, O = null;
    function q(K) {
      if (P && P.exports)
        try {
          return requireCryptoBrowserify().randomBytes(K);
        } catch (e) {
        }
      try {
        var ee;
        return (self.crypto || self.msCrypto).getRandomValues(ee = new Uint32Array(K)), Array.prototype.slice.call(ee);
      } catch (e) {
      }
      if (!O)
        throw Error("Neither WebCryptoAPI nor a crypto module is available. Use bcrypt.setRandomFallback to set an alternative");
      return O(K);
    }
    var X = !1;
    try {
      q(1), X = !0;
    } catch (K) {
    }
    O = null, c.setRandomFallback = function(K) {
      O = K;
    }, c.genSaltSync = function(K, ee) {
      if (K = K || ne, typeof K != "number")
        throw Error("Illegal arguments: " + typeof K + ", " + typeof ee);
      K < 4 ? K = 4 : K > 31 && (K = 31);
      var e = [];
      return e.push("$2a$"), K < 10 && e.push("0"), e.push(K.toString()), e.push("$"), e.push(Q(q(ie), ie)), e.join("");
    }, c.genSalt = function(K, ee, e) {
      if (typeof ee == "function" && (e = ee, ee = void 0), typeof K == "function" && (e = K, K = void 0), typeof K == "undefined")
        K = ne;
      else if (typeof K != "number")
        throw Error("illegal arguments: " + typeof K);
      function o(y) {
        F(function() {
          try {
            y(null, c.genSaltSync(K));
          } catch (H) {
            y(H);
          }
        });
      }
      if (e) {
        if (typeof e != "function")
          throw Error("Illegal callback: " + typeof e);
        o(e);
      } else
        return new Promise(function(y, H) {
          o(function(z, B) {
            if (z) {
              H(z);
              return;
            }
            y(B);
          });
        });
    }, c.hashSync = function(K, ee) {
      if (typeof ee == "undefined" && (ee = ne), typeof ee == "number" && (ee = c.genSaltSync(ee)), typeof K != "string" || typeof ee != "string")
        throw Error("Illegal arguments: " + typeof K + ", " + typeof ee);
      return Me(K, ee);
    }, c.hash = function(K, ee, e, o) {
      function y(H) {
        typeof K == "string" && typeof ee == "number" ? c.genSalt(ee, function(z, B) {
          Me(K, B, H, o);
        }) : typeof K == "string" && typeof ee == "string" ? Me(K, ee, H, o) : F(H.bind(this, Error("Illegal arguments: " + typeof K + ", " + typeof ee)));
      }
      if (e) {
        if (typeof e != "function")
          throw Error("Illegal callback: " + typeof e);
        y(e);
      } else
        return new Promise(function(H, z) {
          y(function(B, w) {
            if (B) {
              z(B);
              return;
            }
            H(w);
          });
        });
    };
    function t(K, ee) {
      for (var e = 0, o = 0, y = 0, H = K.length; y < H; ++y)
        K.charCodeAt(y) === ee.charCodeAt(y) ? ++e : ++o;
      return e < 0 ? !1 : o === 0;
    }
    c.compareSync = function(K, ee) {
      if (typeof K != "string" || typeof ee != "string")
        throw Error("Illegal arguments: " + typeof K + ", " + typeof ee);
      return ee.length !== 60 ? !1 : t(c.hashSync(K, ee.substr(0, ee.length - 31)), ee);
    }, c.compare = function(K, ee, e, o) {
      function y(H) {
        if (typeof K != "string" || typeof ee != "string") {
          F(H.bind(this, Error("Illegal arguments: " + typeof K + ", " + typeof ee)));
          return;
        }
        if (ee.length !== 60) {
          F(H.bind(this, null, !1));
          return;
        }
        c.hash(K, ee.substr(0, 29), function(z, B) {
          z ? H(z) : H(null, t(B, ee));
        }, o);
      }
      if (e) {
        if (typeof e != "function")
          throw Error("Illegal callback: " + typeof e);
        y(e);
      } else
        return new Promise(function(H, z) {
          y(function(B, w) {
            if (B) {
              z(B);
              return;
            }
            H(w);
          });
        });
    }, c.getRounds = function(K) {
      if (typeof K != "string")
        throw Error("Illegal arguments: " + typeof K);
      return parseInt(K.split("$")[2], 10);
    }, c.getSalt = function(K) {
      if (typeof K != "string")
        throw Error("Illegal arguments: " + typeof K);
      if (K.length !== 60)
        throw Error("Illegal hash length: " + K.length + " != 60");
      return K.substring(0, 29);
    };
    var F = typeof process$1 != "undefined" && process$1 && typeof process$1.nextTick == "function" ? typeof setImmediate == "function" ? setImmediate : process$1.nextTick : setTimeout;
    function l(K) {
      var ee = [], e = 0;
      return te.encodeUTF16toUTF8(function() {
        return e >= K.length ? null : K.charCodeAt(e++);
      }, function(o) {
        ee.push(o);
      }), ee;
    }
    var U = "./ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split(""), $ = [
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      0,
      1,
      54,
      55,
      56,
      57,
      58,
      59,
      60,
      61,
      62,
      63,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      17,
      18,
      19,
      20,
      21,
      22,
      23,
      24,
      25,
      26,
      27,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      28,
      29,
      30,
      31,
      32,
      33,
      34,
      35,
      36,
      37,
      38,
      39,
      40,
      41,
      42,
      43,
      44,
      45,
      46,
      47,
      48,
      49,
      50,
      51,
      52,
      53,
      -1,
      -1,
      -1,
      -1,
      -1
    ], D = String.fromCharCode;
    function Q(K, ee) {
      var e = 0, o = [], y, H;
      if (ee <= 0 || ee > K.length)
        throw Error("Illegal len: " + ee);
      for (; e < ee; ) {
        if (y = K[e++] & 255, o.push(U[y >> 2 & 63]), y = (y & 3) << 4, e >= ee) {
          o.push(U[y & 63]);
          break;
        }
        if (H = K[e++] & 255, y |= H >> 4 & 15, o.push(U[y & 63]), y = (H & 15) << 2, e >= ee) {
          o.push(U[y & 63]);
          break;
        }
        H = K[e++] & 255, y |= H >> 6 & 3, o.push(U[y & 63]), o.push(U[H & 63]);
      }
      return o.join("");
    }
    function V(K, ee) {
      var e = 0, o = K.length, y = 0, H = [], z, B, w, G, g, J;
      if (ee <= 0)
        throw Error("Illegal len: " + ee);
      for (; e < o - 1 && y < ee && (J = K.charCodeAt(e++), z = J < $.length ? $[J] : -1, J = K.charCodeAt(e++), B = J < $.length ? $[J] : -1, !(z == -1 || B == -1 || (g = z << 2 >>> 0, g |= (B & 48) >> 4, H.push(D(g)), ++y >= ee || e >= o) || (J = K.charCodeAt(e++), w = J < $.length ? $[J] : -1, w == -1) || (g = (B & 15) << 4 >>> 0, g |= (w & 60) >> 2, H.push(D(g)), ++y >= ee || e >= o))); )
        J = K.charCodeAt(e++), G = J < $.length ? $[J] : -1, g = (w & 3) << 6 >>> 0, g |= G, H.push(D(g)), ++y;
      var le = [];
      for (e = 0; e < y; e++)
        le.push(H[e].charCodeAt(0));
      return le;
    }
    var te = function() {
      var K = {};
      return K.MAX_CODEPOINT = 1114111, K.encodeUTF8 = function(ee, e) {
        var o = null;
        for (typeof ee == "number" && (o = ee, ee = function() {
          return null;
        }); o !== null || (o = ee()) !== null; )
          o < 128 ? e(o & 127) : o < 2048 ? (e(o >> 6 & 31 | 192), e(o & 63 | 128)) : o < 65536 ? (e(o >> 12 & 15 | 224), e(o >> 6 & 63 | 128), e(o & 63 | 128)) : (e(o >> 18 & 7 | 240), e(o >> 12 & 63 | 128), e(o >> 6 & 63 | 128), e(o & 63 | 128)), o = null;
      }, K.decodeUTF8 = function(ee, e) {
        for (var o, y, H, z, B = function(w) {
          w = w.slice(0, w.indexOf(null));
          var G = Error(w.toString());
          throw G.name = "TruncatedError", G.bytes = w, G;
        }; (o = ee()) !== null; )
          if (!(o & 128))
            e(o);
          else if ((o & 224) === 192)
            (y = ee()) === null && B([o, y]), e((o & 31) << 6 | y & 63);
          else if ((o & 240) === 224)
            ((y = ee()) === null || (H = ee()) === null) && B([o, y, H]), e((o & 15) << 12 | (y & 63) << 6 | H & 63);
          else if ((o & 248) === 240)
            ((y = ee()) === null || (H = ee()) === null || (z = ee()) === null) && B([o, y, H, z]), e((o & 7) << 18 | (y & 63) << 12 | (H & 63) << 6 | z & 63);
          else throw RangeError("Illegal starting byte: " + o);
      }, K.UTF16toUTF8 = function(ee, e) {
        for (var o, y = null; (o = y !== null ? y : ee()) !== null; ) {
          if (o >= 55296 && o <= 57343 && (y = ee()) !== null && y >= 56320 && y <= 57343) {
            e((o - 55296) * 1024 + y - 56320 + 65536), y = null;
            continue;
          }
          e(o);
        }
        y !== null && e(y);
      }, K.UTF8toUTF16 = function(ee, e) {
        var o = null;
        for (typeof ee == "number" && (o = ee, ee = function() {
          return null;
        }); o !== null || (o = ee()) !== null; )
          o <= 65535 ? e(o) : (o -= 65536, e((o >> 10) + 55296), e(o % 1024 + 56320)), o = null;
      }, K.encodeUTF16toUTF8 = function(ee, e) {
        K.UTF16toUTF8(ee, function(o) {
          K.encodeUTF8(o, e);
        });
      }, K.decodeUTF8toUTF16 = function(ee, e) {
        K.decodeUTF8(ee, function(o) {
          K.UTF8toUTF16(o, e);
        });
      }, K.calculateCodePoint = function(ee) {
        return ee < 128 ? 1 : ee < 2048 ? 2 : ee < 65536 ? 3 : 4;
      }, K.calculateUTF8 = function(ee) {
        for (var e, o = 0; (e = ee()) !== null; )
          o += K.calculateCodePoint(e);
        return o;
      }, K.calculateUTF16asUTF8 = function(ee) {
        var e = 0, o = 0;
        return K.UTF16toUTF8(ee, function(y) {
          ++e, o += K.calculateCodePoint(y);
        }), [e, o];
      }, K;
    }();
    Date.now = Date.now || function() {
      return +/* @__PURE__ */ new Date();
    };
    var ie = 16, ne = 10, se = 16, ae = 100, oe = [
      608135816,
      2242054355,
      320440878,
      57701188,
      2752067618,
      698298832,
      137296536,
      3964562569,
      1160258022,
      953160567,
      3193202383,
      887688300,
      3232508343,
      3380367581,
      1065670069,
      3041331479,
      2450970073,
      2306472731
    ], be = [
      3509652390,
      2564797868,
      805139163,
      3491422135,
      3101798381,
      1780907670,
      3128725573,
      4046225305,
      614570311,
      3012652279,
      134345442,
      2240740374,
      1667834072,
      1901547113,
      2757295779,
      4103290238,
      227898511,
      1921955416,
      1904987480,
      2182433518,
      2069144605,
      3260701109,
      2620446009,
      720527379,
      3318853667,
      677414384,
      3393288472,
      3101374703,
      2390351024,
      1614419982,
      1822297739,
      2954791486,
      3608508353,
      3174124327,
      2024746970,
      1432378464,
      3864339955,
      2857741204,
      1464375394,
      1676153920,
      1439316330,
      715854006,
      3033291828,
      289532110,
      2706671279,
      2087905683,
      3018724369,
      1668267050,
      732546397,
      1947742710,
      3462151702,
      2609353502,
      2950085171,
      1814351708,
      2050118529,
      680887927,
      999245976,
      1800124847,
      3300911131,
      1713906067,
      1641548236,
      4213287313,
      1216130144,
      1575780402,
      4018429277,
      3917837745,
      3693486850,
      3949271944,
      596196993,
      3549867205,
      258830323,
      2213823033,
      772490370,
      2760122372,
      1774776394,
      2652871518,
      566650946,
      4142492826,
      1728879713,
      2882767088,
      1783734482,
      3629395816,
      2517608232,
      2874225571,
      1861159788,
      326777828,
      3124490320,
      2130389656,
      2716951837,
      967770486,
      1724537150,
      2185432712,
      2364442137,
      1164943284,
      2105845187,
      998989502,
      3765401048,
      2244026483,
      1075463327,
      1455516326,
      1322494562,
      910128902,
      469688178,
      1117454909,
      936433444,
      3490320968,
      3675253459,
      1240580251,
      122909385,
      2157517691,
      634681816,
      4142456567,
      3825094682,
      3061402683,
      2540495037,
      79693498,
      3249098678,
      1084186820,
      1583128258,
      426386531,
      1761308591,
      1047286709,
      322548459,
      995290223,
      1845252383,
      2603652396,
      3431023940,
      2942221577,
      3202600964,
      3727903485,
      1712269319,
      422464435,
      3234572375,
      1170764815,
      3523960633,
      3117677531,
      1434042557,
      442511882,
      3600875718,
      1076654713,
      1738483198,
      4213154764,
      2393238008,
      3677496056,
      1014306527,
      4251020053,
      793779912,
      2902807211,
      842905082,
      4246964064,
      1395751752,
      1040244610,
      2656851899,
      3396308128,
      445077038,
      3742853595,
      3577915638,
      679411651,
      2892444358,
      2354009459,
      1767581616,
      3150600392,
      3791627101,
      3102740896,
      284835224,
      4246832056,
      1258075500,
      768725851,
      2589189241,
      3069724005,
      3532540348,
      1274779536,
      3789419226,
      2764799539,
      1660621633,
      3471099624,
      4011903706,
      913787905,
      3497959166,
      737222580,
      2514213453,
      2928710040,
      3937242737,
      1804850592,
      3499020752,
      2949064160,
      2386320175,
      2390070455,
      2415321851,
      4061277028,
      2290661394,
      2416832540,
      1336762016,
      1754252060,
      3520065937,
      3014181293,
      791618072,
      3188594551,
      3933548030,
      2332172193,
      3852520463,
      3043980520,
      413987798,
      3465142937,
      3030929376,
      4245938359,
      2093235073,
      3534596313,
      375366246,
      2157278981,
      2479649556,
      555357303,
      3870105701,
      2008414854,
      3344188149,
      4221384143,
      3956125452,
      2067696032,
      3594591187,
      2921233993,
      2428461,
      544322398,
      577241275,
      1471733935,
      610547355,
      4027169054,
      1432588573,
      1507829418,
      2025931657,
      3646575487,
      545086370,
      48609733,
      2200306550,
      1653985193,
      298326376,
      1316178497,
      3007786442,
      2064951626,
      458293330,
      2589141269,
      3591329599,
      3164325604,
      727753846,
      2179363840,
      146436021,
      1461446943,
      4069977195,
      705550613,
      3059967265,
      3887724982,
      4281599278,
      3313849956,
      1404054877,
      2845806497,
      146425753,
      1854211946,
      1266315497,
      3048417604,
      3681880366,
      3289982499,
      290971e4,
      1235738493,
      2632868024,
      2414719590,
      3970600049,
      1771706367,
      1449415276,
      3266420449,
      422970021,
      1963543593,
      2690192192,
      3826793022,
      1062508698,
      1531092325,
      1804592342,
      2583117782,
      2714934279,
      4024971509,
      1294809318,
      4028980673,
      1289560198,
      2221992742,
      1669523910,
      35572830,
      157838143,
      1052438473,
      1016535060,
      1802137761,
      1753167236,
      1386275462,
      3080475397,
      2857371447,
      1040679964,
      2145300060,
      2390574316,
      1461121720,
      2956646967,
      4031777805,
      4028374788,
      33600511,
      2920084762,
      1018524850,
      629373528,
      3691585981,
      3515945977,
      2091462646,
      2486323059,
      586499841,
      988145025,
      935516892,
      3367335476,
      2599673255,
      2839830854,
      265290510,
      3972581182,
      2759138881,
      3795373465,
      1005194799,
      847297441,
      406762289,
      1314163512,
      1332590856,
      1866599683,
      4127851711,
      750260880,
      613907577,
      1450815602,
      3165620655,
      3734664991,
      3650291728,
      3012275730,
      3704569646,
      1427272223,
      778793252,
      1343938022,
      2676280711,
      2052605720,
      1946737175,
      3164576444,
      3914038668,
      3967478842,
      3682934266,
      1661551462,
      3294938066,
      4011595847,
      840292616,
      3712170807,
      616741398,
      312560963,
      711312465,
      1351876610,
      322626781,
      1910503582,
      271666773,
      2175563734,
      1594956187,
      70604529,
      3617834859,
      1007753275,
      1495573769,
      4069517037,
      2549218298,
      2663038764,
      504708206,
      2263041392,
      3941167025,
      2249088522,
      1514023603,
      1998579484,
      1312622330,
      694541497,
      2582060303,
      2151582166,
      1382467621,
      776784248,
      2618340202,
      3323268794,
      2497899128,
      2784771155,
      503983604,
      4076293799,
      907881277,
      423175695,
      432175456,
      1378068232,
      4145222326,
      3954048622,
      3938656102,
      3820766613,
      2793130115,
      2977904593,
      26017576,
      3274890735,
      3194772133,
      1700274565,
      1756076034,
      4006520079,
      3677328699,
      720338349,
      1533947780,
      354530856,
      688349552,
      3973924725,
      1637815568,
      332179504,
      3949051286,
      53804574,
      2852348879,
      3044236432,
      1282449977,
      3583942155,
      3416972820,
      4006381244,
      1617046695,
      2628476075,
      3002303598,
      1686838959,
      431878346,
      2686675385,
      1700445008,
      1080580658,
      1009431731,
      832498133,
      3223435511,
      2605976345,
      2271191193,
      2516031870,
      1648197032,
      4164389018,
      2548247927,
      300782431,
      375919233,
      238389289,
      3353747414,
      2531188641,
      2019080857,
      1475708069,
      455242339,
      2609103871,
      448939670,
      3451063019,
      1395535956,
      2413381860,
      1841049896,
      1491858159,
      885456874,
      4264095073,
      4001119347,
      1565136089,
      3898914787,
      1108368660,
      540939232,
      1173283510,
      2745871338,
      3681308437,
      4207628240,
      3343053890,
      4016749493,
      1699691293,
      1103962373,
      3625875870,
      2256883143,
      3830138730,
      1031889488,
      3479347698,
      1535977030,
      4236805024,
      3251091107,
      2132092099,
      1774941330,
      1199868427,
      1452454533,
      157007616,
      2904115357,
      342012276,
      595725824,
      1480756522,
      206960106,
      497939518,
      591360097,
      863170706,
      2375253569,
      3596610801,
      1814182875,
      2094937945,
      3421402208,
      1082520231,
      3463918190,
      2785509508,
      435703966,
      3908032597,
      1641649973,
      2842273706,
      3305899714,
      1510255612,
      2148256476,
      2655287854,
      3276092548,
      4258621189,
      236887753,
      3681803219,
      274041037,
      1734335097,
      3815195456,
      3317970021,
      1899903192,
      1026095262,
      4050517792,
      356393447,
      2410691914,
      3873677099,
      3682840055,
      3913112168,
      2491498743,
      4132185628,
      2489919796,
      1091903735,
      1979897079,
      3170134830,
      3567386728,
      3557303409,
      857797738,
      1136121015,
      1342202287,
      507115054,
      2535736646,
      337727348,
      3213592640,
      1301675037,
      2528481711,
      1895095763,
      1721773893,
      3216771564,
      62756741,
      2142006736,
      835421444,
      2531993523,
      1442658625,
      3659876326,
      2882144922,
      676362277,
      1392781812,
      170690266,
      3921047035,
      1759253602,
      3611846912,
      1745797284,
      664899054,
      1329594018,
      3901205900,
      3045908486,
      2062866102,
      2865634940,
      3543621612,
      3464012697,
      1080764994,
      553557557,
      3656615353,
      3996768171,
      991055499,
      499776247,
      1265440854,
      648242737,
      3940784050,
      980351604,
      3713745714,
      1749149687,
      3396870395,
      4211799374,
      3640570775,
      1161844396,
      3125318951,
      1431517754,
      545492359,
      4268468663,
      3499529547,
      1437099964,
      2702547544,
      3433638243,
      2581715763,
      2787789398,
      1060185593,
      1593081372,
      2418618748,
      4260947970,
      69676912,
      2159744348,
      86519011,
      2512459080,
      3838209314,
      1220612927,
      3339683548,
      133810670,
      1090789135,
      1078426020,
      1569222167,
      845107691,
      3583754449,
      4072456591,
      1091646820,
      628848692,
      1613405280,
      3757631651,
      526609435,
      236106946,
      48312990,
      2942717905,
      3402727701,
      1797494240,
      859738849,
      992217954,
      4005476642,
      2243076622,
      3870952857,
      3732016268,
      765654824,
      3490871365,
      2511836413,
      1685915746,
      3888969200,
      1414112111,
      2273134842,
      3281911079,
      4080962846,
      172450625,
      2569994100,
      980381355,
      4109958455,
      2819808352,
      2716589560,
      2568741196,
      3681446669,
      3329971472,
      1835478071,
      660984891,
      3704678404,
      4045999559,
      3422617507,
      3040415634,
      1762651403,
      1719377915,
      3470491036,
      2693910283,
      3642056355,
      3138596744,
      1364962596,
      2073328063,
      1983633131,
      926494387,
      3423689081,
      2150032023,
      4096667949,
      1749200295,
      3328846651,
      309677260,
      2016342300,
      1779581495,
      3079819751,
      111262694,
      1274766160,
      443224088,
      298511866,
      1025883608,
      3806446537,
      1145181785,
      168956806,
      3641502830,
      3584813610,
      1689216846,
      3666258015,
      3200248200,
      1692713982,
      2646376535,
      4042768518,
      1618508792,
      1610833997,
      3523052358,
      4130873264,
      2001055236,
      3610705100,
      2202168115,
      4028541809,
      2961195399,
      1006657119,
      2006996926,
      3186142756,
      1430667929,
      3210227297,
      1314452623,
      4074634658,
      4101304120,
      2273951170,
      1399257539,
      3367210612,
      3027628629,
      1190975929,
      2062231137,
      2333990788,
      2221543033,
      2438960610,
      1181637006,
      548689776,
      2362791313,
      3372408396,
      3104550113,
      3145860560,
      296247880,
      1970579870,
      3078560182,
      3769228297,
      1714227617,
      3291629107,
      3898220290,
      166772364,
      1251581989,
      493813264,
      448347421,
      195405023,
      2709975567,
      677966185,
      3703036547,
      1463355134,
      2715995803,
      1338867538,
      1343315457,
      2802222074,
      2684532164,
      233230375,
      2599980071,
      2000651841,
      3277868038,
      1638401717,
      4028070440,
      3237316320,
      6314154,
      819756386,
      300326615,
      590932579,
      1405279636,
      3267499572,
      3150704214,
      2428286686,
      3959192993,
      3461946742,
      1862657033,
      1266418056,
      963775037,
      2089974820,
      2263052895,
      1917689273,
      448879540,
      3550394620,
      3981727096,
      150775221,
      3627908307,
      1303187396,
      508620638,
      2975983352,
      2726630617,
      1817252668,
      1876281319,
      1457606340,
      908771278,
      3720792119,
      3617206836,
      2455994898,
      1729034894,
      1080033504,
      976866871,
      3556439503,
      2881648439,
      1522871579,
      1555064734,
      1336096578,
      3548522304,
      2579274686,
      3574697629,
      3205460757,
      3593280638,
      3338716283,
      3079412587,
      564236357,
      2993598910,
      1781952180,
      1464380207,
      3163844217,
      3332601554,
      1699332808,
      1393555694,
      1183702653,
      3581086237,
      1288719814,
      691649499,
      2847557200,
      2895455976,
      3193889540,
      2717570544,
      1781354906,
      1676643554,
      2592534050,
      3230253752,
      1126444790,
      2770207658,
      2633158820,
      2210423226,
      2615765581,
      2414155088,
      3127139286,
      673620729,
      2805611233,
      1269405062,
      4015350505,
      3341807571,
      4149409754,
      1057255273,
      2012875353,
      2162469141,
      2276492801,
      2601117357,
      993977747,
      3918593370,
      2654263191,
      753973209,
      36408145,
      2530585658,
      25011837,
      3520020182,
      2088578344,
      530523599,
      2918365339,
      1524020338,
      1518925132,
      3760827505,
      3759777254,
      1202760957,
      3985898139,
      3906192525,
      674977740,
      4174734889,
      2031300136,
      2019492241,
      3983892565,
      4153806404,
      3822280332,
      352677332,
      2297720250,
      60907813,
      90501309,
      3286998549,
      1016092578,
      2535922412,
      2839152426,
      457141659,
      509813237,
      4120667899,
      652014361,
      1966332200,
      2975202805,
      55981186,
      2327461051,
      676427537,
      3255491064,
      2882294119,
      3433927263,
      1307055953,
      942726286,
      933058658,
      2468411793,
      3933900994,
      4215176142,
      1361170020,
      2001714738,
      2830558078,
      3274259782,
      1222529897,
      1679025792,
      2729314320,
      3714953764,
      1770335741,
      151462246,
      3013232138,
      1682292957,
      1483529935,
      471910574,
      1539241949,
      458788160,
      3436315007,
      1807016891,
      3718408830,
      978976581,
      1043663428,
      3165965781,
      1927990952,
      4200891579,
      2372276910,
      3208408903,
      3533431907,
      1412390302,
      2931980059,
      4132332400,
      1947078029,
      3881505623,
      4168226417,
      2941484381,
      1077988104,
      1320477388,
      886195818,
      18198404,
      3786409e3,
      2509781533,
      112762804,
      3463356488,
      1866414978,
      891333506,
      18488651,
      661792760,
      1628790961,
      3885187036,
      3141171499,
      876946877,
      2693282273,
      1372485963,
      791857591,
      2686433993,
      3759982718,
      3167212022,
      3472953795,
      2716379847,
      445679433,
      3561995674,
      3504004811,
      3574258232,
      54117162,
      3331405415,
      2381918588,
      3769707343,
      4154350007,
      1140177722,
      4074052095,
      668550556,
      3214352940,
      367459370,
      261225585,
      2610173221,
      4209349473,
      3468074219,
      3265815641,
      314222801,
      3066103646,
      3808782860,
      282218597,
      3406013506,
      3773591054,
      379116347,
      1285071038,
      846784868,
      2669647154,
      3771962079,
      3550491691,
      2305946142,
      453669953,
      1268987020,
      3317592352,
      3279303384,
      3744833421,
      2610507566,
      3859509063,
      266596637,
      3847019092,
      517658769,
      3462560207,
      3443424879,
      370717030,
      4247526661,
      2224018117,
      4143653529,
      4112773975,
      2788324899,
      2477274417,
      1456262402,
      2901442914,
      1517677493,
      1846949527,
      2295493580,
      3734397586,
      2176403920,
      1280348187,
      1908823572,
      3871786941,
      846861322,
      1172426758,
      3287448474,
      3383383037,
      1655181056,
      3139813346,
      901632758,
      1897031941,
      2986607138,
      3066810236,
      3447102507,
      1393639104,
      373351379,
      950779232,
      625454576,
      3124240540,
      4148612726,
      2007998917,
      544563296,
      2244738638,
      2330496472,
      2058025392,
      1291430526,
      424198748,
      50039436,
      29584100,
      3605783033,
      2429876329,
      2791104160,
      1057563949,
      3255363231,
      3075367218,
      3463963227,
      1469046755,
      985887462
    ], de = [
      1332899944,
      1700884034,
      1701343084,
      1684370003,
      1668446532,
      1869963892
    ];
    function _e(K, ee, e, o) {
      var y, H = K[ee], z = K[ee + 1];
      return H ^= e[0], y = o[H >>> 24], y += o[256 | H >> 16 & 255], y ^= o[512 | H >> 8 & 255], y += o[768 | H & 255], z ^= y ^ e[1], y = o[z >>> 24], y += o[256 | z >> 16 & 255], y ^= o[512 | z >> 8 & 255], y += o[768 | z & 255], H ^= y ^ e[2], y = o[H >>> 24], y += o[256 | H >> 16 & 255], y ^= o[512 | H >> 8 & 255], y += o[768 | H & 255], z ^= y ^ e[3], y = o[z >>> 24], y += o[256 | z >> 16 & 255], y ^= o[512 | z >> 8 & 255], y += o[768 | z & 255], H ^= y ^ e[4], y = o[H >>> 24], y += o[256 | H >> 16 & 255], y ^= o[512 | H >> 8 & 255], y += o[768 | H & 255], z ^= y ^ e[5], y = o[z >>> 24], y += o[256 | z >> 16 & 255], y ^= o[512 | z >> 8 & 255], y += o[768 | z & 255], H ^= y ^ e[6], y = o[H >>> 24], y += o[256 | H >> 16 & 255], y ^= o[512 | H >> 8 & 255], y += o[768 | H & 255], z ^= y ^ e[7], y = o[z >>> 24], y += o[256 | z >> 16 & 255], y ^= o[512 | z >> 8 & 255], y += o[768 | z & 255], H ^= y ^ e[8], y = o[H >>> 24], y += o[256 | H >> 16 & 255], y ^= o[512 | H >> 8 & 255], y += o[768 | H & 255], z ^= y ^ e[9], y = o[z >>> 24], y += o[256 | z >> 16 & 255], y ^= o[512 | z >> 8 & 255], y += o[768 | z & 255], H ^= y ^ e[10], y = o[H >>> 24], y += o[256 | H >> 16 & 255], y ^= o[512 | H >> 8 & 255], y += o[768 | H & 255], z ^= y ^ e[11], y = o[z >>> 24], y += o[256 | z >> 16 & 255], y ^= o[512 | z >> 8 & 255], y += o[768 | z & 255], H ^= y ^ e[12], y = o[H >>> 24], y += o[256 | H >> 16 & 255], y ^= o[512 | H >> 8 & 255], y += o[768 | H & 255], z ^= y ^ e[13], y = o[z >>> 24], y += o[256 | z >> 16 & 255], y ^= o[512 | z >> 8 & 255], y += o[768 | z & 255], H ^= y ^ e[14], y = o[H >>> 24], y += o[256 | H >> 16 & 255], y ^= o[512 | H >> 8 & 255], y += o[768 | H & 255], z ^= y ^ e[15], y = o[z >>> 24], y += o[256 | z >> 16 & 255], y ^= o[512 | z >> 8 & 255], y += o[768 | z & 255], H ^= y ^ e[16], K[ee] = z ^ e[se + 1], K[ee + 1] = H, K;
    }
    function qe(K, ee) {
      for (var e = 0, o = 0; e < 4; ++e)
        o = o << 8 | K[ee] & 255, ee = (ee + 1) % K.length;
      return { key: o, offp: ee };
    }
    function Te(K, ee, e) {
      for (var o = 0, y = [0, 0], H = ee.length, z = e.length, B, w = 0; w < H; w++)
        B = qe(K, o), o = B.offp, ee[w] = ee[w] ^ B.key;
      for (w = 0; w < H; w += 2)
        y = _e(y, 0, ee, e), ee[w] = y[0], ee[w + 1] = y[1];
      for (w = 0; w < z; w += 2)
        y = _e(y, 0, ee, e), e[w] = y[0], e[w + 1] = y[1];
    }
    function ce(K, ee, e, o) {
      for (var y = 0, H = [0, 0], z = e.length, B = o.length, w, G = 0; G < z; G++)
        w = qe(ee, y), y = w.offp, e[G] = e[G] ^ w.key;
      for (y = 0, G = 0; G < z; G += 2)
        w = qe(K, y), y = w.offp, H[0] ^= w.key, w = qe(K, y), y = w.offp, H[1] ^= w.key, H = _e(H, 0, e, o), e[G] = H[0], e[G + 1] = H[1];
      for (G = 0; G < B; G += 2)
        w = qe(K, y), y = w.offp, H[0] ^= w.key, w = qe(K, y), y = w.offp, H[1] ^= w.key, H = _e(H, 0, e, o), o[G] = H[0], o[G + 1] = H[1];
    }
    function pe(K, ee, e, o, y) {
      var H = de.slice(), z = H.length, B;
      if (e < 4 || e > 31)
        if (B = Error("Illegal number of rounds (4-31): " + e), o) {
          F(o.bind(this, B));
          return;
        } else
          throw B;
      if (ee.length !== ie)
        if (B = Error("Illegal salt length: " + ee.length + " != " + ie), o) {
          F(o.bind(this, B));
          return;
        } else
          throw B;
      e = 1 << e >>> 0;
      var w, G, g = 0, J;
      Int32Array ? (w = new Int32Array(oe), G = new Int32Array(be)) : (w = oe.slice(), G = be.slice()), ce(ee, K, w, G);
      function le() {
        if (y && y(g / e), g < e)
          for (var Se = Date.now(); g < e && (g = g + 1, Te(K, w, G), Te(ee, w, G), !(Date.now() - Se > ae)); )
            ;
        else {
          for (g = 0; g < 64; g++)
            for (J = 0; J < z >> 1; J++)
              _e(H, J << 1, w, G);
          var ye = [];
          for (g = 0; g < z; g++)
            ye.push((H[g] >> 24 & 255) >>> 0), ye.push((H[g] >> 16 & 255) >>> 0), ye.push((H[g] >> 8 & 255) >>> 0), ye.push((H[g] & 255) >>> 0);
          if (o) {
            o(null, ye);
            return;
          } else
            return ye;
        }
        o && F(le);
      }
      if (typeof o != "undefined")
        le();
      else
        for (var ge; ; )
          if (typeof (ge = le()) != "undefined")
            return ge || [];
    }
    function Me(K, ee, e, o) {
      var y;
      if (typeof K != "string" || typeof ee != "string")
        if (y = Error("Invalid string / salt: Not a string"), e) {
          F(e.bind(this, y));
          return;
        } else
          throw y;
      var H, z;
      if (ee.charAt(0) !== "$" || ee.charAt(1) !== "2")
        if (y = Error("Invalid salt version: " + ee.substring(0, 2)), e) {
          F(e.bind(this, y));
          return;
        } else
          throw y;
      if (ee.charAt(2) === "$")
        H = "\0", z = 3;
      else {
        if (H = ee.charAt(2), H !== "a" && H !== "b" && H !== "y" || ee.charAt(3) !== "$")
          if (y = Error("Invalid salt revision: " + ee.substring(2, 4)), e) {
            F(e.bind(this, y));
            return;
          } else
            throw y;
        z = 4;
      }
      if (ee.charAt(z + 2) > "$")
        if (y = Error("Missing salt rounds"), e) {
          F(e.bind(this, y));
          return;
        } else
          throw y;
      var B = parseInt(ee.substring(z, z + 1), 10) * 10, w = parseInt(ee.substring(z + 1, z + 2), 10), G = B + w, g = ee.substring(z + 3, z + 25);
      K += H >= "a" ? "\0" : "";
      var J = l(K), le = V(g, ie);
      function ge(Se) {
        var ye = [];
        return ye.push("$2"), H >= "a" && ye.push(H), ye.push("$"), G < 10 && ye.push("0"), ye.push(G.toString()), ye.push("$"), ye.push(Q(le, le.length)), ye.push(Q(Se, de.length * 4 - 1)), ye.join("");
      }
      if (typeof e == "undefined")
        return ge(pe(J, le, G));
      pe(J, le, G, function(Se, ye) {
        Se ? e(Se, null) : e(null, ge(ye));
      }, o);
    }
    return c.encodeBase64 = Q, c.decodeBase64 = V, c;
  });
})(bcrypt$1);
var bcryptExports = bcrypt$1.exports;
const bcrypt = /* @__PURE__ */ getDefaultExportFromCjs(bcryptExports);
class FirebaseAuthAPI {
  constructor(c) {
    this.FIREBASE_AUTH_URL = "https://identitytoolkit.googleapis.com/v1/", this.BCRYPT_SALT = "$2a$10$QCJoWqnN.acrjPIgKYCthu";
    const O = new URL(this.FIREBASE_AUTH_URL);
    this.firebaseKey = c.apiKey, this.fetcher = new FetchAPI(O.toString());
  }
  checkError(c) {
    if (c.error)
      throw new Error(
        `Error code: ${c.error.code}, message: ${c.error.message}`
      );
  }
  signUpWithEmailPassword(c, O, q = !0) {
    return Be(this, null, function* () {
      let X = O;
      q && (X = bcrypt.hashSync(O, this.BCRYPT_SALT));
      const t = JSON.stringify({
        email: c,
        password: X,
        returnSecureToken: !0
      }), F = yield this.fetcher.send({
        url: "accounts:signUp",
        method: "POST",
        data: t,
        query: {
          key: this.firebaseKey
        },
        withCredentials: !1
      });
      return this.checkError(F.data), F.data;
    });
  }
  signInWithEmailPassword(c, O, q = !0) {
    return Be(this, null, function* () {
      let X = O;
      q && (X = bcrypt.hashSync(O, this.BCRYPT_SALT));
      const t = JSON.stringify({
        email: c,
        password: X,
        returnSecureToken: !0
      }), F = yield this.fetcher.send({
        url: "accounts:signInWithPassword",
        method: "POST",
        data: t,
        query: {
          key: this.firebaseKey
        },
        withCredentials: !1
      });
      return this.checkError(F.data), F.data;
    });
  }
  getCurrentUser(c) {
    return Be(this, null, function* () {
      const O = JSON.stringify({
        idToken: c
      }), q = yield this.fetcher.send({
        url: "accounts:lookup",
        method: "POST",
        data: O,
        query: {
          key: this.firebaseKey
        },
        withCredentials: !1
      });
      return this.checkError(q.data), q.data;
    });
  }
  getRefreshIdToken(c) {
    return Be(this, null, function* () {
      const O = JSON.stringify({
        grant_type: "refresh_token",
        refresh_token: c
      }), q = yield this.fetcher.send({
        url: "token",
        method: "POST",
        data: O,
        query: {
          key: this.firebaseKey
        },
        withCredentials: !1
      }), X = q.data;
      return this.checkError(q.data), X.id_token;
    });
  }
  resetPassword(c, O, q = !0) {
    return Be(this, null, function* () {
      let X = O;
      q && (X = bcrypt.hashSync(O, this.BCRYPT_SALT));
      const t = JSON.stringify({
        oobCode: c,
        newPassword: X
      }), F = yield this.fetcher.send({
        url: "accounts:resetPassword",
        method: "POST",
        data: t,
        query: {
          key: this.firebaseKey
        },
        withCredentials: !1
      });
      return this.checkError(F.data), F.data;
    });
  }
  verifyEmail(c) {
    return Be(this, null, function* () {
      const O = JSON.stringify({
        oobCode: c
      }), q = yield this.fetcher.send({
        url: "accounts:update",
        method: "POST",
        data: O,
        query: {
          key: this.firebaseKey
        },
        withCredentials: !1
      });
      return this.checkError(q.data), q.data;
    });
  }
  signInWithCustomToken(c) {
    return Be(this, null, function* () {
      const O = JSON.stringify({
        token: c,
        returnSecureToken: !0
      }), q = yield this.fetcher.send({
        url: "accounts:signInWithCustomToken",
        data: O,
        query: {
          key: this.firebaseKey
        },
        method: "POST",
        withCredentials: !1
      });
      return this.checkError(q.data), {
        idToken: q.data.idToken,
        refreshToken: q.data.refreshToken
      };
    });
  }
  updatePassword(c, O) {
    return Be(this, null, function* () {
      const q = bcrypt.hashSync(O, this.BCRYPT_SALT), X = JSON.stringify({
        idToken: c,
        password: q,
        returnSecureToken: !0
      }), t = yield this.fetcher.send({
        url: "accounts:update",
        method: "POST",
        data: X,
        query: {
          key: this.firebaseKey
        },
        withCredentials: !1
      });
      return this.checkError(t.data), t.data;
    });
  }
}
var S$1 = (P) => {
  throw TypeError(P);
}, h$1 = (P, c, O) => c.has(P) || S$1("Cannot " + O), n$1 = (P, c, O) => (h$1(P, c, "read from private field"), O ? O.call(P) : c.get(P)), f$1 = (P, c, O) => c.has(P) ? S$1("Cannot add the same private member more than once") : c instanceof WeakSet ? c.add(P) : c.set(P, O), s$1 = (P, c, O) => new Promise((q, X) => {
  var t = (U) => {
    try {
      l(O.next(U));
    } catch ($) {
      X($);
    }
  }, F = (U) => {
    try {
      l(O.throw(U));
    } catch ($) {
      X($);
    }
  }, l = (U) => U.done ? q(U.value) : Promise.resolve(U.value).then(t, F);
  l((O = O.apply(P, c)).next());
}), i$1;
const r$1 = class jt {
  constructor() {
    this.platform = "web";
  }
  getLocalStorageEnabled() {
    let c = !1;
    try {
      c = window.localStorage && !0;
    } catch (O) {
      c = !1;
    }
    return c;
  }
  setAllLocalStorage(c, O) {
    return s$1(this, null, function* () {
      if (!this.getLocalStorageEnabled()) {
        console.error(
          "Local storage is not available. We recommend using local storage to maintain login sessions."
        );
        return;
      }
      const q = JSON.stringify(O);
      localStorage.setItem(n$1(jt, i$1) + c, q);
    });
  }
  setLocalStorage(c, O, q) {
    return s$1(this, null, function* () {
      if (!this.getLocalStorageEnabled()) {
        console.error(
          "Local storage is not available. We recommend using local storage to maintain login sessions."
        );
        return;
      }
      const X = yield this.getAllLocalStorage(c);
      if (X) {
        X[O] = q, localStorage.setItem(
          n$1(jt, i$1) + c,
          // btoa(JSON.stringify(localData)),
          JSON.stringify(X)
        );
        return;
      }
      const t = { [O]: q };
      localStorage.setItem(
        n$1(jt, i$1) + c,
        // btoa(JSON.stringify(newData)),
        JSON.stringify(t)
      );
    });
  }
  getLocalStorage(c, O) {
    return s$1(this, null, function* () {
      if (!this.getLocalStorageEnabled()) {
        console.error(
          "Local storage is not available. We recommend using local storage to maintain login sessions."
        );
        return;
      }
      const q = yield this.getAllLocalStorage(c);
      try {
        if (q)
          return JSON.parse(q[O]);
      } catch (X) {
        if (q)
          return q[O];
      }
    });
  }
  getAllLocalStorage(c) {
    return s$1(this, null, function* () {
      if (!this.getLocalStorageEnabled()) {
        console.error(
          "Local storage is not available. We recommend using local storage to maintain login sessions."
        );
        return;
      }
      try {
        return localStorage.getItem(n$1(jt, i$1) + c) ? (
          // ? JSON.parse(atob(localStorage.getItem(this.#COOKIE_NAME + appId)))
          JSON.parse(localStorage.getItem(n$1(jt, i$1) + c))
        ) : void 0;
      } catch (O) {
        return;
      }
    });
  }
  clearLocalStorage(c, O) {
    return s$1(this, null, function* () {
      if (!this.getLocalStorageEnabled()) {
        console.error(
          "Local storage is not available. We recommend using local storage to maintain login sessions."
        );
        return;
      }
      if (yield this.getLocalStorage(c, O)) {
        const q = yield this.getAllLocalStorage(c);
        if (!q)
          return;
        delete q[O], localStorage.setItem(
          n$1(jt, i$1) + c,
          // btoa(JSON.stringify(localData)),
          JSON.stringify(q)
        );
      }
    });
  }
  clearAllLocalStorage(c) {
    return s$1(this, null, function* () {
      if (!this.getLocalStorageEnabled()) {
        console.error(
          "Local storage is not available. We recommend using local storage to maintain login sessions."
        );
        return;
      }
      localStorage.removeItem(n$1(jt, i$1) + c);
    });
  }
  setLoginUserLocalStorage(c, O, q) {
    return s$1(this, null, function* () {
      if (!this.getLocalStorageEnabled()) {
        console.error(
          "Local storage is not available. We recommend using local storage to maintain login sessions."
        );
        return;
      }
      const X = {};
      return X["firebase:wepin"] = Object.assign(
        { provider: O == null ? void 0 : O.provider },
        O == null ? void 0 : O.token
      ), X["wepin:connectUser"] = {
        accessToken: q.token.access,
        refreshToken: q.token.refresh
      }, X.user_id = q.userInfo.userId, X.user_info = {
        status: "success",
        userInfo: {
          userId: q.userInfo.userId,
          email: q.userInfo.email,
          provider: O.provider,
          use2FA: q.userInfo.use2FA >= 2
        }
      }, X.user_status = {
        loginStatus: q.loginStatus,
        pinRequired: q.loginStatus === "registerRequired" ? q.pinRequired : !1
      }, q.loginStatus !== "pinRequired" && q.walletId && (X.wallet_id = q.walletId, X.user_info.walletId = q.walletId), X.oauth_provider_pending = O.provider, this.setAllLocalStorage(c, X), {
        userInfo: X.user_info,
        connectUser: X["wepin:connectUser"]
      };
    });
  }
};
i$1 = /* @__PURE__ */ new WeakMap(), f$1(r$1, i$1, "wepin:auth:");
let m$1 = r$1;
const isErrorResponse = (P) => {
  const c = P.statusCode !== void 0 || P.status !== void 0, O = P.timestamp !== void 0 && P.message !== void 0 && P.path !== void 0;
  return c && O;
}, getBaseUrl = (P) => {
  if (P.slice(0, 8) === "ak_live_")
    return "https://sdk.wepin.io/v1";
  if (P.slice(0, 8) === "ak_test_")
    return "https://stage-sdk.wepin.io/v1";
  if (P.slice(0, 7) === "ak_dev_")
    return "https://dev-sdk.wepin.io/v1";
  if (P.slice(0, 13) === "local_ak_dev_")
    return "https://local-sdk.wepin.io/v1";
  throw new Error("Invalid appKey");
};
class APIRequest {
  constructor({
    data: c,
    headers: O,
    url: q,
    query: X,
    withCredentials: t = !1,
    method: F
  }) {
    this.data = c, this.headers = O, this.url = q, this.query = X, this.withCredentials = t, this.method = F;
  }
}
const APIEvents = {
  request: "request",
  response: "response"
};
let InvalidTokenError$1 = class extends Error {
};
InvalidTokenError$1.prototype.name = "InvalidTokenError";
function b64DecodeUnicode$1(P) {
  return decodeURIComponent(atob(P).replace(/(.)/g, (c, O) => {
    let q = O.charCodeAt(0).toString(16).toUpperCase();
    return q.length < 2 && (q = "0" + q), "%" + q;
  }));
}
function base64UrlDecode$1(P) {
  let c = P.replace(/-/g, "+").replace(/_/g, "/");
  switch (c.length % 4) {
    case 0:
      break;
    case 2:
      c += "==";
      break;
    case 3:
      c += "=";
      break;
    default:
      throw new Error("base64 string is not of the correct length");
  }
  try {
    return b64DecodeUnicode$1(c);
  } catch (O) {
    return atob(c);
  }
}
function jwtDecode$1(P, c) {
  if (typeof P != "string")
    throw new InvalidTokenError$1("Invalid token specified: must be a string");
  c || (c = {});
  const O = c.header === !0 ? 0 : 1, q = P.split(".")[O];
  if (typeof q != "string")
    throw new InvalidTokenError$1(`Invalid token specified: missing part #${O + 1}`);
  let X;
  try {
    X = base64UrlDecode$1(q);
  } catch (t) {
    throw new InvalidTokenError$1(`Invalid token specified: invalid base64 for part #${O + 1} (${t.message})`);
  }
  try {
    return JSON.parse(X);
  } catch (t) {
    throw new InvalidTokenError$1(`Invalid token specified: invalid json for part #${O + 1} (${t.message})`);
  }
}
const checkJwtToken = () => {
  const P = (c) => {
    var O;
    const q = c;
    return !q || ((O = jwtDecode$1(q)) == null ? void 0 : O.exp) <= Math.floor(Date.now() / 1e3) + 60;
  };
  return {
    // isExpiredAccessToken,
    checkTokenExpired: (c, O) => {
      if (!(c === "/app/info" || c === "/user/login" || c === "/user/oauth") && P(O)) {
        if (c !== "/access-token")
          throw new Error("token_expired");
        return;
      }
    }
  };
};
class WepinSDKFetchAPI extends FetchAPI {
  constructor(c, O) {
    super(), this.baseUrl = c, this.params = O, this.addListener(APIEvents.request, this.requestCallback), this.addListener(APIEvents.response, this.responseCallback);
  }
  send(c, O) {
    return Be(this, null, function* () {
      yield this.emitAsync(APIEvents.request, c, O || {});
      const { data: q, url: X, headers: t } = c, F = (() => {
        if (q instanceof FormData)
          return {};
      })();
      c.headers = Object.assign(t || {}, F);
      const l = yield _r(WepinSDKFetchAPI.prototype, this, "send").call(this, c, O);
      return yield this.setToken(X, l), yield this.emitAsync(
        APIEvents.response,
        l,
        O || {}
      ), l;
    });
  }
  setToken(c, O) {
    return Be(this, null, function* () {
      var q, X, t, F, l;
      if (!isErrorResponse(O.data))
        if (c === "user/login" && (q = O.data) != null && q.token)
          yield this.params.wepinFetch.setToken({
            accessToken: (X = O.data) == null ? void 0 : X.token.access,
            refreshToken: (t = O.data) == null ? void 0 : t.token.refresh
          });
        else if (c === "/user/access-token" && (F = O.data) != null && F.token) {
          const U = yield this.params.wepinFetch.Token();
          yield this.params.wepinFetch.setToken({
            accessToken: (l = O.data) == null ? void 0 : l.token,
            refreshToken: U == null ? void 0 : U.refreshToken
          });
        } else c === "user/logout" && (yield this.params.wepinFetch.setToken());
    });
  }
  requestCallback(c, O) {
    return Be(this, null, function* () {
      try {
        c.headers || (c.headers = {}), c.headers["X-API-KEY"] = this.params.appKey;
        const q = this.params.domain && this.params.domain.includes("localhost") ? "" : this.params.domain;
        c.headers["X-SDK-TYPE"] = this.params.sdk.type, c.headers["X-SDK-VERSION"] = this.params.sdk.version, c.headers["X-API-DOMAIN"] = q;
        const X = yield this.params.wepinFetch.Token();
        if (c.url === "/user/access-token" && Object.assign(c.query, { refresh_token: X == null ? void 0 : X.refreshToken }), O != null && O.ignoreCheckToken) return;
        try {
          const F = X == null ? void 0 : X.accessToken, { checkTokenExpired: l } = checkJwtToken();
          l(c.url, F);
        } catch (F) {
          const l = new APIRequest({
            url: "/user/access-token",
            method: "GET",
            withCredentials: !0
          });
          yield this.send(l, { ignoreCheckToken: !0 });
        }
        const t = X == null ? void 0 : X.accessToken;
        t && (c.headers.Authorization = `Bearer ${t}`);
      } catch (q) {
        throw new Error("Unauthorized Error");
      }
    });
  }
  responseCallback(c) {
    return Be(this, null, function* () {
      if (c.status === 401)
        throw new Error("Unauthorized Error");
    });
  }
  // private setUserInfo(url: string, response: any) {
  //   if (!isErrorResponse(response.data) && response.data?.userInfo) {
  //     // set token
  //     if (url === 'user/login') {
  //       WepinStorage.setLocalStorage('userInfo', response.data?.userInfo)
  //       if (response.data?.walletId) {
  //         WepinStorage.setLocalStorage('walletId', response.data?.walletId)
  //       }
  //     } else if (url === '/app/register') {
  //       if (response.data?.walletId) {
  //         WepinStorage.setLocalStorage('walletId', response.data?.walletId)
  //       }
  //     }
  //   }
  // }
}
class UserAPI {
  constructor(c) {
    this.fetcher = c, this.basePath = "/user";
  }
  // 2.1 Check User Email
  checkEmailExist(c) {
    return Be(this, null, function* () {
      const O = new APIRequest({
        url: `${this.basePath}/check-user`,
        method: "GET",
        query: c,
        withCredentials: !0
      });
      return (yield this.fetcher.send(O, {
        ignoreCheckToken: !0
      })).data;
    });
  }
  // 2.2 Get User PW State
  getUserPasswordState(c) {
    return Be(this, null, function* () {
      const O = new APIRequest({
        url: `${this.basePath}/password-state`,
        method: "GET",
        query: c,
        withCredentials: !0
      });
      return (yield this.fetcher.send(O, {
        ignoreCheckToken: !0
      })).data;
    });
  }
  // 2.3 Provider Login
  oAuth(c, O) {
    return Be(this, null, function* () {
      const q = new APIRequest({
        url: `${this.basePath}/oauth/login/${O.provider}`,
        method: "GET",
        query: c,
        withCredentials: !0
      });
      return (yield this.fetcher.send(q, {
        ignoreCheckToken: !0
      })).data;
    });
  }
  // 2.4 Verify User Email
  verify(c) {
    return Be(this, null, function* () {
      const O = new APIRequest({
        url: `${this.basePath}/verify`,
        method: "POST",
        data: c,
        withCredentials: !0
      });
      return (yield this.fetcher.send(O, {
        ignoreCheckToken: !0
      })).data;
    });
  }
  // 2.5 Login
  login(c) {
    return Be(this, null, function* () {
      const O = new APIRequest({
        url: `${this.basePath}/login`,
        method: "POST",
        data: c,
        withCredentials: !0
      });
      return (yield this.fetcher.send(O, { ignoreCheckToken: !0 })).data;
    });
  }
  // 2.6 Update User PW State
  updateUserPasswordState(c, O) {
    return Be(this, null, function* () {
      const q = new APIRequest({
        url: `${this.basePath}/${c.userId}/password-state`,
        method: "PATCH",
        data: O,
        withCredentials: !0
      });
      return (yield this.fetcher.send(q)).data;
    });
  }
  // 2.7 Update Terms Accepted
  updateTermsAccepted(c, O) {
    return Be(this, null, function* () {
      const q = new APIRequest({
        url: `${this.basePath}/${c.userId}/terms-accepted`,
        method: "PATCH",
        data: O,
        withCredentials: !0
      });
      return (yield this.fetcher.send(q)).data;
    });
  }
  // 2.8 Get Access Token
  refreshToken(c) {
    return Be(this, null, function* () {
      const O = new APIRequest({
        url: `${this.basePath}/access-token`,
        method: "GET",
        query: {
          userId: c.userId
        },
        withCredentials: !0
      });
      return (yield this.fetcher.send(O, { ignoreCheckToken: !0 })).data;
    });
  }
  // 2.9 Get Public Key
  fetchKey(c) {
    return Be(this, null, function* () {
      const O = new APIRequest({
        url: `${this.basePath}/pubkey`,
        method: "GET",
        query: {
          userId: c.userId
        },
        withCredentials: !0
      });
      return (yield this.fetcher.send(O)).data;
    });
  }
  // 2.11 Get Terms Accepted
  getTermsAccepted(c) {
    return Be(this, null, function* () {
      const O = new APIRequest({
        url: `${this.basePath}/${c.userId}/terms-accepted`,
        method: "GET",
        withCredentials: !0
      });
      return (yield this.fetcher.send(O)).data;
    });
  }
  // 2.12 Logout
  logout(c) {
    return Be(this, null, function* () {
      const O = new APIRequest({
        url: `${this.basePath}/${c.userId}/logout`,
        method: "POST",
        withCredentials: !0
      });
      return (yield this.fetcher.send(O)).data;
    });
  }
  // 2.13 Get Firebase Config
  getFirebaseConfig() {
    return Be(this, null, function* () {
      const c = new APIRequest({
        url: `${this.basePath}/firebase-config`,
        method: "GET",
        withCredentials: !0
      });
      return (yield this.fetcher.send(c, { ignoreCheckToken: !0 })).data;
    });
  }
  // 2.14 Login OAuth idToken
  loginOAuthIdToken(c) {
    return Be(this, null, function* () {
      const O = new APIRequest({
        url: `${this.basePath}/oauth/login/id-token`,
        method: "POST",
        data: c,
        withCredentials: !0
      });
      return (yield this.fetcher.send(O, { ignoreCheckToken: !0 })).data;
    });
  }
  // 2.15 Login OAuth AccessToken
  loginOAuthAccessToken(c) {
    return Be(this, null, function* () {
      const O = new APIRequest({
        url: `${this.basePath}/oauth/login/access-token`,
        method: "POST",
        data: c,
        withCredentials: !0
      });
      return (yield this.fetcher.send(O, { ignoreCheckToken: !0 })).data;
    });
  }
  // 2.18 Get User Info
  getUserInfo(c) {
    return Be(this, null, function* () {
      const O = new APIRequest({
        url: `${this.basePath}/${c.userId}/detail`,
        method: "GET",
        withCredentials: !0
      });
      return (yield this.fetcher.send(O)).data;
    });
  }
}
class WalletAPI {
  constructor(c) {
    this.fetcher = c, this.basePath = "/wallet";
  }
  // 3.1 Verify Wallet PIN
  verifyPin(c) {
    return Be(this, null, function* () {
      const O = new APIRequest({
        url: `${this.basePath}/pin/verify`,
        data: c,
        method: "POST",
        withCredentials: !0
      });
      return (yield this.fetcher.send(O)).data;
    });
  }
  // 3.2 Change Wallet PIN
  changePin(c) {
    return Be(this, null, function* () {
      const O = new APIRequest({
        url: `${this.basePath}/pin/change`,
        data: c,
        method: "PATCH",
        withCredentials: !0
      });
      return (yield this.fetcher.send(O)).data;
    });
  }
  // 3.3 Get Wallet Info
  fetchWalletInfo(c, O) {
    return Be(this, null, function* () {
      const q = new APIRequest({
        url: `${this.basePath}/${c.walletId}`,
        query: O,
        method: "GET",
        withCredentials: !0
      });
      return (yield this.fetcher.send(q)).data;
    });
  }
  // 3.4 Get Wallet Key Info
  getWalletKeyInfo(c, O) {
    return Be(this, null, function* () {
      const q = new APIRequest({
        url: `${this.basePath}/${c.walletId}/wallet-keyinfo`,
        query: O,
        method: "GET",
        withCredentials: !0
      });
      return (yield this.fetcher.send(q)).data;
    });
  }
  // 3.5 Reset Wallet PIN Try Count
  resetPinTryCount(c, O) {
    return Be(this, null, function* () {
      const q = new APIRequest({
        url: `${this.basePath}/${c.walletId}/pin/reset-try-count`,
        query: O,
        method: "GET",
        withCredentials: !0
      });
      return (yield this.fetcher.send(q)).data;
    });
  }
}
class AppAPI {
  constructor(c) {
    this.fetcher = c, this.basePath = "/app";
  }
  // 1.1 Get Theme
  getThemeById(c) {
    return Be(this, null, function* () {
      return (yield fetch(`${this.fetcher.baseUrl}/app/theme/${c.id}`, {
        method: "GET"
      })).json();
    });
  }
  getLayoutById(c) {
    return Be(this, null, function* () {
      return (yield fetch(`${this.fetcher.baseUrl}/app/layout/${c.id}`, {
        method: "GET"
      })).json();
    });
  }
  // 1.3 Get App Info
  getAppInfo(c) {
    return Be(this, null, function* () {
      const O = new APIRequest({
        url: `${this.basePath}/info`,
        query: c,
        method: "GET",
        withCredentials: !0
      });
      return (yield this.fetcher.send(O, {
        ignoreCheckToken: !0
      })).data;
    });
  }
  // 1.4 Get App Coins
  getAppCoins(c) {
    return Be(this, null, function* () {
      const O = new APIRequest({
        url: `${this.basePath}/coins`,
        method: "GET",
        query: c,
        withCredentials: !0
      });
      return (yield this.fetcher.send(O, {
        ignoreCheckToken: !0
      })).data;
    });
  }
  // 1.5 Get App Theme
  getAppTheme() {
    return Be(this, null, function* () {
      const c = new APIRequest({
        url: `${this.basePath}/theme`,
        method: "GET",
        withCredentials: !0
      });
      return (yield this.fetcher.send(c, {
        ignoreCheckToken: !0
      })).data;
    });
  }
  // 1.6 Register
  register(c) {
    return Be(this, null, function* () {
      const O = new APIRequest({
        url: `${this.basePath}/register`,
        method: "POST",
        data: c,
        withCredentials: !0
      });
      return (yield this.fetcher.send(O)).data;
    });
  }
}
class AccountAPI {
  constructor(c) {
    this.fetcher = c, this.basePath = "/account";
  }
  // 4.1 Readdress
  readdress(c) {
    return Be(this, null, function* () {
      const O = new APIRequest({
        url: `${this.basePath}/readdress`,
        data: c,
        method: "PATCH",
        withCredentials: !0
      });
      return (yield this.fetcher.send(O)).data;
    });
  }
  // 4.2 Get App Account
  getAppAccountList(c) {
    return Be(this, null, function* () {
      const O = new APIRequest({
        url: `${this.basePath}`,
        query: c,
        method: "GET",
        withCredentials: !0
      });
      return (yield this.fetcher.send(O)).data;
    });
  }
}
class AccountBalanceAPI {
  constructor(c) {
    this.fetcher = c, this.basePath = "/accountbalance";
  }
  // 5.1 Get Account Balance
  getAccountBalance(c) {
    return Be(this, null, function* () {
      const O = new APIRequest({
        url: `${this.basePath}/${c.accountId}/balance`,
        method: "GET",
        withCredentials: !0
      });
      return (yield this.fetcher.send(O)).data;
    });
  }
}
class NFTAPI {
  constructor(c) {
    this.fetcher = c, this.basePath = "/nft";
  }
  // 6.1 Get NFT supporting network list
  getSupportingNetworkList() {
    return Be(this, null, function* () {
      const c = new APIRequest({
        url: `${this.basePath}/support-network`,
        method: "GET",
        withCredentials: !0
      });
      return (yield this.fetcher.send(c, {
        // ignoreCheckToken: true,
      })).data;
    });
  }
  // 6.2 Get App NFTs
  getAppNFTList(c) {
    return Be(this, null, function* () {
      const O = new APIRequest({
        url: this.basePath,
        method: "GET",
        query: c,
        withCredentials: !0
      });
      return (yield this.fetcher.send(O)).data;
    });
  }
  // 6.3 Refresh NFTs
  refreshAppNFTList(c) {
    return Be(this, null, function* () {
      const O = new APIRequest({
        url: `${this.basePath}/refresh`,
        method: "GET",
        query: c,
        withCredentials: !0
      });
      return (yield this.fetcher.send(O)).data;
    });
  }
}
class TransactionAPI {
  constructor(c) {
    this.fetcher = c, this.basePath = "/tx";
  }
  // 7.1 Sign transaction
  sign(c) {
    return Be(this, null, function* () {
      const O = new APIRequest({
        url: `${this.basePath}/sign`,
        data: c,
        method: "POST",
        withCredentials: !0
      });
      return (yield this.fetcher.send(O)).data;
    });
  }
  // 7.2 Broadcast Transaction
  broadCast(c) {
    return Be(this, null, function* () {
      const O = new APIRequest({
        url: `${this.basePath}/broadcast`,
        data: c,
        method: "POST",
        withCredentials: !0
      });
      return (yield this.fetcher.send(O)).data;
    });
  }
  // 7.3 Get prepare transaction data
  prepareTransaction(c) {
    return Be(this, null, function* () {
      const O = new APIRequest({
        url: `${this.basePath}/prepare`,
        data: c,
        method: "POST",
        withCredentials: !0
      });
      return (yield this.fetcher.send(O)).data;
    });
  }
  // 7.4 Check Address validation
  checkAddressValidation(c) {
    return Be(this, null, function* () {
      const O = new APIRequest({
        url: `${this.basePath}/check_address`,
        query: c,
        method: "GET",
        withCredentials: !0
      });
      return (yield this.fetcher.send(O)).data;
    });
  }
}
class WepinSdkAPI {
  constructor(c, O) {
    const q = new WepinSDKFetchAPI(c, O);
    this.app = new AppAPI(q), this.user = new UserAPI(q), this.wallet = new WalletAPI(q), this.account = new AccountAPI(q), this.balance = new AccountBalanceAPI(q), this.nft = new NFTAPI(q), this.transaction = new TransactionAPI(q);
  }
}
class WepinFetch {
  constructor({
    appId: c,
    appKey: O,
    domain: q,
    sdk: X,
    storage: t
  }) {
    this.version = packageJson.version, this.appId = c, this._appKey = O, this._domain = q, this._token = void 0, this.sdk = X, this._wepinStorage = t != null ? t : new m$1();
  }
  init() {
    return Be(this, null, function* () {
      const c = yield WepinFetch.getFirebaseConfig(
        this._appKey,
        this.sdk.type,
        this.sdk.version
      );
      this.wepinFirebaseApi = new FirebaseAuthAPI(c), this.wepinApi = new WepinSdkAPI(getBaseUrl(this._appKey), {
        appId: this.appId,
        appKey: this._appKey,
        domain: this._domain,
        sdk: this.sdk,
        wepinFetch: this
      }), this._isInitialized = !0;
    });
  }
  isInitialized() {
    return this._isInitialized;
  }
  static getFirebaseConfig(c, O, q) {
    return Be(this, null, function* () {
      const X = getBaseUrl(c), t = yield (yield fetch(`${X}/user/firebase-config`, {
        method: "GET",
        headers: {
          "X-API-KEY": c,
          "X-SDK-TYPE": O,
          "X-SDK-VERSION": q,
          "Content-Type": "application/json"
        }
      })).text();
      return JSON.parse(atob(t));
    });
  }
  Token() {
    return Be(this, null, function* () {
      return this._token = yield this._wepinStorage.getLocalStorage(
        this.appId,
        "wepin:connectUser"
      ), this._token;
    });
  }
  setToken(c) {
    return Be(this, null, function* () {
      this._token = c, c ? yield this._wepinStorage.setLocalStorage(
        this.appId,
        "wepin:connectUser",
        c
      ) : yield this._wepinStorage.clearLocalStorage(
        this.appId,
        "wepin:connectUser"
      );
    });
  }
  // public finalize() {
  //   this._wepinStorage.clearLocalStorage(this.appId, 'wepin:connectUser')
  // }
}
var ProjectPlatformKind = /* @__PURE__ */ ((P) => (P[P.web = 1] = "web", P[P.android = 2] = "android", P[P.ios = 3] = "ios", P))(ProjectPlatformKind || {});
class InvalidTokenError extends Error {
}
InvalidTokenError.prototype.name = "InvalidTokenError";
function b64DecodeUnicode(P) {
  return decodeURIComponent(atob(P).replace(/(.)/g, (c, O) => {
    let q = O.charCodeAt(0).toString(16).toUpperCase();
    return q.length < 2 && (q = "0" + q), "%" + q;
  }));
}
function base64UrlDecode(P) {
  let c = P.replace(/-/g, "+").replace(/_/g, "/");
  switch (c.length % 4) {
    case 0:
      break;
    case 2:
      c += "==";
      break;
    case 3:
      c += "=";
      break;
    default:
      throw new Error("base64 string is not of the correct length");
  }
  try {
    return b64DecodeUnicode(c);
  } catch (O) {
    return atob(c);
  }
}
function jwtDecode(P, c) {
  if (typeof P != "string")
    throw new InvalidTokenError("Invalid token specified: must be a string");
  c || (c = {});
  const O = c.header === !0 ? 0 : 1, q = P.split(".")[O];
  if (typeof q != "string")
    throw new InvalidTokenError(`Invalid token specified: missing part #${O + 1}`);
  let X;
  try {
    X = base64UrlDecode(q);
  } catch (t) {
    throw new InvalidTokenError(`Invalid token specified: invalid base64 for part #${O + 1} (${t.message})`);
  }
  try {
    return JSON.parse(X);
  } catch (t) {
    throw new InvalidTokenError(`Invalid token specified: invalid json for part #${O + 1} (${t.message})`);
  }
}
const getAccountSDK = (P) => {
  let c = [];
  return P != null && P.length && (c = P.map((O) => O.contract && O.accountTokenId ? {
    network: O.network,
    address: O.address,
    contract: O.contract
    // name: account.name,
  } : {
    network: O.network,
    address: O.address
  })), c;
}, filterAccountList = (P, c) => {
  const { accounts: O, aa_accounts: q } = P;
  return c ? q ? O.concat(q) : O : O.map((t) => {
    const F = q == null ? void 0 : q.find(
      (l) => l.coinId === t.coinId && (l == null ? void 0 : l.contract) === (t == null ? void 0 : t.contract) && (l == null ? void 0 : l.eoaAddress) === t.address
    );
    return F || t;
  });
};
var S = (P) => {
  throw TypeError(P);
}, h = (P, c, O) => c.has(P) || S("Cannot " + O), n = (P, c, O) => (h(P, c, "read from private field"), O ? O.call(P) : c.get(P)), f = (P, c, O) => c.has(P) ? S("Cannot add the same private member more than once") : c instanceof WeakSet ? c.add(P) : c.set(P, O), s = (P, c, O) => new Promise((q, X) => {
  var t = (U) => {
    try {
      l(O.next(U));
    } catch ($) {
      X($);
    }
  }, F = (U) => {
    try {
      l(O.throw(U));
    } catch ($) {
      X($);
    }
  }, l = (U) => U.done ? q(U.value) : Promise.resolve(U.value).then(t, F);
  l((O = O.apply(P, c)).next());
}), i;
const r = class Nt {
  constructor() {
    this.platform = "web";
  }
  getLocalStorageEnabled() {
    let c = !1;
    try {
      c = window.localStorage && !0;
    } catch (O) {
      c = !1;
    }
    return c;
  }
  setAllLocalStorage(c, O) {
    return s(this, null, function* () {
      if (!this.getLocalStorageEnabled()) {
        console.error(
          "Local storage is not available. We recommend using local storage to maintain login sessions."
        );
        return;
      }
      const q = JSON.stringify(O);
      localStorage.setItem(n(Nt, i) + c, q);
    });
  }
  setLocalStorage(c, O, q) {
    return s(this, null, function* () {
      if (!this.getLocalStorageEnabled()) {
        console.error(
          "Local storage is not available. We recommend using local storage to maintain login sessions."
        );
        return;
      }
      const X = yield this.getAllLocalStorage(c);
      if (X) {
        X[O] = q, localStorage.setItem(
          n(Nt, i) + c,
          // btoa(JSON.stringify(localData)),
          JSON.stringify(X)
        );
        return;
      }
      const t = { [O]: q };
      localStorage.setItem(
        n(Nt, i) + c,
        // btoa(JSON.stringify(newData)),
        JSON.stringify(t)
      );
    });
  }
  getLocalStorage(c, O) {
    return s(this, null, function* () {
      if (!this.getLocalStorageEnabled()) {
        console.error(
          "Local storage is not available. We recommend using local storage to maintain login sessions."
        );
        return;
      }
      const q = yield this.getAllLocalStorage(c);
      try {
        if (q)
          return JSON.parse(q[O]);
      } catch (X) {
        if (q)
          return q[O];
      }
    });
  }
  getAllLocalStorage(c) {
    return s(this, null, function* () {
      if (!this.getLocalStorageEnabled()) {
        console.error(
          "Local storage is not available. We recommend using local storage to maintain login sessions."
        );
        return;
      }
      try {
        return localStorage.getItem(n(Nt, i) + c) ? (
          // ? JSON.parse(atob(localStorage.getItem(this.#COOKIE_NAME + appId)))
          JSON.parse(localStorage.getItem(n(Nt, i) + c))
        ) : void 0;
      } catch (O) {
        return;
      }
    });
  }
  clearLocalStorage(c, O) {
    return s(this, null, function* () {
      if (!this.getLocalStorageEnabled()) {
        console.error(
          "Local storage is not available. We recommend using local storage to maintain login sessions."
        );
        return;
      }
      if (yield this.getLocalStorage(c, O)) {
        const q = yield this.getAllLocalStorage(c);
        if (!q)
          return;
        delete q[O], localStorage.setItem(
          n(Nt, i) + c,
          // btoa(JSON.stringify(localData)),
          JSON.stringify(q)
        );
      }
    });
  }
  clearAllLocalStorage(c) {
    return s(this, null, function* () {
      if (!this.getLocalStorageEnabled()) {
        console.error(
          "Local storage is not available. We recommend using local storage to maintain login sessions."
        );
        return;
      }
      localStorage.removeItem(n(Nt, i) + c);
    });
  }
  setLoginUserLocalStorage(c, O, q) {
    return s(this, null, function* () {
      if (!this.getLocalStorageEnabled()) {
        console.error(
          "Local storage is not available. We recommend using local storage to maintain login sessions."
        );
        return;
      }
      const X = {};
      return X["firebase:wepin"] = Object.assign(
        { provider: O == null ? void 0 : O.provider },
        O == null ? void 0 : O.token
      ), X["wepin:connectUser"] = {
        accessToken: q.token.access,
        refreshToken: q.token.refresh
      }, X.user_id = q.userInfo.userId, X.user_info = {
        status: "success",
        userInfo: {
          userId: q.userInfo.userId,
          email: q.userInfo.email,
          provider: O.provider,
          use2FA: q.userInfo.use2FA >= 2
        }
      }, X.user_status = {
        loginStatus: q.loginStatus,
        pinRequired: q.loginStatus === "registerRequired" ? q.pinRequired : !1
      }, q.loginStatus !== "pinRequired" && q.walletId && (X.wallet_id = q.walletId, X.user_info.walletId = q.walletId), X.oauth_provider_pending = O.provider, this.setAllLocalStorage(c, X), {
        userInfo: X.user_info,
        connectUser: X["wepin:connectUser"]
      };
    });
  }
};
i = /* @__PURE__ */ new WeakMap(), f(r, i, "wepin:auth:");
let m = r;
var isNumeric = /^-?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i, mathceil = Math.ceil, mathfloor = Math.floor, bignumberError = "[BigNumber Error] ", tooManyDigits = bignumberError + "Number primitive has more than 15 significant digits: ", BASE = 1e14, LOG_BASE = 14, MAX_SAFE_INTEGER = 9007199254740991, POWS_TEN = [1, 10, 100, 1e3, 1e4, 1e5, 1e6, 1e7, 1e8, 1e9, 1e10, 1e11, 1e12, 1e13], SQRT_BASE = 1e7, MAX = 1e9;
function clone(P) {
  var c, O, q, X = oe.prototype = { constructor: oe, toString: null, valueOf: null }, t = new oe(1), F = 20, l = 4, U = -7, $ = 21, D = -1e7, Q = 1e7, V = !1, te = 1, ie = 0, ne = {
    prefix: "",
    groupSize: 3,
    secondaryGroupSize: 0,
    groupSeparator: ",",
    decimalSeparator: ".",
    fractionGroupSize: 0,
    fractionGroupSeparator: " ",
    // non-breaking space
    suffix: ""
  }, se = "0123456789abcdefghijklmnopqrstuvwxyz", ae = !0;
  function oe(ce, pe) {
    var Me, K, ee, e, o, y, H, z, B = this;
    if (!(B instanceof oe)) return new oe(ce, pe);
    if (pe == null) {
      if (ce && ce._isBigNumber === !0) {
        B.s = ce.s, !ce.c || ce.e > Q ? B.c = B.e = null : ce.e < D ? B.c = [B.e = 0] : (B.e = ce.e, B.c = ce.c.slice());
        return;
      }
      if ((y = typeof ce == "number") && ce * 0 == 0) {
        if (B.s = 1 / ce < 0 ? (ce = -ce, -1) : 1, ce === ~~ce) {
          for (e = 0, o = ce; o >= 10; o /= 10, e++) ;
          e > Q ? B.c = B.e = null : (B.e = e, B.c = [ce]);
          return;
        }
        z = String(ce);
      } else {
        if (!isNumeric.test(z = String(ce))) return q(B, z, y);
        B.s = z.charCodeAt(0) == 45 ? (z = z.slice(1), -1) : 1;
      }
      (e = z.indexOf(".")) > -1 && (z = z.replace(".", "")), (o = z.search(/e/i)) > 0 ? (e < 0 && (e = o), e += +z.slice(o + 1), z = z.substring(0, o)) : e < 0 && (e = z.length);
    } else {
      if (intCheck(pe, 2, se.length, "Base"), pe == 10 && ae)
        return B = new oe(ce), qe(B, F + B.e + 1, l);
      if (z = String(ce), y = typeof ce == "number") {
        if (ce * 0 != 0) return q(B, z, y, pe);
        if (B.s = 1 / ce < 0 ? (z = z.slice(1), -1) : 1, oe.DEBUG && z.replace(/^0\.0*|\./, "").length > 15)
          throw Error(tooManyDigits + ce);
      } else
        B.s = z.charCodeAt(0) === 45 ? (z = z.slice(1), -1) : 1;
      for (Me = se.slice(0, pe), e = o = 0, H = z.length; o < H; o++)
        if (Me.indexOf(K = z.charAt(o)) < 0) {
          if (K == ".") {
            if (o > e) {
              e = H;
              continue;
            }
          } else if (!ee && (z == z.toUpperCase() && (z = z.toLowerCase()) || z == z.toLowerCase() && (z = z.toUpperCase()))) {
            ee = !0, o = -1, e = 0;
            continue;
          }
          return q(B, String(ce), y, pe);
        }
      y = !1, z = O(z, pe, 10, B.s), (e = z.indexOf(".")) > -1 ? z = z.replace(".", "") : e = z.length;
    }
    for (o = 0; z.charCodeAt(o) === 48; o++) ;
    for (H = z.length; z.charCodeAt(--H) === 48; ) ;
    if (z = z.slice(o, ++H)) {
      if (H -= o, y && oe.DEBUG && H > 15 && (ce > MAX_SAFE_INTEGER || ce !== mathfloor(ce)))
        throw Error(tooManyDigits + B.s * ce);
      if ((e = e - o - 1) > Q)
        B.c = B.e = null;
      else if (e < D)
        B.c = [B.e = 0];
      else {
        if (B.e = e, B.c = [], o = (e + 1) % LOG_BASE, e < 0 && (o += LOG_BASE), o < H) {
          for (o && B.c.push(+z.slice(0, o)), H -= LOG_BASE; o < H; )
            B.c.push(+z.slice(o, o += LOG_BASE));
          o = LOG_BASE - (z = z.slice(o)).length;
        } else
          o -= H;
        for (; o--; z += "0") ;
        B.c.push(+z);
      }
    } else
      B.c = [B.e = 0];
  }
  oe.clone = clone, oe.ROUND_UP = 0, oe.ROUND_DOWN = 1, oe.ROUND_CEIL = 2, oe.ROUND_FLOOR = 3, oe.ROUND_HALF_UP = 4, oe.ROUND_HALF_DOWN = 5, oe.ROUND_HALF_EVEN = 6, oe.ROUND_HALF_CEIL = 7, oe.ROUND_HALF_FLOOR = 8, oe.EUCLID = 9, oe.config = oe.set = function(ce) {
    var pe, Me;
    if (ce != null)
      if (typeof ce == "object") {
        if (ce.hasOwnProperty(pe = "DECIMAL_PLACES") && (Me = ce[pe], intCheck(Me, 0, MAX, pe), F = Me), ce.hasOwnProperty(pe = "ROUNDING_MODE") && (Me = ce[pe], intCheck(Me, 0, 8, pe), l = Me), ce.hasOwnProperty(pe = "EXPONENTIAL_AT") && (Me = ce[pe], Me && Me.pop ? (intCheck(Me[0], -MAX, 0, pe), intCheck(Me[1], 0, MAX, pe), U = Me[0], $ = Me[1]) : (intCheck(Me, -MAX, MAX, pe), U = -($ = Me < 0 ? -Me : Me))), ce.hasOwnProperty(pe = "RANGE"))
          if (Me = ce[pe], Me && Me.pop)
            intCheck(Me[0], -MAX, -1, pe), intCheck(Me[1], 1, MAX, pe), D = Me[0], Q = Me[1];
          else if (intCheck(Me, -MAX, MAX, pe), Me)
            D = -(Q = Me < 0 ? -Me : Me);
          else
            throw Error(bignumberError + pe + " cannot be zero: " + Me);
        if (ce.hasOwnProperty(pe = "CRYPTO"))
          if (Me = ce[pe], Me === !!Me)
            if (Me)
              if (typeof crypto != "undefined" && crypto && (crypto.getRandomValues || crypto.randomBytes))
                V = Me;
              else
                throw V = !Me, Error(bignumberError + "crypto unavailable");
            else
              V = Me;
          else
            throw Error(bignumberError + pe + " not true or false: " + Me);
        if (ce.hasOwnProperty(pe = "MODULO_MODE") && (Me = ce[pe], intCheck(Me, 0, 9, pe), te = Me), ce.hasOwnProperty(pe = "POW_PRECISION") && (Me = ce[pe], intCheck(Me, 0, MAX, pe), ie = Me), ce.hasOwnProperty(pe = "FORMAT"))
          if (Me = ce[pe], typeof Me == "object") ne = Me;
          else throw Error(bignumberError + pe + " not an object: " + Me);
        if (ce.hasOwnProperty(pe = "ALPHABET"))
          if (Me = ce[pe], typeof Me == "string" && !/^.?$|[+\-.\s]|(.).*\1/.test(Me))
            ae = Me.slice(0, 10) == "0123456789", se = Me;
          else
            throw Error(bignumberError + pe + " invalid: " + Me);
      } else
        throw Error(bignumberError + "Object expected: " + ce);
    return {
      DECIMAL_PLACES: F,
      ROUNDING_MODE: l,
      EXPONENTIAL_AT: [U, $],
      RANGE: [D, Q],
      CRYPTO: V,
      MODULO_MODE: te,
      POW_PRECISION: ie,
      FORMAT: ne,
      ALPHABET: se
    };
  }, oe.isBigNumber = function(ce) {
    if (!ce || ce._isBigNumber !== !0) return !1;
    if (!oe.DEBUG) return !0;
    var pe, Me, K = ce.c, ee = ce.e, e = ce.s;
    e: if ({}.toString.call(K) == "[object Array]") {
      if ((e === 1 || e === -1) && ee >= -MAX && ee <= MAX && ee === mathfloor(ee)) {
        if (K[0] === 0) {
          if (ee === 0 && K.length === 1) return !0;
          break e;
        }
        if (pe = (ee + 1) % LOG_BASE, pe < 1 && (pe += LOG_BASE), String(K[0]).length == pe) {
          for (pe = 0; pe < K.length; pe++)
            if (Me = K[pe], Me < 0 || Me >= BASE || Me !== mathfloor(Me)) break e;
          if (Me !== 0) return !0;
        }
      }
    } else if (K === null && ee === null && (e === null || e === 1 || e === -1))
      return !0;
    throw Error(bignumberError + "Invalid BigNumber: " + ce);
  }, oe.maximum = oe.max = function() {
    return de(arguments, -1);
  }, oe.minimum = oe.min = function() {
    return de(arguments, 1);
  }, oe.random = function() {
    var ce = 9007199254740992, pe = Math.random() * ce & 2097151 ? function() {
      return mathfloor(Math.random() * ce);
    } : function() {
      return (Math.random() * 1073741824 | 0) * 8388608 + (Math.random() * 8388608 | 0);
    };
    return function(Me) {
      var K, ee, e, o, y, H = 0, z = [], B = new oe(t);
      if (Me == null ? Me = F : intCheck(Me, 0, MAX), o = mathceil(Me / LOG_BASE), V)
        if (crypto.getRandomValues) {
          for (K = crypto.getRandomValues(new Uint32Array(o *= 2)); H < o; )
            y = K[H] * 131072 + (K[H + 1] >>> 11), y >= 9e15 ? (ee = crypto.getRandomValues(new Uint32Array(2)), K[H] = ee[0], K[H + 1] = ee[1]) : (z.push(y % 1e14), H += 2);
          H = o / 2;
        } else if (crypto.randomBytes) {
          for (K = crypto.randomBytes(o *= 7); H < o; )
            y = (K[H] & 31) * 281474976710656 + K[H + 1] * 1099511627776 + K[H + 2] * 4294967296 + K[H + 3] * 16777216 + (K[H + 4] << 16) + (K[H + 5] << 8) + K[H + 6], y >= 9e15 ? crypto.randomBytes(7).copy(K, H) : (z.push(y % 1e14), H += 7);
          H = o / 7;
        } else
          throw V = !1, Error(bignumberError + "crypto unavailable");
      if (!V)
        for (; H < o; )
          y = pe(), y < 9e15 && (z[H++] = y % 1e14);
      for (o = z[--H], Me %= LOG_BASE, o && Me && (y = POWS_TEN[LOG_BASE - Me], z[H] = mathfloor(o / y) * y); z[H] === 0; z.pop(), H--) ;
      if (H < 0)
        z = [e = 0];
      else {
        for (e = -1; z[0] === 0; z.splice(0, 1), e -= LOG_BASE) ;
        for (H = 1, y = z[0]; y >= 10; y /= 10, H++) ;
        H < LOG_BASE && (e -= LOG_BASE - H);
      }
      return B.e = e, B.c = z, B;
    };
  }(), oe.sum = function() {
    for (var ce = 1, pe = arguments, Me = new oe(pe[0]); ce < pe.length; ) Me = Me.plus(pe[ce++]);
    return Me;
  }, O = /* @__PURE__ */ function() {
    var ce = "0123456789";
    function pe(Me, K, ee, e) {
      for (var o, y = [0], H, z = 0, B = Me.length; z < B; ) {
        for (H = y.length; H--; y[H] *= K) ;
        for (y[0] += e.indexOf(Me.charAt(z++)), o = 0; o < y.length; o++)
          y[o] > ee - 1 && (y[o + 1] == null && (y[o + 1] = 0), y[o + 1] += y[o] / ee | 0, y[o] %= ee);
      }
      return y.reverse();
    }
    return function(Me, K, ee, e, o) {
      var y, H, z, B, w, G, g, J, le = Me.indexOf("."), ge = F, Se = l;
      for (le >= 0 && (B = ie, ie = 0, Me = Me.replace(".", ""), J = new oe(K), G = J.pow(Me.length - le), ie = B, J.c = pe(
        toFixedPoint(coeffToString(G.c), G.e, "0"),
        10,
        ee,
        ce
      ), J.e = J.c.length), g = pe(Me, K, ee, o ? (y = se, ce) : (y = ce, se)), z = B = g.length; g[--B] == 0; g.pop()) ;
      if (!g[0]) return y.charAt(0);
      if (le < 0 ? --z : (G.c = g, G.e = z, G.s = e, G = c(G, J, ge, Se, ee), g = G.c, w = G.r, z = G.e), H = z + ge + 1, le = g[H], B = ee / 2, w = w || H < 0 || g[H + 1] != null, w = Se < 4 ? (le != null || w) && (Se == 0 || Se == (G.s < 0 ? 3 : 2)) : le > B || le == B && (Se == 4 || w || Se == 6 && g[H - 1] & 1 || Se == (G.s < 0 ? 8 : 7)), H < 1 || !g[0])
        Me = w ? toFixedPoint(y.charAt(1), -ge, y.charAt(0)) : y.charAt(0);
      else {
        if (g.length = H, w)
          for (--ee; ++g[--H] > ee; )
            g[H] = 0, H || (++z, g = [1].concat(g));
        for (B = g.length; !g[--B]; ) ;
        for (le = 0, Me = ""; le <= B; Me += y.charAt(g[le++])) ;
        Me = toFixedPoint(Me, z, y.charAt(0));
      }
      return Me;
    };
  }(), c = /* @__PURE__ */ function() {
    function ce(K, ee, e) {
      var o, y, H, z, B = 0, w = K.length, G = ee % SQRT_BASE, g = ee / SQRT_BASE | 0;
      for (K = K.slice(); w--; )
        H = K[w] % SQRT_BASE, z = K[w] / SQRT_BASE | 0, o = g * H + z * G, y = G * H + o % SQRT_BASE * SQRT_BASE + B, B = (y / e | 0) + (o / SQRT_BASE | 0) + g * z, K[w] = y % e;
      return B && (K = [B].concat(K)), K;
    }
    function pe(K, ee, e, o) {
      var y, H;
      if (e != o)
        H = e > o ? 1 : -1;
      else
        for (y = H = 0; y < e; y++)
          if (K[y] != ee[y]) {
            H = K[y] > ee[y] ? 1 : -1;
            break;
          }
      return H;
    }
    function Me(K, ee, e, o) {
      for (var y = 0; e--; )
        K[e] -= y, y = K[e] < ee[e] ? 1 : 0, K[e] = y * o + K[e] - ee[e];
      for (; !K[0] && K.length > 1; K.splice(0, 1)) ;
    }
    return function(K, ee, e, o, y) {
      var H, z, B, w, G, g, J, le, ge, Se, ye, fe, he, Re, ke, me, ve, Ae = K.s == ee.s ? 1 : -1, $e = K.c, Oe = ee.c;
      if (!$e || !$e[0] || !Oe || !Oe[0])
        return new oe(
          // Return NaN if either NaN, or both Infinity or 0.
          !K.s || !ee.s || ($e ? Oe && $e[0] == Oe[0] : !Oe) ? NaN : (
            // Return ±0 if x is ±0 or y is ±Infinity, or return ±Infinity as y is ±0.
            $e && $e[0] == 0 || !Oe ? Ae * 0 : Ae / 0
          )
        );
      for (le = new oe(Ae), ge = le.c = [], z = K.e - ee.e, Ae = e + z + 1, y || (y = BASE, z = bitFloor(K.e / LOG_BASE) - bitFloor(ee.e / LOG_BASE), Ae = Ae / LOG_BASE | 0), B = 0; Oe[B] == ($e[B] || 0); B++) ;
      if (Oe[B] > ($e[B] || 0) && z--, Ae < 0)
        ge.push(1), w = !0;
      else {
        for (Re = $e.length, me = Oe.length, B = 0, Ae += 2, G = mathfloor(y / (Oe[0] + 1)), G > 1 && (Oe = ce(Oe, G, y), $e = ce($e, G, y), me = Oe.length, Re = $e.length), he = me, Se = $e.slice(0, me), ye = Se.length; ye < me; Se[ye++] = 0) ;
        ve = Oe.slice(), ve = [0].concat(ve), ke = Oe[0], Oe[1] >= y / 2 && ke++;
        do {
          if (G = 0, H = pe(Oe, Se, me, ye), H < 0) {
            if (fe = Se[0], me != ye && (fe = fe * y + (Se[1] || 0)), G = mathfloor(fe / ke), G > 1)
              for (G >= y && (G = y - 1), g = ce(Oe, G, y), J = g.length, ye = Se.length; pe(g, Se, J, ye) == 1; )
                G--, Me(g, me < J ? ve : Oe, J, y), J = g.length, H = 1;
            else
              G == 0 && (H = G = 1), g = Oe.slice(), J = g.length;
            if (J < ye && (g = [0].concat(g)), Me(Se, g, ye, y), ye = Se.length, H == -1)
              for (; pe(Oe, Se, me, ye) < 1; )
                G++, Me(Se, me < ye ? ve : Oe, ye, y), ye = Se.length;
          } else H === 0 && (G++, Se = [0]);
          ge[B++] = G, Se[0] ? Se[ye++] = $e[he] || 0 : (Se = [$e[he]], ye = 1);
        } while ((he++ < Re || Se[0] != null) && Ae--);
        w = Se[0] != null, ge[0] || ge.splice(0, 1);
      }
      if (y == BASE) {
        for (B = 1, Ae = ge[0]; Ae >= 10; Ae /= 10, B++) ;
        qe(le, e + (le.e = B + z * LOG_BASE - 1) + 1, o, w);
      } else
        le.e = z, le.r = +w;
      return le;
    };
  }();
  function be(ce, pe, Me, K) {
    var ee, e, o, y, H;
    if (Me == null ? Me = l : intCheck(Me, 0, 8), !ce.c) return ce.toString();
    if (ee = ce.c[0], o = ce.e, pe == null)
      H = coeffToString(ce.c), H = K == 1 || K == 2 && (o <= U || o >= $) ? toExponential(H, o) : toFixedPoint(H, o, "0");
    else if (ce = qe(new oe(ce), pe, Me), e = ce.e, H = coeffToString(ce.c), y = H.length, K == 1 || K == 2 && (pe <= e || e <= U)) {
      for (; y < pe; H += "0", y++) ;
      H = toExponential(H, e);
    } else if (pe -= o, H = toFixedPoint(H, e, "0"), e + 1 > y) {
      if (--pe > 0) for (H += "."; pe--; H += "0") ;
    } else if (pe += e - y, pe > 0)
      for (e + 1 == y && (H += "."); pe--; H += "0") ;
    return ce.s < 0 && ee ? "-" + H : H;
  }
  function de(ce, pe) {
    for (var Me, K, ee = 1, e = new oe(ce[0]); ee < ce.length; ee++)
      K = new oe(ce[ee]), (!K.s || (Me = compare(e, K)) === pe || Me === 0 && e.s === pe) && (e = K);
    return e;
  }
  function _e(ce, pe, Me) {
    for (var K = 1, ee = pe.length; !pe[--ee]; pe.pop()) ;
    for (ee = pe[0]; ee >= 10; ee /= 10, K++) ;
    return (Me = K + Me * LOG_BASE - 1) > Q ? ce.c = ce.e = null : Me < D ? ce.c = [ce.e = 0] : (ce.e = Me, ce.c = pe), ce;
  }
  q = /* @__PURE__ */ function() {
    var ce = /^(-?)0([xbo])(?=\w[\w.]*$)/i, pe = /^([^.]+)\.$/, Me = /^\.([^.]+)$/, K = /^-?(Infinity|NaN)$/, ee = /^\s*\+(?=[\w.])|^\s+|\s+$/g;
    return function(e, o, y, H) {
      var z, B = y ? o : o.replace(ee, "");
      if (K.test(B))
        e.s = isNaN(B) ? null : B < 0 ? -1 : 1;
      else {
        if (!y && (B = B.replace(ce, function(w, G, g) {
          return z = (g = g.toLowerCase()) == "x" ? 16 : g == "b" ? 2 : 8, !H || H == z ? G : w;
        }), H && (z = H, B = B.replace(pe, "$1").replace(Me, "0.$1")), o != B))
          return new oe(B, z);
        if (oe.DEBUG)
          throw Error(bignumberError + "Not a" + (H ? " base " + H : "") + " number: " + o);
        e.s = null;
      }
      e.c = e.e = null;
    };
  }();
  function qe(ce, pe, Me, K) {
    var ee, e, o, y, H, z, B, w = ce.c, G = POWS_TEN;
    if (w) {
      e: {
        for (ee = 1, y = w[0]; y >= 10; y /= 10, ee++) ;
        if (e = pe - ee, e < 0)
          e += LOG_BASE, o = pe, H = w[z = 0], B = mathfloor(H / G[ee - o - 1] % 10);
        else if (z = mathceil((e + 1) / LOG_BASE), z >= w.length)
          if (K) {
            for (; w.length <= z; w.push(0)) ;
            H = B = 0, ee = 1, e %= LOG_BASE, o = e - LOG_BASE + 1;
          } else
            break e;
        else {
          for (H = y = w[z], ee = 1; y >= 10; y /= 10, ee++) ;
          e %= LOG_BASE, o = e - LOG_BASE + ee, B = o < 0 ? 0 : mathfloor(H / G[ee - o - 1] % 10);
        }
        if (K = K || pe < 0 || // Are there any non-zero digits after the rounding digit?
        // The expression  n % pows10[d - j - 1]  returns all digits of n to the right
        // of the digit at j, e.g. if n is 908714 and j is 2, the expression gives 714.
        w[z + 1] != null || (o < 0 ? H : H % G[ee - o - 1]), K = Me < 4 ? (B || K) && (Me == 0 || Me == (ce.s < 0 ? 3 : 2)) : B > 5 || B == 5 && (Me == 4 || K || Me == 6 && // Check whether the digit to the left of the rounding digit is odd.
        (e > 0 ? o > 0 ? H / G[ee - o] : 0 : w[z - 1]) % 10 & 1 || Me == (ce.s < 0 ? 8 : 7)), pe < 1 || !w[0])
          return w.length = 0, K ? (pe -= ce.e + 1, w[0] = G[(LOG_BASE - pe % LOG_BASE) % LOG_BASE], ce.e = -pe || 0) : w[0] = ce.e = 0, ce;
        if (e == 0 ? (w.length = z, y = 1, z--) : (w.length = z + 1, y = G[LOG_BASE - e], w[z] = o > 0 ? mathfloor(H / G[ee - o] % G[o]) * y : 0), K)
          for (; ; )
            if (z == 0) {
              for (e = 1, o = w[0]; o >= 10; o /= 10, e++) ;
              for (o = w[0] += y, y = 1; o >= 10; o /= 10, y++) ;
              e != y && (ce.e++, w[0] == BASE && (w[0] = 1));
              break;
            } else {
              if (w[z] += y, w[z] != BASE) break;
              w[z--] = 0, y = 1;
            }
        for (e = w.length; w[--e] === 0; w.pop()) ;
      }
      ce.e > Q ? ce.c = ce.e = null : ce.e < D && (ce.c = [ce.e = 0]);
    }
    return ce;
  }
  function Te(ce) {
    var pe, Me = ce.e;
    return Me === null ? ce.toString() : (pe = coeffToString(ce.c), pe = Me <= U || Me >= $ ? toExponential(pe, Me) : toFixedPoint(pe, Me, "0"), ce.s < 0 ? "-" + pe : pe);
  }
  return X.absoluteValue = X.abs = function() {
    var ce = new oe(this);
    return ce.s < 0 && (ce.s = 1), ce;
  }, X.comparedTo = function(ce, pe) {
    return compare(this, new oe(ce, pe));
  }, X.decimalPlaces = X.dp = function(ce, pe) {
    var Me, K, ee, e = this;
    if (ce != null)
      return intCheck(ce, 0, MAX), pe == null ? pe = l : intCheck(pe, 0, 8), qe(new oe(e), ce + e.e + 1, pe);
    if (!(Me = e.c)) return null;
    if (K = ((ee = Me.length - 1) - bitFloor(this.e / LOG_BASE)) * LOG_BASE, ee = Me[ee]) for (; ee % 10 == 0; ee /= 10, K--) ;
    return K < 0 && (K = 0), K;
  }, X.dividedBy = X.div = function(ce, pe) {
    return c(this, new oe(ce, pe), F, l);
  }, X.dividedToIntegerBy = X.idiv = function(ce, pe) {
    return c(this, new oe(ce, pe), 0, 1);
  }, X.exponentiatedBy = X.pow = function(ce, pe) {
    var Me, K, ee, e, o, y, H, z, B, w = this;
    if (ce = new oe(ce), ce.c && !ce.isInteger())
      throw Error(bignumberError + "Exponent not an integer: " + Te(ce));
    if (pe != null && (pe = new oe(pe)), y = ce.e > 14, !w.c || !w.c[0] || w.c[0] == 1 && !w.e && w.c.length == 1 || !ce.c || !ce.c[0])
      return B = new oe(Math.pow(+Te(w), y ? ce.s * (2 - isOdd(ce)) : +Te(ce))), pe ? B.mod(pe) : B;
    if (H = ce.s < 0, pe) {
      if (pe.c ? !pe.c[0] : !pe.s) return new oe(NaN);
      K = !H && w.isInteger() && pe.isInteger(), K && (w = w.mod(pe));
    } else {
      if (ce.e > 9 && (w.e > 0 || w.e < -1 || (w.e == 0 ? w.c[0] > 1 || y && w.c[1] >= 24e7 : w.c[0] < 8e13 || y && w.c[0] <= 9999975e7)))
        return e = w.s < 0 && isOdd(ce) ? -0 : 0, w.e > -1 && (e = 1 / e), new oe(H ? 1 / e : e);
      ie && (e = mathceil(ie / LOG_BASE + 2));
    }
    for (y ? (Me = new oe(0.5), H && (ce.s = 1), z = isOdd(ce)) : (ee = Math.abs(+Te(ce)), z = ee % 2), B = new oe(t); ; ) {
      if (z) {
        if (B = B.times(w), !B.c) break;
        e ? B.c.length > e && (B.c.length = e) : K && (B = B.mod(pe));
      }
      if (ee) {
        if (ee = mathfloor(ee / 2), ee === 0) break;
        z = ee % 2;
      } else if (ce = ce.times(Me), qe(ce, ce.e + 1, 1), ce.e > 14)
        z = isOdd(ce);
      else {
        if (ee = +Te(ce), ee === 0) break;
        z = ee % 2;
      }
      w = w.times(w), e ? w.c && w.c.length > e && (w.c.length = e) : K && (w = w.mod(pe));
    }
    return K ? B : (H && (B = t.div(B)), pe ? B.mod(pe) : e ? qe(B, ie, l, o) : B);
  }, X.integerValue = function(ce) {
    var pe = new oe(this);
    return ce == null ? ce = l : intCheck(ce, 0, 8), qe(pe, pe.e + 1, ce);
  }, X.isEqualTo = X.eq = function(ce, pe) {
    return compare(this, new oe(ce, pe)) === 0;
  }, X.isFinite = function() {
    return !!this.c;
  }, X.isGreaterThan = X.gt = function(ce, pe) {
    return compare(this, new oe(ce, pe)) > 0;
  }, X.isGreaterThanOrEqualTo = X.gte = function(ce, pe) {
    return (pe = compare(this, new oe(ce, pe))) === 1 || pe === 0;
  }, X.isInteger = function() {
    return !!this.c && bitFloor(this.e / LOG_BASE) > this.c.length - 2;
  }, X.isLessThan = X.lt = function(ce, pe) {
    return compare(this, new oe(ce, pe)) < 0;
  }, X.isLessThanOrEqualTo = X.lte = function(ce, pe) {
    return (pe = compare(this, new oe(ce, pe))) === -1 || pe === 0;
  }, X.isNaN = function() {
    return !this.s;
  }, X.isNegative = function() {
    return this.s < 0;
  }, X.isPositive = function() {
    return this.s > 0;
  }, X.isZero = function() {
    return !!this.c && this.c[0] == 0;
  }, X.minus = function(ce, pe) {
    var Me, K, ee, e, o = this, y = o.s;
    if (ce = new oe(ce, pe), pe = ce.s, !y || !pe) return new oe(NaN);
    if (y != pe)
      return ce.s = -pe, o.plus(ce);
    var H = o.e / LOG_BASE, z = ce.e / LOG_BASE, B = o.c, w = ce.c;
    if (!H || !z) {
      if (!B || !w) return B ? (ce.s = -pe, ce) : new oe(w ? o : NaN);
      if (!B[0] || !w[0])
        return w[0] ? (ce.s = -pe, ce) : new oe(B[0] ? o : (
          // IEEE 754 (2008) 6.3: n - n = -0 when rounding to -Infinity
          l == 3 ? -0 : 0
        ));
    }
    if (H = bitFloor(H), z = bitFloor(z), B = B.slice(), y = H - z) {
      for ((e = y < 0) ? (y = -y, ee = B) : (z = H, ee = w), ee.reverse(), pe = y; pe--; ee.push(0)) ;
      ee.reverse();
    } else
      for (K = (e = (y = B.length) < (pe = w.length)) ? y : pe, y = pe = 0; pe < K; pe++)
        if (B[pe] != w[pe]) {
          e = B[pe] < w[pe];
          break;
        }
    if (e && (ee = B, B = w, w = ee, ce.s = -ce.s), pe = (K = w.length) - (Me = B.length), pe > 0) for (; pe--; B[Me++] = 0) ;
    for (pe = BASE - 1; K > y; ) {
      if (B[--K] < w[K]) {
        for (Me = K; Me && !B[--Me]; B[Me] = pe) ;
        --B[Me], B[K] += BASE;
      }
      B[K] -= w[K];
    }
    for (; B[0] == 0; B.splice(0, 1), --z) ;
    return B[0] ? _e(ce, B, z) : (ce.s = l == 3 ? -1 : 1, ce.c = [ce.e = 0], ce);
  }, X.modulo = X.mod = function(ce, pe) {
    var Me, K, ee = this;
    return ce = new oe(ce, pe), !ee.c || !ce.s || ce.c && !ce.c[0] ? new oe(NaN) : !ce.c || ee.c && !ee.c[0] ? new oe(ee) : (te == 9 ? (K = ce.s, ce.s = 1, Me = c(ee, ce, 0, 3), ce.s = K, Me.s *= K) : Me = c(ee, ce, 0, te), ce = ee.minus(Me.times(ce)), !ce.c[0] && te == 1 && (ce.s = ee.s), ce);
  }, X.multipliedBy = X.times = function(ce, pe) {
    var Me, K, ee, e, o, y, H, z, B, w, G, g, J, le, ge, Se = this, ye = Se.c, fe = (ce = new oe(ce, pe)).c;
    if (!ye || !fe || !ye[0] || !fe[0])
      return !Se.s || !ce.s || ye && !ye[0] && !fe || fe && !fe[0] && !ye ? ce.c = ce.e = ce.s = null : (ce.s *= Se.s, !ye || !fe ? ce.c = ce.e = null : (ce.c = [0], ce.e = 0)), ce;
    for (K = bitFloor(Se.e / LOG_BASE) + bitFloor(ce.e / LOG_BASE), ce.s *= Se.s, H = ye.length, w = fe.length, H < w && (J = ye, ye = fe, fe = J, ee = H, H = w, w = ee), ee = H + w, J = []; ee--; J.push(0)) ;
    for (le = BASE, ge = SQRT_BASE, ee = w; --ee >= 0; ) {
      for (Me = 0, G = fe[ee] % ge, g = fe[ee] / ge | 0, o = H, e = ee + o; e > ee; )
        z = ye[--o] % ge, B = ye[o] / ge | 0, y = g * z + B * G, z = G * z + y % ge * ge + J[e] + Me, Me = (z / le | 0) + (y / ge | 0) + g * B, J[e--] = z % le;
      J[e] = Me;
    }
    return Me ? ++K : J.splice(0, 1), _e(ce, J, K);
  }, X.negated = function() {
    var ce = new oe(this);
    return ce.s = -ce.s || null, ce;
  }, X.plus = function(ce, pe) {
    var Me, K = this, ee = K.s;
    if (ce = new oe(ce, pe), pe = ce.s, !ee || !pe) return new oe(NaN);
    if (ee != pe)
      return ce.s = -pe, K.minus(ce);
    var e = K.e / LOG_BASE, o = ce.e / LOG_BASE, y = K.c, H = ce.c;
    if (!e || !o) {
      if (!y || !H) return new oe(ee / 0);
      if (!y[0] || !H[0]) return H[0] ? ce : new oe(y[0] ? K : ee * 0);
    }
    if (e = bitFloor(e), o = bitFloor(o), y = y.slice(), ee = e - o) {
      for (ee > 0 ? (o = e, Me = H) : (ee = -ee, Me = y), Me.reverse(); ee--; Me.push(0)) ;
      Me.reverse();
    }
    for (ee = y.length, pe = H.length, ee - pe < 0 && (Me = H, H = y, y = Me, pe = ee), ee = 0; pe; )
      ee = (y[--pe] = y[pe] + H[pe] + ee) / BASE | 0, y[pe] = BASE === y[pe] ? 0 : y[pe] % BASE;
    return ee && (y = [ee].concat(y), ++o), _e(ce, y, o);
  }, X.precision = X.sd = function(ce, pe) {
    var Me, K, ee, e = this;
    if (ce != null && ce !== !!ce)
      return intCheck(ce, 1, MAX), pe == null ? pe = l : intCheck(pe, 0, 8), qe(new oe(e), ce, pe);
    if (!(Me = e.c)) return null;
    if (ee = Me.length - 1, K = ee * LOG_BASE + 1, ee = Me[ee]) {
      for (; ee % 10 == 0; ee /= 10, K--) ;
      for (ee = Me[0]; ee >= 10; ee /= 10, K++) ;
    }
    return ce && e.e + 1 > K && (K = e.e + 1), K;
  }, X.shiftedBy = function(ce) {
    return intCheck(ce, -MAX_SAFE_INTEGER, MAX_SAFE_INTEGER), this.times("1e" + ce);
  }, X.squareRoot = X.sqrt = function() {
    var ce, pe, Me, K, ee, e = this, o = e.c, y = e.s, H = e.e, z = F + 4, B = new oe("0.5");
    if (y !== 1 || !o || !o[0])
      return new oe(!y || y < 0 && (!o || o[0]) ? NaN : o ? e : 1 / 0);
    if (y = Math.sqrt(+Te(e)), y == 0 || y == 1 / 0 ? (pe = coeffToString(o), (pe.length + H) % 2 == 0 && (pe += "0"), y = Math.sqrt(+pe), H = bitFloor((H + 1) / 2) - (H < 0 || H % 2), y == 1 / 0 ? pe = "5e" + H : (pe = y.toExponential(), pe = pe.slice(0, pe.indexOf("e") + 1) + H), Me = new oe(pe)) : Me = new oe(y + ""), Me.c[0]) {
      for (H = Me.e, y = H + z, y < 3 && (y = 0); ; )
        if (ee = Me, Me = B.times(ee.plus(c(e, ee, z, 1))), coeffToString(ee.c).slice(0, y) === (pe = coeffToString(Me.c)).slice(0, y))
          if (Me.e < H && --y, pe = pe.slice(y - 3, y + 1), pe == "9999" || !K && pe == "4999") {
            if (!K && (qe(ee, ee.e + F + 2, 0), ee.times(ee).eq(e))) {
              Me = ee;
              break;
            }
            z += 4, y += 4, K = 1;
          } else {
            (!+pe || !+pe.slice(1) && pe.charAt(0) == "5") && (qe(Me, Me.e + F + 2, 1), ce = !Me.times(Me).eq(e));
            break;
          }
    }
    return qe(Me, Me.e + F + 1, l, ce);
  }, X.toExponential = function(ce, pe) {
    return ce != null && (intCheck(ce, 0, MAX), ce++), be(this, ce, pe, 1);
  }, X.toFixed = function(ce, pe) {
    return ce != null && (intCheck(ce, 0, MAX), ce = ce + this.e + 1), be(this, ce, pe);
  }, X.toFormat = function(ce, pe, Me) {
    var K, ee = this;
    if (Me == null)
      ce != null && pe && typeof pe == "object" ? (Me = pe, pe = null) : ce && typeof ce == "object" ? (Me = ce, ce = pe = null) : Me = ne;
    else if (typeof Me != "object")
      throw Error(bignumberError + "Argument not an object: " + Me);
    if (K = ee.toFixed(ce, pe), ee.c) {
      var e, o = K.split("."), y = +Me.groupSize, H = +Me.secondaryGroupSize, z = Me.groupSeparator || "", B = o[0], w = o[1], G = ee.s < 0, g = G ? B.slice(1) : B, J = g.length;
      if (H && (e = y, y = H, H = e, J -= e), y > 0 && J > 0) {
        for (e = J % y || y, B = g.substr(0, e); e < J; e += y) B += z + g.substr(e, y);
        H > 0 && (B += z + g.slice(e)), G && (B = "-" + B);
      }
      K = w ? B + (Me.decimalSeparator || "") + ((H = +Me.fractionGroupSize) ? w.replace(
        new RegExp("\\d{" + H + "}\\B", "g"),
        "$&" + (Me.fractionGroupSeparator || "")
      ) : w) : B;
    }
    return (Me.prefix || "") + K + (Me.suffix || "");
  }, X.toFraction = function(ce) {
    var pe, Me, K, ee, e, o, y, H, z, B, w, G, g = this, J = g.c;
    if (ce != null && (y = new oe(ce), !y.isInteger() && (y.c || y.s !== 1) || y.lt(t)))
      throw Error(bignumberError + "Argument " + (y.isInteger() ? "out of range: " : "not an integer: ") + Te(y));
    if (!J) return new oe(g);
    for (pe = new oe(t), z = Me = new oe(t), K = H = new oe(t), G = coeffToString(J), e = pe.e = G.length - g.e - 1, pe.c[0] = POWS_TEN[(o = e % LOG_BASE) < 0 ? LOG_BASE + o : o], ce = !ce || y.comparedTo(pe) > 0 ? e > 0 ? pe : z : y, o = Q, Q = 1 / 0, y = new oe(G), H.c[0] = 0; B = c(y, pe, 0, 1), ee = Me.plus(B.times(K)), ee.comparedTo(ce) != 1; )
      Me = K, K = ee, z = H.plus(B.times(ee = z)), H = ee, pe = y.minus(B.times(ee = pe)), y = ee;
    return ee = c(ce.minus(Me), K, 0, 1), H = H.plus(ee.times(z)), Me = Me.plus(ee.times(K)), H.s = z.s = g.s, e = e * 2, w = c(z, K, e, l).minus(g).abs().comparedTo(
      c(H, Me, e, l).minus(g).abs()
    ) < 1 ? [z, K] : [H, Me], Q = o, w;
  }, X.toNumber = function() {
    return +Te(this);
  }, X.toPrecision = function(ce, pe) {
    return ce != null && intCheck(ce, 1, MAX), be(this, ce, pe, 2);
  }, X.toString = function(ce) {
    var pe, Me = this, K = Me.s, ee = Me.e;
    return ee === null ? K ? (pe = "Infinity", K < 0 && (pe = "-" + pe)) : pe = "NaN" : (ce == null ? pe = ee <= U || ee >= $ ? toExponential(coeffToString(Me.c), ee) : toFixedPoint(coeffToString(Me.c), ee, "0") : ce === 10 && ae ? (Me = qe(new oe(Me), F + ee + 1, l), pe = toFixedPoint(coeffToString(Me.c), Me.e, "0")) : (intCheck(ce, 2, se.length, "Base"), pe = O(toFixedPoint(coeffToString(Me.c), ee, "0"), 10, ce, K, !0)), K < 0 && Me.c[0] && (pe = "-" + pe)), pe;
  }, X.valueOf = X.toJSON = function() {
    return Te(this);
  }, X._isBigNumber = !0, X[Symbol.toStringTag] = "BigNumber", X[Symbol.for("nodejs.util.inspect.custom")] = X.valueOf, P != null && oe.set(P), oe;
}
function bitFloor(P) {
  var c = P | 0;
  return P > 0 || P === c ? c : c - 1;
}
function coeffToString(P) {
  for (var c, O, q = 1, X = P.length, t = P[0] + ""; q < X; ) {
    for (c = P[q++] + "", O = LOG_BASE - c.length; O--; c = "0" + c) ;
    t += c;
  }
  for (X = t.length; t.charCodeAt(--X) === 48; ) ;
  return t.slice(0, X + 1 || 1);
}
function compare(P, c) {
  var O, q, X = P.c, t = c.c, F = P.s, l = c.s, U = P.e, $ = c.e;
  if (!F || !l) return null;
  if (O = X && !X[0], q = t && !t[0], O || q) return O ? q ? 0 : -l : F;
  if (F != l) return F;
  if (O = F < 0, q = U == $, !X || !t) return q ? 0 : !X ^ O ? 1 : -1;
  if (!q) return U > $ ^ O ? 1 : -1;
  for (l = (U = X.length) < ($ = t.length) ? U : $, F = 0; F < l; F++) if (X[F] != t[F]) return X[F] > t[F] ^ O ? 1 : -1;
  return U == $ ? 0 : U > $ ^ O ? 1 : -1;
}
function intCheck(P, c, O, q) {
  if (P < c || P > O || P !== mathfloor(P))
    throw Error(bignumberError + (q || "Argument") + (typeof P == "number" ? P < c || P > O ? " out of range: " : " not an integer: " : " not a primitive number: ") + String(P));
}
function isOdd(P) {
  var c = P.c.length - 1;
  return bitFloor(P.e / LOG_BASE) == c && P.c[c] % 2 != 0;
}
function toExponential(P, c) {
  return (P.length > 1 ? P.charAt(0) + "." + P.slice(1) : P) + (c < 0 ? "e" : "e+") + c;
}
function toFixedPoint(P, c, O) {
  var q, X;
  if (c < 0) {
    for (X = O + "."; ++c; X += O) ;
    P = X + P;
  } else if (q = P.length, ++c > q) {
    for (X = O, c -= q; --c; X += O) ;
    P += X;
  } else c < q && (P = P.slice(0, c) + "." + P.slice(c));
  return P;
}
var BigNumber = clone();
const filterAccountBalance = (P, c, O) => {
  const q = P.filter(
    (t) => t.accountId === c.accountId && t.accountTokenId
  ), X = O.tokens.length ? O.tokens.filter(
    (t) => q.find((F) => F.contract === t.contract)
  ).map((t) => {
    const F = Xt({}, t);
    return delete F.tokenId, delete F.decimals, F.balance = getBalanceWithDecimal(t.balance, t.decimals), F;
  }) : [];
  return {
    network: c.network,
    address: c.address,
    balance: getBalanceWithDecimal(O.balance, O.decimals),
    symbol: c.symbol,
    tokens: X
  };
}, getBalanceWithDecimal = (P, c) => {
  if (!c || !P) return "0";
  const O = new BigNumber(P).shiftedBy(-c).toFixed();
  return O === "NaN" ? "0" : O;
};
class WepinSDK extends SafeEventEmitter {
  // _userInfo: IWepinUser
  constructor({
    appId: c,
    appKey: O,
    wepinModal: q,
    wepinStorage: X
  }) {
    super(), this.version = PackageJson.version, console.log(`WepinWeb SDK v${this.version}`), this._isInitialized = !1, this._wepinLifeCycle = "not_initialized", this._wepinAppId = c, this._wepinAppKey = O, this._wepinModal = q || new A(), this._wepinStorage = X || new m(), this.type = this._wepinStorage.platform, this.setModeByAppKey(O);
  }
  setModeByAppKey(c) {
    if (c.slice(0, 8) === "ak_live_") {
      this._modeByAppKey = "production";
      return;
    } else if (c.slice(0, 8) === "ak_test_") {
      this._modeByAppKey = "test";
      return;
    } else if (c.slice(0, 7) === "ak_dev_") {
      this._modeByAppKey = "development";
      return;
    } else if (c.slice(0, 13) === "local_ak_dev_")
      this._modeByAppKey = "local";
    else
      throw new Error("Wepin.setModeByAppKey: Invalid appKey");
  }
  get modeByAppKey() {
    if (this._modeByAppKey === void 0)
      throw new Error("Wepin.modeByAppKey: wepin widget has to be initialized");
    return this._modeByAppKey;
  }
  toJSON() {
    return "";
  }
  get wepinStorage() {
    return this._wepinStorage;
  }
  /**
   * Initialize Wepin Object. It returns widget instance.
   * @param attributes {type: 'show' | 'hide', defaultLanguage: 'ko' | 'en', defaultCurrency: 'KRW' | 'USD', loginProviders?: Array<LoginProviders>}
   * @returns
   */
  init() {
    return wt(this, arguments, function* (c = {
      type: "hide",
      defaultLanguage: WEPIN_DEFAULT_LANG,
      defaultCurrency: WEPIN_DEFAULT_CURRENCY
    }) {
      var X, t, F;
      if (this._isInitialized)
        throw new Error("Wepin is already initialized!");
      LOG.debug("attributes", c), c && (c.defaultLanguage = (X = c.defaultLanguage) != null ? X : WEPIN_DEFAULT_LANG, c.defaultCurrency = (t = c.defaultCurrency) != null ? t : WEPIN_DEFAULT_CURRENCY, c.type = (F = c.type) != null ? F : "hide"), this.wepinAppAttributes = c, LOG.debug("wepinAppAttributes", this.wepinAppAttributes), this.wepinDomain = this._wepinModal.domain, this._isInitialized = !1, this._wepinLifeCycle = "initializing", this._wepinFetch = new WepinFetch({
        appId: this._wepinAppId,
        appKey: this._wepinAppKey,
        domain: this.wepinDomain,
        sdk: { version: this.version, type: `${this.type}-sdk` },
        storage: this._wepinStorage
      }), yield this._wepinFetch.init();
      const O = yield this._wepinFetch.wepinApi.app.getAppInfo({
        platform: ProjectPlatformKind[this.type],
        withNetwork: !1
      });
      if (isErrorResponse(O))
        throw new Error(O.message);
      this._wepinAppId = this._wepinFetch.appId = O.appInfo.id;
      const q = yield this._wepinStorage.getLocalStorage(
        this._wepinAppId,
        "wepin:connectUser"
      );
      q && (LOG.debug("wepinToken", q), yield this._wepinFetch.setToken(q), LOG.debug("token", this._wepinFetch.Token)), this._isInitialized = !0, (yield this.checkExpiredToken()) ? this._wepinLifeCycle = "initialized" : this._wepinLifeCycle = "login";
    });
  }
  get wepinWidget() {
    return this._widget;
  }
  set wepinWidget(c) {
    this._widget = c;
  }
  /**
   * Check if wepin is initialized.
   *
   * @returns
   */
  isInitialized() {
    return !!this._isInitialized;
  }
  /**
   * Change the language and currency of the widget.
   * @param language 'ko'|'en'
   * @param currency 'KRW'|'USD'
   * @returns
   * @example
   * ```typescript
   * wepin.changeLanguage({
   *  currency: 'USD',
   * language: 'en'
   * })
   * ```
   * @example
   * ```typescript
   * wepin.changeLanguage({
   * currency: 'KRW',
   * language: 'ko'
   * })
   * ```
   */
  changeLanguage({
    currency: c,
    language: O
  }) {
    this.wepinAppAttributes.defaultCurrency = c, this.wepinAppAttributes.defaultLanguage = O;
  }
  //init, login되지 않으면 open 못하게!
  /**
   * It opens widget window.
   */
  openWidget() {
    return wt(this, null, function* () {
      if ((yield this.getStatus()) !== "login")
        throw new Error(
          "Wepin.openWidget: You can open it only if you are logged in to the wepin."
        );
      yield this._open();
    });
  }
  _open(c) {
    return wt(this, null, function* () {
      try {
        let O = Utils.getUrls(this._modeByAppKey).wepinWebview;
        if (this._widget && this._widget.isOpen) {
          LOG.debug("already opened widget", this._widget);
          return;
        }
        c != null && c.url && (O += c.url), this._EL = getEventListener(this, {
          appKey: this._wepinAppKey,
          appId: this._wepinAppId
        }), c != null && c.isHide || this.wepinAppAttributes.type !== "show" && (c != null && c.isInit) ? this._widget = yield this._wepinModal.openModal(O, this._EL, {
          isHide: !0
        }) : (c == null ? void 0 : c.type) === "WINDOW" ? this._widget = yield this._wepinModal.openAuthBrowser(O, this._EL) : this._widget = yield this._wepinModal.openModal(O, this._EL), LOG.debug("openWidget this._widget", this._widget);
      } catch (O) {
        throw LOG.error(O), new Error("Wepin.openWidget: Can't open wepin sdk widget");
      }
    });
  }
  /**
   * It closes widget itself.
   */
  closeWidget() {
    if (LOG.debug("closeWidget this._widget", this._widget), !this._isInitialized)
      throw new Error("Wepin.closeWidget: wepin sdk has to be initialized");
    if (this._widget)
      this._close();
    else
      throw new Error("Wepin.closeWidget: wepin sdk widget is not exist");
  }
  _close() {
    LOG.debug("close this._widget", this._widget), this.removeAllListeners(), this._widget && (this._widget.close(), this._widget = void 0), this.specifiedEmail = void 0;
  }
  setToken(c) {
    return wt(this, null, function* () {
      yield this._wepinFetch.setToken(c);
    });
  }
  checkExpiredToken() {
    return wt(this, null, function* () {
      try {
        const c = yield this._wepinStorage.getLocalStorage(
          this._wepinAppId,
          "wepin:connectUser"
        );
        if (!c) return !0;
        if (jwtDecode(c.accessToken).exp < Math.floor(Date.now() / 1e3) + 60) {
          yield this._wepinFetch.setToken(c);
          const q = yield this._wepinStorage.getLocalStorage(
            this._wepinAppId,
            "user_id"
          ), X = yield this._wepinFetch.wepinApi.user.refreshToken({
            userId: q
          });
          return isErrorResponse(X) ? !0 : (c.accessToken = X.token, yield this._wepinStorage.setLocalStorage(
            this._wepinAppId,
            "wepin:connectUser",
            c
          ), !1);
        } else return !1;
      } catch (c) {
        return !0;
      }
    });
  }
  /**
   * Returns the user's login information.
   *
   * @param email Encourage users to log in with the email specified in the app.
   * @returns {Promise<IWepinUser>}
   * @example
   * ```typescript
   * wepin.loginWithUI().then((userInfo) => {
   *  console.log(userInfo)
   * })
   * ```
   * @example
   * ```typescript
   * wepin.loginWithUI({ email: 'abc@abc.com' }).then((userInfo) => {
   *  console.log(userInfo)
   * })
   * ```
   */
  loginWithUI(c) {
    return wt(this, null, function* () {
      if (!this._isInitialized)
        throw new Error("Wepin.loginWithUI: wepin sdk has to be initialized");
      const O = yield this._wepinStorage.getLocalStorage(
        this._wepinAppId,
        "wepin:connectUser"
      ), q = yield this._wepinStorage.getLocalStorage(
        this._wepinAppId,
        "user_info"
      );
      if (c != null && c.email) {
        if (!emailRegExp.test(c == null ? void 0 : c.email))
          throw new Error(
            "Wepin.loginWithUI: The email does not match the correct format."
          );
        this.specifiedEmail = c == null ? void 0 : c.email;
      } else this.specifiedEmail = void 0;
      if (this._wepinLifeCycle = "before_login", O && q && (q && (O != null && O.refreshToken) && (c != null && c.email) && (q == null ? void 0 : q.userInfo.email) !== (c == null ? void 0 : c.email) && (yield this.logout()), O != null && O.refreshToken && (LOG.debug("currentUserInfo", q), !(yield this.checkExpiredToken()) && q && q.status === "success"))) {
        this._wepinLifeCycle = "login";
        const t = yield this._wepinStorage.getLocalStorage(
          this._wepinAppId,
          "user_status"
        );
        return Object.assign(q, { userStatus: t });
      }
      return yield this._open(), new Promise((X, t) => {
        this.once("onUserInfoSet", (F) => wt(this, null, function* () {
          try {
            const l = yield this._wepinStorage.getLocalStorage(
              this._wepinAppId,
              "wepin:connectUser"
            ), U = yield this._wepinStorage.getLocalStorage(
              this._wepinAppId,
              "user_status"
            );
            this._close(), yield this._wepinFetch.setToken(l), this.specifiedEmail = void 0, X(Object.assign(F, { userStatus: U }));
          } catch (l) {
            t(new Error(l));
          }
        }));
      });
    });
  }
  register() {
    return wt(this, null, function* () {
      if (!this._isInitialized)
        throw new Error("Wepin.register: wepin sdk has to be initialized");
      const c = yield this._wepinStorage.getLocalStorage(
        this._wepinAppId,
        "user_status"
      );
      if ((c.loginStatus === "registerRequired" || c.loginStatus === "pinRequired") && this._wepinLifeCycle, (yield this.getStatus()) !== "login_before_register")
        throw new Error(
          "Wepin.register: The LifeCycle of wepin sdk has to be login_before_register"
        );
      if (c.loginStatus !== "registerRequired" && c.loginStatus !== "pinRequired")
        throw new Error("Wepin.register: invalid login status");
      if (c.loginStatus === "registerRequired" && !c.pinRequired) {
        const O = yield this._wepinStorage.getLocalStorage(
          this._wepinAppId,
          "user_id"
        ), q = yield this._wepinStorage.getLocalStorage(
          this._wepinAppId,
          "wallet_id"
        ), X = yield this._wepinFetch.wepinApi.app.register({
          appId: this._wepinAppId,
          userId: O,
          walletId: q,
          loginStatus: c.loginStatus
        });
        if (isErrorResponse(X))
          throw new Error(X.message);
        const t = yield this._wepinFetch.wepinApi.user.updateTermsAccepted(
          { userId: O },
          {
            termsAccepted: {
              termsOfService: !0,
              privacyPolicy: !0
            }
          }
        );
        if (isErrorResponse(t) || !Object.values(t.termsAccepted).every((U) => U === !0))
          throw new Error("unknown/updateTermsAccepted");
        yield this._wepinStorage.setLocalStorage(this._wepinAppId, "user_status", {
          loginStatus: "complete"
        });
        const F = yield this._wepinStorage.getLocalStorage(
          this._wepinAppId,
          "user_info"
        );
        this._userInfo = F, X.walletId && (yield this._wepinStorage.setLocalStorage(
          this._wepinAppId,
          "wallet_id",
          X.walletId
        ), F.walletId = this._userInfo.walletId = X.walletId, yield this._wepinStorage.setLocalStorage(
          this._wepinAppId,
          "user_info",
          F
        )), this._wepinLifeCycle = "login";
        const l = yield this._wepinStorage.getLocalStorage(this._wepinAppId, "user_status");
        return Object.assign(F, { userStatus: l });
      } else {
        const O = (/* @__PURE__ */ new Date()).getTime();
        return this.wepinRequest = {
          header: {
            request_from: "web",
            request_to: "wepin_widget",
            id: O
          },
          body: {
            command: "register_wepin",
            parameter: {
              loginStatus: c.loginStatus,
              pinRequired: c.pinRequired
            }
          }
        }, new Promise((q, X) => {
          this.once(O.toString(), (t) => wt(this, null, function* () {
            var F;
            if (LOG.debug("response data: ", t.body.data), this.wepinRequest = void 0, this._close(), t.body.state === "SUCCESS") {
              const l = (F = t.body.data) == null ? void 0 : F.walletId;
              yield this._wepinStorage.setLocalStorage(
                this._wepinAppId,
                "user_status",
                {
                  loginStatus: "complete"
                }
              );
              const U = yield this._wepinStorage.getLocalStorage(
                this._wepinAppId,
                "user_info"
              );
              this._userInfo = U, U.walletId = this._userInfo.walletId = l, yield this._wepinStorage.setLocalStorage(
                this._wepinAppId,
                "user_info",
                U
              ), this._wepinLifeCycle = "login";
              const $ = yield this._wepinStorage.getLocalStorage(this._wepinAppId, "user_status");
              q(Object.assign(U, { userStatus: $ }));
            } else
              t.body.data ? X(new Error(`Wepin.register: ${t.body.data}`)) : X(new Error("unknown/error"));
          })), this._open({ url: "/sdk-register" });
        });
      }
    });
  }
  /**
   * Function to handle user logout.
   *
   * @returns {Promise<void>}
   */
  logout() {
    return wt(this, null, function* () {
      const c = yield this.getStatus();
      if (!this._isInitialized)
        throw new Error("Wepin.logout: wepin sdk has to be initialized");
      if (c !== "login" && c !== "login_before_register")
        throw new Error("Wepin.logout: Only if you're logged in to the wepin");
      yield this._wepinStorage.clearAllLocalStorage(this._wepinAppId), this._wepinLifeCycle = "initialized", this._userInfo = void 0, this._accountInfo = void 0, this._detailAccount = void 0;
    });
  }
  /**
   * Returns available account list. It can be only usable after widget login.
   * It returns all the accounts once parameter is empty.
   *
   * @param options
   *    - networks: list of network wanted to get return
   *    - withEoa: If AA accounts are included, whether to include EOA accounts
   * @returns
   */
  getAccounts(c) {
    return wt(this, null, function* () {
      if (!this._isInitialized)
        throw new Error("Wepin.getAccounts: wepin sdk has to be initialized");
      if ((yield this.getStatus()) !== "login")
        throw new Error(
          "Wepin.getAccounts: Only if you're logged in to the wepin"
        );
      const O = yield this._wepinStorage.getLocalStorage(
        this._wepinAppId,
        "user_id"
      ), q = yield this._wepinStorage.getLocalStorage(
        this._wepinAppId,
        "wallet_id"
      ), X = yield this._wepinFetch.wepinApi.account.getAppAccountList({
        userId: O,
        walletId: q,
        localeId: this.wepinAppAttributes.defaultLanguage === "ko" ? 1 : 2
      });
      if (isErrorResponse(X))
        throw new Error(X.message);
      return this._detailAccount = filterAccountList(X, c == null ? void 0 : c.withEoa), this._accountInfo = getAccountSDK(this._detailAccount), (c == null ? void 0 : c.networks) !== void 0 && (c == null ? void 0 : c.networks.length) > 0 ? this._accountInfo.filter(
        (F) => (c == null ? void 0 : c.networks.findIndex((l) => l === F.network)) >= 0
      ) : this._accountInfo;
    });
  }
  setUserInfo(c, O) {
    this._userInfo = c, c && c.status === "success" ? this._wepinLifeCycle = "login" : this._wepinLifeCycle = "initialized", O && this.emit("onUserInfoSet", c);
  }
  /**
   * Returns lifecycle of wepin.
   * The lifecycle of the wepin is defined as follows.
   *  - 'not_initialized': if wepin is not initialized
   *  - 'initializing': if wepin is initializing
   *  - 'initialized': if wepin is initialized
   *  - 'before_login': if wepin is initialized but the user is not logged in
   *  - 'login': if the user is logged in
   *  - 'login_before_register': if the user is email logged in but the user is NOT registered in wepin
   *
   * @returns Promise<WepinLifeCycle>
   */
  getStatus() {
    return wt(this, null, function* () {
      if (yield this.checkExpiredToken())
        this._wepinLifeCycle = "initialized";
      else {
        const c = yield this._wepinStorage.getLocalStorage(
          this._wepinAppId,
          "user_status"
        ), O = yield this._wepinStorage.getLocalStorage(
          this._wepinAppId,
          "user_info"
        );
        this._userInfo = O, c.loginStatus === "registerRequired" || c.loginStatus === "pinRequired" ? this._wepinLifeCycle = "login_before_register" : this._wepinLifeCycle = "login";
      }
      return this._wepinLifeCycle;
    });
  }
  /**
   * Returns balance info of account. It can be only usable after login.
   * It returns all the nft once networks parameter is empty.
   *
   * @param account
   * @returns Promise<AccountBalanceInfo>
   */
  getBalance(c) {
    return wt(this, null, function* () {
      if (!this._isInitialized)
        throw new Error("Wepin.getBalance: wepin sdk has to be initialized");
      if ((yield this.getStatus()) !== "login")
        throw new Error(
          "Wepin.getBalance: Only if you're logged in to the wepin."
        );
      const O = !c || c.length === 0, q = [];
      if (yield this.getAccounts(), O) {
        for (const X of this._detailAccount)
          if (c && c.findIndex(
            (t) => t.network === X.network && t.address === X.address
          ) >= 0) {
            const t = yield this._wepinFetch.wepinApi.balance.getAccountBalance({
              accountId: X.accountId
            });
            if (isErrorResponse(t))
              throw new Error(t.message);
            q.push(
              filterAccountBalance(this._detailAccount, X, t)
            );
          }
      } else
        for (const X of c) {
          const t = this._detailAccount.find(
            (l) => X.network === l.network && X.address === l.address
          );
          if (!t) throw new Error("Wepin.getBalance: Account not found");
          const F = yield this._wepinFetch.wepinApi.balance.getAccountBalance({
            accountId: t.accountId
          });
          if (isErrorResponse(F))
            throw new Error(F.message);
          q.push(
            filterAccountBalance(this._detailAccount, t, F)
          );
        }
      if (!q.length)
        throw new Error("Wepin.getBalance: Account not found");
      return q;
    });
  }
  getSDKRequest() {
    return this.wepinRequest;
  }
  /**
   * Returns the send transaction information. It can be only usable after widget login.
   *
   * @param account account info
   * @param options send options
   * @returns send transaction response info
   */
  send(q) {
    return wt(this, arguments, function* ({
      account: c,
      txData: O
    }) {
      if (!this._isInitialized)
        throw new Error("Wepin.send: wepin sdk has to be initialized");
      if ((yield this.getStatus()) !== "login")
        throw new Error("Wepin.send: Only if you're logged in to the wepin");
      if (yield this.getAccounts(), !this._detailAccount.find(
        (F) => c.network === F.network && c.address === F.address
      )) throw new Error("Wepin.send: Account not found");
      const t = (/* @__PURE__ */ new Date()).getTime();
      return this.wepinRequest = {
        header: {
          request_from: "web",
          request_to: "wepin_widget",
          id: t
        },
        body: {
          command: "send_transaction_without_provider",
          parameter: {
            account: {
              address: c.address,
              network: c.network,
              contract: c == null ? void 0 : c.contract
            },
            from: c.address,
            to: O == null ? void 0 : O.toAddress,
            value: O == null ? void 0 : O.amount
          }
        }
      }, new Promise((F, l) => {
        this.once(t.toString(), (U) => wt(this, null, function* () {
          if (LOG.debug("response data: ", U.body.data), this.wepinRequest = void 0, this._close(), U.body.state === "SUCCESS") {
            const $ = U.body.data;
            F({ txId: $ });
          } else
            U.body.data ? l(new Error(`Wepin.send: ${U.body.data}`)) : l(new Error("unknown/error"));
        })), this._open({ url: "/sdk-send" });
      });
    });
  }
  finalize() {
    return wt(this, null, function* () {
      this._close(), yield this._wepinStorage.clearAllLocalStorage(this._wepinAppId), this._isInitialized = !1, this._wepinLifeCycle = "not_initialized", this._userInfo = void 0, this._accountInfo = void 0, this._detailAccount = void 0, this.specifiedEmail = void 0;
    });
  }
}
export {
  WepinSDK
};
