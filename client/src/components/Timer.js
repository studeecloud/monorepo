import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

//FIXME: Componenents have only a single onClick callback that changes isPaused state.
// Can be removed added direclty to this document
import PlayButton from './PlayButton';
import PauseButton from './PauseButton';

import { useContext, useState, useEffect } from 'react';
import SettingsContext from './SettingsContext'; //FIXME: useContext component to be removed

export default function Timer() {
  const [isPaused, setIsPaused] = useState(false); //Used by pause & play buttons on timer
  const [mode, setMode] = useState('work'); // "Work" and "Play" alternate once timer reaches 0
  const [secondsLeft, setSecondsLeft] = useState(0); //Each mode has independent secondsLeft state

  // FIXME: Refactor using just props (see values being passed through Provide component in PomodoroTimer file)
  const settingsInfo = useContext(SettingsContext);

  // console.log('this is mode', mode);
  // console.log('this is isPaused', isPaused);
  // console.log('this is secondsLeft', secondsLeft);
  // console.log('this is settingsInfo', settingsInfo);

  // Initializes timer with "work" mode first
  // FIXME: All settingsInfo will be replaced props
  useEffect(() => {
    function initTimer() {
      setSecondsLeft(settingsInfo.workMinutes * 60);
    }
    initTimer();
  }, [settingsInfo.workMinutes]);

  useEffect(() => {
    function switchMode() {
      const nextMode = mode === 'work' ? 'break' : 'work';
      setMode(nextMode);
      setSecondsLeft(
        nextMode === 'work'
          ? settingsInfo.workMinutes * 60
          : settingsInfo.breakMinutes * 60
      );
    }

    // Decrement timer helper function
    function tick() {
      setSecondsLeft((prev) => prev - 1);
    }

    //Main function controlling timer countdown for both mode
    //TODO: Rename as potential timerCountDown?
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

  // Helper functions to calcuate time left in Min:Sec format
  const totalSeconds =
    mode === 'work'
      ? settingsInfo.workMinutes * 60
      : settingsInfo.breakMinutes * 60;

  const minutes = Math.floor(secondsLeft / 60);
  let seconds = secondsLeft % 60;
  // Conditional needed to display leading 0
  if (seconds < 10) seconds = '0' + seconds;

  // Helper function to calcuate perfentage of time left
  // REVIEW: Helper function is used in CircularProgressBar Componenet.
  // Not MVP nod does it necessarily follow our them. Also, DaisyUI has progress bar components
  const percentage = Math.round((secondsLeft / totalSeconds) * 100);

  return (
    <div>
      <span className="countdown font-mono text-2xl">
        <span style={{ value: { minutes } }}></span>:
        <span style={{ value: { seconds } }}></span>
      </span>
      <CircularProgressbar
        value={percentage}
        text={minutes + ':' + seconds}
        styles={buildStyles({
          textColor: '#f54e4e',
          pathColor: mode === 'work' ? '#f54e4e' : '#00FF00',
          tailColor: 'rgba(255,255,255,.2)',
        })}
      />
      <div style={{ marginTop: '20px' }}>
        {isPaused ? (
          <PlayButton setPlay={() => setIsPaused(false)} />
        ) : (
          <PauseButton setPause={() => setIsPaused(true)} />
        )}
      </div>
      <div style={{ marginTop: '20px' }}>
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
