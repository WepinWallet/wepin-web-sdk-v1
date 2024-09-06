import { WepinLogin } from '@wepin/login-js'
import { BaseProvider, WepinProvider } from '@wepin/provider-js'
import { WepinSDK } from '@wepin/sdk-js'
import type { WepinLifeCycle } from '@wepin/sdk-js'
import { useEffect, useState } from 'react'
import './App.css'

//  Replace with the ID and key of the Wepin app created in Wepin Workspace(https://workspace.wepin.io)
const wepinAppID = 'your-app-id'
const wepinAppWebKey = 'your-app-key'

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

function WepinApp() {
  const [blockchainProvider, setBlockchainProvider] = useState<BaseProvider>()
  const [appStatus, setAppStatus] = useState<WepinLifeCycle>('not_initialized')
  const [registrationNeeded, setRegistrationNeeded] = useState(false)
  const [userDetails, setUserDetails] = useState<any>(null)
  const [currentAddress, setCurrentAddress] = useState<string | undefined>()
  const [accountDetails, setAccountDetails] = useState<any | null>(null)
  const [balance, setBalance] = useState<string | undefined>()

  useEffect(() => {
    const initializeApp = async () => {
      try {
        await wepinSdkInstance.init()
        await wepinLoginInstance.init()
        await wepinProvider.init()

        const status = await wepinSdkInstance.getStatus()
        setAppStatus(status)

        // You must check both the network configured in Wepin Workspace (https://workspace.wepin.io)
        // and the network supported by the Wepin provider (https://htmlpreview.github.io/?https://github.com/WepinWallet/wepin-web-sdk-v1/blob/main/packages/provider/assets/supportedNetworkTable.html)
        // to set the provider's network value.
        // To use this example code, the Ethereum network must be enabled for the app in Wepin Workspace.
        setBlockchainProvider(await wepinProvider.getProvider('ethereum'))

        if (status === 'login_before_register') {
          setRegistrationNeeded(true)
        }
      } catch (error) {
        console.error('Error during initialization:', error)
      }
    }
    initializeApp()
  }, [])

  const loginWithUI = async () => {
    try {
      const userInfo = await wepinSdkInstance.loginWithUI()
      const status = await wepinSdkInstance.getStatus()
      setAppStatus(status)
      setUserDetails(userInfo)
    } catch (error) {
      console.error('Login with UI failed:', error)
    }
  }

  const loginWithOAuth = async () => {
    try {
      const oauthUser = await wepinLoginInstance.loginWithOauthProvider({
        provider: 'google',
      })
      const userInfo = await wepinLoginInstance.loginWepin(oauthUser)
      const status = await wepinSdkInstance.getStatus()
      setAppStatus(status)
      setUserDetails(userInfo)
      if (appStatus === 'login_before_register') {
        setRegistrationNeeded(true)
      }
    } catch (error) {
      console.error('OAuth login failed:', error)
    }
  }

  const logout = async () => {
    try {
      await wepinSdkInstance.logout()
      const status = await wepinSdkInstance.getStatus()
      setAppStatus(status)
      setUserDetails(null)
      setAccountDetails(null)
      setBalance(undefined)
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  const registerWepin = async () => {
    if (!registrationNeeded) {
      alert('No registration required.')
      return
    }
    try {
      const userInfo = await wepinSdkInstance.register()
      setUserDetails(userInfo)
      setRegistrationNeeded(false)
    } catch (error) {
      console.error('Registration failed:', error)
    }
  }

  const getAccounts = async () => {
    if (!blockchainProvider) {
      alert('Provider is not initialized.')
      return
    }
    try {
      const accounts = await blockchainProvider.request({
        method: 'eth_accounts',
      })
      setAccountDetails(accounts)
      setCurrentAddress(blockchainProvider.selectedAddress ?? undefined)
    } catch (error) {
      console.error('Error fetching accounts:', error)
    }
  }

  const getBalance = async () => {
    if (!currentAddress) {
      alert('Please select an account.')
      return
    }
    if (!blockchainProvider) {
      alert('Provider is not initialized.')
      return
    }
    try {
      const balanceValue = await blockchainProvider.request({
        method: 'eth_getBalance',
        params: [currentAddress, 'latest'],
      })
      setBalance(balanceValue as string)
    } catch (error) {
      console.error('Error fetching balance:', error)
    }
  }

  const signMessage = async (message: string) => {
    if (!currentAddress) {
      alert('Please select an account.')
      return
    }
    if (!blockchainProvider) {
      alert('Provider is not initialized.')
      return
    }
    try {
      const signedMessage = await blockchainProvider.request({
        method: 'personal_sign',
        params: [message, currentAddress],
      })
      alert('Signed message:' + signedMessage)
    } catch (error) {
      alert('Error signing message:' + error)
    }
  }

  const sendTransaction = async (to: string, amount: string) => {
    if (!currentAddress) {
      alert('Please select an account.')
      return
    }
    if (!blockchainProvider) {
      alert('Provider is not initialized.')
      return
    }
    try {
      const txHash = await blockchainProvider.request({
        method: 'eth_sendTransaction',
        params: [
          {
            from: currentAddress,
            to,
            value: amount,
          },
        ],
      })
      alert('Transaction sent:' + txHash)
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
    if (!to) {
      return
    }
    const amount = prompt('Enter the amount to send (in Wei):')
    if (to && amount) {
      sendTransaction(to, amount)
    }
  }

  const loggedInView = (
    <div className="content">
      <h2 className="section-title">User Information</h2>
      <div className="card">
        <pre>{JSON.stringify(userDetails, null, 2)}</pre>
      </div>

      <div className="button-group">
        {registrationNeeded ? (
          // registrationNeeded가 true일 때 registration 버튼만 표시
          <button onClick={registerWepin} className="button-style">
            Registration
          </button>
        ) : (
          // registrationNeeded가 false일 때 다른 버튼들 표시
          <>
            <button onClick={getAccounts} className="button-style">
              Get Accounts
            </button>
            <button onClick={getBalance} className="button-style">
              Get Balance
            </button>
            <button onClick={signMessageDialog} className="button-style">
              Sign Message
            </button>
            <button onClick={sendTransactionDialog} className="button-style">
              Send Transaction
            </button>
            <button onClick={logout} className="button-style logout">
              Sign Out
            </button>
          </>
        )}
      </div>

      {accountDetails && (
        <div className="card">
          <h3>Account Details:</h3>
          <p>{accountDetails}</p>
        </div>
      )}

      {balance && (
        <div className="card">
          <h3>Balance:</h3>
          <p>{balance}</p>
        </div>
      )}
    </div>
  )

  const loggedOutView = (
    <div className="button-group">
      <button onClick={loginWithUI} className="button-style">
        Login with UI
      </button>
      <button onClick={loginWithOAuth} className="button-style">
        Login without UI(Google)
      </button>
    </div>
  )

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">Wepin React Example</h1>
      </header>
      <main>
        <div className="content-grid">
          {appStatus === 'login' ? loggedInView : loggedOutView}
        </div>
      </main>
    </div>
  )
}

export default WepinApp
