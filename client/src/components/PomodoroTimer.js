import {useState} from "react";

import Timer from './Timer';

export default function PomodoroTimer() {
  
  const [showSettings, setShowSettings] = useState(false)


  return (
    <main>
      {showSettings ? <settings /> : <Timer/>}
    </main>
  )
}

