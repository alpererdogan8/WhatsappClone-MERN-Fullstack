import { useState } from 'react'
import { Main, SidebarGroup } from './assets/components'
import LoginScreen from './assets/components/login/LoginScreen'
import MainWelcome from './assets/components/main/sub_components/MainWelcome'

function App() {
  // eslint-disable-next-line no-unused-vars
  const [isChange, setIsChange] = useState()
  const [isLogin, setIsLogin] = useState(false)

  const LoggedIn = () => {
    return (
      <>
        <SidebarGroup />
        {isChange ? <Main /> : <MainWelcome />}
      </>
    )
  }

  return (
    <div className="wp-main">{isLogin ? <LoggedIn /> : <LoginScreen />}</div>
  )
}

export default App
