import { BigHead } from "@bigheads/core";

export default function Message(props) {
  const message = {
    user: 'LISA',
    body: 'Isn\'t StudeeCloud the best?!'
  }

  return (
    <article className="flex h-30 my-2.5" style={{ border: '1px solid coral' }}>
      <header>
        {/* <BigHead className="h-20 w-20" /> */}
        <h2 className="m-1 font-body deep-purple">{message.user}</h2>
      </header>

      <p className='m-auto font-body deep-purple'>{message.body}</p>
    </article>
  );
};