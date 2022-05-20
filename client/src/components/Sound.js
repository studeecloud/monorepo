import React from 'react';
import { Howl, Howler } from 'howler';

export default function Sound() {
  const sound = new Howl({
    src: ['https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'],
    html5: true,
    preload: true,
    loop: true,
    volume: 1,
  });

  return (
    <div>
      <div onClick={() => sound.play()}> Play Sound</div>
      <div onClick={() => sound.pause()}> Pause Sound</div>
    </div>
  );
}
