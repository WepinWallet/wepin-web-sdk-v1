var d = (s, e, t) => new Promise((o, n) => {
  var i = (l) => {
    try {
      c(t.next(l));
    } catch (y) {
      n(y);
    }
  }, w = (l) => {
    try {
      c(t.throw(l));
    } catch (y) {
      n(y);
    }
  }, c = (l) => l.done ? o(l.value) : Promise.resolve(l.value).then(i, w);
  c((t = t.apply(s, e)).next());
});
const v = class v {
  static closeOverlay(e) {
    const t = document.querySelector(`#${e}`);
    t && t.parentNode && t.parentNode.removeChild(t);
  }
  static openOverlay(e) {
    const t = document.createElement("div");
    t.id = e, t.classList.add(this.CONST.overlayClassName), t.style.zIndex = "2147483647", t.style.display = "flex", t.style.alignItems = "center", t.style.justifyContent = "center", t.style.textAlign = "center", t.style.position = "fixed", t.style.left = "0px", t.style.right = "0px", t.style.top = "0px", t.style.bottom = "0px", t.style.left = "0px", t.style.background = "rgba(0,0,0,0.6)", t.style.color = "white", t.style.border = "2px solid #f1f1f1";
    const o = document.getElementsByClassName(
      this.CONST.overlayClassName
    );
    for (let n = 0; n < o.length; n++) {
      const i = o.item(n);
      i && i.remove();
    }
    document.body.appendChild(t);
  }
};
v.CONST = {
  overlayClassName: "wepin-widget__overlay"
};
let m = v;
const x = (s) => {
  const e = (s == null ? void 0 : s.width) || 375, t = (s == null ? void 0 : s.height) || 604, o = s != null && s.sLeft ? s == null ? void 0 : s.sLeft : window.screenLeft ? window.screenLeft : window.screenX ? window.screenX : 0, n = s != null && s.sTop ? s == null ? void 0 : s.sTop : window.screenTop ? window.screenTop : window.screenY ? window.screenY : 0, i = screen.width / 2 - e / 2 + o, w = screen.height / 2 - t / 2 + n;
  return `width=${e}, height=${t}, left=${i}, top=${w}scrollbars=yes, resizable=1, menubar=no, toolbar=no`;
}, b = (s) => {
  const e = document.createElement("iframe");
  return e.classList.add("wepin-sdk-widget-iframe"), e.setAttribute("frameborder", "0"), e.setAttribute("marginwidth", "0"), e.setAttribute("marginheight", "0"), e.style.width = "100%", s && (s != null && s.isHide) ? e.style.height = "0" : e.style.height = "100%", e.style.maxHeight = "100%", e.style.position = "fixed", e.style.bottom = "0", e.style.left = "0", e.style.zIndex = "408888000000", e.title = "wepin sdk webview", e.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; camera; clipboard-read", e.allowFullscreen = !0, e;
}, f = () => "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(s) {
  const e = Math.random() * 16 | 0;
  return (s == "x" ? e : e & 3 | 8).toString(16);
}), a = class a extends m {
  constructor(e, t, o, n, i) {
    super(), this.isWidgetReady = !1, this.url = e, this.id = `id-${f()}`, this.isHide = i, i || a.openOverlay(this.id), a._webview[this.id] = t, this.type = o, this.EL = n, window.addEventListener("message", this.EL), this._open = !0;
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
  static getWebview(e) {
    return a._webview[e];
  }
  static clearWebview(e) {
    delete a._webview[e];
  }
  static clearAllWebview() {
    this._webview = {};
  }
  close() {
    this.isHide || a.closeOverlay(this.id), window.removeEventListener("message", this.EL), this._open = !1, this.isWidgetReady = !1, this._closeWebview();
  }
  response(e) {
    try {
      this._post(e);
    } catch (t) {
      console.error("Can not response message to the webview", t);
    }
  }
  request(e) {
    try {
      this._post(e);
    } catch (t) {
      console.error("Can not send message to the webview", t);
    }
  }
};
a._webview = {};
let r = a;
class h extends r {
  // is it necessary ?
  constructor({
    url: e,
    // wepin,
    frame: t,
    EL: o,
    isHide: n
  }) {
    super(e, t, "Frame", o, n), t.src = e, t.id = this.id;
    const i = document.querySelector("body");
    h.scrollPosition = window.pageYOffset, i.style.overflow = "hidden", i.style.position = "fixed", i.style.top = `-${h.scrollPosition}px`, i.style.width = "100%", document.body.appendChild(t);
  }
  static openNew(n) {
    return d(this, arguments, function* ({
      url: e,
      EL: t,
      widgetOptions: o
    }) {
      const i = b({ isHide: o == null ? void 0 : o.isHide });
      return new h({
        url: e,
        // wepin,
        frame: i,
        EL: t,
        isHide: o == null ? void 0 : o.isHide
      });
    });
  }
  expand() {
    const e = r.getWebview(this.id);
    e.style.height = "100%", e.style.borderRadius = "0";
  }
  shrink() {
    const e = r.getWebview(this.id);
    e.style.height = "604px", e.style.borderRadius = "12px 12px 0 0 ";
  }
  _closeWebview() {
    const e = setTimeout(() => {
      const t = r.getWebview(this.id), o = document.querySelector("body");
      o.style.removeProperty("overflow"), o.style.removeProperty("position"), o.style.removeProperty("top"), o.style.removeProperty("width"), window.scrollTo(0, h.scrollPosition), t && document.body.removeChild(t), r.clearWebview(this.id), clearTimeout(e);
    }, 500);
  }
  _post(e) {
    r.getWebview(this.id).contentWindow.postMessage(e, this.url);
  }
}
class p extends r {
  constructor({
    url: e,
    webview: t,
    EL: o
  }) {
    super(e, t, "Window", o, !1);
  }
  //: NodeJS.Timer | number
  static openNew(n) {
    return d(this, arguments, function* ({
      url: e,
      EL: t,
      widgetFeatures: o
    }) {
      const i = x(o), c = window.open(e, "Wepin_Widget", i), l = new p({
        url: e,
        webview: c,
        EL: t
      });
      if (!c)
        throw l.close(), new Error("popup window blocked");
      return this.timer = setInterval(() => {
        try {
          c && c.closed && (clearInterval(this.timer), l.close());
        } catch (y) {
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
    const e = r.getWebview(this.id);
    e && e.close(), r.clearWebview(this.id);
  }
  _post(e) {
    r.getWebview(this.id).postMessage(e, this.url);
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
  openAuthBrowser(e, t) {
    return d(this, null, function* () {
      return this._modalWindow = yield p.openNew({
        url: e,
        EL: t
      }), this._modalWindow;
    });
  }
  openModal(e, t, o) {
    return d(this, null, function* () {
      return this._modalFrame = yield h.openNew({
        url: e,
        EL: t,
        widgetOptions: o
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
export {
  A as WepinModal,
  r as Widget
};
