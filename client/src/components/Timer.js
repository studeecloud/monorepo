import React from 'react';
import './App.css';
import { useTimer } from 'use-timer';


export default function Timer() {
  const { time, start, pause, reset, status } = useTimer({
      timerType: 'DECREMENTAL',
      initialTime: 60,
      endTime: 0,
      onTimeOver: () => {
        console.log('Time is over');
      },
    });

    console.log("this is the time ", time)
    const min = Math.floor(time/60)
    const sec = (time - min * 60).toString().padStart(2, "0")

  return(
    <div>
        <div>
          <button className="btn btn-primary" onClick={start}>Start</button>
          <button className="btn btn-primary" onClick={pause}>Pause</button>
          <button className="btn btn-primary" onClick={reset}>Reset</button>
        </div>
        <p>Elapsed time: {min}:{sec} </p>
        {status === 'RUNNING' && <p>Running...</p>}
    </div>
  )
}