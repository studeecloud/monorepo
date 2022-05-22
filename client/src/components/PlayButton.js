export default function PlayButton({ setPlay }) {
  return (
    <button
      className="bg-meringue border-2 border-dark-purple font-body p-2 rounded text-dark-gray text-2xl"
      onClick={() => setPlay()}
    >
      {' '}
      Play{' '}
    </button>
  );
}
