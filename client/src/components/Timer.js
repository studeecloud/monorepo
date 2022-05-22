import {
  CircularProgressbarWithChildren,
  buildStyles,
} from 'react-circular-progressbar';

//FIXME: Componenents have only a single onClick callback that changes isPaused state.
// Can be removed added direclty to this document
import PlayButton from './PlayButton';
import PauseButton from './PauseButton';

import { useState, useEffect } from 'react';

export default function Timer(props) {
  // setShowSettings is booelan
  // workMinutes and breakMinutes are both numbers
  const { setShowSettings, workMinutes, breakMinutes } = props;

  const [isPaused, setIsPaused] = useState(true); //Used by pause & play buttons on timer
  const [mode, setMode] = useState('work'); // "Work" and "Play" alternate once timer reaches 0
  const [secondsLeft, setSecondsLeft] = useState(0); //Each mode has independent secondsLeft state

  // Initializes timer with "work" mode first
  useEffect(() => {
    function initTimer() {
      setSecondsLeft(workMinutes * 60);
    }
    initTimer();
  }, [workMinutes]);

  useEffect(() => {
    function switchMode() {
      const nextMode = mode === 'work' ? 'break' : 'work';
      setMode(nextMode);
      setSecondsLeft(
        nextMode === 'work' ? workMinutes * 60 : breakMinutes * 60
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
  }, [isPaused, secondsLeft, workMinutes, mode, breakMinutes]);

  // Helper functions to calcuate time left in Min:Sec format
  const totalSeconds = mode === 'work' ? workMinutes * 60 : breakMinutes * 60;

  const minutes = Math.floor(secondsLeft / 60);
  let seconds = secondsLeft % 60;
  // Conditional needed to display leading 0
  if (seconds < 10) seconds = '0' + seconds;

  // Helper function to calcuate perfentage of time left
  // REVIEW: Helper function is used in CircularProgressBar Componenet.
  // Not MVP nor does it necessarily follow our theme. Also, DaisyUI has progress bar components
  const percentage = Math.round((secondsLeft / totalSeconds) * 100);

  return (
    <div className="flex w-full items-center justify-center">
      <CircularProgressbarWithChildren
        value={percentage}
        className="w-24"
        styles={buildStyles({
          textColor: 'black',
          pathColor: 'black',
          tailColor: 'rgba(255,255,255,.2)',
        })}
      >
        <p>{minutes + ':' + seconds}</p>
      </CircularProgressbarWithChildren>

      <div className="ml-4">
        <div>
          {isPaused ? (
            <PlayButton setPlay={() => setIsPaused(false)} />
          ) : (
            <PauseButton setPause={() => setIsPaused(true)} />
          )}
        </div>
        <div>
          <button
            className="bg-meringue border-2 border-dark-purple font-body p-2 rounded text-dark-gray text-2xl"
            onClick={() => setShowSettings(true)}
          >
            Settings
          </button>
        </div>
      </div>
    </div>
  );
}
