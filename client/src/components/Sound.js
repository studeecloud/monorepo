import React from 'react';
import { Howl } from 'howler';

export default function Sound() {
  const soundSource =
    'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';

  const callMySound = (src) => {
    const sound = new Howl({
      src,
      html5: true,
    });
    sound.play();
  };

  return (
    <div>
      <div onClick={() => callMySound(soundSource)}> Sound</div>
    </div>
  );
}
