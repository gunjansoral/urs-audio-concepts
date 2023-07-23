import { HiAdjustments } from 'react-icons/hi'
import { BsHeadphones } from 'react-icons/bs'
import { SiIfixit } from 'react-icons/si'
import { RiLogoutBoxLine } from 'react-icons/ri'
import { AiTwotoneTrophy, AiTwotoneSetting } from 'react-icons/ai'

export const mainMenu = [
  {
    link: '/musicOnYourLap',
    icon: < HiAdjustments className='menu_icon' />,
    text: 'Music On Your Lap'
  },
  {
    link: '/courseDesigner',
    icon: < HiAdjustments className='menu_icon' />,
    text: 'Course Designer'
  },
  {
    link: '/audioMotor',
    icon: < HiAdjustments className='menu_icon' />,
    text: 'Audio Motor'
  },
  {
    link: '/meetTheProducer',
    icon: < BsHeadphones className='menu_icon' />,
    text: 'Meet The Producer'
  },
  {
    link: '/fixYourMusic',
    icon: < HiAdjustments className='menu_icon' />,
    text: 'Fix Your Music'
  },
  {
    name: '/contests',
    icon: < HiAdjustments className='menu_icon' />,
    text: 'Contests'
  },
  {
    name: '/settings',
    icon: < HiAdjustments className='menu_icon' />,
    text: 'Settings'
  },
  {
    name: '/logOut',
    icon: < HiAdjustments className='menu_icon' />,
    text: 'Log Out',
    // onClick: function () {
    //   googleSignOut(() => {
    //     dispatch({
    //       type: 'LOGOUT',
    //       payload: ''
    //     })
    //     Cookies.set('ursac-user', '')
    //     setShowForm(true)
    //     setShowMenu(false)
    //   })
    // }
  }
]