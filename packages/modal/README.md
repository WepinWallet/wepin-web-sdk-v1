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


# @wepin/modal-js

[![npm version](https://img.shields.io/npm/v/@wepin/modal-js?style=for-the-badge)](https://www.npmjs.org/package/@wepin/modal-js) [![npm downloads](https://img.shields.io/npm/dt/@wepin/modal-js.svg?label=downloads&style=for-the-badge)](https://www.npmjs.org/package/@wepin/modal-js)

The Wepin Modal Library is designed for web environments. This package is not available for other platforms.

## ⏩ Installation
To install the Wepin Modal Library, you can use npm or yarn:
```bash
npm install @wepin/modal-js
```
or
```bash
yarn add @wepin/modal-js
```

## ⏩ Import Wepin Modal Library
```js
import { WepinModal } from '@wepin/modal-js'

const wepinModal = new WepinModal()
```
With the Wepin Modal Library imported, you can now use the WepinModal instance to call various methods.

## ⏩ Methods


### openModal

```javascript
await wepinModal.openModal(url, EL, options?)
```

This method opens a Wepin modal iframe with the provided URL. The `EL` parameter is a function that handles postMessage events. The `options` parameter is an optional object that can be used to customize the modal's behavior.

#### Parameters

- `url` \<string> - The URL to be loaded in the Wepin modal iframe.
- `EL` \<Function> - The function to handle postMessage events from the iframe.
- `options` \<object> __optional__ - settings for the modal. Currently supports:
  -  `isHide` \<boolean> - If true, the modal will be hidden initially

#### Returns
- `WidgetFrame` - The frame of the opened modal.

#### Example

```javascript
await wepinModal.openModal('wepin url', (event)=>{})
```

### closeModal

```javascript
await wepinModal.closeModal()
```

If the iframe Wepin modal is open, this method will close it.

#### Parameters

- void

#### Example

```javascript
await wepinModal.closeModal()
```

### openAuthBrowser

```javascript
await wepinModal.openAuthBrowser(url, EL)
```

This method opens a new window for the Wepin browser to handle OAuth provider login.

#### Parameters

- `url` \<string> -  The URL to open in the Wepin browser.
- `EL` \<Function> - The postMessage event handler.

#### Returns
- `WidgetWindow` - The browser of the opened window.

#### Example

```javascript
await wepinModal.openAuthBrowser('wepin url', (event)=>{})
```

### closeAuthBrowser

```javascript
await wepinModal.closeAuthBrowser()
```

This method closes the Wepin browser window that was previously opened for OAuth provider login.

#### Parameters

- void

#### Example

```javascript
await wepinModal.closeAuthBrowser()
```
