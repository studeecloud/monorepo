import {CircularProgressbar, buildStyles} from 'react-circular-progressbar'


import PlayButton from './PlayButton'
import PauseButton from './PauseButton'
import SettingsButton from './SettingsButton'

import {useContext} from "react";
import SettingsContext from './SettingsContext';

export default function Timer() {
  const settingsInfo = useContext(SettingsContext)
  return (
    <div>
      <CircularProgressbar 
      value={60} 
      text={`60%`}
      styles={buildStyles({
      textColor:'#f54e4e',
      pathColor:'#f54e4e',
      tailColor:'rgba(255,255,255,.2)'
      })}
    />
    <div style={{marginTop:'20px'}} >
        <PlayButton />
        <PauseButton />
    </div>
    <div style={{marginTop:'20px'}}>
        <SettingsButton onClick={() => settingsInfo.setShowSettings(true)} />
    </div>

    </div>
  );
}