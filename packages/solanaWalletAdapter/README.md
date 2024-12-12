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

# @wepin/solana-wallet-adapter

[![npm version](https://img.shields.io/npm/v/@wepin/solana-wallet-adapter?style=for-the-badge)](https://www.npmjs.org/package/@wepin/solana-wallet-adapter) [![npm downloads](https://img.shields.io/npm/dt/@wepin/solana-wallet-adapter.svg?label=downloads&style=for-the-badge)](https://www.npmjs.org/package/@wepin/wallet-adpater-wepin)

Wepin Solana Wallet Adapter for Web. This package is exclusively available for use in web environments.

> ⚠️ **Notice:**
>
> This package is **only available for web environments** and cannot be used in Android or iOS hybrid apps (Webview).
>
> If you are using this package in a Server Side Rendering (SSR) environment, make sure to load the package only on the Client Side Rendering (CSR) side.
>
> Please refer to the following code for implementation:
>
> ```js
> import { useMemo } from "react";
> import { WepinWalletAdapter } from '@wepin/solana-wallet-adapter'
> const App = () => {
>   const wallets = useMemo(
>       () => [
>           new WepinWalletAdapter({
>               appId: 'your-app-id',
>               appKey: 'your-app-key',
>               network: 'solana',
>               attributes: {,
>                 defaultLanguage: 'ko',
>                 aultCurrency: 'KRW',
>               }
>           })
>       ],
>       []
>     )
> }
> ```

#### Parameters

- `appId` \<string>
- `appKey` \<string>
- `network` \<string>: The network to connect using the wallet adapte (default: 'solana')
  Currently, only `'solana'`, `'solana-devnet'` are supported.
- `attributes` \<object> **optional**
  - `defaultLanguage`: The language to be displayed on the widget (default: `'en'`)
    Currently, only `'ko'`, `'en'` and `'ja'` are supported.
  - `defaultCurrency`: The currency to be displayed on the widget (default: `'USD'`)
    Currently, only `'KRW'`, `'USD'` and `'JPY'` are supported.

## ⏩ Requirements

- Node version **20.17** or newer is required.

## ⏩ Document

<!-- [![typedoc](https://img.shields.io/badge/typedoc-blue?style=for-the-badge)](https://wepinwallet.github.io/wepin-web-sdk-v1/modules/_wepin_provider_js.html) -->

## ⏩ Get App ID and Key

After signing up for [Wepin Workspace](https://workspace.wepin.io/), go to the development tools menu and enter the information for each app platform to receive your App ID and App Key.

## ⏩ Install

To install the Wepin Provider, you can use npm, yarn, or a CDN:
Using npm:

```
npm install @wepin/solana-wallet-adapter
```

Using yarn:

```
yarn add @wepin/solana-wallet-adapter
```
