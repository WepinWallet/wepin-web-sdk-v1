<br/>

<p align="center">
  <a href="https://www.wepin.io/">
      <picture>
        <source media="(prefers-color-scheme: dark)">
        <img alt="wepin logo" src="./assets/wepin_logo_color.png" width="250" height="auto">
      </picture>
</a>
</p>

<br>


# @wepin/storage-js

[![npm version](https://img.shields.io/npm/v/@wepin/storage-js?style=for-the-badge)](https://www.npmjs.org/package/@wepin/storage-js). [![npm downloads](https://img.shields.io/npm/dt/@wepin/storage-js.svg?label=downloads&style=for-the-badge)](https://www.npmjs.org/package/@wepin/storage-js)

Wepin Storage Library from Web. This package is only available in the web environment.

## ⏩ Install

```
npm install @wepin/storage-js
```
or
```
yarn add @wepin/storage-js
```

## ⏩ Import SDK
```js
WepinStorage from '@wepin/storage-js'
```

## ⏩ Methods


### getLocalStorage

```javascript
WepinStorage.getLocalStorage(appId, name)
```

Returns the value of the specified local storage item.

#### Parameters

- `appId` \<string>
- `name` \<string>

#### Example

```javascript
WepinStorage.getLocalStorage('APP_ID', 'KEY')
```

### getAllLocalStorage

```javascript
WepinStorage.getAllLocalStorage(appId)
```

Returns all local storage data.

#### Parameters

- `appId` \<string>

#### Example

```javascript
WepinStorage.getAllLocalStorage('APP_ID')
```

### setLocalStorage

```javascript
WepinStorage.setLocalStorage(appId, name, value)
```

Sets the value of the specified local storage item.

#### Parameters

- `appId` \<string>
- `name` \<string>
- `value` \<any>

#### Example

```javascript
WepinStorage.setLocalStorage('APP_ID', 'KEY', 'data')
```

### setAllLocalStorage

```javascript
WepinStorage.setAllLocalStorage(appId, values)
```

Sets all local storage data.

#### Parameters

- `appId` \<string>
- `values` \<any>

#### Example

```javascript
WepinStorage.setAllLocalStorage('APP_ID', 'data')
```

### clearLocalStorage

```javascript
WepinStorage.clearLocalStorage(appId, name)
```

Clears the value of the specified local storage item.

#### Parameters

- `appId` \<string>
- `name` \<string>

#### Example

```javascript
WepinStorage.clearLocalStorage('APP_ID', 'KEY')
```

### clearAllLocalStorage

```javascript
WepinStorage.clearAllLocalStorage(appId)
```

Clears all local storage data.

#### Parameters

- `appId` \<string>

#### Example

```javascript
WepinStorage.clearAllLocalStorage('APP_ID')
```

### setLoginUserLocalStorage

```javascript
WepinStorage.setLoginUserLocalStorage(
    appId: string,
    request: {
      provider: string
      token: { idToken: string; refreshToken: string }
    },
    response: any,
  )
```

Sets the user information of the local storage.

#### Parameters

- `appId` \<string>
- `request` \<string> - response of `@wepin/loign-js` methods
- `response` \<string> - response of wepin login api

#### Example

```javascript
import {WepinFetch} from '@wepin/fetch-js'
import {WepinLogin} from '@wepin/login-js'

const wepinLogin = new WepinLogin({
    appId: 'APP_ID',
    appKey: 'APP_KEY',
})
const wepinFetch = new WepinFetch({
    appId: 'APP_ID',
    appKey: 'APP_KEY',
    domain: 'APP_DOMAIN',
    sdk: {version: 'SDK_VERSION', type: "SDK_TYPE"}
})
const req = await wepinLogin.loginWithIdToken({token, sign})
const res = await wepinFetch.wepinApi.user.login({
      idToken: req.token.idToken,
    })
WepinStorage.setLoginUserLocalStorage('APP_ID', req, res)
```
