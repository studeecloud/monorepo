export default function Message(props) {
  return (
    <article className="flex border border-dark-gray rounded p-2 bg-meringue mb-3">
      <header>
        <h2 className="m-1 font-header w-24 break-all">
          <strong>{props.user}</strong>
        </h2>
      </header>

      <p className="my-auto ml-3 font-body">{props.body}</p>
    </article>
  );
}
