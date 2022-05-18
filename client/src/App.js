import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BigHead } from '@bigheads/core';
import { connect, createLocalTracks } from 'twilio-video';
// import { useTimer } from 'use-timer';
import TimerTest from './components/TimerTests';
import PomodoroTimer from './components/PomodoroTimer';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  solid,
  regular,
  brands,
} from '@fortawesome/fontawesome-svg-core/import.macro'; // <-- import styles to be used

function App() {
  const [data, setData] = useState([]);
  /// PRATICE CODE: Implementing Timer with useState and useEffect()
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [timer, setTimer] = useState();

  const startTimer = () => {
    const timer = setInterval(() => {
      setSecondsLeft((secondsLeft) => secondsLeft - 1);
      if (secondsLeft === 0) {
        clearInterval(timer);
      }
    }, 1000);
    setTimer(timer);
  };

  useEffect(() => {
    if (secondsLeft === 0) {
      clearInterval(timer);
    }
  }, [secondsLeft, timer]);

  useEffect(() => {
    return () => clearInterval(timer);
  }, [timer]);

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
      <h1 className="font-display text-5xl text-teal text-center">
        StudeeCloud
      </h1>
      <h2 className="font-header text-4xl text-center">
        Collaborative
        <br />
        Study Environment
      </h2>

      <p className="font-body text-lg">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Class aptent
        taciti sociosqu ad litora!
      </p>

      <button className="btn btn-primary font-header text-3xl">SIGN IN</button>
      <FontAwesomeIcon icon={solid('user-secret')} />
      <FontAwesomeIcon icon={regular('coffee')} />
      <div className="flex w-fit border-2 border-black">
        <div
          className="bg-dark-gray text-meringue text-center"
          style={{ width: '8rem', height: '4rem' }}
        >
          dark-gray
        </div>
        <div
          className="bg-deep-purple text-meringue text-center"
          style={{ width: '8rem', height: '4rem' }}
        >
          deep-purple
        </div>
        <div
          className="bg-plum text-meringue text-center"
          style={{ width: '8rem', height: '4rem' }}
        >
          plum
        </div>
        <div
          className="bg-teal text-meringue text-center"
          style={{ width: '8rem', height: '4rem' }}
        >
          teal
        </div>
        <div
          className="bg-coral text-center"
          style={{ width: '8rem', height: '4rem' }}
        >
          coral
        </div>
        <div
          className="bg-gold text-center"
          style={{ width: '8rem', height: '4rem' }}
        >
          gold
        </div>
        <div
          className="bg-meringue text-center"
          style={{ width: '8rem', height: '4rem' }}
        >
          meringue
        </div>
      </div>
      <PomodoroTimer />
    </main>
  );
}

export default App;
