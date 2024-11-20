import React, { useContext } from 'react'
import './App.css'
import LoggedInView from './components/views/LoggedInView.tsx'
import LoggedOutView from './components/views/LoggedOutView.tsx'
import { WepinContext } from './context/WepinContext.tsx'

function WepinApp() {
  const { appStatus, language, setLanguage } = useContext(WepinContext)!

  const handleLanguageChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setLanguage(event.target.value)
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">Wepin React Demo</h1>
        <select
          value={language}
          onChange={handleLanguageChange}
          className="dropdown language-dropdown">
          <option value="en">English</option>
          <option value="ko">Korean</option>
          <option value="ja">Japanese</option>
        </select>
      </header>
      <main>
        <div className="content-grid">
          {appStatus === 'login' || appStatus === 'login_before_register' ? (
            <LoggedInView />
          ) : (
            <LoggedOutView />
          )}
        </div>
      </main>
    </div>
  )
}

export default WepinApp
