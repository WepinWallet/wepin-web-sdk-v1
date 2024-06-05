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


# @wepin/provider-js

[![npm version](https://img.shields.io/npm/v/@wepin/provider-js?style=for-the-badge)](https://www.npmjs.org/package/@wepin/provider-js) [![npm downloads](https://img.shields.io/npm/dt/@wepin/provider-js.svg?label=downloads&style=for-the-badge)](https://www.npmjs.org/package/@wepin/provider-js)

Wepin Provider V1 for Web. This package is exclusively available for use in web environments.

## ⏩ Get App ID and Key
After signing up for [Wepin Workspace](https://workspace.wepin.io/), go to the development tools menu and enter the information for each app platform to receive your App ID and App Key.

Wepin supports providers that return JSON-RPC request responses to connect with blockchain networks in webs. With Wepin Provider, you can easily connect to various networks supported by Wepin.

The providers supported by Wepin are as follows.

- EVM compatible Networks
- Klaytn Network 


## EVM compatible Networks
Ethers.js or Web3.js can be used with Wepin Provider to interoperate with EVM compatible blockchains.
### Support Networks

Please refer to the following link for detailed information on the supported network list:
[wepin provider - supported network list](https://htmlpreview.github.io/?https://github.com/WepinWallet/wepin-web-sdk-v1/blob/main/packages/provider/assets/supportedNetworkTable.html)


## ⏩ Install

```
npm install @wepin/provider-js
```
or
```
yarn add @wepin/provider-js
```

## ⏩ Import SDK
```js
import { WepinProvider } from '@wepin/provider-js'
```

## ⏩ Initialize
```js
const wepinProvider = new WepinProvider({
    appId: 'wepinAppId',
    appKey: 'wepinAppKey',
})
```

### init
```js
await wepinProvider.init(attributes?)
```
#### Parameters
- `attributes` \<object> __optional__
    - `defaultLanguage`: The language to be displayed on the widget (default: `'ko'`)
Currently, only `'ko'` and `'en'` are supported.
    - `defaultCurrency`: The currency to be displayed on the widget (default: `'KRW'`)

#### Example
```js
await wepinProvider.init({
    defaultLanguage: 'ko',
    defaultCurrency: 'KRW',
})
```
### isInitialized
```js
wepinProvider.isInitialized()
```
The `isInitialized()` method checks Wepin Provider is initialized.

#### Returns
- \<boolean>
    - true if Wepin Provider is already initialized.

### changeLanguage
```javascript
wepinProvider.changeLanguage(attributes)
```

Change the language and currency of the widget.

#### Parameters
- `attributes` \<object>
  - `language` \<string> - The language to be displayed on the widget. Currently, only `'ko'` and `'en'` are supported.
  - `currency` \<string> - The currency to be displayed on the widget.

#### Returns
- void

#### Example

```javascript
wepinProvider.changeLanguage({
   currency: 'KRW',
   language: 'ko'
})
```

## ⏩ Method
Methods can be used after initialization of Wepin Provider.

### getProvider
```javascript
await wepinProvider.getProvider(network)
```

It returns a Provider by given network

#### Parameters

- `network` \<string> 
  - Available chains Wepin helps provide. It should be lowercase.

#### Returns
- Promise\<BaseProvider> - A EIP-1193 provider

#### Example

```javascript
const provider = await wepinProvider.getProvider('ethereum')
```

### finalize
```js
wepinProvider.finalize()
```

The `finalize()` method finalizes the Wepin Provider.

#### Parameters
 - void
 - 
#### Returns
 - void

#### Example
```js
wepinProvider.finalize()
```
