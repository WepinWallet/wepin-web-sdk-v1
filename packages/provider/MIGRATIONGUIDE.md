# 🚀 Wepin Web3 Provider Migration Guide
To take advantage of the latest features offered by Wepin, you'll need to migrate from the existing `@wepin/widget-sdk` to `@wepin/provider-js`. Follow the steps below to update your setup.

 - Legacy Packages: [@wepin/widget-sdk](https://www.npmjs.org/package/@wepin/widget-sdk)
  
 - Updated package: [@wepin/provider-js](https://www.npmjs.org/package/@wepin/provider-js)

## 1. Install the New Package
The existing Wepin Web3 provider was included in the `@wepin/widget-sdk` package but has now been separated into `@wepin/provider-js`. First, remove the existing `@wepin/widget-sdk` package and install `@wepin/provider-js`. (Note: @wepin/provider-js should be used after logging in through the `@wepin/sdk-js` package or RESTful API.)

```bash
# Remove the existing package
npm uninstall @wepin/widget-sdk

# Install the new package
npm install @wepin/provider-js
```

## 2. Update Your Code
Change all import statements that reference `@wepin/widget-sdk` to `@wepin/provider-js`.

```javascript
// Previous code
import '@wepin/widget-sdk';

// Updated code
import { WepinProvider } from '@wepin/provider-js';
```

## 3. Major Changes
Review the significant changes in the new SDK and modify your code accordingly. Here are some examples:

### 3.1 Initialization
Compare the old and new initialization methods.

```javascript
// Previous code
const wepin = window.Wepin
const provider = wepin.getProvider({
      network: AvailableNetworks.value[0].network,
    })

// Updated code
const wepinProvider = new WepinProvider({
    appId: 'your-wepin-app-id',
    appKey: 'your-wepin-api-key',
})
await wepinProvider.init({
    defaultLanguage: 'ko',
    defaultCurrency: 'KRW',
});
const provider = await WepinProvider.getProvider({
      network: AvailableNetworks.value[0].network,
    })
```

## 4. Testing
Once you have completed all the code changes, test your application to ensure all features are working correctly. 

## 5. Refer to the Documentation
For further changes and detailed information, refer to the official documentation of `@wepin/provider-js`.

> [@wepin/provider-js Documentation](https://github.com/WepinWallet/wepin-web-sdk-v1/blob/main/packages/provider/README.md)

By following this guide, you should be able to successfully migrate from `@wepin/widget-sdk` to `@wepin/provider-js`. If you have any additional questions or need further assistance, please contact the support team at wepin.contact@iotrust.kr.