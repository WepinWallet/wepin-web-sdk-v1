import React, { useContext } from 'react'
import { WepinContext } from '../../context/WepinContext.tsx'
import EvmProviderView from './EvmProviderView.tsx'
import InfoSection from './InfoSection.tsx'
import RegisterView from './RegisterView.tsx'
import WidgetView from './WidgetView.tsx'

const LoggedInView: React.FC = () => {
  const { registrationNeeded } = useContext(WepinContext)!

  return (
    <div className="content">
      <h2 className="section-title">Welcome, Wepin React Demo Page</h2>
      <InfoSection />
      <div className="main-content">
        {registrationNeeded ? (
          <RegisterView />
        ) : (
          <>
            <WidgetView />
            <EvmProviderView />
          </>
        )}
      </div>
    </div>
  )
}

export default LoggedInView
