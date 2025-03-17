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

# @wepin/sdk-js

[![npm version](https://img.shields.io/npm/v/@wepin/sdk-js?style=for-the-badge)](https://www.npmjs.org/package/@wepin/sdk-js) [![npm downloads](https://img.shields.io/npm/dt/@wepin/sdk-js.svg?label=downloads&style=for-the-badge)](https://www.npmjs.org/package/@wepin/sdk-js)

The Wepin SDK is designed for use in both Web environments. This package is exclusively available for use in web environments.

> ⚠️ **Notice:**
>
> This package is **only available for web environments** and cannot be used in Android or iOS hybrid apps (Webview).
>
> If you are using this package in a Server Side Rendering (SSR) environment, make sure to load the package only on the Client Side Rendering (CSR) side.
>
> Please refer to the following code for implementation:
>
> ```js
> const initWepinSDK = async () => {
>   const { WepinSDK } = await import('@wepin/sdk-js')
>   const wepinSDK = new WepinSDK({
>     appKey: '',
>     appId: '',
>   })
>   await wepinSDK.init()
> }
> ```

## ⏩ Document

[![typedoc](https://img.shields.io/badge/typedoc-blue?style=for-the-badge)](https://wepinwallet.github.io/wepin-web-sdk-v1/modules/_wepin_sdk_js.html)

## ⏩ Get App ID and Key

After signing up for [Wepin Workspace](https://workspace.wepin.io/), go to the development tools menu and enter the information for each app platform to receive your App ID and App Key.

## ⏩ Install

To install the Wepin Widget SDK, you can use npm, yarn, or a CDN:
Using npm:

```
npm install @wepin/sdk-js
```

Using yarn:

```
yarn add @wepin/sdk-js
```

Using CDN:
You can also include the library directly via CDN by adding the following script tag to your HTML file:

```html
<script src="https://cdn.jsdelivr.net/npm/@wepin/sdk-js/dist/umd/wepin-widget-sdk.umd.js"></script>
```

## ⏩ Import SDK

Using npm or yarn:

```js
import { WepinSDK } from '@wepin/sdk-js'
```

Using CDN:

```js
const { WepinSDK } = window.WepinWidgetSDK
```

## ⏩ Initialize

Create a new instance of `WepinSDK` and initialize it with your application's ID and key:

```js
const wepinSdk = new WepinSDK({
  appId: 'your-wepin-app-id',
  appKey: 'your-wepin-app-key',
})
```

### init

```js
await wepinSdk.init(attributes?)
```

#### Parameters

- `attributes` \<IWepinSDKAttributes> **optional**
  - `type`: This determines how the widget is displayed when Wepin is initiated. The default value is `'hide'` and currently, only 'hide' is supported.
  - `defaultLanguage`: - `defaultLanguage`: The language to be displayed on the widget (default: `'en'`)
    Currently, only `ko`, `en`, and `ja` are supported.
  - `defaultCurrency`: The currency to be displayed on the widget (default: `'USD'`)
    Currently, only `'KRW'`,`'USD'` and `'JPY'` are supported.
  - `loginProviders`: **optional** An array of login providers to configure the widget.
    - If not provided, all available login providers will be displayed on the widget.
    - If an empty array is provided, only the email login function is available. (from version `v0.0.3`)

#### Example

```js
await wepinSdk.init({
  type: 'hide',
  defaultLanguage: 'ko',
  defaultCurrency: 'KRW',
})

// google, apple login
await wepinSdk.init({
  type: 'hide',
  defaultLanguage: 'ko',
  defaultCurrency: 'KRW',
  loginProviders: ['google', 'apple'],
})

// only email login
await wepinSdk.init({
  type: 'hide',
  defaultLanguage: 'ko',
  defaultCurrency: 'KRW',
  loginProviders: [],
})
```

### isInitialized

```js
wepinSdk.isInitialized()
```

The `isInitialized()` method checks Wepin SDK is initialized.

#### Returns

- \<boolean>
  - true if Wepin SDK is already initialized.

### changeLanguage

```javascript
wepinSdk.changeLanguage({ language, currency })
```

Change the language and currency of the widget.

#### Parameters

- `language` \<string> - The language to be displayed on the widget. Currently, only `'ko'`, `'en'` and `'ja'` are supported.
- `currency` \<string> - The currency to be displayed on the widget. Currently, only `'KRW'`, `'USD'` and `'JPY'` are supported.

#### Returns

- void

#### Example

```javascript
wepinSdk.changeLanguage({
  currency: 'KRW',
  language: 'ko',
})
```

## ⏩ Method

Methods can be used after initialization of Wepin SDK.

### getStatus

```javascript
await wepinSdk.getStatus()
```

Returns lifecycle of wepin.

#### Parameters

- void

#### Returns

- Promise\<WepinLifeCycle>
  - The lifecycle of the wepin is defined as follows.
    - `'not_initialized`': if wepin is not initialized
    - `'initializing'`: if wepin is initializing
    - `'initialized'`: if wepin is initialized
    - `'before_login'`: if wepin is initialized but the user is not logged in
    - `'login'`: if the user is logged in
    - `'login_before_register'`: if the user is logged in but the user is NOT registered in wepin

#### Example

```javascript
const status = await wepinSdk.getStatus()
```

### openWidget

```javascript
await wepinSdk.openWidget()
```

The `openWidget()` method displays the Wepin widget. If a user is not logged in, the widget will not open. Therefore, you must log in to Wepin before using this method. To log in to Wepin, use the `loginWithUI` method or the `loginWepin` method from the [@wepin/login-js](https://www.npmjs.com/package/@wepin/login-js).

#### Parameters

- void

#### Returns

- Promise \<void>

#### Example

```javascript
await wepinSdk.openWidget()
```

### closeWidget

```javascript
wepinSdk.closeWidget()
```

The `closeWidget()` method closes Wepin widget.

#### Parameters

- void

#### Returns

- void

#### Example

```javascript
wepinSdk.closeWidget()
```

### loginWithUI

```javascript
await wepinSdk.loginWithUI({email}?)
```

The `loginWithUI()` method returns the information of the user who is logged in. If no user is logged in, the Wepin widget will display a login page. To perform a login without the widget, use the `loginWepin()` method from `@wepin/login-js` instead.

#### Parameters

- `email` \<string> **optional**
  - The `email` parameter allows users to log in using the specified email address, providing access to the login service.

#### Returns

- Promise\<IWepinUser>
  - status \<'success'|'fail'>
  - userInfo \<object> **optional**
    - userId \<string>
    - email \<string>
    - provider \<'google'|'apple'|'naver'|'discord'|'email'|'external_token'>
    - use2FA \<boolean>
  - userStatus: \<object> - The user's status of wepin login. including:
    - loginStatus: \<'complete' | 'pinRequired' | 'registerRequired'> - If the user's loginStatus value is not complete, it must be registered in the wepin.
    - pinRequired?: <boolean>
  - token: \<object> - The user's token of wepin. including:
    - accessToken: \<string> - The access token.
    - refreshToken: \<string> - The refresh token.
  - walletId \<string>

#### Example

```javascript
//without email
const userInfo = await wepinSdk.loginWithUI()
//with email
const userInfo = await wepinSdk.loginWithUI({ email })
```

- response

```json
{
  "status": "success",
  "userInfo": {
    "userId": "120349034824234234",
    "email": "abc@gmail.com",
    "provider": "google",
    "use2FA": true
  }
}
```

### register

```javascript
await wepinSdk.register()
```

Register the user with Wepin.
After joining and logging in, the Register page of the Wepin widget opens and registers (wipe and account creation) the Wepin service.
Available only if the life cycle of the WepinSDK is `login_before_register`.
After calling the `loginWepin()` method in `@wepin/login-js`, if the loginStatus value in the userStatus is not 'complete', this method must be called.

#### Parameters

- void

#### Returns

- Promise\<IWepinUser>
  - status \<'success'|'fail'>
  - userInfo \<object> **optional**
    - userId \<string>
    - email \<string>
    - provider \<'google'|'apple'|'naver'|'discord'|'email'|'external_token'>
    - use2FA \<boolean>
  - userStatus: \<object> - The user's status of wepin login. including:
    - loginStatus: \<'complete' | 'pinRequired' | 'registerRequired'> - If the user's loginStatus value is not complete, it must be registered in the wepin.
    - pinRequired?: <boolean>
  - token: \<object> - The user's token of wepin. including:
    - accessToken: \<string> - The access token.
    - refreshToken: \<string> - The refresh token.
  - walletId \<string>

#### Exception

#### Example

```javascript
const userInfo = await wepinSdk.register()
```

### registerUserEmail

```js
await wepinSdk.registerUserEmail(param)
```

The registerUserEmail function registers an email for accounts from OAuth providers that do not already have an email associated with them.

#### Supported Version

Supported in version `0.0.18` and later

#### Parameters

- provider \<LoginProviders> - Provider for Firebase login. The value must be one of the supported login provider names in lowercase, such as 'google', 'naver', 'discord', 'apple', 'facebook', or 'line'. Please refer to Wepin Social Login Auth Provider documentation to check the supported login providers.
- idToken \<string> - id token value to be used for login
- accessToken \<string> - access token value to be used for login

#### Return Value

- Promise\<IWepinUser>
  - status \<'success'|'fail'>
  - userInfo \<object> **optional**
    - userId \<string>
    - email \<string>
    - provider \<'google'|'apple'|'naver'|'discord'|'email'|'external_token'>
    - use2FA \<boolean>
  - userStatus: \<object> - The user's status of wepin login. including:
    - loginStatus: \<'complete' | 'pinRequired' | 'registerRequired'> - If the user's loginStatus value is not complete, it must be registered in the wepin.
    - pinRequired?: <boolean>
  - token: \<object> - The user's token of wepin. including:
    - accessToken: \<string> - The access token.
    - refreshToken: \<string> - The refresh token.
  - walletId \<string>

#### Example

```js
await wepinSdk.registerUserEmail({
  provider: 'google',
  idToken: 'google-idToken',
})
```

### getLoginSession

```js
await wepinSdk.getLoginSession(prevToken)
```

The `getLoginSession` method retrieves and refreshes the Firebase authentication token. If a previous token is provided, it updates the stored token before returning the latest authentication details.

#### Parameters

- prevToken \<object> **optional** - A previously issued token. This token represents the user's authenticated session. If provided, it updates the stored Firebase token with prevToken before returning the token information. including:
  - firebaseToken\<IFirebase> - The user's token of firebase
    - provider\<string> - The authentication provider (e.g., google, apple).
    - idToken\<string> - The Firebase authentication ID token.
    - refreshToken\<string> - The refresh token used to obtain a new ID token when expired.
  - wepinToken\<IWepinToken> - The user's token of wepin.
    - accessToken\<string> - The access token.
    - refreshToken\<string> - The refresh token.

#### Return Value

- Promise\<object>
  - firebaseToken\<IFirebase> - The user's token of firebase. including:
    - provider\<string> - The authentication provider (e.g., google, apple).
    - idToken\<string> - The Firebase authentication ID token.
    - refreshToken\<string> - The refresh token used to obtain a new ID token when expired.
  - wepinToken\<IWepinToken> - The user's token of wepin. including:
    - accessToken\<string> - The access token.
    - refreshToken\<string> - The refresh token.

#### Example

```js
const prevToken = await wepinSdk.getLoginSession()
const newToken = await wepinSdk.getLoginSession(prevToken)
```

### logout

```js
await wepinSdk.logout()
```

The `logout()` method performs a wepin logout.

#### Parameters

- void

#### Returns

- Promise \<void>

### getAccounts

```js
await wepinSdk.getAccounts()
await wepinSdk.getAccounts(options?)
```

The `getAccounts()` method returns user accounts. It is recommended to use `getAccounts()` method without argument to get all user accounts. It can be only usable after widget login.

##### Parameters

- options:
  - networks: \<Array> **optional** A list of network names to filter the accounts.
    - network \<string> **optional**
  - withEoa: \<boolean> **optional** If AA accounts are included, whether to include EOA accounts

#### Returns

- Promise \<Account[]> - A promise that resolves to an array of the user's accounts.
  - address \<string>
  - network \<string>
  - contract \<string> **optional** token contract address.
  - isAA \<boolean> **optional** Whether it is aa account or not

#### Example

```js
const result = await wepinSdk.getAccounts({
  networks: ['Ethereum'],
  withEoa: true,
})
```

- response

```json
[
  {
    "address": "0x0000001111112222223333334444445555556666",
    "network": "Ethereum"
  },
  {
    "address": "0x0000001111112222223333334444445555556666",
    "network": "Ethereum",
    "contract": "0x777777888888999999000000111111222222333333"
  },
  {
    "address": "0x4444445555556666000000111111222222333333",
    "network": "Ethereum",
    "isAA": true
  }
]
```

### getBalance

```js
await wepinSdk.getBalance(accounts)
await wepinSdk.getBalance()
```

It returns the account's balance information. It can be only usable after widget login. It use `getBalance()` method without argument to get all user accounts.

#### Parameters

- accounts \<Account[]> **optional**
  - network \<string>
  - address \<string>
  - isAA \<boolean> **optional** Whether it is aa account or not

#### Returns

- Promise \<AccountBalanceInfo[]>
  - network \<string>
  - address \<string>
  - symbol \<string> - symbol of account
  - balance \<string> - balance of account
  - tokens \<Array\<TokenBalanceInfo>> - token balance information for account
    - symbol \<string> - token symbol
    - balance \<string> - token balance
    - contract \<string> - token contract address

#### Example

```js
const result = await wepinSdk.getBalance([
  {
    address: '0x0000001111112222223333334444445555556666',
    network: 'Ethereum',
  },
])
```

- response

```json
[
  {
    "network": "Ethereum",
    "address": "0x0000001111112222223333334444445555556666",
    "symbol": "ETH",
    "balance": "1.1",
    "tokens": [
      {
        "contract": "0x123...213",
        "symbol": "TEST",
        "balance": "10"
      }
    ]
  }
]
```

### send

```js
await wepinSdk.send({account, txData?})
```

It returns the sent transaction id information. It can be only usable after widget login.

#### Parameters

- account \<Account>
  - network \<string>
  - address \<string>
- txData \<object> **optional**
  - to \<string>
  - amount \<string>

#### Returns

- Promise \<object>
  - txId \<string>

#### Example

```js
const result = await wepinSdk.send({
  account: {
    address: '0x0000001111112222223333334444445555556666',
    network: 'Ethereum',
  },
  txData: {
    to: '0x9999991111112222223333334444445555556666',
    amount: '0.1',
  },
})
```

- response

```json
{
  "txId": "0x76bafd4b700ed959999d08ab76f95d7b6ab2249c0446921c62a6336a70b84f32"
}
```

### finalize

```js
await wepinSdk.finalize()
```

The `finalize()` method finalizes the Wepin SDK.

#### Parameters

- Promise\<void>
-

#### Returns

- void

#### Example

```js
await wepinSdk.finalize()
```

## ⏩ WepinSDK Events Registration

Registering WepinSDK events allows you to trigger responses based on changes in the user's connection status. WepinSDK triggers specific events such as `wepinLifeCycleChange`, `send_in_process`, `send_complete`, and more. Generally, this is not a mandatory step and is only performed when necessary.

### on(EVENT, CALLBACK)

WepinSDK defines the following events to monitor state changes.

#### Events

| Event Name             | WEPIN_SDK_EVENTS                          | Event Text             | Description                                      |
| ---------------------- | ----------------------------------------- | ---------------------- | ------------------------------------------------ |
| `wepinLifeCycleChange` | `WEPIN_SDK_EVENTS.WEPIN_LIFECYCLE_CHANGE` | “wepinLifeCycleChange” | Triggered when the lifeCycle of WepinSDK changes |
| `send_in_process`      | `WEPIN_SDK_EVENTS.SEND_IN_PROGRESS`       | send_in_progress       | Triggered when a send is in progress             |
| `send_complete`        | `WEPIN_SDK_EVENTS.SEND_COMPLETE`          | send_complete          | Triggered when a send is complete                |

#### Example

```js
import { WEPIN_SDK_EVENTS, WepinLifeCycle, IWepinUser, WepinSDK } from "@wepin/sdk-js";

const subscribeWepinEvents = (wepinSDK: WepinSDK) => {
  wepinSDK.on(
    WEPIN_SDK_EVENTS.WEPIN_LIFECYCLE_CHANGE,
    (lifecycle: WepinLifeCycle, userInfo?: IWepinUser) => {
      console.log('wepinLifeCycleChange', lifecycle)
      if (lifecycle == 'login' || lifecycle === 'login_before_register') {
        console.log('userInfo', userInfo)
      }
    }
  )
  wepinSDK.on(WEPIN_SDK_EVENTS.SEND_IN_PROGRESS, () => {
    console.log('send_in_progress')
  })
  wepinSDK.on(
    WEPIN_SDK_EVENTS.SEND_COMPLETE,
    (success: boolean, message?: string) => {
      if (success) {
        console.log('send_complete: success', message)
      } else {
        console.log('send_complete: failure', message)
      }
    }
  )
}
```
