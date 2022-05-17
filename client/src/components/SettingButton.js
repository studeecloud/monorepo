import ReactSlider from 'react-slider';
import './slider.css'

export default function SettingsButton() {
  return(
    <div style={{textAlign:'left'}}>
      <label>work minutes: </label>
      <ReactSlider
        className={'slider'}
        thumbClassName={'thumb'}
        trackClassName={'track'}
        value={45}
        min={1}
        max={120}
      />
      <label>break minutes: </label>
      <ReactSlider
        className={'slider'}
        thumbClassName={'thumb'}
        trackClassName={'track'}
        value={45}
        min={1}
        max={120}
      />
    </div>
  )
}