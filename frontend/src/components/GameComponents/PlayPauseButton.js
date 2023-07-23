import './style.css'
import { ImPlay, ImPlay2 } from 'react-icons/im'
import { ImPause } from 'react-icons/im'
import { useState } from 'react'

export default function PlayPauseButton({ onClick }) {
  const [isPlay, setIsPlay] = useState(false)
  return (
    <div onClick={onClick}>
      <div
        onClick={() => setIsPlay((prev) => !prev)}
      >
        {isPlay ? (<>
          <ImPause className="play_pause_button" size={50} />
        </>) : (<>
          <ImPlay2 className="play_pause_button" size={50} />
        </>)}
      </div>
    </div>
  )
}
