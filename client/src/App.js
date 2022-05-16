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
    initialTime: 3000,
    onTimeOver: () => {
      console.log('Time is over');
    },
  });

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

  return (
    <main style={{ margin: '0 0 0 1rem' }}>
      <h1>StudeeCloud App</h1>

      <button className="btn btn-primary">Swag</button>
      <div>{headArray}</div>
      <>
        <div>
          <button onClick={start}>Start</button>
          <button onClick={pause}>Pause</button>
          <button onClick={reset}>Reset</button>
        </div>
        <p>Elapsed time: {time}</p>
        {status === 'RUNNING' && <p>Running...</p>}
    </>
    </main>
  );
}

export default App;
