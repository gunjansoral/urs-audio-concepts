import './style.css'
import NavBar from '../../components/NavBar'
import { useSelector } from 'react-redux'

export default function MeetTheProducer() {
  const { user } = useSelector((user) => ({ ...user }))

  return (
    <div className='audio_motor_wrap'>
      <NavBar user={user} />
    </div>
  )
}
