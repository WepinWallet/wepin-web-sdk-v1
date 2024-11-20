<template>
  <div class="app-container">
    <header class="app-header">
      <h1 class="app-title">Wepin Vue Example</h1>
    </header>
    <main>
      <div class="content-grid">
        <div v-if="appStatus === 'login'" class="content">
          <h2 class="section-title">User Information</h2>
          <div class="card">
            <pre>{{ JSON.stringify(userDetails, null, 2) }}</pre>
          </div>

          <div class="button-group">
            <button v-if="registrationNeeded" @click="registerWepin" class="button-style">
              Registration
            </button>
            <template v-else>
              <button @click="getAccounts" class="button-style">Get Accounts</button>
              <button @click="getBalance" class="button-style">Get Balance</button>
              <button @click="signMessageDialog" class="button-style">Sign Message</button>
              <button @click="sendTransactionDialog" class="button-style">Send Transaction</button>
              <button @click="logout" class="button-style logout">Sign Out</button>
            </template>
          </div>

          <div v-if="accountDetails" class="card">
            <h3>Account Details:</h3>
            <p>{{ accountDetails }}</p>
          </div>

          <div v-if="balance" class="card">
            <h3>Balance:</h3>
            <p>{{ balance }}</p>
          </div>
        </div>

        <div v-else class="button-group">
          <button @click="getSignForLoginCall" class="button-style">Get sign for login</button>
          <button @click="loginWithUI" class="button-style">Login with UI</button>
          <button @click="loginWithOAuth" class="button-style">Login without UI (Google)</button>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getSignForLogin, LoginErrorResult, WepinLogin } from '@wepin/login-js'
import { WepinProvider } from '@wepin/provider-js'
import { WepinSDK, WepinLifeCycle } from '@wepin/sdk-js'

const wepinAppID = 'your-app-id'
const wepinAppWebKey = 'your-app-key'
const privKey = 'your-private-key'

const wepinSdkInstance = new WepinSDK({
  appId: wepinAppID,
  appKey: wepinAppWebKey,
})

const wepinLoginInstance = new WepinLogin({
  appId: wepinAppID,
  appKey: wepinAppWebKey,
})

const wepinProvider = new WepinProvider({
  appId: wepinAppID,
  appKey: wepinAppWebKey,
})

const blockchainProvider = ref<any>(null)
const appStatus = ref<WepinLifeCycle>('not_initialized')
const registrationNeeded = ref(false)
const userDetails = ref<any>(null)
const currentAddress = ref<string | null>(null)
const accountDetails = ref<any>(null)
const balance = ref<string | null>(null)

const initializeApp = async () => {
  try {
    await wepinSdkInstance.init()
    await wepinLoginInstance.init()
    await wepinProvider.init()

    const status = await wepinSdkInstance.getStatus()
    appStatus.value = status

    blockchainProvider.value = await wepinProvider.getProvider('ethereum')

    if (status === 'login_before_register') {
      registrationNeeded.value = true
    }
  } catch (error) {
    console.error('Error during initialization:', error)
  }
}

onMounted(() => {
  initializeApp()
})

const loginWithUI = async () => {
  try {
    const userInfo = await wepinSdkInstance.loginWithUI()
    appStatus.value = await wepinSdkInstance.getStatus()
    userDetails.value = userInfo
  } catch (error) {
    console.error('Login with UI failed:', error)
  }
}

const isLoginError = (res: any): res is LoginErrorResult => {
    return (res as LoginErrorResult).error !== undefined
  }

const loginWithOAuth = async () => {
  try {
    const oauthUser = await wepinLoginInstance.loginWithOauthProvider({
      provider: 'google',
    })
    if(isLoginError(oauthUser)) {
      console.error('OAuth login failed:', oauthUser.error)
      return
    }
    const userInfo = await wepinLoginInstance.loginWepin(oauthUser)
    appStatus.value = await wepinSdkInstance.getStatus()
    userDetails.value = userInfo
    if (appStatus.value === 'login_before_register') {
      registrationNeeded.value = true
    }
  } catch (error) {
    console.error('OAuth login failed:', error)
  }
}

const getSignForLoginCall = () => {
  try {
    const sign = getSignForLogin(privKey, wepinAppWebKey)
    alert('Sign for login: ' + sign)
  } catch (error) {
    console.error('Get sign for login failed:', error)
  }
}

const logout = async () => {
  try {
    await wepinSdkInstance.logout()
    appStatus.value = await wepinSdkInstance.getStatus()
    userDetails.value = null
    accountDetails.value = null
    balance.value = null
  } catch (error) {
    console.error('Logout failed:', error)
  }
}

const registerWepin = async () => {
  if (!registrationNeeded.value) {
    alert('No registration required.')
    return
  }
  try {
    const userInfo = await wepinSdkInstance.register()
    userDetails.value = userInfo
    registrationNeeded.value = false
  } catch (error) {
    console.error('Registration failed:', error)
  }
}

const getAccounts = async () => {
  if (!blockchainProvider.value) {
    alert('Provider is not initialized.')
    return
  }
  try {
    const accounts = await blockchainProvider.value.request({
      method: 'eth_accounts',
    })
    accountDetails.value = accounts
    currentAddress.value = blockchainProvider.value.selectedAddress ?? null
  } catch (error) {
    alert('Error getAccounts:' + error)
  }
}

const getBalance = async () => {
  if (!currentAddress.value) {
    alert('Please select an account.')
    return
  }
  if (!blockchainProvider.value) {
    alert('Provider is not initialized.')
    return
  }
  try {
    const balanceValue = await blockchainProvider.value.request({
      method: 'eth_getBalance',
      params: [currentAddress.value, 'latest'],
    })
    balance.value = balanceValue
  } catch (error) {
    alert('Error getBalance:' + error)
  }
}

// Prompt for message and sign it
const signMessage = async (message: string) => {
  if (!currentAddress.value) {
    alert('Please select an account.')
    return
  }
  if (!blockchainProvider.value) {
    alert('Provider is not initialized.')
    return
  }
  try {
    const signature = await blockchainProvider.value.request({
      method: 'personal_sign',
      params: [message, currentAddress.value],
    })
    alert('Signature: ' + signature)
  } catch (error) {
    alert('Error signing message:' + error)
  }
}

const sendTransaction = async (to: string, amount: string) => {
  if (!currentAddress.value) {
    alert('Please select an account.')
    return
  }
  if (!blockchainProvider.value) {
    alert('Provider is not initialized.')
    return
  }
  try {
    const txHash = await blockchainProvider.value.request({
      method: 'eth_sendTransaction',
      params: [
        {
          from: currentAddress.value,
          to,
          value: amount,
        },
      ],
    })
    alert('Transaction hash: ' + txHash)
  } catch (error) {
    alert('Error sending transaction:' + error)
  }
}

// Prompt for message to sign
const signMessageDialog = () => {
  const message = prompt('Enter the message to sign:')
  if (message) {
    signMessage(message)
  }
}

// Prompt for transaction details (to address and amount)
const sendTransactionDialog = () => {
  const to = prompt('Enter the recipient address:')
  if(!to) {
    return
  }
  const amount = prompt('Enter the amount to send (in Wei):')
  if (to && amount) {
    sendTransaction(to, amount)
  }
}

</script>

<style scoped>
.app-container {
  font-family: Arial, sans-serif;
  padding: 20px;
  background-color: #f0f2f5;
  min-height: 100vh;
}

.app-header {
  background-color: #282c34;
  padding: 20px;
  text-align: center;
  color: white;
}

.app-title {
  font-size: 2rem;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}

.button-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
}

.button-style {
  padding: 10px 20px;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
}

.button-style:hover {
  background-color: #0056b3;
}

.logout {
  background-color: #dc3545;
}

.logout:hover {
  background-color: #c82333;
}

.section-title {
  font-size: 1.5rem;
  margin-bottom: 15px;
}

.card {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  width: 100%;
  max-width: 600px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
}

h3 {
  margin-top: 0;
}

p {
  margin: 0;
}

pre {
  white-space: pre-wrap;
  word-wrap: break-word;
}
</style>
