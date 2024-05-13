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


# @wepin/fetch-js

[![npm version](https://img.shields.io/npm/v/@wepin/fetch-js?style=for-the-badge)](https://www.npmjs.org/package/@wepin/fetch-js). [![npm downloads](https://img.shields.io/npm/dt/@wepin/fetch-js.svg?label=downloads&style=for-the-badge)](https://www.npmjs.org/package/@wepin/fetch-js)

Wepin Fetch Library from Web. This package is exclusively available for use in web environments.

## ⏩ Install

```
npm install @wepin/fetch-js
```
or
```
yarn add @wepin/fetch-js
```

## ⏩ Import SDK
```js
import { WepinFetch } from '@wepin/fetch-js'
```

## ⏩ Initialize
```js
const wepinFetch = new WepinFetch({
    appId: 'wepinAppId',
    appKey: 'wepinAppKey',
    domain: 'wepinDomain',
    sdk: {version, type}
})

await wepinFetch.init()
```

## ⏩ wepinApi
### user
### account
### wallet
### nft
### transaction
### balance
### app

## ⏩ wepinFirebaseApi
### 
