import React from 'react';
import { Howl } from 'howler';
import ReactSlider from 'react-slider';

export default function DiscoSound() {
  const sound = new Howl({
    src: ['http://localhost:8080/sounds/JaydaG.mp3'],
    html5: true,
    preload: true,
    loop: true,
    volume: 1,
  });

  return (
    <div>
      <div onClick={() => sound.play()}> Play Disco</div>
      <ReactSlider
        className={'slider'}
        thumbClassName={'thumb'}
        trackClassName={'track'}
        min={1}
        max={60}
        onChange={(newValue) => (sound.volume = newValue)}
      />
      <div onClick={() => sound.pause()}> Pause Disco</div>
    </div>
  );
}

// display: inline-block;
// border-radius: 3px;
// padding: 0.5rem 0;
// margin: 0.5rem 1rem;
// width: 11rem;
// background: transparent;
// color: white;
// border: 2px solid white;
