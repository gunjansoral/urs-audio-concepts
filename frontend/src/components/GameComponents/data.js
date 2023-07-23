export const fsr = [
  {
    level: '1',
    options: {
      lows: '20hz to 1khz',
      highs: '1khz to 20khz'
    }
  },
  {
    level: '2',
    options: {
      lows: '20hz to 100hz',
      mids: '100hz to 5khz',
      highs: '5khz to 20khz'
    }
  },
  {
    level: '3',
    options: {
      lows: '20hz to 100hz',
      low_mids: '100hz to 1khz',
      high_mids: '1khz to 5khz',
      highs: '5khz to 20khz'
    }
  },
  {
    level: '4',
    options: {
      bass: '20hz to 100hz',
      bass: '100hz to 500hz',
      honkiness: '500hz to 1khz',
      harshness: '1khz to 4khz',
      presence: '4khz to 7khz',
      air: '7khz to 20khz'
    }
  },
  {
    level: '5',
    options: {
      subs: '20hz to 60hz',
      bass: '60hz to 100hz',
      body: '100hz to 300hz',
      muddiness: '300hz to 500hz',
      honkiness: '500hz to 1khz',
      harshness: '1khz to 4khz',
      presence: '4khz to 7khz',
      air: '7khz to 20khz'
    }
  }
]