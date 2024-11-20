import React, { useContext } from 'react'
import { WepinContext } from '../../context/WepinContext.tsx'
import { useEvmProvider } from '../../hooks/useEvmProvider.ts'

const EvmProviderView: React.FC = () => {
  const { accountDetails } = useContext(WepinContext)!
  const {
    evmNetworks,
    selectedEvmNetwork,
    handleSelectedEvmNetwork,
    providerAccount,
    balance,
    getAccounts,
    getBalance,
    signMessage,
    sendTransaction,
  } = useEvmProvider(accountDetails)

  const signMessageDialog = () => {
    const message = prompt('Enter the message to sign:')
    if (message) {
      signMessage(message)
    }
  }

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

  return (
    <div className="action-section">
      <div className="provider-section">
        <h3 className="action-title">EVM Provider</h3>
        <span className="provider-label">Select EVM Network:</span>
        <select
          value={selectedEvmNetwork}
          onChange={handleSelectedEvmNetwork}
          className="dropdown">
          {evmNetworks?.map((network) => (
            <option key={network} value={network}>
              {network}
            </option>
          ))}
        </select>
      </div>

      <div className="card">
        <h3 className="card-title">Provider Account Overview</h3>
        <p className="card-detail">
          Address: {providerAccount ?? 'Not available'}
        </p>
        <p className="card-detail">Balance: {balance ?? 'Not available'}</p>
      </div>

      <div className="actions-group">
        <button onClick={getAccounts} className="button-secondary">
          Get Accounts
        </button>
        <button onClick={getBalance} className="button-secondary">
          Get Balance
        </button>
        <button onClick={signMessageDialog} className="button-secondary">
          Sign Message
        </button>
        <button onClick={sendTransactionDialog} className="button-secondary">
          Send Transaction
        </button>
      </div>
    </div>
  )
}

export default EvmProviderView
