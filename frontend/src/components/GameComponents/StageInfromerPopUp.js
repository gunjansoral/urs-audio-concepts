import { useState } from 'react'
import './style.css'

export default function StageInformerPopUp({ title, stage, level, message, afterRender }) {
  const [a, setA] = useState(true)
  const [b, setB] = useState(true)
  setTimeout(() => {
    setA(false)
    setTimeout(() => {
      setB(false)
      afterRender()
    }, 2000)
  }, 2000)
  // console.log(typeof (fun()))
  return (<div className="stage_informer_wrap">
    {a ? (
      <div className="game_title">
        <span className='title'>{title}</span>
        <div className="title_2">
          <span>{`Stage = ${stage}, Level = ${level}`}</span>
        </div>
      </div>
    ) : b && (<div className="message">
      <span>{message}</span>
    </div>)}
  </div>)
}