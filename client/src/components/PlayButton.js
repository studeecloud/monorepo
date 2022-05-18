export default function PlayButton({setPlay}) {
  return (
    <button className="btn btn-primary" onClick={() => setPlay()}>
      {" "}
      Play{" "}
    </button>
  );
}
