import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

import PlayButton from "./PlayButton";
import PauseButton from "./PauseButton";

import { useContext, useState, useEffect, useRef } from "react";
import SettingsContext from "./SettingsContext";

export default function Timer() {
  const [isPaused, setIsPaused] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [mode, setMode] = useState("work");

  const secondsLeftRef = useRef(secondsLeft);
  const isPausedRef = useRef(isPaused);

  function switchMode() {
    const nextMode = mode === "work" ? "break" : "work";
    setMode(nextMode);
    setSecondsLeft(
      nextMode === "work"
        ? settingsInfo.workMinutes * 60
        : settingsInfo.breakMinutes * 60
    );
  }

  function tick() {
    setSecondsLeft(setSecondsLeft - 1);
  }

  function initTimer() {
    setSecondsLeft(settingsInfo.workMinutes * 60);
  }

  useEffect(() => {
    initTimer();

    setInterval(() => {
      if (isPaused) {
        return;
      }
      if (secondsLeft === 0) {
        return switchMode();
      }

      tick();
    });
  }, [settingsInfo]);

  const settingsInfo = useContext(SettingsContext);
  return (
    <div>
      <CircularProgressbar
        value={60}
        text={`60%`}
        styles={buildStyles({
          textColor: "#f54e4e",
          pathColor: "#f54e4e",
          tailColor: "rgba(255,255,255,.2)",
        })}
      />
      <div style={{ marginTop: "20px" }}>
        {isPaused ? <PlayButton /> : <PauseButton />}
      </div>
      <div style={{ marginTop: "20px" }}>
        <button
          className="btn btn-primary"
          onClick={() => settingsInfo.setShowSettings(true)}
        >
          {" "}
          Settings{" "}
        </button>
      </div>
    </div>
  );
}
