import { Howl } from 'howler';

export default function Ghibli() {
  const sound = new Howl({
    src: ['http://localhost:8080/sounds/Ghibli.mp3'],
    html5: true,
    preload: true,
    loop: true,
    volume: 1,
  });

  return (
    <div>
      <button
        className="border-2 border-dark-gray p-2 rounded w-48 my-2.5 m-1"
        onClick={() => {
          sound.play();
        }}
      >
        Play Ghibli
      </button>
      <button
        className="border-2 border-dark-gray p-2 rounded w-48 my-2.5 m-1"
        onClick={() => {
          sound.pause();
        }}
      >
        Pause Ghibli
      </button>
    </div>
  );
}
