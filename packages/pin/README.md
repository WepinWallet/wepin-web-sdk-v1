<br/>

<p align="center">
  <a href="https://www.wepin.io/">
      <picture>
        <source media="(prefers-color-scheme: dark)">
        <img alt="wepin logo" src="https://github.com/WepinWallet/wepin-web-sdk-v1/blob/main/assets/wepin_logo_color.png?raw=true" width="250" height="auto">
      </picture>
</a>
</p>

<br>


# @wepin/pin-js

[![npm version](https://img.shields.io/npm/v/@wepin/pin-js?style=for-the-badge)](https://www.npmjs.org/package/@wepin/pin-js) [![npm downloads](https://img.shields.io/npm/dt/@wepin/pin-js.svg?label=downloads&style=for-the-badge)](https://www.npmjs.org/package/@wepin/pin-js)

> ⚠️ **Notice:**
>
>This package is **only available for web environments** and cannot be used in Android or iOS hybrid apps (Webview).
>
>If you are using this package in a Server Side Rendering (SSR) environment, make sure to load the package only on the Client Side Rendering (CSR) side.
>
>Please refer to the following code for implementation:
> ```js
> const initWepinPin = async () => {
>    const { WepinPin } = await import('@wepin/pin-js');
>    const wepinPin = new WepinPin({
>        appKey: '',
>    });
>    await wepinPin.init();
>}
> ```

## ⏩ Document
[![typedoc](https://img.shields.io/badge/typedoc-blue?style=for-the-badge)](https://wepinwallet.github.io/wepin-web-sdk-v1/modules/_wepin_pin_js.html)

## ⏩ Get App Key
After signing up for [Wepin Workspace](https://workspace.wepin.io/), go to the development tools menu and enter the information for each app platform to receive your App ID and App Key.


## ⏩ Install
To install the Wepin Pin Pad Library, you can use npm, yarn, or a CDN:
Using npm:
```
npm install @wepin/pin-js
```
Using yarn:
```
yarn add @wepin/pin-js
```
Using CDN:
You can also include the library directly via CDN by adding the following script tag to your HTML file:
```html
<script src="https://cdn.jsdelivr.net/npm/@wepin/pin-js/dist/umd/wepin-pin-pad.umd.cjs"></script>
```


## ⏩ Import SDK
Using npm or yarn:
```js
import { WepinPin } from '@wepin/pin-js'
```
Using CDN:
```js
const { WepinPin } = window.WepinPinPad
```


## ⏩ Initialize
Create a new instance of `WepinPin` and initialize it with your application's  key
- `defaultLanguage`: The language to be displayed on the widget (default: `'ko'`)
Currently, only `'ko'`, `'en'` and `'ja'` are supported.
```js
const wepinPin = new WepinPin({
  appKey: 'your-wepin-api-key',
})
await wepinPin.init({
  defaultLanguage: 'ko',
})
```

Then use [login](../modules/_wepin_login_js.html) to log in to wepin.
```js
const loginRes = await wepinPin.login.loginWithEmailAndPassword(...)
await wepinPin.login.loginWepin(loginRes)
```

Or you can also pass in the [WepinLogin](../classes/_wepin_login_js.WepinLogin.html) library you created.
```js
const wepinLogin = new WepinLogin()
const wepinPin = new WepinPin({
  appKey: 'your-wepin-api-key',
  wepinLogin,
})
await wepinPin.init({
  defaultLanguage: 'ko',
})
const loginRes = await wepinPin.login.loginWithEmailAndPassword(...)
await wepinPin.login.loginWepin(loginRes)
```

### isInitialized
```js
wepinPin.isInitialized()
```
The `isInitialized()` method checks WepinPin is initialized.



## ⏩ Examples

### Open Pinpad For Register
- [generateRegistrationPINBlock](../classes/_wepin_pin_js.WepinPin.html#generateRegistrationPINBlock)
```typescript
const pinBlock = await wepinPin.generateRegistrationPINBlock()

fetch({
  url: 'https://sdk.wepin.io/v1/app/register',
  method: 'POST',
  // Omit authentication headers
  body: {
    // Omit other bodies
    UVD: pinBlock.UVD,
    hint: pinBlock.hint,
  }
})
```

### Open PinPad for sign
- [generateAuthPINBlock](../classes/_wepin_pin_js.WepinPin.html#generateAuthPINBlock)
```typescript
const pinBlock = await wepinPin.generateAuthPINBlock(count)
// Sort seqNum of uvd in ascending order from 1 because I need to write it in order starting from 1
pinBlock.UVDs.sort((a, b) => (a.seqNum ?? 0) - (b.seqNum ?? 0))

const resArray: any[] = []
for (const encUVD of pinBlock.UVDs) {
  await fetch({
    url: 'https://sdk.wepin.io/v1/tx/sign',
    method: 'POST',
    body: {
      userId: await getUserId(),
      walletId: await getWalletId(),
      accountId: (await getEthereumAccount()).accountId,
      type: 'msg_sign',
      txData: {
        data: '0x0',
      },
      pin: encUVD,
      otpCode: {
        code: pinBlock.otp,
      },
    }
  })
}
```

### Open Pinpad for change pin
- [generateChangePINBlock](../classes/_wepin_pin_js.WepinPin.html#generateChangePINBlock)
```typescript
const pinBlock = await wepinPin.generateChangePINBlock()
const res = await fetch({
  url: 'https://sdk.wepin.io/v1/wallet/pin/change'
  body: {
    userId: await getUserId(),
    walletId: await getWalletId(),
    UVD: pinBlock.UVD,
    newUVD: pinBlock.newUVD,
    hint: pinBlock.hint,
    otpCode: {
      code: pinBlock.otp
    }
  }
})
```

### Open OTP for failed verify otp
- [generateAuthOTP](../classes/_wepin_pin_js.WepinPin.html#generateAuthOTP)
```typescript
let res = await getWepinSignMessage(pinBlocks.UVDs, pinBlock.otp)
if (res.body[0].message === 'OTP_MISMATCH_WRONG_CODE') {
  const otp = await wepinPin.generateAuthOTP()
  res = await getWepinSignMessage(pinBlocks.UVDs, otp.code)
}
```

### finalize
```js
wepinPin.finalize()
```

The `finalize()` method finalizes the WepinPin.
