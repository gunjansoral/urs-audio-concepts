import { useEffect, useRef, useState } from 'react'
import './style.css'
import PlayPauseButton from '../../../components/GameComponents/PlayPauseButton'
import EqOnOffButton from '../../../components/GameComponents/EqOnOffButton'
import { checkAnswer, checkEqShelf, eventListeners, initAudio, randomFreq, randomGain, typeRandomizer } from './Gameplay'
var ctx = new AudioContext, element, Node

export default function Stage1() {
  const faderRef = useRef(null)
  const [answer, setAnswer] = useState()
  const [score, setScore] = useState(0)
  const [isPlay, setIsPlay] = useState(false)

  const onStart = async () => {
    Node = new BiquadFilterNode(ctx, {
      type: typeRandomizer(),
      frequency: 0,
      // q: 0.2,
      gain: randomGain(10)
    })
    Node.frequency.value = checkEqShelf(Node).freq
    let gainNode = new GainNode(ctx, { gain: 0.01 })
    element = document.getElementById('audio')
    let destination = gainNode.connect(Node)
      .connect(ctx.destination)
    await initAudio(ctx, element, faderRef, Node, destination)
    playPause()
    console.log(Node)
  }
  const playPause = () => {
    if (isPlay === false) {
      if (ctx && ctx.state === 'suspended') {
        ctx.resume()
      }
      element.play()
      setIsPlay(true)
      console.log('isPlay == true')
    } else {
      element.pause()
      setIsPlay(false)
      console.log('isPlay == false')
    }
    console.log(randomFreq())
  }

  const handleClick = () => {
    if (checkAnswer(answer, checkEqShelf(Node).type)) {
      setScore(score + 1)
    }
  }
  return (<>
    {/* Level1 */}
    <PlayPauseButton onClick={() => playPause()} />
    <EqOnOffButton />
    <button onClick={() => onStart()}>start</button>
    <div className="level_1">
      {answer} {score}
      <audio id='audio' src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/858/outfoxing.mp3" crossOrigin="anonymous" ></audio>
      <div onChange={(e) => setAnswer(e.target.value)} >
        <label htmlFor="frequency"></label>
        <div className="label">
          <input type="radio" value='thick' name='frequency' />
          <span>Thick</span>
        </div>
        <div className="label">
          <input type="radio" value='thin' name='frequency' />
          <span>Thin</span>
        </div>
        <div className="label">
          <input type="radio" value='bright' name='frequency' />
          <span>Bright</span>
        </div>
        <div className="label">
          <input type="radio" value='dark' name='frequency' />
          <span>Dark</span>
        </div>
      </div>
      <button onClick={() => handleClick()}>Check Answer</button>
    </div>
    {/* Level2 */}
    {/* Level3 */}
    {/* Level4 */}
    {/* Level5 */}
  </>)
}
