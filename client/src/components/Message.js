import { BigHead } from "@bigheads/core";

export default function Message(props) {
  const message = {
    user: 'LISA',
    body: 'Isn\'t StudeeCloud the best?!'
  }

  return (
    <article className="flex border-2 rounded p-2 bg-gold h-30 my-2.5" style={{ width: 500 }}>
      <header>
        {/* <BigHead className="h-20 w-20" /> */}
        <h2 className="m-1 font-body"><strong>{message.user}</strong></h2>
      </header>

      <p className='m-auto font-body'>{message.body}</p>
    </article>
  );
};