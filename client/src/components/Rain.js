import React from 'react';
import { Howl } from 'howler';

export default function Rain() {
  const sound = new Howl({
    src: ['http://localhost:8080/sounds/Rain.mp3'],
    html5: true,
    preload: true,
    loop: true,
    volume: 1,
  });

  return (
    <div>
      <div onClick={() => sound.play()}> Play Rain</div>
      <div onClick={() => sound.pause()}> Pause Rain</div>
    </div>
  );
}
