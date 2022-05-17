import {useState} from "react";

import Settings from './Settings'
import Timer from './Timer';

import SettingsContext from './SettingsContext'

export default function PomodoroTimer() {
  
  const [showSettings, setShowSettings] = useState(false);
  const [workMinutes, setWorkMinutes] = useState(45);
  const [breakMinutes, seBreakMinutes] = useState(15)

  return (
    <main>
      <SettingsContext.Provider value={{
        workMinutes: 45,
        breakMinutes: 15,
      }}>
        {showSettings ? <Settings /> : <Timer/>}
      </SettingsContext.Provider>
    </main>
  )
}

