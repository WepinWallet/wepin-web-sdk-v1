# Signature Generation Methods

There are two primary methods for generating signatures.

1. Using the `getSignForLogin(privKey, token)` method from the [@wepin/login-js](https://www.npmjs.com/package/@wepin/login-js) module
   This method allows you to easily generate the necessary signature internally.
2. Importing [secp256k1](https://www.npmjs.com/package/secp256k1) and `crypto` modules and implementing the signature method directly
   This method can be used when more detailed control is required.

Below are examples for each method:

## Using the `@wepin/login-js` Module

```javascript
import { getSignForLogin } from '@wepin/login-js'

var privKey = '0400112233445566778899001122334455667788990011223344556677889900'
var idToken = 'idtokenabcdef'
var sign = getSignForLogin(privKey, idToken)
```

## Using `secp256k1` and `crypto` Modules

```javascript
import secp256k1 from 'secp256k1'
import { createHash } from 'crypto'

function getSignForExtenalToken(privKey, token) {
  var idTokenHash = createHash('sha256').update(token).digest()
  var sign = secp256k1.ecdsaSign(idTokenHash, Buffer.from(privKey, 'hex'))
  return Buffer.from(sign.signature).toString('hex')
}

var privKey = '0400112233445566778899001122334455667788990011223344556677889900'
var idToken = 'idtokenabcdef'
var sign = getSignForExtenalToken(privKey, idToken)
```

> ##### ‼️ Caution ‼️
>
> When using either method, it is important to securely store the private key being used and ensure that it is not exposed externally. Additionally, for enhanced security of sensitive information, it is recommended to execute these signature generation methods on the backend rather than the frontend.