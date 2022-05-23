import { useState } from 'react';
import { Howl } from 'howler';
import ReactHowler from 'react-howler';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  solid,
  regular,
  brands,
} from '@fortawesome/fontawesome-svg-core/import.macro';

const sound = new Howl({
  //TODO: Remove direct reference to localhost in file src
  src: ['http://localhost:8080/public/Rain.mp3'],
  html5: true,
  preload: true,
  loop: true,
  volume: 0.8,
});

export default function RainSound() {
  const [playing, setPlaying] = useState(false); //Used by pause & play buttons on timer
  const src = 'http://localhost:8080/public/Rain.mp3';

  const playSound = () => {
    setPlaying(true);
  };

  const pauseSound = () => {
    setPlaying(false);
  };

  return (
    <section className="flex flex-row justify-around">
      <div>
        <h1 className="font-body text-2xl text-center">Rainy</h1>
      </div>
      <div>
        <ReactHowler playing={playing} src={[src]} />
        {playing ? (
          <button onClick={pauseSound}>
            <FontAwesomeIcon icon={solid('circle-pause')} />
          </button>
        ) : (
          <button onClick={playSound}>
            <FontAwesomeIcon icon={solid('circle-play')} />
          </button>
        )}
      </div>
    </section>
  );
}
