import { useState } from 'react';

import Settings from './Settings';
import Timer from './Timer';

export default function PomodoroTimer() {
  const [showSettings, setShowSettings] = useState(false);
  const [workMinutes, setWorkMinutes] = useState(45);
  const [breakMinutes, setBreakMinutes] = useState(15);

  return (
    <main>
      {showSettings ? (
        <Settings
          setShowSettings={setShowSettings}
          workMinutes={workMinutes}
          setWorkMinutes={setWorkMinutes}
          breakMinutes={breakMinutes}
          setBreakMinutes={setBreakMinutes}
        />
      ) : (
        <Timer
          setShowSettings={setShowSettings}
          workMinutes={workMinutes}
          setWorkMinutes={setWorkMinutes}
          breakMinutes={breakMinutes}
          setBreakMinutes={setBreakMinutes}
        />
      )}
    </main>
  );
}
