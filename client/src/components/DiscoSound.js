import { useState } from 'react';
import { Howl, Howler } from 'howler';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  solid,
  regular,
  brands,
} from '@fortawesome/fontawesome-svg-core/import.macro';

//REVIEW: Slider component only necessary as stretch to incoporate volume control
//import ReactSlider from 'react-slider';

//REVIEW: Test to code here before adjusting Rain & Ghibli components
//TODO: Refactor into single component
export default function DiscoSound() {
  const [volume, setVolume] = useState(1);
  const decimalVolume = volume / 100.0; //volume property of Howl objects has rnage from 0-1

  // Helper call-back function that's called with the onvolume property (itself a method)
  // onvolume is called everytime a howler object has it's volume changed
  const volumeCheck = () => console.log('testing to see if volume changed');

  // Directly changed via the play and pause buttons
  // through state change, volume property is changed via slider
  //REVIEW: Changed volume property from decimalVolume to hardcode max
  const sound = new Howl({
    //TODO: Remove direct reference to localhost in file src
    src: ['http://localhost:8080/public/Disco.mp3'],
    html5: true,
    preload: true,
    loop: true,
    volume: 1,
    onvolume: volumeCheck,
  });

  //Invoking global function to change volume based state: volume
  //REVIEW: Removed global implementation of volume change (only used with volume slider)
  // Howler.volume(decimalVolume);

  return (
    <section className="flex flex-row justify-around">
      <div>
        <h1 className="font-body text-2xl text-black text-center">Disco </h1>
      </div>
      <div>
        <button
          type="button"
          name="playSound"
          className="px-3"
          onClick={() => {
            sound.play();
          }}
        >
          <FontAwesomeIcon icon={solid('circle-play')} />
        </button>

        <button
          type="button"
          name="playSound"
          onClick={() => {
            sound.pause();
          }}
        >
          <FontAwesomeIcon icon={solid('circle-pause')} />
        </button>
      </div>
    </section>
  );
}
