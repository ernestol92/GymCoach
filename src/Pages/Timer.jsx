import React, { useState, useEffect } from 'react'

const Timer = () => {
  const [seconds, setSeconds] = useState(0)
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    if (!isRunning) return

    const interval = setInterval(() => {
      setSeconds(prev => prev + 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [isRunning])

  const reset = () => {
    setSeconds(0)
    setIsRunning(false)
  }

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60)
    const s = secs % 60
    return `${m}:${s.toString().padStart(2, '0')}`
  }

  return (
    <div className="timer">
      <h2>{formatTime(seconds)}</h2>

      <div className="timer-controls">
        {!isRunning ? (
          <button className='timer-btn' onClick={() => setIsRunning(true)}>Start</button>
        ) : (
          <button className='timer-btn' onClick={() => setIsRunning(false)}>Pause</button>
        )}
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  )
}

export default Timer
