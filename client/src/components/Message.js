import { BigHead } from '@bigheads/core';

export default function Message(props) {
  // const message = {
  //   user: 'LISA',
  //   body: 'Isn\'t StudeeCloud the best?!'
  // }

  return (
    <article className="flex border-2 border-dark-gray rounded p-2 bg-meringue h-30 w-full mb-2">
      <header>
        {/* <BigHead className="h-20 w-20" /> */}
        <h2 className="m-1 font-header w-24">
          <strong>{props.user}</strong>
        </h2>
      </header>

      <p className="m-auto ml-3 font-body">{props.body}</p>
    </article>
  );
}
