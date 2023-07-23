import { useState } from 'react'
import './style.css'

export default function Fader({
  id, ref, value, onChange, min, max, step
}) {
  return (
    <div className="fader_wrap">
      <div className="fader_value">{`${value} db`}</div>
      <input className='fader' type="range" id={id}
        ref={ref}
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        step={step} />
    </div>
  )
}
