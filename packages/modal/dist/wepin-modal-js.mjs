const w = class w {
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
w.CONST = {
  overlayClassName: "wepin-widget__overlay"
};
let p = w;
const y = (s) => {
  const e = (s == null ? void 0 : s.width) || 375, t = (s == null ? void 0 : s.height) || 604, o = s != null && s.sLeft ? s == null ? void 0 : s.sLeft : window.screenLeft ? window.screenLeft : window.screenX ? window.screenX : 0, n = s != null && s.sTop ? s == null ? void 0 : s.sTop : window.screenTop ? window.screenTop : window.screenY ? window.screenY : 0, i = screen.width / 2 - e / 2 + o, c = screen.height / 2 - t / 2 + n;
  return `width=${e}, height=${t}, left=${i}, top=${c}scrollbars=yes, resizable=1, menubar=no, toolbar=no`;
}, m = (s) => {
  const e = document.createElement("iframe");
  return e.classList.add("wepin-sdk-widget-iframe"), e.setAttribute("frameborder", "0"), e.setAttribute("marginwidth", "0"), e.setAttribute("marginheight", "0"), e.style.width = "100%", s && (s != null && s.isHide) ? e.style.height = "0" : e.style.height = "100%", e.style.maxHeight = "100%", e.style.position = "fixed", e.style.bottom = "0", e.style.left = "0", e.style.zIndex = "408888000000", e.title = "wepin sdk webview", e.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; camera; clipboard-read", e.allowFullscreen = !0, e;
}, v = () => "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(s) {
  const e = Math.random() * 16 | 0;
  return (s == "x" ? e : e & 3 | 8).toString(16);
}), r = class r extends p {
  constructor(e, t, o, n, i) {
    super(), this.isWidgetReady = !1, this.url = e, this.id = `id-${v()}`, this.isHide = i, i || r.openOverlay(this.id), r._webview[this.id] = t, this.type = o, this.EL = n, window.addEventListener("message", this.EL), this._open = !0;
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
    return r._webview[e];
  }
  static clearWebview(e) {
    delete r._webview[e];
  }
  static clearAllWebview() {
    this._webview = {};
  }
  close() {
    this.isHide || r.closeOverlay(this.id), window.removeEventListener("message", this.EL), this._open = !1, this.isWidgetReady = !1, this._closeWebview();
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
r._webview = {};
let l = r;
class a extends l {
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
    a.scrollPosition = window.pageYOffset, i.style.overflow = "hidden", i.style.position = "fixed", i.style.top = `-${a.scrollPosition}px`, i.style.width = "100%", document.body.appendChild(t);
  }
  static async openNew({
    url: e,
    EL: t,
    widgetOptions: o
  }) {
    const n = m({ isHide: o == null ? void 0 : o.isHide });
    return new a({
      url: e,
      // wepin,
      frame: n,
      EL: t,
      isHide: o == null ? void 0 : o.isHide
    });
  }
  expand() {
    const e = l.getWebview(this.id);
    e.style.height = "100%", e.style.borderRadius = "0";
  }
  shrink() {
    const e = l.getWebview(this.id);
    e.style.height = "604px", e.style.borderRadius = "12px 12px 0 0 ";
  }
  _closeWebview() {
    const e = setTimeout(() => {
      const t = l.getWebview(this.id), o = document.querySelector("body");
      o.style.removeProperty("overflow"), o.style.removeProperty("position"), o.style.removeProperty("top"), o.style.removeProperty("width"), window.scrollTo(0, a.scrollPosition), t && document.body.removeChild(t), l.clearWebview(this.id), clearTimeout(e);
    }, 500);
  }
  _post(e) {
    l.getWebview(this.id).contentWindow.postMessage(e, this.url);
  }
}
class d extends l {
  constructor({
    url: e,
    webview: t,
    EL: o
  }) {
    super(e, t, "Window", o, !1);
  }
  //: NodeJS.Timer | number
  static async openNew({
    url: e,
    EL: t,
    widgetFeatures: o
  }) {
    const n = y(o), c = window.open(e, "Wepin_Widget", n), h = new d({
      url: e,
      webview: c,
      EL: t
    });
    if (!c)
      throw h.close(), new Error("popup window blocked");
    return this.timer = setInterval(() => {
      try {
        c && c.closed && (clearInterval(this.timer), h.close());
      } catch {
        clearInterval(this.timer), h.close();
      }
    }, 200), h;
  }
  expand() {
  }
  shrink() {
  }
  _closeWebview() {
    d.timer && (clearInterval(d.timer), d.timer = void 0);
    const e = l.getWebview(this.id);
    e && e.close(), l.clearWebview(this.id);
  }
  _post(e) {
    l.getWebview(this.id).postMessage(e, this.url);
  }
}
const x = "@wepin/modal-js", b = "0.0.1", f = "wepin widget modal", u = "IoTrust, Co., Ltd.", W = "MIT", C = "./dist/wepin-modal-js.mjs", T = "dist/wepin-modal-js.umd.js", L = "./dist/src/index.d.ts", N = [
  "dist"
], _ = {
  build: "vite build --mode production",
  dev: "vite build --mode development",
  watch: "vite build --watch",
  lint: "eslint . --ext .vue,.js,.jsx,.cjs,.mjs,.ts,.tsx,.cts,.mts --fix --ignore-path .gitignore"
}, j = [
  "wepin",
  "wepinwallet",
  "wallet",
  "wepin-modal"
], E = {
  name: x,
  version: b,
  description: f,
  author: u,
  license: W,
  main: C,
  jsdelivr: T,
  types: L,
  files: N,
  scripts: _,
  keywords: j
};
class k {
  //   constructor(appKey: string, appId: string) {
  constructor() {
    this.platformType = "web", this._modalWindow = null, this._modalFrame = null, console.log(`WepinModal v${E.version}`), this.domain = window.location.origin;
  }
  //   async init() {
  //     // getAppInfo수행해보고기..
  //     this._appId
  //     this._appKey
  //     this._isInitialized = true
  //     return this._isInitialized
  //   }
  async openAuthBrowser(e, t) {
    return this._modalWindow = await d.openNew({
      url: e,
      EL: t
    }), this._modalWindow;
  }
  async openModal(e, t, o) {
    return this._modalFrame = await a.openNew({
      url: e,
      EL: t,
      widgetOptions: o
    }), this._modalFrame;
  }
  async closeAuthBrowser() {
    this._modalWindow && this._modalWindow.close();
  }
  async closeModal() {
    this._modalFrame && this._modalFrame.close();
  }
}
export {
  k as WepinModal,
  l as Widget
};
