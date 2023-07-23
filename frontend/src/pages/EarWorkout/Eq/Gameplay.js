export const initAudio = (ctx, element, faderRef, prev, next) => {
  console.log(faderRef)
  document.createElement('input', 'range')
  // const ctx = new AudioContext()
  const source = ctx.createMediaElementSource(element)

  source
    .connect(prev)
    .connect(next)
  return ctx
}
export const eventListeners = (ctx, inputElement, node) => {
  inputElement.addEventListener('input', (e) => {
    const value = parseFloat(e.target.value)
    node.gain.setTargetAtTime(value, ctx.currentTime, .01)
  })
}
export const randomFreq = () => { //return random frequency in hz
  const arr = [1, 2, 4, 8, 16, 32, 64, 128, 256, 512]
  const mutiplier = Math.floor(Math.random() * 10)
  return 31.25 * arr[mutiplier]
}
export const randomGain = (gain) => {
  return (Math.random() < 0.5 ? -1 : 1) * gain
}
export const typeRandomizer = () => {
  return Math.random() < 0.5 ? 'lowshelf' : 'highshelf'
}
export const checkAnswer = (userAnswer, givenAnswer) => {
  if (userAnswer === givenAnswer) return true
  return false
}
export const checkEqShelf = (node) => {
  if (node.type === 'lowshelf' && node.gain.value > 0) return { type: 'thick', freq: 100 }
  if (node.type === 'lowshelf' && node.gain.value < 0) return { type: 'thin', freq: 100 }
  if (node.type === 'highshelf' && node.gain.value > 0) return { type: 'bright', freq: 5000 }
  if (node.type === 'highshelf' && node.gain.value < 0) return { type: 'dark', freq: 5000 }
}