// wepinInstances.ts
import { WepinLogin } from '@wepin/login-js'
import { WepinProvider } from '@wepin/provider-js'
import { WepinSDK } from '@wepin/sdk-js'

// Replace with your actual app ID and key
const wepinAppID = 'your-app-id'
const wepinAppWebKey = 'your-app-key'

export const wepinSdkInstance = new WepinSDK({
  appId: wepinAppID,
  appKey: wepinAppWebKey,
})

export const wepinLoginInstance = new WepinLogin({
  appId: wepinAppID,
  appKey: wepinAppWebKey,
})

export const wepinProviderInstance = new WepinProvider({
  appId: wepinAppID,
  appKey: wepinAppWebKey,
})
