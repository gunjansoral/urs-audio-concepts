import './style.css'
import { useRef, useState } from 'react'

import Stage1 from './Stage1'

export default function Eq() {
  const faderRef = useRef(null)
  const [gain, setGain] = useState(0.5)
  return (<>
    <div className="playboard">
      {/* <Fader
        id='fader'
        ref={faderRef}
        type="range"
        value={gain}
        onChange={(e) => setGain(e.target.value)}
        min='20'
        max='20000'
        step="100"
      /> */}
      <Stage1 />
    </div>

    {/* game_states
    stage,level, chancesLeft, totalChances, currentScore, totalScore, isPlay, gameOver, rank
    */}

    {/* components 
    playBoard, 
    playPauseButton, EqOnOffButton, stopButton, closeButton, 
    tryAgainButton, gameOverPopPup
    */}
    {/* game_strategy */}
    {/* level 1 -> 10 db 
    Level 2 -> 7 db
    Level 3 -> 4 db
    Level 4 -> 2 db
    Level 5 -> 1 db

    total chances -> 10,
    to pass the level -> currentScore >= 60%

    on complition, stop -> store currentLevel to database
    */}

    {/* game_logic 
    const checkAnswer = (answer) => {
      if(answer === correctAnswer) return true
      if(answer !== correctAnswer) return false
    }


    */}
  </>)
}
