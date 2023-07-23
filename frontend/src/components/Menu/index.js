import { Link } from 'react-router-dom'
import Cookies from 'js-cookie'
import './style.css'
import { useDispatch } from 'react-redux'
import { googleSignOut } from '../../helpers/userAuth'
import { mainMenu } from '../../data/dummy'
import { useStateContext } from '../../contexts/ContextProvider'

export default function Menu({ user, setShowForm, }) {
  const { setMainMenu } = useStateContext
  const dispatch = useDispatch()
  // logout
  const handleLogOut = () => {
    googleSignOut(() => {
      dispatch({
        type: 'LOGOUT',
        payload: ''
      })
      Cookies.set('ursac-user', '')
      setShowForm(true)
      setMainMenu(false)
    })
  }

  return (
    //   <Link to='/audioMotor' >
    //     <MenuItem icon='audioMotor' text='Audio Motor' />
    //   </Link>
    //   <Link to='/meetTheProducer'>
    //     <MenuItem icon='meetTheProducer' text='Meet The Producer' />
    //   </Link>
    //   <Link to='/fixYourMusic'>
    //     <MenuItem icon='fixYourMusic' text='Fix Your Music' />
    //   </Link>
    //   {user &&
    //     <>
    //       <Link to='/contests'>
    //         <MenuItem icon='contests' text='Contests' />
    //       </Link>
    //       <div className="line" style={{ margin: '10px' }}></div>
    //       <Link to='/settings'>
    //         <MenuItem icon='settings' text='Settings' />
    //       </Link>
    //       <div onClick={() => {
    //         handleLogOut()
    //       }}>
    //         <MenuItem icon='logOut' text='Log Out' />
    //       </div>
    //     </>
    //   }
    // </div>
    <>
      <div className="menu">
        {mainMenu.slice(0, 3).map((item, i) => (
          <Link to={`${item.link}`} key={i}>
            <div className="menu_item hover3">
              <div className="menu_icon">{item.icon}</div>
              <div className="menu_text">
                <span>{item.text}</span>
              </div>
            </div>
          </Link>
        ))}
        <div className="line" style={{ margin: '10px' }}></div>
        {user && <>
          {mainMenu.slice(3, 7).map((item, i) => (
            <Link to={`${item.link}`} key={i}>
              <div className="menu_item hover3">
                <div className="menu_icon">{item.icon}</div>
                <div className="menu_text">
                  <span>{item.text}</span>
                </div>
              </div>
            </Link>
          ))}
        </>}
        <div onClick={() => {
          handleLogOut()
        }}>
          <div className="menu_item hover3">
            <div className="menu_icon">{mainMenu[7].icon}</div>
            <div className="menu_text">
              <span>{mainMenu[7].text}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
