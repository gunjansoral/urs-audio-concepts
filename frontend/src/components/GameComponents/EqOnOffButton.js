import { useState } from 'react'
import './style.css'

export default function EqOnOffButton() {
  const [on, setOn] = useState(false)
  return (
    <div className={`eq_on_off_button_wrap ${on ? 'eq_on' : ''}`} onClick={() => setOn((prev) => !prev)}>
      {on ? <span>Eq Off</span> : <span>Eq On</span>}
    </div>
  )
}
