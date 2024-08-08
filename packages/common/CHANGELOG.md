## [Version 0.0.4](https://www.npmjs.com/package/@wepin/common/v/0.0.4) (2024-08-08)

#### Updates:
  - Added ESM and CJS exports for better module compatibility.
  - Support Japanese

## [Version 0.0.3](https://www.npmjs.com/package/@wepin/common/v/0.0.3) (2024-07-19)

#### Updates:
    - WebviewEventHandler
      - Fix `checkValidEvent` function to be received in constructor instead of `getEventListenerFunction`
      - Adding Global Event Handlers
      - Separate the makeWepinResponseMessage function
    - Add Proisable
    - Remove SafeEventEmitter

## [Version 0.0.2](https://www.npmjs.com/package/@wepin/common/v/0.0.2) (2024-07-17)

#### Updates:
    - Updated `IWepinUser` type to include the `token` property:
      - The `token` property contains the user's accessToken and refreshToken from Wepin.