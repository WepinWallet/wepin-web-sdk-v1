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


# @wepin/api-js

[![npm version](https://img.shields.io/npm/v/@wepin/api-js?style=for-the-badge)](https://www.npmjs.org/package/@wepin/api-js) [![npm downloads](https://img.shields.io/npm/dt/@wepin/api-js.svg?label=downloads&style=for-the-badge)](https://www.npmjs.org/package/@wepin/api-js)

The Wepin API Library is designed for web environments. This package is not available for other platforms.

To perform functions after logging into Wepin, it must be used in conjunction with the [`@wepin/login-js`](https://www.npmjs.org/package/@wepin/login-js) module.

## ⏩ Get App ID and Key
After signing up for [Wepin Workspace](https://workspace.wepin.io/), go to the development tools menu and enter the information for each app platform to receive your App ID and App Key.


## ⏩ Installation
To install the Wepin API Library, you can use npm or yarn:
```bash
npm install @wepin/api-js
```
or
```bash
yarn add @wepin/api-js
```

## ⏩ Import WepinAPI
```js
import { WepinAPI } from '@wepin/api-js'
```

## ⏩ Initialization
Create a new instance of `WepinAPI` and initialize it with your application's ID and key:
```js
const wepinApi = new WepinAPI({
    appId: 'wepinAppId',
    appKey: 'wepinAppKey',
})

await wepinApi.init()
```
After initialization, you can use the various methods provided by the `WepinAPI` instance.

## ⏩ Methods
You can use the following methods after initializing the `WepinAPI`.
### getStatus
```javascript
await wepinApi.getStatus()
```

This method returns the current lifecycle state of Wepin.

#### Parameters
- void

#### Returns
- Promise\<WepinLifeCycle> - A promise that resolves to the current lifecycle state of Wepin. The possible states are:
   - 'not_initialized': `WepinAPI` has not been initialized.
   - 'initializing': `WepinAPI` is currently initializing.
   - 'initialized': `WepinAPI` has been initialized.
   - 'before_login': `WepinAPI` has been initialized, but the user is not logged in.
   - 'login': The user is logged in.
   - 'login_before_register': The user has logged in with email, but is not registered with Wepin.

#### Example

```javascript
const status = await wepinApi.getStatus()
```
### getAppInfo
```javascript
await wepinApi.getAppInfo(withNetwork?)
```

This method retrieves information about your Wepin application. If the `withNetwork` parameter is set to true, it will also return network-related information.

#### Parameters
- `withNetwork` \<boolean> __optional__ - If true, network-related information is included in the returned data.

#### Returns
- Promise\<IAppInfo> - A promise that resolves to an object containing information about your Wepin application.

#### Example

```javascript
const appInfo = await wepinApi.getAppInfo(true)
```
- response
```json
    {
        "id": "abcdefg",
        "iconImage": "app_icon.jpg",
        "logoImage": "app_logo.jpg",
        "color": "111111",
        "state": 1,
        "name": "test app",
        "desc": "test app description",
        "category": "game",
        "createdTime": "2024-01-08T08:10:39.000Z",
        "modifiedTime": "2024-01-08T08:10:39.000Z",
        "assets": [
            {
                "coinId": 1,
                "tokens": [],
                "nftContracts": [],
            },
        ],
        "includeOtherAsset": false,
        "property": {
            "emailVerify": true,
        },
    }
```
### getAppCoins
```javascript
await wepinApi.getAppCoins(locale?)
```

This method retrieves a list of coin networks supported by your Wepin application. The coin names are localized based on the provided locale.

#### Parameters
- `locale` \<'ko'|'en'> __optional__ - The locale for the coin names.

#### Returns
- Promise\<ICoinInfos>

#### Example

```javascript
const coinInfo = await wepinApi.getAppCoins('en')
```
- response
```json
{
    "coins": [
        "id": 17,
        "bipPath": "60"
        "chainId": "137"
        "cmkId": 123
        "coinGeckoId": "matic-network"
        "color": "#2BBDF7"
        "coreNetwork": "ETHEREUM"
        "decimals": 18
        "defaultAccountState": 1
        "explorerAddress": "https://polygonscan.com/address/{address}"
        "explorerContract": "https://polygonscan.com/token/{contract}?a={address}"
        "explorerTransaction": "https://polygonscan.com/tx/{txID}"
        "explorerUrl": "https://polygonscan.com"
        "feeType": 1
        "iconUrl": "icon.png"
        "isTestnet": 0
        "name": "Polygon"
        "network": "evmPOLYGON"
        "order": 39
        "state": 1
        "symbol": "MATIC"
        "property": {
            "isAppOnly":false
        }
    ]
}
```
### getAppSupportedNFTs
```javascript
await wepinApi.getAppSupportedNFTs()
```

This method retrieves a list of NFTs (Non-Fungible Tokens) supported by your Wepin application.

#### Parameters
- void

#### Returns
- Promise\<ISupportedNFTs> - A promise that resolves to an array of supported NFTs.

#### Example

```javascript
const coinInfo = await wepinApi.getAppSupportedNFTs()
```
- response
```json
{
    "supportNetworkList": [
        {
            "name": {
                "en": "Ethereum",
                "ko": "이더리움"
            },
            "network": "ETHEREUM"
        },
    ]
}
```

### register
```javascript
await wepinApi.register(pin)
```

If the userStatus's loginStatus value is not 'complete' after calling the `loginWepin()` method from `@wepin/login-js`, this method needs to be called. It registers the user in Wepin with a wallet pin.

After the sign-up and login are completed, the registration for Wepin service (wallet and account creation) will proceed.

#### Parameters
- pin \<string> - The wallet PIN.

#### Returns
- Promise\<IWepinUser> - A promise that resolves to an object containing the user's login status and information. The object includes:
  - status \<'success'|'fail'>  - The login status.
  - userInfo \<object> __optional__ - The user's information, including:
    - userId \<string> - The user's ID.
    - email \<string> - The user's email.
    - provider \<'google'|'apple'|'naver'|'discord'|'email'|'external_token'> - The login provider.
    - use2FA \<boolean> - Whether the user uses two-factor authentication.
  - walletId \<string> = The user's wallet ID.

#### Example

```javascript
const userInfo = await wepinApi.register('your_wallet_pin');
```

### refreshSession
```js
await wepinApi.refreshSession()
```
This method refreshes the user's session with the Wepin service, ensuring that the session is always active and up-to-date.

#### Parameters
- void

#### Returns
- Promise \<boolean> - A promise that resolves to true if the session has been successfully refreshed.

#### Example
```js
const isRefreshed = await wepinApi.refreshSession();
if (isRefreshed) {
    console.log('Session refreshed');
} else {
    console.log('Session refresh failed');
}
```
  
### logout
```js
await wepinApi.logout()
```
This method logs the user out of the Wepin service, ending their current session.

#### Parameters
- void

#### Returns
- Promise \<void> - A promise that resolves when the logout process has been completed.

#### Example
```js
await wepinApi.logout();
console.log('Logged out');
```

### getAccounts

```js
await wepinApi.getAccounts()
await wepinApi.getAccounts(options)
```
This method retrieves a list of the user's accounts in the Wepin service. It is recommended to use `getAccounts()` method without argument to get all user accounts. It can be only usable after widget login.
##### Parameters
- options:
  - locale: \<'ko' | 'en'> __optional__ Languages of Network Name
  - networks: \<Array> __optional__ A list of network names to filter the accounts.
    - network \<string> __optional__
  - withEoa: \<boolean> __optional__ If AA accounts are included, whether to include EOA accounts
  - force: \<boolean> __optional__ refresh account list

#### Returns
- Promise \<Account[]> - A promise that resolves to an array of the user's accounts.
  - address \<string>
  - network \<string>
  - contract \<string> __optional__ token contract address. 
  - isAA \<boolean> __optional__ Whether it is aa account or not

#### Example
```js
const result = await wepinApi.getAccounts({
  locale='en',
  networks: ['Ethereum'],
  withEoa: true
})
```
- response
```json
[
  {
    "address": "0x0000001111112222223333334444445555556666",
    "network": "Ethereum",
  },
  {
    "address": "0x0000001111112222223333334444445555556666",
    "network": "Ethereum",
    "contract": "0x777777888888999999000000111111222222333333",
  },
  {
    "address": "0x4444445555556666000000111111222222333333",
    "network": "Ethereum",
    "isAA": true,
  },
]
```

### getNfts
```js
await wepinApi.getNfts()
await wepinApi.getNfts(options)
```
This method retrieves a list of available NFTs (Non-Fungible Tokens). It can be used after logging in. If the `networks` parameter is not provided, it returns all NFTs.

##### Parameters
- options \<Object> __optional__
    - network \<string> __optional__ - Specify the network to filter the NFTs.
    - force \<boolean> __optional__ - Set to true to refresh the NFT list.
  
#### Returns
- Promise \<NFTInfo[]>  - A promise that resolves to an array of NFTs. Each NFT is represented as an object with the following properties:
  - address \<string> - The address of the NFT.
  - network \<string> - The network of the NFT.
  - contract \<object> - The contract information of the NFT.
      -  address \<string>
      -  scheme \<"ERC721" | "ERC1155">
   - name \<string> - The name of the NFT.
   - description \<string> - The description of the NFT.
   - externalLink \<string> - The NFT meta info url
   - imageUrl \<string> __optional__ - The NFT Image or thumbnail url
   - contentUrl \<string> __optional__ - The NFT Content url (if video)
   - quantity \<number> __optional__ if ERC1155
   - contentType \<'image'|'video'> - The content type of the NFT

#### Example
```js
const result = await wepinApi.getNfts()
```
- response
```json
[
  {
    "address": "0x0000001111112222223333334444445555556666",
    "network": "Ethereum",
    "contract": {
        "address": "0x0000001111112222223333334444445555556666",
        "scheme": "ERC721",
    },
    "name": "test nft",
    "description": "test nft",
    "externalLink": "https://externalLink.com",
    "imageUrl": "nft.jpg",
    "contentType": "image"
    }
]
```

### getBalance
```js
await wepinApi.getBalance([account])
await wepinApi.getBalance()
```

It returns the account's balance information. It can be only usable after widget login. It use `getBalance()` method without argument to get all user accounts.

#### Parameters
- account \<Account[]> __optional__
  - network \<string>
  - address \<string>
  
#### Returns
- Promise \<AccountBalanceInfo[]>
  - symbol \<string> - symbol of account
  - balance \<string> - balance of account
  - tokens \<Array\<TokenBalanceInfo>> - token balance information for account
    - symbol \<string> - token symbol
    - balance \<string> - token balance
    - contract \<string> - token contract address

#### Example
```js
const result = await wepinApi.getBalance([{
  address: '0x0000001111112222223333334444445555556666',
  network: 'Ethereum',
}])
```
- response
```json
[
    {
        "symbol": "ETH",
            "balance": "1.1",
        "tokens":[
            {
                "contract": "0x123...213",
                "symbol": "TEST",
                "balance": "10"
            },
        ]
    }
]
```


### checkAddressValidation
```js
await wepinApi.checkAddressValidation({account, address})
```

The network corresponding to that account checks the validity of the address and returns the result.

#### Parameters
- account \<Account> 
  - network \<string>
  - address \<string>
- address \<string>
  
#### Returns
- Promise \<boolean>

#### Example
```js
const result = await wepinApi.checkAddressValidation([{
  address: '0x0000001111112222223333334444445555556666',
  network: 'Ethereum',
}], '0x9999991111112222223333334444445555556666')
```

### prepareTransaction
```js
await wepinApi.prepareTransaction({account, to, amount, data?})
```

Inquire the necessary information before sending the coin

#### Parameters
- account \<Account>
  - network \<string>
  - address \<string>
- to \<string>
- amount \<string>
- data \<string> __optional__
  
#### Returns
- Promise \<Object>
  - gasLimit \<number>
  - gasPrice \<object> 
    - high \<number>
    - medium \<number>
    - low \<number>
  - nonce  \<number>

#### Example
```js
const result = await wepinApi.prepareTransaction({
    account: {
        address: '0x0000001111112222223333334444445555556666',
        network: 'Ethereum',
    },
    to: '0x9999991111112222223333334444445555556666',
    amount: '0.1'
})
```
- response
```json
[
    {
        "gasLimit": 210000,
        "gasPrice": {
            "high": 50,
            "medium": 50,
            "low": 50
        },
        "nonce": 8
    }
]
```

### signAndBroadcast
```js
await wepinApi.signAndBroadcast({account, txData, pin, otpCode?})
```

Sign the data and broadcast to the network.
We recommend performing `prepareTransaction` before performing this method.
Using the response value of the `prepareTransaction` method, it is possible to set the `nonce`, `gasLimit`, and `gasPrice` values of `txData`.

#### Parameters
- account \<Account>
  - network \<string>
  - address \<string>
- txData \<object>
  - to \<string>
  - amount \<string>
  - nonce \<number>
  - data \<string> __optional__
  - gasLimit \<string>
  - gasPrice \<string>
- pin \<string>
- otpCode \<object > __optional__ Required if userInfo's Use2FA value is true
  - code \<string>
  - recovery \<boolean>
  
#### Returns
- Promise \<object>
  - txId \<string> 

#### Example
```js
const result = await wepinApi.signAndBroadcast({
    account: {
        address: '0x0000001111112222223333334444445555556666',
        network: 'Ethereum',
    },
    txData: {
        to: '0x9999991111112222223333334444445555556666',
        amount: '0.1',
        nonce: 8,
        gasLimit: '200000',
        gasPrice: '50000000000',
    },
    pin: '123456',
})
```
- response
```json
{
    "txId": "0x76bafd4b700ed959999d08ab76f95d7b6ab2249c0446921c62a6336a70b84f32"
}
```
### sign
```js
await wepinApi.sign({account, signData, pin, otpCode?})
```

Sign transaction data, messages, and type data.

If the `type` value is `transaction`, it is recommended to perform `prepareTransaction` before performing the method.
Using the response value of the `prepareTransaction` method, it is possible to set the `nonce`, `gasLimit`, and `gasPrice` values of `txData`.

#### Parameters
- account \<Account>
  - network \<string>
  - address \<string>
- signData \<object>
  - type \<'msg_sign'|'sign_data'|'transaction'>
  - txData \<EthSignMessageParams|EthSignDataParams|EthSignTransactionParams>
- pin \<string>
- otpCode \<object > __optional__ Required if userInfo's Use2FA value is true
  - code \<string>
  - recovery \<boolean>
  
#### Returns
- Promise \<object>
  - txId \<string> 

#### Example
```js
// msg_sign
const result = await wepinApi.sign({
    account: {
        address: '0x0000001111112222223333334444445555556666',
        network: 'Ethereum',
    },
    signData: {
        type: 'msg_sign'
        txData: {
            data: 'test message sign',
        },
    }
    pin: '123456',
})
//sign_data
const result = await wepinApi.sign({
    account: {
        address: '0x0000001111112222223333334444445555556666',
        network: 'Ethereum',
    },
    signData: {
        type: 'sign_data'
        txData: {
            version: 'V1',
            data: {
                {
                    type: 'string',
                    name: 'Message',
                    value: 'Hi, Alice!',
                },
                {
                    type: 'uint32',
                    name: 'A number',
                    value: '1337',
                },
            }
        },
    }
    pin: '123456',
})
//transaction
const result = await wepinApi.sign({
    account: {
        address: '0x0000001111112222223333334444445555556666',
        network: 'Ethereum',
    },
    signData: {
        type: 'transaction'
        txData: {
            to: '0x9999991111112222223333334444445555556666',
            amount: '0.1',
            nonce: 8,
            gasLimit: '200000',
            gasPrice: '50000000000',
        },
    }
    pin: '123456',
})
```
- response
```json
// msg_sign / sign_data
{
    "signatureResult": "0x76bafd4b700ed959999d08ab76f95d7b6ab2249c0446921c62a6336a70b84f32"
}
// transaction
{
    "signatureResult": {
        "signedTx": "0xf8ac08850ba43b740083030d409452cfda3e278837d852c4315586c9464be762647e80b844a9059cbb000000000000000000000000262bea79bf3ca9288d7ddb3f4cc3ce2b4dd11e3000000000000000000000000000000000000000000000000000005af3107a4000824055a0926239443fa235b0ac0fa1826dc4946041658f7dc6c749056d4f5edf7ad445eca03aa41cac3e742d732af2106234e1d407eb295e06ca4cd970b83986278e9d4789",
        "sign": {
            "v": "0x4055",
            "r": "0x926239443fa235b0ac0fa1826dc4946041658f7dc6c749056d4f5edf7ad445ec",
            "s": "0x3aa41cac3e742d732af2106234e1d407eb295e06ca4cd970b83986278e9d4789"
        }
    },
}
```
### resetPINRetryCount
```js
await wepinApi.resetPINRetryCount()
```

Request to initialize the PIN try count value of the user's wallet.

#### Parameters
- void
  
#### Returns
- Promise \<object>
  - status \<'success'|'fail'>
  - walletId \<string>
  - maxTryCnt \<number>
  - remainPinTryCnt \<number>
  - recvResetCmd \<boolean>
  - lockTime \<string>
  - releaseTimestamp \<string>

#### Example
```js
const result = await wepinApi.resetPINRetryCount()
```
- response
```json
{
    "status": "success",
    "walletId": "232FDE8D...",
    "maxTryCnt": 10,
    "remainPinTryCnt": 0,
    "recvResetCmd": true,
    "lockTime": "1440", // 1440 minutes = 24 hours
    "releaseTimestamp": "2023-04-10T09:22:55.900Z" 
}
```
### verifyPIN
```js
await wepinApi.verifyPIN(pin?)
```

Verifies the PIN of the user's wallet.

#### Parameters
- pin \<string>
  
#### Returns
- Promise \<boolean>

#### Example
```js
const result = await wepinApi.verifyPIN('123456')
```

### finalize
```js
wepinApi.finalize()
```

The `finalize()` method finalizes the Wepin API.

#### Parameters
 - void
 - 
#### Returns
 - void

#### Example
```js
wepinApi.finalize()
```