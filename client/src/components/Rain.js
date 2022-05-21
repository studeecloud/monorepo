import { Howl } from 'howler';

export default function Rain() {
  const sound = new Howl({
    src: ['http://localhost:8080/sounds/Rain.mp3'],
    html5: true,
    preload: true,
    loop: true,
    volume: 0.8,
  });

  return (
    <div>
      <button
        className="border-2 border-dark-gray p-2 rounded w-48 my-2.5 m-1"
        onClick={() => {
          sound.play();
        }}
      >
        Play Rain
      </button>
      <button
        className="border-2 border-dark-gray p-2 rounded w-48 my-2.5 m-1"
        onClick={() => {
          sound.pause();
        }}
      >
        Pause Rain
      </button>
    </div>
  );
}
