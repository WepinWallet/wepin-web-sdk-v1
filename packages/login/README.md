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


# @wepin/login-js

[![npm version](https://img.shields.io/npm/v/@wepin/login-js?style=for-the-badge)](https://www.npmjs.org/package/@wepin/login-js) [![npm downloads](https://img.shields.io/npm/dt/@wepin/login-js.svg?label=downloads&style=for-the-badge)](https://www.npmjs.org/package/@wepin/login-js)

Wepin Login Library V1 from Web. This package is exclusively available for use in web environments.

## ⏩ Document
[![typedoc](https://img.shields.io/badge/typedoc-blue?style=for-the-badge)](https://wepinwallet.github.io/wepin-web-sdk-v1/modules/_wepin_login_js.html)

## ⏩ Get App ID and Key
After signing up for [Wepin Workspace](https://workspace.wepin.io/), go to the development tools menu and enter the information for each app platform to receive your App ID and App Key.


## ⏩ Install

```
npm install @wepin/login-js
```
or
```
yarn add @wepin/login-js
```

## ⏩ Import SDK
```js
import { WepinLogin } from '@wepin/login-js'
```

## ⏩ Initialize
```js
const wepinLogin = new WepinLogin({
    appId: 'wepinAppId',
    appKey: 'wepinAppKey',
})
```
### init
```js
await wepinLogin.init(language?)
```
#### Parameters
- `language` \<string> __optional__
  - The language to be displayed on the widget (default: `'ko'`)
Currently, only `'ko'` and `'en'` are supported.

#### Example
```js
await wepinLogin.init('ko')
```

### isInitialized
```js
wepinLogin.isInitialized()
```
The `isInitialized()` method checks Wepin Login Library is initialized.

#### Returns
- \<boolean>
    - true if Wepin Login Library is already initialized.

### changeLanguage
```javascript
wepinLogin.changeLanguage(language)
```

#### Parameters
- `language` \<string>
  - The language to be displayed on the widget.
Currently, only `'ko'` and `'en'` are supported.

#### Returns
- void 

#### Example

```javascript
wepinLogin.changeLanguage('ko')
```

## ⏩ Method
Methods can be used after initialization of Wepin Login Library.

### loginWithOauthProvider
```javascript
await wepinLogin.loginWithOauthProvider(params)
```

A new window will open and proceed to log in to wepin firebase. Returns firebase login info upon successful login.

#### Parameters
- `params` \<object> 
  - `provider` \<'google'|'naver'|'discord'|'apple'> - Provider for Firebase login
  - `withLogout` \<boolean> __optional__ - 

#### Returns
- Promise\<LoginResult>
  - `provider` \<'google'|'apple'|'discord'|'naver'>
  - `token` \<object>
    - `idToken` \<string> - wepin firebase idToken
    - `refreshToken` `<string> - wepin firebase refreshToken

#### Exception
- `Invalid provider`: Incorrect value of provider parameter
- `User canceled` : When the user closes the window during the login process.
- `Internal error` : In others error situations.

#### Example

```javascript
const user = await wepinLogin.loginWithOauthProvider(true)
```
- response
```json
    {
        "provider": "google",
        "token": {
            "idToken": "ab2231df....ad0f3291",
            "refreshToken": "eyJHGciO....adQssw5c",
        }
    }
```
### signUpWithEmailAndPassword
```javascript
await wepinLogin.signUpWithEmailAndPassword(email, password, openWepinWallet?)
```

It signs up on the wepin firebase with your email and password. Returns firebase login info upon successful login.

#### Parameters
- `email` \<string> - User email
- `password` \<string> -  User password
- `openWepinWallet` \<boolean> - __optional__ Whether to open the authentication email sending page of the Wepin Wallet.

#### Returns
- Promise\<LoginResult>
  - `provider` \<'email'>
  - `token` \<object>
    - `idToken` \<string> - wepin firebase idToken
    - `refreshToken` `<string> - wepin firebase refreshToken

#### Exception
- `auth/email-verified`: An authentication email has been sent for registration, and email verification is required.
- `auth/existed-email` : The email is already registered.
- `fail/send-email` : Failed to send authentication email.
- `fail/email-verified` : Email verification failed.
  
#### Example

```javascript
const user = await wepinLogin.signUpWithEmailAndPassword('abc@defg.com', 'abcdef123&')
```
- response
```json
    {
        "provider": "email",
        "token": {
            "idToken": "ab2231df....ad0f3291",
            "refreshToken": "eyJHGciO....adQssw5c",
        }
    }
```

### loginWithEmailAndPassword
```javascript
await wepinLogin.loginWithEmailAndPassword(email, password)
```

It logs in to the Wepin firebase with your email and password. Returns firebase login info upon successful login.

#### Parameters
- `email` \<string> - User email
- `password` \<string> -  User password

#### Returns
- Promise\<LoginResult>
  - `provider` \<'email'>
  - `token` \<object>
    - `idToken` \<string> - wepin firebase idToken
    - `refreshToken` `<string> - wepin firebase refreshToken

#### Example

```javascript
const user = await wepinLogin.loginWithEmailAndPassword('abc@defg.com', 'abcdef123&')
```
- response
```json
    {
        "provider": "email",
        "token": {
            "idToken": "ab2231df....ad0f3291",
            "refreshToken": "eyJHGciO....adQssw5c",
        }
    }
```

### loginWithIdToken
```javascript
await wepinLogin.loginWithIdToken(params)
```

It logs in to the Wepin firebase with external id token. Returns firebase login info upon successful login.

#### Parameters
- `params` \<object> 
  - `token` \<string> - id token value to be used for login 
  - `sign` \<string> - signature value for the token provided as the first parameter.([Signature Generation Methods](./SignatureGenerationMethods.md))


#### Returns
- Promise\<LoginResult>
  - `provider` \<'external_token'>
  - `token` \<object>
    - `idToken` \<string> - wepin firebase idToken
    - `refreshToken` `<string> - wepin firebase refreshToken


#### Example

```javascript
const user = await wepinLogin.loginWithIdToken({
    token:'eyJHGciO....adQssw5c', 
    sign:'9753d4dc...c63466b9'
})
```
- response
```json
    {
        "provider": "external_token",
        "token": {
            "idToken": "ab2231df....ad0f3291",
            "refreshToken": "eyJHGciO....adQssw5c",
        }
    }
```

### loginWithAccessToken
```javascript
await wepinLogin.loginWithAccessToken(params)
```

It logs in to the Wepin firebase with external access token. Returns firebase login info upon successful login.

#### Parameters
- `params` \<object> 
  - `provider` \<'naver'|'discord'> - provider that issued the access token
  - `token` \<string> - access token value to be used for login 
  - `sign` \<string> - signature value for the token provided as the first parameter.([Signature Generation Methods](./SignatureGenerationMethods.md))


#### Returns
- Promise\<LoginResult>
  - `provider` \<'external_token'>
  - `token` \<object>
    - `idToken` \<string> - wepin firebase idToken
    - `refreshToken` `<string> - wepin firebase refreshToken


#### Example

```javascript
const user = await wepinLogin.loginWithAccessToken({
    provider: 'naver', 
    token:'eyJHGciO....adQssw5c', 
    sign:'9753d4dc...c63466b9'
})
```
- response
```json
    {
        "provider": "external_token",
        "token": {
            "idToken": "ab2231df....ad0f3291",
            "refreshToken": "eyJHGciO....adQssw5c",
        }
    }
```

### getRefreshFirebaseToken
```javascript
await wepinLogin.getRefreshFirebaseToken()
```

This method retrieves the current firebase token's information from the Wepin.

#### Parameters
- void


#### Returns
- Promise\<LoginResult>
  - `provider` \<'external_token'>
  - `token` \<object>
    - `idToken` \<string> - wepin firebase idToken
    - `refreshToken` `<string> - wepin firebase refreshToken


#### Example

```javascript
const user = await wepinLogin.getRefreshFirebaseToken()
```
- response
```json
    {
        "provider": "external_token",
        "token": {
            "idToken": "ab2231df....ad0f3291",
            "refreshToken": "eyJHGciO....adQssw5c",
        }
    }
```


### getSignForLogin
Generates signatures to verify the issuer. It is mainly used to generate signatures for login-related information such as ID Tokens and Access Tokens.

```js
import {getSignForLogin} from '@wepin/login-js'
const result = getSignForLogin(privKey, message);
```

#### Parameters
- `privKey` \<string> - The authentication key used for signature generation.
- `message` \<string> - The message or payload to be signed.

#### Returns
- string - The generated signature.

> ‼️ Caution ‼️
> 
> The authentication key (`privKey`) must be stored securely and must not be exposed to the outside. It is recommended to execute the `getSignForLogin()` method on the backend rather than the frontend for enhanced security and protection of sensitive information.

#### Example
```js
const privKey = '0400112233445566778899001122334455667788990011223344556677889900'
const idToken = 'idtokenabcdef'
const sign = getSignForLogin(privKey, idToken)

const res = await wepinLogin.loginWithIdToken({
    token: idToken, 
    sign
})
```

### loginWepin
```javascript
await wepinLogin.loginWepin({provider, token})
```

This method logs the user into the Wepin application using the specified provider and token. 

#### Parameters
The parameters should utilize the return values from the `loginWithOauthProvider()`, `loginWithEmailAndPassword()`, `loginWithIdToken()`, and `loginWithAccessToken()` methods within the this module.

- `provider` \<'google'|'apple'|'naver'|'discord'|'external_token'|'email'> - The login provider.
- `token` \<{idToken: string; refreshToken: string}> - The login tokens.

#### Returns
- Promise\<IWepinUser> - A promise that resolves to an object containing the user's login status and information. The object includes:
  - status \<'success'|'fail'>  - The login status.
  - userInfo \<object> __optional__ - The user's information, including:
    - userId \<string> - The user's ID.
    - email \<string> - The user's email.
    - provider \<'google'|'apple'|'naver'|'discord'|'email'|'external_token'> - The login provider.
    - use2FA \<boolean> - Whether the user uses two-factor authentication.
  - walletId \<string> = The user's wallet ID.
  - userStatus: \<object> - The user's status of wepin login. including:
    - loginStatus: \<'complete' | 'pinRequired' | 'registerRequired'> - If the user's loginStatus value is not complete, it must be registered in the wepin.
    - pinRequired?: <boolean> 
  - token: \<object> - The user's token of wepin.
    - accessToken: \<string>
    - refreshToken \<string>

#### Example

```javascript
const wepinLogin = WepinLogin({ appId: 'appId', appKey: 'appKey' })
const res = await wepinLogin.loginWithOauthProvider({ provider: 'google' })

const userInfo = await wepinLogin.loginWepin(res)
const userStatus = userInfo.userStatus
if(userStatus.loginStatus === 'pinRequired'||userStatus.loginStatus === 'registerRequired') {
    // wepin register
}
```
- response
```json
{
    "status": "success",
    "userInfo": {
      "userId": "120349034824234234",
      "email": "abc@gmail.com",
      "provider": "google",
      "use2FA": true,
    },
    "walletId": "abcdsfsf123",
    "userStatus": {
        "loginRequired": "completed",
        "pinRequired": false,
    },
    "token": {
        "accessToken": "",
        "refreshToken": "",
    }
}
```


### getCurrentWepinUser
```javascript
await wepinLogin.getCurrentWepinUser()
```

This method retrieves the current logged-in user's information from the Wepin.

#### Parameters
- void

#### Returns
- Promise\<IWepinUser> - A promise that resolves to an object containing the user's login status and information. The object includes:
  - status \<'success'|'fail'>  - The login status.
  - userInfo \<object> __optional__ - The user's information, including:
    - userId \<string> - The user's ID.
    - email \<string> - The user's email.
    - provider \<'google'|'apple'|'naver'|'discord'|'email'|'external_token'> - The login provider.
    - use2FA \<boolean> - Whether the user uses two-factor authentication.
  - walletId \<string> = The user's wallet ID.
  - userStatus: \<object> - The user's status of wepin login. including:
    - loginStatus: \<'complete' | 'pinRequired' | 'registerRequired'> - If the user's loginStatus value is not complete, it must be registered in the wepin.
    - pinRequired?: <boolean> 
  - token: \<object> - The user's token of wepin.
    - accessToken: \<string>
    - refreshToken \<string>

#### Example

```javascript
const userInfo = await wepinLogin.getCurrentWepinUser()
const userStatus = userInfo.userStatus
if(userStatus.loginStatus === 'pinRequired'||userStatus.loginStatus === 'registerRequired') {
    // wepin register
}
```
- response
```json
{
    "status": "success",
    "userInfo": {
      "userId": "120349034824234234",
      "email": "abc@gmail.com",
      "provider": "google",
      "use2FA": true,
    },
    "walletId": "abcdsfsf123",
    "userStatus": {
        "loginRequired": "completed",
        "pinRequired": false,
    },
    "token": {
        "accessToken": "",
        "refreshToken": "",
    }
}
```

### logout
```js
await wepinLogin.logout()
```

The `logout()` method logs out the user logged into Wepin.

#### Parameters
 - void
#### Returns
 - Promise\<boolean>
    - true if success

#### Exception
- `Wepin login module Not initialized`: If the Wepin login library is not initialized
- `Already logout` : If the user is already logged out
  
#### Example
```js
const result = await wepinLogin.logout()
```

### finalize
```js
wepinLogin.finalize()
```

The `finalize()` method finalizes the Wepin Login Library.

#### Parameters
 - void
#### Returns
 - void

#### Example
```js
wepinLogin.finalize()
```
