## [Version 0.0.4](https://www.npmjs.com/package/@wepin/sdk-js/v/0.0.4) (2024-05-29)

#### New Features:
- Added a new `register` Method:
  - Usage:
  ```js
  await wepinSdk.register()
  ```
  - Details:
    - Register the user with Wepin.
    - After joining and logging in, the Register page of the Wepin widget opens and registers (wipe and account creation) the Wepin service.
    - Available only if the life cycle of the WepinSDK is `login_before_register`.
    - After calling the `loginWepin()` method in `@wepin/login-js`, if the loginStatus value in the userStatus is not 'complete', this method must be called. 

#### Breaking Changes:

- Added `userStatus` value to `IWepinUser` type, which is the response of `loginWithUI` and `register` methods
 ```diff
 
 interface IWepinUser = {
  ...  
+ userStatus : {
+   loginStatus: 'complete'|'registerRequired'|'pinRequired',
+   pinRequired?: boolean    
+} 
 }
 ```

## [Version 0.0.3](https://www.npmjs.com/package/@wepin/sdk-js/v/0.0.3) (2024-05-22)

#### Breaking Changes:

- `register` Method Removal:
  - The `register` method has been completely removed from the `@wepin/sdk-js`.

#### Bug Fixes:

- Added to use email login only if empty array is used for parameter value `loginProvider` in `init` method.
- Updated `@wepin/fetch-js` module to v0.0.2.
- Fixed Login Status Comparison Error.


## ~~[Version 0.0.2](https://www.npmjs.com/package/@wepin/sdk-js/v/0.0.2) (2024-05-16)~~ - deprecated

## ~~[Version 0.0.1](https://www.npmjs.com/package/@wepin/sdk-js/v/0.0.1) (2024-05-13)~~ - deprecated