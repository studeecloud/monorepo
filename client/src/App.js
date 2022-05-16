import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BigHead } from '@bigheads/core';
import { connect, createLocalTracks } from 'twilio-video';
import { useTimer } from 'use-timer';


function App() {
  const [data, setData] = useState([]);
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

  useEffect(() => {
    axios
      .get('http://localhost:3000/users')
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const headNum = 5;
  const headArray = [];

  for (let i = 1; i <= headNum; i++) {
    headArray.push(
      <div style={{ width: '5rem' }} key={i.toString()}>
        <BigHead />
      </div>
    );
  }

  //Helper function to convert seconds into min/sec fomrat
  
  return (
    <main style={{ margin: '0 0 0 1rem' }}>
      <h1>StudeeCloud App</h1>

      <button className="btn btn-primary">Swag</button>
      <>
        <div>
          <button className="btn btn-primary" onClick={start}>Start</button>
          <button className="btn btn-primary" onClick={pause}>Pause</button>
          <button className="btn btn-primary" onClick={reset}>Reset</button>
        </div>
        <p>Elapsed time: {min}:{sec} </p>
        {status === 'RUNNING' && <p>Running...</p>}
    </>
    </main>
  );
}

export default App;
