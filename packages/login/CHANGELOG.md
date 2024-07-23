## [Version 0.0.9](https://www.npmjs.com/package/@wepin/login-js/v/0.0.9) (2024-07-23)

#### package update:
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

#### Bug Fixes:

- Set the build target to `es2015`.
- Moved all dependencies to devDependencies.
- Updated `@wepin/fetch-js` module to v0.0.4.
- Updated `@wepin/modal-js` module to v0.0.2.
- Updated `@wepin/storage-js` module to v0.0.3.

## [Version 0.0.3](https://www.npmjs.com/package/@wepin/login-js/v/0.0.3) (2024-05-22)

#### Bug Fixes:

- Updated `@wepin/fetch-js` module to v0.0.2.
- Added `walletID`into response of `loginWepin` method.

## [Version 0.0.2](https://www.npmjs.com/package/@wepin/login-js/v/0.0.2) (2024-05-16)

#### Bug Fixes:

- Fixed email regular expression error.
