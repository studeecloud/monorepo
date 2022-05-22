export default function PauseButton({ setPause }) {
  return (
    <button
      className="bg-meringue border-2 border-dark-purple font-body p-2 rounded text-dark-gray text-2xl"
      onClick={() => {
        setPause();
      }}
    >
      {' '}
      Pause{' '}
    </button>
  );
}
