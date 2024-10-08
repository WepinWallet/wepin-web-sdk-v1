## [Version 0.0.16](https://www.npmjs.com/package/@wepin/sdk-js/v/0.0.16) (2024-10-04)

#### Updates:
  - Added UMD build format to support script (CDN) distribution via Vite.

## [Version 0.0.15](https://www.npmjs.com/package/@wepin/sdk-js/v/0.0.15) (2024-08-09)

#### Updates:
  - fix `Error: Default condition should be last one`

## [Version 0.0.14](https://www.npmjs.com/package/@wepin/sdk-js/v/0.0.14) (2024-08-08)

#### Package Update:
 - Updated `@wepin/storage-js` package to v0.0.7.
 - Updated `@wepin/fetch-js` package to v0.0.10.
 - 
## [Version 0.0.13](https://www.npmjs.com/package/@wepin/sdk-js/v/0.0.13) (2024-08-08)

#### Updates:
  - Added ESM and CJS exports for better module compatibility.
  - Support Japanese

#### Package Update:
 - Updated `@wepin/common` package to v0.0.4.
 - Updated `@wepin/storage-js` package to v0.0.6.

## [Version 0.0.11](https://www.npmjs.com/package/@wepin/sdk-js/v/0.0.11) (2024-07-23)

#### Package Update:
 - Updated `@wepin/common` package to v0.0.3.
 - Updated `@wepin/fetch-js` package to v0.0.8.
 - Updated `@wepin/modal-js` package to v0.0.5.
 - Updated `@wepin/storage-js` package to v0.0.5.

## [Version 0.0.12](https://www.npmjs.com/package/@wepin/sdk-js/v/0.0.12) (2024-07-23)

#### Bug Fixes:
- Added `bignumber.js` to dependencies.
- 
## [Version 0.0.11](https://www.npmjs.com/package/@wepin/sdk-js/v/0.0.11) (2024-07-23)

#### Package Update:
 - Updated `@wepin/common` package to v0.0.3.
 - Updated `@wepin/fetch-js` package to v0.0.8.
 - Updated `@wepin/modal-js` package to v0.0.5.
 - Updated `@wepin/storage-js` package to v0.0.5.
  
#### Refactoring
 - Change to use the WebviewRequestHandler, Platform from @wepin/common
 - Change to import from SafeEventEmitter npm
  
## ~~[Version 0.0.10](https://www.npmjs.com/package/@wepin/sdk-js/v/0.0.10) (2024-07-23)~~ (deprecated)
 
## [Version 0.0.9](https://www.npmjs.com/package/@wepin/sdk-js/v/0.0.9) (2024-07-22)

#### Package Update:
 - Updated `@wepin/modal-js` package to v0.0.4.

## [Version 0.0.8](https://www.npmjs.com/package/@wepin/sdk-js/v/0.0.8) (2024-07-12)

#### Bug Fixes:
- fixed wepin lifecycle error

#### Breaking Changes:
 - Build Process: Switched from Vite bundling to SWC compilation for improved performance and build speed.

#### New Features:
  - TypeDoc: Applied TypeDoc for generating documentation from TypeScript comments.


## [Version 0.0.7](https://www.npmjs.com/package/@wepin/sdk-js/v/0.0.7) (2024-07-09)

#### New Features:
- WepinSDK Events Registration:
  - New events: `wepinLifeCycleChange`, `send_in_process`, `send_complete`.
  - Functionality to register and handle these events using on(EVENT, CALLBACK).


## [Version 0.0.6](https://www.npmjs.com/package/@wepin/sdk-js/v/0.0.6) (2024-06-26)

#### Bug Fixes:
- remove localhost webview dev

## [Version 0.0.5](https://www.npmjs.com/package/@wepin/sdk-js/v/0.0.5) (2024-06-26)

#### Bug Fixes:

- Set the build target to `es2015`.
- Moved all dependencies to devDependencies.
- Updated `@wepin/fetch-js` module to v0.0.4.
- Updated `@wepin/modal-js` module to v0.0.2.
- Updated `@wepin/storage-js` module to v0.0.3.

## [Version 0.0.4](https://www.npmjs.com/package/@wepin/sdk-js/v/0.0.4) (2024-05-23)

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