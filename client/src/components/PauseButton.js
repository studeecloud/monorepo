export default function PauseButton({ setPause }) {
  return (
    <button
      className="btn btn-primary"
      onClick={() => {
        setPause();
      }}
    >
      {" "}
      Pause{" "}
    </button>
  );
}
