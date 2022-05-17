import {CircularProgressbar, buildStyles} from 'react-circular-progressbar'


import PlayButton from './PlayButton'
import PauseButton from './PauseButton'
import SettingsButton from './SettingButton'

export default function Timer() {

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
    <div>
        <PlayButton />
        <PauseButton />
      </div>

    <div>
      <SettingsButton />
    </div>
    </div>
  );
}