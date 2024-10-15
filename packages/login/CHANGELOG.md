## [Version 0.0.18](https://www.npmjs.com/package/@wepin/login-js/v/0.0.18) (2024-10-15)

#### Bug Fixes:
- Fixed a type issue in the parameter of the loginWepin method.​

## [Version 0.0.17](https://www.npmjs.com/package/@wepin/login-js/v/0.0.17) (2024-10-11)

#### Package Updates:
 - Updated `@wepin/common` package to v0.0.17.
 - Updated `@wepin/fetch-js` package to v0.0.17.
 - Updated `@wepin/storage-js` package to v0.0.17.

#### Updates:
 - Added support for Facebook and Line login.
 - Added `LoginErrorResult` as a return type for the `loginWithOauthProvider`, `loginWithIdToken`, and `loginWithAccessToken` methods.
 - monorepo package version synchronization


#### New Features:
  - Added `sendVerifyEmail` method:
    - This method allows registering an email and requesting email verification.

## [Version 0.0.13](https://www.npmjs.com/package/@wepin/login-js/v/0.0.13) (2024-10-04)

#### Updates:
  - Added UMD build format to support script (CDN) distribution via Vite.

## [Version 0.0.12](https://www.npmjs.com/package/@wepin/login-js/v/0.0.12) (2024-08-09)

#### Updates:
  - fix `Error: Default condition should be last one`

## [Version 0.0.11](https://www.npmjs.com/package/@wepin/login-js/v/0.0.11) (2024-08-08)

#### Package Updates:
 - Updated `@wepin/fetch-js` package to v0.0.10.
 - Updated `@wepin/storage-js` package to v0.0.7.

## [Version 0.0.10](https://www.npmjs.com/package/@wepin/login-js/v/0.0.10) (2024-08-08)

#### Updates:
  - Added ESM and CJS exports for better module compatibility.
  - Support Japanese

#### Package Updates:
 - Updated `@wepin/common` package to v0.0.4.
 - Updated `@wepin/storage-js` package to v0.0.6.

## [Version 0.0.9](https://www.npmjs.com/package/@wepin/login-js/v/0.0.9) (2024-07-23)

#### Package Updates:
 - Updated `@wepin/common` package to v0.0.3.
 - Updated `@wepin/fetch-js` package to v0.0.8.
 - Updated `@wepin/modal-js` package to v0.0.5.
 - Updated `@wepin/storage-js` package to v0.0.5.

#### Refactoring
  - Change to use the WebviewRequestHandler from @wepin/common
  
## [Version 0.0.8](https://www.npmjs.com/package/@wepin/login-js/v/0.0.8) (2024-07-17)

#### New Features
  - Added `getRefreshFirebaseToken` method:
    - Retrieves the current Firebase token's information from Wepin, including idToken and refreshToken.
  - Added `getCurrentWepinUser` method:
    - Retrieves the current logged-in user's information from Wepin, including user details, login status, and tokens.

## [Version 0.0.7](https://www.npmjs.com/package/@wepin/login-js/v/0.0.7) (2024-07-15)

#### Bug Fixes:
 - Corrected a typo in `LocaleTpe` to `LocaleType`.

## [Version 0.0.6](https://www.npmjs.com/package/@wepin/login-js/v/0.0.6) (2024-07-12)

#### Breaking Changes:
 - Build Process: Switched from Vite bundling to SWC compilation for improved performance and build speed.

## [Version 0.0.5](https://www.npmjs.com/package/@wepin/login-js/v/0.0.5) (2024-07-04)

#### Bug Fixes:
- Fix Typo in `IWepinUser` Type Definition
  - Corrected a typo in the `IWepinUser` type definition.
  
## [Version 0.0.4](https://www.npmjs.com/package/@wepin/login-js/v/0.0.4) (2024-06-26)

#### Package Updates:
- Updated `@wepin/fetch-js` module to v0.0.4.
- Updated `@wepin/modal-js` module to v0.0.2.
- Updated `@wepin/storage-js` module to v0.0.3.

#### Bug Fixes:
- Set the build target to `es2015`.
- Moved all dependencies to devDependencies.

## [Version 0.0.3](https://www.npmjs.com/package/@wepin/login-js/v/0.0.3) (2024-05-22)

#### Package Updates:
- Updated `@wepin/fetch-js` module to v0.0.2.

#### Bug Fixes:
- Added `walletID`into response of `loginWepin` method.

## [Version 0.0.2](https://www.npmjs.com/package/@wepin/login-js/v/0.0.2) (2024-05-16)

#### Bug Fixes:

- Fixed email regular expression error.
