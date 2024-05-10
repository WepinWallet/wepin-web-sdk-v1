var u = (r, t, a) => {
  if (!t.has(r))
    throw TypeError("Cannot " + a);
};
var i = (r, t, a) => (u(r, t, "read from private field"), a ? a.call(r) : t.get(r)), n = (r, t, a) => {
  if (t.has(r))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(r) : t.set(r, a);
};
var l;
const s = class s {
  static getLocalStorageEnabled() {
    let t = !1;
    try {
      t = window.localStorage && !0;
    } catch {
      t = !1;
    }
    return t;
  }
  static setAllLocalStorage(t, a) {
    if (!this.getLocalStorageEnabled()) {
      console.error(
        "Local storage is not available. We recommend using local storage to maintain login sessions."
      );
      return;
    }
    const e = JSON.stringify(a);
    localStorage.setItem(i(this, l) + t, e);
  }
  static setLocalStorage(t, a, e) {
    if (!this.getLocalStorageEnabled()) {
      console.error(
        "Local storage is not available. We recommend using local storage to maintain login sessions."
      );
      return;
    }
    const o = this.getAllLocalStorage(t);
    if (o) {
      o[a] = e, localStorage.setItem(
        i(this, l) + t,
        // btoa(JSON.stringify(localData)),
        JSON.stringify(o)
      );
      return;
    }
    const g = { [a]: e };
    localStorage.setItem(
      i(this, l) + t,
      // btoa(JSON.stringify(newData)),
      JSON.stringify(g)
    );
  }
  static getLocalStorage(t, a) {
    if (!this.getLocalStorageEnabled()) {
      console.error(
        "Local storage is not available. We recommend using local storage to maintain login sessions."
      );
      return;
    }
    const e = this.getAllLocalStorage(t);
    try {
      if (e)
        return JSON.parse(e[a]);
    } catch {
      return e[a];
    }
  }
  static getAllLocalStorage(t) {
    if (!this.getLocalStorageEnabled()) {
      console.error(
        "Local storage is not available. We recommend using local storage to maintain login sessions."
      );
      return;
    }
    try {
      return localStorage.getItem(i(this, l) + t) ? (
        // ? JSON.parse(atob(localStorage.getItem(this.#COOKIE_NAME + appId)))
        JSON.parse(localStorage.getItem(i(this, l) + t))
      ) : void 0;
    } catch {
      return;
    }
  }
  static clearLocalStorage(t, a) {
    if (!this.getLocalStorageEnabled()) {
      console.error(
        "Local storage is not available. We recommend using local storage to maintain login sessions."
      );
      return;
    }
    if (this.getLocalStorage(t, a)) {
      const o = this.getAllLocalStorage(t);
      delete o[a], localStorage.setItem(
        i(this, l) + t,
        // btoa(JSON.stringify(localData)),
        JSON.stringify(o)
      );
    }
  }
  static clearAllLocalStorage(t) {
    if (!this.getLocalStorageEnabled()) {
      console.error(
        "Local storage is not available. We recommend using local storage to maintain login sessions."
      );
      return;
    }
    localStorage.removeItem(i(this, l) + t);
  }
  static setLoginUserLocalStorage(t, a, e) {
    if (!this.getLocalStorageEnabled()) {
      console.error(
        "Local storage is not available. We recommend using local storage to maintain login sessions."
      );
      return;
    }
    const o = {};
    return o["firebase:wepin"] = Object.assign(
      { provider: a == null ? void 0 : a.provider },
      a == null ? void 0 : a.token
    ), o["wepin:connectUser"] = {
      accessToken: e.token.access,
      refreshToken: e.token.refresh
    }, o.user_id = e.userInfo.userId, o.user_info = {
      status: "success",
      userInfo: {
        userId: e.userInfo.userId,
        email: e.userInfo.email,
        provider: a.provider,
        use2FA: e.userInfo.use2FA >= 2
      }
    }, o.user_status = {
      loginStatus: e.loginStatus,
      pinRequired: e.loginStatus === "registerRequired" ? e.pinRequired : !1
    }, e.loginStatus !== "pinRequired" && e.walletId && (o.wallet_id = e.walletId, o.user_info.walletId = e.walletId), o.oauth_provider_pending = a.provider, s.setAllLocalStorage(t, o), {
      userInfo: o.user_info,
      connectUser: o["wepin:connectUser"]
    };
  }
};
l = new WeakMap(), s.platform = "web", n(s, l, "wepin:auth:");
let c = s;
export {
  c as default
};
