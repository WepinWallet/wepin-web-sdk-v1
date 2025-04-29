# Version 0.0.34 (2025-04-25)

## @wepin/modal-js

### Bug Fixes:

- Fixed an issue where the scroll behavior became abnormal after widget login.
  - When opening the widget after login, if the widget open/close timing overlaps, the **`meta[viewport]`** and **`body`** overflow values may not reset properly, causing unexpected scroll behavior.

## @wepin/provider-js

### Bug Fixes:

- Removed **`provider_request`** command logic from WepinProvider.

### Updates:

- Applied the latest update of **`@wepin/modal-js`** to dependent packages.

## @wepin/sdk-js

### Bug Fixes:

- Fixed an issue where **`getBalance`** failed to retrieve balances for all accounts.

### Updates:

- Applied the latest update of **`@wepin/modal-js`** to dependent packages.
- Improved **`getBalance`** performance by processing each account balance in parallel.

---



# Version 0.0.33 (2025-03-13)

## @wepin/login-js

### Updates:

- Added prevFBToken parameter to refresh Firebase Token

## @wepin/sdk-js

### Updates:

- Added the `getLoginSession` method to retrieve and refresh Firebase Token

---



# Version 0.0.32 (2025-02-25)

## @wepin/modal-js

### Bug Fixes:

- Fixed **iframe** background color issue when **color-scheme: dark**
  - **Enforced `color-scheme: light`** in **iframe** to ensure dark mode compatibility
  - Set **iframe** background color and removed the existing overlay** **

---



# Version 0.0.31 (2025-02-05)

## @wepin/provider-js

### Updates:

- add kaia Typed Transaction Sign

---



# Version 0.0.30 (2024-12-20)

## @wepin/provider-js

### Updates:

- add solana signAllTransactions
- fix solana signAndSendTransaction parameter

## @wepin/solana-wallet-adapter

### Updates:

- add solana signAllTransactions

---



# Version 0.0.29 (2024-12-16)

## @wepin/login-js

### Updates:

- Made the `sign` parameter optional for both `loginWithIdToken` and `loginWithAccessToken` methods.

---



# Version 0.0.28 (2024-12-13)

- fix get version

~~## [Version 0.0.27] (2024-12-13)~~ (deprecated)

- fix get version

~~## [Version 0.0.26] (2024-12-13)~~ (deprecated)

- change swc config

~~## [Version 0.0.25] (2024-12-12)~~ (deprecated)

- added @wepin/solana-wallet-adapter

## @wepin/provider-js

- support solana VersionedTransaction

---



# Version 0.0.24 (2024-11-18)

## @wepin/pin-js

- fix typescript error

~~## [Version 0.0.23] (2024-11-15)~~ (deprecated)

## @wepin/provider-js

### Updates:

- Specified compatible Node.js versions in `package.json` (”^20.17 || >=22”).

## @wepin/pin-js

### Updates:

- Added the `changeLanguage` method to allow changing the language displayed on the PIN pad screen.

---



# Version 0.0.22 (2024-10-31)

## @wepin/provider-js

- Change eth-json-rpc-middleware to metamask package.

## @wepin/sdk-js

- Fixed issue causing delay in widget opening time.
