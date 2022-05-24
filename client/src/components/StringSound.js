import { useSound } from '../context/SoundContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  solid,
  regular,
  brands,
} from '@fortawesome/fontawesome-svg-core/import.macro';

export default function StringSound() {
  const { string, setString, setSrc } = useSound();

  //Setsplaying state to true through HELPER FUNCTION in SoundContext.js
  const playSound = () => {
    setString(true);
    setSrc('http://localhost:8080/public/Strings.mp3');
  };

  const pauseSound = () => {
    setString(false);
  };

  return (
    <section className="flex flex-row justify-around">
      <div>
        <h1 className="font-body text-2xl text-center">Violin</h1>
      </div>
      <div>
        {string ? (
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
