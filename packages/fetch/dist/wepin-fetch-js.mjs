var Mr = Object.getPrototypeOf;
var Sr = Reflect.get;
var _r = (I, M, T) => Sr(Mr(I), T, M);
var Be = (I, M, T) => new Promise((q, C) => {
  var t = (b) => {
    try {
      l(T.next(b));
    } catch (w) {
      C(w);
    }
  }, E = (b) => {
    try {
      l(T.throw(b));
    } catch (w) {
      C(w);
    }
  }, l = (b) => b.done ? q(b.value) : Promise.resolve(b.value).then(t, E);
  l((T = T.apply(I, M)).next());
});
var S = (I) => {
  throw TypeError(I);
}, h = (I, M, T) => M.has(I) || S("Cannot " + T), n = (I, M, T) => (h(I, M, "read from private field"), T ? T.call(I) : M.get(I)), f = (I, M, T) => M.has(I) ? S("Cannot add the same private member more than once") : M instanceof WeakSet ? M.add(I) : M.set(I, T), s = (I, M, T) => new Promise((q, C) => {
  var t = (b) => {
    try {
      l(T.next(b));
    } catch (w) {
      C(w);
    }
  }, E = (b) => {
    try {
      l(T.throw(b));
    } catch (w) {
      C(w);
    }
  }, l = (b) => b.done ? q(b.value) : Promise.resolve(b.value).then(t, E);
  l((T = T.apply(I, M)).next());
}), i;
const r = class gr {
  constructor() {
    this.platform = "web";
  }
  getLocalStorageEnabled() {
    let M = !1;
    try {
      M = window.localStorage && !0;
    } catch (T) {
      M = !1;
    }
    return M;
  }
  setAllLocalStorage(M, T) {
    return s(this, null, function* () {
      if (!this.getLocalStorageEnabled()) {
        console.error(
          "Local storage is not available. We recommend using local storage to maintain login sessions."
        );
        return;
      }
      const q = JSON.stringify(T);
      localStorage.setItem(n(gr, i) + M, q);
    });
  }
  setLocalStorage(M, T, q) {
    return s(this, null, function* () {
      if (!this.getLocalStorageEnabled()) {
        console.error(
          "Local storage is not available. We recommend using local storage to maintain login sessions."
        );
        return;
      }
      const C = yield this.getAllLocalStorage(M);
      if (C) {
        C[T] = q, localStorage.setItem(
          n(gr, i) + M,
          // btoa(JSON.stringify(localData)),
          JSON.stringify(C)
        );
        return;
      }
      const t = { [T]: q };
      localStorage.setItem(
        n(gr, i) + M,
        // btoa(JSON.stringify(newData)),
        JSON.stringify(t)
      );
    });
  }
  getLocalStorage(M, T) {
    return s(this, null, function* () {
      if (!this.getLocalStorageEnabled()) {
        console.error(
          "Local storage is not available. We recommend using local storage to maintain login sessions."
        );
        return;
      }
      const q = yield this.getAllLocalStorage(M);
      try {
        if (q)
          return JSON.parse(q[T]);
      } catch (C) {
        if (q) return q[T];
      }
    });
  }
  getAllLocalStorage(M) {
    return s(this, null, function* () {
      if (!this.getLocalStorageEnabled()) {
        console.error(
          "Local storage is not available. We recommend using local storage to maintain login sessions."
        );
        return;
      }
      try {
        return localStorage.getItem(n(gr, i) + M) ? (
          // ? JSON.parse(atob(localStorage.getItem(this.#COOKIE_NAME + appId)))
          JSON.parse(localStorage.getItem(n(gr, i) + M))
        ) : void 0;
      } catch (T) {
        return;
      }
    });
  }
  clearLocalStorage(M, T) {
    return s(this, null, function* () {
      if (!this.getLocalStorageEnabled()) {
        console.error(
          "Local storage is not available. We recommend using local storage to maintain login sessions."
        );
        return;
      }
      if (yield this.getLocalStorage(M, T)) {
        const q = yield this.getAllLocalStorage(M);
        if (!q)
          return;
        delete q[T], localStorage.setItem(
          n(gr, i) + M,
          // btoa(JSON.stringify(localData)),
          JSON.stringify(q)
        );
      }
    });
  }
  clearAllLocalStorage(M) {
    return s(this, null, function* () {
      if (!this.getLocalStorageEnabled()) {
        console.error(
          "Local storage is not available. We recommend using local storage to maintain login sessions."
        );
        return;
      }
      localStorage.removeItem(n(gr, i) + M);
    });
  }
  setLoginUserLocalStorage(M, T, q) {
    return s(this, null, function* () {
      if (!this.getLocalStorageEnabled()) {
        console.error(
          "Local storage is not available. We recommend using local storage to maintain login sessions."
        );
        return;
      }
      const C = {};
      return C["firebase:wepin"] = Object.assign(
        { provider: T == null ? void 0 : T.provider },
        T == null ? void 0 : T.token
      ), C["wepin:connectUser"] = {
        accessToken: q.token.access,
        refreshToken: q.token.refresh
      }, C.user_id = q.userInfo.userId, C.user_info = {
        status: "success",
        userInfo: {
          userId: q.userInfo.userId,
          email: q.userInfo.email,
          provider: T.provider,
          use2FA: q.userInfo.use2FA >= 2
        }
      }, C.user_status = {
        loginStatus: q.loginStatus,
        pinRequired: q.loginStatus === "registerRequired" ? q.pinRequired : !1
      }, q.loginStatus !== "pinRequired" && q.walletId && (C.wallet_id = q.walletId, C.user_info.walletId = q.walletId), C.oauth_provider_pending = T.provider, this.setAllLocalStorage(M, C), {
        userInfo: C.user_info,
        connectUser: C["wepin:connectUser"]
      };
    });
  }
};
i = /* @__PURE__ */ new WeakMap(), f(r, i, "wepin:auth:");
let m = r;
const name$1 = "@wepin/fetch-js", version$1 = "0.0.6", description$1 = "Wepin fetch library for Web", author$1 = "IoTrust, Co., Ltd.", license$1 = "MIT", main$1 = "./dist/wepin-fetch-js.mjs", types$1 = "./dist/src/index.d.ts", files$1 = [
  "dist"
], scripts$1 = {
  build: "vite build --mode production",
  dev: "vite build --mode development",
  watch: "vite build --watch",
  lint: "eslint . --ext .vue,.js,.jsx,.cjs,.mjs,.ts,.tsx,.cts,.mts --fix --ignore-path .gitignore"
}, dependencies$1 = {}, devDependencies$1 = {
  "@wepin/storage-js": "^0.0.3",
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
var commonjsGlobal = typeof globalThis != "undefined" ? globalThis : typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : {};
function getDefaultExportFromCjs(I) {
  return I && I.__esModule && Object.prototype.hasOwnProperty.call(I, "default") ? I.default : I;
}
var buffer$1 = {}, base64Js = {}, hasRequiredBase64Js;
function requireBase64Js() {
  if (hasRequiredBase64Js) return base64Js;
  hasRequiredBase64Js = 1, base64Js.byteLength = l, base64Js.toByteArray = w, base64Js.fromByteArray = R;
  for (var I = [], M = [], T = typeof Uint8Array != "undefined" ? Uint8Array : Array, q = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", C = 0, t = q.length; C < t; ++C)
    I[C] = q[C], M[q.charCodeAt(C)] = C;
  M[45] = 62, M[95] = 63;
  function E(B) {
    var k = B.length;
    if (k % 4 > 0)
      throw new Error("Invalid string. Length must be a multiple of 4");
    var $ = B.indexOf("=");
    $ === -1 && ($ = k);
    var O = $ === k ? 0 : 4 - $ % 4;
    return [$, O];
  }
  function l(B) {
    var k = E(B), $ = k[0], O = k[1];
    return ($ + O) * 3 / 4 - O;
  }
  function b(B, k, $) {
    return (k + $) * 3 / 4 - $;
  }
  function w(B) {
    var k, $ = E(B), O = $[0], D = $[1], N = new T(b(B, O, D)), W = 0, z = D > 0 ? O - 4 : O, X;
    for (X = 0; X < z; X += 4)
      k = M[B.charCodeAt(X)] << 18 | M[B.charCodeAt(X + 1)] << 12 | M[B.charCodeAt(X + 2)] << 6 | M[B.charCodeAt(X + 3)], N[W++] = k >> 16 & 255, N[W++] = k >> 8 & 255, N[W++] = k & 255;
    return D === 2 && (k = M[B.charCodeAt(X)] << 2 | M[B.charCodeAt(X + 1)] >> 4, N[W++] = k & 255), D === 1 && (k = M[B.charCodeAt(X)] << 10 | M[B.charCodeAt(X + 1)] << 4 | M[B.charCodeAt(X + 2)] >> 2, N[W++] = k >> 8 & 255, N[W++] = k & 255), N;
  }
  function u(B) {
    return I[B >> 18 & 63] + I[B >> 12 & 63] + I[B >> 6 & 63] + I[B & 63];
  }
  function g(B, k, $) {
    for (var O, D = [], N = k; N < $; N += 3)
      O = (B[N] << 16 & 16711680) + (B[N + 1] << 8 & 65280) + (B[N + 2] & 255), D.push(u(O));
    return D.join("");
  }
  function R(B) {
    for (var k, $ = B.length, O = $ % 3, D = [], N = 16383, W = 0, z = $ - O; W < z; W += N)
      D.push(g(B, W, W + N > z ? z : W + N));
    return O === 1 ? (k = B[$ - 1], D.push(
      I[k >> 2] + I[k << 4 & 63] + "=="
    )) : O === 2 && (k = (B[$ - 2] << 8) + B[$ - 1], D.push(
      I[k >> 10] + I[k >> 4 & 63] + I[k << 2 & 63] + "="
    )), D.join("");
  }
  return base64Js;
}
var ieee754 = {};
/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
var hasRequiredIeee754;
function requireIeee754() {
  return hasRequiredIeee754 || (hasRequiredIeee754 = 1, ieee754.read = function(I, M, T, q, C) {
    var t, E, l = C * 8 - q - 1, b = (1 << l) - 1, w = b >> 1, u = -7, g = T ? C - 1 : 0, R = T ? -1 : 1, B = I[M + g];
    for (g += R, t = B & (1 << -u) - 1, B >>= -u, u += l; u > 0; t = t * 256 + I[M + g], g += R, u -= 8)
      ;
    for (E = t & (1 << -u) - 1, t >>= -u, u += q; u > 0; E = E * 256 + I[M + g], g += R, u -= 8)
      ;
    if (t === 0)
      t = 1 - w;
    else {
      if (t === b)
        return E ? NaN : (B ? -1 : 1) * (1 / 0);
      E = E + Math.pow(2, q), t = t - w;
    }
    return (B ? -1 : 1) * E * Math.pow(2, t - q);
  }, ieee754.write = function(I, M, T, q, C, t) {
    var E, l, b, w = t * 8 - C - 1, u = (1 << w) - 1, g = u >> 1, R = C === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0, B = q ? 0 : t - 1, k = q ? 1 : -1, $ = M < 0 || M === 0 && 1 / M < 0 ? 1 : 0;
    for (M = Math.abs(M), isNaN(M) || M === 1 / 0 ? (l = isNaN(M) ? 1 : 0, E = u) : (E = Math.floor(Math.log(M) / Math.LN2), M * (b = Math.pow(2, -E)) < 1 && (E--, b *= 2), E + g >= 1 ? M += R / b : M += R * Math.pow(2, 1 - g), M * b >= 2 && (E++, b /= 2), E + g >= u ? (l = 0, E = u) : E + g >= 1 ? (l = (M * b - 1) * Math.pow(2, C), E = E + g) : (l = M * Math.pow(2, g - 1) * Math.pow(2, C), E = 0)); C >= 8; I[T + B] = l & 255, B += k, l /= 256, C -= 8)
      ;
    for (E = E << C | l, w += C; w > 0; I[T + B] = E & 255, B += k, E /= 256, w -= 8)
      ;
    I[T + B - k] |= $ * 128;
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
  return hasRequiredBuffer$1 || (hasRequiredBuffer$1 = 1, function(I) {
    var M = requireBase64Js(), T = requireIeee754(), q = typeof Symbol == "function" && typeof Symbol.for == "function" ? Symbol.for("nodejs.util.inspect.custom") : null;
    I.Buffer = l, I.SlowBuffer = N, I.INSPECT_MAX_BYTES = 50;
    var C = 2147483647;
    I.kMaxLength = C, l.TYPED_ARRAY_SUPPORT = t(), !l.TYPED_ARRAY_SUPPORT && typeof console != "undefined" && typeof console.error == "function" && console.error(
      "This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."
    );
    function t() {
      try {
        var Y = new Uint8Array(1), F = { foo: function() {
          return 42;
        } };
        return Object.setPrototypeOf(F, Uint8Array.prototype), Object.setPrototypeOf(Y, F), Y.foo() === 42;
      } catch (U) {
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
    function E(Y) {
      if (Y > C)
        throw new RangeError('The value "' + Y + '" is invalid for option "size"');
      var F = new Uint8Array(Y);
      return Object.setPrototypeOf(F, l.prototype), F;
    }
    function l(Y, F, U) {
      if (typeof Y == "number") {
        if (typeof F == "string")
          throw new TypeError(
            'The "string" argument must be of type string. Received type number'
          );
        return g(Y);
      }
      return b(Y, F, U);
    }
    l.poolSize = 8192;
    function b(Y, F, U) {
      if (typeof Y == "string")
        return R(Y, F);
      if (ArrayBuffer.isView(Y))
        return k(Y);
      if (Y == null)
        throw new TypeError(
          "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof Y
        );
      if (se(Y, ArrayBuffer) || Y && se(Y.buffer, ArrayBuffer) || typeof SharedArrayBuffer != "undefined" && (se(Y, SharedArrayBuffer) || Y && se(Y.buffer, SharedArrayBuffer)))
        return $(Y, F, U);
      if (typeof Y == "number")
        throw new TypeError(
          'The "value" argument must not be of type number. Received type number'
        );
      var V = Y.valueOf && Y.valueOf();
      if (V != null && V !== Y)
        return l.from(V, F, U);
      var ie = O(Y);
      if (ie) return ie;
      if (typeof Symbol != "undefined" && Symbol.toPrimitive != null && typeof Y[Symbol.toPrimitive] == "function")
        return l.from(
          Y[Symbol.toPrimitive]("string"),
          F,
          U
        );
      throw new TypeError(
        "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof Y
      );
    }
    l.from = function(Y, F, U) {
      return b(Y, F, U);
    }, Object.setPrototypeOf(l.prototype, Uint8Array.prototype), Object.setPrototypeOf(l, Uint8Array);
    function w(Y) {
      if (typeof Y != "number")
        throw new TypeError('"size" argument must be of type number');
      if (Y < 0)
        throw new RangeError('The value "' + Y + '" is invalid for option "size"');
    }
    function u(Y, F, U) {
      return w(Y), Y <= 0 ? E(Y) : F !== void 0 ? typeof U == "string" ? E(Y).fill(F, U) : E(Y).fill(F) : E(Y);
    }
    l.alloc = function(Y, F, U) {
      return u(Y, F, U);
    };
    function g(Y) {
      return w(Y), E(Y < 0 ? 0 : D(Y) | 0);
    }
    l.allocUnsafe = function(Y) {
      return g(Y);
    }, l.allocUnsafeSlow = function(Y) {
      return g(Y);
    };
    function R(Y, F) {
      if ((typeof F != "string" || F === "") && (F = "utf8"), !l.isEncoding(F))
        throw new TypeError("Unknown encoding: " + F);
      var U = W(Y, F) | 0, V = E(U), ie = V.write(Y, F);
      return ie !== U && (V = V.slice(0, ie)), V;
    }
    function B(Y) {
      for (var F = Y.length < 0 ? 0 : D(Y.length) | 0, U = E(F), V = 0; V < F; V += 1)
        U[V] = Y[V] & 255;
      return U;
    }
    function k(Y) {
      if (se(Y, Uint8Array)) {
        var F = new Uint8Array(Y);
        return $(F.buffer, F.byteOffset, F.byteLength);
      }
      return B(Y);
    }
    function $(Y, F, U) {
      if (F < 0 || Y.byteLength < F)
        throw new RangeError('"offset" is outside of buffer bounds');
      if (Y.byteLength < F + (U || 0))
        throw new RangeError('"length" is outside of buffer bounds');
      var V;
      return F === void 0 && U === void 0 ? V = new Uint8Array(Y) : U === void 0 ? V = new Uint8Array(Y, F) : V = new Uint8Array(Y, F, U), Object.setPrototypeOf(V, l.prototype), V;
    }
    function O(Y) {
      if (l.isBuffer(Y)) {
        var F = D(Y.length) | 0, U = E(F);
        return U.length === 0 || Y.copy(U, 0, 0, F), U;
      }
      if (Y.length !== void 0)
        return typeof Y.length != "number" || ue(Y.length) ? E(0) : B(Y);
      if (Y.type === "Buffer" && Array.isArray(Y.data))
        return B(Y.data);
    }
    function D(Y) {
      if (Y >= C)
        throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + C.toString(16) + " bytes");
      return Y | 0;
    }
    function N(Y) {
      return +Y != Y && (Y = 0), l.alloc(+Y);
    }
    l.isBuffer = function(F) {
      return F != null && F._isBuffer === !0 && F !== l.prototype;
    }, l.compare = function(F, U) {
      if (se(F, Uint8Array) && (F = l.from(F, F.offset, F.byteLength)), se(U, Uint8Array) && (U = l.from(U, U.offset, U.byteLength)), !l.isBuffer(F) || !l.isBuffer(U))
        throw new TypeError(
          'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
        );
      if (F === U) return 0;
      for (var V = F.length, ie = U.length, oe = 0, he = Math.min(V, ie); oe < he; ++oe)
        if (F[oe] !== U[oe]) {
          V = F[oe], ie = U[oe];
          break;
        }
      return V < ie ? -1 : ie < V ? 1 : 0;
    }, l.isEncoding = function(F) {
      switch (String(F).toLowerCase()) {
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
    }, l.concat = function(F, U) {
      if (!Array.isArray(F))
        throw new TypeError('"list" argument must be an Array of Buffers');
      if (F.length === 0)
        return l.alloc(0);
      var V;
      if (U === void 0)
        for (U = 0, V = 0; V < F.length; ++V)
          U += F[V].length;
      var ie = l.allocUnsafe(U), oe = 0;
      for (V = 0; V < F.length; ++V) {
        var he = F[V];
        if (se(he, Uint8Array))
          oe + he.length > ie.length ? l.from(he).copy(ie, oe) : Uint8Array.prototype.set.call(
            ie,
            he,
            oe
          );
        else if (l.isBuffer(he))
          he.copy(ie, oe);
        else
          throw new TypeError('"list" argument must be an Array of Buffers');
        oe += he.length;
      }
      return ie;
    };
    function W(Y, F) {
      if (l.isBuffer(Y))
        return Y.length;
      if (ArrayBuffer.isView(Y) || se(Y, ArrayBuffer))
        return Y.byteLength;
      if (typeof Y != "string")
        throw new TypeError(
          'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof Y
        );
      var U = Y.length, V = arguments.length > 2 && arguments[2] === !0;
      if (!V && U === 0) return 0;
      for (var ie = !1; ; )
        switch (F) {
          case "ascii":
          case "latin1":
          case "binary":
            return U;
          case "utf8":
          case "utf-8":
            return j(Y).length;
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return U * 2;
          case "hex":
            return U >>> 1;
          case "base64":
            return J(Y).length;
          default:
            if (ie)
              return V ? -1 : j(Y).length;
            F = ("" + F).toLowerCase(), ie = !0;
        }
    }
    l.byteLength = W;
    function z(Y, F, U) {
      var V = !1;
      if ((F === void 0 || F < 0) && (F = 0), F > this.length || ((U === void 0 || U > this.length) && (U = this.length), U <= 0) || (U >>>= 0, F >>>= 0, U <= F))
        return "";
      for (Y || (Y = "utf8"); ; )
        switch (Y) {
          case "hex":
            return y(this, F, U);
          case "utf8":
          case "utf-8":
            return e(this, F, U);
          case "ascii":
            return x(this, F, U);
          case "latin1":
          case "binary":
            return d(this, F, U);
          case "base64":
            return c(this, F, U);
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return p(this, F, U);
          default:
            if (V) throw new TypeError("Unknown encoding: " + Y);
            Y = (Y + "").toLowerCase(), V = !0;
        }
    }
    l.prototype._isBuffer = !0;
    function X(Y, F, U) {
      var V = Y[F];
      Y[F] = Y[U], Y[U] = V;
    }
    l.prototype.swap16 = function() {
      var F = this.length;
      if (F % 2 !== 0)
        throw new RangeError("Buffer size must be a multiple of 16-bits");
      for (var U = 0; U < F; U += 2)
        X(this, U, U + 1);
      return this;
    }, l.prototype.swap32 = function() {
      var F = this.length;
      if (F % 4 !== 0)
        throw new RangeError("Buffer size must be a multiple of 32-bits");
      for (var U = 0; U < F; U += 4)
        X(this, U, U + 3), X(this, U + 1, U + 2);
      return this;
    }, l.prototype.swap64 = function() {
      var F = this.length;
      if (F % 8 !== 0)
        throw new RangeError("Buffer size must be a multiple of 64-bits");
      for (var U = 0; U < F; U += 8)
        X(this, U, U + 7), X(this, U + 1, U + 6), X(this, U + 2, U + 5), X(this, U + 3, U + 4);
      return this;
    }, l.prototype.toString = function() {
      var F = this.length;
      return F === 0 ? "" : arguments.length === 0 ? e(this, 0, F) : z.apply(this, arguments);
    }, l.prototype.toLocaleString = l.prototype.toString, l.prototype.equals = function(F) {
      if (!l.isBuffer(F)) throw new TypeError("Argument must be a Buffer");
      return this === F ? !0 : l.compare(this, F) === 0;
    }, l.prototype.inspect = function() {
      var F = "", U = I.INSPECT_MAX_BYTES;
      return F = this.toString("hex", 0, U).replace(/(.{2})/g, "$1 ").trim(), this.length > U && (F += " ... "), "<Buffer " + F + ">";
    }, q && (l.prototype[q] = l.prototype.inspect), l.prototype.compare = function(F, U, V, ie, oe) {
      if (se(F, Uint8Array) && (F = l.from(F, F.offset, F.byteLength)), !l.isBuffer(F))
        throw new TypeError(
          'The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof F
        );
      if (U === void 0 && (U = 0), V === void 0 && (V = F ? F.length : 0), ie === void 0 && (ie = 0), oe === void 0 && (oe = this.length), U < 0 || V > F.length || ie < 0 || oe > this.length)
        throw new RangeError("out of range index");
      if (ie >= oe && U >= V)
        return 0;
      if (ie >= oe)
        return -1;
      if (U >= V)
        return 1;
      if (U >>>= 0, V >>>= 0, ie >>>= 0, oe >>>= 0, this === F) return 0;
      for (var he = oe - ie, ve = V - U, le = Math.min(he, ve), ye = this.slice(ie, oe), be = F.slice(U, V), pe = 0; pe < le; ++pe)
        if (ye[pe] !== be[pe]) {
          he = ye[pe], ve = be[pe];
          break;
        }
      return he < ve ? -1 : ve < he ? 1 : 0;
    };
    function Q(Y, F, U, V, ie) {
      if (Y.length === 0) return -1;
      if (typeof U == "string" ? (V = U, U = 0) : U > 2147483647 ? U = 2147483647 : U < -2147483648 && (U = -2147483648), U = +U, ue(U) && (U = ie ? 0 : Y.length - 1), U < 0 && (U = Y.length + U), U >= Y.length) {
        if (ie) return -1;
        U = Y.length - 1;
      } else if (U < 0)
        if (ie) U = 0;
        else return -1;
      if (typeof F == "string" && (F = l.from(F, V)), l.isBuffer(F))
        return F.length === 0 ? -1 : ae(Y, F, U, V, ie);
      if (typeof F == "number")
        return F = F & 255, typeof Uint8Array.prototype.indexOf == "function" ? ie ? Uint8Array.prototype.indexOf.call(Y, F, U) : Uint8Array.prototype.lastIndexOf.call(Y, F, U) : ae(Y, [F], U, V, ie);
      throw new TypeError("val must be string, number or Buffer");
    }
    function ae(Y, F, U, V, ie) {
      var oe = 1, he = Y.length, ve = F.length;
      if (V !== void 0 && (V = String(V).toLowerCase(), V === "ucs2" || V === "ucs-2" || V === "utf16le" || V === "utf-16le")) {
        if (Y.length < 2 || F.length < 2)
          return -1;
        oe = 2, he /= 2, ve /= 2, U /= 2;
      }
      function le(Ie, me) {
        return oe === 1 ? Ie[me] : Ie.readUInt16BE(me * oe);
      }
      var ye;
      if (ie) {
        var be = -1;
        for (ye = U; ye < he; ye++)
          if (le(Y, ye) === le(F, be === -1 ? 0 : ye - be)) {
            if (be === -1 && (be = ye), ye - be + 1 === ve) return be * oe;
          } else
            be !== -1 && (ye -= ye - be), be = -1;
      } else
        for (U + ve > he && (U = he - ve), ye = U; ye >= 0; ye--) {
          for (var pe = !0, He = 0; He < ve; He++)
            if (le(Y, ye + He) !== le(F, He)) {
              pe = !1;
              break;
            }
          if (pe) return ye;
        }
      return -1;
    }
    l.prototype.includes = function(F, U, V) {
      return this.indexOf(F, U, V) !== -1;
    }, l.prototype.indexOf = function(F, U, V) {
      return Q(this, F, U, V, !0);
    }, l.prototype.lastIndexOf = function(F, U, V) {
      return Q(this, F, U, V, !1);
    };
    function fe(Y, F, U, V) {
      U = Number(U) || 0;
      var ie = Y.length - U;
      V ? (V = Number(V), V > ie && (V = ie)) : V = ie;
      var oe = F.length;
      V > oe / 2 && (V = oe / 2);
      for (var he = 0; he < V; ++he) {
        var ve = parseInt(F.substr(he * 2, 2), 16);
        if (ue(ve)) return he;
        Y[U + he] = ve;
      }
      return he;
    }
    function te(Y, F, U, V) {
      return G(j(F, Y.length - U), Y, U, V);
    }
    function ce(Y, F, U, V) {
      return G(re(F), Y, U, V);
    }
    function H(Y, F, U, V) {
      return G(J(F), Y, U, V);
    }
    function A(Y, F, U, V) {
      return G(ne(F, Y.length - U), Y, U, V);
    }
    l.prototype.write = function(F, U, V, ie) {
      if (U === void 0)
        ie = "utf8", V = this.length, U = 0;
      else if (V === void 0 && typeof U == "string")
        ie = U, V = this.length, U = 0;
      else if (isFinite(U))
        U = U >>> 0, isFinite(V) ? (V = V >>> 0, ie === void 0 && (ie = "utf8")) : (ie = V, V = void 0);
      else
        throw new Error(
          "Buffer.write(string, encoding, offset[, length]) is no longer supported"
        );
      var oe = this.length - U;
      if ((V === void 0 || V > oe) && (V = oe), F.length > 0 && (V < 0 || U < 0) || U > this.length)
        throw new RangeError("Attempt to write outside buffer bounds");
      ie || (ie = "utf8");
      for (var he = !1; ; )
        switch (ie) {
          case "hex":
            return fe(this, F, U, V);
          case "utf8":
          case "utf-8":
            return te(this, F, U, V);
          case "ascii":
          case "latin1":
          case "binary":
            return ce(this, F, U, V);
          case "base64":
            return H(this, F, U, V);
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return A(this, F, U, V);
          default:
            if (he) throw new TypeError("Unknown encoding: " + ie);
            ie = ("" + ie).toLowerCase(), he = !0;
        }
    }, l.prototype.toJSON = function() {
      return {
        type: "Buffer",
        data: Array.prototype.slice.call(this._arr || this, 0)
      };
    };
    function c(Y, F, U) {
      return F === 0 && U === Y.length ? M.fromByteArray(Y) : M.fromByteArray(Y.slice(F, U));
    }
    function e(Y, F, U) {
      U = Math.min(Y.length, U);
      for (var V = [], ie = F; ie < U; ) {
        var oe = Y[ie], he = null, ve = oe > 239 ? 4 : oe > 223 ? 3 : oe > 191 ? 2 : 1;
        if (ie + ve <= U) {
          var le, ye, be, pe;
          switch (ve) {
            case 1:
              oe < 128 && (he = oe);
              break;
            case 2:
              le = Y[ie + 1], (le & 192) === 128 && (pe = (oe & 31) << 6 | le & 63, pe > 127 && (he = pe));
              break;
            case 3:
              le = Y[ie + 1], ye = Y[ie + 2], (le & 192) === 128 && (ye & 192) === 128 && (pe = (oe & 15) << 12 | (le & 63) << 6 | ye & 63, pe > 2047 && (pe < 55296 || pe > 57343) && (he = pe));
              break;
            case 4:
              le = Y[ie + 1], ye = Y[ie + 2], be = Y[ie + 3], (le & 192) === 128 && (ye & 192) === 128 && (be & 192) === 128 && (pe = (oe & 15) << 18 | (le & 63) << 12 | (ye & 63) << 6 | be & 63, pe > 65535 && pe < 1114112 && (he = pe));
          }
        }
        he === null ? (he = 65533, ve = 1) : he > 65535 && (he -= 65536, V.push(he >>> 10 & 1023 | 55296), he = 56320 | he & 1023), V.push(he), ie += ve;
      }
      return v(V);
    }
    var a = 4096;
    function v(Y) {
      var F = Y.length;
      if (F <= a)
        return String.fromCharCode.apply(String, Y);
      for (var U = "", V = 0; V < F; )
        U += String.fromCharCode.apply(
          String,
          Y.slice(V, V += a)
        );
      return U;
    }
    function x(Y, F, U) {
      var V = "";
      U = Math.min(Y.length, U);
      for (var ie = F; ie < U; ++ie)
        V += String.fromCharCode(Y[ie] & 127);
      return V;
    }
    function d(Y, F, U) {
      var V = "";
      U = Math.min(Y.length, U);
      for (var ie = F; ie < U; ++ie)
        V += String.fromCharCode(Y[ie]);
      return V;
    }
    function y(Y, F, U) {
      var V = Y.length;
      (!F || F < 0) && (F = 0), (!U || U < 0 || U > V) && (U = V);
      for (var ie = "", oe = F; oe < U; ++oe)
        ie += de[Y[oe]];
      return ie;
    }
    function p(Y, F, U) {
      for (var V = Y.slice(F, U), ie = "", oe = 0; oe < V.length - 1; oe += 2)
        ie += String.fromCharCode(V[oe] + V[oe + 1] * 256);
      return ie;
    }
    l.prototype.slice = function(F, U) {
      var V = this.length;
      F = ~~F, U = U === void 0 ? V : ~~U, F < 0 ? (F += V, F < 0 && (F = 0)) : F > V && (F = V), U < 0 ? (U += V, U < 0 && (U = 0)) : U > V && (U = V), U < F && (U = F);
      var ie = this.subarray(F, U);
      return Object.setPrototypeOf(ie, l.prototype), ie;
    };
    function _(Y, F, U) {
      if (Y % 1 !== 0 || Y < 0) throw new RangeError("offset is not uint");
      if (Y + F > U) throw new RangeError("Trying to access beyond buffer length");
    }
    l.prototype.readUintLE = l.prototype.readUIntLE = function(F, U, V) {
      F = F >>> 0, U = U >>> 0, V || _(F, U, this.length);
      for (var ie = this[F], oe = 1, he = 0; ++he < U && (oe *= 256); )
        ie += this[F + he] * oe;
      return ie;
    }, l.prototype.readUintBE = l.prototype.readUIntBE = function(F, U, V) {
      F = F >>> 0, U = U >>> 0, V || _(F, U, this.length);
      for (var ie = this[F + --U], oe = 1; U > 0 && (oe *= 256); )
        ie += this[F + --U] * oe;
      return ie;
    }, l.prototype.readUint8 = l.prototype.readUInt8 = function(F, U) {
      return F = F >>> 0, U || _(F, 1, this.length), this[F];
    }, l.prototype.readUint16LE = l.prototype.readUInt16LE = function(F, U) {
      return F = F >>> 0, U || _(F, 2, this.length), this[F] | this[F + 1] << 8;
    }, l.prototype.readUint16BE = l.prototype.readUInt16BE = function(F, U) {
      return F = F >>> 0, U || _(F, 2, this.length), this[F] << 8 | this[F + 1];
    }, l.prototype.readUint32LE = l.prototype.readUInt32LE = function(F, U) {
      return F = F >>> 0, U || _(F, 4, this.length), (this[F] | this[F + 1] << 8 | this[F + 2] << 16) + this[F + 3] * 16777216;
    }, l.prototype.readUint32BE = l.prototype.readUInt32BE = function(F, U) {
      return F = F >>> 0, U || _(F, 4, this.length), this[F] * 16777216 + (this[F + 1] << 16 | this[F + 2] << 8 | this[F + 3]);
    }, l.prototype.readIntLE = function(F, U, V) {
      F = F >>> 0, U = U >>> 0, V || _(F, U, this.length);
      for (var ie = this[F], oe = 1, he = 0; ++he < U && (oe *= 256); )
        ie += this[F + he] * oe;
      return oe *= 128, ie >= oe && (ie -= Math.pow(2, 8 * U)), ie;
    }, l.prototype.readIntBE = function(F, U, V) {
      F = F >>> 0, U = U >>> 0, V || _(F, U, this.length);
      for (var ie = U, oe = 1, he = this[F + --ie]; ie > 0 && (oe *= 256); )
        he += this[F + --ie] * oe;
      return oe *= 128, he >= oe && (he -= Math.pow(2, 8 * U)), he;
    }, l.prototype.readInt8 = function(F, U) {
      return F = F >>> 0, U || _(F, 1, this.length), this[F] & 128 ? (255 - this[F] + 1) * -1 : this[F];
    }, l.prototype.readInt16LE = function(F, U) {
      F = F >>> 0, U || _(F, 2, this.length);
      var V = this[F] | this[F + 1] << 8;
      return V & 32768 ? V | 4294901760 : V;
    }, l.prototype.readInt16BE = function(F, U) {
      F = F >>> 0, U || _(F, 2, this.length);
      var V = this[F + 1] | this[F] << 8;
      return V & 32768 ? V | 4294901760 : V;
    }, l.prototype.readInt32LE = function(F, U) {
      return F = F >>> 0, U || _(F, 4, this.length), this[F] | this[F + 1] << 8 | this[F + 2] << 16 | this[F + 3] << 24;
    }, l.prototype.readInt32BE = function(F, U) {
      return F = F >>> 0, U || _(F, 4, this.length), this[F] << 24 | this[F + 1] << 16 | this[F + 2] << 8 | this[F + 3];
    }, l.prototype.readFloatLE = function(F, U) {
      return F = F >>> 0, U || _(F, 4, this.length), T.read(this, F, !0, 23, 4);
    }, l.prototype.readFloatBE = function(F, U) {
      return F = F >>> 0, U || _(F, 4, this.length), T.read(this, F, !1, 23, 4);
    }, l.prototype.readDoubleLE = function(F, U) {
      return F = F >>> 0, U || _(F, 8, this.length), T.read(this, F, !0, 52, 8);
    }, l.prototype.readDoubleBE = function(F, U) {
      return F = F >>> 0, U || _(F, 8, this.length), T.read(this, F, !1, 52, 8);
    };
    function o(Y, F, U, V, ie, oe) {
      if (!l.isBuffer(Y)) throw new TypeError('"buffer" argument must be a Buffer instance');
      if (F > ie || F < oe) throw new RangeError('"value" argument is out of bounds');
      if (U + V > Y.length) throw new RangeError("Index out of range");
    }
    l.prototype.writeUintLE = l.prototype.writeUIntLE = function(F, U, V, ie) {
      if (F = +F, U = U >>> 0, V = V >>> 0, !ie) {
        var oe = Math.pow(2, 8 * V) - 1;
        o(this, F, U, V, oe, 0);
      }
      var he = 1, ve = 0;
      for (this[U] = F & 255; ++ve < V && (he *= 256); )
        this[U + ve] = F / he & 255;
      return U + V;
    }, l.prototype.writeUintBE = l.prototype.writeUIntBE = function(F, U, V, ie) {
      if (F = +F, U = U >>> 0, V = V >>> 0, !ie) {
        var oe = Math.pow(2, 8 * V) - 1;
        o(this, F, U, V, oe, 0);
      }
      var he = V - 1, ve = 1;
      for (this[U + he] = F & 255; --he >= 0 && (ve *= 256); )
        this[U + he] = F / ve & 255;
      return U + V;
    }, l.prototype.writeUint8 = l.prototype.writeUInt8 = function(F, U, V) {
      return F = +F, U = U >>> 0, V || o(this, F, U, 1, 255, 0), this[U] = F & 255, U + 1;
    }, l.prototype.writeUint16LE = l.prototype.writeUInt16LE = function(F, U, V) {
      return F = +F, U = U >>> 0, V || o(this, F, U, 2, 65535, 0), this[U] = F & 255, this[U + 1] = F >>> 8, U + 2;
    }, l.prototype.writeUint16BE = l.prototype.writeUInt16BE = function(F, U, V) {
      return F = +F, U = U >>> 0, V || o(this, F, U, 2, 65535, 0), this[U] = F >>> 8, this[U + 1] = F & 255, U + 2;
    }, l.prototype.writeUint32LE = l.prototype.writeUInt32LE = function(F, U, V) {
      return F = +F, U = U >>> 0, V || o(this, F, U, 4, 4294967295, 0), this[U + 3] = F >>> 24, this[U + 2] = F >>> 16, this[U + 1] = F >>> 8, this[U] = F & 255, U + 4;
    }, l.prototype.writeUint32BE = l.prototype.writeUInt32BE = function(F, U, V) {
      return F = +F, U = U >>> 0, V || o(this, F, U, 4, 4294967295, 0), this[U] = F >>> 24, this[U + 1] = F >>> 16, this[U + 2] = F >>> 8, this[U + 3] = F & 255, U + 4;
    }, l.prototype.writeIntLE = function(F, U, V, ie) {
      if (F = +F, U = U >>> 0, !ie) {
        var oe = Math.pow(2, 8 * V - 1);
        o(this, F, U, V, oe - 1, -oe);
      }
      var he = 0, ve = 1, le = 0;
      for (this[U] = F & 255; ++he < V && (ve *= 256); )
        F < 0 && le === 0 && this[U + he - 1] !== 0 && (le = 1), this[U + he] = (F / ve >> 0) - le & 255;
      return U + V;
    }, l.prototype.writeIntBE = function(F, U, V, ie) {
      if (F = +F, U = U >>> 0, !ie) {
        var oe = Math.pow(2, 8 * V - 1);
        o(this, F, U, V, oe - 1, -oe);
      }
      var he = V - 1, ve = 1, le = 0;
      for (this[U + he] = F & 255; --he >= 0 && (ve *= 256); )
        F < 0 && le === 0 && this[U + he + 1] !== 0 && (le = 1), this[U + he] = (F / ve >> 0) - le & 255;
      return U + V;
    }, l.prototype.writeInt8 = function(F, U, V) {
      return F = +F, U = U >>> 0, V || o(this, F, U, 1, 127, -128), F < 0 && (F = 255 + F + 1), this[U] = F & 255, U + 1;
    }, l.prototype.writeInt16LE = function(F, U, V) {
      return F = +F, U = U >>> 0, V || o(this, F, U, 2, 32767, -32768), this[U] = F & 255, this[U + 1] = F >>> 8, U + 2;
    }, l.prototype.writeInt16BE = function(F, U, V) {
      return F = +F, U = U >>> 0, V || o(this, F, U, 2, 32767, -32768), this[U] = F >>> 8, this[U + 1] = F & 255, U + 2;
    }, l.prototype.writeInt32LE = function(F, U, V) {
      return F = +F, U = U >>> 0, V || o(this, F, U, 4, 2147483647, -2147483648), this[U] = F & 255, this[U + 1] = F >>> 8, this[U + 2] = F >>> 16, this[U + 3] = F >>> 24, U + 4;
    }, l.prototype.writeInt32BE = function(F, U, V) {
      return F = +F, U = U >>> 0, V || o(this, F, U, 4, 2147483647, -2147483648), F < 0 && (F = 4294967295 + F + 1), this[U] = F >>> 24, this[U + 1] = F >>> 16, this[U + 2] = F >>> 8, this[U + 3] = F & 255, U + 4;
    };
    function P(Y, F, U, V, ie, oe) {
      if (U + V > Y.length) throw new RangeError("Index out of range");
      if (U < 0) throw new RangeError("Index out of range");
    }
    function Z(Y, F, U, V, ie) {
      return F = +F, U = U >>> 0, ie || P(Y, F, U, 4), T.write(Y, F, U, V, 23, 4), U + 4;
    }
    l.prototype.writeFloatLE = function(F, U, V) {
      return Z(this, F, U, !0, V);
    }, l.prototype.writeFloatBE = function(F, U, V) {
      return Z(this, F, U, !1, V);
    };
    function ee(Y, F, U, V, ie) {
      return F = +F, U = U >>> 0, ie || P(Y, F, U, 8), T.write(Y, F, U, V, 52, 8), U + 8;
    }
    l.prototype.writeDoubleLE = function(F, U, V) {
      return ee(this, F, U, !0, V);
    }, l.prototype.writeDoubleBE = function(F, U, V) {
      return ee(this, F, U, !1, V);
    }, l.prototype.copy = function(F, U, V, ie) {
      if (!l.isBuffer(F)) throw new TypeError("argument should be a Buffer");
      if (V || (V = 0), !ie && ie !== 0 && (ie = this.length), U >= F.length && (U = F.length), U || (U = 0), ie > 0 && ie < V && (ie = V), ie === V || F.length === 0 || this.length === 0) return 0;
      if (U < 0)
        throw new RangeError("targetStart out of bounds");
      if (V < 0 || V >= this.length) throw new RangeError("Index out of range");
      if (ie < 0) throw new RangeError("sourceEnd out of bounds");
      ie > this.length && (ie = this.length), F.length - U < ie - V && (ie = F.length - U + V);
      var oe = ie - V;
      return this === F && typeof Uint8Array.prototype.copyWithin == "function" ? this.copyWithin(U, V, ie) : Uint8Array.prototype.set.call(
        F,
        this.subarray(V, ie),
        U
      ), oe;
    }, l.prototype.fill = function(F, U, V, ie) {
      if (typeof F == "string") {
        if (typeof U == "string" ? (ie = U, U = 0, V = this.length) : typeof V == "string" && (ie = V, V = this.length), ie !== void 0 && typeof ie != "string")
          throw new TypeError("encoding must be a string");
        if (typeof ie == "string" && !l.isEncoding(ie))
          throw new TypeError("Unknown encoding: " + ie);
        if (F.length === 1) {
          var oe = F.charCodeAt(0);
          (ie === "utf8" && oe < 128 || ie === "latin1") && (F = oe);
        }
      } else typeof F == "number" ? F = F & 255 : typeof F == "boolean" && (F = Number(F));
      if (U < 0 || this.length < U || this.length < V)
        throw new RangeError("Out of range index");
      if (V <= U)
        return this;
      U = U >>> 0, V = V === void 0 ? this.length : V >>> 0, F || (F = 0);
      var he;
      if (typeof F == "number")
        for (he = U; he < V; ++he)
          this[he] = F;
      else {
        var ve = l.isBuffer(F) ? F : l.from(F, ie), le = ve.length;
        if (le === 0)
          throw new TypeError('The value "' + F + '" is invalid for argument "value"');
        for (he = 0; he < V - U; ++he)
          this[he + U] = ve[he % le];
      }
      return this;
    };
    var K = /[^+/0-9A-Za-z-_]/g;
    function L(Y) {
      if (Y = Y.split("=")[0], Y = Y.trim().replace(K, ""), Y.length < 2) return "";
      for (; Y.length % 4 !== 0; )
        Y = Y + "=";
      return Y;
    }
    function j(Y, F) {
      F = F || 1 / 0;
      for (var U, V = Y.length, ie = null, oe = [], he = 0; he < V; ++he) {
        if (U = Y.charCodeAt(he), U > 55295 && U < 57344) {
          if (!ie) {
            if (U > 56319) {
              (F -= 3) > -1 && oe.push(239, 191, 189);
              continue;
            } else if (he + 1 === V) {
              (F -= 3) > -1 && oe.push(239, 191, 189);
              continue;
            }
            ie = U;
            continue;
          }
          if (U < 56320) {
            (F -= 3) > -1 && oe.push(239, 191, 189), ie = U;
            continue;
          }
          U = (ie - 55296 << 10 | U - 56320) + 65536;
        } else ie && (F -= 3) > -1 && oe.push(239, 191, 189);
        if (ie = null, U < 128) {
          if ((F -= 1) < 0) break;
          oe.push(U);
        } else if (U < 2048) {
          if ((F -= 2) < 0) break;
          oe.push(
            U >> 6 | 192,
            U & 63 | 128
          );
        } else if (U < 65536) {
          if ((F -= 3) < 0) break;
          oe.push(
            U >> 12 | 224,
            U >> 6 & 63 | 128,
            U & 63 | 128
          );
        } else if (U < 1114112) {
          if ((F -= 4) < 0) break;
          oe.push(
            U >> 18 | 240,
            U >> 12 & 63 | 128,
            U >> 6 & 63 | 128,
            U & 63 | 128
          );
        } else
          throw new Error("Invalid code point");
      }
      return oe;
    }
    function re(Y) {
      for (var F = [], U = 0; U < Y.length; ++U)
        F.push(Y.charCodeAt(U) & 255);
      return F;
    }
    function ne(Y, F) {
      for (var U, V, ie, oe = [], he = 0; he < Y.length && !((F -= 2) < 0); ++he)
        U = Y.charCodeAt(he), V = U >> 8, ie = U % 256, oe.push(ie), oe.push(V);
      return oe;
    }
    function J(Y) {
      return M.toByteArray(L(Y));
    }
    function G(Y, F, U, V) {
      for (var ie = 0; ie < V && !(ie + U >= F.length || ie >= Y.length); ++ie)
        F[ie + U] = Y[ie];
      return ie;
    }
    function se(Y, F) {
      return Y instanceof F || Y != null && Y.constructor != null && Y.constructor.name != null && Y.constructor.name === F.name;
    }
    function ue(Y) {
      return Y !== Y;
    }
    var de = function() {
      for (var Y = "0123456789abcdef", F = new Array(256), U = 0; U < 16; ++U)
        for (var V = U * 16, ie = 0; ie < 16; ++ie)
          F[V + ie] = Y[U] + Y[ie];
      return F;
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
  } catch (I) {
    cachedSetTimeout = defaultSetTimout;
  }
  try {
    typeof clearTimeout == "function" ? cachedClearTimeout = clearTimeout : cachedClearTimeout = defaultClearTimeout;
  } catch (I) {
    cachedClearTimeout = defaultClearTimeout;
  }
})();
function runTimeout(I) {
  if (cachedSetTimeout === setTimeout)
    return setTimeout(I, 0);
  if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout)
    return cachedSetTimeout = setTimeout, setTimeout(I, 0);
  try {
    return cachedSetTimeout(I, 0);
  } catch (M) {
    try {
      return cachedSetTimeout.call(null, I, 0);
    } catch (T) {
      return cachedSetTimeout.call(this, I, 0);
    }
  }
}
function runClearTimeout(I) {
  if (cachedClearTimeout === clearTimeout)
    return clearTimeout(I);
  if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout)
    return cachedClearTimeout = clearTimeout, clearTimeout(I);
  try {
    return cachedClearTimeout(I);
  } catch (M) {
    try {
      return cachedClearTimeout.call(null, I);
    } catch (T) {
      return cachedClearTimeout.call(this, I);
    }
  }
}
var queue = [], draining = !1, currentQueue, queueIndex = -1;
function cleanUpNextTick() {
  !draining || !currentQueue || (draining = !1, currentQueue.length ? queue = currentQueue.concat(queue) : queueIndex = -1, queue.length && drainQueue());
}
function drainQueue() {
  if (!draining) {
    var I = runTimeout(cleanUpNextTick);
    draining = !0;
    for (var M = queue.length; M; ) {
      for (currentQueue = queue, queue = []; ++queueIndex < M; )
        currentQueue && currentQueue[queueIndex].run();
      queueIndex = -1, M = queue.length;
    }
    currentQueue = null, draining = !1, runClearTimeout(I);
  }
}
process.nextTick = function(I) {
  var M = new Array(arguments.length - 1);
  if (arguments.length > 1)
    for (var T = 1; T < arguments.length; T++)
      M[T - 1] = arguments[T];
  queue.push(new Item(I, M)), queue.length === 1 && !draining && runTimeout(drainQueue);
};
function Item(I, M) {
  this.fun = I, this.array = M;
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
process.listeners = function(I) {
  return [];
};
process.binding = function(I) {
  throw new Error("process.binding is not supported");
};
process.cwd = function() {
  return "/";
};
process.chdir = function(I) {
  throw new Error("process.chdir is not supported");
};
process.umask = function() {
  return 0;
};
var browserExports = browser$c.exports;
const process$1 = /* @__PURE__ */ getDefaultExportFromCjs(browserExports);
(function(I) {
  function M() {
    var q = this || self;
    return delete I.prototype.__magic__, q;
  }
  if (typeof globalThis == "object")
    return globalThis;
  if (this)
    return M();
  I.defineProperty(I.prototype, "__magic__", {
    configurable: !0,
    get: M
  });
  var T = __magic__;
  return T;
})(Object);
function commonjsRequire(I) {
  throw new Error('Could not dynamically require "' + I + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}
var bcrypt$1 = { exports: {} }, cryptoBrowserify = {}, browser$b = { exports: {} }, safeBuffer$1 = { exports: {} };
/*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
var hasRequiredSafeBuffer$1;
function requireSafeBuffer$1() {
  return hasRequiredSafeBuffer$1 || (hasRequiredSafeBuffer$1 = 1, function(I, M) {
    var T = requireBuffer$1(), q = T.Buffer;
    function C(E, l) {
      for (var b in E)
        l[b] = E[b];
    }
    q.from && q.alloc && q.allocUnsafe && q.allocUnsafeSlow ? I.exports = T : (C(T, M), M.Buffer = t);
    function t(E, l, b) {
      return q(E, l, b);
    }
    t.prototype = Object.create(q.prototype), C(q, t), t.from = function(E, l, b) {
      if (typeof E == "number")
        throw new TypeError("Argument must not be a number");
      return q(E, l, b);
    }, t.alloc = function(E, l, b) {
      if (typeof E != "number")
        throw new TypeError("Argument must be a number");
      var w = q(E);
      return l !== void 0 ? typeof b == "string" ? w.fill(l, b) : w.fill(l) : w.fill(0), w;
    }, t.allocUnsafe = function(E) {
      if (typeof E != "number")
        throw new TypeError("Argument must be a number");
      return q(E);
    }, t.allocUnsafeSlow = function(E) {
      if (typeof E != "number")
        throw new TypeError("Argument must be a number");
      return T.SlowBuffer(E);
    };
  }(safeBuffer$1, safeBuffer$1.exports)), safeBuffer$1.exports;
}
var hasRequiredBrowser$b;
function requireBrowser$b() {
  if (hasRequiredBrowser$b) return browser$b.exports;
  hasRequiredBrowser$b = 1;
  var I = 65536, M = 4294967295;
  function T() {
    throw new Error(`Secure random number generation is not supported by this browser.
Use Chrome, Firefox or Internet Explorer 11`);
  }
  var q = requireSafeBuffer$1().Buffer, C = commonjsGlobal.crypto || commonjsGlobal.msCrypto;
  C && C.getRandomValues ? browser$b.exports = t : browser$b.exports = T;
  function t(E, l) {
    if (E > M) throw new RangeError("requested too many random bytes");
    var b = q.allocUnsafe(E);
    if (E > 0)
      if (E > I)
        for (var w = 0; w < E; w += I)
          C.getRandomValues(b.slice(w, w + I));
      else
        C.getRandomValues(b);
    return typeof l == "function" ? process$1.nextTick(function() {
      l(null, b);
    }) : b;
  }
  return browser$b.exports;
}
var inherits_browser = { exports: {} }, hasRequiredInherits_browser;
function requireInherits_browser() {
  return hasRequiredInherits_browser || (hasRequiredInherits_browser = 1, typeof Object.create == "function" ? inherits_browser.exports = function(M, T) {
    T && (M.super_ = T, M.prototype = Object.create(T.prototype, {
      constructor: {
        value: M,
        enumerable: !1,
        writable: !0,
        configurable: !0
      }
    }));
  } : inherits_browser.exports = function(M, T) {
    if (T) {
      M.super_ = T;
      var q = function() {
      };
      q.prototype = T.prototype, M.prototype = new q(), M.prototype.constructor = M;
    }
  }), inherits_browser.exports;
}
var readableBrowser$1 = { exports: {} }, events = { exports: {} }, hasRequiredEvents;
function requireEvents() {
  if (hasRequiredEvents) return events.exports;
  hasRequiredEvents = 1;
  var I = typeof Reflect == "object" ? Reflect : null, M = I && typeof I.apply == "function" ? I.apply : function(X, Q, ae) {
    return Function.prototype.apply.call(X, Q, ae);
  }, T;
  I && typeof I.ownKeys == "function" ? T = I.ownKeys : Object.getOwnPropertySymbols ? T = function(X) {
    return Object.getOwnPropertyNames(X).concat(Object.getOwnPropertySymbols(X));
  } : T = function(X) {
    return Object.getOwnPropertyNames(X);
  };
  function q(z) {
    console && console.warn && console.warn(z);
  }
  var C = Number.isNaN || function(X) {
    return X !== X;
  };
  function t() {
    t.init.call(this);
  }
  events.exports = t, events.exports.once = D, t.EventEmitter = t, t.prototype._events = void 0, t.prototype._eventsCount = 0, t.prototype._maxListeners = void 0;
  var E = 10;
  function l(z) {
    if (typeof z != "function")
      throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof z);
  }
  Object.defineProperty(t, "defaultMaxListeners", {
    enumerable: !0,
    get: function() {
      return E;
    },
    set: function(z) {
      if (typeof z != "number" || z < 0 || C(z))
        throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + z + ".");
      E = z;
    }
  }), t.init = function() {
    (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) && (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0;
  }, t.prototype.setMaxListeners = function(X) {
    if (typeof X != "number" || X < 0 || C(X))
      throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + X + ".");
    return this._maxListeners = X, this;
  };
  function b(z) {
    return z._maxListeners === void 0 ? t.defaultMaxListeners : z._maxListeners;
  }
  t.prototype.getMaxListeners = function() {
    return b(this);
  }, t.prototype.emit = function(X) {
    for (var Q = [], ae = 1; ae < arguments.length; ae++) Q.push(arguments[ae]);
    var fe = X === "error", te = this._events;
    if (te !== void 0)
      fe = fe && te.error === void 0;
    else if (!fe)
      return !1;
    if (fe) {
      var ce;
      if (Q.length > 0 && (ce = Q[0]), ce instanceof Error)
        throw ce;
      var H = new Error("Unhandled error." + (ce ? " (" + ce.message + ")" : ""));
      throw H.context = ce, H;
    }
    var A = te[X];
    if (A === void 0)
      return !1;
    if (typeof A == "function")
      M(A, this, Q);
    else
      for (var c = A.length, e = k(A, c), ae = 0; ae < c; ++ae)
        M(e[ae], this, Q);
    return !0;
  };
  function w(z, X, Q, ae) {
    var fe, te, ce;
    if (l(Q), te = z._events, te === void 0 ? (te = z._events = /* @__PURE__ */ Object.create(null), z._eventsCount = 0) : (te.newListener !== void 0 && (z.emit(
      "newListener",
      X,
      Q.listener ? Q.listener : Q
    ), te = z._events), ce = te[X]), ce === void 0)
      ce = te[X] = Q, ++z._eventsCount;
    else if (typeof ce == "function" ? ce = te[X] = ae ? [Q, ce] : [ce, Q] : ae ? ce.unshift(Q) : ce.push(Q), fe = b(z), fe > 0 && ce.length > fe && !ce.warned) {
      ce.warned = !0;
      var H = new Error("Possible EventEmitter memory leak detected. " + ce.length + " " + String(X) + " listeners added. Use emitter.setMaxListeners() to increase limit");
      H.name = "MaxListenersExceededWarning", H.emitter = z, H.type = X, H.count = ce.length, q(H);
    }
    return z;
  }
  t.prototype.addListener = function(X, Q) {
    return w(this, X, Q, !1);
  }, t.prototype.on = t.prototype.addListener, t.prototype.prependListener = function(X, Q) {
    return w(this, X, Q, !0);
  };
  function u() {
    if (!this.fired)
      return this.target.removeListener(this.type, this.wrapFn), this.fired = !0, arguments.length === 0 ? this.listener.call(this.target) : this.listener.apply(this.target, arguments);
  }
  function g(z, X, Q) {
    var ae = { fired: !1, wrapFn: void 0, target: z, type: X, listener: Q }, fe = u.bind(ae);
    return fe.listener = Q, ae.wrapFn = fe, fe;
  }
  t.prototype.once = function(X, Q) {
    return l(Q), this.on(X, g(this, X, Q)), this;
  }, t.prototype.prependOnceListener = function(X, Q) {
    return l(Q), this.prependListener(X, g(this, X, Q)), this;
  }, t.prototype.removeListener = function(X, Q) {
    var ae, fe, te, ce, H;
    if (l(Q), fe = this._events, fe === void 0)
      return this;
    if (ae = fe[X], ae === void 0)
      return this;
    if (ae === Q || ae.listener === Q)
      --this._eventsCount === 0 ? this._events = /* @__PURE__ */ Object.create(null) : (delete fe[X], fe.removeListener && this.emit("removeListener", X, ae.listener || Q));
    else if (typeof ae != "function") {
      for (te = -1, ce = ae.length - 1; ce >= 0; ce--)
        if (ae[ce] === Q || ae[ce].listener === Q) {
          H = ae[ce].listener, te = ce;
          break;
        }
      if (te < 0)
        return this;
      te === 0 ? ae.shift() : $(ae, te), ae.length === 1 && (fe[X] = ae[0]), fe.removeListener !== void 0 && this.emit("removeListener", X, H || Q);
    }
    return this;
  }, t.prototype.off = t.prototype.removeListener, t.prototype.removeAllListeners = function(X) {
    var Q, ae, fe;
    if (ae = this._events, ae === void 0)
      return this;
    if (ae.removeListener === void 0)
      return arguments.length === 0 ? (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0) : ae[X] !== void 0 && (--this._eventsCount === 0 ? this._events = /* @__PURE__ */ Object.create(null) : delete ae[X]), this;
    if (arguments.length === 0) {
      var te = Object.keys(ae), ce;
      for (fe = 0; fe < te.length; ++fe)
        ce = te[fe], ce !== "removeListener" && this.removeAllListeners(ce);
      return this.removeAllListeners("removeListener"), this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0, this;
    }
    if (Q = ae[X], typeof Q == "function")
      this.removeListener(X, Q);
    else if (Q !== void 0)
      for (fe = Q.length - 1; fe >= 0; fe--)
        this.removeListener(X, Q[fe]);
    return this;
  };
  function R(z, X, Q) {
    var ae = z._events;
    if (ae === void 0)
      return [];
    var fe = ae[X];
    return fe === void 0 ? [] : typeof fe == "function" ? Q ? [fe.listener || fe] : [fe] : Q ? O(fe) : k(fe, fe.length);
  }
  t.prototype.listeners = function(X) {
    return R(this, X, !0);
  }, t.prototype.rawListeners = function(X) {
    return R(this, X, !1);
  }, t.listenerCount = function(z, X) {
    return typeof z.listenerCount == "function" ? z.listenerCount(X) : B.call(z, X);
  }, t.prototype.listenerCount = B;
  function B(z) {
    var X = this._events;
    if (X !== void 0) {
      var Q = X[z];
      if (typeof Q == "function")
        return 1;
      if (Q !== void 0)
        return Q.length;
    }
    return 0;
  }
  t.prototype.eventNames = function() {
    return this._eventsCount > 0 ? T(this._events) : [];
  };
  function k(z, X) {
    for (var Q = new Array(X), ae = 0; ae < X; ++ae)
      Q[ae] = z[ae];
    return Q;
  }
  function $(z, X) {
    for (; X + 1 < z.length; X++)
      z[X] = z[X + 1];
    z.pop();
  }
  function O(z) {
    for (var X = new Array(z.length), Q = 0; Q < X.length; ++Q)
      X[Q] = z[Q].listener || z[Q];
    return X;
  }
  function D(z, X) {
    return new Promise(function(Q, ae) {
      function fe(ce) {
        z.removeListener(X, te), ae(ce);
      }
      function te() {
        typeof z.removeListener == "function" && z.removeListener("error", fe), Q([].slice.call(arguments));
      }
      W(z, X, te, { once: !0 }), X !== "error" && N(z, fe, { once: !0 });
    });
  }
  function N(z, X, Q) {
    typeof z.on == "function" && W(z, "error", X, Q);
  }
  function W(z, X, Q, ae) {
    if (typeof z.on == "function")
      ae.once ? z.once(X, Q) : z.on(X, Q);
    else if (typeof z.addEventListener == "function")
      z.addEventListener(X, function fe(te) {
        ae.once && z.removeEventListener(X, fe), Q(te);
      });
    else
      throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof z);
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
    var M = {}, T = Symbol("test"), q = Object(T);
    if (typeof T == "string" || Object.prototype.toString.call(T) !== "[object Symbol]" || Object.prototype.toString.call(q) !== "[object Symbol]")
      return !1;
    var C = 42;
    M[T] = C;
    for (T in M)
      return !1;
    if (typeof Object.keys == "function" && Object.keys(M).length !== 0 || typeof Object.getOwnPropertyNames == "function" && Object.getOwnPropertyNames(M).length !== 0)
      return !1;
    var t = Object.getOwnPropertySymbols(M);
    if (t.length !== 1 || t[0] !== T || !Object.prototype.propertyIsEnumerable.call(M, T))
      return !1;
    if (typeof Object.getOwnPropertyDescriptor == "function") {
      var E = Object.getOwnPropertyDescriptor(M, T);
      if (E.value !== C || E.enumerable !== !0)
        return !1;
    }
    return !0;
  }), shams$1;
}
var shams, hasRequiredShams;
function requireShams() {
  if (hasRequiredShams) return shams;
  hasRequiredShams = 1;
  var I = requireShams$1();
  return shams = function() {
    return I() && !!Symbol.toStringTag;
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
  var I = typeof Symbol != "undefined" && Symbol, M = requireShams$1();
  return hasSymbols = function() {
    return typeof I != "function" || typeof Symbol != "function" || typeof I("foo") != "symbol" || typeof Symbol("bar") != "symbol" ? !1 : M();
  }, hasSymbols;
}
var hasProto, hasRequiredHasProto;
function requireHasProto() {
  if (hasRequiredHasProto) return hasProto;
  hasRequiredHasProto = 1;
  var I = {
    __proto__: null,
    foo: {}
  }, M = Object;
  return hasProto = function() {
    return { __proto__: I }.foo === I.foo && !(I instanceof M);
  }, hasProto;
}
var implementation, hasRequiredImplementation;
function requireImplementation() {
  if (hasRequiredImplementation) return implementation;
  hasRequiredImplementation = 1;
  var I = "Function.prototype.bind called on incompatible ", M = Object.prototype.toString, T = Math.max, q = "[object Function]", C = function(b, w) {
    for (var u = [], g = 0; g < b.length; g += 1)
      u[g] = b[g];
    for (var R = 0; R < w.length; R += 1)
      u[R + b.length] = w[R];
    return u;
  }, t = function(b, w) {
    for (var u = [], g = w, R = 0; g < b.length; g += 1, R += 1)
      u[R] = b[g];
    return u;
  }, E = function(l, b) {
    for (var w = "", u = 0; u < l.length; u += 1)
      w += l[u], u + 1 < l.length && (w += b);
    return w;
  };
  return implementation = function(b) {
    var w = this;
    if (typeof w != "function" || M.apply(w) !== q)
      throw new TypeError(I + w);
    for (var u = t(arguments, 1), g, R = function() {
      if (this instanceof g) {
        var D = w.apply(
          this,
          C(u, arguments)
        );
        return Object(D) === D ? D : this;
      }
      return w.apply(
        b,
        C(u, arguments)
      );
    }, B = T(0, w.length - u.length), k = [], $ = 0; $ < B; $++)
      k[$] = "$" + $;
    if (g = Function("binder", "return function (" + E(k, ",") + "){ return binder.apply(this,arguments); }")(R), w.prototype) {
      var O = function() {
      };
      O.prototype = w.prototype, g.prototype = new O(), O.prototype = null;
    }
    return g;
  }, implementation;
}
var functionBind, hasRequiredFunctionBind;
function requireFunctionBind() {
  if (hasRequiredFunctionBind) return functionBind;
  hasRequiredFunctionBind = 1;
  var I = requireImplementation();
  return functionBind = Function.prototype.bind || I, functionBind;
}
var hasown, hasRequiredHasown;
function requireHasown() {
  if (hasRequiredHasown) return hasown;
  hasRequiredHasown = 1;
  var I = Function.prototype.call, M = Object.prototype.hasOwnProperty, T = requireFunctionBind();
  return hasown = T.call(I, M), hasown;
}
var getIntrinsic, hasRequiredGetIntrinsic;
function requireGetIntrinsic() {
  if (hasRequiredGetIntrinsic) return getIntrinsic;
  hasRequiredGetIntrinsic = 1;
  var I, M = requireEsErrors(), T = require_eval(), q = requireRange(), C = requireRef(), t = requireSyntax(), E = requireType(), l = requireUri(), b = Function, w = function(x) {
    try {
      return b('"use strict"; return (' + x + ").constructor;")();
    } catch (d) {
    }
  }, u = Object.getOwnPropertyDescriptor;
  if (u)
    try {
      u({}, "");
    } catch (x) {
      u = null;
    }
  var g = function() {
    throw new E();
  }, R = u ? function() {
    try {
      return arguments.callee, g;
    } catch (x) {
      try {
        return u(arguments, "callee").get;
      } catch (d) {
        return g;
      }
    }
  }() : g, B = requireHasSymbols()(), k = requireHasProto()(), $ = Object.getPrototypeOf || (k ? function(x) {
    return x.__proto__;
  } : null), O = {}, D = typeof Uint8Array == "undefined" || !$ ? I : $(Uint8Array), N = {
    __proto__: null,
    "%AggregateError%": typeof AggregateError == "undefined" ? I : AggregateError,
    "%Array%": Array,
    "%ArrayBuffer%": typeof ArrayBuffer == "undefined" ? I : ArrayBuffer,
    "%ArrayIteratorPrototype%": B && $ ? $([][Symbol.iterator]()) : I,
    "%AsyncFromSyncIteratorPrototype%": I,
    "%AsyncFunction%": O,
    "%AsyncGenerator%": O,
    "%AsyncGeneratorFunction%": O,
    "%AsyncIteratorPrototype%": O,
    "%Atomics%": typeof Atomics == "undefined" ? I : Atomics,
    "%BigInt%": typeof BigInt == "undefined" ? I : BigInt,
    "%BigInt64Array%": typeof BigInt64Array == "undefined" ? I : BigInt64Array,
    "%BigUint64Array%": typeof BigUint64Array == "undefined" ? I : BigUint64Array,
    "%Boolean%": Boolean,
    "%DataView%": typeof DataView == "undefined" ? I : DataView,
    "%Date%": Date,
    "%decodeURI%": decodeURI,
    "%decodeURIComponent%": decodeURIComponent,
    "%encodeURI%": encodeURI,
    "%encodeURIComponent%": encodeURIComponent,
    "%Error%": M,
    "%eval%": eval,
    // eslint-disable-line no-eval
    "%EvalError%": T,
    "%Float32Array%": typeof Float32Array == "undefined" ? I : Float32Array,
    "%Float64Array%": typeof Float64Array == "undefined" ? I : Float64Array,
    "%FinalizationRegistry%": typeof FinalizationRegistry == "undefined" ? I : FinalizationRegistry,
    "%Function%": b,
    "%GeneratorFunction%": O,
    "%Int8Array%": typeof Int8Array == "undefined" ? I : Int8Array,
    "%Int16Array%": typeof Int16Array == "undefined" ? I : Int16Array,
    "%Int32Array%": typeof Int32Array == "undefined" ? I : Int32Array,
    "%isFinite%": isFinite,
    "%isNaN%": isNaN,
    "%IteratorPrototype%": B && $ ? $($([][Symbol.iterator]())) : I,
    "%JSON%": typeof JSON == "object" ? JSON : I,
    "%Map%": typeof Map == "undefined" ? I : Map,
    "%MapIteratorPrototype%": typeof Map == "undefined" || !B || !$ ? I : $((/* @__PURE__ */ new Map())[Symbol.iterator]()),
    "%Math%": Math,
    "%Number%": Number,
    "%Object%": Object,
    "%parseFloat%": parseFloat,
    "%parseInt%": parseInt,
    "%Promise%": typeof Promise == "undefined" ? I : Promise,
    "%Proxy%": typeof Proxy == "undefined" ? I : Proxy,
    "%RangeError%": q,
    "%ReferenceError%": C,
    "%Reflect%": typeof Reflect == "undefined" ? I : Reflect,
    "%RegExp%": RegExp,
    "%Set%": typeof Set == "undefined" ? I : Set,
    "%SetIteratorPrototype%": typeof Set == "undefined" || !B || !$ ? I : $((/* @__PURE__ */ new Set())[Symbol.iterator]()),
    "%SharedArrayBuffer%": typeof SharedArrayBuffer == "undefined" ? I : SharedArrayBuffer,
    "%String%": String,
    "%StringIteratorPrototype%": B && $ ? $(""[Symbol.iterator]()) : I,
    "%Symbol%": B ? Symbol : I,
    "%SyntaxError%": t,
    "%ThrowTypeError%": R,
    "%TypedArray%": D,
    "%TypeError%": E,
    "%Uint8Array%": typeof Uint8Array == "undefined" ? I : Uint8Array,
    "%Uint8ClampedArray%": typeof Uint8ClampedArray == "undefined" ? I : Uint8ClampedArray,
    "%Uint16Array%": typeof Uint16Array == "undefined" ? I : Uint16Array,
    "%Uint32Array%": typeof Uint32Array == "undefined" ? I : Uint32Array,
    "%URIError%": l,
    "%WeakMap%": typeof WeakMap == "undefined" ? I : WeakMap,
    "%WeakRef%": typeof WeakRef == "undefined" ? I : WeakRef,
    "%WeakSet%": typeof WeakSet == "undefined" ? I : WeakSet
  };
  if ($)
    try {
      null.error;
    } catch (x) {
      var W = $($(x));
      N["%Error.prototype%"] = W;
    }
  var z = function x(d) {
    var y;
    if (d === "%AsyncFunction%")
      y = w("async function () {}");
    else if (d === "%GeneratorFunction%")
      y = w("function* () {}");
    else if (d === "%AsyncGeneratorFunction%")
      y = w("async function* () {}");
    else if (d === "%AsyncGenerator%") {
      var p = x("%AsyncGeneratorFunction%");
      p && (y = p.prototype);
    } else if (d === "%AsyncIteratorPrototype%") {
      var _ = x("%AsyncGenerator%");
      _ && $ && (y = $(_.prototype));
    }
    return N[d] = y, y;
  }, X = {
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
  }, Q = requireFunctionBind(), ae = requireHasown(), fe = Q.call(Function.call, Array.prototype.concat), te = Q.call(Function.apply, Array.prototype.splice), ce = Q.call(Function.call, String.prototype.replace), H = Q.call(Function.call, String.prototype.slice), A = Q.call(Function.call, RegExp.prototype.exec), c = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g, e = /\\(\\)?/g, a = function(d) {
    var y = H(d, 0, 1), p = H(d, -1);
    if (y === "%" && p !== "%")
      throw new t("invalid intrinsic syntax, expected closing `%`");
    if (p === "%" && y !== "%")
      throw new t("invalid intrinsic syntax, expected opening `%`");
    var _ = [];
    return ce(d, c, function(o, P, Z, ee) {
      _[_.length] = Z ? ce(ee, e, "$1") : P || o;
    }), _;
  }, v = function(d, y) {
    var p = d, _;
    if (ae(X, p) && (_ = X[p], p = "%" + _[0] + "%"), ae(N, p)) {
      var o = N[p];
      if (o === O && (o = z(p)), typeof o == "undefined" && !y)
        throw new E("intrinsic " + d + " exists, but is not available. Please file an issue!");
      return {
        alias: _,
        name: p,
        value: o
      };
    }
    throw new t("intrinsic " + d + " does not exist!");
  };
  return getIntrinsic = function(d, y) {
    if (typeof d != "string" || d.length === 0)
      throw new E("intrinsic name must be a non-empty string");
    if (arguments.length > 1 && typeof y != "boolean")
      throw new E('"allowMissing" argument must be a boolean');
    if (A(/^%?[^%]*%?$/, d) === null)
      throw new t("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
    var p = a(d), _ = p.length > 0 ? p[0] : "", o = v("%" + _ + "%", y), P = o.name, Z = o.value, ee = !1, K = o.alias;
    K && (_ = K[0], te(p, fe([0, 1], K)));
    for (var L = 1, j = !0; L < p.length; L += 1) {
      var re = p[L], ne = H(re, 0, 1), J = H(re, -1);
      if ((ne === '"' || ne === "'" || ne === "`" || J === '"' || J === "'" || J === "`") && ne !== J)
        throw new t("property names with quotes must have matching quotes");
      if ((re === "constructor" || !j) && (ee = !0), _ += "." + re, P = "%" + _ + "%", ae(N, P))
        Z = N[P];
      else if (Z != null) {
        if (!(re in Z)) {
          if (!y)
            throw new E("base intrinsic for " + d + " exists, but the property is not available.");
          return;
        }
        if (u && L + 1 >= p.length) {
          var G = u(Z, re);
          j = !!G, j && "get" in G && !("originalValue" in G.get) ? Z = G.get : Z = Z[re];
        } else
          j = ae(Z, re), Z = Z[re];
        j && !ee && (N[P] = Z);
      }
    }
    return Z;
  }, getIntrinsic;
}
var callBind = { exports: {} }, esDefineProperty, hasRequiredEsDefineProperty;
function requireEsDefineProperty() {
  if (hasRequiredEsDefineProperty) return esDefineProperty;
  hasRequiredEsDefineProperty = 1;
  var I = requireGetIntrinsic(), M = I("%Object.defineProperty%", !0) || !1;
  if (M)
    try {
      M({}, "a", { value: 1 });
    } catch (T) {
      M = !1;
    }
  return esDefineProperty = M, esDefineProperty;
}
var gopd, hasRequiredGopd;
function requireGopd() {
  if (hasRequiredGopd) return gopd;
  hasRequiredGopd = 1;
  var I = requireGetIntrinsic(), M = I("%Object.getOwnPropertyDescriptor%", !0);
  if (M)
    try {
      M([], "length");
    } catch (T) {
      M = null;
    }
  return gopd = M, gopd;
}
var defineDataProperty, hasRequiredDefineDataProperty;
function requireDefineDataProperty() {
  if (hasRequiredDefineDataProperty) return defineDataProperty;
  hasRequiredDefineDataProperty = 1;
  var I = requireEsDefineProperty(), M = requireSyntax(), T = requireType(), q = requireGopd();
  return defineDataProperty = function(t, E, l) {
    if (!t || typeof t != "object" && typeof t != "function")
      throw new T("`obj` must be an object or a function`");
    if (typeof E != "string" && typeof E != "symbol")
      throw new T("`property` must be a string or a symbol`");
    if (arguments.length > 3 && typeof arguments[3] != "boolean" && arguments[3] !== null)
      throw new T("`nonEnumerable`, if provided, must be a boolean or null");
    if (arguments.length > 4 && typeof arguments[4] != "boolean" && arguments[4] !== null)
      throw new T("`nonWritable`, if provided, must be a boolean or null");
    if (arguments.length > 5 && typeof arguments[5] != "boolean" && arguments[5] !== null)
      throw new T("`nonConfigurable`, if provided, must be a boolean or null");
    if (arguments.length > 6 && typeof arguments[6] != "boolean")
      throw new T("`loose`, if provided, must be a boolean");
    var b = arguments.length > 3 ? arguments[3] : null, w = arguments.length > 4 ? arguments[4] : null, u = arguments.length > 5 ? arguments[5] : null, g = arguments.length > 6 ? arguments[6] : !1, R = !!q && q(t, E);
    if (I)
      I(t, E, {
        configurable: u === null && R ? R.configurable : !u,
        enumerable: b === null && R ? R.enumerable : !b,
        value: l,
        writable: w === null && R ? R.writable : !w
      });
    else if (g || !b && !w && !u)
      t[E] = l;
    else
      throw new M("This environment does not support defining a property as non-configurable, non-writable, or non-enumerable.");
  }, defineDataProperty;
}
var hasPropertyDescriptors_1, hasRequiredHasPropertyDescriptors;
function requireHasPropertyDescriptors() {
  if (hasRequiredHasPropertyDescriptors) return hasPropertyDescriptors_1;
  hasRequiredHasPropertyDescriptors = 1;
  var I = requireEsDefineProperty(), M = function() {
    return !!I;
  };
  return M.hasArrayLengthDefineBug = function() {
    if (!I)
      return null;
    try {
      return I([], "length", { value: 1 }).length !== 1;
    } catch (q) {
      return !0;
    }
  }, hasPropertyDescriptors_1 = M, hasPropertyDescriptors_1;
}
var setFunctionLength, hasRequiredSetFunctionLength;
function requireSetFunctionLength() {
  if (hasRequiredSetFunctionLength) return setFunctionLength;
  hasRequiredSetFunctionLength = 1;
  var I = requireGetIntrinsic(), M = requireDefineDataProperty(), T = requireHasPropertyDescriptors()(), q = requireGopd(), C = requireType(), t = I("%Math.floor%");
  return setFunctionLength = function(l, b) {
    if (typeof l != "function")
      throw new C("`fn` is not a function");
    if (typeof b != "number" || b < 0 || b > 4294967295 || t(b) !== b)
      throw new C("`length` must be a positive 32-bit integer");
    var w = arguments.length > 2 && !!arguments[2], u = !0, g = !0;
    if ("length" in l && q) {
      var R = q(l, "length");
      R && !R.configurable && (u = !1), R && !R.writable && (g = !1);
    }
    return (u || g || !w) && (T ? M(
      /** @type {Parameters<define>[0]} */
      l,
      "length",
      b,
      !0,
      !0
    ) : M(
      /** @type {Parameters<define>[0]} */
      l,
      "length",
      b
    )), l;
  }, setFunctionLength;
}
var hasRequiredCallBind;
function requireCallBind() {
  return hasRequiredCallBind || (hasRequiredCallBind = 1, function(I) {
    var M = requireFunctionBind(), T = requireGetIntrinsic(), q = requireSetFunctionLength(), C = requireType(), t = T("%Function.prototype.apply%"), E = T("%Function.prototype.call%"), l = T("%Reflect.apply%", !0) || M.call(E, t), b = requireEsDefineProperty(), w = T("%Math.max%");
    I.exports = function(R) {
      if (typeof R != "function")
        throw new C("a function is required");
      var B = l(M, E, arguments);
      return q(
        B,
        1 + w(0, R.length - (arguments.length - 1)),
        !0
      );
    };
    var u = function() {
      return l(M, t, arguments);
    };
    b ? b(I.exports, "apply", { value: u }) : I.exports.apply = u;
  }(callBind)), callBind.exports;
}
var callBound, hasRequiredCallBound;
function requireCallBound() {
  if (hasRequiredCallBound) return callBound;
  hasRequiredCallBound = 1;
  var I = requireGetIntrinsic(), M = requireCallBind(), T = M(I("String.prototype.indexOf"));
  return callBound = function(C, t) {
    var E = I(C, !!t);
    return typeof E == "function" && T(C, ".prototype.") > -1 ? M(E) : E;
  }, callBound;
}
var isArguments, hasRequiredIsArguments;
function requireIsArguments() {
  if (hasRequiredIsArguments) return isArguments;
  hasRequiredIsArguments = 1;
  var I = requireShams()(), M = requireCallBound(), T = M("Object.prototype.toString"), q = function(l) {
    return I && l && typeof l == "object" && Symbol.toStringTag in l ? !1 : T(l) === "[object Arguments]";
  }, C = function(l) {
    return q(l) ? !0 : l !== null && typeof l == "object" && typeof l.length == "number" && l.length >= 0 && T(l) !== "[object Array]" && T(l.callee) === "[object Function]";
  }, t = function() {
    return q(arguments);
  }();
  return q.isLegacyArguments = C, isArguments = t ? q : C, isArguments;
}
var isGeneratorFunction, hasRequiredIsGeneratorFunction;
function requireIsGeneratorFunction() {
  if (hasRequiredIsGeneratorFunction) return isGeneratorFunction;
  hasRequiredIsGeneratorFunction = 1;
  var I = Object.prototype.toString, M = Function.prototype.toString, T = /^\s*(?:function)?\*/, q = requireShams()(), C = Object.getPrototypeOf, t = function() {
    if (!q)
      return !1;
    try {
      return Function("return function*() {}")();
    } catch (l) {
    }
  }, E;
  return isGeneratorFunction = function(b) {
    if (typeof b != "function")
      return !1;
    if (T.test(M.call(b)))
      return !0;
    if (!q) {
      var w = I.call(b);
      return w === "[object GeneratorFunction]";
    }
    if (!C)
      return !1;
    if (typeof E == "undefined") {
      var u = t();
      E = u ? C(u) : !1;
    }
    return C(b) === E;
  }, isGeneratorFunction;
}
var isCallable, hasRequiredIsCallable;
function requireIsCallable() {
  if (hasRequiredIsCallable) return isCallable;
  hasRequiredIsCallable = 1;
  var I = Function.prototype.toString, M = typeof Reflect == "object" && Reflect !== null && Reflect.apply, T, q;
  if (typeof M == "function" && typeof Object.defineProperty == "function")
    try {
      T = Object.defineProperty({}, "length", {
        get: function() {
          throw q;
        }
      }), q = {}, M(function() {
        throw 42;
      }, null, T);
    } catch (N) {
      N !== q && (M = null);
    }
  else
    M = null;
  var C = /^\s*class\b/, t = function(W) {
    try {
      var z = I.call(W);
      return C.test(z);
    } catch (X) {
      return !1;
    }
  }, E = function(W) {
    try {
      return t(W) ? !1 : (I.call(W), !0);
    } catch (z) {
      return !1;
    }
  }, l = Object.prototype.toString, b = "[object Object]", w = "[object Function]", u = "[object GeneratorFunction]", g = "[object HTMLAllCollection]", R = "[object HTML document.all class]", B = "[object HTMLCollection]", k = typeof Symbol == "function" && !!Symbol.toStringTag, $ = !(0 in [,]), O = function() {
    return !1;
  };
  if (typeof document == "object") {
    var D = document.all;
    l.call(D) === l.call(document.all) && (O = function(W) {
      if (($ || !W) && (typeof W == "undefined" || typeof W == "object"))
        try {
          var z = l.call(W);
          return (z === g || z === R || z === B || z === b) && W("") == null;
        } catch (X) {
        }
      return !1;
    });
  }
  return isCallable = M ? function(W) {
    if (O(W))
      return !0;
    if (!W || typeof W != "function" && typeof W != "object")
      return !1;
    try {
      M(W, null, T);
    } catch (z) {
      if (z !== q)
        return !1;
    }
    return !t(W) && E(W);
  } : function(W) {
    if (O(W))
      return !0;
    if (!W || typeof W != "function" && typeof W != "object")
      return !1;
    if (k)
      return E(W);
    if (t(W))
      return !1;
    var z = l.call(W);
    return z !== w && z !== u && !/^\[object HTML/.test(z) ? !1 : E(W);
  }, isCallable;
}
var forEach_1, hasRequiredForEach;
function requireForEach() {
  if (hasRequiredForEach) return forEach_1;
  hasRequiredForEach = 1;
  var I = requireIsCallable(), M = Object.prototype.toString, T = Object.prototype.hasOwnProperty, q = function(b, w, u) {
    for (var g = 0, R = b.length; g < R; g++)
      T.call(b, g) && (u == null ? w(b[g], g, b) : w.call(u, b[g], g, b));
  }, C = function(b, w, u) {
    for (var g = 0, R = b.length; g < R; g++)
      u == null ? w(b.charAt(g), g, b) : w.call(u, b.charAt(g), g, b);
  }, t = function(b, w, u) {
    for (var g in b)
      T.call(b, g) && (u == null ? w(b[g], g, b) : w.call(u, b[g], g, b));
  }, E = function(b, w, u) {
    if (!I(w))
      throw new TypeError("iterator must be a function");
    var g;
    arguments.length >= 3 && (g = u), M.call(b) === "[object Array]" ? q(b, w, g) : typeof b == "string" ? C(b, w, g) : t(b, w, g);
  };
  return forEach_1 = E, forEach_1;
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
  var I = requirePossibleTypedArrayNames(), M = typeof globalThis == "undefined" ? commonjsGlobal : globalThis;
  return availableTypedArrays = function() {
    for (var q = [], C = 0; C < I.length; C++)
      typeof M[I[C]] == "function" && (q[q.length] = I[C]);
    return q;
  }, availableTypedArrays;
}
var whichTypedArray, hasRequiredWhichTypedArray;
function requireWhichTypedArray() {
  if (hasRequiredWhichTypedArray) return whichTypedArray;
  hasRequiredWhichTypedArray = 1;
  var I = requireForEach(), M = requireAvailableTypedArrays(), T = requireCallBind(), q = requireCallBound(), C = requireGopd(), t = q("Object.prototype.toString"), E = requireShams()(), l = typeof globalThis == "undefined" ? commonjsGlobal : globalThis, b = M(), w = q("String.prototype.slice"), u = Object.getPrototypeOf, g = q("Array.prototype.indexOf", !0) || function(O, D) {
    for (var N = 0; N < O.length; N += 1)
      if (O[N] === D)
        return N;
    return -1;
  }, R = { __proto__: null };
  E && C && u ? I(b, function($) {
    var O = new l[$]();
    if (Symbol.toStringTag in O) {
      var D = u(O), N = C(D, Symbol.toStringTag);
      if (!N) {
        var W = u(D);
        N = C(W, Symbol.toStringTag);
      }
      R["$" + $] = T(N.get);
    }
  }) : I(b, function($) {
    var O = new l[$](), D = O.slice || O.set;
    D && (R["$" + $] = T(D));
  });
  var B = function(O) {
    var D = !1;
    return I(
      // eslint-disable-next-line no-extra-parens
      /** @type {Record<`\$${TypedArrayName}`, Getter>} */
      /** @type {any} */
      R,
      /** @type {(getter: Getter, name: `\$${import('.').TypedArrayName}`) => void} */
      function(N, W) {
        if (!D)
          try {
            "$" + N(O) === W && (D = w(W, 1));
          } catch (z) {
          }
      }
    ), D;
  }, k = function(O) {
    var D = !1;
    return I(
      // eslint-disable-next-line no-extra-parens
      /** @type {Record<`\$${TypedArrayName}`, Getter>} */
      /** @type {any} */
      R,
      /** @type {(getter: typeof cache, name: `\$${import('.').TypedArrayName}`) => void} */
      function(N, W) {
        if (!D)
          try {
            N(O), D = w(W, 1);
          } catch (z) {
          }
      }
    ), D;
  };
  return whichTypedArray = function(O) {
    if (!O || typeof O != "object")
      return !1;
    if (!E) {
      var D = w(t(O), 8, -1);
      return g(b, D) > -1 ? D : D !== "Object" ? !1 : k(O);
    }
    return C ? B(O) : null;
  }, whichTypedArray;
}
var isTypedArray, hasRequiredIsTypedArray;
function requireIsTypedArray() {
  if (hasRequiredIsTypedArray) return isTypedArray;
  hasRequiredIsTypedArray = 1;
  var I = requireWhichTypedArray();
  return isTypedArray = function(T) {
    return !!I(T);
  }, isTypedArray;
}
var hasRequiredTypes;
function requireTypes() {
  return hasRequiredTypes || (hasRequiredTypes = 1, function(I) {
    var M = requireIsArguments(), T = requireIsGeneratorFunction(), q = requireWhichTypedArray(), C = requireIsTypedArray();
    function t(V) {
      return V.call.bind(V);
    }
    var E = typeof BigInt != "undefined", l = typeof Symbol != "undefined", b = t(Object.prototype.toString), w = t(Number.prototype.valueOf), u = t(String.prototype.valueOf), g = t(Boolean.prototype.valueOf);
    if (E)
      var R = t(BigInt.prototype.valueOf);
    if (l)
      var B = t(Symbol.prototype.valueOf);
    function k(V, ie) {
      if (typeof V != "object")
        return !1;
      try {
        return ie(V), !0;
      } catch (oe) {
        return !1;
      }
    }
    I.isArgumentsObject = M, I.isGeneratorFunction = T, I.isTypedArray = C;
    function $(V) {
      return typeof Promise != "undefined" && V instanceof Promise || V !== null && typeof V == "object" && typeof V.then == "function" && typeof V.catch == "function";
    }
    I.isPromise = $;
    function O(V) {
      return typeof ArrayBuffer != "undefined" && ArrayBuffer.isView ? ArrayBuffer.isView(V) : C(V) || P(V);
    }
    I.isArrayBufferView = O;
    function D(V) {
      return q(V) === "Uint8Array";
    }
    I.isUint8Array = D;
    function N(V) {
      return q(V) === "Uint8ClampedArray";
    }
    I.isUint8ClampedArray = N;
    function W(V) {
      return q(V) === "Uint16Array";
    }
    I.isUint16Array = W;
    function z(V) {
      return q(V) === "Uint32Array";
    }
    I.isUint32Array = z;
    function X(V) {
      return q(V) === "Int8Array";
    }
    I.isInt8Array = X;
    function Q(V) {
      return q(V) === "Int16Array";
    }
    I.isInt16Array = Q;
    function ae(V) {
      return q(V) === "Int32Array";
    }
    I.isInt32Array = ae;
    function fe(V) {
      return q(V) === "Float32Array";
    }
    I.isFloat32Array = fe;
    function te(V) {
      return q(V) === "Float64Array";
    }
    I.isFloat64Array = te;
    function ce(V) {
      return q(V) === "BigInt64Array";
    }
    I.isBigInt64Array = ce;
    function H(V) {
      return q(V) === "BigUint64Array";
    }
    I.isBigUint64Array = H;
    function A(V) {
      return b(V) === "[object Map]";
    }
    A.working = typeof Map != "undefined" && A(/* @__PURE__ */ new Map());
    function c(V) {
      return typeof Map == "undefined" ? !1 : A.working ? A(V) : V instanceof Map;
    }
    I.isMap = c;
    function e(V) {
      return b(V) === "[object Set]";
    }
    e.working = typeof Set != "undefined" && e(/* @__PURE__ */ new Set());
    function a(V) {
      return typeof Set == "undefined" ? !1 : e.working ? e(V) : V instanceof Set;
    }
    I.isSet = a;
    function v(V) {
      return b(V) === "[object WeakMap]";
    }
    v.working = typeof WeakMap != "undefined" && v(/* @__PURE__ */ new WeakMap());
    function x(V) {
      return typeof WeakMap == "undefined" ? !1 : v.working ? v(V) : V instanceof WeakMap;
    }
    I.isWeakMap = x;
    function d(V) {
      return b(V) === "[object WeakSet]";
    }
    d.working = typeof WeakSet != "undefined" && d(/* @__PURE__ */ new WeakSet());
    function y(V) {
      return d(V);
    }
    I.isWeakSet = y;
    function p(V) {
      return b(V) === "[object ArrayBuffer]";
    }
    p.working = typeof ArrayBuffer != "undefined" && p(new ArrayBuffer());
    function _(V) {
      return typeof ArrayBuffer == "undefined" ? !1 : p.working ? p(V) : V instanceof ArrayBuffer;
    }
    I.isArrayBuffer = _;
    function o(V) {
      return b(V) === "[object DataView]";
    }
    o.working = typeof ArrayBuffer != "undefined" && typeof DataView != "undefined" && o(new DataView(new ArrayBuffer(1), 0, 1));
    function P(V) {
      return typeof DataView == "undefined" ? !1 : o.working ? o(V) : V instanceof DataView;
    }
    I.isDataView = P;
    var Z = typeof SharedArrayBuffer != "undefined" ? SharedArrayBuffer : void 0;
    function ee(V) {
      return b(V) === "[object SharedArrayBuffer]";
    }
    function K(V) {
      return typeof Z == "undefined" ? !1 : (typeof ee.working == "undefined" && (ee.working = ee(new Z())), ee.working ? ee(V) : V instanceof Z);
    }
    I.isSharedArrayBuffer = K;
    function L(V) {
      return b(V) === "[object AsyncFunction]";
    }
    I.isAsyncFunction = L;
    function j(V) {
      return b(V) === "[object Map Iterator]";
    }
    I.isMapIterator = j;
    function re(V) {
      return b(V) === "[object Set Iterator]";
    }
    I.isSetIterator = re;
    function ne(V) {
      return b(V) === "[object Generator]";
    }
    I.isGeneratorObject = ne;
    function J(V) {
      return b(V) === "[object WebAssembly.Module]";
    }
    I.isWebAssemblyCompiledModule = J;
    function G(V) {
      return k(V, w);
    }
    I.isNumberObject = G;
    function se(V) {
      return k(V, u);
    }
    I.isStringObject = se;
    function ue(V) {
      return k(V, g);
    }
    I.isBooleanObject = ue;
    function de(V) {
      return E && k(V, R);
    }
    I.isBigIntObject = de;
    function Y(V) {
      return l && k(V, B);
    }
    I.isSymbolObject = Y;
    function F(V) {
      return G(V) || se(V) || ue(V) || de(V) || Y(V);
    }
    I.isBoxedPrimitive = F;
    function U(V) {
      return typeof Uint8Array != "undefined" && (_(V) || K(V));
    }
    I.isAnyArrayBuffer = U, ["isProxy", "isExternal", "isModuleNamespaceObject"].forEach(function(V) {
      Object.defineProperty(I, V, {
        enumerable: !1,
        value: function() {
          throw new Error(V + " is not supported in userland");
        }
      });
    });
  }(types)), types;
}
var isBufferBrowser, hasRequiredIsBufferBrowser;
function requireIsBufferBrowser() {
  return hasRequiredIsBufferBrowser || (hasRequiredIsBufferBrowser = 1, isBufferBrowser = function(M) {
    return M && typeof M == "object" && typeof M.copy == "function" && typeof M.fill == "function" && typeof M.readUInt8 == "function";
  }), isBufferBrowser;
}
var hasRequiredUtil$1;
function requireUtil$1() {
  return hasRequiredUtil$1 || (hasRequiredUtil$1 = 1, function(I) {
    var M = Object.getOwnPropertyDescriptors || function(P) {
      for (var Z = Object.keys(P), ee = {}, K = 0; K < Z.length; K++)
        ee[Z[K]] = Object.getOwnPropertyDescriptor(P, Z[K]);
      return ee;
    }, T = /%[sdj%]/g;
    I.format = function(o) {
      if (!X(o)) {
        for (var P = [], Z = 0; Z < arguments.length; Z++)
          P.push(E(arguments[Z]));
        return P.join(" ");
      }
      for (var Z = 1, ee = arguments, K = ee.length, L = String(o).replace(T, function(re) {
        if (re === "%%") return "%";
        if (Z >= K) return re;
        switch (re) {
          case "%s":
            return String(ee[Z++]);
          case "%d":
            return Number(ee[Z++]);
          case "%j":
            try {
              return JSON.stringify(ee[Z++]);
            } catch (ne) {
              return "[Circular]";
            }
          default:
            return re;
        }
      }), j = ee[Z]; Z < K; j = ee[++Z])
        N(j) || !te(j) ? L += " " + j : L += " " + E(j);
      return L;
    }, I.deprecate = function(o, P) {
      if (typeof process$1 != "undefined" && process$1.noDeprecation === !0)
        return o;
      if (typeof process$1 == "undefined")
        return function() {
          return I.deprecate(o, P).apply(this, arguments);
        };
      var Z = !1;
      function ee() {
        if (!Z) {
          if (process$1.throwDeprecation)
            throw new Error(P);
          process$1.traceDeprecation ? console.trace(P) : console.error(P), Z = !0;
        }
        return o.apply(this, arguments);
      }
      return ee;
    };
    var q = {}, C = /^$/;
    if (process$1.env.NODE_DEBUG) {
      var t = process$1.env.NODE_DEBUG;
      t = t.replace(/[|\\{}()[\]^$+?.]/g, "\\$&").replace(/\*/g, ".*").replace(/,/g, "$|^").toUpperCase(), C = new RegExp("^" + t + "$", "i");
    }
    I.debuglog = function(o) {
      if (o = o.toUpperCase(), !q[o])
        if (C.test(o)) {
          var P = process$1.pid;
          q[o] = function() {
            var Z = I.format.apply(I, arguments);
            console.error("%s %d: %s", o, P, Z);
          };
        } else
          q[o] = function() {
          };
      return q[o];
    };
    function E(o, P) {
      var Z = {
        seen: [],
        stylize: b
      };
      return arguments.length >= 3 && (Z.depth = arguments[2]), arguments.length >= 4 && (Z.colors = arguments[3]), D(P) ? Z.showHidden = P : P && I._extend(Z, P), ae(Z.showHidden) && (Z.showHidden = !1), ae(Z.depth) && (Z.depth = 2), ae(Z.colors) && (Z.colors = !1), ae(Z.customInspect) && (Z.customInspect = !0), Z.colors && (Z.stylize = l), u(Z, o, Z.depth);
    }
    I.inspect = E, E.colors = {
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
    }, E.styles = {
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
    function l(o, P) {
      var Z = E.styles[P];
      return Z ? "\x1B[" + E.colors[Z][0] + "m" + o + "\x1B[" + E.colors[Z][1] + "m" : o;
    }
    function b(o, P) {
      return o;
    }
    function w(o) {
      var P = {};
      return o.forEach(function(Z, ee) {
        P[Z] = !0;
      }), P;
    }
    function u(o, P, Z) {
      if (o.customInspect && P && A(P.inspect) && // Filter out the util module, it's inspect function is special
      P.inspect !== I.inspect && // Also filter out any prototype objects using the circular check.
      !(P.constructor && P.constructor.prototype === P)) {
        var ee = P.inspect(Z, o);
        return X(ee) || (ee = u(o, ee, Z)), ee;
      }
      var K = g(o, P);
      if (K)
        return K;
      var L = Object.keys(P), j = w(L);
      if (o.showHidden && (L = Object.getOwnPropertyNames(P)), H(P) && (L.indexOf("message") >= 0 || L.indexOf("description") >= 0))
        return R(P);
      if (L.length === 0) {
        if (A(P)) {
          var re = P.name ? ": " + P.name : "";
          return o.stylize("[Function" + re + "]", "special");
        }
        if (fe(P))
          return o.stylize(RegExp.prototype.toString.call(P), "regexp");
        if (ce(P))
          return o.stylize(Date.prototype.toString.call(P), "date");
        if (H(P))
          return R(P);
      }
      var ne = "", J = !1, G = ["{", "}"];
      if (O(P) && (J = !0, G = ["[", "]"]), A(P)) {
        var se = P.name ? ": " + P.name : "";
        ne = " [Function" + se + "]";
      }
      if (fe(P) && (ne = " " + RegExp.prototype.toString.call(P)), ce(P) && (ne = " " + Date.prototype.toUTCString.call(P)), H(P) && (ne = " " + R(P)), L.length === 0 && (!J || P.length == 0))
        return G[0] + ne + G[1];
      if (Z < 0)
        return fe(P) ? o.stylize(RegExp.prototype.toString.call(P), "regexp") : o.stylize("[Object]", "special");
      o.seen.push(P);
      var ue;
      return J ? ue = B(o, P, Z, j, L) : ue = L.map(function(de) {
        return k(o, P, Z, j, de, J);
      }), o.seen.pop(), $(ue, ne, G);
    }
    function g(o, P) {
      if (ae(P))
        return o.stylize("undefined", "undefined");
      if (X(P)) {
        var Z = "'" + JSON.stringify(P).replace(/^"|"$/g, "").replace(/'/g, "\\'").replace(/\\"/g, '"') + "'";
        return o.stylize(Z, "string");
      }
      if (z(P))
        return o.stylize("" + P, "number");
      if (D(P))
        return o.stylize("" + P, "boolean");
      if (N(P))
        return o.stylize("null", "null");
    }
    function R(o) {
      return "[" + Error.prototype.toString.call(o) + "]";
    }
    function B(o, P, Z, ee, K) {
      for (var L = [], j = 0, re = P.length; j < re; ++j)
        d(P, String(j)) ? L.push(k(
          o,
          P,
          Z,
          ee,
          String(j),
          !0
        )) : L.push("");
      return K.forEach(function(ne) {
        ne.match(/^\d+$/) || L.push(k(
          o,
          P,
          Z,
          ee,
          ne,
          !0
        ));
      }), L;
    }
    function k(o, P, Z, ee, K, L) {
      var j, re, ne;
      if (ne = Object.getOwnPropertyDescriptor(P, K) || { value: P[K] }, ne.get ? ne.set ? re = o.stylize("[Getter/Setter]", "special") : re = o.stylize("[Getter]", "special") : ne.set && (re = o.stylize("[Setter]", "special")), d(ee, K) || (j = "[" + K + "]"), re || (o.seen.indexOf(ne.value) < 0 ? (N(Z) ? re = u(o, ne.value, null) : re = u(o, ne.value, Z - 1), re.indexOf(`
`) > -1 && (L ? re = re.split(`
`).map(function(J) {
        return "  " + J;
      }).join(`
`).slice(2) : re = `
` + re.split(`
`).map(function(J) {
        return "   " + J;
      }).join(`
`))) : re = o.stylize("[Circular]", "special")), ae(j)) {
        if (L && K.match(/^\d+$/))
          return re;
        j = JSON.stringify("" + K), j.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/) ? (j = j.slice(1, -1), j = o.stylize(j, "name")) : (j = j.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'"), j = o.stylize(j, "string"));
      }
      return j + ": " + re;
    }
    function $(o, P, Z) {
      var ee = o.reduce(function(K, L) {
        return L.indexOf(`
`) >= 0, K + L.replace(/\u001b\[\d\d?m/g, "").length + 1;
      }, 0);
      return ee > 60 ? Z[0] + (P === "" ? "" : P + `
 `) + " " + o.join(`,
  `) + " " + Z[1] : Z[0] + P + " " + o.join(", ") + " " + Z[1];
    }
    I.types = requireTypes();
    function O(o) {
      return Array.isArray(o);
    }
    I.isArray = O;
    function D(o) {
      return typeof o == "boolean";
    }
    I.isBoolean = D;
    function N(o) {
      return o === null;
    }
    I.isNull = N;
    function W(o) {
      return o == null;
    }
    I.isNullOrUndefined = W;
    function z(o) {
      return typeof o == "number";
    }
    I.isNumber = z;
    function X(o) {
      return typeof o == "string";
    }
    I.isString = X;
    function Q(o) {
      return typeof o == "symbol";
    }
    I.isSymbol = Q;
    function ae(o) {
      return o === void 0;
    }
    I.isUndefined = ae;
    function fe(o) {
      return te(o) && e(o) === "[object RegExp]";
    }
    I.isRegExp = fe, I.types.isRegExp = fe;
    function te(o) {
      return typeof o == "object" && o !== null;
    }
    I.isObject = te;
    function ce(o) {
      return te(o) && e(o) === "[object Date]";
    }
    I.isDate = ce, I.types.isDate = ce;
    function H(o) {
      return te(o) && (e(o) === "[object Error]" || o instanceof Error);
    }
    I.isError = H, I.types.isNativeError = H;
    function A(o) {
      return typeof o == "function";
    }
    I.isFunction = A;
    function c(o) {
      return o === null || typeof o == "boolean" || typeof o == "number" || typeof o == "string" || typeof o == "symbol" || // ES6 symbol
      typeof o == "undefined";
    }
    I.isPrimitive = c, I.isBuffer = requireIsBufferBrowser();
    function e(o) {
      return Object.prototype.toString.call(o);
    }
    function a(o) {
      return o < 10 ? "0" + o.toString(10) : o.toString(10);
    }
    var v = [
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
    function x() {
      var o = /* @__PURE__ */ new Date(), P = [
        a(o.getHours()),
        a(o.getMinutes()),
        a(o.getSeconds())
      ].join(":");
      return [o.getDate(), v[o.getMonth()], P].join(" ");
    }
    I.log = function() {
      console.log("%s - %s", x(), I.format.apply(I, arguments));
    }, I.inherits = requireInherits_browser(), I._extend = function(o, P) {
      if (!P || !te(P)) return o;
      for (var Z = Object.keys(P), ee = Z.length; ee--; )
        o[Z[ee]] = P[Z[ee]];
      return o;
    };
    function d(o, P) {
      return Object.prototype.hasOwnProperty.call(o, P);
    }
    var y = typeof Symbol != "undefined" ? Symbol("util.promisify.custom") : void 0;
    I.promisify = function(P) {
      if (typeof P != "function")
        throw new TypeError('The "original" argument must be of type Function');
      if (y && P[y]) {
        var Z = P[y];
        if (typeof Z != "function")
          throw new TypeError('The "util.promisify.custom" argument must be of type Function');
        return Object.defineProperty(Z, y, {
          value: Z,
          enumerable: !1,
          writable: !1,
          configurable: !0
        }), Z;
      }
      function Z() {
        for (var ee, K, L = new Promise(function(ne, J) {
          ee = ne, K = J;
        }), j = [], re = 0; re < arguments.length; re++)
          j.push(arguments[re]);
        j.push(function(ne, J) {
          ne ? K(ne) : ee(J);
        });
        try {
          P.apply(this, j);
        } catch (ne) {
          K(ne);
        }
        return L;
      }
      return Object.setPrototypeOf(Z, Object.getPrototypeOf(P)), y && Object.defineProperty(Z, y, {
        value: Z,
        enumerable: !1,
        writable: !1,
        configurable: !0
      }), Object.defineProperties(
        Z,
        M(P)
      );
    }, I.promisify.custom = y;
    function p(o, P) {
      if (!o) {
        var Z = new Error("Promise was rejected with a falsy value");
        Z.reason = o, o = Z;
      }
      return P(o);
    }
    function _(o) {
      if (typeof o != "function")
        throw new TypeError('The "original" argument must be of type Function');
      function P() {
        for (var Z = [], ee = 0; ee < arguments.length; ee++)
          Z.push(arguments[ee]);
        var K = Z.pop();
        if (typeof K != "function")
          throw new TypeError("The last argument must be of type Function");
        var L = this, j = function() {
          return K.apply(L, arguments);
        };
        o.apply(this, Z).then(
          function(re) {
            process$1.nextTick(j.bind(null, null, re));
          },
          function(re) {
            process$1.nextTick(p.bind(null, re, j));
          }
        );
      }
      return Object.setPrototypeOf(P, Object.getPrototypeOf(o)), Object.defineProperties(
        P,
        M(o)
      ), P;
    }
    I.callbackify = _;
  }(util$1)), util$1;
}
var buffer_list, hasRequiredBuffer_list;
function requireBuffer_list() {
  if (hasRequiredBuffer_list) return buffer_list;
  hasRequiredBuffer_list = 1;
  function I(k, $) {
    var O = Object.keys(k);
    if (Object.getOwnPropertySymbols) {
      var D = Object.getOwnPropertySymbols(k);
      $ && (D = D.filter(function(N) {
        return Object.getOwnPropertyDescriptor(k, N).enumerable;
      })), O.push.apply(O, D);
    }
    return O;
  }
  function M(k) {
    for (var $ = 1; $ < arguments.length; $++) {
      var O = arguments[$] != null ? arguments[$] : {};
      $ % 2 ? I(Object(O), !0).forEach(function(D) {
        T(k, D, O[D]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(k, Object.getOwnPropertyDescriptors(O)) : I(Object(O)).forEach(function(D) {
        Object.defineProperty(k, D, Object.getOwnPropertyDescriptor(O, D));
      });
    }
    return k;
  }
  function T(k, $, O) {
    return $ = E($), $ in k ? Object.defineProperty(k, $, { value: O, enumerable: !0, configurable: !0, writable: !0 }) : k[$] = O, k;
  }
  function q(k, $) {
    if (!(k instanceof $))
      throw new TypeError("Cannot call a class as a function");
  }
  function C(k, $) {
    for (var O = 0; O < $.length; O++) {
      var D = $[O];
      D.enumerable = D.enumerable || !1, D.configurable = !0, "value" in D && (D.writable = !0), Object.defineProperty(k, E(D.key), D);
    }
  }
  function t(k, $, O) {
    return $ && C(k.prototype, $), Object.defineProperty(k, "prototype", { writable: !1 }), k;
  }
  function E(k) {
    var $ = l(k, "string");
    return typeof $ == "symbol" ? $ : String($);
  }
  function l(k, $) {
    if (typeof k != "object" || k === null) return k;
    var O = k[Symbol.toPrimitive];
    if (O !== void 0) {
      var D = O.call(k, $ || "default");
      if (typeof D != "object") return D;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ($ === "string" ? String : Number)(k);
  }
  var b = requireBuffer$1(), w = b.Buffer, u = requireUtil$1(), g = u.inspect, R = g && g.custom || "inspect";
  function B(k, $, O) {
    w.prototype.copy.call(k, $, O);
  }
  return buffer_list = /* @__PURE__ */ function() {
    function k() {
      q(this, k), this.head = null, this.tail = null, this.length = 0;
    }
    return t(k, [{
      key: "push",
      value: function(O) {
        var D = {
          data: O,
          next: null
        };
        this.length > 0 ? this.tail.next = D : this.head = D, this.tail = D, ++this.length;
      }
    }, {
      key: "unshift",
      value: function(O) {
        var D = {
          data: O,
          next: this.head
        };
        this.length === 0 && (this.tail = D), this.head = D, ++this.length;
      }
    }, {
      key: "shift",
      value: function() {
        if (this.length !== 0) {
          var O = this.head.data;
          return this.length === 1 ? this.head = this.tail = null : this.head = this.head.next, --this.length, O;
        }
      }
    }, {
      key: "clear",
      value: function() {
        this.head = this.tail = null, this.length = 0;
      }
    }, {
      key: "join",
      value: function(O) {
        if (this.length === 0) return "";
        for (var D = this.head, N = "" + D.data; D = D.next; ) N += O + D.data;
        return N;
      }
    }, {
      key: "concat",
      value: function(O) {
        if (this.length === 0) return w.alloc(0);
        for (var D = w.allocUnsafe(O >>> 0), N = this.head, W = 0; N; )
          B(N.data, D, W), W += N.data.length, N = N.next;
        return D;
      }
      // Consumes a specified amount of bytes or characters from the buffered data.
    }, {
      key: "consume",
      value: function(O, D) {
        var N;
        return O < this.head.data.length ? (N = this.head.data.slice(0, O), this.head.data = this.head.data.slice(O)) : O === this.head.data.length ? N = this.shift() : N = D ? this._getString(O) : this._getBuffer(O), N;
      }
    }, {
      key: "first",
      value: function() {
        return this.head.data;
      }
      // Consumes a specified amount of characters from the buffered data.
    }, {
      key: "_getString",
      value: function(O) {
        var D = this.head, N = 1, W = D.data;
        for (O -= W.length; D = D.next; ) {
          var z = D.data, X = O > z.length ? z.length : O;
          if (X === z.length ? W += z : W += z.slice(0, O), O -= X, O === 0) {
            X === z.length ? (++N, D.next ? this.head = D.next : this.head = this.tail = null) : (this.head = D, D.data = z.slice(X));
            break;
          }
          ++N;
        }
        return this.length -= N, W;
      }
      // Consumes a specified amount of bytes from the buffered data.
    }, {
      key: "_getBuffer",
      value: function(O) {
        var D = w.allocUnsafe(O), N = this.head, W = 1;
        for (N.data.copy(D), O -= N.data.length; N = N.next; ) {
          var z = N.data, X = O > z.length ? z.length : O;
          if (z.copy(D, D.length - O, 0, X), O -= X, O === 0) {
            X === z.length ? (++W, N.next ? this.head = N.next : this.head = this.tail = null) : (this.head = N, N.data = z.slice(X));
            break;
          }
          ++W;
        }
        return this.length -= W, D;
      }
      // Make sure the linked list only shows the minimal necessary information.
    }, {
      key: R,
      value: function(O, D) {
        return g(this, M(M({}, D), {}, {
          // Only inspect one level.
          depth: 0,
          // It should not recurse.
          customInspect: !1
        }));
      }
    }]), k;
  }(), buffer_list;
}
var destroy_1$1, hasRequiredDestroy$1;
function requireDestroy$1() {
  if (hasRequiredDestroy$1) return destroy_1$1;
  hasRequiredDestroy$1 = 1;
  function I(E, l) {
    var b = this, w = this._readableState && this._readableState.destroyed, u = this._writableState && this._writableState.destroyed;
    return w || u ? (l ? l(E) : E && (this._writableState ? this._writableState.errorEmitted || (this._writableState.errorEmitted = !0, process$1.nextTick(C, this, E)) : process$1.nextTick(C, this, E)), this) : (this._readableState && (this._readableState.destroyed = !0), this._writableState && (this._writableState.destroyed = !0), this._destroy(E || null, function(g) {
      !l && g ? b._writableState ? b._writableState.errorEmitted ? process$1.nextTick(T, b) : (b._writableState.errorEmitted = !0, process$1.nextTick(M, b, g)) : process$1.nextTick(M, b, g) : l ? (process$1.nextTick(T, b), l(g)) : process$1.nextTick(T, b);
    }), this);
  }
  function M(E, l) {
    C(E, l), T(E);
  }
  function T(E) {
    E._writableState && !E._writableState.emitClose || E._readableState && !E._readableState.emitClose || E.emit("close");
  }
  function q() {
    this._readableState && (this._readableState.destroyed = !1, this._readableState.reading = !1, this._readableState.ended = !1, this._readableState.endEmitted = !1), this._writableState && (this._writableState.destroyed = !1, this._writableState.ended = !1, this._writableState.ending = !1, this._writableState.finalCalled = !1, this._writableState.prefinished = !1, this._writableState.finished = !1, this._writableState.errorEmitted = !1);
  }
  function C(E, l) {
    E.emit("error", l);
  }
  function t(E, l) {
    var b = E._readableState, w = E._writableState;
    b && b.autoDestroy || w && w.autoDestroy ? E.destroy(l) : E.emit("error", l);
  }
  return destroy_1$1 = {
    destroy: I,
    undestroy: q,
    errorOrDestroy: t
  }, destroy_1$1;
}
var errorsBrowser = {}, hasRequiredErrorsBrowser;
function requireErrorsBrowser() {
  if (hasRequiredErrorsBrowser) return errorsBrowser;
  hasRequiredErrorsBrowser = 1;
  function I(l, b) {
    l.prototype = Object.create(b.prototype), l.prototype.constructor = l, l.__proto__ = b;
  }
  var M = {};
  function T(l, b, w) {
    w || (w = Error);
    function u(R, B, k) {
      return typeof b == "string" ? b : b(R, B, k);
    }
    var g = /* @__PURE__ */ function(R) {
      I(B, R);
      function B(k, $, O) {
        return R.call(this, u(k, $, O)) || this;
      }
      return B;
    }(w);
    g.prototype.name = w.name, g.prototype.code = l, M[l] = g;
  }
  function q(l, b) {
    if (Array.isArray(l)) {
      var w = l.length;
      return l = l.map(function(u) {
        return String(u);
      }), w > 2 ? "one of ".concat(b, " ").concat(l.slice(0, w - 1).join(", "), ", or ") + l[w - 1] : w === 2 ? "one of ".concat(b, " ").concat(l[0], " or ").concat(l[1]) : "of ".concat(b, " ").concat(l[0]);
    } else
      return "of ".concat(b, " ").concat(String(l));
  }
  function C(l, b, w) {
    return l.substr(0, b.length) === b;
  }
  function t(l, b, w) {
    return (w === void 0 || w > l.length) && (w = l.length), l.substring(w - b.length, w) === b;
  }
  function E(l, b, w) {
    return typeof w != "number" && (w = 0), w + b.length > l.length ? !1 : l.indexOf(b, w) !== -1;
  }
  return T("ERR_INVALID_OPT_VALUE", function(l, b) {
    return 'The value "' + b + '" is invalid for option "' + l + '"';
  }, TypeError), T("ERR_INVALID_ARG_TYPE", function(l, b, w) {
    var u;
    typeof b == "string" && C(b, "not ") ? (u = "must not be", b = b.replace(/^not /, "")) : u = "must be";
    var g;
    if (t(l, " argument"))
      g = "The ".concat(l, " ").concat(u, " ").concat(q(b, "type"));
    else {
      var R = E(l, ".") ? "property" : "argument";
      g = 'The "'.concat(l, '" ').concat(R, " ").concat(u, " ").concat(q(b, "type"));
    }
    return g += ". Received type ".concat(typeof w), g;
  }, TypeError), T("ERR_STREAM_PUSH_AFTER_EOF", "stream.push() after EOF"), T("ERR_METHOD_NOT_IMPLEMENTED", function(l) {
    return "The " + l + " method is not implemented";
  }), T("ERR_STREAM_PREMATURE_CLOSE", "Premature close"), T("ERR_STREAM_DESTROYED", function(l) {
    return "Cannot call " + l + " after a stream was destroyed";
  }), T("ERR_MULTIPLE_CALLBACK", "Callback called multiple times"), T("ERR_STREAM_CANNOT_PIPE", "Cannot pipe, not readable"), T("ERR_STREAM_WRITE_AFTER_END", "write after end"), T("ERR_STREAM_NULL_VALUES", "May not write null values to stream", TypeError), T("ERR_UNKNOWN_ENCODING", function(l) {
    return "Unknown encoding: " + l;
  }, TypeError), T("ERR_STREAM_UNSHIFT_AFTER_END_EVENT", "stream.unshift() after end event"), errorsBrowser.codes = M, errorsBrowser;
}
var state, hasRequiredState;
function requireState() {
  if (hasRequiredState) return state;
  hasRequiredState = 1;
  var I = requireErrorsBrowser().codes.ERR_INVALID_OPT_VALUE;
  function M(q, C, t) {
    return q.highWaterMark != null ? q.highWaterMark : C ? q[t] : null;
  }
  function T(q, C, t, E) {
    var l = M(C, E, t);
    if (l != null) {
      if (!(isFinite(l) && Math.floor(l) === l) || l < 0) {
        var b = E ? t : "highWaterMark";
        throw new I(b, l);
      }
      return Math.floor(l);
    }
    return q.objectMode ? 16 : 16 * 1024;
  }
  return state = {
    getHighWaterMark: T
  }, state;
}
var browser$a, hasRequiredBrowser$a;
function requireBrowser$a() {
  if (hasRequiredBrowser$a) return browser$a;
  hasRequiredBrowser$a = 1, browser$a = I;
  function I(T, q) {
    if (M("noDeprecation"))
      return T;
    var C = !1;
    function t() {
      if (!C) {
        if (M("throwDeprecation"))
          throw new Error(q);
        M("traceDeprecation") ? console.trace(q) : console.warn(q), C = !0;
      }
      return T.apply(this, arguments);
    }
    return t;
  }
  function M(T) {
    try {
      if (!commonjsGlobal.localStorage) return !1;
    } catch (C) {
      return !1;
    }
    var q = commonjsGlobal.localStorage[T];
    return q == null ? !1 : String(q).toLowerCase() === "true";
  }
  return browser$a;
}
var _stream_writable$1, hasRequired_stream_writable$1;
function require_stream_writable$1() {
  if (hasRequired_stream_writable$1) return _stream_writable$1;
  hasRequired_stream_writable$1 = 1, _stream_writable$1 = fe;
  function I(K) {
    var L = this;
    this.next = null, this.entry = null, this.finish = function() {
      ee(L, K);
    };
  }
  var M;
  fe.WritableState = Q;
  var T = {
    deprecate: requireBrowser$a()
  }, q = requireStreamBrowser$1(), C = requireBuffer$1().Buffer, t = (typeof commonjsGlobal != "undefined" ? commonjsGlobal : typeof window != "undefined" ? window : typeof self != "undefined" ? self : {}).Uint8Array || function() {
  };
  function E(K) {
    return C.from(K);
  }
  function l(K) {
    return C.isBuffer(K) || K instanceof t;
  }
  var b = requireDestroy$1(), w = requireState(), u = w.getHighWaterMark, g = requireErrorsBrowser().codes, R = g.ERR_INVALID_ARG_TYPE, B = g.ERR_METHOD_NOT_IMPLEMENTED, k = g.ERR_MULTIPLE_CALLBACK, $ = g.ERR_STREAM_CANNOT_PIPE, O = g.ERR_STREAM_DESTROYED, D = g.ERR_STREAM_NULL_VALUES, N = g.ERR_STREAM_WRITE_AFTER_END, W = g.ERR_UNKNOWN_ENCODING, z = b.errorOrDestroy;
  requireInherits_browser()(fe, q);
  function X() {
  }
  function Q(K, L, j) {
    M = M || require_stream_duplex$1(), K = K || {}, typeof j != "boolean" && (j = L instanceof M), this.objectMode = !!K.objectMode, j && (this.objectMode = this.objectMode || !!K.writableObjectMode), this.highWaterMark = u(this, K, "writableHighWaterMark", j), this.finalCalled = !1, this.needDrain = !1, this.ending = !1, this.ended = !1, this.finished = !1, this.destroyed = !1;
    var re = K.decodeStrings === !1;
    this.decodeStrings = !re, this.defaultEncoding = K.defaultEncoding || "utf8", this.length = 0, this.writing = !1, this.corked = 0, this.sync = !0, this.bufferProcessing = !1, this.onwrite = function(ne) {
      v(L, ne);
    }, this.writecb = null, this.writelen = 0, this.bufferedRequest = null, this.lastBufferedRequest = null, this.pendingcb = 0, this.prefinished = !1, this.errorEmitted = !1, this.emitClose = K.emitClose !== !1, this.autoDestroy = !!K.autoDestroy, this.bufferedRequestCount = 0, this.corkedRequestsFree = new I(this);
  }
  Q.prototype.getBuffer = function() {
    for (var L = this.bufferedRequest, j = []; L; )
      j.push(L), L = L.next;
    return j;
  }, function() {
    try {
      Object.defineProperty(Q.prototype, "buffer", {
        get: T.deprecate(function() {
          return this.getBuffer();
        }, "_writableState.buffer is deprecated. Use _writableState.getBuffer instead.", "DEP0003")
      });
    } catch (K) {
    }
  }();
  var ae;
  typeof Symbol == "function" && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] == "function" ? (ae = Function.prototype[Symbol.hasInstance], Object.defineProperty(fe, Symbol.hasInstance, {
    value: function(L) {
      return ae.call(this, L) ? !0 : this !== fe ? !1 : L && L._writableState instanceof Q;
    }
  })) : ae = function(L) {
    return L instanceof this;
  };
  function fe(K) {
    M = M || require_stream_duplex$1();
    var L = this instanceof M;
    if (!L && !ae.call(fe, this)) return new fe(K);
    this._writableState = new Q(K, this, L), this.writable = !0, K && (typeof K.write == "function" && (this._write = K.write), typeof K.writev == "function" && (this._writev = K.writev), typeof K.destroy == "function" && (this._destroy = K.destroy), typeof K.final == "function" && (this._final = K.final)), q.call(this);
  }
  fe.prototype.pipe = function() {
    z(this, new $());
  };
  function te(K, L) {
    var j = new N();
    z(K, j), process$1.nextTick(L, j);
  }
  function ce(K, L, j, re) {
    var ne;
    return j === null ? ne = new D() : typeof j != "string" && !L.objectMode && (ne = new R("chunk", ["string", "Buffer"], j)), ne ? (z(K, ne), process$1.nextTick(re, ne), !1) : !0;
  }
  fe.prototype.write = function(K, L, j) {
    var re = this._writableState, ne = !1, J = !re.objectMode && l(K);
    return J && !C.isBuffer(K) && (K = E(K)), typeof L == "function" && (j = L, L = null), J ? L = "buffer" : L || (L = re.defaultEncoding), typeof j != "function" && (j = X), re.ending ? te(this, j) : (J || ce(this, re, K, j)) && (re.pendingcb++, ne = A(this, re, J, K, L, j)), ne;
  }, fe.prototype.cork = function() {
    this._writableState.corked++;
  }, fe.prototype.uncork = function() {
    var K = this._writableState;
    K.corked && (K.corked--, !K.writing && !K.corked && !K.bufferProcessing && K.bufferedRequest && y(this, K));
  }, fe.prototype.setDefaultEncoding = function(L) {
    if (typeof L == "string" && (L = L.toLowerCase()), !(["hex", "utf8", "utf-8", "ascii", "binary", "base64", "ucs2", "ucs-2", "utf16le", "utf-16le", "raw"].indexOf((L + "").toLowerCase()) > -1)) throw new W(L);
    return this._writableState.defaultEncoding = L, this;
  }, Object.defineProperty(fe.prototype, "writableBuffer", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._writableState && this._writableState.getBuffer();
    }
  });
  function H(K, L, j) {
    return !K.objectMode && K.decodeStrings !== !1 && typeof L == "string" && (L = C.from(L, j)), L;
  }
  Object.defineProperty(fe.prototype, "writableHighWaterMark", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._writableState.highWaterMark;
    }
  });
  function A(K, L, j, re, ne, J) {
    if (!j) {
      var G = H(L, re, ne);
      re !== G && (j = !0, ne = "buffer", re = G);
    }
    var se = L.objectMode ? 1 : re.length;
    L.length += se;
    var ue = L.length < L.highWaterMark;
    if (ue || (L.needDrain = !0), L.writing || L.corked) {
      var de = L.lastBufferedRequest;
      L.lastBufferedRequest = {
        chunk: re,
        encoding: ne,
        isBuf: j,
        callback: J,
        next: null
      }, de ? de.next = L.lastBufferedRequest : L.bufferedRequest = L.lastBufferedRequest, L.bufferedRequestCount += 1;
    } else
      c(K, L, !1, se, re, ne, J);
    return ue;
  }
  function c(K, L, j, re, ne, J, G) {
    L.writelen = re, L.writecb = G, L.writing = !0, L.sync = !0, L.destroyed ? L.onwrite(new O("write")) : j ? K._writev(ne, L.onwrite) : K._write(ne, J, L.onwrite), L.sync = !1;
  }
  function e(K, L, j, re, ne) {
    --L.pendingcb, j ? (process$1.nextTick(ne, re), process$1.nextTick(P, K, L), K._writableState.errorEmitted = !0, z(K, re)) : (ne(re), K._writableState.errorEmitted = !0, z(K, re), P(K, L));
  }
  function a(K) {
    K.writing = !1, K.writecb = null, K.length -= K.writelen, K.writelen = 0;
  }
  function v(K, L) {
    var j = K._writableState, re = j.sync, ne = j.writecb;
    if (typeof ne != "function") throw new k();
    if (a(j), L) e(K, j, re, L, ne);
    else {
      var J = p(j) || K.destroyed;
      !J && !j.corked && !j.bufferProcessing && j.bufferedRequest && y(K, j), re ? process$1.nextTick(x, K, j, J, ne) : x(K, j, J, ne);
    }
  }
  function x(K, L, j, re) {
    j || d(K, L), L.pendingcb--, re(), P(K, L);
  }
  function d(K, L) {
    L.length === 0 && L.needDrain && (L.needDrain = !1, K.emit("drain"));
  }
  function y(K, L) {
    L.bufferProcessing = !0;
    var j = L.bufferedRequest;
    if (K._writev && j && j.next) {
      var re = L.bufferedRequestCount, ne = new Array(re), J = L.corkedRequestsFree;
      J.entry = j;
      for (var G = 0, se = !0; j; )
        ne[G] = j, j.isBuf || (se = !1), j = j.next, G += 1;
      ne.allBuffers = se, c(K, L, !0, L.length, ne, "", J.finish), L.pendingcb++, L.lastBufferedRequest = null, J.next ? (L.corkedRequestsFree = J.next, J.next = null) : L.corkedRequestsFree = new I(L), L.bufferedRequestCount = 0;
    } else {
      for (; j; ) {
        var ue = j.chunk, de = j.encoding, Y = j.callback, F = L.objectMode ? 1 : ue.length;
        if (c(K, L, !1, F, ue, de, Y), j = j.next, L.bufferedRequestCount--, L.writing)
          break;
      }
      j === null && (L.lastBufferedRequest = null);
    }
    L.bufferedRequest = j, L.bufferProcessing = !1;
  }
  fe.prototype._write = function(K, L, j) {
    j(new B("_write()"));
  }, fe.prototype._writev = null, fe.prototype.end = function(K, L, j) {
    var re = this._writableState;
    return typeof K == "function" ? (j = K, K = null, L = null) : typeof L == "function" && (j = L, L = null), K != null && this.write(K, L), re.corked && (re.corked = 1, this.uncork()), re.ending || Z(this, re, j), this;
  }, Object.defineProperty(fe.prototype, "writableLength", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._writableState.length;
    }
  });
  function p(K) {
    return K.ending && K.length === 0 && K.bufferedRequest === null && !K.finished && !K.writing;
  }
  function _(K, L) {
    K._final(function(j) {
      L.pendingcb--, j && z(K, j), L.prefinished = !0, K.emit("prefinish"), P(K, L);
    });
  }
  function o(K, L) {
    !L.prefinished && !L.finalCalled && (typeof K._final == "function" && !L.destroyed ? (L.pendingcb++, L.finalCalled = !0, process$1.nextTick(_, K, L)) : (L.prefinished = !0, K.emit("prefinish")));
  }
  function P(K, L) {
    var j = p(L);
    if (j && (o(K, L), L.pendingcb === 0 && (L.finished = !0, K.emit("finish"), L.autoDestroy))) {
      var re = K._readableState;
      (!re || re.autoDestroy && re.endEmitted) && K.destroy();
    }
    return j;
  }
  function Z(K, L, j) {
    L.ending = !0, P(K, L), j && (L.finished ? process$1.nextTick(j) : K.once("finish", j)), L.ended = !0, K.writable = !1;
  }
  function ee(K, L, j) {
    var re = K.entry;
    for (K.entry = null; re; ) {
      var ne = re.callback;
      L.pendingcb--, ne(j), re = re.next;
    }
    L.corkedRequestsFree.next = K;
  }
  return Object.defineProperty(fe.prototype, "destroyed", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._writableState === void 0 ? !1 : this._writableState.destroyed;
    },
    set: function(L) {
      this._writableState && (this._writableState.destroyed = L);
    }
  }), fe.prototype.destroy = b.destroy, fe.prototype._undestroy = b.undestroy, fe.prototype._destroy = function(K, L) {
    L(K);
  }, _stream_writable$1;
}
var _stream_duplex$1, hasRequired_stream_duplex$1;
function require_stream_duplex$1() {
  if (hasRequired_stream_duplex$1) return _stream_duplex$1;
  hasRequired_stream_duplex$1 = 1;
  var I = Object.keys || function(w) {
    var u = [];
    for (var g in w) u.push(g);
    return u;
  };
  _stream_duplex$1 = E;
  var M = require_stream_readable$1(), T = require_stream_writable$1();
  requireInherits_browser()(E, M);
  for (var q = I(T.prototype), C = 0; C < q.length; C++) {
    var t = q[C];
    E.prototype[t] || (E.prototype[t] = T.prototype[t]);
  }
  function E(w) {
    if (!(this instanceof E)) return new E(w);
    M.call(this, w), T.call(this, w), this.allowHalfOpen = !0, w && (w.readable === !1 && (this.readable = !1), w.writable === !1 && (this.writable = !1), w.allowHalfOpen === !1 && (this.allowHalfOpen = !1, this.once("end", l)));
  }
  Object.defineProperty(E.prototype, "writableHighWaterMark", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._writableState.highWaterMark;
    }
  }), Object.defineProperty(E.prototype, "writableBuffer", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._writableState && this._writableState.getBuffer();
    }
  }), Object.defineProperty(E.prototype, "writableLength", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._writableState.length;
    }
  });
  function l() {
    this._writableState.ended || process$1.nextTick(b, this);
  }
  function b(w) {
    w.end();
  }
  return Object.defineProperty(E.prototype, "destroyed", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._readableState === void 0 || this._writableState === void 0 ? !1 : this._readableState.destroyed && this._writableState.destroyed;
    },
    set: function(u) {
      this._readableState === void 0 || this._writableState === void 0 || (this._readableState.destroyed = u, this._writableState.destroyed = u);
    }
  }), _stream_duplex$1;
}
var string_decoder = {}, hasRequiredString_decoder;
function requireString_decoder() {
  if (hasRequiredString_decoder) return string_decoder;
  hasRequiredString_decoder = 1;
  var I = requireSafeBuffer$1().Buffer, M = I.isEncoding || function(D) {
    switch (D = "" + D, D && D.toLowerCase()) {
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
  function T(D) {
    if (!D) return "utf8";
    for (var N; ; )
      switch (D) {
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
          return D;
        default:
          if (N) return;
          D = ("" + D).toLowerCase(), N = !0;
      }
  }
  function q(D) {
    var N = T(D);
    if (typeof N != "string" && (I.isEncoding === M || !M(D))) throw new Error("Unknown encoding: " + D);
    return N || D;
  }
  string_decoder.StringDecoder = C;
  function C(D) {
    this.encoding = q(D);
    var N;
    switch (this.encoding) {
      case "utf16le":
        this.text = g, this.end = R, N = 4;
        break;
      case "utf8":
        this.fillLast = b, N = 4;
        break;
      case "base64":
        this.text = B, this.end = k, N = 3;
        break;
      default:
        this.write = $, this.end = O;
        return;
    }
    this.lastNeed = 0, this.lastTotal = 0, this.lastChar = I.allocUnsafe(N);
  }
  C.prototype.write = function(D) {
    if (D.length === 0) return "";
    var N, W;
    if (this.lastNeed) {
      if (N = this.fillLast(D), N === void 0) return "";
      W = this.lastNeed, this.lastNeed = 0;
    } else
      W = 0;
    return W < D.length ? N ? N + this.text(D, W) : this.text(D, W) : N || "";
  }, C.prototype.end = u, C.prototype.text = w, C.prototype.fillLast = function(D) {
    if (this.lastNeed <= D.length)
      return D.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed), this.lastChar.toString(this.encoding, 0, this.lastTotal);
    D.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, D.length), this.lastNeed -= D.length;
  };
  function t(D) {
    return D <= 127 ? 0 : D >> 5 === 6 ? 2 : D >> 4 === 14 ? 3 : D >> 3 === 30 ? 4 : D >> 6 === 2 ? -1 : -2;
  }
  function E(D, N, W) {
    var z = N.length - 1;
    if (z < W) return 0;
    var X = t(N[z]);
    return X >= 0 ? (X > 0 && (D.lastNeed = X - 1), X) : --z < W || X === -2 ? 0 : (X = t(N[z]), X >= 0 ? (X > 0 && (D.lastNeed = X - 2), X) : --z < W || X === -2 ? 0 : (X = t(N[z]), X >= 0 ? (X > 0 && (X === 2 ? X = 0 : D.lastNeed = X - 3), X) : 0));
  }
  function l(D, N, W) {
    if ((N[0] & 192) !== 128)
      return D.lastNeed = 0, "�";
    if (D.lastNeed > 1 && N.length > 1) {
      if ((N[1] & 192) !== 128)
        return D.lastNeed = 1, "�";
      if (D.lastNeed > 2 && N.length > 2 && (N[2] & 192) !== 128)
        return D.lastNeed = 2, "�";
    }
  }
  function b(D) {
    var N = this.lastTotal - this.lastNeed, W = l(this, D);
    if (W !== void 0) return W;
    if (this.lastNeed <= D.length)
      return D.copy(this.lastChar, N, 0, this.lastNeed), this.lastChar.toString(this.encoding, 0, this.lastTotal);
    D.copy(this.lastChar, N, 0, D.length), this.lastNeed -= D.length;
  }
  function w(D, N) {
    var W = E(this, D, N);
    if (!this.lastNeed) return D.toString("utf8", N);
    this.lastTotal = W;
    var z = D.length - (W - this.lastNeed);
    return D.copy(this.lastChar, 0, z), D.toString("utf8", N, z);
  }
  function u(D) {
    var N = D && D.length ? this.write(D) : "";
    return this.lastNeed ? N + "�" : N;
  }
  function g(D, N) {
    if ((D.length - N) % 2 === 0) {
      var W = D.toString("utf16le", N);
      if (W) {
        var z = W.charCodeAt(W.length - 1);
        if (z >= 55296 && z <= 56319)
          return this.lastNeed = 2, this.lastTotal = 4, this.lastChar[0] = D[D.length - 2], this.lastChar[1] = D[D.length - 1], W.slice(0, -1);
      }
      return W;
    }
    return this.lastNeed = 1, this.lastTotal = 2, this.lastChar[0] = D[D.length - 1], D.toString("utf16le", N, D.length - 1);
  }
  function R(D) {
    var N = D && D.length ? this.write(D) : "";
    if (this.lastNeed) {
      var W = this.lastTotal - this.lastNeed;
      return N + this.lastChar.toString("utf16le", 0, W);
    }
    return N;
  }
  function B(D, N) {
    var W = (D.length - N) % 3;
    return W === 0 ? D.toString("base64", N) : (this.lastNeed = 3 - W, this.lastTotal = 3, W === 1 ? this.lastChar[0] = D[D.length - 1] : (this.lastChar[0] = D[D.length - 2], this.lastChar[1] = D[D.length - 1]), D.toString("base64", N, D.length - W));
  }
  function k(D) {
    var N = D && D.length ? this.write(D) : "";
    return this.lastNeed ? N + this.lastChar.toString("base64", 0, 3 - this.lastNeed) : N;
  }
  function $(D) {
    return D.toString(this.encoding);
  }
  function O(D) {
    return D && D.length ? this.write(D) : "";
  }
  return string_decoder;
}
var endOfStream, hasRequiredEndOfStream;
function requireEndOfStream() {
  if (hasRequiredEndOfStream) return endOfStream;
  hasRequiredEndOfStream = 1;
  var I = requireErrorsBrowser().codes.ERR_STREAM_PREMATURE_CLOSE;
  function M(t) {
    var E = !1;
    return function() {
      if (!E) {
        E = !0;
        for (var l = arguments.length, b = new Array(l), w = 0; w < l; w++)
          b[w] = arguments[w];
        t.apply(this, b);
      }
    };
  }
  function T() {
  }
  function q(t) {
    return t.setHeader && typeof t.abort == "function";
  }
  function C(t, E, l) {
    if (typeof E == "function") return C(t, null, E);
    E || (E = {}), l = M(l || T);
    var b = E.readable || E.readable !== !1 && t.readable, w = E.writable || E.writable !== !1 && t.writable, u = function() {
      t.writable || R();
    }, g = t._writableState && t._writableState.finished, R = function() {
      w = !1, g = !0, b || l.call(t);
    }, B = t._readableState && t._readableState.endEmitted, k = function() {
      b = !1, B = !0, w || l.call(t);
    }, $ = function(W) {
      l.call(t, W);
    }, O = function() {
      var W;
      if (b && !B)
        return (!t._readableState || !t._readableState.ended) && (W = new I()), l.call(t, W);
      if (w && !g)
        return (!t._writableState || !t._writableState.ended) && (W = new I()), l.call(t, W);
    }, D = function() {
      t.req.on("finish", R);
    };
    return q(t) ? (t.on("complete", R), t.on("abort", O), t.req ? D() : t.on("request", D)) : w && !t._writableState && (t.on("end", u), t.on("close", u)), t.on("end", k), t.on("finish", R), E.error !== !1 && t.on("error", $), t.on("close", O), function() {
      t.removeListener("complete", R), t.removeListener("abort", O), t.removeListener("request", D), t.req && t.req.removeListener("finish", R), t.removeListener("end", u), t.removeListener("close", u), t.removeListener("finish", R), t.removeListener("end", k), t.removeListener("error", $), t.removeListener("close", O);
    };
  }
  return endOfStream = C, endOfStream;
}
var async_iterator, hasRequiredAsync_iterator;
function requireAsync_iterator() {
  if (hasRequiredAsync_iterator) return async_iterator;
  hasRequiredAsync_iterator = 1;
  var I;
  function M(W, z, X) {
    return z = T(z), z in W ? Object.defineProperty(W, z, { value: X, enumerable: !0, configurable: !0, writable: !0 }) : W[z] = X, W;
  }
  function T(W) {
    var z = q(W, "string");
    return typeof z == "symbol" ? z : String(z);
  }
  function q(W, z) {
    if (typeof W != "object" || W === null) return W;
    var X = W[Symbol.toPrimitive];
    if (X !== void 0) {
      var Q = X.call(W, z || "default");
      if (typeof Q != "object") return Q;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (z === "string" ? String : Number)(W);
  }
  var C = requireEndOfStream(), t = Symbol("lastResolve"), E = Symbol("lastReject"), l = Symbol("error"), b = Symbol("ended"), w = Symbol("lastPromise"), u = Symbol("handlePromise"), g = Symbol("stream");
  function R(W, z) {
    return {
      value: W,
      done: z
    };
  }
  function B(W) {
    var z = W[t];
    if (z !== null) {
      var X = W[g].read();
      X !== null && (W[w] = null, W[t] = null, W[E] = null, z(R(X, !1)));
    }
  }
  function k(W) {
    process$1.nextTick(B, W);
  }
  function $(W, z) {
    return function(X, Q) {
      W.then(function() {
        if (z[b]) {
          X(R(void 0, !0));
          return;
        }
        z[u](X, Q);
      }, Q);
    };
  }
  var O = Object.getPrototypeOf(function() {
  }), D = Object.setPrototypeOf((I = {
    get stream() {
      return this[g];
    },
    next: function() {
      var z = this, X = this[l];
      if (X !== null)
        return Promise.reject(X);
      if (this[b])
        return Promise.resolve(R(void 0, !0));
      if (this[g].destroyed)
        return new Promise(function(te, ce) {
          process$1.nextTick(function() {
            z[l] ? ce(z[l]) : te(R(void 0, !0));
          });
        });
      var Q = this[w], ae;
      if (Q)
        ae = new Promise($(Q, this));
      else {
        var fe = this[g].read();
        if (fe !== null)
          return Promise.resolve(R(fe, !1));
        ae = new Promise(this[u]);
      }
      return this[w] = ae, ae;
    }
  }, M(I, Symbol.asyncIterator, function() {
    return this;
  }), M(I, "return", function() {
    var z = this;
    return new Promise(function(X, Q) {
      z[g].destroy(null, function(ae) {
        if (ae) {
          Q(ae);
          return;
        }
        X(R(void 0, !0));
      });
    });
  }), I), O), N = function(z) {
    var X, Q = Object.create(D, (X = {}, M(X, g, {
      value: z,
      writable: !0
    }), M(X, t, {
      value: null,
      writable: !0
    }), M(X, E, {
      value: null,
      writable: !0
    }), M(X, l, {
      value: null,
      writable: !0
    }), M(X, b, {
      value: z._readableState.endEmitted,
      writable: !0
    }), M(X, u, {
      value: function(fe, te) {
        var ce = Q[g].read();
        ce ? (Q[w] = null, Q[t] = null, Q[E] = null, fe(R(ce, !1))) : (Q[t] = fe, Q[E] = te);
      },
      writable: !0
    }), X));
    return Q[w] = null, C(z, function(ae) {
      if (ae && ae.code !== "ERR_STREAM_PREMATURE_CLOSE") {
        var fe = Q[E];
        fe !== null && (Q[w] = null, Q[t] = null, Q[E] = null, fe(ae)), Q[l] = ae;
        return;
      }
      var te = Q[t];
      te !== null && (Q[w] = null, Q[t] = null, Q[E] = null, te(R(void 0, !0))), Q[b] = !0;
    }), z.on("readable", k.bind(null, Q)), Q;
  };
  return async_iterator = N, async_iterator;
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
  hasRequired_stream_readable$1 = 1, _stream_readable$1 = te;
  var I;
  te.ReadableState = fe, requireEvents().EventEmitter;
  var M = function(G, se) {
    return G.listeners(se).length;
  }, T = requireStreamBrowser$1(), q = requireBuffer$1().Buffer, C = (typeof commonjsGlobal != "undefined" ? commonjsGlobal : typeof window != "undefined" ? window : typeof self != "undefined" ? self : {}).Uint8Array || function() {
  };
  function t(J) {
    return q.from(J);
  }
  function E(J) {
    return q.isBuffer(J) || J instanceof C;
  }
  var l = requireUtil$1(), b;
  l && l.debuglog ? b = l.debuglog("stream") : b = function() {
  };
  var w = requireBuffer_list(), u = requireDestroy$1(), g = requireState(), R = g.getHighWaterMark, B = requireErrorsBrowser().codes, k = B.ERR_INVALID_ARG_TYPE, $ = B.ERR_STREAM_PUSH_AFTER_EOF, O = B.ERR_METHOD_NOT_IMPLEMENTED, D = B.ERR_STREAM_UNSHIFT_AFTER_END_EVENT, N, W, z;
  requireInherits_browser()(te, T);
  var X = u.errorOrDestroy, Q = ["error", "close", "destroy", "pause", "resume"];
  function ae(J, G, se) {
    if (typeof J.prependListener == "function") return J.prependListener(G, se);
    !J._events || !J._events[G] ? J.on(G, se) : Array.isArray(J._events[G]) ? J._events[G].unshift(se) : J._events[G] = [se, J._events[G]];
  }
  function fe(J, G, se) {
    I = I || require_stream_duplex$1(), J = J || {}, typeof se != "boolean" && (se = G instanceof I), this.objectMode = !!J.objectMode, se && (this.objectMode = this.objectMode || !!J.readableObjectMode), this.highWaterMark = R(this, J, "readableHighWaterMark", se), this.buffer = new w(), this.length = 0, this.pipes = null, this.pipesCount = 0, this.flowing = null, this.ended = !1, this.endEmitted = !1, this.reading = !1, this.sync = !0, this.needReadable = !1, this.emittedReadable = !1, this.readableListening = !1, this.resumeScheduled = !1, this.paused = !0, this.emitClose = J.emitClose !== !1, this.autoDestroy = !!J.autoDestroy, this.destroyed = !1, this.defaultEncoding = J.defaultEncoding || "utf8", this.awaitDrain = 0, this.readingMore = !1, this.decoder = null, this.encoding = null, J.encoding && (N || (N = requireString_decoder().StringDecoder), this.decoder = new N(J.encoding), this.encoding = J.encoding);
  }
  function te(J) {
    if (I = I || require_stream_duplex$1(), !(this instanceof te)) return new te(J);
    var G = this instanceof I;
    this._readableState = new fe(J, this, G), this.readable = !0, J && (typeof J.read == "function" && (this._read = J.read), typeof J.destroy == "function" && (this._destroy = J.destroy)), T.call(this);
  }
  Object.defineProperty(te.prototype, "destroyed", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._readableState === void 0 ? !1 : this._readableState.destroyed;
    },
    set: function(G) {
      this._readableState && (this._readableState.destroyed = G);
    }
  }), te.prototype.destroy = u.destroy, te.prototype._undestroy = u.undestroy, te.prototype._destroy = function(J, G) {
    G(J);
  }, te.prototype.push = function(J, G) {
    var se = this._readableState, ue;
    return se.objectMode ? ue = !0 : typeof J == "string" && (G = G || se.defaultEncoding, G !== se.encoding && (J = q.from(J, G), G = ""), ue = !0), ce(this, J, G, !1, ue);
  }, te.prototype.unshift = function(J) {
    return ce(this, J, null, !0, !1);
  };
  function ce(J, G, se, ue, de) {
    b("readableAddChunk", G);
    var Y = J._readableState;
    if (G === null)
      Y.reading = !1, v(J, Y);
    else {
      var F;
      if (de || (F = A(Y, G)), F)
        X(J, F);
      else if (Y.objectMode || G && G.length > 0)
        if (typeof G != "string" && !Y.objectMode && Object.getPrototypeOf(G) !== q.prototype && (G = t(G)), ue)
          Y.endEmitted ? X(J, new D()) : H(J, Y, G, !0);
        else if (Y.ended)
          X(J, new $());
        else {
          if (Y.destroyed)
            return !1;
          Y.reading = !1, Y.decoder && !se ? (G = Y.decoder.write(G), Y.objectMode || G.length !== 0 ? H(J, Y, G, !1) : y(J, Y)) : H(J, Y, G, !1);
        }
      else ue || (Y.reading = !1, y(J, Y));
    }
    return !Y.ended && (Y.length < Y.highWaterMark || Y.length === 0);
  }
  function H(J, G, se, ue) {
    G.flowing && G.length === 0 && !G.sync ? (G.awaitDrain = 0, J.emit("data", se)) : (G.length += G.objectMode ? 1 : se.length, ue ? G.buffer.unshift(se) : G.buffer.push(se), G.needReadable && x(J)), y(J, G);
  }
  function A(J, G) {
    var se;
    return !E(G) && typeof G != "string" && G !== void 0 && !J.objectMode && (se = new k("chunk", ["string", "Buffer", "Uint8Array"], G)), se;
  }
  te.prototype.isPaused = function() {
    return this._readableState.flowing === !1;
  }, te.prototype.setEncoding = function(J) {
    N || (N = requireString_decoder().StringDecoder);
    var G = new N(J);
    this._readableState.decoder = G, this._readableState.encoding = this._readableState.decoder.encoding;
    for (var se = this._readableState.buffer.head, ue = ""; se !== null; )
      ue += G.write(se.data), se = se.next;
    return this._readableState.buffer.clear(), ue !== "" && this._readableState.buffer.push(ue), this._readableState.length = ue.length, this;
  };
  var c = 1073741824;
  function e(J) {
    return J >= c ? J = c : (J--, J |= J >>> 1, J |= J >>> 2, J |= J >>> 4, J |= J >>> 8, J |= J >>> 16, J++), J;
  }
  function a(J, G) {
    return J <= 0 || G.length === 0 && G.ended ? 0 : G.objectMode ? 1 : J !== J ? G.flowing && G.length ? G.buffer.head.data.length : G.length : (J > G.highWaterMark && (G.highWaterMark = e(J)), J <= G.length ? J : G.ended ? G.length : (G.needReadable = !0, 0));
  }
  te.prototype.read = function(J) {
    b("read", J), J = parseInt(J, 10);
    var G = this._readableState, se = J;
    if (J !== 0 && (G.emittedReadable = !1), J === 0 && G.needReadable && ((G.highWaterMark !== 0 ? G.length >= G.highWaterMark : G.length > 0) || G.ended))
      return b("read: emitReadable", G.length, G.ended), G.length === 0 && G.ended ? j(this) : x(this), null;
    if (J = a(J, G), J === 0 && G.ended)
      return G.length === 0 && j(this), null;
    var ue = G.needReadable;
    b("need readable", ue), (G.length === 0 || G.length - J < G.highWaterMark) && (ue = !0, b("length less than watermark", ue)), G.ended || G.reading ? (ue = !1, b("reading or ended", ue)) : ue && (b("do read"), G.reading = !0, G.sync = !0, G.length === 0 && (G.needReadable = !0), this._read(G.highWaterMark), G.sync = !1, G.reading || (J = a(se, G)));
    var de;
    return J > 0 ? de = L(J, G) : de = null, de === null ? (G.needReadable = G.length <= G.highWaterMark, J = 0) : (G.length -= J, G.awaitDrain = 0), G.length === 0 && (G.ended || (G.needReadable = !0), se !== J && G.ended && j(this)), de !== null && this.emit("data", de), de;
  };
  function v(J, G) {
    if (b("onEofChunk"), !G.ended) {
      if (G.decoder) {
        var se = G.decoder.end();
        se && se.length && (G.buffer.push(se), G.length += G.objectMode ? 1 : se.length);
      }
      G.ended = !0, G.sync ? x(J) : (G.needReadable = !1, G.emittedReadable || (G.emittedReadable = !0, d(J)));
    }
  }
  function x(J) {
    var G = J._readableState;
    b("emitReadable", G.needReadable, G.emittedReadable), G.needReadable = !1, G.emittedReadable || (b("emitReadable", G.flowing), G.emittedReadable = !0, process$1.nextTick(d, J));
  }
  function d(J) {
    var G = J._readableState;
    b("emitReadable_", G.destroyed, G.length, G.ended), !G.destroyed && (G.length || G.ended) && (J.emit("readable"), G.emittedReadable = !1), G.needReadable = !G.flowing && !G.ended && G.length <= G.highWaterMark, K(J);
  }
  function y(J, G) {
    G.readingMore || (G.readingMore = !0, process$1.nextTick(p, J, G));
  }
  function p(J, G) {
    for (; !G.reading && !G.ended && (G.length < G.highWaterMark || G.flowing && G.length === 0); ) {
      var se = G.length;
      if (b("maybeReadMore read 0"), J.read(0), se === G.length)
        break;
    }
    G.readingMore = !1;
  }
  te.prototype._read = function(J) {
    X(this, new O("_read()"));
  }, te.prototype.pipe = function(J, G) {
    var se = this, ue = this._readableState;
    switch (ue.pipesCount) {
      case 0:
        ue.pipes = J;
        break;
      case 1:
        ue.pipes = [ue.pipes, J];
        break;
      default:
        ue.pipes.push(J);
        break;
    }
    ue.pipesCount += 1, b("pipe count=%d opts=%j", ue.pipesCount, G);
    var de = (!G || G.end !== !1) && J !== process$1.stdout && J !== process$1.stderr, Y = de ? U : be;
    ue.endEmitted ? process$1.nextTick(Y) : se.once("end", Y), J.on("unpipe", F);
    function F(pe, He) {
      b("onunpipe"), pe === se && He && He.hasUnpiped === !1 && (He.hasUnpiped = !0, oe());
    }
    function U() {
      b("onend"), J.end();
    }
    var V = _(se);
    J.on("drain", V);
    var ie = !1;
    function oe() {
      b("cleanup"), J.removeListener("close", le), J.removeListener("finish", ye), J.removeListener("drain", V), J.removeListener("error", ve), J.removeListener("unpipe", F), se.removeListener("end", U), se.removeListener("end", be), se.removeListener("data", he), ie = !0, ue.awaitDrain && (!J._writableState || J._writableState.needDrain) && V();
    }
    se.on("data", he);
    function he(pe) {
      b("ondata");
      var He = J.write(pe);
      b("dest.write", He), He === !1 && ((ue.pipesCount === 1 && ue.pipes === J || ue.pipesCount > 1 && ne(ue.pipes, J) !== -1) && !ie && (b("false write response, pause", ue.awaitDrain), ue.awaitDrain++), se.pause());
    }
    function ve(pe) {
      b("onerror", pe), be(), J.removeListener("error", ve), M(J, "error") === 0 && X(J, pe);
    }
    ae(J, "error", ve);
    function le() {
      J.removeListener("finish", ye), be();
    }
    J.once("close", le);
    function ye() {
      b("onfinish"), J.removeListener("close", le), be();
    }
    J.once("finish", ye);
    function be() {
      b("unpipe"), se.unpipe(J);
    }
    return J.emit("pipe", se), ue.flowing || (b("pipe resume"), se.resume()), J;
  };
  function _(J) {
    return function() {
      var se = J._readableState;
      b("pipeOnDrain", se.awaitDrain), se.awaitDrain && se.awaitDrain--, se.awaitDrain === 0 && M(J, "data") && (se.flowing = !0, K(J));
    };
  }
  te.prototype.unpipe = function(J) {
    var G = this._readableState, se = {
      hasUnpiped: !1
    };
    if (G.pipesCount === 0) return this;
    if (G.pipesCount === 1)
      return J && J !== G.pipes ? this : (J || (J = G.pipes), G.pipes = null, G.pipesCount = 0, G.flowing = !1, J && J.emit("unpipe", this, se), this);
    if (!J) {
      var ue = G.pipes, de = G.pipesCount;
      G.pipes = null, G.pipesCount = 0, G.flowing = !1;
      for (var Y = 0; Y < de; Y++) ue[Y].emit("unpipe", this, {
        hasUnpiped: !1
      });
      return this;
    }
    var F = ne(G.pipes, J);
    return F === -1 ? this : (G.pipes.splice(F, 1), G.pipesCount -= 1, G.pipesCount === 1 && (G.pipes = G.pipes[0]), J.emit("unpipe", this, se), this);
  }, te.prototype.on = function(J, G) {
    var se = T.prototype.on.call(this, J, G), ue = this._readableState;
    return J === "data" ? (ue.readableListening = this.listenerCount("readable") > 0, ue.flowing !== !1 && this.resume()) : J === "readable" && !ue.endEmitted && !ue.readableListening && (ue.readableListening = ue.needReadable = !0, ue.flowing = !1, ue.emittedReadable = !1, b("on readable", ue.length, ue.reading), ue.length ? x(this) : ue.reading || process$1.nextTick(P, this)), se;
  }, te.prototype.addListener = te.prototype.on, te.prototype.removeListener = function(J, G) {
    var se = T.prototype.removeListener.call(this, J, G);
    return J === "readable" && process$1.nextTick(o, this), se;
  }, te.prototype.removeAllListeners = function(J) {
    var G = T.prototype.removeAllListeners.apply(this, arguments);
    return (J === "readable" || J === void 0) && process$1.nextTick(o, this), G;
  };
  function o(J) {
    var G = J._readableState;
    G.readableListening = J.listenerCount("readable") > 0, G.resumeScheduled && !G.paused ? G.flowing = !0 : J.listenerCount("data") > 0 && J.resume();
  }
  function P(J) {
    b("readable nexttick read 0"), J.read(0);
  }
  te.prototype.resume = function() {
    var J = this._readableState;
    return J.flowing || (b("resume"), J.flowing = !J.readableListening, Z(this, J)), J.paused = !1, this;
  };
  function Z(J, G) {
    G.resumeScheduled || (G.resumeScheduled = !0, process$1.nextTick(ee, J, G));
  }
  function ee(J, G) {
    b("resume", G.reading), G.reading || J.read(0), G.resumeScheduled = !1, J.emit("resume"), K(J), G.flowing && !G.reading && J.read(0);
  }
  te.prototype.pause = function() {
    return b("call pause flowing=%j", this._readableState.flowing), this._readableState.flowing !== !1 && (b("pause"), this._readableState.flowing = !1, this.emit("pause")), this._readableState.paused = !0, this;
  };
  function K(J) {
    var G = J._readableState;
    for (b("flow", G.flowing); G.flowing && J.read() !== null; ) ;
  }
  te.prototype.wrap = function(J) {
    var G = this, se = this._readableState, ue = !1;
    J.on("end", function() {
      if (b("wrapped end"), se.decoder && !se.ended) {
        var F = se.decoder.end();
        F && F.length && G.push(F);
      }
      G.push(null);
    }), J.on("data", function(F) {
      if (b("wrapped data"), se.decoder && (F = se.decoder.write(F)), !(se.objectMode && F == null) && !(!se.objectMode && (!F || !F.length))) {
        var U = G.push(F);
        U || (ue = !0, J.pause());
      }
    });
    for (var de in J)
      this[de] === void 0 && typeof J[de] == "function" && (this[de] = /* @__PURE__ */ function(U) {
        return function() {
          return J[U].apply(J, arguments);
        };
      }(de));
    for (var Y = 0; Y < Q.length; Y++)
      J.on(Q[Y], this.emit.bind(this, Q[Y]));
    return this._read = function(F) {
      b("wrapped _read", F), ue && (ue = !1, J.resume());
    }, this;
  }, typeof Symbol == "function" && (te.prototype[Symbol.asyncIterator] = function() {
    return W === void 0 && (W = requireAsync_iterator()), W(this);
  }), Object.defineProperty(te.prototype, "readableHighWaterMark", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._readableState.highWaterMark;
    }
  }), Object.defineProperty(te.prototype, "readableBuffer", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._readableState && this._readableState.buffer;
    }
  }), Object.defineProperty(te.prototype, "readableFlowing", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._readableState.flowing;
    },
    set: function(G) {
      this._readableState && (this._readableState.flowing = G);
    }
  }), te._fromList = L, Object.defineProperty(te.prototype, "readableLength", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._readableState.length;
    }
  });
  function L(J, G) {
    if (G.length === 0) return null;
    var se;
    return G.objectMode ? se = G.buffer.shift() : !J || J >= G.length ? (G.decoder ? se = G.buffer.join("") : G.buffer.length === 1 ? se = G.buffer.first() : se = G.buffer.concat(G.length), G.buffer.clear()) : se = G.buffer.consume(J, G.decoder), se;
  }
  function j(J) {
    var G = J._readableState;
    b("endReadable", G.endEmitted), G.endEmitted || (G.ended = !0, process$1.nextTick(re, G, J));
  }
  function re(J, G) {
    if (b("endReadableNT", J.endEmitted, J.length), !J.endEmitted && J.length === 0 && (J.endEmitted = !0, G.readable = !1, G.emit("end"), J.autoDestroy)) {
      var se = G._writableState;
      (!se || se.autoDestroy && se.finished) && G.destroy();
    }
  }
  typeof Symbol == "function" && (te.from = function(J, G) {
    return z === void 0 && (z = requireFromBrowser()), z(te, J, G);
  });
  function ne(J, G) {
    for (var se = 0, ue = J.length; se < ue; se++)
      if (J[se] === G) return se;
    return -1;
  }
  return _stream_readable$1;
}
var _stream_transform$1, hasRequired_stream_transform$1;
function require_stream_transform$1() {
  if (hasRequired_stream_transform$1) return _stream_transform$1;
  hasRequired_stream_transform$1 = 1, _stream_transform$1 = l;
  var I = requireErrorsBrowser().codes, M = I.ERR_METHOD_NOT_IMPLEMENTED, T = I.ERR_MULTIPLE_CALLBACK, q = I.ERR_TRANSFORM_ALREADY_TRANSFORMING, C = I.ERR_TRANSFORM_WITH_LENGTH_0, t = require_stream_duplex$1();
  requireInherits_browser()(l, t);
  function E(u, g) {
    var R = this._transformState;
    R.transforming = !1;
    var B = R.writecb;
    if (B === null)
      return this.emit("error", new T());
    R.writechunk = null, R.writecb = null, g != null && this.push(g), B(u);
    var k = this._readableState;
    k.reading = !1, (k.needReadable || k.length < k.highWaterMark) && this._read(k.highWaterMark);
  }
  function l(u) {
    if (!(this instanceof l)) return new l(u);
    t.call(this, u), this._transformState = {
      afterTransform: E.bind(this),
      needTransform: !1,
      transforming: !1,
      writecb: null,
      writechunk: null,
      writeencoding: null
    }, this._readableState.needReadable = !0, this._readableState.sync = !1, u && (typeof u.transform == "function" && (this._transform = u.transform), typeof u.flush == "function" && (this._flush = u.flush)), this.on("prefinish", b);
  }
  function b() {
    var u = this;
    typeof this._flush == "function" && !this._readableState.destroyed ? this._flush(function(g, R) {
      w(u, g, R);
    }) : w(this, null, null);
  }
  l.prototype.push = function(u, g) {
    return this._transformState.needTransform = !1, t.prototype.push.call(this, u, g);
  }, l.prototype._transform = function(u, g, R) {
    R(new M("_transform()"));
  }, l.prototype._write = function(u, g, R) {
    var B = this._transformState;
    if (B.writecb = R, B.writechunk = u, B.writeencoding = g, !B.transforming) {
      var k = this._readableState;
      (B.needTransform || k.needReadable || k.length < k.highWaterMark) && this._read(k.highWaterMark);
    }
  }, l.prototype._read = function(u) {
    var g = this._transformState;
    g.writechunk !== null && !g.transforming ? (g.transforming = !0, this._transform(g.writechunk, g.writeencoding, g.afterTransform)) : g.needTransform = !0;
  }, l.prototype._destroy = function(u, g) {
    t.prototype._destroy.call(this, u, function(R) {
      g(R);
    });
  };
  function w(u, g, R) {
    if (g) return u.emit("error", g);
    if (R != null && u.push(R), u._writableState.length) throw new C();
    if (u._transformState.transforming) throw new q();
    return u.push(null);
  }
  return _stream_transform$1;
}
var _stream_passthrough$1, hasRequired_stream_passthrough$1;
function require_stream_passthrough$1() {
  if (hasRequired_stream_passthrough$1) return _stream_passthrough$1;
  hasRequired_stream_passthrough$1 = 1, _stream_passthrough$1 = M;
  var I = require_stream_transform$1();
  requireInherits_browser()(M, I);
  function M(T) {
    if (!(this instanceof M)) return new M(T);
    I.call(this, T);
  }
  return M.prototype._transform = function(T, q, C) {
    C(null, T);
  }, _stream_passthrough$1;
}
var pipeline_1, hasRequiredPipeline;
function requirePipeline() {
  if (hasRequiredPipeline) return pipeline_1;
  hasRequiredPipeline = 1;
  var I;
  function M(R) {
    var B = !1;
    return function() {
      B || (B = !0, R.apply(void 0, arguments));
    };
  }
  var T = requireErrorsBrowser().codes, q = T.ERR_MISSING_ARGS, C = T.ERR_STREAM_DESTROYED;
  function t(R) {
    if (R) throw R;
  }
  function E(R) {
    return R.setHeader && typeof R.abort == "function";
  }
  function l(R, B, k, $) {
    $ = M($);
    var O = !1;
    R.on("close", function() {
      O = !0;
    }), I === void 0 && (I = requireEndOfStream()), I(R, {
      readable: B,
      writable: k
    }, function(N) {
      if (N) return $(N);
      O = !0, $();
    });
    var D = !1;
    return function(N) {
      if (!O && !D) {
        if (D = !0, E(R)) return R.abort();
        if (typeof R.destroy == "function") return R.destroy();
        $(N || new C("pipe"));
      }
    };
  }
  function b(R) {
    R();
  }
  function w(R, B) {
    return R.pipe(B);
  }
  function u(R) {
    return !R.length || typeof R[R.length - 1] != "function" ? t : R.pop();
  }
  function g() {
    for (var R = arguments.length, B = new Array(R), k = 0; k < R; k++)
      B[k] = arguments[k];
    var $ = u(B);
    if (Array.isArray(B[0]) && (B = B[0]), B.length < 2)
      throw new q("streams");
    var O, D = B.map(function(N, W) {
      var z = W < B.length - 1, X = W > 0;
      return l(N, z, X, function(Q) {
        O || (O = Q), Q && D.forEach(b), !z && (D.forEach(b), $(O));
      });
    });
    return B.reduce(w);
  }
  return pipeline_1 = g, pipeline_1;
}
var hasRequiredReadableBrowser$1;
function requireReadableBrowser$1() {
  return hasRequiredReadableBrowser$1 || (hasRequiredReadableBrowser$1 = 1, function(I, M) {
    M = I.exports = require_stream_readable$1(), M.Stream = M, M.Readable = M, M.Writable = require_stream_writable$1(), M.Duplex = require_stream_duplex$1(), M.Transform = require_stream_transform$1(), M.PassThrough = require_stream_passthrough$1(), M.finished = requireEndOfStream(), M.pipeline = requirePipeline();
  }(readableBrowser$1, readableBrowser$1.exports)), readableBrowser$1.exports;
}
var hashBase$1, hasRequiredHashBase$1;
function requireHashBase$1() {
  if (hasRequiredHashBase$1) return hashBase$1;
  hasRequiredHashBase$1 = 1;
  var I = requireSafeBuffer$1().Buffer, M = requireReadableBrowser$1().Transform, T = requireInherits_browser();
  function q(t, E) {
    if (!I.isBuffer(t) && typeof t != "string")
      throw new TypeError(E + " must be a string or a buffer");
  }
  function C(t) {
    M.call(this), this._block = I.allocUnsafe(t), this._blockSize = t, this._blockOffset = 0, this._length = [0, 0, 0, 0], this._finalized = !1;
  }
  return T(C, M), C.prototype._transform = function(t, E, l) {
    var b = null;
    try {
      this.update(t, E);
    } catch (w) {
      b = w;
    }
    l(b);
  }, C.prototype._flush = function(t) {
    var E = null;
    try {
      this.push(this.digest());
    } catch (l) {
      E = l;
    }
    t(E);
  }, C.prototype.update = function(t, E) {
    if (q(t, "Data"), this._finalized) throw new Error("Digest already called");
    I.isBuffer(t) || (t = I.from(t, E));
    for (var l = this._block, b = 0; this._blockOffset + t.length - b >= this._blockSize; ) {
      for (var w = this._blockOffset; w < this._blockSize; ) l[w++] = t[b++];
      this._update(), this._blockOffset = 0;
    }
    for (; b < t.length; ) l[this._blockOffset++] = t[b++];
    for (var u = 0, g = t.length * 8; g > 0; ++u)
      this._length[u] += g, g = this._length[u] / 4294967296 | 0, g > 0 && (this._length[u] -= 4294967296 * g);
    return this;
  }, C.prototype._update = function() {
    throw new Error("_update is not implemented");
  }, C.prototype.digest = function(t) {
    if (this._finalized) throw new Error("Digest already called");
    this._finalized = !0;
    var E = this._digest();
    t !== void 0 && (E = E.toString(t)), this._block.fill(0), this._blockOffset = 0;
    for (var l = 0; l < 4; ++l) this._length[l] = 0;
    return E;
  }, C.prototype._digest = function() {
    throw new Error("_digest is not implemented");
  }, hashBase$1 = C, hashBase$1;
}
var md5_js, hasRequiredMd5_js;
function requireMd5_js() {
  if (hasRequiredMd5_js) return md5_js;
  hasRequiredMd5_js = 1;
  var I = requireInherits_browser(), M = requireHashBase$1(), T = requireSafeBuffer$1().Buffer, q = new Array(16);
  function C() {
    M.call(this, 64), this._a = 1732584193, this._b = 4023233417, this._c = 2562383102, this._d = 271733878;
  }
  I(C, M), C.prototype._update = function() {
    for (var u = q, g = 0; g < 16; ++g) u[g] = this._block.readInt32LE(g * 4);
    var R = this._a, B = this._b, k = this._c, $ = this._d;
    R = E(R, B, k, $, u[0], 3614090360, 7), $ = E($, R, B, k, u[1], 3905402710, 12), k = E(k, $, R, B, u[2], 606105819, 17), B = E(B, k, $, R, u[3], 3250441966, 22), R = E(R, B, k, $, u[4], 4118548399, 7), $ = E($, R, B, k, u[5], 1200080426, 12), k = E(k, $, R, B, u[6], 2821735955, 17), B = E(B, k, $, R, u[7], 4249261313, 22), R = E(R, B, k, $, u[8], 1770035416, 7), $ = E($, R, B, k, u[9], 2336552879, 12), k = E(k, $, R, B, u[10], 4294925233, 17), B = E(B, k, $, R, u[11], 2304563134, 22), R = E(R, B, k, $, u[12], 1804603682, 7), $ = E($, R, B, k, u[13], 4254626195, 12), k = E(k, $, R, B, u[14], 2792965006, 17), B = E(B, k, $, R, u[15], 1236535329, 22), R = l(R, B, k, $, u[1], 4129170786, 5), $ = l($, R, B, k, u[6], 3225465664, 9), k = l(k, $, R, B, u[11], 643717713, 14), B = l(B, k, $, R, u[0], 3921069994, 20), R = l(R, B, k, $, u[5], 3593408605, 5), $ = l($, R, B, k, u[10], 38016083, 9), k = l(k, $, R, B, u[15], 3634488961, 14), B = l(B, k, $, R, u[4], 3889429448, 20), R = l(R, B, k, $, u[9], 568446438, 5), $ = l($, R, B, k, u[14], 3275163606, 9), k = l(k, $, R, B, u[3], 4107603335, 14), B = l(B, k, $, R, u[8], 1163531501, 20), R = l(R, B, k, $, u[13], 2850285829, 5), $ = l($, R, B, k, u[2], 4243563512, 9), k = l(k, $, R, B, u[7], 1735328473, 14), B = l(B, k, $, R, u[12], 2368359562, 20), R = b(R, B, k, $, u[5], 4294588738, 4), $ = b($, R, B, k, u[8], 2272392833, 11), k = b(k, $, R, B, u[11], 1839030562, 16), B = b(B, k, $, R, u[14], 4259657740, 23), R = b(R, B, k, $, u[1], 2763975236, 4), $ = b($, R, B, k, u[4], 1272893353, 11), k = b(k, $, R, B, u[7], 4139469664, 16), B = b(B, k, $, R, u[10], 3200236656, 23), R = b(R, B, k, $, u[13], 681279174, 4), $ = b($, R, B, k, u[0], 3936430074, 11), k = b(k, $, R, B, u[3], 3572445317, 16), B = b(B, k, $, R, u[6], 76029189, 23), R = b(R, B, k, $, u[9], 3654602809, 4), $ = b($, R, B, k, u[12], 3873151461, 11), k = b(k, $, R, B, u[15], 530742520, 16), B = b(B, k, $, R, u[2], 3299628645, 23), R = w(R, B, k, $, u[0], 4096336452, 6), $ = w($, R, B, k, u[7], 1126891415, 10), k = w(k, $, R, B, u[14], 2878612391, 15), B = w(B, k, $, R, u[5], 4237533241, 21), R = w(R, B, k, $, u[12], 1700485571, 6), $ = w($, R, B, k, u[3], 2399980690, 10), k = w(k, $, R, B, u[10], 4293915773, 15), B = w(B, k, $, R, u[1], 2240044497, 21), R = w(R, B, k, $, u[8], 1873313359, 6), $ = w($, R, B, k, u[15], 4264355552, 10), k = w(k, $, R, B, u[6], 2734768916, 15), B = w(B, k, $, R, u[13], 1309151649, 21), R = w(R, B, k, $, u[4], 4149444226, 6), $ = w($, R, B, k, u[11], 3174756917, 10), k = w(k, $, R, B, u[2], 718787259, 15), B = w(B, k, $, R, u[9], 3951481745, 21), this._a = this._a + R | 0, this._b = this._b + B | 0, this._c = this._c + k | 0, this._d = this._d + $ | 0;
  }, C.prototype._digest = function() {
    this._block[this._blockOffset++] = 128, this._blockOffset > 56 && (this._block.fill(0, this._blockOffset, 64), this._update(), this._blockOffset = 0), this._block.fill(0, this._blockOffset, 56), this._block.writeUInt32LE(this._length[0], 56), this._block.writeUInt32LE(this._length[1], 60), this._update();
    var u = T.allocUnsafe(16);
    return u.writeInt32LE(this._a, 0), u.writeInt32LE(this._b, 4), u.writeInt32LE(this._c, 8), u.writeInt32LE(this._d, 12), u;
  };
  function t(u, g) {
    return u << g | u >>> 32 - g;
  }
  function E(u, g, R, B, k, $, O) {
    return t(u + (g & R | ~g & B) + k + $ | 0, O) + g | 0;
  }
  function l(u, g, R, B, k, $, O) {
    return t(u + (g & B | R & ~B) + k + $ | 0, O) + g | 0;
  }
  function b(u, g, R, B, k, $, O) {
    return t(u + (g ^ R ^ B) + k + $ | 0, O) + g | 0;
  }
  function w(u, g, R, B, k, $, O) {
    return t(u + (R ^ (g | ~B)) + k + $ | 0, O) + g | 0;
  }
  return md5_js = C, md5_js;
}
var hashBase, hasRequiredHashBase;
function requireHashBase() {
  if (hasRequiredHashBase) return hashBase;
  hasRequiredHashBase = 1;
  var I = requireSafeBuffer$1().Buffer, M = requireReadableBrowser$1().Transform, T = requireInherits_browser();
  function q(t, E) {
    if (!I.isBuffer(t) && typeof t != "string")
      throw new TypeError(E + " must be a string or a buffer");
  }
  function C(t) {
    M.call(this), this._block = I.allocUnsafe(t), this._blockSize = t, this._blockOffset = 0, this._length = [0, 0, 0, 0], this._finalized = !1;
  }
  return T(C, M), C.prototype._transform = function(t, E, l) {
    var b = null;
    try {
      this.update(t, E);
    } catch (w) {
      b = w;
    }
    l(b);
  }, C.prototype._flush = function(t) {
    var E = null;
    try {
      this.push(this.digest());
    } catch (l) {
      E = l;
    }
    t(E);
  }, C.prototype.update = function(t, E) {
    if (q(t, "Data"), this._finalized) throw new Error("Digest already called");
    I.isBuffer(t) || (t = I.from(t, E));
    for (var l = this._block, b = 0; this._blockOffset + t.length - b >= this._blockSize; ) {
      for (var w = this._blockOffset; w < this._blockSize; ) l[w++] = t[b++];
      this._update(), this._blockOffset = 0;
    }
    for (; b < t.length; ) l[this._blockOffset++] = t[b++];
    for (var u = 0, g = t.length * 8; g > 0; ++u)
      this._length[u] += g, g = this._length[u] / 4294967296 | 0, g > 0 && (this._length[u] -= 4294967296 * g);
    return this;
  }, C.prototype._update = function() {
    throw new Error("_update is not implemented");
  }, C.prototype.digest = function(t) {
    if (this._finalized) throw new Error("Digest already called");
    this._finalized = !0;
    var E = this._digest();
    t !== void 0 && (E = E.toString(t)), this._block.fill(0), this._blockOffset = 0;
    for (var l = 0; l < 4; ++l) this._length[l] = 0;
    return E;
  }, C.prototype._digest = function() {
    throw new Error("_digest is not implemented");
  }, hashBase = C, hashBase;
}
var ripemd160, hasRequiredRipemd160;
function requireRipemd160() {
  if (hasRequiredRipemd160) return ripemd160;
  hasRequiredRipemd160 = 1;
  var I = requireBuffer$1().Buffer, M = requireInherits_browser(), T = requireHashBase(), q = new Array(16), C = [
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
  ], E = [
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
  ], b = [0, 1518500249, 1859775393, 2400959708, 2840853838], w = [1352829926, 1548603684, 1836072691, 2053994217, 0];
  function u() {
    T.call(this, 64), this._a = 1732584193, this._b = 4023233417, this._c = 2562383102, this._d = 271733878, this._e = 3285377520;
  }
  M(u, T), u.prototype._update = function() {
    for (var D = q, N = 0; N < 16; ++N) D[N] = this._block.readInt32LE(N * 4);
    for (var W = this._a | 0, z = this._b | 0, X = this._c | 0, Q = this._d | 0, ae = this._e | 0, fe = this._a | 0, te = this._b | 0, ce = this._c | 0, H = this._d | 0, A = this._e | 0, c = 0; c < 80; c += 1) {
      var e, a;
      c < 16 ? (e = R(W, z, X, Q, ae, D[C[c]], b[0], E[c]), a = O(fe, te, ce, H, A, D[t[c]], w[0], l[c])) : c < 32 ? (e = B(W, z, X, Q, ae, D[C[c]], b[1], E[c]), a = $(fe, te, ce, H, A, D[t[c]], w[1], l[c])) : c < 48 ? (e = k(W, z, X, Q, ae, D[C[c]], b[2], E[c]), a = k(fe, te, ce, H, A, D[t[c]], w[2], l[c])) : c < 64 ? (e = $(W, z, X, Q, ae, D[C[c]], b[3], E[c]), a = B(fe, te, ce, H, A, D[t[c]], w[3], l[c])) : (e = O(W, z, X, Q, ae, D[C[c]], b[4], E[c]), a = R(fe, te, ce, H, A, D[t[c]], w[4], l[c])), W = ae, ae = Q, Q = g(X, 10), X = z, z = e, fe = A, A = H, H = g(ce, 10), ce = te, te = a;
    }
    var v = this._b + X + H | 0;
    this._b = this._c + Q + A | 0, this._c = this._d + ae + fe | 0, this._d = this._e + W + te | 0, this._e = this._a + z + ce | 0, this._a = v;
  }, u.prototype._digest = function() {
    this._block[this._blockOffset++] = 128, this._blockOffset > 56 && (this._block.fill(0, this._blockOffset, 64), this._update(), this._blockOffset = 0), this._block.fill(0, this._blockOffset, 56), this._block.writeUInt32LE(this._length[0], 56), this._block.writeUInt32LE(this._length[1], 60), this._update();
    var D = I.alloc ? I.alloc(20) : new I(20);
    return D.writeInt32LE(this._a, 0), D.writeInt32LE(this._b, 4), D.writeInt32LE(this._c, 8), D.writeInt32LE(this._d, 12), D.writeInt32LE(this._e, 16), D;
  };
  function g(D, N) {
    return D << N | D >>> 32 - N;
  }
  function R(D, N, W, z, X, Q, ae, fe) {
    return g(D + (N ^ W ^ z) + Q + ae | 0, fe) + X | 0;
  }
  function B(D, N, W, z, X, Q, ae, fe) {
    return g(D + (N & W | ~N & z) + Q + ae | 0, fe) + X | 0;
  }
  function k(D, N, W, z, X, Q, ae, fe) {
    return g(D + ((N | ~W) ^ z) + Q + ae | 0, fe) + X | 0;
  }
  function $(D, N, W, z, X, Q, ae, fe) {
    return g(D + (N & z | W & ~z) + Q + ae | 0, fe) + X | 0;
  }
  function O(D, N, W, z, X, Q, ae, fe) {
    return g(D + (N ^ (W | ~z)) + Q + ae | 0, fe) + X | 0;
  }
  return ripemd160 = u, ripemd160;
}
var sha_js = { exports: {} }, hash$1, hasRequiredHash$1;
function requireHash$1() {
  if (hasRequiredHash$1) return hash$1;
  hasRequiredHash$1 = 1;
  var I = requireSafeBuffer$1().Buffer;
  function M(T, q) {
    this._block = I.alloc(T), this._finalSize = q, this._blockSize = T, this._len = 0;
  }
  return M.prototype.update = function(T, q) {
    typeof T == "string" && (q = q || "utf8", T = I.from(T, q));
    for (var C = this._block, t = this._blockSize, E = T.length, l = this._len, b = 0; b < E; ) {
      for (var w = l % t, u = Math.min(E - b, t - w), g = 0; g < u; g++)
        C[w + g] = T[b + g];
      l += u, b += u, l % t === 0 && this._update(C);
    }
    return this._len += E, this;
  }, M.prototype.digest = function(T) {
    var q = this._len % this._blockSize;
    this._block[q] = 128, this._block.fill(0, q + 1), q >= this._finalSize && (this._update(this._block), this._block.fill(0));
    var C = this._len * 8;
    if (C <= 4294967295)
      this._block.writeUInt32BE(C, this._blockSize - 4);
    else {
      var t = (C & 4294967295) >>> 0, E = (C - t) / 4294967296;
      this._block.writeUInt32BE(E, this._blockSize - 8), this._block.writeUInt32BE(t, this._blockSize - 4);
    }
    this._update(this._block);
    var l = this._hash();
    return T ? l.toString(T) : l;
  }, M.prototype._update = function() {
    throw new Error("_update must be implemented by subclass");
  }, hash$1 = M, hash$1;
}
var sha$1, hasRequiredSha$1;
function requireSha$1() {
  if (hasRequiredSha$1) return sha$1;
  hasRequiredSha$1 = 1;
  var I = requireInherits_browser(), M = requireHash$1(), T = requireSafeBuffer$1().Buffer, q = [
    1518500249,
    1859775393,
    -1894007588,
    -899497514
  ], C = new Array(80);
  function t() {
    this.init(), this._w = C, M.call(this, 64, 56);
  }
  I(t, M), t.prototype.init = function() {
    return this._a = 1732584193, this._b = 4023233417, this._c = 2562383102, this._d = 271733878, this._e = 3285377520, this;
  };
  function E(w) {
    return w << 5 | w >>> 27;
  }
  function l(w) {
    return w << 30 | w >>> 2;
  }
  function b(w, u, g, R) {
    return w === 0 ? u & g | ~u & R : w === 2 ? u & g | u & R | g & R : u ^ g ^ R;
  }
  return t.prototype._update = function(w) {
    for (var u = this._w, g = this._a | 0, R = this._b | 0, B = this._c | 0, k = this._d | 0, $ = this._e | 0, O = 0; O < 16; ++O) u[O] = w.readInt32BE(O * 4);
    for (; O < 80; ++O) u[O] = u[O - 3] ^ u[O - 8] ^ u[O - 14] ^ u[O - 16];
    for (var D = 0; D < 80; ++D) {
      var N = ~~(D / 20), W = E(g) + b(N, R, B, k) + $ + u[D] + q[N] | 0;
      $ = k, k = B, B = l(R), R = g, g = W;
    }
    this._a = g + this._a | 0, this._b = R + this._b | 0, this._c = B + this._c | 0, this._d = k + this._d | 0, this._e = $ + this._e | 0;
  }, t.prototype._hash = function() {
    var w = T.allocUnsafe(20);
    return w.writeInt32BE(this._a | 0, 0), w.writeInt32BE(this._b | 0, 4), w.writeInt32BE(this._c | 0, 8), w.writeInt32BE(this._d | 0, 12), w.writeInt32BE(this._e | 0, 16), w;
  }, sha$1 = t, sha$1;
}
var sha1, hasRequiredSha1;
function requireSha1() {
  if (hasRequiredSha1) return sha1;
  hasRequiredSha1 = 1;
  var I = requireInherits_browser(), M = requireHash$1(), T = requireSafeBuffer$1().Buffer, q = [
    1518500249,
    1859775393,
    -1894007588,
    -899497514
  ], C = new Array(80);
  function t() {
    this.init(), this._w = C, M.call(this, 64, 56);
  }
  I(t, M), t.prototype.init = function() {
    return this._a = 1732584193, this._b = 4023233417, this._c = 2562383102, this._d = 271733878, this._e = 3285377520, this;
  };
  function E(u) {
    return u << 1 | u >>> 31;
  }
  function l(u) {
    return u << 5 | u >>> 27;
  }
  function b(u) {
    return u << 30 | u >>> 2;
  }
  function w(u, g, R, B) {
    return u === 0 ? g & R | ~g & B : u === 2 ? g & R | g & B | R & B : g ^ R ^ B;
  }
  return t.prototype._update = function(u) {
    for (var g = this._w, R = this._a | 0, B = this._b | 0, k = this._c | 0, $ = this._d | 0, O = this._e | 0, D = 0; D < 16; ++D) g[D] = u.readInt32BE(D * 4);
    for (; D < 80; ++D) g[D] = E(g[D - 3] ^ g[D - 8] ^ g[D - 14] ^ g[D - 16]);
    for (var N = 0; N < 80; ++N) {
      var W = ~~(N / 20), z = l(R) + w(W, B, k, $) + O + g[N] + q[W] | 0;
      O = $, $ = k, k = b(B), B = R, R = z;
    }
    this._a = R + this._a | 0, this._b = B + this._b | 0, this._c = k + this._c | 0, this._d = $ + this._d | 0, this._e = O + this._e | 0;
  }, t.prototype._hash = function() {
    var u = T.allocUnsafe(20);
    return u.writeInt32BE(this._a | 0, 0), u.writeInt32BE(this._b | 0, 4), u.writeInt32BE(this._c | 0, 8), u.writeInt32BE(this._d | 0, 12), u.writeInt32BE(this._e | 0, 16), u;
  }, sha1 = t, sha1;
}
var sha256$1, hasRequiredSha256;
function requireSha256() {
  if (hasRequiredSha256) return sha256$1;
  hasRequiredSha256 = 1;
  var I = requireInherits_browser(), M = requireHash$1(), T = requireSafeBuffer$1().Buffer, q = [
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
  ], C = new Array(64);
  function t() {
    this.init(), this._w = C, M.call(this, 64, 56);
  }
  I(t, M), t.prototype.init = function() {
    return this._a = 1779033703, this._b = 3144134277, this._c = 1013904242, this._d = 2773480762, this._e = 1359893119, this._f = 2600822924, this._g = 528734635, this._h = 1541459225, this;
  };
  function E(R, B, k) {
    return k ^ R & (B ^ k);
  }
  function l(R, B, k) {
    return R & B | k & (R | B);
  }
  function b(R) {
    return (R >>> 2 | R << 30) ^ (R >>> 13 | R << 19) ^ (R >>> 22 | R << 10);
  }
  function w(R) {
    return (R >>> 6 | R << 26) ^ (R >>> 11 | R << 21) ^ (R >>> 25 | R << 7);
  }
  function u(R) {
    return (R >>> 7 | R << 25) ^ (R >>> 18 | R << 14) ^ R >>> 3;
  }
  function g(R) {
    return (R >>> 17 | R << 15) ^ (R >>> 19 | R << 13) ^ R >>> 10;
  }
  return t.prototype._update = function(R) {
    for (var B = this._w, k = this._a | 0, $ = this._b | 0, O = this._c | 0, D = this._d | 0, N = this._e | 0, W = this._f | 0, z = this._g | 0, X = this._h | 0, Q = 0; Q < 16; ++Q) B[Q] = R.readInt32BE(Q * 4);
    for (; Q < 64; ++Q) B[Q] = g(B[Q - 2]) + B[Q - 7] + u(B[Q - 15]) + B[Q - 16] | 0;
    for (var ae = 0; ae < 64; ++ae) {
      var fe = X + w(N) + E(N, W, z) + q[ae] + B[ae] | 0, te = b(k) + l(k, $, O) | 0;
      X = z, z = W, W = N, N = D + fe | 0, D = O, O = $, $ = k, k = fe + te | 0;
    }
    this._a = k + this._a | 0, this._b = $ + this._b | 0, this._c = O + this._c | 0, this._d = D + this._d | 0, this._e = N + this._e | 0, this._f = W + this._f | 0, this._g = z + this._g | 0, this._h = X + this._h | 0;
  }, t.prototype._hash = function() {
    var R = T.allocUnsafe(32);
    return R.writeInt32BE(this._a, 0), R.writeInt32BE(this._b, 4), R.writeInt32BE(this._c, 8), R.writeInt32BE(this._d, 12), R.writeInt32BE(this._e, 16), R.writeInt32BE(this._f, 20), R.writeInt32BE(this._g, 24), R.writeInt32BE(this._h, 28), R;
  }, sha256$1 = t, sha256$1;
}
var sha224$1, hasRequiredSha224;
function requireSha224() {
  if (hasRequiredSha224) return sha224$1;
  hasRequiredSha224 = 1;
  var I = requireInherits_browser(), M = requireSha256(), T = requireHash$1(), q = requireSafeBuffer$1().Buffer, C = new Array(64);
  function t() {
    this.init(), this._w = C, T.call(this, 64, 56);
  }
  return I(t, M), t.prototype.init = function() {
    return this._a = 3238371032, this._b = 914150663, this._c = 812702999, this._d = 4144912697, this._e = 4290775857, this._f = 1750603025, this._g = 1694076839, this._h = 3204075428, this;
  }, t.prototype._hash = function() {
    var E = q.allocUnsafe(28);
    return E.writeInt32BE(this._a, 0), E.writeInt32BE(this._b, 4), E.writeInt32BE(this._c, 8), E.writeInt32BE(this._d, 12), E.writeInt32BE(this._e, 16), E.writeInt32BE(this._f, 20), E.writeInt32BE(this._g, 24), E;
  }, sha224$1 = t, sha224$1;
}
var sha512$1, hasRequiredSha512;
function requireSha512() {
  if (hasRequiredSha512) return sha512$1;
  hasRequiredSha512 = 1;
  var I = requireInherits_browser(), M = requireHash$1(), T = requireSafeBuffer$1().Buffer, q = [
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
  ], C = new Array(160);
  function t() {
    this.init(), this._w = C, M.call(this, 128, 112);
  }
  I(t, M), t.prototype.init = function() {
    return this._ah = 1779033703, this._bh = 3144134277, this._ch = 1013904242, this._dh = 2773480762, this._eh = 1359893119, this._fh = 2600822924, this._gh = 528734635, this._hh = 1541459225, this._al = 4089235720, this._bl = 2227873595, this._cl = 4271175723, this._dl = 1595750129, this._el = 2917565137, this._fl = 725511199, this._gl = 4215389547, this._hl = 327033209, this;
  };
  function E($, O, D) {
    return D ^ $ & (O ^ D);
  }
  function l($, O, D) {
    return $ & O | D & ($ | O);
  }
  function b($, O) {
    return ($ >>> 28 | O << 4) ^ (O >>> 2 | $ << 30) ^ (O >>> 7 | $ << 25);
  }
  function w($, O) {
    return ($ >>> 14 | O << 18) ^ ($ >>> 18 | O << 14) ^ (O >>> 9 | $ << 23);
  }
  function u($, O) {
    return ($ >>> 1 | O << 31) ^ ($ >>> 8 | O << 24) ^ $ >>> 7;
  }
  function g($, O) {
    return ($ >>> 1 | O << 31) ^ ($ >>> 8 | O << 24) ^ ($ >>> 7 | O << 25);
  }
  function R($, O) {
    return ($ >>> 19 | O << 13) ^ (O >>> 29 | $ << 3) ^ $ >>> 6;
  }
  function B($, O) {
    return ($ >>> 19 | O << 13) ^ (O >>> 29 | $ << 3) ^ ($ >>> 6 | O << 26);
  }
  function k($, O) {
    return $ >>> 0 < O >>> 0 ? 1 : 0;
  }
  return t.prototype._update = function($) {
    for (var O = this._w, D = this._ah | 0, N = this._bh | 0, W = this._ch | 0, z = this._dh | 0, X = this._eh | 0, Q = this._fh | 0, ae = this._gh | 0, fe = this._hh | 0, te = this._al | 0, ce = this._bl | 0, H = this._cl | 0, A = this._dl | 0, c = this._el | 0, e = this._fl | 0, a = this._gl | 0, v = this._hl | 0, x = 0; x < 32; x += 2)
      O[x] = $.readInt32BE(x * 4), O[x + 1] = $.readInt32BE(x * 4 + 4);
    for (; x < 160; x += 2) {
      var d = O[x - 30], y = O[x - 15 * 2 + 1], p = u(d, y), _ = g(y, d);
      d = O[x - 2 * 2], y = O[x - 2 * 2 + 1];
      var o = R(d, y), P = B(y, d), Z = O[x - 7 * 2], ee = O[x - 7 * 2 + 1], K = O[x - 16 * 2], L = O[x - 16 * 2 + 1], j = _ + ee | 0, re = p + Z + k(j, _) | 0;
      j = j + P | 0, re = re + o + k(j, P) | 0, j = j + L | 0, re = re + K + k(j, L) | 0, O[x] = re, O[x + 1] = j;
    }
    for (var ne = 0; ne < 160; ne += 2) {
      re = O[ne], j = O[ne + 1];
      var J = l(D, N, W), G = l(te, ce, H), se = b(D, te), ue = b(te, D), de = w(X, c), Y = w(c, X), F = q[ne], U = q[ne + 1], V = E(X, Q, ae), ie = E(c, e, a), oe = v + Y | 0, he = fe + de + k(oe, v) | 0;
      oe = oe + ie | 0, he = he + V + k(oe, ie) | 0, oe = oe + U | 0, he = he + F + k(oe, U) | 0, oe = oe + j | 0, he = he + re + k(oe, j) | 0;
      var ve = ue + G | 0, le = se + J + k(ve, ue) | 0;
      fe = ae, v = a, ae = Q, a = e, Q = X, e = c, c = A + oe | 0, X = z + he + k(c, A) | 0, z = W, A = H, W = N, H = ce, N = D, ce = te, te = oe + ve | 0, D = he + le + k(te, oe) | 0;
    }
    this._al = this._al + te | 0, this._bl = this._bl + ce | 0, this._cl = this._cl + H | 0, this._dl = this._dl + A | 0, this._el = this._el + c | 0, this._fl = this._fl + e | 0, this._gl = this._gl + a | 0, this._hl = this._hl + v | 0, this._ah = this._ah + D + k(this._al, te) | 0, this._bh = this._bh + N + k(this._bl, ce) | 0, this._ch = this._ch + W + k(this._cl, H) | 0, this._dh = this._dh + z + k(this._dl, A) | 0, this._eh = this._eh + X + k(this._el, c) | 0, this._fh = this._fh + Q + k(this._fl, e) | 0, this._gh = this._gh + ae + k(this._gl, a) | 0, this._hh = this._hh + fe + k(this._hl, v) | 0;
  }, t.prototype._hash = function() {
    var $ = T.allocUnsafe(64);
    function O(D, N, W) {
      $.writeInt32BE(D, W), $.writeInt32BE(N, W + 4);
    }
    return O(this._ah, this._al, 0), O(this._bh, this._bl, 8), O(this._ch, this._cl, 16), O(this._dh, this._dl, 24), O(this._eh, this._el, 32), O(this._fh, this._fl, 40), O(this._gh, this._gl, 48), O(this._hh, this._hl, 56), $;
  }, sha512$1 = t, sha512$1;
}
var sha384$1, hasRequiredSha384;
function requireSha384() {
  if (hasRequiredSha384) return sha384$1;
  hasRequiredSha384 = 1;
  var I = requireInherits_browser(), M = requireSha512(), T = requireHash$1(), q = requireSafeBuffer$1().Buffer, C = new Array(160);
  function t() {
    this.init(), this._w = C, T.call(this, 128, 112);
  }
  return I(t, M), t.prototype.init = function() {
    return this._ah = 3418070365, this._bh = 1654270250, this._ch = 2438529370, this._dh = 355462360, this._eh = 1731405415, this._fh = 2394180231, this._gh = 3675008525, this._hh = 1203062813, this._al = 3238371032, this._bl = 914150663, this._cl = 812702999, this._dl = 4144912697, this._el = 4290775857, this._fl = 1750603025, this._gl = 1694076839, this._hl = 3204075428, this;
  }, t.prototype._hash = function() {
    var E = q.allocUnsafe(48);
    function l(b, w, u) {
      E.writeInt32BE(b, u), E.writeInt32BE(w, u + 4);
    }
    return l(this._ah, this._al, 0), l(this._bh, this._bl, 8), l(this._ch, this._cl, 16), l(this._dh, this._dl, 24), l(this._eh, this._el, 32), l(this._fh, this._fl, 40), E;
  }, sha384$1 = t, sha384$1;
}
var hasRequiredSha_js;
function requireSha_js() {
  if (hasRequiredSha_js) return sha_js.exports;
  hasRequiredSha_js = 1;
  var I = sha_js.exports = function(T) {
    T = T.toLowerCase();
    var q = I[T];
    if (!q) throw new Error(T + " is not supported (we accept pull requests)");
    return new q();
  };
  return I.sha = requireSha$1(), I.sha1 = requireSha1(), I.sha224 = requireSha224(), I.sha256 = requireSha256(), I.sha384 = requireSha384(), I.sha512 = requireSha512(), sha_js.exports;
}
var streamBrowserify, hasRequiredStreamBrowserify;
function requireStreamBrowserify() {
  if (hasRequiredStreamBrowserify) return streamBrowserify;
  hasRequiredStreamBrowserify = 1, streamBrowserify = T;
  var I = requireEvents().EventEmitter, M = requireInherits_browser();
  M(T, I), T.Readable = require_stream_readable$1(), T.Writable = require_stream_writable$1(), T.Duplex = require_stream_duplex$1(), T.Transform = require_stream_transform$1(), T.PassThrough = require_stream_passthrough$1(), T.finished = requireEndOfStream(), T.pipeline = requirePipeline(), T.Stream = T;
  function T() {
    I.call(this);
  }
  return T.prototype.pipe = function(q, C) {
    var t = this;
    function E(B) {
      q.writable && q.write(B) === !1 && t.pause && t.pause();
    }
    t.on("data", E);
    function l() {
      t.readable && t.resume && t.resume();
    }
    q.on("drain", l), !q._isStdio && (!C || C.end !== !1) && (t.on("end", w), t.on("close", u));
    var b = !1;
    function w() {
      b || (b = !0, q.end());
    }
    function u() {
      b || (b = !0, typeof q.destroy == "function" && q.destroy());
    }
    function g(B) {
      if (R(), I.listenerCount(this, "error") === 0)
        throw B;
    }
    t.on("error", g), q.on("error", g);
    function R() {
      t.removeListener("data", E), q.removeListener("drain", l), t.removeListener("end", w), t.removeListener("close", u), t.removeListener("error", g), q.removeListener("error", g), t.removeListener("end", R), t.removeListener("close", R), q.removeListener("close", R);
    }
    return t.on("end", R), t.on("close", R), q.on("close", R), q.emit("pipe", t), q;
  }, streamBrowserify;
}
var cipherBase, hasRequiredCipherBase;
function requireCipherBase() {
  if (hasRequiredCipherBase) return cipherBase;
  hasRequiredCipherBase = 1;
  var I = requireSafeBuffer$1().Buffer, M = requireStreamBrowserify().Transform, T = requireString_decoder().StringDecoder, q = requireInherits_browser();
  function C(t) {
    M.call(this), this.hashMode = typeof t == "string", this.hashMode ? this[t] = this._finalOrDigest : this.final = this._finalOrDigest, this._final && (this.__final = this._final, this._final = null), this._decoder = null, this._encoding = null;
  }
  return q(C, M), C.prototype.update = function(t, E, l) {
    typeof t == "string" && (t = I.from(t, E));
    var b = this._update(t);
    return this.hashMode ? this : (l && (b = this._toString(b, l)), b);
  }, C.prototype.setAutoPadding = function() {
  }, C.prototype.getAuthTag = function() {
    throw new Error("trying to get auth tag in unsupported state");
  }, C.prototype.setAuthTag = function() {
    throw new Error("trying to set auth tag in unsupported state");
  }, C.prototype.setAAD = function() {
    throw new Error("trying to set aad in unsupported state");
  }, C.prototype._transform = function(t, E, l) {
    var b;
    try {
      this.hashMode ? this._update(t) : this.push(this._update(t));
    } catch (w) {
      b = w;
    } finally {
      l(b);
    }
  }, C.prototype._flush = function(t) {
    var E;
    try {
      this.push(this.__final());
    } catch (l) {
      E = l;
    }
    t(E);
  }, C.prototype._finalOrDigest = function(t) {
    var E = this.__final() || I.alloc(0);
    return t && (E = this._toString(E, t, !0)), E;
  }, C.prototype._toString = function(t, E, l) {
    if (this._decoder || (this._decoder = new T(E), this._encoding = E), this._encoding !== E) throw new Error("can't switch encodings");
    var b = this._decoder.write(t);
    return l && (b += this._decoder.end()), b;
  }, cipherBase = C, cipherBase;
}
var browser$9, hasRequiredBrowser$9;
function requireBrowser$9() {
  if (hasRequiredBrowser$9) return browser$9;
  hasRequiredBrowser$9 = 1;
  var I = requireInherits_browser(), M = requireMd5_js(), T = requireRipemd160(), q = requireSha_js(), C = requireCipherBase();
  function t(E) {
    C.call(this, "digest"), this._hash = E;
  }
  return I(t, C), t.prototype._update = function(E) {
    this._hash.update(E);
  }, t.prototype._final = function() {
    return this._hash.digest();
  }, browser$9 = function(l) {
    return l = l.toLowerCase(), l === "md5" ? new M() : l === "rmd160" || l === "ripemd160" ? new T() : new t(q(l));
  }, browser$9;
}
var legacy, hasRequiredLegacy;
function requireLegacy() {
  if (hasRequiredLegacy) return legacy;
  hasRequiredLegacy = 1;
  var I = requireInherits_browser(), M = requireSafeBuffer$1().Buffer, T = requireCipherBase(), q = M.alloc(128), C = 64;
  function t(E, l) {
    T.call(this, "digest"), typeof l == "string" && (l = M.from(l)), this._alg = E, this._key = l, l.length > C ? l = E(l) : l.length < C && (l = M.concat([l, q], C));
    for (var b = this._ipad = M.allocUnsafe(C), w = this._opad = M.allocUnsafe(C), u = 0; u < C; u++)
      b[u] = l[u] ^ 54, w[u] = l[u] ^ 92;
    this._hash = [b];
  }
  return I(t, T), t.prototype._update = function(E) {
    this._hash.push(E);
  }, t.prototype._final = function() {
    var E = this._alg(M.concat(this._hash));
    return this._alg(M.concat([this._opad, E]));
  }, legacy = t, legacy;
}
var md5, hasRequiredMd5;
function requireMd5() {
  if (hasRequiredMd5) return md5;
  hasRequiredMd5 = 1;
  var I = requireMd5_js();
  return md5 = function(M) {
    return new I().update(M).digest();
  }, md5;
}
var browser$8, hasRequiredBrowser$8;
function requireBrowser$8() {
  if (hasRequiredBrowser$8) return browser$8;
  hasRequiredBrowser$8 = 1;
  var I = requireInherits_browser(), M = requireLegacy(), T = requireCipherBase(), q = requireSafeBuffer$1().Buffer, C = requireMd5(), t = requireRipemd160(), E = requireSha_js(), l = q.alloc(128);
  function b(w, u) {
    T.call(this, "digest"), typeof u == "string" && (u = q.from(u));
    var g = w === "sha512" || w === "sha384" ? 128 : 64;
    if (this._alg = w, this._key = u, u.length > g) {
      var R = w === "rmd160" ? new t() : E(w);
      u = R.update(u).digest();
    } else u.length < g && (u = q.concat([u, l], g));
    for (var B = this._ipad = q.allocUnsafe(g), k = this._opad = q.allocUnsafe(g), $ = 0; $ < g; $++)
      B[$] = u[$] ^ 54, k[$] = u[$] ^ 92;
    this._hash = w === "rmd160" ? new t() : E(w), this._hash.update(B);
  }
  return I(b, T), b.prototype._update = function(w) {
    this._hash.update(w);
  }, b.prototype._final = function() {
    var w = this._hash.digest(), u = this._alg === "rmd160" ? new t() : E(this._alg);
    return u.update(this._opad).update(w).digest();
  }, browser$8 = function(u, g) {
    return u = u.toLowerCase(), u === "rmd160" || u === "ripemd160" ? new b("rmd160", g) : u === "md5" ? new M(C, g) : new b(u, g);
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
  var I = Math.pow(2, 30) - 1;
  return precondition = function(M, T) {
    if (typeof M != "number")
      throw new TypeError("Iterations not a number");
    if (M < 0)
      throw new TypeError("Bad iterations");
    if (typeof T != "number")
      throw new TypeError("Key length not a number");
    if (T < 0 || T > I || T !== T)
      throw new TypeError("Bad key length");
  }, precondition;
}
var defaultEncoding_1, hasRequiredDefaultEncoding;
function requireDefaultEncoding() {
  if (hasRequiredDefaultEncoding) return defaultEncoding_1;
  hasRequiredDefaultEncoding = 1;
  var I;
  if (commonjsGlobal.process && commonjsGlobal.process.browser)
    I = "utf-8";
  else if (commonjsGlobal.process && commonjsGlobal.process.version) {
    var M = parseInt(process$1.version.split(".")[0].slice(1), 10);
    I = M >= 6 ? "utf-8" : "binary";
  } else
    I = "utf-8";
  return defaultEncoding_1 = I, defaultEncoding_1;
}
var toBuffer, hasRequiredToBuffer;
function requireToBuffer() {
  if (hasRequiredToBuffer) return toBuffer;
  hasRequiredToBuffer = 1;
  var I = requireSafeBuffer$1().Buffer;
  return toBuffer = function(M, T, q) {
    if (I.isBuffer(M))
      return M;
    if (typeof M == "string")
      return I.from(M, T);
    if (ArrayBuffer.isView(M))
      return I.from(M.buffer);
    throw new TypeError(q + " must be a string, a Buffer, a typed array or a DataView");
  }, toBuffer;
}
var syncBrowser, hasRequiredSyncBrowser;
function requireSyncBrowser() {
  if (hasRequiredSyncBrowser) return syncBrowser;
  hasRequiredSyncBrowser = 1;
  var I = requireMd5(), M = requireRipemd160(), T = requireSha_js(), q = requireSafeBuffer$1().Buffer, C = requirePrecondition(), t = requireDefaultEncoding(), E = requireToBuffer(), l = q.alloc(128), b = {
    md5: 16,
    sha1: 20,
    sha224: 28,
    sha256: 32,
    sha384: 48,
    sha512: 64,
    rmd160: 20,
    ripemd160: 20
  };
  function w(R, B, k) {
    var $ = u(R), O = R === "sha512" || R === "sha384" ? 128 : 64;
    B.length > O ? B = $(B) : B.length < O && (B = q.concat([B, l], O));
    for (var D = q.allocUnsafe(O + b[R]), N = q.allocUnsafe(O + b[R]), W = 0; W < O; W++)
      D[W] = B[W] ^ 54, N[W] = B[W] ^ 92;
    var z = q.allocUnsafe(O + k + 4);
    D.copy(z, 0, 0, O), this.ipad1 = z, this.ipad2 = D, this.opad = N, this.alg = R, this.blocksize = O, this.hash = $, this.size = b[R];
  }
  w.prototype.run = function(R, B) {
    R.copy(B, this.blocksize);
    var k = this.hash(B);
    return k.copy(this.opad, this.blocksize), this.hash(this.opad);
  };
  function u(R) {
    function B($) {
      return T(R).update($).digest();
    }
    function k($) {
      return new M().update($).digest();
    }
    return R === "rmd160" || R === "ripemd160" ? k : R === "md5" ? I : B;
  }
  function g(R, B, k, $, O) {
    C(k, $), R = E(R, t, "Password"), B = E(B, t, "Salt"), O = O || "sha1";
    var D = new w(O, R, B.length), N = q.allocUnsafe($), W = q.allocUnsafe(B.length + 4);
    B.copy(W, 0, 0, B.length);
    for (var z = 0, X = b[O], Q = Math.ceil($ / X), ae = 1; ae <= Q; ae++) {
      W.writeUInt32BE(ae, B.length);
      for (var fe = D.run(W, D.ipad1), te = fe, ce = 1; ce < k; ce++) {
        te = D.run(te, D.ipad2);
        for (var H = 0; H < X; H++) fe[H] ^= te[H];
      }
      fe.copy(N, z), z += X;
    }
    return N;
  }
  return syncBrowser = g, syncBrowser;
}
var async, hasRequiredAsync;
function requireAsync() {
  if (hasRequiredAsync) return async;
  hasRequiredAsync = 1;
  var I = requireSafeBuffer$1().Buffer, M = requirePrecondition(), T = requireDefaultEncoding(), q = requireSyncBrowser(), C = requireToBuffer(), t, E = commonjsGlobal.crypto && commonjsGlobal.crypto.subtle, l = {
    sha: "SHA-1",
    "sha-1": "SHA-1",
    sha1: "SHA-1",
    sha256: "SHA-256",
    "sha-256": "SHA-256",
    sha384: "SHA-384",
    "sha-384": "SHA-384",
    "sha-512": "SHA-512",
    sha512: "SHA-512"
  }, b = [];
  function w(k) {
    if (commonjsGlobal.process && !commonjsGlobal.process.browser || !E || !E.importKey || !E.deriveBits)
      return Promise.resolve(!1);
    if (b[k] !== void 0)
      return b[k];
    t = t || I.alloc(8);
    var $ = R(t, t, 10, 128, k).then(function() {
      return !0;
    }).catch(function() {
      return !1;
    });
    return b[k] = $, $;
  }
  var u;
  function g() {
    return u || (commonjsGlobal.process && commonjsGlobal.process.nextTick ? u = commonjsGlobal.process.nextTick : commonjsGlobal.queueMicrotask ? u = commonjsGlobal.queueMicrotask : commonjsGlobal.setImmediate ? u = commonjsGlobal.setImmediate : u = commonjsGlobal.setTimeout, u);
  }
  function R(k, $, O, D, N) {
    return E.importKey(
      "raw",
      k,
      { name: "PBKDF2" },
      !1,
      ["deriveBits"]
    ).then(function(W) {
      return E.deriveBits({
        name: "PBKDF2",
        salt: $,
        iterations: O,
        hash: {
          name: N
        }
      }, W, D << 3);
    }).then(function(W) {
      return I.from(W);
    });
  }
  function B(k, $) {
    k.then(function(O) {
      g()(function() {
        $(null, O);
      });
    }, function(O) {
      g()(function() {
        $(O);
      });
    });
  }
  return async = function(k, $, O, D, N, W) {
    typeof N == "function" && (W = N, N = void 0), N = N || "sha1";
    var z = l[N.toLowerCase()];
    if (!z || typeof commonjsGlobal.Promise != "function") {
      g()(function() {
        var X;
        try {
          X = q(k, $, O, D, N);
        } catch (Q) {
          return W(Q);
        }
        W(null, X);
      });
      return;
    }
    if (M(O, D), k = C(k, T, "Password"), $ = C($, T, "Salt"), typeof W != "function") throw new Error("No callback provided to pbkdf2");
    B(w(z).then(function(X) {
      return X ? R(k, $, O, D, z) : q(k, $, O, D, N);
    }), W);
  }, async;
}
var hasRequiredBrowser$7;
function requireBrowser$7() {
  return hasRequiredBrowser$7 || (hasRequiredBrowser$7 = 1, browser$7.pbkdf2 = requireAsync(), browser$7.pbkdf2Sync = requireSyncBrowser()), browser$7;
}
var browser$6 = {}, des$1 = {}, utils$3 = {}, hasRequiredUtils$3;
function requireUtils$3() {
  if (hasRequiredUtils$3) return utils$3;
  hasRequiredUtils$3 = 1, utils$3.readUInt32BE = function(C, t) {
    var E = C[0 + t] << 24 | C[1 + t] << 16 | C[2 + t] << 8 | C[3 + t];
    return E >>> 0;
  }, utils$3.writeUInt32BE = function(C, t, E) {
    C[0 + E] = t >>> 24, C[1 + E] = t >>> 16 & 255, C[2 + E] = t >>> 8 & 255, C[3 + E] = t & 255;
  }, utils$3.ip = function(C, t, E, l) {
    for (var b = 0, w = 0, u = 6; u >= 0; u -= 2) {
      for (var g = 0; g <= 24; g += 8)
        b <<= 1, b |= t >>> g + u & 1;
      for (var g = 0; g <= 24; g += 8)
        b <<= 1, b |= C >>> g + u & 1;
    }
    for (var u = 6; u >= 0; u -= 2) {
      for (var g = 1; g <= 25; g += 8)
        w <<= 1, w |= t >>> g + u & 1;
      for (var g = 1; g <= 25; g += 8)
        w <<= 1, w |= C >>> g + u & 1;
    }
    E[l + 0] = b >>> 0, E[l + 1] = w >>> 0;
  }, utils$3.rip = function(C, t, E, l) {
    for (var b = 0, w = 0, u = 0; u < 4; u++)
      for (var g = 24; g >= 0; g -= 8)
        b <<= 1, b |= t >>> g + u & 1, b <<= 1, b |= C >>> g + u & 1;
    for (var u = 4; u < 8; u++)
      for (var g = 24; g >= 0; g -= 8)
        w <<= 1, w |= t >>> g + u & 1, w <<= 1, w |= C >>> g + u & 1;
    E[l + 0] = b >>> 0, E[l + 1] = w >>> 0;
  }, utils$3.pc1 = function(C, t, E, l) {
    for (var b = 0, w = 0, u = 7; u >= 5; u--) {
      for (var g = 0; g <= 24; g += 8)
        b <<= 1, b |= t >> g + u & 1;
      for (var g = 0; g <= 24; g += 8)
        b <<= 1, b |= C >> g + u & 1;
    }
    for (var g = 0; g <= 24; g += 8)
      b <<= 1, b |= t >> g + u & 1;
    for (var u = 1; u <= 3; u++) {
      for (var g = 0; g <= 24; g += 8)
        w <<= 1, w |= t >> g + u & 1;
      for (var g = 0; g <= 24; g += 8)
        w <<= 1, w |= C >> g + u & 1;
    }
    for (var g = 0; g <= 24; g += 8)
      w <<= 1, w |= C >> g + u & 1;
    E[l + 0] = b >>> 0, E[l + 1] = w >>> 0;
  }, utils$3.r28shl = function(C, t) {
    return C << t & 268435455 | C >>> 28 - t;
  };
  var I = [
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
  utils$3.pc2 = function(C, t, E, l) {
    for (var b = 0, w = 0, u = I.length >>> 1, g = 0; g < u; g++)
      b <<= 1, b |= C >>> I[g] & 1;
    for (var g = u; g < I.length; g++)
      w <<= 1, w |= t >>> I[g] & 1;
    E[l + 0] = b >>> 0, E[l + 1] = w >>> 0;
  }, utils$3.expand = function(C, t, E) {
    var l = 0, b = 0;
    l = (C & 1) << 5 | C >>> 27;
    for (var w = 23; w >= 15; w -= 4)
      l <<= 6, l |= C >>> w & 63;
    for (var w = 11; w >= 3; w -= 4)
      b |= C >>> w & 63, b <<= 6;
    b |= (C & 31) << 1 | C >>> 31, t[E + 0] = l >>> 0, t[E + 1] = b >>> 0;
  };
  var M = [
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
  utils$3.substitute = function(C, t) {
    for (var E = 0, l = 0; l < 4; l++) {
      var b = C >>> 18 - l * 6 & 63, w = M[l * 64 + b];
      E <<= 4, E |= w;
    }
    for (var l = 0; l < 4; l++) {
      var b = t >>> 18 - l * 6 & 63, w = M[4 * 64 + l * 64 + b];
      E <<= 4, E |= w;
    }
    return E >>> 0;
  };
  var T = [
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
  return utils$3.permute = function(C) {
    for (var t = 0, E = 0; E < T.length; E++)
      t <<= 1, t |= C >>> T[E] & 1;
    return t >>> 0;
  }, utils$3.padSplit = function(C, t, E) {
    for (var l = C.toString(2); l.length < t; )
      l = "0" + l;
    for (var b = [], w = 0; w < t; w += E)
      b.push(l.slice(w, w + E));
    return b.join(" ");
  }, utils$3;
}
var minimalisticAssert, hasRequiredMinimalisticAssert;
function requireMinimalisticAssert() {
  if (hasRequiredMinimalisticAssert) return minimalisticAssert;
  hasRequiredMinimalisticAssert = 1, minimalisticAssert = I;
  function I(M, T) {
    if (!M)
      throw new Error(T || "Assertion failed");
  }
  return I.equal = function(T, q, C) {
    if (T != q)
      throw new Error(C || "Assertion failed: " + T + " != " + q);
  }, minimalisticAssert;
}
var cipher, hasRequiredCipher;
function requireCipher() {
  if (hasRequiredCipher) return cipher;
  hasRequiredCipher = 1;
  var I = requireMinimalisticAssert();
  function M(T) {
    this.options = T, this.type = this.options.type, this.blockSize = 8, this._init(), this.buffer = new Array(this.blockSize), this.bufferOff = 0, this.padding = T.padding !== !1;
  }
  return cipher = M, M.prototype._init = function() {
  }, M.prototype.update = function(q) {
    return q.length === 0 ? [] : this.type === "decrypt" ? this._updateDecrypt(q) : this._updateEncrypt(q);
  }, M.prototype._buffer = function(q, C) {
    for (var t = Math.min(this.buffer.length - this.bufferOff, q.length - C), E = 0; E < t; E++)
      this.buffer[this.bufferOff + E] = q[C + E];
    return this.bufferOff += t, t;
  }, M.prototype._flushBuffer = function(q, C) {
    return this._update(this.buffer, 0, q, C), this.bufferOff = 0, this.blockSize;
  }, M.prototype._updateEncrypt = function(q) {
    var C = 0, t = 0, E = (this.bufferOff + q.length) / this.blockSize | 0, l = new Array(E * this.blockSize);
    this.bufferOff !== 0 && (C += this._buffer(q, C), this.bufferOff === this.buffer.length && (t += this._flushBuffer(l, t)));
    for (var b = q.length - (q.length - C) % this.blockSize; C < b; C += this.blockSize)
      this._update(q, C, l, t), t += this.blockSize;
    for (; C < q.length; C++, this.bufferOff++)
      this.buffer[this.bufferOff] = q[C];
    return l;
  }, M.prototype._updateDecrypt = function(q) {
    for (var C = 0, t = 0, E = Math.ceil((this.bufferOff + q.length) / this.blockSize) - 1, l = new Array(E * this.blockSize); E > 0; E--)
      C += this._buffer(q, C), t += this._flushBuffer(l, t);
    return C += this._buffer(q, C), l;
  }, M.prototype.final = function(q) {
    var C;
    q && (C = this.update(q));
    var t;
    return this.type === "encrypt" ? t = this._finalEncrypt() : t = this._finalDecrypt(), C ? C.concat(t) : t;
  }, M.prototype._pad = function(q, C) {
    if (C === 0)
      return !1;
    for (; C < q.length; )
      q[C++] = 0;
    return !0;
  }, M.prototype._finalEncrypt = function() {
    if (!this._pad(this.buffer, this.bufferOff))
      return [];
    var q = new Array(this.blockSize);
    return this._update(this.buffer, 0, q, 0), q;
  }, M.prototype._unpad = function(q) {
    return q;
  }, M.prototype._finalDecrypt = function() {
    I.equal(this.bufferOff, this.blockSize, "Not enough data to decrypt");
    var q = new Array(this.blockSize);
    return this._flushBuffer(q, 0), this._unpad(q);
  }, cipher;
}
var des, hasRequiredDes$1;
function requireDes$1() {
  if (hasRequiredDes$1) return des;
  hasRequiredDes$1 = 1;
  var I = requireMinimalisticAssert(), M = requireInherits_browser(), T = requireUtils$3(), q = requireCipher();
  function C() {
    this.tmp = new Array(2), this.keys = null;
  }
  function t(l) {
    q.call(this, l);
    var b = new C();
    this._desState = b, this.deriveKeys(b, l.key);
  }
  M(t, q), des = t, t.create = function(b) {
    return new t(b);
  };
  var E = [
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
  return t.prototype.deriveKeys = function(b, w) {
    b.keys = new Array(16 * 2), I.equal(w.length, this.blockSize, "Invalid key length");
    var u = T.readUInt32BE(w, 0), g = T.readUInt32BE(w, 4);
    T.pc1(u, g, b.tmp, 0), u = b.tmp[0], g = b.tmp[1];
    for (var R = 0; R < b.keys.length; R += 2) {
      var B = E[R >>> 1];
      u = T.r28shl(u, B), g = T.r28shl(g, B), T.pc2(u, g, b.keys, R);
    }
  }, t.prototype._update = function(b, w, u, g) {
    var R = this._desState, B = T.readUInt32BE(b, w), k = T.readUInt32BE(b, w + 4);
    T.ip(B, k, R.tmp, 0), B = R.tmp[0], k = R.tmp[1], this.type === "encrypt" ? this._encrypt(R, B, k, R.tmp, 0) : this._decrypt(R, B, k, R.tmp, 0), B = R.tmp[0], k = R.tmp[1], T.writeUInt32BE(u, B, g), T.writeUInt32BE(u, k, g + 4);
  }, t.prototype._pad = function(b, w) {
    if (this.padding === !1)
      return !1;
    for (var u = b.length - w, g = w; g < b.length; g++)
      b[g] = u;
    return !0;
  }, t.prototype._unpad = function(b) {
    if (this.padding === !1)
      return b;
    for (var w = b[b.length - 1], u = b.length - w; u < b.length; u++)
      I.equal(b[u], w);
    return b.slice(0, b.length - w);
  }, t.prototype._encrypt = function(b, w, u, g, R) {
    for (var B = w, k = u, $ = 0; $ < b.keys.length; $ += 2) {
      var O = b.keys[$], D = b.keys[$ + 1];
      T.expand(k, b.tmp, 0), O ^= b.tmp[0], D ^= b.tmp[1];
      var N = T.substitute(O, D), W = T.permute(N), z = k;
      k = (B ^ W) >>> 0, B = z;
    }
    T.rip(k, B, g, R);
  }, t.prototype._decrypt = function(b, w, u, g, R) {
    for (var B = u, k = w, $ = b.keys.length - 2; $ >= 0; $ -= 2) {
      var O = b.keys[$], D = b.keys[$ + 1];
      T.expand(B, b.tmp, 0), O ^= b.tmp[0], D ^= b.tmp[1];
      var N = T.substitute(O, D), W = T.permute(N), z = B;
      B = (k ^ W) >>> 0, k = z;
    }
    T.rip(B, k, g, R);
  }, des;
}
var cbc$1 = {}, hasRequiredCbc$1;
function requireCbc$1() {
  if (hasRequiredCbc$1) return cbc$1;
  hasRequiredCbc$1 = 1;
  var I = requireMinimalisticAssert(), M = requireInherits_browser(), T = {};
  function q(t) {
    I.equal(t.length, 8, "Invalid IV length"), this.iv = new Array(8);
    for (var E = 0; E < this.iv.length; E++)
      this.iv[E] = t[E];
  }
  function C(t) {
    function E(u) {
      t.call(this, u), this._cbcInit();
    }
    M(E, t);
    for (var l = Object.keys(T), b = 0; b < l.length; b++) {
      var w = l[b];
      E.prototype[w] = T[w];
    }
    return E.create = function(g) {
      return new E(g);
    }, E;
  }
  return cbc$1.instantiate = C, T._cbcInit = function() {
    var E = new q(this.options.iv);
    this._cbcState = E;
  }, T._update = function(E, l, b, w) {
    var u = this._cbcState, g = this.constructor.super_.prototype, R = u.iv;
    if (this.type === "encrypt") {
      for (var B = 0; B < this.blockSize; B++)
        R[B] ^= E[l + B];
      g._update.call(this, R, 0, b, w);
      for (var B = 0; B < this.blockSize; B++)
        R[B] = b[w + B];
    } else {
      g._update.call(this, E, l, b, w);
      for (var B = 0; B < this.blockSize; B++)
        b[w + B] ^= R[B];
      for (var B = 0; B < this.blockSize; B++)
        R[B] = E[l + B];
    }
  }, cbc$1;
}
var ede, hasRequiredEde;
function requireEde() {
  if (hasRequiredEde) return ede;
  hasRequiredEde = 1;
  var I = requireMinimalisticAssert(), M = requireInherits_browser(), T = requireCipher(), q = requireDes$1();
  function C(E, l) {
    I.equal(l.length, 24, "Invalid key length");
    var b = l.slice(0, 8), w = l.slice(8, 16), u = l.slice(16, 24);
    E === "encrypt" ? this.ciphers = [
      q.create({ type: "encrypt", key: b }),
      q.create({ type: "decrypt", key: w }),
      q.create({ type: "encrypt", key: u })
    ] : this.ciphers = [
      q.create({ type: "decrypt", key: u }),
      q.create({ type: "encrypt", key: w }),
      q.create({ type: "decrypt", key: b })
    ];
  }
  function t(E) {
    T.call(this, E);
    var l = new C(this.type, this.options.key);
    this._edeState = l;
  }
  return M(t, T), ede = t, t.create = function(l) {
    return new t(l);
  }, t.prototype._update = function(l, b, w, u) {
    var g = this._edeState;
    g.ciphers[0]._update(l, b, w, u), g.ciphers[1]._update(w, u, w, u), g.ciphers[2]._update(w, u, w, u);
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
  var I = requireCipherBase(), M = requireDes(), T = requireInherits_browser(), q = requireSafeBuffer$1().Buffer, C = {
    "des-ede3-cbc": M.CBC.instantiate(M.EDE),
    "des-ede3": M.EDE,
    "des-ede-cbc": M.CBC.instantiate(M.EDE),
    "des-ede": M.EDE,
    "des-cbc": M.CBC.instantiate(M.DES),
    "des-ecb": M.DES
  };
  C.des = C["des-cbc"], C.des3 = C["des-ede3-cbc"], browserifyDes = t, T(t, I);
  function t(E) {
    I.call(this);
    var l = E.mode.toLowerCase(), b = C[l], w;
    E.decrypt ? w = "decrypt" : w = "encrypt";
    var u = E.key;
    q.isBuffer(u) || (u = q.from(u)), (l === "des-ede" || l === "des-ede-cbc") && (u = q.concat([u, u.slice(0, 8)]));
    var g = E.iv;
    q.isBuffer(g) || (g = q.from(g)), this._des = b.create({
      key: u,
      iv: g,
      type: w
    });
  }
  return t.prototype._update = function(E) {
    return q.from(this._des.update(E));
  }, t.prototype._final = function() {
    return q.from(this._des.final());
  }, browserifyDes;
}
var browser$5 = {}, encrypter = {}, ecb = {}, hasRequiredEcb;
function requireEcb() {
  return hasRequiredEcb || (hasRequiredEcb = 1, ecb.encrypt = function(I, M) {
    return I._cipher.encryptBlock(M);
  }, ecb.decrypt = function(I, M) {
    return I._cipher.decryptBlock(M);
  }), ecb;
}
var cbc = {}, bufferXor, hasRequiredBufferXor;
function requireBufferXor() {
  return hasRequiredBufferXor || (hasRequiredBufferXor = 1, bufferXor = function(M, T) {
    for (var q = Math.min(M.length, T.length), C = new bufferExports.Buffer(q), t = 0; t < q; ++t)
      C[t] = M[t] ^ T[t];
    return C;
  }), bufferXor;
}
var hasRequiredCbc;
function requireCbc() {
  if (hasRequiredCbc) return cbc;
  hasRequiredCbc = 1;
  var I = requireBufferXor();
  return cbc.encrypt = function(M, T) {
    var q = I(T, M._prev);
    return M._prev = M._cipher.encryptBlock(q), M._prev;
  }, cbc.decrypt = function(M, T) {
    var q = M._prev;
    M._prev = T;
    var C = M._cipher.decryptBlock(T);
    return I(C, q);
  }, cbc;
}
var cfb = {}, hasRequiredCfb;
function requireCfb() {
  if (hasRequiredCfb) return cfb;
  hasRequiredCfb = 1;
  var I = requireSafeBuffer$1().Buffer, M = requireBufferXor();
  function T(q, C, t) {
    var E = C.length, l = M(C, q._cache);
    return q._cache = q._cache.slice(E), q._prev = I.concat([q._prev, t ? C : l]), l;
  }
  return cfb.encrypt = function(q, C, t) {
    for (var E = I.allocUnsafe(0), l; C.length; )
      if (q._cache.length === 0 && (q._cache = q._cipher.encryptBlock(q._prev), q._prev = I.allocUnsafe(0)), q._cache.length <= C.length)
        l = q._cache.length, E = I.concat([E, T(q, C.slice(0, l), t)]), C = C.slice(l);
      else {
        E = I.concat([E, T(q, C, t)]);
        break;
      }
    return E;
  }, cfb;
}
var cfb8 = {}, hasRequiredCfb8;
function requireCfb8() {
  if (hasRequiredCfb8) return cfb8;
  hasRequiredCfb8 = 1;
  var I = requireSafeBuffer$1().Buffer;
  function M(T, q, C) {
    var t = T._cipher.encryptBlock(T._prev), E = t[0] ^ q;
    return T._prev = I.concat([
      T._prev.slice(1),
      I.from([C ? q : E])
    ]), E;
  }
  return cfb8.encrypt = function(T, q, C) {
    for (var t = q.length, E = I.allocUnsafe(t), l = -1; ++l < t; )
      E[l] = M(T, q[l], C);
    return E;
  }, cfb8;
}
var cfb1 = {}, hasRequiredCfb1;
function requireCfb1() {
  if (hasRequiredCfb1) return cfb1;
  hasRequiredCfb1 = 1;
  var I = requireSafeBuffer$1().Buffer;
  function M(q, C, t) {
    for (var E, l = -1, b = 8, w = 0, u, g; ++l < b; )
      E = q._cipher.encryptBlock(q._prev), u = C & 1 << 7 - l ? 128 : 0, g = E[0] ^ u, w += (g & 128) >> l % 8, q._prev = T(q._prev, t ? u : g);
    return w;
  }
  function T(q, C) {
    var t = q.length, E = -1, l = I.allocUnsafe(q.length);
    for (q = I.concat([q, I.from([C])]); ++E < t; )
      l[E] = q[E] << 1 | q[E + 1] >> 7;
    return l;
  }
  return cfb1.encrypt = function(q, C, t) {
    for (var E = C.length, l = I.allocUnsafe(E), b = -1; ++b < E; )
      l[b] = M(q, C[b], t);
    return l;
  }, cfb1;
}
var ofb = {}, hasRequiredOfb;
function requireOfb() {
  if (hasRequiredOfb) return ofb;
  hasRequiredOfb = 1;
  var I = requireBufferXor();
  function M(T) {
    return T._prev = T._cipher.encryptBlock(T._prev), T._prev;
  }
  return ofb.encrypt = function(T, q) {
    for (; T._cache.length < q.length; )
      T._cache = bufferExports.Buffer.concat([T._cache, M(T)]);
    var C = T._cache.slice(0, q.length);
    return T._cache = T._cache.slice(q.length), I(q, C);
  }, ofb;
}
var ctr = {}, incr32_1, hasRequiredIncr32;
function requireIncr32() {
  if (hasRequiredIncr32) return incr32_1;
  hasRequiredIncr32 = 1;
  function I(M) {
    for (var T = M.length, q; T--; )
      if (q = M.readUInt8(T), q === 255)
        M.writeUInt8(0, T);
      else {
        q++, M.writeUInt8(q, T);
        break;
      }
  }
  return incr32_1 = I, incr32_1;
}
var hasRequiredCtr;
function requireCtr() {
  if (hasRequiredCtr) return ctr;
  hasRequiredCtr = 1;
  var I = requireBufferXor(), M = requireSafeBuffer$1().Buffer, T = requireIncr32();
  function q(t) {
    var E = t._cipher.encryptBlockRaw(t._prev);
    return T(t._prev), E;
  }
  var C = 16;
  return ctr.encrypt = function(t, E) {
    var l = Math.ceil(E.length / C), b = t._cache.length;
    t._cache = M.concat([
      t._cache,
      M.allocUnsafe(l * C)
    ]);
    for (var w = 0; w < l; w++) {
      var u = q(t), g = b + w * C;
      t._cache.writeUInt32BE(u[0], g + 0), t._cache.writeUInt32BE(u[1], g + 4), t._cache.writeUInt32BE(u[2], g + 8), t._cache.writeUInt32BE(u[3], g + 12);
    }
    var R = t._cache.slice(0, E.length);
    return t._cache = t._cache.slice(E.length), I(E, R);
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
  var I = {
    ECB: requireEcb(),
    CBC: requireCbc(),
    CFB: requireCfb(),
    CFB8: requireCfb8(),
    CFB1: requireCfb1(),
    OFB: requireOfb(),
    CTR: requireCtr(),
    GCM: requireCtr()
  }, M = require$$2;
  for (var T in M)
    M[T].module = I[M[T].mode];
  return modes_1 = M, modes_1;
}
var aes = {}, hasRequiredAes;
function requireAes() {
  if (hasRequiredAes) return aes;
  hasRequiredAes = 1;
  var I = requireSafeBuffer$1().Buffer;
  function M(l) {
    I.isBuffer(l) || (l = I.from(l));
    for (var b = l.length / 4 | 0, w = new Array(b), u = 0; u < b; u++)
      w[u] = l.readUInt32BE(u * 4);
    return w;
  }
  function T(l) {
    for (var b = 0; b < l.length; l++)
      l[b] = 0;
  }
  function q(l, b, w, u, g) {
    for (var R = w[0], B = w[1], k = w[2], $ = w[3], O = l[0] ^ b[0], D = l[1] ^ b[1], N = l[2] ^ b[2], W = l[3] ^ b[3], z, X, Q, ae, fe = 4, te = 1; te < g; te++)
      z = R[O >>> 24] ^ B[D >>> 16 & 255] ^ k[N >>> 8 & 255] ^ $[W & 255] ^ b[fe++], X = R[D >>> 24] ^ B[N >>> 16 & 255] ^ k[W >>> 8 & 255] ^ $[O & 255] ^ b[fe++], Q = R[N >>> 24] ^ B[W >>> 16 & 255] ^ k[O >>> 8 & 255] ^ $[D & 255] ^ b[fe++], ae = R[W >>> 24] ^ B[O >>> 16 & 255] ^ k[D >>> 8 & 255] ^ $[N & 255] ^ b[fe++], O = z, D = X, N = Q, W = ae;
    return z = (u[O >>> 24] << 24 | u[D >>> 16 & 255] << 16 | u[N >>> 8 & 255] << 8 | u[W & 255]) ^ b[fe++], X = (u[D >>> 24] << 24 | u[N >>> 16 & 255] << 16 | u[W >>> 8 & 255] << 8 | u[O & 255]) ^ b[fe++], Q = (u[N >>> 24] << 24 | u[W >>> 16 & 255] << 16 | u[O >>> 8 & 255] << 8 | u[D & 255]) ^ b[fe++], ae = (u[W >>> 24] << 24 | u[O >>> 16 & 255] << 16 | u[D >>> 8 & 255] << 8 | u[N & 255]) ^ b[fe++], z = z >>> 0, X = X >>> 0, Q = Q >>> 0, ae = ae >>> 0, [z, X, Q, ae];
  }
  var C = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54], t = function() {
    for (var l = new Array(256), b = 0; b < 256; b++)
      b < 128 ? l[b] = b << 1 : l[b] = b << 1 ^ 283;
    for (var w = [], u = [], g = [[], [], [], []], R = [[], [], [], []], B = 0, k = 0, $ = 0; $ < 256; ++$) {
      var O = k ^ k << 1 ^ k << 2 ^ k << 3 ^ k << 4;
      O = O >>> 8 ^ O & 255 ^ 99, w[B] = O, u[O] = B;
      var D = l[B], N = l[D], W = l[N], z = l[O] * 257 ^ O * 16843008;
      g[0][B] = z << 24 | z >>> 8, g[1][B] = z << 16 | z >>> 16, g[2][B] = z << 8 | z >>> 24, g[3][B] = z, z = W * 16843009 ^ N * 65537 ^ D * 257 ^ B * 16843008, R[0][O] = z << 24 | z >>> 8, R[1][O] = z << 16 | z >>> 16, R[2][O] = z << 8 | z >>> 24, R[3][O] = z, B === 0 ? B = k = 1 : (B = D ^ l[l[l[W ^ D]]], k ^= l[l[k]]);
    }
    return {
      SBOX: w,
      INV_SBOX: u,
      SUB_MIX: g,
      INV_SUB_MIX: R
    };
  }();
  function E(l) {
    this._key = M(l), this._reset();
  }
  return E.blockSize = 4 * 4, E.keySize = 256 / 8, E.prototype.blockSize = E.blockSize, E.prototype.keySize = E.keySize, E.prototype._reset = function() {
    for (var l = this._key, b = l.length, w = b + 6, u = (w + 1) * 4, g = [], R = 0; R < b; R++)
      g[R] = l[R];
    for (R = b; R < u; R++) {
      var B = g[R - 1];
      R % b === 0 ? (B = B << 8 | B >>> 24, B = t.SBOX[B >>> 24] << 24 | t.SBOX[B >>> 16 & 255] << 16 | t.SBOX[B >>> 8 & 255] << 8 | t.SBOX[B & 255], B ^= C[R / b | 0] << 24) : b > 6 && R % b === 4 && (B = t.SBOX[B >>> 24] << 24 | t.SBOX[B >>> 16 & 255] << 16 | t.SBOX[B >>> 8 & 255] << 8 | t.SBOX[B & 255]), g[R] = g[R - b] ^ B;
    }
    for (var k = [], $ = 0; $ < u; $++) {
      var O = u - $, D = g[O - ($ % 4 ? 0 : 4)];
      $ < 4 || O <= 4 ? k[$] = D : k[$] = t.INV_SUB_MIX[0][t.SBOX[D >>> 24]] ^ t.INV_SUB_MIX[1][t.SBOX[D >>> 16 & 255]] ^ t.INV_SUB_MIX[2][t.SBOX[D >>> 8 & 255]] ^ t.INV_SUB_MIX[3][t.SBOX[D & 255]];
    }
    this._nRounds = w, this._keySchedule = g, this._invKeySchedule = k;
  }, E.prototype.encryptBlockRaw = function(l) {
    return l = M(l), q(l, this._keySchedule, t.SUB_MIX, t.SBOX, this._nRounds);
  }, E.prototype.encryptBlock = function(l) {
    var b = this.encryptBlockRaw(l), w = I.allocUnsafe(16);
    return w.writeUInt32BE(b[0], 0), w.writeUInt32BE(b[1], 4), w.writeUInt32BE(b[2], 8), w.writeUInt32BE(b[3], 12), w;
  }, E.prototype.decryptBlock = function(l) {
    l = M(l);
    var b = l[1];
    l[1] = l[3], l[3] = b;
    var w = q(l, this._invKeySchedule, t.INV_SUB_MIX, t.INV_SBOX, this._nRounds), u = I.allocUnsafe(16);
    return u.writeUInt32BE(w[0], 0), u.writeUInt32BE(w[3], 4), u.writeUInt32BE(w[2], 8), u.writeUInt32BE(w[1], 12), u;
  }, E.prototype.scrub = function() {
    T(this._keySchedule), T(this._invKeySchedule), T(this._key);
  }, aes.AES = E, aes;
}
var ghash, hasRequiredGhash;
function requireGhash() {
  if (hasRequiredGhash) return ghash;
  hasRequiredGhash = 1;
  var I = requireSafeBuffer$1().Buffer, M = I.alloc(16, 0);
  function T(t) {
    return [
      t.readUInt32BE(0),
      t.readUInt32BE(4),
      t.readUInt32BE(8),
      t.readUInt32BE(12)
    ];
  }
  function q(t) {
    var E = I.allocUnsafe(16);
    return E.writeUInt32BE(t[0] >>> 0, 0), E.writeUInt32BE(t[1] >>> 0, 4), E.writeUInt32BE(t[2] >>> 0, 8), E.writeUInt32BE(t[3] >>> 0, 12), E;
  }
  function C(t) {
    this.h = t, this.state = I.alloc(16, 0), this.cache = I.allocUnsafe(0);
  }
  return C.prototype.ghash = function(t) {
    for (var E = -1; ++E < t.length; )
      this.state[E] ^= t[E];
    this._multiply();
  }, C.prototype._multiply = function() {
    for (var t = T(this.h), E = [0, 0, 0, 0], l, b, w, u = -1; ++u < 128; ) {
      for (b = (this.state[~~(u / 8)] & 1 << 7 - u % 8) !== 0, b && (E[0] ^= t[0], E[1] ^= t[1], E[2] ^= t[2], E[3] ^= t[3]), w = (t[3] & 1) !== 0, l = 3; l > 0; l--)
        t[l] = t[l] >>> 1 | (t[l - 1] & 1) << 31;
      t[0] = t[0] >>> 1, w && (t[0] = t[0] ^ 225 << 24);
    }
    this.state = q(E);
  }, C.prototype.update = function(t) {
    this.cache = I.concat([this.cache, t]);
    for (var E; this.cache.length >= 16; )
      E = this.cache.slice(0, 16), this.cache = this.cache.slice(16), this.ghash(E);
  }, C.prototype.final = function(t, E) {
    return this.cache.length && this.ghash(I.concat([this.cache, M], 16)), this.ghash(q([0, t, 0, E])), this.state;
  }, ghash = C, ghash;
}
var authCipher, hasRequiredAuthCipher;
function requireAuthCipher() {
  if (hasRequiredAuthCipher) return authCipher;
  hasRequiredAuthCipher = 1;
  var I = requireAes(), M = requireSafeBuffer$1().Buffer, T = requireCipherBase(), q = requireInherits_browser(), C = requireGhash(), t = requireBufferXor(), E = requireIncr32();
  function l(u, g) {
    var R = 0;
    u.length !== g.length && R++;
    for (var B = Math.min(u.length, g.length), k = 0; k < B; ++k)
      R += u[k] ^ g[k];
    return R;
  }
  function b(u, g, R) {
    if (g.length === 12)
      return u._finID = M.concat([g, M.from([0, 0, 0, 1])]), M.concat([g, M.from([0, 0, 0, 2])]);
    var B = new C(R), k = g.length, $ = k % 16;
    B.update(g), $ && ($ = 16 - $, B.update(M.alloc($, 0))), B.update(M.alloc(8, 0));
    var O = k * 8, D = M.alloc(8);
    D.writeUIntBE(O, 0, 8), B.update(D), u._finID = B.state;
    var N = M.from(u._finID);
    return E(N), N;
  }
  function w(u, g, R, B) {
    T.call(this);
    var k = M.alloc(4, 0);
    this._cipher = new I.AES(g);
    var $ = this._cipher.encryptBlock(k);
    this._ghash = new C($), R = b(this, R, $), this._prev = M.from(R), this._cache = M.allocUnsafe(0), this._secCache = M.allocUnsafe(0), this._decrypt = B, this._alen = 0, this._len = 0, this._mode = u, this._authTag = null, this._called = !1;
  }
  return q(w, T), w.prototype._update = function(u) {
    if (!this._called && this._alen) {
      var g = 16 - this._alen % 16;
      g < 16 && (g = M.alloc(g, 0), this._ghash.update(g));
    }
    this._called = !0;
    var R = this._mode.encrypt(this, u);
    return this._decrypt ? this._ghash.update(u) : this._ghash.update(R), this._len += u.length, R;
  }, w.prototype._final = function() {
    if (this._decrypt && !this._authTag) throw new Error("Unsupported state or unable to authenticate data");
    var u = t(this._ghash.final(this._alen * 8, this._len * 8), this._cipher.encryptBlock(this._finID));
    if (this._decrypt && l(u, this._authTag)) throw new Error("Unsupported state or unable to authenticate data");
    this._authTag = u, this._cipher.scrub();
  }, w.prototype.getAuthTag = function() {
    if (this._decrypt || !M.isBuffer(this._authTag)) throw new Error("Attempting to get auth tag in unsupported state");
    return this._authTag;
  }, w.prototype.setAuthTag = function(g) {
    if (!this._decrypt) throw new Error("Attempting to set auth tag in unsupported state");
    this._authTag = g;
  }, w.prototype.setAAD = function(g) {
    if (this._called) throw new Error("Attempting to set AAD in unsupported state");
    this._ghash.update(g), this._alen += g.length;
  }, authCipher = w, authCipher;
}
var streamCipher, hasRequiredStreamCipher;
function requireStreamCipher() {
  if (hasRequiredStreamCipher) return streamCipher;
  hasRequiredStreamCipher = 1;
  var I = requireAes(), M = requireSafeBuffer$1().Buffer, T = requireCipherBase(), q = requireInherits_browser();
  function C(t, E, l, b) {
    T.call(this), this._cipher = new I.AES(E), this._prev = M.from(l), this._cache = M.allocUnsafe(0), this._secCache = M.allocUnsafe(0), this._decrypt = b, this._mode = t;
  }
  return q(C, T), C.prototype._update = function(t) {
    return this._mode.encrypt(this, t, this._decrypt);
  }, C.prototype._final = function() {
    this._cipher.scrub();
  }, streamCipher = C, streamCipher;
}
var evp_bytestokey, hasRequiredEvp_bytestokey;
function requireEvp_bytestokey() {
  if (hasRequiredEvp_bytestokey) return evp_bytestokey;
  hasRequiredEvp_bytestokey = 1;
  var I = requireSafeBuffer$1().Buffer, M = requireMd5_js();
  function T(q, C, t, E) {
    if (I.isBuffer(q) || (q = I.from(q, "binary")), C && (I.isBuffer(C) || (C = I.from(C, "binary")), C.length !== 8))
      throw new RangeError("salt should be Buffer with 8 byte length");
    for (var l = t / 8, b = I.alloc(l), w = I.alloc(E || 0), u = I.alloc(0); l > 0 || E > 0; ) {
      var g = new M();
      g.update(u), g.update(q), C && g.update(C), u = g.digest();
      var R = 0;
      if (l > 0) {
        var B = b.length - l;
        R = Math.min(l, u.length), u.copy(b, B, 0, R), l -= R;
      }
      if (R < u.length && E > 0) {
        var k = w.length - E, $ = Math.min(E, u.length - R);
        u.copy(w, k, R, R + $), E -= $;
      }
    }
    return u.fill(0), { key: b, iv: w };
  }
  return evp_bytestokey = T, evp_bytestokey;
}
var hasRequiredEncrypter;
function requireEncrypter() {
  if (hasRequiredEncrypter) return encrypter;
  hasRequiredEncrypter = 1;
  var I = requireModes$1(), M = requireAuthCipher(), T = requireSafeBuffer$1().Buffer, q = requireStreamCipher(), C = requireCipherBase(), t = requireAes(), E = requireEvp_bytestokey(), l = requireInherits_browser();
  function b(B, k, $) {
    C.call(this), this._cache = new u(), this._cipher = new t.AES(k), this._prev = T.from($), this._mode = B, this._autopadding = !0;
  }
  l(b, C), b.prototype._update = function(B) {
    this._cache.add(B);
    for (var k, $, O = []; k = this._cache.get(); )
      $ = this._mode.encrypt(this, k), O.push($);
    return T.concat(O);
  };
  var w = T.alloc(16, 16);
  b.prototype._final = function() {
    var B = this._cache.flush();
    if (this._autopadding)
      return B = this._mode.encrypt(this, B), this._cipher.scrub(), B;
    if (!B.equals(w))
      throw this._cipher.scrub(), new Error("data not multiple of block length");
  }, b.prototype.setAutoPadding = function(B) {
    return this._autopadding = !!B, this;
  };
  function u() {
    this.cache = T.allocUnsafe(0);
  }
  u.prototype.add = function(B) {
    this.cache = T.concat([this.cache, B]);
  }, u.prototype.get = function() {
    if (this.cache.length > 15) {
      var B = this.cache.slice(0, 16);
      return this.cache = this.cache.slice(16), B;
    }
    return null;
  }, u.prototype.flush = function() {
    for (var B = 16 - this.cache.length, k = T.allocUnsafe(B), $ = -1; ++$ < B; )
      k.writeUInt8(B, $);
    return T.concat([this.cache, k]);
  };
  function g(B, k, $) {
    var O = I[B.toLowerCase()];
    if (!O) throw new TypeError("invalid suite type");
    if (typeof k == "string" && (k = T.from(k)), k.length !== O.key / 8) throw new TypeError("invalid key length " + k.length);
    if (typeof $ == "string" && ($ = T.from($)), O.mode !== "GCM" && $.length !== O.iv) throw new TypeError("invalid iv length " + $.length);
    return O.type === "stream" ? new q(O.module, k, $) : O.type === "auth" ? new M(O.module, k, $) : new b(O.module, k, $);
  }
  function R(B, k) {
    var $ = I[B.toLowerCase()];
    if (!$) throw new TypeError("invalid suite type");
    var O = E(k, !1, $.key, $.iv);
    return g(B, O.key, O.iv);
  }
  return encrypter.createCipheriv = g, encrypter.createCipher = R, encrypter;
}
var decrypter = {}, hasRequiredDecrypter;
function requireDecrypter() {
  if (hasRequiredDecrypter) return decrypter;
  hasRequiredDecrypter = 1;
  var I = requireAuthCipher(), M = requireSafeBuffer$1().Buffer, T = requireModes$1(), q = requireStreamCipher(), C = requireCipherBase(), t = requireAes(), E = requireEvp_bytestokey(), l = requireInherits_browser();
  function b(B, k, $) {
    C.call(this), this._cache = new w(), this._last = void 0, this._cipher = new t.AES(k), this._prev = M.from($), this._mode = B, this._autopadding = !0;
  }
  l(b, C), b.prototype._update = function(B) {
    this._cache.add(B);
    for (var k, $, O = []; k = this._cache.get(this._autopadding); )
      $ = this._mode.decrypt(this, k), O.push($);
    return M.concat(O);
  }, b.prototype._final = function() {
    var B = this._cache.flush();
    if (this._autopadding)
      return u(this._mode.decrypt(this, B));
    if (B)
      throw new Error("data not multiple of block length");
  }, b.prototype.setAutoPadding = function(B) {
    return this._autopadding = !!B, this;
  };
  function w() {
    this.cache = M.allocUnsafe(0);
  }
  w.prototype.add = function(B) {
    this.cache = M.concat([this.cache, B]);
  }, w.prototype.get = function(B) {
    var k;
    if (B) {
      if (this.cache.length > 16)
        return k = this.cache.slice(0, 16), this.cache = this.cache.slice(16), k;
    } else if (this.cache.length >= 16)
      return k = this.cache.slice(0, 16), this.cache = this.cache.slice(16), k;
    return null;
  }, w.prototype.flush = function() {
    if (this.cache.length) return this.cache;
  };
  function u(B) {
    var k = B[15];
    if (k < 1 || k > 16)
      throw new Error("unable to decrypt data");
    for (var $ = -1; ++$ < k; )
      if (B[$ + (16 - k)] !== k)
        throw new Error("unable to decrypt data");
    if (k !== 16)
      return B.slice(0, 16 - k);
  }
  function g(B, k, $) {
    var O = T[B.toLowerCase()];
    if (!O) throw new TypeError("invalid suite type");
    if (typeof $ == "string" && ($ = M.from($)), O.mode !== "GCM" && $.length !== O.iv) throw new TypeError("invalid iv length " + $.length);
    if (typeof k == "string" && (k = M.from(k)), k.length !== O.key / 8) throw new TypeError("invalid key length " + k.length);
    return O.type === "stream" ? new q(O.module, k, $, !0) : O.type === "auth" ? new I(O.module, k, $, !0) : new b(O.module, k, $);
  }
  function R(B, k) {
    var $ = T[B.toLowerCase()];
    if (!$) throw new TypeError("invalid suite type");
    var O = E(k, !1, $.key, $.iv);
    return g(B, O.key, O.iv);
  }
  return decrypter.createDecipher = R, decrypter.createDecipheriv = g, decrypter;
}
var hasRequiredBrowser$6;
function requireBrowser$6() {
  if (hasRequiredBrowser$6) return browser$5;
  hasRequiredBrowser$6 = 1;
  var I = requireEncrypter(), M = requireDecrypter(), T = require$$2;
  function q() {
    return Object.keys(T);
  }
  return browser$5.createCipher = browser$5.Cipher = I.createCipher, browser$5.createCipheriv = browser$5.Cipheriv = I.createCipheriv, browser$5.createDecipher = browser$5.Decipher = M.createDecipher, browser$5.createDecipheriv = browser$5.Decipheriv = M.createDecipheriv, browser$5.listCiphers = browser$5.getCiphers = q, browser$5;
}
var modes = {}, hasRequiredModes;
function requireModes() {
  return hasRequiredModes || (hasRequiredModes = 1, function(I) {
    I["des-ecb"] = {
      key: 8,
      iv: 0
    }, I["des-cbc"] = I.des = {
      key: 8,
      iv: 8
    }, I["des-ede3-cbc"] = I.des3 = {
      key: 24,
      iv: 8
    }, I["des-ede3"] = {
      key: 24,
      iv: 0
    }, I["des-ede-cbc"] = {
      key: 16,
      iv: 8
    }, I["des-ede"] = {
      key: 16,
      iv: 0
    };
  }(modes)), modes;
}
var hasRequiredBrowser$5;
function requireBrowser$5() {
  if (hasRequiredBrowser$5) return browser$6;
  hasRequiredBrowser$5 = 1;
  var I = requireBrowserifyDes(), M = requireBrowser$6(), T = requireModes$1(), q = requireModes(), C = requireEvp_bytestokey();
  function t(u, g) {
    u = u.toLowerCase();
    var R, B;
    if (T[u])
      R = T[u].key, B = T[u].iv;
    else if (q[u])
      R = q[u].key * 8, B = q[u].iv;
    else
      throw new TypeError("invalid suite type");
    var k = C(g, !1, R, B);
    return l(u, k.key, k.iv);
  }
  function E(u, g) {
    u = u.toLowerCase();
    var R, B;
    if (T[u])
      R = T[u].key, B = T[u].iv;
    else if (q[u])
      R = q[u].key * 8, B = q[u].iv;
    else
      throw new TypeError("invalid suite type");
    var k = C(g, !1, R, B);
    return b(u, k.key, k.iv);
  }
  function l(u, g, R) {
    if (u = u.toLowerCase(), T[u]) return M.createCipheriv(u, g, R);
    if (q[u]) return new I({ key: g, iv: R, mode: u });
    throw new TypeError("invalid suite type");
  }
  function b(u, g, R) {
    if (u = u.toLowerCase(), T[u]) return M.createDecipheriv(u, g, R);
    if (q[u]) return new I({ key: g, iv: R, mode: u, decrypt: !0 });
    throw new TypeError("invalid suite type");
  }
  function w() {
    return Object.keys(q).concat(M.getCiphers());
  }
  return browser$6.createCipher = browser$6.Cipher = t, browser$6.createCipheriv = browser$6.Cipheriv = l, browser$6.createDecipher = browser$6.Decipher = E, browser$6.createDecipheriv = browser$6.Decipheriv = b, browser$6.listCiphers = browser$6.getCiphers = w, browser$6;
}
var browser$4 = {}, bn$2 = { exports: {} };
bn$2.exports;
var hasRequiredBn$2;
function requireBn$2() {
  return hasRequiredBn$2 || (hasRequiredBn$2 = 1, function(I) {
    (function(M, T) {
      function q(H, A) {
        if (!H) throw new Error(A || "Assertion failed");
      }
      function C(H, A) {
        H.super_ = A;
        var c = function() {
        };
        c.prototype = A.prototype, H.prototype = new c(), H.prototype.constructor = H;
      }
      function t(H, A, c) {
        if (t.isBN(H))
          return H;
        this.negative = 0, this.words = null, this.length = 0, this.red = null, H !== null && ((A === "le" || A === "be") && (c = A, A = 10), this._init(H || 0, A || 10, c || "be"));
      }
      typeof M == "object" ? M.exports = t : T.BN = t, t.BN = t, t.wordSize = 26;
      var E;
      try {
        typeof window != "undefined" && typeof window.Buffer != "undefined" ? E = window.Buffer : E = requireBuffer$1().Buffer;
      } catch (H) {
      }
      t.isBN = function(A) {
        return A instanceof t ? !0 : A !== null && typeof A == "object" && A.constructor.wordSize === t.wordSize && Array.isArray(A.words);
      }, t.max = function(A, c) {
        return A.cmp(c) > 0 ? A : c;
      }, t.min = function(A, c) {
        return A.cmp(c) < 0 ? A : c;
      }, t.prototype._init = function(A, c, e) {
        if (typeof A == "number")
          return this._initNumber(A, c, e);
        if (typeof A == "object")
          return this._initArray(A, c, e);
        c === "hex" && (c = 16), q(c === (c | 0) && c >= 2 && c <= 36), A = A.toString().replace(/\s+/g, "");
        var a = 0;
        A[0] === "-" && (a++, this.negative = 1), a < A.length && (c === 16 ? this._parseHex(A, a, e) : (this._parseBase(A, c, a), e === "le" && this._initArray(this.toArray(), c, e)));
      }, t.prototype._initNumber = function(A, c, e) {
        A < 0 && (this.negative = 1, A = -A), A < 67108864 ? (this.words = [A & 67108863], this.length = 1) : A < 4503599627370496 ? (this.words = [
          A & 67108863,
          A / 67108864 & 67108863
        ], this.length = 2) : (q(A < 9007199254740992), this.words = [
          A & 67108863,
          A / 67108864 & 67108863,
          1
        ], this.length = 3), e === "le" && this._initArray(this.toArray(), c, e);
      }, t.prototype._initArray = function(A, c, e) {
        if (q(typeof A.length == "number"), A.length <= 0)
          return this.words = [0], this.length = 1, this;
        this.length = Math.ceil(A.length / 3), this.words = new Array(this.length);
        for (var a = 0; a < this.length; a++)
          this.words[a] = 0;
        var v, x, d = 0;
        if (e === "be")
          for (a = A.length - 1, v = 0; a >= 0; a -= 3)
            x = A[a] | A[a - 1] << 8 | A[a - 2] << 16, this.words[v] |= x << d & 67108863, this.words[v + 1] = x >>> 26 - d & 67108863, d += 24, d >= 26 && (d -= 26, v++);
        else if (e === "le")
          for (a = 0, v = 0; a < A.length; a += 3)
            x = A[a] | A[a + 1] << 8 | A[a + 2] << 16, this.words[v] |= x << d & 67108863, this.words[v + 1] = x >>> 26 - d & 67108863, d += 24, d >= 26 && (d -= 26, v++);
        return this.strip();
      };
      function l(H, A) {
        var c = H.charCodeAt(A);
        return c >= 65 && c <= 70 ? c - 55 : c >= 97 && c <= 102 ? c - 87 : c - 48 & 15;
      }
      function b(H, A, c) {
        var e = l(H, c);
        return c - 1 >= A && (e |= l(H, c - 1) << 4), e;
      }
      t.prototype._parseHex = function(A, c, e) {
        this.length = Math.ceil((A.length - c) / 6), this.words = new Array(this.length);
        for (var a = 0; a < this.length; a++)
          this.words[a] = 0;
        var v = 0, x = 0, d;
        if (e === "be")
          for (a = A.length - 1; a >= c; a -= 2)
            d = b(A, c, a) << v, this.words[x] |= d & 67108863, v >= 18 ? (v -= 18, x += 1, this.words[x] |= d >>> 26) : v += 8;
        else {
          var y = A.length - c;
          for (a = y % 2 === 0 ? c + 1 : c; a < A.length; a += 2)
            d = b(A, c, a) << v, this.words[x] |= d & 67108863, v >= 18 ? (v -= 18, x += 1, this.words[x] |= d >>> 26) : v += 8;
        }
        this.strip();
      };
      function w(H, A, c, e) {
        for (var a = 0, v = Math.min(H.length, c), x = A; x < v; x++) {
          var d = H.charCodeAt(x) - 48;
          a *= e, d >= 49 ? a += d - 49 + 10 : d >= 17 ? a += d - 17 + 10 : a += d;
        }
        return a;
      }
      t.prototype._parseBase = function(A, c, e) {
        this.words = [0], this.length = 1;
        for (var a = 0, v = 1; v <= 67108863; v *= c)
          a++;
        a--, v = v / c | 0;
        for (var x = A.length - e, d = x % a, y = Math.min(x, x - d) + e, p = 0, _ = e; _ < y; _ += a)
          p = w(A, _, _ + a, c), this.imuln(v), this.words[0] + p < 67108864 ? this.words[0] += p : this._iaddn(p);
        if (d !== 0) {
          var o = 1;
          for (p = w(A, _, A.length, c), _ = 0; _ < d; _++)
            o *= c;
          this.imuln(o), this.words[0] + p < 67108864 ? this.words[0] += p : this._iaddn(p);
        }
        this.strip();
      }, t.prototype.copy = function(A) {
        A.words = new Array(this.length);
        for (var c = 0; c < this.length; c++)
          A.words[c] = this.words[c];
        A.length = this.length, A.negative = this.negative, A.red = this.red;
      }, t.prototype.clone = function() {
        var A = new t(null);
        return this.copy(A), A;
      }, t.prototype._expand = function(A) {
        for (; this.length < A; )
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
      var u = [
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
      ], g = [
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
      ], R = [
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
      t.prototype.toString = function(A, c) {
        A = A || 10, c = c | 0 || 1;
        var e;
        if (A === 16 || A === "hex") {
          e = "";
          for (var a = 0, v = 0, x = 0; x < this.length; x++) {
            var d = this.words[x], y = ((d << a | v) & 16777215).toString(16);
            v = d >>> 24 - a & 16777215, v !== 0 || x !== this.length - 1 ? e = u[6 - y.length] + y + e : e = y + e, a += 2, a >= 26 && (a -= 26, x--);
          }
          for (v !== 0 && (e = v.toString(16) + e); e.length % c !== 0; )
            e = "0" + e;
          return this.negative !== 0 && (e = "-" + e), e;
        }
        if (A === (A | 0) && A >= 2 && A <= 36) {
          var p = g[A], _ = R[A];
          e = "";
          var o = this.clone();
          for (o.negative = 0; !o.isZero(); ) {
            var P = o.modn(_).toString(A);
            o = o.idivn(_), o.isZero() ? e = P + e : e = u[p - P.length] + P + e;
          }
          for (this.isZero() && (e = "0" + e); e.length % c !== 0; )
            e = "0" + e;
          return this.negative !== 0 && (e = "-" + e), e;
        }
        q(!1, "Base should be between 2 and 36");
      }, t.prototype.toNumber = function() {
        var A = this.words[0];
        return this.length === 2 ? A += this.words[1] * 67108864 : this.length === 3 && this.words[2] === 1 ? A += 4503599627370496 + this.words[1] * 67108864 : this.length > 2 && q(!1, "Number can only safely store up to 53 bits"), this.negative !== 0 ? -A : A;
      }, t.prototype.toJSON = function() {
        return this.toString(16);
      }, t.prototype.toBuffer = function(A, c) {
        return q(typeof E != "undefined"), this.toArrayLike(E, A, c);
      }, t.prototype.toArray = function(A, c) {
        return this.toArrayLike(Array, A, c);
      }, t.prototype.toArrayLike = function(A, c, e) {
        var a = this.byteLength(), v = e || Math.max(1, a);
        q(a <= v, "byte array longer than desired length"), q(v > 0, "Requested array length <= 0"), this.strip();
        var x = c === "le", d = new A(v), y, p, _ = this.clone();
        if (x) {
          for (p = 0; !_.isZero(); p++)
            y = _.andln(255), _.iushrn(8), d[p] = y;
          for (; p < v; p++)
            d[p] = 0;
        } else {
          for (p = 0; p < v - a; p++)
            d[p] = 0;
          for (p = 0; !_.isZero(); p++)
            y = _.andln(255), _.iushrn(8), d[v - p - 1] = y;
        }
        return d;
      }, Math.clz32 ? t.prototype._countBits = function(A) {
        return 32 - Math.clz32(A);
      } : t.prototype._countBits = function(A) {
        var c = A, e = 0;
        return c >= 4096 && (e += 13, c >>>= 13), c >= 64 && (e += 7, c >>>= 7), c >= 8 && (e += 4, c >>>= 4), c >= 2 && (e += 2, c >>>= 2), e + c;
      }, t.prototype._zeroBits = function(A) {
        if (A === 0) return 26;
        var c = A, e = 0;
        return c & 8191 || (e += 13, c >>>= 13), c & 127 || (e += 7, c >>>= 7), c & 15 || (e += 4, c >>>= 4), c & 3 || (e += 2, c >>>= 2), c & 1 || e++, e;
      }, t.prototype.bitLength = function() {
        var A = this.words[this.length - 1], c = this._countBits(A);
        return (this.length - 1) * 26 + c;
      };
      function B(H) {
        for (var A = new Array(H.bitLength()), c = 0; c < A.length; c++) {
          var e = c / 26 | 0, a = c % 26;
          A[c] = (H.words[e] & 1 << a) >>> a;
        }
        return A;
      }
      t.prototype.zeroBits = function() {
        if (this.isZero()) return 0;
        for (var A = 0, c = 0; c < this.length; c++) {
          var e = this._zeroBits(this.words[c]);
          if (A += e, e !== 26) break;
        }
        return A;
      }, t.prototype.byteLength = function() {
        return Math.ceil(this.bitLength() / 8);
      }, t.prototype.toTwos = function(A) {
        return this.negative !== 0 ? this.abs().inotn(A).iaddn(1) : this.clone();
      }, t.prototype.fromTwos = function(A) {
        return this.testn(A - 1) ? this.notn(A).iaddn(1).ineg() : this.clone();
      }, t.prototype.isNeg = function() {
        return this.negative !== 0;
      }, t.prototype.neg = function() {
        return this.clone().ineg();
      }, t.prototype.ineg = function() {
        return this.isZero() || (this.negative ^= 1), this;
      }, t.prototype.iuor = function(A) {
        for (; this.length < A.length; )
          this.words[this.length++] = 0;
        for (var c = 0; c < A.length; c++)
          this.words[c] = this.words[c] | A.words[c];
        return this.strip();
      }, t.prototype.ior = function(A) {
        return q((this.negative | A.negative) === 0), this.iuor(A);
      }, t.prototype.or = function(A) {
        return this.length > A.length ? this.clone().ior(A) : A.clone().ior(this);
      }, t.prototype.uor = function(A) {
        return this.length > A.length ? this.clone().iuor(A) : A.clone().iuor(this);
      }, t.prototype.iuand = function(A) {
        var c;
        this.length > A.length ? c = A : c = this;
        for (var e = 0; e < c.length; e++)
          this.words[e] = this.words[e] & A.words[e];
        return this.length = c.length, this.strip();
      }, t.prototype.iand = function(A) {
        return q((this.negative | A.negative) === 0), this.iuand(A);
      }, t.prototype.and = function(A) {
        return this.length > A.length ? this.clone().iand(A) : A.clone().iand(this);
      }, t.prototype.uand = function(A) {
        return this.length > A.length ? this.clone().iuand(A) : A.clone().iuand(this);
      }, t.prototype.iuxor = function(A) {
        var c, e;
        this.length > A.length ? (c = this, e = A) : (c = A, e = this);
        for (var a = 0; a < e.length; a++)
          this.words[a] = c.words[a] ^ e.words[a];
        if (this !== c)
          for (; a < c.length; a++)
            this.words[a] = c.words[a];
        return this.length = c.length, this.strip();
      }, t.prototype.ixor = function(A) {
        return q((this.negative | A.negative) === 0), this.iuxor(A);
      }, t.prototype.xor = function(A) {
        return this.length > A.length ? this.clone().ixor(A) : A.clone().ixor(this);
      }, t.prototype.uxor = function(A) {
        return this.length > A.length ? this.clone().iuxor(A) : A.clone().iuxor(this);
      }, t.prototype.inotn = function(A) {
        q(typeof A == "number" && A >= 0);
        var c = Math.ceil(A / 26) | 0, e = A % 26;
        this._expand(c), e > 0 && c--;
        for (var a = 0; a < c; a++)
          this.words[a] = ~this.words[a] & 67108863;
        return e > 0 && (this.words[a] = ~this.words[a] & 67108863 >> 26 - e), this.strip();
      }, t.prototype.notn = function(A) {
        return this.clone().inotn(A);
      }, t.prototype.setn = function(A, c) {
        q(typeof A == "number" && A >= 0);
        var e = A / 26 | 0, a = A % 26;
        return this._expand(e + 1), c ? this.words[e] = this.words[e] | 1 << a : this.words[e] = this.words[e] & ~(1 << a), this.strip();
      }, t.prototype.iadd = function(A) {
        var c;
        if (this.negative !== 0 && A.negative === 0)
          return this.negative = 0, c = this.isub(A), this.negative ^= 1, this._normSign();
        if (this.negative === 0 && A.negative !== 0)
          return A.negative = 0, c = this.isub(A), A.negative = 1, c._normSign();
        var e, a;
        this.length > A.length ? (e = this, a = A) : (e = A, a = this);
        for (var v = 0, x = 0; x < a.length; x++)
          c = (e.words[x] | 0) + (a.words[x] | 0) + v, this.words[x] = c & 67108863, v = c >>> 26;
        for (; v !== 0 && x < e.length; x++)
          c = (e.words[x] | 0) + v, this.words[x] = c & 67108863, v = c >>> 26;
        if (this.length = e.length, v !== 0)
          this.words[this.length] = v, this.length++;
        else if (e !== this)
          for (; x < e.length; x++)
            this.words[x] = e.words[x];
        return this;
      }, t.prototype.add = function(A) {
        var c;
        return A.negative !== 0 && this.negative === 0 ? (A.negative = 0, c = this.sub(A), A.negative ^= 1, c) : A.negative === 0 && this.negative !== 0 ? (this.negative = 0, c = A.sub(this), this.negative = 1, c) : this.length > A.length ? this.clone().iadd(A) : A.clone().iadd(this);
      }, t.prototype.isub = function(A) {
        if (A.negative !== 0) {
          A.negative = 0;
          var c = this.iadd(A);
          return A.negative = 1, c._normSign();
        } else if (this.negative !== 0)
          return this.negative = 0, this.iadd(A), this.negative = 1, this._normSign();
        var e = this.cmp(A);
        if (e === 0)
          return this.negative = 0, this.length = 1, this.words[0] = 0, this;
        var a, v;
        e > 0 ? (a = this, v = A) : (a = A, v = this);
        for (var x = 0, d = 0; d < v.length; d++)
          c = (a.words[d] | 0) - (v.words[d] | 0) + x, x = c >> 26, this.words[d] = c & 67108863;
        for (; x !== 0 && d < a.length; d++)
          c = (a.words[d] | 0) + x, x = c >> 26, this.words[d] = c & 67108863;
        if (x === 0 && d < a.length && a !== this)
          for (; d < a.length; d++)
            this.words[d] = a.words[d];
        return this.length = Math.max(this.length, d), a !== this && (this.negative = 1), this.strip();
      }, t.prototype.sub = function(A) {
        return this.clone().isub(A);
      };
      function k(H, A, c) {
        c.negative = A.negative ^ H.negative;
        var e = H.length + A.length | 0;
        c.length = e, e = e - 1 | 0;
        var a = H.words[0] | 0, v = A.words[0] | 0, x = a * v, d = x & 67108863, y = x / 67108864 | 0;
        c.words[0] = d;
        for (var p = 1; p < e; p++) {
          for (var _ = y >>> 26, o = y & 67108863, P = Math.min(p, A.length - 1), Z = Math.max(0, p - H.length + 1); Z <= P; Z++) {
            var ee = p - Z | 0;
            a = H.words[ee] | 0, v = A.words[Z] | 0, x = a * v + o, _ += x / 67108864 | 0, o = x & 67108863;
          }
          c.words[p] = o | 0, y = _ | 0;
        }
        return y !== 0 ? c.words[p] = y | 0 : c.length--, c.strip();
      }
      var $ = function(A, c, e) {
        var a = A.words, v = c.words, x = e.words, d = 0, y, p, _, o = a[0] | 0, P = o & 8191, Z = o >>> 13, ee = a[1] | 0, K = ee & 8191, L = ee >>> 13, j = a[2] | 0, re = j & 8191, ne = j >>> 13, J = a[3] | 0, G = J & 8191, se = J >>> 13, ue = a[4] | 0, de = ue & 8191, Y = ue >>> 13, F = a[5] | 0, U = F & 8191, V = F >>> 13, ie = a[6] | 0, oe = ie & 8191, he = ie >>> 13, ve = a[7] | 0, le = ve & 8191, ye = ve >>> 13, be = a[8] | 0, pe = be & 8191, He = be >>> 13, Ie = a[9] | 0, me = Ie & 8191, ze = Ie >>> 13, Pe = v[0] | 0, ge = Pe & 8191, We = Pe >>> 13, Ce = v[1] | 0, we = Ce & 8191, Ke = Ce >>> 13, $e = v[2] | 0, xe = $e & 8191, Ge = $e >>> 13, De = v[3] | 0, _e = De & 8191, Ve = De >>> 13, Oe = v[4] | 0, Me = Oe & 8191, Je = Oe >>> 13, Le = v[5] | 0, Se = Le & 8191, Ze = Le >>> 13, Fe = v[6] | 0, qe = Fe & 8191, Xe = Fe >>> 13, Ne = v[7] | 0, Ee = Ne & 8191, Ye = Ne >>> 13, Ue = v[8] | 0, Re = Ue & 8191, Qe = Ue >>> 13, je = v[9] | 0, Ae = je & 8191, er = je >>> 13;
        e.negative = A.negative ^ c.negative, e.length = 19, y = Math.imul(P, ge), p = Math.imul(P, We), p = p + Math.imul(Z, ge) | 0, _ = Math.imul(Z, We);
        var Te = (d + y | 0) + ((p & 8191) << 13) | 0;
        d = (_ + (p >>> 13) | 0) + (Te >>> 26) | 0, Te &= 67108863, y = Math.imul(K, ge), p = Math.imul(K, We), p = p + Math.imul(L, ge) | 0, _ = Math.imul(L, We), y = y + Math.imul(P, we) | 0, p = p + Math.imul(P, Ke) | 0, p = p + Math.imul(Z, we) | 0, _ = _ + Math.imul(Z, Ke) | 0;
        var ke = (d + y | 0) + ((p & 8191) << 13) | 0;
        d = (_ + (p >>> 13) | 0) + (ke >>> 26) | 0, ke &= 67108863, y = Math.imul(re, ge), p = Math.imul(re, We), p = p + Math.imul(ne, ge) | 0, _ = Math.imul(ne, We), y = y + Math.imul(K, we) | 0, p = p + Math.imul(K, Ke) | 0, p = p + Math.imul(L, we) | 0, _ = _ + Math.imul(L, Ke) | 0, y = y + Math.imul(P, xe) | 0, p = p + Math.imul(P, Ge) | 0, p = p + Math.imul(Z, xe) | 0, _ = _ + Math.imul(Z, Ge) | 0;
        var rr = (d + y | 0) + ((p & 8191) << 13) | 0;
        d = (_ + (p >>> 13) | 0) + (rr >>> 26) | 0, rr &= 67108863, y = Math.imul(G, ge), p = Math.imul(G, We), p = p + Math.imul(se, ge) | 0, _ = Math.imul(se, We), y = y + Math.imul(re, we) | 0, p = p + Math.imul(re, Ke) | 0, p = p + Math.imul(ne, we) | 0, _ = _ + Math.imul(ne, Ke) | 0, y = y + Math.imul(K, xe) | 0, p = p + Math.imul(K, Ge) | 0, p = p + Math.imul(L, xe) | 0, _ = _ + Math.imul(L, Ge) | 0, y = y + Math.imul(P, _e) | 0, p = p + Math.imul(P, Ve) | 0, p = p + Math.imul(Z, _e) | 0, _ = _ + Math.imul(Z, Ve) | 0;
        var tr = (d + y | 0) + ((p & 8191) << 13) | 0;
        d = (_ + (p >>> 13) | 0) + (tr >>> 26) | 0, tr &= 67108863, y = Math.imul(de, ge), p = Math.imul(de, We), p = p + Math.imul(Y, ge) | 0, _ = Math.imul(Y, We), y = y + Math.imul(G, we) | 0, p = p + Math.imul(G, Ke) | 0, p = p + Math.imul(se, we) | 0, _ = _ + Math.imul(se, Ke) | 0, y = y + Math.imul(re, xe) | 0, p = p + Math.imul(re, Ge) | 0, p = p + Math.imul(ne, xe) | 0, _ = _ + Math.imul(ne, Ge) | 0, y = y + Math.imul(K, _e) | 0, p = p + Math.imul(K, Ve) | 0, p = p + Math.imul(L, _e) | 0, _ = _ + Math.imul(L, Ve) | 0, y = y + Math.imul(P, Me) | 0, p = p + Math.imul(P, Je) | 0, p = p + Math.imul(Z, Me) | 0, _ = _ + Math.imul(Z, Je) | 0;
        var ir = (d + y | 0) + ((p & 8191) << 13) | 0;
        d = (_ + (p >>> 13) | 0) + (ir >>> 26) | 0, ir &= 67108863, y = Math.imul(U, ge), p = Math.imul(U, We), p = p + Math.imul(V, ge) | 0, _ = Math.imul(V, We), y = y + Math.imul(de, we) | 0, p = p + Math.imul(de, Ke) | 0, p = p + Math.imul(Y, we) | 0, _ = _ + Math.imul(Y, Ke) | 0, y = y + Math.imul(G, xe) | 0, p = p + Math.imul(G, Ge) | 0, p = p + Math.imul(se, xe) | 0, _ = _ + Math.imul(se, Ge) | 0, y = y + Math.imul(re, _e) | 0, p = p + Math.imul(re, Ve) | 0, p = p + Math.imul(ne, _e) | 0, _ = _ + Math.imul(ne, Ve) | 0, y = y + Math.imul(K, Me) | 0, p = p + Math.imul(K, Je) | 0, p = p + Math.imul(L, Me) | 0, _ = _ + Math.imul(L, Je) | 0, y = y + Math.imul(P, Se) | 0, p = p + Math.imul(P, Ze) | 0, p = p + Math.imul(Z, Se) | 0, _ = _ + Math.imul(Z, Ze) | 0;
        var nr = (d + y | 0) + ((p & 8191) << 13) | 0;
        d = (_ + (p >>> 13) | 0) + (nr >>> 26) | 0, nr &= 67108863, y = Math.imul(oe, ge), p = Math.imul(oe, We), p = p + Math.imul(he, ge) | 0, _ = Math.imul(he, We), y = y + Math.imul(U, we) | 0, p = p + Math.imul(U, Ke) | 0, p = p + Math.imul(V, we) | 0, _ = _ + Math.imul(V, Ke) | 0, y = y + Math.imul(de, xe) | 0, p = p + Math.imul(de, Ge) | 0, p = p + Math.imul(Y, xe) | 0, _ = _ + Math.imul(Y, Ge) | 0, y = y + Math.imul(G, _e) | 0, p = p + Math.imul(G, Ve) | 0, p = p + Math.imul(se, _e) | 0, _ = _ + Math.imul(se, Ve) | 0, y = y + Math.imul(re, Me) | 0, p = p + Math.imul(re, Je) | 0, p = p + Math.imul(ne, Me) | 0, _ = _ + Math.imul(ne, Je) | 0, y = y + Math.imul(K, Se) | 0, p = p + Math.imul(K, Ze) | 0, p = p + Math.imul(L, Se) | 0, _ = _ + Math.imul(L, Ze) | 0, y = y + Math.imul(P, qe) | 0, p = p + Math.imul(P, Xe) | 0, p = p + Math.imul(Z, qe) | 0, _ = _ + Math.imul(Z, Xe) | 0;
        var ar = (d + y | 0) + ((p & 8191) << 13) | 0;
        d = (_ + (p >>> 13) | 0) + (ar >>> 26) | 0, ar &= 67108863, y = Math.imul(le, ge), p = Math.imul(le, We), p = p + Math.imul(ye, ge) | 0, _ = Math.imul(ye, We), y = y + Math.imul(oe, we) | 0, p = p + Math.imul(oe, Ke) | 0, p = p + Math.imul(he, we) | 0, _ = _ + Math.imul(he, Ke) | 0, y = y + Math.imul(U, xe) | 0, p = p + Math.imul(U, Ge) | 0, p = p + Math.imul(V, xe) | 0, _ = _ + Math.imul(V, Ge) | 0, y = y + Math.imul(de, _e) | 0, p = p + Math.imul(de, Ve) | 0, p = p + Math.imul(Y, _e) | 0, _ = _ + Math.imul(Y, Ve) | 0, y = y + Math.imul(G, Me) | 0, p = p + Math.imul(G, Je) | 0, p = p + Math.imul(se, Me) | 0, _ = _ + Math.imul(se, Je) | 0, y = y + Math.imul(re, Se) | 0, p = p + Math.imul(re, Ze) | 0, p = p + Math.imul(ne, Se) | 0, _ = _ + Math.imul(ne, Ze) | 0, y = y + Math.imul(K, qe) | 0, p = p + Math.imul(K, Xe) | 0, p = p + Math.imul(L, qe) | 0, _ = _ + Math.imul(L, Xe) | 0, y = y + Math.imul(P, Ee) | 0, p = p + Math.imul(P, Ye) | 0, p = p + Math.imul(Z, Ee) | 0, _ = _ + Math.imul(Z, Ye) | 0;
        var fr = (d + y | 0) + ((p & 8191) << 13) | 0;
        d = (_ + (p >>> 13) | 0) + (fr >>> 26) | 0, fr &= 67108863, y = Math.imul(pe, ge), p = Math.imul(pe, We), p = p + Math.imul(He, ge) | 0, _ = Math.imul(He, We), y = y + Math.imul(le, we) | 0, p = p + Math.imul(le, Ke) | 0, p = p + Math.imul(ye, we) | 0, _ = _ + Math.imul(ye, Ke) | 0, y = y + Math.imul(oe, xe) | 0, p = p + Math.imul(oe, Ge) | 0, p = p + Math.imul(he, xe) | 0, _ = _ + Math.imul(he, Ge) | 0, y = y + Math.imul(U, _e) | 0, p = p + Math.imul(U, Ve) | 0, p = p + Math.imul(V, _e) | 0, _ = _ + Math.imul(V, Ve) | 0, y = y + Math.imul(de, Me) | 0, p = p + Math.imul(de, Je) | 0, p = p + Math.imul(Y, Me) | 0, _ = _ + Math.imul(Y, Je) | 0, y = y + Math.imul(G, Se) | 0, p = p + Math.imul(G, Ze) | 0, p = p + Math.imul(se, Se) | 0, _ = _ + Math.imul(se, Ze) | 0, y = y + Math.imul(re, qe) | 0, p = p + Math.imul(re, Xe) | 0, p = p + Math.imul(ne, qe) | 0, _ = _ + Math.imul(ne, Xe) | 0, y = y + Math.imul(K, Ee) | 0, p = p + Math.imul(K, Ye) | 0, p = p + Math.imul(L, Ee) | 0, _ = _ + Math.imul(L, Ye) | 0, y = y + Math.imul(P, Re) | 0, p = p + Math.imul(P, Qe) | 0, p = p + Math.imul(Z, Re) | 0, _ = _ + Math.imul(Z, Qe) | 0;
        var sr = (d + y | 0) + ((p & 8191) << 13) | 0;
        d = (_ + (p >>> 13) | 0) + (sr >>> 26) | 0, sr &= 67108863, y = Math.imul(me, ge), p = Math.imul(me, We), p = p + Math.imul(ze, ge) | 0, _ = Math.imul(ze, We), y = y + Math.imul(pe, we) | 0, p = p + Math.imul(pe, Ke) | 0, p = p + Math.imul(He, we) | 0, _ = _ + Math.imul(He, Ke) | 0, y = y + Math.imul(le, xe) | 0, p = p + Math.imul(le, Ge) | 0, p = p + Math.imul(ye, xe) | 0, _ = _ + Math.imul(ye, Ge) | 0, y = y + Math.imul(oe, _e) | 0, p = p + Math.imul(oe, Ve) | 0, p = p + Math.imul(he, _e) | 0, _ = _ + Math.imul(he, Ve) | 0, y = y + Math.imul(U, Me) | 0, p = p + Math.imul(U, Je) | 0, p = p + Math.imul(V, Me) | 0, _ = _ + Math.imul(V, Je) | 0, y = y + Math.imul(de, Se) | 0, p = p + Math.imul(de, Ze) | 0, p = p + Math.imul(Y, Se) | 0, _ = _ + Math.imul(Y, Ze) | 0, y = y + Math.imul(G, qe) | 0, p = p + Math.imul(G, Xe) | 0, p = p + Math.imul(se, qe) | 0, _ = _ + Math.imul(se, Xe) | 0, y = y + Math.imul(re, Ee) | 0, p = p + Math.imul(re, Ye) | 0, p = p + Math.imul(ne, Ee) | 0, _ = _ + Math.imul(ne, Ye) | 0, y = y + Math.imul(K, Re) | 0, p = p + Math.imul(K, Qe) | 0, p = p + Math.imul(L, Re) | 0, _ = _ + Math.imul(L, Qe) | 0, y = y + Math.imul(P, Ae) | 0, p = p + Math.imul(P, er) | 0, p = p + Math.imul(Z, Ae) | 0, _ = _ + Math.imul(Z, er) | 0;
        var or = (d + y | 0) + ((p & 8191) << 13) | 0;
        d = (_ + (p >>> 13) | 0) + (or >>> 26) | 0, or &= 67108863, y = Math.imul(me, we), p = Math.imul(me, Ke), p = p + Math.imul(ze, we) | 0, _ = Math.imul(ze, Ke), y = y + Math.imul(pe, xe) | 0, p = p + Math.imul(pe, Ge) | 0, p = p + Math.imul(He, xe) | 0, _ = _ + Math.imul(He, Ge) | 0, y = y + Math.imul(le, _e) | 0, p = p + Math.imul(le, Ve) | 0, p = p + Math.imul(ye, _e) | 0, _ = _ + Math.imul(ye, Ve) | 0, y = y + Math.imul(oe, Me) | 0, p = p + Math.imul(oe, Je) | 0, p = p + Math.imul(he, Me) | 0, _ = _ + Math.imul(he, Je) | 0, y = y + Math.imul(U, Se) | 0, p = p + Math.imul(U, Ze) | 0, p = p + Math.imul(V, Se) | 0, _ = _ + Math.imul(V, Ze) | 0, y = y + Math.imul(de, qe) | 0, p = p + Math.imul(de, Xe) | 0, p = p + Math.imul(Y, qe) | 0, _ = _ + Math.imul(Y, Xe) | 0, y = y + Math.imul(G, Ee) | 0, p = p + Math.imul(G, Ye) | 0, p = p + Math.imul(se, Ee) | 0, _ = _ + Math.imul(se, Ye) | 0, y = y + Math.imul(re, Re) | 0, p = p + Math.imul(re, Qe) | 0, p = p + Math.imul(ne, Re) | 0, _ = _ + Math.imul(ne, Qe) | 0, y = y + Math.imul(K, Ae) | 0, p = p + Math.imul(K, er) | 0, p = p + Math.imul(L, Ae) | 0, _ = _ + Math.imul(L, er) | 0;
        var ur = (d + y | 0) + ((p & 8191) << 13) | 0;
        d = (_ + (p >>> 13) | 0) + (ur >>> 26) | 0, ur &= 67108863, y = Math.imul(me, xe), p = Math.imul(me, Ge), p = p + Math.imul(ze, xe) | 0, _ = Math.imul(ze, Ge), y = y + Math.imul(pe, _e) | 0, p = p + Math.imul(pe, Ve) | 0, p = p + Math.imul(He, _e) | 0, _ = _ + Math.imul(He, Ve) | 0, y = y + Math.imul(le, Me) | 0, p = p + Math.imul(le, Je) | 0, p = p + Math.imul(ye, Me) | 0, _ = _ + Math.imul(ye, Je) | 0, y = y + Math.imul(oe, Se) | 0, p = p + Math.imul(oe, Ze) | 0, p = p + Math.imul(he, Se) | 0, _ = _ + Math.imul(he, Ze) | 0, y = y + Math.imul(U, qe) | 0, p = p + Math.imul(U, Xe) | 0, p = p + Math.imul(V, qe) | 0, _ = _ + Math.imul(V, Xe) | 0, y = y + Math.imul(de, Ee) | 0, p = p + Math.imul(de, Ye) | 0, p = p + Math.imul(Y, Ee) | 0, _ = _ + Math.imul(Y, Ye) | 0, y = y + Math.imul(G, Re) | 0, p = p + Math.imul(G, Qe) | 0, p = p + Math.imul(se, Re) | 0, _ = _ + Math.imul(se, Qe) | 0, y = y + Math.imul(re, Ae) | 0, p = p + Math.imul(re, er) | 0, p = p + Math.imul(ne, Ae) | 0, _ = _ + Math.imul(ne, er) | 0;
        var hr = (d + y | 0) + ((p & 8191) << 13) | 0;
        d = (_ + (p >>> 13) | 0) + (hr >>> 26) | 0, hr &= 67108863, y = Math.imul(me, _e), p = Math.imul(me, Ve), p = p + Math.imul(ze, _e) | 0, _ = Math.imul(ze, Ve), y = y + Math.imul(pe, Me) | 0, p = p + Math.imul(pe, Je) | 0, p = p + Math.imul(He, Me) | 0, _ = _ + Math.imul(He, Je) | 0, y = y + Math.imul(le, Se) | 0, p = p + Math.imul(le, Ze) | 0, p = p + Math.imul(ye, Se) | 0, _ = _ + Math.imul(ye, Ze) | 0, y = y + Math.imul(oe, qe) | 0, p = p + Math.imul(oe, Xe) | 0, p = p + Math.imul(he, qe) | 0, _ = _ + Math.imul(he, Xe) | 0, y = y + Math.imul(U, Ee) | 0, p = p + Math.imul(U, Ye) | 0, p = p + Math.imul(V, Ee) | 0, _ = _ + Math.imul(V, Ye) | 0, y = y + Math.imul(de, Re) | 0, p = p + Math.imul(de, Qe) | 0, p = p + Math.imul(Y, Re) | 0, _ = _ + Math.imul(Y, Qe) | 0, y = y + Math.imul(G, Ae) | 0, p = p + Math.imul(G, er) | 0, p = p + Math.imul(se, Ae) | 0, _ = _ + Math.imul(se, er) | 0;
        var cr = (d + y | 0) + ((p & 8191) << 13) | 0;
        d = (_ + (p >>> 13) | 0) + (cr >>> 26) | 0, cr &= 67108863, y = Math.imul(me, Me), p = Math.imul(me, Je), p = p + Math.imul(ze, Me) | 0, _ = Math.imul(ze, Je), y = y + Math.imul(pe, Se) | 0, p = p + Math.imul(pe, Ze) | 0, p = p + Math.imul(He, Se) | 0, _ = _ + Math.imul(He, Ze) | 0, y = y + Math.imul(le, qe) | 0, p = p + Math.imul(le, Xe) | 0, p = p + Math.imul(ye, qe) | 0, _ = _ + Math.imul(ye, Xe) | 0, y = y + Math.imul(oe, Ee) | 0, p = p + Math.imul(oe, Ye) | 0, p = p + Math.imul(he, Ee) | 0, _ = _ + Math.imul(he, Ye) | 0, y = y + Math.imul(U, Re) | 0, p = p + Math.imul(U, Qe) | 0, p = p + Math.imul(V, Re) | 0, _ = _ + Math.imul(V, Qe) | 0, y = y + Math.imul(de, Ae) | 0, p = p + Math.imul(de, er) | 0, p = p + Math.imul(Y, Ae) | 0, _ = _ + Math.imul(Y, er) | 0;
        var dr = (d + y | 0) + ((p & 8191) << 13) | 0;
        d = (_ + (p >>> 13) | 0) + (dr >>> 26) | 0, dr &= 67108863, y = Math.imul(me, Se), p = Math.imul(me, Ze), p = p + Math.imul(ze, Se) | 0, _ = Math.imul(ze, Ze), y = y + Math.imul(pe, qe) | 0, p = p + Math.imul(pe, Xe) | 0, p = p + Math.imul(He, qe) | 0, _ = _ + Math.imul(He, Xe) | 0, y = y + Math.imul(le, Ee) | 0, p = p + Math.imul(le, Ye) | 0, p = p + Math.imul(ye, Ee) | 0, _ = _ + Math.imul(ye, Ye) | 0, y = y + Math.imul(oe, Re) | 0, p = p + Math.imul(oe, Qe) | 0, p = p + Math.imul(he, Re) | 0, _ = _ + Math.imul(he, Qe) | 0, y = y + Math.imul(U, Ae) | 0, p = p + Math.imul(U, er) | 0, p = p + Math.imul(V, Ae) | 0, _ = _ + Math.imul(V, er) | 0;
        var lr = (d + y | 0) + ((p & 8191) << 13) | 0;
        d = (_ + (p >>> 13) | 0) + (lr >>> 26) | 0, lr &= 67108863, y = Math.imul(me, qe), p = Math.imul(me, Xe), p = p + Math.imul(ze, qe) | 0, _ = Math.imul(ze, Xe), y = y + Math.imul(pe, Ee) | 0, p = p + Math.imul(pe, Ye) | 0, p = p + Math.imul(He, Ee) | 0, _ = _ + Math.imul(He, Ye) | 0, y = y + Math.imul(le, Re) | 0, p = p + Math.imul(le, Qe) | 0, p = p + Math.imul(ye, Re) | 0, _ = _ + Math.imul(ye, Qe) | 0, y = y + Math.imul(oe, Ae) | 0, p = p + Math.imul(oe, er) | 0, p = p + Math.imul(he, Ae) | 0, _ = _ + Math.imul(he, er) | 0;
        var pr = (d + y | 0) + ((p & 8191) << 13) | 0;
        d = (_ + (p >>> 13) | 0) + (pr >>> 26) | 0, pr &= 67108863, y = Math.imul(me, Ee), p = Math.imul(me, Ye), p = p + Math.imul(ze, Ee) | 0, _ = Math.imul(ze, Ye), y = y + Math.imul(pe, Re) | 0, p = p + Math.imul(pe, Qe) | 0, p = p + Math.imul(He, Re) | 0, _ = _ + Math.imul(He, Qe) | 0, y = y + Math.imul(le, Ae) | 0, p = p + Math.imul(le, er) | 0, p = p + Math.imul(ye, Ae) | 0, _ = _ + Math.imul(ye, er) | 0;
        var vr = (d + y | 0) + ((p & 8191) << 13) | 0;
        d = (_ + (p >>> 13) | 0) + (vr >>> 26) | 0, vr &= 67108863, y = Math.imul(me, Re), p = Math.imul(me, Qe), p = p + Math.imul(ze, Re) | 0, _ = Math.imul(ze, Qe), y = y + Math.imul(pe, Ae) | 0, p = p + Math.imul(pe, er) | 0, p = p + Math.imul(He, Ae) | 0, _ = _ + Math.imul(He, er) | 0;
        var br = (d + y | 0) + ((p & 8191) << 13) | 0;
        d = (_ + (p >>> 13) | 0) + (br >>> 26) | 0, br &= 67108863, y = Math.imul(me, Ae), p = Math.imul(me, er), p = p + Math.imul(ze, Ae) | 0, _ = Math.imul(ze, er);
        var yr = (d + y | 0) + ((p & 8191) << 13) | 0;
        return d = (_ + (p >>> 13) | 0) + (yr >>> 26) | 0, yr &= 67108863, x[0] = Te, x[1] = ke, x[2] = rr, x[3] = tr, x[4] = ir, x[5] = nr, x[6] = ar, x[7] = fr, x[8] = sr, x[9] = or, x[10] = ur, x[11] = hr, x[12] = cr, x[13] = dr, x[14] = lr, x[15] = pr, x[16] = vr, x[17] = br, x[18] = yr, d !== 0 && (x[19] = d, e.length++), e;
      };
      Math.imul || ($ = k);
      function O(H, A, c) {
        c.negative = A.negative ^ H.negative, c.length = H.length + A.length;
        for (var e = 0, a = 0, v = 0; v < c.length - 1; v++) {
          var x = a;
          a = 0;
          for (var d = e & 67108863, y = Math.min(v, A.length - 1), p = Math.max(0, v - H.length + 1); p <= y; p++) {
            var _ = v - p, o = H.words[_] | 0, P = A.words[p] | 0, Z = o * P, ee = Z & 67108863;
            x = x + (Z / 67108864 | 0) | 0, ee = ee + d | 0, d = ee & 67108863, x = x + (ee >>> 26) | 0, a += x >>> 26, x &= 67108863;
          }
          c.words[v] = d, e = x, x = a;
        }
        return e !== 0 ? c.words[v] = e : c.length--, c.strip();
      }
      function D(H, A, c) {
        var e = new N();
        return e.mulp(H, A, c);
      }
      t.prototype.mulTo = function(A, c) {
        var e, a = this.length + A.length;
        return this.length === 10 && A.length === 10 ? e = $(this, A, c) : a < 63 ? e = k(this, A, c) : a < 1024 ? e = O(this, A, c) : e = D(this, A, c), e;
      };
      function N(H, A) {
        this.x = H, this.y = A;
      }
      N.prototype.makeRBT = function(A) {
        for (var c = new Array(A), e = t.prototype._countBits(A) - 1, a = 0; a < A; a++)
          c[a] = this.revBin(a, e, A);
        return c;
      }, N.prototype.revBin = function(A, c, e) {
        if (A === 0 || A === e - 1) return A;
        for (var a = 0, v = 0; v < c; v++)
          a |= (A & 1) << c - v - 1, A >>= 1;
        return a;
      }, N.prototype.permute = function(A, c, e, a, v, x) {
        for (var d = 0; d < x; d++)
          a[d] = c[A[d]], v[d] = e[A[d]];
      }, N.prototype.transform = function(A, c, e, a, v, x) {
        this.permute(x, A, c, e, a, v);
        for (var d = 1; d < v; d <<= 1)
          for (var y = d << 1, p = Math.cos(2 * Math.PI / y), _ = Math.sin(2 * Math.PI / y), o = 0; o < v; o += y)
            for (var P = p, Z = _, ee = 0; ee < d; ee++) {
              var K = e[o + ee], L = a[o + ee], j = e[o + ee + d], re = a[o + ee + d], ne = P * j - Z * re;
              re = P * re + Z * j, j = ne, e[o + ee] = K + j, a[o + ee] = L + re, e[o + ee + d] = K - j, a[o + ee + d] = L - re, ee !== y && (ne = p * P - _ * Z, Z = p * Z + _ * P, P = ne);
            }
      }, N.prototype.guessLen13b = function(A, c) {
        var e = Math.max(c, A) | 1, a = e & 1, v = 0;
        for (e = e / 2 | 0; e; e = e >>> 1)
          v++;
        return 1 << v + 1 + a;
      }, N.prototype.conjugate = function(A, c, e) {
        if (!(e <= 1))
          for (var a = 0; a < e / 2; a++) {
            var v = A[a];
            A[a] = A[e - a - 1], A[e - a - 1] = v, v = c[a], c[a] = -c[e - a - 1], c[e - a - 1] = -v;
          }
      }, N.prototype.normalize13b = function(A, c) {
        for (var e = 0, a = 0; a < c / 2; a++) {
          var v = Math.round(A[2 * a + 1] / c) * 8192 + Math.round(A[2 * a] / c) + e;
          A[a] = v & 67108863, v < 67108864 ? e = 0 : e = v / 67108864 | 0;
        }
        return A;
      }, N.prototype.convert13b = function(A, c, e, a) {
        for (var v = 0, x = 0; x < c; x++)
          v = v + (A[x] | 0), e[2 * x] = v & 8191, v = v >>> 13, e[2 * x + 1] = v & 8191, v = v >>> 13;
        for (x = 2 * c; x < a; ++x)
          e[x] = 0;
        q(v === 0), q((v & -8192) === 0);
      }, N.prototype.stub = function(A) {
        for (var c = new Array(A), e = 0; e < A; e++)
          c[e] = 0;
        return c;
      }, N.prototype.mulp = function(A, c, e) {
        var a = 2 * this.guessLen13b(A.length, c.length), v = this.makeRBT(a), x = this.stub(a), d = new Array(a), y = new Array(a), p = new Array(a), _ = new Array(a), o = new Array(a), P = new Array(a), Z = e.words;
        Z.length = a, this.convert13b(A.words, A.length, d, a), this.convert13b(c.words, c.length, _, a), this.transform(d, x, y, p, a, v), this.transform(_, x, o, P, a, v);
        for (var ee = 0; ee < a; ee++) {
          var K = y[ee] * o[ee] - p[ee] * P[ee];
          p[ee] = y[ee] * P[ee] + p[ee] * o[ee], y[ee] = K;
        }
        return this.conjugate(y, p, a), this.transform(y, p, Z, x, a, v), this.conjugate(Z, x, a), this.normalize13b(Z, a), e.negative = A.negative ^ c.negative, e.length = A.length + c.length, e.strip();
      }, t.prototype.mul = function(A) {
        var c = new t(null);
        return c.words = new Array(this.length + A.length), this.mulTo(A, c);
      }, t.prototype.mulf = function(A) {
        var c = new t(null);
        return c.words = new Array(this.length + A.length), D(this, A, c);
      }, t.prototype.imul = function(A) {
        return this.clone().mulTo(A, this);
      }, t.prototype.imuln = function(A) {
        q(typeof A == "number"), q(A < 67108864);
        for (var c = 0, e = 0; e < this.length; e++) {
          var a = (this.words[e] | 0) * A, v = (a & 67108863) + (c & 67108863);
          c >>= 26, c += a / 67108864 | 0, c += v >>> 26, this.words[e] = v & 67108863;
        }
        return c !== 0 && (this.words[e] = c, this.length++), this;
      }, t.prototype.muln = function(A) {
        return this.clone().imuln(A);
      }, t.prototype.sqr = function() {
        return this.mul(this);
      }, t.prototype.isqr = function() {
        return this.imul(this.clone());
      }, t.prototype.pow = function(A) {
        var c = B(A);
        if (c.length === 0) return new t(1);
        for (var e = this, a = 0; a < c.length && c[a] === 0; a++, e = e.sqr())
          ;
        if (++a < c.length)
          for (var v = e.sqr(); a < c.length; a++, v = v.sqr())
            c[a] !== 0 && (e = e.mul(v));
        return e;
      }, t.prototype.iushln = function(A) {
        q(typeof A == "number" && A >= 0);
        var c = A % 26, e = (A - c) / 26, a = 67108863 >>> 26 - c << 26 - c, v;
        if (c !== 0) {
          var x = 0;
          for (v = 0; v < this.length; v++) {
            var d = this.words[v] & a, y = (this.words[v] | 0) - d << c;
            this.words[v] = y | x, x = d >>> 26 - c;
          }
          x && (this.words[v] = x, this.length++);
        }
        if (e !== 0) {
          for (v = this.length - 1; v >= 0; v--)
            this.words[v + e] = this.words[v];
          for (v = 0; v < e; v++)
            this.words[v] = 0;
          this.length += e;
        }
        return this.strip();
      }, t.prototype.ishln = function(A) {
        return q(this.negative === 0), this.iushln(A);
      }, t.prototype.iushrn = function(A, c, e) {
        q(typeof A == "number" && A >= 0);
        var a;
        c ? a = (c - c % 26) / 26 : a = 0;
        var v = A % 26, x = Math.min((A - v) / 26, this.length), d = 67108863 ^ 67108863 >>> v << v, y = e;
        if (a -= x, a = Math.max(0, a), y) {
          for (var p = 0; p < x; p++)
            y.words[p] = this.words[p];
          y.length = x;
        }
        if (x !== 0) if (this.length > x)
          for (this.length -= x, p = 0; p < this.length; p++)
            this.words[p] = this.words[p + x];
        else
          this.words[0] = 0, this.length = 1;
        var _ = 0;
        for (p = this.length - 1; p >= 0 && (_ !== 0 || p >= a); p--) {
          var o = this.words[p] | 0;
          this.words[p] = _ << 26 - v | o >>> v, _ = o & d;
        }
        return y && _ !== 0 && (y.words[y.length++] = _), this.length === 0 && (this.words[0] = 0, this.length = 1), this.strip();
      }, t.prototype.ishrn = function(A, c, e) {
        return q(this.negative === 0), this.iushrn(A, c, e);
      }, t.prototype.shln = function(A) {
        return this.clone().ishln(A);
      }, t.prototype.ushln = function(A) {
        return this.clone().iushln(A);
      }, t.prototype.shrn = function(A) {
        return this.clone().ishrn(A);
      }, t.prototype.ushrn = function(A) {
        return this.clone().iushrn(A);
      }, t.prototype.testn = function(A) {
        q(typeof A == "number" && A >= 0);
        var c = A % 26, e = (A - c) / 26, a = 1 << c;
        if (this.length <= e) return !1;
        var v = this.words[e];
        return !!(v & a);
      }, t.prototype.imaskn = function(A) {
        q(typeof A == "number" && A >= 0);
        var c = A % 26, e = (A - c) / 26;
        if (q(this.negative === 0, "imaskn works only with positive numbers"), this.length <= e)
          return this;
        if (c !== 0 && e++, this.length = Math.min(e, this.length), c !== 0) {
          var a = 67108863 ^ 67108863 >>> c << c;
          this.words[this.length - 1] &= a;
        }
        return this.strip();
      }, t.prototype.maskn = function(A) {
        return this.clone().imaskn(A);
      }, t.prototype.iaddn = function(A) {
        return q(typeof A == "number"), q(A < 67108864), A < 0 ? this.isubn(-A) : this.negative !== 0 ? this.length === 1 && (this.words[0] | 0) < A ? (this.words[0] = A - (this.words[0] | 0), this.negative = 0, this) : (this.negative = 0, this.isubn(A), this.negative = 1, this) : this._iaddn(A);
      }, t.prototype._iaddn = function(A) {
        this.words[0] += A;
        for (var c = 0; c < this.length && this.words[c] >= 67108864; c++)
          this.words[c] -= 67108864, c === this.length - 1 ? this.words[c + 1] = 1 : this.words[c + 1]++;
        return this.length = Math.max(this.length, c + 1), this;
      }, t.prototype.isubn = function(A) {
        if (q(typeof A == "number"), q(A < 67108864), A < 0) return this.iaddn(-A);
        if (this.negative !== 0)
          return this.negative = 0, this.iaddn(A), this.negative = 1, this;
        if (this.words[0] -= A, this.length === 1 && this.words[0] < 0)
          this.words[0] = -this.words[0], this.negative = 1;
        else
          for (var c = 0; c < this.length && this.words[c] < 0; c++)
            this.words[c] += 67108864, this.words[c + 1] -= 1;
        return this.strip();
      }, t.prototype.addn = function(A) {
        return this.clone().iaddn(A);
      }, t.prototype.subn = function(A) {
        return this.clone().isubn(A);
      }, t.prototype.iabs = function() {
        return this.negative = 0, this;
      }, t.prototype.abs = function() {
        return this.clone().iabs();
      }, t.prototype._ishlnsubmul = function(A, c, e) {
        var a = A.length + e, v;
        this._expand(a);
        var x, d = 0;
        for (v = 0; v < A.length; v++) {
          x = (this.words[v + e] | 0) + d;
          var y = (A.words[v] | 0) * c;
          x -= y & 67108863, d = (x >> 26) - (y / 67108864 | 0), this.words[v + e] = x & 67108863;
        }
        for (; v < this.length - e; v++)
          x = (this.words[v + e] | 0) + d, d = x >> 26, this.words[v + e] = x & 67108863;
        if (d === 0) return this.strip();
        for (q(d === -1), d = 0, v = 0; v < this.length; v++)
          x = -(this.words[v] | 0) + d, d = x >> 26, this.words[v] = x & 67108863;
        return this.negative = 1, this.strip();
      }, t.prototype._wordDiv = function(A, c) {
        var e = this.length - A.length, a = this.clone(), v = A, x = v.words[v.length - 1] | 0, d = this._countBits(x);
        e = 26 - d, e !== 0 && (v = v.ushln(e), a.iushln(e), x = v.words[v.length - 1] | 0);
        var y = a.length - v.length, p;
        if (c !== "mod") {
          p = new t(null), p.length = y + 1, p.words = new Array(p.length);
          for (var _ = 0; _ < p.length; _++)
            p.words[_] = 0;
        }
        var o = a.clone()._ishlnsubmul(v, 1, y);
        o.negative === 0 && (a = o, p && (p.words[y] = 1));
        for (var P = y - 1; P >= 0; P--) {
          var Z = (a.words[v.length + P] | 0) * 67108864 + (a.words[v.length + P - 1] | 0);
          for (Z = Math.min(Z / x | 0, 67108863), a._ishlnsubmul(v, Z, P); a.negative !== 0; )
            Z--, a.negative = 0, a._ishlnsubmul(v, 1, P), a.isZero() || (a.negative ^= 1);
          p && (p.words[P] = Z);
        }
        return p && p.strip(), a.strip(), c !== "div" && e !== 0 && a.iushrn(e), {
          div: p || null,
          mod: a
        };
      }, t.prototype.divmod = function(A, c, e) {
        if (q(!A.isZero()), this.isZero())
          return {
            div: new t(0),
            mod: new t(0)
          };
        var a, v, x;
        return this.negative !== 0 && A.negative === 0 ? (x = this.neg().divmod(A, c), c !== "mod" && (a = x.div.neg()), c !== "div" && (v = x.mod.neg(), e && v.negative !== 0 && v.iadd(A)), {
          div: a,
          mod: v
        }) : this.negative === 0 && A.negative !== 0 ? (x = this.divmod(A.neg(), c), c !== "mod" && (a = x.div.neg()), {
          div: a,
          mod: x.mod
        }) : this.negative & A.negative ? (x = this.neg().divmod(A.neg(), c), c !== "div" && (v = x.mod.neg(), e && v.negative !== 0 && v.isub(A)), {
          div: x.div,
          mod: v
        }) : A.length > this.length || this.cmp(A) < 0 ? {
          div: new t(0),
          mod: this
        } : A.length === 1 ? c === "div" ? {
          div: this.divn(A.words[0]),
          mod: null
        } : c === "mod" ? {
          div: null,
          mod: new t(this.modn(A.words[0]))
        } : {
          div: this.divn(A.words[0]),
          mod: new t(this.modn(A.words[0]))
        } : this._wordDiv(A, c);
      }, t.prototype.div = function(A) {
        return this.divmod(A, "div", !1).div;
      }, t.prototype.mod = function(A) {
        return this.divmod(A, "mod", !1).mod;
      }, t.prototype.umod = function(A) {
        return this.divmod(A, "mod", !0).mod;
      }, t.prototype.divRound = function(A) {
        var c = this.divmod(A);
        if (c.mod.isZero()) return c.div;
        var e = c.div.negative !== 0 ? c.mod.isub(A) : c.mod, a = A.ushrn(1), v = A.andln(1), x = e.cmp(a);
        return x < 0 || v === 1 && x === 0 ? c.div : c.div.negative !== 0 ? c.div.isubn(1) : c.div.iaddn(1);
      }, t.prototype.modn = function(A) {
        q(A <= 67108863);
        for (var c = (1 << 26) % A, e = 0, a = this.length - 1; a >= 0; a--)
          e = (c * e + (this.words[a] | 0)) % A;
        return e;
      }, t.prototype.idivn = function(A) {
        q(A <= 67108863);
        for (var c = 0, e = this.length - 1; e >= 0; e--) {
          var a = (this.words[e] | 0) + c * 67108864;
          this.words[e] = a / A | 0, c = a % A;
        }
        return this.strip();
      }, t.prototype.divn = function(A) {
        return this.clone().idivn(A);
      }, t.prototype.egcd = function(A) {
        q(A.negative === 0), q(!A.isZero());
        var c = this, e = A.clone();
        c.negative !== 0 ? c = c.umod(A) : c = c.clone();
        for (var a = new t(1), v = new t(0), x = new t(0), d = new t(1), y = 0; c.isEven() && e.isEven(); )
          c.iushrn(1), e.iushrn(1), ++y;
        for (var p = e.clone(), _ = c.clone(); !c.isZero(); ) {
          for (var o = 0, P = 1; !(c.words[0] & P) && o < 26; ++o, P <<= 1) ;
          if (o > 0)
            for (c.iushrn(o); o-- > 0; )
              (a.isOdd() || v.isOdd()) && (a.iadd(p), v.isub(_)), a.iushrn(1), v.iushrn(1);
          for (var Z = 0, ee = 1; !(e.words[0] & ee) && Z < 26; ++Z, ee <<= 1) ;
          if (Z > 0)
            for (e.iushrn(Z); Z-- > 0; )
              (x.isOdd() || d.isOdd()) && (x.iadd(p), d.isub(_)), x.iushrn(1), d.iushrn(1);
          c.cmp(e) >= 0 ? (c.isub(e), a.isub(x), v.isub(d)) : (e.isub(c), x.isub(a), d.isub(v));
        }
        return {
          a: x,
          b: d,
          gcd: e.iushln(y)
        };
      }, t.prototype._invmp = function(A) {
        q(A.negative === 0), q(!A.isZero());
        var c = this, e = A.clone();
        c.negative !== 0 ? c = c.umod(A) : c = c.clone();
        for (var a = new t(1), v = new t(0), x = e.clone(); c.cmpn(1) > 0 && e.cmpn(1) > 0; ) {
          for (var d = 0, y = 1; !(c.words[0] & y) && d < 26; ++d, y <<= 1) ;
          if (d > 0)
            for (c.iushrn(d); d-- > 0; )
              a.isOdd() && a.iadd(x), a.iushrn(1);
          for (var p = 0, _ = 1; !(e.words[0] & _) && p < 26; ++p, _ <<= 1) ;
          if (p > 0)
            for (e.iushrn(p); p-- > 0; )
              v.isOdd() && v.iadd(x), v.iushrn(1);
          c.cmp(e) >= 0 ? (c.isub(e), a.isub(v)) : (e.isub(c), v.isub(a));
        }
        var o;
        return c.cmpn(1) === 0 ? o = a : o = v, o.cmpn(0) < 0 && o.iadd(A), o;
      }, t.prototype.gcd = function(A) {
        if (this.isZero()) return A.abs();
        if (A.isZero()) return this.abs();
        var c = this.clone(), e = A.clone();
        c.negative = 0, e.negative = 0;
        for (var a = 0; c.isEven() && e.isEven(); a++)
          c.iushrn(1), e.iushrn(1);
        do {
          for (; c.isEven(); )
            c.iushrn(1);
          for (; e.isEven(); )
            e.iushrn(1);
          var v = c.cmp(e);
          if (v < 0) {
            var x = c;
            c = e, e = x;
          } else if (v === 0 || e.cmpn(1) === 0)
            break;
          c.isub(e);
        } while (!0);
        return e.iushln(a);
      }, t.prototype.invm = function(A) {
        return this.egcd(A).a.umod(A);
      }, t.prototype.isEven = function() {
        return (this.words[0] & 1) === 0;
      }, t.prototype.isOdd = function() {
        return (this.words[0] & 1) === 1;
      }, t.prototype.andln = function(A) {
        return this.words[0] & A;
      }, t.prototype.bincn = function(A) {
        q(typeof A == "number");
        var c = A % 26, e = (A - c) / 26, a = 1 << c;
        if (this.length <= e)
          return this._expand(e + 1), this.words[e] |= a, this;
        for (var v = a, x = e; v !== 0 && x < this.length; x++) {
          var d = this.words[x] | 0;
          d += v, v = d >>> 26, d &= 67108863, this.words[x] = d;
        }
        return v !== 0 && (this.words[x] = v, this.length++), this;
      }, t.prototype.isZero = function() {
        return this.length === 1 && this.words[0] === 0;
      }, t.prototype.cmpn = function(A) {
        var c = A < 0;
        if (this.negative !== 0 && !c) return -1;
        if (this.negative === 0 && c) return 1;
        this.strip();
        var e;
        if (this.length > 1)
          e = 1;
        else {
          c && (A = -A), q(A <= 67108863, "Number is too big");
          var a = this.words[0] | 0;
          e = a === A ? 0 : a < A ? -1 : 1;
        }
        return this.negative !== 0 ? -e | 0 : e;
      }, t.prototype.cmp = function(A) {
        if (this.negative !== 0 && A.negative === 0) return -1;
        if (this.negative === 0 && A.negative !== 0) return 1;
        var c = this.ucmp(A);
        return this.negative !== 0 ? -c | 0 : c;
      }, t.prototype.ucmp = function(A) {
        if (this.length > A.length) return 1;
        if (this.length < A.length) return -1;
        for (var c = 0, e = this.length - 1; e >= 0; e--) {
          var a = this.words[e] | 0, v = A.words[e] | 0;
          if (a !== v) {
            a < v ? c = -1 : a > v && (c = 1);
            break;
          }
        }
        return c;
      }, t.prototype.gtn = function(A) {
        return this.cmpn(A) === 1;
      }, t.prototype.gt = function(A) {
        return this.cmp(A) === 1;
      }, t.prototype.gten = function(A) {
        return this.cmpn(A) >= 0;
      }, t.prototype.gte = function(A) {
        return this.cmp(A) >= 0;
      }, t.prototype.ltn = function(A) {
        return this.cmpn(A) === -1;
      }, t.prototype.lt = function(A) {
        return this.cmp(A) === -1;
      }, t.prototype.lten = function(A) {
        return this.cmpn(A) <= 0;
      }, t.prototype.lte = function(A) {
        return this.cmp(A) <= 0;
      }, t.prototype.eqn = function(A) {
        return this.cmpn(A) === 0;
      }, t.prototype.eq = function(A) {
        return this.cmp(A) === 0;
      }, t.red = function(A) {
        return new te(A);
      }, t.prototype.toRed = function(A) {
        return q(!this.red, "Already a number in reduction context"), q(this.negative === 0, "red works only with positives"), A.convertTo(this)._forceRed(A);
      }, t.prototype.fromRed = function() {
        return q(this.red, "fromRed works only with numbers in reduction context"), this.red.convertFrom(this);
      }, t.prototype._forceRed = function(A) {
        return this.red = A, this;
      }, t.prototype.forceRed = function(A) {
        return q(!this.red, "Already a number in reduction context"), this._forceRed(A);
      }, t.prototype.redAdd = function(A) {
        return q(this.red, "redAdd works only with red numbers"), this.red.add(this, A);
      }, t.prototype.redIAdd = function(A) {
        return q(this.red, "redIAdd works only with red numbers"), this.red.iadd(this, A);
      }, t.prototype.redSub = function(A) {
        return q(this.red, "redSub works only with red numbers"), this.red.sub(this, A);
      }, t.prototype.redISub = function(A) {
        return q(this.red, "redISub works only with red numbers"), this.red.isub(this, A);
      }, t.prototype.redShl = function(A) {
        return q(this.red, "redShl works only with red numbers"), this.red.shl(this, A);
      }, t.prototype.redMul = function(A) {
        return q(this.red, "redMul works only with red numbers"), this.red._verify2(this, A), this.red.mul(this, A);
      }, t.prototype.redIMul = function(A) {
        return q(this.red, "redMul works only with red numbers"), this.red._verify2(this, A), this.red.imul(this, A);
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
      }, t.prototype.redPow = function(A) {
        return q(this.red && !A.red, "redPow(normalNum)"), this.red._verify1(this), this.red.pow(this, A);
      };
      var W = {
        k256: null,
        p224: null,
        p192: null,
        p25519: null
      };
      function z(H, A) {
        this.name = H, this.p = new t(A, 16), this.n = this.p.bitLength(), this.k = new t(1).iushln(this.n).isub(this.p), this.tmp = this._tmp();
      }
      z.prototype._tmp = function() {
        var A = new t(null);
        return A.words = new Array(Math.ceil(this.n / 13)), A;
      }, z.prototype.ireduce = function(A) {
        var c = A, e;
        do
          this.split(c, this.tmp), c = this.imulK(c), c = c.iadd(this.tmp), e = c.bitLength();
        while (e > this.n);
        var a = e < this.n ? -1 : c.ucmp(this.p);
        return a === 0 ? (c.words[0] = 0, c.length = 1) : a > 0 ? c.isub(this.p) : c.strip !== void 0 ? c.strip() : c._strip(), c;
      }, z.prototype.split = function(A, c) {
        A.iushrn(this.n, 0, c);
      }, z.prototype.imulK = function(A) {
        return A.imul(this.k);
      };
      function X() {
        z.call(
          this,
          "k256",
          "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f"
        );
      }
      C(X, z), X.prototype.split = function(A, c) {
        for (var e = 4194303, a = Math.min(A.length, 9), v = 0; v < a; v++)
          c.words[v] = A.words[v];
        if (c.length = a, A.length <= 9) {
          A.words[0] = 0, A.length = 1;
          return;
        }
        var x = A.words[9];
        for (c.words[c.length++] = x & e, v = 10; v < A.length; v++) {
          var d = A.words[v] | 0;
          A.words[v - 10] = (d & e) << 4 | x >>> 22, x = d;
        }
        x >>>= 22, A.words[v - 10] = x, x === 0 && A.length > 10 ? A.length -= 10 : A.length -= 9;
      }, X.prototype.imulK = function(A) {
        A.words[A.length] = 0, A.words[A.length + 1] = 0, A.length += 2;
        for (var c = 0, e = 0; e < A.length; e++) {
          var a = A.words[e] | 0;
          c += a * 977, A.words[e] = c & 67108863, c = a * 64 + (c / 67108864 | 0);
        }
        return A.words[A.length - 1] === 0 && (A.length--, A.words[A.length - 1] === 0 && A.length--), A;
      };
      function Q() {
        z.call(
          this,
          "p224",
          "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001"
        );
      }
      C(Q, z);
      function ae() {
        z.call(
          this,
          "p192",
          "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff"
        );
      }
      C(ae, z);
      function fe() {
        z.call(
          this,
          "25519",
          "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed"
        );
      }
      C(fe, z), fe.prototype.imulK = function(A) {
        for (var c = 0, e = 0; e < A.length; e++) {
          var a = (A.words[e] | 0) * 19 + c, v = a & 67108863;
          a >>>= 26, A.words[e] = v, c = a;
        }
        return c !== 0 && (A.words[A.length++] = c), A;
      }, t._prime = function(A) {
        if (W[A]) return W[A];
        var c;
        if (A === "k256")
          c = new X();
        else if (A === "p224")
          c = new Q();
        else if (A === "p192")
          c = new ae();
        else if (A === "p25519")
          c = new fe();
        else
          throw new Error("Unknown prime " + A);
        return W[A] = c, c;
      };
      function te(H) {
        if (typeof H == "string") {
          var A = t._prime(H);
          this.m = A.p, this.prime = A;
        } else
          q(H.gtn(1), "modulus must be greater than 1"), this.m = H, this.prime = null;
      }
      te.prototype._verify1 = function(A) {
        q(A.negative === 0, "red works only with positives"), q(A.red, "red works only with red numbers");
      }, te.prototype._verify2 = function(A, c) {
        q((A.negative | c.negative) === 0, "red works only with positives"), q(
          A.red && A.red === c.red,
          "red works only with red numbers"
        );
      }, te.prototype.imod = function(A) {
        return this.prime ? this.prime.ireduce(A)._forceRed(this) : A.umod(this.m)._forceRed(this);
      }, te.prototype.neg = function(A) {
        return A.isZero() ? A.clone() : this.m.sub(A)._forceRed(this);
      }, te.prototype.add = function(A, c) {
        this._verify2(A, c);
        var e = A.add(c);
        return e.cmp(this.m) >= 0 && e.isub(this.m), e._forceRed(this);
      }, te.prototype.iadd = function(A, c) {
        this._verify2(A, c);
        var e = A.iadd(c);
        return e.cmp(this.m) >= 0 && e.isub(this.m), e;
      }, te.prototype.sub = function(A, c) {
        this._verify2(A, c);
        var e = A.sub(c);
        return e.cmpn(0) < 0 && e.iadd(this.m), e._forceRed(this);
      }, te.prototype.isub = function(A, c) {
        this._verify2(A, c);
        var e = A.isub(c);
        return e.cmpn(0) < 0 && e.iadd(this.m), e;
      }, te.prototype.shl = function(A, c) {
        return this._verify1(A), this.imod(A.ushln(c));
      }, te.prototype.imul = function(A, c) {
        return this._verify2(A, c), this.imod(A.imul(c));
      }, te.prototype.mul = function(A, c) {
        return this._verify2(A, c), this.imod(A.mul(c));
      }, te.prototype.isqr = function(A) {
        return this.imul(A, A.clone());
      }, te.prototype.sqr = function(A) {
        return this.mul(A, A);
      }, te.prototype.sqrt = function(A) {
        if (A.isZero()) return A.clone();
        var c = this.m.andln(3);
        if (q(c % 2 === 1), c === 3) {
          var e = this.m.add(new t(1)).iushrn(2);
          return this.pow(A, e);
        }
        for (var a = this.m.subn(1), v = 0; !a.isZero() && a.andln(1) === 0; )
          v++, a.iushrn(1);
        q(!a.isZero());
        var x = new t(1).toRed(this), d = x.redNeg(), y = this.m.subn(1).iushrn(1), p = this.m.bitLength();
        for (p = new t(2 * p * p).toRed(this); this.pow(p, y).cmp(d) !== 0; )
          p.redIAdd(d);
        for (var _ = this.pow(p, a), o = this.pow(A, a.addn(1).iushrn(1)), P = this.pow(A, a), Z = v; P.cmp(x) !== 0; ) {
          for (var ee = P, K = 0; ee.cmp(x) !== 0; K++)
            ee = ee.redSqr();
          q(K < Z);
          var L = this.pow(_, new t(1).iushln(Z - K - 1));
          o = o.redMul(L), _ = L.redSqr(), P = P.redMul(_), Z = K;
        }
        return o;
      }, te.prototype.invm = function(A) {
        var c = A._invmp(this.m);
        return c.negative !== 0 ? (c.negative = 0, this.imod(c).redNeg()) : this.imod(c);
      }, te.prototype.pow = function(A, c) {
        if (c.isZero()) return new t(1).toRed(this);
        if (c.cmpn(1) === 0) return A.clone();
        var e = 4, a = new Array(1 << e);
        a[0] = new t(1).toRed(this), a[1] = A;
        for (var v = 2; v < a.length; v++)
          a[v] = this.mul(a[v - 1], A);
        var x = a[0], d = 0, y = 0, p = c.bitLength() % 26;
        for (p === 0 && (p = 26), v = c.length - 1; v >= 0; v--) {
          for (var _ = c.words[v], o = p - 1; o >= 0; o--) {
            var P = _ >> o & 1;
            if (x !== a[0] && (x = this.sqr(x)), P === 0 && d === 0) {
              y = 0;
              continue;
            }
            d <<= 1, d |= P, y++, !(y !== e && (v !== 0 || o !== 0)) && (x = this.mul(x, a[d]), y = 0, d = 0);
          }
          p = 26;
        }
        return x;
      }, te.prototype.convertTo = function(A) {
        var c = A.umod(this.m);
        return c === A ? c.clone() : c;
      }, te.prototype.convertFrom = function(A) {
        var c = A.clone();
        return c.red = null, c;
      }, t.mont = function(A) {
        return new ce(A);
      };
      function ce(H) {
        te.call(this, H), this.shift = this.m.bitLength(), this.shift % 26 !== 0 && (this.shift += 26 - this.shift % 26), this.r = new t(1).iushln(this.shift), this.r2 = this.imod(this.r.sqr()), this.rinv = this.r._invmp(this.m), this.minv = this.rinv.mul(this.r).isubn(1).div(this.m), this.minv = this.minv.umod(this.r), this.minv = this.r.sub(this.minv);
      }
      C(ce, te), ce.prototype.convertTo = function(A) {
        return this.imod(A.ushln(this.shift));
      }, ce.prototype.convertFrom = function(A) {
        var c = this.imod(A.mul(this.rinv));
        return c.red = null, c;
      }, ce.prototype.imul = function(A, c) {
        if (A.isZero() || c.isZero())
          return A.words[0] = 0, A.length = 1, A;
        var e = A.imul(c), a = e.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m), v = e.isub(a).iushrn(this.shift), x = v;
        return v.cmp(this.m) >= 0 ? x = v.isub(this.m) : v.cmpn(0) < 0 && (x = v.iadd(this.m)), x._forceRed(this);
      }, ce.prototype.mul = function(A, c) {
        if (A.isZero() || c.isZero()) return new t(0)._forceRed(this);
        var e = A.mul(c), a = e.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m), v = e.isub(a).iushrn(this.shift), x = v;
        return v.cmp(this.m) >= 0 ? x = v.isub(this.m) : v.cmpn(0) < 0 && (x = v.iadd(this.m)), x._forceRed(this);
      }, ce.prototype.invm = function(A) {
        var c = this.imod(A._invmp(this.m).mul(this.r2));
        return c._forceRed(this);
      };
    })(I, commonjsGlobal);
  }(bn$2)), bn$2.exports;
}
var brorand = { exports: {} }, hasRequiredBrorand;
function requireBrorand() {
  if (hasRequiredBrorand) return brorand.exports;
  hasRequiredBrorand = 1;
  var I;
  brorand.exports = function(C) {
    return I || (I = new M(null)), I.generate(C);
  };
  function M(q) {
    this.rand = q;
  }
  if (brorand.exports.Rand = M, M.prototype.generate = function(C) {
    return this._rand(C);
  }, M.prototype._rand = function(C) {
    if (this.rand.getBytes)
      return this.rand.getBytes(C);
    for (var t = new Uint8Array(C), E = 0; E < t.length; E++)
      t[E] = this.rand.getByte();
    return t;
  }, typeof self == "object")
    self.crypto && self.crypto.getRandomValues ? M.prototype._rand = function(C) {
      var t = new Uint8Array(C);
      return self.crypto.getRandomValues(t), t;
    } : self.msCrypto && self.msCrypto.getRandomValues ? M.prototype._rand = function(C) {
      var t = new Uint8Array(C);
      return self.msCrypto.getRandomValues(t), t;
    } : typeof window == "object" && (M.prototype._rand = function() {
      throw new Error("Not implemented yet");
    });
  else
    try {
      var T = requireCryptoBrowserify();
      if (typeof T.randomBytes != "function")
        throw new Error("Not supported");
      M.prototype._rand = function(C) {
        return T.randomBytes(C);
      };
    } catch (q) {
    }
  return brorand.exports;
}
var mr, hasRequiredMr;
function requireMr() {
  if (hasRequiredMr) return mr;
  hasRequiredMr = 1;
  var I = requireBn$2(), M = requireBrorand();
  function T(q) {
    this.rand = q || new M.Rand();
  }
  return mr = T, T.create = function(C) {
    return new T(C);
  }, T.prototype._randbelow = function(C) {
    var t = C.bitLength(), E = Math.ceil(t / 8);
    do
      var l = new I(this.rand.generate(E));
    while (l.cmp(C) >= 0);
    return l;
  }, T.prototype._randrange = function(C, t) {
    var E = t.sub(C);
    return C.add(this._randbelow(E));
  }, T.prototype.test = function(C, t, E) {
    var l = C.bitLength(), b = I.mont(C), w = new I(1).toRed(b);
    t || (t = Math.max(1, l / 48 | 0));
    for (var u = C.subn(1), g = 0; !u.testn(g); g++)
      ;
    for (var R = C.shrn(g), B = u.toRed(b), k = !0; t > 0; t--) {
      var $ = this._randrange(new I(2), u);
      E && E($);
      var O = $.toRed(b).redPow(R);
      if (!(O.cmp(w) === 0 || O.cmp(B) === 0)) {
        for (var D = 1; D < g; D++) {
          if (O = O.redSqr(), O.cmp(w) === 0)
            return !1;
          if (O.cmp(B) === 0)
            break;
        }
        if (D === g)
          return !1;
      }
    }
    return k;
  }, T.prototype.getDivisor = function(C, t) {
    var E = C.bitLength(), l = I.mont(C), b = new I(1).toRed(l);
    t || (t = Math.max(1, E / 48 | 0));
    for (var w = C.subn(1), u = 0; !w.testn(u); u++)
      ;
    for (var g = C.shrn(u), R = w.toRed(l); t > 0; t--) {
      var B = this._randrange(new I(2), w), k = C.gcd(B);
      if (k.cmpn(1) !== 0)
        return k;
      var $ = B.toRed(l).redPow(g);
      if (!($.cmp(b) === 0 || $.cmp(R) === 0)) {
        for (var O = 1; O < u; O++) {
          if ($ = $.redSqr(), $.cmp(b) === 0)
            return $.fromRed().subn(1).gcd(C);
          if ($.cmp(R) === 0)
            break;
        }
        if (O === u)
          return $ = $.redSqr(), $.fromRed().subn(1).gcd(C);
      }
    }
    return !1;
  }, mr;
}
var generatePrime, hasRequiredGeneratePrime;
function requireGeneratePrime() {
  if (hasRequiredGeneratePrime) return generatePrime;
  hasRequiredGeneratePrime = 1;
  var I = requireBrowser$b();
  generatePrime = O, O.simpleSieve = k, O.fermatTest = $;
  var M = requireBn$2(), T = new M(24), q = requireMr(), C = new q(), t = new M(1), E = new M(2), l = new M(5);
  new M(16), new M(8);
  var b = new M(10), w = new M(3);
  new M(7);
  var u = new M(11), g = new M(4);
  new M(12);
  var R = null;
  function B() {
    if (R !== null)
      return R;
    var D = 1048576, N = [];
    N[0] = 2;
    for (var W = 1, z = 3; z < D; z += 2) {
      for (var X = Math.ceil(Math.sqrt(z)), Q = 0; Q < W && N[Q] <= X && z % N[Q] !== 0; Q++)
        ;
      W !== Q && N[Q] <= X || (N[W++] = z);
    }
    return R = N, N;
  }
  function k(D) {
    for (var N = B(), W = 0; W < N.length; W++)
      if (D.modn(N[W]) === 0)
        return D.cmpn(N[W]) === 0;
    return !0;
  }
  function $(D) {
    var N = M.mont(D);
    return E.toRed(N).redPow(D.subn(1)).fromRed().cmpn(1) === 0;
  }
  function O(D, N) {
    if (D < 16)
      return N === 2 || N === 5 ? new M([140, 123]) : new M([140, 39]);
    N = new M(N);
    for (var W, z; ; ) {
      for (W = new M(I(Math.ceil(D / 8))); W.bitLength() > D; )
        W.ishrn(1);
      if (W.isEven() && W.iadd(t), W.testn(1) || W.iadd(E), N.cmp(E)) {
        if (!N.cmp(l))
          for (; W.mod(b).cmp(w); )
            W.iadd(g);
      } else for (; W.mod(T).cmp(u); )
        W.iadd(g);
      if (z = W.shrn(1), k(z) && k(W) && $(z) && $(W) && C.test(z) && C.test(W))
        return W;
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
  var I = requireBn$2(), M = requireMr(), T = new M(), q = new I(24), C = new I(11), t = new I(10), E = new I(3), l = new I(7), b = requireGeneratePrime(), w = requireBrowser$b();
  dh = k;
  function u(O, D) {
    return D = D || "utf8", bufferExports.Buffer.isBuffer(O) || (O = new bufferExports.Buffer(O, D)), this._pub = new I(O), this;
  }
  function g(O, D) {
    return D = D || "utf8", bufferExports.Buffer.isBuffer(O) || (O = new bufferExports.Buffer(O, D)), this._priv = new I(O), this;
  }
  var R = {};
  function B(O, D) {
    var N = D.toString("hex"), W = [N, O.toString(16)].join("_");
    if (W in R)
      return R[W];
    var z = 0;
    if (O.isEven() || !b.simpleSieve || !b.fermatTest(O) || !T.test(O))
      return z += 1, N === "02" || N === "05" ? z += 8 : z += 4, R[W] = z, z;
    T.test(O.shrn(1)) || (z += 2);
    var X;
    switch (N) {
      case "02":
        O.mod(q).cmp(C) && (z += 8);
        break;
      case "05":
        X = O.mod(t), X.cmp(E) && X.cmp(l) && (z += 8);
        break;
      default:
        z += 4;
    }
    return R[W] = z, z;
  }
  function k(O, D, N) {
    this.setGenerator(D), this.__prime = new I(O), this._prime = I.mont(this.__prime), this._primeLen = O.length, this._pub = void 0, this._priv = void 0, this._primeCode = void 0, N ? (this.setPublicKey = u, this.setPrivateKey = g) : this._primeCode = 8;
  }
  Object.defineProperty(k.prototype, "verifyError", {
    enumerable: !0,
    get: function() {
      return typeof this._primeCode != "number" && (this._primeCode = B(this.__prime, this.__gen)), this._primeCode;
    }
  }), k.prototype.generateKeys = function() {
    return this._priv || (this._priv = new I(w(this._primeLen))), this._pub = this._gen.toRed(this._prime).redPow(this._priv).fromRed(), this.getPublicKey();
  }, k.prototype.computeSecret = function(O) {
    O = new I(O), O = O.toRed(this._prime);
    var D = O.redPow(this._priv).fromRed(), N = new bufferExports.Buffer(D.toArray()), W = this.getPrime();
    if (N.length < W.length) {
      var z = new bufferExports.Buffer(W.length - N.length);
      z.fill(0), N = bufferExports.Buffer.concat([z, N]);
    }
    return N;
  }, k.prototype.getPublicKey = function(D) {
    return $(this._pub, D);
  }, k.prototype.getPrivateKey = function(D) {
    return $(this._priv, D);
  }, k.prototype.getPrime = function(O) {
    return $(this.__prime, O);
  }, k.prototype.getGenerator = function(O) {
    return $(this._gen, O);
  }, k.prototype.setGenerator = function(O, D) {
    return D = D || "utf8", bufferExports.Buffer.isBuffer(O) || (O = new bufferExports.Buffer(O, D)), this.__gen = O, this._gen = new I(O), this;
  };
  function $(O, D) {
    var N = new bufferExports.Buffer(O.toArray());
    return D ? N.toString(D) : N;
  }
  return dh;
}
var hasRequiredBrowser$4;
function requireBrowser$4() {
  if (hasRequiredBrowser$4) return browser$4;
  hasRequiredBrowser$4 = 1;
  var I = requireGeneratePrime(), M = require$$1$1, T = requireDh();
  function q(E) {
    var l = new bufferExports.Buffer(M[E].prime, "hex"), b = new bufferExports.Buffer(M[E].gen, "hex");
    return new T(l, b);
  }
  var C = {
    binary: !0,
    hex: !0,
    base64: !0
  };
  function t(E, l, b, w) {
    return bufferExports.Buffer.isBuffer(l) || C[l] === void 0 ? t(E, "binary", l, b) : (l = l || "binary", w = w || "binary", b = b || new bufferExports.Buffer([2]), bufferExports.Buffer.isBuffer(b) || (b = new bufferExports.Buffer(b, w)), typeof E == "number" ? new T(I(E, b), b, !0) : (bufferExports.Buffer.isBuffer(E) || (E = new bufferExports.Buffer(E, l)), new T(E, b, !0)));
  }
  return browser$4.DiffieHellmanGroup = browser$4.createDiffieHellmanGroup = browser$4.getDiffieHellman = q, browser$4.createDiffieHellman = browser$4.DiffieHellman = t, browser$4;
}
var readableBrowser = { exports: {} }, processNextickArgs = { exports: {} }, hasRequiredProcessNextickArgs;
function requireProcessNextickArgs() {
  if (hasRequiredProcessNextickArgs) return processNextickArgs.exports;
  hasRequiredProcessNextickArgs = 1, typeof process$1 == "undefined" || !process$1.version || process$1.version.indexOf("v0.") === 0 || process$1.version.indexOf("v1.") === 0 && process$1.version.indexOf("v1.8.") !== 0 ? processNextickArgs.exports = { nextTick: I } : processNextickArgs.exports = process$1;
  function I(M, T, q, C) {
    if (typeof M != "function")
      throw new TypeError('"callback" argument must be a function');
    var t = arguments.length, E, l;
    switch (t) {
      case 0:
      case 1:
        return process$1.nextTick(M);
      case 2:
        return process$1.nextTick(function() {
          M.call(null, T);
        });
      case 3:
        return process$1.nextTick(function() {
          M.call(null, T, q);
        });
      case 4:
        return process$1.nextTick(function() {
          M.call(null, T, q, C);
        });
      default:
        for (E = new Array(t - 1), l = 0; l < E.length; )
          E[l++] = arguments[l];
        return process$1.nextTick(function() {
          M.apply(null, E);
        });
    }
  }
  return processNextickArgs.exports;
}
var isarray, hasRequiredIsarray;
function requireIsarray() {
  if (hasRequiredIsarray) return isarray;
  hasRequiredIsarray = 1;
  var I = {}.toString;
  return isarray = Array.isArray || function(M) {
    return I.call(M) == "[object Array]";
  }, isarray;
}
var streamBrowser, hasRequiredStreamBrowser;
function requireStreamBrowser() {
  return hasRequiredStreamBrowser || (hasRequiredStreamBrowser = 1, streamBrowser = requireEvents().EventEmitter), streamBrowser;
}
var safeBuffer = { exports: {} }, hasRequiredSafeBuffer;
function requireSafeBuffer() {
  return hasRequiredSafeBuffer || (hasRequiredSafeBuffer = 1, function(I, M) {
    var T = requireBuffer$1(), q = T.Buffer;
    function C(E, l) {
      for (var b in E)
        l[b] = E[b];
    }
    q.from && q.alloc && q.allocUnsafe && q.allocUnsafeSlow ? I.exports = T : (C(T, M), M.Buffer = t);
    function t(E, l, b) {
      return q(E, l, b);
    }
    C(q, t), t.from = function(E, l, b) {
      if (typeof E == "number")
        throw new TypeError("Argument must not be a number");
      return q(E, l, b);
    }, t.alloc = function(E, l, b) {
      if (typeof E != "number")
        throw new TypeError("Argument must be a number");
      var w = q(E);
      return l !== void 0 ? typeof b == "string" ? w.fill(l, b) : w.fill(l) : w.fill(0), w;
    }, t.allocUnsafe = function(E) {
      if (typeof E != "number")
        throw new TypeError("Argument must be a number");
      return q(E);
    }, t.allocUnsafeSlow = function(E) {
      if (typeof E != "number")
        throw new TypeError("Argument must be a number");
      return T.SlowBuffer(E);
    };
  }(safeBuffer, safeBuffer.exports)), safeBuffer.exports;
}
var util = {}, hasRequiredUtil;
function requireUtil() {
  if (hasRequiredUtil) return util;
  hasRequiredUtil = 1;
  function I($) {
    return Array.isArray ? Array.isArray($) : k($) === "[object Array]";
  }
  util.isArray = I;
  function M($) {
    return typeof $ == "boolean";
  }
  util.isBoolean = M;
  function T($) {
    return $ === null;
  }
  util.isNull = T;
  function q($) {
    return $ == null;
  }
  util.isNullOrUndefined = q;
  function C($) {
    return typeof $ == "number";
  }
  util.isNumber = C;
  function t($) {
    return typeof $ == "string";
  }
  util.isString = t;
  function E($) {
    return typeof $ == "symbol";
  }
  util.isSymbol = E;
  function l($) {
    return $ === void 0;
  }
  util.isUndefined = l;
  function b($) {
    return k($) === "[object RegExp]";
  }
  util.isRegExp = b;
  function w($) {
    return typeof $ == "object" && $ !== null;
  }
  util.isObject = w;
  function u($) {
    return k($) === "[object Date]";
  }
  util.isDate = u;
  function g($) {
    return k($) === "[object Error]" || $ instanceof Error;
  }
  util.isError = g;
  function R($) {
    return typeof $ == "function";
  }
  util.isFunction = R;
  function B($) {
    return $ === null || typeof $ == "boolean" || typeof $ == "number" || typeof $ == "string" || typeof $ == "symbol" || // ES6 symbol
    typeof $ == "undefined";
  }
  util.isPrimitive = B, util.isBuffer = requireBuffer$1().Buffer.isBuffer;
  function k($) {
    return Object.prototype.toString.call($);
  }
  return util;
}
var BufferList = { exports: {} }, hasRequiredBufferList;
function requireBufferList() {
  return hasRequiredBufferList || (hasRequiredBufferList = 1, function(I) {
    function M(t, E) {
      if (!(t instanceof E))
        throw new TypeError("Cannot call a class as a function");
    }
    var T = requireSafeBuffer().Buffer, q = requireUtil$1();
    function C(t, E, l) {
      t.copy(E, l);
    }
    I.exports = function() {
      function t() {
        M(this, t), this.head = null, this.tail = null, this.length = 0;
      }
      return t.prototype.push = function(l) {
        var b = { data: l, next: null };
        this.length > 0 ? this.tail.next = b : this.head = b, this.tail = b, ++this.length;
      }, t.prototype.unshift = function(l) {
        var b = { data: l, next: this.head };
        this.length === 0 && (this.tail = b), this.head = b, ++this.length;
      }, t.prototype.shift = function() {
        if (this.length !== 0) {
          var l = this.head.data;
          return this.length === 1 ? this.head = this.tail = null : this.head = this.head.next, --this.length, l;
        }
      }, t.prototype.clear = function() {
        this.head = this.tail = null, this.length = 0;
      }, t.prototype.join = function(l) {
        if (this.length === 0) return "";
        for (var b = this.head, w = "" + b.data; b = b.next; )
          w += l + b.data;
        return w;
      }, t.prototype.concat = function(l) {
        if (this.length === 0) return T.alloc(0);
        for (var b = T.allocUnsafe(l >>> 0), w = this.head, u = 0; w; )
          C(w.data, b, u), u += w.data.length, w = w.next;
        return b;
      }, t;
    }(), q && q.inspect && q.inspect.custom && (I.exports.prototype[q.inspect.custom] = function() {
      var t = q.inspect({ length: this.length });
      return this.constructor.name + " " + t;
    });
  }(BufferList)), BufferList.exports;
}
var destroy_1, hasRequiredDestroy;
function requireDestroy() {
  if (hasRequiredDestroy) return destroy_1;
  hasRequiredDestroy = 1;
  var I = requireProcessNextickArgs();
  function M(C, t) {
    var E = this, l = this._readableState && this._readableState.destroyed, b = this._writableState && this._writableState.destroyed;
    return l || b ? (t ? t(C) : C && (this._writableState ? this._writableState.errorEmitted || (this._writableState.errorEmitted = !0, I.nextTick(q, this, C)) : I.nextTick(q, this, C)), this) : (this._readableState && (this._readableState.destroyed = !0), this._writableState && (this._writableState.destroyed = !0), this._destroy(C || null, function(w) {
      !t && w ? E._writableState ? E._writableState.errorEmitted || (E._writableState.errorEmitted = !0, I.nextTick(q, E, w)) : I.nextTick(q, E, w) : t && t(w);
    }), this);
  }
  function T() {
    this._readableState && (this._readableState.destroyed = !1, this._readableState.reading = !1, this._readableState.ended = !1, this._readableState.endEmitted = !1), this._writableState && (this._writableState.destroyed = !1, this._writableState.ended = !1, this._writableState.ending = !1, this._writableState.finalCalled = !1, this._writableState.prefinished = !1, this._writableState.finished = !1, this._writableState.errorEmitted = !1);
  }
  function q(C, t) {
    C.emit("error", t);
  }
  return destroy_1 = {
    destroy: M,
    undestroy: T
  }, destroy_1;
}
var _stream_writable, hasRequired_stream_writable;
function require_stream_writable() {
  if (hasRequired_stream_writable) return _stream_writable;
  hasRequired_stream_writable = 1;
  var I = requireProcessNextickArgs();
  _stream_writable = $;
  function M(x) {
    var d = this;
    this.next = null, this.entry = null, this.finish = function() {
      v(d, x);
    };
  }
  var T = !process$1.browser && ["v0.10", "v0.9."].indexOf(process$1.version.slice(0, 5)) > -1 ? setImmediate : I.nextTick, q;
  $.WritableState = B;
  var C = Object.create(requireUtil());
  C.inherits = requireInherits_browser();
  var t = {
    deprecate: requireBrowser$a()
  }, E = requireStreamBrowser(), l = requireSafeBuffer().Buffer, b = (typeof commonjsGlobal != "undefined" ? commonjsGlobal : typeof window != "undefined" ? window : typeof self != "undefined" ? self : {}).Uint8Array || function() {
  };
  function w(x) {
    return l.from(x);
  }
  function u(x) {
    return l.isBuffer(x) || x instanceof b;
  }
  var g = requireDestroy();
  C.inherits($, E);
  function R() {
  }
  function B(x, d) {
    q = q || require_stream_duplex(), x = x || {};
    var y = d instanceof q;
    this.objectMode = !!x.objectMode, y && (this.objectMode = this.objectMode || !!x.writableObjectMode);
    var p = x.highWaterMark, _ = x.writableHighWaterMark, o = this.objectMode ? 16 : 16 * 1024;
    p || p === 0 ? this.highWaterMark = p : y && (_ || _ === 0) ? this.highWaterMark = _ : this.highWaterMark = o, this.highWaterMark = Math.floor(this.highWaterMark), this.finalCalled = !1, this.needDrain = !1, this.ending = !1, this.ended = !1, this.finished = !1, this.destroyed = !1;
    var P = x.decodeStrings === !1;
    this.decodeStrings = !P, this.defaultEncoding = x.defaultEncoding || "utf8", this.length = 0, this.writing = !1, this.corked = 0, this.sync = !0, this.bufferProcessing = !1, this.onwrite = function(Z) {
      ae(d, Z);
    }, this.writecb = null, this.writelen = 0, this.bufferedRequest = null, this.lastBufferedRequest = null, this.pendingcb = 0, this.prefinished = !1, this.errorEmitted = !1, this.bufferedRequestCount = 0, this.corkedRequestsFree = new M(this);
  }
  B.prototype.getBuffer = function() {
    for (var d = this.bufferedRequest, y = []; d; )
      y.push(d), d = d.next;
    return y;
  }, function() {
    try {
      Object.defineProperty(B.prototype, "buffer", {
        get: t.deprecate(function() {
          return this.getBuffer();
        }, "_writableState.buffer is deprecated. Use _writableState.getBuffer instead.", "DEP0003")
      });
    } catch (x) {
    }
  }();
  var k;
  typeof Symbol == "function" && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] == "function" ? (k = Function.prototype[Symbol.hasInstance], Object.defineProperty($, Symbol.hasInstance, {
    value: function(x) {
      return k.call(this, x) ? !0 : this !== $ ? !1 : x && x._writableState instanceof B;
    }
  })) : k = function(x) {
    return x instanceof this;
  };
  function $(x) {
    if (q = q || require_stream_duplex(), !k.call($, this) && !(this instanceof q))
      return new $(x);
    this._writableState = new B(x, this), this.writable = !0, x && (typeof x.write == "function" && (this._write = x.write), typeof x.writev == "function" && (this._writev = x.writev), typeof x.destroy == "function" && (this._destroy = x.destroy), typeof x.final == "function" && (this._final = x.final)), E.call(this);
  }
  $.prototype.pipe = function() {
    this.emit("error", new Error("Cannot pipe, not readable"));
  };
  function O(x, d) {
    var y = new Error("write after end");
    x.emit("error", y), I.nextTick(d, y);
  }
  function D(x, d, y, p) {
    var _ = !0, o = !1;
    return y === null ? o = new TypeError("May not write null values to stream") : typeof y != "string" && y !== void 0 && !d.objectMode && (o = new TypeError("Invalid non-string/buffer chunk")), o && (x.emit("error", o), I.nextTick(p, o), _ = !1), _;
  }
  $.prototype.write = function(x, d, y) {
    var p = this._writableState, _ = !1, o = !p.objectMode && u(x);
    return o && !l.isBuffer(x) && (x = w(x)), typeof d == "function" && (y = d, d = null), o ? d = "buffer" : d || (d = p.defaultEncoding), typeof y != "function" && (y = R), p.ended ? O(this, y) : (o || D(this, p, x, y)) && (p.pendingcb++, _ = W(this, p, o, x, d, y)), _;
  }, $.prototype.cork = function() {
    var x = this._writableState;
    x.corked++;
  }, $.prototype.uncork = function() {
    var x = this._writableState;
    x.corked && (x.corked--, !x.writing && !x.corked && !x.bufferProcessing && x.bufferedRequest && ce(this, x));
  }, $.prototype.setDefaultEncoding = function(d) {
    if (typeof d == "string" && (d = d.toLowerCase()), !(["hex", "utf8", "utf-8", "ascii", "binary", "base64", "ucs2", "ucs-2", "utf16le", "utf-16le", "raw"].indexOf((d + "").toLowerCase()) > -1)) throw new TypeError("Unknown encoding: " + d);
    return this._writableState.defaultEncoding = d, this;
  };
  function N(x, d, y) {
    return !x.objectMode && x.decodeStrings !== !1 && typeof d == "string" && (d = l.from(d, y)), d;
  }
  Object.defineProperty($.prototype, "writableHighWaterMark", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._writableState.highWaterMark;
    }
  });
  function W(x, d, y, p, _, o) {
    if (!y) {
      var P = N(d, p, _);
      p !== P && (y = !0, _ = "buffer", p = P);
    }
    var Z = d.objectMode ? 1 : p.length;
    d.length += Z;
    var ee = d.length < d.highWaterMark;
    if (ee || (d.needDrain = !0), d.writing || d.corked) {
      var K = d.lastBufferedRequest;
      d.lastBufferedRequest = {
        chunk: p,
        encoding: _,
        isBuf: y,
        callback: o,
        next: null
      }, K ? K.next = d.lastBufferedRequest : d.bufferedRequest = d.lastBufferedRequest, d.bufferedRequestCount += 1;
    } else
      z(x, d, !1, Z, p, _, o);
    return ee;
  }
  function z(x, d, y, p, _, o, P) {
    d.writelen = p, d.writecb = P, d.writing = !0, d.sync = !0, y ? x._writev(_, d.onwrite) : x._write(_, o, d.onwrite), d.sync = !1;
  }
  function X(x, d, y, p, _) {
    --d.pendingcb, y ? (I.nextTick(_, p), I.nextTick(e, x, d), x._writableState.errorEmitted = !0, x.emit("error", p)) : (_(p), x._writableState.errorEmitted = !0, x.emit("error", p), e(x, d));
  }
  function Q(x) {
    x.writing = !1, x.writecb = null, x.length -= x.writelen, x.writelen = 0;
  }
  function ae(x, d) {
    var y = x._writableState, p = y.sync, _ = y.writecb;
    if (Q(y), d) X(x, y, p, d, _);
    else {
      var o = H(y);
      !o && !y.corked && !y.bufferProcessing && y.bufferedRequest && ce(x, y), p ? T(fe, x, y, o, _) : fe(x, y, o, _);
    }
  }
  function fe(x, d, y, p) {
    y || te(x, d), d.pendingcb--, p(), e(x, d);
  }
  function te(x, d) {
    d.length === 0 && d.needDrain && (d.needDrain = !1, x.emit("drain"));
  }
  function ce(x, d) {
    d.bufferProcessing = !0;
    var y = d.bufferedRequest;
    if (x._writev && y && y.next) {
      var p = d.bufferedRequestCount, _ = new Array(p), o = d.corkedRequestsFree;
      o.entry = y;
      for (var P = 0, Z = !0; y; )
        _[P] = y, y.isBuf || (Z = !1), y = y.next, P += 1;
      _.allBuffers = Z, z(x, d, !0, d.length, _, "", o.finish), d.pendingcb++, d.lastBufferedRequest = null, o.next ? (d.corkedRequestsFree = o.next, o.next = null) : d.corkedRequestsFree = new M(d), d.bufferedRequestCount = 0;
    } else {
      for (; y; ) {
        var ee = y.chunk, K = y.encoding, L = y.callback, j = d.objectMode ? 1 : ee.length;
        if (z(x, d, !1, j, ee, K, L), y = y.next, d.bufferedRequestCount--, d.writing)
          break;
      }
      y === null && (d.lastBufferedRequest = null);
    }
    d.bufferedRequest = y, d.bufferProcessing = !1;
  }
  $.prototype._write = function(x, d, y) {
    y(new Error("_write() is not implemented"));
  }, $.prototype._writev = null, $.prototype.end = function(x, d, y) {
    var p = this._writableState;
    typeof x == "function" ? (y = x, x = null, d = null) : typeof d == "function" && (y = d, d = null), x != null && this.write(x, d), p.corked && (p.corked = 1, this.uncork()), p.ending || a(this, p, y);
  };
  function H(x) {
    return x.ending && x.length === 0 && x.bufferedRequest === null && !x.finished && !x.writing;
  }
  function A(x, d) {
    x._final(function(y) {
      d.pendingcb--, y && x.emit("error", y), d.prefinished = !0, x.emit("prefinish"), e(x, d);
    });
  }
  function c(x, d) {
    !d.prefinished && !d.finalCalled && (typeof x._final == "function" ? (d.pendingcb++, d.finalCalled = !0, I.nextTick(A, x, d)) : (d.prefinished = !0, x.emit("prefinish")));
  }
  function e(x, d) {
    var y = H(d);
    return y && (c(x, d), d.pendingcb === 0 && (d.finished = !0, x.emit("finish"))), y;
  }
  function a(x, d, y) {
    d.ending = !0, e(x, d), y && (d.finished ? I.nextTick(y) : x.once("finish", y)), d.ended = !0, x.writable = !1;
  }
  function v(x, d, y) {
    var p = x.entry;
    for (x.entry = null; p; ) {
      var _ = p.callback;
      d.pendingcb--, _(y), p = p.next;
    }
    d.corkedRequestsFree.next = x;
  }
  return Object.defineProperty($.prototype, "destroyed", {
    get: function() {
      return this._writableState === void 0 ? !1 : this._writableState.destroyed;
    },
    set: function(x) {
      this._writableState && (this._writableState.destroyed = x);
    }
  }), $.prototype.destroy = g.destroy, $.prototype._undestroy = g.undestroy, $.prototype._destroy = function(x, d) {
    this.end(), d(x);
  }, _stream_writable;
}
var _stream_duplex, hasRequired_stream_duplex;
function require_stream_duplex() {
  if (hasRequired_stream_duplex) return _stream_duplex;
  hasRequired_stream_duplex = 1;
  var I = requireProcessNextickArgs(), M = Object.keys || function(g) {
    var R = [];
    for (var B in g)
      R.push(B);
    return R;
  };
  _stream_duplex = b;
  var T = Object.create(requireUtil());
  T.inherits = requireInherits_browser();
  var q = require_stream_readable(), C = require_stream_writable();
  T.inherits(b, q);
  for (var t = M(C.prototype), E = 0; E < t.length; E++) {
    var l = t[E];
    b.prototype[l] || (b.prototype[l] = C.prototype[l]);
  }
  function b(g) {
    if (!(this instanceof b)) return new b(g);
    q.call(this, g), C.call(this, g), g && g.readable === !1 && (this.readable = !1), g && g.writable === !1 && (this.writable = !1), this.allowHalfOpen = !0, g && g.allowHalfOpen === !1 && (this.allowHalfOpen = !1), this.once("end", w);
  }
  Object.defineProperty(b.prototype, "writableHighWaterMark", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._writableState.highWaterMark;
    }
  });
  function w() {
    this.allowHalfOpen || this._writableState.ended || I.nextTick(u, this);
  }
  function u(g) {
    g.end();
  }
  return Object.defineProperty(b.prototype, "destroyed", {
    get: function() {
      return this._readableState === void 0 || this._writableState === void 0 ? !1 : this._readableState.destroyed && this._writableState.destroyed;
    },
    set: function(g) {
      this._readableState === void 0 || this._writableState === void 0 || (this._readableState.destroyed = g, this._writableState.destroyed = g);
    }
  }), b.prototype._destroy = function(g, R) {
    this.push(null), this.end(), I.nextTick(R, g);
  }, _stream_duplex;
}
var _stream_readable, hasRequired_stream_readable;
function require_stream_readable() {
  if (hasRequired_stream_readable) return _stream_readable;
  hasRequired_stream_readable = 1;
  var I = requireProcessNextickArgs();
  _stream_readable = N;
  var M = requireIsarray(), T;
  N.ReadableState = D, requireEvents().EventEmitter;
  var q = function(L, j) {
    return L.listeners(j).length;
  }, C = requireStreamBrowser(), t = requireSafeBuffer().Buffer, E = (typeof commonjsGlobal != "undefined" ? commonjsGlobal : typeof window != "undefined" ? window : typeof self != "undefined" ? self : {}).Uint8Array || function() {
  };
  function l(L) {
    return t.from(L);
  }
  function b(L) {
    return t.isBuffer(L) || L instanceof E;
  }
  var w = Object.create(requireUtil());
  w.inherits = requireInherits_browser();
  var u = requireUtil$1(), g = void 0;
  u && u.debuglog ? g = u.debuglog("stream") : g = function() {
  };
  var R = requireBufferList(), B = requireDestroy(), k;
  w.inherits(N, C);
  var $ = ["error", "close", "destroy", "pause", "resume"];
  function O(L, j, re) {
    if (typeof L.prependListener == "function") return L.prependListener(j, re);
    !L._events || !L._events[j] ? L.on(j, re) : M(L._events[j]) ? L._events[j].unshift(re) : L._events[j] = [re, L._events[j]];
  }
  function D(L, j) {
    T = T || require_stream_duplex(), L = L || {};
    var re = j instanceof T;
    this.objectMode = !!L.objectMode, re && (this.objectMode = this.objectMode || !!L.readableObjectMode);
    var ne = L.highWaterMark, J = L.readableHighWaterMark, G = this.objectMode ? 16 : 16 * 1024;
    ne || ne === 0 ? this.highWaterMark = ne : re && (J || J === 0) ? this.highWaterMark = J : this.highWaterMark = G, this.highWaterMark = Math.floor(this.highWaterMark), this.buffer = new R(), this.length = 0, this.pipes = null, this.pipesCount = 0, this.flowing = null, this.ended = !1, this.endEmitted = !1, this.reading = !1, this.sync = !0, this.needReadable = !1, this.emittedReadable = !1, this.readableListening = !1, this.resumeScheduled = !1, this.destroyed = !1, this.defaultEncoding = L.defaultEncoding || "utf8", this.awaitDrain = 0, this.readingMore = !1, this.decoder = null, this.encoding = null, L.encoding && (k || (k = requireString_decoder().StringDecoder), this.decoder = new k(L.encoding), this.encoding = L.encoding);
  }
  function N(L) {
    if (T = T || require_stream_duplex(), !(this instanceof N)) return new N(L);
    this._readableState = new D(L, this), this.readable = !0, L && (typeof L.read == "function" && (this._read = L.read), typeof L.destroy == "function" && (this._destroy = L.destroy)), C.call(this);
  }
  Object.defineProperty(N.prototype, "destroyed", {
    get: function() {
      return this._readableState === void 0 ? !1 : this._readableState.destroyed;
    },
    set: function(L) {
      this._readableState && (this._readableState.destroyed = L);
    }
  }), N.prototype.destroy = B.destroy, N.prototype._undestroy = B.undestroy, N.prototype._destroy = function(L, j) {
    this.push(null), j(L);
  }, N.prototype.push = function(L, j) {
    var re = this._readableState, ne;
    return re.objectMode ? ne = !0 : typeof L == "string" && (j = j || re.defaultEncoding, j !== re.encoding && (L = t.from(L, j), j = ""), ne = !0), W(this, L, j, !1, ne);
  }, N.prototype.unshift = function(L) {
    return W(this, L, null, !0, !1);
  };
  function W(L, j, re, ne, J) {
    var G = L._readableState;
    if (j === null)
      G.reading = !1, ce(L, G);
    else {
      var se;
      J || (se = X(G, j)), se ? L.emit("error", se) : G.objectMode || j && j.length > 0 ? (typeof j != "string" && !G.objectMode && Object.getPrototypeOf(j) !== t.prototype && (j = l(j)), ne ? G.endEmitted ? L.emit("error", new Error("stream.unshift() after end event")) : z(L, G, j, !0) : G.ended ? L.emit("error", new Error("stream.push() after EOF")) : (G.reading = !1, G.decoder && !re ? (j = G.decoder.write(j), G.objectMode || j.length !== 0 ? z(L, G, j, !1) : c(L, G)) : z(L, G, j, !1))) : ne || (G.reading = !1);
    }
    return Q(G);
  }
  function z(L, j, re, ne) {
    j.flowing && j.length === 0 && !j.sync ? (L.emit("data", re), L.read(0)) : (j.length += j.objectMode ? 1 : re.length, ne ? j.buffer.unshift(re) : j.buffer.push(re), j.needReadable && H(L)), c(L, j);
  }
  function X(L, j) {
    var re;
    return !b(j) && typeof j != "string" && j !== void 0 && !L.objectMode && (re = new TypeError("Invalid non-string/buffer chunk")), re;
  }
  function Q(L) {
    return !L.ended && (L.needReadable || L.length < L.highWaterMark || L.length === 0);
  }
  N.prototype.isPaused = function() {
    return this._readableState.flowing === !1;
  }, N.prototype.setEncoding = function(L) {
    return k || (k = requireString_decoder().StringDecoder), this._readableState.decoder = new k(L), this._readableState.encoding = L, this;
  };
  var ae = 8388608;
  function fe(L) {
    return L >= ae ? L = ae : (L--, L |= L >>> 1, L |= L >>> 2, L |= L >>> 4, L |= L >>> 8, L |= L >>> 16, L++), L;
  }
  function te(L, j) {
    return L <= 0 || j.length === 0 && j.ended ? 0 : j.objectMode ? 1 : L !== L ? j.flowing && j.length ? j.buffer.head.data.length : j.length : (L > j.highWaterMark && (j.highWaterMark = fe(L)), L <= j.length ? L : j.ended ? j.length : (j.needReadable = !0, 0));
  }
  N.prototype.read = function(L) {
    g("read", L), L = parseInt(L, 10);
    var j = this._readableState, re = L;
    if (L !== 0 && (j.emittedReadable = !1), L === 0 && j.needReadable && (j.length >= j.highWaterMark || j.ended))
      return g("read: emitReadable", j.length, j.ended), j.length === 0 && j.ended ? Z(this) : H(this), null;
    if (L = te(L, j), L === 0 && j.ended)
      return j.length === 0 && Z(this), null;
    var ne = j.needReadable;
    g("need readable", ne), (j.length === 0 || j.length - L < j.highWaterMark) && (ne = !0, g("length less than watermark", ne)), j.ended || j.reading ? (ne = !1, g("reading or ended", ne)) : ne && (g("do read"), j.reading = !0, j.sync = !0, j.length === 0 && (j.needReadable = !0), this._read(j.highWaterMark), j.sync = !1, j.reading || (L = te(re, j)));
    var J;
    return L > 0 ? J = p(L, j) : J = null, J === null ? (j.needReadable = !0, L = 0) : j.length -= L, j.length === 0 && (j.ended || (j.needReadable = !0), re !== L && j.ended && Z(this)), J !== null && this.emit("data", J), J;
  };
  function ce(L, j) {
    if (!j.ended) {
      if (j.decoder) {
        var re = j.decoder.end();
        re && re.length && (j.buffer.push(re), j.length += j.objectMode ? 1 : re.length);
      }
      j.ended = !0, H(L);
    }
  }
  function H(L) {
    var j = L._readableState;
    j.needReadable = !1, j.emittedReadable || (g("emitReadable", j.flowing), j.emittedReadable = !0, j.sync ? I.nextTick(A, L) : A(L));
  }
  function A(L) {
    g("emit readable"), L.emit("readable"), y(L);
  }
  function c(L, j) {
    j.readingMore || (j.readingMore = !0, I.nextTick(e, L, j));
  }
  function e(L, j) {
    for (var re = j.length; !j.reading && !j.flowing && !j.ended && j.length < j.highWaterMark && (g("maybeReadMore read 0"), L.read(0), re !== j.length); )
      re = j.length;
    j.readingMore = !1;
  }
  N.prototype._read = function(L) {
    this.emit("error", new Error("_read() is not implemented"));
  }, N.prototype.pipe = function(L, j) {
    var re = this, ne = this._readableState;
    switch (ne.pipesCount) {
      case 0:
        ne.pipes = L;
        break;
      case 1:
        ne.pipes = [ne.pipes, L];
        break;
      default:
        ne.pipes.push(L);
        break;
    }
    ne.pipesCount += 1, g("pipe count=%d opts=%j", ne.pipesCount, j);
    var J = (!j || j.end !== !1) && L !== process$1.stdout && L !== process$1.stderr, G = J ? ue : ve;
    ne.endEmitted ? I.nextTick(G) : re.once("end", G), L.on("unpipe", se);
    function se(le, ye) {
      g("onunpipe"), le === re && ye && ye.hasUnpiped === !1 && (ye.hasUnpiped = !0, F());
    }
    function ue() {
      g("onend"), L.end();
    }
    var de = a(re);
    L.on("drain", de);
    var Y = !1;
    function F() {
      g("cleanup"), L.removeListener("close", oe), L.removeListener("finish", he), L.removeListener("drain", de), L.removeListener("error", ie), L.removeListener("unpipe", se), re.removeListener("end", ue), re.removeListener("end", ve), re.removeListener("data", V), Y = !0, ne.awaitDrain && (!L._writableState || L._writableState.needDrain) && de();
    }
    var U = !1;
    re.on("data", V);
    function V(le) {
      g("ondata"), U = !1;
      var ye = L.write(le);
      ye === !1 && !U && ((ne.pipesCount === 1 && ne.pipes === L || ne.pipesCount > 1 && K(ne.pipes, L) !== -1) && !Y && (g("false write response, pause", ne.awaitDrain), ne.awaitDrain++, U = !0), re.pause());
    }
    function ie(le) {
      g("onerror", le), ve(), L.removeListener("error", ie), q(L, "error") === 0 && L.emit("error", le);
    }
    O(L, "error", ie);
    function oe() {
      L.removeListener("finish", he), ve();
    }
    L.once("close", oe);
    function he() {
      g("onfinish"), L.removeListener("close", oe), ve();
    }
    L.once("finish", he);
    function ve() {
      g("unpipe"), re.unpipe(L);
    }
    return L.emit("pipe", re), ne.flowing || (g("pipe resume"), re.resume()), L;
  };
  function a(L) {
    return function() {
      var j = L._readableState;
      g("pipeOnDrain", j.awaitDrain), j.awaitDrain && j.awaitDrain--, j.awaitDrain === 0 && q(L, "data") && (j.flowing = !0, y(L));
    };
  }
  N.prototype.unpipe = function(L) {
    var j = this._readableState, re = { hasUnpiped: !1 };
    if (j.pipesCount === 0) return this;
    if (j.pipesCount === 1)
      return L && L !== j.pipes ? this : (L || (L = j.pipes), j.pipes = null, j.pipesCount = 0, j.flowing = !1, L && L.emit("unpipe", this, re), this);
    if (!L) {
      var ne = j.pipes, J = j.pipesCount;
      j.pipes = null, j.pipesCount = 0, j.flowing = !1;
      for (var G = 0; G < J; G++)
        ne[G].emit("unpipe", this, { hasUnpiped: !1 });
      return this;
    }
    var se = K(j.pipes, L);
    return se === -1 ? this : (j.pipes.splice(se, 1), j.pipesCount -= 1, j.pipesCount === 1 && (j.pipes = j.pipes[0]), L.emit("unpipe", this, re), this);
  }, N.prototype.on = function(L, j) {
    var re = C.prototype.on.call(this, L, j);
    if (L === "data")
      this._readableState.flowing !== !1 && this.resume();
    else if (L === "readable") {
      var ne = this._readableState;
      !ne.endEmitted && !ne.readableListening && (ne.readableListening = ne.needReadable = !0, ne.emittedReadable = !1, ne.reading ? ne.length && H(this) : I.nextTick(v, this));
    }
    return re;
  }, N.prototype.addListener = N.prototype.on;
  function v(L) {
    g("readable nexttick read 0"), L.read(0);
  }
  N.prototype.resume = function() {
    var L = this._readableState;
    return L.flowing || (g("resume"), L.flowing = !0, x(this, L)), this;
  };
  function x(L, j) {
    j.resumeScheduled || (j.resumeScheduled = !0, I.nextTick(d, L, j));
  }
  function d(L, j) {
    j.reading || (g("resume read 0"), L.read(0)), j.resumeScheduled = !1, j.awaitDrain = 0, L.emit("resume"), y(L), j.flowing && !j.reading && L.read(0);
  }
  N.prototype.pause = function() {
    return g("call pause flowing=%j", this._readableState.flowing), this._readableState.flowing !== !1 && (g("pause"), this._readableState.flowing = !1, this.emit("pause")), this;
  };
  function y(L) {
    var j = L._readableState;
    for (g("flow", j.flowing); j.flowing && L.read() !== null; )
      ;
  }
  N.prototype.wrap = function(L) {
    var j = this, re = this._readableState, ne = !1;
    L.on("end", function() {
      if (g("wrapped end"), re.decoder && !re.ended) {
        var se = re.decoder.end();
        se && se.length && j.push(se);
      }
      j.push(null);
    }), L.on("data", function(se) {
      if (g("wrapped data"), re.decoder && (se = re.decoder.write(se)), !(re.objectMode && se == null) && !(!re.objectMode && (!se || !se.length))) {
        var ue = j.push(se);
        ue || (ne = !0, L.pause());
      }
    });
    for (var J in L)
      this[J] === void 0 && typeof L[J] == "function" && (this[J] = /* @__PURE__ */ function(se) {
        return function() {
          return L[se].apply(L, arguments);
        };
      }(J));
    for (var G = 0; G < $.length; G++)
      L.on($[G], this.emit.bind(this, $[G]));
    return this._read = function(se) {
      g("wrapped _read", se), ne && (ne = !1, L.resume());
    }, this;
  }, Object.defineProperty(N.prototype, "readableHighWaterMark", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._readableState.highWaterMark;
    }
  }), N._fromList = p;
  function p(L, j) {
    if (j.length === 0) return null;
    var re;
    return j.objectMode ? re = j.buffer.shift() : !L || L >= j.length ? (j.decoder ? re = j.buffer.join("") : j.buffer.length === 1 ? re = j.buffer.head.data : re = j.buffer.concat(j.length), j.buffer.clear()) : re = _(L, j.buffer, j.decoder), re;
  }
  function _(L, j, re) {
    var ne;
    return L < j.head.data.length ? (ne = j.head.data.slice(0, L), j.head.data = j.head.data.slice(L)) : L === j.head.data.length ? ne = j.shift() : ne = re ? o(L, j) : P(L, j), ne;
  }
  function o(L, j) {
    var re = j.head, ne = 1, J = re.data;
    for (L -= J.length; re = re.next; ) {
      var G = re.data, se = L > G.length ? G.length : L;
      if (se === G.length ? J += G : J += G.slice(0, L), L -= se, L === 0) {
        se === G.length ? (++ne, re.next ? j.head = re.next : j.head = j.tail = null) : (j.head = re, re.data = G.slice(se));
        break;
      }
      ++ne;
    }
    return j.length -= ne, J;
  }
  function P(L, j) {
    var re = t.allocUnsafe(L), ne = j.head, J = 1;
    for (ne.data.copy(re), L -= ne.data.length; ne = ne.next; ) {
      var G = ne.data, se = L > G.length ? G.length : L;
      if (G.copy(re, re.length - L, 0, se), L -= se, L === 0) {
        se === G.length ? (++J, ne.next ? j.head = ne.next : j.head = j.tail = null) : (j.head = ne, ne.data = G.slice(se));
        break;
      }
      ++J;
    }
    return j.length -= J, re;
  }
  function Z(L) {
    var j = L._readableState;
    if (j.length > 0) throw new Error('"endReadable()" called on non-empty stream');
    j.endEmitted || (j.ended = !0, I.nextTick(ee, j, L));
  }
  function ee(L, j) {
    !L.endEmitted && L.length === 0 && (L.endEmitted = !0, j.readable = !1, j.emit("end"));
  }
  function K(L, j) {
    for (var re = 0, ne = L.length; re < ne; re++)
      if (L[re] === j) return re;
    return -1;
  }
  return _stream_readable;
}
var _stream_transform, hasRequired_stream_transform;
function require_stream_transform() {
  if (hasRequired_stream_transform) return _stream_transform;
  hasRequired_stream_transform = 1, _stream_transform = q;
  var I = require_stream_duplex(), M = Object.create(requireUtil());
  M.inherits = requireInherits_browser(), M.inherits(q, I);
  function T(E, l) {
    var b = this._transformState;
    b.transforming = !1;
    var w = b.writecb;
    if (!w)
      return this.emit("error", new Error("write callback called multiple times"));
    b.writechunk = null, b.writecb = null, l != null && this.push(l), w(E);
    var u = this._readableState;
    u.reading = !1, (u.needReadable || u.length < u.highWaterMark) && this._read(u.highWaterMark);
  }
  function q(E) {
    if (!(this instanceof q)) return new q(E);
    I.call(this, E), this._transformState = {
      afterTransform: T.bind(this),
      needTransform: !1,
      transforming: !1,
      writecb: null,
      writechunk: null,
      writeencoding: null
    }, this._readableState.needReadable = !0, this._readableState.sync = !1, E && (typeof E.transform == "function" && (this._transform = E.transform), typeof E.flush == "function" && (this._flush = E.flush)), this.on("prefinish", C);
  }
  function C() {
    var E = this;
    typeof this._flush == "function" ? this._flush(function(l, b) {
      t(E, l, b);
    }) : t(this, null, null);
  }
  q.prototype.push = function(E, l) {
    return this._transformState.needTransform = !1, I.prototype.push.call(this, E, l);
  }, q.prototype._transform = function(E, l, b) {
    throw new Error("_transform() is not implemented");
  }, q.prototype._write = function(E, l, b) {
    var w = this._transformState;
    if (w.writecb = b, w.writechunk = E, w.writeencoding = l, !w.transforming) {
      var u = this._readableState;
      (w.needTransform || u.needReadable || u.length < u.highWaterMark) && this._read(u.highWaterMark);
    }
  }, q.prototype._read = function(E) {
    var l = this._transformState;
    l.writechunk !== null && l.writecb && !l.transforming ? (l.transforming = !0, this._transform(l.writechunk, l.writeencoding, l.afterTransform)) : l.needTransform = !0;
  }, q.prototype._destroy = function(E, l) {
    var b = this;
    I.prototype._destroy.call(this, E, function(w) {
      l(w), b.emit("close");
    });
  };
  function t(E, l, b) {
    if (l) return E.emit("error", l);
    if (b != null && E.push(b), E._writableState.length) throw new Error("Calling transform done when ws.length != 0");
    if (E._transformState.transforming) throw new Error("Calling transform done when still transforming");
    return E.push(null);
  }
  return _stream_transform;
}
var _stream_passthrough, hasRequired_stream_passthrough;
function require_stream_passthrough() {
  if (hasRequired_stream_passthrough) return _stream_passthrough;
  hasRequired_stream_passthrough = 1, _stream_passthrough = T;
  var I = require_stream_transform(), M = Object.create(requireUtil());
  M.inherits = requireInherits_browser(), M.inherits(T, I);
  function T(q) {
    if (!(this instanceof T)) return new T(q);
    I.call(this, q);
  }
  return T.prototype._transform = function(q, C, t) {
    t(null, q);
  }, _stream_passthrough;
}
var hasRequiredReadableBrowser;
function requireReadableBrowser() {
  return hasRequiredReadableBrowser || (hasRequiredReadableBrowser = 1, function(I, M) {
    M = I.exports = require_stream_readable(), M.Stream = M, M.Readable = M, M.Writable = require_stream_writable(), M.Duplex = require_stream_duplex(), M.Transform = require_stream_transform(), M.PassThrough = require_stream_passthrough();
  }(readableBrowser, readableBrowser.exports)), readableBrowser.exports;
}
var sign = { exports: {} }, bn$1 = { exports: {} };
bn$1.exports;
var hasRequiredBn$1;
function requireBn$1() {
  return hasRequiredBn$1 || (hasRequiredBn$1 = 1, function(I) {
    (function(M, T) {
      function q(c, e) {
        if (!c) throw new Error(e || "Assertion failed");
      }
      function C(c, e) {
        c.super_ = e;
        var a = function() {
        };
        a.prototype = e.prototype, c.prototype = new a(), c.prototype.constructor = c;
      }
      function t(c, e, a) {
        if (t.isBN(c))
          return c;
        this.negative = 0, this.words = null, this.length = 0, this.red = null, c !== null && ((e === "le" || e === "be") && (a = e, e = 10), this._init(c || 0, e || 10, a || "be"));
      }
      typeof M == "object" ? M.exports = t : T.BN = t, t.BN = t, t.wordSize = 26;
      var E;
      try {
        typeof window != "undefined" && typeof window.Buffer != "undefined" ? E = window.Buffer : E = requireBuffer$1().Buffer;
      } catch (c) {
      }
      t.isBN = function(e) {
        return e instanceof t ? !0 : e !== null && typeof e == "object" && e.constructor.wordSize === t.wordSize && Array.isArray(e.words);
      }, t.max = function(e, a) {
        return e.cmp(a) > 0 ? e : a;
      }, t.min = function(e, a) {
        return e.cmp(a) < 0 ? e : a;
      }, t.prototype._init = function(e, a, v) {
        if (typeof e == "number")
          return this._initNumber(e, a, v);
        if (typeof e == "object")
          return this._initArray(e, a, v);
        a === "hex" && (a = 16), q(a === (a | 0) && a >= 2 && a <= 36), e = e.toString().replace(/\s+/g, "");
        var x = 0;
        e[0] === "-" && (x++, this.negative = 1), x < e.length && (a === 16 ? this._parseHex(e, x, v) : (this._parseBase(e, a, x), v === "le" && this._initArray(this.toArray(), a, v)));
      }, t.prototype._initNumber = function(e, a, v) {
        e < 0 && (this.negative = 1, e = -e), e < 67108864 ? (this.words = [e & 67108863], this.length = 1) : e < 4503599627370496 ? (this.words = [
          e & 67108863,
          e / 67108864 & 67108863
        ], this.length = 2) : (q(e < 9007199254740992), this.words = [
          e & 67108863,
          e / 67108864 & 67108863,
          1
        ], this.length = 3), v === "le" && this._initArray(this.toArray(), a, v);
      }, t.prototype._initArray = function(e, a, v) {
        if (q(typeof e.length == "number"), e.length <= 0)
          return this.words = [0], this.length = 1, this;
        this.length = Math.ceil(e.length / 3), this.words = new Array(this.length);
        for (var x = 0; x < this.length; x++)
          this.words[x] = 0;
        var d, y, p = 0;
        if (v === "be")
          for (x = e.length - 1, d = 0; x >= 0; x -= 3)
            y = e[x] | e[x - 1] << 8 | e[x - 2] << 16, this.words[d] |= y << p & 67108863, this.words[d + 1] = y >>> 26 - p & 67108863, p += 24, p >= 26 && (p -= 26, d++);
        else if (v === "le")
          for (x = 0, d = 0; x < e.length; x += 3)
            y = e[x] | e[x + 1] << 8 | e[x + 2] << 16, this.words[d] |= y << p & 67108863, this.words[d + 1] = y >>> 26 - p & 67108863, p += 24, p >= 26 && (p -= 26, d++);
        return this._strip();
      };
      function l(c, e) {
        var a = c.charCodeAt(e);
        if (a >= 48 && a <= 57)
          return a - 48;
        if (a >= 65 && a <= 70)
          return a - 55;
        if (a >= 97 && a <= 102)
          return a - 87;
        q(!1, "Invalid character in " + c);
      }
      function b(c, e, a) {
        var v = l(c, a);
        return a - 1 >= e && (v |= l(c, a - 1) << 4), v;
      }
      t.prototype._parseHex = function(e, a, v) {
        this.length = Math.ceil((e.length - a) / 6), this.words = new Array(this.length);
        for (var x = 0; x < this.length; x++)
          this.words[x] = 0;
        var d = 0, y = 0, p;
        if (v === "be")
          for (x = e.length - 1; x >= a; x -= 2)
            p = b(e, a, x) << d, this.words[y] |= p & 67108863, d >= 18 ? (d -= 18, y += 1, this.words[y] |= p >>> 26) : d += 8;
        else {
          var _ = e.length - a;
          for (x = _ % 2 === 0 ? a + 1 : a; x < e.length; x += 2)
            p = b(e, a, x) << d, this.words[y] |= p & 67108863, d >= 18 ? (d -= 18, y += 1, this.words[y] |= p >>> 26) : d += 8;
        }
        this._strip();
      };
      function w(c, e, a, v) {
        for (var x = 0, d = 0, y = Math.min(c.length, a), p = e; p < y; p++) {
          var _ = c.charCodeAt(p) - 48;
          x *= v, _ >= 49 ? d = _ - 49 + 10 : _ >= 17 ? d = _ - 17 + 10 : d = _, q(_ >= 0 && d < v, "Invalid character"), x += d;
        }
        return x;
      }
      t.prototype._parseBase = function(e, a, v) {
        this.words = [0], this.length = 1;
        for (var x = 0, d = 1; d <= 67108863; d *= a)
          x++;
        x--, d = d / a | 0;
        for (var y = e.length - v, p = y % x, _ = Math.min(y, y - p) + v, o = 0, P = v; P < _; P += x)
          o = w(e, P, P + x, a), this.imuln(d), this.words[0] + o < 67108864 ? this.words[0] += o : this._iaddn(o);
        if (p !== 0) {
          var Z = 1;
          for (o = w(e, P, e.length, a), P = 0; P < p; P++)
            Z *= a;
          this.imuln(Z), this.words[0] + o < 67108864 ? this.words[0] += o : this._iaddn(o);
        }
        this._strip();
      }, t.prototype.copy = function(e) {
        e.words = new Array(this.length);
        for (var a = 0; a < this.length; a++)
          e.words[a] = this.words[a];
        e.length = this.length, e.negative = this.negative, e.red = this.red;
      };
      function u(c, e) {
        c.words = e.words, c.length = e.length, c.negative = e.negative, c.red = e.red;
      }
      if (t.prototype._move = function(e) {
        u(e, this);
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
          t.prototype[Symbol.for("nodejs.util.inspect.custom")] = g;
        } catch (c) {
          t.prototype.inspect = g;
        }
      else
        t.prototype.inspect = g;
      function g() {
        return (this.red ? "<BN-R: " : "<BN: ") + this.toString(16) + ">";
      }
      var R = [
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
      ], B = [
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
      ], k = [
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
      t.prototype.toString = function(e, a) {
        e = e || 10, a = a | 0 || 1;
        var v;
        if (e === 16 || e === "hex") {
          v = "";
          for (var x = 0, d = 0, y = 0; y < this.length; y++) {
            var p = this.words[y], _ = ((p << x | d) & 16777215).toString(16);
            d = p >>> 24 - x & 16777215, x += 2, x >= 26 && (x -= 26, y--), d !== 0 || y !== this.length - 1 ? v = R[6 - _.length] + _ + v : v = _ + v;
          }
          for (d !== 0 && (v = d.toString(16) + v); v.length % a !== 0; )
            v = "0" + v;
          return this.negative !== 0 && (v = "-" + v), v;
        }
        if (e === (e | 0) && e >= 2 && e <= 36) {
          var o = B[e], P = k[e];
          v = "";
          var Z = this.clone();
          for (Z.negative = 0; !Z.isZero(); ) {
            var ee = Z.modrn(P).toString(e);
            Z = Z.idivn(P), Z.isZero() ? v = ee + v : v = R[o - ee.length] + ee + v;
          }
          for (this.isZero() && (v = "0" + v); v.length % a !== 0; )
            v = "0" + v;
          return this.negative !== 0 && (v = "-" + v), v;
        }
        q(!1, "Base should be between 2 and 36");
      }, t.prototype.toNumber = function() {
        var e = this.words[0];
        return this.length === 2 ? e += this.words[1] * 67108864 : this.length === 3 && this.words[2] === 1 ? e += 4503599627370496 + this.words[1] * 67108864 : this.length > 2 && q(!1, "Number can only safely store up to 53 bits"), this.negative !== 0 ? -e : e;
      }, t.prototype.toJSON = function() {
        return this.toString(16, 2);
      }, E && (t.prototype.toBuffer = function(e, a) {
        return this.toArrayLike(E, e, a);
      }), t.prototype.toArray = function(e, a) {
        return this.toArrayLike(Array, e, a);
      };
      var $ = function(e, a) {
        return e.allocUnsafe ? e.allocUnsafe(a) : new e(a);
      };
      t.prototype.toArrayLike = function(e, a, v) {
        this._strip();
        var x = this.byteLength(), d = v || Math.max(1, x);
        q(x <= d, "byte array longer than desired length"), q(d > 0, "Requested array length <= 0");
        var y = $(e, d), p = a === "le" ? "LE" : "BE";
        return this["_toArrayLike" + p](y, x), y;
      }, t.prototype._toArrayLikeLE = function(e, a) {
        for (var v = 0, x = 0, d = 0, y = 0; d < this.length; d++) {
          var p = this.words[d] << y | x;
          e[v++] = p & 255, v < e.length && (e[v++] = p >> 8 & 255), v < e.length && (e[v++] = p >> 16 & 255), y === 6 ? (v < e.length && (e[v++] = p >> 24 & 255), x = 0, y = 0) : (x = p >>> 24, y += 2);
        }
        if (v < e.length)
          for (e[v++] = x; v < e.length; )
            e[v++] = 0;
      }, t.prototype._toArrayLikeBE = function(e, a) {
        for (var v = e.length - 1, x = 0, d = 0, y = 0; d < this.length; d++) {
          var p = this.words[d] << y | x;
          e[v--] = p & 255, v >= 0 && (e[v--] = p >> 8 & 255), v >= 0 && (e[v--] = p >> 16 & 255), y === 6 ? (v >= 0 && (e[v--] = p >> 24 & 255), x = 0, y = 0) : (x = p >>> 24, y += 2);
        }
        if (v >= 0)
          for (e[v--] = x; v >= 0; )
            e[v--] = 0;
      }, Math.clz32 ? t.prototype._countBits = function(e) {
        return 32 - Math.clz32(e);
      } : t.prototype._countBits = function(e) {
        var a = e, v = 0;
        return a >= 4096 && (v += 13, a >>>= 13), a >= 64 && (v += 7, a >>>= 7), a >= 8 && (v += 4, a >>>= 4), a >= 2 && (v += 2, a >>>= 2), v + a;
      }, t.prototype._zeroBits = function(e) {
        if (e === 0) return 26;
        var a = e, v = 0;
        return a & 8191 || (v += 13, a >>>= 13), a & 127 || (v += 7, a >>>= 7), a & 15 || (v += 4, a >>>= 4), a & 3 || (v += 2, a >>>= 2), a & 1 || v++, v;
      }, t.prototype.bitLength = function() {
        var e = this.words[this.length - 1], a = this._countBits(e);
        return (this.length - 1) * 26 + a;
      };
      function O(c) {
        for (var e = new Array(c.bitLength()), a = 0; a < e.length; a++) {
          var v = a / 26 | 0, x = a % 26;
          e[a] = c.words[v] >>> x & 1;
        }
        return e;
      }
      t.prototype.zeroBits = function() {
        if (this.isZero()) return 0;
        for (var e = 0, a = 0; a < this.length; a++) {
          var v = this._zeroBits(this.words[a]);
          if (e += v, v !== 26) break;
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
        for (var a = 0; a < e.length; a++)
          this.words[a] = this.words[a] | e.words[a];
        return this._strip();
      }, t.prototype.ior = function(e) {
        return q((this.negative | e.negative) === 0), this.iuor(e);
      }, t.prototype.or = function(e) {
        return this.length > e.length ? this.clone().ior(e) : e.clone().ior(this);
      }, t.prototype.uor = function(e) {
        return this.length > e.length ? this.clone().iuor(e) : e.clone().iuor(this);
      }, t.prototype.iuand = function(e) {
        var a;
        this.length > e.length ? a = e : a = this;
        for (var v = 0; v < a.length; v++)
          this.words[v] = this.words[v] & e.words[v];
        return this.length = a.length, this._strip();
      }, t.prototype.iand = function(e) {
        return q((this.negative | e.negative) === 0), this.iuand(e);
      }, t.prototype.and = function(e) {
        return this.length > e.length ? this.clone().iand(e) : e.clone().iand(this);
      }, t.prototype.uand = function(e) {
        return this.length > e.length ? this.clone().iuand(e) : e.clone().iuand(this);
      }, t.prototype.iuxor = function(e) {
        var a, v;
        this.length > e.length ? (a = this, v = e) : (a = e, v = this);
        for (var x = 0; x < v.length; x++)
          this.words[x] = a.words[x] ^ v.words[x];
        if (this !== a)
          for (; x < a.length; x++)
            this.words[x] = a.words[x];
        return this.length = a.length, this._strip();
      }, t.prototype.ixor = function(e) {
        return q((this.negative | e.negative) === 0), this.iuxor(e);
      }, t.prototype.xor = function(e) {
        return this.length > e.length ? this.clone().ixor(e) : e.clone().ixor(this);
      }, t.prototype.uxor = function(e) {
        return this.length > e.length ? this.clone().iuxor(e) : e.clone().iuxor(this);
      }, t.prototype.inotn = function(e) {
        q(typeof e == "number" && e >= 0);
        var a = Math.ceil(e / 26) | 0, v = e % 26;
        this._expand(a), v > 0 && a--;
        for (var x = 0; x < a; x++)
          this.words[x] = ~this.words[x] & 67108863;
        return v > 0 && (this.words[x] = ~this.words[x] & 67108863 >> 26 - v), this._strip();
      }, t.prototype.notn = function(e) {
        return this.clone().inotn(e);
      }, t.prototype.setn = function(e, a) {
        q(typeof e == "number" && e >= 0);
        var v = e / 26 | 0, x = e % 26;
        return this._expand(v + 1), a ? this.words[v] = this.words[v] | 1 << x : this.words[v] = this.words[v] & ~(1 << x), this._strip();
      }, t.prototype.iadd = function(e) {
        var a;
        if (this.negative !== 0 && e.negative === 0)
          return this.negative = 0, a = this.isub(e), this.negative ^= 1, this._normSign();
        if (this.negative === 0 && e.negative !== 0)
          return e.negative = 0, a = this.isub(e), e.negative = 1, a._normSign();
        var v, x;
        this.length > e.length ? (v = this, x = e) : (v = e, x = this);
        for (var d = 0, y = 0; y < x.length; y++)
          a = (v.words[y] | 0) + (x.words[y] | 0) + d, this.words[y] = a & 67108863, d = a >>> 26;
        for (; d !== 0 && y < v.length; y++)
          a = (v.words[y] | 0) + d, this.words[y] = a & 67108863, d = a >>> 26;
        if (this.length = v.length, d !== 0)
          this.words[this.length] = d, this.length++;
        else if (v !== this)
          for (; y < v.length; y++)
            this.words[y] = v.words[y];
        return this;
      }, t.prototype.add = function(e) {
        var a;
        return e.negative !== 0 && this.negative === 0 ? (e.negative = 0, a = this.sub(e), e.negative ^= 1, a) : e.negative === 0 && this.negative !== 0 ? (this.negative = 0, a = e.sub(this), this.negative = 1, a) : this.length > e.length ? this.clone().iadd(e) : e.clone().iadd(this);
      }, t.prototype.isub = function(e) {
        if (e.negative !== 0) {
          e.negative = 0;
          var a = this.iadd(e);
          return e.negative = 1, a._normSign();
        } else if (this.negative !== 0)
          return this.negative = 0, this.iadd(e), this.negative = 1, this._normSign();
        var v = this.cmp(e);
        if (v === 0)
          return this.negative = 0, this.length = 1, this.words[0] = 0, this;
        var x, d;
        v > 0 ? (x = this, d = e) : (x = e, d = this);
        for (var y = 0, p = 0; p < d.length; p++)
          a = (x.words[p] | 0) - (d.words[p] | 0) + y, y = a >> 26, this.words[p] = a & 67108863;
        for (; y !== 0 && p < x.length; p++)
          a = (x.words[p] | 0) + y, y = a >> 26, this.words[p] = a & 67108863;
        if (y === 0 && p < x.length && x !== this)
          for (; p < x.length; p++)
            this.words[p] = x.words[p];
        return this.length = Math.max(this.length, p), x !== this && (this.negative = 1), this._strip();
      }, t.prototype.sub = function(e) {
        return this.clone().isub(e);
      };
      function D(c, e, a) {
        a.negative = e.negative ^ c.negative;
        var v = c.length + e.length | 0;
        a.length = v, v = v - 1 | 0;
        var x = c.words[0] | 0, d = e.words[0] | 0, y = x * d, p = y & 67108863, _ = y / 67108864 | 0;
        a.words[0] = p;
        for (var o = 1; o < v; o++) {
          for (var P = _ >>> 26, Z = _ & 67108863, ee = Math.min(o, e.length - 1), K = Math.max(0, o - c.length + 1); K <= ee; K++) {
            var L = o - K | 0;
            x = c.words[L] | 0, d = e.words[K] | 0, y = x * d + Z, P += y / 67108864 | 0, Z = y & 67108863;
          }
          a.words[o] = Z | 0, _ = P | 0;
        }
        return _ !== 0 ? a.words[o] = _ | 0 : a.length--, a._strip();
      }
      var N = function(e, a, v) {
        var x = e.words, d = a.words, y = v.words, p = 0, _, o, P, Z = x[0] | 0, ee = Z & 8191, K = Z >>> 13, L = x[1] | 0, j = L & 8191, re = L >>> 13, ne = x[2] | 0, J = ne & 8191, G = ne >>> 13, se = x[3] | 0, ue = se & 8191, de = se >>> 13, Y = x[4] | 0, F = Y & 8191, U = Y >>> 13, V = x[5] | 0, ie = V & 8191, oe = V >>> 13, he = x[6] | 0, ve = he & 8191, le = he >>> 13, ye = x[7] | 0, be = ye & 8191, pe = ye >>> 13, He = x[8] | 0, Ie = He & 8191, me = He >>> 13, ze = x[9] | 0, Pe = ze & 8191, ge = ze >>> 13, We = d[0] | 0, Ce = We & 8191, we = We >>> 13, Ke = d[1] | 0, $e = Ke & 8191, xe = Ke >>> 13, Ge = d[2] | 0, De = Ge & 8191, _e = Ge >>> 13, Ve = d[3] | 0, Oe = Ve & 8191, Me = Ve >>> 13, Je = d[4] | 0, Le = Je & 8191, Se = Je >>> 13, Ze = d[5] | 0, Fe = Ze & 8191, qe = Ze >>> 13, Xe = d[6] | 0, Ne = Xe & 8191, Ee = Xe >>> 13, Ye = d[7] | 0, Ue = Ye & 8191, Re = Ye >>> 13, Qe = d[8] | 0, je = Qe & 8191, Ae = Qe >>> 13, er = d[9] | 0, Te = er & 8191, ke = er >>> 13;
        v.negative = e.negative ^ a.negative, v.length = 19, _ = Math.imul(ee, Ce), o = Math.imul(ee, we), o = o + Math.imul(K, Ce) | 0, P = Math.imul(K, we);
        var rr = (p + _ | 0) + ((o & 8191) << 13) | 0;
        p = (P + (o >>> 13) | 0) + (rr >>> 26) | 0, rr &= 67108863, _ = Math.imul(j, Ce), o = Math.imul(j, we), o = o + Math.imul(re, Ce) | 0, P = Math.imul(re, we), _ = _ + Math.imul(ee, $e) | 0, o = o + Math.imul(ee, xe) | 0, o = o + Math.imul(K, $e) | 0, P = P + Math.imul(K, xe) | 0;
        var tr = (p + _ | 0) + ((o & 8191) << 13) | 0;
        p = (P + (o >>> 13) | 0) + (tr >>> 26) | 0, tr &= 67108863, _ = Math.imul(J, Ce), o = Math.imul(J, we), o = o + Math.imul(G, Ce) | 0, P = Math.imul(G, we), _ = _ + Math.imul(j, $e) | 0, o = o + Math.imul(j, xe) | 0, o = o + Math.imul(re, $e) | 0, P = P + Math.imul(re, xe) | 0, _ = _ + Math.imul(ee, De) | 0, o = o + Math.imul(ee, _e) | 0, o = o + Math.imul(K, De) | 0, P = P + Math.imul(K, _e) | 0;
        var ir = (p + _ | 0) + ((o & 8191) << 13) | 0;
        p = (P + (o >>> 13) | 0) + (ir >>> 26) | 0, ir &= 67108863, _ = Math.imul(ue, Ce), o = Math.imul(ue, we), o = o + Math.imul(de, Ce) | 0, P = Math.imul(de, we), _ = _ + Math.imul(J, $e) | 0, o = o + Math.imul(J, xe) | 0, o = o + Math.imul(G, $e) | 0, P = P + Math.imul(G, xe) | 0, _ = _ + Math.imul(j, De) | 0, o = o + Math.imul(j, _e) | 0, o = o + Math.imul(re, De) | 0, P = P + Math.imul(re, _e) | 0, _ = _ + Math.imul(ee, Oe) | 0, o = o + Math.imul(ee, Me) | 0, o = o + Math.imul(K, Oe) | 0, P = P + Math.imul(K, Me) | 0;
        var nr = (p + _ | 0) + ((o & 8191) << 13) | 0;
        p = (P + (o >>> 13) | 0) + (nr >>> 26) | 0, nr &= 67108863, _ = Math.imul(F, Ce), o = Math.imul(F, we), o = o + Math.imul(U, Ce) | 0, P = Math.imul(U, we), _ = _ + Math.imul(ue, $e) | 0, o = o + Math.imul(ue, xe) | 0, o = o + Math.imul(de, $e) | 0, P = P + Math.imul(de, xe) | 0, _ = _ + Math.imul(J, De) | 0, o = o + Math.imul(J, _e) | 0, o = o + Math.imul(G, De) | 0, P = P + Math.imul(G, _e) | 0, _ = _ + Math.imul(j, Oe) | 0, o = o + Math.imul(j, Me) | 0, o = o + Math.imul(re, Oe) | 0, P = P + Math.imul(re, Me) | 0, _ = _ + Math.imul(ee, Le) | 0, o = o + Math.imul(ee, Se) | 0, o = o + Math.imul(K, Le) | 0, P = P + Math.imul(K, Se) | 0;
        var ar = (p + _ | 0) + ((o & 8191) << 13) | 0;
        p = (P + (o >>> 13) | 0) + (ar >>> 26) | 0, ar &= 67108863, _ = Math.imul(ie, Ce), o = Math.imul(ie, we), o = o + Math.imul(oe, Ce) | 0, P = Math.imul(oe, we), _ = _ + Math.imul(F, $e) | 0, o = o + Math.imul(F, xe) | 0, o = o + Math.imul(U, $e) | 0, P = P + Math.imul(U, xe) | 0, _ = _ + Math.imul(ue, De) | 0, o = o + Math.imul(ue, _e) | 0, o = o + Math.imul(de, De) | 0, P = P + Math.imul(de, _e) | 0, _ = _ + Math.imul(J, Oe) | 0, o = o + Math.imul(J, Me) | 0, o = o + Math.imul(G, Oe) | 0, P = P + Math.imul(G, Me) | 0, _ = _ + Math.imul(j, Le) | 0, o = o + Math.imul(j, Se) | 0, o = o + Math.imul(re, Le) | 0, P = P + Math.imul(re, Se) | 0, _ = _ + Math.imul(ee, Fe) | 0, o = o + Math.imul(ee, qe) | 0, o = o + Math.imul(K, Fe) | 0, P = P + Math.imul(K, qe) | 0;
        var fr = (p + _ | 0) + ((o & 8191) << 13) | 0;
        p = (P + (o >>> 13) | 0) + (fr >>> 26) | 0, fr &= 67108863, _ = Math.imul(ve, Ce), o = Math.imul(ve, we), o = o + Math.imul(le, Ce) | 0, P = Math.imul(le, we), _ = _ + Math.imul(ie, $e) | 0, o = o + Math.imul(ie, xe) | 0, o = o + Math.imul(oe, $e) | 0, P = P + Math.imul(oe, xe) | 0, _ = _ + Math.imul(F, De) | 0, o = o + Math.imul(F, _e) | 0, o = o + Math.imul(U, De) | 0, P = P + Math.imul(U, _e) | 0, _ = _ + Math.imul(ue, Oe) | 0, o = o + Math.imul(ue, Me) | 0, o = o + Math.imul(de, Oe) | 0, P = P + Math.imul(de, Me) | 0, _ = _ + Math.imul(J, Le) | 0, o = o + Math.imul(J, Se) | 0, o = o + Math.imul(G, Le) | 0, P = P + Math.imul(G, Se) | 0, _ = _ + Math.imul(j, Fe) | 0, o = o + Math.imul(j, qe) | 0, o = o + Math.imul(re, Fe) | 0, P = P + Math.imul(re, qe) | 0, _ = _ + Math.imul(ee, Ne) | 0, o = o + Math.imul(ee, Ee) | 0, o = o + Math.imul(K, Ne) | 0, P = P + Math.imul(K, Ee) | 0;
        var sr = (p + _ | 0) + ((o & 8191) << 13) | 0;
        p = (P + (o >>> 13) | 0) + (sr >>> 26) | 0, sr &= 67108863, _ = Math.imul(be, Ce), o = Math.imul(be, we), o = o + Math.imul(pe, Ce) | 0, P = Math.imul(pe, we), _ = _ + Math.imul(ve, $e) | 0, o = o + Math.imul(ve, xe) | 0, o = o + Math.imul(le, $e) | 0, P = P + Math.imul(le, xe) | 0, _ = _ + Math.imul(ie, De) | 0, o = o + Math.imul(ie, _e) | 0, o = o + Math.imul(oe, De) | 0, P = P + Math.imul(oe, _e) | 0, _ = _ + Math.imul(F, Oe) | 0, o = o + Math.imul(F, Me) | 0, o = o + Math.imul(U, Oe) | 0, P = P + Math.imul(U, Me) | 0, _ = _ + Math.imul(ue, Le) | 0, o = o + Math.imul(ue, Se) | 0, o = o + Math.imul(de, Le) | 0, P = P + Math.imul(de, Se) | 0, _ = _ + Math.imul(J, Fe) | 0, o = o + Math.imul(J, qe) | 0, o = o + Math.imul(G, Fe) | 0, P = P + Math.imul(G, qe) | 0, _ = _ + Math.imul(j, Ne) | 0, o = o + Math.imul(j, Ee) | 0, o = o + Math.imul(re, Ne) | 0, P = P + Math.imul(re, Ee) | 0, _ = _ + Math.imul(ee, Ue) | 0, o = o + Math.imul(ee, Re) | 0, o = o + Math.imul(K, Ue) | 0, P = P + Math.imul(K, Re) | 0;
        var or = (p + _ | 0) + ((o & 8191) << 13) | 0;
        p = (P + (o >>> 13) | 0) + (or >>> 26) | 0, or &= 67108863, _ = Math.imul(Ie, Ce), o = Math.imul(Ie, we), o = o + Math.imul(me, Ce) | 0, P = Math.imul(me, we), _ = _ + Math.imul(be, $e) | 0, o = o + Math.imul(be, xe) | 0, o = o + Math.imul(pe, $e) | 0, P = P + Math.imul(pe, xe) | 0, _ = _ + Math.imul(ve, De) | 0, o = o + Math.imul(ve, _e) | 0, o = o + Math.imul(le, De) | 0, P = P + Math.imul(le, _e) | 0, _ = _ + Math.imul(ie, Oe) | 0, o = o + Math.imul(ie, Me) | 0, o = o + Math.imul(oe, Oe) | 0, P = P + Math.imul(oe, Me) | 0, _ = _ + Math.imul(F, Le) | 0, o = o + Math.imul(F, Se) | 0, o = o + Math.imul(U, Le) | 0, P = P + Math.imul(U, Se) | 0, _ = _ + Math.imul(ue, Fe) | 0, o = o + Math.imul(ue, qe) | 0, o = o + Math.imul(de, Fe) | 0, P = P + Math.imul(de, qe) | 0, _ = _ + Math.imul(J, Ne) | 0, o = o + Math.imul(J, Ee) | 0, o = o + Math.imul(G, Ne) | 0, P = P + Math.imul(G, Ee) | 0, _ = _ + Math.imul(j, Ue) | 0, o = o + Math.imul(j, Re) | 0, o = o + Math.imul(re, Ue) | 0, P = P + Math.imul(re, Re) | 0, _ = _ + Math.imul(ee, je) | 0, o = o + Math.imul(ee, Ae) | 0, o = o + Math.imul(K, je) | 0, P = P + Math.imul(K, Ae) | 0;
        var ur = (p + _ | 0) + ((o & 8191) << 13) | 0;
        p = (P + (o >>> 13) | 0) + (ur >>> 26) | 0, ur &= 67108863, _ = Math.imul(Pe, Ce), o = Math.imul(Pe, we), o = o + Math.imul(ge, Ce) | 0, P = Math.imul(ge, we), _ = _ + Math.imul(Ie, $e) | 0, o = o + Math.imul(Ie, xe) | 0, o = o + Math.imul(me, $e) | 0, P = P + Math.imul(me, xe) | 0, _ = _ + Math.imul(be, De) | 0, o = o + Math.imul(be, _e) | 0, o = o + Math.imul(pe, De) | 0, P = P + Math.imul(pe, _e) | 0, _ = _ + Math.imul(ve, Oe) | 0, o = o + Math.imul(ve, Me) | 0, o = o + Math.imul(le, Oe) | 0, P = P + Math.imul(le, Me) | 0, _ = _ + Math.imul(ie, Le) | 0, o = o + Math.imul(ie, Se) | 0, o = o + Math.imul(oe, Le) | 0, P = P + Math.imul(oe, Se) | 0, _ = _ + Math.imul(F, Fe) | 0, o = o + Math.imul(F, qe) | 0, o = o + Math.imul(U, Fe) | 0, P = P + Math.imul(U, qe) | 0, _ = _ + Math.imul(ue, Ne) | 0, o = o + Math.imul(ue, Ee) | 0, o = o + Math.imul(de, Ne) | 0, P = P + Math.imul(de, Ee) | 0, _ = _ + Math.imul(J, Ue) | 0, o = o + Math.imul(J, Re) | 0, o = o + Math.imul(G, Ue) | 0, P = P + Math.imul(G, Re) | 0, _ = _ + Math.imul(j, je) | 0, o = o + Math.imul(j, Ae) | 0, o = o + Math.imul(re, je) | 0, P = P + Math.imul(re, Ae) | 0, _ = _ + Math.imul(ee, Te) | 0, o = o + Math.imul(ee, ke) | 0, o = o + Math.imul(K, Te) | 0, P = P + Math.imul(K, ke) | 0;
        var hr = (p + _ | 0) + ((o & 8191) << 13) | 0;
        p = (P + (o >>> 13) | 0) + (hr >>> 26) | 0, hr &= 67108863, _ = Math.imul(Pe, $e), o = Math.imul(Pe, xe), o = o + Math.imul(ge, $e) | 0, P = Math.imul(ge, xe), _ = _ + Math.imul(Ie, De) | 0, o = o + Math.imul(Ie, _e) | 0, o = o + Math.imul(me, De) | 0, P = P + Math.imul(me, _e) | 0, _ = _ + Math.imul(be, Oe) | 0, o = o + Math.imul(be, Me) | 0, o = o + Math.imul(pe, Oe) | 0, P = P + Math.imul(pe, Me) | 0, _ = _ + Math.imul(ve, Le) | 0, o = o + Math.imul(ve, Se) | 0, o = o + Math.imul(le, Le) | 0, P = P + Math.imul(le, Se) | 0, _ = _ + Math.imul(ie, Fe) | 0, o = o + Math.imul(ie, qe) | 0, o = o + Math.imul(oe, Fe) | 0, P = P + Math.imul(oe, qe) | 0, _ = _ + Math.imul(F, Ne) | 0, o = o + Math.imul(F, Ee) | 0, o = o + Math.imul(U, Ne) | 0, P = P + Math.imul(U, Ee) | 0, _ = _ + Math.imul(ue, Ue) | 0, o = o + Math.imul(ue, Re) | 0, o = o + Math.imul(de, Ue) | 0, P = P + Math.imul(de, Re) | 0, _ = _ + Math.imul(J, je) | 0, o = o + Math.imul(J, Ae) | 0, o = o + Math.imul(G, je) | 0, P = P + Math.imul(G, Ae) | 0, _ = _ + Math.imul(j, Te) | 0, o = o + Math.imul(j, ke) | 0, o = o + Math.imul(re, Te) | 0, P = P + Math.imul(re, ke) | 0;
        var cr = (p + _ | 0) + ((o & 8191) << 13) | 0;
        p = (P + (o >>> 13) | 0) + (cr >>> 26) | 0, cr &= 67108863, _ = Math.imul(Pe, De), o = Math.imul(Pe, _e), o = o + Math.imul(ge, De) | 0, P = Math.imul(ge, _e), _ = _ + Math.imul(Ie, Oe) | 0, o = o + Math.imul(Ie, Me) | 0, o = o + Math.imul(me, Oe) | 0, P = P + Math.imul(me, Me) | 0, _ = _ + Math.imul(be, Le) | 0, o = o + Math.imul(be, Se) | 0, o = o + Math.imul(pe, Le) | 0, P = P + Math.imul(pe, Se) | 0, _ = _ + Math.imul(ve, Fe) | 0, o = o + Math.imul(ve, qe) | 0, o = o + Math.imul(le, Fe) | 0, P = P + Math.imul(le, qe) | 0, _ = _ + Math.imul(ie, Ne) | 0, o = o + Math.imul(ie, Ee) | 0, o = o + Math.imul(oe, Ne) | 0, P = P + Math.imul(oe, Ee) | 0, _ = _ + Math.imul(F, Ue) | 0, o = o + Math.imul(F, Re) | 0, o = o + Math.imul(U, Ue) | 0, P = P + Math.imul(U, Re) | 0, _ = _ + Math.imul(ue, je) | 0, o = o + Math.imul(ue, Ae) | 0, o = o + Math.imul(de, je) | 0, P = P + Math.imul(de, Ae) | 0, _ = _ + Math.imul(J, Te) | 0, o = o + Math.imul(J, ke) | 0, o = o + Math.imul(G, Te) | 0, P = P + Math.imul(G, ke) | 0;
        var dr = (p + _ | 0) + ((o & 8191) << 13) | 0;
        p = (P + (o >>> 13) | 0) + (dr >>> 26) | 0, dr &= 67108863, _ = Math.imul(Pe, Oe), o = Math.imul(Pe, Me), o = o + Math.imul(ge, Oe) | 0, P = Math.imul(ge, Me), _ = _ + Math.imul(Ie, Le) | 0, o = o + Math.imul(Ie, Se) | 0, o = o + Math.imul(me, Le) | 0, P = P + Math.imul(me, Se) | 0, _ = _ + Math.imul(be, Fe) | 0, o = o + Math.imul(be, qe) | 0, o = o + Math.imul(pe, Fe) | 0, P = P + Math.imul(pe, qe) | 0, _ = _ + Math.imul(ve, Ne) | 0, o = o + Math.imul(ve, Ee) | 0, o = o + Math.imul(le, Ne) | 0, P = P + Math.imul(le, Ee) | 0, _ = _ + Math.imul(ie, Ue) | 0, o = o + Math.imul(ie, Re) | 0, o = o + Math.imul(oe, Ue) | 0, P = P + Math.imul(oe, Re) | 0, _ = _ + Math.imul(F, je) | 0, o = o + Math.imul(F, Ae) | 0, o = o + Math.imul(U, je) | 0, P = P + Math.imul(U, Ae) | 0, _ = _ + Math.imul(ue, Te) | 0, o = o + Math.imul(ue, ke) | 0, o = o + Math.imul(de, Te) | 0, P = P + Math.imul(de, ke) | 0;
        var lr = (p + _ | 0) + ((o & 8191) << 13) | 0;
        p = (P + (o >>> 13) | 0) + (lr >>> 26) | 0, lr &= 67108863, _ = Math.imul(Pe, Le), o = Math.imul(Pe, Se), o = o + Math.imul(ge, Le) | 0, P = Math.imul(ge, Se), _ = _ + Math.imul(Ie, Fe) | 0, o = o + Math.imul(Ie, qe) | 0, o = o + Math.imul(me, Fe) | 0, P = P + Math.imul(me, qe) | 0, _ = _ + Math.imul(be, Ne) | 0, o = o + Math.imul(be, Ee) | 0, o = o + Math.imul(pe, Ne) | 0, P = P + Math.imul(pe, Ee) | 0, _ = _ + Math.imul(ve, Ue) | 0, o = o + Math.imul(ve, Re) | 0, o = o + Math.imul(le, Ue) | 0, P = P + Math.imul(le, Re) | 0, _ = _ + Math.imul(ie, je) | 0, o = o + Math.imul(ie, Ae) | 0, o = o + Math.imul(oe, je) | 0, P = P + Math.imul(oe, Ae) | 0, _ = _ + Math.imul(F, Te) | 0, o = o + Math.imul(F, ke) | 0, o = o + Math.imul(U, Te) | 0, P = P + Math.imul(U, ke) | 0;
        var pr = (p + _ | 0) + ((o & 8191) << 13) | 0;
        p = (P + (o >>> 13) | 0) + (pr >>> 26) | 0, pr &= 67108863, _ = Math.imul(Pe, Fe), o = Math.imul(Pe, qe), o = o + Math.imul(ge, Fe) | 0, P = Math.imul(ge, qe), _ = _ + Math.imul(Ie, Ne) | 0, o = o + Math.imul(Ie, Ee) | 0, o = o + Math.imul(me, Ne) | 0, P = P + Math.imul(me, Ee) | 0, _ = _ + Math.imul(be, Ue) | 0, o = o + Math.imul(be, Re) | 0, o = o + Math.imul(pe, Ue) | 0, P = P + Math.imul(pe, Re) | 0, _ = _ + Math.imul(ve, je) | 0, o = o + Math.imul(ve, Ae) | 0, o = o + Math.imul(le, je) | 0, P = P + Math.imul(le, Ae) | 0, _ = _ + Math.imul(ie, Te) | 0, o = o + Math.imul(ie, ke) | 0, o = o + Math.imul(oe, Te) | 0, P = P + Math.imul(oe, ke) | 0;
        var vr = (p + _ | 0) + ((o & 8191) << 13) | 0;
        p = (P + (o >>> 13) | 0) + (vr >>> 26) | 0, vr &= 67108863, _ = Math.imul(Pe, Ne), o = Math.imul(Pe, Ee), o = o + Math.imul(ge, Ne) | 0, P = Math.imul(ge, Ee), _ = _ + Math.imul(Ie, Ue) | 0, o = o + Math.imul(Ie, Re) | 0, o = o + Math.imul(me, Ue) | 0, P = P + Math.imul(me, Re) | 0, _ = _ + Math.imul(be, je) | 0, o = o + Math.imul(be, Ae) | 0, o = o + Math.imul(pe, je) | 0, P = P + Math.imul(pe, Ae) | 0, _ = _ + Math.imul(ve, Te) | 0, o = o + Math.imul(ve, ke) | 0, o = o + Math.imul(le, Te) | 0, P = P + Math.imul(le, ke) | 0;
        var br = (p + _ | 0) + ((o & 8191) << 13) | 0;
        p = (P + (o >>> 13) | 0) + (br >>> 26) | 0, br &= 67108863, _ = Math.imul(Pe, Ue), o = Math.imul(Pe, Re), o = o + Math.imul(ge, Ue) | 0, P = Math.imul(ge, Re), _ = _ + Math.imul(Ie, je) | 0, o = o + Math.imul(Ie, Ae) | 0, o = o + Math.imul(me, je) | 0, P = P + Math.imul(me, Ae) | 0, _ = _ + Math.imul(be, Te) | 0, o = o + Math.imul(be, ke) | 0, o = o + Math.imul(pe, Te) | 0, P = P + Math.imul(pe, ke) | 0;
        var yr = (p + _ | 0) + ((o & 8191) << 13) | 0;
        p = (P + (o >>> 13) | 0) + (yr >>> 26) | 0, yr &= 67108863, _ = Math.imul(Pe, je), o = Math.imul(Pe, Ae), o = o + Math.imul(ge, je) | 0, P = Math.imul(ge, Ae), _ = _ + Math.imul(Ie, Te) | 0, o = o + Math.imul(Ie, ke) | 0, o = o + Math.imul(me, Te) | 0, P = P + Math.imul(me, ke) | 0;
        var wr = (p + _ | 0) + ((o & 8191) << 13) | 0;
        p = (P + (o >>> 13) | 0) + (wr >>> 26) | 0, wr &= 67108863, _ = Math.imul(Pe, Te), o = Math.imul(Pe, ke), o = o + Math.imul(ge, Te) | 0, P = Math.imul(ge, ke);
        var xr = (p + _ | 0) + ((o & 8191) << 13) | 0;
        return p = (P + (o >>> 13) | 0) + (xr >>> 26) | 0, xr &= 67108863, y[0] = rr, y[1] = tr, y[2] = ir, y[3] = nr, y[4] = ar, y[5] = fr, y[6] = sr, y[7] = or, y[8] = ur, y[9] = hr, y[10] = cr, y[11] = dr, y[12] = lr, y[13] = pr, y[14] = vr, y[15] = br, y[16] = yr, y[17] = wr, y[18] = xr, p !== 0 && (y[19] = p, v.length++), v;
      };
      Math.imul || (N = D);
      function W(c, e, a) {
        a.negative = e.negative ^ c.negative, a.length = c.length + e.length;
        for (var v = 0, x = 0, d = 0; d < a.length - 1; d++) {
          var y = x;
          x = 0;
          for (var p = v & 67108863, _ = Math.min(d, e.length - 1), o = Math.max(0, d - c.length + 1); o <= _; o++) {
            var P = d - o, Z = c.words[P] | 0, ee = e.words[o] | 0, K = Z * ee, L = K & 67108863;
            y = y + (K / 67108864 | 0) | 0, L = L + p | 0, p = L & 67108863, y = y + (L >>> 26) | 0, x += y >>> 26, y &= 67108863;
          }
          a.words[d] = p, v = y, y = x;
        }
        return v !== 0 ? a.words[d] = v : a.length--, a._strip();
      }
      function z(c, e, a) {
        return W(c, e, a);
      }
      t.prototype.mulTo = function(e, a) {
        var v, x = this.length + e.length;
        return this.length === 10 && e.length === 10 ? v = N(this, e, a) : x < 63 ? v = D(this, e, a) : x < 1024 ? v = W(this, e, a) : v = z(this, e, a), v;
      }, t.prototype.mul = function(e) {
        var a = new t(null);
        return a.words = new Array(this.length + e.length), this.mulTo(e, a);
      }, t.prototype.mulf = function(e) {
        var a = new t(null);
        return a.words = new Array(this.length + e.length), z(this, e, a);
      }, t.prototype.imul = function(e) {
        return this.clone().mulTo(e, this);
      }, t.prototype.imuln = function(e) {
        var a = e < 0;
        a && (e = -e), q(typeof e == "number"), q(e < 67108864);
        for (var v = 0, x = 0; x < this.length; x++) {
          var d = (this.words[x] | 0) * e, y = (d & 67108863) + (v & 67108863);
          v >>= 26, v += d / 67108864 | 0, v += y >>> 26, this.words[x] = y & 67108863;
        }
        return v !== 0 && (this.words[x] = v, this.length++), a ? this.ineg() : this;
      }, t.prototype.muln = function(e) {
        return this.clone().imuln(e);
      }, t.prototype.sqr = function() {
        return this.mul(this);
      }, t.prototype.isqr = function() {
        return this.imul(this.clone());
      }, t.prototype.pow = function(e) {
        var a = O(e);
        if (a.length === 0) return new t(1);
        for (var v = this, x = 0; x < a.length && a[x] === 0; x++, v = v.sqr())
          ;
        if (++x < a.length)
          for (var d = v.sqr(); x < a.length; x++, d = d.sqr())
            a[x] !== 0 && (v = v.mul(d));
        return v;
      }, t.prototype.iushln = function(e) {
        q(typeof e == "number" && e >= 0);
        var a = e % 26, v = (e - a) / 26, x = 67108863 >>> 26 - a << 26 - a, d;
        if (a !== 0) {
          var y = 0;
          for (d = 0; d < this.length; d++) {
            var p = this.words[d] & x, _ = (this.words[d] | 0) - p << a;
            this.words[d] = _ | y, y = p >>> 26 - a;
          }
          y && (this.words[d] = y, this.length++);
        }
        if (v !== 0) {
          for (d = this.length - 1; d >= 0; d--)
            this.words[d + v] = this.words[d];
          for (d = 0; d < v; d++)
            this.words[d] = 0;
          this.length += v;
        }
        return this._strip();
      }, t.prototype.ishln = function(e) {
        return q(this.negative === 0), this.iushln(e);
      }, t.prototype.iushrn = function(e, a, v) {
        q(typeof e == "number" && e >= 0);
        var x;
        a ? x = (a - a % 26) / 26 : x = 0;
        var d = e % 26, y = Math.min((e - d) / 26, this.length), p = 67108863 ^ 67108863 >>> d << d, _ = v;
        if (x -= y, x = Math.max(0, x), _) {
          for (var o = 0; o < y; o++)
            _.words[o] = this.words[o];
          _.length = y;
        }
        if (y !== 0) if (this.length > y)
          for (this.length -= y, o = 0; o < this.length; o++)
            this.words[o] = this.words[o + y];
        else
          this.words[0] = 0, this.length = 1;
        var P = 0;
        for (o = this.length - 1; o >= 0 && (P !== 0 || o >= x); o--) {
          var Z = this.words[o] | 0;
          this.words[o] = P << 26 - d | Z >>> d, P = Z & p;
        }
        return _ && P !== 0 && (_.words[_.length++] = P), this.length === 0 && (this.words[0] = 0, this.length = 1), this._strip();
      }, t.prototype.ishrn = function(e, a, v) {
        return q(this.negative === 0), this.iushrn(e, a, v);
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
        var a = e % 26, v = (e - a) / 26, x = 1 << a;
        if (this.length <= v) return !1;
        var d = this.words[v];
        return !!(d & x);
      }, t.prototype.imaskn = function(e) {
        q(typeof e == "number" && e >= 0);
        var a = e % 26, v = (e - a) / 26;
        if (q(this.negative === 0, "imaskn works only with positive numbers"), this.length <= v)
          return this;
        if (a !== 0 && v++, this.length = Math.min(v, this.length), a !== 0) {
          var x = 67108863 ^ 67108863 >>> a << a;
          this.words[this.length - 1] &= x;
        }
        return this._strip();
      }, t.prototype.maskn = function(e) {
        return this.clone().imaskn(e);
      }, t.prototype.iaddn = function(e) {
        return q(typeof e == "number"), q(e < 67108864), e < 0 ? this.isubn(-e) : this.negative !== 0 ? this.length === 1 && (this.words[0] | 0) <= e ? (this.words[0] = e - (this.words[0] | 0), this.negative = 0, this) : (this.negative = 0, this.isubn(e), this.negative = 1, this) : this._iaddn(e);
      }, t.prototype._iaddn = function(e) {
        this.words[0] += e;
        for (var a = 0; a < this.length && this.words[a] >= 67108864; a++)
          this.words[a] -= 67108864, a === this.length - 1 ? this.words[a + 1] = 1 : this.words[a + 1]++;
        return this.length = Math.max(this.length, a + 1), this;
      }, t.prototype.isubn = function(e) {
        if (q(typeof e == "number"), q(e < 67108864), e < 0) return this.iaddn(-e);
        if (this.negative !== 0)
          return this.negative = 0, this.iaddn(e), this.negative = 1, this;
        if (this.words[0] -= e, this.length === 1 && this.words[0] < 0)
          this.words[0] = -this.words[0], this.negative = 1;
        else
          for (var a = 0; a < this.length && this.words[a] < 0; a++)
            this.words[a] += 67108864, this.words[a + 1] -= 1;
        return this._strip();
      }, t.prototype.addn = function(e) {
        return this.clone().iaddn(e);
      }, t.prototype.subn = function(e) {
        return this.clone().isubn(e);
      }, t.prototype.iabs = function() {
        return this.negative = 0, this;
      }, t.prototype.abs = function() {
        return this.clone().iabs();
      }, t.prototype._ishlnsubmul = function(e, a, v) {
        var x = e.length + v, d;
        this._expand(x);
        var y, p = 0;
        for (d = 0; d < e.length; d++) {
          y = (this.words[d + v] | 0) + p;
          var _ = (e.words[d] | 0) * a;
          y -= _ & 67108863, p = (y >> 26) - (_ / 67108864 | 0), this.words[d + v] = y & 67108863;
        }
        for (; d < this.length - v; d++)
          y = (this.words[d + v] | 0) + p, p = y >> 26, this.words[d + v] = y & 67108863;
        if (p === 0) return this._strip();
        for (q(p === -1), p = 0, d = 0; d < this.length; d++)
          y = -(this.words[d] | 0) + p, p = y >> 26, this.words[d] = y & 67108863;
        return this.negative = 1, this._strip();
      }, t.prototype._wordDiv = function(e, a) {
        var v = this.length - e.length, x = this.clone(), d = e, y = d.words[d.length - 1] | 0, p = this._countBits(y);
        v = 26 - p, v !== 0 && (d = d.ushln(v), x.iushln(v), y = d.words[d.length - 1] | 0);
        var _ = x.length - d.length, o;
        if (a !== "mod") {
          o = new t(null), o.length = _ + 1, o.words = new Array(o.length);
          for (var P = 0; P < o.length; P++)
            o.words[P] = 0;
        }
        var Z = x.clone()._ishlnsubmul(d, 1, _);
        Z.negative === 0 && (x = Z, o && (o.words[_] = 1));
        for (var ee = _ - 1; ee >= 0; ee--) {
          var K = (x.words[d.length + ee] | 0) * 67108864 + (x.words[d.length + ee - 1] | 0);
          for (K = Math.min(K / y | 0, 67108863), x._ishlnsubmul(d, K, ee); x.negative !== 0; )
            K--, x.negative = 0, x._ishlnsubmul(d, 1, ee), x.isZero() || (x.negative ^= 1);
          o && (o.words[ee] = K);
        }
        return o && o._strip(), x._strip(), a !== "div" && v !== 0 && x.iushrn(v), {
          div: o || null,
          mod: x
        };
      }, t.prototype.divmod = function(e, a, v) {
        if (q(!e.isZero()), this.isZero())
          return {
            div: new t(0),
            mod: new t(0)
          };
        var x, d, y;
        return this.negative !== 0 && e.negative === 0 ? (y = this.neg().divmod(e, a), a !== "mod" && (x = y.div.neg()), a !== "div" && (d = y.mod.neg(), v && d.negative !== 0 && d.iadd(e)), {
          div: x,
          mod: d
        }) : this.negative === 0 && e.negative !== 0 ? (y = this.divmod(e.neg(), a), a !== "mod" && (x = y.div.neg()), {
          div: x,
          mod: y.mod
        }) : this.negative & e.negative ? (y = this.neg().divmod(e.neg(), a), a !== "div" && (d = y.mod.neg(), v && d.negative !== 0 && d.isub(e)), {
          div: y.div,
          mod: d
        }) : e.length > this.length || this.cmp(e) < 0 ? {
          div: new t(0),
          mod: this
        } : e.length === 1 ? a === "div" ? {
          div: this.divn(e.words[0]),
          mod: null
        } : a === "mod" ? {
          div: null,
          mod: new t(this.modrn(e.words[0]))
        } : {
          div: this.divn(e.words[0]),
          mod: new t(this.modrn(e.words[0]))
        } : this._wordDiv(e, a);
      }, t.prototype.div = function(e) {
        return this.divmod(e, "div", !1).div;
      }, t.prototype.mod = function(e) {
        return this.divmod(e, "mod", !1).mod;
      }, t.prototype.umod = function(e) {
        return this.divmod(e, "mod", !0).mod;
      }, t.prototype.divRound = function(e) {
        var a = this.divmod(e);
        if (a.mod.isZero()) return a.div;
        var v = a.div.negative !== 0 ? a.mod.isub(e) : a.mod, x = e.ushrn(1), d = e.andln(1), y = v.cmp(x);
        return y < 0 || d === 1 && y === 0 ? a.div : a.div.negative !== 0 ? a.div.isubn(1) : a.div.iaddn(1);
      }, t.prototype.modrn = function(e) {
        var a = e < 0;
        a && (e = -e), q(e <= 67108863);
        for (var v = (1 << 26) % e, x = 0, d = this.length - 1; d >= 0; d--)
          x = (v * x + (this.words[d] | 0)) % e;
        return a ? -x : x;
      }, t.prototype.modn = function(e) {
        return this.modrn(e);
      }, t.prototype.idivn = function(e) {
        var a = e < 0;
        a && (e = -e), q(e <= 67108863);
        for (var v = 0, x = this.length - 1; x >= 0; x--) {
          var d = (this.words[x] | 0) + v * 67108864;
          this.words[x] = d / e | 0, v = d % e;
        }
        return this._strip(), a ? this.ineg() : this;
      }, t.prototype.divn = function(e) {
        return this.clone().idivn(e);
      }, t.prototype.egcd = function(e) {
        q(e.negative === 0), q(!e.isZero());
        var a = this, v = e.clone();
        a.negative !== 0 ? a = a.umod(e) : a = a.clone();
        for (var x = new t(1), d = new t(0), y = new t(0), p = new t(1), _ = 0; a.isEven() && v.isEven(); )
          a.iushrn(1), v.iushrn(1), ++_;
        for (var o = v.clone(), P = a.clone(); !a.isZero(); ) {
          for (var Z = 0, ee = 1; !(a.words[0] & ee) && Z < 26; ++Z, ee <<= 1) ;
          if (Z > 0)
            for (a.iushrn(Z); Z-- > 0; )
              (x.isOdd() || d.isOdd()) && (x.iadd(o), d.isub(P)), x.iushrn(1), d.iushrn(1);
          for (var K = 0, L = 1; !(v.words[0] & L) && K < 26; ++K, L <<= 1) ;
          if (K > 0)
            for (v.iushrn(K); K-- > 0; )
              (y.isOdd() || p.isOdd()) && (y.iadd(o), p.isub(P)), y.iushrn(1), p.iushrn(1);
          a.cmp(v) >= 0 ? (a.isub(v), x.isub(y), d.isub(p)) : (v.isub(a), y.isub(x), p.isub(d));
        }
        return {
          a: y,
          b: p,
          gcd: v.iushln(_)
        };
      }, t.prototype._invmp = function(e) {
        q(e.negative === 0), q(!e.isZero());
        var a = this, v = e.clone();
        a.negative !== 0 ? a = a.umod(e) : a = a.clone();
        for (var x = new t(1), d = new t(0), y = v.clone(); a.cmpn(1) > 0 && v.cmpn(1) > 0; ) {
          for (var p = 0, _ = 1; !(a.words[0] & _) && p < 26; ++p, _ <<= 1) ;
          if (p > 0)
            for (a.iushrn(p); p-- > 0; )
              x.isOdd() && x.iadd(y), x.iushrn(1);
          for (var o = 0, P = 1; !(v.words[0] & P) && o < 26; ++o, P <<= 1) ;
          if (o > 0)
            for (v.iushrn(o); o-- > 0; )
              d.isOdd() && d.iadd(y), d.iushrn(1);
          a.cmp(v) >= 0 ? (a.isub(v), x.isub(d)) : (v.isub(a), d.isub(x));
        }
        var Z;
        return a.cmpn(1) === 0 ? Z = x : Z = d, Z.cmpn(0) < 0 && Z.iadd(e), Z;
      }, t.prototype.gcd = function(e) {
        if (this.isZero()) return e.abs();
        if (e.isZero()) return this.abs();
        var a = this.clone(), v = e.clone();
        a.negative = 0, v.negative = 0;
        for (var x = 0; a.isEven() && v.isEven(); x++)
          a.iushrn(1), v.iushrn(1);
        do {
          for (; a.isEven(); )
            a.iushrn(1);
          for (; v.isEven(); )
            v.iushrn(1);
          var d = a.cmp(v);
          if (d < 0) {
            var y = a;
            a = v, v = y;
          } else if (d === 0 || v.cmpn(1) === 0)
            break;
          a.isub(v);
        } while (!0);
        return v.iushln(x);
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
        var a = e % 26, v = (e - a) / 26, x = 1 << a;
        if (this.length <= v)
          return this._expand(v + 1), this.words[v] |= x, this;
        for (var d = x, y = v; d !== 0 && y < this.length; y++) {
          var p = this.words[y] | 0;
          p += d, d = p >>> 26, p &= 67108863, this.words[y] = p;
        }
        return d !== 0 && (this.words[y] = d, this.length++), this;
      }, t.prototype.isZero = function() {
        return this.length === 1 && this.words[0] === 0;
      }, t.prototype.cmpn = function(e) {
        var a = e < 0;
        if (this.negative !== 0 && !a) return -1;
        if (this.negative === 0 && a) return 1;
        this._strip();
        var v;
        if (this.length > 1)
          v = 1;
        else {
          a && (e = -e), q(e <= 67108863, "Number is too big");
          var x = this.words[0] | 0;
          v = x === e ? 0 : x < e ? -1 : 1;
        }
        return this.negative !== 0 ? -v | 0 : v;
      }, t.prototype.cmp = function(e) {
        if (this.negative !== 0 && e.negative === 0) return -1;
        if (this.negative === 0 && e.negative !== 0) return 1;
        var a = this.ucmp(e);
        return this.negative !== 0 ? -a | 0 : a;
      }, t.prototype.ucmp = function(e) {
        if (this.length > e.length) return 1;
        if (this.length < e.length) return -1;
        for (var a = 0, v = this.length - 1; v >= 0; v--) {
          var x = this.words[v] | 0, d = e.words[v] | 0;
          if (x !== d) {
            x < d ? a = -1 : x > d && (a = 1);
            break;
          }
        }
        return a;
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
        return new H(e);
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
      var X = {
        k256: null,
        p224: null,
        p192: null,
        p25519: null
      };
      function Q(c, e) {
        this.name = c, this.p = new t(e, 16), this.n = this.p.bitLength(), this.k = new t(1).iushln(this.n).isub(this.p), this.tmp = this._tmp();
      }
      Q.prototype._tmp = function() {
        var e = new t(null);
        return e.words = new Array(Math.ceil(this.n / 13)), e;
      }, Q.prototype.ireduce = function(e) {
        var a = e, v;
        do
          this.split(a, this.tmp), a = this.imulK(a), a = a.iadd(this.tmp), v = a.bitLength();
        while (v > this.n);
        var x = v < this.n ? -1 : a.ucmp(this.p);
        return x === 0 ? (a.words[0] = 0, a.length = 1) : x > 0 ? a.isub(this.p) : a.strip !== void 0 ? a.strip() : a._strip(), a;
      }, Q.prototype.split = function(e, a) {
        e.iushrn(this.n, 0, a);
      }, Q.prototype.imulK = function(e) {
        return e.imul(this.k);
      };
      function ae() {
        Q.call(
          this,
          "k256",
          "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f"
        );
      }
      C(ae, Q), ae.prototype.split = function(e, a) {
        for (var v = 4194303, x = Math.min(e.length, 9), d = 0; d < x; d++)
          a.words[d] = e.words[d];
        if (a.length = x, e.length <= 9) {
          e.words[0] = 0, e.length = 1;
          return;
        }
        var y = e.words[9];
        for (a.words[a.length++] = y & v, d = 10; d < e.length; d++) {
          var p = e.words[d] | 0;
          e.words[d - 10] = (p & v) << 4 | y >>> 22, y = p;
        }
        y >>>= 22, e.words[d - 10] = y, y === 0 && e.length > 10 ? e.length -= 10 : e.length -= 9;
      }, ae.prototype.imulK = function(e) {
        e.words[e.length] = 0, e.words[e.length + 1] = 0, e.length += 2;
        for (var a = 0, v = 0; v < e.length; v++) {
          var x = e.words[v] | 0;
          a += x * 977, e.words[v] = a & 67108863, a = x * 64 + (a / 67108864 | 0);
        }
        return e.words[e.length - 1] === 0 && (e.length--, e.words[e.length - 1] === 0 && e.length--), e;
      };
      function fe() {
        Q.call(
          this,
          "p224",
          "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001"
        );
      }
      C(fe, Q);
      function te() {
        Q.call(
          this,
          "p192",
          "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff"
        );
      }
      C(te, Q);
      function ce() {
        Q.call(
          this,
          "25519",
          "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed"
        );
      }
      C(ce, Q), ce.prototype.imulK = function(e) {
        for (var a = 0, v = 0; v < e.length; v++) {
          var x = (e.words[v] | 0) * 19 + a, d = x & 67108863;
          x >>>= 26, e.words[v] = d, a = x;
        }
        return a !== 0 && (e.words[e.length++] = a), e;
      }, t._prime = function(e) {
        if (X[e]) return X[e];
        var a;
        if (e === "k256")
          a = new ae();
        else if (e === "p224")
          a = new fe();
        else if (e === "p192")
          a = new te();
        else if (e === "p25519")
          a = new ce();
        else
          throw new Error("Unknown prime " + e);
        return X[e] = a, a;
      };
      function H(c) {
        if (typeof c == "string") {
          var e = t._prime(c);
          this.m = e.p, this.prime = e;
        } else
          q(c.gtn(1), "modulus must be greater than 1"), this.m = c, this.prime = null;
      }
      H.prototype._verify1 = function(e) {
        q(e.negative === 0, "red works only with positives"), q(e.red, "red works only with red numbers");
      }, H.prototype._verify2 = function(e, a) {
        q((e.negative | a.negative) === 0, "red works only with positives"), q(
          e.red && e.red === a.red,
          "red works only with red numbers"
        );
      }, H.prototype.imod = function(e) {
        return this.prime ? this.prime.ireduce(e)._forceRed(this) : (u(e, e.umod(this.m)._forceRed(this)), e);
      }, H.prototype.neg = function(e) {
        return e.isZero() ? e.clone() : this.m.sub(e)._forceRed(this);
      }, H.prototype.add = function(e, a) {
        this._verify2(e, a);
        var v = e.add(a);
        return v.cmp(this.m) >= 0 && v.isub(this.m), v._forceRed(this);
      }, H.prototype.iadd = function(e, a) {
        this._verify2(e, a);
        var v = e.iadd(a);
        return v.cmp(this.m) >= 0 && v.isub(this.m), v;
      }, H.prototype.sub = function(e, a) {
        this._verify2(e, a);
        var v = e.sub(a);
        return v.cmpn(0) < 0 && v.iadd(this.m), v._forceRed(this);
      }, H.prototype.isub = function(e, a) {
        this._verify2(e, a);
        var v = e.isub(a);
        return v.cmpn(0) < 0 && v.iadd(this.m), v;
      }, H.prototype.shl = function(e, a) {
        return this._verify1(e), this.imod(e.ushln(a));
      }, H.prototype.imul = function(e, a) {
        return this._verify2(e, a), this.imod(e.imul(a));
      }, H.prototype.mul = function(e, a) {
        return this._verify2(e, a), this.imod(e.mul(a));
      }, H.prototype.isqr = function(e) {
        return this.imul(e, e.clone());
      }, H.prototype.sqr = function(e) {
        return this.mul(e, e);
      }, H.prototype.sqrt = function(e) {
        if (e.isZero()) return e.clone();
        var a = this.m.andln(3);
        if (q(a % 2 === 1), a === 3) {
          var v = this.m.add(new t(1)).iushrn(2);
          return this.pow(e, v);
        }
        for (var x = this.m.subn(1), d = 0; !x.isZero() && x.andln(1) === 0; )
          d++, x.iushrn(1);
        q(!x.isZero());
        var y = new t(1).toRed(this), p = y.redNeg(), _ = this.m.subn(1).iushrn(1), o = this.m.bitLength();
        for (o = new t(2 * o * o).toRed(this); this.pow(o, _).cmp(p) !== 0; )
          o.redIAdd(p);
        for (var P = this.pow(o, x), Z = this.pow(e, x.addn(1).iushrn(1)), ee = this.pow(e, x), K = d; ee.cmp(y) !== 0; ) {
          for (var L = ee, j = 0; L.cmp(y) !== 0; j++)
            L = L.redSqr();
          q(j < K);
          var re = this.pow(P, new t(1).iushln(K - j - 1));
          Z = Z.redMul(re), P = re.redSqr(), ee = ee.redMul(P), K = j;
        }
        return Z;
      }, H.prototype.invm = function(e) {
        var a = e._invmp(this.m);
        return a.negative !== 0 ? (a.negative = 0, this.imod(a).redNeg()) : this.imod(a);
      }, H.prototype.pow = function(e, a) {
        if (a.isZero()) return new t(1).toRed(this);
        if (a.cmpn(1) === 0) return e.clone();
        var v = 4, x = new Array(1 << v);
        x[0] = new t(1).toRed(this), x[1] = e;
        for (var d = 2; d < x.length; d++)
          x[d] = this.mul(x[d - 1], e);
        var y = x[0], p = 0, _ = 0, o = a.bitLength() % 26;
        for (o === 0 && (o = 26), d = a.length - 1; d >= 0; d--) {
          for (var P = a.words[d], Z = o - 1; Z >= 0; Z--) {
            var ee = P >> Z & 1;
            if (y !== x[0] && (y = this.sqr(y)), ee === 0 && p === 0) {
              _ = 0;
              continue;
            }
            p <<= 1, p |= ee, _++, !(_ !== v && (d !== 0 || Z !== 0)) && (y = this.mul(y, x[p]), _ = 0, p = 0);
          }
          o = 26;
        }
        return y;
      }, H.prototype.convertTo = function(e) {
        var a = e.umod(this.m);
        return a === e ? a.clone() : a;
      }, H.prototype.convertFrom = function(e) {
        var a = e.clone();
        return a.red = null, a;
      }, t.mont = function(e) {
        return new A(e);
      };
      function A(c) {
        H.call(this, c), this.shift = this.m.bitLength(), this.shift % 26 !== 0 && (this.shift += 26 - this.shift % 26), this.r = new t(1).iushln(this.shift), this.r2 = this.imod(this.r.sqr()), this.rinv = this.r._invmp(this.m), this.minv = this.rinv.mul(this.r).isubn(1).div(this.m), this.minv = this.minv.umod(this.r), this.minv = this.r.sub(this.minv);
      }
      C(A, H), A.prototype.convertTo = function(e) {
        return this.imod(e.ushln(this.shift));
      }, A.prototype.convertFrom = function(e) {
        var a = this.imod(e.mul(this.rinv));
        return a.red = null, a;
      }, A.prototype.imul = function(e, a) {
        if (e.isZero() || a.isZero())
          return e.words[0] = 0, e.length = 1, e;
        var v = e.imul(a), x = v.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m), d = v.isub(x).iushrn(this.shift), y = d;
        return d.cmp(this.m) >= 0 ? y = d.isub(this.m) : d.cmpn(0) < 0 && (y = d.iadd(this.m)), y._forceRed(this);
      }, A.prototype.mul = function(e, a) {
        if (e.isZero() || a.isZero()) return new t(0)._forceRed(this);
        var v = e.mul(a), x = v.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m), d = v.isub(x).iushrn(this.shift), y = d;
        return d.cmp(this.m) >= 0 ? y = d.isub(this.m) : d.cmpn(0) < 0 && (y = d.iadd(this.m)), y._forceRed(this);
      }, A.prototype.invm = function(e) {
        var a = this.imod(e._invmp(this.m).mul(this.r2));
        return a._forceRed(this);
      };
    })(I, commonjsGlobal);
  }(bn$1)), bn$1.exports;
}
var browserifyRsa, hasRequiredBrowserifyRsa;
function requireBrowserifyRsa() {
  if (hasRequiredBrowserifyRsa) return browserifyRsa;
  hasRequiredBrowserifyRsa = 1;
  var I = requireBn$1(), M = requireBrowser$b();
  function T(t) {
    var E = q(t), l = E.toRed(I.mont(t.modulus)).redPow(new I(t.publicExponent)).fromRed();
    return { blinder: l, unblinder: E.invm(t.modulus) };
  }
  function q(t) {
    var E = t.modulus.byteLength(), l;
    do
      l = new I(M(E));
    while (l.cmp(t.modulus) >= 0 || !l.umod(t.prime1) || !l.umod(t.prime2));
    return l;
  }
  function C(t, E) {
    var l = T(E), b = E.modulus.byteLength(), w = new I(t).mul(l.blinder).umod(E.modulus), u = w.toRed(I.mont(E.prime1)), g = w.toRed(I.mont(E.prime2)), R = E.coefficient, B = E.prime1, k = E.prime2, $ = u.redPow(E.exponent1).fromRed(), O = g.redPow(E.exponent2).fromRed(), D = $.isub(O).imul(R).umod(B).imul(k);
    return O.iadd(D).imul(l.unblinder).umod(E.modulus).toArrayLike(bufferExports.Buffer, "be", b);
  }
  return C.getr = q, browserifyRsa = C, browserifyRsa;
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
  return hasRequiredUtils$2 || (hasRequiredUtils$2 = 1, function(I) {
    var M = I;
    function T(t, E) {
      if (Array.isArray(t))
        return t.slice();
      if (!t)
        return [];
      var l = [];
      if (typeof t != "string") {
        for (var b = 0; b < t.length; b++)
          l[b] = t[b] | 0;
        return l;
      }
      if (E === "hex") {
        t = t.replace(/[^a-z0-9]+/ig, ""), t.length % 2 !== 0 && (t = "0" + t);
        for (var b = 0; b < t.length; b += 2)
          l.push(parseInt(t[b] + t[b + 1], 16));
      } else
        for (var b = 0; b < t.length; b++) {
          var w = t.charCodeAt(b), u = w >> 8, g = w & 255;
          u ? l.push(u, g) : l.push(g);
        }
      return l;
    }
    M.toArray = T;
    function q(t) {
      return t.length === 1 ? "0" + t : t;
    }
    M.zero2 = q;
    function C(t) {
      for (var E = "", l = 0; l < t.length; l++)
        E += q(t[l].toString(16));
      return E;
    }
    M.toHex = C, M.encode = function(E, l) {
      return l === "hex" ? C(E) : E;
    };
  }(utils$1)), utils$1;
}
var hasRequiredUtils$1;
function requireUtils$1() {
  return hasRequiredUtils$1 || (hasRequiredUtils$1 = 1, function(I) {
    var M = I, T = requireBn$2(), q = requireMinimalisticAssert(), C = requireUtils$2();
    M.assert = q, M.toArray = C.toArray, M.zero2 = C.zero2, M.toHex = C.toHex, M.encode = C.encode;
    function t(u, g, R) {
      var B = new Array(Math.max(u.bitLength(), R) + 1), k;
      for (k = 0; k < B.length; k += 1)
        B[k] = 0;
      var $ = 1 << g + 1, O = u.clone();
      for (k = 0; k < B.length; k++) {
        var D, N = O.andln($ - 1);
        O.isOdd() ? (N > ($ >> 1) - 1 ? D = ($ >> 1) - N : D = N, O.isubn(D)) : D = 0, B[k] = D, O.iushrn(1);
      }
      return B;
    }
    M.getNAF = t;
    function E(u, g) {
      var R = [
        [],
        []
      ];
      u = u.clone(), g = g.clone();
      for (var B = 0, k = 0, $; u.cmpn(-B) > 0 || g.cmpn(-k) > 0; ) {
        var O = u.andln(3) + B & 3, D = g.andln(3) + k & 3;
        O === 3 && (O = -1), D === 3 && (D = -1);
        var N;
        O & 1 ? ($ = u.andln(7) + B & 7, ($ === 3 || $ === 5) && D === 2 ? N = -O : N = O) : N = 0, R[0].push(N);
        var W;
        D & 1 ? ($ = g.andln(7) + k & 7, ($ === 3 || $ === 5) && O === 2 ? W = -D : W = D) : W = 0, R[1].push(W), 2 * B === N + 1 && (B = 1 - B), 2 * k === W + 1 && (k = 1 - k), u.iushrn(1), g.iushrn(1);
      }
      return R;
    }
    M.getJSF = E;
    function l(u, g, R) {
      var B = "_" + g;
      u.prototype[g] = function() {
        return this[B] !== void 0 ? this[B] : this[B] = R.call(this);
      };
    }
    M.cachedProperty = l;
    function b(u) {
      return typeof u == "string" ? M.toArray(u, "hex") : u;
    }
    M.parseBytes = b;
    function w(u) {
      return new T(u, "hex", "le");
    }
    M.intFromLE = w;
  }(utils$2)), utils$2;
}
var curve = {}, base$1, hasRequiredBase$1;
function requireBase$1() {
  if (hasRequiredBase$1) return base$1;
  hasRequiredBase$1 = 1;
  var I = requireBn$2(), M = requireUtils$1(), T = M.getNAF, q = M.getJSF, C = M.assert;
  function t(l, b) {
    this.type = l, this.p = new I(b.p, 16), this.red = b.prime ? I.red(b.prime) : I.mont(this.p), this.zero = new I(0).toRed(this.red), this.one = new I(1).toRed(this.red), this.two = new I(2).toRed(this.red), this.n = b.n && new I(b.n, 16), this.g = b.g && this.pointFromJSON(b.g, b.gRed), this._wnafT1 = new Array(4), this._wnafT2 = new Array(4), this._wnafT3 = new Array(4), this._wnafT4 = new Array(4), this._bitLength = this.n ? this.n.bitLength() : 0;
    var w = this.n && this.p.div(this.n);
    !w || w.cmpn(100) > 0 ? this.redN = null : (this._maxwellTrick = !0, this.redN = this.n.toRed(this.red));
  }
  base$1 = t, t.prototype.point = function() {
    throw new Error("Not implemented");
  }, t.prototype.validate = function() {
    throw new Error("Not implemented");
  }, t.prototype._fixedNafMul = function(b, w) {
    C(b.precomputed);
    var u = b._getDoubles(), g = T(w, 1, this._bitLength), R = (1 << u.step + 1) - (u.step % 2 === 0 ? 2 : 1);
    R /= 3;
    var B = [], k, $;
    for (k = 0; k < g.length; k += u.step) {
      $ = 0;
      for (var O = k + u.step - 1; O >= k; O--)
        $ = ($ << 1) + g[O];
      B.push($);
    }
    for (var D = this.jpoint(null, null, null), N = this.jpoint(null, null, null), W = R; W > 0; W--) {
      for (k = 0; k < B.length; k++)
        $ = B[k], $ === W ? N = N.mixedAdd(u.points[k]) : $ === -W && (N = N.mixedAdd(u.points[k].neg()));
      D = D.add(N);
    }
    return D.toP();
  }, t.prototype._wnafMul = function(b, w) {
    var u = 4, g = b._getNAFPoints(u);
    u = g.wnd;
    for (var R = g.points, B = T(w, u, this._bitLength), k = this.jpoint(null, null, null), $ = B.length - 1; $ >= 0; $--) {
      for (var O = 0; $ >= 0 && B[$] === 0; $--)
        O++;
      if ($ >= 0 && O++, k = k.dblp(O), $ < 0)
        break;
      var D = B[$];
      C(D !== 0), b.type === "affine" ? D > 0 ? k = k.mixedAdd(R[D - 1 >> 1]) : k = k.mixedAdd(R[-D - 1 >> 1].neg()) : D > 0 ? k = k.add(R[D - 1 >> 1]) : k = k.add(R[-D - 1 >> 1].neg());
    }
    return b.type === "affine" ? k.toP() : k;
  }, t.prototype._wnafMulAdd = function(b, w, u, g, R) {
    var B = this._wnafT1, k = this._wnafT2, $ = this._wnafT3, O = 0, D, N, W;
    for (D = 0; D < g; D++) {
      W = w[D];
      var z = W._getNAFPoints(b);
      B[D] = z.wnd, k[D] = z.points;
    }
    for (D = g - 1; D >= 1; D -= 2) {
      var X = D - 1, Q = D;
      if (B[X] !== 1 || B[Q] !== 1) {
        $[X] = T(u[X], B[X], this._bitLength), $[Q] = T(u[Q], B[Q], this._bitLength), O = Math.max($[X].length, O), O = Math.max($[Q].length, O);
        continue;
      }
      var ae = [
        w[X],
        /* 1 */
        null,
        /* 3 */
        null,
        /* 5 */
        w[Q]
        /* 7 */
      ];
      w[X].y.cmp(w[Q].y) === 0 ? (ae[1] = w[X].add(w[Q]), ae[2] = w[X].toJ().mixedAdd(w[Q].neg())) : w[X].y.cmp(w[Q].y.redNeg()) === 0 ? (ae[1] = w[X].toJ().mixedAdd(w[Q]), ae[2] = w[X].add(w[Q].neg())) : (ae[1] = w[X].toJ().mixedAdd(w[Q]), ae[2] = w[X].toJ().mixedAdd(w[Q].neg()));
      var fe = [
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
      ], te = q(u[X], u[Q]);
      for (O = Math.max(te[0].length, O), $[X] = new Array(O), $[Q] = new Array(O), N = 0; N < O; N++) {
        var ce = te[0][N] | 0, H = te[1][N] | 0;
        $[X][N] = fe[(ce + 1) * 3 + (H + 1)], $[Q][N] = 0, k[X] = ae;
      }
    }
    var A = this.jpoint(null, null, null), c = this._wnafT4;
    for (D = O; D >= 0; D--) {
      for (var e = 0; D >= 0; ) {
        var a = !0;
        for (N = 0; N < g; N++)
          c[N] = $[N][D] | 0, c[N] !== 0 && (a = !1);
        if (!a)
          break;
        e++, D--;
      }
      if (D >= 0 && e++, A = A.dblp(e), D < 0)
        break;
      for (N = 0; N < g; N++) {
        var v = c[N];
        v !== 0 && (v > 0 ? W = k[N][v - 1 >> 1] : v < 0 && (W = k[N][-v - 1 >> 1].neg()), W.type === "affine" ? A = A.mixedAdd(W) : A = A.add(W));
      }
    }
    for (D = 0; D < g; D++)
      k[D] = null;
    return R ? A : A.toP();
  };
  function E(l, b) {
    this.curve = l, this.type = b, this.precomputed = null;
  }
  return t.BasePoint = E, E.prototype.eq = function() {
    throw new Error("Not implemented");
  }, E.prototype.validate = function() {
    return this.curve.validate(this);
  }, t.prototype.decodePoint = function(b, w) {
    b = M.toArray(b, w);
    var u = this.p.byteLength();
    if ((b[0] === 4 || b[0] === 6 || b[0] === 7) && b.length - 1 === 2 * u) {
      b[0] === 6 ? C(b[b.length - 1] % 2 === 0) : b[0] === 7 && C(b[b.length - 1] % 2 === 1);
      var g = this.point(
        b.slice(1, 1 + u),
        b.slice(1 + u, 1 + 2 * u)
      );
      return g;
    } else if ((b[0] === 2 || b[0] === 3) && b.length - 1 === u)
      return this.pointFromX(b.slice(1, 1 + u), b[0] === 3);
    throw new Error("Unknown point format");
  }, E.prototype.encodeCompressed = function(b) {
    return this.encode(b, !0);
  }, E.prototype._encode = function(b) {
    var w = this.curve.p.byteLength(), u = this.getX().toArray("be", w);
    return b ? [this.getY().isEven() ? 2 : 3].concat(u) : [4].concat(u, this.getY().toArray("be", w));
  }, E.prototype.encode = function(b, w) {
    return M.encode(this._encode(w), b);
  }, E.prototype.precompute = function(b) {
    if (this.precomputed)
      return this;
    var w = {
      doubles: null,
      naf: null,
      beta: null
    };
    return w.naf = this._getNAFPoints(8), w.doubles = this._getDoubles(4, b), w.beta = this._getBeta(), this.precomputed = w, this;
  }, E.prototype._hasDoubles = function(b) {
    if (!this.precomputed)
      return !1;
    var w = this.precomputed.doubles;
    return w ? w.points.length >= Math.ceil((b.bitLength() + 1) / w.step) : !1;
  }, E.prototype._getDoubles = function(b, w) {
    if (this.precomputed && this.precomputed.doubles)
      return this.precomputed.doubles;
    for (var u = [this], g = this, R = 0; R < w; R += b) {
      for (var B = 0; B < b; B++)
        g = g.dbl();
      u.push(g);
    }
    return {
      step: b,
      points: u
    };
  }, E.prototype._getNAFPoints = function(b) {
    if (this.precomputed && this.precomputed.naf)
      return this.precomputed.naf;
    for (var w = [this], u = (1 << b) - 1, g = u === 1 ? null : this.dbl(), R = 1; R < u; R++)
      w[R] = w[R - 1].add(g);
    return {
      wnd: b,
      points: w
    };
  }, E.prototype._getBeta = function() {
    return null;
  }, E.prototype.dblp = function(b) {
    for (var w = this, u = 0; u < b; u++)
      w = w.dbl();
    return w;
  }, base$1;
}
var short, hasRequiredShort;
function requireShort() {
  if (hasRequiredShort) return short;
  hasRequiredShort = 1;
  var I = requireUtils$1(), M = requireBn$2(), T = requireInherits_browser(), q = requireBase$1(), C = I.assert;
  function t(b) {
    q.call(this, "short", b), this.a = new M(b.a, 16).toRed(this.red), this.b = new M(b.b, 16).toRed(this.red), this.tinv = this.two.redInvm(), this.zeroA = this.a.fromRed().cmpn(0) === 0, this.threeA = this.a.fromRed().sub(this.p).cmpn(-3) === 0, this.endo = this._getEndomorphism(b), this._endoWnafT1 = new Array(4), this._endoWnafT2 = new Array(4);
  }
  T(t, q), short = t, t.prototype._getEndomorphism = function(w) {
    if (!(!this.zeroA || !this.g || !this.n || this.p.modn(3) !== 1)) {
      var u, g;
      if (w.beta)
        u = new M(w.beta, 16).toRed(this.red);
      else {
        var R = this._getEndoRoots(this.p);
        u = R[0].cmp(R[1]) < 0 ? R[0] : R[1], u = u.toRed(this.red);
      }
      if (w.lambda)
        g = new M(w.lambda, 16);
      else {
        var B = this._getEndoRoots(this.n);
        this.g.mul(B[0]).x.cmp(this.g.x.redMul(u)) === 0 ? g = B[0] : (g = B[1], C(this.g.mul(g).x.cmp(this.g.x.redMul(u)) === 0));
      }
      var k;
      return w.basis ? k = w.basis.map(function($) {
        return {
          a: new M($.a, 16),
          b: new M($.b, 16)
        };
      }) : k = this._getEndoBasis(g), {
        beta: u,
        lambda: g,
        basis: k
      };
    }
  }, t.prototype._getEndoRoots = function(w) {
    var u = w === this.p ? this.red : M.mont(w), g = new M(2).toRed(u).redInvm(), R = g.redNeg(), B = new M(3).toRed(u).redNeg().redSqrt().redMul(g), k = R.redAdd(B).fromRed(), $ = R.redSub(B).fromRed();
    return [k, $];
  }, t.prototype._getEndoBasis = function(w) {
    for (var u = this.n.ushrn(Math.floor(this.n.bitLength() / 2)), g = w, R = this.n.clone(), B = new M(1), k = new M(0), $ = new M(0), O = new M(1), D, N, W, z, X, Q, ae, fe = 0, te, ce; g.cmpn(0) !== 0; ) {
      var H = R.div(g);
      te = R.sub(H.mul(g)), ce = $.sub(H.mul(B));
      var A = O.sub(H.mul(k));
      if (!W && te.cmp(u) < 0)
        D = ae.neg(), N = B, W = te.neg(), z = ce;
      else if (W && ++fe === 2)
        break;
      ae = te, R = g, g = te, $ = B, B = ce, O = k, k = A;
    }
    X = te.neg(), Q = ce;
    var c = W.sqr().add(z.sqr()), e = X.sqr().add(Q.sqr());
    return e.cmp(c) >= 0 && (X = D, Q = N), W.negative && (W = W.neg(), z = z.neg()), X.negative && (X = X.neg(), Q = Q.neg()), [
      { a: W, b: z },
      { a: X, b: Q }
    ];
  }, t.prototype._endoSplit = function(w) {
    var u = this.endo.basis, g = u[0], R = u[1], B = R.b.mul(w).divRound(this.n), k = g.b.neg().mul(w).divRound(this.n), $ = B.mul(g.a), O = k.mul(R.a), D = B.mul(g.b), N = k.mul(R.b), W = w.sub($).sub(O), z = D.add(N).neg();
    return { k1: W, k2: z };
  }, t.prototype.pointFromX = function(w, u) {
    w = new M(w, 16), w.red || (w = w.toRed(this.red));
    var g = w.redSqr().redMul(w).redIAdd(w.redMul(this.a)).redIAdd(this.b), R = g.redSqrt();
    if (R.redSqr().redSub(g).cmp(this.zero) !== 0)
      throw new Error("invalid point");
    var B = R.fromRed().isOdd();
    return (u && !B || !u && B) && (R = R.redNeg()), this.point(w, R);
  }, t.prototype.validate = function(w) {
    if (w.inf)
      return !0;
    var u = w.x, g = w.y, R = this.a.redMul(u), B = u.redSqr().redMul(u).redIAdd(R).redIAdd(this.b);
    return g.redSqr().redISub(B).cmpn(0) === 0;
  }, t.prototype._endoWnafMulAdd = function(w, u, g) {
    for (var R = this._endoWnafT1, B = this._endoWnafT2, k = 0; k < w.length; k++) {
      var $ = this._endoSplit(u[k]), O = w[k], D = O._getBeta();
      $.k1.negative && ($.k1.ineg(), O = O.neg(!0)), $.k2.negative && ($.k2.ineg(), D = D.neg(!0)), R[k * 2] = O, R[k * 2 + 1] = D, B[k * 2] = $.k1, B[k * 2 + 1] = $.k2;
    }
    for (var N = this._wnafMulAdd(1, R, B, k * 2, g), W = 0; W < k * 2; W++)
      R[W] = null, B[W] = null;
    return N;
  };
  function E(b, w, u, g) {
    q.BasePoint.call(this, b, "affine"), w === null && u === null ? (this.x = null, this.y = null, this.inf = !0) : (this.x = new M(w, 16), this.y = new M(u, 16), g && (this.x.forceRed(this.curve.red), this.y.forceRed(this.curve.red)), this.x.red || (this.x = this.x.toRed(this.curve.red)), this.y.red || (this.y = this.y.toRed(this.curve.red)), this.inf = !1);
  }
  T(E, q.BasePoint), t.prototype.point = function(w, u, g) {
    return new E(this, w, u, g);
  }, t.prototype.pointFromJSON = function(w, u) {
    return E.fromJSON(this, w, u);
  }, E.prototype._getBeta = function() {
    if (this.curve.endo) {
      var w = this.precomputed;
      if (w && w.beta)
        return w.beta;
      var u = this.curve.point(this.x.redMul(this.curve.endo.beta), this.y);
      if (w) {
        var g = this.curve, R = function(B) {
          return g.point(B.x.redMul(g.endo.beta), B.y);
        };
        w.beta = u, u.precomputed = {
          beta: null,
          naf: w.naf && {
            wnd: w.naf.wnd,
            points: w.naf.points.map(R)
          },
          doubles: w.doubles && {
            step: w.doubles.step,
            points: w.doubles.points.map(R)
          }
        };
      }
      return u;
    }
  }, E.prototype.toJSON = function() {
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
  }, E.fromJSON = function(w, u, g) {
    typeof u == "string" && (u = JSON.parse(u));
    var R = w.point(u[0], u[1], g);
    if (!u[2])
      return R;
    function B($) {
      return w.point($[0], $[1], g);
    }
    var k = u[2];
    return R.precomputed = {
      beta: null,
      doubles: k.doubles && {
        step: k.doubles.step,
        points: [R].concat(k.doubles.points.map(B))
      },
      naf: k.naf && {
        wnd: k.naf.wnd,
        points: [R].concat(k.naf.points.map(B))
      }
    }, R;
  }, E.prototype.inspect = function() {
    return this.isInfinity() ? "<EC Point Infinity>" : "<EC Point x: " + this.x.fromRed().toString(16, 2) + " y: " + this.y.fromRed().toString(16, 2) + ">";
  }, E.prototype.isInfinity = function() {
    return this.inf;
  }, E.prototype.add = function(w) {
    if (this.inf)
      return w;
    if (w.inf)
      return this;
    if (this.eq(w))
      return this.dbl();
    if (this.neg().eq(w))
      return this.curve.point(null, null);
    if (this.x.cmp(w.x) === 0)
      return this.curve.point(null, null);
    var u = this.y.redSub(w.y);
    u.cmpn(0) !== 0 && (u = u.redMul(this.x.redSub(w.x).redInvm()));
    var g = u.redSqr().redISub(this.x).redISub(w.x), R = u.redMul(this.x.redSub(g)).redISub(this.y);
    return this.curve.point(g, R);
  }, E.prototype.dbl = function() {
    if (this.inf)
      return this;
    var w = this.y.redAdd(this.y);
    if (w.cmpn(0) === 0)
      return this.curve.point(null, null);
    var u = this.curve.a, g = this.x.redSqr(), R = w.redInvm(), B = g.redAdd(g).redIAdd(g).redIAdd(u).redMul(R), k = B.redSqr().redISub(this.x.redAdd(this.x)), $ = B.redMul(this.x.redSub(k)).redISub(this.y);
    return this.curve.point(k, $);
  }, E.prototype.getX = function() {
    return this.x.fromRed();
  }, E.prototype.getY = function() {
    return this.y.fromRed();
  }, E.prototype.mul = function(w) {
    return w = new M(w, 16), this.isInfinity() ? this : this._hasDoubles(w) ? this.curve._fixedNafMul(this, w) : this.curve.endo ? this.curve._endoWnafMulAdd([this], [w]) : this.curve._wnafMul(this, w);
  }, E.prototype.mulAdd = function(w, u, g) {
    var R = [this, u], B = [w, g];
    return this.curve.endo ? this.curve._endoWnafMulAdd(R, B) : this.curve._wnafMulAdd(1, R, B, 2);
  }, E.prototype.jmulAdd = function(w, u, g) {
    var R = [this, u], B = [w, g];
    return this.curve.endo ? this.curve._endoWnafMulAdd(R, B, !0) : this.curve._wnafMulAdd(1, R, B, 2, !0);
  }, E.prototype.eq = function(w) {
    return this === w || this.inf === w.inf && (this.inf || this.x.cmp(w.x) === 0 && this.y.cmp(w.y) === 0);
  }, E.prototype.neg = function(w) {
    if (this.inf)
      return this;
    var u = this.curve.point(this.x, this.y.redNeg());
    if (w && this.precomputed) {
      var g = this.precomputed, R = function(B) {
        return B.neg();
      };
      u.precomputed = {
        naf: g.naf && {
          wnd: g.naf.wnd,
          points: g.naf.points.map(R)
        },
        doubles: g.doubles && {
          step: g.doubles.step,
          points: g.doubles.points.map(R)
        }
      };
    }
    return u;
  }, E.prototype.toJ = function() {
    if (this.inf)
      return this.curve.jpoint(null, null, null);
    var w = this.curve.jpoint(this.x, this.y, this.curve.one);
    return w;
  };
  function l(b, w, u, g) {
    q.BasePoint.call(this, b, "jacobian"), w === null && u === null && g === null ? (this.x = this.curve.one, this.y = this.curve.one, this.z = new M(0)) : (this.x = new M(w, 16), this.y = new M(u, 16), this.z = new M(g, 16)), this.x.red || (this.x = this.x.toRed(this.curve.red)), this.y.red || (this.y = this.y.toRed(this.curve.red)), this.z.red || (this.z = this.z.toRed(this.curve.red)), this.zOne = this.z === this.curve.one;
  }
  return T(l, q.BasePoint), t.prototype.jpoint = function(w, u, g) {
    return new l(this, w, u, g);
  }, l.prototype.toP = function() {
    if (this.isInfinity())
      return this.curve.point(null, null);
    var w = this.z.redInvm(), u = w.redSqr(), g = this.x.redMul(u), R = this.y.redMul(u).redMul(w);
    return this.curve.point(g, R);
  }, l.prototype.neg = function() {
    return this.curve.jpoint(this.x, this.y.redNeg(), this.z);
  }, l.prototype.add = function(w) {
    if (this.isInfinity())
      return w;
    if (w.isInfinity())
      return this;
    var u = w.z.redSqr(), g = this.z.redSqr(), R = this.x.redMul(u), B = w.x.redMul(g), k = this.y.redMul(u.redMul(w.z)), $ = w.y.redMul(g.redMul(this.z)), O = R.redSub(B), D = k.redSub($);
    if (O.cmpn(0) === 0)
      return D.cmpn(0) !== 0 ? this.curve.jpoint(null, null, null) : this.dbl();
    var N = O.redSqr(), W = N.redMul(O), z = R.redMul(N), X = D.redSqr().redIAdd(W).redISub(z).redISub(z), Q = D.redMul(z.redISub(X)).redISub(k.redMul(W)), ae = this.z.redMul(w.z).redMul(O);
    return this.curve.jpoint(X, Q, ae);
  }, l.prototype.mixedAdd = function(w) {
    if (this.isInfinity())
      return w.toJ();
    if (w.isInfinity())
      return this;
    var u = this.z.redSqr(), g = this.x, R = w.x.redMul(u), B = this.y, k = w.y.redMul(u).redMul(this.z), $ = g.redSub(R), O = B.redSub(k);
    if ($.cmpn(0) === 0)
      return O.cmpn(0) !== 0 ? this.curve.jpoint(null, null, null) : this.dbl();
    var D = $.redSqr(), N = D.redMul($), W = g.redMul(D), z = O.redSqr().redIAdd(N).redISub(W).redISub(W), X = O.redMul(W.redISub(z)).redISub(B.redMul(N)), Q = this.z.redMul($);
    return this.curve.jpoint(z, X, Q);
  }, l.prototype.dblp = function(w) {
    if (w === 0)
      return this;
    if (this.isInfinity())
      return this;
    if (!w)
      return this.dbl();
    var u;
    if (this.curve.zeroA || this.curve.threeA) {
      var g = this;
      for (u = 0; u < w; u++)
        g = g.dbl();
      return g;
    }
    var R = this.curve.a, B = this.curve.tinv, k = this.x, $ = this.y, O = this.z, D = O.redSqr().redSqr(), N = $.redAdd($);
    for (u = 0; u < w; u++) {
      var W = k.redSqr(), z = N.redSqr(), X = z.redSqr(), Q = W.redAdd(W).redIAdd(W).redIAdd(R.redMul(D)), ae = k.redMul(z), fe = Q.redSqr().redISub(ae.redAdd(ae)), te = ae.redISub(fe), ce = Q.redMul(te);
      ce = ce.redIAdd(ce).redISub(X);
      var H = N.redMul(O);
      u + 1 < w && (D = D.redMul(X)), k = fe, O = H, N = ce;
    }
    return this.curve.jpoint(k, N.redMul(B), O);
  }, l.prototype.dbl = function() {
    return this.isInfinity() ? this : this.curve.zeroA ? this._zeroDbl() : this.curve.threeA ? this._threeDbl() : this._dbl();
  }, l.prototype._zeroDbl = function() {
    var w, u, g;
    if (this.zOne) {
      var R = this.x.redSqr(), B = this.y.redSqr(), k = B.redSqr(), $ = this.x.redAdd(B).redSqr().redISub(R).redISub(k);
      $ = $.redIAdd($);
      var O = R.redAdd(R).redIAdd(R), D = O.redSqr().redISub($).redISub($), N = k.redIAdd(k);
      N = N.redIAdd(N), N = N.redIAdd(N), w = D, u = O.redMul($.redISub(D)).redISub(N), g = this.y.redAdd(this.y);
    } else {
      var W = this.x.redSqr(), z = this.y.redSqr(), X = z.redSqr(), Q = this.x.redAdd(z).redSqr().redISub(W).redISub(X);
      Q = Q.redIAdd(Q);
      var ae = W.redAdd(W).redIAdd(W), fe = ae.redSqr(), te = X.redIAdd(X);
      te = te.redIAdd(te), te = te.redIAdd(te), w = fe.redISub(Q).redISub(Q), u = ae.redMul(Q.redISub(w)).redISub(te), g = this.y.redMul(this.z), g = g.redIAdd(g);
    }
    return this.curve.jpoint(w, u, g);
  }, l.prototype._threeDbl = function() {
    var w, u, g;
    if (this.zOne) {
      var R = this.x.redSqr(), B = this.y.redSqr(), k = B.redSqr(), $ = this.x.redAdd(B).redSqr().redISub(R).redISub(k);
      $ = $.redIAdd($);
      var O = R.redAdd(R).redIAdd(R).redIAdd(this.curve.a), D = O.redSqr().redISub($).redISub($);
      w = D;
      var N = k.redIAdd(k);
      N = N.redIAdd(N), N = N.redIAdd(N), u = O.redMul($.redISub(D)).redISub(N), g = this.y.redAdd(this.y);
    } else {
      var W = this.z.redSqr(), z = this.y.redSqr(), X = this.x.redMul(z), Q = this.x.redSub(W).redMul(this.x.redAdd(W));
      Q = Q.redAdd(Q).redIAdd(Q);
      var ae = X.redIAdd(X);
      ae = ae.redIAdd(ae);
      var fe = ae.redAdd(ae);
      w = Q.redSqr().redISub(fe), g = this.y.redAdd(this.z).redSqr().redISub(z).redISub(W);
      var te = z.redSqr();
      te = te.redIAdd(te), te = te.redIAdd(te), te = te.redIAdd(te), u = Q.redMul(ae.redISub(w)).redISub(te);
    }
    return this.curve.jpoint(w, u, g);
  }, l.prototype._dbl = function() {
    var w = this.curve.a, u = this.x, g = this.y, R = this.z, B = R.redSqr().redSqr(), k = u.redSqr(), $ = g.redSqr(), O = k.redAdd(k).redIAdd(k).redIAdd(w.redMul(B)), D = u.redAdd(u);
    D = D.redIAdd(D);
    var N = D.redMul($), W = O.redSqr().redISub(N.redAdd(N)), z = N.redISub(W), X = $.redSqr();
    X = X.redIAdd(X), X = X.redIAdd(X), X = X.redIAdd(X);
    var Q = O.redMul(z).redISub(X), ae = g.redAdd(g).redMul(R);
    return this.curve.jpoint(W, Q, ae);
  }, l.prototype.trpl = function() {
    if (!this.curve.zeroA)
      return this.dbl().add(this);
    var w = this.x.redSqr(), u = this.y.redSqr(), g = this.z.redSqr(), R = u.redSqr(), B = w.redAdd(w).redIAdd(w), k = B.redSqr(), $ = this.x.redAdd(u).redSqr().redISub(w).redISub(R);
    $ = $.redIAdd($), $ = $.redAdd($).redIAdd($), $ = $.redISub(k);
    var O = $.redSqr(), D = R.redIAdd(R);
    D = D.redIAdd(D), D = D.redIAdd(D), D = D.redIAdd(D);
    var N = B.redIAdd($).redSqr().redISub(k).redISub(O).redISub(D), W = u.redMul(N);
    W = W.redIAdd(W), W = W.redIAdd(W);
    var z = this.x.redMul(O).redISub(W);
    z = z.redIAdd(z), z = z.redIAdd(z);
    var X = this.y.redMul(N.redMul(D.redISub(N)).redISub($.redMul(O)));
    X = X.redIAdd(X), X = X.redIAdd(X), X = X.redIAdd(X);
    var Q = this.z.redAdd($).redSqr().redISub(g).redISub(O);
    return this.curve.jpoint(z, X, Q);
  }, l.prototype.mul = function(w, u) {
    return w = new M(w, u), this.curve._wnafMul(this, w);
  }, l.prototype.eq = function(w) {
    if (w.type === "affine")
      return this.eq(w.toJ());
    if (this === w)
      return !0;
    var u = this.z.redSqr(), g = w.z.redSqr();
    if (this.x.redMul(g).redISub(w.x.redMul(u)).cmpn(0) !== 0)
      return !1;
    var R = u.redMul(this.z), B = g.redMul(w.z);
    return this.y.redMul(B).redISub(w.y.redMul(R)).cmpn(0) === 0;
  }, l.prototype.eqXToP = function(w) {
    var u = this.z.redSqr(), g = w.toRed(this.curve.red).redMul(u);
    if (this.x.cmp(g) === 0)
      return !0;
    for (var R = w.clone(), B = this.curve.redN.redMul(u); ; ) {
      if (R.iadd(this.curve.n), R.cmp(this.curve.p) >= 0)
        return !1;
      if (g.redIAdd(B), this.x.cmp(g) === 0)
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
  var I = requireBn$2(), M = requireInherits_browser(), T = requireBase$1(), q = requireUtils$1();
  function C(E) {
    T.call(this, "mont", E), this.a = new I(E.a, 16).toRed(this.red), this.b = new I(E.b, 16).toRed(this.red), this.i4 = new I(4).toRed(this.red).redInvm(), this.two = new I(2).toRed(this.red), this.a24 = this.i4.redMul(this.a.redAdd(this.two));
  }
  M(C, T), mont = C, C.prototype.validate = function(l) {
    var b = l.normalize().x, w = b.redSqr(), u = w.redMul(b).redAdd(w.redMul(this.a)).redAdd(b), g = u.redSqrt();
    return g.redSqr().cmp(u) === 0;
  };
  function t(E, l, b) {
    T.BasePoint.call(this, E, "projective"), l === null && b === null ? (this.x = this.curve.one, this.z = this.curve.zero) : (this.x = new I(l, 16), this.z = new I(b, 16), this.x.red || (this.x = this.x.toRed(this.curve.red)), this.z.red || (this.z = this.z.toRed(this.curve.red)));
  }
  return M(t, T.BasePoint), C.prototype.decodePoint = function(l, b) {
    return this.point(q.toArray(l, b), 1);
  }, C.prototype.point = function(l, b) {
    return new t(this, l, b);
  }, C.prototype.pointFromJSON = function(l) {
    return t.fromJSON(this, l);
  }, t.prototype.precompute = function() {
  }, t.prototype._encode = function() {
    return this.getX().toArray("be", this.curve.p.byteLength());
  }, t.fromJSON = function(l, b) {
    return new t(l, b[0], b[1] || l.one);
  }, t.prototype.inspect = function() {
    return this.isInfinity() ? "<EC Point Infinity>" : "<EC Point x: " + this.x.fromRed().toString(16, 2) + " z: " + this.z.fromRed().toString(16, 2) + ">";
  }, t.prototype.isInfinity = function() {
    return this.z.cmpn(0) === 0;
  }, t.prototype.dbl = function() {
    var l = this.x.redAdd(this.z), b = l.redSqr(), w = this.x.redSub(this.z), u = w.redSqr(), g = b.redSub(u), R = b.redMul(u), B = g.redMul(u.redAdd(this.curve.a24.redMul(g)));
    return this.curve.point(R, B);
  }, t.prototype.add = function() {
    throw new Error("Not supported on Montgomery curve");
  }, t.prototype.diffAdd = function(l, b) {
    var w = this.x.redAdd(this.z), u = this.x.redSub(this.z), g = l.x.redAdd(l.z), R = l.x.redSub(l.z), B = R.redMul(w), k = g.redMul(u), $ = b.z.redMul(B.redAdd(k).redSqr()), O = b.x.redMul(B.redISub(k).redSqr());
    return this.curve.point($, O);
  }, t.prototype.mul = function(l) {
    for (var b = l.clone(), w = this, u = this.curve.point(null, null), g = this, R = []; b.cmpn(0) !== 0; b.iushrn(1))
      R.push(b.andln(1));
    for (var B = R.length - 1; B >= 0; B--)
      R[B] === 0 ? (w = w.diffAdd(u, g), u = u.dbl()) : (u = w.diffAdd(u, g), w = w.dbl());
    return u;
  }, t.prototype.mulAdd = function() {
    throw new Error("Not supported on Montgomery curve");
  }, t.prototype.jumlAdd = function() {
    throw new Error("Not supported on Montgomery curve");
  }, t.prototype.eq = function(l) {
    return this.getX().cmp(l.getX()) === 0;
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
  var I = requireUtils$1(), M = requireBn$2(), T = requireInherits_browser(), q = requireBase$1(), C = I.assert;
  function t(l) {
    this.twisted = (l.a | 0) !== 1, this.mOneA = this.twisted && (l.a | 0) === -1, this.extended = this.mOneA, q.call(this, "edwards", l), this.a = new M(l.a, 16).umod(this.red.m), this.a = this.a.toRed(this.red), this.c = new M(l.c, 16).toRed(this.red), this.c2 = this.c.redSqr(), this.d = new M(l.d, 16).toRed(this.red), this.dd = this.d.redAdd(this.d), C(!this.twisted || this.c.fromRed().cmpn(1) === 0), this.oneC = (l.c | 0) === 1;
  }
  T(t, q), edwards = t, t.prototype._mulA = function(b) {
    return this.mOneA ? b.redNeg() : this.a.redMul(b);
  }, t.prototype._mulC = function(b) {
    return this.oneC ? b : this.c.redMul(b);
  }, t.prototype.jpoint = function(b, w, u, g) {
    return this.point(b, w, u, g);
  }, t.prototype.pointFromX = function(b, w) {
    b = new M(b, 16), b.red || (b = b.toRed(this.red));
    var u = b.redSqr(), g = this.c2.redSub(this.a.redMul(u)), R = this.one.redSub(this.c2.redMul(this.d).redMul(u)), B = g.redMul(R.redInvm()), k = B.redSqrt();
    if (k.redSqr().redSub(B).cmp(this.zero) !== 0)
      throw new Error("invalid point");
    var $ = k.fromRed().isOdd();
    return (w && !$ || !w && $) && (k = k.redNeg()), this.point(b, k);
  }, t.prototype.pointFromY = function(b, w) {
    b = new M(b, 16), b.red || (b = b.toRed(this.red));
    var u = b.redSqr(), g = u.redSub(this.c2), R = u.redMul(this.d).redMul(this.c2).redSub(this.a), B = g.redMul(R.redInvm());
    if (B.cmp(this.zero) === 0) {
      if (w)
        throw new Error("invalid point");
      return this.point(this.zero, b);
    }
    var k = B.redSqrt();
    if (k.redSqr().redSub(B).cmp(this.zero) !== 0)
      throw new Error("invalid point");
    return k.fromRed().isOdd() !== w && (k = k.redNeg()), this.point(k, b);
  }, t.prototype.validate = function(b) {
    if (b.isInfinity())
      return !0;
    b.normalize();
    var w = b.x.redSqr(), u = b.y.redSqr(), g = w.redMul(this.a).redAdd(u), R = this.c2.redMul(this.one.redAdd(this.d.redMul(w).redMul(u)));
    return g.cmp(R) === 0;
  };
  function E(l, b, w, u, g) {
    q.BasePoint.call(this, l, "projective"), b === null && w === null && u === null ? (this.x = this.curve.zero, this.y = this.curve.one, this.z = this.curve.one, this.t = this.curve.zero, this.zOne = !0) : (this.x = new M(b, 16), this.y = new M(w, 16), this.z = u ? new M(u, 16) : this.curve.one, this.t = g && new M(g, 16), this.x.red || (this.x = this.x.toRed(this.curve.red)), this.y.red || (this.y = this.y.toRed(this.curve.red)), this.z.red || (this.z = this.z.toRed(this.curve.red)), this.t && !this.t.red && (this.t = this.t.toRed(this.curve.red)), this.zOne = this.z === this.curve.one, this.curve.extended && !this.t && (this.t = this.x.redMul(this.y), this.zOne || (this.t = this.t.redMul(this.z.redInvm()))));
  }
  return T(E, q.BasePoint), t.prototype.pointFromJSON = function(b) {
    return E.fromJSON(this, b);
  }, t.prototype.point = function(b, w, u, g) {
    return new E(this, b, w, u, g);
  }, E.fromJSON = function(b, w) {
    return new E(b, w[0], w[1], w[2]);
  }, E.prototype.inspect = function() {
    return this.isInfinity() ? "<EC Point Infinity>" : "<EC Point x: " + this.x.fromRed().toString(16, 2) + " y: " + this.y.fromRed().toString(16, 2) + " z: " + this.z.fromRed().toString(16, 2) + ">";
  }, E.prototype.isInfinity = function() {
    return this.x.cmpn(0) === 0 && (this.y.cmp(this.z) === 0 || this.zOne && this.y.cmp(this.curve.c) === 0);
  }, E.prototype._extDbl = function() {
    var b = this.x.redSqr(), w = this.y.redSqr(), u = this.z.redSqr();
    u = u.redIAdd(u);
    var g = this.curve._mulA(b), R = this.x.redAdd(this.y).redSqr().redISub(b).redISub(w), B = g.redAdd(w), k = B.redSub(u), $ = g.redSub(w), O = R.redMul(k), D = B.redMul($), N = R.redMul($), W = k.redMul(B);
    return this.curve.point(O, D, W, N);
  }, E.prototype._projDbl = function() {
    var b = this.x.redAdd(this.y).redSqr(), w = this.x.redSqr(), u = this.y.redSqr(), g, R, B, k, $, O;
    if (this.curve.twisted) {
      k = this.curve._mulA(w);
      var D = k.redAdd(u);
      this.zOne ? (g = b.redSub(w).redSub(u).redMul(D.redSub(this.curve.two)), R = D.redMul(k.redSub(u)), B = D.redSqr().redSub(D).redSub(D)) : ($ = this.z.redSqr(), O = D.redSub($).redISub($), g = b.redSub(w).redISub(u).redMul(O), R = D.redMul(k.redSub(u)), B = D.redMul(O));
    } else
      k = w.redAdd(u), $ = this.curve._mulC(this.z).redSqr(), O = k.redSub($).redSub($), g = this.curve._mulC(b.redISub(k)).redMul(O), R = this.curve._mulC(k).redMul(w.redISub(u)), B = k.redMul(O);
    return this.curve.point(g, R, B);
  }, E.prototype.dbl = function() {
    return this.isInfinity() ? this : this.curve.extended ? this._extDbl() : this._projDbl();
  }, E.prototype._extAdd = function(b) {
    var w = this.y.redSub(this.x).redMul(b.y.redSub(b.x)), u = this.y.redAdd(this.x).redMul(b.y.redAdd(b.x)), g = this.t.redMul(this.curve.dd).redMul(b.t), R = this.z.redMul(b.z.redAdd(b.z)), B = u.redSub(w), k = R.redSub(g), $ = R.redAdd(g), O = u.redAdd(w), D = B.redMul(k), N = $.redMul(O), W = B.redMul(O), z = k.redMul($);
    return this.curve.point(D, N, z, W);
  }, E.prototype._projAdd = function(b) {
    var w = this.z.redMul(b.z), u = w.redSqr(), g = this.x.redMul(b.x), R = this.y.redMul(b.y), B = this.curve.d.redMul(g).redMul(R), k = u.redSub(B), $ = u.redAdd(B), O = this.x.redAdd(this.y).redMul(b.x.redAdd(b.y)).redISub(g).redISub(R), D = w.redMul(k).redMul(O), N, W;
    return this.curve.twisted ? (N = w.redMul($).redMul(R.redSub(this.curve._mulA(g))), W = k.redMul($)) : (N = w.redMul($).redMul(R.redSub(g)), W = this.curve._mulC(k).redMul($)), this.curve.point(D, N, W);
  }, E.prototype.add = function(b) {
    return this.isInfinity() ? b : b.isInfinity() ? this : this.curve.extended ? this._extAdd(b) : this._projAdd(b);
  }, E.prototype.mul = function(b) {
    return this._hasDoubles(b) ? this.curve._fixedNafMul(this, b) : this.curve._wnafMul(this, b);
  }, E.prototype.mulAdd = function(b, w, u) {
    return this.curve._wnafMulAdd(1, [this, w], [b, u], 2, !1);
  }, E.prototype.jmulAdd = function(b, w, u) {
    return this.curve._wnafMulAdd(1, [this, w], [b, u], 2, !0);
  }, E.prototype.normalize = function() {
    if (this.zOne)
      return this;
    var b = this.z.redInvm();
    return this.x = this.x.redMul(b), this.y = this.y.redMul(b), this.t && (this.t = this.t.redMul(b)), this.z = this.curve.one, this.zOne = !0, this;
  }, E.prototype.neg = function() {
    return this.curve.point(
      this.x.redNeg(),
      this.y,
      this.z,
      this.t && this.t.redNeg()
    );
  }, E.prototype.getX = function() {
    return this.normalize(), this.x.fromRed();
  }, E.prototype.getY = function() {
    return this.normalize(), this.y.fromRed();
  }, E.prototype.eq = function(b) {
    return this === b || this.getX().cmp(b.getX()) === 0 && this.getY().cmp(b.getY()) === 0;
  }, E.prototype.eqXToP = function(b) {
    var w = b.toRed(this.curve.red).redMul(this.z);
    if (this.x.cmp(w) === 0)
      return !0;
    for (var u = b.clone(), g = this.curve.redN.redMul(this.z); ; ) {
      if (u.iadd(this.curve.n), u.cmp(this.curve.p) >= 0)
        return !1;
      if (w.redIAdd(g), this.x.cmp(w) === 0)
        return !0;
    }
  }, E.prototype.toP = E.prototype.normalize, E.prototype.mixedAdd = E.prototype.add, edwards;
}
var hasRequiredCurve;
function requireCurve() {
  return hasRequiredCurve || (hasRequiredCurve = 1, function(I) {
    var M = I;
    M.base = requireBase$1(), M.short = requireShort(), M.mont = requireMont(), M.edwards = requireEdwards();
  }(curve)), curve;
}
var curves = {}, hash = {}, utils = {}, hasRequiredUtils;
function requireUtils() {
  if (hasRequiredUtils) return utils;
  hasRequiredUtils = 1;
  var I = requireMinimalisticAssert(), M = requireInherits_browser();
  utils.inherits = M;
  function T(A, c) {
    return (A.charCodeAt(c) & 64512) !== 55296 || c < 0 || c + 1 >= A.length ? !1 : (A.charCodeAt(c + 1) & 64512) === 56320;
  }
  function q(A, c) {
    if (Array.isArray(A))
      return A.slice();
    if (!A)
      return [];
    var e = [];
    if (typeof A == "string")
      if (c) {
        if (c === "hex")
          for (A = A.replace(/[^a-z0-9]+/ig, ""), A.length % 2 !== 0 && (A = "0" + A), v = 0; v < A.length; v += 2)
            e.push(parseInt(A[v] + A[v + 1], 16));
      } else for (var a = 0, v = 0; v < A.length; v++) {
        var x = A.charCodeAt(v);
        x < 128 ? e[a++] = x : x < 2048 ? (e[a++] = x >> 6 | 192, e[a++] = x & 63 | 128) : T(A, v) ? (x = 65536 + ((x & 1023) << 10) + (A.charCodeAt(++v) & 1023), e[a++] = x >> 18 | 240, e[a++] = x >> 12 & 63 | 128, e[a++] = x >> 6 & 63 | 128, e[a++] = x & 63 | 128) : (e[a++] = x >> 12 | 224, e[a++] = x >> 6 & 63 | 128, e[a++] = x & 63 | 128);
      }
    else
      for (v = 0; v < A.length; v++)
        e[v] = A[v] | 0;
    return e;
  }
  utils.toArray = q;
  function C(A) {
    for (var c = "", e = 0; e < A.length; e++)
      c += l(A[e].toString(16));
    return c;
  }
  utils.toHex = C;
  function t(A) {
    var c = A >>> 24 | A >>> 8 & 65280 | A << 8 & 16711680 | (A & 255) << 24;
    return c >>> 0;
  }
  utils.htonl = t;
  function E(A, c) {
    for (var e = "", a = 0; a < A.length; a++) {
      var v = A[a];
      c === "little" && (v = t(v)), e += b(v.toString(16));
    }
    return e;
  }
  utils.toHex32 = E;
  function l(A) {
    return A.length === 1 ? "0" + A : A;
  }
  utils.zero2 = l;
  function b(A) {
    return A.length === 7 ? "0" + A : A.length === 6 ? "00" + A : A.length === 5 ? "000" + A : A.length === 4 ? "0000" + A : A.length === 3 ? "00000" + A : A.length === 2 ? "000000" + A : A.length === 1 ? "0000000" + A : A;
  }
  utils.zero8 = b;
  function w(A, c, e, a) {
    var v = e - c;
    I(v % 4 === 0);
    for (var x = new Array(v / 4), d = 0, y = c; d < x.length; d++, y += 4) {
      var p;
      a === "big" ? p = A[y] << 24 | A[y + 1] << 16 | A[y + 2] << 8 | A[y + 3] : p = A[y + 3] << 24 | A[y + 2] << 16 | A[y + 1] << 8 | A[y], x[d] = p >>> 0;
    }
    return x;
  }
  utils.join32 = w;
  function u(A, c) {
    for (var e = new Array(A.length * 4), a = 0, v = 0; a < A.length; a++, v += 4) {
      var x = A[a];
      c === "big" ? (e[v] = x >>> 24, e[v + 1] = x >>> 16 & 255, e[v + 2] = x >>> 8 & 255, e[v + 3] = x & 255) : (e[v + 3] = x >>> 24, e[v + 2] = x >>> 16 & 255, e[v + 1] = x >>> 8 & 255, e[v] = x & 255);
    }
    return e;
  }
  utils.split32 = u;
  function g(A, c) {
    return A >>> c | A << 32 - c;
  }
  utils.rotr32 = g;
  function R(A, c) {
    return A << c | A >>> 32 - c;
  }
  utils.rotl32 = R;
  function B(A, c) {
    return A + c >>> 0;
  }
  utils.sum32 = B;
  function k(A, c, e) {
    return A + c + e >>> 0;
  }
  utils.sum32_3 = k;
  function $(A, c, e, a) {
    return A + c + e + a >>> 0;
  }
  utils.sum32_4 = $;
  function O(A, c, e, a, v) {
    return A + c + e + a + v >>> 0;
  }
  utils.sum32_5 = O;
  function D(A, c, e, a) {
    var v = A[c], x = A[c + 1], d = a + x >>> 0, y = (d < a ? 1 : 0) + e + v;
    A[c] = y >>> 0, A[c + 1] = d;
  }
  utils.sum64 = D;
  function N(A, c, e, a) {
    var v = c + a >>> 0, x = (v < c ? 1 : 0) + A + e;
    return x >>> 0;
  }
  utils.sum64_hi = N;
  function W(A, c, e, a) {
    var v = c + a;
    return v >>> 0;
  }
  utils.sum64_lo = W;
  function z(A, c, e, a, v, x, d, y) {
    var p = 0, _ = c;
    _ = _ + a >>> 0, p += _ < c ? 1 : 0, _ = _ + x >>> 0, p += _ < x ? 1 : 0, _ = _ + y >>> 0, p += _ < y ? 1 : 0;
    var o = A + e + v + d + p;
    return o >>> 0;
  }
  utils.sum64_4_hi = z;
  function X(A, c, e, a, v, x, d, y) {
    var p = c + a + x + y;
    return p >>> 0;
  }
  utils.sum64_4_lo = X;
  function Q(A, c, e, a, v, x, d, y, p, _) {
    var o = 0, P = c;
    P = P + a >>> 0, o += P < c ? 1 : 0, P = P + x >>> 0, o += P < x ? 1 : 0, P = P + y >>> 0, o += P < y ? 1 : 0, P = P + _ >>> 0, o += P < _ ? 1 : 0;
    var Z = A + e + v + d + p + o;
    return Z >>> 0;
  }
  utils.sum64_5_hi = Q;
  function ae(A, c, e, a, v, x, d, y, p, _) {
    var o = c + a + x + y + _;
    return o >>> 0;
  }
  utils.sum64_5_lo = ae;
  function fe(A, c, e) {
    var a = c << 32 - e | A >>> e;
    return a >>> 0;
  }
  utils.rotr64_hi = fe;
  function te(A, c, e) {
    var a = A << 32 - e | c >>> e;
    return a >>> 0;
  }
  utils.rotr64_lo = te;
  function ce(A, c, e) {
    return A >>> e;
  }
  utils.shr64_hi = ce;
  function H(A, c, e) {
    var a = A << 32 - e | c >>> e;
    return a >>> 0;
  }
  return utils.shr64_lo = H, utils;
}
var common$1 = {}, hasRequiredCommon$1;
function requireCommon$1() {
  if (hasRequiredCommon$1) return common$1;
  hasRequiredCommon$1 = 1;
  var I = requireUtils(), M = requireMinimalisticAssert();
  function T() {
    this.pending = null, this.pendingTotal = 0, this.blockSize = this.constructor.blockSize, this.outSize = this.constructor.outSize, this.hmacStrength = this.constructor.hmacStrength, this.padLength = this.constructor.padLength / 8, this.endian = "big", this._delta8 = this.blockSize / 8, this._delta32 = this.blockSize / 32;
  }
  return common$1.BlockHash = T, T.prototype.update = function(C, t) {
    if (C = I.toArray(C, t), this.pending ? this.pending = this.pending.concat(C) : this.pending = C, this.pendingTotal += C.length, this.pending.length >= this._delta8) {
      C = this.pending;
      var E = C.length % this._delta8;
      this.pending = C.slice(C.length - E, C.length), this.pending.length === 0 && (this.pending = null), C = I.join32(C, 0, C.length - E, this.endian);
      for (var l = 0; l < C.length; l += this._delta32)
        this._update(C, l, l + this._delta32);
    }
    return this;
  }, T.prototype.digest = function(C) {
    return this.update(this._pad()), M(this.pending === null), this._digest(C);
  }, T.prototype._pad = function() {
    var C = this.pendingTotal, t = this._delta8, E = t - (C + this.padLength) % t, l = new Array(E + this.padLength);
    l[0] = 128;
    for (var b = 1; b < E; b++)
      l[b] = 0;
    if (C <<= 3, this.endian === "big") {
      for (var w = 8; w < this.padLength; w++)
        l[b++] = 0;
      l[b++] = 0, l[b++] = 0, l[b++] = 0, l[b++] = 0, l[b++] = C >>> 24 & 255, l[b++] = C >>> 16 & 255, l[b++] = C >>> 8 & 255, l[b++] = C & 255;
    } else
      for (l[b++] = C & 255, l[b++] = C >>> 8 & 255, l[b++] = C >>> 16 & 255, l[b++] = C >>> 24 & 255, l[b++] = 0, l[b++] = 0, l[b++] = 0, l[b++] = 0, w = 8; w < this.padLength; w++)
        l[b++] = 0;
    return l;
  }, common$1;
}
var sha = {}, common = {}, hasRequiredCommon;
function requireCommon() {
  if (hasRequiredCommon) return common;
  hasRequiredCommon = 1;
  var I = requireUtils(), M = I.rotr32;
  function T(u, g, R, B) {
    if (u === 0)
      return q(g, R, B);
    if (u === 1 || u === 3)
      return t(g, R, B);
    if (u === 2)
      return C(g, R, B);
  }
  common.ft_1 = T;
  function q(u, g, R) {
    return u & g ^ ~u & R;
  }
  common.ch32 = q;
  function C(u, g, R) {
    return u & g ^ u & R ^ g & R;
  }
  common.maj32 = C;
  function t(u, g, R) {
    return u ^ g ^ R;
  }
  common.p32 = t;
  function E(u) {
    return M(u, 2) ^ M(u, 13) ^ M(u, 22);
  }
  common.s0_256 = E;
  function l(u) {
    return M(u, 6) ^ M(u, 11) ^ M(u, 25);
  }
  common.s1_256 = l;
  function b(u) {
    return M(u, 7) ^ M(u, 18) ^ u >>> 3;
  }
  common.g0_256 = b;
  function w(u) {
    return M(u, 17) ^ M(u, 19) ^ u >>> 10;
  }
  return common.g1_256 = w, common;
}
var _1, hasRequired_1;
function require_1() {
  if (hasRequired_1) return _1;
  hasRequired_1 = 1;
  var I = requireUtils(), M = requireCommon$1(), T = requireCommon(), q = I.rotl32, C = I.sum32, t = I.sum32_5, E = T.ft_1, l = M.BlockHash, b = [
    1518500249,
    1859775393,
    2400959708,
    3395469782
  ];
  function w() {
    if (!(this instanceof w))
      return new w();
    l.call(this), this.h = [
      1732584193,
      4023233417,
      2562383102,
      271733878,
      3285377520
    ], this.W = new Array(80);
  }
  return I.inherits(w, l), _1 = w, w.blockSize = 512, w.outSize = 160, w.hmacStrength = 80, w.padLength = 64, w.prototype._update = function(g, R) {
    for (var B = this.W, k = 0; k < 16; k++)
      B[k] = g[R + k];
    for (; k < B.length; k++)
      B[k] = q(B[k - 3] ^ B[k - 8] ^ B[k - 14] ^ B[k - 16], 1);
    var $ = this.h[0], O = this.h[1], D = this.h[2], N = this.h[3], W = this.h[4];
    for (k = 0; k < B.length; k++) {
      var z = ~~(k / 20), X = t(q($, 5), E(z, O, D, N), W, B[k], b[z]);
      W = N, N = D, D = q(O, 30), O = $, $ = X;
    }
    this.h[0] = C(this.h[0], $), this.h[1] = C(this.h[1], O), this.h[2] = C(this.h[2], D), this.h[3] = C(this.h[3], N), this.h[4] = C(this.h[4], W);
  }, w.prototype._digest = function(g) {
    return g === "hex" ? I.toHex32(this.h, "big") : I.split32(this.h, "big");
  }, _1;
}
var _256, hasRequired_256;
function require_256() {
  if (hasRequired_256) return _256;
  hasRequired_256 = 1;
  var I = requireUtils(), M = requireCommon$1(), T = requireCommon(), q = requireMinimalisticAssert(), C = I.sum32, t = I.sum32_4, E = I.sum32_5, l = T.ch32, b = T.maj32, w = T.s0_256, u = T.s1_256, g = T.g0_256, R = T.g1_256, B = M.BlockHash, k = [
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
  function $() {
    if (!(this instanceof $))
      return new $();
    B.call(this), this.h = [
      1779033703,
      3144134277,
      1013904242,
      2773480762,
      1359893119,
      2600822924,
      528734635,
      1541459225
    ], this.k = k, this.W = new Array(64);
  }
  return I.inherits($, B), _256 = $, $.blockSize = 512, $.outSize = 256, $.hmacStrength = 192, $.padLength = 64, $.prototype._update = function(D, N) {
    for (var W = this.W, z = 0; z < 16; z++)
      W[z] = D[N + z];
    for (; z < W.length; z++)
      W[z] = t(R(W[z - 2]), W[z - 7], g(W[z - 15]), W[z - 16]);
    var X = this.h[0], Q = this.h[1], ae = this.h[2], fe = this.h[3], te = this.h[4], ce = this.h[5], H = this.h[6], A = this.h[7];
    for (q(this.k.length === W.length), z = 0; z < W.length; z++) {
      var c = E(A, u(te), l(te, ce, H), this.k[z], W[z]), e = C(w(X), b(X, Q, ae));
      A = H, H = ce, ce = te, te = C(fe, c), fe = ae, ae = Q, Q = X, X = C(c, e);
    }
    this.h[0] = C(this.h[0], X), this.h[1] = C(this.h[1], Q), this.h[2] = C(this.h[2], ae), this.h[3] = C(this.h[3], fe), this.h[4] = C(this.h[4], te), this.h[5] = C(this.h[5], ce), this.h[6] = C(this.h[6], H), this.h[7] = C(this.h[7], A);
  }, $.prototype._digest = function(D) {
    return D === "hex" ? I.toHex32(this.h, "big") : I.split32(this.h, "big");
  }, _256;
}
var _224, hasRequired_224;
function require_224() {
  if (hasRequired_224) return _224;
  hasRequired_224 = 1;
  var I = requireUtils(), M = require_256();
  function T() {
    if (!(this instanceof T))
      return new T();
    M.call(this), this.h = [
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
  return I.inherits(T, M), _224 = T, T.blockSize = 512, T.outSize = 224, T.hmacStrength = 192, T.padLength = 64, T.prototype._digest = function(C) {
    return C === "hex" ? I.toHex32(this.h.slice(0, 7), "big") : I.split32(this.h.slice(0, 7), "big");
  }, _224;
}
var _512, hasRequired_512;
function require_512() {
  if (hasRequired_512) return _512;
  hasRequired_512 = 1;
  var I = requireUtils(), M = requireCommon$1(), T = requireMinimalisticAssert(), q = I.rotr64_hi, C = I.rotr64_lo, t = I.shr64_hi, E = I.shr64_lo, l = I.sum64, b = I.sum64_hi, w = I.sum64_lo, u = I.sum64_4_hi, g = I.sum64_4_lo, R = I.sum64_5_hi, B = I.sum64_5_lo, k = M.BlockHash, $ = [
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
  function O() {
    if (!(this instanceof O))
      return new O();
    k.call(this), this.h = [
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
    ], this.k = $, this.W = new Array(160);
  }
  I.inherits(O, k), _512 = O, O.blockSize = 1024, O.outSize = 512, O.hmacStrength = 192, O.padLength = 128, O.prototype._prepareBlock = function(e, a) {
    for (var v = this.W, x = 0; x < 32; x++)
      v[x] = e[a + x];
    for (; x < v.length; x += 2) {
      var d = H(v[x - 4], v[x - 3]), y = A(v[x - 4], v[x - 3]), p = v[x - 14], _ = v[x - 13], o = te(v[x - 30], v[x - 29]), P = ce(v[x - 30], v[x - 29]), Z = v[x - 32], ee = v[x - 31];
      v[x] = u(
        d,
        y,
        p,
        _,
        o,
        P,
        Z,
        ee
      ), v[x + 1] = g(
        d,
        y,
        p,
        _,
        o,
        P,
        Z,
        ee
      );
    }
  }, O.prototype._update = function(e, a) {
    this._prepareBlock(e, a);
    var v = this.W, x = this.h[0], d = this.h[1], y = this.h[2], p = this.h[3], _ = this.h[4], o = this.h[5], P = this.h[6], Z = this.h[7], ee = this.h[8], K = this.h[9], L = this.h[10], j = this.h[11], re = this.h[12], ne = this.h[13], J = this.h[14], G = this.h[15];
    T(this.k.length === v.length);
    for (var se = 0; se < v.length; se += 2) {
      var ue = J, de = G, Y = ae(ee, K), F = fe(ee, K), U = D(ee, K, L, j, re), V = N(ee, K, L, j, re, ne), ie = this.k[se], oe = this.k[se + 1], he = v[se], ve = v[se + 1], le = R(
        ue,
        de,
        Y,
        F,
        U,
        V,
        ie,
        oe,
        he,
        ve
      ), ye = B(
        ue,
        de,
        Y,
        F,
        U,
        V,
        ie,
        oe,
        he,
        ve
      );
      ue = X(x, d), de = Q(x, d), Y = W(x, d, y, p, _), F = z(x, d, y, p, _, o);
      var be = b(ue, de, Y, F), pe = w(ue, de, Y, F);
      J = re, G = ne, re = L, ne = j, L = ee, j = K, ee = b(P, Z, le, ye), K = w(Z, Z, le, ye), P = _, Z = o, _ = y, o = p, y = x, p = d, x = b(le, ye, be, pe), d = w(le, ye, be, pe);
    }
    l(this.h, 0, x, d), l(this.h, 2, y, p), l(this.h, 4, _, o), l(this.h, 6, P, Z), l(this.h, 8, ee, K), l(this.h, 10, L, j), l(this.h, 12, re, ne), l(this.h, 14, J, G);
  }, O.prototype._digest = function(e) {
    return e === "hex" ? I.toHex32(this.h, "big") : I.split32(this.h, "big");
  };
  function D(c, e, a, v, x) {
    var d = c & a ^ ~c & x;
    return d < 0 && (d += 4294967296), d;
  }
  function N(c, e, a, v, x, d) {
    var y = e & v ^ ~e & d;
    return y < 0 && (y += 4294967296), y;
  }
  function W(c, e, a, v, x) {
    var d = c & a ^ c & x ^ a & x;
    return d < 0 && (d += 4294967296), d;
  }
  function z(c, e, a, v, x, d) {
    var y = e & v ^ e & d ^ v & d;
    return y < 0 && (y += 4294967296), y;
  }
  function X(c, e) {
    var a = q(c, e, 28), v = q(e, c, 2), x = q(e, c, 7), d = a ^ v ^ x;
    return d < 0 && (d += 4294967296), d;
  }
  function Q(c, e) {
    var a = C(c, e, 28), v = C(e, c, 2), x = C(e, c, 7), d = a ^ v ^ x;
    return d < 0 && (d += 4294967296), d;
  }
  function ae(c, e) {
    var a = q(c, e, 14), v = q(c, e, 18), x = q(e, c, 9), d = a ^ v ^ x;
    return d < 0 && (d += 4294967296), d;
  }
  function fe(c, e) {
    var a = C(c, e, 14), v = C(c, e, 18), x = C(e, c, 9), d = a ^ v ^ x;
    return d < 0 && (d += 4294967296), d;
  }
  function te(c, e) {
    var a = q(c, e, 1), v = q(c, e, 8), x = t(c, e, 7), d = a ^ v ^ x;
    return d < 0 && (d += 4294967296), d;
  }
  function ce(c, e) {
    var a = C(c, e, 1), v = C(c, e, 8), x = E(c, e, 7), d = a ^ v ^ x;
    return d < 0 && (d += 4294967296), d;
  }
  function H(c, e) {
    var a = q(c, e, 19), v = q(e, c, 29), x = t(c, e, 6), d = a ^ v ^ x;
    return d < 0 && (d += 4294967296), d;
  }
  function A(c, e) {
    var a = C(c, e, 19), v = C(e, c, 29), x = E(c, e, 6), d = a ^ v ^ x;
    return d < 0 && (d += 4294967296), d;
  }
  return _512;
}
var _384, hasRequired_384;
function require_384() {
  if (hasRequired_384) return _384;
  hasRequired_384 = 1;
  var I = requireUtils(), M = require_512();
  function T() {
    if (!(this instanceof T))
      return new T();
    M.call(this), this.h = [
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
  return I.inherits(T, M), _384 = T, T.blockSize = 1024, T.outSize = 384, T.hmacStrength = 192, T.padLength = 128, T.prototype._digest = function(C) {
    return C === "hex" ? I.toHex32(this.h.slice(0, 12), "big") : I.split32(this.h.slice(0, 12), "big");
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
  var I = requireUtils(), M = requireCommon$1(), T = I.rotl32, q = I.sum32, C = I.sum32_3, t = I.sum32_4, E = M.BlockHash;
  function l() {
    if (!(this instanceof l))
      return new l();
    E.call(this), this.h = [1732584193, 4023233417, 2562383102, 271733878, 3285377520], this.endian = "little";
  }
  I.inherits(l, E), ripemd.ripemd160 = l, l.blockSize = 512, l.outSize = 160, l.hmacStrength = 192, l.padLength = 64, l.prototype._update = function(O, D) {
    for (var N = this.h[0], W = this.h[1], z = this.h[2], X = this.h[3], Q = this.h[4], ae = N, fe = W, te = z, ce = X, H = Q, A = 0; A < 80; A++) {
      var c = q(
        T(
          t(N, b(A, W, z, X), O[g[A] + D], w(A)),
          B[A]
        ),
        Q
      );
      N = Q, Q = X, X = T(z, 10), z = W, W = c, c = q(
        T(
          t(ae, b(79 - A, fe, te, ce), O[R[A] + D], u(A)),
          k[A]
        ),
        H
      ), ae = H, H = ce, ce = T(te, 10), te = fe, fe = c;
    }
    c = C(this.h[1], z, ce), this.h[1] = C(this.h[2], X, H), this.h[2] = C(this.h[3], Q, ae), this.h[3] = C(this.h[4], N, fe), this.h[4] = C(this.h[0], W, te), this.h[0] = c;
  }, l.prototype._digest = function(O) {
    return O === "hex" ? I.toHex32(this.h, "little") : I.split32(this.h, "little");
  };
  function b($, O, D, N) {
    return $ <= 15 ? O ^ D ^ N : $ <= 31 ? O & D | ~O & N : $ <= 47 ? (O | ~D) ^ N : $ <= 63 ? O & N | D & ~N : O ^ (D | ~N);
  }
  function w($) {
    return $ <= 15 ? 0 : $ <= 31 ? 1518500249 : $ <= 47 ? 1859775393 : $ <= 63 ? 2400959708 : 2840853838;
  }
  function u($) {
    return $ <= 15 ? 1352829926 : $ <= 31 ? 1548603684 : $ <= 47 ? 1836072691 : $ <= 63 ? 2053994217 : 0;
  }
  var g = [
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
  ], R = [
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
  ], B = [
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
  ], k = [
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
  var I = requireUtils(), M = requireMinimalisticAssert();
  function T(q, C, t) {
    if (!(this instanceof T))
      return new T(q, C, t);
    this.Hash = q, this.blockSize = q.blockSize / 8, this.outSize = q.outSize / 8, this.inner = null, this.outer = null, this._init(I.toArray(C, t));
  }
  return hmac = T, T.prototype._init = function(C) {
    C.length > this.blockSize && (C = new this.Hash().update(C).digest()), M(C.length <= this.blockSize);
    for (var t = C.length; t < this.blockSize; t++)
      C.push(0);
    for (t = 0; t < C.length; t++)
      C[t] ^= 54;
    for (this.inner = new this.Hash().update(C), t = 0; t < C.length; t++)
      C[t] ^= 106;
    this.outer = new this.Hash().update(C);
  }, T.prototype.update = function(C, t) {
    return this.inner.update(C, t), this;
  }, T.prototype.digest = function(C) {
    return this.outer.update(this.inner.digest()), this.outer.digest(C);
  }, hmac;
}
var hasRequiredHash;
function requireHash() {
  return hasRequiredHash || (hasRequiredHash = 1, function(I) {
    var M = I;
    M.utils = requireUtils(), M.common = requireCommon$1(), M.sha = requireSha(), M.ripemd = requireRipemd(), M.hmac = requireHmac(), M.sha1 = M.sha.sha1, M.sha256 = M.sha.sha256, M.sha224 = M.sha.sha224, M.sha384 = M.sha.sha384, M.sha512 = M.sha.sha512, M.ripemd160 = M.ripemd.ripemd160;
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
  return hasRequiredCurves || (hasRequiredCurves = 1, function(I) {
    var M = I, T = requireHash(), q = requireCurve(), C = requireUtils$1(), t = C.assert;
    function E(w) {
      w.type === "short" ? this.curve = new q.short(w) : w.type === "edwards" ? this.curve = new q.edwards(w) : this.curve = new q.mont(w), this.g = this.curve.g, this.n = this.curve.n, this.hash = w.hash, t(this.g.validate(), "Invalid curve"), t(this.g.mul(this.n).isInfinity(), "Invalid curve, G*N != O");
    }
    M.PresetCurve = E;
    function l(w, u) {
      Object.defineProperty(M, w, {
        configurable: !0,
        enumerable: !0,
        get: function() {
          var g = new E(u);
          return Object.defineProperty(M, w, {
            configurable: !0,
            enumerable: !0,
            value: g
          }), g;
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
      hash: T.sha256,
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
      hash: T.sha256,
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
      hash: T.sha256,
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
      hash: T.sha384,
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
      hash: T.sha512,
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
      hash: T.sha256,
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
      hash: T.sha256,
      gRed: !1,
      g: [
        "216936d3cd6e53fec0a4e231fdd6dc5c692cc7609525a7b2c9562d608f25d51a",
        // 4/5
        "6666666666666666666666666666666666666666666666666666666666666658"
      ]
    });
    var b;
    try {
      b = requireSecp256k1();
    } catch (w) {
      b = void 0;
    }
    l("secp256k1", {
      type: "short",
      prime: "k256",
      p: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f",
      a: "0",
      b: "7",
      n: "ffffffff ffffffff ffffffff fffffffe baaedce6 af48a03b bfd25e8c d0364141",
      h: "1",
      hash: T.sha256,
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
        b
      ]
    });
  }(curves)), curves;
}
var hmacDrbg, hasRequiredHmacDrbg;
function requireHmacDrbg() {
  if (hasRequiredHmacDrbg) return hmacDrbg;
  hasRequiredHmacDrbg = 1;
  var I = requireHash(), M = requireUtils$2(), T = requireMinimalisticAssert();
  function q(C) {
    if (!(this instanceof q))
      return new q(C);
    this.hash = C.hash, this.predResist = !!C.predResist, this.outLen = this.hash.outSize, this.minEntropy = C.minEntropy || this.hash.hmacStrength, this._reseed = null, this.reseedInterval = null, this.K = null, this.V = null;
    var t = M.toArray(C.entropy, C.entropyEnc || "hex"), E = M.toArray(C.nonce, C.nonceEnc || "hex"), l = M.toArray(C.pers, C.persEnc || "hex");
    T(
      t.length >= this.minEntropy / 8,
      "Not enough entropy. Minimum is: " + this.minEntropy + " bits"
    ), this._init(t, E, l);
  }
  return hmacDrbg = q, q.prototype._init = function(t, E, l) {
    var b = t.concat(E).concat(l);
    this.K = new Array(this.outLen / 8), this.V = new Array(this.outLen / 8);
    for (var w = 0; w < this.V.length; w++)
      this.K[w] = 0, this.V[w] = 1;
    this._update(b), this._reseed = 1, this.reseedInterval = 281474976710656;
  }, q.prototype._hmac = function() {
    return new I.hmac(this.hash, this.K);
  }, q.prototype._update = function(t) {
    var E = this._hmac().update(this.V).update([0]);
    t && (E = E.update(t)), this.K = E.digest(), this.V = this._hmac().update(this.V).digest(), t && (this.K = this._hmac().update(this.V).update([1]).update(t).digest(), this.V = this._hmac().update(this.V).digest());
  }, q.prototype.reseed = function(t, E, l, b) {
    typeof E != "string" && (b = l, l = E, E = null), t = M.toArray(t, E), l = M.toArray(l, b), T(
      t.length >= this.minEntropy / 8,
      "Not enough entropy. Minimum is: " + this.minEntropy + " bits"
    ), this._update(t.concat(l || [])), this._reseed = 1;
  }, q.prototype.generate = function(t, E, l, b) {
    if (this._reseed > this.reseedInterval)
      throw new Error("Reseed is required");
    typeof E != "string" && (b = l, l = E, E = null), l && (l = M.toArray(l, b || "hex"), this._update(l));
    for (var w = []; w.length < t; )
      this.V = this._hmac().update(this.V).digest(), w = w.concat(this.V);
    var u = w.slice(0, t);
    return this._update(l), this._reseed++, M.encode(u, E);
  }, hmacDrbg;
}
var key$1, hasRequiredKey$1;
function requireKey$1() {
  if (hasRequiredKey$1) return key$1;
  hasRequiredKey$1 = 1;
  var I = requireBn$2(), M = requireUtils$1(), T = M.assert;
  function q(C, t) {
    this.ec = C, this.priv = null, this.pub = null, t.priv && this._importPrivate(t.priv, t.privEnc), t.pub && this._importPublic(t.pub, t.pubEnc);
  }
  return key$1 = q, q.fromPublic = function(t, E, l) {
    return E instanceof q ? E : new q(t, {
      pub: E,
      pubEnc: l
    });
  }, q.fromPrivate = function(t, E, l) {
    return E instanceof q ? E : new q(t, {
      priv: E,
      privEnc: l
    });
  }, q.prototype.validate = function() {
    var t = this.getPublic();
    return t.isInfinity() ? { result: !1, reason: "Invalid public key" } : t.validate() ? t.mul(this.ec.curve.n).isInfinity() ? { result: !0, reason: null } : { result: !1, reason: "Public key * N != O" } : { result: !1, reason: "Public key is not a point" };
  }, q.prototype.getPublic = function(t, E) {
    return typeof t == "string" && (E = t, t = null), this.pub || (this.pub = this.ec.g.mul(this.priv)), E ? this.pub.encode(E, t) : this.pub;
  }, q.prototype.getPrivate = function(t) {
    return t === "hex" ? this.priv.toString(16, 2) : this.priv;
  }, q.prototype._importPrivate = function(t, E) {
    this.priv = new I(t, E || 16), this.priv = this.priv.umod(this.ec.curve.n);
  }, q.prototype._importPublic = function(t, E) {
    if (t.x || t.y) {
      this.ec.curve.type === "mont" ? T(t.x, "Need x coordinate") : (this.ec.curve.type === "short" || this.ec.curve.type === "edwards") && T(t.x && t.y, "Need both x and y coordinate"), this.pub = this.ec.curve.point(t.x, t.y);
      return;
    }
    this.pub = this.ec.curve.decodePoint(t, E);
  }, q.prototype.derive = function(t) {
    return t.validate() || T(t.validate(), "public point not validated"), t.mul(this.priv).getX();
  }, q.prototype.sign = function(t, E, l) {
    return this.ec.sign(t, this, E, l);
  }, q.prototype.verify = function(t, E) {
    return this.ec.verify(t, E, this);
  }, q.prototype.inspect = function() {
    return "<Key priv: " + (this.priv && this.priv.toString(16, 2)) + " pub: " + (this.pub && this.pub.inspect()) + " >";
  }, key$1;
}
var signature$1, hasRequiredSignature$1;
function requireSignature$1() {
  if (hasRequiredSignature$1) return signature$1;
  hasRequiredSignature$1 = 1;
  var I = requireBn$2(), M = requireUtils$1(), T = M.assert;
  function q(b, w) {
    if (b instanceof q)
      return b;
    this._importDER(b, w) || (T(b.r && b.s, "Signature without r or s"), this.r = new I(b.r, 16), this.s = new I(b.s, 16), b.recoveryParam === void 0 ? this.recoveryParam = null : this.recoveryParam = b.recoveryParam);
  }
  signature$1 = q;
  function C() {
    this.place = 0;
  }
  function t(b, w) {
    var u = b[w.place++];
    if (!(u & 128))
      return u;
    var g = u & 15;
    if (g === 0 || g > 4)
      return !1;
    for (var R = 0, B = 0, k = w.place; B < g; B++, k++)
      R <<= 8, R |= b[k], R >>>= 0;
    return R <= 127 ? !1 : (w.place = k, R);
  }
  function E(b) {
    for (var w = 0, u = b.length - 1; !b[w] && !(b[w + 1] & 128) && w < u; )
      w++;
    return w === 0 ? b : b.slice(w);
  }
  q.prototype._importDER = function(w, u) {
    w = M.toArray(w, u);
    var g = new C();
    if (w[g.place++] !== 48)
      return !1;
    var R = t(w, g);
    if (R === !1 || R + g.place !== w.length || w[g.place++] !== 2)
      return !1;
    var B = t(w, g);
    if (B === !1)
      return !1;
    var k = w.slice(g.place, B + g.place);
    if (g.place += B, w[g.place++] !== 2)
      return !1;
    var $ = t(w, g);
    if ($ === !1 || w.length !== $ + g.place)
      return !1;
    var O = w.slice(g.place, $ + g.place);
    if (k[0] === 0)
      if (k[1] & 128)
        k = k.slice(1);
      else
        return !1;
    if (O[0] === 0)
      if (O[1] & 128)
        O = O.slice(1);
      else
        return !1;
    return this.r = new I(k), this.s = new I(O), this.recoveryParam = null, !0;
  };
  function l(b, w) {
    if (w < 128) {
      b.push(w);
      return;
    }
    var u = 1 + (Math.log(w) / Math.LN2 >>> 3);
    for (b.push(u | 128); --u; )
      b.push(w >>> (u << 3) & 255);
    b.push(w);
  }
  return q.prototype.toDER = function(w) {
    var u = this.r.toArray(), g = this.s.toArray();
    for (u[0] & 128 && (u = [0].concat(u)), g[0] & 128 && (g = [0].concat(g)), u = E(u), g = E(g); !g[0] && !(g[1] & 128); )
      g = g.slice(1);
    var R = [2];
    l(R, u.length), R = R.concat(u), R.push(2), l(R, g.length);
    var B = R.concat(g), k = [48];
    return l(k, B.length), k = k.concat(B), M.encode(k, w);
  }, signature$1;
}
var ec, hasRequiredEc;
function requireEc() {
  if (hasRequiredEc) return ec;
  hasRequiredEc = 1;
  var I = requireBn$2(), M = requireHmacDrbg(), T = requireUtils$1(), q = requireCurves(), C = requireBrorand(), t = T.assert, E = requireKey$1(), l = requireSignature$1();
  function b(w) {
    if (!(this instanceof b))
      return new b(w);
    typeof w == "string" && (t(
      Object.prototype.hasOwnProperty.call(q, w),
      "Unknown curve " + w
    ), w = q[w]), w instanceof q.PresetCurve && (w = { curve: w }), this.curve = w.curve.curve, this.n = this.curve.n, this.nh = this.n.ushrn(1), this.g = this.curve.g, this.g = w.curve.g, this.g.precompute(w.curve.n.bitLength() + 1), this.hash = w.hash || w.curve.hash;
  }
  return ec = b, b.prototype.keyPair = function(u) {
    return new E(this, u);
  }, b.prototype.keyFromPrivate = function(u, g) {
    return E.fromPrivate(this, u, g);
  }, b.prototype.keyFromPublic = function(u, g) {
    return E.fromPublic(this, u, g);
  }, b.prototype.genKeyPair = function(u) {
    u || (u = {});
    for (var g = new M({
      hash: this.hash,
      pers: u.pers,
      persEnc: u.persEnc || "utf8",
      entropy: u.entropy || C(this.hash.hmacStrength),
      entropyEnc: u.entropy && u.entropyEnc || "utf8",
      nonce: this.n.toArray()
    }), R = this.n.byteLength(), B = this.n.sub(new I(2)); ; ) {
      var k = new I(g.generate(R));
      if (!(k.cmp(B) > 0))
        return k.iaddn(1), this.keyFromPrivate(k);
    }
  }, b.prototype._truncateToN = function(u, g) {
    var R = u.byteLength() * 8 - this.n.bitLength();
    return R > 0 && (u = u.ushrn(R)), !g && u.cmp(this.n) >= 0 ? u.sub(this.n) : u;
  }, b.prototype.sign = function(u, g, R, B) {
    typeof R == "object" && (B = R, R = null), B || (B = {}), g = this.keyFromPrivate(g, R), u = this._truncateToN(new I(u, 16));
    for (var k = this.n.byteLength(), $ = g.getPrivate().toArray("be", k), O = u.toArray("be", k), D = new M({
      hash: this.hash,
      entropy: $,
      nonce: O,
      pers: B.pers,
      persEnc: B.persEnc || "utf8"
    }), N = this.n.sub(new I(1)), W = 0; ; W++) {
      var z = B.k ? B.k(W) : new I(D.generate(this.n.byteLength()));
      if (z = this._truncateToN(z, !0), !(z.cmpn(1) <= 0 || z.cmp(N) >= 0)) {
        var X = this.g.mul(z);
        if (!X.isInfinity()) {
          var Q = X.getX(), ae = Q.umod(this.n);
          if (ae.cmpn(0) !== 0) {
            var fe = z.invm(this.n).mul(ae.mul(g.getPrivate()).iadd(u));
            if (fe = fe.umod(this.n), fe.cmpn(0) !== 0) {
              var te = (X.getY().isOdd() ? 1 : 0) | (Q.cmp(ae) !== 0 ? 2 : 0);
              return B.canonical && fe.cmp(this.nh) > 0 && (fe = this.n.sub(fe), te ^= 1), new l({ r: ae, s: fe, recoveryParam: te });
            }
          }
        }
      }
    }
  }, b.prototype.verify = function(u, g, R, B) {
    u = this._truncateToN(new I(u, 16)), R = this.keyFromPublic(R, B), g = new l(g, "hex");
    var k = g.r, $ = g.s;
    if (k.cmpn(1) < 0 || k.cmp(this.n) >= 0 || $.cmpn(1) < 0 || $.cmp(this.n) >= 0)
      return !1;
    var O = $.invm(this.n), D = O.mul(u).umod(this.n), N = O.mul(k).umod(this.n), W;
    return this.curve._maxwellTrick ? (W = this.g.jmulAdd(D, R.getPublic(), N), W.isInfinity() ? !1 : W.eqXToP(k)) : (W = this.g.mulAdd(D, R.getPublic(), N), W.isInfinity() ? !1 : W.getX().umod(this.n).cmp(k) === 0);
  }, b.prototype.recoverPubKey = function(w, u, g, R) {
    t((3 & g) === g, "The recovery param is more than two bits"), u = new l(u, R);
    var B = this.n, k = new I(w), $ = u.r, O = u.s, D = g & 1, N = g >> 1;
    if ($.cmp(this.curve.p.umod(this.curve.n)) >= 0 && N)
      throw new Error("Unable to find sencond key candinate");
    N ? $ = this.curve.pointFromX($.add(this.curve.n), D) : $ = this.curve.pointFromX($, D);
    var W = u.r.invm(B), z = B.sub(k).mul(W).umod(B), X = O.mul(W).umod(B);
    return this.g.mulAdd(z, $, X);
  }, b.prototype.getKeyRecoveryParam = function(w, u, g, R) {
    if (u = new l(u, R), u.recoveryParam !== null)
      return u.recoveryParam;
    for (var B = 0; B < 4; B++) {
      var k;
      try {
        k = this.recoverPubKey(w, u, B);
      } catch ($) {
        continue;
      }
      if (k.eq(g))
        return B;
    }
    throw new Error("Unable to find valid recovery factor");
  }, ec;
}
var key, hasRequiredKey;
function requireKey() {
  if (hasRequiredKey) return key;
  hasRequiredKey = 1;
  var I = requireUtils$1(), M = I.assert, T = I.parseBytes, q = I.cachedProperty;
  function C(t, E) {
    this.eddsa = t, this._secret = T(E.secret), t.isPoint(E.pub) ? this._pub = E.pub : this._pubBytes = T(E.pub);
  }
  return C.fromPublic = function(E, l) {
    return l instanceof C ? l : new C(E, { pub: l });
  }, C.fromSecret = function(E, l) {
    return l instanceof C ? l : new C(E, { secret: l });
  }, C.prototype.secret = function() {
    return this._secret;
  }, q(C, "pubBytes", function() {
    return this.eddsa.encodePoint(this.pub());
  }), q(C, "pub", function() {
    return this._pubBytes ? this.eddsa.decodePoint(this._pubBytes) : this.eddsa.g.mul(this.priv());
  }), q(C, "privBytes", function() {
    var E = this.eddsa, l = this.hash(), b = E.encodingLength - 1, w = l.slice(0, E.encodingLength);
    return w[0] &= 248, w[b] &= 127, w[b] |= 64, w;
  }), q(C, "priv", function() {
    return this.eddsa.decodeInt(this.privBytes());
  }), q(C, "hash", function() {
    return this.eddsa.hash().update(this.secret()).digest();
  }), q(C, "messagePrefix", function() {
    return this.hash().slice(this.eddsa.encodingLength);
  }), C.prototype.sign = function(E) {
    return M(this._secret, "KeyPair can only verify"), this.eddsa.sign(E, this);
  }, C.prototype.verify = function(E, l) {
    return this.eddsa.verify(E, l, this);
  }, C.prototype.getSecret = function(E) {
    return M(this._secret, "KeyPair is public only"), I.encode(this.secret(), E);
  }, C.prototype.getPublic = function(E) {
    return I.encode(this.pubBytes(), E);
  }, key = C, key;
}
var signature, hasRequiredSignature;
function requireSignature() {
  if (hasRequiredSignature) return signature;
  hasRequiredSignature = 1;
  var I = requireBn$2(), M = requireUtils$1(), T = M.assert, q = M.cachedProperty, C = M.parseBytes;
  function t(E, l) {
    this.eddsa = E, typeof l != "object" && (l = C(l)), Array.isArray(l) && (l = {
      R: l.slice(0, E.encodingLength),
      S: l.slice(E.encodingLength)
    }), T(l.R && l.S, "Signature without R or S"), E.isPoint(l.R) && (this._R = l.R), l.S instanceof I && (this._S = l.S), this._Rencoded = Array.isArray(l.R) ? l.R : l.Rencoded, this._Sencoded = Array.isArray(l.S) ? l.S : l.Sencoded;
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
    return M.encode(this.toBytes(), "hex").toUpperCase();
  }, signature = t, signature;
}
var eddsa, hasRequiredEddsa;
function requireEddsa() {
  if (hasRequiredEddsa) return eddsa;
  hasRequiredEddsa = 1;
  var I = requireHash(), M = requireCurves(), T = requireUtils$1(), q = T.assert, C = T.parseBytes, t = requireKey(), E = requireSignature();
  function l(b) {
    if (q(b === "ed25519", "only tested with ed25519 so far"), !(this instanceof l))
      return new l(b);
    b = M[b].curve, this.curve = b, this.g = b.g, this.g.precompute(b.n.bitLength() + 1), this.pointClass = b.point().constructor, this.encodingLength = Math.ceil(b.n.bitLength() / 8), this.hash = I.sha512;
  }
  return eddsa = l, l.prototype.sign = function(w, u) {
    w = C(w);
    var g = this.keyFromSecret(u), R = this.hashInt(g.messagePrefix(), w), B = this.g.mul(R), k = this.encodePoint(B), $ = this.hashInt(k, g.pubBytes(), w).mul(g.priv()), O = R.add($).umod(this.curve.n);
    return this.makeSignature({ R: B, S: O, Rencoded: k });
  }, l.prototype.verify = function(w, u, g) {
    w = C(w), u = this.makeSignature(u);
    var R = this.keyFromPublic(g), B = this.hashInt(u.Rencoded(), R.pubBytes(), w), k = this.g.mul(u.S()), $ = u.R().add(R.pub().mul(B));
    return $.eq(k);
  }, l.prototype.hashInt = function() {
    for (var w = this.hash(), u = 0; u < arguments.length; u++)
      w.update(arguments[u]);
    return T.intFromLE(w.digest()).umod(this.curve.n);
  }, l.prototype.keyFromPublic = function(w) {
    return t.fromPublic(this, w);
  }, l.prototype.keyFromSecret = function(w) {
    return t.fromSecret(this, w);
  }, l.prototype.makeSignature = function(w) {
    return w instanceof E ? w : new E(this, w);
  }, l.prototype.encodePoint = function(w) {
    var u = w.getY().toArray("le", this.encodingLength);
    return u[this.encodingLength - 1] |= w.getX().isOdd() ? 128 : 0, u;
  }, l.prototype.decodePoint = function(w) {
    w = T.parseBytes(w);
    var u = w.length - 1, g = w.slice(0, u).concat(w[u] & -129), R = (w[u] & 128) !== 0, B = T.intFromLE(g);
    return this.curve.pointFromY(B, R);
  }, l.prototype.encodeInt = function(w) {
    return w.toArray("le", this.encodingLength);
  }, l.prototype.decodeInt = function(w) {
    return T.intFromLE(w);
  }, l.prototype.isPoint = function(w) {
    return w instanceof this.pointClass;
  }, eddsa;
}
var hasRequiredElliptic;
function requireElliptic() {
  return hasRequiredElliptic || (hasRequiredElliptic = 1, function(I) {
    var M = I;
    M.version = require$$0.version, M.utils = requireUtils$1(), M.rand = requireBrorand(), M.curve = requireCurve(), M.curves = requireCurves(), M.ec = requireEc(), M.eddsa = requireEddsa();
  }(elliptic)), elliptic;
}
var bn = { exports: {} };
bn.exports;
var hasRequiredBn;
function requireBn() {
  return hasRequiredBn || (hasRequiredBn = 1, function(I) {
    (function(M, T) {
      function q(c, e) {
        if (!c) throw new Error(e || "Assertion failed");
      }
      function C(c, e) {
        c.super_ = e;
        var a = function() {
        };
        a.prototype = e.prototype, c.prototype = new a(), c.prototype.constructor = c;
      }
      function t(c, e, a) {
        if (t.isBN(c))
          return c;
        this.negative = 0, this.words = null, this.length = 0, this.red = null, c !== null && ((e === "le" || e === "be") && (a = e, e = 10), this._init(c || 0, e || 10, a || "be"));
      }
      typeof M == "object" ? M.exports = t : T.BN = t, t.BN = t, t.wordSize = 26;
      var E;
      try {
        typeof window != "undefined" && typeof window.Buffer != "undefined" ? E = window.Buffer : E = requireBuffer$1().Buffer;
      } catch (c) {
      }
      t.isBN = function(e) {
        return e instanceof t ? !0 : e !== null && typeof e == "object" && e.constructor.wordSize === t.wordSize && Array.isArray(e.words);
      }, t.max = function(e, a) {
        return e.cmp(a) > 0 ? e : a;
      }, t.min = function(e, a) {
        return e.cmp(a) < 0 ? e : a;
      }, t.prototype._init = function(e, a, v) {
        if (typeof e == "number")
          return this._initNumber(e, a, v);
        if (typeof e == "object")
          return this._initArray(e, a, v);
        a === "hex" && (a = 16), q(a === (a | 0) && a >= 2 && a <= 36), e = e.toString().replace(/\s+/g, "");
        var x = 0;
        e[0] === "-" && (x++, this.negative = 1), x < e.length && (a === 16 ? this._parseHex(e, x, v) : (this._parseBase(e, a, x), v === "le" && this._initArray(this.toArray(), a, v)));
      }, t.prototype._initNumber = function(e, a, v) {
        e < 0 && (this.negative = 1, e = -e), e < 67108864 ? (this.words = [e & 67108863], this.length = 1) : e < 4503599627370496 ? (this.words = [
          e & 67108863,
          e / 67108864 & 67108863
        ], this.length = 2) : (q(e < 9007199254740992), this.words = [
          e & 67108863,
          e / 67108864 & 67108863,
          1
        ], this.length = 3), v === "le" && this._initArray(this.toArray(), a, v);
      }, t.prototype._initArray = function(e, a, v) {
        if (q(typeof e.length == "number"), e.length <= 0)
          return this.words = [0], this.length = 1, this;
        this.length = Math.ceil(e.length / 3), this.words = new Array(this.length);
        for (var x = 0; x < this.length; x++)
          this.words[x] = 0;
        var d, y, p = 0;
        if (v === "be")
          for (x = e.length - 1, d = 0; x >= 0; x -= 3)
            y = e[x] | e[x - 1] << 8 | e[x - 2] << 16, this.words[d] |= y << p & 67108863, this.words[d + 1] = y >>> 26 - p & 67108863, p += 24, p >= 26 && (p -= 26, d++);
        else if (v === "le")
          for (x = 0, d = 0; x < e.length; x += 3)
            y = e[x] | e[x + 1] << 8 | e[x + 2] << 16, this.words[d] |= y << p & 67108863, this.words[d + 1] = y >>> 26 - p & 67108863, p += 24, p >= 26 && (p -= 26, d++);
        return this._strip();
      };
      function l(c, e) {
        var a = c.charCodeAt(e);
        if (a >= 48 && a <= 57)
          return a - 48;
        if (a >= 65 && a <= 70)
          return a - 55;
        if (a >= 97 && a <= 102)
          return a - 87;
        q(!1, "Invalid character in " + c);
      }
      function b(c, e, a) {
        var v = l(c, a);
        return a - 1 >= e && (v |= l(c, a - 1) << 4), v;
      }
      t.prototype._parseHex = function(e, a, v) {
        this.length = Math.ceil((e.length - a) / 6), this.words = new Array(this.length);
        for (var x = 0; x < this.length; x++)
          this.words[x] = 0;
        var d = 0, y = 0, p;
        if (v === "be")
          for (x = e.length - 1; x >= a; x -= 2)
            p = b(e, a, x) << d, this.words[y] |= p & 67108863, d >= 18 ? (d -= 18, y += 1, this.words[y] |= p >>> 26) : d += 8;
        else {
          var _ = e.length - a;
          for (x = _ % 2 === 0 ? a + 1 : a; x < e.length; x += 2)
            p = b(e, a, x) << d, this.words[y] |= p & 67108863, d >= 18 ? (d -= 18, y += 1, this.words[y] |= p >>> 26) : d += 8;
        }
        this._strip();
      };
      function w(c, e, a, v) {
        for (var x = 0, d = 0, y = Math.min(c.length, a), p = e; p < y; p++) {
          var _ = c.charCodeAt(p) - 48;
          x *= v, _ >= 49 ? d = _ - 49 + 10 : _ >= 17 ? d = _ - 17 + 10 : d = _, q(_ >= 0 && d < v, "Invalid character"), x += d;
        }
        return x;
      }
      t.prototype._parseBase = function(e, a, v) {
        this.words = [0], this.length = 1;
        for (var x = 0, d = 1; d <= 67108863; d *= a)
          x++;
        x--, d = d / a | 0;
        for (var y = e.length - v, p = y % x, _ = Math.min(y, y - p) + v, o = 0, P = v; P < _; P += x)
          o = w(e, P, P + x, a), this.imuln(d), this.words[0] + o < 67108864 ? this.words[0] += o : this._iaddn(o);
        if (p !== 0) {
          var Z = 1;
          for (o = w(e, P, e.length, a), P = 0; P < p; P++)
            Z *= a;
          this.imuln(Z), this.words[0] + o < 67108864 ? this.words[0] += o : this._iaddn(o);
        }
        this._strip();
      }, t.prototype.copy = function(e) {
        e.words = new Array(this.length);
        for (var a = 0; a < this.length; a++)
          e.words[a] = this.words[a];
        e.length = this.length, e.negative = this.negative, e.red = this.red;
      };
      function u(c, e) {
        c.words = e.words, c.length = e.length, c.negative = e.negative, c.red = e.red;
      }
      if (t.prototype._move = function(e) {
        u(e, this);
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
          t.prototype[Symbol.for("nodejs.util.inspect.custom")] = g;
        } catch (c) {
          t.prototype.inspect = g;
        }
      else
        t.prototype.inspect = g;
      function g() {
        return (this.red ? "<BN-R: " : "<BN: ") + this.toString(16) + ">";
      }
      var R = [
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
      ], B = [
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
      ], k = [
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
      t.prototype.toString = function(e, a) {
        e = e || 10, a = a | 0 || 1;
        var v;
        if (e === 16 || e === "hex") {
          v = "";
          for (var x = 0, d = 0, y = 0; y < this.length; y++) {
            var p = this.words[y], _ = ((p << x | d) & 16777215).toString(16);
            d = p >>> 24 - x & 16777215, x += 2, x >= 26 && (x -= 26, y--), d !== 0 || y !== this.length - 1 ? v = R[6 - _.length] + _ + v : v = _ + v;
          }
          for (d !== 0 && (v = d.toString(16) + v); v.length % a !== 0; )
            v = "0" + v;
          return this.negative !== 0 && (v = "-" + v), v;
        }
        if (e === (e | 0) && e >= 2 && e <= 36) {
          var o = B[e], P = k[e];
          v = "";
          var Z = this.clone();
          for (Z.negative = 0; !Z.isZero(); ) {
            var ee = Z.modrn(P).toString(e);
            Z = Z.idivn(P), Z.isZero() ? v = ee + v : v = R[o - ee.length] + ee + v;
          }
          for (this.isZero() && (v = "0" + v); v.length % a !== 0; )
            v = "0" + v;
          return this.negative !== 0 && (v = "-" + v), v;
        }
        q(!1, "Base should be between 2 and 36");
      }, t.prototype.toNumber = function() {
        var e = this.words[0];
        return this.length === 2 ? e += this.words[1] * 67108864 : this.length === 3 && this.words[2] === 1 ? e += 4503599627370496 + this.words[1] * 67108864 : this.length > 2 && q(!1, "Number can only safely store up to 53 bits"), this.negative !== 0 ? -e : e;
      }, t.prototype.toJSON = function() {
        return this.toString(16, 2);
      }, E && (t.prototype.toBuffer = function(e, a) {
        return this.toArrayLike(E, e, a);
      }), t.prototype.toArray = function(e, a) {
        return this.toArrayLike(Array, e, a);
      };
      var $ = function(e, a) {
        return e.allocUnsafe ? e.allocUnsafe(a) : new e(a);
      };
      t.prototype.toArrayLike = function(e, a, v) {
        this._strip();
        var x = this.byteLength(), d = v || Math.max(1, x);
        q(x <= d, "byte array longer than desired length"), q(d > 0, "Requested array length <= 0");
        var y = $(e, d), p = a === "le" ? "LE" : "BE";
        return this["_toArrayLike" + p](y, x), y;
      }, t.prototype._toArrayLikeLE = function(e, a) {
        for (var v = 0, x = 0, d = 0, y = 0; d < this.length; d++) {
          var p = this.words[d] << y | x;
          e[v++] = p & 255, v < e.length && (e[v++] = p >> 8 & 255), v < e.length && (e[v++] = p >> 16 & 255), y === 6 ? (v < e.length && (e[v++] = p >> 24 & 255), x = 0, y = 0) : (x = p >>> 24, y += 2);
        }
        if (v < e.length)
          for (e[v++] = x; v < e.length; )
            e[v++] = 0;
      }, t.prototype._toArrayLikeBE = function(e, a) {
        for (var v = e.length - 1, x = 0, d = 0, y = 0; d < this.length; d++) {
          var p = this.words[d] << y | x;
          e[v--] = p & 255, v >= 0 && (e[v--] = p >> 8 & 255), v >= 0 && (e[v--] = p >> 16 & 255), y === 6 ? (v >= 0 && (e[v--] = p >> 24 & 255), x = 0, y = 0) : (x = p >>> 24, y += 2);
        }
        if (v >= 0)
          for (e[v--] = x; v >= 0; )
            e[v--] = 0;
      }, Math.clz32 ? t.prototype._countBits = function(e) {
        return 32 - Math.clz32(e);
      } : t.prototype._countBits = function(e) {
        var a = e, v = 0;
        return a >= 4096 && (v += 13, a >>>= 13), a >= 64 && (v += 7, a >>>= 7), a >= 8 && (v += 4, a >>>= 4), a >= 2 && (v += 2, a >>>= 2), v + a;
      }, t.prototype._zeroBits = function(e) {
        if (e === 0) return 26;
        var a = e, v = 0;
        return a & 8191 || (v += 13, a >>>= 13), a & 127 || (v += 7, a >>>= 7), a & 15 || (v += 4, a >>>= 4), a & 3 || (v += 2, a >>>= 2), a & 1 || v++, v;
      }, t.prototype.bitLength = function() {
        var e = this.words[this.length - 1], a = this._countBits(e);
        return (this.length - 1) * 26 + a;
      };
      function O(c) {
        for (var e = new Array(c.bitLength()), a = 0; a < e.length; a++) {
          var v = a / 26 | 0, x = a % 26;
          e[a] = c.words[v] >>> x & 1;
        }
        return e;
      }
      t.prototype.zeroBits = function() {
        if (this.isZero()) return 0;
        for (var e = 0, a = 0; a < this.length; a++) {
          var v = this._zeroBits(this.words[a]);
          if (e += v, v !== 26) break;
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
        for (var a = 0; a < e.length; a++)
          this.words[a] = this.words[a] | e.words[a];
        return this._strip();
      }, t.prototype.ior = function(e) {
        return q((this.negative | e.negative) === 0), this.iuor(e);
      }, t.prototype.or = function(e) {
        return this.length > e.length ? this.clone().ior(e) : e.clone().ior(this);
      }, t.prototype.uor = function(e) {
        return this.length > e.length ? this.clone().iuor(e) : e.clone().iuor(this);
      }, t.prototype.iuand = function(e) {
        var a;
        this.length > e.length ? a = e : a = this;
        for (var v = 0; v < a.length; v++)
          this.words[v] = this.words[v] & e.words[v];
        return this.length = a.length, this._strip();
      }, t.prototype.iand = function(e) {
        return q((this.negative | e.negative) === 0), this.iuand(e);
      }, t.prototype.and = function(e) {
        return this.length > e.length ? this.clone().iand(e) : e.clone().iand(this);
      }, t.prototype.uand = function(e) {
        return this.length > e.length ? this.clone().iuand(e) : e.clone().iuand(this);
      }, t.prototype.iuxor = function(e) {
        var a, v;
        this.length > e.length ? (a = this, v = e) : (a = e, v = this);
        for (var x = 0; x < v.length; x++)
          this.words[x] = a.words[x] ^ v.words[x];
        if (this !== a)
          for (; x < a.length; x++)
            this.words[x] = a.words[x];
        return this.length = a.length, this._strip();
      }, t.prototype.ixor = function(e) {
        return q((this.negative | e.negative) === 0), this.iuxor(e);
      }, t.prototype.xor = function(e) {
        return this.length > e.length ? this.clone().ixor(e) : e.clone().ixor(this);
      }, t.prototype.uxor = function(e) {
        return this.length > e.length ? this.clone().iuxor(e) : e.clone().iuxor(this);
      }, t.prototype.inotn = function(e) {
        q(typeof e == "number" && e >= 0);
        var a = Math.ceil(e / 26) | 0, v = e % 26;
        this._expand(a), v > 0 && a--;
        for (var x = 0; x < a; x++)
          this.words[x] = ~this.words[x] & 67108863;
        return v > 0 && (this.words[x] = ~this.words[x] & 67108863 >> 26 - v), this._strip();
      }, t.prototype.notn = function(e) {
        return this.clone().inotn(e);
      }, t.prototype.setn = function(e, a) {
        q(typeof e == "number" && e >= 0);
        var v = e / 26 | 0, x = e % 26;
        return this._expand(v + 1), a ? this.words[v] = this.words[v] | 1 << x : this.words[v] = this.words[v] & ~(1 << x), this._strip();
      }, t.prototype.iadd = function(e) {
        var a;
        if (this.negative !== 0 && e.negative === 0)
          return this.negative = 0, a = this.isub(e), this.negative ^= 1, this._normSign();
        if (this.negative === 0 && e.negative !== 0)
          return e.negative = 0, a = this.isub(e), e.negative = 1, a._normSign();
        var v, x;
        this.length > e.length ? (v = this, x = e) : (v = e, x = this);
        for (var d = 0, y = 0; y < x.length; y++)
          a = (v.words[y] | 0) + (x.words[y] | 0) + d, this.words[y] = a & 67108863, d = a >>> 26;
        for (; d !== 0 && y < v.length; y++)
          a = (v.words[y] | 0) + d, this.words[y] = a & 67108863, d = a >>> 26;
        if (this.length = v.length, d !== 0)
          this.words[this.length] = d, this.length++;
        else if (v !== this)
          for (; y < v.length; y++)
            this.words[y] = v.words[y];
        return this;
      }, t.prototype.add = function(e) {
        var a;
        return e.negative !== 0 && this.negative === 0 ? (e.negative = 0, a = this.sub(e), e.negative ^= 1, a) : e.negative === 0 && this.negative !== 0 ? (this.negative = 0, a = e.sub(this), this.negative = 1, a) : this.length > e.length ? this.clone().iadd(e) : e.clone().iadd(this);
      }, t.prototype.isub = function(e) {
        if (e.negative !== 0) {
          e.negative = 0;
          var a = this.iadd(e);
          return e.negative = 1, a._normSign();
        } else if (this.negative !== 0)
          return this.negative = 0, this.iadd(e), this.negative = 1, this._normSign();
        var v = this.cmp(e);
        if (v === 0)
          return this.negative = 0, this.length = 1, this.words[0] = 0, this;
        var x, d;
        v > 0 ? (x = this, d = e) : (x = e, d = this);
        for (var y = 0, p = 0; p < d.length; p++)
          a = (x.words[p] | 0) - (d.words[p] | 0) + y, y = a >> 26, this.words[p] = a & 67108863;
        for (; y !== 0 && p < x.length; p++)
          a = (x.words[p] | 0) + y, y = a >> 26, this.words[p] = a & 67108863;
        if (y === 0 && p < x.length && x !== this)
          for (; p < x.length; p++)
            this.words[p] = x.words[p];
        return this.length = Math.max(this.length, p), x !== this && (this.negative = 1), this._strip();
      }, t.prototype.sub = function(e) {
        return this.clone().isub(e);
      };
      function D(c, e, a) {
        a.negative = e.negative ^ c.negative;
        var v = c.length + e.length | 0;
        a.length = v, v = v - 1 | 0;
        var x = c.words[0] | 0, d = e.words[0] | 0, y = x * d, p = y & 67108863, _ = y / 67108864 | 0;
        a.words[0] = p;
        for (var o = 1; o < v; o++) {
          for (var P = _ >>> 26, Z = _ & 67108863, ee = Math.min(o, e.length - 1), K = Math.max(0, o - c.length + 1); K <= ee; K++) {
            var L = o - K | 0;
            x = c.words[L] | 0, d = e.words[K] | 0, y = x * d + Z, P += y / 67108864 | 0, Z = y & 67108863;
          }
          a.words[o] = Z | 0, _ = P | 0;
        }
        return _ !== 0 ? a.words[o] = _ | 0 : a.length--, a._strip();
      }
      var N = function(e, a, v) {
        var x = e.words, d = a.words, y = v.words, p = 0, _, o, P, Z = x[0] | 0, ee = Z & 8191, K = Z >>> 13, L = x[1] | 0, j = L & 8191, re = L >>> 13, ne = x[2] | 0, J = ne & 8191, G = ne >>> 13, se = x[3] | 0, ue = se & 8191, de = se >>> 13, Y = x[4] | 0, F = Y & 8191, U = Y >>> 13, V = x[5] | 0, ie = V & 8191, oe = V >>> 13, he = x[6] | 0, ve = he & 8191, le = he >>> 13, ye = x[7] | 0, be = ye & 8191, pe = ye >>> 13, He = x[8] | 0, Ie = He & 8191, me = He >>> 13, ze = x[9] | 0, Pe = ze & 8191, ge = ze >>> 13, We = d[0] | 0, Ce = We & 8191, we = We >>> 13, Ke = d[1] | 0, $e = Ke & 8191, xe = Ke >>> 13, Ge = d[2] | 0, De = Ge & 8191, _e = Ge >>> 13, Ve = d[3] | 0, Oe = Ve & 8191, Me = Ve >>> 13, Je = d[4] | 0, Le = Je & 8191, Se = Je >>> 13, Ze = d[5] | 0, Fe = Ze & 8191, qe = Ze >>> 13, Xe = d[6] | 0, Ne = Xe & 8191, Ee = Xe >>> 13, Ye = d[7] | 0, Ue = Ye & 8191, Re = Ye >>> 13, Qe = d[8] | 0, je = Qe & 8191, Ae = Qe >>> 13, er = d[9] | 0, Te = er & 8191, ke = er >>> 13;
        v.negative = e.negative ^ a.negative, v.length = 19, _ = Math.imul(ee, Ce), o = Math.imul(ee, we), o = o + Math.imul(K, Ce) | 0, P = Math.imul(K, we);
        var rr = (p + _ | 0) + ((o & 8191) << 13) | 0;
        p = (P + (o >>> 13) | 0) + (rr >>> 26) | 0, rr &= 67108863, _ = Math.imul(j, Ce), o = Math.imul(j, we), o = o + Math.imul(re, Ce) | 0, P = Math.imul(re, we), _ = _ + Math.imul(ee, $e) | 0, o = o + Math.imul(ee, xe) | 0, o = o + Math.imul(K, $e) | 0, P = P + Math.imul(K, xe) | 0;
        var tr = (p + _ | 0) + ((o & 8191) << 13) | 0;
        p = (P + (o >>> 13) | 0) + (tr >>> 26) | 0, tr &= 67108863, _ = Math.imul(J, Ce), o = Math.imul(J, we), o = o + Math.imul(G, Ce) | 0, P = Math.imul(G, we), _ = _ + Math.imul(j, $e) | 0, o = o + Math.imul(j, xe) | 0, o = o + Math.imul(re, $e) | 0, P = P + Math.imul(re, xe) | 0, _ = _ + Math.imul(ee, De) | 0, o = o + Math.imul(ee, _e) | 0, o = o + Math.imul(K, De) | 0, P = P + Math.imul(K, _e) | 0;
        var ir = (p + _ | 0) + ((o & 8191) << 13) | 0;
        p = (P + (o >>> 13) | 0) + (ir >>> 26) | 0, ir &= 67108863, _ = Math.imul(ue, Ce), o = Math.imul(ue, we), o = o + Math.imul(de, Ce) | 0, P = Math.imul(de, we), _ = _ + Math.imul(J, $e) | 0, o = o + Math.imul(J, xe) | 0, o = o + Math.imul(G, $e) | 0, P = P + Math.imul(G, xe) | 0, _ = _ + Math.imul(j, De) | 0, o = o + Math.imul(j, _e) | 0, o = o + Math.imul(re, De) | 0, P = P + Math.imul(re, _e) | 0, _ = _ + Math.imul(ee, Oe) | 0, o = o + Math.imul(ee, Me) | 0, o = o + Math.imul(K, Oe) | 0, P = P + Math.imul(K, Me) | 0;
        var nr = (p + _ | 0) + ((o & 8191) << 13) | 0;
        p = (P + (o >>> 13) | 0) + (nr >>> 26) | 0, nr &= 67108863, _ = Math.imul(F, Ce), o = Math.imul(F, we), o = o + Math.imul(U, Ce) | 0, P = Math.imul(U, we), _ = _ + Math.imul(ue, $e) | 0, o = o + Math.imul(ue, xe) | 0, o = o + Math.imul(de, $e) | 0, P = P + Math.imul(de, xe) | 0, _ = _ + Math.imul(J, De) | 0, o = o + Math.imul(J, _e) | 0, o = o + Math.imul(G, De) | 0, P = P + Math.imul(G, _e) | 0, _ = _ + Math.imul(j, Oe) | 0, o = o + Math.imul(j, Me) | 0, o = o + Math.imul(re, Oe) | 0, P = P + Math.imul(re, Me) | 0, _ = _ + Math.imul(ee, Le) | 0, o = o + Math.imul(ee, Se) | 0, o = o + Math.imul(K, Le) | 0, P = P + Math.imul(K, Se) | 0;
        var ar = (p + _ | 0) + ((o & 8191) << 13) | 0;
        p = (P + (o >>> 13) | 0) + (ar >>> 26) | 0, ar &= 67108863, _ = Math.imul(ie, Ce), o = Math.imul(ie, we), o = o + Math.imul(oe, Ce) | 0, P = Math.imul(oe, we), _ = _ + Math.imul(F, $e) | 0, o = o + Math.imul(F, xe) | 0, o = o + Math.imul(U, $e) | 0, P = P + Math.imul(U, xe) | 0, _ = _ + Math.imul(ue, De) | 0, o = o + Math.imul(ue, _e) | 0, o = o + Math.imul(de, De) | 0, P = P + Math.imul(de, _e) | 0, _ = _ + Math.imul(J, Oe) | 0, o = o + Math.imul(J, Me) | 0, o = o + Math.imul(G, Oe) | 0, P = P + Math.imul(G, Me) | 0, _ = _ + Math.imul(j, Le) | 0, o = o + Math.imul(j, Se) | 0, o = o + Math.imul(re, Le) | 0, P = P + Math.imul(re, Se) | 0, _ = _ + Math.imul(ee, Fe) | 0, o = o + Math.imul(ee, qe) | 0, o = o + Math.imul(K, Fe) | 0, P = P + Math.imul(K, qe) | 0;
        var fr = (p + _ | 0) + ((o & 8191) << 13) | 0;
        p = (P + (o >>> 13) | 0) + (fr >>> 26) | 0, fr &= 67108863, _ = Math.imul(ve, Ce), o = Math.imul(ve, we), o = o + Math.imul(le, Ce) | 0, P = Math.imul(le, we), _ = _ + Math.imul(ie, $e) | 0, o = o + Math.imul(ie, xe) | 0, o = o + Math.imul(oe, $e) | 0, P = P + Math.imul(oe, xe) | 0, _ = _ + Math.imul(F, De) | 0, o = o + Math.imul(F, _e) | 0, o = o + Math.imul(U, De) | 0, P = P + Math.imul(U, _e) | 0, _ = _ + Math.imul(ue, Oe) | 0, o = o + Math.imul(ue, Me) | 0, o = o + Math.imul(de, Oe) | 0, P = P + Math.imul(de, Me) | 0, _ = _ + Math.imul(J, Le) | 0, o = o + Math.imul(J, Se) | 0, o = o + Math.imul(G, Le) | 0, P = P + Math.imul(G, Se) | 0, _ = _ + Math.imul(j, Fe) | 0, o = o + Math.imul(j, qe) | 0, o = o + Math.imul(re, Fe) | 0, P = P + Math.imul(re, qe) | 0, _ = _ + Math.imul(ee, Ne) | 0, o = o + Math.imul(ee, Ee) | 0, o = o + Math.imul(K, Ne) | 0, P = P + Math.imul(K, Ee) | 0;
        var sr = (p + _ | 0) + ((o & 8191) << 13) | 0;
        p = (P + (o >>> 13) | 0) + (sr >>> 26) | 0, sr &= 67108863, _ = Math.imul(be, Ce), o = Math.imul(be, we), o = o + Math.imul(pe, Ce) | 0, P = Math.imul(pe, we), _ = _ + Math.imul(ve, $e) | 0, o = o + Math.imul(ve, xe) | 0, o = o + Math.imul(le, $e) | 0, P = P + Math.imul(le, xe) | 0, _ = _ + Math.imul(ie, De) | 0, o = o + Math.imul(ie, _e) | 0, o = o + Math.imul(oe, De) | 0, P = P + Math.imul(oe, _e) | 0, _ = _ + Math.imul(F, Oe) | 0, o = o + Math.imul(F, Me) | 0, o = o + Math.imul(U, Oe) | 0, P = P + Math.imul(U, Me) | 0, _ = _ + Math.imul(ue, Le) | 0, o = o + Math.imul(ue, Se) | 0, o = o + Math.imul(de, Le) | 0, P = P + Math.imul(de, Se) | 0, _ = _ + Math.imul(J, Fe) | 0, o = o + Math.imul(J, qe) | 0, o = o + Math.imul(G, Fe) | 0, P = P + Math.imul(G, qe) | 0, _ = _ + Math.imul(j, Ne) | 0, o = o + Math.imul(j, Ee) | 0, o = o + Math.imul(re, Ne) | 0, P = P + Math.imul(re, Ee) | 0, _ = _ + Math.imul(ee, Ue) | 0, o = o + Math.imul(ee, Re) | 0, o = o + Math.imul(K, Ue) | 0, P = P + Math.imul(K, Re) | 0;
        var or = (p + _ | 0) + ((o & 8191) << 13) | 0;
        p = (P + (o >>> 13) | 0) + (or >>> 26) | 0, or &= 67108863, _ = Math.imul(Ie, Ce), o = Math.imul(Ie, we), o = o + Math.imul(me, Ce) | 0, P = Math.imul(me, we), _ = _ + Math.imul(be, $e) | 0, o = o + Math.imul(be, xe) | 0, o = o + Math.imul(pe, $e) | 0, P = P + Math.imul(pe, xe) | 0, _ = _ + Math.imul(ve, De) | 0, o = o + Math.imul(ve, _e) | 0, o = o + Math.imul(le, De) | 0, P = P + Math.imul(le, _e) | 0, _ = _ + Math.imul(ie, Oe) | 0, o = o + Math.imul(ie, Me) | 0, o = o + Math.imul(oe, Oe) | 0, P = P + Math.imul(oe, Me) | 0, _ = _ + Math.imul(F, Le) | 0, o = o + Math.imul(F, Se) | 0, o = o + Math.imul(U, Le) | 0, P = P + Math.imul(U, Se) | 0, _ = _ + Math.imul(ue, Fe) | 0, o = o + Math.imul(ue, qe) | 0, o = o + Math.imul(de, Fe) | 0, P = P + Math.imul(de, qe) | 0, _ = _ + Math.imul(J, Ne) | 0, o = o + Math.imul(J, Ee) | 0, o = o + Math.imul(G, Ne) | 0, P = P + Math.imul(G, Ee) | 0, _ = _ + Math.imul(j, Ue) | 0, o = o + Math.imul(j, Re) | 0, o = o + Math.imul(re, Ue) | 0, P = P + Math.imul(re, Re) | 0, _ = _ + Math.imul(ee, je) | 0, o = o + Math.imul(ee, Ae) | 0, o = o + Math.imul(K, je) | 0, P = P + Math.imul(K, Ae) | 0;
        var ur = (p + _ | 0) + ((o & 8191) << 13) | 0;
        p = (P + (o >>> 13) | 0) + (ur >>> 26) | 0, ur &= 67108863, _ = Math.imul(Pe, Ce), o = Math.imul(Pe, we), o = o + Math.imul(ge, Ce) | 0, P = Math.imul(ge, we), _ = _ + Math.imul(Ie, $e) | 0, o = o + Math.imul(Ie, xe) | 0, o = o + Math.imul(me, $e) | 0, P = P + Math.imul(me, xe) | 0, _ = _ + Math.imul(be, De) | 0, o = o + Math.imul(be, _e) | 0, o = o + Math.imul(pe, De) | 0, P = P + Math.imul(pe, _e) | 0, _ = _ + Math.imul(ve, Oe) | 0, o = o + Math.imul(ve, Me) | 0, o = o + Math.imul(le, Oe) | 0, P = P + Math.imul(le, Me) | 0, _ = _ + Math.imul(ie, Le) | 0, o = o + Math.imul(ie, Se) | 0, o = o + Math.imul(oe, Le) | 0, P = P + Math.imul(oe, Se) | 0, _ = _ + Math.imul(F, Fe) | 0, o = o + Math.imul(F, qe) | 0, o = o + Math.imul(U, Fe) | 0, P = P + Math.imul(U, qe) | 0, _ = _ + Math.imul(ue, Ne) | 0, o = o + Math.imul(ue, Ee) | 0, o = o + Math.imul(de, Ne) | 0, P = P + Math.imul(de, Ee) | 0, _ = _ + Math.imul(J, Ue) | 0, o = o + Math.imul(J, Re) | 0, o = o + Math.imul(G, Ue) | 0, P = P + Math.imul(G, Re) | 0, _ = _ + Math.imul(j, je) | 0, o = o + Math.imul(j, Ae) | 0, o = o + Math.imul(re, je) | 0, P = P + Math.imul(re, Ae) | 0, _ = _ + Math.imul(ee, Te) | 0, o = o + Math.imul(ee, ke) | 0, o = o + Math.imul(K, Te) | 0, P = P + Math.imul(K, ke) | 0;
        var hr = (p + _ | 0) + ((o & 8191) << 13) | 0;
        p = (P + (o >>> 13) | 0) + (hr >>> 26) | 0, hr &= 67108863, _ = Math.imul(Pe, $e), o = Math.imul(Pe, xe), o = o + Math.imul(ge, $e) | 0, P = Math.imul(ge, xe), _ = _ + Math.imul(Ie, De) | 0, o = o + Math.imul(Ie, _e) | 0, o = o + Math.imul(me, De) | 0, P = P + Math.imul(me, _e) | 0, _ = _ + Math.imul(be, Oe) | 0, o = o + Math.imul(be, Me) | 0, o = o + Math.imul(pe, Oe) | 0, P = P + Math.imul(pe, Me) | 0, _ = _ + Math.imul(ve, Le) | 0, o = o + Math.imul(ve, Se) | 0, o = o + Math.imul(le, Le) | 0, P = P + Math.imul(le, Se) | 0, _ = _ + Math.imul(ie, Fe) | 0, o = o + Math.imul(ie, qe) | 0, o = o + Math.imul(oe, Fe) | 0, P = P + Math.imul(oe, qe) | 0, _ = _ + Math.imul(F, Ne) | 0, o = o + Math.imul(F, Ee) | 0, o = o + Math.imul(U, Ne) | 0, P = P + Math.imul(U, Ee) | 0, _ = _ + Math.imul(ue, Ue) | 0, o = o + Math.imul(ue, Re) | 0, o = o + Math.imul(de, Ue) | 0, P = P + Math.imul(de, Re) | 0, _ = _ + Math.imul(J, je) | 0, o = o + Math.imul(J, Ae) | 0, o = o + Math.imul(G, je) | 0, P = P + Math.imul(G, Ae) | 0, _ = _ + Math.imul(j, Te) | 0, o = o + Math.imul(j, ke) | 0, o = o + Math.imul(re, Te) | 0, P = P + Math.imul(re, ke) | 0;
        var cr = (p + _ | 0) + ((o & 8191) << 13) | 0;
        p = (P + (o >>> 13) | 0) + (cr >>> 26) | 0, cr &= 67108863, _ = Math.imul(Pe, De), o = Math.imul(Pe, _e), o = o + Math.imul(ge, De) | 0, P = Math.imul(ge, _e), _ = _ + Math.imul(Ie, Oe) | 0, o = o + Math.imul(Ie, Me) | 0, o = o + Math.imul(me, Oe) | 0, P = P + Math.imul(me, Me) | 0, _ = _ + Math.imul(be, Le) | 0, o = o + Math.imul(be, Se) | 0, o = o + Math.imul(pe, Le) | 0, P = P + Math.imul(pe, Se) | 0, _ = _ + Math.imul(ve, Fe) | 0, o = o + Math.imul(ve, qe) | 0, o = o + Math.imul(le, Fe) | 0, P = P + Math.imul(le, qe) | 0, _ = _ + Math.imul(ie, Ne) | 0, o = o + Math.imul(ie, Ee) | 0, o = o + Math.imul(oe, Ne) | 0, P = P + Math.imul(oe, Ee) | 0, _ = _ + Math.imul(F, Ue) | 0, o = o + Math.imul(F, Re) | 0, o = o + Math.imul(U, Ue) | 0, P = P + Math.imul(U, Re) | 0, _ = _ + Math.imul(ue, je) | 0, o = o + Math.imul(ue, Ae) | 0, o = o + Math.imul(de, je) | 0, P = P + Math.imul(de, Ae) | 0, _ = _ + Math.imul(J, Te) | 0, o = o + Math.imul(J, ke) | 0, o = o + Math.imul(G, Te) | 0, P = P + Math.imul(G, ke) | 0;
        var dr = (p + _ | 0) + ((o & 8191) << 13) | 0;
        p = (P + (o >>> 13) | 0) + (dr >>> 26) | 0, dr &= 67108863, _ = Math.imul(Pe, Oe), o = Math.imul(Pe, Me), o = o + Math.imul(ge, Oe) | 0, P = Math.imul(ge, Me), _ = _ + Math.imul(Ie, Le) | 0, o = o + Math.imul(Ie, Se) | 0, o = o + Math.imul(me, Le) | 0, P = P + Math.imul(me, Se) | 0, _ = _ + Math.imul(be, Fe) | 0, o = o + Math.imul(be, qe) | 0, o = o + Math.imul(pe, Fe) | 0, P = P + Math.imul(pe, qe) | 0, _ = _ + Math.imul(ve, Ne) | 0, o = o + Math.imul(ve, Ee) | 0, o = o + Math.imul(le, Ne) | 0, P = P + Math.imul(le, Ee) | 0, _ = _ + Math.imul(ie, Ue) | 0, o = o + Math.imul(ie, Re) | 0, o = o + Math.imul(oe, Ue) | 0, P = P + Math.imul(oe, Re) | 0, _ = _ + Math.imul(F, je) | 0, o = o + Math.imul(F, Ae) | 0, o = o + Math.imul(U, je) | 0, P = P + Math.imul(U, Ae) | 0, _ = _ + Math.imul(ue, Te) | 0, o = o + Math.imul(ue, ke) | 0, o = o + Math.imul(de, Te) | 0, P = P + Math.imul(de, ke) | 0;
        var lr = (p + _ | 0) + ((o & 8191) << 13) | 0;
        p = (P + (o >>> 13) | 0) + (lr >>> 26) | 0, lr &= 67108863, _ = Math.imul(Pe, Le), o = Math.imul(Pe, Se), o = o + Math.imul(ge, Le) | 0, P = Math.imul(ge, Se), _ = _ + Math.imul(Ie, Fe) | 0, o = o + Math.imul(Ie, qe) | 0, o = o + Math.imul(me, Fe) | 0, P = P + Math.imul(me, qe) | 0, _ = _ + Math.imul(be, Ne) | 0, o = o + Math.imul(be, Ee) | 0, o = o + Math.imul(pe, Ne) | 0, P = P + Math.imul(pe, Ee) | 0, _ = _ + Math.imul(ve, Ue) | 0, o = o + Math.imul(ve, Re) | 0, o = o + Math.imul(le, Ue) | 0, P = P + Math.imul(le, Re) | 0, _ = _ + Math.imul(ie, je) | 0, o = o + Math.imul(ie, Ae) | 0, o = o + Math.imul(oe, je) | 0, P = P + Math.imul(oe, Ae) | 0, _ = _ + Math.imul(F, Te) | 0, o = o + Math.imul(F, ke) | 0, o = o + Math.imul(U, Te) | 0, P = P + Math.imul(U, ke) | 0;
        var pr = (p + _ | 0) + ((o & 8191) << 13) | 0;
        p = (P + (o >>> 13) | 0) + (pr >>> 26) | 0, pr &= 67108863, _ = Math.imul(Pe, Fe), o = Math.imul(Pe, qe), o = o + Math.imul(ge, Fe) | 0, P = Math.imul(ge, qe), _ = _ + Math.imul(Ie, Ne) | 0, o = o + Math.imul(Ie, Ee) | 0, o = o + Math.imul(me, Ne) | 0, P = P + Math.imul(me, Ee) | 0, _ = _ + Math.imul(be, Ue) | 0, o = o + Math.imul(be, Re) | 0, o = o + Math.imul(pe, Ue) | 0, P = P + Math.imul(pe, Re) | 0, _ = _ + Math.imul(ve, je) | 0, o = o + Math.imul(ve, Ae) | 0, o = o + Math.imul(le, je) | 0, P = P + Math.imul(le, Ae) | 0, _ = _ + Math.imul(ie, Te) | 0, o = o + Math.imul(ie, ke) | 0, o = o + Math.imul(oe, Te) | 0, P = P + Math.imul(oe, ke) | 0;
        var vr = (p + _ | 0) + ((o & 8191) << 13) | 0;
        p = (P + (o >>> 13) | 0) + (vr >>> 26) | 0, vr &= 67108863, _ = Math.imul(Pe, Ne), o = Math.imul(Pe, Ee), o = o + Math.imul(ge, Ne) | 0, P = Math.imul(ge, Ee), _ = _ + Math.imul(Ie, Ue) | 0, o = o + Math.imul(Ie, Re) | 0, o = o + Math.imul(me, Ue) | 0, P = P + Math.imul(me, Re) | 0, _ = _ + Math.imul(be, je) | 0, o = o + Math.imul(be, Ae) | 0, o = o + Math.imul(pe, je) | 0, P = P + Math.imul(pe, Ae) | 0, _ = _ + Math.imul(ve, Te) | 0, o = o + Math.imul(ve, ke) | 0, o = o + Math.imul(le, Te) | 0, P = P + Math.imul(le, ke) | 0;
        var br = (p + _ | 0) + ((o & 8191) << 13) | 0;
        p = (P + (o >>> 13) | 0) + (br >>> 26) | 0, br &= 67108863, _ = Math.imul(Pe, Ue), o = Math.imul(Pe, Re), o = o + Math.imul(ge, Ue) | 0, P = Math.imul(ge, Re), _ = _ + Math.imul(Ie, je) | 0, o = o + Math.imul(Ie, Ae) | 0, o = o + Math.imul(me, je) | 0, P = P + Math.imul(me, Ae) | 0, _ = _ + Math.imul(be, Te) | 0, o = o + Math.imul(be, ke) | 0, o = o + Math.imul(pe, Te) | 0, P = P + Math.imul(pe, ke) | 0;
        var yr = (p + _ | 0) + ((o & 8191) << 13) | 0;
        p = (P + (o >>> 13) | 0) + (yr >>> 26) | 0, yr &= 67108863, _ = Math.imul(Pe, je), o = Math.imul(Pe, Ae), o = o + Math.imul(ge, je) | 0, P = Math.imul(ge, Ae), _ = _ + Math.imul(Ie, Te) | 0, o = o + Math.imul(Ie, ke) | 0, o = o + Math.imul(me, Te) | 0, P = P + Math.imul(me, ke) | 0;
        var wr = (p + _ | 0) + ((o & 8191) << 13) | 0;
        p = (P + (o >>> 13) | 0) + (wr >>> 26) | 0, wr &= 67108863, _ = Math.imul(Pe, Te), o = Math.imul(Pe, ke), o = o + Math.imul(ge, Te) | 0, P = Math.imul(ge, ke);
        var xr = (p + _ | 0) + ((o & 8191) << 13) | 0;
        return p = (P + (o >>> 13) | 0) + (xr >>> 26) | 0, xr &= 67108863, y[0] = rr, y[1] = tr, y[2] = ir, y[3] = nr, y[4] = ar, y[5] = fr, y[6] = sr, y[7] = or, y[8] = ur, y[9] = hr, y[10] = cr, y[11] = dr, y[12] = lr, y[13] = pr, y[14] = vr, y[15] = br, y[16] = yr, y[17] = wr, y[18] = xr, p !== 0 && (y[19] = p, v.length++), v;
      };
      Math.imul || (N = D);
      function W(c, e, a) {
        a.negative = e.negative ^ c.negative, a.length = c.length + e.length;
        for (var v = 0, x = 0, d = 0; d < a.length - 1; d++) {
          var y = x;
          x = 0;
          for (var p = v & 67108863, _ = Math.min(d, e.length - 1), o = Math.max(0, d - c.length + 1); o <= _; o++) {
            var P = d - o, Z = c.words[P] | 0, ee = e.words[o] | 0, K = Z * ee, L = K & 67108863;
            y = y + (K / 67108864 | 0) | 0, L = L + p | 0, p = L & 67108863, y = y + (L >>> 26) | 0, x += y >>> 26, y &= 67108863;
          }
          a.words[d] = p, v = y, y = x;
        }
        return v !== 0 ? a.words[d] = v : a.length--, a._strip();
      }
      function z(c, e, a) {
        return W(c, e, a);
      }
      t.prototype.mulTo = function(e, a) {
        var v, x = this.length + e.length;
        return this.length === 10 && e.length === 10 ? v = N(this, e, a) : x < 63 ? v = D(this, e, a) : x < 1024 ? v = W(this, e, a) : v = z(this, e, a), v;
      }, t.prototype.mul = function(e) {
        var a = new t(null);
        return a.words = new Array(this.length + e.length), this.mulTo(e, a);
      }, t.prototype.mulf = function(e) {
        var a = new t(null);
        return a.words = new Array(this.length + e.length), z(this, e, a);
      }, t.prototype.imul = function(e) {
        return this.clone().mulTo(e, this);
      }, t.prototype.imuln = function(e) {
        var a = e < 0;
        a && (e = -e), q(typeof e == "number"), q(e < 67108864);
        for (var v = 0, x = 0; x < this.length; x++) {
          var d = (this.words[x] | 0) * e, y = (d & 67108863) + (v & 67108863);
          v >>= 26, v += d / 67108864 | 0, v += y >>> 26, this.words[x] = y & 67108863;
        }
        return v !== 0 && (this.words[x] = v, this.length++), a ? this.ineg() : this;
      }, t.prototype.muln = function(e) {
        return this.clone().imuln(e);
      }, t.prototype.sqr = function() {
        return this.mul(this);
      }, t.prototype.isqr = function() {
        return this.imul(this.clone());
      }, t.prototype.pow = function(e) {
        var a = O(e);
        if (a.length === 0) return new t(1);
        for (var v = this, x = 0; x < a.length && a[x] === 0; x++, v = v.sqr())
          ;
        if (++x < a.length)
          for (var d = v.sqr(); x < a.length; x++, d = d.sqr())
            a[x] !== 0 && (v = v.mul(d));
        return v;
      }, t.prototype.iushln = function(e) {
        q(typeof e == "number" && e >= 0);
        var a = e % 26, v = (e - a) / 26, x = 67108863 >>> 26 - a << 26 - a, d;
        if (a !== 0) {
          var y = 0;
          for (d = 0; d < this.length; d++) {
            var p = this.words[d] & x, _ = (this.words[d] | 0) - p << a;
            this.words[d] = _ | y, y = p >>> 26 - a;
          }
          y && (this.words[d] = y, this.length++);
        }
        if (v !== 0) {
          for (d = this.length - 1; d >= 0; d--)
            this.words[d + v] = this.words[d];
          for (d = 0; d < v; d++)
            this.words[d] = 0;
          this.length += v;
        }
        return this._strip();
      }, t.prototype.ishln = function(e) {
        return q(this.negative === 0), this.iushln(e);
      }, t.prototype.iushrn = function(e, a, v) {
        q(typeof e == "number" && e >= 0);
        var x;
        a ? x = (a - a % 26) / 26 : x = 0;
        var d = e % 26, y = Math.min((e - d) / 26, this.length), p = 67108863 ^ 67108863 >>> d << d, _ = v;
        if (x -= y, x = Math.max(0, x), _) {
          for (var o = 0; o < y; o++)
            _.words[o] = this.words[o];
          _.length = y;
        }
        if (y !== 0) if (this.length > y)
          for (this.length -= y, o = 0; o < this.length; o++)
            this.words[o] = this.words[o + y];
        else
          this.words[0] = 0, this.length = 1;
        var P = 0;
        for (o = this.length - 1; o >= 0 && (P !== 0 || o >= x); o--) {
          var Z = this.words[o] | 0;
          this.words[o] = P << 26 - d | Z >>> d, P = Z & p;
        }
        return _ && P !== 0 && (_.words[_.length++] = P), this.length === 0 && (this.words[0] = 0, this.length = 1), this._strip();
      }, t.prototype.ishrn = function(e, a, v) {
        return q(this.negative === 0), this.iushrn(e, a, v);
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
        var a = e % 26, v = (e - a) / 26, x = 1 << a;
        if (this.length <= v) return !1;
        var d = this.words[v];
        return !!(d & x);
      }, t.prototype.imaskn = function(e) {
        q(typeof e == "number" && e >= 0);
        var a = e % 26, v = (e - a) / 26;
        if (q(this.negative === 0, "imaskn works only with positive numbers"), this.length <= v)
          return this;
        if (a !== 0 && v++, this.length = Math.min(v, this.length), a !== 0) {
          var x = 67108863 ^ 67108863 >>> a << a;
          this.words[this.length - 1] &= x;
        }
        return this._strip();
      }, t.prototype.maskn = function(e) {
        return this.clone().imaskn(e);
      }, t.prototype.iaddn = function(e) {
        return q(typeof e == "number"), q(e < 67108864), e < 0 ? this.isubn(-e) : this.negative !== 0 ? this.length === 1 && (this.words[0] | 0) <= e ? (this.words[0] = e - (this.words[0] | 0), this.negative = 0, this) : (this.negative = 0, this.isubn(e), this.negative = 1, this) : this._iaddn(e);
      }, t.prototype._iaddn = function(e) {
        this.words[0] += e;
        for (var a = 0; a < this.length && this.words[a] >= 67108864; a++)
          this.words[a] -= 67108864, a === this.length - 1 ? this.words[a + 1] = 1 : this.words[a + 1]++;
        return this.length = Math.max(this.length, a + 1), this;
      }, t.prototype.isubn = function(e) {
        if (q(typeof e == "number"), q(e < 67108864), e < 0) return this.iaddn(-e);
        if (this.negative !== 0)
          return this.negative = 0, this.iaddn(e), this.negative = 1, this;
        if (this.words[0] -= e, this.length === 1 && this.words[0] < 0)
          this.words[0] = -this.words[0], this.negative = 1;
        else
          for (var a = 0; a < this.length && this.words[a] < 0; a++)
            this.words[a] += 67108864, this.words[a + 1] -= 1;
        return this._strip();
      }, t.prototype.addn = function(e) {
        return this.clone().iaddn(e);
      }, t.prototype.subn = function(e) {
        return this.clone().isubn(e);
      }, t.prototype.iabs = function() {
        return this.negative = 0, this;
      }, t.prototype.abs = function() {
        return this.clone().iabs();
      }, t.prototype._ishlnsubmul = function(e, a, v) {
        var x = e.length + v, d;
        this._expand(x);
        var y, p = 0;
        for (d = 0; d < e.length; d++) {
          y = (this.words[d + v] | 0) + p;
          var _ = (e.words[d] | 0) * a;
          y -= _ & 67108863, p = (y >> 26) - (_ / 67108864 | 0), this.words[d + v] = y & 67108863;
        }
        for (; d < this.length - v; d++)
          y = (this.words[d + v] | 0) + p, p = y >> 26, this.words[d + v] = y & 67108863;
        if (p === 0) return this._strip();
        for (q(p === -1), p = 0, d = 0; d < this.length; d++)
          y = -(this.words[d] | 0) + p, p = y >> 26, this.words[d] = y & 67108863;
        return this.negative = 1, this._strip();
      }, t.prototype._wordDiv = function(e, a) {
        var v = this.length - e.length, x = this.clone(), d = e, y = d.words[d.length - 1] | 0, p = this._countBits(y);
        v = 26 - p, v !== 0 && (d = d.ushln(v), x.iushln(v), y = d.words[d.length - 1] | 0);
        var _ = x.length - d.length, o;
        if (a !== "mod") {
          o = new t(null), o.length = _ + 1, o.words = new Array(o.length);
          for (var P = 0; P < o.length; P++)
            o.words[P] = 0;
        }
        var Z = x.clone()._ishlnsubmul(d, 1, _);
        Z.negative === 0 && (x = Z, o && (o.words[_] = 1));
        for (var ee = _ - 1; ee >= 0; ee--) {
          var K = (x.words[d.length + ee] | 0) * 67108864 + (x.words[d.length + ee - 1] | 0);
          for (K = Math.min(K / y | 0, 67108863), x._ishlnsubmul(d, K, ee); x.negative !== 0; )
            K--, x.negative = 0, x._ishlnsubmul(d, 1, ee), x.isZero() || (x.negative ^= 1);
          o && (o.words[ee] = K);
        }
        return o && o._strip(), x._strip(), a !== "div" && v !== 0 && x.iushrn(v), {
          div: o || null,
          mod: x
        };
      }, t.prototype.divmod = function(e, a, v) {
        if (q(!e.isZero()), this.isZero())
          return {
            div: new t(0),
            mod: new t(0)
          };
        var x, d, y;
        return this.negative !== 0 && e.negative === 0 ? (y = this.neg().divmod(e, a), a !== "mod" && (x = y.div.neg()), a !== "div" && (d = y.mod.neg(), v && d.negative !== 0 && d.iadd(e)), {
          div: x,
          mod: d
        }) : this.negative === 0 && e.negative !== 0 ? (y = this.divmod(e.neg(), a), a !== "mod" && (x = y.div.neg()), {
          div: x,
          mod: y.mod
        }) : this.negative & e.negative ? (y = this.neg().divmod(e.neg(), a), a !== "div" && (d = y.mod.neg(), v && d.negative !== 0 && d.isub(e)), {
          div: y.div,
          mod: d
        }) : e.length > this.length || this.cmp(e) < 0 ? {
          div: new t(0),
          mod: this
        } : e.length === 1 ? a === "div" ? {
          div: this.divn(e.words[0]),
          mod: null
        } : a === "mod" ? {
          div: null,
          mod: new t(this.modrn(e.words[0]))
        } : {
          div: this.divn(e.words[0]),
          mod: new t(this.modrn(e.words[0]))
        } : this._wordDiv(e, a);
      }, t.prototype.div = function(e) {
        return this.divmod(e, "div", !1).div;
      }, t.prototype.mod = function(e) {
        return this.divmod(e, "mod", !1).mod;
      }, t.prototype.umod = function(e) {
        return this.divmod(e, "mod", !0).mod;
      }, t.prototype.divRound = function(e) {
        var a = this.divmod(e);
        if (a.mod.isZero()) return a.div;
        var v = a.div.negative !== 0 ? a.mod.isub(e) : a.mod, x = e.ushrn(1), d = e.andln(1), y = v.cmp(x);
        return y < 0 || d === 1 && y === 0 ? a.div : a.div.negative !== 0 ? a.div.isubn(1) : a.div.iaddn(1);
      }, t.prototype.modrn = function(e) {
        var a = e < 0;
        a && (e = -e), q(e <= 67108863);
        for (var v = (1 << 26) % e, x = 0, d = this.length - 1; d >= 0; d--)
          x = (v * x + (this.words[d] | 0)) % e;
        return a ? -x : x;
      }, t.prototype.modn = function(e) {
        return this.modrn(e);
      }, t.prototype.idivn = function(e) {
        var a = e < 0;
        a && (e = -e), q(e <= 67108863);
        for (var v = 0, x = this.length - 1; x >= 0; x--) {
          var d = (this.words[x] | 0) + v * 67108864;
          this.words[x] = d / e | 0, v = d % e;
        }
        return this._strip(), a ? this.ineg() : this;
      }, t.prototype.divn = function(e) {
        return this.clone().idivn(e);
      }, t.prototype.egcd = function(e) {
        q(e.negative === 0), q(!e.isZero());
        var a = this, v = e.clone();
        a.negative !== 0 ? a = a.umod(e) : a = a.clone();
        for (var x = new t(1), d = new t(0), y = new t(0), p = new t(1), _ = 0; a.isEven() && v.isEven(); )
          a.iushrn(1), v.iushrn(1), ++_;
        for (var o = v.clone(), P = a.clone(); !a.isZero(); ) {
          for (var Z = 0, ee = 1; !(a.words[0] & ee) && Z < 26; ++Z, ee <<= 1) ;
          if (Z > 0)
            for (a.iushrn(Z); Z-- > 0; )
              (x.isOdd() || d.isOdd()) && (x.iadd(o), d.isub(P)), x.iushrn(1), d.iushrn(1);
          for (var K = 0, L = 1; !(v.words[0] & L) && K < 26; ++K, L <<= 1) ;
          if (K > 0)
            for (v.iushrn(K); K-- > 0; )
              (y.isOdd() || p.isOdd()) && (y.iadd(o), p.isub(P)), y.iushrn(1), p.iushrn(1);
          a.cmp(v) >= 0 ? (a.isub(v), x.isub(y), d.isub(p)) : (v.isub(a), y.isub(x), p.isub(d));
        }
        return {
          a: y,
          b: p,
          gcd: v.iushln(_)
        };
      }, t.prototype._invmp = function(e) {
        q(e.negative === 0), q(!e.isZero());
        var a = this, v = e.clone();
        a.negative !== 0 ? a = a.umod(e) : a = a.clone();
        for (var x = new t(1), d = new t(0), y = v.clone(); a.cmpn(1) > 0 && v.cmpn(1) > 0; ) {
          for (var p = 0, _ = 1; !(a.words[0] & _) && p < 26; ++p, _ <<= 1) ;
          if (p > 0)
            for (a.iushrn(p); p-- > 0; )
              x.isOdd() && x.iadd(y), x.iushrn(1);
          for (var o = 0, P = 1; !(v.words[0] & P) && o < 26; ++o, P <<= 1) ;
          if (o > 0)
            for (v.iushrn(o); o-- > 0; )
              d.isOdd() && d.iadd(y), d.iushrn(1);
          a.cmp(v) >= 0 ? (a.isub(v), x.isub(d)) : (v.isub(a), d.isub(x));
        }
        var Z;
        return a.cmpn(1) === 0 ? Z = x : Z = d, Z.cmpn(0) < 0 && Z.iadd(e), Z;
      }, t.prototype.gcd = function(e) {
        if (this.isZero()) return e.abs();
        if (e.isZero()) return this.abs();
        var a = this.clone(), v = e.clone();
        a.negative = 0, v.negative = 0;
        for (var x = 0; a.isEven() && v.isEven(); x++)
          a.iushrn(1), v.iushrn(1);
        do {
          for (; a.isEven(); )
            a.iushrn(1);
          for (; v.isEven(); )
            v.iushrn(1);
          var d = a.cmp(v);
          if (d < 0) {
            var y = a;
            a = v, v = y;
          } else if (d === 0 || v.cmpn(1) === 0)
            break;
          a.isub(v);
        } while (!0);
        return v.iushln(x);
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
        var a = e % 26, v = (e - a) / 26, x = 1 << a;
        if (this.length <= v)
          return this._expand(v + 1), this.words[v] |= x, this;
        for (var d = x, y = v; d !== 0 && y < this.length; y++) {
          var p = this.words[y] | 0;
          p += d, d = p >>> 26, p &= 67108863, this.words[y] = p;
        }
        return d !== 0 && (this.words[y] = d, this.length++), this;
      }, t.prototype.isZero = function() {
        return this.length === 1 && this.words[0] === 0;
      }, t.prototype.cmpn = function(e) {
        var a = e < 0;
        if (this.negative !== 0 && !a) return -1;
        if (this.negative === 0 && a) return 1;
        this._strip();
        var v;
        if (this.length > 1)
          v = 1;
        else {
          a && (e = -e), q(e <= 67108863, "Number is too big");
          var x = this.words[0] | 0;
          v = x === e ? 0 : x < e ? -1 : 1;
        }
        return this.negative !== 0 ? -v | 0 : v;
      }, t.prototype.cmp = function(e) {
        if (this.negative !== 0 && e.negative === 0) return -1;
        if (this.negative === 0 && e.negative !== 0) return 1;
        var a = this.ucmp(e);
        return this.negative !== 0 ? -a | 0 : a;
      }, t.prototype.ucmp = function(e) {
        if (this.length > e.length) return 1;
        if (this.length < e.length) return -1;
        for (var a = 0, v = this.length - 1; v >= 0; v--) {
          var x = this.words[v] | 0, d = e.words[v] | 0;
          if (x !== d) {
            x < d ? a = -1 : x > d && (a = 1);
            break;
          }
        }
        return a;
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
        return new H(e);
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
      var X = {
        k256: null,
        p224: null,
        p192: null,
        p25519: null
      };
      function Q(c, e) {
        this.name = c, this.p = new t(e, 16), this.n = this.p.bitLength(), this.k = new t(1).iushln(this.n).isub(this.p), this.tmp = this._tmp();
      }
      Q.prototype._tmp = function() {
        var e = new t(null);
        return e.words = new Array(Math.ceil(this.n / 13)), e;
      }, Q.prototype.ireduce = function(e) {
        var a = e, v;
        do
          this.split(a, this.tmp), a = this.imulK(a), a = a.iadd(this.tmp), v = a.bitLength();
        while (v > this.n);
        var x = v < this.n ? -1 : a.ucmp(this.p);
        return x === 0 ? (a.words[0] = 0, a.length = 1) : x > 0 ? a.isub(this.p) : a.strip !== void 0 ? a.strip() : a._strip(), a;
      }, Q.prototype.split = function(e, a) {
        e.iushrn(this.n, 0, a);
      }, Q.prototype.imulK = function(e) {
        return e.imul(this.k);
      };
      function ae() {
        Q.call(
          this,
          "k256",
          "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f"
        );
      }
      C(ae, Q), ae.prototype.split = function(e, a) {
        for (var v = 4194303, x = Math.min(e.length, 9), d = 0; d < x; d++)
          a.words[d] = e.words[d];
        if (a.length = x, e.length <= 9) {
          e.words[0] = 0, e.length = 1;
          return;
        }
        var y = e.words[9];
        for (a.words[a.length++] = y & v, d = 10; d < e.length; d++) {
          var p = e.words[d] | 0;
          e.words[d - 10] = (p & v) << 4 | y >>> 22, y = p;
        }
        y >>>= 22, e.words[d - 10] = y, y === 0 && e.length > 10 ? e.length -= 10 : e.length -= 9;
      }, ae.prototype.imulK = function(e) {
        e.words[e.length] = 0, e.words[e.length + 1] = 0, e.length += 2;
        for (var a = 0, v = 0; v < e.length; v++) {
          var x = e.words[v] | 0;
          a += x * 977, e.words[v] = a & 67108863, a = x * 64 + (a / 67108864 | 0);
        }
        return e.words[e.length - 1] === 0 && (e.length--, e.words[e.length - 1] === 0 && e.length--), e;
      };
      function fe() {
        Q.call(
          this,
          "p224",
          "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001"
        );
      }
      C(fe, Q);
      function te() {
        Q.call(
          this,
          "p192",
          "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff"
        );
      }
      C(te, Q);
      function ce() {
        Q.call(
          this,
          "25519",
          "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed"
        );
      }
      C(ce, Q), ce.prototype.imulK = function(e) {
        for (var a = 0, v = 0; v < e.length; v++) {
          var x = (e.words[v] | 0) * 19 + a, d = x & 67108863;
          x >>>= 26, e.words[v] = d, a = x;
        }
        return a !== 0 && (e.words[e.length++] = a), e;
      }, t._prime = function(e) {
        if (X[e]) return X[e];
        var a;
        if (e === "k256")
          a = new ae();
        else if (e === "p224")
          a = new fe();
        else if (e === "p192")
          a = new te();
        else if (e === "p25519")
          a = new ce();
        else
          throw new Error("Unknown prime " + e);
        return X[e] = a, a;
      };
      function H(c) {
        if (typeof c == "string") {
          var e = t._prime(c);
          this.m = e.p, this.prime = e;
        } else
          q(c.gtn(1), "modulus must be greater than 1"), this.m = c, this.prime = null;
      }
      H.prototype._verify1 = function(e) {
        q(e.negative === 0, "red works only with positives"), q(e.red, "red works only with red numbers");
      }, H.prototype._verify2 = function(e, a) {
        q((e.negative | a.negative) === 0, "red works only with positives"), q(
          e.red && e.red === a.red,
          "red works only with red numbers"
        );
      }, H.prototype.imod = function(e) {
        return this.prime ? this.prime.ireduce(e)._forceRed(this) : (u(e, e.umod(this.m)._forceRed(this)), e);
      }, H.prototype.neg = function(e) {
        return e.isZero() ? e.clone() : this.m.sub(e)._forceRed(this);
      }, H.prototype.add = function(e, a) {
        this._verify2(e, a);
        var v = e.add(a);
        return v.cmp(this.m) >= 0 && v.isub(this.m), v._forceRed(this);
      }, H.prototype.iadd = function(e, a) {
        this._verify2(e, a);
        var v = e.iadd(a);
        return v.cmp(this.m) >= 0 && v.isub(this.m), v;
      }, H.prototype.sub = function(e, a) {
        this._verify2(e, a);
        var v = e.sub(a);
        return v.cmpn(0) < 0 && v.iadd(this.m), v._forceRed(this);
      }, H.prototype.isub = function(e, a) {
        this._verify2(e, a);
        var v = e.isub(a);
        return v.cmpn(0) < 0 && v.iadd(this.m), v;
      }, H.prototype.shl = function(e, a) {
        return this._verify1(e), this.imod(e.ushln(a));
      }, H.prototype.imul = function(e, a) {
        return this._verify2(e, a), this.imod(e.imul(a));
      }, H.prototype.mul = function(e, a) {
        return this._verify2(e, a), this.imod(e.mul(a));
      }, H.prototype.isqr = function(e) {
        return this.imul(e, e.clone());
      }, H.prototype.sqr = function(e) {
        return this.mul(e, e);
      }, H.prototype.sqrt = function(e) {
        if (e.isZero()) return e.clone();
        var a = this.m.andln(3);
        if (q(a % 2 === 1), a === 3) {
          var v = this.m.add(new t(1)).iushrn(2);
          return this.pow(e, v);
        }
        for (var x = this.m.subn(1), d = 0; !x.isZero() && x.andln(1) === 0; )
          d++, x.iushrn(1);
        q(!x.isZero());
        var y = new t(1).toRed(this), p = y.redNeg(), _ = this.m.subn(1).iushrn(1), o = this.m.bitLength();
        for (o = new t(2 * o * o).toRed(this); this.pow(o, _).cmp(p) !== 0; )
          o.redIAdd(p);
        for (var P = this.pow(o, x), Z = this.pow(e, x.addn(1).iushrn(1)), ee = this.pow(e, x), K = d; ee.cmp(y) !== 0; ) {
          for (var L = ee, j = 0; L.cmp(y) !== 0; j++)
            L = L.redSqr();
          q(j < K);
          var re = this.pow(P, new t(1).iushln(K - j - 1));
          Z = Z.redMul(re), P = re.redSqr(), ee = ee.redMul(P), K = j;
        }
        return Z;
      }, H.prototype.invm = function(e) {
        var a = e._invmp(this.m);
        return a.negative !== 0 ? (a.negative = 0, this.imod(a).redNeg()) : this.imod(a);
      }, H.prototype.pow = function(e, a) {
        if (a.isZero()) return new t(1).toRed(this);
        if (a.cmpn(1) === 0) return e.clone();
        var v = 4, x = new Array(1 << v);
        x[0] = new t(1).toRed(this), x[1] = e;
        for (var d = 2; d < x.length; d++)
          x[d] = this.mul(x[d - 1], e);
        var y = x[0], p = 0, _ = 0, o = a.bitLength() % 26;
        for (o === 0 && (o = 26), d = a.length - 1; d >= 0; d--) {
          for (var P = a.words[d], Z = o - 1; Z >= 0; Z--) {
            var ee = P >> Z & 1;
            if (y !== x[0] && (y = this.sqr(y)), ee === 0 && p === 0) {
              _ = 0;
              continue;
            }
            p <<= 1, p |= ee, _++, !(_ !== v && (d !== 0 || Z !== 0)) && (y = this.mul(y, x[p]), _ = 0, p = 0);
          }
          o = 26;
        }
        return y;
      }, H.prototype.convertTo = function(e) {
        var a = e.umod(this.m);
        return a === e ? a.clone() : a;
      }, H.prototype.convertFrom = function(e) {
        var a = e.clone();
        return a.red = null, a;
      }, t.mont = function(e) {
        return new A(e);
      };
      function A(c) {
        H.call(this, c), this.shift = this.m.bitLength(), this.shift % 26 !== 0 && (this.shift += 26 - this.shift % 26), this.r = new t(1).iushln(this.shift), this.r2 = this.imod(this.r.sqr()), this.rinv = this.r._invmp(this.m), this.minv = this.rinv.mul(this.r).isubn(1).div(this.m), this.minv = this.minv.umod(this.r), this.minv = this.r.sub(this.minv);
      }
      C(A, H), A.prototype.convertTo = function(e) {
        return this.imod(e.ushln(this.shift));
      }, A.prototype.convertFrom = function(e) {
        var a = this.imod(e.mul(this.rinv));
        return a.red = null, a;
      }, A.prototype.imul = function(e, a) {
        if (e.isZero() || a.isZero())
          return e.words[0] = 0, e.length = 1, e;
        var v = e.imul(a), x = v.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m), d = v.isub(x).iushrn(this.shift), y = d;
        return d.cmp(this.m) >= 0 ? y = d.isub(this.m) : d.cmpn(0) < 0 && (y = d.iadd(this.m)), y._forceRed(this);
      }, A.prototype.mul = function(e, a) {
        if (e.isZero() || a.isZero()) return new t(0)._forceRed(this);
        var v = e.mul(a), x = v.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m), d = v.isub(x).iushrn(this.shift), y = d;
        return d.cmp(this.m) >= 0 ? y = d.isub(this.m) : d.cmpn(0) < 0 && (y = d.iadd(this.m)), y._forceRed(this);
      }, A.prototype.invm = function(e) {
        var a = this.imod(e._invmp(this.m).mul(this.r2));
        return a._forceRed(this);
      };
    })(I, commonjsGlobal);
  }(bn)), bn.exports;
}
var asn1$1 = {}, asn1 = {}, api = {}, vmBrowserify = {}, hasRequiredVmBrowserify;
function requireVmBrowserify() {
  return hasRequiredVmBrowserify || (hasRequiredVmBrowserify = 1, function(exports) {
    var indexOf = function(I, M) {
      if (I.indexOf) return I.indexOf(M);
      for (var T = 0; T < I.length; T++)
        if (I[T] === M) return T;
      return -1;
    }, Object_keys = function(I) {
      if (Object.keys) return Object.keys(I);
      var M = [];
      for (var T in I) M.push(T);
      return M;
    }, forEach = function(I, M) {
      if (I.forEach) return I.forEach(M);
      for (var T = 0; T < I.length; T++)
        M(I[T], T, I);
    }, defineProp = function() {
      try {
        return Object.defineProperty({}, "_", {}), function(I, M, T) {
          Object.defineProperty(I, M, {
            writable: !0,
            enumerable: !1,
            configurable: !0,
            value: T
          });
        };
      } catch (I) {
        return function(M, T, q) {
          M[T] = q;
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
    var Script = exports.Script = function(M) {
      if (!(this instanceof Script)) return new Script(M);
      this.code = M;
    };
    Script.prototype.runInContext = function(I) {
      if (!(I instanceof Context))
        throw new TypeError("needs a 'context' argument.");
      var M = document.createElement("iframe");
      M.style || (M.style = {}), M.style.display = "none", document.body.appendChild(M);
      var T = M.contentWindow, q = T.eval, C = T.execScript;
      !q && C && (C.call(T, "null"), q = T.eval), forEach(Object_keys(I), function(l) {
        T[l] = I[l];
      }), forEach(globals, function(l) {
        I[l] && (T[l] = I[l]);
      });
      var t = Object_keys(T), E = q.call(T, this.code);
      return forEach(Object_keys(T), function(l) {
        (l in I || indexOf(t, l) === -1) && (I[l] = T[l]);
      }), forEach(globals, function(l) {
        l in I || defineProp(I, l, T[l]);
      }), document.body.removeChild(M), E;
    }, Script.prototype.runInThisContext = function() {
      return eval(this.code);
    }, Script.prototype.runInNewContext = function(I) {
      var M = Script.createContext(I), T = this.runInContext(M);
      return I && forEach(Object_keys(M), function(q) {
        I[q] = M[q];
      }), T;
    }, forEach(Object_keys(Script.prototype), function(I) {
      exports[I] = Script[I] = function(M) {
        var T = Script(M);
        return T[I].apply(T, [].slice.call(arguments, 1));
      };
    }), exports.isContext = function(I) {
      return I instanceof Context;
    }, exports.createScript = function(I) {
      return exports.Script(I);
    }, exports.createContext = Script.createContext = function(I) {
      var M = new Context();
      return typeof I == "object" && forEach(Object_keys(I), function(T) {
        M[T] = I[T];
      }), M;
    };
  }(vmBrowserify)), vmBrowserify;
}
var hasRequiredApi;
function requireApi() {
  return hasRequiredApi || (hasRequiredApi = 1, function(I) {
    var M = requireAsn1$1(), T = requireInherits_browser(), q = I;
    q.define = function(E, l) {
      return new C(E, l);
    };
    function C(t, E) {
      this.name = t, this.body = E, this.decoders = {}, this.encoders = {};
    }
    C.prototype._createNamed = function(E) {
      var l;
      try {
        l = requireVmBrowserify().runInThisContext(
          "(function " + this.name + `(entity) {
  this._initNamed(entity);
})`
        );
      } catch (b) {
        l = function(w) {
          this._initNamed(w);
        };
      }
      return T(l, E), l.prototype._initNamed = function(w) {
        E.call(this, w);
      }, new l(this);
    }, C.prototype._getDecoder = function(E) {
      return E = E || "der", this.decoders.hasOwnProperty(E) || (this.decoders[E] = this._createNamed(M.decoders[E])), this.decoders[E];
    }, C.prototype.decode = function(E, l, b) {
      return this._getDecoder(l).decode(E, b);
    }, C.prototype._getEncoder = function(E) {
      return E = E || "der", this.encoders.hasOwnProperty(E) || (this.encoders[E] = this._createNamed(M.encoders[E])), this.encoders[E];
    }, C.prototype.encode = function(E, l, b) {
      return this._getEncoder(l).encode(E, b);
    };
  }(api)), api;
}
var base = {}, reporter = {}, hasRequiredReporter;
function requireReporter() {
  if (hasRequiredReporter) return reporter;
  hasRequiredReporter = 1;
  var I = requireInherits_browser();
  function M(q) {
    this._reporterState = {
      obj: null,
      path: [],
      options: q || {},
      errors: []
    };
  }
  reporter.Reporter = M, M.prototype.isError = function(C) {
    return C instanceof T;
  }, M.prototype.save = function() {
    var C = this._reporterState;
    return { obj: C.obj, pathLen: C.path.length };
  }, M.prototype.restore = function(C) {
    var t = this._reporterState;
    t.obj = C.obj, t.path = t.path.slice(0, C.pathLen);
  }, M.prototype.enterKey = function(C) {
    return this._reporterState.path.push(C);
  }, M.prototype.exitKey = function(C) {
    var t = this._reporterState;
    t.path = t.path.slice(0, C - 1);
  }, M.prototype.leaveKey = function(C, t, E) {
    var l = this._reporterState;
    this.exitKey(C), l.obj !== null && (l.obj[t] = E);
  }, M.prototype.path = function() {
    return this._reporterState.path.join("/");
  }, M.prototype.enterObject = function() {
    var C = this._reporterState, t = C.obj;
    return C.obj = {}, t;
  }, M.prototype.leaveObject = function(C) {
    var t = this._reporterState, E = t.obj;
    return t.obj = C, E;
  }, M.prototype.error = function(C) {
    var t, E = this._reporterState, l = C instanceof T;
    if (l ? t = C : t = new T(E.path.map(function(b) {
      return "[" + JSON.stringify(b) + "]";
    }).join(""), C.message || C, C.stack), !E.options.partial)
      throw t;
    return l || E.errors.push(t), t;
  }, M.prototype.wrapResult = function(C) {
    var t = this._reporterState;
    return t.options.partial ? {
      result: this.isError(C) ? null : C,
      errors: t.errors
    } : C;
  };
  function T(q, C) {
    this.path = q, this.rethrow(C);
  }
  return I(T, Error), T.prototype.rethrow = function(C) {
    if (this.message = C + " at: " + (this.path || "(shallow)"), Error.captureStackTrace && Error.captureStackTrace(this, T), !this.stack)
      try {
        throw new Error(this.message);
      } catch (t) {
        this.stack = t.stack;
      }
    return this;
  }, reporter;
}
var buffer = {}, hasRequiredBuffer;
function requireBuffer() {
  if (hasRequiredBuffer) return buffer;
  hasRequiredBuffer = 1;
  var I = requireInherits_browser(), M = requireBase().Reporter, T = requireBuffer$1().Buffer;
  function q(t, E) {
    if (M.call(this, E), !T.isBuffer(t)) {
      this.error("Input not Buffer");
      return;
    }
    this.base = t, this.offset = 0, this.length = t.length;
  }
  I(q, M), buffer.DecoderBuffer = q, q.prototype.save = function() {
    return { offset: this.offset, reporter: M.prototype.save.call(this) };
  }, q.prototype.restore = function(E) {
    var l = new q(this.base);
    return l.offset = E.offset, l.length = this.offset, this.offset = E.offset, M.prototype.restore.call(this, E.reporter), l;
  }, q.prototype.isEmpty = function() {
    return this.offset === this.length;
  }, q.prototype.readUInt8 = function(E) {
    return this.offset + 1 <= this.length ? this.base.readUInt8(this.offset++, !0) : this.error(E || "DecoderBuffer overrun");
  }, q.prototype.skip = function(E, l) {
    if (!(this.offset + E <= this.length))
      return this.error(l || "DecoderBuffer overrun");
    var b = new q(this.base);
    return b._reporterState = this._reporterState, b.offset = this.offset, b.length = this.offset + E, this.offset += E, b;
  }, q.prototype.raw = function(E) {
    return this.base.slice(E ? E.offset : this.offset, this.length);
  };
  function C(t, E) {
    if (Array.isArray(t))
      this.length = 0, this.value = t.map(function(l) {
        return l instanceof C || (l = new C(l, E)), this.length += l.length, l;
      }, this);
    else if (typeof t == "number") {
      if (!(0 <= t && t <= 255))
        return E.error("non-byte EncoderBuffer value");
      this.value = t, this.length = 1;
    } else if (typeof t == "string")
      this.value = t, this.length = T.byteLength(t);
    else if (T.isBuffer(t))
      this.value = t, this.length = t.length;
    else
      return E.error("Unsupported type: " + typeof t);
  }
  return buffer.EncoderBuffer = C, C.prototype.join = function(E, l) {
    return E || (E = new T(this.length)), l || (l = 0), this.length === 0 || (Array.isArray(this.value) ? this.value.forEach(function(b) {
      b.join(E, l), l += b.length;
    }) : (typeof this.value == "number" ? E[l] = this.value : typeof this.value == "string" ? E.write(this.value, l) : T.isBuffer(this.value) && this.value.copy(E, l), l += this.length)), E;
  }, buffer;
}
var node, hasRequiredNode;
function requireNode() {
  if (hasRequiredNode) return node;
  hasRequiredNode = 1;
  var I = requireBase().Reporter, M = requireBase().EncoderBuffer, T = requireBase().DecoderBuffer, q = requireMinimalisticAssert(), C = [
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
  ].concat(C), E = [
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
  function l(w, u) {
    var g = {};
    this._baseState = g, g.enc = w, g.parent = u || null, g.children = null, g.tag = null, g.args = null, g.reverseArgs = null, g.choice = null, g.optional = !1, g.any = !1, g.obj = !1, g.use = null, g.useDecoder = null, g.key = null, g.default = null, g.explicit = null, g.implicit = null, g.contains = null, g.parent || (g.children = [], this._wrap());
  }
  node = l;
  var b = [
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
    var u = this._baseState, g = {};
    b.forEach(function(B) {
      g[B] = u[B];
    });
    var R = new this.constructor(g.parent);
    return R._baseState = g, R;
  }, l.prototype._wrap = function() {
    var u = this._baseState;
    t.forEach(function(g) {
      this[g] = function() {
        var B = new this.constructor(this);
        return u.children.push(B), B[g].apply(B, arguments);
      };
    }, this);
  }, l.prototype._init = function(u) {
    var g = this._baseState;
    q(g.parent === null), u.call(this), g.children = g.children.filter(function(R) {
      return R._baseState.parent === this;
    }, this), q.equal(g.children.length, 1, "Root node can have only one child");
  }, l.prototype._useArgs = function(u) {
    var g = this._baseState, R = u.filter(function(B) {
      return B instanceof this.constructor;
    }, this);
    u = u.filter(function(B) {
      return !(B instanceof this.constructor);
    }, this), R.length !== 0 && (q(g.children === null), g.children = R, R.forEach(function(B) {
      B._baseState.parent = this;
    }, this)), u.length !== 0 && (q(g.args === null), g.args = u, g.reverseArgs = u.map(function(B) {
      if (typeof B != "object" || B.constructor !== Object)
        return B;
      var k = {};
      return Object.keys(B).forEach(function($) {
        $ == ($ | 0) && ($ |= 0);
        var O = B[$];
        k[O] = $;
      }), k;
    }));
  }, E.forEach(function(w) {
    l.prototype[w] = function() {
      var g = this._baseState;
      throw new Error(w + " not implemented for encoding: " + g.enc);
    };
  }), C.forEach(function(w) {
    l.prototype[w] = function() {
      var g = this._baseState, R = Array.prototype.slice.call(arguments);
      return q(g.tag === null), g.tag = w, this._useArgs(R), this;
    };
  }), l.prototype.use = function(u) {
    q(u);
    var g = this._baseState;
    return q(g.use === null), g.use = u, this;
  }, l.prototype.optional = function() {
    var u = this._baseState;
    return u.optional = !0, this;
  }, l.prototype.def = function(u) {
    var g = this._baseState;
    return q(g.default === null), g.default = u, g.optional = !0, this;
  }, l.prototype.explicit = function(u) {
    var g = this._baseState;
    return q(g.explicit === null && g.implicit === null), g.explicit = u, this;
  }, l.prototype.implicit = function(u) {
    var g = this._baseState;
    return q(g.explicit === null && g.implicit === null), g.implicit = u, this;
  }, l.prototype.obj = function() {
    var u = this._baseState, g = Array.prototype.slice.call(arguments);
    return u.obj = !0, g.length !== 0 && this._useArgs(g), this;
  }, l.prototype.key = function(u) {
    var g = this._baseState;
    return q(g.key === null), g.key = u, this;
  }, l.prototype.any = function() {
    var u = this._baseState;
    return u.any = !0, this;
  }, l.prototype.choice = function(u) {
    var g = this._baseState;
    return q(g.choice === null), g.choice = u, this._useArgs(Object.keys(u).map(function(R) {
      return u[R];
    })), this;
  }, l.prototype.contains = function(u) {
    var g = this._baseState;
    return q(g.use === null), g.contains = u, this;
  }, l.prototype._decode = function(u, g) {
    var R = this._baseState;
    if (R.parent === null)
      return u.wrapResult(R.children[0]._decode(u, g));
    var B = R.default, k = !0, $ = null;
    if (R.key !== null && ($ = u.enterKey(R.key)), R.optional) {
      var O = null;
      if (R.explicit !== null ? O = R.explicit : R.implicit !== null ? O = R.implicit : R.tag !== null && (O = R.tag), O === null && !R.any) {
        var D = u.save();
        try {
          R.choice === null ? this._decodeGeneric(R.tag, u, g) : this._decodeChoice(u, g), k = !0;
        } catch (ae) {
          k = !1;
        }
        u.restore(D);
      } else if (k = this._peekTag(u, O, R.any), u.isError(k))
        return k;
    }
    var N;
    if (R.obj && k && (N = u.enterObject()), k) {
      if (R.explicit !== null) {
        var W = this._decodeTag(u, R.explicit);
        if (u.isError(W))
          return W;
        u = W;
      }
      var z = u.offset;
      if (R.use === null && R.choice === null) {
        if (R.any)
          var D = u.save();
        var X = this._decodeTag(
          u,
          R.implicit !== null ? R.implicit : R.tag,
          R.any
        );
        if (u.isError(X))
          return X;
        R.any ? B = u.raw(D) : u = X;
      }
      if (g && g.track && R.tag !== null && g.track(u.path(), z, u.length, "tagged"), g && g.track && R.tag !== null && g.track(u.path(), u.offset, u.length, "content"), R.any ? B = B : R.choice === null ? B = this._decodeGeneric(R.tag, u, g) : B = this._decodeChoice(u, g), u.isError(B))
        return B;
      if (!R.any && R.choice === null && R.children !== null && R.children.forEach(function(fe) {
        fe._decode(u, g);
      }), R.contains && (R.tag === "octstr" || R.tag === "bitstr")) {
        var Q = new T(B);
        B = this._getUse(R.contains, u._reporterState.obj)._decode(Q, g);
      }
    }
    return R.obj && k && (B = u.leaveObject(N)), R.key !== null && (B !== null || k === !0) ? u.leaveKey($, R.key, B) : $ !== null && u.exitKey($), B;
  }, l.prototype._decodeGeneric = function(u, g, R) {
    var B = this._baseState;
    return u === "seq" || u === "set" ? null : u === "seqof" || u === "setof" ? this._decodeList(g, u, B.args[0], R) : /str$/.test(u) ? this._decodeStr(g, u, R) : u === "objid" && B.args ? this._decodeObjid(g, B.args[0], B.args[1], R) : u === "objid" ? this._decodeObjid(g, null, null, R) : u === "gentime" || u === "utctime" ? this._decodeTime(g, u, R) : u === "null_" ? this._decodeNull(g, R) : u === "bool" ? this._decodeBool(g, R) : u === "objDesc" ? this._decodeStr(g, u, R) : u === "int" || u === "enum" ? this._decodeInt(g, B.args && B.args[0], R) : B.use !== null ? this._getUse(B.use, g._reporterState.obj)._decode(g, R) : g.error("unknown tag: " + u);
  }, l.prototype._getUse = function(u, g) {
    var R = this._baseState;
    return R.useDecoder = this._use(u, g), q(R.useDecoder._baseState.parent === null), R.useDecoder = R.useDecoder._baseState.children[0], R.implicit !== R.useDecoder._baseState.implicit && (R.useDecoder = R.useDecoder.clone(), R.useDecoder._baseState.implicit = R.implicit), R.useDecoder;
  }, l.prototype._decodeChoice = function(u, g) {
    var R = this._baseState, B = null, k = !1;
    return Object.keys(R.choice).some(function($) {
      var O = u.save(), D = R.choice[$];
      try {
        var N = D._decode(u, g);
        if (u.isError(N))
          return !1;
        B = { type: $, value: N }, k = !0;
      } catch (W) {
        return u.restore(O), !1;
      }
      return !0;
    }, this), k ? B : u.error("Choice not matched");
  }, l.prototype._createEncoderBuffer = function(u) {
    return new M(u, this.reporter);
  }, l.prototype._encode = function(u, g, R) {
    var B = this._baseState;
    if (!(B.default !== null && B.default === u)) {
      var k = this._encodeValue(u, g, R);
      if (k !== void 0 && !this._skipDefault(k, g, R))
        return k;
    }
  }, l.prototype._encodeValue = function(u, g, R) {
    var B = this._baseState;
    if (B.parent === null)
      return B.children[0]._encode(u, g || new I());
    var D = null;
    if (this.reporter = g, B.optional && u === void 0)
      if (B.default !== null)
        u = B.default;
      else
        return;
    var k = null, $ = !1;
    if (B.any)
      D = this._createEncoderBuffer(u);
    else if (B.choice)
      D = this._encodeChoice(u, g);
    else if (B.contains)
      k = this._getUse(B.contains, R)._encode(u, g), $ = !0;
    else if (B.children)
      k = B.children.map(function(z) {
        if (z._baseState.tag === "null_")
          return z._encode(null, g, u);
        if (z._baseState.key === null)
          return g.error("Child should have a key");
        var X = g.enterKey(z._baseState.key);
        if (typeof u != "object")
          return g.error("Child expected, but input is not object");
        var Q = z._encode(u[z._baseState.key], g, u);
        return g.leaveKey(X), Q;
      }, this).filter(function(z) {
        return z;
      }), k = this._createEncoderBuffer(k);
    else if (B.tag === "seqof" || B.tag === "setof") {
      if (!(B.args && B.args.length === 1))
        return g.error("Too many args for : " + B.tag);
      if (!Array.isArray(u))
        return g.error("seqof/setof, but data is not Array");
      var O = this.clone();
      O._baseState.implicit = null, k = this._createEncoderBuffer(u.map(function(z) {
        var X = this._baseState;
        return this._getUse(X.args[0], u)._encode(z, g);
      }, O));
    } else B.use !== null ? D = this._getUse(B.use, R)._encode(u, g) : (k = this._encodePrimitive(B.tag, u), $ = !0);
    var D;
    if (!B.any && B.choice === null) {
      var N = B.implicit !== null ? B.implicit : B.tag, W = B.implicit === null ? "universal" : "context";
      N === null ? B.use === null && g.error("Tag could be omitted only for .use()") : B.use === null && (D = this._encodeComposite(N, $, W, k));
    }
    return B.explicit !== null && (D = this._encodeComposite(B.explicit, !1, "context", D)), D;
  }, l.prototype._encodeChoice = function(u, g) {
    var R = this._baseState, B = R.choice[u.type];
    return B || q(
      !1,
      u.type + " not found in " + JSON.stringify(Object.keys(R.choice))
    ), B._encode(u.value, g);
  }, l.prototype._encodePrimitive = function(u, g) {
    var R = this._baseState;
    if (/str$/.test(u))
      return this._encodeStr(g, u);
    if (u === "objid" && R.args)
      return this._encodeObjid(g, R.reverseArgs[0], R.args[1]);
    if (u === "objid")
      return this._encodeObjid(g, null, null);
    if (u === "gentime" || u === "utctime")
      return this._encodeTime(g, u);
    if (u === "null_")
      return this._encodeNull();
    if (u === "int" || u === "enum")
      return this._encodeInt(g, R.args && R.reverseArgs[0]);
    if (u === "bool")
      return this._encodeBool(g);
    if (u === "objDesc")
      return this._encodeStr(g, u);
    throw new Error("Unsupported tag: " + u);
  }, l.prototype._isNumstr = function(u) {
    return /^[0-9 ]*$/.test(u);
  }, l.prototype._isPrintstr = function(u) {
    return /^[A-Za-z0-9 '\(\)\+,\-\.\/:=\?]*$/.test(u);
  }, node;
}
var hasRequiredBase;
function requireBase() {
  return hasRequiredBase || (hasRequiredBase = 1, function(I) {
    var M = I;
    M.Reporter = requireReporter().Reporter, M.DecoderBuffer = requireBuffer().DecoderBuffer, M.EncoderBuffer = requireBuffer().EncoderBuffer, M.Node = requireNode();
  }(base)), base;
}
var constants = {}, der = {}, hasRequiredDer$2;
function requireDer$2() {
  return hasRequiredDer$2 || (hasRequiredDer$2 = 1, function(I) {
    var M = requireConstants();
    I.tagClass = {
      0: "universal",
      1: "application",
      2: "context",
      3: "private"
    }, I.tagClassByName = M._reverse(I.tagClass), I.tag = {
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
    }, I.tagByName = M._reverse(I.tag);
  }(der)), der;
}
var hasRequiredConstants;
function requireConstants() {
  return hasRequiredConstants || (hasRequiredConstants = 1, function(I) {
    var M = I;
    M._reverse = function(q) {
      var C = {};
      return Object.keys(q).forEach(function(t) {
        (t | 0) == t && (t = t | 0);
        var E = q[t];
        C[E] = t;
      }), C;
    }, M.der = requireDer$2();
  }(constants)), constants;
}
var decoders = {}, der_1$1, hasRequiredDer$1;
function requireDer$1() {
  if (hasRequiredDer$1) return der_1$1;
  hasRequiredDer$1 = 1;
  var I = requireInherits_browser(), M = requireAsn1$1(), T = M.base, q = M.bignum, C = M.constants.der;
  function t(w) {
    this.enc = "der", this.name = w.name, this.entity = w, this.tree = new E(), this.tree._init(w.body);
  }
  der_1$1 = t, t.prototype.decode = function(u, g) {
    return u instanceof T.DecoderBuffer || (u = new T.DecoderBuffer(u, g)), this.tree._decode(u, g);
  };
  function E(w) {
    T.Node.call(this, "der", w);
  }
  I(E, T.Node), E.prototype._peekTag = function(u, g, R) {
    if (u.isEmpty())
      return !1;
    var B = u.save(), k = l(u, 'Failed to peek tag: "' + g + '"');
    return u.isError(k) ? k : (u.restore(B), k.tag === g || k.tagStr === g || k.tagStr + "of" === g || R);
  }, E.prototype._decodeTag = function(u, g, R) {
    var B = l(
      u,
      'Failed to decode tag of "' + g + '"'
    );
    if (u.isError(B))
      return B;
    var k = b(
      u,
      B.primitive,
      'Failed to get length of "' + g + '"'
    );
    if (u.isError(k))
      return k;
    if (!R && B.tag !== g && B.tagStr !== g && B.tagStr + "of" !== g)
      return u.error('Failed to match tag: "' + g + '"');
    if (B.primitive || k !== null)
      return u.skip(k, 'Failed to match body of: "' + g + '"');
    var $ = u.save(), O = this._skipUntilEnd(
      u,
      'Failed to skip indefinite length body: "' + this.tag + '"'
    );
    return u.isError(O) ? O : (k = u.offset - $.offset, u.restore($), u.skip(k, 'Failed to match body of: "' + g + '"'));
  }, E.prototype._skipUntilEnd = function(u, g) {
    for (; ; ) {
      var R = l(u, g);
      if (u.isError(R))
        return R;
      var B = b(u, R.primitive, g);
      if (u.isError(B))
        return B;
      var k;
      if (R.primitive || B !== null ? k = u.skip(B) : k = this._skipUntilEnd(u, g), u.isError(k))
        return k;
      if (R.tagStr === "end")
        break;
    }
  }, E.prototype._decodeList = function(u, g, R, B) {
    for (var k = []; !u.isEmpty(); ) {
      var $ = this._peekTag(u, "end");
      if (u.isError($))
        return $;
      var O = R.decode(u, "der", B);
      if (u.isError(O) && $)
        break;
      k.push(O);
    }
    return k;
  }, E.prototype._decodeStr = function(u, g) {
    if (g === "bitstr") {
      var R = u.readUInt8();
      return u.isError(R) ? R : { unused: R, data: u.raw() };
    } else if (g === "bmpstr") {
      var B = u.raw();
      if (B.length % 2 === 1)
        return u.error("Decoding of string type: bmpstr length mismatch");
      for (var k = "", $ = 0; $ < B.length / 2; $++)
        k += String.fromCharCode(B.readUInt16BE($ * 2));
      return k;
    } else if (g === "numstr") {
      var O = u.raw().toString("ascii");
      return this._isNumstr(O) ? O : u.error("Decoding of string type: numstr unsupported characters");
    } else {
      if (g === "octstr")
        return u.raw();
      if (g === "objDesc")
        return u.raw();
      if (g === "printstr") {
        var D = u.raw().toString("ascii");
        return this._isPrintstr(D) ? D : u.error("Decoding of string type: printstr unsupported characters");
      } else return /str$/.test(g) ? u.raw().toString() : u.error("Decoding of string type: " + g + " unsupported");
    }
  }, E.prototype._decodeObjid = function(u, g, R) {
    for (var B, k = [], $ = 0; !u.isEmpty(); ) {
      var O = u.readUInt8();
      $ <<= 7, $ |= O & 127, O & 128 || (k.push($), $ = 0);
    }
    O & 128 && k.push($);
    var D = k[0] / 40 | 0, N = k[0] % 40;
    if (R ? B = k : B = [D, N].concat(k.slice(1)), g) {
      var W = g[B.join(" ")];
      W === void 0 && (W = g[B.join(".")]), W !== void 0 && (B = W);
    }
    return B;
  }, E.prototype._decodeTime = function(u, g) {
    var R = u.raw().toString();
    if (g === "gentime")
      var B = R.slice(0, 4) | 0, k = R.slice(4, 6) | 0, $ = R.slice(6, 8) | 0, O = R.slice(8, 10) | 0, D = R.slice(10, 12) | 0, N = R.slice(12, 14) | 0;
    else if (g === "utctime") {
      var B = R.slice(0, 2) | 0, k = R.slice(2, 4) | 0, $ = R.slice(4, 6) | 0, O = R.slice(6, 8) | 0, D = R.slice(8, 10) | 0, N = R.slice(10, 12) | 0;
      B < 70 ? B = 2e3 + B : B = 1900 + B;
    } else
      return u.error("Decoding " + g + " time is not supported yet");
    return Date.UTC(B, k - 1, $, O, D, N, 0);
  }, E.prototype._decodeNull = function(u) {
    return null;
  }, E.prototype._decodeBool = function(u) {
    var g = u.readUInt8();
    return u.isError(g) ? g : g !== 0;
  }, E.prototype._decodeInt = function(u, g) {
    var R = u.raw(), B = new q(R);
    return g && (B = g[B.toString(10)] || B), B;
  }, E.prototype._use = function(u, g) {
    return typeof u == "function" && (u = u(g)), u._getDecoder("der").tree;
  };
  function l(w, u) {
    var g = w.readUInt8(u);
    if (w.isError(g))
      return g;
    var R = C.tagClass[g >> 6], B = (g & 32) === 0;
    if ((g & 31) === 31) {
      var k = g;
      for (g = 0; (k & 128) === 128; ) {
        if (k = w.readUInt8(u), w.isError(k))
          return k;
        g <<= 7, g |= k & 127;
      }
    } else
      g &= 31;
    var $ = C.tag[g];
    return {
      cls: R,
      primitive: B,
      tag: g,
      tagStr: $
    };
  }
  function b(w, u, g) {
    var R = w.readUInt8(g);
    if (w.isError(R))
      return R;
    if (!u && R === 128)
      return null;
    if (!(R & 128))
      return R;
    var B = R & 127;
    if (B > 4)
      return w.error("length octect is too long");
    R = 0;
    for (var k = 0; k < B; k++) {
      R <<= 8;
      var $ = w.readUInt8(g);
      if (w.isError($))
        return $;
      R |= $;
    }
    return R;
  }
  return der_1$1;
}
var pem$1, hasRequiredPem$1;
function requirePem$1() {
  if (hasRequiredPem$1) return pem$1;
  hasRequiredPem$1 = 1;
  var I = requireInherits_browser(), M = requireBuffer$1().Buffer, T = requireDer$1();
  function q(C) {
    T.call(this, C), this.enc = "pem";
  }
  return I(q, T), pem$1 = q, q.prototype.decode = function(t, E) {
    for (var l = t.toString().split(/[\r\n]+/g), b = E.label.toUpperCase(), w = /^-----(BEGIN|END) ([^-]+)-----$/, u = -1, g = -1, R = 0; R < l.length; R++) {
      var B = l[R].match(w);
      if (B !== null && B[2] === b)
        if (u === -1) {
          if (B[1] !== "BEGIN")
            break;
          u = R;
        } else {
          if (B[1] !== "END")
            break;
          g = R;
          break;
        }
    }
    if (u === -1 || g === -1)
      throw new Error("PEM section not found for: " + b);
    var k = l.slice(u + 1, g).join("");
    k.replace(/[^a-z0-9\+\/=]+/gi, "");
    var $ = new M(k, "base64");
    return T.prototype.decode.call(this, $, E);
  }, pem$1;
}
var hasRequiredDecoders;
function requireDecoders() {
  return hasRequiredDecoders || (hasRequiredDecoders = 1, function(I) {
    var M = I;
    M.der = requireDer$1(), M.pem = requirePem$1();
  }(decoders)), decoders;
}
var encoders = {}, der_1, hasRequiredDer;
function requireDer() {
  if (hasRequiredDer) return der_1;
  hasRequiredDer = 1;
  var I = requireInherits_browser(), M = requireBuffer$1().Buffer, T = requireAsn1$1(), q = T.base, C = T.constants.der;
  function t(w) {
    this.enc = "der", this.name = w.name, this.entity = w, this.tree = new E(), this.tree._init(w.body);
  }
  der_1 = t, t.prototype.encode = function(u, g) {
    return this.tree._encode(u, g).join();
  };
  function E(w) {
    q.Node.call(this, "der", w);
  }
  I(E, q.Node), E.prototype._encodeComposite = function(u, g, R, B) {
    var k = b(u, g, R, this.reporter);
    if (B.length < 128) {
      var D = new M(2);
      return D[0] = k, D[1] = B.length, this._createEncoderBuffer([D, B]);
    }
    for (var $ = 1, O = B.length; O >= 256; O >>= 8)
      $++;
    var D = new M(2 + $);
    D[0] = k, D[1] = 128 | $;
    for (var O = 1 + $, N = B.length; N > 0; O--, N >>= 8)
      D[O] = N & 255;
    return this._createEncoderBuffer([D, B]);
  }, E.prototype._encodeStr = function(u, g) {
    if (g === "bitstr")
      return this._createEncoderBuffer([u.unused | 0, u.data]);
    if (g === "bmpstr") {
      for (var R = new M(u.length * 2), B = 0; B < u.length; B++)
        R.writeUInt16BE(u.charCodeAt(B), B * 2);
      return this._createEncoderBuffer(R);
    } else return g === "numstr" ? this._isNumstr(u) ? this._createEncoderBuffer(u) : this.reporter.error("Encoding of string type: numstr supports only digits and space") : g === "printstr" ? this._isPrintstr(u) ? this._createEncoderBuffer(u) : this.reporter.error("Encoding of string type: printstr supports only latin upper and lower case letters, digits, space, apostrophe, left and rigth parenthesis, plus sign, comma, hyphen, dot, slash, colon, equal sign, question mark") : /str$/.test(g) ? this._createEncoderBuffer(u) : g === "objDesc" ? this._createEncoderBuffer(u) : this.reporter.error("Encoding of string type: " + g + " unsupported");
  }, E.prototype._encodeObjid = function(u, g, R) {
    if (typeof u == "string") {
      if (!g)
        return this.reporter.error("string objid given, but no values map found");
      if (!g.hasOwnProperty(u))
        return this.reporter.error("objid not found in values map");
      u = g[u].split(/[\s\.]+/g);
      for (var B = 0; B < u.length; B++)
        u[B] |= 0;
    } else if (Array.isArray(u)) {
      u = u.slice();
      for (var B = 0; B < u.length; B++)
        u[B] |= 0;
    }
    if (!Array.isArray(u))
      return this.reporter.error("objid() should be either array or string, got: " + JSON.stringify(u));
    if (!R) {
      if (u[1] >= 40)
        return this.reporter.error("Second objid identifier OOB");
      u.splice(0, 2, u[0] * 40 + u[1]);
    }
    for (var k = 0, B = 0; B < u.length; B++) {
      var $ = u[B];
      for (k++; $ >= 128; $ >>= 7)
        k++;
    }
    for (var O = new M(k), D = O.length - 1, B = u.length - 1; B >= 0; B--) {
      var $ = u[B];
      for (O[D--] = $ & 127; ($ >>= 7) > 0; )
        O[D--] = 128 | $ & 127;
    }
    return this._createEncoderBuffer(O);
  };
  function l(w) {
    return w < 10 ? "0" + w : w;
  }
  E.prototype._encodeTime = function(u, g) {
    var R, B = new Date(u);
    return g === "gentime" ? R = [
      l(B.getFullYear()),
      l(B.getUTCMonth() + 1),
      l(B.getUTCDate()),
      l(B.getUTCHours()),
      l(B.getUTCMinutes()),
      l(B.getUTCSeconds()),
      "Z"
    ].join("") : g === "utctime" ? R = [
      l(B.getFullYear() % 100),
      l(B.getUTCMonth() + 1),
      l(B.getUTCDate()),
      l(B.getUTCHours()),
      l(B.getUTCMinutes()),
      l(B.getUTCSeconds()),
      "Z"
    ].join("") : this.reporter.error("Encoding " + g + " time is not supported yet"), this._encodeStr(R, "octstr");
  }, E.prototype._encodeNull = function() {
    return this._createEncoderBuffer("");
  }, E.prototype._encodeInt = function(u, g) {
    if (typeof u == "string") {
      if (!g)
        return this.reporter.error("String int or enum given, but no values map");
      if (!g.hasOwnProperty(u))
        return this.reporter.error("Values map doesn't contain: " + JSON.stringify(u));
      u = g[u];
    }
    if (typeof u != "number" && !M.isBuffer(u)) {
      var R = u.toArray();
      !u.sign && R[0] & 128 && R.unshift(0), u = new M(R);
    }
    if (M.isBuffer(u)) {
      var B = u.length;
      u.length === 0 && B++;
      var $ = new M(B);
      return u.copy($), u.length === 0 && ($[0] = 0), this._createEncoderBuffer($);
    }
    if (u < 128)
      return this._createEncoderBuffer(u);
    if (u < 256)
      return this._createEncoderBuffer([0, u]);
    for (var B = 1, k = u; k >= 256; k >>= 8)
      B++;
    for (var $ = new Array(B), k = $.length - 1; k >= 0; k--)
      $[k] = u & 255, u >>= 8;
    return $[0] & 128 && $.unshift(0), this._createEncoderBuffer(new M($));
  }, E.prototype._encodeBool = function(u) {
    return this._createEncoderBuffer(u ? 255 : 0);
  }, E.prototype._use = function(u, g) {
    return typeof u == "function" && (u = u(g)), u._getEncoder("der").tree;
  }, E.prototype._skipDefault = function(u, g, R) {
    var B = this._baseState, k;
    if (B.default === null)
      return !1;
    var $ = u.join();
    if (B.defaultBuffer === void 0 && (B.defaultBuffer = this._encodeValue(B.default, g, R).join()), $.length !== B.defaultBuffer.length)
      return !1;
    for (k = 0; k < $.length; k++)
      if ($[k] !== B.defaultBuffer[k])
        return !1;
    return !0;
  };
  function b(w, u, g, R) {
    var B;
    if (w === "seqof" ? w = "seq" : w === "setof" && (w = "set"), C.tagByName.hasOwnProperty(w))
      B = C.tagByName[w];
    else if (typeof w == "number" && (w | 0) === w)
      B = w;
    else
      return R.error("Unknown tag: " + w);
    return B >= 31 ? R.error("Multi-octet tag encoding unsupported") : (u || (B |= 32), B |= C.tagClassByName[g || "universal"] << 6, B);
  }
  return der_1;
}
var pem, hasRequiredPem;
function requirePem() {
  if (hasRequiredPem) return pem;
  hasRequiredPem = 1;
  var I = requireInherits_browser(), M = requireDer();
  function T(q) {
    M.call(this, q), this.enc = "pem";
  }
  return I(T, M), pem = T, T.prototype.encode = function(C, t) {
    for (var E = M.prototype.encode.call(this, C), l = E.toString("base64"), b = ["-----BEGIN " + t.label + "-----"], w = 0; w < l.length; w += 64)
      b.push(l.slice(w, w + 64));
    return b.push("-----END " + t.label + "-----"), b.join(`
`);
  }, pem;
}
var hasRequiredEncoders;
function requireEncoders() {
  return hasRequiredEncoders || (hasRequiredEncoders = 1, function(I) {
    var M = I;
    M.der = requireDer(), M.pem = requirePem();
  }(encoders)), encoders;
}
var hasRequiredAsn1$1;
function requireAsn1$1() {
  return hasRequiredAsn1$1 || (hasRequiredAsn1$1 = 1, function(I) {
    var M = I;
    M.bignum = requireBn$2(), M.define = requireApi().define, M.base = requireBase(), M.constants = requireConstants(), M.decoders = requireDecoders(), M.encoders = requireEncoders();
  }(asn1)), asn1;
}
var certificate, hasRequiredCertificate;
function requireCertificate() {
  if (hasRequiredCertificate) return certificate;
  hasRequiredCertificate = 1;
  var I = requireAsn1$1(), M = I.define("Time", function() {
    this.choice({
      utcTime: this.utctime(),
      generalTime: this.gentime()
    });
  }), T = I.define("AttributeTypeValue", function() {
    this.seq().obj(
      this.key("type").objid(),
      this.key("value").any()
    );
  }), q = I.define("AlgorithmIdentifier", function() {
    this.seq().obj(
      this.key("algorithm").objid(),
      this.key("parameters").optional(),
      this.key("curve").objid().optional()
    );
  }), C = I.define("SubjectPublicKeyInfo", function() {
    this.seq().obj(
      this.key("algorithm").use(q),
      this.key("subjectPublicKey").bitstr()
    );
  }), t = I.define("RelativeDistinguishedName", function() {
    this.setof(T);
  }), E = I.define("RDNSequence", function() {
    this.seqof(t);
  }), l = I.define("Name", function() {
    this.choice({
      rdnSequence: this.use(E)
    });
  }), b = I.define("Validity", function() {
    this.seq().obj(
      this.key("notBefore").use(M),
      this.key("notAfter").use(M)
    );
  }), w = I.define("Extension", function() {
    this.seq().obj(
      this.key("extnID").objid(),
      this.key("critical").bool().def(!1),
      this.key("extnValue").octstr()
    );
  }), u = I.define("TBSCertificate", function() {
    this.seq().obj(
      this.key("version").explicit(0).int().optional(),
      this.key("serialNumber").int(),
      this.key("signature").use(q),
      this.key("issuer").use(l),
      this.key("validity").use(b),
      this.key("subject").use(l),
      this.key("subjectPublicKeyInfo").use(C),
      this.key("issuerUniqueID").implicit(1).bitstr().optional(),
      this.key("subjectUniqueID").implicit(2).bitstr().optional(),
      this.key("extensions").explicit(3).seqof(w).optional()
    );
  }), g = I.define("X509Certificate", function() {
    this.seq().obj(
      this.key("tbsCertificate").use(u),
      this.key("signatureAlgorithm").use(q),
      this.key("signatureValue").bitstr()
    );
  });
  return certificate = g, certificate;
}
var hasRequiredAsn1;
function requireAsn1() {
  if (hasRequiredAsn1) return asn1$1;
  hasRequiredAsn1 = 1;
  var I = requireAsn1$1();
  asn1$1.certificate = requireCertificate();
  var M = I.define("RSAPrivateKey", function() {
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
  asn1$1.RSAPrivateKey = M;
  var T = I.define("RSAPublicKey", function() {
    this.seq().obj(
      this.key("modulus").int(),
      this.key("publicExponent").int()
    );
  });
  asn1$1.RSAPublicKey = T;
  var q = I.define("AlgorithmIdentifier", function() {
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
  }), C = I.define("SubjectPublicKeyInfo", function() {
    this.seq().obj(
      this.key("algorithm").use(q),
      this.key("subjectPublicKey").bitstr()
    );
  });
  asn1$1.PublicKey = C;
  var t = I.define("PrivateKeyInfo", function() {
    this.seq().obj(
      this.key("version").int(),
      this.key("algorithm").use(q),
      this.key("subjectPrivateKey").octstr()
    );
  });
  asn1$1.PrivateKey = t;
  var E = I.define("EncryptedPrivateKeyInfo", function() {
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
  asn1$1.EncryptedPrivateKey = E;
  var l = I.define("DSAPrivateKey", function() {
    this.seq().obj(
      this.key("version").int(),
      this.key("p").int(),
      this.key("q").int(),
      this.key("g").int(),
      this.key("pub_key").int(),
      this.key("priv_key").int()
    );
  });
  asn1$1.DSAPrivateKey = l, asn1$1.DSAparam = I.define("DSAparam", function() {
    this.int();
  });
  var b = I.define("ECParameters", function() {
    this.choice({
      namedCurve: this.objid()
    });
  }), w = I.define("ECPrivateKey", function() {
    this.seq().obj(
      this.key("version").int(),
      this.key("privateKey").octstr(),
      this.key("parameters").optional().explicit(0).use(b),
      this.key("publicKey").optional().explicit(1).bitstr()
    );
  });
  return asn1$1.ECPrivateKey = w, asn1$1.signature = I.define("signature", function() {
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
  var I = /Proc-Type: 4,ENCRYPTED[\n\r]+DEK-Info: AES-((?:128)|(?:192)|(?:256))-CBC,([0-9A-H]+)[\n\r]+([0-9A-z\n\r+/=]+)[\n\r]+/m, M = /^-----BEGIN ((?:.*? KEY)|CERTIFICATE)-----/m, T = /^-----BEGIN ((?:.*? KEY)|CERTIFICATE)-----([0-9A-z\n\r+/=]+)-----END \1-----$/m, q = requireEvp_bytestokey(), C = requireBrowser$6(), t = requireSafeBuffer$1().Buffer;
  return fixProc = function(E, l) {
    var b = E.toString(), w = b.match(I), u;
    if (w) {
      var R = "aes" + w[1], B = t.from(w[2], "hex"), k = t.from(w[3].replace(/[\r\n]/g, ""), "base64"), $ = q(l, B.slice(0, 8), parseInt(w[1], 10)).key, O = [], D = C.createDecipheriv(R, $, B);
      O.push(D.update(k)), O.push(D.final()), u = t.concat(O);
    } else {
      var g = b.match(T);
      u = t.from(g[2].replace(/[\r\n]/g, ""), "base64");
    }
    var N = b.match(M)[1];
    return {
      tag: N,
      data: u
    };
  }, fixProc;
}
var parseAsn1, hasRequiredParseAsn1;
function requireParseAsn1() {
  if (hasRequiredParseAsn1) return parseAsn1;
  hasRequiredParseAsn1 = 1;
  var I = requireAsn1(), M = require$$1, T = requireFixProc(), q = requireBrowser$6(), C = requireBrowser$7(), t = requireSafeBuffer$1().Buffer;
  function E(b, w) {
    var u = b.algorithm.decrypt.kde.kdeparams.salt, g = parseInt(b.algorithm.decrypt.kde.kdeparams.iters.toString(), 10), R = M[b.algorithm.decrypt.cipher.algo.join(".")], B = b.algorithm.decrypt.cipher.iv, k = b.subjectPrivateKey, $ = parseInt(R.split("-")[1], 10) / 8, O = C.pbkdf2Sync(w, u, g, $, "sha1"), D = q.createDecipheriv(R, O, B), N = [];
    return N.push(D.update(k)), N.push(D.final()), t.concat(N);
  }
  function l(b) {
    var w;
    typeof b == "object" && !t.isBuffer(b) && (w = b.passphrase, b = b.key), typeof b == "string" && (b = t.from(b));
    var u = T(b, w), g = u.tag, R = u.data, B, k;
    switch (g) {
      case "CERTIFICATE":
        k = I.certificate.decode(R, "der").tbsCertificate.subjectPublicKeyInfo;
      case "PUBLIC KEY":
        switch (k || (k = I.PublicKey.decode(R, "der")), B = k.algorithm.algorithm.join("."), B) {
          case "1.2.840.113549.1.1.1":
            return I.RSAPublicKey.decode(k.subjectPublicKey.data, "der");
          case "1.2.840.10045.2.1":
            return k.subjectPrivateKey = k.subjectPublicKey, {
              type: "ec",
              data: k
            };
          case "1.2.840.10040.4.1":
            return k.algorithm.params.pub_key = I.DSAparam.decode(k.subjectPublicKey.data, "der"), {
              type: "dsa",
              data: k.algorithm.params
            };
          default:
            throw new Error("unknown key id " + B);
        }
      case "ENCRYPTED PRIVATE KEY":
        R = I.EncryptedPrivateKey.decode(R, "der"), R = E(R, w);
      case "PRIVATE KEY":
        switch (k = I.PrivateKey.decode(R, "der"), B = k.algorithm.algorithm.join("."), B) {
          case "1.2.840.113549.1.1.1":
            return I.RSAPrivateKey.decode(k.subjectPrivateKey, "der");
          case "1.2.840.10045.2.1":
            return {
              curve: k.algorithm.curve,
              privateKey: I.ECPrivateKey.decode(k.subjectPrivateKey, "der").privateKey
            };
          case "1.2.840.10040.4.1":
            return k.algorithm.params.priv_key = I.DSAparam.decode(k.subjectPrivateKey, "der"), {
              type: "dsa",
              params: k.algorithm.params
            };
          default:
            throw new Error("unknown key id " + B);
        }
      case "RSA PUBLIC KEY":
        return I.RSAPublicKey.decode(R, "der");
      case "RSA PRIVATE KEY":
        return I.RSAPrivateKey.decode(R, "der");
      case "DSA PRIVATE KEY":
        return {
          type: "dsa",
          params: I.DSAPrivateKey.decode(R, "der")
        };
      case "EC PRIVATE KEY":
        return R = I.ECPrivateKey.decode(R, "der"), {
          curve: R.parameters.value,
          privateKey: R.privateKey
        };
      default:
        throw new Error("unknown key type " + g);
    }
  }
  return l.signature = I.signature, parseAsn1 = l, parseAsn1;
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
  var I = requireSafeBuffer$1().Buffer, M = requireBrowser$8(), T = requireBrowserifyRsa(), q = requireElliptic().ec, C = requireBn(), t = requireParseAsn1(), E = require$$4, l = 1;
  function b(D, N, W, z, X) {
    var Q = t(N);
    if (Q.curve) {
      if (z !== "ecdsa" && z !== "ecdsa/rsa")
        throw new Error("wrong private key type");
      return w(D, Q);
    } else if (Q.type === "dsa") {
      if (z !== "dsa")
        throw new Error("wrong private key type");
      return u(D, Q, W);
    }
    if (z !== "rsa" && z !== "ecdsa/rsa")
      throw new Error("wrong private key type");
    if (N.padding !== void 0 && N.padding !== l)
      throw new Error("illegal or unsupported padding mode");
    D = I.concat([X, D]);
    for (var ae = Q.modulus.byteLength(), fe = [0, 1]; D.length + fe.length + 1 < ae; )
      fe.push(255);
    fe.push(0);
    for (var te = -1; ++te < D.length; )
      fe.push(D[te]);
    var ce = T(fe, Q);
    return ce;
  }
  function w(D, N) {
    var W = E[N.curve.join(".")];
    if (!W)
      throw new Error("unknown curve " + N.curve.join("."));
    var z = new q(W), X = z.keyFromPrivate(N.privateKey), Q = X.sign(D);
    return I.from(Q.toDER());
  }
  function u(D, N, W) {
    for (var z = N.params.priv_key, X = N.params.p, Q = N.params.q, ae = N.params.g, fe = new C(0), te, ce = B(D, Q).mod(Q), H = !1, A = R(z, Q, D, W); H === !1; )
      te = $(Q, A, W), fe = O(ae, te, X, Q), H = te.invm(Q).imul(ce.add(z.mul(fe))).mod(Q), H.cmpn(0) === 0 && (H = !1, fe = new C(0));
    return g(fe, H);
  }
  function g(D, N) {
    D = D.toArray(), N = N.toArray(), D[0] & 128 && (D = [0].concat(D)), N[0] & 128 && (N = [0].concat(N));
    var W = D.length + N.length + 4, z = [
      48,
      W,
      2,
      D.length
    ];
    return z = z.concat(D, [2, N.length], N), I.from(z);
  }
  function R(D, N, W, z) {
    if (D = I.from(D.toArray()), D.length < N.byteLength()) {
      var X = I.alloc(N.byteLength() - D.length);
      D = I.concat([X, D]);
    }
    var Q = W.length, ae = k(W, N), fe = I.alloc(Q);
    fe.fill(1);
    var te = I.alloc(Q);
    return te = M(z, te).update(fe).update(I.from([0])).update(D).update(ae).digest(), fe = M(z, te).update(fe).digest(), te = M(z, te).update(fe).update(I.from([1])).update(D).update(ae).digest(), fe = M(z, te).update(fe).digest(), { k: te, v: fe };
  }
  function B(D, N) {
    var W = new C(D), z = (D.length << 3) - N.bitLength();
    return z > 0 && W.ishrn(z), W;
  }
  function k(D, N) {
    D = B(D, N), D = D.mod(N);
    var W = I.from(D.toArray());
    if (W.length < N.byteLength()) {
      var z = I.alloc(N.byteLength() - W.length);
      W = I.concat([z, W]);
    }
    return W;
  }
  function $(D, N, W) {
    var z, X;
    do {
      for (z = I.alloc(0); z.length * 8 < D.bitLength(); )
        N.v = M(W, N.k).update(N.v).digest(), z = I.concat([z, N.v]);
      X = B(z, D), N.k = M(W, N.k).update(N.v).update(I.from([0])).digest(), N.v = M(W, N.k).update(N.v).digest();
    } while (X.cmp(D) !== -1);
    return X;
  }
  function O(D, N, W, z) {
    return D.toRed(C.mont(W)).redPow(N).fromRed().mod(z);
  }
  return sign.exports = b, sign.exports.getKey = R, sign.exports.makeKey = $, sign.exports;
}
var verify_1, hasRequiredVerify;
function requireVerify() {
  if (hasRequiredVerify) return verify_1;
  hasRequiredVerify = 1;
  var I = requireSafeBuffer$1().Buffer, M = requireBn(), T = requireElliptic().ec, q = requireParseAsn1(), C = require$$4;
  function t(w, u, g, R, B) {
    var k = q(g);
    if (k.type === "ec") {
      if (R !== "ecdsa" && R !== "ecdsa/rsa")
        throw new Error("wrong public key type");
      return E(w, u, k);
    } else if (k.type === "dsa") {
      if (R !== "dsa")
        throw new Error("wrong public key type");
      return l(w, u, k);
    }
    if (R !== "rsa" && R !== "ecdsa/rsa")
      throw new Error("wrong public key type");
    u = I.concat([B, u]);
    for (var $ = k.modulus.byteLength(), O = [1], D = 0; u.length + O.length + 2 < $; )
      O.push(255), D += 1;
    O.push(0);
    for (var N = -1; ++N < u.length; )
      O.push(u[N]);
    O = I.from(O);
    var W = M.mont(k.modulus);
    w = new M(w).toRed(W), w = w.redPow(new M(k.publicExponent)), w = I.from(w.fromRed().toArray());
    var z = D < 8 ? 1 : 0;
    for ($ = Math.min(w.length, O.length), w.length !== O.length && (z = 1), N = -1; ++N < $; )
      z |= w[N] ^ O[N];
    return z === 0;
  }
  function E(w, u, g) {
    var R = C[g.data.algorithm.curve.join(".")];
    if (!R)
      throw new Error("unknown curve " + g.data.algorithm.curve.join("."));
    var B = new T(R), k = g.data.subjectPrivateKey.data;
    return B.verify(u, w, k);
  }
  function l(w, u, g) {
    var R = g.data.p, B = g.data.q, k = g.data.g, $ = g.data.pub_key, O = q.signature.decode(w, "der"), D = O.s, N = O.r;
    b(D, B), b(N, B);
    var W = M.mont(R), z = D.invm(B), X = k.toRed(W).redPow(new M(u).mul(z).mod(B)).fromRed().mul($.toRed(W).redPow(N.mul(z).mod(B)).fromRed()).mod(R).mod(B);
    return X.cmp(N) === 0;
  }
  function b(w, u) {
    if (w.cmpn(0) <= 0)
      throw new Error("invalid sig");
    if (w.cmp(u) >= 0)
      throw new Error("invalid sig");
  }
  return verify_1 = t, verify_1;
}
var browser$3, hasRequiredBrowser$3;
function requireBrowser$3() {
  if (hasRequiredBrowser$3) return browser$3;
  hasRequiredBrowser$3 = 1;
  var I = requireSafeBuffer$1().Buffer, M = requireBrowser$9(), T = requireReadableBrowser(), q = requireInherits_browser(), C = requireSign(), t = requireVerify(), E = require$$6;
  Object.keys(E).forEach(function(g) {
    E[g].id = I.from(E[g].id, "hex"), E[g.toLowerCase()] = E[g];
  });
  function l(g) {
    T.Writable.call(this);
    var R = E[g];
    if (!R)
      throw new Error("Unknown message digest");
    this._hashType = R.hash, this._hash = M(R.hash), this._tag = R.id, this._signType = R.sign;
  }
  q(l, T.Writable), l.prototype._write = function(R, B, k) {
    this._hash.update(R), k();
  }, l.prototype.update = function(R, B) {
    return this._hash.update(typeof R == "string" ? I.from(R, B) : R), this;
  }, l.prototype.sign = function(R, B) {
    this.end();
    var k = this._hash.digest(), $ = C(k, R, this._hashType, this._signType, this._tag);
    return B ? $.toString(B) : $;
  };
  function b(g) {
    T.Writable.call(this);
    var R = E[g];
    if (!R)
      throw new Error("Unknown message digest");
    this._hash = M(R.hash), this._tag = R.id, this._signType = R.sign;
  }
  q(b, T.Writable), b.prototype._write = function(R, B, k) {
    this._hash.update(R), k();
  }, b.prototype.update = function(R, B) {
    return this._hash.update(typeof R == "string" ? I.from(R, B) : R), this;
  }, b.prototype.verify = function(R, B, k) {
    var $ = typeof B == "string" ? I.from(B, k) : B;
    this.end();
    var O = this._hash.digest();
    return t($, O, R, this._signType, this._tag);
  };
  function w(g) {
    return new l(g);
  }
  function u(g) {
    return new b(g);
  }
  return browser$3 = {
    Sign: w,
    Verify: u,
    createSign: w,
    createVerify: u
  }, browser$3;
}
var browser$2, hasRequiredBrowser$2;
function requireBrowser$2() {
  if (hasRequiredBrowser$2) return browser$2;
  hasRequiredBrowser$2 = 1;
  var I = requireElliptic(), M = requireBn$2();
  browser$2 = function(E) {
    return new q(E);
  };
  var T = {
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
  T.p224 = T.secp224r1, T.p256 = T.secp256r1 = T.prime256v1, T.p192 = T.secp192r1 = T.prime192v1, T.p384 = T.secp384r1, T.p521 = T.secp521r1;
  function q(t) {
    this.curveType = T[t], this.curveType || (this.curveType = {
      name: t
    }), this.curve = new I.ec(this.curveType.name), this.keys = void 0;
  }
  q.prototype.generateKeys = function(t, E) {
    return this.keys = this.curve.genKeyPair(), this.getPublicKey(t, E);
  }, q.prototype.computeSecret = function(t, E, l) {
    E = E || "utf8", bufferExports.Buffer.isBuffer(t) || (t = new bufferExports.Buffer(t, E));
    var b = this.curve.keyFromPublic(t).getPublic(), w = b.mul(this.keys.getPrivate()).getX();
    return C(w, l, this.curveType.byteLength);
  }, q.prototype.getPublicKey = function(t, E) {
    var l = this.keys.getPublic(E === "compressed", !0);
    return E === "hybrid" && (l[l.length - 1] % 2 ? l[0] = 7 : l[0] = 6), C(l, t);
  }, q.prototype.getPrivateKey = function(t) {
    return C(this.keys.getPrivate(), t);
  }, q.prototype.setPublicKey = function(t, E) {
    return E = E || "utf8", bufferExports.Buffer.isBuffer(t) || (t = new bufferExports.Buffer(t, E)), this.keys._importPublic(t), this;
  }, q.prototype.setPrivateKey = function(t, E) {
    E = E || "utf8", bufferExports.Buffer.isBuffer(t) || (t = new bufferExports.Buffer(t, E));
    var l = new M(t);
    return l = l.toString(16), this.keys = this.curve.genKeyPair(), this.keys._importPrivate(l), this;
  };
  function C(t, E, l) {
    Array.isArray(t) || (t = t.toArray());
    var b = new bufferExports.Buffer(t);
    if (l && b.length < l) {
      var w = new bufferExports.Buffer(l - b.length);
      w.fill(0), b = bufferExports.Buffer.concat([w, b]);
    }
    return E ? b.toString(E) : b;
  }
  return browser$2;
}
var browser$1 = {}, mgf, hasRequiredMgf;
function requireMgf() {
  if (hasRequiredMgf) return mgf;
  hasRequiredMgf = 1;
  var I = requireBrowser$9(), M = requireSafeBuffer$1().Buffer;
  mgf = function(q, C) {
    for (var t = M.alloc(0), E = 0, l; t.length < C; )
      l = T(E++), t = M.concat([t, I("sha1").update(q).update(l).digest()]);
    return t.slice(0, C);
  };
  function T(q) {
    var C = M.allocUnsafe(4);
    return C.writeUInt32BE(q, 0), C;
  }
  return mgf;
}
var xor, hasRequiredXor;
function requireXor() {
  return hasRequiredXor || (hasRequiredXor = 1, xor = function(M, T) {
    for (var q = M.length, C = -1; ++C < q; )
      M[C] ^= T[C];
    return M;
  }), xor;
}
var withPublic_1, hasRequiredWithPublic;
function requireWithPublic() {
  if (hasRequiredWithPublic) return withPublic_1;
  hasRequiredWithPublic = 1;
  var I = requireBn$2(), M = requireSafeBuffer$1().Buffer;
  function T(q, C) {
    return M.from(q.toRed(I.mont(C.modulus)).redPow(new I(C.publicExponent)).fromRed().toArray());
  }
  return withPublic_1 = T, withPublic_1;
}
var publicEncrypt, hasRequiredPublicEncrypt;
function requirePublicEncrypt() {
  if (hasRequiredPublicEncrypt) return publicEncrypt;
  hasRequiredPublicEncrypt = 1;
  var I = requireParseAsn1(), M = requireBrowser$b(), T = requireBrowser$9(), q = requireMgf(), C = requireXor(), t = requireBn$2(), E = requireWithPublic(), l = requireBrowserifyRsa(), b = requireSafeBuffer$1().Buffer;
  publicEncrypt = function(B, k, $) {
    var O;
    B.padding ? O = B.padding : $ ? O = 1 : O = 4;
    var D = I(B), N;
    if (O === 4)
      N = w(D, k);
    else if (O === 1)
      N = u(D, k, $);
    else if (O === 3) {
      if (N = new t(k), N.cmp(D.modulus) >= 0)
        throw new Error("data too long for modulus");
    } else
      throw new Error("unknown padding");
    return $ ? l(N, D) : E(N, D);
  };
  function w(R, B) {
    var k = R.modulus.byteLength(), $ = B.length, O = T("sha1").update(b.alloc(0)).digest(), D = O.length, N = 2 * D;
    if ($ > k - N - 2)
      throw new Error("message too long");
    var W = b.alloc(k - $ - N - 2), z = k - D - 1, X = M(D), Q = C(b.concat([O, W, b.alloc(1, 1), B], z), q(X, z)), ae = C(X, q(Q, D));
    return new t(b.concat([b.alloc(1), ae, Q], k));
  }
  function u(R, B, k) {
    var $ = B.length, O = R.modulus.byteLength();
    if ($ > O - 11)
      throw new Error("message too long");
    var D;
    return k ? D = b.alloc(O - $ - 3, 255) : D = g(O - $ - 3), new t(b.concat([b.from([0, k ? 1 : 2]), D, b.alloc(1), B], O));
  }
  function g(R) {
    for (var B = b.allocUnsafe(R), k = 0, $ = M(R * 2), O = 0, D; k < R; )
      O === $.length && ($ = M(R * 2), O = 0), D = $[O++], D && (B[k++] = D);
    return B;
  }
  return publicEncrypt;
}
var privateDecrypt, hasRequiredPrivateDecrypt;
function requirePrivateDecrypt() {
  if (hasRequiredPrivateDecrypt) return privateDecrypt;
  hasRequiredPrivateDecrypt = 1;
  var I = requireParseAsn1(), M = requireMgf(), T = requireXor(), q = requireBn$2(), C = requireBrowserifyRsa(), t = requireBrowser$9(), E = requireWithPublic(), l = requireSafeBuffer$1().Buffer;
  privateDecrypt = function(R, B, k) {
    var $;
    R.padding ? $ = R.padding : k ? $ = 1 : $ = 4;
    var O = I(R), D = O.modulus.byteLength();
    if (B.length > D || new q(B).cmp(O.modulus) >= 0)
      throw new Error("decryption error");
    var N;
    k ? N = E(new q(B), O) : N = C(B, O);
    var W = l.alloc(D - N.length);
    if (N = l.concat([W, N], D), $ === 4)
      return b(O, N);
    if ($ === 1)
      return w(O, N, k);
    if ($ === 3)
      return N;
    throw new Error("unknown padding");
  };
  function b(g, R) {
    var B = g.modulus.byteLength(), k = t("sha1").update(l.alloc(0)).digest(), $ = k.length;
    if (R[0] !== 0)
      throw new Error("decryption error");
    var O = R.slice(1, $ + 1), D = R.slice($ + 1), N = T(O, M(D, $)), W = T(D, M(N, B - $ - 1));
    if (u(k, W.slice(0, $)))
      throw new Error("decryption error");
    for (var z = $; W[z] === 0; )
      z++;
    if (W[z++] !== 1)
      throw new Error("decryption error");
    return W.slice(z);
  }
  function w(g, R, B) {
    for (var k = R.slice(0, 2), $ = 2, O = 0; R[$++] !== 0; )
      if ($ >= R.length) {
        O++;
        break;
      }
    var D = R.slice(2, $ - 1);
    if ((k.toString("hex") !== "0002" && !B || k.toString("hex") !== "0001" && B) && O++, D.length < 8 && O++, O)
      throw new Error("decryption error");
    return R.slice($);
  }
  function u(g, R) {
    g = l.from(g), R = l.from(R);
    var B = 0, k = g.length;
    g.length !== R.length && (B++, k = Math.min(g.length, R.length));
    for (var $ = -1; ++$ < k; )
      B += g[$] ^ R[$];
    return B;
  }
  return privateDecrypt;
}
var hasRequiredBrowser$1;
function requireBrowser$1() {
  return hasRequiredBrowser$1 || (hasRequiredBrowser$1 = 1, function(I) {
    I.publicEncrypt = requirePublicEncrypt(), I.privateDecrypt = requirePrivateDecrypt(), I.privateEncrypt = function(T, q) {
      return I.publicEncrypt(T, q, !0);
    }, I.publicDecrypt = function(T, q) {
      return I.privateDecrypt(T, q, !0);
    };
  }(browser$1)), browser$1;
}
var browser = {}, hasRequiredBrowser;
function requireBrowser() {
  if (hasRequiredBrowser) return browser;
  hasRequiredBrowser = 1;
  function I() {
    throw new Error(`secure random number generation not supported by this browser
use chrome, FireFox or Internet Explorer 11`);
  }
  var M = requireSafeBuffer$1(), T = requireBrowser$b(), q = M.Buffer, C = M.kMaxLength, t = commonjsGlobal.crypto || commonjsGlobal.msCrypto, E = Math.pow(2, 32) - 1;
  function l(R, B) {
    if (typeof R != "number" || R !== R)
      throw new TypeError("offset must be a number");
    if (R > E || R < 0)
      throw new TypeError("offset must be a uint32");
    if (R > C || R > B)
      throw new RangeError("offset out of range");
  }
  function b(R, B, k) {
    if (typeof R != "number" || R !== R)
      throw new TypeError("size must be a number");
    if (R > E || R < 0)
      throw new TypeError("size must be a uint32");
    if (R + B > k || R > C)
      throw new RangeError("buffer too small");
  }
  t && t.getRandomValues || !process$1.browser ? (browser.randomFill = w, browser.randomFillSync = g) : (browser.randomFill = I, browser.randomFillSync = I);
  function w(R, B, k, $) {
    if (!q.isBuffer(R) && !(R instanceof commonjsGlobal.Uint8Array))
      throw new TypeError('"buf" argument must be a Buffer or Uint8Array');
    if (typeof B == "function")
      $ = B, B = 0, k = R.length;
    else if (typeof k == "function")
      $ = k, k = R.length - B;
    else if (typeof $ != "function")
      throw new TypeError('"cb" argument must be a function');
    return l(B, R.length), b(k, B, R.length), u(R, B, k, $);
  }
  function u(R, B, k, $) {
    if (process$1.browser) {
      var O = R.buffer, D = new Uint8Array(O, B, k);
      if (t.getRandomValues(D), $) {
        process$1.nextTick(function() {
          $(null, R);
        });
        return;
      }
      return R;
    }
    if ($) {
      T(k, function(W, z) {
        if (W)
          return $(W);
        z.copy(R, B), $(null, R);
      });
      return;
    }
    var N = T(k);
    return N.copy(R, B), R;
  }
  function g(R, B, k) {
    if (typeof B == "undefined" && (B = 0), !q.isBuffer(R) && !(R instanceof commonjsGlobal.Uint8Array))
      throw new TypeError('"buf" argument must be a Buffer or Uint8Array');
    return l(B, R.length), k === void 0 && (k = R.length - B), b(k, B, R.length), u(R, B, k);
  }
  return browser;
}
var hasRequiredCryptoBrowserify;
function requireCryptoBrowserify() {
  if (hasRequiredCryptoBrowserify) return cryptoBrowserify;
  hasRequiredCryptoBrowserify = 1, cryptoBrowserify.randomBytes = cryptoBrowserify.rng = cryptoBrowserify.pseudoRandomBytes = cryptoBrowserify.prng = requireBrowser$b(), cryptoBrowserify.createHash = cryptoBrowserify.Hash = requireBrowser$9(), cryptoBrowserify.createHmac = cryptoBrowserify.Hmac = requireBrowser$8();
  var I = requireAlgos(), M = Object.keys(I), T = ["sha1", "sha224", "sha256", "sha384", "sha512", "md5", "rmd160"].concat(M);
  cryptoBrowserify.getHashes = function() {
    return T;
  };
  var q = requireBrowser$7();
  cryptoBrowserify.pbkdf2 = q.pbkdf2, cryptoBrowserify.pbkdf2Sync = q.pbkdf2Sync;
  var C = requireBrowser$5();
  cryptoBrowserify.Cipher = C.Cipher, cryptoBrowserify.createCipher = C.createCipher, cryptoBrowserify.Cipheriv = C.Cipheriv, cryptoBrowserify.createCipheriv = C.createCipheriv, cryptoBrowserify.Decipher = C.Decipher, cryptoBrowserify.createDecipher = C.createDecipher, cryptoBrowserify.Decipheriv = C.Decipheriv, cryptoBrowserify.createDecipheriv = C.createDecipheriv, cryptoBrowserify.getCiphers = C.getCiphers, cryptoBrowserify.listCiphers = C.listCiphers;
  var t = requireBrowser$4();
  cryptoBrowserify.DiffieHellmanGroup = t.DiffieHellmanGroup, cryptoBrowserify.createDiffieHellmanGroup = t.createDiffieHellmanGroup, cryptoBrowserify.getDiffieHellman = t.getDiffieHellman, cryptoBrowserify.createDiffieHellman = t.createDiffieHellman, cryptoBrowserify.DiffieHellman = t.DiffieHellman;
  var E = requireBrowser$3();
  cryptoBrowserify.createSign = E.createSign, cryptoBrowserify.Sign = E.Sign, cryptoBrowserify.createVerify = E.createVerify, cryptoBrowserify.Verify = E.Verify, cryptoBrowserify.createECDH = requireBrowser$2();
  var l = requireBrowser$1();
  cryptoBrowserify.publicEncrypt = l.publicEncrypt, cryptoBrowserify.privateEncrypt = l.privateEncrypt, cryptoBrowserify.publicDecrypt = l.publicDecrypt, cryptoBrowserify.privateDecrypt = l.privateDecrypt;
  var b = requireBrowser();
  return cryptoBrowserify.randomFill = b.randomFill, cryptoBrowserify.randomFillSync = b.randomFillSync, cryptoBrowserify.createCredentials = function() {
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
(function(I) {
  /**
   * @license bcrypt.js (c) 2013 Daniel Wirtz <dcode@dcode.io>
   * Released under the Apache License, Version 2.0
   * see: https://github.com/dcodeIO/bcrypt.js for details
   */
  (function(M, T) {
    typeof commonjsRequire == "function" && I && I.exports ? I.exports = T() : (M.dcodeIO = M.dcodeIO || {}).bcrypt = T();
  })(commonjsGlobal, function() {
    var M = {}, T = null;
    function q(H) {
      if (I && I.exports)
        try {
          return requireCryptoBrowserify().randomBytes(H);
        } catch (c) {
        }
      try {
        var A;
        return (self.crypto || self.msCrypto).getRandomValues(A = new Uint32Array(H)), Array.prototype.slice.call(A);
      } catch (c) {
      }
      if (!T)
        throw Error("Neither WebCryptoAPI nor a crypto module is available. Use bcrypt.setRandomFallback to set an alternative");
      return T(H);
    }
    var C = !1;
    try {
      q(1), C = !0;
    } catch (H) {
    }
    T = null, M.setRandomFallback = function(H) {
      T = H;
    }, M.genSaltSync = function(H, A) {
      if (H = H || $, typeof H != "number")
        throw Error("Illegal arguments: " + typeof H + ", " + typeof A);
      H < 4 ? H = 4 : H > 31 && (H = 31);
      var c = [];
      return c.push("$2a$"), H < 10 && c.push("0"), c.push(H.toString()), c.push("$"), c.push(g(q(k), k)), c.join("");
    }, M.genSalt = function(H, A, c) {
      if (typeof A == "function" && (c = A, A = void 0), typeof H == "function" && (c = H, H = void 0), typeof H == "undefined")
        H = $;
      else if (typeof H != "number")
        throw Error("illegal arguments: " + typeof H);
      function e(a) {
        E(function() {
          try {
            a(null, M.genSaltSync(H));
          } catch (v) {
            a(v);
          }
        });
      }
      if (c) {
        if (typeof c != "function")
          throw Error("Illegal callback: " + typeof c);
        e(c);
      } else
        return new Promise(function(a, v) {
          e(function(x, d) {
            if (x) {
              v(x);
              return;
            }
            a(d);
          });
        });
    }, M.hashSync = function(H, A) {
      if (typeof A == "undefined" && (A = $), typeof A == "number" && (A = M.genSaltSync(A)), typeof H != "string" || typeof A != "string")
        throw Error("Illegal arguments: " + typeof H + ", " + typeof A);
      return ce(H, A);
    }, M.hash = function(H, A, c, e) {
      function a(v) {
        typeof H == "string" && typeof A == "number" ? M.genSalt(A, function(x, d) {
          ce(H, d, v, e);
        }) : typeof H == "string" && typeof A == "string" ? ce(H, A, v, e) : E(v.bind(this, Error("Illegal arguments: " + typeof H + ", " + typeof A)));
      }
      if (c) {
        if (typeof c != "function")
          throw Error("Illegal callback: " + typeof c);
        a(c);
      } else
        return new Promise(function(v, x) {
          a(function(d, y) {
            if (d) {
              x(d);
              return;
            }
            v(y);
          });
        });
    };
    function t(H, A) {
      for (var c = 0, e = 0, a = 0, v = H.length; a < v; ++a)
        H.charCodeAt(a) === A.charCodeAt(a) ? ++c : ++e;
      return c < 0 ? !1 : e === 0;
    }
    M.compareSync = function(H, A) {
      if (typeof H != "string" || typeof A != "string")
        throw Error("Illegal arguments: " + typeof H + ", " + typeof A);
      return A.length !== 60 ? !1 : t(M.hashSync(H, A.substr(0, A.length - 31)), A);
    }, M.compare = function(H, A, c, e) {
      function a(v) {
        if (typeof H != "string" || typeof A != "string") {
          E(v.bind(this, Error("Illegal arguments: " + typeof H + ", " + typeof A)));
          return;
        }
        if (A.length !== 60) {
          E(v.bind(this, null, !1));
          return;
        }
        M.hash(H, A.substr(0, 29), function(x, d) {
          x ? v(x) : v(null, t(d, A));
        }, e);
      }
      if (c) {
        if (typeof c != "function")
          throw Error("Illegal callback: " + typeof c);
        a(c);
      } else
        return new Promise(function(v, x) {
          a(function(d, y) {
            if (d) {
              x(d);
              return;
            }
            v(y);
          });
        });
    }, M.getRounds = function(H) {
      if (typeof H != "string")
        throw Error("Illegal arguments: " + typeof H);
      return parseInt(H.split("$")[2], 10);
    }, M.getSalt = function(H) {
      if (typeof H != "string")
        throw Error("Illegal arguments: " + typeof H);
      if (H.length !== 60)
        throw Error("Illegal hash length: " + H.length + " != 60");
      return H.substring(0, 29);
    };
    var E = typeof process$1 != "undefined" && process$1 && typeof process$1.nextTick == "function" ? typeof setImmediate == "function" ? setImmediate : process$1.nextTick : setTimeout;
    function l(H) {
      var A = [], c = 0;
      return B.encodeUTF16toUTF8(function() {
        return c >= H.length ? null : H.charCodeAt(c++);
      }, function(e) {
        A.push(e);
      }), A;
    }
    var b = "./ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split(""), w = [
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
    ], u = String.fromCharCode;
    function g(H, A) {
      var c = 0, e = [], a, v;
      if (A <= 0 || A > H.length)
        throw Error("Illegal len: " + A);
      for (; c < A; ) {
        if (a = H[c++] & 255, e.push(b[a >> 2 & 63]), a = (a & 3) << 4, c >= A) {
          e.push(b[a & 63]);
          break;
        }
        if (v = H[c++] & 255, a |= v >> 4 & 15, e.push(b[a & 63]), a = (v & 15) << 2, c >= A) {
          e.push(b[a & 63]);
          break;
        }
        v = H[c++] & 255, a |= v >> 6 & 3, e.push(b[a & 63]), e.push(b[v & 63]);
      }
      return e.join("");
    }
    function R(H, A) {
      var c = 0, e = H.length, a = 0, v = [], x, d, y, p, _, o;
      if (A <= 0)
        throw Error("Illegal len: " + A);
      for (; c < e - 1 && a < A && (o = H.charCodeAt(c++), x = o < w.length ? w[o] : -1, o = H.charCodeAt(c++), d = o < w.length ? w[o] : -1, !(x == -1 || d == -1 || (_ = x << 2 >>> 0, _ |= (d & 48) >> 4, v.push(u(_)), ++a >= A || c >= e) || (o = H.charCodeAt(c++), y = o < w.length ? w[o] : -1, y == -1) || (_ = (d & 15) << 4 >>> 0, _ |= (y & 60) >> 2, v.push(u(_)), ++a >= A || c >= e))); )
        o = H.charCodeAt(c++), p = o < w.length ? w[o] : -1, _ = (y & 3) << 6 >>> 0, _ |= p, v.push(u(_)), ++a;
      var P = [];
      for (c = 0; c < a; c++)
        P.push(v[c].charCodeAt(0));
      return P;
    }
    var B = function() {
      var H = {};
      return H.MAX_CODEPOINT = 1114111, H.encodeUTF8 = function(A, c) {
        var e = null;
        for (typeof A == "number" && (e = A, A = function() {
          return null;
        }); e !== null || (e = A()) !== null; )
          e < 128 ? c(e & 127) : e < 2048 ? (c(e >> 6 & 31 | 192), c(e & 63 | 128)) : e < 65536 ? (c(e >> 12 & 15 | 224), c(e >> 6 & 63 | 128), c(e & 63 | 128)) : (c(e >> 18 & 7 | 240), c(e >> 12 & 63 | 128), c(e >> 6 & 63 | 128), c(e & 63 | 128)), e = null;
      }, H.decodeUTF8 = function(A, c) {
        for (var e, a, v, x, d = function(y) {
          y = y.slice(0, y.indexOf(null));
          var p = Error(y.toString());
          throw p.name = "TruncatedError", p.bytes = y, p;
        }; (e = A()) !== null; )
          if (!(e & 128))
            c(e);
          else if ((e & 224) === 192)
            (a = A()) === null && d([e, a]), c((e & 31) << 6 | a & 63);
          else if ((e & 240) === 224)
            ((a = A()) === null || (v = A()) === null) && d([e, a, v]), c((e & 15) << 12 | (a & 63) << 6 | v & 63);
          else if ((e & 248) === 240)
            ((a = A()) === null || (v = A()) === null || (x = A()) === null) && d([e, a, v, x]), c((e & 7) << 18 | (a & 63) << 12 | (v & 63) << 6 | x & 63);
          else throw RangeError("Illegal starting byte: " + e);
      }, H.UTF16toUTF8 = function(A, c) {
        for (var e, a = null; (e = a !== null ? a : A()) !== null; ) {
          if (e >= 55296 && e <= 57343 && (a = A()) !== null && a >= 56320 && a <= 57343) {
            c((e - 55296) * 1024 + a - 56320 + 65536), a = null;
            continue;
          }
          c(e);
        }
        a !== null && c(a);
      }, H.UTF8toUTF16 = function(A, c) {
        var e = null;
        for (typeof A == "number" && (e = A, A = function() {
          return null;
        }); e !== null || (e = A()) !== null; )
          e <= 65535 ? c(e) : (e -= 65536, c((e >> 10) + 55296), c(e % 1024 + 56320)), e = null;
      }, H.encodeUTF16toUTF8 = function(A, c) {
        H.UTF16toUTF8(A, function(e) {
          H.encodeUTF8(e, c);
        });
      }, H.decodeUTF8toUTF16 = function(A, c) {
        H.decodeUTF8(A, function(e) {
          H.UTF8toUTF16(e, c);
        });
      }, H.calculateCodePoint = function(A) {
        return A < 128 ? 1 : A < 2048 ? 2 : A < 65536 ? 3 : 4;
      }, H.calculateUTF8 = function(A) {
        for (var c, e = 0; (c = A()) !== null; )
          e += H.calculateCodePoint(c);
        return e;
      }, H.calculateUTF16asUTF8 = function(A) {
        var c = 0, e = 0;
        return H.UTF16toUTF8(A, function(a) {
          ++c, e += H.calculateCodePoint(a);
        }), [c, e];
      }, H;
    }();
    Date.now = Date.now || function() {
      return +/* @__PURE__ */ new Date();
    };
    var k = 16, $ = 10, O = 16, D = 100, N = [
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
    ], W = [
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
    ], z = [
      1332899944,
      1700884034,
      1701343084,
      1684370003,
      1668446532,
      1869963892
    ];
    function X(H, A, c, e) {
      var a, v = H[A], x = H[A + 1];
      return v ^= c[0], a = e[v >>> 24], a += e[256 | v >> 16 & 255], a ^= e[512 | v >> 8 & 255], a += e[768 | v & 255], x ^= a ^ c[1], a = e[x >>> 24], a += e[256 | x >> 16 & 255], a ^= e[512 | x >> 8 & 255], a += e[768 | x & 255], v ^= a ^ c[2], a = e[v >>> 24], a += e[256 | v >> 16 & 255], a ^= e[512 | v >> 8 & 255], a += e[768 | v & 255], x ^= a ^ c[3], a = e[x >>> 24], a += e[256 | x >> 16 & 255], a ^= e[512 | x >> 8 & 255], a += e[768 | x & 255], v ^= a ^ c[4], a = e[v >>> 24], a += e[256 | v >> 16 & 255], a ^= e[512 | v >> 8 & 255], a += e[768 | v & 255], x ^= a ^ c[5], a = e[x >>> 24], a += e[256 | x >> 16 & 255], a ^= e[512 | x >> 8 & 255], a += e[768 | x & 255], v ^= a ^ c[6], a = e[v >>> 24], a += e[256 | v >> 16 & 255], a ^= e[512 | v >> 8 & 255], a += e[768 | v & 255], x ^= a ^ c[7], a = e[x >>> 24], a += e[256 | x >> 16 & 255], a ^= e[512 | x >> 8 & 255], a += e[768 | x & 255], v ^= a ^ c[8], a = e[v >>> 24], a += e[256 | v >> 16 & 255], a ^= e[512 | v >> 8 & 255], a += e[768 | v & 255], x ^= a ^ c[9], a = e[x >>> 24], a += e[256 | x >> 16 & 255], a ^= e[512 | x >> 8 & 255], a += e[768 | x & 255], v ^= a ^ c[10], a = e[v >>> 24], a += e[256 | v >> 16 & 255], a ^= e[512 | v >> 8 & 255], a += e[768 | v & 255], x ^= a ^ c[11], a = e[x >>> 24], a += e[256 | x >> 16 & 255], a ^= e[512 | x >> 8 & 255], a += e[768 | x & 255], v ^= a ^ c[12], a = e[v >>> 24], a += e[256 | v >> 16 & 255], a ^= e[512 | v >> 8 & 255], a += e[768 | v & 255], x ^= a ^ c[13], a = e[x >>> 24], a += e[256 | x >> 16 & 255], a ^= e[512 | x >> 8 & 255], a += e[768 | x & 255], v ^= a ^ c[14], a = e[v >>> 24], a += e[256 | v >> 16 & 255], a ^= e[512 | v >> 8 & 255], a += e[768 | v & 255], x ^= a ^ c[15], a = e[x >>> 24], a += e[256 | x >> 16 & 255], a ^= e[512 | x >> 8 & 255], a += e[768 | x & 255], v ^= a ^ c[16], H[A] = x ^ c[O + 1], H[A + 1] = v, H;
    }
    function Q(H, A) {
      for (var c = 0, e = 0; c < 4; ++c)
        e = e << 8 | H[A] & 255, A = (A + 1) % H.length;
      return { key: e, offp: A };
    }
    function ae(H, A, c) {
      for (var e = 0, a = [0, 0], v = A.length, x = c.length, d, y = 0; y < v; y++)
        d = Q(H, e), e = d.offp, A[y] = A[y] ^ d.key;
      for (y = 0; y < v; y += 2)
        a = X(a, 0, A, c), A[y] = a[0], A[y + 1] = a[1];
      for (y = 0; y < x; y += 2)
        a = X(a, 0, A, c), c[y] = a[0], c[y + 1] = a[1];
    }
    function fe(H, A, c, e) {
      for (var a = 0, v = [0, 0], x = c.length, d = e.length, y, p = 0; p < x; p++)
        y = Q(A, a), a = y.offp, c[p] = c[p] ^ y.key;
      for (a = 0, p = 0; p < x; p += 2)
        y = Q(H, a), a = y.offp, v[0] ^= y.key, y = Q(H, a), a = y.offp, v[1] ^= y.key, v = X(v, 0, c, e), c[p] = v[0], c[p + 1] = v[1];
      for (p = 0; p < d; p += 2)
        y = Q(H, a), a = y.offp, v[0] ^= y.key, y = Q(H, a), a = y.offp, v[1] ^= y.key, v = X(v, 0, c, e), e[p] = v[0], e[p + 1] = v[1];
    }
    function te(H, A, c, e, a) {
      var v = z.slice(), x = v.length, d;
      if (c < 4 || c > 31)
        if (d = Error("Illegal number of rounds (4-31): " + c), e) {
          E(e.bind(this, d));
          return;
        } else
          throw d;
      if (A.length !== k)
        if (d = Error("Illegal salt length: " + A.length + " != " + k), e) {
          E(e.bind(this, d));
          return;
        } else
          throw d;
      c = 1 << c >>> 0;
      var y, p, _ = 0, o;
      Int32Array ? (y = new Int32Array(N), p = new Int32Array(W)) : (y = N.slice(), p = W.slice()), fe(A, H, y, p);
      function P() {
        if (a && a(_ / c), _ < c)
          for (var ee = Date.now(); _ < c && (_ = _ + 1, ae(H, y, p), ae(A, y, p), !(Date.now() - ee > D)); )
            ;
        else {
          for (_ = 0; _ < 64; _++)
            for (o = 0; o < x >> 1; o++)
              X(v, o << 1, y, p);
          var K = [];
          for (_ = 0; _ < x; _++)
            K.push((v[_] >> 24 & 255) >>> 0), K.push((v[_] >> 16 & 255) >>> 0), K.push((v[_] >> 8 & 255) >>> 0), K.push((v[_] & 255) >>> 0);
          if (e) {
            e(null, K);
            return;
          } else
            return K;
        }
        e && E(P);
      }
      if (typeof e != "undefined")
        P();
      else
        for (var Z; ; )
          if (typeof (Z = P()) != "undefined")
            return Z || [];
    }
    function ce(H, A, c, e) {
      var a;
      if (typeof H != "string" || typeof A != "string")
        if (a = Error("Invalid string / salt: Not a string"), c) {
          E(c.bind(this, a));
          return;
        } else
          throw a;
      var v, x;
      if (A.charAt(0) !== "$" || A.charAt(1) !== "2")
        if (a = Error("Invalid salt version: " + A.substring(0, 2)), c) {
          E(c.bind(this, a));
          return;
        } else
          throw a;
      if (A.charAt(2) === "$")
        v = "\0", x = 3;
      else {
        if (v = A.charAt(2), v !== "a" && v !== "b" && v !== "y" || A.charAt(3) !== "$")
          if (a = Error("Invalid salt revision: " + A.substring(2, 4)), c) {
            E(c.bind(this, a));
            return;
          } else
            throw a;
        x = 4;
      }
      if (A.charAt(x + 2) > "$")
        if (a = Error("Missing salt rounds"), c) {
          E(c.bind(this, a));
          return;
        } else
          throw a;
      var d = parseInt(A.substring(x, x + 1), 10) * 10, y = parseInt(A.substring(x + 1, x + 2), 10), p = d + y, _ = A.substring(x + 3, x + 25);
      H += v >= "a" ? "\0" : "";
      var o = l(H), P = R(_, k);
      function Z(ee) {
        var K = [];
        return K.push("$2"), v >= "a" && K.push(v), K.push("$"), p < 10 && K.push("0"), K.push(p.toString()), K.push("$"), K.push(g(P, P.length)), K.push(g(ee, z.length * 4 - 1)), K.join("");
      }
      if (typeof c == "undefined")
        return Z(te(o, P, p));
      te(o, P, p, function(ee, K) {
        ee ? c(ee, null) : c(null, Z(K));
      }, e);
    }
    return M.encodeBase64 = g, M.decodeBase64 = R, M;
  });
})(bcrypt$1);
var bcryptExports = bcrypt$1.exports;
const bcrypt = /* @__PURE__ */ getDefaultExportFromCjs(bcryptExports);
var eventemitter2 = { exports: {} };
(function(I, M) {
  (function(T) {
    var q = Object.hasOwnProperty, C = Array.isArray ? Array.isArray : function(y) {
      return Object.prototype.toString.call(y) === "[object Array]";
    }, t = 10, E = typeof process$1 == "object" && typeof process$1.nextTick == "function", l = typeof Symbol == "function", b = typeof Reflect == "object", w = typeof setImmediate == "function", u = w ? setImmediate : setTimeout, g = l ? b && typeof Reflect.ownKeys == "function" ? Reflect.ownKeys : function(d) {
      var y = Object.getOwnPropertyNames(d);
      return y.push.apply(y, Object.getOwnPropertySymbols(d)), y;
    } : Object.keys;
    function R() {
      this._events = {}, this._conf && B.call(this, this._conf);
    }
    function B(d) {
      d && (this._conf = d, d.delimiter && (this.delimiter = d.delimiter), d.maxListeners !== T && (this._maxListeners = d.maxListeners), d.wildcard && (this.wildcard = d.wildcard), d.newListener && (this._newListener = d.newListener), d.removeListener && (this._removeListener = d.removeListener), d.verboseMemoryLeak && (this.verboseMemoryLeak = d.verboseMemoryLeak), d.ignoreErrors && (this.ignoreErrors = d.ignoreErrors), this.wildcard && (this.listenerTree = {}));
    }
    function k(d, y) {
      var p = "(node) warning: possible EventEmitter memory leak detected. " + d + " listeners added. Use emitter.setMaxListeners() to increase limit.";
      if (this.verboseMemoryLeak && (p += " Event name: " + y + "."), typeof process$1 != "undefined" && process$1.emitWarning) {
        var _ = new Error(p);
        _.name = "MaxListenersExceededWarning", _.emitter = this, _.count = d, process$1.emitWarning(_);
      } else
        console.error(p), console.trace && console.trace();
    }
    var $ = function(d, y, p) {
      var _ = arguments.length;
      switch (_) {
        case 0:
          return [];
        case 1:
          return [d];
        case 2:
          return [d, y];
        case 3:
          return [d, y, p];
        default:
          for (var o = new Array(_); _--; )
            o[_] = arguments[_];
          return o;
      }
    };
    function O(d, y) {
      for (var p = {}, _, o = d.length, P = 0, Z = 0; Z < o; Z++)
        _ = d[Z], p[_] = Z < P ? y[Z] : T;
      return p;
    }
    function D(d, y, p) {
      this._emitter = d, this._target = y, this._listeners = {}, this._listenersCount = 0;
      var _, o;
      if ((p.on || p.off) && (_ = p.on, o = p.off), y.addEventListener ? (_ = y.addEventListener, o = y.removeEventListener) : y.addListener ? (_ = y.addListener, o = y.removeListener) : y.on && (_ = y.on, o = y.off), !_ && !o)
        throw Error("target does not implement any known event API");
      if (typeof _ != "function")
        throw TypeError("on method must be a function");
      if (typeof o != "function")
        throw TypeError("off method must be a function");
      this._on = _, this._off = o;
      var P = d._observers;
      P ? P.push(this) : d._observers = [this];
    }
    Object.assign(D.prototype, {
      subscribe: function(d, y, p) {
        var _ = this, o = this._target, P = this._emitter, Z = this._listeners, ee = function() {
          var K = $.apply(null, arguments), L = {
            data: K,
            name: y,
            original: d
          };
          if (p) {
            var j = p.call(o, L);
            j !== !1 && P.emit.apply(P, [L.name].concat(K));
            return;
          }
          P.emit.apply(P, [y].concat(K));
        };
        if (Z[d])
          throw Error("Event '" + d + "' is already listening");
        this._listenersCount++, P._newListener && P._removeListener && !_._onNewListener ? (this._onNewListener = function(K) {
          K === y && Z[d] === null && (Z[d] = ee, _._on.call(o, d, ee));
        }, P.on("newListener", this._onNewListener), this._onRemoveListener = function(K) {
          K === y && !P.hasListeners(K) && Z[d] && (Z[d] = null, _._off.call(o, d, ee));
        }, Z[d] = null, P.on("removeListener", this._onRemoveListener)) : (Z[d] = ee, _._on.call(o, d, ee));
      },
      unsubscribe: function(d) {
        var y = this, p = this._listeners, _ = this._emitter, o, P, Z = this._off, ee = this._target, K;
        if (d && typeof d != "string")
          throw TypeError("event must be a string");
        function L() {
          y._onNewListener && (_.off("newListener", y._onNewListener), _.off("removeListener", y._onRemoveListener), y._onNewListener = null, y._onRemoveListener = null);
          var j = fe.call(_, y);
          _._observers.splice(j, 1);
        }
        if (d) {
          if (o = p[d], !o) return;
          Z.call(ee, d, o), delete p[d], --this._listenersCount || L();
        } else {
          for (P = g(p), K = P.length; K-- > 0; )
            d = P[K], Z.call(ee, d, p[d]);
          this._listeners = {}, this._listenersCount = 0, L();
        }
      }
    });
    function N(d, y, p, _) {
      var o = Object.assign({}, y);
      if (!d) return o;
      if (typeof d != "object")
        throw TypeError("options must be an object");
      var P = Object.keys(d), Z = P.length, ee, K, L;
      function j(ne) {
        throw Error('Invalid "' + ee + '" option value' + (ne ? ". Reason: " + ne : ""));
      }
      for (var re = 0; re < Z; re++) {
        if (ee = P[re], !q.call(y, ee))
          throw Error('Unknown "' + ee + '" option');
        K = d[ee], K !== T && (L = p[ee], o[ee] = L ? L(K, j) : K);
      }
      return o;
    }
    function W(d, y) {
      return (typeof d != "function" || !d.hasOwnProperty("prototype")) && y("value must be a constructor"), d;
    }
    function z(d) {
      var y = "value must be type of " + d.join("|"), p = d.length, _ = d[0], o = d[1];
      return p === 1 ? function(P, Z) {
        if (typeof P === _)
          return P;
        Z(y);
      } : p === 2 ? function(P, Z) {
        var ee = typeof P;
        if (ee === _ || ee === o) return P;
        Z(y);
      } : function(P, Z) {
        for (var ee = typeof P, K = p; K-- > 0; )
          if (ee === d[K]) return P;
        Z(y);
      };
    }
    var X = z(["function"]), Q = z(["object", "function"]);
    function ae(d, y, p) {
      var _, o, P = 0, Z, ee = new d(function(K, L, j) {
        p = N(p, {
          timeout: 0,
          overload: !1
        }, {
          timeout: function(G, se) {
            return G *= 1, (typeof G != "number" || G < 0 || !Number.isFinite(G)) && se("timeout must be a positive number"), G;
          }
        }), _ = !p.overload && typeof d.prototype.cancel == "function" && typeof j == "function";
        function re() {
          o && (o = null), P && (clearTimeout(P), P = 0);
        }
        var ne = function(G) {
          re(), K(G);
        }, J = function(G) {
          re(), L(G);
        };
        _ ? y(ne, J, j) : (o = [function(G) {
          J(G || Error("canceled"));
        }], y(ne, J, function(G) {
          if (Z)
            throw Error("Unable to subscribe on cancel event asynchronously");
          if (typeof G != "function")
            throw TypeError("onCancel callback must be a function");
          o.push(G);
        }), Z = !0), p.timeout > 0 && (P = setTimeout(function() {
          var G = Error("timeout");
          G.code = "ETIMEDOUT", P = 0, ee.cancel(G), L(G);
        }, p.timeout));
      });
      return _ || (ee.cancel = function(K) {
        if (o) {
          for (var L = o.length, j = 1; j < L; j++)
            o[j](K);
          o[0](K), o = null;
        }
      }), ee;
    }
    function fe(d) {
      var y = this._observers;
      if (!y)
        return -1;
      for (var p = y.length, _ = 0; _ < p; _++)
        if (y[_]._target === d) return _;
      return -1;
    }
    function te(d, y, p, _, o) {
      if (!p)
        return null;
      if (_ === 0) {
        var P = typeof y;
        if (P === "string") {
          var Z, ee, K = 0, L = 0, j = this.delimiter, re = j.length;
          if ((ee = y.indexOf(j)) !== -1) {
            Z = new Array(5);
            do
              Z[K++] = y.slice(L, ee), L = ee + re;
            while ((ee = y.indexOf(j, L)) !== -1);
            Z[K++] = y.slice(L), y = Z, o = K;
          } else
            y = [y], o = 1;
        } else P === "object" ? o = y.length : (y = [y], o = 1);
      }
      var ne = null, J, G, se, ue, de, Y = y[_], F = y[_ + 1], U, V;
      if (_ === o)
        p._listeners && (typeof p._listeners == "function" ? (d && d.push(p._listeners), ne = [p]) : (d && d.push.apply(d, p._listeners), ne = [p]));
      else if (Y === "*") {
        for (U = g(p), ee = U.length; ee-- > 0; )
          J = U[ee], J !== "_listeners" && (V = te(d, y, p[J], _ + 1, o), V && (ne ? ne.push.apply(ne, V) : ne = V));
        return ne;
      } else if (Y === "**") {
        for (de = _ + 1 === o || _ + 2 === o && F === "*", de && p._listeners && (ne = te(d, y, p, o, o)), U = g(p), ee = U.length; ee-- > 0; )
          J = U[ee], J !== "_listeners" && (J === "*" || J === "**" ? (p[J]._listeners && !de && (V = te(d, y, p[J], o, o), V && (ne ? ne.push.apply(ne, V) : ne = V)), V = te(d, y, p[J], _, o)) : J === F ? V = te(d, y, p[J], _ + 2, o) : V = te(d, y, p[J], _, o), V && (ne ? ne.push.apply(ne, V) : ne = V));
        return ne;
      } else p[Y] && (ne = te(d, y, p[Y], _ + 1, o));
      if (G = p["*"], G && te(d, y, G, _ + 1, o), se = p["**"], se)
        if (_ < o)
          for (se._listeners && te(d, y, se, o, o), U = g(se), ee = U.length; ee-- > 0; )
            J = U[ee], J !== "_listeners" && (J === F ? te(d, y, se[J], _ + 2, o) : J === Y ? te(d, y, se[J], _ + 1, o) : (ue = {}, ue[J] = se[J], te(d, y, { "**": ue }, _ + 1, o)));
        else se._listeners ? te(d, y, se, o, o) : se["*"] && se["*"]._listeners && te(d, y, se["*"], o, o);
      return ne;
    }
    function ce(d, y, p) {
      var _ = 0, o = 0, P, Z = this.delimiter, ee = Z.length, K;
      if (typeof d == "string")
        if ((P = d.indexOf(Z)) !== -1) {
          K = new Array(5);
          do
            K[_++] = d.slice(o, P), o = P + ee;
          while ((P = d.indexOf(Z, o)) !== -1);
          K[_++] = d.slice(o);
        } else
          K = [d], _ = 1;
      else
        K = d, _ = d.length;
      if (_ > 1) {
        for (P = 0; P + 1 < _; P++)
          if (K[P] === "**" && K[P + 1] === "**")
            return;
      }
      var L = this.listenerTree, j;
      for (P = 0; P < _; P++)
        if (j = K[P], L = L[j] || (L[j] = {}), P === _ - 1)
          return L._listeners ? (typeof L._listeners == "function" && (L._listeners = [L._listeners]), p ? L._listeners.unshift(y) : L._listeners.push(y), !L._listeners.warned && this._maxListeners > 0 && L._listeners.length > this._maxListeners && (L._listeners.warned = !0, k.call(this, L._listeners.length, j))) : L._listeners = y, !0;
      return !0;
    }
    function H(d, y, p, _) {
      for (var o = g(d), P = o.length, Z, ee, K, L = d._listeners, j; P-- > 0; )
        ee = o[P], Z = d[ee], ee === "_listeners" ? K = p : K = p ? p.concat(ee) : [ee], j = _ || typeof ee == "symbol", L && y.push(j ? K : K.join(this.delimiter)), typeof Z == "object" && H.call(this, Z, y, K, j);
      return y;
    }
    function A(d) {
      for (var y = g(d), p = y.length, _, o, P; p-- > 0; )
        o = y[p], _ = d[o], _ && (P = !0, o !== "_listeners" && !A(_) && delete d[o]);
      return P;
    }
    function c(d, y, p) {
      this.emitter = d, this.event = y, this.listener = p;
    }
    c.prototype.off = function() {
      return this.emitter.off(this.event, this.listener), this;
    };
    function e(d, y, p) {
      if (p === !0)
        o = !0;
      else if (p === !1)
        _ = !0;
      else {
        if (!p || typeof p != "object")
          throw TypeError("options should be an object or true");
        var _ = p.async, o = p.promisify, P = p.nextTick, Z = p.objectify;
      }
      if (_ || P || o) {
        var ee = y, K = y._origin || y;
        if (P && !E)
          throw Error("process.nextTick is not supported");
        o === T && (o = y.constructor.name === "AsyncFunction"), y = function() {
          var L = arguments, j = this, re = this.event;
          return o ? P ? Promise.resolve() : new Promise(function(ne) {
            u(ne);
          }).then(function() {
            return j.event = re, ee.apply(j, L);
          }) : (P ? process$1.nextTick : u)(function() {
            j.event = re, ee.apply(j, L);
          });
        }, y._async = !0, y._origin = K;
      }
      return [y, Z ? new c(this, d, y) : this];
    }
    function a(d) {
      this._events = {}, this._newListener = !1, this._removeListener = !1, this.verboseMemoryLeak = !1, B.call(this, d);
    }
    a.EventEmitter2 = a, a.prototype.listenTo = function(d, y, p) {
      if (typeof d != "object")
        throw TypeError("target musts be an object");
      var _ = this;
      p = N(p, {
        on: T,
        off: T,
        reducers: T
      }, {
        on: X,
        off: X,
        reducers: Q
      });
      function o(P) {
        if (typeof P != "object")
          throw TypeError("events must be an object");
        var Z = p.reducers, ee = fe.call(_, d), K;
        ee === -1 ? K = new D(_, d, p) : K = _._observers[ee];
        for (var L = g(P), j = L.length, re, ne = typeof Z == "function", J = 0; J < j; J++)
          re = L[J], K.subscribe(
            re,
            P[re] || re,
            ne ? Z : Z && Z[re]
          );
      }
      return C(y) ? o(O(y)) : o(typeof y == "string" ? O(y.split(/\s+/)) : y), this;
    }, a.prototype.stopListeningTo = function(d, y) {
      var p = this._observers;
      if (!p)
        return !1;
      var _ = p.length, o, P = !1;
      if (d && typeof d != "object")
        throw TypeError("target should be an object");
      for (; _-- > 0; )
        o = p[_], (!d || o._target === d) && (o.unsubscribe(y), P = !0);
      return P;
    }, a.prototype.delimiter = ".", a.prototype.setMaxListeners = function(d) {
      d !== T && (this._maxListeners = d, this._conf || (this._conf = {}), this._conf.maxListeners = d);
    }, a.prototype.getMaxListeners = function() {
      return this._maxListeners;
    }, a.prototype.event = "", a.prototype.once = function(d, y, p) {
      return this._once(d, y, !1, p);
    }, a.prototype.prependOnceListener = function(d, y, p) {
      return this._once(d, y, !0, p);
    }, a.prototype._once = function(d, y, p, _) {
      return this._many(d, 1, y, p, _);
    }, a.prototype.many = function(d, y, p, _) {
      return this._many(d, y, p, !1, _);
    }, a.prototype.prependMany = function(d, y, p, _) {
      return this._many(d, y, p, !0, _);
    }, a.prototype._many = function(d, y, p, _, o) {
      var P = this;
      if (typeof p != "function")
        throw new Error("many only accepts instances of Function");
      function Z() {
        return --y === 0 && P.off(d, Z), p.apply(this, arguments);
      }
      return Z._origin = p, this._on(d, Z, _, o);
    }, a.prototype.emit = function() {
      if (!this._events && !this._all)
        return !1;
      this._events || R.call(this);
      var d = arguments[0], y, p = this.wildcard, _, o, P, Z, ee;
      if (d === "newListener" && !this._newListener && !this._events.newListener)
        return !1;
      if (p && (y = d, d !== "newListener" && d !== "removeListener" && typeof d == "object")) {
        if (o = d.length, l) {
          for (P = 0; P < o; P++)
            if (typeof d[P] == "symbol") {
              ee = !0;
              break;
            }
        }
        ee || (d = d.join(this.delimiter));
      }
      var K = arguments.length, L;
      if (this._all && this._all.length)
        for (L = this._all.slice(), P = 0, o = L.length; P < o; P++)
          switch (this.event = d, K) {
            case 1:
              L[P].call(this, d);
              break;
            case 2:
              L[P].call(this, d, arguments[1]);
              break;
            case 3:
              L[P].call(this, d, arguments[1], arguments[2]);
              break;
            default:
              L[P].apply(this, arguments);
          }
      if (p)
        L = [], te.call(this, L, y, this.listenerTree, 0, o);
      else if (L = this._events[d], typeof L == "function") {
        switch (this.event = d, K) {
          case 1:
            L.call(this);
            break;
          case 2:
            L.call(this, arguments[1]);
            break;
          case 3:
            L.call(this, arguments[1], arguments[2]);
            break;
          default:
            for (_ = new Array(K - 1), Z = 1; Z < K; Z++) _[Z - 1] = arguments[Z];
            L.apply(this, _);
        }
        return !0;
      } else L && (L = L.slice());
      if (L && L.length) {
        if (K > 3)
          for (_ = new Array(K - 1), Z = 1; Z < K; Z++) _[Z - 1] = arguments[Z];
        for (P = 0, o = L.length; P < o; P++)
          switch (this.event = d, K) {
            case 1:
              L[P].call(this);
              break;
            case 2:
              L[P].call(this, arguments[1]);
              break;
            case 3:
              L[P].call(this, arguments[1], arguments[2]);
              break;
            default:
              L[P].apply(this, _);
          }
        return !0;
      } else if (!this.ignoreErrors && !this._all && d === "error")
        throw arguments[1] instanceof Error ? arguments[1] : new Error("Uncaught, unspecified 'error' event.");
      return !!this._all;
    }, a.prototype.emitAsync = function() {
      if (!this._events && !this._all)
        return !1;
      this._events || R.call(this);
      var d = arguments[0], y = this.wildcard, p, _, o, P, Z, ee;
      if (d === "newListener" && !this._newListener && !this._events.newListener)
        return Promise.resolve([!1]);
      if (y && (p = d, d !== "newListener" && d !== "removeListener" && typeof d == "object")) {
        if (P = d.length, l) {
          for (Z = 0; Z < P; Z++)
            if (typeof d[Z] == "symbol") {
              _ = !0;
              break;
            }
        }
        _ || (d = d.join(this.delimiter));
      }
      var K = [], L = arguments.length, j;
      if (this._all)
        for (Z = 0, P = this._all.length; Z < P; Z++)
          switch (this.event = d, L) {
            case 1:
              K.push(this._all[Z].call(this, d));
              break;
            case 2:
              K.push(this._all[Z].call(this, d, arguments[1]));
              break;
            case 3:
              K.push(this._all[Z].call(this, d, arguments[1], arguments[2]));
              break;
            default:
              K.push(this._all[Z].apply(this, arguments));
          }
      if (y ? (j = [], te.call(this, j, p, this.listenerTree, 0)) : j = this._events[d], typeof j == "function")
        switch (this.event = d, L) {
          case 1:
            K.push(j.call(this));
            break;
          case 2:
            K.push(j.call(this, arguments[1]));
            break;
          case 3:
            K.push(j.call(this, arguments[1], arguments[2]));
            break;
          default:
            for (o = new Array(L - 1), ee = 1; ee < L; ee++) o[ee - 1] = arguments[ee];
            K.push(j.apply(this, o));
        }
      else if (j && j.length) {
        if (j = j.slice(), L > 3)
          for (o = new Array(L - 1), ee = 1; ee < L; ee++) o[ee - 1] = arguments[ee];
        for (Z = 0, P = j.length; Z < P; Z++)
          switch (this.event = d, L) {
            case 1:
              K.push(j[Z].call(this));
              break;
            case 2:
              K.push(j[Z].call(this, arguments[1]));
              break;
            case 3:
              K.push(j[Z].call(this, arguments[1], arguments[2]));
              break;
            default:
              K.push(j[Z].apply(this, o));
          }
      } else if (!this.ignoreErrors && !this._all && d === "error")
        return arguments[1] instanceof Error ? Promise.reject(arguments[1]) : Promise.reject("Uncaught, unspecified 'error' event.");
      return Promise.all(K);
    }, a.prototype.on = function(d, y, p) {
      return this._on(d, y, !1, p);
    }, a.prototype.prependListener = function(d, y, p) {
      return this._on(d, y, !0, p);
    }, a.prototype.onAny = function(d) {
      return this._onAny(d, !1);
    }, a.prototype.prependAny = function(d) {
      return this._onAny(d, !0);
    }, a.prototype.addListener = a.prototype.on, a.prototype._onAny = function(d, y) {
      if (typeof d != "function")
        throw new Error("onAny only accepts instances of Function");
      return this._all || (this._all = []), y ? this._all.unshift(d) : this._all.push(d), this;
    }, a.prototype._on = function(d, y, p, _) {
      if (typeof d == "function")
        return this._onAny(d, y), this;
      if (typeof y != "function")
        throw new Error("on only accepts instances of Function");
      this._events || R.call(this);
      var o = this, P;
      return _ !== T && (P = e.call(this, d, y, _), y = P[0], o = P[1]), this._newListener && this.emit("newListener", d, y), this.wildcard ? (ce.call(this, d, y, p), o) : (this._events[d] ? (typeof this._events[d] == "function" && (this._events[d] = [this._events[d]]), p ? this._events[d].unshift(y) : this._events[d].push(y), !this._events[d].warned && this._maxListeners > 0 && this._events[d].length > this._maxListeners && (this._events[d].warned = !0, k.call(this, this._events[d].length, d))) : this._events[d] = y, o);
    }, a.prototype.off = function(d, y) {
      if (typeof y != "function")
        throw new Error("removeListener only takes instances of Function");
      var p, _ = [];
      if (this.wildcard) {
        var o = typeof d == "string" ? d.split(this.delimiter) : d.slice();
        if (_ = te.call(this, null, o, this.listenerTree, 0), !_) return this;
      } else {
        if (!this._events[d]) return this;
        p = this._events[d], _.push({ _listeners: p });
      }
      for (var P = 0; P < _.length; P++) {
        var Z = _[P];
        if (p = Z._listeners, C(p)) {
          for (var ee = -1, K = 0, L = p.length; K < L; K++)
            if (p[K] === y || p[K].listener && p[K].listener === y || p[K]._origin && p[K]._origin === y) {
              ee = K;
              break;
            }
          if (ee < 0)
            continue;
          return this.wildcard ? Z._listeners.splice(ee, 1) : this._events[d].splice(ee, 1), p.length === 0 && (this.wildcard ? delete Z._listeners : delete this._events[d]), this._removeListener && this.emit("removeListener", d, y), this;
        } else (p === y || p.listener && p.listener === y || p._origin && p._origin === y) && (this.wildcard ? delete Z._listeners : delete this._events[d], this._removeListener && this.emit("removeListener", d, y));
      }
      return this.listenerTree && A(this.listenerTree), this;
    }, a.prototype.offAny = function(d) {
      var y = 0, p = 0, _;
      if (d && this._all && this._all.length > 0) {
        for (_ = this._all, y = 0, p = _.length; y < p; y++)
          if (d === _[y])
            return _.splice(y, 1), this._removeListener && this.emit("removeListenerAny", d), this;
      } else {
        if (_ = this._all, this._removeListener)
          for (y = 0, p = _.length; y < p; y++)
            this.emit("removeListenerAny", _[y]);
        this._all = [];
      }
      return this;
    }, a.prototype.removeListener = a.prototype.off, a.prototype.removeAllListeners = function(d) {
      if (d === T)
        return !this._events || R.call(this), this;
      if (this.wildcard) {
        var y = te.call(this, null, d, this.listenerTree, 0), p, _;
        if (!y) return this;
        for (_ = 0; _ < y.length; _++)
          p = y[_], p._listeners = null;
        this.listenerTree && A(this.listenerTree);
      } else this._events && (this._events[d] = null);
      return this;
    }, a.prototype.listeners = function(d) {
      var y = this._events, p, _, o, P, Z;
      if (d === T) {
        if (this.wildcard)
          throw Error("event name required for wildcard emitter");
        if (!y)
          return [];
        for (p = g(y), P = p.length, o = []; P-- > 0; )
          _ = y[p[P]], typeof _ == "function" ? o.push(_) : o.push.apply(o, _);
        return o;
      } else {
        if (this.wildcard) {
          if (Z = this.listenerTree, !Z) return [];
          var ee = [], K = typeof d == "string" ? d.split(this.delimiter) : d.slice();
          return te.call(this, ee, K, Z, 0), ee;
        }
        return y ? (_ = y[d], _ ? typeof _ == "function" ? [_] : _ : []) : [];
      }
    }, a.prototype.eventNames = function(d) {
      var y = this._events;
      return this.wildcard ? H.call(this, this.listenerTree, [], null, d) : y ? g(y) : [];
    }, a.prototype.listenerCount = function(d) {
      return this.listeners(d).length;
    }, a.prototype.hasListeners = function(d) {
      if (this.wildcard) {
        var y = [], p = typeof d == "string" ? d.split(this.delimiter) : d.slice();
        return te.call(this, y, p, this.listenerTree, 0), y.length > 0;
      }
      var _ = this._events, o = this._all;
      return !!(o && o.length || _ && (d === T ? g(_).length : _[d]));
    }, a.prototype.listenersAny = function() {
      return this._all ? this._all : [];
    }, a.prototype.waitFor = function(d, y) {
      var p = this, _ = typeof y;
      return _ === "number" ? y = { timeout: y } : _ === "function" && (y = { filter: y }), y = N(y, {
        timeout: 0,
        filter: T,
        handleError: !1,
        Promise,
        overload: !1
      }, {
        filter: X,
        Promise: W
      }), ae(y.Promise, function(o, P, Z) {
        function ee() {
          var K = y.filter;
          if (!(K && !K.apply(p, arguments)))
            if (p.off(d, ee), y.handleError) {
              var L = arguments[0];
              L ? P(L) : o($.apply(null, arguments).slice(1));
            } else
              o($.apply(null, arguments));
        }
        Z(function() {
          p.off(d, ee);
        }), p._on(d, ee, !1);
      }, {
        timeout: y.timeout,
        overload: y.overload
      });
    };
    function v(d, y, p) {
      p = N(p, {
        Promise,
        timeout: 0,
        overload: !1
      }, {
        Promise: W
      });
      var _ = p.Promise;
      return ae(_, function(o, P, Z) {
        var ee;
        if (typeof d.addEventListener == "function") {
          ee = function() {
            o($.apply(null, arguments));
          }, Z(function() {
            d.removeEventListener(y, ee);
          }), d.addEventListener(
            y,
            ee,
            { once: !0 }
          );
          return;
        }
        var K = function() {
          L && d.removeListener("error", L), o($.apply(null, arguments));
        }, L;
        y !== "error" && (L = function(j) {
          d.removeListener(y, K), P(j);
        }, d.once("error", L)), Z(function() {
          L && d.removeListener("error", L), d.removeListener(y, K);
        }), d.once(y, K);
      }, {
        timeout: p.timeout,
        overload: p.overload
      });
    }
    var x = a.prototype;
    Object.defineProperties(a, {
      defaultMaxListeners: {
        get: function() {
          return x._maxListeners;
        },
        set: function(d) {
          if (typeof d != "number" || d < 0 || Number.isNaN(d))
            throw TypeError("n must be a non-negative number");
          x._maxListeners = d;
        },
        enumerable: !0
      },
      once: {
        value: v,
        writable: !0,
        configurable: !0
      }
    }), Object.defineProperties(x, {
      _maxListeners: {
        value: t,
        writable: !0,
        configurable: !0
      },
      _observers: { value: null, writable: !0, configurable: !0 }
    }), I.exports = a;
  })();
})(eventemitter2);
var eventemitter2Exports = eventemitter2.exports;
const EventEmitter = /* @__PURE__ */ getDefaultExportFromCjs(eventemitter2Exports);
class APIResponse {
  constructor({
    data: M,
    status: T,
    headers: q,
    request: C
  }) {
    this.data = M, this.status = T, this.headers = q, this.request = C;
  }
}
class FetchAPI extends EventEmitter {
  constructor(M) {
    super(), this.baseUrl = M;
  }
  send(M, T) {
    return Be(this, null, function* () {
      const { url: q, query: C, method: t, data: E, headers: l } = M, [b, w] = E instanceof FormData ? [E, {}] : [
        typeof E != "string" ? JSON.stringify(E) : E,
        {
          "Content-Type": "application/json"
        }
      ], u = this.baseUrl + q, g = this.getUrlWithParams(u, C), R = yield fetch(g, {
        method: t,
        headers: Object.assign(l || {}, w),
        body: b,
        credentials: M.withCredentials ? "include" : "same-origin"
      }), B = yield R.json(), k = this.convertHeadersToPlainObject(R.headers);
      return new APIResponse({
        data: B,
        status: R.status,
        headers: k,
        request: M
      });
    });
  }
  getUrlWithParams(M, T) {
    if (!T) return M;
    const q = new URL(M);
    return Object.entries(T).forEach(
      ([C, t]) => {
        q.searchParams.append(C, t);
      }
    ), q.toString();
  }
  convertHeadersToPlainObject(M) {
    const T = {};
    for (const q of Object.keys(M))
      T[q] = M.get(q);
    return T;
  }
  // type override 를 위해서 구현 class 에서 메서드들을 재정의 해줘야함..
  addListener(M, T) {
    return super.addListener(M, T);
  }
  on(M, T, q) {
    return super.on(M, T, q);
  }
  prependListener(M, T, q) {
    return super.prependListener(M, T, q);
  }
  once(M, T, q) {
    return super.once(M, T, q);
  }
  emit(M, ...T) {
    return super.emit(M, ...T);
  }
  emitAsync(M, ...T) {
    return super.emitAsync(M, ...T);
  }
}
class FirebaseAuthAPI {
  constructor(M) {
    this.FIREBASE_AUTH_URL = "https://identitytoolkit.googleapis.com/v1/", this.BCRYPT_SALT = "$2a$10$QCJoWqnN.acrjPIgKYCthu";
    const T = new URL(this.FIREBASE_AUTH_URL);
    this.firebaseKey = M.apiKey, this.fetcher = new FetchAPI(T.toString());
  }
  checkError(M) {
    if (M.error)
      throw new Error(
        `Error code: ${M.error.code}, message: ${M.error.message}`
      );
  }
  signUpWithEmailPassword(M, T, q = !0) {
    return Be(this, null, function* () {
      let C = T;
      q && (C = bcrypt.hashSync(T, this.BCRYPT_SALT));
      const t = JSON.stringify({
        email: M,
        password: C,
        returnSecureToken: !0
      }), E = yield this.fetcher.send({
        url: "accounts:signUp",
        method: "POST",
        data: t,
        query: {
          key: this.firebaseKey
        },
        withCredentials: !1
      });
      return this.checkError(E.data), E.data;
    });
  }
  signInWithEmailPassword(M, T, q = !0) {
    return Be(this, null, function* () {
      let C = T;
      q && (C = bcrypt.hashSync(T, this.BCRYPT_SALT));
      const t = JSON.stringify({
        email: M,
        password: C,
        returnSecureToken: !0
      }), E = yield this.fetcher.send({
        url: "accounts:signInWithPassword",
        method: "POST",
        data: t,
        query: {
          key: this.firebaseKey
        },
        withCredentials: !1
      });
      return this.checkError(E.data), E.data;
    });
  }
  getCurrentUser(M) {
    return Be(this, null, function* () {
      const T = JSON.stringify({
        idToken: M
      }), q = yield this.fetcher.send({
        url: "accounts:lookup",
        method: "POST",
        data: T,
        query: {
          key: this.firebaseKey
        },
        withCredentials: !1
      });
      return this.checkError(q.data), q.data;
    });
  }
  getRefreshIdToken(M) {
    return Be(this, null, function* () {
      const T = JSON.stringify({
        grant_type: "refresh_token",
        refresh_token: M
      }), q = yield this.fetcher.send({
        url: "token",
        method: "POST",
        data: T,
        query: {
          key: this.firebaseKey
        },
        withCredentials: !1
      }), C = q.data;
      return this.checkError(q.data), C.id_token;
    });
  }
  resetPassword(M, T, q = !0) {
    return Be(this, null, function* () {
      let C = T;
      q && (C = bcrypt.hashSync(T, this.BCRYPT_SALT));
      const t = JSON.stringify({
        oobCode: M,
        newPassword: C
      }), E = yield this.fetcher.send({
        url: "accounts:resetPassword",
        method: "POST",
        data: t,
        query: {
          key: this.firebaseKey
        },
        withCredentials: !1
      });
      return this.checkError(E.data), E.data;
    });
  }
  verifyEmail(M) {
    return Be(this, null, function* () {
      const T = JSON.stringify({
        oobCode: M
      }), q = yield this.fetcher.send({
        url: "accounts:update",
        method: "POST",
        data: T,
        query: {
          key: this.firebaseKey
        },
        withCredentials: !1
      });
      return this.checkError(q.data), q.data;
    });
  }
  signInWithCustomToken(M) {
    return Be(this, null, function* () {
      const T = JSON.stringify({
        token: M,
        returnSecureToken: !0
      }), q = yield this.fetcher.send({
        url: "accounts:signInWithCustomToken",
        data: T,
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
  updatePassword(M, T) {
    return Be(this, null, function* () {
      const q = bcrypt.hashSync(T, this.BCRYPT_SALT), C = JSON.stringify({
        idToken: M,
        password: q,
        returnSecureToken: !0
      }), t = yield this.fetcher.send({
        url: "accounts:update",
        method: "POST",
        data: C,
        query: {
          key: this.firebaseKey
        },
        withCredentials: !1
      });
      return this.checkError(t.data), t.data;
    });
  }
}
const isErrorResponse = (I) => {
  const M = I.statusCode !== void 0 || I.status !== void 0, T = I.timestamp !== void 0 && I.message !== void 0 && I.path !== void 0;
  return M && T;
}, isFirebaseErrorResponse = (I) => {
  var T, q;
  return I.error !== void 0 || ((T = I.error) == null ? void 0 : T.code) !== void 0 || ((q = I.error) == null ? void 0 : q.message) !== void 0;
}, getBaseUrl = (I) => {
  if (I.slice(0, 8) === "ak_live_")
    return "https://sdk.wepin.io/v1";
  if (I.slice(0, 8) === "ak_test_")
    return "https://stage-sdk.wepin.io/v1";
  if (I.slice(0, 7) === "ak_dev_")
    return "https://dev-sdk.wepin.io/v1";
  if (I.slice(0, 13) === "local_ak_dev_")
    return "https://local-sdk.wepin.io/v1";
  throw new Error("Invalid appKey");
}, APIEvents = {
  request: "request",
  response: "response"
};
class APIRequest {
  constructor({
    data: M,
    headers: T,
    url: q,
    query: C,
    withCredentials: t = !1,
    method: E
  }) {
    this.data = M, this.headers = T, this.url = q, this.query = C, this.withCredentials = t, this.method = E;
  }
}
class InvalidTokenError extends Error {
}
InvalidTokenError.prototype.name = "InvalidTokenError";
function b64DecodeUnicode(I) {
  return decodeURIComponent(atob(I).replace(/(.)/g, (M, T) => {
    let q = T.charCodeAt(0).toString(16).toUpperCase();
    return q.length < 2 && (q = "0" + q), "%" + q;
  }));
}
function base64UrlDecode(I) {
  let M = I.replace(/-/g, "+").replace(/_/g, "/");
  switch (M.length % 4) {
    case 0:
      break;
    case 2:
      M += "==";
      break;
    case 3:
      M += "=";
      break;
    default:
      throw new Error("base64 string is not of the correct length");
  }
  try {
    return b64DecodeUnicode(M);
  } catch (T) {
    return atob(M);
  }
}
function jwtDecode(I, M) {
  if (typeof I != "string")
    throw new InvalidTokenError("Invalid token specified: must be a string");
  M || (M = {});
  const T = M.header === !0 ? 0 : 1, q = I.split(".")[T];
  if (typeof q != "string")
    throw new InvalidTokenError(`Invalid token specified: missing part #${T + 1}`);
  let C;
  try {
    C = base64UrlDecode(q);
  } catch (t) {
    throw new InvalidTokenError(`Invalid token specified: invalid base64 for part #${T + 1} (${t.message})`);
  }
  try {
    return JSON.parse(C);
  } catch (t) {
    throw new InvalidTokenError(`Invalid token specified: invalid json for part #${T + 1} (${t.message})`);
  }
}
const checkJwtToken = () => {
  const M = (q) => {
    var E;
    const C = q;
    return !C || ((E = jwtDecode(C)) == null ? void 0 : E.exp) <= Math.floor(Date.now() / 1e3) + 60;
  };
  return {
    // isExpiredAccessToken,
    checkTokenExpired: (q, C) => {
      if (!(q === "/app/info" || q === "/user/login" || q === "/user/oauth") && M(C)) {
        if (q !== "/access-token")
          throw new Error("token_expired");
        return;
      }
    }
  };
};
class WepinSDKFetchAPI extends FetchAPI {
  constructor(M, T) {
    super(), this.baseUrl = M, this.params = T, this.addListener(APIEvents.request, this.requestCallback), this.addListener(APIEvents.response, this.responseCallback);
  }
  send(M, T) {
    return Be(this, null, function* () {
      yield this.emitAsync(APIEvents.request, M, T || {});
      const { data: q, url: C, headers: t } = M, E = (() => {
        if (q instanceof FormData)
          return {};
      })();
      M.headers = Object.assign(t || {}, E);
      const l = yield _r(WepinSDKFetchAPI.prototype, this, "send").call(this, M, T);
      return yield this.setToken(C, l), yield this.emitAsync(
        APIEvents.response,
        l,
        T || {}
      ), l;
    });
  }
  setToken(M, T) {
    return Be(this, null, function* () {
      var q, C, t, E, l;
      if (!isErrorResponse(T.data))
        if (M === "user/login" && ((q = T.data) != null && q.token))
          yield this.params.wepinFetch.setToken({
            accessToken: (C = T.data) == null ? void 0 : C.token.access,
            refreshToken: (t = T.data) == null ? void 0 : t.token.refresh
          });
        else if (M === "/user/access-token" && ((E = T.data) != null && E.token)) {
          const b = yield this.params.wepinFetch.Token();
          yield this.params.wepinFetch.setToken({
            accessToken: (l = T.data) == null ? void 0 : l.token,
            refreshToken: b == null ? void 0 : b.refreshToken
          });
        } else M === "user/logout" && (yield this.params.wepinFetch.setToken());
    });
  }
  requestCallback(M, T) {
    return Be(this, null, function* () {
      try {
        M.headers || (M.headers = {}), M.headers["X-API-KEY"] = this.params.appKey;
        const q = this.params.domain && this.params.domain.includes("localhost") ? "" : this.params.domain;
        M.headers["X-SDK-TYPE"] = this.params.sdk.type, M.headers["X-SDK-VERSION"] = this.params.sdk.version, M.headers["X-API-DOMAIN"] = q;
        const C = yield this.params.wepinFetch.Token();
        if (M.url === "/user/access-token" && Object.assign(M.query, { refresh_token: C == null ? void 0 : C.refreshToken }), T != null && T.ignoreCheckToken) return;
        try {
          const E = C == null ? void 0 : C.accessToken, { checkTokenExpired: l } = checkJwtToken();
          l(M.url, E);
        } catch (E) {
          const l = new APIRequest({
            url: "/user/access-token",
            method: "GET",
            withCredentials: !0
          });
          yield this.send(l, { ignoreCheckToken: !0 });
        }
        const t = C == null ? void 0 : C.accessToken;
        t && (M.headers.Authorization = `Bearer ${t}`);
      } catch (q) {
        throw new Error("Unauthorized Error");
      }
    });
  }
  responseCallback(M) {
    return Be(this, null, function* () {
      if (M.status === 401)
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
class AccountAPI {
  constructor(M) {
    this.fetcher = M, this.basePath = "/account";
  }
  // 4.1 Readdress
  readdress(M) {
    return Be(this, null, function* () {
      const T = new APIRequest({
        url: `${this.basePath}/readdress`,
        data: M,
        method: "PATCH",
        withCredentials: !0
      });
      return (yield this.fetcher.send(T)).data;
    });
  }
  // 4.2 Get App Account
  getAppAccountList(M) {
    return Be(this, null, function* () {
      const T = new APIRequest({
        url: `${this.basePath}`,
        query: M,
        method: "GET",
        withCredentials: !0
      });
      return (yield this.fetcher.send(T)).data;
    });
  }
}
class AppAPI {
  constructor(M) {
    this.fetcher = M, this.basePath = "/app";
  }
  // 1.1 Get Theme
  getThemeById(M) {
    return Be(this, null, function* () {
      return (yield fetch(`${this.fetcher.baseUrl}/app/theme/${M.id}`, {
        method: "GET"
      })).json();
    });
  }
  getLayoutById(M) {
    return Be(this, null, function* () {
      return (yield fetch(`${this.fetcher.baseUrl}/app/layout/${M.id}`, {
        method: "GET"
      })).json();
    });
  }
  // 1.3 Get App Info
  getAppInfo(M) {
    return Be(this, null, function* () {
      const T = new APIRequest({
        url: `${this.basePath}/info`,
        query: M,
        method: "GET",
        withCredentials: !0
      });
      return (yield this.fetcher.send(T, {
        ignoreCheckToken: !0
      })).data;
    });
  }
  // 1.4 Get App Coins
  getAppCoins(M) {
    return Be(this, null, function* () {
      const T = new APIRequest({
        url: `${this.basePath}/coins`,
        method: "GET",
        query: M,
        withCredentials: !0
      });
      return (yield this.fetcher.send(T, {
        ignoreCheckToken: !0
      })).data;
    });
  }
  // 1.5 Get App Theme
  getAppTheme() {
    return Be(this, null, function* () {
      const M = new APIRequest({
        url: `${this.basePath}/theme`,
        method: "GET",
        withCredentials: !0
      });
      return (yield this.fetcher.send(M, {
        ignoreCheckToken: !0
      })).data;
    });
  }
  // 1.6 Register
  register(M) {
    return Be(this, null, function* () {
      const T = new APIRequest({
        url: `${this.basePath}/register`,
        method: "POST",
        data: M,
        withCredentials: !0
      });
      return (yield this.fetcher.send(T)).data;
    });
  }
}
class AccountBalanceAPI {
  constructor(M) {
    this.fetcher = M, this.basePath = "/accountbalance";
  }
  // 5.1 Get Account Balance
  getAccountBalance(M) {
    return Be(this, null, function* () {
      const T = new APIRequest({
        url: `${this.basePath}/${M.accountId}/balance`,
        method: "GET",
        withCredentials: !0
      });
      return (yield this.fetcher.send(T)).data;
    });
  }
}
class NFTAPI {
  constructor(M) {
    this.fetcher = M, this.basePath = "/nft";
  }
  // 6.1 Get NFT supporting network list
  getSupportingNetworkList() {
    return Be(this, null, function* () {
      const M = new APIRequest({
        url: `${this.basePath}/support-network`,
        method: "GET",
        withCredentials: !0
      });
      return (yield this.fetcher.send(M, {
        // ignoreCheckToken: true,
      })).data;
    });
  }
  // 6.2 Get App NFTs
  getAppNFTList(M) {
    return Be(this, null, function* () {
      const T = new APIRequest({
        url: this.basePath,
        method: "GET",
        query: M,
        withCredentials: !0
      });
      return (yield this.fetcher.send(T)).data;
    });
  }
  // 6.3 Refresh NFTs
  refreshAppNFTList(M) {
    return Be(this, null, function* () {
      const T = new APIRequest({
        url: `${this.basePath}/refresh`,
        method: "GET",
        query: M,
        withCredentials: !0
      });
      return (yield this.fetcher.send(T)).data;
    });
  }
}
class TransactionAPI {
  constructor(M) {
    this.fetcher = M, this.basePath = "/tx";
  }
  // 7.1 Sign transaction
  sign(M) {
    return Be(this, null, function* () {
      const T = new APIRequest({
        url: `${this.basePath}/sign`,
        data: M,
        method: "POST",
        withCredentials: !0
      });
      return (yield this.fetcher.send(T)).data;
    });
  }
  // 7.2 Broadcast Transaction
  broadCast(M) {
    return Be(this, null, function* () {
      const T = new APIRequest({
        url: `${this.basePath}/broadcast`,
        data: M,
        method: "POST",
        withCredentials: !0
      });
      return (yield this.fetcher.send(T)).data;
    });
  }
  // 7.3 Get prepare transaction data
  prepareTransaction(M) {
    return Be(this, null, function* () {
      const T = new APIRequest({
        url: `${this.basePath}/prepare`,
        data: M,
        method: "POST",
        withCredentials: !0
      });
      return (yield this.fetcher.send(T)).data;
    });
  }
  // 7.4 Check Address validation
  checkAddressValidation(M) {
    return Be(this, null, function* () {
      const T = new APIRequest({
        url: `${this.basePath}/check_address`,
        query: M,
        method: "GET",
        withCredentials: !0
      });
      return (yield this.fetcher.send(T)).data;
    });
  }
}
class UserAPI {
  constructor(M) {
    this.fetcher = M, this.basePath = "/user";
  }
  // 2.1 Check User Email
  checkEmailExist(M) {
    return Be(this, null, function* () {
      const T = new APIRequest({
        url: `${this.basePath}/check-user`,
        method: "GET",
        query: M,
        withCredentials: !0
      });
      return (yield this.fetcher.send(T, {
        ignoreCheckToken: !0
      })).data;
    });
  }
  // 2.2 Get User PW State
  getUserPasswordState(M) {
    return Be(this, null, function* () {
      const T = new APIRequest({
        url: `${this.basePath}/password-state`,
        method: "GET",
        query: M,
        withCredentials: !0
      });
      return (yield this.fetcher.send(T, {
        ignoreCheckToken: !0
      })).data;
    });
  }
  // 2.3 Provider Login
  oAuth(M, T) {
    return Be(this, null, function* () {
      const q = new APIRequest({
        url: `${this.basePath}/oauth/login/${T.provider}`,
        method: "GET",
        query: M,
        withCredentials: !0
      });
      return (yield this.fetcher.send(q, {
        ignoreCheckToken: !0
      })).data;
    });
  }
  // 2.4 Verify User Email
  verify(M) {
    return Be(this, null, function* () {
      const T = new APIRequest({
        url: `${this.basePath}/verify`,
        method: "POST",
        data: M,
        withCredentials: !0
      });
      return (yield this.fetcher.send(T, {
        ignoreCheckToken: !0
      })).data;
    });
  }
  // 2.5 Login
  login(M) {
    return Be(this, null, function* () {
      const T = new APIRequest({
        url: `${this.basePath}/login`,
        method: "POST",
        data: M,
        withCredentials: !0
      });
      return (yield this.fetcher.send(T, { ignoreCheckToken: !0 })).data;
    });
  }
  // 2.6 Update User PW State
  updateUserPasswordState(M, T) {
    return Be(this, null, function* () {
      const q = new APIRequest({
        url: `${this.basePath}/${M.userId}/password-state`,
        method: "PATCH",
        data: T,
        withCredentials: !0
      });
      return (yield this.fetcher.send(q)).data;
    });
  }
  // 2.7 Update Terms Accepted
  updateTermsAccepted(M, T) {
    return Be(this, null, function* () {
      const q = new APIRequest({
        url: `${this.basePath}/${M.userId}/terms-accepted`,
        method: "PATCH",
        data: T,
        withCredentials: !0
      });
      return (yield this.fetcher.send(q)).data;
    });
  }
  // 2.8 Get Access Token
  refreshToken(M) {
    return Be(this, null, function* () {
      const T = new APIRequest({
        url: `${this.basePath}/access-token`,
        method: "GET",
        query: {
          userId: M.userId
        },
        withCredentials: !0
      });
      return (yield this.fetcher.send(T, { ignoreCheckToken: !0 })).data;
    });
  }
  // 2.9 Get Public Key
  fetchKey(M) {
    return Be(this, null, function* () {
      const T = new APIRequest({
        url: `${this.basePath}/pubkey`,
        method: "GET",
        query: {
          userId: M.userId
        },
        withCredentials: !0
      });
      return (yield this.fetcher.send(T)).data;
    });
  }
  // 2.11 Get Terms Accepted
  getTermsAccepted(M) {
    return Be(this, null, function* () {
      const T = new APIRequest({
        url: `${this.basePath}/${M.userId}/terms-accepted`,
        method: "GET",
        withCredentials: !0
      });
      return (yield this.fetcher.send(T)).data;
    });
  }
  // 2.12 Logout
  logout(M) {
    return Be(this, null, function* () {
      const T = new APIRequest({
        url: `${this.basePath}/${M.userId}/logout`,
        method: "POST",
        withCredentials: !0
      });
      return (yield this.fetcher.send(T)).data;
    });
  }
  // 2.13 Get Firebase Config
  getFirebaseConfig() {
    return Be(this, null, function* () {
      const M = new APIRequest({
        url: `${this.basePath}/firebase-config`,
        method: "GET",
        withCredentials: !0
      });
      return (yield this.fetcher.send(M, { ignoreCheckToken: !0 })).data;
    });
  }
  // 2.14 Login OAuth idToken
  loginOAuthIdToken(M) {
    return Be(this, null, function* () {
      const T = new APIRequest({
        url: `${this.basePath}/oauth/login/id-token`,
        method: "POST",
        data: M,
        withCredentials: !0
      });
      return (yield this.fetcher.send(T, { ignoreCheckToken: !0 })).data;
    });
  }
  // 2.15 Login OAuth AccessToken
  loginOAuthAccessToken(M) {
    return Be(this, null, function* () {
      const T = new APIRequest({
        url: `${this.basePath}/oauth/login/access-token`,
        method: "POST",
        data: M,
        withCredentials: !0
      });
      return (yield this.fetcher.send(T, { ignoreCheckToken: !0 })).data;
    });
  }
  // 2.17 OAuth Token Request
  OAuthTokenRequest(M, T) {
    return Be(this, null, function* () {
      const q = new APIRequest({
        url: `${this.basePath}/oauth/token/${M.provider}`,
        method: "POST",
        data: T,
        withCredentials: !0
      });
      return (yield this.fetcher.send(q, { ignoreCheckToken: !0 })).data;
    });
  }
  // 2.18 Get User Info
  getUserInfo(M) {
    return Be(this, null, function* () {
      const T = new APIRequest({
        url: `${this.basePath}/${M.userId}/detail`,
        method: "GET",
        withCredentials: !0
      });
      return (yield this.fetcher.send(T)).data;
    });
  }
}
class WalletAPI {
  constructor(M) {
    this.fetcher = M, this.basePath = "/wallet";
  }
  // 3.1 Verify Wallet PIN
  verifyPin(M) {
    return Be(this, null, function* () {
      const T = new APIRequest({
        url: `${this.basePath}/pin/verify`,
        data: M,
        method: "POST",
        withCredentials: !0
      });
      return (yield this.fetcher.send(T)).data;
    });
  }
  // 3.2 Change Wallet PIN
  changePin(M) {
    return Be(this, null, function* () {
      const T = new APIRequest({
        url: `${this.basePath}/pin/change`,
        data: M,
        method: "PATCH",
        withCredentials: !0
      });
      return (yield this.fetcher.send(T)).data;
    });
  }
  // 3.3 Get Wallet Info
  fetchWalletInfo(M, T) {
    return Be(this, null, function* () {
      const q = new APIRequest({
        url: `${this.basePath}/${M.walletId}`,
        query: T,
        method: "GET",
        withCredentials: !0
      });
      return (yield this.fetcher.send(q)).data;
    });
  }
  // 3.4 Get Wallet Key Info
  getWalletKeyInfo(M, T) {
    return Be(this, null, function* () {
      const q = new APIRequest({
        url: `${this.basePath}/${M.walletId}/wallet-keyinfo`,
        query: T,
        method: "GET",
        withCredentials: !0
      });
      return (yield this.fetcher.send(q)).data;
    });
  }
  // 3.5 Reset Wallet PIN Try Count
  resetPinTryCount(M, T) {
    return Be(this, null, function* () {
      const q = new APIRequest({
        url: `${this.basePath}/${M.walletId}/pin/reset-try-count`,
        query: T,
        method: "GET",
        withCredentials: !0
      });
      return (yield this.fetcher.send(q)).data;
    });
  }
}
class WepinSdkAPI {
  constructor(M, T) {
    const q = new WepinSDKFetchAPI(M, T);
    this.app = new AppAPI(q), this.user = new UserAPI(q), this.wallet = new WalletAPI(q), this.account = new AccountAPI(q), this.balance = new AccountBalanceAPI(q), this.nft = new NFTAPI(q), this.transaction = new TransactionAPI(q);
  }
}
class WepinFetch {
  constructor({
    appId: M,
    appKey: T,
    domain: q,
    sdk: C,
    storage: t
  }) {
    this.version = packageJson.version, this.appId = M, this._appKey = T, this._domain = q, this._token = void 0, this.sdk = C, this._wepinStorage = t != null ? t : new m();
  }
  init() {
    return Be(this, null, function* () {
      const M = yield WepinFetch.getFirebaseConfig(
        this._appKey,
        this.sdk.type,
        this.sdk.version
      );
      this.wepinFirebaseApi = new FirebaseAuthAPI(M), this.wepinApi = new WepinSdkAPI(getBaseUrl(this._appKey), {
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
  static getFirebaseConfig(M, T, q) {
    return Be(this, null, function* () {
      const C = getBaseUrl(M), E = yield (yield fetch(`${C}/user/firebase-config`, {
        method: "GET",
        headers: {
          "X-API-KEY": M,
          "X-SDK-TYPE": T,
          "X-SDK-VERSION": q,
          "Content-Type": "application/json"
        }
      })).text();
      return JSON.parse(atob(E));
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
  setToken(M) {
    return Be(this, null, function* () {
      this._token = M, M ? yield this._wepinStorage.setLocalStorage(
        this.appId,
        "wepin:connectUser",
        M
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
var ProjectPlatformKind = /* @__PURE__ */ ((I) => (I[I.web = 1] = "web", I[I.android = 2] = "android", I[I.ios = 3] = "ios", I))(ProjectPlatformKind || {});
export {
  WepinFetch,
  ProjectPlatformKind as WepinPlatformType,
  isErrorResponse,
  isFirebaseErrorResponse
};
