import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { BigHead } from "@bigheads/core";
import { connect, createLocalTracks } from "twilio-video";
// import { useTimer } from 'use-timer';
import TimerTest from "./components/TimerTests";
import PomodoroTimer from "./components/PomodoroTimer";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  solid,
  regular,
  brands,
} from "@fortawesome/fontawesome-svg-core/import.macro"; // <-- import styles to be used

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
      .get("http://localhost:3000/users")
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
      <div style={{ width: "5rem" }} key={i.toString()}>
        <BigHead />
      </div>
    );
  }

  return (
    <main style={{ margin: "0 0 0 1rem" }}>
      <h1>StudeeCloud App</h1>
      <PomodoroTimer />
      <button className="btn btn-primary">Swag</button>
      <FontAwesomeIcon icon={solid("user-secret")} />
      <FontAwesomeIcon icon={regular("coffee")} />
      <div>{headArray}</div>
    </main>
  );
}

export default App;
