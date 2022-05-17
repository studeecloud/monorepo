import ReactSlider from 'react-slider';
import './slider.css'

import { useContext } from 'react';
import SettingsContext from './SettingsContext';


export default function Settings() {
  
  const settingsInfo = useContext(SettingsContext);
  
  return(
    <div style={{textAlign:'left'}}>
      <label>work: {settingsInfo.workMinutes} </label>
      <ReactSlider
        className={'slider'}
        thumbClassName={'thumb'}
        trackClassName={'track'}
        value={settingsInfo.workMinutes}
        onChange={newValue => settingsInfo}
        min={1}
        max={120}
      />
      <label>break: {settingsInfo.breakMinutes} </label>
      <ReactSlider
        className={'slider break'}
        thumbClassName={'thumb'}
        trackClassName={'track'}
        value={settingsInfo.breakMinutes}
        min={1}
        max={120}
      />
    </div>
  )
}