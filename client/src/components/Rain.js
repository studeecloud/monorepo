import { useState } from 'react';
import { Howl, Howler } from 'howler';
import ReactSlider from 'react-slider';

export default function Rain() {
  const [volume, setVolume] = useState(1);

  const decimalVolume = volume / 100.0;
  console.log('Test decimale Volume', decimalVolume);

  const volumeCheck = () => console.log('testing to see if onVolume Works');
  const sound = new Howl({
    src: ['http://localhost:8080/sounds/Rain.mp3'],
    html5: true,
    preload: true,
    loop: true,
    volume: decimalVolume,
    onvolume: volumeCheck,
  });

  //Howler method that changes volume
  sound.volume(decimalVolume);

  // console.log('testing if volume state changes', volume);
  // console.log('testing to check sound volume', sound.volume);

  return (
    <div>
      <button
        className="btn btn-primary border-2 border-teal font-header text-3xl"
        onClick={() => {
          sound.play();
          console.log('testing if play button work');
        }}
      >
        Play Rain
      </button>
      <ReactSlider
        className={'slider'}
        thumbClassName={'thumb'}
        trackClassName={'track'}
        min={0}
        max={100}
        onChange={(value) => {
          sound.volume(value / 100.0);
          setVolume(value);
        }}
      />
      <button
        className="btn btn-primary border-2 border-teal font-header text-3xl"
        onClick={() => {
          sound.pause();
          console.log('testing if pause button work');
        }}
      >
        Pause Rain
      </button>
    </div>
  );
}
