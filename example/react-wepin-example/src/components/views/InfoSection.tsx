import React, { useContext } from 'react'
import { WepinContext } from '../../context/WepinContext.tsx'
import { renderObject } from '../../utils/rederObject.tsx'
import AccordionCard from '../commons/AccordionCard.tsx'

const InfoSection: React.FC = () => {
  const { userDetails, accountDetails } = useContext(WepinContext)!
  const [isUserDetailsOpen, setIsUserDetailsOpen] = React.useState(false)
  const [isAccountDetailsOpen, setIsAccountDetailsOpen] = React.useState(false)

  return (
    <div className="info-section">
      <AccordionCard
        title="User Profile"
        isOpen={isUserDetailsOpen}
        onToggle={() => setIsUserDetailsOpen(!isUserDetailsOpen)}>
        <div className="user-details">
          {userDetails ? (
            <table className="details-table">
              <tbody>
                {Object.entries(userDetails).map(([key, value]) => (
                  <tr key={key} className="detail-row">
                    <td className="detail-key">{key}:</td>
                    <td className="detail-value">{renderObject(value)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="no-details">No profile information available</div>
          )}
        </div>
      </AccordionCard>

      <AccordionCard
        title="Wallet Information"
        isOpen={isAccountDetailsOpen}
        onToggle={() => setIsAccountDetailsOpen(!isAccountDetailsOpen)}>
        <div className="account-details">
          {Array.isArray(accountDetails) ? (
            <table className="details-table">
              <tbody>
                {accountDetails.map((acc, index) => (
                  <tr key={index} className="detail-row">
                    <td className="detail-key">{acc.network}:</td>
                    <td className="detail-value">
                      {acc.address}
                      {acc.contract && (
                        <>
                          <div className="detail-contract">
                            <span>⇢ contract: {acc.contract}</span>
                          </div>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="no-details">No wallet information available</div>
          )}
        </div>
      </AccordionCard>
    </div>
  )
}

export default InfoSection
