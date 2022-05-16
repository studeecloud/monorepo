import React from 'react';
import '../App.css';
import { useTimer } from 'use-timer';


export default function Timer() {
  let startTime = 3000;

  const { time, start, pause, reset, status } = useTimer({
      timerType: 'DECREMENTAL',
      initialTime: startTime,
      endTime: 0,
      onTimeOver: () => {
        console.log('Time is over');
      },
    });

    // console.log("this is the time ", time)
    // console.log("this is status", status)
    // console.log("this is userTimer", useTimer)
    const min = Math.floor(time/60)
    const sec = (time - min * 60).toString().padStart(2, "0")



    const startPauseButton = () => {
      if(status === "RUNNING"){
        return <button className="btn btn-primary" onClick={pause}>Pause</button>
      } else {
        return <button className="btn btn-primary" onClick={start}>Start</button>

      }
    }

    const toggleTimer = () => {
      if(startTime === 3000){
        startTime = 1500
      } else {
        startTime = 3000
      };
    };
    console.log("this is start time", startTime);

  return(
    <div>
        <div>
          {startPauseButton()}
          <button className="btn btn-primary" onClick={reset}>Reset</button>
          <button className="btn btn-primary" onClick={toggleTimer}>Toggle</button>
        </div>
        <h2> {min}:{sec} </h2>
        {status === 'RUNNING' && <p>Running...</p>}
    </div>
  )
}