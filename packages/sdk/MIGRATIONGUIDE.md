# 🚀 Wepin Widget SDK Migration Guide
To take advantage of the latest features offered by Wepin, you'll need to migrate from the existing `@wepin/widget-sdk` to `@wepin/sdk-js`. Follow the steps below to update your setup.

 - Legacy Packages: [@wepin/widget-sdk](https://www.npmjs.org/package/@wepin/widget-sdk)
  
 - Updated package: [@wepin/sdk-js](https://www.npmjs.org/package/@wepin/sdk-js)


## 1. Install the New Package
First, remove the existing `@wepin/widget-sdk` package and install `@wepin/sdk-js`.

```bash
# Remove the existing package
npm uninstall @wepin/widget-sdk

# Install the new package
npm install @wepin/sdk-js
```
## 2. Update Your Code
Change all import statements that reference `@wepin/widget-sdk` to `@wepin/sdk-js`.

```javascript
// Previous code
import '@wepin/widget-sdk';

// Updated code
import { WepinSDK } from '@wepin/sdk-js';
```

## 3. Major Changes
Review the significant changes in the new SDK and modify your code accordingly. Here are some examples:

### 3.1 Initialization
Compare the old and new initialization methods.

```javascript
// Previous code
const wepin = window.Wepin
await wepin.initialize('your-wepin-app-id', 'your-wepin-api-key'{
    type: 'hide',
    defaultLanguage: 'ko',
    defaultCurrency: 'KRW',
});

// Updated code
const wepin = new WepinSDK({
    appId: 'your-wepin-app-id',
    appKey: 'your-wepin-api-key',
})
await wepin.init({
    type: 'hide',
    defaultLanguage: 'ko',
    defaultCurrency: 'KRW',
});
```

### 3.2 Method Calls
Check if the method calling conventions have changed and update them if necessary.

```javascript
// Previous code
await wepin.login();

// Updated code
await wepin.loginWithUI();
```


## 4. Testing
Once you have completed all the code changes, test your application to ensure all features are working correctly. Pay special attention to key functionalities such as login, logout, and fetching data.

## 5. Refer to the Documentation
For further changes and detailed information, refer to the official documentation of `@wepin/sdk-js`.

> [@wepin/sdk-js Documentation](https://github.com/WepinWallet/wepin-web-sdk-v1/blob/main/packages/sdk/README.md)

By following this guide, you should be able to successfully migrate from `@wepin/widget-sdk` to `@wepin/sdk-js`. If you have any additional questions or need further assistance, please contact the support team at wepin.contact@iotrust.kr.