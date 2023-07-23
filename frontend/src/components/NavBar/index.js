import './style.css'
import { ImMenu3, ImMenu4 } from 'react-icons/im'
import { useRef, useState } from 'react'
import Menu from '../Menu'
import useClickOutside from '../../helpers/clickOutside'
import { useStateContext } from '../../contexts/ContextProvider'

export default function NavBar({
  user,
}) {
  const menuRef = useRef(null)
  const { activeMenu1, setActiveMenu1, setShowForm, setShowRegForm } = useStateContext()
  useClickOutside(menuRef, () => {
    setActiveMenu1(false)
  })
  const handleShowLogin = () => {
    setShowRegForm('LOGIN')
    setShowForm(true)
  }
  const handleShowLReg = () => {
    setShowRegForm('REGISTER')
    setShowForm(true)
  }
  return (
    <header>
      <div className="header_left">
        {/* <img src="" alt="" className="header_logo" /> */}
        LOGO
      </div>
      <div className="header_right">
        <nav>
          {user ? (
            <div className='profile_info_wrap'>
              <div className="profile_img">
                <img src={user?.picture} alt="" />
              </div>
              <span>{user.firstname}</span>
            </div>
          ) : (
            <>
              <div className="login_btn"
                onClick={() => {
                  handleShowLogin()
                }}
              >Log In</div>
              <div className='signup_btn'
                onClick={() => {
                  handleShowLReg()
                }}
              >Sign Up</div>
            </>
          )
          }
          <div className="nav_icon hover1"
            onClick={() => {
              setActiveMenu1((prev) => !prev)
            }}>
            {activeMenu1 ? <ImMenu4 className='menu_icon_1 hover1' /> : <ImMenu3 className='menu_icon_1' />}
          </div>
          <div ref={menuRef}>
            {activeMenu1 && <Menu
              user={user}
              setShowForm={setShowForm}
            />}
          </div>

        </nav>
      </div>

    </header>
  )
}
