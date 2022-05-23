import { useState, useEffect } from 'react';

import Settings from './Settings';
import Timer from './Timer';

export default function PomodoroTimer(props) {
  const {
    showSettings,
    setShowSettings,
    workMinutes,
    setWorkMinutes,
    breakMinutes,
    setBreakMinutes,
    secondsLeft,
    setSecondsLeft,
    isPaused,
    setIsPaused,
    mode,
    setMode,
  } = props;
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
    const countDownTimer = setInterval(() => {
      if (isPaused) {
        return;
      }
      if (secondsLeft === 0) {
        return switchMode();
      }

      tick();
    }, 1000);

    return () => clearInterval(countDownTimer);
  }, [isPaused, secondsLeft, workMinutes, mode, breakMinutes]);

  return (
    <main className="w-full">
      {showSettings ? (
        <Settings
          setShowSettings={setShowSettings}
          workMinutes={workMinutes}
          setWorkMinutes={setWorkMinutes}
          breakMinutes={breakMinutes}
          setBreakMinutes={setBreakMinutes}
          secondsLeft={secondsLeft}
          setSecondsLeft={setSecondsLeft}
          isPaused={isPaused}
          setIsPaused={setIsPaused}
          mode={mode}
          setMode={setMode}
        />
      ) : (
        <Timer
          setShowSettings={setShowSettings}
          workMinutes={workMinutes}
          setWorkMinutes={setWorkMinutes}
          breakMinutes={breakMinutes}
          setBreakMinutes={setBreakMinutes}
          secondsLeft={secondsLeft}
          setSecondsLeft={setSecondsLeft}
          isPaused={isPaused}
          setIsPaused={setIsPaused}
          mode={mode}
          setMode={setMode}
        />
      )}
    </main>
  );
}
