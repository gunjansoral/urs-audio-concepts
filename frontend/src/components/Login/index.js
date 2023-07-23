import { useRef } from 'react'
import './style.css'
import useClickOutside from '../../helpers/clickOutside'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import { useStateContext } from '../../contexts/ContextProvider'

export default function Login({
  // setShowForm,
  setShowRegForm,
  showRegForm,
  setProfile
}) {
  const { setShowForm } = useStateContext()
  const loginRef = useRef(null)
  useClickOutside(loginRef, () => {
    setShowForm(false)
  })
  return (
    <div className="blur">
      <div className="login_container" ref={loginRef}>
        <div className="login_wrap" >
          <div className="login_1">
            <div className="big_text">
              <span>Avoid practicing it,
                if you can.</span>
            </div>
            <img src="../../images/images.png" alt="" />
          </div>
          <div className="login_2">
            {showRegForm === 'LOGIN' && <LoginForm
              setShowForm={setShowForm}
              showRegForm={showRegForm}
              setShowRegForm={setShowRegForm}
            />}
            {showRegForm === 'REGISTER' && <RegisterForm
              setShowForm={setShowForm}
              setProfile={setProfile}
            />}
          </div>
        </div>
      </div>
    </div>
  )
}
