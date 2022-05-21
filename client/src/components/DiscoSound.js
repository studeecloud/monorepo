import { useState } from 'react';
import { Howl, Howler } from 'howler';
import ReactSlider from 'react-slider';

export default function DiscoSound() {
  const [volume, setVolume] = useState(1);

  const decimalVolume = volume / 100.0; //volume property of Howl objects has rnage from 0-1

  // Helper call-back function that's called with the onvolume property (itself a method)
  // onvolume is called everytime a howler object has it's volume changed
  const volumeCheck = () => console.log('testing to see if volume changed');

  // Directly changed via the play and pause buttons
  // through state change, volume property is changed via slider
  const sound = new Howl({
    src: ['http://localhost:8080/sounds/FunkDiscoSoul.mp3'],
    html5: true,
    preload: true,
    loop: true,
    volume: decimalVolume,
    onvolume: volumeCheck,
  });

  //Invoking global function to change volume based state: volume
  Howler.volume(decimalVolume);

  return (
    <div>
      <button
        className="btn btn-primary border-2 border-teal font-header text-3xl"
        onClick={() => {
          sound.play();
          console.log('testing if play button work');
        }}
      >
        Play Disco
      </button>
      <ReactSlider
        className={'slider'}
        thumbClassName={'thumb'}
        trackClassName={'track'}
        min={0}
        max={100}
        onChange={(value) => {
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
        Pause Disco
      </button>
    </div>
  );
}
