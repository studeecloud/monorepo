import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

import PlayButton from "./PlayButton";
import PauseButton from "./PauseButton";

import { useContext, useState, useEffect } from "react";
import SettingsContext from "./SettingsContext";

export default function Timer() {
  const [isPaused, setIsPaused] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [mode, setMode] = useState("work");

  const settingsInfo = useContext(SettingsContext);

  console.log("this is mode", mode);
  console.log("this is isPaused", isPaused);
  console.log("this is secondsLeft", secondsLeft);
  console.log("this is settingsInfo", settingsInfo);

  function tick() {
    setSecondsLeft((prev) => prev - 1);
  }

  useEffect(() => {
    function initTimer() {
      setSecondsLeft(settingsInfo.workMinutes * 60);
    }
    initTimer();
  }, [settingsInfo.workMinutes]);

  useEffect(() => {
    function switchMode() {
      const nextMode = mode === "work" ? "break" : "work";
      setMode(nextMode);
      setSecondsLeft(
        nextMode === "work"
          ? settingsInfo.workMinutes * 60
          : settingsInfo.breakMinutes * 60
      );
      // const nextSeconds =
      //   (nextMode === "work"
      //     ? settingsInfo.workMinutes
      //     : settingsInfo.breakMinutes) * 60;
    }

    const interval = setInterval(() => {
      if (isPaused) {
        return;
      }
      if (secondsLeft === 0) {
        return switchMode();
      }

      tick();
    }, 1000);

    return () => clearInterval(interval);
  }, [
    isPaused,
    secondsLeft,
    settingsInfo.workMinutes,
    mode,
    settingsInfo.breakMinutes,
  ]);

  const totalSeconds =
    mode === "work"
      ? settingsInfo.workMinutes * 60
      : settingsInfo.breakMinutes * 60;
  const percentage = Math.round((secondsLeft / totalSeconds) * 100);

  const minutes = Math.floor(secondsLeft / 60);
  let seconds = secondsLeft % 60;
  if (seconds < 10) seconds = "0" + seconds;

  return (
    <div>
      <span className="countdown font-mono text-2xl">
        <span style={{ value: { minutes } }}></span>:
        <span style={{ value: { seconds } }}></span>
      </span>
      <CircularProgressbar
        value={percentage}
        text={minutes}
        styles={buildStyles({
          textColor: "#f54e4e",
          pathColor: "#f54e4e",
          tailColor: "rgba(255,255,255,.2)",
        })}
      />
      <div style={{ marginTop: "20px" }}>
        {isPaused ? (
          <PlayButton setPlay={() => setIsPaused(false)} />
        ) : (
          <PauseButton setPause={() => setIsPaused(true)} />
        )}
      </div>
      <div style={{ marginTop: "20px" }}>
        <button
          className="btn btn-primary"
          onClick={() => settingsInfo.setShowSettings(true)}
        >
          Settings
        </button>
      </div>
    </div>
  );
}
