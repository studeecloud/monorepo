import { Howl } from 'howler';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  solid,
  regular,
  brands,
} from '@fortawesome/fontawesome-svg-core/import.macro';

export default function RainSound() {
  const sound = new Howl({
    //TODO: Remove direct reference to localhost in file src
    src: ['http://localhost:8080/public/Rain.mp3'],
    html5: true,
    preload: true,
    loop: true,
    volume: 0.8,
  });

  return (
    <section className="flex flex-row justify-around">
      <div>
        <h1 className="font-body text-2xl text-black text-center">Rainy</h1>
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
