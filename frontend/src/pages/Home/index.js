import NavBar from '../../components/NavBar'
import { useSelector } from 'react-redux'
import './style.css'
import { useEffect, useState } from 'react'
import Login from '../../components/Login'


export default function Home({ setProfile }) {
  const { user } = useSelector((user) => ({ ...user }))
  const [showForm, setShowForm] = useState(true)
  const [showRegForm, setShowRegForm] = useState('LOGIN')
  return (
    <div className='home_body'>
      {showForm && !user && <Login
        setShowForm={setShowForm}
        setShowRegForm={setShowRegForm}
        showRegForm={showRegForm}
        setProfile={setProfile}
      />}
      <div className={showForm && !user ? 'blur_bg' : ''}>
        <NavBar
          user={user}
        // setShowForm={setShowForm}
        // setShowRegForm={setShowRegForm}
        />
      </div>
    </div>
  )
}
