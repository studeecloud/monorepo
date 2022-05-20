import React from 'react';
import { Howl } from 'howler';

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
      <div onClick={() => sound.pause()}> Pause Disco</div>
    </div>
  );
}
