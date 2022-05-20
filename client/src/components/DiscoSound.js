import React from 'react';
import { Howl } from 'howler';

export default function DiscoSound() {
  const sound = new Howl({
    src: ['/soundLibrary/JaydaG.mps'],
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
