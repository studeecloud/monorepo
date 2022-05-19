import ReactSlider from 'react-slider';
import './slider.css';

export default function Settings(props) {
  // setShowSettings is booelan
  // workMinutes & setWorkMinutes and breakMinutes & setBreakMinutes are numbers
  const {
    setShowSettings,
    workMinutes,
    setWorkMinutes,
    breakMinutes,
    setBreakMinutes,
  } = props;

  return (
    <div style={{ textAlign: 'left' }}>
      <label>work: {workMinutes} </label>
      <ReactSlider
        className={'slider'}
        thumbClassName={'thumb'}
        trackClassName={'track'}
        value={workMinutes}
        onChange={(newValue) => setWorkMinutes(newValue)}
        min={1}
        max={60}
      />
      <label>break: {breakMinutes} </label>
      <ReactSlider
        className={'slider break'}
        thumbClassName={'thumb'}
        trackClassName={'track'}
        value={breakMinutes}
        onChange={(newValue) => setBreakMinutes(newValue)}
        min={1}
        max={60}
      />
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <button
          className="btn btn-primary"
          onClick={() => setShowSettings(false)}
        >
          Back
        </button>
      </div>
    </div>
  );
}
