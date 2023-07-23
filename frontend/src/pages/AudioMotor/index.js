import './style.css'
import NavBar from '../../components/NavBar'
import { useSelector } from 'react-redux'
import Eq from '../EarWorkout/Eq'
import Fader from '../../components/GameComponents/Fader'

export default function AudioMotor() {
  const { user } = useSelector((user) => ({ ...user }))
  return (<>
    <NavBar user={user} />
    <Eq />
    {/* AudioEngineering */}
    {/* MusicProduction */}
    {/* Music */}
    <div className="faders">
      <Fader value="5" min="-10" max="10" />
      <Fader value="200" />
      <Fader />
      <Fader />
      <Fader />
      <Fader />
    </div>

  </>)
}
