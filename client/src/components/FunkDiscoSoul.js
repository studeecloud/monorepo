import React from 'react';
import { Howl } from 'howler';

export default function FunkDiscoSoul() {
  const sound = new Howl({
    src: ['http://localhost:8080/sounds/FunkDiscoSoul.mp3'],
    html5: true,
    preload: true,
    loop: true,
    volume: 1,
  });

  return (
    <div>
      <div onClick={() => sound.play()}> Play Fu Mix</div>
      <div onClick={() => sound.pause()}> Pause Fu Mix</div>
    </div>
  );
}
