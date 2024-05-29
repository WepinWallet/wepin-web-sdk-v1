# 🚀 Wepin Login Library Migration Guide 
To take advantage of the latest features offered by Wepin, you'll need to migrate from the existing `@wepin/login` to `@wepin/login-js`. Follow the steps below to update your setup.

 - Legacy Packages: [@wepin/login](https://www.npmjs.org/package/@wepin/login)
  
 - Updated package: [@wepin/login-js](https://www.npmjs.org/package/@wepin/login-js)
  
## 1. Install the New Package
First, remove the existing `@wepin/login` package and install `@wepin/login-js`.

```bash
# Remove the existing package
npm uninstall @wepin/login

# Install the new package
npm install @wepin/login-js
```

## 2. Update Your Code
Change all import statements that reference `@wepin/login` to `@wepin/login-js`.

```javascript
// Previous code
import '@wepin/login';

// Updated code
import { WepinLogin } from '@wepin/login-js';
```

## 3. Major Changes
Review the significant changes in the new SDK and modify your code accordingly. Here are some examples:

### 3.1 Initialization
Compare the old and new initialization methods.

```javascript
// Previous code
const wepinLogin = window.WepinLogin

// Updated code
const wepinLogin = new WepinLogin({
    appId: 'your-wepin-app-id',
    appKey: 'your-wepin-api-key',
})
await wepinLogin.init('ko')
```

## 4. Testing
Once you have completed all the code changes, test your application to ensure all features are working correctly. 

## 5. Refer to the Documentation
For further changes and detailed information, refer to the official documentation of `@wepin/login-js`.

> [@wepin/login-js Documentation](https://github.com/WepinWallet/wepin-web-sdk-v1/blob/main/packages/login/README.md)

By following this guide, you should be able to successfully migrate from `@wepin/login` to `@wepin/login-js`. If you have any additional questions or need further assistance, please contact the support team at wepin.contact@iotrust.kr.