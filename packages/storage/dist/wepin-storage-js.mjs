var S = (l) => {
  throw TypeError(l);
};
var h = (l, a, e) => a.has(l) || S("Cannot " + e);
var n = (l, a, e) => (h(l, a, "read from private field"), e ? e.call(l) : a.get(l)), f = (l, a, e) => a.has(l) ? S("Cannot add the same private member more than once") : a instanceof WeakSet ? a.add(l) : a.set(l, e);
var s = (l, a, e) => new Promise((t, o) => {
  var g = (c) => {
    try {
      u(e.next(c));
    } catch (d) {
      o(d);
    }
  }, L = (c) => {
    try {
      u(e.throw(c));
    } catch (d) {
      o(d);
    }
  }, u = (c) => c.done ? t(c.value) : Promise.resolve(c.value).then(g, L);
  u((e = e.apply(l, a)).next());
});
var i;
const r = class r {
  constructor() {
    this.platform = "web";
  }
  getLocalStorageEnabled() {
    let a = !1;
    try {
      a = window.localStorage && !0;
    } catch (e) {
      a = !1;
    }
    return a;
  }
  setAllLocalStorage(a, e) {
    return s(this, null, function* () {
      if (!this.getLocalStorageEnabled()) {
        console.error(
          "Local storage is not available. We recommend using local storage to maintain login sessions."
        );
        return;
      }
      const t = JSON.stringify(e);
      localStorage.setItem(n(r, i) + a, t);
    });
  }
  setLocalStorage(a, e, t) {
    return s(this, null, function* () {
      if (!this.getLocalStorageEnabled()) {
        console.error(
          "Local storage is not available. We recommend using local storage to maintain login sessions."
        );
        return;
      }
      const o = yield this.getAllLocalStorage(a);
      if (o) {
        o[e] = t, localStorage.setItem(
          n(r, i) + a,
          // btoa(JSON.stringify(localData)),
          JSON.stringify(o)
        );
        return;
      }
      const g = { [e]: t };
      localStorage.setItem(
        n(r, i) + a,
        // btoa(JSON.stringify(newData)),
        JSON.stringify(g)
      );
    });
  }
  getLocalStorage(a, e) {
    return s(this, null, function* () {
      if (!this.getLocalStorageEnabled()) {
        console.error(
          "Local storage is not available. We recommend using local storage to maintain login sessions."
        );
        return;
      }
      const t = yield this.getAllLocalStorage(a);
      try {
        if (t)
          return JSON.parse(t[e]);
      } catch (o) {
        if (t)
          return t[e];
      }
    });
  }
  getAllLocalStorage(a) {
    return s(this, null, function* () {
      if (!this.getLocalStorageEnabled()) {
        console.error(
          "Local storage is not available. We recommend using local storage to maintain login sessions."
        );
        return;
      }
      try {
        return localStorage.getItem(n(r, i) + a) ? (
          // ? JSON.parse(atob(localStorage.getItem(this.#COOKIE_NAME + appId)))
          JSON.parse(localStorage.getItem(n(r, i) + a))
        ) : void 0;
      } catch (e) {
        return;
      }
    });
  }
  clearLocalStorage(a, e) {
    return s(this, null, function* () {
      if (!this.getLocalStorageEnabled()) {
        console.error(
          "Local storage is not available. We recommend using local storage to maintain login sessions."
        );
        return;
      }
      if (yield this.getLocalStorage(a, e)) {
        const o = yield this.getAllLocalStorage(a);
        if (!o)
          return;
        delete o[e], localStorage.setItem(
          n(r, i) + a,
          // btoa(JSON.stringify(localData)),
          JSON.stringify(o)
        );
      }
    });
  }
  clearAllLocalStorage(a) {
    return s(this, null, function* () {
      if (!this.getLocalStorageEnabled()) {
        console.error(
          "Local storage is not available. We recommend using local storage to maintain login sessions."
        );
        return;
      }
      localStorage.removeItem(n(r, i) + a);
    });
  }
  setLoginUserLocalStorage(a, e, t) {
    return s(this, null, function* () {
      if (!this.getLocalStorageEnabled()) {
        console.error(
          "Local storage is not available. We recommend using local storage to maintain login sessions."
        );
        return;
      }
      const o = {};
      return o["firebase:wepin"] = Object.assign(
        { provider: e == null ? void 0 : e.provider },
        e == null ? void 0 : e.token
      ), o["wepin:connectUser"] = {
        accessToken: t.token.access,
        refreshToken: t.token.refresh
      }, o.user_id = t.userInfo.userId, o.user_info = {
        status: "success",
        userInfo: {
          userId: t.userInfo.userId,
          email: t.userInfo.email,
          provider: e.provider,
          use2FA: t.userInfo.use2FA >= 2
        }
      }, o.user_status = {
        loginStatus: t.loginStatus,
        pinRequired: t.loginStatus === "registerRequired" ? t.pinRequired : !1
      }, t.loginStatus !== "pinRequired" && t.walletId && (o.wallet_id = t.walletId, o.user_info.walletId = t.walletId), o.oauth_provider_pending = e.provider, this.setAllLocalStorage(a, o), {
        userInfo: o.user_info,
        connectUser: o["wepin:connectUser"]
      };
    });
  }
};
i = new WeakMap(), f(r, i, "wepin:auth:");
let m = r;
export {
  m as default
};
