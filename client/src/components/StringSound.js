import { useState } from 'react';
import ReactHowler from 'react-howler';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  solid,
  regular,
  brands,
} from '@fortawesome/fontawesome-svg-core/import.macro';

export default function StringSound() {
  const [playing, setPlaying] = useState(false); //Used by pause & play buttons on timer
  const src = 'http://localhost:8080/public/Strings.mp3';

  const playSound = () => {
    setPlaying(true);
  };

  const pauseSound = () => {
    setPlaying(false);
  };

  return (
    <section className="flex flex-row justify-around">
      <div>
        <h1 className="font-body text-2xl text-center">Violin</h1>
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
