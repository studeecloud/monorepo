import {useState} from "react";

import Settings from './Settings'
import Timer from './Timer';

import SettingsContext from './SettingsContext'

export default function PomodoroTimer() {
  
  const [showSettings, setShowSettings] = useState(false);
  const [workMinutes, setWorkMinutes] = useState(45);
  const [breakMinutes, setBreakMinutes] = useState(15);

  return (
    <main>
      <SettingsContext.Provider value={{
        showSettings,
        setShowSettings,
        workMinutes,
        breakMinutes,
        setWorkMinutes,
        setBreakMinutes,
      }}>
        {showSettings ? <Settings /> : <Timer />}
        {< Settings />}
      </SettingsContext.Provider>
    </main>
  );
}

